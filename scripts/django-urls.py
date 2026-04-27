"""
Django URLs Configuration for BugIntel Backend API
Copy this content to api/urls.py and update bugintel/urls.py accordingly
"""

# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, ProjectViewSet, BugViewSet,
    BugCommentViewSet, DeveloperMetricsViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'bugs', BugViewSet)
router.register(r'comments', BugCommentViewSet)
router.register(r'metrics', DeveloperMetricsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


# bugintel/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api-auth/', include('rest_framework.urls')),
]
