# Hungry_JU — Architecture

Next.js (App Router) web application, MVC with an explicit service and repository layer.
Everything below is skeleton: classes, signatures, and the reasoning. No behaviour yet —
every method throws `NotImplementedError` so an unfinished path fails loudly.

## Layers

```
Browser ──► src/app/**/page.js            View (React, functional components)
             src/components/**            View (presentational only)
                 │  ApiClient (src/lib/api-client.js)
                 ▼
            src/app/api/**/route.js       HTTP boundary (thin, 1 call per handler)
                 ▼
            src/server/controllers        Controller — parse, authorize, delegate, respond
                 ▼
            src/server/services           Business rules (BR-01..BR-12), state machine
                 ▼
            src/server/repositories       Data access, row <-> model mapping
                 ▼
            src/server/models             Domain entities (Model), own their invariants
```

Cross-cutting: `middleware/` (auth, RBAC, validation, errors, rate limit),
`validators/` (Zod schemas), `config/` (env, constants, DI container, database),
`lib/` (email, notification dispatcher, logger), `shared/enums` (single source of enum truth).

### Where does the "M" live?

`models/` holds domain state and invariants; `repositories/` holds persistence.
They are split because a Model that also knows SQL cannot be unit-tested without a database,
and the SRS demands testable business rules (NFR-12).

### Controllers vs services

The coding standards say "business logic in controllers". In practice controllers stay thin
(parse → authorize → delegate → respond) and the rules live in services. Reason: the same rule
is reached from an HTTP route _and_ from the scheduler (BR-11 auto-cancel), so it cannot live in
an HTTP handler. Controllers remain the only place that touches `Request`/`Response`.

## OOP decisions

| Decision                                                          | Why                                                                              |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `User` abstract, subclassed by `Student`, `Vendor`, `Admin`       | Role behaviour differs (`role`, `defaultRoute`, permissions); identity is shared |
| Private `#fields` with getters                                    | Encapsulation — status changes go through methods, never assignment              |
| `BaseModel` / `BaseRepository` / `BaseService` / `BaseController` | Abstraction; shared contract, subclasses fill in specifics                       |
| Services take dependencies via constructor                        | Composition over inheritance; swappable fakes in tests (SOLID: D)                |
| `OrderStateMachine` as a transition table                         | SRS section 6: illegal transitions become impossible, not merely unlikely        |
| `DeliveryAssignmentService` separate from `DeliveryService`       | Single responsibility — the concurrency-critical claim is isolated and testable  |
| `Money` value object (integer poisha)                             | Floats have no business in an immutable financial record                         |

## Order lifecycle

`placed → accepted → preparing → ready → picked_up → delivered`
`cancelled` only from `placed`/`accepted` (BR-04); `rejected` only from `placed`;
`delivered`, `cancelled`, `rejected` are terminal. Encoded once in
`src/server/services/order-state-machine.js`.

## Concurrency

`DeliveryRepository.claimOrder` performs a conditional insert/update (status = expected
AND rider IS NULL). Exactly one concurrent accept can win; the losers receive
`ConflictError` → HTTP 409. `deliveries.order_id` is UNIQUE as the schema-level backstop
(NFR-11, risk R4).

## Scope

MVP is Epics A–E, COD-Direct payment (F01), and Admin G01–G03. Escrow, QR confirmation,
SMS OTP, and push notifications are Phase 2: their classes exist (`PaymentService`,
`PayoutSplit`, `TokenService.issueDeliveryQrToken`) but stay unimplemented so the schema
and route surface do not change later (SRS section 12.3).

## Conventions

- Files and folders: kebab-case. Classes: PascalCase. React components: PascalCase `.jsx`.
- Constants: UPPER_SNAKE_CASE, frozen objects in `src/shared/enums`.
- 2-space indent, 100-column lines, single quotes, semicolons — run `npm run format`.
- Comments explain _why_, not _what_.
- Documentation is JSDoc. Every file opens with a `@file` block and a `@module` tag; every
  class, method, getter, private field, exported constant, route handler, and React component
  carries a block with typed `@param`, `@returns`, and `@throws`. Skeleton members document the
  `NotImplementedError` they throw, so the contract is readable before the body exists.
- Types that cross a layer boundary (`Actor`, `PaginationMeta`, `Criteria`, `Schema`, …) are
  `@typedef`s in `src/shared/types/index.js`; reference them as
  `import('@/shared/types').Actor` instead of redeclaring shapes.
- Branches: feature branches only; commits use `feat:`, `fix:`, `docs:`, `refactor:`.
