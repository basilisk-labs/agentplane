---
id: "202605041611-7TM53Y"
title: "Remove stale config.json public surfaces"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T16:16:31.974Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T16:25:49.055Z"
  updated_by: "DOCS"
  note: "Command: rg -n .agentplane/config.json|config.json website/src/data/homepage-content.ts DESIGN.md packages/spec/README.md docs/user/configuration.mdx docs/adr/0013-zod-contract-ssot.md. Result: pass. Evidence: config.json appears only as legacy import fallback or compatibility example; homepage and design public artifact surfaces are WORKFLOW.md-first. Command: node scripts/check-docs-ia.mjs. Result: pass. Command: bun run docs:site:typecheck. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass."
commit:
  hash: "c9d936ca997544bc04dfae3edb1aeef2fdcedf97"
  message: "Merge pull request #863 from basilisk-labs/task/202605041610-FY0HHQ/docs-legacy-prune"
comments:
  -
    author: "DOCS"
    body: "Start: remove stale config.json public-surface examples and keep WORKFLOW.md as the current configuration artifact."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #863 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T16:17:51.549Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: remove stale config.json public-surface examples and keep WORKFLOW.md as the current configuration artifact."
  -
    type: "verify"
    at: "2026-05-04T16:25:49.055Z"
    author: "DOCS"
    state: "ok"
    note: "Command: rg -n .agentplane/config.json|config.json website/src/data/homepage-content.ts DESIGN.md packages/spec/README.md docs/user/configuration.mdx docs/adr/0013-zod-contract-ssot.md. Result: pass. Evidence: config.json appears only as legacy import fallback or compatibility example; homepage and design public artifact surfaces are WORKFLOW.md-first. Command: node scripts/check-docs-ia.mjs. Result: pass. Command: bun run docs:site:typecheck. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass."
  -
    type: "status"
    at: "2026-05-04T16:40:57.359Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #863 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T16:40:57.361Z"
doc_updated_by: "INTEGRATOR"
description: "Replace stale public-facing config.json examples with WORKFLOW.md-first wording while keeping legacy import compatibility documented only where relevant."
sections:
  Summary: |-
    Remove stale config.json public surfaces
    
    Replace stale public-facing config.json examples with WORKFLOW.md-first wording while keeping legacy import compatibility documented only where relevant.
  Scope: |-
    - In scope: Replace stale public-facing config.json examples with WORKFLOW.md-first wording while keeping legacy import compatibility documented only where relevant.
    - Out of scope: unrelated refactors not required for "Remove stale config.json public surfaces".
  Plan: "1. Replace public artifact examples that present .agentplane/config.json as current configuration with .agentplane/WORKFLOW.md-first wording. 2. Keep packages/spec legacy config schema language scoped to compatibility/import contracts rather than current managed state. 3. Update homepage content and design guidance consistently. 4. Verify with targeted grep, docs site typecheck, routing, and doctor."
  Verify Steps: |-
    1. Review the requested outcome for "Remove stale config.json public surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T16:25:49.055Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: rg -n .agentplane/config.json|config.json website/src/data/homepage-content.ts DESIGN.md packages/spec/README.md docs/user/configuration.mdx docs/adr/0013-zod-contract-ssot.md. Result: pass. Evidence: config.json appears only as legacy import fallback or compatibility example; homepage and design public artifact surfaces are WORKFLOW.md-first. Command: node scripts/check-docs-ia.mjs. Result: pass. Command: bun run docs:site:typecheck. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:17:51.549Z, excerpt_hash=sha256:7d74e4405d1709f56a763b4878a2de526be8b8e18324907e9571b26ebfce6043
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove stale config.json public surfaces

Replace stale public-facing config.json examples with WORKFLOW.md-first wording while keeping legacy import compatibility documented only where relevant.

## Scope

- In scope: Replace stale public-facing config.json examples with WORKFLOW.md-first wording while keeping legacy import compatibility documented only where relevant.
- Out of scope: unrelated refactors not required for "Remove stale config.json public surfaces".

## Plan

1. Replace public artifact examples that present .agentplane/config.json as current configuration with .agentplane/WORKFLOW.md-first wording. 2. Keep packages/spec legacy config schema language scoped to compatibility/import contracts rather than current managed state. 3. Update homepage content and design guidance consistently. 4. Verify with targeted grep, docs site typecheck, routing, and doctor.

## Verify Steps

1. Review the requested outcome for "Remove stale config.json public surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T16:25:49.055Z — VERIFY — ok

By: DOCS

Note: Command: rg -n .agentplane/config.json|config.json website/src/data/homepage-content.ts DESIGN.md packages/spec/README.md docs/user/configuration.mdx docs/adr/0013-zod-contract-ssot.md. Result: pass. Evidence: config.json appears only as legacy import fallback or compatibility example; homepage and design public artifact surfaces are WORKFLOW.md-first. Command: node scripts/check-docs-ia.mjs. Result: pass. Command: bun run docs:site:typecheck. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:17:51.549Z, excerpt_hash=sha256:7d74e4405d1709f56a763b4878a2de526be8b8e18324907e9571b26ebfce6043

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
