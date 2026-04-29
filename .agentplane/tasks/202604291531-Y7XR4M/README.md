---
id: "202604291531-Y7XR4M"
title: "Compile agent profiles and upgrade baselines from modules"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-29T15:31:44.541Z"
doc_updated_by: "ORCHESTRATOR"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert agent profile compiler wiring to direct template emission.
- Re-run init and role tests to confirm previous behavior.

## Findings

No findings yet.
