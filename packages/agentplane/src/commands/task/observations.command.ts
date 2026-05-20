import type {
  TaskObservationAction,
  TaskObservationKind,
  TaskObservationPhase,
  TaskObservationSeverity,
  TaskObservationStatus,
} from "@agentplaneorg/core/tasks";
import path from "node:path";

import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { loadDirectSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import {
  appendTaskObservation,
  findBlockingObservationIssues,
  formatObservationCheckSummary,
  harvestTaskObservations,
  observationEnumValues,
  readTaskObservations,
  summarizeObservationHarvest,
  summarizeObservationTriage,
} from "./observations.js";

const output = createCliEmitter();

export type TaskObservationsParsed = {
  subcommand?: string;
};

export const taskObservationsSpec: CommandSpec<TaskObservationsParsed> = {
  id: ["task", "observations"],
  group: "Task",
  summary: "Structured task-local observations journal commands.",
  args: [{ name: "subcommand", required: false, valueHint: "<add|list|check|triage|harvest>" }],
  parse: (raw) => ({
    subcommand: typeof raw.args.subcommand === "string" ? raw.args.subcommand : undefined,
  }),
};

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

type TaskObservationsAddParsed = {
  taskId: string;
  kind: TaskObservationKind;
  summary: string;
  author: string;
  phase: TaskObservationPhase;
  severity: TaskObservationSeverity;
  decision?: string;
  impact?: string;
  action: TaskObservationAction;
  actionTitle?: string;
  actionDetails?: string;
  evidenceFiles: string[];
  evidenceCommands: string[];
  refs: string[];
  tags: string[];
  status: TaskObservationStatus;
  json: boolean;
};

function enumList(values: readonly string[]): string {
  return values.join("|");
}

function parseEnum<T extends string>(
  spec: CommandSpec<unknown>,
  name: string,
  value: unknown,
  values: readonly T[],
): T {
  if (typeof value !== "string" || !values.includes(value as T)) {
    throw usageError({
      spec,
      message: `Invalid --${name}; expected one of: ${enumList(values)}.`,
    });
  }
  return value as T;
}

function parseOptionalString(raw: unknown): string | undefined {
  return typeof raw === "string" ? raw : undefined;
}

export const taskObservationsAddSpec: CommandSpec<TaskObservationsAddParsed> = {
  id: ["task", "observations", "add"],
  group: "Task",
  summary: "Append one structured task observation to observations.jsonl.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "kind", valueHint: "<kind>", description: "Observation kind." },
    { kind: "string", name: "summary", valueHint: "<text>", description: "Short summary." },
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      default: "AGENT",
      description: "Author.",
    },
    {
      kind: "string",
      name: "phase",
      valueHint: "<phase>",
      default: "implementation",
      description: "Phase.",
    },
    {
      kind: "string",
      name: "severity",
      valueHint: "<level>",
      default: "medium",
      description: "Severity.",
    },
    { kind: "string", name: "decision", valueHint: "<text>", description: "Decision made." },
    { kind: "string", name: "impact", valueHint: "<text>", description: "Why it matters." },
    {
      kind: "string",
      name: "action",
      valueHint: "<type>",
      default: "none",
      description: "Action.",
    },
    { kind: "string", name: "action-title", valueHint: "<text>", description: "Title." },
    { kind: "string", name: "action-details", valueHint: "<text>", description: "Details." },
    {
      kind: "string",
      name: "evidence-file",
      valueHint: "<path>",
      repeatable: true,
      description: "Evidence file.",
    },
    {
      kind: "string",
      name: "evidence-command",
      valueHint: "<command>",
      repeatable: true,
      description: "Evidence command.",
    },
    {
      kind: "string",
      name: "ref",
      valueHint: "<ref>",
      repeatable: true,
      description: "Reference.",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Tag.",
    },
    {
      kind: "string",
      name: "status",
      valueHint: "<status>",
      default: "open",
      description: "Status.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  validateRaw: (raw) => {
    const kind = raw.opts.kind;
    const summary = raw.opts.summary;
    if (typeof kind !== "string" || kind.trim() === "") {
      throw usageError({
        spec: taskObservationsAddSpec,
        message: "Missing required option: --kind.",
      });
    }
    if (typeof summary !== "string" || summary.trim() === "") {
      throw usageError({
        spec: taskObservationsAddSpec,
        message: "Missing required option: --summary.",
      });
    }
  },
  parse: (raw) => {
    const enums = observationEnumValues();
    return {
      taskId: String(raw.args["task-id"]),
      kind: parseEnum(taskObservationsAddSpec, "kind", raw.opts.kind, enums.kinds),
      summary: String(raw.opts.summary),
      author: parseOptionalString(raw.opts.author) ?? "AGENT",
      phase: parseEnum(taskObservationsAddSpec, "phase", raw.opts.phase, enums.phases),
      severity: parseEnum(taskObservationsAddSpec, "severity", raw.opts.severity, enums.severities),
      decision: parseOptionalString(raw.opts.decision),
      impact: parseOptionalString(raw.opts.impact),
      action: parseEnum(taskObservationsAddSpec, "action", raw.opts.action, enums.actions),
      actionTitle: parseOptionalString(raw.opts["action-title"]),
      actionDetails: parseOptionalString(raw.opts["action-details"]),
      evidenceFiles: (raw.opts["evidence-file"] as string[] | undefined) ?? [],
      evidenceCommands: (raw.opts["evidence-command"] as string[] | undefined) ?? [],
      refs: (raw.opts.ref as string[] | undefined) ?? [],
      tags: (raw.opts.tag as string[] | undefined) ?? [],
      status: parseEnum(taskObservationsAddSpec, "status", raw.opts.status, enums.statuses),
      json: raw.opts.json === true,
    };
  },
};

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

type TaskObservationsReadParsed = {
  taskId: string;
  json: boolean;
};

export const taskObservationsListSpec: CommandSpec<TaskObservationsReadParsed> = {
  id: ["task", "observations", "list"],
  group: "Task",
  summary: "List structured task observations.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

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

export const taskObservationsCheckSpec: CommandSpec<TaskObservationsReadParsed> = {
  id: ["task", "observations", "check"],
  group: "Task",
  summary: "Validate observations.jsonl.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

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

export const taskObservationsTriageSpec: CommandSpec<TaskObservationsReadParsed> = {
  id: ["task", "observations", "triage"],
  group: "Task",
  summary: "Summarize observation actions.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

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

type TaskObservationsHarvestParsed = {
  json: boolean;
};

export const taskObservationsHarvestSpec: CommandSpec<TaskObservationsHarvestParsed> = {
  id: ["task", "observations", "harvest"],
  group: "Task",
  summary: "Harvest structured observations across all tasks.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

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
