import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { BillingStatus } from '@prisma/client';
import { prisma } from '@kansalt/prisma';
import { asyncHandler, authGuard, errorHandler, requestContext } from '@kansalt/middleware';
import { env } from '@kansalt/utils';

const app = express();
const port = Number(env.BILLING_SERVICE_PORT ?? 4011);

app.use(cors());
app.use(express.json());
app.use(requestContext);
app.use(authGuard);

app.get('/health', (_req, res) => {
  res.json({ service: 'billing-service', status: 'ok' });
});

app.get('/summary', asyncHandler(async (req, res) => {
  const bills = await prisma.billing.findMany({
    where: { organizationId: req.context.organizationId },
    include: { patient: true, appointment: true },
    orderBy: { createdAt: 'desc' }
  });

  const totalRevenue = bills.filter((bill) => bill.status === BillingStatus.PAID).reduce((sum, bill) => sum + bill.amount, 0);
  const outstanding = bills.filter((bill) => bill.status === BillingStatus.PENDING).reduce((sum, bill) => sum + bill.amount, 0);
  const cancelled = bills.filter((bill) => bill.status === BillingStatus.CANCELLED).reduce((sum, bill) => sum + bill.amount, 0);

  res.json({
    totalRevenue,
    outstanding,
    cancelled,
    totalInvoices: bills.length,
    recentInvoices: bills.slice(0, 5)
  });
}));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`billing-service listening on ${port}`);
});
