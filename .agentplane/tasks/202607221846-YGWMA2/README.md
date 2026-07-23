---
id: "202607221846-YGWMA2"
title: "Remove automatic semantic pass verdicts"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on:
  - "202607221846-ZAENM6"
tags:
  - "evaluator"
  - "milestone-alpha1"
  - "refactor"
  - "rf-00"
  - "routing"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T03:39:26.155Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-23T05:05:50.295Z"
  updated_by: "CODER"
  note: "Rework resolved: typed CODER handoff now blocks PR actions for evaluator rework, social titles wrap with rendered-width enforcement, and full local CI passed with 2229 unit tests plus critical CLI, docs, platform, and coverage gates."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-23T05:14:43.959Z"
  updated_by: "EVALUATOR"
  note: "The audited RF-00 implementation and rework fixes remain unchanged at 0fcb2e169; only the managed YGWMA2 README advanced after PR artifact synchronization."
  evaluated_sha: "0fcb2e16939fb9d3aa7c639d8e8fcec8d292a3c6"
  blueprint_digest: "0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b"
  evidence_refs:
    - ".agentplane/tasks/202607221846-YGWMA2/README.md"
    - ".agentplane/tasks/202607221846-YGWMA2/quality/20260723-051443959-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221846-YGWMA2/quality/20260723-051443959-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221846-YGWMA2/quality/20260723-051443959-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221846-YGWMA2/blueprint/resolved-snapshot.json"
    - "git diff --name-status 6f8a8590f..0fcb2e169: only YGWMA2 README"
    - "git diff --quiet 6f8a8590f..0fcb2e169 excluding YGWMA2 README: exit 0"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
    - "packages/agentplane/src/commands/shared/route-execution-packet.ts"
    - "scripts/baselines/trust-boundary-violations.json"
    - "website/scripts/generate-social-images.mjs"
    - "website/static/img/social/docs/user/workflow-migration.png"
    - "focused Vitest: 5 files / 35 tests passed"
    - "bun run ci:local:full: 372 test files / 2229 tests plus critical CLI, docs, platform, and coverage gates passed"
    - "social strict check: 220 images passed"
  findings:
    - "The implementation diff from audited d836982ea remains byte-identical, so the prior semantic, provenance, routing, and visual conclusions remain valid."
    - "RF-00 trust ratchet reports zero current automatic-semantic-verdict violations, with no fixed pass verdict in production or template surfaces."
    - "Fresh rework returns implementation_rework_required to CODER with null argv and blocks PR publication or integration until verification."
    - "All 220 social images pass strict rendered-width validation and inspected regenerated cards have no clipping."
commit:
  hash: "d0a23d1ba1274c45ff7a908b1ffcf4bfb64e7689"
  message: "🧐 YGWMA2 task: record final quality review"
comments:
  -
    author: "CODER"
    body: "Start: remove automatic semantic pass verdicts and replace missing or stale review routes with typed quality-review stops while preserving human provenance."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-23T03:42:12.356Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove automatic semantic pass verdicts and replace missing or stale review routes with typed quality-review stops while preserving human provenance."
  -
    type: "verify"
    at: "2026-07-23T04:31:08.663Z"
    author: "CODER"
    state: "ok"
    note: "Full local CI passed: 2229 unit tests, critical CLI, docs build, Windows-critical tests, coverage, typecheck, lifecycle invariants, guards, and compatibility ratchet."
  -
    type: "verify"
    at: "2026-07-23T04:39:13.025Z"
    author: "EVALUATOR"
    state: "needs_rework"
    note: "Independent review requires rework: workflow migration social preview clips its title, and the route should surface an explicit rework transition after a recorded evaluator rework verdict."
  -
    type: "verify"
    at: "2026-07-23T05:05:50.295Z"
    author: "CODER"
    state: "ok"
    note: "Rework resolved: typed CODER handoff now blocks PR actions for evaluator rework, social titles wrap with rendered-width enforcement, and full local CI passed with 2229 unit tests plus critical CLI, docs, platform, and coverage gates."
  -
    type: "status"
    at: "2026-07-23T05:19:41.444Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-23T05:19:41.444Z"
doc_updated_by: "CODER"
description: "RF-00: remove preselected evaluator pass outcomes from route control, repair guidance, context task contracts, templates, and fixtures; emit a typed evaluator episode or quality-review stop instead."
sections:
  Summary: |-
    Remove automatic semantic pass verdicts

    RF-00: remove preselected evaluator pass outcomes from route control, repair guidance, context task contracts, templates, and fixtures; emit a typed evaluator episode or quality-review stop instead.
  Scope: |-
    - In scope: route decision, repair, execution packet, context-ingest task/prompt, quality-review templates, compatibility views, and regression tests for missing or stale review.
    - Out of scope: replacing semantic review with lint/test heuristics or implementing the full EVALUATOR episode.
  Plan: |-
    1. Introduce the smallest typed quality-review step or structured stop required by current routes.
    2. Remove router- and template-authored verdict, summary, and finding literals.
    3. Preserve the existing human record path with explicit human-supplied provenance.
    4. Update route and context fixtures for missing, stale, and completed review states.
    5. Extend the trust ratchet to prevent recurrence.
  Verify Steps: |-
    1. Search production and template paths for automatic evaluator `--verdict pass` construction. Expected: none remain outside negative fixtures or enumerated verdict types.
    2. Exercise missing and stale quality-review routes. Expected: a typed EVALUATOR episode or `quality_review_required` stop with no synthesized verdict text.
    3. Exercise the human record path. Expected: supplied verdict, summary, and findings carry human provenance.
    4. Run route/context focused tests, `bun run lifecycle:invariants`, `bun run guards:check`, and `bun run typecheck`. Expected: route compatibility remains intact except for the intentional removal of automatic pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T04:31:08.663Z — VERIFY — ok

    By: CODER

    Note: Full local CI passed: 2229 unit tests, critical CLI, docs build, Windows-critical tests, coverage, typecheck, lifecycle invariants, guards, and compatibility ratchet.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T03:42:12.356Z, excerpt_hash=sha256:e5191b3bfe3839fd43f388edb72efc40ec3afb7f27cb5430ec928ec14af5e8e8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-YGWMA2-remove-automatic-semantic-pass-verdicts/.agentplane/tasks/202607221846-YGWMA2/blueprint/resolved-snapshot.json
    - old_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
    - current_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-YGWMA2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221846-YGWMA2
    - diagnostic_command: agentplane pr check 202607221846-YGWMA2
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-23T04:39:13.025Z — VERIFY — needs_rework

    By: EVALUATOR

    Note: Independent review requires rework: workflow migration social preview clips its title, and the route should surface an explicit rework transition after a recorded evaluator rework verdict.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T04:31:08.773Z, excerpt_hash=sha256:e5191b3bfe3839fd43f388edb72efc40ec3afb7f27cb5430ec928ec14af5e8e8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-YGWMA2-remove-automatic-semantic-pass-verdicts/.agentplane/tasks/202607221846-YGWMA2/blueprint/resolved-snapshot.json
    - old_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
    - current_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-YGWMA2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-23T05:05:50.295Z — VERIFY — ok

    By: CODER

    Note: Rework resolved: typed CODER handoff now blocks PR actions for evaluator rework, social titles wrap with rendered-width enforcement, and full local CI passed with 2229 unit tests plus critical CLI, docs, platform, and coverage gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T04:39:13.131Z, excerpt_hash=sha256:e5191b3bfe3839fd43f388edb72efc40ec3afb7f27cb5430ec928ec14af5e8e8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-YGWMA2-remove-automatic-semantic-pass-verdicts/.agentplane/tasks/202607221846-YGWMA2/blueprint/resolved-snapshot.json
    - old_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
    - current_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-YGWMA2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: |-
    - Observation: The committed social image clips the page title, while task next-action classifies a fresh evaluator rework verdict as a stale quality review.
      Impact: Visual output regresses and the CLI leaves the executor without a formal next rework command.
      Resolution: Fix title wrapping and return a typed rework action for a fresh evaluator rework review, then re-run focused and visual checks.

    - Observation: Independent review found a clipped workflow-migration social title and a fresh evaluator rework route that fell through to PR artifact handling.
      Impact: The visual artifact regressed and the CLI did not formalize the implementation handoff before publication.
      Resolution: Added deterministic title wrapping and overflow/truncation guards, introduced implementation_rework_required with a bounded CODER task-worktree handoff, and reran the full local CI successfully.
extensions:
  implementation_commit:
    hash: "0fcb2e16939fb9d3aa7c639d8e8fcec8d292a3c6"
    message: "🚧 YGWMA2 task: address evaluator rework"
id_source: "generated"
---
## Summary

Remove automatic semantic pass verdicts

RF-00: remove preselected evaluator pass outcomes from route control, repair guidance, context task contracts, templates, and fixtures; emit a typed evaluator episode or quality-review stop instead.

## Scope

- In scope: route decision, repair, execution packet, context-ingest task/prompt, quality-review templates, compatibility views, and regression tests for missing or stale review.
- Out of scope: replacing semantic review with lint/test heuristics or implementing the full EVALUATOR episode.

## Plan

1. Introduce the smallest typed quality-review step or structured stop required by current routes.
2. Remove router- and template-authored verdict, summary, and finding literals.
3. Preserve the existing human record path with explicit human-supplied provenance.
4. Update route and context fixtures for missing, stale, and completed review states.
5. Extend the trust ratchet to prevent recurrence.

## Verify Steps

1. Search production and template paths for automatic evaluator `--verdict pass` construction. Expected: none remain outside negative fixtures or enumerated verdict types.
2. Exercise missing and stale quality-review routes. Expected: a typed EVALUATOR episode or `quality_review_required` stop with no synthesized verdict text.
3. Exercise the human record path. Expected: supplied verdict, summary, and findings carry human provenance.
4. Run route/context focused tests, `bun run lifecycle:invariants`, `bun run guards:check`, and `bun run typecheck`. Expected: route compatibility remains intact except for the intentional removal of automatic pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T04:31:08.663Z — VERIFY — ok

By: CODER

Note: Full local CI passed: 2229 unit tests, critical CLI, docs build, Windows-critical tests, coverage, typecheck, lifecycle invariants, guards, and compatibility ratchet.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T03:42:12.356Z, excerpt_hash=sha256:e5191b3bfe3839fd43f388edb72efc40ec3afb7f27cb5430ec928ec14af5e8e8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-YGWMA2-remove-automatic-semantic-pass-verdicts/.agentplane/tasks/202607221846-YGWMA2/blueprint/resolved-snapshot.json
- old_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
- current_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-YGWMA2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221846-YGWMA2
- diagnostic_command: agentplane pr check 202607221846-YGWMA2
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-23T04:39:13.025Z — VERIFY — needs_rework

By: EVALUATOR

Note: Independent review requires rework: workflow migration social preview clips its title, and the route should surface an explicit rework transition after a recorded evaluator rework verdict.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T04:31:08.773Z, excerpt_hash=sha256:e5191b3bfe3839fd43f388edb72efc40ec3afb7f27cb5430ec928ec14af5e8e8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-YGWMA2-remove-automatic-semantic-pass-verdicts/.agentplane/tasks/202607221846-YGWMA2/blueprint/resolved-snapshot.json
- old_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
- current_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-YGWMA2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-23T05:05:50.295Z — VERIFY — ok

By: CODER

Note: Rework resolved: typed CODER handoff now blocks PR actions for evaluator rework, social titles wrap with rendered-width enforcement, and full local CI passed with 2229 unit tests plus critical CLI, docs, platform, and coverage gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T04:39:13.131Z, excerpt_hash=sha256:e5191b3bfe3839fd43f388edb72efc40ec3afb7f27cb5430ec928ec14af5e8e8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-YGWMA2-remove-automatic-semantic-pass-verdicts/.agentplane/tasks/202607221846-YGWMA2/blueprint/resolved-snapshot.json
- old_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
- current_digest: 0a86af4c9407a97894bb9809f1142ffe546b0b84e01fb110d6dfd537068cc68b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-YGWMA2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings

- Observation: The committed social image clips the page title, while task next-action classifies a fresh evaluator rework verdict as a stale quality review.
  Impact: Visual output regresses and the CLI leaves the executor without a formal next rework command.
  Resolution: Fix title wrapping and return a typed rework action for a fresh evaluator rework review, then re-run focused and visual checks.

- Observation: Independent review found a clipped workflow-migration social title and a fresh evaluator rework route that fell through to PR artifact handling.
  Impact: The visual artifact regressed and the CLI did not formalize the implementation handoff before publication.
  Resolution: Added deterministic title wrapping and overflow/truncation guards, introduced implementation_rework_required with a bounded CODER task-worktree handoff, and reran the full local CI successfully.
