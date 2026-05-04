import type { FrameworkManifest } from "./types.js";
type MaterializeFlags = {
    source?: string;
    tag?: string;
    bundle?: string;
    checksum?: string;
    asset?: string;
    checksumAsset?: string;
    remote: boolean;
    allowTarball: boolean;
};
export type MaterializedUpgrade = {
    tempRoot: string;
    extractRoot: string | null;
    bundleLayout: "local_assets" | "upgrade_bundle" | "repo_tarball";
    bundleRoot: string;
    manifest: FrameworkManifest;
    normalizedSourceToPersist: string | null;
    upgradeVersionLabel: string;
};
export declare function materializeUpgradeSource(opts: {
    flags: MaterializeFlags;
    frameworkSource: string;
    assetsDirUrl: URL;
    ensureApproved: (reason: string) => Promise<void>;
}): Promise<MaterializedUpgrade>;
export {};
//# sourceMappingURL=materialize.d.ts.map