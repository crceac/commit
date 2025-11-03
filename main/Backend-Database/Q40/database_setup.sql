-- MySQL Database Setup for Django Authentication

-- Create database (Django will handle table creation)
CREATE DATABASE IF NOT EXISTS django_auth_db;

-- Note: Django's ORM will automatically create the following tables:
-- - auth_user (for user accounts)
-- - auth_group
-- - auth_permission
-- - etc.

-- To set up:
-- 1. Configure settings.py with MySQL database connection
-- 2. Run: python manage.py migrate
-- 3. Run: python manage.py createsuperuser


