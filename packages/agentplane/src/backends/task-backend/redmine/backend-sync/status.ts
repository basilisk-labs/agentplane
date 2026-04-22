import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { toStringSafe } from "../../shared.js";
import type { RedmineSyncContext } from "./context.js";

export async function inferRedmineStatusIdForTaskStatus(
  context: RedmineSyncContext,
  statusRaw: unknown,
): Promise<number | null> {
  const status = normalizeTaskStatus(toStringSafe(statusRaw));
  if (!status) return null;

  const explicit = context.statusMap?.[status];
  if (typeof explicit === "number" && Number.isFinite(explicit)) return explicit;

  const inferred = await loadRedmineInferredStatusByTaskStatus(context);
  return inferred.get(status) ?? null;
}

export async function loadRedmineInferredStatusByTaskStatus(
  context: RedmineSyncContext,
): Promise<Map<string, number>> {
  if (context.inferredStatusByTaskStatus) return context.inferredStatusByTaskStatus;
  const map = new Map<string, number>();
  context.setInferredStatusByTaskStatus(map);

  try {
    const payload = await context.requestJson("GET", "issue_statuses.json");
    const statuses = Array.isArray(payload.issue_statuses) ? payload.issue_statuses : [];
    const parsed: {
      id: number;
      name: string;
      isClosed: boolean;
      isDefault: boolean;
    }[] = [];

    for (const item of statuses) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const status = item as Record<string, unknown>;
      const id = typeof status.id === "number" ? status.id : null;
      if (!id || !Number.isFinite(id)) continue;
      parsed.push({
        id,
        name: toStringSafe(status.name).trim().toLowerCase(),
        isClosed: status.is_closed === true,
        isDefault: status.is_default === true,
      });
    }

    const done = selectRedmineInferredStatus(parsed, "DONE");
    const doing = selectRedmineInferredStatus(parsed, "DOING");
    const todo = selectRedmineInferredStatus(parsed, "TODO");
    if (done !== null) map.set("DONE", done);
    if (doing !== null) map.set("DOING", doing);
    if (todo !== null) map.set("TODO", todo);
  } catch {
    // Best effort: keep previous behavior when status discovery is unavailable.
  }

  return map;
}

export function selectRedmineInferredStatus(
  statuses: { id: number; name: string; isClosed: boolean; isDefault: boolean }[],
  target: "TODO" | "DOING" | "DONE",
): number | null {
  if (statuses.length === 0) return null;
  if (target === "DOING") {
    const byId = statuses.find((item) => item.id === 2);
    if (byId) return byId.id;
    const byName = statuses.find(
      (item) => item.name.includes("progress") || item.name.includes("doing"),
    );
    return byName?.id ?? null;
  }
  if (target === "DONE") {
    const closed = statuses.find((item) => item.isClosed);
    if (closed) return closed.id;
    const byId = statuses.find((item) => item.id === 5 || item.id === 3 || item.id === 6);
    if (byId) return byId.id;
    const byName = statuses.find(
      (item) =>
        item.name.includes("done") ||
        item.name.includes("closed") ||
        item.name.includes("resolved") ||
        item.name.includes("complete"),
    );
    return byName?.id ?? null;
  }

  const byDefault = statuses.find((item) => item.isDefault);
  if (byDefault) return byDefault.id;
  const byId = statuses.find((item) => item.id === 1);
  return byId?.id ?? statuses[0]?.id ?? null;
}
