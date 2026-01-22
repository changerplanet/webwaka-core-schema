# WebWaka Data Ownership Contract

**Version**: 1.0.0  
**Status**: **BINDING**  
**Effective Date**: January 22, 2026

---

## Purpose

This document establishes the **authoritative data ownership rules** for the WebWaka platform. It defines which components own which data, and enforces strict boundaries to prevent architectural chaos, data corruption, and security vulnerabilities.

---

## Core Principle

> **Core owns identity, tenancy, roles, partners, and domains.**  
> **Suites must NEVER write Core tables directly.**  
> **All writes go through Core APIs only.**

---

## Data Ownership Matrix

| Data Domain | Owner | Write Access | Read Access |
|-------------|-------|--------------|-------------|
| **Users** | Core | Core APIs only | Core APIs + Suites (via API) |
| **External Identities** | Core | Core APIs only | Core APIs only |
| **Tenants** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Tenant Memberships** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Roles** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Permissions** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Role Assignments** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Partners** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Partner Users** | Core | Core APIs only | Core APIs only |
| **Partner Tiers** | Core | Core APIs only | Core APIs only |
| **Domains** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Whitelabel Config** | Core | Core APIs only | Core APIs + Suites (via API) |
| **Audit Logs** | Core | Core DAL only (automatic) | Core APIs only |
| **System Settings** | Core | Core APIs only | Core APIs only |

---

## Prohibited Actions

### ❌ Suites MUST NOT

1. **Directly connect to the Core database**
   - No direct Prisma client usage
   - No raw SQL queries
   - No ORM bypasses

2. **Write to Core tables**
   - No INSERT, UPDATE, DELETE operations
   - No schema modifications
   - No index creation

3. **Bypass Core APIs**
   - No "temporary" direct access
   - No "read-only" exceptions
   - No "emergency" workarounds

4. **Cache Core data indefinitely**
   - Core data may be cached temporarily (< 5 minutes)
   - Must revalidate via Core APIs
   - Must respect cache invalidation signals

---

## Allowed Actions

### ✅ Suites MAY

1. **Read Core data via Core APIs**
   - GET endpoints for users, tenants, roles, etc.
   - Paginated queries
   - Filtered searches

2. **Request writes via Core APIs**
   - POST, PUT, PATCH, DELETE via Core endpoints
   - All writes subject to Core validation
   - All writes automatically audited

3. **Maintain Suite-specific data**
   - Suites own their own business data
   - POS owns products, transactions, inventory
   - MVM owns vehicles, maintenance records
   - Sites owns content, pages, media

---

## Core Responsibilities

### Core MUST

1. **Provide stable APIs for all Core data**
   - RESTful or GraphQL endpoints
   - Versioned and documented
   - Backward-compatible changes only

2. **Enforce tenant isolation**
   - All queries filtered by tenant context
   - No cross-tenant data leakage
   - Partner isolation where applicable

3. **Audit all write operations**
   - Automatic audit logging via DAL
   - Immutable audit trail
   - Forensic-ready logs

4. **Validate all writes**
   - Schema validation
   - Business rule enforcement
   - Authorization checks

---

## Suite Responsibilities

### Suites MUST

1. **Use Core APIs exclusively**
   - No direct database access
   - No schema assumptions
   - No hardcoded Core table names

2. **Handle API failures gracefully**
   - Implement retry logic
   - Provide fallback UX
   - Log errors for debugging

3. **Respect Core data models**
   - Use Core-provided types
   - Do not duplicate Core entities
   - Do not extend Core tables

4. **Maintain referential integrity**
   - Store Core entity IDs (e.g., `userId`, `tenantId`)
   - Do not cache Core entity details
   - Revalidate references periodically

---

## Enforcement

### Violations of this contract will result in:

1. **Immediate rollback** of offending code
2. **Blocking of deployment** until fixed
3. **Architectural review** of the offending Suite
4. **Potential refactoring** of the Suite's data access layer

### This contract is enforced by:

- Code review processes
- Automated linting and static analysis
- Database access auditing
- Runtime monitoring

---

## Rationale

### Why this contract exists:

1. **Data Integrity**: Single source of truth prevents inconsistencies
2. **Security**: Centralized access control and audit logging
3. **Scalability**: Core can evolve independently of Suites
4. **Compliance**: Regulatory requirements demand audit trails
5. **Maintainability**: Clear boundaries reduce coupling

---

## Exceptions

### There are NO exceptions to this contract.

If a use case cannot be satisfied by Core APIs:
1. **Request a new Core API endpoint**
2. **Wait for Core team to implement it**
3. **Do NOT bypass the contract**

---

## Future Evolution

### This contract may evolve to include:

- Event-driven data synchronization
- GraphQL federation
- Real-time subscriptions
- Cached materialized views

### All changes to this contract require:

- Architectural review
- Documentation updates
- Migration plan
- Backward compatibility guarantee

---

## Conclusion

This data ownership contract is **binding and non-negotiable**. It is the foundation of WebWaka's architectural integrity and must be respected by all platform components.

---

**Document Status**: ✅ **BINDING**  
**Approved By**: WebWaka Platform Architecture  
**Effective Immediately**: January 22, 2026
