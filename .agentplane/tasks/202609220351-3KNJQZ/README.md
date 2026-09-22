---
id: "202609220351-3KNJQZ"
title: "Remove marketing and recipes Git submodules"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
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
        -
          approval_mode: null
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
            digest: "sha256:e27ee73972c2da9bc0fd08c86f00da8bacf317f0e85592da49a92793156e7aba"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:da5d499041d5fd36f35fe3ddd0c274f72a718c38d6c97a7ec8362a8800b1880e"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:85fd5956165ab263141804d75197aab590571854ef2d21b0bcca3f7de84055d3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e864fd583dfdb29cf9767ff59b3d5bd9c358ed431e26c5bca58751c90c6d9eed"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
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
          observation:
            changed_paths:
              - "docs/developer/recipes-development.mdx"
              - "docs/recipes-inventory.json"
              - "packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts"
              - "scripts/checks/check-recipes-inventory-fresh.mjs"
              - "scripts/generate/generate-recipes-inventory.mjs"
            evidence_digest: "sha256:db0dbfcc51ae7a4040947d115852efde830b98c284b0f70285e18bd601a312b0"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        -
          approval_mode: null
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
            digest: "sha256:a2b6faed2c542b06e73e3fb1779f1672b734f6005a8ec408ef35860607095eb1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:da5d499041d5fd36f35fe3ddd0c274f72a718c38d6c97a7ec8362a8800b1880e"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:85fd5956165ab263141804d75197aab590571854ef2d21b0bcca3f7de84055d3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e27ee73972c2da9bc0fd08c86f00da8bacf317f0e85592da49a92793156e7aba"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
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
          observation:
            changed_paths:
              - "docs/developer/recipes-development.mdx"
              - "scripts/checks/check-recipes-inventory-fresh.mjs"
              - "scripts/generate/generate-recipes-inventory.mjs"
            evidence_digest: "sha256:931b7fbae4be4046c6957836ef220aa5d0f9c25b2957c879dd236d06fa2cea6a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
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
        kernel_work_item_execution_required:sha256:444d0f2077beca182eb24adc2c80f19470172e1720d80ff43c44ad7bd568e50e:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:
          after_revision: 20
          aggregate_digest: "sha256:49ffca7c6adf6a9a518f78691e9fd50e849e30597eaa619c2fbc46b7f79d5093"
          before_revision: 19
          command_digest: "sha256:540e063e2d6e406d9147fd177f083b2936cda3cfd45a181a717dcca86f1f5ab4"
          effect_ids: []
          event_digests:
            - "sha256:67270f849026f1423e7bcf3951186bb8ed90157c04c8558d03742aeee17d3645"
          mutation_id: "kernel_work_item_execution_required:sha256:444d0f2077beca182eb24adc2c80f19470172e1720d80ff43c44ad7bd568e50e:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:
          after_revision: 6
          aggregate_digest: "sha256:4a7edf6ee6552226ba8b9ea922e651659f4a6c8df7a4b0e267d21aae8ae481e8"
          before_revision: 5
          command_digest: "sha256:cfac28dbcd716af698d90ac01a24e428e3b2db4663fcea3caa18c7567eb8d4d8"
          effect_ids: []
          event_digests:
            - "sha256:a0cc2ea77f622daeabe4091d6564eaaa281c5e459695916831d81ff081f93a52"
          mutation_id: "kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        kernel_work_item_execution_required:sha256:f2e0b59a5ab0b36a8171f6e7f6a11a15c1303b66dd1deccf7c9daf31fb88f124:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964:
          after_revision: 13
          aggregate_digest: "sha256:12eee32056a7445ac3bacd7da38a2e5ec6a0446b4707f1b2762250df403b4e10"
          before_revision: 12
          command_digest: "sha256:6e0f17754f017c82b80785fa32f5409eb177bc5379f5d1eccf3e0083e16381aa"
          effect_ids: []
          event_digests:
            - "sha256:9e60931adb9a95e84ead5a07b6201d02b54286b57256f281b9b21cff85fbf99a"
          mutation_id: "kernel_work_item_execution_required:sha256:f2e0b59a5ab0b36a8171f6e7f6a11a15c1303b66dd1deccf7c9daf31fb88f124:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
        kernel_work_item_inspection_required:sha256:666f3dfa22d11e54bb8486c94fccb3125b26986761ec89bcb528d99e4960d5ba:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964:
          after_revision: 9
          aggregate_digest: "sha256:a8bb6101dc7b17bc467d2d25513734bae2820c07e9520f7ec203fb54df56da35"
          before_revision: 8
          command_digest: "sha256:5c671044e05cbe52b2a35cea84816b309888e531df289e92a9a3487cb20c5fa1"
          effect_ids: []
          event_digests:
            - "sha256:d829137906b0d6aeffcc2a2543ebdd54e6102f6799b37524c3e4a8802bed4e8a"
          mutation_id: "kernel_work_item_inspection_required:sha256:666f3dfa22d11e54bb8486c94fccb3125b26986761ec89bcb528d99e4960d5ba:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
        kernel_work_item_inspection_required:sha256:a5d726410d7c8d69f21e7d71e0bd6e215afbe596794c6fae480b61a1654bf751:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:
          after_revision: 16
          aggregate_digest: "sha256:7cd1aff230e39e4dc616f2a0328b3bb0381d4eecc2751b25b5c1f862b75ec198"
          before_revision: 15
          command_digest: "sha256:16cec60e4a6b6dccb743cd05cc60661f7a2070c904560048fa8039a4adb7be5b"
          effect_ids: []
          event_digests:
            - "sha256:de4f2015a8a843c5b155601756318d3bec461cfaa22f20b2fb123866250f31af"
          mutation_id: "kernel_work_item_inspection_required:sha256:a5d726410d7c8d69f21e7d71e0bd6e215afbe596794c6fae480b61a1654bf751:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        kernel_work_item_materialization_required:sha256:a04d9d0ab763503036ec64b6f5fc5d27b60d60fdb530b57d5bdefdad08d43530:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:
          after_revision: 4
          aggregate_digest: "sha256:9eb07a42a12a8074f4c1bd3e55621e2a113d611febaecdcb022c4ea519305c84"
          before_revision: 3
          command_digest: "sha256:1b921a55d2642662217aeed560b01428a004e88072f23379f1d44fc007eb8424"
          effect_ids: []
          event_digests:
            - "sha256:26a7b4a6c4d58bce729841361ec066df5684c7fe347a94d7ae246f45ff539cbb"
          mutation_id: "kernel_work_item_materialization_required:sha256:a04d9d0ab763503036ec64b6f5fc5d27b60d60fdb530b57d5bdefdad08d43530:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        kernel_work_item_rework_claim_required:sha256:373872e4725e6714516230e1dfd0ebee3be3b148069a95f4ea63c26abfe82506:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964:
          after_revision: 12
          aggregate_digest: "sha256:9dadfe9585bbab0a0a62a7eb5a870da32f516659c3937a2ae0ecef6625e26356"
          before_revision: 11
          command_digest: "sha256:e2ffdb6031c33f2bb02a287ef4ddb17774c8b330c32a711ced4d593b8736997a"
          effect_ids: []
          event_digests:
            - "sha256:f3c4b36f68b185133f95be876375498f74906ebae4dd785aaa862f1b012145ef"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:373872e4725e6714516230e1dfd0ebee3be3b148069a95f4ea63c26abfe82506:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
        kernel_work_item_rework_claim_required:sha256:d9f8f301cbc51204ca3d894fa1b1b32e304f97bd0606382290d81ab4770d42aa:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:
          after_revision: 19
          aggregate_digest: "sha256:632c253acd090a62273e7700f7facbc3c561aee1d312f7a17e7e89a40abbd3c1"
          before_revision: 18
          command_digest: "sha256:39f96e1f3b5920cb56b43f8b11ac15c65c620db65e44ff57e45e7ac89e8de25b"
          effect_ids: []
          event_digests:
            - "sha256:3eb187a7c31e54194a94d70f1ef08ac678818f78494174d471e2f4c57428880c"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:d9f8f301cbc51204ca3d894fa1b1b32e304f97bd0606382290d81ab4770d42aa:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900:
          after_revision: 2
          aggregate_digest: "sha256:5843c9fc5f0c6ba827506191ae5e6c04ebfde1c5bb5bb5a5861d9a8b06780d42"
          before_revision: 1
          command_digest: "sha256:512e5c61d8c558605d3086539b0380ced43f0965af0272ebc95a253f69db9ccf"
          effect_ids: []
          event_digests:
            - "sha256:93b00333802174c084318eb48c57e186ca003c08a85b3d4d20cb97d989728682"
          mutation_id: "result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900"
        result:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7:
          after_revision: 15
          aggregate_digest: "sha256:212578ea49c6f25be5c0f8ae996242b13dff4c4a1851dc323d969f9b27807a61"
          before_revision: 14
          command_digest: "sha256:ec36bb3f430226668d04a11191410157d392f65ccd97710bb1a8edafed902e1c"
          effect_ids: []
          event_digests:
            - "sha256:750bf411bd6fd3af9aa270a99b1ed8382044d07e5d282c2a36f0bcc49159298c"
          mutation_id: "result:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7"
        result:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0:
          after_revision: 8
          aggregate_digest: "sha256:d882e085b960ea7f8ee58eb9e8737a2d61c692b7e0ab8c860904dce1ac47aedf"
          before_revision: 7
          command_digest: "sha256:b03f126c27a43923c0e6086dc9c3b06d1e8bfb6bb5894279a00bfda4985c52cb"
          effect_ids: []
          event_digests:
            - "sha256:6b4418cb98b8efebbcf29412b8d0e1bf90d9a436a34f5cb2edea86604731d16b"
          mutation_id: "result:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0"
        sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731:
          after_revision: 3
          aggregate_digest: "sha256:8e8b0636142f6f62dcd6914d5a39be6dd1ac68f68a0d57163fc7ff3719a4eaa0"
          before_revision: 2
          command_digest: "sha256:7c89396332dfb9031741206842ae566b722ece2ebffaff954c685426c9c319bf"
          effect_ids: []
          event_digests:
            - "sha256:8b24050b0d8b8c19e3443e75beef9875cb37b01c5b15a4785f68fa992544fe6f"
          mutation_id: "sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731"
        sha256:3e8300ccace2e3728b8f187363c08d5df5d9358176a34f0a2e66c25079d3860a:
          after_revision: 7
          aggregate_digest: "sha256:d9aefa3658c0757b9d1c0fd24eece8d277ac76d341cebfc09237f1f397880afb"
          before_revision: 6
          command_digest: "sha256:e5edc6b994b66986202064e32c1671d9b0cae2a4964db37b70c9d8e5b20cf453"
          effect_ids: []
          event_digests:
            - "sha256:bfc46dee4054f9dd00bfe2fe7d2623f3aebd7d7797ca463ee46fd261b079d038"
          mutation_id: "sha256:3e8300ccace2e3728b8f187363c08d5df5d9358176a34f0a2e66c25079d3860a"
        sha256:48b03e93f4ad4afa23d637c7fd1a8d4ab9de911bb8246b7f3ed20827448648f1:
          after_revision: 14
          aggregate_digest: "sha256:41bef3bcffbab44ad97f9e73368c4c502d92ce34f512f64ad6e64a0b47b64423"
          before_revision: 13
          command_digest: "sha256:4d10ac4ea3827a57ec8d5353c96e1f6c7468789622b393a7c44594743913ef67"
          effect_ids: []
          event_digests:
            - "sha256:045ace91a565fa55b8a114f8371bdded9d42cf96245babc242956bb34c7bafc7"
          mutation_id: "sha256:48b03e93f4ad4afa23d637c7fd1a8d4ab9de911bb8246b7f3ed20827448648f1"
        validation-resolution:sha256:935098ed00ec3191844ef6f15c2be7fe2db5109f6c81f1e92f3a3ccce21fa273:
          after_revision: 11
          aggregate_digest: "sha256:a22af2a00a793230f6f719ea10703897ad8951a47b2053aff6bab73aed613015"
          before_revision: 10
          command_digest: "sha256:dcfba5a9c41ca913cbc6fc3c525a20165ba1dae7282c36f5da8cfd7cb14cb9a4"
          effect_ids: []
          event_digests:
            - "sha256:6e7f09fc363357e96f885502da7033406dc7e26eb386d404369b6c3717bebce6"
          mutation_id: "validation-resolution:sha256:935098ed00ec3191844ef6f15c2be7fe2db5109f6c81f1e92f3a3ccce21fa273"
        validation-resolution:sha256:d555367cec2122b70d80facb62a3d69e21b2e7459b7654fea7f36bf723ec94b1:
          after_revision: 18
          aggregate_digest: "sha256:f0ef3840f221b0d42e7be0b717f2e25647bda6eb94ad6edda1375a3bcd93949c"
          before_revision: 17
          command_digest: "sha256:af470ed5fde124606ddd4942b52e62faaefecbc9660abeb9eaf90ef16558ab11"
          effect_ids: []
          event_digests:
            - "sha256:5580406e814c921e916c1dca1bcf3a12daed56fc02dca9eee60800981a3d73dd"
          mutation_id: "validation-resolution:sha256:d555367cec2122b70d80facb62a3d69e21b2e7459b7654fea7f36bf723ec94b1"
        validation:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7:
          after_revision: 17
          aggregate_digest: "sha256:417ece9fb995589338f571947b215c657204c1efbb51bedb72add193c73b9a6d"
          before_revision: 16
          command_digest: "sha256:97daffc30d60f7a583d0d7dc8d597bcafc1ced6fcdef30c4ae1a4ae49f4fdaa0"
          effect_ids: []
          event_digests:
            - "sha256:31c80b7b362cdf02d94194d380a551b6f7f837bca9168f959935c94602d72852"
          mutation_id: "validation:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7"
        validation:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0:
          after_revision: 10
          aggregate_digest: "sha256:02d8e2fa91c298fe0254c3b9a6ba22e9f0a6035c1fe2f89429cac38ba9b18fd3"
          before_revision: 9
          command_digest: "sha256:13d857149b288e13436c93ca645011727703a7ea36384075056681fc7f04f099"
          effect_ids: []
          event_digests:
            - "sha256:648eac5f3e610abdd81991c8727e268241334d82f97f59f1c9434ac7a9c5f5cf"
          mutation_id: "validation:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0"
      plan_history: []
      revision: 20
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
          attempt: 3
          claim_id: "sha256:474fdb8e7dc20f2456d953e09286e0c4377b2a7d59862353e4ba3e048e27f4ff"
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
          revision: 15
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
    digest: "sha256:3f765463509e6a15d1b3df9579d27630a6ea04ce0da91270eb69414b35f0101c"
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
      -
        command_digest: "sha256:e5edc6b994b66986202064e32c1671d9b0cae2a4964db37b70c9d8e5b20cf453"
        id: "sha256:3e8300ccace2e3728b8f187363c08d5df5d9358176a34f0a2e66c25079d3860a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:3e8300ccace2e3728b8f187363c08d5df5d9358176a34f0a2e66c25079d3860a"
        occurred_at: "2026-09-22T04:01:34.948Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609220351-3KNJQZ"
        task_revision: 7
      -
        command_digest: "sha256:b03f126c27a43923c0e6086dc9c3b06d1e8bfb6bb5894279a00bfda4985c52cb"
        id: "result:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0"
        occurred_at: "2026-09-22T04:01:38.768Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609220351-3KNJQZ"
        task_revision: 8
      -
        command_digest: "sha256:5c671044e05cbe52b2a35cea84816b309888e531df289e92a9a3487cb20c5fa1"
        id: "kernel_work_item_inspection_required:sha256:666f3dfa22d11e54bb8486c94fccb3125b26986761ec89bcb528d99e4960d5ba:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:666f3dfa22d11e54bb8486c94fccb3125b26986761ec89bcb528d99e4960d5ba:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
        occurred_at: "2026-09-22T04:01:41.797Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609220351-3KNJQZ"
        task_revision: 9
      -
        command_digest: "sha256:13d857149b288e13436c93ca645011727703a7ea36384075056681fc7f04f099"
        id: "validation:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:fc7493e24926b6e8449f4913a157b63ebe277b2fd059114e7fd0ffc13f0526c0"
        occurred_at: "2026-09-22T04:01:47.787Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609220351-3KNJQZ"
        task_revision: 10
      -
        command_digest: "sha256:dcfba5a9c41ca913cbc6fc3c525a20165ba1dae7282c36f5da8cfd7cb14cb9a4"
        id: "validation-resolution:sha256:935098ed00ec3191844ef6f15c2be7fe2db5109f6c81f1e92f3a3ccce21fa273:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:935098ed00ec3191844ef6f15c2be7fe2db5109f6c81f1e92f3a3ccce21fa273"
        occurred_at: "2026-09-22T04:01:49.698Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609220351-3KNJQZ"
        task_revision: 11
      -
        command_digest: "sha256:e2ffdb6031c33f2bb02a287ef4ddb17774c8b330c32a711ced4d593b8736997a"
        id: "kernel_work_item_rework_claim_required:sha256:373872e4725e6714516230e1dfd0ebee3be3b148069a95f4ea63c26abfe82506:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:373872e4725e6714516230e1dfd0ebee3be3b148069a95f4ea63c26abfe82506:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
        occurred_at: "2026-09-22T04:01:53.657Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609220351-3KNJQZ"
        task_revision: 12
      -
        command_digest: "sha256:6e0f17754f017c82b80785fa32f5409eb177bc5379f5d1eccf3e0083e16381aa"
        id: "kernel_work_item_execution_required:sha256:f2e0b59a5ab0b36a8171f6e7f6a11a15c1303b66dd1deccf7c9daf31fb88f124:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f2e0b59a5ab0b36a8171f6e7f6a11a15c1303b66dd1deccf7c9daf31fb88f124:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
        occurred_at: "2026-09-22T04:01:56.711Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609220351-3KNJQZ"
        task_revision: 13
      -
        command_digest: "sha256:4d10ac4ea3827a57ec8d5353c96e1f6c7468789622b393a7c44594743913ef67"
        id: "sha256:48b03e93f4ad4afa23d637c7fd1a8d4ab9de911bb8246b7f3ed20827448648f1:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:48b03e93f4ad4afa23d637c7fd1a8d4ab9de911bb8246b7f3ed20827448648f1"
        occurred_at: "2026-09-22T04:05:59.352Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609220351-3KNJQZ"
        task_revision: 14
      -
        command_digest: "sha256:ec36bb3f430226668d04a11191410157d392f65ccd97710bb1a8edafed902e1c"
        id: "result:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7"
        occurred_at: "2026-09-22T04:06:03.159Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609220351-3KNJQZ"
        task_revision: 15
      -
        command_digest: "sha256:16cec60e4a6b6dccb743cd05cc60661f7a2070c904560048fa8039a4adb7be5b"
        id: "kernel_work_item_inspection_required:sha256:a5d726410d7c8d69f21e7d71e0bd6e215afbe596794c6fae480b61a1654bf751:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:a5d726410d7c8d69f21e7d71e0bd6e215afbe596794c6fae480b61a1654bf751:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        occurred_at: "2026-09-22T04:06:06.213Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609220351-3KNJQZ"
        task_revision: 16
      -
        command_digest: "sha256:97daffc30d60f7a583d0d7dc8d597bcafc1ced6fcdef30c4ae1a4ae49f4fdaa0"
        id: "validation:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:d5ee6ec10dc57baecee646fb5ed0dbb53be22a46739fd04e9907c877876e26f7"
        occurred_at: "2026-09-22T04:06:13.098Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609220351-3KNJQZ"
        task_revision: 17
      -
        command_digest: "sha256:af470ed5fde124606ddd4942b52e62faaefecbc9660abeb9eaf90ef16558ab11"
        id: "validation-resolution:sha256:d555367cec2122b70d80facb62a3d69e21b2e7459b7654fea7f36bf723ec94b1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:d555367cec2122b70d80facb62a3d69e21b2e7459b7654fea7f36bf723ec94b1"
        occurred_at: "2026-09-22T04:06:15.064Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609220351-3KNJQZ"
        task_revision: 18
      -
        command_digest: "sha256:39f96e1f3b5920cb56b43f8b11ac15c65c620db65e44ff57e45e7ac89e8de25b"
        id: "kernel_work_item_rework_claim_required:sha256:d9f8f301cbc51204ca3d894fa1b1b32e304f97bd0606382290d81ab4770d42aa:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:d9f8f301cbc51204ca3d894fa1b1b32e304f97bd0606382290d81ab4770d42aa:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        occurred_at: "2026-09-22T04:06:19.109Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609220351-3KNJQZ"
        task_revision: 19
      -
        command_digest: "sha256:540e063e2d6e406d9147fd177f083b2936cda3cfd45a181a717dcca86f1f5ab4"
        id: "kernel_work_item_execution_required:sha256:444d0f2077beca182eb24adc2c80f19470172e1720d80ff43c44ad7bd568e50e:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:444d0f2077beca182eb24adc2c80f19470172e1720d80ff43c44ad7bd568e50e:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        occurred_at: "2026-09-22T04:06:22.196Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609220351-3KNJQZ"
        task_revision: 20
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
