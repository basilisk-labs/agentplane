import { COMMAND_SNIPPETS } from "./command-snippets.js";
import {
  BOOTSTRAP_PREFLIGHT_COMMANDS,
  BOOTSTRAP_TASK_PREP_COMMANDS,
  BRANCH_PR_HOSTED_GATE_GUIDANCE,
} from "./bootstrap-guide.js";

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
      '- Append reusable incident-ready Findings via `agentplane task findings add <task-id> --observation "..." --impact "..." --resolution "..."`; promotion is the default unless `--local-only` is set.',
      "- Approve plan only after required sections and Verify Steps are ready.",
    ],
  },
  {
    role: "CODER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- direct: stay in the current checkout; branch_pr: start a task branch/worktree first, keep local PR artifacts current, and wait for hosted required checks before handing off to INTEGRATOR.",
      `- Start deterministically with \`${COMMAND_SNIPPETS.core.startTask}\` after plan approval.`,
      `- Treat \`${COMMAND_SNIPPETS.core.taskVerifyShow}\` as the verification contract, then record \`${COMMAND_SNIPPETS.core.verifyTask}\`.`,
      `- Preferred direct close path: \`${COMMAND_SNIPPETS.core.finishTask}\` with \`--result "..." \`; add \`--no-close-commit\` only for explicit manual close handling.`,
      "- For manual close or allowlist detail, use `agentplane help finish` and `agentplane help commit` on demand.",
    ],
  },
  {
    role: "TESTER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Start only after plan approval and explicit Verify Steps exist.",
      `- Use \`${COMMAND_SNIPPETS.core.taskVerifyShow}\` before running checks, then record \`${COMMAND_SNIPPETS.core.verifyTask}\`.`,
      `- In direct mode, close with \`${COMMAND_SNIPPETS.core.finishTask}\` plus \`--result "..." \` when you own final verification.`,
      "- For mixed-state recovery or runtime ambiguity, use `agentplane doctor` and `agentplane runtime explain` instead of relying on the short quickstart screen.",
    ],
  },
  {
    role: "DOCS",
    lines: [
      SHARED_STARTUP_NOTE,
      '- Keep task docs and user docs aligned with runtime behavior via `agentplane task doc set <task-id> --section <name> --text "..."`; use `task findings add` for append-only incident-ready Findings blocks.',
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
      `- branch_pr: require a green hosted PR gate first (${BRANCH_PR_HOSTED_GATE_GUIDANCE}), then run \`agentplane pr check <task-id>\` -> \`agentplane integrate <task-id> --branch task/<task-id>/<slug> --run-verify\` -> \`agentplane finish <task-id> --commit <git-rev> --author INTEGRATOR --body "Verified: ..." --result "..." --close-commit\` on the base branch. The default integrate strategy is \`merge\` so task branch commits stay in history; pass \`--merge-strategy squash\` only when intentionally compacting history.`,
      "- branch_pr hosted shortcut: if GitHub merges the task PR directly, `Task Hosted Close` pushes the deterministic closure branch automatically and opens the follow-up closure PR when organization policy allows Actions PR creation; otherwise it leaves a manual PR link on the merged task PR. Pull the updated base branch after that closure PR merges instead of creating a local finish-only tail commit.",
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
    "The policy gateway file (AGENTS.md or CLAUDE.md) is the source of truth for agent policy; `.agentplane/WORKFLOW.md` is the source of truth for workflow/config state.",
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
    "Configured workflow route:",
    "",
    `- \`branch_pr\`: start from \`agentplane help work start\`, keep local PR artifacts current with \`agentplane pr ...\`, ${BRANCH_PR_HOSTED_GATE_GUIDANCE}, then integrate on base.`,
    `- \`direct\`: task setup is \`${BOOTSTRAP_TASK_PREP_COMMANDS[0]}\` -> \`${BOOTSTRAP_TASK_PREP_COMMANDS[1]}\` -> \`${BOOTSTRAP_TASK_PREP_COMMANDS[2]}\`.`,
    `- \`direct\`: execution is \`${COMMAND_SNIPPETS.core.startTask}\` -> \`${COMMAND_SNIPPETS.core.taskVerifyShow}\` -> \`${COMMAND_SNIPPETS.core.verifyTask}\` -> \`${COMMAND_SNIPPETS.core.finishTask}\` with \`--result "..." \`.`,
    "- In `direct`, `finish` creates the deterministic close commit by default; do not assume that route is the repository default when `workflow.mode=branch_pr`.",
    "",
    "## First visible payoff",
    "",
    "After `agentplane init`, create a harmless documentation task to see the artifact shape before giving a coding agent broad edit scope:",
    "",
    ...renderQuickstartCommandBlock([
      'agentplane task new --title "Demo task" --description "Inspect AgentPlane artifacts" --owner DOCS --tag docs',
      'agentplane task plan set <task-id> --text "Inspect the generated task README and verification section." --updated-by DOCS',
      'agentplane task start-ready <task-id> --author DOCS --body "Start: inspect the generated task artifact without editing product code."',
      "agentplane task verify-show <task-id>",
    ]),
    "",
    "The payoff is a repo-visible task record:",
    "",
    "```text",
    ".agentplane/tasks/<task-id>/",
    "|-- README.md        task, plan, verification, rollback, findings",
    "`-- pr/             branch_pr review artifacts when that mode is active",
    "```",
    "",
    "Use that preview to confirm the workflow shape, then let Claude Code, Codex, Cursor, Aider, or another coding agent implement the approved task.",
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
    "- `branch_pr`: use `agentplane help work start`, `agentplane help pr`, `agentplane pr check <task-id>`, and `agentplane help integrate` when the repository is configured that way.",
    "- Framework maintainers may use repo-local helper scripts such as `bun run workflow:wait-remote-checks` when those scripts exist; installed user repositories must not depend on them.",
    "- Recovery/mixed state: use `agentplane doctor`, `agentplane upgrade`, and `agentplane runtime explain`.",
    "- Manual close or allowlist details belong in command-specific help, not on this first screen.",
  ].join("\n");
}
