import { isRecord } from "../../../shared/guards.js";

import type { TaskEvent, TaskEventType } from "./types.js";

const TASK_EVENT_TYPES = new Set<TaskEventType>(["status", "comment", "verify"]);

export function normalizeEvents(value: unknown): TaskEvent[] {
  if (!Array.isArray(value)) return [];
  const events: TaskEvent[] = [];
  for (const entry of value) {
    if (!isRecord(entry)) continue;
    const type = typeof entry.type === "string" ? entry.type : "";
    if (!TASK_EVENT_TYPES.has(type as TaskEventType)) continue;
    const at = typeof entry.at === "string" ? entry.at : "";
    const author = typeof entry.author === "string" ? entry.author : "";
    if (!at.trim() || !author.trim()) continue;
    events.push({
      type: type as TaskEventType,
      at,
      author,
      from: typeof entry.from === "string" ? entry.from : undefined,
      to: typeof entry.to === "string" ? entry.to : undefined,
      state: typeof entry.state === "string" ? entry.state : undefined,
      note: typeof entry.note === "string" ? entry.note : undefined,
      body: typeof entry.body === "string" ? entry.body : undefined,
    });
  }
  return events;
}
