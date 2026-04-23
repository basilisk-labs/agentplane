---
id: "202604230839-Y92ZJJ"
title: "Prefer canonical test commands in generated guidance"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
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
  state: "ok"
  updated_at: "2026-04-23T09:41:00.337Z"
  updated_by: "CODER"
  note: "Verified: generated task derive guidance now uses canonical test:project command and command-check blocks inline test runners in command guidance."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: dependency 598K1H is finished; inspecting generated task guidance and scaffold/derive defaults."
events:
  -
    type: "status"
    at: "2026-04-23T09:38:37.475Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: dependency 598K1H is finished; inspecting generated task guidance and scaffold/derive defaults."
  -
    type: "verify"
    at: "2026-04-23T09:41:00.337Z"
    author: "CODER"
    state: "ok"
    note: "Verified: generated task derive guidance now uses canonical test:project command and command-check blocks inline test runners in command guidance."
doc_version: 3
doc_updated_at: "2026-04-23T09:41:00.341Z"
doc_updated_by: "CODER"
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
    ### 2026-04-23T09:41:00.337Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: generated task derive guidance now uses canonical test:project command and command-check blocks inline test runners in command guidance.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:38:37.490Z, excerpt_hash=sha256:445948858b630485e9300d831275e33864b4d5ce6c3e361563f946af65e30dd5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert guidance/default command changes and regenerated docs. Existing explicit verify command support should remain unchanged."
  Findings: |-
    - Observation: Ran bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts; bun run workflows:command-check; bun run docs:cli:check; Prettier check for changed files.
      Impact: Reduces the chance that generated examples lead agents to run bare bun test or raw Vitest instead of repository scripts.
      Resolution: Updated task derive example/test fixture and expanded workflow command contract scanning to command specs.
      Promotion: incident-candidate
      Fixability: external
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
### 2026-04-23T09:41:00.337Z — VERIFY — ok

By: CODER

Note: Verified: generated task derive guidance now uses canonical test:project command and command-check blocks inline test runners in command guidance.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:38:37.490Z, excerpt_hash=sha256:445948858b630485e9300d831275e33864b4d5ce6c3e361563f946af65e30dd5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert guidance/default command changes and regenerated docs. Existing explicit verify command support should remain unchanged.

## Findings

- Observation: Ran bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts; bun run workflows:command-check; bun run docs:cli:check; Prettier check for changed files.
  Impact: Reduces the chance that generated examples lead agents to run bare bun test or raw Vitest instead of repository scripts.
  Resolution: Updated task derive example/test fixture and expanded workflow command contract scanning to command specs.
  Promotion: incident-candidate
  Fixability: external
