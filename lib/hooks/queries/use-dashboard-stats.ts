import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type {
  DashboardStatsResponse,
  DashboardStatsParams,
} from "@/lib/types/dashboard";

export function useDashboardStats(
  params: DashboardStatsParams = {},
  options?: Omit<
    UseQueryOptions<DashboardStatsResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<DashboardStatsResponse, Error>({
    queryKey: ["dashboard-stats", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      if (params.period) queryParams.append("period", params.period);
      if (params.comparison)
        queryParams.append("comparison", params.comparison);
      if (params.include_interpretation !== undefined) {
        queryParams.append(
          "include_interpretation",
          String(params.include_interpretation)
        );
      }
      if (params.save_to_db !== undefined) {
        queryParams.append("save_to_db", String(params.save_to_db));
      }

      const response = await apiClient
        .get(`api/v1/dashboard/stats?${queryParams.toString()}`)
        .json<DashboardStatsResponse>();
      return response;
    },
    ...options,
  });
}
