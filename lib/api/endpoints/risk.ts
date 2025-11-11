import { apiClient } from "../client";
import { RiskAnalysis } from "@/lib/types/risk";

export const riskApi = {
  getAnalysis: async (clusterId: string): Promise<RiskAnalysis> => {
    return apiClient.get(`api/v1/risk/${clusterId}`).json<RiskAnalysis>();
  },
};
