---
id: "202605041938-EWDGYZ"
title: "Expose public schemas from root catalog"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T19:38:26.567Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T19:48:53.646Z"
  updated_by: "CODER"
  note: "Command: bun run schemas:check -> pass (schemas OK). Command: bunx prettier --check <changed files> -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: agentplane doctor -> pass with one unrelated warning about two pre-existing shipped open tasks."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extend schema synchronization so root schemas/ exposes generated public schemas, then update schema discovery docs and verify parity."
events:
  -
    type: "status"
    at: "2026-05-04T19:46:05.952Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extend schema synchronization so root schemas/ exposes generated public schemas, then update schema discovery docs and verify parity."
  -
    type: "verify"
    at: "2026-05-04T19:48:53.646Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run schemas:check -> pass (schemas OK). Command: bunx prettier --check <changed files> -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: agentplane doctor -> pass with one unrelated warning about two pre-existing shipped open tasks."
doc_version: 3
doc_updated_at: "2026-05-04T19:48:53.650Z"
doc_updated_by: "CODER"
description: "Make root schemas/ include generated public schema mirrors such as ACR so README and hosted schema paths are discoverable from the repository root."
sections:
  Summary: |-
    Expose public schemas from root catalog
    
    Make root schemas/ include generated public schema mirrors such as ACR so README and hosted schema paths are discoverable from the repository root.
  Scope: |-
    - In scope: Make root schemas/ include generated public schema mirrors such as ACR so README and hosted schema paths are discoverable from the repository root.
    - Out of scope: unrelated refactors not required for "Expose public schemas from root catalog".
  Plan: |-
    1. Extend scripts/sync-schemas.mjs so generated public schema artifacts are also emitted and checked under root schemas/.
    2. Regenerate schema mirrors with bun run schemas:sync.
    3. Update README/docs references so ACR schema discovery points to root schemas/acr-v0.1.schema.json while retaining package mirrors where relevant.
    4. Verify with bun run schemas:check, targeted docs/schema checks, agentplane doctor, and node .agentplane/policy/check-routing.mjs.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T19:48:53.646Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run schemas:check -> pass (schemas OK). Command: bunx prettier --check <changed files> -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: agentplane doctor -> pass with one unrelated warning about two pre-existing shipped open tasks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:46:05.952Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Root schemas/ now includes generated public schema mirrors, including acr-v0.1.schema.json, and docs point schema discovery to the root catalog.
      Impact: ACR and other public schemas are discoverable from the repository root and remain checked by schemas:check.
      Resolution: Extended scripts/sync-schemas.mjs targets and synchronized root schema files.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Expose public schemas from root catalog

Make root schemas/ include generated public schema mirrors such as ACR so README and hosted schema paths are discoverable from the repository root.

## Scope

- In scope: Make root schemas/ include generated public schema mirrors such as ACR so README and hosted schema paths are discoverable from the repository root.
- Out of scope: unrelated refactors not required for "Expose public schemas from root catalog".

## Plan

1. Extend scripts/sync-schemas.mjs so generated public schema artifacts are also emitted and checked under root schemas/.
2. Regenerate schema mirrors with bun run schemas:sync.
3. Update README/docs references so ACR schema discovery points to root schemas/acr-v0.1.schema.json while retaining package mirrors where relevant.
4. Verify with bun run schemas:check, targeted docs/schema checks, agentplane doctor, and node .agentplane/policy/check-routing.mjs.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T19:48:53.646Z — VERIFY — ok

By: CODER

Note: Command: bun run schemas:check -> pass (schemas OK). Command: bunx prettier --check <changed files> -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: agentplane doctor -> pass with one unrelated warning about two pre-existing shipped open tasks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:46:05.952Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Root schemas/ now includes generated public schema mirrors, including acr-v0.1.schema.json, and docs point schema discovery to the root catalog.
  Impact: ACR and other public schemas are discoverable from the repository root and remain checked by schemas:check.
  Resolution: Extended scripts/sync-schemas.mjs targets and synchronized root schema files.
  Promotion: incident-candidate
  Fixability: external
