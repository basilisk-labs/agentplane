import { COMMAND_SNIPPETS } from "./command-snippets.js";
import {
  AGENT_BOOTSTRAP_DOC_PATH,
  BOOTSTRAP_SECTIONS,
  renderBootstrapReferenceLine,
} from "./bootstrap-guide.js";

type RoleGuide = {
  role: string;
  lines: string[];
};

function renderBootstrapOverview(): string[] {
  const lines: string[] = [];
  for (const section of BOOTSTRAP_SECTIONS) {
    lines.push(`## ${section.heading}`, "", section.summary, "");
    for (const command of section.commands) {
      lines.push(`- \`${command}\``);
    }
    lines.push("");
  }
  if (lines.at(-1) === "") lines.pop();
  return lines;
}

const ROLE_GUIDES: RoleGuide[] = [
  {
    role: "ORCHESTRATOR",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      "- Owns preflight, plan summaries, approvals, and scope checkpoints.",
      "- Does not create non-executable tasks or bypass lifecycle guardrails.",
    ],
  },
  {
    role: "PLANNER",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      '- Create executable tasks with `agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>`.',
      '- Fill docs with `agentplane task doc set <task-id> --section <name> --text "..."` and set plan text with `agentplane task plan set <task-id> --text "..." --updated-by <ROLE>`.',
      "- Approve plan only after required sections and Verify Steps are ready.",
    ],
  },
  {
    role: "CODER",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      "- direct: stay in the current checkout; branch_pr: start a task branch/worktree first.",
      `- Start deterministically with \`${COMMAND_SNIPPETS.core.startTask}\` after plan approval.`,
      '- Treat `agentplane task verify-show <task-id>` as the verification contract, then record `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`.',
      `- Preferred direct close path: \`${COMMAND_SNIPPETS.core.finishTask}\` with \`--result "..." \`; add \`--no-close-commit\` only for explicit manual close handling.`,
    ],
  },
  {
    role: "TESTER",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      "- Start only after plan approval and explicit Verify Steps exist.",
      '- Use `agentplane task verify-show <task-id>` before running checks, then record `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`.',
      `- In direct mode, close with \`${COMMAND_SNIPPETS.core.finishTask}\` plus \`--result "..." \` when you own final verification.`,
    ],
  },
  {
    role: "DOCS",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      '- Keep task docs and user docs aligned with runtime behavior via `agentplane task doc set <task-id> --section <name> --text "..."`.',
      "- For implementation tasks, verify generated/help surfaces after changing CLI-facing text.",
    ],
  },
  {
    role: "REVIEWER",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      "- Review artifacts with `agentplane task show <task-id>` and `agentplane pr check <task-id>` when relevant.",
      "- Focus on regressions, lifecycle drift, and missing verification evidence.",
    ],
  },
  {
    role: "INTEGRATOR",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      '- branch_pr: `agentplane pr check <task-id>` -> `agentplane integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify` -> `agentplane finish <task-id> --commit <git-rev> --author INTEGRATOR --body "Verified: ..." --result "..." --close-commit`.',
      `- direct: the task owner normally closes with \`${COMMAND_SNIPPETS.core.finishTask}\` plus \`--result "..." \`.`,
    ],
  },
  {
    role: "CREATOR",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      `- Use \`${COMMAND_SNIPPETS.core.startTask}\` only when the new-agent creation task is approved and ready.`,
      "- Keep commits scoped to the created agent artifacts and task docs.",
    ],
  },
  {
    role: "REDMINE",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      `- Sync explicitly with \`${COMMAND_SNIPPETS.sync.pullRedmineExplicit}\` / \`${COMMAND_SNIPPETS.sync.pushRedmineExplicitWithYes}\`.`,
      "- After sync, follow the same task/bootstrap lifecycle as local backends.",
    ],
  },
  {
    role: "UPDATER",
    lines: [
      `- Shared bootstrap path: \`${COMMAND_SNIPPETS.core.quickstart}\` -> \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`,
      "- Read-only role: inspect state, do not mutate task or workflow artifacts.",
    ],
  },
];

export function listRoles(): string[] {
  return ROLE_GUIDES.map((guide) => guide.role);
}

export function renderRole(roleRaw: string): string | null {
  const trimmed = roleRaw.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toUpperCase();
  const guide = ROLE_GUIDES.find((entry) => entry.role.toUpperCase() === normalized);
  if (!guide) return null;
  return [`### ${guide.role}`, ...guide.lines].join("\n").trimEnd();
}

export function renderQuickstart(): string {
  return [
    "# agentplane quickstart",
    "",
    "The policy gateway file (AGENTS.md or CLAUDE.md) is the source of truth for workflow/process policy. CLI syntax lives in quickstart and `agentplane role <ROLE>`.",
    "Do not edit `.agentplane/tasks.json` by hand.",
    "If the repository is not initialized yet, stop and run `agentplane init` first.",
    "",
    renderBootstrapReferenceLine(),
    "",
    ...renderBootstrapOverview(),
    "",
    "## Role-specific deltas",
    "",
    `- Use \`${COMMAND_SNIPPETS.core.role}\` for role-specific constraints after you understand the shared bootstrap path.`,
    "- Role output should add deltas, not replace the canonical bootstrap flow.",
    "",
    "## Branch workflow extras",
    "",
    "- `agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree`",
    "- `agentplane pr open <task-id>` / `agentplane pr update <task-id>` / `agentplane pr check <task-id>`",
    "- `agentplane integrate <task-id> --branch task/<task-id>/<slug> --run-verify`",
    "",
    "## More guidance",
    "",
    "- `agentplane help <command>` for command-level flags and examples.",
    `- \`${COMMAND_SNIPPETS.core.role}\` for role-specific deltas.`,
    `- \`${AGENT_BOOTSTRAP_DOC_PATH}\` for the canonical startup path in repository docs.`,
    "",
    "## Commit message format",
    "",
    "Use: `<emoji> <suffix> <scope>: <summary>`.",
    "",
    "Notes:",
    "- `suffix` is the task ID segment after the last dash.",
    "- When using comment-driven flags, the subject is auto-built as `<emoji> <suffix> <primary>: <status>` and only for major transitions (TODO->DOING, DOING->BLOCKED, BLOCKED->DOING, DOING->DONE).",
    "- Comment-driven commit bodies are structured: `Task`, `Primary`, `Status`, `Comment`.",
  ].join("\n");
}
