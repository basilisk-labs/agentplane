---
id: "202605021914-N72MF3"
title: "Modularize release publish jobs"
result_summary: "Merged via PR #766."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "distribution"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:15:07.283Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T19:36:08.443Z"
  updated_by: "CODER"
  note: "Verified: modular release pipeline checks passed: workflow lint, format, release:prepublish:fast, distribution/standalone/Homebrew/Scoop/setup-action/GHCR checks, targeted release contract tests, policy routing, docs scripts, and agentplane doctor."
commit:
  hash: "4352cd44b8d6fe73a7934ab0c4c729ceaba6ffe1"
  message: "Merge pull request #766 from basilisk-labs/task/202605021914-N72MF3/release-pipeline-modules"
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved modular release pipeline task chain in this dedicated worktree, preserving exact-SHA release readiness and stopping if publish scope changes."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #766 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-02T19:15:45.460Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved modular release pipeline task chain in this dedicated worktree, preserving exact-SHA release readiness and stopping if publish scope changes."
  -
    type: "verify"
    at: "2026-05-02T19:36:08.443Z"
    author: "CODER"
    state: "ok"
    note: "Verified: modular release pipeline checks passed: workflow lint, format, release:prepublish:fast, distribution/standalone/Homebrew/Scoop/setup-action/GHCR checks, targeted release contract tests, policy routing, docs scripts, and agentplane doctor."
  -
    type: "status"
    at: "2026-05-02T20:00:22.556Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #766 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-02T20:00:22.565Z"
doc_updated_by: "INTEGRATOR"
description: "Split the release publish workflow into independently recoverable jobs for distribution assets, npm, GitHub Release, GHCR, and credentials-gated external repositories."
sections:
  Summary: |-
    Modularize release publish jobs
    
    Split the release publish workflow into independently recoverable jobs for distribution assets, npm, GitHub Release, GHCR, and credentials-gated external repositories.
  Scope: |-
    - In scope: Split the release publish workflow into independently recoverable jobs for distribution assets, npm, GitHub Release, GHCR, and credentials-gated external repositories.
    - Out of scope: unrelated refactors not required for "Modularize release publish jobs".
  Plan: "Plan: 1) split .github/workflows/publish.yml into independent publish jobs that share release-distribution artifacts; 2) preserve exact-SHA release-ready gating and npm idempotency; 3) make required and credentials-gated modules produce separate evidence artifacts; 4) verify with workflow contract tests and release checks."
  Verify Steps: |-
    1. Review the requested outcome for "Modularize release publish jobs". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T19:36:08.443Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: modular release pipeline checks passed: workflow lint, format, release:prepublish:fast, distribution/standalone/Homebrew/Scoop/setup-action/GHCR checks, targeted release contract tests, policy routing, docs scripts, and agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:15:45.460Z, excerpt_hash=sha256:76c33aefe091b330e7fa0c28625b0abbc6b863a69b99616e49cf0ba286d243be
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Primary publish workflow now treats credentials-gated external handoffs as non-blocking and a separate exact-SHA distribution module workflow can recover GitHub Release assets, GHCR, Homebrew, Scoop, and setup-action without npm republish.
      Impact: Partial release recovery is more granular; npm/GitHub/GHCR remain required release channels while external handoffs can be retried independently.
      Resolution: Added workflow and contract coverage for the modular recovery path.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Modularize release publish jobs

Split the release publish workflow into independently recoverable jobs for distribution assets, npm, GitHub Release, GHCR, and credentials-gated external repositories.

## Scope

- In scope: Split the release publish workflow into independently recoverable jobs for distribution assets, npm, GitHub Release, GHCR, and credentials-gated external repositories.
- Out of scope: unrelated refactors not required for "Modularize release publish jobs".

## Plan

Plan: 1) split .github/workflows/publish.yml into independent publish jobs that share release-distribution artifacts; 2) preserve exact-SHA release-ready gating and npm idempotency; 3) make required and credentials-gated modules produce separate evidence artifacts; 4) verify with workflow contract tests and release checks.

## Verify Steps

1. Review the requested outcome for "Modularize release publish jobs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T19:36:08.443Z — VERIFY — ok

By: CODER

Note: Verified: modular release pipeline checks passed: workflow lint, format, release:prepublish:fast, distribution/standalone/Homebrew/Scoop/setup-action/GHCR checks, targeted release contract tests, policy routing, docs scripts, and agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:15:45.460Z, excerpt_hash=sha256:76c33aefe091b330e7fa0c28625b0abbc6b863a69b99616e49cf0ba286d243be

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Primary publish workflow now treats credentials-gated external handoffs as non-blocking and a separate exact-SHA distribution module workflow can recover GitHub Release assets, GHCR, Homebrew, Scoop, and setup-action without npm republish.
  Impact: Partial release recovery is more granular; npm/GitHub/GHCR remain required release channels while external handoffs can be retried independently.
  Resolution: Added workflow and contract coverage for the modular recovery path.
  Promotion: incident-candidate
  Fixability: external
