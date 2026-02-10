---
id: "202602101802-YQR0RR"
title: "Docs user: workflow and task lifecycle"
result_summary: "Workflow docs match current direct/branch_pr semantics and sources-of-truth ordering."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602101802-FD39FA"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "4f58abd9a265248e27f70aaa73e32d0a562c7621"
  message: "📝 YQR0RR docs: align workflow docs"
comments:
  -
    author: "DOCS"
    body: "Start: Update workflow/task lifecycle/agents/branch_pr docs to match current direct/branch_pr behavior and command semantics."
  -
    author: "DOCS"
    body: "Verified: Updated workflow docs to reflect direct-mode single-stream behavior and made export an explicit optional action."
events:
  -
    type: "status"
    at: "2026-02-10T18:20:47.190Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Update workflow/task lifecycle/agents/branch_pr docs to match current direct/branch_pr behavior and command semantics."
  -
    type: "status"
    at: "2026-02-10T18:23:18.245Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Updated workflow docs to reflect direct-mode single-stream behavior and made export an explicit optional action."
doc_version: 2
doc_updated_at: "2026-02-10T18:23:18.245Z"
doc_updated_by: "DOCS"
description: "Update workflow/task lifecycle/agents/branch_pr artifacts docs to match current direct and branch_pr behavior and command semantics."
id_source: "generated"
---
## Summary


## Scope

In-scope: docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/agents.mdx, docs/user/branching-and-pr-artifacts.mdx. Out-of-scope: commands reference regeneration (handled by later docs tasks).

## Plan

1. Update direct-mode wording to reflect single-stream lock behavior (no per-task branches by default).\n2. Make export step explicit/optional via .agentplane/tasks.json.\n3. Add a concise sources-of-truth note to Agents docs.

## Risks

Risk: subtle workflow drift causes users to apply the wrong mental model (implicit export, branch creation in direct mode). Mitigation: cross-check against Usage:
  agentplane help [<cmd...>] [--compact] [--json]

Commands:
  Backend:
    backend  Backend-related operations.
    backend sync  Sync the configured backend (push or pull).
    sync  Sync the configured backend (alias).
  Branch:
    branch base  Manage the pinned base branch used in branch_pr workflow.
    branch base clear  Clear the pinned base branch.
    branch base explain  Explain current, pinned, and effective base branch resolution.
    branch base get  Print the pinned base branch.
    branch base set  Pin a base branch by name, or pin the current branch.
    branch remove  Remove a task branch and/or its worktree.
    branch status  Show ahead/behind status for a branch relative to a base branch.
    cleanup  Clean up local branches/worktrees.
    cleanup merged  Delete merged task branches/worktrees (branch_pr workflow).
  Config:
    config set  Update project config (dotted keys).
    config show  Print resolved config JSON.
    mode get  Print workflow mode.
    mode set  Set workflow mode.
  Core:
    agents  List agent definitions under .agentplane/agents.
    help  Show help for a command.
    quickstart  Print CLI quickstart and command cheat sheet.
    role  Show role-specific workflow guidance.
  Docs:
    docs cli  Generate an MDX CLI reference from the current cli2 registry/spec.
  Guard:
    commit  Create a git commit after validating policy and allowlist against staged changes.
    guard  Guard commands (commit checks, git hygiene, and allowlist helpers).
    guard clean  Ensure the git index has no staged files.
    guard commit  Validate commit policy and allowlist for staged changes (no commit is created).
    guard suggest-allow  Suggest minimal --allow prefixes based on staged files.
  Hooks:
    hooks  Manage and run git hooks installed by agentplane.
    hooks install  Install managed git hooks and the agentplane shim.
    hooks run  Run a managed hook (use `--` to pass through additional arguments).
    hooks uninstall  Uninstall managed git hooks installed by agentplane.
  IDE:
    ide sync  Generate IDE entrypoints from AGENTS.md.
  Lifecycle:
    block  Transition a task to BLOCKED and record a structured Blocked comment.
    finish  Mark task(s) as DONE and record a structured Verified comment.
    start  Transition a task to DOING and record a structured Start comment.
    verify  Record a verification outcome for a task (record-only; does not execute commands).
  PR:
    integrate  Integrate a task branch into the base branch (branch_pr workflow).
    pr  Manage local PR artifacts for a task (branch_pr workflow).
    pr check  Check that PR artifacts are present and valid.
    pr note  Append a handoff note into PR review.md.
    pr open  Create PR artifacts for a task.
    pr update  Update PR artifacts (diffstat and auto summary).
  Quality:
    doctor  Check structural invariants of an agentplane workspace (and optionally apply safe fixes).
  Recipes:
    recipes  Recipe management commands.
    recipes cache  Manage recipes cache.
    recipes cache prune  Prune global recipe cache entries.
    recipes explain  Show detailed info for an installed recipe.
    recipes info  Show installed recipe metadata.
    recipes install  Install a recipe from remote index, local archive, or URL.
    recipes list  List installed recipes.
    recipes list-remote  List recipes from the remote index (or cache).
    recipes remove  Remove an installed recipe.
  Release:
    release  Prepare a release (agent-assisted notes + version bump workflow).
    release apply  Apply a prepared release: bump versions, validate notes, commit, and tag.
    release plan  Generate an agent-assisted release plan (changes list + next patch version).
  Scenario:
    scenario  Recipe scenario commands.
    scenario info  Show scenario details (goal/inputs/outputs/steps).
    scenario list  List scenarios available from installed recipes.
    scenario run  Run a scenario toolchain from an installed recipe.
  Setup:
    init  Initialize agentplane project files under .agentplane/.
    upgrade  Upgrade the local agentplane framework bundle in the repo.
  Task:
    ready  Report dependency readiness details for a task.
    task add  Create one or more tasks with explicit ids (prints the created task ids).
    task comment  Append a comment to a task.
    task derive  Derive an implementation task from a spike task (adds depends_on on the spike).
    task doc  Task doc commands (show/set).
    task doc set  Update a task README section.
    task doc show  Print task README content (entire doc or one section).
    task export  Export tasks to the configured tasks export path (typically .agentplane/tasks.json).
    task lint  Lint the exported tasks JSON file (schema + invariants).
    task list  List tasks (optionally filtered by status/owner/tag).
    task migrate  Import tasks from an exported JSON file into the configured backend.
    task migrate-doc  Migrate task README docs to the current template/metadata format.
    task new  Create a new task (prints the generated task id).
    task next  List ready tasks (default status=TODO) with optional filters.
    task normalize  Normalize tasks in the configured backend (stable ordering and formatting).
    task plan approve  Approve the current task plan (enforces Verify Steps gating when configured).
    task plan reject  Reject the current task plan (requires a note).
    task plan set  Set a task plan (writes the Plan section and resets plan approval to pending).
    task rebuild-index  Rebuild the task index cache for the configured backend (best-effort).
    task scaffold  Write a task README file scaffold (for the current doc template).
    task scrub  Replace a string across all tasks (frontmatter + docs).
    task search  Search tasks by text or regex with optional filters.
    task set-status  Change a task status (optionally committing from the comment body).
    task show  Print task metadata as JSON (frontmatter shape).
    task update  Update an existing task.
    task verify  Record verification results (ok/rework).
    task verify ok  Record verification as OK (updates Verification section and verification frontmatter).
    task verify rework  Record verification as needs rework (resets commit, sets status to DOING, updates Verification).
    task verify-show  Print the task Verify Steps section (alias for task doc show --section "Verify Steps").
  Work:
    work start  Prepare the workspace for a task (direct: single-stream on current branch; branch_pr: task branch/worktree). and per-command help for , , and lifecycle commands.

## Verify Steps

- Confirm docs match `agentplane --help` summaries for `work start`, `integrate`, and lifecycle commands.
- Confirm direct-mode sections do not claim that work start creates branches by default.
- Confirm task lifecycle diagrams treat export as optional/explicit.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits for this task to restore prior workflow doc wording.

## Context

Recent CLI changes clarified direct-mode single-stream behavior ( as a lock) and made export an explicit action. The workflow docs must reflect the current semantics and avoid implying implicit exports or per-task branches in direct mode.
