import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { loadEvaluatorCatalog } from "../../evaluators/catalog.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import { cmdTaskAdd } from "../workflow.js";

import {
  prepareEvaluatorReview,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";

export const execFileAsync = promisify(execFile);

export async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Task",
    description: "Desc",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
}

export async function commitPath(
  root: string,
  relPath: string,
  content: string,
  message: string,
): Promise<string> {
  const target = path.join(root, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
  await execFileAsync("git", ["add", "--", relPath], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

export async function freezeTaskExecutionBase(root: string, taskId: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const baseSha = stdout.trim();
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  await applyTaskMutation({
    ctx,
    taskId,
    build: (current) => ({
      intents: setTaskFieldsIntent({
        extensions: {
          ...current.extensions,
          task_execution_context: { base_ref: "main", base_sha: baseSha },
        },
      }),
    }),
  });
  await execFileAsync("git", ["add", "--", `.agentplane/tasks/${taskId}/README.md`], {
    cwd: root,
  });
  await execFileAsync("git", ["commit", "-m", `test: freeze ${taskId} execution base`], {
    cwd: root,
  });
  return baseSha;
}

export async function prepareTypedReview(
  root: string,
  taskId: string,
  opts?: { at?: string },
): Promise<{
  command: Awaited<ReturnType<typeof loadCommandContext>>;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  prepared: PreparedEvaluatorReview;
}> {
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await loadTaskFromContext({ ctx: command, taskId });
  const catalog = await loadEvaluatorCatalog({ projectRoot: root, includeBuiltin: true });
  const evaluator = catalog.find((entry) => entry.id === "recovery-context");
  if (!evaluator) throw new Error("Missing recovery-context evaluator fixture.");
  return {
    command,
    task,
    prepared: await prepareEvaluatorReview({
      ctx: command,
      task,
      evaluator,
      provenance: "evaluator_supplied",
      ...(opts?.at ? { at: opts.at } : {}),
    }),
  };
}
