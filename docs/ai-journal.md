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
