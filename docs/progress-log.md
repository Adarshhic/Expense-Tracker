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

---

## 2026-07-31
**Done:** Got local dev environment fully running — server connects to
MongoDB Atlas, client/server proxy works, signup creates a user and logs
them in.

**Problems hit:** `querySrv ECONNREFUSED` on the Atlas SRV connection string
— network was blocking/mishandling SRV DNS lookups. Fixed by forcing a
public DNS resolver.

**Next:** Build out the real Dashboard — expense list, add-expense form,
category breakdown chart.

---

## 2026-07-31 (cont'd)
**Done:**
- Built full Dashboard: `ExpenseForm`, `ExpenseList` (with category/date
  filters), `CategoryChart` (Recharts pie chart), all wired to the API
- Full UI redesign: ledger/receipt visual identity (paper background,
  forest green + gold palette, serif/mono type system), including a
  signature "torn receipt" summary card
- Added a 3D element: rotating coin stack (Three.js) in the sidebar,
  height scaled to total spend

**Decisions:**
- Kept Three.js usage minimal/plain (no React-Three-Fiber) to avoid adding
  an extra abstraction layer for a single decorative element
- Used monospace font for all numeric data (dates, amounts) for a
  ledger-like tabular alignment

**Problems hit:**
- Total spend and category chart showed ₹0.00 / empty despite real data
  in the DB. Root cause: `Expense.aggregate()` doesn't auto-cast a string
  `userId` to `ObjectId` the way `.find()` does, so the `$match` stage
  matched nothing. Fixed by explicitly wrapping in
  `new mongoose.Types.ObjectId(req.userId)`.

**Next:**
- Deploy client (Vercel) and server (Render/Railway)
- Final `docs/reflection.md`
- Record walkthrough video