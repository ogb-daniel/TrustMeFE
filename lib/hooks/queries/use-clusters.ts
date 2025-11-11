"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clustersApi } from "@/lib/api/endpoints/clusters";
import { ClustersResponse, ClusterFilters } from "@/lib/types/cluster";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { USE_MOCK } from "@/lib/api/client";
import { mockClusters } from "@/lib/mocks/fixtures/clusters";

export const useClusters = (
  filters?: ClusterFilters,
  options?: Omit<UseQueryOptions<ClustersResponse>, "queryKey" | "queryFn">
) => {
  return useQuery<ClustersResponse>({
    queryKey: [QUERY_KEYS.clusters, filters],
    queryFn: async () => {
      if (USE_MOCK) {
        // Mock implementation
        console.log(mockClusters);

        let filtered = [...mockClusters];

        if (filters?.tier) {
          filtered = filtered.filter((c) => c.tier === filters.tier);
        }

        if (filters?.min_risk) {
          filtered = filtered.filter((c) => c.risk_score >= filters.min_risk!);
        }

        // Apply sorting
        switch (filters?.sort) {
          case "velocity_desc":
            filtered.sort((a, b) => b.velocity - a.velocity);
            break;
          case "risk_desc":
            filtered.sort((a, b) => b.risk_score - a.risk_score);
            break;
          case "size_desc":
            filtered.sort((a, b) => b.size - a.size);
            break;
        }

        const limit = filters?.limit || 20;
        const offset = filters?.offset || 0;
        const paginated = filtered.slice(offset, offset + limit);

        return {
          clusters: paginated,
          total: filtered.length,
          page: Math.floor(offset / limit) + 1,
          pages: Math.ceil(filtered.length / limit),
          limit,
          offset,
        };
      }

      return clustersApi.list(filters);
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
    ...options,
  });
};
