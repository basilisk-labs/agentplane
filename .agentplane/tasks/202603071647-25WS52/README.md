---
id: "202603071647-25WS52"
title: "Cover repo-local handoff with tests and docs"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603071647-Y4BZ1T"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:52:47.166Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: add end-to-end handoff regressions and sync docs/help with the new framework-checkout behavior."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: add handoff regressions for nested cwd and opt-out behavior, then sync setup and developer docs with the new framework-checkout routing model."
events:
  -
    type: "status"
    at: "2026-03-07T16:52:47.284Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: add handoff regressions for nested cwd and opt-out behavior, then sync setup and developer docs with the new framework-checkout routing model."
doc_version: 2
doc_updated_at: "2026-03-07T16:52:47.284Z"
doc_updated_by: "DOCS"
description: "Add regression coverage for nested cwd, opt-out, and hook/stale-build behavior, then sync developer-facing docs with the new framework-checkout routing model."
id_source: "generated"
---
## Summary

Cover repo-local handoff with tests and docs

Add regression coverage for nested cwd, opt-out, and hook/stale-build behavior, then sync developer-facing docs with the new framework-checkout routing model.

## Scope

- In scope: Add regression coverage for nested cwd, opt-out, and hook/stale-build behavior, then sync developer-facing docs with the new framework-checkout routing model..
- Out of scope: unrelated refactors not required for "Cover repo-local handoff with tests and docs".

## Plan

1. Add regression tests for nested cwd handoff, opt-out, and no-recursion behavior. 2. Update setup/developer docs to state that framework-checkout invocations automatically use the repo-local binary. 3. Run targeted wrapper/docs checks and close the task graph cleanly.

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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
