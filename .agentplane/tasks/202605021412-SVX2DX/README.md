---
id: "202605021412-SVX2DX"
title: "Publish standalone artifacts in release workflow"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605021412-3KA8WV"
  - "202605021412-DV2ZT8"
tags:
  - "ci"
  - "distribution"
  - "release"
verify:
  - "bun run workflows:command-check"
  - "bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-02T14:12:54.055Z"
doc_updated_by: "CODER"
description: "Wire the publish workflow to build/upload bundled-runtime CLI artifacts for macOS arm64/x64, Linux x64/arm64, and Windows x64, then record them in release-distribution evidence before external package-manager modules run."
sections:
  Summary: |-
    Publish standalone artifacts in release workflow
    
    Wire the publish workflow to build/upload bundled-runtime CLI artifacts for macOS arm64/x64, Linux x64/arm64, and Windows x64, then record them in release-distribution evidence before external package-manager modules run.
  Scope: |-
    - In scope: Wire the publish workflow to build/upload bundled-runtime CLI artifacts for macOS arm64/x64, Linux x64/arm64, and Windows x64, then record them in release-distribution evidence before external package-manager modules run.
    - Out of scope: unrelated refactors not required for "Publish standalone artifacts in release workflow".
  Plan: |-
    1. Implement the change for "Publish standalone artifacts in release workflow".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Publish standalone artifacts in release workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Publish standalone artifacts in release workflow

Wire the publish workflow to build/upload bundled-runtime CLI artifacts for macOS arm64/x64, Linux x64/arm64, and Windows x64, then record them in release-distribution evidence before external package-manager modules run.

## Scope

- In scope: Wire the publish workflow to build/upload bundled-runtime CLI artifacts for macOS arm64/x64, Linux x64/arm64, and Windows x64, then record them in release-distribution evidence before external package-manager modules run.
- Out of scope: unrelated refactors not required for "Publish standalone artifacts in release workflow".

## Plan

1. Implement the change for "Publish standalone artifacts in release workflow".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Publish standalone artifacts in release workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
