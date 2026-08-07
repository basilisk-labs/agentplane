---
id: "202608062021-MCY8ZC"
title: "Polish the external supervisor protocol and canonical task help"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 38
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "supervisor"
  - "ux"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts"
  - "bun run docs:cli:check"
  - "bun run typecheck"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:25:49.745Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-07T23:57:08.836Z"
  updated_by: "TESTER"
  note: "Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-07T23:58:44.485Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "75263193a470d21f58f842d55d2c8fab711d1bd4"
  blueprint_digest: "98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5"
  evidence_refs:
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-235756138-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-235756138-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/6c20d610bfeadfe768bf90feb6af2cad8bb673d39129a3f09c88a7525e37f312.md"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-235756138-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-235756138-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-235756138-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/README.md"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/585d79e02b16931d74c4da7f8059956a361a573fd691f6dbe24b774ba8686f9d.patch"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/e2a0f9edb32d9c00f6ebe86693fbb52486a526326d50d7bf4351d08811121c61.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/verification/20260807235708836-c0e03e83d8770f18.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/b9ec9d466ef8872c88b80f76b9ceb07256be22c1879b47a8a56de950a4cc9057.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The implementation and frozen verification evidence cover the declared external exchange fields, typed approval boundaries, canonical task guidance, human plan attribution, dependency-sensitive routing, and branch_pr worktree handoff."
token_usage:
  agent_runs: 7
  input_tokens: 1941964
  journal_digest: "sha256:243ba6b364c96e9e10edc7dc6ae1937f8f0b64302428bb28213e34f750a95cbc"
  observed_agent_runs: 7
  observed_by: "agentplane"
  output_tokens: 19257
  reasoning_tokens: 4905
  schema_version: 1
  source: "supervisor_journal"
  state: "observed"
  total_tokens: 1966126
  unavailable_reason: null
  updated_at: "2026-08-07T23:31:33.795Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "75263193a470d21f58f842d55d2c8fab711d1bd4"
  message: "🧪 MCY8ZC supervisor: align branch work-order contract"
comments:
  -
    author: "CODER"
    body: "Start: implement protocol polish in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: exact external resume protocol, typed operator boundaries, dependency-safe routing, canonical task help, human plan provenance, and one-call branch worktree preparation."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Implementation: align the canonical branch_pr WorkOrder integration contract with the supervisor-first implementation route discovered by the complete hosted unit suite."
events:
  -
    type: "status"
    at: "2026-08-06T21:35:28.888Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement protocol polish in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T21:58:48.882Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: exact external resume protocol, typed operator boundaries, dependency-safe routing, canonical task help, human plan provenance, and one-call branch worktree preparation."
  -
    type: "verify"
    at: "2026-08-06T22:01:33.652Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Task-local protocol, CLI, docs, typecheck, and shared suites pass (89 cli-core + 334 agentplane tests). Critical suite is blocked by the shared compatibility-contract ratchet owned by foundational task 202608061850-BZT3D9; do not duplicate its baseline update in this branch. Rebase after BZT3D9, rerun the exact Verify Steps, then record pass."
  -
    type: "verify"
    at: "2026-08-07T22:30:51.490Z"
    author: "TESTER"
    state: "ok"
    note: "Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass."
  -
    type: "verify"
    at: "2026-08-07T22:33:16.515Z"
    author: "TESTER"
    state: "ok"
    note: "All declared checks pass on committed implementation SHA c49bacfa4."
  -
    type: "verify"
    at: "2026-08-07T22:43:19.068Z"
    author: "TESTER"
    state: "ok"
    note: "Evaluator findings resolved; compatibility, exact protocol fields, all agent guidance, docs, typing, routing, and critical suites pass on fd1eb488b."
  -
    type: "verify"
    at: "2026-08-07T22:53:46.069Z"
    author: "TESTER"
    state: "ok"
    note: "All evaluator rework and declared checks pass on clean implementation SHA ada518fb9."
  -
    type: "status"
    at: "2026-08-07T22:55:52.857Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-07T22:58:24.875Z"
    author: "TESTER"
    state: "ok"
    note: "Final pre-merge closure head b652c4cc2 passes all task, policy, docs, typing, critical, and cleanliness checks."
  -
    type: "verify"
    at: "2026-08-07T23:09:15.786Z"
    author: "TESTER"
    state: "ok"
    note: "Final implementation head ad1088693 passes all task, policy, docs, typing, critical, parser, and cleanliness checks."
  -
    type: "status"
    at: "2026-08-07T23:12:02.033Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-07T23:26:57.791Z"
    author: "TESTER"
    state: "ok"
    note: "Final hosted-CI rework head 032a2b8ab passes protocol, worktree, contract, hotspot, lint, typing, critical, and cleanliness checks."
  -
    type: "verify"
    at: "2026-08-07T23:29:31.756Z"
    author: "TESTER"
    state: "ok"
    note: "Final MCY8ZC implementation head 032a2b8ab passes every declared command plus the split branch-worktree e2e and complete CI contract."
  -
    type: "status"
    at: "2026-08-07T23:31:33.795Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-07T23:49:15.334Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation head 75263193a aligns the canonical branch_pr WorkOrder contract and passes the complete hosted-equivalent unit suite plus every declared verification and repository contract."
  -
    type: "status"
    at: "2026-08-07T23:50:35.499Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Implementation: align the canonical branch_pr WorkOrder integration contract with the supervisor-first implementation route discovered by the complete hosted unit suite."
  -
    type: "verify"
    at: "2026-08-07T23:52:03.405Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract."
  -
    type: "verify"
    at: "2026-08-07T23:53:13.775Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract."
  -
    type: "verify"
    at: "2026-08-07T23:57:08.836Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract."
doc_version: 3
doc_updated_at: "2026-08-07T23:58:44.509Z"
doc_updated_by: "CODER"
description: "Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, make quickstart and role command guides supervisor-first, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes."
sections:
  Summary: |-
    Polish the external supervisor protocol and canonical task help

    Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
  Scope: |-
    - In scope: Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
    - Out of scope: unrelated refactors not required for "Polish the external supervisor protocol and canonical task help".
  Plan: "1. Extend the external-agent packet with an exact result_path and structured resume_argv while preserving compatibility fields. 2. Return a typed, actionable operator boundary for approvals instead of a prose-only placeholder. 3. Rewrite runtime quickstart, role guidance, mode notes, and compact task help so normal agents see only task active, advance, run, and brief, while manual lifecycle commands remain forensic/operator-only behind help --all. 4. Correct explicit plan provenance in task begin with a human attribution or explicit plan-author contract. 5. Add an end-to-end branch_pr integration test starting task advance from the base checkout and asserting that automatic deterministic transitions produce a WorkOrder whose checkout, branch/head, writable roots, source manifest, and exchange paths all point to the created worktree without caller cwd changes. 6. Run critical compatibility and CLI documentation checks."
  Verify Steps: |-
    - bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    - bun run docs:cli:check
    - bun run typecheck
    - bun run test:critical
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T22:01:33.652Z — VERIFY — needs_rework

    By: TESTER

    Note: Task-local protocol, CLI, docs, typecheck, and shared suites pass (89 cli-core + 334 agentplane tests). Critical suite is blocked by the shared compatibility-contract ratchet owned by foundational task 202608061850-BZT3D9; do not duplicate its baseline update in this branch. Rebase after BZT3D9, rerun the exact Verify Steps, then record pass.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:58:48.882Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T22:30:51.490Z — VERIFY — ok

    By: TESTER

    Note: Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:01:34.506Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 18 tests passed.
    Evidence: Vitest completed with exit code 0 in the authoritative MCY8ZC worktree.
    Scope: external supervisor packet, task routing, and command guide contracts.

    Command: bun run docs:cli:check
    Result: pass; generated CLI reference is current.
    Evidence: check-cli-reference-fresh exited 0 and reported the reference up to date.
    Scope: generated CLI documentation and compact task help.

    Command: bun run typecheck
    Result: pass.
    Evidence: run-typescript-build exited 0.
    Scope: repository TypeScript contracts after rebase and conflict resolution.

    Command: bun run test:critical
    Result: pass; all 12 chunks and 84 tests passed.
    Evidence: critical-cli runner exited 0; every chunk reported passed.
    Scope: compatibility baseline, replay hardening, exit codes, protected paths, symlink roots, and trust-boundary ratchets.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T22:33:16.515Z — VERIFY — ok

    By: TESTER

    Note: All declared checks pass on committed implementation SHA c49bacfa4.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:30:52.475Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 18 tests passed.
    Evidence: Vitest exit code 0 on committed head c49bacfa4.
    Scope: external supervisor packet, task routing, and command guide contracts.

    Command: bun run docs:cli:check
    Result: pass.
    Evidence: generated CLI reference reported up to date on committed head c49bacfa4.
    Scope: compact task help and generated reference.

    Command: bun run typecheck
    Result: pass.
    Evidence: TypeScript build exited 0 on committed head c49bacfa4.
    Scope: repository TypeScript contracts.

    Command: bun run test:critical
    Result: pass; 12 of 12 chunks and 84 tests passed.
    Evidence: critical-cli exited 0 on committed head c49bacfa4.
    Scope: compatibility, replay, protected-path, symlink, and trust-boundary ratchets.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T22:43:19.068Z — VERIFY — ok

    By: TESTER

    Note: Evaluator findings resolved; compatibility, exact protocol fields, all agent guidance, docs, typing, routing, and critical suites pass on fd1eb488b.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:33:17.823Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 18 tests passed.
    Evidence: Vitest exited 0 on implementation head fd1eb488b.
    Scope: external supervisor CLI and route contracts.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 38 tests passed.
    Evidence: packet compatibility and supervisor-first surface contract tests exited 0 on fd1eb488b.
    Scope: return_invocation compatibility, exact result_path/resume_argv, bundled policies, skill, quickstart, and docs guidance.

    Command: bun run docs:bootstrap:check && bun run docs:cli:check
    Result: pass.
    Evidence: both generated-document freshness checks exited 0.
    Scope: bootstrap and CLI reference projections.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass.
    Evidence: policy routing OK.
    Scope: repo and bundled workflow policy synchronization and budgets.

    Command: bun run typecheck
    Result: pass.
    Evidence: TypeScript build exited 0 on fd1eb488b.
    Scope: repository TypeScript contracts.

    Command: bun run test:critical
    Result: pass; all 12 chunks and 84 tests passed.
    Evidence: critical-cli exited 0 on fd1eb488b.
    Scope: compatibility, replay, protected-path, symlink, and trust-boundary ratchets.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T22:53:46.069Z — VERIFY — ok

    By: TESTER

    Note: All evaluator rework and declared checks pass on clean implementation SHA ada518fb9.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:43:20.447Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 18 tests passed.
    Evidence: Vitest exited 0 on implementation SHA ada518fb982b82bf7cb63c2576fb16b0bc56e47b; the branch_pr scenario asserts the caller cwd is unchanged, checkout/branch/head/writable roots/exchange agree, bundled/runtime refs remain typed, and every repository source-manifest projection resolves inside the created worktree.
    Scope: external supervisor CLI, packet compatibility, route, and worktree-source binding.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 38 tests passed.
    Evidence: packet compatibility and exact protocol field guidance contracts exited 0.
    Scope: return_invocation compatibility, result_path/resume_argv, bundled policies, skill, quickstart, and docs surfaces.

    Command: bun run docs:bootstrap:check && bun run docs:cli:check
    Result: pass.
    Evidence: both generated-document freshness checks exited 0.
    Scope: bootstrap and CLI reference projections.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass.
    Evidence: policy routing OK.
    Scope: repo and bundled policy synchronization and budgets.

    Command: bun run typecheck
    Result: pass.
    Evidence: TypeScript build exited 0 on ada518fb982b82bf7cb63c2576fb16b0bc56e47b.
    Scope: repository TypeScript contracts.

    Command: bun run test:critical
    Result: pass; all 12 chunks and 84 tests passed.
    Evidence: critical-cli exited 0 on ada518fb982b82bf7cb63c2576fb16b0bc56e47b.
    Scope: compatibility, replay, protected-path, symlink, and trust-boundary ratchets.

    Command: git status --short --untracked-files=all
    Result: pass; stdout was empty.
    Evidence: authoritative MCY8ZC worktree had no tracked modifications and no untracked files at ada518fb982b82bf7cb63c2576fb16b0bc56e47b before recording this verification receipt.
    Scope: final repository cleanliness and unintended-drift check.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T22:58:24.875Z — VERIFY — ok

    By: TESTER

    Note: Final pre-merge closure head b652c4cc2 passes all task, policy, docs, typing, critical, and cleanliness checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:55:52.867Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 18 tests passed.
    Evidence: Vitest exited 0 on final pre-merge head b652c4cc29e6cc371d4ebb679b42c5d41eb37142, including exact worktree source-manifest projection assertions.
    Scope: external supervisor CLI, packet, route, and worktree binding.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 files and 38 tests passed.
    Evidence: packet compatibility and prompt-surface contracts exited 0.
    Scope: exact protocol fields and all agent-facing guidance.

    Command: bun run docs:bootstrap:check && bun run docs:cli:check
    Result: pass.
    Evidence: generated bootstrap and CLI docs are current.
    Scope: generated documentation.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass.
    Evidence: policy routing OK after append-only incident promotion.
    Scope: policy parity, routing, and budgets.

    Command: bun run typecheck
    Result: pass.
    Evidence: TypeScript build exited 0 on b652c4cc29e6cc371d4ebb679b42c5d41eb37142.
    Scope: repository TypeScript contracts.

    Command: bun run test:critical
    Result: pass; all 12 chunks and 84 tests passed.
    Evidence: critical-cli exited 0 on b652c4cc29e6cc371d4ebb679b42c5d41eb37142.
    Scope: compatibility and trust-boundary ratchets.

    Command: git status --short --untracked-files=all
    Result: pass; stdout was empty.
    Evidence: authoritative worktree had no tracked modifications or untracked files at b652c4cc29e6cc371d4ebb679b42c5d41eb37142 before this receipt.
    Scope: final repository cleanliness and unintended-drift check.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T23:09:15.786Z — VERIFY — ok

    By: TESTER

    Note: Final implementation head ad1088693 passes all task, policy, docs, typing, critical, parser, and cleanliness checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:59:38.699Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass
    Evidence: Vitest exited 0 with 3 files and 18 tests passed at ad1088693203b396693c99a4ef64397ef176c461.
    Scope: external supervisor CLI, packet, route, and worktree binding.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
    Result: pass
    Evidence: Vitest exited 0 with 5 files and 46 tests passed, including bounded Result commentary parsing.
    Scope: protocol compatibility, prompt surfaces, and durable verification evidence parsing.

    Command: bun run docs:bootstrap:check && bun run docs:cli:check
    Result: pass
    Evidence: generated bootstrap and CLI documentation checks exited 0.
    Scope: generated documentation.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing and mirror budgets exited 0.
    Scope: policy parity, routing, and size budgets.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0 at ad1088693203b396693c99a4ef64397ef176c461.
    Scope: repository TypeScript contracts.

    Command: bun run test:critical
    Result: pass
    Evidence: critical-cli completed all 12 chunks with 84 tests passed.
    Scope: compatibility and trust-boundary ratchets.

    Command: git status --short --untracked-files=all
    Result: pass
    Evidence: stdout was empty before this verification receipt.
    Scope: final repository cleanliness and unintended-drift check.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T23:26:57.791Z — VERIFY — ok

    By: TESTER

    Note: Final hosted-CI rework head 032a2b8ab passes protocol, worktree, contract, hotspot, lint, typing, critical, and cleanliness checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:12:02.060Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: Vitest exited 0 with 2 files and 13 tests passed at 032a2b8ab4180f16251f367b36ee462d2b108b92.
    Scope: external supervisor CLI and canonical base-checkout-to-worktree integration.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.worktree.test.ts packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
    Result: pass
    Evidence: Focused packet, dependency, blocker, verification-parser, and durable-record tests exited 0 across the validated runs.
    Scope: typed protocol fields, dependency parity, evidence parsing, and route blockers.

    Command: bun run ci:contract
    Result: pass
    Evidence: Full contract suite exited 0, including formatting, schemas, policy routing, docs, compatibility and RF-04 baseline checks, hotspots, lint, architecture, clone, knip, and coverage guardrails.
    Scope: complete CI contract and maintenance budgets.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0 at 032a2b8ab4180f16251f367b36ee462d2b108b92.
    Scope: repository TypeScript contracts.

    Command: bun run hotspots:check
    Result: pass
    Evidence: route-decision-blockers is 596 lines, task-advance main test is 874 lines, split branch-worktree test is 326 lines, and oversized baseline remained within 10 entries.
    Scope: runtime and test maintainability budgets.

    Command: bun run test:critical
    Result: pass
    Evidence: critical-cli completed all 12 chunks with 84 tests passed.
    Scope: compatibility and trust-boundary ratchets.

    Command: git status --short --untracked-files=all
    Result: pass
    Evidence: stdout was empty before this verification receipt.
    Scope: final repository cleanliness and unintended-drift check.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T23:29:31.756Z — VERIFY — ok

    By: TESTER

    Note: Final MCY8ZC implementation head 032a2b8ab passes every declared command plus the split branch-worktree e2e and complete CI contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:28:26.130Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass
    Evidence: Exact declared command exited 0 with 3 files and 17 tests passed after the final hosted-CI rework.
    Scope: declared external supervisor CLI, managed-run parity, routing, and canonical command guidance.

    Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: Split canonical base-checkout-to-worktree integration test exited 0 and is also covered by the earlier 2-file 13-test run.
    Scope: branch_pr worktree, branch/head, bounded source manifest, writable roots, exchange, and caller cwd binding.

    Command: bun run ci:contract
    Result: pass
    Evidence: Full contract suite exited 0, including formatting, schemas, policy routing, docs, compatibility and RF-04 baselines, hotspots, lint, architecture, clone, knip, and coverage guardrails.
    Scope: complete CI contract and maintenance budgets.

    Command: bun run docs:cli:check && bun run typecheck
    Result: pass
    Evidence: Generated CLI docs and TypeScript build exited 0 after the final evidence-gap commit.
    Scope: generated documentation and repository TypeScript contracts.

    Command: bun run test:critical
    Result: pass
    Evidence: critical-cli completed all 12 chunks with 84 tests passed at implementation head 032a2b8ab4180f16251f367b36ee462d2b108b92.
    Scope: compatibility and trust-boundary ratchets.

    Command: git status --short --untracked-files=all
    Result: pass
    Evidence: stdout was empty before this verification receipt.
    Scope: final repository cleanliness and unintended-drift check.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T23:49:15.334Z — VERIFY — ok

    By: TESTER

    Note: Implementation head 75263193a aligns the canonical branch_pr WorkOrder contract and passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:31:33.822Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T23:52:03.405Z — VERIFY — ok

    By: TESTER

    Note: Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:50:35.541Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T23:53:13.775Z — VERIFY — ok

    By: TESTER

    Note: Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:52:04.955Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Result: pass; 543 files and 3885 unit tests passed, 12 critical chunks and 84 tests passed, 3 acceptance files and 17 tests passed, ci:contract passed, docs:cli:check passed, and typecheck passed.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

    ### 2026-08-07T23:57:08.836Z — VERIFY — ok

    By: TESTER

    Note: Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:53:15.421Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:fast
    Result: pass; 543 files and 3885 tests passed.
    Evidence: Process exited 0 on implementation commit 75263193a.
    Scope: Complete agentplane, core, recipes, and testkit unit projects.

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 files and 17 tests passed.
    Evidence: Process exited 0 on implementation commit 75263193a.
    Scope: External supervisor advance, managed run, routing, and canonical command guide.

    Command: bun run docs:cli:check
    Result: pass.
    Evidence: Generated CLI reference was current and the process exited 0.
    Scope: CLI documentation contract.

    Command: bun run typecheck
    Result: pass.
    Evidence: Workspace TypeScript build completed with exit code 0.
    Scope: TypeScript contracts.

    Command: bun run test:critical
    Result: pass; 12 chunks and 84 tests passed.
    Evidence: Every critical CLI chunk exited 0 on implementation commit 75263193a.
    Scope: Critical compatibility and trust-boundary paths.

    Command: bun run ci:contract
    Result: pass.
    Evidence: Repository contract completed through coverage thresholds with exit code 0.
    Scope: Formatting, schemas, policy, efficiency baselines, hotspots, architecture, clone, dead code, and coverage contracts.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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
    - Observation: task next-action advertised start-ready as executable while task readiness still rejected it because a dependency was open.
      Impact: The route packet violated its executable-command contract and forced the caller into a failed lifecycle command.
      Resolution: Cover dependency readiness in route/action parity and preserve foundational merge ordering as an integration gate rather than an implementation blocker.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: bun run test:critical stops at run-cli.critical.agent-efficiency-baseline.test.ts because the immutable v0.7.4 compatibility candidate no longer matches current shared CLI and prompt surfaces.
      Impact: The task cannot receive a passing verification record or publish its PR head until the foundational compatibility baseline is merged.
      Resolution: Merge 202608061850-BZT3D9, rebase this branch, rerun targeted, docs, typecheck, and critical suites, then replace this rework record with verified evidence.

    - Observation: GitHub verify-unit exposed one stale integration expectation after the route correctly began returning the branch implementation episode before PR publication.
      Impact: The previous assertion expected read-only authority for a semantic implementation episode and failed the complete unit job despite the runtime route being correct.
      Resolution: Updated the canonical WorkOrder integration assertion to require workspace-write in the task worktree; verified 543 files/3885 tests, 12 critical chunks/84 tests, 3 acceptance files/17 tests, ci:contract, docs:cli:check, and typecheck.

    - Observation: GitHub verify-unit exposed one stale integration expectation after the route correctly began returning the branch implementation episode before PR publication.
      Impact: The previous assertion expected read-only authority for a semantic implementation episode and failed the complete unit job despite the runtime route being correct.
      Resolution: Updated the canonical WorkOrder integration assertion to require workspace-write in the task worktree; verified 543 files/3885 tests, 12 critical chunks/84 tests, 3 acceptance files/17 tests, ci:contract, docs:cli:check, and typecheck.

    - Observation: GitHub verify-unit exposed one stale integration expectation after the route correctly began returning the branch implementation episode before PR publication.
      Impact: The previous assertion expected read-only authority for a semantic implementation episode and failed the complete unit job despite the runtime route being correct.
      Resolution: Updated the canonical WorkOrder integration assertion to require workspace-write in the task worktree and reran the complete qualification set.
extensions:
  implementation_commit:
    hash: "032a2b8ab4180f16251f367b36ee462d2b108b92"
    message: "🧹 MCY8ZC supervisor: satisfy protocol test lint"
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Polish the external supervisor protocol and canonical task help

Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.

## Scope

- In scope: Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
- Out of scope: unrelated refactors not required for "Polish the external supervisor protocol and canonical task help".

## Plan

1. Extend the external-agent packet with an exact result_path and structured resume_argv while preserving compatibility fields. 2. Return a typed, actionable operator boundary for approvals instead of a prose-only placeholder. 3. Rewrite runtime quickstart, role guidance, mode notes, and compact task help so normal agents see only task active, advance, run, and brief, while manual lifecycle commands remain forensic/operator-only behind help --all. 4. Correct explicit plan provenance in task begin with a human attribution or explicit plan-author contract. 5. Add an end-to-end branch_pr integration test starting task advance from the base checkout and asserting that automatic deterministic transitions produce a WorkOrder whose checkout, branch/head, writable roots, source manifest, and exchange paths all point to the created worktree without caller cwd changes. 6. Run critical compatibility and CLI documentation checks.

## Verify Steps

- bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
- bun run docs:cli:check
- bun run typecheck
- bun run test:critical

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T22:01:33.652Z — VERIFY — needs_rework

By: TESTER

Note: Task-local protocol, CLI, docs, typecheck, and shared suites pass (89 cli-core + 334 agentplane tests). Critical suite is blocked by the shared compatibility-contract ratchet owned by foundational task 202608061850-BZT3D9; do not duplicate its baseline update in this branch. Rebase after BZT3D9, rerun the exact Verify Steps, then record pass.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:58:48.882Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T22:30:51.490Z — VERIFY — ok

By: TESTER

Note: Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:01:34.506Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 18 tests passed.
Evidence: Vitest completed with exit code 0 in the authoritative MCY8ZC worktree.
Scope: external supervisor packet, task routing, and command guide contracts.

Command: bun run docs:cli:check
Result: pass; generated CLI reference is current.
Evidence: check-cli-reference-fresh exited 0 and reported the reference up to date.
Scope: generated CLI documentation and compact task help.

Command: bun run typecheck
Result: pass.
Evidence: run-typescript-build exited 0.
Scope: repository TypeScript contracts after rebase and conflict resolution.

Command: bun run test:critical
Result: pass; all 12 chunks and 84 tests passed.
Evidence: critical-cli runner exited 0; every chunk reported passed.
Scope: compatibility baseline, replay hardening, exit codes, protected paths, symlink roots, and trust-boundary ratchets.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T22:33:16.515Z — VERIFY — ok

By: TESTER

Note: All declared checks pass on committed implementation SHA c49bacfa4.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:30:52.475Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 18 tests passed.
Evidence: Vitest exit code 0 on committed head c49bacfa4.
Scope: external supervisor packet, task routing, and command guide contracts.

Command: bun run docs:cli:check
Result: pass.
Evidence: generated CLI reference reported up to date on committed head c49bacfa4.
Scope: compact task help and generated reference.

Command: bun run typecheck
Result: pass.
Evidence: TypeScript build exited 0 on committed head c49bacfa4.
Scope: repository TypeScript contracts.

Command: bun run test:critical
Result: pass; 12 of 12 chunks and 84 tests passed.
Evidence: critical-cli exited 0 on committed head c49bacfa4.
Scope: compatibility, replay, protected-path, symlink, and trust-boundary ratchets.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T22:43:19.068Z — VERIFY — ok

By: TESTER

Note: Evaluator findings resolved; compatibility, exact protocol fields, all agent guidance, docs, typing, routing, and critical suites pass on fd1eb488b.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:33:17.823Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 18 tests passed.
Evidence: Vitest exited 0 on implementation head fd1eb488b.
Scope: external supervisor CLI and route contracts.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 38 tests passed.
Evidence: packet compatibility and supervisor-first surface contract tests exited 0 on fd1eb488b.
Scope: return_invocation compatibility, exact result_path/resume_argv, bundled policies, skill, quickstart, and docs guidance.

Command: bun run docs:bootstrap:check && bun run docs:cli:check
Result: pass.
Evidence: both generated-document freshness checks exited 0.
Scope: bootstrap and CLI reference projections.

Command: node .agentplane/policy/check-routing.mjs
Result: pass.
Evidence: policy routing OK.
Scope: repo and bundled workflow policy synchronization and budgets.

Command: bun run typecheck
Result: pass.
Evidence: TypeScript build exited 0 on fd1eb488b.
Scope: repository TypeScript contracts.

Command: bun run test:critical
Result: pass; all 12 chunks and 84 tests passed.
Evidence: critical-cli exited 0 on fd1eb488b.
Scope: compatibility, replay, protected-path, symlink, and trust-boundary ratchets.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T22:53:46.069Z — VERIFY — ok

By: TESTER

Note: All evaluator rework and declared checks pass on clean implementation SHA ada518fb9.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:43:20.447Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 18 tests passed.
Evidence: Vitest exited 0 on implementation SHA ada518fb982b82bf7cb63c2576fb16b0bc56e47b; the branch_pr scenario asserts the caller cwd is unchanged, checkout/branch/head/writable roots/exchange agree, bundled/runtime refs remain typed, and every repository source-manifest projection resolves inside the created worktree.
Scope: external supervisor CLI, packet compatibility, route, and worktree-source binding.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 38 tests passed.
Evidence: packet compatibility and exact protocol field guidance contracts exited 0.
Scope: return_invocation compatibility, result_path/resume_argv, bundled policies, skill, quickstart, and docs surfaces.

Command: bun run docs:bootstrap:check && bun run docs:cli:check
Result: pass.
Evidence: both generated-document freshness checks exited 0.
Scope: bootstrap and CLI reference projections.

Command: node .agentplane/policy/check-routing.mjs
Result: pass.
Evidence: policy routing OK.
Scope: repo and bundled policy synchronization and budgets.

Command: bun run typecheck
Result: pass.
Evidence: TypeScript build exited 0 on ada518fb982b82bf7cb63c2576fb16b0bc56e47b.
Scope: repository TypeScript contracts.

Command: bun run test:critical
Result: pass; all 12 chunks and 84 tests passed.
Evidence: critical-cli exited 0 on ada518fb982b82bf7cb63c2576fb16b0bc56e47b.
Scope: compatibility, replay, protected-path, symlink, and trust-boundary ratchets.

Command: git status --short --untracked-files=all
Result: pass; stdout was empty.
Evidence: authoritative MCY8ZC worktree had no tracked modifications and no untracked files at ada518fb982b82bf7cb63c2576fb16b0bc56e47b before recording this verification receipt.
Scope: final repository cleanliness and unintended-drift check.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T22:58:24.875Z — VERIFY — ok

By: TESTER

Note: Final pre-merge closure head b652c4cc2 passes all task, policy, docs, typing, critical, and cleanliness checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:55:52.867Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 18 tests passed.
Evidence: Vitest exited 0 on final pre-merge head b652c4cc29e6cc371d4ebb679b42c5d41eb37142, including exact worktree source-manifest projection assertions.
Scope: external supervisor CLI, packet, route, and worktree binding.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 files and 38 tests passed.
Evidence: packet compatibility and prompt-surface contracts exited 0.
Scope: exact protocol fields and all agent-facing guidance.

Command: bun run docs:bootstrap:check && bun run docs:cli:check
Result: pass.
Evidence: generated bootstrap and CLI docs are current.
Scope: generated documentation.

Command: node .agentplane/policy/check-routing.mjs
Result: pass.
Evidence: policy routing OK after append-only incident promotion.
Scope: policy parity, routing, and budgets.

Command: bun run typecheck
Result: pass.
Evidence: TypeScript build exited 0 on b652c4cc29e6cc371d4ebb679b42c5d41eb37142.
Scope: repository TypeScript contracts.

Command: bun run test:critical
Result: pass; all 12 chunks and 84 tests passed.
Evidence: critical-cli exited 0 on b652c4cc29e6cc371d4ebb679b42c5d41eb37142.
Scope: compatibility and trust-boundary ratchets.

Command: git status --short --untracked-files=all
Result: pass; stdout was empty.
Evidence: authoritative worktree had no tracked modifications or untracked files at b652c4cc29e6cc371d4ebb679b42c5d41eb37142 before this receipt.
Scope: final repository cleanliness and unintended-drift check.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T23:09:15.786Z — VERIFY — ok

By: TESTER

Note: Final implementation head ad1088693 passes all task, policy, docs, typing, critical, parser, and cleanliness checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T22:59:38.699Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass
Evidence: Vitest exited 0 with 3 files and 18 tests passed at ad1088693203b396693c99a4ef64397ef176c461.
Scope: external supervisor CLI, packet, route, and worktree binding.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
Result: pass
Evidence: Vitest exited 0 with 5 files and 46 tests passed, including bounded Result commentary parsing.
Scope: protocol compatibility, prompt surfaces, and durable verification evidence parsing.

Command: bun run docs:bootstrap:check && bun run docs:cli:check
Result: pass
Evidence: generated bootstrap and CLI documentation checks exited 0.
Scope: generated documentation.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing and mirror budgets exited 0.
Scope: policy parity, routing, and size budgets.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0 at ad1088693203b396693c99a4ef64397ef176c461.
Scope: repository TypeScript contracts.

Command: bun run test:critical
Result: pass
Evidence: critical-cli completed all 12 chunks with 84 tests passed.
Scope: compatibility and trust-boundary ratchets.

Command: git status --short --untracked-files=all
Result: pass
Evidence: stdout was empty before this verification receipt.
Scope: final repository cleanliness and unintended-drift check.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T23:26:57.791Z — VERIFY — ok

By: TESTER

Note: Final hosted-CI rework head 032a2b8ab passes protocol, worktree, contract, hotspot, lint, typing, critical, and cleanliness checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:12:02.060Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: Vitest exited 0 with 2 files and 13 tests passed at 032a2b8ab4180f16251f367b36ee462d2b108b92.
Scope: external supervisor CLI and canonical base-checkout-to-worktree integration.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.worktree.test.ts packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
Result: pass
Evidence: Focused packet, dependency, blocker, verification-parser, and durable-record tests exited 0 across the validated runs.
Scope: typed protocol fields, dependency parity, evidence parsing, and route blockers.

Command: bun run ci:contract
Result: pass
Evidence: Full contract suite exited 0, including formatting, schemas, policy routing, docs, compatibility and RF-04 baseline checks, hotspots, lint, architecture, clone, knip, and coverage guardrails.
Scope: complete CI contract and maintenance budgets.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0 at 032a2b8ab4180f16251f367b36ee462d2b108b92.
Scope: repository TypeScript contracts.

Command: bun run hotspots:check
Result: pass
Evidence: route-decision-blockers is 596 lines, task-advance main test is 874 lines, split branch-worktree test is 326 lines, and oversized baseline remained within 10 entries.
Scope: runtime and test maintainability budgets.

Command: bun run test:critical
Result: pass
Evidence: critical-cli completed all 12 chunks with 84 tests passed.
Scope: compatibility and trust-boundary ratchets.

Command: git status --short --untracked-files=all
Result: pass
Evidence: stdout was empty before this verification receipt.
Scope: final repository cleanliness and unintended-drift check.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T23:29:31.756Z — VERIFY — ok

By: TESTER

Note: Final MCY8ZC implementation head 032a2b8ab passes every declared command plus the split branch-worktree e2e and complete CI contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:28:26.130Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass
Evidence: Exact declared command exited 0 with 3 files and 17 tests passed after the final hosted-CI rework.
Scope: declared external supervisor CLI, managed-run parity, routing, and canonical command guidance.

Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: Split canonical base-checkout-to-worktree integration test exited 0 and is also covered by the earlier 2-file 13-test run.
Scope: branch_pr worktree, branch/head, bounded source manifest, writable roots, exchange, and caller cwd binding.

Command: bun run ci:contract
Result: pass
Evidence: Full contract suite exited 0, including formatting, schemas, policy routing, docs, compatibility and RF-04 baselines, hotspots, lint, architecture, clone, knip, and coverage guardrails.
Scope: complete CI contract and maintenance budgets.

Command: bun run docs:cli:check && bun run typecheck
Result: pass
Evidence: Generated CLI docs and TypeScript build exited 0 after the final evidence-gap commit.
Scope: generated documentation and repository TypeScript contracts.

Command: bun run test:critical
Result: pass
Evidence: critical-cli completed all 12 chunks with 84 tests passed at implementation head 032a2b8ab4180f16251f367b36ee462d2b108b92.
Scope: compatibility and trust-boundary ratchets.

Command: git status --short --untracked-files=all
Result: pass
Evidence: stdout was empty before this verification receipt.
Scope: final repository cleanliness and unintended-drift check.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T23:49:15.334Z — VERIFY — ok

By: TESTER

Note: Implementation head 75263193a aligns the canonical branch_pr WorkOrder contract and passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:31:33.822Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T23:52:03.405Z — VERIFY — ok

By: TESTER

Note: Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:50:35.541Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T23:53:13.775Z — VERIFY — ok

By: TESTER

Note: Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:52:04.955Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Result: pass; 543 files and 3885 unit tests passed, 12 critical chunks and 84 tests passed, 3 acceptance files and 17 tests passed, ci:contract passed, docs:cli:check passed, and typecheck passed.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

### 2026-08-07T23:57:08.836Z — VERIFY — ok

By: TESTER

Note: Implementation commit 75263193a passes the complete hosted-equivalent unit suite plus every declared verification and repository contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T23:53:15.421Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:fast
Result: pass; 543 files and 3885 tests passed.
Evidence: Process exited 0 on implementation commit 75263193a.
Scope: Complete agentplane, core, recipes, and testkit unit projects.

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 files and 17 tests passed.
Evidence: Process exited 0 on implementation commit 75263193a.
Scope: External supervisor advance, managed run, routing, and canonical command guide.

Command: bun run docs:cli:check
Result: pass.
Evidence: Generated CLI reference was current and the process exited 0.
Scope: CLI documentation contract.

Command: bun run typecheck
Result: pass.
Evidence: Workspace TypeScript build completed with exit code 0.
Scope: TypeScript contracts.

Command: bun run test:critical
Result: pass; 12 chunks and 84 tests passed.
Evidence: Every critical CLI chunk exited 0 on implementation commit 75263193a.
Scope: Critical compatibility and trust-boundary paths.

Command: bun run ci:contract
Result: pass.
Evidence: Repository contract completed through coverage thresholds with exit code 0.
Scope: Formatting, schemas, policy, efficiency baselines, hotspots, architecture, clone, dead code, and coverage contracts.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

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

- Observation: task next-action advertised start-ready as executable while task readiness still rejected it because a dependency was open.
  Impact: The route packet violated its executable-command contract and forced the caller into a failed lifecycle command.
  Resolution: Cover dependency readiness in route/action parity and preserve foundational merge ordering as an integration gate rather than an implementation blocker.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: bun run test:critical stops at run-cli.critical.agent-efficiency-baseline.test.ts because the immutable v0.7.4 compatibility candidate no longer matches current shared CLI and prompt surfaces.
  Impact: The task cannot receive a passing verification record or publish its PR head until the foundational compatibility baseline is merged.
  Resolution: Merge 202608061850-BZT3D9, rebase this branch, rerun targeted, docs, typecheck, and critical suites, then replace this rework record with verified evidence.

- Observation: GitHub verify-unit exposed one stale integration expectation after the route correctly began returning the branch implementation episode before PR publication.
  Impact: The previous assertion expected read-only authority for a semantic implementation episode and failed the complete unit job despite the runtime route being correct.
  Resolution: Updated the canonical WorkOrder integration assertion to require workspace-write in the task worktree; verified 543 files/3885 tests, 12 critical chunks/84 tests, 3 acceptance files/17 tests, ci:contract, docs:cli:check, and typecheck.

- Observation: GitHub verify-unit exposed one stale integration expectation after the route correctly began returning the branch implementation episode before PR publication.
  Impact: The previous assertion expected read-only authority for a semantic implementation episode and failed the complete unit job despite the runtime route being correct.
  Resolution: Updated the canonical WorkOrder integration assertion to require workspace-write in the task worktree; verified 543 files/3885 tests, 12 critical chunks/84 tests, 3 acceptance files/17 tests, ci:contract, docs:cli:check, and typecheck.

- Observation: GitHub verify-unit exposed one stale integration expectation after the route correctly began returning the branch implementation episode before PR publication.
  Impact: The previous assertion expected read-only authority for a semantic implementation episode and failed the complete unit job despite the runtime route being correct.
  Resolution: Updated the canonical WorkOrder integration assertion to require workspace-write in the task worktree and reran the complete qualification set.

## Token Usage

- State: `observed`
- Completeness: `7/7` agent runs
- Input tokens: `1941964`
- Output tokens: `19257`
- Reasoning tokens: `4905`
- Total tokens: `1966126`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:243ba6b364c96e9e10edc7dc6ae1937f8f0b64302428bb28213e34f750a95cbc`
- Unavailable reason: `none`
- Updated at: `2026-08-07T23:31:33.795Z`
