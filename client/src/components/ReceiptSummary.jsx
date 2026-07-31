export default function ReceiptSummary({ summary, expenseCount }) {
  const total = summary.reduce((sum, s) => sum + s.total, 0);
  const top = summary[0];
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="receipt-summary">
      <div className="receipt-body">
        <p className="receipt-eyebrow">Statement as of {today}</p>
        <div className="receipt-line">
          <span>Entries logged</span>
          <span className="mono">{expenseCount}</span>
        </div>
        <div className="receipt-line">
          <span>Top category</span>
          <span className="mono">{top ? top._id : "—"}</span>
        </div>
        <div className="receipt-divider" />
        <div className="receipt-total-line">
          <span>Total spend</span>
          <span className="mono receipt-total">₹{total.toFixed(2)}</span>
        </div>
      </div>
      <div className="receipt-tear" />
    </div>
  );
}