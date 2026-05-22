---
id: "202605221715-WTN8N7"
title: "Use candidate runtime or hosted truth for protected integrate"
result_summary: "Included release pipeline hardening task closed after batch merge."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:16:51.030Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:13:19.171Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:13:19.171Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "86f62c0a6104361b93285b76a2f7d2128724fd45cf976283cef509085470c822"
  evidence_refs:
    - ".agentplane/tasks/202605221715-WTN8N7/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-WTN8N7/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "ff82cb92e846c51297beb1a491aed29deb49c079"
  message: "Merge pull request #4023 from basilisk-labs/task-close/202605221715-424TFE/53b9f7c74c78"
comments:
  -
    author: "CODER"
    body: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    author: "INTEGRATOR"
    body: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
events:
  -
    type: "status"
    at: "2026-05-22T17:17:55.583Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:26.094Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  -
    type: "verify"
    at: "2026-05-22T18:13:19.171Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:19.779Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:19.780Z"
doc_updated_by: "INTEGRATOR"
description: "Prevent base-checkout integrate from rejecting PR branches because main does not yet contain the candidate runtime contract."
sections:
  Summary: |-
    Use candidate runtime or hosted truth for protected integrate

    Prevent base-checkout integrate from rejecting PR branches because main does not yet contain the candidate runtime contract.
  Scope: |-
    - In scope: Prevent base-checkout integrate from rejecting PR branches because main does not yet contain the candidate runtime contract.
    - Out of scope: unrelated refactors not required for "Use candidate runtime or hosted truth for protected integrate".
  Plan: "Make protected-base integrate rely on candidate branch runtime or hosted PR truth when validating candidate-specific contracts. Verify base checkout no longer rejects branches for runtime contract drift already validated on PR branch."
  Verify Steps: |-
    1. Run integrate prepare tests for protected-base route.
    2. Run CLI pr/integrate flow tests covering base checkout with candidate branch metadata.
    3. Confirm hosted PR verification remains the source of truth for protected merge readiness.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:26.094Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:55.583Z, excerpt_hash=sha256:4357364fef26b7f28e10a02ca7d44834e716c5c4da45195d6a1ecb55cef463e1

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-WTN8N7/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 86f62c0a6104361b93285b76a2f7d2128724fd45cf976283cef509085470c822
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-WTN8N7

    ### 2026-05-22T18:13:19.171Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:26.111Z, excerpt_hash=sha256:4357364fef26b7f28e10a02ca7d44834e716c5c4da45195d6a1ecb55cef463e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-WTN8N7/blueprint/resolved-snapshot.json
    - old_digest: 86f62c0a6104361b93285b76a2f7d2128724fd45cf976283cef509085470c822
    - current_digest: 86f62c0a6104361b93285b76a2f7d2128724fd45cf976283cef509085470c822
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221715-WTN8N7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use candidate runtime or hosted truth for protected integrate

Prevent base-checkout integrate from rejecting PR branches because main does not yet contain the candidate runtime contract.

## Scope

- In scope: Prevent base-checkout integrate from rejecting PR branches because main does not yet contain the candidate runtime contract.
- Out of scope: unrelated refactors not required for "Use candidate runtime or hosted truth for protected integrate".

## Plan

Make protected-base integrate rely on candidate branch runtime or hosted PR truth when validating candidate-specific contracts. Verify base checkout no longer rejects branches for runtime contract drift already validated on PR branch.

## Verify Steps

1. Run integrate prepare tests for protected-base route.
2. Run CLI pr/integrate flow tests covering base checkout with candidate branch metadata.
3. Confirm hosted PR verification remains the source of truth for protected merge readiness.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:26.094Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:55.583Z, excerpt_hash=sha256:4357364fef26b7f28e10a02ca7d44834e716c5c4da45195d6a1ecb55cef463e1

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-WTN8N7/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 86f62c0a6104361b93285b76a2f7d2128724fd45cf976283cef509085470c822
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-WTN8N7

### 2026-05-22T18:13:19.171Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:26.111Z, excerpt_hash=sha256:4357364fef26b7f28e10a02ca7d44834e716c5c4da45195d6a1ecb55cef463e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-WTN8N7/blueprint/resolved-snapshot.json
- old_digest: 86f62c0a6104361b93285b76a2f7d2128724fd45cf976283cef509085470c822
- current_digest: 86f62c0a6104361b93285b76a2f7d2128724fd45cf976283cef509085470c822
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-WTN8N7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
