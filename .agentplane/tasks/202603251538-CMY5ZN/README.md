---
id: "202603251538-CMY5ZN"
title: "Extract recipe domain into packages/recipes and narrow scenario coupling"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603251538-NQSPGC"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T17:53:11.338Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T18:02:24.585Z"
  updated_by: "CODER"
  note: "Extracted the pure recipe domain into @agentplane/recipes (types, normalize/constants, manifest and scenario parsing), wired the package into installed-recipe, resolver, install/explain, and recipe facade consumers, and verified the seam with package build plus recipe/scenario/runner-focused regressions."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract the pure recipe contracts and parsers into packages/recipes first, then rewire resolver/scenario consumers around that package so the domain move lands before any broader scenario or runner cleanup."
events:
  -
    type: "status"
    at: "2026-03-27T17:53:12.407Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract the pure recipe contracts and parsers into packages/recipes first, then rewire resolver/scenario consumers around that package so the domain move lands before any broader scenario or runner cleanup."
  -
    type: "verify"
    at: "2026-03-27T18:02:24.585Z"
    author: "CODER"
    state: "ok"
    note: "Extracted the pure recipe domain into @agentplane/recipes (types, normalize/constants, manifest and scenario parsing), wired the package into installed-recipe, resolver, install/explain, and recipe facade consumers, and verified the seam with package build plus recipe/scenario/runner-focused regressions."
doc_version: 3
doc_updated_at: "2026-03-27T18:02:24.589Z"
doc_updated_by: "CODER"
description: "Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly."
sections:
  Summary: |-
    Extract recipe domain into packages/recipes and narrow scenario coupling
    
    Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.
  Scope: |-
    - In scope: Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.
    - Out of scope: unrelated refactors not required for "Extract recipe domain into packages/recipes and narrow scenario coupling".
  Plan: |-
    1. Extract pure recipe contracts, manifest/scenario parsing, and normalization helpers from packages/agentplane/src/commands/recipes/impl into packages/recipes with package-level exports and tests.
    2. Rewire recipe resolver, scenario commands, and runner-facing consumers to import the extracted domain from @agentplaneorg/recipes without changing selection or installed-recipe behavior.
    3. Run focused recipe/scenario/runner regressions and minimal builds, then record any remaining coupling follow-up in Findings.
  Verify Steps: |-
    1. Run package-level recipe domain coverage for manifest and scenario parsing after extraction. Expected: packages/recipes becomes the canonical source for these contracts and the targeted tests pass.
    2. Run resolver and scenario CLI regressions against the rewired imports. Expected: recipe selection, scenario info/list, and installed recipe behavior remain unchanged.
    3. Run the smallest relevant runner-facing regression plus builds. Expected: runner/context consumers still materialize recipe-backed scenarios correctly and both package builds pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T18:02:24.585Z — VERIFY — ok
    
    By: CODER
    
    Note: Extracted the pure recipe domain into @agentplane/recipes (types, normalize/constants, manifest and scenario parsing), wired the package into installed-recipe, resolver, install/explain, and recipe facade consumers, and verified the seam with package build plus recipe/scenario/runner-focused regressions.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T17:53:12.409Z, excerpt_hash=sha256:32d4a28b5a1b3d9da475da0f4c35ee76960bd85151e3cba6b9d0bf382e35d523
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract recipe domain into packages/recipes and narrow scenario coupling

Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.

## Scope

- In scope: Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.
- Out of scope: unrelated refactors not required for "Extract recipe domain into packages/recipes and narrow scenario coupling".

## Plan

1. Extract pure recipe contracts, manifest/scenario parsing, and normalization helpers from packages/agentplane/src/commands/recipes/impl into packages/recipes with package-level exports and tests.
2. Rewire recipe resolver, scenario commands, and runner-facing consumers to import the extracted domain from @agentplaneorg/recipes without changing selection or installed-recipe behavior.
3. Run focused recipe/scenario/runner regressions and minimal builds, then record any remaining coupling follow-up in Findings.

## Verify Steps

1. Run package-level recipe domain coverage for manifest and scenario parsing after extraction. Expected: packages/recipes becomes the canonical source for these contracts and the targeted tests pass.
2. Run resolver and scenario CLI regressions against the rewired imports. Expected: recipe selection, scenario info/list, and installed recipe behavior remain unchanged.
3. Run the smallest relevant runner-facing regression plus builds. Expected: runner/context consumers still materialize recipe-backed scenarios correctly and both package builds pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T18:02:24.585Z — VERIFY — ok

By: CODER

Note: Extracted the pure recipe domain into @agentplane/recipes (types, normalize/constants, manifest and scenario parsing), wired the package into installed-recipe, resolver, install/explain, and recipe facade consumers, and verified the seam with package build plus recipe/scenario/runner-focused regressions.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T17:53:12.409Z, excerpt_hash=sha256:32d4a28b5a1b3d9da475da0f4c35ee76960bd85151e3cba6b9d0bf382e35d523

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
