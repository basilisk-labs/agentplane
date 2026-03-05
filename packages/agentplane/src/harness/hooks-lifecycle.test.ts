import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { runLifecycleHook, runLifecycleHooks } from "./hooks-lifecycle.js";

describe("harness/hooks-lifecycle", () => {
  it("runs successful hook", async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-hook-"));
    try {
      const result = await runLifecycleHook({
        hook: "before_run",
        cwd: dir,
        policy: { command: "echo ok", timeoutMs: 1000, blocking: true },
      });
      expect(result.ok).toBe(true);
      expect(result.output).toContain("ok");
    } finally {
      await fs.rm(dir, { recursive: true, force: true });
    }
  });

  it("stops pipeline on blocking hook failure", async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-hook-"));
    try {
      const out = await runLifecycleHooks({
        cwd: dir,
        order: ["before_run", "after_run"],
        hooks: {
          before_run: { command: "exit 9", timeoutMs: 1000, blocking: true },
          after_run: { command: "echo later", timeoutMs: 1000, blocking: true },
        },
      });
      expect(out.ok).toBe(false);
      expect(out.results).toHaveLength(1);
      expect(out.results[0]?.exitCode).toBe(9);
    } finally {
      await fs.rm(dir, { recursive: true, force: true });
    }
  });
});
