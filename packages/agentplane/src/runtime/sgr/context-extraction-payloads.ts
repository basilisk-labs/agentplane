import type {
  ContextExtractionCandidateEntity,
  ContextExtractionCanonicalPage,
  ContextExtractionEntityResolutionRow,
  ContextExtractionPageFamily,
  ContextExtractionPageCreationRow,
  ContextExtractionSourceShape,
  ContextExtractionTopologyDecisionRow,
} from "./contract-types.js";
import {
  invalid,
  optionalNumber,
  optionalString,
  optionalStringArray,
  requireArray,
  requireNonEmptyArray,
  requireRecord,
  requireString,
} from "./contract-validators.js";

function validateCandidateEntity(raw: unknown, field: string): ContextExtractionCandidateEntity {
  const candidate = requireRecord(raw, field);
  return {
    entity_id: requireString(candidate.entity_id, `${field}.entity_id`),
    label: optionalString(candidate.label, `${field}.label`),
    reason: requireString(candidate.reason, `${field}.reason`),
    evidence_for: optionalStringArray(candidate.evidence_for, `${field}.evidence_for`),
    evidence_against: optionalStringArray(candidate.evidence_against, `${field}.evidence_against`),
  };
}

const ENTITY_RESOLUTION_DECISIONS = new Set([
  "same_as",
  "alias_of",
  "distinct_entity",
  "possibly_same_as",
  "new_entity_proposal",
]);

export function validateEntityResolutionPayload(
  raw: unknown,
  field: string,
): ContextExtractionEntityResolutionRow {
  const row = requireRecord(raw, field);
  const resolution = requireString(row.resolution, `${field}.resolution`);
  if (!ENTITY_RESOLUTION_DECISIONS.has(resolution)) {
    throw invalid(
      `${field}.resolution`,
      "same_as|alias_of|distinct_entity|possibly_same_as|new_entity_proposal",
    );
  }
  const candidateEntities = requireArray(
    row.candidate_entities_checked,
    `${field}.candidate_entities_checked`,
    validateCandidateEntity,
  );
  const validated: ContextExtractionEntityResolutionRow = {
    ...row,
    source_term: requireString(row.source_term, `${field}.source_term`),
    resolution: resolution as ContextExtractionEntityResolutionRow["resolution"],
    canonical_entity_id: optionalString(row.canonical_entity_id, `${field}.canonical_entity_id`),
    proposed_entity_id: optionalString(row.proposed_entity_id, `${field}.proposed_entity_id`),
    candidate_entities_checked: candidateEntities,
    comparison_dimensions: requireNonEmptyArray(
      row.comparison_dimensions,
      `${field}.comparison_dimensions`,
      requireString,
    ),
    evidence_for: requireArray(row.evidence_for, `${field}.evidence_for`, requireString),
    evidence_against: requireArray(
      row.evidence_against,
      `${field}.evidence_against`,
      requireString,
    ),
    decision_rationale: requireString(row.decision_rationale, `${field}.decision_rationale`),
    unresolved_questions: optionalStringArray(
      row.unresolved_questions,
      `${field}.unresolved_questions`,
    ),
    why_not_existing: optionalString(row.why_not_existing, `${field}.why_not_existing`),
    why_not_alias_of_existing: optionalString(
      row.why_not_alias_of_existing,
      `${field}.why_not_alias_of_existing`,
    ),
  };
  if (resolution === "same_as" || resolution === "alias_of") {
    if (!validated.canonical_entity_id) {
      throw invalid(`${field}.canonical_entity_id`, `non-empty string for ${resolution}`);
    }
    if (
      !candidateEntities.some((candidate) => candidate.entity_id === validated.canonical_entity_id)
    ) {
      throw invalid(
        `${field}.candidate_entities_checked`,
        `candidate containing canonical_entity_id for ${resolution}`,
      );
    }
    if (validated.evidence_for.length === 0) {
      throw invalid(`${field}.evidence_for`, `non-empty array for ${resolution}`);
    }
  }
  if (resolution === "possibly_same_as") {
    if (candidateEntities.length === 0) {
      throw invalid(`${field}.candidate_entities_checked`, "non-empty array for possibly_same_as");
    }
    if (!validated.unresolved_questions?.length) {
      throw invalid(`${field}.unresolved_questions`, "non-empty array for possibly_same_as");
    }
  }
  if (resolution === "distinct_entity" && candidateEntities.length === 0) {
    throw invalid(`${field}.candidate_entities_checked`, "non-empty array for distinct_entity");
  }
  if (resolution === "new_entity_proposal") {
    if (!validated.proposed_entity_id) {
      throw invalid(`${field}.proposed_entity_id`, "non-empty string for new_entity_proposal");
    }
    if (!validated.why_not_existing && !validated.why_not_alias_of_existing) {
      throw invalid(`${field}.why_not_existing`, "non-empty rationale for new_entity_proposal");
    }
  }
  return validated;
}

export function validatePageCreationPayload(
  raw: unknown,
  field: string,
): ContextExtractionPageCreationRow {
  const row = requireRecord(raw, field);
  return {
    ...row,
    path: requireString(row.path, `${field}.path`),
    page_type: requireString(row.page_type, `${field}.page_type`),
    family_id: requireString(row.family_id, `${field}.family_id`),
    decision: requireString(row.decision, `${field}.decision`),
    canonical_entity_ids: optionalStringArray(
      row.canonical_entity_ids,
      `${field}.canonical_entity_ids`,
    ),
  };
}

function validateSourceShape(raw: unknown, field: string): ContextExtractionSourceShape {
  const shape = requireRecord(raw, field);
  return {
    primary: requireString(shape.primary, `${field}.primary`),
    rationale: requireString(shape.rationale, `${field}.rationale`),
    evidence_span_ids: requireNonEmptyArray(
      shape.evidence_span_ids,
      `${field}.evidence_span_ids`,
      requireString,
    ),
  };
}

function validatePageFamily(raw: unknown, field: string): ContextExtractionPageFamily {
  const family = requireRecord(raw, field);
  return {
    family_id: requireString(family.family_id, `${field}.family_id`),
    path_template: requireString(family.path_template, `${field}.path_template`),
    page_type: requireString(family.page_type, `${field}.page_type`),
    creation_rule: requireString(family.creation_rule, `${field}.creation_rule`),
    page_vs_heading_rule: requireString(
      family.page_vs_heading_rule,
      `${field}.page_vs_heading_rule`,
    ),
    source_evidence_span_ids: requireNonEmptyArray(
      family.source_evidence_span_ids,
      `${field}.source_evidence_span_ids`,
      requireString,
    ),
  };
}

function validateCanonicalPage(raw: unknown, field: string): ContextExtractionCanonicalPage {
  const page = requireRecord(raw, field);
  return {
    path: requireString(page.path, `${field}.path`),
    page_type: requireString(page.page_type, `${field}.page_type`),
    canonical_entity_ids: optionalStringArray(
      page.canonical_entity_ids,
      `${field}.canonical_entity_ids`,
    ),
    required_sections: optionalStringArray(page.required_sections, `${field}.required_sections`),
    source_evidence_span_ids: requireNonEmptyArray(
      page.source_evidence_span_ids,
      `${field}.source_evidence_span_ids`,
      requireString,
    ),
  };
}

export function validateTopologyDecisionPayload(
  raw: unknown,
  field: string,
): ContextExtractionTopologyDecisionRow {
  const row = requireRecord(raw, field);
  return {
    ...row,
    source_shape: validateSourceShape(row.source_shape, `${field}.source_shape`),
    canonical_page_families: requireNonEmptyArray(
      row.canonical_page_families,
      `${field}.canonical_page_families`,
      validatePageFamily,
    ),
    topology_version: optionalNumber(row.topology_version, `${field}.topology_version`),
    canonical_pages:
      row.canonical_pages === undefined
        ? undefined
        : requireArray(row.canonical_pages, `${field}.canonical_pages`, validateCanonicalPage),
    forbidden_creation_patterns: optionalStringArray(
      row.forbidden_creation_patterns,
      `${field}.forbidden_creation_patterns`,
    ),
  };
}
