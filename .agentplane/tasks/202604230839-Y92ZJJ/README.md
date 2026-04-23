---
id: "202604230839-Y92ZJJ"
title: "Prefer canonical test commands in generated guidance"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604230838-598K1H"
tags:
  - "code"
  - "guidance"
  - "testing"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts"
  - "bun run workflows:command-check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:46.463Z"
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
doc_updated_at: "2026-04-23T08:40:36.539Z"
doc_updated_by: "PLANNER"
description: "Replace bare or misleading test-runner defaults in generated task guidance with repository canonical commands so agents do not run Vitest suites through the wrong runner."
sections:
  Summary: |-
    Prefer canonical test commands in generated guidance
    
    Replace bare or misleading test-runner defaults in generated task guidance with repository canonical commands so agents do not run Vitest suites through the wrong runner.
  Scope: "In scope: generated guidance and default examples for test commands. Out of scope: rewriting historical release notes or changing user-supplied task verify commands."
  Plan: |-
    1. Inspect task derive/scaffold defaults and generated documentation examples that still use bare bun test or raw runner commands.
    2. Replace defaults with canonical repository scripts where AgentPlane can know them, and keep user-provided verify commands untouched.
    3. Update docs/generated snapshots and command contract checks as needed.
    4. Run derive/scaffold and workflow command checks.
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts`. Expected: derive/scaffold guidance remains green.
    2. Run `bun run workflows:command-check`. Expected: command contract checks pass.
    3. Run docs freshness checks if generated docs change. Expected: generated docs are fresh.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert guidance/default command changes and regenerated docs. Existing explicit verify command support should remain unchanged."
  Findings: ""
id_source: "generated"
---
## Summary

Prefer canonical test commands in generated guidance

Replace bare or misleading test-runner defaults in generated task guidance with repository canonical commands so agents do not run Vitest suites through the wrong runner.

## Scope

In scope: generated guidance and default examples for test commands. Out of scope: rewriting historical release notes or changing user-supplied task verify commands.

## Plan

1. Inspect task derive/scaffold defaults and generated documentation examples that still use bare bun test or raw runner commands.
2. Replace defaults with canonical repository scripts where AgentPlane can know them, and keep user-provided verify commands untouched.
3. Update docs/generated snapshots and command contract checks as needed.
4. Run derive/scaffold and workflow command checks.

## Verify Steps

1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts`. Expected: derive/scaffold guidance remains green.
2. Run `bun run workflows:command-check`. Expected: command contract checks pass.
3. Run docs freshness checks if generated docs change. Expected: generated docs are fresh.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert guidance/default command changes and regenerated docs. Existing explicit verify command support should remain unchanged.

## Findings
