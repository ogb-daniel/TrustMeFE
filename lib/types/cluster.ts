import { Post } from "./post";
import { Tier } from "./api";

export interface Cluster {
  id: string;
  narrative: string;
  size: number;
  velocity: number;
  first_seen: string;
  last_updated: string;
  entities: ClusterEntities;
  coordination_score: number;
  sentiment: SentimentScores;
  risk_score: number;
  tier: Tier;
  confidence: number;
  top_posts: Post[];
}

export interface ClusterEntities {
  ORG?: string[];
  GPE?: string[];
  PRODUCT?: string[];
}

export interface SentimentScores {
  positive: number;
  neutral: number;
  negative: number;
}

export interface ClusterDetail extends Cluster {
  all_posts: Post[];
  velocity_chart: VelocityDataPoint[];
}

export interface VelocityDataPoint {
  time: string;
  count: number;
}

export interface ClustersResponse {
  clusters: Cluster[];
  total: number;
  page: number;
  pages: number;
  limit: number;
  offset: number;
}

export interface ClusterFilters {
  limit?: number;
  offset?: number;
  sort?:
    | "velocity_desc"
    | "velocity_asc"
    | "risk_desc"
    | "size_desc"
    | "recent";
  tier?: Tier;
  min_risk?: number;
}
