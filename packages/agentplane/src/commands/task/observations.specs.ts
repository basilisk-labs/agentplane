import type {
  TaskObservationAction,
  TaskObservationKind,
  TaskObservationPhase,
  TaskObservationSeverity,
  TaskObservationStatus,
} from "@agentplaneorg/core/tasks";

import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

import { observationEnumValues } from "./observations.js";

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

export type TaskObservationsAddParsed = {
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

export type TaskObservationsReadParsed = {
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

export const taskObservationsCheckSpec: CommandSpec<TaskObservationsReadParsed> = {
  id: ["task", "observations", "check"],
  group: "Task",
  summary: "Validate observations.jsonl.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

export const taskObservationsTriageSpec: CommandSpec<TaskObservationsReadParsed> = {
  id: ["task", "observations", "triage"],
  group: "Task",
  summary: "Summarize observation actions.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

export type TaskObservationsHarvestParsed = {
  json: boolean;
};

export const taskObservationsHarvestSpec: CommandSpec<TaskObservationsHarvestParsed> = {
  id: ["task", "observations", "harvest"],
  group: "Task",
  summary: "Harvest structured observations across all tasks.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ json: raw.opts.json === true }),
};
