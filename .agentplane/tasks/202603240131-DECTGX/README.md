---
id: "202603240131-DECTGX"
title: "Generate and freshness-check recipes inventory canonically"
result_summary: "recipes inventory is now generated and freshness-checked canonically"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "recipes"
  - "tooling"
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T01:55:25.762Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T02:06:16.946Z"
  updated_by: "DOCS"
  note: |-
    Command: node scripts/generate-recipes-inventory.mjs
    Result: pass
    Evidence: regenerated docs/recipes-inventory.json deterministically from agentplane-recipes/index.json plus checked-in manifests.
    Scope: docs/recipes-inventory.json, scripts/generate-recipes-inventory.mjs
    
    Command: node scripts/check-recipes-inventory-fresh.mjs && bun run docs:recipes:check
    Result: pass
    Evidence: both checks reported docs/recipes-inventory.json is up to date.
    Scope: docs/recipes-inventory.json, scripts/check-recipes-inventory-fresh.mjs, package.json, scripts/run-local-ci.mjs
    
    Command: node .agentplane/policy/check-routing.mjs && AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
    Result: pass
    Evidence: policy routing OK; doctor OK with info-only findings.
    Scope: docs and workflow surfaces touched by the generated inventory flow
    
    Command: bunx prettier --check scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs package.json docs/README.md docs/developer/recipes-development.mdx docs/developer/recipes-spec.mdx docs/recipes-inventory.json && bunx eslint scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs
    Result: pass
    Evidence: Prettier reported all matched files formatted; ESLint reported no issues.
    Scope: docs/tooling files changed for recipes inventory generation and freshness checks
commit:
  hash: "6b53d6c4c6d50021778bf252fb64eff3e57cefff"
  message: "✅ DECTGX docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: identify the canonical source for docs/recipes-inventory.json, add a deterministic generation/check flow, and update docs or CI surfaces so stale inventory is caught the same way generated CLI reference drift is caught."
  -
    author: "DOCS"
    body: "Verified: generated docs/recipes-inventory.json canonically from the checked-in recipe index and manifests, added reproducible freshness checks, and wired the inventory check into docs and fast-CI surfaces."
events:
  -
    type: "status"
    at: "2026-03-24T01:55:26.400Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: identify the canonical source for docs/recipes-inventory.json, add a deterministic generation/check flow, and update docs or CI surfaces so stale inventory is caught the same way generated CLI reference drift is caught."
  -
    type: "verify"
    at: "2026-03-24T02:06:16.946Z"
    author: "DOCS"
    state: "ok"
    note: |-
      Command: node scripts/generate-recipes-inventory.mjs
      Result: pass
      Evidence: regenerated docs/recipes-inventory.json deterministically from agentplane-recipes/index.json plus checked-in manifests.
      Scope: docs/recipes-inventory.json, scripts/generate-recipes-inventory.mjs
      
      Command: node scripts/check-recipes-inventory-fresh.mjs && bun run docs:recipes:check
      Result: pass
      Evidence: both checks reported docs/recipes-inventory.json is up to date.
      Scope: docs/recipes-inventory.json, scripts/check-recipes-inventory-fresh.mjs, package.json, scripts/run-local-ci.mjs
      
      Command: node .agentplane/policy/check-routing.mjs && AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
      Result: pass
      Evidence: policy routing OK; doctor OK with info-only findings.
      Scope: docs and workflow surfaces touched by the generated inventory flow
      
      Command: bunx prettier --check scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs package.json docs/README.md docs/developer/recipes-development.mdx docs/developer/recipes-spec.mdx docs/recipes-inventory.json && bunx eslint scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs
      Result: pass
      Evidence: Prettier reported all matched files formatted; ESLint reported no issues.
      Scope: docs/tooling files changed for recipes inventory generation and freshness checks
  -
    type: "status"
    at: "2026-03-24T02:06:40.587Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: generated docs/recipes-inventory.json canonically from the checked-in recipe index and manifests, added reproducible freshness checks, and wired the inventory check into docs and fast-CI surfaces."
doc_version: 3
doc_updated_at: "2026-03-24T02:06:40.587Z"
doc_updated_by: "DOCS"
description: "Turn docs/recipes-inventory.json into a canonical generated artifact with a reproducible generation path and a freshness check that matches the current recipe runtime contract."
sections:
  Summary: |-
    Generate and freshness-check recipes inventory canonically
    
    Turn docs/recipes-inventory.json into a canonical generated artifact with a reproducible generation path and a freshness check that matches the current recipe runtime contract.
  Scope: |-
    - In scope: Turn docs/recipes-inventory.json into a canonical generated artifact with a reproducible generation path and a freshness check that matches the current recipe runtime contract.
    - Out of scope: unrelated refactors not required for "Generate and freshness-check recipes inventory canonically".
  Plan: "1. Identify the canonical source for docs/recipes-inventory.json. 2. Add a reproducible generation path and a freshness check that matches the current recipe runtime contract. 3. Update docs or CI surfaces that depend on the inventory. 4. Verify with docs checks. Sequence: execute after QY1AND."
  Verify Steps: "1. Run the canonical recipes inventory generation command. 2. Run the new or existing freshness check for docs/recipes-inventory.json. 3. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor if docs surfaces change. 4. Confirm the inventory is reproducible from its canonical source."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T02:06:16.946Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node scripts/generate-recipes-inventory.mjs
    Result: pass
    Evidence: regenerated docs/recipes-inventory.json deterministically from agentplane-recipes/index.json plus checked-in manifests.
    Scope: docs/recipes-inventory.json, scripts/generate-recipes-inventory.mjs
    
    Command: node scripts/check-recipes-inventory-fresh.mjs && bun run docs:recipes:check
    Result: pass
    Evidence: both checks reported docs/recipes-inventory.json is up to date.
    Scope: docs/recipes-inventory.json, scripts/check-recipes-inventory-fresh.mjs, package.json, scripts/run-local-ci.mjs
    
    Command: node .agentplane/policy/check-routing.mjs && AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
    Result: pass
    Evidence: policy routing OK; doctor OK with info-only findings.
    Scope: docs and workflow surfaces touched by the generated inventory flow
    
    Command: bunx prettier --check scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs package.json docs/README.md docs/developer/recipes-development.mdx docs/developer/recipes-spec.mdx docs/recipes-inventory.json && bunx eslint scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs
    Result: pass
    Evidence: Prettier reported all matched files formatted; ESLint reported no issues.
    Scope: docs/tooling files changed for recipes inventory generation and freshness checks
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T02:06:05.275Z, excerpt_hash=sha256:089492839b6451c9fb2f37276e7fc50935aedc678169bf8249e9e84b77e59e3b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Canonical source is `agentplane-recipes/index.json` plus checked-in recipe manifests under `agentplane-recipes/recipes/*/manifest.json`; the docs inventory is now a generated projection instead of a hand-maintained file.
    - Generator intentionally filters unsupported legacy run_profile fields such as `network`, because some checked-in recipe manifests still carry them while the shared runner contract no longer documents or exports that field.
id_source: "generated"
---
## Summary

Generate and freshness-check recipes inventory canonically

Turn docs/recipes-inventory.json into a canonical generated artifact with a reproducible generation path and a freshness check that matches the current recipe runtime contract.

## Scope

- In scope: Turn docs/recipes-inventory.json into a canonical generated artifact with a reproducible generation path and a freshness check that matches the current recipe runtime contract.
- Out of scope: unrelated refactors not required for "Generate and freshness-check recipes inventory canonically".

## Plan

1. Identify the canonical source for docs/recipes-inventory.json. 2. Add a reproducible generation path and a freshness check that matches the current recipe runtime contract. 3. Update docs or CI surfaces that depend on the inventory. 4. Verify with docs checks. Sequence: execute after QY1AND.

## Verify Steps

1. Run the canonical recipes inventory generation command. 2. Run the new or existing freshness check for docs/recipes-inventory.json. 3. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor if docs surfaces change. 4. Confirm the inventory is reproducible from its canonical source.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T02:06:16.946Z — VERIFY — ok

By: DOCS

Note: Command: node scripts/generate-recipes-inventory.mjs
Result: pass
Evidence: regenerated docs/recipes-inventory.json deterministically from agentplane-recipes/index.json plus checked-in manifests.
Scope: docs/recipes-inventory.json, scripts/generate-recipes-inventory.mjs

Command: node scripts/check-recipes-inventory-fresh.mjs && bun run docs:recipes:check
Result: pass
Evidence: both checks reported docs/recipes-inventory.json is up to date.
Scope: docs/recipes-inventory.json, scripts/check-recipes-inventory-fresh.mjs, package.json, scripts/run-local-ci.mjs

Command: node .agentplane/policy/check-routing.mjs && AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
Result: pass
Evidence: policy routing OK; doctor OK with info-only findings.
Scope: docs and workflow surfaces touched by the generated inventory flow

Command: bunx prettier --check scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs package.json docs/README.md docs/developer/recipes-development.mdx docs/developer/recipes-spec.mdx docs/recipes-inventory.json && bunx eslint scripts/generate-recipes-inventory.mjs scripts/check-recipes-inventory-fresh.mjs scripts/run-local-ci.mjs
Result: pass
Evidence: Prettier reported all matched files formatted; ESLint reported no issues.
Scope: docs/tooling files changed for recipes inventory generation and freshness checks

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T02:06:05.275Z, excerpt_hash=sha256:089492839b6451c9fb2f37276e7fc50935aedc678169bf8249e9e84b77e59e3b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Canonical source is `agentplane-recipes/index.json` plus checked-in recipe manifests under `agentplane-recipes/recipes/*/manifest.json`; the docs inventory is now a generated projection instead of a hand-maintained file.
- Generator intentionally filters unsupported legacy run_profile fields such as `network`, because some checked-in recipe manifests still carry them while the shared runner contract no longer documents or exports that field.
