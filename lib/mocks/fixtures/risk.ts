import { RiskAnalysis } from "@/lib/types/risk";

export const mockRiskAnalysis: RiskAnalysis = {
  cluster_id: "cluster_action_001",
  narrative: "Bank X ATMs failing nationwide - customers unable to withdraw",
  risk_score: 87.5,
  risk_tier: "ACTION",
  risk_components: {
    sentiment: 78.0,
    velocity: 85.2,
    coordination: 67.5,
    credibility: 45.0,
    divergence: 92.3,
  },
  divergence_analysis: {
    divergence_score: 0.923,
    contradictions: [
      "Internal telemetry shows 97.3% ATM uptime (234/240 machines operational)",
      "CBN confirms ATM systems operating normally as of Q3 2024",
      "Bank X internal monitoring shows only 6 machines down for scheduled maintenance",
    ],
    supports: [],
    rag_available: true,
    confidence: 0.85,
    mode: "rag_grounded",
  },
  recommendations: [
    "⚠️ Prepare authoritative response within 2 hours",
    "📊 Cite verified data and contradictions",
    "🔍 Monitor for escalation",
    "🔴 High divergence: claim directly contradicts evidence",
  ],
  timestamp: "2025-11-10T10:15:00Z",
};
