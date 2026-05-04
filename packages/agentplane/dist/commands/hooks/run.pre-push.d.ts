import type { HooksRunOptions } from "./run.js";
export declare function resolvePrePushHookScriptPath(gitRoot: string, opts?: {
    bundledScriptPath?: string;
}): Promise<string | null>;
export declare function runPrePushHook(opts: HooksRunOptions): Promise<number>;
//# sourceMappingURL=run.pre-push.d.ts.map