import { io, Socket } from "socket.io-client";
import { Cluster } from "@/lib/types/cluster";
import { Alert } from "@/lib/types/alert";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
const WS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_WEBSOCKET === "true";

export interface WebSocketEvents {
  new_cluster: (data: { cluster: Cluster; timestamp: string }) => void;
  cluster_updated: (data: {
    cluster_id: string;
    changes: Partial<Cluster>;
    timestamp: string;
  }) => void;
  alert_created: (data: { alert: Alert; timestamp: string }) => void;
}

let socket: Socket | null = null;

export const connectWebSocket = (): Socket | null => {
  if (!WS_ENABLED) {
    console.log("[WebSocket] Disabled in environment");
    return null;
  }

  if (socket?.connected) {
    console.log("[WebSocket] Already connected");
    return socket;
  }

  socket = io(WS_URL, {
    path: "/ws/clusters",
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("[WebSocket] Connected");
  });

  socket.on("disconnect", (reason) => {
    console.log(`[WebSocket] Disconnected: ${reason}`);
  });

  socket.on("connect_error", (error) => {
    console.error("[WebSocket] Connection error:", error);
  });

  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("[WebSocket] Disconnected manually");
  }
};

export const getSocket = () => socket;

export const subscribeToEvent = <K extends keyof WebSocketEvents>(
  event: K,
  handler: WebSocketEvents[K]
) => {
  if (!socket) return;
  socket.on(event, handler as any);
};

export const unsubscribeFromEvent = <K extends keyof WebSocketEvents>(
  event: K,
  handler: WebSocketEvents[K]
) => {
  if (!socket) return;
  socket.off(event, handler as any);
};
