import { loadConfig, resolveProject } from "@agentplaneorg/core";

import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import { suggestOne } from "../cli/spec/suggest.js";
import {
  evaluateRepoCliVersionExpectation,
  type RepoCliVersionExpectation,
} from "../shared/repo-cli-version.js";
import {
  describeRuntimeMode,
  resolveRuntimeSourceInfo,
  type RuntimeSourceInfo,
} from "../shared/runtime-source.js";

export type FrameworkDevWorkflow = {
  available: boolean;
  rebuildCommands: string[];
  reinstallScript: string;
  verifyCommand: string;
  forceGlobalExample: string;
  recommendation: string | null;
};

export type RuntimeExplainPayload = RuntimeSourceInfo & {
  frameworkDev: FrameworkDevWorkflow;
  repoCliExpectation: RepoCliVersionExpectation;
};

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

export function buildFrameworkDevWorkflow(report: RuntimeSourceInfo): FrameworkDevWorkflow {
  const available = report.framework.inFrameworkCheckout;
  const reinstallScript = "scripts/reinstall-global-agentplane.sh";
  const rebuildCommands = [
    "bun run --filter=@agentplaneorg/core build",
    "bun run --filter=agentplane build",
  ];
  const verifyCommand = "agentplane runtime explain";
  const forceGlobalExample = "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane <command>";

  if (!available) {
    return {
      available,
      rebuildCommands,
      reinstallScript,
      verifyCommand,
      forceGlobalExample,
      recommendation: null,
    };
  }

  const recommendation =
    report.mode === "repo-local" || report.mode === "repo-local-handoff"
      ? "Rebuild local packages after source changes; use the reinstall helper only when you need the global PATH command updated from this checkout."
      : report.mode === "global-in-framework"
        ? "Reinstall or update the global agentplane CLI from this checkout so the wrapper can hand off to the repo-local binary."
        : report.mode === "global-forced-in-framework"
          ? "Unset AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 unless you intentionally need the global installed CLI inside the framework checkout."
          : "Use runtime explain after rebuild/reinstall to confirm which binary and package roots are active.";

  return {
    available,
    rebuildCommands,
    reinstallScript,
    verifyCommand,
    forceGlobalExample,
    recommendation,
  };
}

function buildRuntimeExplainPayload(report: RuntimeSourceInfo): RuntimeExplainPayload {
  return {
    ...report,
    frameworkDev: buildFrameworkDevWorkflow(report),
    repoCliExpectation: {
      expectedVersion: null,
      activeVersion: report.agentplane.version,
      state: "unconfigured",
      summary: null,
      recovery: null,
    },
  };
}

export function renderRuntimeExplainText(
  report: RuntimeSourceInfo,
  repoCliExpectation: RepoCliVersionExpectation,
): string {
  const frameworkDev = buildFrameworkDevWorkflow(report);
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
  if (repoCliExpectation.expectedVersion) {
    lines.push(`Repository expected agentplane CLI: ${repoCliExpectation.expectedVersion}`);
    if (repoCliExpectation.summary) {
      lines.push(`Repository CLI status: ${repoCliExpectation.summary}`);
    }
    if (repoCliExpectation.recovery) {
      lines.push(`Recovery: ${repoCliExpectation.recovery}`);
    }
  }
  if (report.handoffFromBinaryPath) {
    lines.push(`Handoff from: ${report.handoffFromBinaryPath}`);
  }
  if (frameworkDev.available) {
    lines.push(
      "",
      "Framework dev workflow:",
      "1. Rebuild local packages after source changes:",
      ...frameworkDev.rebuildCommands.map((command) => `   - ${command}`),
      "2. If the global PATH install should resolve this checkout:",
      `   - ${frameworkDev.reinstallScript}`,
      "3. Re-verify the active runtime:",
      `   - ${frameworkDev.verifyCommand}`,
      "4. Optional: force the global installed CLI inside this checkout:",
      `   - ${frameworkDev.forceGlobalExample}`,
    );
    if (frameworkDev.recommendation) {
      lines.push(`Recommendation: ${frameworkDev.recommendation}`);
    }
  }
  return lines.join("\n");
}

async function resolveRepoCliExpectation(opts: {
  cwd: string;
  rootOverride?: string | null;
  report: RuntimeSourceInfo;
}): Promise<RepoCliVersionExpectation> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    return evaluateRepoCliVersionExpectation(loaded.config, opts.report);
  } catch {
    return {
      expectedVersion: null,
      activeVersion: opts.report.agentplane.version,
      state: "unconfigured",
      summary: null,
      recovery: null,
    };
  }
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
  return resolveRepoCliExpectation({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    report,
  }).then((repoCliExpectation) => {
    const payload = { ...buildRuntimeExplainPayload(report), repoCliExpectation };
    if (p.json) {
      process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(`${renderRuntimeExplainText(report, repoCliExpectation)}\n`);
    return 0;
  });
};
