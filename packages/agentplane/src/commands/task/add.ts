import { loadTaskBackend, type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { missingValueMessage, usageMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  dedupeStrings,
  normalizeDependsOnInput,
  normalizeTaskStatus,
  nowIso,
  requiresVerify,
} from "./shared.js";

export const TASK_ADD_USAGE =
  "Usage: agentplane task add <task-id> [<task-id> ...] --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]";
export const TASK_ADD_USAGE_EXAMPLE =
  'agentplane task add 202602030608-F1Q8AB --title "..." --description "..." --priority med --owner CODER --tag cli';

type TaskAddFlags = {
  taskIds: string[];
  title: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  commentAuthor?: string;
  commentBody?: string;
};

function parseTaskAddFlags(args: string[]): TaskAddFlags {
  const out: TaskAddFlags = {
    taskIds: [],
    title: "",
    description: "",
    status: "TODO",
    priority: "",
    owner: "",
    tags: [],
    dependsOn: [],
    verify: [],
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      out.taskIds.push(arg);
      continue;
    }
    const next = args[i + 1];
    if (arg === "--replace-tags" || arg === "--replace-depends-on" || arg === "--replace-verify") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_ADD_USAGE, TASK_ADD_USAGE_EXAMPLE),
      });
    }
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--status": {
        out.status = next;
        break;
      }
      case "--priority": {
        out.priority = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(...normalizeDependsOnInput(next));
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      case "--comment-author": {
        out.commentAuthor = next;
        break;
      }
      case "--comment-body": {
        out.commentBody = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }
    i++;
  }
  return out;
}

export async function cmdTaskAdd(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskAddFlags(opts.args);
  if (
    flags.taskIds.length === 0 ||
    !flags.title ||
    !flags.description ||
    !flags.priority ||
    !flags.owner ||
    flags.tags.length === 0
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_ADD_USAGE, TASK_ADD_USAGE_EXAMPLE),
    });
  }

  try {
    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const status = normalizeTaskStatus(flags.status);
    const existing = await backend.listTasks();
    const existingIds = new Set(existing.map((task) => task.id));
    for (const taskId of flags.taskIds) {
      if (existingIds.has(taskId)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task already exists: ${taskId}`,
        });
      }
    }

    const tags = dedupeStrings(flags.tags);
    const dependsOn = dedupeStrings(flags.dependsOn);
    const verify = dedupeStrings(flags.verify);
    const docUpdatedBy = (flags.commentAuthor ?? "").trim() || flags.owner;
    if (requiresVerify(tags, config.tasks.verify.required_tags) && verify.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "verify commands are required for tasks with code/backend/frontend tags",
      });
    }

    const tasks: TaskData[] = flags.taskIds.map((taskId) => ({
      id: taskId,
      title: flags.title,
      description: flags.description,
      status,
      priority: flags.priority,
      owner: flags.owner,
      tags,
      depends_on: dependsOn,
      verify,
      comments:
        flags.commentAuthor && flags.commentBody
          ? [{ author: flags.commentAuthor, body: flags.commentBody }]
          : [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: docUpdatedBy,
      id_source: "explicit",
    }));
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) {
        await backend.writeTask(task);
      }
    }
    for (const task of tasks) {
      process.stdout.write(`${task.id}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task add", root: opts.rootOverride ?? null });
  }
}
