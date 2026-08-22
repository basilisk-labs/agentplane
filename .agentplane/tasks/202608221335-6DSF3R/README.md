---
id: "202608221335-6DSF3R"
title: "Fix idempotent null-WorkItem external result acceptance"
result_summary: "pre-merge closure"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "task-centric"
  - "core"
  - "regression"
  - "idempotency"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T13:39:45.672Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "Approved by user for autonomous v0.7.8 regression-only release work; host_user_decision=sha256:f5d7652cf2a0f8883d17659b4275d137bc7057b8348898cd8b5677ebdd5114ed"
verification:
  state: "ok"
  updated_at: "2026-08-22T14:26:05.994Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-22T14:25:28.334Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 7 typed finding(s)."
  evaluated_sha: "347cd5e8ef6ad810f7dfac0885d91b62b0f05498"
  blueprint_digest: "34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2"
  evidence_refs:
    - ".agentplane/tasks/202608221335-6DSF3R/quality/20260822-142452734-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/20260822-142452734-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/objects/sha256/85268e1eb2125ddc0909cd9915f839b2bceb37f82a44083f0821d54ee06cbf91.md"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/20260822-142452734-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/20260822-142452734-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/20260822-142452734-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608221335-6DSF3R/README.md"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/objects/sha256/89d957a193d6bba5e8f54cf3e48ef54f45c44f6e867be64372e5445f5fb491b0.patch"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/objects/sha256/2d8bba6f9bf17e4e5a846750afeaeab11da575bcf6f18fe08d4eef3464cc378b.json"
    - ".agentplane/tasks/202608221335-6DSF3R/verification/20260822142208791-3af246a4cca91454.json"
    - ".agentplane/tasks/202608221335-6DSF3R/quality/objects/sha256/36719933ca26a362c0c41082c757b3f09276b883be1f026518f942d15578c2a3.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The production guard executes only for null-ID work orders and rejects claimedIds.length greater than one with E_VALIDATION."
    - "The existing single-claim and zero-claim scheduler paths remain unchanged."
    - "The regression fixture contains two CLAIMED WorkItems plus an unrelated READY WorkItem, so the pre-fix wrong-target path is exercised."
    - "The test asserts no revision change and preserves both claims and the ready WorkItem after rejection."
    - "Focused test, ESLint, and Prettier evidence passed; no context subsystem path changed."
    - "Residual risk: The updated PR head requires exact-SHA hosted checks and resolution of the now-addressed review thread before integration."
    - "Residual risk: The separate context.maximum_assimilation compatibility E2E remains mandatory before the v0.7.8 release."
token_usage:
  agent_runs: 5
  input_tokens: null
  journal_digest: "sha256:f6bc2ada84e283d841afac1ca0142356f25ad8f483b568afe3a813463499ce9a"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-22T14:25:52.418Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A local selection and idempotency repair is sufficient and does not change context architecture."
      - "The failure is reproduced by accepted external results for a null-ID task-centric WorkOrder."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  observed:
    authority_violations:
      - "verification:verification-record:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
        id: "verification-record"
        result: "fail"
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
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:82dcb6d6787c1347fcf408abe1c2f01f44e3041541f14ab3b8f8f76bb2661260"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:verification-record"
commit:
  hash: "fdbbd71ca81eb202bf488681d480b78ac272560c"
  message: "🚧 6DSF3R task: record external evaluator result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 497e1f510d9b. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 347cd5e8ef6a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-22T13:40:01.387Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T13:42:38.272Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 497e1f510d9b. CLI accepted one state-bound external-agent semantic result."
    commit: "497e1f510d9bfee1cb55cfc21002f6442af26690"
  -
    type: "verify"
    at: "2026-08-22T13:42:38.704Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-22T13:44:40.779Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "14be5496bbc51ca4d291b5f2702865934d7ae2ca"
  -
    type: "verify"
    at: "2026-08-22T14:19:04.291Z"
    author: "REVIEWER"
    state: "needs_rework"
    note: "Hosted P1 review found ambiguous null-ID routing when multiple WorkItems are CLAIMED; fail closed before scheduler fallback and add focused coverage."
  -
    type: "status"
    at: "2026-08-22T14:22:08.360Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 347cd5e8ef6a. CLI accepted one state-bound external-agent semantic result."
    commit: "347cd5e8ef6ad810f7dfac0885d91b62b0f05498"
  -
    type: "verify"
    at: "2026-08-22T14:22:08.791Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-22T14:25:52.418Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "fdbbd71ca81eb202bf488681d480b78ac272560c"
  -
    type: "verify"
    at: "2026-08-22T14:26:05.994Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-08-22T14:26:10.177Z"
doc_updated_by: "CODER"
description: "Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs."
sections:
  Summary: |-
    Fix idempotent null-WorkItem external result acceptance

    Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs.
  Scope: |-
    - In scope: Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs.
    - Out of scope: unrelated refactors not required for "Fix idempotent null-WorkItem external result acceptance".
  Plan: "Fix one proven task-centric Core regression: a null-ID external work order must resolve the already claimed WorkItem, and an exact replay must use its persisted idempotency receipt before scheduler selection. Add focused unit coverage; do not touch context code."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix idempotent null-WorkItem external result acceptance". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix idempotent null-WorkItem external result acceptance". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-22T13:42:38.704Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:6ba9c9a8fab95e4bce56a7d00e151eaa218bf5422c0cde365563e71ea9ed1dba

    Details:

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check critical_paths

    Check: hosted_integration
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check hosted_integration

    Check: task_outcome
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
    - old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

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

    ### 2026-08-22T14:19:04.291Z — VERIFY — needs_rework

    By: REVIEWER

    Note: Hosted P1 review found ambiguous null-ID routing when multiple WorkItems are CLAIMED; fail closed before scheduler fallback and add focused coverage.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:31b248aa6b73a61861cb1c688ecacc34ad00fd2c2dcf214313024245667ac5ea

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
    - old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

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

    ### 2026-08-22T14:22:08.791Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:b2e7f6fff4ec18da8633f8aee3a67323bdfa4df84645258878e9f7bc7cca21b8

    Details:

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check critical_paths

    Check: hosted_integration
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check hosted_integration

    Check: task_outcome
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
    - old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608221335-6DSF3R
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-22T14:26:05.994Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:b2e7f6fff4ec18da8633f8aee3a67323bdfa4df84645258878e9f7bc7cca21b8

    Details:

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check critical_paths

    Check: hosted_integration
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check hosted_integration

    Check: task_outcome
    Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221335-6DSF3R Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
    - old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

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
    - Observation: Multiple CLAIMED items currently fall through to WorkItemScheduler, which can select an unrelated READY item.
      Impact: A null-ID external result can be recorded against the wrong WorkItem.
      Resolution: Reject ambiguous claimed targets and prove scheduler fallback is used only when no WorkItem is claimed.
      Promotion: incident-candidate
      Fixability: repo-fixable
      IncidentScope: task-centric external result routing
      IncidentTags: task-centric, idempotency
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:f5d7652cf2a0f8883d17659b4275d137bc7057b8348898cd8b5677ebdd5114ed"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:e58c50d275979bf905df4e8ba5c5f2b42cc615d8bc3efe9e64a96602edf84955"
    grant_id: "be0cced3-e054-4512-b449-3157ea09fa6f"
    issued_at: "2026-08-22T13:39:45.672Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:36099622e837e9d0493e0f0edec24b50918eb5359df043c07606cdd3629c634c"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608221335-6DSF3R"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T13:39:45.672Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:2b566e48e9e6c5b64c188c70b923c0fef03c5c7b2fd6ff73e5d4f2dcc28238ec"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-22T13:38:57.201Z"
      digest: "sha256:2b566e48e9e6c5b64c188c70b923c0fef03c5c7b2fd6ff73e5d4f2dcc28238ec"
      proposal:
        assumptions:
          - "The backend runtime mutation receipt retains the original WorkItem id and transition outcome for the external-result idempotency key."
          - "When no explicit WorkItem id is issued, exactly one claimed WorkItem is the valid in-flight semantic target; ambiguity must still fail closed."
        planning_baseline:
          captured_at: "2026-08-22T13:37:18.549Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:ac92b6200f7d9d83f9bb64eef5e8d7f8f7d006f324943c004ff0f201ae1bd9fb"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221335-6DSF3R/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221335-6DSF3R"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
              id: "check-null-workitem-core-regression"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-null-workitem-core-regression"
              description: "Null-ID first acceptance and exact replay are safe, idempotent, and do not affect context code."
              id: "criterion-null-workitem-core-regression"
              required: true
          evidence_fingerprint: "sha256:cbea4bbd5c1a615e741f2e17ff5580c27b0d2f5bf66a93117af2027fc9137d81"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-null-workitem-replay"
                  description: "A work order with work_item_id=null completes the single claimed approved WorkItem and records its validation/output state."
                  id: "criterion-null-workitem-first-acceptance"
                  required: true
                -
                  check_ids:
                    - "check-null-workitem-replay"
                  description: "Replaying the same work order returns the already-recorded WorkItem outcome through the mutation receipt and does not select a dependent WorkItem or throw missing WorkItem."
                  id: "criterion-null-workitem-idempotent-replay"
                  required: true
                -
                  check_ids:
                    - "check-null-workitem-replay"
                  description: "No context subsystem path or contract changes."
                  id: "criterion-no-context-change"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-runtime.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                symbol_hints:
                  - "recordTaskCentricExternalResult"
                  - "runtimeFrom"
                  - "mutation_receipts"
                  - "WorkItemScheduler"
              depends_on: []
              expected_outputs:
                - "null-workitem-idempotency-regression-fix"
                - "focused-regression-test"
              id: "fix-null-workitem-external-result-replay"
              objective: "Make null-ID external-result acceptance resolve the already claimed WorkItem and make an exact replay return the persisted WorkItem outcome before scheduler selection, without weakening stale-result or validation gates."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                    id: "check-null-workitem-replay"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-null-workitem-replay"
                    description: "A work order with work_item_id=null completes the single claimed approved WorkItem and records its validation/output state."
                    id: "criterion-null-workitem-first-acceptance"
                    required: true
                  -
                    check_ids:
                      - "check-null-workitem-replay"
                    description: "Replaying the same work order returns the already-recorded WorkItem outcome through the mutation receipt and does not select a dependent WorkItem or throw missing WorkItem."
                    id: "criterion-null-workitem-idempotent-replay"
                    required: true
                  -
                    check_ids:
                      - "check-null-workitem-replay"
                    description: "No context subsystem path or contract changes."
                    id: "criterion-no-context-change"
                    required: true
                evidence_fingerprint: "sha256:45873cf84f6493b06c077abe3f9020f1e10734fa6900b5305c43e42d747361b3"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221335-6DSF3R"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608221335-6DSF3R"
            - "git:497e1f510d9bfee1cb55cfc21002f6442af26690"
          check_id: "check-null-workitem-core-regression"
          command_identity: "bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-22T13:42:38.704Z"
          repository_snapshot_digest: "sha256:a127ad80d571e1832da3bdd57b9016e8674a266dc187723fc4223362b6f67874"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608221335-6DSF3R"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-22T13:35:52.409Z"
      constraints: []
      request: |-
        Fix idempotent null-WorkItem external result acceptance

        Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs.
      task_id: "202608221335-6DSF3R"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history: []
    revision: 11
    schema_version: 1
    updated_at: "2026-08-22T13:44:40.779Z"
    work_items:
      fix-null-workitem-external-result-replay:
        attempt: 1
        claim_id: null
        id: "fix-null-workitem-external-result-replay"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:f0feebf6b3f6c280eb2a3ab1751a39896fb250113664050cf1434878cdfe9580"
            id: "null-workitem-idempotency-regression-fix"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608221335-6DSF3R"
              work_item_id: "fix-null-workitem-external-result-replay"
            provenance:
              - "sha256:b7230e124a5e104421080b04d1805a239d0b1d83e00ef16fbe9b4921bfdbd1cd"
              - ".agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5972b85f65ababcee81199130de9f8d19dd596d320aa1cb8ba8728aa23f57a3c"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:8e289209da96bbe9af2a46d19fe5a14223d8eeb0005bb3fa6075d727b824321d"
            id: "focused-regression-test"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608221335-6DSF3R"
              work_item_id: "fix-null-workitem-external-result-replay"
            provenance:
              - "sha256:b7230e124a5e104421080b04d1805a239d0b1d83e00ef16fbe9b4921bfdbd1cd"
              - ".agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5972b85f65ababcee81199130de9f8d19dd596d320aa1cb8ba8728aa23f57a3c"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json"
              check_id: "check-null-workitem-replay"
              command_identity: "bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
              detail: "Observed by bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts."
              exit_code: 0
              observed_at: "2026-08-22T13:42:42.293Z"
              repository_snapshot_digest: "sha256:5972b85f65ababcee81199130de9f8d19dd596d320aa1cb8ba8728aa23f57a3c"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608221335-6DSF3R-executor-68b967ed31d87ea619720ded:
        aggregate_digest: "sha256:19267c51f304d269a0f68543e0f21420d3cb0202be5359bc776e97eea3d78910"
        event:
          actor_id: "agentplane"
          at: "2026-08-22T13:42:42.297Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_cd4e985d5dbb275fb0375ef7"
          mutation_id: "external-result:work-order-202608221335-6DSF3R-executor-68b967ed31d87ea619720ded"
          plan_digest: "sha256:2b566e48e9e6c5b64c188c70b923c0fef03c5c7b2fd6ff73e5d4f2dcc28238ec"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608221335-6DSF3R"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "fix-null-workitem-external-result-replay"
        mutation_id: "external-result:work-order-202608221335-6DSF3R-executor-68b967ed31d87ea619720ded"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608221335-6DSF3R"
      legacy-finish:202608221335-6DSF3R:2026-08-22T13:42:38.704Z:497e1f510d9bfee1cb55cfc21002f6442af26690:
        aggregate_digest: "sha256:ddf186d7fbde72f0932291dc9b1d5a2ae0211d1fa4edf045747a68281a7aa8f1"
        event:
          actor_id: "CODER"
          at: "2026-08-22T13:44:40.779Z"
          cause_refs:
            - "task-verification:202608221335-6DSF3R"
            - "git:497e1f510d9bfee1cb55cfc21002f6442af26690"
          entity: "task"
          from: "ACTIVE"
          id: "event_53e4a4a3a22538624743dac4"
          mutation_id: "legacy-finish:202608221335-6DSF3R:2026-08-22T13:42:38.704Z:497e1f510d9bfee1cb55cfc21002f6442af26690"
          plan_digest: "sha256:2b566e48e9e6c5b64c188c70b923c0fef03c5c7b2fd6ff73e5d4f2dcc28238ec"
          plan_revision: 1
          repository_fingerprint: "sha256:a127ad80d571e1832da3bdd57b9016e8674a266dc187723fc4223362b6f67874"
          schema_version: 1
          task_id: "202608221335-6DSF3R"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608221335-6DSF3R:2026-08-22T13:42:38.704Z:497e1f510d9bfee1cb55cfc21002f6442af26690"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202608221335-6DSF3R"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "347cd5e8ef6ad810f7dfac0885d91b62b0f05498"
    message: "🚧 6DSF3R task: apply external agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
    version: 1
id_source: "generated"
---
## Summary

Fix idempotent null-WorkItem external result acceptance

Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs.

## Scope

- In scope: Fix the proven task-centric Core regression in null-ID external result handling: first acceptance must resolve a single claimed or ready WorkItem, and an exact replay after evidence persistence must use the mutation receipt before scheduler selection. Add focused unit coverage. Do not modify context code. This replaces unpublished Task 202608221325-NQJQ5K whose WorkItemGraph incorrectly declared repository sources as upstream required_inputs.
- Out of scope: unrelated refactors not required for "Fix idempotent null-WorkItem external result acceptance".

## Plan

Fix one proven task-centric Core regression: a null-ID external work order must resolve the already claimed WorkItem, and an exact replay must use its persisted idempotency receipt before scheduler selection. Add focused unit coverage; do not touch context code.

## Verify Steps

PLANNER fallback scaffold for "Fix idempotent null-WorkItem external result acceptance". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix idempotent null-WorkItem external result acceptance". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-22T13:42:38.704Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:6ba9c9a8fab95e4bce56a7d00e151eaa218bf5422c0cde365563e71ea9ed1dba

Details:

Check: affected_unit_integration
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check critical_paths

Check: hosted_integration
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check hosted_integration

Check: task_outcome
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
- old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

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

### 2026-08-22T14:19:04.291Z — VERIFY — needs_rework

By: REVIEWER

Note: Hosted P1 review found ambiguous null-ID routing when multiple WorkItems are CLAIMED; fail closed before scheduler fallback and add focused coverage.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:31b248aa6b73a61861cb1c688ecacc34ad00fd2c2dcf214313024245667ac5ea

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
- old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

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

### 2026-08-22T14:22:08.791Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:b2e7f6fff4ec18da8633f8aee3a67323bdfa4df84645258878e9f7bc7cca21b8

Details:

Check: affected_unit_integration
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check critical_paths

Check: hosted_integration
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check hosted_integration

Check: task_outcome
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
- old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608221335-6DSF3R
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-22T14:26:05.994Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3e543bebff673290e54458107b85a0e1473cb0058a0cc5ba54bafc7cca36086, input_digest=sha256:b2e7f6fff4ec18da8633f8aee3a67323bdfa4df84645258878e9f7bc7cca21b8

Details:

Check: affected_unit_integration
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check critical_paths

Check: hosted_integration
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check hosted_integration

Check: task_outcome
Command: bun test packages/agentplane/src/commands/task/task-centric-external-result.test.ts
Result: pass
Evidence: .agentplane/tasks/202608221335-6DSF3R/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221335-6DSF3R Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221335-6DSF3R-fix-idempotent-null-workitem-external-result-acc/.agentplane/tasks/202608221335-6DSF3R/blueprint/resolved-snapshot.json
- old_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- current_digest: 34968ce7deea28daecccaec9e09efe859deafec7732217d0dbe727be569836b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221335-6DSF3R

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

- Observation: Multiple CLAIMED items currently fall through to WorkItemScheduler, which can select an unrelated READY item.
  Impact: A null-ID external result can be recorded against the wrong WorkItem.
  Resolution: Reject ambiguous claimed targets and prove scheduler fallback is used only when no WorkItem is claimed.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: task-centric external result routing
  IncidentTags: task-centric, idempotency

## Token Usage

- State: `unavailable`
- Completeness: `0/5` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:f6bc2ada84e283d841afac1ca0142356f25ad8f483b568afe3a813463499ce9a`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-22T14:25:52.418Z`
