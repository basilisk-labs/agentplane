---
id: "202603130642-773QEH"
title: "Add local release E2E harness"
result_summary: "Local release E2E harness added for exact-SHA GitHub artifact validation."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:43:02.561Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T06:49:00.955Z"
  updated_by: "CODER"
  note: "Local release E2E harness now validates exact-SHA readiness against the canonical GitHub artifact."
commit:
  hash: "ad252cfc89a468091a4f4205fe9249471f8a6169"
  message: "🚧 773QEH task: add local release E2E harness"
comments:
  -
    author: "CODER"
    body: "Start: add a local release E2E harness that checks the exact release SHA against GitHub release-ready metadata and validates the downloaded artifact."
  -
    author: "CODER"
    body: "Verified: a local release E2E harness now checks the exact checkout SHA, runs the local release gate, resolves the canonical Core CI artifact, downloads it, and validates manifest parity."
events:
  -
    type: "status"
    at: "2026-03-13T06:43:02.988Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a local release E2E harness that checks the exact release SHA against GitHub release-ready metadata and validates the downloaded artifact."
  -
    type: "verify"
    at: "2026-03-13T06:49:00.955Z"
    author: "CODER"
    state: "ok"
    note: "Local release E2E harness now validates exact-SHA readiness against the canonical GitHub artifact."
  -
    type: "status"
    at: "2026-03-13T06:49:05.539Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: a local release E2E harness now checks the exact checkout SHA, runs the local release gate, resolves the canonical Core CI artifact, downloads it, and validates manifest parity."
doc_version: 3
doc_updated_at: "2026-03-13T06:49:05.540Z"
doc_updated_by: "CODER"
description: "Provide a local release:e2e:local script that validates exact-SHA release readiness against real GitHub Core CI metadata and downloads the canonical release-ready artifact for comparison."
id_source: "generated"
---
## Summary

Add local release E2E harness

Provide a local release:e2e:local script that validates exact-SHA release readiness against real GitHub Core CI metadata and downloads the canonical release-ready artifact for comparison.

## Scope

- In scope: Provide a local release:e2e:local script that validates exact-SHA release readiness against real GitHub Core CI metadata and downloads the canonical release-ready artifact for comparison.
- Out of scope: unrelated refactors not required for "Add local release E2E harness".

## Plan

1. Add a local `release:e2e:local` harness script that assumes the current checkout already points at the target release SHA, runs local release gates, resolves the canonical `release-ready` GitHub source, downloads the artifact, and validates manifest parity.
2. Make the harness fail explicitly when `gh`, `GITHUB_TOKEN`, or the exact checkout SHA contract is missing instead of silently degrading.
3. Cover the harness with targeted script tests and document the local usage contract in the release docs.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/local-release-e2e-script.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the local release E2E harness covers success and key contract failures.
2. Run `bun run workflows:lint && bun run test:release:critical`. Expected: release workflows and release-critical smoke/recovery paths stay green after adding the local harness.
3. Run `./node_modules/.bin/eslint scripts/run-local-release-e2e.mjs packages/agentplane/src/commands/release/local-release-e2e-script.test.ts && ./node_modules/.bin/prettier --check scripts/run-local-release-e2e.mjs packages/agentplane/src/commands/release/local-release-e2e-script.test.ts docs/developer/release-and-publishing.mdx package.json`. Expected: the new script, tests, docs, and package scripts satisfy lint/formatting.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T06:49:00.955Z — VERIFY — ok

By: CODER

Note: Local release E2E harness now validates exact-SHA readiness against the canonical GitHub artifact.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T06:43:02.988Z, excerpt_hash=sha256:402df0fee7f68463a9ba7b5f6efbb9e91336829152a145a79360da3425fa3a71

Details:

Command: bun x vitest run packages/agentplane/src/commands/release/local-release-e2e-script.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 1 file, 4 tests passed; the harness covers success, missing auth, checkout mismatch, and downloaded manifest mismatch.
Scope: local release E2E harness script contract.

Command: bun run workflows:lint && bun run test:release:critical
Result: pass
Evidence: workflow lint plus release recovery, release smoke, and CLI smoke suites all passed after adding the harness.
Scope: release workflow syntax and release-critical smoke/recovery paths.

Command: ./node_modules/.bin/eslint scripts/run-local-release-e2e.mjs packages/agentplane/src/commands/release/local-release-e2e-script.test.ts
Result: pass
Evidence: new harness script and regression test pass ESLint.
Scope: runtime and test quality for the local release E2E harness.

Command: ./node_modules/.bin/prettier --check scripts/run-local-release-e2e.mjs packages/agentplane/src/commands/release/local-release-e2e-script.test.ts docs/developer/release-and-publishing.mdx package.json
Result: pass
Evidence: harness script, test, docs, and package script entries match Prettier.
Scope: formatting of the local release E2E harness package.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
