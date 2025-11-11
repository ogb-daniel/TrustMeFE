"use client"

import { Card } from "@/components/ui/card"
import { MessageCircle, Share2, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { Post } from "@/lib/types/post"

interface EvidenceSectionProps {
  posts: Post[]
}

export function EvidenceSection({ posts }: EvidenceSectionProps) {
  const router = useRouter()
  const topPosts = posts.slice(0, 3)

  const formatEngagement = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <Card className="p-6 bg-card border border-border/50">
      <h2 className="text-lg font-semibold text-foreground mb-6">Evidence (Top {topPosts.length} Posts)</h2>

      <div className="space-y-4">
        {topPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-lg border border-border/40 bg-background/40 hover:bg-background/60 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-foreground">@{post.author.handle}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatEngagement(post.engagement.retweets)} RTs · {formatEngagement(post.engagement.likes)} likes
                </p>
              </div>
              <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded capitalize">
                {post.source}
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{post.text}</p>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/30">
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
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <button
          onClick={() => router.push("/posts")}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          View all {posts.length} posts →
        </button>
      </div>
    </Card>
  )
}
