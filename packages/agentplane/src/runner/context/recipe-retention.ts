import { createHash } from "node:crypto";
import path from "node:path";
import { canonicalizeJson, taskCentricDigest } from "@agentplaneorg/core/tasks";
import { isScenarioRepoPath, type CompiledRecipeDependencyClosure } from "@agentplaneorg/recipes";
import { z } from "zod";
import {
  putEvaluatorEvidenceObject,
  readCommittedEvaluatorEvidenceObject,
  type EvaluatorPacketArtifact,
} from "../../commands/evaluator/evaluator-evidence-store.js";
import type { ComputedRecipeClosure } from "./recipe-closure.js";

const MAX_BYTES = 64 * 1024 * 1024;
const MAX_ENVELOPE_BYTES = 96 * 1024 * 1024;
const DIGEST = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const TEXT = z.string().min(1).max(8192);
const FILE_PATH = TEXT.refine((value) => value !== "." && isScenarioRepoPath(value));
const SOURCE = z.enum(["recipe", "repository"]);
const CLOSURE = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("recipe_dependency_closure"),
  recipe: z.strictObject({ id: TEXT, version: TEXT }),
  scenario_id: TEXT,
  scenario_digest: DIGEST,
  plan_digest: DIGEST,
  roots: z.array(TEXT).max(4096),
  nodes: z
    .array(
      z.strictObject({ id: TEXT, definition: z.unknown(), dependencies: z.array(TEXT).max(4096) }),
    )
    .max(4096),
  files: z
    .array(
      z.strictObject({
        source: SOURCE,
        path: FILE_PATH,
        digest: DIGEST,
        size_bytes: z.number().int().nonnegative().max(MAX_BYTES),
      }),
    )
    .max(4096),
  secret_refs: z.array(z.strictObject({ id: TEXT, version: TEXT })).max(4096),
  digest: DIGEST,
});
const RETENTION = "keep_in_current_tree_until_task_and_audit_complete" as const;
const ENVELOPE = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("retained_recipe_closure"),
  retention: z.literal(RETENTION),
  closure: CLOSURE,
  objects: z
    .array(z.strictObject({ digest: DIGEST, base64: z.string().max(MAX_ENVELOPE_BYTES) }))
    .max(4096),
});
const REFERENCE = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("recipe_closure_reference"),
  closure_digest: DIGEST,
  task_quality_root: FILE_PATH,
  retention: z.literal(RETENTION),
  artifact: z.unknown(),
});
export type RecipeClosureReference = Omit<z.infer<typeof REFERENCE>, "artifact"> & {
  artifact: EvaluatorPacketArtifact;
};
const hash = (bytes: Uint8Array) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const key = (source: string, relative: string) => `${source}:${relative}`;
function qualityRoot(relative: string): string {
  if (
    !isScenarioRepoPath(relative) ||
    relative.split("/").some((part) => part.toLowerCase() === ".git") ||
    path.posix.basename(relative) !== "quality"
  )
    throw new Error(
      "Recipe retention requires a repository task quality directory, not a Git common directory.",
    );
  return relative;
}
function parseEnvelope(raw: unknown) {
  const envelope = ENVELOPE.parse(raw);
  const { digest, ...body } = envelope.closure;
  if (taskCentricDigest(body) !== digest)
    throw new Error("Retained Recipe closure digest mismatch.");
  const nodes = new Set(envelope.closure.nodes.map((node) => node.id));
  if (
    nodes.size !== envelope.closure.nodes.length ||
    [
      ...envelope.closure.roots,
      ...envelope.closure.nodes.flatMap((node) => node.dependencies),
    ].some((id) => !nodes.has(id))
  )
    throw new Error("Retained Recipe closure has invalid references.");
  const objects = new Map<string, Buffer>();
  let total = 0;
  for (const object of envelope.objects) {
    if (objects.has(object.digest)) throw new Error("Duplicate retained Recipe object.");
    const bytes = Buffer.from(object.base64, "base64");
    total += bytes.length;
    if (
      total > MAX_BYTES ||
      bytes.toString("base64") !== object.base64 ||
      hash(bytes) !== object.digest
    )
      throw new Error("Retained Recipe object bytes are invalid.");
    objects.set(object.digest, bytes);
  }
  const files = new Map<string, Buffer>();
  const used = new Set<string>();
  for (const file of envelope.closure.files) {
    const id = key(file.source, file.path);
    const bytes = objects.get(file.digest);
    if (files.has(id) || bytes?.length !== file.size_bytes)
      throw new Error(`Missing or invalid retained Recipe bytes: ${id}`);
    files.set(id, bytes);
    used.add(file.digest);
  }
  if (used.size !== objects.size)
    throw new Error("Retained Recipe closure contains unrelated byte objects.");
  return { envelope, files };
}
function freezeJson<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeJson(child);
    Object.freeze(value);
  }
  return value;
}

/** Prepare one deduplicated immutable object through the existing evidence owner.
 * This does not commit, prove portability, approve a Plan, or release retention obligations.
 * The native lifecycle must retain this object in the committed tree before admission.
 * No automatic deletion is provided; task closure alone does not end audit retention.
 */
export async function prepareRecipeClosureRetention(opts: {
  gitRoot: string;
  taskQualityRoot: string;
  computed: ComputedRecipeClosure;
}): Promise<RecipeClosureReference> {
  const relative = qualityRoot(
    path
      .relative(path.resolve(opts.gitRoot), path.resolve(opts.taskQualityRoot))
      .split(path.sep)
      .join("/"),
  );
  await opts.computed.assertUnchanged();
  const { envelope } = parseEnvelope({
    schema_version: 1,
    kind: "retained_recipe_closure",
    retention: RETENTION,
    closure: structuredClone(opts.computed.closure),
    objects: opts.computed.objects
      .map((object) => ({
        digest: object.digest,
        base64: Buffer.from(object.bytes).toString("base64"),
      }))
      .toSorted((a, b) => a.digest.localeCompare(b.digest)),
  });
  const contents = JSON.stringify(canonicalizeJson(envelope));
  if (Buffer.byteLength(contents) > MAX_ENVELOPE_BYTES)
    throw new Error("Recipe closure retention envelope exceeds its byte budget.");
  const artifact = await putEvaluatorEvidenceObject({
    gitRoot: opts.gitRoot,
    taskQualityRoot: path.join(opts.gitRoot, relative),
    logicalName: `recipe-closure:${envelope.closure.digest}`,
    kind: "recipe_closure",
    extension: ".json",
    mediaType: "application/vnd.agentplane.recipe-closure+json",
    contents,
  });
  await opts.computed.assertUnchanged();
  return freezeJson({
    schema_version: 1,
    kind: "recipe_closure_reference",
    closure_digest: envelope.closure.digest,
    task_quality_root: relative,
    retention: RETENTION,
    artifact,
  });
}

/** Resolve only the bound committed bytes. No installed-package lookup or latest fallback.
 * Current policy/approval admission remains native and separate from this retention proof.
 */
export async function readRetainedRecipeClosure(opts: {
  gitRoot: string;
  reference: unknown;
  expectedClosureDigest: string;
}): Promise<{
  closure: CompiledRecipeDependencyClosure;
  proof: { commit: string; blob: string };
  readFile: (source: "recipe" | "repository", relative: string) => Uint8Array;
}> {
  const reference = REFERENCE.parse(opts.reference);
  if (reference.closure_digest !== DIGEST.parse(opts.expectedClosureDigest))
    throw new Error("Retained Recipe reference does not match the bound closure.");
  const stored = await readCommittedEvaluatorEvidenceObject({
    gitRoot: opts.gitRoot,
    objectRoot: `${qualityRoot(reference.task_quality_root)}/objects`,
    artifact: reference.artifact,
    maxBytes: MAX_ENVELOPE_BYTES,
  });
  if (
    stored.artifact.kind !== "recipe_closure" ||
    stored.artifact.logical_name !== `recipe-closure:${reference.closure_digest}`
  )
    throw new Error("Invalid retained Recipe artifact identity.");
  const { envelope, files } = parseEnvelope(JSON.parse(stored.bytes.toString("utf8")));
  if (envelope.closure.digest !== reference.closure_digest)
    throw new Error("Retained Recipe envelope does not match the bound closure.");
  return Object.freeze({
    closure: freezeJson(envelope.closure),
    proof: Object.freeze({ commit: stored.commit, blob: stored.blob }),
    readFile: (source: "recipe" | "repository", relative: string) => {
      const bytes = files.get(key(source, relative));
      if (!bytes) throw new Error(`Undeclared retained Recipe file: ${key(source, relative)}`);
      return new Uint8Array(bytes);
    },
  });
}
