import type { CommandContext } from "../../../commands/shared/task-backend.js";
import { commandModule, type RunDeps } from "../command-catalog/kernel.js";
import type {
  NoContextSession,
  OutputSession,
} from "../command-catalog/project-capability-profiles.js";
import type { ProviderWriteSession } from "../command-catalog/provider-ops-capability-profiles.js";
import type {
  TaskLifecycleSession,
  TaskReadSession,
} from "../command-catalog/task-capability-profiles.js";

function getLifecycleContext(session: TaskLifecycleSession) {
  return (command: string) => session.require("git.mutate", command) as Promise<CommandContext>;
}

function getTaskReadContext(session: TaskReadSession) {
  return (command: string) => session.require("task.read", command) as Promise<CommandContext>;
}

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
export const loadCommitSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/commit.command.js").then((m) =>
    m.makeRunCommitHandler(getLifecycleContext(session)),
  );
export const loadStartSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/start.run.js").then((m) =>
    m.makeRunStartHandler(getLifecycleContext(session)),
  );
export const loadBlockSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/block.run.js").then((m) =>
    m.makeRunBlockHandler(getLifecycleContext(session)),
  );
export const loadVerifySpec = (session: TaskLifecycleSession) =>
  import("../../../commands/verify.run.js").then((m) =>
    m.makeRunVerifyHandler(getLifecycleContext(session)),
  );
export const loadFinishSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/finish.run.js").then((m) =>
    m.makeRunFinishHandler(getLifecycleContext(session)),
  );
export const loadReadySpec = (session: TaskReadSession) =>
  import("../../../commands/ready.command.js").then((m) =>
    m.makeRunReadyHandler(getTaskReadContext(session)),
  );
export const loadDocsCliSpec = (session: OutputSession) =>
  import("../../../commands/docs/cli.command.js").then((m) =>
    m.makeRunDocsCliHandler(session.getHelpJsonForDocs),
  );
export const fromHooksUninstallSpec = commandModule(
  () => import("../../../commands/hooks/uninstall.command.js"),
);
export const loadCleanupSpec = (_session: NoContextSession) =>
  import("../../../commands/cleanup/merged.command.js").then((m) => m.runCleanup);
export const loadCleanupMergedSpec = (session: ProviderWriteSession) =>
  import("../../../commands/cleanup/merged.command.js").then((m) =>
    m.makeRunCleanupMergedHandler(async (command) => {
      await session.require("git.mutate", command);
      await session.require("route.remote", command);
      await session.require("approvals", command);
      return await session.require("provider", command);
    }),
  );
export const fromGuardSuggestAllowSpec = commandModule(
  () => import("../../../commands/guard/suggest-allow.command.js"),
);
export const loadGuardCommitSpec = (deps: RunDeps) =>
  import("../../../commands/guard/commit.command.js").then((m) =>
    m.makeRunGuardCommitHandler(deps.getCtx),
  );
