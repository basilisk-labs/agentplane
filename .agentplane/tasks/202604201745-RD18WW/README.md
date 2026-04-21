---
id: "202604201745-RD18WW"
title: "Publish next patch release"
result_summary: "Published v0.3.17 and restored the Knip release gate on main."
risk_level: "med"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T17:45:34.772Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T12:47:15.330Z"
  updated_by: "CODER"
  note: "Verified: v0.3.17 published to npm and GitHub Release; Core CI release-ready succeeded for main, publish job 24722101481 published core/recipes/cli and pushed tag v0.3.17; follow-up PR #495 restored Knip gate on main."
commit:
  hash: "60ef3389b913e5280a3128f96c9766facfe2f985"
  message: "Merge pull request #495 from basilisk-labs/release/v0.3.17-knip-fix"
comments:
  -
    author: "CODER"
    body: "Start: verify hosted and local release gates, framework install behavior, and publish the next patch release through the direct release route."
  -
    author: "CODER"
    body: "Verified: v0.3.17 is published to npm and GitHub Release; hosted publish job succeeded; main includes the follow-up Knip gate fix."
events:
  -
    type: "status"
    at: "2026-04-20T17:45:35.365Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: verify hosted and local release gates, framework install behavior, and publish the next patch release through the direct release route."
  -
    type: "verify"
    at: "2026-04-21T12:47:15.330Z"
    author: "CODER"
    state: "ok"
    note: "Verified: v0.3.17 published to npm and GitHub Release; Core CI release-ready succeeded for main, publish job 24722101481 published core/recipes/cli and pushed tag v0.3.17; follow-up PR #495 restored Knip gate on main."
  -
    type: "status"
    at: "2026-04-21T12:47:50.401Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.3.17 is published to npm and GitHub Release; hosted publish job succeeded; main includes the follow-up Knip gate fix."
doc_version: 3
doc_updated_at: "2026-04-21T12:47:50.403Z"
doc_updated_by: "CODER"
description: "Verify local and hosted release gates, confirm framework install/runtime behavior, and publish the next patch release through the direct release pipeline."
sections:
  Summary: |-
    Publish next patch release
    
    Verify local and hosted release gates, confirm framework install/runtime behavior, and publish the next patch release through the direct release pipeline.
  Scope: |-
    - In scope: Verify local and hosted release gates, confirm framework install/runtime behavior, and publish the next patch release through the direct release pipeline.
    - Out of scope: unrelated refactors not required for "Publish next patch release".
  Plan: "Release plan: publish the next patch release from direct mode only after gates pass. Steps: 1. Confirm tracked tree is clean except task metadata before release mutations. 2. Inspect current release plan and freeze version/tag target. 3. Verify hosted GitHub checks for the current branch or PR are green. 4. Run local release validation including release parity, release check, release CI/prepublish route, and critical tests as required by the pipeline. 5. Verify framework installation/runtime from a clean temporary project or official bootstrap route. 6. Run agentplane release apply --push --yes only if the route confirms direct publication is valid. 7. Record version, tag, pushed refs, server check evidence, and install/runtime evidence before finishing."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T12:47:15.330Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: v0.3.17 published to npm and GitHub Release; Core CI release-ready succeeded for main, publish job 24722101481 published core/recipes/cli and pushed tag v0.3.17; follow-up PR #495 restored Knip gate on main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T17:45:35.378Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Publish evidence: @agentplaneorg/core@0.3.17, @agentplaneorg/recipes@0.3.17, and agentplane@0.3.17 are visible in npm; GitHub Release v0.3.17 is published; remote tag v0.3.17 exists at f0ad813c.
      Impact: Release v0.3.17 is available; main additionally contains 60ef3389 with the Knip baseline fix for subsequent gates.
      Resolution: No further release action required for v0.3.17.
id_source: "generated"
---
## Summary

Publish next patch release

Verify local and hosted release gates, confirm framework install/runtime behavior, and publish the next patch release through the direct release pipeline.

## Scope

- In scope: Verify local and hosted release gates, confirm framework install/runtime behavior, and publish the next patch release through the direct release pipeline.
- Out of scope: unrelated refactors not required for "Publish next patch release".

## Plan

Release plan: publish the next patch release from direct mode only after gates pass. Steps: 1. Confirm tracked tree is clean except task metadata before release mutations. 2. Inspect current release plan and freeze version/tag target. 3. Verify hosted GitHub checks for the current branch or PR are green. 4. Run local release validation including release parity, release check, release CI/prepublish route, and critical tests as required by the pipeline. 5. Verify framework installation/runtime from a clean temporary project or official bootstrap route. 6. Run agentplane release apply --push --yes only if the route confirms direct publication is valid. 7. Record version, tag, pushed refs, server check evidence, and install/runtime evidence before finishing.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T12:47:15.330Z — VERIFY — ok

By: CODER

Note: Verified: v0.3.17 published to npm and GitHub Release; Core CI release-ready succeeded for main, publish job 24722101481 published core/recipes/cli and pushed tag v0.3.17; follow-up PR #495 restored Knip gate on main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T17:45:35.378Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Publish evidence: @agentplaneorg/core@0.3.17, @agentplaneorg/recipes@0.3.17, and agentplane@0.3.17 are visible in npm; GitHub Release v0.3.17 is published; remote tag v0.3.17 exists at f0ad813c.
  Impact: Release v0.3.17 is available; main additionally contains 60ef3389 with the Knip baseline fix for subsequent gates.
  Resolution: No further release action required for v0.3.17.
