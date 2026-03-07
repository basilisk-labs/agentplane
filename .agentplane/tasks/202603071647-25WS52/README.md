---
id: "202603071647-25WS52"
title: "Cover repo-local handoff with tests and docs"
status: "TODO"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603071647-Y4BZ1T"
tags:
  - "code"
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
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-03-07T16:47:44.964Z"
doc_updated_by: "PLANNER"
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
