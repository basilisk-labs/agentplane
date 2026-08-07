import { COMMAND_SNIPPETS } from "./command-snippets.js";

/** @dynamic Imported by scripts/checks/check-agent-bootstrap-fresh.mjs. */
export const AGENT_BOOTSTRAP_DOC_PATH = "docs/user/agent-bootstrap.generated.mdx";
type BootstrapSection = {
  heading: string;
  summary: string;
  commands: readonly string[];
  notes?: readonly string[];
};

export const BOOTSTRAP_PREFLIGHT_COMMANDS = [
  COMMAND_SNIPPETS.core.quickstart,
  COMMAND_SNIPPETS.core.taskActive,
] as const;

const BOOTSTRAP_CONTEXT_COMMANDS = [
  COMMAND_SNIPPETS.core.taskActive,
  "agentplane task advance <task-id> --agent-json",
] as const;

const BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS = [
  COMMAND_SNIPPETS.core.taskCreate,
  "agentplane task advance <task-id> --agent-json",
  "agentplane task run <task-id>",
] as const;

/** @dynamic Imported by scripts/checks/check-agent-bootstrap-fresh.mjs. */
export const BOOTSTRAP_VERIFICATION_COMMANDS = [
  "agentplane task advance <task-id> --agent-json",
  "agentplane task run <task-id>",
] as const;

const BOOTSTRAP_RECOVERY_COMMANDS = [
  "agentplane doctor",
  "agentplane upgrade --dry-run",
  "agentplane upgrade",
] as const;

const BOOTSTRAP_SECTIONS: readonly BootstrapSection[] = [
  {
    heading: "1. Preflight",
    summary:
      "Load the installed guidance and select ready work through the compact supervisor surface.",
    commands: BOOTSTRAP_PREFLIGHT_COMMANDS,
    notes: [
      "If the project is not initialized, use `agentplane init` first.",
      "The supervisor reads workflow mode, repository state, task readiness, and checkout ownership; do not reconstruct them from shell commands.",
    ],
  },
  {
    heading: "2. Agent context",
    summary:
      "Request one compact external-agent action instead of manually combining task docs, route status, checks, hosted metadata, and policy notes.",
    commands: BOOTSTRAP_CONTEXT_COMMANDS,
    notes: [
      "`task active` is the backlog selector for agents; it does not mutate task state.",
      "`task advance --agent-json` prepares the canonical WorkOrder and emits one bounded action, state fingerprint, authority boundary, and compact context references.",
      "Use `task brief` and `task next-action --explain` only when a human needs expanded diagnostic evidence.",
      "Resolve weak source confidence or missing acceptance checks before semantic work instead of reconstructing context manually.",
    ],
  },
  {
    heading: "3. Direct happy path",
    summary:
      "Create a task from ordinary language, return its initial PLANNER result through the external protocol, then let the supervisor own formal transitions, verification persistence, and closeout.",
    commands: BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS,
    notes: [
      "Before a task-specific plan exists, `task run` returns `semantic_input_required`; use the read-only PLANNER packet from `task advance --agent-json` first.",
      "The external agent writes its typed result to `exchange.directory/exchange.result_ref` and resumes through `exchange.return_invocation`.",
      "After planning and approval, `task run` may resolve eligible semantic episodes through the configured managed adapter and returns control at human or external boundaries.",
    ],
  },
  {
    heading: "4. Verification and incident reuse",
    summary:
      "Let the supervisor prepare verification episodes, persist observed evidence, invoke independent evaluation, and decide whether to rework or close.",
    commands: BOOTSTRAP_VERIFICATION_COMMANDS,
    notes: [
      "The agent returns semantic evidence only; Agentplane owns verification records and terminal state.",
      "Incident promotion and manual close controls remain operator/recovery interfaces.",
    ],
  },
  {
    heading: "5. Fallbacks and recovery",
    summary:
      "Keep exceptional paths out of the normal route: use these only for operator recovery or framework upgrades.",
    commands: BOOTSTRAP_RECOVERY_COMMANDS,
    notes: [
      "Run `doctor` before touching managed policy files by hand.",
      "`upgrade` applies the managed framework files from the installed CLI bundle.",
      "Manual close flags belong here, not in the default direct path.",
    ],
  },
] as const;

function renderBootstrapSectionLines(sections: readonly BootstrapSection[]): string[] {
  const lines: string[] = [];
  for (const section of sections) {
    lines.push(`## ${section.heading}`, "", section.summary, "");
    for (const command of section.commands) {
      lines.push(`- \`${command}\``);
    }
    if (section.notes && section.notes.length > 0) {
      lines.push("");
      for (const note of section.notes) {
        lines.push(`- ${note}`);
      }
    }
    lines.push("");
  }
  if (lines.at(-1) === "") lines.pop();
  return lines;
}

function renderCommandBlock(commands: readonly string[]): string[] {
  return ["```bash", ...commands, "```"];
}

export function renderBootstrapDoc(): string {
  const lines = [
    "---",
    'title: "Agent bootstrap"',
    'description: "The shortest canonical startup path for agent work in an Agent Plane repository."',
    "---",
    "",
    "This page is generated from `packages/agentplane/src/cli/bootstrap-guide.ts`.",
    "",
    "This is the docs-site rendering of the CLI bootstrap model. Installed repositories should rely on `agentplane quickstart` and `agentplane role <ROLE>` instead of requiring this file to exist locally.",
    "",
    "## Copy-paste start block",
    "",
    ...renderCommandBlock(BOOTSTRAP_PREFLIGHT_COMMANDS),
    "",
    `After preflight, use \`${COMMAND_SNIPPETS.core.taskActive}\` to choose ready work and \`agentplane task advance <task-id> --agent-json\` for the compact external-agent protocol, or \`agentplane task run <task-id>\` for the managed runner. Use \`${COMMAND_SNIPPETS.core.taskBrief}\` and \`task next-action --explain\` only for expanded diagnostics.`,
    "",
    ...renderBootstrapSectionLines(BOOTSTRAP_SECTIONS),
    "",
    "## Non-default paths",
    "",
    `- An operator may use \`${COMMAND_SNIPPETS.core.taskBrief}\`, \`agentplane task status <task-id> --route\`, or \`agentplane task next-action <task-id> --explain\` for diagnostics or an explicit recovery boundary.`,
    "- Manual lifecycle, branch/worktree, Git publication, PR, verification persistence, integration, cleanup, and release commands remain compatibility/operator interfaces, not the normal agent route.",
    "- Use manual close flags only when a specific policy or recovery situation requires them.",
    "",
  ];
  return `${lines.join("\n")}\n`;
}
