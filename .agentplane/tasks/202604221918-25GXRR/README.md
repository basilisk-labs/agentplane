---
id: "202604221918-25GXRR"
title: "Wire test routing guard into checks"
result_summary: "Wired test routing guard into existing validation checks."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604221918-HQ0WPR"
tags:
  - "code"
  - "test"
verify:
  - "bun run ci:local:fast"
  - "bun run vitest:projects:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T19:31:16.041Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T19:37:13.179Z"
  updated_by: "CODER"
  note: "Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK (315 tests, 10 primary routes). Command: bun run ci:local:fast; Result: pass; Evidence: baseline checks passed, fast test suite 238 files passed, critical suite 5 files passed."
commit:
  hash: "b5fe8213e065e2b75704cc4ab35e59ae47907050"
  message: "✨ 25GXRR test: wire routing guard into checks"
comments:
  -
    author: "CODER"
    body: "Start: wiring the test routing guard into existing project validation and local CI checks while preserving command names."
  -
    author: "CODER"
    body: "Verified: routing guard is now part of vitest project validation and local fast CI completed successfully."
events:
  -
    type: "status"
    at: "2026-04-22T19:31:16.416Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: wiring the test routing guard into existing project validation and local CI checks while preserving command names."
  -
    type: "verify"
    at: "2026-04-22T19:37:13.179Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK (315 tests, 10 primary routes). Command: bun run ci:local:fast; Result: pass; Evidence: baseline checks passed, fast test suite 238 files passed, critical suite 5 files passed."
  -
    type: "status"
    at: "2026-04-22T19:37:20.644Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: routing guard is now part of vitest project validation and local fast CI completed successfully."
doc_version: 3
doc_updated_at: "2026-04-22T19:37:20.645Z"
doc_updated_by: "CODER"
description: "Connect the routing guard to existing project and local/release validation scripts so routing drift is caught by normal developer and release flows."
sections:
  Summary: |-
    Wire test routing guard into checks
    
    Connect the routing guard to existing project and local/release validation scripts so routing drift is caught by normal developer and release flows.
  Scope: |-
    - In scope: wire the routing guard into existing developer/release checks.
    - In scope: update package scripts or existing project-check script so normal validation catches routing drift.
    - In scope: preserve existing command names where possible to avoid disrupting docs and release flows.
    - Out of scope: broad release workflow refactors or suite timing work.
  Plan: "Integrate the routing guard into existing validation commands while preserving public command names. The accepted result is that normal project checks now fail on route drift."
  Verify Steps: |-
    1. Run `bun run vitest:projects:check`. Expected: includes routing guard and passes.
    2. Run `bun run ci:local:fast`. Expected: pass.
    3. Inspect package scripts touched by the task. Expected: no obsolete command path remains documented as canonical.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T19:37:13.179Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK (315 tests, 10 primary routes). Command: bun run ci:local:fast; Result: pass; Evidence: baseline checks passed, fast test suite 238 files passed, critical suite 5 files passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:31:16.424Z, excerpt_hash=sha256:83ac03cc4d5c73459b1a31a75649eff482e098d61cb4df74b233be74fe3425b9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Wire test routing guard into checks

Connect the routing guard to existing project and local/release validation scripts so routing drift is caught by normal developer and release flows.

## Scope

- In scope: wire the routing guard into existing developer/release checks.
- In scope: update package scripts or existing project-check script so normal validation catches routing drift.
- In scope: preserve existing command names where possible to avoid disrupting docs and release flows.
- Out of scope: broad release workflow refactors or suite timing work.

## Plan

Integrate the routing guard into existing validation commands while preserving public command names. The accepted result is that normal project checks now fail on route drift.

## Verify Steps

1. Run `bun run vitest:projects:check`. Expected: includes routing guard and passes.
2. Run `bun run ci:local:fast`. Expected: pass.
3. Inspect package scripts touched by the task. Expected: no obsolete command path remains documented as canonical.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T19:37:13.179Z — VERIFY — ok

By: CODER

Note: Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK (315 tests, 10 primary routes). Command: bun run ci:local:fast; Result: pass; Evidence: baseline checks passed, fast test suite 238 files passed, critical suite 5 files passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:31:16.424Z, excerpt_hash=sha256:83ac03cc4d5c73459b1a31a75649eff482e098d61cb4df74b233be74fe3425b9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
