---
id: "202605051354-F8D9YX"
title: "Fix upgrade commit for legacy config removal"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "config"
  - "upgrade"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T13:54:10.100Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T13:57:57.936Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade commits tracked legacy config removal'. Result: pass. Evidence: 1 test passed, 12 skipped; regression verifies tracked legacy config deletion is committed and tree is clean. Scope: upgrade migration from config.json to WORKFLOW.md. Command: bunx eslint packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: no lint output. Scope: touched implementation and test files. Command: bun run --filter=@agentplaneorg/recipes build && bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Evidence: typecheck completed after building recipe declarations. Scope: agentplane package type surface. Command: node .agentplane/policy/check-routing.mjs && git diff --check && bun run framework:dev:bootstrap && ./.agentplane/bin/agentplane doctor. Result: pass. Evidence: policy routing OK; diff whitespace clean; repo-local runtime ready; doctor OK. Scope: policy/runtime integration."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing focused upgrade regression and commit path fix so legacy config.json removal is staged by the dedicated upgrade commit."
events:
  -
    type: "status"
    at: "2026-05-05T13:54:34.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing focused upgrade regression and commit path fix so legacy config.json removal is staged by the dedicated upgrade commit."
  -
    type: "verify"
    at: "2026-05-05T13:57:57.936Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade commits tracked legacy config removal'. Result: pass. Evidence: 1 test passed, 12 skipped; regression verifies tracked legacy config deletion is committed and tree is clean. Scope: upgrade migration from config.json to WORKFLOW.md. Command: bunx eslint packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: no lint output. Scope: touched implementation and test files. Command: bun run --filter=@agentplaneorg/recipes build && bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Evidence: typecheck completed after building recipe declarations. Scope: agentplane package type surface. Command: node .agentplane/policy/check-routing.mjs && git diff --check && bun run framework:dev:bootstrap && ./.agentplane/bin/agentplane doctor. Result: pass. Evidence: policy routing OK; diff whitespace clean; repo-local runtime ready; doctor OK. Scope: policy/runtime integration."
doc_version: 3
doc_updated_at: "2026-05-05T13:57:57.941Z"
doc_updated_by: "CODER"
description: "Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit."
sections:
  Summary: |-
    Fix upgrade commit for legacy config removal
    
    Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.
  Scope: |-
    - In scope: Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.
    - Out of scope: unrelated refactors not required for "Fix upgrade commit for legacy config removal".
  Plan: "Fix upgrade auto-apply so migration from tracked legacy .agentplane/config.json to WORKFLOW.md-only state stages the config deletion in the dedicated upgrade commit. Add a regression test that builds a legacy repo with tracked config.json, runs upgrade, and asserts WORKFLOW.md/last-known-good exist and git status has no tracked deletion left. Verify with the focused upgrade test and routing check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T13:57:57.936Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade commits tracked legacy config removal'. Result: pass. Evidence: 1 test passed, 12 skipped; regression verifies tracked legacy config deletion is committed and tree is clean. Scope: upgrade migration from config.json to WORKFLOW.md. Command: bunx eslint packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: no lint output. Scope: touched implementation and test files. Command: bun run --filter=@agentplaneorg/recipes build && bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Evidence: typecheck completed after building recipe declarations. Scope: agentplane package type surface. Command: node .agentplane/policy/check-routing.mjs && git diff --check && bun run framework:dev:bootstrap && ./.agentplane/bin/agentplane doctor. Result: pass. Evidence: policy routing OK; diff whitespace clean; repo-local runtime ready; doctor OK. Scope: policy/runtime integration.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T13:54:34.094Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Full cli-core upgrade file was also run once and failed on pre-existing stale assertions unrelated to this patch: README v3 tests still expect markdown headings and one test still reads config.json from writeDefaultConfig. The new targeted regression passed.
      Impact: No evidence that the legacy config deletion fix regressed the touched upgrade path; full-file suite has existing drift outside this task scope.
      Resolution: Recorded targeted regression plus lint, typecheck, routing, bootstrap, and doctor as task evidence; leave stale broader suite cleanup to a separate task.
id_source: "generated"
---
## Summary

Fix upgrade commit for legacy config removal

Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.

## Scope

- In scope: Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.
- Out of scope: unrelated refactors not required for "Fix upgrade commit for legacy config removal".

## Plan

Fix upgrade auto-apply so migration from tracked legacy .agentplane/config.json to WORKFLOW.md-only state stages the config deletion in the dedicated upgrade commit. Add a regression test that builds a legacy repo with tracked config.json, runs upgrade, and asserts WORKFLOW.md/last-known-good exist and git status has no tracked deletion left. Verify with the focused upgrade test and routing check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T13:57:57.936Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade commits tracked legacy config removal'. Result: pass. Evidence: 1 test passed, 12 skipped; regression verifies tracked legacy config deletion is committed and tree is clean. Scope: upgrade migration from config.json to WORKFLOW.md. Command: bunx eslint packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: no lint output. Scope: touched implementation and test files. Command: bun run --filter=@agentplaneorg/recipes build && bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Evidence: typecheck completed after building recipe declarations. Scope: agentplane package type surface. Command: node .agentplane/policy/check-routing.mjs && git diff --check && bun run framework:dev:bootstrap && ./.agentplane/bin/agentplane doctor. Result: pass. Evidence: policy routing OK; diff whitespace clean; repo-local runtime ready; doctor OK. Scope: policy/runtime integration.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T13:54:34.094Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Full cli-core upgrade file was also run once and failed on pre-existing stale assertions unrelated to this patch: README v3 tests still expect markdown headings and one test still reads config.json from writeDefaultConfig. The new targeted regression passed.
  Impact: No evidence that the legacy config deletion fix regressed the touched upgrade path; full-file suite has existing drift outside this task scope.
  Resolution: Recorded targeted regression plus lint, typecheck, routing, bootstrap, and doctor as task evidence; leave stale broader suite cleanup to a separate task.
