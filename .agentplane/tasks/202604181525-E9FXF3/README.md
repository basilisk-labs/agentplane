---
id: "202604181525-E9FXF3"
title: "Publish recipes package in npm release workflow"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T15:25:20.651Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T15:29:36.664Z"
  updated_by: "CODER"
  note: "release workflow now treats @agentplaneorg/recipes as a required published package across detect, publish, smoke, and manifest surfaces; separate registry smoke reproduces that the currently published 0.3.13 release is still broken until recipes is actually published or superseded"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: promote @agentplaneorg/recipes into the canonical release workflow so published agentplane builds cannot ship with an unpublished recipes dependency."
events:
  -
    type: "status"
    at: "2026-04-18T15:25:35.312Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: promote @agentplaneorg/recipes into the canonical release workflow so published agentplane builds cannot ship with an unpublished recipes dependency."
  -
    type: "verify"
    at: "2026-04-18T15:29:36.664Z"
    author: "CODER"
    state: "ok"
    note: "release workflow now treats @agentplaneorg/recipes as a required published package across detect, publish, smoke, and manifest surfaces; separate registry smoke reproduces that the currently published 0.3.13 release is still broken until recipes is actually published or superseded"
doc_version: 3
doc_updated_at: "2026-04-18T15:29:36.667Z"
doc_updated_by: "CODER"
description: "Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete."
sections:
  Summary: |-
    Publish recipes package in npm release workflow
    
    Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.
  Scope: |-
    - In scope: Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.
    - Out of scope: unrelated refactors not required for "Publish recipes package in npm release workflow".
  Plan: "1. Promote @agentplaneorg/recipes to a first-class release package in workflow detection, publish steps, smoke checks, and release dry-run checks. 2. Extend publish-result and release-ready manifests so recipes publication is recorded and required for a successful release. 3. Update release workflow contract and manifest tests to prevent shipping agentplane with an unpublished recipes dependency again."
  Verify Steps: |-
    1. Review the requested outcome for "Publish recipes package in npm release workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T15:29:36.664Z — VERIFY — ok
    
    By: CODER
    
    Note: release workflow now treats @agentplaneorg/recipes as a required published package across detect, publish, smoke, and manifest surfaces; separate registry smoke reproduces that the currently published 0.3.13 release is still broken until recipes is actually published or superseded
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T15:25:35.322Z, excerpt_hash=sha256:e1428091af2b1a05a3508850dd48d5cd336359d12839d6de74a45bf326498010
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Publish recipes package in npm release workflow

Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.

## Scope

- In scope: Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.
- Out of scope: unrelated refactors not required for "Publish recipes package in npm release workflow".

## Plan

1. Promote @agentplaneorg/recipes to a first-class release package in workflow detection, publish steps, smoke checks, and release dry-run checks. 2. Extend publish-result and release-ready manifests so recipes publication is recorded and required for a successful release. 3. Update release workflow contract and manifest tests to prevent shipping agentplane with an unpublished recipes dependency again.

## Verify Steps

1. Review the requested outcome for "Publish recipes package in npm release workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T15:29:36.664Z — VERIFY — ok

By: CODER

Note: release workflow now treats @agentplaneorg/recipes as a required published package across detect, publish, smoke, and manifest surfaces; separate registry smoke reproduces that the currently published 0.3.13 release is still broken until recipes is actually published or superseded

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T15:25:35.322Z, excerpt_hash=sha256:e1428091af2b1a05a3508850dd48d5cd336359d12839d6de74a45bf326498010

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
