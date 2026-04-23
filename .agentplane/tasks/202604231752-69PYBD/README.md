---
id: "202604231752-69PYBD"
title: "Refresh foundation docs and remove stale 0.4 guidance"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604231752-A45A6M"
tags:
  - "docs"
  - "foundation"
  - "release-readiness"
  - "v0.3"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T18:05:24.679Z"
  updated_by: "DOCS"
  note: "The active developer docs now describe the current 0.3.23 foundation line accurately, and stale prompt-assembly-first guidance was either removed or explicitly recast as deferred design context."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: audit the active developer docs, remove stale v0.4-first guidance, and realign the foundation-facing documentation to the current 0.3.23 stabilization strategy."
events:
  -
    type: "status"
    at: "2026-04-23T18:02:33.454Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the active developer docs, remove stale v0.4-first guidance, and realign the foundation-facing documentation to the current 0.3.23 stabilization strategy."
  -
    type: "verify"
    at: "2026-04-23T18:05:24.679Z"
    author: "DOCS"
    state: "ok"
    note: "The active developer docs now describe the current 0.3.23 foundation line accurately, and stale prompt-assembly-first guidance was either removed or explicitly recast as deferred design context."
doc_version: 3
doc_updated_at: "2026-04-23T18:05:24.685Z"
doc_updated_by: "DOCS"
description: "Update developer docs so architecture, refactor, testing, and release-readiness guidance reflect the current 0.3.23 foundation state, remove stale or misleading v0.4-forward-looking claims from active guidance, and keep only accurate current references."
sections:
  Summary: |-
    Refresh foundation docs and remove stale 0.4 guidance
    
    Update developer docs so architecture, refactor, testing, and release-readiness guidance reflect the current 0.3.23 foundation state, remove stale or misleading v0.4-forward-looking claims from active guidance, and keep only accurate current references.
  Scope: |-
    - In scope: Update developer docs so architecture, refactor, testing, and release-readiness guidance reflect the current 0.3.23 foundation state, remove stale or misleading v0.4-forward-looking claims from active guidance, and keep only accurate current references.
    - Out of scope: unrelated refactors not required for "Refresh foundation docs and remove stale 0.4 guidance".
  Plan: "1. Audit active developer docs that still describe stale architecture, roadmap, or testing guidance. 2. Rewrite the foundation-facing docs so they reflect the current 0.3.23 state, current guardrails, and the intentional pause on deeper recipes and runner work. 3. Verify that the updated docs no longer present stale v0.4 work as active foundation guidance."
  Verify Steps: |-
    1. Updated docs describe the current 0.3.23 foundation state and current workflow/quality contours accurately.
    2. Stale or misleading active guidance about prompt-assembly-first, recipe-first, or runner-expansion-first work is removed or clearly marked as deferred.
    3. docs/developer/prompt-assembly-system.mdx:3:description: "Target v0.4 architecture for assembling AGENTS.md, policy files, agent profiles, and recipe-driven prompt modules."
    docs/developer/prompt-assembly-system.mdx:6:The planned AgentPlane v0.4 prompt system treats prompt files as compiled artifacts from a named
    docs/developer/prompt-assembly-system.mdx:11:v0.4 model keeps `AGENTS.md` or `CLAUDE.md` as the human and agent entrypoint, but the entrypoint is
    docs/developer/prompt-assembly-system.mdx:35:The planned v0.4 compiler resolves this graph:
    docs/developer/prompt-assembly-system.mdx:405:The v0.4 compiler should run this sequence:
    docs/developer/prompt-assembly-system.mdx:558:## Breaking change notes for v0.4
    docs/developer/prompt-assembly-system.mdx:560:The planned v0.4 model changes the meaning of managed prompt files:
    docs/developer/documentation-information-architecture.mdx:64:| Prompt assembly and recipe modules    | `docs/developer/prompt-assembly-system.mdx`, `docs/developer/recipes-spec.mdx`, `docs/developer/recipes-how-it-works.mdx` | `packages/agentplane/assets/AGENTS.md`, `packages/agentplane/assets/policy/**`, `packages/agentplane/src/runner/context/*`, `packages/recipes/src/*` |
    docs/developer/recipes-spec.mdx:17:Prompt assembly changes planned for v0.4:
    docs/developer/recipes-spec.mdx:26:See [Prompt assembly system](prompt-assembly-system) for the planned v0.4 breaking-change model.
    docs/developer/recipes-spec.mdx:66:- planned v0.4 recipes may add `modules` and `mutations` sections that describe named prompt
    docs/developer/recipes-how-it-works.mdx:20:In the planned v0.4 prompt assembly model, the global cache is also where downloaded recipe module
    docs/developer/recipes-how-it-works.mdx:34:For the planned v0.4 prompt assembly model, vendoring additionally feeds the prompt compiler:
    docs/developer/recipes-how-it-works.mdx:46:See [Prompt assembly system](prompt-assembly-system) for the full module and mutation contract. shows only intentionally retained historical or explicitly deferred references after the doc cleanup.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T18:05:24.679Z — VERIFY — ok
    
    By: DOCS
    
    Note: The active developer docs now describe the current 0.3.23 foundation line accurately, and stale prompt-assembly-first guidance was either removed or explicitly recast as deferred design context.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T18:02:33.466Z, excerpt_hash=sha256:7298a17be71396769192e2e07ae131b900d1aa937511338f5d2c16240e21d2f6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh foundation docs and remove stale 0.4 guidance

Update developer docs so architecture, refactor, testing, and release-readiness guidance reflect the current 0.3.23 foundation state, remove stale or misleading v0.4-forward-looking claims from active guidance, and keep only accurate current references.

## Scope

- In scope: Update developer docs so architecture, refactor, testing, and release-readiness guidance reflect the current 0.3.23 foundation state, remove stale or misleading v0.4-forward-looking claims from active guidance, and keep only accurate current references.
- Out of scope: unrelated refactors not required for "Refresh foundation docs and remove stale 0.4 guidance".

## Plan

1. Audit active developer docs that still describe stale architecture, roadmap, or testing guidance. 2. Rewrite the foundation-facing docs so they reflect the current 0.3.23 state, current guardrails, and the intentional pause on deeper recipes and runner work. 3. Verify that the updated docs no longer present stale v0.4 work as active foundation guidance.

## Verify Steps

1. Updated docs describe the current 0.3.23 foundation state and current workflow/quality contours accurately.
2. Stale or misleading active guidance about prompt-assembly-first, recipe-first, or runner-expansion-first work is removed or clearly marked as deferred.
3. docs/developer/prompt-assembly-system.mdx:3:description: "Target v0.4 architecture for assembling AGENTS.md, policy files, agent profiles, and recipe-driven prompt modules."
docs/developer/prompt-assembly-system.mdx:6:The planned AgentPlane v0.4 prompt system treats prompt files as compiled artifacts from a named
docs/developer/prompt-assembly-system.mdx:11:v0.4 model keeps `AGENTS.md` or `CLAUDE.md` as the human and agent entrypoint, but the entrypoint is
docs/developer/prompt-assembly-system.mdx:35:The planned v0.4 compiler resolves this graph:
docs/developer/prompt-assembly-system.mdx:405:The v0.4 compiler should run this sequence:
docs/developer/prompt-assembly-system.mdx:558:## Breaking change notes for v0.4
docs/developer/prompt-assembly-system.mdx:560:The planned v0.4 model changes the meaning of managed prompt files:
docs/developer/documentation-information-architecture.mdx:64:| Prompt assembly and recipe modules    | `docs/developer/prompt-assembly-system.mdx`, `docs/developer/recipes-spec.mdx`, `docs/developer/recipes-how-it-works.mdx` | `packages/agentplane/assets/AGENTS.md`, `packages/agentplane/assets/policy/**`, `packages/agentplane/src/runner/context/*`, `packages/recipes/src/*` |
docs/developer/recipes-spec.mdx:17:Prompt assembly changes planned for v0.4:
docs/developer/recipes-spec.mdx:26:See [Prompt assembly system](prompt-assembly-system) for the planned v0.4 breaking-change model.
docs/developer/recipes-spec.mdx:66:- planned v0.4 recipes may add `modules` and `mutations` sections that describe named prompt
docs/developer/recipes-how-it-works.mdx:20:In the planned v0.4 prompt assembly model, the global cache is also where downloaded recipe module
docs/developer/recipes-how-it-works.mdx:34:For the planned v0.4 prompt assembly model, vendoring additionally feeds the prompt compiler:
docs/developer/recipes-how-it-works.mdx:46:See [Prompt assembly system](prompt-assembly-system) for the full module and mutation contract. shows only intentionally retained historical or explicitly deferred references after the doc cleanup.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T18:05:24.679Z — VERIFY — ok

By: DOCS

Note: The active developer docs now describe the current 0.3.23 foundation line accurately, and stale prompt-assembly-first guidance was either removed or explicitly recast as deferred design context.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T18:02:33.466Z, excerpt_hash=sha256:7298a17be71396769192e2e07ae131b900d1aa937511338f5d2c16240e21d2f6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
