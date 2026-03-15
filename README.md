# Boss Machine API

Boss Machine is a full-stack Codecademy backend exercise where an evil entrepreneur manages minions, million-dollar ideas, meetings, and minion work assignments through a REST API built with Express.

## Features

- CRUD routes for `minions` and `ideas`
- Meeting management endpoints (`GET`, auto-generated `POST`, bulk `DELETE`)
- Bonus nested routes for minion work: `/api/minions/:minionId/work`
- Custom middleware (`checkMillionDollarIdea`) to reject low-value ideas
- In-memory seeded database with helper methods in [`server/db.js`](./server/db.js)
- React + Redux frontend consuming the API

## Tech Stack

- Node.js
- Express
- Body Parser
- CORS
- Morgan (request logging)
- React + Redux (client)
- Mocha + Chai + Supertest (tests)
- Webpack

## Project Structure

```text
.
├── app.js                 # Express app configuration (middleware + /api mount)
├── main.js                # Server bootstrap
├── server/
│   ├── api.js             # Main API router
│   ├── minions.js         # /api/minions routes
│   ├── ideas.js           # /api/ideas routes
│   ├── meetings.js        # /api/meetings routes
│   ├── work.js            # Nested bonus routes for minion work
│   ├── checkMillionDollarIdea.js
│   └── db.js              # In-memory database + helpers
├── browser/               # React/Redux frontend source
├── public/                # Compiled client assets
└── test/                  # Mocha test suite
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the API server

```bash
npm run start
```

The app runs on:

- `http://localhost:4001` (default)
- or `process.env.PORT` if provided

### 3) Optional: run client build + server watcher together

```bash
npm run start-dev
```

## Available Scripts

- `npm run start`: starts `nodemon` watching backend files
- `npm run start-dev`: runs webpack in watch mode + nodemon
- `npm run test`: runs Mocha tests with `PORT=8000`

## API Reference

Base URL: `/api`

### Minions

- `GET /minions`
- `GET /minions/:minionId`
- `POST /minions`
- `PUT /minions/:minionId`
- `DELETE /minions/:minionId`

### Ideas

- `GET /ideas`
- `GET /ideas/:ideaId`
- `POST /ideas` (validated by `checkMillionDollarIdea`)
- `PUT /ideas/:ideaId`
- `DELETE /ideas/:ideaId`

### Meetings

- `GET /meetings`
- `POST /meetings` (creates a meeting server-side, no body required)
- `DELETE /meetings` (deletes all meetings)

### Bonus: Work by Minion

- `GET /minions/:minionId/work`
- `POST /minions/:minionId/work`
- `PUT /minions/:minionId/work/:workId`
- `DELETE /minions/:minionId/work/:workId`

## Data Models

- `Minion`: `id`, `name`, `title`, `weaknesses`, `salary`
- `Idea`: `id`, `name`, `description`, `numWeeks`, `weeklyRevenue`
- `Meeting`: `id`, `time`, `date`, `day`, `note`
- `Work`: `id`, `title`, `description`, `hours`, `minionId`

## Validation Rules

- `checkMillionDollarIdea` rejects idea payloads where:
  - `numWeeks` or `weeklyRevenue` is missing/invalid
  - `numWeeks * weeklyRevenue < 1000000`
- Numeric-like fields are cast to numbers on the server where needed.

## Notes

- The database is in-memory and is re-seeded when the server restarts.
- Request logs are written to `app.log`.
- This project is designed as an educational exercise focused on Express routing and middleware.
