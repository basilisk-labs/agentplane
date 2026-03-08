---
id: "202603081006-0GEVRW"
title: "Update task new/template/scaffold to README v3"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081006-CT5BE1"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T10:41:17.700Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after CT5BE1: template/default switch can proceed now that v2/v3 dual-read and version-preserving writes are in place."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: switch task creation and scaffold outputs to README v3 now that compatibility-first runtime support has landed."
events:
  -
    type: "status"
    at: "2026-03-08T10:41:18.803Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch task creation and scaffold outputs to README v3 now that compatibility-first runtime support has landed."
doc_version: 2
doc_updated_at: "2026-03-08T10:41:18.803Z"
doc_updated_by: "CODER"
description: "Make new tasks and scaffolds render the v3 README structure with the new section layout and doc_version marker."
id_source: "generated"
---
## Summary

Update task new/template/scaffold to README v3

Make new tasks and scaffolds render the v3 README structure with the new section layout and doc_version marker.

## Scope

- In scope: Make new tasks and scaffolds render the v3 README structure with the new section layout and doc_version marker..
- Out of scope: unrelated refactors not required for "Update task new/template/scaffold to README v3".

## Plan

1. Implement the change for "Update task new/template/scaffold to README v3".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Run targeted task creation/scaffold tests. Expected: new tasks and scaffolded docs render doc_version=3 with the v3 section order.
2. Exercise CLI/task creation paths that write README files. Expected: no path still emits the legacy v2 layout for new tasks.
3. Run agentplane doctor after the template changes. Expected: no new errors or warnings in this repository.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
