---
id: "202609301724-M0S90X"
title: "Integrate the independent website extraction from 202609301619-2GPBMT"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-30T17:43:49.238Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-30T17:42:44.961Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:df6496155e37ea24c6edb48d5ff518cdfe576f0994d31d399b16580a1574d7a0"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-30T17:42:44.961Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "32943ef6841f367127103adf8f264960fb9961f1"
  review_identity_digest: "sha256:f52402026fcbf6a39592b4eeb725db8b8ae208a3dc6d9a3c21dfc83b41113295"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609301724-M0S90X/a59ef46c09bd38783fefdd897a716dacf3ce46b77416887e232dddac8dcd1869/quality-report.json"
  findings:
    - "Commit 32943ef6841f367127103adf8f264960fb9961f1 contains the scoped framework cleanup and no temporary site payload. Its implementation diff matches the inspected source extraction exactly."
    - "Workspace, CI, release generation and developer scripts preserve canonical documentation while removing website build dependencies."
    - "All six native checks passed. Fresh affected tests report 101 passing and one explicitly skipped baseline failure. Changed-source formatting, lint and compatibility passed."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "public_api"
      - "schema"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - ".github"
      - ".prettierignore"
      - "CONTRIBUTING.md"
      - "bun.lock"
      - "docs"
      - "eslint.config.cjs"
      - "knip.json"
      - "package.json"
      - "packages"
      - "scripts"
      - "website"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".github"
      - ".prettierignore"
      - "CONTRIBUTING.md"
      - "bun.lock"
      - "docs"
      - "eslint.config.cjs"
      - "knip.json"
      - "package.json"
      - "packages"
      - "scripts"
      - "website"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".github"
          - ".prettierignore"
          - "CONTRIBUTING.md"
          - "bun.lock"
          - "docs"
          - "eslint.config.cjs"
          - "knip.json"
          - "package.json"
          - "packages"
          - "scripts"
          - "website"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "dependencies"
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:30b0f75425a069bfe10c72e625f653374ca69c89ad38159f3392350f8626911e"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "effect_ci"
        - "effect_dependencies"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
        - "full_regression"
        - "hosted_integration"
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
      - "hosted_integration"
      - "repository_effect:ci"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "32943ef6841f367127103adf8f264960fb9961f1"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-30T17:24:14.251Z"
doc_updated_by: "CODER"
description: "Recover 202609301619-2GPBMT by reapplying its preserved framework cleanup onto main. The public basilisk-labs/agentplane-web repository is already deployed independently at agentplane.org. Retain documentation sources and code-derived reference generation in agentplane; remove website source, dependencies, scripts and CI. Reapply only implementation changes from 7565a4d744a51551e74ae21a11fb9888fb1d3c47 relative to 1053fee6f16c70a25154d54d4664ccfe609b5082, excluding .agentplane task artifacts. Run fresh checks and evaluation, then publish the framework PR. Do not inherit historical passing review. Use explicit scope roots to avoid the native empty-root repository-evidence bug."
sections:
  Summary: |-
    Integrate the independent website extraction from 202609301619-2GPBMT

    Recover 202609301619-2GPBMT by reapplying its preserved framework cleanup onto main. The public basilisk-labs/agentplane-web repository is already deployed independently at agentplane.org. Retain documentation sources and code-derived reference generation in agentplane; remove website source, dependencies, scripts and CI. Reapply only implementation changes from 7565a4d744a51551e74ae21a11fb9888fb1d3c47 relative to 1053fee6f16c70a25154d54d4664ccfe609b5082, excluding .agentplane task artifacts. Run fresh checks and evaluation, then publish the framework PR. Do not inherit historical passing review. Use explicit scope roots to avoid the native empty-root repository-evidence bug.
  Scope: |-
    - In scope: Recover 202609301619-2GPBMT by reapplying its preserved framework cleanup onto main. The public basilisk-labs/agentplane-web repository is already deployed independently at agentplane.org. Retain documentation sources and code-derived reference generation in agentplane; remove website source, dependencies, scripts and CI. Reapply only implementation changes from 7565a4d744a51551e74ae21a11fb9888fb1d3c47 relative to 1053fee6f16c70a25154d54d4664ccfe609b5082, excluding .agentplane task artifacts. Run fresh checks and evaluation, then publish the framework PR. Do not inherit historical passing review. Use explicit scope roots to avoid the native empty-root repository-evidence bug.
    - Out of scope: unrelated refactors not required for "Integrate the independent website extraction from 202609301619-2GPBMT".
  Plan: "1. Execute approved WorkItem framework-cleanup."
  Verify Steps: |-
    PLANNER fallback scaffold for "Integrate the independent website extraction from 202609301619-2GPBMT". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Integrate the independent website extraction from 202609301619-2GPBMT". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:ebd0a15fefa6b6c100cfd6bf27e1e18c3aed0fa66aa7634a893109ca63bbd2d6"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609301724-M0S90X/a59ef46c09bd38783fefdd897a716dacf3ce46b77416887e232dddac8dcd1869/quality-report.json"
    findings:
      - "Commit 32943ef6841f367127103adf8f264960fb9961f1 contains the scoped framework cleanup and no temporary site payload. Its implementation diff matches the inspected source extraction exactly."
      - "Workspace, CI, release generation and developer scripts preserve canonical documentation while removing website build dependencies."
      - "All six native checks passed. Fresh affected tests report 101 passing and one explicitly skipped baseline failure. Changed-source formatting, lint and compatibility passed."
    implementation_commit: "32943ef6841f367127103adf8f264960fb9961f1"
    implementation_tree: "537cc080335936194f2b137c03af0cf78b2d55f0"
    projected_at: "2026-09-30T17:42:44.961Z"
    review_identity_digest: "sha256:f52402026fcbf6a39592b4eeb725db8b8ae208a3dc6d9a3c21dfc83b41113295"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:df6496155e37ea24c6edb48d5ff518cdfe576f0994d31d399b16580a1574d7a0"
    work_order_id: "sha256:fb8a6356935700c68bb7029b445fa189e3eb7ed8e5a3360a678b5bc1c12424d1"
  task_execution_context:
    base_ref: "main"
    base_sha: "1053fee6f16c70a25154d54d4664ccfe609b5082"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0488f041b53cb5b8eaca19b3c4dc58c513a08bac96e141340fe6d382ff0b9e93"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e99412216a795a516d880e38f1822a60fc389f6618208d240638be28a6b6c002"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:21e04e0c30d3c4f1803ea1dec653996f791581e3bc73185144ee4df82fb3a952"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github"
              - ".prettierignore"
              - "CONTRIBUTING.md"
              - "bun.lock"
              - "docs"
              - "eslint.config.cjs"
              - "knip.json"
              - "package.json"
              - "packages"
              - "scripts"
              - "website"
            task_id: "202609301724-M0S90X"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
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
            digest: "sha256:e8bdea8c3c24d104b1af11e26c16ae35bf100d4ce9be960833a5e96a93fd44d5"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e99412216a795a516d880e38f1822a60fc389f6618208d240638be28a6b6c002"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:21e04e0c30d3c4f1803ea1dec653996f791581e3bc73185144ee4df82fb3a952"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:0488f041b53cb5b8eaca19b3c4dc58c513a08bac96e141340fe6d382ff0b9e93"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:06d86d4586ba514e43191bf940a4d4067cb235e667070f8e7b4a86aed159a8bd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github"
              - ".prettierignore"
              - "CONTRIBUTING.md"
              - "bun.lock"
              - "docs"
              - "eslint.config.cjs"
              - "knip.json"
              - "package.json"
              - "packages"
              - "scripts"
              - "website"
            task_id: "202609301724-M0S90X"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - ".github/dependabot.yml"
              - ".github/path-filters.yml"
              - ".github/workflows/ci.yml"
              - ".github/workflows/docs-ci.yml"
              - ".github/workflows/pages-deploy.yml"
              - ".prettierignore"
              - "CONTRIBUTING.md"
              - "bun.lock"
              - "docs/README.md"
              - "docs/contributing/citation-guidelines.mdx"
              - "docs/developer/documentation-information-architecture.mdx"
              - "docs/developer/testing-and-quality.mdx"
              - "docs/recipes/docs-update.mdx"
              - "docs/reference/generated-reference.mdx"
              - "eslint.config.cjs"
              - "knip.json"
              - "package.json"
              - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
              - "packages/agentplane/src/cli/local-ci-selection.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
              - "packages/agentplane/src/commands/release/apply.mutation.ts"
              - "packages/agentplane/src/commands/release/apply.version-mutation.test.ts"
              - "packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
              - "packages/agentplane/src/commands/release/workflow-node-version-contract.test.ts"
              - "scripts/README.md"
              - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
              - "scripts/check-design-language.mjs"
              - "scripts/checks/check-agent-onboarding-scenario.mjs"
              - "scripts/checks/check-design-language.mjs"
              - "scripts/checks/check-docs-ia.mjs"
              - "scripts/checks/check-typescript-toolchain.mjs"
              - "scripts/checks/profile-local-quality.mjs"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/generate-llms-full.mjs"
              - "scripts/generate-roadmap-illustration.mjs"
              - "scripts/generate-website-docs.mjs"
              - "scripts/generate/generate-llms-full.mjs"
              - "scripts/generate/generate-package-reference.mjs"
              - "scripts/generate/generate-roadmap-illustration.mjs"
              - "scripts/generate/generate-website-docs.mjs"
              - "scripts/lib/github-ci-capabilities.mjs"
              - "scripts/lib/local-ci-selection.mjs"
              - "scripts/lib/next-development-version.mjs"
              - "scripts/workflow/bootstrap-framework-dev.mjs"
              - "website/.env.example"
              - "website/.gitignore"
              - "website/CONTENT.md"
              - "website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx"
              - "website/blog/2026-02-26-release-0-2-25-safer-commits-cleaner-release-flow.mdx"
              - "website/blog/2026-03-06-release-0-3-0-policy-gateway-and-release-discipline.mdx"
              - "website/blog/2026-03-06-release-0-3-1-publish-recovery-and-quieter-surface.mdx"
              - "website/blog/2026-03-07-release-0-3-2-smoother-upgrades-and-framework-dev.mdx"
              - "website/blog/2026-03-08-release-0-3-3-runtime-hardening-and-readme-v3.mdx"
              - "website/blog/2026-03-09-release-0-3-4-install-first-startup-and-upgrade-repair.mdx"
              - "website/blog/2026-03-12-release-0-3-5-readme-v3-docs-shell-and-backend-projection.mdx"
              - "website/blog/2026-03-14-release-0-3-7-legacy-recovery-redmine-and-safer-publish.mdx"
              - "website/blog/2026-04-03-release-0-3-8-and-0-3-9-preparing-0-4-fixing-installability.mdx"
              - "website/blog/2026-04-30-agentplane-0-3-road-to-0-4.mdx"
              - "website/blog/2026-04-30-release-0-4-0-modular-prompts-and-recipes.mdx"
              - "website/blog/2026-05-01-release-0-4-1-hosted-close-and-release-evidence.mdx"
              - "website/blog/2026-05-03-coding-agent-audit-layer-and-recipes.mdx"
              - "website/blog/2026-05-04-introducing-acr-v0-1.mdx"
              - "website/blog/2026-05-12-why-blueprints-matter.mdx"
              - "website/blog/2026-05-14-agentplane-0-6-context-management-llm-wiki.mdx"
              - "website/blog/2026-05-14-recipes-reusable-agent-behavior.mdx"
              - "website/blog/authors.yml"
              - "website/blog/tags.yml"
              - "website/bun.lock"
              - "website/docusaurus.config.ts"
              - "website/package.json"
              - "website/scripts/check-links.mjs"
              - "website/scripts/check-navigation.mjs"
              - "website/scripts/check-site-content.mjs"
              - "website/scripts/site-smoke.mjs"
              - "website/sidebars.ts"
              - "website/src/components/CommandBlock.module.css"
              - "website/src/components/CommandBlock.tsx"
              - "website/src/components/FurtherReading.tsx"
              - "website/src/components/GitHubStarsButton.module.css"
              - "website/src/components/GitHubStarsButton.tsx"
              - "website/src/components/RedirectTo.tsx"
              - "website/src/css/custom.css"
              - "website/src/data/homepage-content.ts"
              - "website/src/data/referenceSources.ts"
              - "website/src/data/site.ts"
              - "website/src/pages/_home.module.css"
              - "website/src/pages/about.tsx"
              - "website/src/pages/blog/index.module.css"
              - "website/src/pages/blog/index.tsx"
              - "website/src/pages/docs/contributing/citation-guidelines.tsx"
              - "website/src/pages/docs/developer/website-success-metrics.tsx"
              - "website/src/pages/docs/listing.tsx"
              - "website/src/pages/docs/showcase.tsx"
              - "website/src/pages/docs/user/agent-change-record.tsx"
              - "website/src/pages/docs/user/website-ia.tsx"
              - "website/src/pages/docs/website-success-metrics.tsx"
              - "website/src/pages/examples.module.css"
              - "website/src/pages/examples.tsx"
              - "website/src/pages/index.tsx"
              - "website/src/theme/BlogPostItem/Header/Authors/index.tsx"
              - "website/src/theme/DocItem/Layout/index.tsx"
              - "website/src/theme/DocRoot/Layout/Main/index.tsx"
              - "website/src/theme/DocRoot/Layout/Sidebar/index.tsx"
              - "website/src/theme/DocRoot/Layout/Sidebar/styles.module.css"
              - "website/src/theme/DocRoot/Layout/index.tsx"
              - "website/src/theme/DocSidebar/Desktop/index.tsx"
              - "website/src/theme/DocSidebar/Desktop/styles.module.css"
              - "website/src/theme/Root.tsx"
              - "website/src/types.d.ts"
              - "website/static/CNAME"
              - "website/static/img/agentplane-demo.gif"
              - "website/static/img/agentplane-favicon.svg"
              - "website/static/img/agentplane.svg"
              - "website/static/img/android-chrome-192x192.png"
              - "website/static/img/android-chrome-512x512.png"
              - "website/static/img/apple-touch-icon.png"
              - "website/static/img/blog/release-0-2-25-kandinsky-agentplane.svg"
              - "website/static/img/blog/release-0-3-0-kandinsky-agentplane.svg"
              - "website/static/img/blog/roadmap-kandinsky-agentplane.svg"
              - "website/static/img/favicon-16x16.png"
              - "website/static/img/favicon-32x32.png"
              - "website/static/img/favicon.ico"
              - "website/static/img/header.png"
              - "website/static/img/header.svg"
              - "website/static/img/hn-card.png"
              - "website/static/img/logo.svg"
              - "website/static/img/og-image.png"
              - "website/static/img/twitter-card.png"
              - "website/static/llms-full.txt"
              - "website/static/llms.txt"
              - "website/static/presentation/aimindset20260325/assets/agentplane-cli.png"
              - "website/static/presentation/aimindset20260325/assets/example.jpg"
              - "website/static/presentation/aimindset20260325/assets/scenario.md"
              - "website/static/presentation/aimindset20260325/assets/slide2.png"
              - "website/static/presentation/aimindset20260325/assets/slide8.png"
              - "website/static/presentation/aimindset20260325/index.html"
              - "website/static/presentation/aimindset20260325/script.js"
              - "website/static/presentation/aimindset20260325/styles.css"
              - "website/static/robots.txt"
              - "website/static/site.webmanifest"
              - "website/tsconfig.docusaurus.json"
              - "website/tsconfig.eslint.json"
              - "website/tsconfig.json"
            evidence_digest: "sha256:29d3b32e8699944965d23a11020b3beb942f2102ef0601e31585bff812b81a87"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:21e04e0c30d3c4f1803ea1dec653996f791581e3bc73185144ee4df82fb3a952"
        digest: "sha256:e99412216a795a516d880e38f1822a60fc389f6618208d240638be28a6b6c002"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:e18be1e76d29abead392d534e0f26bc0f700a012394512ffad03afa0ec728f85"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "ci"
                - "dependencies"
                - "documentation"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - ".github"
                - ".prettierignore"
                - "CONTRIBUTING.md"
                - "bun.lock"
                - "docs"
                - "eslint.config.cjs"
                - "knip.json"
                - "package.json"
                - "packages"
                - "scripts"
                - "website"
            expected_outputs:
              - "framework-cleanup-evidence"
            id: "framework-cleanup"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609301724-M0S90X"
      intent_digest: "sha256:83f9ab0994f85c8f0919beb721756d6ac38fe1437a0c4a87b84d64caed7315af"
      migration_receipts: []
      mutation_receipts:
        capture:202609301724-M0S90X:
          after_revision: 1
          aggregate_digest: "sha256:6f4749823f167536bb34138ee8bcaf4afb3ead385358fdbc59137b6cfd947efa"
          before_revision: 0
          command_digest: "sha256:996a9f33f753aad3473038e6f3be699939f3692f551ad11c66e1ffc392905a92"
          effect_ids: []
          event_digests:
            - "sha256:acb361f99ff0de9a370477b6c1c899d477a51f1e2b7ff642a6f0313e677af44b"
          mutation_id: "capture:202609301724-M0S90X"
        kernel_work_item_claim_required:sha256:648e4d0bef65ed1316730291e4276440df4b0abd1d3c786c0fb07ac86c9fea65:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 5
          aggregate_digest: "sha256:7ef41dfba99433c69729b7e59888b6a157d46744c9315d78fe5366f0f042cb27"
          before_revision: 4
          command_digest: "sha256:92133d877ada9b7cc69ae00501e307c00d4338b9ca951678e5073e7253d3ba38"
          effect_ids: []
          event_digests:
            - "sha256:bbb9c14159685bf3e2fc43e4800fa26327afe82b5cc4f6e819dba9bf58152646"
          mutation_id: "kernel_work_item_claim_required:sha256:648e4d0bef65ed1316730291e4276440df4b0abd1d3c786c0fb07ac86c9fea65:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        kernel_work_item_execution_required:sha256:b1a56b1d9ee418401eff368f22a1c15886e30777149c38d484f067e32e3ab560:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 6
          aggregate_digest: "sha256:ffe45d6b49a0dcdf5efeec6303512f1722b4c89a9bbb0c4faaa266a017a814ea"
          before_revision: 5
          command_digest: "sha256:428c64d9a29a1129b3da67c8d98b335a0066007995cf72540af3229a7947fdc9"
          effect_ids: []
          event_digests:
            - "sha256:fa0c5fe69207ac027e45138d240403102ffcc2f10becc9a7172bc403147323e2"
          mutation_id: "kernel_work_item_execution_required:sha256:b1a56b1d9ee418401eff368f22a1c15886e30777149c38d484f067e32e3ab560:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        kernel_work_item_inspection_required:sha256:6af88b5f7bdda5a5d86f6bc0e1c06e5e20dcf117e58311e0eaa9cc7f44b6306a:sha256:06d86d4586ba514e43191bf940a4d4067cb235e667070f8e7b4a86aed159a8bd:
          after_revision: 9
          aggregate_digest: "sha256:3878074e99cc7793af1b63c406cc8f609888fe70a25b79f1ef9d19c7c49cd2d6"
          before_revision: 8
          command_digest: "sha256:c3baba18e0d5024d8ed242ea88866dde4e29f88b050b94d3750c4f53693558ba"
          effect_ids: []
          event_digests:
            - "sha256:a2e0466a27654eca9faa4b5dca33bcaa857f4ad41455642f150140341bba9a79"
          mutation_id: "kernel_work_item_inspection_required:sha256:6af88b5f7bdda5a5d86f6bc0e1c06e5e20dcf117e58311e0eaa9cc7f44b6306a:sha256:06d86d4586ba514e43191bf940a4d4067cb235e667070f8e7b4a86aed159a8bd"
        kernel_work_item_materialization_required:sha256:92cc0c0adfe17d421e0fd2742a158b4d2d75f272471c808f6327e6c4fb9de4f4:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:
          after_revision: 4
          aggregate_digest: "sha256:83f0240d17ea7c67160e991a96bc64ff089a60434f12638f0c27e3018c95c0eb"
          before_revision: 3
          command_digest: "sha256:aa2f29f458b3551f3abe6175841e3e3461174913adc76ec488992fcf7ce782dd"
          effect_ids: []
          event_digests:
            - "sha256:20c21e3b17b1337ef300082675a2735ffba0e68e32bcfe0eb3ce0a192c38d201"
          mutation_id: "kernel_work_item_materialization_required:sha256:92cc0c0adfe17d421e0fd2742a158b4d2d75f272471c808f6327e6c4fb9de4f4:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        result:sha256:3a447801f953f599cc6b8942f5acfab3cfc1166bf6cb48a31e0147299b66ec1f:
          after_revision: 2
          aggregate_digest: "sha256:ca9233572ecca5078a8ac4b12b7a75fd61b7a65df127c276573eff5450ee38eb"
          before_revision: 1
          command_digest: "sha256:753cc56043b65417c2681b38806cb422afd643bbf30a1df045f0cefa05a96db9"
          effect_ids: []
          event_digests:
            - "sha256:6d7fbb367c014d6d79775d46fd8fc29b5d4c38a155c12ffb431aa2da71db3ab6"
          mutation_id: "result:sha256:3a447801f953f599cc6b8942f5acfab3cfc1166bf6cb48a31e0147299b66ec1f"
        result:sha256:fb8a6356935700c68bb7029b445fa189e3eb7ed8e5a3360a678b5bc1c12424d1:
          after_revision: 8
          aggregate_digest: "sha256:dcaaa3bd33280d159baceacb84bafcb5997b0f2a4f88fb4c95792952c88e5876"
          before_revision: 7
          command_digest: "sha256:7a21d95475e0da48180d40b6e6d6f1362983be9f3fcef1121ed90950c4f73ee0"
          effect_ids: []
          event_digests:
            - "sha256:24b6a0f9802f74163fa602353149d9a473fc85b4fd809c6d2f22168135d3be73"
          mutation_id: "result:sha256:fb8a6356935700c68bb7029b445fa189e3eb7ed8e5a3360a678b5bc1c12424d1"
        sha256:48f6fd14738674b73b6e8e218875af0eab49ceeac2bfea28266e73fa1b31c3a5:
          after_revision: 7
          aggregate_digest: "sha256:2c7544753b1378d14f5dec8153c2916faeedc129af5d89c70c168b12bf12dbf3"
          before_revision: 6
          command_digest: "sha256:d3c60c6c1c40b8167e3f22080f4f07b93568c831d6c739cd02e375ac7d355d46"
          effect_ids: []
          event_digests:
            - "sha256:032a9f1d1ea5c0604ef988665f1978097d6c4d09d99d3bc0760fc3cbb7a364d1"
          mutation_id: "sha256:48f6fd14738674b73b6e8e218875af0eab49ceeac2bfea28266e73fa1b31c3a5"
        sha256:7b46e0106b6cd0365b5870248fb3face204d550e0cd5a3f9cf7e3fa52bdfaaa5:
          after_revision: 3
          aggregate_digest: "sha256:c2d7c8fc8b8a8e9740cfc3fc68ce05f6cea81e942a905c308b25c78ff1a24960"
          before_revision: 2
          command_digest: "sha256:0e818db4392a1ccab1f795d81a67c8b12d4ee86206049c7c7cb1d18cbd034cef"
          effect_ids: []
          event_digests:
            - "sha256:4c4300abaecf9836db7083aa225eeb753c71c2749cd39b262c34d8a4f89c85e3"
          mutation_id: "sha256:7b46e0106b6cd0365b5870248fb3face204d550e0cd5a3f9cf7e3fa52bdfaaa5"
        validation-resolution:sha256:fcdc8d4d52e26e47759d096c6982e558ee16d3b7ba287426b3597112ef849088:
          after_revision: 11
          aggregate_digest: "sha256:9bb4a0d298d24f1cc087c303f3d8a532b46e78baaf7d6ecb839438cd9dc076f1"
          before_revision: 10
          command_digest: "sha256:d562f6eedf39bc3a8a6621b8297811b76f71afd27b587f1015eb3d2290fc9ba8"
          effect_ids: []
          event_digests:
            - "sha256:25b374e2d2d60a99af86e5d514572d346d23af249e8f954af8bd8804f1355045"
          mutation_id: "validation-resolution:sha256:fcdc8d4d52e26e47759d096c6982e558ee16d3b7ba287426b3597112ef849088"
        validation:sha256:a59ef46c09bd38783fefdd897a716dacf3ce46b77416887e232dddac8dcd1869:
          after_revision: 10
          aggregate_digest: "sha256:90cbb157e144069ec959c9564771f76637a975840792ccd2a8bbd2fa6dc5ad0e"
          before_revision: 9
          command_digest: "sha256:8caee4ab5fec944cba00dc622ad74c431e9ec52816fc110aa7b068735df652d7"
          effect_ids: []
          event_digests:
            - "sha256:fc08d3ab917663a0f9a98354693f70660c1b5067ca0aa5560eb2ca127c2284d9"
          mutation_id: "validation:sha256:a59ef46c09bd38783fefdd897a716dacf3ce46b77416887e232dddac8dcd1869"
      plan_history: []
      revision: 11
      schema_version: 1
      state: "ACTIVE"
      work_items:
        framework-cleanup:
          attempt: 1
          claim_id: "sha256:355f73ea8dff8511bdb17b583fbbe50dda4e6bf8f04f135935f603b80bfd6853"
          definition:
            contract_digest: "sha256:e18be1e76d29abead392d534e0f26bc0f700a012394512ffad03afa0ec728f85"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "ci"
                - "dependencies"
                - "documentation"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - ".github"
                - ".prettierignore"
                - "CONTRIBUTING.md"
                - "bun.lock"
                - "docs"
                - "eslint.config.cjs"
                - "knip.json"
                - "package.json"
                - "packages"
                - "scripts"
                - "website"
            expected_outputs:
              - "framework-cleanup-evidence"
            id: "framework-cleanup"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:78867840b68d8824fd143ef3bc82c8c69370ea582e85e267475aacbd1a47dcdf"
              id: "framework-cleanup-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:06d86d4586ba514e43191bf940a4d4067cb235e667070f8e7b4a86aed159a8bd"
              task_id: "202609301724-M0S90X"
              work_item_id: "framework-cleanup"
          result_digest: "sha256:16861defa4c385b575b969b6e12eca389313f5029bdfe9dcb9a6b533f1be4121"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:b2b26785287cb36c617daaa61ecafa3eabf63dc230094f1d8ebdcb96bf4efe1b"
              - "sha256:f52402026fcbf6a39592b4eeb725db8b8ae208a3dc6d9a3c21dfc83b41113295"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:f229863e8ec8830873af4cbaf5c5b81aa091e7410b12d37df5073eaec8fd96fe"
              environment_digest: "sha256:e5474f09d7a78403a66524db4eaf394c7f9a3b75bef575add5dd56491ab5bf87"
              implementation_identity: "sha256:16861defa4c385b575b969b6e12eca389313f5029bdfe9dcb9a6b533f1be4121"
              toolchain_digest: "sha256:b2c350024c98b67af2e565e8224ece8deff2283460e86b84f7195e836781e7ba"
            observed_at: "2026-09-30T17:42:44.961Z"
            status: "PASSED"
    digest: "sha256:3987a472dfd11b32085a441eca2e96e75eb5a1d90396ecebff48dab31eff5101"
    documents:
      contracts:
        sha256:e18be1e76d29abead392d534e0f26bc0f700a012394512ffad03afa0ec728f85:
          acceptance_criteria:
            - "No website workspace, deployment workflows, site dependency installation or site build commands remain in framework automation."
            - "Documentation generation and validation remain functional; the independent public website is connected only by links."
            - "Fresh typecheck, documentation checks and affected tests pass. Changed source is formatted and linted. No unrelated user changes or staging payload are included."
          objective: "Reapply only the approved framework implementation diff from 1053fee6f16c70a25154d54d4664ccfe609b5082 to 7565a4d744a51551e74ae21a11fb9888fb1d3c47, excluding .agentplane artifacts. Remove website builds and preserve code-derived documentation. Repair any directly related validation failures and provide fresh evidence."
          role: "EXECUTOR"
          verification_commands:
            - "git diff --check"
            - "bun run typecheck"
            - "bun run docs:cli:check"
            - "bun run docs:check"
            - "bun run docs:scripts:check"
            - "bun run workflows:command-check"
      intent:
        context: "Recover 202609301619-2GPBMT by reapplying its preserved framework cleanup onto main. The public basilisk-labs/agentplane-web repository is already deployed independently at agentplane.org. Retain documentation sources and code-derived reference generation in agentplane; remove website source, dependencies, scripts and CI. Reapply only implementation changes from 7565a4d744a51551e74ae21a11fb9888fb1d3c47 relative to 1053fee6f16c70a25154d54d4664ccfe609b5082, excluding .agentplane task artifacts. Run fresh checks and evaluation, then publish the framework PR. Do not inherit historical passing review. Use explicit scope roots to avoid the native empty-root repository-evidence bug."
        objective: "Integrate the independent website extraction from 202609301619-2GPBMT"
    events:
      -
        command_digest: "sha256:996a9f33f753aad3473038e6f3be699939f3692f551ad11c66e1ffc392905a92"
        id: "capture:202609301724-M0S90X:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609301724-M0S90X"
        occurred_at: "2026-09-30T17:24:14.119Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609301724-M0S90X"
        task_revision: 1
      -
        command_digest: "sha256:753cc56043b65417c2681b38806cb422afd643bbf30a1df045f0cefa05a96db9"
        id: "result:sha256:3a447801f953f599cc6b8942f5acfab3cfc1166bf6cb48a31e0147299b66ec1f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:3a447801f953f599cc6b8942f5acfab3cfc1166bf6cb48a31e0147299b66ec1f"
        occurred_at: "2026-09-30T17:25:32.918Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609301724-M0S90X"
        task_revision: 2
      -
        command_digest: "sha256:0e818db4392a1ccab1f795d81a67c8b12d4ee86206049c7c7cb1d18cbd034cef"
        id: "sha256:7b46e0106b6cd0365b5870248fb3face204d550e0cd5a3f9cf7e3fa52bdfaaa5:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:7b46e0106b6cd0365b5870248fb3face204d550e0cd5a3f9cf7e3fa52bdfaaa5"
        occurred_at: "2026-09-30T17:25:46.829Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609301724-M0S90X"
        task_revision: 3
      -
        command_digest: "sha256:aa2f29f458b3551f3abe6175841e3e3461174913adc76ec488992fcf7ce782dd"
        id: "kernel_work_item_materialization_required:sha256:92cc0c0adfe17d421e0fd2742a158b4d2d75f272471c808f6327e6c4fb9de4f4:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:92cc0c0adfe17d421e0fd2742a158b4d2d75f272471c808f6327e6c4fb9de4f4:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:25:59.790Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609301724-M0S90X"
        task_revision: 4
      -
        command_digest: "sha256:92133d877ada9b7cc69ae00501e307c00d4338b9ca951678e5073e7253d3ba38"
        id: "kernel_work_item_claim_required:sha256:648e4d0bef65ed1316730291e4276440df4b0abd1d3c786c0fb07ac86c9fea65:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:648e4d0bef65ed1316730291e4276440df4b0abd1d3c786c0fb07ac86c9fea65:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:26:30.532Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609301724-M0S90X"
        task_revision: 5
      -
        command_digest: "sha256:428c64d9a29a1129b3da67c8d98b335a0066007995cf72540af3229a7947fdc9"
        id: "kernel_work_item_execution_required:sha256:b1a56b1d9ee418401eff368f22a1c15886e30777149c38d484f067e32e3ab560:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b1a56b1d9ee418401eff368f22a1c15886e30777149c38d484f067e32e3ab560:sha256:d2b7ce2196b8209cdff59c0afc82ef6acf3788525921c170b8369c952ef32ea9"
        occurred_at: "2026-09-30T17:27:49.832Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609301724-M0S90X"
        task_revision: 6
      -
        command_digest: "sha256:d3c60c6c1c40b8167e3f22080f4f07b93568c831d6c739cd02e375ac7d355d46"
        id: "sha256:48f6fd14738674b73b6e8e218875af0eab49ceeac2bfea28266e73fa1b31c3a5:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:48f6fd14738674b73b6e8e218875af0eab49ceeac2bfea28266e73fa1b31c3a5"
        occurred_at: "2026-09-30T17:38:04.730Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609301724-M0S90X"
        task_revision: 7
      -
        command_digest: "sha256:7a21d95475e0da48180d40b6e6d6f1362983be9f3fcef1121ed90950c4f73ee0"
        id: "result:sha256:fb8a6356935700c68bb7029b445fa189e3eb7ed8e5a3360a678b5bc1c12424d1:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:fb8a6356935700c68bb7029b445fa189e3eb7ed8e5a3360a678b5bc1c12424d1"
        occurred_at: "2026-09-30T17:38:56.743Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609301724-M0S90X"
        task_revision: 8
      -
        command_digest: "sha256:c3baba18e0d5024d8ed242ea88866dde4e29f88b050b94d3750c4f53693558ba"
        id: "kernel_work_item_inspection_required:sha256:6af88b5f7bdda5a5d86f6bc0e1c06e5e20dcf117e58311e0eaa9cc7f44b6306a:sha256:06d86d4586ba514e43191bf940a4d4067cb235e667070f8e7b4a86aed159a8bd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:6af88b5f7bdda5a5d86f6bc0e1c06e5e20dcf117e58311e0eaa9cc7f44b6306a:sha256:06d86d4586ba514e43191bf940a4d4067cb235e667070f8e7b4a86aed159a8bd"
        occurred_at: "2026-09-30T17:39:35.799Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609301724-M0S90X"
        task_revision: 9
      -
        command_digest: "sha256:8caee4ab5fec944cba00dc622ad74c431e9ec52816fc110aa7b068735df652d7"
        id: "validation:sha256:a59ef46c09bd38783fefdd897a716dacf3ce46b77416887e232dddac8dcd1869:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a59ef46c09bd38783fefdd897a716dacf3ce46b77416887e232dddac8dcd1869"
        occurred_at: "2026-09-30T17:43:11.842Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609301724-M0S90X"
        task_revision: 10
      -
        command_digest: "sha256:d562f6eedf39bc3a8a6621b8297811b76f71afd27b587f1015eb3d2290fc9ba8"
        id: "validation-resolution:sha256:fcdc8d4d52e26e47759d096c6982e558ee16d3b7ba287426b3597112ef849088:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:fcdc8d4d52e26e47759d096c6982e558ee16d3b7ba287426b3597112ef849088"
        occurred_at: "2026-09-30T17:43:31.491Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609301724-M0S90X"
        task_revision: 11
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Integrate the independent website extraction from 202609301619-2GPBMT

Recover 202609301619-2GPBMT by reapplying its preserved framework cleanup onto main. The public basilisk-labs/agentplane-web repository is already deployed independently at agentplane.org. Retain documentation sources and code-derived reference generation in agentplane; remove website source, dependencies, scripts and CI. Reapply only implementation changes from 7565a4d744a51551e74ae21a11fb9888fb1d3c47 relative to 1053fee6f16c70a25154d54d4664ccfe609b5082, excluding .agentplane task artifacts. Run fresh checks and evaluation, then publish the framework PR. Do not inherit historical passing review. Use explicit scope roots to avoid the native empty-root repository-evidence bug.

## Scope

- In scope: Recover 202609301619-2GPBMT by reapplying its preserved framework cleanup onto main. The public basilisk-labs/agentplane-web repository is already deployed independently at agentplane.org. Retain documentation sources and code-derived reference generation in agentplane; remove website source, dependencies, scripts and CI. Reapply only implementation changes from 7565a4d744a51551e74ae21a11fb9888fb1d3c47 relative to 1053fee6f16c70a25154d54d4664ccfe609b5082, excluding .agentplane task artifacts. Run fresh checks and evaluation, then publish the framework PR. Do not inherit historical passing review. Use explicit scope roots to avoid the native empty-root repository-evidence bug.
- Out of scope: unrelated refactors not required for "Integrate the independent website extraction from 202609301619-2GPBMT".

## Plan

1. Execute approved WorkItem framework-cleanup.

## Verify Steps

PLANNER fallback scaffold for "Integrate the independent website extraction from 202609301619-2GPBMT". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Integrate the independent website extraction from 202609301619-2GPBMT". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
