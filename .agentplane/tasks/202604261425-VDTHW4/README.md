---
id: "202604261425-VDTHW4"
title: "Prune Redmine runtime barrel exports"
result_summary: "Removed internal Redmine runtime barrel and reduced Knip baseline total to 504."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "knip"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T14:25:43.858Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T14:27:17.937Z"
  updated_by: "CODER"
  note: "Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=504. Command: focused Redmine/task-backend vitest; Result: pass; Evidence: 7 files, 54 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
commit:
  hash: "cc6805aae6c1874209650843980612887ba1ffdd"
  message: "🚧 VDTHW4 task: prune Redmine runtime barrel exports"
comments:
  -
    author: "CODER"
    body: "Start: Pruning the internal Redmine runtime barrel by switching its only callsite to direct imports, then refreshing the Knip baseline and running the declared code checks."
  -
    author: "CODER"
    body: "Verified: Redmine runtime barrel removed, sole callsite now imports runtime context/methods directly, Knip baseline total reduced from 523 to 504, and local code checks passed."
events:
  -
    type: "status"
    at: "2026-04-26T14:25:50.926Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Pruning the internal Redmine runtime barrel by switching its only callsite to direct imports, then refreshing the Knip baseline and running the declared code checks."
  -
    type: "verify"
    at: "2026-04-26T14:27:17.937Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=504. Command: focused Redmine/task-backend vitest; Result: pass; Evidence: 7 files, 54 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
  -
    type: "status"
    at: "2026-04-26T14:27:50.208Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Redmine runtime barrel removed, sole callsite now imports runtime context/methods directly, Knip baseline total reduced from 523 to 504, and local code checks passed."
doc_version: 3
doc_updated_at: "2026-04-26T14:27:50.208Z"
doc_updated_by: "CODER"
description: "Replace the internal Redmine backend-runtime barrel with direct module imports from the only callsite, then refresh the Knip baseline."
sections:
  Summary: |-
    Prune Redmine runtime barrel exports
    
    Replace the internal Redmine backend-runtime barrel with direct module imports from the only callsite, then refresh the Knip baseline.
  Scope: |-
    - In scope: Replace the internal Redmine backend-runtime barrel with direct module imports from the only callsite, then refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Prune Redmine runtime barrel exports".
  Plan: |-
    Plan:
    1. Confirm backend-runtime.ts has exactly one production callsite and no docs/tests relying on it as a stable import path.
    2. Replace the RedmineBackend imports with direct imports from runtime-context.js and runtime-methods.js.
    3. Delete the now-unused backend-runtime.ts barrel and refresh scripts/baselines/knip-baseline.json.
    4. Verify with typecheck, lint:core, knip baseline check, focused Redmine/task-backend tests, framework bootstrap if runtime snapshot guard requires it, and git diff --check.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T14:27:17.937Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=504. Command: focused Redmine/task-backend vitest; Result: pass; Evidence: 7 files, 54 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T14:25:50.932Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prune Redmine runtime barrel exports

Replace the internal Redmine backend-runtime barrel with direct module imports from the only callsite, then refresh the Knip baseline.

## Scope

- In scope: Replace the internal Redmine backend-runtime barrel with direct module imports from the only callsite, then refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Prune Redmine runtime barrel exports".

## Plan

Plan:
1. Confirm backend-runtime.ts has exactly one production callsite and no docs/tests relying on it as a stable import path.
2. Replace the RedmineBackend imports with direct imports from runtime-context.js and runtime-methods.js.
3. Delete the now-unused backend-runtime.ts barrel and refresh scripts/baselines/knip-baseline.json.
4. Verify with typecheck, lint:core, knip baseline check, focused Redmine/task-backend tests, framework bootstrap if runtime snapshot guard requires it, and git diff --check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T14:27:17.937Z — VERIFY — ok

By: CODER

Note: Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=504. Command: focused Redmine/task-backend vitest; Result: pass; Evidence: 7 files, 54 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T14:25:50.932Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
