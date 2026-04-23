import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { materializeHookShimForWorktree } from "./work-start.hook-shim.js";

const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";

describe("worktree hook shim", () => {
  it("materializes a shim with the active installed runner before PATH fallback", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-"));
    const worktreePath = path.join(root, "worktree");
    const activeBin = path.join(root, "installed agentplane", "bin", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    await mkdir(path.dirname(activeBin), { recursive: true });
    await writeFile(activeBin, "process.exit(0);\n", "utf8");
    process.env[ACTIVE_BIN_ENV] = activeBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shim = await readFile(
      path.join(worktreePath, ".agentplane", "bin", "agentplane"),
      "utf8",
    );
    expect(shim).toContain("agentplane-hook-shim");
    expect(shim).toContain(`INSTALL_BIN='${activeBin}'`);
    expect(shim).toContain("AGENTPLANE_HOOK_RUNNER");
    expect(shim).toContain("AGENTPLANE_HOOK_ALLOW_NPX");
  });
});
