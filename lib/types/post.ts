import { Source } from "./api";

export interface Post {
  id: string;
  text: string;
  timestamp: string;
  source: Source;
  author: Author;
  engagement: Engagement;
  metadata: PostMetadata;
}

export interface Author {
  handle: string;
  display_name: string;
  verified: boolean;
  follower_count: number;
  account_age_days: number;
  profile_url?: string;
  username: string;
}

export interface Engagement {
  likes: number;
  retweets: number;
  replies: number;
  views?: number;
}

export interface PostMetadata {
  url: string;
  language: string;
  has_media: boolean;
}
