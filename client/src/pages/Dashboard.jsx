import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import CategoryChart from "../components/CategoryChart.jsx";
import ReceiptSummary from "../components/ReceiptSummary.jsx";
import CoinStack3D from "../components/CoinStack3D.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({ category: "", from: "", to: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;

      const [expensesRes, summaryRes] = await Promise.all([
        api.get("/expenses", { params }),
        api.get("/expenses/summary"),
      ]);
      setExpenses(expensesRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleAddOrUpdate(data) {
    try {
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense._id}`, data);
        setEditingExpense(null);
      } else {
        await api.post("/expenses", data);
      }
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save expense");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this expense?")) return;
    try {
      await api.delete(`/expenses/${id}`);
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete expense");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Expense Tracker</h1>
        <button onClick={logout}>Log out</button>
      </header>

      {error && <p className="error">{error}</p>}

      <ReceiptSummary summary={summary} expenseCount={expenses.length} />

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <ExpenseForm
            onSubmit={handleAddOrUpdate}
            editingExpense={editingExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />
          {loading ? (
            <p>Loading expenses…</p>
          ) : (
            <ExpenseList
              expenses={expenses}
              onEdit={setEditingExpense}
              onDelete={handleDelete}
              filters={filters}
              onFilterChange={setFilters}
            />
          )}
        </div>
        <div className="dashboard-side">
          <div className="coin-stack-card">
            <h2>Your spend, stacked</h2>
            <CoinStack3D totalSpend={summary.reduce((sum, s) => sum + s.total, 0)} />
          </div>
          <CategoryChart summary={summary} />
        </div>
      </div>
    </div>
  );
}