---
id: "202604291531-Y7XR4M"
title: "Compile agent profiles and upgrade baselines from modules"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604291531-E8NEFB"
tags:
  - "agents"
  - "code"
  - "init"
  - "prompt-assembly"
  - "upgrade"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:43.593Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T18:31:02.066Z"
  updated_by: "CODER"
  note: "Verified: reconciled PR metadata after agent profile module compilation commit 0b096e4759d1. Prior checks remain current for the committed diff: focused tests, typecheck, git diff --check, framework bootstrap, doctor, check-routing, and agentplane agents passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Route init agent profile emission and related upgrade baseline seeding through compiled framework prompt modules while preserving existing agent JSON output and role behavior."
events:
  -
    type: "status"
    at: "2026-04-29T18:25:50.763Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Route init agent profile emission and related upgrade baseline seeding through compiled framework prompt modules while preserving existing agent JSON output and role behavior."
  -
    type: "verify"
    at: "2026-04-29T18:30:30.626Z"
    author: "CODER"
    state: "ok"
    note: "Verified agent profile module compilation: focused agents/init/upgrade tests passed (29 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings. Extra upgrade-policy checks passed: node .agentplane/policy/check-routing.mjs and agentplane agents after bootstrap."
  -
    type: "verify"
    at: "2026-04-29T18:31:02.066Z"
    author: "CODER"
    state: "ok"
    note: "Verified: reconciled PR metadata after agent profile module compilation commit 0b096e4759d1. Prior checks remain current for the committed diff: focused tests, typecheck, git diff --check, framework bootstrap, doctor, check-routing, and agentplane agents passed."
doc_version: 3
doc_updated_at: "2026-04-29T18:31:02.118Z"
doc_updated_by: "CODER"
description: "Switch .agentplane/agents profile emission and related upgrade baseline handling to the prompt module compiler, preserving existing JSON profile output and role-specific behavior."
sections:
  Summary: |-
    Compile agent profiles and upgrade baselines from modules
    
    Switch .agentplane/agents profile emission and related upgrade baseline handling to the prompt module compiler, preserving existing JSON profile output and role-specific behavior.
  Scope: |-
    - In scope: `.agentplane/agents/*.json` emission through PromptModules.
    - In scope: profile provenance/baseline handling and compatibility with `agentplane role <ROLE>`.
    - Out of scope: changing role semantics, adding new agents, or modifying workflow policy content.
  Plan: |-
    1. Route agent profile template loading/emission through framework prompt modules.
    2. Preserve rendered JSON and policy-gateway placeholder rendering.
    3. Update upgrade baseline seeding to track compiled agent profile artifacts.
    4. Add focused init/upgrade/role loader regression tests.
    5. Run declared checks and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T18:30:30.626Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified agent profile module compilation: focused agents/init/upgrade tests passed (29 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings. Extra upgrade-policy checks passed: node .agentplane/policy/check-routing.mjs and agentplane agents after bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:25:50.763Z, excerpt_hash=sha256:8ca948ad369f767b877e84ee09329039e3a95f355edd314cca76398526d67f50
    
    ### 2026-04-29T18:31:02.066Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: reconciled PR metadata after agent profile module compilation commit 0b096e4759d1. Prior checks remain current for the committed diff: focused tests, typecheck, git diff --check, framework bootstrap, doctor, check-routing, and agentplane agents passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:30:30.640Z, excerpt_hash=sha256:8ca948ad369f767b877e84ee09329039e3a95f355edd314cca76398526d67f50
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert agent profile compiler wiring to direct template emission.
    - Re-run init and role tests to confirm previous behavior.
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Compile agent profiles and upgrade baselines from modules

Switch .agentplane/agents profile emission and related upgrade baseline handling to the prompt module compiler, preserving existing JSON profile output and role-specific behavior.

## Scope

- In scope: `.agentplane/agents/*.json` emission through PromptModules.
- In scope: profile provenance/baseline handling and compatibility with `agentplane role <ROLE>`.
- Out of scope: changing role semantics, adding new agents, or modifying workflow policy content.

## Plan

1. Route agent profile template loading/emission through framework prompt modules.
2. Preserve rendered JSON and policy-gateway placeholder rendering.
3. Update upgrade baseline seeding to track compiled agent profile artifacts.
4. Add focused init/upgrade/role loader regression tests.
5. Run declared checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T18:30:30.626Z — VERIFY — ok

By: CODER

Note: Verified agent profile module compilation: focused agents/init/upgrade tests passed (29 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings. Extra upgrade-policy checks passed: node .agentplane/policy/check-routing.mjs and agentplane agents after bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:25:50.763Z, excerpt_hash=sha256:8ca948ad369f767b877e84ee09329039e3a95f355edd314cca76398526d67f50

### 2026-04-29T18:31:02.066Z — VERIFY — ok

By: CODER

Note: Verified: reconciled PR metadata after agent profile module compilation commit 0b096e4759d1. Prior checks remain current for the committed diff: focused tests, typecheck, git diff --check, framework bootstrap, doctor, check-routing, and agentplane agents passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:30:30.640Z, excerpt_hash=sha256:8ca948ad369f767b877e84ee09329039e3a95f355edd314cca76398526d67f50

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert agent profile compiler wiring to direct template emission.
- Re-run init and role tests to confirm previous behavior.

## Findings

No findings yet.
