import ky from "ky";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
export const USE_MOCK = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === "true";

export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ["get"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Future: Add authentication
        // const token = getAuthToken();
        // if (token) {
        //   request.headers.set('Authorization', `Bearer ${token}`);
        // }

        console.log(`[API] ${request.method} ${request.url}`);
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const error = await response.json() as { detail?: string };
          const errorMessage = error?.detail || "API request failed";
          console.error(`[API Error] ${response.status}: ${errorMessage}`);
          throw new Error(errorMessage);
        }
      },
    ],
  },
});

// Health check utility
export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get("health").json<{
      status: string;
      components: Record<string, string>;
    }>();
    return response.status === "operational";
  } catch {
    return false;
  }
};
