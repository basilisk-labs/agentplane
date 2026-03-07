export const COMMAND_SNIPPETS = {
  core: {
    taskList: "agentplane task list",
    taskShow: "agentplane task show <task-id>",
    taskNew:
      'agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>',
    startTask: 'agentplane task start-ready <task-id> --author <ROLE> --body "Start: ..."',
    verifyTask: 'agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."',
    finishTask:
      'agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --commit <git-rev>',
    quickstart: "agentplane quickstart",
    role: "agentplane role <ROLE>",
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
