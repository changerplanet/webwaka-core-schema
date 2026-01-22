"use strict";
/**
 * Audit Hooks
 *
 * Provides automatic audit logging for all CREATE, UPDATE, and DELETE operations.
 * Ensures compliance, traceability, and accountability for all data changes.
 *
 * CRITICAL: Must NOT write audit logs recursively to prevent infinite loops.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditLog = createAuditLog;
exports.auditCreate = auditCreate;
exports.auditUpdate = auditUpdate;
exports.auditDelete = auditDelete;
exports.isAuditInProgress = isAuditInProgress;
const client_1 = require("@prisma/client");
/**
 * Context for recursive audit prevention
 * Tracks whether we're currently writing an audit log
 */
let isWritingAudit = false;
/**
 * Create an audit log entry
 *
 * Records a data change event in the audit log.
 * Prevents recursive audit logging.
 *
 * @param tx - Transaction client (ensures audit log is part of the same transaction)
 * @param data - Audit log entry data
 *
 * @example
 * ```typescript
 * await createAuditLog(tx, {
 *   action: AuditAction.CREATE,
 *   entityType: 'User',
 *   entityId: user.id,
 *   actorUserId: 'admin-123',
 *   tenantId: 'tenant-456',
 *   changes: { email: 'new@example.com' },
 *   metadata: { source: 'api' }
 * });
 * ```
 */
async function createAuditLog(tx, data) {
    // Prevent recursive audit logging
    if (isWritingAudit) {
        return;
    }
    try {
        isWritingAudit = true;
        await tx.auditLog.create({
            data: {
                action: data.action,
                entityType: data.entityType,
                entityId: data.entityId,
                actorUserId: data.actorUserId,
                tenantId: data.tenantId,
                changes: data.changes ?? undefined,
                metadata: data.metadata ?? undefined,
            },
        });
    }
    finally {
        isWritingAudit = false;
    }
}
/**
 * Audit a CREATE operation
 *
 * @param tx - Transaction client
 * @param entityType - Type of entity created (e.g., 'User', 'Tenant')
 * @param entityId - ID of the created entity
 * @param actorUserId - ID of the user who performed the action
 * @param tenantId - Optional tenant ID for tenant-scoped entities
 * @param data - The data that was created
 * @param metadata - Optional additional metadata
 */
async function auditCreate(tx, entityType, entityId, actorUserId, tenantId, data, metadata) {
    await createAuditLog(tx, {
        action: client_1.AuditAction.CREATE,
        entityType,
        entityId,
        actorUserId,
        tenantId: tenantId || null,
        changes: data,
        metadata,
    });
}
/**
 * Audit an UPDATE operation
 *
 * @param tx - Transaction client
 * @param entityType - Type of entity updated
 * @param entityId - ID of the updated entity
 * @param actorUserId - ID of the user who performed the action
 * @param tenantId - Optional tenant ID for tenant-scoped entities
 * @param changes - The fields that were changed (before/after values)
 * @param metadata - Optional additional metadata
 */
async function auditUpdate(tx, entityType, entityId, actorUserId, tenantId, changes, metadata) {
    await createAuditLog(tx, {
        action: client_1.AuditAction.UPDATE,
        entityType,
        entityId,
        actorUserId,
        tenantId: tenantId || null,
        changes,
        metadata,
    });
}
/**
 * Audit a DELETE operation
 *
 * @param tx - Transaction client
 * @param entityType - Type of entity deleted
 * @param entityId - ID of the deleted entity
 * @param actorUserId - ID of the user who performed the action
 * @param tenantId - Optional tenant ID for tenant-scoped entities
 * @param snapshot - Optional snapshot of the entity before deletion
 * @param metadata - Optional additional metadata
 */
async function auditDelete(tx, entityType, entityId, actorUserId, tenantId, snapshot, metadata) {
    await createAuditLog(tx, {
        action: client_1.AuditAction.DELETE,
        entityType,
        entityId,
        actorUserId,
        tenantId: tenantId || null,
        changes: snapshot,
        metadata,
    });
}
/**
 * Check if currently writing an audit log
 * Used to prevent recursive audit logging
 */
function isAuditInProgress() {
    return isWritingAudit;
}
//# sourceMappingURL=audit.js.map