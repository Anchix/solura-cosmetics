import AdminLayout from "@/components/AdminLayout";
import { StatusBadge } from "@/components/Badge";
import { StatCardSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useAdminOrders, useAdminStats } from "@/hooks/useOrders";
import { useAdminProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  IndianRupee,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// TODO: Move to server-side authentication before production deployment
const ADMIN_PASSWORD = "solura2024@BHY";

function AdminLoginGate() {
  const { setAdmin } = useAuthStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-card rounded-2xl border border-border p-8 w-full max-w-sm shadow-elevated">
        <div className="text-center mb-6">
          <span className="font-display text-2xl font-bold text-foreground">
            Solura
          </span>
          <p className="text-muted-foreground text-sm mt-1">Admin Access</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              setAdmin(true);
              setError("");
            } else {
              setError("Incorrect password. Please try again.");
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="admin-password"
              className="text-sm font-medium text-foreground"
            >
              Admin Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="admin-password-input"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full"
            data-ocid="admin-login-submit"
          >
            Access Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { isAdmin } = useAuthStore();
  const { data: stats, isLoading } = useAdminStats();
  const { data: products } = useAdminProducts();
  const { data: orders } = useAdminOrders();

  if (!isAdmin) return <AdminLoginGate />;

  const recentOrders = orders?.slice(0, 10) ?? [];

  const statCards = [
    {
      label: "Total Orders",
      value: stats?.totalOrders,
      icon: ShoppingCart,
      color: "text-primary",
      bg: "bg-primary/8",
    },
    {
      label: "Revenue (Total)",
      value: stats ? `₹${stats.totalRevenue.toLocaleString("en-IN")}` : null,
      icon: IndianRupee,
      color: "text-secondary-foreground",
      bg: "bg-secondary/20",
    },
    {
      label: "Pending Orders",
      value: stats?.pendingOrders,
      icon: Clock,
      color: "text-destructive",
      bg: "bg-destructive/8",
    },
    {
      label: "Total Products",
      value: products?.length ?? stats?.totalProducts,
      icon: Package,
      color: "text-accent-foreground",
      bg: "bg-accent/10",
    },
    {
      label: "Total Customers",
      value: stats?.totalUsers,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/8",
    },
  ];

  const chartData = stats?.last7Days.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    orders: d.orders,
    revenue: d.revenue,
  }));

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {isLoading
            ? [1, 2, 3, 4, 5].map((k) => <StatCardSkeleton key={k} />)
            : statCards.map(({ label, value, icon: Icon, color, bg }) => (
                <div
                  key={label}
                  className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-smooth"
                >
                  <div
                    className={`inline-flex items-center justify-center h-9 w-9 rounded-lg ${bg} mb-3`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground leading-tight">
                    {value ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
        </div>

        {/* Dual chart: Orders + Revenue (last 7 days) */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Last 7 Days Performance
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Order count and revenue trend
              </p>
            </div>
          </div>
          {isLoading ? (
            <div className="h-72 bg-muted/30 rounded-lg animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 24, bottom: 4, left: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.93 0.01 0)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "oklch(0.48 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="revenue"
                  orientation="left"
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: "oklch(0.48 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="orders"
                  orientation="right"
                  tick={{ fontSize: 11, fill: "oklch(0.48 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1.0 0.01 0)",
                    border: "1px solid oklch(0.93 0.01 0)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "revenue"
                      ? `₹${value.toLocaleString("en-IN")}`
                      : value,
                    name === "revenue" ? "Revenue" : "Orders",
                  ]}
                />
                <Legend
                  formatter={(val) =>
                    val === "revenue" ? "Revenue (₹)" : "Orders"
                  }
                  wrapperStyle={{ fontSize: "12px" }}
                />
                <Bar
                  yAxisId="revenue"
                  dataKey="revenue"
                  fill="oklch(0.65 0.12 15)"
                  radius={[4, 4, 0, 0]}
                  name="revenue"
                />
                <Bar
                  yAxisId="orders"
                  dataKey="orders"
                  fill="oklch(0.78 0.1 85)"
                  radius={[4, 4, 0, 0]}
                  name="orders"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent orders table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-display text-base font-semibold text-foreground">
              Recent Orders
            </h2>
            <Link to="/admin/orders">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs"
                data-ocid="dashboard-view-all-orders"
              >
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recentOrders.length === 0 ? (
              <p
                className="px-6 py-8 text-center text-muted-foreground text-sm"
                data-ocid="dashboard-orders-empty"
              >
                No orders yet
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-muted/20">
                  <tr>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">
                      Customer
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                      Date
                    </th>
                    <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden xl:table-cell">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`dashboard-order-row-${order.id}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-foreground">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-sm">
                        {order.shippingAddress.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right font-display font-semibold text-foreground">
                        ₹{order.total.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground capitalize text-xs">
                        {order.paymentMethod === "razorpay" ? "Online" : "COD"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              to: "/admin/products" as const,
              label: "Manage Products",
              sub: "Add, edit, or remove products",
              ocid: "admin-quick-products",
            },
            {
              to: "/admin/orders" as const,
              label: "View Orders",
              sub: "Manage and update order status",
              ocid: "admin-quick-orders",
            },
          ].map(({ to, label, sub, ocid }) => (
            <Link to={to} key={to}>
              <div
                className="bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-soft transition-smooth flex items-center justify-between group"
                data-ocid={ocid}
              >
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
