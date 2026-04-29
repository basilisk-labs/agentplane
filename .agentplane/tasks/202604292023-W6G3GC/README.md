---
id: "202604292023-W6G3GC"
title: "Migrate markdown prompt assets to named fragments"
result_summary: "Merged via PR #591."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-29T21:11:24.464Z"
  updated_by: "CODER"
  note: "Verified markdown prompt fragments render without marker comments."
commit:
  hash: "f0089ce8a71eb219d4a6e103aafe1fe7122d8d61"
  message: "Merge pull request #591 from basilisk-labs/task/202604292023-W6G3GC/markdown-prompt-fragments"
comments:
  -
    author: "CODER"
    body: "Start: add named markdown fragment markers to bundled gateway, runner, and policy assets while preserving rendered installed outputs."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #591 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-29T21:04:10.903Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add named markdown fragment markers to bundled gateway, runner, and policy assets while preserving rendered installed outputs."
  -
    type: "verify"
    at: "2026-04-29T21:11:24.464Z"
    author: "CODER"
    state: "ok"
    note: "Verified markdown prompt fragments render without marker comments."
  -
    type: "status"
    at: "2026-04-29T21:17:24.805Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #591 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-29T21:17:24.811Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-04-29T21:11:24.464Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified markdown prompt fragments render without marker comments.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T21:04:10.903Z, excerpt_hash=sha256:25bec4354b94900c22c1800a812ff101dbaf8bc3ee9201e438897423c67ea303
    
    Details:
    
    Command: agentplane task verify-show 202604292023-W6G3GC | Result: pass | Evidence: verify contract read. Scope: declared task checks.
    Command: bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-fragments/*.test.ts | Result: pass | Evidence: 19 pass, 0 fail, 359 expect calls. Scope: asset rendering, markdown/json fragment parser behavior.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Scope: policy routing budgets.
    Command: git diff --check | Result: pass | Evidence: no whitespace errors. Scope: changed files.
    Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Scope: TypeScript project references.
    Command: bun run framework:dev:bootstrap | Result: pass | Evidence: framework dev runtime is ready. Scope: generated/build runtime.
    Command: agentplane doctor | Result: pass | Evidence: OK, errors=0 warnings=0 info=9. Scope: repo runtime health.
    Additional command: bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts | Result: pass | Evidence: 4 pass, 0 fail. Scope: framework prompt registry runner/profile parity.
    
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
### 2026-04-29T21:11:24.464Z — VERIFY — ok

By: CODER

Note: Verified markdown prompt fragments render without marker comments.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T21:04:10.903Z, excerpt_hash=sha256:25bec4354b94900c22c1800a812ff101dbaf8bc3ee9201e438897423c67ea303

Details:

Command: agentplane task verify-show 202604292023-W6G3GC | Result: pass | Evidence: verify contract read. Scope: declared task checks.
Command: bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-fragments/*.test.ts | Result: pass | Evidence: 19 pass, 0 fail, 359 expect calls. Scope: asset rendering, markdown/json fragment parser behavior.
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Scope: policy routing budgets.
Command: git diff --check | Result: pass | Evidence: no whitespace errors. Scope: changed files.
Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Scope: TypeScript project references.
Command: bun run framework:dev:bootstrap | Result: pass | Evidence: framework dev runtime is ready. Scope: generated/build runtime.
Command: agentplane doctor | Result: pass | Evidence: OK, errors=0 warnings=0 info=9. Scope: repo runtime health.
Additional command: bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts | Result: pass | Evidence: 4 pass, 0 fail. Scope: framework prompt registry runner/profile parity.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
