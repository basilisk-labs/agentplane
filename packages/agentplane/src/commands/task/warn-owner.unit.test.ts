import { describe, expect, it, vi } from "vitest";

import { captureStdIO } from "../../cli/run-cli.test-helpers.js";
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
  it("warns when owner is not present in .agentplane/agents", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    const io = captureStdIO();
    try {
      mocks.fileExists.mockResolvedValue(true);
      mocks.readdir.mockResolvedValue(["CODER.json", "TESTER.json"]);

      await warnIfUnknownOwner(mkCtx(), "NOPE");
      expect(io.stderr).toContain("unknown task owner id: NOPE");
    } finally {
      io.restore();
    }
  });

  it("does not warn when owner is present", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    const io = captureStdIO();
    try {
      mocks.fileExists.mockResolvedValue(true);
      mocks.readdir.mockResolvedValue(["CODER.json"]);

      await warnIfUnknownOwner(mkCtx(), "CODER");
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("does not warn when agents dir is missing", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    const io = captureStdIO();
    try {
      mocks.fileExists.mockResolvedValue(false);
      mocks.readdir.mockResolvedValue(["CODER.json"]);

      await warnIfUnknownOwner(mkCtx(), "NOPE");
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("does not warn when there are no agent json files", async () => {
    const { warnIfUnknownOwner } = await import("./shared.js");
    const io = captureStdIO();
    try {
      mocks.fileExists.mockResolvedValue(true);
      mocks.readdir.mockResolvedValue(["README.md"]);

      await warnIfUnknownOwner(mkCtx(), "NOPE");
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });
});
