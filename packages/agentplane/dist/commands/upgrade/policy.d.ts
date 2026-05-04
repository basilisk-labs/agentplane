import type { FrameworkManifestEntry } from "./types.js";
export declare const INCIDENTS_POLICY_PATH = ".agentplane/policy/incidents.md";
export declare const INCIDENTS_APPEND_MARKER = "<!-- AGENTPLANE:UPGRADE-APPEND incidents.md -->";
export declare const CONFIG_REL_PATH = ".agentplane/config.json";
export declare const WORKFLOW_REL_PATH = ".agentplane/WORKFLOW.md";
export declare function isDeniedUpgradePath(relPath: string): boolean;
export declare function isAllowedUpgradePath(relPath: string): boolean;
export declare function textChangedForType(opts: {
    type: FrameworkManifestEntry["type"];
    aText: string | null;
    bText: string | null;
}): boolean;
export declare function mergeIncidentsPolicy(opts: {
    incomingText: string;
    currentText: string;
    baselineText: string | null;
}): {
    nextText: string;
    appended: boolean;
    appendedCount: number;
};
export declare function normalizeUpgradeVersionLabel(input: string): string;
export declare function normalizeVersionForConfig(input: string): string | null;
export declare function toUpgradeBaselineKey(rel: string): string | null;
//# sourceMappingURL=policy.d.ts.map