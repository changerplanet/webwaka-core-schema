# @webwaka/core-db

**WebWaka Core Database Access Layer (DAL)**

The single, authoritative, safe database access layer for all WebWaka Core data operations.

## Purpose

This package provides a clean, type-safe interface to the WebWaka Core database. It enforces:

- **Tenant isolation**: All tenant-scoped writes require `tenantId`
- **Actor accountability**: All writes require `actorUserId`
- **Audit trail**: Automatic logging of all CREATE, UPDATE, DELETE operations
- **Data integrity**: Transaction support for atomic operations

## Features

### 1. Prisma Client Singleton

Connection-pooling-safe Prisma client for all database operations.

```typescript
import { db } from '@webwaka/core-db';

const users = await db.user.findMany();
```

### 2. Typed Re-Exports

Strongly-typed interfaces for all Core entities.

```typescript
import type { User, Tenant, Role } from '@webwaka/core-db';
```

### 3. Transaction Helper

Execute multiple operations atomically.

```typescript
import { withTransaction } from '@webwaka/core-db';

const result = await withTransaction(async (tx) => {
  const user = await tx.user.create({ data: { email: 'user@example.com' } });
  const tenant = await tx.tenant.create({ data: { name: 'My Tenant' } });
  await tx.tenantMembership.create({
    data: { userId: user.id, tenantId: tenant.id }
  });
  return { user, tenant };
});
```

### 4. Write Guards

Enforce mandatory fields for all write operations.

```typescript
import { validateTenantWrite, validatePlatformWrite } from '@webwaka/core-db';

// Tenant-scoped write
validateTenantWrite({ tenantId: 'tenant-123', actorUserId: 'user-456' });

// Platform-scoped write
validatePlatformWrite({ actorUserId: 'admin-123' });
```

### 5. Audit Hooks

Automatic audit logging for all data changes.

```typescript
import { withTransaction, auditCreate, AuditAction } from '@webwaka/core-db';

await withTransaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'user@example.com', name: 'John Doe' }
  });
  
  await auditCreate(
    tx,
    'User',
    user.id,
    'admin-123',
    'tenant-456',
    { email: user.email, name: user.name }
  );
});
```

## Rules

This package is **data access only**. It must NOT contain:

- ❌ Business logic
- ❌ HTTP handling
- ❌ Clerk integration
- ❌ Feature-specific code

## Installation

```bash
npm install @webwaka/core-db
```

## Environment Variables

```bash
DATABASE_URL="postgresql://user:password@host/database?schema=webwaka"
```

## Usage Example

```typescript
import {
  db,
  withTransaction,
  validateTenantWrite,
  auditCreate,
  AuditAction,
  type User,
  type Tenant,
} from '@webwaka/core-db';

async function createUserWithTenant(
  email: string,
  tenantName: string,
  actorUserId: string
): Promise<{ user: User; tenant: Tenant }> {
  return withTransaction(async (tx) => {
    // Create user
    const user = await tx.user.create({
      data: { email, status: 'ACTIVE' }
    });

    // Create tenant
    const tenant = await tx.tenant.create({
      data: { name: tenantName, status: 'ACTIVE' }
    });

    // Validate write context
    validateTenantWrite({ tenantId: tenant.id, actorUserId });

    // Create membership
    await tx.tenantMembership.create({
      data: { userId: user.id, tenantId: tenant.id }
    });

    // Audit the operations
    await auditCreate(tx, 'User', user.id, actorUserId, null, { email });
    await auditCreate(tx, 'Tenant', tenant.id, actorUserId, null, { name: tenantName });

    return { user, tenant };
  });
}
```

## Architecture

This package is part of the WebWaka Core foundation and serves as the single source of truth for all Core data access. All future Core APIs must use this layer exclusively.

## License

UNLICENSED - Internal WebWaka Platform Package
