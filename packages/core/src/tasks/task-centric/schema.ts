import { z } from "zod";
import { taskCentricDigest } from "./digest.js";
import { validateWorkItemGraph } from "./graph.js";
import type { RepositorySnapshot, Sha256Digest } from "./model.js";

const NON_EMPTY = z.string().trim().min(1);
const DIGEST = z.custom<Sha256Digest>(
  (value) => typeof value === "string" && /^sha256:[0-9a-f]{64}$/u.test(value),
  "Expected a SHA-256 digest.",
);
const ISO_DATE = z.string().datetime({ offset: true });

const ACCEPTANCE_CRITERION = z
  .object({
    id: NON_EMPTY,
    description: NON_EMPTY,
    required: z.boolean(),
    check_ids: z.array(NON_EMPTY),
  })
  .strict();

const VALIDATION_CHECK = z
  .object({
    id: NON_EMPTY,
    kind: z.enum(["structural", "deterministic", "semantic", "provider"]),
    required: z.boolean(),
    capability: NON_EMPTY,
    command: NON_EMPTY.optional(),
    timeout_ms: z.number().int().positive().optional(),
  })
  .strict();

const VALIDATION_PLAN = z
  .object({
    schema_version: z.literal(1),
    criteria: z.array(ACCEPTANCE_CRITERION),
    checks: z.array(VALIDATION_CHECK),
    evidence_fingerprint: DIGEST,
  })
  .strict();

const GIT_BASE_IDENTITY = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("commit"),
      sha: z
        .string()
        .regex(/^[0-9a-f]{40}$|^[0-9a-f]{64}$/u)
        .refine(
          (value) => !/^0+$/u.test(value),
          "A zero Git object id is not a repository baseline.",
        ),
      ref: z.string().nullable(),
    })
    .strict(),
  z.object({ kind: z.literal("unborn"), ref: z.string().nullable() }).strict(),
  z
    .object({
      kind: z.literal("unavailable"),
      reason_code: NON_EMPTY,
      detail: z.string().optional(),
    })
    .strict(),
]);

export const REPOSITORY_SNAPSHOT_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    digest: DIGEST,
    git: GIT_BASE_IDENTITY,
    dirty_paths: z.array(z.string()),
    policy_digest: DIGEST.nullable(),
    config_digest: DIGEST.nullable(),
    context_digest: DIGEST.nullable(),
    task_history_cursor: z.string().nullable(),
    captured_at: ISO_DATE,
  })
  .strict()
  .superRefine((value, ctx) => {
    const { digest, ...identity } = value;
    if (digest !== taskCentricDigest(identity)) {
      ctx.addIssue({
        code: "custom",
        path: ["digest"],
        message: "Repository snapshot digest does not match its canonical content.",
      });
    }
  });

const CONTEXT_SPEC = z
  .object({
    required_sources: z.array(NON_EMPTY),
    optional_sources: z.array(NON_EMPTY),
    symbol_hints: z.array(NON_EMPTY),
    max_bytes: z.number().int().positive(),
  })
  .strict();

const RESOURCE_CLAIM = z
  .object({
    kind: z.enum(["path", "workspace", "provider_queue", "exclusive"]),
    resource: NON_EMPTY,
    mode: z.enum(["read", "write", "exclusive"]),
  })
  .strict();

const WORK_ITEM = z
  .object({
    id: NON_EMPTY,
    objective: NON_EMPTY,
    depends_on: z.array(NON_EMPTY),
    required_inputs: z.array(NON_EMPTY),
    expected_outputs: z.array(NON_EMPTY),
    scope_roots: z.array(NON_EMPTY),
    acceptance_criteria: z.array(ACCEPTANCE_CRITERION).min(1),
    validation: VALIDATION_PLAN,
    context: CONTEXT_SPEC,
    risk: z.enum(["low", "medium", "high"]),
    capabilities: z.array(NON_EMPTY),
    resource_claims: z.array(RESOURCE_CLAIM),
    optional: z.boolean(),
    priority: z.number().int(),
  })
  .strict();

export const TASK_PLAN_PROPOSAL_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    task_id: NON_EMPTY,
    planning_baseline: REPOSITORY_SNAPSHOT_ZOD_SCHEMA,
    work_items: z
      .object({ schema_version: z.literal(1), work_items: z.array(WORK_ITEM).min(1) })
      .strict(),
    assumptions: z.array(z.string()),
    unresolved_questions: z.array(z.string()),
    top_level_validation: VALIDATION_PLAN,
  })
  .strict()
  .superRefine((value, ctx) => {
    for (const issue of validateWorkItemGraph(value.work_items)) {
      ctx.addIssue({
        code: "custom",
        path: issue.path.split("."),
        message: `${issue.code}: ${issue.message}`,
      });
    }
  });

export type ParsedTaskPlanProposal = z.infer<typeof TASK_PLAN_PROPOSAL_ZOD_SCHEMA>;

export function parseTaskPlanProposal(value: unknown): ParsedTaskPlanProposal {
  return TASK_PLAN_PROPOSAL_ZOD_SCHEMA.parse(value);
}

const VALIDATION_REFERENCES = z.strictObject({
  criterion_ids: z.array(NON_EMPTY).min(1),
  check_ids: z.array(NON_EMPTY).min(1),
});

// This is an input format. Persisted plans retain the complete v1 contract.
export const COMPACT_TASK_PLAN_PROPOSAL_ZOD_SCHEMA = z
  .strictObject({
    schema_version: z.literal(2),
    criteria: z.array(ACCEPTANCE_CRITERION).min(1),
    checks: z.array(VALIDATION_CHECK).min(1),
    work_items: z
      .array(
        WORK_ITEM.omit({ acceptance_criteria: true, validation: true }).extend({
          criterion_ids: z.array(NON_EMPTY).min(1).optional(),
          check_ids: z.array(NON_EMPTY).min(1).optional(),
        }),
      )
      .min(1),
    top_level_validation: VALIDATION_REFERENCES.optional(),
    assumptions: z.array(z.string()).default([]),
    unresolved_questions: z.array(z.string()).default([]),
  })
  .describe(
    "Define criteria and checks once. One WorkItem may omit criterion_ids, check_ids and top_level_validation to use all definitions. Multiple WorkItems must declare these references explicitly. The CLI supplies the task identity and issued repository baseline.",
  );

export function normalizeCompactTaskPlanProposal(
  value: unknown,
  context: { task_id: string; planning_baseline: RepositorySnapshot },
): ParsedTaskPlanProposal {
  const compact = COMPACT_TASK_PLAN_PROPOSAL_ZOD_SCHEMA.parse(value);
  function indexById<T extends { id: string }>(values: T[], label: string) {
    const byId = new Map<string, T>();
    for (const value of values) {
      if (byId.has(value.id)) throw new Error(`Duplicate ${label} id: ${value.id}`);
      byId.set(value.id, value);
    }
    return byId;
  }
  const criteria = indexById(compact.criteria, "criterion");
  const checks = indexById(compact.checks, "check");
  const usedCriteria = new Set<string>();
  const usedChecks = new Set<string>();
  function resolve<T>(
    ids: string[],
    entries: Map<string, T>,
    used: Set<string>,
    label: string,
  ): T[] {
    if (new Set(ids).size !== ids.length) throw new Error(`Duplicate ${label} reference`);
    return ids.map((id) => {
      const entry = entries.get(id);
      if (!entry) throw new Error(`Unknown ${label} reference: ${id}`);
      used.add(id);
      return entry;
    });
  }
  function validation(refs: { criterion_ids?: string[]; check_ids?: string[] }) {
    if (compact.work_items.length > 1 && (!refs.criterion_ids || !refs.check_ids))
      throw new Error("Multiple WorkItems require explicit validation references");
    const selectedCriteria = resolve(
      refs.criterion_ids ?? [...criteria.keys()],
      criteria,
      usedCriteria,
      "criterion",
    );
    const selectedChecks = resolve(
      refs.check_ids ?? [...checks.keys()],
      checks,
      usedChecks,
      "check",
    );
    const checkIds = new Set(selectedChecks.map((check) => check.id));
    for (const criterion of selectedCriteria) {
      if (criterion.check_ids.some((id) => !checkIds.has(id)))
        throw new Error(`Criterion ${criterion.id} references a check outside its validation plan`);
    }
    return {
      schema_version: 1 as const,
      criteria: selectedCriteria,
      checks: selectedChecks,
      evidence_fingerprint: context.planning_baseline.digest,
    };
  }
  const workItems = compact.work_items.map(({ criterion_ids, check_ids, ...item }) => {
    const plan = validation({ criterion_ids, check_ids });
    return { ...item, acceptance_criteria: plan.criteria, validation: plan };
  });
  const topLevel = validation(compact.top_level_validation ?? {});
  if (usedCriteria.size !== criteria.size || usedChecks.size !== checks.size)
    throw new Error("Compact plan contains unused criteria or checks");
  return TASK_PLAN_PROPOSAL_ZOD_SCHEMA.parse({
    schema_version: 1,
    task_id: context.task_id,
    planning_baseline: context.planning_baseline,
    work_items: { schema_version: 1, work_items: workItems },
    assumptions: compact.assumptions,
    unresolved_questions: compact.unresolved_questions,
    top_level_validation: topLevel,
  });
}
