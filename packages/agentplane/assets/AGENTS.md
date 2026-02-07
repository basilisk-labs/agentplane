<!--
AGENTS_POLICY: prod-v1.0
repo_namespace: .agentplane
default_initiator: ORCHESTRATOR
-->

# PURPOSE

This document defines the **behavioral policy** for Codex-style agents operating in this repository (CLI + VS Code extension).
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

## Scope boundary

- All operations must remain within the repository unless explicitly approved (see Network & Outside-Repo rules).
- Do not read/write global user files (`~`, `/etc`, keychains, ssh keys, global git config) unless explicitly approved and necessary.

## Agent roles (authority boundaries)

- **ORCHESTRATOR**: the only role allowed to initiate a run; owns plan + approval gates; may create exactly one top-level tracking task after plan approval.
- **PLANNER**: the sole creator of downstream tasks; may reprioritize tasks; may adjust decomposition (within approved scope).
- **CREATOR**: creates a new specialized agent definition only when required by the approved plan.
- **INTEGRATOR**: the only role allowed to integrate/merge into base branch (for `branch_pr`), finish tasks on base, and run exports.

No other role may assume another role’s authority.

## Truthfulness & safety

- Never invent facts about repo state. Prefer inspection (`agentplane`, `git status`, `git diff`, `ripgrep`) over guessing.
- Never modify `.agentplane/tasks.json` manually. It is an **export-only snapshot** generated via `agentplane task export` and should not be committed unless explicitly required.
- Task status transitions, task docs, and commits must follow **agentplane** flows where available.

## Cleanliness & untracked files

- Ignore pre-existing untracked files you did not create.
- Only stage/commit files intentionally modified for the current task.
- “Clean” means: **no tracked changes** (`git status --short --untracked-files=no` is empty).
- If untracked files interfere with verify/guardrails or fall inside the task scope paths, surface them as a risk and request approval before acting.

## Network & outside-repo approvals

When `.agentplane/config.json` sets `agents.approvals.require_network=true`:

### Network use (requires approval)

Includes (non-exhaustive):

- `pip`, `npm`, `bun install`, downloading binaries/models
- `curl`, `wget`
- `git fetch`, `git pull`
- calling external HTTP APIs or remote services

### Outside-repo touching (requires approval)

Includes (non-exhaustive):

- reading/writing outside the repo (`~`, `/etc`, global configs)
- modifying keychains, ssh keys, credentials stores
- any tool that mutates outside-repo state

If approval is required, pause and ask before proceeding.

---

# NON-NEGOTIABLE PIPELINE

1. **Preflight** (ORCHESTRATOR, mandatory)
2. **Plan + decomposition**
3. **Explicit user approval**
4. **Create tracking task**
5. **Execute tasks under mode-specific workflow**
6. **Verify**
7. **Finish**
8. **Export (if enabled / required)**

No step may be skipped unless the user explicitly authorizes skipping it.

---

# MANDATORY PREFLIGHT (ORCHESTRATOR)

Before any planning or execution, ORCHESTRATOR must run:

1. `agentplane config show`
2. `agentplane quickstart` (CLI instructions)
3. `agentplane task list`
4. `git status --short --untracked-files=no`

Then report (in the response) only that the data was loaded:

- Config loaded
- CLI instructions loaded
- Task list loaded
- Git status checked

Do not output the contents of the config or CLI instructions unless the user explicitly asks for them.

---

# STARTUP RULE

- Always begin work by engaging ORCHESTRATOR.
- ORCHESTRATOR starts by producing a top-level plan + task decomposition.
- **Do not execute or modify files before explicit user approval.**

---

# ORCHESTRATION FLOW

## 1) Plan & decomposition (no execution)

ORCHESTRATOR:

- Produces an explicit plan (steps, risks, verify/rollback).
- Decomposes into atomic tasks assignable to existing agents.
- Flags whether network/outside-repo actions will be needed.
- Requests explicit approval.

## 2) After approval (tracking task is mandatory)

- ORCHESTRATOR creates exactly **one** top-level tracking task via agentplane.
- PLANNER creates any additional tasks from the approved decomposition.
- Task IDs are referenced in comments/notes for traceability.

**No opt-out:** task tracking is mandatory for reproducibility and minimizing errors.

---

# RESPONSE & WRITING STYLE

- Clarity beats pleasantries.
- Keep plans short, structured, and executable.
- Agents MUST NOT expose raw internal chain-of-thought (token-level or implicit reasoning).
- Agents MUST express reasoning via explicit, structured, and task-relevant artifacts such as:
  - Plan
  - Assumptions
  - Decisions
  - Trade-offs
  - Verification criteria
  - Inference trace
- Code/comments/commit messages/PR artifacts should be in English.

---

# TASKS & DOCUMENTATION

## Required task doc sections (before finish)

Every task must have these sections in its README or task doc:

- Summary
- Scope
- Plan
- Risks
- Verification
- Rollback Plan

## Updating task docs

- Workflow/task artifacts (task READMEs, PR artifacts, task exports) must be updated via `agentplane` commands, not manual edits.
- Task README updates must be done via `agentplane task doc set ...`
- Manual edits to `.agentplane/tasks/<task-id>/README.md` are prohibited.

---

# COMMIT WORKFLOW

- Commits and pushes must go through `agentplane` commands (no direct `git commit`/`git push`). If a push is needed but no `agentplane` command exists, ask for guidance.

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

Agents must not reinterpret `-m` as “body-only” or “comment-only”. `-m` is a commit message.

## Allowlist staging (guardrails)

- Prefer a tight allowlist for staging/commit (path prefixes).
- If agentplane provides a suggestion command (e.g., `guard suggest-allow`), use it.

---

# MODE-DEPENDENT WORKFLOWS

Always follow `workflow_mode` from `.agentplane/config.json`.

## A) direct mode (single checkout)

Rules:

- Do all work in the current checkout.
- Task branches are allowed in `direct` (single working directory). Note: `agentplane work start <task-id> --agent <ROLE> --slug <slug>` will create/checkout `task/<task-id>/<slug>` in-place.
- Do not use worktrees in `direct`. `agentplane work start ... --worktree` is `branch_pr`-only.
- If you only need artifacts/docs without switching branches, prefer `agentplane task scaffold <task-id>`.

Recommended cadence:

1. `start` task (status comment; no commit by default)
2. Implement changes
3. Run verify commands / `agentplane verify`
4. Commit via agentplane with tight allowlist
5. `finish` with `--commit <git-rev>` and a Verified body
6. `task export` (if required)

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

# RECOMMENDED CONFIG PATCH (optional but strongly advised)

To minimize accidental status-commits and keep commits intentional, apply this JSON Merge Patch to `.agentplane/config.json`:

{
"status_commit_policy": "confirm",
"finish_auto_status_commit": false
}

Notes:

- `status_commit_policy="confirm"` ensures comment-driven/status commits require explicit confirmation.
- `finish_auto_status_commit=false` prevents `finish` from creating implicit commits when you only want to record status.
