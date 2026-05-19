---
id: "202605171325-7P5M3V"
title: "Warn when local task state is stale relative to origin main"
result_summary: "Closed as included in merged v0.6 follow-up PR #3915."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
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
  updated_at: "2026-05-17T13:28:05.930Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T06:17:54.057Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T06:17:54.057Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state."
  evaluated_sha: "e5e1eeeba01807a4a4c4b03282d22ca208130d4d"
  blueprint_digest: "518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4"
  evidence_refs:
    - ".agentplane/tasks/202605171325-7P5M3V/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P5M3V/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "e5e1eeeba01807a4a4c4b03282d22ca208130d4d"
  message: "Merge pull request #3919 from basilisk-labs/task-close/202605181816-3W350X/94be1f5afed7"
comments:
  -
    author: "CODER"
    body: "Start: add stale local task-state diagnostics for release-planning and read-heavy startup surfaces when the base checkout is behind origin/main without blocking offline workflows."
  -
    author: "INTEGRATOR"
    body: "Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix was included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed."
events:
  -
    type: "status"
    at: "2026-05-18T17:41:22.773Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add stale local task-state diagnostics for release-planning and read-heavy startup surfaces when the base checkout is behind origin/main without blocking offline workflows."
  -
    type: "verify"
    at: "2026-05-18T17:46:12.661Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release state/next-action now expose behind-upstream and stale-current-plan blockers so release preparation does not proceed from stale local state; release state smoke passed."
  -
    type: "verify"
    at: "2026-05-19T06:17:53.124Z"
    author: "CODER"
    state: "ok"
    note: "Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix is already included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed."
  -
    type: "verify"
    at: "2026-05-19T06:17:54.057Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state."
  -
    type: "status"
    at: "2026-05-19T06:17:54.695Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix was included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed."
doc_version: 3
doc_updated_at: "2026-05-19T06:17:54.696Z"
doc_updated_by: "INTEGRATOR"
description: "Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions."
sections:
  Summary: |-
    Warn when local task state is stale relative to origin main

    Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.
  Scope: |-
    - In scope: Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.
    - Out of scope: unrelated refactors not required for "Warn when local task state is stale relative to origin main".
  Plan: "Plan: 1. Identify the startup/read-heavy command path where AgentPlane can cheaply compare the current checkout against origin/main or the configured upstream without requiring mutation. 2. Add a bounded stale-state diagnostic for quickstart/task-list/release-planning surfaces when HEAD is behind upstream and task records may be stale. 3. Ensure the warning is actionable and does not block normal offline/local workflows when no upstream is configured. 4. Add tests for behind-upstream, no-upstream, and clean/current states. 5. Verify focused CLI tests, release-planning behavior if touched, routing policy, and doctor output."
  Verify Steps: |-
    1. Add focused CLI/runtime tests for a repository whose HEAD is behind its configured upstream. Expected: the selected startup or task-list surface emits a clear stale-state warning with local and upstream refs.
    2. Add tests for no-upstream/offline/current-checkout cases. Expected: commands remain usable and do not emit misleading network-dependent failures.
    3. Run the focused CLI tests covering the changed command surface. Expected: all tests pass.
    4. Run a controlled smoke command equivalent to ap task list or ap quickstart in the behind-upstream fixture. Expected: the warning explains that local task state may be stale relative to origin/main.
    5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T17:46:12.661Z — VERIFY — ok

    By: CODER

    Note: Verified: release state/next-action now expose behind-upstream and stale-current-plan blockers so release preparation does not proceed from stale local state; release state smoke passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:22.773Z, excerpt_hash=sha256:8a36d26be7a7c4e3348d77a02cb263ce2376c1477972101e16399b3f254a35b6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171325-7P5M3V/blueprint/resolved-snapshot.json
    - old_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
    - current_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171325-7P5M3V

    ### 2026-05-19T06:17:53.124Z — VERIFY — ok

    By: CODER

    Note: Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix is already included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:46:12.694Z, excerpt_hash=sha256:8a36d26be7a7c4e3348d77a02cb263ce2376c1477972101e16399b3f254a35b6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P5M3V/blueprint/resolved-snapshot.json
    - old_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
    - current_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171325-7P5M3V

    ### 2026-05-19T06:17:54.057Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T06:17:53.146Z, excerpt_hash=sha256:8a36d26be7a7c4e3348d77a02cb263ce2376c1477972101e16399b3f254a35b6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P5M3V/blueprint/resolved-snapshot.json
    - old_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
    - current_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171325-7P5M3V

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Warn when local task state is stale relative to origin main

Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.

## Scope

- In scope: Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.
- Out of scope: unrelated refactors not required for "Warn when local task state is stale relative to origin main".

## Plan

Plan: 1. Identify the startup/read-heavy command path where AgentPlane can cheaply compare the current checkout against origin/main or the configured upstream without requiring mutation. 2. Add a bounded stale-state diagnostic for quickstart/task-list/release-planning surfaces when HEAD is behind upstream and task records may be stale. 3. Ensure the warning is actionable and does not block normal offline/local workflows when no upstream is configured. 4. Add tests for behind-upstream, no-upstream, and clean/current states. 5. Verify focused CLI tests, release-planning behavior if touched, routing policy, and doctor output.

## Verify Steps

1. Add focused CLI/runtime tests for a repository whose HEAD is behind its configured upstream. Expected: the selected startup or task-list surface emits a clear stale-state warning with local and upstream refs.
2. Add tests for no-upstream/offline/current-checkout cases. Expected: commands remain usable and do not emit misleading network-dependent failures.
3. Run the focused CLI tests covering the changed command surface. Expected: all tests pass.
4. Run a controlled smoke command equivalent to ap task list or ap quickstart in the behind-upstream fixture. Expected: the warning explains that local task state may be stale relative to origin/main.
5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T17:46:12.661Z — VERIFY — ok

By: CODER

Note: Verified: release state/next-action now expose behind-upstream and stale-current-plan blockers so release preparation does not proceed from stale local state; release state smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:22.773Z, excerpt_hash=sha256:8a36d26be7a7c4e3348d77a02cb263ce2376c1477972101e16399b3f254a35b6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171325-7P5M3V/blueprint/resolved-snapshot.json
- old_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
- current_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171325-7P5M3V

### 2026-05-19T06:17:53.124Z — VERIFY — ok

By: CODER

Note: Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix is already included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:46:12.694Z, excerpt_hash=sha256:8a36d26be7a7c4e3348d77a02cb263ce2376c1477972101e16399b3f254a35b6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P5M3V/blueprint/resolved-snapshot.json
- old_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
- current_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171325-7P5M3V

### 2026-05-19T06:17:54.057Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T06:17:53.146Z, excerpt_hash=sha256:8a36d26be7a7c4e3348d77a02cb263ce2376c1477972101e16399b3f254a35b6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P5M3V/blueprint/resolved-snapshot.json
- old_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
- current_digest: 518e64e0a95e82433648558d9b4a2c97bc8ed5dd773218ae0a42c6a3d42cbad4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171325-7P5M3V

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
