import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

const execFileAsync = promisify(execFile);

describe("logical repository authority identity", () => {
  it("survives long-lived branch changes and repository relocation", async () => {
    const parent = await mkdtemp(path.join(os.tmpdir(), "agentplane-repository-id-"));
    const original = path.join(parent, "before");
    const moved = path.join(parent, "after");
    try {
      await mkdir(original, { recursive: true });
      await execFileAsync("git", ["init", "-b", "main"], { cwd: original });
      await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: original });
      await execFileAsync("git", ["config", "user.email", "test@agentplane.local"], {
        cwd: original,
      });
      await writeFile(path.join(original, "README.md"), "main\n", "utf8");
      await execFileAsync("git", ["add", "README.md"], { cwd: original });
      await execFileAsync("git", ["commit", "-m", "main root"], { cwd: original });
      const first = await resolveLogicalRepositoryIdentity({ git_root: original, task: {} });

      await execFileAsync("git", ["switch", "-c", "typescript"], { cwd: original });
      await writeFile(path.join(original, "typescript.txt"), "migration\n", "utf8");
      await execFileAsync("git", ["add", "typescript.txt"], { cwd: original });
      await execFileAsync("git", ["commit", "-m", "typescript history"], { cwd: original });
      const onDevelopmentBranch = await resolveLogicalRepositoryIdentity({
        git_root: original,
        task: {},
      });

      await rename(original, moved);
      const afterRelocation = await resolveLogicalRepositoryIdentity({
        git_root: moved,
        task: {},
      });

      expect(onDevelopmentBranch).toBe(first);
      expect(afterRelocation).toBe(first);
    } finally {
      await rm(parent, { recursive: true, force: true });
    }
  });
});
