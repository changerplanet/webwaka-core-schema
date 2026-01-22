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
 * Get or create the Prisma client instance
 *
 * @returns Singleton Prisma client instance
 */
export declare function getPrismaClient(): PrismaClient;
/**
 * Disconnect Prisma client
 * Should be called on application shutdown
 */
export declare function disconnectPrisma(): Promise<void>;
/**
 * Export the Prisma client instance
 */
export declare const db: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/client").DefaultArgs>;
//# sourceMappingURL=client.d.ts.map