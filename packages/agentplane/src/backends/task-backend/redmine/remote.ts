import { isRecord } from "../../../shared/guards.js";

import { BackendError, TASK_ID_RE, toStringSafe, type TaskData } from "../shared.js";

export async function listTasksRemote(opts: {
  projectId: string;
  taskFieldId: unknown;
  issueCache: Map<string, Record<string, unknown>>;
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
  customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
  issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
}): Promise<TaskData[]> {
  const tasks: TaskData[] = [];
  const allIssues: Record<string, unknown>[] = [];
  let offset = 0;
  const limit = 100;
  opts.issueCache.clear();

  while (true) {
    const payload = await opts.requestJson("GET", "issues.json", undefined, {
      project_id: opts.projectId,
      limit,
      offset,
      status_id: "*",
    });
    const issues = Array.isArray(payload.issues) ? payload.issues : [];
    const pageIssues = issues.filter((issue): issue is Record<string, unknown> => isRecord(issue));
    allIssues.push(...pageIssues);
    const total = Number(payload.total_count ?? 0);
    if (total === 0 || offset + limit >= total) break;
    offset += limit;
  }

  const existingIds = new Set<string>();
  const duplicates = new Set<string>();
  for (const issue of allIssues) {
    const taskId = opts.customFieldValue(issue, opts.taskFieldId);
    if (!taskId) continue;
    const taskIdStr = toStringSafe(taskId);
    if (!TASK_ID_RE.test(taskIdStr)) continue;
    if (existingIds.has(taskIdStr)) duplicates.add(taskIdStr);
    existingIds.add(taskIdStr);
  }
  if (duplicates.size > 0) {
    const sample = [...duplicates].toSorted().slice(0, 5).join(", ");
    throw new BackendError(`Duplicate task_id values found in Redmine: ${sample}`, "E_BACKEND");
  }

  for (const issue of allIssues) {
    const taskId = opts.customFieldValue(issue, opts.taskFieldId);
    const taskIdText = toStringSafe(taskId);
    if (!taskIdText || !TASK_ID_RE.test(taskIdText)) continue;
    const task = opts.issueToTask(issue, taskIdText);
    if (task) {
      const idText = toStringSafe(task.id);
      if (idText) opts.issueCache.set(idText, issue);
      tasks.push(task);
    }
  }

  return tasks;
}

export async function findIssueByTaskId(opts: {
  taskId: string;
  projectId: string;
  taskFieldId: unknown;
  issueCache: Map<string, Record<string, unknown>>;
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
  customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
  refreshList: () => Promise<void>;
}): Promise<Record<string, unknown> | null> {
  const id = toStringSafe(opts.taskId).trim();
  if (!id) return null;
  const cached = opts.issueCache.get(id);
  if (cached) return cached;

  const payload = await opts.requestJson("GET", "issues.json", undefined, {
    project_id: opts.projectId,
    status_id: "*",
    [`cf_${String(opts.taskFieldId)}`]: id,
    limit: 100,
  });
  const candidates = Array.isArray(payload.issues) ? payload.issues : [];
  for (const candidate of candidates) {
    if (!isRecord(candidate)) continue;
    const val = opts.customFieldValue(candidate, opts.taskFieldId);
    if (val && String(val) === id) {
      opts.issueCache.set(id, candidate);
      return candidate;
    }
  }

  await opts.refreshList();
  const refreshed = opts.issueCache.get(id);
  return refreshed ?? null;
}
