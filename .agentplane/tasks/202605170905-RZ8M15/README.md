---
id: "202605170905-RZ8M15"
title: "Minimize branch_pr generated artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T09:06:02.588Z"
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
    body: "Start: investigating untracked branch_pr artifacts and tightening generated artifact handling so repo status does not accumulate transient files."
events:
  -
    type: "status"
    at: "2026-05-18T10:46:46.303Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating untracked branch_pr artifacts and tightening generated artifact handling so repo status does not accumulate transient files."
doc_version: 3
doc_updated_at: "2026-05-18T10:46:46.303Z"
doc_updated_by: "CODER"
description: "Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests."
sections:
  Summary: |-
    Minimize branch_pr generated artifacts

    Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.
  Scope: |-
    - In scope: Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.
    - Out of scope: unrelated refactors not required for "Minimize branch_pr generated artifacts".
  Plan: |-
    1. Audit current artifact writers for handoff history, blueprint snapshots, PR projections, ACR, runner/debug artifacts, and website social PNG generation.
    2. Implement compact tracked trace policy: keep canonical README/ACR/pr meta; move handoff history and reconstructable/generated projections to cache or on-demand paths; preserve digest/ref evidence needed to reconstruct full blueprint state.
    3. Add focused tests for drift classification, artifact writes, and any cache/manifest behavior changed.
    4. Run task verify-show plus focused test suite and record verification evidence.
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

Minimize branch_pr generated artifacts

Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.

## Scope

- In scope: Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.
- Out of scope: unrelated refactors not required for "Minimize branch_pr generated artifacts".

## Plan

1. Audit current artifact writers for handoff history, blueprint snapshots, PR projections, ACR, runner/debug artifacts, and website social PNG generation.
2. Implement compact tracked trace policy: keep canonical README/ACR/pr meta; move handoff history and reconstructable/generated projections to cache or on-demand paths; preserve digest/ref evidence needed to reconstruct full blueprint state.
3. Add focused tests for drift classification, artifact writes, and any cache/manifest behavior changed.
4. Run task verify-show plus focused test suite and record verification evidence.

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
