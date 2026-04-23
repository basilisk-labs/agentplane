---
id: "202604231624-DNT18Z"
title: "Decompose release apply preflight hotspot"
result_summary: "Release apply preflight hotspot decomposed"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T16:24:11.499Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T16:28:03.589Z"
  updated_by: "CODER"
  note: "Refactored release apply preflight into dedicated plan/package/git/publish helper modules while keeping apply.preflight.ts as the stable export surface. Validation: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun x prettier packages/agentplane/src/commands/release/apply.preflight.ts packages/agentplane/src/commands/release/apply.preflight.plan.ts packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.git.ts packages/agentplane/src/commands/release/apply.preflight.publish.ts --check; node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; bun run framework:dev:bootstrap; agentplane doctor."
commit:
  hash: "864bdcb734d5ff95908a40903b7ce6b38c039ac2"
  message: "♻️ DNT18Z release: split apply preflight helpers"
comments:
  -
    author: "CODER"
    body: "Start: decompose release apply preflight into smaller helper modules for plan loading, git checks, and publish gate execution while preserving release behavior and diagnostics."
  -
    author: "CODER"
    body: "Verified: release apply preflight is now decomposed into focused helper modules, the export entrypoint stayed stable, release-targeted tests passed, and the runtime hotspot list no longer includes commands/release/apply.preflight.ts."
events:
  -
    type: "status"
    at: "2026-04-23T16:24:12.189Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose release apply preflight into smaller helper modules for plan loading, git checks, and publish gate execution while preserving release behavior and diagnostics."
  -
    type: "verify"
    at: "2026-04-23T16:28:03.589Z"
    author: "CODER"
    state: "ok"
    note: "Refactored release apply preflight into dedicated plan/package/git/publish helper modules while keeping apply.preflight.ts as the stable export surface. Validation: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun x prettier packages/agentplane/src/commands/release/apply.preflight.ts packages/agentplane/src/commands/release/apply.preflight.plan.ts packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.git.ts packages/agentplane/src/commands/release/apply.preflight.publish.ts --check; node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; bun run framework:dev:bootstrap; agentplane doctor."
  -
    type: "status"
    at: "2026-04-23T16:28:30.271Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release apply preflight is now decomposed into focused helper modules, the export entrypoint stayed stable, release-targeted tests passed, and the runtime hotspot list no longer includes commands/release/apply.preflight.ts."
doc_version: 3
doc_updated_at: "2026-04-23T16:28:30.272Z"
doc_updated_by: "CODER"
description: "Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites."
sections:
  Summary: |-
    Decompose release apply preflight hotspot
    
    Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.
  Scope: |-
    - In scope: Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.
    - Out of scope: unrelated refactors not required for "Decompose release apply preflight hotspot".
  Plan: "Split packages/agentplane/src/commands/release/apply.preflight.ts into helper modules for plan/json loading, git/publish preconditions, and prepublish gate execution. Keep exported surface stable via the existing apply.preflight entrypoint, preserve diagnostics/messages, and verify with targeted release apply tests, typecheck, hotspot check, bootstrap, and doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T16:28:03.589Z — VERIFY — ok
    
    By: CODER
    
    Note: Refactored release apply preflight into dedicated plan/package/git/publish helper modules while keeping apply.preflight.ts as the stable export surface. Validation: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun x prettier packages/agentplane/src/commands/release/apply.preflight.ts packages/agentplane/src/commands/release/apply.preflight.plan.ts packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.git.ts packages/agentplane/src/commands/release/apply.preflight.publish.ts --check; node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; bun run framework:dev:bootstrap; agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T16:24:12.201Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decompose release apply preflight hotspot

Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.

## Scope

- In scope: Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.
- Out of scope: unrelated refactors not required for "Decompose release apply preflight hotspot".

## Plan

Split packages/agentplane/src/commands/release/apply.preflight.ts into helper modules for plan/json loading, git/publish preconditions, and prepublish gate execution. Keep exported surface stable via the existing apply.preflight entrypoint, preserve diagnostics/messages, and verify with targeted release apply tests, typecheck, hotspot check, bootstrap, and doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T16:28:03.589Z — VERIFY — ok

By: CODER

Note: Refactored release apply preflight into dedicated plan/package/git/publish helper modules while keeping apply.preflight.ts as the stable export surface. Validation: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun x prettier packages/agentplane/src/commands/release/apply.preflight.ts packages/agentplane/src/commands/release/apply.preflight.plan.ts packages/agentplane/src/commands/release/apply.preflight.package.ts packages/agentplane/src/commands/release/apply.preflight.git.ts packages/agentplane/src/commands/release/apply.preflight.publish.ts --check; node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; bun run framework:dev:bootstrap; agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T16:24:12.201Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
