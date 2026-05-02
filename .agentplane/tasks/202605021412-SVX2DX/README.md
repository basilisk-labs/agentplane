---
id: "202605021412-SVX2DX"
title: "Publish standalone artifacts in release workflow"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "approved"
  updated_at: "2026-05-02T17:20:47.909Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T17:24:54.591Z"
  updated_by: "CODER"
  note: "Passed: agentplane task verify-show 202605021412-SVX2DX; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Publish generated standalone archives as GitHub Release assets and smoke them in the publish job."
events:
  -
    type: "status"
    at: "2026-05-02T17:21:16.867Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Publish generated standalone archives as GitHub Release assets and smoke them in the publish job."
  -
    type: "verify"
    at: "2026-05-02T17:24:54.591Z"
    author: "CODER"
    state: "ok"
    note: "Passed: agentplane task verify-show 202605021412-SVX2DX; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
doc_version: 3
doc_updated_at: "2026-05-02T17:24:54.631Z"
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
    Wire standalone archives into the real publish workflow.
    
    Scope:
    - Add publish-job smoke validation for generated standalone archives before GitHub Release creation.
    - Upload all standalone archives plus standalone-assets.json as GitHub Release assets.
    - Keep release-distribution artifact upload intact for evidence/recovery.
    - Extend publish workflow contract tests to lock this behavior.
    
    Verification:
    - agentplane task verify-show 202605021412-SVX2DX
    - bun run workflows:command-check
    - bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Review the requested outcome for "Publish standalone artifacts in release workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T17:24:54.591Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed: agentplane task verify-show 202605021412-SVX2DX; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:21:16.867Z, excerpt_hash=sha256:3ec41abcfab9bc5c93d94e1b758d3c062b10f150c2c556841988f45b499b46fd
    
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

Wire standalone archives into the real publish workflow.

Scope:
- Add publish-job smoke validation for generated standalone archives before GitHub Release creation.
- Upload all standalone archives plus standalone-assets.json as GitHub Release assets.
- Keep release-distribution artifact upload intact for evidence/recovery.
- Extend publish workflow contract tests to lock this behavior.

Verification:
- agentplane task verify-show 202605021412-SVX2DX
- bun run workflows:command-check
- bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Review the requested outcome for "Publish standalone artifacts in release workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T17:24:54.591Z — VERIFY — ok

By: CODER

Note: Passed: agentplane task verify-show 202605021412-SVX2DX; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:21:16.867Z, excerpt_hash=sha256:3ec41abcfab9bc5c93d94e1b758d3c062b10f150c2c556841988f45b499b46fd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
