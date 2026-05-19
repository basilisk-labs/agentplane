---
id: "202605171325-7P2VM4"
title: "Fix task scanner handling of invalid legacy README frontmatter"
result_summary: "Closed as included in merged v0.6 follow-up PR #3915."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T13:28:02.519Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T06:17:51.569Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T06:17:51.569Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state."
  evaluated_sha: "e5e1eeeba01807a4a4c4b03282d22ca208130d4d"
  blueprint_digest: "d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4"
  evidence_refs:
    - ".agentplane/tasks/202605171325-7P2VM4/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P2VM4/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "e5e1eeeba01807a4a4c4b03282d22ca208130d4d"
  message: "Merge pull request #3919 from basilisk-labs/task-close/202605181816-3W350X/94be1f5afed7"
comments:
  -
    author: "CODER"
    body: "Start: make task scanning robust to invalid legacy README frontmatter so release planning does not silently lose task records and users get actionable diagnostics."
  -
    author: "INTEGRATOR"
    body: "Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix was included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed."
events:
  -
    type: "status"
    at: "2026-05-18T17:41:27.628Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make task scanning robust to invalid legacy README frontmatter so release planning does not silently lose task records and users get actionable diagnostics."
  -
    type: "verify"
    at: "2026-05-18T17:46:13.570Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task scanner no longer silently skips invalid legacy task READMEs; it emits actionable warnings while preserving valid task projection. Focused tasks-export tests passed."
  -
    type: "verify"
    at: "2026-05-19T06:17:50.647Z"
    author: "CODER"
    state: "ok"
    note: "Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix is already included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed."
  -
    type: "verify"
    at: "2026-05-19T06:17:51.569Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state."
  -
    type: "status"
    at: "2026-05-19T06:17:52.264Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix was included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed."
doc_version: 3
doc_updated_at: "2026-05-19T06:17:52.265Z"
doc_updated_by: "INTEGRATOR"
description: "Make task scanning and diagnostics robust when a historical or generated task README has non-canonical frontmatter, using 202605151620-CTXIN as the regression case. The CLI should not silently lose the task from release planning; it should either repair, migrate, or emit actionable diagnostics without hiding the rest of the task registry."
sections:
  Summary: |-
    Fix task scanner handling of invalid legacy README frontmatter

    Make task scanning and diagnostics robust when a historical or generated task README has non-canonical frontmatter, using 202605151620-CTXIN as the regression case. The CLI should not silently lose the task from release planning; it should either repair, migrate, or emit actionable diagnostics without hiding the rest of the task registry.
  Scope: |-
    - In scope: Make task scanning and diagnostics robust when a historical or generated task README has non-canonical frontmatter, using 202605151620-CTXIN as the regression case. The CLI should not silently lose the task from release planning; it should either repair, migrate, or emit actionable diagnostics without hiding the rest of the task registry.
    - Out of scope: unrelated refactors not required for "Fix task scanner handling of invalid legacy README frontmatter".
  Plan: "Plan: 1. Reproduce the current scanner failure with historical task 202605151620-CTXIN or an equivalent fixture containing non-canonical README frontmatter. 2. Decide the intended behavior: tolerant scan with actionable warning, explicit repair command, or migration path; do not silently hide the task from registry views. 3. Implement the smallest robust parser/diagnostic change in the task backend or scanner layer. 4. Add regression coverage for invalid verification state/frontmatter so task list and release-planning reads remain usable. 5. Verify focused task scanner tests, task list behavior, routing policy, and doctor output."
  Verify Steps: |-
    1. Add or update a fixture/task README with invalid legacy frontmatter equivalent to 202605151620-CTXIN. Expected: the scanner test proves the task is not silently lost.
    2. Run the focused task backend/scanner tests that cover README frontmatter parsing and task list projection. Expected: invalid legacy frontmatter produces actionable diagnostics or repair guidance while other tasks still list normally.
    3. Run ap task list in a fixture or controlled repo containing the invalid task. Expected: output includes a clear warning tied to the task id and preserves registry visibility for remaining tasks.
    4. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy passes.
    5. Run ap doctor. Expected: doctor passes or reports only pre-existing unrelated warnings with evidence recorded.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T17:46:13.570Z — VERIFY — ok

    By: CODER

    Note: Verified: task scanner no longer silently skips invalid legacy task READMEs; it emits actionable warnings while preserving valid task projection. Focused tasks-export tests passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:27.628Z, excerpt_hash=sha256:d84a0051bf64c11a8fb0e21f011340535d57ec23c96fc6d991482d15cabd73d6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171325-7P2VM4/blueprint/resolved-snapshot.json
    - old_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
    - current_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171325-7P2VM4

    ### 2026-05-19T06:17:50.647Z — VERIFY — ok

    By: CODER

    Note: Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix is already included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:46:13.599Z, excerpt_hash=sha256:d84a0051bf64c11a8fb0e21f011340535d57ec23c96fc6d991482d15cabd73d6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P2VM4/blueprint/resolved-snapshot.json
    - old_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
    - current_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171325-7P2VM4

    ### 2026-05-19T06:17:51.569Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T06:17:50.669Z, excerpt_hash=sha256:d84a0051bf64c11a8fb0e21f011340535d57ec23c96fc6d991482d15cabd73d6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P2VM4/blueprint/resolved-snapshot.json
    - old_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
    - current_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171325-7P2VM4

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix task scanner handling of invalid legacy README frontmatter

Make task scanning and diagnostics robust when a historical or generated task README has non-canonical frontmatter, using 202605151620-CTXIN as the regression case. The CLI should not silently lose the task from release planning; it should either repair, migrate, or emit actionable diagnostics without hiding the rest of the task registry.

## Scope

- In scope: Make task scanning and diagnostics robust when a historical or generated task README has non-canonical frontmatter, using 202605151620-CTXIN as the regression case. The CLI should not silently lose the task from release planning; it should either repair, migrate, or emit actionable diagnostics without hiding the rest of the task registry.
- Out of scope: unrelated refactors not required for "Fix task scanner handling of invalid legacy README frontmatter".

## Plan

Plan: 1. Reproduce the current scanner failure with historical task 202605151620-CTXIN or an equivalent fixture containing non-canonical README frontmatter. 2. Decide the intended behavior: tolerant scan with actionable warning, explicit repair command, or migration path; do not silently hide the task from registry views. 3. Implement the smallest robust parser/diagnostic change in the task backend or scanner layer. 4. Add regression coverage for invalid verification state/frontmatter so task list and release-planning reads remain usable. 5. Verify focused task scanner tests, task list behavior, routing policy, and doctor output.

## Verify Steps

1. Add or update a fixture/task README with invalid legacy frontmatter equivalent to 202605151620-CTXIN. Expected: the scanner test proves the task is not silently lost.
2. Run the focused task backend/scanner tests that cover README frontmatter parsing and task list projection. Expected: invalid legacy frontmatter produces actionable diagnostics or repair guidance while other tasks still list normally.
3. Run ap task list in a fixture or controlled repo containing the invalid task. Expected: output includes a clear warning tied to the task id and preserves registry visibility for remaining tasks.
4. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy passes.
5. Run ap doctor. Expected: doctor passes or reports only pre-existing unrelated warnings with evidence recorded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T17:46:13.570Z — VERIFY — ok

By: CODER

Note: Verified: task scanner no longer silently skips invalid legacy task READMEs; it emits actionable warnings while preserving valid task projection. Focused tasks-export tests passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:27.628Z, excerpt_hash=sha256:d84a0051bf64c11a8fb0e21f011340535d57ec23c96fc6d991482d15cabd73d6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171325-7P2VM4/blueprint/resolved-snapshot.json
- old_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
- current_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171325-7P2VM4

### 2026-05-19T06:17:50.647Z — VERIFY — ok

By: CODER

Note: Verified: stale DOING cleanup only; the corresponding v0.6 follow-up fix is already included in merged PR #3915 on current main, and related GitHub issues #3907, #3908, and #3909 are closed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:46:13.599Z, excerpt_hash=sha256:d84a0051bf64c11a8fb0e21f011340535d57ec23c96fc6d991482d15cabd73d6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P2VM4/blueprint/resolved-snapshot.json
- old_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
- current_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171325-7P2VM4

### 2026-05-19T06:17:51.569Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: current main contains follow-up batch PR #3915 and the related GitHub issues #3907, #3908, and #3909 are closed; this update only reconciles stale DOING state.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T06:17:50.669Z, excerpt_hash=sha256:d84a0051bf64c11a8fb0e21f011340535d57ec23c96fc6d991482d15cabd73d6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605171325-7P2VM4/blueprint/resolved-snapshot.json
- old_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
- current_digest: d0226a2f47a6779b8ee68927701214025a4825bd9e6bff1ff48febee5fcb96d4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171325-7P2VM4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
