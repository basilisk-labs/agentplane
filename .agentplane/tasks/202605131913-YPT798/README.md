---
id: "202605131913-YPT798"
title: "Serialize framework dev build lane"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T19:14:15.332Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T19:31:26.576Z"
  updated_by: "CODER"
  note: "Verified framework build-lane serialization fix. Passed: focused Vitest bootstrap/stale-dist suite (25 tests), targeted ESLint, targeted Prettier check, git diff --check, policy routing, helper import smoke, and package agentplane build. Broader ci:local:fast docs-only loaded the new helper but failed on pre-existing Prettier drift in packages/agentplane/src/cli/spec/docs-render.ts outside this diff."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing a scoped framework build-lane serialization fix in the task worktree, focusing on bootstrap/local CI writers that can remove shared dist during parallel CLI use."
events:
  -
    type: "status"
    at: "2026-05-13T19:14:51.159Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing a scoped framework build-lane serialization fix in the task worktree, focusing on bootstrap/local CI writers that can remove shared dist during parallel CLI use."
  -
    type: "verify"
    at: "2026-05-13T19:31:26.576Z"
    author: "CODER"
    state: "ok"
    note: "Verified framework build-lane serialization fix. Passed: focused Vitest bootstrap/stale-dist suite (25 tests), targeted ESLint, targeted Prettier check, git diff --check, policy routing, helper import smoke, and package agentplane build. Broader ci:local:fast docs-only loaded the new helper but failed on pre-existing Prettier drift in packages/agentplane/src/cli/spec/docs-render.ts outside this diff."
doc_version: 3
doc_updated_at: "2026-05-13T19:31:26.600Z"
doc_updated_by: "CODER"
description: "Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime."
sections:
  Summary: |-
    Serialize framework dev build lane
    
    Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.
  Scope: |-
    - In scope: Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.
    - Out of scope: unrelated refactors not required for "Serialize framework dev build lane".
  Plan: "1. Inspect current bootstrap/build/pre-push paths for unguarded shared dist writers. 2. Add a repo-scoped framework build mutex that is reusable by bootstrap/local CI build steps and records owner diagnostics. 3. Route framework bootstrap and local CI build steps through the mutex without changing public CLI commands. 4. Add focused regression coverage for concurrent bootstrap/build lock behavior. 5. Verify with targeted tests and framework bootstrap smoke."
  Verify Steps: |-
    1. Run focused bootstrap/runtime tests: bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000. Expected: bootstrap lock and auto-bootstrap reentrancy behavior pass.
    2. Run syntax/import smoke for the new helper: node scripts/workflow/bootstrap-framework-dev.mjs --help and node -e "const m=await import('./scripts/lib/framework-build-lock.mjs'); console.log(m.FRAMEWORK_BUILD_LOCK_DIR);". Expected: scripts load without module errors.
    3. Run targeted style/static checks: bunx prettier --check scripts/lib/framework-build-lock.mjs scripts/workflow/bootstrap-framework-dev.mjs scripts/checks/run-local-ci.mjs packages/agentplane/bin/agentplane.js packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts and bunx eslint scripts/lib/framework-build-lock.mjs scripts/workflow/bootstrap-framework-dev.mjs scripts/checks/run-local-ci.mjs packages/agentplane/bin/agentplane.js packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts. Expected: touched files pass.
    4. Run policy routing: node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
    5. Inspect final diff. Expected: framework bootstrap and local CI build lanes share one repo-scoped lock, auto-bootstrap passes the inherited lock to avoid self-deadlock, and unrelated workflow behavior is unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T19:31:26.576Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified framework build-lane serialization fix. Passed: focused Vitest bootstrap/stale-dist suite (25 tests), targeted ESLint, targeted Prettier check, git diff --check, policy routing, helper import smoke, and package agentplane build. Broader ci:local:fast docs-only loaded the new helper but failed on pre-existing Prettier drift in packages/agentplane/src/cli/spec/docs-render.ts outside this diff.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:20:28.488Z, excerpt_hash=sha256:e3061c5feed9e9278707c9e7d1ac4dd2d34e7129ada6ee527f43f616f08cf71d
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131913-YPT798-serialize-build-lane/.agentplane/tasks/202605131913-YPT798/blueprint/resolved-snapshot.json
    - old_digest: 806fbab1d10a9c578491686b0476d2c245e7df250eaf555bc7cdb596ce267771
    - current_digest: 806fbab1d10a9c578491686b0476d2c245e7df250eaf555bc7cdb596ce267771
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131913-YPT798
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Concurrent framework bootstrap/build can leave shared dist missing; an interrupted build can leave a stale lock.
      Impact: Parallel agents in different worktrees can block CLI startup or force manual runtime recovery when build lanes are not serialized.
      Resolution: Added repo-scoped framework build lock with owner metadata, inherited-lock support for auto-bootstrap, stale PID cleanup, and local CI/bootstrap build-lane usage.
id_source: "generated"
---
## Summary

Serialize framework dev build lane

Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.

## Scope

- In scope: Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.
- Out of scope: unrelated refactors not required for "Serialize framework dev build lane".

## Plan

1. Inspect current bootstrap/build/pre-push paths for unguarded shared dist writers. 2. Add a repo-scoped framework build mutex that is reusable by bootstrap/local CI build steps and records owner diagnostics. 3. Route framework bootstrap and local CI build steps through the mutex without changing public CLI commands. 4. Add focused regression coverage for concurrent bootstrap/build lock behavior. 5. Verify with targeted tests and framework bootstrap smoke.

## Verify Steps

1. Run focused bootstrap/runtime tests: bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000. Expected: bootstrap lock and auto-bootstrap reentrancy behavior pass.
2. Run syntax/import smoke for the new helper: node scripts/workflow/bootstrap-framework-dev.mjs --help and node -e "const m=await import('./scripts/lib/framework-build-lock.mjs'); console.log(m.FRAMEWORK_BUILD_LOCK_DIR);". Expected: scripts load without module errors.
3. Run targeted style/static checks: bunx prettier --check scripts/lib/framework-build-lock.mjs scripts/workflow/bootstrap-framework-dev.mjs scripts/checks/run-local-ci.mjs packages/agentplane/bin/agentplane.js packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts and bunx eslint scripts/lib/framework-build-lock.mjs scripts/workflow/bootstrap-framework-dev.mjs scripts/checks/run-local-ci.mjs packages/agentplane/bin/agentplane.js packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts. Expected: touched files pass.
4. Run policy routing: node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
5. Inspect final diff. Expected: framework bootstrap and local CI build lanes share one repo-scoped lock, auto-bootstrap passes the inherited lock to avoid self-deadlock, and unrelated workflow behavior is unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T19:31:26.576Z — VERIFY — ok

By: CODER

Note: Verified framework build-lane serialization fix. Passed: focused Vitest bootstrap/stale-dist suite (25 tests), targeted ESLint, targeted Prettier check, git diff --check, policy routing, helper import smoke, and package agentplane build. Broader ci:local:fast docs-only loaded the new helper but failed on pre-existing Prettier drift in packages/agentplane/src/cli/spec/docs-render.ts outside this diff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:20:28.488Z, excerpt_hash=sha256:e3061c5feed9e9278707c9e7d1ac4dd2d34e7129ada6ee527f43f616f08cf71d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131913-YPT798-serialize-build-lane/.agentplane/tasks/202605131913-YPT798/blueprint/resolved-snapshot.json
- old_digest: 806fbab1d10a9c578491686b0476d2c245e7df250eaf555bc7cdb596ce267771
- current_digest: 806fbab1d10a9c578491686b0476d2c245e7df250eaf555bc7cdb596ce267771
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131913-YPT798

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Concurrent framework bootstrap/build can leave shared dist missing; an interrupted build can leave a stale lock.
  Impact: Parallel agents in different worktrees can block CLI startup or force manual runtime recovery when build lanes are not serialized.
  Resolution: Added repo-scoped framework build lock with owner metadata, inherited-lock support for auto-bootstrap, stale PID cleanup, and local CI/bootstrap build-lane usage.
