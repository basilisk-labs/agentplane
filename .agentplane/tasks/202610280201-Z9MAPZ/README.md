---
id: "202610280201-Z9MAPZ"
title: "Allow exact provider update after failed integration"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 40
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-28T16:12:20.424Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-28T16:57:51.959Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-28T16:12:20.424Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "0233c55c130788e4c0b859717e4254e72a28d12b"
  review_identity_digest: "sha256:442211f8bd212908ca15af83fb93666ad2cfd3ee010e306ff13671dd667da411"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610280201-Z9MAPZ/bdd41946238f481e2a8329d1d28e4f1a61bfbdef7856e9f285669f07ba04914c/quality-report.json"
  findings:
    - "The production diff changes the recovered-successor gate only and moves the existing provider identity schema into a generic helper; the remaining integration resolution paths are unchanged."
    - "The guard requires a ready, safe-to-mutate provider.pr.update_branch route, a parsed frozen integration snapshot, matching task/PR/branch/base/head/base SHA/provider identity/URL, and a registered checkout."
    - "The regression suite covers two matching checkout forms, 16 identity/authority/snapshot drift cases, and the prior semantic rework successor. AgentPlane recorded focused tests 20/20, typecheck, and full local CI as passed on implementation head 0233c55c1."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
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
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
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
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:5c1c8d846ea059474e28aa3e56db1a4484eed89e1cc529b36cde1e4731369943"
      escalation_reasons:
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
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
      requires_full_regression: true
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "0233c55c130788e4c0b859717e4254e72a28d12b"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-28T16:57:51.959Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-28T16:57:53.033Z"
doc_updated_by: "SUPERVISOR"
description: "When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors."
sections:
  Summary: |-
    Allow exact provider update after failed integration

    When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.
  Scope: |-
    - In scope: When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.
    - Out of scope: unrelated refactors not required for "Allow exact provider update after failed integration".
  Plan: "1. Execute approved WorkItem exact-provider-update-successor."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow exact provider update after failed integration". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow exact provider update after failed integration". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-28T16:57:51.959Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d6f7b5e6a7b52e1ef3f308137708af2b9a827de401f05d396b49d22a99d22586, input_digest=sha256:bd80e9f179cc36dc8714a623df52c2ddd3495851f01836446ce594bdd8a2ec32

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check full_regression

    Check: real_e2e
    Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4
    - policy_digest: sha256:1469f9511222e1944f6256b66fc7f77bb4b75c356cb828fd2d59456cf84872e1
    - capability_digest: sha256:bef198ce85876946befe86b5161af14a30b51ef23fe9404d9dd6bb67e963633f
    - checks_digest: sha256:77a77967daf668ba1b873e8dbce02beeeec46cda7540f803babced036c3cf852
    - identity_digest: sha256:a9c3053bbba3ab07b3d1150a580398354e2e0d98a381a296ea3fc60d40981e57

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610280201-Z9MAPZ
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
    digest: "sha256:3b32a561b9007b5b131f73a8809c64d73f7f26d0736b74d2689c53c593f40f66"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610280201-Z9MAPZ/bdd41946238f481e2a8329d1d28e4f1a61bfbdef7856e9f285669f07ba04914c/quality-report.json"
    findings:
      - "The production diff changes the recovered-successor gate only and moves the existing provider identity schema into a generic helper; the remaining integration resolution paths are unchanged."
      - "The guard requires a ready, safe-to-mutate provider.pr.update_branch route, a parsed frozen integration snapshot, matching task/PR/branch/base/head/base SHA/provider identity/URL, and a registered checkout."
      - "The regression suite covers two matching checkout forms, 16 identity/authority/snapshot drift cases, and the prior semantic rework successor. AgentPlane recorded focused tests 20/20, typecheck, and full local CI as passed on implementation head 0233c55c1."
    implementation_commit: "0233c55c130788e4c0b859717e4254e72a28d12b"
    implementation_tree: "b6cd7f7faaded8323bd77174569a09086d05aa45"
    projected_at: "2026-10-28T16:12:20.424Z"
    review_identity_digest: "sha256:442211f8bd212908ca15af83fb93666ad2cfd3ee010e306ff13671dd667da411"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:2ecaea7b0a1e4eea8c2acc77a6e7c10fa57dd99604bf09ede4164cdf911bbe5d"
    work_order_id: "sha256:62a5ac636c39a2376c9507337df11f8915100a9204a65ded2ba9cd3ebb615371"
  task_execution_context:
    base_ref: "main"
    base_sha: "9c1ad3fe68b6ce490e72ace285dcea2d316d0364"
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
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ccb68b88847845fcf3d72b93e522647a20f57348b0374d2a7942941b57525617"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:70048075a66ef4cbc18cb4b91d9af4e057897e9b333a988dcd66b50dde77c2ca"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e29db572a7dd24bfdc46361a1d79fedc95f685ad15ac407635a3c134bef268c8"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:70048075a66ef4cbc18cb4b91d9af4e057897e9b333a988dcd66b50dde77c2ca"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ccb68b88847845fcf3d72b93e522647a20f57348b0374d2a7942941b57525617"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:f93ad4e6608ab1f39e3613cf7279c44d9616d766da7fe013a45c3c121b43c03d"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4c4575e9c6b8ed19ee804c2c8141372cf444c1d93356beffae082a16d5b8252f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:70048075a66ef4cbc18cb4b91d9af4e057897e9b333a988dcd66b50dde77c2ca"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e29db572a7dd24bfdc46361a1d79fedc95f685ad15ac407635a3c134bef268c8"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            evidence_digest: "sha256:3c6e6fbae99cba3617f50f3c7adfa6d96a3cdf28d605233d7a83c94a1d3de3ee"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7dad153c3a07b4f666cadb73f19fd09c90c74a133d1cbde67fbc1cd0f3d9cbd6"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4c4575e9c6b8ed19ee804c2c8141372cf444c1d93356beffae082a16d5b8252f"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:61c099fad93a8e04fb3b16435b0060be20608ba042e4980e6cfb187d68f2f51b"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d44d42623410a93f55ed81f62ad2937822401ef4a33af55267bba2af424960f7"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
              kind: "USER"
              parent_authority_digest: "sha256:7dad153c3a07b4f666cadb73f19fd09c90c74a133d1cbde67fbc1cd0f3d9cbd6"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:e7f65a9044edf94c8fdca0775ef1cbd576ee924f1ae93557dd0f0c222c574806"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
            request_digest: "sha256:d9b45ddf8be7880588f7a07c0d4ac258320cb0db3bd3a8e777c68d6d59a7ca76"
            scope_request:
              attempt: 3
              claim_id: "sha256:1da9b5a1124f27095339bf462a94500ce92d038b0887fc6035c9b879248702d5"
              contract_digest: "sha256:f3ec2e98645aa24f4ec22f64a4bfe42dede87722b266cceac9b91574110bf566"
              intake_after_digest: "sha256:6e54a2957db90e00b73c1d9dfe3c4089d5024e8f9575cba3751b45b1b0e0e19e"
              intake_before_digest: "sha256:2973fe0b5350db06a22eeb04f16dadc9b6b7fe0336d89fb106a3ebeb63ca9377"
              parent_authority_digest: "sha256:7dad153c3a07b4f666cadb73f19fd09c90c74a133d1cbde67fbc1cd0f3d9cbd6"
              plan_digest: "sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d"
              plan_revision: 2
              record_digest: "sha256:ca3d53829f43237f6c0f4efd1362c49eb70cfd1f5debf560b74bca41043bf346"
              repository_effects: []
              repository_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:f579d07f214399173185453cca2bf1380edc458d0b2f56377a6588abaf0065ee"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
              stop_receipt_digest: "sha256:ba13d65e2cf484090b76b92f958cadb3735f8c7e6150a111075e2b712e00bf16"
              task_id: "202610280201-Z9MAPZ"
              task_revision: 23
              work_item_id: "exact-provider-update-successor"
              work_order_id: "sha256:9a25eefff326740c41a69c55937e8a6f001e6de7d0c871174311cda5bfb1cf93"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e69119c7472dbe5f5838be21e429efd3b45ee5e676921aecf0ec2511fb8315d4"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:81e2ba1ab7031407c571bcd13857156f9f6354be86c3b1570b4f2c3ca31a91e8"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:21aded4667a7549705749ec6e0fce8e17930749cd3564993629521825c45218d"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:81e2ba1ab7031407c571bcd13857156f9f6354be86c3b1570b4f2c3ca31a91e8"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e69119c7472dbe5f5838be21e429efd3b45ee5e676921aecf0ec2511fb8315d4"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            task_id: "202610280201-Z9MAPZ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
            evidence_digest: "sha256:c2250e5217a511926ff82ae373673e44c9205e82f275b37695cd2666d9184ba8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:81e2ba1ab7031407c571bcd13857156f9f6354be86c3b1570b4f2c3ca31a91e8"
        digest: "sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:f3ec2e98645aa24f4ec22f64a4bfe42dede87722b266cceac9b91574110bf566"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
            expected_outputs:
              - "generic-recovery-guard"
              - "recovery-guard-regressions"
            id: "exact-provider-update-successor"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:2ecaea7b0a1e4eea8c2acc77a6e7c10fa57dd99604bf09ede4164cdf911bbe5d"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:bd0f7defde6fa5dbccd73360c0ecab05471440c3ea0b742ee1d543351b53b9db"
          environment_digest: "sha256:5207995e6aabdc46bd2729cc96e115ac9a901f66665275bc63b62c598f93a86e"
          implementation_identity: "sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
          toolchain_digest: "sha256:336b6fb2815f69a01f10ed4971eec34c294fac0f46014da691f1298c7261c146"
        observed_at: "2026-10-28T16:17:16.579Z"
        status: "PASSED"
      id: "202610280201-Z9MAPZ"
      intent_digest: "sha256:0a900dde897f9535cdf1fafbf4a3f205fd78cffa6eeee28ad1e48050b41f05f2"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d:
          after_revision: 13
          aggregate_digest: "sha256:b2d61be4cdae9ee54e7069ce0a80d711f68556a59b96be3ba8345bfd3ae01c39"
          before_revision: 12
          command_digest: "sha256:bdd72c7f55840d7c1bd6ae5da5c72a54970ae2c0b2eefe600ed6eb1e8152330c"
          effect_ids: []
          event_digests:
            - "sha256:762a6155241e76461aaa7a6e37f0ff5d1cf2e6d64aa896c1f1230f06d59181de"
          mutation_id: "amend:sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d"
        capture:202610280201-Z9MAPZ:
          after_revision: 1
          aggregate_digest: "sha256:9169b1acffaf02547782c5f0d8f29f55ee27e444864a51fa89c3b2a16c6eebef"
          before_revision: 0
          command_digest: "sha256:5c6fbc26f8737a5ae057055d8fa01169862eb4aee278fa530e842609ce91d85a"
          effect_ids: []
          event_digests:
            - "sha256:c71a4da3bf4184290a6900d027786d6ef08a0513084e22d54e19f0cff761c981"
          mutation_id: "capture:202610280201-Z9MAPZ"
        final-validation:sha256:2ecaea7b0a1e4eea8c2acc77a6e7c10fa57dd99604bf09ede4164cdf911bbe5d:33:
          after_revision: 34
          aggregate_digest: "sha256:8198810f3ecd4365cd31ff60e0f9ab4282bee9ba8eafe9f218fd84cc6c38288b"
          before_revision: 33
          command_digest: "sha256:c71497e841521ddde2a8be9025be920e7562966cdbf0732347529cef42758292"
          effect_ids: []
          event_digests:
            - "sha256:f60ebba3095a79ffd60ac178aaeb6e573266eb7eec444bd549512eb71e635db2"
          mutation_id: "final-validation:sha256:2ecaea7b0a1e4eea8c2acc77a6e7c10fa57dd99604bf09ede4164cdf911bbe5d:33"
        kernel_task_completion_required:sha256:94d6cf4b1368be52b6390ce5534746b9e24d229a2f590068b462f539918c7c94:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6:
          after_revision: 35
          aggregate_digest: "sha256:068e50dab7ca86d5e13f5504028b30a5e62968b93151769771fbe1e968b174ef"
          before_revision: 34
          command_digest: "sha256:c859ef12906f0c1330879702d7b8444687cf8392a139f1a1659d24c8e3dd210c"
          effect_ids: []
          event_digests:
            - "sha256:9d3dac17688cff0edd562158f8cbc6d0b3949d9ce2c5f7d8f47f6dca14a7b118"
          mutation_id: "kernel_task_completion_required:sha256:94d6cf4b1368be52b6390ce5534746b9e24d229a2f590068b462f539918c7c94:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
        kernel_work_item_claim_required:sha256:281303de1ebb88dce9d381c184ee2737b84215bc9b70f90d9c47c19aaf6f5443:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 27
          aggregate_digest: "sha256:543b889b3447b95548809fb7389f171663ff680e42129958f8c8e7ca10b2ecd9"
          before_revision: 26
          command_digest: "sha256:bce23fce9b6c94de38cd072f849ed806cac64bada1f7e56cf33c97043a2de432"
          effect_ids: []
          event_digests:
            - "sha256:f9a63bba2925f68c4ef7d8f66c4bf65e79cf908438c8e931e38780b4ea7005ea"
          mutation_id: "kernel_work_item_claim_required:sha256:281303de1ebb88dce9d381c184ee2737b84215bc9b70f90d9c47c19aaf6f5443:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:
          after_revision: 5
          aggregate_digest: "sha256:c4e20945fb9aeb00096dc157cab8c14c4d78f3360bb233b4133418bfd671247a"
          before_revision: 4
          command_digest: "sha256:a0a6539842f02a96b2e7455d81a2835f632e37837bdb1c81a22cd659d27832ff"
          effect_ids: []
          event_digests:
            - "sha256:773c0ef06a4df4b306f88d1db25eb2a8137d508cd7f06d5a3fb015304c3f4918"
          mutation_id: "kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        kernel_work_item_claim_required:sha256:bd5ed2ae24ca8075e6c2a068c0849b8a9ef17aa198573f4c79e367d90527513b:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 15
          aggregate_digest: "sha256:f82f3acd11533af3883f60e5e2441f7aded089bb4277f44ccaed94f385bea81a"
          before_revision: 14
          command_digest: "sha256:0cb68af787ccc389e00c0e1b779e3cd263e087cdd82cc5f0c87ca4e922905ee2"
          effect_ids: []
          event_digests:
            - "sha256:6ee31f2f38d5db8c19b2be58854e458e698aacded9b166fc81140512e733ea76"
          mutation_id: "kernel_work_item_claim_required:sha256:bd5ed2ae24ca8075e6c2a068c0849b8a9ef17aa198573f4c79e367d90527513b:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c:
          after_revision: 7
          aggregate_digest: "sha256:44402f68c04ca5ca561ccfb73c17c540b995d590633d6f78cd80a6555b2344f2"
          before_revision: 6
          command_digest: "sha256:423ccbffee97a6ba0e38beae5d14040954101d062e1dff5a0bc0b49caf72f904"
          effect_ids: []
          event_digests:
            - "sha256:c12adb6c41ab785355de7f633a93528589e1622a6011389d9bee420c11ceccaf"
          mutation_id: "kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
        kernel_work_item_execution_required:sha256:6b0adcbac95e878d182f1e3ce7c2f16d9326e8b5f55b3ae83b77aead0ddd6abe:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 28
          aggregate_digest: "sha256:25a1b3eff49bbf4a695077f0859f8ed37a276b742e9d30c293cbf55365e6f6c4"
          before_revision: 27
          command_digest: "sha256:d96b5d36cb16e3afe7e70705d8c2a13a843e16ea83f71eea7ebd6aab2914a5d6"
          effect_ids: []
          event_digests:
            - "sha256:328cef0ea44e3dc20adcfdc83b426265f18b84e763642118ed4d7dfd89037c4b"
          mutation_id: "kernel_work_item_execution_required:sha256:6b0adcbac95e878d182f1e3ce7c2f16d9326e8b5f55b3ae83b77aead0ddd6abe:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        kernel_work_item_execution_required:sha256:b0ff006344baebda81fa50c4a25fa01b34aad0a6f2cc18fcb5063d0d1e973c00:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 22
          aggregate_digest: "sha256:241b12aa96a8b50fa0666eebe87294bd97aecb9d3502c1f0484e1b318f8e6f3f"
          before_revision: 21
          command_digest: "sha256:1782815d75254c3060b4cbf10d332a7f28a9a03f78d13f19cbf4571ec1184646"
          effect_ids: []
          event_digests:
            - "sha256:f64296714da5a9e162be45f930142fcf40ded2268927cd8bf241f3cb261fb847"
          mutation_id: "kernel_work_item_execution_required:sha256:b0ff006344baebda81fa50c4a25fa01b34aad0a6f2cc18fcb5063d0d1e973c00:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        kernel_work_item_execution_required:sha256:cad797f5352c519f62139063f1d30c1a304efcbbe9e5dc88bc37492e58320127:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 16
          aggregate_digest: "sha256:c6ecdffeadc74c5adb9932a5ba3b5cfa9bfb11fb0430ff0e51c62b602fc7f9ec"
          before_revision: 15
          command_digest: "sha256:ee794c1bfccf96eefbdb6fd0314a0bcfeb01568c86adac758d14f1a74c0ba165"
          effect_ids: []
          event_digests:
            - "sha256:f67fe32c8292f5847eac50f3a36b04d5f910cc4f4997e99663b40ec582ee2b8e"
          mutation_id: "kernel_work_item_execution_required:sha256:cad797f5352c519f62139063f1d30c1a304efcbbe9e5dc88bc37492e58320127:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        kernel_work_item_inspection_required:sha256:5d9f828e757348ba48261b62f18954a44aeeb8269e0bc00d74357c8e05904601:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 10
          aggregate_digest: "sha256:69c475716d7ec1c8be228270482db94c29fff033af8500f9f232d262fa44eaa9"
          before_revision: 9
          command_digest: "sha256:b4ef39038c9e2ecd04f5f04940c9e97764d6443eacc4ce23cef313d3465bf82b"
          effect_ids: []
          event_digests:
            - "sha256:a838811a6ec7de930ab13c934022f5745aa7892c6d825728d459ca315ee953af"
          mutation_id: "kernel_work_item_inspection_required:sha256:5d9f828e757348ba48261b62f18954a44aeeb8269e0bc00d74357c8e05904601:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        kernel_work_item_inspection_required:sha256:8a5ce17285d5db1cf34dcbe85bcab0dd505da19a6d9d4446773cdcdf81669277:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 18
          aggregate_digest: "sha256:b3e87b41c714e2ffc53a5013e811bda9d12622341b69e31df4d63cd45752ed6c"
          before_revision: 17
          command_digest: "sha256:97768c277b8d9d958358009d82c231f865923c9aa2d2d4000a22952ec0bc5149"
          effect_ids: []
          event_digests:
            - "sha256:87e941e01195afc60ada564a0840a1d502786ddbcee1b3a3f791559d1ae16e0d"
          mutation_id: "kernel_work_item_inspection_required:sha256:8a5ce17285d5db1cf34dcbe85bcab0dd505da19a6d9d4446773cdcdf81669277:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        kernel_work_item_inspection_required:sha256:db3520b95a1fc86199172eede04ce6cf582bfd1a61686b79094cbbb8c3dde3f4:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6:
          after_revision: 31
          aggregate_digest: "sha256:db50216721e0387804de9a51c8512a0fc32dd19ecfb6e5bfcdb11d7b8ded76e8"
          before_revision: 30
          command_digest: "sha256:b25d6e25617eb4b889111bc1dbdb4729fc2361df9db19260069679207e1e926d"
          effect_ids: []
          event_digests:
            - "sha256:06558a80eda0694cf7aeb052e76576639b53e277c6774cc16d7cf7daf828a5f1"
          mutation_id: "kernel_work_item_inspection_required:sha256:db3520b95a1fc86199172eede04ce6cf582bfd1a61686b79094cbbb8c3dde3f4:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
        kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:
          after_revision: 4
          aggregate_digest: "sha256:b20147769e75aff7df73437613971b07326c984e333f3abd7c0e9cd7095b37e2"
          before_revision: 3
          command_digest: "sha256:1f751d529c12a5d8786cdb5e72b15263d8008cfbab2b3635e44f545a9837e289"
          effect_ids: []
          event_digests:
            - "sha256:0a625cb7eff863b5adf394f333fd02b6707d490b4a67f224f65cc42059ad0bb2"
          mutation_id: "kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        kernel_work_item_rework_claim_required:sha256:115cdad9270cba4c89d44e39e5aa7a8508f0bdcb0bee4922660b075c74257fb9:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:
          after_revision: 21
          aggregate_digest: "sha256:58a927a3fd29d3d84f477ca877f84c4b4c820ea1cf74a11c2db73aa81abce940"
          before_revision: 20
          command_digest: "sha256:4e15740a9ee93871cf20ee67658a242a3de66fb2ff6d0c83532b9f35c7b65053"
          effect_ids: []
          event_digests:
            - "sha256:92156490fc973474064e0659a8db863dc59188a4a99d58fb42b9c7a7b4fb2736"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:115cdad9270cba4c89d44e39e5aa7a8508f0bdcb0bee4922660b075c74257fb9:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        plan:sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4:
          after_revision: 25
          aggregate_digest: "sha256:aa95331b2dd790a603163fb036f91a17db8bf42f1e67b55983883a626aaa87bf"
          before_revision: 24
          command_digest: "sha256:aaa7e5d6dfaadb38b5ad16f1b78b46e7ccc21bc5da23d93664d3b5da9e5e7b06"
          effect_ids: []
          event_digests:
            - "sha256:2e069c6adfb2ec203d09437972ee99a8cb9dedd1278f369890902a6b94572f13"
          mutation_id: "plan:sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4"
        result:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654:
          after_revision: 9
          aggregate_digest: "sha256:76ee0103edecf00bb2a5312bd359af3d5dc4dc1196541b6ca361a42b31f8b8bc"
          before_revision: 8
          command_digest: "sha256:3e180ab5eea19f30fd44cfbdeb67afeeddf6497860c671397e3bfeb98325925d"
          effect_ids: []
          event_digests:
            - "sha256:8baaca3b3bb60e7aa204c6fe72100f018785d1a8f716ca340e6bc4c758614ebb"
          mutation_id: "result:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654"
        result:sha256:62a5ac636c39a2376c9507337df11f8915100a9204a65ded2ba9cd3ebb615371:
          after_revision: 30
          aggregate_digest: "sha256:0876596bad0454d663ae8b2d813d54af0a43f47c876adb3f3b11a6e6e5183f06"
          before_revision: 29
          command_digest: "sha256:4a82a5b68171503a11b59326ab7cc4106adcfa4a416c396ab909d31333c6a097"
          effect_ids: []
          event_digests:
            - "sha256:5f0e80a112d74c80ac6270cc732e0e563e886385b469555f9888b0782b5aab70"
          mutation_id: "result:sha256:62a5ac636c39a2376c9507337df11f8915100a9204a65ded2ba9cd3ebb615371"
        result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35:
          after_revision: 2
          aggregate_digest: "sha256:6278559e542f246685e8de141a150921562089811d4228656bb247de90cc38b5"
          before_revision: 1
          command_digest: "sha256:e55921635df63fbfc3e512985461296b050040c789266862b3c63a4c6903fdad"
          effect_ids: []
          event_digests:
            - "sha256:350e4b000c54fb8d3b2099e4e206d125ec275a820938b9770aaa66750b71bc93"
          mutation_id: "result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35"
        result:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf:
          after_revision: 17
          aggregate_digest: "sha256:7507b8ab86f6e00995af9bcd85486d3d47ca51f6894cc6c08d80c01763d4390b"
          before_revision: 16
          command_digest: "sha256:e37981d27b023960865d9db46f422a2368aea1e45770160ccab012c81decd8e1"
          effect_ids: []
          event_digests:
            - "sha256:0128a1f4ee5012d17d8b5ea7fc08fa4ef1d0bc58b366ea79704ee6461ed28426"
          mutation_id: "result:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf"
        scope-request:sha256:d9b45ddf8be7880588f7a07c0d4ac258320cb0db3bd3a8e777c68d6d59a7ca76:
          after_revision: 24
          aggregate_digest: "sha256:938f7821e589014d0dd071c3645268326d74f424d3a8b35f4f7d3f1b3d695e82"
          before_revision: 23
          command_digest: "sha256:2f29e3d2e68edf98c4f82dad455309238abc943fc0d6428388eeb8cf51dae37b"
          effect_ids: []
          event_digests:
            - "sha256:4492123cf0dd588d556b9aa59ac534826c275e487d4ae70a1769a2791f17c2de"
          mutation_id: "scope-request:sha256:d9b45ddf8be7880588f7a07c0d4ac258320cb0db3bd3a8e777c68d6d59a7ca76"
        semantic-stop:sha256:9a25eefff326740c41a69c55937e8a6f001e6de7d0c871174311cda5bfb1cf93:
          after_revision: 23
          aggregate_digest: "sha256:0a1cecb943d86fd096a88f59164973d20ab68f006b4c3434936395b062c80060"
          before_revision: 22
          command_digest: "sha256:9d0eb5715bae705f53e2e6938c1f9a532dc43bc854532d63e321336e909cdca1"
          effect_ids: []
          event_digests:
            - "sha256:bc17edb93ea7f4ff6758a6be5d616c227facd0f0079386cd5a4ab7c202579f2c"
          mutation_id: "semantic-stop:sha256:9a25eefff326740c41a69c55937e8a6f001e6de7d0c871174311cda5bfb1cf93"
        sha256:14b3a3a7a5b9f0317708d621bc3ed305e28de7787362a61d8cada5029b4594e6:
          after_revision: 14
          aggregate_digest: "sha256:3532f5c8d8b200119f8c7142885b11e722a7374c90762c864e1b88afb1f9594b"
          before_revision: 13
          command_digest: "sha256:4f25ed2711637a9976b5f6c1f4abd85f1e222c20e0aec1ef9e3199ce0cefc5f3"
          effect_ids: []
          event_digests:
            - "sha256:2ee6be8b6d1e6ce1ee5714977e9d654843c5314001a5362a614a6831bfd443ba"
          mutation_id: "sha256:14b3a3a7a5b9f0317708d621bc3ed305e28de7787362a61d8cada5029b4594e6"
        sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad:
          after_revision: 6
          aggregate_digest: "sha256:2a4e906065f34fe3d509c1bfcb4460b71e5796a7fe7fc388b2527a82d364549b"
          before_revision: 5
          command_digest: "sha256:fdd19ef2a9e5c8d540c5155af2759a22adf1ff96b9e0d5cb51a9b0bcb01c120b"
          effect_ids: []
          event_digests:
            - "sha256:5cac18fd306bfbd97828dca36a27483658f0cea1872f85761e8410be96bf925b"
          mutation_id: "sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad"
        sha256:8962380f1db97f06fd1c6da380aebbb38d81404c2d1b7c50a67280e3ed54ca11:
          after_revision: 26
          aggregate_digest: "sha256:1ecb4d685545d07e934f2efb76f89ee61149b085cdeb89cb89ca84c9fff83543"
          before_revision: 25
          command_digest: "sha256:e9a8db0710fe53604a3ff187d423a871fc509f06154e540695ac7461818d9fa2"
          effect_ids: []
          event_digests:
            - "sha256:5d5a3d393e65d67522bc5ce1990611d31473655576da7cb917b86950f5101846"
          mutation_id: "sha256:8962380f1db97f06fd1c6da380aebbb38d81404c2d1b7c50a67280e3ed54ca11"
        sha256:bafb254fcee3870f00a00501a40a773922ae54087f7fec3fd7fc5953ff963916:
          after_revision: 8
          aggregate_digest: "sha256:6d454744dbe5d5574a299482d6babc6473010c0ebf21625abe77357165feb716"
          before_revision: 7
          command_digest: "sha256:21b53695809497a25a60458edaa19b8e04107ad2c3d2c79e9a4bd08fe2706200"
          effect_ids: []
          event_digests:
            - "sha256:d2e41beb8407fa5596d6f4d64402cf8ebf4e469a9bf8f06786749a68797f23fe"
          mutation_id: "sha256:bafb254fcee3870f00a00501a40a773922ae54087f7fec3fd7fc5953ff963916"
        sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea:
          after_revision: 3
          aggregate_digest: "sha256:7711cfe01e65bca900e05d0af5faceb7a011eaccc232c4807bddf9de205c203b"
          before_revision: 2
          command_digest: "sha256:b0c90a6a43ecb6283a23fe79120396f8b65314fc2460d3361dc221da05d0a991"
          effect_ids: []
          event_digests:
            - "sha256:edfa0137c73286607d99336d097f076b18791c4f536d1cb0de497037498bfaa9"
          mutation_id: "sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea"
        sha256:cf572745d3d1a25ed682a2ff22a430d7bba2c7750a9114549d9e9222d59547d0:
          after_revision: 29
          aggregate_digest: "sha256:76e7b7e2d99c2784f183ab8a6c3fd018a78acc6828d7ee5600facb9f18dae50d"
          before_revision: 28
          command_digest: "sha256:494ac97c3246ff8e090fb09aaa4778924b5c0bffac60e3fd5e01e129ce471ec5"
          effect_ids: []
          event_digests:
            - "sha256:0fc4677eb29e3fc5b8f038a774ddfc554558a7dba6451cf2befe301300fc52de"
          mutation_id: "sha256:cf572745d3d1a25ed682a2ff22a430d7bba2c7750a9114549d9e9222d59547d0"
        validation-resolution:sha256:0d305f28a9d6c96fbd210050cdf16f739473d03bee5b532e4305b6e24d0646be:
          after_revision: 33
          aggregate_digest: "sha256:4b22aeba6f561942d7a717eb2a97a2ea5846fb4cc67a5932505e7e37a39ac3a0"
          before_revision: 32
          command_digest: "sha256:ad7e5520f79e613795ee8db58d8281932fe7b41415c68029c98f713e3ec901b6"
          effect_ids: []
          event_digests:
            - "sha256:910abe2a671d99bcb50a430035a7f77c07eae9050cfb8bf88ac2ad62ba760663"
          mutation_id: "validation-resolution:sha256:0d305f28a9d6c96fbd210050cdf16f739473d03bee5b532e4305b6e24d0646be"
        validation-resolution:sha256:ecb80ef4347576e61c5d5836f5bc053de134815bff35e9f8ff3e94910ee70268:
          after_revision: 20
          aggregate_digest: "sha256:6f58f74b601837b18cd082e3f96323aba66be069f9a031eab3a4a9821f81c2f2"
          before_revision: 19
          command_digest: "sha256:0349a506575621d17b115946546faa2f0d7cc27425640ca82c34d3782d2818b4"
          effect_ids: []
          event_digests:
            - "sha256:3069daa1b7971ed540e978fec68c7d86c5315cd41fb1c7c249e5e9cb995230d2"
          mutation_id: "validation-resolution:sha256:ecb80ef4347576e61c5d5836f5bc053de134815bff35e9f8ff3e94910ee70268"
        validation:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654:
          after_revision: 11
          aggregate_digest: "sha256:a0a35670a22d207a785cdf1e5748b678f3f88c85ead750935999602467179b4d"
          before_revision: 10
          command_digest: "sha256:e52620e0eae1d9707acfac9dd03ef47e86c4861528e8b2dd74fb8ba1df394b3f"
          effect_ids: []
          event_digests:
            - "sha256:2c20a477c1c7c7f9b87272d1943f0774df716f28d70d1e5ea651720ac6015052"
          mutation_id: "validation:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654"
        validation:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf:
          after_revision: 19
          aggregate_digest: "sha256:a01349e6ee011a71da249ea3ad2ae2ad12aae2f0c328aa6cb4f2ca9b428308be"
          before_revision: 18
          command_digest: "sha256:03e9f428fca74b4ffb333428062a62dd48891d3cd66729e8b5093fb2f15774c7"
          effect_ids: []
          event_digests:
            - "sha256:025fbbaa596f03935a966bf2b4588d166a64789ea0b310348b06bf6ef992a631"
          mutation_id: "validation:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf"
        validation:sha256:bdd41946238f481e2a8329d1d28e4f1a61bfbdef7856e9f285669f07ba04914c:
          after_revision: 32
          aggregate_digest: "sha256:ed8f80e47f315be0baf96ba70b83a9d3043c0cd0bdfe767348fca8b6127a5bd7"
          before_revision: 31
          command_digest: "sha256:415b81e8c68712647125ad19800ca7a4a6af8d28fe055396f626698c030cc7a0"
          effect_ids: []
          event_digests:
            - "sha256:055bfd08c378b70401a68ae091600a74b01eb3ecac6f87e0f00ff47603183893"
          mutation_id: "validation:sha256:bdd41946238f481e2a8329d1d28e4f1a61bfbdef7856e9f285669f07ba04914c"
        work-item-resume:sha256:2b6f73bfcb1b673d9f0b3b0c2b474113a33b07b9358823cb7d72325aa3deaa45:
          after_revision: 12
          aggregate_digest: "sha256:16293b1e7ea12c820b42aceec74bf22778827c825b7dcb9677c2e2a83d24136d"
          before_revision: 11
          command_digest: "sha256:13046396894235ead5d80dc20a53b0102ecee9ea82153d21afb2a99c69a52e19"
          effect_ids: []
          event_digests:
            - "sha256:6d4ee3581804a66c01f2942e27e48d3e919cd00513ad28930717fd9c931d95fc"
          mutation_id: "work-item-resume:sha256:2b6f73bfcb1b673d9f0b3b0c2b474113a33b07b9358823cb7d72325aa3deaa45"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:aa848079ca212184dc1c58df8495adbbe25152b587bba42eaa99c942a403626a"
          digest: "sha256:70048075a66ef4cbc18cb4b91d9af4e057897e9b333a988dcd66b50dde77c2ca"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:7c22ab758b21a6999f78267f28e06d8753bfe53725715a31b5559ac4b5b28625"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              expected_outputs:
                - "generic-recovery-guard"
                - "recovery-guard-regressions"
              id: "exact-provider-update-successor"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:0da73f4ed47fe55a4fb87de7ed7a636afb863619c29d371ef7918edb49f222eb"
          digest: "sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:f3ec2e98645aa24f4ec22f64a4bfe42dede87722b266cceac9b91574110bf566"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
              expected_outputs:
                - "generic-recovery-guard"
                - "recovery-guard-regressions"
              id: "exact-provider-update-successor"
              optional: false
              required_inputs: []
      revision: 35
      schema_version: 1
      state: "COMPLETED"
      work_items:
        exact-provider-update-successor:
          attempt: 4
          claim_id: "sha256:1149a8964d5e5382194e84ba5cd85f9c689c81dfbfcb62829687a26f7e0020f3"
          definition:
            contract_digest: "sha256:f3ec2e98645aa24f4ec22f64a4bfe42dede87722b266cceac9b91574110bf566"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery-provider-update.ts"
            expected_outputs:
              - "generic-recovery-guard"
              - "recovery-guard-regressions"
            id: "exact-provider-update-successor"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 4
              digest: "sha256:13c41d18ba698863531323aac356d262a2bed81e193dc81846dcfddb2a230abe"
              id: "generic-recovery-guard"
              kind: "report"
              plan_revision: 3
              repository_fingerprint: "sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
              task_id: "202610280201-Z9MAPZ"
              work_item_id: "exact-provider-update-successor"
            -
              attempt: 4
              digest: "sha256:48439ba8767a6e6e259b0446b62f8b9bf060d575c07cce09f94ae347b6e971c3"
              id: "recovery-guard-regressions"
              kind: "report"
              plan_revision: 3
              repository_fingerprint: "sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
              task_id: "202610280201-Z9MAPZ"
              work_item_id: "exact-provider-update-successor"
          result_digest: "sha256:f10a5e8ac6b0606e08e479d352189858a30cc65bdee33f525865714ca3d2c112"
          revision: 26
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:a3926b9580dc66cf5466a543c0c9afab9f17902458136af20341e48c674e68cb"
              - "sha256:442211f8bd212908ca15af83fb93666ad2cfd3ee010e306ff13671dd667da411"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:bd0f7defde6fa5dbccd73360c0ecab05471440c3ea0b742ee1d543351b53b9db"
              environment_digest: "sha256:b17910a83da9efcdb6455caaa61aebb46ff7d06c068526b0db5d383758193ef4"
              implementation_identity: "sha256:f10a5e8ac6b0606e08e479d352189858a30cc65bdee33f525865714ca3d2c112"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-28T16:12:20.424Z"
            status: "PASSED"
    digest: "sha256:06473e13d68359f8e8fe4c6dc20c0f1e736fc942f51d1f7bc28bf76a68bd3824"
    documents:
      contracts:
        sha256:7c22ab758b21a6999f78267f28e06d8753bfe53725715a31b5559ac4b5b28625:
          acceptance_criteria:
            - "A ready replacement of failed integration.run_next accepts an authorized provider.pr.update_branch route only when task ID, PR number, branch, base branch, expected head/base SHA, and provider identity match the frozen failure snapshot."
            - "Any missing snapshot, changed identity, changed route, or unsafe mutation authority is rejected before a provider effect."
            - "Existing semantic implementation rework and unresolved integration-intent paths remain unchanged."
          objective: "Permit only the exact typed provider.pr.update_branch successor after a failed integration.run_next when the immutable failed-operation recovery snapshot and fresh route describe the same task, queued PR, provider identity, branch, head, and base; preserve semantic rework requirement for all other successors."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts"
            - "bun run typecheck"
            - "AgentPlane native full local CI and hosted PR checks"
        sha256:f3ec2e98645aa24f4ec22f64a4bfe42dede87722b266cceac9b91574110bf566:
          acceptance_criteria:
            - "A ready replacement of failed integration.run_next accepts an authorized provider.pr.update_branch route only when task ID, PR number, branch, base branch, expected head/base SHA, and provider identity match the frozen failure snapshot."
            - "Any missing snapshot, changed identity, changed route, or unsafe mutation authority is rejected before a provider effect."
            - "Existing semantic implementation rework and unresolved integration-intent paths remain unchanged."
          objective: "Permit only the exact typed provider.pr.update_branch successor after a failed integration.run_next when the immutable failed-operation recovery snapshot and fresh route describe the same task, queued PR, provider identity, branch, head, and base; preserve semantic rework requirement for all other successors."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
      intent:
        context: "When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors."
        objective: "Allow exact provider update after failed integration"
    events:
      -
        command_digest: "sha256:5c6fbc26f8737a5ae057055d8fa01169862eb4aee278fa530e842609ce91d85a"
        id: "capture:202610280201-Z9MAPZ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610280201-Z9MAPZ"
        occurred_at: "2026-10-28T02:01:54.153Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 1
      -
        command_digest: "sha256:e55921635df63fbfc3e512985461296b050040c789266862b3c63a4c6903fdad"
        id: "result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:69cf56e66d25e9959c6b7dc1655adff3a665834cb4ccbabb7ad4d7d93b78da35"
        occurred_at: "2026-10-28T02:03:48.032Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 2
      -
        command_digest: "sha256:b0c90a6a43ecb6283a23fe79120396f8b65314fc2460d3361dc221da05d0a991"
        id: "sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:c3cc6898adb12b7bedac3aa3ac91b7020ef794fcae956534435d837bd50aecea"
        occurred_at: "2026-10-28T02:04:59.891Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 3
      -
        command_digest: "sha256:1f751d529c12a5d8786cdb5e72b15263d8008cfbab2b3635e44f545a9837e289"
        id: "kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ea8bcfc203cef5eaa838e07e86e72f0a410ddc2e6274078e581381f0c4012deb:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        occurred_at: "2026-10-28T02:05:58.422Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 4
      -
        command_digest: "sha256:a0a6539842f02a96b2e7455d81a2835f632e37837bdb1c81a22cd659d27832ff"
        id: "kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7b2ccb421624fbe1ecc6dbfc5ab9163bf4f514c028f6deb68a504bb04d2d2243:sha256:93aed079823ca20b970c4e1be0655c3fcfae215e1ec3319171e99c0294c4b479"
        occurred_at: "2026-10-28T02:06:47.101Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 5
      -
        command_digest: "sha256:fdd19ef2a9e5c8d540c5155af2759a22adf1ff96b9e0d5cb51a9b0bcb01c120b"
        id: "sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:72eef0eb3b2861083a4197a8008b0e7448c819ee046117c9bbb9f387f7ea0cad"
        occurred_at: "2026-10-28T02:08:42.964Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 6
      -
        command_digest: "sha256:423ccbffee97a6ba0e38beae5d14040954101d062e1dff5a0bc0b49caf72f904"
        id: "kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4486a2f8da09274ee69eeeb0a884c7122848fc88a8dc41f1392a9b21796476d9:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
        occurred_at: "2026-10-28T02:09:21.178Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 7
      -
        command_digest: "sha256:21b53695809497a25a60458edaa19b8e04107ad2c3d2c79e9a4bd08fe2706200"
        id: "sha256:bafb254fcee3870f00a00501a40a773922ae54087f7fec3fd7fc5953ff963916:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bafb254fcee3870f00a00501a40a773922ae54087f7fec3fd7fc5953ff963916"
        occurred_at: "2026-10-28T02:57:29.137Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 8
      -
        command_digest: "sha256:3e180ab5eea19f30fd44cfbdeb67afeeddf6497860c671397e3bfeb98325925d"
        id: "result:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654"
        occurred_at: "2026-10-28T02:57:40.546Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 9
      -
        command_digest: "sha256:b4ef39038c9e2ecd04f5f04940c9e97764d6443eacc4ce23cef313d3465bf82b"
        id: "kernel_work_item_inspection_required:sha256:5d9f828e757348ba48261b62f18954a44aeeb8269e0bc00d74357c8e05904601:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5d9f828e757348ba48261b62f18954a44aeeb8269e0bc00d74357c8e05904601:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T02:57:50.236Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 10
      -
        command_digest: "sha256:e52620e0eae1d9707acfac9dd03ef47e86c4861528e8b2dd74fb8ba1df394b3f"
        id: "validation:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:35249d4633697157c4ee31a4ce3a9160f57777ca8656a75d1c966d34e9a53654"
        occurred_at: "2026-10-28T02:58:10.148Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 11
      -
        command_digest: "sha256:13046396894235ead5d80dc20a53b0102ecee9ea82153d21afb2a99c69a52e19"
        id: "work-item-resume:sha256:2b6f73bfcb1b673d9f0b3b0c2b474113a33b07b9358823cb7d72325aa3deaa45:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "work-item-resume:sha256:2b6f73bfcb1b673d9f0b3b0c2b474113a33b07b9358823cb7d72325aa3deaa45"
        occurred_at: "2026-10-28T03:00:48.603Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 12
      -
        command_digest: "sha256:bdd72c7f55840d7c1bd6ae5da5c72a54970ae2c0b2eefe600ed6eb1e8152330c"
        id: "amend:sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:c59e4df223bc094d811516fb52f344186bf7690264ccadd1356703105045b34d"
        occurred_at: "2026-10-28T11:24:43.381Z"
        payload_digest: "sha256:b15590955f1bf684e87c1de91d4294438c4366f8c657818652f9d8a39b168887"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 13
      -
        command_digest: "sha256:4f25ed2711637a9976b5f6c1f4abd85f1e222c20e0aec1ef9e3199ce0cefc5f3"
        id: "sha256:14b3a3a7a5b9f0317708d621bc3ed305e28de7787362a61d8cada5029b4594e6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:14b3a3a7a5b9f0317708d621bc3ed305e28de7787362a61d8cada5029b4594e6"
        occurred_at: "2026-10-28T11:24:59.450Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 14
      -
        command_digest: "sha256:0cb68af787ccc389e00c0e1b779e3cd263e087cdd82cc5f0c87ca4e922905ee2"
        id: "kernel_work_item_claim_required:sha256:bd5ed2ae24ca8075e6c2a068c0849b8a9ef17aa198573f4c79e367d90527513b:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:bd5ed2ae24ca8075e6c2a068c0849b8a9ef17aa198573f4c79e367d90527513b:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T11:25:50.982Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 15
      -
        command_digest: "sha256:ee794c1bfccf96eefbdb6fd0314a0bcfeb01568c86adac758d14f1a74c0ba165"
        id: "kernel_work_item_execution_required:sha256:cad797f5352c519f62139063f1d30c1a304efcbbe9e5dc88bc37492e58320127:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cad797f5352c519f62139063f1d30c1a304efcbbe9e5dc88bc37492e58320127:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T11:26:09.174Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 16
      -
        command_digest: "sha256:e37981d27b023960865d9db46f422a2368aea1e45770160ccab012c81decd8e1"
        id: "result:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf"
        occurred_at: "2026-10-28T14:35:30.542Z"
        payload_digest: "sha256:eedbc286ef237c60234d64f29e534510c94489a4f483380ce9de473cbe942b51"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 17
      -
        command_digest: "sha256:97768c277b8d9d958358009d82c231f865923c9aa2d2d4000a22952ec0bc5149"
        id: "kernel_work_item_inspection_required:sha256:8a5ce17285d5db1cf34dcbe85bcab0dd505da19a6d9d4446773cdcdf81669277:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8a5ce17285d5db1cf34dcbe85bcab0dd505da19a6d9d4446773cdcdf81669277:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T14:35:48.970Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 18
      -
        command_digest: "sha256:03e9f428fca74b4ffb333428062a62dd48891d3cd66729e8b5093fb2f15774c7"
        id: "validation:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a643192d161711c15de9800fae700fb498e4973e1bc84add66909bba408743cf"
        occurred_at: "2026-10-28T15:19:48.997Z"
        payload_digest: "sha256:85ac794df99668560599f8e5dd06f6e2c717b04a8d4a4dcb5e659b98b66a25a2"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 19
      -
        command_digest: "sha256:0349a506575621d17b115946546faa2f0d7cc27425640ca82c34d3782d2818b4"
        id: "validation-resolution:sha256:ecb80ef4347576e61c5d5836f5bc053de134815bff35e9f8ff3e94910ee70268:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ecb80ef4347576e61c5d5836f5bc053de134815bff35e9f8ff3e94910ee70268"
        occurred_at: "2026-10-28T15:19:55.801Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 20
      -
        command_digest: "sha256:4e15740a9ee93871cf20ee67658a242a3de66fb2ff6d0c83532b9f35c7b65053"
        id: "kernel_work_item_rework_claim_required:sha256:115cdad9270cba4c89d44e39e5aa7a8508f0bdcb0bee4922660b075c74257fb9:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:115cdad9270cba4c89d44e39e5aa7a8508f0bdcb0bee4922660b075c74257fb9:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T15:20:06.998Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 21
      -
        command_digest: "sha256:1782815d75254c3060b4cbf10d332a7f28a9a03f78d13f19cbf4571ec1184646"
        id: "kernel_work_item_execution_required:sha256:b0ff006344baebda81fa50c4a25fa01b34aad0a6f2cc18fcb5063d0d1e973c00:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b0ff006344baebda81fa50c4a25fa01b34aad0a6f2cc18fcb5063d0d1e973c00:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T15:20:16.504Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 22
      -
        command_digest: "sha256:9d0eb5715bae705f53e2e6938c1f9a532dc43bc854532d63e321336e909cdca1"
        id: "semantic-stop:sha256:9a25eefff326740c41a69c55937e8a6f001e6de7d0c871174311cda5bfb1cf93:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:9a25eefff326740c41a69c55937e8a6f001e6de7d0c871174311cda5bfb1cf93"
        occurred_at: "2026-10-28T15:24:30.035Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 23
      -
        command_digest: "sha256:2f29e3d2e68edf98c4f82dad455309238abc943fc0d6428388eeb8cf51dae37b"
        id: "scope-request:sha256:d9b45ddf8be7880588f7a07c0d4ac258320cb0db3bd3a8e777c68d6d59a7ca76:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:d9b45ddf8be7880588f7a07c0d4ac258320cb0db3bd3a8e777c68d6d59a7ca76"
        occurred_at: "2026-10-28T15:24:59.809Z"
        payload_digest: "sha256:518179a6e7ae824e9cc5c25eebeb1a86190e5b3b1aedbafae875112ba98dba1e"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 24
      -
        command_digest: "sha256:aaa7e5d6dfaadb38b5ad16f1b78b46e7ccc21bc5da23d93664d3b5da9e5e7b06"
        id: "plan:sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4"
        occurred_at: "2026-10-28T15:25:26.248Z"
        payload_digest: "sha256:641bfb1a67e1f4f107db6266feca8872724f160533f200c0ff931c8dfac5e8c7"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 25
      -
        command_digest: "sha256:e9a8db0710fe53604a3ff187d423a871fc509f06154e540695ac7461818d9fa2"
        id: "sha256:8962380f1db97f06fd1c6da380aebbb38d81404c2d1b7c50a67280e3ed54ca11:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8962380f1db97f06fd1c6da380aebbb38d81404c2d1b7c50a67280e3ed54ca11"
        occurred_at: "2026-10-28T15:26:20.241Z"
        payload_digest: "sha256:4299557eaa3e86724c22f50b65618a207fc8d9ef31e750d4ef2e814cfde221cf"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 26
      -
        command_digest: "sha256:bce23fce9b6c94de38cd072f849ed806cac64bada1f7e56cf33c97043a2de432"
        id: "kernel_work_item_claim_required:sha256:281303de1ebb88dce9d381c184ee2737b84215bc9b70f90d9c47c19aaf6f5443:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:281303de1ebb88dce9d381c184ee2737b84215bc9b70f90d9c47c19aaf6f5443:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T15:26:42.639Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 27
      -
        command_digest: "sha256:d96b5d36cb16e3afe7e70705d8c2a13a843e16ea83f71eea7ebd6aab2914a5d6"
        id: "kernel_work_item_execution_required:sha256:6b0adcbac95e878d182f1e3ce7c2f16d9326e8b5f55b3ae83b77aead0ddd6abe:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6b0adcbac95e878d182f1e3ce7c2f16d9326e8b5f55b3ae83b77aead0ddd6abe:sha256:6df4bd890601cba51427afba7dc08c3a0bce00aca704b78eb289d090614b2a72"
        occurred_at: "2026-10-28T15:26:54.893Z"
        payload_digest: "sha256:23532dbce000d1f0f79e31749079afe2ef833ccc76bde8a0b5d96138f25c1d3e"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 28
      -
        command_digest: "sha256:494ac97c3246ff8e090fb09aaa4778924b5c0bffac60e3fd5e01e129ce471ec5"
        id: "sha256:cf572745d3d1a25ed682a2ff22a430d7bba2c7750a9114549d9e9222d59547d0:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cf572745d3d1a25ed682a2ff22a430d7bba2c7750a9114549d9e9222d59547d0"
        occurred_at: "2026-10-28T15:30:29.225Z"
        payload_digest: "sha256:9bdd9c008229f5159e6574f270504d3c53c0148537448e60eea0692538aa3492"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 29
      -
        command_digest: "sha256:4a82a5b68171503a11b59326ab7cc4106adcfa4a416c396ab909d31333c6a097"
        id: "result:sha256:62a5ac636c39a2376c9507337df11f8915100a9204a65ded2ba9cd3ebb615371:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:62a5ac636c39a2376c9507337df11f8915100a9204a65ded2ba9cd3ebb615371"
        occurred_at: "2026-10-28T15:30:44.480Z"
        payload_digest: "sha256:42169c66b4b203818169e58e4566422668fdc8d5c8685870ae51bec9e09a08fe"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 30
      -
        command_digest: "sha256:b25d6e25617eb4b889111bc1dbdb4729fc2361df9db19260069679207e1e926d"
        id: "kernel_work_item_inspection_required:sha256:db3520b95a1fc86199172eede04ce6cf582bfd1a61686b79094cbbb8c3dde3f4:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:db3520b95a1fc86199172eede04ce6cf582bfd1a61686b79094cbbb8c3dde3f4:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
        occurred_at: "2026-10-28T15:30:55.658Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 31
      -
        command_digest: "sha256:415b81e8c68712647125ad19800ca7a4a6af8d28fe055396f626698c030cc7a0"
        id: "validation:sha256:bdd41946238f481e2a8329d1d28e4f1a61bfbdef7856e9f285669f07ba04914c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:bdd41946238f481e2a8329d1d28e4f1a61bfbdef7856e9f285669f07ba04914c"
        occurred_at: "2026-10-28T16:12:30.591Z"
        payload_digest: "sha256:aca6760d25c1ff1f415d901ea3ee4f1eb6c8efc8872f4593dd8cd6305360ac8b"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 32
      -
        command_digest: "sha256:ad7e5520f79e613795ee8db58d8281932fe7b41415c68029c98f713e3ec901b6"
        id: "validation-resolution:sha256:0d305f28a9d6c96fbd210050cdf16f739473d03bee5b532e4305b6e24d0646be:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:0d305f28a9d6c96fbd210050cdf16f739473d03bee5b532e4305b6e24d0646be"
        occurred_at: "2026-10-28T16:12:36.925Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 33
      -
        command_digest: "sha256:c71497e841521ddde2a8be9025be920e7562966cdbf0732347529cef42758292"
        id: "final-validation:sha256:2ecaea7b0a1e4eea8c2acc77a6e7c10fa57dd99604bf09ede4164cdf911bbe5d:33:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:2ecaea7b0a1e4eea8c2acc77a6e7c10fa57dd99604bf09ede4164cdf911bbe5d:33"
        occurred_at: "2026-10-28T16:57:48.650Z"
        payload_digest: "sha256:47ab549de16a4876fbae4cea5e564c39ff5995dfd8f632ce4a042d9cdaba4c3c"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 34
      -
        command_digest: "sha256:c859ef12906f0c1330879702d7b8444687cf8392a139f1a1659d24c8e3dd210c"
        id: "kernel_task_completion_required:sha256:94d6cf4b1368be52b6390ce5534746b9e24d229a2f590068b462f539918c7c94:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:94d6cf4b1368be52b6390ce5534746b9e24d229a2f590068b462f539918c7c94:sha256:a74f32eb262df4414d76235974017edecf623fa6856be63a270daecd5c76b8c6"
        occurred_at: "2026-10-28T16:58:02.618Z"
        payload_digest: "sha256:6a70441da398a2070b7e909f81f417ba0d15387c071b6432843ecc1b09e58970"
        task_id: "202610280201-Z9MAPZ"
        task_revision: 35
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow exact provider update after failed integration

When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.

## Scope

- In scope: When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.
- Out of scope: unrelated refactors not required for "Allow exact provider update after failed integration".

## Plan

1. Execute approved WorkItem exact-provider-update-successor.

## Verify Steps

PLANNER fallback scaffold for "Allow exact provider update after failed integration". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow exact provider update after failed integration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-28T16:57:51.959Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d6f7b5e6a7b52e1ef3f308137708af2b9a827de401f05d396b49d22a99d22586, input_digest=sha256:bd80e9f179cc36dc8714a623df52c2ddd3495851f01836446ce594bdd8a2ec32

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check full_regression

Check: real_e2e
Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts --config vitest.workspace.ts
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610280201-Z9MAPZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610280201-Z9MAPZ Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:9a03e5010fd03b47046c92058e6631fe10fd6685caed4745212948b4c9e86da4
- policy_digest: sha256:1469f9511222e1944f6256b66fc7f77bb4b75c356cb828fd2d59456cf84872e1
- capability_digest: sha256:bef198ce85876946befe86b5161af14a30b51ef23fe9404d9dd6bb67e963633f
- checks_digest: sha256:77a77967daf668ba1b873e8dbce02beeeec46cda7540f803babced036c3cf852
- identity_digest: sha256:a9c3053bbba3ab07b3d1150a580398354e2e0d98a381a296ea3fc60d40981e57

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610280201-Z9MAPZ
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
