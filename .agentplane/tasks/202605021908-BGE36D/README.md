---
id: "202605021908-BGE36D"
title: "Define managed recipe materialization contract"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "prompt-assembly"
  - "recipes"
verify:
  - "agentplane doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:10:00.310Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T19:12:27.197Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime/archive findings only. Scope: managed recipe materialization docs contract in developer docs."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Defining managed recipe materialization architecture contract before implementation tasks so code work has a stable source-of-truth boundary."
events:
  -
    type: "status"
    at: "2026-05-02T19:10:44.229Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Defining managed recipe materialization architecture contract before implementation tasks so code work has a stable source-of-truth boundary."
  -
    type: "verify"
    at: "2026-05-02T19:12:27.197Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime/archive findings only. Scope: managed recipe materialization docs contract in developer docs."
doc_version: 3
doc_updated_at: "2026-05-02T19:12:27.272Z"
doc_updated_by: "DOCS"
description: "Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point."
sections:
  Summary: |-
    Define managed recipe materialization contract
    
    Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.
  Scope: |-
    - In scope: Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.
    - Out of scope: unrelated refactors not required for "Define managed recipe materialization contract".
  Plan: |-
    Goal: define the durable architecture contract for managed recipe materialization before code changes.
    
    Steps:
    1. Update developer recipe/prompt documentation to state that AgentPlane-managed prompt source files are human-readable but not manually edited.
    2. Define gateway.user.instructions as the sanctioned user-editable extension point.
    3. Clarify recipe activation semantics: registry records active recipes, materializer patches managed fragments, prompt graph is diagnostics/index output.
    4. Verify routing policy and doctor.
    
    Acceptance:
    - Docs separate core invariants from recipe-controlled behavior.
    - Docs name the managed prompt files, user instruction block, and prompt graph role without making generated graph the behavior source of truth.
  Verify Steps: |-
    1. Review the requested outcome for "Define managed recipe materialization contract". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T19:12:27.197Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime/archive findings only. Scope: managed recipe materialization docs contract in developer docs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:10:44.229Z, excerpt_hash=sha256:c0ac4a1bf01e8b7676a46ec341b4bb8868aaeec3dcd97ce8dedfac4fe9bdf1b0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Define managed recipe materialization contract

Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.

## Scope

- In scope: Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.
- Out of scope: unrelated refactors not required for "Define managed recipe materialization contract".

## Plan

Goal: define the durable architecture contract for managed recipe materialization before code changes.

Steps:
1. Update developer recipe/prompt documentation to state that AgentPlane-managed prompt source files are human-readable but not manually edited.
2. Define gateway.user.instructions as the sanctioned user-editable extension point.
3. Clarify recipe activation semantics: registry records active recipes, materializer patches managed fragments, prompt graph is diagnostics/index output.
4. Verify routing policy and doctor.

Acceptance:
- Docs separate core invariants from recipe-controlled behavior.
- Docs name the managed prompt files, user instruction block, and prompt graph role without making generated graph the behavior source of truth.

## Verify Steps

1. Review the requested outcome for "Define managed recipe materialization contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T19:12:27.197Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime/archive findings only. Scope: managed recipe materialization docs contract in developer docs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:10:44.229Z, excerpt_hash=sha256:c0ac4a1bf01e8b7676a46ec341b4bb8868aaeec3dcd97ce8dedfac4fe9bdf1b0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
