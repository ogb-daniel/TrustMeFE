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
            href={`/alert/${cluster.id}`}
            className="font-medium text-foreground hover:text-primary transition-colors text-left max-w-md block"
          >
            {cluster.narrative}
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            {cluster.size} posts
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => {
      const tier = row.getValue("tier") as Cluster["tier"];
      const tierConfig = TIER_CONFIG[tier];

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
    accessorKey: "velocity",
    header: "Velocity",
    cell: ({ row }) => {
      const velocity = row.getValue("velocity") as number;
      return (
        <span className="text-sm text-foreground">
          {velocity.toFixed(1)} posts/hr
        </span>
      );
    },
  },
  {
    accessorKey: "last_updated",
    header: "Last Updated",
    cell: ({ row }) => {
      const lastUpdated = row.getValue("last_updated") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
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
            href={`/alert/${cluster.id}`}
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
