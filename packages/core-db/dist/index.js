"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuditInProgress = exports.auditDelete = exports.auditUpdate = exports.auditCreate = exports.createAuditLog = exports.WriteGuardError = exports.ensureActorUserId = exports.ensureTenantId = exports.validatePlatformWrite = exports.validateTenantWrite = exports.withTransactionOptions = exports.withTransaction = exports.AuditAction = exports.RoleScope = exports.PartnerStatus = exports.TenantStatus = exports.UserStatus = exports.disconnectPrisma = exports.getPrismaClient = exports.db = void 0;
// Prisma client
var client_1 = require("./client");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return client_1.db; } });
Object.defineProperty(exports, "getPrismaClient", { enumerable: true, get: function () { return client_1.getPrismaClient; } });
Object.defineProperty(exports, "disconnectPrisma", { enumerable: true, get: function () { return client_1.disconnectPrisma; } });
var types_1 = require("./types");
Object.defineProperty(exports, "UserStatus", { enumerable: true, get: function () { return types_1.UserStatus; } });
Object.defineProperty(exports, "TenantStatus", { enumerable: true, get: function () { return types_1.TenantStatus; } });
Object.defineProperty(exports, "PartnerStatus", { enumerable: true, get: function () { return types_1.PartnerStatus; } });
Object.defineProperty(exports, "RoleScope", { enumerable: true, get: function () { return types_1.RoleScope; } });
Object.defineProperty(exports, "AuditAction", { enumerable: true, get: function () { return types_1.AuditAction; } });
// Transaction helpers
var transaction_1 = require("./transaction");
Object.defineProperty(exports, "withTransaction", { enumerable: true, get: function () { return transaction_1.withTransaction; } });
Object.defineProperty(exports, "withTransactionOptions", { enumerable: true, get: function () { return transaction_1.withTransactionOptions; } });
// Write guards
var guards_1 = require("./guards");
Object.defineProperty(exports, "validateTenantWrite", { enumerable: true, get: function () { return guards_1.validateTenantWrite; } });
Object.defineProperty(exports, "validatePlatformWrite", { enumerable: true, get: function () { return guards_1.validatePlatformWrite; } });
Object.defineProperty(exports, "ensureTenantId", { enumerable: true, get: function () { return guards_1.ensureTenantId; } });
Object.defineProperty(exports, "ensureActorUserId", { enumerable: true, get: function () { return guards_1.ensureActorUserId; } });
Object.defineProperty(exports, "WriteGuardError", { enumerable: true, get: function () { return guards_1.WriteGuardError; } });
// Audit hooks
var audit_1 = require("./audit");
Object.defineProperty(exports, "createAuditLog", { enumerable: true, get: function () { return audit_1.createAuditLog; } });
Object.defineProperty(exports, "auditCreate", { enumerable: true, get: function () { return audit_1.auditCreate; } });
Object.defineProperty(exports, "auditUpdate", { enumerable: true, get: function () { return audit_1.auditUpdate; } });
Object.defineProperty(exports, "auditDelete", { enumerable: true, get: function () { return audit_1.auditDelete; } });
Object.defineProperty(exports, "isAuditInProgress", { enumerable: true, get: function () { return audit_1.isAuditInProgress; } });
//# sourceMappingURL=index.js.map