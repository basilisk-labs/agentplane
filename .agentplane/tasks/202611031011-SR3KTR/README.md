---
id: "202611031011-SR3KTR"
title: "Preserve GitLab source branches and qualify legacy fast-forward merge guards"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-03T10:38:36.697Z"
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
    - "effect_release_metadata"
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
      - "release_metadata"
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
    writable_roots:
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
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
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:2cf682da6832e6fb3eda03c4824488384fd8b82c84ef4f3ba51334644a038ed7"
      escalation_reasons:
        - "effect_release_metadata"
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
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-11-03T10:11:49.156Z"
doc_updated_by: "CODER"
description: "Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards."
sections:
  Summary: |-
    Preserve GitLab source branches and qualify legacy fast-forward merge guards

    Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards.
  Scope: |-
    - In scope: Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards.
    - Out of scope: unrelated refactors not required for "Preserve GitLab source branches and qualify legacy fast-forward merge guards".
  Plan: "1. Execute approved WorkItem gitlab-preserved-current-base-merge."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:fast packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "f51f0311020fde10b7a6f0971484f8d9e10540e3"
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
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2eeca02af2163725ce870e3b5b7c487615039f2b0f0341d89d97cf60ae60e691"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:506ac26d965d4bb8eb0cf0572dcc4cb757e9862ebeeea007e584d1ed641d05b6"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:49c0c1e0bee34986c8832a529ae0cd5ecb7247eefa0cee8ce00a21c554b00247"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
            task_id: "202611031011-SR3KTR"
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
            digest: "sha256:3d5f6dd28e2c24f31aa5828789c2b58e5f07a8ca8df68116255627d6b230ab95"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:506ac26d965d4bb8eb0cf0572dcc4cb757e9862ebeeea007e584d1ed641d05b6"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49c0c1e0bee34986c8832a529ae0cd5ecb7247eefa0cee8ce00a21c554b00247"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2eeca02af2163725ce870e3b5b7c487615039f2b0f0341d89d97cf60ae60e691"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:dd8f1100802c2c8b5828d6fda6d4252a3217949aac387000d7dcaffa9824ac9e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
            task_id: "202611031011-SR3KTR"
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
            evidence_digest: "sha256:e49050da75326f61dd8b5a54b3837a84188598b7c9fea95ad8d22a96b6544a9f"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:49c0c1e0bee34986c8832a529ae0cd5ecb7247eefa0cee8ce00a21c554b00247"
        digest: "sha256:506ac26d965d4bb8eb0cf0572dcc4cb757e9862ebeeea007e584d1ed641d05b6"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:aef200de25a2d2caba38ad381a87abe442263f1744691fd06544828b8c4aaeb8"
            depends_on: []
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
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
            expected_outputs:
              - "exact-four-source-fix"
              - "gitlab-capability-and-branch-preservation-evidence"
            id: "gitlab-preserved-current-base-merge"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611031011-SR3KTR"
      intent_digest: "sha256:5271d8c85c7a5532026336b1659ae72b797d9fd845e879a22db0f1fa07da95d2"
      migration_receipts: []
      mutation_receipts:
        capture:202611031011-SR3KTR:
          after_revision: 1
          aggregate_digest: "sha256:4232ef33805226d278fda8a321b2a289e053259a6f8c4707d2ff221a4bef599f"
          before_revision: 0
          command_digest: "sha256:44d96072b018dce056da845ba5ff208753ac7938aee16d360825a565dc910f73"
          effect_ids: []
          event_digests:
            - "sha256:b7cef1a94f6ef25725c52d6d857b6383922003cb9def68305c60ae9e961f6a15"
          mutation_id: "capture:202611031011-SR3KTR"
        kernel_work_item_claim_required:sha256:33243a1af98d34d9d4256c57f2d6e148b64b0dafbc0fd8b97c9f21b410593346:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b:
          after_revision: 5
          aggregate_digest: "sha256:ea4d09c04716120902fad221e4c46c674a99557d1d3b61bc7e7467efc7213ad5"
          before_revision: 4
          command_digest: "sha256:7ce5fb519d8d1e770e3db0e4e22367b49d5c23b20493e521bca9f02fbfae2cc0"
          effect_ids: []
          event_digests:
            - "sha256:c4003f22152cf4264c7d50f50abffe745e49d08f917d3bcbc145f99e310ea329"
          mutation_id: "kernel_work_item_claim_required:sha256:33243a1af98d34d9d4256c57f2d6e148b64b0dafbc0fd8b97c9f21b410593346:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b"
        kernel_work_item_execution_required:sha256:7b0d949a105d7c900185cef0614ee9e8afc8fad7f92bb211fc75e7c7265a5309:sha256:dd8f1100802c2c8b5828d6fda6d4252a3217949aac387000d7dcaffa9824ac9e:
          after_revision: 7
          aggregate_digest: "sha256:cf5662dc3d502d46e9f5792660033de60ec25ccfd8cef7bde2c5c973a2f4ae46"
          before_revision: 6
          command_digest: "sha256:40f9eaea3adc6abf1cd16a9b19348df788083766122070412a97550bc6f273da"
          effect_ids: []
          event_digests:
            - "sha256:732373407f7721f89756c8b3e6519991b581fa64c8cb7c919deda904a62cc2cc"
          mutation_id: "kernel_work_item_execution_required:sha256:7b0d949a105d7c900185cef0614ee9e8afc8fad7f92bb211fc75e7c7265a5309:sha256:dd8f1100802c2c8b5828d6fda6d4252a3217949aac387000d7dcaffa9824ac9e"
        kernel_work_item_materialization_required:sha256:79b5fdf7b783d1fc2c1a79b65fad9720b1f1fef85f47d0eb9a9afe2ba4c11e70:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b:
          after_revision: 4
          aggregate_digest: "sha256:7ef2d7d5c4805bb93cd6b972e60c19fd9d1c266b192afbada31dc1bf806e5b02"
          before_revision: 3
          command_digest: "sha256:b81c994dc350cfedde43e772b8181bf41c57f8207f0c2a897a3a5c5de3f6c471"
          effect_ids: []
          event_digests:
            - "sha256:668d83edacb02b83d2beed6085d30e8b0296751eb31d3c42f3296b8ec6822ac9"
          mutation_id: "kernel_work_item_materialization_required:sha256:79b5fdf7b783d1fc2c1a79b65fad9720b1f1fef85f47d0eb9a9afe2ba4c11e70:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b"
        plan:sha256:506ac26d965d4bb8eb0cf0572dcc4cb757e9862ebeeea007e584d1ed641d05b6:
          after_revision: 2
          aggregate_digest: "sha256:2d1c5796b7949bf286bf41c778ab7ec31e55273822eb2fb9496b1902963d367d"
          before_revision: 1
          command_digest: "sha256:dc698fe3b03d529b94f125e6b4fe030f89a4dd87e789e4bbd240272776e8d9ba"
          effect_ids: []
          event_digests:
            - "sha256:539dd4835753b1f562f14b2ac7d88b00670d68d6e6d2ccd3b250a745ee921a6e"
          mutation_id: "plan:sha256:506ac26d965d4bb8eb0cf0572dcc4cb757e9862ebeeea007e584d1ed641d05b6"
        sha256:94b6a21e42e9a7efd8efe44d3b7f7f00f5f4283ffb2c9e36096395aed7a60dc9:
          after_revision: 6
          aggregate_digest: "sha256:861bea1326f636488b04235a7c14f5c2312d643b819a4affb623960e18d6c8df"
          before_revision: 5
          command_digest: "sha256:6a8ae1b46729ecb31d4e5dea5db164342d0a69bf75d414f1a3075c8905c9fc47"
          effect_ids: []
          event_digests:
            - "sha256:9dc691d81a3bfcae86f0ad812c915ac06975bd903785f717d5ffee3586b3b159"
          mutation_id: "sha256:94b6a21e42e9a7efd8efe44d3b7f7f00f5f4283ffb2c9e36096395aed7a60dc9"
        sha256:e7d028f31c5e6ee8debf3ab8bb099dcfca585480ea3a8f92a6d337c1e2dcd901:
          after_revision: 3
          aggregate_digest: "sha256:52a5a2a6343dbbb927db65b1fc6b4c13f562287c8d9f5fdec311af92119d8d91"
          before_revision: 2
          command_digest: "sha256:93bd1ec1f1c042dccdf1fae14bc1636604b1d42dfcb945a8803d3317f08ed356"
          effect_ids: []
          event_digests:
            - "sha256:5162efdced5a62e2d7305b71ef956bce8ae19e13788db410c837f0e1f494dd13"
          mutation_id: "sha256:e7d028f31c5e6ee8debf3ab8bb099dcfca585480ea3a8f92a6d337c1e2dcd901"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        gitlab-preserved-current-base-merge:
          attempt: 1
          claim_id: "sha256:0168b81ebec84d0846e3d6158ada4111693aaba3250217bc5fa725b115fb7f6b"
          definition:
            contract_digest: "sha256:aef200de25a2d2caba38ad381a87abe442263f1744691fd06544828b8c4aaeb8"
            depends_on: []
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
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
            expected_outputs:
              - "exact-four-source-fix"
              - "gitlab-capability-and-branch-preservation-evidence"
            id: "gitlab-preserved-current-base-merge"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:ffb8ec0ab6616eb1afd19a69b759c09d6fa43f7686145c6c33ded9a0643496f0"
    documents:
      contracts:
        sha256:aef200de25a2d2caba38ad381a87abe442263f1744691fd06544828b8c4aaeb8:
          acceptance_criteria:
            - "MR create/update and merge explicitly preserve the source branch, for same-project and fork MR publication. Cleanup remains a separate native authority boundary."
            - "Use only documented automatic_rebase_enabled; explicit false permits only ff projects. Missing field requires successful same-host GitLab version readback of a stable release older than18.0. Enabled, malformed, unavailable, missing-on18+, prerelease or non-version responses reject before PUT. Never trust the fabricated auto_rebase_enabled name as a capability."
            - "Preserve exact SHA/current-base pre-mutation guards and independent provider receipt checks, existing error classification and immutable baselines. Do not modify credentials, policies, timeouts, worker limits, task histories, branches or worktrees."
            - "Run focused provider regression tests and official full local CI; native independent evaluation and canonical GitHub PR/CI/merge are required before selecting the new controller for Factory."
          objective: "Preserve GitLab task source branches during MR create, update and protected merge. Correct the GitLab current-base server capability check to use the documented automatic_rebase_enabled field. On a missing field, accept only authenticated release-version proof that automatic rebase did not exist before GitLab18.0. Preserve the server fast-forward requirement, exact head/current base checks, mandatory CI, authority and all existing rejection gates. Unknown/new versions, malformed or enabled rebase capability fail closed before PUT. Do not modify GitLab project settings in a semantic episode."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:fast packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards."
        objective: "Preserve GitLab source branches and qualify legacy fast-forward merge guards"
        plan_input_digest: "sha256:be79c70cd4769ebfbf6ee9f63bf4c41aba8379eb7e9c65edb1a8d77b70a6743f"
      plan_inputs:
        sha256:be79c70cd4769ebfbf6ee9f63bf4c41aba8379eb7e9c65edb1a8d77b70a6743f:
          assumptions:
            - "The explicit user approval covers the exact four source files and separate provider-setting operations. Provider configuration changes occur only as authorized operator work outside semantic episodes."
            - "The authenticated target GitLab version is16.11.10; the documented automatic-rebase feature starts at18.0. Do not infer an absent capability on newer or unknown releases."
          planning_baseline:
            captured_at: "2026-11-03T10:11:45.519Z"
            config_digest: "sha256:fb0899fd737956619eda625f6e329de0eaeb7222183d670368943aa36abd7bad"
            context_digest: "sha256:eda87003de66f797fc826ba13472bc6ab72c8f0714062113121162e8eb104535"
            digest: "sha256:660619e5d9a1de5c15d720f203fadd06b6e8153ed2228bbf229a1b7a1c1a1e50"
            dirty_paths:
              - ".agentplane/tmp/sb-recovery-20261030/evidence/ap-main-after-xwww-build.log"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/beta-known-hosts"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/environment-v2.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/environment.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/external-test-root.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-admission-plan1-proposal-v2.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-admission-plan1-proposal-v3.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-admission-plan1-proposal.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-advance-01.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-advance-01.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-before-byte-restore.md"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-byte-restore-intent.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-byte-restore-receipt.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-canonical-serializer-roundtrip.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-plan2-proposal-v2.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-plan2-proposal-v3.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/mrj-plan2-proposal.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-auth-metadata-readonly-01.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-auth-metadata-readonly-01.stdout"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-live-status-02.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-live-status-02.txt"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-readonly-snapshot-03.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-readonly-snapshot-03.stdout"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-readonly-snapshot-04.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-readonly-snapshot-04.stdout"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-readonly-snapshot-05.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/sb-readonly-snapshot-05.stdout"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-build-v3.log"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-core-v3.log"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-deep-red.log"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-executor-report-v3.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-integration-run-next-01.txt"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-integration-run-next-02.txt"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-integration-run-next-03.txt"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-native-v3.log"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-pr-open-01.txt"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-pr-publish-01.txt"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-pre-merge-close-01.txt"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-remote-01.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-remote-01.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-resume-01.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-resume-01.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-resume-02.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-resume-02.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-resume-03.json"
              - ".agentplane/tmp/sb-recovery-20261030/evidence/xwww-resume-03.stderr"
              - ".agentplane/tmp/sb-recovery-20261030/new-source-corrected-intake-202610311347-7CPDQV.json"
              - ".agentplane/tmp/sb-recovery-20261030/new-source-intake-202610311338-RWNBCR.json"
              - ".agentplane/tmp/sb-recovery-20261030/new-source-migration-435-proof-202610311338-RWNBCR.json"
              - ".agentplane/tmp/sb-recovery-20261030/toolchain/bun"
              - ".agentplane/tmp/sb-recovery-20261030/toolchain/oven-bun-darwin-aarch64-1.4.2.tgz"
              - ".agentplane/tmp/sb-recovery-npm-cache/_cacache/content-v2/sha512/31/77/5990fd5f79ab6ac59fbf5535d61b50558cce0e1817a1558d90f3c11e523ffb2f450c782188b66c8f61337ec31be5189e85eba244b73b30f86bd059ec276a"
              - ".agentplane/tmp/sb-recovery-npm-cache/_cacache/content-v2/sha512/a5/96/8a3b922d9a2c726385e84f838b72eccb407ef395a040d40b29269ac917108c0ee4c00043aa9ec1a9928e82e27289299f6cdfd5e00016c4ff2bd9f2c70bb0"
              - ".agentplane/tmp/sb-recovery-npm-cache/_cacache/content-v2/sha512/fd/76/abfa5270bf383d15ef9a8a8a56b002f95d03dea3e94c41ade075cb59bd12b017af9964e96378e73a19a16946c6f242249d6c93c54585763930b1412da3f1"
              - ".agentplane/tmp/sb-recovery-npm-cache/_cacache/index-v5/17/6f/ebac202e7ee7532cc3851d2bbfe96cc358cd46ec24699073bbb07aac6704"
              - ".agentplane/tmp/sb-recovery-npm-cache/_cacache/index-v5/21/d2/93d69962af8fd37bb852a1b6fc09804dd46923770ef11c6f245ae48fb905"
              - ".agentplane/tmp/sb-recovery-npm-cache/_logs/2026-10-30T11_47_52_556Z-debug-0.log"
              - ".agentplane/tmp/sb-recovery-npm-cache/_logs/2026-10-30T11_48_48_847Z-debug-0.log"
              - ".agentplane/tmp/sb-recovery-npm-cache/_update-notifier-last-checked"
            git:
              kind: "commit"
              ref: null
              sha: "f51f0311020fde10b7a6f0971484f8d9e10540e3"
            policy_digest: null
            schema_version: 1
            task_history_cursor: null
          schema_version: 1
          task_id: "202611031011-SR3KTR"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run test:fast packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
                id: "focused-provider-regression"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                id: "independent-semantic-review"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-provider-regression"
                  - "independent-semantic-review"
                description: "MR create/update and merge explicitly preserve the source branch, for same-project and fork MR publication. Cleanup remains a separate native authority boundary."
                id: "source-branches-preserved"
                required: true
              -
                check_ids:
                  - "focused-provider-regression"
                  - "independent-semantic-review"
                description: "Use only documented automatic_rebase_enabled; explicit false permits only ff projects. Missing field requires successful same-host GitLab version readback of a stable release older than18.0. Enabled, malformed, unavailable, missing-on18+, prerelease or non-version responses reject before PUT. Never trust the fabricated auto_rebase_enabled name as a capability."
                id: "real-server-capability"
                required: true
              -
                check_ids:
                  - "focused-provider-regression"
                  - "full-local-ci"
                  - "independent-semantic-review"
                description: "Preserve exact SHA/current-base pre-mutation guards and independent provider receipt checks, existing error classification and immutable baselines. Do not modify credentials, policies, timeouts, worker limits, task histories, branches or worktrees."
                id: "existing-guards-preserved"
                required: true
              -
                check_ids:
                  - "focused-provider-regression"
                  - "full-local-ci"
                  - "independent-semantic-review"
                description: "Focused provider tests and official full local CI pass. Return complete source/scope/failure-handling evidence for native independent EVALUATOR. Canonical AP PR/merge/main CI remain subsequent operator gates before selecting the controller for Factory; do not claim them from this semantic episode."
                id: "qualified-review-evidence"
                required: true
            evidence_fingerprint: "sha256:660619e5d9a1de5c15d720f203fadd06b6e8153ed2228bbf229a1b7a1c1a1e50"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-provider-regression"
                      - "independent-semantic-review"
                    description: "MR create/update and merge explicitly preserve the source branch, for same-project and fork MR publication. Cleanup remains a separate native authority boundary."
                    id: "source-branches-preserved"
                    required: true
                  -
                    check_ids:
                      - "focused-provider-regression"
                      - "independent-semantic-review"
                    description: "Use only documented automatic_rebase_enabled; explicit false permits only ff projects. Missing field requires successful same-host GitLab version readback of a stable release older than18.0. Enabled, malformed, unavailable, missing-on18+, prerelease or non-version responses reject before PUT. Never trust the fabricated auto_rebase_enabled name as a capability."
                    id: "real-server-capability"
                    required: true
                  -
                    check_ids:
                      - "focused-provider-regression"
                      - "full-local-ci"
                      - "independent-semantic-review"
                    description: "Preserve exact SHA/current-base pre-mutation guards and independent provider receipt checks, existing error classification and immutable baselines. Do not modify credentials, policies, timeouts, worker limits, task histories, branches or worktrees."
                    id: "existing-guards-preserved"
                    required: true
                  -
                    check_ids:
                      - "focused-provider-regression"
                      - "full-local-ci"
                      - "independent-semantic-review"
                    description: "Focused provider tests and official full local CI pass. Return complete source/scope/failure-handling evidence for native independent EVALUATOR. Canonical AP PR/merge/main CI remain subsequent operator gates before selecting the controller for Factory; do not claim them from this semantic episode."
                    id: "qualified-review-evidence"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 65536
                  optional_sources:
                    - "packages/agentplane/src/commands/pr/adoption-merge.ts"
                    - "packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                    - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                    - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                    - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
                  symbol_hints:
                    - "runProtectedBaseGitLabMerge"
                    - "tryCreateGitLabMr"
                    - "tryUpdateGitLabMr"
                depends_on: []
                expected_outputs:
                  - "exact-four-source-fix"
                  - "gitlab-capability-and-branch-preservation-evidence"
                id: "gitlab-preserved-current-base-merge"
                objective: "Preserve GitLab task source branches during MR create, update and protected merge. Correct the GitLab current-base server capability check to use the documented automatic_rebase_enabled field. On a missing field, accept only authenticated release-version proof that automatic rebase did not exist before GitLab18.0. Preserve the server fast-forward requirement, exact head/current base checks, mandatory CI, authority and all existing rejection gates. Unknown/new versions, malformed or enabled rebase capability fail closed before PUT. Do not modify GitLab project settings in a semantic episode."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims: []
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:fast packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts"
                      id: "focused-provider-regression"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "independent-semantic-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-provider-regression"
                        - "independent-semantic-review"
                      description: "MR create/update and merge explicitly preserve the source branch, for same-project and fork MR publication. Cleanup remains a separate native authority boundary."
                      id: "source-branches-preserved"
                      required: true
                    -
                      check_ids:
                        - "focused-provider-regression"
                        - "independent-semantic-review"
                      description: "Use only documented automatic_rebase_enabled; explicit false permits only ff projects. Missing field requires successful same-host GitLab version readback of a stable release older than18.0. Enabled, malformed, unavailable, missing-on18+, prerelease or non-version responses reject before PUT. Never trust the fabricated auto_rebase_enabled name as a capability."
                      id: "real-server-capability"
                      required: true
                    -
                      check_ids:
                        - "focused-provider-regression"
                        - "full-local-ci"
                        - "independent-semantic-review"
                      description: "Preserve exact SHA/current-base pre-mutation guards and independent provider receipt checks, existing error classification and immutable baselines. Do not modify credentials, policies, timeouts, worker limits, task histories, branches or worktrees."
                      id: "existing-guards-preserved"
                      required: true
                    -
                      check_ids:
                        - "focused-provider-regression"
                        - "full-local-ci"
                        - "independent-semantic-review"
                      description: "Focused provider tests and official full local CI pass. Return complete source/scope/failure-handling evidence for native independent EVALUATOR. Canonical AP PR/merge/main CI remain subsequent operator gates before selecting the controller for Factory; do not claim them from this semantic episode."
                      id: "qualified-review-evidence"
                      required: true
                  evidence_fingerprint: "sha256:660619e5d9a1de5c15d720f203fadd06b6e8153ed2228bbf229a1b7a1c1a1e50"
                  schema_version: 1
    events:
      -
        command_digest: "sha256:44d96072b018dce056da845ba5ff208753ac7938aee16d360825a565dc910f73"
        id: "capture:202611031011-SR3KTR:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611031011-SR3KTR"
        occurred_at: "2026-11-03T10:11:49.119Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611031011-SR3KTR"
        task_revision: 1
      -
        command_digest: "sha256:dc698fe3b03d529b94f125e6b4fe030f89a4dd87e789e4bbd240272776e8d9ba"
        id: "plan:sha256:506ac26d965d4bb8eb0cf0572dcc4cb757e9862ebeeea007e584d1ed641d05b6:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:506ac26d965d4bb8eb0cf0572dcc4cb757e9862ebeeea007e584d1ed641d05b6"
        occurred_at: "2026-11-03T10:35:26.836Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611031011-SR3KTR"
        task_revision: 2
      -
        command_digest: "sha256:93bd1ec1f1c042dccdf1fae14bc1636604b1d42dfcb945a8803d3317f08ed356"
        id: "sha256:e7d028f31c5e6ee8debf3ab8bb099dcfca585480ea3a8f92a6d337c1e2dcd901:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:e7d028f31c5e6ee8debf3ab8bb099dcfca585480ea3a8f92a6d337c1e2dcd901"
        occurred_at: "2026-11-03T10:38:32.699Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611031011-SR3KTR"
        task_revision: 3
      -
        command_digest: "sha256:b81c994dc350cfedde43e772b8181bf41c57f8207f0c2a897a3a5c5de3f6c471"
        id: "kernel_work_item_materialization_required:sha256:79b5fdf7b783d1fc2c1a79b65fad9720b1f1fef85f47d0eb9a9afe2ba4c11e70:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:79b5fdf7b783d1fc2c1a79b65fad9720b1f1fef85f47d0eb9a9afe2ba4c11e70:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b"
        occurred_at: "2026-11-03T10:38:56.974Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611031011-SR3KTR"
        task_revision: 4
      -
        command_digest: "sha256:7ce5fb519d8d1e770e3db0e4e22367b49d5c23b20493e521bca9f02fbfae2cc0"
        id: "kernel_work_item_claim_required:sha256:33243a1af98d34d9d4256c57f2d6e148b64b0dafbc0fd8b97c9f21b410593346:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:33243a1af98d34d9d4256c57f2d6e148b64b0dafbc0fd8b97c9f21b410593346:sha256:a8bbfa674c44b62f3e0c3c04fd210a11a21f2cb138cce5583262907b542c4a0b"
        occurred_at: "2026-11-03T10:39:18.675Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611031011-SR3KTR"
        task_revision: 5
      -
        command_digest: "sha256:6a8ae1b46729ecb31d4e5dea5db164342d0a69bf75d414f1a3075c8905c9fc47"
        id: "sha256:94b6a21e42e9a7efd8efe44d3b7f7f00f5f4283ffb2c9e36096395aed7a60dc9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:94b6a21e42e9a7efd8efe44d3b7f7f00f5f4283ffb2c9e36096395aed7a60dc9"
        occurred_at: "2026-11-03T10:41:58.136Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611031011-SR3KTR"
        task_revision: 6
      -
        command_digest: "sha256:40f9eaea3adc6abf1cd16a9b19348df788083766122070412a97550bc6f273da"
        id: "kernel_work_item_execution_required:sha256:7b0d949a105d7c900185cef0614ee9e8afc8fad7f92bb211fc75e7c7265a5309:sha256:dd8f1100802c2c8b5828d6fda6d4252a3217949aac387000d7dcaffa9824ac9e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7b0d949a105d7c900185cef0614ee9e8afc8fad7f92bb211fc75e7c7265a5309:sha256:dd8f1100802c2c8b5828d6fda6d4252a3217949aac387000d7dcaffa9824ac9e"
        occurred_at: "2026-11-03T10:42:07.811Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611031011-SR3KTR"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve GitLab source branches and qualify legacy fast-forward merge guards

Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards.

## Scope

- In scope: Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards.
- Out of scope: unrelated refactors not required for "Preserve GitLab source branches and qualify legacy fast-forward merge guards".

## Plan

1. Execute approved WorkItem gitlab-preserved-current-base-merge.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:fast packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-gitlab-frozen-base.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
