import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ runProcess: vi.fn(), runGlabCommand: vi.fn() }));

vi.mock("@agentplaneorg/core/process", () => ({ runProcess: mocks.runProcess }));
vi.mock("./glab-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  runGlabCommand: mocks.runGlabCommand,
}));

import { parseGitRemoteUrl, resolveGitHostIdentity } from "./git-host-identity.js";

function result(exitCode: number, stdout = "") {
  return { exitCode, stdout, stderr: "" };
}

describe("git-host-identity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.runGlabCommand.mockResolvedValue({ stdout: "authenticated\n", stderr: "" });
  });

  it.each([
    ["git@github.com:owner/repo.git", { hostname: "github.com", project: "owner/repo" }],
    [
      "ssh://git@gitlab.example.com:2222/group/sub/repo.git",
      { hostname: "gitlab.example.com:2222", project: "group/sub/repo" },
    ],
    [
      "https://gitlab.com/group/sub/repo.git",
      { hostname: "gitlab.com", project: "group/sub/repo" },
    ],
  ])("parses publication remote %s", (remote, expected) => {
    expect(parseGitRemoteUrl(remote)).toEqual(expected);
  });

  it("derives a self-managed GitLab fork from the selected publication remote and glab session", async () => {
    mocks.runProcess.mockImplementation(
      ({ command, args }: { command: string; args: string[] }) => {
        if (command === "git" && args[0] === "config") return Promise.resolve(result(0, "fork\n"));
        if (command === "git" && args.includes("--push")) {
          return Promise.resolve(result(0, "git@gitlab.example.test:denis/project.git\n"));
        }
        if (command === "git" && args[0] === "remote") {
          return Promise.resolve(result(0, "https://gitlab.example.test/group/project.git\n"));
        }
        return Promise.resolve(result(1, ""));
      },
    );

    await expect(
      resolveGitHostIdentity({ gitRoot: "/repo", branch: "task/T-1/work" }),
    ).resolves.toMatchObject({
      provider: "gitlab",
      hostname: "gitlab.example.test",
      remote: "fork",
      sourceProject: "denis/project",
      targetProject: "group/project",
    });
    expect(mocks.runGlabCommand).toHaveBeenCalledWith({
      cwd: "/repo",
      args: ["auth", "status", "--hostname", "gitlab.example.test"],
    });
  });

  it("fails closed when persisted provider identity drifts", async () => {
    mocks.runProcess.mockImplementation(
      ({ command, args }: { command: string; args: string[] }) => {
        if (command === "git" && args[0] === "config") return Promise.resolve(result(1));
        return Promise.resolve(result(0, "https://gitlab.com/group/project.git\n"));
      },
    );
    await expect(
      resolveGitHostIdentity({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        recorded: {
          kind: "gitlab",
          hostname: "gitlab.com",
          remote: "origin",
          source_project: "other/project",
          target_project: "group/project",
        },
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "git_host_identity_drift" },
    });
  });

  it("does not let recorded provider kind override a well-known host", async () => {
    mocks.runProcess.mockImplementation(
      ({ command, args }: { command: string; args: string[] }) => {
        if (command === "git" && args[0] === "config") return Promise.resolve(result(1));
        return Promise.resolve(result(0, "https://gitlab.com/group/project.git\n"));
      },
    );
    await expect(
      resolveGitHostIdentity({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        recorded: {
          kind: "github",
          hostname: "gitlab.com",
          remote: "origin",
          source_project: "group/project",
          target_project: "group/project",
        },
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "git_host_identity_drift" },
    });
  });
});
