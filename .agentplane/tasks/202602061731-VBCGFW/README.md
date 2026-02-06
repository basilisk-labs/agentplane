---
id: "202602061731-VBCGFW"
title: "FIX.md: P0/P1 guardrails + hooks alignment"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
doc_version: 2
doc_updated_at: "2026-02-06T18:27:09.035Z"
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


## Rollback Plan

Revert the per-task commits created for P0/P1 tasks; validate hooks still run and commits still gated; if protected-paths blocks workflow, disable via config flag introduced by the task (if any) or revert that specific task.

## Verify Steps

- pnpm test (or project test runner)\n- Targeted unit tests for guard/hook logic\n- Manual smoke: allowlist with ./src, delete, rename, commit-from-comment

## Notes

Completed P0.1 (KTZK7K), P0.2 (VJNCQP), P0.3 (MTEEWA), P0.4 (9Y4CR4). Next: P1.1+P1.2, P1.3, P1.4.
