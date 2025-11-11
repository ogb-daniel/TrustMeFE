import { apiClient } from "../client";
import { Post } from "@/lib/types/post";

export interface IngestPostsRequest {
  posts: Post[];
}

export interface IngestPostsResponse {
  status: string;
  count: number;
  message: string;
  estimated_processing_time: string;
}

export const postsApi = {
  ingest: async (request: IngestPostsRequest): Promise<IngestPostsResponse> => {
    return apiClient
      .post("api/v1/ingest", { json: request })
      .json<IngestPostsResponse>();
  },
};
