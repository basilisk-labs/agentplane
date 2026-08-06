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
  process.stdout.write(
    `Retirement policies: remove=${report.retirement_summary.scheduled_removal} ` +
      `support=${report.retirement_summary.support_window} ` +
      `zero_usage=${report.retirement_summary.zero_usage_window} ` +
      `archive=${report.retirement_summary.archive_conversion} ` +
      `permanent_reader=${report.retirement_summary.permanent_historical_reader}\n`,
  );
  for (const adapter of report.adapters) {
    const retirement =
      adapter.remove_in ??
      adapter.retirement_policy.support_until ??
      (adapter.retirement_policy.kind === "permanent_historical_reader"
        ? "permanent"
        : adapter.retirement_policy.kind === "zero_usage_window"
          ? `after_${adapter.retirement_policy.minimum_zero_usage_releases}_zero_usage_releases`
          : adapter.retirement_policy.kind === "archive_conversion"
            ? "after_archive_conversion"
            : `blocked: ${adapter.removal_blocker}`);
    process.stdout.write(
      `${adapter.status.toUpperCase()} ${adapter.id} retirement=${retirement}\n` +
        `  policy=${adapter.retirement_policy.kind} scope=${adapter.retirement_policy.compatibility_scope}` +
        ` support_until=${adapter.retirement_policy.support_until ?? "none"}` +
        ` zero_usage_releases=${adapter.retirement_policy.minimum_zero_usage_releases ?? "none"}\n` +
        `  archive_conversion=${adapter.retirement_policy.archive_conversion ?? "none"}\n` +
        `  probe=${adapter.usage_probe.kind} evidence=${adapter.evidence.join("; ")}\n` +
        `  migrate=${adapter.migration_command}\n`,
    );
  }
  return 0;
};
