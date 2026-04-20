---
id: "202604191643-CDSPNH"
title: "Emit structured trace events behind AGENTPLANE_TRACE"
result_summary: "Added opt-in structured trace events across runtime, backend, git, PR sync, and task finish surfaces."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "logging"
  - "observability"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T12:07:46.334Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T12:14:45.800Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/core/src/logger.test.ts packages/agentplane/src/shared/trace-events.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass; Evidence: 3 files, 41 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run format:check; Result: pass; Evidence: all files matched Prettier. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime verified."
commit:
  hash: "6bc97352626274785d66d77c7a9f74cfc5a996d6"
  message: "🔭 CDSPNH logging: emit structured trace events"
comments:
  -
    author: "CODER"
    body: "Start: Implement opt-in structured trace output for observability without changing normal command output, then verify trace gating and task-finish relevant behavior."
  -
    author: "CODER"
    body: "Verified: structured AGENTPLANE_TRACE events are opt-in, task finish emits start/completion events, and the focused tests plus typecheck, format, lint, and bootstrap all pass."
events:
  -
    type: "status"
    at: "2026-04-20T12:08:08.314Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement opt-in structured trace output for observability without changing normal command output, then verify trace gating and task-finish relevant behavior."
  -
    type: "verify"
    at: "2026-04-20T12:14:45.800Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/core/src/logger.test.ts packages/agentplane/src/shared/trace-events.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass; Evidence: 3 files, 41 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run format:check; Result: pass; Evidence: all files matched Prettier. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime verified."
  -
    type: "status"
    at: "2026-04-20T12:15:04.019Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: structured AGENTPLANE_TRACE events are opt-in, task finish emits start/completion events, and the focused tests plus typecheck, format, lint, and bootstrap all pass."
doc_version: 3
doc_updated_at: "2026-04-20T12:15:04.020Z"
doc_updated_by: "CODER"
description: "Epic H′. Add structured trace event output for runtime, backend, git, and PR sync paths."
sections:
  Summary: |-
    Emit structured trace events behind AGENTPLANE_TRACE
    
    Epic H′. Add structured trace event output for runtime, backend, git, and PR sync paths.
  Scope: |-
    - In scope: Epic H′. Add structured trace event output for runtime, backend, git, and PR sync paths.
    - Out of scope: unrelated refactors not required for "Emit structured trace events behind AGENTPLANE_TRACE".
  Plan: "Implement AGENTPLANE_TRACE as an opt-in structured NDJSON event channel using the existing logger surface. Keep default CLI output unchanged when the flag is absent. Add focused tests for trace gating and at least one task-finish relevant emission path, then run targeted tests plus repository quality gates required for code changes."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T12:14:45.800Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/logger.test.ts packages/agentplane/src/shared/trace-events.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass; Evidence: 3 files, 41 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run format:check; Result: pass; Evidence: all files matched Prettier. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:08:08.392Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Emit structured trace events behind AGENTPLANE_TRACE

Epic H′. Add structured trace event output for runtime, backend, git, and PR sync paths.

## Scope

- In scope: Epic H′. Add structured trace event output for runtime, backend, git, and PR sync paths.
- Out of scope: unrelated refactors not required for "Emit structured trace events behind AGENTPLANE_TRACE".

## Plan

Implement AGENTPLANE_TRACE as an opt-in structured NDJSON event channel using the existing logger surface. Keep default CLI output unchanged when the flag is absent. Add focused tests for trace gating and at least one task-finish relevant emission path, then run targeted tests plus repository quality gates required for code changes.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T12:14:45.800Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/logger.test.ts packages/agentplane/src/shared/trace-events.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass; Evidence: 3 files, 41 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run format:check; Result: pass; Evidence: all files matched Prettier. Command: bun run lint:core; Result: pass; Evidence: eslint exited 0. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T12:08:08.392Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
