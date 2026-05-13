import { findGitRoot, resolveProject } from "@agentplaneorg/core/project";

import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError, GitError } from "../../shared/errors.js";
import { loadEvaluatorCatalog, type EvaluatorModule } from "../../evaluators/catalog.js";
import {
  evaluatorSpec,
  type EvaluatorListParsed,
  type EvaluatorShowParsed,
} from "./evaluator.spec.js";

export { evaluatorListSpec, evaluatorShowSpec, evaluatorSpec } from "./evaluator.spec.js";

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
  return await loadEvaluatorCatalog({ projectRoot, includeBuiltin });
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
