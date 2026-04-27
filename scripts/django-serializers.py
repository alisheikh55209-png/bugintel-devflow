"""
Django REST Framework Serializers for BugIntel Backend
Copy this to api/serializers.py in your Django project
"""

from rest_framework import serializers
from api.models import User, Project, Bug, BugComment, BugHistory, DeveloperMetrics


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'role',
            'avatar_url', 'bio', 'phone', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class UserLoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model"""
    owner_detail = UserSerializer(source='owner', read_only=True)
    team_members_detail = UserSerializer(source='team_members', many=True, read_only=True)
    total_bugs = serializers.IntegerField(read_only=True)
    open_bugs = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'status', 'owner', 'owner_detail',
            'team_members', 'team_members_detail', 'created_at', 'updated_at',
            'total_bugs', 'open_bugs'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class BugHistorySerializer(serializers.ModelSerializer):
    """Serializer for BugHistory model"""
    changed_by_detail = UserSerializer(source='changed_by', read_only=True)
    
    class Meta:
        model = BugHistory
        fields = [
            'id', 'bug', 'changed_by', 'changed_by_detail', 'field_name',
            'old_value', 'new_value', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class BugCommentSerializer(serializers.ModelSerializer):
    """Serializer for BugComment model"""
    author_detail = UserSerializer(source='author', read_only=True)
    
    class Meta:
        model = BugComment
        fields = [
            'id', 'bug', 'author', 'author_detail', 'content',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class BugDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for Bug model with related data"""
    reporter_detail = UserSerializer(source='reporter', read_only=True)
    assignee_detail = UserSerializer(source='assignee', read_only=True)
    project_detail = ProjectSerializer(source='project', read_only=True)
    comments = BugCommentSerializer(many=True, read_only=True)
    history = BugHistorySerializer(many=True, read_only=True)
    resolution_time = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Bug
        fields = [
            'id', 'title', 'description', 'project', 'project_detail',
            'reporter', 'reporter_detail', 'assignee', 'assignee_detail',
            'status', 'severity', 'priority', 'reproduction_steps',
            'expected_behavior', 'actual_behavior', 'created_at',
            'updated_at', 'resolved_at', 'comments', 'history',
            'resolution_time'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class BugListSerializer(serializers.ModelSerializer):
    """Simple serializer for Bug list view"""
    reporter_detail = UserSerializer(source='reporter', read_only=True)
    assignee_detail = UserSerializer(source='assignee', read_only=True)
    
    class Meta:
        model = Bug
        fields = [
            'id', 'title', 'project', 'reporter', 'reporter_detail',
            'assignee', 'assignee_detail', 'status', 'severity',
            'priority', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class DeveloperMetricsSerializer(serializers.ModelSerializer):
    """Serializer for DeveloperMetrics model"""
    developer_detail = UserSerializer(source='developer', read_only=True)
    resolution_rate = serializers.FloatField(read_only=True)
    
    class Meta:
        model = DeveloperMetrics
        fields = [
            'id', 'developer', 'developer_detail', 'bugs_assigned',
            'bugs_resolved', 'bugs_in_progress', 'avg_resolution_time',
            'resolution_rate', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'resolution_rate']
