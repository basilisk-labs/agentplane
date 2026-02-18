import { describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";
import type { CommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => {
  return {
    fileExists: vi.fn((_path: string) => Promise.resolve(true)),
    readdir: vi.fn((_path: string) => Promise.resolve([] as string[])),
  };
});

vi.mock("../../cli/fs-utils.js", () => ({ fileExists: mocks.fileExists }));
vi.mock("node:fs/promises", () => ({ readdir: mocks.readdir }));

function mkCtx(): CommandContext {
  const cfg = defaultConfig();
  cfg.paths.agents_dir = ".agentplane/agents";

  return {
    resolvedProject: { gitRoot: "/repo" } as CommandContext["resolvedProject"],
    config: cfg,
    taskBackend: {} as CommandContext["taskBackend"],
    backendId: "local",
    backendConfigPath: ".agentplane/backends/local/backend.json",
    git: {} as CommandContext["git"],
    memo: {},
    resolved: { gitRoot: "/repo" } as CommandContext["resolved"],
    backend: {} as CommandContext["backend"],
  };
}

describe("warnIfUnknownOwner", () => {
  it("memoizes agent ids listing within one ctx instance", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readdir.mockResolvedValue(["CODER.json", "TESTER.json"]);

    const ctx = mkCtx();
    await expect(warnIfUnknownOwner(ctx, "NOPE")).rejects.toMatchObject({ code: "E_VALIDATION" });
    await expect(warnIfUnknownOwner(ctx, "NOPE")).rejects.toMatchObject({ code: "E_VALIDATION" });
    expect(mocks.readdir).toHaveBeenCalledTimes(1);
  });

  it("fails when owner is not present in .agentplane/agents", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readdir.mockResolvedValue(["CODER.json", "TESTER.json"]);
    await expect(warnIfUnknownOwner(mkCtx(), "NOPE")).rejects.toMatchObject({
      code: "E_VALIDATION",
    });
    await expect(warnIfUnknownOwner(mkCtx(), "NOPE")).rejects.toThrow(
      "unknown task owner id: NOPE",
    );
  });

  it("passes when owner is present", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readdir.mockResolvedValue(["CODER.json"]);
    await expect(warnIfUnknownOwner(mkCtx(), "CODER")).resolves.toBeUndefined();
  });

  it("does not fail when agents dir is missing", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    mocks.fileExists.mockResolvedValue(false);
    mocks.readdir.mockResolvedValue(["CODER.json"]);
    await expect(warnIfUnknownOwner(mkCtx(), "NOPE")).resolves.toBeUndefined();
  });

  it("does not fail when there are no agent json files", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readdir.mockResolvedValue(["README.md"]);
    await expect(warnIfUnknownOwner(mkCtx(), "NOPE")).resolves.toBeUndefined();
  });
});
