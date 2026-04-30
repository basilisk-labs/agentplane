---
id: "202604300725-3CY7TE"
title: "Enforce recipe fragment mutability and E2E patch coverage"
result_summary: "Merged via PR #601."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604300725-SS9694"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "release"
  - "testing"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T07:26:53.580Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T07:54:17.486Z"
  updated_by: "CODER"
  note: "Verification passed for prompt fragment mutability enforcement and E2E recipe patch coverage."
commit:
  hash: "deed4834e7df9f13d30fb1fe490cc4c071a60716"
  message: "Merge pull request #601 from basilisk-labs/task/202604300725-3CY7TE/fragment-mutability"
comments:
  -
    author: "CODER"
    body: "Start: enforce prompt fragment mutability for recipe patch operations and add regression coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #601 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-30T07:48:54.484Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce prompt fragment mutability for recipe patch operations and add regression coverage."
  -
    type: "verify"
    at: "2026-04-30T07:54:17.486Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed for prompt fragment mutability enforcement and E2E recipe patch coverage."
  -
    type: "status"
    at: "2026-04-30T08:00:00.104Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #601 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-30T08:00:00.110Z"
doc_updated_by: "INTEGRATOR"
description: "Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph."
sections:
  Summary: |-
    Enforce recipe fragment mutability and E2E patch coverage
    
    Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.
  Scope: |-
    - In scope: Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.
    - Out of scope: unrelated refactors not required for "Enforce recipe fragment mutability and E2E patch coverage".
  Plan: |-
    1. Define concrete recipe mutation semantics for locked, replaceable, extendable, and append_only prompt fragments.
    2. Implement the smallest compiler validation needed to reject unsafe recipe mutations while preserving allowed patch/replace/disable behavior.
    3. Add focused compiler tests for allowed and rejected fragment mutations.
    4. Add an end-to-end active recipe regression that targets a real framework fragment through target.fragment_id and verifies the compiled graph output.
    5. Verify targeted tests, typecheck, diff check, framework bootstrap, and doctor.
    6. Publish through branch_pr and close after hosted merge.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T07:54:17.486Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification passed for prompt fragment mutability enforcement and E2E recipe patch coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:48:54.484Z, excerpt_hash=sha256:a4beee98b380b67399513c1f82d7b7225eeb77c269d9a4a60c481b27e179d709
    
    Details:
    
    Command: bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts; Result: pass; Evidence: 16 pass, 0 fail; Scope: compiler mutability rules and active recipe prompt graph regression.
    Command: bun run typecheck; Result: pass; Evidence: tsc -b completed; Scope: TypeScript project references.
    Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: final diff.
    Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready; Scope: repo-local runtime build.
    Command: agentplane doctor; Result: pass; Evidence: doctor OK; Scope: workflow runtime health.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce recipe fragment mutability and E2E patch coverage

Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.

## Scope

- In scope: Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.
- Out of scope: unrelated refactors not required for "Enforce recipe fragment mutability and E2E patch coverage".

## Plan

1. Define concrete recipe mutation semantics for locked, replaceable, extendable, and append_only prompt fragments.
2. Implement the smallest compiler validation needed to reject unsafe recipe mutations while preserving allowed patch/replace/disable behavior.
3. Add focused compiler tests for allowed and rejected fragment mutations.
4. Add an end-to-end active recipe regression that targets a real framework fragment through target.fragment_id and verifies the compiled graph output.
5. Verify targeted tests, typecheck, diff check, framework bootstrap, and doctor.
6. Publish through branch_pr and close after hosted merge.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T07:54:17.486Z — VERIFY — ok

By: CODER

Note: Verification passed for prompt fragment mutability enforcement and E2E recipe patch coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:48:54.484Z, excerpt_hash=sha256:a4beee98b380b67399513c1f82d7b7225eeb77c269d9a4a60c481b27e179d709

Details:

Command: bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts; Result: pass; Evidence: 16 pass, 0 fail; Scope: compiler mutability rules and active recipe prompt graph regression.
Command: bun run typecheck; Result: pass; Evidence: tsc -b completed; Scope: TypeScript project references.
Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: final diff.
Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready; Scope: repo-local runtime build.
Command: agentplane doctor; Result: pass; Evidence: doctor OK; Scope: workflow runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
