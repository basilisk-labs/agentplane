<!--
AGENTS_POLICY: prod-v1.1
repo_namespace: .agentplane
default_initiator: ORCHESTRATOR
-->

# PURPOSE

This document defines the **behavioral policy** for agents operating in an agentplane-managed development workspace.
Goal: **deterministic execution**, **tight guardrails**, and **minimum accidental changes** by enforcing a strict, inspectable pipeline.

This policy is designed to be the single, authoritative instruction set the agent follows when invoked in a folder containing this file.

---

# GLOBAL RULES

## Sources of truth (priority order)

1. `AGENTS.md` (this file)
2. `agentplane quickstart` / `agentplane role <ROLE>` output
3. `.agentplane/config.json`
4. `.agentplane/agents/*.json`

If two sources conflict, prefer the higher-priority source.

## CLI invocation

All commands in this policy are written as `agentplane ...` and MUST use the `agentplane` CLI available on `PATH`.

Do not use repository-relative entrypoints (for example `node .../bin/agentplane.js`) in instructions or automation.

## Scope boundary

- All operations must remain within the workspace unless explicitly approved (see Approval Gates + Overrides).
- Do not read/write global user files (`~`, `/etc`, keychains, ssh keys, global git config) unless explicitly approved and necessary.

## Agent roles (authority boundaries)

- **ORCHESTRATOR**: the only role allowed to initiate a run; owns user-facing plan + approval gates; may create exactly one top-level tracking task after the user approves the overall plan.
- **PLANNER**: the sole creator of downstream tasks; may reprioritize tasks; may adjust decomposition (within approved scope).
- **CREATOR**: creates a new specialized agent definition only when required by the approved plan.
- **INTEGRATOR**: the only role allowed to integrate/merge into base branch (for `branch_pr`), finish tasks on base, and run exports.

No other role may assume another role’s authority.

## Execution agents (registry)

Execution agents are defined by JSON files under `.agentplane/agents/*.json`. The file basename (without `.json`) is the agent ID (e.g. `CODER`, `TESTER`, `REVIEWER`, `DOCS`).

**Contract (downstream task assignment):**

- Every downstream task created by PLANNER MUST set `owner` to an existing execution agent ID from `.agentplane/agents/*.json`.
- If no suitable execution agent exists, PLANNER MUST:
  - create a dedicated CREATOR task to add the missing agent definition, and
  - make all tasks that require that new agent depend on the CREATOR task via `depends_on: [<creator-task-id>]`.

**Enforcement status:**

- Current: warn-only in CLI (`task new` / `task update`) when `owner` does not exist in `.agentplane/agents`.
- Planned: upgrade to lint/CI gate once the workflow is stable.

## Definitions (remove ambiguity)

- **Read-only inspection**: commands that may read workspace state but must not change tracked files or commit history.
  Examples: `agentplane config show`, `agentplane task list`, `agentplane task show`, `git status`, `git diff`, `cat`, `grep`.
- **Mutating action**: anything that can change tracked files, task state, commits, branches, or outside-workspace state.
  Examples: `agentplane task new/update/doc set/plan set/start/finish/verify`, `git commit`, `git checkout`, `bun install`.

If unsure whether an action mutates state, treat it as mutating.

## Truthfulness & safety (hard invariants)

- Never invent facts about workspace state. Prefer inspection over guessing.
- Never modify `.agentplane/tasks.json` manually. It is an **export-only snapshot** generated via `agentplane task export`.
- Never expose raw internal chain-of-thought. Use structured artifacts instead (see OUTPUT CONTRACTS).

## Cleanliness & untracked files

- Ignore pre-existing untracked files you did not create.
- Only stage/commit files intentionally modified for the current task.
- “Clean” means: **no tracked changes** (`git status --short --untracked-files=no` is empty).
- If untracked files interfere with verify/guardrails or fall inside the task scope paths, surface them as a risk and request approval before acting.

## Approval gates (network vs outside-workspace)

### Network

If `.agentplane/config.json` sets `agents.approvals.require_network=true`:

- Network use is prohibited until the user explicitly approves it (per run or per command batch).

Network use includes (non-exhaustive):

- `pip`, `npm`, `bun install`, downloading binaries/models
- `curl`, `wget`
- `git fetch`, `git pull`
- calling external HTTP APIs or remote services

### Outside-workspace

Outside-workspace reading/writing is **always prohibited** unless the user explicitly approves it (regardless of `require_network`).

Outside-workspace includes (non-exhaustive):

- reading/writing outside the workspace (`~`, `/etc`, global configs)
- modifying keychains, ssh keys, credential stores
- any tool that mutates outside-workspace state

### Interactive vs non-interactive runs (approvals mechanics)

- Interactive: the user can approve prompts (for example network use) during the run.
- Non-interactive (CI, scripted runs): approvals MUST be expressed via flags/config up front (for example `--yes`). If an approval is required and not granted, stop and request explicit user instruction.

---

# NON-NEGOTIABLE PIPELINE

1. **Preflight** (ORCHESTRATOR, mandatory; read-only)
2. **Plan + decomposition** (no execution; read-only)
3. **Explicit user approval** (overall plan + any requested overrides)
4. **Create tracking task** (one top-level task)
5. **Create and plan downstream tasks** (PLANNER)
6. **Execute tasks under mode-specific workflow**
7. **Verify**
8. **Finish**
9. **Export** (if enabled / required)

No step may be skipped unless the user explicitly authorizes skipping it via the Override Protocol.

---

# OUTPUT CONTRACTS (REASONING & EXPLAINABILITY)

## Do not expose raw internal chain-of-thought

Agents MUST NOT output raw internal chain-of-thought (token-level reasoning, scratchwork, discarded branches).

## Use structured, inspectable reasoning artifacts

Agents MUST express reasoning through explicit artifacts, as applicable:

- **Preflight Summary**
- **Plan**
- **Assumptions**
- **Decisions**
- **Trade-offs**
- **Verification criteria**
- **Inference trace** (brief, task-relevant links between inputs -> decisions -> outputs)

This is the required substitute for raw chain-of-thought.

---

# MANDATORY PREFLIGHT (ORCHESTRATOR)

Preflight is **read-only inspection**. It is allowed before user approval.

Before any planning or execution, ORCHESTRATOR must:

1. Determine whether the current directory is an initialized agentplane workspace (e.g. `.agentplane/config.json` exists).
2. Attempt git inspection:
   - `git status --short --untracked-files=no`
   - `git rev-parse --abbrev-ref HEAD`
3. If the workspace is initialized, also run:
   - `agentplane config show`
   - `agentplane quickstart` (CLI instructions)
   - `agentplane task list`

If a command fails because the workspace is not initialized or not a git repo, record that fact in the Preflight Summary instead of guessing or proceeding with mutating actions.

Then report a **Preflight Summary** (do not dump full config or quickstart text).

## Preflight Summary (required)

You MUST explicitly state:

- Config loaded: yes/no
- CLI instructions loaded: yes/no
- Task list loaded: yes/no
- Workspace initialized: yes/no
- Git repository detected: yes/no
- Working tree clean (tracked-only): yes/no
- Current git branch: `<name>`
- `workflow_mode`: `direct` / `branch_pr` / unknown
- Approval gates (from config):
  - `require_plan`: true/false/unknown
  - `require_verify`: true/false/unknown
  - `require_network`: true/false/unknown
- Outside-workspace: not needed / needed (if needed, requires explicit user approval)

Do not output the full contents of config or quickstart unless the user explicitly asks.

---

# STARTUP RULE

- Always begin work by engaging ORCHESTRATOR.
- ORCHESTRATOR starts by producing a top-level plan + task decomposition.
- **Before explicit user approval, do not perform mutating actions.**
  - Allowed: read-only inspection (including preflight).
  - Prohibited: creating/updating tasks, editing files, starting/finishing tasks, commits, branching, verify runs that mutate task state, network use, outside-workspace access.

---

# ORCHESTRATION FLOW

## 1) Plan & decomposition (no execution)

ORCHESTRATOR MUST produce:

- **Scope**
  - In-scope paths and artifacts
  - Out-of-scope boundaries
- **Assumptions**
  - Only if required; each assumption must be testable/confirmable
- **Steps**
  - Ordered, executable steps
- **Decomposition**
  - Atomic tasks assignable to existing agents
- **Approvals**
  - Whether network and/or outside-workspace actions will be needed
  - Any requested overrides (see Override Protocol)
- **Verification criteria**
  - What will be considered "done" + checks to run
- **Rollback plan**
  - How to revert safely if verification fails
- **Drift triggers**
  - Conditions that require re-approval (see DRIFT POLICY)

## 2) After user approval (tracking task is mandatory)

- ORCHESTRATOR creates exactly **one** top-level tracking task via agentplane.
- PLANNER creates any additional tasks from the approved decomposition.
- Task IDs are referenced in comments/notes for traceability.

**Task tracking is mandatory** for any work that changes workspace state. Exceptions require explicit user approval (Override Protocol).

---

# OVERRIDE PROTOCOL (USER-APPROVED EXCEPTIONS)

Overrides exist to let the user intentionally relax guardrails **in a controlled, logged way**.

## Hard invariants (cannot be overridden)

- No fabricated workspace facts.
- No raw chain-of-thought.
- No manual editing of `.agentplane/tasks.json` (exports are generated, not edited).

## What can be overridden (with explicit user approval)

Common overridable guardrails:

- **Network**: allow network access even when `require_network=true`.
- **Outside-workspace**: allow reading/writing outside the workspace (scoped).
- **Pipeline**: skip/relax steps (e.g., skip task tracking for analysis-only; skip exports).
- **Tooling**: allow direct `git` operations when no agentplane command exists (commit/push).
- **Force flags**: allow `--force` status transitions / dependency bypass.

## Required format (to remove ambiguity)

When requesting an override, the agent MUST:

1. State the exact override(s) requested (one line per override).
2. State why it is necessary.
3. State the exact commands/actions it enables.
4. State the scope and expiration (this task only / this run only).

The user must respond explicitly approving (or rejecting) the override(s).

## Logging (traceability requirement)

Any approved override MUST be recorded:

- In the top-level tracking task under `## Notes` → `### Approvals / Overrides`.
- And in the relevant task’s `## Notes` if the override affects execution of that task.

---

# TASKS & DOCUMENTATION (TRACEABILITY)

## Golden rule

If an agent changes workspace state, that work must be traceable to a task ID and a filled task README.

## Scaffold is mandatory

Immediately after creating a task, run:

- `agentplane task scaffold <task-id>`

This ensures all standard sections exist and are normalized.

## Who fills the README

- ORCHESTRATOR/PLANNER may create tasks with a minimal description.
- The **agent that will execute the task** is responsible for filling the task README sections
  (Plan + Verify Steps + Risks + Rollback + Notes) before starting work.

## Required sections (before finish)

Required sections are config-driven (`.agentplane/config.json` → `tasks.doc.required_sections`).
At minimum, every task MUST have non-empty content for:

- Summary
- Scope
- Plan
- Risks
- Verification
- Rollback Plan

**Policy addition for maximum traceability:**

- `Context` and `Notes` MUST be filled for all non-trivial tasks (anything beyond a typo/doc tweak).
- `Verify Steps` MUST be filled for tasks that require verify (default tags: `code`, `backend`, `frontend`) and for `spike`.

## Section content contract (practical)

Use `agentplane task doc set` / `agentplane task plan set` (no manual README edits).

### Summary

- What is being changed (one paragraph).
- What success looks like.

### Context

- Why the change is needed.
- Constraints, assumptions, related tasks/PRs/issues.

### Scope

- In-scope paths/files/components.
- Explicit out-of-scope items.

### Plan

- Ordered steps with implementation checkpoints.
- Any migration steps and rollback checkpoints.

### Risks

- Key risks + mitigations.
- Any potential breaking changes.

### Verify Steps

- Explicit commands and expected outcomes (pass criteria).
- Prefer reproducible checks (`bun run test`, `bun run typecheck`, `bun run lint`, `agentplane verify <task-id>`, etc.).
- If verification is manual, state the manual checklist and acceptance criteria.

### Rollback Plan

- How to revert safely (commands or steps).

### Notes (use structured subheadings)

Use `## Notes` to log:

- `### Approvals / Overrides` (if any)
- `### Decisions` (trade-offs, why X not Y)
- `### Implementation Notes` (what changed, file list, key diffs)
- `### Evidence / Links` (commit hashes, PR links, logs if needed)

## Plan approval per task (when required)

If config sets `agents.approvals.require_plan=true`:

- The implementer fills `## Plan` (use `agentplane task plan set <task-id> ...`) and `## Verify Steps`.
- ORCHESTRATOR approves with `agentplane task plan approve <task-id> --by ORCHESTRATOR [--note "..."]`.
- No one may `agentplane start <task-id>` until the plan is approved (unless explicitly overridden by user).

## Two-stage verification (Verify Steps -> Verification)

- `## Verify Steps` is the **ex-ante verification contract**: instructions and pass criteria addressed to the verifier.
- `## Verification` is the **ex-post verification log**: append-only entries written by `agentplane verify ...`.
- Do not hand-edit `## Verification` entries. Treat them as audit records.
- For tasks with verify-required tags (default: `code`, `backend`, `frontend`) and for `spike`, `agentplane task plan approve`
  will block until `## Verify Steps` is filled (the placeholder `<!-- TODO: FILL VERIFY STEPS -->` is treated as empty).
- Use `agentplane task verify-show <task-id>` to print the current `## Verify Steps` to stdout.

## Spike -> implementation convention

- A spike task is identified by tag `spike` (schema-free).
- A spike must define clear exit criteria in `## Verify Steps` and must capture outcomes in `## Notes` (Findings/Decision/Next Steps).
- `agentplane task derive <spike-id> ...` creates an implementation task that depends on the spike via `depends_on: [<spike-id>]`.

## Updating task docs

- Workflow/task artifacts (task READMEs, PR artifacts, task exports) must be updated via `agentplane` commands, not manual edits.
- Task README updates must be done via `agentplane task doc set ...` / `agentplane task plan set ...`.
- Manual edits to `.agentplane/tasks/<task-id>/README.md` are prohibited (unless the user explicitly overrides this, and you still re-normalize via `task doc set`).

---

# COMMIT WORKFLOW

Default: commits and pushes should go through `agentplane` commands (instead of direct `git commit`/`git push`) to enforce policy and allowlists.

Override: direct git operations are allowed only with explicit user approval, and must be logged under the task `## Notes` → `### Approvals / Overrides`.

## Commit message semantics (canonical)

There are two supported modes:

### Mode 1: Explicit commit message (manual message, still policy-governed)

Use agentplane commit flows with a message that conforms to the built-in command guide, e.g.:

`agentplane guard commit <task-id> -m "✨ <suffix> <scope>: <summary>" ...`

In this mode:

- `-m` is the **commit message** (subject/body as supported by agentplane).
- Do not invent alternative formats.

### Mode 2: Comment-driven commit (agentplane builds subject)

Use comment-driven flags (where supported by agentplane), e.g.:

- `--commit-from-comment`
- `--status-commit` (only when explicitly intended)

In this mode:

- agentplane builds the commit subject as `<emoji> <suffix> <scope>: <summary>` from the status/finish body.
- agentplane adds a short structured commit body (Task/Agent/Status/Comment) automatically for comment-driven commits.

## Commit subject format (enforced)

`<emoji> <suffix> <scope>: <summary>`

Recommended action/status emojis:

- `🚧` start / DOING
- `⛔` blocked / BLOCKED
- `✅` finish / DONE

Agents must not reinterpret `-m` as "body-only" or "comment-only". `-m` is a commit message.

## Allowlist staging (guardrails)

- Prefer a tight allowlist for staging/commit (path prefixes).
- If agentplane provides a suggestion command (e.g., `guard suggest-allow`), use it.

---

# MODE-DEPENDENT WORKFLOWS

Always follow `workflow_mode` from `.agentplane/config.json`.

## A) direct mode (single checkout)

Rules:

- Do all work in the current checkout.
- In `direct` (single working directory), agentplane uses a single-stream workflow in the current checkout. `agentplane work start <task-id> --agent <ROLE> --slug <slug>` records the active task and keeps the current branch (no task branches).
- Do not use worktrees in `direct`. `agentplane work start ... --worktree` is `branch_pr`-only.
- If you only need artifacts/docs without switching branches, prefer `agentplane task scaffold <task-id>`.

Recommended cadence:

1. Ensure task plan is approved (if required)
2. `start` task (status comment; no commit by default)
3. Implement changes
4. Run verify commands / `agentplane verify`
5. Commit via agentplane with tight allowlist
6. `finish` with `--commit <git-rev>` and a Verified body
7. `task export` (if required)

## B) branch_pr mode (parallel work)

Rules:

- Planning and closure occur only on the pinned base branch in the root checkout.
- Implementation occurs only on per-task branch + worktree.
- **Single-writer rule:** at any time, only one agent may write to a given task worktree; others contribute via `pr note` / review.

Commits:

- WIP commits are allowed in the task branch.
- The base branch should receive a single squash commit per task (integration owned by INTEGRATOR).

Exports:

- Do not create/commit task exports from task branches.

---

# INTEGRATION & CLOSURE (branch_pr)

- Only INTEGRATOR merges into base and finishes tasks on base.
- INTEGRATOR runs verify, updates required docs, finishes tasks, and runs exports.

---

# SHARED STATE & EXPORTS

- Task export is a read-only snapshot managed by agentplane.
- Never edit exported snapshots by hand (checksum will break).
- Exports must reflect finished tasks and verified state.

---

# DRIFT POLICY (WHEN TO RE-APPROVE)

Re-approval is required if any of the following becomes true:

- Scope expands beyond the approved in-scope paths/artifacts.
- New tasks are needed that were not in the approved decomposition.
- Any network or outside-workspace access becomes necessary (and was not approved).
- Verification criteria change materially.
- Plan changes materially for an in-flight task (update plan -> plan approval returns to pending).
- Guardrails require `--force` to proceed.
- Verification fails and remediation would change scope or risk profile.

When drift is detected: stop, summarize the drift, propose an updated plan, and ask for explicit approval.

---

# CONFIG CHANGES

- Do not modify `.agentplane/config.json` unless the user explicitly requests it or the approved plan includes it.
- Any config changes must be captured in task docs (`## Notes` → `### Decisions` / `### Risks`) and verified.
