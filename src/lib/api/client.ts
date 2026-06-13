export const apiClient = async <T>(
  url: string,
  token?: string,
): Promise<{ data: T | null; error: boolean; status?: number }> => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const status = res.status;

    if (!res.ok) {
      return { data: null, error: true, status };
    }

    const data: T = await res.json();
    return { data, error: false, status };
  } catch (err) {
    console.error("Fetch failed:", err);
    return { data: null, error: true, status: undefined };
  }
};
