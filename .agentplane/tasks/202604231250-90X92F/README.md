---
id: "202604231250-90X92F"
title: "Preflight init hook conflicts before apply"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "init"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T12:50:32.821Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T13:02:31.543Z"
  updated_by: "CODER"
  note: "Verified hook-conflict fail-fast init hardening: /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run framework:dev:bootstrap; /opt/homebrew/bin/agentplane doctor."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit hook-install failure timing inside init, add a preflight/probe path that detects hook or shim conflicts before file writes, and cover both legacy and v2 init flows with focused regression tests."
events:
  -
    type: "status"
    at: "2026-04-23T12:50:37.382Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit hook-install failure timing inside init, add a preflight/probe path that detects hook or shim conflicts before file writes, and cover both legacy and v2 init flows with focused regression tests."
  -
    type: "verify"
    at: "2026-04-23T13:02:31.543Z"
    author: "CODER"
    state: "ok"
    note: "Verified hook-conflict fail-fast init hardening: /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run framework:dev:bootstrap; /opt/homebrew/bin/agentplane doctor."
doc_version: 3
doc_updated_at: "2026-04-23T13:02:31.569Z"
doc_updated_by: "CODER"
description: "Audit init hook installation lifecycle, detect hook/shim conflicts before init writes project files, fail before mutations when --hooks=true would be blocked, and add focused regression coverage for both legacy and v2 init paths."
sections:
  Summary: |-
    Preflight init hook conflicts before apply
    
    Audit init hook installation lifecycle, detect hook/shim conflicts before init writes project files, fail before mutations when --hooks=true would be blocked, and add focused regression coverage for both legacy and v2 init paths.
  Scope: |-
    - In scope: Audit init hook installation lifecycle, detect hook/shim conflicts before init writes project files, fail before mutations when --hooks=true would be blocked, and add focused regression coverage for both legacy and v2 init paths.
    - Out of scope: unrelated refactors not required for "Preflight init hook conflicts before apply".
  Plan: "Goal: make init fail fast on hook-install conflicts before it writes project files. Scope: map both legacy and v2 init apply paths, extract or add a dry-run/probe path for hook installability, surface conflicts for managed hook/shim collisions before file writes, and add focused regressions that prove init aborts before mutating .agentplane when hooks would fail. Out of scope: broader hook self-heal or doctor auto-fix behavior."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T13:02:31.543Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified hook-conflict fail-fast init hardening: /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run framework:dev:bootstrap; /opt/homebrew/bin/agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T12:50:37.403Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Preflight init hook conflicts before apply

Audit init hook installation lifecycle, detect hook/shim conflicts before init writes project files, fail before mutations when --hooks=true would be blocked, and add focused regression coverage for both legacy and v2 init paths.

## Scope

- In scope: Audit init hook installation lifecycle, detect hook/shim conflicts before init writes project files, fail before mutations when --hooks=true would be blocked, and add focused regression coverage for both legacy and v2 init paths.
- Out of scope: unrelated refactors not required for "Preflight init hook conflicts before apply".

## Plan

Goal: make init fail fast on hook-install conflicts before it writes project files. Scope: map both legacy and v2 init apply paths, extract or add a dry-run/probe path for hook installability, surface conflicts for managed hook/shim collisions before file writes, and add focused regressions that prove init aborts before mutating .agentplane when hooks would fail. Out of scope: broader hook self-heal or doctor auto-fix behavior.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T13:02:31.543Z — VERIFY — ok

By: CODER

Note: Verified hook-conflict fail-fast init hardening: /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts; /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; /Users/densmirnov/.bun/bin/bun run format:check; /Users/densmirnov/.bun/bin/bun run typecheck; /Users/densmirnov/.bun/bin/bun run framework:dev:bootstrap; /opt/homebrew/bin/agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T12:50:37.403Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
