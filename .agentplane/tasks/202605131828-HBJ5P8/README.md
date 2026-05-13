---
id: "202605131828-HBJ5P8"
title: "Make test routing faster and more flexible"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "tests"
verify:
  - "AGENTPLANE_FAST_CHANGED_FILES=$'packages/agentplane/src/commands/task/shared.ts\\npackages/agentplane/src/commands/pr/input-validation.ts' node scripts/checks/run-local-ci.mjs --mode smoke"
  - "bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts"
  - "node scripts/checks/check-vitest-projects.mjs"
  - "node scripts/checks/run-vitest-suite.mjs critical --report-json .agentplane/tmp/critical-timing.json"
  - "node scripts/checks/run-vitest-suite.mjs precommit --report-json .agentplane/tmp/precommit-timing.json"
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T18:29:19.620Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved test-contour changes in the dedicated branch_pr worktree. Scope is limited to test routing, local CI selection, runner timing/report ergonomics, package script wiring, and focused tests/docs generated updates needed by those changes."
  -
    author: "CODER"
    body: "Start: Implement approved faster and more flexible test routing in the existing task worktree, preserving branch_pr isolation and verifying selector, suite registry, smoke mode, and timing report behavior."
events:
  -
    type: "status"
    at: "2026-05-13T18:29:54.092Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved test-contour changes in the dedicated branch_pr worktree. Scope is limited to test routing, local CI selection, runner timing/report ergonomics, package script wiring, and focused tests/docs generated updates needed by those changes."
  -
    type: "status"
    at: "2026-05-13T18:48:44.016Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: Implement approved faster and more flexible test routing in the existing task worktree, preserving branch_pr isolation and verifying selector, suite registry, smoke mode, and timing report behavior."
doc_version: 3
doc_updated_at: "2026-05-13T18:59:07.188Z"
doc_updated_by: "CODER"
description: "Improve AgentPlane test selection and runner ergonomics: support combined impacted buckets, add a smoke local CI mode, route critical CLI tests through the chunked suite runner, and capture timing evidence for slow tests."
sections:
  Summary: |-
    Make test routing faster and more flexible
    
    Improve AgentPlane test selection and runner ergonomics: support combined impacted buckets, add a smoke local CI mode, route critical CLI tests through the chunked suite runner, and capture timing evidence for slow tests.
  Scope: |-
    - In scope: Improve AgentPlane test selection and runner ergonomics: support combined impacted buckets, add a smoke local CI mode, route critical CLI tests through the chunked suite runner, and capture timing evidence for slow tests.
    - Out of scope: unrelated refactors not required for "Make test routing faster and more flexible".
  Plan: |-
    1. Extend test-route-registry so critical CLI tests are available as a chunkable named suite without duplicating workspace logic.
    2. Replace local CI single-bucket selection with a combined impacted plan for mixed changes while preserving full-fast fallback for broad or unclassified risk.
    3. Add a smoke local CI mode for targeted developer loops that skips build/cold/docs-heavy gates unless the changed-file plan requires them.
    4. Add JSON timing/report output to run-vitest-suite and keep unsupported Vitest arg behavior explicit.
    5. Update package scripts and focused tests/docs generated surfaces as needed.
    6. Verify with local-ci selector tests, vitest routing checks, precommit/critical suite runner smoke, and a mixed-change smoke-mode command.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds and confirms selector, smoke-mode, script, and critical-suite contracts.
    2. Run `node scripts/checks/check-vitest-projects.mjs`. Expected: it succeeds and confirms workspace/project routing remains valid.
    3. Run `AGENTPLANE_FAST_CHANGED_FILES=$'packages/agentplane/src/commands/task/shared.ts
    packages/agentplane/src/commands/doctor.run.ts' node scripts/checks/run-local-ci.mjs --mode smoke`. Expected: it selects a mixed targeted plan and passes targeted lint/tests without full-fast fallback.
    4. Run `node scripts/checks/run-vitest-suite.mjs precommit --report-json .agentplane/tmp/precommit-timing.json`. Expected: it succeeds and writes a JSON timing report.
    5. Run `node scripts/checks/run-vitest-suite.mjs critical-cli --report-json .agentplane/tmp/critical-timing.json`. Expected: it succeeds chunk-by-chunk and writes per-file timing evidence.
    6. Run `bunx eslint scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/checks/run-local-ci.mjs scripts/checks/run-vitest-suite.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds for changed JS/TS files.
    7. Run `bun run docs:scripts:check`, `git diff --check`, and `node .agentplane/policy/check-routing.mjs`. Expected: generated scripts docs, whitespace, and policy routing are clean.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make test routing faster and more flexible

Improve AgentPlane test selection and runner ergonomics: support combined impacted buckets, add a smoke local CI mode, route critical CLI tests through the chunked suite runner, and capture timing evidence for slow tests.

## Scope

- In scope: Improve AgentPlane test selection and runner ergonomics: support combined impacted buckets, add a smoke local CI mode, route critical CLI tests through the chunked suite runner, and capture timing evidence for slow tests.
- Out of scope: unrelated refactors not required for "Make test routing faster and more flexible".

## Plan

1. Extend test-route-registry so critical CLI tests are available as a chunkable named suite without duplicating workspace logic.
2. Replace local CI single-bucket selection with a combined impacted plan for mixed changes while preserving full-fast fallback for broad or unclassified risk.
3. Add a smoke local CI mode for targeted developer loops that skips build/cold/docs-heavy gates unless the changed-file plan requires them.
4. Add JSON timing/report output to run-vitest-suite and keep unsupported Vitest arg behavior explicit.
5. Update package scripts and focused tests/docs generated surfaces as needed.
6. Verify with local-ci selector tests, vitest routing checks, precommit/critical suite runner smoke, and a mixed-change smoke-mode command.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds and confirms selector, smoke-mode, script, and critical-suite contracts.
2. Run `node scripts/checks/check-vitest-projects.mjs`. Expected: it succeeds and confirms workspace/project routing remains valid.
3. Run `AGENTPLANE_FAST_CHANGED_FILES=$'packages/agentplane/src/commands/task/shared.ts
packages/agentplane/src/commands/doctor.run.ts' node scripts/checks/run-local-ci.mjs --mode smoke`. Expected: it selects a mixed targeted plan and passes targeted lint/tests without full-fast fallback.
4. Run `node scripts/checks/run-vitest-suite.mjs precommit --report-json .agentplane/tmp/precommit-timing.json`. Expected: it succeeds and writes a JSON timing report.
5. Run `node scripts/checks/run-vitest-suite.mjs critical-cli --report-json .agentplane/tmp/critical-timing.json`. Expected: it succeeds chunk-by-chunk and writes per-file timing evidence.
6. Run `bunx eslint scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/checks/run-local-ci.mjs scripts/checks/run-vitest-suite.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds for changed JS/TS files.
7. Run `bun run docs:scripts:check`, `git diff --check`, and `node .agentplane/policy/check-routing.mjs`. Expected: generated scripts docs, whitespace, and policy routing are clean.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
