---
id: "202604301809-K5P2HX"
title: "Introduce shared GPT-5.5 prompt contract fragments"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604301809-MFVAF2"
tags:
  - "prompt-assembly"
verify:
  - "bun run agents:check"
  - "bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/agents/agents-template.test.ts"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T18:09:18.492Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T18:31:49.684Z"
  updated_by: "CODER"
  note: "Verified: shared GPT-5.5 prompt contract added as gateway fragment; AGENTS budget 248 lines; agents templates OK; prompt registry/agents-template/GPT-5.5 diagnostics tests pass; policy routing OK; git diff check OK."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add shared GPT-5.5 collaboration, visible progress, retrieval budget, stop/output contract, and cache-order prompt fragments without weakening gateway/policy gates."
events:
  -
    type: "status"
    at: "2026-04-30T18:28:39.311Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add shared GPT-5.5 collaboration, visible progress, retrieval budget, stop/output contract, and cache-order prompt fragments without weakening gateway/policy gates."
  -
    type: "verify"
    at: "2026-04-30T18:31:49.684Z"
    author: "CODER"
    state: "ok"
    note: "Verified: shared GPT-5.5 prompt contract added as gateway fragment; AGENTS budget 248 lines; agents templates OK; prompt registry/agents-template/GPT-5.5 diagnostics tests pass; policy routing OK; git diff check OK."
doc_version: 3
doc_updated_at: "2026-04-30T18:31:49.700Z"
doc_updated_by: "CODER"
description: "Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates."
sections:
  Summary: |-
    Introduce shared GPT-5.5 prompt contract fragments
    
    Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.
  Scope: |-
    - In scope: Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.
    - Out of scope: unrelated refactors not required for "Introduce shared GPT-5.5 prompt contract fragments".
  Plan: |-
    1. Add shared GPT-5.5 prompt contract content through existing fragment/module assets.
    2. Keep AGENTS.md compact and preserve security/workflow/DOD hard gates.
    3. Ensure fragments have stable semantic IDs and narrow mutability.
    4. Verify agents:check, targeted registry/template tests, routing check, and git diff --check.
  Verify Steps: |-
    1. Review the requested outcome for "Introduce shared GPT-5.5 prompt contract fragments". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T18:31:49.684Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: shared GPT-5.5 prompt contract added as gateway fragment; AGENTS budget 248 lines; agents templates OK; prompt registry/agents-template/GPT-5.5 diagnostics tests pass; policy routing OK; git diff check OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:28:39.311Z, excerpt_hash=sha256:c799f5e2bbbfc2a8aa1735307680c3613dd716ecf814545b81ae1e8e0d86862e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce shared GPT-5.5 prompt contract fragments

Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.

## Scope

- In scope: Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.
- Out of scope: unrelated refactors not required for "Introduce shared GPT-5.5 prompt contract fragments".

## Plan

1. Add shared GPT-5.5 prompt contract content through existing fragment/module assets.
2. Keep AGENTS.md compact and preserve security/workflow/DOD hard gates.
3. Ensure fragments have stable semantic IDs and narrow mutability.
4. Verify agents:check, targeted registry/template tests, routing check, and git diff --check.

## Verify Steps

1. Review the requested outcome for "Introduce shared GPT-5.5 prompt contract fragments". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T18:31:49.684Z — VERIFY — ok

By: CODER

Note: Verified: shared GPT-5.5 prompt contract added as gateway fragment; AGENTS budget 248 lines; agents templates OK; prompt registry/agents-template/GPT-5.5 diagnostics tests pass; policy routing OK; git diff check OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:28:39.311Z, excerpt_hash=sha256:c799f5e2bbbfc2a8aa1735307680c3613dd716ecf814545b81ae1e8e0d86862e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
