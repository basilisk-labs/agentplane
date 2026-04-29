---
id: "202604291531-864BKX"
title: "Add prompt graph diagnostics and drift checks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604291531-N0H28A"
tags:
  - "cli"
  - "code"
  - "doctor"
  - "prompt-assembly"
  - "upgrade"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:56.807Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T19:28:51.819Z"
  updated_by: "CODER"
  note: "Prompt graph diagnostics are exposed through runtime explain and doctor drift checks; declared verification passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: expose read-only prompt graph diagnostics and stale generated prompt artifact checks through doctor/runtime surfaces."
events:
  -
    type: "status"
    at: "2026-04-29T19:19:14.560Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expose read-only prompt graph diagnostics and stale generated prompt artifact checks through doctor/runtime surfaces."
  -
    type: "verify"
    at: "2026-04-29T19:28:51.819Z"
    author: "CODER"
    state: "ok"
    note: "Prompt graph diagnostics are exposed through runtime explain and doctor drift checks; declared verification passed."
doc_version: 3
doc_updated_at: "2026-04-29T19:28:51.826Z"
doc_updated_by: "CODER"
description: "Expose prompt graph diagnostics and drift detection through doctor/explain-style surfaces so operators can see compiled modules, source provenance, repo overrides, recipe mutations, and stale generated prompt artifacts."
sections:
  Summary: |-
    Add prompt graph diagnostics and drift checks
    
    Expose prompt graph diagnostics and drift detection through doctor/explain-style surfaces so operators can see compiled modules, source provenance, repo overrides, recipe mutations, and stale generated prompt artifacts.
  Scope: |-
    - In scope: diagnostics for prompt graph composition, source provenance, active recipe mutations, and generated artifact drift.
    - In scope: doctor/runtime explain surfaces that help agents decide whether init/upgrade/prompt artifacts need refresh.
    - Out of scope: auto-fixing drift or publishing remote checks.
  Plan: |-
    1. Add explainable prompt graph summaries from compiler inputs and outputs.
    2. Teach doctor/runtime diagnostics to report stale compiled prompt artifacts and repo-local overrides.
    3. Keep diagnostics read-only unless an existing command already mutates artifacts.
    4. Add focused doctor/runtime tests.
    5. Run declared checks and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T19:28:51.819Z — VERIFY — ok
    By: CODER
    Note: Prompt graph diagnostics are exposed through runtime explain and doctor drift checks; declared verification passed.
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T19:19:14.560Z, excerpt_hash=sha256:a019d12d713a57a5e046605a22e4c91eda675fe707779b3868ea7dc29e9e077d
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert diagnostic command changes and keep compiler behavior intact.
    - Confirm `agentplane doctor` returns to previous output with no prompt graph section.
  Findings: |-
    No residual findings.
    Verification evidence:
    - Command: bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts
      Result: pass
      Evidence: 27 pass, 0 fail.
      Scope: doctor/runtime prompt graph diagnostics and prompt compiler regression coverage.
    - Command: bun run typecheck
      Result: pass
      Evidence: tsc -b completed with exit 0.
      Scope: repository TypeScript project references.
    - Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: Framework dev runtime is ready.
      Scope: repo-local runtime rebuild after command changes.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK with errors=0 warnings=0.
      Scope: repository workflow/runtime diagnostics.
    - Command: git diff --check
      Result: pass
      Evidence: no whitespace errors.
      Scope: final diff hygiene.
id_source: "generated"
---
## Summary

Add prompt graph diagnostics and drift checks

Expose prompt graph diagnostics and drift detection through doctor/explain-style surfaces so operators can see compiled modules, source provenance, repo overrides, recipe mutations, and stale generated prompt artifacts.

## Scope

- In scope: diagnostics for prompt graph composition, source provenance, active recipe mutations, and generated artifact drift.
- In scope: doctor/runtime explain surfaces that help agents decide whether init/upgrade/prompt artifacts need refresh.
- Out of scope: auto-fixing drift or publishing remote checks.

## Plan

1. Add explainable prompt graph summaries from compiler inputs and outputs.
2. Teach doctor/runtime diagnostics to report stale compiled prompt artifacts and repo-local overrides.
3. Keep diagnostics read-only unless an existing command already mutates artifacts.
4. Add focused doctor/runtime tests.
5. Run declared checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T19:28:51.819Z — VERIFY — ok

By: CODER

Note: Prompt graph diagnostics are exposed through runtime explain and doctor drift checks; declared verification passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T19:19:14.560Z, excerpt_hash=sha256:a019d12d713a57a5e046605a22e4c91eda675fe707779b3868ea7dc29e9e077d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert diagnostic command changes and keep compiler behavior intact.
- Confirm `agentplane doctor` returns to previous output with no prompt graph section.

## Findings

No residual findings.

Verification evidence:

- Command: bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts
  Result: pass
  Evidence: 27 pass, 0 fail.
  Scope: doctor/runtime prompt graph diagnostics and prompt compiler regression coverage.
- Command: bun run typecheck
  Result: pass
  Evidence: tsc -b completed with exit 0.
  Scope: repository TypeScript project references.
- Command: bun run framework:dev:bootstrap
  Result: pass
  Evidence: Framework dev runtime is ready.
  Scope: repo-local runtime rebuild after command changes.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK with errors=0 warnings=0.
  Scope: repository workflow/runtime diagnostics.
- Command: git diff --check
  Result: pass
  Evidence: no whitespace errors.
  Scope: final diff hygiene.
