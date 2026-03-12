---
id: "202603121201-0ASGE2"
title: "Patch stabilization: derive fast-CI suite registry from topology"
result_summary: "Fast-CI suite registry now derives split run-cli and guard lists from topology instead of hand-maintained arrays."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T12:01:31.196Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved because this removes the weakest remaining hand-maintained selector drift without broadening fast-CI semantics."
verification:
  state: "ok"
  updated_at: "2026-03-12T12:03:35.903Z"
  updated_by: "CODER"
  note: "Verified topology-derived fast-CI suite discovery."
commit:
  hash: "21f379d3fb467152fd4f6779d7fcb3246d9cc347"
  message: "🚧 0ASGE2 task: derive fast-CI suite lists from topology"
comments:
  -
    author: "CODER"
    body: "Start: replace duplicated fast-CI suite lists for split run-cli and guard buckets with topology-derived discovery while keeping the bucket contract stable."
  -
    author: "CODER"
    body: "Verified: fast-CI now derives its drift-prone run-cli and guard suite lists from the current repo topology, so future split-suite changes stay aligned without manually duplicating test-file registries."
events:
  -
    type: "status"
    at: "2026-03-12T12:01:32.628Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace duplicated fast-CI suite lists for split run-cli and guard buckets with topology-derived discovery while keeping the bucket contract stable."
  -
    type: "verify"
    at: "2026-03-12T12:03:35.903Z"
    author: "CODER"
    state: "ok"
    note: "Verified topology-derived fast-CI suite discovery."
  -
    type: "status"
    at: "2026-03-12T12:04:08.895Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: fast-CI now derives its drift-prone run-cli and guard suite lists from the current repo topology, so future split-suite changes stay aligned without manually duplicating test-file registries."
doc_version: 3
doc_updated_at: "2026-03-12T12:04:08.895Z"
doc_updated_by: "CODER"
description: "Replace the most drift-prone hand-maintained fast-CI test-file lists with topology-derived discovery for split run-cli and guard suites, while keeping existing bucket semantics stable."
id_source: "generated"
---
## Summary

Patch stabilization: derive fast-CI suite registry from topology

Replace the most drift-prone hand-maintained fast-CI test-file lists with topology-derived discovery for split run-cli and guard suites, while keeping existing bucket semantics stable.

## Scope

- In scope: Replace the most drift-prone hand-maintained fast-CI test-file lists with topology-derived discovery for split run-cli and guard suites, while keeping existing bucket semantics stable.
- Out of scope: unrelated refactors not required for "Patch stabilization: derive fast-CI suite registry from topology".

## Plan

1. Extract a small filesystem-based helper in local-ci-selection so split run-cli and guard suite lists are derived from current repo topology instead of duplicated arrays.
2. Preserve existing bucket semantics and only automate the drift-prone registry portions.
3. Cover the discovery behavior with selector regressions and rebuild the repo-local packages.

## Verify Steps

- Selector still routes cli-help, cli-core, and guard changed files to the same buckets as before.
- Split suite files are discovered without manual duplication in the registry.
- Focused selector tests and package builds pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T12:03:35.903Z — VERIFY — ok

By: CODER

Note: Verified topology-derived fast-CI suite discovery.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T12:01:32.628Z, excerpt_hash=sha256:a03dbd85031a04aa509d4223a2dbc9293c688f95c4b962f90083fad1f5d773a9

Details:

Checks:
- bun x vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000
- ./node_modules/.bin/eslint scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/local-ci-selection.test.ts
- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
