import { type CommandContext } from "../shared/task-backend.js";
type TaskDocSnapshot = {
    id?: unknown;
    status?: unknown;
    doc_version?: unknown;
};
export declare function buildTaskReadmeMigrationFindings(tasks: TaskDocSnapshot[]): string[];
export declare function checkTaskReadmeMigrationState(repoRoot: string, ctx?: CommandContext): Promise<string[]>;
export declare function checkDoneTaskReadmeArchiveDrift(repoRoot: string, ctx?: CommandContext): Promise<string[]>;
export declare function checkTaskProjectionDrift(repoRoot: string, ctx?: CommandContext): Promise<string[]>;
export {};
//# sourceMappingURL=workspace-task-state.d.ts.map