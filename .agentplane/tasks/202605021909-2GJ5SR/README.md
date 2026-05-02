---
id: "202605021909-2GJ5SR"
title: "Add managed user instructions fragment"
result_summary: "Closed as included task in primary batch 202605021908-BGE36D; implementation landed in merge commit 38c5df9686ab176d7a1cce60531a28201a5a8d2f and closure commit 8cd6f64da7f49d8d3a27d66c4e625b02faea3022."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605021908-BGE36D"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
verify:
  - "agentplane doctor"
  - "bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:10:03.258Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T19:38:32.994Z"
  updated_by: "CODER"
  note: "Implemented managed gateway.user.instructions prompt source. Evidence: base-prompts targeted tests passed; policy routing OK."
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
    at: "2026-05-02T19:38:32.994Z"
    author: "CODER"
    state: "ok"
    note: "Implemented managed gateway.user.instructions prompt source. Evidence: base-prompts targeted tests passed; policy routing OK."
  -
    type: "status"
    at: "2026-05-02T20:09:41.164Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: implemented as part of batch PR #765 and closure PR #770."
doc_version: 3
doc_updated_at: "2026-05-02T20:09:41.165Z"
doc_updated_by: "INTEGRATOR"
description: "Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files."
sections:
  Summary: |-
    Add managed user instructions fragment
    
    Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.
  Scope: |-
    - In scope: Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.
    - Out of scope: unrelated refactors not required for "Add managed user instructions fragment".
  Plan: |-
    Goal: introduce gateway.user.instructions as the explicit user-editable prompt extension point.
    
    Steps:
    1. Add/adjust framework prompt fragments so the gateway exposes a stable user instruction hook.
    2. Add project/runtime handling for a dedicated user instructions source without encouraging manual edits to managed prompt files.
    3. Update focused tests/docs for prompt fragment discovery and runner prompt loading.
    4. Verify focused prompt/runner tests and doctor.
    
    Acceptance:
    - User instructions are represented as a named fragment or stable prompt block.
    - Managed prompt sources stay AgentPlane-owned, with user custom text isolated.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T19:38:32.994Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented managed gateway.user.instructions prompt source. Evidence: base-prompts targeted tests passed; policy routing OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:09:51.844Z, excerpt_hash=sha256:77f9bfbcf92c3c085725f402356f726d5d1cfc7f77baeaac73a28b09483af6ac
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added optional .agentplane/user-instructions.md loading as gateway.user.instructions.
      Impact: User instructions can be added without direct edits to managed gateway files.
      Resolution: Runtime base prompt collection now includes the managed user instructions block when present.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add managed user instructions fragment

Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.

## Scope

- In scope: Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.
- Out of scope: unrelated refactors not required for "Add managed user instructions fragment".

## Plan

Goal: introduce gateway.user.instructions as the explicit user-editable prompt extension point.

Steps:
1. Add/adjust framework prompt fragments so the gateway exposes a stable user instruction hook.
2. Add project/runtime handling for a dedicated user instructions source without encouraging manual edits to managed prompt files.
3. Update focused tests/docs for prompt fragment discovery and runner prompt loading.
4. Verify focused prompt/runner tests and doctor.

Acceptance:
- User instructions are represented as a named fragment or stable prompt block.
- Managed prompt sources stay AgentPlane-owned, with user custom text isolated.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T19:38:32.994Z — VERIFY — ok

By: CODER

Note: Implemented managed gateway.user.instructions prompt source. Evidence: base-prompts targeted tests passed; policy routing OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:09:51.844Z, excerpt_hash=sha256:77f9bfbcf92c3c085725f402356f726d5d1cfc7f77baeaac73a28b09483af6ac

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added optional .agentplane/user-instructions.md loading as gateway.user.instructions.
  Impact: User instructions can be added without direct edits to managed gateway files.
  Resolution: Runtime base prompt collection now includes the managed user instructions block when present.
  Promotion: incident-candidate
  Fixability: external
