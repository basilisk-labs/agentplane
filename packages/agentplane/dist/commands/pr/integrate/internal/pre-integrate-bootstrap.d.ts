type PreIntegrateBootstrapResult = {
    status: "not-needed";
} | {
    status: "skipped";
} | {
    status: "ran";
} | {
    status: "failed";
    error: string;
};
export declare function maybeRunPreIntegrateBootstrap(opts: {
    gitRoot: string;
    changedPaths: string[];
}): Promise<PreIntegrateBootstrapResult>;
export {};
//# sourceMappingURL=pre-integrate-bootstrap.d.ts.map