const CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Other"];

export default function ExpenseList({ expenses, onEdit, onDelete, filters, onFilterChange }) {
  return (
    <div className="expense-list">
      <div className="list-header">
        <h2>Expenses</h2>
        <div className="filters">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => onFilterChange({ ...filters, from: e.target.value })}
          />
          <span>to</span>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => onFilterChange({ ...filters, to: e.target.value })}
          />
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add your first one above.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Note</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id}>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td><span className={`badge badge-${exp.category.toLowerCase()}`}>{exp.category}</span></td>
                <td className="note-cell">{exp.note || "—"}</td>
                <td className="amount-cell">₹{exp.amount.toFixed(2)}</td>
                <td className="actions-cell">
                  <button onClick={() => onEdit(exp)}>Edit</button>
                  <button className="danger" onClick={() => onDelete(exp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}