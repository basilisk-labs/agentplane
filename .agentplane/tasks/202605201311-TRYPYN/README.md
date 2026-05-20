---
id: "202605201311-TRYPYN"
title: "Fix local CI routing for context task artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T13:11:45.116Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T13:20:34.573Z"
  updated_by: "CODER"
  note: "Root cause confirmed: context code/docs plus neutral task PR artifact fell through to full-fast as unclassified_changed_paths. Added context bucket and regression coverage. Evidence: run-local-ci --mode fast --explain now selects targeted(context)/context_paths_only; run-local-ci --mode fast for reproduced changed files passed; local-ci-selection.test.ts passed; context targeted tests passed; prettier/eslint/check-routing/diff-check passed; ap doctor OK with unrelated archived README warning only."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Investigating the local CI selector fallback that routed context code plus task PR artifacts into full-fast pre-push, then adding a targeted context route with regression tests."
events:
  -
    type: "status"
    at: "2026-05-20T13:12:08.553Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Investigating the local CI selector fallback that routed context code plus task PR artifacts into full-fast pre-push, then adding a targeted context route with regression tests."
  -
    type: "verify"
    at: "2026-05-20T13:20:34.573Z"
    author: "CODER"
    state: "ok"
    note: "Root cause confirmed: context code/docs plus neutral task PR artifact fell through to full-fast as unclassified_changed_paths. Added context bucket and regression coverage. Evidence: run-local-ci --mode fast --explain now selects targeted(context)/context_paths_only; run-local-ci --mode fast for reproduced changed files passed; local-ci-selection.test.ts passed; context targeted tests passed; prettier/eslint/check-routing/diff-check passed; ap doctor OK with unrelated archived README warning only."
doc_version: 3
doc_updated_at: "2026-05-20T13:20:34.649Z"
doc_updated_by: "CODER"
description: "Investigate and fix the pre-push ci:local:fast full-fast fallback that occurred when context code changes were combined with .agentplane task/PR artifacts; route this scope to focused context tests instead of broad flaky/timing suites."
sections:
  Summary: |-
    Fix local CI routing for context task artifacts

    Investigate and fix the pre-push ci:local:fast full-fast fallback that occurred when context code changes were combined with .agentplane task/PR artifacts; route this scope to focused context tests instead of broad flaky/timing suites.
  Scope: |-
    - In scope: Investigate and fix the pre-push ci:local:fast full-fast fallback that occurred when context code changes were combined with .agentplane task/PR artifacts; route this scope to focused context tests instead of broad flaky/timing suites.
    - Out of scope: unrelated refactors not required for "Fix local CI routing for context task artifacts".
  Plan: "1. Reproduce the local CI selector result for the glossary/context changed-file set and confirm why it selected full-fast. 2. Add a context-focused local CI bucket covering context command/source paths and keeping .agentplane task artifacts neutral when mixed with context code. 3. Add focused selector tests proving context+task-artifact paths route to targeted context checks instead of full-fast. 4. Run local-ci explain, selector tests, lint/format/routing, and targeted context tests. 5. Commit and open a branch_pr PR with evidence."
  Verify Steps: |-
    1. Run node scripts/checks/run-local-ci.mjs --mode fast --explain --json --changed-files with the reproduced glossary/context path set and confirm it selects a targeted context route rather than full-fast.
    2. Run bun test packages/agentplane/src/cli/local-ci-selection.test.ts and confirm the new selector regression test passes.
    3. Run bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/context/sqlite.unit.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts packages/agentplane/src/blueprints/validate.test.ts and confirm context-targeted tests pass.
    4. Run bunx eslint scripts/lib/local-ci-selection.mjs scripts/lib/test-route-registry.mjs packages/agentplane/src/cli/local-ci-selection.test.ts and confirm lint passes.
    5. Run bunx prettier --check scripts/lib/local-ci-selection.mjs scripts/lib/test-route-registry.mjs packages/agentplane/src/cli/local-ci-selection.test.ts and node .agentplane/policy/check-routing.mjs.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T13:20:34.573Z — VERIFY — ok

    By: CODER

    Note: Root cause confirmed: context code/docs plus neutral task PR artifact fell through to full-fast as unclassified_changed_paths. Added context bucket and regression coverage. Evidence: run-local-ci --mode fast --explain now selects targeted(context)/context_paths_only; run-local-ci --mode fast for reproduced changed files passed; local-ci-selection.test.ts passed; context targeted tests passed; prettier/eslint/check-routing/diff-check passed; ap doctor OK with unrelated archived README warning only.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T13:12:08.553Z, excerpt_hash=sha256:f928832443bc7e8c3fcb87a9e7f63c4e50e36771b2bf7aa93c475ac0694aa29c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201311-TRYPYN-context-ci-routing/.agentplane/tasks/202605201311-TRYPYN/blueprint/resolved-snapshot.json
    - old_digest: 44f8cf52140e3b28c7bdf2302fcb0f28a5fe2dd9bd9b857b992f9544c65043ee
    - current_digest: 44f8cf52140e3b28c7bdf2302fcb0f28a5fe2dd9bd9b857b992f9544c65043ee
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201311-TRYPYN

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix local CI routing for context task artifacts

Investigate and fix the pre-push ci:local:fast full-fast fallback that occurred when context code changes were combined with .agentplane task/PR artifacts; route this scope to focused context tests instead of broad flaky/timing suites.

## Scope

- In scope: Investigate and fix the pre-push ci:local:fast full-fast fallback that occurred when context code changes were combined with .agentplane task/PR artifacts; route this scope to focused context tests instead of broad flaky/timing suites.
- Out of scope: unrelated refactors not required for "Fix local CI routing for context task artifacts".

## Plan

1. Reproduce the local CI selector result for the glossary/context changed-file set and confirm why it selected full-fast. 2. Add a context-focused local CI bucket covering context command/source paths and keeping .agentplane task artifacts neutral when mixed with context code. 3. Add focused selector tests proving context+task-artifact paths route to targeted context checks instead of full-fast. 4. Run local-ci explain, selector tests, lint/format/routing, and targeted context tests. 5. Commit and open a branch_pr PR with evidence.

## Verify Steps

1. Run node scripts/checks/run-local-ci.mjs --mode fast --explain --json --changed-files with the reproduced glossary/context path set and confirm it selects a targeted context route rather than full-fast.
2. Run bun test packages/agentplane/src/cli/local-ci-selection.test.ts and confirm the new selector regression test passes.
3. Run bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/context/sqlite.unit.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts packages/agentplane/src/blueprints/validate.test.ts and confirm context-targeted tests pass.
4. Run bunx eslint scripts/lib/local-ci-selection.mjs scripts/lib/test-route-registry.mjs packages/agentplane/src/cli/local-ci-selection.test.ts and confirm lint passes.
5. Run bunx prettier --check scripts/lib/local-ci-selection.mjs scripts/lib/test-route-registry.mjs packages/agentplane/src/cli/local-ci-selection.test.ts and node .agentplane/policy/check-routing.mjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T13:20:34.573Z — VERIFY — ok

By: CODER

Note: Root cause confirmed: context code/docs plus neutral task PR artifact fell through to full-fast as unclassified_changed_paths. Added context bucket and regression coverage. Evidence: run-local-ci --mode fast --explain now selects targeted(context)/context_paths_only; run-local-ci --mode fast for reproduced changed files passed; local-ci-selection.test.ts passed; context targeted tests passed; prettier/eslint/check-routing/diff-check passed; ap doctor OK with unrelated archived README warning only.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T13:12:08.553Z, excerpt_hash=sha256:f928832443bc7e8c3fcb87a9e7f63c4e50e36771b2bf7aa93c475ac0694aa29c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201311-TRYPYN-context-ci-routing/.agentplane/tasks/202605201311-TRYPYN/blueprint/resolved-snapshot.json
- old_digest: 44f8cf52140e3b28c7bdf2302fcb0f28a5fe2dd9bd9b857b992f9544c65043ee
- current_digest: 44f8cf52140e3b28c7bdf2302fcb0f28a5fe2dd9bd9b857b992f9544c65043ee
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201311-TRYPYN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
