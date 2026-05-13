---
id: "202605131635-W0735P"
title: "Align branch_pr command order guidance"
status: "DOING"
priority: "med"
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
  updated_at: "2026-05-13T16:36:01.259Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T16:48:16.298Z"
  updated_by: "CODER"
  note: "Command-order guidance aligned and focused checks passed: policy routing OK, doctor OK, focused command-guide/blueprint/policy-routing tests passed, builtin assets fresh, formatting passed, blueprint snapshot current."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Align branch_pr command-order guidance across gateway docs, quickstart source, user docs, and blueprint routes while leaving cleanup command references unchanged."
events:
  -
    type: "status"
    at: "2026-05-13T16:36:18.748Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Align branch_pr command-order guidance across gateway docs, quickstart source, user docs, and blueprint routes while leaving cleanup command references unchanged."
  -
    type: "verify"
    at: "2026-05-13T16:48:16.298Z"
    author: "CODER"
    state: "ok"
    note: "Command-order guidance aligned and focused checks passed: policy routing OK, doctor OK, focused command-guide/blueprint/policy-routing tests passed, builtin assets fresh, formatting passed, blueprint snapshot current."
doc_version: 3
doc_updated_at: "2026-05-13T16:48:16.311Z"
doc_updated_by: "CODER"
description: "Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request."
sections:
  Summary: |-
    Align branch_pr command order guidance
    
    Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.
  Scope: |-
    - In scope: Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.
    - Out of scope: unrelated refactors not required for "Align branch_pr command order guidance".
  Plan: "1. Align branch_pr lifecycle guidance in AGENTS.md and user docs so start-ready, implementation commit, PR artifact sync, verify, hosted checks, integrate, and finish appear in the same order as workflow.branch_pr.md. 2. Update installed quickstart command guidance so the demo plan is approved before start-ready. 3. Correct blueprint branch_pr routes so verify_record precedes publish_or_integrate. 4. Do not change cleanup command references. 5. Verify with targeted tests/checks for policy routing, blueprint/help drift, and task verify-show."
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
    2. Run focused blueprint tests covering code.branch_pr route order. Expected: verify_record precedes publish_or_integrate and tests pass.
    3. Run focused CLI/help tests or equivalent targeted validation for quickstart branch_pr command-order guidance. Expected: quickstart demo includes plan approval before start-ready and no docs/help route instructs manual GitHub PR creation after normal pr open.
    4. Run agentplane task verify-show 202605131635-W0735P before recording verification. Expected: the task verification contract is readable.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T16:48:16.298Z — VERIFY — ok
    
    By: CODER
    
    Note: Command-order guidance aligned and focused checks passed: policy routing OK, doctor OK, focused command-guide/blueprint/policy-routing tests passed, builtin assets fresh, formatting passed, blueprint snapshot current.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:36:18.748Z, excerpt_hash=sha256:e93b7ad5f25d38e40fdeaa4c141b45a4c902ea6f7ce57ebc8c8c5595276ca1ac
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131635-W0735P-command-order-guidance/.agentplane/tasks/202605131635-W0735P/blueprint/resolved-snapshot.json
    - old_digest: c2e0b6bfc190bcdf7e34b78fe99b359b7b7793352acebd24255de2eb2ec6a180
    - current_digest: c2e0b6bfc190bcdf7e34b78fe99b359b7b7793352acebd24255de2eb2ec6a180
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131635-W0735P
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: A first Vitest invocation was too broad and ran the whole agentplane project; it failed on unrelated release/compiled-smoke dependency resolution while the relevant blueprint test had already passed.
      Impact: No task-scope regression evidence; the invalid run was replaced by a focused three-file Vitest command that passed.
      Resolution: Use the focused command recorded in Verification for this task scope; do not treat the broad run as the acceptance gate.
id_source: "generated"
---
## Summary

Align branch_pr command order guidance

Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.

## Scope

- In scope: Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.
- Out of scope: unrelated refactors not required for "Align branch_pr command order guidance".

## Plan

1. Align branch_pr lifecycle guidance in AGENTS.md and user docs so start-ready, implementation commit, PR artifact sync, verify, hosted checks, integrate, and finish appear in the same order as workflow.branch_pr.md. 2. Update installed quickstart command guidance so the demo plan is approved before start-ready. 3. Correct blueprint branch_pr routes so verify_record precedes publish_or_integrate. 4. Do not change cleanup command references. 5. Verify with targeted tests/checks for policy routing, blueprint/help drift, and task verify-show.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
2. Run focused blueprint tests covering code.branch_pr route order. Expected: verify_record precedes publish_or_integrate and tests pass.
3. Run focused CLI/help tests or equivalent targeted validation for quickstart branch_pr command-order guidance. Expected: quickstart demo includes plan approval before start-ready and no docs/help route instructs manual GitHub PR creation after normal pr open.
4. Run agentplane task verify-show 202605131635-W0735P before recording verification. Expected: the task verification contract is readable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T16:48:16.298Z — VERIFY — ok

By: CODER

Note: Command-order guidance aligned and focused checks passed: policy routing OK, doctor OK, focused command-guide/blueprint/policy-routing tests passed, builtin assets fresh, formatting passed, blueprint snapshot current.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:36:18.748Z, excerpt_hash=sha256:e93b7ad5f25d38e40fdeaa4c141b45a4c902ea6f7ce57ebc8c8c5595276ca1ac

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131635-W0735P-command-order-guidance/.agentplane/tasks/202605131635-W0735P/blueprint/resolved-snapshot.json
- old_digest: c2e0b6bfc190bcdf7e34b78fe99b359b7b7793352acebd24255de2eb2ec6a180
- current_digest: c2e0b6bfc190bcdf7e34b78fe99b359b7b7793352acebd24255de2eb2ec6a180
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131635-W0735P

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: A first Vitest invocation was too broad and ran the whole agentplane project; it failed on unrelated release/compiled-smoke dependency resolution while the relevant blueprint test had already passed.
  Impact: No task-scope regression evidence; the invalid run was replaced by a focused three-file Vitest command that passed.
  Resolution: Use the focused command recorded in Verification for this task scope; do not treat the broad run as the acceptance gate.
