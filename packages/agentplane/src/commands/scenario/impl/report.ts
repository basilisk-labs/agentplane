import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import { atomicWriteFile } from "@agentplaneorg/core";

import { dedupeStrings } from "../../../shared/strings.js";

const execFileAsync = promisify(execFile);

const SCENARIO_REPORT_NAME = "report.json";

type ScenarioRunGitSummary = {
  diff_stat?: string;
  staged_stat?: string;
  status?: string[];
};

export type ScenarioRunReportStep = {
  step: number;
  tool: string;
  runtime: string;
  entrypoint: string;
  args: string[];
  env_keys: string[];
  exit_code: number;
  duration_ms: number;
};

type ScenarioRunReport = {
  schema_version: 1;
  recipe: string;
  scenario: string;
  run_id: string;
  started_at: string;
  ended_at: string;
  status: "success" | "failed";
  steps: ScenarioRunReportStep[];
  git?: ScenarioRunGitSummary;
};

const SENSITIVE_ARG_FLAGS = new Set([
  "--token",
  "--secret",
  "--password",
  "--api-key",
  "--apikey",
  "--access-key",
  "--client-secret",
  "--auth",
  "--authorization",
  "--bearer",
]);

export function redactArgs(args: string[]): string[] {
  const out = [...args];
  for (let i = 0; i < out.length; i++) {
    const arg = out[i];
    if (!arg) continue;
    const eqIndex = arg.indexOf("=");
    const flag = eqIndex === -1 ? arg : arg.slice(0, eqIndex);
    if (!SENSITIVE_ARG_FLAGS.has(flag)) continue;
    if (eqIndex !== -1) {
      out[i] = `${flag}=<redacted>`;
      continue;
    }
    out[i] = flag;
    if (i + 1 < out.length && !out[i + 1]?.startsWith("-")) {
      out[i + 1] = "<redacted>";
      i += 1;
    }
  }
  return out;
}

function isNotGitRepoError(err: unknown): boolean {
  if (err instanceof Error) {
    return err.message.startsWith("Not a git repository");
  }
  return false;
}

export async function getGitDiffSummary(cwd: string): Promise<ScenarioRunGitSummary | undefined> {
  try {
    const [diff, staged, status] = await Promise.all([
      execFileAsync("git", ["diff", "--stat"], { cwd }),
      execFileAsync("git", ["diff", "--stat", "--staged"], { cwd }),
      execFileAsync("git", ["status", "--porcelain"], { cwd }),
    ]);
    const diffStat = String(diff.stdout).trim();
    const stagedStat = String(staged.stdout).trim();
    const statusLines = String(status.stdout).trim();
    return {
      diff_stat: diffStat || undefined,
      staged_stat: stagedStat || undefined,
      status: statusLines
        ? statusLines
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
        : [],
    };
  } catch (err) {
    if (isNotGitRepoError(err)) return undefined;
    return undefined;
  }
}

export function collectScenarioEnvKeys(stepEnv: Record<string, string> | undefined): string[] {
  return dedupeStrings([
    ...Object.keys(stepEnv ?? {}),
    "AGENTPLANE_RUN_DIR",
    "AGENTPLANE_STEP_DIR",
    "AGENTPLANE_RECIPES_CACHE_DIR",
    "AGENTPLANE_RECIPE_ID",
    "AGENTPLANE_SCENARIO_ID",
    "AGENTPLANE_TOOL_ID",
  ]);
}

export async function writeScenarioReport(opts: {
  runDir: string;
  recipeId: string;
  scenarioId: string;
  runId: string;
  startedAt: string;
  status: "success" | "failed";
  steps: ScenarioRunReportStep[];
  gitSummary?: ScenarioRunGitSummary;
}): Promise<void> {
  const report: ScenarioRunReport = {
    schema_version: 1,
    recipe: opts.recipeId,
    scenario: opts.scenarioId,
    run_id: opts.runId,
    started_at: opts.startedAt,
    ended_at: new Date().toISOString(),
    status: opts.status,
    steps: opts.steps,
    git: opts.gitSummary,
  };
  await atomicWriteFile(
    path.join(opts.runDir, SCENARIO_REPORT_NAME),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
}
