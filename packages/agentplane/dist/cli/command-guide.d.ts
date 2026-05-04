export type RoleProfileGuide = {
    filename?: string;
    id?: string;
    role?: string;
    description?: string;
    inputs?: readonly string[];
    outputs?: readonly string[];
    permissions?: readonly string[];
    workflow?: readonly string[];
};
export declare function listRoles(): string[];
export declare function getRoleSupplementLines(roleRaw: string): string[] | null;
export declare function renderRole(roleRaw: string, opts?: {
    profile?: RoleProfileGuide | null;
}): string | null;
export declare function renderQuickstart(): string;
//# sourceMappingURL=command-guide.d.ts.map