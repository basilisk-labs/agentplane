import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";

const execFileAsync = promisify(execFile);

describe("upgrade merge behavior", () => {
  it("replaces managed files with incoming content; skips config overwrite", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    // Existing local config should not be overwritten by upgrade bundle.
    const configPath = path.join(root, ".agentplane", "config.json");
    const originalConfig = await readFile(configPath, "utf8");

    // Existing AGENTS.md with local-only edits.
    const agentsPath = path.join(root, "AGENTS.md");
    await writeFile(agentsPath, ["# Policy", "", "LOCAL: keep this line"].join("\n"), "utf8");

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
      lastReview.files?.some((f) => f.relPath === "AGENTS.md" && f.needsSemanticReview === false),
    ).toBe(true);
    expect(
      lastReview.files?.some(
        (f) => f.relPath === ".agentplane/agents/CODER.json" && f.needsSemanticReview === false,
      ),
    ).toBe(true);

    const mergedAgents = await readFile(agentsPath, "utf8");
    expect(mergedAgents).toBe(incomingAgents);

    const mergedCoder = JSON.parse(await readFile(path.join(agentsDir, "CODER.json"), "utf8")) as {
      workflow?: string[];
      role?: string;
      local_only?: boolean;
    };
    expect(mergedCoder.role).toBe("Coder v2");
    expect(mergedCoder.workflow).toEqual(["upstream-step", "new-step"]);
    expect(mergedCoder.local_only).toBeUndefined();

    const finalConfig = await readFile(configPath, "utf8");
    // config.json should not be overwritten by the bundle; it may be updated by upgrade itself
    // (e.g. framework.last_update), so assert structure is preserved and no bundle-only fields appear.
    expect(finalConfig).not.toContain('"ignored"');
    const parsedOriginal = JSON.parse(originalConfig) as Record<string, unknown>;
    const parsedFinal = JSON.parse(finalConfig) as Record<string, unknown>;
    expect(parsedFinal.schema_version).toBe(parsedOriginal.schema_version);
    expect(parsedFinal.paths).toEqual(parsedOriginal.paths);

    const { stdout: commitBodyOut } = await execFileAsync("git", ["log", "-1", "--pretty=%B"], {
      cwd: root,
    });
    const commitBody = String(commitBodyOut ?? "");
    expect(commitBody).toContain("upgrade: apply framework");
    expect(commitBody).toContain("Upgrade-Version:");
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

  it("updates directly when current equals baseline (no local edits)", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const baselineDir = path.join(root, ".agentplane", ".upgrade", "baseline");
    await mkdir(baselineDir, { recursive: true });
    const baselineAgents = "# Installed baseline\n";
    await writeFile(path.join(baselineDir, "AGENTS.md"), baselineAgents, "utf8");

    const agentsPath = path.join(root, "AGENTS.md");
    await writeFile(agentsPath, baselineAgents, "utf8");
    const incomingAgents = "# New upstream\n";

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
    expect(await readFile(agentsPath, "utf8")).toBe(incomingAgents);

    const lastReviewPath = path.join(root, ".agentplane", ".upgrade", "last-review.json");
    const lastReview = JSON.parse(await readFile(lastReviewPath, "utf8")) as {
      files?: {
        relPath?: string;
        changedCurrentVsBaseline?: boolean | null;
        needsSemanticReview?: boolean;
        mergeApplied?: boolean;
      }[];
    };
    const agentsReview = lastReview.files?.find((f) => f.relPath === "AGENTS.md");
    expect(agentsReview?.changedCurrentVsBaseline).toBe(false);
    expect(agentsReview?.needsSemanticReview).toBe(false);
    expect(agentsReview?.mergeApplied).toBe(false);
  });

  it("appends incoming incidents policy when local incidents file is non-empty", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const incidentsPath = path.join(root, ".agentplane", "policy", "incidents.md");
    await mkdir(path.dirname(incidentsPath), { recursive: true });
    await writeFile(
      incidentsPath,
      ["# Policy Incidents Log", "", "## Entries", "", "- id: INC-20260306-01"].join("\n"),
      "utf8",
    );

    const incomingIncidents = [
      "# Policy Incidents Log",
      "",
      "## Entry contract",
      "",
      "- Add entries append-only.",
      "",
      "## Entries",
      "",
      "- None yet.",
      "",
    ].join("\n");
    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: ".agentplane/policy/incidents.md",
              source_path: "policy/incidents.md",
              type: "markdown",
              merge_strategy: "agents_policy_markdown",
              required: true,
            },
          ],
        },
        null,
        2,
      ),
      "policy/incidents.md": incomingIncidents,
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

    const finalIncidents = await readFile(incidentsPath, "utf8");
    expect(finalIncidents).toContain("INC-20260306-01");
    expect(finalIncidents).toContain("AGENTPLANE:UPGRADE-APPEND incidents.md");
    expect(finalIncidents).toContain("## Entry contract");

    const lastReviewPath = path.join(root, ".agentplane", ".upgrade", "last-review.json");
    const lastReview = JSON.parse(await readFile(lastReviewPath, "utf8")) as {
      files?: {
        relPath?: string;
        needsSemanticReview?: boolean;
        mergeApplied?: boolean;
        mergePath?: string;
      }[];
    };
    const incidentsReview = lastReview.files?.find(
      (f) => f.relPath === ".agentplane/policy/incidents.md",
    );
    expect(incidentsReview?.needsSemanticReview).toBe(false);
    expect(incidentsReview?.mergeApplied).toBe(true);
    expect(incidentsReview?.mergePath).toBe("incidentsAppend");
  });

  it("does not append incidents when local incidents file equals baseline template", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const baselineIncidents = [
      "# Policy Incidents Log",
      "",
      "## Entry template",
      "",
      "- id: `INC-YYYYMMDD-NN`",
      "",
      "## Entries",
      "",
      "- None yet.",
      "",
    ].join("\n");
    const baselinePath = path.join(
      root,
      ".agentplane",
      ".upgrade",
      "baseline",
      "policy",
      "incidents.md",
    );
    await mkdir(path.dirname(baselinePath), { recursive: true });
    await writeFile(baselinePath, baselineIncidents, "utf8");

    const incidentsPath = path.join(root, ".agentplane", "policy", "incidents.md");
    await mkdir(path.dirname(incidentsPath), { recursive: true });
    await writeFile(incidentsPath, baselineIncidents, "utf8");

    const incomingIncidents = [
      "# Policy Incidents Log",
      "",
      "## Entry contract",
      "",
      "- Add entries append-only.",
      "",
      "## Entries",
      "",
      "- None yet.",
      "",
    ].join("\n");
    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: ".agentplane/policy/incidents.md",
              source_path: "policy/incidents.md",
              type: "markdown",
              merge_strategy: "agents_policy_markdown",
              required: true,
            },
          ],
        },
        null,
        2,
      ),
      "policy/incidents.md": incomingIncidents,
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

    const finalIncidents = await readFile(incidentsPath, "utf8");
    expect(finalIncidents).toBe(incomingIncidents);
    expect(finalIncidents).not.toContain("AGENTPLANE:UPGRADE-APPEND incidents.md");
  });

  it("accepts managed policy files from manifest and writes them", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const incomingWorkflow = "# Workflow Policy\n\nUpdated from bundle.\n";
    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: ".agentplane/policy/workflow.md",
              source_path: "policy/workflow.md",
              type: "markdown",
              merge_strategy: "agents_policy_markdown",
              required: true,
            },
          ],
        },
        null,
        2,
      ),
      "policy/workflow.md": incomingWorkflow,
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

    const workflowPath = path.join(root, ".agentplane", "policy", "workflow.md");
    expect(await readFile(workflowPath, "utf8")).toBe(incomingWorkflow);
  });

  it("accepts managed policy script files from manifest and writes them", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const incomingScript = 'process.stdout.write("policy routing OK\\n");\n';
    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: ".agentplane/policy/check-routing.mjs",
              source_path: "policy/check-routing.mjs",
              type: "text",
              merge_strategy: "agents_policy_markdown",
              required: true,
            },
          ],
        },
        null,
        2,
      ),
      "policy/check-routing.mjs": incomingScript,
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

    const scriptPath = path.join(root, ".agentplane", "policy", "check-routing.mjs");
    expect(await readFile(scriptPath, "utf8")).toBe(incomingScript);
  });
});
