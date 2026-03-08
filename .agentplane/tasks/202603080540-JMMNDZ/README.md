---
id: "202603080540-JMMNDZ"
title: "P0: extract doctor checks into modular runners"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T05:40:37.778Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T05:46:12.154Z"
  updated_by: "CODER"
  note: "Doctor checks were extracted into dedicated runtime/workspace/layering/workflow/archive/fixes modules. Targeted doctor.command tests passed, lint passed, agentplane build passed, and agentplane doctor preserved the current diagnostics contract."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract doctor checks into narrower modules, keep diagnostics behavior stable, and verify the refactor with targeted doctor tests plus command-level checks."
events:
  -
    type: "status"
    at: "2026-03-08T05:40:41.825Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract doctor checks into narrower modules, keep diagnostics behavior stable, and verify the refactor with targeted doctor tests plus command-level checks."
  -
    type: "verify"
    at: "2026-03-08T05:46:12.154Z"
    author: "CODER"
    state: "ok"
    note: "Doctor checks were extracted into dedicated runtime/workspace/layering/workflow/archive/fixes modules. Targeted doctor.command tests passed, lint passed, agentplane build passed, and agentplane doctor preserved the current diagnostics contract."
doc_version: 2
doc_updated_at: "2026-03-08T05:46:12.155Z"
doc_updated_by: "CODER"
description: "Split doctor.run into isolated workspace, runtime, workflow, and historical-archive check modules without changing current diagnostics semantics."
id_source: "generated"
---
## Summary

P0: extract doctor checks into modular runners

Split doctor.run into isolated workspace, runtime, workflow, and historical-archive check modules without changing current diagnostics semantics.

## Scope

- In scope: Split doctor.run into isolated workspace, runtime, workflow, and historical-archive check modules without changing current diagnostics semantics..
- Out of scope: unrelated refactors not required for "P0: extract doctor checks into modular runners".

## Plan

1. Extract doctor historical archive checks into a dedicated helper module with typed findings and severity-aware summaries. 2. Extract runtime/workspace/workflow aggregation boundaries from doctor.run so the command becomes an orchestrator instead of a monolith. 3. Preserve current CLI behavior and diagnostics text where practical, then run targeted doctor tests, lint, build, and doctor itself.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T05:46:12.154Z — VERIFY — ok

By: CODER

Note: Doctor checks were extracted into dedicated runtime/workspace/layering/workflow/archive/fixes modules. Targeted doctor.command tests passed, lint passed, agentplane build passed, and agentplane doctor preserved the current diagnostics contract.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T05:40:41.825Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
