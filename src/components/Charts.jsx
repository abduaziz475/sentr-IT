import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const monthly = [
  { month: 'May', revenue: 68, users: 40, orders: 28 },
  { month: 'Iyun', revenue: 82, users: 47, orders: 36 },
  { month: 'Iyul', revenue: 76, users: 54, orders: 32 },
  { month: 'Avg', revenue: 95, users: 61, orders: 43 },
  { month: 'Sen', revenue: 88, users: 70, orders: 48 },
  { month: 'Okt', revenue: 118, users: 82, orders: 59 },
  { month: 'Noy', revenue: 126, users: 91, orders: 66 },
]

const tooltipStyle = { background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 12, boxShadow: 'var(--shadow-soft)' }

export function RevenueChart({ height = 230, compact = false }) {
  return <ResponsiveContainer width="100%" height={height}><AreaChart data={monthly} margin={{ top: 14, right: 6, left: -18, bottom: 0 }}><defs><linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3bc6b0" stopOpacity={0.27} /><stop offset="95%" stopColor="#3bc6b0" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="var(--chart-grid)" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} dy={9} /><YAxis hide={compact} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickFormatter={(value) => `${value}m`} /><Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'var(--border-strong)', strokeDasharray: '3 3' }} formatter={(value) => [`${value} mln`, 'Daromad']} /><Area type="monotone" dataKey="revenue" stroke="#3bc6b0" strokeWidth={2.5} fill="url(#revenueGradient)" activeDot={{ r: 5, strokeWidth: 3, stroke: 'var(--surface-raised)' }} /></AreaChart></ResponsiveContainer>
}

export function GrowthChart({ height = 230 }) {
  return <ResponsiveContainer width="100%" height={height}><LineChart data={monthly} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}><CartesianGrid stroke="var(--chart-grid)" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} dy={9} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} /><Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey="users" name="Foydalanuvchilar" stroke="#7387ff" strokeWidth={2.5} dot={{ r: 3, fill: '#7387ff', strokeWidth: 0 }} activeDot={{ r: 5 }} /><Line type="monotone" dataKey="orders" name="Buyurtmalar" stroke="#f4aa69" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>
}

export function OrdersChart({ height = 210 }) {
  return <ResponsiveContainer width="100%" height={height}><BarChart data={monthly} margin={{ top: 12, right: 4, left: -20, bottom: 0 }}><CartesianGrid stroke="var(--chart-grid)" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} dy={9} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="orders" name="Buyurtmalar" fill="#8090ff" radius={[4, 4, 0, 0]} maxBarSize={25} animationDuration={900} /></BarChart></ResponsiveContainer>
}

export function ChannelChart() {
  const parts = [{ name: 'To‘g‘ridan-to‘g‘ri', value: 43, color: '#3bc6b0' }, { name: 'Tavsiya', value: 31, color: '#7888ff' }, { name: 'Organik', value: 26, color: '#f2aa6a' }]
  return <div className="channel-chart"><div className="channel-donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={parts} innerRadius="69%" outerRadius="94%" paddingAngle={4} dataKey="value" stroke="none" animationDuration={900}>{parts.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie></PieChart></ResponsiveContainer><div className="donut-label"><strong>1,248</strong><small>Jami user</small></div></div><div className="channel-legend">{parts.map((part) => <div key={part.name}><span style={{ background: part.color }} />{part.name}<strong>{part.value}%</strong></div>)}</div></div>
}

export function MiniBars() {
  return <div className="mini-bars" aria-hidden="true">{monthly.map((item) => <i key={item.month} style={{ height: `${Math.round(item.revenue / 1.35)}%` }} />)}</div>
}