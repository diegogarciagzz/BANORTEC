import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { AlertTriangle } from "lucide-react";

const data = [
  { name: "Renta", value: 55, pct: "45%", color: "#3B5BDB" },
  { name: "Alimentos", value: 25, pct: "9%", color: "#845EF7" },
  { name: "Entretenimiento", value: 15, pct: "78%", color: "#EC0029" },
  { name: "Ahorro", value: 5, pct: "93%", color: "#FCC419" },
];

export default function ExpensesChart() {
  return (
    <div className="card expenses-card">
      <div className="expenses-layout">
        <div className="expenses-chart-area">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                stroke="none"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
                <Label
                  value="Gastos"
                  position="centerBottom"
                  dy={-4}
                  style={{ fontSize: "13px", fill: "#888", fontWeight: 500 }}
                />
                <Label
                  value="del Mes"
                  position="centerTop"
                  dy={10}
                  style={{ fontSize: "13px", fill: "#888", fontWeight: 500 }}
                />
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="expenses-legend">
          {data.map((item) => (
            <div key={item.name} className="legend-row">
              <span
                className="legend-bar"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend-pct">{item.pct}</span>
              <span className="legend-name">{item.name.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="expenses-alert">
        <AlertTriangle size={16} color="#EC0029" />
        <span>
          ¡Cuidado! Tu presupuesto de <strong>Ahorro</strong> y{" "}
          <strong>Entretenimiento</strong> están cerca del límite.
        </span>
      </div>
    </div>
  );
}
