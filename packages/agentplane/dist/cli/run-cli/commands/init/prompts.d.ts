import type * as ClackPromptsModule from "@clack/prompts";
export type InitClackPrompts = typeof ClackPromptsModule;
export declare class InitAborted extends Error {
    readonly code = "INIT_ABORTED";
    constructor(message?: string);
}
export declare function shouldUseInitClackPrompts(): boolean;
export declare function loadInitClackPrompts(): Promise<InitClackPrompts | null>;
export declare function assertNotCancelled<T>(clack: Pick<InitClackPrompts, "cancel" | "isCancel">, value: T, message?: string): Exclude<T, symbol>;
//# sourceMappingURL=prompts.d.ts.map