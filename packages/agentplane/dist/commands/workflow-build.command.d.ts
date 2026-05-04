import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
export type WorkflowBuildParsed = {
    validate: boolean;
    dryRun: boolean;
};
export declare const workflowBuildSpec: CommandSpec<WorkflowBuildParsed>;
export declare const runWorkflowBuild: CommandHandler<WorkflowBuildParsed>;
//# sourceMappingURL=workflow-build.command.d.ts.map