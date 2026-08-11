---
id: "202608102115-7XGP97"
title: "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage"
result_summary: "Merged via PR #4824."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "publish"
blueprint_request: "release.strict"
verify:
  - "agentplane doctor"
  - "bun run ci:contract"
  - "bun run test:fast"
  - "bun run workflows:lint"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T16:51:38.711Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-11T20:30:35.360Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "95308cce1419451193d18ce55c4b1e18a3a3ace5"
  message: "Merge pull request #4824 from basilisk-labs/task/202608102115-7XGP97/refactor-github-verification-so-the-single-requi"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4824 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-08-11T16:52:05.487Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-11T20:30:35.360Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4824 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
    commit: "95308cce1419451193d18ce55c4b1e18a3a3ace5"
doc_version: 3
doc_updated_at: "2026-08-11T20:30:35.369Z"
doc_updated_by: "INTEGRATOR"
description: "Implement the approved CI audit recommendations on current main: make docs, dependency review, workflow lint, and stabilized CodeQL part of fail-closed merge verification; replace binary routing with tested per-capability outputs; avoid irrelevant Windows, package-runtime, coverage, and docs jobs; reduce full-route fan-out and repeated setup/build work; reuse canonical docs and release qualification workflows; remove stale CodeQL workflow registration/configuration drift; preserve exact-SHA release evidence and post-merge safety. Keep unknown paths fail-closed and provide before/after timing evidence without weakening coverage."
sections:
  Summary: |-
    Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage

    Implement the approved CI audit recommendations on current main: make docs, dependency review, workflow lint, and stabilized CodeQL part of fail-closed merge verification; replace binary routing with tested per-capability outputs; avoid irrelevant Windows, package-runtime, coverage, and docs jobs; reduce full-route fan-out and repeated setup/build work; reuse canonical docs and release qualification workflows; remove stale CodeQL workflow registration/configuration drift; preserve exact-SHA release evidence and post-merge safety. Keep unknown paths fail-closed and provide before/after timing evidence without weakening coverage.
  Scope: |-
    - In scope: Implement the approved CI audit recommendations on current main: make docs, dependency review, workflow lint, and stabilized CodeQL part of fail-closed merge verification; replace binary routing with tested per-capability outputs; avoid irrelevant Windows, package-runtime, coverage, and docs jobs; reduce full-route fan-out and repeated setup/build work; reuse canonical docs and release qualification workflows; remove stale CodeQL workflow registration/configuration drift; preserve exact-SHA release evidence and post-merge safety. Keep unknown paths fail-closed and provide before/after timing evidence without weakening coverage.
    - Out of scope: unrelated refactors not required for "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage".
  Plan: |-
    1. Establish one fail-closed PR verification graph. Extend the existing planner with independently testable capability outputs for core, docs, dependency review, workflow lint, Windows, coverage, critical CLI, core package runtime, recipes package runtime, and CodeQL relevance. Keep unknown or routing-sensitive paths on the full route. Make the single required PR verification aggregate reject every scheduled relevant gate that fails, is cancelled, or is unexpectedly skipped.
    2. Consolidate development checks without weakening them. Fold docs validation, dependency review, and workflow lint into the aggregate CI graph; remove overlapping standalone PR execution where the aggregate owns the same contract. Keep deployment, hosted-close, and publication effects outside the PR verification graph.
    3. Reduce the broad-route fan-out and redundant setup. Group short checks into coherent lanes, gate non-critical platform and package checks behind the fast contract lane, and run package/runtime, Windows, coverage, docs, and workflow checks only when their capability output requires them. Preserve full checks for release refs, manual exact-SHA recovery, routing changes, and unknown paths. Target no more than eight executing jobs for a normal broad PR while retaining parallel unit and static lanes.
    4. Unify reusable qualification surfaces. Extract shared workflow setup or reusable workflow calls only where they remove real duplication; make normal and manual docs builds use the same generation, typecheck, information-architecture, build, and design contract. Keep release-ready evidence bound to the exact SHA and do not publish, tag, version, or alter package contents in this task.
    5. Stabilize security checks. Replace the stale CodeQL registration/default-setup drift with one explicit advanced CodeQL workflow/configuration that analyzes Actions and JavaScript/TypeScript source roots, excludes generated task/runtime artifacts, uses least-privilege permissions and bounded concurrency, and reports a deterministic result consumable by PR verification. Keep dependency review fail-closed for dependency-changing PRs. Pin or constrain third-party actions consistently where the repository contract permits it.
    6. Add contract tests and evidence. Cover representative docs-only, dependency-only, workflow-only, agentplane-only, core-only, recipes-only, Windows-sensitive, mixed, release, and unknown-path plans; verify aggregate success/failure/skip semantics and workflow syntax. Run bun run workflows:lint, focused routing/workflow contract tests, bun run test:fast, bun run ci:contract, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Record before/after job-count and routing evidence; treat hosted duration improvements as post-push observations, not fabricated local proof.
    7. Stop conditions and rollback. Stop for re-approval if implementation requires changing branch protection outside the existing single PR verification context, enabling publication, changing release versions/tags, weakening a mandatory check, or modifying more than the coherent CI/workflow/test surface required above. Roll back by reverting the task commits and restoring the previous workflow files; no external publication or destructive provider action is authorized.
  Verify Steps: |-
    PLANNER fallback scaffold for "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "2069221001f334aa7538042998166dae60919499"
    version: 1
id_source: "generated"
---
## Summary

Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage

Implement the approved CI audit recommendations on current main: make docs, dependency review, workflow lint, and stabilized CodeQL part of fail-closed merge verification; replace binary routing with tested per-capability outputs; avoid irrelevant Windows, package-runtime, coverage, and docs jobs; reduce full-route fan-out and repeated setup/build work; reuse canonical docs and release qualification workflows; remove stale CodeQL workflow registration/configuration drift; preserve exact-SHA release evidence and post-merge safety. Keep unknown paths fail-closed and provide before/after timing evidence without weakening coverage.

## Scope

- In scope: Implement the approved CI audit recommendations on current main: make docs, dependency review, workflow lint, and stabilized CodeQL part of fail-closed merge verification; replace binary routing with tested per-capability outputs; avoid irrelevant Windows, package-runtime, coverage, and docs jobs; reduce full-route fan-out and repeated setup/build work; reuse canonical docs and release qualification workflows; remove stale CodeQL workflow registration/configuration drift; preserve exact-SHA release evidence and post-merge safety. Keep unknown paths fail-closed and provide before/after timing evidence without weakening coverage.
- Out of scope: unrelated refactors not required for "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage".

## Plan

1. Establish one fail-closed PR verification graph. Extend the existing planner with independently testable capability outputs for core, docs, dependency review, workflow lint, Windows, coverage, critical CLI, core package runtime, recipes package runtime, and CodeQL relevance. Keep unknown or routing-sensitive paths on the full route. Make the single required PR verification aggregate reject every scheduled relevant gate that fails, is cancelled, or is unexpectedly skipped.
2. Consolidate development checks without weakening them. Fold docs validation, dependency review, and workflow lint into the aggregate CI graph; remove overlapping standalone PR execution where the aggregate owns the same contract. Keep deployment, hosted-close, and publication effects outside the PR verification graph.
3. Reduce the broad-route fan-out and redundant setup. Group short checks into coherent lanes, gate non-critical platform and package checks behind the fast contract lane, and run package/runtime, Windows, coverage, docs, and workflow checks only when their capability output requires them. Preserve full checks for release refs, manual exact-SHA recovery, routing changes, and unknown paths. Target no more than eight executing jobs for a normal broad PR while retaining parallel unit and static lanes.
4. Unify reusable qualification surfaces. Extract shared workflow setup or reusable workflow calls only where they remove real duplication; make normal and manual docs builds use the same generation, typecheck, information-architecture, build, and design contract. Keep release-ready evidence bound to the exact SHA and do not publish, tag, version, or alter package contents in this task.
5. Stabilize security checks. Replace the stale CodeQL registration/default-setup drift with one explicit advanced CodeQL workflow/configuration that analyzes Actions and JavaScript/TypeScript source roots, excludes generated task/runtime artifacts, uses least-privilege permissions and bounded concurrency, and reports a deterministic result consumable by PR verification. Keep dependency review fail-closed for dependency-changing PRs. Pin or constrain third-party actions consistently where the repository contract permits it.
6. Add contract tests and evidence. Cover representative docs-only, dependency-only, workflow-only, agentplane-only, core-only, recipes-only, Windows-sensitive, mixed, release, and unknown-path plans; verify aggregate success/failure/skip semantics and workflow syntax. Run bun run workflows:lint, focused routing/workflow contract tests, bun run test:fast, bun run ci:contract, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Record before/after job-count and routing evidence; treat hosted duration improvements as post-push observations, not fabricated local proof.
7. Stop conditions and rollback. Stop for re-approval if implementation requires changing branch protection outside the existing single PR verification context, enabling publication, changing release versions/tags, weakening a mandatory check, or modifying more than the coherent CI/workflow/test surface required above. Roll back by reverting the task commits and restoring the previous workflow files; no external publication or destructive provider action is authorized.

## Verify Steps

PLANNER fallback scaffold for "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-11T20:30:35.360Z`
