import path from "node:path";
import { setMarkdownSection } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import {
  TASK_DOC_VERSION_V3,
  buildDefaultVerifyStepsSection,
  defaultTaskDocV3,
} from "../../commands/task/doc-template.js";
import {
  createClarificationContract,
  createTaskGraphDraft,
  createTaskIntakeContext,
  materializeTaskGraphDraft,
} from "../../runtime/task-intake/index.js";
import { buildTaskDocState } from "../../task-doc/state.js";
import { dedupeStrings } from "../../shared/strings.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import { createRunnerRunId } from "../task-run-paths.js";
import type { RunnerRecipeContext } from "../types.js";
import {
  assembleRunnerRecipeContext,
  type RunnerRecipeContextEnvelope,
} from "../context/recipe-context.js";

export type MaterializedRecipeScenarioTask = {
  task: TaskData;
  task_id: string;
  run_id: string;
  readme_path: string;
  recipe_context: RunnerRecipeContext;
  selection: RunnerRecipeContextEnvelope["selection"];
  scenario: RunnerRecipeContextEnvelope["scenario"];
  entry: RunnerRecipeContextEnvelope["entry"];
};

function nowIso(): string {
  return new Date().toISOString();
}

function seedRecipeTaskSummary(opts: RunnerRecipeContextEnvelope): string {
  const seeded = opts.scenario.task_template.doc?.summary?.trim();
  if (seeded) return seeded;
  return [
    opts.scenario.task_template.title,
    "",
    opts.scenario.task_template.description,
    "",
    `Recipe: ${opts.selection.recipe_id}:${opts.selection.scenario_id}@${opts.selection.recipe_version}`,
    `Goal: ${opts.scenario.goal}`,
  ].join("\n");
}

function seedRecipeTaskScope(opts: RunnerRecipeContextEnvelope): string {
  const seeded = opts.scenario.task_template.doc?.scope?.trim();
  if (seeded) return seeded;
  const requiredInputs = opts.selection.required_inputs;
  const outputs = opts.selection.outputs;
  return [
    `- In scope: execute recipe scenario "${opts.selection.recipe_id}:${opts.selection.scenario_id}" to achieve "${opts.scenario.goal}".`,
    `- Required inputs: ${requiredInputs.length > 0 ? requiredInputs.join(", ") : "none declared"}.`,
    `- Expected outputs: ${outputs.length > 0 ? outputs.join(", ") : "none declared"}.`,
    "- Out of scope: work outside the scenario's declared goal, outputs, and artifacts.",
  ].join("\n");
}

function seedRecipeTaskPlan(opts: RunnerRecipeContextEnvelope): string {
  const seeded = opts.scenario.task_template.doc?.plan?.trim();
  if (seeded) return seeded;
  return [
    `1. Resolve the inputs and dependencies for "${opts.selection.recipe_id}:${opts.selection.scenario_id}".`,
    `2. Execute the scenario goal: ${opts.scenario.goal}`,
    "3. Capture the declared outputs/artifacts and verification evidence in the task record.",
  ].join("\n");
}

function seedRecipeTaskVerifySteps(opts: RunnerRecipeContextEnvelope): string {
  const seeded = opts.scenario.task_template.doc?.verify_steps?.trim();
  if (seeded) return seeded;
  const primary = opts.scenario.task_template.tags?.[0] ?? "recipes";
  return buildDefaultVerifyStepsSection({
    primary,
    verifyCommands: dedupeStrings(opts.scenario.task_template.verify ?? []),
  });
}

function seedRecipeTaskRollbackPlan(opts: RunnerRecipeContextEnvelope): string {
  const seeded = opts.scenario.task_template.doc?.rollback_plan?.trim();
  if (seeded) return seeded;
  return [
    `- Revert the task created from recipe scenario "${opts.selection.recipe_id}:${opts.selection.scenario_id}".`,
    "- Remove any runner artifacts produced by the scenario run if they are no longer needed.",
    "- Re-run the relevant validation step to confirm the rollback restored the previous state.",
  ].join("\n");
}

function seedRecipeTaskDoc(opts: RunnerRecipeContextEnvelope): string {
  let body = defaultTaskDocV3({
    title: opts.scenario.task_template.title,
    description: opts.scenario.task_template.description,
  });
  body = setMarkdownSection(body, "Summary", seedRecipeTaskSummary(opts));
  body = setMarkdownSection(body, "Scope", seedRecipeTaskScope(opts));
  body = setMarkdownSection(body, "Plan", seedRecipeTaskPlan(opts));
  body = setMarkdownSection(body, "Verify Steps", seedRecipeTaskVerifySteps(opts));
  body = setMarkdownSection(body, "Rollback Plan", seedRecipeTaskRollbackPlan(opts));
  body = setMarkdownSection(
    body,
    "Findings",
    opts.scenario.task_template.doc?.findings?.trim() ?? "",
  );
  return body;
}

export function buildMaterializedRecipeTask(opts: {
  envelope: RunnerRecipeContextEnvelope;
  task_id: string;
  run_id: string;
  created_at?: string;
}): TaskData {
  const created_at = opts.created_at ?? nowIso();
  const taskTemplate = opts.envelope.scenario.task_template;
  const docState = buildTaskDocState({
    doc: seedRecipeTaskDoc(opts.envelope),
    owner: taskTemplate.owner,
    updatedBy: taskTemplate.owner,
    version: TASK_DOC_VERSION_V3,
    updatedAt: created_at,
  });
  return {
    id: opts.task_id,
    title: taskTemplate.title,
    description: taskTemplate.description,
    status: "TODO",
    priority: taskTemplate.priority ?? "med",
    owner: taskTemplate.owner,
    revision: 1,
    origin: {
      system: "recipe",
      recipe_id: opts.envelope.selection.recipe_id,
      scenario_id: opts.envelope.selection.scenario_id,
      recipe_version: opts.envelope.selection.recipe_version,
      run_id: opts.run_id,
    },
    depends_on: [],
    tags: dedupeStrings(taskTemplate.tags ?? ["recipes"]),
    verify: dedupeStrings(taskTemplate.verify ?? []),
    comments: [],
    events: [],
    doc_version: docState.doc_version,
    doc_updated_at: docState.doc_updated_at,
    doc_updated_by: docState.doc_updated_by,
    id_source: "generated",
    doc: docState.doc,
    sections: docState.sections,
  };
}

export async function materializeRecipeScenarioTask(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  recipe_id: string;
  scenario_id: string;
  run_id?: string;
}): Promise<MaterializedRecipeScenarioTask> {
  const command =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const executionContext = await makeReadOnlyExecutionContext(command);
  if (!executionContext.backend.task_backend.generateTaskId) {
    throw new Error("Backend does not support task materialization: missing generateTaskId()");
  }

  const envelope = await assembleRunnerRecipeContext({
    project: executionContext.project,
    recipe_id: opts.recipe_id,
    scenario_id: opts.scenario_id,
  });
  const task_id = await executionContext.backend.task_backend.generateTaskId({
    length: executionContext.config.tasks.id_suffix_length_default,
    attempts: 1000,
  });
  const run_id = opts.run_id ?? createRunnerRunId();
  const createdAt = nowIso();
  const recipeLabel = `${envelope.selection.recipe_id}:${envelope.selection.scenario_id}@${envelope.selection.recipe_version}`;
  const intakeContext = createTaskIntakeContext({
    runtime: executionContext.taskIntake,
    source: {
      id: "recipe_scenario",
      detail: `${envelope.selection.recipe_id}:${envelope.selection.scenario_id}`,
    },
    requested_outcome: envelope.scenario.goal,
    requested_owner: envelope.scenario.task_template.owner,
    requested_tags: envelope.scenario.task_template.tags ?? ["recipes"],
    requested_verify: envelope.scenario.task_template.verify ?? [],
    inputs: [
      {
        kind: "recipe_reference",
        label: "recipe",
        value: recipeLabel,
        required: true,
      },
      ...envelope.selection.required_inputs.map((input) => ({
        kind: "constraint" as const,
        label: "required_input",
        value: input,
        required: true,
      })),
      ...envelope.selection.outputs.map((output) => ({
        kind: "output" as const,
        label: "declared_output",
        value: output,
      })),
    ],
  });
  const clarification = createClarificationContract({
    context: intakeContext,
  });
  const draft = createTaskGraphDraft({
    context: intakeContext,
    clarification,
    summary: envelope.scenario.goal,
    tasks: [
      {
        draft_id: envelope.selection.scenario_id,
        title: envelope.scenario.task_template.title,
        description: envelope.scenario.task_template.description,
        owner: envelope.scenario.task_template.owner,
        priority: envelope.scenario.task_template.priority ?? "med",
        origin: {
          system: "recipe",
          recipe_id: envelope.selection.recipe_id,
          scenario_id: envelope.selection.scenario_id,
          recipe_version: envelope.selection.recipe_version,
          run_id,
        },
        tags: dedupeStrings(envelope.scenario.task_template.tags ?? ["recipes"]),
        depends_on: [],
        verify: dedupeStrings(envelope.scenario.task_template.verify ?? []),
        doc: seedRecipeTaskDoc(envelope),
        doc_version: TASK_DOC_VERSION_V3,
        id_source: "generated",
      },
    ],
  });
  const materialization = await materializeTaskGraphDraft({
    draft,
    task_ids: {
      [envelope.selection.scenario_id]: task_id,
    },
    created_at: createdAt,
  });
  const task = materialization.tasks[0]?.task;
  if (!task) throw new Error("Task intake materialization unexpectedly produced no tasks.");
  await executionContext.backend.task_backend.writeTask(task);

  return {
    task,
    task_id,
    run_id,
    readme_path: path.join(
      executionContext.repo.git_root,
      executionContext.repo.workflow_dir,
      task_id,
      "README.md",
    ),
    recipe_context: envelope.recipe,
    selection: envelope.selection,
    scenario: envelope.scenario,
    entry: envelope.entry,
  };
}
