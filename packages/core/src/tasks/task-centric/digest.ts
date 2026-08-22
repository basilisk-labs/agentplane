import canonicalize from "canonicalize";
import { createHash } from "node:crypto";

import type { RepositorySnapshot, Sha256Digest } from "./model.js";

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
