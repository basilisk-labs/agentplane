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
  fixability: "external" | null;
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
  fixability: "external" | null;
  line: number;
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
  promotable: IncidentPromotionDraft[];
  duplicates: IncidentPromotionDraft[];
  issues: IncidentPromotionIssue[];
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
