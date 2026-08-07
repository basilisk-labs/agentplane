---
id: "202608062021-Z0X584"
title: "Converge generated agent guidance on the supervisor-first protocol"
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
  - "supervisor"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts"
  - "bun run docs:onboarding:check"
  - "bun run docs:cli:check"
  - "node .agentplane/policy/check-routing.mjs"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/command-guide.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:25:32.603Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-07T03:16:18.364Z"
  updated_by: "TESTER"
  note: "Rework: refresh the supervisor-first surfaces onto current main after merged Windows and lint fixes, then rerun all declared checks and evaluator."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-06T20:57:45.991Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "b5faa8b3dce64578db6160645737572acbea4239"
  blueprint_digest: "5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100"
  evidence_refs:
    - ".agentplane/tasks/202608062021-Z0X584/quality/20260806-205649741-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608062021-Z0X584/quality/20260806-205649741-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608062021-Z0X584/quality/objects/sha256/27f95fde6d2c6c61b1dea187396c20cede910370d92f8dc24ba2e9eb512c9204.md"
    - ".agentplane/tasks/202608062021-Z0X584/quality/20260806-205649741-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608062021-Z0X584/quality/20260806-205649741-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608062021-Z0X584/quality/20260806-205649741-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608062021-Z0X584/README.md"
    - ".agentplane/tasks/202608062021-Z0X584/quality/objects/sha256/baa8ade9826dd7b0d4391b1d9ab07232dca46746d451064353ac9e58ac17ebce.patch"
    - ".agentplane/tasks/202608062021-Z0X584/quality/objects/sha256/5376b7e2341c049645ce7f55b4e2993d737cd74e719127ba30d8df8172876b7c.json"
    - ".agentplane/tasks/202608062021-Z0X584/verification/20260806205625866-6d17c65e6f6decef.json"
    - ".agentplane/tasks/202608062021-Z0X584/quality/objects/sha256/cb9bc25b71317d1d5c961b48d4eeed93cebd2712ab163ae470e33bb52e17d0ab.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The post-commit task, verification, PR, and quality-artifact drift is attributable to active AgentPlane supervision and does not alter the frozen implementation diff."
token_usage:
  agent_runs: 1
  input_tokens: 228172
  journal_digest: "sha256:2521e6555a5b457fafc04023ef10e86c185777ee6dea1a16120bf88a2f6d50f6"
  observed_agent_runs: 1
  observed_by: "agentplane"
  output_tokens: 2411
  reasoning_tokens: 516
  schema_version: 1
  source: "supervisor_journal"
  state: "observed"
  total_tokens: 231099
  unavailable_reason: null
  updated_at: "2026-08-06T20:58:29.014Z"
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
    author: "DOCS"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: supervisor-first prompts, generated guidance, docs contracts, and safe task reclassification are committed; focused verification passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-06T20:27:51.775Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T20:53:24.345Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: supervisor-first prompts, generated guidance, docs contracts, and safe task reclassification are committed; focused verification passed."
  -
    type: "verify"
    at: "2026-08-06T20:54:16.153Z"
    author: "TESTER"
    state: "ok"
    note: "Supervisor-first assets, compiled quickstart and role prompts, generated docs, and routing contracts passed all task Verify Steps; 63 focused tests and typecheck also passed."
  -
    type: "verify"
    at: "2026-08-06T20:55:22.070Z"
    author: "TESTER"
    state: "ok"
    note: "All five Verify Steps passed on implementation b5faa8b3dce6: 63 focused tests, onboarding alignment, CLI reference freshness, routing policy, and task-update workflow coverage; typecheck also passed."
  -
    type: "verify"
    at: "2026-08-06T20:56:25.866Z"
    author: "TESTER"
    state: "ok"
    note: "All five Verify Steps passed on implementation b5faa8b3dce6 with concrete check evidence; typecheck and focused lint also passed."
  -
    type: "status"
    at: "2026-08-06T20:58:29.014Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-07T03:16:18.364Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: refresh the supervisor-first surfaces onto current main after merged Windows and lint fixes, then rerun all declared checks and evaluator."
doc_version: 3
doc_updated_at: "2026-08-07T03:16:19.580Z"
doc_updated_by: "CODER"
description: "Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policy modules, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces."
sections:
  Summary: |-
    Converge generated agent guidance on the supervisor-first protocol

    Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.
  Scope: |-
    - In scope: Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.
    - Out of scope: unrelated refactors not required for "Converge generated agent guidance on the supervisor-first protocol".
  Plan: "1. Inventory every bundled policy, generated gateway, skill, README, and workflow-document surface that addresses an external or managed agent. 2. Define one normal supervisor-first route: task active, task advance with typed semantic results, or task run for a configured managed runner; move work start, start-ready, verify, finish, integrate, cleanup, Git, and PR choreography to explicitly operator/recovery-only sections. 3. Rewrite the bundled Markdown assets and public docs, including complete managed and external first workflows without hidden manual transitions. 4. Add asset/generation contract tests so installed gateways and skills cannot regress to manual lifecycle cognition. 5. Regenerate docs and validate gateway policy budgets."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
    - bun run docs:onboarding:check
    - bun run docs:cli:check
    - node .agentplane/policy/check-routing.mjs
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/command-guide.test.ts
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T20:54:16.153Z — VERIFY — ok

    By: TESTER

    Note: Supervisor-first assets, compiled quickstart and role prompts, generated docs, and routing contracts passed all task Verify Steps; 63 focused tests and typecheck also passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:53:24.345Z, excerpt_hash=sha256:ae20cadd2d3f5e18bbfbecd7e0a72cf3000ad9579bea93f3493a49d6ff61b277

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
    - old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-Z0X584

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-Z0X584
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-06T20:55:22.070Z — VERIFY — ok

    By: TESTER

    Note: All five Verify Steps passed on implementation b5faa8b3dce6: 63 focused tests, onboarding alignment, CLI reference freshness, routing policy, and task-update workflow coverage; typecheck also passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:55:11.030Z, excerpt_hash=sha256:e9653577267767950996748213a2f0aa3639b45685585200ddac7e270aea9d00

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
    - old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-Z0X584

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-Z0X584
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-06T20:56:25.866Z — VERIFY — ok

    By: TESTER

    Note: All five Verify Steps passed on implementation b5faa8b3dce6 with concrete check evidence; typecheck and focused lint also passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:55:22.949Z, excerpt_hash=sha256:e9653577267767950996748213a2f0aa3639b45685585200ddac7e270aea9d00

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
    Result: pass
    Evidence: 2 test files passed, 27 tests passed.
    Scope: bundled supervisor-first assets and prompt compiler/init regression surface.

    Command: bun run docs:onboarding:check
    Result: pass
    Evidence: agent onboarding scenario surfaces are aligned.
    Scope: generated bootstrap, workflow, lifecycle, and branch_pr onboarding.

    Command: bun run docs:cli:check
    Result: pass
    Evidence: generated CLI reference is up to date.
    Scope: compiled quickstart, role guide, and task update help surface.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: bundled and repo-local supervisor-first policy gateway graph.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass
    Evidence: 3 test files passed, 36 tests passed.
    Scope: compiled role and quickstart guidance plus explicit structured task reclassification.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
    - old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-Z0X584

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-Z0X584
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T03:16:18.364Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: refresh the supervisor-first surfaces onto current main after merged Windows and lint fixes, then rerun all declared checks and evaluator.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:58:29.023Z, excerpt_hash=sha256:e9653577267767950996748213a2f0aa3639b45685585200ddac7e270aea9d00

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
    - old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-Z0X584

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
    - Observation: Agent-facing guidance now exposes task active, task advance, and task run as the normal route and rejects manual lifecycle command regressions.
      Impact: External and managed agents no longer receive generated instructions that make them reconstruct or operate Agentplane process choreography.
      Resolution: Updated bundled gateway, policies, skill, compiled guides, public docs, generated artifacts, and contract tests; retained low-level commands only for operator/recovery use.

    - Observation: The task verification contract now covers both supervisor-first prompt surfaces and the structured reclassification safeguard.
      Impact: Verification is bound to the complete current scope and implementation SHA.
      Resolution: Synchronized README Verify Steps with structured task metadata and recorded fresh evidence.

    - Observation: The previous verification predates current main.
      Impact: The release candidate is not yet proven against the integrated dependency graph.
      Resolution: Merge current main, rerun the focused and repository gates, then record fresh verification and quality evidence.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Converge generated agent guidance on the supervisor-first protocol

Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.

## Scope

- In scope: Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.
- Out of scope: unrelated refactors not required for "Converge generated agent guidance on the supervisor-first protocol".

## Plan

1. Inventory every bundled policy, generated gateway, skill, README, and workflow-document surface that addresses an external or managed agent. 2. Define one normal supervisor-first route: task active, task advance with typed semantic results, or task run for a configured managed runner; move work start, start-ready, verify, finish, integrate, cleanup, Git, and PR choreography to explicitly operator/recovery-only sections. 3. Rewrite the bundled Markdown assets and public docs, including complete managed and external first workflows without hidden manual transitions. 4. Add asset/generation contract tests so installed gateways and skills cannot regress to manual lifecycle cognition. 5. Regenerate docs and validate gateway policy budgets.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
- bun run docs:onboarding:check
- bun run docs:cli:check
- node .agentplane/policy/check-routing.mjs
- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/command-guide.test.ts

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T20:54:16.153Z — VERIFY — ok

By: TESTER

Note: Supervisor-first assets, compiled quickstart and role prompts, generated docs, and routing contracts passed all task Verify Steps; 63 focused tests and typecheck also passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:53:24.345Z, excerpt_hash=sha256:ae20cadd2d3f5e18bbfbecd7e0a72cf3000ad9579bea93f3493a49d6ff61b277

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
- old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-Z0X584

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-Z0X584
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-06T20:55:22.070Z — VERIFY — ok

By: TESTER

Note: All five Verify Steps passed on implementation b5faa8b3dce6: 63 focused tests, onboarding alignment, CLI reference freshness, routing policy, and task-update workflow coverage; typecheck also passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:55:11.030Z, excerpt_hash=sha256:e9653577267767950996748213a2f0aa3639b45685585200ddac7e270aea9d00

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
- old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-Z0X584

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-Z0X584
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-06T20:56:25.866Z — VERIFY — ok

By: TESTER

Note: All five Verify Steps passed on implementation b5faa8b3dce6 with concrete check evidence; typecheck and focused lint also passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:55:22.949Z, excerpt_hash=sha256:e9653577267767950996748213a2f0aa3639b45685585200ddac7e270aea9d00

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
Result: pass
Evidence: 2 test files passed, 27 tests passed.
Scope: bundled supervisor-first assets and prompt compiler/init regression surface.

Command: bun run docs:onboarding:check
Result: pass
Evidence: agent onboarding scenario surfaces are aligned.
Scope: generated bootstrap, workflow, lifecycle, and branch_pr onboarding.

Command: bun run docs:cli:check
Result: pass
Evidence: generated CLI reference is up to date.
Scope: compiled quickstart, role guide, and task update help surface.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: bundled and repo-local supervisor-first policy gateway graph.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass
Evidence: 3 test files passed, 36 tests passed.
Scope: compiled role and quickstart guidance plus explicit structured task reclassification.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
- old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-Z0X584

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-Z0X584
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T03:16:18.364Z — VERIFY — needs_rework

By: TESTER

Note: Rework: refresh the supervisor-first surfaces onto current main after merged Windows and lint fixes, then rerun all declared checks and evaluator.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:58:29.023Z, excerpt_hash=sha256:e9653577267767950996748213a2f0aa3639b45685585200ddac7e270aea9d00

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-Z0X584-converge-generated-agent-guidance-on-the-supervi/.agentplane/tasks/202608062021-Z0X584/blueprint/resolved-snapshot.json
- old_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- current_digest: 5ddd27fad869ad51a7a3d94d10815e4b848b73f30592f279215b7c89e7ab1100
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-Z0X584

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

- Observation: Agent-facing guidance now exposes task active, task advance, and task run as the normal route and rejects manual lifecycle command regressions.
  Impact: External and managed agents no longer receive generated instructions that make them reconstruct or operate Agentplane process choreography.
  Resolution: Updated bundled gateway, policies, skill, compiled guides, public docs, generated artifacts, and contract tests; retained low-level commands only for operator/recovery use.

- Observation: The task verification contract now covers both supervisor-first prompt surfaces and the structured reclassification safeguard.
  Impact: Verification is bound to the complete current scope and implementation SHA.
  Resolution: Synchronized README Verify Steps with structured task metadata and recorded fresh evidence.

- Observation: The previous verification predates current main.
  Impact: The release candidate is not yet proven against the integrated dependency graph.
  Resolution: Merge current main, rerun the focused and repository gates, then record fresh verification and quality evidence.

## Token Usage

- State: `observed`
- Completeness: `1/1` agent runs
- Input tokens: `228172`
- Output tokens: `2411`
- Reasoning tokens: `516`
- Total tokens: `231099`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:2521e6555a5b457fafc04023ef10e86c185777ee6dea1a16120bf88a2f6d50f6`
- Unavailable reason: `none`
- Updated at: `2026-08-06T20:58:29.014Z`
