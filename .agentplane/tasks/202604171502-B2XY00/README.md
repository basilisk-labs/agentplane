---
id: "202604171502-B2XY00"
title: "Unify manifest writer scripts behind scripts/manifest.mjs"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "scripts"
verify:
  - "bun run lint:core"
  - "bunx vitest run packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/cli/runtime-watch.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T15:22:00.363Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T15:25:47.625Z"
  updated_by: "CODER"
  note: "Verified: manifest generation now runs through scripts/manifest.mjs and the declared lint plus release-manifest tests pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: unifying build, publish-result, and release-ready manifest writer scripts behind one manifest subcommand entrypoint while preserving existing release contracts and tests."
events:
  -
    type: "status"
    at: "2026-04-17T15:22:20.766Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unifying build, publish-result, and release-ready manifest writer scripts behind one manifest subcommand entrypoint while preserving existing release contracts and tests."
  -
    type: "verify"
    at: "2026-04-17T15:25:47.625Z"
    author: "CODER"
    state: "ok"
    note: "Verified: manifest generation now runs through scripts/manifest.mjs and the declared lint plus release-manifest tests pass."
doc_version: 3
doc_updated_at: "2026-04-17T15:25:47.628Z"
doc_updated_by: "CODER"
description: "Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts."
sections:
  Summary: |-
    Unify manifest writer scripts behind scripts/manifest.mjs
    
    Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.
  Scope: |-
    - In scope: Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.
    - Out of scope: unrelated refactors not required for "Unify manifest writer scripts behind scripts/manifest.mjs".
  Plan: |-
    1. Define one subcommand contract for build, publish-result, and release-ready manifest writing.
    2. Move shared manifest plumbing into scripts/manifest.mjs and keep backward compatibility for existing callers or update them coherently in the same task.
    3. Re-run manifest-related tests plus lint to confirm release contracts remain intact.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/cli/runtime-watch.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T15:25:47.625Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: manifest generation now runs through scripts/manifest.mjs and the declared lint plus release-manifest tests pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:22:20.772Z, excerpt_hash=sha256:16e942135964d12a47ecf9f836b7900ad3cdc961fe368171b42b0b6aa5dd6c0d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: bun run lint:core and the focused vitest suite for release-ready, publish-result, and runtime-watch all passed after switching callers to scripts/manifest.mjs subcommands.
      Impact: Release manifest writing now has one canonical implementation path instead of three drifting scripts, which reduces maintenance spread across package builds and workflow entrypoints.
      Resolution: Added scripts/manifest.mjs with build/publish-result/release-ready subcommands, updated package builds, workflows, e2e flow, and tests, and removed the legacy standalone scripts.
id_source: "generated"
---
## Summary

Unify manifest writer scripts behind scripts/manifest.mjs

Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.

## Scope

- In scope: Replace the standalone write-build-manifest, write-publish-result-manifest, and write-release-ready-manifest scripts with one subcommand-driven manifest CLI while preserving existing release contracts.
- Out of scope: unrelated refactors not required for "Unify manifest writer scripts behind scripts/manifest.mjs".

## Plan

1. Define one subcommand contract for build, publish-result, and release-ready manifest writing.
2. Move shared manifest plumbing into scripts/manifest.mjs and keep backward compatibility for existing callers or update them coherently in the same task.
3. Re-run manifest-related tests plus lint to confirm release contracts remain intact.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/cli/runtime-watch.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T15:25:47.625Z — VERIFY — ok

By: CODER

Note: Verified: manifest generation now runs through scripts/manifest.mjs and the declared lint plus release-manifest tests pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:22:20.772Z, excerpt_hash=sha256:16e942135964d12a47ecf9f836b7900ad3cdc961fe368171b42b0b6aa5dd6c0d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: bun run lint:core and the focused vitest suite for release-ready, publish-result, and runtime-watch all passed after switching callers to scripts/manifest.mjs subcommands.
  Impact: Release manifest writing now has one canonical implementation path instead of three drifting scripts, which reduces maintenance spread across package builds and workflow entrypoints.
  Resolution: Added scripts/manifest.mjs with build/publish-result/release-ready subcommands, updated package builds, workflows, e2e flow, and tests, and removed the legacy standalone scripts.
