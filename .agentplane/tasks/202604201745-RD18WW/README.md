---
id: "202604201745-RD18WW"
title: "Publish next patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: verify hosted and local release gates, framework install behavior, and publish the next patch release through the direct release route."
events:
  -
    type: "status"
    at: "2026-04-20T17:45:35.365Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: verify hosted and local release gates, framework install behavior, and publish the next patch release through the direct release route."
doc_version: 3
doc_updated_at: "2026-04-20T17:45:35.378Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
