"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { useClusters } from "@/lib/hooks/queries/use-clusters"
import { DataTable } from "@/components/ui/data-table"
import { clustersColumns } from "@/components/tables/clusters-columns"

export default function AllAlertsPage() {
  const router = useRouter()
  const { data, isLoading, error } = useClusters({ limit: 50 })

  const clusters = data?.clusters || []

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          </Card>
        )}
      </div>
    </main>
  )
}
