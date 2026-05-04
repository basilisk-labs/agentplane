import type { CommandContext } from "../shared/task-backend.js";
export { buildTaskReadmeMigrationFindings, checkTaskReadmeMigrationState, } from "./workspace-task-state.js";
export declare function checkWorkspace(repoRoot: string, opts?: {
    ctx?: CommandContext;
    deep?: boolean;
}): Promise<string[]>;
//# sourceMappingURL=workspace.d.ts.map