---
id: "202605221726-4FGDND"
title: "Add integration queue stale handoff recovery"
result_summary: "Merged via PR #4040."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify:
  - "Confirm live active PRs are not auto-released from the queue."
  - "Run integration queue tests for stale claimed and handoff entries."
  - "Run provider-state classification tests for merged, closed, missing, and blocked PRs."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:27:02.456Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T22:05:16.211Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: recovery is bounded to provider-terminal states; OPEN provider PRs are retained, MERGED waits for close-tail evidence, and CLOSED/not_found become rework instead of being silently released."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T22:05:16.211Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: recovery is bounded to provider-terminal states; OPEN provider PRs are retained, MERGED waits for close-tail evidence, and CLOSED/not_found become rework instead of being silently released."
  evaluated_sha: "e1c9780a32dccac41b01e8989ae970b547bfa5c5"
  blueprint_digest: "46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56"
  evidence_refs:
    - ".agentplane/tasks/202605221726-4FGDND/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-4FGDND-integration-queue-handoff-recovery/.agentplane/tasks/202605221726-4FGDND/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "ab9694fc0494ebf3510e927c4a02c30a6ea5d83d"
  message: "Merge pull request #4040 from basilisk-labs/task/202605221726-4FGDND/integration-queue-handoff-recovery"
comments:
  -
    author: "CODER"
    body: "Start: adding bounded stale handoff recovery for integration queue provider states."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4040 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T22:00:49.354Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding bounded stale handoff recovery for integration queue provider states."
  -
    type: "verify"
    at: "2026-05-22T22:05:04.828Z"
    author: "CODER"
    state: "ok"
    note: "Verified integration queue recovery decisions: stale claimed/handoff lanes recover only for terminal provider states, live OPEN PR lanes stay occupied, targeted queue tests pass, and typecheck/lint/docs/knip/bootstrap are green."
  -
    type: "verify"
    at: "2026-05-22T22:05:16.211Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: recovery is bounded to provider-terminal states; OPEN provider PRs are retained, MERGED waits for close-tail evidence, and CLOSED/not_found become rework instead of being silently released."
  -
    type: "status"
    at: "2026-05-22T22:24:09.523Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4040 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T22:24:09.530Z"
doc_updated_by: "INTEGRATOR"
description: "Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata."
sections:
  Summary: |-
    Add integration queue stale handoff recovery

    Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.
  Scope: |-
    - In scope: Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.
    - Out of scope: unrelated refactors not required for "Add integration queue stale handoff recovery".
  Plan: "Add bounded stale-handoff classification and recovery guidance for the branch_pr integration queue. Do not auto-merge or discard live work; classify provider truth and offer safe repair commands for stale handoff, merged pending close, closed-unmerged, and missing PR states."
  Verify Steps: |-
    1. Run integration queue tests for stale claimed and handoff entries.
    2. Run provider-state classification tests for merged, closed, missing, and blocked PRs.
    3. Confirm live active PRs are not auto-released from the queue.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T22:05:04.828Z — VERIFY — ok

    By: CODER

    Note: Verified integration queue recovery decisions: stale claimed/handoff lanes recover only for terminal provider states, live OPEN PR lanes stay occupied, targeted queue tests pass, and typecheck/lint/docs/knip/bootstrap are green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:00:49.354Z, excerpt_hash=sha256:987ba39221120300ead3df35598c843a4f7a535cf93250348066a9f95b3b1df2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-4FGDND-integration-queue-handoff-recovery/.agentplane/tasks/202605221726-4FGDND/blueprint/resolved-snapshot.json
    - old_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
    - current_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-4FGDND

    ### 2026-05-22T22:05:16.211Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: recovery is bounded to provider-terminal states; OPEN provider PRs are retained, MERGED waits for close-tail evidence, and CLOSED/not_found become rework instead of being silently released.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:05:04.854Z, excerpt_hash=sha256:987ba39221120300ead3df35598c843a4f7a535cf93250348066a9f95b3b1df2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-4FGDND-integration-queue-handoff-recovery/.agentplane/tasks/202605221726-4FGDND/blueprint/resolved-snapshot.json
    - old_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
    - current_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-4FGDND

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add integration queue stale handoff recovery

Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.

## Scope

- In scope: Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.
- Out of scope: unrelated refactors not required for "Add integration queue stale handoff recovery".

## Plan

Add bounded stale-handoff classification and recovery guidance for the branch_pr integration queue. Do not auto-merge or discard live work; classify provider truth and offer safe repair commands for stale handoff, merged pending close, closed-unmerged, and missing PR states.

## Verify Steps

1. Run integration queue tests for stale claimed and handoff entries.
2. Run provider-state classification tests for merged, closed, missing, and blocked PRs.
3. Confirm live active PRs are not auto-released from the queue.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T22:05:04.828Z — VERIFY — ok

By: CODER

Note: Verified integration queue recovery decisions: stale claimed/handoff lanes recover only for terminal provider states, live OPEN PR lanes stay occupied, targeted queue tests pass, and typecheck/lint/docs/knip/bootstrap are green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:00:49.354Z, excerpt_hash=sha256:987ba39221120300ead3df35598c843a4f7a535cf93250348066a9f95b3b1df2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-4FGDND-integration-queue-handoff-recovery/.agentplane/tasks/202605221726-4FGDND/blueprint/resolved-snapshot.json
- old_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
- current_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-4FGDND

### 2026-05-22T22:05:16.211Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: recovery is bounded to provider-terminal states; OPEN provider PRs are retained, MERGED waits for close-tail evidence, and CLOSED/not_found become rework instead of being silently released.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:05:04.854Z, excerpt_hash=sha256:987ba39221120300ead3df35598c843a4f7a535cf93250348066a9f95b3b1df2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-4FGDND-integration-queue-handoff-recovery/.agentplane/tasks/202605221726-4FGDND/blueprint/resolved-snapshot.json
- old_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
- current_digest: 46b46ca09503dfa2e2e14c248c3c27ebdd91e9cd5de3c1def7899312f2a2bd56
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-4FGDND

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
