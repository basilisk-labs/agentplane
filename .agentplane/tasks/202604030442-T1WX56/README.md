---
id: "202604030442-T1WX56"
title: "Sync framework docs with new control-plane contracts"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604030442-WMSG1C"
tags:
  - "docs"
  - "framework"
verify:
  - "bun run docs:site:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:07.832Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T14:13:35.934Z"
  updated_by: "DOCS"
  note: "Synced README and developer docs with the shipped framework control-plane layer, replaced implicit-control-plane wording with explicit harness/context/runtime contracts, and verified with bun run docs:site:check."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: update framework-facing docs to reflect the shipped control-plane layer, including harness, execution context, capabilities, approvals, task intake, explain hooks, and the new protocol/result foundation."
events:
  -
    type: "status"
    at: "2026-04-03T14:09:35.054Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update framework-facing docs to reflect the shipped control-plane layer, including harness, execution context, capabilities, approvals, task intake, explain hooks, and the new protocol/result foundation."
  -
    type: "verify"
    at: "2026-04-03T14:13:35.934Z"
    author: "DOCS"
    state: "ok"
    note: "Synced README and developer docs with the shipped framework control-plane layer, replaced implicit-control-plane wording with explicit harness/context/runtime contracts, and verified with bun run docs:site:check."
doc_version: 3
doc_updated_at: "2026-04-03T14:13:35.940Z"
doc_updated_by: "DOCS"
description: "Update user-facing and repo policy documentation so it matches the implemented framework layer."
sections:
  Summary: |-
    Sync framework docs with new control-plane contracts
    
    Update user-facing and repo policy documentation so it matches the implemented framework layer.
  Scope: |-
    - In scope: Update user-facing and repo policy documentation so it matches the implemented framework layer.
    - Out of scope: unrelated refactors not required for "Sync framework docs with new control-plane contracts".
  Plan: |-
    1. Update roadmap-adjacent docs, architecture references, and release-facing notes for the new framework contracts.
    2. Remove outdated descriptions that still present control-plane semantics as implicit or fragmented.
    3. Verify the docs surface remains consistent with generated/reference checks.
  Verify Steps: |-
    1. Run `bun run docs:site:check`. Expected: docs generation, website typecheck, production build, and design-language checks all pass.
    2. Review `README.md`, `docs/developer/architecture.mdx`, `docs/developer/harness-engeneering.mdx`, and `docs/developer/framework-refactor-program.mdx`. Expected: they describe the shipped framework control-plane contracts instead of presenting them as implicit behavior.
    3. Compare the updated docs against the implemented runtime modules under `packages/agentplane/src/runtime/*` and `packages/agentplane/src/usecases/context/resolve-context.ts`. Expected: harness, context, precedence, approvals, execution profile runtime, task intake, explain, and protocol surfaces are all represented with no contradictory guidance.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T14:13:35.934Z — VERIFY — ok
    
    By: DOCS
    
    Note: Synced README and developer docs with the shipped framework control-plane layer, replaced implicit-control-plane wording with explicit harness/context/runtime contracts, and verified with bun run docs:site:check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T14:12:38.998Z, excerpt_hash=sha256:ac4e7aa6ce80623c45c6c48188d30a551cc59a1feb849348d4cee05b3bbca645
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Sync framework docs with new control-plane contracts

Update user-facing and repo policy documentation so it matches the implemented framework layer.

## Scope

- In scope: Update user-facing and repo policy documentation so it matches the implemented framework layer.
- Out of scope: unrelated refactors not required for "Sync framework docs with new control-plane contracts".

## Plan

1. Update roadmap-adjacent docs, architecture references, and release-facing notes for the new framework contracts.
2. Remove outdated descriptions that still present control-plane semantics as implicit or fragmented.
3. Verify the docs surface remains consistent with generated/reference checks.

## Verify Steps

1. Run `bun run docs:site:check`. Expected: docs generation, website typecheck, production build, and design-language checks all pass.
2. Review `README.md`, `docs/developer/architecture.mdx`, `docs/developer/harness-engeneering.mdx`, and `docs/developer/framework-refactor-program.mdx`. Expected: they describe the shipped framework control-plane contracts instead of presenting them as implicit behavior.
3. Compare the updated docs against the implemented runtime modules under `packages/agentplane/src/runtime/*` and `packages/agentplane/src/usecases/context/resolve-context.ts`. Expected: harness, context, precedence, approvals, execution profile runtime, task intake, explain, and protocol surfaces are all represented with no contradictory guidance.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T14:13:35.934Z — VERIFY — ok

By: DOCS

Note: Synced README and developer docs with the shipped framework control-plane layer, replaced implicit-control-plane wording with explicit harness/context/runtime contracts, and verified with bun run docs:site:check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T14:12:38.998Z, excerpt_hash=sha256:ac4e7aa6ce80623c45c6c48188d30a551cc59a1feb849348d4cee05b3bbca645

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
