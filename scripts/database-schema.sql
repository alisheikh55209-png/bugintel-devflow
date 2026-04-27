-- BugIntel Database Schema
-- MySQL Database for bug tracking system

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'developer', 'qa', 'manager') DEFAULT 'developer',
  avatar_url VARCHAR(500),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
);

-- Create Roles Table
CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  permissions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('active', 'archived', 'in-planning') DEFAULT 'active',
  lead_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_lead_id (lead_id)
);

-- Create Bugs Table
CREATE TABLE IF NOT EXISTS bugs (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id VARCHAR(36) NOT NULL,
  severity ENUM('critical', 'high', 'medium', 'low') NOT NULL,
  status ENUM('open', 'in-progress', 'resolved', 'closed') DEFAULT 'open',
  priority ENUM('urgent', 'high', 'medium', 'low') DEFAULT 'medium',
  assignee_id VARCHAR(36),
  reporter_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assignee_id) REFERENCES users(id),
  FOREIGN KEY (reporter_id) REFERENCES users(id),
  INDEX idx_project_id (project_id),
  INDEX idx_status (status),
  INDEX idx_severity (severity),
  INDEX idx_assignee_id (assignee_id),
  INDEX idx_created_at (created_at)
);

-- Create Bug History Table
CREATE TABLE IF NOT EXISTS bug_history (
  id VARCHAR(36) PRIMARY KEY,
  bug_id VARCHAR(36) NOT NULL,
  field_name VARCHAR(100),
  old_value VARCHAR(500),
  new_value VARCHAR(500),
  changed_by_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bug_id) REFERENCES bugs(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by_id) REFERENCES users(id),
  INDEX idx_bug_id (bug_id),
  INDEX idx_created_at (created_at)
);

-- Create Project Members Table
CREATE TABLE IF NOT EXISTS project_members (
  id VARCHAR(36) PRIMARY KEY,
  project_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  role ENUM('lead', 'developer', 'qa', 'viewer') DEFAULT 'developer',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_project_user (project_id, user_id),
  INDEX idx_project_id (project_id),
  INDEX idx_user_id (user_id)
);

-- Create Developer Metrics Table
CREATE TABLE IF NOT EXISTS developer_metrics (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL UNIQUE,
  bugs_assigned INT DEFAULT 0,
  bugs_resolved INT DEFAULT 0,
  bugs_in_progress INT DEFAULT 0,
  resolution_rate DECIMAL(5, 2) DEFAULT 0.00,
  avg_resolution_time INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Create Bug Labels Table
CREATE TABLE IF NOT EXISTS bug_labels (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(7),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_name (name)
);

-- Create Bug Tag Associations Table
CREATE TABLE IF NOT EXISTS bug_tags (
  bug_id VARCHAR(36) NOT NULL,
  label_id VARCHAR(36) NOT NULL,
  FOREIGN KEY (bug_id) REFERENCES bugs(id) ON DELETE CASCADE,
  FOREIGN KEY (label_id) REFERENCES bug_labels(id) ON DELETE CASCADE,
  PRIMARY KEY (bug_id, label_id)
);

-- Create Activity Log Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  action VARCHAR(255),
  entity_type VARCHAR(100),
  entity_id VARCHAR(36),
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_entity (entity_type, entity_id)
);

-- Insert Sample Roles
INSERT INTO roles (id, name, description, permissions) VALUES
('role-admin', 'Admin', 'Full system access', JSON_OBJECT('all', true)),
('role-developer', 'Developer', 'Manage and resolve bugs', JSON_OBJECT('bugs', 'full')),
('role-qa', 'QA', 'Report and verify bugs', JSON_OBJECT('bugs', 'read_write')),
('role-manager', 'Manager', 'Manage projects and team', JSON_OBJECT('projects', 'full'));

-- Insert Sample Users
INSERT INTO users (id, email, password_hash, name, role, status) VALUES
('user-1', 'alice@bugintel.com', 'hash1', 'Alice Chen', 'developer', 'active'),
('user-2', 'bob@bugintel.com', 'hash2', 'Bob Smith', 'developer', 'active'),
('user-3', 'carol@bugintel.com', 'hash3', 'Carol White', 'developer', 'active'),
('user-4', 'david@bugintel.com', 'hash4', 'David Brown', 'developer', 'active'),
('user-5', 'eve@bugintel.com', 'hash5', 'Eve Johnson', 'qa', 'active');

-- Insert Sample Projects
INSERT INTO projects (id, name, description, status, lead_id) VALUES
('proj-1', 'Frontend', 'React and Next.js frontend application', 'active', 'user-1'),
('proj-2', 'Backend', 'Node.js and Express backend API', 'active', 'user-2'),
('proj-3', 'Infrastructure', 'DevOps and infrastructure management', 'active', 'user-3'),
('proj-4', 'Mobile App', 'React Native mobile application', 'in-planning', 'user-4'),
('proj-5', 'Documentation', 'API documentation and guides', 'active', 'user-5');

-- Insert Sample Project Members
INSERT INTO project_members (id, project_id, user_id, role) VALUES
('pm-1', 'proj-1', 'user-1', 'lead'),
('pm-2', 'proj-1', 'user-5', 'qa'),
('pm-3', 'proj-2', 'user-2', 'lead'),
('pm-4', 'proj-3', 'user-3', 'lead'),
('pm-5', 'proj-4', 'user-4', 'lead');

-- Insert Sample Bugs
INSERT INTO bugs (id, title, description, project_id, severity, status, priority, assignee_id, reporter_id) VALUES
('bug-1', 'Login page crashes on mobile', 'The login page throws an error when accessed from mobile devices', 'proj-1', 'critical', 'open', 'urgent', 'user-1', 'user-5'),
('bug-2', 'Database connection timeout', 'API occasionally times out when connecting to the database', 'proj-2', 'high', 'in-progress', 'high', 'user-2', 'user-1'),
('bug-3', 'API response delay under load', 'Response time increases significantly under heavy load', 'proj-3', 'high', 'in-progress', 'high', 'user-3', 'user-2'),
('bug-4', 'UI elements not responsive', 'Some UI elements do not respond properly to user interactions', 'proj-1', 'medium', 'resolved', 'medium', 'user-1', 'user-5'),
('bug-5', 'Email notifications not sending', 'Email notifications fail to send in certain scenarios', 'proj-2', 'medium', 'in-progress', 'medium', 'user-2', 'user-3');

-- Insert Sample Developer Metrics
INSERT INTO developer_metrics (id, user_id, bugs_assigned, bugs_resolved, bugs_in_progress, resolution_rate) VALUES
('metric-1', 'user-1', 24, 22, 2, 92.0),
('metric-2', 'user-2', 18, 15, 3, 83.0),
('metric-3', 'user-3', 32, 31, 1, 97.0),
('metric-4', 'user-4', 21, 18, 3, 86.0),
('metric-5', 'user-5', 28, 26, 2, 93.0);

-- Insert Sample Labels
INSERT INTO bug_labels (id, name, color, description) VALUES
('label-1', 'mobile', '#FF6B6B', 'Mobile-related bug'),
('label-2', 'login', '#4ECDC4', 'Login system bug'),
('label-3', 'performance', '#45B7D1', 'Performance issue'),
('label-4', 'database', '#F7B731', 'Database-related bug'),
('label-5', 'ui', '#5F27CD', 'User interface bug');
