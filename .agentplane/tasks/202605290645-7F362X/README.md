---
id: "202605290645-7F362X"
title: "Hosted close command type decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "task"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T06:45:25.219Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T06:47:14.751Z"
  updated_by: "CODER"
  note: "HostedCloseOutcome moved to packages/agentplane/src/commands/task/hosted-close.types.ts; hosted-close runtime behavior and public exports are preserved. Checks passed: hosted-close tests (6 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (zero runtime hotspot warnings)."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting hosted-close command type-only declarations while preserving hosted close recovery, batch close, and follow-up branch behavior."
events:
  -
    type: "status"
    at: "2026-05-29T06:45:34.890Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting hosted-close command type-only declarations while preserving hosted close recovery, batch close, and follow-up branch behavior."
  -
    type: "verify"
    at: "2026-05-29T06:47:14.751Z"
    author: "CODER"
    state: "ok"
    note: "HostedCloseOutcome moved to packages/agentplane/src/commands/task/hosted-close.types.ts; hosted-close runtime behavior and public exports are preserved. Checks passed: hosted-close tests (6 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (zero runtime hotspot warnings)."
doc_version: 3
doc_updated_at: "2026-05-29T06:47:14.765Z"
doc_updated_by: "CODER"
description: "Refactor packages/agentplane/src/commands/task/hosted-close.command.ts below the 400-line hotspot warning by extracting small type-only declarations into focused module(s). Preserve task hosted-close behavior, follow-up branch detection export, recovery paths, batch close behavior, and hosted close output. Acceptance: hosted-close command tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check reports zero runtime hotspots."
sections:
  Summary: |-
    Hosted close command type decomposition

    Refactor packages/agentplane/src/commands/task/hosted-close.command.ts below the 400-line hotspot warning by extracting small type-only declarations into focused module(s). Preserve task hosted-close behavior, follow-up branch detection export, recovery paths, batch close behavior, and hosted close output. Acceptance: hosted-close command tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check reports zero runtime hotspots.
  Scope: |-
    - In scope: Refactor packages/agentplane/src/commands/task/hosted-close.command.ts below the 400-line hotspot warning by extracting small type-only declarations into focused module(s). Preserve task hosted-close behavior, follow-up branch detection export, recovery paths, batch close behavior, and hosted close output. Acceptance: hosted-close command tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check reports zero runtime hotspots.
    - Out of scope: unrelated refactors not required for "Hosted close command type decomposition".
  Plan: "1. Extract HostedCloseOutcome from packages/agentplane/src/commands/task/hosted-close.command.ts into a type-only helper module. 2. Preserve all hosted-close runtime behavior and public exports. 3. Run hosted-close command tests plus typecheck, arch, knip, lint, format, and hotspots checks. 4. Open PR, wait for hosted checks, merge, finish, cleanup."
  Verify Steps: |-
    1. `bun test packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`
    2. `bun run typecheck`
    3. `bun run arch:check`
    4. `bun run knip:check`
    5. `bun run lint:core`
    6. `bun run format:changed`
    7. `bun run hotspots:check`
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T06:47:14.751Z — VERIFY — ok

    By: CODER

    Note: HostedCloseOutcome moved to packages/agentplane/src/commands/task/hosted-close.types.ts; hosted-close runtime behavior and public exports are preserved. Checks passed: hosted-close tests (6 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (zero runtime hotspot warnings).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:45:34.890Z, excerpt_hash=sha256:0717a712b4572becf9eed0f2b809d209b104439687881dc917a32bddcfd1ffd8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290645-7F362X/blueprint/resolved-snapshot.json
    - old_digest: a3a09e0a7d60f6b224bd6973fa57762536f67a410253b1b25880e531315f180b
    - current_digest: a3a09e0a7d60f6b224bd6973fa57762536f67a410253b1b25880e531315f180b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290645-7F362X

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Hosted close command type decomposition

Refactor packages/agentplane/src/commands/task/hosted-close.command.ts below the 400-line hotspot warning by extracting small type-only declarations into focused module(s). Preserve task hosted-close behavior, follow-up branch detection export, recovery paths, batch close behavior, and hosted close output. Acceptance: hosted-close command tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check reports zero runtime hotspots.

## Scope

- In scope: Refactor packages/agentplane/src/commands/task/hosted-close.command.ts below the 400-line hotspot warning by extracting small type-only declarations into focused module(s). Preserve task hosted-close behavior, follow-up branch detection export, recovery paths, batch close behavior, and hosted close output. Acceptance: hosted-close command tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check reports zero runtime hotspots.
- Out of scope: unrelated refactors not required for "Hosted close command type decomposition".

## Plan

1. Extract HostedCloseOutcome from packages/agentplane/src/commands/task/hosted-close.command.ts into a type-only helper module. 2. Preserve all hosted-close runtime behavior and public exports. 3. Run hosted-close command tests plus typecheck, arch, knip, lint, format, and hotspots checks. 4. Open PR, wait for hosted checks, merge, finish, cleanup.

## Verify Steps

1. `bun test packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`
2. `bun run typecheck`
3. `bun run arch:check`
4. `bun run knip:check`
5. `bun run lint:core`
6. `bun run format:changed`
7. `bun run hotspots:check`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T06:47:14.751Z — VERIFY — ok

By: CODER

Note: HostedCloseOutcome moved to packages/agentplane/src/commands/task/hosted-close.types.ts; hosted-close runtime behavior and public exports are preserved. Checks passed: hosted-close tests (6 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (zero runtime hotspot warnings).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:45:34.890Z, excerpt_hash=sha256:0717a712b4572becf9eed0f2b809d209b104439687881dc917a32bddcfd1ffd8

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290645-7F362X/blueprint/resolved-snapshot.json
- old_digest: a3a09e0a7d60f6b224bd6973fa57762536f67a410253b1b25880e531315f180b
- current_digest: a3a09e0a7d60f6b224bd6973fa57762536f67a410253b1b25880e531315f180b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290645-7F362X

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
