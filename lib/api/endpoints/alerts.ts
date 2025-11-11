import { apiClient } from "../client";
import {
  Alert,
  GenerateResponseRequest,
  ApproveAlertRequest,
  RejectAlertRequest,
  AlertActionResponse,
} from "@/lib/types/alert";

export const alertsApi = {
  generate: async (request: GenerateResponseRequest): Promise<Alert> => {
    return apiClient
      .post("api/v1/response/generate", { json: request })
      .json<Alert>();
  },

  approve: async (
    alertId: string,
    request: ApproveAlertRequest
  ): Promise<AlertActionResponse> => {
    return apiClient
      .post(`api/v1/alerts/${alertId}/approve`, { json: request })
      .json<AlertActionResponse>();
  },

  reject: async (
    alertId: string,
    request: RejectAlertRequest
  ): Promise<AlertActionResponse> => {
    return apiClient
      .post(`api/v1/alerts/${alertId}/reject`, { json: request })
      .json<AlertActionResponse>();
  },
};
