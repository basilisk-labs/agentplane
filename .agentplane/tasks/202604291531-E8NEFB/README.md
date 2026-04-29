---
id: "202604291531-E8NEFB"
title: "Compile init gateway and policy from modules"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604291531-1GHEJZ"
tags:
  - "code"
  - "init"
  - "policy"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run policy:routing:check"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/agents/policy-routing-check.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:39.153Z"
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
doc_updated_at: "2026-04-29T15:31:40.174Z"
doc_updated_by: "ORCHESTRATOR"
description: "Switch init-time AGENTS.md/CLAUDE.md and .agentplane/policy emission to use the prompt module compiler while preserving byte-for-byte or intentional-equivalent output and upgrade baseline seeding."
sections:
  Summary: |-
    Compile init gateway and policy from modules
    
    Switch init-time AGENTS.md/CLAUDE.md and .agentplane/policy emission to use the prompt module compiler while preserving byte-for-byte or intentional-equivalent output and upgrade baseline seeding.
  Scope: |-
    - In scope: `agentplane init` gateway and `.agentplane/policy/**` emission from compiled PromptModules.
    - In scope: policy gateway flavor rendering for `AGENTS.md` and `CLAUDE.md`, workflow-mode filtering, and baseline seeding for installed files.
    - Out of scope: agent profile JSON emission and recipe module mutations.
  Plan: |-
    1. Route gateway/policy init emission through the module registry and compiler.
    2. Preserve current rendered contents for direct/branch_pr and Codex/Claude gateway flavors.
    3. Preserve `.agentplane/.upgrade/baseline` behavior for managed files.
    4. Add parity tests around init apply and policy routing.
    5. Run declared checks and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/agents/policy-routing-check.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run policy:routing:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert init gateway/policy wiring to direct template loaders.
    - Keep compiler/registry tasks intact if their standalone tests still pass.
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Compile init gateway and policy from modules

Switch init-time AGENTS.md/CLAUDE.md and .agentplane/policy emission to use the prompt module compiler while preserving byte-for-byte or intentional-equivalent output and upgrade baseline seeding.

## Scope

- In scope: `agentplane init` gateway and `.agentplane/policy/**` emission from compiled PromptModules.
- In scope: policy gateway flavor rendering for `AGENTS.md` and `CLAUDE.md`, workflow-mode filtering, and baseline seeding for installed files.
- Out of scope: agent profile JSON emission and recipe module mutations.

## Plan

1. Route gateway/policy init emission through the module registry and compiler.
2. Preserve current rendered contents for direct/branch_pr and Codex/Claude gateway flavors.
3. Preserve `.agentplane/.upgrade/baseline` behavior for managed files.
4. Add parity tests around init apply and policy routing.
5. Run declared checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/agents/policy-routing-check.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run policy:routing:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert init gateway/policy wiring to direct template loaders.
- Keep compiler/registry tasks intact if their standalone tests still pass.

## Findings

No findings yet.
