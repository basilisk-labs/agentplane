Ост# agentctl quickstart

`python .agent-plane/agentctl.py` is the only supported way to inspect/update the task snapshot (manual edits break the checksum).

## Agent management source of truth

This file is the canonical reference for agent task/PR/verify/commit operations. Agent instructions should point here instead of embedding specific command strings.

## Agent cheat sheet

Operation | Command
--- | ---
PLANNER: list/show tasks | `python .agent-plane/agentctl.py task list` / `python .agent-plane/agentctl.py task show <task-id>`
PLANNER: create task (auto ID) | `python .agent-plane/agentctl.py task new --title "..." --description "..." --priority med --owner CODER --tag <tag>`
PLANNER: add/update task | `python .agent-plane/agentctl.py task add <task-id> ...` / `python .agent-plane/agentctl.py task update <task-id> ...`
PLANNER: scaffold artifact | `python .agent-plane/agentctl.py task scaffold <task-id>`
Config: show/set | `python .agent-plane/agentctl.py config show` / `python .agent-plane/agentctl.py config set <key> <value> [--json]`
CODER/TESTER/DOCS: start checkout (branch_pr) | `python .agent-plane/agentctl.py work start <task-id> --agent <ROLE> --slug <slug> --worktree`
CODER/TESTER/DOCS: update PR artifacts | `python .agent-plane/agentctl.py pr update <task-id>`
CODER/TESTER/DOCS/REVIEWER: add handoff note | `python .agent-plane/agentctl.py pr note <task-id> --author <ROLE> --body \"...\"`
CODER/TESTER: verify task | `python .agent-plane/agentctl.py verify <task-id>`
REVIEWER: check PR artifacts | `python .agent-plane/agentctl.py pr check <task-id>`
INTEGRATOR: integrate task | `python .agent-plane/agentctl.py integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify`
INTEGRATOR: finish task(s) | `python .agent-plane/agentctl.py finish <task-id> [<task-id> ...] --commit <git-rev> --author INTEGRATOR --body \"Verified: ...\"`
INTEGRATOR: commit closure | `python .agent-plane/agentctl.py commit <task-id> -m \"✅ <suffix> close: <detailed changelog ...>\" --auto-allow --allow-tasks --require-clean`

## Config management

- Show the current config: `python .agent-plane/agentctl.py config show`
- Set a value by dotted key: `python .agent-plane/agentctl.py config set workflow_mode branch_pr`
- Set JSON values (lists/objects): `python .agent-plane/agentctl.py config set tasks.verify.required_tags '["code","backend"]' --json`

## Role/phase command guide (when to use what)

Use `python .agent-plane/agentctl.py role <ROLE>` to print a single block from this section.

### ORCHESTRATOR

- Plan intake: `python .agent-plane/agentctl.py task list` / `python .agent-plane/agentctl.py task show <task-id>`
- After plan approval (unless the user opts out): `python .agent-plane/agentctl.py task new --title "..." --description "..." --priority med --owner ORCHESTRATOR --depends-on "[]" --tag <tag>`
- Optional scaffold: `python .agent-plane/agentctl.py task scaffold <task-id>`

### PLANNER

- TODO scan: `python .agent-plane/agentctl.py task list` / `python .agent-plane/agentctl.py task search "..."` / `python .agent-plane/agentctl.py task next`
- Create tasks: `python .agent-plane/agentctl.py task new --title "..." --description "..." --priority med --owner <ROLE> --depends-on "[]" --tag <tag>` (tags are required; use `task add` only for imported IDs)
- Update tasks: `python .agent-plane/agentctl.py task update <task-id> --title "..." --description "..." --priority med --owner <ROLE> --depends-on <task-id>`
- Scaffold artifacts: `python .agent-plane/agentctl.py task scaffold <task-id>`
- Task docs (when planning needs it): `python .agent-plane/agentctl.py task doc set <task-id> --section Summary --text "..."`

### CODER

- direct mode: work in the current checkout; optional `python .agent-plane/agentctl.py work start <task-id> --agent <ROLE> --slug <slug>` only scaffolds docs
- branch_pr: `python .agent-plane/agentctl.py work start <task-id> --agent <ROLE> --slug <slug> --worktree`
- Status updates: `python .agent-plane/agentctl.py start <task-id> --author <ROLE> --body "Start: ..."` / `python .agent-plane/agentctl.py block <task-id> --author <ROLE> --body "Blocked: ..."`
- Verify: `python .agent-plane/agentctl.py verify <task-id>`
- PR artifacts (branch_pr): `python .agent-plane/agentctl.py pr open <task-id> --branch task/<task-id>/<slug> --author <ROLE>` / `python .agent-plane/agentctl.py pr update <task-id>` / `python .agent-plane/agentctl.py pr note <task-id> --author <ROLE> --body "..."`
- Commit: `python .agent-plane/agentctl.py guard commit <task-id> -m "✨ <suffix> ..."` / `python .agent-plane/agentctl.py commit <task-id> -m "✨ <suffix> ..." --allow <path-prefix>`

### TESTER

- direct mode: work in the current checkout; optional `python .agent-plane/agentctl.py work start <task-id> --agent <ROLE> --slug <slug>` only scaffolds docs
- branch_pr: `python .agent-plane/agentctl.py work start <task-id> --agent <ROLE> --slug <slug> --worktree`
- Status updates: `python .agent-plane/agentctl.py start <task-id> --author <ROLE> --body "Start: ..."` / `python .agent-plane/agentctl.py block <task-id> --author <ROLE> --body "Blocked: ..."`
- Verify: `python .agent-plane/agentctl.py verify <task-id>`
- PR artifacts (branch_pr): `python .agent-plane/agentctl.py pr open <task-id> --branch task/<task-id>/<slug> --author <ROLE>` / `python .agent-plane/agentctl.py pr update <task-id>` / `python .agent-plane/agentctl.py pr note <task-id> --author <ROLE> --body "..."`
- Commit: `python .agent-plane/agentctl.py guard commit <task-id> -m "✨ <suffix> ..."` / `python .agent-plane/agentctl.py commit <task-id> -m "✨ <suffix> ..." --allow <path-prefix>`

### DOCS

- Task docs: `python .agent-plane/agentctl.py task doc set <task-id> --section Summary --text "..."` (repeat per section or use `--file`)
- PR notes: `python .agent-plane/agentctl.py pr note <task-id> --author DOCS --body "..."`
- Commit: `python .agent-plane/agentctl.py guard commit <task-id> -m "✨ <suffix> ..."` / `python .agent-plane/agentctl.py commit <task-id> -m "✨ <suffix> ..." --allow <path-prefix>`

### REVIEWER

- Review artifacts: `python .agent-plane/agentctl.py pr check <task-id>` / `python .agent-plane/agentctl.py task show <task-id>`
- Handoff notes: `python .agent-plane/agentctl.py pr note <task-id> --author REVIEWER --body "..."`

### INTEGRATOR

- branch_pr: `python .agent-plane/agentctl.py pr check <task-id>` -> `python .agent-plane/agentctl.py integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify` -> `python .agent-plane/agentctl.py finish <task-id> --commit <git-rev> --author INTEGRATOR --body "Verified: ..."`
- direct: task owner uses `python .agent-plane/agentctl.py finish <task-id> --commit <git-rev> --author <OWNER> --body "Verified: ..."` after the implementation commit
- Optional cleanup: `python .agent-plane/agentctl.py cleanup merged --yes`

### CREATOR

- Task bookkeeping: `python .agent-plane/agentctl.py task update <task-id> ...` / `python .agent-plane/agentctl.py start <task-id> --author CREATOR --body "Start: ..."`
- Commits: `python .agent-plane/agentctl.py guard commit <task-id> -m "✨ <suffix> ..."` / `python .agent-plane/agentctl.py commit <task-id> -m "✨ <suffix> ..." --allow <path-prefix>`

### REDMINE

- Sync before/after updates: `python .agent-plane/agentctl.py sync redmine --direction pull` / `python .agent-plane/agentctl.py sync redmine --direction push --yes`
- Then use normal task/doc commands (`python .agent-plane/agentctl.py task list` / `python .agent-plane/agentctl.py task show` / `python .agent-plane/agentctl.py task update` / `python .agent-plane/agentctl.py task doc set`) as needed.

### UPDATER

- Read-only audit: `python .agent-plane/agentctl.py task list` / `python .agent-plane/agentctl.py task show` / `python .agent-plane/agentctl.py task search "..."` / `python .agent-plane/agentctl.py task next` (no write commands).

## Global flags

- `--quiet`: suppress non-essential output.
- `--verbose`: enable extra logging (when available).
- `--json`: emit JSON-formatted errors (for CI/integrations).
- `--lint`: force snapshot lint at command start (useful for read-only commands).

Notes:
- `.env` at the repo root is loaded automatically (without overwriting existing environment variables).
- Writes (export/finish/etc.) auto-run lint on the snapshot.
- Use `--lint` with read-only commands like `task list`/`task show` when you need validation.

## Error output

- Default: human-readable errors to stderr.
- `--json`: errors printed as JSON to stdout with `{ error: { code, message, context } }`.

## Common commands

```bash
# list/show
python .agent-plane/agentctl.py task list
python .agent-plane/agentctl.py task show <task-id>

# create a new task with an auto-generated id
python .agent-plane/agentctl.py task new --title "..." --description "..." --priority med --owner CODER --tag <tag>

# config
python .agent-plane/agentctl.py config show
python .agent-plane/agentctl.py config set workflow_mode branch_pr
python .agent-plane/agentctl.py config set tasks.verify.required_tags '["code","backend"]' --json

# validate the task snapshot (schema/deps/checksum)
python .agent-plane/agentctl.py task lint

# normalize task READMEs via backend rewrite
python .agent-plane/agentctl.py task normalize

# readiness gate (deps DONE)
python .agent-plane/agentctl.py ready <task-id>

# status transitions with structured comments (no commit by default)
python .agent-plane/agentctl.py start <task-id> --author CODER --body "Start: ... (why, scope, plan, risks)"
python .agent-plane/agentctl.py block <task-id> --author CODER --body "Blocked: ... (what blocks, next step, owner)"

# optional comment-driven commits (only when you intend to create a commit)
# agentctl builds `<emoji> <suffix> <formatted comment>` from your status body
# comment text is normalized into a summary plus optional details
python .agent-plane/agentctl.py start <task-id> --author CODER --body "Start: ... " --commit-from-comment --commit-auto-allow
python .agent-plane/agentctl.py block <task-id> --author CODER --body "Blocked: ... " --commit-from-comment --commit-auto-allow
python .agent-plane/agentctl.py task set-status <task-id> DONE --author CODER --body "Done: ... " --commit-from-comment --commit-auto-allow
python .agent-plane/agentctl.py finish <task-id> --author INTEGRATOR --body "Verified: ... " --commit-from-comment --commit-auto-allow --status-commit --status-commit-auto-allow
# if status_commit_policy=warn|confirm, add --confirm-status-commit to acknowledge

# run per-task verify commands (declared on the task)
python .agent-plane/agentctl.py verify <task-id> --skip-if-unchanged
# (when .agent-plane/tasks/<task-id>/pr/verify.log exists, agentctl will append to it by default)

# keep the framework aligned with upstream
python .agent-plane/agentctl.py upgrade --force

# before committing, validate staged allowlist + message quality
python .agent-plane/agentctl.py guard commit <task-id> -m "✨ <suffix> detailed changelog: change A; change B; change C" --auto-allow

# if you want a safe wrapper that also runs `git commit`
python .agent-plane/agentctl.py commit <task-id> -m "✨ <suffix> detailed changelog: change A; change B; change C" --allow <path-prefix>

# optional git hooks (opt-in; never auto-installed)
python .agent-plane/agentctl.py hooks install
python .agent-plane/agentctl.py hooks uninstall
#
# hooks enforce:
# - commit-msg: commit subject includes task suffix tokens
# - pre-commit: protected-path policy and branch_pr task rules

# when closing a task in the branching workflow (INTEGRATOR on the base branch)
python .agent-plane/agentctl.py finish <task-id> --commit <git-rev> --author INTEGRATOR --body "Verified: ... (what ran, results, caveats)"
# batch close (same commit metadata + comment applied to each task)
python .agent-plane/agentctl.py finish <task-id> <task-id> --commit <git-rev> --author INTEGRATOR --body "Verified: ... (what ran, results, caveats)"
```

```bash
# batch add (shared metadata for each task)
python .agent-plane/agentctl.py task add <task-id> <task-id> --title "..." --description "..." --priority med --owner CODER
```

## Commit naming for batch finish

Include every task ID suffix in the commit subject (after the last dash), followed by a detailed changelog, for example: `✅ <suffix> <suffix> close: change A; change B; change C`.

## Commit message format

Use: `<emoji> <suffix> <detailed changelog ...>`.

Notes:
- `suffix` is the task ID segment after the last dash.
- For batch commits, include every task suffix in the subject.
- When using the comment-driven flags, the subject is auto-built as `<emoji> <suffix> <formatted comment>` from your status/finish body.
- When a comment-driven commit is created, the stored task comment is normalized to the same formatted text used in the commit subject.
- Start commits use 🚧 and finish/status commits use ✅; intermediate commits infer emoji from the comment text unless you override with `--commit-emoji` / `--status-commit-emoji`.
- Comment formatting: the prefix (Start/Blocked/Verified) is normalized to lowercase, and extra segments (separated by `;`, `|`, `--`, `-`, or sentence breaks) become `| details: ...`.

Example:

```
Start: add emoji inference; update docs; adjust CLI help
```

becomes:

```
🚧 VXPBHQ start: add emoji inference | details: update docs; adjust CLI help
```

Emoji hints for inferred commits (first match wins):

Emoji | Keywords
--- | ---
⛔ | blocked, blocker, stuck, waiting
🚑 | hotfix, urgent, emergency
🐛 | fix, bug, defect, crash, regression
🔒 | security, vuln, auth, encryption
⚡ | perf, performance, optimize, latency
🧪 | test, tests, verify, coverage, spec
📝 | doc, docs, readme, documentation, guide
♻️ | refactor, cleanup, restructure, rename
🏗️ | build, ci, pipeline, release
🔧 | config, settings, env, flags
📦 | deps, dependency, upgrade, bump
🎨 | ui, ux, css, theme, layout
🧹 | lint, format, typo, spelling

## Terminology

- Task ID: the full identifier for a task (for example, `202601071301-3XK6VD`).
- Suffix: the segment after the last dash in the task ID (for example, `3XK6VD`).

## Branching workflow helpers

```bash
# one-command task checkout (branch + worktree + PR artifact + docs skeleton)
python .agent-plane/agentctl.py work start <task-id> --agent CODER --slug <slug> --worktree

# create a task branch + worktree (inside this repo only)
# - branch: <task_prefix>/<task-id>/<slug> (default: task; config: branch.task_prefix)
# - worktree: <worktrees_dir>/<task-id>-<slug>/ (default: .agent-plane/worktrees; config: paths.worktrees_dir)
python .agent-plane/agentctl.py branch create <task-id> --agent CODER --slug <slug> --worktree

# show quick status (ahead/behind, worktree path)
python .agent-plane/agentctl.py branch status --branch task/<task-id>/<slug>

# open/update/check the tracked PR artifact (local PR simulation)
python .agent-plane/agentctl.py pr open <task-id> --branch task/<task-id>/<slug> --author CODER
python .agent-plane/agentctl.py pr update <task-id>  # optional; integrate refreshes diffstat + README auto-summary on the base branch
python .agent-plane/agentctl.py pr check <task-id>
python .agent-plane/agentctl.py pr note <task-id> --author CODER --body "Handoff: ..."

# integrate into the base branch (INTEGRATOR only; run from repo root on the base branch)
# includes: pr check → verify (skips if already verified for the same SHA unless --run-verify) → merge → refresh diffstat/README auto-summary → finish → task lint
python .agent-plane/agentctl.py integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --run-verify
python .agent-plane/agentctl.py integrate <task-id> --branch task/<task-id>/<slug> --merge-strategy squash --dry-run

# cleanup merged branches/worktrees (dry-run by default)
python .agent-plane/agentctl.py cleanup merged
python .agent-plane/agentctl.py cleanup merged --yes
```

## Ergonomics helpers

```bash
# find tasks that are ready to start (deps DONE)
python .agent-plane/agentctl.py task next

# search tasks by text (title/description/tags/comments)
python .agent-plane/agentctl.py task search agentctl

# show role-specific guidance from the role/phase section
python .agent-plane/agentctl.py role CODER

# scaffold a workflow artifact (.agent-plane/tasks/<task-id>/README.md)
python .agent-plane/agentctl.py task scaffold <task-id>

# normalize task READMEs via backend rewrite (fix formatting/escaping)
python .agent-plane/agentctl.py task normalize

# update task README sections (agentctl-only)
python .agent-plane/agentctl.py task doc set <task-id> --section Summary --text "..."
python .agent-plane/agentctl.py task doc set <task-id> --section Context --file notes.md

# suggest minimal --allow prefixes based on staged files
python .agent-plane/agentctl.py guard suggest-allow
python .agent-plane/agentctl.py guard suggest-allow --format args
```

## Workflow reminders

- The snapshot is canonical; agents are forbidden from editing it by hand (use agentctl only).
- Task READMEs are managed by agentctl; update content via `task doc set` (manual edits are rejected by guard).
- Create new tasks via `python .agent-plane/agentctl.py task new ...` so IDs are generated by agentctl; tags are required. Reserve `task add` for pre-existing IDs (imports/sync).
- When updating multiple tasks, prefer batch commands (for example, `task add`/`finish` with multiple IDs) so agentctl can use `write_tasks` and reduce repeated writes.
- Git is allowed for inspection/local ops; use agentctl for commits. Comment-driven flags (`--commit-from-comment`, `--status-commit`) are optional when you want the commit subject auto-built.
- Status updates (`start`/`block`/`finish`) are no-commit by default; add comment-driven commit flags only when you need a commit.
- status_commit_policy controls whether comment-driven commits are allowed, warned, or require confirmation; use --confirm-status-commit when policy=warn/confirm.
- Before finishing a task, ensure @.agent-plane/tasks/<task-id>/README.md is filled in (no placeholder `...`).
- In branching workflow, `agentctl` rejects snapshot writes outside the repo root checkout on the pinned base branch (and guardrails reject committing snapshot changes from task branches).
- Batch writes: when the backend supports `write_tasks`, agentctl uses it to reduce repeated writes during `finish` and `task normalize`.
- Keep work atomic: one task → one implementation commit (plus planning + closure commits if you use the 3-phase cadence).
- Prefer `start/block/finish` over `task set-status`.
- Keep allowlists tight: pass only the path prefixes you intend to commit.

Task README sections (body):

- Summary
- Context
- Scope
- Risks
- Verify Steps
- Rollback Plan
- Notes
- Changes Summary (auto)

## Workflow mode

`agentctl` behavior is controlled by `.agent-plane/config.json`:

- `workflow_mode: "direct"`: low-ceremony, single-checkout workflow.
  - Do all work in the current checkout; do not create task branches/worktrees (`agentctl branch create` is refused).
  - `python .agent-plane/agentctl.py work start <task-id>` only scaffolds `.agent-plane/tasks/<task-id>/README.md` (it does not create a branch/worktree).
  - PR artifacts under `.agent-plane/tasks/<task-id>/pr/` are optional.
  - Tasks can be implemented and closed on the current branch; the snapshot is still updated only via `python .agent-plane/agentctl.py` (no manual edits).
- `workflow_mode: "branch_pr"`: strict branching workflow (task branches + worktrees + tracked PR artifacts + single-writer snapshot).
  - Planning and closure happen in the repo root checkout on `main`; the snapshot is never modified/committed on task branches.
  - Executors work in `.agent-plane/worktrees/<task-id>-<slug>/` on `task/<task-id>/<slug>`.
  - Each task uses tracked PR artifacts under `.agent-plane/tasks/<task-id>/pr/`.
  - Integration/closure is performed only by INTEGRATOR via `python .agent-plane/agentctl.py integrate` / `python .agent-plane/agentctl.py finish`.
- `status_commit_policy: "allow" | "warn" | "confirm"`: controls comment-driven/status commits. `warn` prints a warning unless `--confirm-status-commit` is passed; `confirm` blocks unless `--confirm-status-commit` is passed.
- `finish_auto_status_commit: true | false`: when true, `finish` will create a status commit using the comment body whenever `--author` and `--body` are provided (equivalent to `--status-commit`); still subject to `status_commit_policy`.
- `closure_commit_requires_approval: true | false`: controls whether agents must request explicit user approval before the final task-closing commit.

In `branch_pr`, executors leave handoff notes via `python .agent-plane/agentctl.py pr note <task-id> ...`, which appends to `.agent-plane/tasks/<task-id>/pr/review.md` (under `## Handoff Notes`), and INTEGRATOR appends them to the task record at closure.

## Base branch

By default, `agentctl` uses a pinned “base branch” as the mainline for branch/worktree creation and integration. Pinning happens automatically on first run:

- If `git config --get agentplane.baseBranch` is unset and the current branch is not a task branch, `agentctl` sets it to the current branch.
- You can override it explicitly per command via `--base`, or persistently via `.agent-plane/config.json` → `base_branch`.

Useful commands:

```bash
git config --get agentplane.baseBranch
git config --local agentplane.baseBranch <branch>
git config --unset agentplane.baseBranch
```
