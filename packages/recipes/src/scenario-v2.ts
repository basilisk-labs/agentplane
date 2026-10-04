import { COMPACT_TASK_PLAN_PROPOSAL_ZOD_SCHEMA } from "@agentplaneorg/core/tasks";
import { z } from "zod";

const TEXT = z.string().trim().min(1);
const NAME = z.string().regex(/^[A-Za-z_][A-Za-z0-9_]*$/u);
const ID = TEXT.refine((value) => !/[\\/]/u.test(value) && value !== "." && value !== "..");
const parameter = <const K extends string, T extends z.ZodType>(type: K, value: T) =>
  z.strictObject({
    name: NAME,
    type: z.literal(type),
    required: z.boolean(),
    description: TEXT.optional(),
    default: value.optional(),
  });

const PARAMETERS = z
  .array(
    z.union([
      parameter("string", z.string()),
      parameter("repo_path", TEXT),
      parameter("integer", z.number().int()),
      parameter("boolean", z.boolean()),
    ]),
  )
  .superRefine((values, ctx) => {
    const names = new Set<string>();
    for (const [index, value] of values.entries()) {
      if (names.has(value.name))
        ctx.addIssue({
          code: "custom",
          path: [index, "name"],
          message: "Duplicate parameter name.",
        });
      names.add(value.name);
    }
  });

const PREDICATE = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("path_exists"), path: TEXT }),
  z.strictObject({ kind: z.literal("capability_available"), capability: TEXT }),
  z.strictObject({
    kind: z.literal("observed_value_equals"),
    key: TEXT,
    value: z.union([z.string(), z.number().finite(), z.boolean(), z.null()]),
  }),
]);

/** Parsing describes requested work. It neither observes predicates nor authorizes effects. */
export const SCENARIO_V2_ZOD_SCHEMA = z.strictObject({
  schema_version: z.literal("2"),
  id: ID,
  summary: TEXT.optional(),
  description: TEXT.optional(),
  goal: TEXT,
  parameters: PARAMETERS,
  applicability: z.strictObject({ required: z.array(PREDICATE), excluded: z.array(PREDICATE) }),
  plan_template: COMPACT_TASK_PLAN_PROPOSAL_ZOD_SCHEMA,
});

export type ScenarioV2Definition = z.infer<typeof SCENARIO_V2_ZOD_SCHEMA>;
export type ScenarioParameter = ScenarioV2Definition["parameters"][number];
export type ScenarioPredicate = z.infer<typeof PREDICATE>;

export function parseScenarioV2(raw: unknown): ScenarioV2Definition {
  return SCENARIO_V2_ZOD_SCHEMA.parse(raw);
}
