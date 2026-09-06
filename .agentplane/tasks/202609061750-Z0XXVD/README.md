---
id: "202609061750-Z0XXVD"
title: "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 65
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run release:prepublish"
  - "bun run qualification:mixed-scope-lifecycle"
  - "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
  - "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
plan_approval:
  state: "approved"
  updated_at: "2026-09-06T20:51:25.055Z"
  updated_by: "USER"
  note: "Relay the user standing authorization for all required release repairs. This revision only shortens the output identifier to satisfy the WorkOrder schema; the exact bounded runtime scope and mandatory verification remain unchanged."
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
    - "effect_public_api"
    - "effect_release_metadata"
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
      - ".agentplane/WORKFLOW.md"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.8-evidence"
      - "docs/releases/v0.7.8.md"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/route-decision.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/cli/task-continuity.testkit.ts"
      - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
      - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
      - "packages/testkit/src/cli-harness.ts"
      - "packages/testkit/src/release.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "website/static/img/social/docs/releases"
      - "website/static/img/social/manifest.json"
      - "website/static/llms-full.txt"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Network reads install the known published baseline and package dependencies. Actual package publishing and protected integration retain separate native operator authority."
      - "Prepare only the exact approved release candidate and its evidence in an isolated native task worktree."
    repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".agentplane/WORKFLOW.md"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.8-evidence"
      - "docs/releases/v0.7.8.md"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/route-decision.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/cli/task-continuity.testkit.ts"
      - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
      - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
      - "packages/testkit/src/cli-harness.ts"
      - "packages/testkit/src/release.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "website/static/img/social/docs/releases"
      - "website/static/img/social/manifest.json"
      - "website/static/llms-full.txt"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "packages/testkit"
    changed_paths:
      - "docs/releases/v0.7.8-evidence/preparation.md"
      - "docs/releases/v0.7.8.md"
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
      - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
      - "packages/testkit/src/cli-harness.ts"
    external_effects: []
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_dependencies"
    - "effect_public_api"
    - "effect_release_metadata"
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
          - ".agentplane/WORKFLOW.md"
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.8-evidence"
          - "docs/releases/v0.7.8.md"
          - "packages/agentplane/package.json"
          - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
          - "packages/agentplane/src/cli/route-decision.testkit.ts"
          - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
          - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
          - "packages/agentplane/src/cli/task-continuity.testkit.ts"
          - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
          - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
          - "packages/testkit/src/cli-harness.ts"
          - "packages/testkit/src/release.ts"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "website/static/img/social/docs/releases"
          - "website/static/img/social/manifest.json"
          - "website/static/llms-full.txt"
        evidence_requirements:
          - "external_effect:network_read"
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
          reversibility: "reversible"
      digest: "sha256:b2eda46cb76937e62febb79ea39c1366c7b0f88ca43c803c703fe3960d0dee64"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
        - "central_component:packages/agentplane/src/cli/route-decision.testkit.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
        - "central_component:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
        - "central_component:packages/agentplane/src/cli/task-continuity.testkit.ts"
        - "central_component:packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
        - "central_component:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
        - "central_component:packages/core/package.json"
        - "central_path:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
        - "central_path:packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "unknown_path:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "packages/agentplane"
          - "packages/testkit"
        changed_files:
          - "docs/releases/v0.7.8-evidence/preparation.md"
          - "docs/releases/v0.7.8.md"
          - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
          - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
          - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
          - "packages/testkit/src/cli-harness.ts"
        external_effects: []
        repository_effects:
          - "documentation"
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
      requires_real_e2e: false
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
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 529e290f2539. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: bcd1de2213d9. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 3363de4a5e3c. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8c870ae5d37e. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 70c0fad2aaef. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: dd7d450751cb. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e197ace38dac. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7e4ff9a77ff5. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-06T17:54:49.426Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-06T18:13:31.704Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 529e290f2539. CLI accepted one state-bound external-agent semantic result."
    commit: "529e290f25392071470a7f6f5b1a1d9646688504"
  -
    type: "verify"
    at: "2026-09-06T18:16:28.303Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run release:prepublish"
  -
    type: "status"
    at: "2026-09-06T18:25:15.275Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bcd1de2213d9. CLI accepted one state-bound external-agent semantic result."
    commit: "bcd1de2213d918ce9fe5fc0eba592b7809e265f6"
  -
    type: "status"
    at: "2026-09-06T18:30:07.448Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 3363de4a5e3c. CLI accepted one state-bound external-agent semantic result."
    commit: "3363de4a5e3c34ca4780e2c63306ad3230824c79"
  -
    type: "status"
    at: "2026-09-06T19:28:22.224Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8c870ae5d37e. CLI accepted one state-bound external-agent semantic result."
    commit: "8c870ae5d37e0c3758082dc4fc89e51377794991"
  -
    type: "status"
    at: "2026-09-06T19:32:49.559Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 70c0fad2aaef. CLI accepted one state-bound external-agent semantic result."
    commit: "70c0fad2aaef708a66d3e51446ef5633cec50eb3"
  -
    type: "status"
    at: "2026-09-06T19:45:08.368Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: dd7d450751cb. CLI accepted one state-bound external-agent semantic result."
    commit: "dd7d450751cbf3750d7629c116f3c6473ed25a66"
  -
    type: "status"
    at: "2026-09-06T19:56:09.076Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e197ace38dac. CLI accepted one state-bound external-agent semantic result."
    commit: "e197ace38dacbaef55154c7947657a3e2ad62ecb"
  -
    type: "status"
    at: "2026-09-06T21:04:15.170Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7e4ff9a77ff5. CLI accepted one state-bound external-agent semantic result."
    commit: "7e4ff9a77ff52dc72f14e2001966e5e91cf815f1"
doc_version: 3
doc_updated_at: "2026-09-06T21:04:15.170Z"
doc_updated_by: "SUPERVISOR"
description: "Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope."
sections:
  Summary: |-
    Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

    Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
  Scope: |-
    - In scope: Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
    - Out of scope: unrelated refactors not required for "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication".
  Plan: "Retain the four bounded runtime repairs with a WorkOrder-compatible output ID."
  Verify Steps: |-
    1. Run `bun run release:prepublish`. Expected: the committed 0.7.8 candidate passes canonical release CI, package checks, active-incident cleanup, version parity and generated-document freshness.
    2. Run `bun run qualification:mixed-scope-lifecycle`. Expected: the installed packed candidate completes the mixed source, test and documentation lifecycle with correct replay, stale-result, projection and cleanup behavior.
    3. Run `node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs`. Expected: published 0.7.7 direct and branch_pr fixtures upgrade using packed 0.7.8, preserve existing task identity, content and DOING state, produce the dedicated upgrade commit, pass routing and doctor, and make no changes on an actual repeated upgrade.
    4. Run `node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417`. Expected: valid English template sections and complete planned change coverage. Review the first two prose paragraphs for a clear explanation of practical user outcomes.
    5. Review the final diff and observed evidence. Expected: only approved release metadata, notes, generated references and qualification artifacts changed; publication remains explicitly pending until exact-SHA hosted release-ready and canonical publish-result evidence exist.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-06T18:16:28.303Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run release:prepublish
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:860a8441b86236b4176982b3b7cc53b92a7cc2d7a60ae35921ca43cf99931621, input_digest=sha256:5db480110194b3a749db12713701ab37ef4728721168a51473e08b55e832c317

    Details:

    Command: bun run release:prepublish
    Result: fail
    Evidence: .agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609061750-Z0XXVD declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609061750-Z0XXVD-prepare-and-qualify-agentplane-0-7-8-for-exact-s/.agentplane/tasks/202609061750-Z0XXVD/blueprint/resolved-snapshot.json
    - old_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
    - current_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609061750-Z0XXVD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609061750-Z0XXVD
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
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:3dd28e0ddacc64658f92645f9f978f02cf04e445bdaf3e4c80fd698719700d88"
    digest: "sha256:fdc8cc178b3765693d7fc5539f98b00f66725e5fb9eb7a1fc43967657e693649"
    grant_id: "1da84bd6-3e04-4bea-aa75-298a645c1454"
    issued_at: "2026-09-06T20:51:25.055Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:33b60fdbd001e78436ed2d64308d077d9e42c04af0db1023dc4fc732ba57eebf"
    plan_revision: 61
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:dfcf17c2402a7a7ef380f235ab372b7fc8d1cf85896e338299ea8ab45655a3fc"
    status: "active"
    task_id: "202609061750-Z0XXVD"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-06T20:51:25.055Z"
        approved_by: "USER"
        approved_digest: "sha256:01d3d9dd6e984d40a6728c7f79fab07e6589f03f503c57d78a783cfff1e24dd8"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-06T20:51:10.129Z"
      digest: "sha256:01d3d9dd6e984d40a6728c7f79fab07e6589f03f503c57d78a783cfff1e24dd8"
      proposal:
        assumptions:
          - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
          - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
          - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
          - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
          - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
          - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
          - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
          - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
          - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
          - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
          - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
          - "Run node scripts/bench/capture-compatibility-candidate.mjs --write. The inspected preview changes only release_version_delta.to_version, surface_sha256 and to_sha256. Do not edit baseline allowances or generator logic."
          - "Keep the existing clone baseline thresholds and file inclusion rules unchanged. Reuse the existing continuity planner with its explicit approval parameter. Extract a shared fixture proposal constructor only because both continuity and recovery need it. Preserve fixture-specific identifiers, acceptance and task verification commands. Do not introduce shared testing infrastructure or dependencies."
          - "The local ci:local:full regression suite and static ci:contract are distinct checks. The former baseline passed; clone:check in the latter fails on unchanged main as well as the release candidate. Claim only observed checks."
          - "The GitHub release body limit is 125000 characters, evidenced by github.com/cli/cli/issues/7815. Preserve the entire main release narrative before Detailed Change Record. Shorten repetitive record descriptions and use unique ten-character commit IDs linked through the immutable full-SHA JSON source list. Verify exact one-to-one mapping, no dropped entries and a margin below the limit."
          - "Run the nearest existing route-decision, task-continuity, workflow effect recovery, release and task-run query tests for the affected helpers, plus testkit and CLI type checks. Use the unchanged clone guard after edits. Delete only its own generated report after preserving failure evidence when required."
          - "Inspect and preserve the behavioral purpose of each failing regression. Replace obsolete fixture plan/verification setup with existing native test helpers. An approved canonical plan may project DOING before branch start. Passing verification and closure must be represented in canonical Task state and bound to the tested implementation. Do not change assertions merely to accept an unexplained route."
          - "All previous drafts are already committed at the issued b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0 baseline. Do not restore older draft files over these repairs."
          - "Native release CI groups 1-8 passed. Group 9 readiness failed. A canonical-configuration supplemental audit of groups 10-113 passed 5309 tests and failed 85 tests, with one existing skip. All 86 failures across 25 CLI files reproduce on unchanged main. This audit identifies repair scope and does not replace the unchanged native release gate."
          - "Restore only the 25 preserved files from complete-cli-fixture-drafts.json. They are the tested draft based on the current unchanged b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0 baseline."
          - "The four runtime defects now have concrete source-backed reproductions after fixture preconditions are established. The five added paths are the complete bounded correction surface. No unrelated runtime refactor is approved."
          - "Planning approval projects ACTIVE as DOING. Recovery eligibility must depend on actual untouched WorkItems, execution attempts, claims and receipts while retaining the existing provenance, token, Git, lease, runner and external-effect checks. Do not classify plan approval itself as implementation execution."
          - "Preserve the root node_modules ownership guard. Keep package-local dependencies usable when the active trusted runtime source is external to the fixture repository. Validate actual CLI invocation and negative foreign-root reuse tests."
          - "Task dependencies must block approved task-centric execution before WorkItem work starts. Preserve the legacy route behavior and normal continuation after dependencies complete."
          - "Use the existing measured backend reader for task context loading. Preserve lazy local routes with no provider preparation and the documented trace fields."
        planning_baseline:
          captured_at: "2026-09-06T20:50:45.814Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:40ed97c759846395c856d0a94ba59e096714c9aa954c105a1c52157f4ad3bf97"
          dirty_paths:
            - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
            - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
          git:
            kind: "commit"
            ref: null
            sha: "b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:60"
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run qualification:mixed-scope-lifecycle"
              id: "installed-lifecycle"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
              id: "published-upgrade"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
              id: "release-notes"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
          criteria:
            -
              check_ids:
                - "prepublish"
              description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
              id: "stable-candidate"
              required: true
            -
              check_ids:
                - "release-notes"
                - "prepublish"
              description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
              id: "readable-complete-notes"
              required: true
            -
              check_ids:
                - "installed-lifecycle"
                - "published-upgrade"
              description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
              id: "installed-reliability"
              required: true
          evidence_fingerprint: "sha256:40ed97c759846395c856d0a94ba59e096714c9aa954c105a1c52157f4ad3bf97"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "prepublish"
                  description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                  id: "stable-candidate"
                  required: true
                -
                  check_ids:
                    - "release-notes"
                    - "prepublish"
                  description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                  id: "readable-complete-notes"
                  required: true
                -
                  check_ids:
                    - "installed-lifecycle"
                    - "published-upgrade"
                  description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                  id: "installed-reliability"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources:
                  - "docs/releases/v0.7.7.md"
                  - "scripts/lib/installed-migration-matrix.mjs"
                  - "scripts/generate/generate-website-docs.mjs"
                required_sources:
                  - "docs/developer/release-and-publishing.mdx"
                  - "docs/releases/TEMPLATE.md"
                  - "scripts/release/version-surfaces.json"
                  - "scripts/release/version-bump.mjs"
                  - "scripts/lib/qualification-packed-runtime.mjs"
                  - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/policy/workflow.upgrade.md"
                  - "scripts/generate/generate-readme-header.mjs"
                  - "website/scripts/generate-social-images.mjs"
                  - "scripts/bench/capture-compatibility-candidate.mjs"
                  - "packages/agentplane/src/cli/route-decision.testkit.ts"
                  - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/testkit/src/release.ts"
                  - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  - "scripts/checks/check-clone-baseline.mjs"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  - "packages/testkit/src/cli-harness.ts"
                  - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                  - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                  - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                  - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                symbol_hints:
                  - "installPublishedAgentplane"
                  - "installPackedWorkspace"
                  - "runPackagedMixedScopeLifecycle"
              depends_on: []
              expected_outputs:
                - "Stable 0.7.8 release metadata and generated references"
                - "English release notes with two accessible opening paragraphs and all planned changes"
                - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                - "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
                - "Existing test support shares planning, release options and expected run-control formatting without behavior changes"
                - "Complete GitHub-compatible release notes below 125000 characters with both original opening paragraphs"
                - "Passing route and next-action regression fixtures under current canonical task contracts"
                - "Passing recovery fixtures for complete creation identity, required Verify Steps and exact post-verification replay"
                - "Passing mandatory CLI fixtures and current help snapshots with a complete baseline-to-candidate qualification report"
                - "Runtime regressions pass for dependency materialization, planning-base recovery, task dependency waits and backend tracing"
              id: "prepare-qualified-078-candidate"
              objective: "Restore the exact preserved CLI fixture draft from complete-cli-fixture-drafts.json. Fix four narrow diagnosed runtime defects in the five named source/test paths: preserve usable package dependencies when a foreign root install cannot be reused; distinguish untouched approved WorkItems from started execution during planning-base recovery; keep incomplete task prerequisites blocking approved task-centric execution; and reuse the measured backend task reader in TaskExecutionContext. Keep the external-root install refusal and every recovery identity, token, git, lease, effect, runner and WorkItem guard. Extend the existing install-layout and CLI tests for these behaviors. Do not suppress failures, change release acceptance, skip checks, alter clone limits, add dependencies or expand publication authority. Run focused tests, static checks and the unchanged native full release qualification."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: ".agentplane/WORKFLOW.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/recipes/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/recipes/src/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/examples/acr.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/releases/v0.7.8.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/generated-reference.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/llms-full.txt"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/releases/v0.7.8-evidence"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/assets/header.svg"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/assets/readme-headers"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/docs/releases"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/manifest.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/route-decision.testkit.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/task-continuity.testkit.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src/release.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src/cli-harness.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              risk: "high"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - "packages/agentplane/package.json"
                - "packages/core/package.json"
                - "packages/recipes/package.json"
                - "packages/recipes/src/index.ts"
                - "packages/spec/examples/acr.json"
                - "packages/testkit/package.json"
                - "docs/releases/v0.7.8.md"
                - "docs/reference/generated-reference.mdx"
                - "website/static/llms-full.txt"
                - "docs/releases/v0.7.8-evidence"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "website/static/img/social/docs/releases"
                - "website/static/img/social/manifest.json"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "packages/agentplane/src/cli/route-decision.testkit.ts"
                - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/testkit/src/release.ts"
                - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
                - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                - "packages/testkit/src/cli-harness.ts"
                - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run qualification:mixed-scope-lifecycle"
                    id: "installed-lifecycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                    id: "published-upgrade"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                    id: "release-notes"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                evidence_fingerprint: "sha256:40ed97c759846395c856d0a94ba59e096714c9aa954c105a1c52157f4ad3bf97"
                schema_version: 1
      revision: 11
      schema_version: 1
      task_id: "202609061750-Z0XXVD"
    event_cursor: 39
    final_validation: null
    id: "202609061750-Z0XXVD"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run qualification:mixed-scope-lifecycle"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run release:prepublish"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node .agentplane/tasks/202609061750-Z0XXVD/evidence/qualify-upgrade-0.7.7.mjs"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
          id: "legacy-4"
          required: true
      captured_at: "2026-09-06T17:50:14.084Z"
      constraints: []
      request: |-
        Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

        Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
      task_id: "202609061750-Z0XXVD"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-06T17:53:30.169Z"
        digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
          planning_baseline:
            captured_at: "2026-09-06T17:50:59.283Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:345943aa99961211ef7adfa39da7933b927fe8fd3725e296e77085c83ce66114"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "262da3130bc5628a7641c400c74368ae355000bf"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node .agentplane/tasks/202609061750-Z0XXVD/evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:345943aa99961211ef7adfa39da7933b927fe8fd3725e296e77085c83ce66114"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                id: "prepare-qualified-078-candidate"
                objective: "Prepare the user-approved stable 0.7.8 metadata, readable complete release notes, and reproducible installed upgrade qualification. Keep publication and formal lifecycle transitions at the subsequent native operator boundaries."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/tasks/202609061750-Z0XXVD/evidence"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - ".agentplane/tasks/202609061750-Z0XXVD/evidence"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/tasks/202609061750-Z0XXVD/evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:345943aa99961211ef7adfa39da7933b927fe8fd3725e296e77085c83ce66114"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-06T18:11:16.880Z"
        digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Restore the preserved relocation-drafts.json from the original executor exchange after the revised authority is issued. Move only the four authored evidence files to docs/releases/v0.7.8-evidence and use ../../../scripts/lib/qualification-packed-runtime.mjs plus ../../../ as the script root. Keep .agentplane/tasks entirely framework-owned. The original recorded result is retired and must not be rewritten or submitted as a new implementation."
          planning_baseline:
            captured_at: "2026-09-06T18:10:28.303Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:dfce891c043358fed029d2a05b375803c54f1301dc47505af76a03b7d2e7b1e6"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/diffstat.txt"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/github-body.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/github-title.txt"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/meta.json"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/review.md"
            git:
              kind: "commit"
              ref: null
              sha: "262da3130bc5628a7641c400c74368ae355000bf"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:10"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:dfce891c043358fed029d2a05b375803c54f1301dc47505af76a03b7d2e7b1e6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                id: "prepare-qualified-078-candidate"
                objective: "Prepare the user-approved stable 0.7.8 metadata, readable complete release notes, and reproducible installed upgrade qualification. Keep publication and formal lifecycle transitions at the subsequent native operator boundaries."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:dfce891c043358fed029d2a05b375803c54f1301dc47505af76a03b7d2e7b1e6"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: "2026-09-06T18:16:14.692Z"
          approved_by: "USER"
          approved_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T18:15:57.172Z"
        digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "The complete candidate is already committed as 529e290f25392071470a7f6f5b1a1d9646688504. Preserve it and the immutable previous result. No additional product mutation is needed if focused checks still pass. The new semantic result must describe the existing implementation honestly; AgentPlane retains responsibility for recording its identity and verification."
          planning_baseline:
            captured_at: "2026-09-06T18:15:00.786Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:26d3d64472fa8d1cfc95efa4b541dd5a78b6a77b34e443d58e1b7949d69cfd20"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/implementation-evidence.json"
            git:
              kind: "commit"
              ref: null
              sha: "529e290f25392071470a7f6f5b1a1d9646688504"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:16"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:26d3d64472fa8d1cfc95efa4b541dd5a78b6a77b34e443d58e1b7949d69cfd20"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                id: "prepare-qualified-078-candidate"
                objective: "Preserve and qualify the already committed 0.7.8 candidate 529e290f25392071470a7f6f5b1a1d9646688504. Its existing exported recipes version is an explicitly declared public_api effect. Check release notes and qualification artifacts, then return the semantic result for native verification without inventing another product edit."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:26d3d64472fa8d1cfc95efa4b541dd5a78b6a77b34e443d58e1b7949d69cfd20"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: "2026-09-06T18:20:14.031Z"
          approved_by: "USER"
          approved_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T18:19:59.972Z"
        digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
            - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
          planning_baseline:
            captured_at: "2026-09-06T18:18:54.996Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:2d335069aa846a4832467d166fa7f69e1330dc622c6e3aa839583b8f3aebb55a"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "010f7598eefd21ee5f19b9893485ed88cf0a7d3d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:20"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:2d335069aa846a4832467d166fa7f69e1330dc622c6e3aa839583b8f3aebb55a"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                    - "scripts/generate/generate-readme-header.mjs"
                    - "website/scripts/generate-social-images.mjs"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                  - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                id: "prepare-qualified-078-candidate"
                objective: "Preserve the committed 0.7.8 metadata, readable complete release notes and installed upgrade script. Complete release preparation by refreshing the fourteen versioned README SVG headers, two required release-page social images and their manifest with existing generators. Run focused freshness checks and return the result for unchanged native release qualification."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/header.svg"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/readme-headers"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                  - "docs/assets/header.svg"
                  - "docs/assets/readme-headers"
                  - "website/static/img/social/docs/releases"
                  - "website/static/img/social/manifest.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:2d335069aa846a4832467d166fa7f69e1330dc622c6e3aa839583b8f3aebb55a"
                  schema_version: 1
        revision: 4
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-06T18:28:33.671Z"
        digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
            - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
            - "Run node scripts/bench/capture-compatibility-candidate.mjs --write. The inspected preview changes only release_version_delta.to_version, surface_sha256 and to_sha256. Do not edit baseline allowances or generator logic."
          planning_baseline:
            captured_at: "2026-09-06T18:27:43.079Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:78a619418b657299b77d1dde68352ccf1d1772c6758ea33a9a7eb89ef941d8e2"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            git:
              kind: "commit"
              ref: null
              sha: "7d0fdb43f4bdf339783509a30ee77b57be9da9e8"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:26"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:78a619418b657299b77d1dde68352ccf1d1772c6758ea33a9a7eb89ef941d8e2"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                    - "scripts/generate/generate-readme-header.mjs"
                    - "website/scripts/generate-social-images.mjs"
                    - "scripts/bench/capture-compatibility-candidate.mjs"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                  - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                  - "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
                id: "prepare-qualified-078-candidate"
                objective: "Preserve all committed stable 0.7.8 metadata, readable complete notes, qualification script, versioned headers and social images. Refresh only the generated compatibility candidate release version and two derived hashes using the existing generator. Verify compatibility freshness and contract before returning the result for unchanged native release qualification."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/header.svg"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/readme-headers"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                  - "docs/assets/header.svg"
                  - "docs/assets/readme-headers"
                  - "website/static/img/social/docs/releases"
                  - "website/static/img/social/manifest.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:78a619418b657299b77d1dde68352ccf1d1772c6758ea33a9a7eb89ef941d8e2"
                  schema_version: 1
        revision: 5
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: "2026-09-06T18:39:48.714Z"
          approved_by: "USER"
          approved_digest: "sha256:2ef473b70600bd2c32e2a53d163cb64cb2b5affa14c5582e7788e373e92460df"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T18:39:22.344Z"
        digest: "sha256:2ef473b70600bd2c32e2a53d163cb64cb2b5affa14c5582e7788e373e92460df"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
            - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
            - "Run node scripts/bench/capture-compatibility-candidate.mjs --write. The inspected preview changes only release_version_delta.to_version, surface_sha256 and to_sha256. Do not edit baseline allowances or generator logic."
            - "Keep the existing clone baseline thresholds and file inclusion rules unchanged. Reuse the existing continuity planner with its explicit approval parameter. Extract a shared fixture proposal constructor only because both continuity and recovery need it. Preserve fixture-specific identifiers, acceptance and task verification commands. Do not introduce shared testing infrastructure or dependencies."
            - "The local ci:local:full regression suite and static ci:contract are distinct checks. The former baseline passed; clone:check in the latter fails on unchanged main as well as the release candidate. Claim only observed checks."
            - "The GitHub release body limit is 125000 characters, evidenced by github.com/cli/cli/issues/7815. Preserve the entire main release narrative before Detailed Change Record. Shorten repetitive record descriptions and use unique ten-character commit IDs linked through the immutable full-SHA JSON source list. Verify exact one-to-one mapping, no dropped entries and a margin below the limit."
            - "Run the nearest existing route-decision, task-continuity, workflow effect recovery, release and task-run query tests for the affected helpers, plus testkit and CLI type checks. Use the unchanged clone guard after edits. Delete only its own generated report after preserving failure evidence when required."
          planning_baseline:
            captured_at: "2026-09-06T18:38:08.223Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:d273eddd6c208705308ea25ec791ce4e989f384c05657ed8b5ee28cbcc2bc82d"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            git:
              kind: "commit"
              ref: null
              sha: "c7394f218f3e57dd1a48b295dd7c49319b8d704d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:33"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:d273eddd6c208705308ea25ec791ce4e989f384c05657ed8b5ee28cbcc2bc82d"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                    - "scripts/generate/generate-readme-header.mjs"
                    - "website/scripts/generate-social-images.mjs"
                    - "scripts/bench/capture-compatibility-candidate.mjs"
                    - "packages/agentplane/src/cli/route-decision.testkit.ts"
                    - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                    - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                    - "packages/testkit/src/release.ts"
                    - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                    - "scripts/checks/check-clone-baseline.mjs"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                  - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                  - "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
                  - "Existing test support shares planning, release options and expected run-control formatting without behavior changes"
                  - "Complete GitHub-compatible release notes below 125000 characters with both original opening paragraphs"
                id: "prepare-qualified-078-candidate"
                objective: "Preserve the prepared stable 0.7.8 candidate. Remove the observed clone-gate blocker by reusing existing test planning helpers, release fixture option types and expected run-control output formatting in the five named test-support files. Preserve the tested task and CLI contracts. Compact only the detailed Release Notes record to fewer than 125000 characters, retaining both opening paragraphs verbatim and all 1417 uniquely mapped commit entries. Run nearest existing tests, type checks, unchanged clone guard and release-note checks before returning the result for native qualification."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/header.svg"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/readme-headers"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/route-decision.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/release.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                  - "docs/assets/header.svg"
                  - "docs/assets/readme-headers"
                  - "website/static/img/social/docs/releases"
                  - "website/static/img/social/manifest.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "packages/agentplane/src/cli/route-decision.testkit.ts"
                  - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/testkit/src/release.ts"
                  - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:d273eddd6c208705308ea25ec791ce4e989f384c05657ed8b5ee28cbcc2bc82d"
                  schema_version: 1
        revision: 6
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: "2026-09-06T18:48:55.325Z"
          approved_by: "USER"
          approved_digest: "sha256:ebdcea837a530b5ed8b4493983639678ac70df14d583e65e939943c1fbb14b65"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T18:48:30.953Z"
        digest: "sha256:ebdcea837a530b5ed8b4493983639678ac70df14d583e65e939943c1fbb14b65"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
            - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
            - "Run node scripts/bench/capture-compatibility-candidate.mjs --write. The inspected preview changes only release_version_delta.to_version, surface_sha256 and to_sha256. Do not edit baseline allowances or generator logic."
            - "Keep the existing clone baseline thresholds and file inclusion rules unchanged. Reuse the existing continuity planner with its explicit approval parameter. Extract a shared fixture proposal constructor only because both continuity and recovery need it. Preserve fixture-specific identifiers, acceptance and task verification commands. Do not introduce shared testing infrastructure or dependencies."
            - "The local ci:local:full regression suite and static ci:contract are distinct checks. The former baseline passed; clone:check in the latter fails on unchanged main as well as the release candidate. Claim only observed checks."
            - "The GitHub release body limit is 125000 characters, evidenced by github.com/cli/cli/issues/7815. Preserve the entire main release narrative before Detailed Change Record. Shorten repetitive record descriptions and use unique ten-character commit IDs linked through the immutable full-SHA JSON source list. Verify exact one-to-one mapping, no dropped entries and a margin below the limit."
            - "Run the nearest existing route-decision, task-continuity, workflow effect recovery, release and task-run query tests for the affected helpers, plus testkit and CLI type checks. Use the unchanged clone guard after edits. Delete only its own generated report after preserving failure evidence when required."
            - "The exact six-file draft is saved as .git/agentplane/external-agent/202609061750-Z0XXVD/clone-and-notes-drafts.json in the primary checkout. Restore only those named authorized files after receiving the new EXECUTOR packet. No draft changes were left outside the issued baseline."
            - "Inspect and preserve the behavioral purpose of each failing regression. Replace obsolete fixture plan/verification setup with existing native test helpers. An approved canonical plan may project DOING before branch start. Passing verification and closure must be represented in canonical Task state and bound to the tested implementation. Do not change assertions merely to accept an unexplained route."
            - "Do not broaden into runtime refactors, provider expansion, unrelated tasks or test removal. Any product defect or additional required path needs a fresh bounded refinement."
          planning_baseline:
            captured_at: "2026-09-06T18:47:35.607Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:5a66a1351248a06014e8cf47d3395ff1e60ae234993fb3d9326bd34e2cdb107d"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            git:
              kind: "commit"
              ref: null
              sha: "c7394f218f3e57dd1a48b295dd7c49319b8d704d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:36"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:5a66a1351248a06014e8cf47d3395ff1e60ae234993fb3d9326bd34e2cdb107d"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                    - "scripts/generate/generate-readme-header.mjs"
                    - "website/scripts/generate-social-images.mjs"
                    - "scripts/bench/capture-compatibility-candidate.mjs"
                    - "packages/agentplane/src/cli/route-decision.testkit.ts"
                    - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                    - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                    - "packages/testkit/src/release.ts"
                    - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                    - "scripts/checks/check-clone-baseline.mjs"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                  - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                  - "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
                  - "Existing test support shares planning, release options and expected run-control formatting without behavior changes"
                  - "Complete GitHub-compatible release notes below 125000 characters with both original opening paragraphs"
                  - "Passing route and next-action regression fixtures under current canonical task contracts"
                id: "prepare-qualified-078-candidate"
                objective: "Restore the preserved six-file draft for shared test support and compact Release Notes. Repair the 13 reproduced failures in the five named route and next-action test files by establishing current canonical plan, Verify Steps, verification and closure evidence, and updating stale projected-status expectations. Preserve each tested routing scenario and every product guard. Run all affected tests, unchanged clone and release-note checks, and type checks. Return the completed candidate for unchanged native release qualification."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/header.svg"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/readme-headers"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/route-decision.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/release.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                  - "docs/assets/header.svg"
                  - "docs/assets/readme-headers"
                  - "website/static/img/social/docs/releases"
                  - "website/static/img/social/manifest.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "packages/agentplane/src/cli/route-decision.testkit.ts"
                  - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/testkit/src/release.ts"
                  - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:5a66a1351248a06014e8cf47d3395ff1e60ae234993fb3d9326bd34e2cdb107d"
                  schema_version: 1
        revision: 7
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: "2026-09-06T19:18:21.438Z"
          approved_by: "USER"
          approved_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T19:18:04.080Z"
        digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
            - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
            - "Run node scripts/bench/capture-compatibility-candidate.mjs --write. The inspected preview changes only release_version_delta.to_version, surface_sha256 and to_sha256. Do not edit baseline allowances or generator logic."
            - "Keep the existing clone baseline thresholds and file inclusion rules unchanged. Reuse the existing continuity planner with its explicit approval parameter. Extract a shared fixture proposal constructor only because both continuity and recovery need it. Preserve fixture-specific identifiers, acceptance and task verification commands. Do not introduce shared testing infrastructure or dependencies."
            - "The local ci:local:full regression suite and static ci:contract are distinct checks. The former baseline passed; clone:check in the latter fails on unchanged main as well as the release candidate. Claim only observed checks."
            - "The GitHub release body limit is 125000 characters, evidenced by github.com/cli/cli/issues/7815. Preserve the entire main release narrative before Detailed Change Record. Shorten repetitive record descriptions and use unique ten-character commit IDs linked through the immutable full-SHA JSON source list. Verify exact one-to-one mapping, no dropped entries and a margin below the limit."
            - "Run the nearest existing route-decision, task-continuity, workflow effect recovery, release and task-run query tests for the affected helpers, plus testkit and CLI type checks. Use the unchanged clone guard after edits. Delete only its own generated report after preserving failure evidence when required."
            - "The exact six-file draft is saved as .git/agentplane/external-agent/202609061750-Z0XXVD/clone-and-notes-drafts.json in the primary checkout. Restore only those named authorized files after receiving the new EXECUTOR packet. No draft changes were left outside the issued baseline."
            - "Inspect and preserve the behavioral purpose of each failing regression. Replace obsolete fixture plan/verification setup with existing native test helpers. An approved canonical plan may project DOING before branch start. Passing verification and closure must be represented in canonical Task state and bound to the tested implementation. Do not change assertions merely to accept an unexplained route."
            - "Do not broaden into runtime refactors, provider expansion, unrelated tasks or test removal. Any product defect or additional required path needs a fresh bounded refinement."
          planning_baseline:
            captured_at: "2026-09-06T19:16:55.313Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:2eb30d004a70268fb51e2d547320bd5ce361811b13deb54e0e205308002178eb"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            git:
              kind: "commit"
              ref: null
              sha: "c7394f218f3e57dd1a48b295dd7c49319b8d704d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:39"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:2eb30d004a70268fb51e2d547320bd5ce361811b13deb54e0e205308002178eb"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                    - "scripts/generate/generate-readme-header.mjs"
                    - "website/scripts/generate-social-images.mjs"
                    - "scripts/bench/capture-compatibility-candidate.mjs"
                    - "packages/agentplane/src/cli/route-decision.testkit.ts"
                    - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                    - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                    - "packages/testkit/src/release.ts"
                    - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                    - "scripts/checks/check-clone-baseline.mjs"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                  - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                  - "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
                  - "Existing test support shares planning, release options and expected run-control formatting without behavior changes"
                  - "Complete GitHub-compatible release notes below 125000 characters with both original opening paragraphs"
                  - "Passing route and next-action regression fixtures under current canonical task contracts"
                  - "Passing recovery fixtures for complete creation identity, required Verify Steps and exact post-verification replay"
                id: "prepare-qualified-078-candidate"
                objective: "Restore the preserved eleven-file draft from clone-route-and-notes-drafts.json. Repair the two named recovery test fixtures: establish required Verify Steps before evaluator-plan approval; preserve the complete creation identity including source; and assert successful exact-proof continuation after completed verification instead of obsolete stale rejection. Preserve proof bytes, WorkItem results, semantic claims, original exchanges and idempotent replay. Keep all existing route repairs and product guards. Run both recovery suites and relevant existing checks, then return the completed candidate for unchanged native release qualification."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/header.svg"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/readme-headers"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/route-decision.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/release.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                  - "docs/assets/header.svg"
                  - "docs/assets/readme-headers"
                  - "website/static/img/social/docs/releases"
                  - "website/static/img/social/manifest.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "packages/agentplane/src/cli/route-decision.testkit.ts"
                  - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/testkit/src/release.ts"
                  - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:2eb30d004a70268fb51e2d547320bd5ce361811b13deb54e0e205308002178eb"
                  schema_version: 1
        revision: 8
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: "2026-09-06T20:33:04.723Z"
          approved_by: "USER"
          approved_digest: "sha256:ffbf1293eaa7134b994981ac3a6d10461184a4a63d557541847af8a8e532a57a"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T20:32:32.299Z"
        digest: "sha256:ffbf1293eaa7134b994981ac3a6d10461184a4a63d557541847af8a8e532a57a"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
            - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
            - "Run node scripts/bench/capture-compatibility-candidate.mjs --write. The inspected preview changes only release_version_delta.to_version, surface_sha256 and to_sha256. Do not edit baseline allowances or generator logic."
            - "Keep the existing clone baseline thresholds and file inclusion rules unchanged. Reuse the existing continuity planner with its explicit approval parameter. Extract a shared fixture proposal constructor only because both continuity and recovery need it. Preserve fixture-specific identifiers, acceptance and task verification commands. Do not introduce shared testing infrastructure or dependencies."
            - "The local ci:local:full regression suite and static ci:contract are distinct checks. The former baseline passed; clone:check in the latter fails on unchanged main as well as the release candidate. Claim only observed checks."
            - "The GitHub release body limit is 125000 characters, evidenced by github.com/cli/cli/issues/7815. Preserve the entire main release narrative before Detailed Change Record. Shorten repetitive record descriptions and use unique ten-character commit IDs linked through the immutable full-SHA JSON source list. Verify exact one-to-one mapping, no dropped entries and a margin below the limit."
            - "Run the nearest existing route-decision, task-continuity, workflow effect recovery, release and task-run query tests for the affected helpers, plus testkit and CLI type checks. Use the unchanged clone guard after edits. Delete only its own generated report after preserving failure evidence when required."
            - "Inspect and preserve the behavioral purpose of each failing regression. Replace obsolete fixture plan/verification setup with existing native test helpers. An approved canonical plan may project DOING before branch start. Passing verification and closure must be represented in canonical Task state and bound to the tested implementation. Do not change assertions merely to accept an unexplained route."
            - "Do not broaden into runtime refactors, provider expansion, unrelated tasks or test removal. Any product defect or additional required path needs a fresh bounded refinement."
            - "All previous drafts are already committed at the issued b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0 baseline. Do not restore older draft files over these repairs."
            - "Native release CI groups 1-8 passed. Group 9 readiness failed. A canonical-configuration supplemental audit of groups 10-113 passed 5309 tests and failed 85 tests, with one existing skip. All 86 failures across 25 CLI files reproduce on unchanged main. This audit identifies repair scope and does not replace the unchanged native release gate."
            - "Diagnose the fresh-worktree dependency bootstrap case. If production code is defective, request a separate exact refinement before editing that code. Do not weaken the runtime usability assertion to make the test pass."
          planning_baseline:
            captured_at: "2026-09-06T20:31:40.819Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:41c8f182692ed9cf55338cb927614369c7aae761875fc2fb7ca7d3b0f8c3511a"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            git:
              kind: "commit"
              ref: null
              sha: "b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:54"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:41c8f182692ed9cf55338cb927614369c7aae761875fc2fb7ca7d3b0f8c3511a"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                    - "scripts/generate/generate-readme-header.mjs"
                    - "website/scripts/generate-social-images.mjs"
                    - "scripts/bench/capture-compatibility-candidate.mjs"
                    - "packages/agentplane/src/cli/route-decision.testkit.ts"
                    - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                    - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                    - "packages/testkit/src/release.ts"
                    - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                    - "scripts/checks/check-clone-baseline.mjs"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                    - "packages/testkit/src/cli-harness.ts"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                  - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                  - "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
                  - "Existing test support shares planning, release options and expected run-control formatting without behavior changes"
                  - "Complete GitHub-compatible release notes below 125000 characters with both original opening paragraphs"
                  - "Passing route and next-action regression fixtures under current canonical task contracts"
                  - "Passing recovery fixtures for complete creation identity, required Verify Steps and exact post-verification replay"
                  - "Passing mandatory CLI fixtures and current help snapshots with a complete baseline-to-candidate qualification report"
                id: "prepare-qualified-078-candidate"
                objective: "Retain the complete committed release candidate and all previous repairs. Repair the complete listed mandatory CLI baseline failure inventory with minimal fixture changes. Reuse existing testkit helpers for required Verify Steps, native plan approval, verification evidence and authoritative worktree preparation. Preserve the intended positive and negative behavior, exact identities, evidence, safety checks, isolation and all cases. Update only the two obsolete CLI help snapshots to current public commands. Diagnose the worktree runtime dependency failure without weakening runtime guarantees; report a further exact scope refinement if production repair is necessary. Record source-backed qualification evidence and run focused tests, type/format/clone guards, then the unchanged native release gates."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/header.svg"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/readme-headers"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/route-decision.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/release.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-harness.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                  - "docs/assets/header.svg"
                  - "docs/assets/readme-headers"
                  - "website/static/img/social/docs/releases"
                  - "website/static/img/social/manifest.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "packages/agentplane/src/cli/route-decision.testkit.ts"
                  - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/testkit/src/release.ts"
                  - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
                  - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                  - "packages/testkit/src/cli-harness.ts"
                  - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:41c8f182692ed9cf55338cb927614369c7aae761875fc2fb7ca7d3b0f8c3511a"
                  schema_version: 1
        revision: 9
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-06T20:49:46.697Z"
        digest: "sha256:7f304df3df2fb0b59fe49127e8cdf977152f4750d497911ea40679db77256f80"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
            - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
            - "Run node scripts/bench/capture-compatibility-candidate.mjs --write. The inspected preview changes only release_version_delta.to_version, surface_sha256 and to_sha256. Do not edit baseline allowances or generator logic."
            - "Keep the existing clone baseline thresholds and file inclusion rules unchanged. Reuse the existing continuity planner with its explicit approval parameter. Extract a shared fixture proposal constructor only because both continuity and recovery need it. Preserve fixture-specific identifiers, acceptance and task verification commands. Do not introduce shared testing infrastructure or dependencies."
            - "The local ci:local:full regression suite and static ci:contract are distinct checks. The former baseline passed; clone:check in the latter fails on unchanged main as well as the release candidate. Claim only observed checks."
            - "The GitHub release body limit is 125000 characters, evidenced by github.com/cli/cli/issues/7815. Preserve the entire main release narrative before Detailed Change Record. Shorten repetitive record descriptions and use unique ten-character commit IDs linked through the immutable full-SHA JSON source list. Verify exact one-to-one mapping, no dropped entries and a margin below the limit."
            - "Run the nearest existing route-decision, task-continuity, workflow effect recovery, release and task-run query tests for the affected helpers, plus testkit and CLI type checks. Use the unchanged clone guard after edits. Delete only its own generated report after preserving failure evidence when required."
            - "Inspect and preserve the behavioral purpose of each failing regression. Replace obsolete fixture plan/verification setup with existing native test helpers. An approved canonical plan may project DOING before branch start. Passing verification and closure must be represented in canonical Task state and bound to the tested implementation. Do not change assertions merely to accept an unexplained route."
            - "All previous drafts are already committed at the issued b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0 baseline. Do not restore older draft files over these repairs."
            - "Native release CI groups 1-8 passed. Group 9 readiness failed. A canonical-configuration supplemental audit of groups 10-113 passed 5309 tests and failed 85 tests, with one existing skip. All 86 failures across 25 CLI files reproduce on unchanged main. This audit identifies repair scope and does not replace the unchanged native release gate."
            - "Restore only the 25 preserved files from complete-cli-fixture-drafts.json. They are the tested draft based on the current unchanged b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0 baseline."
            - "The four runtime defects now have concrete source-backed reproductions after fixture preconditions are established. The five added paths are the complete bounded correction surface. No unrelated runtime refactor is approved."
            - "Planning approval projects ACTIVE as DOING. Recovery eligibility must depend on actual untouched WorkItems, execution attempts, claims and receipts while retaining the existing provenance, token, Git, lease, runner and external-effect checks. Do not classify plan approval itself as implementation execution."
            - "Preserve the root node_modules ownership guard. Keep package-local dependencies usable when the active trusted runtime source is external to the fixture repository. Validate actual CLI invocation and negative foreign-root reuse tests."
            - "Task dependencies must block approved task-centric execution before WorkItem work starts. Preserve the legacy route behavior and normal continuation after dependencies complete."
            - "Use the existing measured backend reader for task context loading. Preserve lazy local routes with no provider preparation and the documented trace fields."
          planning_baseline:
            captured_at: "2026-09-06T20:49:07.805Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:0e1d3b007450c8397e564e99a2383b5e65cd8b505845712fb77a4699c3985177"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            git:
              kind: "commit"
              ref: null
              sha: "b7d06ffe4cdce990df62aa244ea6a8bce7bd1ff0"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:57"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:0e1d3b007450c8397e564e99a2383b5e65cd8b505845712fb77a4699c3985177"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                    - "scripts/generate/generate-readme-header.mjs"
                    - "website/scripts/generate-social-images.mjs"
                    - "scripts/bench/capture-compatibility-candidate.mjs"
                    - "packages/agentplane/src/cli/route-decision.testkit.ts"
                    - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                    - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                    - "packages/testkit/src/release.ts"
                    - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                    - "scripts/checks/check-clone-baseline.mjs"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                    - "packages/testkit/src/cli-harness.ts"
                    - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                    - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                    - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                    - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                    - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                  - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
                  - "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
                  - "Existing test support shares planning, release options and expected run-control formatting without behavior changes"
                  - "Complete GitHub-compatible release notes below 125000 characters with both original opening paragraphs"
                  - "Passing route and next-action regression fixtures under current canonical task contracts"
                  - "Passing recovery fixtures for complete creation identity, required Verify Steps and exact post-verification replay"
                  - "Passing mandatory CLI fixtures and current help snapshots with a complete baseline-to-candidate qualification report"
                  - "Passing runtime regression coverage for isolated dependency materialization, unstarted approved planning-base recovery, task dependency waits and backend preparation tracing"
                id: "prepare-qualified-078-candidate"
                objective: "Restore the exact preserved CLI fixture draft from complete-cli-fixture-drafts.json. Fix four narrow diagnosed runtime defects in the five named source/test paths: preserve usable package dependencies when a foreign root install cannot be reused; distinguish untouched approved WorkItems from started execution during planning-base recovery; keep incomplete task prerequisites blocking approved task-centric execution; and reuse the measured backend task reader in TaskExecutionContext. Keep the external-root install refusal and every recovery identity, token, git, lease, effect, runner and WorkItem guard. Extend the existing install-layout and CLI tests for these behaviors. Do not suppress failures, change release acceptance, skip checks, alter clone limits, add dependencies or expand publication authority. Run focused tests, static checks and the unchanged native full release qualification."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/header.svg"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets/readme-headers"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/route-decision.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/release.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-harness.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                  - "docs/assets/header.svg"
                  - "docs/assets/readme-headers"
                  - "website/static/img/social/docs/releases"
                  - "website/static/img/social/manifest.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "packages/agentplane/src/cli/route-decision.testkit.ts"
                  - "packages/agentplane/src/cli/task-continuity.testkit.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/testkit/src/release.ts"
                  - "packages/testkit/src/cli-core-tasks-query.expected-run.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.command-session.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-rebase-race.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
                  - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
                  - "packages/testkit/src/cli-harness.ts"
                  - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
                  - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                  - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                  - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                  - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:0e1d3b007450c8397e564e99a2383b5e65cd8b505845712fb77a4699c3985177"
                  schema_version: 1
        revision: 10
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
    revision: 65
    schema_version: 1
    updated_at: "2026-09-06T21:05:07.116Z"
    work_items:
      prepare-qualified-078-candidate:
        attempt: 1
        claim_id: null
        id: "prepare-qualified-078-candidate"
        last_failure:
          cause_refs:
            - "stable-candidate"
            - "readable-complete-notes"
            - "installed-reliability"
          code: "validation_failed"
          kind: "validation"
          message: "Repair the mandatory CLI fixtures and four bounded runtime regressions for the stable 0.7.8 candidate."
          retryable: true
        output_manifests:
          -
            digest: "sha256:16404692e3c6c659a5092f6a9503198928344c93ac7db28842338fcbd85231e8"
            id: "Stable 0.7.8 release metadata and generated references"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:a4aa07a0a7b00017f0a0efccbdead477d6a9be8b8e535e2c86a919d1d6db264d"
            id: "English release notes with two accessible opening paragraphs and all planned changes"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:b47bc03043b4a5977ccb7a0d761573d7cb9770400617cd065dc71c7d617a3d98"
            id: "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:2016beeb9a8d6642af4de397ce33a3ef103a4e31717fe34333c005190964520c"
            id: "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:bedc26a5b58f803c874a2b69eb4e5db15ea3e18d24180bdf4b72d75047111e87"
            id: "Current generated compatibility candidate snapshot for stable 0.7.8 with unchanged compatibility allowances"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:b6da823398eda25820cc066e9f2d2e171844212eb90574af9363ede1670c19d4"
            id: "Existing test support shares planning, release options and expected run-control formatting without behavior changes"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:d0f9206bd0f7b43d0e6af743f4d5c09e844b31b487fe5df12dcfff3ca5b82a04"
            id: "Complete GitHub-compatible release notes below 125000 characters with both original opening paragraphs"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:15c4e392c544f552c656dd957be80fc7afe29d23f87b6d2f287fac0efe15bc6c"
            id: "Passing route and next-action regression fixtures under current canonical task contracts"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:b0b29cbffa33f6d7a562e4fe19c93ba9d300a9ba05b46c71a6d6055cd6ca7d35"
            id: "Passing recovery fixtures for complete creation identity, required Verify Steps and exact post-verification replay"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:775021e497f5abe75973f5b451dc60dac22716c388dbd7a5b99b294b1132a6fb"
            id: "Passing mandatory CLI fixtures and current help snapshots with a complete baseline-to-candidate qualification report"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:71062fa7f0b5602f57a56607be5b650f21e00e4d3b5a4812853942f5589c3f9d"
            id: "Runtime regressions pass for dependency materialization, planning-base recovery, task dependency waits and backend tracing"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202609061750-Z0XXVD"
              work_item_id: "prepare-qualified-078-candidate"
            provenance:
              - "sha256:c6f4d9e00cc7e98b5de81ba5416349982a20608476e331ffd59a0cb8f5abad0c"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
              check_id: "prepublish"
              command_identity: "bun run release:prepublish"
              detail: "Declared check failed: bun run release:prepublish"
              exit_code: 1
              observed_at: "2026-09-06T21:05:07.085Z"
              repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
              status: "failed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
              check_id: "installed-lifecycle"
              command_identity: "bun run qualification:mixed-scope-lifecycle"
              detail: "Declared validation command bun run qualification:mixed-scope-lifecycle was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-09-06T21:05:07.085Z"
              repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
              status: "unsupported"
            -
              artifact_refs:
                - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
              check_id: "published-upgrade"
              command_identity: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
              detail: "Declared validation command node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-09-06T21:05:07.085Z"
              repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
              status: "unsupported"
            -
              artifact_refs:
                - ".agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json"
              check_id: "release-notes"
              command_identity: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
              detail: "Declared validation command node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417 was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-09-06T21:05:07.085Z"
              repository_snapshot_digest: "sha256:be97bebc41b9cce4e9762c8b4e50c8a6ec07a6eaa90447f6ae3b52039968f54d"
              status: "unsupported"
          schema_version: 1
          stale_evidence: []
          status: "blocked"
          unsatisfied_criteria:
            - "stable-candidate"
            - "readable-complete-notes"
            - "installed-reliability"
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-06T18:08:37.133Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "ORCHESTRATOR"
        cause_refs:
          - "plan:sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          - "note:sha256:304cb946a533f0408dd393933bb95e943b36b110e700e7b75b08471167ca79c2"
        entity: "task"
        id: "event_29817e2f2bfe97adcc4714ac"
        mutation_id: "plan-reject-cd47d1eb9548784ab5638e357de58871"
        plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 6
        work_item_id: null
      -
        at: "2026-09-06T18:14:53.037Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "ORCHESTRATOR"
        cause_refs:
          - "plan:sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          - "note:sha256:2ed70fe3d8063c8b5b9f3f16e3398b596078310f7ec558e9399e9fcff23209ae"
        entity: "task"
        id: "event_2041baa5f5f91c6260fd83ae"
        mutation_id: "plan-reject-571b1f92492d0423993820e92b607dd2"
        plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 14
        work_item_id: null
      -
        at: "2026-09-06T18:18:53.456Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_4a7740b9ca7dc02918e6374d"
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15"
        plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 19
        work_item_id: null
      -
        at: "2026-09-06T18:26:02.088Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_fb0ae3c544ccbe017e2aeaca"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-37b8a0797519841bcf1ac38a"
        plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
        plan_revision: 4
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 24
        work_item_id: "prepare-qualified-078-candidate"
      -
        at: "2026-09-06T18:27:41.589Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_abef10b3636fc3ce62e2c099"
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-c911d996434ad06fb912a3d9"
        plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
        plan_revision: 4
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 25
        work_item_id: null
      -
        at: "2026-09-06T18:32:53.420Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_8130dffe5757e59550eed54b"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-0fc481657b38f844c8c5dd58"
        plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 30
        work_item_id: "prepare-qualified-078-candidate"
      -
        at: "2026-09-06T18:37:13.947Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "REVIEWER"
        cause_refs:
          - "plan:sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
          - "note:sha256:a3fd1e93a111a5ddb715fc30e299c77120f15a446ce9949d71386cd03b426cb6"
        entity: "task"
        id: "event_f4503b9d1efe739e29b7e000"
        mutation_id: "plan-reject-acd0c51dae8ead099d88f973f73c35f4"
        plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 31
        work_item_id: null
      -
        at: "2026-09-06T18:47:34.085Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_27b828750e3cce205fef15fe"
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-93127a655963edd72f9461fc"
        plan_digest: "sha256:2ef473b70600bd2c32e2a53d163cb64cb2b5affa14c5582e7788e373e92460df"
        plan_revision: 6
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 35
        work_item_id: null
      -
        at: "2026-09-06T19:16:53.737Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_72404c828665f8ab2bb7d28d"
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-54cc6de48a1743370724a628"
        plan_digest: "sha256:ebdcea837a530b5ed8b4493983639678ac70df14d583e65e939943c1fbb14b65"
        plan_revision: 7
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 38
        work_item_id: null
      -
        at: "2026-09-06T19:30:13.147Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_e965263aecc1e01ac4415277"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-81a9811ba63ed3feb589eb5c"
        plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
        plan_revision: 8
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 43
        work_item_id: "prepare-qualified-078-candidate"
      -
        at: "2026-09-06T19:35:53.738Z"
        from: "REWORK_READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_43368f37d060bb25bb31d27d"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-d7af3b7702c180e8aa9ef11b"
        plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
        plan_revision: 8
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 46
        work_item_id: "prepare-qualified-078-candidate"
      -
        at: "2026-09-06T19:51:46.454Z"
        from: "REWORK_READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_a3890625b2d4c2bd8285e818"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-89a27c26a3fd6b8dc7368d76"
        plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
        plan_revision: 8
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 49
        work_item_id: "prepare-qualified-078-candidate"
      -
        at: "2026-09-06T20:03:11.487Z"
        from: "REWORK_READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_5b9ac70d2ef97fb1150d3af5"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-0a92bd18ee1b8dbe98b403f8"
        plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
        plan_revision: 8
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 52
        work_item_id: "prepare-qualified-078-candidate"
      -
        at: "2026-09-06T20:31:39.164Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_fab5699db9911a966048ab96"
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-36c80f07144c15c26856b158"
        plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
        plan_revision: 8
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 53
        work_item_id: null
      -
        at: "2026-09-06T20:49:06.153Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
          - "risk_changed"
        entity: "task"
        id: "event_8951080321f42d581547166c"
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-d4024aa8d77a83eda3f6a48b"
        plan_digest: "sha256:ffbf1293eaa7134b994981ac3a6d10461184a4a63d557541847af8a8e532a57a"
        plan_revision: 9
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 56
        work_item_id: null
      -
        at: "2026-09-06T20:50:35.873Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "REVIEWER"
        cause_refs:
          - "plan:sha256:7f304df3df2fb0b59fe49127e8cdf977152f4750d497911ea40679db77256f80"
          - "note:sha256:f4851933786e2c47b01bddba99d32179e7b6d70c52042b4b75fefeb87d6e2c3b"
        entity: "task"
        id: "event_df9516327fb5f3ba3952c9cc"
        mutation_id: "plan-reject-b8a4d4f1278aa453cc9fcc48ef3e6df9"
        plan_digest: "sha256:7f304df3df2fb0b59fe49127e8cdf977152f4750d497911ea40679db77256f80"
        plan_revision: 10
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 59
        work_item_id: null
      -
        at: "2026-09-06T21:05:07.116Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_8fe748e0a109d39cb6cc0558"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-bb49f66e178f0faa76a8e495"
        plan_digest: "sha256:01d3d9dd6e984d40a6728c7f79fab07e6589f03f503c57d78a783cfff1e24dd8"
        plan_revision: 11
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 64
        work_item_id: "prepare-qualified-078-candidate"
    leases: []
    mutation_receipts:
      compatibility:sha256:022834da100df7fc3623c30cc816ea817bf10345a355f2f1c927d82e6bc91348:
        aggregate_digest: "sha256:087d8f51468b7d88d1618131d7f5e451b4f31d4e13fbf452ae4ff0c7b979ac6e"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:15:57.181Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_328d7ade2103df43a490082e"
          mutation_id: "compatibility:sha256:022834da100df7fc3623c30cc816ea817bf10345a355f2f1c927d82e6bc91348"
          plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:022834da100df7fc3623c30cc816ea817bf10345a355f2f1c927d82e6bc91348"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:21dbe2e164e9a57ad8f2bec838501f4083258d461f205ddb18bfc17383de6b8b:
        aggregate_digest: "sha256:7dbc56eecb04d5699237348dceb0588db90c7e4cfc326916b65138444f1d15ee"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:39:22.360Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_55f09ffdf4a96cde68add496"
          mutation_id: "compatibility:sha256:21dbe2e164e9a57ad8f2bec838501f4083258d461f205ddb18bfc17383de6b8b"
          plan_digest: "sha256:2ef473b70600bd2c32e2a53d163cb64cb2b5affa14c5582e7788e373e92460df"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 34
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:21dbe2e164e9a57ad8f2bec838501f4083258d461f205ddb18bfc17383de6b8b"
        next_revision: 35
        previous_revision: 34
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:268b0dce2e553b596de87bdfd8064ee679d1e88f5212daca8de42b6efc3e195e:
        aggregate_digest: "sha256:d7fedae939be0531765019c71c23e22eb3bf4537e1d57f9a06dbbb9682436b44"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:28:33.684Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8bc251647612430683430a65"
          mutation_id: "compatibility:sha256:268b0dce2e553b596de87bdfd8064ee679d1e88f5212daca8de42b6efc3e195e"
          plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 27
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:268b0dce2e553b596de87bdfd8064ee679d1e88f5212daca8de42b6efc3e195e"
        next_revision: 28
        previous_revision: 27
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:26957d78308fc4d631f1c2c981fdb44a6721ba551b6cea895f8bbc2e297cb617:
        aggregate_digest: "sha256:368002ec3ca10ac6bcbe50f3e66618c2b3649f11224ca10f92c046efa539e858"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:56:09.076Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ef46c9715b8c46f9b929e3c8"
          mutation_id: "compatibility:sha256:26957d78308fc4d631f1c2c981fdb44a6721ba551b6cea895f8bbc2e297cb617"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 50
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:26957d78308fc4d631f1c2c981fdb44a6721ba551b6cea895f8bbc2e297cb617"
        next_revision: 51
        previous_revision: 50
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:26f0fd85026bcefd781c4807eeb949178126b891cab698d31872c3ee2b562efd:
        aggregate_digest: "sha256:84598813318a3db5a8973bb6a0ff8713d258b96a9796a8460259737414fb54a6"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:49.426Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_8bc3e574ef8a9c337810fcac"
          mutation_id: "compatibility:sha256:26f0fd85026bcefd781c4807eeb949178126b891cab698d31872c3ee2b562efd"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 7
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:26f0fd85026bcefd781c4807eeb949178126b891cab698d31872c3ee2b562efd"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:2a019cadbfce221c8e4f00abe38da7e63f38d950d4650c216ab6f3a467677874:
        aggregate_digest: "sha256:22586032c7500b6f87e46a7b6568936cacfa12031b31da48f2eea01396fd0032"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:38:06.945Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_42f7c1a7b6fa6412159338ac"
          mutation_id: "compatibility:sha256:2a019cadbfce221c8e4f00abe38da7e63f38d950d4650c216ab6f3a467677874"
          plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 32
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:2a019cadbfce221c8e4f00abe38da7e63f38d950d4650c216ab6f3a467677874"
        next_revision: 33
        previous_revision: 32
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:2bd2d12f1ebfa3bedbd86b33f0be7ca73a09b3ce50290de3a6d46113c854d18b:
        aggregate_digest: "sha256:0eb23fc48b5c1e75e36d157328824ea85bb48b0d9111f11fedf964973f5c4089"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:45:08.368Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_48b53e3a9037d195ec8e13e0"
          mutation_id: "compatibility:sha256:2bd2d12f1ebfa3bedbd86b33f0be7ca73a09b3ce50290de3a6d46113c854d18b"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 47
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2bd2d12f1ebfa3bedbd86b33f0be7ca73a09b3ce50290de3a6d46113c854d18b"
        next_revision: 48
        previous_revision: 47
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:2f5b32ac9b779c53b20f163acb61c38257e413ca2ccdee778d0912ed4ddae8c8:
        aggregate_digest: "sha256:d5965f4d5fa95ef367b5977cfab55091930bc5c547bdee6a36a5df0d938b6663"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T21:04:15.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f09d33f5548161c13cce79e3"
          mutation_id: "compatibility:sha256:2f5b32ac9b779c53b20f163acb61c38257e413ca2ccdee778d0912ed4ddae8c8"
          plan_digest: "sha256:01d3d9dd6e984d40a6728c7f79fab07e6589f03f503c57d78a783cfff1e24dd8"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 63
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2f5b32ac9b779c53b20f163acb61c38257e413ca2ccdee778d0912ed4ddae8c8"
        next_revision: 64
        previous_revision: 63
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:38c1a368b397f18797dcfd4a0c15c09b1e8d686f22df7266d2bdbac12edc33f0:
        aggregate_digest: "sha256:581d5094b401d85b66d996cc84a74adac9699dd795eff3bd90f6c90b6a4a92ea"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:13:31.704Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8c265be062b65af9e44ca695"
          mutation_id: "compatibility:sha256:38c1a368b397f18797dcfd4a0c15c09b1e8d686f22df7266d2bdbac12edc33f0"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:38c1a368b397f18797dcfd4a0c15c09b1e8d686f22df7266d2bdbac12edc33f0"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:3a7d4e38747fb89a3ca23da8d1d7dfd5298e74458f0cadd1bfa99c009afb1957:
        aggregate_digest: "sha256:73200c6e25978743d9625d20b68a0e7cb759cceed5d7f1600a7ea95326cb6df9"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:10:27.211Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_8dc069cfb866d3ec6dda357a"
          mutation_id: "compatibility:sha256:3a7d4e38747fb89a3ca23da8d1d7dfd5298e74458f0cadd1bfa99c009afb1957"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 9
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:3a7d4e38747fb89a3ca23da8d1d7dfd5298e74458f0cadd1bfa99c009afb1957"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:418d0f37f37951919d308c49d62dc9a72bf66d90246b8e647da474400e8a0b93:
        aggregate_digest: "sha256:ec96f3030c94e34d8e96805fda934ef37d6880da403fcd2c3aaf7370954b991e"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:28:22.224Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_9b82af7dc60d9648b6bfea83"
          mutation_id: "compatibility:sha256:418d0f37f37951919d308c49d62dc9a72bf66d90246b8e647da474400e8a0b93"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 42
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:418d0f37f37951919d308c49d62dc9a72bf66d90246b8e647da474400e8a0b93"
        next_revision: 43
        previous_revision: 42
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:4a7016703350deb027057493768a8af161ce4ce1ee082371b2038d2fa0dfd3fd:
        aggregate_digest: "sha256:de203ec981ec90e17c912159968058ac3f2f65dfc13c89e8e544b8abfde47ce6"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T20:51:10.158Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_349f9f9b67f640504507499b"
          mutation_id: "compatibility:sha256:4a7016703350deb027057493768a8af161ce4ce1ee082371b2038d2fa0dfd3fd"
          plan_digest: "sha256:01d3d9dd6e984d40a6728c7f79fab07e6589f03f503c57d78a783cfff1e24dd8"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 61
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4a7016703350deb027057493768a8af161ce4ce1ee082371b2038d2fa0dfd3fd"
        next_revision: 62
        previous_revision: 61
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:4af655c42f73034172bda96e10b07765218b5c74eeb17548d80a4c946e4f5c16:
        aggregate_digest: "sha256:86e53c872bbc1be724675e68356dbd4a0a05826b387e84a7ce5b30380115111e"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:30:07.448Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3974bec451dbc0262d194148"
          mutation_id: "compatibility:sha256:4af655c42f73034172bda96e10b07765218b5c74eeb17548d80a4c946e4f5c16"
          plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 29
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4af655c42f73034172bda96e10b07765218b5c74eeb17548d80a4c946e4f5c16"
        next_revision: 30
        previous_revision: 29
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:516c520579e6992c41bb5423d3fa6f5aec55e87b35c37ac7e371337b4ae9d42d:
        aggregate_digest: "sha256:1d89f18bf5af60e3589e2c1aa9d5e75b19bb11c01b641231763605a10da25220"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:18:04.101Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9df4c7d94bd5c39d12515947"
          mutation_id: "compatibility:sha256:516c520579e6992c41bb5423d3fa6f5aec55e87b35c37ac7e371337b4ae9d42d"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 40
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:516c520579e6992c41bb5423d3fa6f5aec55e87b35c37ac7e371337b4ae9d42d"
        next_revision: 41
        previous_revision: 40
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:5a3a6c5e45f3bb85d6ae8f44300701014a86a20911b100533285f921128a94db:
        aggregate_digest: "sha256:c642d341d5a33d6df692f9ae6ac118d1d625a99c104553b76e2b96c2c56925db"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:19.415Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_bb36c79b88999f7871c777ba"
          mutation_id: "compatibility:sha256:5a3a6c5e45f3bb85d6ae8f44300701014a86a20911b100533285f921128a94db"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:5a3a6c5e45f3bb85d6ae8f44300701014a86a20911b100533285f921128a94db"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:799e3b7339d08d6b19b67cc357c43ae214094bdfcaf70d7f18d191b187dfa2bb:
        aggregate_digest: "sha256:c478ef3611f79c6c58b41df5820211fc99e6c06dac840bd310b7eca26dd6ae2a"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:16:29.069Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f04f60838b96bd1524d1abb8"
          mutation_id: "compatibility:sha256:799e3b7339d08d6b19b67cc357c43ae214094bdfcaf70d7f18d191b187dfa2bb"
          plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:799e3b7339d08d6b19b67cc357c43ae214094bdfcaf70d7f18d191b187dfa2bb"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:8be6b8ca800a1de129a9b4f2b61dcfab99999bd7f846e3c9913b108f327eb5c8:
        aggregate_digest: "sha256:75aeed7703a95f3a64e5bf98050b5a4c6a868f72f9d963c748e6962db1bf161f"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:14:53.426Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_145815ee4f90c9c4a1445f8f"
          mutation_id: "compatibility:sha256:8be6b8ca800a1de129a9b4f2b61dcfab99999bd7f846e3c9913b108f327eb5c8"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 15
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:8be6b8ca800a1de129a9b4f2b61dcfab99999bd7f846e3c9913b108f327eb5c8"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:8c135776af3f7f9b6d4d61c5866ea69f1e5deb94d9124976906ac01c29d4a132:
        aggregate_digest: "sha256:503ceda3bfa9eafc0f73d3e6af0aedd934236a9e9932e9f6436f35b507a3a91b"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:45:08.368Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_82b306c4e224c33b4b7779ca"
          mutation_id: "compatibility:sha256:8c135776af3f7f9b6d4d61c5866ea69f1e5deb94d9124976906ac01c29d4a132"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 48
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8c135776af3f7f9b6d4d61c5866ea69f1e5deb94d9124976906ac01c29d4a132"
        next_revision: 49
        previous_revision: 48
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:9305425996634948334473e85018df360db955b2638b2776e466a32f454164ec:
        aggregate_digest: "sha256:a230a41b45e5a27cfe6289e58020cbdc8ba7ea975f1d35a69aa03e301283926b"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:56:09.076Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7a4857219e6a6e4c7d24cf3f"
          mutation_id: "compatibility:sha256:9305425996634948334473e85018df360db955b2638b2776e466a32f454164ec"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 51
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9305425996634948334473e85018df360db955b2638b2776e466a32f454164ec"
        next_revision: 52
        previous_revision: 51
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:988ed6a2cc13cbc5be5b34a54996053d51e48c87752f80e987fb94059420e63e:
        aggregate_digest: "sha256:1e41d4cbfc155e923cc4b62a4851392a3e63b42359d34866636c53828dc327dc"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T20:49:46.724Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_dca96cdf6c3a4a3a9b14b7be"
          mutation_id: "compatibility:sha256:988ed6a2cc13cbc5be5b34a54996053d51e48c87752f80e987fb94059420e63e"
          plan_digest: "sha256:7f304df3df2fb0b59fe49127e8cdf977152f4750d497911ea40679db77256f80"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 58
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:988ed6a2cc13cbc5be5b34a54996053d51e48c87752f80e987fb94059420e63e"
        next_revision: 59
        previous_revision: 58
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:a6d7e4c9e442ea5fe493b9b59461a6760f210c674f4aab6c4649f6f61c053b3c:
        aggregate_digest: "sha256:71d94ac99ea51f48c0200b4ee1ae1957119ee73f656c9d426cf60c031368062e"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:25:15.275Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_92d897086254f634d8052e85"
          mutation_id: "compatibility:sha256:a6d7e4c9e442ea5fe493b9b59461a6760f210c674f4aab6c4649f6f61c053b3c"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 22
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a6d7e4c9e442ea5fe493b9b59461a6760f210c674f4aab6c4649f6f61c053b3c"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:a84e0ea99577d1eb1b4fd048f8bc25e466a7835581d6915a63d91052b3ada38e:
        aggregate_digest: "sha256:34b5d671782511a424d46af41f206aba29fa103e9f7aa9e24d7c75f8994fe572"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T21:04:15.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_92870518c7de14c73a0b43bf"
          mutation_id: "compatibility:sha256:a84e0ea99577d1eb1b4fd048f8bc25e466a7835581d6915a63d91052b3ada38e"
          plan_digest: "sha256:01d3d9dd6e984d40a6728c7f79fab07e6589f03f503c57d78a783cfff1e24dd8"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 62
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a84e0ea99577d1eb1b4fd048f8bc25e466a7835581d6915a63d91052b3ada38e"
        next_revision: 63
        previous_revision: 62
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:b7e389e2a3a4fb34ece00c7e2716efa2957fbd321a8dd8adf7d1867bbf20a8e9:
        aggregate_digest: "sha256:1c74719e1e02381880db5a7021b5a7d5866587351e3200a512434e0fba92bea1"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:49.426Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3280ea87e2af8333f5a6aaf2"
          mutation_id: "compatibility:sha256:b7e389e2a3a4fb34ece00c7e2716efa2957fbd321a8dd8adf7d1867bbf20a8e9"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b7e389e2a3a4fb34ece00c7e2716efa2957fbd321a8dd8adf7d1867bbf20a8e9"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:ca455350a9679e96fe52bbd23cd156e73a6c7e9979fc7ee0ea24fe5c5ba2a04f:
        aggregate_digest: "sha256:adee85b7557623c2128f37bc26dc0965ba8a157a4d066da269b234913ca4c51c"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:32:49.559Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_20c31337bc46daa3f043d76f"
          mutation_id: "compatibility:sha256:ca455350a9679e96fe52bbd23cd156e73a6c7e9979fc7ee0ea24fe5c5ba2a04f"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 45
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ca455350a9679e96fe52bbd23cd156e73a6c7e9979fc7ee0ea24fe5c5ba2a04f"
        next_revision: 46
        previous_revision: 45
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:ce6bbb72bc272c78502490ae2edde5f5e36bca56cb6116fbef6b7ba677af218e:
        aggregate_digest: "sha256:c756804e52aba1c3f5a61499f2e6a66ee738a65848f6b6fa5e67253264430a3a"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:30:07.448Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0cb42b2f1659dcfa97642cdc"
          mutation_id: "compatibility:sha256:ce6bbb72bc272c78502490ae2edde5f5e36bca56cb6116fbef6b7ba677af218e"
          plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 28
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ce6bbb72bc272c78502490ae2edde5f5e36bca56cb6116fbef6b7ba677af218e"
        next_revision: 29
        previous_revision: 28
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:d30fa027ed7856e7056d2598a86b1ccfc5c30fa868397a607d2774dff2e1daca:
        aggregate_digest: "sha256:0df693d0d2dafafae59c71f0961dc5c6b8dbfcd6bb4dc7b2b586b61fc9e19963"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:25:15.275Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_273fe2f5a73fd0dfe2aaef48"
          mutation_id: "compatibility:sha256:d30fa027ed7856e7056d2598a86b1ccfc5c30fa868397a607d2774dff2e1daca"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 23
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d30fa027ed7856e7056d2598a86b1ccfc5c30fa868397a607d2774dff2e1daca"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:d6922ff05cf38a0dba3530ebf94bb6f2f76c1b14c812fcdfd598c982da9b7bce:
        aggregate_digest: "sha256:56b525d8a8180e7bd604c0ab4d0dbff48b45b4ed98aa0ada452dd1c6b6f2d975"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:09:05.556Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_6595801c6728c06a36d1d704"
          mutation_id: "compatibility:sha256:d6922ff05cf38a0dba3530ebf94bb6f2f76c1b14c812fcdfd598c982da9b7bce"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 8
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:d6922ff05cf38a0dba3530ebf94bb6f2f76c1b14c812fcdfd598c982da9b7bce"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:d7a8e77502a13b0fe1fd28b00540d89d3e13f482e4c5bed8f56807a5037ed3b2:
        aggregate_digest: "sha256:17eb24098521f53d51816eaece08595ecf4022ff8ebdaa2b950c1075d3cf33eb"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T20:32:32.324Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_097fc9a5e68d744498626b99"
          mutation_id: "compatibility:sha256:d7a8e77502a13b0fe1fd28b00540d89d3e13f482e4c5bed8f56807a5037ed3b2"
          plan_digest: "sha256:ffbf1293eaa7134b994981ac3a6d10461184a4a63d557541847af8a8e532a57a"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 55
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d7a8e77502a13b0fe1fd28b00540d89d3e13f482e4c5bed8f56807a5037ed3b2"
        next_revision: 56
        previous_revision: 55
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:dfca504742a503e965fdf03ef3c604fb5d4acbe02eeeb5fda668bc1eacf50ace:
        aggregate_digest: "sha256:bc9fdd1528c19bfa09f90ed421dd9178dc782a77e0473115b68eeb3224b1d6b0"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:11:16.888Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c43f37ff0b9851123d3fae79"
          mutation_id: "compatibility:sha256:dfca504742a503e965fdf03ef3c604fb5d4acbe02eeeb5fda668bc1eacf50ace"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dfca504742a503e965fdf03ef3c604fb5d4acbe02eeeb5fda668bc1eacf50ace"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:e0e0cb34033033c7ab8d7189975c53ae57ad31b72025bb792b8033f93e1045b5:
        aggregate_digest: "sha256:42c801343d3f4fb0b6be1d8e42d7c50987b42e338a689c992d86035fecca2818"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:19.416Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8bdee5e301d25d90ffdab33e"
          mutation_id: "compatibility:sha256:e0e0cb34033033c7ab8d7189975c53ae57ad31b72025bb792b8033f93e1045b5"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e0e0cb34033033c7ab8d7189975c53ae57ad31b72025bb792b8033f93e1045b5"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:e337b254448112333dc3aa41df847a7208f6474fdd15a04de63b8dc01576d7db:
        aggregate_digest: "sha256:b12b8c74a5fa7c11e0e7069a8f608369656e8c7b3eaefa6477b74b94310352bd"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:19:59.982Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9a3711808d5c739abfe23a36"
          mutation_id: "compatibility:sha256:e337b254448112333dc3aa41df847a7208f6474fdd15a04de63b8dc01576d7db"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 21
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e337b254448112333dc3aa41df847a7208f6474fdd15a04de63b8dc01576d7db"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:e49f5a4c1140cbac5ef10c622e3f92a8ff7d3a69b7331dbcabc9a6d8fa671dde:
        aggregate_digest: "sha256:7bf077bc9b6b508c084e4c80e51bacf75d9e4417b25867705d7063416d731dd8"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:32:49.559Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0aa44cc7f58f3e6a2417cf87"
          mutation_id: "compatibility:sha256:e49f5a4c1140cbac5ef10c622e3f92a8ff7d3a69b7331dbcabc9a6d8fa671dde"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 44
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e49f5a4c1140cbac5ef10c622e3f92a8ff7d3a69b7331dbcabc9a6d8fa671dde"
        next_revision: 45
        previous_revision: 44
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:e507c03f44389b74a7b9925350c245e895b2dc8aab6fc36564742f19e3ecd750:
        aggregate_digest: "sha256:3e3d29522e1147b880171f995d4bfc43531f5f06932dc67d8dd1e791e574f9e6"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:48:30.970Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_3d7a9cc3445b000833743370"
          mutation_id: "compatibility:sha256:e507c03f44389b74a7b9925350c245e895b2dc8aab6fc36564742f19e3ecd750"
          plan_digest: "sha256:ebdcea837a530b5ed8b4493983639678ac70df14d583e65e939943c1fbb14b65"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 37
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e507c03f44389b74a7b9925350c245e895b2dc8aab6fc36564742f19e3ecd750"
        next_revision: 38
        previous_revision: 37
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:f39b24041988d8c80f1edd6f7bee46b7d776fc185073f15804173e5ab383a790:
        aggregate_digest: "sha256:039213a7cf78cf71f21599daa3f2ceb75b7df3173d1f9fc1b0f195e350fb3cb9"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:13:31.704Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c8a26cecf48547f494a4fb4e"
          mutation_id: "compatibility:sha256:f39b24041988d8c80f1edd6f7bee46b7d776fc185073f15804173e5ab383a790"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f39b24041988d8c80f1edd6f7bee46b7d776fc185073f15804173e5ab383a790"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:faa599df220a808f971ff56c3541da39237ada22a15da6cfd301abc6c49405c8:
        aggregate_digest: "sha256:bb370a346b99126247d1de5a46c9d4c6654ac8fb6323f488d5cc9fe24b7eb8e4"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:28:22.224Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_acfe131c4f6b8da4a6177493"
          mutation_id: "compatibility:sha256:faa599df220a808f971ff56c3541da39237ada22a15da6cfd301abc6c49405c8"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 41
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:faa599df220a808f971ff56c3541da39237ada22a15da6cfd301abc6c49405c8"
        next_revision: 42
        previous_revision: 41
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      external-result:work-order-202609061750-Z0XXVD-executor-0a92bd18ee1b8dbe98b403f8:
        aggregate_digest: "sha256:b1324515b8e40abf4c8ba4b7ba6d668df9b3b607c103cce25f55cd258a8f4656"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T20:03:11.487Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_5b9ac70d2ef97fb1150d3af5"
          mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-0a92bd18ee1b8dbe98b403f8"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 52
          to: "REWORK_READY"
          work_item_id: "prepare-qualified-078-candidate"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-0a92bd18ee1b8dbe98b403f8"
        next_revision: 53
        previous_revision: 52
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      external-result:work-order-202609061750-Z0XXVD-executor-0fc481657b38f844c8c5dd58:
        aggregate_digest: "sha256:797e164c64ea3b97acaf1e0f4381ecf6efab4a48c690c12b6b9e49e3acc2c57d"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:32:53.420Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_8130dffe5757e59550eed54b"
          mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-0fc481657b38f844c8c5dd58"
          plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 30
          to: "REWORK_READY"
          work_item_id: "prepare-qualified-078-candidate"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-0fc481657b38f844c8c5dd58"
        next_revision: 31
        previous_revision: 30
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      external-result:work-order-202609061750-Z0XXVD-executor-37b8a0797519841bcf1ac38a:
        aggregate_digest: "sha256:911e2013e4c22cadc70ea79a4e67d7da9d92660abbdffd0564bef47e95b3f2eb"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:26:02.088Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_fb0ae3c544ccbe017e2aeaca"
          mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-37b8a0797519841bcf1ac38a"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 24
          to: "REWORK_READY"
          work_item_id: "prepare-qualified-078-candidate"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-37b8a0797519841bcf1ac38a"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      external-result:work-order-202609061750-Z0XXVD-executor-81a9811ba63ed3feb589eb5c:
        aggregate_digest: "sha256:aec00bd53524addea288b52c02891b08f2e7dd6d19b2b320a9e445bcb762e2b7"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:30:13.147Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_e965263aecc1e01ac4415277"
          mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-81a9811ba63ed3feb589eb5c"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 43
          to: "REWORK_READY"
          work_item_id: "prepare-qualified-078-candidate"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-81a9811ba63ed3feb589eb5c"
        next_revision: 44
        previous_revision: 43
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      external-result:work-order-202609061750-Z0XXVD-executor-89a27c26a3fd6b8dc7368d76:
        aggregate_digest: "sha256:46d3d5556f7b605eea1fca5cb71bc3947bb81a7571799f0b6fc537b78c95bbae"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:51:46.454Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_a3890625b2d4c2bd8285e818"
          mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-89a27c26a3fd6b8dc7368d76"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 49
          to: "REWORK_READY"
          work_item_id: "prepare-qualified-078-candidate"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-89a27c26a3fd6b8dc7368d76"
        next_revision: 50
        previous_revision: 49
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      external-result:work-order-202609061750-Z0XXVD-executor-bb49f66e178f0faa76a8e495:
        aggregate_digest: "sha256:01677a75f4db35d06429b14348293e7d13b7a8792331815b4b5b170b77a4355d"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T21:05:07.116Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_8fe748e0a109d39cb6cc0558"
          mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-bb49f66e178f0faa76a8e495"
          plan_digest: "sha256:01d3d9dd6e984d40a6728c7f79fab07e6589f03f503c57d78a783cfff1e24dd8"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 64
          to: "REWORK_READY"
          work_item_id: "prepare-qualified-078-candidate"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-bb49f66e178f0faa76a8e495"
        next_revision: 65
        previous_revision: 64
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      external-result:work-order-202609061750-Z0XXVD-executor-d7af3b7702c180e8aa9ef11b:
        aggregate_digest: "sha256:14dc1028ca1c52a0b10e8c0e58941e94b1ba89deeaa993ed6c1e2d7f7ce8f4a4"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T19:35:53.738Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_43368f37d060bb25bb31d27d"
          mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-d7af3b7702c180e8aa9ef11b"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 46
          to: "REWORK_READY"
          work_item_id: "prepare-qualified-078-candidate"
        mutation_id: "external-result:work-order-202609061750-Z0XXVD-executor-d7af3b7702c180e8aa9ef11b"
        next_revision: 47
        previous_revision: 46
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-refinement:work-order-202609061750-Z0XXVD-executor-36c80f07144c15c26856b158:
        aggregate_digest: "sha256:279396d1af9b58fd7a04d00fe31b3fffb36565fec339d58c6b1772059718d325"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T20:31:39.164Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_fab5699db9911a966048ab96"
          mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-36c80f07144c15c26856b158"
          plan_digest: "sha256:0cf0818769494d347aa3b5897173d9ca930904d7310b97a1e55216876b733c1b"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 53
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-36c80f07144c15c26856b158"
        next_revision: 54
        previous_revision: 53
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-refinement:work-order-202609061750-Z0XXVD-executor-54cc6de48a1743370724a628:
        aggregate_digest: "sha256:4d67d9b0f91ef45837587514865dd2bb8519c1116eb7d613b86794333cf7dcc1"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T19:16:53.737Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_72404c828665f8ab2bb7d28d"
          mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-54cc6de48a1743370724a628"
          plan_digest: "sha256:ebdcea837a530b5ed8b4493983639678ac70df14d583e65e939943c1fbb14b65"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 38
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-54cc6de48a1743370724a628"
        next_revision: 39
        previous_revision: 38
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15:
        aggregate_digest: "sha256:8bea027c19e2865f0c30fdc3cb55b8662b4f5f2f80ca4e7ac11e4d1e0908644b"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T18:18:53.456Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_4a7740b9ca7dc02918e6374d"
          mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15"
          plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 19
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-refinement:work-order-202609061750-Z0XXVD-executor-93127a655963edd72f9461fc:
        aggregate_digest: "sha256:1e25cecb4faeb422c25cb08b30563373c196af2c1a54651b07155062ee6daf82"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T18:47:34.085Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_27b828750e3cce205fef15fe"
          mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-93127a655963edd72f9461fc"
          plan_digest: "sha256:2ef473b70600bd2c32e2a53d163cb64cb2b5affa14c5582e7788e373e92460df"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 35
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-93127a655963edd72f9461fc"
        next_revision: 36
        previous_revision: 35
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-refinement:work-order-202609061750-Z0XXVD-executor-c911d996434ad06fb912a3d9:
        aggregate_digest: "sha256:dcbadd7244801d7ee45d5a1cec7e30822c5a872ca8e98e110a722b8df7db341b"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T18:27:41.589Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_abef10b3636fc3ce62e2c099"
          mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-c911d996434ad06fb912a3d9"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 25
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-c911d996434ad06fb912a3d9"
        next_revision: 26
        previous_revision: 25
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-refinement:work-order-202609061750-Z0XXVD-executor-d4024aa8d77a83eda3f6a48b:
        aggregate_digest: "sha256:bba74109794ce359e97b235767e3d183112c29e181c50df2cf699d0662b341a3"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T20:49:06.153Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
            - "risk_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_8951080321f42d581547166c"
          mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-d4024aa8d77a83eda3f6a48b"
          plan_digest: "sha256:ffbf1293eaa7134b994981ac3a6d10461184a4a63d557541847af8a8e532a57a"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 56
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-d4024aa8d77a83eda3f6a48b"
        next_revision: 57
        previous_revision: 56
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-reject-571b1f92492d0423993820e92b607dd2:
        aggregate_digest: "sha256:60305b89f9f21ae771284ae39ab0dd9e3b195c53c6cb211ad9246987e48d397e"
        event:
          actor_id: "ORCHESTRATOR"
          at: "2026-09-06T18:14:53.037Z"
          cause_refs:
            - "plan:sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
            - "note:sha256:2ed70fe3d8063c8b5b9f3f16e3398b596078310f7ec558e9399e9fcff23209ae"
          entity: "task"
          from: "ACTIVE"
          id: "event_2041baa5f5f91c6260fd83ae"
          mutation_id: "plan-reject-571b1f92492d0423993820e92b607dd2"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 14
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-571b1f92492d0423993820e92b607dd2"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-reject-acd0c51dae8ead099d88f973f73c35f4:
        aggregate_digest: "sha256:6b60086ebb677f0f97577372fe0909af24fb7879b2b24569bf75519f5ce05b42"
        event:
          actor_id: "REVIEWER"
          at: "2026-09-06T18:37:13.947Z"
          cause_refs:
            - "plan:sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
            - "note:sha256:a3fd1e93a111a5ddb715fc30e299c77120f15a446ce9949d71386cd03b426cb6"
          entity: "task"
          from: "ACTIVE"
          id: "event_f4503b9d1efe739e29b7e000"
          mutation_id: "plan-reject-acd0c51dae8ead099d88f973f73c35f4"
          plan_digest: "sha256:4bb9645ef27fb0fcfe2ef7a26122fcbce773e951eac03b9b66a5ee4584c2ecff"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 31
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-acd0c51dae8ead099d88f973f73c35f4"
        next_revision: 32
        previous_revision: 31
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-reject-b8a4d4f1278aa453cc9fcc48ef3e6df9:
        aggregate_digest: "sha256:208047d66022b312173df889d35d7ccc76c2193b4c040b335f00e1ea0de1c100"
        event:
          actor_id: "REVIEWER"
          at: "2026-09-06T20:50:35.873Z"
          cause_refs:
            - "plan:sha256:7f304df3df2fb0b59fe49127e8cdf977152f4750d497911ea40679db77256f80"
            - "note:sha256:f4851933786e2c47b01bddba99d32179e7b6d70c52042b4b75fefeb87d6e2c3b"
          entity: "task"
          from: "ACTIVE"
          id: "event_df9516327fb5f3ba3952c9cc"
          mutation_id: "plan-reject-b8a4d4f1278aa453cc9fcc48ef3e6df9"
          plan_digest: "sha256:7f304df3df2fb0b59fe49127e8cdf977152f4750d497911ea40679db77256f80"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 59
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-b8a4d4f1278aa453cc9fcc48ef3e6df9"
        next_revision: 60
        previous_revision: 59
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-reject-cd47d1eb9548784ab5638e357de58871:
        aggregate_digest: "sha256:64385ccbd27bafae72e5121f4bff45cfd7c821eba44355b70c35c42c2ec57d05"
        event:
          actor_id: "ORCHESTRATOR"
          at: "2026-09-06T18:08:37.133Z"
          cause_refs:
            - "plan:sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
            - "note:sha256:304cb946a533f0408dd393933bb95e943b36b110e700e7b75b08471167ca79c2"
          entity: "task"
          from: "ACTIVE"
          id: "event_29817e2f2bfe97adcc4714ac"
          mutation_id: "plan-reject-cd47d1eb9548784ab5638e357de58871"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 6
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-cd47d1eb9548784ab5638e357de58871"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "7e4ff9a77ff52dc72f14e2001966e5e91cf815f1"
  task_execution_context:
    base_ref: "main"
    base_sha: "262da3130bc5628a7641c400c74368ae355000bf"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "262da3130bc5628a7641c400c74368ae355000bf"
    version: 1
id_source: "generated"
---
## Summary

Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.

## Scope

- In scope: Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
- Out of scope: unrelated refactors not required for "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication".

## Plan

Retain the four bounded runtime repairs with a WorkOrder-compatible output ID.

## Verify Steps

1. Run `bun run release:prepublish`. Expected: the committed 0.7.8 candidate passes canonical release CI, package checks, active-incident cleanup, version parity and generated-document freshness.
2. Run `bun run qualification:mixed-scope-lifecycle`. Expected: the installed packed candidate completes the mixed source, test and documentation lifecycle with correct replay, stale-result, projection and cleanup behavior.
3. Run `node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs`. Expected: published 0.7.7 direct and branch_pr fixtures upgrade using packed 0.7.8, preserve existing task identity, content and DOING state, produce the dedicated upgrade commit, pass routing and doctor, and make no changes on an actual repeated upgrade.
4. Run `node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417`. Expected: valid English template sections and complete planned change coverage. Review the first two prose paragraphs for a clear explanation of practical user outcomes.
5. Review the final diff and observed evidence. Expected: only approved release metadata, notes, generated references and qualification artifacts changed; publication remains explicitly pending until exact-SHA hosted release-ready and canonical publish-result evidence exist.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-06T18:16:28.303Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run release:prepublish
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:860a8441b86236b4176982b3b7cc53b92a7cc2d7a60ae35921ca43cf99931621, input_digest=sha256:5db480110194b3a749db12713701ab37ef4728721168a51473e08b55e832c317

Details:

Command: bun run release:prepublish
Result: fail
Evidence: .agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609061750-Z0XXVD declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609061750-Z0XXVD-prepare-and-qualify-agentplane-0-7-8-for-exact-s/.agentplane/tasks/202609061750-Z0XXVD/blueprint/resolved-snapshot.json
- old_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
- current_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609061750-Z0XXVD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609061750-Z0XXVD
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
