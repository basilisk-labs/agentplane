import { type TaskData, type TaskWriteOptions } from "../../shared.js";
import { type RedmineSyncContext } from "./context.js";
export declare function writeRedmineTask(context: RedmineSyncContext, task: TaskData, opts?: TaskWriteOptions): Promise<void>;
export declare function writeRedmineTasks(context: RedmineSyncContext, tasks: TaskData[], opts?: TaskWriteOptions): Promise<void>;
//# sourceMappingURL=write.d.ts.map