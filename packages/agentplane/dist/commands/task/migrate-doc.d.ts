import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { type CommandContext } from "../shared/task-backend.js";
export type TaskDocMigrationResult = {
    changed: number;
    changedPaths: string[];
};
export declare function migrateTaskDocsInWorkspace(opts: {
    cwd: string;
    rootOverride?: string | null;
    all: boolean;
    taskIds: string[];
    resolvedProject?: Awaited<ReturnType<typeof resolveProject>>;
    config?: AgentplaneConfig;
    ctx?: CommandContext;
}): Promise<TaskDocMigrationResult>;
export declare function cmdTaskMigrateDoc(opts: {
    cwd: string;
    rootOverride?: string;
    all: boolean;
    quiet: boolean;
    taskIds: string[];
}): Promise<number>;
//# sourceMappingURL=migrate-doc.d.ts.map