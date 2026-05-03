---
id: "202605031118-RF08MQ"
title: "Define Bun binary runtime contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "bun"
  - "code"
  - "distribution"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T11:19:14.282Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T11:21:34.995Z"
  updated_by: "CODER"
  note: "Focused verification passed: bun test packages/agentplane/src/shared/package-paths.test.ts (2 tests); bun run build; bun build packages/agentplane/dist/cli.js --compile with __AGENTPLANE_PACKAGE_VERSION__; compiled binary returned 0.4.2 for --version and rendered quickstart without package-root failure."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement a Bun binary runtime contract so the compiled CLI can start without resolving the npm package root from disk."
events:
  -
    type: "status"
    at: "2026-05-03T11:19:33.242Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement a Bun binary runtime contract so the compiled CLI can start without resolving the npm package root from disk."
  -
    type: "verify"
    at: "2026-05-03T11:21:34.995Z"
    author: "CODER"
    state: "ok"
    note: "Focused verification passed: bun test packages/agentplane/src/shared/package-paths.test.ts (2 tests); bun run build; bun build packages/agentplane/dist/cli.js --compile with __AGENTPLANE_PACKAGE_VERSION__; compiled binary returned 0.4.2 for --version and rendered quickstart without package-root failure."
doc_version: 3
doc_updated_at: "2026-05-03T11:21:34.999Z"
doc_updated_by: "CODER"
description: "Make the CLI able to start as a Bun compiled executable by introducing an explicit binary runtime contract for package metadata, package-root-independent execution, and asset/runtime path behavior."
sections:
  Summary: |-
    Define Bun binary runtime contract
    
    Make the CLI able to start as a Bun compiled executable by introducing an explicit binary runtime contract for package metadata, package-root-independent execution, and asset/runtime path behavior.
  Scope: |-
    - In scope: Make the CLI able to start as a Bun compiled executable by introducing an explicit binary runtime contract for package metadata, package-root-independent execution, and asset/runtime path behavior.
    - Out of scope: unrelated refactors not required for "Define Bun binary runtime contract".
  Plan: |-
    Plan:
    1. Introduce an explicit Bun binary runtime mode that does not require resolving agentplane/package.json from a filesystem package root.
    2. Embed or define static package metadata needed for startup and --version.
    3. Preserve existing npm and standalone Node behavior.
    4. Verify by compiling packages/agentplane/dist/cli.js with bun --compile and running --version/quickstart far enough to prove startup no longer fails on package-root resolution.
    Acceptance: compiled Bun executable starts without package-root failure while npm package path behavior remains covered.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T11:21:34.995Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verification passed: bun test packages/agentplane/src/shared/package-paths.test.ts (2 tests); bun run build; bun build packages/agentplane/dist/cli.js --compile with __AGENTPLANE_PACKAGE_VERSION__; compiled binary returned 0.4.2 for --version and rendered quickstart without package-root failure.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:19:33.242Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Define Bun binary runtime contract

Make the CLI able to start as a Bun compiled executable by introducing an explicit binary runtime contract for package metadata, package-root-independent execution, and asset/runtime path behavior.

## Scope

- In scope: Make the CLI able to start as a Bun compiled executable by introducing an explicit binary runtime contract for package metadata, package-root-independent execution, and asset/runtime path behavior.
- Out of scope: unrelated refactors not required for "Define Bun binary runtime contract".

## Plan

Plan:
1. Introduce an explicit Bun binary runtime mode that does not require resolving agentplane/package.json from a filesystem package root.
2. Embed or define static package metadata needed for startup and --version.
3. Preserve existing npm and standalone Node behavior.
4. Verify by compiling packages/agentplane/dist/cli.js with bun --compile and running --version/quickstart far enough to prove startup no longer fails on package-root resolution.
Acceptance: compiled Bun executable starts without package-root failure while npm package path behavior remains covered.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T11:21:34.995Z — VERIFY — ok

By: CODER

Note: Focused verification passed: bun test packages/agentplane/src/shared/package-paths.test.ts (2 tests); bun run build; bun build packages/agentplane/dist/cli.js --compile with __AGENTPLANE_PACKAGE_VERSION__; compiled binary returned 0.4.2 for --version and rendered quickstart without package-root failure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:19:33.242Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
