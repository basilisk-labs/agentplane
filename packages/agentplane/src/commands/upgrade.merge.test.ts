import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";

describe("upgrade merge behavior", () => {
  it("merges AGENTS.md local overrides and merges agent JSON; skips config overwrite", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    // Existing local config should not be overwritten by upgrade bundle.
    const configPath = path.join(root, ".agentplane", "config.json");
    const originalConfig = await readFile(configPath, "utf8");

    // Seed a baseline file set to enable three-way agent JSON merges.
    const baselineDir = path.join(root, ".agentplane", ".upgrade", "baseline");
    await mkdir(path.join(baselineDir, "agents"), { recursive: true });
    await writeFile(
      path.join(baselineDir, "agents", "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Coder", workflow: ["upstream-step"] }, null, 2) + "\n",
      "utf8",
    );

    // Existing AGENTS.md with local override markers.
    const agentsPath = path.join(root, "AGENTS.md");
    await writeFile(
      agentsPath,
      [
        "# Policy",
        "",
        "## Local Overrides (preserved across upgrades)",
        "",
        "<!-- AGENTPLANE:LOCAL-START -->",
        "LOCAL: keep this line",
        "<!-- AGENTPLANE:LOCAL-END -->",
        "",
      ].join("\n"),
      "utf8",
    );

    // Existing agent with user customization.
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify(
        {
          id: "CODER",
          role: "Coder",
          workflow: ["upstream-step", "local-step"],
          local_only: true,
        },
        null,
        2,
      ) + "\n",
      "utf8",
    );

    const incomingAgents = [
      "# New Policy",
      "",
      "## Local Overrides (preserved across upgrades)",
      "",
      "<!-- AGENTPLANE:LOCAL-START -->",
      "<!-- AGENTPLANE:LOCAL-END -->",
      "",
      "## Something Else",
      "",
      "Upstream content.",
      "",
    ].join("\n");
    const incomingCoder = JSON.stringify(
      { id: "CODER", role: "Coder v2", workflow: ["upstream-step", "new-step"] },
      null,
      2,
    );

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": incomingAgents,
      ".agentplane/agents/CODER.json": incomingCoder,
      ".agentplane/config.json": JSON.stringify({ ignored: true }, null, 2),
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
        backup: false,
        yes: true,
      },
    });
    expect(code).toBe(0);

    const lastReviewPath = path.join(root, ".agentplane", ".upgrade", "last-review.json");
    const lastReview = JSON.parse(await readFile(lastReviewPath, "utf8")) as {
      files?: { relPath?: string; needsSemanticReview?: boolean }[];
    };
    expect(
      lastReview.files?.some((f) => f.relPath === "AGENTS.md" && f.needsSemanticReview === true),
    ).toBe(true);
    expect(
      lastReview.files?.some(
        (f) => f.relPath === ".agentplane/agents/CODER.json" && f.needsSemanticReview === true,
      ),
    ).toBe(true);

    const mergedAgents = await readFile(agentsPath, "utf8");
    expect(mergedAgents).toContain("# New Policy");
    expect(mergedAgents).toContain("LOCAL: keep this line");

    const mergedCoder = JSON.parse(await readFile(path.join(agentsDir, "CODER.json"), "utf8")) as {
      workflow?: string[];
      role?: string;
      local_only?: boolean;
    };
    expect(mergedCoder.role).toBe("Coder v2");
    expect(mergedCoder.workflow).toEqual(["upstream-step", "new-step", "local-step"]);
    expect(mergedCoder.local_only).toBe(true);

    const finalConfig = await readFile(configPath, "utf8");
    // config.json should not be overwritten by the bundle; it may be updated by upgrade itself
    // (e.g. framework.last_update), so assert structure is preserved and no bundle-only fields appear.
    expect(finalConfig).not.toContain('"ignored"');
    const parsedOriginal = JSON.parse(originalConfig) as Record<string, unknown>;
    const parsedFinal = JSON.parse(finalConfig) as Record<string, unknown>;
    expect(parsedFinal.schema_version).toBe(parsedOriginal.schema_version);
    expect(parsedFinal.paths).toEqual(parsedOriginal.paths);
  });

  it("does not require semantic review when baseline differs but current equals incoming", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const baselineDir = path.join(root, ".agentplane", ".upgrade", "baseline");
    await mkdir(baselineDir, { recursive: true });
    await writeFile(path.join(baselineDir, "AGENTS.md"), "# Baseline\n", "utf8");

    const agentsPath = path.join(root, "AGENTS.md");
    const incomingAgents = "# Incoming\n";
    await writeFile(agentsPath, incomingAgents, "utf8");

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
        mode: "auto",
        remote: false,
        allowTarball: false,
        dryRun: false,
        backup: false,
        yes: true,
      },
    });
    expect(code).toBe(0);

    const lastReviewPath = path.join(root, ".agentplane", ".upgrade", "last-review.json");
    const lastReview = JSON.parse(await readFile(lastReviewPath, "utf8")) as {
      files?: {
        relPath?: string;
        currentDiffersFromIncoming?: boolean;
        needsSemanticReview?: boolean;
      }[];
    };
    const agentsReview = lastReview.files?.find((f) => f.relPath === "AGENTS.md");
    expect(agentsReview?.currentDiffersFromIncoming).toBe(false);
    expect(agentsReview?.needsSemanticReview).toBe(false);
  });
});
