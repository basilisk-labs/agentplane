---
id: "202609282003-E81FJR"
title: "Prepare stable AgentPlane 0.7.12 release candidate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "v0.7.12"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun run release:parity"
  - "bun run release:prepublish"
  - "bun run release:tasks:check -- --allow-active-release-task"
plan_approval:
  state: "approved"
  updated_at: "2026-09-28T20:24:21.316Z"
  updated_by: "USER"
  note: "Reapproved exact stable candidate plan after native ACR repair and policy version synchronization under the user-authorized release recovery. Preserve the prior failed attempt and scope-extension evidence. Production publication remains gated on stable qualification and hosted integration."
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
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
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
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "repository_write"
      - "task.verify"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
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
      - "schema"
      - "ci"
      - "security_boundary"
    writable_roots:
      - ".agentplane/WORKFLOW.md"
      - "bun.lock"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.12.md"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "scripts/release/release-scope-exclusions.json"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/WORKFLOW.md"
      - "bun.lock"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.12.md"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "scripts/release/release-scope-exclusions.json"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
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
          - ".agentplane/WORKFLOW.md"
          - "bun.lock"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.12.md"
          - "packages/agentplane/package.json"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "scripts/release/release-scope-exclusions.json"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:535062f7cf2322d07eb702ce0f6268636732dd9291a615a60bf7dfac2a25729e"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:packages/core/package.json"
        - "central_component:scripts/release/release-scope-exclusions.json"
        - "effect_dependencies"
        - "effect_public_api"
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
        - "docs_contract"
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
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-28T20:03:52.473Z"
doc_updated_by: "CODER"
description: "Prepare and qualify the exact stable 0.7.12 release from integrated PL-01 through PL-12 and release-blocker fixes. The user explicitly authorized all required operator actions, local installations, network access, release publication and necessary policy overrides. Do not delete the GitHub repository. Candidate completion is not production publication."
sections:
  Summary: |-
    Prepare stable AgentPlane 0.7.12 release candidate

    Prepare and qualify the exact stable 0.7.12 release from integrated PL-01 through PL-12 and release-blocker fixes. The user explicitly authorized all required operator actions, local installations, network access, release publication and necessary policy overrides. Do not delete the GitHub repository. Candidate completion is not production publication.
  Scope: |-
    - In scope: Prepare and qualify the exact stable 0.7.12 release from integrated PL-01 through PL-12 and release-blocker fixes. The user explicitly authorized all required operator actions, local installations, network access, release publication and necessary policy overrides. Do not delete the GitHub repository. Candidate completion is not production publication.
    - Out of scope: unrelated refactors not required for "Prepare stable AgentPlane 0.7.12 release candidate".
  Plan: "1. Execute approved WorkItem RC02."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prepare stable AgentPlane 0.7.12 release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prepare stable AgentPlane 0.7.12 release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "0ca8b380cab196690f0df45433e695adfeba44f0"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "provider.merge"
              - "provider.pr"
              - "repository.integrate"
              - "repository.write"
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:054a84716d0413c2c0bc6bcd25379a45d443984daa7c55d22d52c4cf8795f079"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:13c04e96cc0841a414955d3a88d3291331068eef9a72fc66c6dc77c1e7b08598"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/WORKFLOW.md"
              - "bun.lock"
              - "docs/reference/generated-reference.mdx"
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/package.json"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609282003-E81FJR"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
              - "provider.merge"
              - "provider.pr"
              - "repository.integrate"
              - "repository.write"
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2df59c03b8d65e128a808738981282b15ca9bd14360ea39d2d921c620b14dc69"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:13c04e96cc0841a414955d3a88d3291331068eef9a72fc66c6dc77c1e7b08598"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:054a84716d0413c2c0bc6bcd25379a45d443984daa7c55d22d52c4cf8795f079"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ddb3b97a61f97c35f2054fc27059b65a022e68bafc29dfbe47441a396895409a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/WORKFLOW.md"
              - "bun.lock"
              - "docs/reference/generated-reference.mdx"
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/package.json"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609282003-E81FJR"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "bun.lock"
              - "docs/reference/generated-reference.mdx"
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/package.json"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/release/release-scope-exclusions.json"
            evidence_digest: "sha256:d5005ad7eee9884cb4417ac43a40b3c900e5eb6ed96e5a7140d9d37c07eb4936"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "provider.merge"
              - "provider.pr"
              - "repository.integrate"
              - "repository.write"
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:02c1f95b75ecc3912eb437c5ca846cca3070518e729211e3387ebe5f3c52b932"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:13c04e96cc0841a414955d3a88d3291331068eef9a72fc66c6dc77c1e7b08598"
              kind: "USER"
              parent_authority_digest: "sha256:2df59c03b8d65e128a808738981282b15ca9bd14360ea39d2d921c620b14dc69"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c9115a8699156d831bde30d4ffaa648f508de36c55ed113c7c7980d52f5af420"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/WORKFLOW.md"
              - ".agentplane/workflows/last-known-good.md"
              - "bun.lock"
              - "docs/reference/generated-reference.mdx"
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src/commands/release/apply.mutation.ts"
              - "packages/agentplane/src/commands/release/apply.mutation.unit.test.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609282003-E81FJR"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            added_scope_roots:
              - ".agentplane/workflows/last-known-good.md"
              - "packages/agentplane/src/commands/release/apply.mutation.ts"
              - "packages/agentplane/src/commands/release/apply.mutation.unit.test.ts"
            changed_paths:
              - ".agentplane/workflows/last-known-good.md"
              - "packages/agentplane/src/commands/release/apply.mutation.ts"
              - "packages/agentplane/src/commands/release/apply.mutation.unit.test.ts"
            evidence_digest: "sha256:0d9922b7f503512bb3dbabf65df40b307f4ee74bacb4b02930e36d0dccf1046a"
            kind: "authority_delta"
            previous_fingerprint: "sha256:ddb3b97a61f97c35f2054fc27059b65a022e68bafc29dfbe47441a396895409a"
            repository_evidence_digest: "sha256:252988455b0e52fc2110878005611942146248178cc56e5ca08fb5104f9ff64f"
            request_digest: "sha256:af252e8606cd38d0dfcd6cd147326487f73bd37ab66c6b7df88a23d977afd73d"
            request_task_revision: 8
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "provider.merge"
              - "provider.pr"
              - "repository.integrate"
              - "repository.write"
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2b7d421848c39a8d831c23aec29c6c0b6f0cf49115366a8d355f6cd44fcc7461"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:faa1295c812611e1addad5d44bdc9bb6c70d5ed5a5b0e34f2e3d9261b9572980"
            plan_revision: 2
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:adbb3043069ad6944895e184d16697ae3365c5cf71ae9bad768357fd0044bebd"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/WORKFLOW.md"
              - "bun.lock"
              - "docs/reference/generated-reference.mdx"
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/package.json"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609282003-E81FJR"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "provider.merge"
              - "provider.pr"
              - "repository.integrate"
              - "repository.write"
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2b5977d800783d3e189ec31f4c4a1f63fae8a0a441cbd901ed62cf844bd530f1"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:faa1295c812611e1addad5d44bdc9bb6c70d5ed5a5b0e34f2e3d9261b9572980"
            plan_revision: 2
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:adbb3043069ad6944895e184d16697ae3365c5cf71ae9bad768357fd0044bebd"
              kind: "USER"
              parent_authority_digest: "sha256:2b7d421848c39a8d831c23aec29c6c0b6f0cf49115366a8d355f6cd44fcc7461"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/WORKFLOW.md"
              - "bun.lock"
              - "docs/reference/generated-reference.mdx"
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/package.json"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609282003-E81FJR"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "repository_write"
            added_scope_roots:
              - "scripts/baselines/v0.7-compatibility-candidate.json"
            changed_paths:
              - "scripts/baselines/v0.7-compatibility-candidate.json"
            evidence_digest: "sha256:8b64464f9f1018e8575040e90b468ddc96c0a0a40f18ad2434940db933547049"
            kind: "authority_delta"
            previous_fingerprint: "sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
            repository_evidence_digest: "sha256:5c885a863769e8ed03c2ae441f4b432171c10b34a9f806f932b0c4cec933fadf"
            request_digest: "sha256:00283a065ace63aa5b712170c7bc40d2648eb895e9894a99a0e8e90e4cc05a36"
            request_task_revision: 16
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:adbb3043069ad6944895e184d16697ae3365c5cf71ae9bad768357fd0044bebd"
        digest: "sha256:faa1295c812611e1addad5d44bdc9bb6c70d5ed5a5b0e34f2e3d9261b9572980"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6d61be96a12eaa1e25a3daa21aee7f863541c7feeed44e3ea44be3183f5dfaf1"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository.write"
                - "task.verify"
              external_effects:
                - "network_read"
              repository_effects:
                - "dependencies"
                - "documentation"
                - "public_api"
                - "release_metadata"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/package.json"
                - "packages/agentplane/package.json"
                - "packages/recipes/package.json"
                - "packages/recipes/src/index.ts"
                - "packages/testkit/package.json"
                - "packages/spec/examples/acr.json"
                - ".agentplane/WORKFLOW.md"
                - "bun.lock"
                - "docs/releases/v0.7.12.md"
                - "docs/reference/generated-reference.mdx"
                - "scripts/release/release-scope-exclusions.json"
            expected_outputs:
              - "stable-release-candidate"
            id: "RC02"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609282003-E81FJR"
      intent_digest: "sha256:a007ecadd1695fca82528ca26ded9a4323304e585558877c0c0ad05965109aa4"
      migration_receipts: []
      mutation_receipts:
        capture:202609282003-E81FJR:
          after_revision: 1
          aggregate_digest: "sha256:d7ee2040173c999a180bfc066ba31e5fccd578ef370f5db123dcf3fa991aaeab"
          before_revision: 0
          command_digest: "sha256:573ba34dea7db247ab48ed5f102064342d87751efa847d23ffe2315ea836824c"
          effect_ids: []
          event_digests:
            - "sha256:0ff4a745239bee8a7132b4e651e8c0f68af0938aca7eb5e58098c9228ee4eb3b"
          mutation_id: "capture:202609282003-E81FJR"
        kernel_work_item_claim_required:sha256:64c979b27853ddd6623f39a709d3d9fb0ee756a76155d0a03fa099bd6abdc816:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718:
          after_revision: 14
          aggregate_digest: "sha256:584a3fc4ecc57d65ebf3aca3c71baf4c3b50b8a707f820de1ed7a9e09445f269"
          before_revision: 13
          command_digest: "sha256:07fa20da8e6fe326ecdd425ef39b632c028df001857cc4c6d4c06cb27e25cc6e"
          effect_ids: []
          event_digests:
            - "sha256:d493bbcf01b963213e0c7f3f640be2e68d85bb6f8a8fe88cdb58216a1d0a9fd7"
          mutation_id: "kernel_work_item_claim_required:sha256:64c979b27853ddd6623f39a709d3d9fb0ee756a76155d0a03fa099bd6abdc816:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
        kernel_work_item_claim_required:sha256:b7218a0d0b545decd4de4a348061be81af0067f1d58d306f5b3e5e5502274db4:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:
          after_revision: 19
          aggregate_digest: "sha256:2052925b9b09b2b48af8c4ad2b1daa759f147745bcd593c6a2d49655dbaf3f0f"
          before_revision: 18
          command_digest: "sha256:8d929c926553ed25b9a3c70675ce09fac599b39fb34d6e167266723e85a87f48"
          effect_ids: []
          event_digests:
            - "sha256:f7bca2146d2394d187aacfa5e639df4914bf61b3f163954eae2975cfc4dddcc6"
          mutation_id: "kernel_work_item_claim_required:sha256:b7218a0d0b545decd4de4a348061be81af0067f1d58d306f5b3e5e5502274db4:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
        kernel_work_item_claim_required:sha256:dc5d42d850bd20559ae478b64b63dd4cce993cfed2e73c18b57cdeb415bc86e5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e:
          after_revision: 5
          aggregate_digest: "sha256:9af44f786402f43d34b1738befa17c28e0b553aceb2ab580e4226f166221f6e2"
          before_revision: 4
          command_digest: "sha256:8ae708f8fff10bbf82a8571a44c6d8d780de4f580f62d6d02b7354a4f16a05fa"
          effect_ids: []
          event_digests:
            - "sha256:4504c44fa955d5c84878185b4f682b0487c2d1503e48f25fd1ad9e3044b4a834"
          mutation_id: "kernel_work_item_claim_required:sha256:dc5d42d850bd20559ae478b64b63dd4cce993cfed2e73c18b57cdeb415bc86e5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
        kernel_work_item_execution_required:sha256:1153eaa63f5028ef37e84d72a1972dc9fdc0df65af9a98df8c0cdc2d383f4808:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:
          after_revision: 20
          aggregate_digest: "sha256:0a16573094f886ab59ecb7f09ef80564b0c7c4cca15f3a8f0dd304f4dde8b45e"
          before_revision: 19
          command_digest: "sha256:73d0a80cce5d54fc902cd18dc3053a2a666a7cf2cc679d6a9d7785ef443839fe"
          effect_ids: []
          event_digests:
            - "sha256:62b557059929c92af2b79c7d0aa582266f7cf697cee5813293b95c656f56d2e5"
          mutation_id: "kernel_work_item_execution_required:sha256:1153eaa63f5028ef37e84d72a1972dc9fdc0df65af9a98df8c0cdc2d383f4808:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
        kernel_work_item_execution_required:sha256:4e6bf5605c81ab6bfd75ffbf85bb341f1ec7685093e23b9a804feccb8b7f38a5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e:
          after_revision: 6
          aggregate_digest: "sha256:51ff41ca0f950169918d8336690abcea9672bd764c6dada9882ee5958f5da375"
          before_revision: 5
          command_digest: "sha256:572220b82ab45c05213af796fc9b28e6a7454bcfd1110c7bbdc5948579bb7481"
          effect_ids: []
          event_digests:
            - "sha256:464fafd98230e83eacff8573861be5089fcc9dfb160b86d6c184721c5bed870a"
          mutation_id: "kernel_work_item_execution_required:sha256:4e6bf5605c81ab6bfd75ffbf85bb341f1ec7685093e23b9a804feccb8b7f38a5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
        kernel_work_item_execution_required:sha256:d5b4e6336c234564675ef8d13a41d42f99f0d09fcfe00b9bdcf581149af81f42:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718:
          after_revision: 15
          aggregate_digest: "sha256:9b31541a80c1944d28f7b0e6c48a742a26dd6eafb20a7faabe037b902ca25c40"
          before_revision: 14
          command_digest: "sha256:a5eaaecc1222f0c6211e3a8a4ac2859ed8bb55cd75a91a94e001f7cc6685c0a7"
          effect_ids: []
          event_digests:
            - "sha256:414021ede9a6c2cdc892702f0683e5d8e40b7ea2c558bd3644b7247f966bbfd2"
          mutation_id: "kernel_work_item_execution_required:sha256:d5b4e6336c234564675ef8d13a41d42f99f0d09fcfe00b9bdcf581149af81f42:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
        kernel_work_item_materialization_required:sha256:096c89fc0f2089c2b06f067e9c3d6c296c6a92fdb2c28548b71929c74ddf5924:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718:
          after_revision: 13
          aggregate_digest: "sha256:cc0c21ef09cca2064029bdbd36cb6267357e16eb2a132c51e3b89354411138c4"
          before_revision: 12
          command_digest: "sha256:a5989dea6c5d637582cc1cb2409287ac0e0b423006494ddc384371835128cfa3"
          effect_ids: []
          event_digests:
            - "sha256:c971c2b37a7befe3b12762d1d7a1873c6cbd2699de322635cb6706342c7b9cd4"
          mutation_id: "kernel_work_item_materialization_required:sha256:096c89fc0f2089c2b06f067e9c3d6c296c6a92fdb2c28548b71929c74ddf5924:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
        kernel_work_item_materialization_required:sha256:1a8649e275f4a5f42046181089f269827fdb78b33c1df7d19a2c483da5fa5d4b:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e:
          after_revision: 4
          aggregate_digest: "sha256:3e2e2468722b752f8278e5c9069adb4bef32f85476876d0e536e2aba11e2c0f7"
          before_revision: 3
          command_digest: "sha256:f1dc26cfaa4be695a4f0792c83b99a6c3357aa43b96f0ea377ed303d263b018f"
          effect_ids: []
          event_digests:
            - "sha256:c2190758c7112720c8a656eb1c9d5737ed428196f6214b46796bb662228b74b4"
          mutation_id: "kernel_work_item_materialization_required:sha256:1a8649e275f4a5f42046181089f269827fdb78b33c1df7d19a2c483da5fa5d4b:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
        plan:sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d:
          after_revision: 2
          aggregate_digest: "sha256:1276135df8eed244c676d1a9a6404ac0d3a07f8f5e43905815b95a5ba41bf50e"
          before_revision: 1
          command_digest: "sha256:8a06eedeb58685dd6abfbf61d68b333d7350e49e89fd0eddb81b1b813dc13ed8"
          effect_ids: []
          event_digests:
            - "sha256:7d7476eb6727e8c81d3df5f5ad524f28ac59cec644a50e6e5715e872f3dfcddd"
          mutation_id: "plan:sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d"
        plan:sha256:faa1295c812611e1addad5d44bdc9bb6c70d5ed5a5b0e34f2e3d9261b9572980:
          after_revision: 11
          aggregate_digest: "sha256:d8ef8b79d4d948cdf0244197cc53bb4ad1087911a6af39f4fdf81235806c6e41"
          before_revision: 10
          command_digest: "sha256:95a4f2f6062973df9fee06739d037b32a75338ab413d3849be1e816957413829"
          effect_ids: []
          event_digests:
            - "sha256:c8413127708ed517a565bc0eeb3090d4e607dab503d2e72e2e8905ed208f4a1a"
          mutation_id: "plan:sha256:faa1295c812611e1addad5d44bdc9bb6c70d5ed5a5b0e34f2e3d9261b9572980"
        reject:sha256:dbb8201feab7f1e4469f19e0a3cc946f1d13b0481e23d10e6694989601d60b72:
          after_revision: 10
          aggregate_digest: "sha256:2c03e6cf1a0782e8e01a7dfec150e7eb4485d677796b7575aa2902a0fb6f6d98"
          before_revision: 9
          command_digest: "sha256:e9ef4210a7ae5157d0ff3b0854bb031cb9c557ea81d4667c5451ff8ea6308747"
          effect_ids: []
          event_digests:
            - "sha256:56809ca125fa1ce9bd5a8119daf4de6ed5eda414744f99d1b0ee24f8bf1503f6"
          mutation_id: "reject:sha256:dbb8201feab7f1e4469f19e0a3cc946f1d13b0481e23d10e6694989601d60b72"
        semantic-stop:sha256:74aa847b4e4ed265d9438bf8e43152886833e37cd6fe9aec61d7a89444781115:
          after_revision: 21
          aggregate_digest: "sha256:792b226504452c2c08e6a043dc0b7a770d6371776ef7d8213dd9366360c45550"
          before_revision: 20
          command_digest: "sha256:0bafb8d4ef69d0cabdd260b64812ed0cd84335714629b886591283b8eab3bcdf"
          effect_ids: []
          event_digests:
            - "sha256:48b779699ac04fb9c145d82e79c68605352e2d96f0b608a28fa482db5e94adfd"
          mutation_id: "semantic-stop:sha256:74aa847b4e4ed265d9438bf8e43152886833e37cd6fe9aec61d7a89444781115"
        semantic-stop:sha256:dae37af4239c24443b03bb5dadca84d4b3688df792e22841d18471362d6bcd58:
          after_revision: 16
          aggregate_digest: "sha256:5715a2ace043a0a3868ee89716386fe4ad42b885b5a9536ae71f5f83a7713044"
          before_revision: 15
          command_digest: "sha256:5df2f37361d9aa8cf74ea6a619205129a0429ad4fed830447133ebdd623d94a6"
          effect_ids: []
          event_digests:
            - "sha256:7bf358cc946e02cd25ca92289c0bc4ab0fe82bc5eebee0a8adb312c0db055b05"
          mutation_id: "semantic-stop:sha256:dae37af4239c24443b03bb5dadca84d4b3688df792e22841d18471362d6bcd58"
        semantic-stop:sha256:f4c22001b00d045fc63bc96728dabd8473b69db84ef071e859ea3e6ebbbe8fef:
          after_revision: 8
          aggregate_digest: "sha256:567f154009a165087ba240e8a441d515e7b7000cd218cc2f22186a928ca8057a"
          before_revision: 7
          command_digest: "sha256:b0de46cd689e40df1e35266efad7a6f24c5c9da3f65f43794cb3de0051fb4680"
          effect_ids: []
          event_digests:
            - "sha256:87327328a7bbbacd2d347cf02e6f1dc53a7687582eda0b06a54a38052bd6761b"
          mutation_id: "semantic-stop:sha256:f4c22001b00d045fc63bc96728dabd8473b69db84ef071e859ea3e6ebbbe8fef"
        sha256:3805b54c7cb847e4fe5752903dedae14bb4365bf43eba0b029cb32ebb53135cf:
          after_revision: 17
          aggregate_digest: "sha256:d2f3a512309d63eed86108265fda05d81f321dfba4212eb516a48ea210a18480"
          before_revision: 16
          command_digest: "sha256:fc6daa7dffd8cbfc16d25b5313913c63effcba761bdc2adda1071d1a8f277bab"
          effect_ids: []
          event_digests:
            - "sha256:e71977396f3ebd270b38245883fdc30c7a367bada9246b3f3d1b4ec8037c6165"
          mutation_id: "sha256:3805b54c7cb847e4fe5752903dedae14bb4365bf43eba0b029cb32ebb53135cf"
        sha256:4a47973512a4a4685342ff5d51f7980666ea89c491ab2cc6a3bd8b10efe03c1b:
          after_revision: 3
          aggregate_digest: "sha256:9ea09d28b3d12889b8a08a2beb252bcdca18e4ea328979ca2c55b9f3254a37d7"
          before_revision: 2
          command_digest: "sha256:8f915bb6efbb81b35b80c3755ae712390f2b264f6cb97617f2ffbdb9ed831de4"
          effect_ids: []
          event_digests:
            - "sha256:5aa41e72b0fc260053b696792c162a26804eb0914d1519e5c6a7a31198c905e9"
          mutation_id: "sha256:4a47973512a4a4685342ff5d51f7980666ea89c491ab2cc6a3bd8b10efe03c1b"
        sha256:7838ec190eb5bfde8f56cd63e34369d6698f7d5c484187f672fa4c4e6ec4f6dd:
          after_revision: 12
          aggregate_digest: "sha256:553b0f55040d2d8ed954c4d2bbfc71ea4d6f3f66b7ff9901f7806f00bac84239"
          before_revision: 11
          command_digest: "sha256:4d7f9b4dcc8d8de2c85f3f7c6798445ac196f0a62a867fc930bc546af28f658d"
          effect_ids: []
          event_digests:
            - "sha256:8648a073b5e0dfd5c5fd7d87e8e730bb8bfd0463d312bd7365040ef151a1bf92"
          mutation_id: "sha256:7838ec190eb5bfde8f56cd63e34369d6698f7d5c484187f672fa4c4e6ec4f6dd"
        sha256:83e575eac76a542d87795c5cb0f649d0f3881348a66c6bfa546a049e997e39d8:
          after_revision: 7
          aggregate_digest: "sha256:ae8d640d8bcbfa7da3e02a13e1b367feaccdbdbcce43871660d71706b5aa61b9"
          before_revision: 6
          command_digest: "sha256:cfc5e56fcd7e45bd1ac5224b3bcb5017a14c55fd84be693040aafd485866b6b5"
          effect_ids: []
          event_digests:
            - "sha256:6f1f3e48e01c3a1fd06ba19affba119a7c6dc42dc07d1fa81a7c7ffb0c5cad52"
          mutation_id: "sha256:83e575eac76a542d87795c5cb0f649d0f3881348a66c6bfa546a049e997e39d8"
        sha256:cd5be6dd6b98cfb2c65df9038ce199e246e608cf7e65013fbef998f2d9ce7913:
          after_revision: 9
          aggregate_digest: "sha256:326f75e6fe3e0906bf094652449e9776b43c7accddbf126ac9c0193de221a055"
          before_revision: 8
          command_digest: "sha256:e11ac9c5961c57416523a572c92e828e16e948bc7a29a9844173ef1710452fcc"
          effect_ids: []
          event_digests:
            - "sha256:fd18a91eff68835c59fc0a57c6ed6aa940d753c48f7a91e89e47d50d70554e06"
          mutation_id: "sha256:cd5be6dd6b98cfb2c65df9038ce199e246e608cf7e65013fbef998f2d9ce7913"
        work-item-resume:sha256:9b90bb5782f87761732187c16ab7f708a2a966b4df1f6719903c8b675c7d872b:
          after_revision: 18
          aggregate_digest: "sha256:e479d1f2e9962e329d0465b40d4ee5dda568eeae8bafe676d9d96f8d784f1a6b"
          before_revision: 17
          command_digest: "sha256:fab64c2b6c4987617c4c7d1bf9aec3f4f40b632ff74a21ff59000e56ff0a8461"
          effect_ids: []
          event_digests:
            - "sha256:99f7c77e3863df6d0108edbc1e3d73806d5a74303249e637f44c84bcbe2112ba"
          mutation_id: "work-item-resume:sha256:9b90bb5782f87761732187c16ab7f708a2a966b4df1f6719903c8b675c7d872b"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:13c04e96cc0841a414955d3a88d3291331068eef9a72fc66c6dc77c1e7b08598"
          digest: "sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:46df66950aecbf99eb04c51604b1166329d49a0e28dc287a961be01e65360e68"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository.write"
                  - "task.verify"
                external_effects:
                  - "network_read"
                repository_effects:
                  - "dependencies"
                  - "documentation"
                  - "public_api"
                  - "release_metadata"
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/core/package.json"
                  - "packages/agentplane/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/testkit/package.json"
                  - "packages/spec/examples/acr.json"
                  - ".agentplane/WORKFLOW.md"
                  - "bun.lock"
                  - "docs/releases/v0.7.12.md"
                  - "docs/reference/generated-reference.mdx"
                  - "scripts/release/release-scope-exclusions.json"
              expected_outputs:
                - "stable-release-candidate"
              id: "RC01"
              optional: false
              required_inputs: []
      revision: 21
      schema_version: 1
      state: "ACTIVE"
      work_items:
        RC02:
          attempt: 2
          claim_id: "sha256:bdfe28d28f0c133870c7c549b97b7e11e7177794e8eaaa48701501a9981f639b"
          definition:
            contract_digest: "sha256:6d61be96a12eaa1e25a3daa21aee7f863541c7feeed44e3ea44be3183f5dfaf1"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository.write"
                - "task.verify"
              external_effects:
                - "network_read"
              repository_effects:
                - "dependencies"
                - "documentation"
                - "public_api"
                - "release_metadata"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/package.json"
                - "packages/agentplane/package.json"
                - "packages/recipes/package.json"
                - "packages/recipes/src/index.ts"
                - "packages/testkit/package.json"
                - "packages/spec/examples/acr.json"
                - ".agentplane/WORKFLOW.md"
                - "bun.lock"
                - "docs/releases/v0.7.12.md"
                - "docs/reference/generated-reference.mdx"
                - "scripts/release/release-scope-exclusions.json"
            expected_outputs:
              - "stable-release-candidate"
            id: "RC02"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 8
          state: "BLOCKED"
          validation: null
    digest: "sha256:9b76f1b0eb48495386de8a83d4b5c4bd3f5fbbe8bcba5911f1b62254f11942ad"
    documents:
      contracts:
        sha256:46df66950aecbf99eb04c51604b1166329d49a0e28dc287a961be01e65360e68:
          acceptance_criteria:
            - "The native release candidate targets exactly 0.7.12, aligns all package and runtime version surfaces, and passes the complete release prepublish gate without skipped checks."
            - "English release notes cover every non-merge commit in the exact native release plan and preserve unestablished efficiency and live-provider limitations."
            - "Historical task projections retain exact validated publication or merge ancestry evidence. The active release task is the only permitted current release exception."
          objective: "Prepare and qualify the stable AgentPlane 0.7.12 release candidate. Use the native exact release plan and version mutation as explicitly authorized operator actions. Write complete English release notes and reconcile only the identified historical task projections through validated exact-ancestry release exclusions. Preserve canonical task records. Return the verified candidate for protected-base integration; final production publication follows integration and hosted verification."
          role: "EXECUTOR"
          verification_commands:
            - "bun run release:parity"
            - "bun run release:tasks:check -- --allow-active-release-task"
            - "bun run release:prepublish"
        sha256:6d61be96a12eaa1e25a3daa21aee7f863541c7feeed44e3ea44be3183f5dfaf1:
          acceptance_criteria:
            - "The native release candidate targets exactly 0.7.12, aligns all package and runtime version surfaces, and passes the complete release prepublish gate without skipped checks."
            - "English release notes cover every non-merge commit in the exact native release plan and preserve unestablished efficiency and live-provider limitations."
            - "Historical task projections retain exact validated publication or merge ancestry evidence. The active release task is the only permitted current release exception."
            - "Native ACR version mutation preserves unrelated formatting and versions, is idempotent, rejects ambiguous targets without writes, and passes focused tests and type checking."
          objective: "Qualify and finalize the already-prepared stable AgentPlane 0.7.12 candidate. The user-authorized operator repair already corrected native ACR serialization and added regression tests under the recorded scope-extension authority. Verify the current candidate, preserve the exact release-plan coverage and historical task evidence, and complete the interrupted candidate commit without any further version bump. Publication remains a separate protected-main operator action."
          role: "EXECUTOR"
          verification_commands:
            - "bun run release:parity"
            - "bun run release:tasks:check -- --allow-active-release-task"
            - "bun run release:prepublish"
      intent:
        context: "Prepare and qualify the exact stable 0.7.12 release from integrated PL-01 through PL-12 and release-blocker fixes. The user explicitly authorized all required operator actions, local installations, network access, release publication and necessary policy overrides. Do not delete the GitHub repository. Candidate completion is not production publication."
        objective: "Prepare stable AgentPlane 0.7.12 release candidate"
        plan_input_digest: "sha256:592de193e848f309561735f2ec95fef78ae360ecf2332c01a2fb30c71f8f81e3"
      plan_inputs:
        sha256:592de193e848f309561735f2ec95fef78ae360ecf2332c01a2fb30c71f8f81e3:
          assumptions:
            - "The user explicitly authorized stable version 0.7.12, local installations, network operations, release publication and necessary operator recovery."
            - "Publication must use the exact protected-main release SHA and canonical publish-result evidence. This candidate task does not treat candidate preparation as production publication."
            - "The GitHub repository must not be deleted."
          planning_baseline:
            captured_at: "2026-09-28T20:03:46.741Z"
            config_digest: "sha256:8a0dd5353aab5fb05b6babb246c811d98c7628f83315eff3d982bf71625f901b"
            context_digest: "sha256:03a1f92a7e551b239f469539555a80ac98100b631a28f79d60e171cda5f0ef1e"
            digest: "sha256:e7ebce1f561b7e37a803de122c7d3cc2a4548c5bfb10949ce76606a3e652fddf"
            dirty_paths: []
            git:
              kind: "commit"
              ref: null
              sha: "0ca8b380cab196690f0df45433e695adfeba44f0"
            policy_digest: null
            schema_version: 1
            task_history_cursor: null
          schema_version: 1
          task_id: "202609282003-E81FJR"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:parity"
                id: "release-parity"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run release:tasks:check -- --allow-active-release-task"
                id: "release-registry"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release-prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 9000000
              -
                capability: "task.verify"
                id: "release-review"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "release-parity"
                  - "release-prepublish"
                description: "The native release candidate targets exactly 0.7.12, aligns all package and runtime version surfaces, and passes the complete release prepublish gate without skipped checks."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-review"
                description: "English release notes cover every non-merge commit in the exact native release plan and preserve unestablished efficiency and live-provider limitations."
                id: "traceable-notes"
                required: true
              -
                check_ids:
                  - "release-registry"
                  - "release-review"
                description: "Historical task projections retain exact validated publication or merge ancestry evidence. The active release task is the only permitted current release exception."
                id: "registry"
                required: true
            evidence_fingerprint: "sha256:e7ebce1f561b7e37a803de122c7d3cc2a4548c5bfb10949ce76606a3e652fddf"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release-parity"
                      - "release-prepublish"
                    description: "The native release candidate targets exactly 0.7.12, aligns all package and runtime version surfaces, and passes the complete release prepublish gate without skipped checks."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-review"
                    description: "English release notes cover every non-merge commit in the exact native release plan and preserve unestablished efficiency and live-provider limitations."
                    id: "traceable-notes"
                    required: true
                  -
                    check_ids:
                      - "release-registry"
                      - "release-review"
                    description: "Historical task projections retain exact validated publication or merge ancestry evidence. The active release task is the only permitted current release exception."
                    id: "registry"
                    required: true
                capabilities:
                  - "repository.write"
                  - "task.verify"
                context:
                  max_bytes: 100000
                  optional_sources: []
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/planning-0.7.12-integrated-qualification.md"
                    - "scripts/release/release-scope-exclusions.json"
                  symbol_hints: []
                depends_on: []
                expected_outputs:
                  - "stable-release-candidate"
                id: "RC01"
                objective: "Prepare and qualify the stable AgentPlane 0.7.12 release candidate. Use the native exact release plan and version mutation as explicitly authorized operator actions. Write complete English release notes and reconcile only the identified historical task projections through validated exact-ancestry release exclusions. Preserve canonical task records. Return the verified candidate for protected-base integration; final production publication follows integration and hosted verification."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims: []
                risk: "high"
                scope_roots:
                  - "packages/core/package.json"
                  - "packages/agentplane/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/testkit/package.json"
                  - "packages/spec/examples/acr.json"
                  - ".agentplane/WORKFLOW.md"
                  - "bun.lock"
                  - "docs/releases/v0.7.12.md"
                  - "docs/reference/generated-reference.mdx"
                  - "scripts/release/release-scope-exclusions.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:parity"
                      id: "release-parity"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run release:tasks:check -- --allow-active-release-task"
                      id: "release-registry"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release-prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 9000000
                    -
                      capability: "task.verify"
                      id: "release-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release-parity"
                        - "release-prepublish"
                      description: "The native release candidate targets exactly 0.7.12, aligns all package and runtime version surfaces, and passes the complete release prepublish gate without skipped checks."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-review"
                      description: "English release notes cover every non-merge commit in the exact native release plan and preserve unestablished efficiency and live-provider limitations."
                      id: "traceable-notes"
                      required: true
                    -
                      check_ids:
                        - "release-registry"
                        - "release-review"
                      description: "Historical task projections retain exact validated publication or merge ancestry evidence. The active release task is the only permitted current release exception."
                      id: "registry"
                      required: true
                  evidence_fingerprint: "sha256:e7ebce1f561b7e37a803de122c7d3cc2a4548c5bfb10949ce76606a3e652fddf"
                  schema_version: 1
    events:
      -
        command_digest: "sha256:573ba34dea7db247ab48ed5f102064342d87751efa847d23ffe2315ea836824c"
        id: "capture:202609282003-E81FJR:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609282003-E81FJR"
        occurred_at: "2026-09-28T20:03:52.412Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609282003-E81FJR"
        task_revision: 1
      -
        command_digest: "sha256:8a06eedeb58685dd6abfbf61d68b333d7350e49e89fd0eddb81b1b813dc13ed8"
        id: "plan:sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:05455c46cf8581528b35dd751981dfcd3f951fd841f5d908c4df564d98d6447d"
        occurred_at: "2026-09-28T20:05:41.530Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609282003-E81FJR"
        task_revision: 2
      -
        command_digest: "sha256:8f915bb6efbb81b35b80c3755ae712390f2b264f6cb97617f2ffbdb9ed831de4"
        id: "sha256:4a47973512a4a4685342ff5d51f7980666ea89c491ab2cc6a3bd8b10efe03c1b:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:4a47973512a4a4685342ff5d51f7980666ea89c491ab2cc6a3bd8b10efe03c1b"
        occurred_at: "2026-09-28T20:06:09.054Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609282003-E81FJR"
        task_revision: 3
      -
        command_digest: "sha256:f1dc26cfaa4be695a4f0792c83b99a6c3357aa43b96f0ea377ed303d263b018f"
        id: "kernel_work_item_materialization_required:sha256:1a8649e275f4a5f42046181089f269827fdb78b33c1df7d19a2c483da5fa5d4b:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:1a8649e275f4a5f42046181089f269827fdb78b33c1df7d19a2c483da5fa5d4b:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
        occurred_at: "2026-09-28T20:06:31.496Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609282003-E81FJR"
        task_revision: 4
      -
        command_digest: "sha256:8ae708f8fff10bbf82a8571a44c6d8d780de4f580f62d6d02b7354a4f16a05fa"
        id: "kernel_work_item_claim_required:sha256:dc5d42d850bd20559ae478b64b63dd4cce993cfed2e73c18b57cdeb415bc86e5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:dc5d42d850bd20559ae478b64b63dd4cce993cfed2e73c18b57cdeb415bc86e5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
        occurred_at: "2026-09-28T20:06:42.571Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609282003-E81FJR"
        task_revision: 5
      -
        command_digest: "sha256:572220b82ab45c05213af796fc9b28e6a7454bcfd1110c7bbdc5948579bb7481"
        id: "kernel_work_item_execution_required:sha256:4e6bf5605c81ab6bfd75ffbf85bb341f1ec7685093e23b9a804feccb8b7f38a5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4e6bf5605c81ab6bfd75ffbf85bb341f1ec7685093e23b9a804feccb8b7f38a5:sha256:ec72d9f40c74e5dd6d0ffdc4620a0dee5c107fe9a53a8d7c0d57c40a9f2dfd5e"
        occurred_at: "2026-09-28T20:07:25.219Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609282003-E81FJR"
        task_revision: 6
      -
        command_digest: "sha256:cfc5e56fcd7e45bd1ac5224b3bcb5017a14c55fd84be693040aafd485866b6b5"
        id: "sha256:83e575eac76a542d87795c5cb0f649d0f3881348a66c6bfa546a049e997e39d8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:83e575eac76a542d87795c5cb0f649d0f3881348a66c6bfa546a049e997e39d8"
        occurred_at: "2026-09-28T20:16:10.860Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609282003-E81FJR"
        task_revision: 7
      -
        command_digest: "sha256:b0de46cd689e40df1e35266efad7a6f24c5c9da3f65f43794cb3de0051fb4680"
        id: "semantic-stop:sha256:f4c22001b00d045fc63bc96728dabd8473b69db84ef071e859ea3e6ebbbe8fef:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:f4c22001b00d045fc63bc96728dabd8473b69db84ef071e859ea3e6ebbbe8fef"
        occurred_at: "2026-09-28T20:16:18.882Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609282003-E81FJR"
        task_revision: 8
      -
        command_digest: "sha256:e11ac9c5961c57416523a572c92e828e16e948bc7a29a9844173ef1710452fcc"
        id: "sha256:cd5be6dd6b98cfb2c65df9038ce199e246e608cf7e65013fbef998f2d9ce7913:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cd5be6dd6b98cfb2c65df9038ce199e246e608cf7e65013fbef998f2d9ce7913"
        occurred_at: "2026-09-28T20:20:41.418Z"
        payload_digest: "sha256:14ca5341800a9534e0fafd4e74a2cc88f4b2e5a3b008d958f8420632261ee823"
        task_id: "202609282003-E81FJR"
        task_revision: 9
      -
        command_digest: "sha256:e9ef4210a7ae5157d0ff3b0854bb031cb9c557ea81d4667c5451ff8ea6308747"
        id: "reject:sha256:dbb8201feab7f1e4469f19e0a3cc946f1d13b0481e23d10e6694989601d60b72:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:dbb8201feab7f1e4469f19e0a3cc946f1d13b0481e23d10e6694989601d60b72"
        occurred_at: "2026-09-28T20:21:02.824Z"
        payload_digest: "sha256:a775e77efa8f221b6979c834079a71e552ff87e5aff69fd590bd50bbeba1e307"
        task_id: "202609282003-E81FJR"
        task_revision: 10
      -
        command_digest: "sha256:95a4f2f6062973df9fee06739d037b32a75338ab413d3849be1e816957413829"
        id: "plan:sha256:faa1295c812611e1addad5d44bdc9bb6c70d5ed5a5b0e34f2e3d9261b9572980:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:faa1295c812611e1addad5d44bdc9bb6c70d5ed5a5b0e34f2e3d9261b9572980"
        occurred_at: "2026-09-28T20:23:48.305Z"
        payload_digest: "sha256:e0d452990b6eb5dd98f8397db506d86c162d8e3c30d6db88280f0da96c2f6388"
        task_id: "202609282003-E81FJR"
        task_revision: 11
      -
        command_digest: "sha256:4d7f9b4dcc8d8de2c85f3f7c6798445ac196f0a62a867fc930bc546af28f658d"
        id: "sha256:7838ec190eb5bfde8f56cd63e34369d6698f7d5c484187f672fa4c4e6ec4f6dd:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:7838ec190eb5bfde8f56cd63e34369d6698f7d5c484187f672fa4c4e6ec4f6dd"
        occurred_at: "2026-09-28T20:24:17.550Z"
        payload_digest: "sha256:616390747ab9d860e49efb7e5b8a8861a2a9dafb43d1537a980e5ea108ccc9d5"
        task_id: "202609282003-E81FJR"
        task_revision: 12
      -
        command_digest: "sha256:a5989dea6c5d637582cc1cb2409287ac0e0b423006494ddc384371835128cfa3"
        id: "kernel_work_item_materialization_required:sha256:096c89fc0f2089c2b06f067e9c3d6c296c6a92fdb2c28548b71929c74ddf5924:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:096c89fc0f2089c2b06f067e9c3d6c296c6a92fdb2c28548b71929c74ddf5924:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
        occurred_at: "2026-09-28T20:29:04.304Z"
        payload_digest: "sha256:dbb198867aaac7ce3a7f2b6af9143c77ae5a38b582e33064797eb48af7462577"
        task_id: "202609282003-E81FJR"
        task_revision: 13
      -
        command_digest: "sha256:07fa20da8e6fe326ecdd425ef39b632c028df001857cc4c6d4c06cb27e25cc6e"
        id: "kernel_work_item_claim_required:sha256:64c979b27853ddd6623f39a709d3d9fb0ee756a76155d0a03fa099bd6abdc816:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:64c979b27853ddd6623f39a709d3d9fb0ee756a76155d0a03fa099bd6abdc816:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
        occurred_at: "2026-09-28T20:29:17.613Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609282003-E81FJR"
        task_revision: 14
      -
        command_digest: "sha256:a5eaaecc1222f0c6211e3a8a4ac2859ed8bb55cd75a91a94e001f7cc6685c0a7"
        id: "kernel_work_item_execution_required:sha256:d5b4e6336c234564675ef8d13a41d42f99f0d09fcfe00b9bdcf581149af81f42:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d5b4e6336c234564675ef8d13a41d42f99f0d09fcfe00b9bdcf581149af81f42:sha256:b9ed784a813a98c8aef501d1995f2e897d15da1ed67d9470e3c9b2c1322e0718"
        occurred_at: "2026-09-28T20:29:26.900Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202609282003-E81FJR"
        task_revision: 15
      -
        command_digest: "sha256:5df2f37361d9aa8cf74ea6a619205129a0429ad4fed830447133ebdd623d94a6"
        id: "semantic-stop:sha256:dae37af4239c24443b03bb5dadca84d4b3688df792e22841d18471362d6bcd58:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:dae37af4239c24443b03bb5dadca84d4b3688df792e22841d18471362d6bcd58"
        occurred_at: "2026-09-28T20:36:41.956Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609282003-E81FJR"
        task_revision: 16
      -
        command_digest: "sha256:fc6daa7dffd8cbfc16d25b5313913c63effcba761bdc2adda1071d1a8f277bab"
        id: "sha256:3805b54c7cb847e4fe5752903dedae14bb4365bf43eba0b029cb32ebb53135cf:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:3805b54c7cb847e4fe5752903dedae14bb4365bf43eba0b029cb32ebb53135cf"
        occurred_at: "2026-09-28T20:37:55.392Z"
        payload_digest: "sha256:60c7bc803c5abd90df92a7ae41a92d20c9937e1dd7ba95074110864d19cb247d"
        task_id: "202609282003-E81FJR"
        task_revision: 17
      -
        command_digest: "sha256:fab64c2b6c4987617c4c7d1bf9aec3f4f40b632ff74a21ff59000e56ff0a8461"
        id: "work-item-resume:sha256:9b90bb5782f87761732187c16ab7f708a2a966b4df1f6719903c8b675c7d872b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "work-item-resume:sha256:9b90bb5782f87761732187c16ab7f708a2a966b4df1f6719903c8b675c7d872b"
        occurred_at: "2026-09-28T20:38:36.108Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609282003-E81FJR"
        task_revision: 18
      -
        command_digest: "sha256:8d929c926553ed25b9a3c70675ce09fac599b39fb34d6e167266723e85a87f48"
        id: "kernel_work_item_claim_required:sha256:b7218a0d0b545decd4de4a348061be81af0067f1d58d306f5b3e5e5502274db4:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:b7218a0d0b545decd4de4a348061be81af0067f1d58d306f5b3e5e5502274db4:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
        occurred_at: "2026-09-28T20:39:09.438Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609282003-E81FJR"
        task_revision: 19
      -
        command_digest: "sha256:73d0a80cce5d54fc902cd18dc3053a2a666a7cf2cc679d6a9d7785ef443839fe"
        id: "kernel_work_item_execution_required:sha256:1153eaa63f5028ef37e84d72a1972dc9fdc0df65af9a98df8c0cdc2d383f4808:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:1153eaa63f5028ef37e84d72a1972dc9fdc0df65af9a98df8c0cdc2d383f4808:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
        occurred_at: "2026-09-28T20:39:24.963Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609282003-E81FJR"
        task_revision: 20
      -
        command_digest: "sha256:0bafb8d4ef69d0cabdd260b64812ed0cd84335714629b886591283b8eab3bcdf"
        id: "semantic-stop:sha256:74aa847b4e4ed265d9438bf8e43152886833e37cd6fe9aec61d7a89444781115:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:74aa847b4e4ed265d9438bf8e43152886833e37cd6fe9aec61d7a89444781115"
        occurred_at: "2026-09-28T20:49:46.416Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202609282003-E81FJR"
        task_revision: 21
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Prepare stable AgentPlane 0.7.12 release candidate

Prepare and qualify the exact stable 0.7.12 release from integrated PL-01 through PL-12 and release-blocker fixes. The user explicitly authorized all required operator actions, local installations, network access, release publication and necessary policy overrides. Do not delete the GitHub repository. Candidate completion is not production publication.

## Scope

- In scope: Prepare and qualify the exact stable 0.7.12 release from integrated PL-01 through PL-12 and release-blocker fixes. The user explicitly authorized all required operator actions, local installations, network access, release publication and necessary policy overrides. Do not delete the GitHub repository. Candidate completion is not production publication.
- Out of scope: unrelated refactors not required for "Prepare stable AgentPlane 0.7.12 release candidate".

## Plan

1. Execute approved WorkItem RC02.

## Verify Steps

PLANNER fallback scaffold for "Prepare stable AgentPlane 0.7.12 release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prepare stable AgentPlane 0.7.12 release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
