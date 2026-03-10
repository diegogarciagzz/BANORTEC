import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ExternalLink } from "lucide-react";

const stocks = [
  { ticker: "NVDA", name: "NVDA Corporat...", price: 185.34, change: "+1.47%", color: "#3B5BDB", positive: true },
  { ticker: "CNC", name: "Centene Corpo...", price: 37.54, change: "-13.34%", color: "#EC0029", positive: false },
  { ticker: "AADR", name: "AdvisorShares...", price: 89.67, change: "+5.71%", color: "#FCC419", positive: true },
  { ticker: "ALSEA", name: "Alsea, S.A.B...", price: 56.92, change: "+8.73%", color: "#20C997", positive: true },
];

const chartData = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
].map((month, i) => ({
  month,
  nvda: 15 + Math.sin(i * 0.8) * 10 + i * 2.5,
  cnc: 30 - Math.sin(i * 0.5) * 8 - i * 0.8,
  aadr: 20 + Math.cos(i * 0.6) * 12 + i * 1.5,
  alsea: 10 + Math.sin(i * 1.2) * 6 + i * 1,
}));

export default function StocksPanel() {
  return (
    <div className="card stocks-card">
      <div className="stocks-layout">
        <div className="stocks-left">
          <div className="stocks-list">
            {stocks.map((s) => (
              <div key={s.ticker} className="stock-row">
                <span className="stock-dot" style={{ backgroundColor: s.color }} />
                <div className="stock-info">
                  <span className="stock-ticker">{s.ticker}</span>
                  <span className="stock-name">{s.name}</span>
                </div>
                <div className="stock-price">
                  <span>{s.price.toFixed(2)}</span>
                  <span className={s.positive ? "stock-up" : "stock-down"}>
                    {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stocks-right">
          <div className="stocks-chart-header">
            <ExternalLink size={14} color="#999" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gNvda" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B5BDB" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3B5BDB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gCnc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EC0029" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#EC0029" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gAadr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FCC419" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#FCC419" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gAlsea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#20C997" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#20C997" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="nvda" stroke="#3B5BDB" fill="url(#gNvda)" strokeWidth={2} />
              <Area type="monotone" dataKey="cnc" stroke="#EC0029" fill="url(#gCnc)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="aadr" stroke="#FCC419" fill="url(#gAadr)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="alsea" stroke="#20C997" fill="url(#gAlsea)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
