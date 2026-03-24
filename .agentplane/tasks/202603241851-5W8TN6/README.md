---
id: "202603241851-5W8TN6"
title: "Sync agentplane-recipes catalog with cleaned main runner contract"
result_summary: "agentplane-recipes and the generated inventory now match the cleaned main runner contract; legacy network and expected_exit_contract fields are gone from the bundled external catalog."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-03-24T18:53:23.975Z"
  updated_by: "CODER"
  note: "Verified: agentplane-recipes schema and touched manifests no longer contain run_profile.network or expected_exit_contract; node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs both passed; submodule is clean at 770738b and the main repo only staged the pointer, regenerated inventory, docs, and task README."
commit:
  hash: "5780ba5bfc8f38a2e0c7be9776412fffeec07afa"
  message: "✅ 5W8TN6 code: sync external recipe catalog with cleaned runner contract"
comments:
  -
    author: "CODER"
    body: "Start: sync the external agentplane-recipes catalog with the cleaned main runner contract by removing legacy run_profile.network and expected_exit_contract from the submodule schema and manifests, then update the submodule pointer and regenerated inventory in the main repo."
  -
    author: "CODER"
    body: "Verified: the bundled external recipe catalog no longer advertises legacy network or expected_exit_contract fields, inventory regeneration stayed fresh, and the main repo now points at the synced agentplane-recipes commit."
events:
  -
    type: "status"
    at: "2026-03-24T18:51:24.938Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: sync the external agentplane-recipes catalog with the cleaned main runner contract by removing legacy run_profile.network and expected_exit_contract from the submodule schema and manifests, then update the submodule pointer and regenerated inventory in the main repo."
  -
    type: "verify"
    at: "2026-03-24T18:53:23.975Z"
    author: "CODER"
    state: "ok"
    note: "Verified: agentplane-recipes schema and touched manifests no longer contain run_profile.network or expected_exit_contract; node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs both passed; submodule is clean at 770738b and the main repo only staged the pointer, regenerated inventory, docs, and task README."
  -
    type: "status"
    at: "2026-03-24T18:53:31.445Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the bundled external recipe catalog no longer advertises legacy network or expected_exit_contract fields, inventory regeneration stayed fresh, and the main repo now points at the synced agentplane-recipes commit."
doc_version: 3
doc_updated_at: "2026-03-24T18:53:31.445Z"
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
    #### 2026-03-24T18:53:23.975Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: agentplane-recipes schema and touched manifests no longer contain run_profile.network or expected_exit_contract; node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs both passed; submodule is clean at 770738b and the main repo only staged the pointer, regenerated inventory, docs, and task README.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:53:02.814Z, excerpt_hash=sha256:c6006628313b6127e8285ddbc1296d9a343ad19b8cfb55cdc3dbd95fc00ea088
    
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
#### 2026-03-24T18:53:23.975Z — VERIFY — ok

By: CODER

Note: Verified: agentplane-recipes schema and touched manifests no longer contain run_profile.network or expected_exit_contract; node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs both passed; submodule is clean at 770738b and the main repo only staged the pointer, regenerated inventory, docs, and task README.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:53:02.814Z, excerpt_hash=sha256:c6006628313b6127e8285ddbc1296d9a343ad19b8cfb55cdc3dbd95fc00ea088

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Synced agentplane-recipes@770738b so the external catalog schema and shipped manifests no longer advertise legacy run_profile.network or expected_exit_contract fields.
- Regenerated docs/recipes-inventory.json against the updated submodule; the generated inventory stayed consistent with the cleaned runner runtime surface.
- Removed stale docs wording about catalog lag now that the bundled external catalog matches the active main-repo contract.
