import { Router } from "express";
import mongoose from "mongoose";
import Expense, { EXPENSE_CATEGORIES } from "../models/Expense.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

// GET /api/expenses?category=Food&from=2026-01-01&to=2026-01-31
router.get("/", async (req, res) => {
  const { category, from, to } = req.query;
  const filter = { userId: req.userId };

  if (category) filter.category = category;
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }

  const expenses = await Expense.find(filter).sort({ date: -1 });
  res.json(expenses);
});

router.post("/", async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ error: "amount and category are required" });
    }
    if (!EXPENSE_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `category must be one of: ${EXPENSE_CATEGORIES.join(", ")}` });
    }

    const expense = await Expense.create({
      userId: req.userId,
      amount,
      category,
      date: date ? new Date(date) : new Date(),
      note,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: "Failed to create expense", details: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Failed to update expense", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!expense) return res.status(404).json({ error: "Expense not found" });
  res.json({ success: true });
});

// GET /api/expenses/summary — totals by category, for the dashboard
router.get("/summary", async (req, res) => {
  const summary = await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
  ]);
  res.json(summary);
});

export default router;