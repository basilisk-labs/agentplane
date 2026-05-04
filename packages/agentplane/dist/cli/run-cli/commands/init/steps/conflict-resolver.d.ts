import type { InitClackPrompts } from "../prompts.js";
import type { InitPromptClack } from "./contracts.js";
type ConflictChoice = "overwrite" | "backup";
export declare function promptConflictResolverStep(opts: {
    clack: InitPromptClack & Pick<InitClackPrompts, "note">;
    gitRoot: string;
    conflicts: readonly string[];
}): Promise<ConflictChoice | null>;
export {};
//# sourceMappingURL=conflict-resolver.d.ts.map