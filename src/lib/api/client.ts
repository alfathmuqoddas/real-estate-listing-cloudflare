export interface ApiClientOptions<K> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: K;
  token?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: boolean;
  status?: number;
}

export const apiClient = async <T, K = unknown>({
  url,
  method = "GET",
  body,
  token,
}: ApiClientOptions<K>): Promise<ApiResponse<T>> => {
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
      return { data: null, error: true, status };
    }

    // Handle 204 No Content or empty responses safely
    if (status === 204) {
      return { data: null, error: false, status };
    }

    const data: T = await res.json();
    return { data, error: false, status };
  } catch (err) {
    console.error("Fetch failed:", err);
    return { data: null, error: true, status: undefined };
  }
};
