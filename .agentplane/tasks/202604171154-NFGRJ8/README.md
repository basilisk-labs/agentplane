---
id: "202604171154-NFGRJ8"
title: "Replace localeCompare recipe version resolution"
result_summary: "Merged via PR #381."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:14:20.382Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: semver-sensitive flows now select 1.10.0 over 1.2.10 and 1.2.0 in list-remote, install-by-name, and add-without-version; 56 focused recipe tests passed across CLI and command layers.
    Scope: recipe latest-version resolution for cached and indexed recipes via list-remote, install, and add.
commit:
  hash: "143edd169e8ac333011715dc9d097eb32db7ee6d"
  message: "recipes/workflow: Replace localeCompare recipe version resolution (NFGRJ8) (#381)"
comments:
  -
    author: "CODER"
    body: "Start: replace localeCompare-based recipe version selection with one shared semver-aware resolver."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #381 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T12:10:36.779Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace localeCompare-based recipe version selection with one shared semver-aware resolver."
  -
    type: "verify"
    at: "2026-04-17T12:14:20.382Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: semver-sensitive flows now select 1.10.0 over 1.2.10 and 1.2.0 in list-remote, install-by-name, and add-without-version; 56 focused recipe tests passed across CLI and command layers.
      Scope: recipe latest-version resolution for cached and indexed recipes via list-remote, install, and add.
  -
    type: "status"
    at: "2026-04-17T14:42:23.191Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #381 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T14:42:23.196Z"
doc_updated_by: "INTEGRATOR"
description: "Introduce a single semver-aware version resolver for recipes install/list-remote/add so latest version selection is numerically correct."
sections:
  Summary: |-
    Replace localeCompare recipe version resolution
    
    Introduce a single semver-aware version resolver for recipes install/list-remote/add so latest version selection is numerically correct.
  Scope: |-
    - In scope: Introduce a single semver-aware version resolver for recipes install/list-remote/add so latest version selection is numerically correct.
    - Out of scope: unrelated refactors not required for "Replace localeCompare recipe version resolution".
  Plan: |-
    1. Identify every recipe cache/vendor path that selects a latest version via localeCompare.
    2. Introduce one shared semver-aware comparison helper for cached recipe versions.
    3. Switch list-remote, install, and add to the shared resolver and cover edge cases like 1.2.0 vs 1.10.0 vs 1.2.10.
    4. Verify focused recipe command tests and record the task evidence.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:14:20.382Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: semver-sensitive flows now select 1.10.0 over 1.2.10 and 1.2.0 in list-remote, install-by-name, and add-without-version; 56 focused recipe tests passed across CLI and command layers.\nScope: recipe latest-version resolution for cached and indexed recipes via list-remote, install, and add.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:10:36.801Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Replace localeCompare recipe version resolution

Introduce a single semver-aware version resolver for recipes install/list-remote/add so latest version selection is numerically correct.

## Scope

- In scope: Introduce a single semver-aware version resolver for recipes install/list-remote/add so latest version selection is numerically correct.
- Out of scope: unrelated refactors not required for "Replace localeCompare recipe version resolution".

## Plan

1. Identify every recipe cache/vendor path that selects a latest version via localeCompare.
2. Introduce one shared semver-aware comparison helper for cached recipe versions.
3. Switch list-remote, install, and add to the shared resolver and cover edge cases like 1.2.0 vs 1.10.0 vs 1.2.10.
4. Verify focused recipe command tests and record the task evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:14:20.382Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: semver-sensitive flows now select 1.10.0 over 1.2.10 and 1.2.0 in list-remote, install-by-name, and add-without-version; 56 focused recipe tests passed across CLI and command layers.\nScope: recipe latest-version resolution for cached and indexed recipes via list-remote, install, and add.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:10:36.801Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
