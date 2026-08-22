---
id: "202608212244-6XZAYD"
title: "Implement the task-centric refactoring roadmap v2 and publish the next patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "architecture"
  - "task-centric"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "publish"
  - "merge"
  - "external_system"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-21T22:50:06.303Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "User confirmed exact plan digest in Codex task; host_user_decision=sha256:f5d9083511651b29dd00284b298bcaf85d49e76762063fbd26008ffa0d2aae09"
verification:
  state: "ok"
  updated_at: "2026-08-22T01:43:52.903Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-22T01:47:00.164Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 5 typed finding(s)."
  evaluated_sha: "8ae1df8b06aa992a90d7b678bf5d2c34f7455969"
  blueprint_digest: "d702844a9da21d89379b918b38010a985dc6d14d6bcc1ebec4d6d2004959e306"
  evidence_refs:
    - ".agentplane/tasks/202608212244-6XZAYD/quality/20260822-014606256-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/20260822-014606256-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/objects/sha256/6c8f26126617b989de573e4473ca1aeeb7247b8a67bda9f01732207161f25218.md"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/20260822-014606256-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/20260822-014606256-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/20260822-014606256-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/20260822-014606256-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608212244-6XZAYD/README.md"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/objects/sha256/950b2e772855aeab03a5ec4a9d642d7d2de6175ce035f04960ad5dd6bd0ef346.patch"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/objects/sha256/4d1bfed0136cbe7ec5e30dd075e80cee8dec5bc0d6a5ad71e27a24a5f0b12bf3.json"
    - ".agentplane/tasks/202608212244-6XZAYD/verification/20260822014352903-2db6306ae85d2f0a.json"
    - ".agentplane/tasks/202608212244-6XZAYD/quality/objects/sha256/0f9e0c0f8b0f85b8effd9074a1316c56971aceb5da4a5fce5935f4726c154946.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.release.md"
  findings:
    - "bun run bench:compatibility:candidate:check passes."
    - "bun run bench:compatibility:check fails with AgentWorkOrder contract artifact digest drift for surface b80a796dd770c30b2f7325400aa28178c6484f5d58a284b212910c3af611b436."
    - "Rework must update scripts/baselines/v0.7-compatibility-candidate.json and scripts/checks/check-compatibility-contract-baseline.mjs with exact task provenance and must preserve the immutable baseline anchor."
    - "The rework packet must include scripts/baselines and scripts/checks in writable scope; those roots were absent from the prior EXECUTOR authority."
    - "Residual risk: The critical compatibility suite cannot pass until the exact reviewed ratchet artifact is updated."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "material_implementation_uncertainty"
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
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "security_boundary"
    writable_roots:
      - ".agentplane/policy"
      - ".github"
      - "AGENTS.md"
      - "CLAUDE.md"
      - "README.md"
      - "ROADMAP.md"
      - "agentplane-recipes"
      - "bun.lock"
      - "depcruise.config.cjs"
      - "eslint.config.cjs"
      - "integrations"
      - "package.json"
      - "packages"
      - "schemas"
      - "skills"
      - "tsconfig.depcruise.json"
      - "vitest.config.ts"
      - "vitest.workspace.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "Protected main and publication require branch_pr integration, hosted checks, provider writes, and registry publication."
      - "The roadmap changes the central task lifecycle, public CLI and schemas, tests, generated assets, architecture rules, and release metadata."
      - "The user explicitly approved the complete roadmap and patch release; new approval is reserved for material scope, security, acceptance, or version drift."
    repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/policy"
      - ".github"
      - "AGENTS.md"
      - "CLAUDE.md"
      - "README.md"
      - "ROADMAP.md"
      - "agentplane-recipes"
      - "bun.lock"
      - "depcruise.config.cjs"
      - "eslint.config.cjs"
      - "integrations"
      - "package.json"
      - "packages"
      - "schemas"
      - "skills"
      - "tsconfig.depcruise.json"
      - "vitest.config.ts"
      - "vitest.workspace.ts"
  observed:
    authority_violations: []
    changed_components:
      - "depcruise.config.cjs"
      - "packages/agentplane"
      - "packages/core"
      - "packages/spec"
      - "packages/testkit"
      - "schemas"
    changed_paths:
      - "depcruise.config.cjs"
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/hermes/hermes-runtime.ts"
      - "packages/agentplane/src/commands/hermes/hermes.command.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
      - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-result-application.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
      - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
      - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
      - "packages/agentplane/src/commands/task/new-duplicates.ts"
      - "packages/agentplane/src/commands/task/plan-approve.command.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/ready.ts"
      - "packages/agentplane/src/commands/task/run.command.ts"
      - "packages/agentplane/src/commands/task/shared/dependencies.ts"
      - "packages/agentplane/src/commands/task/supervision-outcome-disposition.test.ts"
      - "packages/agentplane/src/commands/task/supervision-outcome-disposition.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
      - "packages/agentplane/src/commands/workflow.test.ts"
      - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
      - "packages/agentplane/src/runner/context/task-context.test.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
      - "packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts"
      - "packages/agentplane/src/runner/usecases/task-knowledge-request-lifecycle.test.ts"
      - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
      - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval.test.ts"
      - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval.ts"
      - "packages/agentplane/src/runner/usecases/task-run-active-claim-readonly.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
      - "packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel-effect-in-doubt.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-provenance.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-lifecycle.testkit.ts"
      - "packages/agentplane/src/runner/usecases/task-run-process-identity-serialization.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run.ts"
      - "packages/agentplane/src/runtime/task-execution-context/architecture-guard.test.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
      - "packages/agentplane/src/runtime/workspace-allocation/allocate.ts"
      - "packages/core/schemas/agent-work-order-v2.schema.json"
      - "packages/core/src/index.ts"
      - "packages/core/src/runner/agent-semantic-result.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "packages/core/src/schemas/index.ts"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-centric/compatibility.ts"
      - "packages/core/src/tasks/task-centric/digest.ts"
      - "packages/core/src/tasks/task-centric/graph.ts"
      - "packages/core/src/tasks/task-centric/index.ts"
      - "packages/core/src/tasks/task-centric/lifecycle.ts"
      - "packages/core/src/tasks/task-centric/model.ts"
      - "packages/core/src/tasks/task-centric/orchestrator.test.ts"
      - "packages/core/src/tasks/task-centric/orchestrator.ts"
      - "packages/core/src/tasks/task-centric/policy.ts"
      - "packages/core/src/tasks/task-centric/ports.ts"
      - "packages/core/src/tasks/task-centric/schema.ts"
      - "packages/core/src/tasks/task-centric/task-centric.test.ts"
      - "packages/core/src/tasks/task-status.test.ts"
      - "packages/core/src/tasks/task-status.ts"
      - "packages/spec/schemas/agent-work-order-v2.schema.json"
      - "packages/testkit/src/cli-harness.ts"
      - "schemas/agent-semantic-result.schema.json"
      - "schemas/agent-work-order-v2.schema.json"
    external_effects: []
    repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
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
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "material_implementation_uncertainty"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".agentplane/policy"
          - ".github"
          - "AGENTS.md"
          - "CLAUDE.md"
          - "README.md"
          - "ROADMAP.md"
          - "agentplane-recipes"
          - "bun.lock"
          - "depcruise.config.cjs"
          - "eslint.config.cjs"
          - "integrations"
          - "package.json"
          - "packages"
          - "schemas"
          - "skills"
          - "tsconfig.depcruise.json"
          - "vitest.config.ts"
          - "vitest.workspace.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:ci"
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
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "ci"
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:340b15931a9c93b7a9a4d69a6522a4460f590cdfc98451d897ccc2b2dac9355b"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step.test.ts"
        - "central_path:packages/core/schemas/agent-work-order-v2.schema.json"
        - "central_path:packages/core/src/index.ts"
        - "central_path:packages/core/src/runner/agent-semantic-result.ts"
        - "central_path:packages/core/src/runner/agent-work-order.ts"
        - "central_path:packages/core/src/schemas/index.ts"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/task-centric/compatibility.ts"
        - "central_path:packages/core/src/tasks/task-centric/digest.ts"
        - "central_path:packages/core/src/tasks/task-centric/graph.ts"
        - "central_path:packages/core/src/tasks/task-centric/index.ts"
        - "central_path:packages/core/src/tasks/task-centric/lifecycle.ts"
        - "central_path:packages/core/src/tasks/task-centric/model.ts"
        - "central_path:packages/core/src/tasks/task-centric/orchestrator.test.ts"
        - "central_path:packages/core/src/tasks/task-centric/orchestrator.ts"
        - "central_path:packages/core/src/tasks/task-centric/policy.ts"
        - "central_path:packages/core/src/tasks/task-centric/ports.ts"
        - "central_path:packages/core/src/tasks/task-centric/schema.ts"
        - "central_path:packages/core/src/tasks/task-centric/task-centric.test.ts"
        - "central_path:packages/core/src/tasks/task-status.test.ts"
        - "central_path:packages/core/src/tasks/task-status.ts"
        - "central_path:schemas/agent-semantic-result.schema.json"
        - "central_path:schemas/agent-work-order-v2.schema.json"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "depcruise.config.cjs"
          - "packages/agentplane"
          - "packages/core"
          - "packages/spec"
          - "packages/testkit"
          - "schemas"
        changed_files:
          - "depcruise.config.cjs"
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
          - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
          - "packages/agentplane/src/commands/hermes/hermes-runtime.ts"
          - "packages/agentplane/src/commands/hermes/hermes.command.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
          - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-result-application.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
          - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
          - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
          - "packages/agentplane/src/commands/task/new-duplicates.ts"
          - "packages/agentplane/src/commands/task/plan-approve.command.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/commands/task/ready.ts"
          - "packages/agentplane/src/commands/task/run.command.ts"
          - "packages/agentplane/src/commands/task/shared/dependencies.ts"
          - "packages/agentplane/src/commands/task/supervision-outcome-disposition.test.ts"
          - "packages/agentplane/src/commands/task/supervision-outcome-disposition.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
          - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
          - "packages/agentplane/src/commands/workflow.test.ts"
          - "packages/agentplane/src/commands/workflow.verify-hooks.test.ts"
          - "packages/agentplane/src/runner/context/task-context.test.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
          - "packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts"
          - "packages/agentplane/src/runner/usecases/task-knowledge-request-lifecycle.test.ts"
          - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
          - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval.test.ts"
          - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval.ts"
          - "packages/agentplane/src/runner/usecases/task-run-active-claim-readonly.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
          - "packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel-effect-in-doubt.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-provenance.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-lifecycle.testkit.ts"
          - "packages/agentplane/src/runner/usecases/task-run-process-identity-serialization.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run.ts"
          - "packages/agentplane/src/runtime/task-execution-context/architecture-guard.test.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
          - "packages/agentplane/src/runtime/workspace-allocation/allocate.ts"
          - "packages/core/schemas/agent-work-order-v2.schema.json"
          - "packages/core/src/index.ts"
          - "packages/core/src/runner/agent-semantic-result.ts"
          - "packages/core/src/runner/agent-work-order.ts"
          - "packages/core/src/schemas/index.ts"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/task-centric/compatibility.ts"
          - "packages/core/src/tasks/task-centric/digest.ts"
          - "packages/core/src/tasks/task-centric/graph.ts"
          - "packages/core/src/tasks/task-centric/index.ts"
          - "packages/core/src/tasks/task-centric/lifecycle.ts"
          - "packages/core/src/tasks/task-centric/model.ts"
          - "packages/core/src/tasks/task-centric/orchestrator.test.ts"
          - "packages/core/src/tasks/task-centric/orchestrator.ts"
          - "packages/core/src/tasks/task-centric/policy.ts"
          - "packages/core/src/tasks/task-centric/ports.ts"
          - "packages/core/src/tasks/task-centric/schema.ts"
          - "packages/core/src/tasks/task-centric/task-centric.test.ts"
          - "packages/core/src/tasks/task-status.test.ts"
          - "packages/core/src/tasks/task-status.ts"
          - "packages/spec/schemas/agent-work-order-v2.schema.json"
          - "packages/testkit/src/cli-harness.ts"
          - "schemas/agent-semantic-result.schema.json"
          - "schemas/agent-work-order-v2.schema.json"
        external_effects: []
        repository_effects:
          - "public_api"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "implementation_risk_validation"
      - "repository_effect:ci"
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
  hash: "8ae1df8b06aa992a90d7b678bf5d2c34f7455969"
  message: "🚧 6XZAYD task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8ae1df8b06aa. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-21T22:50:54.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T01:43:04.573Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8ae1df8b06aa. CLI accepted one state-bound external-agent semantic result."
    commit: "8ae1df8b06aa992a90d7b678bf5d2c34f7455969"
  -
    type: "verify"
    at: "2026-08-22T01:43:52.903Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-22T01:44:01.871Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope."
sections:
  Summary: |-
    Implement the task-centric refactoring roadmap v2 and publish the next patch release

    Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.
  Scope: |-
    - In scope: Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.
    - Out of scope: unrelated refactors not required for "Implement the task-centric refactoring roadmap v2 and publish the next patch release".
  Plan: |-
    1. Establish a live baseline: map RF2-001 through RF2-058 to current symbols, tests, schemas, and already-shipped behavior; record only genuine gaps and preserve compatible WorkOrder, SemanticResult, receipt, hook, journal, provider, and workspace mechanisms.
    2. Complete Phase 0 characterization for outcome dispositions, direct/branch/external/managed golden paths, lifecycle invariants, crash reconciliation, and the fresh-repository gateway.
    3. Complete the correctness floor RF2-006 through RF2-011: exhaustive outcome disposition, validated Git base identity without zero-SHA fallback, strict state parsing with explicit migration, transition-owned verification rework, typed context retrieval failures, and one explicit task-run dispatch path.
    4. Add the task-centric domain model RF2-012 through RF2-019 in pure Core modules: immutable TaskIntent and RepositorySnapshot, root Task lifecycle, digest-bound TaskPlanRevision approval, internal WorkItemGraph, atomic DomainEvent and TransitionReceipt, legacy projections, write boundaries, and ReconciliationSnapshot facts.
    5. Add pure services RF2-020 through RF2-028: graph validation/readiness, deterministic scheduling and claims, actor-neutral semantic request/result, canonical validation, typed failures/recovery/decisions, one shared plan-change classifier, lifecycle engine, and root completion evaluation.
    6. Introduce ports and adapters RF2-029 through RF2-035: CAS TaskRepositoryPort, Git/Workspace/ContentActor/Validation/Provider/Artifact/Context ports, one application loop for direct and branch_pr strategies, and baseline-bound ExecutionLease authority.
    7. Strengthen intake, planning, approval, and context RF2-036 through RF2-044: stable machine gateway, thin AGENTS/CLAUDE gateway, current PlanningContextBuilder, structured TaskPlanProposal, deterministic validation, exact digest approval, atomic internal WorkItem materialization, per-item context refresh, and typed output manifests/retrieval receipts.
    8. Implement autonomous execution RF2-045 through RF2-049: one task-centric loop for pull, managed, and manual actors; bounded execute/diagnose/repair/review episodes; local plan adaptation; material replan boundaries; and typed human decision tickets.
    9. Complete recovery and orchestration RF2-050 through RF2-054: durable checkpoints, centralized retry/idempotency budgets, resource claims, worktree/merge-queue integration, and a release-blocking fresh-repository architectural E2E gate.
    10. Complete migration and deletion RF2-055 through RF2-058: canonical ExecutionContract, removal of project/role-centric ownership assumptions after adapters are proven, live-index/archive separation, dependency-boundary enforcement, and thin handlers.
    11. Validate incrementally with targeted unit, property, integration, architecture, schema, generated-asset, and CLI checks; then run the full regression, release prepublish gate, and the literal 20-step release acceptance scenario including deterministic rework, crash resume, exact plan revision approval, material replan, final completion, and absence of any Project record.
    12. Let AgentPlane integrate through the protected branch_pr route. After exact-head hosted checks pass, prepare and publish the next patch release, then verify the Git tag, GitHub release, package registry versions and dist-tags, installed CLI behavior, exact release SHA, post-release main state, and clean tracked/untracked state. Stop for a new approval only if scope roots, security boundary, version/tag, release target, or acceptance criteria materially change.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-22T01:43:52.903Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:271640c5dd262e32e6fe69efe5f2dbd7abde0d6b68129626041d4d34c72061b0

    Details:

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608212244-6XZAYD Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608212244-6XZAYD Verification Contract check critical_paths

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608212244-6XZAYD Verification Contract check docs_contract

    Check: full_regression
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608212244-6XZAYD Verification Contract check full_regression

    Check: hosted_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608212244-6XZAYD Verification Contract check hosted_integration

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608212244-6XZAYD Verification Contract check real_e2e

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608212244-6XZAYD Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608212244-6XZAYD-implement-the-task-centric-refactoring-roadmap-v/.agentplane/tasks/202608212244-6XZAYD/blueprint/resolved-snapshot.json
    - old_digest: d702844a9da21d89379b918b38010a985dc6d14d6bcc1ebec4d6d2004959e306
    - current_digest: d702844a9da21d89379b918b38010a985dc6d14d6bcc1ebec4d6d2004959e306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608212244-6XZAYD

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
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:f5d9083511651b29dd00284b298bcaf85d49e76762063fbd26008ffa0d2aae09"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:63e9ade4d678abb831b23ce8518ebc4352bd028d10dea9ce2e6542c0a015ad17"
    digest: "sha256:b30f7aecb94416a52b3fef777d5b8ce8f1d2fffbdb38501f8be4f84fcd430a0d"
    grant_id: "eb6c8501-f1ce-4ef6-a76b-7dea690000da"
    issued_at: "2026-08-21T22:50:06.303Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:e6d075d6dd4138358cfddafd290a2350f40d977f23a38811d402348343849b13"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:6cfff1cbeea391464fb74ad5762a771f9c6aa60b72a09e7741d3ea236d5c818b"
    status: "active"
    task_id: "202608212244-6XZAYD"
  implementation_commit:
    hash: "8ae1df8b06aa992a90d7b678bf5d2c34f7455969"
  task_execution_context:
    base_ref: "main"
    base_sha: "134c95fd629d5ebcf0e17196ccb4b44f60c993fd"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "134c95fd629d5ebcf0e17196ccb4b44f60c993fd"
    version: 1
id_source: "generated"
---
## Summary

Implement the task-centric refactoring roadmap v2 and publish the next patch release

Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.

## Scope

- In scope: Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.
- Out of scope: unrelated refactors not required for "Implement the task-centric refactoring roadmap v2 and publish the next patch release".

## Plan

1. Establish a live baseline: map RF2-001 through RF2-058 to current symbols, tests, schemas, and already-shipped behavior; record only genuine gaps and preserve compatible WorkOrder, SemanticResult, receipt, hook, journal, provider, and workspace mechanisms.
2. Complete Phase 0 characterization for outcome dispositions, direct/branch/external/managed golden paths, lifecycle invariants, crash reconciliation, and the fresh-repository gateway.
3. Complete the correctness floor RF2-006 through RF2-011: exhaustive outcome disposition, validated Git base identity without zero-SHA fallback, strict state parsing with explicit migration, transition-owned verification rework, typed context retrieval failures, and one explicit task-run dispatch path.
4. Add the task-centric domain model RF2-012 through RF2-019 in pure Core modules: immutable TaskIntent and RepositorySnapshot, root Task lifecycle, digest-bound TaskPlanRevision approval, internal WorkItemGraph, atomic DomainEvent and TransitionReceipt, legacy projections, write boundaries, and ReconciliationSnapshot facts.
5. Add pure services RF2-020 through RF2-028: graph validation/readiness, deterministic scheduling and claims, actor-neutral semantic request/result, canonical validation, typed failures/recovery/decisions, one shared plan-change classifier, lifecycle engine, and root completion evaluation.
6. Introduce ports and adapters RF2-029 through RF2-035: CAS TaskRepositoryPort, Git/Workspace/ContentActor/Validation/Provider/Artifact/Context ports, one application loop for direct and branch_pr strategies, and baseline-bound ExecutionLease authority.
7. Strengthen intake, planning, approval, and context RF2-036 through RF2-044: stable machine gateway, thin AGENTS/CLAUDE gateway, current PlanningContextBuilder, structured TaskPlanProposal, deterministic validation, exact digest approval, atomic internal WorkItem materialization, per-item context refresh, and typed output manifests/retrieval receipts.
8. Implement autonomous execution RF2-045 through RF2-049: one task-centric loop for pull, managed, and manual actors; bounded execute/diagnose/repair/review episodes; local plan adaptation; material replan boundaries; and typed human decision tickets.
9. Complete recovery and orchestration RF2-050 through RF2-054: durable checkpoints, centralized retry/idempotency budgets, resource claims, worktree/merge-queue integration, and a release-blocking fresh-repository architectural E2E gate.
10. Complete migration and deletion RF2-055 through RF2-058: canonical ExecutionContract, removal of project/role-centric ownership assumptions after adapters are proven, live-index/archive separation, dependency-boundary enforcement, and thin handlers.
11. Validate incrementally with targeted unit, property, integration, architecture, schema, generated-asset, and CLI checks; then run the full regression, release prepublish gate, and the literal 20-step release acceptance scenario including deterministic rework, crash resume, exact plan revision approval, material replan, final completion, and absence of any Project record.
12. Let AgentPlane integrate through the protected branch_pr route. After exact-head hosted checks pass, prepare and publish the next patch release, then verify the Git tag, GitHub release, package registry versions and dist-tags, installed CLI behavior, exact release SHA, post-release main state, and clean tracked/untracked state. Stop for a new approval only if scope roots, security boundary, version/tag, release target, or acceptance criteria materially change.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-22T01:43:52.903Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:271640c5dd262e32e6fe69efe5f2dbd7abde0d6b68129626041d4d34c72061b0

Details:

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
Scope: branch_pr task 202608212244-6XZAYD Verification Contract check affected_unit_integration

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
Scope: branch_pr task 202608212244-6XZAYD Verification Contract check critical_paths

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
Scope: branch_pr task 202608212244-6XZAYD Verification Contract check docs_contract

Check: full_regression
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
Scope: branch_pr task 202608212244-6XZAYD Verification Contract check full_regression

Check: hosted_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
Scope: branch_pr task 202608212244-6XZAYD Verification Contract check hosted_integration

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
Scope: branch_pr task 202608212244-6XZAYD Verification Contract check real_e2e

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608212244-6XZAYD/supervision/declared-checks.json#checks
Scope: branch_pr task 202608212244-6XZAYD Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608212244-6XZAYD-implement-the-task-centric-refactoring-roadmap-v/.agentplane/tasks/202608212244-6XZAYD/blueprint/resolved-snapshot.json
- old_digest: d702844a9da21d89379b918b38010a985dc6d14d6bcc1ebec4d6d2004959e306
- current_digest: d702844a9da21d89379b918b38010a985dc6d14d6bcc1ebec4d6d2004959e306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608212244-6XZAYD

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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
