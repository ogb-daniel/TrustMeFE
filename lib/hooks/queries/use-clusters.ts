"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clustersApi } from "@/lib/api/endpoints/clusters";
import { ClustersResponse, ClusterFilters } from "@/lib/types/cluster";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { USE_MOCK_CLUSTERS } from "@/lib/api/client";
import { mockClusters } from "@/lib/mocks/fixtures/clusters";

export const useClusters = (
  filters?: ClusterFilters,
  options?: Omit<UseQueryOptions<ClustersResponse>, "queryKey" | "queryFn">
) => {
  return useQuery<ClustersResponse>({
    queryKey: [QUERY_KEYS.clusters, filters],
    queryFn: async () => {
      if (USE_MOCK_CLUSTERS) {
        // Mock implementation - simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Return mock data in new API format
        return {
          clusters: mockClusters,
          total: mockClusters.length,
          page: filters?.page || 1,
          page_size: filters?.page_size || 10,
        };
      }

      return clustersApi.list(filters);
    },
    staleTime: 30000, // 30 seconds
    // refetchInterval: 60000, // Refetch every minute
    ...options,
  });
};
