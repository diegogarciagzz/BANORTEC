import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const stocks = [
  {
    ticker: "NVDA",
    name: "NVDA Corporat...",
    price: 185.34,
    change: "+1.47%",
    color: "#3B5BDB",
    positive: true,
  },
  {
    ticker: "CNC",
    name: "Centene Corpo...",
    price: 37.54,
    change: "-13.34%",
    color: "#EC0029",
    positive: false,
  },
  {
    ticker: "AADR",
    name: "AdvisorShares...",
    price: 89.67,
    change: "+5.71%",
    color: "#FCC419",
    positive: true,
  },
  {
    ticker: "ALSEA",
    name: "Alsea, S.A.B...",
    price: 56.92,
    change: "+8.73%",
    color: "#20C997",
    positive: true,
  },
];

const generateData = (positive) =>
  Array.from({ length: 12 }, (_, i) => ({
    month: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ][i],
    value: positive
      ? 10 + Math.random() * 30 + i * 2
      : 40 - Math.random() * 15 - i * 0.5,
  }));

export default function StocksPanel() {
  return (
    <div className="card stocks-card">
      <h3>Inversiones</h3>
      <div className="stocks-content">
        <div className="stocks-list">
          {stocks.map((s) => (
            <div key={s.ticker} className="stock-row">
              <span
                className="stock-dot"
                style={{ backgroundColor: s.color }}
              />
              <div className="stock-info">
                <span className="stock-ticker">{s.ticker}</span>
                <span className="stock-name">{s.name}</span>
              </div>
              <div className="stock-price">
                <span>{s.price.toFixed(2)}</span>
                <span
                  className={s.positive ? "stock-up" : "stock-down"}
                >
                  {s.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="stocks-chart">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={generateData(true)}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B5BDB" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3B5BDB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FCC419" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FCC419" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#845EF7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#845EF7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B5BDB"
                fill="url(#grad1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
