---
id: "202608102243-1RG86M"
title: "Make verification atomic and reusable across lifecycle-only drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "bun run hotspots:check"
  - "bun run lint"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T22:43:45.039Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-10T23:54:33.870Z"
  updated_by: "TESTER"
  note: "Content-addressed verification and terminal convergence pass after direct-mode lifecycle exclusion."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "e3a351ab0dbf4bb6d2296ec79cb1a70cb78ddb26"
  message: "🐛 1RG86M task: accept bounded verification counts"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: content-addressed verification reuse, atomic finding transition, exact invalidation reasons, and terminal cleanup convergence."
  -
    author: "CODER"
    body: "Implementation updated: direct-mode verification identity now excludes the complete lifecycle task directory, preserving source, Verify Steps, toolchain context, and runtime invalidation. Full test suite 3971/3971 and all static/build gates passed."
  -
    author: "CODER"
    body: "Implementation finalized: direct lifecycle artifacts are excluded from verification identity and typed result details accept bounded parenthesized counts. Full suite 3972/3972 and all static/build gates passed."
events:
  -
    type: "status"
    at: "2026-08-10T22:44:12.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-10T23:33:30.079Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: content-addressed verification reuse, atomic finding transition, exact invalidation reasons, and terminal cleanup convergence."
    commit: "ee79d2660f8aa9bedf36f67d39f8c62686384734"
  -
    type: "verify"
    at: "2026-08-10T23:42:29.826Z"
    author: "TESTER"
    state: "ok"
    note: "Content-addressed verification reuse and atomic finding persistence passed."
  -
    type: "status"
    at: "2026-08-10T23:54:05.889Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation updated: direct-mode verification identity now excludes the complete lifecycle task directory, preserving source, Verify Steps, toolchain context, and runtime invalidation. Full test suite 3971/3971 and all static/build gates passed."
    commit: "b18a06196eac99099017805ab649aa1229d65335"
  -
    type: "verify"
    at: "2026-08-10T23:54:33.870Z"
    author: "TESTER"
    state: "ok"
    note: "Content-addressed verification and terminal convergence pass after direct-mode lifecycle exclusion."
  -
    type: "status"
    at: "2026-08-11T00:00:46.507Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation finalized: direct lifecycle artifacts are excluded from verification identity and typed result details accept bounded parenthesized counts. Full suite 3972/3972 and all static/build gates passed."
    commit: "e3a351ab0dbf4bb6d2296ec79cb1a70cb78ddb26"
doc_version: 3
doc_updated_at: "2026-08-11T00:00:46.507Z"
doc_updated_by: "CODER"
description: "Persist pass or rework, structured findings, tested input identity, and evidence references in one atomic verification transaction. Define freshness from content-addressed implementation and verification inputs rather than task README revision or lifecycle-only commits; reuse receipts after rebases or metadata-only changes when the relevant patch and declared inputs are identical; invalidate them when code, Verify Steps, configuration, dependencies, environment contract, or evidence changes. DONE tasks must remain terminal and must not route back to verification. Provide deterministic CLI reasons for reuse or invalidation and regression coverage for the ordering defect reproduced in AgentPlane 0.7.5."
sections:
  Summary: |-
    Make verification atomic and reusable across lifecycle-only drift

    Persist pass or rework, structured findings, tested input identity, and evidence references in one atomic verification transaction. Define freshness from content-addressed implementation and verification inputs rather than task README revision or lifecycle-only commits; reuse receipts after rebases or metadata-only changes when the relevant patch and declared inputs are identical; invalidate them when code, Verify Steps, configuration, dependencies, environment contract, or evidence changes. DONE tasks must remain terminal and must not route back to verification. Provide deterministic CLI reasons for reuse or invalidation and regression coverage for the ordering defect reproduced in AgentPlane 0.7.5.
  Scope: |-
    - In scope: Persist pass or rework, structured findings, tested input identity, and evidence references in one atomic verification transaction. Define freshness from content-addressed implementation and verification inputs rather than task README revision or lifecycle-only commits; reuse receipts after rebases or metadata-only changes when the relevant patch and declared inputs are identical; invalidate them when code, Verify Steps, configuration, dependencies, environment contract, or evidence changes. DONE tasks must remain terminal and must not route back to verification. Provide deterministic CLI reasons for reuse or invalidation and regression coverage for the ordering defect reproduced in AgentPlane 0.7.5.
    - Out of scope: unrelated refactors not required for "Make verification atomic and reusable across lifecycle-only drift".
  Plan: |-
    1. Model a VerificationInput identity that hashes only evidence-relevant inputs: implementation tree or stable patch identity, declared Verify Steps, applicable config and dependency lock state, toolchain or environment contract, and supplied evidence. Exclude task status comments, timestamps, verification prose, PR metadata, close-tail commits, and other lifecycle-only artifacts. Preserve explicit invalidation reasons for every included component.
    2. Replace the split verify ordering with one transaction: validate all arguments and findings first, build the complete verification record in memory, write its immutable receipt, and update task verification state, structured Findings, references, and revision atomically. A failed write must leave no partial pass or partial finding.
    3. Make receipt reuse deterministic. Accept a prior successful receipt after rebase, merge, or lifecycle-only commits when the VerificationInput digest is unchanged; return a reuse decision with the original evidence reference. Reject reuse when implementation content, Verify Steps, dependency or configuration inputs, environment contract, or evidence identity changes. Never infer semantic equivalence with keywords or an LLM.
    4. Make routing consume the new receipt identity. A current receipt satisfies verification even if task README revision or HEAD changes only through AgentPlane-owned lifecycle artifacts. A DONE task is terminal regardless of later metadata revisions and cannot route back to agent.verification. Emit compact machine-readable reason codes and a human explanation for current, reusable, invalidated, or legacy-unverifiable records.
    5. Migrate conservatively. Continue reading existing verification artifacts, classify them as current only when their legacy references can prove the same relevant inputs, otherwise request one new verification without corrupting task truth. Do not rewrite history or silently bless ambiguous receipts.
    6. Add focused state-machine, persistence, CLI, and route regression tests for: pass plus structured finding in one call; injected write failure with no partial state; lifecycle comment after pass; verification artifact commit after pass; identical-patch rebase reuse; real source, Verify Steps, config, lockfile, and environment drift invalidation; and DONE remaining terminal. Include the exact 0.7.5 ordering sequence from the user log.
    7. Run focused tests first, then typecheck, lint, format, hotspot and full fast verification. Record observed reuse versus rerun behavior and stop for re-approval only if the design must weaken a verification input or modify unrelated release or queue semantics.
  Verify Steps: |-
    1. Run the focused verification identity, record, route, transition, durability, and workflow-hook tests. Expected: pass plus structured Finding is one task revision; lifecycle-only commits and identical-patch rebases reuse a receipt; source, Verify Steps, dependency context, and runtime drift return specific invalidation reason codes.
    2. Run `bun run test:fast`. Expected: the complete agentplane, core, recipes, and testkit suite passes with no regression in legacy v1 verification records or qualification/evaluator evidence.
    3. Run `bun run typecheck`, `bun run lint`, `bun run format:changed`, `bun run knip:check`, and `bun run hotspots:check`. Expected: all repository contracts pass without widening baselines or size limits.
    4. Run `bun run build`. Expected: all distributable bundles build successfully.
    5. Execute the rebuilt CLI against completed task 202608102112-AY0H1F after its lifecycle-only closeout drift. Expected: route phase is `done`, no `verification_required` blocker appears, and an idempotent cleanup does not create a command loop.
    6. Inspect an injected task-write failure during verify. Expected: neither a passing verification record nor task verification/Finding state remains partially persisted.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-10T23:42:29.826Z — VERIFY — ok

    By: TESTER

    Note: Content-addressed verification reuse and atomic finding persistence passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:20b160e8f5672c5a1676c10b42016b09c08011caf12082bfc4377d2a317e3fb6, input_digest=sha256:df953ce5b1a29e2add1a9d878ccaf9e1c730a6fb0a070eca2ca45670b8a2b66a

    Details:

    Command: focused verification tests; bun run test:fast; bun run typecheck; bun run lint; bun run format:changed; bun run knip:check; bun run hotspots:check; bun run build; rebuilt CLI route proof
    Result: pass
    Evidence: 3970 full-suite tests and 22 final focused tests passed; all static contracts and builds passed; completed task 202608102112-AY0H1F routes to terminal done after lifecycle-only closeout and idempotent cleanup
    Scope: P04 verification identity, atomic persistence, legacy compatibility, qualification/evaluator compatibility, and terminal route convergence

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102243-1RG86M-make-verification-atomic-and-reusable-across-lif/.agentplane/tasks/202608102243-1RG86M/blueprint/resolved-snapshot.json
    - old_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
    - current_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608102243-1RG86M

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608102243-1RG86M
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T23:54:33.870Z — VERIFY — ok

    By: TESTER

    Note: Content-addressed verification and terminal convergence pass after direct-mode lifecycle exclusion.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:20b160e8f5672c5a1676c10b42016b09c08011caf12082bfc4377d2a317e3fb6, input_digest=sha256:1c5e4c157942bbbc12d71a38fa258a8c2c91738165b6ca24905aacf4ff2e5901

    Details:

    Command: bun run test:fast
    Result: pass (549 files, 3971 tests)
    Evidence: local full-suite output on commit b18a06196eac99099017805ab649aa1229d65335
    Scope: verification identity, durable records, route convergence, evaluator compatibility

    Command: bun run typecheck && bun run lint && bun run format:changed && bun run knip:check && bun run hotspots:check
    Result: pass
    Evidence: local static-gate output on commit b18a06196eac99099017805ab649aa1229d65335
    Scope: types, lint, formatting, unused-code baseline, module budgets

    Command: bun run build
    Result: pass
    Evidence: local bundle output on commit b18a06196eac99099017805ab649aa1229d65335
    Scope: distributable CLI bundles

    Command: built CLI task next-action 202608102112-AY0H1F --explain
    Result: pass (phase=done, code=done)
    Evidence: live completed-task route probe
    Scope: terminal convergence without duplicate verification or cleanup loop

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102243-1RG86M-make-verification-atomic-and-reusable-across-lif/.agentplane/tasks/202608102243-1RG86M/blueprint/resolved-snapshot.json
    - old_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
    - current_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608102243-1RG86M

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608102243-1RG86M
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The broad pre-push RF-04 critical chunk rejects a shared-worktree workspace symlink as an external dependency seed.
      Impact: A fully tested task can be blocked from publication or forced to repeat broad validation in a registered worktree.
      Resolution: Fix and measure the shared-worktree CI harness under task 202608102115-7XGP97 before the patch release; P04 hosted verification remains fail-closed.
      Promotion: incident-candidate
      Fixability: repo-fixable
      IncidentScope: ci-shared-worktree
      IncidentTags: ci, performance
      IncidentMatch: RF-04 dependency seed resolves outside node_modules
extensions:
  workflow_route_baseline:
    start_head_sha: "1423a4736890404d114c688da49746aa7ca5aaa4"
    version: 1
id_source: "generated"
---
## Summary

Make verification atomic and reusable across lifecycle-only drift

Persist pass or rework, structured findings, tested input identity, and evidence references in one atomic verification transaction. Define freshness from content-addressed implementation and verification inputs rather than task README revision or lifecycle-only commits; reuse receipts after rebases or metadata-only changes when the relevant patch and declared inputs are identical; invalidate them when code, Verify Steps, configuration, dependencies, environment contract, or evidence changes. DONE tasks must remain terminal and must not route back to verification. Provide deterministic CLI reasons for reuse or invalidation and regression coverage for the ordering defect reproduced in AgentPlane 0.7.5.

## Scope

- In scope: Persist pass or rework, structured findings, tested input identity, and evidence references in one atomic verification transaction. Define freshness from content-addressed implementation and verification inputs rather than task README revision or lifecycle-only commits; reuse receipts after rebases or metadata-only changes when the relevant patch and declared inputs are identical; invalidate them when code, Verify Steps, configuration, dependencies, environment contract, or evidence changes. DONE tasks must remain terminal and must not route back to verification. Provide deterministic CLI reasons for reuse or invalidation and regression coverage for the ordering defect reproduced in AgentPlane 0.7.5.
- Out of scope: unrelated refactors not required for "Make verification atomic and reusable across lifecycle-only drift".

## Plan

1. Model a VerificationInput identity that hashes only evidence-relevant inputs: implementation tree or stable patch identity, declared Verify Steps, applicable config and dependency lock state, toolchain or environment contract, and supplied evidence. Exclude task status comments, timestamps, verification prose, PR metadata, close-tail commits, and other lifecycle-only artifacts. Preserve explicit invalidation reasons for every included component.
2. Replace the split verify ordering with one transaction: validate all arguments and findings first, build the complete verification record in memory, write its immutable receipt, and update task verification state, structured Findings, references, and revision atomically. A failed write must leave no partial pass or partial finding.
3. Make receipt reuse deterministic. Accept a prior successful receipt after rebase, merge, or lifecycle-only commits when the VerificationInput digest is unchanged; return a reuse decision with the original evidence reference. Reject reuse when implementation content, Verify Steps, dependency or configuration inputs, environment contract, or evidence identity changes. Never infer semantic equivalence with keywords or an LLM.
4. Make routing consume the new receipt identity. A current receipt satisfies verification even if task README revision or HEAD changes only through AgentPlane-owned lifecycle artifacts. A DONE task is terminal regardless of later metadata revisions and cannot route back to agent.verification. Emit compact machine-readable reason codes and a human explanation for current, reusable, invalidated, or legacy-unverifiable records.
5. Migrate conservatively. Continue reading existing verification artifacts, classify them as current only when their legacy references can prove the same relevant inputs, otherwise request one new verification without corrupting task truth. Do not rewrite history or silently bless ambiguous receipts.
6. Add focused state-machine, persistence, CLI, and route regression tests for: pass plus structured finding in one call; injected write failure with no partial state; lifecycle comment after pass; verification artifact commit after pass; identical-patch rebase reuse; real source, Verify Steps, config, lockfile, and environment drift invalidation; and DONE remaining terminal. Include the exact 0.7.5 ordering sequence from the user log.
7. Run focused tests first, then typecheck, lint, format, hotspot and full fast verification. Record observed reuse versus rerun behavior and stop for re-approval only if the design must weaken a verification input or modify unrelated release or queue semantics.

## Verify Steps

1. Run the focused verification identity, record, route, transition, durability, and workflow-hook tests. Expected: pass plus structured Finding is one task revision; lifecycle-only commits and identical-patch rebases reuse a receipt; source, Verify Steps, dependency context, and runtime drift return specific invalidation reason codes.
2. Run `bun run test:fast`. Expected: the complete agentplane, core, recipes, and testkit suite passes with no regression in legacy v1 verification records or qualification/evaluator evidence.
3. Run `bun run typecheck`, `bun run lint`, `bun run format:changed`, `bun run knip:check`, and `bun run hotspots:check`. Expected: all repository contracts pass without widening baselines or size limits.
4. Run `bun run build`. Expected: all distributable bundles build successfully.
5. Execute the rebuilt CLI against completed task 202608102112-AY0H1F after its lifecycle-only closeout drift. Expected: route phase is `done`, no `verification_required` blocker appears, and an idempotent cleanup does not create a command loop.
6. Inspect an injected task-write failure during verify. Expected: neither a passing verification record nor task verification/Finding state remains partially persisted.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-10T23:42:29.826Z — VERIFY — ok

By: TESTER

Note: Content-addressed verification reuse and atomic finding persistence passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:20b160e8f5672c5a1676c10b42016b09c08011caf12082bfc4377d2a317e3fb6, input_digest=sha256:df953ce5b1a29e2add1a9d878ccaf9e1c730a6fb0a070eca2ca45670b8a2b66a

Details:

Command: focused verification tests; bun run test:fast; bun run typecheck; bun run lint; bun run format:changed; bun run knip:check; bun run hotspots:check; bun run build; rebuilt CLI route proof
Result: pass
Evidence: 3970 full-suite tests and 22 final focused tests passed; all static contracts and builds passed; completed task 202608102112-AY0H1F routes to terminal done after lifecycle-only closeout and idempotent cleanup
Scope: P04 verification identity, atomic persistence, legacy compatibility, qualification/evaluator compatibility, and terminal route convergence

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102243-1RG86M-make-verification-atomic-and-reusable-across-lif/.agentplane/tasks/202608102243-1RG86M/blueprint/resolved-snapshot.json
- old_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
- current_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608102243-1RG86M

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608102243-1RG86M
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T23:54:33.870Z — VERIFY — ok

By: TESTER

Note: Content-addressed verification and terminal convergence pass after direct-mode lifecycle exclusion.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:20b160e8f5672c5a1676c10b42016b09c08011caf12082bfc4377d2a317e3fb6, input_digest=sha256:1c5e4c157942bbbc12d71a38fa258a8c2c91738165b6ca24905aacf4ff2e5901

Details:

Command: bun run test:fast
Result: pass (549 files, 3971 tests)
Evidence: local full-suite output on commit b18a06196eac99099017805ab649aa1229d65335
Scope: verification identity, durable records, route convergence, evaluator compatibility

Command: bun run typecheck && bun run lint && bun run format:changed && bun run knip:check && bun run hotspots:check
Result: pass
Evidence: local static-gate output on commit b18a06196eac99099017805ab649aa1229d65335
Scope: types, lint, formatting, unused-code baseline, module budgets

Command: bun run build
Result: pass
Evidence: local bundle output on commit b18a06196eac99099017805ab649aa1229d65335
Scope: distributable CLI bundles

Command: built CLI task next-action 202608102112-AY0H1F --explain
Result: pass (phase=done, code=done)
Evidence: live completed-task route probe
Scope: terminal convergence without duplicate verification or cleanup loop

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608102243-1RG86M-make-verification-atomic-and-reusable-across-lif/.agentplane/tasks/202608102243-1RG86M/blueprint/resolved-snapshot.json
- old_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
- current_digest: 3ff4186f4859b5f928c8d89d3ef54ae8fea91f22634d5d6d5c850dfbf3159963
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608102243-1RG86M

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608102243-1RG86M
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The broad pre-push RF-04 critical chunk rejects a shared-worktree workspace symlink as an external dependency seed.
  Impact: A fully tested task can be blocked from publication or forced to repeat broad validation in a registered worktree.
  Resolution: Fix and measure the shared-worktree CI harness under task 202608102115-7XGP97 before the patch release; P04 hosted verification remains fail-closed.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: ci-shared-worktree
  IncidentTags: ci, performance
  IncidentMatch: RF-04 dependency seed resolves outside node_modules
