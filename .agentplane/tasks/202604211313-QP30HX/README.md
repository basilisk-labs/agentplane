---
id: "202604211313-QP30HX"
title: "Wire scripts README freshness check"
result_summary: "Wired scripts README freshness check."
status: "DONE"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604211313-KVSVYR"
tags:
  - "ci"
  - "docs"
  - "scripts"
verify:
  - "bun run ci:local:fast"
  - "node scripts/generate-scripts-readme.mjs --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:39.570Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T13:46:26.647Z"
  updated_by: "CODER"
  note: "Command: node scripts/generate-scripts-readme.mjs --check; Result: pass. Command: bun run ci:local:fast; Result: pass; Evidence: format, schemas, agents, policy routing, build, docs scripts freshness, hotspot check, fast unit tests 1341 passed/2 skipped, critical CLI tests 13 passed."
commit:
  hash: "b1488267692af231468d94b7c8f11a3436e627e7"
  message: "🧰 tooling: add hotspot and scripts docs guards"
comments:
  -
    author: "CODER"
    body: "Start: Verify and close the scripts README freshness wiring that was implemented with the generator and CI/local route updates."
  -
    author: "CODER"
    body: "Verified: scripts README freshness check is wired into package scripts and local fast CI, with generator freshness and ci:local:fast passing."
events:
  -
    type: "status"
    at: "2026-04-21T13:43:20.989Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Verify and close the scripts README freshness wiring that was implemented with the generator and CI/local route updates."
  -
    type: "verify"
    at: "2026-04-21T13:46:26.647Z"
    author: "CODER"
    state: "ok"
    note: "Command: node scripts/generate-scripts-readme.mjs --check; Result: pass. Command: bun run ci:local:fast; Result: pass; Evidence: format, schemas, agents, policy routing, build, docs scripts freshness, hotspot check, fast unit tests 1341 passed/2 skipped, critical CLI tests 13 passed."
  -
    type: "status"
    at: "2026-04-21T13:46:27.434Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: scripts README freshness check is wired into package scripts and local fast CI, with generator freshness and ci:local:fast passing."
doc_version: 3
doc_updated_at: "2026-04-21T13:46:27.435Z"
doc_updated_by: "CODER"
description: "Add the scripts README freshness check to the appropriate local and CI quality routes."
sections:
  Summary: |-
    Wire scripts README freshness check
    
    Add the scripts README freshness check to the appropriate local and CI quality routes.
  Scope: |-
    - In scope: Add the scripts README freshness check to the appropriate local and CI quality routes.
    - Out of scope: unrelated refactors not required for "Wire scripts README freshness check".
  Plan: "Scope: make scripts documentation non-stale. Steps: 1. Add a package.json script for scripts docs freshness. 2. Add it to docs/tooling quality route with minimal extra runtime. 3. Update developer docs to point to scripts/README.md. Acceptance: package script drift fails the freshness check."
  Verify Steps: |-
    1. Review the requested outcome for "Wire scripts README freshness check". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:46:26.647Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node scripts/generate-scripts-readme.mjs --check; Result: pass. Command: bun run ci:local:fast; Result: pass; Evidence: format, schemas, agents, policy routing, build, docs scripts freshness, hotspot check, fast unit tests 1341 passed/2 skipped, critical CLI tests 13 passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:43:21.007Z, excerpt_hash=sha256:0700118cfeac6b5ea10934c022f18e55376c5e978b8446631102aef8a4e6eb71
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Wire scripts README freshness check

Add the scripts README freshness check to the appropriate local and CI quality routes.

## Scope

- In scope: Add the scripts README freshness check to the appropriate local and CI quality routes.
- Out of scope: unrelated refactors not required for "Wire scripts README freshness check".

## Plan

Scope: make scripts documentation non-stale. Steps: 1. Add a package.json script for scripts docs freshness. 2. Add it to docs/tooling quality route with minimal extra runtime. 3. Update developer docs to point to scripts/README.md. Acceptance: package script drift fails the freshness check.

## Verify Steps

1. Review the requested outcome for "Wire scripts README freshness check". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:46:26.647Z — VERIFY — ok

By: CODER

Note: Command: node scripts/generate-scripts-readme.mjs --check; Result: pass. Command: bun run ci:local:fast; Result: pass; Evidence: format, schemas, agents, policy routing, build, docs scripts freshness, hotspot check, fast unit tests 1341 passed/2 skipped, critical CLI tests 13 passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:43:21.007Z, excerpt_hash=sha256:0700118cfeac6b5ea10934c022f18e55376c5e978b8446631102aef8a4e6eb71

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
