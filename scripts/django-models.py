"""
Django Models for BugIntel Backend
This file contains the database models to be used in the Django backend.
Copy the contents to api/models.py in your Django project.
"""

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """Custom User model for BugIntel"""
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('developer', 'Developer'),
        ('qa', 'QA'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='developer')
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"


class Project(models.Model):
    """Project model for organizing bugs"""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('archived', 'Archived'),
        ('on-hold', 'On Hold'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_projects')
    team_members = models.ManyToManyField(User, related_name='projects', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'projects'
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def total_bugs(self):
        return self.bugs.count()

    @property
    def open_bugs(self):
        return self.bugs.filter(status='open').count()


class Bug(models.Model):
    """Bug/Issue model"""
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in-progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
        ('reopened', 'Reopened'),
    ]
    
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='bugs')
    reporter = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='reported_bugs')
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_bugs')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='medium')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    
    reproduction_steps = models.TextField(blank=True)
    expected_behavior = models.TextField(blank=True)
    actual_behavior = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'bugs'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['project', 'status']),
            models.Index(fields=['assignee', 'status']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return f"[{self.severity.upper()}] {self.title}"

    @property
    def resolution_time(self):
        if self.resolved_at:
            return (self.resolved_at - self.created_at).days
        return None


class BugComment(models.Model):
    """Comments on bugs"""
    bug = models.ForeignKey(Bug, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'bug_comments'
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.author} on {self.bug}"


class BugHistory(models.Model):
    """Track changes to bugs"""
    bug = models.ForeignKey(Bug, on_delete=models.CASCADE, related_name='history')
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    field_name = models.CharField(max_length=50)
    old_value = models.TextField(blank=True)
    new_value = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'bug_history'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.field_name} changed on {self.bug}"


class DeveloperMetrics(models.Model):
    """Track developer performance metrics"""
    developer = models.OneToOneField(User, on_delete=models.CASCADE, related_name='metrics')
    bugs_assigned = models.IntegerField(default=0)
    bugs_resolved = models.IntegerField(default=0)
    bugs_in_progress = models.IntegerField(default=0)
    avg_resolution_time = models.FloatField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'developer_metrics'

    def __str__(self):
        return f"Metrics for {self.developer}"

    @property
    def resolution_rate(self):
        if self.bugs_assigned == 0:
            return 0
        return round((self.bugs_resolved / self.bugs_assigned) * 100, 2)
