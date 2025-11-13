import { Post } from "./post";

export interface Cluster {
  cluster_id: string;
  narrative: string;
  post_count: number;
  first_seen: string;
  last_seen: string;
  risk_score: number;
  risk_tier: "MONITOR" | "ALERT" | "ACTION" | "INFORM" | "WATCH" | "CRISIS"; // Support both new and legacy tier names
  total_engagement: number;
}

export interface SentimentBreakdown {
  negative: number;
  neutral: number;
  positive: number;
}

export interface RiskAnalysisSummary {
  risk_score: number;
  risk_tier: "MONITOR" | "ALERT" | "ACTION" | "INFORM" | "WATCH" | "CRISIS"; // Support both new and legacy tier names
  components: {
    sentiment: number;
    velocity: number;
    coordination: number;
    credibility: number;
    divergence: number;
  };
}

export interface TelemetryCheck {
  mismatch: boolean;
  explanation: string;
  confidence: number;
}

export interface TelemetryMetrics {
  official_rate?: number;
  parallel_market_rate?: number;
  rate_divergence_pct?: number;
  daily_volume_usd?: number;
  volatility_index?: number;
  liquidity_stress_level?: string;
  [key: string]: any; // Allow for other metric types
}

export interface Telemetry {
  type: string;
  timestamp: string;
  metrics: TelemetryMetrics;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  confirms_narrative: boolean;
}

export interface DivergenceAnalysis {
  divergence_score: number;
  factuality_score?: number;
  mode?: string;
  contradictions: string[];
  supports: string[];
  rag_available: boolean;
  telemetry_check?: TelemetryCheck;
  confidence?: number;
  explanation?: string[];
  timestamp?: string;
}

export interface TopAuthor {
  handle: string;
  post_count: number;
  verified: boolean;
  follower_count: number;
}

export interface EngagementStats {
  total_likes: number;
  total_retweets: number;
  total_replies: number;
}

export interface GeneratedResponse {
  text: string;
  tier: string;
  generation_method: string;
  model: string;
  tokens_used: number;
  word_count: number;
  confidence: number;
  safety_flags: string[];
  approval_required: boolean;
  suggested_channels: string[];
  timestamp: string;
}

export interface ViralityTimelinePoint {
  hour: number;
  post_count: number;
  cumulative_posts: number;
  engagement: number;
  cumulative_engagement: number;
  velocity: number;
}

export interface ViralityMetrics {
  total_posts: number;
  total_engagement: number;
  unique_accounts: number;
  duration_hours: number;
  avg_velocity: number;
  peak_velocity: number;
  peak_hour: number;
  spread_score: number;
  virality_index: number;
  engagement_per_post: number;
}

export interface Virality {
  timeline: ViralityTimelinePoint[];
  metrics: ViralityMetrics;
  computed_at: string;
}

export interface ClusterDetail {
  cluster_id: string;
  narrative: string;
  post_count: number;
  posts: Post[];
  risk_analysis: RiskAnalysisSummary;
  divergence_analysis: DivergenceAnalysis;
  sentiment_breakdown: SentimentBreakdown;
  top_authors: TopAuthor[];
  engagement_stats: EngagementStats;
  generated_response?: GeneratedResponse;
  virality?: Virality;
  telemetry?: Telemetry;
  created_at: string;
  updated_at: string;
  risk_tier: string;
  risk_score: number;
}

export interface ClustersResponse {
  clusters: Cluster[];
  total: number;
  page: number;
  page_size: number;
}

export interface ClusterFilters {
  page?: number;
  page_size?: number;
}
