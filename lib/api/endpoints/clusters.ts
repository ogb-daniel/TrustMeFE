import { apiClient } from "../client";
import {
  Cluster,
  ClusterDetail,
  ClustersResponse,
  ClusterFilters,
} from "@/lib/types/cluster";

export const clustersApi = {
  list: async (filters?: ClusterFilters): Promise<ClustersResponse> => {
    const searchParams = new URLSearchParams();

    if (filters?.limit) searchParams.set("limit", String(filters.limit));
    if (filters?.offset) searchParams.set("offset", String(filters.offset));
    if (filters?.sort) searchParams.set("sort", filters.sort);
    if (filters?.tier) searchParams.set("tier", filters.tier);
    if (filters?.min_risk)
      searchParams.set("min_risk", String(filters.min_risk));

    return apiClient
      .get("api/v1/clusters", { searchParams })
      .json<ClustersResponse>();
  },

  getById: async (clusterId: string): Promise<ClusterDetail> => {
    return apiClient.get(`api/v1/clusters/${clusterId}`).json<ClusterDetail>();
  },
};
