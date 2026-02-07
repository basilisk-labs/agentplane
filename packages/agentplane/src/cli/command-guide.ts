type CheatSheetRow = {
  operation: string;
  command: string;
};

type RoleGuide = {
  role: string;
  lines: string[];
};

const CHEAT_SHEET_ROWS: CheatSheetRow[] = [
  {
    operation: "PLANNER: list/show tasks",
    command: "`agentplane task list` / `agentplane task show <task-id>`",
  },
  {
    operation: "PLANNER: set/approve/reject plan",
    command:
      '`agentplane task plan set <task-id> --text "..." --updated-by <id>` / `agentplane task plan approve <task-id> --by <id> --note "OK"`',
  },
  {
    operation: "PLANNER: create task (auto ID)",
    command:
      '`agentplane task new --title "..." --description "..." --priority med --owner CODER --tag <tag> [--depends-on <task-id|json>]`',
  },
  {
    operation: "PLANNER: add/update task",
    command: "`agentplane task add <task-id> ...` / `agentplane task update <task-id> ...`",
  },
  {
    operation: "PLANNER: scaffold artifact",
    command: "`agentplane task scaffold <task-id>`",
  },
  {
    operation: "PLANNER: derive implementation from spike",
    command:
      '`agentplane task derive <spike-id> --title "..." --description "..." --priority med --owner CODER --tag code`',
  },
  {
    operation: "Config: show/set",
    command: "`agentplane config show` / `agentplane config set <key> <value>`",
  },
  {
    operation: "CODER/TESTER/DOCS: start checkout (branch_pr)",
    command: "`agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree`",
  },
  {
    operation: "CODER/TESTER/DOCS: update PR artifacts",
    command: "`agentplane pr update <task-id>`",
  },
  {
    operation: "CODER/TESTER/DOCS/REVIEWER: add handoff note",
    command: '`agentplane pr note <task-id> --author <ROLE> --body "..."`',
  },
  {
    operation: "CODER/TESTER: verify task",
    command:
      '`agentplane verify <task-id> --ok|--rework --by <id> --note "..."` (record-only; appends to README)',
  },
  {
    operation: "CODER/TESTER: print Verify Steps",
    command: "`agentplane task verify-show <task-id>`",
  },
  {
    operation: "REVIEWER: check PR artifacts",
    command: "`agentplane pr check <task-id>`",
  },
  {
    operation: "INTEGRATOR: integrate task",
    command:
      "`agentplane integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify`",
  },
  {
    operation: "INTEGRATOR: finish task(s)",
    command:
      '`agentplane finish <task-id> [<task-id> ...] --commit <git-rev> --author INTEGRATOR --body "Verified: ..."`',
  },
  {
    operation: "INTEGRATOR: commit closure",
    command:
      '`agentplane commit <task-id> -m "<emoji> <suffix> close: <detailed changelog ...>" --auto-allow --allow-tasks --require-clean`',
  },
];

const ROLE_GUIDES: RoleGuide[] = [
  {
    role: "ORCHESTRATOR",
    lines: [
      "- Plan intake: `agentplane task list` / `agentplane task show <task-id>`",
      '- After plan approval (unless the user opts out): `agentplane task new --title "..." --description "..." --priority med --owner ORCHESTRATOR --depends-on "[]" --tag <tag>`',
      "- Optional scaffold: `agentplane task scaffold <task-id>`",
      "- Two-stage verification: `## Verify Steps` is the ex-ante contract; `agentplane verify ...` appends an ex-post entry into `## Verification`.",
    ],
  },
  {
    role: "PLANNER",
    lines: [
      '- TODO scan: `agentplane task list` / `agentplane task search "..."` / `agentplane task next`',
      '- Create tasks: `agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --depends-on "[]" --tag <tag>` (tags are required; use `task add` only for imported IDs)',
      '- Update tasks: `agentplane task update <task-id> --title "..." --description "..." --priority med --owner <ROLE> --depends-on <task-id>`',
      "- Scaffold artifacts: `agentplane task scaffold <task-id>`",
      '- Plan lifecycle: `agentplane task plan set <task-id> --text "..." --updated-by <ROLE>` -> `agentplane task plan approve <task-id> --by <id>`',
      "- Verify Steps discipline: if a task has verify-required tags (default: code/backend/frontend), fill `## Verify Steps` before plan approval.",
      '- Task docs (when planning needs it): `agentplane task doc set <task-id> --section Summary --text "..."`',
    ],
  },
  {
    role: "CODER",
    lines: [
      "- direct mode: work in the current checkout; `agentplane work start <task-id> --agent <ROLE> --slug <slug>` creates/checks out `task/<task-id>/<slug>` in-place (no worktree). Use `agentplane task scaffold <task-id>` for docs without switching branches.",
      "- branch_pr: `agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree`",
      '- Status updates: `agentplane start <task-id> --author <ROLE> --body "Start: ..."` / `agentplane block <task-id> --author <ROLE> --body "Blocked: ..."`',
      "- Verify Steps: `agentplane task verify-show <task-id>` (use as the verification contract before recording results).",
      '- Verify: `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`',
      '- PR artifacts (branch_pr): `agentplane pr open <task-id> --branch task/<task-id>/<slug> --author <ROLE>` / `agentplane pr update <task-id>` / `agentplane pr note <task-id> --author <ROLE> --body "..."`',
      '- Commit: `agentplane guard commit <task-id> -m "<emoji> <suffix> <scope>: <summary>"` / `agentplane commit <task-id> -m "<emoji> <suffix> <scope>: <summary>" --allow <path-prefix>`',
    ],
  },
  {
    role: "TESTER",
    lines: [
      "- direct mode: work in the current checkout; `agentplane work start <task-id> --agent <ROLE> --slug <slug>` creates/checks out `task/<task-id>/<slug>` in-place (no worktree). Use `agentplane task scaffold <task-id>` for docs without switching branches.",
      "- branch_pr: `agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree`",
      '- Status updates: `agentplane start <task-id> --author <ROLE> --body "Start: ..."` / `agentplane block <task-id> --author <ROLE> --body "Blocked: ..."`',
      "- Verify Steps: `agentplane task verify-show <task-id>` (treat as the verification contract).",
      '- Verify: `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`',
      '- PR artifacts (branch_pr): `agentplane pr open <task-id> --branch task/<task-id>/<slug> --author <ROLE>` / `agentplane pr update <task-id>` / `agentplane pr note <task-id> --author <ROLE> --body "..."`',
      '- Commit: `agentplane guard commit <task-id> -m "<emoji> <suffix> <scope>: <summary>"` / `agentplane commit <task-id> -m "<emoji> <suffix> <scope>: <summary>" --allow <path-prefix>`',
    ],
  },
  {
    role: "DOCS",
    lines: [
      '- Task docs: `agentplane task doc set <task-id> --section Summary --text "..."` (repeat per section or use `--file`)',
      '- PR notes: `agentplane pr note <task-id> --author DOCS --body "..."`',
      '- Commit: `agentplane guard commit <task-id> -m "<emoji> <suffix> <scope>: <summary>"` / `agentplane commit <task-id> -m "<emoji> <suffix> <scope>: <summary>" --allow <path-prefix>`',
    ],
  },
  {
    role: "REVIEWER",
    lines: [
      "- Review artifacts: `agentplane pr check <task-id>` / `agentplane task show <task-id>`",
      '- Handoff notes: `agentplane pr note <task-id> --author REVIEWER --body "..."`',
    ],
  },
  {
    role: "INTEGRATOR",
    lines: [
      '- branch_pr: `agentplane pr check <task-id>` -> `agentplane integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify` -> `agentplane finish <task-id> --commit <git-rev> --author INTEGRATOR --body "Verified: ..."`',
      '- direct: task owner uses `agentplane finish <task-id> --commit <git-rev> --author <OWNER> --body "Verified: ..."` after the implementation commit',
      "- Optional cleanup: `agentplane cleanup merged --yes`",
    ],
  },
  {
    role: "CREATOR",
    lines: [
      '- Task bookkeeping: `agentplane task update <task-id> ...` / `agentplane start <task-id> --author CREATOR --body "Start: ..."`',
      '- Commits: `agentplane guard commit <task-id> -m "<emoji> <suffix> <scope>: <summary>"` / `agentplane commit <task-id> -m "<emoji> <suffix> <scope>: <summary>" --allow <path-prefix>`',
    ],
  },
  {
    role: "REDMINE",
    lines: [
      "- Sync before/after updates: `agentplane sync redmine --direction pull` / `agentplane sync redmine --direction push --yes`",
      "- Then use normal task/doc commands (`agentplane task list` / `agentplane task show` / `agentplane task update` / `agentplane task doc set`) as needed.",
    ],
  },
  {
    role: "UPDATER",
    lines: [
      '- Read-only audit: `agentplane task list` / `agentplane task show` / `agentplane task search "..."` / `agentplane task next` (no write commands).',
    ],
  },
];

function renderCheatSheet(rows: CheatSheetRow[]): string[] {
  const lines = ["Operation | Command", "--- | ---"];
  for (const row of rows) {
    lines.push(`${row.operation} | ${row.command}`);
  }
  return lines;
}

function renderRoleSection(): string[] {
  const lines: string[] = [];
  for (const guide of ROLE_GUIDES) {
    lines.push(`### ${guide.role}`, ...guide.lines, "");
  }
  if (lines.at(-1) === "") lines.pop();
  return lines;
}

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
    "agentplane CLI is the source of truth for task, PR, verify, and commit commands.",
    "Do not edit `.agentplane/tasks.json` by hand.",
    "",
    "## Project setup",
    "",
    "- `agentplane init` (bootstrap `.agentplane/`)",
    "- `agentplane config show` / `agentplane config set <key> <value>`",
    "- `agentplane mode get` / `agentplane mode set <direct|branch_pr>`",
    "- `agentplane ide sync` (regenerate IDE entrypoints)",
    "",
    "## Daily task workflow",
    "",
    "- `agentplane task list` / `agentplane task show <task-id>`",
    '- `agentplane task new --title "..." --description "..." --priority med --owner CODER --tag <tag>`',
    '- `agentplane start <task-id> --author <ROLE> --body "Start: ..."`',
    '- `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`',
    '- `agentplane finish <task-id> --author <ROLE> --body "Verified: ..."`',
    "",
    "## Branch workflow (branch_pr)",
    "",
    "- `agentplane work start <task-id> --agent <ROLE> --slug <slug> --worktree`",
    "- `agentplane pr open <task-id>` / `agentplane pr update <task-id>` / `agentplane pr check <task-id>`",
    "- `agentplane integrate <task-id> --branch task/<task-id>/<slug> --run-verify`",
    "",
    "## Recipes and scenarios",
    "",
    "- `agentplane recipes list`",
    "- `agentplane recipes list --tag <tag>`",
    "- `agentplane recipes explain <id>`",
    "- `agentplane scenario list`",
    "- `agentplane scenario run <recipe:scenario>`",
    "",
    "## More guidance",
    "",
    "- `agentplane quickstart` and `agentplane role <ROLE>` show command guidance.",
    "",
    "## Agent cheat sheet",
    "",
    ...renderCheatSheet(CHEAT_SHEET_ROWS),
    "",
    "## Config management",
    "",
    "- Show the current config: `agentplane config show`",
    "- Set a value by dotted key: `agentplane config set workflow_mode branch_pr`",
    '- Set JSON values (lists/objects): `agentplane config set tasks.verify.required_tags \'["code","backend"]\'`',
    "",
    "## Role/phase command guide (when to use what)",
    "",
    "Use `agentplane role <ROLE>` to print a single block from this section.",
    "",
    ...renderRoleSection(),
    "",
    "## Global flags",
    "",
    "- `--root <path>`: treat <path> as project root",
    "- `--json`: emit JSON-formatted errors",
    "- `--help` / `-h`: show help",
    "- `--version`: show version",
    "- `--no-update-check`: skip checking npm for a newer CLI version",
    "",
    "Notes:",
    "- `.env` at the repo root is loaded automatically (without overwriting existing environment variables).",
    "",
    "## Commit message format",
    "",
    "Use: `<emoji> <suffix> <scope>: <summary>`.",
    "",
    "Notes:",
    "- `suffix` is the task ID segment after the last dash.",
    "- When using comment-driven flags, the subject is auto-built as `<emoji> <suffix> <scope>: <summary>`, and the body is auto-built from your status/finish comment.",
  ].join("\n");
}
