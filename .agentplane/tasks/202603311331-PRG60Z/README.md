---
id: "202603311331-PRG60Z"
title: "N1.3 Move task run/handoff/reclaim/show output onto the shared emitters"
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
  updated_at: "2026-03-31T13:59:07.222Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T14:32:56.435Z"
  updated_by: "CODER"
  note: "Focused verify passed in worktree: bunx vitest run packages/agentplane/src/cli/output.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern 'renders reusable line, JSON, and report blocks|creates an emitter that routes text, JSON, warnings, and reports|task reclaim records a deterministic handoff for a task without runner state|task handoff record/show/resume-context reuse the latest failed runner state|task run show, trace, and tail inspect the latest persisted run without manual file reads|task run cancel marks an existing prepared execute-mode run as cancelled|task run resume executes an existing prepared run in place|task run retry creates a fresh run from a failed run snapshot'. Diff stayed within targeted commands plus focused CLI contract test. task verify-show reported watched_runtime_snapshot drift; verify evidence recorded via AGENTPLANE_DEV_ALLOW_STALE_DIST=1 to avoid unrelated bootstrap output changes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move task run/handoff/reclaim/show command families onto the shared emitter primitives so status reports and JSON paths stop duplicating line-by-line output logic."
events:
  -
    type: "status"
    at: "2026-03-31T14:00:19.130Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move task run/handoff/reclaim/show command families onto the shared emitter primitives so status reports and JSON paths stop duplicating line-by-line output logic."
  -
    type: "verify"
    at: "2026-03-31T14:32:56.435Z"
    author: "CODER"
    state: "ok"
    note: "Focused verify passed in worktree: bunx vitest run packages/agentplane/src/cli/output.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern 'renders reusable line, JSON, and report blocks|creates an emitter that routes text, JSON, warnings, and reports|task reclaim records a deterministic handoff for a task without runner state|task handoff record/show/resume-context reuse the latest failed runner state|task run show, trace, and tail inspect the latest persisted run without manual file reads|task run cancel marks an existing prepared execute-mode run as cancelled|task run resume executes an existing prepared run in place|task run retry creates a fresh run from a failed run snapshot'. Diff stayed within targeted commands plus focused CLI contract test. task verify-show reported watched_runtime_snapshot drift; verify evidence recorded via AGENTPLANE_DEV_ALLOW_STALE_DIST=1 to avoid unrelated bootstrap output changes."
doc_version: 3
doc_updated_at: "2026-03-31T14:32:56.442Z"
doc_updated_by: "CODER"
description: "Implement N1.3 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: key/value status blocks no longer hand-roll line-by-line writes in each command. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N1.3 Move task run/handoff/reclaim/show output onto the shared emitters
    
    Implement N1.3 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: key/value status blocks no longer hand-roll line-by-line writes in each command. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N1.3 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: key/value status blocks no longer hand-roll line-by-line writes in each command. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N1.3 Move task run/handoff/reclaim/show output onto the shared emitters".
  Plan: |-
    1. Audit `commands/task/run-*.command.ts`, `handoff-*.command.ts`, `reclaim.command.ts` and isolate the narrowest change set that satisfies N1.3.
    2. Implement move task run/handoff/reclaim/show output onto the shared emitters with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `commands/task/run-*.command.ts`, `handoff-*.command.ts`, `reclaim.command.ts`. Expected: the behavior targeted by N1.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-PRG60Z. Expected: scope stays anchored to `commands/task/run-*.command.ts`, `handoff-*.command.ts`, `reclaim.command.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: key/value status blocks no longer hand-roll line-by-line writes in each command.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T14:32:56.435Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verify passed in worktree: bunx vitest run packages/agentplane/src/cli/output.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern 'renders reusable line, JSON, and report blocks|creates an emitter that routes text, JSON, warnings, and reports|task reclaim records a deterministic handoff for a task without runner state|task handoff record/show/resume-context reuse the latest failed runner state|task run show, trace, and tail inspect the latest persisted run without manual file reads|task run cancel marks an existing prepared execute-mode run as cancelled|task run resume executes an existing prepared run in place|task run retry creates a fresh run from a failed run snapshot'. Diff stayed within targeted commands plus focused CLI contract test. task verify-show reported watched_runtime_snapshot drift; verify evidence recorded via AGENTPLANE_DEV_ALLOW_STALE_DIST=1 to avoid unrelated bootstrap output changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:00:19.131Z, excerpt_hash=sha256:9761409574400ab588e894b92eb23e61545c0b34b21f1e4672129d4272b241a7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N1.3 Move task run/handoff/reclaim/show output onto the shared emitters

Implement N1.3 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: key/value status blocks no longer hand-roll line-by-line writes in each command. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N1.3 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: key/value status blocks no longer hand-roll line-by-line writes in each command. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N1.3 Move task run/handoff/reclaim/show output onto the shared emitters".

## Plan

1. Audit `commands/task/run-*.command.ts`, `handoff-*.command.ts`, `reclaim.command.ts` and isolate the narrowest change set that satisfies N1.3.
2. Implement move task run/handoff/reclaim/show output onto the shared emitters with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `commands/task/run-*.command.ts`, `handoff-*.command.ts`, `reclaim.command.ts`. Expected: the behavior targeted by N1.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-PRG60Z. Expected: scope stays anchored to `commands/task/run-*.command.ts`, `handoff-*.command.ts`, `reclaim.command.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: key/value status blocks no longer hand-roll line-by-line writes in each command.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T14:32:56.435Z — VERIFY — ok

By: CODER

Note: Focused verify passed in worktree: bunx vitest run packages/agentplane/src/cli/output.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern 'renders reusable line, JSON, and report blocks|creates an emitter that routes text, JSON, warnings, and reports|task reclaim records a deterministic handoff for a task without runner state|task handoff record/show/resume-context reuse the latest failed runner state|task run show, trace, and tail inspect the latest persisted run without manual file reads|task run cancel marks an existing prepared execute-mode run as cancelled|task run resume executes an existing prepared run in place|task run retry creates a fresh run from a failed run snapshot'. Diff stayed within targeted commands plus focused CLI contract test. task verify-show reported watched_runtime_snapshot drift; verify evidence recorded via AGENTPLANE_DEV_ALLOW_STALE_DIST=1 to avoid unrelated bootstrap output changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:00:19.131Z, excerpt_hash=sha256:9761409574400ab588e894b92eb23e61545c0b34b21f1e4672129d4272b241a7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
