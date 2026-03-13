---
id: "202603130626-GB45FY"
title: "Prepare GitHub Actions for Node 24"
result_summary: "GitHub Actions workflows are now pinned and tested for Node 24."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:27:18.612Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T06:37:19.878Z"
  updated_by: "CODER"
  note: "GitHub Actions workflows now target Node 24 and the runtime pin is regression-tested."
commit:
  hash: "bd988d301c3ff9891932ee5fbaf3f2b6f6fc7d05"
  message: "🚧 GB45FY task: prepare GitHub Actions for Node 24"
comments:
  -
    author: "CODER"
    body: "Verified: GitHub Actions workflows now pin setup-node to Node 24 and the contract is covered by tests plus release/docs smoke checks."
events:
  -
    type: "verify"
    at: "2026-03-13T06:37:19.878Z"
    author: "CODER"
    state: "ok"
    note: "GitHub Actions workflows now target Node 24 and the runtime pin is regression-tested."
  -
    type: "status"
    at: "2026-03-13T06:37:24.452Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: GitHub Actions workflows now pin setup-node to Node 24 and the contract is covered by tests plus release/docs smoke checks."
doc_version: 3
doc_updated_at: "2026-03-13T06:37:24.453Z"
doc_updated_by: "CODER"
description: "Reduce future CI breakage by validating and updating GitHub Actions Node runtime assumptions before the Node 20 hosted transition deadline."
id_source: "generated"
---
## Summary

Prepare GitHub Actions for Node 24

Reduce future CI breakage by validating and updating GitHub Actions Node runtime assumptions before the Node 20 hosted transition deadline.

## Scope

- In scope: Reduce future CI breakage by validating and updating GitHub Actions Node runtime assumptions before the Node 20 hosted transition deadline.
- Out of scope: unrelated refactors not required for "Prepare GitHub Actions for Node 24".

## Plan

1. Audit GitHub Actions workflows for hosted Node runtime assumptions and update them to a Node 24-safe configuration where appropriate.
2. Keep repo tooling/tests green under the new workflow runtime settings and document any intentional exceptions.
3. Run workflow lint plus release-critical checks and record evidence.

## Verify Steps

1. Run `bun run workflows:lint`. Expected: all workflow files remain valid after Node runtime updates.
2. Run `bun run test:release:critical`. Expected: release scripts/contracts still pass under the updated workflow configuration.
3. Inspect `.github/workflows/*.yml`. Expected: Node runtime declarations are aligned on the new supported version or an explicit justified exception remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T06:37:19.878Z — VERIFY — ok

By: CODER

Note: GitHub Actions workflows now target Node 24 and the runtime pin is regression-tested.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T06:27:17.681Z, excerpt_hash=sha256:d51e715207096c49453eb0385b19f03396dd8c68dc92b0346375b9a9c02e2907

Details:

Command: bun x vitest run packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 1 file, 1 test passed; all repository workflows that use actions/setup-node are pinned to Node 24.
Scope: workflow Node runtime contract.

Command: bun run workflows:lint
Result: pass
Evidence: workflow lint and workflow command contract both returned OK.
Scope: GitHub Actions YAML syntax and command wiring.

Command: bun run test:release:critical
Result: pass
Evidence: release recovery, release smoke, and CLI smoke suites all passed after the workflow Node runtime bump.
Scope: release-critical and CLI release paths.

Command: bun run docs:site:typecheck && bun run docs:site:build
Result: pass
Evidence: website typecheck and production build completed successfully; only the existing webpack critical dependency warning remained.
Scope: docs CI and pages deployment build paths touched by workflow changes.

Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts
Result: pass
Evidence: new workflow contract test passes ESLint.
Scope: workflow Node runtime contract test file.

Command: ./node_modules/.bin/prettier --check .github/workflows/ci.yml .github/workflows/docs-ci.yml .github/workflows/pages-deploy.yml .github/workflows/prepublish.yml .github/workflows/publish.yml .github/workflows/workflows-lint.yml packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts
Result: pass
Evidence: all touched workflow files and the new contract test match Prettier.
Scope: formatting of workflow Node runtime changes.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
