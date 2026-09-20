---
id: "202609200336-EJTVES"
title: "Replace generated per-document social images with the standard static site image"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "website"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run docs:scripts:check"
  - "bun run docs:site:check"
  - "bun run release:check"
plan_approval:
  state: "approved"
  updated_at: "2026-09-20T03:51:15.017Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-20T04:06:42.240Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-20T03:51:15.017Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "a7e41553ba7829874bca99117f3bf1ad4cf3065c"
  review_identity_digest: "sha256:5046804f7f6753c1d4339aae309c334d5d4c8405445d40a1d3ff6fa47b892ac6"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609200336-EJTVES/7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1/quality-report.json"
  findings:
    - "PASS: package scripts, DocItem metadata override, generator source, generated image tree, generated scripts documentation, and release notes are coherently updated; the standard Docusaurus img/og-image.png configuration remains present."
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
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
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
    changed_components:
      - "docs"
      - "package.json"
      - "scripts"
      - "website"
    changed_paths:
      - "docs/releases/v0.7.10.md"
      - "package.json"
      - "scripts/README.md"
      - "website/package.json"
      - "website/scripts/generate-social-images.mjs"
      - "website/src/theme/DocItem/Layout/index.tsx"
      - "website/static/img/social/docs.png"
      - "website/static/img/social/docs/adr/0001-zod-config-parity.png"
      - "website/static/img/social/docs/adr/0002-adr-process.png"
      - "website/static/img/social/docs/adr/0003-refactor-sequencing.png"
      - "website/static/img/social/docs/adr/0004-keep-custom-cli-stack.png"
      - "website/static/img/social/docs/adr/0005-defer-biome-migration.png"
      - "website/static/img/social/docs/adr/0006-no-effect-fp-ts-migration.png"
      - "website/static/img/social/docs/adr/0007-freeze-yaml-parser-stack.png"
      - "website/static/img/social/docs/adr/0008-keep-yauzl-for-zip-validation.png"
      - "website/static/img/social/docs/adr/0009-recipes-index-signing-algorithm-policy.png"
      - "website/static/img/social/docs/adr/0010-core-root-export-compatibility.png"
      - "website/static/img/social/docs/adr/0011-v0.3-surface-freeze.png"
      - "website/static/img/social/docs/adr/0012-v0.4-surface-transition.png"
      - "website/static/img/social/docs/adr/0013-zod-contract-ssot.png"
      - "website/static/img/social/docs/adr/0014-task-execution-authority.png"
      - "website/static/img/social/docs/adr/0015-task-workspace-isolation.png"
      - "website/static/img/social/docs/adr/0016-serialized-direct-integration.png"
      - "website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
      - "website/static/img/social/docs/archive/v0-3/cli-bug-ledger-v0-3-x.png"
      - "website/static/img/social/docs/archive/v0-3/framework-refactor-program.png"
      - "website/static/img/social/docs/compare.png"
      - "website/static/img/social/docs/concepts/agent-workflows.png"
      - "website/static/img/social/docs/concepts/context-engineering.png"
      - "website/static/img/social/docs/concepts/harness-engineering.png"
      - "website/static/img/social/docs/concepts/traces.png"
      - "website/static/img/social/docs/context.png"
      - "website/static/img/social/docs/context/agent-guide.png"
      - "website/static/img/social/docs/context/files.png"
      - "website/static/img/social/docs/context/ingest.png"
      - "website/static/img/social/docs/context/modes.png"
      - "website/static/img/social/docs/context/quickstart.png"
      - "website/static/img/social/docs/context/review.png"
      - "website/static/img/social/docs/context/troubleshooting.png"
      - "website/static/img/social/docs/contributing/citation-guidelines.png"
      - "website/static/img/social/docs/developer/agent-change-record-implementation.png"
      - "website/static/img/social/docs/developer/architecture.png"
      - "website/static/img/social/docs/developer/blueprints.png"
      - "website/static/img/social/docs/developer/cli-contract.png"
      - "website/static/img/social/docs/developer/cli-help-json.png"
      - "website/static/img/social/docs/developer/close-taxonomy.png"
      - "website/static/img/social/docs/developer/cloud-backend-integration-plan.png"
      - "website/static/img/social/docs/developer/code-quality.png"
      - "website/static/img/social/docs/developer/contributing.png"
      - "website/static/img/social/docs/developer/design-principles.png"
      - "website/static/img/social/docs/developer/documentation-information-architecture.png"
      - "website/static/img/social/docs/developer/evaluation-and-recursive-improvement.png"
      - "website/static/img/social/docs/developer/harness-dev.png"
      - "website/static/img/social/docs/developer/harness-engineering.png"
      - "website/static/img/social/docs/developer/incident-archive.png"
      - "website/static/img/social/docs/developer/local-context.png"
      - "website/static/img/social/docs/developer/modular-prompt-assembly.png"
      - "website/static/img/social/docs/developer/module-topology.png"
      - "website/static/img/social/docs/developer/performance-baselines.png"
      - "website/static/img/social/docs/developer/project-layout.png"
      - "website/static/img/social/docs/developer/recipes-development.png"
      - "website/static/img/social/docs/developer/recipes-how-it-works.png"
      - "website/static/img/social/docs/developer/recipes-safety.png"
      - "website/static/img/social/docs/developer/recipes-spec.png"
      - "website/static/img/social/docs/developer/release-and-publishing.png"
      - "website/static/img/social/docs/developer/schema-validation-strategy.png"
      - "website/static/img/social/docs/developer/task-execution-authority.png"
      - "website/static/img/social/docs/developer/testing-and-quality.png"
      - "website/static/img/social/docs/developer/typescript-esm-imports.png"
      - "website/static/img/social/docs/developer/verification-contract.png"
      - "website/static/img/social/docs/developer/website-success-metrics.png"
      - "website/static/img/social/docs/developer/workflow-contract.png"
      - "website/static/img/social/docs/developer/workflow-harness-test-matrix.png"
      - "website/static/img/social/docs/examples/debug-agent-run-with-traces.png"
      - "website/static/img/social/docs/examples/export-traces.png"
      - "website/static/img/social/docs/help/broken-workflow-runbook.png"
      - "website/static/img/social/docs/help/glossary.png"
      - "website/static/img/social/docs/help/legacy-upgrade-recovery.png"
      - "website/static/img/social/docs/help/troubleshooting-by-symptom.png"
      - "website/static/img/social/docs/help/troubleshooting.png"
      - "website/static/img/social/docs/internal/git-mutation-model.png"
      - "website/static/img/social/docs/internal/v0.6.22-refactor-plan.png"
      - "website/static/img/social/docs/internal/v0.7-agent-efficiency-baseline.png"
      - "website/static/img/social/docs/internal/v0.7-refactor-plan.png"
      - "website/static/img/social/docs/listing.png"
      - "website/static/img/social/docs/manifesto.png"
      - "website/static/img/social/docs/recipes.png"
      - "website/static/img/social/docs/recipes/docs-update.png"
      - "website/static/img/social/docs/recipes/hermes-agentplane.png"
      - "website/static/img/social/docs/recipes/security-review.png"
      - "website/static/img/social/docs/recipes/tdd.png"
      - "website/static/img/social/docs/reference/acr-schema.png"
      - "website/static/img/social/docs/reference/acr.png"
      - "website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
      - "website/static/img/social/docs/reference/cli.png"
      - "website/static/img/social/docs/reference/evidence.png"
      - "website/static/img/social/docs/reference/generated-reference.png"
      - "website/static/img/social/docs/reference/runner-handoff.png"
      - "website/static/img/social/docs/reference/task-observations.png"
      - "website/static/img/social/docs/reference/trace-schema.png"
      - "website/static/img/social/docs/reference/workflow-file.png"
      - "website/static/img/social/docs/releases.png"
      - "website/static/img/social/docs/releases/TEMPLATE.png"
      - "website/static/img/social/docs/releases/v0.1.3.png"
      - "website/static/img/social/docs/releases/v0.1.4.png"
      - "website/static/img/social/docs/releases/v0.1.5.png"
      - "website/static/img/social/docs/releases/v0.1.6.png"
      - "website/static/img/social/docs/releases/v0.1.7.png"
      - "website/static/img/social/docs/releases/v0.1.8.png"
      - "website/static/img/social/docs/releases/v0.1.9.png"
      - "website/static/img/social/docs/releases/v0.2.0.png"
      - "website/static/img/social/docs/releases/v0.2.1.png"
      - "website/static/img/social/docs/releases/v0.2.10.png"
      - "website/static/img/social/docs/releases/v0.2.11.png"
      - "website/static/img/social/docs/releases/v0.2.12.png"
      - "website/static/img/social/docs/releases/v0.2.13.png"
      - "website/static/img/social/docs/releases/v0.2.14.png"
      - "website/static/img/social/docs/releases/v0.2.15.png"
      - "website/static/img/social/docs/releases/v0.2.16.png"
      - "website/static/img/social/docs/releases/v0.2.17.png"
      - "website/static/img/social/docs/releases/v0.2.18.png"
      - "website/static/img/social/docs/releases/v0.2.19.png"
      - "website/static/img/social/docs/releases/v0.2.2.png"
      - "website/static/img/social/docs/releases/v0.2.20.png"
      - "website/static/img/social/docs/releases/v0.2.21.png"
      - "website/static/img/social/docs/releases/v0.2.22.png"
      - "website/static/img/social/docs/releases/v0.2.23.png"
      - "website/static/img/social/docs/releases/v0.2.24.png"
      - "website/static/img/social/docs/releases/v0.2.25.png"
      - "website/static/img/social/docs/releases/v0.2.26.png"
      - "website/static/img/social/docs/releases/v0.2.3.png"
      - "website/static/img/social/docs/releases/v0.2.4.png"
      - "website/static/img/social/docs/releases/v0.2.5.png"
      - "website/static/img/social/docs/releases/v0.2.6.png"
      - "website/static/img/social/docs/releases/v0.2.7.png"
      - "website/static/img/social/docs/releases/v0.2.8.png"
      - "website/static/img/social/docs/releases/v0.2.9.png"
      - "website/static/img/social/docs/releases/v0.3.0.png"
      - "website/static/img/social/docs/releases/v0.3.1.png"
      - "website/static/img/social/docs/releases/v0.3.10.png"
      - "website/static/img/social/docs/releases/v0.3.11.png"
      - "website/static/img/social/docs/releases/v0.3.12.png"
      - "website/static/img/social/docs/releases/v0.3.13.png"
      - "website/static/img/social/docs/releases/v0.3.14.png"
      - "website/static/img/social/docs/releases/v0.3.15.png"
      - "website/static/img/social/docs/releases/v0.3.16.png"
      - "website/static/img/social/docs/releases/v0.3.17.png"
      - "website/static/img/social/docs/releases/v0.3.18.png"
      - "website/static/img/social/docs/releases/v0.3.19.png"
      - "website/static/img/social/docs/releases/v0.3.2.png"
      - "website/static/img/social/docs/releases/v0.3.20.png"
      - "website/static/img/social/docs/releases/v0.3.21.png"
      - "website/static/img/social/docs/releases/v0.3.22.png"
      - "website/static/img/social/docs/releases/v0.3.23.png"
      - "website/static/img/social/docs/releases/v0.3.24.png"
      - "website/static/img/social/docs/releases/v0.3.25.png"
      - "website/static/img/social/docs/releases/v0.3.26.png"
      - "website/static/img/social/docs/releases/v0.3.27.png"
      - "website/static/img/social/docs/releases/v0.3.28.png"
      - "website/static/img/social/docs/releases/v0.3.29.png"
      - "website/static/img/social/docs/releases/v0.3.3.png"
      - "website/static/img/social/docs/releases/v0.3.4.png"
      - "website/static/img/social/docs/releases/v0.3.5.png"
      - "website/static/img/social/docs/releases/v0.3.6.png"
      - "website/static/img/social/docs/releases/v0.3.7.png"
      - "website/static/img/social/docs/releases/v0.3.8.png"
      - "website/static/img/social/docs/releases/v0.3.9.png"
      - "website/static/img/social/docs/releases/v0.4.0.png"
      - "website/static/img/social/docs/releases/v0.4.1.png"
      - "website/static/img/social/docs/releases/v0.4.2.png"
      - "website/static/img/social/docs/releases/v0.4.3.png"
      - "website/static/img/social/docs/releases/v0.4.4.png"
      - "website/static/img/social/docs/releases/v0.5.0-rc.1.png"
      - "website/static/img/social/docs/releases/v0.5.0.png"
      - "website/static/img/social/docs/releases/v0.6.0.png"
      - "website/static/img/social/docs/releases/v0.6.1.png"
      - "website/static/img/social/docs/releases/v0.6.10.png"
      - "website/static/img/social/docs/releases/v0.6.11.png"
      - "website/static/img/social/docs/releases/v0.6.12.png"
      - "website/static/img/social/docs/releases/v0.6.13.png"
      - "website/static/img/social/docs/releases/v0.6.14.png"
      - "website/static/img/social/docs/releases/v0.6.15.png"
      - "website/static/img/social/docs/releases/v0.6.16.png"
      - "website/static/img/social/docs/releases/v0.6.17.png"
      - "website/static/img/social/docs/releases/v0.6.18.png"
      - "website/static/img/social/docs/releases/v0.6.19.png"
      - "website/static/img/social/docs/releases/v0.6.2.png"
      - "website/static/img/social/docs/releases/v0.6.20.png"
      - "website/static/img/social/docs/releases/v0.6.21.png"
      - "website/static/img/social/docs/releases/v0.6.22.png"
      - "website/static/img/social/docs/releases/v0.6.23.png"
      - "website/static/img/social/docs/releases/v0.6.24.png"
      - "website/static/img/social/docs/releases/v0.6.3.png"
      - "website/static/img/social/docs/releases/v0.6.4.png"
      - "website/static/img/social/docs/releases/v0.6.5.png"
      - "website/static/img/social/docs/releases/v0.6.6.png"
      - "website/static/img/social/docs/releases/v0.6.7.png"
      - "website/static/img/social/docs/releases/v0.6.8.png"
      - "website/static/img/social/docs/releases/v0.6.9.png"
      - "website/static/img/social/docs/releases/v0.7.0.png"
      - "website/static/img/social/docs/releases/v0.7.1.png"
      - "website/static/img/social/docs/releases/v0.7.10.png"
      - "website/static/img/social/docs/releases/v0.7.2.png"
      - "website/static/img/social/docs/releases/v0.7.3.png"
      - "website/static/img/social/docs/releases/v0.7.4.png"
      - "website/static/img/social/docs/releases/v0.7.5.png"
      - "website/static/img/social/docs/releases/v0.7.6.png"
      - "website/static/img/social/docs/releases/v0.7.7.png"
      - "website/static/img/social/docs/releases/v0.7.8-evidence/preparation.png"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
      - "website/static/img/social/docs/releases/v0.7.9.png"
      - "website/static/img/social/docs/showcase.png"
      - "website/static/img/social/docs/start/first-local-run.png"
      - "website/static/img/social/docs/start/quickstart.png"
      - "website/static/img/social/docs/start/what-agentplane-writes.png"
      - "website/static/img/social/docs/user/agent-bootstrap.generated.png"
      - "website/static/img/social/docs/user/agent-discovery.png"
      - "website/static/img/social/docs/user/agents.png"
      - "website/static/img/social/docs/user/branching-and-pr-artifacts.png"
      - "website/static/img/social/docs/user/breaking-changes.png"
      - "website/static/img/social/docs/user/cli-reference.generated.png"
      - "website/static/img/social/docs/user/commands.png"
      - "website/static/img/social/docs/user/configuration.png"
      - "website/static/img/social/docs/user/indexing-and-webmaster-operations.png"
      - "website/static/img/social/docs/user/local-context.png"
      - "website/static/img/social/docs/user/overview.png"
      - "website/static/img/social/docs/user/prerequisites.png"
      - "website/static/img/social/docs/user/setup.png"
      - "website/static/img/social/docs/user/task-lifecycle.png"
      - "website/static/img/social/docs/user/tasks-and-backends.png"
      - "website/static/img/social/docs/user/v0-7-migration.png"
      - "website/static/img/social/docs/user/website-ia.png"
      - "website/static/img/social/docs/user/workflow-migration.png"
      - "website/static/img/social/docs/user/workflow.png"
      - "website/static/img/social/docs/workflow-guides.png"
      - "website/static/img/social/docs/workflow-guides/aider.png"
      - "website/static/img/social/docs/workflow-guides/branch-pr.png"
      - "website/static/img/social/docs/workflow-guides/claude-code.png"
      - "website/static/img/social/docs/workflow-guides/codex.png"
      - "website/static/img/social/docs/workflow-guides/cursor.png"
      - "website/static/img/social/docs/workflow-guides/github-actions.png"
      - "website/static/img/social/docs/workflow-guides/hermes-kanban.png"
      - "website/static/img/social/manifest.json"
    external_effects: []
    repository_effects:
      - "dependencies"
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "source_code"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
        result: "pass"
      -
        id: "recorded-check-14"
        result: "pass"
      -
        id: "recorded-check-15"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "observed_effect_dependencies"
    - "observed_effect_release_metadata"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:c9a44ebcae058401d5dc3962e8013b6a9081acdd6a20f7017b0acc8144853811"
      escalation_reasons:
        - "central_path:package.json"
        - "effect_dependencies"
        - "effect_release_metadata"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "package.json"
          - "scripts"
          - "website"
        changed_files:
          - "docs/releases/v0.7.10.md"
          - "package.json"
          - "scripts/README.md"
          - "website/package.json"
          - "website/scripts/generate-social-images.mjs"
          - "website/src/theme/DocItem/Layout/index.tsx"
          - "website/static/img/social/docs.png"
          - "website/static/img/social/docs/adr/0001-zod-config-parity.png"
          - "website/static/img/social/docs/adr/0002-adr-process.png"
          - "website/static/img/social/docs/adr/0003-refactor-sequencing.png"
          - "website/static/img/social/docs/adr/0004-keep-custom-cli-stack.png"
          - "website/static/img/social/docs/adr/0005-defer-biome-migration.png"
          - "website/static/img/social/docs/adr/0006-no-effect-fp-ts-migration.png"
          - "website/static/img/social/docs/adr/0007-freeze-yaml-parser-stack.png"
          - "website/static/img/social/docs/adr/0008-keep-yauzl-for-zip-validation.png"
          - "website/static/img/social/docs/adr/0009-recipes-index-signing-algorithm-policy.png"
          - "website/static/img/social/docs/adr/0010-core-root-export-compatibility.png"
          - "website/static/img/social/docs/adr/0011-v0.3-surface-freeze.png"
          - "website/static/img/social/docs/adr/0012-v0.4-surface-transition.png"
          - "website/static/img/social/docs/adr/0013-zod-contract-ssot.png"
          - "website/static/img/social/docs/adr/0014-task-execution-authority.png"
          - "website/static/img/social/docs/adr/0015-task-workspace-isolation.png"
          - "website/static/img/social/docs/adr/0016-serialized-direct-integration.png"
          - "website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
          - "website/static/img/social/docs/archive/v0-3/cli-bug-ledger-v0-3-x.png"
          - "website/static/img/social/docs/archive/v0-3/framework-refactor-program.png"
          - "website/static/img/social/docs/compare.png"
          - "website/static/img/social/docs/concepts/agent-workflows.png"
          - "website/static/img/social/docs/concepts/context-engineering.png"
          - "website/static/img/social/docs/concepts/harness-engineering.png"
          - "website/static/img/social/docs/concepts/traces.png"
          - "website/static/img/social/docs/context.png"
          - "website/static/img/social/docs/context/agent-guide.png"
          - "website/static/img/social/docs/context/files.png"
          - "website/static/img/social/docs/context/ingest.png"
          - "website/static/img/social/docs/context/modes.png"
          - "website/static/img/social/docs/context/quickstart.png"
          - "website/static/img/social/docs/context/review.png"
          - "website/static/img/social/docs/context/troubleshooting.png"
          - "website/static/img/social/docs/contributing/citation-guidelines.png"
          - "website/static/img/social/docs/developer/agent-change-record-implementation.png"
          - "website/static/img/social/docs/developer/architecture.png"
          - "website/static/img/social/docs/developer/blueprints.png"
          - "website/static/img/social/docs/developer/cli-contract.png"
          - "website/static/img/social/docs/developer/cli-help-json.png"
          - "website/static/img/social/docs/developer/close-taxonomy.png"
          - "website/static/img/social/docs/developer/cloud-backend-integration-plan.png"
          - "website/static/img/social/docs/developer/code-quality.png"
          - "website/static/img/social/docs/developer/contributing.png"
          - "website/static/img/social/docs/developer/design-principles.png"
          - "website/static/img/social/docs/developer/documentation-information-architecture.png"
          - "website/static/img/social/docs/developer/evaluation-and-recursive-improvement.png"
          - "website/static/img/social/docs/developer/harness-dev.png"
          - "website/static/img/social/docs/developer/harness-engineering.png"
          - "website/static/img/social/docs/developer/incident-archive.png"
          - "website/static/img/social/docs/developer/local-context.png"
          - "website/static/img/social/docs/developer/modular-prompt-assembly.png"
          - "website/static/img/social/docs/developer/module-topology.png"
          - "website/static/img/social/docs/developer/performance-baselines.png"
          - "website/static/img/social/docs/developer/project-layout.png"
          - "website/static/img/social/docs/developer/recipes-development.png"
          - "website/static/img/social/docs/developer/recipes-how-it-works.png"
          - "website/static/img/social/docs/developer/recipes-safety.png"
          - "website/static/img/social/docs/developer/recipes-spec.png"
          - "website/static/img/social/docs/developer/release-and-publishing.png"
          - "website/static/img/social/docs/developer/schema-validation-strategy.png"
          - "website/static/img/social/docs/developer/task-execution-authority.png"
          - "website/static/img/social/docs/developer/testing-and-quality.png"
          - "website/static/img/social/docs/developer/typescript-esm-imports.png"
          - "website/static/img/social/docs/developer/verification-contract.png"
          - "website/static/img/social/docs/developer/website-success-metrics.png"
          - "website/static/img/social/docs/developer/workflow-contract.png"
          - "website/static/img/social/docs/developer/workflow-harness-test-matrix.png"
          - "website/static/img/social/docs/examples/debug-agent-run-with-traces.png"
          - "website/static/img/social/docs/examples/export-traces.png"
          - "website/static/img/social/docs/help/broken-workflow-runbook.png"
          - "website/static/img/social/docs/help/glossary.png"
          - "website/static/img/social/docs/help/legacy-upgrade-recovery.png"
          - "website/static/img/social/docs/help/troubleshooting-by-symptom.png"
          - "website/static/img/social/docs/help/troubleshooting.png"
          - "website/static/img/social/docs/internal/git-mutation-model.png"
          - "website/static/img/social/docs/internal/v0.6.22-refactor-plan.png"
          - "website/static/img/social/docs/internal/v0.7-agent-efficiency-baseline.png"
          - "website/static/img/social/docs/internal/v0.7-refactor-plan.png"
          - "website/static/img/social/docs/listing.png"
          - "website/static/img/social/docs/manifesto.png"
          - "website/static/img/social/docs/recipes.png"
          - "website/static/img/social/docs/recipes/docs-update.png"
          - "website/static/img/social/docs/recipes/hermes-agentplane.png"
          - "website/static/img/social/docs/recipes/security-review.png"
          - "website/static/img/social/docs/recipes/tdd.png"
          - "website/static/img/social/docs/reference/acr-schema.png"
          - "website/static/img/social/docs/reference/acr.png"
          - "website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
          - "website/static/img/social/docs/reference/cli.png"
          - "website/static/img/social/docs/reference/evidence.png"
          - "website/static/img/social/docs/reference/generated-reference.png"
          - "website/static/img/social/docs/reference/runner-handoff.png"
          - "website/static/img/social/docs/reference/task-observations.png"
          - "website/static/img/social/docs/reference/trace-schema.png"
          - "website/static/img/social/docs/reference/workflow-file.png"
          - "website/static/img/social/docs/releases.png"
          - "website/static/img/social/docs/releases/TEMPLATE.png"
          - "website/static/img/social/docs/releases/v0.1.3.png"
          - "website/static/img/social/docs/releases/v0.1.4.png"
          - "website/static/img/social/docs/releases/v0.1.5.png"
          - "website/static/img/social/docs/releases/v0.1.6.png"
          - "website/static/img/social/docs/releases/v0.1.7.png"
          - "website/static/img/social/docs/releases/v0.1.8.png"
          - "website/static/img/social/docs/releases/v0.1.9.png"
          - "website/static/img/social/docs/releases/v0.2.0.png"
          - "website/static/img/social/docs/releases/v0.2.1.png"
          - "website/static/img/social/docs/releases/v0.2.10.png"
          - "website/static/img/social/docs/releases/v0.2.11.png"
          - "website/static/img/social/docs/releases/v0.2.12.png"
          - "website/static/img/social/docs/releases/v0.2.13.png"
          - "website/static/img/social/docs/releases/v0.2.14.png"
          - "website/static/img/social/docs/releases/v0.2.15.png"
          - "website/static/img/social/docs/releases/v0.2.16.png"
          - "website/static/img/social/docs/releases/v0.2.17.png"
          - "website/static/img/social/docs/releases/v0.2.18.png"
          - "website/static/img/social/docs/releases/v0.2.19.png"
          - "website/static/img/social/docs/releases/v0.2.2.png"
          - "website/static/img/social/docs/releases/v0.2.20.png"
          - "website/static/img/social/docs/releases/v0.2.21.png"
          - "website/static/img/social/docs/releases/v0.2.22.png"
          - "website/static/img/social/docs/releases/v0.2.23.png"
          - "website/static/img/social/docs/releases/v0.2.24.png"
          - "website/static/img/social/docs/releases/v0.2.25.png"
          - "website/static/img/social/docs/releases/v0.2.26.png"
          - "website/static/img/social/docs/releases/v0.2.3.png"
          - "website/static/img/social/docs/releases/v0.2.4.png"
          - "website/static/img/social/docs/releases/v0.2.5.png"
          - "website/static/img/social/docs/releases/v0.2.6.png"
          - "website/static/img/social/docs/releases/v0.2.7.png"
          - "website/static/img/social/docs/releases/v0.2.8.png"
          - "website/static/img/social/docs/releases/v0.2.9.png"
          - "website/static/img/social/docs/releases/v0.3.0.png"
          - "website/static/img/social/docs/releases/v0.3.1.png"
          - "website/static/img/social/docs/releases/v0.3.10.png"
          - "website/static/img/social/docs/releases/v0.3.11.png"
          - "website/static/img/social/docs/releases/v0.3.12.png"
          - "website/static/img/social/docs/releases/v0.3.13.png"
          - "website/static/img/social/docs/releases/v0.3.14.png"
          - "website/static/img/social/docs/releases/v0.3.15.png"
          - "website/static/img/social/docs/releases/v0.3.16.png"
          - "website/static/img/social/docs/releases/v0.3.17.png"
          - "website/static/img/social/docs/releases/v0.3.18.png"
          - "website/static/img/social/docs/releases/v0.3.19.png"
          - "website/static/img/social/docs/releases/v0.3.2.png"
          - "website/static/img/social/docs/releases/v0.3.20.png"
          - "website/static/img/social/docs/releases/v0.3.21.png"
          - "website/static/img/social/docs/releases/v0.3.22.png"
          - "website/static/img/social/docs/releases/v0.3.23.png"
          - "website/static/img/social/docs/releases/v0.3.24.png"
          - "website/static/img/social/docs/releases/v0.3.25.png"
          - "website/static/img/social/docs/releases/v0.3.26.png"
          - "website/static/img/social/docs/releases/v0.3.27.png"
          - "website/static/img/social/docs/releases/v0.3.28.png"
          - "website/static/img/social/docs/releases/v0.3.29.png"
          - "website/static/img/social/docs/releases/v0.3.3.png"
          - "website/static/img/social/docs/releases/v0.3.4.png"
          - "website/static/img/social/docs/releases/v0.3.5.png"
          - "website/static/img/social/docs/releases/v0.3.6.png"
          - "website/static/img/social/docs/releases/v0.3.7.png"
          - "website/static/img/social/docs/releases/v0.3.8.png"
          - "website/static/img/social/docs/releases/v0.3.9.png"
          - "website/static/img/social/docs/releases/v0.4.0.png"
          - "website/static/img/social/docs/releases/v0.4.1.png"
          - "website/static/img/social/docs/releases/v0.4.2.png"
          - "website/static/img/social/docs/releases/v0.4.3.png"
          - "website/static/img/social/docs/releases/v0.4.4.png"
          - "website/static/img/social/docs/releases/v0.5.0-rc.1.png"
          - "website/static/img/social/docs/releases/v0.5.0.png"
          - "website/static/img/social/docs/releases/v0.6.0.png"
          - "website/static/img/social/docs/releases/v0.6.1.png"
          - "website/static/img/social/docs/releases/v0.6.10.png"
          - "website/static/img/social/docs/releases/v0.6.11.png"
          - "website/static/img/social/docs/releases/v0.6.12.png"
          - "website/static/img/social/docs/releases/v0.6.13.png"
          - "website/static/img/social/docs/releases/v0.6.14.png"
          - "website/static/img/social/docs/releases/v0.6.15.png"
          - "website/static/img/social/docs/releases/v0.6.16.png"
          - "website/static/img/social/docs/releases/v0.6.17.png"
          - "website/static/img/social/docs/releases/v0.6.18.png"
          - "website/static/img/social/docs/releases/v0.6.19.png"
          - "website/static/img/social/docs/releases/v0.6.2.png"
          - "website/static/img/social/docs/releases/v0.6.20.png"
          - "website/static/img/social/docs/releases/v0.6.21.png"
          - "website/static/img/social/docs/releases/v0.6.22.png"
          - "website/static/img/social/docs/releases/v0.6.23.png"
          - "website/static/img/social/docs/releases/v0.6.24.png"
          - "website/static/img/social/docs/releases/v0.6.3.png"
          - "website/static/img/social/docs/releases/v0.6.4.png"
          - "website/static/img/social/docs/releases/v0.6.5.png"
          - "website/static/img/social/docs/releases/v0.6.6.png"
          - "website/static/img/social/docs/releases/v0.6.7.png"
          - "website/static/img/social/docs/releases/v0.6.8.png"
          - "website/static/img/social/docs/releases/v0.6.9.png"
          - "website/static/img/social/docs/releases/v0.7.0.png"
          - "website/static/img/social/docs/releases/v0.7.1.png"
          - "website/static/img/social/docs/releases/v0.7.10.png"
          - "website/static/img/social/docs/releases/v0.7.2.png"
          - "website/static/img/social/docs/releases/v0.7.3.png"
          - "website/static/img/social/docs/releases/v0.7.4.png"
          - "website/static/img/social/docs/releases/v0.7.5.png"
          - "website/static/img/social/docs/releases/v0.7.6.png"
          - "website/static/img/social/docs/releases/v0.7.7.png"
          - "website/static/img/social/docs/releases/v0.7.8-evidence/preparation.png"
          - "website/static/img/social/docs/releases/v0.7.8.png"
          - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
          - "website/static/img/social/docs/releases/v0.7.9.png"
          - "website/static/img/social/docs/showcase.png"
          - "website/static/img/social/docs/start/first-local-run.png"
          - "website/static/img/social/docs/start/quickstart.png"
          - "website/static/img/social/docs/start/what-agentplane-writes.png"
          - "website/static/img/social/docs/user/agent-bootstrap.generated.png"
          - "website/static/img/social/docs/user/agent-discovery.png"
          - "website/static/img/social/docs/user/agents.png"
          - "website/static/img/social/docs/user/branching-and-pr-artifacts.png"
          - "website/static/img/social/docs/user/breaking-changes.png"
          - "website/static/img/social/docs/user/cli-reference.generated.png"
          - "website/static/img/social/docs/user/commands.png"
          - "website/static/img/social/docs/user/configuration.png"
          - "website/static/img/social/docs/user/indexing-and-webmaster-operations.png"
          - "website/static/img/social/docs/user/local-context.png"
          - "website/static/img/social/docs/user/overview.png"
          - "website/static/img/social/docs/user/prerequisites.png"
          - "website/static/img/social/docs/user/setup.png"
          - "website/static/img/social/docs/user/task-lifecycle.png"
          - "website/static/img/social/docs/user/tasks-and-backends.png"
          - "website/static/img/social/docs/user/v0-7-migration.png"
          - "website/static/img/social/docs/user/website-ia.png"
          - "website/static/img/social/docs/user/workflow-migration.png"
          - "website/static/img/social/docs/user/workflow.png"
          - "website/static/img/social/docs/workflow-guides.png"
          - "website/static/img/social/docs/workflow-guides/aider.png"
          - "website/static/img/social/docs/workflow-guides/branch-pr.png"
          - "website/static/img/social/docs/workflow-guides/claude-code.png"
          - "website/static/img/social/docs/workflow-guides/codex.png"
          - "website/static/img/social/docs/workflow-guides/cursor.png"
          - "website/static/img/social/docs/workflow-guides/github-actions.png"
          - "website/static/img/social/docs/workflow-guides/hermes-kanban.png"
          - "website/static/img/social/manifest.json"
        external_effects: []
        repository_effects:
          - "dependencies"
          - "documentation"
          - "release_metadata"
          - "repository_write"
          - "source_code"
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
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "a7e41553ba7829874bca99117f3bf1ad4cf3065c"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-20T04:06:42.240Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-20T04:06:43.529Z"
doc_updated_by: "SUPERVISOR"
description: "Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI."
sections:
  Summary: |-
    Replace generated per-document social images with the standard static site image

    Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI.
  Scope: |-
    - In scope: Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI.
    - Out of scope: unrelated refactors not required for "Replace generated per-document social images with the standard static site image".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Replace generated per-document social images with the standard static site image". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Replace generated per-document social images with the standard static site image". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-20T04:06:42.240Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:44f0b7ef37c8067546e9616df742a2f274c75b0b09a1ab93eb12679095969ea2, input_digest=sha256:a52b5d146dbb64f87d4a332d59b07aaaee19d2fc591b6d02655a7a2294f41958

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run docs:site:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: node scripts/generate/generate-scripts-readme.mjs --check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run docs:site:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: node scripts/generate/generate-scripts-readme.mjs --check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run docs:site:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: node scripts/generate/generate-scripts-readme.mjs --check
    Result: pass
    Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (5/5)

    NativeTaskIdentityRef:
    - plan_digest: sha256:7a98e9ffdc5a5dc3397614e27ba286dd452ce7f98ee1e6cf72494d38d4ff0d20
    - policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
    - capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
    - checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
    - identity_digest: sha256:a26d017c64046b7fee4306604708ab1885464fd0de02a05650ea712f6b79d412

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task plan set 202609200336-EJTVES --text "<task-specific-plan>" --updated-by PLANNER
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:a3f99fd9152b974447c333417cf087d59beb99915ce6a9ade874d86cbe1b5758"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609200336-EJTVES/7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1/quality-report.json"
    findings:
      - "PASS: package scripts, DocItem metadata override, generator source, generated image tree, generated scripts documentation, and release notes are coherently updated; the standard Docusaurus img/og-image.png configuration remains present."
    implementation_commit: "a7e41553ba7829874bca99117f3bf1ad4cf3065c"
    implementation_tree: "bcbd69254d7daa01a75453890558763763aceb3e"
    projected_at: "2026-09-20T03:51:15.017Z"
    review_identity_digest: "sha256:5046804f7f6753c1d4339aae309c334d5d4c8405445d40a1d3ff6fa47b892ac6"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:50a196905efe5a11f5845ce7bad7534760157d166d904c9c2a85b7b29420a638"
    work_order_id: "sha256:c09d98152c607a3ea924550cd519ef0e837a82002c756a47d441e620dcd2149c"
  task_execution_context:
    base_ref: "main"
    base_sha: "0f3cd7d6c53f90bc41c88a00712ae53765af4ee4"
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
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2045a1e073a318b7a2c1a84c48466b8da21f01560418454055d5cdb50e804fab"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7a98e9ffdc5a5dc3397614e27ba286dd452ce7f98ee1e6cf72494d38d4ff0d20"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:296625510833414d8d64ccd67298136db5402c1e58c076250385f45039efc80f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "source_code"
            repository_fingerprint: "sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/releases/v0.7.10.md"
              - "package.json"
              - "scripts/README.md"
              - "website/package.json"
              - "website/scripts/generate-social-images.mjs"
              - "website/src/theme/DocItem/Layout"
              - "website/static/img/og-image.png"
              - "website/static/img/social"
            task_id: "202609200336-EJTVES"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run docs:site:check"
              - "bun run release:check"
              - "node scripts/generate/generate-scripts-readme.mjs --check"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7f60618a17a46a3853cc0adfba5ad8381ae4eaba62e8676fb9784112b7ec189a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7a98e9ffdc5a5dc3397614e27ba286dd452ce7f98ee1e6cf72494d38d4ff0d20"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:296625510833414d8d64ccd67298136db5402c1e58c076250385f45039efc80f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2045a1e073a318b7a2c1a84c48466b8da21f01560418454055d5cdb50e804fab"
            repository_effects:
              - "documentation"
              - "source_code"
            repository_fingerprint: "sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/releases/v0.7.10.md"
              - "package.json"
              - "scripts/README.md"
              - "website/package.json"
              - "website/scripts/generate-social-images.mjs"
              - "website/src/theme/DocItem/Layout"
              - "website/static/img/og-image.png"
              - "website/static/img/social"
            task_id: "202609200336-EJTVES"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run docs:site:check"
              - "bun run release:check"
              - "node scripts/generate/generate-scripts-readme.mjs --check"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/releases/v0.7.10.md"
              - "package.json"
              - "scripts/README.md"
              - "website/package.json"
              - "website/scripts/generate-social-images.mjs"
              - "website/src/theme/DocItem/Layout/index.tsx"
              - "website/static/img/social/docs.png"
              - "website/static/img/social/docs/adr/0001-zod-config-parity.png"
              - "website/static/img/social/docs/adr/0002-adr-process.png"
              - "website/static/img/social/docs/adr/0003-refactor-sequencing.png"
              - "website/static/img/social/docs/adr/0004-keep-custom-cli-stack.png"
              - "website/static/img/social/docs/adr/0005-defer-biome-migration.png"
              - "website/static/img/social/docs/adr/0006-no-effect-fp-ts-migration.png"
              - "website/static/img/social/docs/adr/0007-freeze-yaml-parser-stack.png"
              - "website/static/img/social/docs/adr/0008-keep-yauzl-for-zip-validation.png"
              - "website/static/img/social/docs/adr/0009-recipes-index-signing-algorithm-policy.png"
              - "website/static/img/social/docs/adr/0010-core-root-export-compatibility.png"
              - "website/static/img/social/docs/adr/0011-v0.3-surface-freeze.png"
              - "website/static/img/social/docs/adr/0012-v0.4-surface-transition.png"
              - "website/static/img/social/docs/adr/0013-zod-contract-ssot.png"
              - "website/static/img/social/docs/adr/0014-task-execution-authority.png"
              - "website/static/img/social/docs/adr/0015-task-workspace-isolation.png"
              - "website/static/img/social/docs/adr/0016-serialized-direct-integration.png"
              - "website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
              - "website/static/img/social/docs/archive/v0-3/cli-bug-ledger-v0-3-x.png"
              - "website/static/img/social/docs/archive/v0-3/framework-refactor-program.png"
              - "website/static/img/social/docs/compare.png"
              - "website/static/img/social/docs/concepts/agent-workflows.png"
              - "website/static/img/social/docs/concepts/context-engineering.png"
              - "website/static/img/social/docs/concepts/harness-engineering.png"
              - "website/static/img/social/docs/concepts/traces.png"
              - "website/static/img/social/docs/context.png"
              - "website/static/img/social/docs/context/agent-guide.png"
              - "website/static/img/social/docs/context/files.png"
              - "website/static/img/social/docs/context/ingest.png"
              - "website/static/img/social/docs/context/modes.png"
              - "website/static/img/social/docs/context/quickstart.png"
              - "website/static/img/social/docs/context/review.png"
              - "website/static/img/social/docs/context/troubleshooting.png"
              - "website/static/img/social/docs/contributing/citation-guidelines.png"
              - "website/static/img/social/docs/developer/agent-change-record-implementation.png"
              - "website/static/img/social/docs/developer/architecture.png"
              - "website/static/img/social/docs/developer/blueprints.png"
              - "website/static/img/social/docs/developer/cli-contract.png"
              - "website/static/img/social/docs/developer/cli-help-json.png"
              - "website/static/img/social/docs/developer/close-taxonomy.png"
              - "website/static/img/social/docs/developer/cloud-backend-integration-plan.png"
              - "website/static/img/social/docs/developer/code-quality.png"
              - "website/static/img/social/docs/developer/contributing.png"
              - "website/static/img/social/docs/developer/design-principles.png"
              - "website/static/img/social/docs/developer/documentation-information-architecture.png"
              - "website/static/img/social/docs/developer/evaluation-and-recursive-improvement.png"
              - "website/static/img/social/docs/developer/harness-dev.png"
              - "website/static/img/social/docs/developer/harness-engineering.png"
              - "website/static/img/social/docs/developer/incident-archive.png"
              - "website/static/img/social/docs/developer/local-context.png"
              - "website/static/img/social/docs/developer/modular-prompt-assembly.png"
              - "website/static/img/social/docs/developer/module-topology.png"
              - "website/static/img/social/docs/developer/performance-baselines.png"
              - "website/static/img/social/docs/developer/project-layout.png"
              - "website/static/img/social/docs/developer/recipes-development.png"
              - "website/static/img/social/docs/developer/recipes-how-it-works.png"
              - "website/static/img/social/docs/developer/recipes-safety.png"
              - "website/static/img/social/docs/developer/recipes-spec.png"
              - "website/static/img/social/docs/developer/release-and-publishing.png"
              - "website/static/img/social/docs/developer/schema-validation-strategy.png"
              - "website/static/img/social/docs/developer/task-execution-authority.png"
              - "website/static/img/social/docs/developer/testing-and-quality.png"
              - "website/static/img/social/docs/developer/typescript-esm-imports.png"
              - "website/static/img/social/docs/developer/verification-contract.png"
              - "website/static/img/social/docs/developer/website-success-metrics.png"
              - "website/static/img/social/docs/developer/workflow-contract.png"
              - "website/static/img/social/docs/developer/workflow-harness-test-matrix.png"
              - "website/static/img/social/docs/examples/debug-agent-run-with-traces.png"
              - "website/static/img/social/docs/examples/export-traces.png"
              - "website/static/img/social/docs/help/broken-workflow-runbook.png"
              - "website/static/img/social/docs/help/glossary.png"
              - "website/static/img/social/docs/help/legacy-upgrade-recovery.png"
              - "website/static/img/social/docs/help/troubleshooting-by-symptom.png"
              - "website/static/img/social/docs/help/troubleshooting.png"
              - "website/static/img/social/docs/internal/git-mutation-model.png"
              - "website/static/img/social/docs/internal/v0.6.22-refactor-plan.png"
              - "website/static/img/social/docs/internal/v0.7-agent-efficiency-baseline.png"
              - "website/static/img/social/docs/internal/v0.7-refactor-plan.png"
              - "website/static/img/social/docs/listing.png"
              - "website/static/img/social/docs/manifesto.png"
              - "website/static/img/social/docs/recipes.png"
              - "website/static/img/social/docs/recipes/docs-update.png"
              - "website/static/img/social/docs/recipes/hermes-agentplane.png"
              - "website/static/img/social/docs/recipes/security-review.png"
              - "website/static/img/social/docs/recipes/tdd.png"
              - "website/static/img/social/docs/reference/acr-schema.png"
              - "website/static/img/social/docs/reference/acr.png"
              - "website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
              - "website/static/img/social/docs/reference/cli.png"
              - "website/static/img/social/docs/reference/evidence.png"
              - "website/static/img/social/docs/reference/generated-reference.png"
              - "website/static/img/social/docs/reference/runner-handoff.png"
              - "website/static/img/social/docs/reference/task-observations.png"
              - "website/static/img/social/docs/reference/trace-schema.png"
              - "website/static/img/social/docs/reference/workflow-file.png"
              - "website/static/img/social/docs/releases.png"
              - "website/static/img/social/docs/releases/TEMPLATE.png"
              - "website/static/img/social/docs/releases/v0.1.3.png"
              - "website/static/img/social/docs/releases/v0.1.4.png"
              - "website/static/img/social/docs/releases/v0.1.5.png"
              - "website/static/img/social/docs/releases/v0.1.6.png"
              - "website/static/img/social/docs/releases/v0.1.7.png"
              - "website/static/img/social/docs/releases/v0.1.8.png"
              - "website/static/img/social/docs/releases/v0.1.9.png"
              - "website/static/img/social/docs/releases/v0.2.0.png"
              - "website/static/img/social/docs/releases/v0.2.1.png"
              - "website/static/img/social/docs/releases/v0.2.10.png"
              - "website/static/img/social/docs/releases/v0.2.11.png"
              - "website/static/img/social/docs/releases/v0.2.12.png"
              - "website/static/img/social/docs/releases/v0.2.13.png"
              - "website/static/img/social/docs/releases/v0.2.14.png"
              - "website/static/img/social/docs/releases/v0.2.15.png"
              - "website/static/img/social/docs/releases/v0.2.16.png"
              - "website/static/img/social/docs/releases/v0.2.17.png"
              - "website/static/img/social/docs/releases/v0.2.18.png"
              - "website/static/img/social/docs/releases/v0.2.19.png"
              - "website/static/img/social/docs/releases/v0.2.2.png"
              - "website/static/img/social/docs/releases/v0.2.20.png"
              - "website/static/img/social/docs/releases/v0.2.21.png"
              - "website/static/img/social/docs/releases/v0.2.22.png"
              - "website/static/img/social/docs/releases/v0.2.23.png"
              - "website/static/img/social/docs/releases/v0.2.24.png"
              - "website/static/img/social/docs/releases/v0.2.25.png"
              - "website/static/img/social/docs/releases/v0.2.26.png"
              - "website/static/img/social/docs/releases/v0.2.3.png"
              - "website/static/img/social/docs/releases/v0.2.4.png"
              - "website/static/img/social/docs/releases/v0.2.5.png"
              - "website/static/img/social/docs/releases/v0.2.6.png"
              - "website/static/img/social/docs/releases/v0.2.7.png"
              - "website/static/img/social/docs/releases/v0.2.8.png"
              - "website/static/img/social/docs/releases/v0.2.9.png"
              - "website/static/img/social/docs/releases/v0.3.0.png"
              - "website/static/img/social/docs/releases/v0.3.1.png"
              - "website/static/img/social/docs/releases/v0.3.10.png"
              - "website/static/img/social/docs/releases/v0.3.11.png"
              - "website/static/img/social/docs/releases/v0.3.12.png"
              - "website/static/img/social/docs/releases/v0.3.13.png"
              - "website/static/img/social/docs/releases/v0.3.14.png"
              - "website/static/img/social/docs/releases/v0.3.15.png"
              - "website/static/img/social/docs/releases/v0.3.16.png"
              - "website/static/img/social/docs/releases/v0.3.17.png"
              - "website/static/img/social/docs/releases/v0.3.18.png"
              - "website/static/img/social/docs/releases/v0.3.19.png"
              - "website/static/img/social/docs/releases/v0.3.2.png"
              - "website/static/img/social/docs/releases/v0.3.20.png"
              - "website/static/img/social/docs/releases/v0.3.21.png"
              - "website/static/img/social/docs/releases/v0.3.22.png"
              - "website/static/img/social/docs/releases/v0.3.23.png"
              - "website/static/img/social/docs/releases/v0.3.24.png"
              - "website/static/img/social/docs/releases/v0.3.25.png"
              - "website/static/img/social/docs/releases/v0.3.26.png"
              - "website/static/img/social/docs/releases/v0.3.27.png"
              - "website/static/img/social/docs/releases/v0.3.28.png"
              - "website/static/img/social/docs/releases/v0.3.29.png"
              - "website/static/img/social/docs/releases/v0.3.3.png"
              - "website/static/img/social/docs/releases/v0.3.4.png"
              - "website/static/img/social/docs/releases/v0.3.5.png"
              - "website/static/img/social/docs/releases/v0.3.6.png"
              - "website/static/img/social/docs/releases/v0.3.7.png"
              - "website/static/img/social/docs/releases/v0.3.8.png"
              - "website/static/img/social/docs/releases/v0.3.9.png"
              - "website/static/img/social/docs/releases/v0.4.0.png"
              - "website/static/img/social/docs/releases/v0.4.1.png"
              - "website/static/img/social/docs/releases/v0.4.2.png"
              - "website/static/img/social/docs/releases/v0.4.3.png"
              - "website/static/img/social/docs/releases/v0.4.4.png"
              - "website/static/img/social/docs/releases/v0.5.0-rc.1.png"
              - "website/static/img/social/docs/releases/v0.5.0.png"
              - "website/static/img/social/docs/releases/v0.6.0.png"
              - "website/static/img/social/docs/releases/v0.6.1.png"
              - "website/static/img/social/docs/releases/v0.6.10.png"
              - "website/static/img/social/docs/releases/v0.6.11.png"
              - "website/static/img/social/docs/releases/v0.6.12.png"
              - "website/static/img/social/docs/releases/v0.6.13.png"
              - "website/static/img/social/docs/releases/v0.6.14.png"
              - "website/static/img/social/docs/releases/v0.6.15.png"
              - "website/static/img/social/docs/releases/v0.6.16.png"
              - "website/static/img/social/docs/releases/v0.6.17.png"
              - "website/static/img/social/docs/releases/v0.6.18.png"
              - "website/static/img/social/docs/releases/v0.6.19.png"
              - "website/static/img/social/docs/releases/v0.6.2.png"
              - "website/static/img/social/docs/releases/v0.6.20.png"
              - "website/static/img/social/docs/releases/v0.6.21.png"
              - "website/static/img/social/docs/releases/v0.6.22.png"
              - "website/static/img/social/docs/releases/v0.6.23.png"
              - "website/static/img/social/docs/releases/v0.6.24.png"
              - "website/static/img/social/docs/releases/v0.6.3.png"
              - "website/static/img/social/docs/releases/v0.6.4.png"
              - "website/static/img/social/docs/releases/v0.6.5.png"
              - "website/static/img/social/docs/releases/v0.6.6.png"
              - "website/static/img/social/docs/releases/v0.6.7.png"
              - "website/static/img/social/docs/releases/v0.6.8.png"
              - "website/static/img/social/docs/releases/v0.6.9.png"
              - "website/static/img/social/docs/releases/v0.7.0.png"
              - "website/static/img/social/docs/releases/v0.7.1.png"
              - "website/static/img/social/docs/releases/v0.7.10.png"
              - "website/static/img/social/docs/releases/v0.7.2.png"
              - "website/static/img/social/docs/releases/v0.7.3.png"
              - "website/static/img/social/docs/releases/v0.7.4.png"
              - "website/static/img/social/docs/releases/v0.7.5.png"
              - "website/static/img/social/docs/releases/v0.7.6.png"
              - "website/static/img/social/docs/releases/v0.7.7.png"
              - "website/static/img/social/docs/releases/v0.7.8-evidence/preparation.png"
              - "website/static/img/social/docs/releases/v0.7.8.png"
              - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
              - "website/static/img/social/docs/releases/v0.7.9.png"
              - "website/static/img/social/docs/showcase.png"
              - "website/static/img/social/docs/start/first-local-run.png"
              - "website/static/img/social/docs/start/quickstart.png"
              - "website/static/img/social/docs/start/what-agentplane-writes.png"
              - "website/static/img/social/docs/user/agent-bootstrap.generated.png"
              - "website/static/img/social/docs/user/agent-discovery.png"
              - "website/static/img/social/docs/user/agents.png"
              - "website/static/img/social/docs/user/branching-and-pr-artifacts.png"
              - "website/static/img/social/docs/user/breaking-changes.png"
              - "website/static/img/social/docs/user/cli-reference.generated.png"
              - "website/static/img/social/docs/user/commands.png"
              - "website/static/img/social/docs/user/configuration.png"
              - "website/static/img/social/docs/user/indexing-and-webmaster-operations.png"
              - "website/static/img/social/docs/user/local-context.png"
              - "website/static/img/social/docs/user/overview.png"
              - "website/static/img/social/docs/user/prerequisites.png"
              - "website/static/img/social/docs/user/setup.png"
              - "website/static/img/social/docs/user/task-lifecycle.png"
              - "website/static/img/social/docs/user/tasks-and-backends.png"
              - "website/static/img/social/docs/user/v0-7-migration.png"
              - "website/static/img/social/docs/user/website-ia.png"
              - "website/static/img/social/docs/user/workflow-migration.png"
              - "website/static/img/social/docs/user/workflow.png"
              - "website/static/img/social/docs/workflow-guides.png"
              - "website/static/img/social/docs/workflow-guides/aider.png"
              - "website/static/img/social/docs/workflow-guides/branch-pr.png"
              - "website/static/img/social/docs/workflow-guides/claude-code.png"
              - "website/static/img/social/docs/workflow-guides/codex.png"
              - "website/static/img/social/docs/workflow-guides/cursor.png"
              - "website/static/img/social/docs/workflow-guides/github-actions.png"
              - "website/static/img/social/docs/workflow-guides/hermes-kanban.png"
              - "website/static/img/social/manifest.json"
            evidence_digest: "sha256:98fbde0e427aa7d53e023c503c1ef72a0874068915f390de36debafb5c6869cb"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:296625510833414d8d64ccd67298136db5402c1e58c076250385f45039efc80f"
        digest: "sha256:7a98e9ffdc5a5dc3397614e27ba286dd452ce7f98ee1e6cf72494d38d4ff0d20"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:fde90dc268bc8557ed094825d88b758e96317fa91e8636e9b139603170c040e9"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "source_code"
                - "documentation"
              resources: []
              scope_roots:
                - "package.json"
                - "scripts/README.md"
                - "docs/releases/v0.7.10.md"
                - "website/package.json"
                - "website/scripts/generate-social-images.mjs"
                - "website/src/theme/DocItem/Layout"
                - "website/static/img/social"
                - "website/static/img/og-image.png"
            expected_outputs:
              - "standard-social-image-configuration"
              - "social-generator-removal"
              - "social-assets-removal"
              - "docs-release-evidence"
            id: "remove-generated-social-images"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:9c986ecc3229390c1f7e99c76f06c1ff86d1da326c5fda1e86ddc9bf5334e09f"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:706b55c2e0d2ec1cb0b4ae3ab6ab59a6c7a7a2024cbcb018f078dbbe2075f468"
          environment_digest: "sha256:18f6bbfaa4e146b6541787053af508437d914cc93adbec8216c3bf6083b37022"
          implementation_identity: "sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
          toolchain_digest: "sha256:66b51d940d347ec9ac75e8e1239442e18ed5278edacee508f5ad8bdf7f2f8263"
        observed_at: "2026-09-20T03:58:59.075Z"
        status: "PASSED"
      id: "202609200336-EJTVES"
      intent_digest: "sha256:4542ee8e19bdbbeabd7a60b5b2ea0cf4085c57b7d6ec5b08170f6a5a9d13d48b"
      migration_receipts: []
      mutation_receipts:
        capture:202609200336-EJTVES:
          after_revision: 1
          aggregate_digest: "sha256:d95d74753f0781fbe76de271e906734f9be95aaa767251e3566c50e33da21640"
          before_revision: 0
          command_digest: "sha256:079230503609290f425fbe93ddfd2a1fcca00cf0c5fe7c790c700c145a124245"
          effect_ids: []
          event_digests:
            - "sha256:3d86283c87554a0b35807d1154cfd9ce224111e1bc7e8f615a1c942e88821eca"
          mutation_id: "capture:202609200336-EJTVES"
        final-validation:sha256:9c986ecc3229390c1f7e99c76f06c1ff86d1da326c5fda1e86ddc9bf5334e09f:11:
          after_revision: 12
          aggregate_digest: "sha256:e1b2cb1c31dfc9bde02883814ec22c32af1633ff85f9684135feaa0a73299b94"
          before_revision: 11
          command_digest: "sha256:9e65db2ffec081909bdc7c162a6eb6598c9c0cca44564f79e4d346e06000e2ad"
          effect_ids: []
          event_digests:
            - "sha256:18582557d4456172bfc5687408c7fff7a28a870d9d005bc010e465fc813352f0"
          mutation_id: "final-validation:sha256:9c986ecc3229390c1f7e99c76f06c1ff86d1da326c5fda1e86ddc9bf5334e09f:11"
        kernel_work_item_claim_required:sha256:5d7e9022b02b3fcfdd922681f83f92b8009b511a451442a60a369507ec8889d3:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494:
          after_revision: 5
          aggregate_digest: "sha256:9992f84ea27cf5ff205d56c9dde24fd93fb6ae8a21aa5ccdcc43b3660b522ed4"
          before_revision: 4
          command_digest: "sha256:29392e539994efb188ac6dd5f7b3ac3ff3729154dd6e3cbf6a5ebf3865ecc9a1"
          effect_ids: []
          event_digests:
            - "sha256:571a7d567666f6bfafdc764fe73f068b8724d41c2ff58e8389bd9fdac1bb50c6"
          mutation_id: "kernel_work_item_claim_required:sha256:5d7e9022b02b3fcfdd922681f83f92b8009b511a451442a60a369507ec8889d3:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
        kernel_work_item_execution_required:sha256:107b5327fc8eb0cb954a38568970bafe063960a84aba43e62e20e118305e457c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494:
          after_revision: 6
          aggregate_digest: "sha256:7fc277c37dc45159791bdf1ff7f983afc1bbb4bcec7f2e5a12ede47346557e64"
          before_revision: 5
          command_digest: "sha256:01638d5b1a55d38cfef7c3bbc1d99bd4b19ebfa95b78d1c2e4f4ccb412da6eaf"
          effect_ids: []
          event_digests:
            - "sha256:35aeebf8678ef5323832bd777068db41d47380e937feffdb41d1fd42f626b172"
          mutation_id: "kernel_work_item_execution_required:sha256:107b5327fc8eb0cb954a38568970bafe063960a84aba43e62e20e118305e457c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
        kernel_work_item_inspection_required:sha256:3fc91ea6d5f9780c52ef8a01ad28cf8dd423691254b5d47393062641fdadf54e:sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1:
          after_revision: 9
          aggregate_digest: "sha256:7861a0568ae8928823d1b36586acf82f48510e58bce18d205904cf11c066c1ab"
          before_revision: 8
          command_digest: "sha256:ebf08f4c848d87fa13a2d256789800ed5db06074adbc19de7114aaf99c5c064b"
          effect_ids: []
          event_digests:
            - "sha256:939b281c58009b6554269d6888240ad32e9072bbdf03c41da01feec8b1cf0802"
          mutation_id: "kernel_work_item_inspection_required:sha256:3fc91ea6d5f9780c52ef8a01ad28cf8dd423691254b5d47393062641fdadf54e:sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
        kernel_work_item_materialization_required:sha256:a6d162b661dbe19b46b0b95edc6e56c9957a1aa323d99bcaf590f10d95b8dc1c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494:
          after_revision: 4
          aggregate_digest: "sha256:bf61fa3657053e2bc502d0369b378c285dd0ab7abe120b46dc6ca1080cf7b33e"
          before_revision: 3
          command_digest: "sha256:61d8ed3db8e86343e85221ac680b1ea3255f83955d67093ed3e5f734e8d13b7e"
          effect_ids: []
          event_digests:
            - "sha256:c922f987b6f6493fb00e114835773b180b504f584290043f6391a0a3cc88f9ed"
          mutation_id: "kernel_work_item_materialization_required:sha256:a6d162b661dbe19b46b0b95edc6e56c9957a1aa323d99bcaf590f10d95b8dc1c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
        result:sha256:c09d98152c607a3ea924550cd519ef0e837a82002c756a47d441e620dcd2149c:
          after_revision: 8
          aggregate_digest: "sha256:f7075fe4c62fca7d494dea4243bb0ede9a47d3237ccdd038bca4779527158c98"
          before_revision: 7
          command_digest: "sha256:777e540e03090b87168a7dbd0403decf390916f683c942ffe4ef9553e200dc33"
          effect_ids: []
          event_digests:
            - "sha256:0deaf3bf093f3d083a07c304e3024b0092cbe437b5308decc0535a4590e0120e"
          mutation_id: "result:sha256:c09d98152c607a3ea924550cd519ef0e837a82002c756a47d441e620dcd2149c"
        result:sha256:d50a2572b06d6928eb829be1232b3098cb8c4e7b673a0223c3e46eb4e55d9822:
          after_revision: 2
          aggregate_digest: "sha256:45fa4cd66d1aee5988cbf3fab3bf4b635a41275f24d901b401399ca1680f8a4f"
          before_revision: 1
          command_digest: "sha256:0ad9446d372afc09d16416d64904edbf9fbf6fcf913228ce39cd1e03c1c52c6a"
          effect_ids: []
          event_digests:
            - "sha256:dd8f67824f83e451db08762f32a44d9d56062380af665da05e2236e1ca8ffb9a"
          mutation_id: "result:sha256:d50a2572b06d6928eb829be1232b3098cb8c4e7b673a0223c3e46eb4e55d9822"
        sha256:81bd41c8ee1ef06d61fbc4e9503e47bcf5c3ee0b332dc7c5964b7a8f2c0b1e89:
          after_revision: 7
          aggregate_digest: "sha256:b5f0abf90f1c85ac73ccd9c4b09a88fd82d533547642c49b85d0ba48b76a9f23"
          before_revision: 6
          command_digest: "sha256:203da6fbb9f74f411290e528bd3324ddac4aebf0419a9d107a91b136e45c2c35"
          effect_ids: []
          event_digests:
            - "sha256:64a1221c34bde9d2f194cc2cc8773a1f6c82348e40a018db62b4bac033471cc8"
          mutation_id: "sha256:81bd41c8ee1ef06d61fbc4e9503e47bcf5c3ee0b332dc7c5964b7a8f2c0b1e89"
        sha256:8a064e966c809ea7e7e6ed2a86c58e4c6fb545e339ea465aa021e995123b2807:
          after_revision: 3
          aggregate_digest: "sha256:94ac30ff7d4929f2b422e1f469afa09e7039f4e080696e703b68d4e613abb87d"
          before_revision: 2
          command_digest: "sha256:37238e083c93c8aeb90481a372c334ebc0750e036111048ec982f7017e7a5c81"
          effect_ids: []
          event_digests:
            - "sha256:97a7d59aeea987a222584e57e948c306f2362f8fbf83c93a809ad82c4c61a368"
          mutation_id: "sha256:8a064e966c809ea7e7e6ed2a86c58e4c6fb545e339ea465aa021e995123b2807"
        validation-resolution:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1:
          after_revision: 11
          aggregate_digest: "sha256:898c8cb620e62668547485890bf6a03497f857b0aabf7d015f50d4b042527e5b"
          before_revision: 10
          command_digest: "sha256:f77fcd925edfc01b4fe4b6a01fe38f83b759c52be93e2cf4dde56e870b64ce19"
          effect_ids: []
          event_digests:
            - "sha256:635344b78c016971899c05519338e06e7ef2203f0e49faef4a9ba65f1a9b2787"
          mutation_id: "validation-resolution:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1"
        validation:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1:
          after_revision: 10
          aggregate_digest: "sha256:9d525631734c87bea5ea92d2a11058552e931077591360caac3b60d925107fe2"
          before_revision: 9
          command_digest: "sha256:ca948aa2213a2be1b880353ac9c6f7501c59f4d8b361f622976e205cc755bb01"
          effect_ids: []
          event_digests:
            - "sha256:b8dc1f7280ceb154f1a4dd009dcc7dd7c44efa58fb4ea78ff1ee611540ee159b"
          mutation_id: "validation:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1"
      plan_history: []
      revision: 12
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        remove-generated-social-images:
          attempt: 1
          claim_id: "sha256:3d82525c9002de716e93aae577f75f3585b38d93e385efa9886ceb942bdf98a5"
          definition:
            contract_digest: "sha256:fde90dc268bc8557ed094825d88b758e96317fa91e8636e9b139603170c040e9"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "source_code"
                - "documentation"
              resources: []
              scope_roots:
                - "package.json"
                - "scripts/README.md"
                - "docs/releases/v0.7.10.md"
                - "website/package.json"
                - "website/scripts/generate-social-images.mjs"
                - "website/src/theme/DocItem/Layout"
                - "website/static/img/social"
                - "website/static/img/og-image.png"
            expected_outputs:
              - "standard-social-image-configuration"
              - "social-generator-removal"
              - "social-assets-removal"
              - "docs-release-evidence"
            id: "remove-generated-social-images"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:881a00f789e03f2c2e979c4562f6155bcb2db2d8906d7048f004a6e693bc33e4"
              id: "standard-social-image-configuration"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
              task_id: "202609200336-EJTVES"
              work_item_id: "remove-generated-social-images"
            -
              attempt: 1
              digest: "sha256:b4bb67ca88dc3ba33f03f86504d4b03204853ad35104752181237a8e8073d4ec"
              id: "social-generator-removal"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
              task_id: "202609200336-EJTVES"
              work_item_id: "remove-generated-social-images"
            -
              attempt: 1
              digest: "sha256:398f4a4574a8b8e3e1a7bdeb4b4dab8cff65a0e95078a4b988708740d67c2631"
              id: "social-assets-removal"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
              task_id: "202609200336-EJTVES"
              work_item_id: "remove-generated-social-images"
            -
              attempt: 1
              digest: "sha256:34da0f69244e11fa2ffa82315e763c0908d53ab07036c742b0218159398b1bbb"
              id: "docs-release-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
              task_id: "202609200336-EJTVES"
              work_item_id: "remove-generated-social-images"
          result_digest: "sha256:fb20260690bbb4ef6810a55a03077be441216288ecf31020a7df41b25c7e7c55"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:50a196905efe5a11f5845ce7bad7534760157d166d904c9c2a85b7b29420a638"
              - "sha256:5046804f7f6753c1d4339aae309c334d5d4c8405445d40a1d3ff6fa47b892ac6"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:706b55c2e0d2ec1cb0b4ae3ab6ab59a6c7a7a2024cbcb018f078dbbe2075f468"
              environment_digest: "sha256:46f9d151708c56c2e75939446d0d104ca7784ce9e72dde57352cd0ddbbafca6c"
              implementation_identity: "sha256:fb20260690bbb4ef6810a55a03077be441216288ecf31020a7df41b25c7e7c55"
              toolchain_digest: "sha256:aa828f6327988a61159b0907b629436aef725e465ab8df0bb8179509f1012721"
            observed_at: "2026-09-20T03:51:15.017Z"
            status: "PASSED"
    digest: "sha256:794bd17fe5405a1d45e564dfe28733e5c2dfa61b9b319058f9a05cf889c9ec43"
    documents:
      contracts:
        sha256:fde90dc268bc8557ed094825d88b758e96317fa91e8636e9b139603170c040e9:
          acceptance_criteria:
            - "Root and website package scripts no longer expose or invoke generate-social-images or check-social-images."
            - "The custom DocItem layout no longer computes per-path /img/social metadata and continues to preserve the existing documentation layout wrapper."
            - "website/scripts/generate-social-images.mjs and website/static/img/social are removed; website/static/img/og-image.png and docusaurus.config.ts standard image configuration remain intact."
            - "Generated scripts documentation and v0.7.10 release notes describe the simplified standard-image behavior."
            - "Docs site checks, release checks, and full local CI pass without a social-image generation or freshness gate."
          objective: "Remove the per-document social-image generation system and its generated assets while retaining website/static/img/og-image.png as the single standard Docusaurus social image."
          role: "EXECUTOR"
          verification_commands:
            - "node scripts/generate/generate-scripts-readme.mjs --check"
            - "bun run docs:site:check"
            - "bun run release:check"
            - "bun run ci:local:full"
      intent:
        context: "Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI."
        objective: "Replace generated per-document social images with the standard static site image"
    events:
      -
        command_digest: "sha256:079230503609290f425fbe93ddfd2a1fcca00cf0c5fe7c790c700c145a124245"
        id: "capture:202609200336-EJTVES:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609200336-EJTVES"
        occurred_at: "2026-09-20T03:36:37.850Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609200336-EJTVES"
        task_revision: 1
      -
        command_digest: "sha256:0ad9446d372afc09d16416d64904edbf9fbf6fcf913228ce39cd1e03c1c52c6a"
        id: "result:sha256:d50a2572b06d6928eb829be1232b3098cb8c4e7b673a0223c3e46eb4e55d9822:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d50a2572b06d6928eb829be1232b3098cb8c4e7b673a0223c3e46eb4e55d9822"
        occurred_at: "2026-09-20T03:37:27.182Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609200336-EJTVES"
        task_revision: 2
      -
        command_digest: "sha256:37238e083c93c8aeb90481a372c334ebc0750e036111048ec982f7017e7a5c81"
        id: "sha256:8a064e966c809ea7e7e6ed2a86c58e4c6fb545e339ea465aa021e995123b2807:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8a064e966c809ea7e7e6ed2a86c58e4c6fb545e339ea465aa021e995123b2807"
        occurred_at: "2026-09-20T03:37:36.915Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609200336-EJTVES"
        task_revision: 3
      -
        command_digest: "sha256:61d8ed3db8e86343e85221ac680b1ea3255f83955d67093ed3e5f734e8d13b7e"
        id: "kernel_work_item_materialization_required:sha256:a6d162b661dbe19b46b0b95edc6e56c9957a1aa323d99bcaf590f10d95b8dc1c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a6d162b661dbe19b46b0b95edc6e56c9957a1aa323d99bcaf590f10d95b8dc1c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
        occurred_at: "2026-09-20T03:37:47.305Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609200336-EJTVES"
        task_revision: 4
      -
        command_digest: "sha256:29392e539994efb188ac6dd5f7b3ac3ff3729154dd6e3cbf6a5ebf3865ecc9a1"
        id: "kernel_work_item_claim_required:sha256:5d7e9022b02b3fcfdd922681f83f92b8009b511a451442a60a369507ec8889d3:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5d7e9022b02b3fcfdd922681f83f92b8009b511a451442a60a369507ec8889d3:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
        occurred_at: "2026-09-20T03:37:51.199Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609200336-EJTVES"
        task_revision: 5
      -
        command_digest: "sha256:01638d5b1a55d38cfef7c3bbc1d99bd4b19ebfa95b78d1c2e4f4ccb412da6eaf"
        id: "kernel_work_item_execution_required:sha256:107b5327fc8eb0cb954a38568970bafe063960a84aba43e62e20e118305e457c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:107b5327fc8eb0cb954a38568970bafe063960a84aba43e62e20e118305e457c:sha256:17a0685851ce238a2f2341766a4c6f0c62a36a3f85fc302823e21f736622b494"
        occurred_at: "2026-09-20T03:38:35.648Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609200336-EJTVES"
        task_revision: 6
      -
        command_digest: "sha256:203da6fbb9f74f411290e528bd3324ddac4aebf0419a9d107a91b136e45c2c35"
        id: "sha256:81bd41c8ee1ef06d61fbc4e9503e47bcf5c3ee0b332dc7c5964b7a8f2c0b1e89:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:81bd41c8ee1ef06d61fbc4e9503e47bcf5c3ee0b332dc7c5964b7a8f2c0b1e89"
        occurred_at: "2026-09-20T03:50:19.175Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609200336-EJTVES"
        task_revision: 7
      -
        command_digest: "sha256:777e540e03090b87168a7dbd0403decf390916f683c942ffe4ef9553e200dc33"
        id: "result:sha256:c09d98152c607a3ea924550cd519ef0e837a82002c756a47d441e620dcd2149c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c09d98152c607a3ea924550cd519ef0e837a82002c756a47d441e620dcd2149c"
        occurred_at: "2026-09-20T03:50:23.255Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609200336-EJTVES"
        task_revision: 8
      -
        command_digest: "sha256:ebf08f4c848d87fa13a2d256789800ed5db06074adbc19de7114aaf99c5c064b"
        id: "kernel_work_item_inspection_required:sha256:3fc91ea6d5f9780c52ef8a01ad28cf8dd423691254b5d47393062641fdadf54e:sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:3fc91ea6d5f9780c52ef8a01ad28cf8dd423691254b5d47393062641fdadf54e:sha256:858e01b303a2ff3436dcb6f98839e32c0133bd0027e3f532ba63b942048c68e1"
        occurred_at: "2026-09-20T03:50:26.499Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609200336-EJTVES"
        task_revision: 9
      -
        command_digest: "sha256:ca948aa2213a2be1b880353ac9c6f7501c59f4d8b361f622976e205cc755bb01"
        id: "validation:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1"
        occurred_at: "2026-09-20T03:58:53.865Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609200336-EJTVES"
        task_revision: 10
      -
        command_digest: "sha256:f77fcd925edfc01b4fe4b6a01fe38f83b759c52be93e2cf4dde56e870b64ce19"
        id: "validation-resolution:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7fcb87d9bc55b448aea918b18c4dba7c5d3cb4ce541ced02c8c70ad735b2eff1"
        occurred_at: "2026-09-20T03:58:55.844Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609200336-EJTVES"
        task_revision: 11
      -
        command_digest: "sha256:9e65db2ffec081909bdc7c162a6eb6598c9c0cca44564f79e4d346e06000e2ad"
        id: "final-validation:sha256:9c986ecc3229390c1f7e99c76f06c1ff86d1da326c5fda1e86ddc9bf5334e09f:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:9c986ecc3229390c1f7e99c76f06c1ff86d1da326c5fda1e86ddc9bf5334e09f:11"
        occurred_at: "2026-09-20T04:06:36.923Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609200336-EJTVES"
        task_revision: 12
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Replace generated per-document social images with the standard static site image

Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI.

## Scope

- In scope: Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI.
- Out of scope: unrelated refactors not required for "Replace generated per-document social images with the standard static site image".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Replace generated per-document social images with the standard static site image". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Replace generated per-document social images with the standard static site image". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-20T04:06:42.240Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:44f0b7ef37c8067546e9616df742a2f274c75b0b09a1ab93eb12679095969ea2, input_digest=sha256:a52b5d146dbb64f87d4a332d59b07aaaee19d2fc591b6d02655a7a2294f41958

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run docs:scripts:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run docs:site:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: node scripts/generate/generate-scripts-readme.mjs --check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609200336-EJTVES Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run docs:scripts:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run docs:site:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: node scripts/generate/generate-scripts-readme.mjs --check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609200336-EJTVES Verification Contract check critical_paths (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run docs:scripts:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run docs:site:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: node scripts/generate/generate-scripts-readme.mjs --check
Result: pass
Evidence: .agentplane/tasks/202609200336-EJTVES/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609200336-EJTVES Verification Contract check task_outcome (5/5)

NativeTaskIdentityRef:
- plan_digest: sha256:7a98e9ffdc5a5dc3397614e27ba286dd452ce7f98ee1e6cf72494d38d4ff0d20
- policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
- capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
- checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
- identity_digest: sha256:a26d017c64046b7fee4306604708ab1885464fd0de02a05650ea712f6b79d412

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task plan set 202609200336-EJTVES --text "<task-specific-plan>" --updated-by PLANNER
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
