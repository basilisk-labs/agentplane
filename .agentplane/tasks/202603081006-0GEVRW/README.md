---
id: "202603081006-0GEVRW"
title: "Update task new/template/scaffold to README v3"
result_summary: "Task new/add/scaffold and core task creation now default to README v3, with config/schema defaults aligned to the new section contract."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-08T10:48:39.207Z"
  updated_by: "CODER"
  note: "README v3 is now the default for task creation and scaffold paths; targeted creation tests, config/schema checks, builds, and doctor all passed."
commit:
  hash: "5702a2ccd8a48b50d46c96658d3b3067b44cda17"
  message: "🧩 0GEVRW task: switch task templates to README v3"
comments:
  -
    author: "CODER"
    body: "Start: switch task creation and scaffold outputs to README v3 now that compatibility-first runtime support has landed."
  -
    author: "CODER"
    body: "Verified: task creation paths now emit doc_version=3 with the README v3 section order, and the default doc config no longer requires legacy Risks for freshly created tasks."
events:
  -
    type: "status"
    at: "2026-03-08T10:41:18.803Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch task creation and scaffold outputs to README v3 now that compatibility-first runtime support has landed."
  -
    type: "verify"
    at: "2026-03-08T10:48:39.207Z"
    author: "CODER"
    state: "ok"
    note: "README v3 is now the default for task creation and scaffold paths; targeted creation tests, config/schema checks, builds, and doctor all passed."
  -
    type: "status"
    at: "2026-03-08T10:48:55.405Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task creation paths now emit doc_version=3 with the README v3 section order, and the default doc config no longer requires legacy Risks for freshly created tasks."
doc_version: 2
doc_updated_at: "2026-03-08T10:48:55.405Z"
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
#### 2026-03-08T10:48:39.207Z — VERIFY — ok

By: CODER

Note: README v3 is now the default for task creation and scaffold paths; targeted creation tests, config/schema checks, builds, and doctor all passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T10:41:18.803Z, excerpt_hash=sha256:1774484cc975c588649b8a7b41ea9303ceb0e176932c64467d81f5a00c9c885d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
