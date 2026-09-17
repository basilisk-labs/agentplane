import { createHash } from "node:crypto";
import path from "node:path";

import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";

const HISTORICAL_BLUEPRINT_PATH = "blueprint/resolved-snapshot.json";

type HistoricalBlueprintIdentity = {
  artifact_kind: string;
  schema_version: number;
  selected_blueprint_id: string;
  selected_blueprint_version: number;
  stored_digest: string;
};

export type HistoricalBlueprintAudit =
  | {
      kind: "decoded";
      path: string;
      source_bytes: string;
      source_byte_length: number;
      source_digest: `sha256:${string}`;
      identity: HistoricalBlueprintIdentity;
    }
  | { kind: "missing"; path: string }
  | {
      kind: "invalid";
      path: string;
      source_bytes: string;
      source_byte_length: number;
      source_digest: `sha256:${string}`;
      reason: string;
    };

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function sourceDigest(source: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(source).digest("hex")}`;
}

function sortHistoricalJson(input: unknown): unknown {
  if (Array.isArray(input)) return input.map((item) => sortHistoricalJson(item));
  const value = record(input);
  if (!value) return input;
  return Object.fromEntries(
    Object.entries(value)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => [key, sortHistoricalJson(nested)]),
  );
}

function historicalPayloadDigest(value: Record<string, unknown>): string {
  const { digest: _digest, ...payload } = value;
  return createHash("sha256")
    .update(JSON.stringify(sortHistoricalJson(payload)))
    .digest("hex");
}

/**
 * Decode only the stable identity of a retired Blueprint artifact.
 *
 * This deliberately does not import the live Blueprint registry, resolver, or
 * validator. Historical evidence is the exact stored byte sequence; a missing
 * artifact is never reconstructed from current policy.
 */
export async function auditHistoricalBlueprintSnapshot(opts: {
  repository_root: string;
  workflow_dir: string;
  task_id: string;
}): Promise<HistoricalBlueprintAudit> {
  const artifactPath = path.join(
    opts.repository_root,
    opts.workflow_dir,
    opts.task_id,
    HISTORICAL_BLUEPRINT_PATH,
  );
  let source: string;
  try {
    source = await readContainedStableTextNoFollow({
      repository_root: opts.repository_root,
      file_path: artifactPath,
      label: "historical Blueprint snapshot",
      max_bytes: 4 * 1024 * 1024,
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return { kind: "missing", path: artifactPath };
    }
    throw error;
  }

  const evidence = {
    path: artifactPath,
    source_bytes: source,
    source_byte_length: Buffer.byteLength(source),
    source_digest: sourceDigest(source),
  };
  let parsed: unknown;
  try {
    parsed = JSON.parse(source);
  } catch (error) {
    return {
      kind: "invalid",
      ...evidence,
      reason: error instanceof Error ? error.message : "Historical Blueprint JSON is invalid.",
    };
  }
  const value = record(parsed);
  const selected = record(value?.selectedBlueprint);
  const digest = record(value?.digest);
  if (
    value?.artifactKind !== "agentplane.blueprint.resolved_snapshot" ||
    value.schemaVersion !== 1 ||
    typeof selected?.id !== "string" ||
    !selected.id.trim() ||
    selected.version !== 1 ||
    digest?.algorithm !== "sha256" ||
    typeof digest.value !== "string" ||
    !/^[a-f0-9]{64}$/u.test(digest.value)
  ) {
    return {
      kind: "invalid",
      ...evidence,
      reason: "Historical Blueprint snapshot identity fields are missing or invalid.",
    };
  }
  const expectedDigest = historicalPayloadDigest(value);
  if (digest.value !== expectedDigest) {
    return {
      kind: "invalid",
      ...evidence,
      reason: `Historical Blueprint snapshot digest mismatch: expected ${expectedDigest}, observed ${digest.value}.`,
    };
  }
  return {
    kind: "decoded",
    ...evidence,
    identity: {
      artifact_kind: value.artifactKind,
      schema_version: value.schemaVersion as number,
      selected_blueprint_id: selected.id,
      selected_blueprint_version: selected.version as number,
      stored_digest: digest.value,
    },
  };
}

export function projectHistoricalBlueprintAudit(
  audit: HistoricalBlueprintAudit,
): Omit<HistoricalBlueprintAudit, "source_bytes"> {
  if (audit.kind === "missing") return audit;
  const { source_bytes: _sourceBytes, ...report } = audit;
  return report;
}
