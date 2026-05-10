import { describe, expect, test } from "bun:test";
import { graphqlRequest } from "../../src/api/graphqlClient";

type PostsResponse = {
  data?: {
    posts: {
      edges: {
        node: {
          id: string;
          name: string;
          tagline: string;
          url: string;
        };
      }[];
    };
  };
  errors?: { message: string }[];
};

const POSTS_QUERY = `
  query GetPosts($first: Int!) {
    posts(first: $first) {
      edges {
        node {
          id
          name
          tagline
          url
        }
      }
    }
  }
`;

describe("Product Hunt API - posts", () => {
  test("fetches latest posts with basic required details", async () => {
    const response = await graphqlRequest<PostsResponse>(POSTS_QUERY, {
      first: 5
    });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();

    const posts = response.body.data?.posts.edges || [];

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.length).toBeLessThanOrEqual(5);

    for (const post of posts) {
      expect(post.node.id).toBeTruthy();
      expect(post.node.name).toBeTruthy();
      expect(post.node.tagline).toBeTruthy();
      expect(post.node.url).toMatch(/^https?:\/\//);
    }
  });
});