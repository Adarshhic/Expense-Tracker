import { useState, useEffect } from "react";

const CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Other"];

export default function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState({ amount: "", category: "Food", date: "", note: "" });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date.slice(0, 10),
        note: editingExpense.note || "",
      });
    } else {
      setForm({ amount: "", category: "Food", date: "", note: "" });
    }
  }, [editingExpense]);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return;
    onSubmit({ ...form, amount: Number(form.amount) });
    if (!editingExpense) {
      setForm({ amount: "", category: "Food", date: "", note: "" });
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Edit expense" : "Add expense"}</h2>
      <div className="form-row">
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={update("amount")}
          required
        />
        <select value={form.category} onChange={update("category")}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="date" value={form.date} onChange={update("date")} />
      </div>
      <input
        className="note-input"
        placeholder="Note (optional)"
        value={form.note}
        onChange={update("note")}
      />
      <div className="form-actions">
        <button type="submit">{editingExpense ? "Save changes" : "Add expense"}</button>
        {editingExpense && (
          <button type="button" className="secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}