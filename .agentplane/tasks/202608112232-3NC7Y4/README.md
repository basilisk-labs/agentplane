---
id: "202608112232-3NC7Y4"
title: "Make execution strategy risk-adaptive and agent-selected"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-08-12T01:39:32.590Z"
  updated_by: "TESTER"
  note: "PASS: agent-selected risk-adaptive routing, deterministic safety enforcement, preserved-work escalation, and realistic user E2Es verified."
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
  hash: "40afabe86933efaad8d6bca48903ea38bcc378e2"
  message: "✨ 3NC7Y4 task: add risk-adaptive execution contract"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation complete: structured agent execution declaration, deterministic contract compilation, effect-based routing, monotonic escalation with preserved work, and realistic direct/branch_pr E2Es. Full local fast CI passed."
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
doc_version: 3
doc_updated_at: "2026-08-12T01:39:33.722Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
