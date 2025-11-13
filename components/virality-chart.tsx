"use client";

import { Card } from "@/components/ui/card";
import { Virality } from "@/lib/types/cluster";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ViralityChartProps {
  virality: Virality;
}

export function ViralityChart({ virality }: ViralityChartProps) {
  // Format the timeline data for the chart
  const chartData = virality.timeline.map((point) => ({
    hour: point.hour,
    posts: point.post_count,
    engagement: Math.round(point.engagement / 1000), // Convert to thousands
    velocity: Number(point.velocity.toFixed(1)), // Keep as number for charting
  }));

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Card className="p-6 bg-card border border-border/50">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Virality Over Time
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Total Posts
            </p>
            <p className="text-lg font-semibold text-foreground">
              {virality.metrics.total_posts}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Total Engagement
            </p>
            <p className="text-lg font-semibold text-foreground">
              {formatNumber(virality.metrics.total_engagement)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Peak Velocity
            </p>
            <p className="text-lg font-semibold text-foreground">
              {virality.metrics.peak_velocity.toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Virality Index
            </p>
            <p className="text-lg font-semibold text-foreground">
              {virality.metrics.virality_index.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{
                value: "Time (Hours)",
                position: "insideBottom",
                offset: -5,
                style: { fill: "hsl(var(--muted-foreground))" },
              }}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{
                value: "Posts / Velocity",
                angle: -90,
                position: "insideLeft",
                style: { fill: "hsl(var(--muted-foreground))", textAnchor: "middle" },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{
                value: "Engagement (K)",
                angle: 90,
                position: "insideRight",
                style: { fill: "hsl(var(--muted-foreground))", textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--foreground))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) => {
                if (name === "Engagement (K)") {
                  return [`${value}K`, name];
                }
                return [value, name];
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="posts"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", r: 4 }}
              activeDot={{ r: 6 }}
              name="Post Count"
              connectNulls
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="engagement"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", r: 4 }}
              activeDot={{ r: 6 }}
              name="Engagement (K)"
              connectNulls
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="velocity"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ fill: "#F59E0B", r: 4 }}
              activeDot={{ r: 6 }}
              name="Velocity"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          Duration: {virality.metrics.duration_hours} hours · Avg Velocity:{" "}
          {virality.metrics.avg_velocity.toFixed(2)} · Engagement per Post:{" "}
          {formatNumber(virality.metrics.engagement_per_post)}
        </p>
      </div>
    </Card>
  );
}
