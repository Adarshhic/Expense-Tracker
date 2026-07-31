# Expense Tracker — Planning Document

## Problem Statement
Individuals often lose track of day-to-day spending because it's scattered across
bank apps, receipts, and memory. This app gives users a single place to log,
categorize, and understand their expenses over time.

## Application Overview
A web-based expense tracker where a user can sign up, log in, record expenses
(amount, category, date, note), view a dashboard summarizing spending by
category and time period, and edit/delete past entries.

## Features List
1. User authentication (signup/login, JWT-based sessions)
2. Add / edit / delete an expense
3. Categorize expenses (Food, Transport, Rent, Utilities, Entertainment, Other)
4. Filter/search expenses by date range and category
5. Dashboard: total spend, spend-by-category breakdown (chart), monthly trend
6. Monthly budget limit per category (stretch goal) with over-budget warning
7. Responsive UI (usable on mobile)

## Technical Architecture
- **Frontend:** React (Vite), React Router, Axios for API calls, Chart.js (or Recharts) for visualizations
- **Backend:** Node.js + Express REST API
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT stored in httpOnly cookie or localStorage (documented decision in ai-journal)
- **Deployment (stretch):** Client → Vercel/Netlify; Server + DB → Render/Railway + MongoDB Atlas

### High-level architecture
```
[React Client] <--HTTP/JSON--> [Express API] <--Mongoose--> [MongoDB]
```

## Database Design

### User
| Field | Type | Notes |
|---|---|---|
| _id | ObjectId | |
| name | String | |
| email | String | unique |
| passwordHash | String | |
| createdAt | Date | |

### Expense
| Field | Type | Notes |
|---|---|---|
| _id | ObjectId | |
| userId | ObjectId | ref → User |
| amount | Number | |
| category | String | enum |
| date | Date | |
| note | String | optional |
| createdAt | Date | |

### Budget (stretch goal)
| Field | Type | Notes |
|---|---|---|
| _id | ObjectId | |
| userId | ObjectId | ref → User |
| category | String | |
| monthlyLimit | Number | |

## Development Milestones
- **M1 — Project setup:** repo structure, client/server scaffolding, MongoDB connection
- **M2 — Auth:** signup/login endpoints, JWT middleware, protected routes
- **M3 — Core CRUD:** expense create/read/update/delete API + UI forms
- **M4 — Dashboard:** category breakdown chart, monthly trend, filters
- **M5 — Polish:** validation, error handling, responsive styling
- **M6 — Stretch:** budgets + over-budget warnings
- **M7 — Deployment:** deploy client + server, final README, docs, walkthrough video

## Out of Scope (for now)
- Multi-currency support
- Receipt image upload/OCR
- Shared/family accounts
