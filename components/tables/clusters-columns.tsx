"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cluster } from "@/lib/types/cluster";
import { TIER_CONFIG } from "@/lib/constants/tiers";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const clustersColumns: ColumnDef<Cluster>[] = [
  {
    accessorKey: "narrative",
    header: "Narrative",
    cell: ({ row }) => {
      const cluster = row.original;

      return (
        <div>
          <Link
            href={`/alert/${cluster.cluster_id}`}
            className="font-medium text-foreground hover:text-primary transition-colors text-left max-w-md block"
          >
            {cluster.narrative}
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            {cluster.post_count} posts
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "risk_tier",
    header: "Tier",
    cell: ({ row }) => {
      const cluster = row.original;
      const tier = cluster.risk_tier;

      // If tier is missing, show debug info
      if (!tier) {
        console.warn('Missing risk_tier for cluster:', cluster);
        return <span className="text-xs text-muted-foreground">N/A</span>;
      }

      const tierConfig = TIER_CONFIG[tier];

      if (!tierConfig) {
        console.warn('Unknown tier value:', tier, 'Expected: MONITOR, ALERT, or ACTION');
        return <span className="text-xs text-muted-foreground">{tier}</span>;
      }

      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tierConfig.bgColor} ${tierConfig.textColor}`}
        >
          {tierConfig.label}
        </span>
      );
    },
  },
  {
    accessorKey: "risk_score",
    header: "Risk Score",
    cell: ({ row }) => {
      const riskScore = row.getValue("risk_score") as number;
      return (
        <span className="text-sm text-foreground font-medium">
          {riskScore.toFixed(1)}%
        </span>
      );
    },
  },
  {
    accessorKey: "last_seen",
    header: "Last Seen",
    cell: ({ row }) => {
      const lastSeen = row.getValue("last_seen") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(lastSeen), { addSuffix: true })}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const cluster = row.original;

      return (
        <div className="text-right">
          <Link
            href={`/alert/${cluster.cluster_id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-muted-foreground/80 transition-colors"
          >
            View
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      );
    },
  },
];
