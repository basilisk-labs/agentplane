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
  updated_at: "2026-05-13T17:01:21.795Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T17:12:26.420Z"
  updated_by: "CODER"
  note: "Expanded lifecycle contract work verified: workflow lifecycle parity checker passes in workflows:command-check, focused Vitest passes, typecheck passes, policy routing OK, doctor OK, builtin assets fresh, formatting passed, verify-show current."
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
  -
    type: "verify"
    at: "2026-05-13T17:12:26.420Z"
    author: "CODER"
    state: "ok"
    note: "Expanded lifecycle contract work verified: workflow lifecycle parity checker passes in workflows:command-check, focused Vitest passes, typecheck passes, policy routing OK, doctor OK, builtin assets fresh, formatting passed, verify-show current."
doc_version: 3
doc_updated_at: "2026-05-13T17:12:26.446Z"
doc_updated_by: "CODER"
description: "Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request."
sections:
  Summary: |-
    Align branch_pr command order guidance
    
    Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.
  Scope: |-
    - In scope: Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.
    - Out of scope: unrelated refactors not required for "Align branch_pr command order guidance".
  Plan: "Expanded scope approved by user: 1. Keep the already committed command-order guidance fix. 2. Add a typed lifecycle contract for branch_pr and direct workflows covering ordered phases, command snippets, side effects, cwd owner, and role ownership. 3. Reuse that contract from blueprint route definitions where practical so branch_pr/direct blueprint order cannot drift silently. 4. Add a semantic lifecycle parity checker to workflow lint/CI that compares the typed contract against blueprint order, quickstart guidance, AGENTS gateway, and current docs snippets for branch_pr and direct order-sensitive commands. 5. Add focused tests for the lifecycle contract and checker. 6. Document the lifecycle contract/parity model without changing cleanup command references."
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
    2. Run bun run workflows:command-check. Expected: workflow command contract and lifecycle parity checks pass.
    3. Run focused Vitest for command guide, blueprint validation, and lifecycle parity checker. Expected: tests pass and cover branch_pr/direct lifecycle order.
    4. Run bun run assets:builtin:check after generated assets refresh. Expected: builtin asset table is fresh.
    5. Run ap doctor. Expected: doctor OK.
    6. Run ap task verify-show 202605131635-W0735P before recording verification. Expected: task verification contract and blueprint snapshot are current.
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
    
    ### 2026-05-13T17:12:26.420Z — VERIFY — ok
    
    By: CODER
    
    Note: Expanded lifecycle contract work verified: workflow lifecycle parity checker passes in workflows:command-check, focused Vitest passes, typecheck passes, policy routing OK, doctor OK, builtin assets fresh, formatting passed, verify-show current.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:01:12.577Z, excerpt_hash=sha256:65a5b2ab7b7e18aa7dd80c03a6f614f26c62d91bbc02a4845c97fc02e1beca87
    
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
    
    - Observation: The branch_pr and direct code workflow order is now represented in packages/agentplane/src/workflow-lifecycle/contract.ts and checked by scripts/checks/check-lifecycle-parity.ts.
      Impact: Blueprint route order, quickstart guidance, gateway blocks, and current workflow docs now have a semantic parity gate instead of relying on manual review.
      Resolution: workflows:command-check runs the lifecycle parity checker; focused tests cover contract route order and drift detection.
id_source: "generated"
---
## Summary

Align branch_pr command order guidance

Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.

## Scope

- In scope: Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.
- Out of scope: unrelated refactors not required for "Align branch_pr command order guidance".

## Plan

Expanded scope approved by user: 1. Keep the already committed command-order guidance fix. 2. Add a typed lifecycle contract for branch_pr and direct workflows covering ordered phases, command snippets, side effects, cwd owner, and role ownership. 3. Reuse that contract from blueprint route definitions where practical so branch_pr/direct blueprint order cannot drift silently. 4. Add a semantic lifecycle parity checker to workflow lint/CI that compares the typed contract against blueprint order, quickstart guidance, AGENTS gateway, and current docs snippets for branch_pr and direct order-sensitive commands. 5. Add focused tests for the lifecycle contract and checker. 6. Document the lifecycle contract/parity model without changing cleanup command references.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
2. Run bun run workflows:command-check. Expected: workflow command contract and lifecycle parity checks pass.
3. Run focused Vitest for command guide, blueprint validation, and lifecycle parity checker. Expected: tests pass and cover branch_pr/direct lifecycle order.
4. Run bun run assets:builtin:check after generated assets refresh. Expected: builtin asset table is fresh.
5. Run ap doctor. Expected: doctor OK.
6. Run ap task verify-show 202605131635-W0735P before recording verification. Expected: task verification contract and blueprint snapshot are current.

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

### 2026-05-13T17:12:26.420Z — VERIFY — ok

By: CODER

Note: Expanded lifecycle contract work verified: workflow lifecycle parity checker passes in workflows:command-check, focused Vitest passes, typecheck passes, policy routing OK, doctor OK, builtin assets fresh, formatting passed, verify-show current.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:01:12.577Z, excerpt_hash=sha256:65a5b2ab7b7e18aa7dd80c03a6f614f26c62d91bbc02a4845c97fc02e1beca87

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

- Observation: The branch_pr and direct code workflow order is now represented in packages/agentplane/src/workflow-lifecycle/contract.ts and checked by scripts/checks/check-lifecycle-parity.ts.
  Impact: Blueprint route order, quickstart guidance, gateway blocks, and current workflow docs now have a semantic parity gate instead of relying on manual review.
  Resolution: workflows:command-check runs the lifecycle parity checker; focused tests cover contract route order and drift detection.
