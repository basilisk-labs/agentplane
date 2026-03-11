import { COMMAND_SNIPPETS } from "./command-snippets.js";
import { BOOTSTRAP_PREFLIGHT_COMMANDS, BOOTSTRAP_TASK_PREP_COMMANDS } from "./bootstrap-guide.js";

type RoleGuide = {
  role: string;
  lines: string[];
};

export type RoleProfileGuide = {
  filename?: string;
  id?: string;
  role?: string;
  description?: string;
  inputs?: readonly string[];
  outputs?: readonly string[];
  permissions?: readonly string[];
  workflow?: readonly string[];
};

const SHARED_STARTUP_NOTE = `- Shared startup path: \`${COMMAND_SNIPPETS.core.quickstart}\` is the canonical installed bootstrap; use \`${COMMAND_SNIPPETS.core.role}\` to activate the current role before role-scoped planning or execution.`;

function renderQuickstartCommandBlock(commands: readonly string[]): string[] {
  return ["```bash", ...commands, "```"];
}

const ROLE_GUIDES: RoleGuide[] = [
  {
    role: "ORCHESTRATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Owns preflight, plan summaries, approvals, and scope checkpoints.",
      "- Hand off implementation, verification, and other owner-scoped execution to the task owner role as soon as the owner is known.",
      "- Does not create non-executable tasks or bypass lifecycle guardrails.",
    ],
  },
  {
    role: "PLANNER",
    lines: [
      SHARED_STARTUP_NOTE,
      '- Create executable tasks with `agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>`.',
      '- Fill docs with `agentplane task doc set <task-id> --section <name> --text "..."` and set plan text with `agentplane task plan set <task-id> --text "..." --updated-by <ROLE>`.',
      "- Approve plan only after required sections and Verify Steps are ready.",
    ],
  },
  {
    role: "CODER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- direct: stay in the current checkout; branch_pr: start a task branch/worktree first.",
      `- Start deterministically with \`${COMMAND_SNIPPETS.core.startTask}\` after plan approval.`,
      '- Treat `agentplane task verify-show <task-id>` as the verification contract, then record `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`.',
      `- Preferred direct close path: \`${COMMAND_SNIPPETS.core.finishTask}\` with \`--result "..." \`; add \`--no-close-commit\` only for explicit manual close handling.`,
      "- For manual close or allowlist detail, use `agentplane help finish` and `agentplane help commit` on demand.",
    ],
  },
  {
    role: "TESTER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Start only after plan approval and explicit Verify Steps exist.",
      '- Use `agentplane task verify-show <task-id>` before running checks, then record `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`.',
      `- In direct mode, close with \`${COMMAND_SNIPPETS.core.finishTask}\` plus \`--result "..." \` when you own final verification.`,
      "- For mixed-state recovery or runtime ambiguity, use `agentplane doctor` and `agentplane runtime explain` instead of relying on the short quickstart screen.",
    ],
  },
  {
    role: "DOCS",
    lines: [
      SHARED_STARTUP_NOTE,
      '- Keep task docs and user docs aligned with runtime behavior via `agentplane task doc set <task-id> --section <name> --text "..."`.',
      "- For implementation tasks, verify generated/help surfaces after changing CLI-facing text.",
      "- The docs site may expand CLI behavior, but installed runtime guidance must stay self-contained and must not depend on repo-only docs paths.",
    ],
  },
  {
    role: "REVIEWER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Review artifacts with `agentplane task show <task-id>` and `agentplane pr check <task-id>` when relevant.",
      "- Focus on regressions, lifecycle drift, and missing verification evidence.",
    ],
  },
  {
    role: "INTEGRATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      '- branch_pr: `agentplane pr check <task-id>` -> `agentplane integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify` -> `agentplane finish <task-id> --commit <git-rev> --author INTEGRATOR --body "Verified: ..." --result "..." --close-commit`.',
      `- direct: the task owner normally closes with \`${COMMAND_SNIPPETS.core.finishTask}\` plus \`--result "..." \`.`,
      "- For branch-level flags and branch/base diagnostics, use `agentplane help work start`, `agentplane help integrate`, and `agentplane help branch base`.",
    ],
  },
  {
    role: "CREATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      `- Use \`${COMMAND_SNIPPETS.core.startTask}\` only when the new-agent creation task is approved and ready.`,
      "- Keep commits scoped to the created agent artifacts and task docs.",
    ],
  },
  {
    role: "REDMINE",
    lines: [
      SHARED_STARTUP_NOTE,
      `- Sync explicitly with \`${COMMAND_SNIPPETS.sync.pullRedmineExplicit}\` / \`${COMMAND_SNIPPETS.sync.pushRedmineExplicitWithYes}\`.`,
      "- After sync, follow the same task/bootstrap lifecycle as local backends.",
    ],
  },
  {
    role: "UPDATER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Read-only role: inspect state, do not mutate task or workflow artifacts.",
    ],
  },
];

export function listRoles(): string[] {
  return ROLE_GUIDES.map((guide) => guide.role);
}

export function getRoleSupplementLines(roleRaw: string): string[] | null {
  const trimmed = roleRaw.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toUpperCase();
  const guide = ROLE_GUIDES.find((entry) => entry.role.toUpperCase() === normalized);
  return guide ? guide.lines : null;
}

function renderRoleList(title: string, items: readonly string[] | undefined): string[] {
  return items && items.length > 0 ? ["", `${title}:`, ...items.map((item) => `- ${item}`)] : [];
}

export function renderRole(
  roleRaw: string,
  opts: { profile?: RoleProfileGuide | null } = {},
): string | null {
  const trimmed = roleRaw.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toUpperCase();
  const supplementLines = getRoleSupplementLines(normalized);
  const profile = opts.profile ?? null;
  if (!supplementLines && !profile) return null;

  const heading = (typeof profile?.id === "string" && profile.id.trim()) || normalized;
  const role = typeof profile?.role === "string" ? profile.role.trim() : "";
  const description = typeof profile?.description === "string" ? profile.description.trim() : "";

  const lines: string[] = [
    `### ${heading}`,
    ...(role ? [`Role: ${role}`] : []),
    ...(description ? [`Description: ${description}`] : []),
    ...renderRoleList("Inputs", profile?.inputs),
    ...renderRoleList("Outputs", profile?.outputs),
    ...renderRoleList("Permissions", profile?.permissions),
    ...renderRoleList("Workflow", profile?.workflow),
    ...(supplementLines ? ["", "CLI/runtime notes:", ...supplementLines] : []),
    ...(profile?.filename
      ? [
          "",
          `Source: .agentplane/agents/${profile.filename} (role-specific content); policy gateway files still have higher priority.`,
        ]
      : []),
  ];
  return lines.join("\n").trimEnd();
}

export function renderQuickstart(): string {
  return [
    "# agentplane quickstart",
    "",
    "The policy gateway file (AGENTS.md or CLAUDE.md) is the source of truth for workflow/process policy.",
    "Keep this first screen short: use it for startup only, then go deeper with `agentplane role <ROLE>` or `agentplane help <command>`.",
    "Do not edit `.agentplane/tasks.json` by hand.",
    "If the repository is not initialized yet, stop and run `agentplane init` first.",
    "",
    `Canonical installed startup surface: \`${COMMAND_SNIPPETS.core.quickstart}\`.`,
    "",
    "## First screen",
    "",
    "Run preflight:",
    "",
    ...renderQuickstartCommandBlock(BOOTSTRAP_PREFLIGHT_COMMANDS),
    "",
    "Default direct route:",
    "",
    `- Task setup: \`${BOOTSTRAP_TASK_PREP_COMMANDS[0]}\` -> \`${BOOTSTRAP_TASK_PREP_COMMANDS[1]}\` -> \`${BOOTSTRAP_TASK_PREP_COMMANDS[2]}\`.`,
    `- Execution: \`${COMMAND_SNIPPETS.core.startTask}\` -> \`agentplane task verify-show <task-id>\` -> \`${COMMAND_SNIPPETS.core.verifyTask}\` -> \`${COMMAND_SNIPPETS.core.finishTask}\` with \`--result "..." \`.`,
    "- In `direct`, `finish` creates the deterministic close commit by default.",
    "",
    "## Go deeper",
    "",
    `- \`${COMMAND_SNIPPETS.core.role}\` to activate ORCHESTRATOR for planning and the task owner role before owner-scoped execution.`,
    "- `agentplane help <command>` for flags, examples, and exceptional/manual flows.",
    "- Keep installed runtime guidance self-contained; do not depend on repo-only docs files.",
    "- If you need the docs site, treat it as a public reference surface rather than a required local file.",
    "",
    "## Non-default",
    "",
    "- `branch_pr`: use `agentplane help work start`, `agentplane help pr`, and `agentplane help integrate`.",
    "- Recovery/mixed state: use `agentplane doctor`, `agentplane upgrade`, and `agentplane runtime explain`.",
    "- Manual close or allowlist details belong in command-specific help, not on this first screen.",
  ].join("\n");
}
