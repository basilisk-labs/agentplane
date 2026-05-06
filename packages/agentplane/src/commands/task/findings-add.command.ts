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
  fixability: "external" | "repo-fixable" | null;
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
  summary: "Append a structured task-local Findings/Notes block; use --promote for incidents.",
  synopsis: [
    "agentplane task findings add <task-id> --observation <text> --impact <text> --resolution <text> [--promote] [--external|--repo-fixable] [--incident-scope <text>] [--incident-tag <tag>] [--incident-match <term>] [--incident-advice <text>] [--incident-rule <text>] [--updated-by <id>]",
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
      default: false,
      description: "Mark this structured finding as an incident candidate.",
    },
    {
      kind: "boolean",
      name: "external",
      default: false,
      description: "Mark the incident candidate as external-fixable.",
    },
    {
      kind: "boolean",
      name: "repo-fixable",
      default: false,
      description:
        "Mark the structured finding as repo-fixable so it can promote into incidents.md.",
    },
    {
      kind: "boolean",
      name: "local-only",
      default: false,
      description:
        "Compatibility no-op. Structured findings are task-local unless --promote, --external, or --repo-fixable is set.",
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
      cmd: 'agentplane task findings add 202602030608-F1Q8AB --observation "GitHub API EOF retries were manual." --impact "Operators repeated the reconcile loop." --resolution "Switch the retry path to REST polling." --promote --external --incident-scope "GitHub PR reconciliation" --incident-tag workflow --incident-tag github',
      why: "Append a deliberate promotable external incident candidate.",
    },
    {
      cmd: 'agentplane task findings add 202602030608-F1Q8AB --observation "One manual follow-up remains." --impact "Task notes should stay local." --resolution "Track it in Findings only."',
      why: "Keep an observation task-local without feeding incidents collection.",
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
      (raw.opts.promote === true || raw.opts.external === true || raw.opts["repo-fixable"] === true)
    ) {
      throw usageError({
        spec: taskFindingsAddSpec,
        message: "--local-only cannot be combined with --promote, --external, or --repo-fixable.",
      });
    }
    if (raw.opts.external === true && raw.opts["repo-fixable"] === true) {
      throw usageError({
        spec: taskFindingsAddSpec,
        message: "--external and --repo-fixable are mutually exclusive.",
      });
    }
  },
  parse: (raw) => {
    const localOnly = raw.opts["local-only"] === true;
    const repoFixable = raw.opts["repo-fixable"] === true;
    const explicitExternal = raw.opts.external === true;
    const promote = !localOnly && (raw.opts.promote === true || explicitExternal || repoFixable);
    const fixability = promote ? (repoFixable ? "repo-fixable" : "external") : null;
    return {
      taskId: String(raw.args["task-id"]),
      observation: String(raw.opts.observation),
      impact: String(raw.opts.impact),
      resolution: String(raw.opts.resolution),
      promote,
      external: promote && !repoFixable,
      fixability,
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
      fixability: p.fixability === "repo-fixable" ? "repo-fixable" : null,
      incidentScope: p.incidentScope,
      incidentTags: p.incidentTags,
      incidentMatch: p.incidentMatch,
      incidentAdvice: p.incidentAdvice,
      incidentRule: p.incidentRule,
      updatedBy: p.updatedBy,
    });
  };
}
