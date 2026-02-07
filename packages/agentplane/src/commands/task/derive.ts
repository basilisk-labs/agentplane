import { mapBackendError } from "../../cli/error-map.js";
import { missingValueMessage, unknownEntityMessage, usageMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { extractDocSection, nowIso, toStringArray } from "./shared.js";

type TaskDeriveFlags = {
  spikeId: string;
  title?: string;
  description?: string;
  owner?: string;
  priority?: "low" | "normal" | "med" | "high";
  tags: string[];
};

export const TASK_DERIVE_USAGE =
  "Usage: agentplane task derive <spike-id> --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]";
export const TASK_DERIVE_USAGE_EXAMPLE =
  'agentplane task derive 202602070101-ABCD --title "Implement X" --description "Do the thing" --priority med --owner CODER --tag code';

function parseTaskDeriveFlags(args: string[]): TaskDeriveFlags {
  const [spikeId, ...rest] = args;
  if (!spikeId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DERIVE_USAGE, TASK_DERIVE_USAGE_EXAMPLE),
    });
  }

  const out: TaskDeriveFlags = { spikeId, tags: [] };
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unexpected argument: ${arg}`,
      });
    }
    const next = rest[i + 1];
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
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--priority": {
        out.priority = next as TaskDeriveFlags["priority"];
        break;
      }
      case "--tag": {
        out.tags.push(next);
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

function normalizeOneLine(text: string, maxChars: number): string {
  const normalized = text.trim().replaceAll(/\s+/g, " ");
  if (normalized.length <= maxChars) return normalized;
  return `${normalized.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}

export async function cmdTaskDerive(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskDeriveFlags(opts.args);
  const priority = flags.priority ?? "med";
  if (!flags.title || !flags.description || !flags.owner || flags.tags.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DERIVE_USAGE, TASK_DERIVE_USAGE_EXAMPLE),
    });
  }

  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (!ctx.taskBackend.generateTaskId) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "task backend does not support generateTaskId()",
      });
    }

    const spike = await ctx.taskBackend.getTask(flags.spikeId);
    if (!spike) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", flags.spikeId),
      });
    }
    const spikeTags = toStringArray(spike.tags).map((t) => t.trim().toLowerCase());
    if (!spikeTags.includes("spike")) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `${flags.spikeId}: expected tag spike (use --tag spike on the source task)`,
      });
    }

    const spikeDoc = typeof spike.doc === "string" ? spike.doc : "";
    const notes = extractDocSection(spikeDoc, "Notes") ?? "";
    const excerpt = notes.trim() ? normalizeOneLine(notes, 180) : "";

    const suffixLength = ctx.config.tasks.id_suffix_length_default;
    const taskId = await ctx.taskBackend.generateTaskId({ length: suffixLength, attempts: 1000 });

    let description = flags.description.trim();
    description = `${description} (derived from spike ${flags.spikeId})`;
    if (excerpt) description = `${description} [spike_notes: ${excerpt}]`;

    const at = nowIso();
    await ctx.taskBackend.writeTask({
      id: taskId,
      title: flags.title,
      description,
      status: "TODO",
      priority,
      owner: flags.owner,
      tags: flags.tags,
      depends_on: [flags.spikeId],
      verify: [],
      comments: [],
      doc_version: 2,
      doc_updated_at: at,
      doc_updated_by: flags.owner,
      id_source: "generated",
    });

    process.stdout.write(`${taskId}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task derive", root: opts.rootOverride ?? null });
  }
}
