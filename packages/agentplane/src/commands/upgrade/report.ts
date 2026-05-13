import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { createCliEmitter } from "../../cli/output.js";
import type { FrameworkManifest, UpgradeReviewRecord } from "./types.js";
const output = createCliEmitter();

export function printUpgradeDryRun(opts: {
  additions: string[];
  updates: string[];
  removals: string[];
  skipped: string[];
  merged: string[];
}): void {
  output.line(
    `Upgrade dry-run: ${opts.additions.length} add, ${opts.updates.length} update, ${opts.removals.length} remove, ${opts.skipped.length} unchanged`,
  );
  for (const rel of opts.additions) output.line(`ADD ${rel}`);
  for (const rel of opts.updates) output.line(`UPDATE ${rel}`);
  for (const rel of opts.removals) output.line(`REMOVE ${rel}`);
  for (const rel of opts.skipped) output.line(`SKIP ${rel}`);
  for (const rel of opts.merged) output.line(`MERGE ${rel}`);
}

export async function writeUpgradeAgentReview(opts: {
  gitRoot: string;
  runRoot: string;
  manifest: FrameworkManifest;
  additions: string[];
  updates: string[];
  removals: string[];
  skipped: string[];
  merged: string[];
  reviewRecords: UpgradeReviewRecord[];
}): Promise<{ relRunDir: string }> {
  const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const runDir = path.join(opts.runRoot, runId);
  await mkdir(runDir, { recursive: true });

  const managedFiles = opts.manifest.files.map((f) => f.path.replaceAll("\\", "/").trim());
  const planMd =
    `# agentplane upgrade plan (${runId})\n\n` +
    `Mode: plan only (no files modified)\n\n` +
    `## Summary\n\n` +
    `- additions: ${opts.additions.length}\n` +
    `- updates: ${opts.updates.length}\n` +
    `- removals: ${opts.removals.length}\n` +
    `- unchanged: ${opts.skipped.length}\n` +
    `- merged (auto-safe transforms already applied to incoming): ${opts.merged.length}\n\n` +
    `## Managed files (manifest)\n\n` +
    managedFiles.map((p) => `- ${p}`).join("\n") +
    `\n\n` +
    `## Proposed changes\n\n` +
    opts.additions.map((p) => `- ADD ${p}`).join("\n") +
    (opts.additions.length > 0 ? "\n" : "") +
    opts.updates.map((p) => `- UPDATE ${p}`).join("\n") +
    (opts.updates.length > 0 ? "\n" : "") +
    opts.removals.map((p) => `- REMOVE ${p}`).join("\n") +
    (opts.removals.length > 0 ? "\n" : "") +
    opts.merged.map((p) => `- MERGE ${p}`).join("\n") +
    (opts.merged.length > 0 ? "\n" : "") +
    opts.skipped.map((p) => `- SKIP ${p}`).join("\n") +
    (opts.skipped.length > 0 ? "\n" : "") +
    `\n` +
    `## Next steps\n\n` +
    `1. Review the proposed changes list.\n` +
    `2. Apply changes manually or re-run without \`--agent\` to apply managed files.\n` +
    `3. Run \`agentplane doctor\` (or \`agentplane doctor --fix\`) and ensure checks pass.\n`;

  const constraintsMd =
    `# Upgrade constraints\n\n` +
    `This upgrade is restricted to framework-managed files only.\n\n` +
    `## Must not touch\n\n` +
    `- .agentplane/tasks/** (task data)\n` +
    `- .agentplane/tasks.json (export snapshot)\n` +
    `- .agentplane/backends/** (backend configuration)\n` +
    `- .agentplane/WORKFLOW.md (project workflow/config contract)\n` +
    `- .agentplane/config.json (legacy project config import)\n` +
    `- .git/**\n\n` +
    `## Notes\n\n` +
    `- The upgrade bundle is validated against framework.manifest.json.\n` +
    `- The policy gateway file at workspace root is AGENTS.md or CLAUDE.md.\n`;

  const reportMd =
    `# Upgrade report (${runId})\n\n` +
    `## Actions taken\n\n` +
    `- [ ] Reviewed plan.md\n` +
    `- [ ] Applied changes (manual or --auto)\n` +
    `- [ ] Ran doctor\n` +
    `- [ ] Ran tests / lint\n\n` +
    `## Notes\n\n` +
    `- \n`;

  await writeFile(path.join(runDir, "plan.md"), planMd, "utf8");
  await writeFile(path.join(runDir, "constraints.md"), constraintsMd, "utf8");
  await writeFile(path.join(runDir, "report.md"), reportMd, "utf8");
  await writeFile(
    path.join(runDir, "files.json"),
    JSON.stringify(
      {
        additions: opts.additions,
        updates: opts.updates,
        removals: opts.removals,
        skipped: opts.skipped,
        merged: opts.merged,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(runDir, "review.json"),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        counts: {
          total: opts.reviewRecords.length,
        },
        files: opts.reviewRecords,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  return { relRunDir: path.relative(opts.gitRoot, runDir) };
}
