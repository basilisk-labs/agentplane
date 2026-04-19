---
id: "202604191607-GT8YRW"
title: "Inline recipes helpers into @agentplane/testkit"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  updated_at: "2026-04-19T16:11:11.343Z"
  updated_by: "CODER"
  note: "Focused recipes helper migration checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move recipes test helper implementation into @agentplane/testkit, delete the legacy helper module from packages/agentplane/src/commands, and verify the recipes/scenario consumer test surface stays green in direct mode."
events:
  -
    type: "status"
    at: "2026-04-19T16:07:53.423Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move recipes test helper implementation into @agentplane/testkit, delete the legacy helper module from packages/agentplane/src/commands, and verify the recipes/scenario consumer test surface stays green in direct mode."
  -
    type: "verify"
    at: "2026-04-19T16:11:11.343Z"
    author: "CODER"
    state: "ok"
    note: "Focused recipes helper migration checks passed."
doc_version: 3
doc_updated_at: "2026-04-19T16:11:11.349Z"
doc_updated_by: "CODER"
description: "Continue epic E′ by moving recipes test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module."
sections:
  Summary: |-
    Inline recipes helpers into @agentplane/testkit
    
    Continue epic E′ by moving recipes test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.
  Scope: |-
    - In scope: Continue epic E′ by moving recipes test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.
    - Out of scope: unrelated refactors not required for "Inline recipes helpers into @agentplane/testkit".
  Plan: "1. Move the recipes helper implementation from packages/agentplane/src/commands/recipes.test-helpers.ts into packages/testkit/src/recipes.ts. 2. Update imports or local references if the moved implementation needs package-local path adjustments. 3. Delete the legacy agentplane helper file after the testkit module is self-contained. 4. Run focused recipes and scenario consumer tests plus @agentplane/testkit typecheck. 5. Record verification and finish with task-scoped commit evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T16:11:11.343Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused recipes helper migration checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:07:53.448Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts
    Result: pass
    Evidence: 6 files and 58 tests passed.
    Scope: recipes and scenario consumers of @agentplane/testkit recipes helpers.
    
    Command: bun run --filter=@agentplane/testkit typecheck
    Result: pass
    Evidence: exited with code 0 after forwarding parsed.force in recipes update path.
    Scope: packages/testkit/src/recipes.ts type surface.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: rebuilt core and agentplane, runtime verify reported active 0.3.15 matches repository expectation.
    Scope: repo-local runtime snapshot after deleting legacy helper.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Inline recipes helpers into @agentplane/testkit

Continue epic E′ by moving recipes test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.

## Scope

- In scope: Continue epic E′ by moving recipes test helpers out of packages/agentplane/src into packages/testkit/src and deleting the legacy helper module.
- Out of scope: unrelated refactors not required for "Inline recipes helpers into @agentplane/testkit".

## Plan

1. Move the recipes helper implementation from packages/agentplane/src/commands/recipes.test-helpers.ts into packages/testkit/src/recipes.ts. 2. Update imports or local references if the moved implementation needs package-local path adjustments. 3. Delete the legacy agentplane helper file after the testkit module is self-contained. 4. Run focused recipes and scenario consumer tests plus @agentplane/testkit typecheck. 5. Record verification and finish with task-scoped commit evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T16:11:11.343Z — VERIFY — ok

By: CODER

Note: Focused recipes helper migration checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:07:53.448Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts
Result: pass
Evidence: 6 files and 58 tests passed.
Scope: recipes and scenario consumers of @agentplane/testkit recipes helpers.

Command: bun run --filter=@agentplane/testkit typecheck
Result: pass
Evidence: exited with code 0 after forwarding parsed.force in recipes update path.
Scope: packages/testkit/src/recipes.ts type surface.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: rebuilt core and agentplane, runtime verify reported active 0.3.15 matches repository expectation.
Scope: repo-local runtime snapshot after deleting legacy helper.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
