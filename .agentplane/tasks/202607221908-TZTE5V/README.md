---
id: "202607221908-TZTE5V"
title: "Migrate project, config, help, and docs command boundaries"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202607221854-RW8CJF"
tags:
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "rf-25"
  - "v0.7"
  - "vertical-slice"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run docs:cli:check"
  - "bun run guards:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T00:02:03.655Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T00:22:32.323Z"
  updated_by: "TESTER"
  note: "Verified minimal capability profiles and typed renderer boundaries. Focused tests (100), docs CLI freshness, guards, critical tests (12/12), TS7 typecheck, format, lint, architecture, knip baseline, and diff check passed; evidence: .agentplane/tasks/202607221908-TZTE5V/verification/project-config-help-docs-migration.md"
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T00:25:25.031Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "9c86014e8a496a0522ef2476cb169ad4e85ae7ef"
  blueprint_digest: "44c913dba6b9de430d88637869aa5b63d129c6b68eb64448eaa5c930836b800b"
  evidence_refs:
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221908-TZTE5V/README.md"
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-TZTE5V/quality/20260801-002524472-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No blocking finding in the implementation diff or close-tail metadata; the close commit records the verified implementation hash and mirrors the incident registry deterministically."
    - "The generated incident entry documents the reproduced stale help snapshot and does not change runtime behavior."
commit:
  hash: "607cc2753f554bef9fbb367068da22ea79a09963"
  message: "🧪 TZTE5V task: refresh review evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: minimal project/config/output sessions, typed use-case results, compatibility renderers, and focused regression evidence are committed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-01T00:02:27.922Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T00:22:14.119Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: minimal project/config/output sessions, typed use-case results, compatibility renderers, and focused regression evidence are committed."
  -
    type: "verify"
    at: "2026-08-01T00:22:32.323Z"
    author: "TESTER"
    state: "ok"
    note: "Verified minimal capability profiles and typed renderer boundaries. Focused tests (100), docs CLI freshness, guards, critical tests (12/12), TS7 typecheck, format, lint, architecture, knip baseline, and diff check passed; evidence: .agentplane/tasks/202607221908-TZTE5V/verification/project-config-help-docs-migration.md"
  -
    type: "status"
    at: "2026-08-01T00:24:32.620Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-08-01T00:27:28.360Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-01T00:27:28.361Z"
doc_updated_by: "CODER"
description: "RF-24/RF-25 vertical slice: give project/config/help/docs commands minimal typed session capabilities and typed results with centralized compatibility renderers."
sections:
  Summary: |-
    Migrate project, config, help, and docs command boundaries

    RF-24/RF-25 vertical slice: give project/config/help/docs commands minimal typed session capabilities and typed results with centralized compatibility renderers.
  Scope: |-
    - In scope: project/config/runtime explain/help/docs command catalog requirements, lazy session preparation, typed use-case result/error unions, human/JSON renderers, help/docs generation parity, and removal of direct stdout/business coupling in this family.
    - Out of scope: task, context, runner, provider, or release command families.
  Plan: |-
    1. Inventory the family commands and declare minimal project/config/output capabilities.
    2. Extract typed results/errors from command handlers.
    3. Centralize human/JSON/help rendering and exit mapping.
    4. Remove eager task/Git/provider preparation and duplicate loader metadata.
    5. Run family snapshots, docs generation, laziness, and denial tests.
  Verify Steps: |-
    1. Execute project/config/help/docs fixtures. Expected: no task/Git/provider capability loads and typed results render compatible human/JSON output.
    2. Attempt undeclared session access. Expected: compile-time or typed boundary failure.
    3. Regenerate CLI/docs surfaces. Expected: no output/reference drift.
    4. Run family tests, docs CLI check, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T00:22:32.323Z — VERIFY — ok

    By: TESTER

    Note: Verified minimal capability profiles and typed renderer boundaries. Focused tests (100), docs CLI freshness, guards, critical tests (12/12), TS7 typecheck, format, lint, architecture, knip baseline, and diff check passed; evidence: .agentplane/tasks/202607221908-TZTE5V/verification/project-config-help-docs-migration.md
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T00:22:14.119Z, excerpt_hash=sha256:9ce64a1d327e47cc63d1a606c55c68344c767e35a04bd14cd5a5225a8d14c3ee

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-TZTE5V-migrate-project-config-help-and-docs-command-bou/.agentplane/tasks/202607221908-TZTE5V/blueprint/resolved-snapshot.json
    - old_digest: 44c913dba6b9de430d88637869aa5b63d129c6b68eb64448eaa5c930836b800b
    - current_digest: 44c913dba6b9de430d88637869aa5b63d129c6b68eb64448eaa5c930836b800b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-TZTE5V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221908-TZTE5V
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only this command family to the explicit legacy session/result adapter.
    - Preserve the shared capability and renderer contracts for other slices.
    - Re-run family snapshots and docs generation.
  Findings: |-
    - Observation: The clean main baseline help registry snapshot did not match the current command catalog.
      Impact: The help snapshot suite failed before this task's implementation could be evaluated.
      Resolution: Reproduced the failure at main commit 0dca3d627916e8c36ecf46bcbbb523a3b0013317 and refreshed only the help snapshot owned by this vertical slice.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Project/config/help/docs commands prepare only declared project, config, or output capabilities; fast help prepares none.
      Impact: The CLI now supplies formal context for this family without loading task or provider state, reducing agent context overhead while preserving output compatibility.
      Resolution: Keep this vertical slice and continue remaining command families in dedicated tasks.
extensions:
  implementation_commit:
    hash: "9c86014e8a496a0522ef2476cb169ad4e85ae7ef"
    message: "♻️ TZTE5V task: pre-merge closure"
  workflow_route_baseline:
    start_head_sha: "0dca3d627916e8c36ecf46bcbbb523a3b0013317"
    version: 1
id_source: "generated"
---
## Summary

Migrate project, config, help, and docs command boundaries

RF-24/RF-25 vertical slice: give project/config/help/docs commands minimal typed session capabilities and typed results with centralized compatibility renderers.

## Scope

- In scope: project/config/runtime explain/help/docs command catalog requirements, lazy session preparation, typed use-case result/error unions, human/JSON renderers, help/docs generation parity, and removal of direct stdout/business coupling in this family.
- Out of scope: task, context, runner, provider, or release command families.

## Plan

1. Inventory the family commands and declare minimal project/config/output capabilities.
2. Extract typed results/errors from command handlers.
3. Centralize human/JSON/help rendering and exit mapping.
4. Remove eager task/Git/provider preparation and duplicate loader metadata.
5. Run family snapshots, docs generation, laziness, and denial tests.

## Verify Steps

1. Execute project/config/help/docs fixtures. Expected: no task/Git/provider capability loads and typed results render compatible human/JSON output.
2. Attempt undeclared session access. Expected: compile-time or typed boundary failure.
3. Regenerate CLI/docs surfaces. Expected: no output/reference drift.
4. Run family tests, docs CLI check, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T00:22:32.323Z — VERIFY — ok

By: TESTER

Note: Verified minimal capability profiles and typed renderer boundaries. Focused tests (100), docs CLI freshness, guards, critical tests (12/12), TS7 typecheck, format, lint, architecture, knip baseline, and diff check passed; evidence: .agentplane/tasks/202607221908-TZTE5V/verification/project-config-help-docs-migration.md
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T00:22:14.119Z, excerpt_hash=sha256:9ce64a1d327e47cc63d1a606c55c68344c767e35a04bd14cd5a5225a8d14c3ee

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-TZTE5V-migrate-project-config-help-and-docs-command-bou/.agentplane/tasks/202607221908-TZTE5V/blueprint/resolved-snapshot.json
- old_digest: 44c913dba6b9de430d88637869aa5b63d129c6b68eb64448eaa5c930836b800b
- current_digest: 44c913dba6b9de430d88637869aa5b63d129c6b68eb64448eaa5c930836b800b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-TZTE5V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-TZTE5V
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only this command family to the explicit legacy session/result adapter.
- Preserve the shared capability and renderer contracts for other slices.
- Re-run family snapshots and docs generation.

## Findings

- Observation: The clean main baseline help registry snapshot did not match the current command catalog.
  Impact: The help snapshot suite failed before this task's implementation could be evaluated.
  Resolution: Reproduced the failure at main commit 0dca3d627916e8c36ecf46bcbbb523a3b0013317 and refreshed only the help snapshot owned by this vertical slice.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Project/config/help/docs commands prepare only declared project, config, or output capabilities; fast help prepares none.
  Impact: The CLI now supplies formal context for this family without loading task or provider state, reducing agent context overhead while preserving output compatibility.
  Resolution: Keep this vertical slice and continue remaining command families in dedicated tasks.
