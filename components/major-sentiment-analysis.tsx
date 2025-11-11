import { Card } from "@/components/ui/card";
import { ClusterDetail, SentimentScores } from "@/lib/types/cluster";

interface MajorSentimentData {
  label: string;
  value: number;
  color: string;
}

interface MajorSentimentAnalysisProps {
  sentiment: SentimentScores;
}

export function MajorSentimentAnalysis({
  sentiment,
}: MajorSentimentAnalysisProps) {
  const sentiments: MajorSentimentData[] = [
    {
      label: "Negative",
      value: sentiment?.negative,
      color: "bg-red-500",
    },
    {
      label: "Positive",
      value: sentiment?.positive,
      color: "bg-emerald-500",
    },
    {
      label: "Neutral",
      value: sentiment?.neutral,
      color: "bg-blue-400",
    },
  ];

  return (
    <Card className="p-6 bg-card border border-border/50">
      <div className="space-y-6">
        {sentiments.map((sentiment) => (
          <div key={sentiment.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {sentiment.label}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {sentiment.value}%
              </span>
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
  );
}
