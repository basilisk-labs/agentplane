---
id: "202604261611-V3TYHZ"
title: "Remove run-cli core command barrel"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  updated_at: "2026-04-26T16:12:02.099Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T16:13:25.999Z"
  updated_by: "CODER"
  note: "Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=440. Command: focused core command vitest; Result: pass; Evidence: 3 files, 12 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Removing the unused run-cli core command barrel by migrating its unit-test imports to direct modules, then refreshing Knip and validating core command coverage."
events:
  -
    type: "status"
    at: "2026-04-26T16:12:11.141Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Removing the unused run-cli core command barrel by migrating its unit-test imports to direct modules, then refreshing Knip and validating core command coverage."
  -
    type: "verify"
    at: "2026-04-26T16:13:25.999Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=440. Command: focused core command vitest; Result: pass; Evidence: 3 files, 12 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready."
doc_version: 3
doc_updated_at: "2026-04-26T16:13:26.002Z"
doc_updated_by: "CODER"
description: "Replace unit-test imports from cli/run-cli/commands/core.ts with direct module imports, delete the unused barrel, and refresh the Knip baseline."
sections:
  Summary: |-
    Remove run-cli core command barrel
    
    Replace unit-test imports from cli/run-cli/commands/core.ts with direct module imports, delete the unused barrel, and refresh the Knip baseline.
  Scope: |-
    - In scope: Replace unit-test imports from cli/run-cli/commands/core.ts with direct module imports, delete the unused barrel, and refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Remove run-cli core command barrel".
  Plan: |-
    Plan:
    1. Confirm cli/run-cli/commands/core.ts has only test callsites and is not part of command loading.
    2. Update core.unit.test.ts dynamic imports to import core/role.js and core/agents.js directly.
    3. Delete cli/run-cli/commands/core.ts and refresh scripts/baselines/knip-baseline.json.
    4. Verify with typecheck, lint:core, knip baseline check, focused core command tests, format:check, git diff --check, and framework bootstrap if runtime snapshot requires it.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T16:13:25.999Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=440. Command: focused core command vitest; Result: pass; Evidence: 3 files, 12 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:12:11.147Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove run-cli core command barrel

Replace unit-test imports from cli/run-cli/commands/core.ts with direct module imports, delete the unused barrel, and refresh the Knip baseline.

## Scope

- In scope: Replace unit-test imports from cli/run-cli/commands/core.ts with direct module imports, delete the unused barrel, and refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Remove run-cli core command barrel".

## Plan

Plan:
1. Confirm cli/run-cli/commands/core.ts has only test callsites and is not part of command loading.
2. Update core.unit.test.ts dynamic imports to import core/role.js and core/agents.js directly.
3. Delete cli/run-cli/commands/core.ts and refresh scripts/baselines/knip-baseline.json.
4. Verify with typecheck, lint:core, knip baseline check, focused core command tests, format:check, git diff --check, and framework bootstrap if runtime snapshot requires it.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T16:13:25.999Z — VERIFY — ok

By: CODER

Note: Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: node scripts/check-knip-baseline.mjs; Result: pass; Evidence: baseline OK total=440. Command: focused core command vitest; Result: pass; Evidence: 3 files, 12 tests passed. Command: bun run format:check and git diff --check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:12:11.147Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
