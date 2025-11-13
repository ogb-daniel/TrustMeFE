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

export interface DivergenceAnalysis {
  divergence_score: number;
  contradictions: string[];
  supports: string[];
  rag_available: boolean;
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
  created_at: string;
  updated_at: string;
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
