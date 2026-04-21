---
id: "202604210858-XWZ1M2"
title: "Remove retired config schema diff script"
result_summary: "Removed retired config schema diff script and updated ADR-0001."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "adr"
  - "cleanup"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:01:25.481Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:09:55.498Z"
  updated_by: "CODER"
  note: "Command: rg diff-config-schemas live paths; Result: pass; Evidence: no package/hook/CI/scripts references found. Command: test ! -e scripts/diff-config-schemas.mjs; Result: pass; Evidence: retired script is deleted. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Scope: retired config schema diff script cleanup and ADR-0001 supersession note."
commit:
  hash: "da141c0dfb42b6053fa2ccfe5052cdc626d38942"
  message: "✅ XWZ1M2 code: done"
comments:
  -
    author: "CODER"
    body: "Start: Remove the retired config schema diff script and update ADR-0001 with a supersession note after confirming no live references remain."
  -
    author: "CODER"
    body: "Verified: retired config schema diff script removed, ADR supersession recorded, and live references/checks passed."
events:
  -
    type: "status"
    at: "2026-04-21T09:01:28.619Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove the retired config schema diff script and update ADR-0001 with a supersession note after confirming no live references remain."
  -
    type: "verify"
    at: "2026-04-21T09:09:55.498Z"
    author: "CODER"
    state: "ok"
    note: "Command: rg diff-config-schemas live paths; Result: pass; Evidence: no package/hook/CI/scripts references found. Command: test ! -e scripts/diff-config-schemas.mjs; Result: pass; Evidence: retired script is deleted. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Scope: retired config schema diff script cleanup and ADR-0001 supersession note."
  -
    type: "status"
    at: "2026-04-21T09:13:23.253Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: retired config schema diff script removed, ADR supersession recorded, and live references/checks passed."
doc_version: 3
doc_updated_at: "2026-04-21T09:13:23.254Z"
doc_updated_by: "CODER"
description: "Delete the obsolete AJV-vs-Zod schema diff script and update ADR-0001 so documentation no longer points at a retired verifier."
sections:
  Summary: "Remove scripts/diff-config-schemas.mjs and replace the ADR-0001 verification reference with a supersession note explaining that AJV was retired and Zod is now the only config validation path."
  Scope: "In scope: scripts/diff-config-schemas.mjs, docs/adr/0001-zod-config-parity.md, and references found by rg. Out of scope: new config validation design."
  Plan: |-
    1. Search for diff-config-schemas references across package scripts, hooks, CI, docs, and scripts.
    2. Delete the retired script if no live runtime/CI reference exists.
    3. Add an ADR supersession note instead of rewriting history.
    4. Run targeted docs/reference checks plus typecheck if script removal touches package scripts.
  Verify Steps: |-
    - rg diff-config-schemas shows no live command reference except historical task artifacts if any.
    - ADR-0001 clearly records the retirement.
    - Relevant test/typecheck/script checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:09:55.498Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: rg diff-config-schemas live paths; Result: pass; Evidence: no package/hook/CI/scripts references found. Command: test ! -e scripts/diff-config-schemas.mjs; Result: pass; Evidence: retired script is deleted. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Scope: retired config schema diff script cleanup and ADR-0001 supersession note.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:01:28.631Z, excerpt_hash=sha256:aca91c2779448f0c0e02402ff03ba68be204cbfc67b766ce13b0fe7572c362d0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore the script and ADR text from git for this task only."
  Findings: "Source inputs: SAFE_TO_REMOVE 0.1/0.3 and REFACTORING_PLAN A.1."
id_source: "generated"
---
## Summary

Remove scripts/diff-config-schemas.mjs and replace the ADR-0001 verification reference with a supersession note explaining that AJV was retired and Zod is now the only config validation path.

## Scope

In scope: scripts/diff-config-schemas.mjs, docs/adr/0001-zod-config-parity.md, and references found by rg. Out of scope: new config validation design.

## Plan

1. Search for diff-config-schemas references across package scripts, hooks, CI, docs, and scripts.
2. Delete the retired script if no live runtime/CI reference exists.
3. Add an ADR supersession note instead of rewriting history.
4. Run targeted docs/reference checks plus typecheck if script removal touches package scripts.

## Verify Steps

- rg diff-config-schemas shows no live command reference except historical task artifacts if any.
- ADR-0001 clearly records the retirement.
- Relevant test/typecheck/script checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:09:55.498Z — VERIFY — ok

By: CODER

Note: Command: rg diff-config-schemas live paths; Result: pass; Evidence: no package/hook/CI/scripts references found. Command: test ! -e scripts/diff-config-schemas.mjs; Result: pass; Evidence: retired script is deleted. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Scope: retired config schema diff script cleanup and ADR-0001 supersession note.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:01:28.631Z, excerpt_hash=sha256:aca91c2779448f0c0e02402ff03ba68be204cbfc67b766ce13b0fe7572c362d0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the script and ADR text from git for this task only.

## Findings

Source inputs: SAFE_TO_REMOVE 0.1/0.3 and REFACTORING_PLAN A.1.
