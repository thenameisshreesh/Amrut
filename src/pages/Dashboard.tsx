import StatCard from "../components/StatCard";
import { FiUsers, FiTag, FiShield, FiActivity, FiBarChart2, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { MdOutlineVaccines } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import "../styles/Dashboard.css";

const lineData = [
  { month: "Jan", treatments: 12 },
  { month: "Feb", treatments: 18 },
  { month: "Mar", treatments: 25 },
  { month: "Apr", treatments: 20 },
  { month: "May", treatments: 30 },
  { month: "Jun", treatments: 22 },
];

const barData = [
  { species: "Cattle", count: 120 },
  { species: "Goat", count: 70 },
  { species: "Buffalo", count: 55 },
  { species: "Sheep", count: 45 },
];

const pieData = [
  { name: "Safe", value: 82 },
  { name: "Under Withdrawal", value: 18 },
];

const complianceData = [
  { month: "Jan", compliant: 85, nonCompliant: 15 },
  { month: "Feb", compliant: 88, nonCompliant: 12 },
  { month: "Mar", compliant: 90, nonCompliant: 10 },
  { month: "Apr", compliant: 87, nonCompliant: 13 },
  { month: "May", compliant: 92, nonCompliant: 8 },
  { month: "Jun", compliant: 94, nonCompliant: 6 },
];

const vetActivityData = [
  { day: "Mon", visits: 12 },
  { day: "Tue", visits: 15 },
  { day: "Wed", visits: 18 },
  { day: "Thu", visits: 14 },
  { day: "Fri", visits: 20 },
  { day: "Sat", visits: 10 },
  { day: "Sun", visits: 8 },
];

const PIE_COLORS = ["#10b981", "#f97316"];
const GREEN_COLOR = "#10b981";
const ORANGE_COLOR = "#f97316";
const BLUE_COLOR = "#3b82f6";

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="page">
      {/* Top Header */}
      <header className="page-head">
        <div>
          <h2>AMU Dashboard</h2>
          <p>Authority overview of antimicrobial usage and farm safety</p>
          <span className="page-date">{today}</span>
        </div>

        <button className="head-icon-btn" aria-label="Notifications">
          🔔
        </button>
      </header>

      {/* KPI Cards - Row 1 */}
      <section className="grid-4">
        <StatCard
          title="Total Farmers"
          value={143}
          subtitle="Registered in system"
          badge="+8 this month"
          icon={<FiUsers size={20} />}
          accent="green"
        />
        <StatCard
          title="Total Animals"
          value={987}
          subtitle="Across all farms"
          badge="+52 added"
          icon={<FiTag size={20} />}
          accent="green"
        />
        <StatCard
          title="Total Vets"
          value={24}
          subtitle="Active veterinarians"
          badge="All verified"
          icon={<FiShield size={20} />}
          accent="blue"
        />
        <StatCard
          title="Total Treatments"
          value={436}
          subtitle="Logged this year"
          badge="+12.4%"
          icon={<MdOutlineVaccines size={20} />}
          accent="green"
        />
      </section>

      {/* KPI Cards - Row 2 */}
      <section className="grid-4 mt-24">
        <StatCard
          title="Safe Farms"
          value={82}
          subtitle="No active withdrawal"
          badge="+5 since last month"
          icon={<FiCheckCircle size={20} />}
          accent="green"
        />
        <StatCard
          title="Under Withdrawal"
          value={18}
          subtitle="Monitoring samples closely"
          badge="+2 flagged"
          icon={<FiAlertTriangle size={20} />}
          accent="orange"
        />
        <StatCard
          title="Active Monitoring"
          value={54}
          subtitle="Farms sending daily data"
          badge="Realtime"
          icon={<FiActivity size={20} />}
          accent="blue"
        />
        <StatCard
          title="Compliance Rate"
          value="94%"
          subtitle="MRL standards met"
          badge="Excellent"
          icon={<FiBarChart2 size={20} />}
          accent="green"
        />
      </section>

      {/* Charts row 1 - Main Analytics */}
      <section className="charts-wrap mt-24">
        {/* Line chart card - Green hover */}
        <div className="dashboard-card chart-card" data-theme="green">
          <div className="chart-card-head">
            <div>
              <h3>Treatments per Month</h3>
              <p>Track antimicrobial treatments over time</p>
            </div>
            <span className="chip chip-green">This year</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="treatments"
                  stroke={GREEN_COLOR}
                  strokeWidth={3}
                  dot={{ r: 5, fill: GREEN_COLOR }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar chart card - Green hover */}
        <div className="dashboard-card chart-card" data-theme="green">
          <div className="chart-card-head">
            <div>
              <h3>Animals by Species</h3>
              <p>Distribution of animals across registered farms</p>
            </div>
            <span className="chip chip-blue">
              <FiBarChart2 size={14} />
              Summary
            </span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="species" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Bar dataKey="count" fill={GREEN_COLOR} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart card - Orange hover (contains withdrawal data) */}
        <div className="dashboard-card chart-card" data-theme="orange">
          <div className="chart-card-head">
            <div>
              <h3>Farm Safety Status</h3>
              <p>Share of farms safe vs under withdrawal</p>
            </div>
            <span className="chip chip-green">Today</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  label={(entry) => `${entry.value}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Legend iconType="circle" />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Charts row 2 - Additional Monitoring */}
      <section className="charts-wrap-2 mt-24">
        {/* Compliance Trend Area Chart - Green hover */}
        <div className="dashboard-card chart-card" data-theme="green">
          <div className="chart-card-head">
            <div>
              <h3>Compliance Monitoring</h3>
              <p>Monthly compliance vs non-compliance rate</p>
            </div>
            <span className="chip chip-green">6 Months</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="compliant"
                  stackId="1"
                  stroke={GREEN_COLOR}
                  fill={GREEN_COLOR}
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="nonCompliant"
                  stackId="1"
                  stroke={ORANGE_COLOR}
                  fill={ORANGE_COLOR}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vet Activity Chart - Blue hover */}
        <div className="dashboard-card chart-card" data-theme="blue">
          <div className="chart-card-head">
            <div>
              <h3>Vet Activity (This Week)</h3>
              <p>Daily farm visits by registered veterinarians</p>
            </div>
            <span className="chip chip-blue">Weekly</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vetActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Bar dataKey="visits" fill={BLUE_COLOR} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
