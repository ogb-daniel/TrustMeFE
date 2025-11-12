import ky from "ky";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Granular mock flags for different data types
export const USE_MOCK_CLUSTERS = process.env.NEXT_PUBLIC_MOCK_CLUSTERS === "true";
export const USE_MOCK_RISK = process.env.NEXT_PUBLIC_MOCK_RISK_ANALYSIS === "true";
export const USE_MOCK_STATISTICS = process.env.NEXT_PUBLIC_MOCK_STATISTICS === "true";

// Legacy flag for backward compatibility
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
        // Add ngrok-skip-browser-warning header to bypass ngrok warning page
        request.headers.set('ngrok-skip-browser-warning', 'true');

        console.log(`[API] ${request.method} ${request.url}`);
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (!response.ok) {
          let errorMessage = `API request failed: ${response.status} ${response.statusText}`;

          try {
            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
              const error = await response.json() as { detail?: string };
              errorMessage = error?.detail || errorMessage;
            } else {
              // If response is not JSON, log the content type
              const text = await response.text();
              console.error(`[API Error] Non-JSON response from ${request.url}:`, {
                status: response.status,
                contentType,
                bodyPreview: text.substring(0, 200)
              });
              errorMessage = `API returned ${contentType || 'unknown content type'} instead of JSON. Check if the API is running correctly.`;
            }
          } catch (parseError) {
            console.error(`[API Error] Failed to parse error response:`, parseError);
          }

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
