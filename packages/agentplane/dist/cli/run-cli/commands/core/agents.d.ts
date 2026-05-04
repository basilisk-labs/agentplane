import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";
import type { RunDeps } from "../../command-catalog/kernel.js";
type AgentsParsed = Record<string, never>;
export declare const agentsSpec: CommandSpec<AgentsParsed>;
export declare function makeRunAgentsHandler(deps: RunDeps): CommandHandler<AgentsParsed>;
export {};
//# sourceMappingURL=agents.d.ts.map