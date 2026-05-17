---
id: "202605171325-7P2VM4"
title: "Fix task scanner handling of invalid legacy README frontmatter"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-17T13:27:47.438Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
