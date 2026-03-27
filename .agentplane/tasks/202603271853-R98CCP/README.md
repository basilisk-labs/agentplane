---
id: "202603271853-R98CCP"
title: "Add first-class task handoff and recovery artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T18:54:03.256Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T19:25:59.929Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 5 files, 24 tests passed and help snapshot updated for new task handoff commands. Scope: schema, CLI registry/help, handoff/reclaim/resume-context flows. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds succeeded after bootstrap. Scope: core and agentplane compile surfaces. Command: bunx eslint packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts; Result: pass; Evidence: no lint errors on changed implementation files. Scope: new handoff surface and artifact schema wiring. Command: bunx prettier --check packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts packages/spec/README.md packages/core/schemas/task-handoff.schema.json packages/spec/schemas/task-handoff.schema.json packages/spec/examples/task-handoff.json; Result: pass; Evidence: formatting clean for all changed handoff files and schemas. Scope: changed source, spec, and schema artifacts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing a canonical task handoff artifact plus show, resume-context, and reclaim commands that reuse existing runner inspection and lifecycle seams rather than creating a second recovery model."
events:
  -
    type: "status"
    at: "2026-03-27T18:54:04.765Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing a canonical task handoff artifact plus show, resume-context, and reclaim commands that reuse existing runner inspection and lifecycle seams rather than creating a second recovery model."
  -
    type: "verify"
    at: "2026-03-27T19:25:59.929Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 5 files, 24 tests passed and help snapshot updated for new task handoff commands. Scope: schema, CLI registry/help, handoff/reclaim/resume-context flows. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds succeeded after bootstrap. Scope: core and agentplane compile surfaces. Command: bunx eslint packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts; Result: pass; Evidence: no lint errors on changed implementation files. Scope: new handoff surface and artifact schema wiring. Command: bunx prettier --check packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts packages/spec/README.md packages/core/schemas/task-handoff.schema.json packages/spec/schemas/task-handoff.schema.json packages/spec/examples/task-handoff.json; Result: pass; Evidence: formatting clean for all changed handoff files and schemas. Scope: changed source, spec, and schema artifacts."
doc_version: 3
doc_updated_at: "2026-03-27T19:25:59.931Z"
doc_updated_by: "CODER"
description: "Introduce a canonical task handoff artifact plus CLI commands to record handoff state, show the latest handoff, reclaim orphaned work, and print a deterministic resume context that reuses runner inspection and lifecycle seams."
sections:
  Summary: |-
    Add first-class task handoff and recovery artifacts
    
    Introduce a canonical task handoff artifact plus CLI commands to record handoff state, show the latest handoff, reclaim orphaned work, and print a deterministic resume context that reuses runner inspection and lifecycle seams.
  Scope: |-
    - In scope: Introduce a canonical task handoff artifact plus CLI commands to record handoff state, show the latest handoff, reclaim orphaned work, and print a deterministic resume context that reuses runner inspection and lifecycle seams.
    - Out of scope: unrelated refactors not required for "Add first-class task handoff and recovery artifacts".
  Plan: |-
    1. Introduce a canonical task handoff artifact contract in the task domain, with typed read/write helpers and a stable on-disk layout under the task workflow directory.
    2. Add CLI commands to record a handoff snapshot, show the latest handoff, print a deterministic resume-context, and reclaim orphaned work by combining task state with runner inspection/lifecycle seams instead of inventing a separate recovery stack.
    3. Add focused command/usecase regressions, verify the new handoff/reclaim flows against runner metadata and task docs, and record any remaining process gaps explicitly in Findings.
  Verify Steps: |-
    1. Create a handoff snapshot for a task and inspect it through both machine-readable and human-readable surfaces. Expected: the latest handoff captures branch/head/run hints and is stored deterministically under the task workflow directory.
    2. Exercise resume-context and reclaim behavior against tasks with and without runner state. Expected: the commands reuse existing runner inspection/lifecycle data and choose deterministic next actions instead of inventing inconsistent recovery heuristics.
    3. Run targeted handoff/task-run/task-command regressions and the smallest relevant build/lint pass. Expected: the new commands integrate cleanly into the existing task command registry without breaking current task or runner surfaces.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T19:25:59.929Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 5 files, 24 tests passed and help snapshot updated for new task handoff commands. Scope: schema, CLI registry/help, handoff/reclaim/resume-context flows. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds succeeded after bootstrap. Scope: core and agentplane compile surfaces. Command: bunx eslint packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts; Result: pass; Evidence: no lint errors on changed implementation files. Scope: new handoff surface and artifact schema wiring. Command: bunx prettier --check packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts packages/spec/README.md packages/core/schemas/task-handoff.schema.json packages/spec/schemas/task-handoff.schema.json packages/spec/examples/task-handoff.json; Result: pass; Evidence: formatting clean for all changed handoff files and schemas. Scope: changed source, spec, and schema artifacts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T18:54:04.767Z, excerpt_hash=sha256:8a5335495442663248223c9d8f29cea96e570fd2a596b4c5016f47e8462617ff
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add first-class task handoff and recovery artifacts

Introduce a canonical task handoff artifact plus CLI commands to record handoff state, show the latest handoff, reclaim orphaned work, and print a deterministic resume context that reuses runner inspection and lifecycle seams.

## Scope

- In scope: Introduce a canonical task handoff artifact plus CLI commands to record handoff state, show the latest handoff, reclaim orphaned work, and print a deterministic resume context that reuses runner inspection and lifecycle seams.
- Out of scope: unrelated refactors not required for "Add first-class task handoff and recovery artifacts".

## Plan

1. Introduce a canonical task handoff artifact contract in the task domain, with typed read/write helpers and a stable on-disk layout under the task workflow directory.
2. Add CLI commands to record a handoff snapshot, show the latest handoff, print a deterministic resume-context, and reclaim orphaned work by combining task state with runner inspection/lifecycle seams instead of inventing a separate recovery stack.
3. Add focused command/usecase regressions, verify the new handoff/reclaim flows against runner metadata and task docs, and record any remaining process gaps explicitly in Findings.

## Verify Steps

1. Create a handoff snapshot for a task and inspect it through both machine-readable and human-readable surfaces. Expected: the latest handoff captures branch/head/run hints and is stored deterministically under the task workflow directory.
2. Exercise resume-context and reclaim behavior against tasks with and without runner state. Expected: the commands reuse existing runner inspection/lifecycle data and choose deterministic next actions instead of inventing inconsistent recovery heuristics.
3. Run targeted handoff/task-run/task-command regressions and the smallest relevant build/lint pass. Expected: the new commands integrate cleanly into the existing task command registry without breaking current task or runner surfaces.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T19:25:59.929Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 5 files, 24 tests passed and help snapshot updated for new task handoff commands. Scope: schema, CLI registry/help, handoff/reclaim/resume-context flows. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds succeeded after bootstrap. Scope: core and agentplane compile surfaces. Command: bunx eslint packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts; Result: pass; Evidence: no lint errors on changed implementation files. Scope: new handoff surface and artifact schema wiring. Command: bunx prettier --check packages/agentplane/src/commands/shared/task-handoff.ts packages/agentplane/src/commands/task/handoff.shared.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/handoff-record.command.ts packages/agentplane/src/commands/task/handoff-show.command.ts packages/agentplane/src/commands/task/resume-context.command.ts packages/agentplane/src/commands/task/reclaim.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/index.ts packages/spec/README.md packages/core/schemas/task-handoff.schema.json packages/spec/schemas/task-handoff.schema.json packages/spec/examples/task-handoff.json; Result: pass; Evidence: formatting clean for all changed handoff files and schemas. Scope: changed source, spec, and schema artifacts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T18:54:04.767Z, excerpt_hash=sha256:8a5335495442663248223c9d8f29cea96e570fd2a596b4c5016f47e8462617ff

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
