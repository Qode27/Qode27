import 'dotenv/config';

import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { prisma } from '@kansalt/prisma';
import { asyncHandler, authGuard, errorHandler, requestContext, requireRoles } from '@kansalt/middleware';
import { env, requireEnv, slugify } from '@kansalt/utils';
import { z } from 'zod';

const app = express();
const port = Number(env.AUTH_SERVICE_PORT ?? 4001);
const jwtSecret = requireEnv('JWT_SECRET');
const productEnum = z.enum(['HMS', 'HRMS', 'CRM', 'FINANCE']);
const authCookieDomain = env.AUTH_COOKIE_DOMAIN;
const authCookieSecure = env.NODE_ENV === 'production';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(requestContext);

const signupSchema = z.object({
  organizationName: z.string().min(2),
  subdomain: z.string().min(2).max(50).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().min(8).optional(),
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
  role: z.nativeEnum(Role).default(Role.ADMIN),
  products: z.array(productEnum).default(['HMS', 'HRMS'])
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const inviteUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
  role: z.nativeEnum(Role)
});

function signToken(payload: { userId: string; organizationId: string; role: Role }) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '12h' });
}

function setSessionCookie(res: express.Response, token: string) {
  res.cookie('kansalt_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: authCookieSecure,
    domain: authCookieDomain || undefined,
    path: '/',
    maxAge: 1000 * 60 * 60 * 12
  });
}

app.get('/health', (_req, res) => {
  res.json({ service: 'auth-service', status: 'ok' });
});

app.post('/auth/signup', asyncHandler(async (req, res) => {
  const payload = signupSchema.parse(req.body);
  const email = payload.email.toLowerCase();
  const slug = slugify(payload.subdomain ?? payload.organizationName);

  const [existingUser, existingOrganization] = await Promise.all([
    prisma.user.findUnique({ where: { email } }),
    prisma.organization.findUnique({ where: { slug } })
  ]);

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  if (existingOrganization) {
    return res.status(409).json({ message: 'Organization slug already exists' });
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const organization = await prisma.organization.create({
    data: {
      name: payload.organizationName,
      slug,
      contactEmail: payload.contactEmail ?? email,
      contactPhone: payload.contactPhone,
      products: payload.products,
      featureFlags: ['billing', 'notifications', 'prescriptions']
    } as never
  });

  const user = await prisma.user.create({
    data: {
      organizationId: organization.id,
      email,
      name: payload.name,
      passwordHash: hashedPassword,
      role: payload.role
    }
  });

  const token = signToken({ userId: user.id, organizationId: organization.id, role: user.role });
  setSessionCookie(res, token);
  res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organizationId: organization.id
    },
    organization
  });
}));

app.post('/auth/login', asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body);
  const email = payload.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email }, include: { organization: true } });

  if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if ((user.organization as { isActive?: boolean }).isActive === false) {
    return res.status(403).json({ message: 'Organization is disabled' });
  }

  const token = signToken({ userId: user.id, organizationId: user.organizationId, role: user.role });
  setSessionCookie(res, token);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    organization: user.organization
  });
}));

app.post('/auth/logout', (_req, res) => {
  res.clearCookie('kansalt_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: authCookieSecure,
    domain: authCookieDomain || undefined,
    path: '/'
  });

  res.json({ message: 'Logged out' });
});

app.get('/auth/me', authGuard, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.context.userId },
    include: { organization: true }
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    organization: user.organization
  });
}));

app.post('/auth/users', authGuard, requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const payload = inviteUserSchema.parse(req.body);
  const email = payload.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: {
      organizationId: req.context.organizationId!,
      email,
      name: payload.name,
      passwordHash,
      role: payload.role
    }
  });

  res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  });
}));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`auth-service listening on ${port}`);
});
