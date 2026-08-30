import type {
  ExecutionAuthority,
  KernelResult,
  Sha256Digest,
  WorkItemDefinition,
} from "./model.js";

export type AuthoritySubsetViolation =
  | "task"
  | "plan"
  | "repository"
  | "state_fingerprint"
  | "work_item"
  | "scope"
  | "repository_effects"
  | "external_effects"
  | "capabilities"
  | "resources"
  | "risk"
  | "reversibility"
  | "validation"
  | "policy"
  | "completion"
  | "expiry"
  | "provenance";

export type AuthoritySubsetResult =
  | Readonly<{ ok: true }>
  | Readonly<{ ok: false; violations: readonly AuthoritySubsetViolation[] }>;

export const PROJECTION_SOURCES = [
  "document",
  "legacy_status",
  "verification_text",
  "pr_metadata",
  "provider_summary",
] as const;

export type ProjectionSource = (typeof PROJECTION_SOURCES)[number];

const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/u;

function setIsSubset(child: readonly string[], parent: readonly string[]): boolean {
  const allowed = new Set(parent);
  return child.every((value) => allowed.has(value));
}

function canonicalAuthorityPath(value: string): string | null {
  const normalized = value.replaceAll("\\", "/");
  if (!normalized || normalized.includes("\0") || normalized.includes("//")) return null;
  if (normalized === "." || normalized === "/") return normalized;
  const trimmed = normalized.replace(/\/$/u, "");
  if (trimmed.split("/").some((part) => part === "." || part === "..")) return null;
  return trimmed;
}

function pathIsWithin(path: string, root: string): boolean {
  const normalizedPath = canonicalAuthorityPath(path);
  const normalizedRoot = canonicalAuthorityPath(root);
  if (normalizedPath === null || normalizedRoot === null) return false;
  if (normalizedRoot === ".") return !/^(?:\/|[a-z]:)/iu.test(normalizedPath);
  if (normalizedRoot === "/") return normalizedPath.startsWith("/");
  return normalizedPath === normalizedRoot || normalizedPath.startsWith(`${normalizedRoot}/`);
}

function scopeIsSubset(child: readonly string[], parent: readonly string[]): boolean {
  return child.every((path) => parent.some((root) => pathIsWithin(path, root)));
}

function workItemIsSubset(child: string | null, parent: string | null): boolean {
  return parent === null || child === parent;
}

function expiryIsSubset(child: string | null, parent: string | null): boolean {
  const childTime = child === null ? Infinity : Date.parse(child);
  const parentTime = parent === null ? Infinity : Date.parse(parent);
  return !Number.isNaN(childTime) && !Number.isNaN(parentTime) && childTime <= parentTime;
}

function addViolation(
  violations: AuthoritySubsetViolation[],
  condition: boolean,
  violation: AuthoritySubsetViolation,
): void {
  if (!condition) violations.push(violation);
}

export function compareExecutionAuthority(
  parent: ExecutionAuthority,
  child: ExecutionAuthority,
): AuthoritySubsetResult {
  const violations: AuthoritySubsetViolation[] = [];
  addViolation(violations, child.task_id === parent.task_id, "task");
  addViolation(
    violations,
    child.plan_revision === parent.plan_revision && child.plan_digest === parent.plan_digest,
    "plan",
  );
  addViolation(violations, child.repository_identity === parent.repository_identity, "repository");
  addViolation(
    violations,
    child.repository_fingerprint === parent.repository_fingerprint,
    "state_fingerprint",
  );
  addViolation(violations, workItemIsSubset(child.work_item_id, parent.work_item_id), "work_item");
  addViolation(violations, scopeIsSubset(child.scope_roots, parent.scope_roots), "scope");
  addViolation(
    violations,
    setIsSubset(child.repository_effects, parent.repository_effects),
    "repository_effects",
  );
  addViolation(
    violations,
    setIsSubset(child.external_effects, parent.external_effects),
    "external_effects",
  );
  addViolation(violations, setIsSubset(child.capabilities, parent.capabilities), "capabilities");
  addViolation(violations, setIsSubset(child.resources, parent.resources), "resources");
  addViolation(
    violations,
    child.risk.requirements === "bounded" || parent.risk.requirements === "material",
    "risk",
  );
  addViolation(
    violations,
    child.risk.implementation === "bounded" || parent.risk.implementation === "material",
    "risk",
  );
  const reversibilityRank = {
    reversible: 0,
    recovery_required: 1,
    irreversible: 2,
  } as const;
  addViolation(
    violations,
    reversibilityRank[child.risk.reversibility] <= reversibilityRank[parent.risk.reversibility],
    "reversibility",
  );
  addViolation(
    violations,
    setIsSubset(child.validation_requirements, parent.validation_requirements),
    "validation",
  );
  addViolation(violations, setIsSubset(child.policy_digests, parent.policy_digests), "policy");
  addViolation(
    violations,
    setIsSubset(child.completion_requirements, parent.completion_requirements),
    "completion",
  );
  addViolation(violations, expiryIsSubset(child.expires_at, parent.expires_at), "expiry");
  addViolation(
    violations,
    child.provenance.kind !== "USER" &&
      child.provenance.parent_authority_digest === parent.digest &&
      child.provenance.evidence_digest === parent.provenance.evidence_digest,
    "provenance",
  );
  const unique = [...new Set(violations)];
  return unique.length === 0 ? { ok: true } : { ok: false, violations: unique };
}

export function authorityBindsCurrentState(
  authority: ExecutionAuthority,
  expected: Readonly<{
    task_id: string;
    plan_revision: number | null;
    plan_digest: Sha256Digest | null;
    repository_fingerprint: Sha256Digest;
    work_item_id: string | null;
  }>,
): boolean {
  return (
    DIGEST_PATTERN.test(authority.digest) &&
    authority.task_id === expected.task_id &&
    (expected.plan_revision === null || authority.plan_revision === expected.plan_revision) &&
    (expected.plan_digest === null || authority.plan_digest === expected.plan_digest) &&
    authority.repository_fingerprint === expected.repository_fingerprint &&
    (expected.work_item_id === null ||
      authority.work_item_id === null ||
      authority.work_item_id === expected.work_item_id)
  );
}

export function validateWorkItemDefinitions(
  definitions: readonly WorkItemDefinition[],
): readonly string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const definition of definitions) {
    if (!definition.id || ids.has(definition.id)) issues.push(`duplicate:${definition.id}`);
    ids.add(definition.id);
    if (new Set(definition.expected_outputs).size !== definition.expected_outputs.length) {
      issues.push(`duplicate_output:${definition.id}`);
    }
  }
  for (const definition of definitions) {
    for (const dependency of definition.depends_on) {
      if (!ids.has(dependency)) issues.push(`missing_dependency:${definition.id}:${dependency}`);
      if (dependency === definition.id) issues.push(`cycle:${definition.id}`);
    }
  }
  const byId = new Map(definitions.map((definition) => [definition.id, definition]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (id: string): boolean => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visiting.add(id);
    for (const dependency of byId.get(id)?.depends_on ?? []) {
      if (byId.has(dependency) && visit(dependency)) return true;
    }
    visiting.delete(id);
    visited.add(id);
    return false;
  };
  if (definitions.some((definition) => visit(definition.id))) issues.push("dependency_cycle");
  return [...new Set(issues)];
}

export function projectionCannotAuthorize(
  source: ProjectionSource,
): Extract<KernelResult, { kind: "rejected" }> {
  return {
    kind: "rejected",
    code: "PROJECTION_CANNOT_AUTHORIZE",
    facts: [source],
    required_action: "supply_execution_authority",
  };
}
