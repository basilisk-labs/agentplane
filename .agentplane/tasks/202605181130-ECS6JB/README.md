---
id: "202605181130-ECS6JB"
title: "Install context policy module during context init"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "prompt"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T11:30:32.895Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T11:43:24.766Z"
  updated_by: "CODER"
  note: "Published PR #3886 for commit d141963b8 after implementation checks. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the context policy module wiring in the dedicated branch_pr worktree, keeping gateway changes compact and verifying generated policy/init behavior."
events:
  -
    type: "status"
    at: "2026-05-18T11:30:53.762Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the context policy module wiring in the dedicated branch_pr worktree, keeping gateway changes compact and verifying generated policy/init behavior."
  -
    type: "verify"
    at: "2026-05-18T11:40:47.225Z"
    author: "CODER"
    state: "ok"
    note: "Implemented context.must policy module and wired it into generated AGENTS load rules for context work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes."
  -
    type: "verify"
    at: "2026-05-18T11:41:28.619Z"
    author: "CODER"
    state: "ok"
    note: "Implemented context.must policy module and wired it into generated AGENTS load rules for context work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes."
  -
    type: "verify"
    at: "2026-05-18T11:43:24.766Z"
    author: "CODER"
    state: "ok"
    note: "Published PR #3886 for commit d141963b8 after implementation checks. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes."
doc_version: 3
doc_updated_at: "2026-05-18T11:43:24.775Z"
doc_updated_by: "CODER"
description: "Add a compact context policy module and wire context initialization/gateway loading so agents get mandatory CLI/provenance rules for local context work instead of relying on skills."
sections:
  Summary: |-
    Install context policy module during context init

    Add a compact context policy module and wire context initialization/gateway loading so agents get mandatory CLI/provenance rules for local context work instead of relying on skills.
  Scope: |-
    - In scope: Add a compact context policy module and wire context initialization/gateway loading so agents get mandatory CLI/provenance rules for local context work instead of relying on skills.
    - Out of scope: unrelated refactors not required for "Install context policy module during context init".
  Plan: "1. Inspect current context init, policy gateway template, prompt routing tests, and docs surfaces. 2. Add a canonical context policy module with concise mandatory rules for context search/show/learn/wiki/check/verify, provenance, source boundaries, and promotion gates. 3. Wire init/gateway assets so context-aware repositories load the module conditionally without bloating the default prompt. 4. Update tests/docs/snapshots that assert generated gateway/policy assets and context initialization behavior. 5. Verify with targeted context/init/prompt tests, policy routing, formatting/lint checks, and task verify-show."
  Verify Steps: |-
    1. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK and gateway/policy budgets pass.
    2. Run `bun run assets:builtin:check`. Expected: generated builtin asset table is fresh and includes `policy/context.must.md`.
    3. Run focused init/context/policy tests. Expected: context init installs `.agentplane/policy/context.must.md`, generated AGENTS loads it for context work, and existing context readiness tests pass.
    4. Run formatting/lint checks on touched files. Expected: no formatting or lint regressions.
    5. Run a repo-local clean temp `context init` smoke. Expected: fresh projects receive the context policy module and `context check` passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T11:40:47.225Z — VERIFY — ok

    By: CODER

    Note: Implemented context.must policy module and wired it into generated AGENTS load rules for context work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:30:53.762Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181130-ECS6JB-context-policy-module/.agentplane/tasks/202605181130-ECS6JB/blueprint/resolved-snapshot.json
    - old_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
    - current_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181130-ECS6JB

    ### 2026-05-18T11:41:28.619Z — VERIFY — ok

    By: CODER

    Note: Implemented context.must policy module and wired it into generated AGENTS load rules for context work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:41:22.951Z, excerpt_hash=sha256:fbe7fe1d36e5a2c32aef8d85c39200cc3b4dd00068d18197042100633c7c7723

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181130-ECS6JB-context-policy-module/.agentplane/tasks/202605181130-ECS6JB/blueprint/resolved-snapshot.json
    - old_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
    - current_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181130-ECS6JB

    ### 2026-05-18T11:43:24.766Z — VERIFY — ok

    By: CODER

    Note: Published PR #3886 for commit d141963b8 after implementation checks. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:41:28.635Z, excerpt_hash=sha256:fbe7fe1d36e5a2c32aef8d85c39200cc3b4dd00068d18197042100633c7c7723

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181130-ECS6JB-context-policy-module/.agentplane/tasks/202605181130-ECS6JB/blueprint/resolved-snapshot.json
    - old_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
    - current_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181130-ECS6JB

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Install context policy module during context init

Add a compact context policy module and wire context initialization/gateway loading so agents get mandatory CLI/provenance rules for local context work instead of relying on skills.

## Scope

- In scope: Add a compact context policy module and wire context initialization/gateway loading so agents get mandatory CLI/provenance rules for local context work instead of relying on skills.
- Out of scope: unrelated refactors not required for "Install context policy module during context init".

## Plan

1. Inspect current context init, policy gateway template, prompt routing tests, and docs surfaces. 2. Add a canonical context policy module with concise mandatory rules for context search/show/learn/wiki/check/verify, provenance, source boundaries, and promotion gates. 3. Wire init/gateway assets so context-aware repositories load the module conditionally without bloating the default prompt. 4. Update tests/docs/snapshots that assert generated gateway/policy assets and context initialization behavior. 5. Verify with targeted context/init/prompt tests, policy routing, formatting/lint checks, and task verify-show.

## Verify Steps

1. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK and gateway/policy budgets pass.
2. Run `bun run assets:builtin:check`. Expected: generated builtin asset table is fresh and includes `policy/context.must.md`.
3. Run focused init/context/policy tests. Expected: context init installs `.agentplane/policy/context.must.md`, generated AGENTS loads it for context work, and existing context readiness tests pass.
4. Run formatting/lint checks on touched files. Expected: no formatting or lint regressions.
5. Run a repo-local clean temp `context init` smoke. Expected: fresh projects receive the context policy module and `context check` passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T11:40:47.225Z — VERIFY — ok

By: CODER

Note: Implemented context.must policy module and wired it into generated AGENTS load rules for context work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:30:53.762Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181130-ECS6JB-context-policy-module/.agentplane/tasks/202605181130-ECS6JB/blueprint/resolved-snapshot.json
- old_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
- current_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181130-ECS6JB

### 2026-05-18T11:41:28.619Z — VERIFY — ok

By: CODER

Note: Implemented context.must policy module and wired it into generated AGENTS load rules for context work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:41:22.951Z, excerpt_hash=sha256:fbe7fe1d36e5a2c32aef8d85c39200cc3b4dd00068d18197042100633c7c7723

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181130-ECS6JB-context-policy-module/.agentplane/tasks/202605181130-ECS6JB/blueprint/resolved-snapshot.json
- old_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
- current_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181130-ECS6JB

### 2026-05-18T11:43:24.766Z — VERIFY — ok

By: CODER

Note: Published PR #3886 for commit d141963b8 after implementation checks. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:41:28.635Z, excerpt_hash=sha256:fbe7fe1d36e5a2c32aef8d85c39200cc3b4dd00068d18197042100633c7c7723

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181130-ECS6JB-context-policy-module/.agentplane/tasks/202605181130-ECS6JB/blueprint/resolved-snapshot.json
- old_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
- current_digest: 556bd767de379f69ad2aed7601691521e72feab3ca4b5a8c056200ac1d679b85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181130-ECS6JB

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
