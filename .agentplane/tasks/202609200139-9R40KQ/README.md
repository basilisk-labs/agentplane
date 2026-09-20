---
id: "202609200139-9R40KQ"
title: "Publish and verify AgentPlane 0.7.10"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 26
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "v0.7.10"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "network"
  - "publish"
verify:
  - "bun run release:check"
  - "node scripts/check-release-notes.mjs --tag v0.7.10"
  - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
  - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
plan_approval:
  state: "rejected"
  updated_at: "2026-09-20T05:15:26.020Z"
  updated_by: "USER"
  note: "Replan blocked preparation with bun.lock as release metadata."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
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
    - "effect_external_write"
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:63f09c16a5454d4f63a35a184007223c03d1b3ed07e5fe550a048d8fd89affff"
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
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-20T01:39:13.800Z"
doc_updated_by: "INTEGRATOR"
description: "Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect."
sections:
  Summary: |-
    Publish and verify AgentPlane 0.7.10

    Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect.
  Scope: |-
    - In scope: Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect.
    - Out of scope: unrelated refactors not required for "Publish and verify AgentPlane 0.7.10".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Publish and verify AgentPlane 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Publish and verify AgentPlane 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "8aee6c026bf45c569aaa698a4c6b8cced9423505"
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
              - "network_read"
              - "report_result"
              - "repository_read"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:22204a23531f49ea4ab61da2709d2a9035cf47643a6e34f34056197d057cf990"
            expires_at: null
            external_effects:
              - "read_distribution_channel_state"
              - "read_github_release_state"
              - "read_npm_registry_state"
            plan_digest: "sha256:36417191ceb188591ddeb6dc30f2a176693a0a47955355b395734efc5dc2ecf5"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:417bfd235bd88f8d9ad2abad4c056e74616bf43a1d67f6cf9fabbaea5cb2c1be"
              kind: "USER"
              parent_authority_digest: null
            repository_effects: []
            repository_fingerprint: "sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "GitHub Actions Publish release workflow"
              - "GitHub Releases"
              - "npm registry"
              - "temporary clean install directory"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/publish.yml"
              - "docs/releases"
              - "package.json"
              - "packages"
              - "scripts/release"
            task_id: "202609200139-9R40KQ"
            validation_requirements:
              - "bun run release:check"
              - "bun run release:smoke:published"
              - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
              - "node scripts/check-release-notes.mjs --tag v0.7.10"
              - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
              - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
              - "npm view @agentplaneorg/core@0.7.10 version"
              - "npm view @agentplaneorg/recipes@0.7.10 version"
              - "npm view agentplane@0.7.10 version"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "network_read"
              - "report_result"
              - "repository_read"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:10c354ec52cc42b81a22f2fe896e1489ebfa5c1996bf14e951db74c887ed1aaf"
            expires_at: null
            external_effects:
              - "read_distribution_channel_state"
              - "read_github_release_state"
              - "read_npm_registry_state"
            plan_digest: "sha256:36417191ceb188591ddeb6dc30f2a176693a0a47955355b395734efc5dc2ecf5"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:417bfd235bd88f8d9ad2abad4c056e74616bf43a1d67f6cf9fabbaea5cb2c1be"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:22204a23531f49ea4ab61da2709d2a9035cf47643a6e34f34056197d057cf990"
            repository_effects: []
            repository_fingerprint: "sha256:012441598471848b9fe7ed508f02a7faffd1676a4d9ccdc191d04ac51c68cfbd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "GitHub Actions Publish release workflow"
              - "GitHub Releases"
              - "npm registry"
              - "temporary clean install directory"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/publish.yml"
              - "docs/releases"
              - "package.json"
              - "packages"
              - "scripts/release"
            task_id: "202609200139-9R40KQ"
            validation_requirements:
              - "bun run release:check"
              - "bun run release:smoke:published"
              - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
              - "node scripts/check-release-notes.mjs --tag v0.7.10"
              - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
              - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
              - "npm view @agentplaneorg/core@0.7.10 version"
              - "npm view @agentplaneorg/recipes@0.7.10 version"
              - "npm view agentplane@0.7.10 version"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/releases/v0.7.10.md"
            evidence_digest: "sha256:1ee49186f556137f93f5acc208ad997d9711dbaa35a369467bd4056579c1de76"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "network_read"
              - "provider_write"
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:fda20553ab1e14a4ec3fc095d2ff286c02abe89f7906eac0c4241368919d93e7"
            expires_at: null
            external_effects:
              - "create_git_tag_and_github_release"
              - "dispatch_publish_workflow"
              - "publish_distribution_updates"
              - "publish_npm_packages"
              - "read_public_release_state"
            plan_digest: "sha256:54ec9891a815aa1362ccee8f3c94af7a90da9b43bcba4ccaad18b95135b848d8"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:81261dc398b57bf386695e2da0554090bb986a29310aeb4894ed1d357f10d97b"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
            repository_fingerprint: "sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "GHCR and distribution repositories"
              - "GitHub Actions Publish release workflow"
              - "GitHub Releases"
              - "npm registry"
              - "temporary clean install directory"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/publish.yml"
              - "docs/releases/v0.7.10.md"
              - "package.json"
              - "packages"
              - "scripts/release"
            task_id: "202609200139-9R40KQ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run release:check"
              - "bun run release:smoke:published"
              - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
              - "gh run list --workflow publish.yml --limit 20"
              - "git diff --check"
              - "node scripts/check-release-notes.mjs --tag v0.7.10"
              - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
              - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202609200139-9R40KQ"
              - "npm view @agentplaneorg/core@0.7.10 version"
              - "npm view @agentplaneorg/recipes@0.7.10 version"
              - "npm view agentplane@0.7.10 version"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "network_read"
              - "provider_write"
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:526b5d96e18895c4864d723656b4ab26b220c2eb0c01c23cc8e7f3f911768a90"
            expires_at: null
            external_effects:
              - "create_git_tag_and_github_release"
              - "dispatch_publish_workflow"
              - "publish_distribution_updates"
              - "publish_npm_packages"
              - "read_public_release_state"
            plan_digest: "sha256:54ec9891a815aa1362ccee8f3c94af7a90da9b43bcba4ccaad18b95135b848d8"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:81261dc398b57bf386695e2da0554090bb986a29310aeb4894ed1d357f10d97b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:fda20553ab1e14a4ec3fc095d2ff286c02abe89f7906eac0c4241368919d93e7"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
            repository_fingerprint: "sha256:94c31799cd950c8495a3c7b52bee114d8ab4eefc1ca668cdcfd9be8baa7fc58a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "GHCR and distribution repositories"
              - "GitHub Actions Publish release workflow"
              - "GitHub Releases"
              - "npm registry"
              - "temporary clean install directory"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/publish.yml"
              - "docs/releases/v0.7.10.md"
              - "package.json"
              - "packages"
              - "scripts/release"
            task_id: "202609200139-9R40KQ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run release:check"
              - "bun run release:smoke:published"
              - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
              - "gh run list --workflow publish.yml --limit 20"
              - "git diff --check"
              - "node scripts/check-release-notes.mjs --tag v0.7.10"
              - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
              - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202609200139-9R40KQ"
              - "npm view @agentplaneorg/core@0.7.10 version"
              - "npm view @agentplaneorg/recipes@0.7.10 version"
              - "npm view agentplane@0.7.10 version"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/releases/v0.7.10.md"
              - "packages/core/src/tasks/task-readme-io.test.ts"
              - "packages/core/src/tasks/task-readme-io.ts"
            evidence_digest: "sha256:12977d2601a2191067eee1c515c4a5e10a9ff6bc35be625ac287cf0158c9d29a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "network_read"
              - "provider_write"
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:74137eb2a3cf77255533136ccf5ec20f5fccd19c29743611cd5b2207895808aa"
            expires_at: null
            external_effects:
              - "create_git_tag_and_github_release"
              - "dispatch_publish_workflow"
              - "publish_distribution_updates"
              - "publish_npm_packages"
              - "read_public_release_state"
            plan_digest: "sha256:54ec9891a815aa1362ccee8f3c94af7a90da9b43bcba4ccaad18b95135b848d8"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:81261dc398b57bf386695e2da0554090bb986a29310aeb4894ed1d357f10d97b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:526b5d96e18895c4864d723656b4ab26b220c2eb0c01c23cc8e7f3f911768a90"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
            repository_fingerprint: "sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "GHCR and distribution repositories"
              - "GitHub Actions Publish release workflow"
              - "GitHub Releases"
              - "npm registry"
              - "temporary clean install directory"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/publish.yml"
              - "docs/releases/v0.7.10.md"
              - "package.json"
              - "packages"
              - "scripts/release"
            task_id: "202609200139-9R40KQ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run release:check"
              - "bun run release:smoke:published"
              - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
              - "gh run list --workflow publish.yml --limit 20"
              - "git diff --check"
              - "node scripts/check-release-notes.mjs --tag v0.7.10"
              - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
              - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202609200139-9R40KQ"
              - "npm view @agentplaneorg/core@0.7.10 version"
              - "npm view @agentplaneorg/recipes@0.7.10 version"
              - "npm view agentplane@0.7.10 version"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
            evidence_digest: "sha256:bd0077dacf99589eb9f3d2e3ef6348909266e97f01c9e0842ceb1ee710431a94"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:94c31799cd950c8495a3c7b52bee114d8ab4eefc1ca668cdcfd9be8baa7fc58a"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "network_read"
              - "provider_write"
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:bbc761cd192a71ee05e7d5ced0302cf154ab158d18f3ee2ade4df6611bca81fd"
            expires_at: null
            external_effects:
              - "create_git_tag_and_github_release"
              - "dispatch_publish_workflow"
              - "publish_distribution_updates"
              - "publish_npm_packages"
              - "read_public_release_state"
            plan_digest: "sha256:cf580aeecaf8af5caf7d29d19bb53621627132c110db172d170f26b20ccb8aa4"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:4aa06c1aa45241fdc672b3fbadf5f01b457de65718b86371e8a316a4f0ef9e70"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "dependencies"
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "GHCR and distribution repositories"
              - "GitHub Actions Publish release workflow"
              - "GitHub Releases"
              - "npm registry"
              - "temporary clean install directory"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/publish.yml"
              - "bun.lock"
              - "docs/releases/v0.7.10.md"
              - "package.json"
              - "packages"
              - "scripts/release"
            task_id: "202609200139-9R40KQ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run release:check"
              - "bun run release:smoke:published"
              - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
              - "gh run list --workflow publish.yml --limit 20"
              - "git diff --check"
              - "node scripts/check-release-notes.mjs --tag v0.7.10"
              - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
              - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202609200139-9R40KQ"
              - "npm view @agentplaneorg/core@0.7.10 version"
              - "npm view @agentplaneorg/recipes@0.7.10 version"
              - "npm view agentplane@0.7.10 version"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:4aa06c1aa45241fdc672b3fbadf5f01b457de65718b86371e8a316a4f0ef9e70"
        digest: "sha256:cf580aeecaf8af5caf7d29d19bb53621627132c110db172d170f26b20ccb8aa4"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:a072122f2e9e69e784c79375781487eb8fac11fb58adac458346576528115d09"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "repository_write"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "source_code"
                - "tests"
                - "dependencies"
                - "release_metadata"
              resources: []
              scope_roots:
                - "bun.lock"
                - "docs/releases/v0.7.10.md"
                - "package.json"
                - "packages"
                - "scripts/release"
                - ".github/workflows/publish.yml"
            expected_outputs:
              - "release-candidate-change"
              - "focused-release-check-evidence"
              - "full-local-ci-evidence"
            id: "finalize-and-qualify-v0.7.10"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:181da34b75abf71907aa9394b55e68d59ce393e75a7c9be856919771d1a91a53"
            depends_on:
              - "finalize-and-qualify-v0.7.10"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects: []
              resources: []
              scope_roots:
                - "bun.lock"
                - "docs/releases/v0.7.10.md"
                - "package.json"
                - "packages"
                - "scripts/release"
                - ".github/workflows/publish.yml"
            expected_outputs:
              - "candidate-evaluation"
            id: "evaluate-v0.7.10-candidate"
            optional: false
            required_inputs:
              - "release-candidate-change"
              - "focused-release-check-evidence"
              - "full-local-ci-evidence"
          -
            contract_digest: "sha256:03a36ee8cadcf1c1222644f7dd1484681879c9184e0d7529ab357d053fde18bc"
            depends_on:
              - "evaluate-v0.7.10-candidate"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "network_read"
                - "provider_write"
                - "run_tests"
                - "report_result"
              external_effects:
                - "dispatch_publish_workflow"
                - "publish_npm_packages"
                - "create_git_tag_and_github_release"
                - "publish_distribution_updates"
                - "read_public_release_state"
              repository_effects: []
              resources:
                - "GitHub Actions Publish release workflow"
                - "npm registry"
                - "GitHub Releases"
                - "GHCR and distribution repositories"
                - "temporary clean install directory"
              scope_roots: []
            expected_outputs:
              - "publish-workflow-evidence"
              - "public-registry-evidence"
              - "github-release-evidence"
              - "distribution-channel-evidence"
              - "clean-install-evidence"
            id: "publish-and-verify-exact-main"
            optional: false
            required_inputs:
              - "candidate-evaluation"
      effects: []
      final_validation: null
      id: "202609200139-9R40KQ"
      intent_digest: "sha256:aead18aa05b04358fbc1b6e831ee1374b11d40aabf64e78b535583aa934bee0a"
      migration_receipts: []
      mutation_receipts:
        capture:202609200139-9R40KQ:
          after_revision: 1
          aggregate_digest: "sha256:dfdf9677ec6b6489d3e52a451a096ceb5c00f8d57966d2db39c0193ce35478d9"
          before_revision: 0
          command_digest: "sha256:36fc969434353dc37ad3cdfe67bf9e3b607b51163719a9f8d83bdc792f2009ec"
          effect_ids: []
          event_digests:
            - "sha256:34eafac9552578e42340d69e2a51c7dff5327beff660a8ea4a376a089a56b5cf"
          mutation_id: "capture:202609200139-9R40KQ"
        kernel_work_item_claim_required:sha256:7f766859200aade66530a78d58dc920bd98b5d5cf998b04e3804624076936ae5:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 5
          aggregate_digest: "sha256:9b766a38fa93b39847ea38aac1e01819f1c6bcf5ceae6ff10f40bdebe38de81c"
          before_revision: 4
          command_digest: "sha256:fd6359820a30d0ee6e41b71e34387fcd7e1942ec1a97764be5456f9cca9e5021"
          effect_ids: []
          event_digests:
            - "sha256:5b90d2b6b62b3920b3bd279f7918aa9ee97fb0b08c1879240d9206f36d634063"
          mutation_id: "kernel_work_item_claim_required:sha256:7f766859200aade66530a78d58dc920bd98b5d5cf998b04e3804624076936ae5:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        kernel_work_item_claim_required:sha256:a18cef21e9b6915ad0a5e7f34e48c153b266cbb268a1e0b5c363b163800a512a:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258:
          after_revision: 22
          aggregate_digest: "sha256:4d3e3ed56be144e02a78bf389245307a19ed40c9e277ab6f075494ae52d87801"
          before_revision: 21
          command_digest: "sha256:fe818a6ea0dbafb08227f6114ce33747c34fa8f28315038868e2519ca1c67cf8"
          effect_ids: []
          event_digests:
            - "sha256:e802920211721cfef1819204d67a8ea698e2d7744b18083d7c3899ff0ba19c98"
          mutation_id: "kernel_work_item_claim_required:sha256:a18cef21e9b6915ad0a5e7f34e48c153b266cbb268a1e0b5c363b163800a512a:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
        kernel_work_item_claim_required:sha256:f3379177c84569f8318400857fe042689fca794ee19b1d7569899aec1204f2be:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7:
          after_revision: 13
          aggregate_digest: "sha256:b7bf2fafa16eb89fdbb23a7f83beef557997fd1b04e6ad566b7729001394b45f"
          before_revision: 12
          command_digest: "sha256:0a084af16104220e2816e227ee5cd326db5c907e67eb493607fc05918d88200a"
          effect_ids: []
          event_digests:
            - "sha256:b8eb99f32e753b7965433c34dbda3c8289a011ec764627263a3d00bc54cc5631"
          mutation_id: "kernel_work_item_claim_required:sha256:f3379177c84569f8318400857fe042689fca794ee19b1d7569899aec1204f2be:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
        kernel_work_item_execution_required:sha256:99b95ea42a1c290bd5f429c54b47cb9e8fa346a13637170d985659e82d05bd82:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7:
          after_revision: 14
          aggregate_digest: "sha256:f6a28566476485bc1fb15a9a42a27d993b7a06fbe63e4da191b2184114496c5d"
          before_revision: 13
          command_digest: "sha256:f361aec47e0e8526af6e13ee3fb0d7aae48f01e029fb8d1d45a1bc345e756853"
          effect_ids: []
          event_digests:
            - "sha256:ecb8128dc6dadb39fcd9e2090e749b3d18a5aa3037cbf7bb85f30c5dcf6543f0"
          mutation_id: "kernel_work_item_execution_required:sha256:99b95ea42a1c290bd5f429c54b47cb9e8fa346a13637170d985659e82d05bd82:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
        kernel_work_item_execution_required:sha256:da82bcce1afbf43486d090e76bb2e24ee336148c5e276180c484d9879f43b0fd:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 6
          aggregate_digest: "sha256:ddf0663b75ef94ed38fbe091534006efcd6f350099b8eaf89b1e1a0b87c98ce2"
          before_revision: 5
          command_digest: "sha256:43f73e91892b2d43f7ca0222da7bd5876f5857fcecf80ef3c6f295d209e92749"
          effect_ids: []
          event_digests:
            - "sha256:7d0ab6dc2da29ee9a301c3769da900086cb231d67150b80bf6461fd7314b38a4"
          mutation_id: "kernel_work_item_execution_required:sha256:da82bcce1afbf43486d090e76bb2e24ee336148c5e276180c484d9879f43b0fd:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        kernel_work_item_execution_required:sha256:dd2ceccda335c77cea630c1b260ce646e7479cc36e3b9aaa040000688b5d5761:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258:
          after_revision: 23
          aggregate_digest: "sha256:276b8d9a628573c46fa61800631ca7c60a2579cf647f7f0ee3b609c52bf495b5"
          before_revision: 22
          command_digest: "sha256:4e3dd803a1e5eafb5fb5ab83f30cc56be39553c2805ace1b418dbb7ecc060410"
          effect_ids: []
          event_digests:
            - "sha256:bd3790dab34be56ab9a9094ca413d992ce55fcc50f29c89feb80772938232200"
          mutation_id: "kernel_work_item_execution_required:sha256:dd2ceccda335c77cea630c1b260ce646e7479cc36e3b9aaa040000688b5d5761:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
        kernel_work_item_materialization_required:sha256:379f2afff90f1abf4e317ec4475965a656f6e7686bbfe12bc977f9e2c3895663:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258:
          after_revision: 21
          aggregate_digest: "sha256:a138d8e3ae9fc8db402e2ea39d117f775b7d4234cb229d535758c2c09038332c"
          before_revision: 20
          command_digest: "sha256:80ae1cc0e70f269beef05dcc746946ca4c5f1980972dcc5fc68a73d13287b50d"
          effect_ids: []
          event_digests:
            - "sha256:849c2f022f9d073b31c4a6fd49c63bd9c31bf96586a08f3c89917b9d73a369aa"
          mutation_id: "kernel_work_item_materialization_required:sha256:379f2afff90f1abf4e317ec4475965a656f6e7686bbfe12bc977f9e2c3895663:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
        kernel_work_item_materialization_required:sha256:71f826c6b379e8eac2aeefd32ca51c454b1429c79c792f0455c8cc77ba72aeab:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7:
          after_revision: 12
          aggregate_digest: "sha256:8ebc81bd97bdb94fe4d44fa786b8b8c0e8e8053f963f5009d085cf9cfb95876c"
          before_revision: 11
          command_digest: "sha256:923fc73c43c49e2bfea20e80698ecc88a5be3afabfa9dc04369dd0e96f565728"
          effect_ids: []
          event_digests:
            - "sha256:8b526e66e35a5290b90be91595d8cb78a53eb10fa1b714d049e9706df9da7595"
          mutation_id: "kernel_work_item_materialization_required:sha256:71f826c6b379e8eac2aeefd32ca51c454b1429c79c792f0455c8cc77ba72aeab:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
        kernel_work_item_materialization_required:sha256:e1caeeb7d4bcf35a6a65c12284e9675f61b1fadae1f35f3ad01302649fb3fa99:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:
          after_revision: 4
          aggregate_digest: "sha256:cc37941897781685568a312985d5f13b98373fa20997d6ecff0c7024ed653570"
          before_revision: 3
          command_digest: "sha256:aada11a597595fe859e03baf5d325a520822cf6d63ec1583db34a344d8fc780b"
          effect_ids: []
          event_digests:
            - "sha256:a1ee477ef003ee49fdd0d3673d9eb4eee7ca9001432fe9856d1ec242885dbc68"
          mutation_id: "kernel_work_item_materialization_required:sha256:e1caeeb7d4bcf35a6a65c12284e9675f61b1fadae1f35f3ad01302649fb3fa99:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        reject:sha256:293a4d939b2e65648b2a2bdab5a7059312ddc19d262f73a20de52e234dcce16c:
          after_revision: 9
          aggregate_digest: "sha256:71a225b3924b787003ea784c6ab80f5180fa6e07c40919f74b9c745da5c1ee20"
          before_revision: 8
          command_digest: "sha256:a0c8f098dfa813e237c102b187deead99e7b5713e6cf457416a9a16c3c3991aa"
          effect_ids: []
          event_digests:
            - "sha256:e29aef18e7d0cd5a673d6901b5e2475a22c15ba5e05c0c26a6452dd113b83703"
          mutation_id: "reject:sha256:293a4d939b2e65648b2a2bdab5a7059312ddc19d262f73a20de52e234dcce16c"
        reject:sha256:fdadb687c8ec655c0d174a2b8795199e258ef110161892c42c32bb2467fe85d0:
          after_revision: 18
          aggregate_digest: "sha256:d2898a0b0279ceb83172e39a565c6fb88fdbe8889976b049f6aded08cf687b73"
          before_revision: 17
          command_digest: "sha256:2c1550d0ab688eebbd5d83695022d6fb0df124f2b9abdfbe040813051ab1c188"
          effect_ids: []
          event_digests:
            - "sha256:9710648eefd9ec0506eab4e580b280bfa1499b97329b6f95db89419cad5666bf"
          mutation_id: "reject:sha256:fdadb687c8ec655c0d174a2b8795199e258ef110161892c42c32bb2467fe85d0"
        result:sha256:76f605504f83c286061b871bcfee62f751c785b3b86f28ee2dd1f624a3c2080a:
          after_revision: 10
          aggregate_digest: "sha256:74732f0b5409635a72b7cce785b0bd59bf34202242d0077a18da641649a2644a"
          before_revision: 9
          command_digest: "sha256:5d81ddeb6666a533d1fc2500f26be8aaffbfd06cd0ffbb8eb4f5150894e65401"
          effect_ids: []
          event_digests:
            - "sha256:00447b51c089fe01c418ff1e3f498b1e48fd3918aa6e7208c6ac42ab8bd7a1ad"
          mutation_id: "result:sha256:76f605504f83c286061b871bcfee62f751c785b3b86f28ee2dd1f624a3c2080a"
        result:sha256:ae6e9a547638e6b92071fc278d160b7a204d789543342c677ed82cba46a33be8:
          after_revision: 19
          aggregate_digest: "sha256:7147a5c9faf5b15f4aafc7984a8e4cd501f073fc6238bdd79002299726644f6f"
          before_revision: 18
          command_digest: "sha256:f0ac458ab661118e7aa11c52e187a26a1fc23afcef98f0bc09062d7cae8f0bf7"
          effect_ids: []
          event_digests:
            - "sha256:4b4801b0337aebe0d1aec8f944c2670ae14e063a7c596f0a534e55c92f31d5ae"
          mutation_id: "result:sha256:ae6e9a547638e6b92071fc278d160b7a204d789543342c677ed82cba46a33be8"
        result:sha256:fc1e02528df976aab01787e04dc10b0e4fd2af90817811b4d7b24a2032ecc9e6:
          after_revision: 2
          aggregate_digest: "sha256:0e7fc5009059ec5be887c173d1618c43710a59171dd8854c42921f87b52af0b2"
          before_revision: 1
          command_digest: "sha256:85089e89f7e6a0c366f52d9a9064db8e6ad4d153e821c37ab9a3d8ba0620b852"
          effect_ids: []
          event_digests:
            - "sha256:ad8a2e1d025662fdd57e598b93dc4ad5e10ef127e1d3964c5cb958941beccc77"
          mutation_id: "result:sha256:fc1e02528df976aab01787e04dc10b0e4fd2af90817811b4d7b24a2032ecc9e6"
        semantic-stop:sha256:1204ce19b7cc30ba8f075336cd7cb1af88a6f372f1d34c26d54eb0cad9604fbe:
          after_revision: 16
          aggregate_digest: "sha256:696dc8eea3f75a63c2a776ed5c713ffbcc558d3bc06f48b14f20894e822c776b"
          before_revision: 15
          command_digest: "sha256:8804e9978954be7802844956d75960c4c24e0a11311833c53e2b773a3fdc5be1"
          effect_ids: []
          event_digests:
            - "sha256:49b8934af44027ca6f8b861d9240cacb6760fe36e5d5df16eaf29d16aeb93306"
          mutation_id: "semantic-stop:sha256:1204ce19b7cc30ba8f075336cd7cb1af88a6f372f1d34c26d54eb0cad9604fbe"
        semantic-stop:sha256:6ab9877ffc370e17ed1a6d818f5b5e37c23325a04429490a7ef44288c9c6670e:
          after_revision: 8
          aggregate_digest: "sha256:0c21662e90b773560a1125e9aebbc27c25521df9e33effd76af977cc1cd2f46f"
          before_revision: 7
          command_digest: "sha256:fd2a4b5bd4a83fec152ba3519138b13197124a2b77f4ddbe382b53eb012eb2e2"
          effect_ids: []
          event_digests:
            - "sha256:37bbee918f77b05f63980ff2b113277c5c0b4ce9a1f4acd04d1990b60d460f59"
          mutation_id: "semantic-stop:sha256:6ab9877ffc370e17ed1a6d818f5b5e37c23325a04429490a7ef44288c9c6670e"
        sha256:405db102ebe0cdfa95ca26a2d8439dc4fad15654d2a417b03020651e90c87826:
          after_revision: 15
          aggregate_digest: "sha256:a6ea9dd6702d23f7a8d81be3f8a9d4cfa31863abb602fd51d1357c0f6aa6e141"
          before_revision: 14
          command_digest: "sha256:777d3d5d4139b222824719b5af643c7e0713b7409ef75d0df188a0d48a797c18"
          effect_ids: []
          event_digests:
            - "sha256:e7935ecfa5957cc9486e24254710dded8660378e0b5a76d78e43382c5622d560"
          mutation_id: "sha256:405db102ebe0cdfa95ca26a2d8439dc4fad15654d2a417b03020651e90c87826"
        sha256:55c41b69aa240a90f5da10fa8b2b6677693b00480c396f77f234a5ac552823bc:
          after_revision: 20
          aggregate_digest: "sha256:1172129a79691b52555abeaa20b3ed908b57604dae3645c395968b1c9b49da87"
          before_revision: 19
          command_digest: "sha256:76fcc607508900ae684e629f447f5c194229188bae57bcc82c9bf569414f1db5"
          effect_ids: []
          event_digests:
            - "sha256:bca37dd727e5708b801a354e2b1de8b75ce78dfb4e53ce6c7f6c06a07df30f51"
          mutation_id: "sha256:55c41b69aa240a90f5da10fa8b2b6677693b00480c396f77f234a5ac552823bc"
        sha256:72984b169018f334ebe6a16524facbcf42dfb2cc0f500f114980f9e9152f36d9:
          after_revision: 3
          aggregate_digest: "sha256:059a8bf2bb08003c4dd9dc33e05de6b0a0c4362d272fd7bad08d4cf3e7d4798f"
          before_revision: 2
          command_digest: "sha256:eb3cce5bde9d020a5c486035eeeeab00a8630cd9f38b7dbb9eff557812f18d61"
          effect_ids: []
          event_digests:
            - "sha256:965da264adf85aea66f763da01506b793999525d2fb7278a7b0df44272e247b3"
          mutation_id: "sha256:72984b169018f334ebe6a16524facbcf42dfb2cc0f500f114980f9e9152f36d9"
        sha256:74844e2f24ed0fdc5b814658c35af67205481dda346edc543e6830c399b2da14:
          after_revision: 7
          aggregate_digest: "sha256:d6d9534ed7f4613d2ed9cd0a1cbc2721d750c0e68fd433c01b52a96a37db921f"
          before_revision: 6
          command_digest: "sha256:a18e71a0cff6f0ec56a9559892365d61d858d3525e83d597f250a57d2fcafd23"
          effect_ids: []
          event_digests:
            - "sha256:152d8408b98246e13d34b8eb8cb58fac62e49720f34058c7ed72c8d51acd0795"
          mutation_id: "sha256:74844e2f24ed0fdc5b814658c35af67205481dda346edc543e6830c399b2da14"
        sha256:a542931307c30b7889c5cdc66d86a6617b74a303d69cd17e5cebd9159afd9a31:
          after_revision: 11
          aggregate_digest: "sha256:e8cbb7471b02c84d4412313bec6d63683cfb6254a578d9d97d96128036970cab"
          before_revision: 10
          command_digest: "sha256:fba94dbd103f34655a93ba030821149426cc5f435c0756eb4f6089f1c9cfeb0d"
          effect_ids: []
          event_digests:
            - "sha256:487d8717ab7f7db5c0e8e56ae511e4d23409147a32ece1177d394671202ecdbe"
          mutation_id: "sha256:a542931307c30b7889c5cdc66d86a6617b74a303d69cd17e5cebd9159afd9a31"
        sha256:cce5834fec7bd1ecb53208d143041a0ce5cd29f16e2d983b71c36f6e133fba02:
          after_revision: 17
          aggregate_digest: "sha256:ea5d87ffc5bbfaa6b6745c6ced57f42fcb590df94c376938bf22597ae9d2d6ec"
          before_revision: 16
          command_digest: "sha256:2eb5521926653258caca7f18ab185abe3c9d7b8e885ce214ac9ff08c0e487aea"
          effect_ids: []
          event_digests:
            - "sha256:73b0dbfd27a144129e6dc02d81f5919599fc9c65ae06de4d033fb4e2fc6106cf"
          mutation_id: "sha256:cce5834fec7bd1ecb53208d143041a0ce5cd29f16e2d983b71c36f6e133fba02"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:417bfd235bd88f8d9ad2abad4c056e74616bf43a1d67f6cf9fabbaea5cb2c1be"
          digest: "sha256:36417191ceb188591ddeb6dc30f2a176693a0a47955355b395734efc5dc2ecf5"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:1bc1b595eee7bf5393fa04fed90e0d3053ca8699b46311f78440bb42c6ff96ac"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "git_read"
                  - "run_tests"
                  - "report_result"
                external_effects: []
                repository_effects: []
                resources: []
                scope_roots:
                  - "package.json"
                  - "packages"
                  - "docs/releases"
                  - "scripts/release"
                  - ".github/workflows/publish.yml"
              expected_outputs:
                - "exact-main-release-readiness"
                - "prepublish-contract-evidence"
              id: "qualify-release-candidate"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:2c2a6b9ece498d39a1901c3efbb055069b7b09a2369c0a5c80789a8e8e4d6359"
              depends_on:
                - "qualify-release-candidate"
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "git_read"
                  - "network_read"
                  - "run_tests"
                  - "report_result"
                external_effects:
                  - "read_github_release_state"
                  - "read_npm_registry_state"
                  - "read_distribution_channel_state"
                repository_effects: []
                resources:
                  - "GitHub Actions Publish release workflow"
                  - "npm registry"
                  - "GitHub Releases"
                  - "temporary clean install directory"
                scope_roots: []
              expected_outputs:
                - "publish-workflow-evidence"
                - "public-registry-evidence"
                - "github-release-evidence"
                - "clean-install-evidence"
              id: "verify-published-release"
              optional: false
              required_inputs:
                - "exact-main-release-readiness"
                - "prepublish-contract-evidence"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:81261dc398b57bf386695e2da0554090bb986a29310aeb4894ed1d357f10d97b"
          digest: "sha256:54ec9891a815aa1362ccee8f3c94af7a90da9b43bcba4ccaad18b95135b848d8"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:976a7184ff49183e55bdfc7641b4940c8160ed96ad33193b9a1405cb25a216b5"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "git_read"
                  - "repository_write"
                  - "run_tests"
                  - "report_result"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "documentation"
                  - "release_metadata"
                resources: []
                scope_roots:
                  - "docs/releases/v0.7.10.md"
                  - "package.json"
                  - "packages"
                  - "scripts/release"
                  - ".github/workflows/publish.yml"
              expected_outputs:
                - "release-metadata-change"
                - "focused-release-check-evidence"
                - "full-local-ci-evidence"
              id: "prepare-and-qualify-v0.7.10"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:a51f752b8820b6350fe6376bb6340069cf278772d156e8b87c2895c770bdd224"
              depends_on:
                - "prepare-and-qualify-v0.7.10"
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "git_read"
                  - "run_tests"
                  - "report_result"
                external_effects: []
                repository_effects: []
                resources: []
                scope_roots:
                  - "docs/releases/v0.7.10.md"
                  - "package.json"
                  - "packages"
                  - "scripts/release"
                  - ".github/workflows/publish.yml"
              expected_outputs:
                - "candidate-evaluation"
              id: "evaluate-v0.7.10-candidate"
              optional: false
              required_inputs:
                - "release-metadata-change"
                - "focused-release-check-evidence"
                - "full-local-ci-evidence"
            -
              contract_digest: "sha256:3b974a235cfe49552f36824af15d2dfee65d71ea8dbe8a1733ef90dab309d27a"
              depends_on:
                - "evaluate-v0.7.10-candidate"
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "git_read"
                  - "network_read"
                  - "provider_write"
                  - "run_tests"
                  - "report_result"
                external_effects:
                  - "dispatch_publish_workflow"
                  - "publish_npm_packages"
                  - "create_git_tag_and_github_release"
                  - "publish_distribution_updates"
                  - "read_public_release_state"
                repository_effects: []
                resources:
                  - "GitHub Actions Publish release workflow"
                  - "npm registry"
                  - "GitHub Releases"
                  - "GHCR and distribution repositories"
                  - "temporary clean install directory"
                scope_roots: []
              expected_outputs:
                - "exact-main-release-readiness"
                - "publish-workflow-evidence"
                - "public-registry-evidence"
                - "github-release-evidence"
                - "distribution-channel-evidence"
                - "clean-install-evidence"
              id: "publish-and-verify-exact-main"
              optional: false
              required_inputs:
                - "candidate-evaluation"
      revision: 23
      schema_version: 1
      state: "ACTIVE"
      work_items:
        evaluate-v0.7.10-candidate:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:181da34b75abf71907aa9394b55e68d59ce393e75a7c9be856919771d1a91a53"
            depends_on:
              - "finalize-and-qualify-v0.7.10"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects: []
              resources: []
              scope_roots:
                - "bun.lock"
                - "docs/releases/v0.7.10.md"
                - "package.json"
                - "packages"
                - "scripts/release"
                - ".github/workflows/publish.yml"
            expected_outputs:
              - "candidate-evaluation"
            id: "evaluate-v0.7.10-candidate"
            optional: false
            required_inputs:
              - "release-candidate-change"
              - "focused-release-check-evidence"
              - "full-local-ci-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        finalize-and-qualify-v0.7.10:
          attempt: 1
          claim_id: "sha256:48713756d6812bd12dd98a8fd19bd65065205b62e870e2124b780acaa15fb5c0"
          definition:
            contract_digest: "sha256:a072122f2e9e69e784c79375781487eb8fac11fb58adac458346576528115d09"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "repository_write"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "source_code"
                - "tests"
                - "dependencies"
                - "release_metadata"
              resources: []
              scope_roots:
                - "bun.lock"
                - "docs/releases/v0.7.10.md"
                - "package.json"
                - "packages"
                - "scripts/release"
                - ".github/workflows/publish.yml"
            expected_outputs:
              - "release-candidate-change"
              - "focused-release-check-evidence"
              - "full-local-ci-evidence"
            id: "finalize-and-qualify-v0.7.10"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
        publish-and-verify-exact-main:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:03a36ee8cadcf1c1222644f7dd1484681879c9184e0d7529ab357d053fde18bc"
            depends_on:
              - "evaluate-v0.7.10-candidate"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "network_read"
                - "provider_write"
                - "run_tests"
                - "report_result"
              external_effects:
                - "dispatch_publish_workflow"
                - "publish_npm_packages"
                - "create_git_tag_and_github_release"
                - "publish_distribution_updates"
                - "read_public_release_state"
              repository_effects: []
              resources:
                - "GitHub Actions Publish release workflow"
                - "npm registry"
                - "GitHub Releases"
                - "GHCR and distribution repositories"
                - "temporary clean install directory"
              scope_roots: []
            expected_outputs:
              - "publish-workflow-evidence"
              - "public-registry-evidence"
              - "github-release-evidence"
              - "distribution-channel-evidence"
              - "clean-install-evidence"
            id: "publish-and-verify-exact-main"
            optional: false
            required_inputs:
              - "candidate-evaluation"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
    digest: "sha256:564e117c70f82e12bc97a9311e2b1d8d23603adfbef846d8f51bb7533b44af97"
    documents:
      contracts:
        sha256:03a36ee8cadcf1c1222644f7dd1484681879c9184e0d7529ab357d053fde18bc:
          acceptance_criteria:
            - "The exact main SHA has successful release-ready Core CI evidence and no duplicate or uncertain v0.7.10 publish effect."
            - "The Publish workflow succeeds for that SHA."
            - "agentplane, @agentplaneorg/core, and @agentplaneorg/recipes 0.7.10 are live with intended stable dist-tags."
            - "Tag v0.7.10 and the GitHub Release resolve to the release SHA with expected assets and checksums."
            - "A clean install reports 0.7.10 and passes runtime smoke."
            - "GHCR and optional distribution results are reported separately."
          objective: "After canonical integration, dispatch publication once for the exact qualified protected-main SHA and verify live release artifacts plus a clean installation."
          role: "EXECUTOR"
          verification_commands:
            - "gh run list --workflow publish.yml --limit 20"
            - "npm view agentplane@0.7.10 version"
            - "npm view @agentplaneorg/core@0.7.10 version"
            - "npm view @agentplaneorg/recipes@0.7.10 version"
            - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
            - "bun run release:smoke:published"
        sha256:181da34b75abf71907aa9394b55e68d59ce393e75a7c9be856919771d1a91a53:
          acceptance_criteria:
            - "Every changed file is required by release metadata or one of the two observed release-blocking controller defects."
            - "Focused tests preserve lock fail-closed behavior and authority lineage integrity."
            - "All declared verification evidence is current and passing."
            - "No obsolete v0.7.1 gate or generated social-image path is required."
          objective: "Independently evaluate the final v0.7.10 diff, focused regression tests, release gates, and full CI evidence before integration."
          role: "EVALUATOR"
          verification_commands:
            - "git diff --check"
            - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
            - "node scripts/check-release-notes.mjs --tag v0.7.10"
            - "bun run release:check"
        sha256:1bc1b595eee7bf5393fa04fed90e0d3053ca8699b46311f78440bb42c6ff96ac:
          acceptance_criteria:
            - "All publishable package versions and internal exact dependencies equal 0.7.10."
            - "docs/releases/v0.7.10.md and the stable release metadata match v0.7.10."
            - "The exact protected-main SHA has successful Core CI release-ready evidence."
            - "The task registry and release incidents gates pass for publication."
            - "No version-specific legacy test gate such as e2e:v0.7.1:gate is introduced or invoked."
          objective: "Prove that the exact protected-main candidate is version 0.7.10, has matching release notes and package metadata, passes release checks, and has a successful release-ready Core CI artifact without changing source or inferring another version."
          role: "EXECUTOR"
          verification_commands:
            - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
            - "node scripts/check-release-notes.mjs --tag v0.7.10"
            - "bun run release:check"
            - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
        sha256:2c2a6b9ece498d39a1901c3efbb055069b7b09a2369c0a5c80789a8e8e4d6359:
          acceptance_criteria:
            - "The Publish release workflow succeeds for the exact qualified SHA and records a publish-result artifact."
            - "agentplane, @agentplaneorg/core, and @agentplaneorg/recipes 0.7.10 are visible on npm with the intended stable dist-tag."
            - "Git tag v0.7.10 and the non-draft, non-prerelease GitHub Release resolve to the exact release SHA and include the expected signed assets and checksums."
            - "A clean temporary install resolves agentplane 0.7.10 and executes its version/runtime smoke successfully."
            - "Distribution-channel results are reported individually; optional channel failure is not hidden and does not fabricate npm or GitHub success."
          objective: "After the explicit operator publish boundary is satisfied for the exact qualified SHA, verify the completed workflow and live public artifacts without repairing or repeating an effect whose outcome is uncertain."
          role: "EXECUTOR"
          verification_commands:
            - "npm view agentplane@0.7.10 version"
            - "npm view @agentplaneorg/core@0.7.10 version"
            - "npm view @agentplaneorg/recipes@0.7.10 version"
            - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
            - "bun run release:smoke:published"
        sha256:3b974a235cfe49552f36824af15d2dfee65d71ea8dbe8a1733ef90dab309d27a:
          acceptance_criteria:
            - "The exact integrated protected-main SHA has successful release-ready Core CI evidence."
            - "No prior in-progress or completed v0.7.10 publication makes a new dispatch duplicate or ambiguous."
            - "The Publish release workflow succeeds for the exact qualified SHA and records its publish result."
            - "agentplane, @agentplaneorg/core, and @agentplaneorg/recipes 0.7.10 are visible on npm with intended stable dist-tags."
            - "Tag v0.7.10 and the non-draft, non-prerelease GitHub Release resolve to the release SHA and expose expected assets and checksums."
            - "A clean install resolves agentplane 0.7.10 and passes version and runtime smoke checks."
            - "GHCR and optional distribution-channel results are reported separately without hiding partial failure."
          objective: "After canonical integration, qualify the exact protected-main SHA, ensure no existing publish effect already owns v0.7.10, dispatch the GitHub Publish release workflow once, and verify live public artifacts plus a clean installed CLI."
          role: "EXECUTOR"
          verification_commands:
            - "gh run list --workflow publish.yml --limit 20"
            - "npm view agentplane@0.7.10 version"
            - "npm view @agentplaneorg/core@0.7.10 version"
            - "npm view @agentplaneorg/recipes@0.7.10 version"
            - "gh release view v0.7.10 --json tagName,isDraft,isPrerelease,publishedAt,url,assets,targetCommitish"
            - "bun run release:smoke:published"
        sha256:976a7184ff49183e55bdfc7641b4940c8160ed96ad33193b9a1405cb25a216b5:
          acceptance_criteria:
            - "docs/releases/v0.7.10.md accurately describes the final 0.7.10 contents and the standard static social image behavior."
            - "All publishable package versions and exact internal dependencies remain 0.7.10."
            - "Version, release-note, release, incident, and task-registry gates pass for v0.7.10."
            - "The canonical full local CI route passes on the prepared candidate."
            - "The final diff contains only required release metadata and preserves the merged social-image cleanup."
          objective: "Finalize the v0.7.10 release notes on the current social-cleanup baseline and prove the candidate with focused release gates and the canonical full local CI route. Do not change the version, restore generated social assets, or add a v0.7.1-labelled gate."
          role: "EXECUTOR"
          verification_commands:
            - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
            - "node scripts/check-release-notes.mjs --tag v0.7.10"
            - "bun run release:check"
            - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202609200139-9R40KQ"
            - "bun run ci:local:full"
        sha256:a072122f2e9e69e784c79375781487eb8fac11fb58adac458346576528115d09:
          acceptance_criteria:
            - "bun.lock workspace package versions align with 0.7.10."
            - "Task README lock records produced by long exact commands remain bounded, readable, and fail closed above the bound."
            - "Authority continuation validates the latest approved authority against the current native ceiling without reapplying an obsolete historical ceiling."
            - "Both controller defects have focused regression coverage."
            - "Release notes accurately describe the final candidate and standard static social image behavior."
            - "All focused release gates and the canonical full local CI route pass."
            - "No v0.7.1-labelled gate or generated social-image pipeline is introduced."
          objective: "Finalize the v0.7.10 release notes and lockfile, retain the bounded long-command lock fix, add regression coverage for latest-authority ceiling validation, and prove the complete candidate without changing its version or restoring generated social assets."
          role: "EXECUTOR"
          verification_commands:
            - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
            - "node scripts/check-release-notes.mjs --tag v0.7.10"
            - "bun run release:check"
            - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202609200139-9R40KQ"
            - "bun run ci:local:full"
        sha256:a51f752b8820b6350fe6376bb6340069cf278772d156e8b87c2895c770bdd224:
          acceptance_criteria:
            - "Every required release claim is supported by repository content or recorded verification."
            - "No obsolete v0.7.1 gate, generated social-image path, or unrelated repository change is required by the candidate."
            - "The focused gates and full local CI evidence are current for the evaluated candidate."
            - "Any failed or missing evidence is reported instead of being inferred."
          objective: "Independently evaluate the prepared v0.7.10 release metadata, verification evidence, test coverage, and diff before canonical integration."
          role: "EVALUATOR"
          verification_commands:
            - "git diff --check"
            - "node scripts/release/check-release-version.mjs --tag v0.7.10 --stable-only"
            - "node scripts/check-release-notes.mjs --tag v0.7.10"
            - "bun run release:check"
            - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202609200139-9R40KQ"
      intent:
        context: "Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect."
        objective: "Publish and verify AgentPlane 0.7.10"
    events:
      -
        command_digest: "sha256:36fc969434353dc37ad3cdfe67bf9e3b607b51163719a9f8d83bdc792f2009ec"
        id: "capture:202609200139-9R40KQ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609200139-9R40KQ"
        occurred_at: "2026-09-20T01:39:13.780Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609200139-9R40KQ"
        task_revision: 1
      -
        command_digest: "sha256:85089e89f7e6a0c366f52d9a9064db8e6ad4d153e821c37ab9a3d8ba0620b852"
        id: "result:sha256:fc1e02528df976aab01787e04dc10b0e4fd2af90817811b4d7b24a2032ecc9e6:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:fc1e02528df976aab01787e04dc10b0e4fd2af90817811b4d7b24a2032ecc9e6"
        occurred_at: "2026-09-20T01:41:08.893Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609200139-9R40KQ"
        task_revision: 2
      -
        command_digest: "sha256:eb3cce5bde9d020a5c486035eeeeab00a8630cd9f38b7dbb9eff557812f18d61"
        id: "sha256:72984b169018f334ebe6a16524facbcf42dfb2cc0f500f114980f9e9152f36d9:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:72984b169018f334ebe6a16524facbcf42dfb2cc0f500f114980f9e9152f36d9"
        occurred_at: "2026-09-20T01:41:21.474Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609200139-9R40KQ"
        task_revision: 3
      -
        command_digest: "sha256:aada11a597595fe859e03baf5d325a520822cf6d63ec1583db34a344d8fc780b"
        id: "kernel_work_item_materialization_required:sha256:e1caeeb7d4bcf35a6a65c12284e9675f61b1fadae1f35f3ad01302649fb3fa99:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e1caeeb7d4bcf35a6a65c12284e9675f61b1fadae1f35f3ad01302649fb3fa99:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:41:25.090Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609200139-9R40KQ"
        task_revision: 4
      -
        command_digest: "sha256:fd6359820a30d0ee6e41b71e34387fcd7e1942ec1a97764be5456f9cca9e5021"
        id: "kernel_work_item_claim_required:sha256:7f766859200aade66530a78d58dc920bd98b5d5cf998b04e3804624076936ae5:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7f766859200aade66530a78d58dc920bd98b5d5cf998b04e3804624076936ae5:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:41:29.393Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609200139-9R40KQ"
        task_revision: 5
      -
        command_digest: "sha256:43f73e91892b2d43f7ca0222da7bd5876f5857fcecf80ef3c6f295d209e92749"
        id: "kernel_work_item_execution_required:sha256:da82bcce1afbf43486d090e76bb2e24ee336148c5e276180c484d9879f43b0fd:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:da82bcce1afbf43486d090e76bb2e24ee336148c5e276180c484d9879f43b0fd:sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
        occurred_at: "2026-09-20T01:42:45.458Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609200139-9R40KQ"
        task_revision: 6
      -
        command_digest: "sha256:a18e71a0cff6f0ec56a9559892365d61d858d3525e83d597f250a57d2fcafd23"
        id: "sha256:74844e2f24ed0fdc5b814658c35af67205481dda346edc543e6830c399b2da14:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:74844e2f24ed0fdc5b814658c35af67205481dda346edc543e6830c399b2da14"
        occurred_at: "2026-09-20T01:46:01.002Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609200139-9R40KQ"
        task_revision: 7
      -
        command_digest: "sha256:fd2a4b5bd4a83fec152ba3519138b13197124a2b77f4ddbe382b53eb012eb2e2"
        id: "semantic-stop:sha256:6ab9877ffc370e17ed1a6d818f5b5e37c23325a04429490a7ef44288c9c6670e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:6ab9877ffc370e17ed1a6d818f5b5e37c23325a04429490a7ef44288c9c6670e"
        occurred_at: "2026-09-20T01:46:04.070Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609200139-9R40KQ"
        task_revision: 8
      -
        command_digest: "sha256:a0c8f098dfa813e237c102b187deead99e7b5713e6cf457416a9a16c3c3991aa"
        id: "reject:sha256:293a4d939b2e65648b2a2bdab5a7059312ddc19d262f73a20de52e234dcce16c:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:293a4d939b2e65648b2a2bdab5a7059312ddc19d262f73a20de52e234dcce16c"
        occurred_at: "2026-09-20T03:33:45.376Z"
        payload_digest: "sha256:210d720fd9db399de9062f585e29a3879d7f09345fd1beb4c471546bf153255a"
        task_id: "202609200139-9R40KQ"
        task_revision: 9
      -
        command_digest: "sha256:5d81ddeb6666a533d1fc2500f26be8aaffbfd06cd0ffbb8eb4f5150894e65401"
        id: "result:sha256:76f605504f83c286061b871bcfee62f751c785b3b86f28ee2dd1f624a3c2080a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:76f605504f83c286061b871bcfee62f751c785b3b86f28ee2dd1f624a3c2080a"
        occurred_at: "2026-09-20T04:55:33.606Z"
        payload_digest: "sha256:a200efd88c358847aed34923407883595221c720840e41bd1412cae4e9432e62"
        task_id: "202609200139-9R40KQ"
        task_revision: 10
      -
        command_digest: "sha256:fba94dbd103f34655a93ba030821149426cc5f435c0756eb4f6089f1c9cfeb0d"
        id: "sha256:a542931307c30b7889c5cdc66d86a6617b74a303d69cd17e5cebd9159afd9a31:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a542931307c30b7889c5cdc66d86a6617b74a303d69cd17e5cebd9159afd9a31"
        occurred_at: "2026-09-20T04:55:45.342Z"
        payload_digest: "sha256:40ea801a3b3d94ae0a4312f5d0eb788c21e80b2b0d9e7c74104b7be5a3c387f9"
        task_id: "202609200139-9R40KQ"
        task_revision: 11
      -
        command_digest: "sha256:923fc73c43c49e2bfea20e80698ecc88a5be3afabfa9dc04369dd0e96f565728"
        id: "kernel_work_item_materialization_required:sha256:71f826c6b379e8eac2aeefd32ca51c454b1429c79c792f0455c8cc77ba72aeab:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:71f826c6b379e8eac2aeefd32ca51c454b1429c79c792f0455c8cc77ba72aeab:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
        occurred_at: "2026-09-20T04:56:08.487Z"
        payload_digest: "sha256:2de36150836e32010d7230d3b5cbfb766f7840f8151bede2763c002bb5ccfff3"
        task_id: "202609200139-9R40KQ"
        task_revision: 12
      -
        command_digest: "sha256:0a084af16104220e2816e227ee5cd326db5c907e67eb493607fc05918d88200a"
        id: "kernel_work_item_claim_required:sha256:f3379177c84569f8318400857fe042689fca794ee19b1d7569899aec1204f2be:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f3379177c84569f8318400857fe042689fca794ee19b1d7569899aec1204f2be:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
        occurred_at: "2026-09-20T04:56:12.387Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609200139-9R40KQ"
        task_revision: 13
      -
        command_digest: "sha256:f361aec47e0e8526af6e13ee3fb0d7aae48f01e029fb8d1d45a1bc345e756853"
        id: "kernel_work_item_execution_required:sha256:99b95ea42a1c290bd5f429c54b47cb9e8fa346a13637170d985659e82d05bd82:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:99b95ea42a1c290bd5f429c54b47cb9e8fa346a13637170d985659e82d05bd82:sha256:f5960c6a4e475a4f8214b068a62a6c10ab0e0595452c54d4789ad485f771a3e7"
        occurred_at: "2026-09-20T04:56:16.351Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609200139-9R40KQ"
        task_revision: 14
      -
        command_digest: "sha256:777d3d5d4139b222824719b5af643c7e0713b7409ef75d0df188a0d48a797c18"
        id: "sha256:405db102ebe0cdfa95ca26a2d8439dc4fad15654d2a417b03020651e90c87826:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:405db102ebe0cdfa95ca26a2d8439dc4fad15654d2a417b03020651e90c87826"
        occurred_at: "2026-09-20T05:13:13.434Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202609200139-9R40KQ"
        task_revision: 15
      -
        command_digest: "sha256:8804e9978954be7802844956d75960c4c24e0a11311833c53e2b773a3fdc5be1"
        id: "semantic-stop:sha256:1204ce19b7cc30ba8f075336cd7cb1af88a6f372f1d34c26d54eb0cad9604fbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:1204ce19b7cc30ba8f075336cd7cb1af88a6f372f1d34c26d54eb0cad9604fbe"
        occurred_at: "2026-09-20T05:13:16.441Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609200139-9R40KQ"
        task_revision: 16
      -
        command_digest: "sha256:2eb5521926653258caca7f18ab185abe3c9d7b8e885ce214ac9ff08c0e487aea"
        id: "sha256:cce5834fec7bd1ecb53208d143041a0ce5cd29f16e2d983b71c36f6e133fba02:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cce5834fec7bd1ecb53208d143041a0ce5cd29f16e2d983b71c36f6e133fba02"
        occurred_at: "2026-09-20T05:17:56.737Z"
        payload_digest: "sha256:7aed4e8983de7c3098093656db0d79cdcb238427d9745771a6217634a5d9c179"
        task_id: "202609200139-9R40KQ"
        task_revision: 17
      -
        command_digest: "sha256:2c1550d0ab688eebbd5d83695022d6fb0df124f2b9abdfbe040813051ab1c188"
        id: "reject:sha256:fdadb687c8ec655c0d174a2b8795199e258ef110161892c42c32bb2467fe85d0:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:fdadb687c8ec655c0d174a2b8795199e258ef110161892c42c32bb2467fe85d0"
        occurred_at: "2026-09-20T05:20:43.656Z"
        payload_digest: "sha256:4ad4126254b92d5abe67adc109b2162746a2f48821540830aea3cc8cedc4bf2c"
        task_id: "202609200139-9R40KQ"
        task_revision: 18
      -
        command_digest: "sha256:f0ac458ab661118e7aa11c52e187a26a1fc23afcef98f0bc09062d7cae8f0bf7"
        id: "result:sha256:ae6e9a547638e6b92071fc278d160b7a204d789543342c677ed82cba46a33be8:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ae6e9a547638e6b92071fc278d160b7a204d789543342c677ed82cba46a33be8"
        occurred_at: "2026-09-20T05:22:02.391Z"
        payload_digest: "sha256:8b2273723f09043e78db604be1df9899c57bc31eef7b3494ebda5b63893267c8"
        task_id: "202609200139-9R40KQ"
        task_revision: 19
      -
        command_digest: "sha256:76fcc607508900ae684e629f447f5c194229188bae57bcc82c9bf569414f1db5"
        id: "sha256:55c41b69aa240a90f5da10fa8b2b6677693b00480c396f77f234a5ac552823bc:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:55c41b69aa240a90f5da10fa8b2b6677693b00480c396f77f234a5ac552823bc"
        occurred_at: "2026-09-20T05:22:14.133Z"
        payload_digest: "sha256:f732d91d0099a835ae963e335cda9be1bcde3c06bea10481ac2c1534f8ec58f1"
        task_id: "202609200139-9R40KQ"
        task_revision: 20
      -
        command_digest: "sha256:80ae1cc0e70f269beef05dcc746946ca4c5f1980972dcc5fc68a73d13287b50d"
        id: "kernel_work_item_materialization_required:sha256:379f2afff90f1abf4e317ec4475965a656f6e7686bbfe12bc977f9e2c3895663:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:379f2afff90f1abf4e317ec4475965a656f6e7686bbfe12bc977f9e2c3895663:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
        occurred_at: "2026-09-20T05:22:17.824Z"
        payload_digest: "sha256:57ce51f93a67dda4cc2bbde92a6a724aa00a738d75da472ef8927fe03c18ffbb"
        task_id: "202609200139-9R40KQ"
        task_revision: 21
      -
        command_digest: "sha256:fe818a6ea0dbafb08227f6114ce33747c34fa8f28315038868e2519ca1c67cf8"
        id: "kernel_work_item_claim_required:sha256:a18cef21e9b6915ad0a5e7f34e48c153b266cbb268a1e0b5c363b163800a512a:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a18cef21e9b6915ad0a5e7f34e48c153b266cbb268a1e0b5c363b163800a512a:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
        occurred_at: "2026-09-20T05:22:21.987Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202609200139-9R40KQ"
        task_revision: 22
      -
        command_digest: "sha256:4e3dd803a1e5eafb5fb5ab83f30cc56be39553c2805ace1b418dbb7ecc060410"
        id: "kernel_work_item_execution_required:sha256:dd2ceccda335c77cea630c1b260ce646e7479cc36e3b9aaa040000688b5d5761:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:dd2ceccda335c77cea630c1b260ce646e7479cc36e3b9aaa040000688b5d5761:sha256:add36ba6e9e1aea5143deb80d279a30076e82c2f0cc9d6b5f394591094d4f258"
        occurred_at: "2026-09-20T05:22:25.156Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609200139-9R40KQ"
        task_revision: 23
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Publish and verify AgentPlane 0.7.10

Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect.

## Scope

- In scope: Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect.
- Out of scope: unrelated refactors not required for "Publish and verify AgentPlane 0.7.10".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Publish and verify AgentPlane 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Publish and verify AgentPlane 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
