"use strict";
/**
 * Transaction Helper
 *
 * Provides atomic transaction support for Core database operations.
 * Ensures data consistency across multiple write operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTransaction = withTransaction;
exports.withTransactionOptions = withTransactionOptions;
const client_1 = require("./client");
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
async function withTransaction(fn) {
    return client_1.db.$transaction(async (tx) => {
        return fn(tx);
    });
}
/**
 * Execute operations within a database transaction with custom options
 *
 * @param fn - Async function that receives a transaction client
 * @param options - Transaction configuration options
 * @returns Result of the transaction function
 */
async function withTransactionOptions(fn, options) {
    return client_1.db.$transaction(async (tx) => {
        return fn(tx);
    }, options);
}
//# sourceMappingURL=transaction.js.map