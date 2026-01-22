"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.getPrismaClient = getPrismaClient;
exports.disconnectPrisma = disconnectPrisma;
const client_1 = require("@prisma/client");
/**
 * Global Prisma client instance
 * Ensures connection pooling and prevents multiple client instances
 */
let prisma;
/**
 * Get or create the Prisma client instance
 *
 * @returns Singleton Prisma client instance
 */
function getPrismaClient() {
    if (!prisma) {
        prisma = new client_1.PrismaClient({
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
async function disconnectPrisma() {
    if (prisma) {
        await prisma.$disconnect();
    }
}
/**
 * Export the Prisma client instance
 */
exports.db = getPrismaClient();
//# sourceMappingURL=client.js.map