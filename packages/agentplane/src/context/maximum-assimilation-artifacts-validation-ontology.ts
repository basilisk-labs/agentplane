import path from "node:path";

import { fileExists, parseJsonlLines, readText, toPosix } from "./context-utils.js";

function rowSourceRefs(row: Record<string, unknown>): string[] {
  const out: string[] = [];
  if (typeof row.source_ref === "string" && row.source_ref.trim()) out.push(row.source_ref);
  if (typeof row.source === "string" && row.source.trim()) out.push(row.source);
  if (Array.isArray(row.source_refs)) {
    out.push(...row.source_refs.filter((value): value is string => typeof value === "string"));
  }
  return out;
}

async function loadJsonlRows(filePath: string): Promise<Record<string, unknown>[]> {
  if (!(await fileExists(filePath))) return [];
  return parseJsonlLines(await readText(filePath)) as Record<string, unknown>[];
}

async function readJsonFile(root: string, rel: string): Promise<Record<string, unknown> | null> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return null;
  try {
    const parsed = JSON.parse(await readText(abs)) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function stringField(row: Record<string, unknown>, field: string): string {
  const value = row[field];
  return typeof value === "string" ? value.trim() : "";
}

function stringArray(row: Record<string, unknown>, field: string): string[] {
  const value = row[field];
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "");
}

function hasRecordArray(row: Record<string, unknown>, field: string): boolean {
  const value = row[field];
  return Array.isArray(value) && value.some((entry) => entry && typeof entry === "object");
}

function recordArray(row: Record<string, unknown>, field: string): Record<string, unknown>[] {
  const value = row[field];
  if (!Array.isArray(value)) return [];
  return value.filter(
    (entry): entry is Record<string, unknown> =>
      Boolean(entry) && typeof entry === "object" && !Array.isArray(entry),
  );
}

const ENTITY_RESOLUTION_DECISIONS = new Set([
  "same_as",
  "alias_of",
  "distinct_entity",
  "possibly_same_as",
  "new_entity_proposal",
  "canonical_entity",
]);

function pathTemplatePrefix(pathTemplate: string): string {
  const marker = pathTemplate.indexOf("{");
  const prefix = marker === -1 ? pathTemplate : pathTemplate.slice(0, marker);
  return toPosix(prefix);
}

function pageFamilyAllowsPath(family: Record<string, unknown>, rel: string): boolean {
  const pathTemplate = stringField(family, "path_template");
  const prefix = pathTemplatePrefix(pathTemplate);
  if (prefix === "") return false;
  if (!pathTemplate.includes("{")) {
    return rel === prefix || rel.startsWith(`${prefix.replace(/\/+$/u, "")}/`);
  }
  if (prefix.endsWith("/")) return rel.startsWith(prefix);
  return rel === prefix || rel.startsWith(`${prefix}/`);
}

function isExemptWikiPage(rel: string): boolean {
  return (
    rel === "context/wiki/index.md" ||
    rel === "context/wiki/log.md" ||
    rel === "context/wiki/glossary.md" ||
    rel.includes("/reports/") ||
    rel.includes("/maps/")
  );
}

export async function validateEntityResolution(root: string, errors: string[]): Promise<void> {
  const rel = ".agentplane/context/derived/ontology/entity-resolution.jsonl";
  const rows = await loadJsonlRows(path.join(root, rel));
  if (rows.length === 0) {
    errors.push(`${rel}: maximum-assimilation requires entity-resolution rows`);
    return;
  }
  const graphRows = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
  );
  const graphEntityIds = new Set(graphRows.map((row) => stringField(row, "id")).filter(Boolean));
  const resolvedEntityIds = new Set<string>();
  for (const row of rows) {
    const id = stringField(row, "id") || "<unknown>";
    const resolution = stringField(row, "resolution");
    const sourceTerm = stringField(row, "source_term");
    const canonicalEntityId = stringField(row, "canonical_entity_id");
    const proposedEntityId = stringField(row, "proposed_entity_id");
    if (!sourceTerm) errors.push(`${rel}#${id}: entity-resolution row missing source_term`);
    if (!resolution) errors.push(`${rel}#${id}: entity-resolution row missing resolution`);
    if (resolution && !ENTITY_RESOLUTION_DECISIONS.has(resolution)) {
      errors.push(`${rel}#${id}: unsupported entity-resolution decision ${resolution}`);
    }
    if (rowSourceRefs(row).length === 0) {
      errors.push(`${rel}#${id}: entity-resolution row has no source_ref/source_refs`);
    }
    if (resolution === "new_entity_proposal") {
      if (!proposedEntityId) {
        errors.push(`${rel}#${id}: new_entity_proposal requires proposed_entity_id`);
      }
      if (!hasRecordArray(row, "candidate_entities_checked")) {
        errors.push(`${rel}#${id}: new_entity_proposal requires candidate_entities_checked`);
      }
      if (!stringField(row, "why_not_existing") && !stringField(row, "why_not_alias_of_existing")) {
        errors.push(`${rel}#${id}: new_entity_proposal requires why_not_existing`);
      }
    }
    switch (resolution) {
      case "canonical_entity": {
        break;
      }
      default: {
        if (stringArray(row, "comparison_dimensions").length === 0) {
          errors.push(`${rel}#${id}: semantic decision requires comparison_dimensions`);
        }
        const missingEvidenceArrays =
          Array.isArray(row.evidence_for) === false ||
          Array.isArray(row.evidence_against) === false;
        if (missingEvidenceArrays) {
          errors.push(`${rel}#${id}: semantic decision requires evidence_for and evidence_against`);
        }
        if (!stringField(row, "decision_rationale")) {
          errors.push(`${rel}#${id}: semantic decision requires decision_rationale`);
        }
        break;
      }
    }
    const candidates = recordArray(row, "candidate_entities_checked");
    if (resolution === "same_as" || resolution === "alias_of") {
      if (canonicalEntityId) {
        if (!graphEntityIds.has(canonicalEntityId)) {
          errors.push(`${rel}#${id}: canonical entity ${canonicalEntityId} does not exist`);
        }
        if (
          !candidates.some((candidate) => stringField(candidate, "entity_id") === canonicalEntityId)
        ) {
          errors.push(
            `${rel}#${id}: ${resolution} must compare canonical_entity_id as a candidate`,
          );
        }
      } else {
        errors.push(`${rel}#${id}: ${resolution} requires canonical_entity_id`);
      }
      if (stringArray(row, "evidence_for").length === 0) {
        errors.push(`${rel}#${id}: ${resolution} requires positive identity evidence`);
      }
    }
    if (resolution === "possibly_same_as") {
      if (candidates.length === 0) {
        errors.push(`${rel}#${id}: possibly_same_as requires candidate_entities_checked`);
      }
      if (stringArray(row, "unresolved_questions").length === 0) {
        errors.push(`${rel}#${id}: possibly_same_as requires unresolved_questions`);
      }
    }
    if (resolution === "distinct_entity" && candidates.length === 0) {
      errors.push(`${rel}#${id}: distinct_entity requires candidate_entities_checked`);
    }
    if (canonicalEntityId) resolvedEntityIds.add(canonicalEntityId);
    if (proposedEntityId) resolvedEntityIds.add(proposedEntityId);
  }

  for (const row of graphRows) {
    const entityId = stringField(row, "id");
    if (entityId && !resolvedEntityIds.has(entityId)) {
      errors.push(`${rel}: missing entity-resolution row for graph entity ${entityId}`);
    }
  }

  const aliasTargets = new Map<string, Set<string>>();
  for (const row of await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/ontology/aliases.jsonl"),
  )) {
    const alias = stringField(row, "alias").toLowerCase();
    const canonicalEntityId = stringField(row, "canonical_entity_id");
    if (!alias || !canonicalEntityId) continue;
    const targets = aliasTargets.get(alias) ?? new Set<string>();
    targets.add(canonicalEntityId);
    aliasTargets.set(alias, targets);
  }
  for (const [alias, targets] of aliasTargets) {
    if (targets.size > 1)
      errors.push(`${rel}: alias ${alias} points to multiple canonical entities`);
  }
}

export async function validateTopologyPlan(
  root: string,
  changedPaths: string[],
  errors: string[],
): Promise<void> {
  const rel = ".agentplane/context/derived/wiki/topology.plan.json";
  const plan = await readJsonFile(root, rel);
  if (!plan) {
    errors.push(`${rel}: maximum-assimilation requires a structured topology plan`);
    return;
  }
  if (plan.schema_version !== 1) errors.push(`${rel}: topology plan schema_version must be 1`);
  if (plan.mode !== "maximum_assimilation") {
    errors.push(`${rel}: topology plan mode must be maximum_assimilation`);
  }
  const sourceShape = plan.source_shape;
  if (!sourceShape || typeof sourceShape !== "object" || Array.isArray(sourceShape)) {
    errors.push(`${rel}: topology plan missing source_shape`);
  } else {
    const shape = sourceShape as Record<string, unknown>;
    if (!stringField(shape, "primary")) errors.push(`${rel}: source_shape.primary is required`);
    if (!stringField(shape, "rationale")) errors.push(`${rel}: source_shape.rationale is required`);
    if (stringArray(shape, "evidence_span_ids").length === 0) {
      errors.push(`${rel}: source_shape.evidence_span_ids is required`);
    }
  }
  const families = Array.isArray(plan.canonical_page_families)
    ? plan.canonical_page_families.filter(
        (entry): entry is Record<string, unknown> =>
          Boolean(entry) && typeof entry === "object" && !Array.isArray(entry),
      )
    : [];
  if (families.length === 0) errors.push(`${rel}: canonical_page_families is required`);
  for (const family of families) {
    const familyId = stringField(family, "family_id") || "<unknown>";
    if (!stringField(family, "path_template")) {
      errors.push(`${rel}#${familyId}: page family requires path_template`);
    }
    if (!stringField(family, "page_type")) {
      errors.push(`${rel}#${familyId}: page family requires page_type`);
    }
    if (stringArray(family, "source_evidence_span_ids").length === 0) {
      errors.push(`${rel}#${familyId}: page family requires source_evidence_span_ids`);
    }
  }

  const changedWikiPages = changedPaths.filter(
    (changed) =>
      changed.startsWith("context/wiki/") &&
      (changed.endsWith(".md") || changed.endsWith(".mdx")) &&
      !isExemptWikiPage(changed),
  );
  for (const changed of changedWikiPages) {
    if (!families.some((family) => pageFamilyAllowsPath(family, changed))) {
      errors.push(`${changed}: wiki page is not covered by topology plan page families`);
    }
  }
}

export async function validatePageCreation(
  root: string,
  changedPaths: string[],
  errors: string[],
): Promise<void> {
  const rel = ".agentplane/context/derived/ontology/page-creation.jsonl";
  const rows = await loadJsonlRows(path.join(root, rel));
  if (rows.length === 0) {
    errors.push(`${rel}: maximum-assimilation requires page-creation rows`);
    return;
  }
  const pageRows = new Map<string, Record<string, unknown>>();
  for (const row of rows) {
    const id = stringField(row, "id") || "<unknown>";
    const pagePath = stringField(row, "path") || stringField(row, "target_path");
    if (!pagePath) errors.push(`${rel}#${id}: page-creation row missing path`);
    if (!stringField(row, "page_type")) {
      errors.push(`${rel}#${id}: page-creation row missing page_type`);
    }
    if (!stringField(row, "family_id")) {
      errors.push(`${rel}#${id}: page-creation row missing family_id`);
    }
    if (rowSourceRefs(row).length === 0) {
      errors.push(`${rel}#${id}: page-creation row has no source_ref/source_refs`);
    }
    if (stringArray(row, "span_refs").length === 0) {
      errors.push(`${rel}#${id}: page-creation row requires span_refs`);
    }
    if (pagePath) pageRows.set(pagePath, row);
  }
  const changedWikiPages = changedPaths.filter(
    (changed) =>
      changed.startsWith("context/wiki/") &&
      (changed.endsWith(".md") || changed.endsWith(".mdx")) &&
      !isExemptWikiPage(changed),
  );
  for (const changed of changedWikiPages) {
    if (!pageRows.has(changed)) {
      errors.push(`${changed}: new or changed wiki page requires page-creation row`);
    }
  }
}
