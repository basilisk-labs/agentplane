import { usageError } from "../../cli/spec/errors.js";
import type { CommandCtx, CommandSpec, OptionSpec, ParsedRaw } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

export type VerifyCommonParsed = {
  by: string;
  note: string;
  noteFile?: string;
  details?: string;
  file?: string;
  quiet: boolean;
  collectIncidents: boolean;
  observation?: string;
  impact?: string;
  resolution?: string;
  promote: boolean;
  external: boolean;
  localOnly: boolean;
  repoFixable: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
};

export type TaskVerifyParsed = VerifyCommonParsed & {
  taskId: string;
};

type VerifyRecordRunner = (opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note: string;
  noteFile?: string;
  details?: string;
  file?: string;
  collectIncidents: boolean;
  quiet: boolean;
  observation?: string;
  impact?: string;
  resolution?: string;
  promote: boolean;
  external: boolean;
  localOnly: boolean;
  repoFixable: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
}) => Promise<number>;

export const verifyFindingOptions: readonly OptionSpec[] = [
  {
    kind: "string",
    name: "observation",
    valueHint: "<text>",
    description: "Structured finding observation to append with the verification.",
  },
  {
    kind: "string",
    name: "impact",
    valueHint: "<text>",
    description: "Structured finding impact to append with the verification.",
  },
  {
    kind: "string",
    name: "resolution",
    valueHint: "<text>",
    description: "Structured finding resolution to append with the verification.",
  },
  {
    kind: "boolean",
    name: "promote",
    default: false,
    description: "Mark the structured finding as an incident candidate.",
  },
  {
    kind: "boolean",
    name: "external",
    default: false,
    description: "Mark the incident candidate as external-fixable.",
  },
  {
    kind: "boolean",
    name: "local-only",
    default: false,
    description:
      "Compatibility no-op. Findings are task-local unless --promote, --external, or --repo-fixable is set.",
  },
  {
    kind: "boolean",
    name: "repo-fixable",
    default: false,
    description: "Mark the structured finding as repo-fixable so incidents collect can promote it.",
  },
  {
    kind: "string",
    name: "incident-scope",
    valueHint: "<text>",
    description: "Optional incident scope for the appended finding.",
  },
  {
    kind: "string",
    name: "incident-tag",
    valueHint: "<tag>",
    repeatable: true,
    description: "Repeatable incident tag for the appended finding.",
  },
  {
    kind: "string",
    name: "incident-match",
    valueHint: "<term>",
    repeatable: true,
    description: "Repeatable incident match term for the appended finding.",
  },
  {
    kind: "string",
    name: "incident-advice",
    valueHint: "<text>",
    description: "Optional operator advice for the appended finding.",
  },
  {
    kind: "string",
    name: "incident-rule",
    valueHint: "<text>",
    description: "Optional incident rule for the appended finding.",
  },
] as const;

const verifyCommonOptions: readonly OptionSpec[] = [
  { kind: "string", name: "by", valueHint: "<id>", required: true, description: "Verifier id." },
  {
    kind: "string",
    name: "note",
    valueHint: "<text>",
    description: "Short verification note.",
  },
  {
    kind: "string",
    name: "note-file",
    valueHint: "<path>",
    description: "Read the verification note from a file path (mutually exclusive with --note).",
  },
  {
    kind: "string",
    name: "details",
    valueHint: "<text>",
    description: "Optional details text (mutually exclusive with --file).",
  },
  {
    kind: "string",
    name: "file",
    valueHint: "<path>",
    description: "Optional details file path (mutually exclusive with --details).",
  },
  {
    kind: "boolean",
    name: "quiet",
    default: false,
    description: "Suppress normal output (still prints errors).",
  },
  {
    kind: "boolean",
    name: "collect-incidents",
    default: false,
    description:
      "After recording verification, collect promotable findings into incidents.md immediately.",
  },
  ...verifyFindingOptions,
] as const;

export function validateVerifyDetailsFileExclusive<TParsed>(
  raw: ParsedRaw,
  spec: CommandSpec<TParsed>,
  opts?: { command?: string; message?: string },
): void {
  if (typeof raw.opts.details === "string" && typeof raw.opts.file === "string") {
    throw usageError({
      spec,
      command: opts?.command,
      message: opts?.message ?? "Options --details and --file are mutually exclusive.",
    });
  }
}

export function validateVerifyNonEmptyInput<TParsed>(
  raw: ParsedRaw,
  spec: CommandSpec<TParsed>,
  name: "by" | "note",
): void {
  const value = raw.opts[name];
  if (typeof value === "string" && value.trim().length === 0) {
    throw usageError({ spec, message: `Invalid value for --${name}: empty.` });
  }
}

export function validateVerifyNoteSource<TParsed>(
  raw: ParsedRaw,
  spec: CommandSpec<TParsed>,
  opts?: { command?: string },
): void {
  const inlineNote = raw.opts.note;
  const noteFile = raw.opts["note-file"];
  if (typeof inlineNote === "string" && typeof noteFile === "string") {
    throw usageError({
      spec,
      command: opts?.command,
      message: "Options --note and --note-file are mutually exclusive.",
    });
  }
  if (typeof noteFile === "string" && noteFile.trim().length === 0) {
    throw usageError({
      spec,
      command: opts?.command,
      message: "Invalid value for --note-file: empty.",
    });
  }
  if (typeof inlineNote === "string" && inlineNote.trim().length === 0) {
    throw usageError({
      spec,
      command: opts?.command,
      message: "Invalid value for --note: empty.",
    });
  }
  if (typeof inlineNote !== "string" && typeof noteFile !== "string") {
    throw usageError({
      spec,
      command: opts?.command,
      message: "Provide exactly one of --note or --note-file.",
    });
  }
}

export function validateVerifyFindingSource<TParsed>(
  raw: ParsedRaw,
  spec: CommandSpec<TParsed>,
  opts?: { command?: string },
): void {
  if (
    raw.opts["local-only"] === true &&
    (raw.opts.promote === true || raw.opts.external === true || raw.opts["repo-fixable"] === true)
  ) {
    throw usageError({
      spec,
      command: opts?.command,
      message: "--local-only cannot be combined with --promote, --external, or --repo-fixable.",
    });
  }
  if (raw.opts.external === true && raw.opts["repo-fixable"] === true) {
    throw usageError({
      spec,
      command: opts?.command,
      message: "--external and --repo-fixable are mutually exclusive.",
    });
  }

  const hasFindingField = [
    raw.opts.observation,
    raw.opts.impact,
    raw.opts.resolution,
    raw.opts["incident-scope"],
    raw.opts["incident-advice"],
    raw.opts["incident-rule"],
  ].some((value) => typeof value === "string" && value.trim().length > 0);
  const hasFindingCollections =
    Array.isArray(raw.opts["incident-tag"]) && raw.opts["incident-tag"].length > 0
      ? true
      : Array.isArray(raw.opts["incident-match"]) && raw.opts["incident-match"].length > 0;
  if (!hasFindingField && !hasFindingCollections) return;

  const observation = raw.opts.observation;
  const impact = raw.opts.impact;
  const resolution = raw.opts.resolution;
  if (
    typeof observation !== "string" ||
    observation.trim().length === 0 ||
    typeof impact !== "string" ||
    impact.trim().length === 0 ||
    typeof resolution !== "string" ||
    resolution.trim().length === 0
  ) {
    throw usageError({
      spec,
      command: opts?.command,
      message:
        "Provide --observation, --impact, and --resolution together when appending a structured finding.",
    });
  }
}

export function parseVerifyCommonOptions(raw: ParsedRaw): VerifyCommonParsed {
  const localOnly = raw.opts["local-only"] === true;
  const repoFixable = raw.opts["repo-fixable"] === true;
  const explicitExternal = raw.opts.external === true;
  const promote = !localOnly && (raw.opts.promote === true || explicitExternal || repoFixable);
  return {
    by: typeof raw.opts.by === "string" ? raw.opts.by : "",
    note: typeof raw.opts.note === "string" ? raw.opts.note : "",
    noteFile: typeof raw.opts["note-file"] === "string" ? raw.opts["note-file"] : undefined,
    details: typeof raw.opts.details === "string" ? raw.opts.details : undefined,
    file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
    quiet: raw.opts.quiet === true,
    collectIncidents: raw.opts["collect-incidents"] === true,
    observation: typeof raw.opts.observation === "string" ? raw.opts.observation : undefined,
    impact: typeof raw.opts.impact === "string" ? raw.opts.impact : undefined,
    resolution: typeof raw.opts.resolution === "string" ? raw.opts.resolution : undefined,
    promote,
    external: promote && !repoFixable,
    localOnly: !promote,
    repoFixable,
    incidentScope:
      typeof raw.opts["incident-scope"] === "string" ? raw.opts["incident-scope"] : undefined,
    incidentTags: (raw.opts["incident-tag"] as string[] | undefined) ?? [],
    incidentMatch: (raw.opts["incident-match"] as string[] | undefined) ?? [],
    incidentAdvice:
      typeof raw.opts["incident-advice"] === "string" ? raw.opts["incident-advice"] : undefined,
    incidentRule:
      typeof raw.opts["incident-rule"] === "string" ? raw.opts["incident-rule"] : undefined,
  };
}

export function createTaskVerifyCommandSpec(opts: {
  id: ["task", "verify", "ok"] | ["task", "verify", "rework"];
  summary: string;
  example: { cmd: string; why: string };
}): CommandSpec<TaskVerifyParsed> {
  const spec: CommandSpec<TaskVerifyParsed> = {
    id: opts.id,
    group: "Task",
    summary: opts.summary,
    args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
    options: verifyCommonOptions,
    examples: [opts.example],
    validateRaw: (raw) => {
      validateVerifyDetailsFileExclusive(raw, spec, {
        message: "Provide at most one of --details or --file.",
      });
      validateVerifyNonEmptyInput(raw, spec, "by");
      validateVerifyNoteSource(raw, spec);
      validateVerifyFindingSource(raw, spec);
    },
    parse: (raw) => ({
      taskId: String(raw.args["task-id"]),
      ...parseVerifyCommonOptions(raw),
    }),
  };
  return spec;
}

export function makeRunTaskVerifyHandler(opts: {
  commandName: string;
  getCtx: (cmd: string) => Promise<CommandContext>;
  run: VerifyRecordRunner;
}) {
  return async (ctx: CommandCtx, p: TaskVerifyParsed): Promise<number> => {
    return await opts.run({
      ctx: await opts.getCtx(opts.commandName),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      by: p.by,
      note: p.note,
      noteFile: p.noteFile,
      details: p.details,
      file: p.file,
      collectIncidents: p.collectIncidents,
      quiet: p.quiet,
      observation: p.observation,
      impact: p.impact,
      resolution: p.resolution,
      promote: p.promote,
      external: p.external,
      localOnly: p.localOnly,
      repoFixable: p.repoFixable,
      incidentScope: p.incidentScope,
      incidentTags: p.incidentTags,
      incidentMatch: p.incidentMatch,
      incidentAdvice: p.incidentAdvice,
      incidentRule: p.incidentRule,
    });
  };
}
