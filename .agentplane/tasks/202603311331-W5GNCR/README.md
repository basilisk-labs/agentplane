---
id: "202603311331-W5GNCR"
title: "N1.1 Define shared CLI emitter primitives"
result_summary: "integrate: squash task/202603311331-W5GNCR/shared-cli-emitters"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311331-WTQE65"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T13:51:45.657Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T13:56:18.332Z"
  updated_by: "CODER"
  note: "Focused output unit checks passed; cli/output.ts now exposes one shared emitter surface for text lines, pretty JSON, warnings, and key/value report blocks, ready for consumer migration in N1.2 and N1.3."
commit:
  hash: "7b97f123034670141903f1270c5bd7f7cb554607"
  message: "🧩 W5GNCR integrate: squash task/202603311331-W5GNCR/shared-cli-emitters"
comments:
  -
    author: "CODER"
    body: "Start: define one minimal shared emitter surface for common text lines, pretty JSON, warnings, and report blocks so the output-heavy command families can migrate onto it without preserving current duplication."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-W5GNCR/pr."
events:
  -
    type: "status"
    at: "2026-03-31T13:52:26.455Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define one minimal shared emitter surface for common text lines, pretty JSON, warnings, and report blocks so the output-heavy command families can migrate onto it without preserving current duplication."
  -
    type: "verify"
    at: "2026-03-31T13:56:18.332Z"
    author: "CODER"
    state: "ok"
    note: "Focused output unit checks passed; cli/output.ts now exposes one shared emitter surface for text lines, pretty JSON, warnings, and key/value report blocks, ready for consumer migration in N1.2 and N1.3."
  -
    type: "status"
    at: "2026-03-31T13:58:26.166Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-W5GNCR/pr."
doc_version: 3
doc_updated_at: "2026-03-31T13:58:26.168Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N1.1 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: one small API covers text lines, pretty JSON, warnings, and common report blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N1.1 Define shared CLI emitter primitives
    
    Implement N1.1 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: one small API covers text lines, pretty JSON, warnings, and common report blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N1.1 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: one small API covers text lines, pretty JSON, warnings, and common report blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N1.1 Define shared CLI emitter primitives".
  Plan: |-
    1. Audit `packages/agentplane/src/cli/output.ts` or adjacent shared output modules and isolate the narrowest change set that satisfies N1.1.
    2. Implement define shared cli emitter primitives with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/output.ts` or adjacent shared output modules. Expected: the behavior targeted by N1.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-W5GNCR. Expected: scope stays anchored to `packages/agentplane/src/cli/output.ts` or adjacent shared output modules plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: one small API covers text lines, pretty JSON, warnings, and common report blocks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T13:56:18.332Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused output unit checks passed; cli/output.ts now exposes one shared emitter surface for text lines, pretty JSON, warnings, and key/value report blocks, ready for consumer migration in N1.2 and N1.3.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:52:26.456Z, excerpt_hash=sha256:b27a0e3d1492ca521be585f55f44163a249971ad28bd02f76bda38376e0e8f94
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N1.1 Define shared CLI emitter primitives

Implement N1.1 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: one small API covers text lines, pretty JSON, warnings, and common report blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N1.1 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: one small API covers text lines, pretty JSON, warnings, and common report blocks. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N1.1 Define shared CLI emitter primitives".

## Plan

1. Audit `packages/agentplane/src/cli/output.ts` or adjacent shared output modules and isolate the narrowest change set that satisfies N1.1.
2. Implement define shared cli emitter primitives with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/output.ts` or adjacent shared output modules. Expected: the behavior targeted by N1.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-W5GNCR. Expected: scope stays anchored to `packages/agentplane/src/cli/output.ts` or adjacent shared output modules plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: one small API covers text lines, pretty JSON, warnings, and common report blocks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T13:56:18.332Z — VERIFY — ok

By: CODER

Note: Focused output unit checks passed; cli/output.ts now exposes one shared emitter surface for text lines, pretty JSON, warnings, and key/value report blocks, ready for consumer migration in N1.2 and N1.3.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:52:26.456Z, excerpt_hash=sha256:b27a0e3d1492ca521be585f55f44163a249971ad28bd02f76bda38376e0e8f94

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
