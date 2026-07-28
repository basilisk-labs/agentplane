---
id: "202607281303-81KQ3X"
title: "Persist branch_pr authority outside the PR head"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "lifecycle"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T13:03:52.427Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T13:13:52.978Z"
  updated_by: "TESTER"
  note: "Verified authority storage across linked worktrees, exact-scope rejection, typecheck, focused tests, test:fast, and local fast CI."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-28T13:21:09.066Z"
  updated_by: "HUMAN"
  note: "The CI correction only extracts authority hydration from the route orchestrator; it restores the enforced hotspot boundary without changing the authority decision semantics."
  evaluated_sha: "7d0242a5a4fc311e0ab713316975078080ddffe2"
  blueprint_digest: "c7353729e4493adc49a18d511c920128c3f262b8451b1463e3a0e255dd128188"
  evidence_refs:
    - ".agentplane/tasks/202607281303-81KQ3X/quality/20260728-132108939-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607281303-81KQ3X/quality/20260728-132108939-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607281303-81KQ3X/quality/20260728-132108939-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607281303-81KQ3X/quality/20260728-132108939-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607281303-81KQ3X/README.md"
    - ".agentplane/tasks/202607281303-81KQ3X/quality/20260728-132108939-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607281303-81KQ3X/quality/20260728-132108939-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607281303-81KQ3X/quality/20260728-132108939-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "commit:7d0242a5a4fc311e0ab713316975078080ddffe2"
    - "bun run typecheck; bun run hotspots:check; focused authority tests"
  findings:
    - "The shared-store load, invalid-state fail-closed branch, and route behavior remain covered by focused tests; route-decision is below the enforced 600-line maximum."
commit:
  hash: "7d0242a5a4fc311e0ab713316975078080ddffe2"
  message: "fix: keep route decision under hotspot limit"
comments:
  -
    author: "CODER"
    body: "Start: persist scoped authority outside the PR head and retain fail-closed validation."
  -
    author: "CODER"
    body: "Implementation: authority records now use the shared Git control-plane store and no longer move the PR head."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Rework: hosted hotspot guard found route-decision.ts at 601 lines; authority hydration was extracted to the storage module."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-28T13:04:14.503Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: persist scoped authority outside the PR head and retain fail-closed validation."
  -
    type: "status"
    at: "2026-07-28T13:12:45.614Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: authority records now use the shared Git control-plane store and no longer move the PR head."
  -
    type: "verify"
    at: "2026-07-28T13:13:52.978Z"
    author: "TESTER"
    state: "ok"
    note: "Verified authority storage across linked worktrees, exact-scope rejection, typecheck, focused tests, test:fast, and local fast CI."
  -
    type: "status"
    at: "2026-07-28T13:15:00.740Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-28T13:20:49.959Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Rework: hosted hotspot guard found route-decision.ts at 601 lines; authority hydration was extracted to the storage module."
  -
    type: "status"
    at: "2026-07-28T13:21:37.462Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T13:21:37.463Z"
doc_updated_by: "CODER"
description: "Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts."
sections:
  Summary: |-
    Persist branch_pr authority outside the PR head

    Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.
  Scope: |-
    - In scope: Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.
    - Out of scope: unrelated refactors not required for "Persist branch_pr authority outside the PR head".
  Plan: "1. Map the authority write/read path and its shared checkout boundary. 2. Move authority persistence from the tracked task record into a durable repository-control-plane store that does not advance the task PR ref. 3. Keep expiry, operation digest, state-scope matching, and tamper detection fail-closed. 4. Add focused unit and lifecycle-route regressions. 5. Run declared local checks, publish a PR, and verify hosted checks before integration."
  Verify Steps: |-
    1. Grant a scoped authority from the task branch and assert that refs/heads/task/<task-id>/<slug> is byte-for-byte unchanged while the task worktree remains clean. Expected: authority remains available from the base integration checkout.
    2. Exercise matching, expired, tampered, and state-scope-mismatched authority records. Expected: only the matching unexpired record permits the exact operation.
    3. Simulate a verified PR head, grant integration authority, then recompute the route. Expected: integration enqueue is available without a PR-head publication or a fresh hosted-check requirement.
    4. Run focused authority and lifecycle tests, typecheck, test:fast, and the changed-files local CI route. Expected: all pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T13:13:52.978Z — VERIFY — ok

    By: TESTER

    Note: Verified authority storage across linked worktrees, exact-scope rejection, typecheck, focused tests, test:fast, and local fast CI.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T13:12:45.614Z, excerpt_hash=sha256:39495ab6126cb0956dffbdbdcbb818a2049c0c69adc3b3a5d87ce9853bc8f447

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281303-81KQ3X-persist-branch-pr-authority-outside-the-pr-head/.agentplane/tasks/202607281303-81KQ3X/blueprint/resolved-snapshot.json
    - old_digest: c7353729e4493adc49a18d511c920128c3f262b8451b1463e3a0e255dd128188
    - current_digest: c7353729e4493adc49a18d511c920128c3f262b8451b1463e3a0e255dd128188
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281303-81KQ3X

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607281303-81KQ3X
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Persisted authority is shared through Git common-dir metadata without a task-branch commit.
      Impact: Protected CI stays attached to the verified implementation head.
      Resolution: The route hydrates external authority state and fails closed when that state is malformed.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T13:04:27.490Z"
        authorityDigest: "sha256:6a8997e48fe04eb0f481d98cc0930a06dbf17b396a89f44bd3e59ac243412625"
        digest: "sha256:3ccf90820c987c5e31cce6c0dcee0df9fe043e1c29b90a84f20287b0ec191806"
        operationDigest: "sha256:be7dc32545435b74a39d6f8fa956a8271d6de50a5ef50b7643b14399812723a3"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:a9ebd6cf49906f0891a233c1d107be469c4b3713f5b94d98d59540e899fb065e"
    grants:
      -
        actor: "USER"
        digest: "sha256:6a8997e48fe04eb0f481d98cc0930a06dbf17b396a89f44bd3e59ac243412625"
        expiresAt: "2026-07-28T13:19:27.490Z"
        id: "authority-6527c189-4ad1-4914-aab5-cded2d6d240b"
        issuedAt: "2026-07-28T13:04:27.490Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:be7dc32545435b74a39d6f8fa956a8271d6de50a5ef50b7643b14399812723a3"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:a9ebd6cf49906f0891a233c1d107be469c4b3713f5b94d98d59540e899fb065e"
        stateScopeDigest: "sha256:9f645ed07fb68f90bdb10c05eac9d68f23551613dbb03f683142f4773548a628"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "47213e98e23ec136566a31bb1ef6c44f16d64690"
    version: 1
id_source: "generated"
---
## Summary

Persist branch_pr authority outside the PR head

Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.

## Scope

- In scope: Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.
- Out of scope: unrelated refactors not required for "Persist branch_pr authority outside the PR head".

## Plan

1. Map the authority write/read path and its shared checkout boundary. 2. Move authority persistence from the tracked task record into a durable repository-control-plane store that does not advance the task PR ref. 3. Keep expiry, operation digest, state-scope matching, and tamper detection fail-closed. 4. Add focused unit and lifecycle-route regressions. 5. Run declared local checks, publish a PR, and verify hosted checks before integration.

## Verify Steps

1. Grant a scoped authority from the task branch and assert that refs/heads/task/<task-id>/<slug> is byte-for-byte unchanged while the task worktree remains clean. Expected: authority remains available from the base integration checkout.
2. Exercise matching, expired, tampered, and state-scope-mismatched authority records. Expected: only the matching unexpired record permits the exact operation.
3. Simulate a verified PR head, grant integration authority, then recompute the route. Expected: integration enqueue is available without a PR-head publication or a fresh hosted-check requirement.
4. Run focused authority and lifecycle tests, typecheck, test:fast, and the changed-files local CI route. Expected: all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T13:13:52.978Z — VERIFY — ok

By: TESTER

Note: Verified authority storage across linked worktrees, exact-scope rejection, typecheck, focused tests, test:fast, and local fast CI.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T13:12:45.614Z, excerpt_hash=sha256:39495ab6126cb0956dffbdbdcbb818a2049c0c69adc3b3a5d87ce9853bc8f447

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281303-81KQ3X-persist-branch-pr-authority-outside-the-pr-head/.agentplane/tasks/202607281303-81KQ3X/blueprint/resolved-snapshot.json
- old_digest: c7353729e4493adc49a18d511c920128c3f262b8451b1463e3a0e255dd128188
- current_digest: c7353729e4493adc49a18d511c920128c3f262b8451b1463e3a0e255dd128188
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281303-81KQ3X

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607281303-81KQ3X
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

- Observation: Persisted authority is shared through Git common-dir metadata without a task-branch commit.
  Impact: Protected CI stays attached to the verified implementation head.
  Resolution: The route hydrates external authority state and fails closed when that state is malformed.
