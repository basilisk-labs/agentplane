---
id: "202605011626-4TQ11R"
title: "Generate release install assets and manifest"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605011625-D4P2MF"
tags:
  - "code"
  - "release"
verify:
  - "bun run release:check"
  - "bun run release:distribution:check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T16:28:27.558Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T16:56:43.396Z"
  updated_by: "CODER"
  note: "Release distribution assets verified: release:distribution:check passed; release:check passed; workflows:command-check passed; docs:scripts:check passed after regenerating scripts/README.md; publish workflow contract test passed; lint:core passed sequentially."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement deterministic release distribution assets and manifest generation now that the distribution contract task is closed on main."
events:
  -
    type: "status"
    at: "2026-05-01T16:48:36.083Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement deterministic release distribution assets and manifest generation now that the distribution contract task is closed on main."
  -
    type: "verify"
    at: "2026-05-01T16:56:43.396Z"
    author: "CODER"
    state: "ok"
    note: "Release distribution assets verified: release:distribution:check passed; release:check passed; workflows:command-check passed; docs:scripts:check passed after regenerating scripts/README.md; publish workflow contract test passed; lint:core passed sequentially."
doc_version: 3
doc_updated_at: "2026-05-01T16:56:43.403Z"
doc_updated_by: "CODER"
description: "Add deterministic release distribution asset generation for install.sh, install.ps1, SHA256SUMS, and a machine-readable release distribution manifest."
sections:
  Summary: |-
    Generate release install assets and manifest
    
    Add deterministic release distribution asset generation for install.sh, install.ps1, SHA256SUMS, and a machine-readable release distribution manifest.
  Scope: |-
    - In scope: Add deterministic release distribution asset generation for install.sh, install.ps1, SHA256SUMS, and a machine-readable release distribution manifest.
    - Out of scope: unrelated refactors not required for "Generate release install assets and manifest".
  Plan: "Plan: add deterministic release distribution generation scripts that produce install.sh, install.ps1, SHA256SUMS, and release-distribution.json from a version/tag/sha source. Add package scripts for generation/check mode and tests/smoke coverage that fail on drift. Verification: release:distribution:check and release:check."
  Verify Steps: |-
    1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T16:56:43.396Z — VERIFY — ok
    
    By: CODER
    
    Note: Release distribution assets verified: release:distribution:check passed; release:check passed; workflows:command-check passed; docs:scripts:check passed after regenerating scripts/README.md; publish workflow contract test passed; lint:core passed sequentially.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:48:36.083Z, excerpt_hash=sha256:b47e8f79d017dd09e1507ae6d640f0204f15ca116d3ab487616ceff2a8c73dce
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added scripts/generate-release-distribution.mjs plus package scripts and publish workflow wiring so GitHub Release assets now include install.sh, install.ps1, SHA256SUMS, release-distribution.json, and the upgrade bundle.
      Impact: The next hosted publish can produce versioned installer assets and a machine-readable distribution manifest instead of only npm packages and an upgrade tarball.
      Resolution: Commit the distribution generator, workflow asset upload list, workflow contract test update, and generated scripts README.
id_source: "generated"
---
## Summary

Generate release install assets and manifest

Add deterministic release distribution asset generation for install.sh, install.ps1, SHA256SUMS, and a machine-readable release distribution manifest.

## Scope

- In scope: Add deterministic release distribution asset generation for install.sh, install.ps1, SHA256SUMS, and a machine-readable release distribution manifest.
- Out of scope: unrelated refactors not required for "Generate release install assets and manifest".

## Plan

Plan: add deterministic release distribution generation scripts that produce install.sh, install.ps1, SHA256SUMS, and release-distribution.json from a version/tag/sha source. Add package scripts for generation/check mode and tests/smoke coverage that fail on drift. Verification: release:distribution:check and release:check.

## Verify Steps

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T16:56:43.396Z — VERIFY — ok

By: CODER

Note: Release distribution assets verified: release:distribution:check passed; release:check passed; workflows:command-check passed; docs:scripts:check passed after regenerating scripts/README.md; publish workflow contract test passed; lint:core passed sequentially.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:48:36.083Z, excerpt_hash=sha256:b47e8f79d017dd09e1507ae6d640f0204f15ca116d3ab487616ceff2a8c73dce

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added scripts/generate-release-distribution.mjs plus package scripts and publish workflow wiring so GitHub Release assets now include install.sh, install.ps1, SHA256SUMS, release-distribution.json, and the upgrade bundle.
  Impact: The next hosted publish can produce versioned installer assets and a machine-readable distribution manifest instead of only npm packages and an upgrade tarball.
  Resolution: Commit the distribution generator, workflow asset upload list, workflow contract test update, and generated scripts README.
