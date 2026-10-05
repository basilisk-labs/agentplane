import canonicalize from "canonicalize";
import { createHash } from "node:crypto";

import type { RepositorySnapshot, Sha256Digest, TaskPlanProposal } from "./model.js";

export function taskCentricDigest(value: unknown): Sha256Digest {
  const canonical = canonicalize(value);
  if (canonical === undefined) throw new Error("Task-centric value is not canonicalizable.");
  return `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

export function isSha256Digest(value: unknown): value is Sha256Digest {
  return typeof value === "string" && /^sha256:[0-9a-f]{64}$/u.test(value);
}

export function isGitObjectId(value: string): boolean {
  return /^[0-9a-f]{40}$|^[0-9a-f]{64}$/u.test(value) && !/^0+$/u.test(value);
}

export function createRepositorySnapshot(
  input: Omit<RepositorySnapshot, "schema_version" | "digest">,
): RepositorySnapshot {
  if (input.git.kind === "commit" && !isGitObjectId(input.git.sha)) {
    throw new Error("Repository commit identity must be a valid Git object id.");
  }
  const value = { schema_version: 1 as const, ...input };
  return Object.freeze({ ...value, digest: taskCentricDigest(value) });
}

/** Recipe closure v2 source semantics. Only native observations and bound provenance are omitted.
 * Final Kernel Plan/input digests continue to cover the complete proposal and current baseline.
 */
export function recipeSourcePlanSemanticDigest(proposal: TaskPlanProposal): Sha256Digest {
  const { planning_baseline: _baseline, recipe_provenance: _provenance, ...source } = proposal;
  const validation = (value: TaskPlanProposal["top_level_validation"]) => {
    const { evidence_fingerprint: _fingerprint, ...semantics } = value;
    return semantics;
  };
  return taskCentricDigest({
    ...source,
    work_items: {
      ...source.work_items,
      work_items: source.work_items.work_items.map((item) => ({
        ...item,
        validation: validation(item.validation),
      })),
    },
    top_level_validation: validation(source.top_level_validation),
  });
}
