/**
 * Transaction Helper
 *
 * Provides atomic transaction support for Core database operations.
 * Ensures data consistency across multiple write operations.
 */
import { db } from './client';
import type { Prisma } from '@prisma/client';
/**
 * Transaction context type
 * Provides access to all Prisma models within a transaction
 */
export type TransactionClient = Omit<typeof db, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;
/**
 * Execute operations within a database transaction
 *
 * All operations within the callback will be executed atomically.
 * If any operation fails, all changes will be rolled back.
 *
 * @param fn - Async function that receives a transaction client
 * @returns Result of the transaction function
 *
 * @example
 * ```typescript
 * const result = await withTransaction(async (tx) => {
 *   const user = await tx.user.create({ data: { email: 'user@example.com' } });
 *   const tenant = await tx.tenant.create({ data: { name: 'My Tenant' } });
 *   await tx.tenantMembership.create({
 *     data: { userId: user.id, tenantId: tenant.id }
 *   });
 *   return { user, tenant };
 * });
 * ```
 */
export declare function withTransaction<T>(fn: (tx: TransactionClient) => Promise<T>): Promise<T>;
/**
 * Transaction options for advanced use cases
 */
export type TransactionOptions = {
    maxWait?: number;
    timeout?: number;
    isolationLevel?: Prisma.TransactionIsolationLevel;
};
/**
 * Execute operations within a database transaction with custom options
 *
 * @param fn - Async function that receives a transaction client
 * @param options - Transaction configuration options
 * @returns Result of the transaction function
 */
export declare function withTransactionOptions<T>(fn: (tx: TransactionClient) => Promise<T>, options: TransactionOptions): Promise<T>;
//# sourceMappingURL=transaction.d.ts.map