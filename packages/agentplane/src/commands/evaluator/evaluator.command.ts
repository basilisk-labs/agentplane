import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { findGitRoot, resolveProject } from "@agentplaneorg/core/project";

import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError, GitError } from "../../shared/errors.js";
import { loadEvaluatorCatalog, type EvaluatorModule } from "../../evaluators/catalog.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { gitRevParse } from "../shared/git-ops.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import {
  evaluatorRunSpec,
  evaluatorSpec,
  type EvaluatorListParsed,
  type EvaluatorRunParsed,
  type EvaluatorShowParsed,
} from "./evaluator.spec.js";

export {
  evaluatorListSpec,
  evaluatorRunSpec,
  evaluatorShowSpec,
  evaluatorSpec,
} from "./evaluator.spec.js";

const QUALITY_REPORT_FILE = "quality-report.json";
const EVALUATOR_PROMPT_FILE = "evaluator-prompt.md";
const EVALUATOR_OPINION_FILE = "evaluator-opinion.md";

export async function runEvaluatorGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  return throwGroupCommandUsage({
    spec: evaluatorSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["evaluator"]),
    command: "evaluator",
    contextCommand: "evaluator",
  });
}

function evaluatorMetadata(row: EvaluatorModule) {
  return {
    id: row.id,
    title: row.title,
    version: row.version,
    status: row.status,
    profile: row.profile,
    tags: row.tags,
    source: row.source,
    path: row.path,
    result_contract: row.result_contract,
  };
}

function formatEvaluatorList(rows: EvaluatorModule[]): string {
  const widthId = Math.max(...rows.map((row) => row.id.length), "ID".length);
  const widthStatus = Math.max(...rows.map((row) => row.status.length), "STATUS".length);
  const widthSource = Math.max(...rows.map((row) => row.source.length), "SOURCE".length);
  return [
    `${"ID".padEnd(widthId)}  ${"STATUS".padEnd(widthStatus)}  ${"SOURCE".padEnd(widthSource)}  PROFILE    TITLE`,
    `${"-".repeat(widthId)}  ${"-".repeat(widthStatus)}  ${"-".repeat(widthSource)}  -------    -----`,
    ...rows.map(
      (row) =>
        `${row.id.padEnd(widthId)}  ${row.status.padEnd(widthStatus)}  ${row.source.padEnd(widthSource)}  ${row.profile.padEnd(7)}    ${row.title}`,
    ),
  ].join("\n");
}

async function loadCatalogForCommand(ctx: CommandCtx, includeBuiltin: boolean) {
  let projectRoot: string | null = null;
  try {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    projectRoot = resolved.gitRoot;
  } catch (err) {
    if (ctx.rootOverride) {
      const message = err instanceof Error ? err.message : String(err);
      throw new GitError({
        message,
        context: { command: "evaluator", root: ctx.rootOverride },
      });
    }
    projectRoot = await findGitRoot(ctx.cwd);
  }
  if (!projectRoot && !includeBuiltin) {
    throw new GitError({
      message:
        "No AgentPlane project root found for project-local evaluator catalog lookup. Run from a repository checkout or pass --root <path>.",
      context: { command: "evaluator", root: ctx.rootOverride ?? null },
    });
  }
  return await loadEvaluatorCatalog({ projectRoot, includeBuiltin });
}

function safePathSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9._-]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .slice(0, 80);
}

function renderEvaluatorPrompt(opts: {
  evaluator: EvaluatorModule;
  taskId: string;
  taskReadmePath: string;
  reportPath: string;
}): string {
  return [
    "# AgentPlane EVALUATOR quality review",
    "",
    "Use the evaluator module below as binding review procedure.",
    "Do not edit implementation files. Inspect task scope, diff, verification evidence, and residual risk.",
    "Write the final structured review to the report path as JSON matching the requested report shape.",
    "",
    `- task_id: ${opts.taskId}`,
    `- task_readme: ${opts.taskReadmePath}`,
    `- report_path: ${opts.reportPath}`,
    "",
    "Required report fields:",
    "- verdict: pass | rework | blocked | human_review",
    "- summary: concise judgement",
    "- findings: non-empty list for pass/rework/blocked",
    "- evidence_refs: concrete files, checks, PRs, traces, or reports inspected",
    "- missing_tests: tests or checks that should exist but do not",
    "- hidden_assumptions: assumptions the implementation relies on",
    "- residual_risks: known remaining risks",
    "",
    "## Evaluator module",
    "",
    opts.evaluator.content.trim(),
    "",
  ].join("\n");
}

function renderOpinionMarkdown(report: EvaluatorQualityReport): string {
  return [
    `# EVALUATOR opinion: ${report.verdict}`,
    "",
    report.summary,
    "",
    "## Findings",
    ...report.findings.map((finding) => `- ${finding}`),
    "",
    "## Evidence",
    ...report.evidence_refs.map((ref) => `- ${ref}`),
    "",
    "## Missing Tests",
    ...(report.missing_tests.length > 0
      ? report.missing_tests.map((row) => `- ${row}`)
      : ["- none recorded"]),
    "",
    "## Hidden Assumptions",
    ...(report.hidden_assumptions.length > 0
      ? report.hidden_assumptions.map((row) => `- ${row}`)
      : ["- none recorded"]),
    "",
    "## Residual Risks",
    ...(report.residual_risks.length > 0
      ? report.residual_risks.map((row) => `- ${row}`)
      : ["- none recorded"]),
    "",
  ].join("\n");
}

type EvaluatorQualityReport = {
  schema_version: 1;
  task_id: string;
  evaluator_id: string;
  evaluator_profile: string;
  generated_at: string;
  verdict: EvaluatorRunParsed["verdict"];
  summary: string;
  evaluated_sha: string | null;
  blueprint_digest: string | null;
  findings: string[];
  evidence_refs: string[];
  missing_tests: string[];
  hidden_assumptions: string[];
  residual_risks: string[];
};

function assertRunnableReviewInput(parsed: EvaluatorRunParsed): void {
  if (!parsed.summary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide --summary for evaluator run.",
    });
  }
  if (parsed.verdict === "pass" && parsed.findings.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "EVALUATOR pass requires at least one --finding.",
    });
  }
  if (parsed.record && parsed.evidenceRefs.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Recording quality_review requires at least one --evidence reference.",
    });
  }
}

export const runEvaluatorList: CommandHandler<EvaluatorListParsed> = async (ctx, p) => {
  const rows = await loadCatalogForCommand(ctx, p.builtin);
  if (p.json) {
    process.stdout.write(
      `${JSON.stringify({ evaluators: rows.map((row) => evaluatorMetadata(row)) }, null, 2)}\n`,
    );
    return 0;
  }
  if (rows.length === 0) {
    process.stdout.write("No evaluator prompt modules found.\n");
    return 0;
  }
  process.stdout.write(`${formatEvaluatorList(rows)}\n`);
  return 0;
};

export const runEvaluatorShow: CommandHandler<EvaluatorShowParsed> = async (ctx, p) => {
  const rows = await loadCatalogForCommand(ctx, p.builtin);
  const found = rows.find((row) => row.id === p.id);
  if (!found) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown evaluator id: ${p.id}`,
    });
  }
  if (p.json) {
    process.stdout.write(
      `${JSON.stringify({ evaluator: { ...evaluatorMetadata(found), content: found.content } }, null, 2)}\n`,
    );
    return 0;
  }
  process.stdout.write(found.content.endsWith("\n") ? found.content : `${found.content}\n`);
  return 0;
};

export const runEvaluatorRun: CommandHandler<EvaluatorRunParsed> = async (ctx, p) => {
  assertRunnableReviewInput(p);
  const rows = await loadCatalogForCommand(ctx, true);
  const evaluator = rows.find((row) => row.id === p.evaluator);
  if (!evaluator) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown evaluator id: ${p.evaluator}`,
    });
  }

  const command = await loadCommandContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
  });
  const task = await loadTaskFromContext({ ctx: command, taskId: p.taskId });
  const gitRoot = command.resolvedProject.gitRoot;
  if (p.record) {
    const staged = await command.git.statusStagedPaths();
    const unstaged = await command.git.statusUnstagedTrackedPaths();
    if (staged.length > 0 || unstaged.length > 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: [
          "Recording EVALUATOR quality_review requires a clean tracked working tree.",
          `task=${p.taskId}`,
          `staged=${staged.length}`,
          `unstaged=${unstaged.length}`,
          "Commit or revert tracked changes first, then rerun evaluator run.",
          "Use --no-record only for artifact-generation smoke checks.",
        ].join("\n"),
      });
    }
  }
  const taskReadmePath = path.join(
    gitRoot,
    command.config.paths.workflow_dir,
    p.taskId,
    "README.md",
  );
  const at = new Date().toISOString();
  const stamp = at.replaceAll(/[-:.]/g, "").replace("T", "-").replace("Z", "");
  const reviewDir = path.join(
    gitRoot,
    command.config.paths.workflow_dir,
    p.taskId,
    "quality",
    `${stamp}-${safePathSegment(evaluator.id) || "evaluator"}`,
  );
  await mkdir(reviewDir, { recursive: true });

  const evaluatedSha = await gitRevParse(gitRoot, ["HEAD"]).catch(() => null);
  const snapshot = await checkTaskBlueprintSnapshotDrift({ ctx: command, task }).catch(() => null);
  const reportPath = path.join(reviewDir, QUALITY_REPORT_FILE);
  const promptPath = path.join(reviewDir, EVALUATOR_PROMPT_FILE);
  const opinionPath = path.join(reviewDir, EVALUATOR_OPINION_FILE);
  const rel = (absPath: string) => path.relative(gitRoot, absPath).replaceAll("\\", "/");
  const report: EvaluatorQualityReport = {
    schema_version: 1,
    task_id: p.taskId,
    evaluator_id: evaluator.id,
    evaluator_profile: evaluator.profile,
    generated_at: at,
    verdict: p.verdict,
    summary: p.summary,
    evaluated_sha: evaluatedSha,
    blueprint_digest: snapshot?.current.digest ?? null,
    findings: p.findings,
    evidence_refs: [...new Set([rel(taskReadmePath), ...p.evidenceRefs])],
    missing_tests: p.missingTests,
    hidden_assumptions: p.hiddenAssumptions,
    residual_risks: p.residualRisks,
  };

  await writeFile(
    promptPath,
    renderEvaluatorPrompt({
      evaluator,
      taskId: p.taskId,
      taskReadmePath: rel(taskReadmePath),
      reportPath: rel(reportPath),
    }),
    "utf8",
  );
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(opinionPath, renderOpinionMarkdown(report), "utf8");

  const evidenceRefs = [
    rel(taskReadmePath),
    rel(reportPath),
    rel(promptPath),
    rel(opinionPath),
    ...(snapshot?.path
      ? [path.isAbsolute(snapshot.path) ? rel(snapshot.path) : snapshot.path]
      : []),
    ...p.evidenceRefs,
  ];
  if (p.record) {
    await applyTaskMutation({
      ctx: command,
      taskId: p.taskId,
      policyAction: "task_verify",
      phase: "verify",
      build: () => ({
        intents: setTaskFieldsIntent({
          quality_review: {
            state: p.verdict,
            updated_at: at,
            updated_by: "EVALUATOR",
            note: p.summary,
            evaluated_sha: evaluatedSha,
            blueprint_digest: snapshot?.current.digest ?? null,
            evidence_refs: [...new Set(evidenceRefs)],
            findings: p.findings,
          },
        }),
      }),
    });
  }

  const payload = {
    task_id: p.taskId,
    evaluator_id: evaluator.id,
    verdict: p.verdict,
    recorded: p.record,
    report_path: rel(reportPath),
    prompt_path: rel(promptPath),
    opinion_path: rel(opinionPath),
  };
  if (p.json) {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  } else {
    process.stdout.write(
      [
        `evaluator run ${p.taskId}`,
        `verdict: ${p.verdict}`,
        `recorded: ${String(p.record)}`,
        `report: ${payload.report_path}`,
        `prompt: ${payload.prompt_path}`,
        `opinion: ${payload.opinion_path}`,
      ].join("\n") + "\n",
    );
  }
  return 0;
};
