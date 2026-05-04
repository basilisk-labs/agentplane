import { type InstalledRecipesFile } from "@agentplaneorg/recipes";
type ValidateInstalledRecipesFileOptions = {
    dropInvalidEntries?: boolean;
};
export declare function readInstalledRecipesFile(filePath: string): Promise<InstalledRecipesFile>;
export declare function readAndMigrateInstalledRecipesFile(filePath: string, opts?: ValidateInstalledRecipesFileOptions): Promise<InstalledRecipesFile>;
export declare function writeInstalledRecipesFile(filePath: string, file: InstalledRecipesFile): Promise<void>;
export {};
//# sourceMappingURL=installed-recipes.d.ts.map