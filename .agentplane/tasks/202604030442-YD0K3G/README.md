---
id: "202604030442-YD0K3G"
title: "F-004 Introduce precedence core"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604030441-AQRVW4"
  - "202604030442-9CJTSA"
tags:
  - "code"
  - "framework"
  - "behavior"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:02.328Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T10:23:02.019Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/behavior/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: introduce the framework precedence core so harness, recipe extensions, user rules, and builtin defaults resolve through one traced behavior model."
events:
  -
    type: "status"
    at: "2026-04-03T10:04:50.382Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce the framework precedence core so harness, recipe extensions, user rules, and builtin defaults resolve through one traced behavior model."
  -
    type: "verify"
    at: "2026-04-03T10:23:02.019Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/behavior/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000."
doc_version: 3
doc_updated_at: "2026-04-03T10:23:02.026Z"
doc_updated_by: "CODER"
description: "Formalize framework-level behavior precedence and traceable conflict resolution."
sections:
  Summary: |-
    F-004 Introduce precedence core
    
    Formalize framework-level behavior precedence and traceable conflict resolution.
  Scope: |-
    - In scope: Formalize framework-level behavior precedence and traceable conflict resolution.
    - Out of scope: unrelated refactors not required for "F-004 Introduce precedence core".
  Plan: |-
    1. Define the precedence order harness -> extension layer -> user rules -> builtin defaults in framework code.
    2. Build a reusable resolver with trace output for conflicts and winning inputs.
    3. Connect the first runtime call sites so later recipe integration can plug into the core model unchanged.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T10:23:02.019Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/behavior/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T10:04:50.400Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-004 Introduce precedence core

Formalize framework-level behavior precedence and traceable conflict resolution.

## Scope

- In scope: Formalize framework-level behavior precedence and traceable conflict resolution.
- Out of scope: unrelated refactors not required for "F-004 Introduce precedence core".

## Plan

1. Define the precedence order harness -> extension layer -> user rules -> builtin defaults in framework code.
2. Build a reusable resolver with trace output for conflicts and winning inputs.
3. Connect the first runtime call sites so later recipe integration can plug into the core model unchanged.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T10:23:02.019Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/behavior/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T10:04:50.400Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
