---
id: "202603081732-301XC8"
title: "Make upgrade restore workflow runtime artifacts"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "upgrade"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
doc_version: 3
doc_updated_at: "2026-03-08T17:32:03.580Z"
doc_updated_by: "CODER"
description: "Ensure agentplane upgrade brings legacy projects to the current runnable workflow state by generating or refreshing .agentplane/WORKFLOW.md and .agentplane/workflows/last-known-good.md instead of leaving workflow bootstrap to init only."
id_source: "generated"
---
## Summary

Make upgrade restore workflow runtime artifacts

Ensure agentplane upgrade brings legacy projects to the current runnable workflow state by generating or refreshing .agentplane/WORKFLOW.md and .agentplane/workflows/last-known-good.md instead of leaving workflow bootstrap to init only.

## Scope

- In scope: Ensure agentplane upgrade brings legacy projects to the current runnable workflow state by generating or refreshing .agentplane/WORKFLOW.md and .agentplane/workflows/last-known-good.md instead of leaving workflow bootstrap to init only.
- Out of scope: unrelated refactors not required for "Make upgrade restore workflow runtime artifacts".

## Plan

1. Implement the change for "Make upgrade restore workflow runtime artifacts".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
