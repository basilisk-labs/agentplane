---
id: "202604191642-C6ASHS"
title: "Document Biome deferral in ADR"
result_summary: "Documented the decision to defer Biome migration and keep ESLint plus Prettier until rule parity and churn risks are resolved."
status: "DONE"
priority: "med"
owner: "PLANNER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "adr"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T13:52:00.807Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T13:53:13.542Z"
  updated_by: "PLANNER"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0005-defer-biome-migration.md and docs/adr/README.md."
commit:
  hash: "2d405c7e391d90c204fcef322ff7c66fd7a25322"
  message: "📝 C6ASHS adr: defer Biome migration"
comments:
  -
    author: "PLANNER"
    body: "Start: Record the Biome deferral decision as a concise ADR and link it from the ADR index, keeping this task docs-only."
  -
    author: "PLANNER"
    body: "Verified: Biome deferral ADR is linked from the ADR index; policy routing, doctor, and format check all pass."
events:
  -
    type: "status"
    at: "2026-04-20T13:52:11.099Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Record the Biome deferral decision as a concise ADR and link it from the ADR index, keeping this task docs-only."
  -
    type: "verify"
    at: "2026-04-20T13:53:13.542Z"
    author: "PLANNER"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0005-defer-biome-migration.md and docs/adr/README.md."
  -
    type: "status"
    at: "2026-04-20T13:53:29.113Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Biome deferral ADR is linked from the ADR index; policy routing, doctor, and format check all pass."
doc_version: 3
doc_updated_at: "2026-04-20T13:53:29.113Z"
doc_updated_by: "PLANNER"
description: "Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now."
sections:
  Summary: |-
    Document Biome deferral in ADR
    
    Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.
  Scope: |-
    - In scope: Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.
    - Out of scope: unrelated refactors not required for "Document Biome deferral in ADR".
  Plan: "Add a focused ADR documenting the decision to defer Biome migration and keep ESLint/Prettier for now. Include the concrete reasons, risks, and revisit criteria, then link it from the ADR index. No tooling/runtime changes in this task."
  Verify Steps: |-
    1. Review the requested outcome for "Document Biome deferral in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T13:53:13.542Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0005-defer-biome-migration.md and docs/adr/README.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T13:52:11.110Z, excerpt_hash=sha256:51c6e461fac6f77a7be840c766d590736d2f2dd26fa25841a755f2a05b8cb0e1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document Biome deferral in ADR

Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.

## Scope

- In scope: Epic K and G′. Record why ESLint and Prettier remain the active lint and format stack for now.
- Out of scope: unrelated refactors not required for "Document Biome deferral in ADR".

## Plan

Add a focused ADR documenting the decision to defer Biome migration and keep ESLint/Prettier for now. Include the concrete reasons, risks, and revisit criteria, then link it from the ADR index. No tooling/runtime changes in this task.

## Verify Steps

1. Review the requested outcome for "Document Biome deferral in ADR". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T13:53:13.542Z — VERIFY — ok

By: PLANNER

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with informational runtime/archive findings only. Command: bun run format:check; Result: pass; Evidence: all matched files use Prettier. Links: docs/adr/0005-defer-biome-migration.md and docs/adr/README.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T13:52:11.110Z, excerpt_hash=sha256:51c6e461fac6f77a7be840c766d590736d2f2dd26fa25841a755f2a05b8cb0e1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
