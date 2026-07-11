---
id: "202607111438-5DXKKR"
title: "Fix release evidence task attribution"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  updated_at: "2026-07-11T14:38:38.675Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix deterministic release-task evidence attribution, add regression coverage, and correct v0.6.22 task evidence."
events:
  -
    type: "status"
    at: "2026-07-11T14:38:57.305Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix deterministic release-task evidence attribution, add regression coverage, and correct v0.6.22 task evidence."
doc_version: 3
doc_updated_at: "2026-07-11T14:38:57.305Z"
doc_updated_by: "CODER"
description: "Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution."
sections:
  Summary: |-
    Fix release evidence task attribution

    Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.
  Scope: |-
    - In scope: Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.
    - Out of scope: unrelated refactors not required for "Fix release evidence task attribution".
  Plan: "1. Reproduce evidence misattribution when the publish SHA changes an unrelated task after the release task merge. 2. Resolve a unique DONE release task matching publish-result version/tag from the task registry before falling back to commit-diff inference. 3. Add regression coverage for unrelated post-release task commits and ambiguity. 4. Correct v0.6.22 hosted publish evidence so it belongs to F33MNN and no longer claims 6T937A as the release task. 5. Run focused release evidence tests, publish workflow contract tests, typecheck, and CI contract; merge through protected main."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Fix release evidence task attribution

Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.

## Scope

- In scope: Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.
- Out of scope: unrelated refactors not required for "Fix release evidence task attribution".

## Plan

1. Reproduce evidence misattribution when the publish SHA changes an unrelated task after the release task merge. 2. Resolve a unique DONE release task matching publish-result version/tag from the task registry before falling back to commit-diff inference. 3. Add regression coverage for unrelated post-release task commits and ambiguity. 4. Correct v0.6.22 hosted publish evidence so it belongs to F33MNN and no longer claims 6T937A as the release task. 5. Run focused release evidence tests, publish workflow contract tests, typecheck, and CI contract; merge through protected main.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
