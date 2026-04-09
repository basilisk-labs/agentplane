import {
  ensureDocSections,
  normalizeTaskDoc,
  setMarkdownSection,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import type { TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import {
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
  type TaskStoreIntent,
} from "../shared/task-store.js";

import { resolveWritableDocSections } from "./shared.js";
import {
  extractDocSection,
  extractTaskObservationSection,
  normalizeTaskDocVersion,
  taskObservationSectionName,
} from "./shared/docs.js";

function ensureNonEmptyFlag(name: string, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Invalid value for --${name}: empty.`,
    });
  }
  return trimmed;
}

function dedupeTrimmed(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

export function renderStructuredFindingBlock(opts: {
  observation: string;
  impact: string;
  resolution: string;
  promote: boolean;
  external: boolean;
  incidentScope?: string;
  incidentTags: readonly string[];
  incidentMatch: readonly string[];
  incidentAdvice?: string;
  incidentRule?: string;
}): string {
  const lines = [
    `- Observation: ${ensureNonEmptyFlag("observation", opts.observation)}`,
    `  Impact: ${ensureNonEmptyFlag("impact", opts.impact)}`,
    `  Resolution: ${ensureNonEmptyFlag("resolution", opts.resolution)}`,
  ];
  if (opts.promote) lines.push("  Promotion: incident-candidate");
  if (opts.external) lines.push("  Fixability: external");
  if (opts.incidentScope?.trim()) lines.push(`  IncidentScope: ${opts.incidentScope.trim()}`);
  const tags = dedupeTrimmed(opts.incidentTags);
  if (tags.length > 0) lines.push(`  IncidentTags: ${tags.join(", ")}`);
  const match = dedupeTrimmed(opts.incidentMatch);
  if (match.length > 0) lines.push(`  IncidentMatch: ${match.join(", ")}`);
  if (opts.incidentAdvice?.trim()) lines.push(`  IncidentAdvice: ${opts.incidentAdvice.trim()}`);
  if (opts.incidentRule?.trim()) lines.push(`  IncidentRule: ${opts.incidentRule.trim()}`);
  return lines.join("\n");
}

function appendFindingBlock(existingSection: string | null, block: string): string {
  const current = (existingSection ?? "").trim();
  if (!current) return block;
  return `${current}\n\n${block}`;
}

export type StructuredFindingMutationPlan = {
  targetSection: string;
  expectedCurrentText: string | null;
  intents: readonly TaskStoreIntent[];
};

export function buildStructuredFindingMutationPlan(opts: {
  current: TaskData;
  config: AgentplaneConfig;
  observation: string;
  impact: string;
  resolution: string;
  promote: boolean;
  external: boolean;
  incidentScope?: string;
  incidentTags: readonly string[];
  incidentMatch: readonly string[];
  incidentAdvice?: string;
  incidentRule?: string;
  updatedBy?: string;
}): StructuredFindingMutationPlan | null {
  const currentDocRaw = typeof opts.current.doc === "string" ? opts.current.doc : "";
  const docVersion = normalizeTaskDocVersion(opts.current.doc_version);
  const targetSection = taskObservationSectionName(docVersion);
  const sectionOrder = resolveWritableDocSections({
    allowedSections: opts.config.tasks.doc.sections,
    requiredSections: opts.config.tasks.doc.required_sections,
    targetSection,
  });
  const existingSection = extractTaskObservationSection(currentDocRaw, docVersion);
  const block = renderStructuredFindingBlock({
    observation: opts.observation,
    impact: opts.impact,
    resolution: opts.resolution,
    promote: opts.promote,
    external: opts.external,
    incidentScope: opts.incidentScope,
    incidentTags: opts.incidentTags,
    incidentMatch: opts.incidentMatch,
    incidentAdvice: opts.incidentAdvice,
    incidentRule: opts.incidentRule,
  });
  const nextSectionText = appendFindingBlock(existingSection, block);
  const nextDoc = ensureDocSections(
    setMarkdownSection(currentDocRaw, targetSection, nextSectionText),
    sectionOrder,
  );
  if (normalizeTaskDoc(currentDocRaw) === normalizeTaskDoc(nextDoc) && !opts.updatedBy) {
    return null;
  }
  const expectedCurrentText = extractDocSection(currentDocRaw, targetSection);
  const intents: TaskStoreIntent[] = [
    setTaskSectionIntent({
      section: targetSection,
      text: nextSectionText,
      requiredSections: sectionOrder,
      expectedCurrentText,
    }),
    ...(opts.updatedBy ? [touchTaskDocMetaIntent({ updatedBy: opts.updatedBy })] : []),
  ];
  return { targetSection, expectedCurrentText, intents };
}

export function renderFindingsAddRegistryNote(opts: {
  promote: boolean;
  external: boolean;
  taskId: string;
  branchPr?: boolean;
}): string {
  if (opts.promote && opts.external) {
    if (opts.branchPr) {
      return (
        `incident candidate recorded for ${opts.taskId}; ` +
        "incidents.md updates later during finish or `agentplane incidents collect <task-id>`; task-local until base-branch promotion in the current task worktree"
      );
    }
    return (
      `incident candidate recorded for ${opts.taskId}; ` +
      "incidents.md updates later during finish or `agentplane incidents collect <task-id>`; task-local in the current checkout until promotion"
    );
  }
  return `task-local finding recorded for ${opts.taskId}; incidents.md unchanged in the current checkout`;
}

export async function cmdTaskFindingsAdd(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  observation: string;
  impact: string;
  resolution: string;
  promote: boolean;
  external: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  updatedBy?: string;
}): Promise<number> {
  let updatedBy: string | undefined;
  if (opts.updatedBy !== undefined) {
    updatedBy = ensureNonEmptyFlag("updated-by", opts.updatedBy);
  }

  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const config = ctx.config;
    const resolved = ctx.resolvedProject;
    if (!backend.getTaskDoc || !backend.writeTask) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Configured task backend does not support task docs.",
      });
    }

    let targetSection = "Findings";
    await applyTaskMutation({
      ctx,
      taskId: opts.taskId,
      build: (current) => {
        const plan = buildStructuredFindingMutationPlan({
          current,
          config,
          observation: opts.observation,
          impact: opts.impact,
          resolution: opts.resolution,
          promote: opts.promote,
          external: opts.external,
          incidentScope: opts.incidentScope,
          incidentTags: opts.incidentTags,
          incidentMatch: opts.incidentMatch,
          incidentAdvice: opts.incidentAdvice,
          incidentRule: opts.incidentRule,
          updatedBy,
        });
        if (!plan) {
          return null;
        }
        targetSection = plan.targetSection;
        return {
          intents: plan.intents,
          writeOptions: {
            expectedCurrentText: plan.expectedCurrentText,
            expectedSection: targetSection,
          },
        };
      },
    });

    const tasksDir = `${resolved.gitRoot}/${config.paths.workflow_dir}`;
    process.stdout.write(`${tasksDir}/${opts.taskId}/README.md\n`);
    process.stderr.write(
      `${infoMessage(`task findings add outcome=entry-appended section=${targetSection}`)}\n`,
    );
    process.stderr.write(
      `${infoMessage(
        renderFindingsAddRegistryNote({
          promote: opts.promote,
          external: opts.external,
          taskId: opts.taskId,
          branchPr: config.workflow_mode === "branch_pr",
        }),
      )}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task findings add", root: opts.rootOverride ?? null });
  }
}
