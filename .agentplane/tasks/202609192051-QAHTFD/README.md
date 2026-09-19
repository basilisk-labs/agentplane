---
id: "202609192051-QAHTFD"
title: "Productize release-blocking AgentPlane controller fixes for 0.7.10"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 32
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.10"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-19T21:04:56.193Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-19T21:04:56.193Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:c48c85d1bbd14eebd2bdf1e6a8ee59f74f68e9bf3173a2408961ea6c1950be71"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-19T21:04:56.193Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "852e2de3c0737c1aaff820ca29b05a65b4b769f0"
  review_identity_digest: "sha256:a7d85b1a6fe6fceacf6e455ec5b0fe3a41fad969346b6143bb89cec39d9a1ef6"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609192051-QAHTFD/b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d/quality-report.json"
  findings:
    - "Hosted-close rewrite coverage is now limited to configured task paths classified as managed artifacts and requires at least one derived artifact."
    - "README-only changes, arbitrary task-root files, and paths outside the configured workflow directory fail closed."
    - "The source changes remain within the six planned controller contracts and do not disable authority or verification gates."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:898fd0140354628320c3c9df71c2bbb224ffa7ee9ed7f1f382def29db1bb77c4"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "852e2de3c0737c1aaff820ca29b05a65b4b769f0"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-19T20:51:13.882Z"
doc_updated_by: "CODER"
description: "Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10."
sections:
  Summary: |-
    Productize release-blocking AgentPlane controller fixes for 0.7.10

    Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.
  Scope: |-
    - In scope: Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.
    - Out of scope: unrelated refactors not required for "Productize release-blocking AgentPlane controller fixes for 0.7.10".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:bce6ff6818a17a189b0cf8e1d0204cd9a1227126d6df091f232cfd66187aca94"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609192051-QAHTFD/b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d/quality-report.json"
    findings:
      - "Hosted-close rewrite coverage is now limited to configured task paths classified as managed artifacts and requires at least one derived artifact."
      - "README-only changes, arbitrary task-root files, and paths outside the configured workflow directory fail closed."
      - "The source changes remain within the six planned controller contracts and do not disable authority or verification gates."
    implementation_commit: "852e2de3c0737c1aaff820ca29b05a65b4b769f0"
    implementation_tree: "5121345cf306e11e62b207f42938fea6ef9595a8"
    projected_at: "2026-09-19T21:04:56.193Z"
    review_identity_digest: "sha256:a7d85b1a6fe6fceacf6e455ec5b0fe3a41fad969346b6143bb89cec39d9a1ef6"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:c48c85d1bbd14eebd2bdf1e6a8ee59f74f68e9bf3173a2408961ea6c1950be71"
    work_order_id: "sha256:8e97d889613b51fe45b63b85fa28f1a87c67b9c1d141144b9c5c59390a829e51"
  task_execution_context:
    base_ref: "main"
    base_sha: "a843b955ca9cbab2dd7389b4dbcb5e503e580def"
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
              - "git_read"
              - "process_execute"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1864948537758be31bcfeb0d3a4639ef61c9f2c9f06efafafd694a1eb013c8b9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "current task worktree"
              - "existing Bun test infrastructure"
              - "existing repository verification scripts"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands"
            task_id: "202609192051-QAHTFD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "process_execute"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:31d62f3e7a257770230712468223c1da28862b03ec84c736fcc27de7c132b784"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:1864948537758be31bcfeb0d3a4639ef61c9f2c9f06efafafd694a1eb013c8b9"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "current task worktree"
              - "existing Bun test infrastructure"
              - "existing repository verification scripts"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands"
            task_id: "202609192051-QAHTFD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
              - "packages/agentplane/src/commands/shared/quality-review-target.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            evidence_digest: "sha256:4b618eee828034e36f97099d4307938e589b44e9c64485be53c624510a617513"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "process_execute"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:61ba28033e2dbf4a001aa476d2a166e8990b617acfd21c1fa3e63b89af27a1fc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:31d62f3e7a257770230712468223c1da28862b03ec84c736fcc27de7c132b784"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "current task worktree"
              - "existing Bun test infrastructure"
              - "existing repository verification scripts"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands"
            task_id: "202609192051-QAHTFD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/quality-review-target.ts"
              - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
            evidence_digest: "sha256:9a1ae5d232f6956825f0d5573f3336dd4f7f88a0e32fa3cc3d2714c29d29cc94"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "process_execute"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:64d4f9ca7aaebb85045ae9b7cc97e5f4151bbf6a01f88fdfa8e33f39fac440a7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:61ba28033e2dbf4a001aa476d2a166e8990b617acfd21c1fa3e63b89af27a1fc"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "current task worktree"
              - "existing Bun test infrastructure"
              - "existing repository verification scripts"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands"
            task_id: "202609192051-QAHTFD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close-premerge.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
            evidence_digest: "sha256:36773be0b0af9a9fa6382a20c31890bd6b17dd9d7869627e2b3d612d0c8c0715"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
        digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:9249e1d5483a77cb448de9cf7be85f829ec1cad7494fb868880b8d7eb1579461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
              resources:
                - "current task worktree"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "controller-source-changes"
            id: "controller-fixes"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:f18794129726c30366878580330bf371287c4a4a3e3d32549a63c605fd166475"
            depends_on:
              - "controller-fixes"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "process_execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources:
                - "existing Bun test infrastructure"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "focused-regression-coverage"
            id: "regression-tests"
            optional: false
            required_inputs:
              - "controller-source-changes"
          -
            contract_digest: "sha256:7668b680d809731090ef8e4212cac3f1af27e338bf2d91fadc294bfe558c4473"
            depends_on:
              - "regression-tests"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "process_execute"
              external_effects: []
              repository_effects: []
              resources:
                - "existing repository verification scripts"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "verification-evidence"
              - "scope-review"
            id: "verification"
            optional: false
            required_inputs:
              - "controller-source-changes"
              - "focused-regression-coverage"
      effects: []
      final_validation: null
      id: "202609192051-QAHTFD"
      intent_digest: "sha256:c352f3dfcc7948d95588efa011cd21100e4a7df4839e792c786430d0dc704856"
      migration_receipts: []
      mutation_receipts:
        capture:202609192051-QAHTFD:
          after_revision: 1
          aggregate_digest: "sha256:5a1b47509c91942f37fd0586963d79a5e1c96a4ea04afb359c2fce34249db1f3"
          before_revision: 0
          command_digest: "sha256:94ca7a8b7165ea03454a02488b0d163ace9487699fc1d45444cab6ebf2de6be0"
          effect_ids: []
          event_digests:
            - "sha256:e07b0b2401de2519245b18a408d2f5042e73451a9eacac2d7fa67c607dc27294"
          mutation_id: "capture:202609192051-QAHTFD"
        kernel_work_item_blocked:sha256:42f9c71ed1a39db6efd149aae6aa22b14aa3b8183cd31db9bf0add43651be2db:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:
          after_revision: 22
          aggregate_digest: "sha256:c05237fd4dd790aa1b8a9689dc76a040d5d5967749d974f66ff87e1dc8aaff3b"
          before_revision: 21
          command_digest: "sha256:fdc899f574887d9f6b52af298213badb7caa1ef437753557b2f5acc2ca3c0f87"
          effect_ids: []
          event_digests:
            - "sha256:db1dc4c7de1d7e04af695191af4b51674116a53820f47035224b1d7b7f829a42"
          mutation_id: "kernel_work_item_blocked:sha256:42f9c71ed1a39db6efd149aae6aa22b14aa3b8183cd31db9bf0add43651be2db:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        kernel_work_item_claim_required:sha256:0d37d07827e0db9a588f079b46bb861e99f2c16bb2f65bf3d639244fdb4b5e07:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:
          after_revision: 23
          aggregate_digest: "sha256:9fcae1b331a36725f354c3f7f9d39e853eee2bddf2b3c396c445a42f595f02c0"
          before_revision: 22
          command_digest: "sha256:bf1251571adf120b98c10156875fcb897e8ca7639640f70ac646342f43e145a6"
          effect_ids: []
          event_digests:
            - "sha256:b78bf58ff7358925b2e4a6ed2e6d945bc036df3e597b21663947eb8940597930"
          mutation_id: "kernel_work_item_claim_required:sha256:0d37d07827e0db9a588f079b46bb861e99f2c16bb2f65bf3d639244fdb4b5e07:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:
          after_revision: 5
          aggregate_digest: "sha256:e7044fe9b94efc6d37c1a1309911205f3a53d558550c7b8c10f9f5d4941c18cc"
          before_revision: 4
          command_digest: "sha256:b236289404ad72d8426263c87210777b43494fc1cadc563412848b729355b6da"
          effect_ids: []
          event_digests:
            - "sha256:bd700f0bb88a8e0c6f4831dd1cd82effd3277277129021d8d84c6f03882d9866"
          mutation_id: "kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        kernel_work_item_claim_required:sha256:c32b9f672456e08a86f452ec28631f8658ab0854208ecb8f9f1b98e2079dd1f2:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:
          after_revision: 19
          aggregate_digest: "sha256:72990e1f3f9c6b8d8651dca14ce0d23de68dbb535dd8e5c946fb23e99f033250"
          before_revision: 18
          command_digest: "sha256:a98555049c7960e577816d503d3e61b89eb083295dd5bfc79d7a6425862a0945"
          effect_ids: []
          event_digests:
            - "sha256:699d1aed552a2119ed2f1fca30ed4137d23cd28384b2ffeee1b8597d85f56617"
          mutation_id: "kernel_work_item_claim_required:sha256:c32b9f672456e08a86f452ec28631f8658ab0854208ecb8f9f1b98e2079dd1f2:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        kernel_work_item_execution_required:sha256:1f23157eab956fe67b7067e2b562791b6d16b9b01bca3cd406f0c23650962980:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:
          after_revision: 20
          aggregate_digest: "sha256:7864e86fb552447212623d60331fcfcd6939d8ff34d7499502fec60fa9b4a1df"
          before_revision: 19
          command_digest: "sha256:d8ca97fb96054fa909239bc75b8192a1e799a4c8aab87fefdd651e5455a24234"
          effect_ids: []
          event_digests:
            - "sha256:3182cab070959c140d539e8d7222e8c731f10ce00007dd777b91b43479634d0e"
          mutation_id: "kernel_work_item_execution_required:sha256:1f23157eab956fe67b7067e2b562791b6d16b9b01bca3cd406f0c23650962980:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:
          after_revision: 13
          aggregate_digest: "sha256:6ef56994508969c8565cbc5b6e61597d7bbb5d4022399b824ce4ced9e79b399d"
          before_revision: 12
          command_digest: "sha256:2c0f6a1eb460cb1ed6d48d85f459752189b0df62a78c568180a5dddee4c96bca"
          effect_ids: []
          event_digests:
            - "sha256:3b6cfcb07ff2af49b8a929989197091ad4766d6815ef5c43d12ca2745c996dd5"
          mutation_id: "kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        kernel_work_item_execution_required:sha256:4e9f0ba09b12d3e1ae31fade853d909f9f63422ffe9291ae31f80bafefbca114:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f:
          after_revision: 31
          aggregate_digest: "sha256:2b5090092b20417ee182691a49733f78efe4774042e35b3fbf9a8d6f992b3227"
          before_revision: 30
          command_digest: "sha256:b61034cf2ae071e63c5abcdafa2bff1418a327a89a5dd7ff422de6102121e5fc"
          effect_ids: []
          event_digests:
            - "sha256:182fd3b299bf595b79a2d89039d33c3c179a0a735be70c8edcefd78db8ecb192"
          mutation_id: "kernel_work_item_execution_required:sha256:4e9f0ba09b12d3e1ae31fade853d909f9f63422ffe9291ae31f80bafefbca114:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f"
        kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:
          after_revision: 6
          aggregate_digest: "sha256:069a6d212ed83a614fae71a44532a4e0a9059f9a7450adb67c3820b8b3dc1c77"
          before_revision: 5
          command_digest: "sha256:1283b6d126e8cce0c5be5e1c2f7658982a72534e54b1fef3341c58847adbf6ab"
          effect_ids: []
          event_digests:
            - "sha256:69ae0c58f3be9faefcbb481fe723f0db721d3aff41d6e12edf410d5d0943ffe1"
          mutation_id: "kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        kernel_work_item_execution_required:sha256:c82f29ce953e42e958af85a05c018af331e2d0c1292b54def6345581de1e2577:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:
          after_revision: 24
          aggregate_digest: "sha256:487fc6ef41f9810d1cdb6745e9db8c162d94b3083f82f1c7066026e96f2fabfe"
          before_revision: 23
          command_digest: "sha256:beee074e426824eeff1be6026d3c49a312df7ccfec668ac10aecc7e99f57e5aa"
          effect_ids: []
          event_digests:
            - "sha256:0a3d47928fe6bb56ca8a9f80fce46b7763f3ce1269a2ac98fe59cef4e619738b"
          mutation_id: "kernel_work_item_execution_required:sha256:c82f29ce953e42e958af85a05c018af331e2d0c1292b54def6345581de1e2577:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        kernel_work_item_inspection_required:sha256:628f0890cb64bebed8fb03a6c6d5b00a9ff0d0d8113fe9b6d2c4ad82c6bcfd08:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f:
          after_revision: 27
          aggregate_digest: "sha256:f3503648ade5e5c15ed4bdad56ef6bad8a1196031afc7d6d79f6d02e24ec70c0"
          before_revision: 26
          command_digest: "sha256:1b7d4fc5f48095c6f900eb12188b3eb1d182e4675a5cad4635740020421a11ec"
          effect_ids: []
          event_digests:
            - "sha256:4678d96a2871e841bcb644b02f90c6b28223d670c86b4053266afc31e783daff"
          mutation_id: "kernel_work_item_inspection_required:sha256:628f0890cb64bebed8fb03a6c6d5b00a9ff0d0d8113fe9b6d2c4ad82c6bcfd08:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f"
        kernel_work_item_inspection_required:sha256:854f37a2dbe0af3abc14f237575f34af4a84a7a8a892f29bdc49053bcfb27d80:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:
          after_revision: 16
          aggregate_digest: "sha256:7ae261027277e920656cb52e096977c6cb8a1aeaa4f6ab7cf93e95dea419e4a5"
          before_revision: 15
          command_digest: "sha256:01799118dc39bdb91d223292c6c4011a475e3fb3a15f51a5c9eda5835b546747"
          effect_ids: []
          event_digests:
            - "sha256:23ca704a50c92cd525ac6409d7f486555c50adefa21c3266095e376a5bd093cb"
          mutation_id: "kernel_work_item_inspection_required:sha256:854f37a2dbe0af3abc14f237575f34af4a84a7a8a892f29bdc49053bcfb27d80:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:
          after_revision: 9
          aggregate_digest: "sha256:656829bf3e62f90cbd83b1ac3ffd3ac46588e62b13c3514b8b84e44bb6a75358"
          before_revision: 8
          command_digest: "sha256:660cb1fd2d47f1c8476e10bc8bf0529547af836b7053406853675d1fd3d1968c"
          effect_ids: []
          event_digests:
            - "sha256:ef2f2b65874a088fe19f315ff05d372696923a9aa7f940057c87da8c024fe4ed"
          mutation_id: "kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:
          after_revision: 4
          aggregate_digest: "sha256:5593673a82d4ba03cce811d55371d9945ac24852aa9e2dc13df5cec136fa9d39"
          before_revision: 3
          command_digest: "sha256:56514e67b901b129c564c0711b2850c1f2c0950f85266976bfef2005f7e18eaf"
          effect_ids: []
          event_digests:
            - "sha256:2d2120634f33152edf09402d72cbf231a07d65f41c2791dfb00fb62b4771689e"
          mutation_id: "kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:
          after_revision: 12
          aggregate_digest: "sha256:0d55f3aa6fc25a9d082f4840961790ff806d9a3fa0749ccacdc110eca79da6e4"
          before_revision: 11
          command_digest: "sha256:2ffa621b4a6281cf954dfb737a11eec024e14a154b339a272ab6624d9245b680"
          effect_ids: []
          event_digests:
            - "sha256:129d8c520a37aab0c7ede5c2e6c55199459b7b1999301393008be3f3a5578fca"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        kernel_work_item_rework_claim_required:sha256:f13cbbd036518728f5b9cb6c89401a85ebd0bf3868a1d864376db19aa280d973:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f:
          after_revision: 30
          aggregate_digest: "sha256:88682db31f79b01b9cded1b08afbd6451cf04791e4a0f84bd036c2b4f93e7032"
          before_revision: 29
          command_digest: "sha256:59139c3f3ada668570f06db22041c773ca1993350c1622e9d2b2bcf2b43776e2"
          effect_ids: []
          event_digests:
            - "sha256:27ef107d53abaf725d221a1111eaa3a8510b20000a35da659c7b261b419d9ade"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:f13cbbd036518728f5b9cb6c89401a85ebd0bf3868a1d864376db19aa280d973:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f"
        result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013:
          after_revision: 8
          aggregate_digest: "sha256:577a7353faae631232fa6a4ad2803ba97d8b09274c7216f0088323444120b8e1"
          before_revision: 7
          command_digest: "sha256:5c3bd147fcab0ff0952f7025b32340f3e9241f1e4a3610613bc045fa6b419c9a"
          effect_ids: []
          event_digests:
            - "sha256:f53bd8857a24caf7034f8143595288dacf8949724f56d4af8e0d97a412faf174"
          mutation_id: "result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013"
        result:sha256:8e97d889613b51fe45b63b85fa28f1a87c67b9c1d141144b9c5c59390a829e51:
          after_revision: 15
          aggregate_digest: "sha256:c33d2dae8b577bbd57a578d3f73e38ba8cf6d261285910c500b24a3edaa28a15"
          before_revision: 14
          command_digest: "sha256:91b47ada77c8313f76e560f25b03d99651b2350f5160a419c662b74d937bb5b7"
          effect_ids: []
          event_digests:
            - "sha256:6bafc45dd5d43a8c00e76eb9cbaaa6ef4c7033877ef7797182cfabe6cce8683b"
          mutation_id: "result:sha256:8e97d889613b51fe45b63b85fa28f1a87c67b9c1d141144b9c5c59390a829e51"
        result:sha256:de71b602ad90c731e5bdf2859e337353d7f219e3715d1e25ec51b296a6919e30:
          after_revision: 26
          aggregate_digest: "sha256:be5c4dffbb5964f1cab4869f347b810d933da8a48aef9b09680cd06a9c1fd2d8"
          before_revision: 25
          command_digest: "sha256:48b92638a13fe354804f5e017a41d9284aba9d0b48c8c904113485ba119d0059"
          effect_ids: []
          event_digests:
            - "sha256:e086b346fed1bc5ffe8e7bc354f52c05149639f1206d2a1eb1e1edcc5eeef9c0"
          mutation_id: "result:sha256:de71b602ad90c731e5bdf2859e337353d7f219e3715d1e25ec51b296a6919e30"
        result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f:
          after_revision: 2
          aggregate_digest: "sha256:8b1b86ee93abc2ffaab6d7cf59c083fe6df27d12ed3c2336eb11ea19f950a1df"
          before_revision: 1
          command_digest: "sha256:05a35f0a03c67b31df67f3076b8bf8bd8448dd14733bf4d2f4a521a1e5b35476"
          effect_ids: []
          event_digests:
            - "sha256:5008e0d5704cf2c1c8c9b21d5123c7678d86d48057c7b42f6ab27448b4951c32"
          mutation_id: "result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f"
        semantic-stop:sha256:be2ecfb4b7ce390c8a024a8a35cd4ee359b189c712b3da9a5fd3b1d6897cba5e:
          after_revision: 21
          aggregate_digest: "sha256:e38c69104c4898dfdc8d8b290b90ebf8770614591aa764a7fd7d205bd7f5a40e"
          before_revision: 20
          command_digest: "sha256:703c65145e208f8662da21f9d2a64b21ff80a5dd9551fcf219edc48871743734"
          effect_ids: []
          event_digests:
            - "sha256:148266671d31eafe4dc1eed06300f2756b2469ad6053851559741f76db25e970"
          mutation_id: "semantic-stop:sha256:be2ecfb4b7ce390c8a024a8a35cd4ee359b189c712b3da9a5fd3b1d6897cba5e"
        sha256:29d102b9d0d9095de668721e65512940d5ef65e5ad847f7bef63b6066e8b1e0e:
          after_revision: 14
          aggregate_digest: "sha256:a542cbb1b2e66601f4728a3a2c47df70e7b1dcc90f34d823855d5aa8408ce74e"
          before_revision: 13
          command_digest: "sha256:9fb89cd083b5dbb4c0717e8e5b36b7a12d8acdc4e70e889b809594e38cd5e664"
          effect_ids: []
          event_digests:
            - "sha256:6f57a458ced5ce0079155ecb26199cd86eaca6cba4d784f94d8a984c8858baea"
          mutation_id: "sha256:29d102b9d0d9095de668721e65512940d5ef65e5ad847f7bef63b6066e8b1e0e"
        sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700:
          after_revision: 7
          aggregate_digest: "sha256:f16215a58097fa62281ed09c5bf6f7538f9263f80dc9b9ac3719ea9a6c10df43"
          before_revision: 6
          command_digest: "sha256:3c406b8c87fba4d27f6c80a16af29d720000d9857f70f8802d4c5d195074563c"
          effect_ids: []
          event_digests:
            - "sha256:97e5552ed5865d013562ae2a67321990d89e31b5d4a02d657279c97041ce681b"
          mutation_id: "sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700"
        sha256:a767ce609e7af48f901ba0d2b1768cdc58450ed9b8db6a58f0a143e24d8fbefc:
          after_revision: 25
          aggregate_digest: "sha256:70bdb402f511bb6450244bff999e0106a9b4fa7604e66f967d30c5620875326c"
          before_revision: 24
          command_digest: "sha256:912595114441b1b2d8909f1390d217c8d3b9261ec06569b3a910383dcc49c14b"
          effect_ids: []
          event_digests:
            - "sha256:9ef73032bd0fca77b3ce94beede1190270101d84331bd792f70f4beccc337063"
          mutation_id: "sha256:a767ce609e7af48f901ba0d2b1768cdc58450ed9b8db6a58f0a143e24d8fbefc"
        sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399:
          after_revision: 3
          aggregate_digest: "sha256:8eaaa6b3f2e85c969e1296c1d64313e38b0baa5c7ce2f91644cde3c1cd7b07d1"
          before_revision: 2
          command_digest: "sha256:e5cdabc76be05c9fd3ffe9807ddf61714db51587603e9f24a5e9bc44bb4e55e9"
          effect_ids: []
          event_digests:
            - "sha256:e577d7336e14f1a0b3784bf4d2dfe31dc98674844a9d6855463abfc31e7a3424"
          mutation_id: "sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399"
        validation-resolution:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e:
          after_revision: 29
          aggregate_digest: "sha256:b3e5d72f60c4366cafeaf334287a747f45e2b2a62a4295a83de56e8475a0f0c5"
          before_revision: 28
          command_digest: "sha256:1aa1ff4613d4279c410bb41fc4aa5d998c997266add2c8e3776b3898667a7804"
          effect_ids: []
          event_digests:
            - "sha256:b2ba92177f3ec8a0dcf620da9e1a3330ce200d5b585379302e8208878a9c5cf3"
          mutation_id: "validation-resolution:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e"
        validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:
          after_revision: 11
          aggregate_digest: "sha256:034d53aed544e141ee8e9f85c4d6403f391022759412d2ff265a75a61c088399"
          before_revision: 10
          command_digest: "sha256:f843237369f99e7b9864c5cd691cf5c31883525746ddbfbebcf77de1383e595b"
          effect_ids: []
          event_digests:
            - "sha256:29dda1fb5616b5ac8c17e53d412f6ca58341442ca62aaf06950bd1bf8bafc20f"
          mutation_id: "validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
        validation-resolution:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d:
          after_revision: 18
          aggregate_digest: "sha256:4552a336df1d748b6b60318813cb03df5dbe2698c991a9d27fd43e0fac5a3262"
          before_revision: 17
          command_digest: "sha256:84d3370535c2a694aba746cf8832277588871c4acba8da9597807ec728231939"
          effect_ids: []
          event_digests:
            - "sha256:aa9d366c7b40fec54109abb257c890044207db29a8a23aa66d63cc8730566df7"
          mutation_id: "validation-resolution:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d"
        validation:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e:
          after_revision: 28
          aggregate_digest: "sha256:cbd4b273ef6462224479b47603c3bb269be6703455cca4abc910033ae5714fa6"
          before_revision: 27
          command_digest: "sha256:277f92fd07b44efbebb8e2eea6c53343eaac5e0ac72fb843a4f20135f1bd0c90"
          effect_ids: []
          event_digests:
            - "sha256:ad5073c5de12287709044df669544e6bc4200e2bf4f02581e4b184b5e371fb3d"
          mutation_id: "validation:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e"
        validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:
          after_revision: 10
          aggregate_digest: "sha256:79e422642270f04a34dc3c92394fc14e5e1527ced3ec37156ca04866f0a2011c"
          before_revision: 9
          command_digest: "sha256:81c95a3915263e6ca33a1a78070ed6293bd3d6e620a3c34271e35650f61c3349"
          effect_ids: []
          event_digests:
            - "sha256:38a5898db80451c9629d7e6d31ebd922163556cda25a60c6d1932a40b20c0474"
          mutation_id: "validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
        validation:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d:
          after_revision: 17
          aggregate_digest: "sha256:34892a07c726f7d0e8074892ee6f9d3432fb6afef46e638e1969316aea7e45de"
          before_revision: 16
          command_digest: "sha256:ee3bf5f7562360620a197bf862451d677ea48a32f49f8baf35eda292c693a143"
          effect_ids: []
          event_digests:
            - "sha256:2904c0d2c6a0c31eeb6127757d2563ce65eaf672c667046de9d11a274a5f73eb"
          mutation_id: "validation:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d"
      plan_history: []
      revision: 31
      schema_version: 1
      state: "ACTIVE"
      work_items:
        controller-fixes:
          attempt: 2
          claim_id: "sha256:421c794019b93cfaf421ee46f19bc963f11c207d0983781e3627557ab96eb676"
          definition:
            contract_digest: "sha256:9249e1d5483a77cb448de9cf7be85f829ec1cad7494fb868880b8d7eb1579461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
              resources:
                - "current task worktree"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "controller-source-changes"
            id: "controller-fixes"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:149df5635112ecaa9b310af78690b87be97e99ca8ca2ed32d280a5deb076e39d"
              id: "controller-source-changes"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
              task_id: "202609192051-QAHTFD"
              work_item_id: "controller-fixes"
          result_digest: "sha256:c5bc061326c8f26beee77465f5bb779b08e58dc4df82068223c9cca6034e80f3"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:c48c85d1bbd14eebd2bdf1e6a8ee59f74f68e9bf3173a2408961ea6c1950be71"
              - "sha256:a7d85b1a6fe6fceacf6e455ec5b0fe3a41fad969346b6143bb89cec39d9a1ef6"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              environment_digest: "sha256:ffab51e54602199ff4dd4c8a784d80c5e4028100cfc831fa4d65605703e0eb6e"
              implementation_identity: "sha256:c5bc061326c8f26beee77465f5bb779b08e58dc4df82068223c9cca6034e80f3"
              toolchain_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
            observed_at: "2026-09-19T21:04:56.193Z"
            status: "PASSED"
        regression-tests:
          attempt: 3
          claim_id: "sha256:73468ff91790a1f37134169745dc161b4a5ff2dc2835461326e18c0b0a3d56ea"
          definition:
            contract_digest: "sha256:f18794129726c30366878580330bf371287c4a4a3e3d32549a63c605fd166475"
            depends_on:
              - "controller-fixes"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "process_execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources:
                - "existing Bun test infrastructure"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "focused-regression-coverage"
            id: "regression-tests"
            optional: false
            required_inputs:
              - "controller-source-changes"
          output_manifests: []
          result_digest: null
          revision: 14
          state: "EXECUTING"
          validation: null
        verification:
          state: "PLANNED"
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:7668b680d809731090ef8e4212cac3f1af27e338bf2d91fadc294bfe558c4473"
            depends_on:
              - "regression-tests"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "process_execute"
              external_effects: []
              repository_effects: []
              resources:
                - "existing repository verification scripts"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "verification-evidence"
              - "scope-review"
            id: "verification"
            optional: false
            required_inputs:
              - "controller-source-changes"
              - "focused-regression-coverage"
          output_manifests: []
          result_digest: null
          revision: 1
          validation: null
    digest: "sha256:0395fdc45e8238ba4a351b88b1f0ffd884066eb1a9ef4fb386eb092fa3770196"
    documents:
      contracts:
        sha256:7668b680d809731090ef8e4212cac3f1af27e338bf2d91fadc294bfe558c4473:
          acceptance_criteria:
            - "Focused tests pass"
            - "All AgentPlane-assigned verification passes"
            - "Final git status contains no unintended files"
          objective: "Run focused tests, assigned broader checks, and inspect the final diff for unintended changes."
          role: "EVALUATOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
        sha256:9249e1d5483a77cb448de9cf7be85f829ec1cad7494fb868880b8d7eb1579461:
          acceptance_criteria:
            - "Only the six identified controller contracts change"
            - "No authorization or verification gate is disabled"
            - "Configuration-aware paths replace hard-coded task paths where applicable"
          objective: "Reconcile the proven temporary runtime fixes with current main while preserving fail-closed authority and scope checks."
          role: "EXECUTOR"
          verification_commands: []
        sha256:f18794129726c30366878580330bf371287c4a4a3e3d32549a63c605fd166475:
          acceptance_criteria:
            - "Each changed behavior has a failing-before and passing-after regression"
            - "Tests use existing fixtures and infrastructure"
          objective: "Add focused regressions for every release blocker fixed in the controller."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
      intent:
        context: "Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10."
        objective: "Productize release-blocking AgentPlane controller fixes for 0.7.10"
    events:
      -
        command_digest: "sha256:94ca7a8b7165ea03454a02488b0d163ace9487699fc1d45444cab6ebf2de6be0"
        id: "capture:202609192051-QAHTFD:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609192051-QAHTFD"
        occurred_at: "2026-09-19T20:51:13.815Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609192051-QAHTFD"
        task_revision: 1
      -
        command_digest: "sha256:05a35f0a03c67b31df67f3076b8bf8bd8448dd14733bf4d2f4a521a1e5b35476"
        id: "result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f"
        occurred_at: "2026-09-19T20:52:20.974Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609192051-QAHTFD"
        task_revision: 2
      -
        command_digest: "sha256:e5cdabc76be05c9fd3ffe9807ddf61714db51587603e9f24a5e9bc44bb4e55e9"
        id: "sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399"
        occurred_at: "2026-09-19T20:52:30.855Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609192051-QAHTFD"
        task_revision: 3
      -
        command_digest: "sha256:56514e67b901b129c564c0711b2850c1f2c0950f85266976bfef2005f7e18eaf"
        id: "kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        occurred_at: "2026-09-19T20:52:37.433Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609192051-QAHTFD"
        task_revision: 4
      -
        command_digest: "sha256:b236289404ad72d8426263c87210777b43494fc1cadc563412848b729355b6da"
        id: "kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        occurred_at: "2026-09-19T20:52:40.967Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609192051-QAHTFD"
        task_revision: 5
      -
        command_digest: "sha256:1283b6d126e8cce0c5be5e1c2f7658982a72534e54b1fef3341c58847adbf6ab"
        id: "kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        occurred_at: "2026-09-19T20:52:59.958Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609192051-QAHTFD"
        task_revision: 6
      -
        command_digest: "sha256:3c406b8c87fba4d27f6c80a16af29d720000d9857f70f8802d4c5d195074563c"
        id: "sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700"
        occurred_at: "2026-09-19T20:58:23.063Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609192051-QAHTFD"
        task_revision: 7
      -
        command_digest: "sha256:5c3bd147fcab0ff0952f7025b32340f3e9241f1e4a3610613bc045fa6b419c9a"
        id: "result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013"
        occurred_at: "2026-09-19T20:59:05.747Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609192051-QAHTFD"
        task_revision: 8
      -
        command_digest: "sha256:660cb1fd2d47f1c8476e10bc8bf0529547af836b7053406853675d1fd3d1968c"
        id: "kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        occurred_at: "2026-09-19T20:59:08.725Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609192051-QAHTFD"
        task_revision: 9
      -
        command_digest: "sha256:81c95a3915263e6ca33a1a78070ed6293bd3d6e620a3c34271e35650f61c3349"
        id: "validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
        occurred_at: "2026-09-19T21:02:15.758Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609192051-QAHTFD"
        task_revision: 10
      -
        command_digest: "sha256:f843237369f99e7b9864c5cd691cf5c31883525746ddbfbebcf77de1383e595b"
        id: "validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
        occurred_at: "2026-09-19T21:02:17.702Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609192051-QAHTFD"
        task_revision: 11
      -
        command_digest: "sha256:2ffa621b4a6281cf954dfb737a11eec024e14a154b339a272ab6624d9245b680"
        id: "kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        occurred_at: "2026-09-19T21:02:21.527Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609192051-QAHTFD"
        task_revision: 12
      -
        command_digest: "sha256:2c0f6a1eb460cb1ed6d48d85f459752189b0df62a78c568180a5dddee4c96bca"
        id: "kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        occurred_at: "2026-09-19T21:02:25.319Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609192051-QAHTFD"
        task_revision: 13
      -
        command_digest: "sha256:9fb89cd083b5dbb4c0717e8e5b36b7a12d8acdc4e70e889b809594e38cd5e664"
        id: "sha256:29d102b9d0d9095de668721e65512940d5ef65e5ad847f7bef63b6066e8b1e0e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:29d102b9d0d9095de668721e65512940d5ef65e5ad847f7bef63b6066e8b1e0e"
        occurred_at: "2026-09-19T21:03:57.348Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609192051-QAHTFD"
        task_revision: 14
      -
        command_digest: "sha256:91b47ada77c8313f76e560f25b03d99651b2350f5160a419c662b74d937bb5b7"
        id: "result:sha256:8e97d889613b51fe45b63b85fa28f1a87c67b9c1d141144b9c5c59390a829e51:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:8e97d889613b51fe45b63b85fa28f1a87c67b9c1d141144b9c5c59390a829e51"
        occurred_at: "2026-09-19T21:04:01.401Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609192051-QAHTFD"
        task_revision: 15
      -
        command_digest: "sha256:01799118dc39bdb91d223292c6c4011a475e3fb3a15f51a5c9eda5835b546747"
        id: "kernel_work_item_inspection_required:sha256:854f37a2dbe0af3abc14f237575f34af4a84a7a8a892f29bdc49053bcfb27d80:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:854f37a2dbe0af3abc14f237575f34af4a84a7a8a892f29bdc49053bcfb27d80:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        occurred_at: "2026-09-19T21:04:04.409Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609192051-QAHTFD"
        task_revision: 16
      -
        command_digest: "sha256:ee3bf5f7562360620a197bf862451d677ea48a32f49f8baf35eda292c693a143"
        id: "validation:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d"
        occurred_at: "2026-09-19T21:04:59.087Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609192051-QAHTFD"
        task_revision: 17
      -
        command_digest: "sha256:84d3370535c2a694aba746cf8832277588871c4acba8da9597807ec728231939"
        id: "validation-resolution:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b6b3a42b23cbb5e1ad80aa9b3b93cee8d2c6a54528c40cbaedfb9c077125857d"
        occurred_at: "2026-09-19T21:05:01.037Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609192051-QAHTFD"
        task_revision: 18
      -
        command_digest: "sha256:a98555049c7960e577816d503d3e61b89eb083295dd5bfc79d7a6425862a0945"
        id: "kernel_work_item_claim_required:sha256:c32b9f672456e08a86f452ec28631f8658ab0854208ecb8f9f1b98e2079dd1f2:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:c32b9f672456e08a86f452ec28631f8658ab0854208ecb8f9f1b98e2079dd1f2:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        occurred_at: "2026-09-19T21:05:04.986Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609192051-QAHTFD"
        task_revision: 19
      -
        command_digest: "sha256:d8ca97fb96054fa909239bc75b8192a1e799a4c8aab87fefdd651e5455a24234"
        id: "kernel_work_item_execution_required:sha256:1f23157eab956fe67b7067e2b562791b6d16b9b01bca3cd406f0c23650962980:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:1f23157eab956fe67b7067e2b562791b6d16b9b01bca3cd406f0c23650962980:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        occurred_at: "2026-09-19T21:05:08.656Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609192051-QAHTFD"
        task_revision: 20
      -
        command_digest: "sha256:703c65145e208f8662da21f9d2a64b21ff80a5dd9551fcf219edc48871743734"
        id: "semantic-stop:sha256:be2ecfb4b7ce390c8a024a8a35cd4ee359b189c712b3da9a5fd3b1d6897cba5e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:be2ecfb4b7ce390c8a024a8a35cd4ee359b189c712b3da9a5fd3b1d6897cba5e"
        occurred_at: "2026-09-19T21:07:21.548Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202609192051-QAHTFD"
        task_revision: 21
      -
        command_digest: "sha256:fdc899f574887d9f6b52af298213badb7caa1ef437753557b2f5acc2ca3c0f87"
        id: "kernel_work_item_blocked:sha256:42f9c71ed1a39db6efd149aae6aa22b14aa3b8183cd31db9bf0add43651be2db:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_blocked:sha256:42f9c71ed1a39db6efd149aae6aa22b14aa3b8183cd31db9bf0add43651be2db:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        occurred_at: "2026-09-19T21:09:54.546Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202609192051-QAHTFD"
        task_revision: 22
      -
        command_digest: "sha256:bf1251571adf120b98c10156875fcb897e8ca7639640f70ac646342f43e145a6"
        id: "kernel_work_item_claim_required:sha256:0d37d07827e0db9a588f079b46bb861e99f2c16bb2f65bf3d639244fdb4b5e07:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0d37d07827e0db9a588f079b46bb861e99f2c16bb2f65bf3d639244fdb4b5e07:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        occurred_at: "2026-09-19T21:09:58.403Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609192051-QAHTFD"
        task_revision: 23
      -
        command_digest: "sha256:beee074e426824eeff1be6026d3c49a312df7ccfec668ac10aecc7e99f57e5aa"
        id: "kernel_work_item_execution_required:sha256:c82f29ce953e42e958af85a05c018af331e2d0c1292b54def6345581de1e2577:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c82f29ce953e42e958af85a05c018af331e2d0c1292b54def6345581de1e2577:sha256:4e208c478a274622342b23060e9678b0e228a7a6509cbe57f022f6f37f4c4889"
        occurred_at: "2026-09-19T21:10:02.302Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202609192051-QAHTFD"
        task_revision: 24
      -
        command_digest: "sha256:912595114441b1b2d8909f1390d217c8d3b9261ec06569b3a910383dcc49c14b"
        id: "sha256:a767ce609e7af48f901ba0d2b1768cdc58450ed9b8db6a58f0a143e24d8fbefc:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a767ce609e7af48f901ba0d2b1768cdc58450ed9b8db6a58f0a143e24d8fbefc"
        occurred_at: "2026-09-19T21:43:23.117Z"
        payload_digest: "sha256:2df57c43b4c2d8878cc215fa25538784184bb0d4aefc65c0b5ed89616ba46f69"
        task_id: "202609192051-QAHTFD"
        task_revision: 25
      -
        command_digest: "sha256:48b92638a13fe354804f5e017a41d9284aba9d0b48c8c904113485ba119d0059"
        id: "result:sha256:de71b602ad90c731e5bdf2859e337353d7f219e3715d1e25ec51b296a6919e30:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:de71b602ad90c731e5bdf2859e337353d7f219e3715d1e25ec51b296a6919e30"
        occurred_at: "2026-09-19T21:43:27.336Z"
        payload_digest: "sha256:0e67667c6876dfaf859630ccf07b6f9b1d617b5a2caf96dcae2605f9a8beb345"
        task_id: "202609192051-QAHTFD"
        task_revision: 26
      -
        command_digest: "sha256:1b7d4fc5f48095c6f900eb12188b3eb1d182e4675a5cad4635740020421a11ec"
        id: "kernel_work_item_inspection_required:sha256:628f0890cb64bebed8fb03a6c6d5b00a9ff0d0d8113fe9b6d2c4ad82c6bcfd08:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:628f0890cb64bebed8fb03a6c6d5b00a9ff0d0d8113fe9b6d2c4ad82c6bcfd08:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f"
        occurred_at: "2026-09-19T21:43:30.415Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202609192051-QAHTFD"
        task_revision: 27
      -
        command_digest: "sha256:277f92fd07b44efbebb8e2eea6c53343eaac5e0ac72fb843a4f20135f1bd0c90"
        id: "validation:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e"
        occurred_at: "2026-09-19T21:44:27.796Z"
        payload_digest: "sha256:a43e5e79e2536f385f2e6bb8563438e2c36b1e138d99185bd53bf0ea892cd36b"
        task_id: "202609192051-QAHTFD"
        task_revision: 28
      -
        command_digest: "sha256:1aa1ff4613d4279c410bb41fc4aa5d998c997266add2c8e3776b3898667a7804"
        id: "validation-resolution:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1ca95fd3d59fb0abc310b972b659d52d99acb275f427e0f4d7a927e3ef355c1e"
        occurred_at: "2026-09-19T21:44:29.779Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202609192051-QAHTFD"
        task_revision: 29
      -
        command_digest: "sha256:59139c3f3ada668570f06db22041c773ca1993350c1622e9d2b2bcf2b43776e2"
        id: "kernel_work_item_rework_claim_required:sha256:f13cbbd036518728f5b9cb6c89401a85ebd0bf3868a1d864376db19aa280d973:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:f13cbbd036518728f5b9cb6c89401a85ebd0bf3868a1d864376db19aa280d973:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f"
        occurred_at: "2026-09-19T21:44:33.698Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202609192051-QAHTFD"
        task_revision: 30
      -
        command_digest: "sha256:b61034cf2ae071e63c5abcdafa2bff1418a327a89a5dd7ff422de6102121e5fc"
        id: "kernel_work_item_execution_required:sha256:4e9f0ba09b12d3e1ae31fade853d909f9f63422ffe9291ae31f80bafefbca114:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4e9f0ba09b12d3e1ae31fade853d909f9f63422ffe9291ae31f80bafefbca114:sha256:f0f51263d9b9101f7e3db1cff9ff1fddcc73216bf00df15f37f6ee8cca34200f"
        occurred_at: "2026-09-19T21:44:38.066Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202609192051-QAHTFD"
        task_revision: 31
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Productize release-blocking AgentPlane controller fixes for 0.7.10

Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.

## Scope

- In scope: Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.
- Out of scope: unrelated refactors not required for "Productize release-blocking AgentPlane controller fixes for 0.7.10".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
