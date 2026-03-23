---
id: "202603231533-3KB1AD"
title: "Map recipe run_profile into real runner invocation"
result_summary: "Mapped recipe run_profile into the Codex runner invocation contract."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202603231533-V6SVH2"
tags:
  - "code"
  - "runner"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T15:59:33.510Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T16:04:08.168Z"
  updated_by: "CODER"
  note: "Re-verified run_profile-aware Codex invocation mapping after the adapter lint fix with codex adapter tests, live scenario runner CLI coverage, source builds, and doctor; broader recipes.scenario missing-definition drift remains outside this task scope."
commit:
  hash: "60bbc7a52945d3383564d0d22acbc25d0c8fa756"
  message: "✅ 3KB1AD code: done"
comments:
  -
    author: "CODER"
    body: "Start: map normalized recipe run_profile into runner preparation so Codex invocation reflects safe runtime intent without changing non-recipe task behavior."
  -
    author: "CODER"
    body: "Start: map resolved recipe run_profile values into concrete runner invocation metadata so recipe-backed runs stop hardcoding Codex execution semantics."
  -
    author: "CODER"
    body: "Verified: mapped recipe run_profile sandbox into Codex invocation, exported the remaining run_profile fields as adapter metadata, and locked the behavior with adapter and live scenario runner tests."
events:
  -
    type: "status"
    at: "2026-03-23T15:59:13.528Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: map normalized recipe run_profile into runner preparation so Codex invocation reflects safe runtime intent without changing non-recipe task behavior."
  -
    type: "status"
    at: "2026-03-23T15:59:34.914Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: map resolved recipe run_profile values into concrete runner invocation metadata so recipe-backed runs stop hardcoding Codex execution semantics."
  -
    type: "verify"
    at: "2026-03-23T16:03:13.722Z"
    author: "CODER"
    state: "ok"
    note: "Verified run_profile-aware Codex invocation mapping with codex adapter tests, live scenario runner CLI coverage, source builds, and doctor; broader recipes.scenario missing-definition drift remains outside this task scope."
  -
    type: "verify"
    at: "2026-03-23T16:04:08.168Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified run_profile-aware Codex invocation mapping after the adapter lint fix with codex adapter tests, live scenario runner CLI coverage, source builds, and doctor; broader recipes.scenario missing-definition drift remains outside this task scope."
  -
    type: "status"
    at: "2026-03-23T16:04:31.037Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: mapped recipe run_profile sandbox into Codex invocation, exported the remaining run_profile fields as adapter metadata, and locked the behavior with adapter and live scenario runner tests."
doc_version: 3
doc_updated_at: "2026-03-23T16:04:31.038Z"
doc_updated_by: "CODER"
description: "Translate resolved run_profile semantics into concrete runner execution settings instead of hardcoding Codex invocation flags, while preserving current task and scenario flows."
sections:
  Summary: |-
    Map recipe run_profile into real runner invocation
    
    Translate resolved run_profile semantics into concrete runner execution settings instead of hardcoding Codex invocation flags, while preserving current task and scenario flows.
  Scope: |-
    - In scope: Translate resolved run_profile semantics into concrete runner execution settings instead of hardcoding Codex invocation flags, while preserving current task and scenario flows.
    - Out of scope: unrelated refactors not required for "Map recipe run_profile into real runner invocation".
  Plan: |-
    1. Add a narrow run_profile-to-invocation normalization helper in the runner adapter layer so recipe-derived sandbox semantics influence the Codex argv/env contract without changing task-run orchestration.
    2. Preserve the current default invocation contract for plain task runs, but when recipe context is present, map the allowed sandbox values and expose the remaining run_profile fields as metadata/env for future adapters.
    3. Extend adapter and recipe regression tests to lock the new mapping behavior, then rerun the declared verification commands.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: run_profile-derived invocation metadata is reflected in the Codex adapter without regressing scenario execution through the shared runner flow.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: runner and recipe code build cleanly from source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T16:03:13.722Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified run_profile-aware Codex invocation mapping with codex adapter tests, live scenario runner CLI coverage, source builds, and doctor; broader recipes.scenario missing-definition drift remains outside this task scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:03:05.383Z, excerpt_hash=sha256:c3c4b5d8e5d9e330b47d66702ba5a0c976e6d94d9daf2e3f0f6da7c526e9453b
    
    #### 2026-03-23T16:04:08.168Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified run_profile-aware Codex invocation mapping after the adapter lint fix with codex adapter tests, live scenario runner CLI coverage, source builds, and doctor; broader recipes.scenario missing-definition drift remains outside this task scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:03:13.728Z, excerpt_hash=sha256:c3c4b5d8e5d9e330b47d66702ba5a0c976e6d94d9daf2e3f0f6da7c526e9453b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Broader `packages/agentplane/src/commands/recipes.scenario.test.ts` still contains pre-existing failures around missing scenario-definition semantics introduced by earlier recipe/task_template work. T2 intentionally narrowed verification to adapter plus live scenario execution instead of widening scope into that resolver drift."
id_source: "generated"
---
## Summary

Map recipe run_profile into real runner invocation

Translate resolved run_profile semantics into concrete runner execution settings instead of hardcoding Codex invocation flags, while preserving current task and scenario flows.

## Scope

- In scope: Translate resolved run_profile semantics into concrete runner execution settings instead of hardcoding Codex invocation flags, while preserving current task and scenario flows.
- Out of scope: unrelated refactors not required for "Map recipe run_profile into real runner invocation".

## Plan

1. Add a narrow run_profile-to-invocation normalization helper in the runner adapter layer so recipe-derived sandbox semantics influence the Codex argv/env contract without changing task-run orchestration.
2. Preserve the current default invocation contract for plain task runs, but when recipe context is present, map the allowed sandbox values and expose the remaining run_profile fields as metadata/env for future adapters.
3. Extend adapter and recipe regression tests to lock the new mapping behavior, then rerun the declared verification commands.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: run_profile-derived invocation metadata is reflected in the Codex adapter without regressing scenario execution through the shared runner flow.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: runner and recipe code build cleanly from source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T16:03:13.722Z — VERIFY — ok

By: CODER

Note: Verified run_profile-aware Codex invocation mapping with codex adapter tests, live scenario runner CLI coverage, source builds, and doctor; broader recipes.scenario missing-definition drift remains outside this task scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:03:05.383Z, excerpt_hash=sha256:c3c4b5d8e5d9e330b47d66702ba5a0c976e6d94d9daf2e3f0f6da7c526e9453b

#### 2026-03-23T16:04:08.168Z — VERIFY — ok

By: CODER

Note: Re-verified run_profile-aware Codex invocation mapping after the adapter lint fix with codex adapter tests, live scenario runner CLI coverage, source builds, and doctor; broader recipes.scenario missing-definition drift remains outside this task scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:03:13.728Z, excerpt_hash=sha256:c3c4b5d8e5d9e330b47d66702ba5a0c976e6d94d9daf2e3f0f6da7c526e9453b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Broader `packages/agentplane/src/commands/recipes.scenario.test.ts` still contains pre-existing failures around missing scenario-definition semantics introduced by earlier recipe/task_template work. T2 intentionally narrowed verification to adapter plus live scenario execution instead of widening scope into that resolver drift.
