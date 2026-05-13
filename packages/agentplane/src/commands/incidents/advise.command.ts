import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter } from "../../cli/output.js";
import { usageError } from "../../cli/spec/errors.js";
import {
  buildIncidentAdviceQueryFromTask,
  renderIncidentAdvice,
  resolveIncidentAdviceMatches,
} from "../../runtime/incidents/index.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { adviseTaskIncidents, loadIncidentRegistry } from "./shared.js";

type IncidentsAdviseParsed = {
  taskId: string | null;
  scope: string | null;
  title: string | null;
  description: string | null;
  tags: string[];
  limit: number;
  json: boolean;
};

const output = createCliEmitter();

export const incidentsAdviseSpec: CommandSpec<IncidentsAdviseParsed> = {
  id: ["incidents", "advise"],
  group: "Policy",
  summary: "Resolve bounded incident advice candidates for a task or ad hoc scope/tag query.",
  args: [{ name: "task-id", required: false, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "scope",
      valueHint: "<text>",
      description: "Ad hoc scope text when querying without a task id.",
    },
    {
      kind: "string",
      name: "title",
      valueHint: "<text>",
      description: "Optional title text for ad hoc advice lookup.",
    },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      description: "Optional description text for ad hoc advice lookup.",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Matching tag for ad hoc advice lookup; repeat as needed.",
    },
    {
      kind: "string",
      name: "limit",
      valueHint: "<n>",
      default: "5",
      coerce: (raw) => Number.parseInt(raw, 10),
      description: "Maximum number of advice entries to show.",
    },
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable advice matches.",
    },
  ],
  validateRaw: (raw) => {
    const taskId = typeof raw.args["task-id"] === "string" ? raw.args["task-id"].trim() : "";
    const scope = typeof raw.opts.scope === "string" ? raw.opts.scope.trim() : "";
    const title = typeof raw.opts.title === "string" ? raw.opts.title.trim() : "";
    const description = typeof raw.opts.description === "string" ? raw.opts.description.trim() : "";
    const tags = Array.isArray(raw.opts.tag) ? raw.opts.tag : [];
    if (!taskId && !scope && !title && !description && tags.length === 0) {
      throw usageError({
        spec: incidentsAdviseSpec,
        message: "Provide either <task-id> or at least one of --scope/--title/--description/--tag.",
      });
    }
  },
  parse: (raw) => ({
    taskId:
      typeof raw.args["task-id"] === "string" && String(raw.args["task-id"]).trim()
        ? String(raw.args["task-id"]).trim()
        : null,
    scope: typeof raw.opts.scope === "string" ? String(raw.opts.scope).trim() : null,
    title: typeof raw.opts.title === "string" ? String(raw.opts.title).trim() : null,
    description:
      typeof raw.opts.description === "string" ? String(raw.opts.description).trim() : null,
    tags: Array.isArray(raw.opts.tag)
      ? raw.opts.tag.map((value) => String(value).trim()).filter(Boolean)
      : [],
    limit:
      typeof raw.opts.limit === "number" && Number.isInteger(raw.opts.limit) && raw.opts.limit > 0
        ? Number(raw.opts.limit)
        : 5,
    json: raw.opts.json === true,
  }),
};

export function makeRunIncidentsAdviseHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: IncidentsAdviseParsed): Promise<number> => {
    const commandContext =
      (await getCtx("incidents advise")) ??
      (await loadCommandContext({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null }));

    if (p.taskId) {
      const result = await adviseTaskIncidents({
        ctx: commandContext,
        taskId: p.taskId,
        limit: p.limit,
      });
      if (p.json) {
        output.json({
          task_id: p.taskId,
          matches: result.matches.map((match) => ({
            score: match.score,
            matched_tags: match.matchedTags,
            matched_terms: match.matchedTerms,
            scope_matched: match.scopeMatched,
            entry: match.entry,
          })),
        });
        return 0;
      }
      output.line(`Incident advice for ${p.taskId}:`);
      output.line(renderIncidentAdvice(result.matches));
      return 0;
    }

    const registry = await loadIncidentRegistry(commandContext);
    const query = buildIncidentAdviceQueryFromTask({
      taskId: "adhoc",
      title: p.title ?? p.scope ?? "",
      description: p.description ?? "",
      scope: p.scope,
      tags: p.tags,
    });
    const matches = resolveIncidentAdviceMatches({
      query,
      registry: registry.registry,
      limit: p.limit,
    });
    if (p.json) {
      output.json({
        query,
        matches: matches.map((match) => ({
          score: match.score,
          matched_tags: match.matchedTags,
          matched_terms: match.matchedTerms,
          scope_matched: match.scopeMatched,
          entry: match.entry,
        })),
      });
      return 0;
    }
    output.line("Incident advice:");
    output.line(renderIncidentAdvice(matches));
    return 0;
  };
}
