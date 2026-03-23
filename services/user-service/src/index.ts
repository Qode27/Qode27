import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { Role } from '@prisma/client';
import { prisma } from '@kansalt/prisma';
import { asyncHandler, authGuard, errorHandler, requestContext, requireRoles } from '@kansalt/middleware';
import { env } from '@kansalt/utils';
import { z } from 'zod';

const app = express();
const port = Number(env.USER_SERVICE_PORT ?? 4010);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(requestContext);

const productEnum = z.enum(['HMS', 'HRMS', 'CRM', 'FINANCE']);

const organizationUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().min(8).optional(),
  isActive: z.boolean().optional()
});

const productsSchema = z.object({
  products: z.array(productEnum).default([])
});

const featureFlagsSchema = z.object({
  featureFlags: z.array(z.string().min(2)).default([])
});

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  product: z.string().optional(),
  message: z.string().min(10)
});

app.get('/health', (_req, res) => {
  res.json({ service: 'user-service', status: 'ok' });
});

app.post('/leads', asyncHandler(async (req, res) => {
  const payload = leadSchema.parse(req.body);
  const lead = await prisma.lead.create({ data: payload });
  res.status(201).json(lead);
}));

app.use(authGuard);

app.get('/organizations/current', asyncHandler(async (req, res) => {
  const organization = await prisma.organization.findUnique({
    where: { id: req.context.organizationId },
    include: {
      users: {
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  res.json(organization);
}));

app.patch('/organizations/current', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const payload = organizationUpdateSchema.parse(req.body);
  const organization = await prisma.organization.update({
    where: { id: req.context.organizationId! },
    data: payload
  });
  res.json(organization);
}));

app.patch('/organizations/current/products', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const payload = productsSchema.parse(req.body);
  const organization = await prisma.organization.update({
    where: { id: req.context.organizationId! },
    data: { products: payload.products } as never
  });
  res.json(organization);
}));

app.patch('/organizations/current/feature-flags', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const payload = featureFlagsSchema.parse(req.body);
  const organization = await prisma.organization.update({
    where: { id: req.context.organizationId! },
    data: { featureFlags: payload.featureFlags }
  });
  res.json(organization);
}));

app.get('/users', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    where: { organizationId: req.context.organizationId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(users);
}));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`user-service listening on ${port}`);
});
