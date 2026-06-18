export interface ApiClientOptions<K> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: K;
  token?: string;
}

export interface ApiResponse<T, E = Error> {
  data: T | null;
  error: E | null;
  status?: number;
}

export const apiClient = async <T, K = unknown>({
  url,
  method = "GET",
  body,
  token,
}: ApiClientOptions<K>): Promise<ApiResponse<T, Error>> => {
  try {
    const hasBody = body && !["GET", "HEAD"].includes(method);

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(hasBody ? { body: JSON.stringify(body) } : {}),
    });

    const status = res.status;

    if (!res.ok) {
      return {
        data: null,
        error: new Error(`HTTP Error ${status}: ${res.statusText}`),
        status,
      };
    }

    // Handle 204 No Content or empty responses safely
    if (status === 204) {
      return { data: null, error: null, status };
    }

    const data: T = await res.json();
    return { data, error: null, status };
  } catch (err) {
    console.error("Fetch failed:", err);
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown network error"),
      status: undefined,
    };
  }
};
