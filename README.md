# Banking API using NestJS

This is a simple Banking API, which implements three event types over in-memory accounts:

- `deposit`
- `withdraw`
- `transfer`

There is no database connection. The state is held in memory and can be reset with `POST /reset`.

## Install

```bash
npm install
```

## Run

```bash
npm run start
```

By default, the API runs on `http://localhost:3000`.

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

## API Contract

### Reset state

`POST /reset`

Response:

- `200` with empty body

### Get balance

`GET /balance?account_id={id}`

Responses:

- `200` `{ "balance": number }`
- `404` `0` when account does not exist

### Process event

`POST /event`

Body:

```json
{
  "type": "deposit | withdraw | transfer",
  "origin": "string (optional)",
  "destination": "string (optional)",
  "amount": "number"
}
```

Rules:

- `deposit`: requires `destination`
- `withdraw`: requires `origin`
- `transfer`: requires `origin` and `destination`
- `amount` must be greater than `0`

Responses:

- `201` with updated accounts
- `400` for invalid payload or business rule violation
- `404` `0` when an account is not found

## Architecture and Patterns

The code follows a modular MVC structure from Nest:

- `account` module: account state and balance operations
- `event` module: event orchestration (`deposit`, `withdraw`, `transfer`)
- `filters` module: HTTP error mapping
- `domain/errors`: domain-level errors independent from HTTP

Core principles used on the project:

- Business logic isolated from HTTP transport
- Domain errors translated to HTTP responses via global filter
- DTO validation with `class-validator` and global `ValidationPipe`
