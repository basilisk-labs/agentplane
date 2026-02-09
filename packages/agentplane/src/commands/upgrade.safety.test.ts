import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";

describe("upgrade safety invariants", () => {
  it("does not write .agentplane/tasks/** even if present in the upstream bundle", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, ".agentplane", "tasks"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "tasks", "keep.txt"), "local", "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      // Not managed: must be ignored.
      ".agentplane/tasks/evil.txt": "EVIL",
      // Managed override: makes it obvious upgrade did run.
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
    });

    const code = await cmdUpgradeParsed({
      cwd: root,
      rootOverride: root,
      flags: {
        bundle: bundlePath,
        checksum: checksumPath,
        dryRun: false,
        backup: false,
        yes: true,
      },
    });
    expect(code).toBe(0);

    // Ensure the user-owned tasks dir content was not replaced/augmented by the bundle.
    const tasksEntries = await readdir(path.join(root, ".agentplane", "tasks"));
    expect(tasksEntries).toContain("keep.txt");
    expect(tasksEntries).not.toContain("evil.txt");
    const keep = await readFile(path.join(root, ".agentplane", "tasks", "keep.txt"), "utf8");
    expect(keep).toBe("local");
  });
});
