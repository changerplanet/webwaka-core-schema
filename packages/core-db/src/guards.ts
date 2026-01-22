/**
 * Write Guards
 * 
 * Enforces mandatory fields for all write operations to ensure:
 * - Tenant isolation (all tenant-scoped writes include tenantId)
 * - Actor accountability (all writes include actorUserId)
 * - Audit trail integrity
 * 
 * These guards fail loudly if requirements are not met.
 */

/**
 * Write context for tenant-scoped operations
 */
export interface TenantWriteContext {
  tenantId: string;
  actorUserId: string;
}

/**
 * Write context for platform-scoped operations
 */
export interface PlatformWriteContext {
  actorUserId: string;
}

/**
 * Error thrown when write guards are violated
 */
export class WriteGuardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WriteGuardError';
  }
}

/**
 * Validate tenant-scoped write context
 * 
 * Ensures that tenantId and actorUserId are present for operations
 * that affect tenant-specific data.
 * 
 * @param context - Write context to validate
 * @throws WriteGuardError if validation fails
 * 
 * @example
 * ```typescript
 * validateTenantWrite({ tenantId: 'tenant-123', actorUserId: 'user-456' });
 * ```
 */
export function validateTenantWrite(context: Partial<TenantWriteContext>): asserts context is TenantWriteContext {
  if (!context.tenantId || context.tenantId.trim() === '') {
    throw new WriteGuardError(
      'WRITE_GUARD_VIOLATION: tenantId is required for tenant-scoped write operations'
    );
  }

  if (!context.actorUserId || context.actorUserId.trim() === '') {
    throw new WriteGuardError(
      'WRITE_GUARD_VIOLATION: actorUserId is required for all write operations'
    );
  }
}

/**
 * Validate platform-scoped write context
 * 
 * Ensures that actorUserId is present for operations that affect
 * platform-wide data (not tenant-specific).
 * 
 * @param context - Write context to validate
 * @throws WriteGuardError if validation fails
 * 
 * @example
 * ```typescript
 * validatePlatformWrite({ actorUserId: 'admin-123' });
 * ```
 */
export function validatePlatformWrite(context: Partial<PlatformWriteContext>): asserts context is PlatformWriteContext {
  if (!context.actorUserId || context.actorUserId.trim() === '') {
    throw new WriteGuardError(
      'WRITE_GUARD_VIOLATION: actorUserId is required for all write operations'
    );
  }
}

/**
 * Ensure tenant context exists
 * 
 * Helper to validate that a tenantId is provided.
 * 
 * @param tenantId - Tenant ID to validate
 * @throws WriteGuardError if tenantId is missing or empty
 */
export function ensureTenantId(tenantId: string | null | undefined): asserts tenantId is string {
  if (!tenantId || tenantId.trim() === '') {
    throw new WriteGuardError(
      'WRITE_GUARD_VIOLATION: tenantId cannot be null or empty for tenant-scoped operations'
    );
  }
}

/**
 * Ensure actor context exists
 * 
 * Helper to validate that an actorUserId is provided.
 * 
 * @param actorUserId - Actor user ID to validate
 * @throws WriteGuardError if actorUserId is missing or empty
 */
export function ensureActorUserId(actorUserId: string | null | undefined): asserts actorUserId is string {
  if (!actorUserId || actorUserId.trim() === '') {
    throw new WriteGuardError(
      'WRITE_GUARD_VIOLATION: actorUserId cannot be null or empty for write operations'
    );
  }
}
