---
id: "202608062021-V2EESE"
title: "Project semantic-only provider prompts and reject process choreography"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "prompts"
  - "quality"
  - "supervisor"
  - "v0.7.5"
  - "process-mechanism-repair"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:22:25.882Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-07T05:10:09.901Z"
  updated_by: "REVIEWER"
  note: "Hosted contract CI rejected the prompt guard integration because task-run.ts exceeded the 600-line runtime hotspot limit."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-07T05:01:10.163Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "60c6416fb08858e79d2b22c227363cb068d25ce8"
  blueprint_digest: "ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26"
  evidence_refs:
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-050012723-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-050012723-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/88658b8fd0b0ad5e2e824f2522d2f6bd6d1a30d50dd6c95ea6d494c2f71ab19c.md"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-050012723-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-050012723-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-050012723-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608062021-V2EESE/README.md"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/ec83df6c7f976c11abcccfbf66aec702823e935c295f5386d4e80b1d445ee8c2.patch"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/28fb63753a5ffd39bda9827ca4e0759b9c14a7a5e37fab762ad3c9f7fdd80e66.json"
    - ".agentplane/tasks/202608062021-V2EESE/verification/20260807045726439-47f95c04a29b783c.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/95733d97fca351adc4547b7181a057ce60fc567aeb7afbf37c59f69aa9b36417.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No contract-breaking defect was identified in the frozen implementation and verification evidence."
token_usage:
  agent_runs: 5
  input_tokens: 792013
  journal_digest: "sha256:0664d4904902a0f3abab975af5b43cbe54d2204ec90aabaac0dc47d37a993323"
  observed_agent_runs: 4
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "partial"
  total_tokens: 806015
  unavailable_reason: "some_agent_runs_lack_provider_token_telemetry"
  updated_at: "2026-08-07T05:04:53.488Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: semantic-only provider prompt projection and exact process-choreography gate."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-06T21:10:33.947Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T21:32:28.349Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: semantic-only provider prompt projection and exact process-choreography gate."
  -
    type: "verify"
    at: "2026-08-06T21:32:55.493Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Targeted semantic prompt, context, supervisor, and state-fingerprint checks pass; full test:critical remains blocked by the pre-existing compatibility ratchet drift on current main pending foundational PR BZT3D9."
  -
    type: "verify"
    at: "2026-08-07T04:29:43.950Z"
    author: "TESTER"
    state: "ok"
    note: "Semantic-only provider prompt projection and exact-input choreography guard pass the declared contract."
  -
    type: "verify"
    at: "2026-08-07T04:43:34.465Z"
    author: "TESTER"
    state: "ok"
    note: "Evaluator rework is resolved: mixed security fragments are preserved and exact provider input rejects every supervisor command family unless explicit repair authority is present."
  -
    type: "verify"
    at: "2026-08-07T04:51:55.634Z"
    author: "TESTER"
    state: "ok"
    note: "Command-family hardening passes exact compiled-provider tests and the complete critical contract."
  -
    type: "verify"
    at: "2026-08-07T04:57:26.439Z"
    author: "TESTER"
    state: "ok"
    note: "Embedded Git control commands are rejected in any prose position while read-only Git inspection remains available."
  -
    type: "verify"
    at: "2026-08-07T05:02:46.499Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: blueprint snapshot refreshed after explicit repair-authority tag; implementation and checks are unchanged."
  -
    type: "status"
    at: "2026-08-07T05:04:53.488Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-07T05:10:09.901Z"
    author: "REVIEWER"
    state: "needs_rework"
    note: "Hosted contract CI rejected the prompt guard integration because task-run.ts exceeded the 600-line runtime hotspot limit."
doc_version: 3
doc_updated_at: "2026-08-07T05:10:11.326Z"
doc_updated_by: "CODER"
description: "Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt."
sections:
  Summary: |-
    Project semantic-only provider prompts and reject process choreography

    Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
  Scope: |-
    - In scope: Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
    - Out of scope: unrelated refactors not required for "Project semantic-only provider prompts and reject process choreography".
  Plan: "1. Add a structured semantic-episode projection for policy gateway fragments instead of regex-based section removal. 2. Include only project purpose, scope and security boundaries, user instructions, semantic role constraints, approved objective, authority, writable roots, required inputs, output schema, and stop rules for PLANNER, EXECUTOR, and EVALUATOR provider calls. 3. Keep the full gateway available to operator and recovery surfaces while preventing normal semantic prompts from receiving startup, route, Git, PR, verification persistence, integration, cleanup, or release choreography. 4. Capture the exact compiled provider input and fail qualification when forbidden lifecycle commands appear outside an explicitly lifecycle-repair episode. 5. Verify parity, bounded context, and no regression in runner recovery or critical contracts."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    - bun run test:critical
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T21:32:55.493Z — VERIFY — needs_rework

    By: TESTER

    Note: Targeted semantic prompt, context, supervisor, and state-fingerprint checks pass; full test:critical remains blocked by the pre-existing compatibility ratchet drift on current main pending foundational PR BZT3D9.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:28.349Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-V2EESE
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T04:29:43.950Z — VERIFY — ok

    By: TESTER

    Note: Semantic-only provider prompt projection and exact-input choreography guard pass the declared contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:56.328Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    Result: pass
    Evidence: 3 files, 33 tests passed.
    Scope: semantic projection, exact provider prompt rejection, task-run context.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical-cli chunks passed.
    Scope: critical CLI, efficiency, replay, trust-boundary and platform contracts.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0.
    Scope: workspace type safety.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy gateway graph.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

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

    ### 2026-08-07T04:43:34.465Z — VERIFY — ok

    By: TESTER

    Note: Evaluator rework is resolved: mixed security fragments are preserved and exact provider input rejects every supervisor command family unless explicit repair authority is present.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:29:44.810Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    Result: pass
    Evidence: 3 files, 60 tests passed after rework and formatting.
    Scope: structured projection, exact provider input, explicit repair authority, phase-tool exception.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical-cli chunks passed after evaluator rework.
    Scope: critical CLI, efficiency, replay and trust boundaries.

    Command: bun run lint:core
    Result: pass
    Evidence: ESLint exited 0.
    Scope: packages and scripts.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0.
    Scope: workspace type safety.

    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style.
    Scope: repository formatting.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy gateway graph.

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-V2EESE
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T04:51:55.634Z — VERIFY — ok

    By: TESTER

    Note: Command-family hardening passes exact compiled-provider tests and the complete critical contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:43:35.810Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    Result: pass
    Evidence: 3 files, 73 tests passed.
    Scope: exact compiled provider rejection, Git/release families, declared phase-tool identity.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical-cli chunks passed at the final command-family implementation.
    Scope: critical CLI, efficiency, replay and trust boundaries.

    Command: bun run lint:core
    Result: pass
    Evidence: ESLint exited 0.
    Scope: packages and scripts.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0.
    Scope: workspace type safety.

    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style.
    Scope: repository formatting.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK on the semantic-projection branch.
    Scope: policy gateway graph.

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-V2EESE
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T04:57:26.439Z — VERIFY — ok

    By: TESTER

    Note: Embedded Git control commands are rejected in any prose position while read-only Git inspection remains available.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:51:56.940Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    Result: pass
    Evidence: 3 files, 77 tests passed.
    Scope: mixed security fragments, embedded Git control, release families, exact phase-tool identity.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical-cli chunks passed.
    Scope: critical CLI, efficiency, replay and trust boundaries.

    Command: bun run lint:core
    Result: pass
    Evidence: ESLint exited 0.
    Scope: packages and scripts.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0.
    Scope: workspace type safety.

    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style.
    Scope: repository formatting.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK at 60c6416fb08858e79d2b22c227363cb068d25ce8.
    Scope: policy gateway graph.

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-V2EESE
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T05:02:46.499Z — VERIFY — ok

    By: TESTER

    Note: Verified: blueprint snapshot refreshed after explicit repair-authority tag; implementation and checks are unchanged.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:57:27.759Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    Result: pass
    Evidence: 3 files, 77 tests passed at implementation head 60c6416fb08858e79d2b22c227363cb068d25ce8.
    Scope: semantic provider projection and exact guard.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 chunks passed.
    Scope: critical contract.

    Command: bun run lint:core; bun run typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: lint, typecheck, formatting, and routing all exited 0.
    Scope: static and policy gates.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T05:10:09.901Z — VERIFY — needs_rework

    By: REVIEWER

    Note: Hosted contract CI rejected the prompt guard integration because task-run.ts exceeded the 600-line runtime hotspot limit.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T05:04:53.500Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

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
    - Observation: The compatibility baseline test reports current main candidate drift before task-specific verification can complete.
      Impact: The semantic projection implementation is locally validated, but the mandatory cumulative critical gate cannot yet be recorded as passing.
      Resolution: Integrate BZT3D9, rebase this branch, rerun all declared Verify Steps, then record a fresh verification result.

    - Observation: Command: bun run hotspots:check\nResult: fail\nEvidence: packages/agentplane/src/runner/usecases/task-run.ts reached 632 lines after V2EESE changes.\nScope: hosted verify-contract parity.
      Impact: PR #4789 cannot merge and release qualification is not green.
      Resolution: Extract semantic prompt preparation and validation from task-run.ts, then rerun local and hosted contract verification.
extensions:
  implementation_commit:
    hash: "60c6416fb08858e79d2b22c227363cb068d25ce8"
    message: "🛡️ V2EESE prompts: detect embedded Git control commands"
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Project semantic-only provider prompts and reject process choreography

Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.

## Scope

- In scope: Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
- Out of scope: unrelated refactors not required for "Project semantic-only provider prompts and reject process choreography".

## Plan

1. Add a structured semantic-episode projection for policy gateway fragments instead of regex-based section removal. 2. Include only project purpose, scope and security boundaries, user instructions, semantic role constraints, approved objective, authority, writable roots, required inputs, output schema, and stop rules for PLANNER, EXECUTOR, and EVALUATOR provider calls. 3. Keep the full gateway available to operator and recovery surfaces while preventing normal semantic prompts from receiving startup, route, Git, PR, verification persistence, integration, cleanup, or release choreography. 4. Capture the exact compiled provider input and fail qualification when forbidden lifecycle commands appear outside an explicitly lifecycle-repair episode. 5. Verify parity, bounded context, and no regression in runner recovery or critical contracts.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
- bun run test:critical
- bun run typecheck
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T21:32:55.493Z — VERIFY — needs_rework

By: TESTER

Note: Targeted semantic prompt, context, supervisor, and state-fingerprint checks pass; full test:critical remains blocked by the pre-existing compatibility ratchet drift on current main pending foundational PR BZT3D9.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:28.349Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-V2EESE
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T04:29:43.950Z — VERIFY — ok

By: TESTER

Note: Semantic-only provider prompt projection and exact-input choreography guard pass the declared contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:56.328Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
Result: pass
Evidence: 3 files, 33 tests passed.
Scope: semantic projection, exact provider prompt rejection, task-run context.

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical-cli chunks passed.
Scope: critical CLI, efficiency, replay, trust-boundary and platform contracts.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0.
Scope: workspace type safety.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway graph.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

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

### 2026-08-07T04:43:34.465Z — VERIFY — ok

By: TESTER

Note: Evaluator rework is resolved: mixed security fragments are preserved and exact provider input rejects every supervisor command family unless explicit repair authority is present.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:29:44.810Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
Result: pass
Evidence: 3 files, 60 tests passed after rework and formatting.
Scope: structured projection, exact provider input, explicit repair authority, phase-tool exception.

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical-cli chunks passed after evaluator rework.
Scope: critical CLI, efficiency, replay and trust boundaries.

Command: bun run lint:core
Result: pass
Evidence: ESLint exited 0.
Scope: packages and scripts.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0.
Scope: workspace type safety.

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style.
Scope: repository formatting.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway graph.

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-V2EESE
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T04:51:55.634Z — VERIFY — ok

By: TESTER

Note: Command-family hardening passes exact compiled-provider tests and the complete critical contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:43:35.810Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
Result: pass
Evidence: 3 files, 73 tests passed.
Scope: exact compiled provider rejection, Git/release families, declared phase-tool identity.

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical-cli chunks passed at the final command-family implementation.
Scope: critical CLI, efficiency, replay and trust boundaries.

Command: bun run lint:core
Result: pass
Evidence: ESLint exited 0.
Scope: packages and scripts.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0.
Scope: workspace type safety.

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style.
Scope: repository formatting.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK on the semantic-projection branch.
Scope: policy gateway graph.

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-V2EESE
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T04:57:26.439Z — VERIFY — ok

By: TESTER

Note: Embedded Git control commands are rejected in any prose position while read-only Git inspection remains available.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:51:56.940Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
Result: pass
Evidence: 3 files, 77 tests passed.
Scope: mixed security fragments, embedded Git control, release families, exact phase-tool identity.

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical-cli chunks passed.
Scope: critical CLI, efficiency, replay and trust boundaries.

Command: bun run lint:core
Result: pass
Evidence: ESLint exited 0.
Scope: packages and scripts.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0.
Scope: workspace type safety.

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style.
Scope: repository formatting.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK at 60c6416fb08858e79d2b22c227363cb068d25ce8.
Scope: policy gateway graph.

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-V2EESE
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T05:02:46.499Z — VERIFY — ok

By: TESTER

Note: Verified: blueprint snapshot refreshed after explicit repair-authority tag; implementation and checks are unchanged.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:57:27.759Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
Result: pass
Evidence: 3 files, 77 tests passed at implementation head 60c6416fb08858e79d2b22c227363cb068d25ce8.
Scope: semantic provider projection and exact guard.

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 chunks passed.
Scope: critical contract.

Command: bun run lint:core; bun run typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: lint, typecheck, formatting, and routing all exited 0.
Scope: static and policy gates.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T05:10:09.901Z — VERIFY — needs_rework

By: REVIEWER

Note: Hosted contract CI rejected the prompt guard integration because task-run.ts exceeded the 600-line runtime hotspot limit.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T05:04:53.500Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

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

- Observation: The compatibility baseline test reports current main candidate drift before task-specific verification can complete.
  Impact: The semantic projection implementation is locally validated, but the mandatory cumulative critical gate cannot yet be recorded as passing.
  Resolution: Integrate BZT3D9, rebase this branch, rerun all declared Verify Steps, then record a fresh verification result.

- Observation: Command: bun run hotspots:check\nResult: fail\nEvidence: packages/agentplane/src/runner/usecases/task-run.ts reached 632 lines after V2EESE changes.\nScope: hosted verify-contract parity.
  Impact: PR #4789 cannot merge and release qualification is not green.
  Resolution: Extract semantic prompt preparation and validation from task-run.ts, then rerun local and hosted contract verification.

## Token Usage

- State: `partial`
- Completeness: `4/5` agent runs
- Input tokens: `792013`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `806015`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:0664d4904902a0f3abab975af5b43cbe54d2204ec90aabaac0dc47d37a993323`
- Unavailable reason: `some_agent_runs_lack_provider_token_telemetry`
- Updated at: `2026-08-07T05:04:53.488Z`
