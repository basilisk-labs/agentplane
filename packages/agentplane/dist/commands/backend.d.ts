import { type CommandContext } from "./shared/task-backend.js";
export type BackendSyncParsed = {
    backendId: string;
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    yes: boolean;
    quiet: boolean;
};
export type SyncParsed = {
    backendId: string | null;
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    yes: boolean;
    quiet: boolean;
};
export type BackendMigrateCanonicalStateParsed = {
    backendId: string;
    yes: boolean;
    quiet: boolean;
};
export type BackendInspectParsed = {
    backendId: string;
    yes: boolean;
    quiet: boolean;
};
export declare function cmdBackendSyncParsed(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    flags: BackendSyncParsed;
}): Promise<number>;
export declare function cmdSyncParsed(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    flags: SyncParsed;
}): Promise<number>;
export declare function cmdBackendMigrateCanonicalStateParsed(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    flags: BackendMigrateCanonicalStateParsed;
}): Promise<number>;
export declare function cmdBackendInspectParsed(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    flags: BackendInspectParsed;
}): Promise<number>;
//# sourceMappingURL=backend.d.ts.map