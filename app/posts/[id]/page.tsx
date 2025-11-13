"use client";

import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  BadgeCheck,
} from "lucide-react";
import { useClusterDetail } from "@/lib/hooks/queries/use-cluster-detail";
import { Button } from "@/components/ui/button";

export default function AllPostsPage() {
  const router = useRouter();
  const params = useParams();
  const clusterId = params.id as string;

  const { data: cluster, isLoading, error } = useClusterDetail(clusterId);

  const formatEngagement = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 bg-card border border-border/50 max-w-md">
          <h2 className="text-lg font-semibold text-destructive mb-2">
            Error Loading Posts
          </h2>
          <p className="text-muted-foreground">{error.message}</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Button onClick={() => router.back()} variant="outline">
              Back
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
          <div className="mb-8">
            <div className="h-10 w-64 bg-muted animate-pulse rounded mb-2" />
            <div className="h-5 w-96 bg-muted animate-pulse rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-40 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Posts</h1>
          <p className="text-muted-foreground mt-2">
            View all {cluster?.posts.length || 0} posts related to this alert
          </p>
          {cluster?.narrative && (
            <p className="text-sm text-foreground mt-3 font-medium">
              {cluster.narrative}
            </p>
          )}
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {cluster?.posts.map((post) => (
            <Card
              key={post.id}
              className="p-6 bg-card border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    @{post.author.username}{" "}
                    {post.author.verified && (
                      <BadgeCheck className="text-[#1d9bf0]" />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatEngagement(post.engagement.retweets)} RTs ·{" "}
                    {formatEngagement(post.engagement.likes)} likes
                  </p>
                </div>
                <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded capitalize">
                  {post.source}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {post.text}
              </p>
              <div className="flex items-center gap-4 pt-3 border-t border-border/30">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Reply
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="h-4 w-4" />
                  Like
                </button>
              </div>
            </Card>
          ))}
        </div>

        {cluster?.posts.length === 0 && (
          <Card className="p-6 bg-card border border-border/50">
            <p className="text-center text-muted-foreground">
              No posts available for this cluster.
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
