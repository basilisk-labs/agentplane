export declare const HOOK_MARKER = "agentplane-hook";
export { HOOK_SHIM_MARKER as SHIM_MARKER } from "../shared/hook-shim-template.js";
export declare const HOOK_NAMES: readonly ["commit-msg", "pre-commit", "pre-push", "post-merge"];
export type HookName = (typeof HOOK_NAMES)[number];
export declare function resolveGitHooksDir(cwd: string): Promise<string>;
export declare function fileIsManaged(filePath: string, marker: string): Promise<boolean>;
//# sourceMappingURL=shared.d.ts.map