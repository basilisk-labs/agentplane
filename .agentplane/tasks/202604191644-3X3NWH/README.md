---
id: "202604191644-3X3NWH"
title: "Consolidate excess types files and add guardrail"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:18:50.764Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T16:23:53.666Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202604191644-3X3NWH; Result: pass; Evidence: verification contract reviewed. Command: bun run check:types-files; Result: pass; Evidence: types.ts guardrail OK count=10 max=10. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited 0."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Consolidating generic types files and adding a guardrail for future type barrels."
events:
  -
    type: "status"
    at: "2026-04-20T16:19:00.809Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Consolidating generic types files and adding a guardrail for future type barrels."
  -
    type: "verify"
    at: "2026-04-20T16:23:53.666Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202604191644-3X3NWH; Result: pass; Evidence: verification contract reviewed. Command: bun run check:types-files; Result: pass; Evidence: types.ts guardrail OK count=10 max=10. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited 0."
doc_version: 3
doc_updated_at: "2026-04-20T16:23:53.673Z"
doc_updated_by: "CODER"
description: "Epic J′. Reduce the number of distributed types.ts files and add a guardrail for module-local type organization."
sections:
  Summary: |-
    Consolidate excess types files and add guardrail
    
    Epic J′. Reduce the number of distributed types.ts files and add a guardrail for module-local type organization.
  Scope: |-
    - In scope: Epic J′. Reduce the number of distributed types.ts files and add a guardrail for module-local type organization.
    - Out of scope: unrelated refactors not required for "Consolidate excess types files and add guardrail".
  Plan: "Reduce generic types.ts spread without destabilizing domain contracts. Rename the small/local types.ts modules to semantic filenames (policy model, runtime resolver contracts, init model, hosted merge sync model), update imports/exports, and leave only justified large domain type barrels on an explicit allowlist. Add a scripts/check-types-files.mjs guardrail plus package script so CI/local checks fail when new non-allowlisted types.ts files appear or the count exceeds 10. Verification: agentplane task verify-show; bun run check:types-files; bun run typecheck; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T16:23:53.666Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604191644-3X3NWH; Result: pass; Evidence: verification contract reviewed. Command: bun run check:types-files; Result: pass; Evidence: types.ts guardrail OK count=10 max=10. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited 0.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:19:00.815Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Consolidate excess types files and add guardrail

Epic J′. Reduce the number of distributed types.ts files and add a guardrail for module-local type organization.

## Scope

- In scope: Epic J′. Reduce the number of distributed types.ts files and add a guardrail for module-local type organization.
- Out of scope: unrelated refactors not required for "Consolidate excess types files and add guardrail".

## Plan

Reduce generic types.ts spread without destabilizing domain contracts. Rename the small/local types.ts modules to semantic filenames (policy model, runtime resolver contracts, init model, hosted merge sync model), update imports/exports, and leave only justified large domain type barrels on an explicit allowlist. Add a scripts/check-types-files.mjs guardrail plus package script so CI/local checks fail when new non-allowlisted types.ts files appear or the count exceeds 10. Verification: agentplane task verify-show; bun run check:types-files; bun run typecheck; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T16:23:53.666Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604191644-3X3NWH; Result: pass; Evidence: verification contract reviewed. Command: bun run check:types-files; Result: pass; Evidence: types.ts guardrail OK count=10 max=10. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited 0.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:19:00.815Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
