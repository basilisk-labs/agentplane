---
id: "202603130626-MZV4NG"
title: "Add Core CI release-ready contract test"
result_summary: "Core CI release-ready job contract is now protected by tests."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:27:18.118Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T06:31:39.544Z"
  updated_by: "CODER"
  note: "Core CI release-ready workflow contract is now regression-tested."
commit:
  hash: "1a2a2d20cee24776f072ea6a47c22396f4a2e56b"
  message: "🚧 MZV4NG task: add Core CI release-ready contract test"
comments:
  -
    author: "CODER"
    body: "Start: add a contract test for the Core CI release-ready job so future workflow edits cannot silently break publish readiness."
  -
    author: "CODER"
    body: "Verified: the Core CI release-ready manifest job now has an explicit workflow contract test guarding dependencies, readiness gating, and artifact upload."
events:
  -
    type: "status"
    at: "2026-03-13T06:30:37.461Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a contract test for the Core CI release-ready job so future workflow edits cannot silently break publish readiness."
  -
    type: "verify"
    at: "2026-03-13T06:31:39.544Z"
    author: "CODER"
    state: "ok"
    note: "Core CI release-ready workflow contract is now regression-tested."
  -
    type: "status"
    at: "2026-03-13T06:31:49.155Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the Core CI release-ready manifest job now has an explicit workflow contract test guarding dependencies, readiness gating, and artifact upload."
doc_version: 3
doc_updated_at: "2026-03-13T06:31:49.156Z"
doc_updated_by: "CODER"
description: "Protect ci.yml release-ready job shape with a workflow contract test so future edits cannot silently break artifact publishing."
id_source: "generated"
---
## Summary

Add Core CI release-ready contract test

Protect ci.yml release-ready job shape with a workflow contract test so future edits cannot silently break artifact publishing.

## Scope

- In scope: Protect ci.yml release-ready job shape with a workflow contract test so future edits cannot silently break artifact publishing.
- Out of scope: unrelated refactors not required for "Add Core CI release-ready contract test".

## Plan

1. Add a dedicated contract test for `.github/workflows/ci.yml` covering the `release-ready` job shape, dependencies, and artifact upload conditions.
2. Keep the assertions narrow enough to detect contract drift without coupling to unrelated CI job details.
3. Run the new contract test plus workflow lint/build checks and record evidence.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: `Core CI` keeps the release-ready job contract intact.
2. Run `bun run workflows:lint`. Expected: `.github/workflows/ci.yml` remains valid after adding the coverage test target.
3. Inspect the new test file and `.github/workflows/ci.yml`. Expected: the test asserts `release-ready` dependencies, artifact name, and readiness gating.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T06:31:39.544Z — VERIFY — ok

By: CODER

Note: Core CI release-ready workflow contract is now regression-tested.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T06:30:37.462Z, excerpt_hash=sha256:07f1ff62405548e7c7f17cccc7da7d91511ff18d9f5afdcaebc3141a3adbc389

Details:

Command: bun x vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 1 file, 1 test passed; the Core CI release-ready job contract is covered.
Scope: release-ready job wiring in .github/workflows/ci.yml.

Command: bun run workflows:lint
Result: pass
Evidence: workflow lint and workflow command contract both returned OK.
Scope: GitHub Actions workflow syntax and command wiring.

Command: ./node_modules/.bin/prettier --check packages/agentplane/src/commands/release/ci-workflow-contract.test.ts
Result: pass
Evidence: the new workflow contract test file matches Prettier style.
Scope: formatting of the new release workflow contract test.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
