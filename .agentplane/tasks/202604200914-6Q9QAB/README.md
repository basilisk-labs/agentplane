---
id: "202604200914-6Q9QAB"
title: "Finish runner adapter facade split"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  updated_at: "2026-04-20T09:14:37.358Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T09:20:04.753Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass. Size check: custom.ts=298 LoC, codex.ts=293 LoC."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Move adapter-specific prepare and capability helpers out of Codex/custom facade files while preserving execution behavior."
events:
  -
    type: "status"
    at: "2026-04-20T09:14:43.798Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Move adapter-specific prepare and capability helpers out of Codex/custom facade files while preserving execution behavior."
  -
    type: "verify"
    at: "2026-04-20T09:20:04.753Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass. Size check: custom.ts=298 LoC, codex.ts=293 LoC."
doc_version: 3
doc_updated_at: "2026-04-20T09:20:04.768Z"
doc_updated_by: "CODER"
description: "Complete the runner adapter decomposition by moving Codex and custom adapter prepare/capability/sandbox helpers into focused modules so codex.ts and custom.ts become smaller facades without changing execution behavior."
sections:
  Summary: |-
    Finish runner adapter facade split
    
    Complete the runner adapter decomposition by moving Codex and custom adapter prepare/capability/sandbox helpers into focused modules so codex.ts and custom.ts become smaller facades without changing execution behavior.
  Scope: |-
    - In scope: Complete the runner adapter decomposition by moving Codex and custom adapter prepare/capability/sandbox helpers into focused modules so codex.ts and custom.ts become smaller facades without changing execution behavior.
    - Out of scope: unrelated refactors not required for "Finish runner adapter facade split".
  Plan: |-
    1. Move custom adapter sandbox/capability/prepare helpers into focused custom-preparation module.
    2. Move Codex adapter sandbox/capability/prepare helpers into focused codex-preparation module.
    3. Keep execute paths in the facade files and preserve existing tests/behavior.
    4. Run focused adapter tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T09:20:04.753Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass. Size check: custom.ts=298 LoC, codex.ts=293 LoC.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:14:43.805Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Finish runner adapter facade split

Complete the runner adapter decomposition by moving Codex and custom adapter prepare/capability/sandbox helpers into focused modules so codex.ts and custom.ts become smaller facades without changing execution behavior.

## Scope

- In scope: Complete the runner adapter decomposition by moving Codex and custom adapter prepare/capability/sandbox helpers into focused modules so codex.ts and custom.ts become smaller facades without changing execution behavior.
- Out of scope: unrelated refactors not required for "Finish runner adapter facade split".

## Plan

1. Move custom adapter sandbox/capability/prepare helpers into focused custom-preparation module.
2. Move Codex adapter sandbox/capability/prepare helpers into focused codex-preparation module.
3. Keep execute paths in the facade files and preserve existing tests/behavior.
4. Run focused adapter tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T09:20:04.753Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts -> pass, 22/22. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass. Size check: custom.ts=298 LoC, codex.ts=293 LoC.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:14:43.805Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
