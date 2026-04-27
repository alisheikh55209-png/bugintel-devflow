#!/bin/bash
# Django Backend Setup Script for BugIntel

set -e

echo "Setting up Django Backend for BugIntel..."

# Create backend directory
mkdir -p ../bugintel-backend
cd ../bugintel-backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install django==4.2.0 djangorestframework==3.14.0 django-cors-headers==4.0.0 python-dotenv==1.0.0

# Create Django project
django-admin startproject bugintel .
python manage.py startapp api

echo "Django backend project created successfully!"
echo "Backend directory: $(pwd)"
echo "To activate venv: source venv/bin/activate"
echo "To run server: python manage.py runserver 8000"
