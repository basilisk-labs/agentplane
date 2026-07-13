---
id: "202607131641-Z7NE99"
title: "Align master and agent prompts with GPT-5.6 guidance"
result_summary: "pre-merge closure after static-gate rework"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "agents"
  - "code"
  - "prompting"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun run agents:check"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/gpt56-contract.test.ts"
  - "git status --short --untracked-files=all"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-13T16:42:43.054Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-13T17:26:48.302Z"
  updated_by: "CODER"
  note: "Rework passed: Knip baseline 555/555, typecheck, and 24 targeted prompt tests are green after keeping GPT-5.6 diagnostic types internal."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-13T17:27:23.950Z"
  updated_by: "EVALUATOR"
  note: "Hosted static-gate rework is resolved on commit d32febeedcf6."
  evaluated_sha: "d32febeedcf6838f206ca8f97de43348363b2137"
  blueprint_digest: "77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9"
  evidence_refs:
    - ".agentplane/tasks/202607131641-Z7NE99/README.md"
    - ".agentplane/tasks/202607131641-Z7NE99/quality/20260713-172723950-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607131641-Z7NE99/quality/20260713-172723950-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607131641-Z7NE99/quality/20260713-172723950-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607131641-Z7NE99/blueprint/resolved-snapshot.json"
    - "bun run knip:check 555/555; bun run typecheck; targeted prompt tests 24/24"
  findings:
    - "GPT-5.6 diagnostic code and result types are internal implementation details; the public function remains exported and compatible, while Knip baseline, typecheck, and all 24 targeted tests pass."
commit:
  hash: "d32febeedcf6838f206ca8f97de43348363b2137"
  message: "🧭 Z7NE99 agents: satisfy prompt contract static gate"
comments:
  -
    author: "CODER"
    body: "Start: align the canonical master prompt and all bundled agent profiles with GPT-5.6 guidance, preserve compatibility, sync managed mirrors, and run the approved verification contract."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: hosted static-gate rework is resolved and the updated pre-merge closure packet is ready."
events:
  -
    type: "status"
    at: "2026-07-13T16:44:02.261Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align the canonical master prompt and all bundled agent profiles with GPT-5.6 guidance, preserve compatibility, sync managed mirrors, and run the approved verification contract."
  -
    type: "verify"
    at: "2026-07-13T17:16:18.066Z"
    author: "CODER"
    state: "ok"
    note: "Passed task-scoped verification: agents:check; 24 targeted prompt tests; lint:core; typecheck; routing check; ap doctor; diff review. Full fast lane passed 2162 tests and hit one reproducible pre-existing release-packaging npm ci timeout under local Node 26/npm 11; hosted CI is the authoritative follow-up."
  -
    type: "status"
    at: "2026-07-13T17:16:46.379Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-13T17:24:48.146Z"
    author: "EVALUATOR"
    state: "needs_rework"
    note: "Hosted verify-static failed: export Gpt56PromptContractDiagnosticCode through the public prompt-modules entrypoint, then rerun knip and hosted checks."
  -
    type: "verify"
    at: "2026-07-13T17:26:48.302Z"
    author: "CODER"
    state: "ok"
    note: "Rework passed: Knip baseline 555/555, typecheck, and 24 targeted prompt tests are green after keeping GPT-5.6 diagnostic types internal."
  -
    type: "status"
    at: "2026-07-13T17:27:45.020Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: hosted static-gate rework is resolved and the updated pre-merge closure packet is ready."
doc_version: 3
doc_updated_at: "2026-07-13T17:27:45.020Z"
doc_updated_by: "CODER"
description: "Update canonical master and agent prompts on main using official GPT-5.6 guidance; preserve diagnostic compatibility, sync managed mirrors, document the contract, validate changes, and do not touch agentplane-loops."
sections:
  Summary: |-
    Align master and agent prompts with GPT-5.6 guidance

    Update canonical master and agent prompts on main using official GPT-5.6 guidance; preserve diagnostic compatibility, sync managed mirrors, document the contract, validate changes, and do not touch agentplane-loops.
  Scope: "In scope: packages/agentplane/assets/AGENTS.md; all packages/agentplane/assets/agents/*.json profiles; synchronized .agentplane/agents/*.json mirrors; GPT-5.6 prompt-contract diagnostics and targeted tests under packages/agentplane/src/runtime/prompt-modules; docs/developer/modular-prompt-assembly.mdx; task and PR artifacts. Out of scope: agentplane-loops, recipe-owned prompts, provider/model defaults, API migration, release/version changes, and unrelated policy modules."
  Plan: "1. Audit the canonical master prompt and every bundled agent profile against the official GPT-5.6 guidance. 2. Centralize shared autonomy, tool-routing, response-length, evidence, and completion rules in the master prompt while preserving enforcement-backed invariants. 3. Make minimal role-specific edits across all agent profiles, removing duplicated gateway scaffolding and retaining product-specific constraints. 4. Replace the GPT-5.5-labelled diagnostic contract with a GPT-5.6 contract while preserving the old exported function as a compatibility alias. 5. Synchronize managed agent mirrors and update the canonical developer contract documentation. 6. Run all declared checks, record evidence, review the diff, publish the task PR, and integrate it into main through AgentPlane."
  Verify Steps: |-
    1. Run bun run agents:check. Expected: canonical and managed agent profiles are identical.
    2. Run bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/gpt56-contract.test.ts. Expected: prompt source parity, GPT-5.6 outcome contract, compatibility alias, and bundled profile diagnostics pass.
    3. Run bun run lint:core. Expected: no lint errors in changed source or tests.
    4. Run bun run typecheck. Expected: TypeScript build succeeds.
    5. Run node .agentplane/policy/check-routing.mjs. Expected: gateway and policy budgets, markers, imports, and routes pass.
    6. Run ap doctor. Expected: no task-introduced prompt, policy, or managed-tree errors.
    7. Review the complete diff against the official GPT-5.6 guidance. Expected: every bundled profile was audited; shared rules occur once in the gateway; role-specific requirements and public compatibility are preserved.
    8. Run git status --short --untracked-files=all. Expected: only task-owned tracked artifacts remain before commit and no unreviewed untracked files remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-13T17:16:18.066Z — VERIFY — ok

    By: CODER

    Note: Passed task-scoped verification: agents:check; 24 targeted prompt tests; lint:core; typecheck; routing check; ap doctor; diff review. Full fast lane passed 2162 tests and hit one reproducible pre-existing release-packaging npm ci timeout under local Node 26/npm 11; hosted CI is the authoritative follow-up.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T16:44:02.261Z, excerpt_hash=sha256:b2208c0bfb359129f45beb907e9278b96846007d89f5ec54df0afe58319f36b5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131641-Z7NE99-align-master-and-agent-prompts-with-gpt-5-6-guid/.agentplane/tasks/202607131641-Z7NE99/blueprint/resolved-snapshot.json
    - old_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
    - current_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607131641-Z7NE99

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607131641-Z7NE99 --branch task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid
    - diagnostic_command: agentplane pr check 202607131641-Z7NE99
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-13T17:24:48.146Z — VERIFY — needs_rework

    By: EVALUATOR

    Note: Hosted verify-static failed: export Gpt56PromptContractDiagnosticCode through the public prompt-modules entrypoint, then rerun knip and hosted checks.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T17:16:46.379Z, excerpt_hash=sha256:b2208c0bfb359129f45beb907e9278b96846007d89f5ec54df0afe58319f36b5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131641-Z7NE99-align-master-and-agent-prompts-with-gpt-5-6-guid/.agentplane/tasks/202607131641-Z7NE99/blueprint/resolved-snapshot.json
    - old_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
    - current_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607131641-Z7NE99

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607131641-Z7NE99 --branch task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid
    - diagnostic_command: agentplane pr check 202607131641-Z7NE99
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-13T17:26:48.302Z — VERIFY — ok

    By: CODER

    Note: Rework passed: Knip baseline 555/555, typecheck, and 24 targeted prompt tests are green after keeping GPT-5.6 diagnostic types internal.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T17:24:52.136Z, excerpt_hash=sha256:b2208c0bfb359129f45beb907e9278b96846007d89f5ec54df0afe58319f36b5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131641-Z7NE99-align-master-and-agent-prompts-with-gpt-5-6-guid/.agentplane/tasks/202607131641-Z7NE99/blueprint/resolved-snapshot.json
    - old_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
    - current_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607131641-Z7NE99

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607131641-Z7NE99 --branch task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid
    - diagnostic_command: agentplane pr check 202607131641-Z7NE99
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task implementation commit and regenerate managed agent mirrors from the prior canonical assets. The compatibility alias prevents an immediate downstream API break during rollback or upgrade."
  Findings: |-
    Initial audit: main matches origin/main at 507940f05; agentplane-loops is excluded. All 15 bundled profiles already expose Goal, Success criteria, Constraints, Stop rules, and Output. The main measured gaps are duplicated gateway constraints across roles, stale GPT-5.5 contract naming, broad brevity wording, and shared routing/autonomy rules spread across role prompts.

    - Observation: GPT-5.6 master and all 15 bundled role prompts are aligned, mirrors are synchronized, and compatibility diagnostics pass.
      Impact: Prompt assembly is leaner and role contracts remain enforcement-compatible.
      Resolution: Proceed through EVALUATOR and hosted GitHub checks; do not alter unrelated release packaging.

    - Observation: Knip reports one new unused exported type in gpt56-contract.ts.
      Impact: PR #4587 cannot auto-merge.
      Resolution: Apply the in-scope public type re-export and repeat verification.

    - Observation: Hosted unused-export failure is removed without widening the public API.
      Impact: PR can rerun full hosted verification.
      Resolution: Commit the in-scope correction, rerun EVALUATOR on the new head, refresh PR artifacts, and restore pre-merge closure.
id_source: "generated"
---
## Summary

Align master and agent prompts with GPT-5.6 guidance

Update canonical master and agent prompts on main using official GPT-5.6 guidance; preserve diagnostic compatibility, sync managed mirrors, document the contract, validate changes, and do not touch agentplane-loops.

## Scope

In scope: packages/agentplane/assets/AGENTS.md; all packages/agentplane/assets/agents/*.json profiles; synchronized .agentplane/agents/*.json mirrors; GPT-5.6 prompt-contract diagnostics and targeted tests under packages/agentplane/src/runtime/prompt-modules; docs/developer/modular-prompt-assembly.mdx; task and PR artifacts. Out of scope: agentplane-loops, recipe-owned prompts, provider/model defaults, API migration, release/version changes, and unrelated policy modules.

## Plan

1. Audit the canonical master prompt and every bundled agent profile against the official GPT-5.6 guidance. 2. Centralize shared autonomy, tool-routing, response-length, evidence, and completion rules in the master prompt while preserving enforcement-backed invariants. 3. Make minimal role-specific edits across all agent profiles, removing duplicated gateway scaffolding and retaining product-specific constraints. 4. Replace the GPT-5.5-labelled diagnostic contract with a GPT-5.6 contract while preserving the old exported function as a compatibility alias. 5. Synchronize managed agent mirrors and update the canonical developer contract documentation. 6. Run all declared checks, record evidence, review the diff, publish the task PR, and integrate it into main through AgentPlane.

## Verify Steps

1. Run bun run agents:check. Expected: canonical and managed agent profiles are identical.
2. Run bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/gpt56-contract.test.ts. Expected: prompt source parity, GPT-5.6 outcome contract, compatibility alias, and bundled profile diagnostics pass.
3. Run bun run lint:core. Expected: no lint errors in changed source or tests.
4. Run bun run typecheck. Expected: TypeScript build succeeds.
5. Run node .agentplane/policy/check-routing.mjs. Expected: gateway and policy budgets, markers, imports, and routes pass.
6. Run ap doctor. Expected: no task-introduced prompt, policy, or managed-tree errors.
7. Review the complete diff against the official GPT-5.6 guidance. Expected: every bundled profile was audited; shared rules occur once in the gateway; role-specific requirements and public compatibility are preserved.
8. Run git status --short --untracked-files=all. Expected: only task-owned tracked artifacts remain before commit and no unreviewed untracked files remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-13T17:16:18.066Z — VERIFY — ok

By: CODER

Note: Passed task-scoped verification: agents:check; 24 targeted prompt tests; lint:core; typecheck; routing check; ap doctor; diff review. Full fast lane passed 2162 tests and hit one reproducible pre-existing release-packaging npm ci timeout under local Node 26/npm 11; hosted CI is the authoritative follow-up.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T16:44:02.261Z, excerpt_hash=sha256:b2208c0bfb359129f45beb907e9278b96846007d89f5ec54df0afe58319f36b5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131641-Z7NE99-align-master-and-agent-prompts-with-gpt-5-6-guid/.agentplane/tasks/202607131641-Z7NE99/blueprint/resolved-snapshot.json
- old_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
- current_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607131641-Z7NE99

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607131641-Z7NE99 --branch task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid
- diagnostic_command: agentplane pr check 202607131641-Z7NE99
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-13T17:24:48.146Z — VERIFY — needs_rework

By: EVALUATOR

Note: Hosted verify-static failed: export Gpt56PromptContractDiagnosticCode through the public prompt-modules entrypoint, then rerun knip and hosted checks.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T17:16:46.379Z, excerpt_hash=sha256:b2208c0bfb359129f45beb907e9278b96846007d89f5ec54df0afe58319f36b5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131641-Z7NE99-align-master-and-agent-prompts-with-gpt-5-6-guid/.agentplane/tasks/202607131641-Z7NE99/blueprint/resolved-snapshot.json
- old_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
- current_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607131641-Z7NE99

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607131641-Z7NE99 --branch task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid
- diagnostic_command: agentplane pr check 202607131641-Z7NE99
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-13T17:26:48.302Z — VERIFY — ok

By: CODER

Note: Rework passed: Knip baseline 555/555, typecheck, and 24 targeted prompt tests are green after keeping GPT-5.6 diagnostic types internal.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T17:24:52.136Z, excerpt_hash=sha256:b2208c0bfb359129f45beb907e9278b96846007d89f5ec54df0afe58319f36b5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131641-Z7NE99-align-master-and-agent-prompts-with-gpt-5-6-guid/.agentplane/tasks/202607131641-Z7NE99/blueprint/resolved-snapshot.json
- old_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
- current_digest: 77b0e89151b16a8e05effcc7664c73a7ddf0acebf22e86f81d62886269be76e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607131641-Z7NE99

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607131641-Z7NE99 --branch task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid
- diagnostic_command: agentplane pr check 202607131641-Z7NE99
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation commit and regenerate managed agent mirrors from the prior canonical assets. The compatibility alias prevents an immediate downstream API break during rollback or upgrade.

## Findings

Initial audit: main matches origin/main at 507940f05; agentplane-loops is excluded. All 15 bundled profiles already expose Goal, Success criteria, Constraints, Stop rules, and Output. The main measured gaps are duplicated gateway constraints across roles, stale GPT-5.5 contract naming, broad brevity wording, and shared routing/autonomy rules spread across role prompts.

- Observation: GPT-5.6 master and all 15 bundled role prompts are aligned, mirrors are synchronized, and compatibility diagnostics pass.
  Impact: Prompt assembly is leaner and role contracts remain enforcement-compatible.
  Resolution: Proceed through EVALUATOR and hosted GitHub checks; do not alter unrelated release packaging.

- Observation: Knip reports one new unused exported type in gpt56-contract.ts.
  Impact: PR #4587 cannot auto-merge.
  Resolution: Apply the in-scope public type re-export and repeat verification.

- Observation: Hosted unused-export failure is removed without widening the public API.
  Impact: PR can rerun full hosted verification.
  Resolution: Commit the in-scope correction, rerun EVALUATOR on the new head, refresh PR artifacts, and restore pre-merge closure.
