import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export const DEFAULT_RELEASE_TASK_PLAN_PATH = "docs/internal/v0.7-release-task-closure.json";

export function readTaskFrontMatterList(text, key) {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  const start = lines.findIndex((line) => line.trim() === `${key}:`);
  if (start === -1) return [];
  const values = [];
  for (const line of lines.slice(start + 1)) {
    if (/^[A-Za-z0-9_-]+:\s*/u.test(line)) break;
    const match = /^\s*-\s*["']?([^"']+)["']?\s*$/u.exec(line);
    if (match?.[1]) values.push(match[1].trim());
  }
  return values;
}

function listTaskIds(tasksRoot) {
  if (!existsSync(tasksRoot)) return [];
  return readdirSync(tasksRoot)
    .filter((entry) => statSync(path.join(tasksRoot, entry)).isDirectory())
    .toSorted((a, b) => a.localeCompare(b));
}

function readTaskGraph(repoRoot) {
  const tasksRoot = path.join(repoRoot, ".agentplane", "tasks");
  const graph = new Map();
  for (const taskId of listTaskIds(tasksRoot)) {
    const readmePath = path.join(tasksRoot, taskId, "README.md");
    if (!existsSync(readmePath)) continue;
    const text = readFileSync(readmePath, "utf8");
    graph.set(taskId, readTaskFrontMatterList(text, "depends_on"));
  }
  return graph;
}

function normalizeStringList(value, field, failures) {
  if (!Array.isArray(value)) {
    failures.push(`${field} must be an array`);
    return [];
  }
  const values = value.map((entry) => String(entry ?? "").trim()).filter(Boolean);
  const seen = new Set();
  for (const taskId of values) {
    if (seen.has(taskId)) failures.push(`${field} contains duplicate task ${taskId}`);
    seen.add(taskId);
  }
  return values;
}

function normalizeOptionalTasks(value, failures) {
  if (!Array.isArray(value)) {
    failures.push("optional_tasks must be an array");
    return [];
  }
  const taskIds = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") {
      failures.push("optional_tasks entries must be objects with task_id and reason");
      continue;
    }
    const taskId = String(entry.task_id ?? "").trim();
    const reason = String(entry.reason ?? "").trim();
    if (!taskId) {
      failures.push("optional_tasks entry is missing task_id");
      continue;
    }
    if (!reason) failures.push(`optional task ${taskId} is missing a reason`);
    taskIds.push(taskId);
  }
  const seen = new Set();
  for (const taskId of taskIds) {
    if (seen.has(taskId)) failures.push(`optional_tasks contains duplicate task ${taskId}`);
    seen.add(taskId);
  }
  return taskIds;
}

function collectReachable(graph, rootTaskId) {
  const reachable = new Set();
  const pending = [rootTaskId];
  while (pending.length > 0) {
    const taskId = pending.pop();
    if (!taskId || reachable.has(taskId) || !graph.has(taskId)) continue;
    reachable.add(taskId);
    pending.push(...(graph.get(taskId) ?? []));
  }
  return reachable;
}

function findDependencyPath(graph, rootTaskId, targetTaskId) {
  const pending = [[rootTaskId]];
  const visited = new Set();
  while (pending.length > 0) {
    const currentPath = pending.shift();
    const taskId = currentPath?.at(-1);
    if (!taskId || visited.has(taskId)) continue;
    if (taskId === targetTaskId) return currentPath;
    visited.add(taskId);
    for (const dependency of graph.get(taskId) ?? []) {
      pending.push([...currentPath, dependency]);
    }
  }
  return null;
}

function inspectRelevantGraph(graph, seeds, failures) {
  const visited = new Set();
  const visiting = new Set();
  const stack = [];
  const reportedCycles = new Set();
  const reportedUnknown = new Set();

  function visit(taskId) {
    if (!graph.has(taskId) || visited.has(taskId)) return;
    if (visiting.has(taskId)) {
      const start = stack.indexOf(taskId);
      const cycle = [...stack.slice(Math.max(0, start)), taskId];
      const signature = cycle.join(" -> ");
      if (!reportedCycles.has(signature)) {
        failures.push(`release dependency cycle: ${signature}`);
        reportedCycles.add(signature);
      }
      return;
    }
    visiting.add(taskId);
    stack.push(taskId);
    for (const dependency of graph.get(taskId) ?? []) {
      if (!graph.has(dependency)) {
        const signature = `${taskId} -> ${dependency}`;
        if (!reportedUnknown.has(signature)) {
          failures.push(`unknown dependency ${signature}`);
          reportedUnknown.add(signature);
        }
        continue;
      }
      visit(dependency);
    }
    stack.pop();
    visiting.delete(taskId);
    visited.add(taskId);
  }

  for (const seed of seeds) visit(seed);
}

export function inspectReleaseTaskClosure(repoRoot, opts = {}) {
  const planPath = path.resolve(repoRoot, String(opts.planPath ?? DEFAULT_RELEASE_TASK_PLAN_PATH));
  if (!existsSync(planPath)) {
    return {
      checked: opts.required === true,
      failures:
        opts.required === true
          ? [`release plan is missing: ${path.relative(repoRoot, planPath)}`]
          : [],
      planPath,
      rootTaskId: null,
      reachableTaskIds: [],
    };
  }

  const failures = [];
  let plan;
  try {
    plan = JSON.parse(readFileSync(planPath, "utf8"));
  } catch (error) {
    return {
      checked: true,
      failures: [
        `release plan is unreadable: ${error instanceof Error ? error.message : String(error)}`,
      ],
      planPath,
      rootTaskId: null,
      reachableTaskIds: [],
    };
  }

  if (plan?.schema_version !== 1) failures.push("schema_version must equal 1");
  const rootTaskId = String(plan?.root_task_id ?? "").trim();
  if (!rootTaskId) failures.push("root_task_id is required");
  const requiredTaskIds = normalizeStringList(
    plan?.required_task_ids,
    "required_task_ids",
    failures,
  );
  const optionalTaskIds = normalizeOptionalTasks(plan?.optional_tasks, failures);
  const required = new Set(requiredTaskIds);
  const optional = new Set(optionalTaskIds);

  if (required.has(rootTaskId) || optional.has(rootTaskId)) {
    failures.push(`release root ${rootTaskId} must not be classified as a dependency task`);
  }
  for (const taskId of required) {
    if (optional.has(taskId)) failures.push(`task ${taskId} is both required and optional`);
  }

  const graph = readTaskGraph(repoRoot);
  for (const taskId of [rootTaskId, ...requiredTaskIds, ...optionalTaskIds]) {
    if (taskId && !graph.has(taskId))
      failures.push(`release plan references unknown task ${taskId}`);
  }

  inspectRelevantGraph(graph, [rootTaskId, ...requiredTaskIds, ...optionalTaskIds], failures);
  const reachable = collectReachable(graph, rootTaskId);
  for (const taskId of requiredTaskIds) {
    if (!reachable.has(taskId)) {
      failures.push(
        `required task ${taskId} is not an ancestor of release root ${rootTaskId}; no dependency path exists from the root`,
      );
    }
  }
  for (const taskId of optionalTaskIds) {
    if (reachable.has(taskId)) {
      const dependencyPath = findDependencyPath(graph, rootTaskId, taskId);
      failures.push(
        `optional task ${taskId} is required by release root ${rootTaskId} in practice; path=${dependencyPath?.join(" -> ") ?? "unknown"}`,
      );
    }
  }
  for (const taskId of reachable) {
    if (taskId !== rootTaskId && !required.has(taskId) && !optional.has(taskId)) {
      const dependencyPath = findDependencyPath(graph, rootTaskId, taskId);
      failures.push(
        `release dependency ${taskId} is not classified as required or optional; path=${dependencyPath?.join(" -> ") ?? "unknown"}`,
      );
    }
  }

  return {
    checked: true,
    failures,
    planPath,
    rootTaskId,
    reachableTaskIds: [...reachable].toSorted((a, b) => a.localeCompare(b)),
  };
}
