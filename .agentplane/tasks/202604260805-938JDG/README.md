---
id: "202604260805-938JDG"
title: "Convert Knip baseline to JSON allowlist"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T08:06:03.455Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T08:10:08.372Z"
  updated_by: "CODER"
  note: "Converted Knip baseline to named JSON allowlist and added script regression coverage."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Convert the Knip guard from scalar totals to a concrete JSON allowlist so new unused files, exports, and types are review-visible in CI."
events:
  -
    type: "status"
    at: "2026-04-26T08:06:09.610Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Convert the Knip guard from scalar totals to a concrete JSON allowlist so new unused files, exports, and types are review-visible in CI."
  -
    type: "verify"
    at: "2026-04-26T08:10:08.372Z"
    author: "CODER"
    state: "ok"
    note: "Converted Knip baseline to named JSON allowlist and added script regression coverage."
doc_version: 3
doc_updated_at: "2026-04-26T08:10:08.380Z"
doc_updated_by: "CODER"
description: "Replace scalar Knip unused-code baseline limits with a committed JSON baseline that records concrete unused files, exports, and types for reviewable drift."
sections:
  Summary: |-
    Convert Knip baseline to JSON allowlist
    
    Replace scalar Knip unused-code baseline limits with a committed JSON baseline that records concrete unused files, exports, and types for reviewable drift.
  Scope: |-
    - In scope: Replace scalar Knip unused-code baseline limits with a committed JSON baseline that records concrete unused files, exports, and types for reviewable drift.
    - Out of scope: unrelated refactors not required for "Convert Knip baseline to JSON allowlist".
  Plan: |-
    1. Inspect the current Knip JSON reporter shape and existing baseline checker.
    2. Add a committed scripts/baselines/knip-baseline.json with concrete issue entries.
    3. Update check-knip-baseline.mjs to compare current Knip output against that allowlist and report named added/removed drift.
    4. Keep scalar summary output for CI readability while making new unused symbols visible.
    5. Verify with knip:check, focused script tests if present, typecheck, format:check, git diff --check, framework bootstrap if runtime files change, and agentplane doctor.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T08:10:08.372Z — VERIFY — ok
    
    By: CODER
    
    Note: Converted Knip baseline to named JSON allowlist and added script regression coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T08:06:09.636Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: node scripts/check-knip-baseline.mjs --update-baseline; Result: pass; Evidence: wrote scripts/baselines/knip-baseline.json with files=5 exports=231 types=291 total=527. Scope: baseline generation.
    Command: bun run knip:check; Result: pass; Evidence: Knip unused-code baseline OK files=5/5 exports=231/231 types=291/291 total=527/527. Scope: named allowlist guard.
    Command: bun run test:project -- agentplane packages/agentplane/src/cli/check-knip-baseline-script.test.ts; Result: pass; Evidence: 1 file, 2 tests passed. Scope: update and named-diff behavior.
    Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: script test/type references.
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

Convert Knip baseline to JSON allowlist

Replace scalar Knip unused-code baseline limits with a committed JSON baseline that records concrete unused files, exports, and types for reviewable drift.

## Scope

- In scope: Replace scalar Knip unused-code baseline limits with a committed JSON baseline that records concrete unused files, exports, and types for reviewable drift.
- Out of scope: unrelated refactors not required for "Convert Knip baseline to JSON allowlist".

## Plan

1. Inspect the current Knip JSON reporter shape and existing baseline checker.
2. Add a committed scripts/baselines/knip-baseline.json with concrete issue entries.
3. Update check-knip-baseline.mjs to compare current Knip output against that allowlist and report named added/removed drift.
4. Keep scalar summary output for CI readability while making new unused symbols visible.
5. Verify with knip:check, focused script tests if present, typecheck, format:check, git diff --check, framework bootstrap if runtime files change, and agentplane doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T08:10:08.372Z — VERIFY — ok

By: CODER

Note: Converted Knip baseline to named JSON allowlist and added script regression coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T08:06:09.636Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: node scripts/check-knip-baseline.mjs --update-baseline; Result: pass; Evidence: wrote scripts/baselines/knip-baseline.json with files=5 exports=231 types=291 total=527. Scope: baseline generation.
Command: bun run knip:check; Result: pass; Evidence: Knip unused-code baseline OK files=5/5 exports=231/231 types=291/291 total=527/527. Scope: named allowlist guard.
Command: bun run test:project -- agentplane packages/agentplane/src/cli/check-knip-baseline-script.test.ts; Result: pass; Evidence: 1 file, 2 tests passed. Scope: update and named-diff behavior.
Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: script test/type references.
Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style. Scope: repository formatting.
Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: changed diff.
Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: workflow/runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
