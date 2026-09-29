---
id: "202609190247-NEZTJ3"
title: "Land the verified 0.7.10 canonical release recovery fixes with independent evidence"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 35
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-19T03:41:24.462Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-19T04:05:03.314Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:1725d2eb3699163a9ad5bc7ee80cae009106e9a7c42f5d9ec1eaa92947608c4d"
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-19T03:41:24.462Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "22b7e3aa82fd48d43160147a8a3197fd7b1b35d2"
  review_identity_digest: "sha256:db7e6702ee42513a2b8bacf94af199f66c54628308f433e846dee7e7b9d75409"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609190247-NEZTJ3/2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb/quality-report.json"
  findings:
    - "The implementation commit changes only task artifacts and the six approved product roots; repository evidence freezes commit 22b7e3aa82fd48d43160147a8a3197fd7b1b35d2 as the evaluator target."
    - "Final-validation recovery validates the persisted check identity, implementation fingerprint, command digest, environment digest, and evidence before reuse; integration coverage asserts recovery without a duplicate final-validation mutation."
    - "Repository and provider coordinators bind checkout, branch, commit, tree, request digest, persisted journal, and refreshed provider readback, and ambiguous outcomes remain effect-in-doubt."
    - "Git status path decoding handles quoted names, spaces, octal-encoded UTF-8 Cyrillic, renames, tabs, quotes, and backslashes without disabling or widening the path-authority check."
    - "Approved plan scope expansion is restricted to exact additive roots with unchanged work-item contracts and execution dimensions, plus approval evidence bound to the source and amended plan digests."
execution_route:
  frozen: true
  reason_codes:
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
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "direct"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:documentation"
      - "repository_effect:tests"
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
      - "packages/agentplane/src/commands/task/finish-execute.ts"
      - "packages/agentplane/src/commands/task/finish-quality-evidence.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
      - "packages/agentplane/src/commands/task/git-status-path.test.ts"
      - "packages/agentplane/src/commands/task/git-status-path.ts"
      - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
      - "packages/agentplane/src/commands/task/kernel-advance.ts"
      - "packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
      - "packages/agentplane/src/commands/task/kernel-controller-handoff.ts"
      - "packages/agentplane/src/commands/task/kernel-effect-coordinator.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
      - "packages/agentplane/src/commands/task/kernel-inspection.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
      - "packages/agentplane/src/commands/task/kernel-plan.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
      - "packages/agentplane/src/commands/task/kernel-run.test.ts"
      - "packages/agentplane/src/commands/task/kernel-run.ts"
      - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
      - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
      - "packages/agentplane/src/commands/task/kernel-work-order.ts"
      - "packages/agentplane/src/commands/task/plan-set.command.ts"
      - "packages/agentplane/src/commands/task/run.command.ts"
      - "packages/agentplane/src/commands/task/show-kernel.test.ts"
      - "packages/agentplane/src/commands/task/show.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.ts"
      - "packages/agentplane/src/commands/task/verify-record.types.ts"
      - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
      - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/kernel.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
    external_effects: []
    repository_effects:
      - "documentation"
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
        id: "recorded-check-5"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:37705f65891fdb8231d553a908494c1f43b1d9d05563a6627374548d5d30ff63"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-mutation.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-mutation.ts"
        - "central_path:packages/core/src/tasks/task-kernel/authority-lineage.ts"
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
          - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
          - "packages/agentplane/src/commands/task/finish-execute.ts"
          - "packages/agentplane/src/commands/task/finish-quality-evidence.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
          - "packages/agentplane/src/commands/task/git-status-path.test.ts"
          - "packages/agentplane/src/commands/task/git-status-path.ts"
          - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
          - "packages/agentplane/src/commands/task/kernel-advance.ts"
          - "packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
          - "packages/agentplane/src/commands/task/kernel-controller-handoff.ts"
          - "packages/agentplane/src/commands/task/kernel-effect-coordinator.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
          - "packages/agentplane/src/commands/task/kernel-inspection.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
          - "packages/agentplane/src/commands/task/kernel-plan.ts"
          - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
          - "packages/agentplane/src/commands/task/kernel-run.test.ts"
          - "packages/agentplane/src/commands/task/kernel-run.ts"
          - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
          - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
          - "packages/agentplane/src/commands/task/kernel-work-order.ts"
          - "packages/agentplane/src/commands/task/plan-set.command.ts"
          - "packages/agentplane/src/commands/task/run.command.ts"
          - "packages/agentplane/src/commands/task/show-kernel.test.ts"
          - "packages/agentplane/src/commands/task/show.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record.ts"
          - "packages/agentplane/src/commands/task/verify-record.types.ts"
          - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
          - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/kernel.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
        - "full_regression"
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
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "22b7e3aa82fd48d43160147a8a3197fd7b1b35d2"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-19T03:56:46.385Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "verify"
    at: "2026-09-19T04:05:03.314Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-19T04:05:04.502Z"
doc_updated_by: "SUPERVISOR"
description: "Land the verified 0.7.10 canonical release recovery fixes with independent evidence"
sections:
  Summary: |-
    Land the verified 0.7.10 canonical release recovery fixes with independent evidence

    Land the verified 0.7.10 canonical release recovery fixes with independent evidence
  Scope: |-
    - In scope: Land the verified 0.7.10 canonical release recovery fixes with independent evidence.
    - Out of scope: unrelated refactors not required for "Land the verified 0.7.10 canonical release recovery fixes with independent evidence".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-19T03:56:46.385Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:5aefaa6f62021f26c23d4b2f243ca9666fb189b116c18c5c50673e634fad57bb

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check critical_paths

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check task_outcome

    NativeTaskIdentityRef:
    - plan_digest: sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83
    - policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
    - capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
    - checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
    - identity_digest: sha256:132a4032f9e012565d926efa90a533908bd8ad5380fa16d1fcfff3c00686fc18

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task plan set 202609190247-NEZTJ3 --text "<task-specific-plan>" --updated-by PLANNER
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-19T04:05:03.314Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:303e1dfad254f5157606c6353f22d98ba6b7c784c4fd302fe71ee4b8ca141fc7

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check critical_paths

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check docs_contract

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check task_outcome

    NativeTaskIdentityRef:
    - plan_digest: sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83
    - policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
    - capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
    - checks_digest: sha256:873befc75791bd73f67b591870d980c9e4c72b04387583dd9ee7756566a1394b
    - identity_digest: sha256:f2aaed78be3ae5cd8ffd298fe325ebfd64379873a7e2bfabe39975384d4db404

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task plan set 202609190247-NEZTJ3 --text "<task-specific-plan>" --updated-by PLANNER
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
  agentplane.kernel_operational_projection:
    digest: "sha256:37e4c99550769f2550b25261cd3349664526d788fe809cbf313f66f23eba68e4"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609190247-NEZTJ3/2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb/quality-report.json"
    findings:
      - "The implementation commit changes only task artifacts and the six approved product roots; repository evidence freezes commit 22b7e3aa82fd48d43160147a8a3197fd7b1b35d2 as the evaluator target."
      - "Final-validation recovery validates the persisted check identity, implementation fingerprint, command digest, environment digest, and evidence before reuse; integration coverage asserts recovery without a duplicate final-validation mutation."
      - "Repository and provider coordinators bind checkout, branch, commit, tree, request digest, persisted journal, and refreshed provider readback, and ambiguous outcomes remain effect-in-doubt."
      - "Git status path decoding handles quoted names, spaces, octal-encoded UTF-8 Cyrillic, renames, tabs, quotes, and backslashes without disabling or widening the path-authority check."
      - "Approved plan scope expansion is restricted to exact additive roots with unchanged work-item contracts and execution dimensions, plus approval evidence bound to the source and amended plan digests."
    implementation_commit: "22b7e3aa82fd48d43160147a8a3197fd7b1b35d2"
    implementation_tree: "57b901f81df92558228372d87c50f7bcec18c32a"
    projected_at: "2026-09-19T03:41:24.462Z"
    review_identity_digest: "sha256:db7e6702ee42513a2b8bacf94af199f66c54628308f433e846dee7e7b9d75409"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:1725d2eb3699163a9ad5bc7ee80cae009106e9a7c42f5d9ec1eaa92947608c4d"
    work_order_id: "sha256:709483a8f38370bba789965ddc9c4a599bea6d718e4efe706dcf21e0cc08b38a"
  task_execution_context:
    base_ref: "main"
    base_sha: "a6092de0a5903f7fc4d4365398508ce31ea25ad1"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ed998d297aa3a5f1e30cbfcdf779f5d15a989486a369b191a685830ddb3dc5ee"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d32aedde79c22383bd7bf1ca7f8bd68a1321e06011dfc3947a20abd5f0b8471b"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a8397f7cabf7b12b48e351e6b14704d5816fc635928c5badbbf88c822f33d23d"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f9f4f196200d78b1eac130d163a7ac31e8ebf818c524f2276b8ab90ca50f6eca"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d32aedde79c22383bd7bf1ca7f8bd68a1321e06011dfc3947a20abd5f0b8471b"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a8397f7cabf7b12b48e351e6b14704d5816fc635928c5badbbf88c822f33d23d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ed998d297aa3a5f1e30cbfcdf779f5d15a989486a369b191a685830ddb3dc5ee"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
              - "packages/agentplane/src/commands/task/finish-execute.ts"
              - "packages/agentplane/src/commands/task/finish-quality-evidence.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
              - "packages/agentplane/src/commands/task/git-status-path.test.ts"
              - "packages/agentplane/src/commands/task/git-status-path.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.ts"
              - "packages/agentplane/src/commands/task/kernel-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/agentplane/src/commands/task/run.command.ts"
              - "packages/agentplane/src/commands/task/show-kernel.test.ts"
              - "packages/agentplane/src/commands/task/show.ts"
              - "packages/agentplane/src/commands/task/verify-record-execute.ts"
              - "packages/agentplane/src/commands/task/verify-record.ts"
              - "packages/agentplane/src/commands/task/verify-record.types.ts"
            evidence_digest: "sha256:f74a58cd796921bc9f0a3e739c87c7d3fcc633eadfb37dc6cc32309f89615f56"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f39ced7842ebb70bc3180611f3a238c8165d063e64bfdc60e25a3e30b1e0b27a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:cf01fe2bc70775d6b818d79f4042a7e7b9a99a92cf74f0868b779efbe178c4f6"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:394ab2e0e043b748883cfa066ad299d4642cc7e5ca050784ae0e9d4b3aa27e7d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f9f4f196200d78b1eac130d163a7ac31e8ebf818c524f2276b8ab90ca50f6eca"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation:
            added_scope_roots:
              - "packages/core/src/tasks/task-kernel"
            changed_paths: []
            evidence_digest: "sha256:b004e0c8b398bcc23fe56a07692aa1a68a9b270f57a0d351d67f59cb66d754d7"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d898787e8cb998f73696e763d63c79ff1eeb93530dc9d36c8c59bc4e60ba150e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:cf01fe2bc70775d6b818d79f4042a7e7b9a99a92cf74f0868b779efbe178c4f6"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:394ab2e0e043b748883cfa066ad299d4642cc7e5ca050784ae0e9d4b3aa27e7d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f39ced7842ebb70bc3180611f3a238c8165d063e64bfdc60e25a3e30b1e0b27a"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            evidence_digest: "sha256:404b8edf13769d71f0111a5452fd8752b2c422946395981a38b7ad980813f4b5"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1ec0b7c3b6a92ae016c67e7d6e88aeb965024dec15f6afeedf093806a1720198"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:aca2a4fd2286337f7b173b8cc2b4e2686ac7b299c612d795ddaa00afeef00fde"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:dd23d5256a5ba2983a96b5af3f331f82868aff721560aaf5f8f3490db248aba8"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d898787e8cb998f73696e763d63c79ff1eeb93530dc9d36c8c59bc4e60ba150e"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation:
            added_scope_roots:
              - "packages/agentplane/src/runner/usecases"
            changed_paths: []
            evidence_digest: "sha256:e60cd2b35ff1db035b2d8abb6605fddbcd205d325be628e30ea307063aebb7f7"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:55a99e8d97dc27035e7805bfc46fdfbc0e693ab9454c34ec94da38e23b36f2ba"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:aca2a4fd2286337f7b173b8cc2b4e2686ac7b299c612d795ddaa00afeef00fde"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:dd23d5256a5ba2983a96b5af3f331f82868aff721560aaf5f8f3490db248aba8"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:1ec0b7c3b6a92ae016c67e7d6e88aeb965024dec15f6afeedf093806a1720198"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
            evidence_digest: "sha256:77532945d1c1329c36a75e37b0ce780f9320c94488e6c80214507023a503966a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:23198802e8ffc8a33acb7b97801e0583caba90175485a0ea059f058d3d2cd3e9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:4630bba18a4343423b7f3f4ab81cc87f96016186bd4f24e6cb98e91db6a932bc"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:55a99e8d97dc27035e7805bfc46fdfbc0e693ab9454c34ec94da38e23b36f2ba"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/user"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation:
            added_scope_roots:
              - "docs/user"
            changed_paths: []
            evidence_digest: "sha256:ad397f7fd97d94963a2eeb73cce9cddbc8a3fb867a1cc84071d94323157527e2"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f3dc53214567b9bb3111c9770ffc08fab01fbfdb47af3fc7f174526f753792cb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:4630bba18a4343423b7f3f4ab81cc87f96016186bd4f24e6cb98e91db6a932bc"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:23198802e8ffc8a33acb7b97801e0583caba90175485a0ea059f058d3d2cd3e9"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08348a52fd164c4f4e1aa44cbdb478148df49f6080e13d22b0a821ddaedb35fa"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/user"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202609190247-NEZTJ3"
            validation_requirements:
              - "bun run ci:local:full"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/user/cli-reference.generated.mdx"
            evidence_digest: "sha256:8ed9d8180a5f00b508cfe56c481d25e5ca2e13d1df79fe997f35f40156138cdb"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:4630bba18a4343423b7f3f4ab81cc87f96016186bd4f24e6cb98e91db6a932bc"
        digest: "sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83"
        revision: 4
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:bc018d93eb3dc513c62d4fc56668a60be66edad7669c08630e41a1aceacc5e42"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/runner/usecases"
                - "docs/user"
            expected_outputs:
              - "canonical-release-recovery"
            id: "land-canonical-release-recovery"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:1725d2eb3699163a9ad5bc7ee80cae009106e9a7c42f5d9ec1eaa92947608c4d"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:440c3c691e824f2cd914ae81101ccd9dd3dd2bd3afd10da9a7982a3cff1f7aff"
          environment_digest: "sha256:0e2f62f9e20bd9e487865e88d741d723085de8981ae2a4ab90b272d28e331fe0"
          implementation_identity: "sha256:08348a52fd164c4f4e1aa44cbdb478148df49f6080e13d22b0a821ddaedb35fa"
          toolchain_digest: "sha256:4eb6121e9843a7fd87350127f5a506fca3d1bbc5809cdf627b2cf3fac318d1c7"
        observed_at: "2026-09-19T03:57:28.428Z"
        status: "PASSED"
      id: "202609190247-NEZTJ3"
      intent_digest: "sha256:96cdc82b1e3967fe56d36c9aeb7085dd1fa69ad6ca3f27ceafd8540e4aa66409"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83:
          after_revision: 21
          aggregate_digest: "sha256:60c152ae36b621388cdf380ea7089f3115b76b398b26126a5e73eb990589390f"
          before_revision: 20
          command_digest: "sha256:4cef07c3a5345565ccfa2a8e89c3828cf54191ada74664542ed0b4e3a4f68a4d"
          effect_ids: []
          event_digests:
            - "sha256:92bdec8036462408efd8351b18366da12efb6db635138a358532ddea7ff1332d"
          mutation_id: "amend:sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83"
        amend:sha256:aca2a4fd2286337f7b173b8cc2b4e2686ac7b299c612d795ddaa00afeef00fde:
          after_revision: 15
          aggregate_digest: "sha256:9a8e4b944c7802e7cefc8dda9d516db2f196a562356536f9da5a028d843d26f3"
          before_revision: 14
          command_digest: "sha256:2929d0548616476d765d6868bccd71f38ab247857a32d85944e552eec6e99a08"
          effect_ids: []
          event_digests:
            - "sha256:da36ecf03cf800801ef469733fdd5023fbcd22255e0ef51446b36f8516373653"
          mutation_id: "amend:sha256:aca2a4fd2286337f7b173b8cc2b4e2686ac7b299c612d795ddaa00afeef00fde"
        amend:sha256:cf01fe2bc70775d6b818d79f4042a7e7b9a99a92cf74f0868b779efbe178c4f6:
          after_revision: 9
          aggregate_digest: "sha256:e58bdfc5c115ded7ce9d91aa9e45f088dc66bec7412e36123035e6c30bb2924b"
          before_revision: 8
          command_digest: "sha256:e49de43d220f0641925454fa02f46d0c13cd73c17dcf71b06260cad79c245bfa"
          effect_ids: []
          event_digests:
            - "sha256:94459940df900b659e86fc501610f5f21ff6755c949d6935304aed2cfb00c030"
          mutation_id: "amend:sha256:cf01fe2bc70775d6b818d79f4042a7e7b9a99a92cf74f0868b779efbe178c4f6"
        capture:202609190247-NEZTJ3:
          after_revision: 1
          aggregate_digest: "sha256:771e56768240fcb5f94fb4d053f635e3b13b8eebfdaca82bfe83a514e8ef8cd9"
          before_revision: 0
          command_digest: "sha256:da2034e4ad73173e7b461a768e996da699dd78564647f402dff4ad80c50d5b24"
          effect_ids: []
          event_digests:
            - "sha256:8bfd3183c50a257555684d7fbb82296336024718218365f47ad65928e0827c52"
          mutation_id: "capture:202609190247-NEZTJ3"
        final-validation:sha256:1725d2eb3699163a9ad5bc7ee80cae009106e9a7c42f5d9ec1eaa92947608c4d:30:
          after_revision: 31
          aggregate_digest: "sha256:65f699017245e72210b918fa55694302bba4c9b8b0e158752f582ba117bcb1c7"
          before_revision: 30
          command_digest: "sha256:4779c39f85e2b5fef804557853f0864e0e54c19358992245aaac405a5865b9f0"
          effect_ids: []
          event_digests:
            - "sha256:0727b6ab91690757d379d9de4f2a2261c2a2af1afa2f4c78fed93bb67ec51da6"
          mutation_id: "final-validation:sha256:1725d2eb3699163a9ad5bc7ee80cae009106e9a7c42f5d9ec1eaa92947608c4d:30"
        final-validation:sha256:cf1ec0e76e3d262382a28d0bfc4a1a6fdcab10a7816864b433c4b0d3467ebced:29:
          after_revision: 30
          aggregate_digest: "sha256:1797e4dc6f1224b3c712486eeba79a82aefdd6ebc31cec145ef3944e449541c8"
          before_revision: 29
          command_digest: "sha256:d1960dc9c74de70689d1e8caf1ab5af855e22374b0bdeca846a3c9673acc6412"
          effect_ids: []
          event_digests:
            - "sha256:cfad0e38898cefb2991fac5f38fe8605413d14e07e5d91f371f0b287781bf322"
          mutation_id: "final-validation:sha256:cf1ec0e76e3d262382a28d0bfc4a1a6fdcab10a7816864b433c4b0d3467ebced:29"
        kernel_work_item_claim_required:sha256:02a90170ed02537dec3677f9e5e3d0c7f0596d02c302812819c461c929b48afb:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e:
          after_revision: 5
          aggregate_digest: "sha256:5e881c57c6a78d66d8cdee140613870c9766a2871227fdc1262181c4e0a6d2d7"
          before_revision: 4
          command_digest: "sha256:6cc212f87a4bb8ea52eff40f4211183184011c69cfd9703d33ecf3280b146125"
          effect_ids: []
          event_digests:
            - "sha256:77097b29236d5ede08da502d757e4ca7b9fd7e15db59a66cd4b7ae50826cd7a5"
          mutation_id: "kernel_work_item_claim_required:sha256:02a90170ed02537dec3677f9e5e3d0c7f0596d02c302812819c461c929b48afb:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
        kernel_work_item_claim_required:sha256:08b199c11b237377a442843b199fecd522bc3ba85d59311dcf9a6bd1972140c9:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b:
          after_revision: 17
          aggregate_digest: "sha256:820746bda714130c3993aeb4359c75b5de262c62429019514d00eb3fd937d6d9"
          before_revision: 16
          command_digest: "sha256:b27868142291fba0be77dd2352d96d7f316ce1ad842f40dfb1909c0f77b5a0c0"
          effect_ids: []
          event_digests:
            - "sha256:b191fbb0086d4ba7cf457f1cf6d80d222a4586d8d0588af3e19dd663f8d7ad4c"
          mutation_id: "kernel_work_item_claim_required:sha256:08b199c11b237377a442843b199fecd522bc3ba85d59311dcf9a6bd1972140c9:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
        kernel_work_item_claim_required:sha256:78388b775fa6b056209990d5593fdb091cc9b5b48d2f4dcf37aae5be6f1ce309:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2:
          after_revision: 11
          aggregate_digest: "sha256:49bec995a1b32bfc0d6c01a594f1e1abb4c71bde09f0ac0573f39d39cc7a3542"
          before_revision: 10
          command_digest: "sha256:9d50ac686dc3e6bc576f4b27ac375b5854f88e68d4b5ac6e1256629498d64d58"
          effect_ids: []
          event_digests:
            - "sha256:6be55dbfd2b6622ca302a5ce4c0153b8a232a3b3a4df72e81100b73c1880a7fd"
          mutation_id: "kernel_work_item_claim_required:sha256:78388b775fa6b056209990d5593fdb091cc9b5b48d2f4dcf37aae5be6f1ce309:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
        kernel_work_item_claim_required:sha256:eb9337303299b44c9cf8bfa04dee09d8f680baff45f351549697fe41763e7148:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642:
          after_revision: 23
          aggregate_digest: "sha256:ffcd63c5f532ef1b3302bd90bee1c7b20ccc7f8daec26de1b4fdf197fbbf45c3"
          before_revision: 22
          command_digest: "sha256:1bc1f63db8092dcb1072aa63c2e7f1cde72796e0ec227e14c57d476bc9ca5a23"
          effect_ids: []
          event_digests:
            - "sha256:ee4adac95556f3f8459e4835053fd32203a3247c15d1cf0877b089d928298f1a"
          mutation_id: "kernel_work_item_claim_required:sha256:eb9337303299b44c9cf8bfa04dee09d8f680baff45f351549697fe41763e7148:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
        kernel_work_item_execution_required:sha256:51585e63dc02b044c9e337ed327eed8fbe79c1689c7716949e34d881777c79ce:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b:
          after_revision: 18
          aggregate_digest: "sha256:78571f680b4ea4b1f3a320acc3df4394a5e423f1ca31d7127b4cc50170efd375"
          before_revision: 17
          command_digest: "sha256:f700608979410ad68d96b546f2ae0fe57ba41de8b9ec412dd9a06b086c04c45d"
          effect_ids: []
          event_digests:
            - "sha256:626f3b869bb36d543bddb79831be630a1e1f25946ae29237b9caf764236520b2"
          mutation_id: "kernel_work_item_execution_required:sha256:51585e63dc02b044c9e337ed327eed8fbe79c1689c7716949e34d881777c79ce:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
        kernel_work_item_execution_required:sha256:9e2967941527538b6895e7924fecd4bf97f7259346c316efa253c809535cb4ad:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2:
          after_revision: 12
          aggregate_digest: "sha256:68efd32c85544d2fd6f35d8478bf6584620cbdc0b7249cd57e32bfe4a541fb5a"
          before_revision: 11
          command_digest: "sha256:87c60d94a105155e310b4b01857df7c899d39eec8ee39a34549a313149b31f77"
          effect_ids: []
          event_digests:
            - "sha256:44930e782f0420fbf10ab729b0e275ae6380a1a00eec2bfa4f97cf563d7016c5"
          mutation_id: "kernel_work_item_execution_required:sha256:9e2967941527538b6895e7924fecd4bf97f7259346c316efa253c809535cb4ad:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
        kernel_work_item_execution_required:sha256:cd53f340ac1ff7c6614dde6c3dfcd2822fcdfa19d00f08ac678cf820a301ccbf:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642:
          after_revision: 24
          aggregate_digest: "sha256:370a72ef7452cdc77737221950d389a12a3160572d1c1b7a398f4a6414e04da0"
          before_revision: 23
          command_digest: "sha256:fbffc15a2a18b093e04706bc7e928ed5359ca2f22105e0ef8981e736fdaad499"
          effect_ids: []
          event_digests:
            - "sha256:fd006a439e16c559c79afa624d45f9aa6111c27e30f2c7614e7ce7e20c556fea"
          mutation_id: "kernel_work_item_execution_required:sha256:cd53f340ac1ff7c6614dde6c3dfcd2822fcdfa19d00f08ac678cf820a301ccbf:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
        kernel_work_item_execution_required:sha256:d4f4f72709b96eb3233f60bb829a94a5c27c94ce953ed6f12a5ed0d36afb7d47:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e:
          after_revision: 6
          aggregate_digest: "sha256:0dcec3e9591bc38d5739ec6b938fd54aebb1f4c044df31b197a70da4108944a0"
          before_revision: 5
          command_digest: "sha256:e9da03c132efaeedfa5330d0e36cf6265be8bd54f7762a0ad032fdf3dfe40c90"
          effect_ids: []
          event_digests:
            - "sha256:13d6d2f1d9fbe5c83b2dd9c61ff0f0d252e99a67e89ae6534f4691a90b464ef5"
          mutation_id: "kernel_work_item_execution_required:sha256:d4f4f72709b96eb3233f60bb829a94a5c27c94ce953ed6f12a5ed0d36afb7d47:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
        kernel_work_item_inspection_required:sha256:842a26bbad7e2064bdc4ab4513234ea2d6eb5256cfc338a4a3a2d8f89b3a1420:sha256:08348a52fd164c4f4e1aa44cbdb478148df49f6080e13d22b0a821ddaedb35fa:
          after_revision: 27
          aggregate_digest: "sha256:a52b11c8dbb0f97178dafa7a765991e2363c5edbb047394f5f897cfef7cdf4bd"
          before_revision: 26
          command_digest: "sha256:684bd279de0bde080183dea3c667433b5e06ebb7d265560bbefa31c942bdef14"
          effect_ids: []
          event_digests:
            - "sha256:2db847a4aab01d47d024241e9c72ec9c560579fb424a37c354b8d44fd7474d3c"
          mutation_id: "kernel_work_item_inspection_required:sha256:842a26bbad7e2064bdc4ab4513234ea2d6eb5256cfc338a4a3a2d8f89b3a1420:sha256:08348a52fd164c4f4e1aa44cbdb478148df49f6080e13d22b0a821ddaedb35fa"
        kernel_work_item_materialization_required:sha256:ca9c99bb2ff288e5d657ae8e0b2352fae434ab6ab6fc230ec055e056b5f3cb91:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e:
          after_revision: 4
          aggregate_digest: "sha256:edea80a3b67df6158a08feb04740a33735b758f1194b52fa4d7179a921f76b15"
          before_revision: 3
          command_digest: "sha256:5f4a7297bf234964e25b1ad467897e0cc0680a2ef890c39d475de2e444799c3f"
          effect_ids: []
          event_digests:
            - "sha256:3c4965fe869d81954b8c307849131e60cf9a3d4780ef4d863fcc19cb8b5e76e0"
          mutation_id: "kernel_work_item_materialization_required:sha256:ca9c99bb2ff288e5d657ae8e0b2352fae434ab6ab6fc230ec055e056b5f3cb91:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
        result:sha256:709483a8f38370bba789965ddc9c4a599bea6d718e4efe706dcf21e0cc08b38a:
          after_revision: 26
          aggregate_digest: "sha256:640f62580321ae6c3217d8a3a2c4c4a315bdba2930f6cb272a7ad744933829a3"
          before_revision: 25
          command_digest: "sha256:79c63cca61a7ae1bb62bac01bd150ce9e67e369c8518b8e0b3e879492d9145df"
          effect_ids: []
          event_digests:
            - "sha256:d210e76a38854d1134fa8f5fb80f4a50f996e1410e2c9ef2c0c17ee5f13728c4"
          mutation_id: "result:sha256:709483a8f38370bba789965ddc9c4a599bea6d718e4efe706dcf21e0cc08b38a"
        result:sha256:86d04a179945710fec64ed318400dfafe45db408aa74e38b99d9b4a1f7000f1b:
          after_revision: 2
          aggregate_digest: "sha256:176e806cca28e4ec1ff12fbcdf244d1dc964faf1c137c57830ec012ba3ca2ce4"
          before_revision: 1
          command_digest: "sha256:dbfdf77a78d576d7926cf427b2688762d418ee36e096e3003c9af69e9d329f2a"
          effect_ids: []
          event_digests:
            - "sha256:8e71a5c57c431785b1566687a3e17adeccfe496e829b15ec6506594d2eb14c38"
          mutation_id: "result:sha256:86d04a179945710fec64ed318400dfafe45db408aa74e38b99d9b4a1f7000f1b"
        semantic-stop:sha256:1e7441f4512f92b8bd73ab905922a9f2f7c53985f5b104cce38d597261d7a802:
          after_revision: 8
          aggregate_digest: "sha256:eb7d6775698fd6606024395238f46febc5acc2c45b0dc7aef48f53feff4ca6db"
          before_revision: 7
          command_digest: "sha256:800e089b0b8dfc4c9021473af94531ace6c656fd8b8cc2853d6f40c4233be3c0"
          effect_ids: []
          event_digests:
            - "sha256:9925f33846d9cfa17efb90f8a3261e855ea759642d3d1b7eab55b129696a6282"
          mutation_id: "semantic-stop:sha256:1e7441f4512f92b8bd73ab905922a9f2f7c53985f5b104cce38d597261d7a802"
        semantic-stop:sha256:299a1306af1537e3b5a1026b604678ab42e528c141952fd93467115620210055:
          after_revision: 20
          aggregate_digest: "sha256:409fe11eaea4bce51151cdda4a4d2dcb9fe3fef747b927878bbe463bd0fe595d"
          before_revision: 19
          command_digest: "sha256:246e5c73e3168d08eaaee4a1b9162dc4c2bd08e4683112d5ad2e9ba292b4179d"
          effect_ids: []
          event_digests:
            - "sha256:f10b741bcfd99429fdecaf90ada45183677c82182ef99628783ce20873487312"
          mutation_id: "semantic-stop:sha256:299a1306af1537e3b5a1026b604678ab42e528c141952fd93467115620210055"
        semantic-stop:sha256:dfa64024274219e1dd2ff24b7f69a8b87a4e70e4206123bddaec34df12dd521e:
          after_revision: 14
          aggregate_digest: "sha256:792eec3d364343e380851aca9f425104d64afee059e1c9d7ff70d623439c2f93"
          before_revision: 13
          command_digest: "sha256:e7a22d9fc405b0dd5af250f4eba33c42ccff3faef513c3235c165aa1275a61b1"
          effect_ids: []
          event_digests:
            - "sha256:3fb599af21d811100300ce6f87dfe4a182d765b02f71380e2925cb621b7961a8"
          mutation_id: "semantic-stop:sha256:dfa64024274219e1dd2ff24b7f69a8b87a4e70e4206123bddaec34df12dd521e"
        sha256:0727ae5b30f897cf64e46636f76c0141cc0f8b664f3df89ed135c995ebcaceca:
          after_revision: 25
          aggregate_digest: "sha256:1edb2347c955a62be0d41b798c762b3f358730d2b0299e6808052ed841be0976"
          before_revision: 24
          command_digest: "sha256:a0f868396ea98cb09fcf174e69c2c8a65f54d34c759c8ae11d3d0e5df81caecc"
          effect_ids: []
          event_digests:
            - "sha256:6205464102b4be84de82f27017f4c542cd8d4975f894f7b788e9f9feb839070d"
          mutation_id: "sha256:0727ae5b30f897cf64e46636f76c0141cc0f8b664f3df89ed135c995ebcaceca"
        sha256:1e1643ddeda26f37a7c0a7fae8bd573d6c54e41d11771f84f4bb716bf795f038:
          after_revision: 7
          aggregate_digest: "sha256:eb042c01f6aa1d80a752f3ea97acf93a00bf9a8a4c36a31c2497bc90b844c0be"
          before_revision: 6
          command_digest: "sha256:fb5c1bd3fe00f6b6f2e435722b4c2c29e611f9869430d1e81d66792bf887879f"
          effect_ids: []
          event_digests:
            - "sha256:c97bdde76597bb48b5f345a1b1529c7059cb6e8887f0d02d08e0edd5525ed398"
          mutation_id: "sha256:1e1643ddeda26f37a7c0a7fae8bd573d6c54e41d11771f84f4bb716bf795f038"
        sha256:38ffdc021305ab2bde03cb630455bc5aa58b36159a7621765f9ed622856b58a0:
          after_revision: 3
          aggregate_digest: "sha256:9207b740ae6b475056743e73e706ebeb49f1160eaaed65e9a0dbb1186bcc1c00"
          before_revision: 2
          command_digest: "sha256:55b1481ae5e8c3f7a29b55a1167f5e7550a3dc97d381d4dd62250dc4e3d44207"
          effect_ids: []
          event_digests:
            - "sha256:cd1b28f3dbae19eeed892c8bc0f5bad105a9f7e8f1d0565d83a62573aa814556"
          mutation_id: "sha256:38ffdc021305ab2bde03cb630455bc5aa58b36159a7621765f9ed622856b58a0"
        sha256:b5373bd365839777eab651c0ff4a7aef06e841020d8c7f8af33168b5d2646688:
          after_revision: 19
          aggregate_digest: "sha256:bca4a6edd53987f696ae194785bb1d6dc959c39d8cec5757dffad7a7505f4c5a"
          before_revision: 18
          command_digest: "sha256:d300c461a67d67ef8fc0d2f05a3c7902a850b5bd425ab0de268ab6a1f5984036"
          effect_ids: []
          event_digests:
            - "sha256:7264bcff88c9846921fcdea70ddb6134a8ae7353f0bccda488275a60528fd466"
          mutation_id: "sha256:b5373bd365839777eab651c0ff4a7aef06e841020d8c7f8af33168b5d2646688"
        sha256:d9e1dd43836c6ac63c5ddcfd66137fb635d33e943770870344496ad89b587620:
          after_revision: 16
          aggregate_digest: "sha256:332e959f7f06a012d08c9bf1e50c2a7427fdfa7fae88047d252a0eba18867b28"
          before_revision: 15
          command_digest: "sha256:b7c7eb45bedbef25d1441091540c67caa045bd4c26bda2e9e69685b24e62697b"
          effect_ids: []
          event_digests:
            - "sha256:9a703e586d61239542459a2017cdc8f23c9fe22ccb049dfffbd3f7449bc87e40"
          mutation_id: "sha256:d9e1dd43836c6ac63c5ddcfd66137fb635d33e943770870344496ad89b587620"
        sha256:dbff712d0b29f11c776d80e628aa21298e53c27be4731b561aa8ce114842ae20:
          after_revision: 13
          aggregate_digest: "sha256:5512c87e33440b5689ea7c998c4750b3c729427e57a532fdb97e88b6a3767c29"
          before_revision: 12
          command_digest: "sha256:9c30623c2e6538283d1f87bc5245b13c013feac37aeed7347165f4413a93b3f0"
          effect_ids: []
          event_digests:
            - "sha256:2c4db3b4571c5410a8018024f6e8b4fe5e4e38d93f37493e1d208dff159b724b"
          mutation_id: "sha256:dbff712d0b29f11c776d80e628aa21298e53c27be4731b561aa8ce114842ae20"
        sha256:deca1deaa9868df6f70bad91b85e6c80284e3748f476b976a60344fcbb2b5cec:
          after_revision: 10
          aggregate_digest: "sha256:c12e618929277314cc7e7d2638bc68cc4d8390213a1f0623d3476c20289654af"
          before_revision: 9
          command_digest: "sha256:41082a2f7a66ee94278f0053fe170bca391745a7f6e1419c8f42661537887f86"
          effect_ids: []
          event_digests:
            - "sha256:83f7d547494a235424ae9fb136862c31f3e656d61d9b94277e38daaa12c791c9"
          mutation_id: "sha256:deca1deaa9868df6f70bad91b85e6c80284e3748f476b976a60344fcbb2b5cec"
        sha256:fc4b46dd864797bfca2ba266175eb9e9a1eb5ead7b5af082a8a31e1a92fbcb90:
          after_revision: 22
          aggregate_digest: "sha256:a8fbeb3dad148d3a8119700bb156fed4b4a9f658b3602802d4e8e426b81c809a"
          before_revision: 21
          command_digest: "sha256:088275bec01a23c7324ff797085b659d1e904adc79302908aed932f8aca6abe9"
          effect_ids: []
          event_digests:
            - "sha256:2d22d5ca6dc3901e9e4f867ac4215fab624b75cc3d3c0ce22cbab3f8d990cce2"
          mutation_id: "sha256:fc4b46dd864797bfca2ba266175eb9e9a1eb5ead7b5af082a8a31e1a92fbcb90"
        validation-resolution:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb:
          after_revision: 29
          aggregate_digest: "sha256:2414ff2061ca2804935de60d8440770a16cb597aeed37f51a0d180dbce21fe6b"
          before_revision: 28
          command_digest: "sha256:03dec1a5a960b4ccfc7057902e6317d906734f1deda735d3018b900008195efe"
          effect_ids: []
          event_digests:
            - "sha256:4031faf3455e2bda244b63996d0701e9f709503632984dfb0e04c8c1401ed6c3"
          mutation_id: "validation-resolution:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb"
        validation:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb:
          after_revision: 28
          aggregate_digest: "sha256:e79af96ddadc5d1e0cbf040066d289893ab2054639474f4018e439b10679e536"
          before_revision: 27
          command_digest: "sha256:73762acc9bae1163311b99c1f845087bc5c3d2f79941cb7241037a85bdd5c639"
          effect_ids: []
          event_digests:
            - "sha256:305a27aa2aaba2732bd67927809cb9a966a264a864fca95eb757de3bdfe16689"
          mutation_id: "validation:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:a8397f7cabf7b12b48e351e6b14704d5816fc635928c5badbbf88c822f33d23d"
          digest: "sha256:d32aedde79c22383bd7bf1ca7f8bd68a1321e06011dfc3947a20abd5f0b8471b"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:bc018d93eb3dc513c62d4fc56668a60be66edad7669c08630e41a1aceacc5e42"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "run_tests"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "canonical-release-recovery"
              id: "land-canonical-release-recovery"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:394ab2e0e043b748883cfa066ad299d4642cc7e5ca050784ae0e9d4b3aa27e7d"
          digest: "sha256:cf01fe2bc70775d6b818d79f4042a7e7b9a99a92cf74f0868b779efbe178c4f6"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:bc018d93eb3dc513c62d4fc56668a60be66edad7669c08630e41a1aceacc5e42"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "run_tests"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel"
              expected_outputs:
                - "canonical-release-recovery"
              id: "land-canonical-release-recovery"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:dd23d5256a5ba2983a96b5af3f331f82868aff721560aaf5f8f3490db248aba8"
          digest: "sha256:aca2a4fd2286337f7b173b8cc2b4e2686ac7b299c612d795ddaa00afeef00fde"
          revision: 3
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:bc018d93eb3dc513c62d4fc56668a60be66edad7669c08630e41a1aceacc5e42"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "run_tests"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/agentplane/src/runner/usecases"
              expected_outputs:
                - "canonical-release-recovery"
              id: "land-canonical-release-recovery"
              optional: false
              required_inputs: []
      revision: 31
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        land-canonical-release-recovery:
          attempt: 4
          claim_id: "sha256:bd2570ca1733115ebdb63f44c9f70e6d6d30025bdfc8440ffdca24caed208313"
          definition:
            contract_digest: "sha256:bc018d93eb3dc513c62d4fc56668a60be66edad7669c08630e41a1aceacc5e42"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-kernel"
                - "packages/agentplane/src/runner/usecases"
                - "docs/user"
            expected_outputs:
              - "canonical-release-recovery"
            id: "land-canonical-release-recovery"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 4
              digest: "sha256:73b8503d9786adbe73d9b6a62c4b3df2fd67b12923170298588b6b896f08a424"
              id: "canonical-release-recovery"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:08348a52fd164c4f4e1aa44cbdb478148df49f6080e13d22b0a821ddaedb35fa"
              task_id: "202609190247-NEZTJ3"
              work_item_id: "land-canonical-release-recovery"
          result_digest: "sha256:f33ec978fba85c3b61ed81a1c6e6bd04e58b38d19dbaf2a185c7646818d3a9ce"
          revision: 22
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:a1f68e62d5d70ba7fd2347f9105eb1edb17baf1aec567b9f67f29b564101b9d4"
              - "sha256:db7e6702ee42513a2b8bacf94af199f66c54628308f433e846dee7e7b9d75409"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:440c3c691e824f2cd914ae81101ccd9dd3dd2bd3afd10da9a7982a3cff1f7aff"
              environment_digest: "sha256:fc8c3399828243c48b6672ae3e47865f6806388ec9f5a7d68e0e28df07d6b490"
              implementation_identity: "sha256:f33ec978fba85c3b61ed81a1c6e6bd04e58b38d19dbaf2a185c7646818d3a9ce"
              toolchain_digest: "sha256:4eb6121e9843a7fd87350127f5a506fca3d1bbc5809cdf627b2cf3fac318d1c7"
            observed_at: "2026-09-19T03:41:24.462Z"
            status: "PASSED"
    digest: "sha256:7d8d8dc7ff137ae5507efb76a3a32979158fa30b9ae57edcc00221803f1868a5"
    documents:
      contracts:
        sha256:bc018d93eb3dc513c62d4fc56668a60be66edad7669c08630e41a1aceacc5e42:
          acceptance_criteria:
            - "Canonical final validation and operational projection recover without duplicate validation or stale projection loops."
            - "A provider-rebased merged task reaches hosted close and terminal completion without revalidating an obsolete commit identity."
            - "Canonical work orders remain checkout-specific and repository mutations preserve the Task Kernel extension."
            - "Focused recovery tests and the full local CI route pass on the exact committed head."
          objective: "Land the already reproduced canonical release-recovery fixes as one independently reviewed product change."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
      intent:
        context: "Land the verified 0.7.10 canonical release recovery fixes with independent evidence"
        objective: "Land the verified 0.7.10 canonical release recovery fixes with independent evidence"
    events:
      -
        command_digest: "sha256:da2034e4ad73173e7b461a768e996da699dd78564647f402dff4ad80c50d5b24"
        id: "capture:202609190247-NEZTJ3:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609190247-NEZTJ3"
        occurred_at: "2026-09-19T02:47:13.584Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609190247-NEZTJ3"
        task_revision: 1
      -
        command_digest: "sha256:dbfdf77a78d576d7926cf427b2688762d418ee36e096e3003c9af69e9d329f2a"
        id: "result:sha256:86d04a179945710fec64ed318400dfafe45db408aa74e38b99d9b4a1f7000f1b:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:86d04a179945710fec64ed318400dfafe45db408aa74e38b99d9b4a1f7000f1b"
        occurred_at: "2026-09-19T02:48:17.096Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609190247-NEZTJ3"
        task_revision: 2
      -
        command_digest: "sha256:55b1481ae5e8c3f7a29b55a1167f5e7550a3dc97d381d4dd62250dc4e3d44207"
        id: "sha256:38ffdc021305ab2bde03cb630455bc5aa58b36159a7621765f9ed622856b58a0:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:38ffdc021305ab2bde03cb630455bc5aa58b36159a7621765f9ed622856b58a0"
        occurred_at: "2026-09-19T02:48:25.382Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609190247-NEZTJ3"
        task_revision: 3
      -
        command_digest: "sha256:5f4a7297bf234964e25b1ad467897e0cc0680a2ef890c39d475de2e444799c3f"
        id: "kernel_work_item_materialization_required:sha256:ca9c99bb2ff288e5d657ae8e0b2352fae434ab6ab6fc230ec055e056b5f3cb91:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ca9c99bb2ff288e5d657ae8e0b2352fae434ab6ab6fc230ec055e056b5f3cb91:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
        occurred_at: "2026-09-19T02:48:28.545Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609190247-NEZTJ3"
        task_revision: 4
      -
        command_digest: "sha256:6cc212f87a4bb8ea52eff40f4211183184011c69cfd9703d33ecf3280b146125"
        id: "kernel_work_item_claim_required:sha256:02a90170ed02537dec3677f9e5e3d0c7f0596d02c302812819c461c929b48afb:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:02a90170ed02537dec3677f9e5e3d0c7f0596d02c302812819c461c929b48afb:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
        occurred_at: "2026-09-19T02:48:32.289Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609190247-NEZTJ3"
        task_revision: 5
      -
        command_digest: "sha256:e9da03c132efaeedfa5330d0e36cf6265be8bd54f7762a0ad032fdf3dfe40c90"
        id: "kernel_work_item_execution_required:sha256:d4f4f72709b96eb3233f60bb829a94a5c27c94ce953ed6f12a5ed0d36afb7d47:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d4f4f72709b96eb3233f60bb829a94a5c27c94ce953ed6f12a5ed0d36afb7d47:sha256:30157dc1d2b985e11231e04d3d412a5755273d0f62f92a217a8d189a15176e8e"
        occurred_at: "2026-09-19T02:48:35.176Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609190247-NEZTJ3"
        task_revision: 6
      -
        command_digest: "sha256:fb5c1bd3fe00f6b6f2e435722b4c2c29e611f9869430d1e81d66792bf887879f"
        id: "sha256:1e1643ddeda26f37a7c0a7fae8bd573d6c54e41d11771f84f4bb716bf795f038:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1e1643ddeda26f37a7c0a7fae8bd573d6c54e41d11771f84f4bb716bf795f038"
        occurred_at: "2026-09-19T02:55:24.625Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609190247-NEZTJ3"
        task_revision: 7
      -
        command_digest: "sha256:800e089b0b8dfc4c9021473af94531ace6c656fd8b8cc2853d6f40c4233be3c0"
        id: "semantic-stop:sha256:1e7441f4512f92b8bd73ab905922a9f2f7c53985f5b104cce38d597261d7a802:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:1e7441f4512f92b8bd73ab905922a9f2f7c53985f5b104cce38d597261d7a802"
        occurred_at: "2026-09-19T02:55:27.822Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609190247-NEZTJ3"
        task_revision: 8
      -
        command_digest: "sha256:e49de43d220f0641925454fa02f46d0c13cd73c17dcf71b06260cad79c245bfa"
        id: "amend:sha256:cf01fe2bc70775d6b818d79f4042a7e7b9a99a92cf74f0868b779efbe178c4f6:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:cf01fe2bc70775d6b818d79f4042a7e7b9a99a92cf74f0868b779efbe178c4f6"
        occurred_at: "2026-09-19T02:56:23.724Z"
        payload_digest: "sha256:7915294a055b308643b13c2acd991183ad704decb66936e992addf445bd71fe5"
        task_id: "202609190247-NEZTJ3"
        task_revision: 9
      -
        command_digest: "sha256:41082a2f7a66ee94278f0053fe170bca391745a7f6e1419c8f42661537887f86"
        id: "sha256:deca1deaa9868df6f70bad91b85e6c80284e3748f476b976a60344fcbb2b5cec:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:deca1deaa9868df6f70bad91b85e6c80284e3748f476b976a60344fcbb2b5cec"
        occurred_at: "2026-09-19T02:56:25.784Z"
        payload_digest: "sha256:b1b282b3533767d89d5c0dcc71171768e42163b658ea281d2e228886aed5b3e2"
        task_id: "202609190247-NEZTJ3"
        task_revision: 10
      -
        command_digest: "sha256:9d50ac686dc3e6bc576f4b27ac375b5854f88e68d4b5ac6e1256629498d64d58"
        id: "kernel_work_item_claim_required:sha256:78388b775fa6b056209990d5593fdb091cc9b5b48d2f4dcf37aae5be6f1ce309:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:78388b775fa6b056209990d5593fdb091cc9b5b48d2f4dcf37aae5be6f1ce309:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
        occurred_at: "2026-09-19T02:56:36.427Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609190247-NEZTJ3"
        task_revision: 11
      -
        command_digest: "sha256:87c60d94a105155e310b4b01857df7c899d39eec8ee39a34549a313149b31f77"
        id: "kernel_work_item_execution_required:sha256:9e2967941527538b6895e7924fecd4bf97f7259346c316efa253c809535cb4ad:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9e2967941527538b6895e7924fecd4bf97f7259346c316efa253c809535cb4ad:sha256:4277af731596f0f7f6d671c2ae0ce9c13fe0b69c8fc73f8a7e3ca39c69f39cf2"
        occurred_at: "2026-09-19T02:56:39.529Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609190247-NEZTJ3"
        task_revision: 12
      -
        command_digest: "sha256:9c30623c2e6538283d1f87bc5245b13c013feac37aeed7347165f4413a93b3f0"
        id: "sha256:dbff712d0b29f11c776d80e628aa21298e53c27be4731b561aa8ce114842ae20:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:dbff712d0b29f11c776d80e628aa21298e53c27be4731b561aa8ce114842ae20"
        occurred_at: "2026-09-19T03:00:18.121Z"
        payload_digest: "sha256:5ddca350e3d922e32801a968518ee6b89afaf32271d2c1266857b9fa8c5d8c8d"
        task_id: "202609190247-NEZTJ3"
        task_revision: 13
      -
        command_digest: "sha256:e7a22d9fc405b0dd5af250f4eba33c42ccff3faef513c3235c165aa1275a61b1"
        id: "semantic-stop:sha256:dfa64024274219e1dd2ff24b7f69a8b87a4e70e4206123bddaec34df12dd521e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:dfa64024274219e1dd2ff24b7f69a8b87a4e70e4206123bddaec34df12dd521e"
        occurred_at: "2026-09-19T03:00:21.456Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609190247-NEZTJ3"
        task_revision: 14
      -
        command_digest: "sha256:2929d0548616476d765d6868bccd71f38ab247857a32d85944e552eec6e99a08"
        id: "amend:sha256:aca2a4fd2286337f7b173b8cc2b4e2686ac7b299c612d795ddaa00afeef00fde:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:aca2a4fd2286337f7b173b8cc2b4e2686ac7b299c612d795ddaa00afeef00fde"
        occurred_at: "2026-09-19T03:00:34.771Z"
        payload_digest: "sha256:36be904ca7a7b0203be7b7ae9baf0f6b429970e74f83ac756501ba6bd5218510"
        task_id: "202609190247-NEZTJ3"
        task_revision: 15
      -
        command_digest: "sha256:b7c7eb45bedbef25d1441091540c67caa045bd4c26bda2e9e69685b24e62697b"
        id: "sha256:d9e1dd43836c6ac63c5ddcfd66137fb635d33e943770870344496ad89b587620:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d9e1dd43836c6ac63c5ddcfd66137fb635d33e943770870344496ad89b587620"
        occurred_at: "2026-09-19T03:00:36.977Z"
        payload_digest: "sha256:78dd6ac649c565c35490aeb70160706aa88aa733ec122055c0a70e463bd68bc9"
        task_id: "202609190247-NEZTJ3"
        task_revision: 16
      -
        command_digest: "sha256:b27868142291fba0be77dd2352d96d7f316ce1ad842f40dfb1909c0f77b5a0c0"
        id: "kernel_work_item_claim_required:sha256:08b199c11b237377a442843b199fecd522bc3ba85d59311dcf9a6bd1972140c9:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:08b199c11b237377a442843b199fecd522bc3ba85d59311dcf9a6bd1972140c9:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
        occurred_at: "2026-09-19T03:00:48.010Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202609190247-NEZTJ3"
        task_revision: 17
      -
        command_digest: "sha256:f700608979410ad68d96b546f2ae0fe57ba41de8b9ec412dd9a06b086c04c45d"
        id: "kernel_work_item_execution_required:sha256:51585e63dc02b044c9e337ed327eed8fbe79c1689c7716949e34d881777c79ce:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:51585e63dc02b044c9e337ed327eed8fbe79c1689c7716949e34d881777c79ce:sha256:9a2db0f03d874b76a5473eb44477945906506ab6cb36f1599886fab925bda76b"
        occurred_at: "2026-09-19T03:00:51.140Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609190247-NEZTJ3"
        task_revision: 18
      -
        command_digest: "sha256:d300c461a67d67ef8fc0d2f05a3c7902a850b5bd425ab0de268ab6a1f5984036"
        id: "sha256:b5373bd365839777eab651c0ff4a7aef06e841020d8c7f8af33168b5d2646688:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b5373bd365839777eab651c0ff4a7aef06e841020d8c7f8af33168b5d2646688"
        occurred_at: "2026-09-19T03:28:39.386Z"
        payload_digest: "sha256:1223dab77db4a4ff6e2209fcb4238433d8fa95a7c34d0ffd01b6eba93b722354"
        task_id: "202609190247-NEZTJ3"
        task_revision: 19
      -
        command_digest: "sha256:246e5c73e3168d08eaaee4a1b9162dc4c2bd08e4683112d5ad2e9ba292b4179d"
        id: "semantic-stop:sha256:299a1306af1537e3b5a1026b604678ab42e528c141952fd93467115620210055:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:299a1306af1537e3b5a1026b604678ab42e528c141952fd93467115620210055"
        occurred_at: "2026-09-19T03:28:42.581Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609190247-NEZTJ3"
        task_revision: 20
      -
        command_digest: "sha256:4cef07c3a5345565ccfa2a8e89c3828cf54191ada74664542ed0b4e3a4f68a4d"
        id: "amend:sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83"
        occurred_at: "2026-09-19T03:28:54.807Z"
        payload_digest: "sha256:d049cb1e030556feda78544ec6c82b985af2bf44050f0211b2dd4e1586a587f7"
        task_id: "202609190247-NEZTJ3"
        task_revision: 21
      -
        command_digest: "sha256:088275bec01a23c7324ff797085b659d1e904adc79302908aed932f8aca6abe9"
        id: "sha256:fc4b46dd864797bfca2ba266175eb9e9a1eb5ead7b5af082a8a31e1a92fbcb90:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:fc4b46dd864797bfca2ba266175eb9e9a1eb5ead7b5af082a8a31e1a92fbcb90"
        occurred_at: "2026-09-19T03:28:56.945Z"
        payload_digest: "sha256:be3663b3e19de3c102755ce6c68afb0345ff05ad1ecd659f29a48e6a01df736c"
        task_id: "202609190247-NEZTJ3"
        task_revision: 22
      -
        command_digest: "sha256:1bc1f63db8092dcb1072aa63c2e7f1cde72796e0ec227e14c57d476bc9ca5a23"
        id: "kernel_work_item_claim_required:sha256:eb9337303299b44c9cf8bfa04dee09d8f680baff45f351549697fe41763e7148:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:eb9337303299b44c9cf8bfa04dee09d8f680baff45f351549697fe41763e7148:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
        occurred_at: "2026-09-19T03:29:08.490Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609190247-NEZTJ3"
        task_revision: 23
      -
        command_digest: "sha256:fbffc15a2a18b093e04706bc7e928ed5359ca2f22105e0ef8981e736fdaad499"
        id: "kernel_work_item_execution_required:sha256:cd53f340ac1ff7c6614dde6c3dfcd2822fcdfa19d00f08ac678cf820a301ccbf:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cd53f340ac1ff7c6614dde6c3dfcd2822fcdfa19d00f08ac678cf820a301ccbf:sha256:c557edfea002da16e77b37f734a8f024e9acf9ba029d4d5913095eb764cfe642"
        occurred_at: "2026-09-19T03:29:11.660Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202609190247-NEZTJ3"
        task_revision: 24
      -
        command_digest: "sha256:a0f868396ea98cb09fcf174e69c2c8a65f54d34c759c8ae11d3d0e5df81caecc"
        id: "sha256:0727ae5b30f897cf64e46636f76c0141cc0f8b664f3df89ed135c995ebcaceca:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:0727ae5b30f897cf64e46636f76c0141cc0f8b664f3df89ed135c995ebcaceca"
        occurred_at: "2026-09-19T03:38:23.377Z"
        payload_digest: "sha256:2df57c43b4c2d8878cc215fa25538784184bb0d4aefc65c0b5ed89616ba46f69"
        task_id: "202609190247-NEZTJ3"
        task_revision: 25
      -
        command_digest: "sha256:79c63cca61a7ae1bb62bac01bd150ce9e67e369c8518b8e0b3e879492d9145df"
        id: "result:sha256:709483a8f38370bba789965ddc9c4a599bea6d718e4efe706dcf21e0cc08b38a:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:709483a8f38370bba789965ddc9c4a599bea6d718e4efe706dcf21e0cc08b38a"
        occurred_at: "2026-09-19T03:38:28.000Z"
        payload_digest: "sha256:0e67667c6876dfaf859630ccf07b6f9b1d617b5a2caf96dcae2605f9a8beb345"
        task_id: "202609190247-NEZTJ3"
        task_revision: 26
      -
        command_digest: "sha256:684bd279de0bde080183dea3c667433b5e06ebb7d265560bbefa31c942bdef14"
        id: "kernel_work_item_inspection_required:sha256:842a26bbad7e2064bdc4ab4513234ea2d6eb5256cfc338a4a3a2d8f89b3a1420:sha256:08348a52fd164c4f4e1aa44cbdb478148df49f6080e13d22b0a821ddaedb35fa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:842a26bbad7e2064bdc4ab4513234ea2d6eb5256cfc338a4a3a2d8f89b3a1420:sha256:08348a52fd164c4f4e1aa44cbdb478148df49f6080e13d22b0a821ddaedb35fa"
        occurred_at: "2026-09-19T03:38:31.844Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202609190247-NEZTJ3"
        task_revision: 27
      -
        command_digest: "sha256:73762acc9bae1163311b99c1f845087bc5c3d2f79941cb7241037a85bdd5c639"
        id: "validation:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb"
        occurred_at: "2026-09-19T03:49:03.261Z"
        payload_digest: "sha256:a43e5e79e2536f385f2e6bb8563438e2c36b1e138d99185bd53bf0ea892cd36b"
        task_id: "202609190247-NEZTJ3"
        task_revision: 28
      -
        command_digest: "sha256:03dec1a5a960b4ccfc7057902e6317d906734f1deda735d3018b900008195efe"
        id: "validation-resolution:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2585a5090a9691a484eb438a5610ac45775c50850a66c755196111773398c4bb"
        occurred_at: "2026-09-19T03:49:05.427Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202609190247-NEZTJ3"
        task_revision: 29
      -
        command_digest: "sha256:d1960dc9c74de70689d1e8caf1ab5af855e22374b0bdeca846a3c9673acc6412"
        id: "final-validation:sha256:cf1ec0e76e3d262382a28d0bfc4a1a6fdcab10a7816864b433c4b0d3467ebced:29:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:cf1ec0e76e3d262382a28d0bfc4a1a6fdcab10a7816864b433c4b0d3467ebced:29"
        occurred_at: "2026-09-19T03:56:41.342Z"
        payload_digest: "sha256:a1cf56c6b5ad483cf6fee0b4cccda6265837251b8e79958d76fd7f459023bbae"
        task_id: "202609190247-NEZTJ3"
        task_revision: 30
      -
        command_digest: "sha256:4779c39f85e2b5fef804557853f0864e0e54c19358992245aaac405a5865b9f0"
        id: "final-validation:sha256:1725d2eb3699163a9ad5bc7ee80cae009106e9a7c42f5d9ec1eaa92947608c4d:30:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:1725d2eb3699163a9ad5bc7ee80cae009106e9a7c42f5d9ec1eaa92947608c4d:30"
        occurred_at: "2026-09-19T04:04:58.220Z"
        payload_digest: "sha256:6940084af274654ec365aeaf02df47dba1148dd3f0fab76ee5366935b8268d1b"
        task_id: "202609190247-NEZTJ3"
        task_revision: 31
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Land the verified 0.7.10 canonical release recovery fixes with independent evidence

Land the verified 0.7.10 canonical release recovery fixes with independent evidence

## Scope

- In scope: Land the verified 0.7.10 canonical release recovery fixes with independent evidence.
- Out of scope: unrelated refactors not required for "Land the verified 0.7.10 canonical release recovery fixes with independent evidence".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-19T03:56:46.385Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:5aefaa6f62021f26c23d4b2f243ca9666fb189b116c18c5c50673e634fad57bb

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check critical_paths

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check task_outcome

NativeTaskIdentityRef:
- plan_digest: sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83
- policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
- capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
- checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
- identity_digest: sha256:132a4032f9e012565d926efa90a533908bd8ad5380fa16d1fcfff3c00686fc18

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task plan set 202609190247-NEZTJ3 --text "<task-specific-plan>" --updated-by PLANNER
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-19T04:05:03.314Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:303e1dfad254f5157606c6353f22d98ba6b7c784c4fd302fe71ee4b8ca141fc7

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check critical_paths

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check docs_contract

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609190247-NEZTJ3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609190247-NEZTJ3 Verification Contract check task_outcome

NativeTaskIdentityRef:
- plan_digest: sha256:1c95f30779c8c20cf48b15892a095edd8791bd58a4b65b913c667bb05b1d6c83
- policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
- capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
- checks_digest: sha256:873befc75791bd73f67b591870d980c9e4c72b04387583dd9ee7756566a1394b
- identity_digest: sha256:f2aaed78be3ae5cd8ffd298fe325ebfd64379873a7e2bfabe39975384d4db404

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task plan set 202609190247-NEZTJ3 --text "<task-specific-plan>" --updated-by PLANNER
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
