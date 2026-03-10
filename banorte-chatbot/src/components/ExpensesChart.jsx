import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Renta", value: 55, color: "#3B5BDB" },
  { name: "Alimentos", value: 25, color: "#FCC419" },
  { name: "Entretenimiento", value: 15, color: "#845EF7" },
  { name: "Ahorro", value: 5, color: "#20C997" },
];

export default function ExpensesChart() {
  return (
    <div className="card expenses-card">
      <h3>Gastos del Mes</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-legend">
          {data.map((item) => (
            <div key={item.name} className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend-label">{item.name}</span>
              <span className="legend-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
