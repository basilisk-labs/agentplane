---
id: "202603241851-5W8TN6"
title: "Sync agentplane-recipes catalog with cleaned main runner contract"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "submodule"
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:51:24.302Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: sync the external agentplane-recipes catalog with the cleaned main runner contract by removing legacy run_profile.network and expected_exit_contract from the submodule schema and manifests, then update the submodule pointer and regenerated inventory in the main repo."
events:
  -
    type: "status"
    at: "2026-03-24T18:51:24.938Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: sync the external agentplane-recipes catalog with the cleaned main runner contract by removing legacy run_profile.network and expected_exit_contract from the submodule schema and manifests, then update the submodule pointer and regenerated inventory in the main repo."
doc_version: 3
doc_updated_at: "2026-03-24T18:53:02.814Z"
doc_updated_by: "CODER"
description: "Remove legacy expected_exit_contract from the external agentplane-recipes schema and recipe manifests, then update the submodule pointer and generated recipes inventory in the main repository so the catalog matches the current runner runtime surface."
sections:
  Summary: |-
    Sync agentplane-recipes catalog with cleaned main runner contract
    
    Remove legacy expected_exit_contract from the external agentplane-recipes schema and recipe manifests, then update the submodule pointer and generated recipes inventory in the main repository so the catalog matches the current runner runtime surface.
  Scope: |-
    - In scope: Remove legacy expected_exit_contract from the external agentplane-recipes schema and recipe manifests, then update the submodule pointer and generated recipes inventory in the main repository so the catalog matches the current runner runtime surface.
    - Out of scope: unrelated refactors not required for "Sync agentplane-recipes catalog with cleaned main runner contract".
  Plan: |-
    1. Implement the change for "Sync agentplane-recipes catalog with cleaned main runner contract".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Inspect agentplane-recipes/schemas/recipe-manifest.schema.json and the touched recipe manifests. Expected: run_profile no longer declares network or expected_exit_contract, and the remaining fields still match the cleaned main runtime contract.
    2. Run node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs. Expected: docs/recipes-inventory.json regenerates cleanly from the updated submodule content.
    3. Inspect git status in both the submodule and the main repo. Expected: the submodule has one intentional commit, the main repo records the updated submodule pointer and regenerated inventory only.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Synced agentplane-recipes@770738b so the external catalog schema and shipped manifests no longer advertise legacy run_profile.network or expected_exit_contract fields.
    - Regenerated docs/recipes-inventory.json against the updated submodule; the generated inventory stayed consistent with the cleaned runner runtime surface.
    - Removed stale docs wording about catalog lag now that the bundled external catalog matches the active main-repo contract.
id_source: "generated"
---
## Summary

Sync agentplane-recipes catalog with cleaned main runner contract

Remove legacy expected_exit_contract from the external agentplane-recipes schema and recipe manifests, then update the submodule pointer and generated recipes inventory in the main repository so the catalog matches the current runner runtime surface.

## Scope

- In scope: Remove legacy expected_exit_contract from the external agentplane-recipes schema and recipe manifests, then update the submodule pointer and generated recipes inventory in the main repository so the catalog matches the current runner runtime surface.
- Out of scope: unrelated refactors not required for "Sync agentplane-recipes catalog with cleaned main runner contract".

## Plan

1. Implement the change for "Sync agentplane-recipes catalog with cleaned main runner contract".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Inspect agentplane-recipes/schemas/recipe-manifest.schema.json and the touched recipe manifests. Expected: run_profile no longer declares network or expected_exit_contract, and the remaining fields still match the cleaned main runtime contract.
2. Run node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs. Expected: docs/recipes-inventory.json regenerates cleanly from the updated submodule content.
3. Inspect git status in both the submodule and the main repo. Expected: the submodule has one intentional commit, the main repo records the updated submodule pointer and regenerated inventory only.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Synced agentplane-recipes@770738b so the external catalog schema and shipped manifests no longer advertise legacy run_profile.network or expected_exit_contract fields.
- Regenerated docs/recipes-inventory.json against the updated submodule; the generated inventory stayed consistent with the cleaned runner runtime surface.
- Removed stale docs wording about catalog lag now that the bundled external catalog matches the active main-repo contract.
