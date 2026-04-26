import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import {
  appendIncidentRegistryEntries,
  buildIncidentAdviceQueryFromTask,
  createIncidentRegistrySkeleton,
  INCIDENTS_POLICY_ASSET_PATH,
  INCIDENTS_POLICY_PATH,
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
export {
  INCIDENTS_POLICY_ASSET_PATH,
  INCIDENTS_POLICY_PATH,
} from "../../runtime/incidents/index.js";
const INCIDENTS_POLICY_LINE_BUDGET = 100;

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

export function incidentRegistryAssetPath(ctx: CommandContext): string {
  return path.join(ctx.resolvedProject.gitRoot, INCIDENTS_POLICY_ASSET_PATH);
}

function normalizeIncidentRegistryDocument(text: string): string {
  const normalized = text.replaceAll("\r\n", "\n").trimEnd();
  return normalized.length > 0 ? `${normalized}\n` : createIncidentRegistrySkeleton();
}

async function writeIncidentRegistryMirrors(
  ctx: CommandContext,
  content: string,
): Promise<boolean> {
  const registryPath = incidentRegistryPath(ctx);
  const assetPath = incidentRegistryAssetPath(ctx);
  const assetExists = (await readTextIfExists(assetPath)) !== null;
  const normalizedContent = normalizeIncidentRegistryDocument(content);
  let wroteRegistry = await writeTextIfChanged(registryPath, normalizedContent);
  let wroteAsset = false;
  if (assetExists) {
    const canonicalText = (await readTextIfExists(registryPath)) ?? normalizedContent;
    wroteAsset = await writeTextIfChanged(assetPath, canonicalText);
    const registryText = await readTextIfExists(registryPath);
    if (registryText !== canonicalText) {
      wroteRegistry = (await writeTextIfChanged(registryPath, canonicalText)) || wroteRegistry;
    }
  }
  return wroteRegistry || wroteAsset;
}

async function resolveIncidentRegistryMirrorPaths(ctx: CommandContext): Promise<string[]> {
  const paths = [INCIDENTS_POLICY_PATH];
  const assetPath = incidentRegistryAssetPath(ctx);
  if ((await readTextIfExists(assetPath)) !== null) {
    paths.push(INCIDENTS_POLICY_ASSET_PATH);
  }
  return paths;
}

function countTextLines(text: string): number {
  return text.replaceAll("\r\n", "\n").split("\n").length;
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
  registryPaths: string[];
  registryText: string;
  registry: IncidentRegistry;
  plan: IncidentCollectionPlan;
  wrote: boolean;
}> {
  const inspected = await inspectTaskIncidents(opts);
  const { loaded, registryPath, registryPaths, registryText, registry, plan } = inspected;
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
  if (plan.promotable.length > 0) {
    const nextLineCount = countTextLines(nextText);
    if (nextLineCount > INCIDENTS_POLICY_LINE_BUDGET) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message:
          `Incident registry write would exceed policy budget: ${nextLineCount} lines ` +
          `(limit ${INCIDENTS_POLICY_LINE_BUDGET}). Compact or promote fewer entries before writing.`,
      });
    }
  }
  const wrote =
    opts.write && plan.promotable.length > 0
      ? await writeIncidentRegistryMirrors(opts.ctx, nextText)
      : false;
  return { loaded, registryPath, registryPaths, registryText, registry, plan, wrote };
}

export async function inspectTaskIncidents(opts: {
  ctx: CommandContext;
  taskId: string;
  task?: TaskData | null;
  now?: Date;
}): Promise<{
  loaded: LoadedTaskIncidents;
  registryPath: string;
  registryPaths: string[];
  registryText: string;
  registry: IncidentRegistry;
  plan: IncidentCollectionPlan;
}> {
  const loaded = await loadTaskIncidents(opts.ctx, opts.taskId, opts.task ?? null);
  const { registryPath, registryText, registry } = await loadIncidentRegistry(opts.ctx);
  const registryPaths = await resolveIncidentRegistryMirrorPaths(opts.ctx);
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
  return { loaded, registryPath, registryPaths, registryText, registry, plan };
}

export function renderIncidentCollectionOutcome(promotedCount: number): string {
  return promotedCount > 0
    ? `incident registry updated (${promotedCount} promoted)`
    : "incident registry unchanged (no promotable external findings)";
}

function summarizeDetailList(values: readonly string[], maxItems = 3): string | null {
  const filtered = values.map((value) => value.trim()).filter((value) => value.length > 0);
  if (filtered.length === 0) return null;
  if (filtered.length <= maxItems) return filtered.join(", ");
  return `${filtered.slice(0, maxItems).join(", ")}, +${filtered.length - maxItems} more`;
}

export function renderIncidentCollectionPlanOutcome(
  plan: {
    candidates?: readonly unknown[];
    skipped?: readonly unknown[];
    promotable?: readonly unknown[];
    duplicates?: readonly unknown[];
    issues?: readonly { missingFields?: readonly string[] }[];
    findingsTextPresent?: boolean;
    structuredFindingCount?: number;
  },
  opts?: {
    wrote?: boolean;
    context?: "collect" | "verify" | "finish" | "generic";
    promotedIds?: readonly string[];
    registryPaths?: readonly string[];
    taskId?: string | null;
  },
): string {
  const candidates = Array.isArray(plan.candidates) ? plan.candidates.length : 0;
  const skipped = Array.isArray(plan.skipped) ? plan.skipped.length : 0;
  const promoted = Array.isArray(plan.promotable) ? plan.promotable.length : 0;
  const duplicates = Array.isArray(plan.duplicates) ? plan.duplicates.length : 0;
  const issues = Array.isArray(plan.issues) ? plan.issues.length : 0;
  const findingsTextPresent = plan.findingsTextPresent === true;
  const structuredFindingCount =
    typeof plan.structuredFindingCount === "number" ? plan.structuredFindingCount : 0;
  const wrote = opts?.wrote === true;
  const context = opts?.context ?? "generic";
  const taskId =
    typeof opts?.taskId === "string" && opts.taskId.trim().length > 0 ? opts.taskId.trim() : null;
  const findingsNextStep = taskId
    ? ` next: agentplane task findings add ${taskId} --observation "<observation>" --impact "<impact>" --resolution "<resolution>"`
    : "";

  if (promoted > 0 && wrote) {
    const suffix: string[] = [];
    if (duplicates > 0) suffix.push(`${duplicates} duplicate${duplicates === 1 ? "" : "s"}`);
    if (skipped > 0)
      suffix.push(`${skipped} skipped structured finding${skipped === 1 ? "" : "s"}`);
    const base =
      suffix.length > 0
        ? `incident registry updated (${promoted} promoted; ${suffix.join("; ")})`
        : renderIncidentCollectionOutcome(promoted);
    const details: string[] = [];
    const promotedIds = Array.isArray(opts?.promotedIds)
      ? opts.promotedIds.filter(
          (id): id is string => typeof id === "string" && id.trim().length > 0,
        )
      : [];
    const registryPaths = Array.isArray(opts?.registryPaths)
      ? opts.registryPaths.filter(
          (filePath): filePath is string =>
            typeof filePath === "string" && filePath.trim().length > 0,
        )
      : [];
    const idsSummary = summarizeDetailList(promotedIds);
    const pathsSummary = summarizeDetailList(registryPaths);
    if (idsSummary) details.push(`ids=${idsSummary}`);
    if (pathsSummary) details.push(`files=${pathsSummary}`);
    return details.length > 0 ? `${base} ${details.join(" ")}` : base;
  }

  if (promoted > 0 && !wrote) {
    if (context === "collect") {
      return `incident registry unchanged (${promoted} promotable external finding${promoted === 1 ? "" : "s"} validated; rerun without --check to update incidents.md)`;
    }
    if (context === "verify") {
      return `incident registry unchanged (${promoted} promotable external finding${promoted === 1 ? "" : "s"} stayed task-local in the current task worktree; run verify --collect-incidents, agentplane incidents collect <task-id>, or finish on the base branch to update incidents.md)`;
    }
    return `incident registry unchanged (${promoted} promotable external finding${promoted === 1 ? "" : "s"} pending promotion)`;
  }

  if (issues > 0) {
    const issueEntries = Array.isArray(plan.issues)
      ? (plan.issues as readonly { missingFields?: readonly string[] }[])
      : [];
    const firstIssue = issueEntries[0];
    const rawMissingFields = firstIssue?.missingFields;
    const missingFields = Array.isArray(rawMissingFields)
      ? rawMissingFields.filter(
          (field): field is string => typeof field === "string" && field.trim().length > 0,
        )
      : [];
    const detail =
      missingFields.length > 0
        ? ` missing required fields: ${missingFields.join(", ")}`
        : " missing required promotion fields";
    const suffix =
      issues > 1 ? `; +${issues - 1} more candidate${issues - 1 === 1 ? "" : "s"}` : "";
    return `incident registry unchanged (${issues} structured finding candidate${issues === 1 ? "" : "s"} still invalid;${detail}${suffix})`;
  }

  if (skipped > 0) {
    return `incident registry unchanged (${skipped} structured finding${skipped === 1 ? "" : "s"} stayed task-local in the current checkout: mark reusable external findings with Promotion: incident-candidate plus Fixability: external, or use task findings add without --local-only)`;
  }

  if (candidates === 0 && structuredFindingCount === 0 && findingsTextPresent) {
    return "incident registry unchanged (plain Findings text stays task-local in the current checkout and does not update incidents.md: add a structured Observation/Impact/Resolution block for reusable external incidents, or use task findings add without --local-only)";
  }

  if (candidates === 0) {
    if (context === "verify") {
      return (
        "incident registry unchanged (plain verify note stayed task-local and did not update " +
        "incidents.md: add --observation, --impact, and --resolution for a reusable incident, " +
        `then rerun with --collect-incidents or collect later on the base branch.${findingsNextStep})`
      );
    }
    if (context === "finish") {
      return (
        "incident registry unchanged (plain finish body/result stayed task-local and did not " +
        "update incidents.md: add --observation, --impact, and --resolution for a reusable " +
        `incident before closeout.${findingsNextStep})`
      );
    }
    return "incident registry unchanged (no structured incident findings)";
  }

  if (duplicates > 0 && duplicates === candidates) {
    return `incident registry unchanged (${duplicates} duplicate incident${duplicates === 1 ? "" : "s"} already recorded)`;
  }

  return "incident registry unchanged (no promotable external findings)";
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
