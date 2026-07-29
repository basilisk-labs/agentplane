import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { loadEvaluatorCatalog } from "../../evaluators/catalog.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
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

export async function prepareTypedReview(
  root: string,
  taskId: string,
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
    }),
  };
}
