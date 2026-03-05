export type SchedulerIssue = {
  id: string;
  state: string;
  priority?: number | null;
  createdAt?: string | null;
};

export type SchedulerEntry = {
  issue: SchedulerIssue;
  workerId: string;
};

export type SchedulerLimits = {
  maxConcurrent: number;
  maxConcurrentByState?: Record<string, number>;
};

function normalizeState(value: string): string {
  return value.trim().toLowerCase();
}

function createdAtMicros(value: string | null | undefined): number {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return Number.MAX_SAFE_INTEGER;
  return parsed * 1000;
}

function priorityRank(priority: number | null | undefined): number {
  if (typeof priority !== "number") return 5;
  if (!Number.isInteger(priority)) return 5;
  if (priority < 1 || priority > 4) return 5;
  return priority;
}

export function sortIssuesForDispatch(issues: readonly SchedulerIssue[]): SchedulerIssue[] {
  return issues.toSorted((a, b) => {
    const aPriority = priorityRank(a.priority);
    const bPriority = priorityRank(b.priority);
    if (aPriority !== bPriority) return aPriority - bPriority;

    const aCreated = createdAtMicros(a.createdAt);
    const bCreated = createdAtMicros(b.createdAt);
    if (aCreated !== bCreated) return aCreated - bCreated;

    return a.id.localeCompare(b.id);
  });
}

export function canDispatchIssue(
  issue: SchedulerIssue,
  running: readonly SchedulerEntry[],
  limits: SchedulerLimits,
): boolean {
  const totalRunning = running.length;
  if (totalRunning >= limits.maxConcurrent) return false;

  const stateKey = normalizeState(issue.state);
  const stateLimitRaw = limits.maxConcurrentByState?.[stateKey];
  const stateLimit =
    typeof stateLimitRaw === "number" && stateLimitRaw > 0 ? stateLimitRaw : limits.maxConcurrent;

  const stateUsed = running.filter(
    (entry) => normalizeState(entry.issue.state) === stateKey,
  ).length;
  return stateUsed < stateLimit;
}

export function planDispatch(
  candidates: readonly SchedulerIssue[],
  running: readonly SchedulerEntry[],
  limits: SchedulerLimits,
): SchedulerIssue[] {
  const ordered = sortIssuesForDispatch(candidates);
  const accepted: SchedulerIssue[] = [];
  const shadowRunning: SchedulerEntry[] = [...running];

  for (const issue of ordered) {
    if (!canDispatchIssue(issue, shadowRunning, limits)) continue;
    accepted.push(issue);
    shadowRunning.push({ issue, workerId: `planned:${issue.id}` });
  }

  return accepted;
}
