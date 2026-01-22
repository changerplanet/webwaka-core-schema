"use strict";
/**
 * Typed Re-Exports
 *
 * Exports Prisma-generated types for all Core entities.
 * These types are the authoritative source of truth for Core data structures.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditAction = exports.RoleScope = exports.PartnerStatus = exports.TenantStatus = exports.UserStatus = void 0;
/**
 * Export Prisma enums
 */
var client_1 = require("@prisma/client");
Object.defineProperty(exports, "UserStatus", { enumerable: true, get: function () { return client_1.UserStatus; } });
Object.defineProperty(exports, "TenantStatus", { enumerable: true, get: function () { return client_1.TenantStatus; } });
Object.defineProperty(exports, "PartnerStatus", { enumerable: true, get: function () { return client_1.PartnerStatus; } });
Object.defineProperty(exports, "RoleScope", { enumerable: true, get: function () { return client_1.RoleScope; } });
Object.defineProperty(exports, "AuditAction", { enumerable: true, get: function () { return client_1.AuditAction; } });
//# sourceMappingURL=types.js.map