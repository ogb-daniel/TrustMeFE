"use client"

import { Card } from "@/components/ui/card"
import { RiskAnalysis } from "@/lib/types/risk"

interface RiskBreakdownProps {
  riskAnalysis: RiskAnalysis
}

export function RiskBreakdown({ riskAnalysis }: RiskBreakdownProps) {
  // Safety check for risk_components
  if (!riskAnalysis?.risk_components) {
    return (
      <Card className="p-6 bg-card border border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-6">Risk Breakdown</h2>
        <p className="text-sm text-muted-foreground">Risk component data not available</p>
      </Card>
    )
  }

  // API sends values as decimals (0-1), convert to percentages (0-100)
  const metrics = [
    { label: "Sentiment", value: (riskAnalysis.risk_components.sentiment ?? 0) * 100 },
    { label: "Velocity", value: (riskAnalysis.risk_components.velocity ?? 0) * 100 },
    { label: "Coordination", value: (riskAnalysis.risk_components.coordination ?? 0) * 100 },
    { label: "Credibility", value: (riskAnalysis.risk_components.credibility ?? 0) * 100 },
    { label: "Divergence", value: (riskAnalysis.risk_components.divergence ?? 0) * 100 },
  ]

  return (
    <Card className="p-6 bg-card border border-border/50">
      <h2 className="text-lg font-semibold text-foreground mb-6">Risk Breakdown</h2>

      <div className="space-y-5">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{metric.label}</span>
              <span className="text-sm font-semibold text-muted-foreground">{metric.value.toFixed(1)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  metric.value > 75 ? "bg-destructive" : metric.value > 50 ? "bg-yellow-500" : "bg-emerald-500"
                }`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Risk analysis complete
        </p>
      </div>
    </Card>
  )
}
