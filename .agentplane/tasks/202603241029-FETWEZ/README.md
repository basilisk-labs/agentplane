---
id: "202603241029-FETWEZ"
title: "Add runner trace retention, compression, and redaction policy"
result_summary: "Add configurable runner trace retention, gzip compression, and redaction with CLI fallback for compressed trace artifacts."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603241029-A28MVW"
tags:
  - "code"
  - "runner"
  - "traces"
  - "config"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T12:01:37.481Z"
  updated_by: "ORCHESTRATOR"
  note: "Trace policy scope approved for retention, compression, and redaction"
verification:
  state: "ok"
  updated_at: "2026-03-24T12:02:05.268Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts
    Result: pass
    Evidence: 27 tests passed, including new retention/compression/redaction coverage and config-level validation for runner.trace policy defaults and invalid cases.
    Scope: core config plus runner trace-policy finalization.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 35 CLI tests passed, including a path where task run trace reads agent-trace.jsonl.gz after raw trace removal and shows redacted content without exposing the configured secret token.
    Scope: CLI runner inspection and compressed trace fallback.
    
    Command: bun run schemas:check && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: schema mirrors stayed in sync and both package builds exited with code 0.
    Scope: generated config schema artifacts plus touched runtime files.
commit:
  hash: "c805ff9379d0fe03b27e91c3a3d0262156be1072"
  message: "✅ FETWEZ code: done"
comments:
  -
    author: "CODER"
    body: "Start: add runner trace retention, gzip compression, and literal redaction policy while keeping compressed-trace inspection and existing task-facing summaries deterministic."
  -
    author: "CODER"
    body: "Verified: add runner trace retention, gzip compression, and literal redaction controls while keeping inspection commands usable through compressed-trace fallback and without weakening existing task-facing summary guarantees."
events:
  -
    type: "verify"
    at: "2026-03-24T12:01:11.374Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts
      Result: pass
      Evidence: 27 tests passed, including new retention/compression/redaction coverage and config-level validation for runner.trace policy defaults and invalid cases.
      Scope: core config plus runner trace-policy finalization.
      
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
      Result: pass
      Evidence: 35 CLI tests passed, including a path where task run trace reads agent-trace.jsonl.gz after raw trace removal and shows redacted content without exposing the configured secret token.
      Scope: CLI runner inspection and compressed trace fallback.
      
      Command: bun run schemas:check && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: schema mirrors stayed in sync and both package builds exited with code 0.
      Scope: generated config schema artifacts plus touched runtime files.
  -
    type: "status"
    at: "2026-03-24T12:01:37.878Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add runner trace retention, gzip compression, and literal redaction policy while keeping compressed-trace inspection and existing task-facing summaries deterministic."
  -
    type: "verify"
    at: "2026-03-24T12:02:05.268Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts
      Result: pass
      Evidence: 27 tests passed, including new retention/compression/redaction coverage and config-level validation for runner.trace policy defaults and invalid cases.
      Scope: core config plus runner trace-policy finalization.
      
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
      Result: pass
      Evidence: 35 CLI tests passed, including a path where task run trace reads agent-trace.jsonl.gz after raw trace removal and shows redacted content without exposing the configured secret token.
      Scope: CLI runner inspection and compressed trace fallback.
      
      Command: bun run schemas:check && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: schema mirrors stayed in sync and both package builds exited with code 0.
      Scope: generated config schema artifacts plus touched runtime files.
  -
    type: "status"
    at: "2026-03-24T12:04:45.327Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: add runner trace retention, gzip compression, and literal redaction controls while keeping inspection commands usable through compressed-trace fallback and without weakening existing task-facing summary guarantees."
doc_version: 3
doc_updated_at: "2026-03-24T12:04:45.327Z"
doc_updated_by: "CODER"
description: "Introduce configurable retention, optional compression, and redaction policy for raw runner trace artifacts without weakening existing trace and summary guarantees."
sections:
  Summary: |-
    Add runner trace retention, compression, and redaction policy
    
    Introduce configurable retention, optional compression, and redaction policy for raw runner trace artifacts without weakening existing trace and summary guarantees.
  Scope: |-
    - In scope: Introduce configurable retention, optional compression, and redaction policy for raw runner trace artifacts without weakening existing trace and summary guarantees.
    - Out of scope: unrelated refactors not required for "Add runner trace retention, compression, and redaction policy".
  Plan: "1. Inspect the current runner trace config, trace writers, and artifact reporting flow. 2. Extend trace policy with retention, compression, and redaction controls while keeping raw-trace defaults compatible. 3. Apply the policy in trace-writing and artifact finalization paths with focused tests for retention, compression selection, and redaction. 4. Run targeted checks, record verification evidence, and finish with a single task-scoped commit."
  Verify Steps: |-
    1. Run focused trace-policy tests. Expected: retention, compression, and redaction settings are honored deterministically without breaking existing raw trace capture.
    2. Exercise a runner CLI or adapter path that emits trace output. Expected: configured trace artifacts are retained or compressed as requested, and redaction removes configured secret patterns from persisted trace content.
    3. Run source build for @agentplaneorg/core and agentplane. Expected: touched config, runner, and CLI files build without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T12:01:11.374Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts
    Result: pass
    Evidence: 27 tests passed, including new retention/compression/redaction coverage and config-level validation for runner.trace policy defaults and invalid cases.
    Scope: core config plus runner trace-policy finalization.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 35 CLI tests passed, including a path where task run trace reads agent-trace.jsonl.gz after raw trace removal and shows redacted content without exposing the configured secret token.
    Scope: CLI runner inspection and compressed trace fallback.
    
    Command: bun run schemas:check && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: schema mirrors stayed in sync and both package builds exited with code 0.
    Scope: generated config schema artifacts plus touched runtime files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T11:50:38.968Z, excerpt_hash=sha256:31e0ecea7765baf5656cb7d4d95f727d8df4365ef2e9d7f732a9b4db41f8fb8b
    
    #### 2026-03-24T12:02:05.268Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts
    Result: pass
    Evidence: 27 tests passed, including new retention/compression/redaction coverage and config-level validation for runner.trace policy defaults and invalid cases.
    Scope: core config plus runner trace-policy finalization.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 35 CLI tests passed, including a path where task run trace reads agent-trace.jsonl.gz after raw trace removal and shows redacted content without exposing the configured secret token.
    Scope: CLI runner inspection and compressed trace fallback.
    
    Command: bun run schemas:check && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: schema mirrors stayed in sync and both package builds exited with code 0.
    Scope: generated config schema artifacts plus touched runtime files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:01:37.879Z, excerpt_hash=sha256:31e0ecea7765baf5656cb7d4d95f727d8df4365ef2e9d7f732a9b4db41f8fb8b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add runner trace retention, compression, and redaction policy

Introduce configurable retention, optional compression, and redaction policy for raw runner trace artifacts without weakening existing trace and summary guarantees.

## Scope

- In scope: Introduce configurable retention, optional compression, and redaction policy for raw runner trace artifacts without weakening existing trace and summary guarantees.
- Out of scope: unrelated refactors not required for "Add runner trace retention, compression, and redaction policy".

## Plan

1. Inspect the current runner trace config, trace writers, and artifact reporting flow. 2. Extend trace policy with retention, compression, and redaction controls while keeping raw-trace defaults compatible. 3. Apply the policy in trace-writing and artifact finalization paths with focused tests for retention, compression selection, and redaction. 4. Run targeted checks, record verification evidence, and finish with a single task-scoped commit.

## Verify Steps

1. Run focused trace-policy tests. Expected: retention, compression, and redaction settings are honored deterministically without breaking existing raw trace capture.
2. Exercise a runner CLI or adapter path that emits trace output. Expected: configured trace artifacts are retained or compressed as requested, and redaction removes configured secret patterns from persisted trace content.
3. Run source build for @agentplaneorg/core and agentplane. Expected: touched config, runner, and CLI files build without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T12:01:11.374Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts
Result: pass
Evidence: 27 tests passed, including new retention/compression/redaction coverage and config-level validation for runner.trace policy defaults and invalid cases.
Scope: core config plus runner trace-policy finalization.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
Result: pass
Evidence: 35 CLI tests passed, including a path where task run trace reads agent-trace.jsonl.gz after raw trace removal and shows redacted content without exposing the configured secret token.
Scope: CLI runner inspection and compressed trace fallback.

Command: bun run schemas:check && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: schema mirrors stayed in sync and both package builds exited with code 0.
Scope: generated config schema artifacts plus touched runtime files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T11:50:38.968Z, excerpt_hash=sha256:31e0ecea7765baf5656cb7d4d95f727d8df4365ef2e9d7f732a9b4db41f8fb8b

#### 2026-03-24T12:02:05.268Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts
Result: pass
Evidence: 27 tests passed, including new retention/compression/redaction coverage and config-level validation for runner.trace policy defaults and invalid cases.
Scope: core config plus runner trace-policy finalization.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
Result: pass
Evidence: 35 CLI tests passed, including a path where task run trace reads agent-trace.jsonl.gz after raw trace removal and shows redacted content without exposing the configured secret token.
Scope: CLI runner inspection and compressed trace fallback.

Command: bun run schemas:check && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: schema mirrors stayed in sync and both package builds exited with code 0.
Scope: generated config schema artifacts plus touched runtime files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:01:37.879Z, excerpt_hash=sha256:31e0ecea7765baf5656cb7d4d95f727d8df4365ef2e9d7f732a9b4db41f8fb8b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
