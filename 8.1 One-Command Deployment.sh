#!/usr/bin/env bash

set -euo pipefail

# Make the deployment script executable
chmod +x scripts/deploy-production.sh

# Run production deployment
./scripts/deploy-production.sh

# Final health checks (optional)
curl -f https://api.luminall.com/health || true
curl -f https://luminall.com/demo || true