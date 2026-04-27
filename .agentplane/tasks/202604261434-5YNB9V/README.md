---
id: "202604261434-5YNB9V"
title: "Remove recipes command barrel"
result_summary: "Removed recipes command barrel layers and reduced Knip baseline total to 452."
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
  updated_at: "2026-04-26T14:34:11.443Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T14:38:04.676Z"
  updated_by: "CODER"
  note: "Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=452. Command: focused recipes/scenario/runner/testkit vitest; Result: pass; Evidence: 8 files, 39 tests passed across focused batches. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
commit:
  hash: "86156570f390da1109399a9907c117a35ae5fcca"
  message: "🚧 5YNB9V task: remove recipes command barrel"
comments:
  -
    author: "CODER"
    body: "Start: Removing the internal recipes command barrel by migrating current workspace consumers to direct imports, then refreshing Knip and validating recipes/runner/testkit coverage."
  -
    author: "CODER"
    body: "Verified: Recipes command barrels removed, workspace consumers now import direct recipe implementation modules, Knip baseline total reduced from 504 to 452, and local code checks passed."
events:
  -
    type: "status"
    at: "2026-04-26T14:34:24.859Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Removing the internal recipes command barrel by migrating current workspace consumers to direct imports, then refreshing Knip and validating recipes/runner/testkit coverage."
  -
    type: "verify"
    at: "2026-04-26T14:38:04.676Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=452. Command: focused recipes/scenario/runner/testkit vitest; Result: pass; Evidence: 8 files, 39 tests passed across focused batches. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
  -
    type: "status"
    at: "2026-04-26T14:38:24.111Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Recipes command barrels removed, workspace consumers now import direct recipe implementation modules, Knip baseline total reduced from 504 to 452, and local code checks passed."
doc_version: 3
doc_updated_at: "2026-04-26T14:38:24.111Z"
doc_updated_by: "CODER"
description: "Replace the internal commands/recipes.ts barrel with direct imports from its current workspace callsites, delete the barrel, and refresh the Knip baseline."
sections:
  Summary: |-
    Remove recipes command barrel
    
    Replace the internal commands/recipes.ts barrel with direct imports from its current workspace callsites, delete the barrel, and refresh the Knip baseline.
  Scope: |-
    - In scope: Replace the internal commands/recipes.ts barrel with direct imports from its current workspace callsites, delete the barrel, and refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Remove recipes command barrel".
  Plan: |-
    Plan:
    1. Confirm commands/recipes.ts is used only by workspace internals and not documented as a public package export.
    2. Migrate testkit and runner recipe-context imports to direct impl/package imports.
    3. Delete commands/recipes.ts and refresh scripts/baselines/knip-baseline.json.
    4. Verify with typecheck, lint:core, knip baseline check, focused recipes/runner/testkit tests, framework bootstrap if needed, format:check, and git diff --check.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T14:38:04.676Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=452. Command: focused recipes/scenario/runner/testkit vitest; Result: pass; Evidence: 8 files, 39 tests passed across focused batches. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T14:34:24.865Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove recipes command barrel

Replace the internal commands/recipes.ts barrel with direct imports from its current workspace callsites, delete the barrel, and refresh the Knip baseline.

## Scope

- In scope: Replace the internal commands/recipes.ts barrel with direct imports from its current workspace callsites, delete the barrel, and refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Remove recipes command barrel".

## Plan

Plan:
1. Confirm commands/recipes.ts is used only by workspace internals and not documented as a public package export.
2. Migrate testkit and runner recipe-context imports to direct impl/package imports.
3. Delete commands/recipes.ts and refresh scripts/baselines/knip-baseline.json.
4. Verify with typecheck, lint:core, knip baseline check, focused recipes/runner/testkit tests, framework bootstrap if needed, format:check, and git diff --check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T14:38:04.676Z — VERIFY — ok

By: CODER

Note: Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=452. Command: focused recipes/scenario/runner/testkit vitest; Result: pass; Evidence: 8 files, 39 tests passed across focused batches. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T14:34:24.865Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
