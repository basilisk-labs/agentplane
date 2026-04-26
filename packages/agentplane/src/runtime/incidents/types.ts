export const INCIDENTS_POLICY_PATH = ".agentplane/policy/incidents.md";
export const INCIDENTS_POLICY_ASSET_PATH = "packages/agentplane/assets/policy/incidents.md";

export type IncidentRegistryEntryState = "open" | "stabilized" | "promoted";

export type IncidentRegistryEntry = {
  id: string;
  date: string;
  scope: string;
  failure: string;
  rule: string;
  evidence: string;
  enforcement: string;
  state: IncidentRegistryEntryState;
  tags: string[];
  match: string[];
  advice: string | null;
  sourceTask: string | null;
  fixability: "external" | "repo-fixable" | null;
  rawFields: Record<string, string>;
  line: number;
};

export type IncidentRegistry = {
  entries: IncidentRegistryEntry[];
};

export type IncidentFindingCandidate = {
  observation: string;
  impact: string | null;
  resolution: string | null;
  promotion: string | null;
  incidentScope: string | null;
  incidentRule: string | null;
  incidentAdvice: string | null;
  incidentTags: string[];
  incidentMatch: string[];
  incidentExternal: boolean;
  incidentInternal: boolean;
  fixability: "external" | "repo-fixable" | null;
  line: number;
  rawFields: Record<string, string>;
};

export type IncidentSkippedFinding = {
  observation: string;
  line: number;
  reason: "not_marked_external_or_promotable";
  rawFields: Record<string, string>;
};

export type IncidentPromotionTaskContext = {
  id: string;
  title: string;
  description: string;
  scope?: string | null;
  tags: string[];
  commitHash?: string | null;
};

export type IncidentPromotionDraft = {
  candidate: IncidentFindingCandidate;
  entry: IncidentRegistryEntry;
  fingerprint: string;
};

export type IncidentPromotionIssue = {
  candidate: IncidentFindingCandidate;
  missingFields: string[];
};

export type IncidentCollectionPlan = {
  candidates: IncidentFindingCandidate[];
  skipped: IncidentSkippedFinding[];
  promotable: IncidentPromotionDraft[];
  duplicates: IncidentPromotionDraft[];
  issues: IncidentPromotionIssue[];
  findingsTextPresent: boolean;
  structuredFindingCount: number;
};

export type IncidentAdviceQuery = {
  taskId?: string;
  title: string;
  description: string;
  scope?: string | null;
  tags: string[];
};

export type IncidentAdviceMatch = {
  entry: IncidentRegistryEntry;
  score: number;
  matchedTags: string[];
  matchedTerms: string[];
  scopeMatched: boolean;
};
