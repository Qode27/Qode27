import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { Role } from '@prisma/client';
import { prisma } from '@kansalt/prisma';
import { asyncHandler, authGuard, errorHandler, requestContext, requireRoles } from '@kansalt/middleware';
import { env } from '@kansalt/utils';
import { z } from 'zod';

const app = express();
const port = Number(env.APP_SERVICE_PORT ?? 4013);

const defaultApps = [
  {
    name: 'Sims Hospital',
    slug: 'hms',
    subdomain: 'hms',
    description: 'Hospital Management System for OPD, IPD, billing, prescriptions, and operational reporting.',
    category: 'Healthcare',
    icon: 'H',
    pricingTier: 'Pro',
    launchUrl: 'https://hms.kansalt.com',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'HRMS',
    slug: 'hrms',
    subdomain: 'hrms',
    description: 'HR and payroll workspace for people operations, attendance, onboarding, and policy flows.',
    category: 'HR & Payroll',
    icon: 'R',
    pricingTier: 'Growth',
    launchUrl: 'https://hrms.kansalt.com',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'CRM',
    slug: 'crm',
    subdomain: 'crm',
    description: 'Pipeline, customer success, lead intelligence, and account operations for growth teams.',
    category: 'CRM',
    icon: 'C',
    pricingTier: 'Coming soon',
    launchUrl: 'https://crm.kansalt.com',
    isActive: false,
    sortOrder: 3
  }
] as const;

const appSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  subdomain: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(2),
  icon: z.string().max(4).optional(),
  pricingTier: z.string().min(2).optional(),
  launchUrl: z.string().url(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(requestContext);

async function ensureDefaultApps() {
  const count = await prisma.app.count();
  if (count > 0) {
    return;
  }

  await prisma.app.createMany({
    data: defaultApps as any
  });
}

app.get('/health', asyncHandler(async (_req, res) => {
  await ensureDefaultApps();
  res.json({ service: 'app-service', status: 'ok' });
}));

app.get('/apps', asyncHandler(async (req, res) => {
  await ensureDefaultApps();
  const query = z.object({
    category: z.string().optional(),
    search: z.string().optional(),
    activeOnly: z.enum(['true', 'false']).optional()
  }).parse(req.query);

  const apps = await prisma.app.findMany({
    where: {
      category: query.category,
      isActive: query.activeOnly === undefined ? undefined : query.activeOnly === 'true',
      OR: query.search ? [
        { name: { contains: query.search, mode: 'insensitive' } },
        { category: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } }
      ] : undefined
    },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
  });

  res.json(apps);
}));

app.get('/apps/:id', asyncHandler(async (req, res) => {
  await ensureDefaultApps();
  const params = z.object({ id: z.string() }).parse(req.params);
  const appRecord = await prisma.app.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id },
        { subdomain: params.id }
      ]
    }
  });

  if (!appRecord) {
    return res.status(404).json({ message: 'App not found' });
  }

  res.json(appRecord);
}));

app.use(authGuard);

app.post('/apps', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const payload = appSchema.parse(req.body);
  const appRecord = await prisma.app.create({ data: payload });
  res.status(201).json(appRecord);
}));

app.patch('/apps/:id', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const params = z.object({ id: z.string().cuid() }).parse(req.params);
  const payload = appSchema.partial().parse(req.body);
  const appRecord = await prisma.app.update({
    where: { id: params.id },
    data: payload
  });
  res.json(appRecord);
}));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app-service listening on ${port}`);
});
