"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useClusters } from "@/lib/hooks/queries/use-clusters";
import { useDashboardStats } from "@/lib/hooks/queries/use-dashboard-stats";
import { DataTable } from "@/components/ui/data-table";
import { clustersColumns } from "@/components/tables/clusters-columns";
import { MajorSentimentAnalysis } from "@/components/major-sentiment-analysis";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { DashboardStats } from "@/components/dashboard-stats";
import type { Period } from "@/lib/types/dashboard";

// Mock virality data for the chart (this would come from analytics in production)
const viralityData = [
  { day: "Mon", mentions: 200 },
  { day: "Tue", mentions: 450 },
  { day: "Wed", mentions: 320 },
  { day: "Thu", mentions: 280 },
  { day: "Fri", mentions: 890 },
  { day: "Sat", mentions: 1298 },
  { day: "Sun", mentions: 980 },
];

const COMPARISON_PERIODS: { value: Period; label: string }[] = [
  { value: "yesterday", label: "Yesterday" },
  { value: "last_week", label: "Last Week" },
  { value: "last_month", label: "Last Month" },
  { value: "last_quarter", label: "Last Quarter" },
  { value: "last_year", label: "Last Year" },
];

export default function Dashboard() {
  const router = useRouter();
  const [comparisonPeriod, setComparisonPeriod] = useState<Period>("yesterday");

  const { data, isLoading, error } = useClusters({
    page: 1,
    page_size: 5, // Show only 3 clusters on dashboard
  });

  const {
    data: statsData,
    isLoading: isLoadingStats,
    error: statsError,
  } = useDashboardStats({
    period: "current",
    comparison: comparisonPeriod,
    include_interpretation: true,
    save_to_db: true,
  });

  const clusters = data?.clusters || [];
  const totalAlerts = data?.total || 0;
  const highestRiskCluster = clusters[0];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <button className="text-foreground transition-colors">
                Dashboard
              </button>
              {/* <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Alerts</span> */}
            </nav>
            <ThemeSwitcher />
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-muted-foreground">
              Real-time monitoring of misinformation and reputational threats
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Compare with:
              </span>
              <select
                value={comparisonPeriod}
                onChange={(e) => setComparisonPeriod(e.target.value as Period)}
                className="px-3 py-1.5 text-sm bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {COMPARISON_PERIODS.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dashboard Statistics */}
        {isLoadingStats ? (
          <div className="space-y-6 mb-8">
            <div className="h-48 bg-muted animate-pulse rounded-lg" />
            <div className="h-48 bg-muted animate-pulse rounded-lg" />
          </div>
        ) : statsError ? (
          <Card className="p-6 bg-card border border-border/50 mb-8">
            <p className="text-sm text-destructive">
              Failed to load statistics: {statsError.message}
            </p>
          </Card>
        ) : statsData ? (
          <div className="mb-8">
            {statsData.interpretation && (
              <Card className="p-6 bg-card border border-border/50 mb-8">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                    Highlights of{" "}
                    {comparisonPeriod === "yesterday"
                      ? "Today"
                      : comparisonPeriod === "last_week"
                        ? "This week"
                        : comparisonPeriod === "last_month"
                          ? "This month"
                          : comparisonPeriod === "last_quarter"
                            ? "This quarter"
                            : comparisonPeriod === "last_year"
                              ? "This year"
                              : ""}
                  </p>
                </div>
                {isLoading ? (
                  <div className="h-10 w-24 bg-muted animate-pulse rounded mt-2" />
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {statsData.interpretation.summary}
                  </p>
                )}
              </Card>
            )}
            <DashboardStats
              current={statsData.stats.current}
              comparison={statsData.stats.comparison}
            />
          </div>
        ) : null}

        {/* Quick Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-card border border-border/50">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                Total Active Alerts
              </p>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            {isLoading ? (
              <div className="h-10 w-20 bg-muted animate-pulse rounded mt-2" />
            ) : (
              <p className="text-4xl font-bold text-foreground mt-2">
                {totalAlerts}
              </p>
            )}
          </Card>

          <Card className="p-6 bg-card border col-span-2 border-border/50 mb-8">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                Highest Risk Topic
              </p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            {isLoading ? (
              <div className="h-10 w-24 bg-muted animate-pulse rounded mt-2" />
            ) : (
              <p className="text-3xl font-bold text-foreground mt-2">
                {highestRiskCluster?.narrative || 0}
              </p>
            )}
          </Card>
        </div>

        {/* Misinformation Spread Velocity */}
        {/* <Card className="p-6 bg-card border border-border/50 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Misinformation Spread Velocity
              </h2>
              <p className="text-2xl font-bold text-foreground mt-2">
                1,298 mentions{" "}
                <span className="text-sm text-destructive">↑ 15.2%</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Last 7 Days</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={viralityData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line
                type="monotone"
                dataKey="mentions"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", r: 5 }}
                activeDot={{ r: 8, fill: "#dc2626" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card> */}

        {/* Trending Clusters Table */}
        <Card className="bg-card border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">
              Trending Narratives
            </h2>
            {/* <p className="text-sm text-muted-foreground mt-1">
              Sorted by velocity (posts/hour)
            </p> */}
          </div>

          {isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-12 flex-1 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {error && (
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-destructive">
                        Failed to load clusters
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {error.message}
                      </p>
                    </div>
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      size="sm"
                      className="border-destructive/20"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              )}
              <DataTable columns={clustersColumns} data={clusters} />
            </>
          )}

          <div className="px-6 py-4 border-t border-border/50 bg-background/50">
            <Button
              onClick={() => router.push("/alerts")}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              View All Clusters →
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
