# nikzdevz - Premium Portfolio

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A premium parallax-animated portfolio for Nikhil Kumar Gupta (nikzdevz), featuring full-stack development, DevOps expertise, and the nikzdevz & Co. product suite.

## Architecture Overview

This is a multi-service Docker application with three main components:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Frontend       │────▶│  Backend        │────▶│  MySQL          │
│  (React + Nginx)│◀────│  (Flask + Gunicorn)│     │  Database      │
│                 │     │                 │     │                 │
│  Port: 3000     │     │  Port: 5000     │     │  Port: 3306     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Frontend**: React 19 + Vite application served via Nginx (production build)
- **Backend**: Flask API server with Gunicorn, handling email and database operations
- **Database**: MySQL 8.0 for storing portfolio data (projects, blog posts)

## Project Structure

```
nikzdevz/
├── frontend/                  # React + Vite application
│   ├── src/                   # Source files
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── App.tsx            # Main app component
│   │   ├── index.tsx          # Entry point
│   │   ├── constants.tsx      # Project data
│   │   └── types.ts           # TypeScript types
│   ├── public/                # Static public assets
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript config
│   ├── nginx.conf             # Nginx configuration
│   ├── Dockerfile             # Multi-stage production Dockerfile
│   └── .dockerignore          # Docker ignore file
│
├── backend/                   # Flask API application
│   ├── main.py                # Flask application entry point
│   ├── requirements.txt       # Python dependencies
│   ├── templates/             # HTML templates
│   ├── static/                # Static assets
│   ├── Dockerfile             # Multi-stage production Dockerfile
│   └── .dockerignore          # Docker ignore file
│
├── kubernetes/                # Kubernetes manifests
│   ├── namespace.yaml         # Namespace definition
│   ├── configmap.yaml         # Application configuration
│   ├── secret.yaml            # Sensitive configuration
│   ├── mysql-*.yaml           # MySQL database manifests
│   ├── backend-*.yaml          # Backend manifests
│   ├── frontend-*.yaml         # Frontend manifests
│   ├── ingress.yaml           # Ingress routing
│   ├── hpa.yaml               # Horizontal Pod Autoscaler
│   ├── network-policy.yaml    # Network policies
│   └── kustomization.yaml     # Kustomize configuration
│
├── init.sql                   # Database initialization script
├── docker-compose.yml         # Docker Compose orchestration
├── .env                       # Environment variables (DO NOT COMMIT)
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## Prerequisites

- **Docker**: Version 20.10+ with Docker Compose plugin
- **Kubernetes** (optional): kubectl, kustomize
- **Node.js** 18+ (for local frontend development)
- **Python** 3.11+ (for local backend development)

## Quick Start

### 1. Clone and Configure

```bash
# Clone the repository
git clone https://github.com/nikzdevz/nikzdevz.git
cd nikzdevz

# Copy environment template
cp .env.example .env

# Edit .env with your actual values
# Required: MySQL passwords, email credentials, API keys
```

### 2. Docker Compose (Recommended)

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild after code changes
docker compose up -d --build

# Clean slate (removes volumes)
docker compose down -v
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Environment Variables

### Required Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MYSQL_ROOT_PASSWORD` | MySQL root password | (required) |
| `MYSQL_DATABASE` | Database name | nikzdevz_portfolio |
| `MYSQL_USER` | Database user | nikzdevz_user |
| `MYSQL_PASSWORD` | Database password | (required) |
| `MYSQL_PORT` | MySQL port | 3306 |
| `BACKEND_PORT` | Backend port | 5000 |
| `FRONTEND_PORT` | Frontend port | 3000 |
| `MAIL_USERNAME` | SMTP username | (required) |
| `MAIL_PASSWORD` | SMTP app password | (required) |
| `RECIPIENT_EMAIL` | Email recipient | (required) |
| `GEMINI_API_KEY` | Gemini API key | (required) |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FLASK_ENV` | Flask environment | production |
| `MAIL_SERVER` | SMTP server | smtp.gmail.com |
| `MAIL_PORT` | SMTP port | 587 |
| `MAIL_USE_TLS` | Use TLS | True |

## Local Development

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Development

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Linux/macOS:
source venv/bin/activate
# Windows:
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start Flask server
python main.py
```

### Backend with MySQL (Local)

```bash
# Start MySQL container
docker run -d \
  --name nikzdevz-mysql \
  -e MYSQL_ROOT_PASSWORD=root_password_change_me \
  -e MYSQL_DATABASE=nikzdevz_portfolio \
  -e MYSQL_USER=nikzdevz_user \
  -e MYSQL_PASSWORD=db_password_change_me \
  -p 3306:3306 \
  mysql:8.0

# Initialize database
docker exec -i nikzdevz-mysql mysql -uroot -proot_password_change_me < init.sql

# Run backend
cd backend && python main.py
```

## Docker Commands Reference

### Build and Run

```bash
# Build images
docker compose build

# Start services
docker compose up -d

# Start with logs
docker compose up -d && docker compose logs -f

# Rebuild after changes
docker compose up -d --build
```

### Service Management

```bash
# View status
docker compose ps

# View logs (all services)
docker compose logs -f

# View logs (specific service)
docker compose logs -f backend

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# Restart a service
docker compose restart backend
```

### Debugging

```bash
# Shell into container
docker exec -it nikzdevz-backend /bin/sh
docker exec -it nikzdevz-frontend /bin/sh
docker exec -it nikzdevz-db /bin/bash

# Check health
curl http://localhost:5000/health
curl http://localhost:3000/health

# View resource usage
docker stats
```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (v1.25+)
- kubectl configured
- Nginx Ingress Controller installed
- Metrics Server for HPA

### Deployment Steps

```bash
# 1. Navigate to kubernetes directory
cd kubernetes

# 2. Update secrets with actual values
# Edit secret.yaml with your MySQL passwords, email credentials, API keys

# 3. Apply manifests
kubectl apply -k .

# Or apply individually:
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f ingress.yaml

# 4. Monitor deployment
kubectl get pods -n nikzdevz
kubectl get services -n nikzdevz
kubectl logs -f deployment/backend -n nikzdevz

# 5. Verify deployment
kubectl get ingress -n nikzdevz
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment backend --replicas=3 -n nikzdevz
kubectl scale deployment frontend --replicas=3 -n nikzdevz

# Or use HPA (automatic scaling based on metrics)
# HPA is configured in hpa.yaml (2-10 replicas)
```

### Rollback

```bash
# View rollout history
kubectl rollout history deployment/backend -n nikzdevz

# Rollback to previous version
kubectl rollout undo deployment/backend -n nikzdevz

# Rollback to specific version
kubectl rollout undo deployment/backend --to-revision=2 -n nikzdevz
```

### Cleanup

```bash
# Remove all resources
kubectl delete -k .

# Or individually
kubectl delete -f ingress.yaml
kubectl delete -f frontend-deployment.yaml
kubectl delete -f backend-deployment.yaml
kubectl delete -f mysql-deployment.yaml
kubectl delete -f namespace.yaml
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page with recent works and blog posts |
| POST | `/send` | Send contact email |
| GET | `/health` | Health check (returns DB status) |

### Contact Form

```bash
curl -X POST http://localhost:5000/send \
  -d "name=John Doe" \
  -d "email=john@example.com" \
  -d "subject=Hello" \
  -d "message=This is a test message"
```

## Database Schema

### recentWorks Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment ID |
| postUrl | VARCHAR(500) | Project URL |
| postCaption | VARCHAR(255) | Project name |
| postImage | VARCHAR(500) | Image URL |
| postTags | VARCHAR(255) | Comma-separated tags |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

### blogPosts Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment ID |
| postDetailId | VARCHAR(100) | Unique post identifier |
| postTitle | VARCHAR(255) | Post title |
| postCategory | VARCHAR(100) | Category |
| postImgUrl | VARCHAR(500) | Image URL |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

## Products

- **DroidLabZ** - Visual Android Builder (https://droidlabz.com)
- **BEAN Attendance** - Beacon-powered attendance system (https://beanattendance.nikzdevz.in)
- **Devzstore** - App Inventor companion (https://devzstore.nikzdevz.in)
- **Kraftresume** - Smart resume engine (https://kraftresume.com)

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Framer Motion, Lucide Icons
- **Backend**: Flask 2.3, Gunicorn, Flask-Mail, MySQL Connector
- **DevOps**: Docker, Docker Compose, Kubernetes, Nginx
- **Database**: MySQL 8.0

## Troubleshooting

### Database Connection Issues

```bash
# Check MySQL is healthy
docker compose ps db
docker compose logs db

# Verify credentials in .env
# Ensure MySQL is fully started before backend
```

### Email Not Sending

1. Use Gmail App Password (not regular password)
2. Enable 2FA on Google Account
3. Generate App Password: https://myaccount.google.com/apppasswords

### Frontend Build Failures

```bash
# Clear build cache
rm -rf frontend/dist
rm -rf frontend/node_modules

# Reinstall dependencies
cd frontend && npm install
npm run build
```

### Container Health Check Failures

```bash
# Check backend health directly
curl http://localhost:5000/health

# Check frontend health directly
curl http://localhost:3000/health

# Check container networking
docker compose exec backend ping mysql-service
```

## Security Considerations

- All secrets are stored in `.env` file (not committed to git)
- Kubernetes secrets should be managed via external secrets management
- Containers run as non-root users (frontend:nginxuser, backend:appuser)
- Network policies restrict traffic between services
- SSL/TLS should be configured for production

## License

Copyright (c) 2024-2026 Nikhil Kumar Gupta (nikzdevz). All rights reserved.

## Contact

- Website: https://nikzdevz.in
- GitHub: https://github.com/nikzdevz