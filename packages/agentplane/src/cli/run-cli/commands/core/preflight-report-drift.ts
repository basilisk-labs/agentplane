import { normalizeTaskStatus, readTask, type TaskStatus } from "@agentplaneorg/core/tasks";

type TaskArtifactKind = "task_readme" | "handoff" | "pr_artifact" | "blueprint" | "unknown";
type TaskArtifactClassification =
  | "active_parallel_task_artifact"
  | "stale_done_handoff"
  | "task_blueprint_evidence"
  | "unknown_task_artifact";
type TaskArtifactAction =
  | "ignore_parallel_agent"
  | "cleanup_candidate"
  | "commit_with_task_evidence"
  | "inspect";
type TaskArtifactDriftItem = {
  path: string;
  task_id: string;
  artifact_kind: TaskArtifactKind;
  classification: TaskArtifactClassification;
  action: TaskArtifactAction;
  status: TaskStatus | "unknown";
  reason: string;
};
export type TaskArtifactDrift = {
  present: boolean;
  task_ids: string[];
  paths: string[];
  actionable: boolean;
  items: TaskArtifactDriftItem[];
  counts: Record<TaskArtifactClassification, number>;
};

export function emptyTaskArtifactDrift(): TaskArtifactDrift {
  return {
    present: false,
    task_ids: [],
    paths: [],
    actionable: false,
    items: [],
    counts: {
      active_parallel_task_artifact: 0,
      stale_done_handoff: 0,
      task_blueprint_evidence: 0,
      unknown_task_artifact: 0,
    },
  };
}

export function normalizeRepoPath(value: string): string {
  return value.replaceAll("\\", "/");
}

function inferTaskArtifactKind(relativeTaskPath: string): TaskArtifactKind {
  if (relativeTaskPath === "README.md") return "task_readme";
  if (relativeTaskPath.startsWith("handoff/")) return "handoff";
  if (relativeTaskPath.startsWith("pr/")) return "pr_artifact";
  if (relativeTaskPath.startsWith("blueprint/")) return "blueprint";
  return "unknown";
}

function isActiveParallelStatus(status: TaskStatus | "unknown"): boolean {
  return status === "TODO" || status === "DOING" || status === "BLOCKED";
}

function classifyTaskArtifactDriftItem(opts: {
  path: string;
  taskId: string;
  artifactKind: TaskArtifactKind;
  status: TaskStatus | "unknown";
}): TaskArtifactDriftItem {
  if (isActiveParallelStatus(opts.status) && opts.artifactKind === "task_readme") {
    return {
      path: opts.path,
      task_id: opts.taskId,
      artifact_kind: opts.artifactKind,
      classification: "active_parallel_task_artifact",
      action: "ignore_parallel_agent",
      status: opts.status,
      reason: "README belongs to an active task and may be owned by another parallel agent",
    };
  }
  if (opts.status === "DONE" && opts.artifactKind === "handoff") {
    return {
      path: opts.path,
      task_id: opts.taskId,
      artifact_kind: opts.artifactKind,
      classification: "stale_done_handoff",
      action: "cleanup_candidate",
      status: opts.status,
      reason: "handoff artifact belongs to a completed task and may be stale closure residue",
    };
  }
  if (opts.artifactKind === "blueprint") {
    return {
      path: opts.path,
      task_id: opts.taskId,
      artifact_kind: opts.artifactKind,
      classification: "task_blueprint_evidence",
      action: "commit_with_task_evidence",
      status: opts.status,
      reason:
        "blueprint artifact is task-local verification evidence and must travel with the task artifact commit",
    };
  }
  return {
    path: opts.path,
    task_id: opts.taskId,
    artifact_kind: opts.artifactKind,
    classification: "unknown_task_artifact",
    action: "inspect",
    status: opts.status,
    reason: "artifact ownership could not be classified from task status and path",
  };
}

async function resolveTaskStatus(opts: {
  gitRoot: string;
  taskId: string;
}): Promise<TaskStatus | "unknown"> {
  try {
    const task = await readTask({
      cwd: opts.gitRoot,
      rootOverride: opts.gitRoot,
      taskId: opts.taskId,
    });
    return normalizeTaskStatus(task.frontmatter.status);
  } catch {
    return "unknown";
  }
}

export async function detectTaskArtifactDrift(opts: {
  gitRoot: string;
  changedPaths: string[];
  workflowDir: string;
}): Promise<TaskArtifactDrift> {
  const workflowDir = normalizeRepoPath(opts.workflowDir).replace(/\/+$/, "");
  const prefix = `${workflowDir}/`;
  const matched = opts.changedPaths
    .map((value) => normalizeRepoPath(value))
    .filter((value) => value.startsWith(prefix))
    .toSorted((a, b) => a.localeCompare(b));
  const taskIds = new Set<string>();
  for (const matchedPath of matched) {
    const relative = matchedPath.slice(prefix.length);
    const [taskId] = relative.split("/", 1);
    if (taskId && taskId !== "." && taskId !== "..") {
      taskIds.add(taskId);
    }
  }
  const taskStatusById = new Map<string, TaskStatus | "unknown">();
  for (const taskId of taskIds) {
    taskStatusById.set(taskId, await resolveTaskStatus({ gitRoot: opts.gitRoot, taskId }));
  }
  const items: TaskArtifactDriftItem[] = [];
  for (const matchedPath of matched) {
    const relative = matchedPath.slice(prefix.length);
    const [taskId, ...artifactParts] = relative.split("/");
    if (!taskId || taskId === "." || taskId === "..") continue;
    const artifactKind = inferTaskArtifactKind(artifactParts.join("/"));
    items.push(
      classifyTaskArtifactDriftItem({
        path: matchedPath,
        taskId,
        artifactKind,
        status: taskStatusById.get(taskId) ?? "unknown",
      }),
    );
  }
  const counts: Record<TaskArtifactClassification, number> = {
    active_parallel_task_artifact: 0,
    stale_done_handoff: 0,
    task_blueprint_evidence: 0,
    unknown_task_artifact: 0,
  };
  for (const item of items) {
    counts[item.classification] += 1;
  }
  const actionable = items.some((item) => item.action !== "ignore_parallel_agent");
  return {
    present: matched.length > 0,
    task_ids: [...taskIds].toSorted((a, b) => a.localeCompare(b)),
    paths: matched,
    actionable,
    items,
    counts,
  };
}
