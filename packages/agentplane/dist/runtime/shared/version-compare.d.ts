export type ParsedVersionParts = {
    main: number[];
    prerelease: string | null;
};
export declare function parseVersionParts(version: string): ParsedVersionParts;
export declare function compareVersions(left: string, right: string): number;
//# sourceMappingURL=version-compare.d.ts.map