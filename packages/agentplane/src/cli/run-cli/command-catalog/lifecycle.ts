import { blockSpec } from "../../../commands/block.spec.js";
import { commitSpec } from "../../../commands/commit.spec.js";
import { cleanupMergedSpec, cleanupSpec } from "../../../commands/cleanup/merged.command.js";
import { docsCliSpec } from "../../../commands/docs/cli.command.js";
import { finishSpec } from "../../../commands/finish.spec.js";
import { guardCleanSpec } from "../../../commands/guard/clean.command.js";
import { guardCommitSpec } from "../../../commands/guard/commit.spec.js";
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

import { declareCommand, type CommandEntry } from "./kernel.js";
import {
  fromCommandsHooksHooksCommand,
  fromCommandsHooksInstallCommand,
  fromCommandsHooksRunCommand,
  fromCommandsGuardGuardCommand,
  fromCommandsGuardCleanCommand,
  loadCommitSpec,
  loadStartSpec,
  loadBlockSpec,
  loadVerifySpec,
  loadFinishSpec,
  loadReadySpec,
  loadDocsCliSpec,
  fromHooksUninstallSpec,
  fromCleanupSpec,
  loadCleanupMergedSpec,
  fromGuardSuggestAllowSpec,
  loadGuardCommitSpec,
} from "../command-loaders/lifecycle.js";

export const LIFECYCLE_COMMANDS = [
  declareCommand(commitSpec, { load: loadCommitSpec }),
  declareCommand(startSpec, { load: loadStartSpec }),
  declareCommand(blockSpec, { load: loadBlockSpec }),
  declareCommand(verifySpec, {
    load: loadVerifySpec,
    invocation: requireCanonicalCommandInvocation(["verify"]),
  }),
  declareCommand(finishSpec, {
    load: loadFinishSpec,
    invocation: requireCanonicalCommandInvocation(["finish"]),
  }),
  declareCommand(readySpec, { load: loadReadySpec }),
  declareCommand(docsCliSpec, {
    load: loadDocsCliSpec,
    needs: "none",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsHooksHooksCommand(hooksSpec, "runHooks", { needs: "none" }),
  fromCommandsHooksInstallCommand(hooksInstallSpec, "runHooksInstall", {}),
  fromHooksUninstallSpec(hooksUninstallSpec, "runHooksUninstall"),
  fromCommandsHooksRunCommand(hooksRunSpec, "runHooksRun", {}),
  fromCleanupSpec(cleanupSpec, "runCleanup", { needs: "none" }),
  declareCommand(cleanupMergedSpec, { load: loadCleanupMergedSpec }),
  fromCommandsGuardGuardCommand(guardSpec, "runGuard", { needs: "none" }),
  fromCommandsGuardCleanCommand(guardCleanSpec, "runGuardClean", {}),
  fromGuardSuggestAllowSpec(guardSuggestAllowSpec, "runGuardSuggestAllow"),
  declareCommand(guardCommitSpec, { load: loadGuardCommitSpec }),
] as const satisfies readonly CommandEntry[];
