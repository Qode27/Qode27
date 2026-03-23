# Kansalt VPS Deployment

This guide deploys the new Kansalt SaaS platform to a VPS using Docker Compose.

## What this deploys

- `kansalt.com` -> Next.js frontend
- `kansalt.com/dashboard` -> unified dashboard
- `kansalt.com/sims` -> HMS product shell
- `kansalt.com/hrms` -> HRMS product shell
- `kansalt.com/api/*` -> API gateway

## Server prerequisites

Install these on the VPS:

```bash
apt update
apt install -y git curl ca-certificates
```

Install Docker:

```bash
curl -fsSL https://get.docker.com | sh
docker --version
docker compose version
```

## 1. Clone the repo

```bash
mkdir -p /opt
git clone <your-repo-url> /opt/kansalt
cd /opt/kansalt
```

## 2. Create production env

```bash
cp .env.platform.production.example .env.platform.production
nano .env.platform.production
```

Set at minimum:

- `JWT_SECRET`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`

If you keep PostgreSQL inside Docker, use:

```env
DATABASE_URL=postgresql://kansalt:YOUR_PASSWORD@postgres:5432/kansalt?schema=public
POSTGRES_DB=kansalt
POSTGRES_USER=kansalt
POSTGRES_PASSWORD=YOUR_PASSWORD
```

## 3. Use production NGINX config

Replace the mounted nginx config in [docker-compose.platform.yml](d:/Kansalt/docker-compose.platform.yml) to point at:

- [kansalt.com.conf](d:/Kansalt/infra/nginx/kansalt.com.conf)

If you prefer, you can simply change:

```yaml
- ./infra/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
```

to:

```yaml
- ./infra/nginx/kansalt.com.conf:/etc/nginx/conf.d/default.conf:ro
```

## 4. Deploy

```bash
chmod +x scripts/deploy-vps.sh
./scripts/deploy-vps.sh
```

## 5. Verify

```bash
docker compose --env-file .env.platform.production -f docker-compose.platform.yml ps
curl http://localhost
curl http://localhost/api/health
curl http://localhost/sims
```

## 6. DNS

Point these records to the VPS public IP:

- `kansalt.com` -> `147.93.104.13`
- `www.kansalt.com` -> `147.93.104.13`

## 7. HTTPS

For production, add TLS with Certbot or place the stack behind your existing reverse proxy. If this VPS already has host-level NGINX managing certificates, forward:

- `/` -> container `nginx` on port `80`
- `/api` -> same public hostname, same container

## Notes

- This deploy path is the fastest route to make the new platform visible on `kansalt.com`.
- If your existing HMS app is still live on the same server, back it up first and decide whether you want a cutover or side-by-side rollout.
- The current repo builds successfully before deploy, but the live server still needs real production secrets and DNS.
