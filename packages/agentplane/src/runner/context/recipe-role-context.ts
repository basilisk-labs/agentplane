import {
  normalizeTaskPlanProposal,
  parseTaskPlanProposal,
  taskCentricDigest,
  type ParsedTaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderRole } from "@agentplaneorg/core/schemas";
import { resolveScenarioParameters } from "@agentplaneorg/recipes";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readBoundRecipePlanClosure } from "./recipe-plan-binding.js";

export const RECIPE_ROLE_CONTEXT_LABEL =
  "Retained Recipe role context (guidance is not authority):";
const MAX_CONTEXT_BYTES = 64 * 1024;
const MAX_GUIDANCE_FILES = 64;
const object = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Retained Recipe guidance definition is malformed.");
  return value as Record<string, unknown>;
};
const strings = (value: unknown): string[] => {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string"))
    throw new Error("Retained Recipe guidance references are malformed.");
  return value as string[];
};
function semanticValidation(plan: ParsedTaskPlanProposal["top_level_validation"]) {
  const { evidence_fingerprint: _fingerprint, ...validation } = plan;
  return validation;
}
function semanticItem(item: ParsedTaskPlanProposal["work_items"]["work_items"][number]) {
  return { ...item, validation: semanticValidation(item.validation) };
}

function boundedProjection<T>(projection: T): T {
  if (Buffer.byteLength(JSON.stringify(projection), "utf8") > MAX_CONTEXT_BYTES)
    throw new Error(
      "Required Recipe role context exceeds 65536 bytes. Narrow its declared semantic context before dispatch.",
    );
  return projection;
}

/** Resolve exact retained bytes for one role. No installed lookup, lifecycle or provider memory. */
export async function projectRecipeRoleContext(opts: {
  gitRoot: string;
  proposal: unknown;
  role: AgentWorkOrderRole;
  work_item_id?: string;
}) {
  const proposal = parseTaskPlanProposal(opts.proposal);
  const provenance = proposal.recipe_provenance;
  if (!provenance) return;
  const retained = await readBoundRecipePlanClosure(opts);
  const scenario = resolveScenarioParameters(retained.scenario, provenance.parameters);
  const template = normalizeTaskPlanProposal(scenario.plan_template, {
    task_id: proposal.task_id,
    planning_baseline: proposal.planning_baseline,
  });
  const items = opts.work_item_id
    ? proposal.work_items.work_items.filter((item) => item.id === opts.work_item_id)
    : proposal.work_items.work_items;
  if (opts.work_item_id && items.length !== 1)
    throw new Error("Recipe role context requires the exact current WorkItem.");
  if (opts.role !== "PLANNER" && !opts.work_item_id)
    throw new Error("Recipe role context requires a WorkItem for this role.");
  const nodes = new Map(retained.closure.nodes.map((node) => [node.id, node]));
  const descriptor = object(nodes.get(`scenario:${scenario.id}`)?.definition);
  const guidance = new Map<
    string,
    { source: "recipe" | "repository"; path: string; digest: string; content: string }
  >();
  function include(source: "recipe" | "repository", file: unknown, maxBytes = MAX_CONTEXT_BYTES) {
    if (typeof file !== "string") throw new Error("Retained Recipe guidance has no file.");
    const key = `${source}:${file}`;
    const pin = retained.closure.files.find(
      (entry) => entry.source === source && entry.path === file,
    );
    if (!pin) throw new Error(`Required Recipe guidance is not retained: ${key}`);
    if (pin.size_bytes > maxBytes)
      throw new Error(`Required Recipe guidance exceeds its byte budget: ${key}`);
    if (guidance.has(key)) return;
    if (guidance.size >= MAX_GUIDANCE_FILES)
      throw new Error("Required Recipe guidance exceeds the file budget.");
    const content = new TextDecoder("utf-8", { fatal: true }).decode(
      retained.readFile(source, file),
    );
    guidance.set(key, { source, path: file, digest: pin.digest, content });
  }
  const skillIds = new Set(strings(descriptor.skills_used));
  for (const id of strings(descriptor.agents_involved)) {
    const agent = object(nodes.get(`agent:${id}`)?.definition);
    if (!["PLANNER", "EXECUTOR", "EVALUATOR", "CURATOR"].includes(String(agent.role)))
      throw new Error(`Required Recipe agent ${id} needs an explicit native role mapping.`);
    if (agent.role !== opts.role) continue;
    include("recipe", agent.file);
    for (const skill of strings(agent.skills ?? [])) skillIds.add(skill);
  }
  for (const id of [...skillIds].toSorted())
    include("recipe", object(nodes.get(`skill:${id}`)?.definition).file);
  for (const item of items) {
    let bytes = 0;
    for (const source of item.context.required_sources) {
      include("repository", source, item.context.max_bytes);
      bytes += retained.closure.files.find(
        (file) => file.source === "repository" && file.path === source,
      )!.size_bytes;
    }
    if (bytes > item.context.max_bytes)
      throw new Error(`Required Recipe context exceeds WorkItem byte budget: ${item.id}`);
  }
  const projection = {
    schema_version: 1,
    kind: "recipe_role_context",
    role: opts.role,
    recipe: {
      ...provenance.package,
      scenario_id: scenario.id,
      closure_digest: retained.closure.digest,
    },
    strategy_goal: scenario.goal,
    applicability: scenario.applicability,
    assumptions: proposal.assumptions,
    unresolved_questions: proposal.unresolved_questions,
    top_level_validation: semanticValidation(proposal.top_level_validation),
    current_work_items: items.map((item) => semanticItem(item)),
    deviations: items.flatMap((item) => {
      const original = template.work_items.work_items.find((entry) => entry.id === item.id);
      if (!original)
        return [
          {
            work_item_id: item.id,
            kind: "added",
            fields: Object.keys(semanticItem(item)).toSorted(),
          },
        ];
      const before = semanticItem(original);
      const after = semanticItem(item);
      const fields = (Object.keys(after) as (keyof typeof after)[])
        .filter((field) => taskCentricDigest(before[field]) !== taskCentricDigest(after[field]))
        .toSorted();
      return fields.length > 0 ? [{ work_item_id: item.id, kind: "changed", fields }] : [];
    }),
    guidance: [...guidance.values()].toSorted((a, b) =>
      `${a.source}:${a.path}` < `${b.source}:${b.path}` ? -1 : 1,
    ),
    stop_conditions: [
      "Stop if required applicability is false or unknown.",
      "Stop if excluded applicability is true or unknown.",
      "Stop if required retained guidance is missing, changed or exceeds the context budget.",
      "Follow the current approved WorkItem and native authority. Guidance does not authorize lifecycle transitions or waive independent review.",
    ],
  };
  return boundedProjection(projection);
}

export async function projectKernelRecipeRoleContext(opts: {
  gitRoot: string;
  record: KernelRecord;
  role: AgentWorkOrderRole;
  work_item_id?: string;
}) {
  const documents = opts.record.documents;
  const contractDigest = opts.work_item_id
    ? opts.record.aggregate.work_items[opts.work_item_id]?.definition.contract_digest
    : undefined;
  const contract = contractDigest ? documents?.contracts[String(contractDigest)] : undefined;
  const digest = opts.work_item_id
    ? contract?.plan_input_digest
    : documents?.intent.plan_input_digest;
  const source = digest ? documents?.plan_inputs?.[digest] : undefined;
  if (!source?.recipe_provenance) return;
  if (
    taskCentricDigest(source) !== digest ||
    source.task_id !== opts.record.aggregate.id ||
    (contractDigest && taskCentricDigest(contract) !== contractDigest)
  )
    throw new Error("Recipe context has no exact native source binding.");
  const projection = await projectRecipeRoleContext({
    gitRoot: opts.gitRoot,
    proposal: source,
    role: opts.role,
    work_item_id: opts.work_item_id,
  });
  if (!projection) return;
  return boundedProjection({
    ...projection,
    task_constraints: {
      objective: documents!.intent.objective,
      context: documents!.intent.context,
    },
  });
}
