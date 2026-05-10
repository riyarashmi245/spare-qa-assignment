import { describe, expect, test } from "bun:test";
import { graphqlRequest } from "../../src/api/graphqlClient";

type PostsPaginationResponse = {
  data?: {
    posts: {
      edges: {
        cursor: string;
        node: {
          id: string;
          name: string;
        };
      }[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  };
  errors?: { message: string }[];
};

const POSTS_WITH_PAGINATION_QUERY = `
  query GetPostsWithPagination($first: Int!) {
    posts(first: $first) {
      edges {
        cursor
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

describe("Product Hunt API - pagination", () => {
  test("returns pagination details for posts list", async () => {
    const response = await graphqlRequest<PostsPaginationResponse>(
      POSTS_WITH_PAGINATION_QUERY,
      { first: 5 }
    );

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();

    const posts = response.body.data?.posts.edges || [];
    const pageInfo = response.body.data?.posts.pageInfo;

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.length).toBeLessThanOrEqual(5);

    expect(pageInfo).toBeDefined();
    expect(typeof pageInfo?.hasNextPage).toBe("boolean");

    if (pageInfo?.hasNextPage) {
      expect(pageInfo.endCursor).toBeTruthy();
    }
  });
});