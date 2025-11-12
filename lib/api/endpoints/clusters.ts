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

    if (filters?.page) searchParams.set("page", String(filters.page));
    if (filters?.page_size) searchParams.set("page_size", String(filters.page_size));

    return apiClient
      .get("api/v1/clusters", { searchParams })
      .json<ClustersResponse>();
  },

  getById: async (clusterId: string): Promise<ClusterDetail> => {
    return apiClient.get(`api/v1/clusters/${clusterId}`).json<ClusterDetail>();
  },
};
