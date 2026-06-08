---
id: "202606080633-RA63N8"
title: "Add deterministic intake and quality diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "insights"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T06:33:54.923Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T06:57:29.534Z"
  updated_by: "CODER"
  note: "Verified: deterministic intake command, task-local manifest writing, insights quality counters, runner failure fingerprints, and generated CLI reference were covered by targeted tests, typecheck, lint, docs freshness, routing, and doctor."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-08T07:01:36.852Z"
  updated_by: "EVALUATOR"
  note: "Deterministic intake and quality diagnostics implementation matches approved scope."
  evaluated_sha: "6ed9b958151b711db0cd14a658474611b2b7d4b5"
  blueprint_digest: "8d1cedc74e1c1788fc8689259692eb3a3a7cf367a50cce59ed0dce5e2372e26d"
  evidence_refs:
    - ".agentplane/tasks/202606080633-RA63N8/README.md"
    - ".agentplane/tasks/202606080633-RA63N8/quality/20260608-070136852-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606080633-RA63N8/quality/20260608-070136852-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606080633-RA63N8/quality/20260608-070136852-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606080633-RA63N8/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts"
    - "bun run typecheck"
    - "targeted eslint changed files"
    - "bun run docs:cli:check"
    - "ap doctor"
  findings:
    - "Pass: the diff adds a no-LLM intake envelope, task-local manifest writing, privacy-safe insights quality metrics, runner failure fingerprints, generated CLI reference, and targeted tests. Verification evidence covers intake behavior, manifest writing, insights rendering, typecheck, targeted lint, formatting, docs freshness, routing, smoke checks, and doctor. Residual full lint wrapper hang is recorded separately and did not produce changed-file diagnostics."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement deterministic intake scaffolding, context-manifest diagnostics, insights quality counters, and bounded runner loop signals within the approved CLI scope."
events:
  -
    type: "status"
    at: "2026-06-08T06:35:18.596Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement deterministic intake scaffolding, context-manifest diagnostics, insights quality counters, and bounded runner loop signals within the approved CLI scope."
  -
    type: "verify"
    at: "2026-06-08T06:57:29.534Z"
    author: "CODER"
    state: "ok"
    note: "Verified: deterministic intake command, task-local manifest writing, insights quality counters, runner failure fingerprints, and generated CLI reference were covered by targeted tests, typecheck, lint, docs freshness, routing, and doctor."
doc_version: 3
doc_updated_at: "2026-06-08T06:57:30.098Z"
doc_updated_by: "CODER"
description: "Implement a deterministic intake envelope for raw requests, task-local file context manifests, insights quality metrics, and runner loop diagnostics without requiring LLM generation."
sections:
  Summary: |-
    Add deterministic intake and quality diagnostics

    Implement a deterministic intake envelope for raw requests, task-local file context manifests, insights quality metrics, and runner loop diagnostics without requiring LLM generation.
  Scope: "Implement a first deterministic AgentPlane quality layer: an intake command that turns raw user text into a structured envelope with warnings and file-context candidates, task-local context manifest writing, insights quality metrics derived from AgentPlane artifacts, and runner loop diagnostics based on repeated failure fingerprints. Do not add LLM generation or user-behavior scoring gates."
  Plan: |-
    1. Inspect existing CLI command catalog, task creation/doc helpers, insights report, and runner trace/result structures.
    2. Add a deterministic intake command with text/JSON output, quality warnings, explicit file extraction, git changed-file context, rg-based candidate paths, default constraints, and optional task manifest writing.
    3. Extend insights report with quality counters for verify-step coverage, task context manifests, and runner repeat/failure signals without reading private raw prompt content.
    4. Add targeted tests and docs/help reference for the new command and metrics.
    5. Verify with targeted tests, routing check, doctor/typecheck as applicable, then record verification.
  Verify Steps: |-
    - Run targeted unit tests for the new intake command, insights quality metrics, and runner loop diagnostics.
    - Run targeted CLI smoke checks for intake dry-run/JSON output and insights report rendering.
    - Run typecheck or targeted compile checks covering changed TypeScript files.
    - Run node .agentplane/policy/check-routing.mjs.
    - Run agentplane doctor or record any pre-existing unrelated diagnostic drift.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T06:57:29.534Z — VERIFY — ok

    By: CODER

    Note: Verified: deterministic intake command, task-local manifest writing, insights quality counters, runner failure fingerprints, and generated CLI reference were covered by targeted tests, typecheck, lint, docs freshness, routing, and doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T06:35:18.596Z, excerpt_hash=sha256:581ee8706f527d292da8d7a8334462f14ee2e8f864e7c23821618cdc386dea86

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080633-RA63N8-add-deterministic-intake-and-quality-diagnostics/.agentplane/tasks/202606080633-RA63N8/blueprint/resolved-snapshot.json
    - old_digest: 8d1cedc74e1c1788fc8689259692eb3a3a7cf367a50cce59ed0dce5e2372e26d
    - current_digest: 8d1cedc74e1c1788fc8689259692eb3a3a7cf367a50cce59ed0dce5e2372e26d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080633-RA63N8

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080633-RA63N8
    - diagnostic_command: agentplane pr check 202606080633-RA63N8
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; bun run typecheck; targeted eslint on changed TS/test files; ./node_modules/.bin/prettier --check changed files; bun run docs:cli:check; git diff --check; node .agentplane/policy/check-routing.mjs; ap intake smoke; ap insights report smoke; ap doctor. Full bun run lint:core was stopped after hanging without diagnostics, so targeted eslint was used for changed files.
      Impact: Implemented scope is locally verified for changed CLI surfaces and privacy-safe diagnostics. Residual risk is limited to full-workspace lint wrapper behavior, not observed changed-file lint failures.
      Resolution: Keep the targeted eslint evidence with typecheck and tests; investigate full lint wrapper separately only if CI reproduces the hang.
id_source: "generated"
---
## Summary

Add deterministic intake and quality diagnostics

Implement a deterministic intake envelope for raw requests, task-local file context manifests, insights quality metrics, and runner loop diagnostics without requiring LLM generation.

## Scope

Implement a first deterministic AgentPlane quality layer: an intake command that turns raw user text into a structured envelope with warnings and file-context candidates, task-local context manifest writing, insights quality metrics derived from AgentPlane artifacts, and runner loop diagnostics based on repeated failure fingerprints. Do not add LLM generation or user-behavior scoring gates.

## Plan

1. Inspect existing CLI command catalog, task creation/doc helpers, insights report, and runner trace/result structures.
2. Add a deterministic intake command with text/JSON output, quality warnings, explicit file extraction, git changed-file context, rg-based candidate paths, default constraints, and optional task manifest writing.
3. Extend insights report with quality counters for verify-step coverage, task context manifests, and runner repeat/failure signals without reading private raw prompt content.
4. Add targeted tests and docs/help reference for the new command and metrics.
5. Verify with targeted tests, routing check, doctor/typecheck as applicable, then record verification.

## Verify Steps

- Run targeted unit tests for the new intake command, insights quality metrics, and runner loop diagnostics.
- Run targeted CLI smoke checks for intake dry-run/JSON output and insights report rendering.
- Run typecheck or targeted compile checks covering changed TypeScript files.
- Run node .agentplane/policy/check-routing.mjs.
- Run agentplane doctor or record any pre-existing unrelated diagnostic drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T06:57:29.534Z — VERIFY — ok

By: CODER

Note: Verified: deterministic intake command, task-local manifest writing, insights quality counters, runner failure fingerprints, and generated CLI reference were covered by targeted tests, typecheck, lint, docs freshness, routing, and doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T06:35:18.596Z, excerpt_hash=sha256:581ee8706f527d292da8d7a8334462f14ee2e8f864e7c23821618cdc386dea86

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080633-RA63N8-add-deterministic-intake-and-quality-diagnostics/.agentplane/tasks/202606080633-RA63N8/blueprint/resolved-snapshot.json
- old_digest: 8d1cedc74e1c1788fc8689259692eb3a3a7cf367a50cce59ed0dce5e2372e26d
- current_digest: 8d1cedc74e1c1788fc8689259692eb3a3a7cf367a50cce59ed0dce5e2372e26d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080633-RA63N8

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080633-RA63N8
- diagnostic_command: agentplane pr check 202606080633-RA63N8
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

- Observation: Commands passed: bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; bun run typecheck; targeted eslint on changed TS/test files; ./node_modules/.bin/prettier --check changed files; bun run docs:cli:check; git diff --check; node .agentplane/policy/check-routing.mjs; ap intake smoke; ap insights report smoke; ap doctor. Full bun run lint:core was stopped after hanging without diagnostics, so targeted eslint was used for changed files.
  Impact: Implemented scope is locally verified for changed CLI surfaces and privacy-safe diagnostics. Residual risk is limited to full-workspace lint wrapper behavior, not observed changed-file lint failures.
  Resolution: Keep the targeted eslint evidence with typecheck and tests; investigate full lint wrapper separately only if CI reproduces the hang.
