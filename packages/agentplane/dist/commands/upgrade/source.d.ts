import type { FrameworkManifest, GitHubRelease } from "./types.js";
export declare function describeUpgradeSource(opts: {
    bundleLayout: "local_assets" | "upgrade_bundle" | "repo_tarball";
    hasExplicitBundle: boolean;
    useRemote: boolean;
}): string;
export declare function loadFrameworkManifestFromPath(manifestPath: string): Promise<FrameworkManifest>;
export declare function normalizeFrameworkSourceForUpgrade(source: string): {
    source: string;
    owner: string;
    repo: string;
};
export declare function resolveUpgradeDownloadFromRelease(opts: {
    release: GitHubRelease;
    owner: string;
    repo: string;
    assetName: string;
    checksumName: string;
}): {
    kind: "assets";
    bundleUrl: string;
    checksumUrl: string;
} | {
    kind: "tarball";
    tarballUrl: string;
};
export declare function resolveRepoTarballUrl(opts: {
    release: GitHubRelease;
    owner: string;
    repo: string;
    explicitTag?: string;
}): string;
export declare function resolveUpgradeRoot(extractedDir: string): Promise<string>;
//# sourceMappingURL=source.d.ts.map