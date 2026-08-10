---
id: "202608102112-AY0H1F"
title: "Repair exactly-once external episode recovery"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T21:12:48.867Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-10T22:26:42.832Z"
  updated_by: "TESTER"
  note: "PASS for implementation a1f0190de: state-machine and all affected task-advance/supervisor suites pass 80/80; drifted running and effect-in-doubt intents become exact-key replaceable failures; CLI retires the old exchange, emits the exact replacement command, issues a distinct successor, and rejects late retired output. Typecheck, knip, ESLint, format, diff, core build, and CLI build pass; hosted CI supplies the full independent rerun."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "a1f0190dec44ba53df238aedfc4839dd8ba9ce1c"
  message: "🐛 AY0H1F task: retire drifted external intents"
comments:
  -
    author: "CODER"
    body: "Start: implement exactly-once external episode recovery from the reproduced 0.7.5 failure sequence."
  -
    author: "CODER"
    body: "Implementation recorded: external results recover automatically, successful replay is idempotent, conflicting replay fails closed, stale ownership creates no phantom packet, and legitimate replacements receive distinct transition identities."
  -
    author: "CODER"
    body: "Rebase receipt: implementation patch-id 6b5ea030de0049fcb030d7808fd42f2ee49ac5af is unchanged from pre-rebase af1ff44cd; implementation commit is now b633b400c."
  -
    author: "CODER"
    body: "Implementation finalized after full-fast parity correction: semantic exchanges keep state- and replacement-bound identities while control-plane packets preserve managed/external transition parity."
  -
    author: "CODER"
    body: "Hosted static follow-up: removed three unintended exports from the internal recovery module; runtime behavior and test inputs are unchanged."
  -
    author: "CODER"
    body: "Review P1 resolved: a result-less issued intent whose route fingerprint drifts is durably failed, its exchange is retired, and the CLI returns the exact replacement command; late old output is rejected."
events:
  -
    type: "status"
    at: "2026-08-10T21:13:13.128Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement exactly-once external episode recovery from the reproduced 0.7.5 failure sequence."
  -
    type: "status"
    at: "2026-08-10T21:53:29.646Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: external results recover automatically, successful replay is idempotent, conflicting replay fails closed, stale ownership creates no phantom packet, and legitimate replacements receive distinct transition identities."
    commit: "af1ff44cd3632496e227deabb2520cf4d0565dd1"
  -
    type: "verify"
    at: "2026-08-10T21:54:25.177Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation af1ff44cd: exactly-once task-advance suites pass (30/30); focused packet and recovery suites pass (26/26); identical consumed replay is idempotent, conflicting replay fails closed, plain advance resumes result_received, ownership conflict creates no phantom exchange, and replacement gets a distinct transition; typecheck, ESLint, changed-format, diff check, and hotspot gates pass. Full critical-cli stopped on the pre-existing RF-04 workspace dependency-seed path defect before reaching changed tests; this is unrelated to the patch."
  -
    type: "status"
    at: "2026-08-10T21:55:26.196Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rebase receipt: implementation patch-id 6b5ea030de0049fcb030d7808fd42f2ee49ac5af is unchanged from pre-rebase af1ff44cd; implementation commit is now b633b400c."
    commit: "b633b400cdb16bdcb1758108962592d9f1775c5b"
  -
    type: "verify"
    at: "2026-08-10T21:57:24.289Z"
    author: "TESTER"
    state: "ok"
    note: "PASS reused after rebase: implementation b633b400c has the exact stable patch-id 6b5ea030de0049fcb030d7808fd42f2ee49ac5af as previously verified af1ff44cd; no code, tests, Verify Steps, or declared inputs changed. Reused the prior exactly-once suites, typecheck, ESLint, changed-format, diff, and hotspot receipts without rerunning them. The pre-existing RF-04 workspace dependency-seed defect remains unrelated."
  -
    type: "status"
    at: "2026-08-10T22:11:21.610Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation finalized after full-fast parity correction: semantic exchanges keep state- and replacement-bound identities while control-plane packets preserve managed/external transition parity."
    commit: "2af7e6bd4b10f8f2387972306e1f11dfe791f754"
  -
    type: "verify"
    at: "2026-08-10T22:11:24.492Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation 2af7e6bd4: focused exactly-once and supervisor suites pass 51/51; full-fast passes 546/546 test files and 3958/3958 unit tests; critical-cli passes all 12 chunks and 91/91 tests; build, typecheck, lint, format, schemas, policy routing, release parity, docs freshness, cold-start baseline, and hotspot gates pass. The first full-fast run exposed transition-parity regressions, which were corrected before this green receipt."
  -
    type: "status"
    at: "2026-08-10T22:19:33.848Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Hosted static follow-up: removed three unintended exports from the internal recovery module; runtime behavior and test inputs are unchanged."
    commit: "1a87a52168e518d8692d34bec8fde5f1542dbbec"
  -
    type: "verify"
    at: "2026-08-10T22:19:36.486Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation 1a87a5216: reused the green full-fast receipt from 2af7e6bd4 because the only delta removes three export modifiers from internal helpers and changes no runtime behavior; delta checks pass knip baseline, typecheck, file ESLint, format, and package build. Hosted CI will provide the independent full rerun."
  -
    type: "status"
    at: "2026-08-10T22:26:40.152Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Review P1 resolved: a result-less issued intent whose route fingerprint drifts is durably failed, its exchange is retired, and the CLI returns the exact replacement command; late old output is rejected."
    commit: "a1f0190dec44ba53df238aedfc4839dd8ba9ce1c"
  -
    type: "verify"
    at: "2026-08-10T22:26:42.832Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation a1f0190de: state-machine and all affected task-advance/supervisor suites pass 80/80; drifted running and effect-in-doubt intents become exact-key replaceable failures; CLI retires the old exchange, emits the exact replacement command, issues a distinct successor, and rejects late retired output. Typecheck, knip, ESLint, format, diff, core build, and CLI build pass; hosted CI supplies the full independent rerun."
doc_version: 3
doc_updated_at: "2026-08-10T22:26:43.786Z"
doc_updated_by: "CODER"
description: "Make task advance consume an external-agent envelope exactly once only after its result is durably applied. Prevent read-only workspace-resolution packets from creating fresh intents, let stale in-flight intents transition to a recoverable terminal state after state-fingerprint drift, issue a fresh replacement transition without replaying old output, and return deterministic recovery instructions without manual journal edits."
sections:
  Summary: |-
    Repair exactly-once external episode recovery

    Make task advance consume an external-agent envelope exactly once only after its result is durably applied. Prevent read-only workspace-resolution packets from creating fresh intents, let stale in-flight intents transition to a recoverable terminal state after state-fingerprint drift, issue a fresh replacement transition without replaying old output, and return deterministic recovery instructions without manual journal edits.
  Scope: |-
    - In scope: Make task advance consume an external-agent envelope exactly once only after its result is durably applied. Prevent read-only workspace-resolution packets from creating fresh intents, let stale in-flight intents transition to a recoverable terminal state after state-fingerprint drift, issue a fresh replacement transition without replaying old output, and return deterministic recovery instructions without manual journal edits.
    - Out of scope: unrelated refactors not required for "Repair exactly-once external episode recovery".
  Plan: |-
    Goal: make external-agent task advance exactly-once, recoverable, and deterministic without journal surgery.

    1. Convert the 0.7.5 log and the locally reproduced stuck journal into focused tests: an accepted result must not reissue the same transition, a read-only workspace-resolution packet must not create a fresh intent, and state-fingerprint drift must have a supported recovery path.
    2. Define explicit journal states and invariants for prepared, issued, result-applied, consumed, stale/failed, and replacement transitions. Persist the result application receipt and terminal transition atomically before reporting success.
    3. Keep an envelope reusable while result application is incomplete; after durable success, make identical replay idempotently return the stored receipt and reject a conflicting replay.
    4. When repository state drifts after an issued intent, transition that intent deterministically to stale/failed and allow one fresh replacement transition without requiring manual edits or replaying old output.
    5. Prevent diagnostic or read-only workspace-resolution packets from opening lifecycle intents. Every emitted packet must state whether it is semantic, diagnostic, or executable and whether a result is expected.
    6. Make task advance/run return the exact recovery command and reason for every interrupted state, with no ambiguous retry instruction and no reuse of a consumed transition id.
    7. Run the focused task-advance and supervisor suites, regression tests for duplicate/conflicting result replay and crash boundaries, typecheck, formatting, hotspot checks, and the repository fast selector.

    Success: the original 0.7.5 failure sequence completes or recovers in one deterministic path; no accepted result is lost, no consumed transition is replayed, no stale intent is unrecoverable, and agents never need to edit lifecycle artifacts manually.
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair exactly-once external episode recovery". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair exactly-once external episode recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-10T21:54:25.177Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation af1ff44cd: exactly-once task-advance suites pass (30/30); focused packet and recovery suites pass (26/26); identical consumed replay is idempotent, conflicting replay fails closed, plain advance resumes result_received, ownership conflict creates no phantom exchange, and replacement gets a distinct transition; typecheck, ESLint, changed-format, diff check, and hotspot gates pass. Full critical-cli stopped on the pre-existing RF-04 workspace dependency-seed path defect before reaching changed tests; this is unrelated to the patch.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T21:53:29.646Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
    - old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T21:57:24.289Z — VERIFY — ok

    By: TESTER

    Note: PASS reused after rebase: implementation b633b400c has the exact stable patch-id 6b5ea030de0049fcb030d7808fd42f2ee49ac5af as previously verified af1ff44cd; no code, tests, Verify Steps, or declared inputs changed. Reused the prior exactly-once suites, typecheck, ESLint, changed-format, diff, and hotspot receipts without rerunning them. The pre-existing RF-04 workspace dependency-seed defect remains unrelated.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T21:55:26.196Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
    - old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T22:11:24.492Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation 2af7e6bd4: focused exactly-once and supervisor suites pass 51/51; full-fast passes 546/546 test files and 3958/3958 unit tests; critical-cli passes all 12 chunks and 91/91 tests; build, typecheck, lint, format, schemas, policy routing, release parity, docs freshness, cold-start baseline, and hotspot gates pass. The first full-fast run exposed transition-parity regressions, which were corrected before this green receipt.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T22:11:21.610Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
    - old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T22:19:36.486Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation 1a87a5216: reused the green full-fast receipt from 2af7e6bd4 because the only delta removes three export modifiers from internal helpers and changes no runtime behavior; delta checks pass knip baseline, typecheck, file ESLint, format, and package build. Hosted CI will provide the independent full rerun.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T22:19:33.848Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
    - old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T22:26:42.832Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation a1f0190de: state-machine and all affected task-advance/supervisor suites pass 80/80; drifted running and effect-in-doubt intents become exact-key replaceable failures; CLI retires the old exchange, emits the exact replacement command, issues a distinct successor, and rejects late retired output. Typecheck, knip, ESLint, format, diff, core build, and CLI build pass; hosted CI supplies the full independent rerun.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T22:26:40.152Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
    - old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608102112-AY0H1F
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
    start_head_sha: "30390d4a2c545984642bcc2e4754582ff5d2316b"
    version: 1
id_source: "generated"
---
## Summary

Repair exactly-once external episode recovery

Make task advance consume an external-agent envelope exactly once only after its result is durably applied. Prevent read-only workspace-resolution packets from creating fresh intents, let stale in-flight intents transition to a recoverable terminal state after state-fingerprint drift, issue a fresh replacement transition without replaying old output, and return deterministic recovery instructions without manual journal edits.

## Scope

- In scope: Make task advance consume an external-agent envelope exactly once only after its result is durably applied. Prevent read-only workspace-resolution packets from creating fresh intents, let stale in-flight intents transition to a recoverable terminal state after state-fingerprint drift, issue a fresh replacement transition without replaying old output, and return deterministic recovery instructions without manual journal edits.
- Out of scope: unrelated refactors not required for "Repair exactly-once external episode recovery".

## Plan

Goal: make external-agent task advance exactly-once, recoverable, and deterministic without journal surgery.

1. Convert the 0.7.5 log and the locally reproduced stuck journal into focused tests: an accepted result must not reissue the same transition, a read-only workspace-resolution packet must not create a fresh intent, and state-fingerprint drift must have a supported recovery path.
2. Define explicit journal states and invariants for prepared, issued, result-applied, consumed, stale/failed, and replacement transitions. Persist the result application receipt and terminal transition atomically before reporting success.
3. Keep an envelope reusable while result application is incomplete; after durable success, make identical replay idempotently return the stored receipt and reject a conflicting replay.
4. When repository state drifts after an issued intent, transition that intent deterministically to stale/failed and allow one fresh replacement transition without requiring manual edits or replaying old output.
5. Prevent diagnostic or read-only workspace-resolution packets from opening lifecycle intents. Every emitted packet must state whether it is semantic, diagnostic, or executable and whether a result is expected.
6. Make task advance/run return the exact recovery command and reason for every interrupted state, with no ambiguous retry instruction and no reuse of a consumed transition id.
7. Run the focused task-advance and supervisor suites, regression tests for duplicate/conflicting result replay and crash boundaries, typecheck, formatting, hotspot checks, and the repository fast selector.

Success: the original 0.7.5 failure sequence completes or recovers in one deterministic path; no accepted result is lost, no consumed transition is replayed, no stale intent is unrecoverable, and agents never need to edit lifecycle artifacts manually.

## Verify Steps

PLANNER fallback scaffold for "Repair exactly-once external episode recovery". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair exactly-once external episode recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-10T21:54:25.177Z — VERIFY — ok

By: TESTER

Note: PASS for implementation af1ff44cd: exactly-once task-advance suites pass (30/30); focused packet and recovery suites pass (26/26); identical consumed replay is idempotent, conflicting replay fails closed, plain advance resumes result_received, ownership conflict creates no phantom exchange, and replacement gets a distinct transition; typecheck, ESLint, changed-format, diff check, and hotspot gates pass. Full critical-cli stopped on the pre-existing RF-04 workspace dependency-seed path defect before reaching changed tests; this is unrelated to the patch.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T21:53:29.646Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
- old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T21:57:24.289Z — VERIFY — ok

By: TESTER

Note: PASS reused after rebase: implementation b633b400c has the exact stable patch-id 6b5ea030de0049fcb030d7808fd42f2ee49ac5af as previously verified af1ff44cd; no code, tests, Verify Steps, or declared inputs changed. Reused the prior exactly-once suites, typecheck, ESLint, changed-format, diff, and hotspot receipts without rerunning them. The pre-existing RF-04 workspace dependency-seed defect remains unrelated.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T21:55:26.196Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
- old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T22:11:24.492Z — VERIFY — ok

By: TESTER

Note: PASS for implementation 2af7e6bd4: focused exactly-once and supervisor suites pass 51/51; full-fast passes 546/546 test files and 3958/3958 unit tests; critical-cli passes all 12 chunks and 91/91 tests; build, typecheck, lint, format, schemas, policy routing, release parity, docs freshness, cold-start baseline, and hotspot gates pass. The first full-fast run exposed transition-parity regressions, which were corrected before this green receipt.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T22:11:21.610Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
- old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T22:19:36.486Z — VERIFY — ok

By: TESTER

Note: PASS for implementation 1a87a5216: reused the green full-fast receipt from 2af7e6bd4 because the only delta removes three export modifiers from internal helpers and changes no runtime behavior; delta checks pass knip baseline, typecheck, file ESLint, format, and package build. Hosted CI will provide the independent full rerun.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T22:19:33.848Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
- old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T22:26:42.832Z — VERIFY — ok

By: TESTER

Note: PASS for implementation a1f0190de: state-machine and all affected task-advance/supervisor suites pass 80/80; drifted running and effect-in-doubt intents become exact-key replaceable failures; CLI retires the old exchange, emits the exact replacement command, issues a distinct successor, and rejects late retired output. Typecheck, knip, ESLint, format, diff, core build, and CLI build pass; hosted CI supplies the full independent rerun.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T22:26:40.152Z, excerpt_hash=sha256:8922db684fa37dde6d3ed1b685016f3d5b2523e84a98aa8c7fae61403fac0633

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102112-AY0H1F-exactly-once-external-episode-recovery/.agentplane/tasks/202608102112-AY0H1F/blueprint/resolved-snapshot.json
- old_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- current_digest: 945ec6c25c798ad216f96f1049720fc7e2e853efc958dd7e111ac0c301f12b1d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608102112-AY0H1F

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608102112-AY0H1F
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
