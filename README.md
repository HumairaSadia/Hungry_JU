# Hungry_JU

Campus food ordering and peer delivery for Jahangirnagar University (Bot Tola vendors).
Next.js web application, MVC + service/repository layers, OOP throughout.

**Status: structure only.** Every class method throws `NotImplementedError` — the skeleton
defines the contract, not the behaviour.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DB + JWT + SMTP values
npm run dev
```

## Scripts

| Script                 | Purpose                          |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Development server               |
| `npm run build`        | Production build                 |
| `npm run lint`         | ESLint                           |
| `npm run format`       | Prettier write (run before push) |
| `npm run format:check` | Prettier check                   |

## Layout

```
src/app/**/page.js      views (React)
src/app/api/**/route.js thin HTTP boundary
src/components/         presentational components
src/lib/api-client.js   browser-side API client
src/server/controllers  parse, authorize, delegate, respond
src/server/services     business rules + order state machine
src/server/repositories data access
src/server/models       domain entities
src/server/middleware   auth, RBAC, validation, errors, rate limit
src/server/validators   Zod schemas
src/server/config       env, constants, DI container, database
src/shared/enums        shared enumerations
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for layer rules, OOP decisions, and scope.

## Conventions

Coding standards doc: kebab-case files, PascalCase classes/components, camelCase members,
UPPER_SNAKE_CASE constants, 2-space indent, 100-column lines, Prettier before push,
feature branches only, commits as `feat:` / `fix:` / `docs:` / `refactor:`.
