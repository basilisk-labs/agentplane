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

const SHARED_STARTUP_NOTE = `- Shared startup path: \`${COMMAND_SNIPPETS.core.quickstart}\` is the canonical installed bootstrap; use \`${COMMAND_SNIPPETS.core.taskActive}\` to select ready work, \`${COMMAND_SNIPPETS.core.taskBrief}\` to load task context, and \`${COMMAND_SNIPPETS.core.role}\` to activate the current role before role-scoped planning or execution.`;

function renderQuickstartCommandBlock(commands: readonly string[]): string[] {
  return ["```bash", ...commands, "```"];
}

const ROLE_GUIDES: RoleGuide[] = [
  {
    role: "ORCHESTRATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Owns preflight, plan summaries, approvals, and scope checkpoints.",
      "- Use `agentplane task active` before assigning the next task when multiple TODO/DOING tasks are ready.",
      "- Hand off implementation, verification, and other owner-scoped execution to the task owner role as soon as the owner is known.",
      "- Does not create non-executable tasks or bypass lifecycle guardrails.",
    ],
  },
  {
    role: "PLANNER",
    lines: [
      SHARED_STARTUP_NOTE,
      '- For a normal first task, prefer `agentplane task begin "..." --tag <tag> --verify "<check>"`; it creates the task, writes a minimal plan, approves it, and either starts direct mode or prints the branch_pr worktree command.',
      '- Create executable tasks with `agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>`.',
      '- Fill docs with `agentplane task doc set <task-id> --section <name> --text "..."` and set plan text with `agentplane task plan set <task-id> --text "..." --updated-by <ROLE>`.',
      '- Append task-local Findings via `agentplane task findings add <task-id> --observation "..." --impact "..." --resolution "..."`; add `--promote --external` or `--repo-fixable` only for real reusable incidents.',
      "- Approve plan only after required sections and Verify Steps are ready.",
    ],
  },
  {
    role: "CODER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- direct: stay in the current checkout; branch_pr: start a task branch/worktree first, create implementation commits there, keep local PR artifacts current, and wait for hosted required checks before handing off to INTEGRATOR.",
      "- Start owner-scoped work from `agentplane task brief <task-id>` so Verify Steps, policy modules, blueprint evidence, route state, and source confidence are loaded together.",
      "- If branch_pr state is ambiguous after interruption, run `agentplane task status <task-id> --route` or `agentplane work resume <task-id>` before choosing a checkout or opening/updating a PR.",
      `- For the common path, use \`${COMMAND_SNIPPETS.core.taskBegin}\` to create/approve/start-or-route and \`${COMMAND_SNIPPETS.core.taskComplete}\` after checks pass.`,
      `- Start deterministically with \`${COMMAND_SNIPPETS.core.startTask}\` after plan approval.`,
      `- Treat \`${COMMAND_SNIPPETS.core.taskVerifyShow}\` as the verification contract, then record \`${COMMAND_SNIPPETS.core.verifyTask}\`.`,
      `- Preferred direct close path: \`${COMMAND_SNIPPETS.core.finishTask}\` with \`--result-file ./result.txt\`; add \`--no-close-commit\` only for explicit manual close handling.`,
      "- For manual close or allowlist detail, use `agentplane help finish` and `agentplane help commit` on demand.",
    ],
  },
  {
    role: "TESTER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Start only after plan approval and explicit Verify Steps exist.",
      "- Use `agentplane task brief <task-id>` first when verifying unfamiliar work; it includes Verify Steps plus route and evidence context.",
      `- Use \`${COMMAND_SNIPPETS.core.taskVerifyShow}\` before running checks, then record \`${COMMAND_SNIPPETS.core.verifyTask}\`.`,
      `- In direct mode, close with \`${COMMAND_SNIPPETS.core.finishTask}\` plus \`--result-file ./result.txt\` when you own final verification.`,
      "- For mixed-state recovery or runtime ambiguity, use `agentplane doctor` and `agentplane runtime explain` instead of relying on the short quickstart screen.",
    ],
  },
  {
    role: "DOCS",
    lines: [
      SHARED_STARTUP_NOTE,
      '- Keep task docs and user docs aligned with runtime behavior via `agentplane task doc set <task-id> --section <name> --text "..."`; use `task findings add` for append-only incident-ready Findings blocks.',
      "- Use `agentplane task brief <task-id>` before docs edits when task state, route, Verify Steps, and policy modules all matter.",
      "- For implementation tasks, verify generated/help surfaces after changing CLI-facing text.",
      "- The docs site may expand CLI behavior, but installed runtime guidance must stay self-contained and must not depend on repo-only docs paths.",
    ],
  },
  {
    role: "REVIEWER",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Review task context with `agentplane task brief <task-id>` before drilling into `agentplane task show <task-id>` and `agentplane pr check <task-id>`.",
      "- Use `agentplane task status <task-id> --route` to review task, PR, and close-tail state as one route decision.",
      "- Focus on regressions, lifecycle drift, and missing verification evidence.",
    ],
  },
  {
    role: "INTEGRATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      "- Run `agentplane task brief <task-id>` before integration to confirm task context and source confidence, then `agentplane task next-action <task-id>` or `agentplane flow repair <task-id> --dry-run` before manually repairing branch/worktree/PR/close-tail drift.",
      `- branch_pr: the primary integration route is the task GitHub PR. Require a green hosted PR gate first (${BRANCH_PR_HOSTED_GATE_GUIDANCE}), then run \`agentplane pr check <task-id>\` -> \`agentplane integrate queue run-next --run-verify --drain --wait --poll-interval-ms 30000 --timeout-ms 600000\`; on protected bases, integrate drives \`gh pr merge --auto --rebase\` when GitHub CLI is installed/authenticated, falls back to the GitHub API with explicit GH_TOKEN/GITHUB_TOKEN, and holds the queue lane until GitHub merges the PR and Task Hosted Close finishes.`,
      "- branch_pr close tail: after the task PR merges, `Task Hosted Close` pushes the deterministic closure branch and opens the follow-up closure PR when organization policy allows Actions PR creation; otherwise it leaves a manual PR link on the merged task PR. Pull the updated base branch after that closure PR merges instead of creating a local finish-only tail commit.",
      `- direct: the task owner normally closes with \`${COMMAND_SNIPPETS.core.finishTask}\` plus \`--result-file ./result.txt\`.`,
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
    "The policy gateway file (AGENTS.md or CLAUDE.md) is the source of truth for agent policy; `.agentplane/WORKFLOW.md` is the single repo-local workflow/config source.",
    "`agentplane config show` is the runtime readback of `.agentplane/WORKFLOW.md`; `agentplane quickstart` is startup guidance, not a second config source.",
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
    `- \`branch_pr\`: base checkout owns plan/approve and the merge lane; the task worktree owns implementation commits and local PR artifacts; the primary finalization route is the task GitHub PR, so INTEGRATOR runs \`pr check\` and \`integrate queue run-next --run-verify --drain --wait --poll-interval-ms 30000 --timeout-ms 600000\` from the base checkout to drive/hold the GitHub PR merge until Task Hosted Close lands the close tail.`,
    "- After preflight, use `agentplane task active` to pick ready work and `agentplane task brief <task-id>` to load task docs, Verify Steps, route state, blueprint evidence, policy modules, and source confidence before owner-scoped execution.",
    "- `branch_pr`: before manually combining `task show`, `task resume-context`, `pr flow status`, and preflight output, use `agentplane task status <task-id> --route`, `agentplane task next-action <task-id>`, `agentplane work resume <task-id>`, or `agentplane flow repair <task-id> --dry-run` to get a single route decision.",
    "- `branch_pr`: agents that inherit the user's GitHub session must treat `gh pr merge`, GitHub UI merge, and auto-merge enablement as user-attributed publication; use them only after the integration queue/handoff route, stable hosted checks, and merge-lane approval are clear.",
    "- `branch_pr`: post-merge fixes for an already `DONE` task need a new task or an explicit follow-up branch slug (`post-merge-*` or `followup` as a start/end/hyphen-bounded token); generic same-task branches can conflict with hosted close.",
    "- `branch_pr` GitHub transport: install GitHub CLI yourself (`brew install gh` on macOS, `winget install --id GitHub.cli` on Windows, or the Linux package from `https://cli.github.com/manual/installation`), then run `gh auth login`; if `gh` is unavailable, `integrate` can use explicit `GH_TOKEN`/`GITHUB_TOKEN` as a GitHub API fallback.",
    `- \`direct\`: task setup is \`${BOOTSTRAP_TASK_PREP_COMMANDS[0]}\` -> \`${BOOTSTRAP_TASK_PREP_COMMANDS[1]}\` -> \`${BOOTSTRAP_TASK_PREP_COMMANDS[2]}\`.`,
    `- \`direct\`: execution is \`${COMMAND_SNIPPETS.core.startTask}\` -> \`${COMMAND_SNIPPETS.core.taskVerifyShow}\` -> \`${COMMAND_SNIPPETS.core.verifyTask}\` -> \`${COMMAND_SNIPPETS.core.finishTask}\` with \`--result-file ./result.txt\`.`,
    "- Lifecycle/status commits are task-state checkpoints; they are not implementation commits. In `branch_pr`, `finish --commit-from-comment` is unsupported because finish runs from the base checkout.",
    "- In `direct`, `finish` creates the deterministic close commit by default; do not assume that route is the repository default when `workflow.mode=branch_pr`.",
    "",
    "## First visible payoff",
    "",
    `After \`agentplane init\`, run \`${COMMAND_SNIPPETS.core.demo}\` to create a harmless local task that shows the artifact shape, verification record, and ACR before giving a coding agent broad edit scope:`,
    "",
    ...renderQuickstartCommandBlock([
      "agentplane demo",
      "agentplane acr validate <task-id> --mode local",
    ]),
    "",
    "For a real first task, use the guided task path:",
    "",
    ...renderQuickstartCommandBlock([
      'agentplane task begin "Inspect AgentPlane artifacts" --tag docs --verify "agentplane task verify-show <task-id>"',
      "agentplane task verify-show <task-id>",
      'agentplane task complete <task-id> --result "Inspected generated artifacts" --commit <git-rev>',
    ]),
    "",
    "The payoff is a repo-visible task record:",
    "",
    "```text",
    ".agentplane/tasks/<task-id>/",
    "|-- README.md        task, plan, verification, rollback, findings",
    "|-- acr.json         Agent Change Record for local evidence review",
    "`-- pr/             branch_pr review artifacts when that mode is active",
    "```",
    "",
    "Use that local first-success artifact to confirm the workflow shape, then let Claude Code, Codex, Cursor, Aider, or another coding agent implement the approved task.",
    "",
    "## Go deeper",
    "",
    `- \`${COMMAND_SNIPPETS.core.role}\` to activate ORCHESTRATOR for planning and the task owner role before owner-scoped execution.`,
    `- \`${COMMAND_SNIPPETS.core.taskBrief}\` to load the task-specific context surface before manually stitching task docs, route status, Verify Steps, PR metadata, and policy modules.`,
    "- `agentplane blueprint examples` to inspect how analysis, content, docs, code, and release tasks resolve to different routes.",
    "- `agentplane help <command>` for flags, examples, and exceptional/manual flows.",
    "- Keep installed runtime guidance self-contained; do not depend on repo-only docs files.",
    "- If you need the docs site, treat it as a public reference surface rather than a required local file.",
    "",
    "## Non-default",
    "",
    "- `branch_pr`: use `agentplane task brief <task-id>`, `agentplane task status <task-id> --route`, `agentplane work resume <task-id>`, `agentplane help work start`, `agentplane help pr`, `agentplane pr check <task-id>`, and `agentplane help integrate` when the repository is configured that way.",
    "- Framework maintainers may use repo-local helper scripts such as `bun run workflow:wait-remote-checks` when those scripts exist; installed user repositories must not depend on them.",
    "- Recovery/mixed state: use `agentplane doctor`, `agentplane upgrade`, and `agentplane runtime explain`.",
    "- Manual close or allowlist details belong in command-specific help, not on this first screen.",
  ].join("\n");
}
