# webwaka-core-schema

**WebWaka Core - Canonical database schema and migrations (Prisma)**

## Overview

This repository contains the authoritative database schema for the WebWaka platform. It defines all core entities including Users, Tenants, Roles, Permissions, Partners, and system configuration.

## Status

✅ **v1.0.0 - Genesis Complete** (2026-01-22)

The initial schema has been implemented and applied to the Neon production database.

## Schema

The schema is defined using Prisma ORM and includes:

### Core Entities

- **User** - Platform users with external identity mapping
- **ExternalIdentity** - Links users to external auth providers (e.g., Clerk)
- **Tenant** - Multi-tenant organizations
- **TenantMembership** - User-tenant relationships
- **Role** - Platform and tenant-scoped roles
- **Permission** - Granular permission keys
- **RoleAssignment** - User role assignments (platform or tenant-scoped)

### Partner Management

- **Partner** - Partner organizations
- **PartnerUser** - Partner-user relationships
- **PartnerTier** - Partner tier configuration

### Configuration

- **Domain** - Custom domains for tenants
- **WhitelabelConfig** - Tenant branding configuration
- **AuditLog** - System audit trail
- **SystemSetting** - Platform-wide settings

## Database

- **Provider:** Neon PostgreSQL
- **Database:** `identity_db`
- **Schema:** `webwaka`
- **Role:** `webwaka_app`

## Migrations

Migrations are stored in `prisma/migrations/` and applied using Prisma Migrate.

### Initial Migration

- **Name:** `20260122000000_init_core_schema`
- **Applied:** 2026-01-22
- **Tables Created:** 14
- **Enums Created:** 4

## Usage

### Install Dependencies

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Apply Migrations

```bash
npx prisma migrate deploy
```

## Architecture Notes

- All entities use UUID primary keys
- Cascading deletes are configured for referential integrity
- The schema uses a dedicated `webwaka` schema (not `public`)
- External identity mapping supports multiple auth providers

## License

To be determined

## Contact

For questions or contributions, contact the WebWaka platform team.
