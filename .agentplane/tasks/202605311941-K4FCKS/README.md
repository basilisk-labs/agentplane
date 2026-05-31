---
id: "202605311941-K4FCKS"
title: "Design and scaffold Hermes adapter"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "ap doctor"
  - "bunx vitest run packages/agentplane/src/commands/hermes"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T19:41:42.278Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T19:50:39.533Z"
  updated_by: "CODER"
  note: "Final verification passed after CLI reference generation. Commands: node .agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run format:changed (pass)."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved Hermes adapter documentation and initial command scaffold in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T19:42:09.810Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved Hermes adapter documentation and initial command scaffold in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T19:49:23.310Z"
    author: "CODER"
    state: "ok"
    note: "Verified Hermes adapter scaffold and documentation. Commands passed: node .agentplane/policy/check-routing.mjs; ap doctor (OK with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests); bun run --filter=agentplane build; bun run format:changed."
  -
    type: "verify"
    at: "2026-05-31T19:50:39.533Z"
    author: "CODER"
    state: "ok"
    note: "Final verification passed after CLI reference generation. Commands: node .agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run format:changed (pass)."
doc_version: 3
doc_updated_at: "2026-05-31T19:50:39.578Z"
doc_updated_by: "CODER"
description: "Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository."
sections:
  Summary: |-
    Design and scaffold Hermes adapter

    Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
  Scope: |-
    - In scope: Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
    - Out of scope: unrelated refactors not required for "Design and scaffold Hermes adapter".
  Plan: |-
    1. Document the Agentplane-owned Hermes adapter design as the recommended path: no external repository for this task, Hermes dispatch/run lifecycle, Agentplane engineering lifecycle, end-to-end root-card completion, phase cards, idempotency, comment-first audit, sync envelope, and closure gates.
    2. Add a repo-local initial scaffold for Hermes adapter commands/types that can be expanded later without changing Hermes or creating a separate package: expose command help/spec surfaces for enqueue/supervise/reconcile/doctor as design-target stubs with safe no-mutation behavior where appropriate.
    3. Wire command registration and targeted unit coverage for the new scaffold, keeping implementation deterministic and route-oracle-gated by design.
    4. Run verification: node .agentplane/policy/check-routing.mjs, ap doctor, and targeted vitest for the Hermes command scaffold.
  Verify Steps: |-
    1. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes after docs and command registration changes.
    2. Run `ap doctor`. Expected: workspace doctor exits 0; unrelated historical DONE-task commit warnings may remain.
    3. Run `bunx vitest run packages/agentplane/src/commands/hermes`. Expected: Hermes adapter command tests pass.
    4. Run `bun run --filter=agentplane build`. Expected: new command specs and route packet code typecheck and bundle.
    5. Run `bun run format:changed`. Expected: changed docs and TypeScript files pass Prettier.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T19:49:23.310Z — VERIFY — ok

    By: CODER

    Note: Verified Hermes adapter scaffold and documentation. Commands passed: node .agentplane/policy/check-routing.mjs; ap doctor (OK with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests); bun run --filter=agentplane build; bun run format:changed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:48:45.548Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T19:50:39.533Z — VERIFY — ok

    By: CODER

    Note: Final verification passed after CLI reference generation. Commands: node .agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run format:changed (pass).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:49:23.327Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Design and scaffold Hermes adapter

Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.

## Scope

- In scope: Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
- Out of scope: unrelated refactors not required for "Design and scaffold Hermes adapter".

## Plan

1. Document the Agentplane-owned Hermes adapter design as the recommended path: no external repository for this task, Hermes dispatch/run lifecycle, Agentplane engineering lifecycle, end-to-end root-card completion, phase cards, idempotency, comment-first audit, sync envelope, and closure gates.
2. Add a repo-local initial scaffold for Hermes adapter commands/types that can be expanded later without changing Hermes or creating a separate package: expose command help/spec surfaces for enqueue/supervise/reconcile/doctor as design-target stubs with safe no-mutation behavior where appropriate.
3. Wire command registration and targeted unit coverage for the new scaffold, keeping implementation deterministic and route-oracle-gated by design.
4. Run verification: node .agentplane/policy/check-routing.mjs, ap doctor, and targeted vitest for the Hermes command scaffold.

## Verify Steps

1. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes after docs and command registration changes.
2. Run `ap doctor`. Expected: workspace doctor exits 0; unrelated historical DONE-task commit warnings may remain.
3. Run `bunx vitest run packages/agentplane/src/commands/hermes`. Expected: Hermes adapter command tests pass.
4. Run `bun run --filter=agentplane build`. Expected: new command specs and route packet code typecheck and bundle.
5. Run `bun run format:changed`. Expected: changed docs and TypeScript files pass Prettier.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T19:49:23.310Z — VERIFY — ok

By: CODER

Note: Verified Hermes adapter scaffold and documentation. Commands passed: node .agentplane/policy/check-routing.mjs; ap doctor (OK with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests); bun run --filter=agentplane build; bun run format:changed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:48:45.548Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T19:50:39.533Z — VERIFY — ok

By: CODER

Note: Final verification passed after CLI reference generation. Commands: node .agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run format:changed (pass).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:49:23.327Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
