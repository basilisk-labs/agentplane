import { requireCanonicalCommandInvocation } from "./command-invocations.js";

const invoke = (id: readonly string[]): string => requireCanonicalCommandInvocation(id);

export const COMMAND_SNIPPETS = {
  core: {
    configShow: invoke(["config", "show"]),
    incidentsAdvise: invoke(["incidents", "advise"]),
    incidentsCollect: invoke(["incidents", "collect"]),
    taskList: invoke(["task", "list"]),
    taskShow: invoke(["task", "show"]),
    taskBegin: invoke(["task", "begin"]),
    taskComplete: invoke(["task", "complete"]),
    taskNew: invoke(["task", "new"]),
    taskPlanSet: invoke(["task", "plan", "set"]),
    taskPlanApprove: invoke(["task", "plan", "approve"]),
    taskVerifyShow: invoke(["task", "verify-show"]),
    startTask: invoke(["task", "start-ready"]),
    verifyTask: invoke(["verify"]),
    finishTask: invoke(["finish"]),
    quickstart: invoke(["quickstart"]),
    demo: invoke(["demo"]),
    evaluatorRun: invoke(["evaluator", "run"]),
    role: invoke(["role"]),
    taskActive: invoke(["task", "active"]),
    taskBrief: invoke(["task", "brief"]),
  },
  sync: {
    pullConfigured: "agentplane sync --direction pull",
    pushConfiguredWithYes: "agentplane sync --direction push --yes",
  },
  backendSync: {
    pullLocal: "agentplane backend sync local --direction pull",
    pullCloud: "agentplane backend sync cloud --direction pull",
    pushCloudWithYes: "agentplane backend sync cloud --direction push --yes",
  },
} as const;
