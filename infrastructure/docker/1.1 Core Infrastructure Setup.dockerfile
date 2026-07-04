# docker-compose.prod.yml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: luminall_prod
      POSTGRES_USER: luminall
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

  api:
    build:
      context: .
      dockerfile: ./apps/api/Dockerfile.prod
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://luminall:${DB_PASSWORD}@postgres:5432/luminall_prod
    restart: unless-stopped
    depends_on:
      - postgres
      - redis

  web:
    build:
      context: .
      dockerfile: ./apps/web/Dockerfile.prod
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_URL: https://api.luminall.com
    restart: unless-stopped
    depends_on:
      - api