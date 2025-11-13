import { Cluster, ClusterDetail } from "@/lib/types/cluster";
import { mockPosts } from "./posts";

export const mockClusters: Cluster[] = [
  {
    cluster_id: "cluster_action_001",
    narrative: "Bank X ATMs failing nationwide - customers unable to withdraw",
    post_count: 47,
    first_seen: "2025-11-10T09:45:00Z",
    last_seen: "2025-11-10T10:15:00Z",
    risk_score: 87.5,
    risk_tier: "ACTION",
    total_engagement: 4521,
  },
  {
    cluster_id: "cluster_action_002",
    narrative: "Data breach rumors spreading on social media",
    post_count: 32,
    first_seen: "2025-11-10T08:30:00Z",
    last_seen: "2025-11-10T09:45:00Z",
    risk_score: 72.3,
    risk_tier: "ACTION",
    total_engagement: 2890,
  },
  {
    cluster_id: "cluster_alert_001",
    narrative: "Long wait times at customer service centers",
    post_count: 15,
    first_seen: "2025-11-09T14:20:00Z",
    last_seen: "2025-11-10T10:00:00Z",
    risk_score: 48.2,
    risk_tier: "ALERT",
    total_engagement: 890,
  },
];

export const mockClusterDetail: ClusterDetail = {
  cluster_id: "cluster_action_001",
  narrative: "Bank X ATMs failing nationwide - customers unable to withdraw",
  post_count: 47,
  posts: mockPosts,
  risk_analysis: {
    risk_score: 87.5,
    risk_tier: "ACTION",
    components: {
      sentiment: 78.0,
      velocity: 85.2,
      coordination: 67.5,
      credibility: 45.0,
      divergence: 92.3,
    },
  },
  divergence_analysis: {
    divergence_score: 0.923,
    contradictions: [
      "Internal telemetry shows 97.3% ATM uptime (234/240 machines operational)",
      "CBN confirms ATM systems operating normally as of Q3 2024",
    ],
    supports: [],
    rag_available: true,
  },
  sentiment_breakdown: {
    negative: 78,
    neutral: 10,
    positive: 12,
  },
  top_authors: [
    {
      handle: "@viral_news_ng",
      post_count: 8,
      verified: false,
      follower_count: 25000,
    },
    {
      handle: "@concerned_citizen",
      post_count: 5,
      verified: true,
      follower_count: 150000,
    },
  ],
  engagement_stats: {
    total_likes: 3450,
    total_retweets: 892,
    total_replies: 179,
  },
  generated_response: {
    text: "Subject: Important Update from Bank X\n\nDear Valued Customers,\n\nWe are aware of the circulating misinformation regarding our operations. We want to assure you that Bank X is committed to transparency and the security of your financial transactions.\n\nAs of October 2023, all systems are functioning normally, and there has been no disruption to our services. For real-time updates on our operational status, please visit our official status page at https://status.bankx.com.\n\nIf you have any concerns or require clarification, we encourage you to reach out directly to our customer care team at customercare@bankx.com. Our representatives are available to assist you and provide accurate information.\n\nThank you for your continued trust in Bank X. We remain dedicated to serving you with integrity and reliability.\n\nSincerely,\nThe Bank X Team",
    tier: "ACTION",
    generation_method: "openai",
    model: "gpt-4o-mini",
    tokens_used: 320,
    word_count: 128,
    confidence: 0.85,
    safety_flags: [],
    approval_required: true,
    suggested_channels: ["twitter", "website", "press_release", "email_blast", "sms_alert", "cbn_notification"],
    timestamp: "2025-11-12T18:09:47.715280",
  },
  created_at: "2025-11-10T09:30:00Z",
  updated_at: "2025-11-10T10:15:00Z",
};

export const findMockCluster = (id: string): Cluster | undefined => {
  return mockClusters.find((c) => c.cluster_id === id);
};
