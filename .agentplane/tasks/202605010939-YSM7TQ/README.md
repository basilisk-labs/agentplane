---
id: "202605010939-YSM7TQ"
title: "Rotate recipes signing trust root"
status: "DOING"
priority: "high"
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
  updated_at: "2026-05-01T09:40:54.870Z"
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
    body: "Start: Rotate recipes signing trust root by adding a new production public key, signing the recipes catalog with the matching secret-backed key, and documenting custody/rotation rules."
events:
  -
    type: "status"
    at: "2026-05-01T09:41:47.506Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Rotate recipes signing trust root by adding a new production public key, signing the recipes catalog with the matching secret-backed key, and documenting custody/rotation rules."
doc_version: 3
doc_updated_at: "2026-05-01T09:41:47.506Z"
doc_updated_by: "CODER"
description: "Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys."
sections:
  Summary: |-
    Rotate recipes signing trust root

    Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.
  Scope: |-
    - In scope: Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.
    - Out of scope: unrelated refactors not required for "Rotate recipes signing trust root".
  Plan: |-
    1. Generate a new Ed25519 production recipes index signing key with key_id=2026-05; do not commit the private key. Store the private key only as the agentplane-recipes GitHub Actions secret RECIPES_INDEX_SIGNING_PRIVATE_KEY and delete the local temporary copy after use.
    2. Add the 2026-05 public key to AgentPlane's trusted recipes index key registry while keeping legacy 2026-02 verification support.
    3. Update agentplane-recipes to publish the 2026-05 public key, sign index.json with key_id=2026-05, and make the release workflow sign the index from the GitHub secret.
    4. Document recipes signing key custody, GitHub secret storage, prohibited .env/private-key storage, and rotation steps.
    5. Verify default catalog signature with the updated trust-root and run targeted tests/checks for recipes catalog verification.
  Verify Steps: |-
    1. Run a default remote catalog smoke using a clean AGENTPLANE_HOME and the updated trust-root. Expected: agentplane recipes list-remote --refresh --yes lists code-map@0.1.0 without AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS override.
    2. Run targeted recipes remote usage tests. Expected: signature validation and catalog loading tests pass.
    3. Run docs/policy sanity checks relevant to changed docs. Expected: routing/docs checks pass or any unrelated pre-existing drift is recorded.
    4. Confirm agentplane-recipes/index.json.sig uses key_id 2026-05, the public key is committed, and no private key material is tracked or printed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Rotate recipes signing trust root

Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.

## Scope

- In scope: Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.
- Out of scope: unrelated refactors not required for "Rotate recipes signing trust root".

## Plan

1. Generate a new Ed25519 production recipes index signing key with key_id=2026-05; do not commit the private key. Store the private key only as the agentplane-recipes GitHub Actions secret RECIPES_INDEX_SIGNING_PRIVATE_KEY and delete the local temporary copy after use.
2. Add the 2026-05 public key to AgentPlane's trusted recipes index key registry while keeping legacy 2026-02 verification support.
3. Update agentplane-recipes to publish the 2026-05 public key, sign index.json with key_id=2026-05, and make the release workflow sign the index from the GitHub secret.
4. Document recipes signing key custody, GitHub secret storage, prohibited .env/private-key storage, and rotation steps.
5. Verify default catalog signature with the updated trust-root and run targeted tests/checks for recipes catalog verification.

## Verify Steps

1. Run a default remote catalog smoke using a clean AGENTPLANE_HOME and the updated trust-root. Expected: agentplane recipes list-remote --refresh --yes lists code-map@0.1.0 without AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS override.
2. Run targeted recipes remote usage tests. Expected: signature validation and catalog loading tests pass.
3. Run docs/policy sanity checks relevant to changed docs. Expected: routing/docs checks pass or any unrelated pre-existing drift is recorded.
4. Confirm agentplane-recipes/index.json.sig uses key_id 2026-05, the public key is committed, and no private key material is tracked or printed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
