---
id: "202610310121-21Y197"
title: "Fix completed-scope metadata readers across Node command bundles"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 41
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
  updated_at: "2026-10-31T03:20:35.979Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-31T02:54:21.557Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:7c629e37833d71c196f9e89d28fb9f02dcfc059d0db49bf4684b458691a1dbe6"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-31T02:54:21.557Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "b67dccc1794ffae31ad1bc1f923b571d83616ccc"
  review_identity_digest: "sha256:7939b845bdf7a27909e7996543501f0120e3d418fc8a2047a37fc65eae84bf92"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610310121-21Y197/71d449afd5d187ad89b2d70730d4d895b1f10a0851980d727e9502168d7da994/quality-report.json"
  findings:
    - "Reviewed the full seven-path source delta against canonical561 and the final two-path correction at b67dccc1794ffae31ad1bc1f923b571d83616ccc. The production dedicated Task checkout router is byte-identical. No historical Task or verification floor was rewritten by the source change."
    - "The captured raw finish metadata is authenticated against its exact current native source. Foreign local command bundles reload a native context with a finite class-instance stop; remote backends do not enter this branch. No global permit registry or copied-object authority was introduced."
    - "Ordinary WorkItem history remains under the existing Kernel read contract. Real completed-scope admissions and the precise applied external legacy partial retain strict source, proof and floor checks. The unrelated-repository test preserves historical readability without granting current-repository authority."
    - "The compact raw lookup now follows configured workflow_dir. The native compact backend independently requires its standard store; the same-ID foreign custom-store test verifies supported namespace selection without bypassing that constraint."
    - "All13 required blocks and all4 required input artifacts were consumed and their digests verified, including native artifacts with their own digest excluded according to the native envelope convention. Native65493d61 records full CI exit0/1453449ms, eight focused files75 tests exit0/138338ms, and routing exit0. The canonical report8a460e7b matches its exact artifact. Previous failures and reviews remain retained."
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
commit:
  hash: "b67dccc1794ffae31ad1bc1f923b571d83616ccc"
  message: "AgentPlane-owned canonical implementation commit"
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
  Plan: |-
    1. Execute approved WorkItem qualify-completed-scope-reader-boundaries.
    2. Execute approved WorkItem final-correction-d51d5365fdd8.
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
  agentplane.kernel_operational_projection:
    digest: "sha256:c70303ec3e7c5a494a879fc3daa29df75510d75453a480a5839f605315bb677a"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610310121-21Y197/71d449afd5d187ad89b2d70730d4d895b1f10a0851980d727e9502168d7da994/quality-report.json"
    findings:
      - "Reviewed the full seven-path source delta against canonical561 and the final two-path correction at b67dccc1794ffae31ad1bc1f923b571d83616ccc. The production dedicated Task checkout router is byte-identical. No historical Task or verification floor was rewritten by the source change."
      - "The captured raw finish metadata is authenticated against its exact current native source. Foreign local command bundles reload a native context with a finite class-instance stop; remote backends do not enter this branch. No global permit registry or copied-object authority was introduced."
      - "Ordinary WorkItem history remains under the existing Kernel read contract. Real completed-scope admissions and the precise applied external legacy partial retain strict source, proof and floor checks. The unrelated-repository test preserves historical readability without granting current-repository authority."
      - "The compact raw lookup now follows configured workflow_dir. The native compact backend independently requires its standard store; the same-ID foreign custom-store test verifies supported namespace selection without bypassing that constraint."
      - "All13 required blocks and all4 required input artifacts were consumed and their digests verified, including native artifacts with their own digest excluded according to the native envelope convention. Native65493d61 records full CI exit0/1453449ms, eight focused files75 tests exit0/138338ms, and routing exit0. The canonical report8a460e7b matches its exact artifact. Previous failures and reviews remain retained."
    implementation_commit: "b67dccc1794ffae31ad1bc1f923b571d83616ccc"
    implementation_tree: "e65e21e8073b584871462cb437d5254f965b9bf1"
    projected_at: "2026-10-31T02:54:21.557Z"
    review_identity_digest: "sha256:7939b845bdf7a27909e7996543501f0120e3d418fc8a2047a37fc65eae84bf92"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:7c629e37833d71c196f9e89d28fb9f02dcfc059d0db49bf4684b458691a1dbe6"
    work_order_id: "sha256:fe331fd04aaf1a9c882660c86bf3ff7dc50310d618c0920b171453e919c60458"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4c1565a0d3623428ae0dedfd5617a6f183bb08644550096efd8872269444f08c"
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
              parent_authority_digest: "sha256:65bf95e319bb17f45b94591c6d7f9c4c31a4f27fee60416aee56a965a1f06d77"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
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
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
            evidence_digest: "sha256:b376a2b338443f107fc8a5fdacb120e9d2401446bc1ac2b99490ea517e97b709"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2fba77a66800fcbf7849f95d81081709bb04b01365a70e87d1066dff8599209e"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:dae4da10403223b775222865178a8602ccb23bf69e12bf4e225c87ac324abba4"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:7143e074601b7b635a75d5aebc9cff3e76bd084d438a3828c024604762d45f3b"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4c1565a0d3623428ae0dedfd5617a6f183bb08644550096efd8872269444f08c"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
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
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:ce488288fbfa01bc2b4fa447c2d28f4d7631bb100c3ef6e9c44b88fd28f06d70"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6d27e745434ece6654f752982a0b95ae968539523b7c1c2f629be2b0ac08485f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:7143e074601b7b635a75d5aebc9cff3e76bd084d438a3828c024604762d45f3b"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:dae4da10403223b775222865178a8602ccb23bf69e12bf4e225c87ac324abba4"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1"
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
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            evidence_digest: "sha256:e971cac7ec5b96d919bd7e7512b220ca27ee6a6467df1495952f35e045b5e775"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:d584f5fcb9d1674d777143c2058e223550df2b34bacbc95da378a2a6e2a76e8a"
        digest: "sha256:7143e074601b7b635a75d5aebc9cff3e76bd084d438a3828c024604762d45f3b"
        revision: 2
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
          -
            contract_digest: "sha256:9f47088e6f7cf5816cf0d7057d4ba0ec1f8dcefcfdf6b486a1692e7912e9edac"
            depends_on:
              - "qualify-completed-scope-reader-boundaries"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
                - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            expected_outputs:
              - "final-correction-d51d5365fdd8-evidence"
            id: "final-correction-d51d5365fdd8"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610310121-21Y197"
      intent_digest: "sha256:a56141a6df52a7f9ff4bba7ed1d09dc9636675b524809063242e3fa4f5a1e4b1"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:7143e074601b7b635a75d5aebc9cff3e76bd084d438a3828c024604762d45f3b:
          after_revision: 28
          aggregate_digest: "sha256:b112308d6a096569a36ed000d52ee899e4acff3f019ad975de7bad05137f079f"
          before_revision: 27
          command_digest: "sha256:c348348223fc569c14d6dee81d031f86f64abcf97ed37117c870d27a55d58e7e"
          effect_ids: []
          event_digests:
            - "sha256:7d2e9753714ed5936be8f9e99adda20bf32be6a628383e8b63c1e93099a0750e"
          mutation_id: "amend:sha256:7143e074601b7b635a75d5aebc9cff3e76bd084d438a3828c024604762d45f3b"
        capture:202610310121-21Y197:
          after_revision: 1
          aggregate_digest: "sha256:34ef592f14b19c562af2273c76ba5a641e5cb6707fe1c5e1c417f745e87c54fa"
          before_revision: 0
          command_digest: "sha256:5c1094d13201fe07e650226e6b338ba91464c48bc40dc87216f9671505a7dd3b"
          effect_ids: []
          event_digests:
            - "sha256:efb5c60429a82fad7caef7a37368167ede0f0f5cc82088651e3edb7ffcad9bb2"
          mutation_id: "capture:202610310121-21Y197"
        final-validation:sha256:d51d5365fdd84b04e8345d5a8ae40d38ee843d781091028ea5dcc419194a3c31:26:
          after_revision: 27
          aggregate_digest: "sha256:ea8553c396938a8e1b4ddee72a75cf38296c7c6b7f3f7f91e1331b160bf0c547"
          before_revision: 26
          command_digest: "sha256:154ca71a1d27ecd39591c136ff6532d7e282cfafa5d270b43118392a62270d85"
          effect_ids: []
          event_digests:
            - "sha256:8fa74a7e717fd3d4af693b909f995b7a16beca77f984075d77f0c999bf5c9872"
          mutation_id: "final-validation:sha256:d51d5365fdd84b04e8345d5a8ae40d38ee843d781091028ea5dcc419194a3c31:26"
        kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:
          after_revision: 5
          aggregate_digest: "sha256:4c00e178f1c5764d9dd8b06eae1002e08328b90fbeb52d8a0599f0d55831d409"
          before_revision: 4
          command_digest: "sha256:27d3fead842ba2ad8c2b3357d658950b73b3620f4322fff154662359da6ce800"
          effect_ids: []
          event_digests:
            - "sha256:bcb8ce54093e2c6c9c58c7e9b509c73bb2ff42a1ea126cdd3d0ad6ed5a814dcb"
          mutation_id: "kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        kernel_work_item_claim_required:sha256:812c5d7a72703ad08099f159fbfb663607f7388af3a96562d332d1dda80a23e1:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8:
          after_revision: 30
          aggregate_digest: "sha256:42bd84ef639251906e5bca94e40b9252aa84ee08abcdc9c526524eaa338fd74c"
          before_revision: 29
          command_digest: "sha256:7ccaa7df6794673de71b0f1451e65a9ff6bc605e9d7e2f7acd252028744b4872"
          effect_ids: []
          event_digests:
            - "sha256:73e44dc7e61222b944b1049a4f35d3524a7ce1039d090dc68af77af6d0d0435b"
          mutation_id: "kernel_work_item_claim_required:sha256:812c5d7a72703ad08099f159fbfb663607f7388af3a96562d332d1dda80a23e1:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
        kernel_work_item_execution_required:sha256:473b5143b518225fe978dfb1a1330a33802fc4538996e220e2e0dcd74aef95ec:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1:
          after_revision: 38
          aggregate_digest: "sha256:4e00a9867c4757d5e2e465ca2c06b63c8bbeb1cabf6b806a1526722a12369dcf"
          before_revision: 37
          command_digest: "sha256:d3f24b1ad87890209766fbe99b24cd25fad3cdf33e1929e3f35d7af905cbf738"
          effect_ids: []
          event_digests:
            - "sha256:80cebe579847f196e37fa4bed1767e32031d6c69a6d925f551f0072747b51b03"
          mutation_id: "kernel_work_item_execution_required:sha256:473b5143b518225fe978dfb1a1330a33802fc4538996e220e2e0dcd74aef95ec:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1"
        kernel_work_item_execution_required:sha256:720fab031028213c51b24da894457f23b87a499d874be6ae64c1708e862a7c7d:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8:
          after_revision: 31
          aggregate_digest: "sha256:d1f11417f2552ac951d5e3856ba449f955a6228dc9f2eee404fec79b85706fe0"
          before_revision: 30
          command_digest: "sha256:bfa8d10aad7beedcd9d86e82bb1c3649dc4a09a19aa69cab4a4b1377ddf44dc9"
          effect_ids: []
          event_digests:
            - "sha256:645ca941a6f141f689c2034a2bf80c301a0157091d6b89a611a9741b2f7320e0"
          mutation_id: "kernel_work_item_execution_required:sha256:720fab031028213c51b24da894457f23b87a499d874be6ae64c1708e862a7c7d:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
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
        kernel_work_item_inspection_required:sha256:3f1915ec3165e136e1ac92b8ee48cb5a53d76799ba67f2ceb8486ad7fd698cb0:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8:
          after_revision: 24
          aggregate_digest: "sha256:baaceeab599f34ecb469d86daa85ad06bcab5f014cf637a5b57da980217a4321"
          before_revision: 23
          command_digest: "sha256:2fd862d3ff361beebba457f0444cd5333fbb304e75b13faacfb77855e1dcb1e3"
          effect_ids: []
          event_digests:
            - "sha256:34c9bd20b7792957055352c424986b813b17f7c136e29b0b382eefa727a40f53"
          mutation_id: "kernel_work_item_inspection_required:sha256:3f1915ec3165e136e1ac92b8ee48cb5a53d76799ba67f2ceb8486ad7fd698cb0:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
        kernel_work_item_inspection_required:sha256:5cbd84c296504e9569b666680aaf6a537705f170071f78ae1cce571b01721bb8:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d:
          after_revision: 10
          aggregate_digest: "sha256:8512592dad034adde850e9a47ac7d7c11eb50553f3a06dad9daaf4216c36d659"
          before_revision: 9
          command_digest: "sha256:c1a0acbe150a48e342914d336a0e684c6349d727fa43759c9c7bfc7dca2e452c"
          effect_ids: []
          event_digests:
            - "sha256:0c41b28b7a214455eb86276a08702be2eb3a29a76316c13155672b7bb7e6ccad"
          mutation_id: "kernel_work_item_inspection_required:sha256:5cbd84c296504e9569b666680aaf6a537705f170071f78ae1cce571b01721bb8:sha256:8ee0a12179c8b17cd4d12598306145f23705ee3f6e50c139f8a26e2e974c445d"
        kernel_work_item_inspection_required:sha256:8102933586d8d0dd9452e1276a66deb4a6f4def2a430ed52f1dd1d0d86f7587b:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1:
          after_revision: 34
          aggregate_digest: "sha256:5501ae6a32870dffb8db1fea780dda2ea0d81e9d59d1c5300d4784a10a1aae7c"
          before_revision: 33
          command_digest: "sha256:f7ab85ce734d21964abfb94d1af2992864119045c181ca992ced71296d1a7149"
          effect_ids: []
          event_digests:
            - "sha256:ab1e59d5154898f0db4b69d1c93e48f6dab8a4ec01b841ebcf35a7bfa033c418"
          mutation_id: "kernel_work_item_inspection_required:sha256:8102933586d8d0dd9452e1276a66deb4a6f4def2a430ed52f1dd1d0d86f7587b:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1"
        kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:
          after_revision: 4
          aggregate_digest: "sha256:0e77fa25e7fffbea0f044396831e5409e46df0cb97f991f8c9915bbe8019c043"
          before_revision: 3
          command_digest: "sha256:84cb3889cc86575ad661cfc8d83209de84ac472d0eb8cad2ea20c9f615295957"
          effect_ids: []
          event_digests:
            - "sha256:10b4c9c1d8c92ad5ae933b7f76730e60e13ecd7ff68a1cf7151dd698fdfd6bae"
          mutation_id: "kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        kernel_work_item_rework_claim_required:sha256:01350960661e82f4525f0344c391007b1b062e565b9b6ca544e85b1eb2cfb1af:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1:
          after_revision: 37
          aggregate_digest: "sha256:4223b49e8885404f7790bcbaa0a792653df9a0b47c6f1fa7429d3d84671b74a6"
          before_revision: 36
          command_digest: "sha256:56fe45d8d31d0c197f4974ac67ebccd86834577ea2cc725dbe7c5d49efa73b38"
          effect_ids: []
          event_digests:
            - "sha256:6ce18ecf56feeb2983eee0a40fea3a0a652dd3ddcdf4cc9c382f174f8084b210"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:01350960661e82f4525f0344c391007b1b062e565b9b6ca544e85b1eb2cfb1af:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1"
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
        result:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be:
          after_revision: 33
          aggregate_digest: "sha256:8dfd792e5a60f963c52733763a1a922e3b1e8a683d1e3ee6e8884fc7ce00864a"
          before_revision: 32
          command_digest: "sha256:5d4e228798b63ce26273364526704646842c0899d1fc6ca3392eb39ddc7cc823"
          effect_ids: []
          event_digests:
            - "sha256:a1933d162c251191b123728a14ae6f5a1414c29548f9a5162d08a2427621b19d"
          mutation_id: "result:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be"
        result:sha256:fe331fd04aaf1a9c882660c86bf3ff7dc50310d618c0920b171453e919c60458:
          after_revision: 23
          aggregate_digest: "sha256:ce48c7da3907c3aca72c89813cfde20ef035f4f453f554e5ce9c0c886d465d27"
          before_revision: 22
          command_digest: "sha256:9d3d126cf1dcab0c7ac53a3e44e001d3f3fc85f20faed0172360bd4ac09d0698"
          effect_ids: []
          event_digests:
            - "sha256:0c911600f3ed11d5e9a4cb1dd3859f7a0e89cec8e2335776fe113f50f864fdb3"
          mutation_id: "result:sha256:fe331fd04aaf1a9c882660c86bf3ff7dc50310d618c0920b171453e919c60458"
        sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3:
          after_revision: 6
          aggregate_digest: "sha256:3fe4677fa2d5daf3870cba25c84cacead5bc537600d63920c754c9b87e358467"
          before_revision: 5
          command_digest: "sha256:22346aa18fe91f602e1b8edaddb900c66d93837a4c6f5593ffa58e131c77bde9"
          effect_ids: []
          event_digests:
            - "sha256:324a17dc789a4143c7cb0e31ae9f9d5881d98471253168f33c1a17ebeda06f00"
          mutation_id: "sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3"
        sha256:4b1c4963a8c7180fd81987cfa6a5ff7449c2733e394897c91cff07faee09d8cc:
          after_revision: 22
          aggregate_digest: "sha256:4d8d899a6c3efce1437455285352b9f905c6872cb8c2bcceaf9e9b7f1214ef25"
          before_revision: 21
          command_digest: "sha256:e6372ff20712da1d1b4c3527b27c99dceb8c57adae370d11a383ca2300bad5b8"
          effect_ids: []
          event_digests:
            - "sha256:158871d747549d3f440480949ba6940036a9edd6653d38e105f92866a24af192"
          mutation_id: "sha256:4b1c4963a8c7180fd81987cfa6a5ff7449c2733e394897c91cff07faee09d8cc"
        sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611:
          after_revision: 3
          aggregate_digest: "sha256:81e32993d50e437cc9402fdc451f8ee601e0c67d032e54b5283cadbb8d4a877e"
          before_revision: 2
          command_digest: "sha256:03eedfe86bc1afcdf73f374d440adc6bd8bff80be6c71ca639dcf1d9ebdc0b04"
          effect_ids: []
          event_digests:
            - "sha256:4903695a4dca326f9c8c15260d122c0df42c7a242d46df7cc0c6377317df429d"
          mutation_id: "sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611"
        sha256:a8549950829bd3d04e49b0500e8740373cb0fddc23fc7950384c253e04b715cc:
          after_revision: 32
          aggregate_digest: "sha256:d130bfb1d4d0a38da1c04a6c4f98a92fed4d6a2731bdfb6076b8f3adc05a653d"
          before_revision: 31
          command_digest: "sha256:3380332ddb25bcaae6143f193a0e4725f854ab42b06fc865b550ddf753c15c2c"
          effect_ids: []
          event_digests:
            - "sha256:b62513b7d33341db21bece50c1c835bb9ed0aa2f6f1cc598c377ea992e50bed4"
          mutation_id: "sha256:a8549950829bd3d04e49b0500e8740373cb0fddc23fc7950384c253e04b715cc"
        sha256:b29a5a8280fa20ae1cbd3cde25dd3cb27fee81fb9f55f55fe10ecc4c29a5b41e:
          after_revision: 29
          aggregate_digest: "sha256:287b1e77a8e1f69cfff4e2c03ccdc2a5458614b1b1c8dad200d14068e866df24"
          before_revision: 28
          command_digest: "sha256:d3bf504df0f061b84833b76eae94d5a1aab923b455c982aca668de9f8b4c4a4d"
          effect_ids: []
          event_digests:
            - "sha256:4631d7e0996ccaad8a9820f0b7cf993a92ced4f0513a629f18903a3a546b0e8b"
          mutation_id: "sha256:b29a5a8280fa20ae1cbd3cde25dd3cb27fee81fb9f55f55fe10ecc4c29a5b41e"
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
        validation-resolution:sha256:8ec452f16a10751ecf6118d1659d937d470d5c631b93f0c87890f00e2254a0de:
          after_revision: 36
          aggregate_digest: "sha256:356327e014f1af978c8659917a04d67b1710674ca6da5a200051fdf848e8ed45"
          before_revision: 35
          command_digest: "sha256:cf0e7afc2539903372325fde75f4ba61722c434817171da4df298be8dd449216"
          effect_ids: []
          event_digests:
            - "sha256:9c9ec332c1318b94fbf7128277c738a2066492131df5c68d7c70694f624f4380"
          mutation_id: "validation-resolution:sha256:8ec452f16a10751ecf6118d1659d937d470d5c631b93f0c87890f00e2254a0de"
        validation-resolution:sha256:cd973284ce2679334c54e3e768157d961d6562429437997898997fdae2cc9e73:
          after_revision: 26
          aggregate_digest: "sha256:109c5be44bc1315de4ba66fee5df2b2c8f2b135cc11bdc53deb61ad56d8326b2"
          before_revision: 25
          command_digest: "sha256:4fdc54d97d6664d0f79502bf2f02a4d19a2e15852de517aa2834f781d61d39c1"
          effect_ids: []
          event_digests:
            - "sha256:d0f66a8b620390af636f85243303e40aa478d5ea52b13dd3273c4ed9a26baa97"
          mutation_id: "validation-resolution:sha256:cd973284ce2679334c54e3e768157d961d6562429437997898997fdae2cc9e73"
        validation-resolution:sha256:e05b7029ec63f738c6da4ffea1bdd4421d673a601f3a6d02ed17310410688136:
          after_revision: 19
          aggregate_digest: "sha256:934a1211ef3348de7589897135cd7594525623d4ffc188a79fc31426203c1cbc"
          before_revision: 18
          command_digest: "sha256:7ce05ee64d283fddc55058e2201d57668814cda8fff6ac14f6356caa042546fe"
          effect_ids: []
          event_digests:
            - "sha256:4e23e6a1e13abf190dac4d518f4d38bf640ff70832774d0e6b12cc5c57433132"
          mutation_id: "validation-resolution:sha256:e05b7029ec63f738c6da4ffea1bdd4421d673a601f3a6d02ed17310410688136"
        validation:sha256:71d449afd5d187ad89b2d70730d4d895b1f10a0851980d727e9502168d7da994:
          after_revision: 25
          aggregate_digest: "sha256:3586afd1c6c613485c3b9e7889889025269813665f202752c10a9ba2b850852c"
          before_revision: 24
          command_digest: "sha256:8ce9f43df8d87816c610d6d0574e386965c709f06f6c8dd740aa7f11d2b4c8b1"
          effect_ids: []
          event_digests:
            - "sha256:a480d69ecb53f1d440f4c67f8164ca41e7d50395296d949f2a18e3e9e16b0ed8"
          mutation_id: "validation:sha256:71d449afd5d187ad89b2d70730d4d895b1f10a0851980d727e9502168d7da994"
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
        validation:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be:
          after_revision: 35
          aggregate_digest: "sha256:d9566f03eeed4a4a9d56b2334a44c4cac1e25ed2e2fd09e3e89209c99a87e235"
          before_revision: 34
          command_digest: "sha256:b55f0661c681a0cab5bffc183f9c4c7a72a1c6c05916d65576f2fe2864ef68b8"
          effect_ids: []
          event_digests:
            - "sha256:d55020f9fd93e7191dc823199870b49db02715dec0604c796e1fb37a83b99f1a"
          mutation_id: "validation:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
          digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
          revision: 1
          state: "SUPERSEDED"
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
      revision: 38
      schema_version: 1
      state: "ACTIVE"
      work_items:
        final-correction-d51d5365fdd8:
          attempt: 2
          claim_id: "sha256:7b9af8cb1e97924edb430de6be934c5ad33b10d5cdcd8f0545f0d0e324eaff14"
          definition:
            contract_digest: "sha256:9f47088e6f7cf5816cf0d7057d4ba0ec1f8dcefcfdf6b486a1692e7912e9edac"
            depends_on:
              - "qualify-completed-scope-reader-boundaries"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
                - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            expected_outputs:
              - "final-correction-d51d5365fdd8-evidence"
            id: "final-correction-d51d5365fdd8"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 10
          state: "EXECUTING"
          validation: null
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
          output_manifests:
            -
              attempt: 3
              digest: "sha256:8a460e7baea126aa2cf6a233a97638de8e8e9256d2d0977b6779e1005248c4ec"
              id: "completed-reader-qualification-report"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
              task_id: "202610310121-21Y197"
              work_item_id: "qualify-completed-scope-reader-boundaries"
          result_digest: "sha256:83e66682e57e36fc5789e4538585b3dd66cddef95132d000bdeb04e7d4377cde"
          revision: 19
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:65493d6170d8986ec0861201f3c686e39452f516d9ce781a9c67a2578196a9d5"
              - "sha256:7939b845bdf7a27909e7996543501f0120e3d418fc8a2047a37fc65eae84bf92"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:89a4755dcaed844b9417c0df20bde1c60f5b72e2489d9b6de554a0e04120fbaa"
              environment_digest: "sha256:fe84827735143ca4f4a34d35c5818629ed7eb259dd23d2060224073fa45cd46b"
              implementation_identity: "sha256:83e66682e57e36fc5789e4538585b3dd66cddef95132d000bdeb04e7d4377cde"
              toolchain_digest: "sha256:d2c612397df84c985d305c9e00234d88e65624eefb509b6cf6045ed92e3f5918"
            observed_at: "2026-10-31T02:54:21.557Z"
            status: "PASSED"
    digest: "sha256:84ce88fc6a57fc1590dba623013d422e8f0329c3cbd6b5c52886de7e4003e799"
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
        sha256:9f47088e6f7cf5816cf0d7057d4ba0ec1f8dcefcfdf6b486a1692e7912e9edac:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:d51d5365fdd84b04e8345d5a8ae40d38ee843d781091028ea5dcc419194a3c31. Read /Users/densmirnov/Github/agentplane/.git/agentplane/kernel/exchanges/202610310121-21Y197/f9e570963c18696ffd8e4ff3e83356370b93ec09276d4cdff9b5962044c9e60f/final-validation.json before edits."
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
      -
        command_digest: "sha256:e6372ff20712da1d1b4c3527b27c99dceb8c57adae370d11a383ca2300bad5b8"
        id: "sha256:4b1c4963a8c7180fd81987cfa6a5ff7449c2733e394897c91cff07faee09d8cc:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4b1c4963a8c7180fd81987cfa6a5ff7449c2733e394897c91cff07faee09d8cc"
        occurred_at: "2026-10-31T02:25:38.988Z"
        payload_digest: "sha256:be3663b3e19de3c102755ce6c68afb0345ff05ad1ecd659f29a48e6a01df736c"
        task_id: "202610310121-21Y197"
        task_revision: 22
      -
        command_digest: "sha256:9d3d126cf1dcab0c7ac53a3e44e001d3f3fc85f20faed0172360bd4ac09d0698"
        id: "result:sha256:fe331fd04aaf1a9c882660c86bf3ff7dc50310d618c0920b171453e919c60458:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:fe331fd04aaf1a9c882660c86bf3ff7dc50310d618c0920b171453e919c60458"
        occurred_at: "2026-10-31T02:25:42.064Z"
        payload_digest: "sha256:8616b9f83d607f1119c194aad6af7084d8925066e7ba614d8401bb05a478712f"
        task_id: "202610310121-21Y197"
        task_revision: 23
      -
        command_digest: "sha256:2fd862d3ff361beebba457f0444cd5333fbb304e75b13faacfb77855e1dcb1e3"
        id: "kernel_work_item_inspection_required:sha256:3f1915ec3165e136e1ac92b8ee48cb5a53d76799ba67f2ceb8486ad7fd698cb0:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:3f1915ec3165e136e1ac92b8ee48cb5a53d76799ba67f2ceb8486ad7fd698cb0:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
        occurred_at: "2026-10-31T02:25:44.563Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202610310121-21Y197"
        task_revision: 24
      -
        command_digest: "sha256:8ce9f43df8d87816c610d6d0574e386965c709f06f6c8dd740aa7f11d2b4c8b1"
        id: "validation:sha256:71d449afd5d187ad89b2d70730d4d895b1f10a0851980d727e9502168d7da994:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:71d449afd5d187ad89b2d70730d4d895b1f10a0851980d727e9502168d7da994"
        occurred_at: "2026-10-31T02:54:23.635Z"
        payload_digest: "sha256:b7dfeba2c66f92469d3a331d0dfa3fc1839e94463950c91888ac11bb0969c176"
        task_id: "202610310121-21Y197"
        task_revision: 25
      -
        command_digest: "sha256:4fdc54d97d6664d0f79502bf2f02a4d19a2e15852de517aa2834f781d61d39c1"
        id: "validation-resolution:sha256:cd973284ce2679334c54e3e768157d961d6562429437997898997fdae2cc9e73:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:cd973284ce2679334c54e3e768157d961d6562429437997898997fdae2cc9e73"
        occurred_at: "2026-10-31T02:54:24.984Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610310121-21Y197"
        task_revision: 26
      -
        command_digest: "sha256:154ca71a1d27ecd39591c136ff6532d7e282cfafa5d270b43118392a62270d85"
        id: "final-validation:sha256:d51d5365fdd84b04e8345d5a8ae40d38ee843d781091028ea5dcc419194a3c31:26:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:d51d5365fdd84b04e8345d5a8ae40d38ee843d781091028ea5dcc419194a3c31:26"
        occurred_at: "2026-10-31T03:16:59.876Z"
        payload_digest: "sha256:f40c41744efae91e24b755999b5d2f9e67da828ecaafd7273a47cb2ad04b20cf"
        task_id: "202610310121-21Y197"
        task_revision: 27
      -
        command_digest: "sha256:c348348223fc569c14d6dee81d031f86f64abcf97ed37117c870d27a55d58e7e"
        id: "amend:sha256:7143e074601b7b635a75d5aebc9cff3e76bd084d438a3828c024604762d45f3b:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:7143e074601b7b635a75d5aebc9cff3e76bd084d438a3828c024604762d45f3b"
        occurred_at: "2026-10-31T03:19:38.517Z"
        payload_digest: "sha256:a028fecf2364e9db2d095052fc5fd6fbcc62ac379209a3c6f2151b4a97f133f9"
        task_id: "202610310121-21Y197"
        task_revision: 28
      -
        command_digest: "sha256:d3bf504df0f061b84833b76eae94d5a1aab923b455c982aca668de9f8b4c4a4d"
        id: "sha256:b29a5a8280fa20ae1cbd3cde25dd3cb27fee81fb9f55f55fe10ecc4c29a5b41e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b29a5a8280fa20ae1cbd3cde25dd3cb27fee81fb9f55f55fe10ecc4c29a5b41e"
        occurred_at: "2026-10-31T03:19:40.296Z"
        payload_digest: "sha256:9bdd9c008229f5159e6574f270504d3c53c0148537448e60eea0692538aa3492"
        task_id: "202610310121-21Y197"
        task_revision: 29
      -
        command_digest: "sha256:7ccaa7df6794673de71b0f1451e65a9ff6bc605e9d7e2f7acd252028744b4872"
        id: "kernel_work_item_claim_required:sha256:812c5d7a72703ad08099f159fbfb663607f7388af3a96562d332d1dda80a23e1:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:812c5d7a72703ad08099f159fbfb663607f7388af3a96562d332d1dda80a23e1:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
        occurred_at: "2026-10-31T03:20:37.481Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202610310121-21Y197"
        task_revision: 30
      -
        command_digest: "sha256:bfa8d10aad7beedcd9d86e82bb1c3649dc4a09a19aa69cab4a4b1377ddf44dc9"
        id: "kernel_work_item_execution_required:sha256:720fab031028213c51b24da894457f23b87a499d874be6ae64c1708e862a7c7d:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:720fab031028213c51b24da894457f23b87a499d874be6ae64c1708e862a7c7d:sha256:e6ee083fdc3c4f69b077f83d436c11ea6f76e228502b108928ca58ace9300bb8"
        occurred_at: "2026-10-31T03:20:39.717Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610310121-21Y197"
        task_revision: 31
      -
        command_digest: "sha256:3380332ddb25bcaae6143f193a0e4725f854ab42b06fc865b550ddf753c15c2c"
        id: "sha256:a8549950829bd3d04e49b0500e8740373cb0fddc23fc7950384c253e04b715cc:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a8549950829bd3d04e49b0500e8740373cb0fddc23fc7950384c253e04b715cc"
        occurred_at: "2026-10-31T03:24:34.818Z"
        payload_digest: "sha256:6b0f9b979513ff748ce5c95191c6a22e38213e59f0f8c1b26ecc8051ae00244f"
        task_id: "202610310121-21Y197"
        task_revision: 32
      -
        command_digest: "sha256:5d4e228798b63ce26273364526704646842c0899d1fc6ca3392eb39ddc7cc823"
        id: "result:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be"
        occurred_at: "2026-10-31T03:24:37.564Z"
        payload_digest: "sha256:4e6ec474019f9f32fede48c2482516e9f75081f1db21ed0ffa7571504c3beefb"
        task_id: "202610310121-21Y197"
        task_revision: 33
      -
        command_digest: "sha256:f7ab85ce734d21964abfb94d1af2992864119045c181ca992ced71296d1a7149"
        id: "kernel_work_item_inspection_required:sha256:8102933586d8d0dd9452e1276a66deb4a6f4def2a430ed52f1dd1d0d86f7587b:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8102933586d8d0dd9452e1276a66deb4a6f4def2a430ed52f1dd1d0d86f7587b:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1"
        occurred_at: "2026-10-31T03:24:39.816Z"
        payload_digest: "sha256:2c8825f2df1e5d586f549f034a6d8d55cf0206c93a79a641b229b209ac66991e"
        task_id: "202610310121-21Y197"
        task_revision: 34
      -
        command_digest: "sha256:b55f0661c681a0cab5bffc183f9c4c7a72a1c6c05916d65576f2fe2864ef68b8"
        id: "validation:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b8e0e231d6aa146c8eb8c4a595857b7e724da3ef1257dd4285e278043cd797be"
        occurred_at: "2026-10-31T03:49:11.537Z"
        payload_digest: "sha256:f32cb43ac4dc4e8451aa0a1807099f16fb062a8b8f0c027384e9fd99102cfad4"
        task_id: "202610310121-21Y197"
        task_revision: 35
      -
        command_digest: "sha256:cf0e7afc2539903372325fde75f4ba61722c434817171da4df298be8dd449216"
        id: "validation-resolution:sha256:8ec452f16a10751ecf6118d1659d937d470d5c631b93f0c87890f00e2254a0de:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8ec452f16a10751ecf6118d1659d937d470d5c631b93f0c87890f00e2254a0de"
        occurred_at: "2026-10-31T03:49:13.904Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202610310121-21Y197"
        task_revision: 36
      -
        command_digest: "sha256:56fe45d8d31d0c197f4974ac67ebccd86834577ea2cc725dbe7c5d49efa73b38"
        id: "kernel_work_item_rework_claim_required:sha256:01350960661e82f4525f0344c391007b1b062e565b9b6ca544e85b1eb2cfb1af:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:01350960661e82f4525f0344c391007b1b062e565b9b6ca544e85b1eb2cfb1af:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1"
        occurred_at: "2026-10-31T03:49:18.234Z"
        payload_digest: "sha256:4b57ae96bbb30b8ddf86b349a9cf7ad9ef25bfaba3a6768eec3e07df7deebdc0"
        task_id: "202610310121-21Y197"
        task_revision: 37
      -
        command_digest: "sha256:d3f24b1ad87890209766fbe99b24cd25fad3cdf33e1929e3f35d7af905cbf738"
        id: "kernel_work_item_execution_required:sha256:473b5143b518225fe978dfb1a1330a33802fc4538996e220e2e0dcd74aef95ec:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:473b5143b518225fe978dfb1a1330a33802fc4538996e220e2e0dcd74aef95ec:sha256:ad039774ea455b6d93a2c81dbe58dff9e710e814ccbda987382f0595957199e1"
        occurred_at: "2026-10-31T03:49:21.393Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202610310121-21Y197"
        task_revision: 38
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
2. Execute approved WorkItem final-correction-d51d5365fdd8.

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
