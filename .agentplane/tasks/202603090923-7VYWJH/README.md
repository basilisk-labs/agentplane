---
id: "202603090923-7VYWJH"
title: "Decompose patch-critical integration test contour"
result_summary: "Patch-critical test orchestration now uses canonical sub-suites and a backend-focused fast bucket, reducing broad fallback for backend-only changes without losing backend/runtime coverage."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T09:56:11.035Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T10:06:17.539Z"
  updated_by: "CODER"
  note: "Passed bun run test:critical, bun run test:platform-critical, AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/backends/task-backend/redmine-backend.ts node scripts/run-local-ci.mjs --mode fast, bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000, bun run docs:site:check, and node .agentplane/policy/check-routing.mjs after splitting critical/platform-critical suites and adding targeted(backend) with forks-based execution."
commit:
  hash: "e047e7e8685fdad29cbe6669598acbe74c783afd"
  message: "✨ 7VYWJH code: decompose patch-critical test contours"
comments:
  -
    author: "CODER"
    body: "Start: decompose the patch-critical test contour into canonical named suites and a backend-targeted fast bucket so backend-only changes stop falling into broad full-fast coverage."
  -
    author: "CODER"
    body: "Verified: split critical and platform-critical suites into canonical named scripts, added a backend-targeted fast bucket with forks-based execution for process.chdir()-using CLI tests, and confirmed selector/docs/policy checks all pass."
events:
  -
    type: "status"
    at: "2026-03-09T09:56:16.002Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose the patch-critical test contour into canonical named suites and a backend-targeted fast bucket so backend-only changes stop falling into broad full-fast coverage."
  -
    type: "verify"
    at: "2026-03-09T10:06:17.539Z"
    author: "CODER"
    state: "ok"
    note: "Passed bun run test:critical, bun run test:platform-critical, AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/backends/task-backend/redmine-backend.ts node scripts/run-local-ci.mjs --mode fast, bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000, bun run docs:site:check, and node .agentplane/policy/check-routing.mjs after splitting critical/platform-critical suites and adding targeted(backend) with forks-based execution."
  -
    type: "status"
    at: "2026-03-09T10:06:27.660Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split critical and platform-critical suites into canonical named scripts, added a backend-targeted fast bucket with forks-based execution for process.chdir()-using CLI tests, and confirmed selector/docs/policy checks all pass."
doc_version: 3
doc_updated_at: "2026-03-09T10:06:27.660Z"
doc_updated_by: "CODER"
description: "Split the broad patch-critical suites into narrower buckets so pre-push and release gates stay deterministic and cheaper without losing coverage of runtime, task, release, and backend regressions."
id_source: "generated"
---
## Summary

Decompose patch-critical integration test contour

Split the broad patch-critical suites into narrower buckets so pre-push and release gates stay deterministic and cheaper without losing coverage of runtime, task, release, and backend regressions.

## Scope

- In scope: split broad patch-critical test runners into canonical scripts and add a backend-focused targeted fast bucket so backend-only changes no longer fall into full-fast by default.
- Out of scope: unrelated runtime or backend behavior changes beyond test orchestration and CI selection.

## Plan

1. Split the current critical/platform-critical test contours into named sub-suites and make local/full CI call those canonical scripts instead of inline runner commands.
2. Add a targeted backend fast bucket that maps backend-only source changes to backend-critical regression tests instead of broad full-fast fallback.
3. Update selector tests and developer docs so the new contours are explicit, verified, and kept in sync.

## Verify Steps

1. Run bun run test:critical and bun run test:platform-critical. Expected: both pass through canonical named sub-suites without inline runner drift.
2. Run AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/backends/task-backend/redmine-backend.ts node scripts/run-local-ci.mjs --mode fast. Expected: the selector chooses targeted(backend) instead of full-fast fallback and the targeted checks pass.
3. Run bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000 plus bun run docs:site:check and node .agentplane/policy/check-routing.mjs. Expected: selector coverage, docs, and policy routing all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T10:06:17.539Z — VERIFY — ok

By: CODER

Note: Passed bun run test:critical, bun run test:platform-critical, AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/backends/task-backend/redmine-backend.ts node scripts/run-local-ci.mjs --mode fast, bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000, bun run docs:site:check, and node .agentplane/policy/check-routing.mjs after splitting critical/platform-critical suites and adding targeted(backend) with forks-based execution.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T09:56:16.002Z, excerpt_hash=sha256:7f9bbb4613ee164e03573fbe62dad7580afed5a26618d22c9bbf23f30be6f80e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
