---
id: "202605021412-DV2ZT8"
title: "Add standalone artifact smoke tests"
result_summary: "Merged via PR #750."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605021412-Q2WGGA"
tags:
  - "code"
  - "release"
  - "tests"
verify:
  - "bun test packages/agentplane/src/commands/release/*standalone*"
  - "node scripts/<standalone-smoke-script>.mjs --artifact <fixture>"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T17:08:01.734Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T17:15:54.797Z"
  updated_by: "CODER"
  note: "Passed: agentplane task verify-show 202605021412-DV2ZT8; bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; node scripts/smoke-standalone-cli-artifact.mjs --artifact <synthetic fixture> --expected-version 1.2.3 --allow-synthetic-runtime; bun run release:standalone:check; bunx eslint scripts/smoke-standalone-cli-artifact.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
commit:
  hash: "56ed4f9b26adcd183986456cc9043878d36b2b9b"
  message: "release: Add standalone artifact smoke tests (DV2ZT8)"
comments:
  -
    author: "CODER"
    body: "Start: Add deterministic standalone archive smoke script and tests for bundled-runtime CLI artifacts."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #750 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-02T17:08:39.448Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add deterministic standalone archive smoke script and tests for bundled-runtime CLI artifacts."
  -
    type: "verify"
    at: "2026-05-02T17:15:54.797Z"
    author: "CODER"
    state: "ok"
    note: "Passed: agentplane task verify-show 202605021412-DV2ZT8; bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; node scripts/smoke-standalone-cli-artifact.mjs --artifact <synthetic fixture> --expected-version 1.2.3 --allow-synthetic-runtime; bun run release:standalone:check; bunx eslint scripts/smoke-standalone-cli-artifact.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  -
    type: "status"
    at: "2026-05-02T17:19:04.927Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #750 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-02T17:19:04.933Z"
doc_updated_by: "INTEGRATOR"
description: "Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary."
sections:
  Summary: |-
    Add standalone artifact smoke tests
    
    Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.
  Scope: |-
    - In scope: Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.
    - Out of scope: unrelated refactors not required for "Add standalone artifact smoke tests".
  Plan: |-
    Add executable standalone artifact smoke coverage.
    
    Scope:
    - Add a standalone smoke script that can inspect an archive, unpack it, verify embedded runtime layout, and execute the packaged CLI without relying on PATH node.
    - Cover POSIX and Windows wrapper expectations where possible from the host.
    - Add focused tests that generate synthetic standalone assets and run the smoke script against representative tar.gz/zip artifacts.
    - Keep checks deterministic and offline by using synthetic assets from the standalone generator.
    
    Verification:
    - agentplane task verify-show 202605021412-DV2ZT8
    - bun test packages/agentplane/src/commands/release/*standalone*
    - node scripts/smoke-standalone-cli-artifact.mjs --artifact <fixture>
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/release/*standalone*`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node scripts/<standalone-smoke-script>.mjs --artifact <fixture>`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T17:15:54.797Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed: agentplane task verify-show 202605021412-DV2ZT8; bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; node scripts/smoke-standalone-cli-artifact.mjs --artifact <synthetic fixture> --expected-version 1.2.3 --allow-synthetic-runtime; bun run release:standalone:check; bunx eslint scripts/smoke-standalone-cli-artifact.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:08:39.448Z, excerpt_hash=sha256:1d48167c888f26a460510084d8a6951a156d269fc192c300600f03a9de391d00
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add standalone artifact smoke tests

Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.

## Scope

- In scope: Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.
- Out of scope: unrelated refactors not required for "Add standalone artifact smoke tests".

## Plan

Add executable standalone artifact smoke coverage.

Scope:
- Add a standalone smoke script that can inspect an archive, unpack it, verify embedded runtime layout, and execute the packaged CLI without relying on PATH node.
- Cover POSIX and Windows wrapper expectations where possible from the host.
- Add focused tests that generate synthetic standalone assets and run the smoke script against representative tar.gz/zip artifacts.
- Keep checks deterministic and offline by using synthetic assets from the standalone generator.

Verification:
- agentplane task verify-show 202605021412-DV2ZT8
- bun test packages/agentplane/src/commands/release/*standalone*
- node scripts/smoke-standalone-cli-artifact.mjs --artifact <fixture>
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/release/*standalone*`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node scripts/<standalone-smoke-script>.mjs --artifact <fixture>`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T17:15:54.797Z — VERIFY — ok

By: CODER

Note: Passed: agentplane task verify-show 202605021412-DV2ZT8; bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; node scripts/smoke-standalone-cli-artifact.mjs --artifact <synthetic fixture> --expected-version 1.2.3 --allow-synthetic-runtime; bun run release:standalone:check; bunx eslint scripts/smoke-standalone-cli-artifact.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:08:39.448Z, excerpt_hash=sha256:1d48167c888f26a460510084d8a6951a156d269fc192c300600f03a9de391d00

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
