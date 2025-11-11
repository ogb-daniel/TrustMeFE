"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clustersApi } from "@/lib/api/endpoints/clusters";
import { ClusterDetail } from "@/lib/types/cluster";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { USE_MOCK } from "@/lib/api/client";
import { mockClusterDetail } from "@/lib/mocks/fixtures/clusters";

export const useClusterDetail = (
  clusterId: string,
  options?: Omit<UseQueryOptions<ClusterDetail>, "queryKey" | "queryFn">
) => {
  return useQuery<ClusterDetail>({
    queryKey: [QUERY_KEYS.clusterDetail, clusterId],
    queryFn: async () => {
      if (USE_MOCK) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { ...mockClusterDetail, id: clusterId };
      }
      return clustersApi.getById(clusterId);
    },
    enabled: !!clusterId,
    staleTime: 30000,
    ...options,
  });
};
