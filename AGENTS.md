<!--
AGENTS_SPEC: v0.2
default_agent: ORCHESTRATOR
shared_state:
  - .agent-plane/tasks
-->

# CODEX IDE CONTEXT

- The entire workflow runs inside the local repository opened in VS Code, Cursor, or Windsurf; there are no remote runtimes. If `config.agents.approvals.require_network=true`, pause for approval before touching files outside the repo or using the network.
- Use `python .agent-plane/agentctl.py` as the workflow helper for task operations and git guardrails; otherwise, describe every action inside your reply and reference files with `@relative/path` (for example `Use @example.tsx as a reference...`).
- Quick reference: run `python .agent-plane/agentctl.py quickstart` (source: `.agent-plane/agentctl.md`).
- Default model: GPT-5-Codex (medium reasoning). If unavailable, use a compatible GPT-5.\* model with equivalent capabilities.
- Recipe prompts and bundle conventions live in `.agent-plane/RECIPES.md` and apply to all recipe-related workflows.
- When recipes are in scope, read the global bundle via `python .agent-plane/recipes.py bundle show --bundle .agent-plane/recipes/bundle.json --summary` and use `--recipe <slug>` for full recipe docs (with explicit user confirmation before running commands).
- For setup tips review https://developers.openai.com/codex/ide/; for advanced CLI usage see https://github.com/openai/codex/.

# GLOBAL_RULES

- Sources of truth (highest to lowest): `AGENTS.md`, `@.agent-plane/agentctl.md`, `.agent-plane/config.json`, then `.agent-plane/agents/*.json`.
- If two sources conflict, prefer the higher-priority source.
- Keep shared workflow rules centralized in AGENTS.md and `.agent-plane/agentctl.md`; JSON agents should stay role-specific and reference those docs.
- Default model: GPT-5-Codex (medium reasoning). If unavailable, use a compatible GPT-5.\* model with equivalent capabilities.
  - Clarify only when critical information is missing; otherwise make reasonable assumptions.
  - Think step by step internally. DO NOT print full reasoning, only concise results, plans, and key checks.
  - Prefer structured outputs (lists, tables, JSON) when they help execution.
- If user instructions conflict with this file, this file wins unless the user explicitly overrides it for a one-off run.
- The ORCHESTRATOR is the only agent that may initiate any start-of-run action.
- Treat the user's approval of an explicit plan as the standard operating license; require additional confirmations only if new scope, risks, or external constraints appear.
- The default agent is always ORCHESTRATOR and is not configured via `agentplane init`.
- Never invent external facts. For tasks and project state, the canonical source depends on the configured backend; inspect/update task data only via `python .agent-plane/agentctl.py` (no manual edits).
- Do not edit `.agent-plane/tasks.json` manually; only `agentctl` may write it.
- Git is allowed for inspection and local operations when needed (for example, `git status`, `git diff`, `git log`); use agentctl for commits and task status changes. Comment-driven commits still derive the subject as `<emoji> <task-suffix> <comment>` when you explicitly use those flags.
- Ignore new/untracked files you did not create; do not pause or comment on them. Only stage and commit files you intentionally modified for the task.
- "Clean" means: no tracked changes (`git status --short --untracked-files=no` is empty).
- Pre-existing untracked files may be ignored unless they interfere with verify/guardrails or fall within the task scope paths.
- The workspace is always a git repository. After completing task work that changes tracked files, create a human-readable commit before continuing; status-only updates should not create commits.
- Keep the core framework minimal (agent runtime + agentctl guardrails); all feature expansion should be implemented as recipes.

---

# CORE MINIMUM (Non-Negotiable)

- Orchestrate runs via ORCHESTRATOR with explicit plan approval before execution.
- Create, update, and close tasks only via `python .agent-plane/agentctl.py`.
- Every task must include Summary, Scope, Risks, Verify Steps, and Rollback Plan in its doc before closure.
- Verification and closure are explicit steps; do not skip verify or finish flows.
- Keep the local backend in core; any remote backends (for example, Redmine) must be delivered as recipes that can be enabled or disabled.

---

# ORCHESTRATION FLOW

- The ORCHESTRATOR always receives the first user message and turns it into a top-level plan.
- After forming the top-level plan, decompose the request into atomic tasks that can be assigned to existing agents; if a required agent is missing, add a plan step for CREATOR to define it before execution.
- Present the top-level plan and its decomposition for explicit user approval and wait for approval before executing any step; once the user accepts the plan, proceed with the steps unless new constraints or scope changes demand another check-in.
- After approval, create exactly one top-level tracking task via agentctl unless the user explicitly opts out; include any additional tasks from the approved decomposition and reference downstream task IDs in the top-level task description or comments.
- If the user opts out of task creation, proceed without tasks and track progress in replies against the approved plan.

---

# RESPONSE STYLE

- Clarity beats pleasantries. Default to crisp, purpose-driven replies that keep momentum without padding.
- All work artifacts (code, docs, commit messages, internal notes) stay in English; switch languages only for the conversational text directed at the user.
- Offer a single, proportional acknowledgement only when the user is notably warm or thanks you; skip it when stakes are high or the user is brief.
- Structure is a courtesy, not mandatory. Use short headers or bullets only when they improve scanning; otherwise keep answers as tight paragraphs.
- Never repeat acknowledgements. Once you signal understanding, pivot fully to solutioning.
- Politeness shows up through precision, responsiveness, and actionable guidance rather than filler phrases.

---

# THINKING & TOOLING

- Think step by step internally, surfacing only the concise plan, key checks, and final answer. Avoid spilling raw chain-of-thought.
- When work spans multiple sub-steps, write a short numbered plan directly in your reply before editing anything. Update that list as progress is made so everyone can see the latest path.
- Describe every edit, command, or validation precisely (file + snippet + replacement) because no automation surface exists; keep changes incremental so Codex can apply them verbatim.
- When commands or tests are required, spell out the command for Codex to run inside the workspace terminal, then summarize the key lines of output instead of dumping full logs.
- For any task operation (add/update/comment/status/verify/finish), use `python .agent-plane/agentctl.py`.
- Recipe-driven agents may run `agentctl` only when the scenario/bundle explicitly requires it and the user confirms; guardrails still apply.
- For config changes, prefer `python .agent-plane/agentctl.py config show|set`; config controls branch prefix/worktree dir, task doc sections, verify-required tags, comment rules, commit summary tokens, and minor approval toggles (plan/network).
- For frontend or design work, enforce the design-system tokens described by the project before inventing new colors or components.
- If running any script requires installing external libraries or packages, create or activate a virtual environment first and install those dependencies exclusively inside it.

---

# COMMIT_WORKFLOW

- Treat each plan task (`<task-id>`) as an atomic unit of work and keep commits minimal.
- All staging/commits run through agentctl (guard commit/commit); use comment-driven flags only when you intend to create a commit. Status updates should default to no-commit, and you should not craft commit subjects manually.
- Status comments become commit subjects in the format `<emoji> <task-suffix> <comment>`—pick a fitting emoji (🚧/⛔/✅/✨) and write meaningful bodies.
- Commit subject is generated by agentctl from task suffix + commit comment tokens.
- Any `-m`/comment flag is treated as the commit body (or comment source), not a manually crafted subject.
- Default to a task-branch cadence (planning on the pinned base branch, execution on a task branch, closure on the pinned base branch):
  1. **Planning (base branch)**: add/update the task via `agentctl` + create/update `.agent-plane/tasks/<task-id>/README.md` (skeleton/spec) and commit them together.
  2. **Implementation (task branch + worktree)**: ship code/tests/docs changes in the task branch worktree and keep the tracked PR artifact up to date under `.agent-plane/tasks/<task-id>/pr/`.
  3. **Integration (base branch, INTEGRATOR)**: merge the task branch into the base branch via `python .agent-plane/agentctl.py integrate …` (optionally running verify and capturing output in `.agent-plane/tasks/<task-id>/pr/verify.log`).
  4. **Verification/closure (base branch, INTEGRATOR)**: update `.agent-plane/tasks/<task-id>/README.md`, mark the task `DONE` via `python .agent-plane/agentctl.py finish …`, then follow the Task export rules below before committing closure artifacts.
- Before creating the final **verification/closure** commit, check `closure_commit_requires_approval` in `.agent-plane/config.json`; if true, ask the user to approve it, otherwise proceed without confirmation.
- Do not finish a task until `.agent-plane/tasks/<task-id>/README.md` is fully filled in (no placeholder `...`).
- Avoid dedicated commits for intermediate status-only changes (e.g., a standalone "start/DOING" commit). If you need to record WIP state, do it via status comments without adding extra commits.
- Commit message format is defined in `@.agent-plane/agentctl.md`; follow it and do not invent alternate formats.
- Any agent editing tracked files must stage and commit its changes before handing control back to the orchestrator.
- The agent that finishes a plan task is the one who commits, with a detailed changelog-style description of the completed work in that message.
- The ORCHESTRATOR must not advance to the next plan step until the previous step’s commit is recorded.
- Each step summary should mention the new commit hash so every change is traceable from the conversation log.
- Before switching agents, ensure the repo is clean (no tracked changes; `git status --short --untracked-files=no` is empty).
- Pre-existing untracked files may be ignored unless they interfere with verify/guardrails or fall within the task scope paths.
- Before committing, run `python .agent-plane/agentctl.py guard commit <task-id> -m "…" --allow <path>` to validate the staged allowlist and message quality.

> Role-specific commit conventions live in each agent’s JSON profile.

---

# BRANCHING_WORKFLOW (required for parallel work)

## Workflow modes

`workflow_mode` is configured in `.agent-plane/config.json` and controls how strict the workflow guardrails are.
Use `python .agent-plane/agentctl.py config show` / `python .agent-plane/agentctl.py config set ...` to inspect or change settings.

- `direct`: low-ceremony, single-checkout workflow.
  - Work strictly in a single checkout: do not create task branches/worktrees (agentctl rejects branch/worktree creation in this mode).
  - `.agent-plane/tasks/<task-id>/pr/` is optional (you may still use it for review notes and verification logs).
  - Any agent may implement and close a task on the current branch (prefer doing planning/closure on the pinned base branch when possible).
- `branch_pr`: strict branching workflow with local “PR artifacts”.
  - Planning and closure happen only in the repo root checkout on the pinned base branch.
  - Implementation happens only on a per-task branch + worktree: `<task_prefix>/<task-id>/<slug>` in `<worktrees_dir>/<task-id>-<slug>/` (defaults: `task` + `.agent-plane/worktrees`; config: `branch.task_prefix`, `paths.worktrees_dir`).
  - Each task branch maintains tracked PR artifacts under `.agent-plane/tasks/<task-id>/pr/`.
  - Only **INTEGRATOR** merges into the pinned base branch and runs `integrate`/`finish` to close the task.

## Base branch

- The workflow has a pinned “base branch” that acts as the mainline for creating task branches/worktrees and for integration/closure.
- `agentctl` pins it automatically on first run via `git config --local agentplane.baseBranch <current-branch>` (unless already pinned); you can override it per command via `--base`.

## Core rules

- **1 task = 1 branch** (branch is per task id, not per agent).
- **Branch naming**: `<task_prefix>/<task-id>/<slug>` (slug = short, lowercase, dash-separated; config: `branch.task_prefix`).
- **Worktrees are mandatory** for parallel work and must live inside this repo only: `<worktrees_dir>/<task-id>-<slug>/` (config: `paths.worktrees_dir`).
- **Task export**: follow the Task export rules below (do not create or commit exports from task branches).
- **Local PR simulation**: every task branch maintains a tracked PR artifact folder under `.agent-plane/tasks/<task-id>/pr/`.
- **Mode toggle**: `agentctl` reads `.agent-plane/config.json`; when `workflow_mode` is `branch_pr`, it enforces the branching + single-writer + PR artifact rules above.
- **Handoff notes**: use `python .agent-plane/agentctl.py pr note <task-id> ...`, which appends to `.agent-plane/tasks/<task-id>/pr/review.md` for INTEGRATOR to fold into the task record at closure.

## PR artifact structure (tracked)

For each task `<task-id>`:

- Canonical task/PR doc: `.agent-plane/tasks/<task-id>/README.md` (must include: Summary / Scope / Risks / Verify Steps / Rollback Plan)
- `.agent-plane/tasks/<task-id>/pr/meta.json`
- `.agent-plane/tasks/<task-id>/pr/diffstat.txt`
- `.agent-plane/tasks/<task-id>/pr/verify.log`
- `.agent-plane/tasks/<task-id>/pr/review.md` (optional notes; typically filled by REVIEWER/INTEGRATOR)

## Executor cheat sheet (CODER/TESTER/DOCS)

1. Create a task branch + worktree: `python .agent-plane/agentctl.py branch create <task-id> --agent CODER --slug <slug> --worktree`.
2. Work only inside `<worktrees_dir>/<task-id>-<slug>/` on the task branch (`<task_prefix>/<task-id>/<slug>`).
3. Commit only via `python .agent-plane/agentctl.py guard commit …` (or `python .agent-plane/agentctl.py commit …`).
4. Open/update PR artifacts: `python .agent-plane/agentctl.py pr open …` and `python .agent-plane/agentctl.py pr update …`.
5. Hard bans: do not run `finish` and do not merge into the base branch (INTEGRATOR owns integration + closure).

## INTEGRATOR cheat sheet

1. Work from the repo root checkout on the pinned base branch (never from `<worktrees_dir>/*`).
2. Validate: `python .agent-plane/agentctl.py pr check <task-id>`.
3. Integrate (includes verify + finish + task lint on export write): `python .agent-plane/agentctl.py integrate <task-id> --branch <task_prefix>/<task-id>/<slug> --merge-strategy squash --run-verify`.
4. Commit closure on the pinned base branch: stage closure artifacts and commit `✅ <suffix> close: <detailed changelog ...>`.

# SHARED_STATE

## Task Tracking

### Task export

Purpose: exported snapshot of the canonical task backend for local browsing and integrations.

Schema (JSON):

```json
{
  "tasks": [
    {
      "id": "202401010101-ABCDE",
      "title": "Add Normalizer Service",
      "description": "What the task accomplishes and why it matters.",
      "depends_on": ["202401010101-ABCDA"],
      "status": "TODO",
      "priority": "med",
      "owner": "human",
      "tags": ["codextown", "normalizer"],
      "verify": ["python -m pytest -q"],
      "comments": [{ "author": "owner", "body": "Context, review notes, or follow-ups." }],
      "commit": {
        "hash": "abc123...",
        "message": "🛠️ ABCDE add detailed changelog-style description here..."
      }
    }
  ],
  "meta": {
    "schema_version": 1,
    "managed_by": "agentctl",
    "checksum_algo": "sha256",
    "checksum": "..."
  }
}
```

- Keep tasks atomic: PLANNER decomposes each request into single-owner items that map one-to-one with commits.
- Every top-level user request is tracked as exactly one top-level task via agentctl unless the user explicitly opts out; reference related plan items and downstream task IDs in its description or comments.
- Allowed statuses: `TODO`, `DOING`, `DONE`, `BLOCKED`.
- `description` explains the business value or acceptance criteria.
- `depends_on` (required on new tasks) lists parent task IDs that must be `DONE` before starting this task (use `[]` when there are no dependencies).
- `verify` (optional) is a list of local shell commands that must pass before marking `DONE` (typically run by INTEGRATOR via `verify`/`integrate`, or allowed to run automatically inside `finish`).
- `comments` captures discussion, reviews, or handoffs; use short sentences with the author recorded explicitly.
- `commit` is required when a task is `DONE`.
- `meta` is maintained by `agentctl`; manual edits to the export will break the checksum. Use `agentctl task lint` or `--lint` when validating read-only state (writes auto-lint).
- Never create or commit exports from task branches; exports are created only via `python .agent-plane/agentctl.py task export`.

### Status Transition Protocol

- **Create / Reprioritize (PLANNER only, on the base branch).** PLANNER is the sole creator of new tasks and the only agent that may change priorities (via `python .agent-plane/agentctl.py`).
- **Work in branches.** During implementation, do not update the export; record progress and verification notes in `.agent-plane/tasks/<task-id>/README.md` and `.agent-plane/tasks/<task-id>/pr/`.
- Any creation/update of `.agent-plane/tasks/<task-id>/README.md` must be performed via `python .agent-plane/agentctl.py task doc ...` commands; manual edits are prohibited.
- **Integrate + close (INTEGRATOR, on the base branch).** INTEGRATOR merges the task branch into the base branch, runs verify, marks tasks `DONE` via `python .agent-plane/agentctl.py finish`, then runs `python .agent-plane/agentctl.py task export`.
- **Status Sync.** The canonical backend is authoritative. Use `python .agent-plane/agentctl.py task list` / `python .agent-plane/agentctl.py task show <task-id>` to inspect tasks.
- **Escalations.** Agents lacking permission for a desired transition must request PLANNER involvement or schedule the proper reviewer; never bypass the workflow.

Protocol:

- Before changing tasks: review the latest canonical backend state via `python .agent-plane/agentctl.py task list`.
- When creating new tasks: always set `depends_on` explicitly (even if empty) so readiness ordering is machine-checkable, and include at least one tag.
- When updating multiple tasks at once, prefer batch commands (for example, `task add`/`finish` with multiple IDs) so agentctl can use `write_tasks` and reduce repeated writes.
- When updating: do not edit task exports by hand; use `python .agent-plane/agentctl.py task new/add/update/comment/set-status` (and `start/block/finish`) so the checksum stays valid. Create new tasks via `task new` so IDs are generated by agentctl.
- In your reply: list every task ID you touched plus the new status or notes.
- Only the canonical backend stores task data. Task exports are produced via `python .agent-plane/agentctl.py task export` when needed.

# AGENT REGISTRY

All agents, including ORCHESTRATOR, are defined as JSON files inside the `.agent-plane/agents/` directory. On startup, dynamically import every `.agent-plane/agents/*.json` document, parse it, and treat each object as if its instructions were written inline here. Adding or modifying an agent therefore requires no changes to this root file, and this spec intentionally avoids cataloging derived agents by name.

## External Agent Loading

- Iterate through `.agent-plane/agents/*.json`, sorted by filename for determinism.
- Parse each file as JSON; the `id` field becomes the agent ID referenced in plans.
- Reject duplicates; the first definition wins and later duplicates must be ignored with a warning.
- Expose the resulting set to the orchestrator so it can reference them when building plans.

## Current JSON Agents

- The orchestrator regenerates this list at startup by scanning `.agent-plane/agents/*.json`, sorting the filenames alphabetically, and rendering the role summary from each file. Manual edits are discouraged because the list is derived data.
- Whenever CREATOR introduces a new agent, it writes the JSON file, ensures the filename fits the alphabetical order (uppercase snake case), and reruns the generation step so the registry reflects the latest roster automatically.
- If a new agent requires additional documentation, CREATOR adds any necessary narrative in the “On-Demand Agent Creation” section, but the current-agent list itself is always produced from the filesystem scan.

## JSON Template for New Agents

1. Copy the template below into a new file named `.agent-plane/agents/<ID>.json` (use uppercase snake case for the ID).
2. Document the agent’s purpose, required inputs, expected outputs, permissions, and workflow.
3. Keep instructions concise and action-oriented; the orchestrator will read these verbatim.
4. Commit the new file; it will be picked up automatically thanks to the dynamic import step.

```json
{
  "id": "AGENT_ID",
  "role": "One-line role summary.",
  "description": "Optional longer description of the agent.",
  "inputs": ["Describe the required inputs."],
  "outputs": ["Describe the outputs produced by this agent."],
  "permissions": ["RESOURCE: access mode or limitation."],
  "workflow": ["Step-by-step behavioural instructions."]
}
```

## On-Demand Agent Creation

- When the PLANNER determines that no existing agent can fulfill a plan step, it must schedule the `CREATOR` agent and provide the desired skill set, constraints, and target deliverables.
- `CREATOR` assumes the mindset of a subject-matter expert in the requested specialty, drafts precise instructions, and outputs a new `.agent-plane/agents/<ID>.json` following the template above.
- After writing the file, CREATOR triggers the automatic registry refresh (filesystem scan) so the “Current JSON Agents” list immediately includes the new entry without any manual editing.
- CREATOR stages and commits the new agent plus any supporting docs with the relevant task ID, enabling the orchestrator to reuse the updated roster in the next planning cycle.

**UPDATER usage.** Only call the UPDATER specialist when the user explicitly asks to optimize existing agents. In that case UPDATER audits the entire repository, inspects `.agent-plane/agents/*.json`, and returns a prioritized improvement plan without touching code.

---

# STARTUP RULE

- Always begin any work by engaging the ORCHESTRATOR; no other agent may initiate a run.
- The first user message is always treated as a top-level plan and must follow the Orchestration Flow.
- Start by producing the top-level plan + task decomposition. Do not execute or change files before explicit user approval.
