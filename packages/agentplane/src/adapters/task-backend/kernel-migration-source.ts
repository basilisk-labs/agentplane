import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";
import {
  parseTaskReadme,
  taskCentricAggregateFromExtensions,
  type taskKernel,
} from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import type { TaskByteSnapshot } from "../../ports/task-byte-store.js";
import { runtimeFrom } from "./task-centric-backend-runtime.js";
import { readKernelRecord, TASK_KERNEL_EXTENSION } from "./kernel-record.js";

export type InputClassification = { context_refs: string[]; output_manifest_refs: string[] };
export type MigrationSource =
  | {
      kind: "legacy_active" | "legacy_terminal";
      source: TaskByteSnapshot;
      task: TaskData;
      frontmatter: Record<string, unknown>;
      body: string;
      inputs: InputClassification;
    }
  | { kind: "canonical" | "archived"; source: TaskByteSnapshot; task: TaskData }
  | { kind: "quarantined"; source: TaskByteSnapshot; reason: string; fields: string[] };

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

class MigrationSourceError extends Error {
  constructor(
    reason: string,
    readonly fields: string[],
  ) {
    super(reason);
  }
}

/** A name or narrative alone is not proof that an input is an output manifest. */
export function classifyMigrationInputs(value: unknown): InputClassification {
  const contexts = new Set<string>();
  const outputs = new Set<string>();
  const required: { entry: unknown; path: string }[] = [];
  const seen = new Set<object>();
  function visit(node: unknown, key = "", depth = 0, location = "frontmatter"): void {
    if (depth > 64) throw new Error("source_nesting_exceeded");
    if (node === null || typeof node !== "object") return;
    if (seen.has(node)) throw new Error("cyclic_or_aliased_source");
    seen.add(node);
    if (Array.isArray(node)) {
      if (key === "required_inputs")
        required.push(
          ...(node as unknown[]).map((entry, index) => ({ entry, path: `${location}[${index}]` })),
        );
      if (
        ["context_refs", "knowledge_refs", "output_manifests", "expected_outputs"].includes(key)
      ) {
        for (const entry of node) {
          const ref = object(entry);
          const id = ref?.id;
          // Only typed declarations identify a category. Plain strings remain ambiguous.
          if (typeof id === "string" && id && typeof ref?.kind === "string" && ref.kind) {
            (key === "context_refs" || key === "knowledge_refs" ? contexts : outputs).add(id);
          }
        }
      }
      for (const [index, entry] of node.entries())
        visit(entry, "", depth + 1, `${location}[${index}]`);
    } else {
      for (const [name, child] of Object.entries(node)) {
        if (name === "required_inputs" && !Array.isArray(child))
          throw new MigrationSourceError("malformed_required_inputs", [`${location}.${name}`]);
        visit(child, name, depth + 1, `${location}.${name}`);
      }
    }
  }
  visit(value);
  const result: InputClassification = { context_refs: [], output_manifest_refs: [] };
  for (const { entry, path: field } of required) {
    const ref = object(entry);
    const id = typeof entry === "string" ? entry : ref?.id;
    if (typeof id !== "string" || !id)
      throw new MigrationSourceError("ambiguous_required_inputs", [field]);
    const context = ref?.kind === "context_ref" || contexts.has(id);
    const output = ref?.kind === "output_manifest" || outputs.has(id);
    if (context === output) throw new MigrationSourceError("ambiguous_required_inputs", [field]);
    (context ? result.context_refs : result.output_manifest_refs).push(id);
  }
  return {
    context_refs: [...new Set(result.context_refs)].toSorted(),
    output_manifest_refs: [...new Set(result.output_manifest_refs)].toSorted(),
  };
}

export function classifyMigrationSource(
  source: TaskByteSnapshot,
  repositoryIdentity: taskKernel.Sha256Digest,
): MigrationSource {
  const quarantine = (reason: string, fields = ["frontmatter"]): MigrationSource => ({
    kind: "quarantined",
    source,
    reason,
    fields,
  });
  if (!source.encoding_valid) return quarantine("unsupported_encoding");
  try {
    const { frontmatter, body } = parseTaskReadme(source.text);
    if (frontmatter.id !== source.task_id) return quarantine("source_identity_mismatch", ["id"]);
    if (frontmatter.schema_version !== undefined && frontmatter.schema_version !== 1)
      return quarantine("unknown_schema");
    if (frontmatter.doc_version !== undefined && ![2, 3].includes(Number(frontmatter.doc_version)))
      return quarantine("unknown_schema");
    const checked = validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(frontmatter));
    const task: TaskData = {
      ...checked,
      description: checked.description ?? "",
      depends_on: checked.depends_on ?? [],
      tags: checked.tags ?? [],
      verify: checked.verify ?? [],
    };
    if (Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) {
      const record = readKernelRecord(task, repositoryIdentity);
      return record.kind === "canonical" || record.kind === "archived"
        ? { kind: record.kind, source, task }
        : quarantine("malformed_canonical");
    }
    for (const [name, raw] of Object.entries(task.extensions ?? {})) {
      if (name.startsWith("agentplane.task_centric") && object(raw)?.schema_version !== 1)
        return quarantine("unknown_schema");
    }
    const legacy = taskCentricAggregateFromExtensions(task.extensions);
    if (legacy && legacy.id !== source.task_id)
      return quarantine("source_identity_mismatch", ["extensions.agentplane.task_centric.id"]);
    const runtime = runtimeFrom(task);
    if (runtime.leases.length > 0 || runtime.pending_effects.length > 0)
      return quarantine("unreconciled_runtime", ["extensions.agentplane.task_centric_runtime"]);
    const inputs = classifyMigrationInputs(frontmatter);
    if (task.status === "DONE")
      return { kind: "legacy_terminal", source, task, frontmatter, body, inputs };
    if (["TODO", "DOING", "BLOCKED"].includes(task.status))
      return { kind: "legacy_active", source, task, frontmatter, body, inputs };
    return quarantine("unknown_legacy_status");
  } catch (error) {
    if (error instanceof MigrationSourceError) return quarantine(error.message, error.fields);
    const message = error instanceof Error ? error.message : "malformed_source";
    return quarantine(
      [
        "ambiguous_required_inputs",
        "malformed_required_inputs",
        "cyclic_or_aliased_source",
        "source_nesting_exceeded",
      ].includes(message)
        ? message
        : "malformed_source",
    );
  }
}
