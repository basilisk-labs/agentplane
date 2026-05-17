import { requireCanonicalCommandInvocation } from "./command-invocations.js";

const invoke = (id: readonly string[]): string => requireCanonicalCommandInvocation(id);

export const COMMAND_SNIPPETS = {
  core: {
    configShow: invoke(["config", "show"]),
    incidentsAdvise: invoke(["incidents", "advise"]),
    incidentsCollect: invoke(["incidents", "collect"]),
    taskList: invoke(["task", "list"]),
    taskShow: invoke(["task", "show"]),
    taskNew: invoke(["task", "new"]),
    taskPlanSet: invoke(["task", "plan", "set"]),
    taskPlanApprove: invoke(["task", "plan", "approve"]),
    taskVerifyShow: invoke(["task", "verify-show"]),
    startTask: invoke(["task", "start-ready"]),
    verifyTask: invoke(["verify"]),
    finishTask: invoke(["finish"]),
    quickstart: invoke(["quickstart"]),
    demo: invoke(["demo"]),
    role: invoke(["role"]),
  },
  sync: {
    pullConfigured: "agentplane sync --direction pull",
    pushConfiguredWithYes: "agentplane sync --direction push --yes",
    pullRedmineExplicit: "agentplane sync redmine --direction pull",
    pushRedmineExplicitWithYes: "agentplane sync redmine --direction push --yes",
  },
  backendSync: {
    pullLocal: "agentplane backend sync local --direction pull",
    pullRedmine: "agentplane backend sync redmine --direction pull",
    pushRedmineWithYes: "agentplane backend sync redmine --direction push --yes",
  },
} as const;
