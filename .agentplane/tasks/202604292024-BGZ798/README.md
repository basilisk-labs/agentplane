---
id: "202604292024-BGZ798"
title: "Enable recipe patching for prompt fragments"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604292023-RSQTPD"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
verify:
  - "agentplane doctor"
  - "bun run docs:scripts:check"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:24:52.017Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T21:44:44.955Z"
  updated_by: "CODER"
  note: "Implemented fragment_id prompt module selectors for recipe patch/replace/disable/validator flows; verified with recipe transaction, doctor runtime, compiler tests, docs freshness, typecheck, diff check, framework bootstrap, and doctor."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add recipe mutation coverage and docs for addressing named prompt fragments across prompt surfaces."
events:
  -
    type: "status"
    at: "2026-04-29T21:36:49.637Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add recipe mutation coverage and docs for addressing named prompt fragments across prompt surfaces."
  -
    type: "verify"
    at: "2026-04-29T21:44:44.955Z"
    author: "CODER"
    state: "ok"
    note: "Implemented fragment_id prompt module selectors for recipe patch/replace/disable/validator flows; verified with recipe transaction, doctor runtime, compiler tests, docs freshness, typecheck, diff check, framework bootstrap, and doctor."
doc_version: 3
doc_updated_at: "2026-04-29T21:44:44.962Z"
doc_updated_by: "CODER"
description: "Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces."
sections:
  Summary: |-
    Enable recipe patching for prompt fragments
    
    Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.
  Scope: |-
    - In scope: Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.
    - Out of scope: unrelated refactors not required for "Enable recipe patching for prompt fragments".
  Plan: |-
    1. Extend recipe fixtures and docs to show patch/replace/disable/validate operations against named prompt fragments.
    2. Ensure diagnostics expose fragment-level provenance and failed recipe mutations clearly.
    3. Add regression coverage for recipe-owned fragment patches across agent profile and markdown prompt surfaces.
    4. Run recipe/doctor/compiler tests, docs freshness, typecheck, bootstrap, doctor, and diff hygiene.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T21:44:44.955Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented fragment_id prompt module selectors for recipe patch/replace/disable/validator flows; verified with recipe transaction, doctor runtime, compiler tests, docs freshness, typecheck, diff check, framework bootstrap, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T21:36:49.637Z, excerpt_hash=sha256:1596ae3bf7a8dddae7e1acbc2c92ff8febae17f795df91c68867a70a9fd0616a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Recipes can now target provenance.fragment_id selectors across gateway, policy, runner, and agent_profile prompt modules; runtime explain includes fragment provenance.
      Impact: Recipe mutations no longer need line numbers, JSON array indexes, or whole-file prompt replacements for named fragments.
      Resolution: Added selector validation/compiler matching, diagnostics, overlay fixtures, transaction coverage, runtime explain coverage, and developer docs.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Enable recipe patching for prompt fragments

Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.

## Scope

- In scope: Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.
- Out of scope: unrelated refactors not required for "Enable recipe patching for prompt fragments".

## Plan

1. Extend recipe fixtures and docs to show patch/replace/disable/validate operations against named prompt fragments.
2. Ensure diagnostics expose fragment-level provenance and failed recipe mutations clearly.
3. Add regression coverage for recipe-owned fragment patches across agent profile and markdown prompt surfaces.
4. Run recipe/doctor/compiler tests, docs freshness, typecheck, bootstrap, doctor, and diff hygiene.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T21:44:44.955Z — VERIFY — ok

By: CODER

Note: Implemented fragment_id prompt module selectors for recipe patch/replace/disable/validator flows; verified with recipe transaction, doctor runtime, compiler tests, docs freshness, typecheck, diff check, framework bootstrap, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T21:36:49.637Z, excerpt_hash=sha256:1596ae3bf7a8dddae7e1acbc2c92ff8febae17f795df91c68867a70a9fd0616a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Recipes can now target provenance.fragment_id selectors across gateway, policy, runner, and agent_profile prompt modules; runtime explain includes fragment provenance.
  Impact: Recipe mutations no longer need line numbers, JSON array indexes, or whole-file prompt replacements for named fragments.
  Resolution: Added selector validation/compiler matching, diagnostics, overlay fixtures, transaction coverage, runtime explain coverage, and developer docs.
  Promotion: incident-candidate
  Fixability: external
