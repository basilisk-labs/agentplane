---
id: "202605010748-NXZF00"
title: "Replace recipes catalog with code map recipe"
result_summary: "Merged via PR #658."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T07:49:12.355Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T08:04:20.789Z"
  updated_by: "CODER"
  note: "Verified code-map recipe catalog replacement: list-remote with dev public-key override passed; local archive install passed; init --recipes code-map vendored the recipe and generated prompt graph included recipe.code-map/policy/.agentplane/policy/body/code-map-discipline; bun run ci:recipes passed; bun run docs:recipes:check passed; policy routing passed."
commit:
  hash: "0ad3d226795348b90f36f72103eb2e9fd6e8d1e8"
  message: "Merge pull request #658 from basilisk-labs/task/202605010748-NXZF00/close-fix"
comments:
  -
    author: "CODER"
    body: "Start: Replace bundled recipes with one small code-map recipe and validate install/init behavior against the current AgentPlane runtime."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #658 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T07:49:29.868Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Replace bundled recipes with one small code-map recipe and validate install/init behavior against the current AgentPlane runtime."
  -
    type: "verify"
    at: "2026-05-01T08:04:20.789Z"
    author: "CODER"
    state: "ok"
    note: "Verified code-map recipe catalog replacement: list-remote with dev public-key override passed; local archive install passed; init --recipes code-map vendored the recipe and generated prompt graph included recipe.code-map/policy/.agentplane/policy/body/code-map-discipline; bun run ci:recipes passed; bun run docs:recipes:check passed; policy routing passed."
  -
    type: "status"
    at: "2026-05-01T09:03:40.245Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #658 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T09:03:40.250Z"
doc_updated_by: "INTEGRATOR"
description: "Remove existing bundled recipes and publish one small recipe that changes agent behavior by requiring a code-map check/update loop."
sections:
  Summary: |-
    Replace recipes catalog with code map recipe
    
    Remove existing bundled recipes and publish one small recipe that changes agent behavior by requiring a code-map check/update loop.
  Scope: |-
    - In scope: Remove existing bundled recipes and publish one small recipe that changes agent behavior by requiring a code-map check/update loop.
    - Out of scope: unrelated refactors not required for "Replace recipes catalog with code map recipe".
  Plan: |-
    Summary
    Replace the recipes submodule catalog contents with one small code-map recipe compatible with the current AgentPlane runtime.
    
    Scope
    - Remove the existing viewer and dokploy recipes and their generated release archives from agentplane-recipes.
    - Add one recipe that visibly modifies agent behavior by requiring agents to inspect/update a project code map before implementation.
    - Rebuild the recipe catalog/index artifacts and update the parent recipes inventory and submodule pointer.
    - Verify path/archive install and init --recipes behavior in isolated temporary projects.
    
    Plan
    1. Start a branch_pr task worktree and inspect current recipe manifest/runtime expectations.
    2. Create a single code-map recipe with minimal markdown agent/skill assets, scenario task_template, and prompt module/mutation content.
    3. Remove viewer/dokploy recipes and stale dist artifacts, then rebuild index/dist for the new recipe.
    4. Run targeted current-runtime validation, install, and init smoke tests.
    5. Commit the recipe repo change and parent submodule/inventory/task artifacts.
    
    Verify Steps
    - Validate the new recipe manifest/assets/scenario with current packages/recipes and AgentPlane apply validation.
    - Run list-remote against the rebuilt local index with the committed dev public key override.
    - Install the recipe from path and archive using isolated AGENTPLANE_HOME.
    - Run agentplane init --yes --recipes <recipe-id> in a temporary git project and confirm active overlay/prompt graph changes.
    - Run docs:recipes:check in the parent repo.
    
    Rollback Plan
    Revert the submodule commit and parent submodule pointer/inventory update if install/init validation fails.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T08:04:20.789Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified code-map recipe catalog replacement: list-remote with dev public-key override passed; local archive install passed; init --recipes code-map vendored the recipe and generated prompt graph included recipe.code-map/policy/.agentplane/policy/body/code-map-discipline; bun run ci:recipes passed; bun run docs:recipes:check passed; policy routing passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:49:29.868Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Replace recipes catalog with code map recipe

Remove existing bundled recipes and publish one small recipe that changes agent behavior by requiring a code-map check/update loop.

## Scope

- In scope: Remove existing bundled recipes and publish one small recipe that changes agent behavior by requiring a code-map check/update loop.
- Out of scope: unrelated refactors not required for "Replace recipes catalog with code map recipe".

## Plan

Summary
Replace the recipes submodule catalog contents with one small code-map recipe compatible with the current AgentPlane runtime.

Scope
- Remove the existing viewer and dokploy recipes and their generated release archives from agentplane-recipes.
- Add one recipe that visibly modifies agent behavior by requiring agents to inspect/update a project code map before implementation.
- Rebuild the recipe catalog/index artifacts and update the parent recipes inventory and submodule pointer.
- Verify path/archive install and init --recipes behavior in isolated temporary projects.

Plan
1. Start a branch_pr task worktree and inspect current recipe manifest/runtime expectations.
2. Create a single code-map recipe with minimal markdown agent/skill assets, scenario task_template, and prompt module/mutation content.
3. Remove viewer/dokploy recipes and stale dist artifacts, then rebuild index/dist for the new recipe.
4. Run targeted current-runtime validation, install, and init smoke tests.
5. Commit the recipe repo change and parent submodule/inventory/task artifacts.

Verify Steps
- Validate the new recipe manifest/assets/scenario with current packages/recipes and AgentPlane apply validation.
- Run list-remote against the rebuilt local index with the committed dev public key override.
- Install the recipe from path and archive using isolated AGENTPLANE_HOME.
- Run agentplane init --yes --recipes <recipe-id> in a temporary git project and confirm active overlay/prompt graph changes.
- Run docs:recipes:check in the parent repo.

Rollback Plan
Revert the submodule commit and parent submodule pointer/inventory update if install/init validation fails.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T08:04:20.789Z — VERIFY — ok

By: CODER

Note: Verified code-map recipe catalog replacement: list-remote with dev public-key override passed; local archive install passed; init --recipes code-map vendored the recipe and generated prompt graph included recipe.code-map/policy/.agentplane/policy/body/code-map-discipline; bun run ci:recipes passed; bun run docs:recipes:check passed; policy routing passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:49:29.868Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
