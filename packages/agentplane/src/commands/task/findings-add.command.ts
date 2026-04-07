import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskFindingsAdd } from "./findings.js";

export type TaskFindingsAddParsed = {
  taskId: string;
  observation: string;
  impact: string;
  resolution: string;
  promote: boolean;
  external: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  updatedBy?: string;
};

export const taskFindingsAddSpec: CommandSpec<TaskFindingsAddParsed> = {
  id: ["task", "findings", "add"],
  group: "Task",
  summary:
    "Append a structured Findings/Notes block; incident promotion is default unless --local-only.",
  synopsis: [
    "agentplane task findings add <task-id> --observation <text> --impact <text> --resolution <text> [--local-only] [--incident-scope <text>] [--incident-tag <tag>] [--incident-match <term>] [--incident-advice <text>] [--incident-rule <text>] [--updated-by <id>]",
  ],
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "observation",
      valueHint: "<text>",
      description: "Required. Observation field.",
    },
    { kind: "string", name: "impact", valueHint: "<text>", description: "Required. Impact field." },
    {
      kind: "string",
      name: "resolution",
      valueHint: "<text>",
      description: "Required. Resolution field.",
    },
    {
      kind: "boolean",
      name: "promote",
      description: "Compatibility flag. Promotion is the default unless `--local-only` is set.",
    },
    {
      kind: "boolean",
      name: "external",
      description:
        "Compatibility flag. External incident metadata is the default unless `--local-only` is set.",
    },
    {
      kind: "boolean",
      name: "local-only",
      default: false,
      description:
        "Keep the entry task-local only; omit `Promotion: incident-candidate` and `Fixability: external`.",
    },
    {
      kind: "string",
      name: "incident-scope",
      valueHint: "<text>",
      description: "Optional. IncidentScope override.",
    },
    {
      kind: "string",
      name: "incident-tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Repeatable. IncidentTags entry.",
    },
    {
      kind: "string",
      name: "incident-match",
      valueHint: "<term>",
      repeatable: true,
      description: "Repeatable. IncidentMatch entry.",
    },
    {
      kind: "string",
      name: "incident-advice",
      valueHint: "<text>",
      description: "Optional. IncidentAdvice field.",
    },
    {
      kind: "string",
      name: "incident-rule",
      valueHint: "<text>",
      description: "Optional. IncidentRule field.",
    },
    {
      kind: "string",
      name: "updated-by",
      valueHint: "<id>",
      description: "Optional. Override doc_updated_by metadata (must be non-empty).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task findings add 202602030608-F1Q8AB --observation "GitHub API EOF retries were manual." --impact "Operators repeated the reconcile loop." --resolution "Switch the retry path to REST polling." --incident-scope "GitHub PR reconciliation" --incident-tag workflow --incident-tag github',
      why: "Append a promotable external incident candidate without hand-editing the README or remembering hidden flags.",
    },
    {
      cmd: 'agentplane task findings add 202602030608-F1Q8AB --observation "One manual follow-up remains." --impact "Task notes should stay local." --resolution "Track it in Findings only." --local-only',
      why: "Keep an observation task-local when it should not feed incidents collection.",
    },
  ],
  validateRaw: (raw) => {
    for (const key of ["observation", "impact", "resolution"] as const) {
      const value = raw.opts[key];
      if (typeof value !== "string" || value.trim() === "") {
        throw usageError({
          spec: taskFindingsAddSpec,
          message: `Missing required option: --${key}.`,
        });
      }
    }
    const updatedBy = raw.opts["updated-by"];
    if (typeof updatedBy === "string" && updatedBy.trim() === "") {
      throw usageError({ spec: taskFindingsAddSpec, message: "--updated-by must be non-empty." });
    }
    if (
      raw.opts["local-only"] === true &&
      (raw.opts.promote === true || raw.opts.external === true)
    ) {
      throw usageError({
        spec: taskFindingsAddSpec,
        message: "--local-only cannot be combined with --promote or --external.",
      });
    }
  },
  parse: (raw) => {
    const localOnly = raw.opts["local-only"] === true;
    return {
      taskId: String(raw.args["task-id"]),
      observation: String(raw.opts.observation),
      impact: String(raw.opts.impact),
      resolution: String(raw.opts.resolution),
      promote: !localOnly,
      external: !localOnly,
      incidentScope:
        typeof raw.opts["incident-scope"] === "string" ? raw.opts["incident-scope"] : undefined,
      incidentTags: (raw.opts["incident-tag"] as string[] | undefined) ?? [],
      incidentMatch: (raw.opts["incident-match"] as string[] | undefined) ?? [],
      incidentAdvice:
        typeof raw.opts["incident-advice"] === "string" ? raw.opts["incident-advice"] : undefined,
      incidentRule:
        typeof raw.opts["incident-rule"] === "string" ? raw.opts["incident-rule"] : undefined,
      updatedBy: typeof raw.opts["updated-by"] === "string" ? raw.opts["updated-by"] : undefined,
    };
  },
};

export function makeRunTaskFindingsAddHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskFindingsAddParsed): Promise<number> => {
    return await cmdTaskFindingsAdd({
      ctx: await getCtx("task findings add"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      observation: p.observation,
      impact: p.impact,
      resolution: p.resolution,
      promote: p.promote,
      external: p.external,
      incidentScope: p.incidentScope,
      incidentTags: p.incidentTags,
      incidentMatch: p.incidentMatch,
      incidentAdvice: p.incidentAdvice,
      incidentRule: p.incidentRule,
      updatedBy: p.updatedBy,
    });
  };
}
