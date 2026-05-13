---
id: "202605131627-ANTN2E"
title: "Classify task artifact drift for parallel agents"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:27:54.031Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T16:35:58.385Z"
  updated_by: "CODER"
  note: "Verified: typed task artifact drift classification distinguishes active parallel task artifacts from actionable drift. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; bun run --filter=agentplane typecheck; bunx prettier --check touched files; bunx eslint touched files; node .agentplane/policy/check-routing.mjs; ap doctor. ap preflight --json --mode full shows active task artifacts as actionable=false; remaining warning is expected tracked implementation changes before commit."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement typed task artifact drift classification in preflight with focused tests and compatibility-preserving JSON fields."
events:
  -
    type: "status"
    at: "2026-05-13T16:28:38.600Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement typed task artifact drift classification in preflight with focused tests and compatibility-preserving JSON fields."
  -
    type: "verify"
    at: "2026-05-13T16:35:58.385Z"
    author: "CODER"
    state: "ok"
    note: "Verified: typed task artifact drift classification distinguishes active parallel task artifacts from actionable drift. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; bun run --filter=agentplane typecheck; bunx prettier --check touched files; bunx eslint touched files; node .agentplane/policy/check-routing.mjs; ap doctor. ap preflight --json --mode full shows active task artifacts as actionable=false; remaining warning is expected tracked implementation changes before commit."
doc_version: 3
doc_updated_at: "2026-05-13T16:35:58.416Z"
doc_updated_by: "CODER"
description: "Add typed preflight classification for task artifact drift so active task artifacts from parallel agents are distinguished from stale or unknown recovery drift."
sections:
  Summary: |-
    Classify task artifact drift for parallel agents
    
    Add typed preflight classification for task artifact drift so active task artifacts from parallel agents are distinguished from stale or unknown recovery drift.
  Scope: |-
    - In scope: Add typed preflight classification for task artifact drift so active task artifacts from parallel agents are distinguished from stale or unknown recovery drift.
    - Out of scope: unrelated refactors not required for "Classify task artifact drift for parallel agents".
  Plan: "Implement typed task artifact drift classification in preflight. Scope: classify changed .agentplane/tasks artifacts by task status and artifact path into active parallel-agent artifacts, stale DONE handoff residue, and unknown/manual drift; keep compatibility with existing task_artifact_drift fields; adjust text/json output and focused tests so active TODO/DOING task README artifacts do not trigger harness_health warnings while stale/unknown actionable drift still does. Verification: focused preflight readiness tests, typecheck for touched package if practical, policy routing, doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T16:35:58.385Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: typed task artifact drift classification distinguishes active parallel task artifacts from actionable drift. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; bun run --filter=agentplane typecheck; bunx prettier --check touched files; bunx eslint touched files; node .agentplane/policy/check-routing.mjs; ap doctor. ap preflight --json --mode full shows active task artifacts as actionable=false; remaining warning is expected tracked implementation changes before commit.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:28:38.600Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131627-ANTN2E-typed-drift-classification/.agentplane/tasks/202605131627-ANTN2E/blueprint/resolved-snapshot.json
    - old_digest: fd3872f4d231c8b1c9af0b73d3bd409a1f4561ce3873a1396f201c120940babc
    - current_digest: fd3872f4d231c8b1c9af0b73d3bd409a1f4561ce3873a1396f201c120940babc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131627-ANTN2E
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Classify task artifact drift for parallel agents

Add typed preflight classification for task artifact drift so active task artifacts from parallel agents are distinguished from stale or unknown recovery drift.

## Scope

- In scope: Add typed preflight classification for task artifact drift so active task artifacts from parallel agents are distinguished from stale or unknown recovery drift.
- Out of scope: unrelated refactors not required for "Classify task artifact drift for parallel agents".

## Plan

Implement typed task artifact drift classification in preflight. Scope: classify changed .agentplane/tasks artifacts by task status and artifact path into active parallel-agent artifacts, stale DONE handoff residue, and unknown/manual drift; keep compatibility with existing task_artifact_drift fields; adjust text/json output and focused tests so active TODO/DOING task README artifacts do not trigger harness_health warnings while stale/unknown actionable drift still does. Verification: focused preflight readiness tests, typecheck for touched package if practical, policy routing, doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T16:35:58.385Z — VERIFY — ok

By: CODER

Note: Verified: typed task artifact drift classification distinguishes active parallel task artifacts from actionable drift. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; bun run --filter=agentplane typecheck; bunx prettier --check touched files; bunx eslint touched files; node .agentplane/policy/check-routing.mjs; ap doctor. ap preflight --json --mode full shows active task artifacts as actionable=false; remaining warning is expected tracked implementation changes before commit.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:28:38.600Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131627-ANTN2E-typed-drift-classification/.agentplane/tasks/202605131627-ANTN2E/blueprint/resolved-snapshot.json
- old_digest: fd3872f4d231c8b1c9af0b73d3bd409a1f4561ce3873a1396f201c120940babc
- current_digest: fd3872f4d231c8b1c9af0b73d3bd409a1f4561ce3873a1396f201c120940babc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131627-ANTN2E

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
