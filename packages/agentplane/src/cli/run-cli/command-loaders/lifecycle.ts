import { commandModule, type RunDeps } from "../command-catalog/kernel.js";

export const fromCommandsHooksHooksCommand = commandModule(
  () => import("../../../commands/hooks/hooks.command.js"),
);
export const fromCommandsHooksInstallCommand = commandModule(
  () => import("../../../commands/hooks/install.command.js"),
);
export const fromCommandsHooksRunCommand = commandModule(
  () => import("../../../commands/hooks/run.command.js"),
);
export const fromCommandsGuardGuardCommand = commandModule(
  () => import("../../../commands/guard/guard.command.js"),
);
export const fromCommandsGuardCleanCommand = commandModule(
  () => import("../../../commands/guard/clean.command.js"),
);
export const loadCommitSpec = (deps: RunDeps) =>
  import("../../../commands/commit.command.js").then((m) => m.makeRunCommitHandler(deps.getCtx));
export const loadStartSpec = (deps: RunDeps) =>
  import("../../../commands/start.run.js").then((m) => m.makeRunStartHandler(deps.getCtx));
export const loadBlockSpec = (deps: RunDeps) =>
  import("../../../commands/block.run.js").then((m) => m.makeRunBlockHandler(deps.getCtx));
export const loadVerifySpec = (deps: RunDeps) =>
  import("../../../commands/verify.run.js").then((m) => m.makeRunVerifyHandler(deps.getCtx));
export const loadFinishSpec = (deps: RunDeps) =>
  import("../../../commands/finish.run.js").then((m) => m.makeRunFinishHandler(deps.getCtx));
export const loadReadySpec = (deps: RunDeps) =>
  import("../../../commands/ready.command.js").then((m) => m.makeRunReadyHandler(deps.getCtx));
export const loadDocsCliSpec = (deps: RunDeps) =>
  import("../../../commands/docs/cli.command.js").then((m) =>
    m.makeRunDocsCliHandler(deps.getHelpJsonForDocs),
  );
export const fromHooksUninstallSpec = commandModule(
  () => import("../../../commands/hooks/uninstall.command.js"),
);
export const fromCleanupSpec = commandModule(
  () => import("../../../commands/cleanup/merged.command.js"),
);
export const loadCleanupMergedSpec = (deps: RunDeps) =>
  import("../../../commands/cleanup/merged.command.js").then((m) =>
    m.makeRunCleanupMergedHandler(deps.getCtx),
  );
export const fromGuardSuggestAllowSpec = commandModule(
  () => import("../../../commands/guard/suggest-allow.command.js"),
);
export const loadGuardCommitSpec = (deps: RunDeps) =>
  import("../../../commands/guard/commit.command.js").then((m) =>
    m.makeRunGuardCommitHandler(deps.getCtx),
  );
