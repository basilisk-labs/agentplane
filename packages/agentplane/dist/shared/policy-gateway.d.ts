export type PolicyGatewayFlavor = "codex" | "claude";
export type PolicyGatewayFileName = "AGENTS.md" | "CLAUDE.md";
export declare const POLICY_GATEWAY_FILE_BY_FLAVOR: Record<PolicyGatewayFlavor, PolicyGatewayFileName>;
export type PolicyGatewayResolution = {
    flavor: PolicyGatewayFlavor;
    fileName: PolicyGatewayFileName;
    absPath: string;
};
export declare function policyGatewayFileName(flavor: PolicyGatewayFlavor): PolicyGatewayFileName;
export declare function renderPolicyGatewayTemplateText(text: string, fileName: PolicyGatewayFileName): string;
export declare function resolvePolicyGatewayForRepo(opts: {
    gitRoot: string;
    fallbackFlavor?: PolicyGatewayFlavor;
}): Promise<PolicyGatewayResolution>;
//# sourceMappingURL=policy-gateway.d.ts.map