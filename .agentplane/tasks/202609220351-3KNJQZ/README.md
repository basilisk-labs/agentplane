---
id: "202609220351-3KNJQZ"
title: "Remove marketing and recipes Git submodules"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 62
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
  updated_at: "2026-09-22T05:06:14.301Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-22T04:10:21.350Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:d8428d26dc4fb4ab379526ebef96e0450f811b589a32ac72a5d8edea7013647f"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-22T05:06:14.301Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "3887e57a49c2b906e5986cd280232f51459f468f"
  review_identity_digest: "sha256:ba6002269cae4d582deb449ccb7cf6ec7dcd76176db17b08742916f01aa9486f"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609220351-3KNJQZ/c71635ea45f41a351bccb53217516d1d4f4ef12e470a8b917f64bb5f3edfe3e7/quality-report.json"
  findings:
    - "The committed index contains no mode 160000 entries, .gitmodules is deleted, and both former gitlinks are absent."
    - "Bootstrap and worktree materialization no longer initialize, require, copy, or symlink agentplane-recipes."
    - "CI and publish workflows no longer request submodule checkout or execute recipes initialization and marketing deinitialization workarounds."
    - "Current documentation and ignore configuration describe recipes and marketing as independent repositories rather than submodules."
    - "The adjacent publish workflow contract now asserts the absence of submodule configuration and initialization; AgentPlane-observed native checks passed against implementation commit 3887e57a49c2b906e5986cd280232f51459f468f."
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
commit:
  hash: "3887e57a49c2b906e5986cd280232f51459f468f"
  message: "AgentPlane-owned canonical implementation commit"
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
  agentplane.kernel_operational_projection:
    digest: "sha256:722a3f0a09c21c00d3ba715fe78399b18d66fd7d4f106851f05e124e2584d7fd"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609220351-3KNJQZ/c71635ea45f41a351bccb53217516d1d4f4ef12e470a8b917f64bb5f3edfe3e7/quality-report.json"
    findings:
      - "The committed index contains no mode 160000 entries, .gitmodules is deleted, and both former gitlinks are absent."
      - "Bootstrap and worktree materialization no longer initialize, require, copy, or symlink agentplane-recipes."
      - "CI and publish workflows no longer request submodule checkout or execute recipes initialization and marketing deinitialization workarounds."
      - "Current documentation and ignore configuration describe recipes and marketing as independent repositories rather than submodules."
      - "The adjacent publish workflow contract now asserts the absence of submodule configuration and initialization; AgentPlane-observed native checks passed against implementation commit 3887e57a49c2b906e5986cd280232f51459f468f."
    implementation_commit: "3887e57a49c2b906e5986cd280232f51459f468f"
    implementation_tree: "e07176a994fbabc9a383a8ddbc7e8ecfe84b8a11"
    projected_at: "2026-09-22T05:06:14.301Z"
    review_identity_digest: "sha256:ba6002269cae4d582deb449ccb7cf6ec7dcd76176db17b08742916f01aa9486f"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:749d4086b4abbfdbb5ec8ff6b0b4ef26a61dbedc359c5b4b69880357ab71ef26"
    work_order_id: "sha256:81323b1f3ebc20faca022837a5d9b895c450aa4bed4fed5fcde075fbfcccb942"
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
            digest: "sha256:5063625013961c3fba8be701ae6f320236a9cd6dced96dfabef3065c321bb16d"
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
              parent_authority_digest: "sha256:a2b6faed2c542b06e73e3fb1779f1672b734f6005a8ec408ef35860607095eb1"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
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
              - "docs/recipes-inventory.json"
            evidence_digest: "sha256:6cba26ca22a3da6a138ab2764b413d531ec97124a7b3c453a15c1887c875f46e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
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
            digest: "sha256:090cc9818488d6b6cfd9184c8c2f5d6888c4e5f4ae2c59797d18a6dcd646c0a4"
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
              parent_authority_digest: "sha256:5063625013961c3fba8be701ae6f320236a9cd6dced96dfabef3065c321bb16d"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
              - ".github/workflows/ci.yml"
              - ".github/workflows/publish-distribution-module.yml"
              - ".github/workflows/publish.yml"
              - ".gitmodules"
              - ".prettierignore"
              - "agentplane-recipes"
              - "docs/README.md"
              - "docs/developer/project-layout.mdx"
              - "docs/developer/testing-and-quality.mdx"
              - "docs/help/troubleshooting.mdx"
              - "eslint.config.cjs"
              - "marketing"
              - "packages/agentplane/bin/framework-dev-contract.js"
              - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
              - "scripts/lib/github-ci-capabilities.mjs"
              - "scripts/workflow/bootstrap-framework-dev.mjs"
            evidence_digest: "sha256:b2be95e568af6f24352f9b1229a4645eb6bb621a34c76491a264bf00ca2a8b78"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
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
            digest: "sha256:09b5eddcaf0349baabb2ea66b725904695c683fe71c0bfb1abf135ddc4fa1f30"
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
              parent_authority_digest: "sha256:090cc9818488d6b6cfd9184c8c2f5d6888c4e5f4ae2c59797d18a6dcd646c0a4"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2930db6a1bc48be30fd16de0c8e2b03d483de745c5d25d98d4adcbcdbc8edc1b"
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
              - "agentplane-recipes"
              - "marketing"
            evidence_digest: "sha256:fef12aea68ce6798db54212fa2a0aac89fb422fdc9b1e6701b43a6883f42080f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
            digest: "sha256:4a90a5cd69e468185c9acb5ac8a7dbc096c635ee4d516123ef8683f55d205bcb"
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
              parent_authority_digest: "sha256:09b5eddcaf0349baabb2ea66b725904695c683fe71c0bfb1abf135ddc4fa1f30"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
              - "agentplane-recipes"
              - "marketing"
            evidence_digest: "sha256:246a3580637536b9f82f6977ad894c0ceee197c955f711f6b31708d44d062915"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2930db6a1bc48be30fd16de0c8e2b03d483de745c5d25d98d4adcbcdbc8edc1b"
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
            digest: "sha256:68d3cae6a7238e3af49305017df919d71d2ec7bd760a6ad7ee0e03385631d5a9"
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
              parent_authority_digest: "sha256:4a90a5cd69e468185c9acb5ac8a7dbc096c635ee4d516123ef8683f55d205bcb"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2930db6a1bc48be30fd16de0c8e2b03d483de745c5d25d98d4adcbcdbc8edc1b"
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
              - "agentplane-recipes"
              - "marketing"
            evidence_digest: "sha256:fef12aea68ce6798db54212fa2a0aac89fb422fdc9b1e6701b43a6883f42080f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
            digest: "sha256:13ca361e2ce4db3c574fca39a747bc03c87c7af4fd12e59bf7dedb08f2dce99a"
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
              parent_authority_digest: "sha256:68d3cae6a7238e3af49305017df919d71d2ec7bd760a6ad7ee0e03385631d5a9"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
              - "agentplane-recipes"
              - "marketing"
            evidence_digest: "sha256:246a3580637536b9f82f6977ad894c0ceee197c955f711f6b31708d44d062915"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2930db6a1bc48be30fd16de0c8e2b03d483de745c5d25d98d4adcbcdbc8edc1b"
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
            digest: "sha256:f3599fc24bb4769766602f9b32657c9be41bee8590ca26db5524314863fec8ff"
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
              parent_authority_digest: "sha256:13ca361e2ce4db3c574fca39a747bc03c87c7af4fd12e59bf7dedb08f2dce99a"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2930db6a1bc48be30fd16de0c8e2b03d483de745c5d25d98d4adcbcdbc8edc1b"
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
              - "agentplane-recipes"
              - "marketing"
            evidence_digest: "sha256:fef12aea68ce6798db54212fa2a0aac89fb422fdc9b1e6701b43a6883f42080f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
            digest: "sha256:539ccc3e2c33c96764274ac4423d8d53b28128aab2b7a829af657461268ba079"
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
              parent_authority_digest: "sha256:f3599fc24bb4769766602f9b32657c9be41bee8590ca26db5524314863fec8ff"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
              - "agentplane-recipes"
              - "marketing"
            evidence_digest: "sha256:246a3580637536b9f82f6977ad894c0ceee197c955f711f6b31708d44d062915"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2930db6a1bc48be30fd16de0c8e2b03d483de745c5d25d98d4adcbcdbc8edc1b"
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
            digest: "sha256:3390f137b4c45f63be9e2de3492a2aadea1f52d52f3e887bcc6a02a6510f0d5f"
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
              parent_authority_digest: "sha256:539ccc3e2c33c96764274ac4423d8d53b28128aab2b7a829af657461268ba079"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
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
              - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
            evidence_digest: "sha256:f5f3a35fd8297c5235d7655b7d0ddf82b4c8cde8e2bf0950a28bf00f3f3f7583"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
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
            digest: "sha256:0a5cc9c74d22edefdb26c2d8239cd4d476a3f62b8df301f884d205ad25c9a5ec"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fd498935e6c56185ce0c24b77d58ac59ef84854cc812b7432faec68def3be7d6"
            plan_revision: 2
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:85fd5956165ab263141804d75197aab590571854ef2d21b0bcca3f7de84055d3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3390f137b4c45f63be9e2de3492a2aadea1f52d52f3e887bcc6a02a6510f0d5f"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
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
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:8bc3a4223c77b54a2842721be0de72d4001c3b9c9347142ab2955a24af0f718a"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
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
            digest: "sha256:056cbc7000f8ee6458d98ebaaf944f7039320a9103e15f18f2c1af18476e9104"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fd498935e6c56185ce0c24b77d58ac59ef84854cc812b7432faec68def3be7d6"
            plan_revision: 2
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:85fd5956165ab263141804d75197aab590571854ef2d21b0bcca3f7de84055d3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:0a5cc9c74d22edefdb26c2d8239cd4d476a3f62b8df301f884d205ad25c9a5ec"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
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
              - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
            evidence_digest: "sha256:dde24c568e7ff1509af992dc5279e59a4d43246bac2b4685181aacbd5f09dec2"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:fa90dfda0cf8f6919975f746064a428334ba058e2976a6ee48d960239b922d9e"
        digest: "sha256:fd498935e6c56185ce0c24b77d58ac59ef84854cc812b7432faec68def3be7d6"
        revision: 2
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
                - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
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
        amend:sha256:fd498935e6c56185ce0c24b77d58ac59ef84854cc812b7432faec68def3be7d6:
          after_revision: 49
          aggregate_digest: "sha256:a63d9c5ef8a2c32f9bff0135bdb743d9ef94947c40b9076f9ddfc349002ad1a2"
          before_revision: 48
          command_digest: "sha256:32235a1d5bdd2b1e35f521d665eec17dc558bc7665a2f55320918d9a8810a7f5"
          effect_ids: []
          event_digests:
            - "sha256:3935229906c2bf273960522542705113b333034e0b327da572663a273ce8715d"
          mutation_id: "amend:sha256:fd498935e6c56185ce0c24b77d58ac59ef84854cc812b7432faec68def3be7d6"
        capture:202609220351-3KNJQZ:
          after_revision: 1
          aggregate_digest: "sha256:a02375c3412eb40764522bb3211de50ca865db0e046f62ed880cd65ea9ecf4b6"
          before_revision: 0
          command_digest: "sha256:27215632bb8dcc42a481c3c413863c1958e617f379d3d68f9e2ccbfc9eab00ef"
          effect_ids: []
          event_digests:
            - "sha256:0efdc66d8ca4d132a92b688238fc8ba90729a78e6d5d8c00d77856aac3276afa"
          mutation_id: "capture:202609220351-3KNJQZ"
        kernel_work_item_claim_required:sha256:09de754feaf0d30eda005bf6bb51eb8d2698e5b9efca3efad1861cefacce8230:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e:
          after_revision: 26
          aggregate_digest: "sha256:97cbd5b1382877d61eea850791c6cc5918b732204558e0ae311fdb66fb1c256b"
          before_revision: 25
          command_digest: "sha256:c7f8c3d22b35ef5e8d56548e507c28d6c97abaf746fae3972ed55a7db994c004"
          effect_ids: []
          event_digests:
            - "sha256:433fc757ba58dd21e53e68b282dc328643b6876fdefbb5279bcd02984a151b38"
          mutation_id: "kernel_work_item_claim_required:sha256:09de754feaf0d30eda005bf6bb51eb8d2698e5b9efca3efad1861cefacce8230:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
        kernel_work_item_claim_required:sha256:802a7195de06b3d270ab810ca80754b9b225e6d3dfd4b752224d75db3e5285e4:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d:
          after_revision: 58
          aggregate_digest: "sha256:f98cd76274f4e700881e7aa7570b13d6fc148915ce490c81b53a3ee47ef80621"
          before_revision: 57
          command_digest: "sha256:8ea9f7d56d84605630353f95bd41caa8899f8d01a93e7fccac9d3befdfa6cd4f"
          effect_ids: []
          event_digests:
            - "sha256:40506a709c3b5b99ca37976276a41f6a0261243c00be29a99639cb0dc51cf5ac"
          mutation_id: "kernel_work_item_claim_required:sha256:802a7195de06b3d270ab810ca80754b9b225e6d3dfd4b752224d75db3e5285e4:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
        kernel_work_item_claim_required:sha256:97678e96733af1e00318ee296a1e3d83d9a6fb0be453309a914e6c4a693ddfe1:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:
          after_revision: 51
          aggregate_digest: "sha256:14511bdb01714410fba82dd41eae9536ed28c8be3ef0331a58a09d7af3089953"
          before_revision: 50
          command_digest: "sha256:d51aed607e9360b5b5fcc0abbefcb9de1a5808591894860d074bc1ecc57e6d77"
          effect_ids: []
          event_digests:
            - "sha256:cb3f615a85c4fbb581d5d60f5b4873dc0ce91b49bad061dddf6f635a19acd514"
          mutation_id: "kernel_work_item_claim_required:sha256:97678e96733af1e00318ee296a1e3d83d9a6fb0be453309a914e6c4a693ddfe1:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        kernel_work_item_claim_required:sha256:eaf3d661364ba9c08cae82d041a2156e75ca0c1074c110a764620b4562a37755:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:
          after_revision: 5
          aggregate_digest: "sha256:5edb330e5345d2cc15acfa1c40efd2548458cb97ba033e10d18e946688fda718"
          before_revision: 4
          command_digest: "sha256:b5a1cee0369229f010fa17d40f77610bb4535717c3a695e6820ea28016b7a519"
          effect_ids: []
          event_digests:
            - "sha256:1cced0b3997f713ffd1815d3ec5f6c2a371409753280f890caaa5b9174e7878e"
          mutation_id: "kernel_work_item_claim_required:sha256:eaf3d661364ba9c08cae82d041a2156e75ca0c1074c110a764620b4562a37755:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        kernel_work_item_execution_required:sha256:0052c90e469011a5da0c9c674d766d8ef7f41290b42d300e6b74e580ee67cf52:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980:
          after_revision: 40
          aggregate_digest: "sha256:fa57116c3e892d0de4d449bf42e86883c74c63912554275f843024758cebf564"
          before_revision: 39
          command_digest: "sha256:f7c4c7c953fb3be6560caf03dc1ccc73252b087e7ccf0fca619a59dc33d08212"
          effect_ids: []
          event_digests:
            - "sha256:d3086d3f549e703573bf32f1c895cd7ef4559af0fd186fa87835edabf12903da"
          mutation_id: "kernel_work_item_execution_required:sha256:0052c90e469011a5da0c9c674d766d8ef7f41290b42d300e6b74e580ee67cf52:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
        kernel_work_item_execution_required:sha256:444d0f2077beca182eb24adc2c80f19470172e1720d80ff43c44ad7bd568e50e:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:
          after_revision: 20
          aggregate_digest: "sha256:49ffca7c6adf6a9a518f78691e9fd50e849e30597eaa619c2fbc46b7f79d5093"
          before_revision: 19
          command_digest: "sha256:540e063e2d6e406d9147fd177f083b2936cda3cfd45a181a717dcca86f1f5ab4"
          effect_ids: []
          event_digests:
            - "sha256:67270f849026f1423e7bcf3951186bb8ed90157c04c8558d03742aeee17d3645"
          mutation_id: "kernel_work_item_execution_required:sha256:444d0f2077beca182eb24adc2c80f19470172e1720d80ff43c44ad7bd568e50e:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        kernel_work_item_execution_required:sha256:56955442a93897b6b8430ade13101f9dd1e248f4bfdf520a184db794b6d88753:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e:
          after_revision: 27
          aggregate_digest: "sha256:efdbfa9f0c4ae3bfeb3a6cbeaa3c4f2b8175115b5b38227d3458fae737126dfd"
          before_revision: 26
          command_digest: "sha256:f0450ef7995b35802c283698618fd9fc80e5b5244c000e44868e1cb17f9b27dc"
          effect_ids: []
          event_digests:
            - "sha256:93dcede79a4b810e4bb2777fa7aef8101fdf97cf130207ac31db2f8d5c30eb08"
          mutation_id: "kernel_work_item_execution_required:sha256:56955442a93897b6b8430ade13101f9dd1e248f4bfdf520a184db794b6d88753:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
        kernel_work_item_execution_required:sha256:d097384cfce5dbb6a28a527d5c9a3fd3b7d417733304d4c46c40f933d8d6ae2e:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:
          after_revision: 52
          aggregate_digest: "sha256:d90ddad6296a29c8e965414cb7fb9b1dc1e6d3fe786fd67840b172e6c46a18b0"
          before_revision: 51
          command_digest: "sha256:3c9ffb9c63eeb09cd3dbfd40f8efa416235cd37918ba06ad34bf8604c10285b0"
          effect_ids: []
          event_digests:
            - "sha256:4758dfb31caa7187d0e43254e54c4433419b5c6688647cf0c4e0d7ea9cfe5fe2"
          mutation_id: "kernel_work_item_execution_required:sha256:d097384cfce5dbb6a28a527d5c9a3fd3b7d417733304d4c46c40f933d8d6ae2e:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a:
          after_revision: 6
          aggregate_digest: "sha256:4a7edf6ee6552226ba8b9ea922e651659f4a6c8df7a4b0e267d21aae8ae481e8"
          before_revision: 5
          command_digest: "sha256:cfac28dbcd716af698d90ac01a24e428e3b2db4663fcea3caa18c7567eb8d4d8"
          effect_ids: []
          event_digests:
            - "sha256:a0cc2ea77f622daeabe4091d6564eaaa281c5e459695916831d81ff081f93a52"
          mutation_id: "kernel_work_item_execution_required:sha256:d6f34310823e8d929dd1eea583cc8b82fb4674c4b4d778fa429eb6f054e849ba:sha256:5640572d639cb43b7b0901a4a81b7b815d02baf2d7385fb6537d5abed0003b3a"
        kernel_work_item_execution_required:sha256:e107238391f8a4c0402ac92d315524c37a36805d1a446b3e492404a731d4bdb2:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:
          after_revision: 47
          aggregate_digest: "sha256:e03f966a5040d09906defa7461b70ad66f9e67d5ff050297745aaa10b8caa278"
          before_revision: 46
          command_digest: "sha256:a0a6e096ecac9ab4806bb9dd879b1480a48cc99388367654a2a63e21f6877110"
          effect_ids: []
          event_digests:
            - "sha256:1ae7a1fde5c862e82d41426d9a4ba3a1bf0dfa8cf51461cdbdfe6119419918ff"
          mutation_id: "kernel_work_item_execution_required:sha256:e107238391f8a4c0402ac92d315524c37a36805d1a446b3e492404a731d4bdb2:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        kernel_work_item_execution_required:sha256:f2e0b59a5ab0b36a8171f6e7f6a11a15c1303b66dd1deccf7c9daf31fb88f124:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964:
          after_revision: 13
          aggregate_digest: "sha256:12eee32056a7445ac3bacd7da38a2e5ec6a0446b4707f1b2762250df403b4e10"
          before_revision: 12
          command_digest: "sha256:6e0f17754f017c82b80785fa32f5409eb177bc5379f5d1eccf3e0083e16381aa"
          effect_ids: []
          event_digests:
            - "sha256:9e60931adb9a95e84ead5a07b6201d02b54286b57256f281b9b21cff85fbf99a"
          mutation_id: "kernel_work_item_execution_required:sha256:f2e0b59a5ab0b36a8171f6e7f6a11a15c1303b66dd1deccf7c9daf31fb88f124:sha256:c4c1f94be25944b7fc1903d5628bfb909b33bb655fbc56b4a733dcef7d828964"
        kernel_work_item_execution_required:sha256:ffb3fb97603fb7c7a63d40db1e2df9082d91eb17c1d59f536305d873aea20d34:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d:
          after_revision: 59
          aggregate_digest: "sha256:9f4a92744257afca0b2df9f625de2636028d0c1d48e453bfbd75cb84822700b8"
          before_revision: 58
          command_digest: "sha256:b5b03b3e9cdf722b445791b5181813663b94a5367ddea57d7bbe51f95efce14d"
          effect_ids: []
          event_digests:
            - "sha256:afaac2426ab20e5e07cba50e0deb15fd279686d1d00ded83838a090ef62ce8fb"
          mutation_id: "kernel_work_item_execution_required:sha256:ffb3fb97603fb7c7a63d40db1e2df9082d91eb17c1d59f536305d873aea20d34:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
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
        kernel_work_item_inspection_required:sha256:da3f002199d91ed609d3d330796e151697e4dcdae7f593c48f5bae51fe60dfae:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e:
          after_revision: 23
          aggregate_digest: "sha256:51ef6fda9d34e2443af78568fc38c174d23bb7d08ede4de95310197379ca4713"
          before_revision: 22
          command_digest: "sha256:16d02297be1dd377718f48ed1430302cbad893f8de8853b784f3aae48a6aa1ea"
          effect_ids: []
          event_digests:
            - "sha256:b29450ef420fb590e43e1b4190aebebad7a84e594eee391f06f0495f87ebd1aa"
          mutation_id: "kernel_work_item_inspection_required:sha256:da3f002199d91ed609d3d330796e151697e4dcdae7f593c48f5bae51fe60dfae:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
        kernel_work_item_inspection_required:sha256:eff6bde51f391381843db81daa0e8afd3e2187788d4bc460fc4d53dc6cdb3203:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:
          after_revision: 43
          aggregate_digest: "sha256:badb60b5b538b533aab8be96ba190fbc4b97c8d20e7753a5af2569e31d1342b9"
          before_revision: 42
          command_digest: "sha256:0c89e0b7df4679c8cd32432a716c35146f9118c311d8ad034ee23ee547e6b072"
          effect_ids: []
          event_digests:
            - "sha256:c5c19fe17eb4665a3132fcb8ea5a0263188d0e9d47340b8fa1f10868a93a072f"
          mutation_id: "kernel_work_item_inspection_required:sha256:eff6bde51f391381843db81daa0e8afd3e2187788d4bc460fc4d53dc6cdb3203:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        kernel_work_item_inspection_required:sha256:f1e188e73bf33df75ea85e9b49bbd2fd9820486d305e3adfa5ede8723e6633cd:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980:
          after_revision: 36
          aggregate_digest: "sha256:60315a290a7526fb4c089b127eb228bae61685669180b6b64cedb2448676fce0"
          before_revision: 35
          command_digest: "sha256:ac0c1e1579810a54857b0494ac0de8463449948c58074b9b37577c1f4fd44463"
          effect_ids: []
          event_digests:
            - "sha256:cc06b07c6495f79ff696338289ad31607905bfad95f45d01e1549dba128f1e19"
          mutation_id: "kernel_work_item_inspection_required:sha256:f1e188e73bf33df75ea85e9b49bbd2fd9820486d305e3adfa5ede8723e6633cd:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
        kernel_work_item_inspection_required:sha256:f562fd1b6f8c55d959c48e5340e6efaab0f3299377c2792760fb05206b38fded:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d:
          after_revision: 55
          aggregate_digest: "sha256:844fd059125082e61e056b6f34058613da6a837a008d0758fd19adcf7fdb8fd1"
          before_revision: 54
          command_digest: "sha256:d67f15756ad4d92962c014b2d3fe3184a1a0838bcb806f95c43176c1c617e3e6"
          effect_ids: []
          event_digests:
            - "sha256:8e000b29c1e21809578c0db7a584e5739a9077016ec475249bc2427938214acc"
          mutation_id: "kernel_work_item_inspection_required:sha256:f562fd1b6f8c55d959c48e5340e6efaab0f3299377c2792760fb05206b38fded:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
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
        kernel_work_item_rework_claim_required:sha256:a4966c080d90ec22a25f050c1edb0ba80a17daf8f13909acc6d82dcd81fc4e02:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980:
          after_revision: 39
          aggregate_digest: "sha256:dd198442c70b25a51d2dd8fac40f0d298460a7652fcfa334e21d41d942447b74"
          before_revision: 38
          command_digest: "sha256:467c75ca577338b77a4591853d7d7db3d55977900a34491e2a49ce3d4879c5b1"
          effect_ids: []
          event_digests:
            - "sha256:4572920d36e8b86eab3a93e24f8db897a4e38d8cff4e1742bd8abe4967eb8061"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:a4966c080d90ec22a25f050c1edb0ba80a17daf8f13909acc6d82dcd81fc4e02:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
        kernel_work_item_rework_claim_required:sha256:d9f8f301cbc51204ca3d894fa1b1b32e304f97bd0606382290d81ab4770d42aa:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5:
          after_revision: 19
          aggregate_digest: "sha256:632c253acd090a62273e7700f7facbc3c561aee1d312f7a17e7e89a40abbd3c1"
          before_revision: 18
          command_digest: "sha256:39f96e1f3b5920cb56b43f8b11ac15c65c620db65e44ff57e45e7ac89e8de25b"
          effect_ids: []
          event_digests:
            - "sha256:3eb187a7c31e54194a94d70f1ef08ac678818f78494174d471e2f4c57428880c"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:d9f8f301cbc51204ca3d894fa1b1b32e304f97bd0606382290d81ab4770d42aa:sha256:6e986214387ad2a641b8d92fad096efeb95119704f310c0d1f6f3e26bed666a5"
        kernel_work_item_rework_claim_required:sha256:e41570f1a1bd8185e4b0ae981fd1e791e3ae73aaf4875d4c52801d4da08a7dd5:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:
          after_revision: 46
          aggregate_digest: "sha256:2ca274c2eda4e48e181a43388551f1a6ed2876a3fb4358dadaf7e48a4fd49d68"
          before_revision: 45
          command_digest: "sha256:d0f68f7b8d96a326ab0c7e86afdcfd3ff16da94de7bfa4010100c390e157802d"
          effect_ids: []
          event_digests:
            - "sha256:320340d184361ad3ef925c9b1d74ea8892f004355c446ce4349ec7a0668d6a09"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:e41570f1a1bd8185e4b0ae981fd1e791e3ae73aaf4875d4c52801d4da08a7dd5:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        result:sha256:31594f45bfc0b1fe3426dd1b6b19e2cdc4cc277f8b63eb1ddf4e7e3772a95060:
          after_revision: 22
          aggregate_digest: "sha256:64691bba4346c6adb41310b1515eafcebe4a081b0860c04d44ef09448ceab3d9"
          before_revision: 21
          command_digest: "sha256:b6b7f56eff35350981a763a94782308c0a0ab3f71ae1f07b6c746c45d89ac118"
          effect_ids: []
          event_digests:
            - "sha256:2d9deda079eae65d622c089a7d57f81fadf85ca949eb681de46ecd34cc145c29"
          mutation_id: "result:sha256:31594f45bfc0b1fe3426dd1b6b19e2cdc4cc277f8b63eb1ddf4e7e3772a95060"
        result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900:
          after_revision: 2
          aggregate_digest: "sha256:5843c9fc5f0c6ba827506191ae5e6c04ebfde1c5bb5bb5a5861d9a8b06780d42"
          before_revision: 1
          command_digest: "sha256:512e5c61d8c558605d3086539b0380ced43f0965af0272ebc95a253f69db9ccf"
          effect_ids: []
          event_digests:
            - "sha256:93b00333802174c084318eb48c57e186ca003c08a85b3d4d20cb97d989728682"
          mutation_id: "result:sha256:7a9f4128d6c17dd74af46e914049d9c3503c907506713aa3f59d765ad0bfb900"
        result:sha256:81323b1f3ebc20faca022837a5d9b895c450aa4bed4fed5fcde075fbfcccb942:
          after_revision: 54
          aggregate_digest: "sha256:71549be9345d984f65e0b57271d2ad688aa6aa22c690f4ba1b3f4e14250633aa"
          before_revision: 53
          command_digest: "sha256:7a6a573d880f44db6a65a151beb6194a9de59429c54569211407e05592b801d4"
          effect_ids: []
          event_digests:
            - "sha256:1eb363645768df41cb2c9e8bbaa9387b067b3ac7607509943aa04586ec7a0ab3"
          mutation_id: "result:sha256:81323b1f3ebc20faca022837a5d9b895c450aa4bed4fed5fcde075fbfcccb942"
        result:sha256:84077ad8399a0dc6afe3f38903894857ce09c6620bea4d488944b3653c0ae3c4:
          after_revision: 42
          aggregate_digest: "sha256:b2416cfde85dfbbd4ddf8d8dc2d4eda2876e8fdfb2c99dcd2d85747210edfb3b"
          before_revision: 41
          command_digest: "sha256:7c920db911542daa163a25884c2a630b034d5981912024db98c71d7f4c675767"
          effect_ids: []
          event_digests:
            - "sha256:a8c1b5fcdef4a56165713bdfdb0afcf931117ef3d72304434d682dd3b9f5cbb1"
          mutation_id: "result:sha256:84077ad8399a0dc6afe3f38903894857ce09c6620bea4d488944b3653c0ae3c4"
        result:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21:
          after_revision: 35
          aggregate_digest: "sha256:010d07df6dba37613d682fef8f41151e3de28deda6bcb365f9a0262404b71a8c"
          before_revision: 34
          command_digest: "sha256:884fa12bb99300624d6b6854e2feec2694452fd7e0970bb6b54751db10af6d5c"
          effect_ids: []
          event_digests:
            - "sha256:731cba74857449060590aff2bb9d1125cae0784372a1a103611fab8fa0d94d41"
          mutation_id: "result:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21"
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
        semantic-stop:sha256:999d12995fb70c8661db15a229c50afe787e25e5168d50483e8d09ae91301036:
          after_revision: 48
          aggregate_digest: "sha256:d4b598915424eda1f50ee2fd613388cf140f27f1ffa66184732d45738c69d8da"
          before_revision: 47
          command_digest: "sha256:b6daa9900f22e13c0974a15ec79d6e2c8f1f3703451e547594e33c20ad763b75"
          effect_ids: []
          event_digests:
            - "sha256:7b21e3f1887fa1c7026f90979dd02e4f9e97533d0eda0525209370df85eba81a"
          mutation_id: "semantic-stop:sha256:999d12995fb70c8661db15a229c50afe787e25e5168d50483e8d09ae91301036"
        sha256:06b948d181b5b14c3cb07a3d07ccb124c850aad04b7abc842184c12249162a8a:
          after_revision: 33
          aggregate_digest: "sha256:c56b121516df5f3e8ea3d6614607797830108d54a5f151a27f97ff757c1dd02e"
          before_revision: 32
          command_digest: "sha256:ea3f4a6eb09ad265779e9da15b7323eaedc3dcb859a197c57914984274facf6e"
          effect_ids: []
          event_digests:
            - "sha256:be38777348188beb9eb5b1b2bea08b88d31f19683e95971b212a360087c50a1c"
          mutation_id: "sha256:06b948d181b5b14c3cb07a3d07ccb124c850aad04b7abc842184c12249162a8a"
        sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731:
          after_revision: 3
          aggregate_digest: "sha256:8e8b0636142f6f62dcd6914d5a39be6dd1ac68f68a0d57163fc7ff3719a4eaa0"
          before_revision: 2
          command_digest: "sha256:7c89396332dfb9031741206842ae566b722ece2ebffaff954c685426c9c319bf"
          effect_ids: []
          event_digests:
            - "sha256:8b24050b0d8b8c19e3443e75beef9875cb37b01c5b15a4785f68fa992544fe6f"
          mutation_id: "sha256:1ce5be9966c3e645f91d7dc5118937c300a34373eb6c4311001d2c6aef0de731"
        sha256:2670cffda051af329eaefe205607de7d100c2a5f6a94aa5b5547c5b1c023ef03:
          after_revision: 41
          aggregate_digest: "sha256:dc1aed676efc96b9f1afa05da92fbf6991c2f48930d418cf73dd17bfb5d6a978"
          before_revision: 40
          command_digest: "sha256:4b7c287202473aac76715dce0dfaf46e9fb527b38ffe78ac152e6fd117a5b2e1"
          effect_ids: []
          event_digests:
            - "sha256:15bbd596eddcea9dcf178c12f474038d0251edc01f1b3f086a86b36f89e9198f"
          mutation_id: "sha256:2670cffda051af329eaefe205607de7d100c2a5f6a94aa5b5547c5b1c023ef03"
        sha256:360e0b7f846bd6cbd277ec84ccef2bc29a68484b59df1ee454ba6afed48536be:
          after_revision: 28
          aggregate_digest: "sha256:6d4df8bd4bbeb158df48f3e44c330d72f490c07872b822a47ed89686fcb13cfc"
          before_revision: 27
          command_digest: "sha256:07bc4087443bfb48112d5de3c6381cc030fa65f30d9e98b8430e999e1b9420d9"
          effect_ids: []
          event_digests:
            - "sha256:ec1b244d3cd7223d840f0f3b7952f60fc8b6b9043679c351e5ba2df80156d7e9"
          mutation_id: "sha256:360e0b7f846bd6cbd277ec84ccef2bc29a68484b59df1ee454ba6afed48536be"
        sha256:3e8300ccace2e3728b8f187363c08d5df5d9358176a34f0a2e66c25079d3860a:
          after_revision: 7
          aggregate_digest: "sha256:d9aefa3658c0757b9d1c0fd24eece8d277ac76d341cebfc09237f1f397880afb"
          before_revision: 6
          command_digest: "sha256:e5edc6b994b66986202064e32c1671d9b0cae2a4964db37b70c9d8e5b20cf453"
          effect_ids: []
          event_digests:
            - "sha256:bfc46dee4054f9dd00bfe2fe7d2623f3aebd7d7797ca463ee46fd261b079d038"
          mutation_id: "sha256:3e8300ccace2e3728b8f187363c08d5df5d9358176a34f0a2e66c25079d3860a"
        sha256:41925e7940b34fae7dc4d070ef3bb4e1eed4a8b82bb183a48a233afdb51a0791:
          after_revision: 32
          aggregate_digest: "sha256:d88392a9d76f90a0df3aa14406c3caa809f90a3031b11fc537685a4b8b7a100b"
          before_revision: 31
          command_digest: "sha256:d1063ecea93e2c0a8f9dce63ba11b9e2125073afe4c1a5c3d28b750e9bd40629"
          effect_ids: []
          event_digests:
            - "sha256:9e753a9868040b034ee265f7311d6825ea4219ed29472bf595d0c45f9790a8e6"
          mutation_id: "sha256:41925e7940b34fae7dc4d070ef3bb4e1eed4a8b82bb183a48a233afdb51a0791"
        sha256:48b03e93f4ad4afa23d637c7fd1a8d4ab9de911bb8246b7f3ed20827448648f1:
          after_revision: 14
          aggregate_digest: "sha256:41bef3bcffbab44ad97f9e73368c4c502d92ce34f512f64ad6e64a0b47b64423"
          before_revision: 13
          command_digest: "sha256:4d10ac4ea3827a57ec8d5353c96e1f6c7468789622b393a7c44594743913ef67"
          effect_ids: []
          event_digests:
            - "sha256:045ace91a565fa55b8a114f8371bdded9d42cf96245babc242956bb34c7bafc7"
          mutation_id: "sha256:48b03e93f4ad4afa23d637c7fd1a8d4ab9de911bb8246b7f3ed20827448648f1"
        sha256:4c29b90efb6c48534fc52e5eb942c7bdfd252770d4482ccb622be209780d7a40:
          after_revision: 21
          aggregate_digest: "sha256:4ed8ece274b41ca7467ee28efe05dc6430f764bd2c2249ab43cf7107d1a9f73c"
          before_revision: 20
          command_digest: "sha256:079e327bc566eff2cce9bfefff35505a79407dd7fcd8961f27e5ccef53fb0f7a"
          effect_ids: []
          event_digests:
            - "sha256:7e99e2d44563d072464f8f2f68ac44e36c69b2b143b3f50f3438ae6302d7bc8b"
          mutation_id: "sha256:4c29b90efb6c48534fc52e5eb942c7bdfd252770d4482ccb622be209780d7a40"
        sha256:4d1c57d07c107a2e84f39bd07ffc336f28a4459b550d9422922fa06f737bc6ed:
          after_revision: 30
          aggregate_digest: "sha256:bda22149a0e689fbfd2b06e82cf356341c589bdd2257d2280e3095e8b25f4e2c"
          before_revision: 29
          command_digest: "sha256:6889b1a0b99a058c286a64cd10870ce28e57080c368272f3b93d053cbe2ed229"
          effect_ids: []
          event_digests:
            - "sha256:a75639d9e1a1a4ada13bc253cf4c52c15265a70f7c5e2549371319b3263cda12"
          mutation_id: "sha256:4d1c57d07c107a2e84f39bd07ffc336f28a4459b550d9422922fa06f737bc6ed"
        sha256:7c3a0adc289a29864341728aa48aa8827bfcda298ff17218a1b0f3433e2fe8e4:
          after_revision: 53
          aggregate_digest: "sha256:acce3e7ad964a7d28712daaa3928e1d4690e63c6949bcf0a7419dc4c83e40895"
          before_revision: 52
          command_digest: "sha256:2cda815b2d90598ce0ea1c295f632f9153ea2ad1d7e04709b3346d7763304770"
          effect_ids: []
          event_digests:
            - "sha256:54711a3b00c923c58d77b8cb18c758114e8b14f4cd5d5ed918717be8668e6c51"
          mutation_id: "sha256:7c3a0adc289a29864341728aa48aa8827bfcda298ff17218a1b0f3433e2fe8e4"
        sha256:8aa118012d352012c529eb7fe111cf3fcb9b79a03211353719a3f389969c3fe2:
          after_revision: 29
          aggregate_digest: "sha256:5250d11abb88338eb74aa490983632405cdde3f3d74f4b198112f30f781fb5e3"
          before_revision: 28
          command_digest: "sha256:a55105318beabe6f05154cb80b63bbbcd52a1bbe566a1acd67d1e0d0ab03f556"
          effect_ids: []
          event_digests:
            - "sha256:5a3742f2f2f5628ae55490fac56a0fc34ea908a3fd4def5b7a78d06544b2e2f1"
          mutation_id: "sha256:8aa118012d352012c529eb7fe111cf3fcb9b79a03211353719a3f389969c3fe2"
        sha256:b123eba0b9801f481863e2a7bb2b18db40e3f3b9d1c0605930122f583f3fa11e:
          after_revision: 50
          aggregate_digest: "sha256:8c19063e5557522bf72d7c516e2e96c6796ceafa1fd96020fbeecbd2d466d62d"
          before_revision: 49
          command_digest: "sha256:f889836b15f147df37848547f4b65b731ac316ed62fdc3f587eb86833582761c"
          effect_ids: []
          event_digests:
            - "sha256:2162df843aa52b6655b6fff5e4faa6703a7f66aa18c9df9c731f92958a55be10"
          mutation_id: "sha256:b123eba0b9801f481863e2a7bb2b18db40e3f3b9d1c0605930122f583f3fa11e"
        sha256:f0fbfed935c4412735f237a220c55167dfab9a6767138496483d7f598e75430f:
          after_revision: 34
          aggregate_digest: "sha256:e89871d78176443bff1fe27ac064f896be587788a6c923c7d0cb5e0d2a0489e8"
          before_revision: 33
          command_digest: "sha256:33547ea4dc96c649fd0dfcc8665a32ff277b4247faa142973141fbb4e05e34fb"
          effect_ids: []
          event_digests:
            - "sha256:44b62dd1e4fc9c46de2026e3ec203b2f3655a55c0484b4d0e82aedd2a7f48786"
          mutation_id: "sha256:f0fbfed935c4412735f237a220c55167dfab9a6767138496483d7f598e75430f"
        sha256:fc438a60d3332ccc385221290505c550f580efd36105060533271e7bc18bb028:
          after_revision: 31
          aggregate_digest: "sha256:09ce35f80662179c9c55ae13221f60dd035ab65625f917ae8b532e218ecfe76e"
          before_revision: 30
          command_digest: "sha256:a5a6c44aadb4c0950d814e0ba175588956c807eca7ddaa577bbb1cec9d145e4e"
          effect_ids: []
          event_digests:
            - "sha256:b22e7f85b819187e9df8eac5dbf71f4ab1d03f316c3cbc062f025f6610ab70c2"
          mutation_id: "sha256:fc438a60d3332ccc385221290505c550f580efd36105060533271e7bc18bb028"
        validation-resolution:sha256:1b4fea9ea2810ecc8629a8b4a1c863885b777606eb30ab02d627f453a41f81f5:
          after_revision: 45
          aggregate_digest: "sha256:dbcc077a3e3ebae0c1c2a0ae842a9d2d21e77dadaf5e49b1444dd14033081b61"
          before_revision: 44
          command_digest: "sha256:684e6c26d880ba5968847606d0425c75e3efbed5ae89a3aa6457f0125970a478"
          effect_ids: []
          event_digests:
            - "sha256:b23fefdb308a2721f29792e28957c1926daca8aa142c664c9ec1d73990311be3"
          mutation_id: "validation-resolution:sha256:1b4fea9ea2810ecc8629a8b4a1c863885b777606eb30ab02d627f453a41f81f5"
        validation-resolution:sha256:935098ed00ec3191844ef6f15c2be7fe2db5109f6c81f1e92f3a3ccce21fa273:
          after_revision: 11
          aggregate_digest: "sha256:a22af2a00a793230f6f719ea10703897ad8951a47b2053aff6bab73aed613015"
          before_revision: 10
          command_digest: "sha256:dcfba5a9c41ca913cbc6fc3c525a20165ba1dae7282c36f5da8cfd7cb14cb9a4"
          effect_ids: []
          event_digests:
            - "sha256:6e7f09fc363357e96f885502da7033406dc7e26eb386d404369b6c3717bebce6"
          mutation_id: "validation-resolution:sha256:935098ed00ec3191844ef6f15c2be7fe2db5109f6c81f1e92f3a3ccce21fa273"
        validation-resolution:sha256:ba8dce815acc48c011c6109ccf427185d989950c4227a40db29436834da4287d:
          after_revision: 38
          aggregate_digest: "sha256:b75d2e4f0d33d68ac9483012f9c9d6d12179a2e5565bf81a8d67d44e70b16236"
          before_revision: 37
          command_digest: "sha256:40d63eb2f574d4b7c76802f40fac0ef951f4cdfa93bd3644833bcf446b44fce5"
          effect_ids: []
          event_digests:
            - "sha256:6a5fee9e4b0ac3a5147759f4518e2dad8994f432b48607b564f8a272db7d95f5"
          mutation_id: "validation-resolution:sha256:ba8dce815acc48c011c6109ccf427185d989950c4227a40db29436834da4287d"
        validation-resolution:sha256:d555367cec2122b70d80facb62a3d69e21b2e7459b7654fea7f36bf723ec94b1:
          after_revision: 18
          aggregate_digest: "sha256:f0ef3840f221b0d42e7be0b717f2e25647bda6eb94ad6edda1375a3bcd93949c"
          before_revision: 17
          command_digest: "sha256:af470ed5fde124606ddd4942b52e62faaefecbc9660abeb9eaf90ef16558ab11"
          effect_ids: []
          event_digests:
            - "sha256:5580406e814c921e916c1dca1bcf3a12daed56fc02dca9eee60800981a3d73dd"
          mutation_id: "validation-resolution:sha256:d555367cec2122b70d80facb62a3d69e21b2e7459b7654fea7f36bf723ec94b1"
        validation-resolution:sha256:ddac7565d15d47cad34785d1373a0615e5e084680dcb360f6992bd3ef31088d9:
          after_revision: 25
          aggregate_digest: "sha256:fd2f61282e882f42585b61a18ff8e363864bb82a3d7820bbf64647d3d41015ed"
          before_revision: 24
          command_digest: "sha256:4b12fa2a58dd641a1403a1710d95d9cfa25bfd114b161348192e4348b540f881"
          effect_ids: []
          event_digests:
            - "sha256:6b6bad644086f70e1045c3573e1005d44fc27e2b50cfc8fd95a90417e5db6026"
          mutation_id: "validation-resolution:sha256:ddac7565d15d47cad34785d1373a0615e5e084680dcb360f6992bd3ef31088d9"
        validation-resolution:sha256:f7521b0d7d5d464ba57ac333b7516abd23bc4c16439400e97243fdbbfe88a606:
          after_revision: 57
          aggregate_digest: "sha256:9103efce8c721dc5d952177415463a2f943aadccb41ab607a1aa08c3ee2bf8b6"
          before_revision: 56
          command_digest: "sha256:fdb99396eca8058da1f308c9c1d969687d5499e5f6ab79af4a966d320f1b6d96"
          effect_ids: []
          event_digests:
            - "sha256:382c4e06d37a344860ae431f1aa46aa0a7071d3b54c43e9dbb53cc87d16ee783"
          mutation_id: "validation-resolution:sha256:f7521b0d7d5d464ba57ac333b7516abd23bc4c16439400e97243fdbbfe88a606"
        validation:sha256:806ab33467cb0ef41acf35edf5301084d96326cb7c4cd05232aec9647379a0c5:
          after_revision: 24
          aggregate_digest: "sha256:97677fe1e662d62eb52bfb07996a22c15f3f4b42abbf18d76324f9aae6cfc561"
          before_revision: 23
          command_digest: "sha256:0f0d1f5c26211326b0f381280e18504e76f1f5e1c1c6b3ef12fe901662ee4c69"
          effect_ids: []
          event_digests:
            - "sha256:7b63735e5cd2ad39473a239ba041cab104ef15f9742114c4ce8ad3e88dde4bd7"
          mutation_id: "validation:sha256:806ab33467cb0ef41acf35edf5301084d96326cb7c4cd05232aec9647379a0c5"
        validation:sha256:8f41b335b902bdb7934c22f2dfdce56c95e128d23ebc4aa61d07882f6f071d2c:
          after_revision: 44
          aggregate_digest: "sha256:e52a349c3717270f46723f4bb44ef0fbe2b3b050269c176853f6c4ac4cc5417e"
          before_revision: 43
          command_digest: "sha256:d207ef6620fd4970f6c2a4a6b74e9771b32909dfd56287c3a50d59de01fce8bf"
          effect_ids: []
          event_digests:
            - "sha256:dac585d486278c9270984ba1c8309d58be5d045f5de49a2b57c51b6562c3273c"
          mutation_id: "validation:sha256:8f41b335b902bdb7934c22f2dfdce56c95e128d23ebc4aa61d07882f6f071d2c"
        validation:sha256:c71635ea45f41a351bccb53217516d1d4f4ef12e470a8b917f64bb5f3edfe3e7:
          after_revision: 56
          aggregate_digest: "sha256:bc5731132bedb738bb02d1ed7cc0d46ca1d2f6a624a25f2cd90a232f1d4c3476"
          before_revision: 55
          command_digest: "sha256:f30444c151c7523b3ffc1af345cbff30839ca6c729544063dd1111fe8babe259"
          effect_ids: []
          event_digests:
            - "sha256:a521f05667d4c051012e4b45cff733611da51999b7a792a93fdf9f2e7b5433f5"
          mutation_id: "validation:sha256:c71635ea45f41a351bccb53217516d1d4f4ef12e470a8b917f64bb5f3edfe3e7"
        validation:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21:
          after_revision: 37
          aggregate_digest: "sha256:314b54e2e51db90e28ede432d7d2c033cb82bb1eea10471204c05d6115fa6f48"
          before_revision: 36
          command_digest: "sha256:da1d76953e0c78d26870450dbc0db1f6dc2f19fdfcc4376568c420248ab42ef7"
          effect_ids: []
          event_digests:
            - "sha256:bb49a79dfe5c00f5fa258b11060e0b55b1e56bc7295d47307ba135cbd59e6244"
          mutation_id: "validation:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21"
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
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:85fd5956165ab263141804d75197aab590571854ef2d21b0bcca3f7de84055d3"
          digest: "sha256:da5d499041d5fd36f35fe3ddd0c274f72a718c38d6c97a7ec8362a8800b1880e"
          revision: 1
          state: "SUPERSEDED"
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
      revision: 59
      schema_version: 1
      state: "ACTIVE"
      work_items:
        detach-superproject-submodules:
          attempt: 4
          claim_id: "sha256:8a8ffe086bcacdfa6b0d94512a99ddb1bd3df2e5b8290e997a75be83b397d056"
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
                - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
            expected_outputs:
              - "submodule-free-superproject"
              - "updated-bootstrap-and-worktree-contracts"
              - "updated-ci-and-publish-contracts"
              - "updated-repository-documentation"
            id: "detach-superproject-submodules"
            optional: false
            required_inputs:
              - "recipe-source-contract"
          output_manifests:
            -
              attempt: 4
              digest: "sha256:3777b8d1e0e272b317c247e3ab1aa3254fdfa6cb618d47db26f6078c72e175d9"
              id: "submodule-free-superproject"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
              task_id: "202609220351-3KNJQZ"
              work_item_id: "detach-superproject-submodules"
            -
              attempt: 4
              digest: "sha256:46c51b2a67d09af730d286178e0581087dd60ddf5501480b4427cd534a92057e"
              id: "updated-bootstrap-and-worktree-contracts"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
              task_id: "202609220351-3KNJQZ"
              work_item_id: "detach-superproject-submodules"
            -
              attempt: 4
              digest: "sha256:5b2938babeb57f50d6a6dd6e2e8af0d6f0a5e2c2ea7690950929ca489ee87c23"
              id: "updated-ci-and-publish-contracts"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
              task_id: "202609220351-3KNJQZ"
              work_item_id: "detach-superproject-submodules"
            -
              attempt: 4
              digest: "sha256:169e150b9a32498cfcc12bcd762c8d932b5a1c52c746f5c5c70d1d7f867fded4"
              id: "updated-repository-documentation"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
              task_id: "202609220351-3KNJQZ"
              work_item_id: "detach-superproject-submodules"
          result_digest: "sha256:46acd0f8b23aa73a4c3411c85a134ecc16e617977f5b1a0512c6fe46b9841b9a"
          revision: 25
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:8a2e98d8efa69474391b5d3c95ec348f5ed60e129810878c7abd3126e01cede2"
              - "sha256:ba6002269cae4d582deb449ccb7cf6ec7dcd76176db17b08742916f01aa9486f"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:f8570ff24d1d038f946361df48edc1da3e889f479c9947df2e03e7fe7bd1ef50"
              environment_digest: "sha256:40943fed64266aff36f4de84046669918a3a604fb976992f191010d199476662"
              implementation_identity: "sha256:46acd0f8b23aa73a4c3411c85a134ecc16e617977f5b1a0512c6fe46b9841b9a"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-22T05:06:14.301Z"
            status: "PASSED"
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
          output_manifests:
            -
              attempt: 3
              digest: "sha256:460599c56ed45d12fa434ea0339a5106109dc7b5bf7ffbae12f1c08ed4c1b472"
              id: "recipe-source-contract"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
              task_id: "202609220351-3KNJQZ"
              work_item_id: "external-recipes-source-contract"
            -
              attempt: 3
              digest: "sha256:e56ac4dae0ed21f4f9620ae53656cf58f0169dc91e6bc5fdf64c145b83911ab6"
              id: "recipe-source-tests"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
              task_id: "202609220351-3KNJQZ"
              work_item_id: "external-recipes-source-contract"
            -
              attempt: 3
              digest: "sha256:b0f6f8ba59b1627fb464cb9f16c8e20cd6997d603d1ca0fbb0bebfc03a144221"
              id: "recipe-source-docs"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
              task_id: "202609220351-3KNJQZ"
              work_item_id: "external-recipes-source-contract"
          result_digest: "sha256:4c4809a18f56afa855eddfddc15cad489e4ff5c406ca4c535b67a184279c0da7"
          revision: 19
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:58d7bce2430775439dbf039817cde0ae88b1e4d580229cc49b7f3e3bd698157e"
              - "sha256:2d2f26c6ddcd73e0e7cd44e41a7b4a9f88d64f9993f64d41e23a69f5af7889d9"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:81bedd6fd534c8934b09a05e7b2a1a0b1fb93358d4f986f88174d5f0890af532"
              environment_digest: "sha256:f3f84e42dfb8d373edee9f70d5e3bf9140d81a5050f73bc5258b7e7b734aeedf"
              implementation_identity: "sha256:4c4809a18f56afa855eddfddc15cad489e4ff5c406ca4c535b67a184279c0da7"
              toolchain_digest: "sha256:1a755b889c57fe42eceac130b8698617219f04ae931e429c3ec3f478fcbf510a"
            observed_at: "2026-09-22T04:10:21.350Z"
            status: "PASSED"
        verify-submodule-free-repository:
          attempt: 1
          claim_id: "sha256:27345523b56a2b6ec7a2c182621fdb9efb8e6565a45ac78737fe37811f30e107"
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
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:5653119a9a7075fd3d87c7755b922e55bdd63784cae9fae509750381c640230b"
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
      -
        command_digest: "sha256:079e327bc566eff2cce9bfefff35505a79407dd7fcd8961f27e5ccef53fb0f7a"
        id: "sha256:4c29b90efb6c48534fc52e5eb942c7bdfd252770d4482ccb622be209780d7a40:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4c29b90efb6c48534fc52e5eb942c7bdfd252770d4482ccb622be209780d7a40"
        occurred_at: "2026-09-22T04:08:53.383Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202609220351-3KNJQZ"
        task_revision: 21
      -
        command_digest: "sha256:b6b7f56eff35350981a763a94782308c0a0ab3f71ae1f07b6c746c45d89ac118"
        id: "result:sha256:31594f45bfc0b1fe3426dd1b6b19e2cdc4cc277f8b63eb1ddf4e7e3772a95060:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:31594f45bfc0b1fe3426dd1b6b19e2cdc4cc277f8b63eb1ddf4e7e3772a95060"
        occurred_at: "2026-09-22T04:08:57.367Z"
        payload_digest: "sha256:0909349b0439b554db4b4450982b8c538fcc513bb5154268100b33efa83f8996"
        task_id: "202609220351-3KNJQZ"
        task_revision: 22
      -
        command_digest: "sha256:16d02297be1dd377718f48ed1430302cbad893f8de8853b784f3aae48a6aa1ea"
        id: "kernel_work_item_inspection_required:sha256:da3f002199d91ed609d3d330796e151697e4dcdae7f593c48f5bae51fe60dfae:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:da3f002199d91ed609d3d330796e151697e4dcdae7f593c48f5bae51fe60dfae:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
        occurred_at: "2026-09-22T04:09:00.488Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609220351-3KNJQZ"
        task_revision: 23
      -
        command_digest: "sha256:0f0d1f5c26211326b0f381280e18504e76f1f5e1c1c6b3ef12fe901662ee4c69"
        id: "validation:sha256:806ab33467cb0ef41acf35edf5301084d96326cb7c4cd05232aec9647379a0c5:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:806ab33467cb0ef41acf35edf5301084d96326cb7c4cd05232aec9647379a0c5"
        occurred_at: "2026-09-22T04:10:24.187Z"
        payload_digest: "sha256:4878ab2391d59246cd05275fa5f1dec131ae6cd0229e806e9863b1686acfa772"
        task_id: "202609220351-3KNJQZ"
        task_revision: 24
      -
        command_digest: "sha256:4b12fa2a58dd641a1403a1710d95d9cfa25bfd114b161348192e4348b540f881"
        id: "validation-resolution:sha256:ddac7565d15d47cad34785d1373a0615e5e084680dcb360f6992bd3ef31088d9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ddac7565d15d47cad34785d1373a0615e5e084680dcb360f6992bd3ef31088d9"
        occurred_at: "2026-09-22T04:10:26.056Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202609220351-3KNJQZ"
        task_revision: 25
      -
        command_digest: "sha256:c7f8c3d22b35ef5e8d56548e507c28d6c97abaf746fae3972ed55a7db994c004"
        id: "kernel_work_item_claim_required:sha256:09de754feaf0d30eda005bf6bb51eb8d2698e5b9efca3efad1861cefacce8230:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:09de754feaf0d30eda005bf6bb51eb8d2698e5b9efca3efad1861cefacce8230:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
        occurred_at: "2026-09-22T04:10:29.939Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202609220351-3KNJQZ"
        task_revision: 26
      -
        command_digest: "sha256:f0450ef7995b35802c283698618fd9fc80e5b5244c000e44868e1cb17f9b27dc"
        id: "kernel_work_item_execution_required:sha256:56955442a93897b6b8430ade13101f9dd1e248f4bfdf520a184db794b6d88753:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:56955442a93897b6b8430ade13101f9dd1e248f4bfdf520a184db794b6d88753:sha256:b8025a2744e39d5ed620ce3a179de23ad9cfcad2a20f1b3507de9c8bd7f1364e"
        occurred_at: "2026-09-22T04:10:32.876Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202609220351-3KNJQZ"
        task_revision: 27
      -
        command_digest: "sha256:07bc4087443bfb48112d5de3c6381cc030fa65f30d9e98b8430e999e1b9420d9"
        id: "sha256:360e0b7f846bd6cbd277ec84ccef2bc29a68484b59df1ee454ba6afed48536be:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:360e0b7f846bd6cbd277ec84ccef2bc29a68484b59df1ee454ba6afed48536be"
        occurred_at: "2026-09-22T04:31:43.855Z"
        payload_digest: "sha256:758d046bb700bfb388afb5f242615a0666d8c68a77abc7d727af5deb3ef3a0b2"
        task_id: "202609220351-3KNJQZ"
        task_revision: 28
      -
        command_digest: "sha256:a55105318beabe6f05154cb80b63bbbcd52a1bbe566a1acd67d1e0d0ab03f556"
        id: "sha256:8aa118012d352012c529eb7fe111cf3fcb9b79a03211353719a3f389969c3fe2:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8aa118012d352012c529eb7fe111cf3fcb9b79a03211353719a3f389969c3fe2"
        occurred_at: "2026-09-22T04:33:48.443Z"
        payload_digest: "sha256:9bdd9c008229f5159e6574f270504d3c53c0148537448e60eea0692538aa3492"
        task_id: "202609220351-3KNJQZ"
        task_revision: 29
      -
        command_digest: "sha256:6889b1a0b99a058c286a64cd10870ce28e57080c368272f3b93d053cbe2ed229"
        id: "sha256:4d1c57d07c107a2e84f39bd07ffc336f28a4459b550d9422922fa06f737bc6ed:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4d1c57d07c107a2e84f39bd07ffc336f28a4459b550d9422922fa06f737bc6ed"
        occurred_at: "2026-09-22T04:35:31.669Z"
        payload_digest: "sha256:d4a92440b02b7b741d34bf4343153c638a5d88f1b605a1aa1260bbd3f66d3c26"
        task_id: "202609220351-3KNJQZ"
        task_revision: 30
      -
        command_digest: "sha256:a5a6c44aadb4c0950d814e0ba175588956c807eca7ddaa577bbb1cec9d145e4e"
        id: "sha256:fc438a60d3332ccc385221290505c550f580efd36105060533271e7bc18bb028:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:fc438a60d3332ccc385221290505c550f580efd36105060533271e7bc18bb028"
        occurred_at: "2026-09-22T04:37:09.079Z"
        payload_digest: "sha256:f8f92483994f2aeee36455a8aef37798ccb0aa0f98a768f9257fd5f3451c0f68"
        task_id: "202609220351-3KNJQZ"
        task_revision: 31
      -
        command_digest: "sha256:d1063ecea93e2c0a8f9dce63ba11b9e2125073afe4c1a5c3d28b750e9bd40629"
        id: "sha256:41925e7940b34fae7dc4d070ef3bb4e1eed4a8b82bb183a48a233afdb51a0791:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:41925e7940b34fae7dc4d070ef3bb4e1eed4a8b82bb183a48a233afdb51a0791"
        occurred_at: "2026-09-22T04:40:36.904Z"
        payload_digest: "sha256:6b0f9b979513ff748ce5c95191c6a22e38213e59f0f8c1b26ecc8051ae00244f"
        task_id: "202609220351-3KNJQZ"
        task_revision: 32
      -
        command_digest: "sha256:ea3f4a6eb09ad265779e9da15b7323eaedc3dcb859a197c57914984274facf6e"
        id: "sha256:06b948d181b5b14c3cb07a3d07ccb124c850aad04b7abc842184c12249162a8a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:06b948d181b5b14c3cb07a3d07ccb124c850aad04b7abc842184c12249162a8a"
        occurred_at: "2026-09-22T04:43:18.599Z"
        payload_digest: "sha256:797a4608a5a898fb6c9075f8e924209f716af73cbbb0f52cf8e21122982b5bef"
        task_id: "202609220351-3KNJQZ"
        task_revision: 33
      -
        command_digest: "sha256:33547ea4dc96c649fd0dfcc8665a32ff277b4247faa142973141fbb4e05e34fb"
        id: "sha256:f0fbfed935c4412735f237a220c55167dfab9a6767138496483d7f598e75430f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:f0fbfed935c4412735f237a220c55167dfab9a6767138496483d7f598e75430f"
        occurred_at: "2026-09-22T04:45:12.684Z"
        payload_digest: "sha256:b8d8ca47c0fa96b653190f50a748e7272ab3204b0b0588025e57d1bcf7c4374b"
        task_id: "202609220351-3KNJQZ"
        task_revision: 34
      -
        command_digest: "sha256:884fa12bb99300624d6b6854e2feec2694452fd7e0970bb6b54751db10af6d5c"
        id: "result:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21"
        occurred_at: "2026-09-22T04:46:15.006Z"
        payload_digest: "sha256:de37d86010f4cc5e2afea165da82ba03f3a4a07aea3676f0baa1488fc743cf1b"
        task_id: "202609220351-3KNJQZ"
        task_revision: 35
      -
        command_digest: "sha256:ac0c1e1579810a54857b0494ac0de8463449948c58074b9b37577c1f4fd44463"
        id: "kernel_work_item_inspection_required:sha256:f1e188e73bf33df75ea85e9b49bbd2fd9820486d305e3adfa5ede8723e6633cd:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f1e188e73bf33df75ea85e9b49bbd2fd9820486d305e3adfa5ede8723e6633cd:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
        occurred_at: "2026-09-22T04:46:18.057Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202609220351-3KNJQZ"
        task_revision: 36
      -
        command_digest: "sha256:da1d76953e0c78d26870450dbc0db1f6dc2f19fdfcc4376568c420248ab42ef7"
        id: "validation:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:ce30a2ab9d093a4ff9f28f6c9bde9de69f5b701cac8d34a6aec45cbd194f1c21"
        occurred_at: "2026-09-22T04:46:32.446Z"
        payload_digest: "sha256:d901e3690c2dd38854e74c38b789c761c28e718c23da6ee5923d1166f1aaf10a"
        task_id: "202609220351-3KNJQZ"
        task_revision: 37
      -
        command_digest: "sha256:40d63eb2f574d4b7c76802f40fac0ef951f4cdfa93bd3644833bcf446b44fce5"
        id: "validation-resolution:sha256:ba8dce815acc48c011c6109ccf427185d989950c4227a40db29436834da4287d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ba8dce815acc48c011c6109ccf427185d989950c4227a40db29436834da4287d"
        occurred_at: "2026-09-22T04:46:34.338Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202609220351-3KNJQZ"
        task_revision: 38
      -
        command_digest: "sha256:467c75ca577338b77a4591853d7d7db3d55977900a34491e2a49ce3d4879c5b1"
        id: "kernel_work_item_rework_claim_required:sha256:a4966c080d90ec22a25f050c1edb0ba80a17daf8f13909acc6d82dcd81fc4e02:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:a4966c080d90ec22a25f050c1edb0ba80a17daf8f13909acc6d82dcd81fc4e02:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
        occurred_at: "2026-09-22T04:46:38.224Z"
        payload_digest: "sha256:1614312eb58103f4c7640f85f8c8390d8b08424d5dc30404b86eb726e683b1d7"
        task_id: "202609220351-3KNJQZ"
        task_revision: 39
      -
        command_digest: "sha256:f7c4c7c953fb3be6560caf03dc1ccc73252b087e7ccf0fca619a59dc33d08212"
        id: "kernel_work_item_execution_required:sha256:0052c90e469011a5da0c9c674d766d8ef7f41290b42d300e6b74e580ee67cf52:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0052c90e469011a5da0c9c674d766d8ef7f41290b42d300e6b74e580ee67cf52:sha256:ba8658d5c4e51bff77304141a0f5598c177da55c091df3711dc055c64ef77980"
        occurred_at: "2026-09-22T04:46:41.213Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202609220351-3KNJQZ"
        task_revision: 40
      -
        command_digest: "sha256:4b7c287202473aac76715dce0dfaf46e9fb527b38ffe78ac152e6fd117a5b2e1"
        id: "sha256:2670cffda051af329eaefe205607de7d100c2a5f6a94aa5b5547c5b1c023ef03:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2670cffda051af329eaefe205607de7d100c2a5f6a94aa5b5547c5b1c023ef03"
        occurred_at: "2026-09-22T04:49:16.145Z"
        payload_digest: "sha256:329bf5e601effe0e8ec373d9a611fc00e91eef1691a8994b224f1bc74458e654"
        task_id: "202609220351-3KNJQZ"
        task_revision: 41
      -
        command_digest: "sha256:7c920db911542daa163a25884c2a630b034d5981912024db98c71d7f4c675767"
        id: "result:sha256:84077ad8399a0dc6afe3f38903894857ce09c6620bea4d488944b3653c0ae3c4:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:84077ad8399a0dc6afe3f38903894857ce09c6620bea4d488944b3653c0ae3c4"
        occurred_at: "2026-09-22T04:49:20.022Z"
        payload_digest: "sha256:4124b95c4e8ee50e402b0add2670c3a521ddfd7be1a23248fb843b2bde2bebc4"
        task_id: "202609220351-3KNJQZ"
        task_revision: 42
      -
        command_digest: "sha256:0c89e0b7df4679c8cd32432a716c35146f9118c311d8ad034ee23ee547e6b072"
        id: "kernel_work_item_inspection_required:sha256:eff6bde51f391381843db81daa0e8afd3e2187788d4bc460fc4d53dc6cdb3203:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:eff6bde51f391381843db81daa0e8afd3e2187788d4bc460fc4d53dc6cdb3203:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        occurred_at: "2026-09-22T04:49:23.167Z"
        payload_digest: "sha256:0bcd5e2250d1b29f52698da2f1f0735696491baf0d0977d6ec4841af151706da"
        task_id: "202609220351-3KNJQZ"
        task_revision: 43
      -
        command_digest: "sha256:d207ef6620fd4970f6c2a4a6b74e9771b32909dfd56287c3a50d59de01fce8bf"
        id: "validation:sha256:8f41b335b902bdb7934c22f2dfdce56c95e128d23ebc4aa61d07882f6f071d2c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:8f41b335b902bdb7934c22f2dfdce56c95e128d23ebc4aa61d07882f6f071d2c"
        occurred_at: "2026-09-22T04:53:43.917Z"
        payload_digest: "sha256:8934b870e7242a6bc9f2f3813ef9a888e9f06d40110f0034901d05eb472df502"
        task_id: "202609220351-3KNJQZ"
        task_revision: 44
      -
        command_digest: "sha256:684e6c26d880ba5968847606d0425c75e3efbed5ae89a3aa6457f0125970a478"
        id: "validation-resolution:sha256:1b4fea9ea2810ecc8629a8b4a1c863885b777606eb30ab02d627f453a41f81f5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1b4fea9ea2810ecc8629a8b4a1c863885b777606eb30ab02d627f453a41f81f5"
        occurred_at: "2026-09-22T04:53:45.804Z"
        payload_digest: "sha256:73f5350c84cc96e7810b4cf90409a1512e4a9b7dcf9f0e74d9098c10bb1e7197"
        task_id: "202609220351-3KNJQZ"
        task_revision: 45
      -
        command_digest: "sha256:d0f68f7b8d96a326ab0c7e86afdcfd3ff16da94de7bfa4010100c390e157802d"
        id: "kernel_work_item_rework_claim_required:sha256:e41570f1a1bd8185e4b0ae981fd1e791e3ae73aaf4875d4c52801d4da08a7dd5:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:e41570f1a1bd8185e4b0ae981fd1e791e3ae73aaf4875d4c52801d4da08a7dd5:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        occurred_at: "2026-09-22T04:53:49.730Z"
        payload_digest: "sha256:3b47a4f72ab7ab9b3cfafc1174f8be60080d50a0014e4b0b04406f5a1b69f16d"
        task_id: "202609220351-3KNJQZ"
        task_revision: 46
      -
        command_digest: "sha256:a0a6e096ecac9ab4806bb9dd879b1480a48cc99388367654a2a63e21f6877110"
        id: "kernel_work_item_execution_required:sha256:e107238391f8a4c0402ac92d315524c37a36805d1a446b3e492404a731d4bdb2:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:e107238391f8a4c0402ac92d315524c37a36805d1a446b3e492404a731d4bdb2:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        occurred_at: "2026-09-22T04:53:52.806Z"
        payload_digest: "sha256:aad38a57b30211b5e7c8a3e705c00172ac1ec5a3fcea34eb7b37c2a16409188d"
        task_id: "202609220351-3KNJQZ"
        task_revision: 47
      -
        command_digest: "sha256:b6daa9900f22e13c0974a15ec79d6e2c8f1f3703451e547594e33c20ad763b75"
        id: "semantic-stop:sha256:999d12995fb70c8661db15a229c50afe787e25e5168d50483e8d09ae91301036:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:999d12995fb70c8661db15a229c50afe787e25e5168d50483e8d09ae91301036"
        occurred_at: "2026-09-22T04:56:14.784Z"
        payload_digest: "sha256:49a5ab2916791286794d7b8826aec0460831d51f8d946e88087187ad77c32af1"
        task_id: "202609220351-3KNJQZ"
        task_revision: 48
      -
        command_digest: "sha256:32235a1d5bdd2b1e35f521d665eec17dc558bc7665a2f55320918d9a8810a7f5"
        id: "amend:sha256:fd498935e6c56185ce0c24b77d58ac59ef84854cc812b7432faec68def3be7d6:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:fd498935e6c56185ce0c24b77d58ac59ef84854cc812b7432faec68def3be7d6"
        occurred_at: "2026-09-22T05:01:11.389Z"
        payload_digest: "sha256:99a9eeff3486c43f5d562f5d60013f7f912da8dce67792266281e50f5c9a7936"
        task_id: "202609220351-3KNJQZ"
        task_revision: 49
      -
        command_digest: "sha256:f889836b15f147df37848547f4b65b731ac316ed62fdc3f587eb86833582761c"
        id: "sha256:b123eba0b9801f481863e2a7bb2b18db40e3f3b9d1c0605930122f583f3fa11e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b123eba0b9801f481863e2a7bb2b18db40e3f3b9d1c0605930122f583f3fa11e"
        occurred_at: "2026-09-22T05:01:13.288Z"
        payload_digest: "sha256:1fef4e341bcdd016d3b4c3d8d09162c92670767166b2908b4161795e5cb671db"
        task_id: "202609220351-3KNJQZ"
        task_revision: 50
      -
        command_digest: "sha256:d51aed607e9360b5b5fcc0abbefcb9de1a5808591894860d074bc1ecc57e6d77"
        id: "kernel_work_item_claim_required:sha256:97678e96733af1e00318ee296a1e3d83d9a6fb0be453309a914e6c4a693ddfe1:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:97678e96733af1e00318ee296a1e3d83d9a6fb0be453309a914e6c4a693ddfe1:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        occurred_at: "2026-09-22T05:01:27.286Z"
        payload_digest: "sha256:023c3c4aa353c9a91d5e1dc6a053957a44051d661b29b8c78a9c9589791f6fde"
        task_id: "202609220351-3KNJQZ"
        task_revision: 51
      -
        command_digest: "sha256:3c9ffb9c63eeb09cd3dbfd40f8efa416235cd37918ba06ad34bf8604c10285b0"
        id: "kernel_work_item_execution_required:sha256:d097384cfce5dbb6a28a527d5c9a3fd3b7d417733304d4c46c40f933d8d6ae2e:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d097384cfce5dbb6a28a527d5c9a3fd3b7d417733304d4c46c40f933d8d6ae2e:sha256:ca2bb452b0f9be92cf18e460eb740e2634ac1656901e953e80353b87abdfe975"
        occurred_at: "2026-09-22T05:01:30.333Z"
        payload_digest: "sha256:b88fe73b96a21b8cd9734beda39a60b9174f6dcc3838ea4cfb914bd024c71e20"
        task_id: "202609220351-3KNJQZ"
        task_revision: 52
      -
        command_digest: "sha256:2cda815b2d90598ce0ea1c295f632f9153ea2ad1d7e04709b3346d7763304770"
        id: "sha256:7c3a0adc289a29864341728aa48aa8827bfcda298ff17218a1b0f3433e2fe8e4:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7c3a0adc289a29864341728aa48aa8827bfcda298ff17218a1b0f3433e2fe8e4"
        occurred_at: "2026-09-22T05:03:55.914Z"
        payload_digest: "sha256:8710059fde1c320c126325f7256a8fdddf98e66b4b8f574cd7266d0b4242b1c7"
        task_id: "202609220351-3KNJQZ"
        task_revision: 53
      -
        command_digest: "sha256:7a6a573d880f44db6a65a151beb6194a9de59429c54569211407e05592b801d4"
        id: "result:sha256:81323b1f3ebc20faca022837a5d9b895c450aa4bed4fed5fcde075fbfcccb942:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:81323b1f3ebc20faca022837a5d9b895c450aa4bed4fed5fcde075fbfcccb942"
        occurred_at: "2026-09-22T05:03:59.783Z"
        payload_digest: "sha256:8a048ba4dbcb6a958891389a6b17772d7e92c1ca27ec64062d785d204c93959d"
        task_id: "202609220351-3KNJQZ"
        task_revision: 54
      -
        command_digest: "sha256:d67f15756ad4d92962c014b2d3fe3184a1a0838bcb806f95c43176c1c617e3e6"
        id: "kernel_work_item_inspection_required:sha256:f562fd1b6f8c55d959c48e5340e6efaab0f3299377c2792760fb05206b38fded:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f562fd1b6f8c55d959c48e5340e6efaab0f3299377c2792760fb05206b38fded:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
        occurred_at: "2026-09-22T05:04:02.979Z"
        payload_digest: "sha256:f45b55230035d9446470efeb8317eb2ab86b7e3cb37cbe75bd650d7ecfe3360e"
        task_id: "202609220351-3KNJQZ"
        task_revision: 55
      -
        command_digest: "sha256:f30444c151c7523b3ffc1af345cbff30839ca6c729544063dd1111fe8babe259"
        id: "validation:sha256:c71635ea45f41a351bccb53217516d1d4f4ef12e470a8b917f64bb5f3edfe3e7:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c71635ea45f41a351bccb53217516d1d4f4ef12e470a8b917f64bb5f3edfe3e7"
        occurred_at: "2026-09-22T05:06:17.252Z"
        payload_digest: "sha256:443a91d2985524bd209d219c2d2bf5bb2234f675c97028c0d7e02a033661e93e"
        task_id: "202609220351-3KNJQZ"
        task_revision: 56
      -
        command_digest: "sha256:fdb99396eca8058da1f308c9c1d969687d5499e5f6ab79af4a966d320f1b6d96"
        id: "validation-resolution:sha256:f7521b0d7d5d464ba57ac333b7516abd23bc4c16439400e97243fdbbfe88a606:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:f7521b0d7d5d464ba57ac333b7516abd23bc4c16439400e97243fdbbfe88a606"
        occurred_at: "2026-09-22T05:06:19.189Z"
        payload_digest: "sha256:683c413683c848a8f021ba3cad0592d934438debd0bcd6265bfae229b6a2f64a"
        task_id: "202609220351-3KNJQZ"
        task_revision: 57
      -
        command_digest: "sha256:8ea9f7d56d84605630353f95bd41caa8899f8d01a93e7fccac9d3befdfa6cd4f"
        id: "kernel_work_item_claim_required:sha256:802a7195de06b3d270ab810ca80754b9b225e6d3dfd4b752224d75db3e5285e4:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:802a7195de06b3d270ab810ca80754b9b225e6d3dfd4b752224d75db3e5285e4:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
        occurred_at: "2026-09-22T05:06:23.194Z"
        payload_digest: "sha256:cb51f14fdbfee9efa74e6e7e8d2f01a8ca620b0c2610a28d7952eeb01446b9d9"
        task_id: "202609220351-3KNJQZ"
        task_revision: 58
      -
        command_digest: "sha256:b5b03b3e9cdf722b445791b5181813663b94a5367ddea57d7bbe51f95efce14d"
        id: "kernel_work_item_execution_required:sha256:ffb3fb97603fb7c7a63d40db1e2df9082d91eb17c1d59f536305d873aea20d34:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ffb3fb97603fb7c7a63d40db1e2df9082d91eb17c1d59f536305d873aea20d34:sha256:edffcf66afb0a192c4756bbcc7616f90acc58a4396638837f12276d7aa5ff00d"
        occurred_at: "2026-09-22T05:06:26.202Z"
        payload_digest: "sha256:d5b7e61f92a6ab990035c37b1be8a81831983e46adeaeb195ef1dc1e0df6f932"
        task_id: "202609220351-3KNJQZ"
        task_revision: 59
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
