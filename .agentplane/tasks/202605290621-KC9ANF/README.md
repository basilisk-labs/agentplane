---
id: "202605290621-KC9ANF"
title: "Release plan command decomposition"
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
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T06:21:25.839Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T06:26:03.144Z"
  updated_by: "CODER"
  note: "Release plan helpers extracted into packages/agentplane/src/commands/release/plan.helpers.ts; runReleasePlan behavior and generated release plan artifacts are preserved. Checks passed: release plan/apply matrix (31 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 3 -> 2)."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting release plan helper logic while preserving runReleasePlan validation, generated artifacts, protected base resolution, and release policy gates."
events:
  -
    type: "status"
    at: "2026-05-29T06:21:37.426Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting release plan helper logic while preserving runReleasePlan validation, generated artifacts, protected base resolution, and release policy gates."
  -
    type: "verify"
    at: "2026-05-29T06:26:03.144Z"
    author: "CODER"
    state: "ok"
    note: "Release plan helpers extracted into packages/agentplane/src/commands/release/plan.helpers.ts; runReleasePlan behavior and generated release plan artifacts are preserved. Checks passed: release plan/apply matrix (31 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 3 -> 2)."
doc_version: 3
doc_updated_at: "2026-05-29T06:26:03.161Z"
doc_updated_by: "CODER"
description: "Refactor packages/agentplane/src/commands/release/plan.command.ts below the 400-line hotspot warning by extracting semver/change rendering helpers into focused module(s). Preserve release plan validation, incident gate, protected base SHA resolution, generated version/changes/instructions files, and runReleasePlan public API. Acceptance: release plan tests pass, release apply tests importing runReleasePlan pass where relevant, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot."
sections:
  Summary: |-
    Release plan command decomposition

    Refactor packages/agentplane/src/commands/release/plan.command.ts below the 400-line hotspot warning by extracting semver/change rendering helpers into focused module(s). Preserve release plan validation, incident gate, protected base SHA resolution, generated version/changes/instructions files, and runReleasePlan public API. Acceptance: release plan tests pass, release apply tests importing runReleasePlan pass where relevant, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
  Scope: |-
    - In scope: Refactor packages/agentplane/src/commands/release/plan.command.ts below the 400-line hotspot warning by extracting semver/change rendering helpers into focused module(s). Preserve release plan validation, incident gate, protected base SHA resolution, generated version/changes/instructions files, and runReleasePlan public API. Acceptance: release plan tests pass, release apply tests importing runReleasePlan pass where relevant, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
    - Out of scope: unrelated refactors not required for "Release plan command decomposition".
  Plan: "1. Extract release plan semver/change rendering helpers from packages/agentplane/src/commands/release/plan.command.ts into a focused helper module. 2. Keep runReleasePlan and releasePlanSpec exports stable and preserve all validation/error behavior. 3. Run targeted release plan tests plus relevant release apply import surfaces, then typecheck, arch, knip, lint, format, and hotspots checks. 4. Open PR, wait for hosted checks, merge, finish, cleanup."
  Verify Steps: |-
    1. `bun test packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/apply.version-mutation.test.ts packages/agentplane/src/commands/release/apply.preflight.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/release/apply.push-recovery.test.ts`
    2. `bun run typecheck`
    3. `bun run arch:check`
    4. `bun run knip:check`
    5. `bun run lint:core`
    6. `bun run format:changed`
    7. `bun run hotspots:check`
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T06:26:03.144Z — VERIFY — ok

    By: CODER

    Note: Release plan helpers extracted into packages/agentplane/src/commands/release/plan.helpers.ts; runReleasePlan behavior and generated release plan artifacts are preserved. Checks passed: release plan/apply matrix (31 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 3 -> 2).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:21:37.426Z, excerpt_hash=sha256:d2676e8246f664dce7eaf868d21eb3d86a9da67d60752e71be754324a30e9c01

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290621-KC9ANF/blueprint/resolved-snapshot.json
    - old_digest: 5969389e3998a84db7633271e74f94893b43676ef56cec1d696e914cc3210148
    - current_digest: 5969389e3998a84db7633271e74f94893b43676ef56cec1d696e914cc3210148
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290621-KC9ANF

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release plan command decomposition

Refactor packages/agentplane/src/commands/release/plan.command.ts below the 400-line hotspot warning by extracting semver/change rendering helpers into focused module(s). Preserve release plan validation, incident gate, protected base SHA resolution, generated version/changes/instructions files, and runReleasePlan public API. Acceptance: release plan tests pass, release apply tests importing runReleasePlan pass where relevant, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/commands/release/plan.command.ts below the 400-line hotspot warning by extracting semver/change rendering helpers into focused module(s). Preserve release plan validation, incident gate, protected base SHA resolution, generated version/changes/instructions files, and runReleasePlan public API. Acceptance: release plan tests pass, release apply tests importing runReleasePlan pass where relevant, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Release plan command decomposition".

## Plan

1. Extract release plan semver/change rendering helpers from packages/agentplane/src/commands/release/plan.command.ts into a focused helper module. 2. Keep runReleasePlan and releasePlanSpec exports stable and preserve all validation/error behavior. 3. Run targeted release plan tests plus relevant release apply import surfaces, then typecheck, arch, knip, lint, format, and hotspots checks. 4. Open PR, wait for hosted checks, merge, finish, cleanup.

## Verify Steps

1. `bun test packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/apply.version-mutation.test.ts packages/agentplane/src/commands/release/apply.preflight.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/release/apply.push-recovery.test.ts`
2. `bun run typecheck`
3. `bun run arch:check`
4. `bun run knip:check`
5. `bun run lint:core`
6. `bun run format:changed`
7. `bun run hotspots:check`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T06:26:03.144Z — VERIFY — ok

By: CODER

Note: Release plan helpers extracted into packages/agentplane/src/commands/release/plan.helpers.ts; runReleasePlan behavior and generated release plan artifacts are preserved. Checks passed: release plan/apply matrix (31 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 3 -> 2).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:21:37.426Z, excerpt_hash=sha256:d2676e8246f664dce7eaf868d21eb3d86a9da67d60752e71be754324a30e9c01

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290621-KC9ANF/blueprint/resolved-snapshot.json
- old_digest: 5969389e3998a84db7633271e74f94893b43676ef56cec1d696e914cc3210148
- current_digest: 5969389e3998a84db7633271e74f94893b43676ef56cec1d696e914cc3210148
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290621-KC9ANF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
