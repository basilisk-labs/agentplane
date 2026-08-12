---
id: "202608112232-3NC7Y4"
title: "Make execution strategy risk-adaptive and agent-selected"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-12T00:34:37.688Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-12T00:34:37.688Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
