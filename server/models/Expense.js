import mongoose from "mongoose";

const CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Entertainment",
  "Other",
];

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, enum: CATEGORIES, required: true },
    date: { type: Date, required: true, default: Date.now },
    note: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export const EXPENSE_CATEGORIES = CATEGORIES;
export default mongoose.model("Expense", expenseSchema);
