---
id: "202602081505-8SVDY0"
title: "Close commits: deterministic message builder"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081505-X2E2QD"
  - "202602081505-GYB2MA"
  - "202602081506-R18Y1Q"
  - "202602081506-JYTFF2"
tags:
  - "cli"
  - "code"
  - "workflow"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T15:06:59.854Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: contract + deterministic builder; result_summary required for non-spike finish; tests required."
verification:
  state: "ok"
  updated_at: "2026-02-08T15:45:12.018Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run test:full. Close commits are now deterministic and policy-compliant; finish enforces a one-line result summary; docs and tests prevent drift."
commit:
  hash: "d84e59bc9b509bc76f02a18680a78651288456f0"
  message: "✨ JYTFF2 testing: enforce close commit contract"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement deterministic close commit messages derived from task snapshot + verification + git diff, and require a one-line result summary on finish for non-spike tasks."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:full; implemented commit --close deterministic message builder, enforced --result for non-spike finish, updated command guide, and added tests to prevent contract drift."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T15:45:18.912Z"
doc_updated_by: "ORCHESTRATOR"
description: "Replace generic close commit subjects with deterministic, informative close messages built from task snapshot + verification + git diff summary; enforce --result on finish for non-spike tasks; add tests and docs."
id_source: "generated"
---
## Summary

Replace generic close commit messages with deterministic, informative close commit messages built from task state + verification + git diff summary.

## Scope

In scope:\n- Close commit message format and generation logic\n- Finish command: capture one-line result summary for non-spike tasks\n- Commit command: add deterministic close mode (stages only task README)\n- Docs explaining .js import specifiers in TS sources\n- Tests enforcing the contract\n\nOut of scope:\n- Rewriting unrelated git/guard policies\n- Changing task backend persistence model

## Plan

Implement deterministic, informative close commit messages built from task state + verification + git diff summary.\n\nDecomposition:\n- X2E2QD: docs for TS ESM import specifiers (.js in TS sources)\n- GYB2MA: finish requires --result for non-spike tasks; store result_summary\n- R18Y1Q: add agentplane commit --close that generates close commit message and commits task README\n- JYTFF2: tests enforcing the close message contract and determinism\n\nVerification: bun run typecheck; bun run lint; bun run test:full.

## Risks

- Behavior drift risk: close messages must remain deterministic and schema-driven.\n- Back-compat risk: older tasks without result_summary need a clear fallback marker.\n- Git parsing brittleness: key files and stats parsing must handle renames/deletes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T15:45:12.018Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run test:full. Close commits are now deterministic and policy-compliant; finish enforces a one-line result summary; docs and tests prevent drift.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T15:43:49.262Z, excerpt_hash=sha256:b7cd1191f3e731f3d4fe4e1d538a1849e0a4fc1313346eb6bbdec3ee1d88e973

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commits for the affected tasks and re-run bun run test:full.\n- If contract changes are needed, update docs + tests first, then change implementation.

## Verify Steps

### Scope
- Deterministic close commit message builder.
- Finish requires a one-line result summary for non-spike tasks.
- Tests and docs updated to prevent drift.

### Checks
- bun run typecheck
- bun run lint
- bun run test:full

### Pass criteria
- All checks pass.
- Close commits are policy-compliant and informative.
- Documentation matches CLI behavior.
