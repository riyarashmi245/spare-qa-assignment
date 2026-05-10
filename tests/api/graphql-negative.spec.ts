import { describe, expect, test } from "bun:test";
import { graphqlRequest } from "../../src/api/graphqlClient";

type ErrorResponse = {
  errors?: {
    message: string;
  }[];
};

describe("Product Hunt API - negative cases", () => {
  test("returns a safe error for an invalid field", async () => {
    const invalidQuery = `
      query {
        posts(first: 1) {
          edges {
            node {
              id
              fieldThatDoesNotExist
            }
          }
        }
      }
    `;

    const response = await graphqlRequest<ErrorResponse>(invalidQuery);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors?.length).toBeGreaterThan(0);

    const errorText = JSON.stringify(response.body.errors).toLowerCase();

    expect(errorText).not.toContain("stacktrace");
    expect(errorText).not.toContain("database");
    expect(errorText).not.toContain("secret");
  });

  test("rejects request when token is missing", async () => {
    const query = `
      query {
        posts(first: 1) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `;

    const response = await graphqlRequest<ErrorResponse>(query, {}, "");

    expect([401, 403]).toContain(response.status);
  });

  test("rejects request when token is invalid", async () => {
    const query = `
      query {
        posts(first: 1) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `;

    const response = await graphqlRequest<ErrorResponse>(
      query,
      {},
      "invalid-token-for-test"
    );

    expect([401, 403]).toContain(response.status);
  });
});