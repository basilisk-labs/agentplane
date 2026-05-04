import type { RoleProfileGuide } from "../../../command-guide.js";
export type AgentProfile = {
    id?: string;
    role?: string;
    description?: string;
    inputs?: unknown;
    outputs?: unknown;
    permissions?: unknown;
    workflow?: unknown;
};
export declare function parseAgentProfileJson(filePath: string, text: string): AgentProfile;
export declare function normalizeRoleId(roleRaw: string): string;
export declare function listAgentProfileIds(opts: {
    cwd: string;
    rootOverride?: string;
}): Promise<{
    agentplaneDir: string;
    ids: string[];
} | null>;
export declare function readAgentProfile(opts: {
    cwd: string;
    rootOverride?: string;
    roleId: string;
}): Promise<{
    agentplaneDir: string;
    filename: string;
    profile: AgentProfile;
} | null>;
export declare function toRoleProfileGuide(opts: {
    filename: string;
    roleId: string;
    profile: AgentProfile;
}): RoleProfileGuide;
//# sourceMappingURL=agent-profiles.d.ts.map