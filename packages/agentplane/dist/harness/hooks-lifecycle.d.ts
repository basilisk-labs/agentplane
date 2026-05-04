export type HookName = "after_create" | "before_run" | "after_run" | "before_remove";
export type HookPolicy = {
    command?: string;
    timeoutMs: number;
    blocking: boolean;
};
export type HookResult = {
    ok: boolean;
    hook: HookName;
    exitCode: number | null;
    timedOut: boolean;
    output: string;
};
export declare function runLifecycleHook(opts: {
    hook: HookName;
    policy: HookPolicy;
    cwd: string;
}): Promise<HookResult>;
export declare function runLifecycleHooks(opts: {
    cwd: string;
    hooks: Partial<Record<HookName, HookPolicy>>;
    order: HookName[];
}): Promise<{
    ok: boolean;
    results: HookResult[];
}>;
//# sourceMappingURL=hooks-lifecycle.d.ts.map