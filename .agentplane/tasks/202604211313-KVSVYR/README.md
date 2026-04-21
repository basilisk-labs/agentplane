---
id: "202604211313-KVSVYR"
title: "Generate scripts README from package scripts"
result_summary: "Generated scripts README from package scripts."
status: "DONE"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "scripts"
  - "tooling"
verify:
  - "bun run typecheck"
  - "node scripts/generate-scripts-readme.mjs --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:35.879Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T13:42:51.438Z"
  updated_by: "CODER"
  note: "Command: bun run typecheck; Result: pass. Command: node scripts/generate-scripts-readme.mjs --check; Result: pass after generator writes Prettier-stable Markdown. Command: bun run format:check; Result: pass."
commit:
  hash: "b1488267692af231468d94b7c8f11a3436e627e7"
  message: "🧰 tooling: add hotspot and scripts docs guards"
comments:
  -
    author: "CODER"
    body: "Start: генератор scripts/README.md из package.json scripts с check-режимом и устойчивым детерминированным выводом по namespace."
  -
    author: "CODER"
    body: "Verified: scripts README generator and freshness check pass, typecheck and format checks pass."
events:
  -
    type: "status"
    at: "2026-04-21T13:21:27.016Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: генератор scripts/README.md из package.json scripts с check-режимом и устойчивым детерминированным выводом по namespace."
  -
    type: "verify"
    at: "2026-04-21T13:42:51.438Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run typecheck; Result: pass. Command: node scripts/generate-scripts-readme.mjs --check; Result: pass after generator writes Prettier-stable Markdown. Command: bun run format:check; Result: pass."
  -
    type: "status"
    at: "2026-04-21T13:43:06.731Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: scripts README generator and freshness check pass, typecheck and format checks pass."
doc_version: 3
doc_updated_at: "2026-04-21T13:43:06.732Z"
doc_updated_by: "CODER"
description: "Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts."
sections:
  Summary: |-
    Generate scripts README from package scripts
    
    Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.
  Scope: |-
    - In scope: Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.
    - Out of scope: unrelated refactors not required for "Generate scripts README from package scripts".
  Plan: "Scope: improve maintainability of the large root scripts surface. Steps: 1. Create scripts/generate-scripts-readme.mjs using existing script-runtime helpers. 2. Group scripts by namespace: ci, release, docs, test, coverage, arch, bench, misc. 3. Generate scripts/README.md with command, purpose, and grouping notes. 4. Provide --check mode. Acceptance: generated README is stable and check mode detects drift."
  Verify Steps: |-
    1. Review the requested outcome for "Generate scripts README from package scripts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:42:51.438Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run typecheck; Result: pass. Command: node scripts/generate-scripts-readme.mjs --check; Result: pass after generator writes Prettier-stable Markdown. Command: bun run format:check; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:27.040Z, excerpt_hash=sha256:b3334112bbe21181f2550dfaab435b41064233ff845cb92f604072efafcbc844
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate scripts README from package scripts

Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.

## Scope

- In scope: Add a generator that documents package.json scripts by namespace and flags ambiguous or ungrouped scripts.
- Out of scope: unrelated refactors not required for "Generate scripts README from package scripts".

## Plan

Scope: improve maintainability of the large root scripts surface. Steps: 1. Create scripts/generate-scripts-readme.mjs using existing script-runtime helpers. 2. Group scripts by namespace: ci, release, docs, test, coverage, arch, bench, misc. 3. Generate scripts/README.md with command, purpose, and grouping notes. 4. Provide --check mode. Acceptance: generated README is stable and check mode detects drift.

## Verify Steps

1. Review the requested outcome for "Generate scripts README from package scripts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:42:51.438Z — VERIFY — ok

By: CODER

Note: Command: bun run typecheck; Result: pass. Command: node scripts/generate-scripts-readme.mjs --check; Result: pass after generator writes Prettier-stable Markdown. Command: bun run format:check; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:27.040Z, excerpt_hash=sha256:b3334112bbe21181f2550dfaab435b41064233ff845cb92f604072efafcbc844

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
