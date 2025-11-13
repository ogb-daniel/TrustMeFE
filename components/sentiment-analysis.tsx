import { Card } from "@/components/ui/card"
import { ClusterDetail } from "@/lib/types/cluster"

interface SentimentData {
  label: string
  value: number
  color: string
}

interface SentimentAnalysisProps {
  cluster: ClusterDetail
}

export function SentimentAnalysis({ cluster }: SentimentAnalysisProps) {
  // Safety check for sentiment_breakdown
  if (!cluster?.sentiment_breakdown) {
    return (
      <Card className="p-6 bg-card border border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-6">Sentiment Analysis</h2>
        <p className="text-sm text-muted-foreground">Sentiment data not available</p>
      </Card>
    )
  }

  // API sends values as decimals (0-1), convert to percentages (0-100)
  const sentiments: SentimentData[] = [
    { label: "Negative", value: (cluster.sentiment_breakdown.negative ?? 0) * 100, color: "bg-red-500" },
    { label: "Positive", value: (cluster.sentiment_breakdown.positive ?? 0) * 100, color: "bg-emerald-500" },
    { label: "Neutral", value: (cluster.sentiment_breakdown.neutral ?? 0) * 100, color: "bg-blue-400" },
  ]

  return (
    <Card className="p-6 bg-card border border-border/50">
      <h2 className="text-lg font-semibold text-foreground mb-6">Sentiment Analysis</h2>

      <div className="space-y-6">
        {sentiments.map((sentiment) => (
          <div key={sentiment.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{sentiment.label}</span>
              <span className="text-sm font-semibold text-muted-foreground">{sentiment.value.toFixed(1)}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${sentiment.color}`}
                style={{ width: `${sentiment.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
