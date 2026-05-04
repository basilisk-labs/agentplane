export type UpgradeFlags = {
    source?: string;
    tag?: string;
    bundle?: string;
    checksum?: string;
    asset?: string;
    checksumAsset?: string;
    mode: "agent" | "auto";
    remote: boolean;
    allowTarball: boolean;
    dryRun: boolean;
    backup: boolean;
    migrateTaskDocs: boolean;
    yes: boolean;
};
export declare function cmdUpgradeParsed(opts: {
    cwd: string;
    rootOverride?: string;
    flags: UpgradeFlags;
}): Promise<number>;
export { normalizeFrameworkSourceForUpgrade, resolveRepoTarballUrl, resolveUpgradeDownloadFromRelease, } from "./upgrade/source.js";
//# sourceMappingURL=upgrade.d.ts.map