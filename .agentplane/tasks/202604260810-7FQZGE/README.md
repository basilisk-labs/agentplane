---
id: "202604260810-7FQZGE"
title: "Enforce oversized test aggregate baseline"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T08:10:58.936Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T08:12:46.604Z"
  updated_by: "CODER"
  note: "Added aggregate oversized-test baseline caps and regression coverage."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Strengthen the oversized-test baseline by adding aggregate count and total-line caps while preserving existing per-file no-growth behavior."
events:
  -
    type: "status"
    at: "2026-04-26T08:11:03.010Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Strengthen the oversized-test baseline by adding aggregate count and total-line caps while preserving existing per-file no-growth behavior."
  -
    type: "verify"
    at: "2026-04-26T08:12:46.604Z"
    author: "CODER"
    state: "ok"
    note: "Added aggregate oversized-test baseline caps and regression coverage."
doc_version: 3
doc_updated_at: "2026-04-26T08:12:46.612Z"
doc_updated_by: "CODER"
description: "Make the oversized test baseline expose and enforce aggregate entry and line-count totals in addition to per-file no-growth checks."
sections:
  Summary: |-
    Enforce oversized test aggregate baseline
    
    Make the oversized test baseline expose and enforce aggregate entry and line-count totals in addition to per-file no-growth checks.
  Scope: |-
    - In scope: Make the oversized test baseline expose and enforce aggregate entry and line-count totals in addition to per-file no-growth checks.
    - Out of scope: unrelated refactors not required for "Enforce oversized test aggregate baseline".
  Plan: |-
    1. Preserve existing per-file oversized-test no-growth behavior.
    2. Add aggregate baseline metadata for entry count and total oversized-test lines.
    3. Fail the guard if current aggregate count or total grows beyond the committed baseline.
    4. Update the committed oversized-test baseline with current aggregate metadata.
    5. Add focused regression coverage for aggregate growth and verify hotspots:check plus focused script tests.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T08:12:46.604Z — VERIFY — ok
    
    By: CODER
    
    Note: Added aggregate oversized-test baseline caps and regression coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T08:11:03.017Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun run hotspots:check; Result: pass; Evidence: Oversized test baseline OK 16 entries, 18232 total lines, threshold>1000. Scope: hotspot and oversized-test ratchet.
    Command: bun run test:project -- agentplane packages/agentplane/src/cli/hotspot-report-script.test.ts; Result: pass; Evidence: 1 file, 9 tests passed. Scope: oversized baseline script behavior.
    Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: TypeScript project references.
    Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style. Scope: repository formatting.
    Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: changed diff.
    Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: workflow/runtime health.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce oversized test aggregate baseline

Make the oversized test baseline expose and enforce aggregate entry and line-count totals in addition to per-file no-growth checks.

## Scope

- In scope: Make the oversized test baseline expose and enforce aggregate entry and line-count totals in addition to per-file no-growth checks.
- Out of scope: unrelated refactors not required for "Enforce oversized test aggregate baseline".

## Plan

1. Preserve existing per-file oversized-test no-growth behavior.
2. Add aggregate baseline metadata for entry count and total oversized-test lines.
3. Fail the guard if current aggregate count or total grows beyond the committed baseline.
4. Update the committed oversized-test baseline with current aggregate metadata.
5. Add focused regression coverage for aggregate growth and verify hotspots:check plus focused script tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T08:12:46.604Z — VERIFY — ok

By: CODER

Note: Added aggregate oversized-test baseline caps and regression coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T08:11:03.017Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bun run hotspots:check; Result: pass; Evidence: Oversized test baseline OK 16 entries, 18232 total lines, threshold>1000. Scope: hotspot and oversized-test ratchet.
Command: bun run test:project -- agentplane packages/agentplane/src/cli/hotspot-report-script.test.ts; Result: pass; Evidence: 1 file, 9 tests passed. Scope: oversized baseline script behavior.
Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: TypeScript project references.
Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style. Scope: repository formatting.
Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: changed diff.
Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: workflow/runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
