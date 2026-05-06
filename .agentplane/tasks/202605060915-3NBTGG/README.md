---
id: "202605060915-3NBTGG"
title: "Add explicit blueprint snapshot refresh command"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605060915-YN0VAQ"
tags:
  - "blueprints"
  - "cli"
  - "lifecycle"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T09:20:39.716Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T14:57:25.483Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "CODER"
    body: "Start: Add explicit blueprint snapshot refresh command on top of committed snapshot schema and start persistence. Dependency is force-started inside the same branch_pr epic because upstream DONE happens only after integration; commits a503b82 and 0d21e91 are present locally."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
events:
  -
    type: "status"
    at: "2026-05-06T09:30:40.659Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add explicit blueprint snapshot refresh command on top of committed snapshot schema and start persistence. Dependency is force-started inside the same branch_pr epic because upstream DONE happens only after integration; commits a503b82 and 0d21e91 are present locally."
  -
    type: "verify"
    at: "2026-05-06T09:34:48.663Z"
    author: "CODER"
    state: "ok"
    note: "Implemented explicit blueprint snapshot refresh command. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js blueprint snapshot 202605060915-3NBTGG --json."
  -
    type: "verify"
    at: "2026-05-06T14:57:25.483Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.678Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.678Z"
doc_updated_by: "INTEGRATOR"
description: "Add a CLI surface to resolve and refresh a task-local blueprint snapshot intentionally, with deterministic output and no hidden task mutation outside the approved artifact."
sections:
  Summary: |-
    Add explicit blueprint snapshot refresh command

    Add a CLI surface to resolve and refresh a task-local blueprint snapshot intentionally, with deterministic output and no hidden task mutation outside the approved artifact.
  Scope: |-
    - In scope: Add a CLI surface to resolve and refresh a task-local blueprint snapshot intentionally, with deterministic output and no hidden task mutation outside the approved artifact.
    - Out of scope: unrelated refactors not required for "Add explicit blueprint snapshot refresh command".
  Plan: |-
    Add an explicit blueprint snapshot refresh surface.

    Depends on: 202605060915-YN0VAQ.

    Steps:
    1. Reuse the snapshot contract and task artifact location from the lifecycle work.
    2. Add a compact CLI command or subcommand to refresh a task blueprint snapshot intentionally.
    3. Make refresh behavior explicit: show old digest, new digest, and whether task route changed.
    4. Add tests for refresh output and artifact rewrite behavior.
    5. Update command help if the command surface changes.

    Verification:
    - Focused CLI tests pass.
    - Refresh command reports deterministic digest changes.
  Verify Steps: |-
    1. Review the requested outcome for "Add explicit blueprint snapshot refresh command". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T09:34:48.663Z — VERIFY — ok

    By: CODER

    Note: Implemented explicit blueprint snapshot refresh command. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js blueprint snapshot 202605060915-3NBTGG --json.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:30:40.659Z, excerpt_hash=sha256:a9c01c78e41de263f9925cb5e44b2c6aec9464e8a205b4abce3ee417b467bd97

    ### 2026-05-06T14:57:25.483Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:34:48.665Z, excerpt_hash=sha256:a9c01c78e41de263f9925cb5e44b2c6aec9464e8a205b4abce3ee417b467bd97

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: blueprint snapshot command reports old_digest, new_digest, changed, route_changed, old/new blueprint ids, previous validity, and writes the task-local resolved snapshot artifact.
      Impact: Operators and future drift checks can intentionally refresh the persisted route instead of relying on hidden resolver recomputation.
      Resolution: Added blueprint snapshot subcommand, CLI registration, refresh helper, and CLI/unit tests.
id_source: "generated"
---
## Summary

Add explicit blueprint snapshot refresh command

Add a CLI surface to resolve and refresh a task-local blueprint snapshot intentionally, with deterministic output and no hidden task mutation outside the approved artifact.

## Scope

- In scope: Add a CLI surface to resolve and refresh a task-local blueprint snapshot intentionally, with deterministic output and no hidden task mutation outside the approved artifact.
- Out of scope: unrelated refactors not required for "Add explicit blueprint snapshot refresh command".

## Plan

Add an explicit blueprint snapshot refresh surface.

Depends on: 202605060915-YN0VAQ.

Steps:
1. Reuse the snapshot contract and task artifact location from the lifecycle work.
2. Add a compact CLI command or subcommand to refresh a task blueprint snapshot intentionally.
3. Make refresh behavior explicit: show old digest, new digest, and whether task route changed.
4. Add tests for refresh output and artifact rewrite behavior.
5. Update command help if the command surface changes.

Verification:
- Focused CLI tests pass.
- Refresh command reports deterministic digest changes.

## Verify Steps

1. Review the requested outcome for "Add explicit blueprint snapshot refresh command". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T09:34:48.663Z — VERIFY — ok

By: CODER

Note: Implemented explicit blueprint snapshot refresh command. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js blueprint snapshot 202605060915-3NBTGG --json.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:30:40.659Z, excerpt_hash=sha256:a9c01c78e41de263f9925cb5e44b2c6aec9464e8a205b4abce3ee417b467bd97

### 2026-05-06T14:57:25.483Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:34:48.665Z, excerpt_hash=sha256:a9c01c78e41de263f9925cb5e44b2c6aec9464e8a205b4abce3ee417b467bd97

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: blueprint snapshot command reports old_digest, new_digest, changed, route_changed, old/new blueprint ids, previous validity, and writes the task-local resolved snapshot artifact.
  Impact: Operators and future drift checks can intentionally refresh the persisted route instead of relying on hidden resolver recomputation.
  Resolution: Added blueprint snapshot subcommand, CLI registration, refresh helper, and CLI/unit tests.
