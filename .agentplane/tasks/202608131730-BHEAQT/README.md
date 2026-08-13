---
id: "202608131730-BHEAQT"
title: "Qualify and publish AgentPlane 0.7.6"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202608122156-EZZZYH"
tags:
  - "qualification"
  - "release"
  - "v0.7.6"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-13T17:31:20.267Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by the user as the final 0.7.6 qualification and publication stage after all planned fixes and verification optimization."
verification:
  state: "ok"
  updated_at: "2026-08-13T22:00:07.775Z"
  updated_by: "TESTER"
  note: "Exact candidate 95a6d46c5 passed the complete local release contract."
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
    authority_violations:
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:source_code"
      - "repository_effect:tests"
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
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/logs/hosted-boundary-matrix.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/logs/packaged-candidate-flow.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.stdout.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.events.jsonl"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.stderr.log"
      - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.stdout.log"
      - ".agentplane/workflows/last-known-good.md"
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
      - "docs/releases/v0.7.6.md"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-shared.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/release/shared-worktree-dependency-manifest.test.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
      - "scripts/bench/internal/agent-efficiency-dependency-manifest.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "website/static/img/social/docs/releases/v0.7.6.png"
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
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "observed_effect_dependencies"
    - "observed_effect_public_api"
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
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
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:44af65f0fb4a7ea3304a478ce5b22eb8dda33c93933984fa4754e7f54809274d"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
        - "central_path:packages/core/package.json"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/logs/hosted-boundary-matrix.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/logs/packaged-candidate-flow.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.stdout.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.events.jsonl"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.stderr.log"
        - "unknown_path:.agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.stdout.log"
        - "unknown_path:packages/spec/examples/acr.json"
        - "unknown_path:scripts/baselines/v0.7-compatibility-candidate.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
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
        changed_files:
          - ".agentplane/WORKFLOW.md"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/logs/hosted-boundary-matrix.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/logs/packaged-candidate-flow.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-01.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-02.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-03.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-04.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark-current/samples/sample-05.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-01.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-02.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-03.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-04.stdout.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.events.jsonl"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.stderr.log"
          - ".agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/samples/sample-05.stdout.log"
          - ".agentplane/workflows/last-known-good.md"
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
          - "docs/releases/v0.7.6.md"
          - "packages/agentplane/package.json"
          - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-shared.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
          - "packages/agentplane/src/commands/release/shared-worktree-dependency-manifest.test.ts"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/bench/internal/agent-efficiency-anchor-runtime.mjs"
          - "scripts/bench/internal/agent-efficiency-dependency-manifest.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "website/static/img/social/docs/releases/v0.7.6.png"
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
commit:
  hash: "95a6d46c5cd6af4c4bfd2e61c79a9d4606dca12e"
  message: "🐛 BHEAQT release: tolerate stale dependency links"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-13T17:32:00.043Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-13T21:59:16.530Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DOING"
    commit: "95a6d46c5cd6af4c4bfd2e61c79a9d4606dca12e"
  -
    type: "verify"
    at: "2026-08-13T22:00:07.775Z"
    author: "TESTER"
    state: "ok"
    note: "Exact candidate 95a6d46c5 passed the complete local release contract."
doc_version: 3
doc_updated_at: "2026-08-13T22:00:09.031Z"
doc_updated_by: "INTEGRATOR"
description: "Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt."
sections:
  Summary: |-
    Qualify and publish AgentPlane 0.7.6

    Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.
  Scope: |-
    - In scope: Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.
    - Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.6".
  Plan: "1. Confirm the merged EZZZYH hosted-close and a clean tracked protected-main baseline; require current public version 0.7.5 and no active release incident. 2. Create the dedicated branch_pr release worktree, freeze the canonical patch plan at exactly 0.7.6 from the current main SHA, and author English release notes that cover the actual v0.7.5..candidate change inventory. 3. Run the complete provider-enabled 20-scenario release qualification on the exact clean pre-version candidate using the reviewed Codex runtime; require ready disposition, zero blocking defects, and preserve the measured verification-efficiency evidence. 4. Prepare the 0.7.6 release candidate so all public package versions, internal dependency pins, repository expected CLI, generated artifacts, and release notes advance together without creating or pushing a tag. 5. Run release parity and the canonical release:prepublish gate on the exact release candidate SHA; record the full check composition and stop on any failure or unexpected dirty state. 6. Push the candidate branch, open the release PR, require resolved review threads and stable required hosted checks on its exact head, then integrate through the AgentPlane queue and wait for hosted close. 7. From the exact merged main release SHA, require a successful release-ready artifact, dispatch the GitHub-only Publish release workflow for 0.7.6, and require successful publish-result, tag, GitHub Release, and registry identity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes. 8. Finalize AgentPlane task truth, clean the merged release worktree and branch through AgentPlane, verify local main equals origin/main with no unintended tracked changes, and report qualification, efficiency, publication, and residual lifecycle debt."
  Verify Steps: |-
    1. Inspect main and provider state. Expected: PR #4831 is merged, Task Hosted Close 31725715564 succeeded, EZZZYH is DONE, the integration queue is empty, tracked main is clean, all public packages are 0.7.5, and no active incident blocks release planning.
    2. Run the canonical patch release plan. Expected: target version is exactly 0.7.6, base SHA equals the protected main release base, changes inventory covers every commit since v0.7.5, and docs/releases/v0.7.6.md satisfies the release-note coverage contract.
    3. Execute node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject <exact-clean-candidate-sha>. Expected: all 20 scenarios execute, provider matrix and packaged-mixed-scope-lifecycle pass, release disposition is ready with zero blocking defects, and exact-SHA report plus efficiency metrics are retained.
    4. Prepare the branch_pr release candidate. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes versions and both CLI internal dependency pins are 0.7.6; repository expected CLI and generated release surfaces agree; no tag is created before protected-main merge.
    5. Run bun run release:parity and bun run release:prepublish on the exact candidate SHA. Expected: both exit zero; install, migration, workflow, critical CLI, significant coverage, schema/docs, and package/runtime gates remain present; no temporary or unintended tracked artifacts remain.
    6. Inspect the release PR and hosted checks. Expected: no unresolved review thread, PR head equals the verified candidate SHA, every required hosted check including PR verification passes stably, and AgentPlane integration records the exact merge SHA plus hosted-close evidence.
    7. Inspect Core CI release-ready for the exact merged main SHA, dispatch Publish release with version 0.7.6 and that SHA, and inspect its artifact. Expected: release-ready and publish-result identities match exact SHA/version/tag, workflow concludes success, tag and GitHub Release v0.7.6 exist, and the release is latest.
    8. Run node scripts/release/check-published-packages.mjs --version 0.7.6 and independent npm/GitHub readback. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes resolve to 0.7.6 with expected dependency pins; final main equals origin/main, the release task is DONE, its worktree/branch are cleaned, and git status contains no unintended tracked changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-13T22:00:07.775Z — VERIFY — ok

    By: TESTER

    Note: Exact candidate 95a6d46c5 passed the complete local release contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:77b801a2249a30d49b4cc54c7efa46a6b160daada92d0eb56aa4ba92553aa06e, input_digest=sha256:10fc4d04e493a31d4f58c58efd0adfcfd1a27b7765e5204e66ee61dc3c6291a7

    Details:

    Command: bun run release:prepublish
    Result: pass
    Evidence: release-ci-base 104/104 chunks; workflow coverage 50/50; significant coverage 204/204; release-critical 16/16; install and migration smoke passed
    Scope: exact-SHA build, package, migration, workflow, CLI, regression, coverage, compatibility, efficiency, and release-critical gates

    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject 95a6d46c5cd6af4c4bfd2e61c79a9d4606dca12e
    Result: pass
    Evidence: 20 scenarios executed; 19 ready and one non-blocking absolute-latency advisory; provider matrix passed; zero blocking defects
    Scope: real user workflows, installed CLI, provider-enabled lifecycle, first-task and mixed-scope behavior

    Command: bun run release:parity
    Result: pass
    Evidence: agentplane, core, recipes, internal pins, ACR example, README header, and release surfaces agree on 0.7.6
    Scope: version and generated release metadata consistency

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608131730-BHEAQT-qualify-and-publish-agentplane-0-7-6/.agentplane/tasks/202608131730-BHEAQT/blueprint/resolved-snapshot.json
    - old_digest: 1899fc9e16ece1a5840f337f0c3b3222aac692041c82a0acb222673a31e94a1f
    - current_digest: 1899fc9e16ece1a5840f337f0c3b3222aac692041c82a0acb222673a31e94a1f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608131730-BHEAQT

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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, close the release PR and revert only the candidate commit through a new task; do not create or push v0.7.6. After tag, GitHub Release, or npm publication, immutable registries make rollback unsafe: stop, preserve evidence, and prepare a forward-fix 0.7.7 task instead of rewriting tags, releases, or package versions."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "bc0afaea7a7be909fc93374a195c73da3f697d85"
    version: 1
id_source: "generated"
---
## Summary

Qualify and publish AgentPlane 0.7.6

Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.

## Scope

- In scope: Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.6".

## Plan

1. Confirm the merged EZZZYH hosted-close and a clean tracked protected-main baseline; require current public version 0.7.5 and no active release incident. 2. Create the dedicated branch_pr release worktree, freeze the canonical patch plan at exactly 0.7.6 from the current main SHA, and author English release notes that cover the actual v0.7.5..candidate change inventory. 3. Run the complete provider-enabled 20-scenario release qualification on the exact clean pre-version candidate using the reviewed Codex runtime; require ready disposition, zero blocking defects, and preserve the measured verification-efficiency evidence. 4. Prepare the 0.7.6 release candidate so all public package versions, internal dependency pins, repository expected CLI, generated artifacts, and release notes advance together without creating or pushing a tag. 5. Run release parity and the canonical release:prepublish gate on the exact release candidate SHA; record the full check composition and stop on any failure or unexpected dirty state. 6. Push the candidate branch, open the release PR, require resolved review threads and stable required hosted checks on its exact head, then integrate through the AgentPlane queue and wait for hosted close. 7. From the exact merged main release SHA, require a successful release-ready artifact, dispatch the GitHub-only Publish release workflow for 0.7.6, and require successful publish-result, tag, GitHub Release, and registry identity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes. 8. Finalize AgentPlane task truth, clean the merged release worktree and branch through AgentPlane, verify local main equals origin/main with no unintended tracked changes, and report qualification, efficiency, publication, and residual lifecycle debt.

## Verify Steps

1. Inspect main and provider state. Expected: PR #4831 is merged, Task Hosted Close 31725715564 succeeded, EZZZYH is DONE, the integration queue is empty, tracked main is clean, all public packages are 0.7.5, and no active incident blocks release planning.
2. Run the canonical patch release plan. Expected: target version is exactly 0.7.6, base SHA equals the protected main release base, changes inventory covers every commit since v0.7.5, and docs/releases/v0.7.6.md satisfies the release-note coverage contract.
3. Execute node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject <exact-clean-candidate-sha>. Expected: all 20 scenarios execute, provider matrix and packaged-mixed-scope-lifecycle pass, release disposition is ready with zero blocking defects, and exact-SHA report plus efficiency metrics are retained.
4. Prepare the branch_pr release candidate. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes versions and both CLI internal dependency pins are 0.7.6; repository expected CLI and generated release surfaces agree; no tag is created before protected-main merge.
5. Run bun run release:parity and bun run release:prepublish on the exact candidate SHA. Expected: both exit zero; install, migration, workflow, critical CLI, significant coverage, schema/docs, and package/runtime gates remain present; no temporary or unintended tracked artifacts remain.
6. Inspect the release PR and hosted checks. Expected: no unresolved review thread, PR head equals the verified candidate SHA, every required hosted check including PR verification passes stably, and AgentPlane integration records the exact merge SHA plus hosted-close evidence.
7. Inspect Core CI release-ready for the exact merged main SHA, dispatch Publish release with version 0.7.6 and that SHA, and inspect its artifact. Expected: release-ready and publish-result identities match exact SHA/version/tag, workflow concludes success, tag and GitHub Release v0.7.6 exist, and the release is latest.
8. Run node scripts/release/check-published-packages.mjs --version 0.7.6 and independent npm/GitHub readback. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes resolve to 0.7.6 with expected dependency pins; final main equals origin/main, the release task is DONE, its worktree/branch are cleaned, and git status contains no unintended tracked changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-13T22:00:07.775Z — VERIFY — ok

By: TESTER

Note: Exact candidate 95a6d46c5 passed the complete local release contract.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:77b801a2249a30d49b4cc54c7efa46a6b160daada92d0eb56aa4ba92553aa06e, input_digest=sha256:10fc4d04e493a31d4f58c58efd0adfcfd1a27b7765e5204e66ee61dc3c6291a7

Details:

Command: bun run release:prepublish
Result: pass
Evidence: release-ci-base 104/104 chunks; workflow coverage 50/50; significant coverage 204/204; release-critical 16/16; install and migration smoke passed
Scope: exact-SHA build, package, migration, workflow, CLI, regression, coverage, compatibility, efficiency, and release-critical gates

Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject 95a6d46c5cd6af4c4bfd2e61c79a9d4606dca12e
Result: pass
Evidence: 20 scenarios executed; 19 ready and one non-blocking absolute-latency advisory; provider matrix passed; zero blocking defects
Scope: real user workflows, installed CLI, provider-enabled lifecycle, first-task and mixed-scope behavior

Command: bun run release:parity
Result: pass
Evidence: agentplane, core, recipes, internal pins, ACR example, README header, and release surfaces agree on 0.7.6
Scope: version and generated release metadata consistency

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608131730-BHEAQT-qualify-and-publish-agentplane-0-7-6/.agentplane/tasks/202608131730-BHEAQT/blueprint/resolved-snapshot.json
- old_digest: 1899fc9e16ece1a5840f337f0c3b3222aac692041c82a0acb222673a31e94a1f
- current_digest: 1899fc9e16ece1a5840f337f0c3b3222aac692041c82a0acb222673a31e94a1f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608131730-BHEAQT

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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, close the release PR and revert only the candidate commit through a new task; do not create or push v0.7.6. After tag, GitHub Release, or npm publication, immutable registries make rollback unsafe: stop, preserve evidence, and prepare a forward-fix 0.7.7 task instead of rewriting tags, releases, or package versions.

## Findings
