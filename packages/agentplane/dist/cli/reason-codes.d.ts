export type ReasonCodeCategory = "usage" | "reconcile" | "git" | "handoff" | "network" | "backend" | "validation";
export type ReasonCodeMeta = {
    code: string;
    category: ReasonCodeCategory;
    summary: string;
    action: string;
};
export declare function getReasonCodeMeta(code: string | undefined): ReasonCodeMeta | undefined;
//# sourceMappingURL=reason-codes.d.ts.map