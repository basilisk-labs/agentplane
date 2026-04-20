---
id: "202604191643-YHCPBZ"
title: "Create ADR directory and seed initial refactor decisions"
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
  updated_at: "2026-04-20T12:25:12.580Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T12:27:08.485Z"
  updated_by: "PLANNER"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/README.md, docs/adr/0002-adr-process.md, docs/adr/0003-refactor-sequencing.md."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: Create the docs/adr decision record surface and seed concise ADRs for refactor and framework-dependency decisions without changing runtime code."
events:
  -
    type: "status"
    at: "2026-04-20T12:25:17.648Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Create the docs/adr decision record surface and seed concise ADRs for refactor and framework-dependency decisions without changing runtime code."
  -
    type: "verify"
    at: "2026-04-20T12:27:08.485Z"
    author: "PLANNER"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/README.md, docs/adr/0002-adr-process.md, docs/adr/0003-refactor-sequencing.md."
doc_version: 3
doc_updated_at: "2026-04-20T12:27:08.499Z"
doc_updated_by: "PLANNER"
description: "Epic G′. Create docs/adr and add the initial set of decision records referenced by the refactor roadmap."
sections:
  Summary: |-
    Create ADR directory and seed initial refactor decisions
    
    Epic G′. Create docs/adr and add the initial set of decision records referenced by the refactor roadmap.
  Scope: |-
    - In scope: Epic G′. Create docs/adr and add the initial set of decision records referenced by the refactor roadmap.
    - Out of scope: unrelated refactors not required for "Create ADR directory and seed initial refactor decisions".
  Plan: "Create docs/adr as the canonical lightweight architecture decision record surface. Add a short index and seed the initial refactor decisions needed by the remaining roadmap, keeping documents concise and cross-linked so subsequent K/G documentation tasks can add focused ADRs without inventing a new format."
  Verify Steps: |-
    1. Review the requested outcome for "Create ADR directory and seed initial refactor decisions". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T12:27:08.485Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/README.md, docs/adr/0002-adr-process.md, docs/adr/0003-refactor-sequencing.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:25:17.659Z, excerpt_hash=sha256:c1c89849457d28f35ec14c885e39172b0ed1572bde3e306588b7f85f5dd676f5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Create ADR directory and seed initial refactor decisions

Epic G′. Create docs/adr and add the initial set of decision records referenced by the refactor roadmap.

## Scope

- In scope: Epic G′. Create docs/adr and add the initial set of decision records referenced by the refactor roadmap.
- Out of scope: unrelated refactors not required for "Create ADR directory and seed initial refactor decisions".

## Plan

Create docs/adr as the canonical lightweight architecture decision record surface. Add a short index and seed the initial refactor decisions needed by the remaining roadmap, keeping documents concise and cross-linked so subsequent K/G documentation tasks can add focused ADRs without inventing a new format.

## Verify Steps

1. Review the requested outcome for "Create ADR directory and seed initial refactor decisions". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T12:27:08.485Z — VERIFY — ok

By: PLANNER

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/README.md, docs/adr/0002-adr-process.md, docs/adr/0003-refactor-sequencing.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:25:17.659Z, excerpt_hash=sha256:c1c89849457d28f35ec14c885e39172b0ed1572bde3e306588b7f85f5dd676f5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
