export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
  offset: number;
}

export interface ApiError {
  detail: string;
  error_code?: string;
  timestamp?: string;
  request_id?: string;
}

export type Tier = "INFORM" | "WATCH" | "ACTION" | "CRISIS";
export type Source = "twitter" | "facebook" | "synthetic";
export type AlertStatus = "pending_approval" | "approved" | "rejected";
export type RejectReason = "false_alarm" | "duplicate" | "not_crisis" | "other";
export type SortOrder =
  | "velocity_desc"
  | "velocity_asc"
  | "risk_desc"
  | "size_desc"
  | "recent";
