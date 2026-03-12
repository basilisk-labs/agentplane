---
id: "202603121208-JV141V"
title: "Patch stabilization: split init/upgrade/backend CLI suite and narrow fast-CI residual fallback"
result_summary: "Replaced the mixed init/upgrade/backend CLI regression file with split suites, narrowed backend and upgrade fast-CI routing, and synced package scripts plus testing docs to the new residual-fallback contract."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T12:08:56.859Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T12:22:01.220Z"
  updated_by: "CODER"
  note: "Targeted verification passed: split init, upgrade, backend-sync CLI suites stayed green; local fast-CI selector now routes isolated upgrade/backend suites to focused buckets while keeping init on full-fast; lint, builds, and the updated platform/backend package scripts all passed."
commit:
  hash: "262f50604f60477d8faadf6bdb89129ea0ea1070"
  message: "🚧 JV141V cli: split init upgrade backend suites"
comments:
  -
    author: "CODER"
    body: "Start: splitting the mixed init/upgrade/backend CLI suite so fast-CI can narrow isolated upgrade and backend paths while leaving init on the broad fallback by design."
  -
    author: "CODER"
    body: "Verified: split init, upgrade, and backend-sync CLI suites now carry the old mixed coverage without regressions, and fast-CI narrows only the proven-safe upgrade/backend paths while init remains the explicit broad fallback."
events:
  -
    type: "status"
    at: "2026-03-12T12:08:58.975Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting the mixed init/upgrade/backend CLI suite so fast-CI can narrow isolated upgrade and backend paths while leaving init on the broad fallback by design."
  -
    type: "verify"
    at: "2026-03-12T12:22:01.220Z"
    author: "CODER"
    state: "ok"
    note: "Targeted verification passed: split init, upgrade, backend-sync CLI suites stayed green; local fast-CI selector now routes isolated upgrade/backend suites to focused buckets while keeping init on full-fast; lint, builds, and the updated platform/backend package scripts all passed."
  -
    type: "status"
    at: "2026-03-12T12:22:10.718Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split init, upgrade, and backend-sync CLI suites now carry the old mixed coverage without regressions, and fast-CI narrows only the proven-safe upgrade/backend paths while init remains the explicit broad fallback."
doc_version: 3
doc_updated_at: "2026-03-12T12:22:10.718Z"
doc_updated_by: "CODER"
description: "Split the mixed run-cli init/upgrade/backend integration suite, keep init on broad fallback, route isolated upgrade and backend-sync test paths to focused fast-CI buckets, and sync docs/tests to the new selector contract."
id_source: "generated"
---
## Summary

Patch stabilization: split init/upgrade/backend CLI suite and narrow fast-CI residual fallback

Split the mixed run-cli init/upgrade/backend integration suite, keep init on broad fallback, route isolated upgrade and backend-sync test paths to focused fast-CI buckets, and sync docs/tests to the new selector contract.

## Scope

- In scope: Split the mixed run-cli init/upgrade/backend integration suite, keep init on broad fallback, route isolated upgrade and backend-sync test paths to focused fast-CI buckets, and sync docs/tests to the new selector contract.
- Out of scope: unrelated refactors not required for "Patch stabilization: split init/upgrade/backend CLI suite and narrow fast-CI residual fallback".

## Plan

1. Split run-cli.core.init-upgrade-backend.test.ts into init, upgrade, and backend-sync suites without changing assertions or coverage intent. 2. Route isolated upgrade and backend-sync suite paths to focused fast-CI buckets while leaving init on broad fallback by design. 3. Sync selector tests and testing docs to the new residual-fallback contract, then run targeted vitest, eslint, and package builds.

## Verify Steps

### Scope
- Primary tag: `code`
- Focus: fast-CI selector narrowing remains topology-driven and does not widen execution scope beyond split upgrade/backend suites.

### Checks
1. Run the split CLI integration suites for init, upgrade, and backend-sync. Expected: all migrated assertions stay green after the file split.
2. Run local CI selector regressions. Expected: isolated `run-cli.core.upgrade.test.ts` routes to `targeted(upgrade)`, isolated `run-cli.core.backend-sync.test.ts` routes to `targeted(backend)`, and isolated `run-cli.core.init.test.ts` stays on `full-fast`.
3. Run lint/build on touched selector and CLI files. Expected: no new lint or build regressions.

### Evidence / Commands
- `bun x vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000`
- `./node_modules/.bin/eslint scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`

### Pass criteria
- Mixed suite is replaced by narrower suites without lost coverage.
- Selector routing narrows only the proven-safe upgrade/backend paths.
- Init stays explicitly documented as the remaining broad fallback path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T12:22:01.220Z — VERIFY — ok

By: CODER

Note: Targeted verification passed: split init, upgrade, backend-sync CLI suites stayed green; local fast-CI selector now routes isolated upgrade/backend suites to focused buckets while keeping init on full-fast; lint, builds, and the updated platform/backend package scripts all passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T12:08:58.975Z, excerpt_hash=sha256:3179d918ddb345e3bb526a4a57e2615cf3b4230095e3838bb77051ef8f42da72

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
