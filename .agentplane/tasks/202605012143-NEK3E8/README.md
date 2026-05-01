---
id: "202605012143-NEK3E8"
title: "Fix Homebrew formula npm install"
result_summary: "Merged via PR #738."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T21:44:05.576Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T21:47:52.326Z"
  updated_by: "CODER"
  note: "Homebrew formula install hotfix verified."
commit:
  hash: "43bc2ed84a23e09b4982a62cd68968de62343037"
  message: "🍺 NEK3E8 release: fix Homebrew formula install"
comments:
  -
    author: "CODER"
    body: "Start: fix Homebrew formula install path and update the tap hotfix for v0.4.1."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #738 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T21:44:12.281Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix Homebrew formula install path and update the tap hotfix for v0.4.1."
  -
    type: "verify"
    at: "2026-05-01T21:47:52.326Z"
    author: "CODER"
    state: "ok"
    note: "Homebrew formula install hotfix verified."
  -
    type: "status"
    at: "2026-05-01T21:50:51.414Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #738 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T21:50:51.419Z"
doc_updated_by: "INTEGRATOR"
description: "Update the Homebrew formula renderer and tap formula so fresh AgentPlane releases install without Homebrew npm min-release-age blocking fresh package dependencies."
sections:
  Summary: |-
    Fix Homebrew formula npm install
    
    Update the Homebrew formula renderer and tap formula so fresh AgentPlane releases install without Homebrew npm min-release-age blocking fresh package dependencies.
  Scope: |-
    - In scope: Update the Homebrew formula renderer and tap formula so fresh AgentPlane releases install without Homebrew npm min-release-age blocking fresh package dependencies.
    - Out of scope: unrelated refactors not required for "Fix Homebrew formula npm install".
  Plan: |-
    1. Reproduce the Homebrew npm install failure mode from the current tap formula and inspect available release assets.
    2. Change the Homebrew formula renderer to avoid Homebrew std_npm_args/min-release-age for freshly published npm dependencies while keeping explicit Node runtime dependency.
    3. Add/adjust tests that lock the formula contract and evidence fields.
    4. Update basilisk-labs/homebrew-tap Formula/agentplane.rb for v0.4.1 and verify local formula syntax/install command shape.
    5. Run targeted checks, merge the repo change through branch_pr, and report the remaining standalone/no-Node artifact gap separately.
  Verify Steps: |-
    1. Review the requested outcome for "Fix Homebrew formula npm install". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T21:47:52.326Z — VERIFY — ok
    
    By: CODER
    
    Note: Homebrew formula install hotfix verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T21:44:12.281Z, excerpt_hash=sha256:14d2a57b4904317fcf258a430766971c88977ad767cceca680b45264be2eb93b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Updated render-homebrew-formula to install the cached npm tarball without std_npm_args/min-release-age, added contract coverage, and pushed basilisk-labs/homebrew-tap c6d3e94 for v0.4.1. Local Homebrew install reached Cellar successfully; final link was blocked only by an existing /opt/homebrew/bin/agentplane npm-global symlink.
      Impact: Fresh AgentPlane releases no longer fail Homebrew install because npm filters same-day workspace dependency versions.
      Resolution: Run brew link --overwrite agentplane when an old npm-global symlink is present; standalone no-Node install requires a future native/bundled CLI artifact.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Fix Homebrew formula npm install

Update the Homebrew formula renderer and tap formula so fresh AgentPlane releases install without Homebrew npm min-release-age blocking fresh package dependencies.

## Scope

- In scope: Update the Homebrew formula renderer and tap formula so fresh AgentPlane releases install without Homebrew npm min-release-age blocking fresh package dependencies.
- Out of scope: unrelated refactors not required for "Fix Homebrew formula npm install".

## Plan

1. Reproduce the Homebrew npm install failure mode from the current tap formula and inspect available release assets.
2. Change the Homebrew formula renderer to avoid Homebrew std_npm_args/min-release-age for freshly published npm dependencies while keeping explicit Node runtime dependency.
3. Add/adjust tests that lock the formula contract and evidence fields.
4. Update basilisk-labs/homebrew-tap Formula/agentplane.rb for v0.4.1 and verify local formula syntax/install command shape.
5. Run targeted checks, merge the repo change through branch_pr, and report the remaining standalone/no-Node artifact gap separately.

## Verify Steps

1. Review the requested outcome for "Fix Homebrew formula npm install". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T21:47:52.326Z — VERIFY — ok

By: CODER

Note: Homebrew formula install hotfix verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T21:44:12.281Z, excerpt_hash=sha256:14d2a57b4904317fcf258a430766971c88977ad767cceca680b45264be2eb93b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Updated render-homebrew-formula to install the cached npm tarball without std_npm_args/min-release-age, added contract coverage, and pushed basilisk-labs/homebrew-tap c6d3e94 for v0.4.1. Local Homebrew install reached Cellar successfully; final link was blocked only by an existing /opt/homebrew/bin/agentplane npm-global symlink.
  Impact: Fresh AgentPlane releases no longer fail Homebrew install because npm filters same-day workspace dependency versions.
  Resolution: Run brew link --overwrite agentplane when an old npm-global symlink is present; standalone no-Node install requires a future native/bundled CLI artifact.
  Promotion: incident-candidate
  Fixability: external
