"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { MessageCircle, Share2, Heart, ChevronLeft } from "lucide-react"

const allPostsData = [
  {
    id: 1,
    author: "@user_a",
    engagement: "1.2K",
    metric: "RTs",
    text: "Bank X ATMs down across 3 states. Unable to withdraw cash for hours. This is unacceptable.",
  },
  {
    id: 2,
    author: "@user_b",
    engagement: "890",
    metric: "likes",
    text: 'Just tried to get cash from Bank X ATM near downtown. Machine says "Out of Service".',
  },
  {
    id: 3,
    author: "@user_c",
    engagement: "340",
    metric: "RTs",
    text: "[VIDEO] Bank X ATM not working. This is affecting thousands of customers right now!",
  },
  {
    id: 4,
    author: "@user_d",
    engagement: "2.1K",
    metric: "RTs",
    text: "Just tried 5 different Bank X ATMs. All are showing 'Service Unavailable'. This is a massive outage!",
  },
  {
    id: 5,
    author: "@user_e",
    engagement: "567",
    metric: "likes",
    text: "Can anyone else not access Bank X ATMs? I've been unable to get cash all day.",
  },
  {
    id: 6,
    author: "@user_f",
    engagement: "1.5K",
    metric: "RTs",
    text: "[BREAKING] Bank X CEO silent on ATM outage affecting millions. No statement yet.",
  },
]

export default function AllPostsPage() {
  const router = useRouter()

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
          <p className="text-muted-foreground mt-2">View all 147 posts related to this alert</p>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {allPostsData.map((post) => (
            <Card key={post.id} className="p-6 bg-card border border-border/50 hover:border-border transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {post.engagement} {post.metric}
                  </p>
                </div>
                <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded">Social</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">{post.text}</p>
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
      </div>
    </main>
  )
}
