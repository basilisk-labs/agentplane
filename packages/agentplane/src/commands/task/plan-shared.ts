import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core/tasks";

import { backendNotSupportedMessage } from "../../cli/output.js";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import {
  assertVerifyStepsFilled,
  ensureAgentFilledRequiredDocSections,
  extractDocSection,
  extractTaskObservationSection,
  normalizeTaskDocVersion,
  requiresVerifyStepsByPrimary,
  taskObservationSectionName,
  toStringArray,
} from "./shared.js";

export type PlanBackend = CommandContext["taskBackend"] & {
  getTaskDoc: NonNullable<CommandContext["taskBackend"]["getTaskDoc"]>;
  writeTask: NonNullable<CommandContext["taskBackend"]["writeTask"]>;
};

export async function loadPlanBackend(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
}): Promise<{
  ctx: CommandContext;
  backend: PlanBackend;
}> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const backend = ctx.taskBackend;
  if (!backend.getTaskDoc || !backend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }
  return { ctx, backend: backend as PlanBackend };
}

function normalizeForComparison(text: string): string {
  return text.replaceAll("\r\n", "\n").trim();
}

export function buildPlanDocUpdate(opts: {
  currentDocRaw: string;
  text: string;
  requiredSections: string[];
}): {
  currentPlan: string;
  nextPlan: string;
  planChanged: boolean;
  docChanged: boolean;
  nextDoc: string;
} {
  const baseDoc = ensureDocSections(opts.currentDocRaw ?? "", opts.requiredSections);
  const currentPlan = extractDocSection(baseDoc, "Plan") ?? "";
  const planChanged = normalizeForComparison(currentPlan) !== normalizeForComparison(opts.text);
  const nextDoc = ensureDocSections(
    setMarkdownSection(baseDoc, "Plan", opts.text),
    opts.requiredSections,
  );
  return {
    currentPlan,
    nextPlan: extractDocSection(nextDoc, "Plan") ?? "",
    planChanged,
    docChanged: nextDoc !== baseDoc,
    nextDoc,
  };
}

export function assertPlanSectionPresent(
  taskId: string,
  doc: string,
  action: "approve" | "reject",
): void {
  const plan = extractDocSection(doc, "Plan");
  if (!plan || plan.trim().length === 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `${taskId}: cannot ${action} plan: ## Plan section is missing or empty`,
    });
  }
}

export function assertPlanCanBeApproved(opts: {
  task: TaskData;
  config: CommandContext["config"];
  doc: string;
}): void {
  assertPlanSectionPresent(opts.task.id, opts.doc, "approve");
  ensureAgentFilledRequiredDocSections({
    task: opts.task,
    config: opts.config,
    doc: opts.doc,
    action: "approve plan",
  });

  const enforceVerifySteps = opts.config.tasks.verify.enforce_on_plan_approve !== false;
  if (!enforceVerifySteps) return;

  const tags = toStringArray(opts.task.tags);
  const spikeTag = (opts.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
  const verifyRequired = requiresVerifyStepsByPrimary(tags, opts.config);
  const isSpike = tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
  if (verifyRequired || isSpike) {
    assertVerifyStepsFilled({
      taskId: opts.task.id,
      sectionText: extractDocSection(opts.doc, "Verify Steps"),
      action: "approve plan",
      guidance: "fill it before approving plan",
    });
  }
  if (!isSpike) return;

  const observationSection = taskObservationSectionName(
    normalizeTaskDocVersion(opts.task.doc_version),
  );
  const observation = extractTaskObservationSection(
    opts.doc,
    normalizeTaskDocVersion(opts.task.doc_version),
  );
  if (!observation || observation.trim().length === 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `${opts.task.id}: cannot approve plan for spike: ## ${observationSection} section is missing or empty ` +
        "(include Findings/Decision/Next Steps)",
    });
  }
}
