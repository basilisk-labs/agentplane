---
id: "202603311331-VPRQXR"
title: "N1.2 Move CLI core/config/help/runtime-report paths onto the shared emitters"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-W5GNCR"
  - "202603311331-WTQE65"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T13:59:07.225Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T14:07:22.538Z"
  updated_by: "CODER"
  note: "Focused eslint and runtime/core CLI suites passed; quickstart, preflight, role, agents, help, config, and runtime explain now route repeated JSON/text/report output through the shared emitter primitives without changing payload shapes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move core/config/help/runtime-report command families onto the shared emitter primitives so the highest-volume CLI modules stop hand-rolling repeated JSON and report-line output."
events:
  -
    type: "status"
    at: "2026-03-31T14:00:13.492Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move core/config/help/runtime-report command families onto the shared emitter primitives so the highest-volume CLI modules stop hand-rolling repeated JSON and report-line output."
  -
    type: "verify"
    at: "2026-03-31T14:07:22.538Z"
    author: "CODER"
    state: "ok"
    note: "Focused eslint and runtime/core CLI suites passed; quickstart, preflight, role, agents, help, config, and runtime explain now route repeated JSON/text/report output through the shared emitter primitives without changing payload shapes."
doc_version: 3
doc_updated_at: "2026-03-31T14:07:22.540Z"
doc_updated_by: "CODER"
description: "Implement N1.2 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: those modules stop manually formatting repeated JSON/text output blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N1.2 Move CLI core/config/help/runtime-report paths onto the shared emitters
    
    Implement N1.2 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: those modules stop manually formatting repeated JSON/text output blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N1.2 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: those modules stop manually formatting repeated JSON/text output blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N1.2 Move CLI core/config/help/runtime-report paths onto the shared emitters".
  Plan: |-
    1. Audit `cli/run-cli/commands/core.ts`, `cli/run-cli/commands/config.ts`, `cli/spec/help.ts`, `commands/runtime.command.ts` and isolate the narrowest change set that satisfies N1.2.
    2. Implement move cli core/config/help/runtime-report paths onto the shared emitters with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `cli/run-cli/commands/core.ts`, `cli/run-cli/commands/config.ts`, `cli/spec/help.ts`, `commands/runtime.command.ts`. Expected: the behavior targeted by N1.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-VPRQXR. Expected: scope stays anchored to `cli/run-cli/commands/core.ts`, `cli/run-cli/commands/config.ts`, `cli/spec/help.ts`, `commands/runtime.command.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: those modules stop manually formatting repeated JSON/text output blocks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T14:07:22.538Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused eslint and runtime/core CLI suites passed; quickstart, preflight, role, agents, help, config, and runtime explain now route repeated JSON/text/report output through the shared emitter primitives without changing payload shapes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:00:13.493Z, excerpt_hash=sha256:85fb5267de0b76431775a7d23c657b129a9514b079f40c4b9f2acefefca6765d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N1.2 Move CLI core/config/help/runtime-report paths onto the shared emitters

Implement N1.2 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: those modules stop manually formatting repeated JSON/text output blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N1.2 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: those modules stop manually formatting repeated JSON/text output blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N1.2 Move CLI core/config/help/runtime-report paths onto the shared emitters".

## Plan

1. Audit `cli/run-cli/commands/core.ts`, `cli/run-cli/commands/config.ts`, `cli/spec/help.ts`, `commands/runtime.command.ts` and isolate the narrowest change set that satisfies N1.2.
2. Implement move cli core/config/help/runtime-report paths onto the shared emitters with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `cli/run-cli/commands/core.ts`, `cli/run-cli/commands/config.ts`, `cli/spec/help.ts`, `commands/runtime.command.ts`. Expected: the behavior targeted by N1.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-VPRQXR. Expected: scope stays anchored to `cli/run-cli/commands/core.ts`, `cli/run-cli/commands/config.ts`, `cli/spec/help.ts`, `commands/runtime.command.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: those modules stop manually formatting repeated JSON/text output blocks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T14:07:22.538Z — VERIFY — ok

By: CODER

Note: Focused eslint and runtime/core CLI suites passed; quickstart, preflight, role, agents, help, config, and runtime explain now route repeated JSON/text/report output through the shared emitter primitives without changing payload shapes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:00:13.493Z, excerpt_hash=sha256:85fb5267de0b76431775a7d23c657b129a9514b079f40c4b9f2acefefca6765d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
