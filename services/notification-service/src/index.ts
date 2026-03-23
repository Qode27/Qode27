import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { NotificationChannel } from '@prisma/client';
import { prisma } from '@kansalt/prisma';
import { asyncHandler, authGuard, errorHandler, requestContext } from '@kansalt/middleware';
import { env } from '@kansalt/utils';
import { z } from 'zod';

const app = express();
const port = Number(env.NOTIFICATION_SERVICE_PORT ?? 4012);

app.use(cors());
app.use(express.json());
app.use(requestContext);
app.use(authGuard);

const notificationSchema = z.object({
  recipient: z.string().min(4),
  template: z.string().min(2),
  payload: z.record(z.any()).default({})
});

async function queueNotification(channel: NotificationChannel, organizationId: string, body: unknown) {
  const payload = notificationSchema.parse(body);

  return prisma.notification.create({
    data: {
      organizationId,
      channel,
      recipient: payload.recipient,
      template: payload.template,
      payload: payload.payload,
      status: 'QUEUED'
    }
  });
}

app.get('/health', (_req, res) => {
  res.json({ service: 'notification-service', status: 'ok' });
});

app.get('/history', asyncHandler(async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { organizationId: req.context.organizationId },
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  res.json(notifications);
}));

app.post('/email', asyncHandler(async (req, res) => {
  const notification = await queueNotification(NotificationChannel.EMAIL, req.context.organizationId!, req.body);
  res.status(202).json({
    channel: 'email',
    status: 'queued',
    notification
  });
}));

app.post('/whatsapp', asyncHandler(async (req, res) => {
  const notification = await queueNotification(NotificationChannel.WHATSAPP, req.context.organizationId!, req.body);
  res.status(202).json({
    channel: 'whatsapp',
    status: 'queued',
    notification
  });
}));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`notification-service listening on ${port}`);
});
