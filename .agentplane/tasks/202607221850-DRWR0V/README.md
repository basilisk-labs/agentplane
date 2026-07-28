---
id: "202607221850-DRWR0V"
title: "Extract the shared typed workflow supervisor from Hermes"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 31
origin:
  system: "manual"
depends_on:
  - "202607221908-9M2FBQ"
tags:
  - "hermes"
  - "milestone-beta1"
  - "refactor"
  - "rf-09"
  - "rf-25"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T23:41:21.664Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T00:45:00.682Z"
  updated_by: "TESTER"
  note: "Rework verification passed: Knip baseline is clean after making the two audit implementation symbols module-private; targeted supervisor and Hermes tests, typecheck, guards, and formatting pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T00:45:14.195Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "2673df3ac280f981867d1e96e6682c276d4ed1d0"
  blueprint_digest: "718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102"
  evidence_refs:
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221850-DRWR0V/README.md"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-004514065-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The exact hosted Knip failure is covered locally without a baseline exception: module-private implementation symbols eliminate the two newly introduced unused-code entries while supervisor and Hermes behavior remains covered by 20 targeted tests."
commit:
  hash: "2673df3ac280f981867d1e96e6682c276d4ed1d0"
  message: "♻️ DRWR0V supervisor: remove unused audit exports"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: shared typed supervisor committed at 425ee76ab656; targeted, critical, type, lint, guard, and formatting checks passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Rework: static lint gate fixed and committed at 5daf51d4c3b9; lint report is clean."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Rework: removed the two Knip-reported unused public supervisor symbols; Knip, targeted tests, typecheck, guards, and formatting pass."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-27T23:42:49.570Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-28T00:11:23.397Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: shared typed supervisor committed at 425ee76ab656; targeted, critical, type, lint, guard, and formatting checks passed."
  -
    type: "verify"
    at: "2026-07-28T00:11:42.458Z"
    author: "TESTER"
    state: "ok"
    note: "Verified shared typed supervisor: registry-bound execution, route refresh after every attempt, and Hermes in-process runner adapter."
  -
    type: "status"
    at: "2026-07-28T00:12:35.087Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T00:18:03.113Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted verify-static found 14 ESLint violations in the RF-09 implementation and tests; no behavioral failure is reported."
  -
    type: "status"
    at: "2026-07-28T00:30:47.118Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: static lint gate fixed and committed at 5daf51d4c3b9; lint report is clean."
  -
    type: "verify"
    at: "2026-07-28T00:30:59.308Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verification passed: hosted lint findings are fixed; local ESLint summary reports 2028 files with zero errors and warnings."
  -
    type: "status"
    at: "2026-07-28T00:35:24.554Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T00:43:25.009Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted verify-static rejected two newly exported but unused workflow-supervisor symbols; no behavioral test failure is reported."
  -
    type: "status"
    at: "2026-07-28T00:44:48.497Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: removed the two Knip-reported unused public supervisor symbols; Knip, targeted tests, typecheck, guards, and formatting pass."
  -
    type: "verify"
    at: "2026-07-28T00:45:00.682Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verification passed: Knip baseline is clean after making the two audit implementation symbols module-private; targeted supervisor and Hermes tests, typecheck, guards, and formatting pass."
  -
    type: "status"
    at: "2026-07-28T00:45:37.971Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T00:45:37.971Z"
doc_updated_by: "CODER"
description: "RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution."
sections:
  Summary: |-
    Extract the shared typed workflow supervisor from Hermes

    RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution.
  Scope: |-
    - In scope: shared supervisor use case, typed operation registry/executor, state refresh after each operation, idempotency/postcondition enforcement, compatibility adapters for Hermes and CLI, uniform audit log, and hard stops for plan approval and semantic closeout.
    - Out of scope: full context/direct/branch_pr lifecycle automation, which is delivered by dependent vertical slices.
  Plan: |-
    1. Define supervisor input/output and typed operation executor ports.
    2. Move Hermes route classification and allowlisted execution onto the common reducer and registry.
    3. Execute at most one safe step, observe it, refresh state, and decide again until a typed stop.
    4. Reject raw shell strings, stale fingerprints, missing authority, plan approval, and semantic closeout.
    5. Add caller-parity, idempotency, audit, crash, and stop-condition fixtures.
  Verify Steps: |-
    1. Feed identical state through Hermes and CLI adapters. Expected: both produce the same typed step, operation result, refreshed fingerprint, and audit entry.
    2. Supply a raw shell route or unregistered operation. Expected: the supervisor rejects it before execution.
    3. Exercise approval, semantic closeout, wait, crash, and repeated-idempotency cases. Expected: bounded typed stops and no duplicated side effect.
    4. Run supervisor/Hermes/route tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T00:11:42.458Z — VERIFY — ok

    By: TESTER

    Note: Verified shared typed supervisor: registry-bound execution, route refresh after every attempt, and Hermes in-process runner adapter.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:11:23.397Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
    - old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221850-DRWR0V
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T00:18:03.113Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted verify-static found 14 ESLint violations in the RF-09 implementation and tests; no behavioral failure is reported.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:12:35.087Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
    - old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
    - diagnostic_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T00:30:59.308Z — VERIFY — ok

    By: TESTER

    Note: Rework verification passed: hosted lint findings are fixed; local ESLint summary reports 2028 files with zero errors and warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:30:47.118Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
    - old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T00:43:25.009Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted verify-static rejected two newly exported but unused workflow-supervisor symbols; no behavioral test failure is reported.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:35:24.555Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
    - old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
    - diagnostic_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T00:45:00.682Z — VERIFY — ok

    By: TESTER

    Note: Rework verification passed: Knip baseline is clean after making the two audit implementation symbols module-private; targeted supervisor and Hermes tests, typecheck, guards, and formatting pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:44:48.497Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
    - old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: |-
    - Observation: 20 targeted supervisor/Hermes tests, 11 critical CLI chunks, typecheck, lint, guards, and formatting passed.
      Impact: The supervisor rejects raw, unregistered, cross-task, stale, duplicate, approval, semantic, and wait paths before a duplicate side effect.
      Resolution: Recorded evidence in the task blueprint and removed the fixed Hermes subprocess ratchet entry.

    - Observation: GitHub Core CI verify-static failed on lint rules in Hermes runtime and supervisor tests.
      Impact: Hosted gate is red, so the task must return to implementation before integration.
      Resolution: Apply the mechanical lint fixes, rerun local lint and targeted tests, then record fresh verification.

    - Observation: 20 targeted tests, typecheck, guards, formatting, and the complete lint JSON report passed after the rework.
      Impact: The previous hosted static failure is resolved locally without changing supervisor behavior.
      Resolution: Republish the task branch and require fresh hosted checks before integration.

    - Observation: GitHub Core CI run 30317848130 reports new Knip entries for WORKFLOW_SUPERVISOR_AUDIT_SCHEMA and WorkflowSupervisorAuditEntry.
      Impact: The static gate remains red despite passing unit, critical CLI, Windows, coverage, workflow, and contract checks.
      Resolution: Remove the unnecessary public exports, rerun Knip/static verification and the targeted supervisor/Hermes tests, then publish a fresh PR head.

    - Observation: bun run knip:check; 20 targeted tests; bun run typecheck; bun run guards:check; bun run format:changed all passed.
      Impact: The previously failing hosted static condition has an exact local regression proof without changing behavior or baseline debt.
      Resolution: Run a fresh evaluator review and publish a new PR head for hosted static, unit, critical CLI, and Windows confirmation.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T23:43:01.343Z"
        authorityDigest: "sha256:dbce89022531053e8f681e2d0191c7d4fd2e95183f274c296728df6285c614f8"
        digest: "sha256:1ab233d4e140180a2f8968916b1986c45fd5605c52e58754871884baff956082"
        operationDigest: "sha256:6b9c1ca1f5682941b10ccdc69ca307304daddacd065362fcfb42a0201edda03b"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:b22bc8c8821ce72b870ffed0e117cb0fad3074f907d3fd9800411bd35c77b09d"
      -
        actor: "USER"
        at: "2026-07-28T00:12:21.822Z"
        authorityDigest: "sha256:34900186ff0753a992560c86165818abd4d1d20db45550c6ebae3cae0072feae"
        digest: "sha256:f8f3f86edc77f884fecc804ae07d80a52d15df5791f0239377ec6faf66106c22"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:1ab233d4e140180a2f8968916b1986c45fd5605c52e58754871884baff956082"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:e64979076b879a2bd00452900652e85bd6e8561a9af5c16ead952757393d159e"
      -
        actor: "USER"
        at: "2026-07-28T00:12:48.833Z"
        authorityDigest: "sha256:e36bf5eb44e2aea1513b911fcf88dbe85a4ec0adacdae8dc88dcaa775c84092f"
        digest: "sha256:0c87ee1bbadf0d8e47950fb55f27452f898b016bdf70b905e8529df92a8d9898"
        operationDigest: "sha256:b2d08dd4a33b37dcfaa85da2d690d85f1fa5167a43f34ee028eeede1d61474a2"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:f8f3f86edc77f884fecc804ae07d80a52d15df5791f0239377ec6faf66106c22"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:86b56138b056fc41de803d1cf107598b69e0ea5c5343e7da9af737a64d1a065b"
      -
        actor: "USER"
        at: "2026-07-28T00:13:28.986Z"
        authorityDigest: "sha256:a8667caf45e7d4b5a71e9c73ff5e3194670fcacca7398e9f8af990fbfb48695b"
        digest: "sha256:e955ea37268e495943b77546d90a06960882861ec428100e11b58c8051d5565f"
        operationDigest: "sha256:600af8bab3ed09dd6f165fcdd2181231017c5d50cca0e9baca0dd5faac4fcb82"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:0c87ee1bbadf0d8e47950fb55f27452f898b016bdf70b905e8529df92a8d9898"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:f5e1f84ed7836973f423cd1b916025febe1a7236b56dfb4e965e5489384da645"
      -
        actor: "USER"
        at: "2026-07-28T00:35:11.338Z"
        authorityDigest: "sha256:099e5c7eda6bd6c0ba46dbbbfe5fbc04f3efdd4c912260cac93e7e087d8e7b8e"
        digest: "sha256:ffbf95ebd3a766e073eb6cc13bd7e95e3685b375a09d4e0980bed2dcaf3e9841"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:e955ea37268e495943b77546d90a06960882861ec428100e11b58c8051d5565f"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:60ccf4df9081b6204c7fb92c0170df0f1f2f3ad58cf845352482c701d5df3948"
      -
        actor: "USER"
        at: "2026-07-28T00:35:36.261Z"
        authorityDigest: "sha256:fdbf615887fac22233294f03e87ab50eb7373a401f001af0a656adbe542e6761"
        digest: "sha256:540d436916adc9c8b6244fa4333964014bd94e2a54a2c12ca4015efecdd383e0"
        operationDigest: "sha256:b2d08dd4a33b37dcfaa85da2d690d85f1fa5167a43f34ee028eeede1d61474a2"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:ffbf95ebd3a766e073eb6cc13bd7e95e3685b375a09d4e0980bed2dcaf3e9841"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:f848d0379e70952832fd624bb319bf761de06423387b02cab4df2812e9e8939a"
      -
        actor: "USER"
        at: "2026-07-28T00:36:14.036Z"
        authorityDigest: "sha256:7788ad8e9341d9955684931cac2100228775591c1c28907572056b6cbb7f1820"
        digest: "sha256:bb8c33a2f9353816de02b5e4eed458f981a1fc2cf94253a0a8d8e165b6611040"
        operationDigest: "sha256:600af8bab3ed09dd6f165fcdd2181231017c5d50cca0e9baca0dd5faac4fcb82"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:540d436916adc9c8b6244fa4333964014bd94e2a54a2c12ca4015efecdd383e0"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:f9a9baed58e33a1e3ab71dc1015c72eb4df2d6425469f9e8a359641a93531058"
      -
        actor: "USER"
        at: "2026-07-28T00:45:25.471Z"
        authorityDigest: "sha256:cbc06e40b5b566d45eb0a4d50ff40390e3488c33fb6503113d076f8b5d0f0087"
        digest: "sha256:63be6e0f016d532a4ee2b45db2e85613c457c32622c85324e559a5b3fbf804d0"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:bb8c33a2f9353816de02b5e4eed458f981a1fc2cf94253a0a8d8e165b6611040"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:69422778af6c1f5c4deeb52797e35f368e8b482453bf3b6a8210e090c4addf5d"
      -
        actor: "USER"
        at: "2026-07-28T00:45:51.565Z"
        authorityDigest: "sha256:33adc77654d9fc8a50c9fdf3d7bd517ce7c38fbc33874f260c96e7d166ee2c94"
        digest: "sha256:d9abb902f3b4c52c55b0710bc045fe4235c7b2e1c45156814844cdae2dcb1d94"
        operationDigest: "sha256:b2d08dd4a33b37dcfaa85da2d690d85f1fa5167a43f34ee028eeede1d61474a2"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:63be6e0f016d532a4ee2b45db2e85613c457c32622c85324e559a5b3fbf804d0"
        schemaVersion: 1
        sequence: 9
        stateFingerprintDigest: "sha256:795d4626e5686301aae27cae568f5aace42d88036ec6d98a5ff7b4556cf0bb10"
      -
        actor: "USER"
        at: "2026-07-28T00:46:24.336Z"
        authorityDigest: "sha256:425491252404b6c6c41f6fd61b13bf7443f86a7b9d3e2c320fe7944e491bdaa2"
        digest: "sha256:559d77868713ff3eeab675c5e69c22ddc37419987e1a6cb9ab583880371dfbe7"
        operationDigest: "sha256:600af8bab3ed09dd6f165fcdd2181231017c5d50cca0e9baca0dd5faac4fcb82"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:d9abb902f3b4c52c55b0710bc045fe4235c7b2e1c45156814844cdae2dcb1d94"
        schemaVersion: 1
        sequence: 10
        stateFingerprintDigest: "sha256:c65606af9e3a8eda62327a2eef8d35b70ee7ed2c24da9b33fcc57e4ebcbe9740"
    grants:
      -
        actor: "USER"
        digest: "sha256:dbce89022531053e8f681e2d0191c7d4fd2e95183f274c296728df6285c614f8"
        expiresAt: "2026-07-27T23:58:01.343Z"
        id: "authority-38324f39-545f-476a-bf03-cadaeed06fb9"
        issuedAt: "2026-07-27T23:43:01.343Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:6b9c1ca1f5682941b10ccdc69ca307304daddacd065362fcfb42a0201edda03b"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:b22bc8c8821ce72b870ffed0e117cb0fad3074f907d3fd9800411bd35c77b09d"
        stateScopeDigest: "sha256:b6760c538c90412a2b37ffe3bf7cafe86ae74d7a9eb29334c61e5b2d55cad55f"
      -
        actor: "USER"
        digest: "sha256:34900186ff0753a992560c86165818abd4d1d20db45550c6ebae3cae0072feae"
        expiresAt: "2026-07-28T00:27:21.822Z"
        id: "authority-05169555-9bdb-4dfc-8c5e-8604182dbdca"
        issuedAt: "2026-07-28T00:12:21.822Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e64979076b879a2bd00452900652e85bd6e8561a9af5c16ead952757393d159e"
        stateScopeDigest: "sha256:88d9827ae1e5f9da98ff77ab4c4657fa2dd9e9a5cbe246c84d937df11b203624"
      -
        actor: "USER"
        digest: "sha256:e36bf5eb44e2aea1513b911fcf88dbe85a4ec0adacdae8dc88dcaa775c84092f"
        expiresAt: "2026-07-28T00:27:48.833Z"
        id: "authority-9bd821b5-771a-4c5d-94f1-9db0ef0da14c"
        issuedAt: "2026-07-28T00:12:48.833Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:b2d08dd4a33b37dcfaa85da2d690d85f1fa5167a43f34ee028eeede1d61474a2"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:86b56138b056fc41de803d1cf107598b69e0ea5c5343e7da9af737a64d1a065b"
        stateScopeDigest: "sha256:12ed97b186c1232ab975e13e3830bef04269ae6e8ab7cb887036f7bcd2fdb5be"
      -
        actor: "USER"
        digest: "sha256:a8667caf45e7d4b5a71e9c73ff5e3194670fcacca7398e9f8af990fbfb48695b"
        expiresAt: "2026-07-28T00:28:28.986Z"
        id: "authority-82a8bc04-efb1-406e-831a-9e123ae99507"
        issuedAt: "2026-07-28T00:13:28.986Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:600af8bab3ed09dd6f165fcdd2181231017c5d50cca0e9baca0dd5faac4fcb82"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f5e1f84ed7836973f423cd1b916025febe1a7236b56dfb4e965e5489384da645"
        stateScopeDigest: "sha256:5a716797b6800d9c083cf048a2ee07b135f6b06fa4f7a032858222de3009eeef"
      -
        actor: "USER"
        digest: "sha256:099e5c7eda6bd6c0ba46dbbbfe5fbc04f3efdd4c912260cac93e7e087d8e7b8e"
        expiresAt: "2026-07-28T00:50:11.338Z"
        id: "authority-ba54e910-faca-4574-be4a-e1c57cb72362"
        issuedAt: "2026-07-28T00:35:11.338Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:60ccf4df9081b6204c7fb92c0170df0f1f2f3ad58cf845352482c701d5df3948"
        stateScopeDigest: "sha256:06ea6565fbe6169dcb7be75d923f66f6703d8716fbfab5739b7befb28551e79b"
      -
        actor: "USER"
        digest: "sha256:fdbf615887fac22233294f03e87ab50eb7373a401f001af0a656adbe542e6761"
        expiresAt: "2026-07-28T00:50:36.261Z"
        id: "authority-e194362b-a4a3-4787-ac5c-ca70142f73a7"
        issuedAt: "2026-07-28T00:35:36.261Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:b2d08dd4a33b37dcfaa85da2d690d85f1fa5167a43f34ee028eeede1d61474a2"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f848d0379e70952832fd624bb319bf761de06423387b02cab4df2812e9e8939a"
        stateScopeDigest: "sha256:0c2a61b8bf586561c5f23663aec856c80e1327c5b8db45ea4cf2f82714489b08"
      -
        actor: "USER"
        digest: "sha256:7788ad8e9341d9955684931cac2100228775591c1c28907572056b6cbb7f1820"
        expiresAt: "2026-07-28T00:51:14.036Z"
        id: "authority-3b802e2c-21c7-4439-b5d9-e56d2979d3e6"
        issuedAt: "2026-07-28T00:36:14.036Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:600af8bab3ed09dd6f165fcdd2181231017c5d50cca0e9baca0dd5faac4fcb82"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f9a9baed58e33a1e3ab71dc1015c72eb4df2d6425469f9e8a359641a93531058"
        stateScopeDigest: "sha256:30eaa0e6709ac87a8bfef88eb8ab43e434f9508195f8189d7e5395a5261e359b"
      -
        actor: "USER"
        digest: "sha256:cbc06e40b5b566d45eb0a4d50ff40390e3488c33fb6503113d076f8b5d0f0087"
        expiresAt: "2026-07-28T01:00:25.471Z"
        id: "authority-13ac31f9-07f2-4cc3-8476-34aebbfe2a75"
        issuedAt: "2026-07-28T00:45:25.471Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:69422778af6c1f5c4deeb52797e35f368e8b482453bf3b6a8210e090c4addf5d"
        stateScopeDigest: "sha256:6e6b2ef0d15159727c87144767232ab2b28f351beb690dc0cfc4857fc275bdc4"
      -
        actor: "USER"
        digest: "sha256:33adc77654d9fc8a50c9fdf3d7bd517ce7c38fbc33874f260c96e7d166ee2c94"
        expiresAt: "2026-07-28T01:00:51.565Z"
        id: "authority-5334ff64-ad4f-41a8-b9a8-920b497543dd"
        issuedAt: "2026-07-28T00:45:51.565Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:b2d08dd4a33b37dcfaa85da2d690d85f1fa5167a43f34ee028eeede1d61474a2"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:795d4626e5686301aae27cae568f5aace42d88036ec6d98a5ff7b4556cf0bb10"
        stateScopeDigest: "sha256:452da220a46cdabbd783cb93613a46d8204534ec81a1dc34d71c507fcea5c95f"
      -
        actor: "USER"
        digest: "sha256:425491252404b6c6c41f6fd61b13bf7443f86a7b9d3e2c320fe7944e491bdaa2"
        expiresAt: "2026-07-28T01:01:24.336Z"
        id: "authority-a48729bc-c77a-45a2-8420-d835468aeb4b"
        issuedAt: "2026-07-28T00:46:24.336Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:600af8bab3ed09dd6f165fcdd2181231017c5d50cca0e9baca0dd5faac4fcb82"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c65606af9e3a8eda62327a2eef8d35b70ee7ed2c24da9b33fcc57e4ebcbe9740"
        stateScopeDigest: "sha256:6d3ea5e21cb40c8509099c2f66e44a029c5ac293d6e32a6a60f546fbf5f0fa3f"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "2d6582e7f017820668cbbbbe90c211e360e47394"
    version: 1
id_source: "generated"
---
## Summary

Extract the shared typed workflow supervisor from Hermes

RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution.

## Scope

- In scope: shared supervisor use case, typed operation registry/executor, state refresh after each operation, idempotency/postcondition enforcement, compatibility adapters for Hermes and CLI, uniform audit log, and hard stops for plan approval and semantic closeout.
- Out of scope: full context/direct/branch_pr lifecycle automation, which is delivered by dependent vertical slices.

## Plan

1. Define supervisor input/output and typed operation executor ports.
2. Move Hermes route classification and allowlisted execution onto the common reducer and registry.
3. Execute at most one safe step, observe it, refresh state, and decide again until a typed stop.
4. Reject raw shell strings, stale fingerprints, missing authority, plan approval, and semantic closeout.
5. Add caller-parity, idempotency, audit, crash, and stop-condition fixtures.

## Verify Steps

1. Feed identical state through Hermes and CLI adapters. Expected: both produce the same typed step, operation result, refreshed fingerprint, and audit entry.
2. Supply a raw shell route or unregistered operation. Expected: the supervisor rejects it before execution.
3. Exercise approval, semantic closeout, wait, crash, and repeated-idempotency cases. Expected: bounded typed stops and no duplicated side effect.
4. Run supervisor/Hermes/route tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T00:11:42.458Z — VERIFY — ok

By: TESTER

Note: Verified shared typed supervisor: registry-bound execution, route refresh after every attempt, and Hermes in-process runner adapter.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:11:23.397Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
- old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221850-DRWR0V
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T00:18:03.113Z — VERIFY — needs_rework

By: TESTER

Note: Hosted verify-static found 14 ESLint violations in the RF-09 implementation and tests; no behavioral failure is reported.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:12:35.087Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
- old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
- diagnostic_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T00:30:59.308Z — VERIFY — ok

By: TESTER

Note: Rework verification passed: hosted lint findings are fixed; local ESLint summary reports 2028 files with zero errors and warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:30:47.118Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
- old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T00:43:25.009Z — VERIFY — needs_rework

By: TESTER

Note: Hosted verify-static rejected two newly exported but unused workflow-supervisor symbols; no behavioral test failure is reported.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:35:24.555Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
- old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
- diagnostic_command: agentplane task next-action 202607221850-DRWR0V --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T00:45:00.682Z — VERIFY — ok

By: TESTER

Note: Rework verification passed: Knip baseline is clean after making the two audit implementation symbols module-private; targeted supervisor and Hermes tests, typecheck, guards, and formatting pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:44:48.497Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
- old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings

- Observation: 20 targeted supervisor/Hermes tests, 11 critical CLI chunks, typecheck, lint, guards, and formatting passed.
  Impact: The supervisor rejects raw, unregistered, cross-task, stale, duplicate, approval, semantic, and wait paths before a duplicate side effect.
  Resolution: Recorded evidence in the task blueprint and removed the fixed Hermes subprocess ratchet entry.

- Observation: GitHub Core CI verify-static failed on lint rules in Hermes runtime and supervisor tests.
  Impact: Hosted gate is red, so the task must return to implementation before integration.
  Resolution: Apply the mechanical lint fixes, rerun local lint and targeted tests, then record fresh verification.

- Observation: 20 targeted tests, typecheck, guards, formatting, and the complete lint JSON report passed after the rework.
  Impact: The previous hosted static failure is resolved locally without changing supervisor behavior.
  Resolution: Republish the task branch and require fresh hosted checks before integration.

- Observation: GitHub Core CI run 30317848130 reports new Knip entries for WORKFLOW_SUPERVISOR_AUDIT_SCHEMA and WorkflowSupervisorAuditEntry.
  Impact: The static gate remains red despite passing unit, critical CLI, Windows, coverage, workflow, and contract checks.
  Resolution: Remove the unnecessary public exports, rerun Knip/static verification and the targeted supervisor/Hermes tests, then publish a fresh PR head.

- Observation: bun run knip:check; 20 targeted tests; bun run typecheck; bun run guards:check; bun run format:changed all passed.
  Impact: The previously failing hosted static condition has an exact local regression proof without changing behavior or baseline debt.
  Resolution: Run a fresh evaluator review and publish a new PR head for hosted static, unit, critical CLI, and Windows confirmation.
