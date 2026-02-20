export const COMMAND_SNIPPETS = {
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
