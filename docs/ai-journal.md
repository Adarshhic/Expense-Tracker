# AI Usage Journal

Log each significant AI-assisted step here as you go: what you asked, what you
got back, what you kept vs. changed, and any bugs the AI introduced.

## Format for each entry
```
### [Date] — [Feature/Task]
**Tool used:** Claude / ChatGPT / Copilot / etc.
**Prompt(s):**
- ...
**What AI produced:**
- ...
**What I kept / changed:**
- ...
**Issues encountered:**
- ...
```

---

### 2026-07-30 — Project planning & scaffolding
**Tool used:** Claude (Sonnet 5)
**Prompt(s):**
- Asked for the assignment to be broken down into ordered steps
- Chose "Expense Tracker" as the app and "React + Node/Express + MongoDB" as the stack
- Asked Claude to draft `docs/planning.md` and scaffold the initial project

**What AI produced:**
- `docs/planning.md` with problem statement, features, architecture, DB schema, milestones
- Server scaffold: Express app, Mongoose models (`User`, `Expense`), JWT auth middleware, auth routes, expense CRUD routes
- Client scaffold: Vite + React app with routing (`Login`, `Signup`, `Dashboard` pages), Axios instance with token interceptor, base styling

**What I kept / changed:**
- (fill in after reviewing — e.g. did you change the DB schema, auth approach, styling?)

**Issues encountered:**
- (fill in once you've run `npm install` and tried starting both servers)

---

### 2026-07-31 — MongoDB Atlas connection debugging
**Tool used:** Claude (Sonnet 5)
**Issue:** `querySrv ECONNREFUSED` on the `mongodb+srv://` connection string —
turned out to be the local network/ISP blocking or mishandling DNS SRV
lookups (a known issue with some networks).
**Fix attempted:** Forced Node to use public DNS resolvers (Google `8.8.8.8`,
Cloudflare `1.1.1.1`) via `dns.setServers()` in `server/config/db.js`.
**Bug in AI's first fix:** Initial version used `const dns = require("dns")`,
which throws in ES modules (`"type": "module"` in `package.json`). Corrected
to `import dns from "node:dns"`.
**Outcome:** Server connects reliably; signup/login flow works end-to-end.

---

### 2026-07-31 — Building the Dashboard (list, form, chart)
**Tool used:** Claude (Sonnet 5)
**Prompt(s):**
- Asked for the full Dashboard build in one pass: expense list with
  filters, add/edit form, and a category breakdown chart

**What AI produced:**
- `ExpenseForm.jsx` — add/edit form with category select and date picker
- `ExpenseList.jsx` — table with category/date-range filters, edit/delete actions
- `CategoryChart.jsx` — Recharts pie chart of spend by category
- Rewired `Dashboard.jsx` to fetch expenses + summary in parallel and pass
  data down to all three components

**What I kept / changed:**
- Kept the structure as-is; this became the working v1 of the dashboard

**Issues encountered:**
- None at this stage — surfaced later once real data was added (see the
  ObjectId bug below)

---

### 2026-07-31 — UI redesign (ledger/receipt visual identity)
**Tool used:** Claude (Sonnet 5)
**Prompt(s):**
- Asked to "polish UI to the best possible level"

**What AI produced:**
- A deliberate design direction based on the app's subject matter (receipts
  and ledgers) instead of a generic dashboard look: warm paper background,
  forest-green + gold palette, Fraunces (serif display) + Inter (body) +
  IBM Plex Mono (all amounts/dates, for tabular alignment)
- A signature "torn receipt" summary card at the top of the dashboard
  showing total spend, entries logged, and top category
- Dashed hairline table rows and per-category colored badges

**What I kept / changed:**
- Kept the full design system as generated; it matched the app's purpose
  well rather than looking templated

**Issues encountered:**
- None — visual only, no functional risk

---

### 2026-07-31 — Adding a 3D element (Three.js coin stack)
**Tool used:** Claude (Sonnet 5)
**Prompt(s):**
- Asked to add a Three.js 3D element to the dashboard

**What AI produced:**
- `CoinStack3D.jsx` — a plain Three.js scene (no React-Three-Fiber, to
  avoid an extra dependency layer) rendering a rotating stack of gold
  coins, with height scaled to total spend
- Proper cleanup on unmount (dispose geometries/materials, cancel animation
  frame, remove renderer DOM node) to avoid memory leaks on hot reload

**What I kept / changed:**
- Kept as generated; verified rotation is real by watching it live (a
  screenshot can't show animation, which briefly confused me when
  reviewing progress)

**Issues encountered:**
- None functionally, but this is where I discovered the ObjectId bug below
  while checking the total spend value

---

### 2026-07-31 — Bug: summary/total spend showing ₹0.00 despite real data
**Tool used:** Claude (Sonnet 5)
**Symptom:** Expense list displayed correctly, but "Total spend" and
"Spend by category" both showed empty/zero after adding a ₹50,000 rent
expense.
**Diagnosis (AI-assisted):** The `/api/expenses/summary` route used
`Expense.aggregate()` with `$match: { userId: req.userId }`. Mongoose
auto-casts a string `userId` to `ObjectId` for `.find()` queries, but
**not** for raw `.aggregate()` pipelines — so the match compared a string
to an `ObjectId` field and silently returned zero results.
**Fix:** Wrapped `req.userId` in `new mongoose.Types.ObjectId(req.userId)`
inside the `$match` stage.
**Why this one mattered:** Silent failures (no error thrown, just an empty
array) are the hardest AI-generated bugs to catch — this is a good example
of why you can't just trust that AI code "runs without errors" means
"runs correctly."