---
id: "202604231236-W7D50W"
title: "Audit user init flows and fix manifest failures"
result_summary: "Patched installed recipes cache normalization so interactive init drops malformed cached recipe manifests instead of failing with E_IO, added regression coverage for both legacy scenario metadata recovery and metadata-only cached manifests, and confirmed the touched init/recipes flows with focused tests and doctor."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "init"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T12:36:37.134Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T12:49:44.782Z"
  updated_by: "CODER"
  note: "Verified targeted init/cache hardening: /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- critical packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-recipes packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts; /opt/homebrew/bin/agentplane doctor."
commit:
  hash: "3feb7ce50304dcd8678ab1147b50f13a50181aff"
  message: "🐛 W7D50W init: prune invalid cached recipe manifests"
comments:
  -
    author: "CODER"
    body: "Start: audit init code paths and recipe manifest normalization, reproduce the current manifest crash, and patch the failing user-facing path with regression tests."
  -
    author: "CODER"
    body: "Verified: init no longer aborts on stale recipes cache entries that omit both prompts and scenarios; init prunes invalid cached entries, migrates legacy scenario metadata, and keeps strict validation in recipes commands."
events:
  -
    type: "status"
    at: "2026-04-23T12:36:37.727Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit init code paths and recipe manifest normalization, reproduce the current manifest crash, and patch the failing user-facing path with regression tests."
  -
    type: "verify"
    at: "2026-04-23T12:49:44.782Z"
    author: "CODER"
    state: "ok"
    note: "Verified targeted init/cache hardening: /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- critical packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-recipes packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts; /opt/homebrew/bin/agentplane doctor."
  -
    type: "status"
    at: "2026-04-23T12:49:50.846Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init no longer aborts on stale recipes cache entries that omit both prompts and scenarios; init prunes invalid cached entries, migrates legacy scenario metadata, and keeps strict validation in recipes commands."
doc_version: 3
doc_updated_at: "2026-04-23T12:49:50.847Z"
doc_updated_by: "CODER"
description: "Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes."
sections:
  Summary: |-
    Audit user init flows and fix manifest failures
    
    Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.
  Scope: |-
    - In scope: Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.
    - Out of scope: unrelated refactors not required for "Audit user init flows and fix manifest failures".
  Plan: "Goal: audit user-facing AgentPlane init flows with emphasis on recipe manifest loading, cached legacy shapes, and dialog execution paths. Scope: map init code from CLI entry through recipe cache and manifest validation, reproduce the current 'Invalid field manifest: expected prompts or scenarios' failure, patch normalization/validation so legacy or incomplete cached recipe manifests do not abort init, add regression coverage for direct cache/user scenarios, and run focused verification. Out of scope: unrelated init UX redesigns or non-init command refactors."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T12:49:44.782Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified targeted init/cache hardening: /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- critical packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-recipes packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts; /opt/homebrew/bin/agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T12:36:37.746Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Audit user init flows and fix manifest failures

Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.

## Scope

- In scope: Audit user-facing AgentPlane init/recipe-cache scenarios, identify manifest validation failure points from the code map, fix the current init crash, and add regression coverage for legacy and malformed manifest shapes.
- Out of scope: unrelated refactors not required for "Audit user init flows and fix manifest failures".

## Plan

Goal: audit user-facing AgentPlane init flows with emphasis on recipe manifest loading, cached legacy shapes, and dialog execution paths. Scope: map init code from CLI entry through recipe cache and manifest validation, reproduce the current 'Invalid field manifest: expected prompts or scenarios' failure, patch normalization/validation so legacy or incomplete cached recipe manifests do not abort init, add regression coverage for direct cache/user scenarios, and run focused verification. Out of scope: unrelated init UX redesigns or non-init command refactors.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T12:49:44.782Z — VERIFY — ok

By: CODER

Note: Verified targeted init/cache hardening: /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- critical packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-recipes packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts; /opt/homebrew/bin/agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T12:36:37.746Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
