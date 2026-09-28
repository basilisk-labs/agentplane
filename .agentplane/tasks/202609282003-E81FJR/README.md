---
id: "202609282003-E81FJR"
title: "Prepare stable AgentPlane 0.7.12 release candidate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 38
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
            digest: "sha256:256a9017ffa6a4a0696319866ba9d0253cf3320f011d2b4bee79b5563cb4e97b"
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
              parent_authority_digest: "sha256:2b5977d800783d3e189ec31f4c4a1f63fae8a0a441cbd901ed62cf844bd530f1"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:273dd7de7a7d8fe0687e44e1d945e426607d3b8abea0b532df82efc04f1856b5"
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
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
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
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
            evidence_digest: "sha256:af4ea8dda424d5c0b9db9e31a93b4d2fdc74a468a6abecd672e1761bd5656bd9"
            kind: "authority_delta"
            previous_fingerprint: "sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
            repository_evidence_digest: "sha256:e2bcc32117ffd2bcf2cc20391e7937f715c63217c52b6dcdaf1eb7097b1aba4e"
            request_digest: "sha256:879d5bbfa8b13095666214a0f75bdb12deacfd72c1ee43f6e7c91eca07117396"
            request_task_revision: 25
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
            digest: "sha256:443e7947b30e7a253154c007a69e4a8441a43813710375736b69aec67a1ca732"
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
              parent_authority_digest: "sha256:256a9017ffa6a4a0696319866ba9d0253cf3320f011d2b4bee79b5563cb4e97b"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:adb59ba1daea0eaa238ccace08bd0964900a92d4e5cee70cb1a67456a2ebbfbb"
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
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
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
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
            evidence_digest: "sha256:7c65ec2fb9487fb9c3003280d85da10f5e98366ab70c17cc53a122d65d8178ee"
            kind: "authority_delta"
            previous_fingerprint: "sha256:273dd7de7a7d8fe0687e44e1d945e426607d3b8abea0b532df82efc04f1856b5"
            repository_evidence_digest: "sha256:b9bc8b7caaa194466cae7393989f0271d633174d93cdca8ae70ad783910c5396"
            request_digest: "sha256:2b63b6d12534714fa6eb69cd5ec67eefe11d57a22b452e5bff74a426eddf4a59"
            request_task_revision: 26
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
            digest: "sha256:9b5d2398cb7a3e420485c359008459dc470ee8dc540dd6cb98de64d915b48afb"
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
              parent_authority_digest: "sha256:443e7947b30e7a253154c007a69e4a8441a43813710375736b69aec67a1ca732"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d59ee74464b2adecdbbbca2cca68546d2c958b6fc94196a56e57dd811a9f1c0b"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
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
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
            changed_paths:
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
            evidence_digest: "sha256:125e6149061baedede021f1a61b7b9c67241344a583292c78bc331a14fdbda9b"
            kind: "authority_delta"
            previous_fingerprint: "sha256:adb59ba1daea0eaa238ccace08bd0964900a92d4e5cee70cb1a67456a2ebbfbb"
            repository_evidence_digest: "sha256:d0390b506b747bb4cdc993b70e65b2ee9d50fd71b85bb958654c589a1322bfc2"
            request_digest: "sha256:ffa67ee5d10561da4ab48c89a798bac911b6c8ea988e50c7fc12472c652491b0"
            request_task_revision: 27
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
            digest: "sha256:c8cbe4e592bf925c536e3c455fee15c49202a80954461a70b60d5969548b71b2"
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
              parent_authority_digest: "sha256:9b5d2398cb7a3e420485c359008459dc470ee8dc540dd6cb98de64d915b48afb"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7a54294d29507c20b1235248d50f22f5d7d4bca46c8e71d0f71e5d1150024d3e"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
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
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
            changed_paths:
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
            evidence_digest: "sha256:d155264a5c80a3377459f0f67c4a0489bc9d97999364bce757f971c4e4668212"
            kind: "authority_delta"
            previous_fingerprint: "sha256:d59ee74464b2adecdbbbca2cca68546d2c958b6fc94196a56e57dd811a9f1c0b"
            repository_evidence_digest: "sha256:642fc80e3af3d2d822abe307870fa2457d30c9b222eb615ed8ecf727fdbcc902"
            request_digest: "sha256:086ae0df9ba69b483c4ef9190d32e0aa9bbe1955e08d72a803d84720f61fa30c"
            request_task_revision: 28
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
            digest: "sha256:433118906059a048155567db92f0aeb60a5eab7ca360990bc63644195380aed9"
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
              parent_authority_digest: "sha256:c8cbe4e592bf925c536e3c455fee15c49202a80954461a70b60d5969548b71b2"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:29eb71ee20f97cb1d369962874498b780b948c47a0abe08dd93048ba67fec808"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
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
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            evidence_digest: "sha256:f149c8ebd59596598d1f6eb491d65c7d9ff33316fa6299ce707711cdc0463ee8"
            kind: "authority_delta"
            previous_fingerprint: "sha256:7a54294d29507c20b1235248d50f22f5d7d4bca46c8e71d0f71e5d1150024d3e"
            repository_evidence_digest: "sha256:c651d2fb0f93ffa250fb87ee267f1bab329cdaece7d7a53710282e3f876de908"
            request_digest: "sha256:dad102427ea07889f5e49a10cd2034ca8e5eaab4770bfaa7cfd1fbfa6ee98c24"
            request_task_revision: 29
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
            digest: "sha256:8189957aafde842f23e364420df1e6b7d4c3a1e1377c6c3cc4376ad8b5130fc8"
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
              parent_authority_digest: "sha256:433118906059a048155567db92f0aeb60a5eab7ca360990bc63644195380aed9"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:537fea406e3c981d53e0cfb9a2bab15daaffccc9fac3119923aa4793c7bbe2f6"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
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
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
            evidence_digest: "sha256:efcce8439f62d181bbb806331dec448140083aca9e6fc6bee3a2c5330e4b035b"
            kind: "authority_delta"
            previous_fingerprint: "sha256:29eb71ee20f97cb1d369962874498b780b948c47a0abe08dd93048ba67fec808"
            repository_evidence_digest: "sha256:85bf93e1b3473312ea027d3b98ae631bfcf687a8fc77d83115e5a92353fcb5d2"
            request_digest: "sha256:77efb87e969aa3bb8cec4d3fdb3330c4644cb7ad9b6d4e4b1c721fdeb811cec5"
            request_task_revision: 30
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
            digest: "sha256:06b78389ac5741ec5888190a2912b9b0278b781f0b1e051bba8b583d07bf7932"
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
              parent_authority_digest: "sha256:8189957aafde842f23e364420df1e6b7d4c3a1e1377c6c3cc4376ad8b5130fc8"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:538416557577057caab4c060afc995f06e226f1619d34e85f4dfcf9a2e11a5db"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-implementation.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
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
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-implementation.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-implementation.ts"
            evidence_digest: "sha256:8cfc3e5052dbf47996ebec2c4f43461404aac0864465f52196362b8501144529"
            kind: "authority_delta"
            previous_fingerprint: "sha256:537fea406e3c981d53e0cfb9a2bab15daaffccc9fac3119923aa4793c7bbe2f6"
            repository_evidence_digest: "sha256:24c18fcedf7edfb9ec5df7f6722551bfb5a212d60a55291ef2df42d02fb72997"
            request_digest: "sha256:7848c1f6d6ef7a962590d4fdace47c4add9c507bf0071b57d912d2e0c0d88c2f"
            request_task_revision: 31
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
            digest: "sha256:ebc7e15a12fea63cc42819d26779f8d5e01de8bc32eac8942ee8cb6841705b8e"
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
              parent_authority_digest: "sha256:06b78389ac5741ec5888190a2912b9b0278b781f0b1e051bba8b583d07bf7932"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4c070fc552153efca1ee51d1f9c386c6cc84669487e951269077337c5ba3faee"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/managed-conflict-recovery.testkit.ts"
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-implementation.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/checks/run-vitest-suite.mjs"
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
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/managed-conflict-recovery.testkit.ts"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "scripts/checks/run-vitest-suite.mjs"
            changed_paths:
              - "docs/releases/v0.7.12.md"
              - "packages/agentplane/src/cli/managed-conflict-recovery.testkit.ts"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "scripts/checks/run-vitest-suite.mjs"
            evidence_digest: "sha256:4140dbab268ad31dd44ce58d2c80a01373e20c1c5dc66072ba5b212033b8d97e"
            kind: "authority_delta"
            previous_fingerprint: "sha256:538416557577057caab4c060afc995f06e226f1619d34e85f4dfcf9a2e11a5db"
            repository_evidence_digest: "sha256:b446ab7018bb11ffd0dff2fb8838dfb1bc7ea862e948cd485e17ed93eaf3faf3"
            request_digest: "sha256:da78d99f17c133b0ac1ce85dde4707dd642942816a33610e0e87f97a92a66838"
            request_task_revision: 32
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
            digest: "sha256:1518af93106426b9a860796cecf8a2e549de11f09f70746f54fae35c3ca35abf"
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
              parent_authority_digest: "sha256:ebc7e15a12fea63cc42819d26779f8d5e01de8bc32eac8942ee8cb6841705b8e"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:03362be382ea37b91335b53ae070a5b7ea104f14f87e275b25807b5786a946de"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/managed-conflict-recovery.testkit.ts"
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-implementation.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/checks/run-vitest-suite.mjs"
              - "scripts/oversized-test-baseline.json"
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
              - "scripts/oversized-test-baseline.json"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "scripts/oversized-test-baseline.json"
            evidence_digest: "sha256:76b9bc834a4b7aa8a7f56d766ba28dbfb27f2a8dabded887ffe25eff5e37443b"
            kind: "authority_delta"
            previous_fingerprint: "sha256:4c070fc552153efca1ee51d1f9c386c6cc84669487e951269077337c5ba3faee"
            repository_evidence_digest: "sha256:554546c58e6d65c01b600e991dfe1ff20166413ce4284dda69fb556d9312431c"
            request_digest: "sha256:eaee11ccbd7e193f0d926224a3dc7cb34983a42e2e843c6e64bb7d9433baec02"
            request_task_revision: 33
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
            digest: "sha256:500a9d76fe1a34ff5241e93bdf8217e19ed55a22a56952e643631aa8a6148beb"
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
              parent_authority_digest: "sha256:1518af93106426b9a860796cecf8a2e549de11f09f70746f54fae35c3ca35abf"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:96b7f3bd4b5a1ac0e4fd366d5ab6097ff38a61fe5131b8b0f217bcba49712358"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/managed-conflict-recovery.testkit.ts"
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-implementation.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/checks/run-vitest-suite.mjs"
              - "scripts/oversized-test-baseline.json"
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
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
            evidence_digest: "sha256:b3b52943c253d66b61bc72498190cb4e3b6bda54327505784a31d5dc42f387f3"
            kind: "authority_delta"
            previous_fingerprint: "sha256:03362be382ea37b91335b53ae070a5b7ea104f14f87e275b25807b5786a946de"
            repository_evidence_digest: "sha256:3f6c905c3d2fa063de1b6f15ad0e31ab89531ebe43248517e707e784559b07cb"
            request_digest: "sha256:6a0318ca3354229aa180a3cdb7c4e9b281bc0ae59008929187a5d85ed39fea5b"
            request_task_revision: 34
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
            digest: "sha256:58379aced487b911741ac427c73c1fd0758896b026a11ba8437eb714a00fa77d"
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
              parent_authority_digest: "sha256:500a9d76fe1a34ff5241e93bdf8217e19ed55a22a56952e643631aa8a6148beb"
            repository_effects:
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8d27383ad2b8190a6ed2302920d74bcff405d62f36a17e3979b75ff8c69ab4d7"
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
              - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
              - "packages/agentplane/src/cli/managed-conflict-recovery.testkit.ts"
              - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.demo.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/demo.ts"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-implementation.ts"
              - "packages/core/package.json"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/spec/examples/acr.json"
              - "packages/testkit/package.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/checks/run-vitest-suite.mjs"
              - "scripts/oversized-test-baseline.json"
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
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
            evidence_digest: "sha256:5873f34410bcfa27852d2462c69d78bbf3f68521023794bca3332b3c13cfabe8"
            kind: "authority_delta"
            previous_fingerprint: "sha256:96b7f3bd4b5a1ac0e4fd366d5ab6097ff38a61fe5131b8b0f217bcba49712358"
            repository_evidence_digest: "sha256:e6c175a848c54202c67534e69ea46123be0dbfa366f51ebd1068e3552a3b63e7"
            request_digest: "sha256:14f61a629664bfa7e4f709b9952b01ab9561cc23da835863808c23c9a6d4e79b"
            request_task_revision: 35
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
        kernel_work_item_claim_required:sha256:3ebbf9c81c95c82fde427ae38ac5820a98d7b30bda39e6398cba51b5ab0c6651:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:
          after_revision: 23
          aggregate_digest: "sha256:ff2e3a70324c6b68f1fff9dab945d9964fe93e16b9271c590d700ff41ab83580"
          before_revision: 22
          command_digest: "sha256:f9530e70f10fdd5676815447abc4b194d270bc91f05f9a87b2d4ce168f934dbf"
          effect_ids: []
          event_digests:
            - "sha256:849ece78790b96443a9ec974b30379c303f554505b2ebffc6c437deef0311fa2"
          mutation_id: "kernel_work_item_claim_required:sha256:3ebbf9c81c95c82fde427ae38ac5820a98d7b30bda39e6398cba51b5ab0c6651:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
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
        kernel_work_item_execution_required:sha256:c8debdfc5fd3c3c4a7b37c23e8f450f4e3be4f4849806dc1d2aa5a3a148a1cf9:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:
          after_revision: 24
          aggregate_digest: "sha256:06306c97db82216daef572b66f8c72227207f4342fffe0828b9f593a29caf85c"
          before_revision: 23
          command_digest: "sha256:9dea9bed66aca1e91efb6c958b7efd823091422150ec3f56c3c5cf6ac94270df"
          effect_ids: []
          event_digests:
            - "sha256:6d2308a0f16e6a81de705604e91ec9a9a87cf624bab18e8b0b90d41d1697178a"
          mutation_id: "kernel_work_item_execution_required:sha256:c8debdfc5fd3c3c4a7b37c23e8f450f4e3be4f4849806dc1d2aa5a3a148a1cf9:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
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
        semantic-stop:sha256:6c1c47c31b34fdd3f9adb14a32ba2bca3c83cffef346c619c2a4804784a77f5c:
          after_revision: 25
          aggregate_digest: "sha256:08d4233f995160f396927af1bf42d96614daefe622846df854141bde5c98c45c"
          before_revision: 24
          command_digest: "sha256:30a63d84e92e3cb0e9bd377e9f8ed92c06bc5e92af0e7303dce702a8e0b5c831"
          effect_ids: []
          event_digests:
            - "sha256:b07fcf0ac60df1a25d3251a2c5a9d3ef49042b4bdd8a78ec2a13707e7f5342ef"
          mutation_id: "semantic-stop:sha256:6c1c47c31b34fdd3f9adb14a32ba2bca3c83cffef346c619c2a4804784a77f5c"
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
        sha256:18addaa36d02ef5db64d9abfa55bcceb2ac9f8e55c866b7bf372297d9ceb10f8:
          after_revision: 27
          aggregate_digest: "sha256:758da6c159047922558c1acf00ab3afe5a7d1aabe5b7e7fc38162c40e61b40d3"
          before_revision: 26
          command_digest: "sha256:9e3ba00cfa9b8d8544453f36fbfed5a56960e6526510f8ebca71bb3eb031d35b"
          effect_ids: []
          event_digests:
            - "sha256:810cccb0f741d13466f310dd53eb42d1ff28a72f49bc451cb4ca37a44d507e21"
          mutation_id: "sha256:18addaa36d02ef5db64d9abfa55bcceb2ac9f8e55c866b7bf372297d9ceb10f8"
        sha256:273fb8e4478d3d376f1cf13c2752e568dc0e429f00ecd16e79eb4e94eacc6642:
          after_revision: 33
          aggregate_digest: "sha256:134fabd4b1796fbc1811fc43090ef12f13811b8a501880c07a3c2b74e79c188c"
          before_revision: 32
          command_digest: "sha256:b53f7369c70dc2b1277760aa5c4eca2ee18bd62524e4ece2b22f64b59ef13577"
          effect_ids: []
          event_digests:
            - "sha256:63f86be80fc664191035ca4a492426469596c059e5690210b99681769a3fc8ce"
          mutation_id: "sha256:273fb8e4478d3d376f1cf13c2752e568dc0e429f00ecd16e79eb4e94eacc6642"
        sha256:2ea2ad2fa40c0a0080fe6f8104648812f27b1e38032e3eb967863bad35f810d3:
          after_revision: 29
          aggregate_digest: "sha256:3cda3efc075ce8d4e30e6c8cfdb18f1bc893ffd92f1f52c9c7f21f308e672511"
          before_revision: 28
          command_digest: "sha256:71e18ab1358b621674dc240c940becaca0282ed6e9099d61985753726e9678b9"
          effect_ids: []
          event_digests:
            - "sha256:132c944ca27f5225b2e148702993a8869ca4bc8a40dc2dd68600dd6b40a19fbd"
          mutation_id: "sha256:2ea2ad2fa40c0a0080fe6f8104648812f27b1e38032e3eb967863bad35f810d3"
        sha256:326450f82d05747aaf2c1934c277c0379e5c3358fc2551e11243d019a6afa001:
          after_revision: 31
          aggregate_digest: "sha256:b544724ea7a8a2898b75bb8e240e5e599ea1b8ab7346e27f44e261fbfd525499"
          before_revision: 30
          command_digest: "sha256:eeaeea329644524ab31d38e5a995fe3248405b1404b1c3f2336f39e3da5c0562"
          effect_ids: []
          event_digests:
            - "sha256:e1bc5a07127c88fac004ed20d9212858d5d9d492bca00d8a832eb509928ddaae"
          mutation_id: "sha256:326450f82d05747aaf2c1934c277c0379e5c3358fc2551e11243d019a6afa001"
        sha256:32ce885d1c1d8005a6de3b5fb69dc69c63bc96d61fa9e18f4916e0c254163e8b:
          after_revision: 34
          aggregate_digest: "sha256:253c2e3f6d922a12088b3dcabc67768db73b6149ff0cdea9b2bf2d15f97826fc"
          before_revision: 33
          command_digest: "sha256:da28a7748ad2b2daff86c23a7e2caf947f815a9de72d1a083ed8038a15472774"
          effect_ids: []
          event_digests:
            - "sha256:26c5bf32b25ccdbfac8f2beb91dfbff6d5b956db733ee2fcfee3074addcee9ac"
          mutation_id: "sha256:32ce885d1c1d8005a6de3b5fb69dc69c63bc96d61fa9e18f4916e0c254163e8b"
        sha256:3805b54c7cb847e4fe5752903dedae14bb4365bf43eba0b029cb32ebb53135cf:
          after_revision: 17
          aggregate_digest: "sha256:d2f3a512309d63eed86108265fda05d81f321dfba4212eb516a48ea210a18480"
          before_revision: 16
          command_digest: "sha256:fc6daa7dffd8cbfc16d25b5313913c63effcba761bdc2adda1071d1a8f277bab"
          effect_ids: []
          event_digests:
            - "sha256:e71977396f3ebd270b38245883fdc30c7a367bada9246b3f3d1b4ec8037c6165"
          mutation_id: "sha256:3805b54c7cb847e4fe5752903dedae14bb4365bf43eba0b029cb32ebb53135cf"
        sha256:43c7069b0c68260e1b69c1315de671ef5ec004dd53f739ddcdae2564657e42aa:
          after_revision: 26
          aggregate_digest: "sha256:d1c362e932e6389b1015aaa139fd423efbe4e35213a307c8178bef7f7d97b21d"
          before_revision: 25
          command_digest: "sha256:cd35c92b2a61816e0f97e482d9f340edf0c52bf2afce7af92ff3dfe2e55f709b"
          effect_ids: []
          event_digests:
            - "sha256:8264f4a26b428fa77ce1ecfef7975424a3f7465aa26266f69f16e13e63b33e35"
          mutation_id: "sha256:43c7069b0c68260e1b69c1315de671ef5ec004dd53f739ddcdae2564657e42aa"
        sha256:4a47973512a4a4685342ff5d51f7980666ea89c491ab2cc6a3bd8b10efe03c1b:
          after_revision: 3
          aggregate_digest: "sha256:9ea09d28b3d12889b8a08a2beb252bcdca18e4ea328979ca2c55b9f3254a37d7"
          before_revision: 2
          command_digest: "sha256:8f915bb6efbb81b35b80c3755ae712390f2b264f6cb97617f2ffbdb9ed831de4"
          effect_ids: []
          event_digests:
            - "sha256:5aa41e72b0fc260053b696792c162a26804eb0914d1519e5c6a7a31198c905e9"
          mutation_id: "sha256:4a47973512a4a4685342ff5d51f7980666ea89c491ab2cc6a3bd8b10efe03c1b"
        sha256:6145e9932ed1129c9afc2fd7a3f2dba0dae662ebf85362e4790a3033dadf6945:
          after_revision: 35
          aggregate_digest: "sha256:192c194dd3bc0a0081ce1955cd9c4c349ba9e6da361476595ee68b0a43692a26"
          before_revision: 34
          command_digest: "sha256:c173ccf5b8b9988884b88fef9f320bcb9cf2f2642a295e79096f094ce97e3d83"
          effect_ids: []
          event_digests:
            - "sha256:2a5ee4e744b4cfa8d06f4d501da338b77d4f3446a44952b534b8ddda0cca83db"
          mutation_id: "sha256:6145e9932ed1129c9afc2fd7a3f2dba0dae662ebf85362e4790a3033dadf6945"
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
        sha256:8abefa1e272c94ba4360016a0615652082551cbce073bb4d409271ec26b80ad2:
          after_revision: 36
          aggregate_digest: "sha256:8c6d98818b300e5a74bfa32ceaf7d3f66337d73ae4769faea91630ce5c122e60"
          before_revision: 35
          command_digest: "sha256:fbedcd939e0eec3a765daf35f40ed7de05cf2cfdb0c5248fe92809d4204e9b8d"
          effect_ids: []
          event_digests:
            - "sha256:c0de20db4fba95c91a1f0906cf46ad226b5eefd300ec9739f76678175c24b970"
          mutation_id: "sha256:8abefa1e272c94ba4360016a0615652082551cbce073bb4d409271ec26b80ad2"
        sha256:bbe51814e0b81319faf0dfe118237220132e4fbccf38640c54d52d0169b23e63:
          after_revision: 32
          aggregate_digest: "sha256:e859e4e6328db7e4a7b9e0ec693c14a94a2743722f894e7ec9561565d12d68e5"
          before_revision: 31
          command_digest: "sha256:f06d1e5fb4312e438ed3da26a21dcbc50c22ff70e8a24fb7413e671d2f903c0f"
          effect_ids: []
          event_digests:
            - "sha256:ba3777b38fe7322797f18c9c03e4ba16dcbd33c283e3dc5f15b80ec9217a492c"
          mutation_id: "sha256:bbe51814e0b81319faf0dfe118237220132e4fbccf38640c54d52d0169b23e63"
        sha256:cd5be6dd6b98cfb2c65df9038ce199e246e608cf7e65013fbef998f2d9ce7913:
          after_revision: 9
          aggregate_digest: "sha256:326f75e6fe3e0906bf094652449e9776b43c7accddbf126ac9c0193de221a055"
          before_revision: 8
          command_digest: "sha256:e11ac9c5961c57416523a572c92e828e16e948bc7a29a9844173ef1710452fcc"
          effect_ids: []
          event_digests:
            - "sha256:fd18a91eff68835c59fc0a57c6ed6aa940d753c48f7a91e89e47d50d70554e06"
          mutation_id: "sha256:cd5be6dd6b98cfb2c65df9038ce199e246e608cf7e65013fbef998f2d9ce7913"
        sha256:d4af8d788e86452b6256b5c4392657526d6d90cd8757b24851d99dbd9a5cbb77:
          after_revision: 30
          aggregate_digest: "sha256:42d6261d2018ba2888dd6867c6fba6d69dc00d58a43485c349de0cbd956d5714"
          before_revision: 29
          command_digest: "sha256:87ee085d163c428e256967c73fa201c05074c16ecf3b6d3d19109ddb592cbf96"
          effect_ids: []
          event_digests:
            - "sha256:11f8f5e6be4e549af1c16e0513257f71c3b3886f133a093bda8c1d42fc6dbcb7"
          mutation_id: "sha256:d4af8d788e86452b6256b5c4392657526d6d90cd8757b24851d99dbd9a5cbb77"
        sha256:dc4150672bdb8cf4f98cb21bd2b0f872eb28aeacd293a36f4f249674a80a41eb:
          after_revision: 28
          aggregate_digest: "sha256:42254a6a6b1cea78f5b50f460498c330b3890ff6d195c613bc30b53af1b14902"
          before_revision: 27
          command_digest: "sha256:78a684a2d17915d257ef2363ff46aa174e5beeb94a4c3873859d5f93f6bad9e5"
          effect_ids: []
          event_digests:
            - "sha256:3c2689c8a9365f464b6e48217b28666d4d0c94ab3361100dec0c076172130b21"
          mutation_id: "sha256:dc4150672bdb8cf4f98cb21bd2b0f872eb28aeacd293a36f4f249674a80a41eb"
        work-item-resume:sha256:5b0e31b80a0c2bd7df881f1aabc1fe6b510f64520fa9e4c7e5e6fa9e6b922634:
          after_revision: 22
          aggregate_digest: "sha256:ee91b170e7d276ff16c2f1545d9d34187f1cc1fc2f24a10b4a43202b06afc222"
          before_revision: 21
          command_digest: "sha256:181bc3735a4793955f2f840e62908ec09d0a0d36b3863b8e4e662ee0466b8eb1"
          effect_ids: []
          event_digests:
            - "sha256:b8e6fda973a8397ec9101d59f09bcd298a63423053863e635ace1aaa123482b1"
          mutation_id: "work-item-resume:sha256:5b0e31b80a0c2bd7df881f1aabc1fe6b510f64520fa9e4c7e5e6fa9e6b922634"
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
      revision: 36
      schema_version: 1
      state: "ACTIVE"
      work_items:
        RC02:
          attempt: 3
          claim_id: "sha256:9b3c12b16ce3acb5e70b7fc84f8cafcd3a3e7584961acf740e45a6b865e78732"
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
          revision: 12
          state: "BLOCKED"
          validation: null
    digest: "sha256:0915cfcfb41c519efe811fde1ecfae40816853f2d7a0ce8cd31a69c637923aa8"
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
      -
        command_digest: "sha256:181bc3735a4793955f2f840e62908ec09d0a0d36b3863b8e4e662ee0466b8eb1"
        id: "work-item-resume:sha256:5b0e31b80a0c2bd7df881f1aabc1fe6b510f64520fa9e4c7e5e6fa9e6b922634:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "work-item-resume:sha256:5b0e31b80a0c2bd7df881f1aabc1fe6b510f64520fa9e4c7e5e6fa9e6b922634"
        occurred_at: "2026-09-28T20:55:10.787Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202609282003-E81FJR"
        task_revision: 22
      -
        command_digest: "sha256:f9530e70f10fdd5676815447abc4b194d270bc91f05f9a87b2d4ce168f934dbf"
        id: "kernel_work_item_claim_required:sha256:3ebbf9c81c95c82fde427ae38ac5820a98d7b30bda39e6398cba51b5ab0c6651:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3ebbf9c81c95c82fde427ae38ac5820a98d7b30bda39e6398cba51b5ab0c6651:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
        occurred_at: "2026-09-28T20:56:08.322Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609282003-E81FJR"
        task_revision: 23
      -
        command_digest: "sha256:9dea9bed66aca1e91efb6c958b7efd823091422150ec3f56c3c5cf6ac94270df"
        id: "kernel_work_item_execution_required:sha256:c8debdfc5fd3c3c4a7b37c23e8f450f4e3be4f4849806dc1d2aa5a3a148a1cf9:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c8debdfc5fd3c3c4a7b37c23e8f450f4e3be4f4849806dc1d2aa5a3a148a1cf9:sha256:eb07913e3cf3c89efbe136fc50f9a5cbf74be2fc7b021c0d23a834693360f5cc"
        occurred_at: "2026-09-28T20:56:24.811Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202609282003-E81FJR"
        task_revision: 24
      -
        command_digest: "sha256:30a63d84e92e3cb0e9bd377e9f8ed92c06bc5e92af0e7303dce702a8e0b5c831"
        id: "semantic-stop:sha256:6c1c47c31b34fdd3f9adb14a32ba2bca3c83cffef346c619c2a4804784a77f5c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:6c1c47c31b34fdd3f9adb14a32ba2bca3c83cffef346c619c2a4804784a77f5c"
        occurred_at: "2026-09-28T21:10:49.364Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202609282003-E81FJR"
        task_revision: 25
      -
        command_digest: "sha256:cd35c92b2a61816e0f97e482d9f340edf0c52bf2afce7af92ff3dfe2e55f709b"
        id: "sha256:43c7069b0c68260e1b69c1315de671ef5ec004dd53f739ddcdae2564657e42aa:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:43c7069b0c68260e1b69c1315de671ef5ec004dd53f739ddcdae2564657e42aa"
        occurred_at: "2026-09-28T21:11:53.198Z"
        payload_digest: "sha256:317941053eb3c0db6e5de6a0905287c6b009f9116a919aee465e0a51ef2ff1ba"
        task_id: "202609282003-E81FJR"
        task_revision: 26
      -
        command_digest: "sha256:9e3ba00cfa9b8d8544453f36fbfed5a56960e6526510f8ebca71bb3eb031d35b"
        id: "sha256:18addaa36d02ef5db64d9abfa55bcceb2ac9f8e55c866b7bf372297d9ceb10f8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:18addaa36d02ef5db64d9abfa55bcceb2ac9f8e55c866b7bf372297d9ceb10f8"
        occurred_at: "2026-09-28T21:16:41.034Z"
        payload_digest: "sha256:521f02cecd937479862cd779359d45e395da2359a2d9bbeb31545fac39b11810"
        task_id: "202609282003-E81FJR"
        task_revision: 27
      -
        command_digest: "sha256:78a684a2d17915d257ef2363ff46aa174e5beeb94a4c3873859d5f93f6bad9e5"
        id: "sha256:dc4150672bdb8cf4f98cb21bd2b0f872eb28aeacd293a36f4f249674a80a41eb:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:dc4150672bdb8cf4f98cb21bd2b0f872eb28aeacd293a36f4f249674a80a41eb"
        occurred_at: "2026-09-28T21:22:30.716Z"
        payload_digest: "sha256:0d95db0a41bd9d4dbf8b1f027287f7f118ca1a8720e3f86b9239c2bf4cc5e4d7"
        task_id: "202609282003-E81FJR"
        task_revision: 28
      -
        command_digest: "sha256:71e18ab1358b621674dc240c940becaca0282ed6e9099d61985753726e9678b9"
        id: "sha256:2ea2ad2fa40c0a0080fe6f8104648812f27b1e38032e3eb967863bad35f810d3:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2ea2ad2fa40c0a0080fe6f8104648812f27b1e38032e3eb967863bad35f810d3"
        occurred_at: "2026-09-28T21:29:29.408Z"
        payload_digest: "sha256:a5903c18ea5de85a7da4a9d4814c51ba30aaffde7d00e7a86f9945c0beafa88a"
        task_id: "202609282003-E81FJR"
        task_revision: 29
      -
        command_digest: "sha256:87ee085d163c428e256967c73fa201c05074c16ecf3b6d3d19109ddb592cbf96"
        id: "sha256:d4af8d788e86452b6256b5c4392657526d6d90cd8757b24851d99dbd9a5cbb77:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d4af8d788e86452b6256b5c4392657526d6d90cd8757b24851d99dbd9a5cbb77"
        occurred_at: "2026-09-28T21:46:10.610Z"
        payload_digest: "sha256:0ad11c260a2de0067a3cef76afe319bf55cebdf9ef81184558e20bdb82c91448"
        task_id: "202609282003-E81FJR"
        task_revision: 30
      -
        command_digest: "sha256:eeaeea329644524ab31d38e5a995fe3248405b1404b1c3f2336f39e3da5c0562"
        id: "sha256:326450f82d05747aaf2c1934c277c0379e5c3358fc2551e11243d019a6afa001:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:326450f82d05747aaf2c1934c277c0379e5c3358fc2551e11243d019a6afa001"
        occurred_at: "2026-09-28T21:50:23.932Z"
        payload_digest: "sha256:f1f3eb9e718064eec595d9fd7cfd7c69c786c138ee1505bb078bcbb9859e0d1a"
        task_id: "202609282003-E81FJR"
        task_revision: 31
      -
        command_digest: "sha256:f06d1e5fb4312e438ed3da26a21dcbc50c22ff70e8a24fb7413e671d2f903c0f"
        id: "sha256:bbe51814e0b81319faf0dfe118237220132e4fbccf38640c54d52d0169b23e63:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bbe51814e0b81319faf0dfe118237220132e4fbccf38640c54d52d0169b23e63"
        occurred_at: "2026-09-28T22:09:59.163Z"
        payload_digest: "sha256:1197a361806043a12fad177ffec8187472c369e970d25768c666c580e4e4b557"
        task_id: "202609282003-E81FJR"
        task_revision: 32
      -
        command_digest: "sha256:b53f7369c70dc2b1277760aa5c4eca2ee18bd62524e4ece2b22f64b59ef13577"
        id: "sha256:273fb8e4478d3d376f1cf13c2752e568dc0e429f00ecd16e79eb4e94eacc6642:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:273fb8e4478d3d376f1cf13c2752e568dc0e429f00ecd16e79eb4e94eacc6642"
        occurred_at: "2026-09-28T22:13:03.528Z"
        payload_digest: "sha256:486e05e196ac82063b18271b7be53ccb1777c7ae145dd44957aa0cc9890be6af"
        task_id: "202609282003-E81FJR"
        task_revision: 33
      -
        command_digest: "sha256:da28a7748ad2b2daff86c23a7e2caf947f815a9de72d1a083ed8038a15472774"
        id: "sha256:32ce885d1c1d8005a6de3b5fb69dc69c63bc96d61fa9e18f4916e0c254163e8b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:32ce885d1c1d8005a6de3b5fb69dc69c63bc96d61fa9e18f4916e0c254163e8b"
        occurred_at: "2026-09-28T22:18:18.925Z"
        payload_digest: "sha256:3d2163f51fda60cd21b1c287bee4fdeb786611d20216e840ca008843ee4c0487"
        task_id: "202609282003-E81FJR"
        task_revision: 34
      -
        command_digest: "sha256:c173ccf5b8b9988884b88fef9f320bcb9cf2f2642a295e79096f094ce97e3d83"
        id: "sha256:6145e9932ed1129c9afc2fd7a3f2dba0dae662ebf85362e4790a3033dadf6945:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6145e9932ed1129c9afc2fd7a3f2dba0dae662ebf85362e4790a3033dadf6945"
        occurred_at: "2026-09-28T22:40:18.259Z"
        payload_digest: "sha256:cc4a7ce5d5ebb283543c21d8a8099afb3bf7add8e1c841ff83fa6d1b51dd8684"
        task_id: "202609282003-E81FJR"
        task_revision: 35
      -
        command_digest: "sha256:fbedcd939e0eec3a765daf35f40ed7de05cf2cfdb0c5248fe92809d4204e9b8d"
        id: "sha256:8abefa1e272c94ba4360016a0615652082551cbce073bb4d409271ec26b80ad2:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8abefa1e272c94ba4360016a0615652082551cbce073bb4d409271ec26b80ad2"
        occurred_at: "2026-09-28T22:50:56.791Z"
        payload_digest: "sha256:3d9fde00c4f88677b2a1bfbe4215faf57da3d4db993249e0180652134489e723"
        task_id: "202609282003-E81FJR"
        task_revision: 36
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
