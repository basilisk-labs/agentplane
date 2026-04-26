---
id: "202604261629-FCG14T"
title: "Remove release preflight barrel"
result_summary: "Removed release preflight barrel and reduced Knip baseline total from 434 to 428."
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
  updated_at: "2026-04-26T16:29:12.447Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T16:31:33.697Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/apply.command.test.ts packages/agentplane/src/commands/release/plan.command.test.ts
    Result: pass
    Evidence: release apply focused suite passed: 1 file, 19 tests.
    Scope: release apply/plan behavior using the direct preflight imports.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript project references after deleting apply.preflight.ts.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=428/428.
    Scope: unused-code baseline after removing release preflight barrel.
    
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
    Scope: repo-local CLI/runtime after source deletion.
commit:
  hash: "0a1de6deb140028b66ffd490de4098f69911939b"
  message: "🚧 FCG14T task: remove release preflight barrel"
comments:
  -
    author: "CODER"
    body: "Start: Remove the release preflight barrel by rewriting internal imports to direct preflight modules, then refresh Knip and run the declared release-focused verification."
  -
    author: "CODER"
    body: "Verified: Removed the release preflight barrel, rewired internal imports to direct preflight modules, refreshed Knip baseline to total 428, and passed release-focused tests plus typecheck, lint, Knip, format, diff check, and framework bootstrap."
events:
  -
    type: "status"
    at: "2026-04-26T16:29:17.775Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove the release preflight barrel by rewriting internal imports to direct preflight modules, then refresh Knip and run the declared release-focused verification."
  -
    type: "verify"
    at: "2026-04-26T16:31:33.697Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/apply.command.test.ts packages/agentplane/src/commands/release/plan.command.test.ts
      Result: pass
      Evidence: release apply focused suite passed: 1 file, 19 tests.
      Scope: release apply/plan behavior using the direct preflight imports.
      
      Command: bun run typecheck
      Result: pass
      Evidence: tsc -b exited 0.
      Scope: repository TypeScript project references after deleting apply.preflight.ts.
      
      Command: bun run lint:core
      Result: pass
      Evidence: eslint exited 0.
      Scope: packages, scripts, and root lint config.
      
      Command: node scripts/check-knip-baseline.mjs
      Result: pass
      Evidence: baseline OK total=428/428.
      Scope: unused-code baseline after removing release preflight barrel.
      
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
      Scope: repo-local CLI/runtime after source deletion.
  -
    type: "status"
    at: "2026-04-26T16:32:05.086Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Removed the release preflight barrel, rewired internal imports to direct preflight modules, refreshed Knip baseline to total 428, and passed release-focused tests plus typecheck, lint, Knip, format, diff check, and framework bootstrap."
doc_version: 3
doc_updated_at: "2026-04-26T16:32:05.087Z"
doc_updated_by: "CODER"
description: "Replace internal imports from commands/release/apply.preflight.ts with direct module imports, remove the barrel, and refresh the Knip baseline."
sections:
  Summary: |-
    Remove release preflight barrel
    
    Replace internal imports from commands/release/apply.preflight.ts with direct module imports, remove the barrel, and refresh the Knip baseline.
  Scope: |-
    - In scope: Replace internal imports from commands/release/apply.preflight.ts with direct module imports, remove the barrel, and refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Remove release preflight barrel".
  Plan: |-
    1. Replace imports from packages/agentplane/src/commands/release/apply.preflight.ts with direct imports from apply.preflight.plan/package/git/publish modules.
    2. Delete the now-empty release preflight barrel and update scripts/baselines/knip-baseline.json.
    3. Run focused release tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T16:31:33.697Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/apply.command.test.ts packages/agentplane/src/commands/release/plan.command.test.ts
    Result: pass
    Evidence: release apply focused suite passed: 1 file, 19 tests.
    Scope: release apply/plan behavior using the direct preflight imports.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript project references after deleting apply.preflight.ts.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=428/428.
    Scope: unused-code baseline after removing release preflight barrel.
    
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
    Scope: repo-local CLI/runtime after source deletion.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:29:17.780Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove release preflight barrel

Replace internal imports from commands/release/apply.preflight.ts with direct module imports, remove the barrel, and refresh the Knip baseline.

## Scope

- In scope: Replace internal imports from commands/release/apply.preflight.ts with direct module imports, remove the barrel, and refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Remove release preflight barrel".

## Plan

1. Replace imports from packages/agentplane/src/commands/release/apply.preflight.ts with direct imports from apply.preflight.plan/package/git/publish modules.
2. Delete the now-empty release preflight barrel and update scripts/baselines/knip-baseline.json.
3. Run focused release tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T16:31:33.697Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/apply.command.test.ts packages/agentplane/src/commands/release/plan.command.test.ts
Result: pass
Evidence: release apply focused suite passed: 1 file, 19 tests.
Scope: release apply/plan behavior using the direct preflight imports.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: repository TypeScript project references after deleting apply.preflight.ts.

Command: bun run lint:core
Result: pass
Evidence: eslint exited 0.
Scope: packages, scripts, and root lint config.

Command: node scripts/check-knip-baseline.mjs
Result: pass
Evidence: baseline OK total=428/428.
Scope: unused-code baseline after removing release preflight barrel.

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
Scope: repo-local CLI/runtime after source deletion.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:29:17.780Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
