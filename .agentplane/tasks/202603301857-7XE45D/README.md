---
id: "202603301857-7XE45D"
title: "Re-measure read-heavy CLI commands on a large task set"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603301857-CD83AZ"
  - "202603301857-DDB4GY"
tags:
  - "code"
  - "refactor"
  - "benchmark"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T11:55:51.495Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:01:08.711Z"
  updated_by: "CODER"
  note: "Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx eslint scripts/measure-cli-cold-path.mjs packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: no lint errors. Scope: cold-path benchmark harness and its contract test. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: 2 tests passed. Scope: benchmark harness help/output contract including task list/search/next and --cli override metadata. Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/after.json && node scripts/measure-cli-cold-path.mjs --cli /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.benchmarks/before-84c99413/packages/agentplane/bin/agentplane.js --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/before.json; Result: pass; Evidence: task_list 491.105 -> 469.379 ms (-4.4%), task_search 496.097 -> 475.996 ms (-4.1%), task_next 495.405 -> 467.648 ms (-5.6%). Scope: before/after timings for read-heavy CLI commands on the same 1488-task benchmark root using baseline commit 84c99413 and current main-based CLI."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extend the cold-path benchmark harness to cover task list/search/next with one script version, then capture before/after timings against the same large task root using a pre-fastpath baseline checkout and current main."
events:
  -
    type: "status"
    at: "2026-03-31T11:56:30.269Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend the cold-path benchmark harness to cover task list/search/next with one script version, then capture before/after timings against the same large task root using a pre-fastpath baseline checkout and current main."
  -
    type: "verify"
    at: "2026-03-31T12:01:08.711Z"
    author: "CODER"
    state: "ok"
    note: "Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx eslint scripts/measure-cli-cold-path.mjs packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: no lint errors. Scope: cold-path benchmark harness and its contract test. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: 2 tests passed. Scope: benchmark harness help/output contract including task list/search/next and --cli override metadata. Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/after.json && node scripts/measure-cli-cold-path.mjs --cli /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.benchmarks/before-84c99413/packages/agentplane/bin/agentplane.js --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/before.json; Result: pass; Evidence: task_list 491.105 -> 469.379 ms (-4.4%), task_search 496.097 -> 475.996 ms (-4.1%), task_next 495.405 -> 467.648 ms (-5.6%). Scope: before/after timings for read-heavy CLI commands on the same 1488-task benchmark root using baseline commit 84c99413 and current main-based CLI."
doc_version: 3
doc_updated_at: "2026-03-31T12:01:08.715Z"
doc_updated_by: "CODER"
description: "Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`."
sections:
  Summary: |-
    Re-measure read-heavy CLI commands on a large task set
    
    Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.
  Scope: |-
    - In scope: Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.
    - Out of scope: unrelated refactors not required for "Re-measure read-heavy CLI commands on a large task set".
  Plan: |-
    1. Audit the current implementation and tests around benchmark harness from `R0.4` to isolate the exact behavior gap for R2.5.
    2. Implement the smallest change set that satisfies the REFACTOR contract: we have before/after numbers for `task list`, `task search`, and `task next`.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering benchmark harness from `R0.4`. Expected: the behavior described by R2.5 is observable and stable.
    2. Inspect the final diff for 202603301857-7XE45D. Expected: scope stays limited to benchmark harness from `R0.4` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: we have before/after numbers for `task list`, `task search`, and `task next`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:01:08.711Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx eslint scripts/measure-cli-cold-path.mjs packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: no lint errors. Scope: cold-path benchmark harness and its contract test. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: 2 tests passed. Scope: benchmark harness help/output contract including task list/search/next and --cli override metadata. Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/after.json && node scripts/measure-cli-cold-path.mjs --cli /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.benchmarks/before-84c99413/packages/agentplane/bin/agentplane.js --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/before.json; Result: pass; Evidence: task_list 491.105 -> 469.379 ms (-4.4%), task_search 496.097 -> 475.996 ms (-4.1%), task_next 495.405 -> 467.648 ms (-5.6%). Scope: before/after timings for read-heavy CLI commands on the same 1488-task benchmark root using baseline commit 84c99413 and current main-based CLI.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T11:56:30.271Z, excerpt_hash=sha256:309dacf14767e887ba4ad7a5450fd1834d3213adad283792acecfe318ca2f452
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Re-measure read-heavy CLI commands on a large task set

Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.

## Scope

- In scope: Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.
- Out of scope: unrelated refactors not required for "Re-measure read-heavy CLI commands on a large task set".

## Plan

1. Audit the current implementation and tests around benchmark harness from `R0.4` to isolate the exact behavior gap for R2.5.
2. Implement the smallest change set that satisfies the REFACTOR contract: we have before/after numbers for `task list`, `task search`, and `task next`.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering benchmark harness from `R0.4`. Expected: the behavior described by R2.5 is observable and stable.
2. Inspect the final diff for 202603301857-7XE45D. Expected: scope stays limited to benchmark harness from `R0.4` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: we have before/after numbers for `task list`, `task search`, and `task next`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:01:08.711Z — VERIFY — ok

By: CODER

Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx eslint scripts/measure-cli-cold-path.mjs packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: no lint errors. Scope: cold-path benchmark harness and its contract test. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.tmp bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts; Result: pass; Evidence: 2 tests passed. Scope: benchmark harness help/output contract including task list/search/next and --cli override metadata. Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/after.json && node scripts/measure-cli-cold-path.mjs --cli /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-7XE45D-benchmark-read-heavy-cli/.benchmarks/before-84c99413/packages/agentplane/bin/agentplane.js --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 1 > .tmp/benchmarks/before.json; Result: pass; Evidence: task_list 491.105 -> 469.379 ms (-4.4%), task_search 496.097 -> 475.996 ms (-4.1%), task_next 495.405 -> 467.648 ms (-5.6%). Scope: before/after timings for read-heavy CLI commands on the same 1488-task benchmark root using baseline commit 84c99413 and current main-based CLI.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T11:56:30.271Z, excerpt_hash=sha256:309dacf14767e887ba4ad7a5450fd1834d3213adad283792acecfe318ca2f452

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
