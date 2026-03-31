---
id: "202603311332-WJM993"
title: "N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern"
result_summary: "integrate: squash task/202603311332-WJM993/split-core-cli-commands"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311331-C3JHD2"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T19:41:25.499Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T19:47:17.997Z"
  updated_by: "CODER"
  note: "Split cli/run-cli/commands/core.ts into thin barrel plus quickstart, preflight, role, agents, and agent-profile modules; command catalog now lazy-loads the extracted handlers directly. eslint, core unit, boot, readiness, help-contract, and framework bootstrap all passed."
commit:
  hash: "fe0c0d70844884805602a6126965dd39a4ebb82a"
  message: "📝 WJM993 task: add PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: split cli/run-cli/commands/core.ts into thin orchestration plus extracted quickstart, preflight, role, and agents modules while preserving lazy registry wiring and current CLI contracts."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-WJM993/pr."
events:
  -
    type: "status"
    at: "2026-03-31T19:41:58.163Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split cli/run-cli/commands/core.ts into thin orchestration plus extracted quickstart, preflight, role, and agents modules while preserving lazy registry wiring and current CLI contracts."
  -
    type: "verify"
    at: "2026-03-31T19:47:17.997Z"
    author: "CODER"
    state: "ok"
    note: "Split cli/run-cli/commands/core.ts into thin barrel plus quickstart, preflight, role, agents, and agent-profile modules; command catalog now lazy-loads the extracted handlers directly. eslint, core unit, boot, readiness, help-contract, and framework bootstrap all passed."
  -
    type: "status"
    at: "2026-03-31T19:50:06.393Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-WJM993/pr."
doc_version: 3
doc_updated_at: "2026-03-31T19:50:06.398Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern
    
    Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern".
  Plan: |-
    1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.1.
    2. Implement split `cli/run-cli/commands/core.ts` by subcommand/report concern with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-WJM993. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: core CLI command routing no longer shares one file with unrelated report renderers and helpers.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T19:47:17.997Z — VERIFY — ok
    
    By: CODER
    
    Note: Split cli/run-cli/commands/core.ts into thin barrel plus quickstart, preflight, role, agents, and agent-profile modules; command catalog now lazy-loads the extracted handlers directly. eslint, core unit, boot, readiness, help-contract, and framework bootstrap all passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:41:58.186Z, excerpt_hash=sha256:fe00753ed8a1f38c17de3fc4e4b493e6c543d79aedd5e3fe8dff8a94b18a5b74
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern

Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern".

## Plan

1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.1.
2. Implement split `cli/run-cli/commands/core.ts` by subcommand/report concern with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-WJM993. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: core CLI command routing no longer shares one file with unrelated report renderers and helpers.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T19:47:17.997Z — VERIFY — ok

By: CODER

Note: Split cli/run-cli/commands/core.ts into thin barrel plus quickstart, preflight, role, agents, and agent-profile modules; command catalog now lazy-loads the extracted handlers directly. eslint, core unit, boot, readiness, help-contract, and framework bootstrap all passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:41:58.186Z, excerpt_hash=sha256:fe00753ed8a1f38c17de3fc4e4b493e6c543d79aedd5e3fe8dff8a94b18a5b74

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
