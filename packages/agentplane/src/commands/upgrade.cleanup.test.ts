import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";
const describeWhenNotHook = process.env.AGENTPLANE_HOOK_MODE === "1" ? describe.skip : describe;

async function exists(absPath: string): Promise<boolean> {
  try {
    await access(absPath);
    return true;
  } catch {
    return false;
  }
}

describeWhenNotHook("upgrade cleanup behavior", () => {
  it("removes transient auto-upgrade artifacts and backups created during the run", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const agentsPath = path.join(root, "AGENTS.md");
    const agentsDir = path.join(root, ".agentplane", "agents");
    const coderPath = path.join(agentsDir, "CODER.json");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(agentsPath, "# Old policy\n", "utf8");
    await writeFile(
      coderPath,
      JSON.stringify({ id: "CODER", role: "old" }, null, 2) + "\n",
      "utf8",
    );

    const oldAgentRunDir = path.join(root, ".agentplane", ".upgrade", "agent", "old-run");
    await mkdir(oldAgentRunDir, { recursive: true });
    await writeFile(path.join(oldAgentRunDir, "plan.md"), "old", "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# New policy\n",
      ".agentplane/agents/CODER.json": JSON.stringify({ id: "CODER", role: "new" }, null, 2),
    });

    const code = await cmdUpgradeParsed({
      cwd: root,
      rootOverride: root,
      flags: {
        bundle: bundlePath,
        checksum: checksumPath,
        mode: "auto",
        remote: false,
        allowTarball: false,
        dryRun: false,
        backup: true,
        yes: true,
      },
    });
    expect(code).toBe(0);

    const agentDir = path.join(root, ".agentplane", ".upgrade", "agent");
    expect(await exists(agentDir)).toBe(false);

    const rootEntries = await readdir(root);
    expect(rootEntries.some((name) => name.startsWith("AGENTS.md.bak-"))).toBe(false);
    const agentEntries = await readdir(agentsDir);
    expect(agentEntries.some((name) => name.startsWith("CODER.json.bak-"))).toBe(false);

    const lastReviewPath = path.join(root, ".agentplane", ".upgrade", "last-review.json");
    expect(await exists(lastReviewPath)).toBe(true);
    const finalAgents = await readFile(agentsPath, "utf8");
    expect(finalAgents).toContain("# New policy");
  });
});
