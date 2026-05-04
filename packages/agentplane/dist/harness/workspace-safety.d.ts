export declare function sanitizeWorkspaceKey(raw: string): string;
export declare function resolveWorkspacePath(root: string, key: string): string;
export declare function validateWorkspacePathInvariants(opts: {
    root: string;
    workspacePath: string;
}): Promise<{
    ok: true;
} | {
    ok: false;
    code: "WORKSPACE_EQUALS_ROOT" | "WORKSPACE_OUTSIDE_ROOT" | "WORKSPACE_SYMLINK_ESCAPE" | "WORKSPACE_PATH_UNREADABLE";
    path: string;
    message: string;
}>;
//# sourceMappingURL=workspace-safety.d.ts.map