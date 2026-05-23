import type { CommandId } from "./spec/spec.js";

const COMMAND_INVOCATIONS = new Map<string, string>([
  ["config show", "agentplane config show"],
  [
    "finish",
    'agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev>',
  ],
  ["incidents advise", "agentplane incidents advise <task-id>"],
  ["incidents collect", "agentplane incidents collect <task-id>"],
  ["init", "agentplane init"],
  ["demo", "agentplane demo"],
  ["preflight", "agentplane preflight"],
  ["quickstart", "agentplane quickstart"],
  ["role", "agentplane role <ROLE>"],
  ["task list", "agentplane task list"],
  ["task active", "agentplane task active"],
  ["task brief", "agentplane task brief <task-id>"],
  ["task begin", 'agentplane task begin "..." --tag <tag> --verify "<check>"'],
  ["task complete", 'agentplane task complete <task-id> --result "..." --commit <git-rev>'],
  [
    "task new",
    'agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>',
  ],
  ["task plan approve", "agentplane task plan approve <task-id> --by ORCHESTRATOR"],
  ["task plan set", 'agentplane task plan set <task-id> --text "..." --updated-by <ROLE>'],
  ["task show", "agentplane task show <task-id>"],
  ["task start-ready", 'agentplane task start-ready <task-id> --author <ROLE> --body "Start: ..."'],
  ["task verify-show", "agentplane task verify-show <task-id>"],
  [
    "verify",
    'agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..." [--observation "..." --impact "..." --resolution "..."] [--local-only]',
  ],
]);

function formatCommandId(id: CommandId): string {
  return id.join(" ");
}

export function getCanonicalCommandInvocation(id: CommandId): string | null {
  return COMMAND_INVOCATIONS.get(formatCommandId(id)) ?? null;
}

export function requireCanonicalCommandInvocation(id: CommandId): string {
  const invocation = getCanonicalCommandInvocation(id);
  if (!invocation) {
    throw new Error(`Missing canonical invocation for command: ${formatCommandId(id)}`);
  }
  return invocation;
}
