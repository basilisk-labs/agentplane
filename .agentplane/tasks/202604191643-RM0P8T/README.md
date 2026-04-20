---
id: "202604191643-RM0P8T"
title: "Condense DESIGN and EDITORIAL into navigational docs"
status: "DOING"
priority: "med"
owner: "PLANNER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T14:02:39.263Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T14:03:36.907Z"
  updated_by: "PLANNER"
  note: "Command: wc -c DESIGN.md EDITORIAL.md; Result: pass; Evidence: DESIGN.md 2165 bytes and EDITORIAL.md 2435 bytes, both below the 4000-byte budget. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Command: bun run docs:site:check:design; Result: pass; Evidence: design language check passed. Scope: DESIGN.md, EDITORIAL.md, task README."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: Condensing DESIGN.md and EDITORIAL.md into concise navigation guides with ADR links, byte-budget verification, and docs-only checks before commit."
events:
  -
    type: "status"
    at: "2026-04-20T14:02:44.333Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Condensing DESIGN.md and EDITORIAL.md into concise navigation guides with ADR links, byte-budget verification, and docs-only checks before commit."
  -
    type: "verify"
    at: "2026-04-20T14:03:36.907Z"
    author: "PLANNER"
    state: "ok"
    note: "Command: wc -c DESIGN.md EDITORIAL.md; Result: pass; Evidence: DESIGN.md 2165 bytes and EDITORIAL.md 2435 bytes, both below the 4000-byte budget. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Command: bun run docs:site:check:design; Result: pass; Evidence: design language check passed. Scope: DESIGN.md, EDITORIAL.md, task README."
doc_version: 3
doc_updated_at: "2026-04-20T14:03:36.924Z"
doc_updated_by: "PLANNER"
description: "Epic G′. Reduce DESIGN.md and EDITORIAL.md to concise navigational summaries with ADR links."
sections:
  Summary: |-
    Condense DESIGN and EDITORIAL into navigational docs
    
    Epic G′. Reduce DESIGN.md and EDITORIAL.md to concise navigational summaries with ADR links.
  Scope: |-
    - In scope: Epic G′. Reduce DESIGN.md and EDITORIAL.md to concise navigational summaries with ADR links.
    - Out of scope: unrelated refactors not required for "Condense DESIGN and EDITORIAL into navigational docs".
  Plan: "Condense DESIGN.md and EDITORIAL.md into concise navigational contracts under the 4 KB budget, preserving canonical links to ADRs and targeted design/editorial checks. Verification: byte budget, policy routing, doctor, format check, and design language check."
  Verify Steps: |-
    1. Review the requested outcome for "Condense DESIGN and EDITORIAL into navigational docs". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T14:03:36.907Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: wc -c DESIGN.md EDITORIAL.md; Result: pass; Evidence: DESIGN.md 2165 bytes and EDITORIAL.md 2435 bytes, both below the 4000-byte budget. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Command: bun run docs:site:check:design; Result: pass; Evidence: design language check passed. Scope: DESIGN.md, EDITORIAL.md, task README.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:02:44.350Z, excerpt_hash=sha256:4d669baa1ac2dfe98d82673a59be560dde8442ecc86c886201a2d3a0c3edaddc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Condense DESIGN and EDITORIAL into navigational docs

Epic G′. Reduce DESIGN.md and EDITORIAL.md to concise navigational summaries with ADR links.

## Scope

- In scope: Epic G′. Reduce DESIGN.md and EDITORIAL.md to concise navigational summaries with ADR links.
- Out of scope: unrelated refactors not required for "Condense DESIGN and EDITORIAL into navigational docs".

## Plan

Condense DESIGN.md and EDITORIAL.md into concise navigational contracts under the 4 KB budget, preserving canonical links to ADRs and targeted design/editorial checks. Verification: byte budget, policy routing, doctor, format check, and design language check.

## Verify Steps

1. Review the requested outcome for "Condense DESIGN and EDITORIAL into navigational docs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T14:03:36.907Z — VERIFY — ok

By: PLANNER

Note: Command: wc -c DESIGN.md EDITORIAL.md; Result: pass; Evidence: DESIGN.md 2165 bytes and EDITORIAL.md 2435 bytes, both below the 4000-byte budget. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Command: bun run docs:site:check:design; Result: pass; Evidence: design language check passed. Scope: DESIGN.md, EDITORIAL.md, task README.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:02:44.350Z, excerpt_hash=sha256:4d669baa1ac2dfe98d82673a59be560dde8442ecc86c886201a2d3a0c3edaddc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
