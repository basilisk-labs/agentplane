export declare function readPackageVersion(pkgJsonPath: string): Promise<string>;
export declare function readCoreDependencyVersion(pkgJsonPath: string): Promise<string>;
export declare function readRecipesDependencyVersion(pkgJsonPath: string): Promise<string>;
export declare function readAgentplaneDependencyVersion(pkgJsonPath: string): Promise<string>;
export declare function readOptionalAgentplaneDependencyVersion(pkgJsonPath: string): Promise<string | null>;
export declare function validateReleaseNotes(notesPath: string, minBullets: number): Promise<void>;
//# sourceMappingURL=apply.preflight.package.d.ts.map