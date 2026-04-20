---
id: "202604191642-VFS4NJ"
title: "Document custom CLI stack decision in ADR"
status: "DOING"
priority: "med"
owner: "PLANNER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "adr"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T12:27:43.038Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T12:30:46.292Z"
  updated_by: "PLANNER"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0004-keep-custom-cli-stack.md and docs/adr/README.md."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: Record the custom CLI stack decision as an ADR and link it from the ADR index, without changing CLI runtime code."
events:
  -
    type: "status"
    at: "2026-04-20T12:27:53.976Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Record the custom CLI stack decision as an ADR and link it from the ADR index, without changing CLI runtime code."
  -
    type: "verify"
    at: "2026-04-20T12:30:46.292Z"
    author: "PLANNER"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0004-keep-custom-cli-stack.md and docs/adr/README.md."
doc_version: 3
doc_updated_at: "2026-04-20T12:30:46.306Z"
doc_updated_by: "PLANNER"
description: "Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif."
sections:
  Summary: |-
    Document custom CLI stack decision in ADR
    
    Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.
  Scope: |-
    - In scope: Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.
    - Out of scope: unrelated refactors not required for "Document custom CLI stack decision in ADR".
  Plan: "Document the custom CLI stack decision in docs/adr: explain why Agentplane keeps its command catalog and parser instead of adopting commander/citty/oclif, capture tradeoffs, and link the decision from the ADR index."
  Verify Steps: |-
    1. Review the requested outcome for "Document custom CLI stack decision in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T12:30:46.292Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0004-keep-custom-cli-stack.md and docs/adr/README.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:27:53.987Z, excerpt_hash=sha256:fe6e857bbc48fe720c9757a90aaa1db1bb3ffc889136f27b13ba9c0bc3beefec
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document custom CLI stack decision in ADR

Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.

## Scope

- In scope: Epic K and G′. Record the decision to keep the custom CLI stack instead of moving to Commander, citty, or oclif.
- Out of scope: unrelated refactors not required for "Document custom CLI stack decision in ADR".

## Plan

Document the custom CLI stack decision in docs/adr: explain why Agentplane keeps its command catalog and parser instead of adopting commander/citty/oclif, capture tradeoffs, and link the decision from the ADR index.

## Verify Steps

1. Review the requested outcome for "Document custom CLI stack decision in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T12:30:46.292Z — VERIFY — ok

By: PLANNER

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0004-keep-custom-cli-stack.md and docs/adr/README.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:27:53.987Z, excerpt_hash=sha256:fe6e857bbc48fe720c9757a90aaa1db1bb3ffc889136f27b13ba9c0bc3beefec

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
