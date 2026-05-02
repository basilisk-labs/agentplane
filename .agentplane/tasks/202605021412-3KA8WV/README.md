---
id: "202605021412-3KA8WV"
title: "Extend release distribution manifest with standalone assets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605021412-Q2WGGA"
tags:
  - "code"
  - "distribution"
  - "release"
verify:
  - "bun run release:distribution:check"
  - "bun test packages/agentplane/src/commands/release/*distribution*"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T16:56:49.113Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T17:03:21.005Z"
  updated_by: "CODER"
  note: "Passed: bun run release:distribution:check; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts; bunx eslint scripts/generate-release-distribution.mjs packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Wire standalone CLI assets into release-distribution generation, checksum coverage, and focused distribution tests."
events:
  -
    type: "status"
    at: "2026-05-02T16:57:22.430Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Wire standalone CLI assets into release-distribution generation, checksum coverage, and focused distribution tests."
  -
    type: "verify"
    at: "2026-05-02T17:03:21.005Z"
    author: "CODER"
    state: "ok"
    note: "Passed: bun run release:distribution:check; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts; bunx eslint scripts/generate-release-distribution.mjs packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
doc_version: 3
doc_updated_at: "2026-05-02T17:03:21.024Z"
doc_updated_by: "CODER"
description: "Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence."
sections:
  Summary: |-
    Extend release distribution manifest with standalone assets
    
    Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.
  Scope: |-
    - In scope: Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.
    - Out of scope: unrelated refactors not required for "Extend release distribution manifest with standalone assets".
  Plan: |-
    Extend release-distribution generation to consume the standalone asset generator.
    
    Scope:
    - Update scripts/generate-release-distribution.mjs to generate standalone CLI archives before writing the final manifest/checksum set.
    - Add platformAssets entries from standalone-assets.json and include standalone archives in releaseAssets.
    - Include standalone archives in the top-level SHA256SUMS.
    - Keep distribution --check offline by invoking standalone generation with synthetic Node and skipped dependency install.
    - Add focused distribution tests for platformAssets and checksum coverage.
    
    Verification:
    - agentplane task verify-show 202605021412-3KA8WV
    - bun run release:distribution:check
    - bun test packages/agentplane/src/commands/release/*distribution*
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun test packages/agentplane/src/commands/release/*distribution*`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T17:03:21.005Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed: bun run release:distribution:check; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts; bunx eslint scripts/generate-release-distribution.mjs packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:57:22.430Z, excerpt_hash=sha256:1318dcdc5276d462297e0bbc43bedd47ba80c7d6f6554a696fc41847d9e65fab
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extend release distribution manifest with standalone assets

Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.

## Scope

- In scope: Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.
- Out of scope: unrelated refactors not required for "Extend release distribution manifest with standalone assets".

## Plan

Extend release-distribution generation to consume the standalone asset generator.

Scope:
- Update scripts/generate-release-distribution.mjs to generate standalone CLI archives before writing the final manifest/checksum set.
- Add platformAssets entries from standalone-assets.json and include standalone archives in releaseAssets.
- Include standalone archives in the top-level SHA256SUMS.
- Keep distribution --check offline by invoking standalone generation with synthetic Node and skipped dependency install.
- Add focused distribution tests for platformAssets and checksum coverage.

Verification:
- agentplane task verify-show 202605021412-3KA8WV
- bun run release:distribution:check
- bun test packages/agentplane/src/commands/release/*distribution*
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun test packages/agentplane/src/commands/release/*distribution*`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T17:03:21.005Z — VERIFY — ok

By: CODER

Note: Passed: bun run release:distribution:check; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts; bunx eslint scripts/generate-release-distribution.mjs packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:57:22.430Z, excerpt_hash=sha256:1318dcdc5276d462297e0bbc43bedd47ba80c7d6f6554a696fc41847d9e65fab

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
