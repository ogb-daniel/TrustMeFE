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
    telemetry_check: {
      mismatch: false,
      explanation: "Telemetry does not contradict claim",
      confidence: 0.5,
    },
  },
  telemetry: {
    type: "FOREX_MARKET_DATA",
    timestamp: "2025-11-12T17:24:01.651453",
    metrics: {
      official_rate: 750.5,
      parallel_market_rate: 1205.75,
      rate_divergence_pct: 60.7,
      daily_volume_usd: 245000000,
      volatility_index: 8.9,
      liquidity_stress_level: "SEVERE",
    },
    severity: "CRITICAL",
    confirms_narrative: true,
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
  virality: {
    timeline: [
      { hour: 0, post_count: 11, cumulative_posts: 11, engagement: 50617, cumulative_engagement: 50617, velocity: 16.5 },
      { hour: 1, post_count: 8, cumulative_posts: 19, engagement: 29984, cumulative_engagement: 80601, velocity: 13.35 },
      { hour: 2, post_count: 4, cumulative_posts: 23, engagement: 15817, cumulative_engagement: 96418, velocity: 7.8 },
      { hour: 3, post_count: 9, cumulative_posts: 32, engagement: 41412, cumulative_engagement: 137830, velocity: 11.25 },
      { hour: 4, post_count: 5, cumulative_posts: 37, engagement: 22828, cumulative_engagement: 160658, velocity: 27.9 },
      { hour: 5, post_count: 4, cumulative_posts: 41, engagement: 13182, cumulative_engagement: 173840, velocity: 19.35 },
      { hour: 6, post_count: 6, cumulative_posts: 47, engagement: 16409, cumulative_engagement: 190249, velocity: 24.3 },
      { hour: 7, post_count: 3, cumulative_posts: 50, engagement: 11175, cumulative_engagement: 201424, velocity: 17.55 },
      { hour: 8, post_count: 9, cumulative_posts: 59, engagement: 36583, cumulative_engagement: 238007, velocity: 32.4 },
      { hour: 9, post_count: 4, cumulative_posts: 63, engagement: 14069, cumulative_engagement: 252076, velocity: 8.25 },
      { hour: 10, post_count: 8, cumulative_posts: 71, engagement: 27198, cumulative_engagement: 279274, velocity: 10.2 },
      { hour: 11, post_count: 7, cumulative_posts: 78, engagement: 21308, cumulative_engagement: 300582, velocity: 10.95 },
      { hour: 12, post_count: 7, cumulative_posts: 85, engagement: 24671, cumulative_engagement: 325253, velocity: 10.5 },
    ],
    metrics: {
      total_posts: 85,
      total_engagement: 325253,
      unique_accounts: 85,
      duration_hours: 12,
      avg_velocity: 16.18,
      peak_velocity: 32.4,
      peak_hour: 8,
      spread_score: 1,
      virality_index: 1,
      engagement_per_post: 3826.51,
    },
    computed_at: "2025-11-13T04:24:14.442091",
  },
  created_at: "2025-11-10T09:30:00Z",
  updated_at: "2025-11-10T10:15:00Z",
};

export const findMockCluster = (id: string): Cluster | undefined => {
  return mockClusters.find((c) => c.cluster_id === id);
};
