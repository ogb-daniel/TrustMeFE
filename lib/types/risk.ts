import { Tier } from "./api";

export interface RiskAnalysis {
  cluster_id: string;
  risk_score: number;
  tier: Tier;
  confidence: number;
  components: RiskComponents;
  telemetry_check: TelemetryCheck;
  contradictions: Evidence[];
  supports: Evidence[];
  rag_mode: "full" | "telemetry_only" | "insufficient_data";
  rag_available: boolean;
  explanation: string[];
  recommendations: string[];
}

export interface RiskComponents {
  rule_risk: number;
  ml_probability: number;
  sentiment_fear: number;
  sentiment_anger: number;
  sentiment_urgency: number;
  virality: number;
  source_credibility: number;
  factuality_score: number;
  coordination_score: number;
}

export interface TelemetryCheck {
  mismatch: boolean;
  metric: string;
  claim_assertion: string;
  actual_value: string;
  explanation: string;
}

export interface Evidence {
  text: string;
  source: string;
  authority: number;
  page?: number;
}
