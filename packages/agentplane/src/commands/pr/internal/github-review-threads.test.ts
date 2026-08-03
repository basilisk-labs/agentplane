import { beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  resolveDefaultGithubRepo: vi.fn(),
  runGhApiJson: vi.fn(),
}));

vi.mock("./gh-api.js", () => ({
  resolveDefaultGithubRepo: mocks.resolveDefaultGithubRepo,
  runGhApiJson: mocks.runGhApiJson,
}));

import {
  checkGithubUnresolvedReviewThreads,
  throwIfGithubReviewThreadsUnresolved,
} from "./github-review-threads.js";

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

  it("classifies unresolved threads as a retryable pre-merge gate", () => {
    let caught: unknown;
    try {
      throwIfGithubReviewThreadsUnresolved({
        prNumber: 123,
        unresolved: [
          {
            path: "src/file.ts",
            line: 7,
            url: "https://github.com/example/repo/pull/123#discussion-1",
          },
        ],
      });
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(CliError);
    const error = caught as CliError;
    expect(error.code).toBe("E_VALIDATION");
    expect(error.context).toMatchObject({
      reason_code: "github_review_threads_unresolved",
      pr_number: 123,
      unresolved_review_threads: 1,
    });
  });
});
