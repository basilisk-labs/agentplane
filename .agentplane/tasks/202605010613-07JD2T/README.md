---
id: "202605010613-07JD2T"
title: "Fix recipes catalog compatibility"
result_summary: "Merged via PR #651."
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
  updated_at: "2026-05-01T06:13:21.729Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T06:27:20.211Z"
  updated_by: "CODER"
  note: "Recipe catalog compatibility verified: runtime manifest/assets/scenario validation passed for viewer and dokploy; signed list-remote worked with the committed dev public key override; path and archive installs passed for both recipes; HTTP index install-by-name smoke passed; init --recipes viewer vendored the active recipe and generated prompt graph; docs:recipes:check passed."
commit:
  hash: "e5b19a5639be8cfb564b073c43496269cc0cc4c4"
  message: "Merge pull request #651 from basilisk-labs/task/202605010613-07JD2T/recipes-catalog-compat"
comments:
  -
    author: "CODER"
    body: "Start: Fix the agentplane-recipes submodule catalog so bundled recipes validate, install, and can be vendored during init against the current AgentPlane runtime."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #651 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T06:13:31.186Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix the agentplane-recipes submodule catalog so bundled recipes validate, install, and can be vendored during init against the current AgentPlane runtime."
  -
    type: "verify"
    at: "2026-05-01T06:27:20.211Z"
    author: "CODER"
    state: "ok"
    note: "Recipe catalog compatibility verified: runtime manifest/assets/scenario validation passed for viewer and dokploy; signed list-remote worked with the committed dev public key override; path and archive installs passed for both recipes; HTTP index install-by-name smoke passed; init --recipes viewer vendored the active recipe and generated prompt graph; docs:recipes:check passed."
  -
    type: "status"
    at: "2026-05-01T07:41:58.314Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #651 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T07:41:58.320Z"
doc_updated_by: "INTEGRATOR"
description: "Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime."
sections:
  Summary: |-
    Fix recipes catalog compatibility
    
    Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.
  Scope: |-
    - In scope: Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.
    - Out of scope: unrelated refactors not required for "Fix recipes catalog compatibility".
  Plan: |-
    Summary
    Update the checked-in agentplane-recipes catalog to match the current AgentPlane recipe runtime.
    
    Scope
    - Convert recipe agent and skill assets from JSON stubs to non-empty markdown files and update manifests.
    - Add required scenario task_template data for bundled scenarios.
    - Regenerate release index artifacts and ensure local and remote-index install flows validate.
    - Commit the resulting changes in the agentplane-recipes submodule.
    
    Plan
    1. Inspect current recipe schema/runtime validation failures.
    2. Patch viewer and dokploy recipe assets and scenario definitions.
    3. Rebuild catalog index and signature with a repo-local test signing key override if needed.
    4. Run targeted install/init smoke checks using isolated AGENTPLANE_HOME and temp projects.
    5. Commit intentional submodule changes only.
    
    Verify Steps
    - bun --eval validation of both recipe manifests via current readRecipeManifest + validateRecipeAssets + readScenarioDefinition.
    - agentplane recipes list-remote --index agentplane-recipes/index.json --refresh --yes with a valid public key override.
    - agentplane recipes install viewer --index agentplane-recipes/index.json --refresh --yes using isolated AGENTPLANE_HOME.
    - agentplane recipes install --path agentplane-recipes/recipes/viewer --yes using isolated AGENTPLANE_HOME.
    - agentplane init --yes --recipes viewer in a temporary git project after cache install.
    
    Rollback Plan
    Revert the submodule commit or reset agentplane-recipes to the previous pinned commit if validation fails.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T06:27:20.211Z — VERIFY — ok
    
    By: CODER
    
    Note: Recipe catalog compatibility verified: runtime manifest/assets/scenario validation passed for viewer and dokploy; signed list-remote worked with the committed dev public key override; path and archive installs passed for both recipes; HTTP index install-by-name smoke passed; init --recipes viewer vendored the active recipe and generated prompt graph; docs:recipes:check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:13:31.186Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix recipes catalog compatibility

Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.

## Scope

- In scope: Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.
- Out of scope: unrelated refactors not required for "Fix recipes catalog compatibility".

## Plan

Summary
Update the checked-in agentplane-recipes catalog to match the current AgentPlane recipe runtime.

Scope
- Convert recipe agent and skill assets from JSON stubs to non-empty markdown files and update manifests.
- Add required scenario task_template data for bundled scenarios.
- Regenerate release index artifacts and ensure local and remote-index install flows validate.
- Commit the resulting changes in the agentplane-recipes submodule.

Plan
1. Inspect current recipe schema/runtime validation failures.
2. Patch viewer and dokploy recipe assets and scenario definitions.
3. Rebuild catalog index and signature with a repo-local test signing key override if needed.
4. Run targeted install/init smoke checks using isolated AGENTPLANE_HOME and temp projects.
5. Commit intentional submodule changes only.

Verify Steps
- bun --eval validation of both recipe manifests via current readRecipeManifest + validateRecipeAssets + readScenarioDefinition.
- agentplane recipes list-remote --index agentplane-recipes/index.json --refresh --yes with a valid public key override.
- agentplane recipes install viewer --index agentplane-recipes/index.json --refresh --yes using isolated AGENTPLANE_HOME.
- agentplane recipes install --path agentplane-recipes/recipes/viewer --yes using isolated AGENTPLANE_HOME.
- agentplane init --yes --recipes viewer in a temporary git project after cache install.

Rollback Plan
Revert the submodule commit or reset agentplane-recipes to the previous pinned commit if validation fails.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T06:27:20.211Z — VERIFY — ok

By: CODER

Note: Recipe catalog compatibility verified: runtime manifest/assets/scenario validation passed for viewer and dokploy; signed list-remote worked with the committed dev public key override; path and archive installs passed for both recipes; HTTP index install-by-name smoke passed; init --recipes viewer vendored the active recipe and generated prompt graph; docs:recipes:check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:13:31.186Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
