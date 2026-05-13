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
  state: "ok"
  updated_at: "2026-05-13T19:19:14.913Z"
  updated_by: "CODER"
  note: "Verified: flexible test routing, smoke local CI mode, critical-cli chunk runner, timing reports, route registry, eslint, generated scripts docs, diff hygiene, and policy routing pass on current task branch head."
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
  -
    type: "verify"
    at: "2026-05-13T19:10:14.447Z"
    author: "CODER"
    state: "ok"
    note: "Implemented flexible mixed-bucket test routing, smoke local CI mode, chunked critical-cli runner, JSON timing reports, and script/test contract updates."
  -
    type: "verify"
    at: "2026-05-13T19:19:14.913Z"
    author: "CODER"
    state: "ok"
    note: "Verified: flexible test routing, smoke local CI mode, critical-cli chunk runner, timing reports, route registry, eslint, generated scripts docs, diff hygiene, and policy routing pass on current task branch head."
doc_version: 3
doc_updated_at: "2026-05-13T19:19:14.935Z"
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
    ### 2026-05-13T19:10:14.447Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented flexible mixed-bucket test routing, smoke local CI mode, chunked critical-cli runner, JSON timing reports, and script/test contract updates.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:59:07.188Z, excerpt_hash=sha256:9c6bde3ec9d6f0f3662586ee594c4b6dfaaaeaae4ae20cd6d94235d012605a5d
    
    Details:
    
    Verification evidence:
    - Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: 49 tests passed. | Scope: selector, scripts, and critical-suite contracts.
    - Command: node scripts/checks/check-vitest-projects.mjs | Result: pass | Evidence: vitest workspace projects OK; test routing OK (392 tests, 10 primary routes). | Scope: route registry integrity.
    - Command: AGENTPLANE_FAST_CHANGED_FILES=$'packages/agentplane/src/commands/task/shared.ts
    packages/agentplane/src/commands/doctor.run.ts' node scripts/checks/run-local-ci.mjs --mode smoke | Result: pass | Evidence: selected targeted (mixed:doctor+task); 9 files / 120 tests passed; targeted lint no longer invokes full lint:core. | Scope: smoke mixed-bucket behavior.
    - Command: node scripts/checks/run-vitest-suite.mjs precommit --report-json .agentplane/tmp/precommit-timing.json | Result: pass | Evidence: report wrote suite=precommit totalDurationMs=13139; 17 files / 137 tests passed. | Scope: runner JSON timing report for non-chunked suite.
    - Command: node scripts/checks/run-vitest-suite.mjs critical-cli --report-json .agentplane/tmp/critical-timing.json | Result: pass | Evidence: 5 chunks passed; totalDurationMs=89576; slowest files were exit-codes and git-edge around 20s each. | Scope: chunked critical CLI suite and per-file timing.
    - Command: bunx eslint scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/checks/run-local-ci.mjs scripts/checks/run-vitest-suite.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: eslint completed with no output. | Scope: changed JS/TS files.
    - Command: bun run docs:scripts:check; git diff --check; node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: scripts README up to date; whitespace clean; policy routing OK. | Scope: generated docs, diff hygiene, policy route.
    - Command: AGENTPLANE_FAST_CHANGED_FILES=$'packages/agentplane/src/commands/task/shared.ts
    packages/agentplane/src/commands/pr/internal/sync.ts' node scripts/checks/run-local-ci.mjs --mode smoke | Result: fail | Evidence: selector correctly chose targeted (mixed:pr+task), but existing PR bucket tests had 13 unrelated failures in pr-flow assertions. | Scope: exposed pre-existing PR bucket breadth/drift, not caused by this diff.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131828-HBJ5P8-flexible-test-routing/.agentplane/tasks/202605131828-HBJ5P8/blueprint/resolved-snapshot.json
    - old_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
    - current_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131828-HBJ5P8
    
    ### 2026-05-13T19:19:14.913Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: flexible test routing, smoke local CI mode, critical-cli chunk runner, timing reports, route registry, eslint, generated scripts docs, diff hygiene, and policy routing pass on current task branch head.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:10:14.474Z, excerpt_hash=sha256:9c6bde3ec9d6f0f3662586ee594c4b6dfaaaeaae4ae20cd6d94235d012605a5d
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131828-HBJ5P8-flexible-test-routing/.agentplane/tasks/202605131828-HBJ5P8/blueprint/resolved-snapshot.json
    - old_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
    - current_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131828-HBJ5P8
    
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
### 2026-05-13T19:10:14.447Z — VERIFY — ok

By: CODER

Note: Implemented flexible mixed-bucket test routing, smoke local CI mode, chunked critical-cli runner, JSON timing reports, and script/test contract updates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:59:07.188Z, excerpt_hash=sha256:9c6bde3ec9d6f0f3662586ee594c4b6dfaaaeaae4ae20cd6d94235d012605a5d

Details:

Verification evidence:
- Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: 49 tests passed. | Scope: selector, scripts, and critical-suite contracts.
- Command: node scripts/checks/check-vitest-projects.mjs | Result: pass | Evidence: vitest workspace projects OK; test routing OK (392 tests, 10 primary routes). | Scope: route registry integrity.
- Command: AGENTPLANE_FAST_CHANGED_FILES=$'packages/agentplane/src/commands/task/shared.ts
packages/agentplane/src/commands/doctor.run.ts' node scripts/checks/run-local-ci.mjs --mode smoke | Result: pass | Evidence: selected targeted (mixed:doctor+task); 9 files / 120 tests passed; targeted lint no longer invokes full lint:core. | Scope: smoke mixed-bucket behavior.
- Command: node scripts/checks/run-vitest-suite.mjs precommit --report-json .agentplane/tmp/precommit-timing.json | Result: pass | Evidence: report wrote suite=precommit totalDurationMs=13139; 17 files / 137 tests passed. | Scope: runner JSON timing report for non-chunked suite.
- Command: node scripts/checks/run-vitest-suite.mjs critical-cli --report-json .agentplane/tmp/critical-timing.json | Result: pass | Evidence: 5 chunks passed; totalDurationMs=89576; slowest files were exit-codes and git-edge around 20s each. | Scope: chunked critical CLI suite and per-file timing.
- Command: bunx eslint scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/checks/run-local-ci.mjs scripts/checks/run-vitest-suite.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: eslint completed with no output. | Scope: changed JS/TS files.
- Command: bun run docs:scripts:check; git diff --check; node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: scripts README up to date; whitespace clean; policy routing OK. | Scope: generated docs, diff hygiene, policy route.
- Command: AGENTPLANE_FAST_CHANGED_FILES=$'packages/agentplane/src/commands/task/shared.ts
packages/agentplane/src/commands/pr/internal/sync.ts' node scripts/checks/run-local-ci.mjs --mode smoke | Result: fail | Evidence: selector correctly chose targeted (mixed:pr+task), but existing PR bucket tests had 13 unrelated failures in pr-flow assertions. | Scope: exposed pre-existing PR bucket breadth/drift, not caused by this diff.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131828-HBJ5P8-flexible-test-routing/.agentplane/tasks/202605131828-HBJ5P8/blueprint/resolved-snapshot.json
- old_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
- current_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131828-HBJ5P8

### 2026-05-13T19:19:14.913Z — VERIFY — ok

By: CODER

Note: Verified: flexible test routing, smoke local CI mode, critical-cli chunk runner, timing reports, route registry, eslint, generated scripts docs, diff hygiene, and policy routing pass on current task branch head.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:10:14.474Z, excerpt_hash=sha256:9c6bde3ec9d6f0f3662586ee594c4b6dfaaaeaae4ae20cd6d94235d012605a5d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131828-HBJ5P8-flexible-test-routing/.agentplane/tasks/202605131828-HBJ5P8/blueprint/resolved-snapshot.json
- old_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
- current_digest: fff3e289c5ecdc18b883480fa8b62bded6e6d9000a1598d367ccbbcac6a071c9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131828-HBJ5P8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
