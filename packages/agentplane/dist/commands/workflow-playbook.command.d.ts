import type { CommandHandler } from "../cli/spec/spec.js";
import type { WorkflowPlaybookParsed } from "./workflow-playbook.spec.js";
export { workflowDebugSpec, workflowLandSpec, workflowSyncSpec } from "./workflow-playbook.spec.js";
export declare const runWorkflowDebug: CommandHandler<WorkflowPlaybookParsed>;
export declare const runWorkflowSync: CommandHandler<WorkflowPlaybookParsed>;
export declare const runWorkflowLand: CommandHandler<WorkflowPlaybookParsed>;
//# sourceMappingURL=workflow-playbook.command.d.ts.map