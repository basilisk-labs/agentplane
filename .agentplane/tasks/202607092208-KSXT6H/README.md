---
id: "202607092208-KSXT6H"
title: "Split runtime and backend hotspots for v0.6.22"
result_summary: "Split seven runtime/backend hotspots into cohesive helpers; runtime hotspot count reduced from 9 to 2."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "patch-0.6.22"
  - "refactor"
  - "runtime"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bun run hotspots:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/runner packages/agentplane/src/commands/insights packages/agentplane/src/runtime/sgr packages/agentplane/src/backends/task-backend"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:57.070Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-11T11:46:53.934Z"
  updated_by: "REVIEWER"
  note: "Public APIs and serialized contracts are preserved; all seven scoped hotspots are decomposed. Focused 33/246 and full 364/2157 tests, build, typecheck, architecture, hotspot, contract, Knip, and coverage checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-11T11:47:03.032Z"
  updated_by: "EVALUATOR"
  note: "Scoped hotspot decomposition preserves external contracts and passes the declared verification matrix."
  evaluated_sha: "d63ebfd6171436ff0c84a8feec6c02fb736e86a2"
  blueprint_digest: "11a67e840a3589f825ce9d568a614c9f7ee9947d245095dc1808f41ac1aca91d"
  evidence_refs:
    - ".agentplane/tasks/202607092208-KSXT6H/README.md"
    - ".agentplane/tasks/202607092208-KSXT6H/quality/20260711-114703032-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092208-KSXT6H/quality/20260711-114703032-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092208-KSXT6H/quality/20260711-114703032-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092208-KSXT6H/blueprint/resolved-snapshot.json"
    - "d63ebfd6171436ff0c84a8feec6c02fb736e86a2"
    - "focused:33-files-246-tests"
    - "full:364-files-2157-tests"
    - "build,typecheck,arch,hotspots,ci-contract,knip,coverage:pass"
  findings:
    - "No blocking defects found; seven scoped runtime/backend hotspots were decomposed and repository runtime hotspot count is now two."
commit:
  hash: "d63ebfd6171436ff0c84a8feec6c02fb736e86a2"
  message: "🚧 KSXT6H task: split runtime and backend hotspots"
comments:
  -
    author: "CODER"
    body: "Start: split runtime and backend hotspots behind existing public APIs and schemas."
  -
    author: "INTEGRATOR"
    body: "Verified: scoped refactor preserves APIs and all local/hosted checks passed."
events:
  -
    type: "status"
    at: "2026-07-11T11:31:25.595Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split runtime and backend hotspots behind existing public APIs and schemas."
  -
    type: "verify"
    at: "2026-07-11T11:46:53.934Z"
    author: "REVIEWER"
    state: "ok"
    note: "Public APIs and serialized contracts are preserved; all seven scoped hotspots are decomposed. Focused 33/246 and full 364/2157 tests, build, typecheck, architecture, hotspot, contract, Knip, and coverage checks passed."
  -
    type: "status"
    at: "2026-07-11T11:54:39.352Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: scoped refactor preserves APIs and all local/hosted checks passed."
doc_version: 3
doc_updated_at: "2026-07-11T11:54:39.353Z"
doc_updated_by: "INTEGRATOR"
description: "Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior."
sections:
  Summary: |-
    Split runtime and backend hotspots for v0.6.22

    Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.
  Scope: |-
    - In scope: Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.
    - Out of scope: unrelated refactors not required for "Split runtime and backend hotspots for v0.6.22".
  Plan: |-
    1. Identify stable seams in Hermes, result manifests, insights, SGR contracts, and cloud backends.
    2. Extract internal helpers while leaving public exports, schemas, serialized output, and backend semantics unchanged.
    3. Add regression tests for each moved boundary and verify architecture rules.
    4. Run focused suites, hotspot checks, architecture checks, and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/runner packages/agentplane/src/commands/insights packages/agentplane/src/runtime/sgr packages/agentplane/src/backends/task-backend`; focused suites pass.
    2. Run `bun run arch:check`; dependency boundaries remain valid.
    3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
    4. Run `bun run typecheck` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-11T11:46:53.934Z — VERIFY — ok

    By: REVIEWER

    Note: Public APIs and serialized contracts are preserved; all seven scoped hotspots are decomposed. Focused 33/246 and full 364/2157 tests, build, typecheck, architecture, hotspot, contract, Knip, and coverage checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T11:46:41.305Z, excerpt_hash=sha256:f90157d4c997166fcfd8652a7373224351fe284d252ab0639a1dc4b8c2aee825

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-KSXT6H-split-runtime-and-backend-hotspots-for-v0-6-22/.agentplane/tasks/202607092208-KSXT6H/blueprint/resolved-snapshot.json
    - old_digest: 11a67e840a3589f825ce9d568a614c9f7ee9947d245095dc1808f41ac1aca91d
    - current_digest: 11a67e840a3589f825ce9d568a614c9f7ee9947d245095dc1808f41ac1aca91d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092208-KSXT6H

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092208-KSXT6H
    - diagnostic_command: agentplane pr check 202607092208-KSXT6H
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Extracted cohesive internal modules for Hermes command/runtime, result-manifest artifacts, insights loading/rendering, SGR validation/routing, and cloud configuration overrides. All seven scoped >400-line runtime hotspots are now below the threshold; the repository-wide runtime hotspot count fell from 9 to 2, with the remaining PR flow-status and evaluator command files outside this task scope. Verification passed: focused suites 33 files / 246 tests, full suite 364 files / 2157 tests, build, typecheck, arch:check, hotspots:check, ci:contract, Knip baseline 574/574, and coverage thresholds."
id_source: "generated"
---
## Summary

Split runtime and backend hotspots for v0.6.22

Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.

## Scope

- In scope: Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.
- Out of scope: unrelated refactors not required for "Split runtime and backend hotspots for v0.6.22".

## Plan

1. Identify stable seams in Hermes, result manifests, insights, SGR contracts, and cloud backends.
2. Extract internal helpers while leaving public exports, schemas, serialized output, and backend semantics unchanged.
3. Add regression tests for each moved boundary and verify architecture rules.
4. Run focused suites, hotspot checks, architecture checks, and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/runner packages/agentplane/src/commands/insights packages/agentplane/src/runtime/sgr packages/agentplane/src/backends/task-backend`; focused suites pass.
2. Run `bun run arch:check`; dependency boundaries remain valid.
3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
4. Run `bun run typecheck` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-11T11:46:53.934Z — VERIFY — ok

By: REVIEWER

Note: Public APIs and serialized contracts are preserved; all seven scoped hotspots are decomposed. Focused 33/246 and full 364/2157 tests, build, typecheck, architecture, hotspot, contract, Knip, and coverage checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T11:46:41.305Z, excerpt_hash=sha256:f90157d4c997166fcfd8652a7373224351fe284d252ab0639a1dc4b8c2aee825

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-KSXT6H-split-runtime-and-backend-hotspots-for-v0-6-22/.agentplane/tasks/202607092208-KSXT6H/blueprint/resolved-snapshot.json
- old_digest: 11a67e840a3589f825ce9d568a614c9f7ee9947d245095dc1808f41ac1aca91d
- current_digest: 11a67e840a3589f825ce9d568a614c9f7ee9947d245095dc1808f41ac1aca91d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092208-KSXT6H

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092208-KSXT6H
- diagnostic_command: agentplane pr check 202607092208-KSXT6H
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Extracted cohesive internal modules for Hermes command/runtime, result-manifest artifacts, insights loading/rendering, SGR validation/routing, and cloud configuration overrides. All seven scoped >400-line runtime hotspots are now below the threshold; the repository-wide runtime hotspot count fell from 9 to 2, with the remaining PR flow-status and evaluator command files outside this task scope. Verification passed: focused suites 33 files / 246 tests, full suite 364 files / 2157 tests, build, typecheck, arch:check, hotspots:check, ci:contract, Knip baseline 574/574, and coverage thresholds.
