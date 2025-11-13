export type Period = "current" | "yesterday" | "last_week" | "last_month" | "last_quarter" | "last_year";

export interface VolumeMetrics {
  total_mentions: number;
  post_velocity: number;
  cluster_count: number;
  alert_volume: number;
  period: Period;
}

export interface RiskTierDistribution {
  CRISIS?: number;
  ACTION?: number;
  WATCH?: number;
  INFORM?: number;
  ALERT?: number;
  MONITOR?: number;
}

export interface RiskMetrics {
  average_risk_score: number;
  high_risk_incidents: number;
  risk_tier_distribution: RiskTierDistribution;
  peak_risk_score: number;
  period: Period;
}

export interface SentimentMetrics {
  total_positive: number;
  total_negative: number;
  total_neutral: number;
  negative_percentage: number;
  avg_fear: number;
  avg_anger: number;
  avg_urgency: number;
  period: Period;
}

export interface CredibilityMetrics {
  average_credibility: number;
  low_credibility_percentage: number;
  divergence_incidents: number;
  avg_coordination_score: number;
  period: Period;
}

export interface EngagementMetrics {
  total_engagement: number;
  average_virality_index: number;
  peak_virality: number;
  avg_engagement_rate: number;
  period: Period;
}

export interface ResponseMetrics {
  total_alerts: number;
  active_alerts: number;
  approved_responses: number;
  rejected_responses: number;
  approval_rate: number;
  response_coverage: number;
  period: Period;
}

export interface PeriodStats {
  period: Period;
  computed_at: string;
  volume_metrics: VolumeMetrics;
  risk_metrics: RiskMetrics;
  sentiment_metrics: SentimentMetrics;
  credibility_metrics: CredibilityMetrics;
  engagement_metrics: EngagementMetrics;
  response_metrics: ResponseMetrics;
}

export interface StatsInterpretation {
  full_interpretation: string;
  summary: string;
  key_insights: string[];
  recommendations: string[];
  tokens_used: number;
  model: string;
}

export interface DashboardStats {
  current: PeriodStats;
  comparison?: PeriodStats;
  comparison_period?: Period;
  computed_at: string;
}

export interface DashboardStatsResponse {
  stats: DashboardStats;
  interpretation?: StatsInterpretation;
  stored_id?: string;
}

export interface DashboardStatsParams {
  period?: Period;
  comparison?: Period;
  include_interpretation?: boolean;
  save_to_db?: boolean;
}
