import { CommandRegistry } from "../spec/registry.js";
import type { RunDeps } from "./command-catalog/kernel.js";
export declare function buildRegistry(opts: {
    getCtx: RunDeps["getCtx"];
    getResolvedProject: RunDeps["getResolvedProject"];
    getLoadedConfig: RunDeps["getLoadedConfig"];
}): CommandRegistry;
//# sourceMappingURL=registry.run.d.ts.map