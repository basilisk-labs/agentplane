import { resolveProject } from "@agentplaneorg/core/project";

import type { CommandHandler } from "../cli/spec/spec.js";
import type { DoctorLegacyParsed } from "./doctor-legacy.spec.js";
import { COMPATIBILITY_RETIREMENT_MANIFEST } from "./doctor/legacy-manifest.js";
import { inspectLegacyCompatibilityUsage } from "./doctor/legacy-probes.js";

export const runDoctorLegacy: CommandHandler<DoctorLegacyParsed> = async (ctx, parsed) => {
  const project = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const report = await inspectLegacyCompatibilityUsage({
    repoRoot: project.gitRoot,
    manifest: COMPATIBILITY_RETIREMENT_MANIFEST,
  });
  if (parsed.json || ctx.outputMode === "json") {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return 0;
  }
  process.stdout.write(
    `Compatibility adapters: total=${report.summary.total} used=${report.summary.used} ` +
      `unused=${report.summary.unused} unknown=${report.summary.unknown} ` +
      `blocked=${report.summary.blocked}\n`,
  );
  for (const adapter of report.adapters) {
    const retirement = adapter.remove_in ?? `blocked: ${adapter.removal_blocker}`;
    process.stdout.write(
      `${adapter.status.toUpperCase()} ${adapter.id} remove_in=${retirement}\n` +
        `  probe=${adapter.usage_probe.kind} evidence=${adapter.evidence.join("; ")}\n` +
        `  migrate=${adapter.migration_command}\n`,
    );
  }
  return 0;
};
