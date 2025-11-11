import { Post } from "@/lib/types/post";

export const mockPosts: Post[] = [
  {
    id: "tweet_001",
    text: "Bank X ATMs down nationwide! Can't withdraw cash. This is unacceptable! #BankXFailure",
    timestamp: "2025-11-10T09:45:00Z",
    source: "twitter",
    author: {
      handle: "@user_a",
      display_name: "User A",
      verified: false,
      follower_count: 5400,
      account_age_days: 1234,
      profile_url: "https://twitter.com/user_a",
    },
    engagement: {
      retweets: 1200,
      likes: 890,
      replies: 234,
      views: 15000,
    },
    metadata: {
      url: "https://twitter.com/user_a/status/001",
      language: "en",
      has_media: false,
    },
  },
  {
    id: "tweet_002",
    text: 'Tried 3 different Bank X ATMs in Lagos. All showing "out of service". What\'s going on?',
    timestamp: "2025-11-10T09:52:00Z",
    source: "twitter",
    author: {
      handle: "@concerned_customer",
      display_name: "John Doe",
      verified: true,
      follower_count: 12000,
      account_age_days: 2156,
      profile_url: "https://twitter.com/concerned_customer",
    },
    engagement: {
      retweets: 450,
      likes: 320,
      replies: 89,
      views: 8500,
    },
    metadata: {
      url: "https://twitter.com/concerned_customer/status/002",
      language: "en",
      has_media: true,
    },
  },
  {
    id: "tweet_003",
    text: "Bank X needs to address this ATM crisis ASAP. People need cash!",
    timestamp: "2025-11-10T10:01:00Z",
    source: "twitter",
    author: {
      handle: "@finance_watcher",
      display_name: "Finance Watcher",
      verified: true,
      follower_count: 45000,
      account_age_days: 3245,
      profile_url: "https://twitter.com/finance_watcher",
    },
    engagement: {
      retweets: 2100,
      likes: 1500,
      replies: 456,
      views: 28000,
    },
    metadata: {
      url: "https://twitter.com/finance_watcher/status/003",
      language: "en",
      has_media: false,
    },
  },
];
