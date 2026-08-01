import type { CommandContext } from "../../../commands/shared/task-backend.js";
import {
  commandModule,
  type CommandCapability,
  type CommandSession,
  type RunDeps,
} from "../command-catalog/kernel.js";
import type {
  TaskLifecycleSession,
  TaskReadSession,
  TaskRouteLifecycleSession,
  TaskRouteLocalSession,
  TaskRouteSession,
  TaskWriteSession,
} from "../command-catalog/task-capability-profiles.js";
import type { ProviderWriteSession } from "../command-catalog/provider-ops-capability-profiles.js";
import type {
  RunnerExecutionSession,
  RunnerPreparationSession,
  RunnerReadSession,
  RunnerWriteSession,
} from "../command-catalog/runner-hermes-capability-profiles.js";
import type { ProjectSession } from "../command-catalog/project-capability-profiles.js";

function getSessionContext<
  TCapabilities extends CommandCapability,
  TCapability extends Exclude<TCapabilities, "project" | "config" | "output">,
>(session: CommandSession<TCapabilities>, capability: TCapability) {
  return (command: string) =>
    session.require(
      capability as Exclude<TCapabilities, "output">,
      command,
    ) as Promise<CommandContext>;
}

function getTaskRouteContexts(session: TaskRouteSession) {
  return {
    getLocalContext: getSessionContext(session, "route.local"),
    getRemoteContext: async (command: string) => {
      await session.require("route.remote", command);
      return await session.require("provider", command);
    },
  };
}

function getTaskAuthorityRouteContexts(session: TaskRouteLifecycleSession) {
  return {
    getLocalContext: getSessionContext(session, "route.local"),
    getRemoteContext: async (command: string) => {
      await session.require("route.remote", command);
      return await session.require("provider", command);
    },
  };
}

export const fromCommandsTaskTaskCommand = commandModule(
  () => import("../../../commands/task/task.command.js"),
);
export const fromCommandsTaskHandoffCommand = commandModule(
  () => import("../../../commands/task/handoff.command.js"),
);
export const fromCommandsTaskHandoffRecordCommand = commandModule(
  () => import("../../../commands/task/handoff-record.command.js"),
);
export const fromCommandsTaskFindingsCommand = commandModule(
  () => import("../../../commands/task/findings.command.js"),
);
export const fromCommandsTaskObservationsCommand = commandModule(
  () => import("../../../commands/task/observations.command.js"),
);
export const fromCommandsTaskDocCommand = commandModule(
  () => import("../../../commands/task/doc.command.js"),
);
export const fromCommandsTaskLintCommand = commandModule(
  () => import("../../../commands/task/lint.command.js"),
);
export const fromCommandsTaskMigrateDocCommand = commandModule(
  () => import("../../../commands/task/migrate-doc.command.js"),
);
export const fromCommandsTaskVerifyCommand = commandModule(
  () => import("../../../commands/task/verify.command.js"),
);
export const fromCommandsTaskResumeContextCommand = commandModule(
  () => import("../../../commands/task/resume-context.command.js"),
);
export const fromTaskHandoffShowSpec = commandModule(
  () => import("../../../commands/task/handoff-show.command.js"),
);
const getProviderWriteContext = (session: ProviderWriteSession) => async (command: string) => {
  await session.require("git.mutate", command);
  await session.require("route.remote", command);
  await session.require("approvals", command);
  return await session.require("provider", command);
};

export const loadTaskHostedCloseSpec = (session: ProviderWriteSession) =>
  import("../../../commands/task/hosted-close.command.js").then((m) =>
    m.makeRunTaskHostedCloseHandler(getProviderWriteContext(session)),
  );
export const loadTaskHostedClosePrSpec = (session: ProviderWriteSession) =>
  import("../../../commands/task/hosted-close-pr.command.js").then((m) =>
    m.makeRunTaskHostedClosePrHandler(getProviderWriteContext(session)),
  );
export const loadTaskActiveSpec = (session: TaskRouteLocalSession) =>
  import("../../../commands/task/active.command.js").then((m) =>
    m.makeRunTaskActiveHandler(getSessionContext(session, "route.local")),
  );
export const loadTaskAskSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/ask.command.js").then((m) =>
    m.makeRunTaskAskHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskAnswerSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/answer.command.js").then((m) =>
    m.makeRunTaskAnswerHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskAuthorityGrantSpec = (session: TaskRouteLifecycleSession) =>
  import("../../../commands/task/authority-grant.command.js").then((m) =>
    m.makeRunTaskAuthorityGrantHandler(getTaskAuthorityRouteContexts(session)),
  );
export const loadTaskListSpec = (session: TaskReadSession) =>
  import("../../../commands/task/list.run.js").then((m) =>
    m.makeRunTaskListHandler((command) => session.require("task.read", command)),
  );
export const loadTaskNextSpec = (session: TaskReadSession) =>
  import("../../../commands/task/next.run.js").then((m) =>
    m.makeRunTaskNextHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskSearchSpec = (session: TaskReadSession) =>
  import("../../../commands/task/search.run.js").then((m) =>
    m.makeRunTaskSearchHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskShowSpec = (session: TaskReadSession) =>
  import("../../../commands/task/show.run.js").then((m) =>
    m.makeRunTaskShowHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskStatusSpec = (session: TaskRouteSession) =>
  import("../../../commands/task/status.command.js").then((m) =>
    m.makeRunTaskStatusHandler(getTaskRouteContexts(session)),
  );
export const loadTaskNextActionSpec = (session: TaskRouteSession) =>
  import("../../../commands/task/next-action.command.js").then((m) =>
    m.makeRunTaskNextActionHandler({
      ...getTaskRouteContexts(session),
    }),
  );
export const loadTaskNewSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/new.command.js").then((m) =>
    m.makeRunTaskNewHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskBeginSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/begin.command.js").then((m) =>
    m.makeRunTaskBeginHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskBriefSpec = (session: TaskRouteSession) =>
  import("../../../commands/task/brief.command.js").then((m) =>
    m.makeRunTaskBriefHandler(getTaskRouteContexts(session)),
  );
export const loadTaskRunPreparationSpec = (session: RunnerPreparationSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunHandler({
      getPreparationContext: async (command, options) => {
        await session.require("context.search", command);
        return options.includeRemote
          ? await session.require("route.remote", command)
          : await session.require("route.local", command);
      },
    }),
  );
export const loadTaskRunSpec = (session: RunnerExecutionSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunHandler({
      getExecutionContext: async (command, options) => {
        await session.require("git.mutate", command);
        await session.require("context.search", command);
        if (options.includeRemote) await session.require("route.remote", command);
        return await session.require("provider", command);
      },
    }),
  );
export const loadTaskRunToolSpec = (session: ProjectSession) =>
  import("../../../commands/task/run-tool.command.js").then((m) =>
    m.makeRunTaskRunToolHandler((command) => session.require("project", command)),
  );
export const loadTaskRunStatusSpec = (session: RunnerReadSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunStatusHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskRunInspectSpec = (session: RunnerReadSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunInspectHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskRunReconcileSpec = (session: RunnerWriteSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunReconcileHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskRunResolveEffectSpec = (session: RunnerWriteSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunResolveEffectHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskRunResumeEffectSpec = (session: RunnerExecutionSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunResumeEffectHandler(async (command) => {
      await session.require("git.mutate", command);
      await session.require("context.search", command);
      return await session.require("provider", command);
    }),
  );
export const loadTaskRunLogsSpec = (session: RunnerReadSession) =>
  import("../../../commands/task/run.command.js").then((m) =>
    m.makeRunTaskRunLogsHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskCompleteSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/complete.command.js").then((m) =>
    m.makeRunTaskCompleteHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskDeriveSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/derive.command.js").then((m) =>
    m.makeRunTaskDeriveHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskEvidenceCheckSpec = (session: TaskReadSession) =>
  import("../../../commands/task/evidence-check.command.js").then((m) =>
    m.makeRunTaskEvidenceCheckHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskCloseDuplicateSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/close-duplicate.command.js").then((m) =>
    m.makeRunTaskCloseDuplicateHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskStartReadySpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/start-ready.command.js").then((m) =>
    m.makeRunTaskStartReadyHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskCloseNoopSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/close-noop.command.js").then((m) =>
    m.makeRunTaskCloseNoopHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskAddSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/add.command.js").then((m) =>
    m.makeRunTaskAddHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskUpdateSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/update.command.js").then((m) =>
    m.makeRunTaskUpdateHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskCommentSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/comment.command.js").then((m) =>
    m.makeRunTaskCommentHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskSetStatusSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/set-status.command.js").then((m) =>
    m.makeRunTaskSetStatusHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskFindingsAddSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/findings-add.command.js").then((m) =>
    m.makeRunTaskFindingsAddHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskObservationsAddSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsAddHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskObservationsListSpec = (session: TaskReadSession) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsListHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskObservationsCheckSpec = (session: TaskReadSession) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsCheckHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskObservationsTriageSpec = (session: TaskReadSession) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsTriageHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskObservationsHarvestSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsHarvestHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskDocShowSpec = (session: TaskReadSession) =>
  import("../../../commands/task/doc-show.command.js").then((m) =>
    m.makeRunTaskDocShowHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskDocSetSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/doc-set.command.js").then((m) =>
    m.makeRunTaskDocSetHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskScrubSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/scrub.command.js").then((m) =>
    m.makeRunTaskScrubHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskScaffoldSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/scaffold.command.js").then((m) =>
    m.makeRunTaskScaffoldHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskNormalizeSpec = (deps: RunDeps) =>
  import("../../../commands/task/normalize.command.js").then((m) =>
    m.makeRunTaskNormalizeHandler(deps.getCtx),
  );
export const loadTaskObsidianSpec = (deps: RunDeps) =>
  import("../../../commands/task/obsidian.command.js").then((m) =>
    m.makeRunTaskObsidianHandler(deps.getCtx),
  );
export const loadTaskObsidianCleanSpec = () =>
  import("../../../commands/task/obsidian.command.js").then((m) =>
    m.makeRunTaskObsidianCleanHandler(),
  );
export const loadTaskMigrateSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/migrate.command.js").then((m) =>
    m.makeRunTaskMigrateHandler(getSessionContext(session, "task.write")),
  );
export const fromTaskPlanSpec = commandModule(
  () => import("../../../commands/task/plan.command.js"),
);
export const loadTaskPlanSetSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/plan-set.command.js").then((m) =>
    m.makeRunTaskPlanSetHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskPlanApproveSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/plan-approve.command.js").then((m) =>
    m.makeRunTaskPlanApproveHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskPlanRejectSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/plan-reject.command.js").then((m) =>
    m.makeRunTaskPlanRejectHandler(getSessionContext(session, "task.write")),
  );
export const loadTaskVerifyOkSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/verify-ok.command.js").then((m) =>
    m.makeRunTaskVerifyOkHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskVerifyReworkSpec = (session: TaskLifecycleSession) =>
  import("../../../commands/task/verify-rework.command.js").then((m) =>
    m.makeRunTaskVerifyReworkHandler(getSessionContext(session, "git.mutate")),
  );
export const loadTaskVerifyShowSpec = (session: TaskReadSession) =>
  import("../../../commands/task/verify-show.command.js").then((m) =>
    m.makeRunTaskVerifyShowHandler(getSessionContext(session, "task.read")),
  );
export const loadTaskRebuildIndexSpec = (session: TaskWriteSession) =>
  import("../../../commands/task/rebuild-index.command.js").then((m) =>
    m.makeRunTaskRebuildIndexHandler(getSessionContext(session, "task.write")),
  );
export const fromTaskReclaimSpec = commandModule(
  () => import("../../../commands/task/reclaim.command.js"),
);
