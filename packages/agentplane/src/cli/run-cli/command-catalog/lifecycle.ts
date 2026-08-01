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

import { declareCommand, declareSessionCommand, type CommandEntry } from "./kernel.js";
import { TASK_LIFECYCLE_REQUIREMENTS, TASK_READ_REQUIREMENTS } from "./task-capability-profiles.js";
import { NO_CONTEXT_REQUIREMENTS, OUTPUT_REQUIREMENTS } from "./project-capability-profiles.js";
import { PROVIDER_WRITE_REQUIREMENTS } from "./provider-ops-capability-profiles.js";
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
  loadCleanupSpec,
  loadCleanupMergedSpec,
  fromGuardSuggestAllowSpec,
  loadGuardCommitSpec,
} from "../command-loaders/lifecycle.js";

export const LIFECYCLE_COMMANDS = [
  declareSessionCommand(commitSpec, {
    load: loadCommitSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareSessionCommand(startSpec, {
    load: loadStartSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareSessionCommand(blockSpec, {
    load: loadBlockSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareSessionCommand(verifySpec, {
    load: loadVerifySpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["verify"]),
  }),
  declareSessionCommand(finishSpec, {
    load: loadFinishSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["finish"]),
  }),
  declareSessionCommand(readySpec, {
    load: loadReadySpec,
    requirements: TASK_READ_REQUIREMENTS,
  }),
  declareSessionCommand(docsCliSpec, {
    load: loadDocsCliSpec,
    requirements: OUTPUT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsHooksHooksCommand(hooksSpec, "runHooks", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsHooksInstallCommand(hooksInstallSpec, "runHooksInstall", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromHooksUninstallSpec(hooksUninstallSpec, "runHooksUninstall", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsHooksRunCommand(hooksRunSpec, "runHooksRun", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(cleanupSpec, {
    load: loadCleanupSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(cleanupMergedSpec, {
    load: loadCleanupMergedSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  fromCommandsGuardGuardCommand(guardSpec, "runGuard", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsGuardCleanCommand(guardCleanSpec, "runGuardClean", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromGuardSuggestAllowSpec(guardSuggestAllowSpec, "runGuardSuggestAllow", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(guardCommitSpec, {
    load: loadGuardCommitSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
] as const satisfies readonly CommandEntry[];
