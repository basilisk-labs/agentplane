---
id: "202605221727-7KQE04"
title: "Split mutable hosted metadata from tracked evidence"
result_summary: "Merged via PR #4034."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify:
  - "Confirm quality review freshness can be checked without self-invalidating evidence commits."
  - "Run PR artifact schema and migration tests."
  - "Run pr open/update tests confirming no tracked volatile metadata churn."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:27:13.512Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T20:28:40.042Z"
  updated_by: "EVALUATOR"
  note: "Verified: reviewed recovery closure for 7KQE04; implementation contract is already in main commit 77531d807 and targeted PR metadata suites passed in this worktree."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T20:28:40.042Z"
  updated_by: "EVALUATOR"
  note: "Verified: reviewed recovery closure for 7KQE04; implementation contract is already in main commit 77531d807 and targeted PR metadata suites passed in this worktree."
  evaluated_sha: "21a786bf2f1bddd5bee5b0cbd8964783a2601cad"
  blueprint_digest: "154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459"
  evidence_refs:
    - ".agentplane/tasks/202605221727-7KQE04/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221727-7KQE04-hosted-metadata-split/.agentplane/tasks/202605221727-7KQE04/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "63b584e659b483492183c9955b1d07a4ee1c483b"
  message: "Merge pull request #4034 from basilisk-labs/task/202605221727-7KQE04/hosted-metadata-split"
comments:
  -
    author: "CODER"
    body: "Start: splitting mutable hosted PR metadata from tracked evidence so artifact refresh does not self-invalidate reviewed implementation commits."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4034 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T20:22:37.972Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting mutable hosted PR metadata from tracked evidence so artifact refresh does not self-invalidate reviewed implementation commits."
  -
    type: "verify"
    at: "2026-05-22T20:27:15.793Z"
    author: "CODER"
    state: "ok"
    note: "Verified: PR metadata builders omit tracked live head SHA and use diffstat freshness; targeted PR metadata tests pass against current main implementation commit 77531d807."
  -
    type: "verify"
    at: "2026-05-22T20:28:40.042Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: reviewed recovery closure for 7KQE04; implementation contract is already in main commit 77531d807 and targeted PR metadata suites passed in this worktree."
  -
    type: "status"
    at: "2026-05-22T20:32:55.834Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4034 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T20:32:55.843Z"
doc_updated_by: "INTEGRATOR"
description: "Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits."
sections:
  Summary: |-
    Split mutable hosted metadata from tracked evidence

    Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.
  Scope: |-
    - In scope: Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.
    - Out of scope: unrelated refactors not required for "Split mutable hosted metadata from tracked evidence".
  Plan: "Define and implement a boundary between immutable tracked evidence and mutable hosted/runtime metadata. Tracked task artifacts should not store volatile fields that force artifact-only commits or quality-review SHA churn after implementation review."
  Verify Steps: |-
    1. Run PR artifact schema and migration tests.
    2. Run pr open/update tests confirming no tracked volatile metadata churn.
    3. Confirm quality review freshness can be checked without self-invalidating evidence commits.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T20:27:15.793Z — VERIFY — ok

    By: CODER

    Note: Verified: PR metadata builders omit tracked live head SHA and use diffstat freshness; targeted PR metadata tests pass against current main implementation commit 77531d807.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:22:37.972Z, excerpt_hash=sha256:4bc8b045966d52cf3ee4cb7b8ce09883a1f2bcc2e083d4ffc9c207c76226bbdd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221727-7KQE04-hosted-metadata-split/.agentplane/tasks/202605221727-7KQE04/blueprint/resolved-snapshot.json
    - old_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
    - current_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221727-7KQE04

    ### 2026-05-22T20:28:40.042Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: reviewed recovery closure for 7KQE04; implementation contract is already in main commit 77531d807 and targeted PR metadata suites passed in this worktree.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:27:15.865Z, excerpt_hash=sha256:4bc8b045966d52cf3ee4cb7b8ce09883a1f2bcc2e083d4ffc9c207c76226bbdd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221727-7KQE04-hosted-metadata-split/.agentplane/tasks/202605221727-7KQE04/blueprint/resolved-snapshot.json
    - old_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
    - current_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221727-7KQE04

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The approved contract is already present on main from commit 77531d807; this recovery branch records task-local verification and PR evidence without adding a duplicate implementation diff.
      Impact: Task can be closed against the existing implementation while preserving one-commit task artifact discipline.
      Resolution: Recorded verification after targeted pr-meta/pr-flow/integrate tests passed.

    - Observation: PR #4034 carries task-local evidence only; no duplicate implementation diff is required because the tracked-head removal was merged earlier.
      Impact: The backlog task can close without adding self-referential head metadata back into tracked artifacts.
      Resolution: Proceed with one amended task evidence commit and hosted checks on PR #4034.
id_source: "generated"
---
## Summary

Split mutable hosted metadata from tracked evidence

Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.

## Scope

- In scope: Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.
- Out of scope: unrelated refactors not required for "Split mutable hosted metadata from tracked evidence".

## Plan

Define and implement a boundary between immutable tracked evidence and mutable hosted/runtime metadata. Tracked task artifacts should not store volatile fields that force artifact-only commits or quality-review SHA churn after implementation review.

## Verify Steps

1. Run PR artifact schema and migration tests.
2. Run pr open/update tests confirming no tracked volatile metadata churn.
3. Confirm quality review freshness can be checked without self-invalidating evidence commits.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T20:27:15.793Z — VERIFY — ok

By: CODER

Note: Verified: PR metadata builders omit tracked live head SHA and use diffstat freshness; targeted PR metadata tests pass against current main implementation commit 77531d807.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:22:37.972Z, excerpt_hash=sha256:4bc8b045966d52cf3ee4cb7b8ce09883a1f2bcc2e083d4ffc9c207c76226bbdd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221727-7KQE04-hosted-metadata-split/.agentplane/tasks/202605221727-7KQE04/blueprint/resolved-snapshot.json
- old_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
- current_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221727-7KQE04

### 2026-05-22T20:28:40.042Z — VERIFY — ok

By: EVALUATOR

Note: Verified: reviewed recovery closure for 7KQE04; implementation contract is already in main commit 77531d807 and targeted PR metadata suites passed in this worktree.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:27:15.865Z, excerpt_hash=sha256:4bc8b045966d52cf3ee4cb7b8ce09883a1f2bcc2e083d4ffc9c207c76226bbdd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221727-7KQE04-hosted-metadata-split/.agentplane/tasks/202605221727-7KQE04/blueprint/resolved-snapshot.json
- old_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
- current_digest: 154387313e8f512cb84f4cd55f15ff66f7c6302a80d5879af33db073b91ae459
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221727-7KQE04

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The approved contract is already present on main from commit 77531d807; this recovery branch records task-local verification and PR evidence without adding a duplicate implementation diff.
  Impact: Task can be closed against the existing implementation while preserving one-commit task artifact discipline.
  Resolution: Recorded verification after targeted pr-meta/pr-flow/integrate tests passed.

- Observation: PR #4034 carries task-local evidence only; no duplicate implementation diff is required because the tracked-head removal was merged earlier.
  Impact: The backlog task can close without adding self-referential head metadata back into tracked artifacts.
  Resolution: Proceed with one amended task evidence commit and hosted checks on PR #4034.
