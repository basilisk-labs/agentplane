import { type RunDeps } from "../command-catalog/kernel.js";
export declare const fromCommandsInit: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "initSpec" | "runInit", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsUpgradeCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "upgradeSpec" | "runUpgrade", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsReleaseReleaseCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "releaseSpec" | "runRelease", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsReleasePlanCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "releasePlanSpec" | "runReleasePlan", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsReleaseApplyCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "releaseApplySpec" | "releaseCandidateSpec" | "runReleaseApply" | "runReleaseCandidate" | "pushReleaseCandidateBranch" | "pushReleaseRefs", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsCoreQuickstart: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "quickstartSpec" | "runQuickstart", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsCorePreflight: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "preflightSpec" | "runPreflight", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsCodex: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "makeRunCodexPluginInstallHandler" | "codexSpec" | "codexPluginSpec" | "codexPluginInstallSpec" | "runCodex" | "runCodexPlugin", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsRuntimeCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "buildFrameworkDevWorkflow" | "renderRuntimeExplainText" | "runtimeExplainSpec" | "runtimeSpec" | "runRuntime" | "runRuntimeExplain", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsIncidentsIncidentsCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "incidentsSpec" | "runIncidents", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsCoreRole: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "roleSpec" | "runRole", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsDoctorRun: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "runDoctor", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsWorkflowCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "workflowSpec" | "runWorkflow", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsWorkflowBuildCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "workflowBuildSpec" | "runWorkflowBuild", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsWorkflowRestoreCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "workflowRestoreSpec" | "runWorkflowRestore", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const fromCommandsWorkflowPlaybookCommand: <TParsed>(spec: import("../../spec/spec.js").CommandSpec<TParsed>, runExport: "workflowDebugSpec" | "workflowLandSpec" | "workflowSyncSpec" | "runWorkflowDebug" | "runWorkflowSync" | "runWorkflowLand", meta?: import("../command-catalog/kernel.js").CommandMeta) => import("../command-catalog/kernel.js").CommandEntry;
export declare const loadCodexPluginInstallSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<import("../commands/codex.js").CodexPluginInstallParsed>>;
export declare const loadIncidentsCollectSpec: (deps: RunDeps) => Promise<(ctx: import("../../spec/spec.js").CommandCtx, p: {
    taskId: string;
    check: boolean;
    json: boolean;
}) => Promise<number>>;
export declare const loadIncidentsAdviseSpec: (deps: RunDeps) => Promise<(ctx: import("../../spec/spec.js").CommandCtx, p: {
    taskId: string | null;
    scope: string | null;
    title: string | null;
    description: string | null;
    tags: string[];
    limit: number;
    json: boolean;
}) => Promise<number>>;
export declare const loadAgentsSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<{
    [x: string]: never;
}>>;
export declare const loadConfigShowSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<{
    [x: string]: never;
}>>;
export declare const loadConfigSetSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<{
    key: string;
    value: string;
}>>;
export declare const loadModeGetSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<{
    [x: string]: never;
}>>;
export declare const loadModeSetSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<{
    mode: string;
}>>;
export declare const loadProfileSetSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<{
    profile: string;
}>>;
export declare const loadIdeSyncSpec: (deps: RunDeps) => Promise<import("../../spec/spec.js").CommandHandler<{
    ide?: "cursor" | "windsurf";
}>>;
//# sourceMappingURL=core.d.ts.map