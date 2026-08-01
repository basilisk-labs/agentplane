import { findGitRoot, resolveProject } from "@agentplaneorg/core/project";

import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError, GitError } from "../../shared/errors.js";
import { loadEvaluatorCatalog, type EvaluatorModule } from "../../evaluators/catalog.js";
import type { EvaluatorListParsed, EvaluatorShowParsed } from "./evaluator.spec.js";

const output = createCliEmitter();

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

export async function loadEvaluatorCatalogForCommand(
  ctx: CommandCtx,
  includeBuiltin: boolean,
): Promise<EvaluatorModule[]> {
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

export type EvaluatorListResult = {
  evaluators: ReturnType<typeof evaluatorMetadata>[];
  rows: EvaluatorModule[];
};

export async function listEvaluators(
  ctx: CommandCtx,
  parsed: EvaluatorListParsed,
): Promise<EvaluatorListResult> {
  const rows = await loadEvaluatorCatalogForCommand(ctx, parsed.builtin);
  return { evaluators: rows.map((row) => evaluatorMetadata(row)), rows };
}

export const runEvaluatorList: CommandHandler<EvaluatorListParsed> = async (ctx, parsed) => {
  const result = await listEvaluators(ctx, parsed);
  if (parsed.json) {
    output.json({ evaluators: result.evaluators });
    return 0;
  }
  if (result.rows.length === 0) {
    output.line("No evaluator prompt modules found.");
    return 0;
  }
  output.line(formatEvaluatorList(result.rows));
  return 0;
};

export type EvaluatorShowResult = {
  evaluator: ReturnType<typeof evaluatorMetadata> & { content: string };
};

export async function showEvaluator(
  ctx: CommandCtx,
  parsed: EvaluatorShowParsed,
): Promise<EvaluatorShowResult> {
  const rows = await loadEvaluatorCatalogForCommand(ctx, parsed.builtin);
  const found = rows.find((row) => row.id === parsed.id);
  if (!found) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown evaluator id: ${parsed.id}`,
    });
  }
  return { evaluator: { ...evaluatorMetadata(found), content: found.content } };
}

export const runEvaluatorShow: CommandHandler<EvaluatorShowParsed> = async (ctx, parsed) => {
  const result = await showEvaluator(ctx, parsed);
  if (parsed.json) {
    output.json(result);
    return 0;
  }
  output.line(result.evaluator.content.replace(/\n$/u, ""));
  return 0;
};
