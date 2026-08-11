---
id: "202608111036-QHR892"
title: "Make verification evidence atomic, immediately fresh, and reusable"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
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
  updated_at: "2026-08-11T15:30:15.581Z"
  updated_by: "REVIEWER"
  note: "Exact quality-review route assertion passed; prior full-suite, docs, hotspot, and standalone receipts were reused because 6a2cf7854 changes only the exercised CLI test fixture."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-11T15:20:58.744Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "313dfa2210aafad5b6188aeae13318a97f56cdf5"
  blueprint_digest: "7cb1e1a2f18e2cf810c78283b347ca31be7b89ac765b4a8a7ab73100ccdee30b"
  evidence_refs:
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-151947717-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-151947717-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/320332bf614ca3458684e4755e6f8708527806848a48a9ad207124166d275e16.md"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-151947717-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-151947717-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-151947717-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/20260811-151947717-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608111036-QHR892/README.md"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/bbe6214187cd93bb1d754af8d416ffdbe15938444f2f45af6c595c50cfc0ab51.patch"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/efe9c4881cafe0c14569c81df0d2492ba9163218bc973c40606ba1fcfed8a67a.json"
    - ".agentplane/tasks/202608111036-QHR892/verification/20260811151629029-e146b2f46c0413b6.json"
    - ".agentplane/tasks/202608111036-QHR892/quality/objects/sha256/8babde3dcd7045f8ca2ec9145f1683be19cb2c338cc01c76dd940c6b1e51de51.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "CLI-регрессия не доказывает немедленный переход именно к quality review: она проверяет лишь отсутствие verification_required и допускает любой другой nextAction."
    - "Замороженная запись проверки не содержит результата обязательной инспекции итогового маршрута после единой команды verify."
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
  updated_at: "2026-08-11T14:29:03.411Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "df96cd27c2d1cfada7a853c096d7e5c6742f2c3b"
  message: "🧾 QHR892 task: record hosted contract rework"
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
  -
    author: "CODER"
    body: "Hosted verify-contract required a hotspot-safe extraction and moving pre-mutation coverage into the CLI regression; implementation updated without changing behavior."
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
  -
    type: "status"
    at: "2026-08-11T14:21:24.598Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Hosted verify-contract required a hotspot-safe extraction and moving pre-mutation coverage into the CLI regression; implementation updated without changing behavior."
    commit: "586b7f3400e3700c69b28688fec53f7cb0456213"
  -
    type: "verify"
    at: "2026-08-11T14:25:32.613Z"
    author: "TESTER"
    state: "ok"
    note: "Hosted contract rework passed with affected checks rerun and the unchanged full-suite receipt reused."
  -
    type: "status"
    at: "2026-08-11T14:29:03.411Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "df96cd27c2d1cfada7a853c096d7e5c6742f2c3b"
  -
    type: "verify"
    at: "2026-08-11T14:51:04.568Z"
    author: "REVIEWER"
    state: "ok"
    note: "Parser boundary review at 313dfa221; the hosted review finding is covered without widening lifecycle scope."
  -
    type: "verify"
    at: "2026-08-11T15:16:29.029Z"
    author: "REVIEWER"
    state: "ok"
    note: "All required verification steps passed at implementation SHA 313dfa221 after evaluator rework."
  -
    type: "verify"
    at: "2026-08-11T15:30:15.581Z"
    author: "REVIEWER"
    state: "ok"
    note: "Exact quality-review route assertion passed; prior full-suite, docs, hotspot, and standalone receipts were reused because 6a2cf7854 changes only the exercised CLI test fixture."
doc_version: 3
doc_updated_at: "2026-08-11T15:30:21.744Z"
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

    ### 2026-08-11T14:25:32.613Z — VERIFY — ok

    By: TESTER

    Note: Hosted contract rework passed with affected checks rerun and the unchanged full-suite receipt reused.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:def263511d2a3146dfe6ac54416e47324d090934c00aa5faf2365516399031ca

    Details:

    Command: bun run hotspots:check. Result: pass. Evidence: runtime threshold passed at 599 lines and oversized test baseline returned to 10 entries. Scope: hosted verify-contract failure. Command: bunx vitest --config vitest.workspace.ts run --project cli-core route-decision verification file. Result: pass. Evidence: 1 file and 3 tests passed. Scope: pre-mutation rejection, immediate freshness, lifecycle reuse, and remote truth routing. Command: bunx vitest --config vitest.workspace.ts run --project agentplane verification-focused files. Result: pass. Evidence: 3 files and 33 tests passed. Scope: parser, verification record assessment, and remaining unit contract. Command: bun run typecheck. Result: pass. Evidence: TypeScript build exited 0. Scope: helper extraction and test relocation. Command: review verification receipt sha256:966fb50220b3f330 against diff 30befb09d..586b7f340. Result: pass. Evidence: the prior 549-file 3988-test receipt remains applicable outside the rerun affected route and hotspot surfaces; the rework only extracted one route helper and moved equivalent rejection coverage. Scope: unchanged repository-wide behaviors without repeating unrelated tests.

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

    ### 2026-08-11T14:51:04.568Z — VERIFY — ok

    By: REVIEWER

    Note: Parser boundary review at 313dfa221; the hosted review finding is covered without widening lifecycle scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:7186cf9d90a4e844f9eb8640265686661643424ca3f1a78e62088abb1eeddc5f

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Result: pass (5 files, 43 tests). Evidence: process exited 0 at 313dfa221. Scope: verification parsing and freshness regressions. Command: bun run typecheck. Result: pass. Evidence: process exited 0 at 313dfa221. Scope: TypeScript contracts. Command: bun run hotspots:check. Result: pass. Evidence: thresholds and oversized-test baseline passed at 313dfa221. Scope: repository size contracts.

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
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-11T15:16:29.029Z — VERIFY — ok

    By: REVIEWER

    Note: All required verification steps passed at implementation SHA 313dfa221 after evaluator rework.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:59e60829eb0a5b408fea4acaa787ea84f34d9a67220ba18a5630a456cb5b58e5

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Result: pass (5 files, 43 tests). Evidence: process exited 0 at implementation SHA 313dfa221. Scope: verification parsing and freshness regressions. Command: bun run typecheck. Result: pass. Evidence: process exited 0 at implementation SHA 313dfa221. Scope: TypeScript contracts. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference was current at implementation SHA 313dfa221. Scope: public CLI documentation. Command: bun run hotspots:check. Result: pass. Evidence: runtime thresholds and oversized-test baseline passed at implementation SHA 313dfa221. Scope: repository size contracts. Command: bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Result: pass (549 files, 3988 tests). Evidence: process exited 0 in 384.66 seconds at implementation SHA 313dfa221. Scope: complete fast repository suite under bounded concurrency. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs-production-dependencies-from-a-sanitized-package-payload. Result: pass (1 file, 1 test). Evidence: process exited 0 in 97.13 seconds at implementation SHA 313dfa221. Scope: resource-intensive standalone dependency fixture.

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
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-11T15:30:15.581Z — VERIFY — ok

    By: REVIEWER

    Note: Exact quality-review route assertion passed; prior full-suite, docs, hotspot, and standalone receipts were reused because 6a2cf7854 changes only the exercised CLI test fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:4285939a0428982f0397d345574e64f2ddef715e8780758195a43f0ecaea7b96

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Result: pass (1 file, 3 tests). Evidence: process exited 0 at 6a2cf7854 and asserted nextAction.code equals quality_review_required. Scope: exact post-verification CLI route. Command: bun run typecheck. Result: pass. Evidence: process exited 0 at 6a2cf7854. Scope: TypeScript contracts. Command: bun run docs:cli:check. Result: pass. Evidence: receipt from runtime-equivalent 313dfa221; 6a2cf7854 changes only a test fixture and cannot alter generated CLI documentation. Scope: public CLI documentation. Command: bun run hotspots:check. Result: pass. Evidence: receipt from runtime-equivalent 313dfa221; 6a2cf7854 changes the existing test below its enforced threshold. Scope: repository size contracts. Command: bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Result: pass (549 files, 3988 tests). Evidence: content-equivalent runtime passed in 384.66 seconds at 313dfa221 and the only later test fixture change passed independently at 6a2cf7854. Scope: complete fast repository suite under bounded concurrency. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs-production-dependencies-from-a-sanitized-package-payload. Result: pass (1 file, 1 test). Evidence: runtime-equivalent receipt passed in 97.13 seconds at 313dfa221; later changes are isolated to the route-decision test fixture. Scope: resource-intensive standalone dependency fixture.

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
    - diagnostic_command: none
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
    hash: "586b7f3400e3700c69b28688fec53f7cb0456213"
    message: "🔧 QHR892 code: satisfy hotspot contract"
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

### 2026-08-11T14:25:32.613Z — VERIFY — ok

By: TESTER

Note: Hosted contract rework passed with affected checks rerun and the unchanged full-suite receipt reused.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:def263511d2a3146dfe6ac54416e47324d090934c00aa5faf2365516399031ca

Details:

Command: bun run hotspots:check. Result: pass. Evidence: runtime threshold passed at 599 lines and oversized test baseline returned to 10 entries. Scope: hosted verify-contract failure. Command: bunx vitest --config vitest.workspace.ts run --project cli-core route-decision verification file. Result: pass. Evidence: 1 file and 3 tests passed. Scope: pre-mutation rejection, immediate freshness, lifecycle reuse, and remote truth routing. Command: bunx vitest --config vitest.workspace.ts run --project agentplane verification-focused files. Result: pass. Evidence: 3 files and 33 tests passed. Scope: parser, verification record assessment, and remaining unit contract. Command: bun run typecheck. Result: pass. Evidence: TypeScript build exited 0. Scope: helper extraction and test relocation. Command: review verification receipt sha256:966fb50220b3f330 against diff 30befb09d..586b7f340. Result: pass. Evidence: the prior 549-file 3988-test receipt remains applicable outside the rerun affected route and hotspot surfaces; the rework only extracted one route helper and moved equivalent rejection coverage. Scope: unchanged repository-wide behaviors without repeating unrelated tests.

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

### 2026-08-11T14:51:04.568Z — VERIFY — ok

By: REVIEWER

Note: Parser boundary review at 313dfa221; the hosted review finding is covered without widening lifecycle scope.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:7186cf9d90a4e844f9eb8640265686661643424ca3f1a78e62088abb1eeddc5f

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Result: pass (5 files, 43 tests). Evidence: process exited 0 at 313dfa221. Scope: verification parsing and freshness regressions. Command: bun run typecheck. Result: pass. Evidence: process exited 0 at 313dfa221. Scope: TypeScript contracts. Command: bun run hotspots:check. Result: pass. Evidence: thresholds and oversized-test baseline passed at 313dfa221. Scope: repository size contracts.

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
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-11T15:16:29.029Z — VERIFY — ok

By: REVIEWER

Note: All required verification steps passed at implementation SHA 313dfa221 after evaluator rework.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:59e60829eb0a5b408fea4acaa787ea84f34d9a67220ba18a5630a456cb5b58e5

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Result: pass (5 files, 43 tests). Evidence: process exited 0 at implementation SHA 313dfa221. Scope: verification parsing and freshness regressions. Command: bun run typecheck. Result: pass. Evidence: process exited 0 at implementation SHA 313dfa221. Scope: TypeScript contracts. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference was current at implementation SHA 313dfa221. Scope: public CLI documentation. Command: bun run hotspots:check. Result: pass. Evidence: runtime thresholds and oversized-test baseline passed at implementation SHA 313dfa221. Scope: repository size contracts. Command: bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Result: pass (549 files, 3988 tests). Evidence: process exited 0 in 384.66 seconds at implementation SHA 313dfa221. Scope: complete fast repository suite under bounded concurrency. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs-production-dependencies-from-a-sanitized-package-payload. Result: pass (1 file, 1 test). Evidence: process exited 0 in 97.13 seconds at implementation SHA 313dfa221. Scope: resource-intensive standalone dependency fixture.

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
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-11T15:30:15.581Z — VERIFY — ok

By: REVIEWER

Note: Exact quality-review route assertion passed; prior full-suite, docs, hotspot, and standalone receipts were reused because 6a2cf7854 changes only the exercised CLI test fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0c05715b3aad59ebed7b4ef2809fd82ede57bae89ac8f5f873e1a20062055530, input_digest=sha256:4285939a0428982f0397d345574e64f2ddef715e8780758195a43f0ecaea7b96

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Result: pass (1 file, 3 tests). Evidence: process exited 0 at 6a2cf7854 and asserted nextAction.code equals quality_review_required. Scope: exact post-verification CLI route. Command: bun run typecheck. Result: pass. Evidence: process exited 0 at 6a2cf7854. Scope: TypeScript contracts. Command: bun run docs:cli:check. Result: pass. Evidence: receipt from runtime-equivalent 313dfa221; 6a2cf7854 changes only a test fixture and cannot alter generated CLI documentation. Scope: public CLI documentation. Command: bun run hotspots:check. Result: pass. Evidence: receipt from runtime-equivalent 313dfa221; 6a2cf7854 changes the existing test below its enforced threshold. Scope: repository size contracts. Command: bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Result: pass (549 files, 3988 tests). Evidence: content-equivalent runtime passed in 384.66 seconds at 313dfa221 and the only later test fixture change passed independently at 6a2cf7854. Scope: complete fast repository suite under bounded concurrency. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs-production-dependencies-from-a-sanitized-package-payload. Result: pass (1 file, 1 test). Evidence: runtime-equivalent receipt passed in 97.13 seconds at 313dfa221; later changes are isolated to the route-decision test fixture. Scope: resource-intensive standalone dependency fixture.

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
- diagnostic_command: none
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
- Updated at: `2026-08-11T14:29:03.411Z`
