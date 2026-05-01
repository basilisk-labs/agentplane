---
id: "202605011625-D4P2MF"
title: "Record release distribution contract"
result_summary: "Merged via PR #701."
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
verify:
  - "agentplane doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T16:28:08.565Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T16:40:54.828Z"
  updated_by: "DOCS"
  note: "Docs contract verified: node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed with zero errors and zero warnings."
commit:
  hash: "e31f20f6913e253cda4afc6222cac5ac02baff83"
  message: "Merge pull request #701 from basilisk-labs/task/202605011625-D4P2MF/release-distribution-contract"
comments:
  -
    author: "DOCS"
    body: "Start: document the release distribution contract and acceptance gates before downstream release automation changes."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #701 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T16:38:50.138Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the release distribution contract and acceptance gates before downstream release automation changes."
  -
    type: "verify"
    at: "2026-05-01T16:40:54.828Z"
    author: "DOCS"
    state: "ok"
    note: "Docs contract verified: node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed with zero errors and zero warnings."
  -
    type: "status"
    at: "2026-05-01T16:47:13.182Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #701 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T16:47:13.187Z"
doc_updated_by: "INTEGRATOR"
description: "Define the multi-channel release contract, blocking gates, non-blocking follow-ups, required secrets, and verification evidence for publishing beyond npm."
sections:
  Summary: |-
    Record release distribution contract
    
    Define the multi-channel release contract, blocking gates, non-blocking follow-ups, required secrets, and verification evidence for publishing beyond npm.
  Scope: |-
    - In scope: Define the multi-channel release contract, blocking gates, non-blocking follow-ups, required secrets, and verification evidence for publishing beyond npm.
    - Out of scope: unrelated refactors not required for "Record release distribution contract".
  Plan: "Plan: define a multi-channel release distribution contract for npm, GitHub Release assets, Homebrew tap, Scoop bucket, GHCR image, and setup-agentplane. Classify channels as blocking or follow-up, list required secrets, evidence artifacts, recovery behavior, and next-release acceptance criteria. Verification: policy routing and doctor."
  Verify Steps: |-
    1. Review the requested outcome for "Record release distribution contract". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T16:40:54.828Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs contract verified: node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed with zero errors and zero warnings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:38:50.138Z, excerpt_hash=sha256:8803f7065a9c72155f5858bc81b6a88e3b18e8722995b84a1e05a9be612812c1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release distribution contract now defines manifest, installer assets, blocking channels, credentials-gated skips, module evidence files, and recovery behavior.
      Impact: Downstream release automation can derive package manager, GHCR, and setup-action publication from one documented source instead of hidden workflow shell state.
      Resolution: Proceed to implement release distribution asset and manifest generation against this contract.
id_source: "generated"
---
## Summary

Record release distribution contract

Define the multi-channel release contract, blocking gates, non-blocking follow-ups, required secrets, and verification evidence for publishing beyond npm.

## Scope

- In scope: Define the multi-channel release contract, blocking gates, non-blocking follow-ups, required secrets, and verification evidence for publishing beyond npm.
- Out of scope: unrelated refactors not required for "Record release distribution contract".

## Plan

Plan: define a multi-channel release distribution contract for npm, GitHub Release assets, Homebrew tap, Scoop bucket, GHCR image, and setup-agentplane. Classify channels as blocking or follow-up, list required secrets, evidence artifacts, recovery behavior, and next-release acceptance criteria. Verification: policy routing and doctor.

## Verify Steps

1. Review the requested outcome for "Record release distribution contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T16:40:54.828Z — VERIFY — ok

By: DOCS

Note: Docs contract verified: node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed with zero errors and zero warnings.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:38:50.138Z, excerpt_hash=sha256:8803f7065a9c72155f5858bc81b6a88e3b18e8722995b84a1e05a9be612812c1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release distribution contract now defines manifest, installer assets, blocking channels, credentials-gated skips, module evidence files, and recovery behavior.
  Impact: Downstream release automation can derive package manager, GHCR, and setup-action publication from one documented source instead of hidden workflow shell state.
  Resolution: Proceed to implement release distribution asset and manifest generation against this contract.
