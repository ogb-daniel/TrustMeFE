"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { VelocityDataPoint } from "@/lib/types/cluster"

interface ViralityGraphProps {
  velocityData: VelocityDataPoint[]
}

export function ViralityGraph({ velocityData }: ViralityGraphProps) {
  const peakPoint = velocityData.reduce((max, point) =>
    point.count > max.count ? point : max
  , velocityData[0])

  const chartData = velocityData.map(point => ({
    time: point.time,
    engagement: point.count,
  }))

  return (
    <Card className="p-6 bg-card border border-border/50">
      <h2 className="text-lg font-semibold text-foreground mb-6">Virality Rate</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
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
            dataKey="engagement"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 5 }}
            activeDot={{ r: 8, fill: "#2563eb" }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Peak engagement at <span className="font-medium text-foreground">{peakPoint.time}</span> with {peakPoint.count} posts
        </p>
      </div>
    </Card>
  )
}
