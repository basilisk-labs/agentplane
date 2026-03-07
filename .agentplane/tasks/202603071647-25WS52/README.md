---
id: "202603071647-25WS52"
title: "Cover repo-local handoff with tests and docs"
result_summary: "Repo-local handoff is now covered by end-to-end wrapper tests, and framework-checkout docs explain the default handoff plus the global opt-out path."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-07T16:56:21.691Z"
  updated_by: "REVIEWER"
  note: "Verified: end-to-end wrapper regressions now cover nested-cwd delegation, opt-out, and recursion guard, and the framework-checkout docs match the new handoff model."
commit:
  hash: "f4c550307444bebfa3c32438ec15aca070a0f56a"
  message: "🧭 25WS52 task: cover repo-local handoff"
comments:
  -
    author: "DOCS"
    body: "Start: add handoff regressions for nested cwd and opt-out behavior, then sync setup and developer docs with the new framework-checkout routing model."
  -
    author: "DOCS"
    body: "Verified: added end-to-end repo-local handoff regressions and synchronized setup, troubleshooting, and testing docs with the new framework-checkout behavior."
events:
  -
    type: "status"
    at: "2026-03-07T16:52:47.284Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: add handoff regressions for nested cwd and opt-out behavior, then sync setup and developer docs with the new framework-checkout routing model."
  -
    type: "verify"
    at: "2026-03-07T16:56:21.691Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: end-to-end wrapper regressions now cover nested-cwd delegation, opt-out, and recursion guard, and the framework-checkout docs match the new handoff model."
  -
    type: "status"
    at: "2026-03-07T16:56:21.917Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: added end-to-end repo-local handoff regressions and synchronized setup, troubleshooting, and testing docs with the new framework-checkout behavior."
doc_version: 2
doc_updated_at: "2026-03-07T16:56:21.917Z"
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
#### 2026-03-07T16:56:21.691Z — VERIFY — ok

By: REVIEWER

Note: Verified: end-to-end wrapper regressions now cover nested-cwd delegation, opt-out, and recursion guard, and the framework-checkout docs match the new handoff model.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:52:47.284Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
