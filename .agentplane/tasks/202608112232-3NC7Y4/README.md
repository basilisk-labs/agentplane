---
id: "202608112232-3NC7Y4"
title: "Make execution strategy risk-adaptive and agent-selected"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 22
origin:
  system: "manual"
depends_on:
  - "202608112213-NWJCBW"
tags:
  - "architecture"
  - "code"
  - "ux"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T22:32:42.722Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-12T05:53:28.437Z"
  updated_by: "CODER"
  note: "Rework verified at 16629e79b: observed scope enforcement, mode-stable verification, and realistic direct/branch lifecycle coverage pass."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-12T04:21:49.670Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "9ef72a552043bae4d00b171a3038923803c193b8"
  blueprint_digest: "9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6"
  evidence_refs:
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/20260812-042046844-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/20260812-042046844-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/5b229e8d7ee1c255b4b0ad87ca7708292a6353db6f2ff9cc4104b52458f17fa8.md"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/20260812-042046844-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/20260812-042046844-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/20260812-042046844-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/20260812-042046844-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608112232-3NC7Y4/README.md"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/ef041548ca51db681b579a95e76aad0b1b468b8dd69dd53ab76a766298320a9f.patch"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/d494864c77b93870f664cd2de602dbcae8d520b84b89c6569c9d81bcb90aaab7.json"
    - ".agentplane/tasks/202608112232-3NC7Y4/verification/20260812042023781-2f0397ef68cb6177.json"
    - ".agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/713d635b887c7c585dcaacdf90acc3b66adefd80a7316bf2f3f88328352bd276.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Observed changes are compared only by effect category, not against the declaration's writable scope. A change outside authority.writable_roots is accepted when its structural effect was declared, so the compiled contract does not enforce its own path authority or detect component drift."
    - "The localized direct and broad branch_pr scenarios stop after planning and route readback. They execute no work, verification, evaluator, or finish path; verification_time_ms is asserted as zero. Consequently they do not provide the requested realistic end-to-end ceremony and evidence comparison, despite the verification record describing them as realistic CLI cases."
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
  updated_at: "2026-08-12T02:00:40.317Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "9a7817e984c30b698f02084996704b4b76577e08"
  message: "✅ 3NC7Y4 task: record rework quality review"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation complete: structured agent execution declaration, deterministic contract compilation, effect-based routing, monotonic escalation with preserved work, and realistic direct/branch_pr E2Es. Full local fast CI passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Rework: address two valid P1 review findings without scope expansion."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-12T00:34:37.688Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-12T01:26:09.791Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation complete: structured agent execution declaration, deterministic contract compilation, effect-based routing, monotonic escalation with preserved work, and realistic direct/branch_pr E2Es. Full local fast CI passed."
    commit: "40afabe86933efaad8d6bca48903ea38bcc378e2"
  -
    type: "verify"
    at: "2026-08-12T01:39:32.590Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: agent-selected risk-adaptive routing, deterministic safety enforcement, preserved-work escalation, and realistic user E2Es verified."
  -
    type: "status"
    at: "2026-08-12T01:41:24.708Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "41f9990d02d3fee587bc99c0f784d0489623de67"
  -
    type: "status"
    at: "2026-08-12T01:42:28.452Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Rework: address two valid P1 review findings without scope expansion."
  -
    type: "verify"
    at: "2026-08-12T01:57:43.942Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation 12f447c63 verified after P1 rework."
  -
    type: "status"
    at: "2026-08-12T02:00:40.317Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "9a7817e984c30b698f02084996704b4b76577e08"
  -
    type: "verify"
    at: "2026-08-12T02:25:34.184Z"
    author: "TESTER"
    state: "ok"
    note: "Execution strategy contract and verification-race fix pass full and focused validation for implementation 9ad25f443."
  -
    type: "verify"
    at: "2026-08-12T03:27:04.488Z"
    author: "CODER"
    state: "ok"
    note: "Execution authority rework and compatibility paths verified."
  -
    type: "verify"
    at: "2026-08-12T04:10:25.439Z"
    author: "CODER"
    state: "ok"
    note: "Verified implementation commit 1d7a807eb: complete local CI and realistic user-flow E2Es passed."
  -
    type: "verify"
    at: "2026-08-12T04:20:23.781Z"
    author: "CODER"
    state: "ok"
    note: "Verified implementation commit 9ef72a552: complete local CI and explicit agent-selected branch_pr E2E evidence passed."
  -
    type: "verify"
    at: "2026-08-12T05:53:28.437Z"
    author: "CODER"
    state: "ok"
    note: "Rework verified at 16629e79b: observed scope enforcement, mode-stable verification, and realistic direct/branch lifecycle coverage pass."
doc_version: 3
doc_updated_at: "2026-08-12T05:53:30.675Z"
doc_updated_by: "CODER"
description: "Use one canonical lifecycle while letting the agent semantically choose direct or branch_pr through a structured risk/effect declaration. AgentPlane must compile and enforce one deterministic execution contract, compare it with observed effects, escalate monotonically when required, and never use product-language keyword heuristics as lifecycle authority."
sections:
  Summary: |-
    Make execution strategy risk-adaptive and agent-selected

    Use one canonical lifecycle while letting the agent semantically choose direct or branch_pr through a structured risk/effect declaration. AgentPlane must compile and enforce one deterministic execution contract, compare it with observed effects, escalate monotonically when required, and never use product-language keyword heuristics as lifecycle authority.
  Scope: |-
    - In scope: Use one canonical lifecycle while letting the agent semantically choose direct or branch_pr through a structured risk/effect declaration. AgentPlane must compile and enforce one deterministic execution contract, compare it with observed effects, escalate monotonically when required, and never use product-language keyword heuristics as lifecycle authority.
    - Out of scope: unrelated refactors not required for "Make execution strategy risk-adaptive and agent-selected".
  Plan: |-
    1. Define a versioned structured execution declaration supplied by the semantic agent. It must separate preferred workflow, expected scope/components, declared repository and external effects, requirements/implementation uncertainty, reversibility, and free-form rationale. Do not add task-size tiers or natural-language keyword inference.
    2. Compile the declaration through one deterministic policy resolver into a machine-readable and explainable execution contract: resolved workflow, allowed and forbidden effects, writable authority, required approvals, required verification/evidence, and reasons for any override. Make this contract authoritative for planning, execution, commit policy, verification, evaluator, finish, and recovery rather than letting subsystems reinterpret task prose independently.
    3. Respect agent-selected direct or branch_pr when compatible. Add a monotonic direct-to-branch_pr escalation path when declared or observed effects require isolation/review. Preserve completed work and return one canonical next action; do not enter effect_in_doubt or require reclaim/reconcile/repair command sequences. Prevent branch_pr-to-direct downgrade after branch-specific state exists.
    4. Derive verification requirements from declared effects and strengthen them from objective observed effects. Compare the declaration with actual changed paths/components, manifest or lockfile changes, schema/migration/CI/public-contract artifacts, external/network effects, and verification results. Treat underestimation as a normal escalation, not agent misconduct; never silently weaken already-required evidence.
    5. Remove or bypass product-language and filename keyword classification anywhere it authoritatively controls task kind, workflow, permissions, writable scope, approvals, verification, or lifecycle routing. Agent semantic declarations own interpretation; AgentPlane only validates structured declarations and deterministic observable facts.
    6. Keep fundamental safety gates non-self-authorizable: destructive Git, publish/deploy, external-system writes, credential/security changes, and irreversible effects require deterministic authority and approval regardless of an agent low-risk claim.
    7. Keep the normal UX compact: task -> agent assessment -> execution contract -> work -> verification -> finish. Journals, exchange state, effect resolution, packet replacement, and workflow migration remain internal unless explicit debugging is requested.
    8. Add realistic E2E coverage for: localized reversible direct work; broad multi-component branch_pr work; underestimated direct work escalating to branch_pr without losing changes; prohibited external/destructive effects; and misleading product-language words that must not drive routing. Measure control-plane commands, approvals, lifecycle transitions, verification time, work preservation, and recovery-command count.
    9. Preserve legacy config/project loading and the single canonical process from task 202608112213-NWJCBW. Legacy profiles may parse but must never participate in risk resolution. Update schemas, explain/readback surfaces, migrations, docs, and tests.
    10. Verify targeted contracts plus full relevant lifecycle, routing, commit, evaluator, recovery, and E2E suites. Demonstrate lower ceremony for low-risk direct work while retaining or improving evidence and safety for significant or external-effect work.
  Verify Steps: |-
    1. Validate the structured declaration and compiled execution-contract schemas, migrations, explain output, and cross-subsystem consumption. Expected: one versioned contract carries agent assessment, declared effects, deterministic resolution, and observed effects without keyword classification.
    2. Run E2E scenarios for localized direct work and broad agent-selected branch_pr work. Expected: each preferred workflow is respected when compatible, targeted evidence is sufficient for low-risk work, and no redundant approval or manual lifecycle command is required.
    3. Run an underestimated direct-work E2E. Expected: deterministic observed effects produce one direct-to-branch_pr escalation action, completed changes survive, required evidence strengthens monotonically, and neither effect_in_doubt nor manual reclaim/reconcile/repair is needed.
    4. Run external/destructive-effect and misleading-language E2Es. Expected: safety authority cannot be self-granted, and words such as production, release, docs, server, or deployment do not determine task kind or workflow.
    5. Run routing, writable-scope, commit-policy, verification, evaluator, finish, recovery, compatibility, formatting, type, lint, and relevant full test shards. Expected: all pass; existing projects load without manual migration; representative before/after traces show fewer commands/approvals/transitions for low-risk direct work without weaker significant-task evidence.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-12T01:39:32.590Z — VERIFY — ok

    By: TESTER

    Note: PASS: agent-selected risk-adaptive routing, deterministic safety enforcement, preserved-work escalation, and realistic user E2Es verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:157186805616e646ad0b097885f98a35f72d8e6c6e85dc8a7c8113a2b293f676

    Details:

    Command: AGENTPLANE_FAST_CHANGED_FILES=".agentplane/tasks/202608112232-3NC7Y4/README.md
    .agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    .agentplane/tasks/202608112232-3NC7Y4/pr/diffstat.txt
    .agentplane/tasks/202608112232-3NC7Y4/pr/github-body.md
    .agentplane/tasks/202608112232-3NC7Y4/pr/github-title.txt
    .agentplane/tasks/202608112232-3NC7Y4/pr/meta.json
    .agentplane/tasks/202608112232-3NC7Y4/pr/review.md
    packages/agentplane/src/backends/task-backend/shared/record.ts
    packages/agentplane/src/backends/task-backend/shared/types.ts
    packages/agentplane/src/blueprints/resolve.test.ts
    packages/agentplane/src/blueprints/resolve.ts
    packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts
    packages/agentplane/src/commands/blueprint/task-input.test.ts
    packages/agentplane/src/commands/blueprint/task-input.ts
    packages/agentplane/src/commands/shared/route-decision-types.ts
    packages/agentplane/src/commands/shared/task-backend.ts
    packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts
    packages/agentplane/src/commands/task/agent-action-packet.ts
    packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts
    packages/agentplane/src/commands/task/brief-model.ts
    packages/agentplane/src/commands/task/brief-render.ts
    packages/agentplane/src/commands/task/create.command.ts
    packages/agentplane/src/commands/task/direct-task-finalization.test.ts
    packages/agentplane/src/commands/task/direct-task-finalization.ts
    packages/agentplane/src/commands/task/direct-task-supervisor-result.ts
    packages/agentplane/src/commands/task/direct-task-supervisor.test.ts
    packages/agentplane/src/commands/task/direct-task-supervisor.ts
    packages/agentplane/src/commands/task/direct-task-verification.test.ts
    packages/agentplane/src/commands/task/direct-task-verification.ts
    packages/agentplane/src/commands/task/external-agent-planning-authority.ts
    packages/agentplane/src/commands/task/new.ts
    packages/agentplane/src/commands/task/next-action.command.ts
    packages/agentplane/src/commands/task/plan.ts
    packages/agentplane/src/commands/task/run-execution-preview.ts
    packages/agentplane/src/commands/task/status.command.ts
    packages/agentplane/src/commands/task/task-execution-contract-observation.ts
    packages/agentplane/src/runner/context/task-context.ts
    packages/agentplane/src/runner/types/context.ts
    packages/agentplane/src/runner/usecases/agent-work-order-build.ts
    packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts
    packages/agentplane/src/runtime/task-intake/resolve-materialize.ts
    packages/agentplane/src/runtime/task-intake/resolve-normalize.ts
    packages/agentplane/src/runtime/task-intake/types.ts
    packages/agentplane/src/runtime/task-routing/index.ts
    packages/agentplane/src/runtime/task-routing/resolve.test.ts
    packages/agentplane/src/runtime/task-routing/resolve.ts
    packages/core/schemas/task-readme-frontmatter.schema.json
    packages/core/schemas/tasks-export.schema.json
    packages/core/src/runner/agent-semantic-result.test.ts
    packages/core/src/runner/agent-semantic-result.ts
    packages/core/src/tasks/index.ts
    packages/core/src/tasks/task-artifact-schema.task.ts
    packages/core/src/tasks/task-provider-safe-projection.ts
    packages/core/src/tasks/task-readme.ts
    packages/core/src/tasks/task-store.ts
    packages/core/src/tasks/tasks-export.ts
    packages/spec/schemas/task-readme-frontmatter.schema.json
    packages/spec/schemas/tasks-export.schema.json
    schemas/agent-semantic-result.schema.json
    schemas/task-readme-frontmatter.schema.json
    schemas/tasks-export.schema.json" bun run ci:local:fast
    Result: pass
    Evidence: 553 test files passed; 4048 tests passed and 1 skipped; all 12 critical CLI E2E chunks passed; format, schemas, policy routing, build, typecheck, lint, hotspot, docs freshness, and cold-start checks passed on final source head
    Scope: full fast release-relevant regression surface for the risk-adaptive execution contract

    Command: bunx vitest run packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
    Result: pass
    Evidence: 6 files passed; 61 tests passed
    Scope: localized direct work, broad SDK/schema branch_pr work, misleading-language routing, underestimated direct escalation with preserved commit, non-self-authorizable external effects, writable roots, supervisors, and effect-derived verification

    Command: bun scripts/generate/sync-schemas.mjs check && node scripts/checks/check-policy-routing.mjs && git diff --check origin/main...HEAD
    Result: pass
    Evidence: generated schemas current; policy routing valid; no diff whitespace errors
    Scope: persisted execution-contract schema, routing policy, and final branch integrity

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    - old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608112232-3NC7Y4
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-12T01:57:43.942Z — VERIFY — ok

    By: TESTER

    Note: Implementation 12f447c63 verified after P1 rework.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:bd1f22a2231309ca5e15c9dc2863fbce6ce39d66abef8dc3b7ce38cb4e7e23c0

    Details:

    Command: bunx vitest run <focused execution-contract matrix>
    Result: pass
    Evidence: 7 test files passed; 81 tests passed
    Scope: execution declarations, deterministic routing, semantic result, work-order authority, direct escalation, task creation compatibility

    Command: bun run ci:local:fast
    Result: pass
    Evidence: 554 test files passed; 4050 tests passed; 1 skipped; all 12 critical CLI shards passed
    Scope: formatting, schemas, templates, policy routing, release parity, build, typecheck, lint, cold-start, unit and critical CLI regressions

    Command: focused P1 regression tests
    Result: pass
    Evidence: explicit empty agent scope is read-only; direct-to-branch escalation persists code.branch_pr; legacy empty scope remains compatible
    Scope: writable authority least privilege and monotonic workflow escalation

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    - old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608112232-3NC7Y4
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-12T02:25:34.184Z — VERIFY — ok

    By: TESTER

    Note: Execution strategy contract and verification-race fix pass full and focused validation for implementation 9ad25f443.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:9ee3faa3bd5d14981488d4b87f532803365f8ee1e3ed6904484a366816a4613a

    Details:

    Command: bun run ci:local:fast
    Result: pass
    Evidence: 554 test files passed; 4051 tests passed and 1 skipped; all 12 critical CLI shards passed; implementation commit 9ad25f443.
    Scope: full fast local CI including formatting, schemas, build, types, lint, unit tests, and critical CLI E2E.

    Command: bun x vitest run <12 changed execution-contract test modules>
    Result: pass
    Evidence: 12 test files passed; 120 tests passed.
    Scope: agent-selected direct and branch_pr routing, structural effects, monotonic escalation, scope authority, verification, supervisors, work orders, and legacy compatibility.

    Command: bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts
    Result: pass
    Evidence: 2 test files passed; 19 tests passed; concurrent verification test passed after one exact task reread.
    Scope: fail-closed reconciliation and transient task README read race handling.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    - old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

    ### 2026-08-12T03:27:04.488Z — VERIFY — ok

    By: CODER

    Note: Execution authority rework and compatibility paths verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:6bd77954e91ea85e33aa123035826a0c63ccaf7454763c72718651b6365bcdd1

    Details:

    Command: bun run ci:local:fast
    Result: pass
    Evidence: 555 test files passed; 4058 tests passed, 1 skipped; all 12 critical CLI chunks passed
    Scope: execution contract schemas, authority enforcement, observed effects, verification ordering, compatibility, full fast CI

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    - old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

    ### 2026-08-12T04:10:25.439Z — VERIFY — ok

    By: CODER

    Note: Verified implementation commit 1d7a807eb: complete local CI and realistic user-flow E2Es passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:0723942a2ae160e6a9238e1c1210b716baa0024a4dd92f0aea4b3686c79c2f65

    Details:

    Command: bun run ci:local:fast
    Result: pass
    Evidence: Format, schemas, templates, routing, release parity, build, cold-start, documentation freshness, hotspot, project routing and lint passed; 555 test files passed with 4059 tests passed and 1 skipped; all 12 critical CLI shards passed.
    Scope: Full fast repository CI for implementation commit 1d7a807eb.

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts packages/agentplane/src/backends/task-backend/shared/record.test.ts packages/core/src/tasks/task-artifact-schema.test.ts
    Result: pass
    Evidence: Focused risk-adaptive contract and E2E suite passed, including localized direct, broad branch_pr, underestimated escalation with preserved work, forbidden destructive effects, approved network reads, and legacy-contract completion without a migration command.
    Scope: Agent-selected strategy, deterministic authority, observed effects, escalation, compatibility and WorkOrder projection.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    - old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

    ### 2026-08-12T04:20:23.781Z — VERIFY — ok

    By: CODER

    Note: Verified implementation commit 9ef72a552: complete local CI and explicit agent-selected branch_pr E2E evidence passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:9c15adea0ccffb1fc8b683f79a7b67851b69bcb4c94315fcde3dffc5eb867f8f

    Details:

    Command: bun run ci:local:fast
    Result: pass
    Evidence: Format, schemas, templates, routing, release parity, build, cold-start, documentation freshness, hotspot, project routing and lint passed; 555 test files passed with 4059 tests passed and 1 skipped; all 12 critical CLI shards passed.
    Scope: Full fast repository CI for implementation commit 9ef72a552 after evaluator rework.

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts --reporter=verbose
    Result: pass
    Evidence: 8 of 8 realistic CLI cases passed. The broad case explicitly declares preferred_mode branch_pr and resolves through agent_preferred_branch_pr; exact lifecycle transitions are asserted for localized direct, broad branch_pr, misleading language, underestimated escalation, prohibited external effects, network approval and legacy completion.
    Scope: Agent-selected strategy, transition measurements, ceremony metrics and compatibility.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    - old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

    ### 2026-08-12T05:53:28.437Z — VERIFY — ok

    By: CODER

    Note: Rework verified at 16629e79b: observed scope enforcement, mode-stable verification, and realistic direct/branch lifecycle coverage pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:b64321c88cb44e2a7cb4ce8de3a4a9427562bd31bf2acc8eebad1640f0012387

    Details:

    Command: bun run ci:local:fast
    Result: pass (555 test files; 4061 passed, 1 skipped; 12/12 critical CLI chunks passed)
    Evidence: commit 16629e79b6164c75ebc1c41be2d0f0bf973bbda0; direct and branch lifecycle E2E; writable-scope escalation; verification compatibility units
    Scope: risk-adaptive execution contract, observed authority enforcement, deterministic escalation, verification identity, and workflow documentation

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
    - old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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
    - Observation: The full local CI and realistic workflow E2Es passed on the committed implementation; execution authority is consistent with configured network approval, observed external-agent paths are recorded, and legacy contracts normalize automatically.
      Impact: Agent-selected routing remains flexible while AgentPlane deterministically enforces authority, escalation, verification and compatibility without keyword classification or redundant lifecycle recovery.
      Resolution: Accept the implementation candidate for independent evaluator review and hosted integration.

    - Observation: The explicit agent-selected branch_pr scenario and exact transition counts now pass alongside the complete local CI.
      Impact: The test evidence distinguishes agent preference from deterministic safety escalation and quantifies lifecycle ceremony for representative product-development workflows.
      Resolution: Accept this exact implementation identity for independent evaluator review and hosted integration.
extensions:
  implementation_commit:
    hash: "12f447c63ce5c78b152d461dcc1e00517a04f149"
    message: "🐛 3NC7Y4 task: close execution authority gaps"
  workflow_route_baseline:
    start_head_sha: "106662505177833ff8ededb1ad621baf342c3a88"
    version: 1
id_source: "generated"
---
## Summary

Make execution strategy risk-adaptive and agent-selected

Use one canonical lifecycle while letting the agent semantically choose direct or branch_pr through a structured risk/effect declaration. AgentPlane must compile and enforce one deterministic execution contract, compare it with observed effects, escalate monotonically when required, and never use product-language keyword heuristics as lifecycle authority.

## Scope

- In scope: Use one canonical lifecycle while letting the agent semantically choose direct or branch_pr through a structured risk/effect declaration. AgentPlane must compile and enforce one deterministic execution contract, compare it with observed effects, escalate monotonically when required, and never use product-language keyword heuristics as lifecycle authority.
- Out of scope: unrelated refactors not required for "Make execution strategy risk-adaptive and agent-selected".

## Plan

1. Define a versioned structured execution declaration supplied by the semantic agent. It must separate preferred workflow, expected scope/components, declared repository and external effects, requirements/implementation uncertainty, reversibility, and free-form rationale. Do not add task-size tiers or natural-language keyword inference.
2. Compile the declaration through one deterministic policy resolver into a machine-readable and explainable execution contract: resolved workflow, allowed and forbidden effects, writable authority, required approvals, required verification/evidence, and reasons for any override. Make this contract authoritative for planning, execution, commit policy, verification, evaluator, finish, and recovery rather than letting subsystems reinterpret task prose independently.
3. Respect agent-selected direct or branch_pr when compatible. Add a monotonic direct-to-branch_pr escalation path when declared or observed effects require isolation/review. Preserve completed work and return one canonical next action; do not enter effect_in_doubt or require reclaim/reconcile/repair command sequences. Prevent branch_pr-to-direct downgrade after branch-specific state exists.
4. Derive verification requirements from declared effects and strengthen them from objective observed effects. Compare the declaration with actual changed paths/components, manifest or lockfile changes, schema/migration/CI/public-contract artifacts, external/network effects, and verification results. Treat underestimation as a normal escalation, not agent misconduct; never silently weaken already-required evidence.
5. Remove or bypass product-language and filename keyword classification anywhere it authoritatively controls task kind, workflow, permissions, writable scope, approvals, verification, or lifecycle routing. Agent semantic declarations own interpretation; AgentPlane only validates structured declarations and deterministic observable facts.
6. Keep fundamental safety gates non-self-authorizable: destructive Git, publish/deploy, external-system writes, credential/security changes, and irreversible effects require deterministic authority and approval regardless of an agent low-risk claim.
7. Keep the normal UX compact: task -> agent assessment -> execution contract -> work -> verification -> finish. Journals, exchange state, effect resolution, packet replacement, and workflow migration remain internal unless explicit debugging is requested.
8. Add realistic E2E coverage for: localized reversible direct work; broad multi-component branch_pr work; underestimated direct work escalating to branch_pr without losing changes; prohibited external/destructive effects; and misleading product-language words that must not drive routing. Measure control-plane commands, approvals, lifecycle transitions, verification time, work preservation, and recovery-command count.
9. Preserve legacy config/project loading and the single canonical process from task 202608112213-NWJCBW. Legacy profiles may parse but must never participate in risk resolution. Update schemas, explain/readback surfaces, migrations, docs, and tests.
10. Verify targeted contracts plus full relevant lifecycle, routing, commit, evaluator, recovery, and E2E suites. Demonstrate lower ceremony for low-risk direct work while retaining or improving evidence and safety for significant or external-effect work.

## Verify Steps

1. Validate the structured declaration and compiled execution-contract schemas, migrations, explain output, and cross-subsystem consumption. Expected: one versioned contract carries agent assessment, declared effects, deterministic resolution, and observed effects without keyword classification.
2. Run E2E scenarios for localized direct work and broad agent-selected branch_pr work. Expected: each preferred workflow is respected when compatible, targeted evidence is sufficient for low-risk work, and no redundant approval or manual lifecycle command is required.
3. Run an underestimated direct-work E2E. Expected: deterministic observed effects produce one direct-to-branch_pr escalation action, completed changes survive, required evidence strengthens monotonically, and neither effect_in_doubt nor manual reclaim/reconcile/repair is needed.
4. Run external/destructive-effect and misleading-language E2Es. Expected: safety authority cannot be self-granted, and words such as production, release, docs, server, or deployment do not determine task kind or workflow.
5. Run routing, writable-scope, commit-policy, verification, evaluator, finish, recovery, compatibility, formatting, type, lint, and relevant full test shards. Expected: all pass; existing projects load without manual migration; representative before/after traces show fewer commands/approvals/transitions for low-risk direct work without weaker significant-task evidence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-12T01:39:32.590Z — VERIFY — ok

By: TESTER

Note: PASS: agent-selected risk-adaptive routing, deterministic safety enforcement, preserved-work escalation, and realistic user E2Es verified.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:157186805616e646ad0b097885f98a35f72d8e6c6e85dc8a7c8113a2b293f676

Details:

Command: AGENTPLANE_FAST_CHANGED_FILES=".agentplane/tasks/202608112232-3NC7Y4/README.md
.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
.agentplane/tasks/202608112232-3NC7Y4/pr/diffstat.txt
.agentplane/tasks/202608112232-3NC7Y4/pr/github-body.md
.agentplane/tasks/202608112232-3NC7Y4/pr/github-title.txt
.agentplane/tasks/202608112232-3NC7Y4/pr/meta.json
.agentplane/tasks/202608112232-3NC7Y4/pr/review.md
packages/agentplane/src/backends/task-backend/shared/record.ts
packages/agentplane/src/backends/task-backend/shared/types.ts
packages/agentplane/src/blueprints/resolve.test.ts
packages/agentplane/src/blueprints/resolve.ts
packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts
packages/agentplane/src/commands/blueprint/task-input.test.ts
packages/agentplane/src/commands/blueprint/task-input.ts
packages/agentplane/src/commands/shared/route-decision-types.ts
packages/agentplane/src/commands/shared/task-backend.ts
packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts
packages/agentplane/src/commands/task/agent-action-packet.ts
packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts
packages/agentplane/src/commands/task/brief-model.ts
packages/agentplane/src/commands/task/brief-render.ts
packages/agentplane/src/commands/task/create.command.ts
packages/agentplane/src/commands/task/direct-task-finalization.test.ts
packages/agentplane/src/commands/task/direct-task-finalization.ts
packages/agentplane/src/commands/task/direct-task-supervisor-result.ts
packages/agentplane/src/commands/task/direct-task-supervisor.test.ts
packages/agentplane/src/commands/task/direct-task-supervisor.ts
packages/agentplane/src/commands/task/direct-task-verification.test.ts
packages/agentplane/src/commands/task/direct-task-verification.ts
packages/agentplane/src/commands/task/external-agent-planning-authority.ts
packages/agentplane/src/commands/task/new.ts
packages/agentplane/src/commands/task/next-action.command.ts
packages/agentplane/src/commands/task/plan.ts
packages/agentplane/src/commands/task/run-execution-preview.ts
packages/agentplane/src/commands/task/status.command.ts
packages/agentplane/src/commands/task/task-execution-contract-observation.ts
packages/agentplane/src/runner/context/task-context.ts
packages/agentplane/src/runner/types/context.ts
packages/agentplane/src/runner/usecases/agent-work-order-build.ts
packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts
packages/agentplane/src/runtime/task-intake/resolve-materialize.ts
packages/agentplane/src/runtime/task-intake/resolve-normalize.ts
packages/agentplane/src/runtime/task-intake/types.ts
packages/agentplane/src/runtime/task-routing/index.ts
packages/agentplane/src/runtime/task-routing/resolve.test.ts
packages/agentplane/src/runtime/task-routing/resolve.ts
packages/core/schemas/task-readme-frontmatter.schema.json
packages/core/schemas/tasks-export.schema.json
packages/core/src/runner/agent-semantic-result.test.ts
packages/core/src/runner/agent-semantic-result.ts
packages/core/src/tasks/index.ts
packages/core/src/tasks/task-artifact-schema.task.ts
packages/core/src/tasks/task-provider-safe-projection.ts
packages/core/src/tasks/task-readme.ts
packages/core/src/tasks/task-store.ts
packages/core/src/tasks/tasks-export.ts
packages/spec/schemas/task-readme-frontmatter.schema.json
packages/spec/schemas/tasks-export.schema.json
schemas/agent-semantic-result.schema.json
schemas/task-readme-frontmatter.schema.json
schemas/tasks-export.schema.json" bun run ci:local:fast
Result: pass
Evidence: 553 test files passed; 4048 tests passed and 1 skipped; all 12 critical CLI E2E chunks passed; format, schemas, policy routing, build, typecheck, lint, hotspot, docs freshness, and cold-start checks passed on final source head
Scope: full fast release-relevant regression surface for the risk-adaptive execution contract

Command: bunx vitest run packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
Result: pass
Evidence: 6 files passed; 61 tests passed
Scope: localized direct work, broad SDK/schema branch_pr work, misleading-language routing, underestimated direct escalation with preserved commit, non-self-authorizable external effects, writable roots, supervisors, and effect-derived verification

Command: bun scripts/generate/sync-schemas.mjs check && node scripts/checks/check-policy-routing.mjs && git diff --check origin/main...HEAD
Result: pass
Evidence: generated schemas current; policy routing valid; no diff whitespace errors
Scope: persisted execution-contract schema, routing policy, and final branch integrity

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
- old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608112232-3NC7Y4
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-12T01:57:43.942Z — VERIFY — ok

By: TESTER

Note: Implementation 12f447c63 verified after P1 rework.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:bd1f22a2231309ca5e15c9dc2863fbce6ce39d66abef8dc3b7ce38cb4e7e23c0

Details:

Command: bunx vitest run <focused execution-contract matrix>
Result: pass
Evidence: 7 test files passed; 81 tests passed
Scope: execution declarations, deterministic routing, semantic result, work-order authority, direct escalation, task creation compatibility

Command: bun run ci:local:fast
Result: pass
Evidence: 554 test files passed; 4050 tests passed; 1 skipped; all 12 critical CLI shards passed
Scope: formatting, schemas, templates, policy routing, release parity, build, typecheck, lint, cold-start, unit and critical CLI regressions

Command: focused P1 regression tests
Result: pass
Evidence: explicit empty agent scope is read-only; direct-to-branch escalation persists code.branch_pr; legacy empty scope remains compatible
Scope: writable authority least privilege and monotonic workflow escalation

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
- old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608112232-3NC7Y4
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-12T02:25:34.184Z — VERIFY — ok

By: TESTER

Note: Execution strategy contract and verification-race fix pass full and focused validation for implementation 9ad25f443.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:9ee3faa3bd5d14981488d4b87f532803365f8ee1e3ed6904484a366816a4613a

Details:

Command: bun run ci:local:fast
Result: pass
Evidence: 554 test files passed; 4051 tests passed and 1 skipped; all 12 critical CLI shards passed; implementation commit 9ad25f443.
Scope: full fast local CI including formatting, schemas, build, types, lint, unit tests, and critical CLI E2E.

Command: bun x vitest run <12 changed execution-contract test modules>
Result: pass
Evidence: 12 test files passed; 120 tests passed.
Scope: agent-selected direct and branch_pr routing, structural effects, monotonic escalation, scope authority, verification, supervisors, work orders, and legacy compatibility.

Command: bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts
Result: pass
Evidence: 2 test files passed; 19 tests passed; concurrent verification test passed after one exact task reread.
Scope: fail-closed reconciliation and transient task README read race handling.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
- old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

### 2026-08-12T03:27:04.488Z — VERIFY — ok

By: CODER

Note: Execution authority rework and compatibility paths verified.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:6bd77954e91ea85e33aa123035826a0c63ccaf7454763c72718651b6365bcdd1

Details:

Command: bun run ci:local:fast
Result: pass
Evidence: 555 test files passed; 4058 tests passed, 1 skipped; all 12 critical CLI chunks passed
Scope: execution contract schemas, authority enforcement, observed effects, verification ordering, compatibility, full fast CI

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
- old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

### 2026-08-12T04:10:25.439Z — VERIFY — ok

By: CODER

Note: Verified implementation commit 1d7a807eb: complete local CI and realistic user-flow E2Es passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:0723942a2ae160e6a9238e1c1210b716baa0024a4dd92f0aea4b3686c79c2f65

Details:

Command: bun run ci:local:fast
Result: pass
Evidence: Format, schemas, templates, routing, release parity, build, cold-start, documentation freshness, hotspot, project routing and lint passed; 555 test files passed with 4059 tests passed and 1 skipped; all 12 critical CLI shards passed.
Scope: Full fast repository CI for implementation commit 1d7a807eb.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts packages/agentplane/src/backends/task-backend/shared/record.test.ts packages/core/src/tasks/task-artifact-schema.test.ts
Result: pass
Evidence: Focused risk-adaptive contract and E2E suite passed, including localized direct, broad branch_pr, underestimated escalation with preserved work, forbidden destructive effects, approved network reads, and legacy-contract completion without a migration command.
Scope: Agent-selected strategy, deterministic authority, observed effects, escalation, compatibility and WorkOrder projection.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
- old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

### 2026-08-12T04:20:23.781Z — VERIFY — ok

By: CODER

Note: Verified implementation commit 9ef72a552: complete local CI and explicit agent-selected branch_pr E2E evidence passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:9c15adea0ccffb1fc8b683f79a7b67851b69bcb4c94315fcde3dffc5eb867f8f

Details:

Command: bun run ci:local:fast
Result: pass
Evidence: Format, schemas, templates, routing, release parity, build, cold-start, documentation freshness, hotspot, project routing and lint passed; 555 test files passed with 4059 tests passed and 1 skipped; all 12 critical CLI shards passed.
Scope: Full fast repository CI for implementation commit 9ef72a552 after evaluator rework.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts --reporter=verbose
Result: pass
Evidence: 8 of 8 realistic CLI cases passed. The broad case explicitly declares preferred_mode branch_pr and resolves through agent_preferred_branch_pr; exact lifecycle transitions are asserted for localized direct, broad branch_pr, misleading language, underestimated escalation, prohibited external effects, network approval and legacy completion.
Scope: Agent-selected strategy, transition measurements, ceremony metrics and compatibility.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
- old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

### 2026-08-12T05:53:28.437Z — VERIFY — ok

By: CODER

Note: Rework verified at 16629e79b: observed scope enforcement, mode-stable verification, and realistic direct/branch lifecycle coverage pass.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dca184be90fa3ce8f32f16e9f1a157c5f2a648692b107ebd2119d23831c66570, input_digest=sha256:b64321c88cb44e2a7cb4ce8de3a4a9427562bd31bf2acc8eebad1640f0012387

Details:

Command: bun run ci:local:fast
Result: pass (555 test files; 4061 passed, 1 skipped; 12/12 critical CLI chunks passed)
Evidence: commit 16629e79b6164c75ebc1c41be2d0f0bf973bbda0; direct and branch lifecycle E2E; writable-scope escalation; verification compatibility units
Scope: risk-adaptive execution contract, observed authority enforcement, deterministic escalation, verification identity, and workflow documentation

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112232-3NC7Y4-make-execution-strategy-risk-adaptive-and-agent/.agentplane/tasks/202608112232-3NC7Y4/blueprint/resolved-snapshot.json
- old_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- current_digest: 9f39851dd9a8fca64e3b84754396f2edbeab4c6b719d641a99e5a5263646c6b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112232-3NC7Y4

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

- Observation: The full local CI and realistic workflow E2Es passed on the committed implementation; execution authority is consistent with configured network approval, observed external-agent paths are recorded, and legacy contracts normalize automatically.
  Impact: Agent-selected routing remains flexible while AgentPlane deterministically enforces authority, escalation, verification and compatibility without keyword classification or redundant lifecycle recovery.
  Resolution: Accept the implementation candidate for independent evaluator review and hosted integration.

- Observation: The explicit agent-selected branch_pr scenario and exact transition counts now pass alongside the complete local CI.
  Impact: The test evidence distinguishes agent preference from deterministic safety escalation and quantifies lifecycle ceremony for representative product-development workflows.
  Resolution: Accept this exact implementation identity for independent evaluator review and hosted integration.

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
- Updated at: `2026-08-12T02:00:40.317Z`
