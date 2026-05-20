# fullstack-ai-chat

## 🚀 Quick Start Guide

Follow these steps to run the interactive educational platform locally with docker:

### Step 1. Configure the API Key
Open the `docker-compose.yml` file in the root directory, find line 15, and paste your actual API key directly into the `OPENAI_API_KEY` field:

```yaml
  environment:
    - API_URL=http://localhost:3001
    - CLIENT_URL=http://localhost:3000
    - OPENAI_API_KEY=sk-or-v1-your-actual-key-here  # <-- Paste your key here
```

### Step 2. Run with Docker Compose
Make sure Docker Desktop is running, then execute this command in your terminal:

```bash
docker-compose up --build
```

### Step 3. Access the Apps
Once the containers are up and running, open your browser:

Frontend: http://localhost:3000

Backend API: http://localhost:3001

### Reset & Restart
To force-apply changes, update your key, or clear the Docker cache, run:

```bash
docker-compose down && docker-compose up --build --force-recreate
```
