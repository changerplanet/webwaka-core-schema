/**
 * @webwaka/core-db
 * 
 * Core Database Access Layer (DAL)
 * 
 * This package provides the single, authoritative, safe database access layer
 * for all WebWaka Core data operations.
 * 
 * Features:
 * - Prisma client singleton with connection pooling
 * - Typed re-exports for all Core entities
 * - Transaction helpers for atomic operations
 * - Write guards to enforce tenancy and actor requirements
 * - Automatic audit logging for all write operations
 * 
 * Rules:
 * - No business logic in this layer
 * - No HTTP handling
 * - No Clerk integration (that belongs in the API layer)
 * - Data access only
 * 
 * @packageDocumentation
 */

// Prisma client
export { db, getPrismaClient, disconnectPrisma } from './client';

// Types
export type {
  User,
  ExternalIdentity,
  Tenant,
  TenantMembership,
  Role,
  Permission,
  RoleAssignment,
  Partner,
  PartnerUser,
  PartnerTier,
  Domain,
  WhitelabelConfig,
  AuditLog,
  SystemSetting,
  Prisma,
} from './types';

export {
  UserStatus,
  TenantStatus,
  PartnerStatus,
  RoleScope,
  AuditAction,
} from './types';

// Transaction helpers
export {
  withTransaction,
  withTransactionOptions,
  type TransactionClient,
  type TransactionOptions,
} from './transaction';

// Write guards
export {
  validateTenantWrite,
  validatePlatformWrite,
  ensureTenantId,
  ensureActorUserId,
  WriteGuardError,
  type TenantWriteContext,
  type PlatformWriteContext,
} from './guards';

// Audit hooks
export {
  createAuditLog,
  auditCreate,
  auditUpdate,
  auditDelete,
  isAuditInProgress,
  type AuditLogData,
} from './audit';
