/**
 * Prisma Client Singleton
 * 
 * Provides a single, connection-pooling-safe Prisma client instance
 * for all Core database operations.
 * 
 * Target: Neon PostgreSQL
 * Database: identity_db
 * Schema: webwaka
 */

import { PrismaClient } from '@prisma/client';

/**
 * Global Prisma client instance
 * Ensures connection pooling and prevents multiple client instances
 */
let prisma: PrismaClient;

/**
 * Get or create the Prisma client instance
 * 
 * @returns Singleton Prisma client instance
 */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
    });
  }
  
  return prisma;
}

/**
 * Disconnect Prisma client
 * Should be called on application shutdown
 */
export async function disconnectPrisma(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
  }
}

/**
 * Export the Prisma client instance
 */
export const db = getPrismaClient();
