import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
import type { CommandContext } from "../../shared/task-backend.js";
import type { LocalMergedPrMeta } from "./model.js";
export declare function resolveLocalMergedPrMeta(meta: TaskPrMeta | null): LocalMergedPrMeta | null;
export declare function readPrMetaIfPresent(opts: {
    ctx: CommandContext;
    taskId: string;
}): Promise<{
    meta: TaskPrMeta;
    metaPath: string;
} | null>;
//# sourceMappingURL=pr-meta.d.ts.map