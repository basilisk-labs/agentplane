---
id: "202608062021-MCY8ZC"
title: "Polish the external supervisor protocol and canonical task help"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 26
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
  updated_at: "2026-08-07T23:09:15.786Z"
  updated_by: "TESTER"
  note: "Final implementation head ad1088693 passes all task, policy, docs, typing, critical, parser, and cleanliness checks."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-07T23:11:11.184Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "ad1088693203b396693c99a4ef64397ef176c461"
  blueprint_digest: "98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5"
  evidence_refs:
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-231014026-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-231014026-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/d9e3ed7c3f952c1dbe1bef0dbdb0cc0c5485762b515c33963e4181bb019212c5.md"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-231014026-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-231014026-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/20260807-231014026-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/README.md"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/ff533282bf80b0143380ab1d5abaa31ae0582b1d7dfbb0748baffe757545c3fa.patch"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/972257cbe2390e990685353b042b60edd1209850b73fbbe3b2c3a6aa677633dd.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/verification/20260807230915786-6b651866acfadd5b.json"
    - ".agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/b9ec9d466ef8872c88b80f76b9ceb07256be22c1879b47a8a56de950a4cc9057.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen implementation and deterministic verification evidence satisfy the declared external supervisor protocol, operator-boundary, help-surface, provenance, and branch-worktree requirements."
token_usage:
  agent_runs: 3
  input_tokens: 912556
  journal_digest: "sha256:19e90c6e404fcfe2f231b11df66e8cef314b62bcb0297829a45805ae07734df4"
  observed_agent_runs: 3
  observed_by: "agentplane"
  output_tokens: 8881
  reasoning_tokens: 2046
  schema_version: 1
  source: "supervisor_journal"
  state: "observed"
  total_tokens: 923483
  unavailable_reason: null
  updated_at: "2026-08-07T22:55:52.857Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "a5e9f26e025d4c7bc538213f67bafc4d8eb201f8"
  message: "✅ MCY8ZC supervisor: record evaluator pass"
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
doc_version: 3
doc_updated_at: "2026-08-07T23:11:11.210Z"
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
extensions:
  implementation_commit:
    hash: "ada518fb982b82bf7cb63c2576fb16b0bc56e47b"
    message: "🧪 MCY8ZC supervisor: prove worktree source binding"
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

## Token Usage

- State: `observed`
- Completeness: `3/3` agent runs
- Input tokens: `912556`
- Output tokens: `8881`
- Reasoning tokens: `2046`
- Total tokens: `923483`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:19e90c6e404fcfe2f231b11df66e8cef314b62bcb0297829a45805ae07734df4`
- Unavailable reason: `none`
- Updated at: `2026-08-07T22:55:52.857Z`
