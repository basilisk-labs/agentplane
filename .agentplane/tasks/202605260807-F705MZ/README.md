---
id: "202605260807-F705MZ"
title: "Route hook runtime changes to targeted local CI"
result_summary: "Merged via PR #4161."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-26T08:07:32.472Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-26T08:12:52.094Z"
  updated_by: "CODER"
  note: "Hook runtime local CI routing now resolves to targeted hooks route; targeted selector, lint, format, and hooks suites pass."
  attempts: 0
commit:
  hash: "f6dcab25721416a81823e64f9f0115e209e231c2"
  message: "🚧 F705MZ task: Route hook runtime changes to targeted local CI [202605260807-F705MZ] (#4161)"
comments:
  -
    author: "CODER"
    body: "Start: update local CI hook bucket routing and selector coverage so hook runtime changes avoid full-fast release suites."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4161 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-26T08:08:07.870Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update local CI hook bucket routing and selector coverage so hook runtime changes avoid full-fast release suites."
  -
    type: "verify"
    at: "2026-05-26T08:12:52.094Z"
    author: "CODER"
    state: "ok"
    note: "Hook runtime local CI routing now resolves to targeted hooks route; targeted selector, lint, format, and hooks suites pass."
  -
    type: "status"
    at: "2026-05-26T08:19:28.865Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4161 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-26T08:19:28.870Z"
doc_updated_by: "INTEGRATOR"
description: "Make local CI classify packages/agentplane/src/commands/hooks changes as hooks bucket so pre-push does not fall back to full-fast release suites for hook-only work."
sections:
  Summary: |-
    Route hook runtime changes to targeted local CI

    Make local CI classify packages/agentplane/src/commands/hooks changes as hooks bucket so pre-push does not fall back to full-fast release suites for hook-only work.
  Scope: |-
    - In scope: Make local CI classify packages/agentplane/src/commands/hooks changes as hooks bucket so pre-push does not fall back to full-fast release suites for hook-only work.
    - Out of scope: unrelated refactors not required for "Route hook runtime changes to targeted local CI".
  Plan: |-
    1. Add packages/agentplane/src/commands/hooks to the hooks bucket in scripts/lib/local-ci-selection.mjs.
    2. Add/adjust selector coverage in packages/agentplane/src/cli/local-ci-selection.test.ts so hook runtime + hook test changes resolve to targeted hooks, not full-fast.
    3. Verify with selector explain, targeted unit tests, format/lint relevant to touched files, and hosted PR checks.
    4. Open PR and merge to main after hosted green.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-26T08:12:52.094Z — VERIFY — ok

    By: CODER

    Note: Hook runtime local CI routing now resolves to targeted hooks route; targeted selector, lint, format, and hooks suites pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-26T08:08:07.870Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Command: AGENTPLANE_FAST_CHANGED_FILES="packages/agentplane/src/commands/hooks/run.pre-commit.ts
    packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts" node scripts/checks/run-local-ci.mjs --mode fast --explain
    Result: pass
    Evidence: selector targeted (hooks), execution route targeted-fast, includes run-cli.core.hooks.pre-commit.test.ts.
    Scope: local CI routing for hook runtime changes.

    Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: 55 pass, 0 fail.
    Scope: selector regression coverage.

    Command: bunx eslint scripts/lib/local-ci-selection.mjs scripts/lib/test-route-registry.mjs packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: exit 0.
    Scope: touched JS/TS lint.

    Command: bunx vitest run <hooks targeted test files> --pool=threads --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 8 files, 114 tests passed.
    Scope: targeted hooks route tests.

    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting check.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605260807-F705MZ-hook-runtime-ci-routing/.agentplane/tasks/202605260807-F705MZ/blueprint/resolved-snapshot.json
    - old_digest: 414b65fa916f3044ce010fc407718c9ac453bc8f8b916584c2a34949a9343b63
    - current_digest: 414b65fa916f3044ce010fc407718c9ac453bc8f8b916584c2a34949a9343b63
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605260807-F705MZ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Route hook runtime changes to targeted local CI

Make local CI classify packages/agentplane/src/commands/hooks changes as hooks bucket so pre-push does not fall back to full-fast release suites for hook-only work.

## Scope

- In scope: Make local CI classify packages/agentplane/src/commands/hooks changes as hooks bucket so pre-push does not fall back to full-fast release suites for hook-only work.
- Out of scope: unrelated refactors not required for "Route hook runtime changes to targeted local CI".

## Plan

1. Add packages/agentplane/src/commands/hooks to the hooks bucket in scripts/lib/local-ci-selection.mjs.
2. Add/adjust selector coverage in packages/agentplane/src/cli/local-ci-selection.test.ts so hook runtime + hook test changes resolve to targeted hooks, not full-fast.
3. Verify with selector explain, targeted unit tests, format/lint relevant to touched files, and hosted PR checks.
4. Open PR and merge to main after hosted green.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-26T08:12:52.094Z — VERIFY — ok

By: CODER

Note: Hook runtime local CI routing now resolves to targeted hooks route; targeted selector, lint, format, and hooks suites pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-26T08:08:07.870Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Command: AGENTPLANE_FAST_CHANGED_FILES="packages/agentplane/src/commands/hooks/run.pre-commit.ts
packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts" node scripts/checks/run-local-ci.mjs --mode fast --explain
Result: pass
Evidence: selector targeted (hooks), execution route targeted-fast, includes run-cli.core.hooks.pre-commit.test.ts.
Scope: local CI routing for hook runtime changes.

Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: 55 pass, 0 fail.
Scope: selector regression coverage.

Command: bunx eslint scripts/lib/local-ci-selection.mjs scripts/lib/test-route-registry.mjs packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: exit 0.
Scope: touched JS/TS lint.

Command: bunx vitest run <hooks targeted test files> --pool=threads --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 8 files, 114 tests passed.
Scope: targeted hooks route tests.

Command: bun run format:check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: repository formatting check.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605260807-F705MZ-hook-runtime-ci-routing/.agentplane/tasks/202605260807-F705MZ/blueprint/resolved-snapshot.json
- old_digest: 414b65fa916f3044ce010fc407718c9ac453bc8f8b916584c2a34949a9343b63
- current_digest: 414b65fa916f3044ce010fc407718c9ac453bc8f8b916584c2a34949a9343b63
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605260807-F705MZ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
