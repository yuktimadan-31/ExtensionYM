#!/usr/bin/env bash
set -e

# Load environment variables from .env if present
if [ -f "$(pwd)/.env" ]; then
  set -o allexport
  # shellcheck disable=SC1091
  source "$(pwd)/.env"
  set +o allexport
fi

: "${EXTENSION_API_KEY:?EXTENSION_API_KEY is required}"
: "${EXTENSION_API_SECRET:?EXTENSION_API_SECRET is required}"
: "${EXTENSION_BASE_URL:?EXTENSION_BASE_URL is required}"
: "${FP_API_DOMAIN:?FP_API_DOMAIN is required}"

IMAGE_NAME="fynd-extension-uat"
CONTAINER_NAME="fynd-extension-uat"
BACKEND_PORT="8080"

echo "Building Docker image ${IMAGE_NAME}..."
docker build -t "${IMAGE_NAME}" .

echo "Stopping existing container ${CONTAINER_NAME} if it exists..."
docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true

echo "Starting UAT container ${CONTAINER_NAME} on port ${BACKEND_PORT}..."
docker run -d \
  -p "${BACKEND_PORT}:${BACKEND_PORT}" \
  --name "${CONTAINER_NAME}" \
  -e EXTENSION_API_KEY="${EXTENSION_API_KEY}" \
  -e EXTENSION_API_SECRET="${EXTENSION_API_SECRET}" \
  -e EXTENSION_BASE_URL="${EXTENSION_BASE_URL}" \
  -e BACKEND_PORT="${BACKEND_PORT}" \
  -e FP_API_DOMAIN="${FP_API_DOMAIN}" \
  "${IMAGE_NAME}"

echo "UAT deployment complete. Access the app at http://localhost:${BACKEND_PORT} or your configured UAT host."