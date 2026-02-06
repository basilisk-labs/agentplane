---
id: "202602061731-VBCGFW"
title: "FIX.md: P0/P1 guardrails + hooks alignment"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "workflow"
  - "git"
  - "cli"
  - "hooks"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T17:32:19.880Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved plan: implement FIX.md P0/P1 via atomic tasks and per-task verify/commit/finish."
verification:
  state: "ok"
  updated_at: "2026-02-06T19:11:17.543Z"
  updated_by: "ORCHESTRATOR"
  note: "All FIX.md P0/P1 atomic tasks completed (P0.1..P0.4, P1.1..P1.4). Verified via bun run test:core, bun run build, bun run test:cli:core, bun run lint; each subtask has verify ok recorded."
commit:
  hash: "6ca05404f567702830b30798a31c6543c65a9f24"
  message: "✨ NG820E docs"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: completed FIX.md P0/P1 guardrails and hooks alignment via atomic tasks; core/CLI tests and lint pass; protected paths + base pinning now enforced. See Notes/Verification for commands and key commits."
doc_version: 2
doc_updated_at: "2026-02-06T19:11:22.958Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement P0/P1 fixes from FIX.md: guard commit env bug, allowlist staging correctness, allow prefix normalization, robust git path parsing, commit subject policy hardening, hook/CLI drift fixes, branch_pr base pin enforcement, protected paths policy."
id_source: "generated"
---
## Summary

Tracking task for implementing FIX.md P0/P1 guardrails and hooks alignment in AgentPlane CLI.

## Scope

Implement P0/P1 items from FIX.md in code and hooks; add/adjust tests as needed; keep changes minimal and deterministic.

## Plan

1) Create atomic tasks for each P0/P1 fix.\n2) For each task: set plan, approve, start, implement, run tests, record verify ok, commit via guard with tight allowlist, finish.\n3) Ensure hooks and CLI share the same commit subject validation.

## Risks

Risk: hooks/CLI drift causes confusing failures; robust git path parsing must preserve semantics for renames/deletes; protected paths policy can block legit changes unless override flags are explicit.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T19:11:17.543Z — VERIFY — ok

By: ORCHESTRATOR

Note: All FIX.md P0/P1 atomic tasks completed (P0.1..P0.4, P1.1..P1.4). Verified via bun run test:core, bun run build, bun run test:cli:core, bun run lint; each subtask has verify ok recorded.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the per-task commits created for P0/P1 tasks; validate hooks still run and commits still gated; if protected-paths blocks workflow, disable via config flag introduced by the task (if any) or revert that specific task.

## Verify Steps

- pnpm test (or project test runner)\n- Targeted unit tests for guard/hook logic\n- Manual smoke: allowlist with ./src, delete, rename, commit-from-comment

## Notes

Completed: P0.1 KTZK7K, P0.2 VJNCQP, P0.3 MTEEWA, P0.4 9Y4CR4, P1.1 F17C02, P1.2 RA99FE, P1.3 QQVMHA, P1.4 NG820E. Key commits: QQVMHA=29604e30fbcd, NG820E=a6b1850439ea.
