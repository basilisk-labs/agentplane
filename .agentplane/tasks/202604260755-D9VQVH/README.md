---
id: "202604260755-D9VQVH"
title: "Remove internal test and shim cleanup"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T07:55:59.175Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T08:04:58.714Z"
  updated_by: "CODER"
  note: "Removed internal testing and shim surfaces; verification passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Remove low-signal internal test and shim surfaces in the current direct checkout, keeping behavior unchanged and verifying with focused imports plus type/check coverage."
events:
  -
    type: "status"
    at: "2026-04-26T07:56:07.559Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove low-signal internal test and shim surfaces in the current direct checkout, keeping behavior unchanged and verifying with focused imports plus type/check coverage."
  -
    type: "verify"
    at: "2026-04-26T08:04:58.714Z"
    author: "CODER"
    state: "ok"
    note: "Removed internal testing and shim surfaces; verification passed."
doc_version: 3
doc_updated_at: "2026-04-26T08:04:58.724Z"
doc_updated_by: "CODER"
description: "Remove low-signal shim files and internal testing helper leaks by moving call sites to direct owner modules or testkit-owned helpers."
sections:
  Summary: |-
    Remove internal test and shim cleanup
    
    Remove low-signal shim files and internal testing helper leaks by moving call sites to direct owner modules or testkit-owned helpers.
  Scope: |-
    - In scope: Remove low-signal shim files and internal testing helper leaks by moving call sites to direct owner modules or testkit-owned helpers.
    - Out of scope: unrelated refactors not required for "Remove internal test and shim cleanup".
  Plan: |-
    1. Inspect all imports of the target shim/test helper files.
    2. Move writeExecutableFile into @agentplane/testkit and switch agentplane tests to import it from testkit.
    3. Inline or relocate createRunnerRunId and incidents/clock/cleanup shim exports into owner modules.
    4. Delete the obsolete shim/test surface files.
    5. Verify with focused rg checks, typecheck, knip:check, and focused tests for touched surfaces.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T08:04:58.714Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed internal testing and shim surfaces; verification passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T07:56:07.585Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: full TypeScript project references.
    Command: bun run knip:check; Result: pass; Evidence: Knip unused-code baseline OK files=5/5 exports=231/236 types=291/294 total=527/535. Scope: unused-code baseline.
    Command: bun run test:project -- agentplane packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts; Result: pass; Evidence: 3 files, 14 tests passed. Scope: changed release helper imports and integrate cleanup mock.
    Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style. Scope: repository formatting.
    Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: changed diff.
    Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready. Scope: repo-local runtime after source edits.
    Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: workflow/runtime health.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove internal test and shim cleanup

Remove low-signal shim files and internal testing helper leaks by moving call sites to direct owner modules or testkit-owned helpers.

## Scope

- In scope: Remove low-signal shim files and internal testing helper leaks by moving call sites to direct owner modules or testkit-owned helpers.
- Out of scope: unrelated refactors not required for "Remove internal test and shim cleanup".

## Plan

1. Inspect all imports of the target shim/test helper files.
2. Move writeExecutableFile into @agentplane/testkit and switch agentplane tests to import it from testkit.
3. Inline or relocate createRunnerRunId and incidents/clock/cleanup shim exports into owner modules.
4. Delete the obsolete shim/test surface files.
5. Verify with focused rg checks, typecheck, knip:check, and focused tests for touched surfaces.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T08:04:58.714Z — VERIFY — ok

By: CODER

Note: Removed internal testing and shim surfaces; verification passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T07:56:07.585Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: full TypeScript project references.
Command: bun run knip:check; Result: pass; Evidence: Knip unused-code baseline OK files=5/5 exports=231/236 types=291/294 total=527/535. Scope: unused-code baseline.
Command: bun run test:project -- agentplane packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts; Result: pass; Evidence: 3 files, 14 tests passed. Scope: changed release helper imports and integrate cleanup mock.
Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style. Scope: repository formatting.
Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: changed diff.
Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready. Scope: repo-local runtime after source edits.
Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: workflow/runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
