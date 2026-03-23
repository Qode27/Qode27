import { PrismaClient } from '@prisma/client';

declare global {
  var __kansaltPrisma__: PrismaClient | undefined;
}

export const prisma = global.__kansaltPrisma__ ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.__kansaltPrisma__ = prisma;
}
