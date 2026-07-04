#!/bin/bash
# scripts/deploy-production.sh

echo "🚀 Starting Production Deployment"
echo "================================="

# Build Docker images
echo "📦 Building Docker images..."
docker build -t luminall/web:latest -f apps/web/Dockerfile.prod .
docker build -t luminall/api:latest -f apps/api/Dockerfile.prod .
docker build -t luminall/ml-service:latest -f apps/ml-service/Dockerfile.prod .

# Push to container registry
echo "📤 Pushing images to registry..."
docker push luminall/web:latest
docker push luminall/api:latest
docker push luminall/ml-service:latest

# Deploy to Kubernetes
echo "🎯 Deploying to Kubernetes..."
kubectl apply -f infrastructure/kubernetes/

# Wait for deployment to complete
echo "⏳ Waiting for deployment..."
kubectl rollout status deployment/luminall-web -n production
kubectl rollout status deployment/luminall-api -n production

# Run health checks
echo "🏥 Running health checks..."
curl -f https://api.luminall.com/health || exit 1
curl -f https://luminall.com/ || exit 1

echo "✅ Production deployment completed successfully!"
echo "🌐 Web: https://luminall.com"
echo "🔗 API: https://api.luminall.com"
echo "📊 Demo: https://luminall.com/demo"