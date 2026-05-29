---
id: "202605290636-8F6BQR"
title: "Policy taxonomy type decomposition"
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
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T06:36:22.089Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T06:38:10.196Z"
  updated_by: "CODER"
  note: "KnownPolicyActionId moved to packages/agentplane/src/policy/taxonomy-types.ts and re-exported from taxonomy.ts; descriptor data and resolvePolicyActionDescriptor behavior are unchanged. Checks passed: bun test packages/agentplane/src/policy/taxonomy.test.ts (4 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 2 -> 1)."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting policy taxonomy type-only declarations while preserving descriptor runtime data, public exports, and resolver behavior."
events:
  -
    type: "status"
    at: "2026-05-29T06:36:36.487Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting policy taxonomy type-only declarations while preserving descriptor runtime data, public exports, and resolver behavior."
  -
    type: "verify"
    at: "2026-05-29T06:38:10.196Z"
    author: "CODER"
    state: "ok"
    note: "KnownPolicyActionId moved to packages/agentplane/src/policy/taxonomy-types.ts and re-exported from taxonomy.ts; descriptor data and resolvePolicyActionDescriptor behavior are unchanged. Checks passed: bun test packages/agentplane/src/policy/taxonomy.test.ts (4 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 2 -> 1)."
doc_version: 3
doc_updated_at: "2026-05-29T06:38:10.210Z"
doc_updated_by: "CODER"
description: "Refactor packages/agentplane/src/policy/taxonomy.ts below the 400-line hotspot warning by extracting long type-only taxonomy declarations into focused module(s). Preserve resolvePolicyActionDescriptor behavior, public type exports, and builtin action descriptor data. Acceptance: policy taxonomy tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot."
sections:
  Summary: |-
    Policy taxonomy type decomposition

    Refactor packages/agentplane/src/policy/taxonomy.ts below the 400-line hotspot warning by extracting long type-only taxonomy declarations into focused module(s). Preserve resolvePolicyActionDescriptor behavior, public type exports, and builtin action descriptor data. Acceptance: policy taxonomy tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
  Scope: |-
    - In scope: Refactor packages/agentplane/src/policy/taxonomy.ts below the 400-line hotspot warning by extracting long type-only taxonomy declarations into focused module(s). Preserve resolvePolicyActionDescriptor behavior, public type exports, and builtin action descriptor data. Acceptance: policy taxonomy tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
    - Out of scope: unrelated refactors not required for "Policy taxonomy type decomposition".
  Plan: "1. Extract the long KnownPolicyActionId type union from packages/agentplane/src/policy/taxonomy.ts into a type-only helper module. 2. Re-export the type from taxonomy.ts so external imports remain stable; preserve POLICY_ACTIONS and resolvePolicyActionDescriptor behavior. 3. Run policy taxonomy tests plus typecheck, arch, knip, lint, format, and hotspots checks. 4. Open PR, wait for hosted checks, merge, finish, cleanup."
  Verify Steps: |-
    1. `bun test packages/agentplane/src/policy/taxonomy.test.ts`
    2. `bun run typecheck`
    3. `bun run arch:check`
    4. `bun run knip:check`
    5. `bun run lint:core`
    6. `bun run format:changed`
    7. `bun run hotspots:check`
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T06:38:10.196Z — VERIFY — ok

    By: CODER

    Note: KnownPolicyActionId moved to packages/agentplane/src/policy/taxonomy-types.ts and re-exported from taxonomy.ts; descriptor data and resolvePolicyActionDescriptor behavior are unchanged. Checks passed: bun test packages/agentplane/src/policy/taxonomy.test.ts (4 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 2 -> 1).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:36:36.487Z, excerpt_hash=sha256:416527c2be3d7c25dcde8b11a9614ffe9b84c07877341bf7c569f004b075ef74

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290636-8F6BQR/blueprint/resolved-snapshot.json
    - old_digest: a20d91938b642481026b178dcd9c0f70249b305f340300a747c78b7c635dcc17
    - current_digest: a20d91938b642481026b178dcd9c0f70249b305f340300a747c78b7c635dcc17
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290636-8F6BQR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Policy taxonomy type decomposition

Refactor packages/agentplane/src/policy/taxonomy.ts below the 400-line hotspot warning by extracting long type-only taxonomy declarations into focused module(s). Preserve resolvePolicyActionDescriptor behavior, public type exports, and builtin action descriptor data. Acceptance: policy taxonomy tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/policy/taxonomy.ts below the 400-line hotspot warning by extracting long type-only taxonomy declarations into focused module(s). Preserve resolvePolicyActionDescriptor behavior, public type exports, and builtin action descriptor data. Acceptance: policy taxonomy tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Policy taxonomy type decomposition".

## Plan

1. Extract the long KnownPolicyActionId type union from packages/agentplane/src/policy/taxonomy.ts into a type-only helper module. 2. Re-export the type from taxonomy.ts so external imports remain stable; preserve POLICY_ACTIONS and resolvePolicyActionDescriptor behavior. 3. Run policy taxonomy tests plus typecheck, arch, knip, lint, format, and hotspots checks. 4. Open PR, wait for hosted checks, merge, finish, cleanup.

## Verify Steps

1. `bun test packages/agentplane/src/policy/taxonomy.test.ts`
2. `bun run typecheck`
3. `bun run arch:check`
4. `bun run knip:check`
5. `bun run lint:core`
6. `bun run format:changed`
7. `bun run hotspots:check`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T06:38:10.196Z — VERIFY — ok

By: CODER

Note: KnownPolicyActionId moved to packages/agentplane/src/policy/taxonomy-types.ts and re-exported from taxonomy.ts; descriptor data and resolvePolicyActionDescriptor behavior are unchanged. Checks passed: bun test packages/agentplane/src/policy/taxonomy.test.ts (4 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 2 -> 1).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:36:36.487Z, excerpt_hash=sha256:416527c2be3d7c25dcde8b11a9614ffe9b84c07877341bf7c569f004b075ef74

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290636-8F6BQR/blueprint/resolved-snapshot.json
- old_digest: a20d91938b642481026b178dcd9c0f70249b305f340300a747c78b7c635dcc17
- current_digest: a20d91938b642481026b178dcd9c0f70249b305f340300a747c78b7c635dcc17
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290636-8F6BQR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
