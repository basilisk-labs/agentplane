---
id: "202604292023-W6G3GC"
title: "Migrate markdown prompt assets to named fragments"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604292023-GHNS95"
tags:
  - "code"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-fragments/*.test.ts"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:24:51.492Z"
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
doc_updated_at: "2026-04-29T20:24:41.923Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling."
sections:
  Summary: |-
    Migrate markdown prompt assets to named fragments
    
    Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.
  Scope: |-
    - In scope: Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.
    - Out of scope: unrelated refactors not required for "Migrate markdown prompt assets to named fragments".
  Plan: |-
    1. Add named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules at logical replacement boundaries.
    2. Preserve rendered prompt text for installed gateway/policy outputs while keeping markers parseable in source assets.
    3. Add routing/check tests that catch duplicate ids or invalid marker nesting.
    4. Run prompt-fragment tests, policy routing, typecheck, bootstrap, doctor, and diff hygiene.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-fragments/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate markdown prompt assets to named fragments

Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.

## Scope

- In scope: Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.
- Out of scope: unrelated refactors not required for "Migrate markdown prompt assets to named fragments".

## Plan

1. Add named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules at logical replacement boundaries.
2. Preserve rendered prompt text for installed gateway/policy outputs while keeping markers parseable in source assets.
3. Add routing/check tests that catch duplicate ids or invalid marker nesting.
4. Run prompt-fragment tests, policy routing, typecheck, bootstrap, doctor, and diff hygiene.

## Verify Steps

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-fragments/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
