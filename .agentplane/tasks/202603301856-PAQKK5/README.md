---
id: "202603301856-PAQKK5"
title: "Add a lightweight CLI cold-path benchmark harness"
result_summary: "integrate: squash task/202603301856-PAQKK5/add-cli-cold-benchmark"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "tests"
  - "benchmark"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T19:21:09.857Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the final Epic 0 safety-net task; scope stays limited to adding a repeatable cold-path benchmark harness, package entrypoint, and focused script contract coverage without altering production command behavior."
verification:
  state: "ok"
  updated_at: "2026-03-30T19:25:19.744Z"
  updated_by: "CODER"
  note: "OK: node scripts/measure-cli-cold-path.mjs --help, bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts, prettier --check, eslint, and a direct one-run invocation of the harness all passed; the repository now has a repeatable cold-path benchmark entrypoint for quickstart, task list, and preflight --mode quick without production CLI changes."
commit:
  hash: "f915f064df7cf7d67174853d6cca8b8072c6ce27"
  message: "🧩 PAQKK5 integrate: squash task/202603301856-PAQKK5/add-cli-cold-benchmark"
comments:
  -
    author: "CODER"
    body: "Start: adding a repeatable CLI cold-path benchmark harness for quickstart, task list, and preflight --mode quick, plus a focused contract test, without changing production CLI behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-PAQKK5/pr."
events:
  -
    type: "status"
    at: "2026-03-30T19:21:50.258Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding a repeatable CLI cold-path benchmark harness for quickstart, task list, and preflight --mode quick, plus a focused contract test, without changing production CLI behavior."
  -
    type: "verify"
    at: "2026-03-30T19:25:19.744Z"
    author: "CODER"
    state: "ok"
    note: "OK: node scripts/measure-cli-cold-path.mjs --help, bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts, prettier --check, eslint, and a direct one-run invocation of the harness all passed; the repository now has a repeatable cold-path benchmark entrypoint for quickstart, task list, and preflight --mode quick without production CLI changes."
  -
    type: "status"
    at: "2026-03-30T19:26:55.113Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-PAQKK5/pr."
doc_version: 3
doc_updated_at: "2026-03-30T19:26:55.116Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`."
sections:
  Summary: |-
    Add a lightweight CLI cold-path benchmark harness
    
    Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
  Scope: |-
    - In scope: Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
    - Out of scope: unrelated refactors not required for "Add a lightweight CLI cold-path benchmark harness".
  Plan: |-
    1. Audit the current implementation and tests around `scripts/`, `package.json`, or existing benchmark/test harness locations to isolate the exact behavior gap for R0.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `scripts/`, `package.json`, or existing benchmark/test harness locations. Expected: the behavior described by R0.4 is observable and stable.
    2. Inspect the final diff for 202603301856-PAQKK5. Expected: scope stays limited to `scripts/`, `package.json`, or existing benchmark/test harness locations plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T19:25:19.744Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: node scripts/measure-cli-cold-path.mjs --help, bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts, prettier --check, eslint, and a direct one-run invocation of the harness all passed; the repository now has a repeatable cold-path benchmark entrypoint for quickstart, task list, and preflight --mode quick without production CLI changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:21:50.259Z, excerpt_hash=sha256:f66b01b28606a3cbb7936185321574b27601fa200790d274f189cbaf52c089c1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add a lightweight CLI cold-path benchmark harness

Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.

## Scope

- In scope: Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
- Out of scope: unrelated refactors not required for "Add a lightweight CLI cold-path benchmark harness".

## Plan

1. Audit the current implementation and tests around `scripts/`, `package.json`, or existing benchmark/test harness locations to isolate the exact behavior gap for R0.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `scripts/`, `package.json`, or existing benchmark/test harness locations. Expected: the behavior described by R0.4 is observable and stable.
2. Inspect the final diff for 202603301856-PAQKK5. Expected: scope stays limited to `scripts/`, `package.json`, or existing benchmark/test harness locations plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T19:25:19.744Z — VERIFY — ok

By: CODER

Note: OK: node scripts/measure-cli-cold-path.mjs --help, bunx vitest run packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts, prettier --check, eslint, and a direct one-run invocation of the harness all passed; the repository now has a repeatable cold-path benchmark entrypoint for quickstart, task list, and preflight --mode quick without production CLI changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:21:50.259Z, excerpt_hash=sha256:f66b01b28606a3cbb7936185321574b27601fa200790d274f189cbaf52c089c1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
