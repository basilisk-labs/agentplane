---
id: "202604062309-ZBNXE7"
title: "Expose skipped incident findings in lifecycle diagnostics"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T23:10:41.193Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T23:18:14.227Z"
  updated_by: "CODER"
  note: "Focused incidents diagnostics coverage passed after worktree bootstrap: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/runtime/incidents/index.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/collect.command.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts. Result: pass. Evidence: empty incident findings now differ from skipped structured findings, and lifecycle diagnostics surface the distinction without changing promotion semantics."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T23:18:14.227Z"
    author: "CODER"
    state: "ok"
    note: "Focused incidents diagnostics coverage passed after worktree bootstrap: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/runtime/incidents/index.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/collect.command.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts. Result: pass. Evidence: empty incident findings now differ from skipped structured findings, and lifecycle diagnostics surface the distinction without changing promotion semantics."
doc_version: 3
doc_updated_at: "2026-04-06T23:18:14.231Z"
doc_updated_by: "CODER"
description: "Differentiate no external incidents from structured findings that were parsed but not promotable, and surface that distinction in incidents collection and lifecycle output."
sections:
  Summary: |-
    Expose skipped incident findings in lifecycle diagnostics
    
    Differentiate no external incidents from structured findings that were parsed but not promotable, and surface that distinction in incidents collection and lifecycle output.
  Scope: |-
    - In scope: Differentiate no external incidents from structured findings that were parsed but not promotable, and surface that distinction in incidents collection and lifecycle output.
    - Out of scope: unrelated refactors not required for "Expose skipped incident findings in lifecycle diagnostics".
  Plan: "1. Extend incident collection planning so structured findings that were parsed but not promotable are reported explicitly instead of collapsing into the same no-op message as truly empty external findings. 2. Thread the richer incident outcome through incidents collect and lifecycle output without mutating the registry semantics. 3. Add focused runtime/CLI regressions for skipped-candidate diagnostics and verify the updated messages."
  Verify Steps: |-
    1. Run focused incidents runtime and CLI tests covering parsed-but-not-promotable findings. Expected: the plan distinguishes empty findings from skipped candidates and the new output is asserted.
    2. Run eslint on the touched incidents and lifecycle command files. Expected: no lint errors in touched scope.
    3. Review lifecycle output for the new diagnostics path. Expected: commands explicitly report skipped structured findings instead of collapsing everything into the same no-op message.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T23:18:14.227Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused incidents diagnostics coverage passed after worktree bootstrap: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/runtime/incidents/index.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/collect.command.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts. Result: pass. Evidence: empty incident findings now differ from skipped structured findings, and lifecycle diagnostics surface the distinction without changing promotion semantics.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:09:41.336Z, excerpt_hash=sha256:c3e786a01fa1fa01aa669e808ea335c4ba4e8b84cf1bdfbd5f0f56fb3b4c56cb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Expose skipped incident findings in lifecycle diagnostics

Differentiate no external incidents from structured findings that were parsed but not promotable, and surface that distinction in incidents collection and lifecycle output.

## Scope

- In scope: Differentiate no external incidents from structured findings that were parsed but not promotable, and surface that distinction in incidents collection and lifecycle output.
- Out of scope: unrelated refactors not required for "Expose skipped incident findings in lifecycle diagnostics".

## Plan

1. Extend incident collection planning so structured findings that were parsed but not promotable are reported explicitly instead of collapsing into the same no-op message as truly empty external findings. 2. Thread the richer incident outcome through incidents collect and lifecycle output without mutating the registry semantics. 3. Add focused runtime/CLI regressions for skipped-candidate diagnostics and verify the updated messages.

## Verify Steps

1. Run focused incidents runtime and CLI tests covering parsed-but-not-promotable findings. Expected: the plan distinguishes empty findings from skipped candidates and the new output is asserted.
2. Run eslint on the touched incidents and lifecycle command files. Expected: no lint errors in touched scope.
3. Review lifecycle output for the new diagnostics path. Expected: commands explicitly report skipped structured findings instead of collapsing everything into the same no-op message.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T23:18:14.227Z — VERIFY — ok

By: CODER

Note: Focused incidents diagnostics coverage passed after worktree bootstrap: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/runtime/incidents/index.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/collect.command.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts. Result: pass. Evidence: empty incident findings now differ from skipped structured findings, and lifecycle diagnostics surface the distinction without changing promotion semantics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:09:41.336Z, excerpt_hash=sha256:c3e786a01fa1fa01aa669e808ea335c4ba4e8b84cf1bdfbd5f0f56fb3b4c56cb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
