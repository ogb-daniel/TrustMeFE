"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { riskApi } from "@/lib/api/endpoints/risk";
import { RiskAnalysis } from "@/lib/types/risk";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { USE_MOCK } from "@/lib/api/client";
import { mockRiskAnalysis } from "@/lib/mocks/fixtures/risk";

export const useRiskAnalysis = (
  clusterId: string,
  options?: Omit<UseQueryOptions<RiskAnalysis>, "queryKey" | "queryFn">
) => {
  return useQuery<RiskAnalysis>({
    queryKey: [QUERY_KEYS.riskAnalysis, clusterId],
    queryFn: async () => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return { ...mockRiskAnalysis, cluster_id: clusterId };
      }
      return riskApi.getAnalysis(clusterId);
    },
    enabled: !!clusterId,
    staleTime: 60000, // Risk analysis less volatile
    ...options,
  });
};
