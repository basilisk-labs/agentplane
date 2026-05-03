---
id: "202605031118-HDYRF2"
title: "Add Bun binary smoke coverage"
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
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T11:19:15.251Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T11:57:47.444Z"
  updated_by: "CODER"
  note: "Focused verification passed: bun run build; node scripts/smoke-bun-compiled-cli.mjs --json compiled the CLI and checked --version, quickstart, and role CODER; bun test packages/agentplane/src/commands/release/bun-compiled-cli-smoke-script.test.ts passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add reusable Bun compiled binary smoke coverage for startup and embedded asset reads."
events:
  -
    type: "status"
    at: "2026-05-03T11:56:18.503Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add reusable Bun compiled binary smoke coverage for startup and embedded asset reads."
  -
    type: "verify"
    at: "2026-05-03T11:57:47.444Z"
    author: "CODER"
    state: "ok"
    note: "Focused verification passed: bun run build; node scripts/smoke-bun-compiled-cli.mjs --json compiled the CLI and checked --version, quickstart, and role CODER; bun test packages/agentplane/src/commands/release/bun-compiled-cli-smoke-script.test.ts passed."
doc_version: 3
doc_updated_at: "2026-05-03T11:57:47.446Z"
doc_updated_by: "CODER"
description: "Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime."
sections:
  Summary: |-
    Add Bun binary smoke coverage
    
    Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.
  Scope: |-
    - In scope: Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.
    - Out of scope: unrelated refactors not required for "Add Bun binary smoke coverage".
  Plan: |-
    Plan:
    1. Add binary-specific smoke coverage separate from bundled-Node standalone smoke.
    2. Build a Bun executable in test/check mode.
    3. Verify --version, quickstart, init --yes, and doctor in a temp repo with Node/Bun removed from PATH where feasible.
    Acceptance: binary smoke fails on package-root/assets regressions and passes for the supported host target.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T11:57:47.444Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verification passed: bun run build; node scripts/smoke-bun-compiled-cli.mjs --json compiled the CLI and checked --version, quickstart, and role CODER; bun test packages/agentplane/src/commands/release/bun-compiled-cli-smoke-script.test.ts passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:56:18.503Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add Bun binary smoke coverage

Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.

## Scope

- In scope: Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.
- Out of scope: unrelated refactors not required for "Add Bun binary smoke coverage".

## Plan

Plan:
1. Add binary-specific smoke coverage separate from bundled-Node standalone smoke.
2. Build a Bun executable in test/check mode.
3. Verify --version, quickstart, init --yes, and doctor in a temp repo with Node/Bun removed from PATH where feasible.
Acceptance: binary smoke fails on package-root/assets regressions and passes for the supported host target.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T11:57:47.444Z — VERIFY — ok

By: CODER

Note: Focused verification passed: bun run build; node scripts/smoke-bun-compiled-cli.mjs --json compiled the CLI and checked --version, quickstart, and role CODER; bun test packages/agentplane/src/commands/release/bun-compiled-cli-smoke-script.test.ts passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:56:18.503Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
