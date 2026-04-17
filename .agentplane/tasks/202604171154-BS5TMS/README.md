---
id: "202604171154-BS5TMS"
title: "Wire recipes active commands into public CLI"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T11:55:41.913Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:02:13.147Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000 && bun run docs:cli:check
    Result: pass
    Evidence: 46 focused CLI tests passed; help snapshot and generated CLI reference now include recipes active/enable/disable/explain-active; docs freshness check passed.
    Scope: public recipes CLI catalog, help/reference surfaces, and focused run-cli coverage for overlay lifecycle commands.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: expose recipes active/enable/disable/explain-active in the public CLI surface, update derived help/tests, and verify that the overlay lifecycle is reachable from the shipped command catalog."
events:
  -
    type: "status"
    at: "2026-04-17T11:55:56.869Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expose recipes active/enable/disable/explain-active in the public CLI surface, update derived help/tests, and verify that the overlay lifecycle is reachable from the shipped command catalog."
  -
    type: "verify"
    at: "2026-04-17T12:00:18.652Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 2 test files, 46 tests passed; help snapshot updated with recipes active/enable/disable/explain-active and runtime help now lists all four commands.
      Scope: public recipes CLI catalog, help surface, and focused run-cli coverage for overlay lifecycle commands.
  -
    type: "verify"
    at: "2026-04-17T12:02:13.147Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000 && bun run docs:cli:check
      Result: pass
      Evidence: 46 focused CLI tests passed; help snapshot and generated CLI reference now include recipes active/enable/disable/explain-active; docs freshness check passed.
      Scope: public recipes CLI catalog, help/reference surfaces, and focused run-cli coverage for overlay lifecycle commands.
doc_version: 3
doc_updated_at: "2026-04-17T12:02:13.151Z"
doc_updated_by: "CODER"
description: "Expose recipes active, enable, disable, and explain-active in the public command catalog, help surfaces, and run-cli coverage so the project-local overlay lifecycle is actually reachable."
sections:
  Summary: |-
    Wire recipes active commands into public CLI
    
    Expose recipes active, enable, disable, and explain-active in the public command catalog, help surfaces, and run-cli coverage so the project-local overlay lifecycle is actually reachable.
  Scope: |-
    - In scope: Expose recipes active, enable, disable, and explain-active in the public command catalog, help surfaces, and run-cli coverage so the project-local overlay lifecycle is actually reachable.
    - Out of scope: unrelated refactors not required for "Wire recipes active commands into public CLI".
  Plan: "1. Expose recipes active, enable, disable, and explain-active from the public project command catalog. 2. Update compact/full help and any role-free docs snapshots that derive from the catalog. 3. Add focused run-cli and command-catalog coverage proving the commands are visible and callable. 4. Verify that agentplane help recipes and run-cli tests reflect the public overlay lifecycle surface."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:00:18.652Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: 2 test files, 46 tests passed; help snapshot updated with recipes active/enable/disable/explain-active and runtime help now lists all four commands.\nScope: public recipes CLI catalog, help surface, and focused run-cli coverage for overlay lifecycle commands.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T11:55:56.876Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-17T12:02:13.147Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000 && bun run docs:cli:check\nResult: pass\nEvidence: 46 focused CLI tests passed; help snapshot and generated CLI reference now include recipes active/enable/disable/explain-active; docs freshness check passed.\nScope: public recipes CLI catalog, help/reference surfaces, and focused run-cli coverage for overlay lifecycle commands.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:00:18.655Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Wire recipes active commands into public CLI

Expose recipes active, enable, disable, and explain-active in the public command catalog, help surfaces, and run-cli coverage so the project-local overlay lifecycle is actually reachable.

## Scope

- In scope: Expose recipes active, enable, disable, and explain-active in the public command catalog, help surfaces, and run-cli coverage so the project-local overlay lifecycle is actually reachable.
- Out of scope: unrelated refactors not required for "Wire recipes active commands into public CLI".

## Plan

1. Expose recipes active, enable, disable, and explain-active from the public project command catalog. 2. Update compact/full help and any role-free docs snapshots that derive from the catalog. 3. Add focused run-cli and command-catalog coverage proving the commands are visible and callable. 4. Verify that agentplane help recipes and run-cli tests reflect the public overlay lifecycle surface.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:00:18.652Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: 2 test files, 46 tests passed; help snapshot updated with recipes active/enable/disable/explain-active and runtime help now lists all four commands.\nScope: public recipes CLI catalog, help surface, and focused run-cli coverage for overlay lifecycle commands.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T11:55:56.876Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-17T12:02:13.147Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000 && bun run docs:cli:check\nResult: pass\nEvidence: 46 focused CLI tests passed; help snapshot and generated CLI reference now include recipes active/enable/disable/explain-active; docs freshness check passed.\nScope: public recipes CLI catalog, help/reference surfaces, and focused run-cli coverage for overlay lifecycle commands.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:00:18.655Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
