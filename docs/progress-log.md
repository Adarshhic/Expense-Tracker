# Progress Log

Update this after each work session: what you did, decisions made, problems
hit, and what's next.

---

## 2026-07-30
**Done:**
- Chose app idea (Expense Tracker) and stack (React + Node/Express + MongoDB)
- Wrote `docs/planning.md`
- Scaffolded server (Express, Mongoose models, JWT auth, expense CRUD API)
- Scaffolded client (Vite React app, routing, login/signup pages, dashboard placeholder)

**Decisions:**
- JWT stored in `localStorage` for simplicity (documented tradeoff: less secure
  against XSS than an httpOnly cookie, but simpler for this scope)
- Categories are a fixed enum on the server rather than user-defined, to keep
  the dashboard aggregation simple

**Next:**
- Install dependencies and confirm both client and server run locally
- Wire up the Dashboard page to fetch and display real expenses
- Build the add/edit expense form
