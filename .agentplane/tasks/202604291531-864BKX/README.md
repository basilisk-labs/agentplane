---
id: "202604291531-864BKX"
title: "Add prompt graph diagnostics and drift checks"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-29T15:31:57.766Z"
doc_updated_by: "ORCHESTRATOR"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert diagnostic command changes and keep compiler behavior intact.
    - Confirm `agentplane doctor` returns to previous output with no prompt graph section.
  Findings: "No findings yet."
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert diagnostic command changes and keep compiler behavior intact.
- Confirm `agentplane doctor` returns to previous output with no prompt graph section.

## Findings

No findings yet.
