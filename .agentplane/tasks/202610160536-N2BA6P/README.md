---
id: "202610160536-N2BA6P"
title: "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "generic-worktree-topology"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run test:project agentplane -- packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-22T18:40:01.556Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-22T18:26:17.385Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:df8962832f1a0107ba032618507b69669ab544075906ab0233ab89ef6e5a5b66"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-22T18:26:17.385Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "cd47db2a8255298dbbe9b5feb7e4b3d760fc10eb"
  review_identity_digest: "sha256:83061eba54ef3d6fd20657092abb57efbf8c9becfa76000eb6522dcb1c4438a5"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610160536-N2BA6P/634fe6cfc0446fbb43e7580fd65ad3aaa3846a95e80d14566542d5bb901e2a09/quality-report.json"
  findings:
    - "The change is confined to worktree.prepare routing plus topology and regression tests. It retains the routed task ID and frozen base ref/SHA when calling cmdWorkStart from the canonical primary checkout."
    - "The resolver requires the route checkout to equal the registered base, a unique primary and base registration, the admitted base branch, and equal Git common directories. Existing cmdWorkStart checks still reject nested creation and validate the admitted frozen base SHA."
    - "The real CLI regression advances a task from an internal base ahead of stale primary, checks a completed worktree.prepare receipt, confirms sibling placement and exact base commit ancestry, and proves primary HEAD unchanged. Its negative route/base case preserves Git worktree list and journal."
    - "Native scoped check passed 26 tests across two agentplane files; typecheck and diff check passed. The CLI-core file was not selected by that project, so I independently ran its single stale-primary test in cli-core: 1 passed, 4 skipped, exit 0."
    - "The fresh N2BA6P native validation packet reports all three declared commands passed on the same implementation commit cd47db2a8255298dbbe9b5feb7e4b3d760fc10eb; git diff --check HEAD^ HEAD also passed again."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
          - "packages/agentplane/src/commands/shared/worktree-topology.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:93a19e0f1082ec9c20d227579c2d6334fa88714dc93a0de67c7de5f828c2cc98"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/worktree-topology.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/worktree-topology.ts"
        - "effect_public_api"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
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
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "cd47db2a8255298dbbe9b5feb7e4b3d760fc10eb"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-16T05:36:26.423Z"
doc_updated_by: "CODER"
description: "Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround."
sections:
  Summary: |-
    Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree

    Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.
  Scope: |-
    - In scope: Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.
    - Out of scope: unrelated refactors not required for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree".
  Plan: |-
    1. Execute approved WorkItem prepare-worktree-from-canonical-primary.
    2. Execute approved WorkItem final-correction-31eded3c9109.
  Verify Steps: |-
    PLANNER fallback scaffold for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:acccb0f28760a3851473633e6f597a17c781d7b31873b4f1bf4cfbd398163511"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610160536-N2BA6P/634fe6cfc0446fbb43e7580fd65ad3aaa3846a95e80d14566542d5bb901e2a09/quality-report.json"
    findings:
      - "The change is confined to worktree.prepare routing plus topology and regression tests. It retains the routed task ID and frozen base ref/SHA when calling cmdWorkStart from the canonical primary checkout."
      - "The resolver requires the route checkout to equal the registered base, a unique primary and base registration, the admitted base branch, and equal Git common directories. Existing cmdWorkStart checks still reject nested creation and validate the admitted frozen base SHA."
      - "The real CLI regression advances a task from an internal base ahead of stale primary, checks a completed worktree.prepare receipt, confirms sibling placement and exact base commit ancestry, and proves primary HEAD unchanged. Its negative route/base case preserves Git worktree list and journal."
      - "Native scoped check passed 26 tests across two agentplane files; typecheck and diff check passed. The CLI-core file was not selected by that project, so I independently ran its single stale-primary test in cli-core: 1 passed, 4 skipped, exit 0."
      - "The fresh N2BA6P native validation packet reports all three declared commands passed on the same implementation commit cd47db2a8255298dbbe9b5feb7e4b3d760fc10eb; git diff --check HEAD^ HEAD also passed again."
    implementation_commit: "cd47db2a8255298dbbe9b5feb7e4b3d760fc10eb"
    implementation_tree: "44fc3e86126a854ebd222f355bad6650bfbb7408"
    projected_at: "2026-10-22T18:26:17.385Z"
    review_identity_digest: "sha256:83061eba54ef3d6fd20657092abb57efbf8c9becfa76000eb6522dcb1c4438a5"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:df8962832f1a0107ba032618507b69669ab544075906ab0233ab89ef6e5a5b66"
    work_order_id: "sha256:b44d958b69bebc341f442bcc7f857374e32764a5c321590c50d13e5f3f1bd2a5"
  task_execution_context:
    base_ref: "main"
    base_sha: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1ac8821ec9dfaf458375047513d22645d59e092887fca5cdf3f3805c888299ac"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:21bc4d56bcf89dd019b331d7b5f368b301349ea6e9d6cbcedfb961c31c59eeae"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "public_api"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            task_id: "202610160536-N2BA6P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
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
            digest: "sha256:00cfa54b76077fd74961d5a0cce085d21ef75f9f3f8cfcd3bb78084d6c878d01"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:21bc4d56bcf89dd019b331d7b5f368b301349ea6e9d6cbcedfb961c31c59eeae"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:1ac8821ec9dfaf458375047513d22645d59e092887fca5cdf3f3805c888299ac"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            task_id: "202610160536-N2BA6P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:a60818b9d4e8daa0b104b574f51064dcf2aa83d7c7d10091b310bc373365ee25"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b4e19980412a86a02aee85f1a2c2a5c73446f09c30cc64b20867764bdee961ab"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:21bc4d56bcf89dd019b331d7b5f368b301349ea6e9d6cbcedfb961c31c59eeae"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:00cfa54b76077fd74961d5a0cce085d21ef75f9f3f8cfcd3bb78084d6c878d01"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            task_id: "202610160536-N2BA6P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            evidence_digest: "sha256:a9a85f75fecfe9e0e0c74cdb315b2366033bd7f715117c089cf53d0f7e574489"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:16ca130706aa199b62a091ccb71b1f9aeeffef9ce753ecc15e28b60486a6906a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:6da505b8cd6954a6de908046c3766f54157c395cee8d9cbbe9d9b492fd80a6ab"
            plan_revision: 2
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b4e19980412a86a02aee85f1a2c2a5c73446f09c30cc64b20867764bdee961ab"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
              - "packages/agentplane/src/commands/shared/worktree-topology.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            task_id: "202610160536-N2BA6P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:e440d2a68943d65f59f4803199789c276580b67223581c563e2dccdcc411f1fd"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:fd2acf765bd1f8e54c7a7a282af242dd3baab8efdf5b9d21a7e5ab99e7a74ad4"
        digest: "sha256:6da505b8cd6954a6de908046c3766f54157c395cee8d9cbbe9d9b492fd80a6ab"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0180f59612ff7349b57ebebcb8dd0135e5c5bfdaffb0f8cda370f7d0672bffe2"
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
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
            expected_outputs:
              - "topology-validated-primary-selection"
              - "preserved-frozen-base-intent"
              - "stale-primary-native-regression-evidence"
            id: "prepare-worktree-from-canonical-primary"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:838e2ef8e229ff6a826d3d40d1fb848f19c5d04c32e8e5e613e621686d75c0f4"
            depends_on:
              - "prepare-worktree-from-canonical-primary"
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
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            expected_outputs:
              - "final-correction-31eded3c9109-evidence"
            id: "final-correction-31eded3c9109"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610160536-N2BA6P"
      intent_digest: "sha256:21aebc56155bcb9cdd1af8d8416fd7b54e942496628faf938242ef3155fd26a4"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:6da505b8cd6954a6de908046c3766f54157c395cee8d9cbbe9d9b492fd80a6ab:
          after_revision: 14
          aggregate_digest: "sha256:36c5a0f6a805c15e20c19e496644a56c3be1d2f9d1f24b8c2bce8d659cc15704"
          before_revision: 13
          command_digest: "sha256:578eb0bc3d32544221e387f75ec9e6b96def1915db1e92f530ae42219c911c59"
          effect_ids: []
          event_digests:
            - "sha256:8836ea24913e69aa2c2211f85b773c5bbcfe98fa8740698c4682e2c2e7f7fc47"
          mutation_id: "amend:sha256:6da505b8cd6954a6de908046c3766f54157c395cee8d9cbbe9d9b492fd80a6ab"
        capture:202610160536-N2BA6P:
          after_revision: 1
          aggregate_digest: "sha256:cfa71e0fa59c0659fe5d4c9e768026c2b6ea78f78485590b730e6d7a835f6800"
          before_revision: 0
          command_digest: "sha256:b93b23b3282b932ec1ed886c9f2f9e3afe30f20b5fb8f41821635caa05ee1fa3"
          effect_ids: []
          event_digests:
            - "sha256:9313e16ef61ac92c5df50585ff591d8a8f98d7f1d226ea1c6f442256d86acbc1"
          mutation_id: "capture:202610160536-N2BA6P"
        final-validation:sha256:31eded3c9109677f22113d958fa058be5fb6f3aa7b728d1f4300747aadbfb43e:12:
          after_revision: 13
          aggregate_digest: "sha256:579e8999f1ae3270aa970f84582d49e6f5ff231bb278a0f99c991bfb98c5e79d"
          before_revision: 12
          command_digest: "sha256:00b2edfc614c892572008479daa50e79091e4421a5b66b7c970922d3c3de1ba8"
          effect_ids: []
          event_digests:
            - "sha256:75084d870520effc0225c4ec28399b6e2e2e289e4680b2826a340e35ebfe3354"
          mutation_id: "final-validation:sha256:31eded3c9109677f22113d958fa058be5fb6f3aa7b728d1f4300747aadbfb43e:12"
        kernel_work_item_claim_required:sha256:5e103fd665cf06ef4d2c5a86b763f795dc9a1c3559b92fbb01f35b31a84ecfe4:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233:
          after_revision: 16
          aggregate_digest: "sha256:9d5e687831b7c57fd9f76c6bcfa1da0c84d15cd2089c653c6cfdba0ced812b85"
          before_revision: 15
          command_digest: "sha256:8f569bb046a17f4946f99291997ab756f1f8bcbb4d2b746c01ed182ce1f0c070"
          effect_ids: []
          event_digests:
            - "sha256:958e5d22a2433355b3b1239aec39aa4983d6d6c9555119b7c8d7fea7364dd805"
          mutation_id: "kernel_work_item_claim_required:sha256:5e103fd665cf06ef4d2c5a86b763f795dc9a1c3559b92fbb01f35b31a84ecfe4:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
        kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 5
          aggregate_digest: "sha256:bab1e55ee1d49d7e74655d43362369c74903ca07ac0b9643a4418bdb6c18f948"
          before_revision: 4
          command_digest: "sha256:e9aa4b0e1fe3dc0040061683eb9f0621e5221dcd9a684c467c6c24ff53aa27cc"
          effect_ids: []
          event_digests:
            - "sha256:bbc30c8c10ce483d96d54da620c3fd494ae9924badcd622e6033e00e7a23c409"
          mutation_id: "kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:237cda654b97ce69845b20b6320736c9b0c7e8417d3cf30b6c1f5a50f18bfac3"
          before_revision: 6
          command_digest: "sha256:a4b59662e58411c380efeaaa4317e4cb69714ccad967f11e45bb48aa50cd1aa6"
          effect_ids: []
          event_digests:
            - "sha256:4c29ef17c4c14b16c5daffb197aa7176d3321a1b006eed2f98fcbfc7ce812d03"
          mutation_id: "kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_execution_required:sha256:b2feeee4936d30fd027ec879d3fdd08b21c9977d6f7d37255c29ae0abb61313b:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233:
          after_revision: 17
          aggregate_digest: "sha256:0133d1c16bafec0d852c4fb3572ee611e7e41194cfc82a220a341af3f20b18d1"
          before_revision: 16
          command_digest: "sha256:b1b8dbe1f47ef3cd8f4ced55fa39a989e038a072377b89ce564f6fc219d82e3e"
          effect_ids: []
          event_digests:
            - "sha256:1573d9ba3ecddb9ae511ca1dab55e80ac3a09930f4b8919a0a8db29d96a61446"
          mutation_id: "kernel_work_item_execution_required:sha256:b2feeee4936d30fd027ec879d3fdd08b21c9977d6f7d37255c29ae0abb61313b:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
        kernel_work_item_inspection_required:sha256:b8ae941195f06e5c5a5316bb7aaaee4a120e06b327ae155d387e4b1d2fcc17ca:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233:
          after_revision: 10
          aggregate_digest: "sha256:afb01422e7d257e9afc6d7e7c1806496acd1a1daf3e3aed8c98a5c67a36cf5be"
          before_revision: 9
          command_digest: "sha256:acc6dc1b6d391513196d03686575696eb7a0e6041dba8161aeb5630f6b6b6782"
          effect_ids: []
          event_digests:
            - "sha256:8aba94988fe04993addbda4fd7f9461449a3a907203ef51b0b10d12c32ead6de"
          mutation_id: "kernel_work_item_inspection_required:sha256:b8ae941195f06e5c5a5316bb7aaaee4a120e06b327ae155d387e4b1d2fcc17ca:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
        kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:
          after_revision: 4
          aggregate_digest: "sha256:eecdd903064bf3d62c7527c9424e2db4f8d8467fd3f9d5991bfeca90a9381da6"
          before_revision: 3
          command_digest: "sha256:d540d6e1b99a4bd6699e0b7fda304c6d6d751260eb7b593828d098175e022ef5"
          effect_ids: []
          event_digests:
            - "sha256:6b3fad3afdf53caecfc6b7c03a12ed2da0bc7cdb6e240f11a8aec2a90a45a790"
          mutation_id: "kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd:
          after_revision: 2
          aggregate_digest: "sha256:78aca2400ca04e6c508e81d9c1e8054f8d590e643340d789b96762c7ba95c16a"
          before_revision: 1
          command_digest: "sha256:1b45440ab8ba1ef50240bd020e73b7dee42187ecd505f96e36b9a09d8c714598"
          effect_ids: []
          event_digests:
            - "sha256:79c508e523e7ed274da25f6bd8d0b5091a930f6a25dc4d4845497805f3be381c"
          mutation_id: "result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd"
        result:sha256:b44d958b69bebc341f442bcc7f857374e32764a5c321590c50d13e5f3f1bd2a5:
          after_revision: 9
          aggregate_digest: "sha256:4738598ea05e889ca6320ffaa47099b4b64d9666873841fed380ea36193be691"
          before_revision: 8
          command_digest: "sha256:36ebddb3041d35bcc78244b5d1bdfeb92d6b5cf705765bae03a0d758ac15d016"
          effect_ids: []
          event_digests:
            - "sha256:8f09a94a0b9fd6bd5eafbfb9f0a536cad5480bf34c0d5467468afc506ac94c1d"
          mutation_id: "result:sha256:b44d958b69bebc341f442bcc7f857374e32764a5c321590c50d13e5f3f1bd2a5"
        sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35:
          after_revision: 6
          aggregate_digest: "sha256:175c6cc0d7229a337c6b270d3904b2c218e216f8b26fa251d2057564c113b983"
          before_revision: 5
          command_digest: "sha256:2194c2d1b36c0f260b6668e9c89d3106b0c531d151201dd7a567f431c4334dff"
          effect_ids: []
          event_digests:
            - "sha256:2f058b820a071fd1b4c3064370f9c336827b0ca8eb3c7889b6b46b9ff5235abf"
          mutation_id: "sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35"
        sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48:
          after_revision: 3
          aggregate_digest: "sha256:059e9a69fc849c8081470fb484c5b51ccddd67264b374d3292d1d10acb89b33e"
          before_revision: 2
          command_digest: "sha256:b741718346ef09c6e1e2177b3449eccd6cdd32a2175200ed7f2460414e3420ec"
          effect_ids: []
          event_digests:
            - "sha256:55fd604b8d68b56cb74a390c164616f3b9cb3ebff0b5c55999a917c78c3aa19a"
          mutation_id: "sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48"
        sha256:95fddd96ebeb83f61ca6f553024fdf60488099bbaf4cb6bb0318abc7d63e8d98:
          after_revision: 15
          aggregate_digest: "sha256:d0987b940ebf14fe3d70cded2a7380448d6d06bc33b72934502cf567b213d388"
          before_revision: 14
          command_digest: "sha256:96aca360b091aef8777e12d5318542f4ac583d583a6d856d975478d0aac02ad3"
          effect_ids: []
          event_digests:
            - "sha256:1307baaa9a04571c96a2eae386e24d3b46ca436c520301a9d134e51489fd6640"
          mutation_id: "sha256:95fddd96ebeb83f61ca6f553024fdf60488099bbaf4cb6bb0318abc7d63e8d98"
        sha256:ea7d00b2edb4d087954cb84750d02882563b0dffc2018b48c562d2e3bfd830f6:
          after_revision: 8
          aggregate_digest: "sha256:557d20d440e58071493c82b2d5c60b8bf023f0a92b892f2a1916b2d053c8c38e"
          before_revision: 7
          command_digest: "sha256:adb0a43ad011e56f015310462cd3ae639f7e776120e47ee671886c016a766514"
          effect_ids: []
          event_digests:
            - "sha256:7a44424c1165cb0604014792b5fc080f59933b8f2c1ddfde395453ebd95858b3"
          mutation_id: "sha256:ea7d00b2edb4d087954cb84750d02882563b0dffc2018b48c562d2e3bfd830f6"
        validation-resolution:sha256:88cba767f6860cd681be9e3e2a237f73c6f79fd25ceaf51b882cfeafd263e3ab:
          after_revision: 12
          aggregate_digest: "sha256:7b902e34b1501dc9e7acd49ad10014055cc7f0eff362b9d6db1b2344b17bde2f"
          before_revision: 11
          command_digest: "sha256:2c4b6def992a19e2c8d286274fedbe79562b18724291917b18bdbd5a80e61b76"
          effect_ids: []
          event_digests:
            - "sha256:9183693da9da91be1586d06a6b380eb7b9e308ff7c1285cda7ac58d7d15fc77d"
          mutation_id: "validation-resolution:sha256:88cba767f6860cd681be9e3e2a237f73c6f79fd25ceaf51b882cfeafd263e3ab"
        validation:sha256:634fe6cfc0446fbb43e7580fd65ad3aaa3846a95e80d14566542d5bb901e2a09:
          after_revision: 11
          aggregate_digest: "sha256:37114030230564a585f317ac00c44e7a95a97eba3b24da8e2fa08e959d2d1515"
          before_revision: 10
          command_digest: "sha256:eccc84b9962dd561e5dfa672259ad8597568b4c2440fea240e3122829a5cba93"
          effect_ids: []
          event_digests:
            - "sha256:39e1bd5bf7ee5cdb2afe8b1782987d70a8a843d3295e5392bd9a221359367b88"
          mutation_id: "validation:sha256:634fe6cfc0446fbb43e7580fd65ad3aaa3846a95e80d14566542d5bb901e2a09"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:482a605eab160fe8c8227e95e3f0f2170e91b9229d858bcfce259bf04eb2512f"
          digest: "sha256:21bc4d56bcf89dd019b331d7b5f368b301349ea6e9d6cbcedfb961c31c59eeae"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:0180f59612ff7349b57ebebcb8dd0135e5c5bfdaffb0f8cda370f7d0672bffe2"
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
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                  - "packages/agentplane/src/commands/shared/worktree-topology.ts"
                  - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              expected_outputs:
                - "topology-validated-primary-selection"
                - "preserved-frozen-base-intent"
                - "stale-primary-native-regression-evidence"
              id: "prepare-worktree-from-canonical-primary"
              optional: false
              required_inputs: []
      revision: 17
      schema_version: 1
      state: "ACTIVE"
      work_items:
        final-correction-31eded3c9109:
          attempt: 1
          claim_id: "sha256:4e9fe289cdbe01f4504d0419a2ea4dd231fcf6829d898f6b7cd7a1afdbec3c65"
          definition:
            contract_digest: "sha256:838e2ef8e229ff6a826d3d40d1fb848f19c5d04c32e8e5e613e621686d75c0f4"
            depends_on:
              - "prepare-worktree-from-canonical-primary"
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
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
            expected_outputs:
              - "final-correction-31eded3c9109-evidence"
            id: "final-correction-31eded3c9109"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
        prepare-worktree-from-canonical-primary:
          attempt: 1
          claim_id: "sha256:2f078f135c70021454f9648942a3251379186078b9e671e18c750cc47790bbee"
          definition:
            contract_digest: "sha256:0180f59612ff7349b57ebebcb8dd0135e5c5bfdaffb0f8cda370f7d0672bffe2"
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
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.ts"
                - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
            expected_outputs:
              - "topology-validated-primary-selection"
              - "preserved-frozen-base-intent"
              - "stale-primary-native-regression-evidence"
            id: "prepare-worktree-from-canonical-primary"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:02531eab5835d7647d0834779be11540a6411b73ec70d27ae6067ece4428c840"
              id: "topology-validated-primary-selection"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
              task_id: "202610160536-N2BA6P"
              work_item_id: "prepare-worktree-from-canonical-primary"
            -
              attempt: 1
              digest: "sha256:6f79eae9953ea98cd7aaf1327a03c1cea8bda2c90f4bbee33b330b291cff47b1"
              id: "preserved-frozen-base-intent"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
              task_id: "202610160536-N2BA6P"
              work_item_id: "prepare-worktree-from-canonical-primary"
            -
              attempt: 1
              digest: "sha256:66e426f8d246ed9b6c6d6ca7961dc4410ffe23653c4626c9b311597323476243"
              id: "stale-primary-native-regression-evidence"
              kind: "test"
              plan_revision: 1
              repository_fingerprint: "sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
              task_id: "202610160536-N2BA6P"
              work_item_id: "prepare-worktree-from-canonical-primary"
          result_digest: "sha256:555bb3ff831a883c8b6094aadc42d3ced564548bb0bbfa3bde6c9a0025bd7135"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:2bc93edc1e31464c44ccde2181d2473714ddc509e8391794a87315c95842b15c"
              - "sha256:83061eba54ef3d6fd20657092abb57efbf8c9becfa76000eb6522dcb1c4438a5"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:59ca7f41806fed0c8f6b2cb43ac0f6cd53fe3605c290436362bd774cb6945cdb"
              environment_digest: "sha256:f38f14c55ddd0b1c20e98cc7807ba979002a2656341a955082e953f3756c9fb4"
              implementation_identity: "sha256:555bb3ff831a883c8b6094aadc42d3ced564548bb0bbfa3bde6c9a0025bd7135"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-22T18:26:17.385Z"
            status: "PASSED"
    digest: "sha256:0eb3c3ea47af12815337df1c25c7c3c2cf605d3860f4ef00e494c8cd51c05491"
    documents:
      contracts:
        sha256:0180f59612ff7349b57ebebcb8dd0135e5c5bfdaffb0f8cda370f7d0672bffe2:
          acceptance_criteria:
            - "A registered internal development base can create a sibling task worktree from the canonical primary even when primary main is behind that base."
            - "The created branch derives from the frozen base SHA, not the stale primary HEAD; semantic inspection and task authority remain bound to the registered base."
            - "Foreign common directories, ambiguous primary registration, task/base mismatches, and nested task-worktree creation are rejected before a Git mutation or success receipt."
            - "Other branch supervisor operations retain their existing route and authority semantics."
            - "The regression exercises native task advancement and real Git worktree registration, not only a mocked cmdWorkStart call."
            - "The test asserts successful operation receipt, exact base ancestry, canonical sibling placement, and unchanged primary HEAD."
            - "A negative topology case confirms no nested or foreign worktree is created and no success receipt is persisted."
          objective: "For worktree.prepare only, resolve the canonical primary checkout in the same Git common directory as the route's registered internal base. Execute cmdWorkStart from that primary checkout while retaining the exact task ID, base ref, base SHA, admission, and operation receipt from the original route. Reject foreign, missing, duplicate, or nested topology. Add a real native stale-primary lifecycle regression."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
            - "bun run typecheck"
            - "git diff --check"
        sha256:838e2ef8e229ff6a826d3d40d1fb848f19c5d04c32e8e5e613e621686d75c0f4:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:31eded3c9109677f22113d958fa058be5fb6f3aa7b728d1f4300747aadbfb43e. Read /home/agentplane/workspace/agentplane/.git/agentplane/kernel/exchanges/202610160536-N2BA6P/5d472597393b565bc8993a693949156483c44affbc6ca2fc2d56ae0e8bdd111f/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround."
        objective: "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree"
    events:
      -
        command_digest: "sha256:b93b23b3282b932ec1ed886c9f2f9e3afe30f20b5fb8f41821635caa05ee1fa3"
        id: "capture:202610160536-N2BA6P:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610160536-N2BA6P"
        occurred_at: "2026-10-16T05:36:26.327Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610160536-N2BA6P"
        task_revision: 1
      -
        command_digest: "sha256:1b45440ab8ba1ef50240bd020e73b7dee42187ecd505f96e36b9a09d8c714598"
        id: "result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:36aa61cde75d0111faebfb72104758f04ca18537bca375a1a2297d2373c26fdd"
        occurred_at: "2026-10-16T05:38:56.221Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610160536-N2BA6P"
        task_revision: 2
      -
        command_digest: "sha256:b741718346ef09c6e1e2177b3449eccd6cdd32a2175200ed7f2460414e3420ec"
        id: "sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9476acc834a51f13be6fc52dfd52d6914df5267b3782df1f16ff8fcc2bc7eb48"
        occurred_at: "2026-10-16T05:39:08.279Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610160536-N2BA6P"
        task_revision: 3
      -
        command_digest: "sha256:d540d6e1b99a4bd6699e0b7fda304c6d6d751260eb7b593828d098175e022ef5"
        id: "kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5668aa8554f854557d6c8feae964745145e7ebdd77a831a88123866246e49737:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-16T05:39:20.054Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610160536-N2BA6P"
        task_revision: 4
      -
        command_digest: "sha256:e9aa4b0e1fe3dc0040061683eb9f0621e5221dcd9a684c467c6c24ff53aa27cc"
        id: "kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d172ab8ba0e994390ad580aeb1e7663d2ff481a993441ae3eedbbce68697b3f1:sha256:9a28755e2da892fb3a030f3e19c9bfd209658bd6865537bb188e5bddfe048745"
        occurred_at: "2026-10-16T05:39:38.378Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610160536-N2BA6P"
        task_revision: 5
      -
        command_digest: "sha256:2194c2d1b36c0f260b6668e9c89d3106b0c531d151201dd7a567f431c4334dff"
        id: "sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:16ae7b9651f8b30ce11df94dcfe7f5405a775be585aa08ab941ed655164ddf35"
        occurred_at: "2026-10-16T05:40:29.674Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610160536-N2BA6P"
        task_revision: 6
      -
        command_digest: "sha256:a4b59662e58411c380efeaaa4317e4cb69714ccad967f11e45bb48aa50cd1aa6"
        id: "kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:385e5919dd0419f30261d3ab18041eb862d4770060cd8d6a220c3862b657a37f:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-16T05:40:46.195Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610160536-N2BA6P"
        task_revision: 7
      -
        command_digest: "sha256:adb0a43ad011e56f015310462cd3ae639f7e776120e47ee671886c016a766514"
        id: "sha256:ea7d00b2edb4d087954cb84750d02882563b0dffc2018b48c562d2e3bfd830f6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ea7d00b2edb4d087954cb84750d02882563b0dffc2018b48c562d2e3bfd830f6"
        occurred_at: "2026-10-16T06:01:19.352Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610160536-N2BA6P"
        task_revision: 8
      -
        command_digest: "sha256:36ebddb3041d35bcc78244b5d1bdfeb92d6b5cf705765bae03a0d758ac15d016"
        id: "result:sha256:b44d958b69bebc341f442bcc7f857374e32764a5c321590c50d13e5f3f1bd2a5:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b44d958b69bebc341f442bcc7f857374e32764a5c321590c50d13e5f3f1bd2a5"
        occurred_at: "2026-10-16T06:01:41.508Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610160536-N2BA6P"
        task_revision: 9
      -
        command_digest: "sha256:acc6dc1b6d391513196d03686575696eb7a0e6041dba8161aeb5630f6b6b6782"
        id: "kernel_work_item_inspection_required:sha256:b8ae941195f06e5c5a5316bb7aaaee4a120e06b327ae155d387e4b1d2fcc17ca:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:b8ae941195f06e5c5a5316bb7aaaee4a120e06b327ae155d387e4b1d2fcc17ca:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
        occurred_at: "2026-10-16T06:01:56.414Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610160536-N2BA6P"
        task_revision: 10
      -
        command_digest: "sha256:eccc84b9962dd561e5dfa672259ad8597568b4c2440fea240e3122829a5cba93"
        id: "validation:sha256:634fe6cfc0446fbb43e7580fd65ad3aaa3846a95e80d14566542d5bb901e2a09:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:634fe6cfc0446fbb43e7580fd65ad3aaa3846a95e80d14566542d5bb901e2a09"
        occurred_at: "2026-10-22T18:26:26.685Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610160536-N2BA6P"
        task_revision: 11
      -
        command_digest: "sha256:2c4b6def992a19e2c8d286274fedbe79562b18724291917b18bdbd5a80e61b76"
        id: "validation-resolution:sha256:88cba767f6860cd681be9e3e2a237f73c6f79fd25ceaf51b882cfeafd263e3ab:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:88cba767f6860cd681be9e3e2a237f73c6f79fd25ceaf51b882cfeafd263e3ab"
        occurred_at: "2026-10-22T18:26:31.835Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610160536-N2BA6P"
        task_revision: 12
      -
        command_digest: "sha256:00b2edfc614c892572008479daa50e79091e4421a5b66b7c970922d3c3de1ba8"
        id: "final-validation:sha256:31eded3c9109677f22113d958fa058be5fb6f3aa7b728d1f4300747aadbfb43e:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:31eded3c9109677f22113d958fa058be5fb6f3aa7b728d1f4300747aadbfb43e:12"
        occurred_at: "2026-10-22T18:37:50.565Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610160536-N2BA6P"
        task_revision: 13
      -
        command_digest: "sha256:578eb0bc3d32544221e387f75ec9e6b96def1915db1e92f530ae42219c911c59"
        id: "amend:sha256:6da505b8cd6954a6de908046c3766f54157c395cee8d9cbbe9d9b492fd80a6ab:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:6da505b8cd6954a6de908046c3766f54157c395cee8d9cbbe9d9b492fd80a6ab"
        occurred_at: "2026-10-22T18:39:31.962Z"
        payload_digest: "sha256:8259797ac66bbc7897af7c4e6e9f86676edc7bf205c24d23dfaa65c59ade7a4d"
        task_id: "202610160536-N2BA6P"
        task_revision: 14
      -
        command_digest: "sha256:96aca360b091aef8777e12d5318542f4ac583d583a6d856d975478d0aac02ad3"
        id: "sha256:95fddd96ebeb83f61ca6f553024fdf60488099bbaf4cb6bb0318abc7d63e8d98:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:95fddd96ebeb83f61ca6f553024fdf60488099bbaf4cb6bb0318abc7d63e8d98"
        occurred_at: "2026-10-22T18:39:40.692Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202610160536-N2BA6P"
        task_revision: 15
      -
        command_digest: "sha256:8f569bb046a17f4946f99291997ab756f1f8bcbb4d2b746c01ed182ce1f0c070"
        id: "kernel_work_item_claim_required:sha256:5e103fd665cf06ef4d2c5a86b763f795dc9a1c3559b92fbb01f35b31a84ecfe4:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5e103fd665cf06ef4d2c5a86b763f795dc9a1c3559b92fbb01f35b31a84ecfe4:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
        occurred_at: "2026-10-22T18:40:08.239Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610160536-N2BA6P"
        task_revision: 16
      -
        command_digest: "sha256:b1b8dbe1f47ef3cd8f4ced55fa39a989e038a072377b89ce564f6fc219d82e3e"
        id: "kernel_work_item_execution_required:sha256:b2feeee4936d30fd027ec879d3fdd08b21c9977d6f7d37255c29ae0abb61313b:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b2feeee4936d30fd027ec879d3fdd08b21c9977d6f7d37255c29ae0abb61313b:sha256:b3eb58c6cf318aad6d623eb6f12a6a3410763bf6dff00fde04c4fdb01951f233"
        occurred_at: "2026-10-22T18:40:19.923Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610160536-N2BA6P"
        task_revision: 17
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree

Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.

## Scope

- In scope: Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.
- Out of scope: unrelated refactors not required for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree".

## Plan

1. Execute approved WorkItem prepare-worktree-from-canonical-primary.
2. Execute approved WorkItem final-correction-31eded3c9109.

## Verify Steps

PLANNER fallback scaffold for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
