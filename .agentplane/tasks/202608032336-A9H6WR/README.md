---
id: "202608032336-A9H6WR"
title: "Preflight the provider binary before release qualification"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "qualification"
  - "v0.7.1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T23:36:26.133Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-03T23:51:53.477Z"
  updated_by: "REVIEWER"
  note: "Codex review found that --provider with an explicit local-only --scenario still invoked the trusted binary preflight; gate the check on the selected provider scenario set."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T23:43:21.495Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "ede5a60b4c83a76c667a68524849c8644202ecc4"
  blueprint_digest: "1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0"
  evidence_refs:
    - ".agentplane/tasks/202608032336-A9H6WR/quality/20260803-234321089-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/20260803-234321089-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/objects/sha256/6a0bde30caffda7fba508e367678837561e20112c68d6847e11513c58a1683b6.md"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/20260803-234321089-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/20260803-234321089-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/20260803-234321089-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608032336-A9H6WR/README.md"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/objects/sha256/e6e57ad2cefb45e821ebe4fcd2e93d9c9beed5a68ccc5398299c0b9fb0ccc14d.patch"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/objects/sha256/b819489e316d0f7115013c9766bb5368572c75a7f65382ab7a7cde5837d5c13e.json"
    - ".agentplane/tasks/202608032336-A9H6WR/verification/20260803234226420-e36d38620f50bf3b.json"
    - ".agentplane/tasks/202608032336-A9H6WR/quality/objects/sha256/e2f0e5310272c06a1a7dac308c9aea342ebe60b4b33760a4c268ecfaee192ea9.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The runner delegates exact-version validation to the existing trusted ChatGPT Codex binary assertion, skips non-provider and dry-run paths, and invokes the check before evidence creation or scenario execution; focused tests and the recorded mismatch probe cover the relevant positive and negative paths."
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
  updated_at: "2026-08-03T23:43:50.108Z"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: exact trusted Codex binary preflight now runs before provider qualification scenarios; non-provider and dry-run paths remain unchanged."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-03T23:37:55.508Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T23:40:33.374Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: exact trusted Codex binary preflight now runs before provider qualification scenarios; non-provider and dry-run paths remain unchanged."
  -
    type: "verify"
    at: "2026-08-03T23:41:19.508Z"
    author: "TESTER"
    state: "ok"
    note: "Local verification passed: qualification contract 20/20; full dry-run selected the expected non-provider matrix; TypeScript, ESLint, and Prettier passed; the bundled Codex 0.146.0-alpha.3.1 matched; a deliberate mismatch exited before scenario output and evidence creation."
  -
    type: "verify"
    at: "2026-08-03T23:42:26.420Z"
    author: "TESTER"
    state: "ok"
    note: "Local verification passed for the provider-runtime fail-fast change; evaluator and hosted checks remain separate downstream gates."
  -
    type: "status"
    at: "2026-08-03T23:43:50.108Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-03T23:51:53.477Z"
    author: "REVIEWER"
    state: "needs_rework"
    note: "Codex review found that --provider with an explicit local-only --scenario still invoked the trusted binary preflight; gate the check on the selected provider scenario set."
doc_version: 3
doc_updated_at: "2026-08-03T23:51:54.822Z"
doc_updated_by: "CODER"
description: "Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures."
sections:
  Summary: |-
    Preflight the provider binary before release qualification

    Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.
  Scope: |-
    - In scope: Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.
    - Out of scope: unrelated refactors not required for "Preflight the provider binary before release qualification".
  Plan: "1. Add an import-safe provider runtime preflight to the v0.7.1 qualification runner that validates the exact requested version against the same trusted ChatGPT.app Codex binary used by RF-04. 2. Execute the preflight before any selected local scenario and skip it for non-provider audit and dry-run selection. 3. Add focused contract tests for provider, non-provider, dry-run, and mismatch propagation; run local static checks and hosted CI before integration."
  Verify Steps: |-
    1. Run the focused release qualification contract tests. Expected: provider execution invokes the exact-binary preflight before scenario work; non-provider and dry-run paths do not invoke it; a version mismatch fails without starting a scenario.
    2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass.
    3. Run a no-provider dry-run and a provider preflight probe with the actual bundled version. Expected: dry-run remains side-effect free; the matching bundled version passes; a deliberately wrong version fails before any qualification scenario log is created.
    4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T23:41:19.508Z — VERIFY — ok

    By: TESTER

    Note: Local verification passed: qualification contract 20/20; full dry-run selected the expected non-provider matrix; TypeScript, ESLint, and Prettier passed; the bundled Codex 0.146.0-alpha.3.1 matched; a deliberate mismatch exited before scenario output and evidence creation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T23:40:33.374Z, excerpt_hash=sha256:db777fef3e6c2c1ad78f686d5452ddccccc20617511be19de3bd369db49d9d60

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032336-A9H6WR-preflight-the-provider-binary-before-release-qua/.agentplane/tasks/202608032336-A9H6WR/blueprint/resolved-snapshot.json
    - old_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
    - current_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032336-A9H6WR

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608032336-A9H6WR
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T23:42:26.420Z — VERIFY — ok

    By: TESTER

    Note: Local verification passed for the provider-runtime fail-fast change; evaluator and hosted checks remain separate downstream gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T23:41:20.440Z, excerpt_hash=sha256:db777fef3e6c2c1ad78f686d5452ddccccc20617511be19de3bd369db49d9d60

    Details:

    Command: bun run e2e:v0.7.1:check
    Result: pass
    Evidence: release qualification contract passed 20/20 and printed the full non-provider dry-run matrix
    Scope: qualification selection and provider preflight contract

    Command: bun run typecheck
    Result: pass
    Evidence: scripts/checks/run-typescript-build.mjs exited 0
    Scope: repository TypeScript contracts

    Command: bunx eslint scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: ESLint exited 0 with no findings
    Scope: touched qualification runner and test

    Command: bunx prettier scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs --check
    Result: pass
    Evidence: all matched files use Prettier code style
    Scope: touched qualification runner and test

    Command: provider binary match and mismatch probes
    Result: pass
    Evidence: bundled 0.146.0-alpha.3.1 accepted; 0.0.0 rejected with CODEX_VERSION_MISMATCH before qualification output or evidence creation
    Scope: exact trusted Codex binary fail-fast boundary

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032336-A9H6WR-preflight-the-provider-binary-before-release-qua/.agentplane/tasks/202608032336-A9H6WR/blueprint/resolved-snapshot.json
    - old_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
    - current_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032336-A9H6WR

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608032336-A9H6WR
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T23:51:53.477Z — VERIFY — needs_rework

    By: REVIEWER

    Note: Codex review found that --provider with an explicit local-only --scenario still invoked the trusted binary preflight; gate the check on the selected provider scenario set.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T23:43:50.118Z, excerpt_hash=sha256:db777fef3e6c2c1ad78f686d5452ddccccc20617511be19de3bd369db49d9d60

    Details:

    Command: GitHub Codex review on PR #4767 at commit 785e24f8b8c3fc66a3002e8778522cfaf60b374f
    Result: fail
    Evidence: unresolved review thread PRRT_kwDORCLmJM6WJ2A2 on scripts/qualification/run-v0.7.1-release-qualification.mjs:247
    Scope: audit mode with --provider plus an explicit local-only --scenario

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032336-A9H6WR-preflight-the-provider-binary-before-release-qua/.agentplane/tasks/202608032336-A9H6WR/blueprint/resolved-snapshot.json
    - old_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
    - current_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032336-A9H6WR

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
    - Observation: Provider runtime identity was previously checked only inside RF-04 after local qualification work.
      Impact: A stale version argument could waste the full local qualification duration before failing with zero provider episodes.
      Resolution: The runner now validates the exact trusted ChatGPT Codex binary before any provider-enabled scenario execution while leaving dry-run and non-provider modes side-effect free.
extensions:
  implementation_commit:
    hash: "ede5a60b4c83a76c667a68524849c8644202ecc4"
    message: "🛡️ A9H6WR task: fail fast on provider runtime drift"
  workflow_route_baseline:
    start_head_sha: "11d4d73a0c693b71adde9e54880c411153214b37"
    version: 1
id_source: "generated"
---
## Summary

Preflight the provider binary before release qualification

Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.

## Scope

- In scope: Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.
- Out of scope: unrelated refactors not required for "Preflight the provider binary before release qualification".

## Plan

1. Add an import-safe provider runtime preflight to the v0.7.1 qualification runner that validates the exact requested version against the same trusted ChatGPT.app Codex binary used by RF-04. 2. Execute the preflight before any selected local scenario and skip it for non-provider audit and dry-run selection. 3. Add focused contract tests for provider, non-provider, dry-run, and mismatch propagation; run local static checks and hosted CI before integration.

## Verify Steps

1. Run the focused release qualification contract tests. Expected: provider execution invokes the exact-binary preflight before scenario work; non-provider and dry-run paths do not invoke it; a version mismatch fails without starting a scenario.
2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass.
3. Run a no-provider dry-run and a provider preflight probe with the actual bundled version. Expected: dry-run remains side-effect free; the matching bundled version passes; a deliberately wrong version fails before any qualification scenario log is created.
4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T23:41:19.508Z — VERIFY — ok

By: TESTER

Note: Local verification passed: qualification contract 20/20; full dry-run selected the expected non-provider matrix; TypeScript, ESLint, and Prettier passed; the bundled Codex 0.146.0-alpha.3.1 matched; a deliberate mismatch exited before scenario output and evidence creation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T23:40:33.374Z, excerpt_hash=sha256:db777fef3e6c2c1ad78f686d5452ddccccc20617511be19de3bd369db49d9d60

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032336-A9H6WR-preflight-the-provider-binary-before-release-qua/.agentplane/tasks/202608032336-A9H6WR/blueprint/resolved-snapshot.json
- old_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
- current_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032336-A9H6WR

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608032336-A9H6WR
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T23:42:26.420Z — VERIFY — ok

By: TESTER

Note: Local verification passed for the provider-runtime fail-fast change; evaluator and hosted checks remain separate downstream gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T23:41:20.440Z, excerpt_hash=sha256:db777fef3e6c2c1ad78f686d5452ddccccc20617511be19de3bd369db49d9d60

Details:

Command: bun run e2e:v0.7.1:check
Result: pass
Evidence: release qualification contract passed 20/20 and printed the full non-provider dry-run matrix
Scope: qualification selection and provider preflight contract

Command: bun run typecheck
Result: pass
Evidence: scripts/checks/run-typescript-build.mjs exited 0
Scope: repository TypeScript contracts

Command: bunx eslint scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: ESLint exited 0 with no findings
Scope: touched qualification runner and test

Command: bunx prettier scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs --check
Result: pass
Evidence: all matched files use Prettier code style
Scope: touched qualification runner and test

Command: provider binary match and mismatch probes
Result: pass
Evidence: bundled 0.146.0-alpha.3.1 accepted; 0.0.0 rejected with CODEX_VERSION_MISMATCH before qualification output or evidence creation
Scope: exact trusted Codex binary fail-fast boundary

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032336-A9H6WR-preflight-the-provider-binary-before-release-qua/.agentplane/tasks/202608032336-A9H6WR/blueprint/resolved-snapshot.json
- old_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
- current_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032336-A9H6WR

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608032336-A9H6WR
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T23:51:53.477Z — VERIFY — needs_rework

By: REVIEWER

Note: Codex review found that --provider with an explicit local-only --scenario still invoked the trusted binary preflight; gate the check on the selected provider scenario set.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T23:43:50.118Z, excerpt_hash=sha256:db777fef3e6c2c1ad78f686d5452ddccccc20617511be19de3bd369db49d9d60

Details:

Command: GitHub Codex review on PR #4767 at commit 785e24f8b8c3fc66a3002e8778522cfaf60b374f
Result: fail
Evidence: unresolved review thread PRRT_kwDORCLmJM6WJ2A2 on scripts/qualification/run-v0.7.1-release-qualification.mjs:247
Scope: audit mode with --provider plus an explicit local-only --scenario

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032336-A9H6WR-preflight-the-provider-binary-before-release-qua/.agentplane/tasks/202608032336-A9H6WR/blueprint/resolved-snapshot.json
- old_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
- current_digest: 1dd07951ea30c6888990bf8472eeaee4a3baad38bf43db6b941a926e594684a0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032336-A9H6WR

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

- Observation: Provider runtime identity was previously checked only inside RF-04 after local qualification work.
  Impact: A stale version argument could waste the full local qualification duration before failing with zero provider episodes.
  Resolution: The runner now validates the exact trusted ChatGPT Codex binary before any provider-enabled scenario execution while leaving dry-run and non-provider modes side-effect free.

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
- Updated at: `2026-08-03T23:43:50.108Z`
