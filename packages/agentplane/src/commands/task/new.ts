import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, warnMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import {
  ensureTaskDependsOnGraphIsAcyclic,
  nowIso,
  requiresVerifyStepsByPrimary,
  resolvePrimaryTag,
  warnIfUnknownOwner,
} from "./shared.js";

export type TaskNewParsed = {
  title: string;
  description: string;
  owner: string;
  priority: "low" | "normal" | "med" | "high";
  tags: string[];
  dependsOn: string[];
  verify: string[];
};

function dedupeTrimmed(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const value = String(raw ?? "").trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

function sanitizeTaskNewParsed(p: TaskNewParsed): TaskNewParsed {
  const title = p.title.trim();
  if (!title)
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --title: empty.",
    });
  const description = p.description.trim();
  if (!description) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --description: empty.",
    });
  }
  const owner = p.owner.trim();
  if (!owner)
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --owner: empty.",
    });
  const tags = dedupeTrimmed(p.tags);
  if (tags.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --tag: provide at least one non-empty tag.",
    });
  }
  const dependsOn = dedupeTrimmed(p.dependsOn);
  const verify = dedupeTrimmed(p.verify);

  return { ...p, title, description, owner, tags, dependsOn, verify };
}

function insertMarkdownSectionBefore(opts: {
  body: string;
  section: string;
  text: string;
  beforeSection: string;
}): string {
  const normalized = opts.body.replaceAll("\r\n", "\n");
  if (normalized.includes(`## ${opts.section}`)) {
    return setMarkdownSection(normalized, opts.section, opts.text);
  }

  const lines = normalized.split("\n");
  const beforeHeading = `## ${opts.beforeSection}`;
  const beforeIdx = lines.findIndex((line) => line.trim() === beforeHeading);
  if (beforeIdx === -1) return setMarkdownSection(normalized, opts.section, opts.text);

  const textLines = opts.text.replaceAll("\r\n", "\n").split("\n");
  const sectionLines = [`## ${opts.section}`, "", ...textLines, "", ""];
  const out = [...lines.slice(0, beforeIdx), ...sectionLines, ...lines.slice(beforeIdx)];
  return `${out.join("\n").trimEnd()}\n`;
}

function defaultTaskDoc(requiredSections: string[]): string {
  const verifyStepsTemplate = [
    "<!-- TODO: FILL VERIFY STEPS -->",
    "",
    "### Scope",
    "",
    "",
    "### Checks",
    "",
    "",
    "### Evidence / Commands",
    "",
    "",
    "### Pass criteria",
    "",
    "",
  ].join("\n");
  const verificationTemplate = [
    "### Plan",
    "",
    "",
    "### Results",
    "",
    "",
    "<!-- BEGIN VERIFICATION RESULTS -->",
    "<!-- END VERIFICATION RESULTS -->",
  ].join("\n");

  const baseDoc = ensureDocSections("", requiredSections);
  const withVerifySteps = insertMarkdownSectionBefore({
    body: baseDoc,
    section: "Verify Steps",
    text: verifyStepsTemplate,
    beforeSection: "Verification",
  });
  return setMarkdownSection(withVerifySteps, "Verification", verificationTemplate);
}

function buildDefaultVerifyStepsSection(opts: {
  primary: string;
  verifyCommands: string[];
}): string {
  const checks =
    opts.verifyCommands.length > 0
      ? opts.verifyCommands.map((command) => `- \`${command}\``).join("\n")
      : "- Add explicit checks/commands for this task before approval.";
  return [
    "### Scope",
    `- Primary tag: \`${opts.primary}\``,
    "",
    "### Checks",
    checks,
    "",
    "### Evidence / Commands",
    "- Record executed commands and key outputs.",
    "",
    "### Pass criteria",
    "- Steps are reproducible and produce expected results.",
    "",
  ].join("\n");
}

export async function runTaskNewParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: TaskNewParsed;
}): Promise<number> {
  const p = sanitizeTaskNewParsed(opts.parsed);
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const suffixLength = ctx.config.tasks.id_suffix_length_default;
    if (!ctx.taskBackend.generateTaskId) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("generateTaskId()"),
      });
    }
    const taskId = await ctx.taskBackend.generateTaskId({ length: suffixLength, attempts: 1000 });
    const task: TaskData = {
      id: taskId,
      title: p.title,
      description: p.description,
      status: "TODO",
      priority: p.priority,
      owner: p.owner,
      tags: p.tags,
      depends_on: p.dependsOn,
      verify: p.verify,
      comments: [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: p.owner,
      id_source: "generated",
      doc: defaultTaskDoc(ctx.config.tasks.doc.required_sections),
    };

    const spikeTag = (ctx.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
    const primary = resolvePrimaryTag(p.tags, ctx);
    if (primary.usedFallback) {
      process.stderr.write(
        `${warnMessage(
          `primary tag not found in task tags; using fallback primary=${primary.primary}`,
        )}\n`,
      );
    }
    const requiresVerifySteps = requiresVerifyStepsByPrimary(p.tags, ctx.config);
    await warnIfUnknownOwner(ctx, p.owner);
    await ensureTaskDependsOnGraphIsAcyclic({
      backend: ctx.taskBackend,
      taskId,
      dependsOn: p.dependsOn,
    });
    if (requiresVerifySteps) {
      task.doc = setMarkdownSection(
        task.doc ?? "",
        "Verify Steps",
        buildDefaultVerifyStepsSection({
          primary: primary.primary,
          verifyCommands: p.verify,
        }),
      );
      process.stderr.write(
        `${warnMessage(
          "task requires Verify Steps by primary tag; seeded a default ## Verify Steps section in README (review and refine before approval/start)",
        )}\n`,
      );
    }
    const hasSpike = p.tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
    const hasImplementationTags = requiresVerifyStepsByPrimary(p.tags, ctx.config);
    if (hasSpike && hasImplementationTags) {
      process.stderr.write(
        `${warnMessage(
          "spike is combined with a primary tag that requires verify steps; consider splitting spike vs implementation tasks",
        )}\n`,
      );
    }

    await ctx.taskBackend.writeTask(task);
    process.stdout.write(`${taskId}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task new", root: opts.rootOverride ?? null });
  }
}
