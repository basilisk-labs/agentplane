---
id: "202603301857-SZATBJ"
title: "Audit thin `*.command.ts` and `*.run.ts` wrappers"
result_summary: "integrate: squash task/202603301857-SZATBJ/audit-cli-wrappers"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603301857-161TFE"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T12:03:43.288Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:06:47.626Z"
  updated_by: "CODER"
  note: |-
    Command: find packages/agentplane/src -name '*.command.ts' -o -name '*.run.ts' | sort; Result: pass; Evidence: enumerated the remaining wrapper surface for audit classification. Scope: command/module tree inventory.
    Command: sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts && sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/task.ts; Result: pass; Evidence: runtime catalog imports .spec/.run modules or direct command handlers, bypassing alias files like start.command.ts, finish.command.ts, task/list.command.ts, and task/search.command.ts. Scope: prove which wrappers are runtime-dead versus still on the live path.
    Command: rg -n "doctor\.command|recipes/install\.command|verify\.command" packages/agentplane/src -g '*test.ts' -g '*helpers.ts' -S; Result: pass; Evidence: remaining deep imports are test/helper-only in doctor.command.test.ts, doctor.fast.test.ts, recipes.test-helpers.ts, and workflow.verify-hooks.test.ts. Scope: record hidden dependencies that R5.4 must rewrite when collapsing low-value wrappers.
    Command: git diff --stat; Result: pass; Evidence: README-only diff for the audit artifact. Scope: confirm this task stays a classification artifact and does not widen into implementation work.
commit:
  hash: "b6dfd0b009986403b4ab422de5fe54facac1f0e1"
  message: "🧩 SZATBJ integrate: squash task/202603301857-SZATBJ/audit-cli-wrappers"
comments:
  -
    author: "CODER"
    body: "Start: classify remaining thin *.command.ts and *.run.ts files into meaningful CLI boundaries versus removable indirection, and record the audit artifact that R5.4 will consume."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-SZATBJ/pr."
events:
  -
    type: "status"
    at: "2026-03-31T12:04:39.892Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify remaining thin *.command.ts and *.run.ts files into meaningful CLI boundaries versus removable indirection, and record the audit artifact that R5.4 will consume."
  -
    type: "verify"
    at: "2026-03-31T12:05:34.180Z"
    author: "CODER"
    state: "ok"
    note: "Command: find packages/agentplane/src -name '*.command.ts' -o -name '*.run.ts' | sort; Result: pass; Evidence: enumerated the remaining wrapper surface for audit classification. Scope: command/module tree inventory. Command: sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts && sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/task.ts; Result: pass; Evidence: runtime catalog imports  plus  or direct command handlers, bypassing top-level alias files such as , , , and . Scope: prove which wrappers are runtime-dead versus still on the live path. Command: rg -n \"doctor\\.command|recipes/install\\.command|verify\\.command\" packages/agentplane/src -g '*test.ts' -g '*helpers.ts' -S; Result: pass; Evidence: remaining deep imports are test/helper-only (, , , ). Scope: record hidden dependencies that R5.4 must rewrite when collapsing low-value wrappers. Command: git diff --stat; Result: pass; Evidence: README-only diff for the audit artifact. Scope: confirm this task stays a classification artifact and does not widen into implementation work."
  -
    type: "verify"
    at: "2026-03-31T12:06:47.626Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: find packages/agentplane/src -name '*.command.ts' -o -name '*.run.ts' | sort; Result: pass; Evidence: enumerated the remaining wrapper surface for audit classification. Scope: command/module tree inventory.
      Command: sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts && sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/task.ts; Result: pass; Evidence: runtime catalog imports .spec/.run modules or direct command handlers, bypassing alias files like start.command.ts, finish.command.ts, task/list.command.ts, and task/search.command.ts. Scope: prove which wrappers are runtime-dead versus still on the live path.
      Command: rg -n "doctor\.command|recipes/install\.command|verify\.command" packages/agentplane/src -g '*test.ts' -g '*helpers.ts' -S; Result: pass; Evidence: remaining deep imports are test/helper-only in doctor.command.test.ts, doctor.fast.test.ts, recipes.test-helpers.ts, and workflow.verify-hooks.test.ts. Scope: record hidden dependencies that R5.4 must rewrite when collapsing low-value wrappers.
      Command: git diff --stat; Result: pass; Evidence: README-only diff for the audit artifact. Scope: confirm this task stays a classification artifact and does not widen into implementation work.
  -
    type: "status"
    at: "2026-03-31T12:08:05.648Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-SZATBJ/pr."
doc_version: 3
doc_updated_at: "2026-03-31T12:08:05.653Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection."
sections:
  Summary: |-
    Audit thin `*.command.ts` and `*.run.ts` wrappers
    
    Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.
  Scope: |-
    - In scope: Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.
    - Out of scope: unrelated refactors not required for "Audit thin `*.command.ts` and `*.run.ts` wrappers".
  Plan: |-
    1. Audit the current implementation and tests around command/module tree to isolate the exact behavior gap for R5.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: every wrapper file is classified as either meaningful boundary or removable indirection.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering command/module tree. Expected: the behavior described by R5.3 is observable and stable.
    2. Inspect the final diff for 202603301857-SZATBJ. Expected: scope stays limited to command/module tree plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: every wrapper file is classified as either meaningful boundary or removable indirection.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:05:34.180Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: find packages/agentplane/src -name '*.command.ts' -o -name '*.run.ts' | sort; Result: pass; Evidence: enumerated the remaining wrapper surface for audit classification. Scope: command/module tree inventory. Command: sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts && sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/task.ts; Result: pass; Evidence: runtime catalog imports  plus  or direct command handlers, bypassing top-level alias files such as , , , and . Scope: prove which wrappers are runtime-dead versus still on the live path. Command: rg -n "doctor\.command|recipes/install\.command|verify\.command" packages/agentplane/src -g '*test.ts' -g '*helpers.ts' -S; Result: pass; Evidence: remaining deep imports are test/helper-only (, , , ). Scope: record hidden dependencies that R5.4 must rewrite when collapsing low-value wrappers. Command: git diff --stat; Result: pass; Evidence: README-only diff for the audit artifact. Scope: confirm this task stays a classification artifact and does not widen into implementation work.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:04:39.894Z, excerpt_hash=sha256:cec74e0d3280282bd4d8e0d3f2dac4bcdeb0fc617854e9baabccc3558394331b
    
    ### 2026-03-31T12:06:47.626Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: find packages/agentplane/src -name '*.command.ts' -o -name '*.run.ts' | sort; Result: pass; Evidence: enumerated the remaining wrapper surface for audit classification. Scope: command/module tree inventory.
    Command: sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts && sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/task.ts; Result: pass; Evidence: runtime catalog imports .spec/.run modules or direct command handlers, bypassing alias files like start.command.ts, finish.command.ts, task/list.command.ts, and task/search.command.ts. Scope: prove which wrappers are runtime-dead versus still on the live path.
    Command: rg -n "doctor\.command|recipes/install\.command|verify\.command" packages/agentplane/src -g '*test.ts' -g '*helpers.ts' -S; Result: pass; Evidence: remaining deep imports are test/helper-only in doctor.command.test.ts, doctor.fast.test.ts, recipes.test-helpers.ts, and workflow.verify-hooks.test.ts. Scope: record hidden dependencies that R5.4 must rewrite when collapsing low-value wrappers.
    Command: git diff --stat; Result: pass; Evidence: README-only diff for the audit artifact. Scope: confirm this task stays a classification artifact and does not widen into implementation work.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:05:34.183Z, excerpt_hash=sha256:cec74e0d3280282bd4d8e0d3f2dac4bcdeb0fc617854e9baabccc3558394331b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Meaningful boundaries that should stay thin: group-root and subgroup usage boundaries that own user-facing subcommand errors and lazy child discovery. This includes `packages/agentplane/src/commands/task/task.command.ts`, `packages/agentplane/src/commands/task/plan.command.ts`, `packages/agentplane/src/commands/task/doc.command.ts`, `packages/agentplane/src/commands/task/verify.command.ts`, `packages/agentplane/src/commands/task/handoff.command.ts`, `packages/agentplane/src/commands/guard/guard.command.ts`, `packages/agentplane/src/commands/hooks/hooks.command.ts`, `packages/agentplane/src/commands/workflow.command.ts`, `packages/agentplane/src/commands/release/release.command.ts`, `packages/agentplane/src/commands/recipes/recipes.command.ts`, `packages/agentplane/src/commands/recipes/cache.command.ts`, and `packages/agentplane/src/commands/scenario/scenario.command.ts`.
    - Meaningful thin runner that still owns command-local behavior: `packages/agentplane/src/commands/finish.run.ts`, because it still throws CLI-specific usage errors when no task ids are provided.
    - Runtime-dead alias wrappers classified as removable indirection: `packages/agentplane/src/commands/block.command.ts`, `packages/agentplane/src/commands/start.command.ts`, `packages/agentplane/src/commands/finish.command.ts`, `packages/agentplane/src/commands/verify.command.ts`, `packages/agentplane/src/commands/task/list.command.ts`, `packages/agentplane/src/commands/task/next.command.ts`, `packages/agentplane/src/commands/task/search.command.ts`, `packages/agentplane/src/commands/task/show.command.ts`, `packages/agentplane/src/commands/doctor.command.ts`, and `packages/agentplane/src/commands/recipes/install.command.ts`.
    - Runtime-live but still low-value wrappers classified as removal candidates for `R5.4`: `packages/agentplane/src/commands/task/list.run.ts`, `packages/agentplane/src/commands/task/next.run.ts`, `packages/agentplane/src/commands/task/search.run.ts`, `packages/agentplane/src/commands/task/show.run.ts`, `packages/agentplane/src/commands/task/new.command.ts`, `packages/agentplane/src/commands/commit.command.ts`, `packages/agentplane/src/commands/start.run.ts`, `packages/agentplane/src/commands/block.run.ts`, and `packages/agentplane/src/commands/verify.run.ts`.
    - Hidden premise for `R5.4`: several removable alias files still have test-only deep imports. The runtime catalog already bypasses them, but collapsing them requires updating tests that import `doctor.command.ts`, `recipes/install.command.ts`, or `verify.command.ts` directly.
    - External-risk note: deleting runtime-dead alias files is low-risk inside the package because `packages/agentplane/package.json` does not publish those internal paths as public exports, but it could still break undocumented deep imports outside the repo.
id_source: "generated"
---
## Summary

Audit thin `*.command.ts` and `*.run.ts` wrappers

Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.

## Scope

- In scope: Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.
- Out of scope: unrelated refactors not required for "Audit thin `*.command.ts` and `*.run.ts` wrappers".

## Plan

1. Audit the current implementation and tests around command/module tree to isolate the exact behavior gap for R5.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: every wrapper file is classified as either meaningful boundary or removable indirection.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering command/module tree. Expected: the behavior described by R5.3 is observable and stable.
2. Inspect the final diff for 202603301857-SZATBJ. Expected: scope stays limited to command/module tree plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: every wrapper file is classified as either meaningful boundary or removable indirection.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:05:34.180Z — VERIFY — ok

By: CODER

Note: Command: find packages/agentplane/src -name '*.command.ts' -o -name '*.run.ts' | sort; Result: pass; Evidence: enumerated the remaining wrapper surface for audit classification. Scope: command/module tree inventory. Command: sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts && sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/task.ts; Result: pass; Evidence: runtime catalog imports  plus  or direct command handlers, bypassing top-level alias files such as , , , and . Scope: prove which wrappers are runtime-dead versus still on the live path. Command: rg -n "doctor\.command|recipes/install\.command|verify\.command" packages/agentplane/src -g '*test.ts' -g '*helpers.ts' -S; Result: pass; Evidence: remaining deep imports are test/helper-only (, , , ). Scope: record hidden dependencies that R5.4 must rewrite when collapsing low-value wrappers. Command: git diff --stat; Result: pass; Evidence: README-only diff for the audit artifact. Scope: confirm this task stays a classification artifact and does not widen into implementation work.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:04:39.894Z, excerpt_hash=sha256:cec74e0d3280282bd4d8e0d3f2dac4bcdeb0fc617854e9baabccc3558394331b

### 2026-03-31T12:06:47.626Z — VERIFY — ok

By: CODER

Note: Command: find packages/agentplane/src -name '*.command.ts' -o -name '*.run.ts' | sort; Result: pass; Evidence: enumerated the remaining wrapper surface for audit classification. Scope: command/module tree inventory.
Command: sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts && sed -n '1,140p' packages/agentplane/src/cli/run-cli/command-catalog/task.ts; Result: pass; Evidence: runtime catalog imports .spec/.run modules or direct command handlers, bypassing alias files like start.command.ts, finish.command.ts, task/list.command.ts, and task/search.command.ts. Scope: prove which wrappers are runtime-dead versus still on the live path.
Command: rg -n "doctor\.command|recipes/install\.command|verify\.command" packages/agentplane/src -g '*test.ts' -g '*helpers.ts' -S; Result: pass; Evidence: remaining deep imports are test/helper-only in doctor.command.test.ts, doctor.fast.test.ts, recipes.test-helpers.ts, and workflow.verify-hooks.test.ts. Scope: record hidden dependencies that R5.4 must rewrite when collapsing low-value wrappers.
Command: git diff --stat; Result: pass; Evidence: README-only diff for the audit artifact. Scope: confirm this task stays a classification artifact and does not widen into implementation work.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:05:34.183Z, excerpt_hash=sha256:cec74e0d3280282bd4d8e0d3f2dac4bcdeb0fc617854e9baabccc3558394331b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Meaningful boundaries that should stay thin: group-root and subgroup usage boundaries that own user-facing subcommand errors and lazy child discovery. This includes `packages/agentplane/src/commands/task/task.command.ts`, `packages/agentplane/src/commands/task/plan.command.ts`, `packages/agentplane/src/commands/task/doc.command.ts`, `packages/agentplane/src/commands/task/verify.command.ts`, `packages/agentplane/src/commands/task/handoff.command.ts`, `packages/agentplane/src/commands/guard/guard.command.ts`, `packages/agentplane/src/commands/hooks/hooks.command.ts`, `packages/agentplane/src/commands/workflow.command.ts`, `packages/agentplane/src/commands/release/release.command.ts`, `packages/agentplane/src/commands/recipes/recipes.command.ts`, `packages/agentplane/src/commands/recipes/cache.command.ts`, and `packages/agentplane/src/commands/scenario/scenario.command.ts`.
- Meaningful thin runner that still owns command-local behavior: `packages/agentplane/src/commands/finish.run.ts`, because it still throws CLI-specific usage errors when no task ids are provided.
- Runtime-dead alias wrappers classified as removable indirection: `packages/agentplane/src/commands/block.command.ts`, `packages/agentplane/src/commands/start.command.ts`, `packages/agentplane/src/commands/finish.command.ts`, `packages/agentplane/src/commands/verify.command.ts`, `packages/agentplane/src/commands/task/list.command.ts`, `packages/agentplane/src/commands/task/next.command.ts`, `packages/agentplane/src/commands/task/search.command.ts`, `packages/agentplane/src/commands/task/show.command.ts`, `packages/agentplane/src/commands/doctor.command.ts`, and `packages/agentplane/src/commands/recipes/install.command.ts`.
- Runtime-live but still low-value wrappers classified as removal candidates for `R5.4`: `packages/agentplane/src/commands/task/list.run.ts`, `packages/agentplane/src/commands/task/next.run.ts`, `packages/agentplane/src/commands/task/search.run.ts`, `packages/agentplane/src/commands/task/show.run.ts`, `packages/agentplane/src/commands/task/new.command.ts`, `packages/agentplane/src/commands/commit.command.ts`, `packages/agentplane/src/commands/start.run.ts`, `packages/agentplane/src/commands/block.run.ts`, and `packages/agentplane/src/commands/verify.run.ts`.
- Hidden premise for `R5.4`: several removable alias files still have test-only deep imports. The runtime catalog already bypasses them, but collapsing them requires updating tests that import `doctor.command.ts`, `recipes/install.command.ts`, or `verify.command.ts` directly.
- External-risk note: deleting runtime-dead alias files is low-risk inside the package because `packages/agentplane/package.json` does not publish those internal paths as public exports, but it could still break undocumented deep imports outside the repo.
