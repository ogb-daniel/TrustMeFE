import { RiskAnalysis } from "@/lib/types/risk";

export const mockRiskAnalysis: RiskAnalysis = {
  cluster_id: "cluster_crisis_001",
  risk_score: 87,
  tier: "CRISIS",
  confidence: 0.85,
  components: {
    rule_risk: 90,
    ml_probability: 0.73,
    sentiment_fear: 0.92,
    sentiment_anger: 0.78,
    sentiment_urgency: 0.85,
    virality: 0.85,
    source_credibility: 0.34,
    factuality_score: 0.18,
    coordination_score: 0.87,
  },
  telemetry_check: {
    mismatch: true,
    metric: "atm_uptime",
    claim_assertion: "widespread ATM failure",
    actual_value: "97.3% uptime (234/240 machines operational)",
    explanation:
      "Internal telemetry contradicts viral narrative. Only 6 machines down (scheduled maintenance).",
  },
  contradictions: [
    {
      text: "CBN confirms ATM systems operating normally as of Q3 2024. Bank X reported 98.2% average uptime across all regions.",
      source: "cbn_press_2024_q3.pdf",
      authority: 0.95,
      page: 12,
    },
    {
      text: "Bank X internal monitoring shows 97.3% network availability. Minor outages limited to 6 machines undergoing scheduled maintenance.",
      source: "bankx_telemetry_2025_11_10.json",
      authority: 1.0,
    },
  ],
  supports: [],
  rag_mode: "full",
  rag_available: true,
  explanation: [
    "High fear sentiment detected (92%)",
    "Rapid viral spread (34.6 posts/hour)",
    "Very low factuality score (18%)",
    "Internal telemetry directly contradicts claim",
    "High bot coordination score (87%) suggests amplification",
    "Source credibility low (34%) - unverified accounts",
  ],
  recommendations: [
    "⚠️ Prepare authoritative response within 2 hours",
    "📊 Cite verified data and contradictions",
    "🔍 Monitor for escalation",
    "🔴 High divergence: claim directly contradicts evidence",
  ],
};
