---
id: "202604292023-0BQZMA"
title: "Migrate agent profiles to addressable prompt fragments"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-29T20:56:49.557Z"
  updated_by: "CODER"
  note: "Bundled agent profiles now use addressable fragment objects while installed profile and runner behavior remain string-array compatible; declared checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate bundled agent profile list entries to addressable prompt fragment objects while preserving rendered profile and runner behavior."
events:
  -
    type: "status"
    at: "2026-04-29T20:50:01.029Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate bundled agent profile list entries to addressable prompt fragment objects while preserving rendered profile and runner behavior."
  -
    type: "verify"
    at: "2026-04-29T20:56:49.557Z"
    author: "CODER"
    state: "ok"
    note: "Bundled agent profiles now use addressable fragment objects while installed profile and runner behavior remain string-array compatible; declared checks passed."
doc_version: 3
doc_updated_at: "2026-04-29T20:56:49.560Z"
doc_updated_by: "CODER"
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
    ### 2026-04-29T20:56:49.557Z — VERIFY — ok

    By: CODER

    Note: Bundled agent profiles now use addressable fragment objects while installed profile and runner behavior remain string-array compatible; declared checks passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:56:44.940Z, excerpt_hash=sha256:c3ea51171d6cb0750a2cc9a65d73f6ca7101aba566c95355d01c15205d9128f1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    No residual findings.

    Verification evidence:
    - Command: bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts
      Result: pass
      Evidence: 21 tests passed; bundled agent source fragments render back to installed string-array profiles and runner base prompt behavior remains stable.
      Scope: agent template loading, repo-installed profile parity, and runner base prompt fallback/owner-profile behavior.
    - Command: bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts
      Result: pass
      Evidence: 6 prompt-fragment tests passed.
      Scope: prompt fragment parser compatibility after switching imports away from the prompt-modules barrel.
    - Command: bun run typecheck
      Result: pass
      Evidence: tsc -b completed with exit 0.
      Scope: repository TypeScript project references including agent template and prompt fragment changes.
    - Command: git diff --check
      Result: pass
      Evidence: no whitespace errors before verification recording.
      Scope: diff hygiene.
    - Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: workspace dependencies installed, core/agentplane/testkit builds completed, repo-local runtime verified.
      Scope: framework development runtime after agent profile fragment migration.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK with errors=0 warnings=0; info-only runtime/archive notes.
      Scope: repository workflow/runtime diagnostics.
    - Command: bun prettier --check packages/agentplane/src/agents/agents-template.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli/commands/core/agent-profiles.ts packages/agentplane/src/runtime/prompt-fragments packages/agentplane/assets/agents && bun eslint packages/agentplane/src/agents/agents-template.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli/commands/core/agent-profiles.ts packages/agentplane/src/runtime/prompt-fragments --max-warnings=0
      Result: pass
      Evidence: Prettier reported all matched files formatted; ESLint exited 0.
      Scope: focused style/lint coverage for changed source files.
    - Command: node asset fragment uniqueness check
      Result: pass
      Evidence: 218 declared agent fragment ids found, duplicates=false.
      Scope: migrated bundled agent profile fragment id uniqueness.
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
### 2026-04-29T20:56:49.557Z — VERIFY — ok

By: CODER

Note: Bundled agent profiles now use addressable fragment objects while installed profile and runner behavior remain string-array compatible; declared checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:56:44.940Z, excerpt_hash=sha256:c3ea51171d6cb0750a2cc9a65d73f6ca7101aba566c95355d01c15205d9128f1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

No residual findings.

Verification evidence:
- Command: bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts
  Result: pass
  Evidence: 21 tests passed; bundled agent source fragments render back to installed string-array profiles and runner base prompt behavior remains stable.
  Scope: agent template loading, repo-installed profile parity, and runner base prompt fallback/owner-profile behavior.
- Command: bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts
  Result: pass
  Evidence: 6 prompt-fragment tests passed.
  Scope: prompt fragment parser compatibility after switching imports away from the prompt-modules barrel.
- Command: bun run typecheck
  Result: pass
  Evidence: tsc -b completed with exit 0.
  Scope: repository TypeScript project references including agent template and prompt fragment changes.
- Command: git diff --check
  Result: pass
  Evidence: no whitespace errors before verification recording.
  Scope: diff hygiene.
- Command: bun run framework:dev:bootstrap
  Result: pass
  Evidence: workspace dependencies installed, core/agentplane/testkit builds completed, repo-local runtime verified.
  Scope: framework development runtime after agent profile fragment migration.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK with errors=0 warnings=0; info-only runtime/archive notes.
  Scope: repository workflow/runtime diagnostics.
- Command: bun prettier --check packages/agentplane/src/agents/agents-template.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli/commands/core/agent-profiles.ts packages/agentplane/src/runtime/prompt-fragments packages/agentplane/assets/agents && bun eslint packages/agentplane/src/agents/agents-template.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli/commands/core/agent-profiles.ts packages/agentplane/src/runtime/prompt-fragments --max-warnings=0
  Result: pass
  Evidence: Prettier reported all matched files formatted; ESLint exited 0.
  Scope: focused style/lint coverage for changed source files.
- Command: node asset fragment uniqueness check
  Result: pass
  Evidence: 218 declared agent fragment ids found, duplicates=false.
  Scope: migrated bundled agent profile fragment id uniqueness.
