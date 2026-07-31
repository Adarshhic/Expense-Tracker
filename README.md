# Expense Tracker

A small full-stack app for logging and understanding personal expenses.
Built with React (Vite), Express, and MongoDB.

See [`docs/planning.md`](docs/planning.md) for the full problem statement,
architecture, and feature list.

## Tech Stack
- **Client:** React (Vite), React Router, Axios, Recharts
- **Server:** Node.js, Express, Mongoose
- **Database:** MongoDB

## Project Structure
```
expense-tracker/
  client/     React frontend
  server/     Express API
  docs/       Planning, AI usage journal, progress log, reflection
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB instance (local install, or a free MongoDB Atlas cluster)

### 1. Clone and install
```bash
git clone <your-repo-url>
cd expense-tracker

cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables
```bash
cd server
cp .env.example .env
# edit .env: set MONGO_URI and a JWT_SECRET
```

### 3. Run the app
In one terminal:
```bash
cd server
npm run dev
```
In another terminal:
```bash
cd client
npm run dev
```
The client runs at `http://localhost:5173` and proxies `/api` requests to the
server at `http://localhost:5000`.

### 4. Try it out
1. Go to `http://localhost:5173/signup` and create an account
2. You'll be redirected to the dashboard (in progress — expense CRUD lands in the next milestone)

## API Endpoints (current)
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Create an account |
| POST | /api/auth/login | Log in |
| GET | /api/expenses | List expenses (auth required, supports `category`, `from`, `to` filters) |
| POST | /api/expenses | Create an expense |
| PUT | /api/expenses/:id | Update an expense |
| DELETE | /api/expenses/:id | Delete an expense |
| GET | /api/expenses/summary | Total spend by category |

## Status
🚧 In active development — see `docs/progress-log.md` for the current state.

## Documentation
- [`docs/planning.md`](docs/planning.md) — problem statement, architecture, milestones
- [`docs/ai-journal.md`](docs/ai-journal.md) — AI tools/prompts used during development
- [`docs/progress-log.md`](docs/progress-log.md) — running development log
- [`docs/reflection.md`](docs/reflection.md) — final reflection (added at project end)
