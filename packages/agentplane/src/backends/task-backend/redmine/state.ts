import { taskDocToSectionMap } from "@agentplaneorg/core/tasks";

import { isRecord } from "../../../shared/guards.js";

import { normalizeEvents } from "../shared/events.js";
import {
  normalizePlanApproval,
  normalizeTaskOrigin,
  normalizeTaskRunnerOutcome,
  normalizeVerificationResult,
} from "../shared/normalize.js";
import type { TaskData } from "../shared/types.js";
import { toStringSafe } from "../shared/strings.js";

export type RedmineCanonicalState = {
  revision?: number;
  origin?: TaskData["origin"];
  runner?: TaskData["runner"];
  sync?: TaskData["sync"];
  sections?: Record<string, string>;
  plan_approval?: TaskData["plan_approval"];
  verification?: TaskData["verification"];
  events?: TaskData["events"];
};

type BuildRedmineCanonicalStateOptions = {
  base?: RedmineCanonicalState | null;
  revision?: number | null;
};

function normalizeRevision(value: unknown): number | undefined {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : undefined;
}

function normalizeCanonicalSections(value: unknown): Record<string, string> | undefined {
  if (!isRecord(value)) return undefined;
  const out: Record<string, string> = {};
  for (const [title, text] of Object.entries(value)) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle || typeof text !== "string") continue;
    out[normalizedTitle] = text.replaceAll("\r\n", "\n").trimEnd();
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function maybeParseJsonString(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  const raw = toStringSafe(value).trim();
  if (!raw) return null;
  if (!raw.startsWith("{")) return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function parseRedmineCanonicalState(value: unknown): RedmineCanonicalState | null {
  const parsed = maybeParseJsonString(value);
  if (!isRecord(parsed)) return null;

  const revision = normalizeRevision(parsed.revision);
  const origin = normalizeTaskOrigin(parsed.origin) ?? undefined;
  const runner = normalizeTaskRunnerOutcome(parsed.runner) ?? undefined;
  const sync = isRecord(parsed.sync) ? (parsed.sync as TaskData["sync"]) : undefined;
  const sections = normalizeCanonicalSections(parsed.sections);
  const planApproval = normalizePlanApproval(parsed.plan_approval) ?? undefined;
  const verification = normalizeVerificationResult(parsed.verification) ?? undefined;
  const events = normalizeEvents(parsed.events);

  if (
    revision === undefined &&
    origin === undefined &&
    runner === undefined &&
    sync === undefined &&
    sections === undefined &&
    planApproval === undefined &&
    verification === undefined &&
    events.length === 0
  ) {
    return null;
  }

  return {
    ...(revision === undefined ? {} : { revision }),
    ...(origin ? { origin } : {}),
    ...(runner ? { runner } : {}),
    ...(sync ? { sync } : {}),
    ...(sections ? { sections } : {}),
    ...(planApproval ? { plan_approval: planApproval } : {}),
    ...(verification ? { verification } : {}),
    ...(events.length > 0 ? { events } : {}),
  };
}

export function buildRedmineCanonicalState(task: TaskData): RedmineCanonicalState | null {
  return buildRedmineCanonicalStateWithOptions(task);
}

export function buildRedmineCanonicalStateWithOptions(
  task: TaskData,
  opts?: BuildRedmineCanonicalStateOptions,
): RedmineCanonicalState | null {
  const base = opts?.base ?? null;
  const revision =
    normalizeRevision(opts?.revision) ??
    normalizeRevision(task.revision) ??
    normalizeRevision(base?.revision);
  const origin = normalizeTaskOrigin(task.origin) ?? normalizeTaskOrigin(base?.origin) ?? undefined;
  const runner =
    normalizeTaskRunnerOutcome(task.runner) ??
    normalizeTaskRunnerOutcome(base?.runner) ??
    undefined;
  const sync = isRecord(task.sync) ? task.sync : isRecord(base?.sync) ? base.sync : undefined;
  const sections =
    normalizeCanonicalSections(task.sections) ??
    (typeof task.doc === "string" && task.doc.trim().length > 0
      ? taskDocToSectionMap(task.doc)
      : undefined) ??
    normalizeCanonicalSections(base?.sections);
  const planApproval =
    normalizePlanApproval(task.plan_approval) ??
    normalizePlanApproval(base?.plan_approval) ??
    undefined;
  const verification =
    normalizeVerificationResult(task.verification) ??
    normalizeVerificationResult(base?.verification) ??
    undefined;
  const events = normalizeEvents(task.events);
  const fallbackEvents = events.length > 0 ? events : normalizeEvents(base?.events);

  if (
    revision === undefined &&
    origin === undefined &&
    runner === undefined &&
    sync === undefined &&
    sections === undefined &&
    planApproval === undefined &&
    verification === undefined &&
    fallbackEvents.length === 0
  ) {
    return null;
  }

  return {
    ...(revision === undefined ? {} : { revision }),
    ...(origin ? { origin } : {}),
    ...(runner ? { runner } : {}),
    ...(sync ? { sync } : {}),
    ...(sections ? { sections } : {}),
    ...(planApproval ? { plan_approval: planApproval } : {}),
    ...(verification ? { verification } : {}),
    ...(fallbackEvents.length > 0 ? { events: fallbackEvents } : {}),
  };
}
