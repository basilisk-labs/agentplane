---
id: "202610310121-21Y197"
title: "Fix completed-scope metadata readers across Node command bundles"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 22
origin:
  system: "manual"
depends_on:
  - "202610300522-MRJ9WH"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-31T01:23:10.674Z"
  updated_by: "USER"
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
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_security_boundary"
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
      - "repository_write"
      - "security_boundary"
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
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
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
    - "effect_security_boundary"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
          - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
          - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:cdc40ba8406e2820952ea0438a2139f8eea9bbcf3dd80cce984982b8e9ec01c5"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.ts"
        - "effect_security_boundary"
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
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-31T01:21:21.010Z"
doc_updated_by: "CODER"
description: "The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task."
sections:
  Summary: |-
    Fix completed-scope metadata readers across Node command bundles

    The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.
  Scope: |-
    - In scope: The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.
    - Out of scope: unrelated refactors not required for "Fix completed-scope metadata readers across Node command bundles".
  Plan: "1. Execute approved WorkItem qualify-completed-scope-reader-boundaries."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "main"
    base_sha: "5610a273a43b8eeb06a2d776d12a3be03d2fc01d"
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
            digest: "sha256:ccb87a4a85d5418de23e16adf4bc901778cb573f9bfcc49c5dc658f7fbfc1064"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            task_id: "202610310121-21Y197"
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
            digest: "sha256:19426dad79be952b34b78b1e20a3cb5bafdb259867dbbf4bbacc7bd17ac48e05"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ccb87a4a85d5418de23e16adf4bc901778cb573f9bfcc49c5dc658f7fbfc1064"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            task_id: "202610310121-21Y197"
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
            evidence_digest: "sha256:3ce55d74f1e157b434beb73f4f88f63030afb61c5eec64e31631ce9bb0fcbdfe"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:dc910db332aa10ce7e2e088f1fd1b4acbcc5ac804df34303b621949c9be3cbd7"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:19426dad79be952b34b78b1e20a3cb5bafdb259867dbbf4bbacc7bd17ac48e05"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            task_id: "202610310121-21Y197"
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
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            evidence_digest: "sha256:8543038a87c48b5e8ec7358003ec27b0ff6e8a97eb1024fab47bda417b062dde"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:65bf95e319bb17f45b94591c6d7f9c4c31a4f27fee60416aee56a965a1f06d77"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:dc910db332aa10ce7e2e088f1fd1b4acbcc5ac804df34303b621949c9be3cbd7"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            task_id: "202610310121-21Y197"
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
              - "packages/agentplane/src/commands/shared/task-backend.ts"
            evidence_digest: "sha256:e58d630fdbdb42dae1204196469737e3424c955f04e660261156df1d5e80017e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
        digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6017d1f68d675d62026e0810aa16fd46c4f3951f200728418135548f94fe7603"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
            expected_outputs:
              - "completed-reader-qualification-report"
            id: "qualify-completed-scope-reader-boundaries"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610310121-21Y197"
      intent_digest: "sha256:a56141a6df52a7f9ff4bba7ed1d09dc9636675b524809063242e3fa4f5a1e4b1"
      migration_receipts: []
      mutation_receipts:
        capture:202610310121-21Y197:
          after_revision: 1
          aggregate_digest: "sha256:34ef592f14b19c562af2273c76ba5a641e5cb6707fe1c5e1c417f745e87c54fa"
          before_revision: 0
          command_digest: "sha256:5c1094d13201fe07e650226e6b338ba91464c48bc40dc87216f9671505a7dd3b"
          effect_ids: []
          event_digests:
            - "sha256:efb5c60429a82fad7caef7a37368167ede0f0f5cc82088651e3edb7ffcad9bb2"
          mutation_id: "capture:202610310121-21Y197"
        kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:
          after_revision: 5
          aggregate_digest: "sha256:4c00e178f1c5764d9dd8b06eae1002e08328b90fbeb52d8a0599f0d55831d409"
          before_revision: 4
          command_digest: "sha256:27d3fead842ba2ad8c2b3357d658950b73b3620f4322fff154662359da6ce800"
          effect_ids: []
          event_digests:
            - "sha256:bcb8ce54093e2c6c9c58c7e9b509c73bb2ff42a1ea126cdd3d0ad6ed5a814dcb"
          mutation_id: "kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f:
          after_revision: 7
          aggregate_digest: "sha256:becfd0e3d1089e86b3f85bbd33a098252a7cfdba6d3178e80d93720a0ad20873"
          before_revision: 6
          command_digest: "sha256:5ac692be8d91e01e1981249c4fa9f3485ab1fc46e0fc6e24fae560b11f5549de"
          effect_ids: []
          event_digests:
            - "sha256:2b2c68a033d0088aba4c4d528dd2c6bf1d89ac5fb3d4a19072b66eff40908c5d"
          mutation_id: "kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f"
        kernel_work_item_execution_required:sha256:b28b3c3eb8ad23670af35b2d521cadc2d123f1c6eb261e7399577b9d65a62127:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e:
          after_revision: 21
          aggregate_digest: "sha256:370e096ff7f84450c6ef65f01d0a9986ca59ace51a720321b080d58a193e534e"
          before_revision: 20
          command_digest: "sha256:a366b18fea5a9886fb654b8b5d47db22abb972617c1efb491dd4b4a8031f2d53"
          effect_ids: []
          event_digests:
            - "sha256:da0a6262a3865e0b488418c1e02d8d48da3c81fce7eb16aa0585045812eb8e63"
          mutation_id: "kernel_work_item_execution_required:sha256:b28b3c3eb8ad23670af35b2d521cadc2d123f1c6eb261e7399577b9d65a62127:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
        kernel_work_item_execution_required:sha256:bd7bfed6230e0285e409b40e1d9281790871f6f61102b37d83616fb72903f316:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d:
          after_revision: 14
          aggregate_digest: "sha256:45bb8f9530ba7e4dc529377479178a5971949d5f2e9c21c3b8ab5ef306d844f4"
          before_revision: 13
          command_digest: "sha256:7fc5b5224dfe7939c417b7b779abfdac2ef3ccede91a459f84d45a34025a4144"
          effect_ids: []
          event_digests:
            - "sha256:4861567bafe285f6b444302fb8a06ddda6da6737eabca2f25d195277acdcabed"
          mutation_id: "kernel_work_item_execution_required:sha256:bd7bfed6230e0285e409b40e1d9281790871f6f61102b37d83616fb72903f316:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
        kernel_work_item_inspection_required:sha256:0dbe1ad47d2426ac4f5ce0f6a566fdb87199a8b8303851bab2a9fdf226aa56a2:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e:
          after_revision: 17
          aggregate_digest: "sha256:69d0b9e57b53340cce7ff49b94209b84795e48c47c9ceb0292ae119fd0e3d712"
          before_revision: 16
          command_digest: "sha256:0113ad16c5b2733dadaee267bdc73fedfe30e51e83d2494b524e89a8868363cf"
          effect_ids: []
          event_digests:
            - "sha256:ed72837af8b53820067120a8ecbb2dd3428d69587824abe6faeddcba22de974a"
          mutation_id: "kernel_work_item_inspection_required:sha256:0dbe1ad47d2426ac4f5ce0f6a566fdb87199a8b8303851bab2a9fdf226aa56a2:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
        kernel_work_item_inspection_required:sha256:5cbd84c296504e9569b666680aaf6a537705f170071f78ae1cce571b01721bb8:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d:
          after_revision: 10
          aggregate_digest: "sha256:8512592dad034adde850e9a47ac7d7c11eb50553f3a06dad9daaf4216c36d659"
          before_revision: 9
          command_digest: "sha256:c1a0acbe150a48e342914d336a0e684c6349d727fa43759c9c7bfc7dca2e452c"
          effect_ids: []
          event_digests:
            - "sha256:0c41b28b7a214455eb86276a08702be2eb3a29a76316c13155672b7bb7e6ccad"
          mutation_id: "kernel_work_item_inspection_required:sha256:5cbd84c296504e9569b666680aaf6a537705f170071f78ae1cce571b01721bb8:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
        kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:
          after_revision: 4
          aggregate_digest: "sha256:0e77fa25e7fffbea0f044396831e5409e46df0cb97f991f8c9915bbe8019c043"
          before_revision: 3
          command_digest: "sha256:84cb3889cc86575ad661cfc8d83209de84ac472d0eb8cad2ea20c9f615295957"
          effect_ids: []
          event_digests:
            - "sha256:10b4c9c1d8c92ad5ae933b7f76730e60e13ecd7ff68a1cf7151dd698fdfd6bae"
          mutation_id: "kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        kernel_work_item_rework_claim_required:sha256:77aa7f0ab0c4432091bcb742a0408761a883c6d97fa8648db6255ac0bdf8dcb7:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e:
          after_revision: 20
          aggregate_digest: "sha256:9511f47a5ab7b1b8afd5027483f19261d7d6ad60b49d1c2633dac4771b39942e"
          before_revision: 19
          command_digest: "sha256:d0f32e78d291ef1a48a700c17b09a05782201e8e04d134546c960dd076e88fb7"
          effect_ids: []
          event_digests:
            - "sha256:0396c0fad4e158ee85eea0d40f50199469ae6432a91418a9da1f3d89cfca544e"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:77aa7f0ab0c4432091bcb742a0408761a883c6d97fa8648db6255ac0bdf8dcb7:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
        kernel_work_item_rework_claim_required:sha256:e484ce49abd6b778f313fa4828b97c416c98efa0a49a4cca6d8f88f8cfd5254d:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d:
          after_revision: 13
          aggregate_digest: "sha256:925b09c2f12171665e9d1c9c0e949b9f85e0f7002208297d17531e3b77b10806"
          before_revision: 12
          command_digest: "sha256:2669e07226ee59f1ef055094e09f1e3e7e8307054069e4fc6e906989ed694a81"
          effect_ids: []
          event_digests:
            - "sha256:dc509eb0301d871d5c5db01075b3d6d92a4d1bcd4b73f68f7184f6758661acfd"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:e484ce49abd6b778f313fa4828b97c416c98efa0a49a4cca6d8f88f8cfd5254d:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
        plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da:
          after_revision: 2
          aggregate_digest: "sha256:00f2c8ef5cfe1abf527039c81b04db7edf6ab907a107dbfb99d23785ba6ea4a4"
          before_revision: 1
          command_digest: "sha256:202afb1f00245dc0383da4193a868f93e2b58cd2be504821fc28fcd094fbb2dd"
          effect_ids: []
          event_digests:
            - "sha256:5e395aa75416da5829d2e9b63b485ed4f7cb0517410e7f7b7f036d2e843e1888"
          mutation_id: "plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
        result:sha256:609b98a9189300cc16e8d9150041c88b52fdb93e8d4768157da48f9ad9346cf7:
          after_revision: 16
          aggregate_digest: "sha256:fe2e69c572451917bd57e21fa8f2f4c22284d9063cbe70e62cb08456f11d44f7"
          before_revision: 15
          command_digest: "sha256:d01bb76e9184325d0fc6f222a5cc06d90a755d7f76d73ac36eed080def3827a5"
          effect_ids: []
          event_digests:
            - "sha256:954b9031f418c1d4c4a4d643dac7b06aa1472f9474583450ce919370d0146972"
          mutation_id: "result:sha256:609b98a9189300cc16e8d9150041c88b52fdb93e8d4768157da48f9ad9346cf7"
        result:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929:
          after_revision: 9
          aggregate_digest: "sha256:839c13c57026d24719c7c79c0facbdccddca3d43697b8489e1a1914e448efdd0"
          before_revision: 8
          command_digest: "sha256:2a946475101552379cdabad0d69b295e67f1e636fb6f4fb4aa23a17b83dcfe90"
          effect_ids: []
          event_digests:
            - "sha256:5dc402e526285f98ab1d50d3746aa68562c6d206e0c28f1acb612ee23f469fc5"
          mutation_id: "result:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929"
        sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3:
          after_revision: 6
          aggregate_digest: "sha256:3fe4677fa2d5daf3870cba25c84cacead5bc537600d63920c754c9b87e358467"
          before_revision: 5
          command_digest: "sha256:22346aa18fe91f602e1b8edaddb900c66d93837a4c6f5593ffa58e131c77bde9"
          effect_ids: []
          event_digests:
            - "sha256:324a17dc789a4143c7cb0e31ae9f9d5881d98471253168f33c1a17ebeda06f00"
          mutation_id: "sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3"
        sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611:
          after_revision: 3
          aggregate_digest: "sha256:81e32993d50e437cc9402fdc451f8ee601e0c67d032e54b5283cadbb8d4a877e"
          before_revision: 2
          command_digest: "sha256:03eedfe86bc1afcdf73f374d440adc6bd8bff80be6c71ca639dcf1d9ebdc0b04"
          effect_ids: []
          event_digests:
            - "sha256:4903695a4dca326f9c8c15260d122c0df42c7a242d46df7cc0c6377317df429d"
          mutation_id: "sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611"
        sha256:ccc00d0f81f66a2ef9c271402399a6d55007b975df506c3f75c9f8523424e244:
          after_revision: 8
          aggregate_digest: "sha256:134e5d74189415ccd6f122b84e074635bcb33dc6e02ad3397c06615c7994cf8b"
          before_revision: 7
          command_digest: "sha256:650c8cf9d73564aadd159b03770810c7f63c0fc2ab35b1e924f9047764afb016"
          effect_ids: []
          event_digests:
            - "sha256:ccfcc272d04c7f8fd429c99c5579f3a7893a59f774011acbed3d750d85d0bd2e"
          mutation_id: "sha256:ccc00d0f81f66a2ef9c271402399a6d55007b975df506c3f75c9f8523424e244"
        sha256:e72b5fe2e8f5daf8c2e1e0315a01085250d1741a6d15106ca5f75c68723f3437:
          after_revision: 15
          aggregate_digest: "sha256:006e023a5cb6bb11d47c5d9ae5c34cae951fe814f4d2489db73d374a12b7d258"
          before_revision: 14
          command_digest: "sha256:2ad68f6d85ca232de77c71ad93d19fc64de198295da6c92434704fac416ca1f9"
          effect_ids: []
          event_digests:
            - "sha256:7efd08790406f1dd3a093940468e696da150015a7b0b683954969c7116b35036"
          mutation_id: "sha256:e72b5fe2e8f5daf8c2e1e0315a01085250d1741a6d15106ca5f75c68723f3437"
        validation-resolution:sha256:6b2eeadbca239bec52c11e04f8090b95c34df2f272b2689bf1d44c65c67c2fb1:
          after_revision: 12
          aggregate_digest: "sha256:0e9046f2668411084530d3a5e89afda717c34020655f590e48b4fca799e26d0d"
          before_revision: 11
          command_digest: "sha256:6b1004a3fabc996fc167ff41228d28c06803f38ceeca093121d97db275dca5b5"
          effect_ids: []
          event_digests:
            - "sha256:8de2b3f7afc1ff24e167039814aa17d71f3836e6ae877693afd8e0581b51f332"
          mutation_id: "validation-resolution:sha256:6b2eeadbca239bec52c11e04f8090b95c34df2f272b2689bf1d44c65c67c2fb1"
        validation-resolution:sha256:e05b7029ec63f738c6da4ffea1bdd4421d673a601f3a6d02ed17310410688136:
          after_revision: 19
          aggregate_digest: "sha256:934a1211ef3348de7589897135cd7594525623d4ffc188a79fc31426203c1cbc"
          before_revision: 18
          command_digest: "sha256:7ce05ee64d283fddc55058e2201d57668814cda8fff6ac14f6356caa042546fe"
          effect_ids: []
          event_digests:
            - "sha256:4e23e6a1e13abf190dac4d518f4d38bf640ff70832774d0e6b12cc5c57433132"
          mutation_id: "validation-resolution:sha256:e05b7029ec63f738c6da4ffea1bdd4421d673a601f3a6d02ed17310410688136"
        validation:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929:
          after_revision: 11
          aggregate_digest: "sha256:a7e8fc14fa6d9f2d5d4175ca2b851bdb588ad8482c0d43a0ac01a00d48699d81"
          before_revision: 10
          command_digest: "sha256:68b4efa942cc44f639c25c0dc23ca6c30b499a40bac3ca0a8ed38c6883a3220a"
          effect_ids: []
          event_digests:
            - "sha256:a8cbe61bd7e9b98fcaf4d17584f1ee8db244bf346cc0986957ac33eb5dbe2d87"
          mutation_id: "validation:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929"
        validation:sha256:a87886f11b6056157b8b636a63c98b59836f7992bca4380c88e24d7e922dc12a:
          after_revision: 18
          aggregate_digest: "sha256:d1ddd75a0325a9be0a3017dc76d3940c600fd3ca9357aaf59d396a15baf30a24"
          before_revision: 17
          command_digest: "sha256:9b4afe91ccffd5cec9e8d0e5a05d72653ca8b7be1105b04dd72df645207fadc4"
          effect_ids: []
          event_digests:
            - "sha256:c50d6af92e9a40a09482063cf66a83f55adf49b6df826f7c49e789ebb3e31b0e"
          mutation_id: "validation:sha256:a87886f11b6056157b8b636a63c98b59836f7992bca4380c88e24d7e922dc12a"
      plan_history: []
      revision: 21
      schema_version: 1
      state: "ACTIVE"
      work_items:
        qualify-completed-scope-reader-boundaries:
          attempt: 3
          claim_id: "sha256:9576fcf122fe8f7421cef5f0fd2bd4764460dd74a916c8d2d6ff304c634148ac"
          definition:
            contract_digest: "sha256:6017d1f68d675d62026e0810aa16fd46c4f3951f200728418135548f94fe7603"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
            expected_outputs:
              - "completed-reader-qualification-report"
            id: "qualify-completed-scope-reader-boundaries"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 15
          state: "EXECUTING"
          validation: null
    digest: "sha256:6507b27b920af13df57d8fe0a29e6330c695ce41407e27ca17cc91d2ac41a03f"
    documents:
      contracts:
        sha256:6017d1f68d675d62026e0810aa16fd46c4f3951f200728418135548f94fe7603:
          acceptance_criteria:
            - "Only the seven declared source/test paths change. Preserve original MRJ, VPB, cancelled and unstarted Tasks, all beforeimages and failed native evidence."
            - "The actual Node public Task list and intake work against retained canonical history. Strict completed proof authentication continues to reject forged copies, unknown proof bytes and the exact interrupted external partial before native admission."
            - "Raw TaskStore metadata becomes usable by native finish only through exact current source authentication. A separately bundled local backend receives no authority from object shape or a global registry. Remote backends do not recurse."
            - "The dedicated Task checkout requirement and exact adopted hosted-head qualification remain enforced. No production worktree routing, Doctor checks, Kernel state, plan or verification floor is weakened."
            - "Fresh full native CI, focused behavior regressions, routing and independent EVALUATOR qualify the implementation. Complete the protected canonical hosted PR/merge. Preserve data, credentials, runtime guards, all worktrees and branches."
          objective: "Restore authenticated completed-scope reads at native finish and across Node command bundle boundaries. Preserve strict proof, source, Kernel, history and verification floor checks. Ordinary WorkItem history and pre-Kernel metadata retain their existing read contract. Production dedicated Task checkout routing remains unchanged. Implement the simplest bounded source correction and behavior regressions."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts"
            - "node .agentplane/policy/check-routing.mjs"
      intent:
        context: "The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task."
        objective: "Fix completed-scope metadata readers across Node command bundles"
    events:
      -
        command_digest: "sha256:5c1094d13201fe07e650226e6b338ba91464c48bc40dc87216f9671505a7dd3b"
        id: "capture:202610310121-21Y197:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610310121-21Y197"
        occurred_at: "2026-10-31T01:21:20.991Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610310121-21Y197"
        task_revision: 1
      -
        command_digest: "sha256:202afb1f00245dc0383da4193a868f93e2b58cd2be504821fc28fcd094fbb2dd"
        id: "plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
        occurred_at: "2026-10-31T01:22:08.145Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610310121-21Y197"
        task_revision: 2
      -
        command_digest: "sha256:03eedfe86bc1afcdf73f374d440adc6bd8bff80be6c71ca639dcf1d9ebdc0b04"
        id: "sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611"
        occurred_at: "2026-10-31T01:23:09.386Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610310121-21Y197"
        task_revision: 3
      -
        command_digest: "sha256:84cb3889cc86575ad661cfc8d83209de84ac472d0eb8cad2ea20c9f615295957"
        id: "kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        occurred_at: "2026-10-31T01:23:52.343Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610310121-21Y197"
        task_revision: 4
      -
        command_digest: "sha256:27d3fead842ba2ad8c2b3357d658950b73b3620f4322fff154662359da6ce800"
        id: "kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        occurred_at: "2026-10-31T01:23:57.769Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610310121-21Y197"
        task_revision: 5
      -
        command_digest: "sha256:22346aa18fe91f602e1b8edaddb900c66d93837a4c6f5593ffa58e131c77bde9"
        id: "sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3"
        occurred_at: "2026-10-31T01:25:01.128Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610310121-21Y197"
        task_revision: 6
      -
        command_digest: "sha256:5ac692be8d91e01e1981249c4fa9f3485ab1fc46e0fc6e24fae560b11f5549de"
        id: "kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f"
        occurred_at: "2026-10-31T01:25:03.800Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610310121-21Y197"
        task_revision: 7
      -
        command_digest: "sha256:650c8cf9d73564aadd159b03770810c7f63c0fc2ab35b1e924f9047764afb016"
        id: "sha256:ccc00d0f81f66a2ef9c271402399a6d55007b975df506c3f75c9f8523424e244:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ccc00d0f81f66a2ef9c271402399a6d55007b975df506c3f75c9f8523424e244"
        occurred_at: "2026-10-31T01:26:36.364Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610310121-21Y197"
        task_revision: 8
      -
        command_digest: "sha256:2a946475101552379cdabad0d69b295e67f1e636fb6f4fb4aa23a17b83dcfe90"
        id: "result:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929"
        occurred_at: "2026-10-31T01:26:38.848Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610310121-21Y197"
        task_revision: 9
      -
        command_digest: "sha256:c1a0acbe150a48e342914d336a0e684c6349d727fa43759c9c7bfc7dca2e452c"
        id: "kernel_work_item_inspection_required:sha256:5cbd84c296504e9569b666680aaf6a537705f170071f78ae1cce571b01721bb8:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5cbd84c296504e9569b666680aaf6a537705f170071f78ae1cce571b01721bb8:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
        occurred_at: "2026-10-31T01:26:40.754Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610310121-21Y197"
        task_revision: 10
      -
        command_digest: "sha256:68b4efa942cc44f639c25c0dc23ca6c30b499a40bac3ca0a8ed38c6883a3220a"
        id: "validation:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7c6bbdec99df20f9b70affe2c6fdd60ba1f738e2746c6bbefeca134a38ed7929"
        occurred_at: "2026-10-31T01:47:17.346Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610310121-21Y197"
        task_revision: 11
      -
        command_digest: "sha256:6b1004a3fabc996fc167ff41228d28c06803f38ceeca093121d97db275dca5b5"
        id: "validation-resolution:sha256:6b2eeadbca239bec52c11e04f8090b95c34df2f272b2689bf1d44c65c67c2fb1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:6b2eeadbca239bec52c11e04f8090b95c34df2f272b2689bf1d44c65c67c2fb1"
        occurred_at: "2026-10-31T01:47:18.642Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610310121-21Y197"
        task_revision: 12
      -
        command_digest: "sha256:2669e07226ee59f1ef055094e09f1e3e7e8307054069e4fc6e906989ed694a81"
        id: "kernel_work_item_rework_claim_required:sha256:e484ce49abd6b778f313fa4828b97c416c98efa0a49a4cca6d8f88f8cfd5254d:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:e484ce49abd6b778f313fa4828b97c416c98efa0a49a4cca6d8f88f8cfd5254d:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
        occurred_at: "2026-10-31T01:47:21.648Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610310121-21Y197"
        task_revision: 13
      -
        command_digest: "sha256:7fc5b5224dfe7939c417b7b779abfdac2ef3ccede91a459f84d45a34025a4144"
        id: "kernel_work_item_execution_required:sha256:bd7bfed6230e0285e409b40e1d9281790871f6f61102b37d83616fb72903f316:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bd7bfed6230e0285e409b40e1d9281790871f6f61102b37d83616fb72903f316:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
        occurred_at: "2026-10-31T01:47:24.282Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610310121-21Y197"
        task_revision: 14
      -
        command_digest: "sha256:2ad68f6d85ca232de77c71ad93d19fc64de198295da6c92434704fac416ca1f9"
        id: "sha256:e72b5fe2e8f5daf8c2e1e0315a01085250d1741a6d15106ca5f75c68723f3437:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e72b5fe2e8f5daf8c2e1e0315a01085250d1741a6d15106ca5f75c68723f3437"
        occurred_at: "2026-10-31T01:49:13.331Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202610310121-21Y197"
        task_revision: 15
      -
        command_digest: "sha256:d01bb76e9184325d0fc6f222a5cc06d90a755d7f76d73ac36eed080def3827a5"
        id: "result:sha256:609b98a9189300cc16e8d9150041c88b52fdb93e8d4768157da48f9ad9346cf7:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:609b98a9189300cc16e8d9150041c88b52fdb93e8d4768157da48f9ad9346cf7"
        occurred_at: "2026-10-31T01:49:15.891Z"
        payload_digest: "sha256:65ed57f35d56cd4d5fe4a04e740d17ef559994be45d975af0038865264a2e057"
        task_id: "202610310121-21Y197"
        task_revision: 16
      -
        command_digest: "sha256:0113ad16c5b2733dadaee267bdc73fedfe30e51e83d2494b524e89a8868363cf"
        id: "kernel_work_item_inspection_required:sha256:0dbe1ad47d2426ac4f5ce0f6a566fdb87199a8b8303851bab2a9fdf226aa56a2:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:0dbe1ad47d2426ac4f5ce0f6a566fdb87199a8b8303851bab2a9fdf226aa56a2:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
        occurred_at: "2026-10-31T01:49:17.842Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610310121-21Y197"
        task_revision: 17
      -
        command_digest: "sha256:9b4afe91ccffd5cec9e8d0e5a05d72653ca8b7be1105b04dd72df645207fadc4"
        id: "validation:sha256:a87886f11b6056157b8b636a63c98b59836f7992bca4380c88e24d7e922dc12a:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a87886f11b6056157b8b636a63c98b59836f7992bca4380c88e24d7e922dc12a"
        occurred_at: "2026-10-31T02:16:01.187Z"
        payload_digest: "sha256:34fb2c7df7c3ffe366b6efd5f6512645a1724b637b6d1619a9bdf5f199c6773d"
        task_id: "202610310121-21Y197"
        task_revision: 18
      -
        command_digest: "sha256:7ce05ee64d283fddc55058e2201d57668814cda8fff6ac14f6356caa042546fe"
        id: "validation-resolution:sha256:e05b7029ec63f738c6da4ffea1bdd4421d673a601f3a6d02ed17310410688136:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e05b7029ec63f738c6da4ffea1bdd4421d673a601f3a6d02ed17310410688136"
        occurred_at: "2026-10-31T02:16:02.481Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610310121-21Y197"
        task_revision: 19
      -
        command_digest: "sha256:d0f32e78d291ef1a48a700c17b09a05782201e8e04d134546c960dd076e88fb7"
        id: "kernel_work_item_rework_claim_required:sha256:77aa7f0ab0c4432091bcb742a0408761a883c6d97fa8648db6255ac0bdf8dcb7:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:77aa7f0ab0c4432091bcb742a0408761a883c6d97fa8648db6255ac0bdf8dcb7:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
        occurred_at: "2026-10-31T02:16:04.957Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610310121-21Y197"
        task_revision: 20
      -
        command_digest: "sha256:a366b18fea5a9886fb654b8b5d47db22abb972617c1efb491dd4b4a8031f2d53"
        id: "kernel_work_item_execution_required:sha256:b28b3c3eb8ad23670af35b2d521cadc2d123f1c6eb261e7399577b9d65a62127:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b28b3c3eb8ad23670af35b2d521cadc2d123f1c6eb261e7399577b9d65a62127:sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
        occurred_at: "2026-10-31T02:16:06.815Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610310121-21Y197"
        task_revision: 21
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix completed-scope metadata readers across Node command bundles

The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.

## Scope

- In scope: The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.
- Out of scope: unrelated refactors not required for "Fix completed-scope metadata readers across Node command bundles".

## Plan

1. Execute approved WorkItem qualify-completed-scope-reader-boundaries.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
