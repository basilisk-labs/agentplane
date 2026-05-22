---
id: "202605221715-2Z8PE2"
title: "Automate release publish recovery after transient main CI failure"
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
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:17:10.911Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:13:26.712Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:13:26.712Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "820c5b7ecac39f6275b46889854cc142f6ac40b9c33b0067b918f19b25a86976"
  evidence_refs:
    - ".agentplane/tasks/202605221715-2Z8PE2/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-2Z8PE2/blueprint/resolved-snapshot.json"
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
    at: "2026-05-22T17:17:57.185Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:28.920Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  -
    type: "verify"
    at: "2026-05-22T18:13:26.712Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:27.513Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:27.514Z"
doc_updated_by: "INTEGRATOR"
description: "Provide a release recovery route that reruns failed main CI jobs and retries publish for the same release SHA."
sections:
  Summary: |-
    Automate release publish recovery after transient main CI failure

    Provide a release recovery route that reruns failed main CI jobs and retries publish for the same release SHA.
  Scope: |-
    - In scope: Provide a release recovery route that reruns failed main CI jobs and retries publish for the same release SHA.
    - Out of scope: unrelated refactors not required for "Automate release publish recovery after transient main CI failure".
  Plan: "Add release recovery flow for transient main CI failure before publish: rerun failed jobs, wait for release-ready artifact, then retry publish for same SHA. Verify command/script guidance and state detection."
  Verify Steps: |-
    1. Run release recovery state tests.
    2. Confirm transient failed main CI suggests rerun failed jobs and publish retry.
    3. Confirm burned/published versions still block duplicate publish.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:28.920Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:57.185Z, excerpt_hash=sha256:45af1aff6c5496fa91e53c8127367fc32e6532ad1a93a19d8fbeef0f717f74f3

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-2Z8PE2/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 820c5b7ecac39f6275b46889854cc142f6ac40b9c33b0067b918f19b25a86976
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-2Z8PE2

    ### 2026-05-22T18:13:26.712Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:28.935Z, excerpt_hash=sha256:45af1aff6c5496fa91e53c8127367fc32e6532ad1a93a19d8fbeef0f717f74f3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-2Z8PE2/blueprint/resolved-snapshot.json
    - old_digest: 820c5b7ecac39f6275b46889854cc142f6ac40b9c33b0067b918f19b25a86976
    - current_digest: 820c5b7ecac39f6275b46889854cc142f6ac40b9c33b0067b918f19b25a86976
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221715-2Z8PE2

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Automate release publish recovery after transient main CI failure

Provide a release recovery route that reruns failed main CI jobs and retries publish for the same release SHA.

## Scope

- In scope: Provide a release recovery route that reruns failed main CI jobs and retries publish for the same release SHA.
- Out of scope: unrelated refactors not required for "Automate release publish recovery after transient main CI failure".

## Plan

Add release recovery flow for transient main CI failure before publish: rerun failed jobs, wait for release-ready artifact, then retry publish for same SHA. Verify command/script guidance and state detection.

## Verify Steps

1. Run release recovery state tests.
2. Confirm transient failed main CI suggests rerun failed jobs and publish retry.
3. Confirm burned/published versions still block duplicate publish.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:28.920Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:57.185Z, excerpt_hash=sha256:45af1aff6c5496fa91e53c8127367fc32e6532ad1a93a19d8fbeef0f717f74f3

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-2Z8PE2/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 820c5b7ecac39f6275b46889854cc142f6ac40b9c33b0067b918f19b25a86976
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-2Z8PE2

### 2026-05-22T18:13:26.712Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:28.935Z, excerpt_hash=sha256:45af1aff6c5496fa91e53c8127367fc32e6532ad1a93a19d8fbeef0f717f74f3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-2Z8PE2/blueprint/resolved-snapshot.json
- old_digest: 820c5b7ecac39f6275b46889854cc142f6ac40b9c33b0067b918f19b25a86976
- current_digest: 820c5b7ecac39f6275b46889854cc142f6ac40b9c33b0067b918f19b25a86976
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-2Z8PE2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
