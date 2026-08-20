---
id: "202608202133-1C8P0N"
title: "Add AP-TE Lite to framework agent instructions"
result_summary: "pre-merge closure"
status: "DONE"
priority: "normal"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run agents:check"
  - "bun run assets:builtin:check"
  - "bun run format:changed"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T21:34:44.238Z"
  updated_by: "USER"
  note: "User approved implementation and the generated asset scope in this conversation."
verification:
  state: "ok"
  updated_at: "2026-08-20T22:10:08.324Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-20T22:13:25.435Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 4 typed finding(s)."
  evaluated_sha: "1fb801edebfc73e67c61045dffa97c1988308f09"
  blueprint_digest: "863ce2a3407976990cb57312ff9ed13cdf7db6530b6c30a7f89783df781c8d06"
  evidence_refs:
    - ".agentplane/tasks/202608202133-1C8P0N/quality/20260820-221121625-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/20260820-221121625-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/objects/sha256/32e490d251c57c7d74bd8de39be79a5787e6891e6dd4dfb4235bebab9012e843.md"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/20260820-221121625-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/20260820-221121625-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/20260820-221121625-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608202133-1C8P0N/README.md"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/objects/sha256/6e8522b299e43580980f85276416a391ba862b9def989aca46089592b50e4ef3.patch"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/objects/sha256/b99fdbfa29f8565685aabd76cb59eeb784e6557efd0690524a362eb0596c18cb.json"
    - ".agentplane/tasks/202608202133-1C8P0N/verification/20260820221008324-c2f19ada78788177.json"
    - ".agentplane/tasks/202608202133-1C8P0N/quality/objects/sha256/8c0eecd5370dcdf48ded00e92bbada5bbad8d3a8ed6eca80343bc2858cb4254d.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The shared prompt contract contains the six approved AP-TE Lite rules and keeps role-specific prompts subordinate to the shared contract."
    - "The generated asset update is deterministic and the recorded agents, asset freshness, formatting, and policy routing checks all passed."
    - "Bundled role prompts were audited without a historical rewrite, which matches the explicit task boundary."
    - "Residual risk: Existing role prompt prose may not be fully normalized until a separately approved historical rewrite or linter is introduced."
token_usage:
  agent_runs: 4
  input_tokens: null
  journal_digest: "sha256:eb490356f874554d49919e317f508fcc1a82ad140642d9d7dc7bd979f602c0d9"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-20T22:15:57.621Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/assets/AGENTS.md"
      - "packages/agentplane/assets/agents"
      - "packages/agentplane/src/shared/builtin-assets.generated.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The generated built-in table is required to publish the changed framework prompt asset."
      - "The role-profile directory is included for audit and only direct conflicts may be edited."
      - "The user approved a separate branch and the generated source-code effect."
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/assets/AGENTS.md"
      - "packages/agentplane/assets/agents"
      - "packages/agentplane/src/shared/builtin-assets.generated.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/assets/AGENTS.md"
      - "packages/agentplane/src/shared/builtin-assets.generated.ts"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/assets/AGENTS.md"
          - "packages/agentplane/assets/agents"
          - "packages/agentplane/src/shared/builtin-assets.generated.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:978d324413c65b7028dea9f7fe407748be27cd9d6cbd8d19761101d80e053fad"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/assets/AGENTS.md"
          - "packages/agentplane/src/shared/builtin-assets.generated.ts"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
        - "hosted_integration"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "0f07d8f1386d87d667054fd5da3cde792df8e7e7"
  message: "🚧 1C8P0N task: record external evaluator result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed after AP-TE Lite, generated asset, role prompt audit, and required checks passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-20T21:35:27.222Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T21:35:39.851Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T21:40:54.481Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed after AP-TE Lite, generated asset, role prompt audit, and required checks passed."
    commit: "1b3a79d06829e04bc250e824c42aedad541711f8"
  -
    type: "verify"
    at: "2026-08-20T22:10:08.324Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-08-20T22:15:57.621Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "0f07d8f1386d87d667054fd5da3cde792df8e7e7"
doc_version: 3
doc_updated_at: "2026-08-20T22:15:57.643Z"
doc_updated_by: "CODER"
description: "Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite."
sections:
  Summary: |-
    Add AP-TE Lite to framework agent instructions

    Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.
  Scope: |-
    - In scope: Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.
    - Out of scope: unrelated refactors not required for "Add AP-TE Lite to framework agent instructions".
  Plan: "Prepared the replacement code-task plan for AP-TE Lite and its generated built-in projection."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run assets:builtin:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-20T22:10:08.324Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2b99ccd220a66f6c9eb1fd74ad5a8747233967811cb781a00e9c4da2ff560f19, input_digest=sha256:e69224562a04ebb96361f4b7377b746634f5ba7b19a94c5e1904156de1a569cd

    Details:

    Check: affected_unit_integration
    Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202133-1C8P0N Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202133-1C8P0N Verification Contract check critical_paths

    Check: docs_contract
    Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202133-1C8P0N Verification Contract check docs_contract

    Check: hosted_integration
    Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202133-1C8P0N Verification Contract check hosted_integration

    Check: task_outcome
    Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608202133-1C8P0N Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202133-1C8P0N-add-ap-te-lite-to-framework-agent-instructions/.agentplane/tasks/202608202133-1C8P0N/blueprint/resolved-snapshot.json
    - old_digest: 863ce2a3407976990cb57312ff9ed13cdf7db6530b6c30a7f89783df781c8d06
    - current_digest: 863ce2a3407976990cb57312ff9ed13cdf7db6530b6c30a7f89783df781c8d06
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608202133-1C8P0N

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608202133-1C8P0N
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
  implementation_commit:
    hash: "1fb801edebfc73e67c61045dffa97c1988308f09"
    message: "🚧 1C8P0N task: add AP-TE Lite to agent instructions"
  workflow_route_baseline:
    start_head_sha: "60be0145753e9e2aecf31f4bbd8471895db13395"
    version: 1
id_source: "generated"
---
## Summary

Add AP-TE Lite to framework agent instructions

Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.

## Scope

- In scope: Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.
- Out of scope: unrelated refactors not required for "Add AP-TE Lite to framework agent instructions".

## Plan

Prepared the replacement code-task plan for AP-TE Lite and its generated built-in projection.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run assets:builtin:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-20T22:10:08.324Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2b99ccd220a66f6c9eb1fd74ad5a8747233967811cb781a00e9c4da2ff560f19, input_digest=sha256:e69224562a04ebb96361f4b7377b746634f5ba7b19a94c5e1904156de1a569cd

Details:

Check: affected_unit_integration
Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202133-1C8P0N Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202133-1C8P0N Verification Contract check critical_paths

Check: docs_contract
Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202133-1C8P0N Verification Contract check docs_contract

Check: hosted_integration
Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202133-1C8P0N Verification Contract check hosted_integration

Check: task_outcome
Command: bun run agents:check && bun run assets:builtin:check && bun run format:changed && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608202133-1C8P0N/supervision/declared-checks.json#checks
Scope: branch_pr task 202608202133-1C8P0N Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608202133-1C8P0N-add-ap-te-lite-to-framework-agent-instructions/.agentplane/tasks/202608202133-1C8P0N/blueprint/resolved-snapshot.json
- old_digest: 863ce2a3407976990cb57312ff9ed13cdf7db6530b6c30a7f89783df781c8d06
- current_digest: 863ce2a3407976990cb57312ff9ed13cdf7db6530b6c30a7f89783df781c8d06
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608202133-1C8P0N

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608202133-1C8P0N
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

## Token Usage

- State: `unavailable`
- Completeness: `0/4` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:eb490356f874554d49919e317f508fcc1a82ad140642d9d7dc7bd979f602c0d9`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-20T22:15:57.621Z`
