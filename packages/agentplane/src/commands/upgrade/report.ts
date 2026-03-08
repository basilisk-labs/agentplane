import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { FrameworkManifest, UpgradeReviewRecord } from "./types.js";

export function printUpgradeDryRun(opts: {
  additions: string[];
  updates: string[];
  skipped: string[];
  merged: string[];
}): void {
  process.stdout.write(
    `Upgrade dry-run: ${opts.additions.length} add, ${opts.updates.length} update, ${opts.skipped.length} unchanged\n`,
  );
  for (const rel of opts.additions) process.stdout.write(`ADD ${rel}\n`);
  for (const rel of opts.updates) process.stdout.write(`UPDATE ${rel}\n`);
  for (const rel of opts.skipped) process.stdout.write(`SKIP ${rel}\n`);
  for (const rel of opts.merged) process.stdout.write(`MERGE ${rel}\n`);
}

export async function writeUpgradeAgentReview(opts: {
  gitRoot: string;
  runRoot: string;
  manifest: FrameworkManifest;
  additions: string[];
  updates: string[];
  skipped: string[];
  merged: string[];
  reviewRecords: UpgradeReviewRecord[];
}): Promise<{ relRunDir: string; needsReviewCount: number }> {
  const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const runDir = path.join(opts.runRoot, runId);
  await mkdir(runDir, { recursive: true });

  const managedFiles = opts.manifest.files.map((f) => f.path.replaceAll("\\", "/").trim());
  const needsReviewCount = opts.reviewRecords.filter((r) => r.needsSemanticReview).length;
  const planMd =
    `# agentplane upgrade plan (${runId})\n\n` +
    `Mode: agent-assisted review (no files modified)\n\n` +
    `## Summary\n\n` +
    `- additions: ${opts.additions.length}\n` +
    `- updates: ${opts.updates.length}\n` +
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
    `- .agentplane/config.json (project config)\n` +
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
          needsSemanticReview: needsReviewCount,
        },
        files: opts.reviewRecords,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  return { relRunDir: path.relative(opts.gitRoot, runDir), needsReviewCount };
}
