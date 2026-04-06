import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import {
  appendIncidentRegistryEntries,
  buildIncidentAdviceQueryFromTask,
  createIncidentRegistrySkeleton,
  parseIncidentRegistry,
  planIncidentCollection,
  resolveIncidentAdviceMatches,
  type IncidentAdviceMatch,
  type IncidentAdviceQuery,
  type IncidentCollectionPlan,
  type IncidentRegistry,
} from "../../runtime/incidents/index.js";
import {
  extractDocSection,
  extractTaskObservationSection,
  normalizeTaskDocVersion,
} from "../task/shared.js";
import type { CommandContext } from "../shared/task-backend.js";

export const INCIDENTS_POLICY_PATH = ".agentplane/policy/incidents.md";

export type LoadedTaskIncidents = {
  task: TaskData;
  findings: string;
  scope: string | null;
  query: IncidentAdviceQuery;
};

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export function incidentRegistryPath(ctx: CommandContext): string {
  return path.join(ctx.resolvedProject.gitRoot, INCIDENTS_POLICY_PATH);
}

export async function loadIncidentRegistry(ctx: CommandContext): Promise<{
  registryPath: string;
  registryText: string;
  registry: IncidentRegistry;
}> {
  const registryPath = incidentRegistryPath(ctx);
  const registryText = (await readTextIfExists(registryPath)) ?? createIncidentRegistrySkeleton();
  return {
    registryPath,
    registryText,
    registry: parseIncidentRegistry(registryText),
  };
}

export async function loadTaskIncidents(
  ctx: CommandContext,
  taskId: string,
  taskOverride?: TaskData | null,
): Promise<LoadedTaskIncidents> {
  const task = taskOverride ?? (await ctx.taskBackend.getTask(taskId));
  if (!task) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown task: ${taskId}`,
    });
  }
  const doc = typeof task.doc === "string" ? task.doc : "";
  const docVersion = normalizeTaskDocVersion(task.doc_version);
  const findings = extractTaskObservationSection(doc, docVersion)?.trim() ?? "";
  const scope = extractDocSection(doc, "Scope")?.trim() ?? null;
  return {
    task,
    findings,
    scope,
    query: buildIncidentAdviceQueryFromTask({
      taskId: task.id,
      title: task.title,
      description: task.description,
      scope,
      tags: task.tags ?? [],
    }),
  };
}

export function formatIncidentCollectionIssues(
  taskId: string,
  plan: IncidentCollectionPlan,
): string {
  const issueLines = plan.issues.map((issue) => {
    const scope = issue.candidate.incidentScope ?? issue.candidate.observation;
    return `line ${issue.candidate.line}: ${scope} -> missing ${issue.missingFields.join(", ")}`;
  });
  return [
    `${taskId}: reusable external findings need explicit external marking and enough recovery detail before promotion.`,
    "Required fields:",
    ...issueLines.map((line) => `- ${line}`),
  ].join("\n");
}

export async function collectTaskIncidents(opts: {
  ctx: CommandContext;
  taskId: string;
  task?: TaskData | null;
  write: boolean;
  now?: Date;
}): Promise<{
  loaded: LoadedTaskIncidents;
  registryPath: string;
  registryText: string;
  registry: IncidentRegistry;
  plan: IncidentCollectionPlan;
  wrote: boolean;
}> {
  const loaded = await loadTaskIncidents(opts.ctx, opts.taskId, opts.task ?? null);
  const { registryPath, registryText, registry } = await loadIncidentRegistry(opts.ctx);
  const plan = planIncidentCollection({
    task: {
      id: loaded.task.id,
      title: loaded.task.title,
      description: loaded.task.description,
      scope: loaded.scope,
      tags: loaded.task.tags ?? [],
      commitHash: loaded.task.commit?.hash ?? null,
    },
    findings: loaded.findings,
    registry,
    now: opts.now,
  });
  if (plan.issues.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: formatIncidentCollectionIssues(opts.taskId, plan),
    });
  }
  const nextText = appendIncidentRegistryEntries(
    registryText,
    plan.promotable.map((item) => item.entry),
  );
  const wrote =
    opts.write && plan.promotable.length > 0
      ? await writeTextIfChanged(registryPath, nextText)
      : false;
  return { loaded, registryPath, registryText, registry, plan, wrote };
}

export function renderIncidentCollectionOutcome(promotedCount: number): string {
  return promotedCount > 0
    ? `incident registry updated (${promotedCount} promoted)`
    : "incident registry unchanged (no promotable external findings)";
}

export async function adviseTaskIncidents(opts: {
  ctx: CommandContext;
  taskId: string;
  task?: TaskData | null;
  limit?: number;
}): Promise<{
  loaded: LoadedTaskIncidents;
  matches: IncidentAdviceMatch[];
}> {
  const loaded = await loadTaskIncidents(opts.ctx, opts.taskId, opts.task ?? null);
  const { registry } = await loadIncidentRegistry(opts.ctx);
  return {
    loaded,
    matches: resolveIncidentAdviceMatches({
      query: loaded.query,
      registry,
      limit: opts.limit,
    }),
  };
}
