# nikzdevz - Premium Portfolio

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A premium parallax-animated portfolio for Nikhil Kumar Gupta (nikzdevz), featuring full-stack development, DevOps expertise, and the nikzdevz & Co. product suite.

## Overview

This project is a multi-service Docker application consisting of:

- **Frontend**: React + Vite application served via Nginx
- **Backend**: Flask API server handling email and database operations
- **Database**: MySQL 8.0 for storing portfolio data

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/nikzdevz/nikzdevz.git
cd nikzdevz
```

2. Copy the environment file and configure it:
```bash
cp .env.example .env
# Edit .env with your actual values
```

3. Build and start the containers:
```bash
docker-compose up -d --build
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Local Development

#### Frontend

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Edit .env.local with your GEMINI_API_KEY

# Start development server
npm run dev
```

#### Backend

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your MySQL and email credentials

# Start Flask server
python main.py
```

## Project Structure

```
nikzdevz/
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile.frontend     # Frontend Docker image
├── Dockerfile.backend      # Backend Docker image
├── nginx.conf              # Nginx configuration
├── init.sql                # Database initialization
├── .env.example            # Template for environment variables
├── .env                    # Actual environment variables
│
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── constants.tsx   # Project data
│   │   └── types.ts        # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                # Flask API
│   ├── main.py            # Flask application
│   ├── requirements.txt   # Python dependencies
│   ├── templates/         # HTML templates
│   └── static/            # Static assets
│
└── README.md
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MYSQL_ROOT_PASSWORD` | MySQL root password | - |
| `MYSQL_DATABASE` | Database name | nikzdevz_portfolio |
| `MYSQL_USER` | Database user | - |
| `MYSQL_PASSWORD` | Database password | - |
| `MYSQL_PORT` | MySQL port | 3306 |
| `FLASK_ENV` | Flask environment | development |
| `BACKEND_PORT` | Backend port | 5000 |
| `MAIL_SERVER` | SMTP server | smtp.gmail.com |
| `MAIL_PORT` | SMTP port | 587 |
| `MAIL_USERNAME` | Email address | - |
| `MAIL_PASSWORD` | App password | - |
| `RECIPIENT_EMAIL` | Email recipient | - |
| `FRONTEND_PORT` | Frontend port | 3000 |
| `GEMINI_API_KEY` | Gemini API key | - |

### Database Setup

The database schema is automatically initialized via `init.sql` when the container first starts. It creates:

- `recentWorks` table: Stores portfolio project data
- `blogPosts` table: Stores blog post metadata

## Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# Rebuild after code changes
docker-compose up -d --build

# Remove volumes (clean slate)
docker-compose down -v
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page with recent works and blog posts |
| POST | `/send` | Send contact email |

## Products

- **DroidLabZ** - Visual Android Builder (https://droidlabz.com)
- **BEAN Attendance** - Beacon-powered attendance system (https://beanattendance.nikzdevz.in)
- **Devzstore** - App Inventor companion (https://devzstore.nikzdevz.in)
- **Kraftresume** - Smart resume engine (https://kraftresume.com)

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Framer Motion, Lucide Icons
- **Backend**: Flask, Flask-Mail, MySQL Connector
- **DevOps**: Docker, Docker Compose, Nginx
- **Database**: MySQL 8.0

## Troubleshooting

### Database Connection Issues

If the backend cannot connect to the database:
1. Ensure MySQL container is healthy: `docker-compose ps`
2. Check logs: `docker-compose logs db`
3. Verify credentials in `.env` file

### Email Not Sending

1. Ensure you're using an App Password (not your regular password) for Gmail
2. Enable 2-Factor Authentication on your Google account
3. Generate an App Password at: https://myaccount.google.com/apppasswords

### Frontend Build Failures

1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Check `GEMINI_API_KEY` is set in `.env.local`

## License

Copyright (c) 2024-2026 Nikhil Kumar Gupta (nikzdevz). All rights reserved.

## Contact

- Website: https://nikzdevz.in
- GitHub: https://github.com/nikzdevz