---
id: "202605171055-1G6GP6"
title: "Add branch_pr route decision CLI commands"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "cli"
  - "workflow"
verify:
  - "bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/commands/task/route-decision.test.ts"
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T10:56:17.853Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T12:41:13.939Z"
  updated_by: "CODER"
  note: "Verified current PR head after hosted CI fix artifact refresh. GitHub checks are green on PR #3823; local checks for the fix passed: knip:check, focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and route status smoke."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement route decision CLI commands in the isolated task worktree and update prompt plus documentation guidance for agents."
events:
  -
    type: "status"
    at: "2026-05-17T10:56:21.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement route decision CLI commands in the isolated task worktree and update prompt plus documentation guidance for agents."
  -
    type: "verify"
    at: "2026-05-17T11:09:34.486Z"
    author: "CODER"
    state: "ok"
    note: "Implemented route decision CLI commands and docs/prompt guidance. Verified focused route command tests, existing PR flow status test, typecheck, lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local command smokes."
  -
    type: "verify"
    at: "2026-05-17T11:10:35.028Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit verification refreshed at current HEAD after route decision CLI implementation commit. Focused tests, typecheck, lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local command smokes passed."
  -
    type: "verify"
    at: "2026-05-17T11:12:34.559Z"
    author: "CODER"
    state: "ok"
    note: "Post-rebase verification refreshed at current HEAD after rebasing route decision CLI work onto origin/main. Focused tests and typecheck were rerun after rebase; prior lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local smokes remain valid for the same implementation."
  -
    type: "verify"
    at: "2026-05-17T11:42:30.387Z"
    author: "CODER"
    state: "ok"
    note: "Verified current PR metadata head after artifact-only refresh; implementation checks already passed: focused route-decision tests, typecheck, lint:core, format:check, routing policy check, diff check, repo-local command smokes, and pre-push full Vitest plus critical CLI E2E."
  -
    type: "verify"
    at: "2026-05-17T11:47:34.236Z"
    author: "CODER"
    state: "ok"
    note: "Verified final route-decision implementation including task-local artifact freshness handling. Checks passed: focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and repo-local smokes for task status --route, task next-action, work resume, and flow repair --dry-run."
  -
    type: "verify"
    at: "2026-05-17T12:34:54.052Z"
    author: "CODER"
    state: "ok"
    note: "Verified hosted CI fix: removed unused public route-decision type exports and refreshed knip baseline after TaskResumeContext became used. Checks passed: knip:check, focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and route status smoke."
  -
    type: "verify"
    at: "2026-05-17T12:41:13.939Z"
    author: "CODER"
    state: "ok"
    note: "Verified current PR head after hosted CI fix artifact refresh. GitHub checks are green on PR #3823; local checks for the fix passed: knip:check, focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and route status smoke."
doc_version: 3
doc_updated_at: "2026-05-17T12:41:13.949Z"
doc_updated_by: "CODER"
description: "Add machine-readable task route/status/next-action/resume/repair commands for branch_pr agent workflow optimization, and update prompts plus CLI documentation to teach the new commands."
sections:
  Summary: |-
    Add branch_pr route decision CLI commands

    Add machine-readable task route/status/next-action/resume/repair commands for branch_pr agent workflow optimization, and update prompts plus CLI documentation to teach the new commands.
  Scope: |-
    - In scope: Add machine-readable task route/status/next-action/resume/repair commands for branch_pr agent workflow optimization, and update prompts plus CLI documentation to teach the new commands.
    - Out of scope: unrelated refactors not required for "Add branch_pr route decision CLI commands".
  Plan: "Implement shared route-decision diagnostics for branch_pr tasks and expose separate agent-facing commands: task status --route, task next-action, work resume, and flow repair --dry-run. Reuse existing task/pr/preflight/handoff primitives where possible, keep mutating repair out of scope for this first pass, and update quickstart/role guidance plus CLI docs/help so agents use the route decision layer before manually chaining low-level commands."
  Verify Steps: |-
    1. bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts
    2. bun run typecheck
    3. bun run lint:core
    4. bun run format:check
    5. node .agentplane/policy/check-routing.mjs
    6. git diff --check
    7. Smoke repo-local commands: task status --route --json, task next-action --json, work resume, flow repair --dry-run.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T11:09:34.486Z — VERIFY — ok

    By: CODER

    Note: Implemented route decision CLI commands and docs/prompt guidance. Verified focused route command tests, existing PR flow status test, typecheck, lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local command smokes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:09:14.767Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
    - old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

    ### 2026-05-17T11:10:35.028Z — VERIFY — ok

    By: CODER

    Note: Post-commit verification refreshed at current HEAD after route decision CLI implementation commit. Focused tests, typecheck, lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local command smokes passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:09:34.492Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
    - old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

    ### 2026-05-17T11:12:34.559Z — VERIFY — ok

    By: CODER

    Note: Post-rebase verification refreshed at current HEAD after rebasing route decision CLI work onto origin/main. Focused tests and typecheck were rerun after rebase; prior lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local smokes remain valid for the same implementation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:10:35.035Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
    - old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

    ### 2026-05-17T11:42:30.387Z — VERIFY — ok

    By: CODER

    Note: Verified current PR metadata head after artifact-only refresh; implementation checks already passed: focused route-decision tests, typecheck, lint:core, format:check, routing policy check, diff check, repo-local command smokes, and pre-push full Vitest plus critical CLI E2E.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:12:34.660Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
    - old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

    ### 2026-05-17T11:47:34.236Z — VERIFY — ok

    By: CODER

    Note: Verified final route-decision implementation including task-local artifact freshness handling. Checks passed: focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and repo-local smokes for task status --route, task next-action, work resume, and flow repair --dry-run.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:42:30.396Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
    - old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

    ### 2026-05-17T12:34:54.052Z — VERIFY — ok

    By: CODER

    Note: Verified hosted CI fix: removed unused public route-decision type exports and refreshed knip baseline after TaskResumeContext became used. Checks passed: knip:check, focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and route status smoke.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:47:34.245Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
    - old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

    ### 2026-05-17T12:41:13.939Z — VERIFY — ok

    By: CODER

    Note: Verified current PR head after hosted CI fix artifact refresh. GitHub checks are green on PR #3823; local checks for the fix passed: knip:check, focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and route status smoke.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T12:34:54.061Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
    - old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added task status --route, task next-action, work resume, and flow repair --dry-run on a shared route-decision reader; flow repair is intentionally dry-run only.
      Impact: Agents can ask for one machine-readable next action and repair plan instead of manually composing task show, resume-context, pr flow status, and preflight output.
      Resolution: New commands are registered in the command catalog, covered by focused CLI tests, documented in generated CLI reference and task lifecycle docs, and surfaced in quickstart/role guidance.

    - Observation: Verification was refreshed after implementation and task-artifact commits so PR validation sees current HEAD.
      Impact: PR artifacts can now be checked against non-stale verification evidence.
      Resolution: Recorded verification on the current task branch head before PR artifact validation.

    - Observation: Rebase changed task branch commit SHAs, requiring verification and PR artifact refresh.
      Impact: PR validation can compare current branch head against fresh verification evidence.
      Resolution: Recorded verification after clean rebase onto origin/main.
id_source: "explicit"
---
## Summary

Add branch_pr route decision CLI commands

Add machine-readable task route/status/next-action/resume/repair commands for branch_pr agent workflow optimization, and update prompts plus CLI documentation to teach the new commands.

## Scope

- In scope: Add machine-readable task route/status/next-action/resume/repair commands for branch_pr agent workflow optimization, and update prompts plus CLI documentation to teach the new commands.
- Out of scope: unrelated refactors not required for "Add branch_pr route decision CLI commands".

## Plan

Implement shared route-decision diagnostics for branch_pr tasks and expose separate agent-facing commands: task status --route, task next-action, work resume, and flow repair --dry-run. Reuse existing task/pr/preflight/handoff primitives where possible, keep mutating repair out of scope for this first pass, and update quickstart/role guidance plus CLI docs/help so agents use the route decision layer before manually chaining low-level commands.

## Verify Steps

1. bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts
2. bun run typecheck
3. bun run lint:core
4. bun run format:check
5. node .agentplane/policy/check-routing.mjs
6. git diff --check
7. Smoke repo-local commands: task status --route --json, task next-action --json, work resume, flow repair --dry-run.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T11:09:34.486Z — VERIFY — ok

By: CODER

Note: Implemented route decision CLI commands and docs/prompt guidance. Verified focused route command tests, existing PR flow status test, typecheck, lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local command smokes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:09:14.767Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
- old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

### 2026-05-17T11:10:35.028Z — VERIFY — ok

By: CODER

Note: Post-commit verification refreshed at current HEAD after route decision CLI implementation commit. Focused tests, typecheck, lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local command smokes passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:09:34.492Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
- old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

### 2026-05-17T11:12:34.559Z — VERIFY — ok

By: CODER

Note: Post-rebase verification refreshed at current HEAD after rebasing route decision CLI work onto origin/main. Focused tests and typecheck were rerun after rebase; prior lint:core, format:check, policy routing, diff check, framework bootstrap, and repo-local smokes remain valid for the same implementation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:10:35.035Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
- old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

### 2026-05-17T11:42:30.387Z — VERIFY — ok

By: CODER

Note: Verified current PR metadata head after artifact-only refresh; implementation checks already passed: focused route-decision tests, typecheck, lint:core, format:check, routing policy check, diff check, repo-local command smokes, and pre-push full Vitest plus critical CLI E2E.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:12:34.660Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
- old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

### 2026-05-17T11:47:34.236Z — VERIFY — ok

By: CODER

Note: Verified final route-decision implementation including task-local artifact freshness handling. Checks passed: focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and repo-local smokes for task status --route, task next-action, work resume, and flow repair --dry-run.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:42:30.396Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
- old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

### 2026-05-17T12:34:54.052Z — VERIFY — ok

By: CODER

Note: Verified hosted CI fix: removed unused public route-decision type exports and refreshed knip baseline after TaskResumeContext became used. Checks passed: knip:check, focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and route status smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T11:47:34.245Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
- old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

### 2026-05-17T12:41:13.939Z — VERIFY — ok

By: CODER

Note: Verified current PR head after hosted CI fix artifact refresh. GitHub checks are green on PR #3823; local checks for the fix passed: knip:check, focused route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check, framework bootstrap, and route status smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T12:34:54.061Z, excerpt_hash=sha256:3ba4deb4607187919b8b9f87ed560b0ba7950075109d573d3f54cfb1260f8e47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171055-1G6GP6-route-decision-cli/.agentplane/tasks/202605171055-1G6GP6/blueprint/resolved-snapshot.json
- old_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- current_digest: 25c0f01eb7fe4fd7d0acce95df7e3d059b5adcbb11a67de016566402b5fcc011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171055-1G6GP6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added task status --route, task next-action, work resume, and flow repair --dry-run on a shared route-decision reader; flow repair is intentionally dry-run only.
  Impact: Agents can ask for one machine-readable next action and repair plan instead of manually composing task show, resume-context, pr flow status, and preflight output.
  Resolution: New commands are registered in the command catalog, covered by focused CLI tests, documented in generated CLI reference and task lifecycle docs, and surfaced in quickstart/role guidance.

- Observation: Verification was refreshed after implementation and task-artifact commits so PR validation sees current HEAD.
  Impact: PR artifacts can now be checked against non-stale verification evidence.
  Resolution: Recorded verification on the current task branch head before PR artifact validation.

- Observation: Rebase changed task branch commit SHAs, requiring verification and PR artifact refresh.
  Impact: PR validation can compare current branch head against fresh verification evidence.
  Resolution: Recorded verification after clean rebase onto origin/main.
