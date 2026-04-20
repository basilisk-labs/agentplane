---
id: "202604200907-3C8KVB"
title: "Extract shared runner adapter base helpers"
result_summary: "Extracted common runner adapter validation and supervision state/event helpers into runner/adapters/base.ts; custom.ts and codex.ts now delegate shared execution bookkeeping to that base."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:07:24.575Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T09:13:25.339Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass."
commit:
  hash: "c9667fdd1777680472b71c7a956b6ea53268d512"
  message: "♻️ 3C8KVB runner: extract adapter base helpers"
comments:
  -
    author: "CODER"
    body: "Start: Extract common runner adapter base helpers for shared validation and supervision persistence while keeping adapter-specific execution semantics intact."
  -
    author: "CODER"
    body: "Verified: shared runner adapter base helpers preserve Codex/custom adapter behavior with focused adapter tests, typecheck, lint, format, and bootstrap passing."
events:
  -
    type: "status"
    at: "2026-04-20T09:07:36.283Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract common runner adapter base helpers for shared validation and supervision persistence while keeping adapter-specific execution semantics intact."
  -
    type: "verify"
    at: "2026-04-20T09:13:25.339Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass."
  -
    type: "status"
    at: "2026-04-20T09:13:42.650Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared runner adapter base helpers preserve Codex/custom adapter behavior with focused adapter tests, typecheck, lint, format, and bootstrap passing."
doc_version: 3
doc_updated_at: "2026-04-20T09:13:42.650Z"
doc_updated_by: "CODER"
description: "Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior."
sections:
  Summary: |-
    Extract shared runner adapter base helpers
    
    Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.
  Scope: |-
    - In scope: Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.
    - Out of scope: unrelated refactors not required for "Extract shared runner adapter base helpers".
  Plan: |-
    1. Add runner/adapters/base.ts with common bundle/invocation assertions and run-state/event helpers shared by Codex and custom adapters.
    2. Replace duplicated validation and supervision persistence code in codex.ts and custom.ts with the shared helpers.
    3. Preserve adapter-specific argv/env construction, result manifest merge semantics, and user-facing summaries.
    4. Run focused adapter tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T09:13:25.339Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:07:36.309Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract shared runner adapter base helpers

Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.

## Scope

- In scope: Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.
- Out of scope: unrelated refactors not required for "Extract shared runner adapter base helpers".

## Plan

1. Add runner/adapters/base.ts with common bundle/invocation assertions and run-state/event helpers shared by Codex and custom adapters.
2. Replace duplicated validation and supervision persistence code in codex.ts and custom.ts with the shared helpers.
3. Preserve adapter-specific argv/env construction, result manifest merge semantics, and user-facing summaries.
4. Run focused adapter tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T09:13:25.339Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:07:36.309Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
