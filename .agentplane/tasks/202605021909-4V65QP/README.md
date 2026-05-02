---
id: "202605021909-4V65QP"
title: "Align runner and diagnostics with materialized prompt sources"
result_summary: "Closed as included task in primary batch 202605021908-BGE36D; implementation landed in merge commit 38c5df9686ab176d7a1cce60531a28201a5a8d2f and closure commit 8cd6f64da7f49d8d3a27d66c4e625b02faea3022."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-05-02T19:38:34.357Z"
  updated_by: "CODER"
  note: "Aligned runner prompt source ordering and prompt-module bridge metadata. Evidence: base-prompts targeted tests passed; policy routing OK."
commit:
  hash: "38c5df9686ab176d7a1cce60531a28201a5a8d2f"
  message: "task: Define managed recipe materialization contract [202605021908-BGE36D] (#765)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: implemented as part of batch PR #765 and closure PR #770."
events:
  -
    type: "verify"
    at: "2026-05-02T19:38:34.357Z"
    author: "CODER"
    state: "ok"
    note: "Aligned runner prompt source ordering and prompt-module bridge metadata. Evidence: base-prompts targeted tests passed; policy routing OK."
  -
    type: "status"
    at: "2026-05-02T20:10:42.732Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: implemented as part of batch PR #765 and closure PR #770."
doc_version: 3
doc_updated_at: "2026-05-02T20:10:42.733Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-02T19:38:34.357Z — VERIFY — ok
    
    By: CODER
    
    Note: Aligned runner prompt source ordering and prompt-module bridge metadata. Evidence: base-prompts targeted tests passed; policy routing OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:09:52.119Z, excerpt_hash=sha256:537ce244f3bc542b712c14c5f3cf05a078881935fe6b51709716b18cf7d01ddb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: gateway.user.instructions is represented as a gateway prompt module surface.
      Impact: Diagnostics/prompt graph can show the user-instructions block consistently with gateway policy.
      Resolution: Added priority and bridge mapping for gateway.user.instructions.
      Promotion: incident-candidate
      Fixability: external
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
### 2026-05-02T19:38:34.357Z — VERIFY — ok

By: CODER

Note: Aligned runner prompt source ordering and prompt-module bridge metadata. Evidence: base-prompts targeted tests passed; policy routing OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:09:52.119Z, excerpt_hash=sha256:537ce244f3bc542b712c14c5f3cf05a078881935fe6b51709716b18cf7d01ddb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: gateway.user.instructions is represented as a gateway prompt module surface.
  Impact: Diagnostics/prompt graph can show the user-instructions block consistently with gateway policy.
  Resolution: Added priority and bridge mapping for gateway.user.instructions.
  Promotion: incident-candidate
  Fixability: external
