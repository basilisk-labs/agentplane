---
id: "202608111036-QHR892"
title: "Make verification evidence atomic, immediately fresh, and reusable"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ux"
  - "verification"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:fast"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T11:22:48.013Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-11T12:23:26.188Z"
  updated_by: "TESTER"
  note: "Atomic verification passed; structured evidence is immediately reusable across lifecycle-only commits."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-11T12:26:04.111Z"
  updated_by: "HUMAN"
  note: "The implementation satisfies the approved verification UX contract: incomplete passing evidence is rejected before mutation, valid inline or multiline evidence becomes current immediately, lifecycle-only commits reuse it, and missing remote truth no longer appears terminal."
  evaluated_sha: "416515219298c6ad2677fd12d6c364f0eae1df00"
  blueprint_digest: "7cb1e1a2f18e2cf810c78283b347ca31be7b89ac765b4a8a7ab73100ccdee30b"
  evidence_refs:
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-122603313-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-122603313-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/777e7be6f6dcb8522469b128846b339841109130b0533d8a9d6bc282d4ea7d86.md"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-122603313-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-122603313-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608111036-QHR892/README.md"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/1221492047e36b8dcff0469ed9725484e22af92ce5642b500ea0e67f7df7bc72.patch"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/006c636c2234bfb302d4bcf1e6e6d5735762ebdaa2cee3e1859b68ec266add99.json"
    - ".agentplane/tasks/202608111036-QHR892/verification/20260811122326188-966fb50220b3f330.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/8babde3dcd7045f8ca2ec9145f1683be19cb2c338cc01c76dd940c6b1e51de51.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
  findings:
    - "Structured evidence parsing is deterministic and rejects missing fields, ambiguous Result values, and fail results paired with --ok before task state changes."
    - "CLI-level route coverage proves that a verify command carrying a structured Finding advances directly to quality review and remains current after a lifecycle-only commit."
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
  updated_at: "2026-08-11T12:30:58.508Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "cd23b83e0c767c48973a62f596a0bf46e4d03d74"
  message: "🧾 QHR892 task: link hosted PR"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: atomic structured verification validation, precise freshness reasons, reusable lifecycle evidence, route regression coverage, and CLI guidance."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-11T11:23:13.656Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-11T12:12:35.110Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: atomic structured verification validation, precise freshness reasons, reusable lifecycle evidence, route regression coverage, and CLI guidance."
    commit: "416515219298c6ad2677fd12d6c364f0eae1df00"
  -
    type: "verify"
    at: "2026-08-11T12:23:26.188Z"
    author: "TESTER"
    state: "ok"
    note: "Atomic verification passed; structured evidence is immediately reusable across lifecycle-only commits."
  -
    type: "status"
    at: "2026-08-11T12:30:58.508Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "cd23b83e0c767c48973a62f596a0bf46e4d03d74"
doc_version: 3
doc_updated_at: "2026-08-11T12:30:58.518Z"
doc_updated_by: "CODER"
description: "Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command."
sections:
  Summary: |-
    Make verification evidence atomic, immediately fresh, and reusable

    Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.
  Scope: |-
    - In scope: Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.
    - Out of scope: unrelated refactors not required for "Make verification evidence atomic, immediately fresh, and reusable".
  Plan: |-
    1. Reproduce both invalid-pass and self-stale paths in focused route/verification tests.
    2. Validate concrete Command/Result/Evidence/Scope details before any verification mutation when the route requires them.
    3. Separate metadata mismatch from missing/changed evidence so next-action explains the real cause.
    4. Keep verification input based on implementation, Verify Steps, tool context, environment, and evidence; prove lifecycle-only task/PR artifacts reuse the accepted record without rerunning checks.
    5. Add a CLI-level regression proving one valid verify command immediately advances to quality review.
    6. Run focused tests, typecheck, and test:fast.
  Verify Steps: |-
    1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts. Expected: parser, freshness classification, and pre-mutation rejection tests pass.
    2. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Expected: a one-shot passing verification with structured Finding is immediately fresh and remains reusable after a lifecycle-only commit.
    3. Run bun run typecheck and bun run docs:cli:check. Expected: type safety passes and public CLI guidance matches the generated reference.
    4. Run bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Expected: the complete fast repository suite passes under bounded local concurrency.
    5. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs production dependencies from a sanitized package payload. Expected: the resource-intensive standalone dependency fixture passes without contention from the rest of the suite.
    6. Inspect the final task route after recording all checks in one verify command. Expected: verification_required is absent and the next gate is emitted without rerunning tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-11T12:23:26.188Z — VERIFY — ok

    By: TESTER

    Note: Atomic verification passed; structured evidence is immediately reusable across lifecycle-only commits.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:9a2e2ab3207227f3658b4f46e5b79c318c1981697b44e75f0025ac81caef7a9c

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane verification-focused files. Result: pass. Evidence: 3 files and 34 tests passed. Scope: parser, pre-mutation validation, and freshness classification. Command: bunx vitest --config vitest.workspace.ts run --project cli-core route-decision verification file. Result: pass. Evidence: 1 file and 3 tests passed. Scope: one-shot Finding, immediate route freshness, lifecycle-only reuse, and remote-truth guard. Command: bun run typecheck and bun run docs:cli:check. Result: pass. Evidence: TypeScript build exited 0 and generated CLI reference was current. Scope: type safety and agent-facing verification guidance. Command: bun run test:fast with maxWorkers 4. Result: pass. Evidence: 549 files and 3988 tests passed. Scope: complete fast repository suite under bounded local concurrency. Command: standalone dependency installation fixture. Result: pass. Evidence: isolated fixture passed in 6.5 seconds. Scope: resource-intensive release packaging path.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608111036-QHR892-make-verification-evidence-atomic-immediately-fr/.agentplane/tasks/202608111036-QHR892/blueprint/resolved-snapshot.json
    - old_digest: 7cb1e1a2f18e2cf810c78283b347ca31be7b89ac765b4a8a7ab73100ccdee30b
    - current_digest: 7cb1e1a2f18e2cf810c78283b347ca31be7b89ac765b4a8a7ab73100ccdee30b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608111036-QHR892

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608111036-QHR892
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
    - Observation: Unbounded full-suite concurrency caused unrelated 30-second and 180-second fixture timeouts, while both fixtures passed independently and the full suite passed with bounded workers.
      Impact: Developers can lose several minutes rerunning valid checks when resource-heavy fixtures compete inside one local run.
      Resolution: Use bounded concurrency for this verification and complete CI optimization task 202608102115-7XGP97 before the patch release.
extensions:
  implementation_commit:
    hash: "416515219298c6ad2677fd12d6c364f0eae1df00"
    message: "🚧 QHR892 task: make verification evidence reusable"
  workflow_route_baseline:
    start_head_sha: "c6f34bc7c9b39e376eb69092cd750356721f0f3d"
    version: 1
id_source: "generated"
---
## Summary

Make verification evidence atomic, immediately fresh, and reusable

Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.

## Scope

- In scope: Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.
- Out of scope: unrelated refactors not required for "Make verification evidence atomic, immediately fresh, and reusable".

## Plan

1. Reproduce both invalid-pass and self-stale paths in focused route/verification tests.
2. Validate concrete Command/Result/Evidence/Scope details before any verification mutation when the route requires them.
3. Separate metadata mismatch from missing/changed evidence so next-action explains the real cause.
4. Keep verification input based on implementation, Verify Steps, tool context, environment, and evidence; prove lifecycle-only task/PR artifacts reuse the accepted record without rerunning checks.
5. Add a CLI-level regression proving one valid verify command immediately advances to quality review.
6. Run focused tests, typecheck, and test:fast.

## Verify Steps

1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts. Expected: parser, freshness classification, and pre-mutation rejection tests pass.
2. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Expected: a one-shot passing verification with structured Finding is immediately fresh and remains reusable after a lifecycle-only commit.
3. Run bun run typecheck and bun run docs:cli:check. Expected: type safety passes and public CLI guidance matches the generated reference.
4. Run bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Expected: the complete fast repository suite passes under bounded local concurrency.
5. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs production dependencies from a sanitized package payload. Expected: the resource-intensive standalone dependency fixture passes without contention from the rest of the suite.
6. Inspect the final task route after recording all checks in one verify command. Expected: verification_required is absent and the next gate is emitted without rerunning tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-11T12:23:26.188Z — VERIFY — ok

By: TESTER

Note: Atomic verification passed; structured evidence is immediately reusable across lifecycle-only commits.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:9a2e2ab3207227f3658b4f46e5b79c318c1981697b44e75f0025ac81caef7a9c

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane verification-focused files. Result: pass. Evidence: 3 files and 34 tests passed. Scope: parser, pre-mutation validation, and freshness classification. Command: bunx vitest --config vitest.workspace.ts run --project cli-core route-decision verification file. Result: pass. Evidence: 1 file and 3 tests passed. Scope: one-shot Finding, immediate route freshness, lifecycle-only reuse, and remote-truth guard. Command: bun run typecheck and bun run docs:cli:check. Result: pass. Evidence: TypeScript build exited 0 and generated CLI reference was current. Scope: type safety and agent-facing verification guidance. Command: bun run test:fast with maxWorkers 4. Result: pass. Evidence: 549 files and 3988 tests passed. Scope: complete fast repository suite under bounded local concurrency. Command: standalone dependency installation fixture. Result: pass. Evidence: isolated fixture passed in 6.5 seconds. Scope: resource-intensive release packaging path.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608111036-QHR892-make-verification-evidence-atomic-immediately-fr/.agentplane/tasks/202608111036-QHR892/blueprint/resolved-snapshot.json
- old_digest: 7cb1e1a2f18e2cf810c78283b347ca31be7b89ac765b4a8a7ab73100ccdee30b
- current_digest: 7cb1e1a2f18e2cf810c78283b347ca31be7b89ac765b4a8a7ab73100ccdee30b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608111036-QHR892

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608111036-QHR892
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

- Observation: Unbounded full-suite concurrency caused unrelated 30-second and 180-second fixture timeouts, while both fixtures passed independently and the full suite passed with bounded workers.
  Impact: Developers can lose several minutes rerunning valid checks when resource-heavy fixtures compete inside one local run.
  Resolution: Use bounded concurrency for this verification and complete CI optimization task 202608102115-7XGP97 before the patch release.

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
- Updated at: `2026-08-11T12:30:58.508Z`
