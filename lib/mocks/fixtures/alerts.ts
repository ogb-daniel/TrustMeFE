import { Alert } from "@/lib/types/alert";

export const mockAlerts: Alert[] = [
  {
    id: "alert_001",
    cluster_id: "cluster_crisis_001",
    narrative: "Bank X ATMs failing nationwide - customers unable to withdraw",
    tier: "CRISIS",
    risk_score: 87,
    confidence: 0.85,
    created_at: "2025-11-10T10:15:00Z",
    status: "pending_approval",
    response_text: `We're aware of social media reports regarding ATM services. Our systems show 97% uptime nationwide. A small number of machines in Lagos experienced brief downtime due to scheduled maintenance. All services are fully operational. Customers can verify status at www.bankx.com/status`,
    response_word_count: 52,
    generation_method: "openai",
    safety_flags: [],
    suggested_channels: ["twitter", "website", "email"],
    approval_required: true,
  },
];
