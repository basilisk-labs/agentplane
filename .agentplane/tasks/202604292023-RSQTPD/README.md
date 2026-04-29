---
id: "202604292023-RSQTPD"
title: "Compile framework prompt registry from fragments"
result_summary: "Merged via PR #593."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604292023-0BQZMA"
  - "202604292023-W6G3GC"
tags:
  - "code"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:24:51.759Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T21:29:45.891Z"
  updated_by: "CODER"
  note: "Verified fragment-derived prompt registry preserves installed outputs."
commit:
  hash: "0a69db17d368a3a1a31ca931caaa235f4171ab36"
  message: "Merge pull request #593 from basilisk-labs/task/202604292023-RSQTPD/fragment-registry-compile"
comments:
  -
    author: "CODER"
    body: "Start: compile framework prompt modules from parsed source fragments while preserving installed gateway, policy, agent profile, and runner outputs."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #593 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-29T21:20:40.713Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: compile framework prompt modules from parsed source fragments while preserving installed gateway, policy, agent profile, and runner outputs."
  -
    type: "verify"
    at: "2026-04-29T21:29:45.891Z"
    author: "CODER"
    state: "ok"
    note: "Verified fragment-derived prompt registry preserves installed outputs."
  -
    type: "status"
    at: "2026-04-29T21:33:32.504Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #593 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-29T21:33:32.509Z"
doc_updated_by: "INTEGRATOR"
description: "Wire the framework prompt module registry, init/upgrade baseline seeding, and runner prompt bridge to emit prompt modules from parsed source fragments while preserving installed outputs and existing prompt ordering."
sections:
  Summary: |-
    Compile framework prompt registry from fragments
    
    Wire the framework prompt module registry, init/upgrade baseline seeding, and runner prompt bridge to emit prompt modules from parsed source fragments while preserving installed outputs and existing prompt ordering.
  Scope: |-
    - In scope: Wire the framework prompt module registry, init/upgrade baseline seeding, and runner prompt bridge to emit prompt modules from parsed source fragments while preserving installed outputs and existing prompt ordering.
    - Out of scope: unrelated refactors not required for "Compile framework prompt registry from fragments".
  Plan: |-
    1. Wire framework prompt registry loading to emit prompt modules from parsed source fragments instead of whole-file-only modules.
    2. Preserve init/upgrade baseline outputs and runner prompt ordering while exposing fragment-level provenance.
    3. Add tests for registry output, init apply behavior, and runner base prompt stability.
    4. Run focused tests, typecheck, bootstrap, doctor, and diff hygiene.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T21:29:45.891Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified fragment-derived prompt registry preserves installed outputs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T21:20:40.713Z, excerpt_hash=sha256:93f1a2081b2b5f8d1132f8462c7e685736cd7f8170236a2fb520337907ad3eaf
    
    Details:
    
    Command: agentplane task verify-show 202604292023-RSQTPD | Result: pass | Evidence: verify contract read. Scope: declared task checks.
    Command: bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts | Result: pass | Evidence: 18 pass, 0 fail, 1 snapshot, 118 expect calls. Scope: registry fragments, init installed outputs, runner base prompts.
    Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Scope: TypeScript project references.
    Command: git diff --check | Result: pass | Evidence: no whitespace errors. Scope: changed files.
    Command: bun run framework:dev:bootstrap | Result: pass | Evidence: framework dev runtime is ready. Scope: build/runtime bootstrap.
    Command: agentplane doctor | Result: pass | Evidence: OK, errors=0 warnings=0 info=9. Scope: repo runtime health.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Compile framework prompt registry from fragments

Wire the framework prompt module registry, init/upgrade baseline seeding, and runner prompt bridge to emit prompt modules from parsed source fragments while preserving installed outputs and existing prompt ordering.

## Scope

- In scope: Wire the framework prompt module registry, init/upgrade baseline seeding, and runner prompt bridge to emit prompt modules from parsed source fragments while preserving installed outputs and existing prompt ordering.
- Out of scope: unrelated refactors not required for "Compile framework prompt registry from fragments".

## Plan

1. Wire framework prompt registry loading to emit prompt modules from parsed source fragments instead of whole-file-only modules.
2. Preserve init/upgrade baseline outputs and runner prompt ordering while exposing fragment-level provenance.
3. Add tests for registry output, init apply behavior, and runner base prompt stability.
4. Run focused tests, typecheck, bootstrap, doctor, and diff hygiene.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T21:29:45.891Z — VERIFY — ok

By: CODER

Note: Verified fragment-derived prompt registry preserves installed outputs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T21:20:40.713Z, excerpt_hash=sha256:93f1a2081b2b5f8d1132f8462c7e685736cd7f8170236a2fb520337907ad3eaf

Details:

Command: agentplane task verify-show 202604292023-RSQTPD | Result: pass | Evidence: verify contract read. Scope: declared task checks.
Command: bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts | Result: pass | Evidence: 18 pass, 0 fail, 1 snapshot, 118 expect calls. Scope: registry fragments, init installed outputs, runner base prompts.
Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Scope: TypeScript project references.
Command: git diff --check | Result: pass | Evidence: no whitespace errors. Scope: changed files.
Command: bun run framework:dev:bootstrap | Result: pass | Evidence: framework dev runtime is ready. Scope: build/runtime bootstrap.
Command: agentplane doctor | Result: pass | Evidence: OK, errors=0 warnings=0 info=9. Scope: repo runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
