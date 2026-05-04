import type { RunnerResultManifest } from "./types.js";
export declare function normalizeRecipeArtifactPrefixes(raw: string[] | undefined): string[];
export declare function readRecipeArtifactPrefixesFromRunnerEnv(env: Record<string, string> | undefined): string[] | undefined;
export declare function assertRunnerManifestArtifactPolicy(opts: {
    adapter_id: string;
    allowed_prefixes: string[] | undefined;
    manifest: RunnerResultManifest | null;
}): void;
//# sourceMappingURL=result-manifest-policy.d.ts.map