import type { CommandContext } from "../commands/shared/task-backend.js";
import { SystemClockAdapter } from "./clock/system-clock-adapter.js";
import { NodeFileSystemAdapter } from "./fs/node-fs-adapter.js";
import { GitContextAdapter } from "./git/git-context-adapter.js";
import { TaskBackendAdapter } from "./task-backend/task-backend-adapter.js";
export type Adapters = {
    fs: NodeFileSystemAdapter;
    git: GitContextAdapter;
    tasks: TaskBackendAdapter;
    clock: SystemClockAdapter;
};
export declare function buildAdapters(ctx: CommandContext): Adapters;
//# sourceMappingURL=index.d.ts.map