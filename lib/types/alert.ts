import { Tier, AlertStatus } from "./api";

export interface Alert {
  id: string;
  cluster_id: string;
  narrative: string;
  tier: Tier;
  risk_score: number;
  confidence: number;
  created_at: string;
  status: AlertStatus;
  response_text: string;
  response_word_count: number;
  generation_method: "openai" | "template";
  safety_flags: string[];
  suggested_channels: string[];
  approval_required: boolean;
}

export interface GenerateResponseRequest {
  cluster_id: string;
  tier?: Tier;
}

export interface ApproveAlertRequest {
  user_id: string;
  notes?: string;
  edited_response?: string;
}

export interface RejectAlertRequest {
  user_id: string;
  reason: "false_alarm" | "duplicate" | "not_crisis" | "other";
  notes?: string;
  rationale?: string;
}

export interface AlertActionResponse {
  status: AlertStatus;
  alert_id: string;
  cluster_id: string;
  timestamp: string;
  audit_log_id?: string;
  response_text?: string;
  published_channels?: string[];
}
