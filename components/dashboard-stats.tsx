"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { PeriodStats } from "@/lib/types/dashboard";

interface DashboardStatsProps {
  current: PeriodStats;
  comparison?: PeriodStats;
}

export function DashboardStats({ current, comparison }: DashboardStatsProps) {
  const calculateChange = (currentValue: number, comparisonValue?: number): number | null => {
    if (comparisonValue === undefined || comparisonValue === 0) return null;
    return ((currentValue - comparisonValue) / comparisonValue) * 100;
  };

  const formatChange = (change: number | null): { text: string; color: string; icon: React.ReactNode } => {
    if (change === null) {
      return {
        text: "N/A",
        color: "text-muted-foreground",
        icon: <Minus className="h-3 w-3" />,
      };
    }

    const isPositive = change > 0;
    const isNegative = change < 0;

    return {
      text: `${isPositive ? "+" : ""}${change.toFixed(1)}%`,
      color: isPositive ? "text-emerald-600 dark:text-emerald-400" : isNegative ? "text-red-600 dark:text-red-400" : "text-muted-foreground",
      icon: isPositive ? <TrendingUp className="h-3 w-3" /> : isNegative ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />,
    };
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toFixed(0);
  };

  const StatCard = ({
    title,
    value,
    comparisonValue,
    suffix = "",
  }: {
    title: string;
    value: number;
    comparisonValue?: number;
    suffix?: string;
  }) => {
    const change = calculateChange(value, comparisonValue);
    const changeFormat = formatChange(change);

    return (
      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
        <p className="text-xs text-muted-foreground mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(value)}
            {suffix}
          </p>
          {comparison && (
            <div className={`flex items-center gap-1 text-xs font-medium ${changeFormat.color}`}>
              {changeFormat.icon}
              <span>{changeFormat.text}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Volume Metrics */}
      <Card className="p-6 bg-card border border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Volume Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Mentions"
            value={current.volume_metrics.total_mentions}
            comparisonValue={comparison?.volume_metrics.total_mentions}
          />
          <StatCard
            title="Post Velocity"
            value={current.volume_metrics.post_velocity}
            comparisonValue={comparison?.volume_metrics.post_velocity}
          />
          <StatCard
            title="Clusters"
            value={current.volume_metrics.cluster_count}
            comparisonValue={comparison?.volume_metrics.cluster_count}
          />
          <StatCard
            title="Alerts"
            value={current.volume_metrics.alert_volume}
            comparisonValue={comparison?.volume_metrics.alert_volume}
          />
        </div>
      </Card>

      {/* Risk Metrics */}
      <Card className="p-6 bg-card border border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Risk Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Avg Risk Score"
            value={current.risk_metrics.average_risk_score}
            comparisonValue={comparison?.risk_metrics.average_risk_score}
          />
          <StatCard
            title="High Risk Incidents"
            value={current.risk_metrics.high_risk_incidents}
            comparisonValue={comparison?.risk_metrics.high_risk_incidents}
          />
          <StatCard
            title="Peak Risk"
            value={current.risk_metrics.peak_risk_score}
            comparisonValue={comparison?.risk_metrics.peak_risk_score}
          />
          <div className="p-4 rounded-lg bg-background/50 border border-border/30">
            <p className="text-xs text-muted-foreground mb-2">Risk Tier Distribution</p>
            <div className="space-y-1">
              {Object.entries(current.risk_metrics.risk_tier_distribution).map(([tier, count]) => (
                <div key={tier} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{tier}:</span>
                  <span className="font-semibold text-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Engagement Metrics */}
      <Card className="p-6 bg-card border border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Engagement"
            value={current.engagement_metrics.total_engagement}
            comparisonValue={comparison?.engagement_metrics.total_engagement}
          />
          <StatCard
            title="Avg Virality Index"
            value={current.engagement_metrics.average_virality_index}
            comparisonValue={comparison?.engagement_metrics.average_virality_index}
          />
          <StatCard
            title="Peak Virality"
            value={current.engagement_metrics.peak_virality}
            comparisonValue={comparison?.engagement_metrics.peak_virality}
          />
          <StatCard
            title="Avg Engagement Rate"
            value={current.engagement_metrics.avg_engagement_rate}
            comparisonValue={comparison?.engagement_metrics.avg_engagement_rate}
          />
        </div>
      </Card>

      {/* Sentiment & Credibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Negative"
              value={current.sentiment_metrics.total_negative}
              comparisonValue={comparison?.sentiment_metrics.total_negative}
            />
            <StatCard
              title="Negative %"
              value={current.sentiment_metrics.negative_percentage}
              comparisonValue={comparison?.sentiment_metrics.negative_percentage}
              suffix="%"
            />
            <StatCard
              title="Avg Fear"
              value={current.sentiment_metrics.avg_fear}
              comparisonValue={comparison?.sentiment_metrics.avg_fear}
            />
            <StatCard
              title="Avg Anger"
              value={current.sentiment_metrics.avg_anger}
              comparisonValue={comparison?.sentiment_metrics.avg_anger}
            />
          </div>
        </Card>

        <Card className="p-6 bg-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Credibility Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Avg Credibility"
              value={current.credibility_metrics.average_credibility}
              comparisonValue={comparison?.credibility_metrics.average_credibility}
            />
            <StatCard
              title="Low Credibility %"
              value={current.credibility_metrics.low_credibility_percentage}
              comparisonValue={comparison?.credibility_metrics.low_credibility_percentage}
              suffix="%"
            />
            <StatCard
              title="Divergence Incidents"
              value={current.credibility_metrics.divergence_incidents}
              comparisonValue={comparison?.credibility_metrics.divergence_incidents}
            />
            <StatCard
              title="Avg Coordination"
              value={current.credibility_metrics.avg_coordination_score}
              comparisonValue={comparison?.credibility_metrics.avg_coordination_score}
            />
          </div>
        </Card>
      </div>

      {/* Response Metrics */}
      <Card className="p-6 bg-card border border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Response Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            title="Active Alerts"
            value={current.response_metrics.active_alerts}
            comparisonValue={comparison?.response_metrics.active_alerts}
          />
          <StatCard
            title="Approval Rate"
            value={current.response_metrics.approval_rate}
            comparisonValue={comparison?.response_metrics.approval_rate}
            suffix="%"
          />
          <StatCard
            title="Response Coverage"
            value={current.response_metrics.response_coverage}
            comparisonValue={comparison?.response_metrics.response_coverage}
            suffix="%"
          />
        </div>
      </Card>
    </div>
  );
}
