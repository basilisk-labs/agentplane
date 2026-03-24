---
id: "202603241756-XMWSGN"
title: "Expose custom runner enforcement mode in dry-run and docs"
result_summary: "Custom runner enforcement mode is now visible in runner dry-run/show output and documented for users and recipe authors."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "custom"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T17:56:31.289Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T18:08:34.775Z"
  updated_by: "CODER"
  note: "Verified the new enforcement reporting surface with bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, and bunx prettier --check packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts docs/user/commands.mdx docs/user/configuration.mdx docs/developer/recipes-spec.mdx; dry-run and run-show now expose capability and policy field summaries, and the custom sandbox note reports the configured wrapper mode and supported sandbox values."
commit:
  hash: "0528829b81105e73c5c2b5ff65ad5656ed7462dd"
  message: "✅ XMWSGN code: surface custom enforcement mode in runner dry-run and docs"
comments:
  -
    author: "CODER"
    body: "Start: inspect the current dry-run and documentation surface for custom runner wrapper enforcement, then expose the effective enforcement mode and supported sandbox semantics in the user-facing output without widening the runner contract."
  -
    author: "CODER"
    body: "Verified: task run --dry-run and task run show now print compact capability and policy_field summaries alongside the canonical JSON blocks, the custom adapter surfaces the configured enforcement mode and supported sandbox values in its sandbox note, and the user/developer docs explain how to inspect wrapper-vs-advisory behavior without opening bundle artifacts directly."
events:
  -
    type: "status"
    at: "2026-03-24T17:56:34.078Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the current dry-run and documentation surface for custom runner wrapper enforcement, then expose the effective enforcement mode and supported sandbox semantics in the user-facing output without widening the runner contract."
  -
    type: "verify"
    at: "2026-03-24T18:08:34.775Z"
    author: "CODER"
    state: "ok"
    note: "Verified the new enforcement reporting surface with bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, and bunx prettier --check packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts docs/user/commands.mdx docs/user/configuration.mdx docs/developer/recipes-spec.mdx; dry-run and run-show now expose capability and policy field summaries, and the custom sandbox note reports the configured wrapper mode and supported sandbox values."
  -
    type: "status"
    at: "2026-03-24T18:08:41.410Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task run --dry-run and task run show now print compact capability and policy_field summaries alongside the canonical JSON blocks, the custom adapter surfaces the configured enforcement mode and supported sandbox values in its sandbox note, and the user/developer docs explain how to inspect wrapper-vs-advisory behavior without opening bundle artifacts directly."
doc_version: 3
doc_updated_at: "2026-03-24T18:08:41.410Z"
doc_updated_by: "CODER"
description: "Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow."
sections:
  Summary: |-
    Expose custom runner enforcement mode in dry-run and docs
    
    Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.
  Scope: |-
    - In scope: Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.
    - Out of scope: unrelated refactors not required for "Expose custom runner enforcement mode in dry-run and docs".
  Plan: |-
    1. Inspect the current task/scenario dry-run output and runner docs to identify where custom wrapper enforcement is still implicit or missing.
    2. Update the dry-run/runtime reporting so custom runner executions surface the effective enforcement mode, capability level, and supported sandbox semantics.
    3. Document the new wrapper-mode contract and verify the updated CLI/docs surface with targeted tests and generated reference checks.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: dry-run and scenario output cover the updated enforcement surface without regressions.
    2. Run bun run --filter=agentplane build. Expected: the agentplane package builds cleanly after the reporting/docs changes.
    3. Inspect the updated CLI/docs surface for the custom wrapper mode. Expected: dry-run output and documentation clearly state the enforcement mode, capability level, and supported sandbox semantics.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T18:08:34.775Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified the new enforcement reporting surface with bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, and bunx prettier --check packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts docs/user/commands.mdx docs/user/configuration.mdx docs/developer/recipes-spec.mdx; dry-run and run-show now expose capability and policy field summaries, and the custom sandbox note reports the configured wrapper mode and supported sandbox values.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:07:45.104Z, excerpt_hash=sha256:b13dac1ff1588b0fc232358d16f5e9dc166416d3bb0d3b39fea3c475d445e9e7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- task run show now falls back to prepared_metadata.adapter_capabilities when older or minimized bundles do not surface adapter capabilities directly, so the user-facing inspection output stays stable across persisted runs."
id_source: "generated"
---
## Summary

Expose custom runner enforcement mode in dry-run and docs

Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.

## Scope

- In scope: Show the effective custom-runner enforcement mode in runner dry-run output and document the wrapper-mode contract, supported sandbox semantics, and inspection workflow.
- Out of scope: unrelated refactors not required for "Expose custom runner enforcement mode in dry-run and docs".

## Plan

1. Inspect the current task/scenario dry-run output and runner docs to identify where custom wrapper enforcement is still implicit or missing.
2. Update the dry-run/runtime reporting so custom runner executions surface the effective enforcement mode, capability level, and supported sandbox semantics.
3. Document the new wrapper-mode contract and verify the updated CLI/docs surface with targeted tests and generated reference checks.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: dry-run and scenario output cover the updated enforcement surface without regressions.
2. Run bun run --filter=agentplane build. Expected: the agentplane package builds cleanly after the reporting/docs changes.
3. Inspect the updated CLI/docs surface for the custom wrapper mode. Expected: dry-run output and documentation clearly state the enforcement mode, capability level, and supported sandbox semantics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T18:08:34.775Z — VERIFY — ok

By: CODER

Note: Verified the new enforcement reporting surface with bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts, and bunx prettier --check packages/agentplane/src/runner/policy-display.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts docs/user/commands.mdx docs/user/configuration.mdx docs/developer/recipes-spec.mdx; dry-run and run-show now expose capability and policy field summaries, and the custom sandbox note reports the configured wrapper mode and supported sandbox values.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:07:45.104Z, excerpt_hash=sha256:b13dac1ff1588b0fc232358d16f5e9dc166416d3bb0d3b39fea3c475d445e9e7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- task run show now falls back to prepared_metadata.adapter_capabilities when older or minimized bundles do not surface adapter capabilities directly, so the user-facing inspection output stays stable across persisted runs.
