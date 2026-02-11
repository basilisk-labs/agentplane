import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";
const describeWhenNotHook = process.env.AGENTPLANE_HOOK_MODE === "1" ? describe.skip : describe;

describeWhenNotHook("upgrade agent-assisted mode", () => {
  it("writes an upgrade plan and does not modify managed files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const agentsMdPath = path.join(root, "AGENTS.md");
    const existingAgents =
      "# Existing\n\n<!-- AGENTPLANE:LOCAL-START -->\nLOCAL\n<!-- AGENTPLANE:LOCAL-END -->\n";
    await writeFile(agentsMdPath, existingAgents, "utf8");

    const incomingAgents =
      "# Incoming\n\n<!-- AGENTPLANE:LOCAL-START -->\n<!-- AGENTPLANE:LOCAL-END -->\n";
    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: "AGENTS.md",
              type: "markdown",
              merge_strategy: "agents_policy_markdown",
              required: true,
            },
          ],
        },
        null,
        2,
      ),
      "AGENTS.md": incomingAgents,
    });

    const code = await cmdUpgradeParsed({
      cwd: root,
      rootOverride: root,
      flags: {
        bundle: bundlePath,
        checksum: checksumPath,
        mode: "agent",
        remote: false,
        allowTarball: false,
        dryRun: false,
        backup: false,
        yes: true,
      },
    });
    expect(code).toBe(0);

    // Managed files remain unchanged in agent mode.
    expect(await readFile(agentsMdPath, "utf8")).toBe(existingAgents);

    // Plan artifacts are written under .agentplane/.upgrade/agent/<runId>/.
    const agentDir = path.join(root, ".agentplane", ".upgrade", "agent");
    await mkdir(agentDir, { recursive: true });
    const runNames = await readdir(agentDir);
    const runs = runNames.toSorted();
    expect(runs.length).toBeGreaterThan(0);
    const latest = runs.at(-1) ?? "";
    const planPath = path.join(agentDir, latest, "plan.md");
    const constraintsPath = path.join(agentDir, latest, "constraints.md");
    const filesJsonPath = path.join(agentDir, latest, "files.json");
    const reviewJsonPath = path.join(agentDir, latest, "review.json");
    expect(await readFile(planPath, "utf8")).toContain("agent-assisted");
    expect(await readFile(constraintsPath, "utf8")).toContain("Must not touch");
    expect(await readFile(filesJsonPath, "utf8")).toContain('"additions"');

    const review = JSON.parse(await readFile(reviewJsonPath, "utf8")) as {
      counts?: { total?: number; needsSemanticReview?: number };
      files?: { relPath?: string; needsSemanticReview?: boolean }[];
    };
    expect(review.counts?.total).toBe(1);
    expect(review.counts?.needsSemanticReview).toBe(1);
    expect(review.files?.[0]?.relPath).toBe("AGENTS.md");
    expect(review.files?.[0]?.needsSemanticReview).toBe(true);

    // Snapshots are written for files requiring semantic review.
    const proposedSnapshot = path.join(agentDir, latest, "snapshots", "proposed", "AGENTS.md");
    expect(await readFile(proposedSnapshot, "utf8")).toContain("# Incoming");
  }, 20_000);
});
