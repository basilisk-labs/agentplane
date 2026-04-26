---
id: "202604261724-RD2T2E"
title: "Prune incident shared exports"
result_summary: "Pruned incident shared exports and reduced Knip baseline total from 417 to 409."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "knip"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T17:24:11.030Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T17:28:57.667Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/commands/incidents/shared.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
    Result: pass
    Evidence: 5 files, 56 tests passed.
    Scope: incident shared helpers, incidents CLI, verify/finish incident collection consumers.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript after making incident helpers module-local.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=409/409.
    Scope: unused-code baseline after incident shared export pruning.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
    
    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors.
    Scope: changed diff.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: Framework dev runtime is ready.
    Scope: repo-local CLI/runtime after incident source change.
commit:
  hash: "c0ec979e579e7198ee74c3562c528b78a781e812"
  message: "🚧 RD2T2E task: prune incident shared exports"
comments:
  -
    author: "CODER"
    body: "Start: Prune unused incident shared exports while preserving incident command and task lifecycle consumers, then refresh Knip and run focused verification."
  -
    author: "CODER"
    body: "Verified: Made unused incident shared exports module-local while preserving incident command and task lifecycle consumers, refreshed Knip baseline to total 409, and passed incident-focused tests plus typecheck, lint, Knip, format, diff check, and framework bootstrap."
events:
  -
    type: "status"
    at: "2026-04-26T17:24:18.616Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Prune unused incident shared exports while preserving incident command and task lifecycle consumers, then refresh Knip and run focused verification."
  -
    type: "verify"
    at: "2026-04-26T17:28:57.667Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/commands/incidents/shared.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
      Result: pass
      Evidence: 5 files, 56 tests passed.
      Scope: incident shared helpers, incidents CLI, verify/finish incident collection consumers.
      
      Command: bun run typecheck
      Result: pass
      Evidence: tsc -b exited 0.
      Scope: repository TypeScript after making incident helpers module-local.
      
      Command: bun run lint:core
      Result: pass
      Evidence: eslint exited 0.
      Scope: packages, scripts, and root lint config.
      
      Command: node scripts/check-knip-baseline.mjs
      Result: pass
      Evidence: baseline OK total=409/409.
      Scope: unused-code baseline after incident shared export pruning.
      
      Command: bun run format:check
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: repository formatting.
      
      Command: git diff --check
      Result: pass
      Evidence: no whitespace errors.
      Scope: changed diff.
      
      Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: Framework dev runtime is ready.
      Scope: repo-local CLI/runtime after incident source change.
  -
    type: "status"
    at: "2026-04-26T17:29:31.107Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Made unused incident shared exports module-local while preserving incident command and task lifecycle consumers, refreshed Knip baseline to total 409, and passed incident-focused tests plus typecheck, lint, Knip, format, diff check, and framework bootstrap."
doc_version: 3
doc_updated_at: "2026-04-26T17:29:31.108Z"
doc_updated_by: "CODER"
description: "Make unused exports in commands/incidents/shared.ts module-local while preserving incident command and task lifecycle consumers, then refresh the Knip baseline."
sections:
  Summary: |-
    Prune incident shared exports
    
    Make unused exports in commands/incidents/shared.ts module-local while preserving incident command and task lifecycle consumers, then refresh the Knip baseline.
  Scope: |-
    - In scope: Make unused exports in commands/incidents/shared.ts module-local while preserving incident command and task lifecycle consumers, then refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Prune incident shared exports".
  Plan: |-
    1. Make unused symbols in packages/agentplane/src/commands/incidents/shared.ts module-local while preserving current incident command and task lifecycle imports.
    2. Refresh scripts/baselines/knip-baseline.json and confirm the total decreases.
    3. Run focused incident/task lifecycle tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T17:28:57.667Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/incidents/shared.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
    Result: pass
    Evidence: 5 files, 56 tests passed.
    Scope: incident shared helpers, incidents CLI, verify/finish incident collection consumers.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript after making incident helpers module-local.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=409/409.
    Scope: unused-code baseline after incident shared export pruning.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
    
    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors.
    Scope: changed diff.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: Framework dev runtime is ready.
    Scope: repo-local CLI/runtime after incident source change.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T17:24:18.642Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prune incident shared exports

Make unused exports in commands/incidents/shared.ts module-local while preserving incident command and task lifecycle consumers, then refresh the Knip baseline.

## Scope

- In scope: Make unused exports in commands/incidents/shared.ts module-local while preserving incident command and task lifecycle consumers, then refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Prune incident shared exports".

## Plan

1. Make unused symbols in packages/agentplane/src/commands/incidents/shared.ts module-local while preserving current incident command and task lifecycle imports.
2. Refresh scripts/baselines/knip-baseline.json and confirm the total decreases.
3. Run focused incident/task lifecycle tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T17:28:57.667Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/incidents/shared.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
Result: pass
Evidence: 5 files, 56 tests passed.
Scope: incident shared helpers, incidents CLI, verify/finish incident collection consumers.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: repository TypeScript after making incident helpers module-local.

Command: bun run lint:core
Result: pass
Evidence: eslint exited 0.
Scope: packages, scripts, and root lint config.

Command: node scripts/check-knip-baseline.mjs
Result: pass
Evidence: baseline OK total=409/409.
Scope: unused-code baseline after incident shared export pruning.

Command: bun run format:check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: repository formatting.

Command: git diff --check
Result: pass
Evidence: no whitespace errors.
Scope: changed diff.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: Framework dev runtime is ready.
Scope: repo-local CLI/runtime after incident source change.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T17:24:18.642Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
