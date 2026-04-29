---
id: "202604292023-0BQZMA"
title: "Migrate agent profiles to addressable prompt fragments"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604292023-GHNS95"
tags:
  - "agents"
  - "code"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:24:51.243Z"
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
doc_updated_at: "2026-04-29T20:24:41.679Z"
doc_updated_by: "ORCHESTRATOR"
description: "Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id."
sections:
  Summary: |-
    Migrate agent profiles to addressable prompt fragments
    
    Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.
  Scope: |-
    - In scope: Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.
    - Out of scope: unrelated refactors not required for "Migrate agent profiles to addressable prompt fragments".
  Plan: |-
    1. Convert bundled agent profile workflow/input/output/permission lists to id/text fragment objects where line-level patching matters.
    2. Preserve installed profile behavior and backward compatibility for existing string-array profiles.
    3. Add tests that confirm profile fragments retain stable ids and rendered runner prompts stay unchanged.
    4. Run agent/profile prompt tests, typecheck, bootstrap, doctor, and diff hygiene.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate agent profiles to addressable prompt fragments

Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.

## Scope

- In scope: Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.
- Out of scope: unrelated refactors not required for "Migrate agent profiles to addressable prompt fragments".

## Plan

1. Convert bundled agent profile workflow/input/output/permission lists to id/text fragment objects where line-level patching matters.
2. Preserve installed profile behavior and backward compatibility for existing string-array profiles.
3. Add tests that confirm profile fragments retain stable ids and rendered runner prompts stay unchanged.
4. Run agent/profile prompt tests, typecheck, bootstrap, doctor, and diff hygiene.

## Verify Steps

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
