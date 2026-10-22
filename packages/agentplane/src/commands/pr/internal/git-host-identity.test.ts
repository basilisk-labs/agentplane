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
        return Promise.resolve(result(1, "not logged in"));
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

function sessions(github: unknown, gitlab: unknown) {
  mocks.runProcess.mockImplementation(({ command, args }: { command: string; args: string[] }) => {
    if (command === "git")
      return args[0] === "config"
        ? result(1)
        : result(0, "https://forge.example.test/group/project.git");
    if (github instanceof Error) throw github;
    return Promise.resolve(github);
  });
  if (gitlab instanceof Error) mocks.runGlabCommand.mockRejectedValue(gitlab);
  else mocks.runGlabCommand.mockResolvedValue(gitlab);
}
const resolve = () => resolveGitHostIdentity({ gitRoot: "/repo", branch: "task/T-1/work" });
const error = (stderr: string) => Object.assign(new Error("auth status failed"), { stderr });

describe("provider authentication uncertainty", () => {
  it.each(["github", "gitlab"] as const)(
    "retains %s transport uncertainty even if the other provider validates",
    async (provider) => {
      for (const [message, category] of [
        ["dial tcp: i/o timeout", "connection_failure"],
        ["lookup forge: no such host", "dns_failure"],
        ["TLS handshake timeout", "tls_failure"],
        ["unrecognized CLI failure", "unknown_failure"],
      ]) {
        sessions(
          provider === "github" ? { ...result(1), stderr: message } : result(0),
          provider === "gitlab" ? error(message!) : { stdout: "ok", stderr: "" },
        );
        await expect(resolve()).rejects.toMatchObject({
          code: "E_NETWORK",
          context: {
            reason_code: "git_host_provider_validation_unavailable",
            session_status: { [provider]: category },
          },
        });
      }
    },
  );

  it.each([401, 403])(
    "distinguishes HTTP %s from missing credentials without exposing output",
    async (status) => {
      sessions(
        { ...result(1), stderr: "not logged into any hosts" },
        error(`HTTP ${status}: secret-token-example`),
      );
      const failure = await resolve().catch((e: unknown) => e);
      expect(failure).toMatchObject({
        context: {
          reason_code: "git_host_provider_unresolved",
          session_status: { github: "missing_credentials", gitlab: "rejected_credentials" },
        },
      });
      expect(JSON.stringify(failure)).not.toContain("secret-token-example");
    },
  );

  it("preserves real ambiguity between two valid sessions", async () => {
    sessions(result(0), { stdout: "ok", stderr: "" });
    await expect(resolve()).rejects.toMatchObject({
      context: { reason_code: "git_host_provider_ambiguous" },
    });
  });

  it("allows a validated provider when the other CLI is unavailable", async () => {
    sessions(Object.assign(new Error("spawn gh ENOENT"), { code: "ENOENT" }), {
      stdout: "ok",
      stderr: "",
    });
    await expect(resolve()).resolves.toMatchObject({ provider: "gitlab" });
  });

  it("does not classify an unavailable CLI as missing credentials", async () => {
    sessions(
      Object.assign(new Error("spawn gh ENOENT"), { code: "ENOENT" }),
      error("not logged in"),
    );
    await expect(resolve()).rejects.toMatchObject({
      context: {
        session_status: { github: "cli_unavailable", gitlab: "missing_credentials" },
      },
    });
  });

  it("keeps transport failure ahead of incidental invalid-token wording and redacts raw output", async () => {
    sessions(
      result(1, "not logged in"),
      error("invalid token: TLS handshake timeout https://user:secret@private.test/path"),
    );
    const failure = await resolve().catch((e: unknown) => e);
    expect(failure).toMatchObject({ context: { session_status: { gitlab: "tls_failure" } } });
    expect(JSON.stringify(failure)).not.toMatch(/secret|private\.test|invalid token/);
    expect((failure as Error).message).not.toMatch(/auth login/);
  });

  it("preserves a recorded provider without probing or falling back during outages", async () => {
    sessions(new Error("ETIMEDOUT"), error("DNS timeout"));
    const before = mocks.runGlabCommand.mock.calls.length;
    await expect(
      resolveGitHostIdentity({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        recorded: {
          kind: "gitlab",
          hostname: "forge.example.test",
          remote: "origin",
          source_project: "group/project",
          target_project: "group/project",
        },
      }),
    ).resolves.toMatchObject({ provider: "gitlab" });
    expect(mocks.runGlabCommand.mock.calls.length).toBe(before);
    expect(
      mocks.runProcess.mock.calls
        .slice(-3)
        .every(([call]) => (call as { command: string }).command === "git"),
    ).toBe(true);
  });
});
