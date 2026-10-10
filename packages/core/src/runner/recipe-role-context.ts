import { z } from "zod";
import { TASK_PLAN_PROPOSAL_ZOD_SCHEMA } from "../tasks/task-centric/schema.js";
import { taskCentricDigest } from "../tasks/task-centric/digest.js";

const digest = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const plan = TASK_PLAN_PROPOSAL_ZOD_SCHEMA.shape;
const validation = plan.top_level_validation.omit({ evidence_fingerprint: true });
const item = plan.work_items.shape.work_items.element.extend({ validation });
const predicate = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("path_exists"), path: z.string() }),
  z.strictObject({ kind: z.literal("capability_available"), capability: z.string() }),
  z.strictObject({
    kind: z.literal("observed_value_equals"),
    key: z.string(),
    value: z.union([z.string(), z.number().finite(), z.boolean(), z.null()]),
  }),
]);

const projection = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("recipe_role_context"),
  role: z.enum(["PLANNER", "CURATOR", "EXECUTOR", "EVALUATOR"]),
  recipe: z.strictObject({
    id: z.string(),
    version: z.string(),
    scenario_id: z.string(),
    closure_digest: digest,
  }),
  strategy_goal: z.string(),
  applicability: z.strictObject({ required: z.array(predicate), excluded: z.array(predicate) }),
  assumptions: z.array(z.string()),
  unresolved_questions: z.array(z.string()),
  top_level_validation: validation,
  current_work_items: z.array(item),
  deviations: z.array(
    z.strictObject({
      work_item_id: z.string(),
      kind: z.enum(["added", "changed"]),
      fields: z.array(z.string()),
    }),
  ),
  guidance: z
    .array(
      z.strictObject({
        source: z.enum(["recipe", "repository"]),
        path: z.string(),
        digest,
        content: z.string(),
      }),
    )
    .max(64),
  stop_conditions: z.array(z.string()),
  task_constraints: z.strictObject({ objective: z.string(), context: z.string() }).optional(),
});

/** The byte budget counts the original projection, excluding this transport envelope. */
export const RECIPE_ROLE_CONTEXT_ZOD_SCHEMA = z
  .strictObject({ projection, digest })
  .superRefine((value, ctx) => {
    if (Buffer.byteLength(JSON.stringify(value.projection), "utf8") > 64 * 1024)
      ctx.addIssue({
        code: "custom",
        path: ["projection"],
        message: "Required Recipe role context exceeds 65536 bytes.",
      });
    if (taskCentricDigest(value.projection) !== value.digest)
      ctx.addIssue({
        code: "custom",
        path: ["digest"],
        message: "Recipe context digest does not match its canonical content.",
      });
  });
