---
id: "202607281227-GX5NVT"
title: "Handle evaluator stdin EPIPE without unhandled CI failures"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T12:28:08.182Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T12:41:39.128Z"
  updated_by: "TESTER"
  note: "Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts; Result: pass (2 files, 5 tests), deterministic EPIPE becomes stdin_write_failure with no unhandled error. Command: bun run typecheck; Result: pass. Command: bun run test:fast; Result: pass (480 files, 3345 tests) with no unhandled errors. Scope: evaluator stdin dispatch and repository fast regression suite. Residual risk: hosted PR verification remains required."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-28T12:42:44.963Z"
  updated_by: "HUMAN"
  note: "The evaluator stdin failure is now handled as a typed provider failure, preserving deterministic task failure rather than letting a stream error escape Vitest."
  evaluated_sha: "e8d2650798209554d4519eddcd9aba9999c34fd2"
  blueprint_digest: "01e50c6e6be52a0e7a2cebf32aa6f8a3d70ea438ee9bcb35e88fc07149a779b2"
  evidence_refs:
    - ".agentplane/tasks/202607281227-GX5NVT/quality/20260728-124244854-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607281227-GX5NVT/quality/20260728-124244854-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607281227-GX5NVT/quality/20260728-124244854-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607281227-GX5NVT/quality/20260728-124244854-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607281227-GX5NVT/README.md"
    - ".agentplane/tasks/202607281227-GX5NVT/quality/20260728-124244854-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607281227-GX5NVT/quality/20260728-124244854-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607281227-GX5NVT/quality/20260728-124244854-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "packages/agentplane/src/commands/evaluator/evaluator-episode.ts"
    - "packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts"
  findings:
    - "Reviewed the close/error ordering: stdin errors are observed before prompt dispatch completion, terminate an unusable child, and are converted on close to stdin_write_failure with exit and signal metadata."
    - "Reviewed regression coverage: the mocked child emits EPIPE before close; the test requires a typed failure and proves the error listener prevents an unhandled stream error."
commit:
  hash: "3ed27b61ad5a6dcf754a3f1cea51654ee3a1d20e"
  message: "🧩 GX5NVT task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented typed stdin_write_failure handling for evaluator prompt dispatch; added deterministic EPIPE regression coverage. Checks: focused evaluator tests, bun run typecheck, and bun run test:fast (480 files, 3345 tests) passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-28T12:28:33.621Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-28T12:38:37.402Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented typed stdin_write_failure handling for evaluator prompt dispatch; added deterministic EPIPE regression coverage. Checks: focused evaluator tests, bun run typecheck, and bun run test:fast (480 files, 3345 tests) passed."
  -
    type: "verify"
    at: "2026-07-28T12:41:39.128Z"
    author: "TESTER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts; Result: pass (2 files, 5 tests), deterministic EPIPE becomes stdin_write_failure with no unhandled error. Command: bun run typecheck; Result: pass. Command: bun run test:fast; Result: pass (480 files, 3345 tests) with no unhandled errors. Scope: evaluator stdin dispatch and repository fast regression suite. Residual risk: hosted PR verification remains required."
  -
    type: "status"
    at: "2026-07-28T12:43:06.800Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T12:43:06.800Z"
doc_updated_by: "CODER"
description: "Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test."
sections:
  Summary: |-
    Handle evaluator stdin EPIPE without unhandled CI failures

    Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.
  Scope: |-
    - In scope: Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.
    - Out of scope: unrelated refactors not required for "Handle evaluator stdin EPIPE without unhandled CI failures".
  Plan: "1. Add a deterministic regression case for evaluator stdin closing during prompt dispatch. 2. Make the evaluator subprocess boundary consume or classify EPIPE without producing an unhandled exception, while preserving the provider failure receipt. 3. Run focused evaluator tests, typecheck, and the fast unit suite; record the GitHub CI result."
  Verify Steps: "1. Run the focused evaluator execution test, including a regression where stdin closes before or during prompt dispatch; expected: a structured provider failure is recorded and Vitest reports no unhandled EPIPE. 2. Run bun run typecheck; expected: pass. 3. Run bun run test:fast; expected: pass with zero unhandled errors. 4. Confirm the hosted PR Core CI reports a successful PR verification check."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T12:41:39.128Z — VERIFY — ok

    By: TESTER

    Note: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts; Result: pass (2 files, 5 tests), deterministic EPIPE becomes stdin_write_failure with no unhandled error. Command: bun run typecheck; Result: pass. Command: bun run test:fast; Result: pass (480 files, 3345 tests) with no unhandled errors. Scope: evaluator stdin dispatch and repository fast regression suite. Residual risk: hosted PR verification remains required.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T12:38:37.402Z, excerpt_hash=sha256:bb27b7ebf1532c4b788e6e4b3d89b32550af50dc75ed49c19e6f7af9ba3adc28

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281227-GX5NVT-handle-evaluator-stdin-epipe-without-unhandled-c/.agentplane/tasks/202607281227-GX5NVT/blueprint/resolved-snapshot.json
    - old_digest: 01e50c6e6be52a0e7a2cebf32aa6f8a3d70ea438ee9bcb35e88fc07149a779b2
    - current_digest: 01e50c6e6be52a0e7a2cebf32aa6f8a3d70ea438ee9bcb35e88fc07149a779b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281227-GX5NVT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607281227-GX5NVT
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
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T12:28:47.568Z"
        authorityDigest: "sha256:87554586ecab56011f5c7cb7b3590988df9cba49a0e456965c392368baf7165c"
        digest: "sha256:3ea3e725b0f326ac2ff2cfabd5689de89cf5180063daef26c4793659aded3851"
        operationDigest: "sha256:bf1c8a0147e12630d11b9b29faed5761f00e7e1e594edc6daae4c8410c98d011"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:a9d871cc1b56afec4b597d7e311f0e8e1f9d89e47f86c8deaea2cad0dc21ed72"
      -
        actor: "USER"
        at: "2026-07-28T12:42:55.099Z"
        authorityDigest: "sha256:b28d4876932b346c9e13ee6fcc38247d7824129fe2cdff353efbdb01bddea9e7"
        digest: "sha256:50204b0aa1f968668a69b0939a083d8775a039db037d7a8c10df015d3c6617e1"
        operationDigest: "sha256:936e424c3502864619baa31b9a6b4b99135df7708e0cc55d3f6a991222fe2913"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:3ea3e725b0f326ac2ff2cfabd5689de89cf5180063daef26c4793659aded3851"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:9c4a6c3585819d9483f829bb534a3c7bc1f8038f955863904ab7f401e0ed1929"
      -
        actor: "USER"
        at: "2026-07-28T12:43:54.604Z"
        authorityDigest: "sha256:fb7d9d6fa6d7327bd5ce3754e3447c75042365d130ec9be1ce9266a5779ef4b3"
        digest: "sha256:f43537c05254458957c51bac40c45b3d85adaa415dcb45ebfac3b85cccc2864a"
        operationDigest: "sha256:ba3b779cb371bcdc107919285050cf454d0a8684eed8f631507b9ed88b5baa11"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:50204b0aa1f968668a69b0939a083d8775a039db037d7a8c10df015d3c6617e1"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:b2a10ca99c68dfbbea2a1146b394cd2dc44043f9e862f930c41ed78c924aec66"
      -
        actor: "USER"
        at: "2026-07-28T12:44:21.419Z"
        authorityDigest: "sha256:54a5f37dd51846359ebbbba9e3d5fb7b2787a9118c04ad1cc7c2d80183d5eb15"
        digest: "sha256:3618cb3fe490867eb949721def08cf83dcfa8acbff4e21d9dbfdaef0a3b1e476"
        operationDigest: "sha256:12bfb39650d80bd6fa462fc02a8910a39b5e994d6917e79382042efd70aa728b"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:f43537c05254458957c51bac40c45b3d85adaa415dcb45ebfac3b85cccc2864a"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:398c8fd99c7f316bcdb19f4726ed798a4997b666284c44b2c4e6e8f4d3080663"
      -
        actor: "USER"
        at: "2026-07-28T12:44:57.292Z"
        authorityDigest: "sha256:7b73ee04d51f8cf5dde2caf02238665ec4c8e5ccecec3ab1653f9bcd697b02bd"
        digest: "sha256:2144b7b141fe870dce9bf6af9c7efd74930d426139b6949893639df18d9a3600"
        operationDigest: "sha256:30aff1396e24abf5cd1d3ba5f27e830344565b3675ce5f02782d3ca175c4a725"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:3618cb3fe490867eb949721def08cf83dcfa8acbff4e21d9dbfdaef0a3b1e476"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:854e0d065abac2c53746f27acf22d58ac3c6e75be0166980177a06c8484a76c8"
    grants:
      -
        actor: "USER"
        digest: "sha256:87554586ecab56011f5c7cb7b3590988df9cba49a0e456965c392368baf7165c"
        expiresAt: "2026-07-28T12:43:47.568Z"
        id: "authority-d5e36611-8107-4da1-93c2-c3124ec50104"
        issuedAt: "2026-07-28T12:28:47.568Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:bf1c8a0147e12630d11b9b29faed5761f00e7e1e594edc6daae4c8410c98d011"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:a9d871cc1b56afec4b597d7e311f0e8e1f9d89e47f86c8deaea2cad0dc21ed72"
        stateScopeDigest: "sha256:f1264e917bfe98421ab2370cf31a492aac5583479cdf8c992949ae3252f1936c"
      -
        actor: "USER"
        digest: "sha256:b28d4876932b346c9e13ee6fcc38247d7824129fe2cdff353efbdb01bddea9e7"
        expiresAt: "2026-07-28T12:57:55.099Z"
        id: "authority-0b175c47-2168-450f-a33f-a82d0b3511a8"
        issuedAt: "2026-07-28T12:42:55.099Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:936e424c3502864619baa31b9a6b4b99135df7708e0cc55d3f6a991222fe2913"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:9c4a6c3585819d9483f829bb534a3c7bc1f8038f955863904ab7f401e0ed1929"
        stateScopeDigest: "sha256:4efaa023bb3508066c2f84cac092976b44a433f18eb0bf870e5b285bb7cd01db"
      -
        actor: "USER"
        digest: "sha256:fb7d9d6fa6d7327bd5ce3754e3447c75042365d130ec9be1ce9266a5779ef4b3"
        expiresAt: "2026-07-28T12:58:54.604Z"
        id: "authority-3363344d-11f0-4faf-8e4d-4e2dd77376d3"
        issuedAt: "2026-07-28T12:43:54.604Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:ba3b779cb371bcdc107919285050cf454d0a8684eed8f631507b9ed88b5baa11"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:b2a10ca99c68dfbbea2a1146b394cd2dc44043f9e862f930c41ed78c924aec66"
        stateScopeDigest: "sha256:47d2f3c8dadadf36e084bdcf24eedc1155705b8ce53dac68c9dc798e3c704011"
      -
        actor: "USER"
        digest: "sha256:54a5f37dd51846359ebbbba9e3d5fb7b2787a9118c04ad1cc7c2d80183d5eb15"
        expiresAt: "2026-07-28T12:59:21.419Z"
        id: "authority-5273298d-3da0-4d2e-a48b-743cb5b6c9e0"
        issuedAt: "2026-07-28T12:44:21.419Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:12bfb39650d80bd6fa462fc02a8910a39b5e994d6917e79382042efd70aa728b"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:398c8fd99c7f316bcdb19f4726ed798a4997b666284c44b2c4e6e8f4d3080663"
        stateScopeDigest: "sha256:5fedf2cb8f175ea5c81f5f38edcd70d8e3049f90eed9d79a585fac902c7d172c"
      -
        actor: "USER"
        digest: "sha256:7b73ee04d51f8cf5dde2caf02238665ec4c8e5ccecec3ab1653f9bcd697b02bd"
        expiresAt: "2026-07-28T12:59:57.292Z"
        id: "authority-d630413a-0528-486d-a866-eaf26247e215"
        issuedAt: "2026-07-28T12:44:57.292Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:30aff1396e24abf5cd1d3ba5f27e830344565b3675ce5f02782d3ca175c4a725"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:854e0d065abac2c53746f27acf22d58ac3c6e75be0166980177a06c8484a76c8"
        stateScopeDigest: "sha256:0766c502d5459f32909fcd44e1525ba060c2b22dc672591cf0a3905b57f8687a"
    schemaVersion: 1
  implementation_commit:
    hash: "e8d2650798209554d4519eddcd9aba9999c34fd2"
    message: "🚧 GX5NVT task: handle closed evaluator stdin"
  workflow_route_baseline:
    start_head_sha: "47213e98e23ec136566a31bb1ef6c44f16d64690"
    version: 1
id_source: "generated"
---
## Summary

Handle evaluator stdin EPIPE without unhandled CI failures

Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.

## Scope

- In scope: Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.
- Out of scope: unrelated refactors not required for "Handle evaluator stdin EPIPE without unhandled CI failures".

## Plan

1. Add a deterministic regression case for evaluator stdin closing during prompt dispatch. 2. Make the evaluator subprocess boundary consume or classify EPIPE without producing an unhandled exception, while preserving the provider failure receipt. 3. Run focused evaluator tests, typecheck, and the fast unit suite; record the GitHub CI result.

## Verify Steps

1. Run the focused evaluator execution test, including a regression where stdin closes before or during prompt dispatch; expected: a structured provider failure is recorded and Vitest reports no unhandled EPIPE. 2. Run bun run typecheck; expected: pass. 3. Run bun run test:fast; expected: pass with zero unhandled errors. 4. Confirm the hosted PR Core CI reports a successful PR verification check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T12:41:39.128Z — VERIFY — ok

By: TESTER

Note: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts; Result: pass (2 files, 5 tests), deterministic EPIPE becomes stdin_write_failure with no unhandled error. Command: bun run typecheck; Result: pass. Command: bun run test:fast; Result: pass (480 files, 3345 tests) with no unhandled errors. Scope: evaluator stdin dispatch and repository fast regression suite. Residual risk: hosted PR verification remains required.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T12:38:37.402Z, excerpt_hash=sha256:bb27b7ebf1532c4b788e6e4b3d89b32550af50dc75ed49c19e6f7af9ba3adc28

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281227-GX5NVT-handle-evaluator-stdin-epipe-without-unhandled-c/.agentplane/tasks/202607281227-GX5NVT/blueprint/resolved-snapshot.json
- old_digest: 01e50c6e6be52a0e7a2cebf32aa6f8a3d70ea438ee9bcb35e88fc07149a779b2
- current_digest: 01e50c6e6be52a0e7a2cebf32aa6f8a3d70ea438ee9bcb35e88fc07149a779b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281227-GX5NVT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607281227-GX5NVT
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
