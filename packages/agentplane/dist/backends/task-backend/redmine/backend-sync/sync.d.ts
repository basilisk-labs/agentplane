import { type TaskData } from "../../shared.js";
import type { RedmineSyncContext } from "./context.js";
export declare function syncRedmine(context: RedmineSyncContext, opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
}): Promise<void>;
export declare function syncPushRedmine(context: RedmineSyncContext, quiet: boolean, confirm: boolean): Promise<void>;
export declare function syncPullRedmine(context: RedmineSyncContext, conflict: "diff" | "prefer-local" | "prefer-remote" | "fail", quiet: boolean): Promise<void>;
export declare function handleRedmineConflict(context: RedmineSyncContext, taskId: string, localTask: TaskData, remoteTask: TaskData, conflict: "diff" | "prefer-local" | "prefer-remote" | "fail"): Promise<void>;
//# sourceMappingURL=sync.d.ts.map