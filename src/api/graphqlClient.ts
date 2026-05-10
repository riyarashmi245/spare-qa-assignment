import "dotenv/config";

const API_URL =
  process.env.PRODUCTHUNT_API_URL || "https://api.producthunt.com/v2/api/graphql";

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  token: string | undefined = process.env.PRODUCTHUNT_TOKEN
): Promise<{
  status: number;
  body: T;
  headers: Headers;
}> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables
    })
  });

  const body = await response.json().catch(() => ({}));

  return {
    status: response.status,
    body: body as T,
    headers: response.headers
  };
}