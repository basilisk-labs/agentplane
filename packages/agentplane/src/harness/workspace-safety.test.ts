import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  resolveWorkspacePath,
  sanitizeWorkspaceKey,
  validateWorkspacePathInvariants,
} from "./workspace-safety.js";

describe("harness/workspace-safety", () => {
  it("sanitizes workspace keys", () => {
    expect(sanitizeWorkspaceKey("MT/123")).toBe("MT_123");
  });

  it("resolves workspace under root", () => {
    const p = resolveWorkspacePath("/tmp/root", "A/B");
    expect(p).toBe(path.resolve("/tmp/root", "A_B"));
  });

  it("rejects workspace equals root", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-ws-"));
    try {
      const result = await validateWorkspacePathInvariants({ root, workspacePath: root });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.code).toBe("WORKSPACE_EQUALS_ROOT");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });
});
