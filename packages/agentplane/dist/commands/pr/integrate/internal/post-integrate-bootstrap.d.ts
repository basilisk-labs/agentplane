type PostIntegrateBootstrapResult = {
    status: "skipped";
} | {
    status: "ran";
} | {
    status: "failed";
    error: string;
};
export declare function maybeRunPostIntegrateBootstrap(opts: {
    gitRoot: string;
    changedPaths: string[];
}): Promise<PostIntegrateBootstrapResult>;
export {};
//# sourceMappingURL=post-integrate-bootstrap.d.ts.map