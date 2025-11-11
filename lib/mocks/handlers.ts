import { http, HttpResponse } from "msw";
import {
  mockClusters,
  mockClusterDetail,
  findMockCluster,
} from "./fixtures/clusters";
import { mockAlerts } from "./fixtures/alerts";
import { mockRiskAnalysis } from "./fixtures/risk";
import { mockPosts } from "./fixtures/posts";

const API_BASE_URL = "http://localhost:8000";

export const handlers = [
  // Health check
  http.get(`${API_BASE_URL}/health`, () => {
    return HttpResponse.json({
      status: "operational",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      components: {
        database: "connected",
        cache: "connected",
        models: "loaded",
      },
    });
  }),

  // GET /api/v1/clusters
  http.get(`${API_BASE_URL}/api/v1/clusters`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const tier = url.searchParams.get("tier");
    const sort = url.searchParams.get("sort") || "velocity_desc";
    const minRisk = url.searchParams.get("min_risk");

    let filtered = [...mockClusters];

    // Apply tier filter
    if (tier) {
      filtered = filtered.filter((c) => c.tier === tier);
    }

    // Apply min_risk filter
    if (minRisk) {
      filtered = filtered.filter((c) => c.risk_score >= parseInt(minRisk));
    }

    // Apply sorting
    switch (sort) {
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

    // Paginate
    const paginated = filtered.slice(offset, offset + limit);

    return HttpResponse.json({
      clusters: paginated,
      total: filtered.length,
      page: Math.floor(offset / limit) + 1,
      pages: Math.ceil(filtered.length / limit),
      limit,
      offset,
    });
  }),

  // GET /api/v1/clusters/:id
  http.get(`${API_BASE_URL}/api/v1/clusters/:clusterId`, ({ params }) => {
    const { clusterId } = params;

    if (clusterId === mockClusterDetail.id) {
      return HttpResponse.json(mockClusterDetail);
    }

    const cluster = findMockCluster(clusterId as string);
    if (cluster) {
      return HttpResponse.json({
        ...cluster,
        all_posts: mockPosts,
        velocity_chart: mockClusterDetail.velocity_chart,
      });
    }

    return HttpResponse.json(
      { detail: `Cluster not found: ${clusterId}` },
      { status: 404 }
    );
  }),

  // GET /api/v1/risk/:id
  http.get(`${API_BASE_URL}/api/v1/risk/:clusterId`, ({ params }) => {
    const { clusterId } = params;

    const cluster = findMockCluster(clusterId as string);
    if (!cluster) {
      return HttpResponse.json(
        { detail: `Cluster not found: ${clusterId}` },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      ...mockRiskAnalysis,
      cluster_id: clusterId,
      risk_score: cluster.risk_score,
      tier: cluster.tier,
      confidence: cluster.confidence,
    });
  }),

  // POST /api/v1/response/generate
  http.post(
    `${API_BASE_URL}/api/v1/response/generate`,
    async ({ request }) => {
      const body = (await request.json()) as any;
      const clusterId = body.cluster_id;

      const cluster = findMockCluster(clusterId);
      if (!cluster) {
        return HttpResponse.json(
          { detail: `Cluster not found: ${clusterId}` },
          { status: 404 }
        );
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      return HttpResponse.json({
        ...mockAlerts[0],
        cluster_id: clusterId,
        narrative: cluster.narrative,
        tier: cluster.tier,
        risk_score: cluster.risk_score,
        created_at: new Date().toISOString(),
      });
    }
  ),

  // POST /api/v1/alerts/:id/approve
  http.post(
    `${API_BASE_URL}/api/v1/alerts/:alertId/approve`,
    async ({ params, request }) => {
      const { alertId } = params;
      const body = (await request.json()) as any;

      await new Promise((resolve) => setTimeout(resolve, 500));

      return HttpResponse.json({
        status: "approved",
        alert_id: alertId,
        cluster_id: "cluster_crisis_001",
        timestamp: new Date().toISOString(),
        audit_log_id: `audit_${Date.now()}`,
        response_text: body.edited_response || mockAlerts[0].response_text,
        published_channels: ["twitter", "website", "email"],
      });
    }
  ),

  // POST /api/v1/alerts/:id/reject
  http.post(
    `${API_BASE_URL}/api/v1/alerts/:alertId/reject`,
    async ({ params }) => {
      const { alertId } = params;

      await new Promise((resolve) => setTimeout(resolve, 500));

      return HttpResponse.json({
        status: "rejected",
        alert_id: alertId,
        cluster_id: "cluster_crisis_001",
        timestamp: new Date().toISOString(),
        feedback_recorded: true,
        model_will_retrain: false,
        audit_log_id: `audit_${Date.now()}`,
      });
    }
  ),

  // POST /api/v1/ingest
  http.post(`${API_BASE_URL}/api/v1/ingest`, async ({ request }) => {
    const body = (await request.json()) as any;
    const postCount = body.posts?.length || 0;

    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json(
      {
        status: "accepted",
        count: postCount,
        message: "Posts queued for processing",
        estimated_processing_time: "60-120 seconds",
      },
      { status: 202 }
    );
  }),
];
