import { type PrMeta } from "../../shared/pr-meta.js";
import { type CommandContext } from "../../shared/task-backend.js";
import type { PrOpenOutcome, PrRemoteMode } from "./sync-model.js";
type PrSyncMode = "open" | "update";
export type { PrOpenOutcome, PrRemoteMode } from "./sync-model.js";
export declare function ensurePrArtifactsSynced(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    author?: string;
    branch?: string;
}): Promise<{
    branch: string;
    prDir: string;
    resolved: {
        gitRoot: string;
    };
} | null>;
export declare function syncPrArtifacts(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    mode: PrSyncMode;
    author?: string;
    branch?: string;
    includeTaskIds?: string[];
    remoteMode?: PrRemoteMode;
}): Promise<{
    meta: PrMeta;
    prDir: string;
    resolved: {
        gitRoot: string;
    };
    openOutcome?: PrOpenOutcome;
}>;
//# sourceMappingURL=sync.d.ts.map