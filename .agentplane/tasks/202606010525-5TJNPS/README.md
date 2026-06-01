---
id: "202606010525-5TJNPS"
title: "Add Hermes task-run launch path"
result_summary: "Merged via PR #4348."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hermes"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T05:25:56.834Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T05:45:22.371Z"
  updated_by: "CODER"
  note: "Addressed PR review thread by updating the init execution fixture with runnerAdapter. Rechecked: bun run typecheck; bun run format:changed; bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/execution.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-01T05:43:04.723Z"
  updated_by: "EVALUATOR"
  note: "Hermes task-run launch path and Hermes runner init profile match issue #4347 acceptance criteria."
  evaluated_sha: "4ebe738185ef4670975048c1b3258cf66195cc5d"
  blueprint_digest: "94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1"
  evidence_refs:
    - ".agentplane/tasks/202606010525-5TJNPS/README.md"
    - ".agentplane/tasks/202606010525-5TJNPS/quality/20260601-054304723-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606010525-5TJNPS/quality/20260601-054304723-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606010525-5TJNPS/quality/20260601-054304723-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606010525-5TJNPS/blueprint/resolved-snapshot.json"
    - "PR #4348 hosted checks pass; local checks recorded in task verification"
  findings:
    - "Reviewed typed route gating for same-task agentplane task run, Hermes runner adapter/init config, schema and CLI docs updates, and local plus hosted check evidence."
commit:
  hash: "1e71198eb64409c7935a5193174901c8b933ac40"
  message: "Merge pull request #4348 from basilisk-labs/task/202606010525-5TJNPS/add-hermes-task-run-launch-path"
comments:
  -
    author: "CODER"
    body: "Start: Implementing issue #4347 by adding a typed Hermes task-run supervise action and first-class Hermes runner/init profile, with no Codex fallback or legacy compatibility path."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4348 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-01T05:26:11.655Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing issue #4347 by adding a typed Hermes task-run supervise action and first-class Hermes runner/init profile, with no Codex fallback or legacy compatibility path."
  -
    type: "verify"
    at: "2026-06-01T05:36:23.142Z"
    author: "CODER"
    state: "ok"
    note: "Verified Hermes task-run supervise and Hermes runner init profile. Checks: bun x vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/core/src/config/config.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts; bun run typecheck; bun run format:changed; bun run schemas:check; bun run docs:cli:check; bun run docs:recipes:check; node .agentplane/policy/check-routing.mjs."
  -
    type: "verify"
    at: "2026-06-01T05:45:22.371Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review thread by updating the init execution fixture with runnerAdapter. Rechecked: bun run typecheck; bun run format:changed; bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/execution.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts."
  -
    type: "status"
    at: "2026-06-01T06:13:18.718Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4348 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-01T06:13:18.724Z"
doc_updated_by: "INTEGRATOR"
description: "Fix GitHub issue #4347. Allow Hermes supervise to execute same-task agentplane task run route steps through typed allowlisting, and add a first-class Hermes init/runner profile without Codex fallback or backwards compatibility aliases."
sections:
  Summary: |-
    Add Hermes task-run launch path

    Fix GitHub issue #4347. Allow Hermes supervise to execute same-task agentplane task run route steps through typed allowlisting, and add a first-class Hermes init/runner profile without Codex fallback or backwards compatibility aliases.
  Scope: |-
    - In scope: Fix GitHub issue #4347. Allow Hermes supervise to execute same-task agentplane task run route steps through typed allowlisting, and add a first-class Hermes init/runner profile without Codex fallback or backwards compatibility aliases.
    - Out of scope: unrelated refactors not required for "Add Hermes task-run launch path".
  Plan: |-
    Plan:
    1. Extend Hermes supervise route classification to allow only same-task agentplane task run <task-id> through the existing typed executor, preserving no raw shell execution.
    2. Add dry-run and child failure-code propagation tests for the new task run action.
    3. Add first-class Hermes runner/init profile support so new repositories can select Hermes execution without Codex fallback.
    4. Update schema/help/docs tests and documentation for the Hermes profile.
    5. Verify with targeted Hermes, runner config, and init tests plus routing/format checks, then merge PR and close #4347.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T05:36:23.142Z — VERIFY — ok

    By: CODER

    Note: Verified Hermes task-run supervise and Hermes runner init profile. Checks: bun x vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/core/src/config/config.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts; bun run typecheck; bun run format:changed; bun run schemas:check; bun run docs:cli:check; bun run docs:recipes:check; node .agentplane/policy/check-routing.mjs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:26:11.655Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010525-5TJNPS-add-hermes-task-run-launch-path/.agentplane/tasks/202606010525-5TJNPS/blueprint/resolved-snapshot.json
    - old_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
    - current_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010525-5TJNPS

    ### 2026-06-01T05:45:22.371Z — VERIFY — ok

    By: CODER

    Note: Addressed PR review thread by updating the init execution fixture with runnerAdapter. Rechecked: bun run typecheck; bun run format:changed; bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/execution.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:36:23.156Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010525-5TJNPS-add-hermes-task-run-launch-path/.agentplane/tasks/202606010525-5TJNPS/blueprint/resolved-snapshot.json
    - old_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
    - current_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010525-5TJNPS

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add Hermes task-run launch path

Fix GitHub issue #4347. Allow Hermes supervise to execute same-task agentplane task run route steps through typed allowlisting, and add a first-class Hermes init/runner profile without Codex fallback or backwards compatibility aliases.

## Scope

- In scope: Fix GitHub issue #4347. Allow Hermes supervise to execute same-task agentplane task run route steps through typed allowlisting, and add a first-class Hermes init/runner profile without Codex fallback or backwards compatibility aliases.
- Out of scope: unrelated refactors not required for "Add Hermes task-run launch path".

## Plan

Plan:
1. Extend Hermes supervise route classification to allow only same-task agentplane task run <task-id> through the existing typed executor, preserving no raw shell execution.
2. Add dry-run and child failure-code propagation tests for the new task run action.
3. Add first-class Hermes runner/init profile support so new repositories can select Hermes execution without Codex fallback.
4. Update schema/help/docs tests and documentation for the Hermes profile.
5. Verify with targeted Hermes, runner config, and init tests plus routing/format checks, then merge PR and close #4347.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T05:36:23.142Z — VERIFY — ok

By: CODER

Note: Verified Hermes task-run supervise and Hermes runner init profile. Checks: bun x vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/core/src/config/config.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts; bun run typecheck; bun run format:changed; bun run schemas:check; bun run docs:cli:check; bun run docs:recipes:check; node .agentplane/policy/check-routing.mjs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:26:11.655Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010525-5TJNPS-add-hermes-task-run-launch-path/.agentplane/tasks/202606010525-5TJNPS/blueprint/resolved-snapshot.json
- old_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
- current_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010525-5TJNPS

### 2026-06-01T05:45:22.371Z — VERIFY — ok

By: CODER

Note: Addressed PR review thread by updating the init execution fixture with runnerAdapter. Rechecked: bun run typecheck; bun run format:changed; bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/execution.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:36:23.156Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010525-5TJNPS-add-hermes-task-run-launch-path/.agentplane/tasks/202606010525-5TJNPS/blueprint/resolved-snapshot.json
- old_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
- current_digest: 94162ba4c475107cd70bf1c3284ddef3120e0814703024345182adeae1cb6dc1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010525-5TJNPS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
