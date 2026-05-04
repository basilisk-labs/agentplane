import type { HookName } from "./shared.js";
export type HooksRunOptions = {
    cwd: string;
    rootOverride?: string;
    hook: HookName;
    args: string[];
};
export declare function cmdHooksRun(opts: HooksRunOptions): Promise<number>;
//# sourceMappingURL=run.d.ts.map