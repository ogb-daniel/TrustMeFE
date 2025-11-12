export interface RiskAnalysis {
  cluster_id: string;
  narrative: string;
  risk_score: number;
  risk_tier: "MONITOR" | "ALERT" | "ACTION" | "INFORM" | "WATCH" | "CRISIS"; // Support both new and legacy tier names
  risk_components: {
    sentiment: number;
    velocity: number;
    coordination: number;
    credibility: number;
    divergence: number;
  };
  divergence_analysis: {
    divergence_score: number;
    contradictions: string[];
    supports: string[];
    rag_available: boolean;
    confidence: number;
    mode: string;
  };
  recommendations: string[];
  timestamp: string;
}
