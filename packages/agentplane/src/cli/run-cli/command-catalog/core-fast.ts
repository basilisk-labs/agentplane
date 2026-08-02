import { preflightSpec } from "../commands/core/preflight.js";
import { quickstartSpec } from "../commands/core/quickstart.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { commandModule, type CommandEntry } from "./kernel.js";
import { NO_CONTEXT_REQUIREMENTS } from "./project-capability-profiles.js";

const fromQuickstart = commandModule(() => import("../commands/core/quickstart.js"));
const fromPreflight = commandModule(() => import("../commands/core/preflight.js"));

export const CORE_FAST_COMMANDS = [
  fromQuickstart(quickstartSpec, "runQuickstart", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["quickstart"]),
  }),
  fromPreflight(preflightSpec, "runPreflight", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["preflight"]),
  }),
] as const satisfies readonly CommandEntry[];
