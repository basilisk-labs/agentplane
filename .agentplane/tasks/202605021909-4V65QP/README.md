---
id: "202605021909-4V65QP"
title: "Align runner and diagnostics with materialized prompt sources"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605021909-XANHF2"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
verify:
  - "agentplane doctor"
  - "bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:10:10.362Z"
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
doc_updated_at: "2026-05-02T19:09:52.119Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make runner behavior, prompt graph diagnostics, and doctor agree on the materialized source prompt model so physical managed files and generated graph cannot silently drift after recipe activation."
sections:
  Summary: |-
    Align runner and diagnostics with materialized prompt sources
    
    Make runner behavior, prompt graph diagnostics, and doctor agree on the materialized source prompt model so physical managed files and generated graph cannot silently drift after recipe activation.
  Scope: |-
    - In scope: Make runner behavior, prompt graph diagnostics, and doctor agree on the materialized source prompt model so physical managed files and generated graph cannot silently drift after recipe activation.
    - Out of scope: unrelated refactors not required for "Align runner and diagnostics with materialized prompt sources".
  Plan: |-
    Goal: align runner and diagnostics so materialized prompt files and generated prompt graph cannot silently disagree.
    
    Steps:
    1. Ensure runner reads materialized managed prompt files as the behavior source.
    2. Ensure prompt graph diagnostics compare generated graph against current materialized sources and active registry.
    3. Add drift findings when managed files and generated graph diverge.
    4. Verify runner/runtime/doctor focused suites.
    
    Acceptance:
    - runtime explain/doctor describe the same behavior the runner receives.
    - source files, registry, and generated graph have explicit drift detection.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Align runner and diagnostics with materialized prompt sources

Make runner behavior, prompt graph diagnostics, and doctor agree on the materialized source prompt model so physical managed files and generated graph cannot silently drift after recipe activation.

## Scope

- In scope: Make runner behavior, prompt graph diagnostics, and doctor agree on the materialized source prompt model so physical managed files and generated graph cannot silently drift after recipe activation.
- Out of scope: unrelated refactors not required for "Align runner and diagnostics with materialized prompt sources".

## Plan

Goal: align runner and diagnostics so materialized prompt files and generated prompt graph cannot silently disagree.

Steps:
1. Ensure runner reads materialized managed prompt files as the behavior source.
2. Ensure prompt graph diagnostics compare generated graph against current materialized sources and active registry.
3. Add drift findings when managed files and generated graph diverge.
4. Verify runner/runtime/doctor focused suites.

Acceptance:
- runtime explain/doctor describe the same behavior the runner receives.
- source files, registry, and generated graph have explicit drift detection.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
