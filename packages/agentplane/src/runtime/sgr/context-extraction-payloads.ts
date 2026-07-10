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
    reason: optionalString(candidate.reason, `${field}.reason`),
  };
}

export function validateEntityResolutionPayload(
  raw: unknown,
  field: string,
): ContextExtractionEntityResolutionRow {
  const row = requireRecord(raw, field);
  const resolution = requireString(row.resolution, `${field}.resolution`);
  const candidateEntities =
    row.candidate_entities_checked === undefined
      ? undefined
      : requireNonEmptyArray(
          row.candidate_entities_checked,
          `${field}.candidate_entities_checked`,
          validateCandidateEntity,
        );
  const validated: ContextExtractionEntityResolutionRow = {
    ...row,
    source_term: requireString(row.source_term, `${field}.source_term`),
    resolution,
    canonical_entity_id: optionalString(row.canonical_entity_id, `${field}.canonical_entity_id`),
    proposed_entity_id: optionalString(row.proposed_entity_id, `${field}.proposed_entity_id`),
    candidate_entities_checked: candidateEntities,
    why_not_existing: optionalString(row.why_not_existing, `${field}.why_not_existing`),
    why_not_alias_of_existing: optionalString(
      row.why_not_alias_of_existing,
      `${field}.why_not_alias_of_existing`,
    ),
  };
  if (resolution === "new_entity_proposal") {
    if (!validated.proposed_entity_id) {
      throw invalid(`${field}.proposed_entity_id`, "non-empty string for new_entity_proposal");
    }
    if (!candidateEntities?.length) {
      throw invalid(
        `${field}.candidate_entities_checked`,
        "non-empty array for new_entity_proposal",
      );
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
