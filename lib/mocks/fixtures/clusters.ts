import { Cluster, ClusterDetail } from "@/lib/types/cluster";
import { mockPosts } from "./posts";

export const mockClusters: Cluster[] = [
  {
    id: "cluster_crisis_001",
    narrative: "Bank X ATMs failing nationwide - customers unable to withdraw",
    size: 47,
    velocity: 34.6,
    first_seen: "2025-11-10T09:45:00Z",
    last_updated: "2025-11-10T10:15:00Z",
    entities: {
      ORG: ["Bank X", "CBN"],
      GPE: ["Lagos", "Abuja", "Kano"],
      PRODUCT: ["ATM"],
    },
    coordination_score: 0.87,
    sentiment: {
      positive: 12,
      neutral: 10,
      negative: 78,
    },
    risk_score: 87,
    tier: "CRISIS",
    confidence: 0.85,
    top_posts: mockPosts.slice(0, 3),
  },
  {
    id: "cluster_action_001",
    narrative: "Data breach rumors spreading on social media",
    size: 32,
    velocity: 18.3,
    first_seen: "2025-11-10T08:30:00Z",
    last_updated: "2025-11-10T09:45:00Z",
    entities: {
      ORG: ["Bank X"],
      PRODUCT: ["Mobile App"],
    },
    coordination_score: 0.62,
    sentiment: {
      positive: 18,
      neutral: 15,
      negative: 67,
    },
    risk_score: 72,
    tier: "ACTION",
    confidence: 0.78,
    top_posts: mockPosts.slice(0, 2),
  },
  {
    id: "cluster_watch_001",
    narrative: "Long wait times at customer service centers",
    size: 15,
    velocity: 5.2,
    first_seen: "2025-11-09T14:20:00Z",
    last_updated: "2025-11-10T10:00:00Z",
    entities: {
      ORG: ["Bank X"],
      GPE: ["Abuja"],
    },
    coordination_score: 0.23,
    sentiment: {
      positive: 35,
      neutral: 28,
      negative: 37,
    },
    risk_score: 48,
    tier: "WATCH",
    confidence: 0.65,
    top_posts: mockPosts.slice(0, 1),
  },
];

export const mockClusterDetail: ClusterDetail = {
  ...mockClusters[0],
  all_posts: mockPosts,
  velocity_chart: [
    { time: "2025-11-10T09:00:00Z", count: 2 },
    { time: "2025-11-10T09:15:00Z", count: 8 },
    { time: "2025-11-10T09:30:00Z", count: 15 },
    { time: "2025-11-10T09:45:00Z", count: 22 },
    { time: "2025-11-10T10:00:00Z", count: 34 },
    { time: "2025-11-10T10:15:00Z", count: 47 },
  ],
};

export const findMockCluster = (id: string): Cluster | undefined => {
  return mockClusters.find((c) => c.id === id);
};
