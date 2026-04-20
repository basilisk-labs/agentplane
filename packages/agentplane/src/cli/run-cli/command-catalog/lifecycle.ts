import { blockSpec } from "../../../commands/block.spec.js";
import { commitSpec } from "../../../commands/commit.spec.js";
import { cleanupMergedSpec, cleanupSpec } from "../../../commands/cleanup/merged.command.js";
import { docsCliSpec } from "../../../commands/docs/cli.command.js";
import { finishSpec } from "../../../commands/finish.spec.js";
import { guardCleanSpec } from "../../../commands/guard/clean.command.js";
import { guardCommitSpec } from "../../../commands/guard/commit.command.js";
import { guardSpec } from "../../../commands/guard/guard.command.js";
import { guardSuggestAllowSpec } from "../../../commands/guard/suggest-allow.command.js";
import { hooksInstallSpec } from "../../../commands/hooks/install.command.js";
import { hooksSpec } from "../../../commands/hooks/hooks.command.js";
import { hooksRunSpec } from "../../../commands/hooks/run.command.js";
import { hooksUninstallSpec } from "../../../commands/hooks/uninstall.command.js";
import { readySpec } from "../../../commands/ready.command.js";
import { startSpec } from "../../../commands/start.spec.js";
import { verifySpec } from "../../../commands/verify.spec.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { commandModule, declareCommand, type CommandEntry } from "./shared.js";

const fromCommandsHooksHooksCommand = commandModule(
  () => import("../../../commands/hooks/hooks.command.js"),
);
const fromCommandsHooksInstallCommand = commandModule(
  () => import("../../../commands/hooks/install.command.js"),
);
const fromCommandsHooksRunCommand = commandModule(
  () => import("../../../commands/hooks/run.command.js"),
);
const fromCommandsGuardGuardCommand = commandModule(
  () => import("../../../commands/guard/guard.command.js"),
);
const fromCommandsGuardCleanCommand = commandModule(
  () => import("../../../commands/guard/clean.command.js"),
);

export const LIFECYCLE_COMMANDS = [
  declareCommand(commitSpec, {
    load: (deps) =>
      import("../../../commands/commit.command.js").then((m) =>
        m.makeRunCommitHandler(deps.getCtx),
      ),
  }),
  declareCommand(startSpec, {
    load: (deps) =>
      import("../../../commands/start.run.js").then((m) => m.makeRunStartHandler(deps.getCtx)),
  }),
  declareCommand(blockSpec, {
    load: (deps) =>
      import("../../../commands/block.run.js").then((m) => m.makeRunBlockHandler(deps.getCtx)),
  }),
  declareCommand(verifySpec, {
    load: (deps) =>
      import("../../../commands/verify.run.js").then((m) => m.makeRunVerifyHandler(deps.getCtx)),
    invocation: requireCanonicalCommandInvocation(["verify"]),
  }),
  declareCommand(finishSpec, {
    load: (deps) =>
      import("../../../commands/finish.run.js").then((m) => m.makeRunFinishHandler(deps.getCtx)),
    invocation: requireCanonicalCommandInvocation(["finish"]),
  }),
  declareCommand(readySpec, {
    load: (deps) =>
      import("../../../commands/ready.command.js").then((m) => m.makeRunReadyHandler(deps.getCtx)),
  }),
  declareCommand(docsCliSpec, {
    load: (deps) =>
      import("../../../commands/docs/cli.command.js").then((m) =>
        m.makeRunDocsCliHandler(deps.getHelpJsonForDocs),
      ),
    needs: "none",
  }),
  fromCommandsHooksHooksCommand(hooksSpec, "runHooks", { needs: "none" }),
  fromCommandsHooksInstallCommand(hooksInstallSpec, "runHooksInstall", {}),
  declareCommand(hooksUninstallSpec, {
    module: () => import("../../../commands/hooks/uninstall.command.js"),
    runExport: "runHooksUninstall",
  }),
  fromCommandsHooksRunCommand(hooksRunSpec, "runHooksRun", {}),
  declareCommand(cleanupSpec, {
    module: () => import("../../../commands/cleanup/merged.command.js"),
    runExport: "runCleanup",
    needs: "none",
  }),
  declareCommand(cleanupMergedSpec, {
    load: (deps) =>
      import("../../../commands/cleanup/merged.command.js").then((m) =>
        m.makeRunCleanupMergedHandler(deps.getCtx),
      ),
  }),
  fromCommandsGuardGuardCommand(guardSpec, "runGuard", { needs: "none" }),
  fromCommandsGuardCleanCommand(guardCleanSpec, "runGuardClean", {}),
  declareCommand(guardSuggestAllowSpec, {
    module: () => import("../../../commands/guard/suggest-allow.command.js"),
    runExport: "runGuardSuggestAllow",
  }),
  declareCommand(guardCommitSpec, {
    load: (deps) =>
      import("../../../commands/guard/commit.command.js").then((m) =>
        m.makeRunGuardCommitHandler(deps.getCtx),
      ),
  }),
] as const satisfies readonly CommandEntry[];
