---
id: "202603181342-8EC40V"
title: "Refresh governance docs for current workflow"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 14
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-18T13:43:13.977Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-18T13:45:18.729Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: workflow doctor check ok with findings=0. Scope: CONTRIBUTING.md updated to current task-driven workflow; CODE_OF_CONDUCT.md and SECURITY.md verified unchanged because no confirmed drift was found."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: audit and refresh root contributor and governance docs against current CLI, workflow, and repository layout; scope limited to confirmed documentation drift in root docs; risk is low because changes are docs-only but stale commands or paths would mislead contributors."
events:
  -
    type: "status"
    at: "2026-03-18T13:43:57.343Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: audit and refresh root contributor and governance docs against current CLI, workflow, and repository layout; scope limited to confirmed documentation drift in root docs; risk is low because changes are docs-only but stale commands or paths would mislead contributors."
  -
    type: "verify"
    at: "2026-03-18T13:45:13.465Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/README.md; Links: docs/README.md, docs/developer/documentation-information-architecture.mdx, docs/user/website-ia.mdx. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), findings=0; Scope: docs/README.md; Links: docs/README.md."
  -
    type: "verify"
    at: "2026-03-18T13:45:18.729Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: workflow doctor check ok with findings=0. Scope: CONTRIBUTING.md updated to current task-driven workflow; CODE_OF_CONDUCT.md and SECURITY.md verified unchanged because no confirmed drift was found."
doc_version: 3
doc_updated_at: "2026-03-18T13:45:38.121Z"
doc_updated_by: "DOCS"
description: "Audit root governance/community docs against the current AgentPlane repository state and update stale guidance."
sections:
  Summary: |-
    Refresh governance docs for current workflow
    
    Audit root governance/community docs against the current AgentPlane repository state and update stale guidance.
  Scope: |-
    - In scope: root contributor and governance docs that describe how people should work with this repository now, especially README-linked files such as CONTRIBUTING.md, CODE_OF_CONDUCT.md, and SECURITY.md when drift is confirmed.
    - In scope: aligning contributor-facing commands and process language with the current agentplane task lifecycle, workflow modes, docs layout, and verification expectations.
    - Out of scope: behavior changes, policy-tree edits under .agentplane/policy, release-note edits, or broad docs rewrites outside the identified root files unless needed to keep links and statements consistent.
  Plan: "Scope: audit root governance/community docs for current repo reality, focusing on README-linked policy files and contributor-facing guidance. Steps: compare README/CONTRIBUTING/CODE_OF_CONDUCT/SECURITY against AGENTS.md, current CLI help, docs source layout, and package scripts; update stale files; run docs-policy verification; record evidence and close with traceable commit metadata. Constraints: no network, no outside-repo access, no changes outside approved docs scope unless drift is explicitly re-approved."
  Verify Steps: |-
    1. Read CONTRIBUTING.md and confirm it describes the current task-driven workflow, uses Usage:
      agentplane help [<cmd...>] [--compact] [--json]
    
    Commands:
      Backend:
        backend  Backend-related operations.
        backend inspect  Inspect visible backend readiness facts without mutating remote state.
        backend migrate-canonical-state  Backfill canonical_state for issues in the configured backend.
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
        profile set  Apply setup profile presets to config.
      Core:
        agents  List agent definitions under .agentplane/agents.
        help  Show help for a command.
        preflight  Run aggregated preflight checks and print a deterministic readiness report.
        quickstart  Print the canonical agent bootstrap path and startup guidance.
        role  Show role-specific workflow guidance.
      Diagnostics:
        runtime  Inspect which agentplane runtime/binary/package sources are active.
        runtime explain  Explain the active binary, runtime mode, and resolved package roots.
      Docs:
        docs cli  Generate an MDX CLI reference from the current cli2 registry/spec.
      Guard:
        commit  Create a git commit after validating policy and allowlist; if the index is empty, stage matching allowlist paths first.
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
        ide sync  Generate IDE entrypoints from policy gateway file (AGENTS.md or CLAUDE.md).
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
        doctor  Check workspace invariants for a normal agentplane installation (with optional dev source checks).
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
        scenario info  Show manifest-backed scenario details and normalized run profile.
        scenario list  List resolver-backed scenario descriptors from installed recipes.
        scenario run  Validate a scenario and print a prepared run plan (no execution).
      Setup:
        init  Initialize agentplane project files under .agentplane/.
        upgrade  Upgrade the local agentplane framework bundle in the repo.
      Task:
        ready  Report dependency readiness details for a task.
        task  Task lifecycle and task-store commands.
        task add  Create one or more tasks with explicit ids (prints the created task ids).
        task close-duplicate  Close a task as a duplicate of another task with no-op bookkeeping metadata.
        task close-noop  Close a task as a verified no-op in one command.
        task comment  Append a comment to a task.
        task derive  Derive an implementation task from a spike task (adds depends_on on the spike).
        task doc  Task doc commands (show/set).
        task doc set  Update a task README section.
        task doc show  Print task README content (entire doc or one section).
        task export  Export tasks to the configured tasks export path (typically .agentplane/tasks.json).
        task lint  Lint the exported tasks JSON file (schema + invariants).
        task list  List tasks (optionally filtered by status/owner/tag).
        task migrate  Import tasks from an exported JSON file into the configured backend.
        task migrate-doc  Migrate legacy task README docs to the current README v3 template/metadata format.
        task new  Create a new task (prints the generated task id).
        task next  List ready tasks (default status=TODO) with optional filters.
        task normalize  Normalize tasks in the configured backend (stable ordering and formatting).
        task plan  Task plan commands (set/approve/reject).
        task plan approve  Approve the current task plan (enforces Verify Steps gating when configured).
        task plan reject  Reject the current task plan (requires a note).
        task plan set  Set a task plan (writes the Plan section and resets plan approval to pending).
        task rebuild-index  Rebuild the task index cache for the configured backend (best-effort).
        task scaffold  Write a task README file scaffold (for the current doc template).
        task scrub  Replace a string across all tasks (frontmatter + docs).
        task search  Search tasks by text or regex with optional filters.
        task set-status  Change a task status (optionally committing from the comment body).
        task show  Print task metadata as JSON (frontmatter shape).
        task start-ready  Run readiness checks and start a task in one deterministic command.
        task update  Update an existing task.
        task verify  Record verification results (ok/rework).
        task verify ok  Record verification as OK (updates Verification section and verification frontmatter).
        task verify rework  Record verification as needs rework (resets commit, sets status to DOING, updates Verification).
        task verify-show  Print the task Verify Steps acceptance contract (alias for task doc show --section "Verify Steps").
      Work:
        work start  Prepare the workspace for a task (direct: single-stream on current branch; branch_pr: task branch/worktree).
      Workflow:
        workflow  Workflow contract commands.
        workflow build  Build WORKFLOW.md from template layers with strict rendering checks.
        workflow debug  Run built-in debug checks and capture workflow evidence.
        workflow land  Run built-in pre-land checks and capture workflow evidence.
        workflow restore  Restore WORKFLOW.md from last-known-good snapshot.
        workflow sync  Run built-in sync checks and capture workflow evidence. from PATH, and states that  is export-only rather than canonical backlog. Expected: the document matches the repository's current workflow and command surface.
    2. Review CODE_OF_CONDUCT.md and SECURITY.md against AGENTS.md, .github/ISSUE_TEMPLATE/config.yml, and the current repo contacts. Expected: no confirmed drift remains, so no further edits are needed.
    3. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Expected: both checks pass and the docs/policy surface remains consistent after the change.
  Verification: |-
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK
      Scope: docs/README.md
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor (OK), findings=0
      Scope: docs/README.md
  Rollback Plan: |-
    - Revert the docs changes introduced by this task.
    - Re-run node .agentplane/policy/check-routing.mjs and agentplane doctor to confirm the repository returns to the prior docs-policy state.
    - If a reverted file was updated to remove stale commands or paths, re-check README links so contributor guidance does not point at removed content.
  Findings: "No additional findings."
id_source: "generated"
---
## Summary

Refresh governance docs for current workflow

Audit root governance/community docs against the current AgentPlane repository state and update stale guidance.

## Scope

- In scope: root contributor and governance docs that describe how people should work with this repository now, especially README-linked files such as CONTRIBUTING.md, CODE_OF_CONDUCT.md, and SECURITY.md when drift is confirmed.
- In scope: aligning contributor-facing commands and process language with the current agentplane task lifecycle, workflow modes, docs layout, and verification expectations.
- Out of scope: behavior changes, policy-tree edits under .agentplane/policy, release-note edits, or broad docs rewrites outside the identified root files unless needed to keep links and statements consistent.

## Plan

Scope: audit root governance/community docs for current repo reality, focusing on README-linked policy files and contributor-facing guidance. Steps: compare README/CONTRIBUTING/CODE_OF_CONDUCT/SECURITY against AGENTS.md, current CLI help, docs source layout, and package scripts; update stale files; run docs-policy verification; record evidence and close with traceable commit metadata. Constraints: no network, no outside-repo access, no changes outside approved docs scope unless drift is explicitly re-approved.

## Verify Steps

1. Read CONTRIBUTING.md and confirm it describes the current task-driven workflow, uses Usage:
  agentplane help [<cmd...>] [--compact] [--json]

Commands:
  Backend:
    backend  Backend-related operations.
    backend inspect  Inspect visible backend readiness facts without mutating remote state.
    backend migrate-canonical-state  Backfill canonical_state for issues in the configured backend.
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
    profile set  Apply setup profile presets to config.
  Core:
    agents  List agent definitions under .agentplane/agents.
    help  Show help for a command.
    preflight  Run aggregated preflight checks and print a deterministic readiness report.
    quickstart  Print the canonical agent bootstrap path and startup guidance.
    role  Show role-specific workflow guidance.
  Diagnostics:
    runtime  Inspect which agentplane runtime/binary/package sources are active.
    runtime explain  Explain the active binary, runtime mode, and resolved package roots.
  Docs:
    docs cli  Generate an MDX CLI reference from the current cli2 registry/spec.
  Guard:
    commit  Create a git commit after validating policy and allowlist; if the index is empty, stage matching allowlist paths first.
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
    ide sync  Generate IDE entrypoints from policy gateway file (AGENTS.md or CLAUDE.md).
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
    doctor  Check workspace invariants for a normal agentplane installation (with optional dev source checks).
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
    scenario info  Show manifest-backed scenario details and normalized run profile.
    scenario list  List resolver-backed scenario descriptors from installed recipes.
    scenario run  Validate a scenario and print a prepared run plan (no execution).
  Setup:
    init  Initialize agentplane project files under .agentplane/.
    upgrade  Upgrade the local agentplane framework bundle in the repo.
  Task:
    ready  Report dependency readiness details for a task.
    task  Task lifecycle and task-store commands.
    task add  Create one or more tasks with explicit ids (prints the created task ids).
    task close-duplicate  Close a task as a duplicate of another task with no-op bookkeeping metadata.
    task close-noop  Close a task as a verified no-op in one command.
    task comment  Append a comment to a task.
    task derive  Derive an implementation task from a spike task (adds depends_on on the spike).
    task doc  Task doc commands (show/set).
    task doc set  Update a task README section.
    task doc show  Print task README content (entire doc or one section).
    task export  Export tasks to the configured tasks export path (typically .agentplane/tasks.json).
    task lint  Lint the exported tasks JSON file (schema + invariants).
    task list  List tasks (optionally filtered by status/owner/tag).
    task migrate  Import tasks from an exported JSON file into the configured backend.
    task migrate-doc  Migrate legacy task README docs to the current README v3 template/metadata format.
    task new  Create a new task (prints the generated task id).
    task next  List ready tasks (default status=TODO) with optional filters.
    task normalize  Normalize tasks in the configured backend (stable ordering and formatting).
    task plan  Task plan commands (set/approve/reject).
    task plan approve  Approve the current task plan (enforces Verify Steps gating when configured).
    task plan reject  Reject the current task plan (requires a note).
    task plan set  Set a task plan (writes the Plan section and resets plan approval to pending).
    task rebuild-index  Rebuild the task index cache for the configured backend (best-effort).
    task scaffold  Write a task README file scaffold (for the current doc template).
    task scrub  Replace a string across all tasks (frontmatter + docs).
    task search  Search tasks by text or regex with optional filters.
    task set-status  Change a task status (optionally committing from the comment body).
    task show  Print task metadata as JSON (frontmatter shape).
    task start-ready  Run readiness checks and start a task in one deterministic command.
    task update  Update an existing task.
    task verify  Record verification results (ok/rework).
    task verify ok  Record verification as OK (updates Verification section and verification frontmatter).
    task verify rework  Record verification as needs rework (resets commit, sets status to DOING, updates Verification).
    task verify-show  Print the task Verify Steps acceptance contract (alias for task doc show --section "Verify Steps").
  Work:
    work start  Prepare the workspace for a task (direct: single-stream on current branch; branch_pr: task branch/worktree).
  Workflow:
    workflow  Workflow contract commands.
    workflow build  Build WORKFLOW.md from template layers with strict rendering checks.
    workflow debug  Run built-in debug checks and capture workflow evidence.
    workflow land  Run built-in pre-land checks and capture workflow evidence.
    workflow restore  Restore WORKFLOW.md from last-known-good snapshot.
    workflow sync  Run built-in sync checks and capture workflow evidence. from PATH, and states that  is export-only rather than canonical backlog. Expected: the document matches the repository's current workflow and command surface.
2. Review CODE_OF_CONDUCT.md and SECURITY.md against AGENTS.md, .github/ISSUE_TEMPLATE/config.yml, and the current repo contacts. Expected: no confirmed drift remains, so no further edits are needed.
3. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Expected: both checks pass and the docs/policy surface remains consistent after the change.

## Verification

- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK
  Scope: docs/README.md
- Command: agentplane doctor
  Result: pass
  Evidence: doctor (OK), findings=0
  Scope: docs/README.md

## Rollback Plan

- Revert the docs changes introduced by this task.
- Re-run node .agentplane/policy/check-routing.mjs and agentplane doctor to confirm the repository returns to the prior docs-policy state.
- If a reverted file was updated to remove stale commands or paths, re-check README links so contributor guidance does not point at removed content.

## Findings

No additional findings.
