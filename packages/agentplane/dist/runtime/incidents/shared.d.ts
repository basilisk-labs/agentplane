import type { IncidentAdviceMatch, IncidentRegistry, IncidentRegistryEntry, IncidentRegistryEntryState } from "./types.js";
export declare const STRUCTURED_INCIDENTS_HEADER: string;
export declare const COMPACT_INCIDENTS_HEADER: string;
export declare function normalizeLines(text: string): string[];
export declare function normalizeKey(key: string): string;
export declare function normalizeSearchText(text: string): string;
export declare function tokenize(text: string): string[];
export declare function dedupeCaseInsensitive(values: readonly string[]): string[];
export declare function parseCsvList(value: string | null | undefined): string[];
export declare function incidentField(key: string, value: string): [string, string];
export declare function parseBoolean(value: string | null | undefined): boolean;
export declare function parseFixability(value: string | null | undefined): "external" | "repo-fixable" | null;
export declare function parseEntryState(value: string | null | undefined): IncidentRegistryEntryState;
export declare function appendFieldValue(record: Record<string, string>, key: string, value: string, joiner?: string): void;
export declare function deriveSourceTask(explicitSourceTask: string | null | undefined, evidence: string | null | undefined): string | null;
export declare function buildIncidentSignature(entry: Pick<IncidentRegistryEntry, "scope" | "failure" | "rule">): string;
export declare function buildIncidentFingerprint(entry: Pick<IncidentRegistryEntry, "sourceTask" | "scope" | "failure" | "rule">): string;
export declare function buildMatchTerms(opts: {
    scope: string;
    tags: readonly string[];
    explicitMatch: readonly string[];
    extraText?: readonly string[];
}): string[];
export declare function compareIncidentAdviceMatch(left: IncidentAdviceMatch, right: IncidentAdviceMatch): number;
export declare function summarizeTaskScope(scope: string | null | undefined, title: string): string;
export declare function buildDerivedIncidentRule(scope: string): string;
export declare function resolveIncidentState(opts: {
    registry: IncidentRegistry;
    entry: Pick<IncidentRegistryEntry, "scope" | "failure" | "rule">;
    now: Date;
}): IncidentRegistryEntryState;
//# sourceMappingURL=shared.d.ts.map