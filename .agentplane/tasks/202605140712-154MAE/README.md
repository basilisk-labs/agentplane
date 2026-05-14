---
id: "202605140712-154MAE"
title: "Document cloud dependency projection"
result_summary: "Merged via PR #3692."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T07:12:20.132Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T07:17:42.389Z"
  updated_by: "CODER"
  note: "Verified: cloud dependency projection coverage and docs passed targeted checks. Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts. Result: pass, 24 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing warnings about old task archive/branch_pr closure drift."
  attempts: 0
commit:
  hash: "c5725e45ada6430ba923233b33e7e9d2f9d8f13a"
  message: "Merge pull request #3692 from basilisk-labs/task/202605140712-154MAE/cloud-dependency-projection"
comments:
  -
    author: "CODER"
    body: "Start: adding AgentPlane-side cloud dependency projection coverage and cloud backend documentation in the dedicated task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3692 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T07:12:30.961Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding AgentPlane-side cloud dependency projection coverage and cloud backend documentation in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-05-14T07:17:42.389Z"
    author: "CODER"
    state: "ok"
    note: "Verified: cloud dependency projection coverage and docs passed targeted checks. Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts. Result: pass, 24 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing warnings about old task archive/branch_pr closure drift."
  -
    type: "status"
    at: "2026-05-14T07:44:41.709Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3692 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T07:44:41.715Z"
doc_updated_by: "INTEGRATOR"
description: "Add AgentPlane-side coverage and documentation that cloud push preserves depends_on and treats local depends_on as the source of truth for GitHub blocked-by projection."
sections:
  Summary: |-
    Document cloud dependency projection
    
    Add AgentPlane-side coverage and documentation that cloud push preserves depends_on and treats local depends_on as the source of truth for GitHub blocked-by projection.
  Scope: |-
    - In scope: Add AgentPlane-side coverage and documentation that cloud push preserves depends_on and treats local depends_on as the source of truth for GitHub blocked-by projection.
    - Out of scope: unrelated refactors not required for "Document cloud dependency projection".
  Plan: "1. Add a focused cloud backend unit test proving a dependent task is serialized in cloud push payload with depends_on intact. 2. Update docs/user/backends/cloud.mdx to state that GitHub Projects connected views may project AgentPlane depends_on into native GitHub blocked-by relationships while local depends_on remains the source of truth. 3. Run the targeted cloud backend test and routing/docs checks required for the touched surfaces."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/backends/task-backend.cloud.test.ts`. Expected: cloud backend tests pass, including the dependent task push payload assertion.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    3. Run `ap doctor`. Expected: doctor completes OK; unrelated pre-existing warnings may be recorded if present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T07:17:42.389Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: cloud dependency projection coverage and docs passed targeted checks. Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts. Result: pass, 24 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing warnings about old task archive/branch_pr closure drift.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T07:14:16.082Z, excerpt_hash=sha256:23240ded12491f995b707bd162d5bd8c96e358289cc1b1a1ffb85ae8c080903c
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140712-154MAE-cloud-dependency-projection/.agentplane/tasks/202605140712-154MAE/blueprint/resolved-snapshot.json
    - old_digest: d13c35497a1f972552d42e122f416fe438f00619d6616264f942c89d4ef55fb3
    - current_digest: d13c35497a1f972552d42e122f416fe438f00619d6616264f942c89d4ef55fb3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605140712-154MAE
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Cloud push payload now has explicit regression coverage for a dependent task preserving depends_on; docs state GitHub blocked-by projection is visibility only.
      Impact: AgentPlane local depends_on remains lifecycle source of truth while cloud-sync can project it to GitHub native relationships.
      Resolution: Committed implementation 4da90f8b61 in task worktree.
id_source: "generated"
---
## Summary

Document cloud dependency projection

Add AgentPlane-side coverage and documentation that cloud push preserves depends_on and treats local depends_on as the source of truth for GitHub blocked-by projection.

## Scope

- In scope: Add AgentPlane-side coverage and documentation that cloud push preserves depends_on and treats local depends_on as the source of truth for GitHub blocked-by projection.
- Out of scope: unrelated refactors not required for "Document cloud dependency projection".

## Plan

1. Add a focused cloud backend unit test proving a dependent task is serialized in cloud push payload with depends_on intact. 2. Update docs/user/backends/cloud.mdx to state that GitHub Projects connected views may project AgentPlane depends_on into native GitHub blocked-by relationships while local depends_on remains the source of truth. 3. Run the targeted cloud backend test and routing/docs checks required for the touched surfaces.

## Verify Steps

1. Run `bun test packages/agentplane/src/backends/task-backend.cloud.test.ts`. Expected: cloud backend tests pass, including the dependent task push payload assertion.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
3. Run `ap doctor`. Expected: doctor completes OK; unrelated pre-existing warnings may be recorded if present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T07:17:42.389Z — VERIFY — ok

By: CODER

Note: Verified: cloud dependency projection coverage and docs passed targeted checks. Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts. Result: pass, 24 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing warnings about old task archive/branch_pr closure drift.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T07:14:16.082Z, excerpt_hash=sha256:23240ded12491f995b707bd162d5bd8c96e358289cc1b1a1ffb85ae8c080903c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140712-154MAE-cloud-dependency-projection/.agentplane/tasks/202605140712-154MAE/blueprint/resolved-snapshot.json
- old_digest: d13c35497a1f972552d42e122f416fe438f00619d6616264f942c89d4ef55fb3
- current_digest: d13c35497a1f972552d42e122f416fe438f00619d6616264f942c89d4ef55fb3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605140712-154MAE

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Cloud push payload now has explicit regression coverage for a dependent task preserving depends_on; docs state GitHub blocked-by projection is visibility only.
  Impact: AgentPlane local depends_on remains lifecycle source of truth while cloud-sync can project it to GitHub native relationships.
  Resolution: Committed implementation 4da90f8b61 in task worktree.
