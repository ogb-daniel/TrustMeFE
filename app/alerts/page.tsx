"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useClusters } from "@/lib/hooks/queries/use-clusters"
import { DataTable } from "@/components/ui/data-table"
import { clustersColumns } from "@/components/tables/clusters-columns"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function AllAlertsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { data, isLoading, error } = useClusters(
    { page, page_size: pageSize },
    { refetchInterval: false } // Disable polling for this page
  )

  const clusters = data?.clusters || []
  const totalPages = Math.ceil((data?.total || 0) / pageSize)

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button and Theme Switcher */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <ThemeSwitcher />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Clusters</h1>
          <p className="text-muted-foreground mt-2">View and manage all active misinformation clusters</p>
        </div>

        {/* Error State */}
        {error && (
          <Card className="p-6 bg-card border border-border/50">
            <p className="text-destructive">Error loading clusters: {error.message}</p>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="bg-card border border-border/50 overflow-hidden">
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </Card>
        )}

        {/* Alerts Table */}
        {!isLoading && !error && (
          <Card className="bg-card border border-border/50 overflow-hidden">
            <DataTable
              columns={clustersColumns}
              data={clusters}
              searchKey="narrative"
              searchPlaceholder="Search clusters..."
            />

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing page {page} of {totalPages} ({data?.total || 0} total clusters)
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
