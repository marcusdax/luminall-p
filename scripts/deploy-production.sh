#!/usr/bin/env bash

set -euo pipefail

echo "🚀 Starting Production Deployment"
echo "================================="

# Pre-flight checks
command -v kubectl >/dev/null 2>&1 || { echo "❌ kubectl not found. Please install kubectl and configure your kube-context."; exit 1; }

# Determine repo root relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Kubernetes manifests directory
K8S_DIR="$REPO_ROOT/infrastructure/kubernetes"

if [[ ! -d "$K8S_DIR" ]]; then
  echo "❌ Kubernetes directory not found at: $K8S_DIR"
  exit 1
fi

echo "🎯 Applying Kubernetes manifests from: $K8S_DIR"
kubectl apply -f "$K8S_DIR/5.1 Kubernetes Deployment.yaml"

echo "⏳ Waiting for API deployment rollout in 'production' namespace..."
kubectl rollout status deployment/luminall-api -n production

echo "🏥 Running health checks..."
set +e
curl -f https://api.luminall.com/health
API_STATUS=$?
curl -f https://luminall.com/
WEB_STATUS=$?
set -e

if [[ $API_STATUS -ne 0 ]]; then
  echo "⚠️ API health check failed (non-blocking for now)."
fi
if [[ $WEB_STATUS -ne 0 ]]; then
  echo "⚠️ Web health check failed (non-blocking for now)."
fi

echo "✅ Deployment flow finished."
