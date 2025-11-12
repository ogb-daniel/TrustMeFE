"use client";

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
import { DataTable } from "@/components/ui/data-table";
import { clustersColumns } from "@/components/tables/clusters-columns";
import { MajorSentimentAnalysis } from "@/components/major-sentiment-analysis";

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

export default function Dashboard() {
  const router = useRouter();
  const { data, isLoading, error } = useClusters({
    page: 1,
    page_size: 3, // Show only 3 clusters on dashboard
  });

  const clusters = data?.clusters || [];
  const totalAlerts = data?.total || 0;
  const highestRiskCluster = clusters[0];

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 bg-card border border-border/50 max-w-md">
          <h2 className="text-lg font-semibold text-destructive mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <button className="hover:text-foreground transition-colors">
              Dashboard
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Alerts</span>
          </nav>

          <p className="text-muted-foreground mt-2">
            Real-time monitoring of misinformation and reputational threats
          </p>
        </div>

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

          <Card className="p-6 bg-card border border-border/50">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                New Alerts (24H)
              </p>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </div>
            {isLoading ? (
              <div className="h-10 w-16 bg-muted animate-pulse rounded mt-2" />
            ) : (
              <p className="text-4xl font-bold text-muted-foreground mt-2">2</p>
            )}
          </Card>

          <Card className="p-6 bg-card border border-border/50">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                Major Sentiment
              </p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            {/* <MajorSentimentAnalysis sentiment={highestRiskCluster?.sentiment} /> */}
          </Card>
        </div>
        <Card className="p-6 bg-card border border-border/50 mb-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
              Highest Risk Topic
            </p>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          {isLoading ? (
            <div className="h-10 w-24 bg-muted animate-pulse rounded mt-2" />
          ) : (
            <p className="text-4xl font-bold text-foreground mt-2">
              {highestRiskCluster?.narrative || 0}
            </p>
          )}
        </Card>

        {/* Misinformation Spread Velocity */}
        <Card className="p-6 bg-card border border-border/50 mb-8">
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
        </Card>

        {/* Trending Clusters Table */}
        <Card className="bg-card border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">
              Trending Narratives
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sorted by velocity (posts/hour)
            </p>
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
            <DataTable columns={clustersColumns} data={clusters} />
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
