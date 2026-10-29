# nikzdevz - Premium Portfolio

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A premium parallax-animated portfolio for Nikhil Kumar Gupta (nikzdevz), featuring full-stack development, DevOps expertise, and the nikzdevz & Co. product suite.

## Architecture Overview

This is a **frontend-only** application: a single Nginx-hosted React/Vite build. The Flask backend and MySQL database were removed because the portfolio content is entirely static — no runtime API calls, no database.

```
┌─────────────────────────────────────┐
│                                     │
│  Frontend (React + Vite + Nginx)    │
│      served as one Docker image     │
│                                     │
│      Port: 3000                     │
└─────────────────────────────────────┘
```

- **Frontend**: React 19 + Vite application, built into a static asset bundle and served by Nginx (production build)
- **Data**: all portfolio content (projects, testimonials, capabilities) is static in `frontend/constants.tsx`
- **Contact**: visitors reach the studio via `mailto:` and WhatsApp links directly in the UI — no backend email service

## Project Structure

```
nikzdevz/
├── frontend/                  # React + Vite application
│   ├── components/            # React components
│   ├── pages/                 # Page components
│   ├── App.tsx                # Main app component
│   ├── index.tsx              # Entry point
│   ├── constants.tsx          # Project data (all portfolio content)
│   ├── types.ts               # TypeScript types
│   ├── public/                # Static public assets
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript config
│   ├── nginx.conf             # Nginx configuration
│   ├── Dockerfile             # Multi-stage production Dockerfile
│   ├── .dockerignore          # Docker ignore file
│   └── .env.example           # Environment template
│
├── kubernetes/                # Kubernetes manifests (frontend only)
│   ├── kustomization.yaml     # Kustomize overlay
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   └── network-policy.yaml
│
├── docker-compose.yml         # Single-service frontend orchestration
├── Dockerfile                 # Root build: frontend-only, produces `portfolio` image
├── .dockerignore              # Build exclusions for the root Dockerfile
├── .env.example               # Environment template
└── .github/workflows/         # CI: builds the portfolio image and updates gitops
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values below. The `.env` file is **not** tracked by Git — it is only consumed locally by the Docker build and local development.

| Variable | Description | Default |
|---|---|---|
| `FRONTEND_PORT` | Port served by the frontend container | `3000` |

> Note: `GEMINI_API_KEY` no longer needs a value — the frontend does not consume it. `FRONTEND_PORT` is the only variable required to run the portfolio.

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

## Docker

### Build and Run

```bash
# Build the portfolio image (uses the root Dockerfile: frontend-only)
docker build -t portfolio:latest .

# Start the frontend service
docker run -d -p 3000:3000 --name nikzdevz-frontend portfolio:latest
```

### Docker Compose

```bash
# Build and start the single frontend service
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Debugging

```bash
# Shell into the container
docker exec -it nikzdevz-frontend /bin/sh

# Health check
curl http://localhost:3000/health
```

## Kubernetes

The portfolio can be deployed to a Kubernetes cluster with Kustomize.

```bash
# Apply all manifests
kubectl apply -k kubernetes/

# Verify the deployment
kubectl get pods -n nikzdevz
kubectl get svc -n nikzdevz
```

## CI / CD

GitHub Actions builds and pushes the `portfolio` image to the registry, then updates the GitOps repository with the new image tag for deployment:

- `.github/workflows/build.yml` — builds `dockerfile: Dockerfile` from context `.`, pushes `portfolio:<sha>` and `portfolio:latest`, and syncs the new tag into `nikzdevz/kraftstack-gitops`.

## License

Copyright © 2025 Nikhil Kumar Gupta (nikzdevz). All rights reserved.
