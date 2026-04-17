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

import { entry, type CommandEntry } from "./shared.js";

export const LIFECYCLE_COMMANDS = [
  entry(commitSpec, (deps) =>
    import("../../../commands/commit.command.js").then((m) => m.makeRunCommitHandler(deps.getCtx)),
  ),
  entry(startSpec, (deps) =>
    import("../../../commands/start.run.js").then((m) => m.makeRunStartHandler(deps.getCtx)),
  ),
  entry(blockSpec, (deps) =>
    import("../../../commands/block.run.js").then((m) => m.makeRunBlockHandler(deps.getCtx)),
  ),
  entry(
    verifySpec,
    (deps) =>
      import("../../../commands/verify.run.js").then((m) => m.makeRunVerifyHandler(deps.getCtx)),
    { invocation: requireCanonicalCommandInvocation(["verify"]) },
  ),
  entry(
    finishSpec,
    (deps) =>
      import("../../../commands/finish.run.js").then((m) => m.makeRunFinishHandler(deps.getCtx)),
    {
      invocation: requireCanonicalCommandInvocation(["finish"]),
    },
  ),
  entry(readySpec, (deps) =>
    import("../../../commands/ready.command.js").then((m) => m.makeRunReadyHandler(deps.getCtx)),
  ),
  entry(
    docsCliSpec,
    (deps) =>
      import("../../../commands/docs/cli.command.js").then((m) =>
        m.makeRunDocsCliHandler(deps.getHelpJsonForDocs),
      ),
    {
      needs: "none",
    },
  ),
  entry(
    hooksSpec,
    () => import("../../../commands/hooks/hooks.command.js").then((m) => m.runHooks),
    {
      needs: "none",
    },
  ),
  entry(hooksInstallSpec, () =>
    import("../../../commands/hooks/install.command.js").then((m) => m.runHooksInstall),
  ),
  entry(hooksUninstallSpec, () =>
    import("../../../commands/hooks/uninstall.command.js").then((m) => m.runHooksUninstall),
  ),
  entry(hooksRunSpec, () =>
    import("../../../commands/hooks/run.command.js").then((m) => m.runHooksRun),
  ),
  entry(
    cleanupSpec,
    () => import("../../../commands/cleanup/merged.command.js").then((m) => m.runCleanup),
    {
      needs: "none",
    },
  ),
  entry(cleanupMergedSpec, (deps) =>
    import("../../../commands/cleanup/merged.command.js").then((m) =>
      m.makeRunCleanupMergedHandler(deps.getCtx),
    ),
  ),
  entry(
    guardSpec,
    () => import("../../../commands/guard/guard.command.js").then((m) => m.runGuard),
    {
      needs: "none",
    },
  ),
  entry(guardCleanSpec, () =>
    import("../../../commands/guard/clean.command.js").then((m) => m.runGuardClean),
  ),
  entry(guardSuggestAllowSpec, () =>
    import("../../../commands/guard/suggest-allow.command.js").then((m) => m.runGuardSuggestAllow),
  ),
  entry(guardCommitSpec, (deps) =>
    import("../../../commands/guard/commit.command.js").then((m) =>
      m.makeRunGuardCommitHandler(deps.getCtx),
    ),
  ),
] as const satisfies readonly CommandEntry[];
