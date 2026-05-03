import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));

describe("guard/impl/env", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    delete process.env.GIT_AUTHOR_NAME;
    delete process.env.GIT_AUTHOR_EMAIL;
    delete process.env.GIT_COMMITTER_NAME;
    delete process.env.GIT_COMMITTER_EMAIL;
  });

  it("buildGitCommitEnv injects canonical git identity into author and committer fields", async () => {
    const { buildGitCommitEnv } = await import("./env.js");
    const env = buildGitCommitEnv({
      taskId: "202601010101-ABCDEF",
      allowTasks: true,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      gitIdentity: { name: "Denis Smirnov", email: "densmirnov@me.com" },
    });

    expect(env.GIT_AUTHOR_NAME).toBe("Denis Smirnov");
    expect(env.GIT_AUTHOR_EMAIL).toBe("densmirnov@me.com");
    expect(env.GIT_COMMITTER_NAME).toBe("Denis Smirnov");
    expect(env.GIT_COMMITTER_EMAIL).toBe("densmirnov@me.com");
    expect(env.AGENTPLANE_TASK_ID).toBe("202601010101-ABCDEF");
  });

  it("resolveCanonicalGitIdentity prefers global git config", async () => {
    mocks.execFileAsync
      .mockResolvedValueOnce({ stdout: "Denis Smirnov\n" })
      .mockResolvedValueOnce({ stdout: "densmirnov@me.com\n" });

    const { resolveCanonicalGitIdentity } = await import("./env.js");
    const identity = await resolveCanonicalGitIdentity();

    expect(identity).toEqual({ name: "Denis Smirnov", email: "densmirnov@me.com" });
    expect(mocks.execFileAsync).toHaveBeenNthCalledWith(
      1,
      "git",
      ["config", "--global", "--get", "user.name"],
      expect.any(Object),
    );
    expect(mocks.execFileAsync).toHaveBeenNthCalledWith(
      2,
      "git",
      ["config", "--global", "--get", "user.email"],
      expect.any(Object),
    );
  });

  it("resolveCanonicalGitIdentity falls back to ambient git env when global config is missing", async () => {
    process.env.GIT_AUTHOR_NAME = "Ambient User";
    process.env.GIT_AUTHOR_EMAIL = "ambient@example.com";
    mocks.execFileAsync.mockRejectedValue(new Error("missing"));

    const { resolveCanonicalGitIdentity } = await import("./env.js");
    const identity = await resolveCanonicalGitIdentity();

    expect(identity).toEqual({ name: "Ambient User", email: "ambient@example.com" });
  });
});

describe("guard/impl/dco", () => {
  it("appends the configured DCO sign-off trailer once", async () => {
    const { appendDcoSignoff } = await import("./dco.js");
    const config = {
      commit: {
        dco: { enabled: true, name: "Denis Smirnov", email: "densmirnov@me.com" },
      },
    } as never;

    expect(appendDcoSignoff({ config, body: "Body" })).toBe(
      "Body\n\nSigned-off-by: Denis Smirnov <densmirnov@me.com>",
    );
    expect(
      appendDcoSignoff({
        config,
        body: "Body\n\nSigned-off-by: Denis Smirnov <densmirnov@me.com>",
      }),
    ).toBe("Body\n\nSigned-off-by: Denis Smirnov <densmirnov@me.com>");
  });

  it("validates any well-formed DCO sign-off for manual commits", async () => {
    const { assertDcoSignoff } = await import("./dco.js");
    const config = {
      commit: {
        dco: { enabled: true, name: "Denis Smirnov", email: "densmirnov@me.com" },
      },
    } as Parameters<typeof assertDcoSignoff>[0]["config"];

    expect(() =>
      assertDcoSignoff({
        config,
        message: "Subject\n\nSigned-off-by: Ada Lovelace <ada@example.com>",
      }),
    ).not.toThrow();
    expect(() => assertDcoSignoff({ config, message: "Subject\n\nBody" })).toThrow(
      "DCO sign-off is required",
    );
  });

  it("requires manual DCO sign-off even when no default AgentPlane identity is configured", async () => {
    const { assertDcoSignoff } = await import("./dco.js");
    const config = {
      commit: {
        dco: { enabled: true, name: null, email: null },
      },
    } as Parameters<typeof assertDcoSignoff>[0]["config"];

    expect(() => assertDcoSignoff({ config, message: "Subject\n\nBody" })).toThrow(
      "DCO sign-off is required",
    );
    expect(() =>
      assertDcoSignoff({
        config,
        message: "Subject\n\nSigned-off-by: Grace Hopper <grace@example.com>",
      }),
    ).not.toThrow();
  });

  it("does not append a sign-off when DCO is disabled", async () => {
    const { appendDcoSignoff } = await import("./dco.js");
    const config = {
      commit: {
        dco: { enabled: false, name: "Denis Smirnov", email: "densmirnov@me.com" },
      },
    } as never;

    expect(appendDcoSignoff({ config, body: "Body" })).toBe("Body");
  });
});
