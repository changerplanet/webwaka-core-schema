/**
 * Typed Re-Exports
 * 
 * Exports Prisma-generated types for all Core entities.
 * These types are the authoritative source of truth for Core data structures.
 */

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
} from '@prisma/client';

/**
 * Export Prisma enums
 */
export {
  UserStatus,
  TenantStatus,
  PartnerStatus,
  RoleScope,
  AuditAction,
} from '@prisma/client';

/**
 * Prisma client types for advanced usage
 */
export type { Prisma } from '@prisma/client';
