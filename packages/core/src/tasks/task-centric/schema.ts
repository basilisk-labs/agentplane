import { z } from "zod";
import { taskCentricDigest } from "./digest.js";
import { validateWorkItemGraph } from "./graph.js";
import type { Sha256Digest } from "./model.js";

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
