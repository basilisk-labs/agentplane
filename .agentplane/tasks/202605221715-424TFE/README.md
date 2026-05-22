---
id: "202605221715-424TFE"
title: "Cache release prepublish proof by tree digest"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-05-22T17:16:30.089Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:03:09.463Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: PR #4022 has one implementation commit, task worktree pr check passed, local ci:contract/doctor/targeted checks passed, and GitHub hosted checks are green including Core CI, Docs CI, Workflows Lint, CodeQL, PR verification, Release-ready manifest, and test-windows."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:03:09.463Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: PR #4022 has one implementation commit, task worktree pr check passed, local ci:contract/doctor/targeted checks passed, and GitHub hosted checks are green including Core CI, Docs CI, Workflows Lint, CodeQL, PR verification, Release-ready manifest, and test-windows."
  evaluated_sha: "360afadde7451357c9677d354563bb590d654abf"
  blueprint_digest: "e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240"
  evidence_refs:
    - ".agentplane/tasks/202605221715-424TFE/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-424TFE/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
events:
  -
    type: "status"
    at: "2026-05-22T17:17:54.280Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:22.350Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  -
    type: "verify"
    at: "2026-05-22T18:03:09.463Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: PR #4022 has one implementation commit, task worktree pr check passed, local ci:contract/doctor/targeted checks passed, and GitHub hosted checks are green including Core CI, Docs CI, Workflows Lint, CodeQL, PR verification, Release-ready manifest, and test-windows."
doc_version: 3
doc_updated_at: "2026-05-22T18:03:09.479Z"
doc_updated_by: "CODER"
description: "Avoid rerunning expensive release:prepublish heavy checks when an exact release tree already has matching proof."
sections:
  Summary: |-
    Cache release prepublish proof by tree digest

    Avoid rerunning expensive release:prepublish heavy checks when an exact release tree already has matching proof.
  Scope: |-
    - In scope: Avoid rerunning expensive release:prepublish heavy checks when an exact release tree already has matching proof.
    - Out of scope: unrelated refactors not required for "Cache release prepublish proof by tree digest".
  Plan: "Implement release prepublish proof reuse keyed by exact release tree/check digest. Candidate push may reuse matching successful heavy proof; mismatched trees must rerun checks. Verify with unit tests for accept/reject proof and release candidate preflight behavior."
  Verify Steps: |-
    1. Run targeted release candidate/prepublish proof tests.
    2. Run release:parity and release:check for current tree.
    3. Confirm mismatched proof is rejected and matching proof bypasses duplicate heavy gate only for same tree digest.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:22.350Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:54.280Z, excerpt_hash=sha256:c2dcf2f5d2817078c3afa9fc72207a996b14791b27197e7038025b94feb89998

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-424TFE/blueprint/resolved-snapshot.json
    - old_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
    - current_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221715-424TFE

    ### 2026-05-22T18:03:09.463Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: PR #4022 has one implementation commit, task worktree pr check passed, local ci:contract/doctor/targeted checks passed, and GitHub hosted checks are green including Core CI, Docs CI, Workflows Lint, CodeQL, PR verification, Release-ready manifest, and test-windows.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:22.369Z, excerpt_hash=sha256:c2dcf2f5d2817078c3afa9fc72207a996b14791b27197e7038025b94feb89998

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-424TFE/blueprint/resolved-snapshot.json
    - old_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
    - current_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221715-424TFE

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Cache release prepublish proof by tree digest

Avoid rerunning expensive release:prepublish heavy checks when an exact release tree already has matching proof.

## Scope

- In scope: Avoid rerunning expensive release:prepublish heavy checks when an exact release tree already has matching proof.
- Out of scope: unrelated refactors not required for "Cache release prepublish proof by tree digest".

## Plan

Implement release prepublish proof reuse keyed by exact release tree/check digest. Candidate push may reuse matching successful heavy proof; mismatched trees must rerun checks. Verify with unit tests for accept/reject proof and release candidate preflight behavior.

## Verify Steps

1. Run targeted release candidate/prepublish proof tests.
2. Run release:parity and release:check for current tree.
3. Confirm mismatched proof is rejected and matching proof bypasses duplicate heavy gate only for same tree digest.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:22.350Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:54.280Z, excerpt_hash=sha256:c2dcf2f5d2817078c3afa9fc72207a996b14791b27197e7038025b94feb89998

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-424TFE/blueprint/resolved-snapshot.json
- old_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
- current_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-424TFE

### 2026-05-22T18:03:09.463Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: PR #4022 has one implementation commit, task worktree pr check passed, local ci:contract/doctor/targeted checks passed, and GitHub hosted checks are green including Core CI, Docs CI, Workflows Lint, CodeQL, PR verification, Release-ready manifest, and test-windows.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:22.369Z, excerpt_hash=sha256:c2dcf2f5d2817078c3afa9fc72207a996b14791b27197e7038025b94feb89998

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-424TFE/blueprint/resolved-snapshot.json
- old_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
- current_digest: e56d3905acdeab85088a0cb17ce01a3c3acf0c30d4a9d21319571118922cb240
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-424TFE

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
