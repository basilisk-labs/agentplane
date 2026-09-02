import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rename, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import * as stableFile from "../../shared/stable-file.js";
import { resolveExternalAgentExchangePaths } from "./external-agent-exchange.js";
import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";

describe("resolveExternalAgentExchangePaths", () => {
  it("reuses a preobserved common Git directory", async () => {
    const commonGitDir = path.resolve("/repo/.git");
    const fingerprint = `sha256:${"a".repeat(64)}`;

    const paths = await resolveExternalAgentExchangePaths({
      git_root: "/not-a-repository",
      common_git_dir: commonGitDir,
      task_id: "202608040001-EXCHAN",
      transition_id: "tr_0123456789abcdef0123456789abcdef",
      state_fingerprint: fingerprint,
    });

    expect(paths.directory).toBe(
      path.join(
        commonGitDir,
        "agentplane",
        "external-agent",
        "202608040001-EXCHAN",
        "tr_0123456789abcdef0123456789abcdef",
        "a".repeat(64),
      ),
    );
  });
});

describe("external exchange task artifact snapshot", () => {
  it.each(["regular", "symlink"])("rejects a %s replacement before reading", async (kind) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "exchange-artifacts-"));
    const taskId = "202608040001-EXCHAN";
    const directory = path.join(root, ".agentplane/tasks", taskId);
    const file = path.join(directory, "binary.dat");
    const bytes = Buffer.from([0, 255, 128, 10]);
    let spy;
    try {
      await mkdir(directory, { recursive: true });
      await writeFile(file, bytes);
      const baseline = await captureExternalTaskArtifacts(root, taskId);
      expect(baseline["binary.dat"]).toMatch(
        new RegExp(`^file:[0-9]+:${createHash("sha256").update(bytes).digest("hex")}$`, "u"),
      );
      const original = stableFile.readStableRegularFileNoFollow;
      spy = vi
        .spyOn(stableFile, "readStableRegularFileNoFollow")
        .mockImplementationOnce(async (target, label, opts) => {
          const moved = path.join(root, "original.dat");
          await rename(file, moved);
          if (kind === "symlink") await symlink(moved, file);
          else await writeFile(file, bytes);
          return original(target, label, opts);
        });
      await expect(captureExternalTaskArtifacts(root, taskId)).rejects.toThrow(
        /changed|non-regular/u,
      );
    } finally {
      spy?.mockRestore();
      await rm(root, { recursive: true, force: true });
    }
  });
});
