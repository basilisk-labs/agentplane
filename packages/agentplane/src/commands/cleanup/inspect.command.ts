import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { inspectWorkspaceDisk } from "./inspect.js";

type CleanupInspectParsed = { json: boolean };

export const cleanupInspectSpec: CommandSpec<CleanupInspectParsed> = {
  id: ["cleanup", "inspect"],
  group: "Branch",
  summary: "Inspect local disk use and worktree cleanup eligibility without deleting files.",
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Print machine-readable inventory.",
    },
  ],
  examples: [
    { cmd: "agentplane cleanup inspect", why: "List worktree and nested repository sizes." },
    { cmd: "agentplane cleanup inspect --json", why: "Export a read-only inventory." },
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

function formatBytes(bytes: number | null): string {
  return bytes === null ? "unknown" : `${(bytes / 1024 ** 3).toFixed(2)} GiB`;
}

export function makeRunCleanupInspectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, p: CleanupInspectParsed): Promise<number> => {
    const ctx = await getCtx("cleanup inspect");
    const inventory = await inspectWorkspaceDisk({
      gitRoot: ctx.resolvedProject.gitRoot,
      worktreesDir: ctx.config.paths.worktrees_dir,
      taskPrefix: ctx.config.branch.task_prefix,
      taskStatus: async (taskId) => {
        const task = await ctx.taskBackend.getTask(taskId);
        return task?.status ?? null;
      },
    });
    if (p.json) {
      process.stdout.write(`${JSON.stringify(inventory, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(
      `.agentplane allocated: ${formatBytes(inventory.agentplane_allocated_bytes)}\n`,
    );
    for (const entry of inventory.entries) {
      process.stdout.write(
        `${formatBytes(entry.allocated_bytes)}  ${entry.kind}  ${entry.cleanup}  ${entry.reason}  ${entry.path}\n`,
      );
    }
    process.stdout.write(
      "proof_required means inspect with `agentplane cleanup merged`; it is not deletion approval.\n",
    );
    return 0;
  };
}
