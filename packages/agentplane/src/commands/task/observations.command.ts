import path from "node:path";

import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { loadDirectSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import {
  appendTaskObservation,
  findBlockingObservationIssues,
  formatObservationCheckSummary,
  harvestTaskObservations,
  readTaskObservations,
  summarizeObservationHarvest,
  summarizeObservationTriage,
} from "./observations.js";
import {
  taskObservationsSpec,
  type TaskObservationsAddParsed,
  type TaskObservationsHarvestParsed,
  type TaskObservationsParsed,
  type TaskObservationsReadParsed,
} from "./observations.specs.js";

const output = createCliEmitter();

export {
  taskObservationsAddSpec,
  taskObservationsCheckSpec,
  taskObservationsHarvestSpec,
  taskObservationsListSpec,
  taskObservationsSpec,
  taskObservationsTriageSpec,
} from "./observations.specs.js";
export type {
  TaskObservationsAddParsed,
  TaskObservationsHarvestParsed,
  TaskObservationsParsed,
  TaskObservationsReadParsed,
} from "./observations.specs.js";

export async function runTaskObservations(
  _ctx: CommandCtx,
  p: TaskObservationsParsed,
): Promise<number> {
  throwGroupCommandUsage({
    spec: taskObservationsSpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: await loadDirectSubcommandNames(["task", "observations"]),
  });
}

async function resolveCtx(
  ctx: CommandCtx,
  getCtx: (cmd: string) => Promise<CommandContext>,
  cmd: string,
): Promise<CommandContext> {
  return (
    (await getCtx(cmd)) ??
    (await loadCommandContext({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null }))
  );
}

export function makeRunTaskObservationsAddHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: TaskObservationsAddParsed): Promise<number> => {
    const commandContext = await resolveCtx(ctx, getCtx, "task observations add");
    const result = await appendTaskObservation(commandContext, p);
    const relativePath = pathRelative(commandContext, result.artifactPath);
    if (p.json) {
      output.json({ path: relativePath, observation: result.observation });
    } else {
      output.success("observation appended", result.observation.id, relativePath);
    }
    return 0;
  };
}

function pathRelative(ctx: CommandContext, artifactPath: string): string {
  return path.relative(ctx.resolvedProject.gitRoot, artifactPath).replaceAll(path.sep, "/");
}

export function makeRunTaskObservationsListHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: TaskObservationsReadParsed): Promise<number> => {
    const commandContext = await resolveCtx(ctx, getCtx, "task observations list");
    const result = await readTaskObservations(commandContext, p.taskId);
    if (result.errors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: formatObservationCheckSummary({
          taskId: p.taskId,
          observations: result.observations,
          errors: result.errors,
          blocking: [],
        }),
      });
    }
    const observations = result.observations;
    if (p.json) {
      output.json({ path: pathRelative(commandContext, result.artifactPath), observations });
    } else if (observations.length === 0) {
      output.info(`${p.taskId}: no observations`);
    } else {
      output.lines(
        observations.map(
          (item) => `${item.id} [${item.status}] ${item.severity} ${item.kind}: ${item.summary}`,
        ),
      );
    }
    return 0;
  };
}

export function makeRunTaskObservationsCheckHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: TaskObservationsReadParsed): Promise<number> => {
    const commandContext = await resolveCtx(ctx, getCtx, "task observations check");
    const result = await readTaskObservations(commandContext, p.taskId);
    const blocking = findBlockingObservationIssues(result.observations);
    if (p.json) {
      output.json({
        task_id: p.taskId,
        path: pathRelative(commandContext, result.artifactPath),
        observations: result.observations.length,
        errors: result.errors,
        blocking,
        ok: result.errors.length === 0 && blocking.length === 0,
      });
    }
    if (result.errors.length > 0 || blocking.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: formatObservationCheckSummary({
          taskId: p.taskId,
          observations: result.observations,
          errors: result.errors,
          blocking,
        }),
      });
    }
    if (!p.json) {
      output.success("observations checked", p.taskId, `${result.observations.length} entries`);
    }
    return 0;
  };
}

export function makeRunTaskObservationsTriageHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: TaskObservationsReadParsed): Promise<number> => {
    const commandContext = await resolveCtx(ctx, getCtx, "task observations triage");
    const result = await readTaskObservations(commandContext, p.taskId);
    const blocking = findBlockingObservationIssues(result.observations);
    if (result.errors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: formatObservationCheckSummary({
          taskId: p.taskId,
          observations: result.observations,
          errors: result.errors,
          blocking,
        }),
      });
    }
    const summary = summarizeObservationTriage(result.observations);
    if (p.json) {
      output.json({
        task_id: p.taskId,
        path: pathRelative(commandContext, result.artifactPath),
        summary,
        blocking,
      });
    } else {
      output.report(
        Object.entries(summary).map(([action, value]) => ({
          label: action,
          value: `total=${value.total} open=${value.open} ids=${value.ids.join(",") || "-"}`,
        })),
        { header: `${p.taskId} observation triage` },
      );
      if (blocking.length > 0) {
        output.warn(`${blocking.length} blocking observations remain open`);
      }
    }
    return 0;
  };
}

export function makeRunTaskObservationsHarvestHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: TaskObservationsHarvestParsed): Promise<number> => {
    const commandContext = await resolveCtx(ctx, getCtx, "task observations harvest");
    const entries = await harvestTaskObservations(commandContext);
    const summary = summarizeObservationHarvest(entries);
    if (p.json) {
      output.json({
        summary,
        tasks: entries.map((entry) => ({
          task_id: entry.taskId,
          title: entry.taskTitle,
          path: pathRelative(commandContext, entry.artifactPath),
          observations: entry.observations,
          errors: entry.errors,
          blocking: entry.blocking,
        })),
      });
      return summary.invalid > 0 ? 3 : 0;
    }
    output.report(
      [
        { label: "tasks", value: String(summary.tasks) },
        { label: "observations", value: String(summary.observations) },
        { label: "open", value: String(summary.open) },
        { label: "invalid", value: String(summary.invalid) },
        { label: "blocking", value: String(summary.blocking) },
      ],
      { header: "task observation harvest" },
    );
    for (const [action, value] of Object.entries(summary.byAction).toSorted(([a], [b]) =>
      a.localeCompare(b),
    )) {
      output.info(`${action}: total=${value.total} open=${value.open}`);
    }
    if (entries.length === 0) output.info("no task observations found");
    return summary.invalid > 0 ? 3 : 0;
  };
}
