# Expense Tracker

A full-stack app for logging and understanding personal expenses — built
with React (Vite), Express, and MongoDB, with a ledger/receipt-inspired
UI and a 3D coin stack visualization of total spend.

**Live app:** https://expense-tracker-obh5.vercel.app
**Repo:** https://github.com/Adarshhic/Expense-Tracker

See [`docs/planning.md`](docs/planning.md) for the full problem statement,
architecture, and feature list, and [`docs/reflection.md`](docs/reflection.md)
for a retrospective on the build.

## Features
- JWT-based authentication (signup / login)
- Add, edit, delete expenses with category, date, and note
- Filter expenses by category and date range
- Dashboard with a "torn receipt" summary card (total spend, entries logged, top category)
- Category breakdown pie chart (Recharts)
- 3D rotating coin stack (Three.js) — height scales with total spend
- Responsive layout

## Tech Stack
- **Client:** React (Vite), React Router, Axios, Recharts, Three.js
- **Server:** Node.js, Express, Mongoose
- **Database:** MongoDB (Atlas)
- **Deployment:** Vercel (client), Render (server)

## Project Structure
```
expense-tracker/
  client/     React frontend
  server/     Express API
  docs/       Planning, AI usage journal, progress log, reflection
```

## Getting Started Locally

### Prerequisites
- Node.js 18+
- A MongoDB instance (local install, or a free MongoDB Atlas cluster)

### 1. Clone and install
```bash
git clone https://github.com/Adarshhic/Expense-Tracker.git
cd Expense-Tracker

cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

**Server** (`server/.env`):
```bash
cd server
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<a long random string>
CLIENT_URL=http://localhost:5173
```

**Client** — no `.env` needed for local dev; it uses Vite's built-in proxy
to reach the server at `localhost:5000`. (Only needed in production —
see Deployment below.)

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
The client runs at `http://localhost:5173` and proxies `/api` requests to
the server at `http://localhost:5000`.

### 4. Try it out
Go to `http://localhost:5173/signup`, create an account, and start adding
expenses — you'll land on the dashboard with the receipt summary, expense
list, category chart, and 3D coin stack.

## Deployment

This app is deployed as two separate services:

**Server → Render**
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL)

**Client → Vercel**
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL` (your Render URL + `/api`)

Note: the free Render tier spins down after inactivity, so the first
request after a period of idle time can take 30-60 seconds to respond.

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Create an account |
| POST | /api/auth/login | Log in |
| GET | /api/expenses | List expenses (auth required; supports `category`, `from`, `to` filters) |
| POST | /api/expenses | Create an expense |
| PUT | /api/expenses/:id | Update an expense |
| DELETE | /api/expenses/:id | Delete an expense |
| GET | /api/expenses/summary | Total spend by category |
| GET | /api/health | Health check |

## Documentation
- [`docs/planning.md`](docs/planning.md) — problem statement, architecture, milestones
- [`docs/ai-journal.md`](docs/ai-journal.md) — AI tools/prompts used, including bugs found and fixed
- [`docs/progress-log.md`](docs/progress-log.md) — running development log
- [`docs/reflection.md`](docs/reflection.md) — final reflection
