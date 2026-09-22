---
id: "202609220351-3KNJQZ"
title: "Remove marketing and recipes Git submodules"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "recipes"
  - "repository-hygiene"
  - "submodules"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "network"
verify:
  - "bun run ci:contract"
  - "bun run ci:local:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T03:55:45.547Z"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
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
    - "effect_external_write"
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:5f13b419848d3a6d8b1f0301e15b922c4537bc3c735c32ce87bf818a4ef23787"
      escalation_reasons:
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-22T03:51:28.004Z"
doc_updated_by: "CODER"
description: "Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog."
sections:
  Summary: |-
    Remove marketing and recipes Git submodules

    Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog.
  Scope: |-
    - In scope: Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog.
    - Out of scope: unrelated refactors not required for "Remove marketing and recipes Git submodules".
  Plan: |-
    1. Execute approved WorkItem external-recipes-source-contract.
    2. Execute approved WorkItem detach-superproject-submodules.
    3. Execute approved WorkItem verify-submodule-free-repository.
  Verify Steps: |-
    PLANNER fallback scaffold for "Remove marketing and recipes Git submodules". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Remove marketing and recipes Git submodules". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "1d6f6cabf7325beec6422f7a69841009b1915475"
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
              - "repository_read"
              - "repository_write"
              - "test_execution"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e864fd583dfdb29cf9767ff59b3d5bd9c358ed431e26c5bca58751c90c6d9eed"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:da5d499041d5fd36f35fe3ddd0c274f72a718c38d6c97a7ec8362a8800b1880e"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:85fd5956165ab263141804d75197aab590571854ef2d21b0bcca3f7de84055d3"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Changed-file diff"
              - "Current AgentPlane main checkout"
              - "Existing framework bootstrap and branch worktree tests"
              - "Repository test and contract suites"
              - "https://github.com/basilisk-labs/agentplane-recipes"
              - "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "."
              - ".github/workflows"
              - ".gitmodules"
              - ".prettierignore"
              - "agentplane-recipes"
              - "docs"
              - "docs/developer"
              - "docs/recipes-inventory.json"
              - "eslint.config.cjs"
              - "marketing"
              - "packages/agentplane/bin"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts"
              - "packages/agentplane/src/commands/branch"
              - "scripts/checks"
              - "scripts/generate"
              - "scripts/lib"
              - "scripts/workflow"
            task_id: "202609220351-3KNJQZ"
            validation_requirements:
              - "bun run ci:contract"
              - "bun run ci:local:fast"
              - "bun run docs:recipes:check"
              - "bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
              - "bunx vitest run packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts"
              - "git diff --check"
              - "git grep -n -I -E 'git submodule|Recipes submodule|marketing/.*submodule|agentplane-recipes.*submodule' -- ':!docs/releases/**' ':!.agentplane/tasks/**' ':!.agentplane/tmp/**'"
              - "git ls-files --stage | awk '$1 == 160000 { print }'"
              - "git status --short --untracked-files=all"
              - "node .agentplane/policy/check-routing.mjs"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:85fd5956165ab263141804d75197aab590571854ef2d21b0bcca3f7de84055d3"
        digest: "sha256:da5d499041d5fd36f35fe3ddd0c274f72a718c38d6c97a7ec8362a8800b1880e"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:a9632613337352d8255ecea60c9f57abd3cfe1c17635c33a509893b707223543"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "network_read"
                - "test_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources:
                - "https://github.com/basilisk-labs/agentplane-recipes"
                - "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json"
              scope_roots:
                - "scripts/generate"
                - "scripts/checks"
                - "packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts"
                - "docs/recipes-inventory.json"
                - "docs/developer"
            expected_outputs:
              - "recipe-source-contract"
              - "recipe-source-tests"
              - "recipe-source-docs"
            id: "external-recipes-source-contract"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:6a073904ee8ff179584e9585cf3b8a7065dc322dd4d4a0d3a5612d4ffba18500"
            depends_on:
              - "external-recipes-source-contract"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "test_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
                - "documentation"
              resources:
                - "Current AgentPlane main checkout"
                - "Existing framework bootstrap and branch worktree tests"
              scope_roots:
                - ".gitmodules"
                - "agentplane-recipes"
                - "marketing"
                - ".github/workflows"
                - ".prettierignore"
                - "eslint.config.cjs"
                - "packages/agentplane/bin"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/branch"
                - "scripts/lib"
                - "scripts/workflow"
                - "docs"
            expected_outputs:
              - "submodule-free-superproject"
              - "updated-bootstrap-and-worktree-contracts"
              - "updated-ci-and-publish-contracts"
              - "updated-repository-documentation"
            id: "detach-superproject-submodules"
            optional: false
            required_inputs:
              - "recipe-source-contract"
          -
            contract_digest: "sha256:2d105029d1fb9f67a819fdf382bff5c62f62ac17c1289bf804c36d472ca3a57a"
            depends_on:
              - "external-recipes-source-contract"
              - "detach-superproject-submodules"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "test_execution"
              external_effects: []
              repository_effects: []
              resources:
                - "Changed-file diff"
                - "Repository test and contract suites"
              scope_roots:
                - "."
            expected_outputs:
              - "submodule-removal-verification"
              - "final-scope-audit"
            id: "verify-submodule-free-repository"
            optional: false
            required_inputs:
              - "recipe-source-contract"
              - "submodule-free-superproject"
              - "updated-bootstrap-and-worktree-contracts"
              - "updated-ci-and-publish-contracts"
              - "updated-repository-documentation"
              - "recipe-source-tests"
              - "recipe-source-docs"
      effects: []
      final_validation: null
      id: "202609220351-3KNJQZ"
      intent_digest: "sha256:ba84851b6cf62c0a0a4c2f69dac0413e389fff813316a3c629b4ac51406fa767"
      migration_receipts: []
      mutation_receipts:
        capture:202609220351-3KNJQZ:
          after_revision: 1
          aggregate_digest: "sha256:a02375c3412eb40764522bb3211de50ca865db0e046f62ed880cd65ea9ecf4b6"
          before_revision: 0
          command_digest: "sha256:27215632bb8dcc42a481c3c413863c1958e617f379d3d68f9e2ccbfc9eab00ef"
          effect_ids: []
          event_digests:
            - "sha256:0efdc66d8ca4d132a92b688238fc8ba90729a78e6d5d8c00d77856aac3276afa"
          mutation_id: "capture:202609220351-3KNJQZ"
        kernel_work_item_claim_required:sha256:eaf3d661364ba9c08cae82d041a2156e75ca0c1074c110a764620b4562a37755:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:
          after_revision: 5
          aggregate_digest: "sha256:5edb330e5345d2cc15acfa1c40efd2548458cb97ba033e10d18e946688fda718"
          before_revision: 4
          command_digest: "sha256:b5a1cee0369229f010fa17d40f77610bb4535717c3a695e6820ea28016b7a519"
          effect_ids: []
          event_digests:
            - "sha256:1cced0b3997f713ffd1815d3ec5f6c2a371409753280f890caaa5b9174e7878e"
          mutation_id: "kernel_work_item_claim_required:sha256:eaf3d661364ba9c08cae82d041a2156e75ca0c1074c110a764620b4562a37755:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:
          after_revision: 6
          aggregate_digest: "sha256:4a7edf6ee6552226ba8b9ea922e651659f4a6c8df7a4b0e267d21aae8ae481e8"
          before_revision: 5
          command_digest: "sha256:cfac28dbcd716af698d90ac01a24e428e3b2db4663fcea3caa18c7567eb8d4d8"
          effect_ids: []
          event_digests:
            - "sha256:a0cc2ea77f622daeabe4091d6564eaaa281c5e459695916831d81ff081f93a52"
          mutation_id: "kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        kernel_work_item_materialization_required:sha256:a04d9d0ab763503036ec64b6f5fc5d27b60d60fdb530b57d5bdefdad08d43530:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:
          after_revision: 4
          aggregate_digest: "sha256:9eb07a42a12a8074f4c1bd3e55621e2a113d611febaecdcb022c4ea519305c84"
          before_revision: 3
          command_digest: "sha256:1b921a55d2642662217aeed560b01428a004e88072f23379f1d44fc007eb8424"
          effect_ids: []
          event_digests:
            - "sha256:26a7b4a6c4d58bce729841361ec066df5684c7fe347a94d7ae246f45ff539cbb"
          mutation_id: "kernel_work_item_materialization_required:sha256:a04d9d0ab763503036ec64b6f5fc5d27b60d60fdb530b57d5bdefdad08d43530:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900:
          after_revision: 2
          aggregate_digest: "sha256:5843c9fc5f0c6ba827506191ae5e6c04ebfde1c5bb5bb5a5861d9a8b06780d42"
          before_revision: 1
          command_digest: "sha256:512e5c61d8c558605d3086539b0380ced43f0965af0272ebc95a253f69db9ccf"
          effect_ids: []
          event_digests:
            - "sha256:93b00333802174c084318eb48c57e186ca003c08a85b3d4d20cb97d989728682"
          mutation_id: "result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900"
        sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731:
          after_revision: 3
          aggregate_digest: "sha256:8e8b0636142f6f62dcd6914d5a39be6dd1ac68f68a0d57163fc7ff3719a4eaa0"
          before_revision: 2
          command_digest: "sha256:7c89396332dfb9031741206842ae566b722ece2ebffaff954c685426c9c319bf"
          effect_ids: []
          event_digests:
            - "sha256:8b24050b0d8b8c19e3443e75beef9875cb37b01c5b15a4785f68fa992544fe6f"
          mutation_id: "sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        detach-superproject-submodules:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:6a073904ee8ff179584e9585cf3b8a7065dc322dd4d4a0d3a5612d4ffba18500"
            depends_on:
              - "external-recipes-source-contract"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "test_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
                - "documentation"
              resources:
                - "Current AgentPlane main checkout"
                - "Existing framework bootstrap and branch worktree tests"
              scope_roots:
                - ".gitmodules"
                - "agentplane-recipes"
                - "marketing"
                - ".github/workflows"
                - ".prettierignore"
                - "eslint.config.cjs"
                - "packages/agentplane/bin"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/branch"
                - "scripts/lib"
                - "scripts/workflow"
                - "docs"
            expected_outputs:
              - "submodule-free-superproject"
              - "updated-bootstrap-and-worktree-contracts"
              - "updated-ci-and-publish-contracts"
              - "updated-repository-documentation"
            id: "detach-superproject-submodules"
            optional: false
            required_inputs:
              - "recipe-source-contract"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        external-recipes-source-contract:
          attempt: 1
          claim_id: "sha256:add812ed91da72afe0bd1d5d35278a3f92c0446dccdee8fe926510f7da5357b6"
          definition:
            contract_digest: "sha256:a9632613337352d8255ecea60c9f57abd3cfe1c17635c33a509893b707223543"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "network_read"
                - "test_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources:
                - "https://github.com/basilisk-labs/agentplane-recipes"
                - "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json"
              scope_roots:
                - "scripts/generate"
                - "scripts/checks"
                - "packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts"
                - "docs/recipes-inventory.json"
                - "docs/developer"
            expected_outputs:
              - "recipe-source-contract"
              - "recipe-source-tests"
              - "recipe-source-docs"
            id: "external-recipes-source-contract"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
        verify-submodule-free-repository:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:2d105029d1fb9f67a819fdf382bff5c62f62ac17c1289bf804c36d472ca3a57a"
            depends_on:
              - "external-recipes-source-contract"
              - "detach-superproject-submodules"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "test_execution"
              external_effects: []
              repository_effects: []
              resources:
                - "Changed-file diff"
                - "Repository test and contract suites"
              scope_roots:
                - "."
            expected_outputs:
              - "submodule-removal-verification"
              - "final-scope-audit"
            id: "verify-submodule-free-repository"
            optional: false
            required_inputs:
              - "recipe-source-contract"
              - "submodule-free-superproject"
              - "updated-bootstrap-and-worktree-contracts"
              - "updated-ci-and-publish-contracts"
              - "updated-repository-documentation"
              - "recipe-source-tests"
              - "recipe-source-docs"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
    digest: "sha256:763ffe8655e7ae6fe368db3186fc299f1e80aeda2ec605cb55479ffacc7747e7"
    documents:
      contracts:
        sha256:2d105029d1fb9f67a819fdf382bff5c62f62ac17c1289bf804c36d472ca3a57a:
          acceptance_criteria:
            - "git ls-files --stage reports no mode 160000 entries."
            - "No active tracked source or documentation instructs users or workflows to initialize either removed submodule."
            - "Focused tests and configured task verification commands pass."
            - "Final diff contains no changes to external repository contents or unrelated historical evidence."
          objective: "Verify the final repository has no active submodule contract and that code, documentation, CI, and release checks remain valid."
          role: "EVALUATOR"
          verification_commands:
            - "git ls-files --stage | awk '$1 == 160000 { print }'"
            - "bun run ci:local:fast"
            - "bun run ci:contract"
            - "git diff --check"
            - "git status --short --untracked-files=all"
        sha256:6a073904ee8ff179584e9585cf3b8a7065dc322dd4d4a0d3a5612d4ffba18500:
          acceptance_criteria:
            - ".gitmodules and both gitlink entries are removed."
            - "Framework bootstrap and branch worktree materialization no longer initialize, require, or symlink agentplane-recipes."
            - "CI and publish workflows contain no submodule initialization or marketing deinitialization workaround."
            - "Ignore rules and current developer documentation no longer describe marketing or recipes as submodules."
            - "Historical release notes and task evidence remain unchanged."
          objective: "Remove marketing and agentplane-recipes from superproject submodule ownership and delete every active assumption that framework bootstrap, worktree materialization, CI, or publish must initialize them."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
            - "node .agentplane/policy/check-routing.mjs"
            - "git grep -n -I -E 'git submodule|Recipes submodule|marketing/.*submodule|agentplane-recipes.*submodule' -- ':!docs/releases/**' ':!.agentplane/tasks/**' ':!.agentplane/tmp/**'"
        sha256:a9632613337352d8255ecea60c9f57abd3cfe1c17635c33a509893b707223543:
          acceptance_criteria:
            - "Inventory generation accepts a documented explicit external recipes checkout or equivalent repository-neutral source and does not search for an agentplane-recipes submodule."
            - "Freshness verification remains deterministic for a supplied source and fails clearly when the source is unavailable or invalid."
            - "Runtime recipe list/add behavior continues to use the signed public catalog rather than a local checkout."
            - "Focused inventory generator tests cover explicit source selection and missing/invalid source errors."
          objective: "Make recipe inventory development and freshness checks consume an explicit external recipe repository source without a superproject gitlink, while preserving signed public catalog runtime behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts"
            - "bun run docs:recipes:check"
      intent:
        context: "Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog."
        objective: "Remove marketing and recipes Git submodules"
    events:
      -
        command_digest: "sha256:27215632bb8dcc42a481c3c413863c1958e617f379d3d68f9e2ccbfc9eab00ef"
        id: "capture:202609220351-3KNJQZ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609220351-3KNJQZ"
        occurred_at: "2026-09-22T03:51:27.970Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609220351-3KNJQZ"
        task_revision: 1
      -
        command_digest: "sha256:512e5c61d8c558605d3086539b0380ced43f0965af0272ebc95a253f69db9ccf"
        id: "result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900"
        occurred_at: "2026-09-22T03:55:17.885Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609220351-3KNJQZ"
        task_revision: 2
      -
        command_digest: "sha256:7c89396332dfb9031741206842ae566b722ece2ebffaff954c685426c9c319bf"
        id: "sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731"
        occurred_at: "2026-09-22T03:55:44.664Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609220351-3KNJQZ"
        task_revision: 3
      -
        command_digest: "sha256:1b921a55d2642662217aeed560b01428a004e88072f23379f1d44fc007eb8424"
        id: "kernel_work_item_materialization_required:sha256:a04d9d0ab763503036ec64b6f5fc5d27b60d60fdb530b57d5bdefdad08d43530:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a04d9d0ab763503036ec64b6f5fc5d27b60d60fdb530b57d5bdefdad08d43530:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        occurred_at: "2026-09-22T03:55:47.771Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609220351-3KNJQZ"
        task_revision: 4
      -
        command_digest: "sha256:b5a1cee0369229f010fa17d40f77610bb4535717c3a695e6820ea28016b7a519"
        id: "kernel_work_item_claim_required:sha256:eaf3d661364ba9c08cae82d041a2156e75ca0c1074c110a764620b4562a37755:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:eaf3d661364ba9c08cae82d041a2156e75ca0c1074c110a764620b4562a37755:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        occurred_at: "2026-09-22T03:55:51.259Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609220351-3KNJQZ"
        task_revision: 5
      -
        command_digest: "sha256:cfac28dbcd716af698d90ac01a24e428e3b2db4663fcea3caa18c7567eb8d4d8"
        id: "kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        occurred_at: "2026-09-22T03:56:06.186Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609220351-3KNJQZ"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Remove marketing and recipes Git submodules

Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog.

## Scope

- In scope: Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog.
- Out of scope: unrelated refactors not required for "Remove marketing and recipes Git submodules".

## Plan

1. Execute approved WorkItem external-recipes-source-contract.
2. Execute approved WorkItem detach-superproject-submodules.
3. Execute approved WorkItem verify-submodule-free-repository.

## Verify Steps

PLANNER fallback scaffold for "Remove marketing and recipes Git submodules". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Remove marketing and recipes Git submodules". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
