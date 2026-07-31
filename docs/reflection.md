# Final Reflection

## What worked well
- Starting with a planning document before writing any code made the rest
  of the build much faster — the database schema, feature list, and
  milestones were already decided, so implementation was mostly execution
  rather than design-while-coding.
- Breaking the app into clear milestones (auth → CRUD API → dashboard UI →
  polish → deploy) made progress easy to track and made commits naturally
  fall into logical, reviewable chunks instead of one giant dump.
- Using AI to scaffold boilerplate (Express routes, Mongoose models, React
  component structure) freed up time to focus on the parts that actually
  needed judgment: the database design, the UI direction, and debugging.
- The AI-assisted UI redesign phase worked especially well once I gave a
  clear instruction ("polish to the best possible level") — it produced a
  cohesive visual identity (the ledger/receipt theme) rather than a generic
  dashboard look, which made the app feel more like a real product.

## What did not work well
- Early on, environment setup ate more time than actual coding: a nested
  project folder from unzipping, an `.env` file that didn't exist yet, and
  then a `querySrv ECONNREFUSED` DNS issue with the MongoDB Atlas
  connection string. None of these were code bugs — they were environment
  and network issues that AI could only partially diagnose without seeing
  my actual terminal output.
- AI's first attempt at fixing the DNS issue used `require("dns")`, which
  doesn't work in this project since it uses ES modules. A small but real
  reminder that AI-suggested fixes still need to match the actual project
  configuration, not just be conceptually correct.
- The summary/total-spend bug (`Expense.aggregate()` not auto-casting
  `userId` to `ObjectId` the way `.find()` does) was a silent failure — no
  error was thrown, the endpoint just returned an empty array. This was the
  hardest bug to catch because everything else in the app appeared to work
  normally.

## How AI influenced development
AI (Claude) was used throughout as a pair-programmer rather than a
one-shot code generator: it scaffolded the initial project structure,
built out full features (dashboard, forms, charts) in response to specific
instructions, and helped debug issues by reasoning through symptoms rather
than guessing blindly (e.g. tracing the ObjectId bug to the specific
difference between `.find()` and `.aggregate()` casting behavior). At the
same time, every AI-generated fix was tested locally before being trusted
— the DNS fix and the ObjectId fix both needed a second pass because the
first attempt didn't fully match the project's real environment or
runtime behavior.

## What I would improve with more time
- Add the budget/over-budget stretch goal from the original plan (monthly
  limits per category with a warning when exceeded).
- Add automated tests for the API routes (auth, CRUD, summary) so
  regressions like the ObjectId bug would be caught automatically instead
  of by manual inspection of the dashboard.
- Add input validation and error states more thoroughly on the client
  (e.g. handling expired JWTs gracefully instead of just failing API
  calls).
- Consider moving the JWT from `localStorage` to an httpOnly cookie for
  better protection against XSS, now that the app is a real deployed
  target rather than just a local prototype.

## Key learnings
- Planning before coding pays off more with AI-assisted development, not
  less — because AI can execute a well-specified plan quickly, but a vague
  plan just leads to more code that needs to be reworked.
- "The code runs without errors" is not the same as "the code is correct."
  The most damaging bug in this project (the ObjectId aggregation mismatch)
  produced no error at all — it just silently returned wrong data.
- AI is very good at producing plausible-looking fixes quickly; it's my
  job to verify each one actually works in the real environment (correct
  module system, correct casting behavior, correct deployed URLs) rather
  than assuming a fix is complete just because it's well-explained.
