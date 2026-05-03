---
id: "202605031856-V5KXGG"
title: "ACR docs and release checks refresh"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031856-CKQ0TG"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T18:57:53.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T19:21:41.909Z"
  updated_by: "DOCS"
  note: "Verified ACR documentation refresh: user/developer docs updated; CLI reference regenerated and fresh; formatting and policy routing checks passed."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: refresh ACR user and developer docs after the standard schema, semantic validation, and CI gate changes land in this batch worktree."
events:
  -
    type: "status"
    at: "2026-05-03T18:58:50.997Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh ACR user and developer docs after the standard schema, semantic validation, and CI gate changes land in this batch worktree."
  -
    type: "verify"
    at: "2026-05-03T19:21:41.909Z"
    author: "DOCS"
    state: "ok"
    note: "Verified ACR documentation refresh: user/developer docs updated; CLI reference regenerated and fresh; formatting and policy routing checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T19:21:41.925Z"
doc_updated_by: "DOCS"
description: "Update AgentPlane user/developer ACR documentation and generated CLI reference for validation classes, standard repo alignment, canonical digest semantics, and config-gated CI enforcement."
sections:
  Summary: |-
    ACR docs and release checks refresh
    
    Update AgentPlane user/developer ACR documentation and generated CLI reference for validation classes, standard repo alignment, canonical digest semantics, and config-gated CI enforcement.
  Scope: |-
    - In scope: Update AgentPlane user/developer ACR documentation and generated CLI reference for validation classes, standard repo alignment, canonical digest semantics, and config-gated CI enforcement.
    - Out of scope: unrelated refactors not required for "ACR docs and release checks refresh".
  Plan: "Plan: (1) Update user and developer ACR docs to reference the hardened standard repo, validation classes, canonical digest rules, and schema-valid versus merge-ready distinction. (2) Document config-gated CI enforcement through acr.require_for_pr_check and keep automatic finish export as default-on. (3) Regenerate CLI reference. (4) Verify docs freshness, policy routing, and docs formatting."
  Verify Steps: |-
    1. Review the requested outcome for "ACR docs and release checks refresh". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T19:21:41.909Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified ACR documentation refresh: user/developer docs updated; CLI reference regenerated and fresh; formatting and policy routing checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T18:58:50.997Z, excerpt_hash=sha256:7279f8c1e19d7c53834cd0f8de8fd119fb3cd2deef09fecc0bf568776d333327
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Ran docs:cli:generate, docs:cli:check, format:check, schemas:check, spec:examples:check, and node .agentplane/policy/check-routing.mjs.
      Impact: Docs now distinguish schema-valid from merge-ready, document canonical digest semantics, standard repo alignment, default automatic export, and config-gated CI enforcement.
      Resolution: No docs follow-up remains in this task scope.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

ACR docs and release checks refresh

Update AgentPlane user/developer ACR documentation and generated CLI reference for validation classes, standard repo alignment, canonical digest semantics, and config-gated CI enforcement.

## Scope

- In scope: Update AgentPlane user/developer ACR documentation and generated CLI reference for validation classes, standard repo alignment, canonical digest semantics, and config-gated CI enforcement.
- Out of scope: unrelated refactors not required for "ACR docs and release checks refresh".

## Plan

Plan: (1) Update user and developer ACR docs to reference the hardened standard repo, validation classes, canonical digest rules, and schema-valid versus merge-ready distinction. (2) Document config-gated CI enforcement through acr.require_for_pr_check and keep automatic finish export as default-on. (3) Regenerate CLI reference. (4) Verify docs freshness, policy routing, and docs formatting.

## Verify Steps

1. Review the requested outcome for "ACR docs and release checks refresh". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T19:21:41.909Z — VERIFY — ok

By: DOCS

Note: Verified ACR documentation refresh: user/developer docs updated; CLI reference regenerated and fresh; formatting and policy routing checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T18:58:50.997Z, excerpt_hash=sha256:7279f8c1e19d7c53834cd0f8de8fd119fb3cd2deef09fecc0bf568776d333327

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Ran docs:cli:generate, docs:cli:check, format:check, schemas:check, spec:examples:check, and node .agentplane/policy/check-routing.mjs.
  Impact: Docs now distinguish schema-valid from merge-ready, document canonical digest semantics, standard repo alignment, default automatic export, and config-gated CI enforcement.
  Resolution: No docs follow-up remains in this task scope.
  Promotion: incident-candidate
  Fixability: external
