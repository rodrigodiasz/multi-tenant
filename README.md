# Multi-Tenant API

A multi-tenant REST API built with Fastify, Prisma, and PostgreSQL. It supports multiple organizations per user, role-based access control, and scoped data isolation via organization context headers.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Fastify 5
- **ORM:** Prisma 7 (PostgreSQL)
- **Auth:** JWT via `@fastify/jwt`
- **Validation:** Zod
- **Package Manager:** pnpm

## Architecture

```
src/
├── @types/          # Fastify and JWT type augmentations
├── adapters/        # routeAdapter — bridges Fastify handlers to controllers
├── controllers/     # Request handlers (auth, leads, organizations)
├── factories/       # Dependency injection wiring
├── interfaces/      # Shared TypeScript interfaces (IController)
├── lib/             # Prisma client singleton
├── middlewares/     # JWT authentication + role permission guards
├── repositories/    # Database access layer
└── routes/          # Route registration
```

The app follows a factory + repository pattern. Each controller is instantiated via a factory that injects the appropriate repository with the organization scope baked in. The `routeAdapter` handles two modes: with org context (reads `x-org-id` header) and without.

## Data Model

| Model            | Description                                      |
|------------------|--------------------------------------------------|
| `User`           | Application user with `tenantId` for isolation   |
| `Organization`   | A tenant organization                            |
| `OrganizationUser` | Junction — links users to orgs with a role     |
| `Lead`           | CRM lead scoped to an organization               |
| `Interaction`    | Message/interaction tied to a lead               |

**Roles:** `OWNER`, `ADMIN`, `MEMBER`

## API Endpoints

### Public

| Method | Path           | Description                          |
|--------|----------------|--------------------------------------|
| POST   | /auth/signup   | Register a user and create an org    |
| POST   | /auth/signin   | Authenticate and receive a JWT       |

### Protected (requires `Authorization: Bearer <token>`)

| Method | Path                  | Role required   | Org header required |
|--------|-----------------------|-----------------|---------------------|
| GET    | /organization/        | any             | no                  |
| GET    | /organization/users   | ADMIN / OWNER   | yes                 |
| GET    | /leads                | MEMBER+         | yes                 |
| POST   | /leads                | ADMIN / OWNER   | yes                 |

Organization-scoped routes require the `x-org-id: <organizationId>` header.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL

### Setup

```bash
pnpm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/multitenant"
JWT_SECRET="your-secret-key"
```

Run migrations and generate the Prisma client:

```bash
pnpm prisma migrate deploy
pnpm prisma generate
```

### Running

```bash
# Development
pnpm dev

# Production
pnpm build
pnpm start
```

Server starts on port **3001**.

## Authentication Flow

1. `POST /auth/signup` — creates a user and a default organization; returns the user ID.
2. `POST /auth/signin` — verifies credentials; returns a JWT (5-hour expiry).
3. Include the token in subsequent requests: `Authorization: Bearer <token>`.
4. For org-scoped endpoints, also include `x-org-id: <organizationId>`.
