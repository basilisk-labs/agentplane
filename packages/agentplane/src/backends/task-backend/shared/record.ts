import type { TaskRecord } from "@agentplaneorg/core/tasks";
import {
  normalizeTaskStatus,
  normalizeTaskDocVersion,
  renderTaskDocFromSections,
  taskDocToSectionMap,
} from "@agentplaneorg/core/tasks";

import { isRecord } from "../../../shared/guards.js";

import { extractTaskDoc } from "./doc.js";
import { normalizeEvents } from "./events.js";
import {
  normalizeDependsOn,
  normalizePlanApproval,
  normalizeQualityReviewResult,
  normalizeTaskOrigin,
  normalizeTaskRunnerOutcome,
  normalizeTaskTokenUsage,
  normalizeVerificationResult,
} from "./normalize.js";
import { toStringArray } from "./strings.js";
import type { TaskData } from "./types.js";
import {
  BLUEPRINT_REQUEST_VALUES,
  MUTATION_SCOPE_VALUES,
  RISK_FLAG_VALUES,
  TASK_KIND_VALUES,
} from "./domain-values.js";

function normalizeRevision(value: unknown): number | undefined {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : undefined;
}

function normalizeCanonicalSections(value: unknown): Record<string, string> | undefined {
  if (!isRecord(value)) return undefined;
  const out: Record<string, string> = {};
  for (const [title, text] of Object.entries(value)) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle || typeof text !== "string") continue;
    out[normalizedTitle] = text.replaceAll("\r\n", "\n").trimEnd();
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function mergeTaskDocSections(opts: {
  frontmatterSections?: Record<string, string>;
  body: string;
}): Record<string, string> | undefined {
  if (!opts.frontmatterSections) return undefined;
  const bodyDoc = extractTaskDoc(opts.body);
  const bodySections = bodyDoc ? taskDocToSectionMap(bodyDoc) : undefined;
  const merged = bodySections
    ? { ...bodySections, ...opts.frontmatterSections }
    : { ...opts.frontmatterSections };
  return merged && Object.keys(merged).length > 0 ? merged : undefined;
}

function stringEnumValue<T extends string>(value: unknown, allowed: Set<string>): T | undefined {
  return typeof value === "string" && allowed.has(value) ? (value as T) : undefined;
}

function stringEnumArray<T extends string>(value: unknown, allowed: Set<string>): T[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out = value
    .filter((item): item is string => typeof item === "string" && allowed.has(item))
    .filter((item, index, array) => array.indexOf(item) === index) as T[];
  return out.length > 0 ? out : undefined;
}

function normalizeExecutionRoute(value: unknown): TaskData["execution_route"] {
  if (!isRecord(value)) return undefined;
  const requestedMode = value.requested_mode;
  const selectedMode = value.selected_mode;
  const repositoryMode = value.repository_mode;
  const reasonCodes = toStringArray(value.reason_codes);
  if (
    value.schema_version !== 1 ||
    (requestedMode !== "repository" &&
      requestedMode !== "auto" &&
      requestedMode !== "direct" &&
      requestedMode !== "branch_pr") ||
    (selectedMode !== "direct" && selectedMode !== "branch_pr") ||
    (repositoryMode !== "direct" && repositoryMode !== "branch_pr") ||
    reasonCodes.length === 0 ||
    value.frozen !== true
  ) {
    return undefined;
  }
  return {
    schema_version: 1,
    requested_mode: requestedMode,
    selected_mode: selectedMode,
    repository_mode: repositoryMode,
    reason_codes: reasonCodes,
    frozen: true,
  };
}

const REPOSITORY_EFFECTS = new Set([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
const EXTERNAL_EFFECTS = new Set([
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);

function normalizeStringList(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    return null;
  }
  return [...new Set(value as string[])];
}

function normalizeExecutionContract(value: unknown): TaskData["execution_contract"] {
  if (!isRecord(value) || value.schema_version !== 1 || !isRecord(value.declaration)) {
    return undefined;
  }
  const declaration = value.declaration;
  const scopeRoots = normalizeStringList(declaration.scope_roots);
  const repositoryEffects = normalizeStringList(declaration.repository_effects);
  const externalEffects = normalizeStringList(declaration.external_effects);
  const rationale = normalizeStringList(declaration.rationale);
  const reasons = normalizeStringList(value.reason_codes);
  if (
    declaration.schema_version !== 1 ||
    (declaration.preferred_mode !== "direct" && declaration.preferred_mode !== "branch_pr") ||
    scopeRoots === null ||
    repositoryEffects === null ||
    repositoryEffects.some((item) => !REPOSITORY_EFFECTS.has(item)) ||
    externalEffects === null ||
    externalEffects.some((item) => !EXTERNAL_EFFECTS.has(item)) ||
    (declaration.uncertainty !== "bounded" && declaration.uncertainty !== "material") ||
    (declaration.reversibility !== "reversible" &&
      declaration.reversibility !== "recovery_required" &&
      declaration.reversibility !== "irreversible") ||
    !rationale?.length ||
    (value.source !== "agent_declared" && value.source !== "legacy_compatibility") ||
    (value.selected_mode !== "direct" && value.selected_mode !== "branch_pr") ||
    (value.repository_mode !== "direct" && value.repository_mode !== "branch_pr") ||
    !reasons?.length ||
    !isRecord(value.safety) ||
    typeof value.safety.requires_worktree !== "boolean" ||
    typeof value.safety.requires_user_approval !== "boolean" ||
    !isRecord(value.verification) ||
    !isRecord(value.observed)
  ) {
    return undefined;
  }
  const authority = isRecord(value.authority) ? value.authority : {};
  const writableRoots = normalizeStringList(authority.writable_roots ?? scopeRoots);
  const allowedRepositoryEffects = normalizeStringList(
    authority.allowed_repository_effects ?? repositoryEffects,
  );
  const forbiddenRepositoryEffects = normalizeStringList(
    authority.forbidden_repository_effects ??
      [...REPOSITORY_EFFECTS].filter((effect) => !repositoryEffects.includes(effect)),
  );
  const authorityAllowedExternalEffects = Array.isArray(authority.allowed_external_effects)
    ? authority.allowed_external_effects.filter(
        (effect): effect is string => typeof effect === "string",
      )
    : [];
  const allowedExternalEffects = normalizeStringList([
    ...authorityAllowedExternalEffects,
    ...(externalEffects.includes("network_read") ? ["network_read"] : []),
  ]);
  const authorityForbiddenExternalEffects = Array.isArray(authority.forbidden_external_effects)
    ? authority.forbidden_external_effects.filter(
        (effect): effect is string => typeof effect === "string",
      )
    : [...EXTERNAL_EFFECTS];
  const forbiddenExternalEffects = normalizeStringList(
    authorityForbiddenExternalEffects.filter(
      (effect) => effect !== "network_read" || !allowedExternalEffects?.includes(effect),
    ),
  );
  const approvalEffects = normalizeStringList(value.safety.approval_effects);
  const requiredEvidence = normalizeStringList(value.verification.required_evidence);
  const observedEffects = normalizeStringList(value.observed.repository_effects);
  const observedExternalEffects = normalizeStringList(value.observed.external_effects ?? []);
  const changedPaths = normalizeStringList(value.observed.changed_paths);
  const changedComponents = normalizeStringList(value.observed.changed_components ?? []);
  const authorityViolations = normalizeStringList(
    value.observed.authority_violations ??
      (observedEffects ?? [])
        .filter((effect) => !repositoryEffects.includes(effect))
        .map((effect) => `repository_effect:${effect}`),
  );
  const verificationResultsSource = value.observed.verification_results ?? [];
  const verificationResults = Array.isArray(verificationResultsSource)
    ? verificationResultsSource
    : null;
  if (
    writableRoots === null ||
    allowedRepositoryEffects === null ||
    allowedRepositoryEffects.some((item) => !REPOSITORY_EFFECTS.has(item)) ||
    forbiddenRepositoryEffects === null ||
    forbiddenRepositoryEffects.some((item) => !REPOSITORY_EFFECTS.has(item)) ||
    allowedExternalEffects === null ||
    allowedExternalEffects.some((item) => !EXTERNAL_EFFECTS.has(item)) ||
    forbiddenExternalEffects === null ||
    forbiddenExternalEffects.some((item) => !EXTERNAL_EFFECTS.has(item)) ||
    approvalEffects === null ||
    approvalEffects.some((item) => !EXTERNAL_EFFECTS.has(item)) ||
    !requiredEvidence?.length ||
    observedEffects === null ||
    observedEffects.some((item) => !REPOSITORY_EFFECTS.has(item)) ||
    observedExternalEffects === null ||
    observedExternalEffects.some((item) => !EXTERNAL_EFFECTS.has(item)) ||
    changedPaths === null ||
    changedComponents === null ||
    authorityViolations === null ||
    verificationResults === null ||
    verificationResults.some(
      (item) =>
        !isRecord(item) ||
        typeof item.id !== "string" ||
        !item.id.trim() ||
        (item.result !== "pass" && item.result !== "fail" && item.result !== "unsupported"),
    )
  ) {
    return undefined;
  }
  const escalation = value.escalation;
  if (escalation !== undefined && !isRecord(escalation)) return undefined;
  const escalationReasons = escalation ? normalizeStringList(escalation.reason_codes) : null;
  const preservedPaths = escalation
    ? normalizeStringList(escalation.preserved_changed_paths)
    : null;
  if (
    escalation &&
    (escalation.from !== "direct" ||
      escalation.to !== "branch_pr" ||
      !escalationReasons?.length ||
      !preservedPaths?.length ||
      (escalation.preserved_commit !== undefined &&
        typeof escalation.preserved_commit !== "string"))
  ) {
    return undefined;
  }
  return {
    schema_version: 1,
    source: value.source,
    declaration: {
      schema_version: 1,
      preferred_mode: declaration.preferred_mode,
      scope_roots: scopeRoots,
      repository_effects: repositoryEffects as NonNullable<
        TaskData["execution_contract"]
      >["declaration"]["repository_effects"],
      external_effects: externalEffects as NonNullable<
        TaskData["execution_contract"]
      >["declaration"]["external_effects"],
      uncertainty: declaration.uncertainty,
      reversibility: declaration.reversibility,
      rationale,
    },
    selected_mode: value.selected_mode,
    repository_mode: value.repository_mode,
    reason_codes: reasons,
    authority: {
      writable_roots: writableRoots,
      allowed_repository_effects: allowedRepositoryEffects as NonNullable<
        TaskData["execution_contract"]
      >["authority"]["allowed_repository_effects"],
      forbidden_repository_effects: forbiddenRepositoryEffects as NonNullable<
        TaskData["execution_contract"]
      >["authority"]["forbidden_repository_effects"],
      allowed_external_effects: allowedExternalEffects as NonNullable<
        TaskData["execution_contract"]
      >["authority"]["allowed_external_effects"],
      forbidden_external_effects: forbiddenExternalEffects as NonNullable<
        TaskData["execution_contract"]
      >["authority"]["forbidden_external_effects"],
    },
    safety: {
      requires_worktree: value.safety.requires_worktree,
      requires_user_approval: value.safety.requires_user_approval,
      approval_effects: approvalEffects as NonNullable<
        TaskData["execution_contract"]
      >["safety"]["approval_effects"],
    },
    verification: { required_evidence: requiredEvidence },
    observed: {
      repository_effects: observedEffects as NonNullable<
        TaskData["execution_contract"]
      >["observed"]["repository_effects"],
      external_effects: observedExternalEffects as NonNullable<
        TaskData["execution_contract"]
      >["observed"]["external_effects"],
      changed_paths: changedPaths,
      changed_components: changedComponents,
      verification_results: verificationResults as NonNullable<
        TaskData["execution_contract"]
      >["observed"]["verification_results"],
      authority_violations: authorityViolations,
    },
    ...(escalation
      ? {
          escalation: {
            from: "direct" as const,
            to: "branch_pr" as const,
            reason_codes: escalationReasons ?? [],
            preserved_changed_paths: preservedPaths ?? [],
            ...(typeof escalation.preserved_commit === "string"
              ? { preserved_commit: escalation.preserved_commit }
              : {}),
          },
        }
      : {}),
  };
}

export function taskRecordToData(record: TaskRecord): TaskData {
  const fm = record.frontmatter as unknown as Record<string, unknown>;
  const comments = Array.isArray(fm.comments)
    ? fm.comments
        .filter((item) => isRecord(item))
        .filter(
          (item): item is { author: string; body: string } =>
            typeof item.author === "string" && typeof item.body === "string",
        )
        .map((item) => ({ author: item.author, body: item.body }))
    : [];

  const commit =
    isRecord(fm.commit) &&
    typeof fm.commit.hash === "string" &&
    typeof fm.commit.message === "string"
      ? { hash: fm.commit.hash, message: fm.commit.message }
      : null;

  const events = normalizeEvents(fm.events);
  const planApproval = normalizePlanApproval(fm.plan_approval);
  const verification = normalizeVerificationResult(fm.verification);
  const qualityReview = normalizeQualityReviewResult(fm.quality_review);
  const origin = normalizeTaskOrigin(fm.origin);
  const runner = normalizeTaskRunnerOutcome(fm.runner);
  const tokenUsage = normalizeTaskTokenUsage(fm.token_usage);
  const sections = mergeTaskDocSections({
    frontmatterSections: normalizeCanonicalSections(fm.sections),
    body: record.body,
  });
  const doc = sections ? renderTaskDocFromSections(sections) : extractTaskDoc(record.body);

  const baseId = typeof fm.id === "string" ? fm.id : typeof record.id === "string" ? record.id : "";
  const task: TaskData = {
    id: baseId.trim(),
    title: typeof fm.title === "string" ? fm.title : "",
    result_summary: typeof fm.result_summary === "string" ? fm.result_summary : undefined,
    risk_level:
      fm.risk_level === "low" || fm.risk_level === "med" || fm.risk_level === "high"
        ? fm.risk_level
        : undefined,
    breaking: typeof fm.breaking === "boolean" ? fm.breaking : undefined,
    description: typeof fm.description === "string" ? fm.description : "",
    status: normalizeTaskStatus(fm.status),
    priority: typeof fm.priority === "string" || typeof fm.priority === "number" ? fm.priority : "",
    owner: typeof fm.owner === "string" ? fm.owner : "",
    revision: normalizeRevision(fm.revision) ?? 1,
    origin: origin ?? undefined,
    depends_on: normalizeDependsOn(fm.depends_on),
    tags: toStringArray(fm.tags),
    task_kind: stringEnumValue<TaskData["task_kind"] & string>(fm.task_kind, TASK_KIND_VALUES),
    mutation_scope: stringEnumValue<TaskData["mutation_scope"] & string>(
      fm.mutation_scope,
      MUTATION_SCOPE_VALUES,
    ),
    risk_flags: stringEnumArray<NonNullable<TaskData["risk_flags"]>[number]>(
      fm.risk_flags,
      RISK_FLAG_VALUES,
    ),
    blueprint_request: stringEnumValue<TaskData["blueprint_request"] & string>(
      fm.blueprint_request,
      BLUEPRINT_REQUEST_VALUES,
    ),
    verify: toStringArray(fm.verify),
    plan_approval: planApproval ?? undefined,
    verification: verification ?? undefined,
    quality_review: qualityReview ?? undefined,
    runner: runner ?? undefined,
    token_usage: tokenUsage ?? undefined,
    execution_route: normalizeExecutionRoute(fm.execution_route),
    execution_contract: normalizeExecutionContract(fm.execution_contract),
    sync: isRecord(fm.sync) ? (fm.sync as TaskData["sync"]) : undefined,
    commit,
    comments,
    events,
    extensions: isRecord(fm.extensions) ? fm.extensions : undefined,
    doc_version:
      typeof fm.doc_version === "number" ? normalizeTaskDocVersion(fm.doc_version) : undefined,
    doc_updated_at: typeof fm.doc_updated_at === "string" ? fm.doc_updated_at : undefined,
    doc_updated_by: typeof fm.doc_updated_by === "string" ? fm.doc_updated_by : undefined,
    dirty: typeof fm.dirty === "boolean" ? fm.dirty : undefined,
    id_source: typeof fm.id_source === "string" ? fm.id_source : undefined,
  };

  if (doc) task.doc = doc;
  task.sections = sections ?? (doc ? taskDocToSectionMap(doc) : undefined);

  return task;
}
