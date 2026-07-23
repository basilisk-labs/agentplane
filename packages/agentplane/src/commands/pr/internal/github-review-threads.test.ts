import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  resolveDefaultGithubRepo: vi.fn(),
  runGhApiJson: vi.fn(),
}));

vi.mock("./gh-api.js", () => ({
  resolveDefaultGithubRepo: mocks.resolveDefaultGithubRepo,
  runGhApiJson: mocks.runGhApiJson,
}));

import { checkGithubUnresolvedReviewThreads } from "./github-review-threads.js";

function thread(index: number) {
  return {
    isResolved: false,
    isOutdated: false,
    path: `src/file-${index}.ts`,
    line: index + 1,
    comments: {
      nodes: [{ url: `https://github.com/example/repo/pull/123#discussion-${index}` }],
    },
  };
}

describe("GitHub review thread checks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.resolveDefaultGithubRepo.mockResolvedValue("example/repo");
  });

  it.each([
    {
      label: "nodes",
      payload: {
        data: {
          repository: {
            pullRequest: {
              reviewThreads: {
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        },
      },
    },
    {
      label: "pageInfo",
      payload: {
        data: {
          repository: {
            pullRequest: {
              reviewThreads: {
                nodes: [],
              },
            },
          },
        },
      },
    },
  ])("fails closed when the provider payload has malformed $label", async ({ label, payload }) => {
    mocks.runGhApiJson.mockResolvedValue(payload);

    const result = await checkGithubUnresolvedReviewThreads({
      gitRoot: "/repo",
      prNumber: 123,
    });

    expect(result.checked).toBe(false);
    if (!result.checked) expect(result.reason).toContain(label);
  });

  it("paginates beyond 100 threads and preserves unresolved findings", async () => {
    mocks.runGhApiJson
      .mockResolvedValueOnce({
        data: {
          repository: {
            pullRequest: {
              reviewThreads: {
                nodes: Array.from({ length: 100 }, (_, index) => thread(index)),
                pageInfo: { hasNextPage: true, endCursor: "cursor-100" },
              },
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          repository: {
            pullRequest: {
              reviewThreads: {
                nodes: [thread(100)],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        },
      });

    const result = await checkGithubUnresolvedReviewThreads({
      gitRoot: "/repo",
      prNumber: 123,
    });

    expect(result.checked).toBe(true);
    if (!result.checked) throw new Error(result.reason);
    expect(result.unresolved).toHaveLength(101);
    expect(mocks.runGhApiJson).toHaveBeenCalledTimes(2);
    const secondArgs = mocks.runGhApiJson.mock.calls[1]?.[1] as string[] | undefined;
    expect(secondArgs).toContain("cursor=cursor-100");
  });
});
