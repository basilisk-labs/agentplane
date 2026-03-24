---
id: "202603241407-QTC2HE"
title: "Refresh generated recipes inventory to canonical generator format"
result_summary: "scripts/generate-recipes-inventory.mjs now emits Prettier-compatible canonical output for docs/recipes-inventory.json."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "recipes"
  - "generated"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T14:08:02.330Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T14:11:25.416Z"
  updated_by: "DOCS"
  note: "ok: the recipes inventory generator now formats its own output with Prettier, and docs:recipes:check passes on the refreshed file."
commit:
  hash: "7625cde06bd6cd8569c444267216b964c748b7a4"
  message: "✅ QTC2HE docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: refresh docs/recipes-inventory.json in the generator’s canonical format only, verify docs:recipes:check passes, and clear the remaining pre-push blocker without widening the diff."
  -
    author: "DOCS"
    body: "Verified: updated the recipes inventory generator to run Prettier on its own output, so docs:recipes:check and the pre-commit formatter now agree on one canonical file format."
events:
  -
    type: "status"
    at: "2026-03-24T14:08:04.420Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh docs/recipes-inventory.json in the generator’s canonical format only, verify docs:recipes:check passes, and clear the remaining pre-push blocker without widening the diff."
  -
    type: "verify"
    at: "2026-03-24T14:08:35.735Z"
    author: "DOCS"
    state: "ok"
    note: "ok: docs/recipes-inventory.json now matches the exact generator format and check-recipes-inventory-fresh passes."
  -
    type: "verify"
    at: "2026-03-24T14:11:25.416Z"
    author: "DOCS"
    state: "ok"
    note: "ok: the recipes inventory generator now formats its own output with Prettier, and docs:recipes:check passes on the refreshed file."
  -
    type: "status"
    at: "2026-03-24T14:11:53.644Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: updated the recipes inventory generator to run Prettier on its own output, so docs:recipes:check and the pre-commit formatter now agree on one canonical file format."
doc_version: 3
doc_updated_at: "2026-03-24T14:11:53.646Z"
doc_updated_by: "DOCS"
description: "Regenerate docs/recipes-inventory.json in the exact canonical format emitted by scripts/generate-recipes-inventory.mjs so pre-push docs:recipes:check stops flagging the file as stale."
sections:
  Summary: |-
    Refresh generated recipes inventory to canonical generator format
    
    Regenerate docs/recipes-inventory.json in the exact canonical format emitted by scripts/generate-recipes-inventory.mjs so pre-push docs:recipes:check stops flagging the file as stale.
  Scope: |-
    - In scope: Regenerate docs/recipes-inventory.json in the exact canonical format emitted by scripts/generate-recipes-inventory.mjs so pre-push docs:recipes:check stops flagging the file as stale.
    - Out of scope: unrelated refactors not required for "Refresh generated recipes inventory to canonical generator format".
  Plan: |-
    1. Keep docs/recipes-inventory.json in the exact canonical format emitted by the generator.
    2. Verify docs:recipes:check passes without additional semantic inventory drift.
    3. Push main again after the refresh lands.
  Verify Steps: |-
    1. Run node scripts/generate-recipes-inventory.mjs and confirm docs/recipes-inventory.json updates.
    2. Run node scripts/check-recipes-inventory-fresh.mjs and confirm the inventory is up to date.
    3. Re-run git push origin main and confirm pre-push no longer blocks on docs:recipes:check.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T14:08:35.735Z — VERIFY — ok
    
    By: DOCS
    
    Note: ok: docs/recipes-inventory.json now matches the exact generator format and check-recipes-inventory-fresh passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:08:34.867Z, excerpt_hash=sha256:8e467e4c359a10997f25f988668aa089df812fec0f4af9a4f90c973e5727a818
    
    #### 2026-03-24T14:11:25.416Z — VERIFY — ok
    
    By: DOCS
    
    Note: ok: the recipes inventory generator now formats its own output with Prettier, and docs:recipes:check passes on the refreshed file.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:11:24.862Z, excerpt_hash=sha256:8e467e4c359a10997f25f988668aa089df812fec0f4af9a4f90c973e5727a818
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. Fixed the real root cause: scripts/generate-recipes-inventory.mjs now runs Prettier on its output, so docs:recipes:check and pre-commit agree on one canonical format.
    2. Regenerated docs/recipes-inventory.json and confirmed check-recipes-inventory-fresh now passes without leaving a non-Prettier canonical form behind.
id_source: "generated"
---
## Summary

Refresh generated recipes inventory to canonical generator format

Regenerate docs/recipes-inventory.json in the exact canonical format emitted by scripts/generate-recipes-inventory.mjs so pre-push docs:recipes:check stops flagging the file as stale.

## Scope

- In scope: Regenerate docs/recipes-inventory.json in the exact canonical format emitted by scripts/generate-recipes-inventory.mjs so pre-push docs:recipes:check stops flagging the file as stale.
- Out of scope: unrelated refactors not required for "Refresh generated recipes inventory to canonical generator format".

## Plan

1. Keep docs/recipes-inventory.json in the exact canonical format emitted by the generator.
2. Verify docs:recipes:check passes without additional semantic inventory drift.
3. Push main again after the refresh lands.

## Verify Steps

1. Run node scripts/generate-recipes-inventory.mjs and confirm docs/recipes-inventory.json updates.
2. Run node scripts/check-recipes-inventory-fresh.mjs and confirm the inventory is up to date.
3. Re-run git push origin main and confirm pre-push no longer blocks on docs:recipes:check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T14:08:35.735Z — VERIFY — ok

By: DOCS

Note: ok: docs/recipes-inventory.json now matches the exact generator format and check-recipes-inventory-fresh passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:08:34.867Z, excerpt_hash=sha256:8e467e4c359a10997f25f988668aa089df812fec0f4af9a4f90c973e5727a818

#### 2026-03-24T14:11:25.416Z — VERIFY — ok

By: DOCS

Note: ok: the recipes inventory generator now formats its own output with Prettier, and docs:recipes:check passes on the refreshed file.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:11:24.862Z, excerpt_hash=sha256:8e467e4c359a10997f25f988668aa089df812fec0f4af9a4f90c973e5727a818

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Fixed the real root cause: scripts/generate-recipes-inventory.mjs now runs Prettier on its output, so docs:recipes:check and pre-commit agree on one canonical format.
2. Regenerated docs/recipes-inventory.json and confirmed check-recipes-inventory-fresh now passes without leaving a non-Prettier canonical form behind.
