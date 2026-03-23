import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { env } from '@kansalt/utils';

const app = express();
const port = Number(env.API_GATEWAY_PORT ?? 4000);

const routes = {
  auth: env.AUTH_SERVICE_URL ?? 'http://localhost:4001',
  hms: env.HMS_SERVICE_URL ?? 'http://localhost:4002',
  hrms: env.HRMS_SERVICE_URL ?? 'http://localhost:4003',
  users: env.USER_SERVICE_URL ?? 'http://localhost:4010',
  apps: env.APP_SERVICE_URL ?? 'http://localhost:4013',
  billing: env.BILLING_SERVICE_URL ?? 'http://localhost:4011',
  notifications: env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:4012'
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ service: 'api-gateway', status: 'ok', routes });
});

app.use('/api/auth', createProxyMiddleware({ target: routes.auth, changeOrigin: true, pathRewrite: { '^/api/auth': '/auth' } }));
app.use('/api/public/leads', createProxyMiddleware({ target: routes.users, changeOrigin: true, pathRewrite: { '^/api/public/leads': '/leads' } }));
app.use('/api/hms', createProxyMiddleware({ target: routes.hms, changeOrigin: true, pathRewrite: { '^/api/hms': '' } }));
app.use('/api/hrms', createProxyMiddleware({ target: routes.hrms, changeOrigin: true, pathRewrite: { '^/api/hrms': '' } }));
app.use('/api/users', createProxyMiddleware({ target: routes.users, changeOrigin: true, pathRewrite: { '^/api/users': '' } }));
app.use('/api/apps', createProxyMiddleware({ target: routes.apps, changeOrigin: true, pathRewrite: { '^/api/apps': '/apps' } }));
app.use('/api/billing', createProxyMiddleware({ target: routes.billing, changeOrigin: true, pathRewrite: { '^/api/billing': '' } }));
app.use('/api/notifications', createProxyMiddleware({ target: routes.notifications, changeOrigin: true, pathRewrite: { '^/api/notifications': '' } }));

app.listen(port, () => {
  console.log(`api-gateway listening on ${port}`);
});
