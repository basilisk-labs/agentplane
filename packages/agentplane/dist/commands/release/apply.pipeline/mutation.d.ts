import { GitContext } from "@agentplaneorg/core/git";
import type { ReleaseCommandMutation, ReleaseCommandState } from "../apply.types.js";
export declare function applyReleaseMutation(opts: {
    agentplaneDir: string;
    gitRoot: string;
    git: GitContext;
    notesPath: string;
    corePkgPath: string;
    agentplanePkgPath: string;
    recipesPkgPath: string;
    testkitPkgPath: string;
    nextTag: string;
    nextVersion: string;
    route: ReleaseCommandState["route"];
    taskBranchPrefix: string;
}): Promise<ReleaseCommandMutation>;
export declare function runReleaseCommandExecute(state: ReleaseCommandState): Promise<ReleaseCommandMutation>;
//# sourceMappingURL=mutation.d.ts.map