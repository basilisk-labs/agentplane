---
id: "202608032116-QFBVB5"
title: "Keep frozen qualification subject clean while writing evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "qualification"
  - "release-harness"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run e2e:v0.7.1:check"
  - "node --test scripts/qualification/release-qualification.test.mjs"
  - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario matched-cli-latency,supervisor-latency --subject <frozen-sha> --out-dir .agentplane/tasks/<task-id>/evidence/self-dirty-regression"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T21:17:13.801Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T21:23:26.932Z"
  updated_by: "TESTER"
  note: "PASS. Qualification subprocesses keep the frozen subject strict while allowing only their active evidence directory; matched CLI and supervisor latency both executed and passed."
  attempts: 0
commit:
  hash: "3e51eeac9196a048955c7e56633bacd76fe317bb"
  message: "🧪 QFBVB5 task: isolate qualification evidence writes"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: nested qualification evidence is excluded from subprocess cleanliness checks without ignoring any unrelated repository change; both matched latency scenarios executed and passed from a task-local evidence directory."
events:
  -
    type: "status"
    at: "2026-08-03T21:17:30.370Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T21:23:09.722Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: nested qualification evidence is excluded from subprocess cleanliness checks without ignoring any unrelated repository change; both matched latency scenarios executed and passed from a task-local evidence directory."
  -
    type: "verify"
    at: "2026-08-03T21:23:26.932Z"
    author: "TESTER"
    state: "ok"
    note: "PASS. Qualification subprocesses keep the frozen subject strict while allowing only their active evidence directory; matched CLI and supervisor latency both executed and passed."
doc_version: 3
doc_updated_at: "2026-08-03T21:23:27.802Z"
doc_updated_by: "CODER"
description: "Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change."
sections:
  Summary: |-
    Keep frozen qualification subject clean while writing evidence

    Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.
  Scope: |-
    - In scope: Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.
    - Out of scope: unrelated refactors not required for "Keep frozen qualification subject clean while writing evidence".
  Plan: "1. Extend frozen-subject identity checks so qualification subprocesses may exclude only AGENTPLANE_QUALIFICATION_EVIDENCE_DIR when it resolves to a nested path inside the same repository; preserve fail-closed behavior for repository root, outside paths, and every unrelated tracked or untracked change. 2. Add regression coverage using a temporary Git repository: generated files under the active evidence directory do not dirty the subject, while an unrelated file still does and the default path remains strict. 3. Run the qualification contract, lint/format checks, and e2e dry-run. 4. Execute a no-provider partial audit containing matched-cli-latency and supervisor-latency with an evidence directory under the task tree; both scenarios must run instead of failing the cleanliness precondition. 5. Record verification and evaluator evidence, pass hosted checks, integrate through branch_pr, then resume the frozen release qualification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Keep frozen qualification subject clean while writing evidence". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Keep frozen qualification subject clean while writing evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T21:23:26.932Z — VERIFY — ok

    By: TESTER

    Note: PASS. Qualification subprocesses keep the frozen subject strict while allowing only their active evidence directory; matched CLI and supervisor latency both executed and passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T21:23:09.722Z, excerpt_hash=sha256:2e64d5580f9638878b47d4450f41142f03931bc02f298c97061c79393cf79faa

    Details:

    Command: node --test scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: 19 tests passed, including a temporary Git repository proving active evidence is ignored and unrelated dirt remains blocking.
    Scope: Frozen-subject cleanliness contract.

    Command: bunx eslint scripts/qualification/release-qualification.mjs scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: ESLint completed with zero errors.
    Scope: Changed qualification implementation and tests.

    Command: bun run e2e:v0.7.1:check
    Result: pass
    Evidence: Qualification contract and deterministic full dry-run passed.
    Scope: Release qualification entrypoint selection.

    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario matched-cli-latency,supervisor-latency --subject 3e51eeac9196a048955c7e56633bacd76fe317bb --out-dir .agentplane/tasks/202608032116-QFBVB5/evidence/self-dirty-regression
    Result: pass
    Evidence: Both scenarios executed; 2/2 passed with zero defects. matched-cli-latency took 107957ms and supervisor-latency 80753ms instead of failing cleanliness in under 300ms.
    Scope: Original self-dirty release-blocker reproduction.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032116-QFBVB5-keep-frozen-qualification-subject-clean-while-wr/.agentplane/tasks/202608032116-QFBVB5/blueprint/resolved-snapshot.json
    - old_digest: 19a2968207983ae5a07c5d9f450f91ee64635b2a108d4333c70d93086efaf5d9
    - current_digest: 19a2968207983ae5a07c5d9f450f91ee64635b2a108d4333c70d93086efaf5d9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032116-QFBVB5

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608032116-QFBVB5
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "50d6dcfd838dfad3268fb45b652e08f640955343"
    version: 1
id_source: "generated"
---
## Summary

Keep frozen qualification subject clean while writing evidence

Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.

## Scope

- In scope: Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.
- Out of scope: unrelated refactors not required for "Keep frozen qualification subject clean while writing evidence".

## Plan

1. Extend frozen-subject identity checks so qualification subprocesses may exclude only AGENTPLANE_QUALIFICATION_EVIDENCE_DIR when it resolves to a nested path inside the same repository; preserve fail-closed behavior for repository root, outside paths, and every unrelated tracked or untracked change. 2. Add regression coverage using a temporary Git repository: generated files under the active evidence directory do not dirty the subject, while an unrelated file still does and the default path remains strict. 3. Run the qualification contract, lint/format checks, and e2e dry-run. 4. Execute a no-provider partial audit containing matched-cli-latency and supervisor-latency with an evidence directory under the task tree; both scenarios must run instead of failing the cleanliness precondition. 5. Record verification and evaluator evidence, pass hosted checks, integrate through branch_pr, then resume the frozen release qualification.

## Verify Steps

PLANNER fallback scaffold for "Keep frozen qualification subject clean while writing evidence". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Keep frozen qualification subject clean while writing evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T21:23:26.932Z — VERIFY — ok

By: TESTER

Note: PASS. Qualification subprocesses keep the frozen subject strict while allowing only their active evidence directory; matched CLI and supervisor latency both executed and passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T21:23:09.722Z, excerpt_hash=sha256:2e64d5580f9638878b47d4450f41142f03931bc02f298c97061c79393cf79faa

Details:

Command: node --test scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: 19 tests passed, including a temporary Git repository proving active evidence is ignored and unrelated dirt remains blocking.
Scope: Frozen-subject cleanliness contract.

Command: bunx eslint scripts/qualification/release-qualification.mjs scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: ESLint completed with zero errors.
Scope: Changed qualification implementation and tests.

Command: bun run e2e:v0.7.1:check
Result: pass
Evidence: Qualification contract and deterministic full dry-run passed.
Scope: Release qualification entrypoint selection.

Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario matched-cli-latency,supervisor-latency --subject 3e51eeac9196a048955c7e56633bacd76fe317bb --out-dir .agentplane/tasks/202608032116-QFBVB5/evidence/self-dirty-regression
Result: pass
Evidence: Both scenarios executed; 2/2 passed with zero defects. matched-cli-latency took 107957ms and supervisor-latency 80753ms instead of failing cleanliness in under 300ms.
Scope: Original self-dirty release-blocker reproduction.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032116-QFBVB5-keep-frozen-qualification-subject-clean-while-wr/.agentplane/tasks/202608032116-QFBVB5/blueprint/resolved-snapshot.json
- old_digest: 19a2968207983ae5a07c5d9f450f91ee64635b2a108d4333c70d93086efaf5d9
- current_digest: 19a2968207983ae5a07c5d9f450f91ee64635b2a108d4333c70d93086efaf5d9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032116-QFBVB5

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608032116-QFBVB5
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
