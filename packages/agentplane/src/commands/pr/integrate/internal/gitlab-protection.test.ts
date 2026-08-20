import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ runGlabApiJson: vi.fn() }));
vi.mock("../../internal/glab-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  runGlabApiJson: mocks.runGlabApiJson,
}));

import { resolveGitLabBaseMergeRequestProtection } from "./gitlab-protection.js";

const identity = {
  provider: "gitlab" as const,
  hostname: "gitlab.example.test",
  remote: "origin",
  sourceProject: "group/project",
  targetProject: "group/project",
  sourceUrl: "git@gitlab.example.test:group/project.git",
  targetUrl: "git@gitlab.example.test:group/project.git",
};

describe("GitLab protected branch", () => {
  beforeEach(() => vi.clearAllMocks());

  it("uses the explicit host and nested project path", async () => {
    mocks.runGlabApiJson.mockResolvedValue({ name: "main", merge_access_levels: [] });
    await expect(
      resolveGitLabBaseMergeRequestProtection({
        gitRoot: "/repo",
        identity,
        baseBranch: "main",
      }),
    ).resolves.toEqual({ state: "protected", baseBranch: "main" });
    expect(mocks.runGlabApiJson).toHaveBeenCalledWith({
      cwd: "/repo",
      hostname: "gitlab.example.test",
      endpoint: "projects/group%2Fproject/protected_branches/main",
    });
  });

  it("treats a provider 404 as confirmed unprotected", async () => {
    mocks.runGlabApiJson.mockRejectedValue(new Error("HTTP 404 Not Found"));
    await expect(
      resolveGitLabBaseMergeRequestProtection({
        gitRoot: "/repo",
        identity,
        baseBranch: "main",
      }),
    ).resolves.toEqual({ state: "unprotected", baseBranch: "main" });
  });
});
