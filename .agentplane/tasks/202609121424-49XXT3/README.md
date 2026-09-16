---
id: "202609121424-49XXT3"
title: "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 98
origin:
  system: "manual"
depends_on:
  - "202609121424-4BC7B3"
tags:
  - "release-0.7.9"
  - "publish"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "credentials"
  - "publish"
  - "merge"
  - "external_system"
blueprint_request: "release.strict"
verify:
  - "bun run release:check"
  - "bun run release:prepublish"
plan_approval:
  state: "approved"
  updated_at: "2026-09-16T20:33:46.579Z"
  updated_by: "USER"
  note: "Refresh the execution grant under the user's explicit authorization for all operations necessary to complete release 0.7.9."
verification:
  state: "ok"
  updated_at: "2026-09-16T20:19:06.057Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-16T20:30:27.531Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "026c97813bc53dabe636fd957e4e6961278b45a3"
  blueprint_digest: "b868d5c39ecfa4e9a069b687877b066b738e575f2bfcceb04210173b98273663"
  evidence_refs:
    - ".agentplane/tasks/202609121424-49XXT3/quality/20260916-203026099-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202609121424-49XXT3/quality/20260916-203026099-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609121424-49XXT3/quality/objects/sha256/cd79972a67ce308407026ddaf3ce3453a8c5e7c1ea9a24f061ee68aa5bc190ed.md"
    - ".agentplane/tasks/202609121424-49XXT3/quality/20260916-203026099-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609121424-49XXT3/quality/20260916-203026099-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202609121424-49XXT3/quality/20260916-203026099-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202609121424-49XXT3/README.md"
    - ".agentplane/tasks/202609121424-49XXT3/quality/objects/sha256/b8d0862a586d68e56a22420d42d97896bb9568629e8a3ebee4f144236e631268.patch"
    - ".agentplane/tasks/202609121424-49XXT3/quality/objects/sha256/0b92cc0adf31148aef3481d01d6f954dadcb3f82372a0989e65fe3c780a92ca0.json"
    - ".agentplane/tasks/202609121424-49XXT3/verification/20260916201906057-de98762f65da07cc.json"
    - ".agentplane/tasks/202609121424-49XXT3/quality/objects/sha256/ae9a85c6edc7a94cea7dbb713864d6087dd669b4dc65703052c08129089b90ad.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.release.md"
  findings:
    - "No actionable defect was found: version surfaces and release evidence agree, agentplane-roadmap-r2 is absent, and the required local release gates passed for the evaluated SHA."
token_usage:
  agent_runs: 50
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:c226c40da8cbe91cf78dc5f111e69af485ac8f10f5a0a37a41484ec31514fc6e"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "external_host_turn_unallocatable"
  updated_at: "2026-09-16T20:34:05.784Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
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
      - ".agentplane/.release"
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - ".agentplane/tasks/202609121424-49XXT3"
      - "docs/assets"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.9-evidence"
      - "docs/releases/v0.7.9.md"
      - "package.json"
      - "packages/agentplane"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "scripts/baselines"
      - "website/static/img/social"
  declaration:
    external_effects:
      - "credentials"
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Public distribution requires authenticated external writes and independent readback."
      - "Release preparation changes canonical versions, generated surfaces, notes, baselines, and task evidence."
      - "The candidate must pass local and hosted qualification before exact-SHA publication."
      - "The existing candidate must be replayed onto the exact qualified main commit."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts,packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts,packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; repository_effects=tests"
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
      - ".agentplane/.release"
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - ".agentplane/tasks/202609121424-49XXT3"
      - "docs/assets"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.9-evidence"
      - "docs/releases/v0.7.9.md"
      - "package.json"
      - "packages/agentplane"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "scripts/baselines"
      - "website/static/img/social"
  observed:
    authority_violations: []
    changed_components:
      - ".agentplane"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "scripts"
      - "website"
    changed_paths:
      - ".agentplane/WORKFLOW.md"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers/adr.svg"
      - "docs/assets/readme-headers/agentplane-cli.svg"
      - "docs/assets/readme-headers/agentplane.svg"
      - "docs/assets/readme-headers/core.svg"
      - "docs/assets/readme-headers/docs.svg"
      - "docs/assets/readme-headers/humanizer.svg"
      - "docs/assets/readme-headers/recipes.svg"
      - "docs/assets/readme-headers/releases.svg"
      - "docs/assets/readme-headers/schemas.svg"
      - "docs/assets/readme-headers/scripts.svg"
      - "docs/assets/readme-headers/skills.svg"
      - "docs/assets/readme-headers/spec.svg"
      - "docs/assets/readme-headers/testkit.svg"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.9-evidence/candidate-base-synchronization.json"
      - "docs/releases/v0.7.9-evidence/preparation.md"
      - "docs/releases/v0.7.9-evidence/release-plan-changes.json"
      - "docs/releases/v0.7.9-evidence/release-plan-version.json"
      - "docs/releases/v0.7.9.md"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "scripts/baselines/clone-baseline.json"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
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
      - "website/static/img/social/docs/releases/v0.7.2.png"
      - "website/static/img/social/docs/releases/v0.7.3.png"
      - "website/static/img/social/docs/releases/v0.7.4.png"
      - "website/static/img/social/docs/releases/v0.7.5.png"
      - "website/static/img/social/docs/releases/v0.7.6.png"
      - "website/static/img/social/docs/releases/v0.7.7.png"
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
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
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
        id: "recorded-check-16"
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
    - "effect_credentials"
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
      - "credentials"
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
          - ".agentplane/.release"
          - ".agentplane/WORKFLOW.md"
          - ".agentplane/config.json"
          - ".agentplane/tasks/202609121424-49XXT3"
          - "docs/assets"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.9-evidence"
          - "docs/releases/v0.7.9.md"
          - "package.json"
          - "packages/agentplane"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "scripts/baselines"
          - "website/static/img/social"
        evidence_requirements:
          - "external_effect:credentials"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "credentials"
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
      digest: "sha256:62bc80d53aa3d45e4ffdf0f2173172e889d4f46faece51e8e4739ffeb6a8e06e"
      escalation_reasons:
        - "central_component:package.json"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:package.json"
        - "central_path:packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog/task-supervisor.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "central_path:packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts"
        - "central_path:packages/agentplane/src/commands/shared/branch-base-sync-route.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/branch-base-sync-route.ts"
        - "central_path:packages/agentplane/src/commands/shared/lifecycle-stage-timing.ts"
        - "central_path:packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/roadmap-managed-accounting.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-observation.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-postconditions.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch-base-sync-spec.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch-base-sync.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch-state.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step.ts"
        - "central_path:packages/core/package.json"
        - "central_path:packages/core/src/runner/agent-work-order.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode-telemetry-admission.test.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode-timing.test.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.test.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.ts"
        - "central_path:packages/core/src/schemas/index.ts"
        - "central_path:scripts/checks/architecture-inventory.mjs"
        - "central_path:scripts/checks/architecture-inventory.test.mjs"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:scripts/checks/check-coverage-thresholds.mjs"
        - "central_path:scripts/checks/check-task-state.mjs"
        - "central_path:scripts/lib/agent-efficiency-repository-snapshot.mjs"
        - "central_path:scripts/lib/test-route-registry.mjs"
        - "central_path:scripts/lib/test-route-registry.test.mjs"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/0594c2742a018b34bcef24181a1d5e70db748db615dd4cf3080fbcb977d75c6e.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/3d202384945151c1e70c3ab0eb93ccf76feb310917de9cbc3d6df6835980430f.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/7a595e9ff963714408d9c40f81c48a252feaa1bc80526240f789b52e21f8ecec.patch"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/a291f6466052bfa24f147ad1b5b96990656de650401aad0ccc90c9e62acd1396.patch"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/a72f9a6f199ad5e966cf1f27c0ffe2d996d368307146ae61783b634f0e857c7d.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/a8cc333bd2d456e810dd7206c970c01f58c6c3538034d45987c24da6b4942d8c.patch"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/f3e569be75ff70fa1f8de43325702ae00d3f60fe9c587a2a0a365c52a3ef08b4.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/verification/20260912180409627-afea0fd0cd9f1319.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/verification/20260912181934737-5f756d6360065722.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/verification/20260912184011247-40937d632ab71fbc.json"
        - "unknown_path:.agentplane/tasks/202609121423-9WPTCW/verification/20260912190423356-a5ee51f6b0732733.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/2d7a8a110c6e0873d5a8abf3f0d2da5a3757497b9fbbbfbf2b516aa7f9099fc2.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/9b21595f261c76c578d2ea23ceaf772798dc986f2b2e066d152b827e4bf341a7.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/c8c9581c5ea3d219a0c86f8815b9d9c96eaf76401ba233fc877b0f22675d6ec2.patch"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/verification/20260913083905585-e62d92a89e8fb45a.json"
        - "unknown_path:.agentplane/tasks/202609121424-3YAX44/verification/20260913153832194-42feeaf79f910e91.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/2072024e66e6094a60e57ea0984da6f9dd2235f59d0bdcbd08e5fadfa48650d3.patch"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/5796c240fc3e94c0807be30fa446b71f8f882f5f600ba056700f49dc5f5060fd.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/d6715c311400d3f9b7409fa270cd5b70055f2c2bf9416d1a523d534c7bbdc515.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/verification/20260913215124170-7fe3923e74ffa26e.json"
        - "unknown_path:.agentplane/tasks/202609121424-4BC7B3/verification/20260913223225951-b368eaf4bc2dcacc.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-episode.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-022220507-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-022220507-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/03e4d0deb5d600ca2d915d1462d553280d6152b484d5907d8ef28c8839a14371.patch"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/1a97cd233f305b740f12f26776deecf8a06c0e9bd64a878412f1ba2d89204faa.patch"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/2cd447419d5d2b4f6e7b98995717462b1c841357015bfb24872ede96c485c607.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/2f30f0473036b86752a5ef3cbbe61dc9f2f539559ac23bc327547dff6f312e5f.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/3e01e98971dc7a407b32d86adf49bb3251e465c27cbff9ee30aa68e476abf71c.patch"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/4a69f6da271a5347d79f9d30ceab5fc0b08638459fa9b5d6620a4ff9208c9874.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/8c7f73798b088adea69ca9b36d786e09a83742e28743c3425f571fbeb19021b1.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/acb5e13f22c5dfbd9ff3ef3ce69937520740933a85fb9a42a2af768300cd1951.patch"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/b8601846ba48e21b9e4ce38621b684783f21bcbe010e544f300c506242269ff8.patch"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/bac8b18c13630e3e94e99875f6aa192223a12fdf379af46a68a911ce7872fe99.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/bb65078b7e5d1b5c076be4bd7205b2daf4c292e4a892917cb70c9ad094807e06.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d4e7310d448a9bad3d139cf158f5e810d45ac42709033c920852a2bb59d7a67b.patch"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d8780224ae6e27e7e690c2b9af37df10889c6d9f7c94998d1901ecf2aa1c8489.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d878ded673bee0d3e92acec00a58b3e4abf398657b1af8c6d7acc0581a600eca.patch"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/db1ecae63dc7907cf907f6a3c55796ccc7e657d3d08f4444fa88a636f87e19ae.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/verification/20260912235808962-d24b6391461802ed.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/verification/20260913003619890-42f23c8883cc131b.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/verification/20260913005226102-ceb047a7ccf2c2b3.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/verification/20260913010700093-e36892520f15824e.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/verification/20260913012005778-95316adc92df4839.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/verification/20260913022102845-bc539048309e8b4b.json"
        - "unknown_path:.agentplane/tasks/202609121424-T83XJA/verification/20260913024448095-5fb0e10903a98369.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-episode.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/02e06f7837d90b8c1a4c80a067029b3d4f4802a7788db19bfb920cae2eb47960.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/3266eed93b6c2ee5c3dcafb4a3b4d13850a953740dea2310d0952072f03badf6.patch"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/427f640e2ae0afe8eb8b0c213c5936829f0039f2a9a820ed6da7e4bba888d417.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/645bd8fc3172665facd7fa060bd2449d0d6807e403d60fbba893f576d782aa48.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/e250ba6eed9dac39f1d34ea4b79b5cd1af5ddbd4db9feb0eb9ca79a288d5146d.patch"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/verification/20260913173104921-b490fe5c549405a7.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/verification/20260913174248617-5e2c7c1b546c9adf.json"
        - "unknown_path:.agentplane/tasks/202609121424-ZEJ656/verification/20260913175610563-5ac26e94d52e7e95.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/037b114aa4abe7b0e0119db64d095a2c89e6a96524302cf3178d8565e6ec2c14.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/2b8007144a78a8e253c587d0acee638badd0cff246abb3d432cb9f9e4e6d3dde.patch"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/4e4663b88bad490900a4220b00dc7fee5760937ec992760e9a207c7eb9e3627f.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/4fb577afddfa23e48934d3fd97b5d4eed6a268c09f2a99b2757a787f772524c9.patch"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/dcfc1025a9aed4f7c2754776832609f6fba2792fc2af68691d51c13e7ca6453e.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/verification/20260912150145007-94ad8b0b5d6e7a5f.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/verification/20260912151433121-0625d9b1032c22f6.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/verification/20260912152612320-266028623a750e67.json"
        - "unknown_path:.agentplane/tasks/202609121443-YAQJB7/verification/20260912155829304-40fd8186769b7cb3.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/26ccce49362bfe0526b6093a54edf43bb6449c4dce5c7cd392eaf99a67f2bc88.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/2d25e178965ea7a8b3764ce176d849f5ace3affd3cd7c5ba0613f132768bf577.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/481c232f4b9e8900685e65842d0827321257be35d04dd97651d6fc1138db20e8.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/78be06878aa806c3f440f9e711398ceb09abb1786645a6201ef44918029b5aae.patch"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/9b7548e71f3e04d33d97d367de9342e7fa425c4567e0f08a457e9023127a3bb5.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/c0e700d2a720b717f87f90dd1a5694890794c91cd0bbc1123d0e5deb678c961e.patch"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/c34f522f8f2a26e19e7252768fdabe140c3fe8b462213c4dcba9c071243941ca.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/d0ff8a97b08f736b32fba490a592611aa232e2f17b277e1441ce63f491e1c830.patch"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/verification/20260912165840724-794ccd03769c7438.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/verification/20260912170128631-e3627fa2f133abd2.json"
        - "unknown_path:.agentplane/tasks/202609121655-14X73Y/verification/20260912172637771-dad0637e7d2ce25c.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/5c34861b8e4080445b2222d70ca4383c097b5c61fd208c65c997e2916ab93c4e.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/8f8b056961571fb1e4a204e4b56c04e758450bdb7d6d665a068c3e3e2abe0efd.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/f8d2fa7909b04a94b066f46cba2deb24f9c0ae13f67fb99a8a4e6d3b39561c05.patch"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609121932-MAT0V1/verification/20260912203120576-695065f4472d17d4.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/69581e7536d57b062574d7441147b5ba42f0234176e61f693b59e29a7d87387b.patch"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/e12ac41bcaa355159b9344982ae8526f379ef82290301b30a895f00788ce013a.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/e314657ba02eb940c087044dc705c0d9b65b1022d3ced6a27626e6b0104ded71.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609122147-5F5WP0/verification/20260912224058659-fd36fb3df31fb67b.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-episode.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/37a7c521cb68ab65ad7dd31265013466c270b018ae485ee98350cc44a6d3dfb3.patch"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/48733dfb6d54ec4b14bf700c9d28004337f7d0c5a531e0ad49ffce33dbb03c2c.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/60139576ecdbc1b4e0cb4c8a10b1829fb93e6ab00d3d2406bb7bbaa5ab9925cd.patch"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/6c4d9ed6da3b65274d128a9ea9f367ad9618428f7c95c0b50e80051155a40777.patch"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/8d6fd252eeb92f2e6a2e0d7743aab502bce326917c327688070cc48e0771c75e.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/d2d523b3e451aea92846b23a8d8c8ca07d8871c5f77369f156af869098b9fefc.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/ee9a3c8d5db971958ba65fbed4becea7dfb79c3922ae194785f386526462fa32.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/semantic-report-3fb932a4f0a1b18ec08a4d24e18329028eabb5a3a65864e06d6bb32b044d38f7.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/verification/20260912233634529-0bf83b1b982adaaa.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/verification/20260913000745222-ee6c7884cd80e39b.json"
        - "unknown_path:.agentplane/tasks/202609122236-JFNN6B/verification/20260913004348447-e0a20fe5276be03a.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/3c34c6464fdfcd5edd5f0c210376a46ad2cc3a8d9f00faebd016678d01ba910d.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/43ad1d40294d9235ab5cc9e8ce118fe219ad9c316e6130e58de3b15928f4a2a2.patch"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/8022af9497f1bba25b539636d41e70d97be32d8d38de688376c2c00b9c7a910c.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/86c5e7f7fb0468ae92ab55c699d274f9c979e88bfa56f4036b74e2b221d3768b.patch"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/a46a8d5df79230a1af45c92f413aab3822a8ff79d9260b3c532f8df21e664474.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/verification/20260913142707528-4ce03ab15a211569.json"
        - "unknown_path:.agentplane/tasks/202609130858-RMHWQ5/verification/20260913150154090-d4d3fab0dda1aa18.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/objects/sha256/5fdc349443f9d4c306d66269affb90f089b3f4210965465632669792c49b2c9f.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/objects/sha256/8c87ef14fe9c10fb7cc3dd0ab299a5488f57c3a9213ab528e58cae727cd21ce6.patch"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/objects/sha256/8f95b5e66dc32f47938a55f425309917860f5af654088dbb61b52b3046bff56b.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/objects/sha256/f2b667d01ac0062ff0d6945c3aa11c2dd521b3d85aed095feced67de45a232f3.patch"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/quality/objects/sha256/fed6cce54d60d18e2430e7cdd9b708ad947f99bb9955a1e4353348622e31047f.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/verification/20260914000256951-fbce6a369f29b1cd.json"
        - "unknown_path:.agentplane/tasks/202609132330-RP315R/verification/20260914001534469-1a7f6ca2d2732103.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/007ad751a64e6a3fc4c76b11e146a0e264d3629a865b23ee9b89ccb03785edc3.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/390511960cf208eb237e7d06bd52162fefa52783dbc1038b48e6f1f1988f08df.patch"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/7bf79f1c63f9fb40ab92f33a74add480a1de3c515299836cb5eb9e8dffa962c7.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/verification/20260914011824089-7444e50e4bb0ea0d.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/verification/20260914013112134-8e2a0f7c7485bde0.json"
        - "unknown_path:.agentplane/tasks/202609140050-8QDRVN/verification/20260914014428438-c9b85eadd02c96e7.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/objects/sha256/100555e07a44a5d91d922a409f3892912ee73a02966249e30791f5b4b2a3a0bb.patch"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/objects/sha256/3fd14e76a5923587eecc8489fc8a6b6aeac2d0b7d81224323d10cd6028f15746.patch"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/objects/sha256/5994e868d32b7844cf84f1f13cf87c444b4133c3888ab394001f5481bb734918.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/objects/sha256/93d109ad7afba099b1f2caa2b645d5eded949a77507a480ac4d607654cc4bc69.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/quality/objects/sha256/a85a7e55d192e720583463869d1839f73285d233d62d9d8932309a6d0ae8fa57.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/verification/20260914080501701-3b1483d7bf124fd2.json"
        - "unknown_path:.agentplane/tasks/202609140657-5REY71/verification/20260914084606234-271e10519bfe0f6d.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/031cee6a949d3037f956dd6eced48cf0e4bd03180884db849dfc7212d5a5df37.patch"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/3610cac068019e3e1b200bec4d30bfc9c14f68655b5affb994bedef16811b961.patch"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/79925d1c562283b4bce30fdcf4fd98f2d193c231af92aa5f11441792a52d0fb3.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/a300db90dc4e6981d570d6b6e7d686aba6fe384030746744e5c89130b19af35d.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/f4c4bd38a163310d42d9ce8caa4fce677d9ce5702a971c5a75f5fd2cb83970d7.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/verification/20260914103455907-598e45505eb1ed9d.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/verification/20260914105030069-1bf823f8d4a7c0f5.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/verification/20260914105952042-5ecf5db8809e0a57.json"
        - "unknown_path:.agentplane/tasks/202609140925-AWJQMB/verification/20260914133759896-ab019b58d9b41d4c.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/63de350557411146ca66ec72e3d95a0d7a3abb88af2dc9bc3dfd445880b7ed03.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/80c915ee57425f981428bc138f9cd23ec3135d75056b6ac8ae6f26c4eb512ea1.patch"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/b1cbbdf35481f6e235ce22df666443bbfb64ea7b8884fd1ed48a26a903b69cc4.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202609141440-VFA9C1/verification/20260914160215087-a8392fd8995b0aa6.json"
        - "unknown_path:.prettierignore"
        - "unknown_path:packages/spec/examples/acr.json"
        - "unknown_path:scripts/baselines/architecture-inventory.json"
        - "unknown_path:scripts/baselines/clone-baseline.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/authority.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/campaign.lock.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/evidence.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/agentplane.tgz"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/product-candidate.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/product-minimal_agent.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/product-previous_release.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/report.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/target.bundle"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/authority.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/campaign.lock.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/disposition.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/evidence.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/product-candidate.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/product-minimal_agent.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/product-previous_release.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/report.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/target.bundle"
        - "unknown_path:scripts/baselines/v0.7-compatibility-candidate.json"
        - "unknown_path:scripts/baselines/v0.7.9-stabilization-candidate.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".agentplane"
          - ".prettierignore"
          - "docs"
          - "package.json"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "scripts"
          - "website"
        changed_files:
          - ".agentplane/WORKFLOW.md"
          - ".agentplane/tasks/202609121423-9WPTCW/README.md"
          - ".agentplane/tasks/202609121423-9WPTCW/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121423-9WPTCW/pr/diffstat.txt"
          - ".agentplane/tasks/202609121423-9WPTCW/pr/github-body.md"
          - ".agentplane/tasks/202609121423-9WPTCW/pr/github-title.txt"
          - ".agentplane/tasks/202609121423-9WPTCW/pr/meta.json"
          - ".agentplane/tasks/202609121423-9WPTCW/pr/review.md"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-181950390-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-184033708-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/20260912-190456129-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/0594c2742a018b34bcef24181a1d5e70db748db615dd4cf3080fbcb977d75c6e.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/21cc2b142636a6dc03a04e9b7685d1308d987f47f0cafd1c0880e3a051f74e1c.md"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/3d202384945151c1e70c3ab0eb93ccf76feb310917de9cbc3d6df6835980430f.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/7742ae9ae556aaadb3a1f2b08f19d06063f02f82ab3357a3d32cc71ddd680874.md"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/7a595e9ff963714408d9c40f81c48a252feaa1bc80526240f789b52e21f8ecec.patch"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/a291f6466052bfa24f147ad1b5b96990656de650401aad0ccc90c9e62acd1396.patch"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/a72f9a6f199ad5e966cf1f27c0ffe2d996d368307146ae61783b634f0e857c7d.json"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/a8cc333bd2d456e810dd7206c970c01f58c6c3538034d45987c24da6b4942d8c.patch"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/c8b829eabc105c57bc08782410482d9f5fac51fd097fb2e8e4ee617bad58a463.md"
          - ".agentplane/tasks/202609121423-9WPTCW/quality/objects/sha256/f3e569be75ff70fa1f8de43325702ae00d3f60fe9c587a2a0a365c52a3ef08b4.json"
          - ".agentplane/tasks/202609121423-9WPTCW/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121423-9WPTCW/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121423-9WPTCW/verification/20260912180409627-afea0fd0cd9f1319.json"
          - ".agentplane/tasks/202609121423-9WPTCW/verification/20260912181934737-5f756d6360065722.json"
          - ".agentplane/tasks/202609121423-9WPTCW/verification/20260912184011247-40937d632ab71fbc.json"
          - ".agentplane/tasks/202609121423-9WPTCW/verification/20260912190423356-a5ee51f6b0732733.json"
          - ".agentplane/tasks/202609121424-3YAX44/README.md"
          - ".agentplane/tasks/202609121424-3YAX44/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121424-3YAX44/pr/diffstat.txt"
          - ".agentplane/tasks/202609121424-3YAX44/pr/github-body.md"
          - ".agentplane/tasks/202609121424-3YAX44/pr/github-title.txt"
          - ".agentplane/tasks/202609121424-3YAX44/pr/meta.json"
          - ".agentplane/tasks/202609121424-3YAX44/pr/review.md"
          - ".agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-3YAX44/quality/20260913-153846980-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/2291f3402a966b3f7abadbe286e0ce929f44fc3f09b3507981875a63e4e92ff2.md"
          - ".agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/2d7a8a110c6e0873d5a8abf3f0d2da5a3757497b9fbbbfbf2b516aa7f9099fc2.json"
          - ".agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/9b21595f261c76c578d2ea23ceaf772798dc986f2b2e066d152b827e4bf341a7.json"
          - ".agentplane/tasks/202609121424-3YAX44/quality/objects/sha256/c8c9581c5ea3d219a0c86f8815b9d9c96eaf76401ba233fc877b0f22675d6ec2.patch"
          - ".agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121424-3YAX44/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121424-3YAX44/verification/20260913083905585-e62d92a89e8fb45a.json"
          - ".agentplane/tasks/202609121424-3YAX44/verification/20260913153832194-42feeaf79f910e91.json"
          - ".agentplane/tasks/202609121424-4BC7B3/README.md"
          - ".agentplane/tasks/202609121424-4BC7B3/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121424-4BC7B3/pr/diffstat.txt"
          - ".agentplane/tasks/202609121424-4BC7B3/pr/github-body.md"
          - ".agentplane/tasks/202609121424-4BC7B3/pr/github-title.txt"
          - ".agentplane/tasks/202609121424-4BC7B3/pr/meta.json"
          - ".agentplane/tasks/202609121424-4BC7B3/pr/review.md"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/20260913-223237193-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/2072024e66e6094a60e57ea0984da6f9dd2235f59d0bdcbd08e5fadfa48650d3.patch"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/5796c240fc3e94c0807be30fa446b71f8f882f5f600ba056700f49dc5f5060fd.json"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/8c817dee3cddba59fb8dc1b1dd3b8bd1f3379f0f8c7db7c14a9130365246ff36.md"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121424-4BC7B3/quality/objects/sha256/d6715c311400d3f9b7409fa270cd5b70055f2c2bf9416d1a523d534c7bbdc515.json"
          - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121424-4BC7B3/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121424-4BC7B3/verification/20260913215124170-7fe3923e74ffa26e.json"
          - ".agentplane/tasks/202609121424-4BC7B3/verification/20260913223225951-b368eaf4bc2dcacc.json"
          - ".agentplane/tasks/202609121424-T83XJA/README.md"
          - ".agentplane/tasks/202609121424-T83XJA/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121424-T83XJA/pr/diffstat.txt"
          - ".agentplane/tasks/202609121424-T83XJA/pr/github-body.md"
          - ".agentplane/tasks/202609121424-T83XJA/pr/github-title.txt"
          - ".agentplane/tasks/202609121424-T83XJA/pr/meta.json"
          - ".agentplane/tasks/202609121424-T83XJA/pr/review.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260912-235818266-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-003631202-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-005236716-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-010710137-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-episode.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-012029153-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-022220507-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-022220507-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-022448773-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/20260913-024545184-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/03e4d0deb5d600ca2d915d1462d553280d6152b484d5907d8ef28c8839a14371.patch"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/071421ac5ed381e9fa630c98eba2a0ac082af3df1b67e63493bddd992e76b9d3.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/1a97cd233f305b740f12f26776deecf8a06c0e9bd64a878412f1ba2d89204faa.patch"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/2a3221f0b720f8f75b8c167d5bed30377de3ca044179f441c38728169843c07c.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/2cd447419d5d2b4f6e7b98995717462b1c841357015bfb24872ede96c485c607.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/2f30f0473036b86752a5ef3cbbe61dc9f2f539559ac23bc327547dff6f312e5f.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/32f1e4ed6f61c950683290f4ee546d56ce5d1692c865003bf5a75adaf47f7134.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/3e01e98971dc7a407b32d86adf49bb3251e465c27cbff9ee30aa68e476abf71c.patch"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/4a69f6da271a5347d79f9d30ceab5fc0b08638459fa9b5d6620a4ff9208c9874.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/88f020e94fd95186a13b6b6064ff5a6f0eea5ed843345ecabe2a822eb52e3331.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/8c7f73798b088adea69ca9b36d786e09a83742e28743c3425f571fbeb19021b1.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/929a608e882727e48ac02dbfa598532d9c90acfd8a9f19de23eaf57c2380069d.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/a8ee2dd6830197de3a7449926b3014f49d695081074a5cf2294bd286d6f90be9.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/acb5e13f22c5dfbd9ff3ef3ce69937520740933a85fb9a42a2af768300cd1951.patch"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/b8601846ba48e21b9e4ce38621b684783f21bcbe010e544f300c506242269ff8.patch"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/bac8b18c13630e3e94e99875f6aa192223a12fdf379af46a68a911ce7872fe99.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/bb65078b7e5d1b5c076be4bd7205b2daf4c292e4a892917cb70c9ad094807e06.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/ca3e8c7bfa6cddfa4072e145e41c2ea5853e20eb7dd3fe248daff702f70f2b92.md"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d4e7310d448a9bad3d139cf158f5e810d45ac42709033c920852a2bb59d7a67b.patch"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d8780224ae6e27e7e690c2b9af37df10889c6d9f7c94998d1901ecf2aa1c8489.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d878ded673bee0d3e92acec00a58b3e4abf398657b1af8c6d7acc0581a600eca.patch"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/db1ecae63dc7907cf907f6a3c55796ccc7e657d3d08f4444fa88a636f87e19ae.json"
          - ".agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/f7a320856a0c9e0693c1730246a11ca86b0ff72ed1f300ac1e15b9b03e98332c.md"
          - ".agentplane/tasks/202609121424-T83XJA/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121424-T83XJA/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121424-T83XJA/verification/20260912235808962-d24b6391461802ed.json"
          - ".agentplane/tasks/202609121424-T83XJA/verification/20260913003619890-42f23c8883cc131b.json"
          - ".agentplane/tasks/202609121424-T83XJA/verification/20260913005226102-ceb047a7ccf2c2b3.json"
          - ".agentplane/tasks/202609121424-T83XJA/verification/20260913010700093-e36892520f15824e.json"
          - ".agentplane/tasks/202609121424-T83XJA/verification/20260913012005778-95316adc92df4839.json"
          - ".agentplane/tasks/202609121424-T83XJA/verification/20260913022102845-bc539048309e8b4b.json"
          - ".agentplane/tasks/202609121424-T83XJA/verification/20260913024448095-5fb0e10903a98369.json"
          - ".agentplane/tasks/202609121424-ZEJ656/README.md"
          - ".agentplane/tasks/202609121424-ZEJ656/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121424-ZEJ656/pr/diffstat.txt"
          - ".agentplane/tasks/202609121424-ZEJ656/pr/github-body.md"
          - ".agentplane/tasks/202609121424-ZEJ656/pr/github-title.txt"
          - ".agentplane/tasks/202609121424-ZEJ656/pr/meta.json"
          - ".agentplane/tasks/202609121424-ZEJ656/pr/review.md"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-174258349-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-episode.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/20260913-175634428-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/02e06f7837d90b8c1a4c80a067029b3d4f4802a7788db19bfb920cae2eb47960.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/2d96a0a1b65b6eb63d63ca65f5579c5bcd837911a14fae3454151c4600379c6f.md"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/3266eed93b6c2ee5c3dcafb4a3b4d13850a953740dea2310d0952072f03badf6.patch"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/427f640e2ae0afe8eb8b0c213c5936829f0039f2a9a820ed6da7e4bba888d417.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/645bd8fc3172665facd7fa060bd2449d0d6807e403d60fbba893f576d782aa48.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/dd30524e816e06c170e4463e324a5b91ece050fccd1f2dc0c7e6efc1de7b7d96.md"
          - ".agentplane/tasks/202609121424-ZEJ656/quality/objects/sha256/e250ba6eed9dac39f1d34ea4b79b5cd1af5ddbd4db9feb0eb9ca79a288d5146d.patch"
          - ".agentplane/tasks/202609121424-ZEJ656/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121424-ZEJ656/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121424-ZEJ656/verification/20260913173104921-b490fe5c549405a7.json"
          - ".agentplane/tasks/202609121424-ZEJ656/verification/20260913174248617-5e2c7c1b546c9adf.json"
          - ".agentplane/tasks/202609121424-ZEJ656/verification/20260913175610563-5ac26e94d52e7e95.json"
          - ".agentplane/tasks/202609121443-YAQJB7/README.md"
          - ".agentplane/tasks/202609121443-YAQJB7/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121443-YAQJB7/pr/diffstat.txt"
          - ".agentplane/tasks/202609121443-YAQJB7/pr/github-body.md"
          - ".agentplane/tasks/202609121443-YAQJB7/pr/github-title.txt"
          - ".agentplane/tasks/202609121443-YAQJB7/pr/meta.json"
          - ".agentplane/tasks/202609121443-YAQJB7/pr/review.md"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-152622860-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/20260912-155844516-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/037b114aa4abe7b0e0119db64d095a2c89e6a96524302cf3178d8565e6ec2c14.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/2b8007144a78a8e253c587d0acee638badd0cff246abb3d432cb9f9e4e6d3dde.patch"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/4e4663b88bad490900a4220b00dc7fee5760937ec992760e9a207c7eb9e3627f.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/4fb577afddfa23e48934d3fd97b5d4eed6a268c09f2a99b2757a787f772524c9.patch"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/d6efce4af0f91d20f162315595337bcf5488e18e238e375b7bc71599448acb7f.md"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/dcfc1025a9aed4f7c2754776832609f6fba2792fc2af68691d51c13e7ca6453e.json"
          - ".agentplane/tasks/202609121443-YAQJB7/quality/objects/sha256/e39b3fde6118f533167fe493d76e6fca5a2bdae1ea315100549c2debaa6b7eb5.md"
          - ".agentplane/tasks/202609121443-YAQJB7/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121443-YAQJB7/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121443-YAQJB7/verification/20260912150145007-94ad8b0b5d6e7a5f.json"
          - ".agentplane/tasks/202609121443-YAQJB7/verification/20260912151433121-0625d9b1032c22f6.json"
          - ".agentplane/tasks/202609121443-YAQJB7/verification/20260912152612320-266028623a750e67.json"
          - ".agentplane/tasks/202609121443-YAQJB7/verification/20260912155829304-40fd8186769b7cb3.json"
          - ".agentplane/tasks/202609121655-14X73Y/README.md"
          - ".agentplane/tasks/202609121655-14X73Y/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121655-14X73Y/pr/diffstat.txt"
          - ".agentplane/tasks/202609121655-14X73Y/pr/github-body.md"
          - ".agentplane/tasks/202609121655-14X73Y/pr/github-title.txt"
          - ".agentplane/tasks/202609121655-14X73Y/pr/meta.json"
          - ".agentplane/tasks/202609121655-14X73Y/pr/review.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-165850039-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-170139141-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-171809941-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172100121-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/20260912-172652398-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/237ae6fd87880620f0eaf49ebf2c2cc9019d8b61bc70f5d685c5c24645019e75.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/26ccce49362bfe0526b6093a54edf43bb6449c4dce5c7cd392eaf99a67f2bc88.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/2d25e178965ea7a8b3764ce176d849f5ace3affd3cd7c5ba0613f132768bf577.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/481c232f4b9e8900685e65842d0827321257be35d04dd97651d6fc1138db20e8.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/55f609cd566fcdfc2f7c7919f37fc728e49e91b7ec398c481a0e4c7b22cecf21.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/5b7b9a24c98e70acdcf10ca8f8102989610cefcefcc06ff82ac421f08f0a3216.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/78be06878aa806c3f440f9e711398ceb09abb1786645a6201ef44918029b5aae.patch"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/8dabed42173c1010c79d710475610931d39fa947e80d1d40e9e4c92100ef5a29.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/9b7548e71f3e04d33d97d367de9342e7fa425c4567e0f08a457e9023127a3bb5.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/c0e700d2a720b717f87f90dd1a5694890794c91cd0bbc1123d0e5deb678c961e.patch"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/c34f522f8f2a26e19e7252768fdabe140c3fe8b462213c4dcba9c071243941ca.json"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/c49f3ab8980db7744dc1fa3880316d3979f9cd757816c20f3535a0799e0f662f.md"
          - ".agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/d0ff8a97b08f736b32fba490a592611aa232e2f17b277e1441ce63f491e1c830.patch"
          - ".agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121655-14X73Y/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121655-14X73Y/verification/20260912165840724-794ccd03769c7438.json"
          - ".agentplane/tasks/202609121655-14X73Y/verification/20260912170128631-e3627fa2f133abd2.json"
          - ".agentplane/tasks/202609121655-14X73Y/verification/20260912172637771-dad0637e7d2ce25c.json"
          - ".agentplane/tasks/202609121932-MAT0V1/README.md"
          - ".agentplane/tasks/202609121932-MAT0V1/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609121932-MAT0V1/pr/diffstat.txt"
          - ".agentplane/tasks/202609121932-MAT0V1/pr/github-body.md"
          - ".agentplane/tasks/202609121932-MAT0V1/pr/github-title.txt"
          - ".agentplane/tasks/202609121932-MAT0V1/pr/meta.json"
          - ".agentplane/tasks/202609121932-MAT0V1/pr/review.md"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/538d6ac7ee81b989d31c44b237ec748a9249418d708cc53de439d4ef869b74ab.md"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/5c34861b8e4080445b2222d70ca4383c097b5c61fd208c65c997e2916ab93c4e.json"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/8f8b056961571fb1e4a204e4b56c04e758450bdb7d6d665a068c3e3e2abe0efd.json"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/f8d2fa7909b04a94b066f46cba2deb24f9c0ae13f67fb99a8a4e6d3b39561c05.patch"
          - ".agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
          - ".agentplane/tasks/202609121932-MAT0V1/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609121932-MAT0V1/verification/20260912203120576-695065f4472d17d4.json"
          - ".agentplane/tasks/202609122147-5F5WP0/README.md"
          - ".agentplane/tasks/202609122147-5F5WP0/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609122147-5F5WP0/pr/diffstat.txt"
          - ".agentplane/tasks/202609122147-5F5WP0/pr/github-body.md"
          - ".agentplane/tasks/202609122147-5F5WP0/pr/github-title.txt"
          - ".agentplane/tasks/202609122147-5F5WP0/pr/meta.json"
          - ".agentplane/tasks/202609122147-5F5WP0/pr/review.md"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/20260912-224125750-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/292d74c32671b11f5c4555210e0568e7fbf542259c5105b67c5562fb5095ed3a.md"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/69581e7536d57b062574d7441147b5ba42f0234176e61f693b59e29a7d87387b.patch"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/e12ac41bcaa355159b9344982ae8526f379ef82290301b30a895f00788ce013a.json"
          - ".agentplane/tasks/202609122147-5F5WP0/quality/objects/sha256/e314657ba02eb940c087044dc705c0d9b65b1022d3ced6a27626e6b0104ded71.json"
          - ".agentplane/tasks/202609122147-5F5WP0/supervision/declared-checks.json"
          - ".agentplane/tasks/202609122147-5F5WP0/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609122147-5F5WP0/verification/20260912224058659-fd36fb3df31fb67b.json"
          - ".agentplane/tasks/202609122236-JFNN6B/README.md"
          - ".agentplane/tasks/202609122236-JFNN6B/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609122236-JFNN6B/pr/diffstat.txt"
          - ".agentplane/tasks/202609122236-JFNN6B/pr/github-body.md"
          - ".agentplane/tasks/202609122236-JFNN6B/pr/github-title.txt"
          - ".agentplane/tasks/202609122236-JFNN6B/pr/meta.json"
          - ".agentplane/tasks/202609122236-JFNN6B/pr/review.md"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260912-233643946-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-episode.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-001224128-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/20260913-004504670-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/37a7c521cb68ab65ad7dd31265013466c270b018ae485ee98350cc44a6d3dfb3.patch"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/48733dfb6d54ec4b14bf700c9d28004337f7d0c5a531e0ad49ffce33dbb03c2c.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/60139576ecdbc1b4e0cb4c8a10b1829fb93e6ab00d3d2406bb7bbaa5ab9925cd.patch"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/641fe8301cea21b831c12722926934013a2904402679c390fb6faf83ff8b9e80.md"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/6c4d9ed6da3b65274d128a9ea9f367ad9618428f7c95c0b50e80051155a40777.patch"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/8d6fd252eeb92f2e6a2e0d7743aab502bce326917c327688070cc48e0771c75e.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/d2d523b3e451aea92846b23a8d8c8ca07d8871c5f77369f156af869098b9fefc.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/ee9a3c8d5db971958ba65fbed4becea7dfb79c3922ae194785f386526462fa32.json"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/f04f628a684122a3026a9dc5dc2fdcb8029d03bad56f9173fc159702e2400a6e.md"
          - ".agentplane/tasks/202609122236-JFNN6B/quality/objects/sha256/fc95413fdc92bd5259cb98b53ab4a22eaaf7b14b302451a1f8d74a8ad9f64982.md"
          - ".agentplane/tasks/202609122236-JFNN6B/semantic-report-3fb932a4f0a1b18ec08a4d24e18329028eabb5a3a65864e06d6bb32b044d38f7.json"
          - ".agentplane/tasks/202609122236-JFNN6B/supervision/declared-checks.json"
          - ".agentplane/tasks/202609122236-JFNN6B/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609122236-JFNN6B/verification/20260912233634529-0bf83b1b982adaaa.json"
          - ".agentplane/tasks/202609122236-JFNN6B/verification/20260913000745222-ee6c7884cd80e39b.json"
          - ".agentplane/tasks/202609122236-JFNN6B/verification/20260913004348447-e0a20fe5276be03a.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/README.md"
          - ".agentplane/tasks/202609130858-RMHWQ5/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/pr/diffstat.txt"
          - ".agentplane/tasks/202609130858-RMHWQ5/pr/github-body.md"
          - ".agentplane/tasks/202609130858-RMHWQ5/pr/github-title.txt"
          - ".agentplane/tasks/202609130858-RMHWQ5/pr/meta.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/pr/review.md"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-142716889-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/20260913-150209694-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/3c34c6464fdfcd5edd5f0c210376a46ad2cc3a8d9f00faebd016678d01ba910d.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/43ad1d40294d9235ab5cc9e8ce118fe219ad9c316e6130e58de3b15928f4a2a2.patch"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/8022af9497f1bba25b539636d41e70d97be32d8d38de688376c2c00b9c7a910c.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/86c5e7f7fb0468ae92ab55c699d274f9c979e88bfa56f4036b74e2b221d3768b.patch"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/8bad3aec2ea582efc238391219ddb9d2552a0f581734de22e5657b186d660c50.md"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/a46a8d5df79230a1af45c92f413aab3822a8ff79d9260b3c532f8df21e664474.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/quality/objects/sha256/e0deb27cae8c572563358e6c8ded60ab87cdf064a709c4a9524925b6740eabd6.md"
          - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/verification/20260913142707528-4ce03ab15a211569.json"
          - ".agentplane/tasks/202609130858-RMHWQ5/verification/20260913150154090-d4d3fab0dda1aa18.json"
          - ".agentplane/tasks/202609132330-RP315R/README.md"
          - ".agentplane/tasks/202609132330-RP315R/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609132330-RP315R/pr/diffstat.txt"
          - ".agentplane/tasks/202609132330-RP315R/pr/github-body.md"
          - ".agentplane/tasks/202609132330-RP315R/pr/github-title.txt"
          - ".agentplane/tasks/202609132330-RP315R/pr/meta.json"
          - ".agentplane/tasks/202609132330-RP315R/pr/review.md"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-000305834-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/20260914-001545750-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/0606a566f1e8ece92c4b4ff8b5c3149fde96a6691096cf4353bb5565b62371ac.md"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/33bf971a63b60bfd95065c6b6e3197e69729abc256f36917ed04cba640b5efe7.md"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/5fdc349443f9d4c306d66269affb90f089b3f4210965465632669792c49b2c9f.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/8c87ef14fe9c10fb7cc3dd0ab299a5488f57c3a9213ab528e58cae727cd21ce6.patch"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/8f95b5e66dc32f47938a55f425309917860f5af654088dbb61b52b3046bff56b.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/f2b667d01ac0062ff0d6945c3aa11c2dd521b3d85aed095feced67de45a232f3.patch"
          - ".agentplane/tasks/202609132330-RP315R/quality/objects/sha256/fed6cce54d60d18e2430e7cdd9b708ad947f99bb9955a1e4353348622e31047f.json"
          - ".agentplane/tasks/202609132330-RP315R/supervision/declared-checks.json"
          - ".agentplane/tasks/202609132330-RP315R/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609132330-RP315R/verification/20260914000256951-fbce6a369f29b1cd.json"
          - ".agentplane/tasks/202609132330-RP315R/verification/20260914001534469-1a7f6ca2d2732103.json"
          - ".agentplane/tasks/202609140050-8QDRVN/README.md"
          - ".agentplane/tasks/202609140050-8QDRVN/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609140050-8QDRVN/pr/diffstat.txt"
          - ".agentplane/tasks/202609140050-8QDRVN/pr/github-body.md"
          - ".agentplane/tasks/202609140050-8QDRVN/pr/github-title.txt"
          - ".agentplane/tasks/202609140050-8QDRVN/pr/meta.json"
          - ".agentplane/tasks/202609140050-8QDRVN/pr/review.md"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/20260914-014438643-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/007ad751a64e6a3fc4c76b11e146a0e264d3629a865b23ee9b89ccb03785edc3.json"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/390511960cf208eb237e7d06bd52162fefa52783dbc1038b48e6f1f1988f08df.patch"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/5861dad09e13f523e9a392a5ddd8a4b959b643b46dac2839064d13dfc644a7fe.md"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/7bf79f1c63f9fb40ab92f33a74add480a1de3c515299836cb5eb9e8dffa962c7.json"
          - ".agentplane/tasks/202609140050-8QDRVN/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609140050-8QDRVN/supervision/declared-checks.json"
          - ".agentplane/tasks/202609140050-8QDRVN/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609140050-8QDRVN/verification/20260914011824089-7444e50e4bb0ea0d.json"
          - ".agentplane/tasks/202609140050-8QDRVN/verification/20260914013112134-8e2a0f7c7485bde0.json"
          - ".agentplane/tasks/202609140050-8QDRVN/verification/20260914014428438-c9b85eadd02c96e7.json"
          - ".agentplane/tasks/202609140657-5REY71/README.md"
          - ".agentplane/tasks/202609140657-5REY71/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609140657-5REY71/pr/diffstat.txt"
          - ".agentplane/tasks/202609140657-5REY71/pr/github-body.md"
          - ".agentplane/tasks/202609140657-5REY71/pr/github-title.txt"
          - ".agentplane/tasks/202609140657-5REY71/pr/meta.json"
          - ".agentplane/tasks/202609140657-5REY71/pr/review.md"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-080510987-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/20260914-084735380-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/100555e07a44a5d91d922a409f3892912ee73a02966249e30791f5b4b2a3a0bb.patch"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/3fd14e76a5923587eecc8489fc8a6b6aeac2d0b7d81224323d10cd6028f15746.patch"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/4cada3577887cfa0bad4151f308323510aaea16a44901a4010e5924bdc2e0036.md"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/5994e868d32b7844cf84f1f13cf87c444b4133c3888ab394001f5481bb734918.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/78ab76a7cb6ee5bb17fa50d9b2e81528a673ce2ddf73edf85ecbf2a7edfb7be5.md"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/93d109ad7afba099b1f2caa2b645d5eded949a77507a480ac4d607654cc4bc69.json"
          - ".agentplane/tasks/202609140657-5REY71/quality/objects/sha256/a85a7e55d192e720583463869d1839f73285d233d62d9d8932309a6d0ae8fa57.json"
          - ".agentplane/tasks/202609140657-5REY71/supervision/declared-checks.json"
          - ".agentplane/tasks/202609140657-5REY71/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609140657-5REY71/verification/20260914080501701-3b1483d7bf124fd2.json"
          - ".agentplane/tasks/202609140657-5REY71/verification/20260914084606234-271e10519bfe0f6d.json"
          - ".agentplane/tasks/202609140925-AWJQMB/README.md"
          - ".agentplane/tasks/202609140925-AWJQMB/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609140925-AWJQMB/pr/diffstat.txt"
          - ".agentplane/tasks/202609140925-AWJQMB/pr/github-body.md"
          - ".agentplane/tasks/202609140925-AWJQMB/pr/github-title.txt"
          - ".agentplane/tasks/202609140925-AWJQMB/pr/meta.json"
          - ".agentplane/tasks/202609140925-AWJQMB/pr/review.md"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-110002617-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/20260914-133809574-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/02d52954c2e0aea451d2eb6e979f114169761cfd3c18fc9af5828abfaf0bb87d.md"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/031cee6a949d3037f956dd6eced48cf0e4bd03180884db849dfc7212d5a5df37.patch"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/3610cac068019e3e1b200bec4d30bfc9c14f68655b5affb994bedef16811b961.patch"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/79925d1c562283b4bce30fdcf4fd98f2d193c231af92aa5f11441792a52d0fb3.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/a300db90dc4e6981d570d6b6e7d686aba6fe384030746744e5c89130b19af35d.json"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/a3750eedfe336fff02e87f992ddd15c923944fdb343d988c49348617b5cd31d0.md"
          - ".agentplane/tasks/202609140925-AWJQMB/quality/objects/sha256/f4c4bd38a163310d42d9ce8caa4fce677d9ce5702a971c5a75f5fd2cb83970d7.json"
          - ".agentplane/tasks/202609140925-AWJQMB/supervision/declared-checks.json"
          - ".agentplane/tasks/202609140925-AWJQMB/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609140925-AWJQMB/verification/20260914103455907-598e45505eb1ed9d.json"
          - ".agentplane/tasks/202609140925-AWJQMB/verification/20260914105030069-1bf823f8d4a7c0f5.json"
          - ".agentplane/tasks/202609140925-AWJQMB/verification/20260914105952042-5ecf5db8809e0a57.json"
          - ".agentplane/tasks/202609140925-AWJQMB/verification/20260914133759896-ab019b58d9b41d4c.json"
          - ".agentplane/tasks/202609141440-VFA9C1/README.md"
          - ".agentplane/tasks/202609141440-VFA9C1/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202609141440-VFA9C1/pr/diffstat.txt"
          - ".agentplane/tasks/202609141440-VFA9C1/pr/github-body.md"
          - ".agentplane/tasks/202609141440-VFA9C1/pr/github-title.txt"
          - ".agentplane/tasks/202609141440-VFA9C1/pr/meta.json"
          - ".agentplane/tasks/202609141440-VFA9C1/pr/review.md"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/20260914-160224812-recovery-context/quality-report.json"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/47f9474fcf8c5d5814c1af4a39772e72c1faf55d5454ec0a4d60db43846d03c1.md"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/63de350557411146ca66ec72e3d95a0d7a3abb88af2dc9bc3dfd445880b7ed03.json"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/80c915ee57425f981428bc138f9cd23ec3135d75056b6ac8ae6f26c4eb512ea1.patch"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202609141440-VFA9C1/quality/objects/sha256/b1cbbdf35481f6e235ce22df666443bbfb64ea7b8884fd1ed48a26a903b69cc4.json"
          - ".agentplane/tasks/202609141440-VFA9C1/supervision/declared-checks.json"
          - ".agentplane/tasks/202609141440-VFA9C1/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202609141440-VFA9C1/verification/20260914160215087-a8392fd8995b0aa6.json"
          - ".prettierignore"
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers/adr.svg"
          - "docs/assets/readme-headers/agentplane-cli.svg"
          - "docs/assets/readme-headers/agentplane.svg"
          - "docs/assets/readme-headers/core.svg"
          - "docs/assets/readme-headers/docs.svg"
          - "docs/assets/readme-headers/humanizer.svg"
          - "docs/assets/readme-headers/recipes.svg"
          - "docs/assets/readme-headers/releases.svg"
          - "docs/assets/readme-headers/schemas.svg"
          - "docs/assets/readme-headers/scripts.svg"
          - "docs/assets/readme-headers/skills.svg"
          - "docs/assets/readme-headers/spec.svg"
          - "docs/assets/readme-headers/testkit.svg"
          - "docs/developer/blueprints.mdx"
          - "docs/internal/v0.7-agent-efficiency-baseline.md"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.9-evidence/candidate-base-synchronization.json"
          - "docs/releases/v0.7.9-evidence/preparation.md"
          - "docs/releases/v0.7.9-evidence/release-plan-changes.json"
          - "docs/releases/v0.7.9-evidence/release-plan-version.json"
          - "docs/releases/v0.7.9.md"
          - "docs/user/commands.mdx"
          - "docs/user/task-lifecycle.mdx"
          - "docs/user/workflow.mdx"
          - "package.json"
          - "packages/agentplane/package.json"
          - "packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task-supervisor.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/cli/task-advance-result-rejection-recovery.testkit.ts"
          - "packages/agentplane/src/commands/branch/sync-task-base.test.ts"
          - "packages/agentplane/src/commands/branch/sync-task-base.ts"
          - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
          - "packages/agentplane/src/commands/context/assimilation-supervisor.unit.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute-subprocess.testkit.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-failure-recovery.ts"
          - "packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts"
          - "packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
          - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
          - "packages/agentplane/src/commands/release/task-state-script.test.ts"
          - "packages/agentplane/src/commands/shared/branch-base-sync-route.test.ts"
          - "packages/agentplane/src/commands/shared/branch-base-sync-route.ts"
          - "packages/agentplane/src/commands/shared/lifecycle-stage-timing.ts"
          - "packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts"
          - "packages/agentplane/src/commands/shared/roadmap-managed-accounting.test.ts"
          - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
          - "packages/agentplane/src/commands/shared/route-decision.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-observation.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
          - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch-base-sync-spec.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch-base-sync.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch-state.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-usage.ts"
          - "packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.ts"
          - "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-result-rejection-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
          - "packages/agentplane/src/commands/task/finish-command.ts"
          - "packages/agentplane/src/commands/task/kernel-run.ts"
          - "packages/agentplane/src/commands/task/roadmap-external-accounting.test.ts"
          - "packages/agentplane/src/commands/task/roadmap-stage-timing.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend-legacy-compat.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.ts"
          - "packages/agentplane/src/commands/task/supervisor-budget-epoch.command.ts"
          - "packages/agentplane/src/commands/task/task-token-usage.ts"
          - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
          - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
          - "packages/agentplane/src/runner/adapters/codex.ts"
          - "packages/agentplane/src/runner/adapters/custom.test.ts"
          - "packages/agentplane/src/runner/adapters/custom.ts"
          - "packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
          - "packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts"
          - "packages/agentplane/src/runner/artifacts.ts"
          - "packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
          - "packages/agentplane/src/runtime/prompt-modules/gpt55-contract.test.ts"
          - "packages/agentplane/src/runtime/prompt-modules/gpt55-contract.ts"
          - "packages/agentplane/src/runtime/prompt-modules/gpt56-contract.test.ts"
          - "packages/agentplane/src/runtime/prompt-modules/gpt56-contract.ts"
          - "packages/agentplane/src/runtime/prompt-modules/index.ts"
          - "packages/agentplane/src/runtime/prompt-modules/model.ts"
          - "packages/agentplane/src/runtime/workspace-allocation/allocate.test.ts"
          - "packages/core/package.json"
          - "packages/core/src/runner/agent-work-order.ts"
          - "packages/core/src/runner/supervisor-execution-episode-telemetry-admission.test.ts"
          - "packages/core/src/runner/supervisor-execution-episode-timing.test.ts"
          - "packages/core/src/runner/supervisor-execution-episode.test.ts"
          - "packages/core/src/runner/supervisor-execution-episode.ts"
          - "packages/core/src/schemas/index.ts"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "scripts/README.md"
          - "scripts/baselines/architecture-inventory.json"
          - "scripts/baselines/clone-baseline.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/authority.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/campaign.lock.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/evidence.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/agentplane.tgz"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/package-lock.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/package.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-candidate.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-minimal_agent.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-previous_release.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/report.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/target.bundle"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/authority.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/campaign.lock.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/disposition.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/evidence.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-candidate.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-minimal_agent.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-previous_release.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/report.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/target.bundle"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/baselines/v0.7.9-stabilization-candidate.json"
          - "scripts/bench/paired-live-codex-launcher.mjs"
          - "scripts/bench/paired-live-codex-launcher.test.mjs"
          - "scripts/bench/paired-m01-materialize.mjs"
          - "scripts/bench/paired-m01-materialize.test.mjs"
          - "scripts/bench/paired-m01-oracle.mjs"
          - "scripts/bench/paired-production-driver.mjs"
          - "scripts/bench/paired-production-driver.test.mjs"
          - "scripts/bench/paired-result-report.mjs"
          - "scripts/bench/paired-result-report.test.mjs"
          - "scripts/bench/task-cost-rollup.test.mjs"
          - "scripts/bench/task-marginal-cost.test.mjs"
          - "scripts/check-coverage-thresholds.mjs"
          - "scripts/checks/architecture-inventory.mjs"
          - "scripts/checks/architecture-inventory.test.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/checks/check-coverage-thresholds.mjs"
          - "scripts/checks/check-task-state.mjs"
          - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
          - "scripts/lib/test-route-registry.mjs"
          - "scripts/lib/test-route-registry.test.mjs"
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
          - "website/static/img/social/docs/releases/v0.7.2.png"
          - "website/static/img/social/docs/releases/v0.7.3.png"
          - "website/static/img/social/docs/releases/v0.7.4.png"
          - "website/static/img/social/docs/releases/v0.7.5.png"
          - "website/static/img/social/docs/releases/v0.7.6.png"
          - "website/static/img/social/docs/releases/v0.7.7.png"
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
          - "website/static/llms-full.txt"
        external_effects: []
        repository_effects:
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
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
      - "external_effect:credentials"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "76f4ca2eaf6b6d5955496679f2339864cff3a28b"
  message: "🚧 49XXT3 task: record external implementation evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version bump requires two release metadata files outside the issued writable roots. Recommended action: Approve the exact scope extension, request a fresh packet, and rerun the canonical version bump without excluding release surfaces. Requested scope: roots=.agentplane/WORKFLOW.md,.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923. Agentplane receipt: external-agent-blocker/tr_c6fd4ad79889a8a1540b287109085a52/sha256:b8cffe516cf04d094fc3f81064acd6d65e5e21afcb7e8823df89b26d72b398d2/sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/WORKFLOW.md, .agentplane/config.json; repository effects: release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The release range must be frozen by the operator-owned release plan before stable version mutation. Recommended action: Return control to the operator, run `agentplane release plan --patch`, then request a fresh semantic packet for candidate preparation. Agentplane receipt: external-agent-blocker/tr_070ee5381abe878f776b35e133be89c7/sha256:6c3de6fc00f1da0c6ab6ab13c60ccd481eec169b064796457d692775f3879ea1."
  -
    author: "CODER"
    body: "Start: Resume stable 0.7.9 candidate preparation after the operator-owned release plan was generated at .agentplane/.release/plan/2026-09-13T23-07-41-521Z."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The complete release check requires generated social assets for the new release documentation. Recommended action: Approve the exact generated asset roots, run `bun run docs:social:generate`, and rerun the complete release check. Requested scope: roots=website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png,website/static/img/social/docs/releases/v0.7.9.png,website/static/img/social/manifest.json; repository effects=documentation,release_metadata,repository_write; request digest=sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5. Agentplane receipt: external-agent-blocker/tr_9031fb2bd52327684141227d8dfc6ff7/sha256:0236d1160fbd9234951721268e8e8a51ed494cd0fbcda7c470c81c502bef612e/sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png, website/static/img/social/docs/releases/v0.7.9.png, website/static/img/social/manifest.json; repository effects: documentation, release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical social-image generator updates the complete generated social asset tree, not only the two new 0.7.9 images. Recommended action: Approve the generated social root, request a fresh packet, recreate the stable candidate, run `bun run docs:social:generate`, and rerun the complete release checks. Requested scope: roots=website/static/img/social; repository effects=documentation,release_metadata,repository_write; request digest=sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256. Agentplane receipt: external-agent-blocker/tr_a9b5612b125816493e821ae0bf34f942/sha256:ee0d8bdcc65ad45e20165f8e9f479296831a581cae9de2f8c710b3dba9301971/sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: website/static/img/social; repository effects: documentation, release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1e0f3ea01052. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. AgentPlane classified the canonical stable version promotion as three repository effects that are absent from the current execution contract. Recommended action: Approve the exact repository-effect extension and request a fresh packet without adding paths or external effects. Requested scope: roots=unchanged; repository effects=dependencies,public_api,source_code; request digest=sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1. Agentplane receipt: external-agent-blocker/tr_eb6f91d3374408b2b64c68bbfbd20f24/sha256:e534773c2819abeeaa85e5655030dfdafc4556e24dcedd39e569052f44fe9fd9/sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: ; repository effects: dependencies, public_api, source_code."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal committed-candidate gate found a pre-existing task-state integrity failure in the qualified base. Recommended action: Create a separate AgentPlane task from current main, determine the intended immutable-evidence invariant, implement the narrow repair with regression coverage, integrate it through hosted CI, then refresh the 0.7.9 candidate base and rerun the complete prepublish gate. Agentplane receipt: external-agent-blocker/tr_8968ad611cc27642bbd26da3ecd9c844/sha256:f861a7b5a3eb8f61932568d387fe7054e33998181d8e091a03580b049c164b15."
  -
    author: "CODER"
    body: "Resume: PR #5950 merged task-state validation repair at origin/main 9792878934b2c4d068e98056cef3c2c691451a90 | details: continue the approved 0.7.9 release qualification."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Candidate-base synchronization requires a supervisor-owned Git lifecycle operation that this semantic executor is explicitly forbidden to perform. Recommended action: Run or emit the repository-owned candidate branch synchronization operation, record its receipt, and then issue a fresh semantic packet for prepare_candidate. Do not ask an external executor to rebase, cherry-pick, commit, or rewrite Git history. Agentplane receipt: external-agent-blocker/tr_64c6b4be9fa98a3b6e4c3b6312fed325/sha256:f5db69947a8573cb0f586066c4d5aebf308084d76935d1ea398de829dcbdd98d."
  -
    author: "ORCHESTRATOR"
    body: "Resume after the release-base blocker was resolved. | details: PR #5952 merged as origin/main 1a93a9a43da2b714854174491f9672c52bf33e9f, and Core CI run 34825881983 completed successfully for that exact SHA.; The approved plan must be refined before synchronization because its existing base 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 is obsolete and its ready WorkItem lacks the exact branch-base claim required by current main."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: dea7d66178a0. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The required prepublish gate is blocked by two reproducible qualified-main test regressions outside the release-only mutation contract. Recommended action: Create a separate AgentPlane stabilization task from current qualified main. Repair durable unavailable usage observation for managed custom runners and restore branch_pr finish guard ordering with focused regression coverage. Integrate the repair through hosted CI. Then resynchronize this candidate to the new exact main SHA, refresh the release metadata and baselines, and rerun release:prepublish. Agentplane receipt: external-agent-blocker/tr_f4266b50a2fbe3b9a127ac441fc6f6d7/sha256:a1e70f328dad6407aa986dc52155cf974445434e47575a5e968f2f1c2f285b04."
  -
    author: "CODER"
    body: "Start: release blockers are integrated and hosted-verified on main; resume the approved 0.7.9 release plan against the new qualified base."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 529d2a93fa06. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal 0.7.9 prepublish gate exposed incomplete task-centric WorkItem setup in two route-decision test fixtures. Recommended action: Refine the plan to add only the two failing test files, call the existing completeRouteWorkItem helper at the fixture transition from implementation to downstream routing, then rerun the focused tests and the complete release:prepublish gate. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts,packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository effects=tests; request digest=sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52. Agentplane receipt: external-agent-blocker/tr_857ee7e8f7e814424cbc07834bcbd4d7/sha256:46654593bbb94946faad1c1bd03c33657db32c344c4c07a2bc04a52088110c14/sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts, packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route-decision chunk passed, but the next release chunk exposed two additional deterministic test-fixture compatibility gaps. Recommended action: Extend the approved test-only scope to the verification and evidence-rework files, preserve the first fixture repair, align the four deterministic expectations with existing lifecycle helpers and explicit exact-key replacement, then rerun focused tests and release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts,packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository effects=tests; request digest=sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66. Agentplane receipt: external-agent-blocker/tr_b401592dda9fd81dde93d4eda3fb42a3/sha256:0ac0e0e7bed730e3439ff5831521098bd50e1489d5e5869c8c77fedb914260dc/sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts, packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route and recovery chunks passed, but the next release chunk exposed one stale prompt-contract assertion. Recommended action: Extend the test-only scope to run-cli.core.task-create-base-intent.test.ts, replace the obsolete result.task_intent literal with the current task_intent contract, preserve all prior fixture repairs, and rerun the focused test plus release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository effects=tests; request digest=sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15. Agentplane receipt: external-agent-blocker/tr_396ecaf9ea7c4304e9f987dd03c49a2d/sha256:397a13112f8b151deda66b600275df2b1fecef21a83b595e6eeeb5bf3b319906/sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired release chunks passed, but chunk 54 exposed one additional deterministic task-run fixture drift. Recommended action: Extend the approved test-only scope to run-cli.core.task-run.test.ts, replace the removed phrase assertion with an exact current bootstrap invariant, run the focused test and lint checks, then rerun release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository effects=tests; request digest=sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02. Agentplane receipt: external-agent-blocker/tr_a7cb32fcf9ae3a742aace6ff193e3328/sha256:798d239f4827d7b42f71f7d280b140ece9383c52e974b183d8e02d227bad0657/sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The task-run fixture repair passed through chunk 54, but chunk 56 exposed one additional stale compatibility metric assertion. Recommended action: Extend the approved test-only scope to run-cli.critical.agent-efficiency-baseline.test.ts, update its exact CLI surface count to the value emitted by the passing canonical checker, run the focused test and lint checks, then rerun release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; repository effects=tests; request digest=sha256:820ab0aabb99b4c4e68f2f1342ac73403a0e552856bd36e505c8c5beb48fb8f4. Agentplane receipt: external-agent-blocker/tr_f6af5edd463b74a987c1352cf9844924/sha256:4583973395ed337e35afd41e33d7a6e7b653733cb0c28b80b1b09b2ca550fa4f/sha256:820ab0aabb99b4c4e68f2f1342ac73403a0e552856bd36e505c8c5beb48fb8f4."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 227836c53ace. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The committed 0.7.9 candidate passed every observed release:prepublish sub-check, but the supervisor terminated the wrapper after 2171380 ms because the WorkItem check timeout is only 1200000 ms. Recommended action: Refine only the prepare_candidate release_prepublish check timeout from 1200000 ms to at least 3600000 ms, preserve the committed candidate unchanged, and rerun the supervisor-owned declared checks. Agentplane receipt: external-agent-blocker/tr_073ae625c26af9dae64a1c9ce5e01cee/sha256:205111bdbbcd9eafe09e03f7373711a3a26148e4832476ef68164aebb2e53392."
  -
    author: "USER"
    body: "Resume after identifying a verification-budget mismatch. Preserve candidate commit 227836c53ace3ccbfa6d7e828a7f79cd5fa62bdf unchanged. Refine only the release_prepublish check timeout to at least 3600000 ms, then rerun supervisor verification."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 38f03c299cd5. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 9228105c4981. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The candidate passed the supervisor-owned local gates, but independent evaluation, hosted CI, protected integration, and hosted close are control-plane operations forbidden by this semantic episode. Recommended action: Request a fresh route packet and execute only the exact supervisor-owned evaluator, authority, PR, hosted CI, integration, and close operations it emits. Agentplane receipt: external-agent-blocker/tr_5ada17d26c3c6fedcb37d664eb72dd09/sha256:b52d20de288b570749731bea3cd8c63fe9bc3a57fef650ce3fcf04bc2dc7dec1."
  -
    author: "USER"
    body: "Resume after the host-space blocker was removed and the supervisor-owned release:prepublish gate passed. Replan the remaining lifecycle so hosted integration and publication stay supervisor-owned."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 026c97813bc5. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-09-13T22:57:11.849Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-13T23:03:44.698Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version bump requires two release metadata files outside the issued writable roots. Recommended action: Approve the exact scope extension, request a fresh packet, and rerun the canonical version bump without excluding release surfaces. Requested scope: roots=.agentplane/WORKFLOW.md,.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923. Agentplane receipt: external-agent-blocker/tr_c6fd4ad79889a8a1540b287109085a52/sha256:b8cffe516cf04d094fc3f81064acd6d65e5e21afcb7e8823df89b26d72b398d2/sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923."
  -
    type: "status"
    at: "2026-09-13T23:07:23.950Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The release range must be frozen by the operator-owned release plan before stable version mutation. Recommended action: Return control to the operator, run `agentplane release plan --patch`, then request a fresh semantic packet for candidate preparation. Agentplane receipt: external-agent-blocker/tr_070ee5381abe878f776b35e133be89c7/sha256:6c3de6fc00f1da0c6ab6ab13c60ccd481eec169b064796457d692775f3879ea1."
  -
    type: "status"
    at: "2026-09-13T23:08:20.260Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: Resume stable 0.7.9 candidate preparation after the operator-owned release plan was generated at .agentplane/.release/plan/2026-09-13T23-07-41-521Z."
  -
    type: "status"
    at: "2026-09-13T23:13:10.761Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The complete release check requires generated social assets for the new release documentation. Recommended action: Approve the exact generated asset roots, run `bun run docs:social:generate`, and rerun the complete release check. Requested scope: roots=website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png,website/static/img/social/docs/releases/v0.7.9.png,website/static/img/social/manifest.json; repository effects=documentation,release_metadata,repository_write; request digest=sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5. Agentplane receipt: external-agent-blocker/tr_9031fb2bd52327684141227d8dfc6ff7/sha256:0236d1160fbd9234951721268e8e8a51ed494cd0fbcda7c470c81c502bef612e/sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5."
  -
    type: "status"
    at: "2026-09-13T23:17:35.778Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical social-image generator updates the complete generated social asset tree, not only the two new 0.7.9 images. Recommended action: Approve the generated social root, request a fresh packet, recreate the stable candidate, run `bun run docs:social:generate`, and rerun the complete release checks. Requested scope: roots=website/static/img/social; repository effects=documentation,release_metadata,repository_write; request digest=sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256. Agentplane receipt: external-agent-blocker/tr_a9b5612b125816493e821ae0bf34f942/sha256:ee0d8bdcc65ad45e20165f8e9f479296831a581cae9de2f8c710b3dba9301971/sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256."
  -
    type: "status"
    at: "2026-09-13T23:20:21.839Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 1e0f3ea01052. CLI accepted one state-bound external-agent semantic result."
    commit: "1e0f3ea01052bd2226fe1fd31079eecafac8f116"
  -
    type: "status"
    at: "2026-09-13T23:21:41.489Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. AgentPlane classified the canonical stable version promotion as three repository effects that are absent from the current execution contract. Recommended action: Approve the exact repository-effect extension and request a fresh packet without adding paths or external effects. Requested scope: roots=unchanged; repository effects=dependencies,public_api,source_code; request digest=sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1. Agentplane receipt: external-agent-blocker/tr_eb6f91d3374408b2b64c68bbfbd20f24/sha256:e534773c2819abeeaa85e5655030dfdafc4556e24dcedd39e569052f44fe9fd9/sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1."
  -
    type: "status"
    at: "2026-09-13T23:30:11.418Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal committed-candidate gate found a pre-existing task-state integrity failure in the qualified base. Recommended action: Create a separate AgentPlane task from current main, determine the intended immutable-evidence invariant, implement the narrow repair with regression coverage, integrate it through hosted CI, then refresh the 0.7.9 candidate base and rerun the complete prepublish gate. Agentplane receipt: external-agent-blocker/tr_8968ad611cc27642bbd26da3ecd9c844/sha256:f861a7b5a3eb8f61932568d387fe7054e33998181d8e091a03580b049c164b15."
  -
    type: "status"
    at: "2026-09-14T00:31:46.313Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: PR #5950 merged task-state validation repair at origin/main 9792878934b2c4d068e98056cef3c2c691451a90 | details: continue the approved 0.7.9 release qualification."
  -
    type: "status"
    at: "2026-09-14T02:08:41.270Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Candidate-base synchronization requires a supervisor-owned Git lifecycle operation that this semantic executor is explicitly forbidden to perform. Recommended action: Run or emit the repository-owned candidate branch synchronization operation, record its receipt, and then issue a fresh semantic packet for prepare_candidate. Do not ask an external executor to rebase, cherry-pick, commit, or rewrite Git history. Agentplane receipt: external-agent-blocker/tr_64c6b4be9fa98a3b6e4c3b6312fed325/sha256:f5db69947a8573cb0f586066c4d5aebf308084d76935d1ea398de829dcbdd98d."
  -
    type: "status"
    at: "2026-09-14T09:13:07.280Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume after the release-base blocker was resolved. | details: PR #5952 merged as origin/main 1a93a9a43da2b714854174491f9672c52bf33e9f, and Core CI run 34825881983 completed successfully for that exact SHA.; The approved plan must be refined before synchronization because its existing base 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 is obsolete and its ready WorkItem lacks the exact branch-base claim required by current main."
  -
    type: "status"
    at: "2026-09-14T14:12:43.781Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: dea7d66178a0. CLI accepted one state-bound external-agent semantic result."
    commit: "dea7d66178a082498a8f40f9e892c656fe59bad5"
  -
    type: "status"
    at: "2026-09-14T14:39:25.433Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The required prepublish gate is blocked by two reproducible qualified-main test regressions outside the release-only mutation contract. Recommended action: Create a separate AgentPlane stabilization task from current qualified main. Repair durable unavailable usage observation for managed custom runners and restore branch_pr finish guard ordering with focused regression coverage. Integrate the repair through hosted CI. Then resynchronize this candidate to the new exact main SHA, refresh the release metadata and baselines, and rerun release:prepublish. Agentplane receipt: external-agent-blocker/tr_f4266b50a2fbe3b9a127ac441fc6f6d7/sha256:a1e70f328dad6407aa986dc52155cf974445434e47575a5e968f2f1c2f285b04."
  -
    type: "status"
    at: "2026-09-14T16:26:34.900Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: release blockers are integrated and hosted-verified on main; resume the approved 0.7.9 release plan against the new qualified base."
  -
    type: "status"
    at: "2026-09-14T22:15:48.057Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 529d2a93fa06. CLI accepted one state-bound external-agent semantic result."
    commit: "529d2a93fa0636f31830be894a727866e788e23a"
  -
    type: "status"
    at: "2026-09-14T22:52:06.599Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal 0.7.9 prepublish gate exposed incomplete task-centric WorkItem setup in two route-decision test fixtures. Recommended action: Refine the plan to add only the two failing test files, call the existing completeRouteWorkItem helper at the fixture transition from implementation to downstream routing, then rerun the focused tests and the complete release:prepublish gate. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts,packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository effects=tests; request digest=sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52. Agentplane receipt: external-agent-blocker/tr_857ee7e8f7e814424cbc07834bcbd4d7/sha256:46654593bbb94946faad1c1bd03c33657db32c344c4c07a2bc04a52088110c14/sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52."
  -
    type: "status"
    at: "2026-09-14T23:29:25.923Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route-decision chunk passed, but the next release chunk exposed two additional deterministic test-fixture compatibility gaps. Recommended action: Extend the approved test-only scope to the verification and evidence-rework files, preserve the first fixture repair, align the four deterministic expectations with existing lifecycle helpers and explicit exact-key replacement, then rerun focused tests and release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts,packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository effects=tests; request digest=sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66. Agentplane receipt: external-agent-blocker/tr_b401592dda9fd81dde93d4eda3fb42a3/sha256:0ac0e0e7bed730e3439ff5831521098bd50e1489d5e5869c8c77fedb914260dc/sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66."
  -
    type: "status"
    at: "2026-09-15T00:06:32.254Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route and recovery chunks passed, but the next release chunk exposed one stale prompt-contract assertion. Recommended action: Extend the test-only scope to run-cli.core.task-create-base-intent.test.ts, replace the obsolete result.task_intent literal with the current task_intent contract, preserve all prior fixture repairs, and rerun the focused test plus release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository effects=tests; request digest=sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15. Agentplane receipt: external-agent-blocker/tr_396ecaf9ea7c4304e9f987dd03c49a2d/sha256:397a13112f8b151deda66b600275df2b1fecef21a83b595e6eeeb5bf3b319906/sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15."
  -
    type: "status"
    at: "2026-09-15T00:51:41.248Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired release chunks passed, but chunk 54 exposed one additional deterministic task-run fixture drift. Recommended action: Extend the approved test-only scope to run-cli.core.task-run.test.ts, replace the removed phrase assertion with an exact current bootstrap invariant, run the focused test and lint checks, then rerun release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository effects=tests; request digest=sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02. Agentplane receipt: external-agent-blocker/tr_a7cb32fcf9ae3a742aace6ff193e3328/sha256:798d239f4827d7b42f71f7d280b140ece9383c52e974b183d8e02d227bad0657/sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02."
  -
    type: "status"
    at: "2026-09-15T01:27:08.271Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The task-run fixture repair passed through chunk 54, but chunk 56 exposed one additional stale compatibility metric assertion. Recommended action: Extend the approved test-only scope to run-cli.critical.agent-efficiency-baseline.test.ts, update its exact CLI surface count to the value emitted by the passing canonical checker, run the focused test and lint checks, then rerun release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; repository effects=tests; request digest=sha256:820ab0aabb99b4c4e68f2f1342ac73403a0e552856bd36e505c8c5beb48fb8f4. Agentplane receipt: external-agent-blocker/tr_f6af5edd463b74a987c1352cf9844924/sha256:4583973395ed337e35afd41e33d7a6e7b653733cb0c28b80b1b09b2ca550fa4f/sha256:820ab0aabb99b4c4e68f2f1342ac73403a0e552856bd36e505c8c5beb48fb8f4."
  -
    type: "status"
    at: "2026-09-15T02:18:15.103Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 227836c53ace. CLI accepted one state-bound external-agent semantic result."
    commit: "227836c53ace3ccbfa6d7e828a7f79cd5fa62bdf"
  -
    type: "status"
    at: "2026-09-15T02:56:31.767Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The committed 0.7.9 candidate passed every observed release:prepublish sub-check, but the supervisor terminated the wrapper after 2171380 ms because the WorkItem check timeout is only 1200000 ms. Recommended action: Refine only the prepare_candidate release_prepublish check timeout from 1200000 ms to at least 3600000 ms, preserve the committed candidate unchanged, and rerun the supervisor-owned declared checks. Agentplane receipt: external-agent-blocker/tr_073ae625c26af9dae64a1c9ce5e01cee/sha256:205111bdbbcd9eafe09e03f7373711a3a26148e4832476ef68164aebb2e53392."
  -
    type: "status"
    at: "2026-09-15T02:57:39.806Z"
    author: "USER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume after identifying a verification-budget mismatch. Preserve candidate commit 227836c53ace3ccbfa6d7e828a7f79cd5fa62bdf unchanged. Refine only the release_prepublish check timeout to at least 3600000 ms, then rerun supervisor verification."
  -
    type: "status"
    at: "2026-09-15T06:47:19.154Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 38f03c299cd5. CLI accepted one state-bound external-agent semantic result."
    commit: "38f03c299cd54ed306caeded77c71f9edf1377eb"
  -
    type: "status"
    at: "2026-09-15T13:19:49.317Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 9228105c4981. CLI accepted one state-bound external-agent semantic result."
    commit: "9228105c498124a0435460fc3e109e1645e30029"
  -
    type: "status"
    at: "2026-09-15T13:59:39.876Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The candidate passed the supervisor-owned local gates, but independent evaluation, hosted CI, protected integration, and hosted close are control-plane operations forbidden by this semantic episode. Recommended action: Request a fresh route packet and execute only the exact supervisor-owned evaluator, authority, PR, hosted CI, integration, and close operations it emits. Agentplane receipt: external-agent-blocker/tr_5ada17d26c3c6fedcb37d664eb72dd09/sha256:b52d20de288b570749731bea3cd8c63fe9bc3a57fef650ce3fcf04bc2dc7dec1."
  -
    type: "status"
    at: "2026-09-15T14:01:22.381Z"
    author: "USER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume after the host-space blocker was removed and the supervisor-owned release:prepublish gate passed. Replan the remaining lifecycle so hosted integration and publication stay supervisor-owned."
  -
    type: "status"
    at: "2026-09-16T19:31:10.070Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 026c97813bc5. CLI accepted one state-bound external-agent semantic result."
    commit: "026c97813bc53dabe636fd957e4e6961278b45a3"
  -
    type: "verify"
    at: "2026-09-16T20:19:06.057Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-09-16T20:34:05.784Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "76f4ca2eaf6b6d5955496679f2339864cff3a28b"
doc_version: 3
doc_updated_at: "2026-09-16T21:26:33.064Z"
doc_updated_by: "DEUS"
description: "Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9."
sections:
  Summary: |-
    Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

    Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
  Scope: |-
    - In scope: Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
    - Out of scope: unrelated refactors not required for "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA".
  Plan: "Preserve the two completed candidate WorkItems and end the semantic graph so AgentPlane can begin protected evaluation and integration."
  Verify Steps: |-
    1. Run `bun run release:check`. Expected: version parity, generated release surfaces, package manifests, and release policy checks pass for 0.7.9.
    2. Run `bun run release:prepublish`. Expected: the complete prepublish gate passes for the exact release candidate without skipped mandatory checks.
    3. Review `git diff --check`, the exact task diff, and `git status --short --untracked-files=all`. Expected: only approved release metadata, documentation, package version surfaces, baseline evidence, and AgentPlane task artifacts changed; `agentplane-roadmap-r2` and unrelated user work are not committed.
    4. Complete AgentPlane verification and hosted branch protection for the release-ready candidate. Expected: the accepted release commit is integrated into `main`, hosted checks are successful, and `origin/main` resolves to the exact qualified publish SHA.
    5. Publish v0.7.9 only through the AgentPlane release route after an exact fresh publish-authority grant. Expected: `.agentplane/.release/publish/publish-result.json` records `success=true`, an empty `failures` array, version 0.7.9, and the exact qualified main SHA.
    6. Independently read back the GitHub v0.7.9 tag and release. Expected: the tag resolves to the qualified publish SHA and every required release asset and checksum is present.
    7. Independently read back all npm package versions and install the published packages in clean temporary directories. Expected: every public AgentPlane package reports 0.7.9 and both `agentplane` and `ap` entrypoints execute successfully.
    8. Independently verify `setup-agentplane`, Homebrew, and Scoop distribution surfaces and perform their documented clean install smoke checks when the release route provides them. Expected: every required surface resolves to 0.7.9 and its expected checksum; any unavailable anonymous GHCR read is recorded separately without being misreported as success.
    9. Re-fetch the default branch and provider state after publication. Expected: `origin/main`, the canonical release evidence, the tag, registries, and distribution surfaces agree on the same released SHA and version.
    10. Complete the required post-publish evidence follow-up and start the next patch beta only through fresh AgentPlane-managed tasks and authority packets. Expected: no lifecycle or external action is inferred from prose, and any genuine provider or evidence boundary is reported explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-16T20:19:06.057Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9cf5b2e4d0913444dd22e75559fae1e7ad1d16f13ca446af014dcf764ee33e73, input_digest=sha256:6c337943a17b00e935f07c5839e0b4be575a170197b81f6386ce5f5f307f4bc2

    Details:

    Check: affected_unit_integration
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run release:prepublish
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run release:prepublish
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check critical_paths (3/3)

    Check: docs_contract
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check docs_contract (1/3)

    Check: docs_contract
    Command: bun run release:prepublish
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check docs_contract (2/3)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check docs_contract (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: bun run release:prepublish
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run release:prepublish
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121424-49XXT3 Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-49XXT3-publish-and-independently-verify-agentplane-0-7/.agentplane/tasks/202609121424-49XXT3/blueprint/resolved-snapshot.json
    - old_digest: b868d5c39ecfa4e9a069b687877b066b738e575f2bfcceb04210173b98273663
    - current_digest: b868d5c39ecfa4e9a069b687877b066b738e575f2bfcceb04210173b98273663
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609121424-49XXT3

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- BEGIN HOSTED PUBLISH EVIDENCE -->
    ### Hosted publish

    - State: ok
    - Note: Hosted publish confirmed for v0.7.9.
    - Details:
      - release_sha: bdd79f0ab1fc91debde267a220403f8212c3a12b
      - version: 0.7.9
      - tag: v0.7.9
      - @agentplaneorg/core: preexisting
      - @agentplaneorg/recipes: preexisting
      - agentplane: preexisting
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.7.9
      - ghcr: published
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/35151631278
      - external_homebrew: published | basilisk-labs/homebrew-tap | 802ed8f66c3b66e3d67ad5205d6e5bf1448b436e | https://github.com/basilisk-labs/homebrew-tap/pull/47
      - external_scoop: published | basilisk-labs/scoop-bucket | 8d9f2e3321c4e24f34919797e835824b784b8c9e | https://github.com/basilisk-labs/scoop-bucket/pull/46
      - external_setup-agentplane: published | basilisk-labs/setup-agentplane | 8a1161efcea1a129b56fc6e5e06d31ce99759868 | https://github.com/basilisk-labs/setup-agentplane/pull/46
    <!-- END HOSTED PUBLISH EVIDENCE -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:8af048e93d9e9e8707775c78fa82748b1e3cf1e5acb455d648e73d475defe207"
    digest: "sha256:b5c0e51356efdb9b8bfd8e5302e273df3df158224637cbdad85f8bbeac67bf50"
    grant_id: "cc9adca9-dc46-433c-b04d-4b4ac2668053"
    issued_at: "2026-09-16T20:33:46.579Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:36dad33ad32e10b697fb1b044e5abf042405109a77a9e731690c39eff1ef7ffc"
    plan_revision: 96
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:e3f3826d5073ce6e2dd21c232105decf7d3503e0fbfc821a4d02ebcbff91adcf"
    status: "active"
    task_id: "202609121424-49XXT3"
  agentplane.scope_extension_request:
    applied_at: "2026-09-15T01:28:25.828Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:4583973395ed337e35afd41e33d7a6e7b653733cb0c28b80b1b09b2ca550fa4f"
    kind: "task_scope_extension_request"
    request:
      rationale: "The first release chunk beyond the previously repaired boundary exposed one stale exact metric assertion."
      repository_effects:
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
    request_digest: "sha256:820ab0aabb99b4c4e68f2f1342ac73403a0e552856bd36e505c8c5beb48fb8f4"
    schema_version: 1
    status: "applied"
    transition_id: "tr_f6af5edd463b74a987c1352cf9844924"
    work_item_id: "prepare_candidate"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-16T19:28:59.343Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-15T20:06:13.780Z"
      digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
      proposal:
        assumptions:
          - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 remains the approved release base."
          - "The completed candidate preparation and its supervisor-owned green gate evidence remain valid."
          - "AgentPlane owns independent evaluation, verification persistence, PR publication, hosted CI, protected integration, and hosted close after the semantic graph completes."
          - "Publication and independent distribution readback start only after origin/main is qualified, through fresh AgentPlane-managed release tasks and exact authority packets."
        planning_baseline:
          captured_at: "2026-09-15T20:04:59.091Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a2f326b488d7ee8539e9d1ac8f19c7efebb6eabbb0a39778d68f55606523a64c"
          dirty_paths:
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "6f20d14b4dbcd5e49084d82b55d04f2e35ee63bb"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:90"
        schema_version: 1
        task_id: "202609121424-49XXT3"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "candidate_base_identity"
              kind: "structural"
              required: true
            -
              capability: "task.verify"
              command: "bun run release:check"
              id: "release_check"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "release_prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              id: "scope_hygiene"
              kind: "structural"
              required: true
          criteria:
            -
              check_ids:
                - "candidate_base_identity"
                - "scope_hygiene"
              description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
              id: "candidate_base_exact"
              required: true
            -
              check_ids:
                - "release_check"
                - "release_prepublish"
                - "scope_hygiene"
              description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
              id: "candidate_exact"
              required: true
          evidence_fingerprint: "sha256:a2f326b488d7ee8539e9d1ac8f19c7efebb6eabbb0a39778d68f55606523a64c"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "candidate_base_identity"
                    - "scope_hygiene"
                  description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                  id: "candidate_base_exact"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "PR #5956 provider state"
                  - "the successful hosted checks for PR #5956"
                required_sources:
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "qualified main"
                  - "release candidate base"
                  - "branch-base"
                  - "history preservation"
              depends_on: []
              expected_outputs:
                - "supervisor_owned_candidate_synchronization_receipt"
                - "qualified_release_base_sha"
              id: "synchronize_candidate_base"
              objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "exclusive"
                  mode: "exclusive"
                  resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "release-candidate-worktree"
              risk: "high"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - ".agentplane/config.json"
                - ".agentplane/tasks/202609121424-49XXT3"
                - "docs/assets"
                - "docs/reference/generated-reference.mdx"
                - "docs/releases/v0.7.9-evidence"
                - "docs/releases/v0.7.9.md"
                - "package.json"
                - "packages"
                - "scripts/baselines"
                - "website/static/img/social"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "candidate_base_identity"
                    kind: "structural"
                    required: true
                  -
                    capability: "task.verify"
                    id: "scope_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                evidence_fingerprint: "sha256:a2f326b488d7ee8539e9d1ac8f19c7efebb6eabbb0a39778d68f55606523a64c"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release_check"
                    - "release_prepublish"
                    - "scope_hygiene"
                  description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                  id: "candidate_exact"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "docs/releases/v0.7.8-evidence"
                required_sources:
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  - "docs/releases/v0.7.8.md"
                symbol_hints:
                  - "version parity"
                  - "release notes"
                  - "compatibility baseline"
                  - "clone baseline"
              depends_on:
                - "synchronize_candidate_base"
              expected_outputs:
                - "stable_candidate_diff"
                - "release_notes_and_evidence"
                - "exact_candidate_sha"
              id: "prepare_candidate"
              objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
              optional: false
              priority: 2
              required_inputs:
                - "qualified_release_base_sha"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "release-candidate-worktree"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - ".agentplane/config.json"
                - ".agentplane/tasks/202609121424-49XXT3"
                - "docs/assets"
                - "docs/reference/generated-reference.mdx"
                - "docs/releases/v0.7.9-evidence"
                - "docs/releases/v0.7.9.md"
                - "package.json"
                - "packages"
                - "scripts/baselines"
                - "website/static/img/social"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:check"
                    id: "release_check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release_prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    id: "scope_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                evidence_fingerprint: "sha256:a2f326b488d7ee8539e9d1ac8f19c7efebb6eabbb0a39778d68f55606523a64c"
                schema_version: 1
      revision: 18
      schema_version: 1
      task_id: "202609121424-49XXT3"
    event_cursor: 72
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202609121424-49XXT3"
            - "git:026c97813bc53dabe636fd957e4e6961278b45a3"
          check_id: "candidate_base_identity"
          command_identity: "task.verify"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-09-16T20:19:06.057Z"
          repository_snapshot_digest: "sha256:c721bed7bdbec455bc24f36dd59cdddedd9bae00effd56abc6bf53f7706a5dbc"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609121424-49XXT3"
            - "git:026c97813bc53dabe636fd957e4e6961278b45a3"
          check_id: "release_check"
          command_identity: "bun run release:check"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-09-16T20:19:06.057Z"
          repository_snapshot_digest: "sha256:c721bed7bdbec455bc24f36dd59cdddedd9bae00effd56abc6bf53f7706a5dbc"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609121424-49XXT3"
            - "git:026c97813bc53dabe636fd957e4e6961278b45a3"
          check_id: "release_prepublish"
          command_identity: "bun run release:prepublish"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-09-16T20:19:06.057Z"
          repository_snapshot_digest: "sha256:c721bed7bdbec455bc24f36dd59cdddedd9bae00effd56abc6bf53f7706a5dbc"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609121424-49XXT3"
            - "git:026c97813bc53dabe636fd957e4e6961278b45a3"
          check_id: "scope_hygiene"
          command_identity: "task.verify"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-09-16T20:19:06.057Z"
          repository_snapshot_digest: "sha256:c721bed7bdbec455bc24f36dd59cdddedd9bae00effd56abc6bf53f7706a5dbc"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202609121424-49XXT3"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run release:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run release:prepublish"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-12T14:24:56.231Z"
      constraints: []
      request: |-
        Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

        Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
      task_id: "202609121424-49XXT3"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-13T22:53:42.760Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-13T03:09:14.798Z"
        digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - "package.json"
                  - "packages"
                  - "docs/releases/v0.7.9.md"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/assets"
                  - "scripts/baselines"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:03:50.512Z"
          approved_by: "USER"
          approved_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          policy_facts:
            - "state_bound_scope_extension:sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923"
          state: "approved"
        created_at: "2026-09-13T23:03:50.512Z"
        digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:13:16.889Z"
          approved_by: "USER"
          approved_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          policy_facts:
            - "state_bound_scope_extension:sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5"
          state: "approved"
        created_at: "2026-09-13T23:13:16.889Z"
        digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  - "website/static/img/social/docs/releases/v0.7.9.png"
                  - "website/static/img/social/manifest.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:17:41.802Z"
          approved_by: "USER"
          approved_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          policy_facts:
            - "state_bound_scope_extension:sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256"
          state: "approved"
        created_at: "2026-09-13T23:17:41.802Z"
        digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                  - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  - "website/static/img/social/docs/releases/v0.7.9.png"
                  - "website/static/img/social/manifest.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 4
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T00:38:42.841Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T00:37:24.811Z"
        digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        proposal:
          assumptions:
            - "Qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 is the required release base because it contains the merged task-state validation repair and its hosted closure evidence."
            - "The existing release branch contains the previously prepared stable 0.7.9 candidate and must preserve those changes during synchronization."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-14T00:34:11.350Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "e567297b0f86d69bfb9a939764ed4aef90fcc1d3"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:26"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing release candidate is synchronized onto qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 without losing prepared release changes or importing unrelated work."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change beyond generated or version-parity release surfaces."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing release candidate is synchronized onto qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 without losing prepared release changes or importing unrelated work."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "PR #5950 provider state"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch synchronization"
                depends_on: []
                expected_outputs:
                  - "synchronized_candidate_branch"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Synchronize the existing stable candidate branch onto exact qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 through the repository-owned recovery path while preserving all prepared candidate changes and unrelated user work."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing release candidate is synchronized onto qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 without losing prepared release changes or importing unrelated work."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change beyond generated or version-parity release surfaces."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze 9792878934b2c4d068e98056cef3c2c691451a90 as the release base and finalize stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without unrelated semantic source changes."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change beyond generated or version-parity release surfaces."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
        revision: 5
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T00:43:06.119Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T00:42:42.447Z"
        digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
        proposal:
          assumptions:
            - "Qualified main 9792878934b2c4d068e98056cef3c2c691451a90 is the required release base."
            - "The existing release branch contains the prepared stable candidate and must preserve it during replay."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T00:40:55.620Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "e567297b0f86d69bfb9a939764ed4aef90fcc1d3"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:30"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is replayed onto 9792878934b2c4d068e98056cef3c2c691451a90, preserves all approved release paths and qualified-main repairs, and imports no unrelated work."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is replayed onto 9792878934b2c4d068e98056cef3c2c691451a90, preserves all approved release paths and qualified-main repairs, and imports no unrelated work."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5950 provider state"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "history replay"
                depends_on: []
                expected_outputs:
                  - "synchronized_candidate_branch"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Replay the existing stable candidate onto exact qualified main 9792878934b2c4d068e98056cef3c2c691451a90 while preserving all approved candidate content and unrelated user work."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/tasks/202609121424-49XXT3"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.9-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.9.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is replayed onto 9792878934b2c4d068e98056cef3c2c691451a90, preserves all approved release paths and qualified-main repairs, and imports no unrelated work."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines on base 9792878934b2c4d068e98056cef3c2c691451a90."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers, record limitations, and complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
        revision: 6
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T02:07:44.461Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T02:06:34.504Z"
        digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
        proposal:
          assumptions:
            - "Qualified main 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 is the required release base because it contains the merged task-state validation repair and hosted closure evidence."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits; external agents must not create or rewrite Git commits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T02:02:03.588Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "e567297b0f86d69bfb9a939764ed4aef90fcc1d3"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:33"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 40368f0ae58774c8cdd80fddb22cb6daacbae8f4, preserves all approved release paths and qualified-main repairs, and imports no unrelated work; no semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 40368f0ae58774c8cdd80fddb22cb6daacbae8f4, preserves all approved release paths and qualified-main repairs, and imports no unrelated work; no semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5950 provider state"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "history replay"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation while preserving all approved candidate content and unrelated user work. This WorkItem defines acceptance only; an external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 40368f0ae58774c8cdd80fddb22cb6daacbae8f4, preserves all approved release paths and qualified-main repairs, and imports no unrelated work; no semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base 40368f0ae58774c8cdd80fddb22cb6daacbae8f4."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers, record limitations, and complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
        revision: 7
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T09:19:49.368Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T09:17:05.322Z"
        digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
        proposal:
          assumptions:
            - "Qualified main 1a93a9a43da2b714854174491f9672c52bf33e9f is the required release base because PR #5952 is merged and Core CI run 34825881983 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T09:14:40.154Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "801d545e1e5aaf2c9b4c307d4ca6a19214628a65"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:38"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 1a93a9a43da2b714854174491f9672c52bf33e9f. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 1a93a9a43da2b714854174491f9672c52bf33e9f. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5952 provider state"
                    - "Core CI run 34825881983"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main 1a93a9a43da2b714854174491f9672c52bf33e9f as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@1a93a9a43da2b714854174491f9672c52bf33e9f"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 1a93a9a43da2b714854174491f9672c52bf33e9f. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base 1a93a9a43da2b714854174491f9672c52bf33e9f."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
        revision: 8
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T14:04:36.346Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T14:00:41.250Z"
        digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
        proposal:
          assumptions:
            - "Qualified main ed89f946b3058cf290df7a76bec23ab4dcc1fa92 is the required release base because PR #5954 is merged and the successful hosted checks for PR #5954 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T13:59:22.486Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "801d545e1e5aaf2c9b4c307d4ca6a19214628a65"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:41"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto ed89f946b3058cf290df7a76bec23ab4dcc1fa92. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto ed89f946b3058cf290df7a76bec23ab4dcc1fa92. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5954 provider state"
                    - "the successful hosted checks for PR #5954"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main ed89f946b3058cf290df7a76bec23ab4dcc1fa92 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@ed89f946b3058cf290df7a76bec23ab4dcc1fa92"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto ed89f946b3058cf290df7a76bec23ab4dcc1fa92. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base ed89f946b3058cf290df7a76bec23ab4dcc1fa92."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
        revision: 9
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T22:14:20.074Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T16:29:27.707Z"
        digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 10
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T22:52:42.086Z"
          approved_by: "USER"
          approved_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          policy_facts:
            - "state_bound_scope_extension:sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52"
          state: "approved"
        created_at: "2026-09-14T22:52:42.086Z"
        digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 11
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T23:29:50.328Z"
          approved_by: "USER"
          approved_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          policy_facts:
            - "state_bound_scope_extension:sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66"
          state: "approved"
        created_at: "2026-09-14T23:29:50.328Z"
        digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 12
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-15T00:06:50.787Z"
          approved_by: "USER"
          approved_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          policy_facts:
            - "state_bound_scope_extension:sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15"
          state: "approved"
        created_at: "2026-09-15T00:06:50.787Z"
        digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 13
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-15T00:52:20.908Z"
          approved_by: "USER"
          approved_digest: "sha256:f7ec9106b4c0a4c6f70ee80620bfaa6dcf62ab30a0ace1de39ad163c10ce7702"
          policy_facts:
            - "state_bound_scope_extension:sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02"
          state: "approved"
        created_at: "2026-09-15T00:52:20.908Z"
        digest: "sha256:f7ec9106b4c0a4c6f70ee80620bfaa6dcf62ab30a0ace1de39ad163c10ce7702"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 14
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-15T01:28:25.828Z"
          approved_by: "USER"
          approved_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          policy_facts:
            - "state_bound_scope_extension:sha256:820ab0aabb99b4c4e68f2f1342ac73403a0e552856bd36e505c8c5beb48fb8f4"
          state: "approved"
        created_at: "2026-09-15T01:28:25.828Z"
        digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 15
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-15T06:44:34.682Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-15T03:02:44.459Z"
        digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-15T02:59:16.992Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4633ac2a5e4d16b68fe0c966c501eb5034c35951051525bb2e1c05b9ef69ce99"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "fe5b1fb0db6c2f69d1a25be4e171fcd023bcbe25"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:76"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:4633ac2a5e4d16b68fe0c966c501eb5034c35951051525bb2e1c05b9ef69ce99"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:4633ac2a5e4d16b68fe0c966c501eb5034c35951051525bb2e1c05b9ef69ce99"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:4633ac2a5e4d16b68fe0c966c501eb5034c35951051525bb2e1c05b9ef69ce99"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:4633ac2a5e4d16b68fe0c966c501eb5034c35951051525bb2e1c05b9ef69ce99"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:4633ac2a5e4d16b68fe0c966c501eb5034c35951051525bb2e1c05b9ef69ce99"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:4633ac2a5e4d16b68fe0c966c501eb5034c35951051525bb2e1c05b9ef69ce99"
                  schema_version: 1
        revision: 16
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-15T20:01:12.475Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:40db79fe9e3fa7f8beeb58f5c7879694ff74dacbcdfd4af96b2f98e26c5c4202"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-15T14:04:47.175Z"
        digest: "sha256:40db79fe9e3fa7f8beeb58f5c7879694ff74dacbcdfd4af96b2f98e26c5c4202"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 remains the approved release base."
            - "The completed candidate preparation and its supervisor-owned green gate evidence remain valid."
            - "AgentPlane owns independent evaluation, verification persistence, PR publication, hosted CI, protected integration, and hosted close after the semantic graph completes."
            - "Publication and independent distribution readback start only after origin/main is qualified, through fresh AgentPlane-managed release tasks and exact authority packets."
          planning_baseline:
            captured_at: "2026-09-15T14:02:48.912Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:422336537e6ca82d803e0acf235a32af901d41d3a5856258b4ab6cd6c88f947c"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "6f20d14b4dbcd5e49084d82b55d04f2e35ee63bb"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:87"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The exact locally qualified candidate is handed back to AgentPlane with its committed head and green supervisor gate receipts. No semantic WorkItem owns evaluator, PR, merge, publish, or hosted-provider effects."
                id: "candidate_handoff_ready"
                required: true
            evidence_fingerprint: "sha256:422336537e6ca82d803e0acf235a32af901d41d3a5856258b4ab6cd6c88f947c"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:422336537e6ca82d803e0acf235a32af901d41d3a5856258b4ab6cd6c88f947c"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:422336537e6ca82d803e0acf235a32af901d41d3a5856258b4ab6cd6c88f947c"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The exact locally qualified candidate is handed back to AgentPlane with its committed head and green supervisor gate receipts. No semantic WorkItem owns evaluator, PR, merge, publish, or hosted-provider effects."
                    id: "candidate_handoff_ready"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
                  symbol_hints:
                    - "candidate head"
                    - "release:check"
                    - "release:prepublish"
                    - "protected lifecycle handoff"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "candidate_readiness_handoff"
                id: "candidate_readiness_handoff"
                objective: "Record the exact committed candidate head and the successful supervisor-owned release gate receipts. Return control so AgentPlane can perform independent evaluation and the protected branch_pr lifecycle."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The exact locally qualified candidate is handed back to AgentPlane with its committed head and green supervisor gate receipts. No semantic WorkItem owns evaluator, PR, merge, publish, or hosted-provider effects."
                      id: "candidate_handoff_ready"
                      required: true
                  evidence_fingerprint: "sha256:422336537e6ca82d803e0acf235a32af901d41d3a5856258b4ab6cd6c88f947c"
                  schema_version: 1
        revision: 17
        schema_version: 1
        task_id: "202609121424-49XXT3"
    revision: 98
    schema_version: 1
    updated_at: "2026-09-16T20:34:05.784Z"
    work_items:
      prepare_candidate:
        attempt: 2
        claim_id: null
        id: "prepare_candidate"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:ce1e01456ffdf196baa42029ba8bcff767c453f016f0c9b5aae0d5d6077ea9e6"
            id: "stable_candidate_diff"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 16
              task_id: "202609121424-49XXT3"
              work_item_id: "prepare_candidate"
            provenance:
              - "sha256:4a33066d032b352f769fa48e55c78c942319b05dae7498e3ad25528017c4bff5"
              - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d82f3aa9136c264b2c1087f7f781ac2e126270d67447f19b4987db2b2b34f4e2"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:ee6313a55bc474a884cd7128dfcde7b145cd52916c63bf55176fe67c52427637"
            id: "release_notes_and_evidence"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 16
              task_id: "202609121424-49XXT3"
              work_item_id: "prepare_candidate"
            provenance:
              - "sha256:4a33066d032b352f769fa48e55c78c942319b05dae7498e3ad25528017c4bff5"
              - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d82f3aa9136c264b2c1087f7f781ac2e126270d67447f19b4987db2b2b34f4e2"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:65f4b4c14739ac408f2246367d7e4c7b2b18afc6051d03ab17177b53e146a45c"
            id: "exact_candidate_sha"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 16
              task_id: "202609121424-49XXT3"
              work_item_id: "prepare_candidate"
            provenance:
              - "sha256:4a33066d032b352f769fa48e55c78c942319b05dae7498e3ad25528017c4bff5"
              - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d82f3aa9136c264b2c1087f7f781ac2e126270d67447f19b4987db2b2b34f4e2"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
              check_id: "release_check"
              command_identity: "bun run release:check"
              detail: "Observed by bun run release:check."
              exit_code: 0
              observed_at: "2026-09-15T13:58:34.045Z"
              repository_snapshot_digest: "sha256:d82f3aa9136c264b2c1087f7f781ac2e126270d67447f19b4987db2b2b34f4e2"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
              check_id: "release_prepublish"
              command_identity: "bun run release:prepublish"
              detail: "Observed by bun run release:prepublish."
              exit_code: 0
              observed_at: "2026-09-15T13:58:34.045Z"
              repository_snapshot_digest: "sha256:d82f3aa9136c264b2c1087f7f781ac2e126270d67447f19b4987db2b2b34f4e2"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
              check_id: "scope_hygiene"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-15T13:58:34.045Z"
              repository_snapshot_digest: "sha256:d82f3aa9136c264b2c1087f7f781ac2e126270d67447f19b4987db2b2b34f4e2"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      synchronize_candidate_base:
        attempt: 1
        claim_id: null
        id: "synchronize_candidate_base"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a9d1fb3adfcdb80a0c5f5fbabaa2107af25c3b23d6ed95b6c50b07e48c8a3169"
            id: "supervisor_owned_candidate_synchronization_receipt"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 10
              task_id: "202609121424-49XXT3"
              work_item_id: "synchronize_candidate_base"
            provenance:
              - "sha256:ee6e73f0f43da46bc821f098adf51cc22613c15a0b1aadd1e69b6428dc27fd3e"
              - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5724856167b5100850f3741c3d68fb218f0d33712319585115e8b93b6fc5f42b"
            id: "qualified_release_base_sha"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 10
              task_id: "202609121424-49XXT3"
              work_item_id: "synchronize_candidate_base"
            provenance:
              - "sha256:ee6e73f0f43da46bc821f098adf51cc22613c15a0b1aadd1e69b6428dc27fd3e"
              - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
              check_id: "candidate_base_identity"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-14T22:15:51.305Z"
              repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
              check_id: "scope_hygiene"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-14T22:15:51.305Z"
              repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-13T23:01:21.946Z"
        from: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        to: "sha256:24582bb56476c1224e61f81d96fb931933fa4d48bde7b85ad1d6778ed4b24cbc"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_09e51e2ff0846e81e8db19cd"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
        plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 6
        work_item_id: null
      -
        at: "2026-09-14T00:34:09.691Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
          - "dependencies_changed"
        entity: "task"
        id: "event_8548f5a0e0489ca2e70cd1a4"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9"
        plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
        plan_revision: 4
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 25
        work_item_id: null
      -
        at: "2026-09-14T00:39:46.937Z"
        from: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        to: "sha256:9e285965362318aa806b2ead1dcddad86f26178f8bb4aaca1e55a3618812daf3"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_5c54ba054e1eeb90f0335dc0"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04"
        plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 28
        work_item_id: null
      -
        at: "2026-09-14T00:40:53.958Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_5f6cadaeee399a2ec63ca6d3"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6"
        plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 29
        work_item_id: null
      -
        at: "2026-09-14T02:02:01.893Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "outputs_changed"
          - "acceptance_changed"
          - "dependencies_changed"
          - "architecture_changed"
        entity: "task"
        id: "event_b169b299c4e7016f6d543c6e"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7"
        plan_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
        plan_revision: 6
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 32
        work_item_id: null
      -
        at: "2026-09-14T09:14:38.431Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_77bf2255888a8e15ffc5eae1"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a"
        plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
        plan_revision: 7
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 37
        work_item_id: null
      -
        at: "2026-09-14T14:12:47.166Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:ea3e0eddd02bdee3cea41d87f0bca5da14ce0c0cfdab8acd8de54bab589ae819"
        entity: "work_item"
        id: "event_71f75d268461f213eadb748e"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6"
        plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
        plan_revision: 9
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 45
        work_item_id: "synchronize_candidate_base"
      -
        at: "2026-09-14T16:28:04.232Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "outputs_changed"
          - "acceptance_changed"
          - "dependencies_changed"
        entity: "task"
        id: "event_6d533a221b7ee824d9db2c99"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07"
        plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
        plan_revision: 9
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 48
        work_item_id: null
      -
        at: "2026-09-14T22:15:51.336Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:c8b3c17a8bace614db0f4cc9a20661bf56823077e183a3e7d5b6af7f22627c72"
        entity: "work_item"
        id: "event_5167f6465707615d336c0fea"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191"
        plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
        plan_revision: 10
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 53
        work_item_id: "synchronize_candidate_base"
      -
        at: "2026-09-15T02:54:57.674Z"
        from: "PLANNED"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:bc3ff0c97f4a4438484f28d5374a0bca0cb1ab647479b0a451251029f7257068"
        entity: "work_item"
        id: "event_8f4a7c4121e94d2cb1de46cc"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-a8eec6925bf5d6ee97c95b6f"
        plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
        plan_revision: 15
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 71
        work_item_id: "prepare_candidate"
      -
        at: "2026-09-15T02:58:10.960Z"
        from: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
        to: "sha256:9d2978d3e142e3be2be36f8c43d5fe5da4442014724fe3c84aac1688d79e80c3"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_b0f921e16530f484b2745914"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-5e6e6b18501f5290df1d3ac5"
        plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
        plan_revision: 15
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 74
        work_item_id: null
      -
        at: "2026-09-15T02:59:14.950Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "risk_changed"
        entity: "task"
        id: "event_838059b7f79e089a7cd9fa56"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-3307dfbe1841453494e7efb2"
        plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
        plan_revision: 15
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 75
        work_item_id: null
      -
        at: "2026-09-15T07:16:23.852Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:246631c8f98de94e80a9704475a97ffd6a9b5cab695adb7dfa3a8a8802bd4fb4"
        entity: "work_item"
        id: "event_2e2bccc890a76c92d18da588"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-8213cb77d95bec5dba1a29e9"
        plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
        plan_revision: 16
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 80
        work_item_id: "prepare_candidate"
      -
        at: "2026-09-15T13:58:34.125Z"
        from: "REWORK_READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:865e8b2dae3ae27e0618318c392a64d0630debd2473079181efbe2e3cfc57ceb"
        entity: "work_item"
        id: "event_a25fe4f133253b66148aa832"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-aed06939648a113cdac4c61c"
        plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
        plan_revision: 16
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 83
        work_item_id: "prepare_candidate"
      -
        at: "2026-09-15T14:02:46.645Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "outputs_changed"
          - "acceptance_changed"
          - "dependencies_changed"
        entity: "task"
        id: "event_6cd68b5e1ecd1d50380c9b6e"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af7f2a535353a057e3a7164c"
        plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
        plan_revision: 16
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 86
        work_item_id: null
      -
        at: "2026-09-15T20:04:56.691Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
          - "dependencies_changed"
        entity: "task"
        id: "event_7cfce5d6508088ac662eb762"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-6ba5bdb1945d6a55fb9d5c2d"
        plan_digest: "sha256:40db79fe9e3fa7f8beeb58f5c7879694ff74dacbcdfd4af96b2f98e26c5c4202"
        plan_revision: 17
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 89
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3:
        aggregate_digest: "sha256:1e8ddc402af0dbaa4a8de58f965c314f73afd70122a1e21678777c6b79c14ead"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:53:16.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_426f27761a62ae0e06c0431f"
          mutation_id: "compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551:
        aggregate_digest: "sha256:ff42920bca0cea490f64a8a516c68709732b961ee50f1259fd57447b7453731e"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_7d58a4a2a85b9933836f03c6"
          mutation_id: "compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:067e10b0020868451305332b5bc514fd717698d1114e2252a996b77134c6df34:
        aggregate_digest: "sha256:d19c312476fc8c646ae85271b4bb4f86463e2f512bae3c1ff5438feb42de0eec"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:29:25.923Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_6f1c6074d59bb6cbec44fd2f"
          mutation_id: "compatibility:sha256:067e10b0020868451305332b5bc514fd717698d1114e2252a996b77134c6df34"
          plan_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 59
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:067e10b0020868451305332b5bc514fd717698d1114e2252a996b77134c6df34"
        next_revision: 60
        previous_revision: 59
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:07290e5c1565e032fe1dc48fe3fbe1f0896633011edf44351f2f2cb3a1650e2b:
        aggregate_digest: "sha256:f7fba3935c03821ca89be0c5b73aea2e801a7d1d01f0dd3fc1ffd1c1f8abb12c"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T14:04:47.235Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_f3b0bbbfc8ef681af61f23e9"
          mutation_id: "compatibility:sha256:07290e5c1565e032fe1dc48fe3fbe1f0896633011edf44351f2f2cb3a1650e2b"
          plan_digest: "sha256:40db79fe9e3fa7f8beeb58f5c7879694ff74dacbcdfd4af96b2f98e26c5c4202"
          plan_revision: 17
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 88
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:07290e5c1565e032fe1dc48fe3fbe1f0896633011edf44351f2f2cb3a1650e2b"
        next_revision: 89
        previous_revision: 88
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602:
        aggregate_digest: "sha256:e3239e63b31f6f03a8c3077e8ee8068b2124f0e0af71aa92879aa10f6190a001"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:07:23.950Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_80e479e56b0a3f441e45109d"
          mutation_id: "compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 10
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd:
        aggregate_digest: "sha256:cfb0091efde65e83f7084169ed081c00b03bbb27a4bcc2ee6b5691205ce72676"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:53:16.172Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_98bb6ebbe54c013e6aa8b1da"
          mutation_id: "compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:15238a185d9d6f6638425bce2408cecc26c09e69022551433ba3d4b6a5a87dae:
        aggregate_digest: "sha256:87693512e0b38d6de4c259354d5cfc5a38c68c1ae52e46885c98e569d877c05a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:39:25.433Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a458cc70835c6f9bd99652ac"
          mutation_id: "compatibility:sha256:15238a185d9d6f6638425bce2408cecc26c09e69022551433ba3d4b6a5a87dae"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 46
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:15238a185d9d6f6638425bce2408cecc26c09e69022551433ba3d4b6a5a87dae"
        next_revision: 47
        previous_revision: 46
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:16549760ade2ff969316ba2531557a3218fedce7a8803627141e8d272abe1301:
        aggregate_digest: "sha256:8102b266ee84603c56e1e891d8f8bca07d7fc6dc4dda6d1351f032ff99effc71"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:21:41.489Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_c35a456a193047c7d1f0c72a"
          mutation_id: "compatibility:sha256:16549760ade2ff969316ba2531557a3218fedce7a8803627141e8d272abe1301"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 21
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:16549760ade2ff969316ba2531557a3218fedce7a8803627141e8d272abe1301"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:25ebe0223d646bb935d6e6f07c84ece9cc2759e7d3c12b13950ee02b4fb5beb8:
        aggregate_digest: "sha256:bc225c9a4987941b4a19c1fb229f8cab7e4c7cfb745784043739cb5c556b2fdf"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:06:32.254Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b2fb4374442de6341209aee3"
          mutation_id: "compatibility:sha256:25ebe0223d646bb935d6e6f07c84ece9cc2759e7d3c12b13950ee02b4fb5beb8"
          plan_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          plan_revision: 12
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 60
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:25ebe0223d646bb935d6e6f07c84ece9cc2759e7d3c12b13950ee02b4fb5beb8"
        next_revision: 61
        previous_revision: 60
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:2bece33ec31993ce25853f30af8ef5a11a799280fdecacdac2a43ddc92ab35cd:
        aggregate_digest: "sha256:798cf4ca3cf3201f7909707ae16b5d47669e35ff798771844e5d1c3576da5a98"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T14:01:22.381Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_f748036b480257fa70083860"
          mutation_id: "compatibility:sha256:2bece33ec31993ce25853f30af8ef5a11a799280fdecacdac2a43ddc92ab35cd"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 85
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2bece33ec31993ce25853f30af8ef5a11a799280fdecacdac2a43ddc92ab35cd"
        next_revision: 86
        previous_revision: 85
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:2f261bb198ac6d87ce12c874d2145cfea075cfd7f48d6e7f0f7c9715830a3fe8:
        aggregate_digest: "sha256:5004725bc3753757de9679c402f299687fdccc5dc83fd6d26115eb8af83d6a65"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:12:43.781Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4b0e24b97f60ebdf434ef32d"
          mutation_id: "compatibility:sha256:2f261bb198ac6d87ce12c874d2145cfea075cfd7f48d6e7f0f7c9715830a3fe8"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 44
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2f261bb198ac6d87ce12c874d2145cfea075cfd7f48d6e7f0f7c9715830a3fe8"
        next_revision: 45
        previous_revision: 44
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:3179b068ba7457fafe52587f95888c01ba9057e2dd7bfb3bf329230dc2c540e6:
        aggregate_digest: "sha256:f1a4e327a4c3bb731557b755734c67af66bf1819fd67780c01f8b92f6c4dbfe0"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T16:26:34.900Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_3e79d9f0aa1ced28f1b9f44a"
          mutation_id: "compatibility:sha256:3179b068ba7457fafe52587f95888c01ba9057e2dd7bfb3bf329230dc2c540e6"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 47
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3179b068ba7457fafe52587f95888c01ba9057e2dd7bfb3bf329230dc2c540e6"
        next_revision: 48
        previous_revision: 47
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:318084961a397b3419e1d9154faeed0f46632c1ba74637b53d9cfd60e0d5f4ad:
        aggregate_digest: "sha256:78014b2c0333160d20e6ceb9be7d7262d2f63aef9f2f58beb4eb7cefaeb796ff"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:51:41.248Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_1a4d5323cce6af1a72616fb1"
          mutation_id: "compatibility:sha256:318084961a397b3419e1d9154faeed0f46632c1ba74637b53d9cfd60e0d5f4ad"
          plan_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          plan_revision: 13
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 65
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:318084961a397b3419e1d9154faeed0f46632c1ba74637b53d9cfd60e0d5f4ad"
        next_revision: 66
        previous_revision: 65
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:3d9cbd63561a9e275cd69eea03a51a6769513de19867914c7bcace7bff7579f2:
        aggregate_digest: "sha256:79af6d4b3c969b0e72e333de5bd55e690d96de352d4aa67ac765387612c78ddc"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T02:56:31.767Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_da6f6c31fcf2025cac536918"
          mutation_id: "compatibility:sha256:3d9cbd63561a9e275cd69eea03a51a6769513de19867914c7bcace7bff7579f2"
          plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          plan_revision: 15
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 72
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:3d9cbd63561a9e275cd69eea03a51a6769513de19867914c7bcace7bff7579f2"
        next_revision: 73
        previous_revision: 72
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:3f1110efb8886676f9568d1dd4195b497f8ecd69412c64d6741b05f1f8e5fe28:
        aggregate_digest: "sha256:f9d17d8aa8b1895cfffae1b21fed1b435d817f9a17baf7fc3f15d9600df6b985"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T19:31:10.070Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6650ec79fab18078f10a6485"
          mutation_id: "compatibility:sha256:3f1110efb8886676f9568d1dd4195b497f8ecd69412c64d6741b05f1f8e5fe28"
          plan_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
          plan_revision: 18
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 93
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3f1110efb8886676f9568d1dd4195b497f8ecd69412c64d6741b05f1f8e5fe28"
        next_revision: 94
        previous_revision: 93
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:40aa9856b61c1f1e2ceaf69ea3e5573ff591a44e965b9e2f23dcb008a613cb85:
        aggregate_digest: "sha256:e1cccc9ca91d522b64933292e4c6f08c8fd746c044e6cc0288524b79ece5bdc8"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T09:17:05.349Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_96b315b41076928d89550495"
          mutation_id: "compatibility:sha256:40aa9856b61c1f1e2ceaf69ea3e5573ff591a44e965b9e2f23dcb008a613cb85"
          plan_digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 39
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:40aa9856b61c1f1e2ceaf69ea3e5573ff591a44e965b9e2f23dcb008a613cb85"
        next_revision: 40
        previous_revision: 39
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:4189b605d2d5194187195bc51f94ea3c17229da5eb7cd4fce1c1e2df02ef778d:
        aggregate_digest: "sha256:584dc61e020dae53a737bfb0bf580e7a6b2912ce0ca2e3733cd0068cea85f43c"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T06:47:19.154Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b419fd73f2651af878085e5e"
          mutation_id: "compatibility:sha256:4189b605d2d5194187195bc51f94ea3c17229da5eb7cd4fce1c1e2df02ef778d"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 78
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4189b605d2d5194187195bc51f94ea3c17229da5eb7cd4fce1c1e2df02ef778d"
        next_revision: 79
        previous_revision: 78
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:4ccd26ae9a7de3906437bef1f5853fcd8e3826385470123e7e2e14213a1cc6e8:
        aggregate_digest: "sha256:3f0739e980260606f883ac31c9e33c7572a5ac2988a1259289ca5f7b2484fe76"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T19:31:10.070Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7d1d25ea54d890717d5bbaf6"
          mutation_id: "compatibility:sha256:4ccd26ae9a7de3906437bef1f5853fcd8e3826385470123e7e2e14213a1cc6e8"
          plan_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
          plan_revision: 18
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 92
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4ccd26ae9a7de3906437bef1f5853fcd8e3826385470123e7e2e14213a1cc6e8"
        next_revision: 93
        previous_revision: 92
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:513db44108e85ed87cef39a830dfbd3d911d3bebe2881381d70cdee02d5bb181:
        aggregate_digest: "sha256:55a9e2ff33d18ff6c07f896cc85e80d5b883f7f08c4e9ec3c4c528e90bff5e95"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:20:21.839Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0802005f624c69582516c9d0"
          mutation_id: "compatibility:sha256:513db44108e85ed87cef39a830dfbd3d911d3bebe2881381d70cdee02d5bb181"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:513db44108e85ed87cef39a830dfbd3d911d3bebe2881381d70cdee02d5bb181"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:5609801b4f53a1272093222c447c1a4320b63cdc038b744f743ebd4c2ec8a192:
        aggregate_digest: "sha256:e802f9279c4b990b3aecd16c2f566bcc5bae9261601158374dd74078c77a27f6"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T02:18:15.103Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0330c09fbfaf9d90087c18c0"
          mutation_id: "compatibility:sha256:5609801b4f53a1272093222c447c1a4320b63cdc038b744f743ebd4c2ec8a192"
          plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          plan_revision: 15
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 70
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5609801b4f53a1272093222c447c1a4320b63cdc038b744f743ebd4c2ec8a192"
        next_revision: 71
        previous_revision: 70
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:56c23ecfcf99c6ad9e61c417630450b442c1a0b4a2d429c9752b2035bfeaefc0:
        aggregate_digest: "sha256:1c7f42ee05b7b6a5dfebc45323c850b3617a69f2f6704b49a23a438c87d2d298"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T02:18:15.103Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_93db1291829eb6fac2acb08b"
          mutation_id: "compatibility:sha256:56c23ecfcf99c6ad9e61c417630450b442c1a0b4a2d429c9752b2035bfeaefc0"
          plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          plan_revision: 15
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 69
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:56c23ecfcf99c6ad9e61c417630450b442c1a0b4a2d429c9752b2035bfeaefc0"
        next_revision: 70
        previous_revision: 69
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:5bebf17bfdd754ac42fed06f83cc7fd89b862c41f44d8523f7ecc267d5f1f856:
        aggregate_digest: "sha256:b4aabec89746491204fd435b0a8e2fcb52a8db4d3556abf636955aad3ff02cf4"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T20:06:13.842Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_791e28d0cd0d683b3a833bfb"
          mutation_id: "compatibility:sha256:5bebf17bfdd754ac42fed06f83cc7fd89b862c41f44d8523f7ecc267d5f1f856"
          plan_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
          plan_revision: 18
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 91
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5bebf17bfdd754ac42fed06f83cc7fd89b862c41f44d8523f7ecc267d5f1f856"
        next_revision: 92
        previous_revision: 91
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:61f02ff91468050eeda24345627a94091b29b5f7d3dcbe93ed180359a45b320a:
        aggregate_digest: "sha256:f6a6da89a73f8b65d2277141bb97a9f6abdcccdf4de9379d6500de8d9adc7e97"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T02:08:41.270Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_357089c057e55c649823612d"
          mutation_id: "compatibility:sha256:61f02ff91468050eeda24345627a94091b29b5f7d3dcbe93ed180359a45b320a"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 35
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:61f02ff91468050eeda24345627a94091b29b5f7d3dcbe93ed180359a45b320a"
        next_revision: 36
        previous_revision: 35
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6465ecabf20045ef10370e07fa9edd368d85eb5e7b23d68c6967ecc8fc51be04:
        aggregate_digest: "sha256:9ece8d1bc80aa3f6c3d337b5997ad0a96e06820dbfba0e5803085b9ae3b75f79"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:29:25.923Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f16d0d01b2ef4058e9db794c"
          mutation_id: "compatibility:sha256:6465ecabf20045ef10370e07fa9edd368d85eb5e7b23d68c6967ecc8fc51be04"
          plan_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 57
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6465ecabf20045ef10370e07fa9edd368d85eb5e7b23d68c6967ecc8fc51be04"
        next_revision: 58
        previous_revision: 57
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:65940460e9ca8855a966ffb8780d92852cd020fe430fae86f7ff92affd20b9ca:
        aggregate_digest: "sha256:872c4a4537e2e0039a879e3e38b43357e038acf6c8a92c04b85c2137f6fe6062"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:31:46.313Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_060812bce7c428874eb4dd98"
          mutation_id: "compatibility:sha256:65940460e9ca8855a966ffb8780d92852cd020fe430fae86f7ff92affd20b9ca"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 24
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:65940460e9ca8855a966ffb8780d92852cd020fe430fae86f7ff92affd20b9ca"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:69155cc7ec9f63b54139157fb264753c2cb1a1d88b51d8d4014aae1597fc78c1:
        aggregate_digest: "sha256:67aa92003e1988f6840feb707b57c2444e9417b052c0e86aea7073f549643132"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T13:19:49.317Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e714d347245329c13f289de6"
          mutation_id: "compatibility:sha256:69155cc7ec9f63b54139157fb264753c2cb1a1d88b51d8d4014aae1597fc78c1"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 81
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:69155cc7ec9f63b54139157fb264753c2cb1a1d88b51d8d4014aae1597fc78c1"
        next_revision: 82
        previous_revision: 81
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6a0144356e402bb7947cd88a98ee56f7644c941cc0ac2d1c18023e8f6f73d939:
        aggregate_digest: "sha256:9c67ec37ec51e0008d1e5ec3e38df6627b575cb2ee2cdacd09e36b8b43f60a22"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T01:27:08.271Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_1e21c349687bd431b57ec2cd"
          mutation_id: "compatibility:sha256:6a0144356e402bb7947cd88a98ee56f7644c941cc0ac2d1c18023e8f6f73d939"
          plan_digest: "sha256:f7ec9106b4c0a4c6f70ee80620bfaa6dcf62ab30a0ace1de39ad163c10ce7702"
          plan_revision: 14
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 67
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6a0144356e402bb7947cd88a98ee56f7644c941cc0ac2d1c18023e8f6f73d939"
        next_revision: 68
        previous_revision: 67
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6a8c60830af7e59784fb00121c19a9d5f6d3567ff9b68b7a177db48775c1f288:
        aggregate_digest: "sha256:391bb726eb853e11a177b8e41b6c676817ab8929cbe42cbdad85a1aaca195f8f"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:21:41.489Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_11b54774a685b955864b5695"
          mutation_id: "compatibility:sha256:6a8c60830af7e59784fb00121c19a9d5f6d3567ff9b68b7a177db48775c1f288"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 22
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6a8c60830af7e59784fb00121c19a9d5f6d3567ff9b68b7a177db48775c1f288"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6c6feb5a69dc4845b844975ab5bbc906cbed5411d34057a1adf14663b8574a71:
        aggregate_digest: "sha256:12c5b8c8a87016e85041474c6bb9b38252ff94d9cf3a78716ad7fc96ac6f6a4a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:15:48.057Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_268940272ea3a918cd0a9037"
          mutation_id: "compatibility:sha256:6c6feb5a69dc4845b844975ab5bbc906cbed5411d34057a1adf14663b8574a71"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 52
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6c6feb5a69dc4845b844975ab5bbc906cbed5411d34057a1adf14663b8574a71"
        next_revision: 53
        previous_revision: 52
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e:
        aggregate_digest: "sha256:9926d4f6961e785dd78313a05d5bfe91f3b380065f2528f58042e8fd0e2a8cef"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5282cc51086ee1d79f381a39"
          mutation_id: "compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 7
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:726333f5d70cf45b38546a54c18795b940885092a1539c3b9fb15c1ef26bc1a0:
        aggregate_digest: "sha256:59b81d0a16006bbf188ba12fce864cd77b7f6dc4c15d9f2c8e9e002a29c803c0"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:51:41.248Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_14c784edddf12ba8f38b36ea"
          mutation_id: "compatibility:sha256:726333f5d70cf45b38546a54c18795b940885092a1539c3b9fb15c1ef26bc1a0"
          plan_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          plan_revision: 13
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 63
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:726333f5d70cf45b38546a54c18795b940885092a1539c3b9fb15c1ef26bc1a0"
        next_revision: 64
        previous_revision: 63
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:7d08f7334c5b439d74cbc91ecf1b184756a0722bab019e17ac1f3112b171ea33:
        aggregate_digest: "sha256:18de3834694f906abd3f9205358dc1b362737c1d951c153efaabaa412b82d220"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:20:21.839Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1aab4dc0e9a4502cd3bf873b"
          mutation_id: "compatibility:sha256:7d08f7334c5b439d74cbc91ecf1b184756a0722bab019e17ac1f3112b171ea33"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 19
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:7d08f7334c5b439d74cbc91ecf1b184756a0722bab019e17ac1f3112b171ea33"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:7daa3c01d3a379229f881d853a6e69887c12ab509521d329fdb1220a0c9551c1:
        aggregate_digest: "sha256:b7a7e0ae568e7858f026dbaa15d395e21ed7d94f28ef03b1c2a258354091775a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T13:58:06.801Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4f5304a0e0e4a39d2ea95b41"
          mutation_id: "compatibility:sha256:7daa3c01d3a379229f881d853a6e69887c12ab509521d329fdb1220a0c9551c1"
          plan_digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 40
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:7daa3c01d3a379229f881d853a6e69887c12ab509521d329fdb1220a0c9551c1"
        next_revision: 41
        previous_revision: 40
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:87f74a066c743a24cdebd6eafc9e9216af6081d8ced4eb4e82f8857156011abf:
        aggregate_digest: "sha256:620c50d72c7c4c27710637e6d196af1f3c002375e338fb25fee729e85738d97a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:52:06.599Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6469018a37c4ae6975612e06"
          mutation_id: "compatibility:sha256:87f74a066c743a24cdebd6eafc9e9216af6081d8ced4eb4e82f8857156011abf"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 54
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:87f74a066c743a24cdebd6eafc9e9216af6081d8ced4eb4e82f8857156011abf"
        next_revision: 55
        previous_revision: 54
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:8934b4e96a5dc6ea58e411c8b48ca0650e6bc92a310a4bd197d5e8ede22672b3:
        aggregate_digest: "sha256:f9c039f429ae0e008e491bf15203976986c8e71c2a9498fd387c7b9e696b3aee"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T02:57:39.806Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_0a4cc9d624c4fb36bc34ff9a"
          mutation_id: "compatibility:sha256:8934b4e96a5dc6ea58e411c8b48ca0650e6bc92a310a4bd197d5e8ede22672b3"
          plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          plan_revision: 15
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 73
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8934b4e96a5dc6ea58e411c8b48ca0650e6bc92a310a4bd197d5e8ede22672b3"
        next_revision: 74
        previous_revision: 73
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:8bbe43264b510f130a6265df7632ff85090886615a5e80619357d2b6d5d493a4:
        aggregate_digest: "sha256:23da957dbfe18d3fdffc063a23cd6a8dd2e3a6218903e667f2946323b069ce8f"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T20:19:08.343Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_99b63ed4b7e585b46c90fafa"
          mutation_id: "compatibility:sha256:8bbe43264b510f130a6265df7632ff85090886615a5e80619357d2b6d5d493a4"
          plan_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
          plan_revision: 18
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 96
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8bbe43264b510f130a6265df7632ff85090886615a5e80619357d2b6d5d493a4"
        next_revision: 97
        previous_revision: 96
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:8ced4650bc3274c2b82df701dc9d18d9579cca94b3fd7e101e9d67b4f350e822:
        aggregate_digest: "sha256:8e04a4713f1bf11a7a49ba7b34f4d21327916c5fc6cbde2532342f72edeb437b"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T16:29:27.741Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_cfbb186800d7eb1ac283479d"
          mutation_id: "compatibility:sha256:8ced4650bc3274c2b82df701dc9d18d9579cca94b3fd7e101e9d67b4f350e822"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 50
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8ced4650bc3274c2b82df701dc9d18d9579cca94b3fd7e101e9d67b4f350e822"
        next_revision: 51
        previous_revision: 50
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:8e5c35cd253fa10e2c4c1dcaa29f3ee2e7be7ec4862aed8cd5f4c93b6e6075d6:
        aggregate_digest: "sha256:9d5a06b02d2d9f937fd8ced6ee009041df640236ea47b819341773f3df9bcc77"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:30:11.418Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_89f4a77d49a9040a2ed07eb1"
          mutation_id: "compatibility:sha256:8e5c35cd253fa10e2c4c1dcaa29f3ee2e7be7ec4862aed8cd5f4c93b6e6075d6"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 23
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:8e5c35cd253fa10e2c4c1dcaa29f3ee2e7be7ec4862aed8cd5f4c93b6e6075d6"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:91c579fc4471ca4f4f97d7b5a56dc442a6511652392170d0cf3e1b2d477363b8:
        aggregate_digest: "sha256:caaba7db762e529db5f43c316218d0f564a2a68889475c1777368651bbb5737b"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T13:19:49.317Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_24ce84bc965c9bde03c59ac7"
          mutation_id: "compatibility:sha256:91c579fc4471ca4f4f97d7b5a56dc442a6511652392170d0cf3e1b2d477363b8"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 82
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:91c579fc4471ca4f4f97d7b5a56dc442a6511652392170d0cf3e1b2d477363b8"
        next_revision: 83
        previous_revision: 82
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716:
        aggregate_digest: "sha256:70449a1ad5412a24658da1ba64eaebaab13b48c1a223d8d722f57a9a9ae2fab9"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b6cc5af0b3fe4dee524c89b8"
          mutation_id: "compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 15
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:9810401a237ee22fb59b4432e4214f47705fc9e03ce6e219c1b0fab69c8853fc:
        aggregate_digest: "sha256:872d26bb979e3beb43232fa757f9a43315bb58c89e3025a196b0bc6128b30180"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:15:48.057Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3b5d732b6de97e64481573a8"
          mutation_id: "compatibility:sha256:9810401a237ee22fb59b4432e4214f47705fc9e03ce6e219c1b0fab69c8853fc"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 51
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9810401a237ee22fb59b4432e4214f47705fc9e03ce6e219c1b0fab69c8853fc"
        next_revision: 52
        previous_revision: 51
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:9fc7e01fcedeac2875da423dae996ddb66abde5797cb89b3454b2c228ed9466c:
        aggregate_digest: "sha256:194d19c23463cd035f3fa208701923dce86476f695f5da08e8e59047901e4b40"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T01:27:08.271Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_802f3f2dea636dfd6d0acd78"
          mutation_id: "compatibility:sha256:9fc7e01fcedeac2875da423dae996ddb66abde5797cb89b3454b2c228ed9466c"
          plan_digest: "sha256:f7ec9106b4c0a4c6f70ee80620bfaa6dcf62ab30a0ace1de39ad163c10ce7702"
          plan_revision: 14
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 68
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9fc7e01fcedeac2875da423dae996ddb66abde5797cb89b3454b2c228ed9466c"
        next_revision: 69
        previous_revision: 68
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a1df72a61d9d9e706a62bda5b13ea010548906cadbd9b90d9173854e8b961d56:
        aggregate_digest: "sha256:80880056389745e14bc734f233801ac3b796b67e473c555c0c4e73a6e1ad9349"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T13:59:39.876Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5c608a3acfd6a16a8b911042"
          mutation_id: "compatibility:sha256:a1df72a61d9d9e706a62bda5b13ea010548906cadbd9b90d9173854e8b961d56"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 84
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:a1df72a61d9d9e706a62bda5b13ea010548906cadbd9b90d9173854e8b961d56"
        next_revision: 85
        previous_revision: 84
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a4e8af16000182bb3defcc27c9b65970284720f516617d5c0d22dac114c2142c:
        aggregate_digest: "sha256:090c7fbad2dd764274a29149b3e814284e6e3dfa36e3ef5547cedd6b449fbb8d"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T03:02:44.515Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9bf9ac80fa67a1c047cf20b1"
          mutation_id: "compatibility:sha256:a4e8af16000182bb3defcc27c9b65970284720f516617d5c0d22dac114c2142c"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 77
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a4e8af16000182bb3defcc27c9b65970284720f516617d5c0d22dac114c2142c"
        next_revision: 78
        previous_revision: 77
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a607a16f6af7fec0c794563941d827439b3531ed2987b1808cd504432828d11f:
        aggregate_digest: "sha256:88c32b255e68fa9712a4ad1832f68dc362c5e3d99772ddc08a517c3bba23fd94"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:00:41.283Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_0170e29257e16705d5ad8d0a"
          mutation_id: "compatibility:sha256:a607a16f6af7fec0c794563941d827439b3531ed2987b1808cd504432828d11f"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 42
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a607a16f6af7fec0c794563941d827439b3531ed2987b1808cd504432828d11f"
        next_revision: 43
        previous_revision: 42
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a7953a26a334852a2d946428fa46f4f9f351cbce1911c1fa63708bab698b84ac:
        aggregate_digest: "sha256:50e80b646ba01144540d80d31e5bc131ebdc2b0b5f4fac24a6f01dd2c4aec3cb"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:42:42.470Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_0cda429031b9b7c8ffa2a9e9"
          mutation_id: "compatibility:sha256:a7953a26a334852a2d946428fa46f4f9f351cbce1911c1fa63708bab698b84ac"
          plan_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 31
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a7953a26a334852a2d946428fa46f4f9f351cbce1911c1fa63708bab698b84ac"
        next_revision: 32
        previous_revision: 31
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade:
        aggregate_digest: "sha256:408c1ec37701da5c9259625091e1645a362b912157473d9bd1011b301bd98fc2"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:57:11.849Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c753d15c8af88512ee0bcc2f"
          mutation_id: "compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9:
        aggregate_digest: "sha256:4d3b7338c297e8010911c7815bd1d61eb076864551a03eb5f23691aec0395c9c"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_abe1dabf124a0b7972868fe3"
          mutation_id: "compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 16
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ad69f44d2c19cb6998538b58adc33ad32f85a04d06df6afff5888b25c42bc056:
        aggregate_digest: "sha256:8af2ce16f514059e061b77c6674ce6b71224f27780d1a1ac5743ff22a2ecf78a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:52:06.599Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_cd933ad895bfce728018e7eb"
          mutation_id: "compatibility:sha256:ad69f44d2c19cb6998538b58adc33ad32f85a04d06df6afff5888b25c42bc056"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 56
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ad69f44d2c19cb6998538b58adc33ad32f85a04d06df6afff5888b25c42bc056"
        next_revision: 57
        previous_revision: 56
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ae4afc9021d82cde8fad79c9144dcb63e6fb0372ca3ed3b4505e23d6d9d022b3:
        aggregate_digest: "sha256:25fc37725b706aa2ccb2ecd6d01da04179119e61ba169003fd4ae08b16d04670"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:06:32.254Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_164526b67f915760ea9a6cfe"
          mutation_id: "compatibility:sha256:ae4afc9021d82cde8fad79c9144dcb63e6fb0372ca3ed3b4505e23d6d9d022b3"
          plan_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          plan_revision: 12
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 62
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ae4afc9021d82cde8fad79c9144dcb63e6fb0372ca3ed3b4505e23d6d9d022b3"
        next_revision: 63
        previous_revision: 62
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:b35991a6c48ed51bb29b614385a7b75c9ab8724dedf2ecec548d48d2fa17e6a7:
        aggregate_digest: "sha256:885c252c26a3415d6229a74b4d6aba0d22ee525e29cb32659952f9069673dc1f"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:51:41.248Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_acd4d542e8d2af9d65feefe6"
          mutation_id: "compatibility:sha256:b35991a6c48ed51bb29b614385a7b75c9ab8724dedf2ecec548d48d2fa17e6a7"
          plan_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          plan_revision: 13
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 64
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:b35991a6c48ed51bb29b614385a7b75c9ab8724dedf2ecec548d48d2fa17e6a7"
        next_revision: 65
        previous_revision: 64
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:c605d8b5b967f04c0a2b5f00990eafea2615922033913a91263c35cfcc0112c5:
        aggregate_digest: "sha256:e5add49e8de3ded4a4ca418a67d1a75c23ca368f831816a620772f439275d4c0"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T01:27:08.271Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8df43088122a469461b078d3"
          mutation_id: "compatibility:sha256:c605d8b5b967f04c0a2b5f00990eafea2615922033913a91263c35cfcc0112c5"
          plan_digest: "sha256:f7ec9106b4c0a4c6f70ee80620bfaa6dcf62ab30a0ace1de39ad163c10ce7702"
          plan_revision: 14
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 66
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:c605d8b5b967f04c0a2b5f00990eafea2615922033913a91263c35cfcc0112c5"
        next_revision: 67
        previous_revision: 66
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:c97f1b8ba7a4f015e1c9c155173142eb14d74f0dfc6b7cc1f75d796ab19257c9:
        aggregate_digest: "sha256:7bb4056664ba413a8529fbcddc91b4396a146f5616925c55f529681167680dc3"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:12:43.781Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fd03b2097a0f1639597f907a"
          mutation_id: "compatibility:sha256:c97f1b8ba7a4f015e1c9c155173142eb14d74f0dfc6b7cc1f75d796ab19257c9"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 43
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c97f1b8ba7a4f015e1c9c155173142eb14d74f0dfc6b7cc1f75d796ab19257c9"
        next_revision: 44
        previous_revision: 43
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee:
        aggregate_digest: "sha256:a3df4e024aad4766d649f76ad116f63cb5c8e88fef4597198b17d12c883f48f5"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_132744cdb786aba96bd255bd"
          mutation_id: "compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:cf7af711aa442fb70247141b6b53fdf7be3bbb1af2e54d1f0607e07f9a79a717:
        aggregate_digest: "sha256:31295263aed4eaf089b928b5858fffed6a0dabe8ffd08455ac9af40ef83cc41a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:52:06.599Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_3eabf218b7b401fbcecfe955"
          mutation_id: "compatibility:sha256:cf7af711aa442fb70247141b6b53fdf7be3bbb1af2e54d1f0607e07f9a79a717"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 55
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:cf7af711aa442fb70247141b6b53fdf7be3bbb1af2e54d1f0607e07f9a79a717"
        next_revision: 56
        previous_revision: 55
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:d005605a49f804f1bceee405b42f213ef948bddb19b9573ce1260bc541a28451:
        aggregate_digest: "sha256:892886bd5dd0e437275e45dd114c52390c31cec06692eeeb723dd95390823ac3"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T06:47:19.154Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8f611e9969d8a656c559c3bf"
          mutation_id: "compatibility:sha256:d005605a49f804f1bceee405b42f213ef948bddb19b9573ce1260bc541a28451"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 79
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d005605a49f804f1bceee405b42f213ef948bddb19b9573ce1260bc541a28451"
        next_revision: 80
        previous_revision: 79
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd:
        aggregate_digest: "sha256:01e24eb53b8cc1114bb940ab244ad72ee0e9a69a5b653e9543e3799028a9225f"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:08:20.260Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_b665e5f518da35f40d00a0e7"
          mutation_id: "compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:d70c8fdb48193614020930a05ce2c460b895bca3ab433f7a8b2465f62135acef:
        aggregate_digest: "sha256:2c00d232a257fdca63fd5f7eb92d4d580c5ddab99f86beda902c23c9cfcd1faa"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:06:32.254Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_f9721a3c8bb1cf9af41dec43"
          mutation_id: "compatibility:sha256:d70c8fdb48193614020930a05ce2c460b895bca3ab433f7a8b2465f62135acef"
          plan_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          plan_revision: 12
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 61
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:d70c8fdb48193614020930a05ce2c460b895bca3ab433f7a8b2465f62135acef"
        next_revision: 62
        previous_revision: 61
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:de2094d53b7dc3aff3e2338d3eed355bf2d209869e1bbecd169452eea0de4054:
        aggregate_digest: "sha256:c1cf95fe6c1218862b73d053743ed5e6308859d920d6e572ddd3001141bc6e50"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T09:13:07.280Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_2a0d280a5820e629f5772d8f"
          mutation_id: "compatibility:sha256:de2094d53b7dc3aff3e2338d3eed355bf2d209869e1bbecd169452eea0de4054"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 36
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:de2094d53b7dc3aff3e2338d3eed355bf2d209869e1bbecd169452eea0de4054"
        next_revision: 37
        previous_revision: 36
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:de306b92afeb498e88a226d4f067bd7e696f5079b64093f693e02d3930c28ee4:
        aggregate_digest: "sha256:88fa4dba77b42fd930b0dac1ba6e24152446582be2be3e3eb8135f0b5d2f8594"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:21:41.489Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7669d4338986a983afde99db"
          mutation_id: "compatibility:sha256:de306b92afeb498e88a226d4f067bd7e696f5079b64093f693e02d3930c28ee4"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 20
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:de306b92afeb498e88a226d4f067bd7e696f5079b64093f693e02d3930c28ee4"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88:
        aggregate_digest: "sha256:8a1a55678c4442eefb8e7d129f7fbebd00c567de025d4b46621049f566bb3e91"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_089e5af8b2d4f7c522d37bbd"
          mutation_id: "compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:efb34c0fc94b9986bd01e7908cdfd0061d8d08655c8f1cf96d158f53eb7e6e6a:
        aggregate_digest: "sha256:4628034e1999a0af8ece2e0e99007972b9f178cb55ed5029158bc92e2dc56d71"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T20:19:08.343Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_efb9b19e189b63aa5b6129d9"
          mutation_id: "compatibility:sha256:efb34c0fc94b9986bd01e7908cdfd0061d8d08655c8f1cf96d158f53eb7e6e6a"
          plan_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
          plan_revision: 18
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 95
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:efb34c0fc94b9986bd01e7908cdfd0061d8d08655c8f1cf96d158f53eb7e6e6a"
        next_revision: 96
        previous_revision: 95
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f03af7a31da8d893b1460a148258a988f9ae521e8ff765e8b4577c70f51d13c4:
        aggregate_digest: "sha256:b3ddac01873d010923232adcfef354bba7c2e79d5c743e61d197916f4e46bb52"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:37:24.832Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_d51c5675ca3172cad8a950b1"
          mutation_id: "compatibility:sha256:f03af7a31da8d893b1460a148258a988f9ae521e8ff765e8b4577c70f51d13c4"
          plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 27
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f03af7a31da8d893b1460a148258a988f9ae521e8ff765e8b4577c70f51d13c4"
        next_revision: 28
        previous_revision: 27
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f1860fccad1bfec76671547fef0abb5fd52de89632364cee88d052c85caf5400:
        aggregate_digest: "sha256:394930f872d87749bac2c38bc81669839b01208f903d884db84ef628243e62b2"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T20:19:08.330Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ccebdf2b27336e7d500fe6a1"
          mutation_id: "compatibility:sha256:f1860fccad1bfec76671547fef0abb5fd52de89632364cee88d052c85caf5400"
          plan_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
          plan_revision: 18
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 94
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f1860fccad1bfec76671547fef0abb5fd52de89632364cee88d052c85caf5400"
        next_revision: 95
        previous_revision: 94
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f6eec07a92279d0f7a9d4de6e3f821943fe360d666b4b79ca43b98c409b5e1a5:
        aggregate_digest: "sha256:035f650c4daf15a435aabe53e77bddcf86b605eceaf6ead3b94c40c7f7e75879"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:29:25.923Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_4e167a17bf1a7ab4038ab513"
          mutation_id: "compatibility:sha256:f6eec07a92279d0f7a9d4de6e3f821943fe360d666b4b79ca43b98c409b5e1a5"
          plan_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 58
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f6eec07a92279d0f7a9d4de6e3f821943fe360d666b4b79ca43b98c409b5e1a5"
        next_revision: 59
        previous_revision: 58
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f73189cbd47c6805c1d7b2c98b106d7239f5029b70208be5f4c89e7a940ba33a:
        aggregate_digest: "sha256:dfd4f710774be68b229ec6675f303aff5a17d63e68db658c3cfcc74690226d7a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T02:06:34.530Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_200048e783a5d8b3b8b2a3b5"
          mutation_id: "compatibility:sha256:f73189cbd47c6805c1d7b2c98b106d7239f5029b70208be5f4c89e7a940ba33a"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 34
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f73189cbd47c6805c1d7b2c98b106d7239f5029b70208be5f4c89e7a940ba33a"
        next_revision: 35
        previous_revision: 34
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f:
        aggregate_digest: "sha256:59f999ba0cb5832a58f63e98a719e85f0cde09eac64c57fd478d6c088c9a1290"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a6099804ca4faafa3f7b9ee8"
          mutation_id: "compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 12
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e:
        aggregate_digest: "sha256:4a3caf0f179c302a281e9553368d69daca88e2485378533831128c532be4be3d"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_e0fcd4064689837a2222fb58"
          mutation_id: "compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 8
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626:
        aggregate_digest: "sha256:c1c9463018af1be82dc24a0fa917c39ebf84eccdd7b49fcb452891080d2d7851"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_90bed59ee431c5e3a70d2a3e"
          mutation_id: "compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 13
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609121424-49XXT3"
      external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6:
        aggregate_digest: "sha256:fba01ef3b83da355bc415b937e851625b889f225daada30ec7ca0ac6ecf33441"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:12:47.166Z"
          cause_refs:
            - "semantic-result:sha256:ea3e0eddd02bdee3cea41d87f0bca5da14ce0c0cfdab8acd8de54bab589ae819"
          entity: "work_item"
          from: "READY"
          id: "event_71f75d268461f213eadb748e"
          mutation_id: "external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 45
          to: "COMPLETED"
          work_item_id: "synchronize_candidate_base"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6"
        next_revision: 46
        previous_revision: 45
        schema_version: 1
        task_id: "202609121424-49XXT3"
      external-result:work-order-202609121424-49XXT3-executor-8213cb77d95bec5dba1a29e9:
        aggregate_digest: "sha256:dcf14ebe1271344edbff3e4a46c83686562ecdb52ab7f17686c4d2a255ce0772"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T07:16:23.852Z"
          cause_refs:
            - "semantic-result:sha256:246631c8f98de94e80a9704475a97ffd6a9b5cab695adb7dfa3a8a8802bd4fb4"
          entity: "work_item"
          from: "READY"
          id: "event_2e2bccc890a76c92d18da588"
          mutation_id: "external-result:work-order-202609121424-49XXT3-executor-8213cb77d95bec5dba1a29e9"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 80
          to: "REWORK_READY"
          work_item_id: "prepare_candidate"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-8213cb77d95bec5dba1a29e9"
        next_revision: 81
        previous_revision: 80
        schema_version: 1
        task_id: "202609121424-49XXT3"
      external-result:work-order-202609121424-49XXT3-executor-a8eec6925bf5d6ee97c95b6f:
        aggregate_digest: "sha256:d98f099609db33d7b9e2375095e3898ef511dfbccfd1ba9561fea24a07aff312"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T02:54:57.674Z"
          cause_refs:
            - "semantic-result:sha256:bc3ff0c97f4a4438484f28d5374a0bca0cb1ab647479b0a451251029f7257068"
          entity: "work_item"
          from: "PLANNED"
          id: "event_8f4a7c4121e94d2cb1de46cc"
          mutation_id: "external-result:work-order-202609121424-49XXT3-executor-a8eec6925bf5d6ee97c95b6f"
          plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          plan_revision: 15
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 71
          to: "REWORK_READY"
          work_item_id: "prepare_candidate"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-a8eec6925bf5d6ee97c95b6f"
        next_revision: 72
        previous_revision: 71
        schema_version: 1
        task_id: "202609121424-49XXT3"
      external-result:work-order-202609121424-49XXT3-executor-aed06939648a113cdac4c61c:
        aggregate_digest: "sha256:f2eca1e48f9394d96e65cace98a709d5cb37509f1838d6a29f7e7f94747739e2"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T13:58:34.125Z"
          cause_refs:
            - "semantic-result:sha256:865e8b2dae3ae27e0618318c392a64d0630debd2473079181efbe2e3cfc57ceb"
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_a25fe4f133253b66148aa832"
          mutation_id: "external-result:work-order-202609121424-49XXT3-executor-aed06939648a113cdac4c61c"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 83
          to: "COMPLETED"
          work_item_id: "prepare_candidate"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-aed06939648a113cdac4c61c"
        next_revision: 84
        previous_revision: 83
        schema_version: 1
        task_id: "202609121424-49XXT3"
      external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191:
        aggregate_digest: "sha256:1af8b0214af19c9bc9b792afb536b61058bf10f1a9c86b8a7d139325798b0cfd"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:15:51.336Z"
          cause_refs:
            - "semantic-result:sha256:c8b3c17a8bace614db0f4cc9a20661bf56823077e183a3e7d5b6af7f22627c72"
          entity: "work_item"
          from: "READY"
          id: "event_5167f6465707615d336c0fea"
          mutation_id: "external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 53
          to: "COMPLETED"
          work_item_id: "synchronize_candidate_base"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191"
        next_revision: 54
        previous_revision: 53
        schema_version: 1
        task_id: "202609121424-49XXT3"
      legacy-finish:202609121424-49XXT3:2026-09-16T20:19:06.057Z:026c97813bc53dabe636fd957e4e6961278b45a3:
        aggregate_digest: "sha256:aa1fa5f1f93e46e9cdfcc8bd24b1ac87d06232430ea79d4aafb5d33f91e56d35"
        event:
          actor_id: "CODER"
          at: "2026-09-16T20:34:05.784Z"
          cause_refs:
            - "task-verification:202609121424-49XXT3"
            - "git:026c97813bc53dabe636fd957e4e6961278b45a3"
          entity: "task"
          from: "ACTIVE"
          id: "event_0a565bee0cc00c0ce7bebb06"
          mutation_id: "legacy-finish:202609121424-49XXT3:2026-09-16T20:19:06.057Z:026c97813bc53dabe636fd957e4e6961278b45a3"
          plan_digest: "sha256:8920e7832b179b3e49ac6e0ac4d450744a7638de7ead87f7d48550eeefc1858b"
          plan_revision: 18
          repository_fingerprint: "sha256:c721bed7bdbec455bc24f36dd59cdddedd9bae00effd56abc6bf53f7706a5dbc"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 97
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202609121424-49XXT3:2026-09-16T20:19:06.057Z:026c97813bc53dabe636fd957e4e6961278b45a3"
        next_revision: 98
        previous_revision: 97
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6:
        aggregate_digest: "sha256:2099ae2049cd5115b8745c9bdb56d889e1592e0314283a76101c9d6e950e82b2"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T00:40:53.958Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_5f6cadaeee399a2ec63ca6d3"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6"
          plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 29
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6"
        next_revision: 30
        previous_revision: 29
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07:
        aggregate_digest: "sha256:2d24885be848b20686b3d160b14a14c3a26f5a95557a42d18ba87fc6e07e8b7d"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T16:28:04.232Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_6d533a221b7ee824d9db2c99"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 48
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07"
        next_revision: 49
        previous_revision: 48
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-3307dfbe1841453494e7efb2:
        aggregate_digest: "sha256:bdf6df632a9312770845f756a2b1916953ef302b2c836ddf755e29294865e6eb"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-15T02:59:14.950Z"
          cause_refs:
            - "risk_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_838059b7f79e089a7cd9fa56"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-3307dfbe1841453494e7efb2"
          plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          plan_revision: 15
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 75
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-3307dfbe1841453494e7efb2"
        next_revision: 76
        previous_revision: 75
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079:
        aggregate_digest: "sha256:b31d2c603a5a552f448f5af1c0488402aedc0fc4cf5b392656c4c416a2f881bc"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-13T23:01:21.946Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          id: "event_09e51e2ff0846e81e8db19cd"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 6
          to: "sha256:24582bb56476c1224e61f81d96fb931933fa4d48bde7b85ad1d6778ed4b24cbc"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9:
        aggregate_digest: "sha256:c2a7c81734e2bc934351979d1539b040cb5f0a31d56b54ef0a0695f53a0a8b43"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T00:34:09.691Z"
          cause_refs:
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_8548f5a0e0489ca2e70cd1a4"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 25
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9"
        next_revision: 26
        previous_revision: 25
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-5e6e6b18501f5290df1d3ac5:
        aggregate_digest: "sha256:955904d7ec753a5830d3bbe24dca8ab82110e52f94288cfaae986dce74a4755e"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-15T02:58:10.960Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          id: "event_b0f921e16530f484b2745914"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-5e6e6b18501f5290df1d3ac5"
          plan_digest: "sha256:1e6b519aa0d9b23e51baa81a959870a55949aff6eaef4e073584bcee60f19f53"
          plan_revision: 15
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 74
          to: "sha256:9d2978d3e142e3be2be36f8c43d5fe5da4442014724fe3c84aac1688d79e80c3"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-5e6e6b18501f5290df1d3ac5"
        next_revision: 75
        previous_revision: 74
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-6ba5bdb1945d6a55fb9d5c2d:
        aggregate_digest: "sha256:e0eb6249b255318035b5982db8d6ff8f6c5b2ff2234872ec318a791359e0090d"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-15T20:04:56.691Z"
          cause_refs:
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_7cfce5d6508088ac662eb762"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-6ba5bdb1945d6a55fb9d5c2d"
          plan_digest: "sha256:40db79fe9e3fa7f8beeb58f5c7879694ff74dacbcdfd4af96b2f98e26c5c4202"
          plan_revision: 17
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 89
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-6ba5bdb1945d6a55fb9d5c2d"
        next_revision: 90
        previous_revision: 89
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04:
        aggregate_digest: "sha256:4b9f1ec85caa7be3536a43d537022ac806198417d31bb48512d2701579dded22"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T00:39:46.937Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          id: "event_5c54ba054e1eeb90f0335dc0"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04"
          plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 28
          to: "sha256:9e285965362318aa806b2ead1dcddad86f26178f8bb4aaca1e55a3618812daf3"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04"
        next_revision: 29
        previous_revision: 28
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7:
        aggregate_digest: "sha256:342f69ac5230e446f53de5e61c299170a05a1eb2b5fb96bebef7fdf17ac8f0b2"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T02:02:01.893Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "dependencies_changed"
            - "architecture_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_b169b299c4e7016f6d543c6e"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7"
          plan_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 32
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7"
        next_revision: 33
        previous_revision: 32
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-af7f2a535353a057e3a7164c:
        aggregate_digest: "sha256:6a2517d0b2b110aa8492348c3c505b924e6cde0e27883a5472e037ff6c3aff0e"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-15T14:02:46.645Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_6cd68b5e1ecd1d50380c9b6e"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af7f2a535353a057e3a7164c"
          plan_digest: "sha256:eb75b3e3586323a4e8a409eb2d9d24029ec32ebe63975bab32c2feb8684d30c6"
          plan_revision: 16
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 86
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af7f2a535353a057e3a7164c"
        next_revision: 87
        previous_revision: 86
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a:
        aggregate_digest: "sha256:7a48c011f7717df573ff12f82dcaa84c13aab99556016b3bb7a716bd9d662cc7"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T09:14:38.431Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_77bf2255888a8e15ffc5eae1"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 37
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a"
        next_revision: 38
        previous_revision: 37
        schema_version: 1
        task_id: "202609121424-49XXT3"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "026c97813bc53dabe636fd957e4e6961278b45a3"
    message: "🚧 49XXT3 task: apply external agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ecfccc5ad0230fc1876a319be0af5cdb530c339f"
    version: 1
id_source: "generated"
---
## Summary

Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.

## Scope

- In scope: Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
- Out of scope: unrelated refactors not required for "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA".

## Plan

Preserve the two completed candidate WorkItems and end the semantic graph so AgentPlane can begin protected evaluation and integration.

## Verify Steps

1. Run `bun run release:check`. Expected: version parity, generated release surfaces, package manifests, and release policy checks pass for 0.7.9.
2. Run `bun run release:prepublish`. Expected: the complete prepublish gate passes for the exact release candidate without skipped mandatory checks.
3. Review `git diff --check`, the exact task diff, and `git status --short --untracked-files=all`. Expected: only approved release metadata, documentation, package version surfaces, baseline evidence, and AgentPlane task artifacts changed; `agentplane-roadmap-r2` and unrelated user work are not committed.
4. Complete AgentPlane verification and hosted branch protection for the release-ready candidate. Expected: the accepted release commit is integrated into `main`, hosted checks are successful, and `origin/main` resolves to the exact qualified publish SHA.
5. Publish v0.7.9 only through the AgentPlane release route after an exact fresh publish-authority grant. Expected: `.agentplane/.release/publish/publish-result.json` records `success=true`, an empty `failures` array, version 0.7.9, and the exact qualified main SHA.
6. Independently read back the GitHub v0.7.9 tag and release. Expected: the tag resolves to the qualified publish SHA and every required release asset and checksum is present.
7. Independently read back all npm package versions and install the published packages in clean temporary directories. Expected: every public AgentPlane package reports 0.7.9 and both `agentplane` and `ap` entrypoints execute successfully.
8. Independently verify `setup-agentplane`, Homebrew, and Scoop distribution surfaces and perform their documented clean install smoke checks when the release route provides them. Expected: every required surface resolves to 0.7.9 and its expected checksum; any unavailable anonymous GHCR read is recorded separately without being misreported as success.
9. Re-fetch the default branch and provider state after publication. Expected: `origin/main`, the canonical release evidence, the tag, registries, and distribution surfaces agree on the same released SHA and version.
10. Complete the required post-publish evidence follow-up and start the next patch beta only through fresh AgentPlane-managed tasks and authority packets. Expected: no lifecycle or external action is inferred from prose, and any genuine provider or evidence boundary is reported explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-16T20:19:06.057Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:9cf5b2e4d0913444dd22e75559fae1e7ad1d16f13ca446af014dcf764ee33e73, input_digest=sha256:6c337943a17b00e935f07c5839e0b4be575a170197b81f6386ce5f5f307f4bc2

Details:

Check: affected_unit_integration
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run release:prepublish
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run release:prepublish
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check critical_paths (3/3)

Check: docs_contract
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check docs_contract (1/3)

Check: docs_contract
Command: bun run release:prepublish
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check docs_contract (2/3)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check docs_contract (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check full_regression

Check: real_e2e
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: bun run release:prepublish
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run release:prepublish
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121424-49XXT3 Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-49XXT3-publish-and-independently-verify-agentplane-0-7/.agentplane/tasks/202609121424-49XXT3/blueprint/resolved-snapshot.json
- old_digest: b868d5c39ecfa4e9a069b687877b066b738e575f2bfcceb04210173b98273663
- current_digest: b868d5c39ecfa4e9a069b687877b066b738e575f2bfcceb04210173b98273663
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609121424-49XXT3

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- BEGIN HOSTED PUBLISH EVIDENCE -->
### Hosted publish

- State: ok
- Note: Hosted publish confirmed for v0.7.9.
- Details:
  - release_sha: bdd79f0ab1fc91debde267a220403f8212c3a12b
  - version: 0.7.9
  - tag: v0.7.9
  - @agentplaneorg/core: preexisting
  - @agentplaneorg/recipes: preexisting
  - agentplane: preexisting
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.7.9
  - ghcr: published
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/35151631278
  - external_homebrew: published | basilisk-labs/homebrew-tap | 802ed8f66c3b66e3d67ad5205d6e5bf1448b436e | https://github.com/basilisk-labs/homebrew-tap/pull/47
  - external_scoop: published | basilisk-labs/scoop-bucket | 8d9f2e3321c4e24f34919797e835824b784b8c9e | https://github.com/basilisk-labs/scoop-bucket/pull/46
  - external_setup-agentplane: published | basilisk-labs/setup-agentplane | 8a1161efcea1a129b56fc6e5e06d31ce99759868 | https://github.com/basilisk-labs/setup-agentplane/pull/46
<!-- END HOSTED PUBLISH EVIDENCE -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

## Token Usage

- State: `unavailable`
- Completeness: `0/50` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:c226c40da8cbe91cf78dc5f111e69af485ac8f10f5a0a37a41484ec31514fc6e`
- Unavailable reason: `external_host_turn_unallocatable`
- Updated at: `2026-09-16T20:34:05.784Z`