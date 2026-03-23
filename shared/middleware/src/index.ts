import { randomUUID } from 'crypto';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { ZodError } from 'zod';
import { requireEnv } from '@kansalt/utils';

declare global {
  namespace Express {
    interface Request {
      context: {
        requestId: string;
        userId?: string;
        organizationId?: string;
        role?: Role;
      };
    }
  }
}

export function requestContext(req: Request, _res: Response, next: NextFunction) {
  req.context = { requestId: randomUUID() };
  next();
}

export function asyncHandler(handler: RequestHandler): RequestHandler {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie;
  const tokenFromCookie = cookieHeader
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('kansalt_token='))
    ?.split('=')[1];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : tokenFromCookie;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, requireEnv('JWT_SECRET')) as {
      userId: string;
      organizationId: string;
      role: Role;
    };

    req.context = {
      ...req.context,
      userId: decoded.userId,
      organizationId: decoded.organizationId,
      role: decoded.role
    };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRoles(...roles: Role[]): RequestHandler {
  return (req, res, next) => {
    if (!req.context.role || !roles.includes(req.context.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  console.error('request_failed', { error, requestId: req.context?.requestId });

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      issues: error.flatten(),
      requestId: req.context?.requestId
    });
  }

  res.status(500).json({
    message: error instanceof Error ? error.message : 'Internal server error',
    requestId: req.context?.requestId
  });
}
