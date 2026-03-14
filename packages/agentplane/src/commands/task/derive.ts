import { mapBackendError } from "../../cli/error-map.js";
import { unknownEntityMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { defaultTaskDocV3, TASK_DOC_VERSION_V3 } from "./doc-template.js";

import {
  extractTaskObservationSection,
  normalizeTaskDocVersion,
  nowIso,
  toStringArray,
} from "./shared.js";

function normalizeOneLine(text: string, maxChars: number): string {
  const normalized = text.trim().replaceAll(/\s+/g, " ");
  if (normalized.length <= maxChars) return normalized;
  return `${normalized.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}

export async function cmdTaskDerive(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  spikeId: string;
  title: string;
  description: string;
  owner: string;
  priority: "low" | "normal" | "med" | "high";
  tags: string[];
}): Promise<number> {
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

    const spike = await ctx.taskBackend.getTask(opts.spikeId);
    if (!spike) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", opts.spikeId),
      });
    }
    const spikeTags = toStringArray(spike.tags).map((t) => t.trim().toLowerCase());
    if (!spikeTags.includes("spike")) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `${opts.spikeId}: expected tag spike (use --tag spike on the source task)`,
      });
    }

    const spikeDoc = typeof spike.doc === "string" ? spike.doc : "";
    const observation =
      extractTaskObservationSection(spikeDoc, normalizeTaskDocVersion(spike.doc_version)) ?? "";
    const excerpt = observation.trim() ? normalizeOneLine(observation, 180) : "";

    const suffixLength = ctx.config.tasks.id_suffix_length_default;
    const taskId = await ctx.taskBackend.generateTaskId({ length: suffixLength, attempts: 1000 });

    let description = opts.description.trim();
    description = `${description} (derived from spike ${opts.spikeId})`;
    if (excerpt) description = `${description} [spike_notes: ${excerpt}]`;
    const doc = defaultTaskDocV3({ title: opts.title, description });

    const at = nowIso();
    await ctx.taskBackend.writeTask({
      id: taskId,
      title: opts.title,
      description,
      status: "TODO",
      priority: opts.priority,
      owner: opts.owner,
      tags: opts.tags,
      depends_on: [opts.spikeId],
      verify: [],
      comments: [],
      doc,
      doc_version: TASK_DOC_VERSION_V3,
      doc_updated_at: at,
      doc_updated_by: opts.owner,
      id_source: "generated",
    });

    process.stdout.write(`${taskId}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task derive", root: opts.rootOverride ?? null });
  }
}
