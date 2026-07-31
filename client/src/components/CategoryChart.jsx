import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2f6f4f", "#4c8c68", "#7ba982", "#a9c79c", "#d7e4b8", "#b8b8b8"];

export default function CategoryChart({ summary }) {
  const data = summary.map((s) => ({ name: s._id, value: s.total }));
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="category-chart">
      <h2>Spend by category</h2>
      {data.length === 0 ? (
        <p className="empty-state">Add some expenses to see your breakdown.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ₹${value.toFixed(0)}`}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="chart-total">Total spend: ₹{total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}