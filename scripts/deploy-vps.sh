#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/kansalt"
COMPOSE_FILE="docker-compose.platform.yml"
ENV_FILE=".env.platform.production"

echo "[1/7] preparing app directory"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -d .git ]; then
  echo "Repository is not present in $APP_DIR."
  echo "Clone the repo first, for example:"
  echo "git clone <your-repo-url> $APP_DIR"
  exit 1
fi

echo "[2/7] updating source"
git fetch --all
git checkout main
git pull origin main

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE in $APP_DIR"
  echo "Create it from .env.platform.production.example before rerunning."
  exit 1
fi

echo "[3/7] building containers"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" build

echo "[4/7] starting platform"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d

echo "[5/7] waiting for postgres"
sleep 10

echo "[6/7] generating prisma client"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T api-gateway npm run prisma:generate

echo "[7/7] done"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps
