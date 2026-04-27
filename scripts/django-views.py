"""
Django REST Framework Views for BugIntel Backend
Copy this to api/views.py in your Django project
"""

from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from api.models import User, Project, Bug, BugComment, BugHistory, DeveloperMetrics
from .serializers import (
    UserSerializer, UserLoginSerializer, ProjectSerializer,
    BugListSerializer, BugDetailSerializer, BugCommentSerializer,
    BugHistorySerializer, DeveloperMetricsSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering_fields = ['created_at', 'username']
    ordering = ['-created_at']

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        """User login endpoint"""
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        
        if user:
            return Response({
                'user': UserSerializer(user).data,
                'message': 'Login successful'
            })
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get current user profile"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def team_members(self, request):
        """Get all active team members"""
        users = User.objects.filter(is_active=True).exclude(role='admin')
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for Project model"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'name', 'status']
    ordering = ['-created_at']

    def get_queryset(self):
        """Filter projects for current user"""
        user = self.request.user
        if user.role == 'admin':
            return Project.objects.all()
        return Project.objects.filter(
            models.Q(owner=user) | models.Q(team_members=user)
        ).distinct()

    @action(detail=True, methods=['get'])
    def bugs(self, request, pk=None):
        """Get all bugs for a project"""
        project = self.get_object()
        bugs = project.bugs.all()
        serializer = BugListSerializer(bugs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        """Get project statistics"""
        project = self.get_object()
        bugs = project.bugs.all()
        
        stats = {
            'total_bugs': bugs.count(),
            'open_bugs': bugs.filter(status='open').count(),
            'in_progress': bugs.filter(status='in-progress').count(),
            'resolved': bugs.filter(status='resolved').count(),
            'critical': bugs.filter(severity='critical').count(),
            'high': bugs.filter(severity='high').count(),
        }
        return Response(stats)


class BugViewSet(viewsets.ModelViewSet):
    """ViewSet for Bug model"""
    queryset = Bug.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'severity', 'status', 'priority']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """Use detailed serializer for retrieve, simple for list"""
        if self.action == 'retrieve':
            return BugDetailSerializer
        return BugListSerializer

    def get_queryset(self):
        """Filter bugs based on user permissions"""
        user = self.request.user
        if user.role == 'admin':
            return Bug.objects.all()
        return Bug.objects.filter(
            models.Q(project__team_members=user) |
            models.Q(assignee=user) |
            models.Q(reporter=user)
        ).distinct()

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        """Add comment to bug"""
        bug = self.get_object()
        serializer = BugCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(bug=bug, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def change_status(self, request, pk=None):
        """Change bug status"""
        bug = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in dict(Bug.STATUS_CHOICES):
            return Response(
                {'error': 'Invalid status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        old_status = bug.status
        bug.status = new_status
        bug.save()
        
        # Create history record
        BugHistory.objects.create(
            bug=bug,
            changed_by=request.user,
            field_name='status',
            old_value=old_status,
            new_value=new_status
        )
        
        return Response({'status': 'changed'})

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        """Assign bug to developer"""
        bug = self.get_object()
        user_id = request.data.get('user_id')
        
        try:
            user = User.objects.get(id=user_id)
            old_assignee = bug.assignee
            bug.assignee = user
            bug.save()
            
            # Create history record
            BugHistory.objects.create(
                bug=bug,
                changed_by=request.user,
                field_name='assignee',
                old_value=str(old_assignee) if old_assignee else 'Unassigned',
                new_value=str(user)
            )
            
            return Response({'assigned_to': UserSerializer(user).data})
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class BugCommentViewSet(viewsets.ModelViewSet):
    """ViewSet for BugComment model"""
    queryset = BugComment.objects.all()
    serializer_class = BugCommentSerializer
    permission_classes = [IsAuthenticated]
    ordering_fields = ['created_at']
    ordering = ['-created_at']


class DeveloperMetricsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for DeveloperMetrics - Read only"""
    queryset = DeveloperMetrics.objects.all()
    serializer_class = DeveloperMetricsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['bugs_resolved', 'resolution_rate']
    ordering = ['-bugs_resolved']

    @action(detail=False, methods=['get'])
    def top_performers(self, request):
        """Get top performing developers"""
        metrics = DeveloperMetrics.objects.all().order_by('-bugs_resolved')[:10]
        serializer = self.get_serializer(metrics, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def team_statistics(self, request):
        """Get team-wide statistics"""
        metrics = DeveloperMetrics.objects.all()
        
        team_stats = {
            'total_developers': metrics.count(),
            'total_bugs_assigned': sum(m.bugs_assigned for m in metrics),
            'total_bugs_resolved': sum(m.bugs_resolved for m in metrics),
            'avg_resolution_time': sum(m.avg_resolution_time for m in metrics) / metrics.count() if metrics.count() > 0 else 0,
        }
        return Response(team_stats)
