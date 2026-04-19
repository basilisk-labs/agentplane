---
id: "202604191612-5NDC4X"
title: "Inline runner helpers into @agentplane/testkit"
result_summary: "Runner test helpers now have a single implementation in packages/testkit/src/runner.ts; the legacy runner/test-helpers.ts module is gone and its consumer tests remain green."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T16:14:16.686Z"
  updated_by: "CODER"
  note: "Focused runner helper migration checks passed."
commit:
  hash: "217172f3b6b25b20d036769289350f0d4f7d1267"
  message: "🧪 testkit: inline runner helpers"
comments:
  -
    author: "CODER"
    body: "Start: move runner test helper implementation into @agentplane/testkit, remove the legacy packages/agentplane/src/runner/test-helpers.ts module, and verify the affected runner-related tests and type surfaces remain green in direct mode."
  -
    author: "CODER"
    body: "Verified: moved the runner test helper implementation into @agentplane/testkit, repointed the adapter and task-run-lifecycle tests at the package entry, removed the legacy packages/agentplane/src/runner/test-helpers.ts module, reran focused runner tests, typechecked the package, and refreshed the repo-local runtime snapshot after the watched-source deletion."
events:
  -
    type: "status"
    at: "2026-04-19T16:12:37.125Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move runner test helper implementation into @agentplane/testkit, remove the legacy packages/agentplane/src/runner/test-helpers.ts module, and verify the affected runner-related tests and type surfaces remain green in direct mode."
  -
    type: "verify"
    at: "2026-04-19T16:14:16.686Z"
    author: "CODER"
    state: "ok"
    note: "Focused runner helper migration checks passed."
  -
    type: "status"
    at: "2026-04-19T16:14:45.077Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: moved the runner test helper implementation into @agentplane/testkit, repointed the adapter and task-run-lifecycle tests at the package entry, removed the legacy packages/agentplane/src/runner/test-helpers.ts module, reran focused runner tests, typechecked the package, and refreshed the repo-local runtime snapshot after the watched-source deletion."
doc_version: 3
doc_updated_at: "2026-04-19T16:14:45.078Z"
doc_updated_by: "CODER"
description: "Continue epic E′ by moving runner test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module."
sections:
  Summary: |-
    Inline runner helpers into @agentplane/testkit
    
    Continue epic E′ by moving runner test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.
  Scope: |-
    - In scope: Continue epic E′ by moving runner test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.
    - Out of scope: unrelated refactors not required for "Inline runner helpers into @agentplane/testkit".
  Plan: "1. Move the runner helper implementation from packages/agentplane/src/runner/test-helpers.ts into packages/testkit/src/runner.ts. 2. Delete the legacy runner helper module after the testkit entry becomes self-contained. 3. Identify and run the focused runner consumer tests plus @agentplane/testkit typecheck. 4. Refresh the repo-local runtime snapshot if the watched-source deletion requires it. 5. Record verification and finish with task-scoped commit evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T16:14:16.686Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused runner helper migration checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:12:37.154Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts
    Result: pass
    Evidence: 3 files and 28 tests passed.
    Scope: runner helper consumers in adapter and lifecycle tests.
    
    Command: bun run --filter=@agentplane/testkit typecheck
    Result: pass
    Evidence: exited with code 0.
    Scope: packages/testkit/src/runner.ts type surface.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: rebuilt core and agentplane, runtime verify reported active 0.3.15 matches repository expectation.
    Scope: repo-local runtime snapshot after deleting legacy runner helper.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Inline runner helpers into @agentplane/testkit

Continue epic E′ by moving runner test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.

## Scope

- In scope: Continue epic E′ by moving runner test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.
- Out of scope: unrelated refactors not required for "Inline runner helpers into @agentplane/testkit".

## Plan

1. Move the runner helper implementation from packages/agentplane/src/runner/test-helpers.ts into packages/testkit/src/runner.ts. 2. Delete the legacy runner helper module after the testkit entry becomes self-contained. 3. Identify and run the focused runner consumer tests plus @agentplane/testkit typecheck. 4. Refresh the repo-local runtime snapshot if the watched-source deletion requires it. 5. Record verification and finish with task-scoped commit evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T16:14:16.686Z — VERIFY — ok

By: CODER

Note: Focused runner helper migration checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:12:37.154Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts
Result: pass
Evidence: 3 files and 28 tests passed.
Scope: runner helper consumers in adapter and lifecycle tests.

Command: bun run --filter=@agentplane/testkit typecheck
Result: pass
Evidence: exited with code 0.
Scope: packages/testkit/src/runner.ts type surface.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: rebuilt core and agentplane, runtime verify reported active 0.3.15 matches repository expectation.
Scope: repo-local runtime snapshot after deleting legacy runner helper.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
