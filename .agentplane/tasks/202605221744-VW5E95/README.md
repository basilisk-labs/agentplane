---
id: "202605221744-VW5E95"
title: "Define machine-readable agent work context contract"
result_summary: "Merged via PR #4062."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202605221744-GF25D1"
tags:
  - "cli"
  - "code"
  - "context"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Add contract tests for the agent work context JSON shape and required fields."
  - "Confirm existing task status and verify-show JSON/text behavior remains backward compatible."
  - "Confirm the JSON contract exposes route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:44:36.865Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T02:05:47.680Z"
  updated_by: "CODER"
  note: "Addressed PR review confidence edge cases."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T01:41:22.266Z"
  updated_by: "EVALUATOR"
  note: "Evaluator accepted local contract evidence."
  evaluated_sha: "e18bcb42c9eb74ae75767164da9d3383a826d31b"
  blueprint_digest: "c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad"
  evidence_refs:
    - ".agentplane/tasks/202605221744-VW5E95/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-VW5E95-agent-work-context-contract/.agentplane/tasks/202605221744-VW5E95/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "3bc7b11dbbffc7c507fcbf0c5b62fc40fe8309bd"
  message: "Merge pull request #4062 from basilisk-labs/task/202605221744-VW5E95/agent-work-context-contract"
comments:
  -
    author: "CODER"
    body: "Start: implement stable machine-readable agent work context JSON contract, keeping existing task status and verify-show behavior compatible."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4062 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T01:35:51.089Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement stable machine-readable agent work context JSON contract, keeping existing task status and verify-show behavior compatible."
  -
    type: "verify"
    at: "2026-05-23T01:41:13.208Z"
    author: "CODER"
    state: "ok"
    note: "Implemented versioned agent work context JSON contract for task brief."
  -
    type: "verify"
    at: "2026-05-23T01:41:22.266Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator accepted local contract evidence."
  -
    type: "verify"
    at: "2026-05-23T02:05:47.680Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review confidence edge cases."
  -
    type: "status"
    at: "2026-05-23T02:12:46.070Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4062 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T02:12:46.078Z"
doc_updated_by: "INTEGRATOR"
description: "Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers."
sections:
  Summary: |-
    Define machine-readable agent work context contract

    Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.
  Scope: |-
    - In scope: Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.
    - Out of scope: unrelated refactors not required for "Define machine-readable agent work context contract".
  Plan: "Create a stable machine-readable agent work context contract shared by task brief and future runner/agent integrations. The contract must distinguish local, cached, and remote-derived fields so agents do not overtrust stale context."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Add contract tests for the agent work context JSON shape and required fields.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm the JSON contract exposes route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm existing task status and verify-show JSON/text behavior remains backward compatible.`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T01:41:13.208Z — VERIFY — ok

    By: CODER

    Note: Implemented versioned agent work context JSON contract for task brief.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:35:51.089Z, excerpt_hash=sha256:74e0ed6905337375223216f8ba741ef66fc1ea6f3dad8eb2f4ebc759b004fbd5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-VW5E95-agent-work-context-contract/.agentplane/tasks/202605221744-VW5E95/blueprint/resolved-snapshot.json
    - old_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
    - current_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221744-VW5E95

    ### 2026-05-23T01:41:22.266Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator accepted local contract evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:41:13.235Z, excerpt_hash=sha256:74e0ed6905337375223216f8ba741ef66fc1ea6f3dad8eb2f4ebc759b004fbd5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-VW5E95-agent-work-context-contract/.agentplane/tasks/202605221744-VW5E95/blueprint/resolved-snapshot.json
    - old_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
    - current_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221744-VW5E95

    ### 2026-05-23T02:05:47.680Z — VERIFY — ok

    By: CODER

    Note: Addressed PR review confidence edge cases.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:41:22.294Z, excerpt_hash=sha256:74e0ed6905337375223216f8ba741ef66fc1ea6f3dad8eb2f4ebc759b004fbd5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-VW5E95-agent-work-context-contract/.agentplane/tasks/202605221744-VW5E95/blueprint/resolved-snapshot.json
    - old_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
    - current_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221744-VW5E95

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 1 file, 8 tests passed. Scope: route decision and task brief JSON contract.\nCommand: ap task brief 202605221744-VW5E95 --json plus Node required-field assertion. Result: pass. Evidence: agentplane.agent_work_context@1 branch_pr remote_skipped. Scope: required machine-readable fields route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, stop_rules.\nCommand: ap task status 202605221744-VW5E95 --route and ap task verify-show 202605221744-VW5E95. Result: pass. Evidence: existing text/status outputs remained readable. Scope: backward compatibility.\nCommand: bun run docs:cli:check; bun run lint:core -- changed files; bun run format:check -- changed files; bun run typecheck; bun run vitest:projects:check; bun run framework:dev:bootstrap. Result: pass. Evidence: docs up to date, ESLint clean, Prettier clean, tsc -b clean, vitest routing OK, runtime ready. Scope: local quality gates.\nSkipped: ap context verify-task 202605221744-VW5E95. Reason: command correctly rejected task_kind=code as not a context task. Risk: none for this code task. Approval: task Verify Steps do not require context artifact verification.
      Impact: Agents can consume one stable JSON object with explicit provenance/freshness labels instead of scraping text or overtrusting remote-skipped fields.
      Resolution: Added contract/version, route, policy_modules, evidence_required, source_confidence, and tests while preserving existing task status and verify-show behavior.

    - Observation: Command: reviewed CODER evidence plus task brief JSON smoke and focused test result. Result: pass. Evidence: contract includes versioned kind, route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules; backward-compatible status/verify-show checks passed. Scope: acceptance criteria for VW5E95.
      Impact: Machine consumers get explicit field provenance and freshness labels.
      Resolution: No rework required before PR.

    - Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 1 file, 8 tests passed after remote fallback regression. Scope: task brief source_confidence contract.\nCommand: bun run format:check -- changed brief/test files; bun run lint:core -- changed brief/test/contract files; bun run typecheck; bun run knip:check. Result: pass. Evidence: Prettier, ESLint, tsc, and Knip baseline all clean. Scope: static gates for review fix.\nReview resolution: snapshot confidence now downgrades missing/stale/invalid states; remote confidence now requires observed provider evidence instead of only --remote intent.
      Impact: Agent consumers no longer over-trust stale snapshots or remote-requested-but-local-fallback route data.
      Resolution: Review comments addressed without adding public API exports.
id_source: "generated"
---
## Summary

Define machine-readable agent work context contract

Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.

## Scope

- In scope: Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.
- Out of scope: unrelated refactors not required for "Define machine-readable agent work context contract".

## Plan

Create a stable machine-readable agent work context contract shared by task brief and future runner/agent integrations. The contract must distinguish local, cached, and remote-derived fields so agents do not overtrust stale context.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Add contract tests for the agent work context JSON shape and required fields.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm the JSON contract exposes route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm existing task status and verify-show JSON/text behavior remains backward compatible.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T01:41:13.208Z — VERIFY — ok

By: CODER

Note: Implemented versioned agent work context JSON contract for task brief.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:35:51.089Z, excerpt_hash=sha256:74e0ed6905337375223216f8ba741ef66fc1ea6f3dad8eb2f4ebc759b004fbd5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-VW5E95-agent-work-context-contract/.agentplane/tasks/202605221744-VW5E95/blueprint/resolved-snapshot.json
- old_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
- current_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221744-VW5E95

### 2026-05-23T01:41:22.266Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator accepted local contract evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:41:13.235Z, excerpt_hash=sha256:74e0ed6905337375223216f8ba741ef66fc1ea6f3dad8eb2f4ebc759b004fbd5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-VW5E95-agent-work-context-contract/.agentplane/tasks/202605221744-VW5E95/blueprint/resolved-snapshot.json
- old_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
- current_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221744-VW5E95

### 2026-05-23T02:05:47.680Z — VERIFY — ok

By: CODER

Note: Addressed PR review confidence edge cases.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:41:22.294Z, excerpt_hash=sha256:74e0ed6905337375223216f8ba741ef66fc1ea6f3dad8eb2f4ebc759b004fbd5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-VW5E95-agent-work-context-contract/.agentplane/tasks/202605221744-VW5E95/blueprint/resolved-snapshot.json
- old_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
- current_digest: c177cec9e03e7fb8e13b49311d39ee803e34cf7fa313f97938d3a64a573e4fad
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221744-VW5E95

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 1 file, 8 tests passed. Scope: route decision and task brief JSON contract.\nCommand: ap task brief 202605221744-VW5E95 --json plus Node required-field assertion. Result: pass. Evidence: agentplane.agent_work_context@1 branch_pr remote_skipped. Scope: required machine-readable fields route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, stop_rules.\nCommand: ap task status 202605221744-VW5E95 --route and ap task verify-show 202605221744-VW5E95. Result: pass. Evidence: existing text/status outputs remained readable. Scope: backward compatibility.\nCommand: bun run docs:cli:check; bun run lint:core -- changed files; bun run format:check -- changed files; bun run typecheck; bun run vitest:projects:check; bun run framework:dev:bootstrap. Result: pass. Evidence: docs up to date, ESLint clean, Prettier clean, tsc -b clean, vitest routing OK, runtime ready. Scope: local quality gates.\nSkipped: ap context verify-task 202605221744-VW5E95. Reason: command correctly rejected task_kind=code as not a context task. Risk: none for this code task. Approval: task Verify Steps do not require context artifact verification.
  Impact: Agents can consume one stable JSON object with explicit provenance/freshness labels instead of scraping text or overtrusting remote-skipped fields.
  Resolution: Added contract/version, route, policy_modules, evidence_required, source_confidence, and tests while preserving existing task status and verify-show behavior.

- Observation: Command: reviewed CODER evidence plus task brief JSON smoke and focused test result. Result: pass. Evidence: contract includes versioned kind, route, next_action, verify_steps, blueprint, policy_modules, evidence_required, source_confidence, and stop_rules; backward-compatible status/verify-show checks passed. Scope: acceptance criteria for VW5E95.
  Impact: Machine consumers get explicit field provenance and freshness labels.
  Resolution: No rework required before PR.

- Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 1 file, 8 tests passed after remote fallback regression. Scope: task brief source_confidence contract.\nCommand: bun run format:check -- changed brief/test files; bun run lint:core -- changed brief/test/contract files; bun run typecheck; bun run knip:check. Result: pass. Evidence: Prettier, ESLint, tsc, and Knip baseline all clean. Scope: static gates for review fix.\nReview resolution: snapshot confidence now downgrades missing/stale/invalid states; remote confidence now requires observed provider evidence instead of only --remote intent.
  Impact: Agent consumers no longer over-trust stale snapshots or remote-requested-but-local-fallback route data.
  Resolution: Review comments addressed without adding public API exports.
