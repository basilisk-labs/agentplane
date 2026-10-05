import { createHash } from "node:crypto";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import { z } from "zod";
import { validateRecipeManifest } from "./manifest.js";
import { parseScenarioDefinition } from "./scenario.js";
import { SCENARIO_V2_ZOD_SCHEMA } from "./scenario-v2.js";

export const RECIPE_V1_SOURCE_MAX_BYTES = 64 * 1024;
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const text = z.string().min(1).max(8192);
const hash = (bytes: Uint8Array) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/** No V1 procedural step vocabulary has a formal WorkItem-graph meaning. */
export function auditRecipeV1(bytes: Uint8Array) {
  if (bytes.length > RECIPE_V1_SOURCE_MAX_BYTES)
    throw new Error("V1 source exceeds audit byte budget.");
  const raw: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  if (!record(raw)) throw new Error("V1 audit requires a JSON object.");
  let nodes = 0;
  function bounded(value: unknown, depth: number) {
    if (++nodes > 4096 || depth > 32) throw new Error("V1 source exceeds structural audit budget.");
    if (value !== null && typeof value === "object")
      for (const child of Object.values(value)) bounded(child, depth + 1);
  }
  bounded(raw, 0);
  const source = {
    digest: hash(bytes),
    size_bytes: bytes.length,
    base64: Buffer.from(bytes).toString("base64"),
  };
  let manifest: ReturnType<typeof validateRecipeManifest> | undefined;
  try {
    manifest = validateRecipeManifest(raw);
  } catch (error) {
    if (raw.kind === "project_overlay") throw error;
  }
  if (manifest) {
    let alsoScenario = false;
    try {
      parseScenarioDefinition(raw, ["1"]);
      alsoScenario = true;
    } catch {
      /* Formal schema mismatch, not semantic interpretation. */
    }
    if (alsoScenario)
      throw new Error("Ambiguous V1 source satisfies both manifest and scenario schemas.");
    if (manifest.schema_version !== "1") throw new Error("V1 audit requires manifest API 1.");
    return {
      schema_version: 1 as const,
      kind: "recipe_v1_audit" as const,
      source,
      disposition: (manifest.scenarios?.length
        ? "scenario_audit_required"
        : "overlay_unchanged") as "scenario_audit_required" | "overlay_unchanged",
      exact_fields: { kind: "project_overlay", id: manifest.id, version: manifest.version },
      unresolved: [],
      scenario_sources: (manifest.scenarios ?? []).map((scenario) => ({
        id: scenario.id,
        file: scenario.file,
      })),
      message:
        "The overlay remains an overlay. No V2 scenario was generated. Audit each declared scenario file explicitly.",
    };
  }
  const scenario = parseScenarioDefinition(raw, ["1"]);
  const unresolved = [
    {
      source_path: "/task_template",
      target: "/plan_template",
      reason: "Task defaults and prose have no exact WorkItem contract mapping.",
    },
    { source_path: "/inputs", target: "/parameters", reason: "V1 inputs are untyped." },
    {
      source_path: "/outputs",
      target: "/plan_template",
      reason: "V1 outputs have no typed output contract.",
    },
    {
      source_path: "/steps",
      target: "/plan_template",
      reason:
        "Preserve ordered steps. V1 has no typed procedural graph, including when steps is empty.",
    },
    ...Object.keys(raw)
      .filter(
        (key) =>
          ![
            "schema_version",
            "id",
            "summary",
            "description",
            "goal",
            "task_template",
            "inputs",
            "outputs",
            "steps",
          ].includes(key),
      )
      .toSorted()
      .map((key) => ({
        source_path: `/${key.replaceAll("~", "~0").replaceAll("/", "~1")}`,
        target: "/plan_template",
        reason:
          "This source field has no exact V2 mapping. Preserve its mandatory semantics or return a blocker.",
      })),
  ];
  if (unresolved.length > 256) throw new Error("V1 source exceeds conversion field budget.");
  return {
    schema_version: 1 as const,
    kind: "recipe_v1_audit" as const,
    source,
    disposition: "semantic_conversion_required" as const,
    exact_fields: {
      id: scenario.id,
      goal: scenario.goal,
      ...(scenario.summary ? { summary: scenario.summary } : {}),
      ...(scenario.description ? { description: scenario.description } : {}),
    },
    unresolved,
    scenario_sources: [],
    message:
      "Known metadata is mapped only. No executable V2 conversion or semantic equivalence is claimed.",
  };
}
export type RecipeV1Audit = ReturnType<typeof auditRecipeV1>;

const binding = {
  schema_version: z.literal(1),
  kind: z.literal("recipe_v1_conversion_result"),
  task_id: text,
  source_digest: digest,
  audit_digest: digest,
};
export const RECIPE_V1_CONVERSION_RESULT_SCHEMA = z.discriminatedUnion("status", [
  z.strictObject({
    ...binding,
    status: z.literal("draft"),
    scenario: SCENARIO_V2_ZOD_SCHEMA,
    resolutions: z
      .array(z.strictObject({ source_path: text, target_path: text, explanation: text }))
      .max(256),
  }),
  z.strictObject({ ...binding, status: z.literal("blocked"), reason: text }),
]);

/** Structural completeness is not semantic approval. Only native independent review may accept a draft. */
export function validateRecipeV1ConversionResult(opts: {
  audit: RecipeV1Audit;
  task_id: string;
  result: unknown;
}) {
  if (Buffer.byteLength(JSON.stringify(opts.result), "utf8") > 256 * 1024)
    throw new Error("Conversion result exceeds its byte budget.");
  const result = RECIPE_V1_CONVERSION_RESULT_SCHEMA.parse(opts.result);
  if (
    opts.audit.disposition !== "semantic_conversion_required" ||
    result.task_id !== opts.task_id ||
    result.source_digest !== opts.audit.source.digest ||
    result.audit_digest !== taskCentricDigest(opts.audit)
  )
    throw new Error("Conversion result does not bind this Task and exact V1 source audit.");
  if (result.status === "blocked") return result;
  if (result.scenario.id !== opts.audit.exact_fields.id)
    throw new Error("Conversion cannot change scenario identity.");
  const expected = new Set(opts.audit.unresolved.map((field) => field.source_path));
  if (
    result.resolutions.length !== expected.size ||
    new Set(result.resolutions.map((r) => r.source_path)).size !== expected.size
  )
    throw new Error("Conversion must account for every unresolved source field exactly once.");
  for (const resolution of result.resolutions) {
    if (!expected.has(resolution.source_path) || !resolution.target_path.startsWith("/"))
      throw new Error("Conversion resolution has an unknown source or target.");
    let value: unknown = result.scenario;
    for (const part of resolution.target_path.slice(1).split("/")) {
      const key = part.replaceAll("~1", "/").replaceAll("~0", "~");
      if (!value || typeof value !== "object" || !Object.hasOwn(value, key))
        throw new Error("Conversion resolution target is absent from the V2 draft.");
      value = (value as Record<string, unknown>)[key];
    }
  }
  return result;
}
