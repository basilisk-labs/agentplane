import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import { suggestOne } from "../cli/spec/suggest.js";
import {
  describeRuntimeMode,
  resolveRuntimeSourceInfo,
  type RuntimeSourceInfo,
} from "../shared/runtime-source.js";

export type RuntimeGroupParsed = { cmd: string[] };
export type RuntimeExplainParsed = { json: boolean };

export const runtimeSpec: CommandSpec<RuntimeGroupParsed> = {
  id: ["runtime"],
  group: "Diagnostics",
  summary: "Inspect which agentplane runtime/binary/package sources are active.",
  synopsis: ["agentplane runtime <explain> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [{ cmd: "agentplane runtime explain", why: "Show active runtime details." }],
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

export const runtimeExplainSpec: CommandSpec<RuntimeExplainParsed> = {
  id: ["runtime", "explain"],
  group: "Diagnostics",
  summary: "Explain the active binary, runtime mode, and resolved package roots.",
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable runtime details.",
    },
  ],
  examples: [
    { cmd: "agentplane runtime explain", why: "Show the active runtime as readable text." },
    {
      cmd: "agentplane runtime explain --json",
      why: "Show runtime details for scripts and diagnostics tooling.",
    },
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

function renderPath(value: string | null): string {
  return value ?? "unresolved";
}

export function renderRuntimeExplainText(report: RuntimeSourceInfo): string {
  const lines = [
    `Mode: ${report.mode} (${describeRuntimeMode(report.mode)})`,
    `Active binary: ${renderPath(report.activeBinaryPath)}`,
    `Current cwd: ${report.cwd}`,
    `Framework checkout: ${report.framework.inFrameworkCheckout ? "yes" : "no"}`,
    `Framework repo root: ${renderPath(report.frameworkSources.repoRoot)}`,
    `Framework agentplane root: ${renderPath(report.frameworkSources.agentplaneRoot)}`,
    `Framework core root: ${renderPath(report.frameworkSources.coreRoot)}`,
    `Resolved agentplane: ${report.agentplane.version ?? "unknown"} @ ${renderPath(report.agentplane.packageRoot)}`,
    `Resolved @agentplaneorg/core: ${report.core.version ?? "unknown"} @ ${renderPath(report.core.packageRoot)}`,
  ];
  if (report.handoffFromBinaryPath) {
    lines.push(`Handoff from: ${report.handoffFromBinaryPath}`);
  }
  return lines.join("\n");
}

export const runRuntime: CommandHandler<RuntimeGroupParsed> = (_ctx, p) => {
  const input = p.cmd.join(" ");
  const suggestion = suggestOne(input, ["explain"]);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const msg = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
  return Promise.reject(
    usageError({
      spec: runtimeSpec,
      command: "runtime",
      message: `${msg}${suffix}`,
      context: { command: "runtime" },
    }),
  );
};

export const runRuntimeExplain: CommandHandler<RuntimeExplainParsed> = (ctx, p) => {
  const report = resolveRuntimeSourceInfo({
    cwd: ctx.cwd,
    entryModuleUrl: import.meta.url,
  });
  if (p.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return Promise.resolve(0);
  }
  process.stdout.write(`${renderRuntimeExplainText(report)}\n`);
  return Promise.resolve(0);
};
