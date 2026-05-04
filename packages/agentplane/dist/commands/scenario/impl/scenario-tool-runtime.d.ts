type RecipeToolRuntime = "node" | "bash";
type RecipeToolInvocation = {
    command: string;
    args: string[];
};
export declare function resolveRecipeToolInvocation(runtime: RecipeToolRuntime, entrypoint: string, args: string[]): RecipeToolInvocation;
export declare function executeRecipeTool(opts: {
    runtime: RecipeToolRuntime;
    entrypoint: string;
    args: string[];
    cwd: string;
    env: Record<string, string>;
}): Promise<{
    exitCode: number;
    stdout: string;
    stderr: string;
}>;
export {};
//# sourceMappingURL=scenario-tool-runtime.d.ts.map