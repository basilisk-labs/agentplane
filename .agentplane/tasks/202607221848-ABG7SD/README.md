---
id: "202607221848-ABG7SD"
title: "Align CLI error, exit-code, and Node support contracts"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202607221907-DK2CJF"
tags:
  - "cli"
  - "contract-drift"
  - "docs"
  - "milestone-alpha2"
  - "node"
  - "refactor"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run docs:cli:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T09:03:13.942Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-24T10:06:16.421Z"
  updated_by: "TESTER"
  note: "Implementation rework verified at 8bf0104e: runtime-derived CLI/error docs, exact installed-tarball envelopes, mandatory core/recipes Node matrix, focused 9/9, docs check, typecheck, critical, ci:contract and RF04 offline replay 50/70/27/170 pass; independent semantic review PASS. Hosted Node 20 cells remain a PR integration gate."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-24T10:18:02.890Z"
  updated_by: "EVALUATOR"
  note: "Hosted verify-unit regression is corrected at DCO head 3ff89179 without weakening the release-ready contract."
  evaluated_sha: "3ff891791141db79b8679742d903d72e066198b3"
  blueprint_digest: "dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5"
  evidence_refs:
    - ".agentplane/tasks/202607221848-ABG7SD/README.md"
    - ".agentplane/tasks/202607221848-ABG7SD/quality/20260724-101802890-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221848-ABG7SD/quality/20260724-101802890-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221848-ABG7SD/quality/20260724-101802890-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221848-ABG7SD/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
    - "https://github.com/basilisk-labs/agentplane/actions/runs/30085162677/job/89455569371"
    - "bun run test:fast: 427/427 files, 2679/2679 tests"
  findings:
    - "Independent review confirmed the one-line expectation now explicitly requires verify-package-node-runtime success; it does not broaden alternatives or remove assertions. Exact local test:fast passes 427 files and 2679 tests."
commit:
  hash: "8bf0104e2379a265002107bd24096f686e87d280"
  message: "🧩 ABG7SD cli: align runtime contracts"
comments:
  -
    author: "CODER"
    body: "Start: align generated CLI error, exit-code, installed-tarball, and Node support contracts."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-24T09:04:19.991Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align generated CLI error, exit-code, installed-tarball, and Node support contracts."
  -
    type: "verify"
    at: "2026-07-24T09:13:52.072Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Implementation is not present yet; the branch contains only generated task, PR, and blueprint artifacts."
  -
    type: "verify"
    at: "2026-07-24T10:06:16.421Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation rework verified at 8bf0104e: runtime-derived CLI/error docs, exact installed-tarball envelopes, mandatory core/recipes Node matrix, focused 9/9, docs check, typecheck, critical, ci:contract and RF04 offline replay 50/70/27/170 pass; independent semantic review PASS. Hosted Node 20 cells remain a PR integration gate."
  -
    type: "status"
    at: "2026-07-24T10:07:51.065Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-24T10:07:51.066Z"
doc_updated_by: "CODER"
description: "Correct the verified drift between documented and runtime exit/error shapes, structured remediation fields, package engine ranges, and the CI support matrix before 0.7 compatibility is frozen."
sections:
  Summary: |-
    Align CLI error, exit-code, and Node support contracts

    Correct the verified drift between documented and runtime exit/error shapes, structured remediation fields, package engine ranges, and the CI support matrix before 0.7 compatibility is frozen.
  Scope: |-
    - In scope: one generated source for CLI exit codes and error payload documentation, guidance/remediation compatibility, installed-tarball fixtures, aligned Node engine declarations or an explicit tested matrix, and CI coverage for every supported runtime.
    - Out of scope: changing unrelated command semantics or removing an existing error field without migration evidence.
  Plan: |-
    1. Inventory runtime exit/error codes, formatter fields, package engines, and current CI Node jobs from the baseline.
    2. Define generated contract metadata consumed by runtime tests and public docs.
    3. Align package engine policy and add the corresponding CI matrix or document an intentional unified bump.
    4. Extend installed-tarball smoke to assert representative error and exit behavior.
    5. Regenerate docs and prove compatibility.
  Verify Steps: |-
    1. Generate the CLI contract reference from runtime metadata. Expected: codes 0 through 9 and every public error/remediation field match emitted JSON.
    2. Exercise representative usage, policy, stale-state, and internal failures from the installed tarball. Expected: documented exit codes and shapes are exact.
    3. Run the declared Node support matrix. Expected: every advertised engine range is tested, or all packages consistently declare the narrower supported range.
    4. Run `bun run docs:cli:check`, `bun run test:critical`, `bun run typecheck`, and `bun run ci:contract`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-24T09:13:52.072Z — VERIFY — needs_rework

    By: TESTER

    Note: Implementation is not present yet; the branch contains only generated task, PR, and blueprint artifacts.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:04:19.991Z, excerpt_hash=sha256:d7b0d6bc97e263826e6a452e3c2bea485bca5677a941b298dcf1a6f7a42c0c4d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-ABG7SD-align-cli-error-exit-code-and-node-support-contr/.agentplane/tasks/202607221848-ABG7SD/blueprint/resolved-snapshot.json
    - old_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
    - current_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-ABG7SD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221848-ABG7SD
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-24T10:06:16.421Z — VERIFY — ok

    By: TESTER

    Note: Implementation rework verified at 8bf0104e: runtime-derived CLI/error docs, exact installed-tarball envelopes, mandatory core/recipes Node matrix, focused 9/9, docs check, typecheck, critical, ci:contract and RF04 offline replay 50/70/27/170 pass; independent semantic review PASS. Hosted Node 20 cells remain a PR integration gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:13:52.511Z, excerpt_hash=sha256:d7b0d6bc97e263826e6a452e3c2bea485bca5677a941b298dcf1a6f7a42c0c4d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-ABG7SD-align-cli-error-exit-code-and-node-support-contr/.agentplane/tasks/202607221848-ABG7SD/blueprint/resolved-snapshot.json
    - old_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
    - current_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-ABG7SD

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
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: HEAD changes only lifecycle metadata and the resolved blueprint snapshot; no CLI error/exit-code contract, generated reference, Node support alignment, or tests exist.
      Impact: The approved Verify Steps cannot be executed and the task cannot pass verification.
      Resolution: Return control to CODER to implement the runtime-derived CLI contract, installed-tarball coverage, Node support alignment, and declared checks before re-verification.
id_source: "generated"
---
## Summary

Align CLI error, exit-code, and Node support contracts

Correct the verified drift between documented and runtime exit/error shapes, structured remediation fields, package engine ranges, and the CI support matrix before 0.7 compatibility is frozen.

## Scope

- In scope: one generated source for CLI exit codes and error payload documentation, guidance/remediation compatibility, installed-tarball fixtures, aligned Node engine declarations or an explicit tested matrix, and CI coverage for every supported runtime.
- Out of scope: changing unrelated command semantics or removing an existing error field without migration evidence.

## Plan

1. Inventory runtime exit/error codes, formatter fields, package engines, and current CI Node jobs from the baseline.
2. Define generated contract metadata consumed by runtime tests and public docs.
3. Align package engine policy and add the corresponding CI matrix or document an intentional unified bump.
4. Extend installed-tarball smoke to assert representative error and exit behavior.
5. Regenerate docs and prove compatibility.

## Verify Steps

1. Generate the CLI contract reference from runtime metadata. Expected: codes 0 through 9 and every public error/remediation field match emitted JSON.
2. Exercise representative usage, policy, stale-state, and internal failures from the installed tarball. Expected: documented exit codes and shapes are exact.
3. Run the declared Node support matrix. Expected: every advertised engine range is tested, or all packages consistently declare the narrower supported range.
4. Run `bun run docs:cli:check`, `bun run test:critical`, `bun run typecheck`, and `bun run ci:contract`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-24T09:13:52.072Z — VERIFY — needs_rework

By: TESTER

Note: Implementation is not present yet; the branch contains only generated task, PR, and blueprint artifacts.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:04:19.991Z, excerpt_hash=sha256:d7b0d6bc97e263826e6a452e3c2bea485bca5677a941b298dcf1a6f7a42c0c4d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-ABG7SD-align-cli-error-exit-code-and-node-support-contr/.agentplane/tasks/202607221848-ABG7SD/blueprint/resolved-snapshot.json
- old_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
- current_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-ABG7SD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221848-ABG7SD
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-24T10:06:16.421Z — VERIFY — ok

By: TESTER

Note: Implementation rework verified at 8bf0104e: runtime-derived CLI/error docs, exact installed-tarball envelopes, mandatory core/recipes Node matrix, focused 9/9, docs check, typecheck, critical, ci:contract and RF04 offline replay 50/70/27/170 pass; independent semantic review PASS. Hosted Node 20 cells remain a PR integration gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:13:52.511Z, excerpt_hash=sha256:d7b0d6bc97e263826e6a452e3c2bea485bca5677a941b298dcf1a6f7a42c0c4d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-ABG7SD-align-cli-error-exit-code-and-node-support-contr/.agentplane/tasks/202607221848-ABG7SD/blueprint/resolved-snapshot.json
- old_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
- current_digest: dfad433ba50ff6e3a4d8424a251f191246002efb1b357c5a99e3caf407fe5bf5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-ABG7SD

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

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: HEAD changes only lifecycle metadata and the resolved blueprint snapshot; no CLI error/exit-code contract, generated reference, Node support alignment, or tests exist.
  Impact: The approved Verify Steps cannot be executed and the task cannot pass verification.
  Resolution: Return control to CODER to implement the runtime-derived CLI contract, installed-tarball coverage, Node support alignment, and declared checks before re-verification.
