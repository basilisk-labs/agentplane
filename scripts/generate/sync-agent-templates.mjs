import path from "node:path";
import { compareDirectoryTrees, syncDirectoryTree } from "../lib/sync-artifacts.mjs";
import { defineScript, parseCheckSyncMode, runScriptMain } from "../lib/script-runtime.mjs";

const main = defineScript({
  name: "sync-agent-templates",
  run({ argv }) {
    const mode = parseCheckSyncMode(argv, "scripts/sync-agent-templates.mjs");

    const repoRoot = process.cwd();
    const canonicalAgentsDir = path.join(repoRoot, "packages", "agentplane", "assets", "agents");
    const targetAgentsDir = path.join(repoRoot, ".agentplane", "agents");
    const canonicalPolicyDir = path.join(repoRoot, "packages", "agentplane", "assets", "policy");
    const targetPolicyDir = path.join(repoRoot, ".agentplane", "policy");
    const agentDiff = compareDirectoryTrees(canonicalAgentsDir, targetAgentsDir, {
      include: (fileName) => fileName.endsWith(".json"),
    });
    const policyDiff = compareDirectoryTrees(canonicalPolicyDir, targetPolicyDir, {
      recursive: true,
    });

    if (mode === "check") {
      if (
        agentDiff.missingInTarget.length > 0 ||
        agentDiff.extraInTarget.length > 0 ||
        agentDiff.changed.length > 0 ||
        policyDiff.missingInTarget.length > 0 ||
        policyDiff.extraInTarget.length > 0 ||
        policyDiff.changed.length > 0
      ) {
        const lines = [
          "agent templates are out of sync.",
          `Canonical agents: ${path.relative(repoRoot, canonicalAgentsDir)}`,
          `Target agents:    ${path.relative(repoRoot, targetAgentsDir)}`,
          `Canonical policy: ${path.relative(repoRoot, canonicalPolicyDir)}`,
          `Target policy:    ${path.relative(repoRoot, targetPolicyDir)}`,
        ];
        if (agentDiff.missingInTarget.length > 0) {
          lines.push(`Agents missing in target: ${agentDiff.missingInTarget.join(", ")}`);
        }
        if (agentDiff.extraInTarget.length > 0) {
          lines.push(`Agents extra in target: ${agentDiff.extraInTarget.join(", ")}`);
        }
        if (agentDiff.changed.length > 0) {
          lines.push(`Agents changed: ${agentDiff.changed.join(", ")}`);
        }
        if (policyDiff.missingInTarget.length > 0) {
          lines.push(`Policy missing in target: ${policyDiff.missingInTarget.join(", ")}`);
        }
        if (policyDiff.extraInTarget.length > 0) {
          lines.push(`Policy extra in target: ${policyDiff.extraInTarget.join(", ")}`);
        }
        if (policyDiff.changed.length > 0) {
          lines.push(`Policy changed: ${policyDiff.changed.join(", ")}`);
        }
        lines.push("Run: bun run agents:sync");
        throw new Error(lines.join("\n"));
      }
      process.stdout.write("agents templates OK\n");
      return;
    }

    syncDirectoryTree(canonicalAgentsDir, targetAgentsDir, agentDiff.canonicalFiles);
    syncDirectoryTree(canonicalPolicyDir, targetPolicyDir, policyDiff.canonicalFiles);
    process.stdout.write(
      `synced ${path.relative(repoRoot, canonicalAgentsDir)} -> ${path.relative(repoRoot, targetAgentsDir)}\n`,
    );
    process.stdout.write(
      `synced ${path.relative(repoRoot, canonicalPolicyDir)} -> ${path.relative(repoRoot, targetPolicyDir)}\n`,
    );
  },
});

runScriptMain(main);
