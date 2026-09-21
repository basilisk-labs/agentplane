---
id: "202609210324-CC13V3"
title: "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 46
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.11"
  - "LC-04-LC-24"
  - "lifecycle-convergence"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun run arch:check"
  - "bun run ci:local:full"
  - "bun run clone:check"
  - "bun run knip:check"
  - "bun run package:install-smoke"
  - "bun run test:release:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-09-21T04:21:11.698Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-21T03:49:07.541Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:8c203d031e6958259117341b5b47b0a9d0b775edb1791a11e849c05c249db3aa"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-21T04:21:11.698Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "a31b9dd4befbd066e0fa41222133545d6005df01"
  review_identity_digest: "sha256:303aff28a2ce92aa17154169a3f63b03ee84f69b66392a8ce527e373886860ee"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609210324-CC13V3/7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3/quality-report.json"
  findings:
    - "The Kernel contract, WorkOrder projection, and public semantic-result schema preserve CURATOR as an explicit canonical role."
    - "CURATOR WorkOrders receive context-scoped mutation authority, and continuation rejects changed paths outside the granted context roots."
    - "Ordinary and managed paths share one role-normalization helper, preserving canonical roles while mapping legacy execution aliases to EXECUTOR."
    - "Knowledge requests pass through the common semantic admission boundary, require an exact WorkOrder binding, and remain gated by the explicit knowledge_request tool class."
    - "EVALUATOR may report a bounded needs_context request before a final review verdict, while completed evaluations still require the typed review payload."
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
    - "effect_publish"
    - "effect_release_metadata"
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
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:898fd0140354628320c3c9df71c2bbb224ffa7ee9ed7f1f382def29db1bb77c4"
      escalation_reasons:
        - "effect_release_metadata"
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
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "a31b9dd4befbd066e0fa41222133545d6005df01"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-21T03:24:58.938Z"
doc_updated_by: "CODER"
description: "Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification."
sections:
  Summary: |-
    Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate

    Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification.
  Scope: |-
    - In scope: Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification.
    - Out of scope: unrelated refactors not required for "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:b080dbccf4797ceb74d1a6f00e514061bed54856949a8583d21fb6c3be61bb03"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609210324-CC13V3/7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3/quality-report.json"
    findings:
      - "The Kernel contract, WorkOrder projection, and public semantic-result schema preserve CURATOR as an explicit canonical role."
      - "CURATOR WorkOrders receive context-scoped mutation authority, and continuation rejects changed paths outside the granted context roots."
      - "Ordinary and managed paths share one role-normalization helper, preserving canonical roles while mapping legacy execution aliases to EXECUTOR."
      - "Knowledge requests pass through the common semantic admission boundary, require an exact WorkOrder binding, and remain gated by the explicit knowledge_request tool class."
      - "EVALUATOR may report a bounded needs_context request before a final review verdict, while completed evaluations still require the typed review payload."
    implementation_commit: "a31b9dd4befbd066e0fa41222133545d6005df01"
    implementation_tree: "9bc369dc5a997e7260ad365917976c6b7ec9011b"
    projected_at: "2026-09-21T04:21:11.698Z"
    review_identity_digest: "sha256:303aff28a2ce92aa17154169a3f63b03ee84f69b66392a8ce527e373886860ee"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:d9f7bf51b405d48e400923d3e03866e50ac9ee9e4863b16bbaf147f0db98337d"
    work_order_id: "sha256:0862ef4a9f04e34c73fd9dba02e4afae9323bfca20dde7b2af72b77c0fe0a9a3"
  task_execution_context:
    base_ref: "main"
    base_sha: "be534096c332e29fe0831974844687961ba9807e"
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
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:47f16322d14803354127a9ba3e3ebb5a28cf4024debeb23adb6437c73bed7793"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:557540c9cc45b35ec7969b2e3069d4e4b63c2ef324546a4cdca760a8f639aa68"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:075025df97728dfcbe52315933320082212fd845e3fd4afa16fc81910567bac8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:47f16322d14803354127a9ba3e3ebb5a28cf4024debeb23adb6437c73bed7793"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:a0a93327b1355abeee291d0770b84d8272842a34e1aee7c7eb9339016e88ecf0"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:8076bad43921338f60b42e9869f46722f47723ae301b0ac01d3dbe337e11267e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:075025df97728dfcbe52315933320082212fd845e3fd4afa16fc81910567bac8"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/adapters/task-backend/kernel-next-action.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "packages/core/src/tasks/task-centric/graph.ts"
              - "packages/core/src/tasks/task-centric/index.ts"
              - "packages/core/src/tasks/task-centric/lifecycle.ts"
            evidence_digest: "sha256:20373cee47b4d600c4f92db5cf54b4feac712f252637d3c2b2b92d4030a7bd14"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6895c62859939d7400f9b7a8f07a1e55303de78120bd04c2b78c71563c3c0003"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:8076bad43921338f60b42e9869f46722f47723ae301b0ac01d3dbe337e11267e"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
            evidence_digest: "sha256:6901f5b22c8400357c17aff9f6ddeb27297bfe45e1430672c20652dc539915cd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3e75a679d94873165e9370d428e2de7b51d3090702bc0f10b010f5d5576a2567"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0a73f0924aad52add32c44a143492722c4a201ee86f51b618388ed54fdff0391"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6895c62859939d7400f9b7a8f07a1e55303de78120bd04c2b78c71563c3c0003"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:772015a59d98350682720a7c57f6f422bef35170b034b51e606332c9a6254fef"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4089b19b5e7b4478d9a6f4029b19c6c8837e3ce626708ce8eeb18ec819eb5d63"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0a73f0924aad52add32c44a143492722c4a201ee86f51b618388ed54fdff0391"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3e75a679d94873165e9370d428e2de7b51d3090702bc0f10b010f5d5576a2567"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
              - "packages/agentplane/src/runner/usecases/semantic-role.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-request.test.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-request.ts"
              - "packages/agentplane/src/runner/usecases/task-run-semantic-prompt.ts"
              - "packages/core/src/runner/agent-semantic-result.test.ts"
              - "packages/core/src/runner/agent-semantic-result.ts"
              - "packages/core/src/runner/agent-work-order.test.ts"
              - "packages/core/src/runner/agent-work-order.ts"
              - "packages/core/src/tasks/kernel-semantic.ts"
            evidence_digest: "sha256:2e1467393ae273c8a752bb15ccf841036811cf388119a46dbbb0610ee8d1df71"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2c2696df7c8321e8d2820449cdb3d7d545960459d79f1996dfb6844a219d8e1c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7c544320ac7e8b848db4922b16c7db902bdc9fd3f0c332ddc9122eee84947b0a"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4089b19b5e7b4478d9a6f4029b19c6c8837e3ce626708ce8eeb18ec819eb5d63"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "schemas"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            added_scope_roots:
              - "schemas"
            changed_paths: []
            evidence_digest: "sha256:8cd0c4b433590edefed37c9744b4b18ad4afa43198be778e65a3573fa28e6d21"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:48fb1477c6404f6b45076d60270c96d4e2a4efff1a63026f34ce853746a395af"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7c544320ac7e8b848db4922b16c7db902bdc9fd3f0c332ddc9122eee84947b0a"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2c2696df7c8321e8d2820449cdb3d7d545960459d79f1996dfb6844a219d8e1c"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "workspace:0.7.11-source"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts"
              - "benchmarks"
              - "docs/user"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands"
              - "packages/agentplane/src/commands/branch"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/scenario"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner"
              - "packages/agentplane/src/runner/context"
              - "packages/core/package.json"
              - "packages/core/src"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/core/src/tasks/task-centric"
              - "packages/testkit/src"
              - "schemas"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/release"
              - "vitest.workspace.ts"
            task_id: "202609210324-CC13V3"
            validation_requirements:
              - "bun run arch:check"
              - "bun run bench:agent-efficiency:check"
              - "bun run bench:agent-efficiency:replay:check"
              - "bun run clone:check"
              - "bun run docs:bootstrap:check"
              - "bun run docs:onboarding:check"
              - "bun run knip:check"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
              - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
              - "node --test scripts/checks/single-live-supervisor.test.mjs"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "schemas/agent-semantic-result.schema.json"
            evidence_digest: "sha256:78738afadb22351c6f289477b8367c991c938d744dc845a1cd160e9ecfa7de9c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:c46fbdc2b0f0fcc68c84f80416aae1c12509a25b0118afafad368de7cbb082fd"
        digest: "sha256:7c544320ac7e8b848db4922b16c7db902bdc9fd3f0c332ddc9122eee84947b0a"
        revision: 4
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:47acd3109bf26b9b90da921a03264bcb574f47b491aaa73ba8cdff8696d50996"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
            expected_outputs:
              - "lc-04-accepted"
            id: "lc-04"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:53dfb3e42aa45f26304a78ee5fc206e994a24a99fedbfcdd733d9023e0ae8869"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/core/src/runner"
            expected_outputs:
              - "lc-05-accepted"
            id: "lc-05"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:44523e441d49a652c58cf013a7dc7c2f3db97de2694aadc6dbacb4e3ef3b20e0"
            depends_on:
              - "lc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/agentplane/src/runner/context"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/kernel-semantic.ts"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runner/usecases"
                - "schemas"
            expected_outputs:
              - "lc-06-accepted"
            id: "lc-06"
            optional: false
            required_inputs:
              - "lc-05-accepted"
          -
            contract_digest: "sha256:4b7dc2163c0c75a486adffae2c7befa5aebb5202f5b16fe2872e7780ab842f28"
            depends_on:
              - "lc-04"
              - "lc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-centric"
            expected_outputs:
              - "lc-07-accepted"
            id: "lc-07"
            optional: false
            required_inputs:
              - "lc-04-accepted"
              - "lc-05-accepted"
          -
            contract_digest: "sha256:c35e5c9d3f9a8de1607a0e07f398c885e8462a22e1795e1c22e292a1e6a21bfa"
            depends_on:
              - "lc-07"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-centric"
            expected_outputs:
              - "lc-08-accepted"
            id: "lc-08"
            optional: false
            required_inputs:
              - "lc-07-accepted"
          -
            contract_digest: "sha256:9c2c369316cdabd11d3075ccf553131d565f7334b9a16ad97f4a9da31603e697"
            depends_on:
              - "lc-07"
              - "lc-08"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-09-accepted"
            id: "lc-09"
            optional: false
            required_inputs:
              - "lc-07-accepted"
              - "lc-08-accepted"
          -
            contract_digest: "sha256:c3a8eb87b2bfe1ed211d5e20d924c437b86bcd9af9a2005c7cab188286460941"
            depends_on:
              - "lc-05"
              - "lc-07"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/branch"
            expected_outputs:
              - "lc-10-accepted"
            id: "lc-10"
            optional: false
            required_inputs:
              - "lc-05-accepted"
              - "lc-07-accepted"
          -
            contract_digest: "sha256:799d83a6235842eb3679e63d656adf39e226950839eb659258e54969868b3797"
            depends_on:
              - "lc-10"
              - "lc-08"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "lc-11-accepted"
            id: "lc-11"
            optional: false
            required_inputs:
              - "lc-10-accepted"
              - "lc-08-accepted"
          -
            contract_digest: "sha256:163b50b05a0c8b0b9b34bfa82547f4827ed1a73b4f535e163e4011262247b4ca"
            depends_on:
              - "lc-09"
              - "lc-11"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-centric"
            expected_outputs:
              - "lc-12-accepted"
            id: "lc-12"
            optional: false
            required_inputs:
              - "lc-09-accepted"
              - "lc-11-accepted"
          -
            contract_digest: "sha256:8740386609f73128538a99d8383760506c400b3e14eccfb098dbb7443c1bc0c6"
            depends_on:
              - "lc-06"
              - "lc-12"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "schema"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-13-accepted"
            id: "lc-13"
            optional: false
            required_inputs:
              - "lc-06-accepted"
              - "lc-12-accepted"
          -
            contract_digest: "sha256:c5e074b9548ddda6c44292c97ba4ee766fea7faece7be02e6fda6443e55ea3d4"
            depends_on:
              - "lc-13"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "schema"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-14-accepted"
            id: "lc-14"
            optional: false
            required_inputs:
              - "lc-13-accepted"
          -
            contract_digest: "sha256:10b9f3e2e4827f46488efcc22307bd6d6c5e5221087533e5268fc50911033768"
            depends_on:
              - "lc-14"
              - "lc-12"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
            expected_outputs:
              - "lc-15-accepted"
            id: "lc-15"
            optional: false
            required_inputs:
              - "lc-14-accepted"
              - "lc-12-accepted"
          -
            contract_digest: "sha256:07c1f5ad57fa7e9c38c59b8bbaae458b60b6db6c3babc280c5ea2cd9e260eece"
            depends_on:
              - "lc-15"
              - "lc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
            expected_outputs:
              - "lc-16-accepted"
            id: "lc-16"
            optional: false
            required_inputs:
              - "lc-15-accepted"
              - "lc-05-accepted"
          -
            contract_digest: "sha256:4a5375bfb085dc3f71dad8717664ab487bec5c377704d09118b5f898f70c2349"
            depends_on:
              - "lc-15"
              - "lc-16"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/commands/scenario"
            expected_outputs:
              - "lc-17-accepted"
            id: "lc-17"
            optional: false
            required_inputs:
              - "lc-15-accepted"
              - "lc-16-accepted"
          -
            contract_digest: "sha256:89ee0558368de33085f7ea32a0c991efd63f7b2a3e361e0b26254517fa760a03"
            depends_on:
              - "lc-16"
              - "lc-17"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "scripts/checks"
            expected_outputs:
              - "lc-18-accepted"
            id: "lc-18"
            optional: false
            required_inputs:
              - "lc-16-accepted"
              - "lc-17-accepted"
          -
            contract_digest: "sha256:bf519cf98cbc32fc7951b50b5ab8ce524d0695d4b99f9aff52e9cf93917f5b98"
            depends_on:
              - "lc-18"
              - "lc-14"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
                - "dependencies"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "packages/agentplane/package.json"
                - "packages/core/package.json"
                - "scripts/checks"
            expected_outputs:
              - "lc-19-accepted"
            id: "lc-19"
            optional: false
            required_inputs:
              - "lc-18-accepted"
              - "lc-14-accepted"
          -
            contract_digest: "sha256:7f30386a191ddd47be3105d867293b3e44b2fee00cf53c0686899e0f30137248"
            depends_on:
              - "lc-19"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-20-accepted"
            id: "lc-20"
            optional: false
            required_inputs:
              - "lc-19-accepted"
          -
            contract_digest: "sha256:baa691a0242f4c2e76ed3b4902d5ddc0041a9994f03e5f8d14c278961cf7050b"
            depends_on:
              - "lc-17"
              - "lc-18"
              - "lc-19"
              - "lc-20"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "ci"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "scripts/release"
                - "scripts/checks"
                - "packages/agentplane/src"
                - "packages/core/src"
                - "packages/testkit/src"
            expected_outputs:
              - "lc-21-accepted"
            id: "lc-21"
            optional: false
            required_inputs:
              - "lc-17-accepted"
              - "lc-18-accepted"
              - "lc-19-accepted"
              - "lc-20-accepted"
          -
            contract_digest: "sha256:9ac2c55be3adc2760154761e39d6650c9c7d5c83eed0349df61f695a7d994acd"
            depends_on:
              - "lc-21"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "scripts/bench"
                - "benchmarks"
                - "artifacts"
            expected_outputs:
              - "lc-22-accepted"
            id: "lc-22"
            optional: false
            required_inputs:
              - "lc-21-accepted"
          -
            contract_digest: "sha256:e3d16a76e54285b7a813b785efe21816b59298a3473967b293b66954175327d0"
            depends_on:
              - "lc-21"
              - "lc-22"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "documentation"
                - "source_code"
                - "public_api"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "docs/user"
                - "packages/core/src/tasks"
                - "packages/agentplane/src"
                - "scripts/checks"
            expected_outputs:
              - "lc-23-accepted"
            id: "lc-23"
            optional: false
            required_inputs:
              - "lc-21-accepted"
              - "lc-22-accepted"
          -
            contract_digest: "sha256:a64ce2f177b9910ef1ae6195eb3e061095524e3787d9d63e6ede31a621078ea6"
            depends_on:
              - "lc-23"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "ci"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "vitest.workspace.ts"
                - "scripts/checks"
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/testkit/src"
            expected_outputs:
              - "lc-24-accepted"
            id: "lc-24"
            optional: false
            required_inputs:
              - "lc-23-accepted"
      effects: []
      final_validation: null
      id: "202609210324-CC13V3"
      intent_digest: "sha256:6d1103482d50ef8578b9e43f5aaa73aa9fdbf038d497221dfe9b5aa0c0b7286b"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:0a73f0924aad52add32c44a143492722c4a201ee86f51b618388ed54fdff0391:
          after_revision: 27
          aggregate_digest: "sha256:54b0547f6be8bc88be4ee41ab6ef7bcf945d069b8a5d19c84d242c8a2775e9bb"
          before_revision: 26
          command_digest: "sha256:182aeed3fecc5d3a5151f75a11977a998e25e59fad29317ce2c5f9b421437ee4"
          effect_ids: []
          event_digests:
            - "sha256:a80381ad9af123a629b9e648b8064ece0a8d9ddb1b8d86ec1cbe3ded14b0d349"
          mutation_id: "amend:sha256:0a73f0924aad52add32c44a143492722c4a201ee86f51b618388ed54fdff0391"
        amend:sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0:
          after_revision: 8
          aggregate_digest: "sha256:6a018b7bc07b0cf3724217bc112da488e122bdcbd034064a80bac1cf00f0d2b2"
          before_revision: 7
          command_digest: "sha256:45eed4d7cef52895b6a5b5665d1f8ecbd33cdd0f3f79e6b61e08bf87f2d4481f"
          effect_ids: []
          event_digests:
            - "sha256:e83b39be4b1f4a072d3e6396df48e29570a1e8f4fc82fe6cb6e5b00e0bd9cc43"
          mutation_id: "amend:sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0"
        amend:sha256:7c544320ac7e8b848db4922b16c7db902bdc9fd3f0c332ddc9122eee84947b0a:
          after_revision: 33
          aggregate_digest: "sha256:2a99effa27c9919ee3fae5bafe100315034e6079147636ebbb20a07c226a2071"
          before_revision: 32
          command_digest: "sha256:a55cca3cbf3f8aefec9c7bdb32225e14f335a273d2266f9c49c4fed83b87da7c"
          effect_ids: []
          event_digests:
            - "sha256:de4921d87ca608cb31f4c232e01452e0b34eb6267f8f6afb7e8069685b830fb3"
          mutation_id: "amend:sha256:7c544320ac7e8b848db4922b16c7db902bdc9fd3f0c332ddc9122eee84947b0a"
        capture:202609210324-CC13V3:
          after_revision: 1
          aggregate_digest: "sha256:3cfd799f7b6e155d701e67794d61a6fbad4fe0ad1961c977233f23518b294cbf"
          before_revision: 0
          command_digest: "sha256:b02d0032eb356bc08fff64a56508065d5549efa44caeb2b591895acef11ca381"
          effect_ids: []
          event_digests:
            - "sha256:24c5b908af2c6c33314eaca12a96dd7892b2542c9c63059cf34fb8160ad1bb92"
          mutation_id: "capture:202609210324-CC13V3"
        kernel_work_item_claim_required:sha256:180c7d006cbdb2d350ff0d386ab62356f27b1953969f767df6e696681881f6fa:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:
          after_revision: 5
          aggregate_digest: "sha256:486c5bd9cd38d5f3853a77e854d420a58a89dea0bf20492fada9905e7bd14c40"
          before_revision: 4
          command_digest: "sha256:c384d48733246f652f4a22e353d218642d576248eca892788e23fc988157700c"
          effect_ids: []
          event_digests:
            - "sha256:18e956f3a4c0b8dcee155fb3d3dc5b6d48af4a83cca51103e2b7cb31e3437e68"
          mutation_id: "kernel_work_item_claim_required:sha256:180c7d006cbdb2d350ff0d386ab62356f27b1953969f767df6e696681881f6fa:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        kernel_work_item_claim_required:sha256:1a7e3f90b78e1f73e400c15dde9aacd2af5b24f087d1a27b7320ca991b274b56:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:
          after_revision: 10
          aggregate_digest: "sha256:b3960f1f4d0e778a324dc1e3e692f26cc45ec2b98ae261897803da13ce9b24d8"
          before_revision: 9
          command_digest: "sha256:a462f06cc3f70af376d5b2bf5c3eaea3de7b719417d23bf811fa91ca1bf4efc5"
          effect_ids: []
          event_digests:
            - "sha256:cc3e8d6fd35f4b5531afff02bd79b495db8eb10310518b678fd99a55eb731c0f"
          mutation_id: "kernel_work_item_claim_required:sha256:1a7e3f90b78e1f73e400c15dde9aacd2af5b24f087d1a27b7320ca991b274b56:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        kernel_work_item_claim_required:sha256:29e1efc11d429d1ff4f443e14737733aeb211316ec9899a4787dc437579b083e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:
          after_revision: 29
          aggregate_digest: "sha256:8215e6c9ec3be2d48f9186ee63e2282f82996ee1914d6200c4cc7bfbab3b3cdf"
          before_revision: 28
          command_digest: "sha256:720f263f44f761ff439d3b8490c0cdf8e3d1bbd91dbeba4aef196a97bba5dffd"
          effect_ids: []
          event_digests:
            - "sha256:569834a9c95f356366818a25678e67226076382b577a7cf25ebbd07d56ef52a3"
          mutation_id: "kernel_work_item_claim_required:sha256:29e1efc11d429d1ff4f443e14737733aeb211316ec9899a4787dc437579b083e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        kernel_work_item_claim_required:sha256:32d70fa96a659b4c25896835a71dd46337f3070d99d2ada24301d1e9c4273a73:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d:
          after_revision: 35
          aggregate_digest: "sha256:ae3c6a7449363f4749e59db978b3630664393ab13edc8acd48c2c80bdf77add6"
          before_revision: 34
          command_digest: "sha256:0cc7d5f194f8ceba7c1919139487dba015293a4c07e69fd386a7c7562d21f9ac"
          effect_ids: []
          event_digests:
            - "sha256:427f71e61cd45b05315b05b4a23594a135ce344c56fc03224bbf1bd9f73b459c"
          mutation_id: "kernel_work_item_claim_required:sha256:32d70fa96a659b4c25896835a71dd46337f3070d99d2ada24301d1e9c4273a73:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
        kernel_work_item_claim_required:sha256:6009300fe5f4e6299035264c80d4b2226dbb85e0d613c6ea63cb4850aafb8deb:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6:
          after_revision: 17
          aggregate_digest: "sha256:0656568a2bda1486d38a3b32eda391e18d8c5c6ba5602d76f6db23ac28b88d18"
          before_revision: 16
          command_digest: "sha256:8f67f28800266fead63e4c2b11ce9f9d1c479183af8b3ee1c43e5f85a51f576e"
          effect_ids: []
          event_digests:
            - "sha256:e8b19d0f1171c266b31a08c8609599da16334f9ba4faa996cb42fa740a4bb919"
          mutation_id: "kernel_work_item_claim_required:sha256:6009300fe5f4e6299035264c80d4b2226dbb85e0d613c6ea63cb4850aafb8deb:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
        kernel_work_item_claim_required:sha256:dd830065a38ce1a94f73cbf0e8ee9078a335e59357c0b3ea20d4723d29768f6e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6:
          after_revision: 42
          aggregate_digest: "sha256:615e818f4688be545da74f4038e59f3a00030574ffb8e293b4bdca4f699d0357"
          before_revision: 41
          command_digest: "sha256:fae53dbc7454292d17921116aa8a1f2b828eda957bfa2c616bcb077558877d0e"
          effect_ids: []
          event_digests:
            - "sha256:0f3d4002748c1fe5c9b27edf96c21ebd328b39f873c0c1c202ff968aa8d326ed"
          mutation_id: "kernel_work_item_claim_required:sha256:dd830065a38ce1a94f73cbf0e8ee9078a335e59357c0b3ea20d4723d29768f6e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        kernel_work_item_claim_required:sha256:f51256664df2087c73e46b7a5fbe027eb0f0c5edb747085cec61afbe433f7e38:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:
          after_revision: 24
          aggregate_digest: "sha256:13d0f5b67b19a06c885b357b16686e52fff5e3dbc3d4ce7fd58d632ee3545466"
          before_revision: 23
          command_digest: "sha256:c90fc4b28e3b4e894cc369bdf7a226d0a6e1b2460afad1a3513e06da0c20387f"
          effect_ids: []
          event_digests:
            - "sha256:da978a8a957d2decf18bef21642c033a2c104a12db24e45baa25efe92d201a2f"
          mutation_id: "kernel_work_item_claim_required:sha256:f51256664df2087c73e46b7a5fbe027eb0f0c5edb747085cec61afbe433f7e38:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        kernel_work_item_execution_required:sha256:60d8e7344153dda086949a7b680a30c6b31e53b99134200d30ec5a40e978aa2e:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d:
          after_revision: 36
          aggregate_digest: "sha256:1349d906022040d4226c087d4bbd11805673f9b87b3f7b8674d1ba25d13aaa10"
          before_revision: 35
          command_digest: "sha256:4492ad8a28c2fe22dadbbec61fc51f9335ba0f08dddec8a478ba70a49c38241e"
          effect_ids: []
          event_digests:
            - "sha256:f81a9e7a84ea42534d646a7ed88db56e99c51d7ff1ee55317f06b041b9b6969b"
          mutation_id: "kernel_work_item_execution_required:sha256:60d8e7344153dda086949a7b680a30c6b31e53b99134200d30ec5a40e978aa2e:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
        kernel_work_item_execution_required:sha256:6902736e10b72789396b7e94d6c44bdee0508f49945ea5114a0fc25b2482f927:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:
          after_revision: 6
          aggregate_digest: "sha256:3940165b7c58c98396ce991faaea1666a25ac65bc3b8bca5c2c9c3e11812086b"
          before_revision: 5
          command_digest: "sha256:a436a43265d8ba1f3a4ea9e159afaf0044f271e7083f5f0c1014d221c1e5faa9"
          effect_ids: []
          event_digests:
            - "sha256:9bccaf730aa6072f8528b3ca573e85bba71cbb335b863885e25689013ddb3d83"
          mutation_id: "kernel_work_item_execution_required:sha256:6902736e10b72789396b7e94d6c44bdee0508f49945ea5114a0fc25b2482f927:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        kernel_work_item_execution_required:sha256:6f43c1c4fe41b33fe3f0f4194a50d3d731a8d78923f934e7ac7110864bb48e58:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:
          after_revision: 11
          aggregate_digest: "sha256:8d7e2493cc675ad84a7286566a0deadfb9f02a87c16d52f3f4c039c655fe9593"
          before_revision: 10
          command_digest: "sha256:893e717a4760fb93c37fdd9b11b19c32b06279d385b00c90a975b043a3a5bcf4"
          effect_ids: []
          event_digests:
            - "sha256:c21e31b29f480c9cca4849935b2326b9787a698528198287c9a223422c2bb39a"
          mutation_id: "kernel_work_item_execution_required:sha256:6f43c1c4fe41b33fe3f0f4194a50d3d731a8d78923f934e7ac7110864bb48e58:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        kernel_work_item_execution_required:sha256:73b780ce103b78f01c77a3c8a2192c9b98358a0a19618bbcc42b6f7074f96224:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6:
          after_revision: 18
          aggregate_digest: "sha256:ed3e64dc4da533aab55f39c5458d130154fedb3450de8315cbefa3fa370d766d"
          before_revision: 17
          command_digest: "sha256:a174cea3669eabb40aa71b9d77c86ce1108d190fb48230f51c302b1f60396bc0"
          effect_ids: []
          event_digests:
            - "sha256:05a99cbb7f40340079084e4ca50069817f34ef260440d93e5e4b5ac098994836"
          mutation_id: "kernel_work_item_execution_required:sha256:73b780ce103b78f01c77a3c8a2192c9b98358a0a19618bbcc42b6f7074f96224:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
        kernel_work_item_execution_required:sha256:9ad1e3d540624f458b525a746c88875a30e4f6c4875c299510a4975ffefe552a:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:
          after_revision: 25
          aggregate_digest: "sha256:edc5c6501618c75fac2d0a9d27f57e1104cdd26cc2397ceea50a51c282fe000d"
          before_revision: 24
          command_digest: "sha256:708fb811e4ed956056a08b3016eb592d6a1ded7b2fc5b8f4502ef2e5dadf241f"
          effect_ids: []
          event_digests:
            - "sha256:3f58e1976940b8fca61832d75f4696bb46261d70f0c85868b5800b1e3dfe39a9"
          mutation_id: "kernel_work_item_execution_required:sha256:9ad1e3d540624f458b525a746c88875a30e4f6c4875c299510a4975ffefe552a:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        kernel_work_item_execution_required:sha256:9f121547d0d28b9dc1853c3a4879e2747a10e4a49af7f9d53b40a200fb68cf4e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:
          after_revision: 30
          aggregate_digest: "sha256:1830ef68ab99dc1ed02d08f3d67993ab2671239827fa8d4def4aa8639255afb9"
          before_revision: 29
          command_digest: "sha256:a00269c04b1d795290e94502042c40e6207edccc9025cdd5043e1556fab32f7f"
          effect_ids: []
          event_digests:
            - "sha256:ace44908ed30cca9b5ef940dd118e0193516752c6ee6b2349b4751c0419e0510"
          mutation_id: "kernel_work_item_execution_required:sha256:9f121547d0d28b9dc1853c3a4879e2747a10e4a49af7f9d53b40a200fb68cf4e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        kernel_work_item_execution_required:sha256:af9f1272a028a95e04b3938e8c6cf3fd40f4c837c75f53730c746c82004e751d:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6:
          after_revision: 43
          aggregate_digest: "sha256:3664d5d5c03e120fa0b7ba7da3ff6c349d64e7b3a5d3ead319012bba991a6366"
          before_revision: 42
          command_digest: "sha256:a1808a91e4c85ec0534ad943762c4dc0694b2744bf4b3604fd6d2a8deb0910f6"
          effect_ids: []
          event_digests:
            - "sha256:632bc80a282034d1abb3a61a4ce79c63a923b819771de7a450d811f0570b905d"
          mutation_id: "kernel_work_item_execution_required:sha256:af9f1272a028a95e04b3938e8c6cf3fd40f4c837c75f53730c746c82004e751d:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        kernel_work_item_inspection_required:sha256:8b11799cf496c88abd8e9c21a4292268969d6bbc113b08779a1c10401440f1d2:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:
          after_revision: 21
          aggregate_digest: "sha256:a2211fada2e41562b1d0341b50617ff1a7bc774fff0574320d10b28f97628aa3"
          before_revision: 20
          command_digest: "sha256:ee26502dfbe7f51301d9e3d0caff5c9d11194509c28a77533096ecd114a77c57"
          effect_ids: []
          event_digests:
            - "sha256:89bb47b49ea482ab6c965bb358ba2bfb7ee5c73b3f211cc71f7a59ae704fca0f"
          mutation_id: "kernel_work_item_inspection_required:sha256:8b11799cf496c88abd8e9c21a4292268969d6bbc113b08779a1c10401440f1d2:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        kernel_work_item_inspection_required:sha256:8e4ee28115f80a1be0f68a5693d69465e21b5260c0d4c03dfef4ce1e4acba316:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6:
          after_revision: 14
          aggregate_digest: "sha256:2fc5eedc5367423cbe21e0c32bcfb6ccdf84f6785f256528361308d142e6cfa3"
          before_revision: 13
          command_digest: "sha256:203f97cc3559e8b8b1037016203b17cd3f5e8ca8355347d7e38a81e037d422d3"
          effect_ids: []
          event_digests:
            - "sha256:c6951d6ea37aed692d61362bce7fc6973b767375cd8588edda2f53f794108ef7"
          mutation_id: "kernel_work_item_inspection_required:sha256:8e4ee28115f80a1be0f68a5693d69465e21b5260c0d4c03dfef4ce1e4acba316:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
        kernel_work_item_inspection_required:sha256:e57c25fac470f5d70c4ec47a7e32dd4d4066159529fe421b698879e8c36b225e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6:
          after_revision: 39
          aggregate_digest: "sha256:b5f5993bfdf69d8ca055a9014e3aebecd59e1d8233df2f4d0357af3096af4ff0"
          before_revision: 38
          command_digest: "sha256:f7bf167d2816cf96da4a3d3a6f68dcf0cab9aab44b7355d741bc6190df957325"
          effect_ids: []
          event_digests:
            - "sha256:2daea29daf97fc4951568c4ad25feaa43af505e499f6624369402951e027a7c7"
          mutation_id: "kernel_work_item_inspection_required:sha256:e57c25fac470f5d70c4ec47a7e32dd4d4066159529fe421b698879e8c36b225e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        kernel_work_item_materialization_required:sha256:8fadf8e0014e7b6496ce9c840ed86f146583d523b483e144d67d70e3473c3ae2:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:
          after_revision: 4
          aggregate_digest: "sha256:1649e063c2782b00c0e0536bb9bf809ccf4ff2fed8bd19c19e03a5d2eaa2f2ad"
          before_revision: 3
          command_digest: "sha256:c63c93a1dea9c1db43714d48416fb7a83edd1b0592a8a886bc3b7c179f07b6c7"
          effect_ids: []
          event_digests:
            - "sha256:620fef14c044bc2ac782d909b5090711b7cf3480fd1dc5b35611ea7d2a8ac339"
          mutation_id: "kernel_work_item_materialization_required:sha256:8fadf8e0014e7b6496ce9c840ed86f146583d523b483e144d67d70e3473c3ae2:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        result:sha256:0862ef4a9f04e34c73fd9dba02e4afae9323bfca20dde7b2af72b77c0fe0a9a3:
          after_revision: 38
          aggregate_digest: "sha256:22bffdb2040b809489fd79f39bcc45537decdea8dd0136fc598c6218b66cc106"
          before_revision: 37
          command_digest: "sha256:2ce5c82344447175aed9666b1a7c8243df669a6763e058c25a48c65b9cf7ed24"
          effect_ids: []
          event_digests:
            - "sha256:da30570e69fec28c3c6b5fa20c5175ef88aa9ffc242c0bef55d6828eeaf4e1e6"
          mutation_id: "result:sha256:0862ef4a9f04e34c73fd9dba02e4afae9323bfca20dde7b2af72b77c0fe0a9a3"
        result:sha256:25178847b622c622e43fa6e1484a8437021ecfe892fe5e2d3d8b3087b125bdc8:
          after_revision: 20
          aggregate_digest: "sha256:c75e91ad03bedf8e7810501e2466cdf1ffc4e8acc85295717306c5772d5fcda7"
          before_revision: 19
          command_digest: "sha256:08bdaf791c91fb54fb2fba4af43226be38b5d4f6db8c708b6bb6900a33bc6bc1"
          effect_ids: []
          event_digests:
            - "sha256:eabd38f555865a5b0dc84647da36c8ce480e530744506ab04bedd08ad3bf89f2"
          mutation_id: "result:sha256:25178847b622c622e43fa6e1484a8437021ecfe892fe5e2d3d8b3087b125bdc8"
        result:sha256:90305df266b1253f4938db27575b23278e82a9588a1dba28bd894833b13fb84a:
          after_revision: 13
          aggregate_digest: "sha256:77816c199ad7950b68b59a255efdafb0368a950e4711356a27707d3602c18362"
          before_revision: 12
          command_digest: "sha256:f19b50f14c60d22475ae78a06b911d82532797a2fdc7f676974047ee2100ecba"
          effect_ids: []
          event_digests:
            - "sha256:b8bdd7af2d89f601c386621d1699e857903310e5dc9cc474c80e684965b343e8"
          mutation_id: "result:sha256:90305df266b1253f4938db27575b23278e82a9588a1dba28bd894833b13fb84a"
        result:sha256:fc2d59d35e03d25e7d5c2e41863f66bf12ecac655bb141c336f41cba63158bd5:
          after_revision: 2
          aggregate_digest: "sha256:f86483ea59127474a308e6205bf83a44ccd3da9c23df7444cc0c800825998521"
          before_revision: 1
          command_digest: "sha256:69fc03cbb4fd9df4f7f483569a09a2bea85910c67f887f5d937c199ec91f215c"
          effect_ids: []
          event_digests:
            - "sha256:eba6160097a8fbfe296c880fb7d9a408ae65d2f80e936c7d0ef21d1b8e523b58"
          mutation_id: "result:sha256:fc2d59d35e03d25e7d5c2e41863f66bf12ecac655bb141c336f41cba63158bd5"
        semantic-stop:sha256:195511b4a97e956ec6056321884d9e3533916760a08602b8fbe101b47b848b2e:
          after_revision: 7
          aggregate_digest: "sha256:0b8c999cc9f930214afd463c57d367aa2439112f61e49430dfbfa25d99e0f594"
          before_revision: 6
          command_digest: "sha256:09db9bfd719a0f2fed49365ea749a439b344f76d4a1d1569312709e31e64c51e"
          effect_ids: []
          event_digests:
            - "sha256:dcad5a6eb6a02a4930ed6f01dbc55ee5e38e037cf3a5fbab3b2b468cff6699ab"
          mutation_id: "semantic-stop:sha256:195511b4a97e956ec6056321884d9e3533916760a08602b8fbe101b47b848b2e"
        semantic-stop:sha256:59a86045dec5fb06495674e719ddd7a0754f8e5d21dee4469fa6a478a18ba44c:
          after_revision: 32
          aggregate_digest: "sha256:266105940365ffc122dee8b61d4404bd35460d4b31cc4ad547067d7e7427126b"
          before_revision: 31
          command_digest: "sha256:5e6093621defa59cd3d1a7d3167ef9deb0577f243e0cb5841dc61c99b810b366"
          effect_ids: []
          event_digests:
            - "sha256:ec55a218f7d3ab8f9f40b41e992319f8c6c0ea32694855d645835e63dffdaae4"
          mutation_id: "semantic-stop:sha256:59a86045dec5fb06495674e719ddd7a0754f8e5d21dee4469fa6a478a18ba44c"
        semantic-stop:sha256:e78b8213558d73b9a11661837778aad9c53a7bd9d1b221f0cc62d949abe8ad17:
          after_revision: 26
          aggregate_digest: "sha256:7a84aa6fdcba7fb0c66d7e38821d6561e58b87f103d3f852d152c9d05367222a"
          before_revision: 25
          command_digest: "sha256:7f3f405476c892d2c554680763a6741e89e8161eedb69d05f133cecd71aaa623"
          effect_ids: []
          event_digests:
            - "sha256:acd449d827f77e11461dc54057b15703c705e70848963b9172b67da72a99cc6f"
          mutation_id: "semantic-stop:sha256:e78b8213558d73b9a11661837778aad9c53a7bd9d1b221f0cc62d949abe8ad17"
        sha256:0a9878ae44464a863190a3a4e0dc9074ee6bbf73ef91554ab08914bb62421661:
          after_revision: 34
          aggregate_digest: "sha256:ed8eeee3412cc53444f455b9eb3b04961212ba1656d9b115d33bf5fb4dde6414"
          before_revision: 33
          command_digest: "sha256:e82abece514a05628154653721d7478d0e6abc4100fbd3e89996d4e9ce974d73"
          effect_ids: []
          event_digests:
            - "sha256:448248e124c566080d23cb369d76e9e5c2577d2e6b8f25cb8979d3e78fa06a49"
          mutation_id: "sha256:0a9878ae44464a863190a3a4e0dc9074ee6bbf73ef91554ab08914bb62421661"
        sha256:537861f5f92bd7d17c2cbb4902b6c7ae61b57b37ce8c898403232009cebb5f45:
          after_revision: 9
          aggregate_digest: "sha256:d0f25375931b730ddc05fb6c2d4c1827c0506f8ee9c0435d520a41630d455813"
          before_revision: 8
          command_digest: "sha256:91b7aef15a9f35db96b7bf2bcbaa65a74d70f331b3357fe05c07651ac5e9f055"
          effect_ids: []
          event_digests:
            - "sha256:35731d5340cf60b7ff6b6aafde68f0fa765103ffaeee22bbf3f8eadf57857089"
          mutation_id: "sha256:537861f5f92bd7d17c2cbb4902b6c7ae61b57b37ce8c898403232009cebb5f45"
        sha256:53bdc12554baf8c6b6c40faad46a793dcf79722b1c160ee83e6e09e9b889d506:
          after_revision: 37
          aggregate_digest: "sha256:cc78945f00d2b5c5ace4bf46af06927a25ff48bb62423733e9835c7ae4c2cf69"
          before_revision: 36
          command_digest: "sha256:12527694d4bfd3a0f374a2db4f3858196d4e95384ed67e45f7c468703f1cab8a"
          effect_ids: []
          event_digests:
            - "sha256:887a17fd06e9c529c5bee485db7042d7e38a9468035cc8ac9b1e1fcb9de6aafd"
          mutation_id: "sha256:53bdc12554baf8c6b6c40faad46a793dcf79722b1c160ee83e6e09e9b889d506"
        sha256:61cfabaf4bdd5035e33a082ec48e94d082110781bfa067cc5f3fe50093bedc9f:
          after_revision: 12
          aggregate_digest: "sha256:c2ec4dfe10cc834b4c03a6af108f57095ff493aa13a4784ea9efd63c2a453f46"
          before_revision: 11
          command_digest: "sha256:d0e23b40aad4c8ab1a01a5321d0ecef6eb00385bb5516a7c0b70c828a8bb4d77"
          effect_ids: []
          event_digests:
            - "sha256:dd15155fc193a99543805aef250011df715c3d381080844aa3ddf769c186dca4"
          mutation_id: "sha256:61cfabaf4bdd5035e33a082ec48e94d082110781bfa067cc5f3fe50093bedc9f"
        sha256:68704526f0a557ce508320a20d12b93a38b9aee59ff9097b4174d4948edbfcf2:
          after_revision: 3
          aggregate_digest: "sha256:13ab075104af6f5e76f3cfb027919817afcf93a68b58cdc141601a088829c1f9"
          before_revision: 2
          command_digest: "sha256:39731fe99e926c8776ee7fc64e157b434df99b6f7431220484f10b1860710076"
          effect_ids: []
          event_digests:
            - "sha256:cee10a971b65edfde9ef494e3e71d23c52dc4a818230dd46a8570d6886e00ca8"
          mutation_id: "sha256:68704526f0a557ce508320a20d12b93a38b9aee59ff9097b4174d4948edbfcf2"
        sha256:ca215cb77ef66f88255ea498692c6e092f44ed63c5dc5747ad983eebc140d147:
          after_revision: 28
          aggregate_digest: "sha256:d1adb80b7b13fcf97248e49c83b4ef3cf611591185f7ff44154f11b6bc07ae80"
          before_revision: 27
          command_digest: "sha256:d92cbcbcee4067dab72cbd106147da3f5428c5965d21d165438e51c937662f37"
          effect_ids: []
          event_digests:
            - "sha256:2562cb41fc9c8a243c021b4e678a343f0cda96cf685ea71036e74ae0d6da6e0e"
          mutation_id: "sha256:ca215cb77ef66f88255ea498692c6e092f44ed63c5dc5747ad983eebc140d147"
        sha256:d4ee118ae6620a94a43c2ec92a32ada7258580dfc140eccf3b176529146c7665:
          after_revision: 19
          aggregate_digest: "sha256:8cc26851b54ef20fee732a3b60e6ad7faecef045fea4fabe65a8fcebc3e5b872"
          before_revision: 18
          command_digest: "sha256:a966c6a9f40aa0777a5c51097114ed1131e21d0e257629f61a1e4110e5f0b3dc"
          effect_ids: []
          event_digests:
            - "sha256:4d10ba6267bafabdc2a253adb22a24468494539a5f8e986ce33193362b15ffbd"
          mutation_id: "sha256:d4ee118ae6620a94a43c2ec92a32ada7258580dfc140eccf3b176529146c7665"
        sha256:f11f83dbbf3cbbab3883363d858b00aa65972a53051b662b326213a6138bafef:
          after_revision: 31
          aggregate_digest: "sha256:69a1892f1e05a011bf31a358372377b9650558775ea2012dd124b058a72203bb"
          before_revision: 30
          command_digest: "sha256:63c41252c67b6dc183c0415478d2857321aa04bcc4b62b0c7313ff02a4d37658"
          effect_ids: []
          event_digests:
            - "sha256:f3d5829ba72e41d498e1cec2d3358f1fb2f1be8f3df6afc34bef9fec45dc59df"
          mutation_id: "sha256:f11f83dbbf3cbbab3883363d858b00aa65972a53051b662b326213a6138bafef"
        validation-resolution:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6:
          after_revision: 23
          aggregate_digest: "sha256:4d30a2ec90b3eaba7a8673703a9ac526307dd00fac8cd19e90e518171ab5f363"
          before_revision: 22
          command_digest: "sha256:e55389d395847d4b55038e1c6c341462a605481627b5975d2a1b2d1a00437bd7"
          effect_ids: []
          event_digests:
            - "sha256:8e21225b9e9a00a620c97f210c94ea8d5bd8389ae934ee71f3464812318a6173"
          mutation_id: "validation-resolution:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6"
        validation-resolution:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3:
          after_revision: 41
          aggregate_digest: "sha256:81801ea1892d62c7f049b4bf236096c98c1ea40a995a6d9bb77d74118c1be7be"
          before_revision: 40
          command_digest: "sha256:e7c7b2728d5b97fab2cefd0d42edaa057f6f76cdea7af14dbad72bf22f2c6dbd"
          effect_ids: []
          event_digests:
            - "sha256:59988b0be4b3d5796e495518c58e5f0f2bb23f4642ed4a04877b57deb6e7c8e7"
          mutation_id: "validation-resolution:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3"
        validation-resolution:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d:
          after_revision: 16
          aggregate_digest: "sha256:b3236ccbd84f080ef527df766434f3d6462d4d232567f1996f101c0d048fc41f"
          before_revision: 15
          command_digest: "sha256:0c1443aa9273dbc80b20cc3629cc0583c915e6b9bdeb1139a3b7b32c84e2e6b2"
          effect_ids: []
          event_digests:
            - "sha256:4adcf35848c8767d62007bc7024065d49c2df4c6b342015bed716dc332013491"
          mutation_id: "validation-resolution:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d"
        validation:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6:
          after_revision: 22
          aggregate_digest: "sha256:e8672682688a14dc572d6b14e5ca3e24b0b1c96320b2b13b980ef856673f5c32"
          before_revision: 21
          command_digest: "sha256:922a090ef93e40d6699410ce24d7003ff173289dbe16a20312fe0a5d2c69a524"
          effect_ids: []
          event_digests:
            - "sha256:90717c6c4da7d083c5c71465ffd063bfc9b5df288e9ffa53e5d4d6381390fc11"
          mutation_id: "validation:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6"
        validation:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3:
          after_revision: 40
          aggregate_digest: "sha256:aec35fef9b02aa10c233434e890f2f4f434279880fa61cd50f5f95c36740d21a"
          before_revision: 39
          command_digest: "sha256:f77fdca6e744c40d8463f488e623adf1eb8da81ebbd3d58da41601db610baea5"
          effect_ids: []
          event_digests:
            - "sha256:fb3918b8ff2d7e5b6bb914b7358708f7d5a8804b28ffc968fc7f5cea9e79010a"
          mutation_id: "validation:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3"
        validation:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d:
          after_revision: 15
          aggregate_digest: "sha256:101ab89f65812ffb55a093a7f435dd5014a046e527fc120f77557312db414f1a"
          before_revision: 14
          command_digest: "sha256:d6024557fd77bb9738f2232905d7ed230e58a1aa7dd49146d7e83312bc16587d"
          effect_ids: []
          event_digests:
            - "sha256:8ccffe457722801569ff8bdfe09834e1e2462c10af9ea57b527d2173641d1328"
          mutation_id: "validation:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:15daa8fbee4210999ea82cf8cc341a146ff7e04668c9584d0669b483b6385de5"
          digest: "sha256:557540c9cc45b35ec7969b2e3069d4e4b63c2ef324546a4cdca760a8f639aa68"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:47acd3109bf26b9b90da921a03264bcb574f47b491aaa73ba8cdff8696d50996"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-04-accepted"
              id: "lc-04"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:53dfb3e42aa45f26304a78ee5fc206e994a24a99fedbfcdd733d9023e0ae8869"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/runner"
              expected_outputs:
                - "lc-05-accepted"
              id: "lc-05"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:44523e441d49a652c58cf013a7dc7c2f3db97de2694aadc6dbacb4e3ef3b20e0"
              depends_on:
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/runner/context"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-06-accepted"
              id: "lc-06"
              optional: false
              required_inputs:
                - "lc-05-accepted"
            -
              contract_digest: "sha256:4b7dc2163c0c75a486adffae2c7befa5aebb5202f5b16fe2872e7780ab842f28"
              depends_on:
                - "lc-04"
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-07-accepted"
              id: "lc-07"
              optional: false
              required_inputs:
                - "lc-04-accepted"
                - "lc-05-accepted"
            -
              contract_digest: "sha256:c35e5c9d3f9a8de1607a0e07f398c885e8462a22e1795e1c22e292a1e6a21bfa"
              depends_on:
                - "lc-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-08-accepted"
              id: "lc-08"
              optional: false
              required_inputs:
                - "lc-07-accepted"
            -
              contract_digest: "sha256:9c2c369316cdabd11d3075ccf553131d565f7334b9a16ad97f4a9da31603e697"
              depends_on:
                - "lc-07"
                - "lc-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-09-accepted"
              id: "lc-09"
              optional: false
              required_inputs:
                - "lc-07-accepted"
                - "lc-08-accepted"
            -
              contract_digest: "sha256:c3a8eb87b2bfe1ed211d5e20d924c437b86bcd9af9a2005c7cab188286460941"
              depends_on:
                - "lc-05"
                - "lc-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/branch"
              expected_outputs:
                - "lc-10-accepted"
              id: "lc-10"
              optional: false
              required_inputs:
                - "lc-05-accepted"
                - "lc-07-accepted"
            -
              contract_digest: "sha256:799d83a6235842eb3679e63d656adf39e226950839eb659258e54969868b3797"
              depends_on:
                - "lc-10"
                - "lc-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands"
              expected_outputs:
                - "lc-11-accepted"
              id: "lc-11"
              optional: false
              required_inputs:
                - "lc-10-accepted"
                - "lc-08-accepted"
            -
              contract_digest: "sha256:163b50b05a0c8b0b9b34bfa82547f4827ed1a73b4f535e163e4011262247b4ca"
              depends_on:
                - "lc-09"
                - "lc-11"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-12-accepted"
              id: "lc-12"
              optional: false
              required_inputs:
                - "lc-09-accepted"
                - "lc-11-accepted"
            -
              contract_digest: "sha256:8740386609f73128538a99d8383760506c400b3e14eccfb098dbb7443c1bc0c6"
              depends_on:
                - "lc-06"
                - "lc-12"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "schema"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-13-accepted"
              id: "lc-13"
              optional: false
              required_inputs:
                - "lc-06-accepted"
                - "lc-12-accepted"
            -
              contract_digest: "sha256:c5e074b9548ddda6c44292c97ba4ee766fea7faece7be02e6fda6443e55ea3d4"
              depends_on:
                - "lc-13"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "schema"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-14-accepted"
              id: "lc-14"
              optional: false
              required_inputs:
                - "lc-13-accepted"
            -
              contract_digest: "sha256:10b9f3e2e4827f46488efcc22307bd6d6c5e5221087533e5268fc50911033768"
              depends_on:
                - "lc-14"
                - "lc-12"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
              expected_outputs:
                - "lc-15-accepted"
              id: "lc-15"
              optional: false
              required_inputs:
                - "lc-14-accepted"
                - "lc-12-accepted"
            -
              contract_digest: "sha256:07c1f5ad57fa7e9c38c59b8bbaae458b60b6db6c3babc280c5ea2cd9e260eece"
              depends_on:
                - "lc-15"
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
              expected_outputs:
                - "lc-16-accepted"
              id: "lc-16"
              optional: false
              required_inputs:
                - "lc-15-accepted"
                - "lc-05-accepted"
            -
              contract_digest: "sha256:4a5375bfb085dc3f71dad8717664ab487bec5c377704d09118b5f898f70c2349"
              depends_on:
                - "lc-15"
                - "lc-16"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands/scenario"
              expected_outputs:
                - "lc-17-accepted"
              id: "lc-17"
              optional: false
              required_inputs:
                - "lc-15-accepted"
                - "lc-16-accepted"
            -
              contract_digest: "sha256:89ee0558368de33085f7ea32a0c991efd63f7b2a3e361e0b26254517fa760a03"
              depends_on:
                - "lc-16"
                - "lc-17"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "scripts/checks"
              expected_outputs:
                - "lc-18-accepted"
              id: "lc-18"
              optional: false
              required_inputs:
                - "lc-16-accepted"
                - "lc-17-accepted"
            -
              contract_digest: "sha256:bf519cf98cbc32fc7951b50b5ab8ce524d0695d4b99f9aff52e9cf93917f5b98"
              depends_on:
                - "lc-18"
                - "lc-14"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                  - "dependencies"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "scripts/checks"
              expected_outputs:
                - "lc-19-accepted"
              id: "lc-19"
              optional: false
              required_inputs:
                - "lc-18-accepted"
                - "lc-14-accepted"
            -
              contract_digest: "sha256:7f30386a191ddd47be3105d867293b3e44b2fee00cf53c0686899e0f30137248"
              depends_on:
                - "lc-19"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-20-accepted"
              id: "lc-20"
              optional: false
              required_inputs:
                - "lc-19-accepted"
            -
              contract_digest: "sha256:baa691a0242f4c2e76ed3b4902d5ddc0041a9994f03e5f8d14c278961cf7050b"
              depends_on:
                - "lc-17"
                - "lc-18"
                - "lc-19"
                - "lc-20"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "ci"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "scripts/release"
                  - "scripts/checks"
                  - "packages/agentplane/src"
                  - "packages/core/src"
                  - "packages/testkit/src"
              expected_outputs:
                - "lc-21-accepted"
              id: "lc-21"
              optional: false
              required_inputs:
                - "lc-17-accepted"
                - "lc-18-accepted"
                - "lc-19-accepted"
                - "lc-20-accepted"
            -
              contract_digest: "sha256:9ac2c55be3adc2760154761e39d6650c9c7d5c83eed0349df61f695a7d994acd"
              depends_on:
                - "lc-21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "release_metadata"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "scripts/bench"
                  - "benchmarks"
                  - "artifacts"
              expected_outputs:
                - "lc-22-accepted"
              id: "lc-22"
              optional: false
              required_inputs:
                - "lc-21-accepted"
            -
              contract_digest: "sha256:e3d16a76e54285b7a813b785efe21816b59298a3473967b293b66954175327d0"
              depends_on:
                - "lc-21"
                - "lc-22"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "documentation"
                  - "source_code"
                  - "public_api"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "docs/user"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src"
                  - "scripts/checks"
              expected_outputs:
                - "lc-23-accepted"
              id: "lc-23"
              optional: false
              required_inputs:
                - "lc-21-accepted"
                - "lc-22-accepted"
            -
              contract_digest: "sha256:a64ce2f177b9910ef1ae6195eb3e061095524e3787d9d63e6ede31a621078ea6"
              depends_on:
                - "lc-23"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "ci"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "vitest.workspace.ts"
                  - "scripts/checks"
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/testkit/src"
              expected_outputs:
                - "lc-24-accepted"
              id: "lc-24"
              optional: false
              required_inputs:
                - "lc-23-accepted"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:4ae415ad6b5d5ef08cfeafb221ae1663600d6c2159fdcf18c12c408c95ed5c13"
          digest: "sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:47acd3109bf26b9b90da921a03264bcb574f47b491aaa73ba8cdff8696d50996"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
              expected_outputs:
                - "lc-04-accepted"
              id: "lc-04"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:53dfb3e42aa45f26304a78ee5fc206e994a24a99fedbfcdd733d9023e0ae8869"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/runner"
              expected_outputs:
                - "lc-05-accepted"
              id: "lc-05"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:44523e441d49a652c58cf013a7dc7c2f3db97de2694aadc6dbacb4e3ef3b20e0"
              depends_on:
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/runner/context"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-06-accepted"
              id: "lc-06"
              optional: false
              required_inputs:
                - "lc-05-accepted"
            -
              contract_digest: "sha256:4b7dc2163c0c75a486adffae2c7befa5aebb5202f5b16fe2872e7780ab842f28"
              depends_on:
                - "lc-04"
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-07-accepted"
              id: "lc-07"
              optional: false
              required_inputs:
                - "lc-04-accepted"
                - "lc-05-accepted"
            -
              contract_digest: "sha256:c35e5c9d3f9a8de1607a0e07f398c885e8462a22e1795e1c22e292a1e6a21bfa"
              depends_on:
                - "lc-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-08-accepted"
              id: "lc-08"
              optional: false
              required_inputs:
                - "lc-07-accepted"
            -
              contract_digest: "sha256:9c2c369316cdabd11d3075ccf553131d565f7334b9a16ad97f4a9da31603e697"
              depends_on:
                - "lc-07"
                - "lc-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-09-accepted"
              id: "lc-09"
              optional: false
              required_inputs:
                - "lc-07-accepted"
                - "lc-08-accepted"
            -
              contract_digest: "sha256:c3a8eb87b2bfe1ed211d5e20d924c437b86bcd9af9a2005c7cab188286460941"
              depends_on:
                - "lc-05"
                - "lc-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/branch"
              expected_outputs:
                - "lc-10-accepted"
              id: "lc-10"
              optional: false
              required_inputs:
                - "lc-05-accepted"
                - "lc-07-accepted"
            -
              contract_digest: "sha256:799d83a6235842eb3679e63d656adf39e226950839eb659258e54969868b3797"
              depends_on:
                - "lc-10"
                - "lc-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands"
              expected_outputs:
                - "lc-11-accepted"
              id: "lc-11"
              optional: false
              required_inputs:
                - "lc-10-accepted"
                - "lc-08-accepted"
            -
              contract_digest: "sha256:163b50b05a0c8b0b9b34bfa82547f4827ed1a73b4f535e163e4011262247b4ca"
              depends_on:
                - "lc-09"
                - "lc-11"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-12-accepted"
              id: "lc-12"
              optional: false
              required_inputs:
                - "lc-09-accepted"
                - "lc-11-accepted"
            -
              contract_digest: "sha256:8740386609f73128538a99d8383760506c400b3e14eccfb098dbb7443c1bc0c6"
              depends_on:
                - "lc-06"
                - "lc-12"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "schema"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-13-accepted"
              id: "lc-13"
              optional: false
              required_inputs:
                - "lc-06-accepted"
                - "lc-12-accepted"
            -
              contract_digest: "sha256:c5e074b9548ddda6c44292c97ba4ee766fea7faece7be02e6fda6443e55ea3d4"
              depends_on:
                - "lc-13"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "schema"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-14-accepted"
              id: "lc-14"
              optional: false
              required_inputs:
                - "lc-13-accepted"
            -
              contract_digest: "sha256:10b9f3e2e4827f46488efcc22307bd6d6c5e5221087533e5268fc50911033768"
              depends_on:
                - "lc-14"
                - "lc-12"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
              expected_outputs:
                - "lc-15-accepted"
              id: "lc-15"
              optional: false
              required_inputs:
                - "lc-14-accepted"
                - "lc-12-accepted"
            -
              contract_digest: "sha256:07c1f5ad57fa7e9c38c59b8bbaae458b60b6db6c3babc280c5ea2cd9e260eece"
              depends_on:
                - "lc-15"
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
              expected_outputs:
                - "lc-16-accepted"
              id: "lc-16"
              optional: false
              required_inputs:
                - "lc-15-accepted"
                - "lc-05-accepted"
            -
              contract_digest: "sha256:4a5375bfb085dc3f71dad8717664ab487bec5c377704d09118b5f898f70c2349"
              depends_on:
                - "lc-15"
                - "lc-16"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands/scenario"
              expected_outputs:
                - "lc-17-accepted"
              id: "lc-17"
              optional: false
              required_inputs:
                - "lc-15-accepted"
                - "lc-16-accepted"
            -
              contract_digest: "sha256:89ee0558368de33085f7ea32a0c991efd63f7b2a3e361e0b26254517fa760a03"
              depends_on:
                - "lc-16"
                - "lc-17"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "scripts/checks"
              expected_outputs:
                - "lc-18-accepted"
              id: "lc-18"
              optional: false
              required_inputs:
                - "lc-16-accepted"
                - "lc-17-accepted"
            -
              contract_digest: "sha256:bf519cf98cbc32fc7951b50b5ab8ce524d0695d4b99f9aff52e9cf93917f5b98"
              depends_on:
                - "lc-18"
                - "lc-14"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                  - "dependencies"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "scripts/checks"
              expected_outputs:
                - "lc-19-accepted"
              id: "lc-19"
              optional: false
              required_inputs:
                - "lc-18-accepted"
                - "lc-14-accepted"
            -
              contract_digest: "sha256:7f30386a191ddd47be3105d867293b3e44b2fee00cf53c0686899e0f30137248"
              depends_on:
                - "lc-19"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-20-accepted"
              id: "lc-20"
              optional: false
              required_inputs:
                - "lc-19-accepted"
            -
              contract_digest: "sha256:baa691a0242f4c2e76ed3b4902d5ddc0041a9994f03e5f8d14c278961cf7050b"
              depends_on:
                - "lc-17"
                - "lc-18"
                - "lc-19"
                - "lc-20"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "ci"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "scripts/release"
                  - "scripts/checks"
                  - "packages/agentplane/src"
                  - "packages/core/src"
                  - "packages/testkit/src"
              expected_outputs:
                - "lc-21-accepted"
              id: "lc-21"
              optional: false
              required_inputs:
                - "lc-17-accepted"
                - "lc-18-accepted"
                - "lc-19-accepted"
                - "lc-20-accepted"
            -
              contract_digest: "sha256:9ac2c55be3adc2760154761e39d6650c9c7d5c83eed0349df61f695a7d994acd"
              depends_on:
                - "lc-21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "release_metadata"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "scripts/bench"
                  - "benchmarks"
                  - "artifacts"
              expected_outputs:
                - "lc-22-accepted"
              id: "lc-22"
              optional: false
              required_inputs:
                - "lc-21-accepted"
            -
              contract_digest: "sha256:e3d16a76e54285b7a813b785efe21816b59298a3473967b293b66954175327d0"
              depends_on:
                - "lc-21"
                - "lc-22"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "documentation"
                  - "source_code"
                  - "public_api"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "docs/user"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src"
                  - "scripts/checks"
              expected_outputs:
                - "lc-23-accepted"
              id: "lc-23"
              optional: false
              required_inputs:
                - "lc-21-accepted"
                - "lc-22-accepted"
            -
              contract_digest: "sha256:a64ce2f177b9910ef1ae6195eb3e061095524e3787d9d63e6ede31a621078ea6"
              depends_on:
                - "lc-23"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "ci"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "vitest.workspace.ts"
                  - "scripts/checks"
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/testkit/src"
              expected_outputs:
                - "lc-24-accepted"
              id: "lc-24"
              optional: false
              required_inputs:
                - "lc-23-accepted"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:e32d451755ffd8ef5ac5337ce74b3f1c698dc5ea0de5d187d4c020bc17745dfc"
          digest: "sha256:0a73f0924aad52add32c44a143492722c4a201ee86f51b618388ed54fdff0391"
          revision: 3
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:47acd3109bf26b9b90da921a03264bcb574f47b491aaa73ba8cdff8696d50996"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
              expected_outputs:
                - "lc-04-accepted"
              id: "lc-04"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:53dfb3e42aa45f26304a78ee5fc206e994a24a99fedbfcdd733d9023e0ae8869"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/runner"
              expected_outputs:
                - "lc-05-accepted"
              id: "lc-05"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:44523e441d49a652c58cf013a7dc7c2f3db97de2694aadc6dbacb4e3ef3b20e0"
              depends_on:
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/runner/context"
                  - "packages/core/src/tasks/task-centric"
                  - "packages/core/src/tasks/kernel-semantic.ts"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runner/usecases"
              expected_outputs:
                - "lc-06-accepted"
              id: "lc-06"
              optional: false
              required_inputs:
                - "lc-05-accepted"
            -
              contract_digest: "sha256:4b7dc2163c0c75a486adffae2c7befa5aebb5202f5b16fe2872e7780ab842f28"
              depends_on:
                - "lc-04"
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-07-accepted"
              id: "lc-07"
              optional: false
              required_inputs:
                - "lc-04-accepted"
                - "lc-05-accepted"
            -
              contract_digest: "sha256:c35e5c9d3f9a8de1607a0e07f398c885e8462a22e1795e1c22e292a1e6a21bfa"
              depends_on:
                - "lc-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-08-accepted"
              id: "lc-08"
              optional: false
              required_inputs:
                - "lc-07-accepted"
            -
              contract_digest: "sha256:9c2c369316cdabd11d3075ccf553131d565f7334b9a16ad97f4a9da31603e697"
              depends_on:
                - "lc-07"
                - "lc-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-09-accepted"
              id: "lc-09"
              optional: false
              required_inputs:
                - "lc-07-accepted"
                - "lc-08-accepted"
            -
              contract_digest: "sha256:c3a8eb87b2bfe1ed211d5e20d924c437b86bcd9af9a2005c7cab188286460941"
              depends_on:
                - "lc-05"
                - "lc-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/branch"
              expected_outputs:
                - "lc-10-accepted"
              id: "lc-10"
              optional: false
              required_inputs:
                - "lc-05-accepted"
                - "lc-07-accepted"
            -
              contract_digest: "sha256:799d83a6235842eb3679e63d656adf39e226950839eb659258e54969868b3797"
              depends_on:
                - "lc-10"
                - "lc-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands"
              expected_outputs:
                - "lc-11-accepted"
              id: "lc-11"
              optional: false
              required_inputs:
                - "lc-10-accepted"
                - "lc-08-accepted"
            -
              contract_digest: "sha256:163b50b05a0c8b0b9b34bfa82547f4827ed1a73b4f535e163e4011262247b4ca"
              depends_on:
                - "lc-09"
                - "lc-11"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-centric"
              expected_outputs:
                - "lc-12-accepted"
              id: "lc-12"
              optional: false
              required_inputs:
                - "lc-09-accepted"
                - "lc-11-accepted"
            -
              contract_digest: "sha256:8740386609f73128538a99d8383760506c400b3e14eccfb098dbb7443c1bc0c6"
              depends_on:
                - "lc-06"
                - "lc-12"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "schema"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-13-accepted"
              id: "lc-13"
              optional: false
              required_inputs:
                - "lc-06-accepted"
                - "lc-12-accepted"
            -
              contract_digest: "sha256:c5e074b9548ddda6c44292c97ba4ee766fea7faece7be02e6fda6443e55ea3d4"
              depends_on:
                - "lc-13"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "schema"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-14-accepted"
              id: "lc-14"
              optional: false
              required_inputs:
                - "lc-13-accepted"
            -
              contract_digest: "sha256:10b9f3e2e4827f46488efcc22307bd6d6c5e5221087533e5268fc50911033768"
              depends_on:
                - "lc-14"
                - "lc-12"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
              expected_outputs:
                - "lc-15-accepted"
              id: "lc-15"
              optional: false
              required_inputs:
                - "lc-14-accepted"
                - "lc-12-accepted"
            -
              contract_digest: "sha256:07c1f5ad57fa7e9c38c59b8bbaae458b60b6db6c3babc280c5ea2cd9e260eece"
              depends_on:
                - "lc-15"
                - "lc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
              expected_outputs:
                - "lc-16-accepted"
              id: "lc-16"
              optional: false
              required_inputs:
                - "lc-15-accepted"
                - "lc-05-accepted"
            -
              contract_digest: "sha256:4a5375bfb085dc3f71dad8717664ab487bec5c377704d09118b5f898f70c2349"
              depends_on:
                - "lc-15"
                - "lc-16"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands/scenario"
              expected_outputs:
                - "lc-17-accepted"
              id: "lc-17"
              optional: false
              required_inputs:
                - "lc-15-accepted"
                - "lc-16-accepted"
            -
              contract_digest: "sha256:89ee0558368de33085f7ea32a0c991efd63f7b2a3e361e0b26254517fa760a03"
              depends_on:
                - "lc-16"
                - "lc-17"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "scripts/checks"
              expected_outputs:
                - "lc-18-accepted"
              id: "lc-18"
              optional: false
              required_inputs:
                - "lc-16-accepted"
                - "lc-17-accepted"
            -
              contract_digest: "sha256:bf519cf98cbc32fc7951b50b5ab8ce524d0695d4b99f9aff52e9cf93917f5b98"
              depends_on:
                - "lc-18"
                - "lc-14"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "public_api"
                  - "dependencies"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "scripts/checks"
              expected_outputs:
                - "lc-19-accepted"
              id: "lc-19"
              optional: false
              required_inputs:
                - "lc-18-accepted"
                - "lc-14-accepted"
            -
              contract_digest: "sha256:7f30386a191ddd47be3105d867293b3e44b2fee00cf53c0686899e0f30137248"
              depends_on:
                - "lc-19"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "lc-20-accepted"
              id: "lc-20"
              optional: false
              required_inputs:
                - "lc-19-accepted"
            -
              contract_digest: "sha256:baa691a0242f4c2e76ed3b4902d5ddc0041a9994f03e5f8d14c278961cf7050b"
              depends_on:
                - "lc-17"
                - "lc-18"
                - "lc-19"
                - "lc-20"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "ci"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "scripts/release"
                  - "scripts/checks"
                  - "packages/agentplane/src"
                  - "packages/core/src"
                  - "packages/testkit/src"
              expected_outputs:
                - "lc-21-accepted"
              id: "lc-21"
              optional: false
              required_inputs:
                - "lc-17-accepted"
                - "lc-18-accepted"
                - "lc-19-accepted"
                - "lc-20-accepted"
            -
              contract_digest: "sha256:9ac2c55be3adc2760154761e39d6650c9c7d5c83eed0349df61f695a7d994acd"
              depends_on:
                - "lc-21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "release_metadata"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "scripts/bench"
                  - "benchmarks"
                  - "artifacts"
              expected_outputs:
                - "lc-22-accepted"
              id: "lc-22"
              optional: false
              required_inputs:
                - "lc-21-accepted"
            -
              contract_digest: "sha256:e3d16a76e54285b7a813b785efe21816b59298a3473967b293b66954175327d0"
              depends_on:
                - "lc-21"
                - "lc-22"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "documentation"
                  - "source_code"
                  - "public_api"
                  - "tests"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "docs/user"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src"
                  - "scripts/checks"
              expected_outputs:
                - "lc-23-accepted"
              id: "lc-23"
              optional: false
              required_inputs:
                - "lc-21-accepted"
                - "lc-22-accepted"
            -
              contract_digest: "sha256:a64ce2f177b9910ef1ae6195eb3e061095524e3787d9d63e6ede31a621078ea6"
              depends_on:
                - "lc-23"
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "ci"
                resources:
                  - "workspace:0.7.11-source"
                scope_roots:
                  - "vitest.workspace.ts"
                  - "scripts/checks"
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/testkit/src"
              expected_outputs:
                - "lc-24-accepted"
              id: "lc-24"
              optional: false
              required_inputs:
                - "lc-23-accepted"
      revision: 43
      schema_version: 1
      state: "ACTIVE"
      work_items:
        lc-04:
          attempt: 2
          claim_id: "sha256:363e78b78c7a19e5fd9164fc4d5c9ced5d897e6db3cd425fc2b8f538c2d9bc7e"
          definition:
            contract_digest: "sha256:47acd3109bf26b9b90da921a03264bcb574f47b491aaa73ba8cdff8696d50996"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
            expected_outputs:
              - "lc-04-accepted"
            id: "lc-04"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:efe78d431b4467c130dc0d9db8ea7598c947f4bab7afca0756a68caa59f0594a"
              id: "lc-04-accepted"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-04"
          result_digest: "sha256:cdc18aa86d1cb6408aedd3509c15c556cf1c9a38333d39f2f369e772db324acf"
          revision: 12
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:8c203d031e6958259117341b5b47b0a9d0b775edb1791a11e849c05c249db3aa"
              - "sha256:989edb651797dcdf326565226087708c7aaca6f3d7b4d3e960f499f06aa27ab5"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:ac0247f5c60e8deb35a32738dc192cf173750c451610193d66d41a2394da953e"
              environment_digest: "sha256:ea0e6ea6d37b5331b65e27f229d96bb779cc1782d9b20efcee7800d0a4fafd43"
              implementation_identity: "sha256:cdc18aa86d1cb6408aedd3509c15c556cf1c9a38333d39f2f369e772db324acf"
              toolchain_digest: "sha256:9b8e2f536fd93a9b0d53b0281e098ff471370a74a3233be34889c0f2430e83ca"
            observed_at: "2026-09-21T03:49:07.541Z"
            status: "PASSED"
        lc-05:
          attempt: 1
          claim_id: "sha256:a66957fd50b4f3ad9ea49502843f40bc0fe2aff05fa60f0a24cb9ebe7a4d42e8"
          definition:
            contract_digest: "sha256:53dfb3e42aa45f26304a78ee5fc206e994a24a99fedbfcdd733d9023e0ae8869"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/core/src/runner"
            expected_outputs:
              - "lc-05-accepted"
            id: "lc-05"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:f7e1781acf554fca306da3675988def68b25ca795ee8e5359efb443bd142a87d"
              id: "lc-05-accepted"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-05"
          result_digest: "sha256:7bbcb74d070ed63dd7e2f6c1dfd4ee6150454cda79d2fa6fc90010aa9db7ca9e"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:a9d259a68d26be725cdc4d156083427b548064fc4d94133a874b7a2f2b00ad7c"
              - "sha256:a914628925a9ab423d21cef282c0fe233c7267783192f30f06bdc4a5f2e51bfc"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:732fcec7c96396e5d4ed59affe2d67a1b187387ec346825660e7008fc5352858"
              environment_digest: "sha256:334c88bc7784376c3875f591b21dfa66de8726be56c9e1a188ceb93e33781623"
              implementation_identity: "sha256:7bbcb74d070ed63dd7e2f6c1dfd4ee6150454cda79d2fa6fc90010aa9db7ca9e"
              toolchain_digest: "sha256:9b8e2f536fd93a9b0d53b0281e098ff471370a74a3233be34889c0f2430e83ca"
            observed_at: "2026-09-21T03:57:28.125Z"
            status: "PASSED"
        lc-06:
          attempt: 3
          claim_id: "sha256:f4df15cb720bd1ea6e812ed9b47c68453bfb89387c72fa975c538b717d420948"
          definition:
            contract_digest: "sha256:44523e441d49a652c58cf013a7dc7c2f3db97de2694aadc6dbacb4e3ef3b20e0"
            depends_on:
              - "lc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/agentplane/src/runner/context"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/kernel-semantic.ts"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runner/usecases"
                - "schemas"
            expected_outputs:
              - "lc-06-accepted"
            id: "lc-06"
            optional: false
            required_inputs:
              - "lc-05-accepted"
          output_manifests:
            -
              attempt: 3
              digest: "sha256:e19559ccff3800edbb685daf8a4aa828d9220460a6be3bb2eae77f056107893d"
              id: "lc-06-accepted"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-06"
          result_digest: "sha256:70afab57fd361152af4479c349adb8cfc5e5d7d47da3658cdebdbe23ba39ad4f"
          revision: 18
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:d9f7bf51b405d48e400923d3e03866e50ac9ee9e4863b16bbaf147f0db98337d"
              - "sha256:303aff28a2ce92aa17154169a3f63b03ee84f69b66392a8ce527e373886860ee"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:f1a65d6da72eb2be9957c0ca5e435f6f00f3d29f723221e206a70c18c0a22a34"
              environment_digest: "sha256:2207a525a664e102ec7b300a3f63a0dfe7c8669b0d0d0d6b364a99bf8193c5a7"
              implementation_identity: "sha256:70afab57fd361152af4479c349adb8cfc5e5d7d47da3658cdebdbe23ba39ad4f"
              toolchain_digest: "sha256:9b8e2f536fd93a9b0d53b0281e098ff471370a74a3233be34889c0f2430e83ca"
            observed_at: "2026-09-21T04:21:11.698Z"
            status: "PASSED"
        lc-07:
          attempt: 1
          claim_id: "sha256:a9cd68f3ad0a8a128f9ddc2f5c91e6b2699e7898e1ec210a4d406cb03ec9bc83"
          definition:
            contract_digest: "sha256:4b7dc2163c0c75a486adffae2c7befa5aebb5202f5b16fe2872e7780ab842f28"
            depends_on:
              - "lc-04"
              - "lc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-centric"
            expected_outputs:
              - "lc-07-accepted"
            id: "lc-07"
            optional: false
            required_inputs:
              - "lc-04-accepted"
              - "lc-05-accepted"
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
        lc-08:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:c35e5c9d3f9a8de1607a0e07f398c885e8462a22e1795e1c22e292a1e6a21bfa"
            depends_on:
              - "lc-07"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-centric"
            expected_outputs:
              - "lc-08-accepted"
            id: "lc-08"
            optional: false
            required_inputs:
              - "lc-07-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-09:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:9c2c369316cdabd11d3075ccf553131d565f7334b9a16ad97f4a9da31603e697"
            depends_on:
              - "lc-07"
              - "lc-08"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-09-accepted"
            id: "lc-09"
            optional: false
            required_inputs:
              - "lc-07-accepted"
              - "lc-08-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-10:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:c3a8eb87b2bfe1ed211d5e20d924c437b86bcd9af9a2005c7cab188286460941"
            depends_on:
              - "lc-05"
              - "lc-07"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/branch"
            expected_outputs:
              - "lc-10-accepted"
            id: "lc-10"
            optional: false
            required_inputs:
              - "lc-05-accepted"
              - "lc-07-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-11:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:799d83a6235842eb3679e63d656adf39e226950839eb659258e54969868b3797"
            depends_on:
              - "lc-10"
              - "lc-08"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "lc-11-accepted"
            id: "lc-11"
            optional: false
            required_inputs:
              - "lc-10-accepted"
              - "lc-08-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-12:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:163b50b05a0c8b0b9b34bfa82547f4827ed1a73b4f535e163e4011262247b4ca"
            depends_on:
              - "lc-09"
              - "lc-11"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-centric"
            expected_outputs:
              - "lc-12-accepted"
            id: "lc-12"
            optional: false
            required_inputs:
              - "lc-09-accepted"
              - "lc-11-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-13:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:8740386609f73128538a99d8383760506c400b3e14eccfb098dbb7443c1bc0c6"
            depends_on:
              - "lc-06"
              - "lc-12"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "schema"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-13-accepted"
            id: "lc-13"
            optional: false
            required_inputs:
              - "lc-06-accepted"
              - "lc-12-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-14:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:c5e074b9548ddda6c44292c97ba4ee766fea7faece7be02e6fda6443e55ea3d4"
            depends_on:
              - "lc-13"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "schema"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-14-accepted"
            id: "lc-14"
            optional: false
            required_inputs:
              - "lc-13-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-15:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:10b9f3e2e4827f46488efcc22307bd6d6c5e5221087533e5268fc50911033768"
            depends_on:
              - "lc-14"
              - "lc-12"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
            expected_outputs:
              - "lc-15-accepted"
            id: "lc-15"
            optional: false
            required_inputs:
              - "lc-14-accepted"
              - "lc-12-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-16:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:07c1f5ad57fa7e9c38c59b8bbaae458b60b6db6c3babc280c5ea2cd9e260eece"
            depends_on:
              - "lc-15"
              - "lc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
            expected_outputs:
              - "lc-16-accepted"
            id: "lc-16"
            optional: false
            required_inputs:
              - "lc-15-accepted"
              - "lc-05-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-17:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:4a5375bfb085dc3f71dad8717664ab487bec5c377704d09118b5f898f70c2349"
            depends_on:
              - "lc-15"
              - "lc-16"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/commands/scenario"
            expected_outputs:
              - "lc-17-accepted"
            id: "lc-17"
            optional: false
            required_inputs:
              - "lc-15-accepted"
              - "lc-16-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-18:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:89ee0558368de33085f7ea32a0c991efd63f7b2a3e361e0b26254517fa760a03"
            depends_on:
              - "lc-16"
              - "lc-17"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "scripts/checks"
            expected_outputs:
              - "lc-18-accepted"
            id: "lc-18"
            optional: false
            required_inputs:
              - "lc-16-accepted"
              - "lc-17-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-19:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:bf519cf98cbc32fc7951b50b5ab8ce524d0695d4b99f9aff52e9cf93917f5b98"
            depends_on:
              - "lc-18"
              - "lc-14"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "public_api"
                - "dependencies"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "packages/agentplane/package.json"
                - "packages/core/package.json"
                - "scripts/checks"
            expected_outputs:
              - "lc-19-accepted"
            id: "lc-19"
            optional: false
            required_inputs:
              - "lc-18-accepted"
              - "lc-14-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-20:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:7f30386a191ddd47be3105d867293b3e44b2fee00cf53c0686899e0f30137248"
            depends_on:
              - "lc-19"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "lc-20-accepted"
            id: "lc-20"
            optional: false
            required_inputs:
              - "lc-19-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-21:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:baa691a0242f4c2e76ed3b4902d5ddc0041a9994f03e5f8d14c278961cf7050b"
            depends_on:
              - "lc-17"
              - "lc-18"
              - "lc-19"
              - "lc-20"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "ci"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "scripts/release"
                - "scripts/checks"
                - "packages/agentplane/src"
                - "packages/core/src"
                - "packages/testkit/src"
            expected_outputs:
              - "lc-21-accepted"
            id: "lc-21"
            optional: false
            required_inputs:
              - "lc-17-accepted"
              - "lc-18-accepted"
              - "lc-19-accepted"
              - "lc-20-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-22:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:9ac2c55be3adc2760154761e39d6650c9c7d5c83eed0349df61f695a7d994acd"
            depends_on:
              - "lc-21"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "scripts/bench"
                - "benchmarks"
                - "artifacts"
            expected_outputs:
              - "lc-22-accepted"
            id: "lc-22"
            optional: false
            required_inputs:
              - "lc-21-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-23:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:e3d16a76e54285b7a813b785efe21816b59298a3473967b293b66954175327d0"
            depends_on:
              - "lc-21"
              - "lc-22"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "documentation"
                - "source_code"
                - "public_api"
                - "tests"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "docs/user"
                - "packages/core/src/tasks"
                - "packages/agentplane/src"
                - "scripts/checks"
            expected_outputs:
              - "lc-23-accepted"
            id: "lc-23"
            optional: false
            required_inputs:
              - "lc-21-accepted"
              - "lc-22-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        lc-24:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:a64ce2f177b9910ef1ae6195eb3e061095524e3787d9d63e6ede31a621078ea6"
            depends_on:
              - "lc-23"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "ci"
              resources:
                - "workspace:0.7.11-source"
              scope_roots:
                - "vitest.workspace.ts"
                - "scripts/checks"
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/testkit/src"
            expected_outputs:
              - "lc-24-accepted"
            id: "lc-24"
            optional: false
            required_inputs:
              - "lc-23-accepted"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
    digest: "sha256:b137d8a510d8f55e35544992acbd40c34b859734aab0024e04d6159dd27319ea"
    documents:
      contracts:
        sha256:07c1f5ad57fa7e9c38c59b8bbaae458b60b6db6c3babc280c5ea2cd9e260eece:
          acceptance_criteria:
            - "The same Plan and policy preserve obligations across transports."
            - "USER, wait, and in-doubt stops remain real."
            - "One semantic request launches one adapter."
          objective: "LC-16: make managed task run a transport loop around common Kernel advance, launching exactly one adapter for one eligible semantic packet."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts"
        sha256:10b9f3e2e4827f46488efcc22307bd6d6c5e5221087533e5268fc50911033768:
          acceptance_criteria:
            - "External happy, rework, and recovery paths pass."
            - "Old tasks receive exact migration guidance."
            - "No fallback chooses a more permissive engine."
          objective: "LC-15: switch ordinary create and advance to Kernel-owned records and the common coordinator, with explicit migration-only handling for old records."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts"
        sha256:163b50b05a0c8b0b9b34bfa82547f4827ed1a73b4f535e163e4011262247b4ca:
          acceptance_criteria:
            - "Crash recovery selects the correct next action after model, check, verdict, or merge."
            - "In-doubt effects are never repeated blindly."
            - "Service-only state changes do not create semantic attempts."
          objective: "LC-12: reconcile completed and uncertain journal effects once before scheduling, preserving result identity and separating infrastructure retry from semantic rework."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
        sha256:44523e441d49a652c58cf013a7dc7c2f3db97de2694aadc6dbacb4e3ef3b20e0:
          acceptance_criteria:
            - "Required context gaps stop or request the appropriate role."
            - "CURATOR output is accepted only inside granted context scope."
            - "Current role aliases remain unambiguous."
          objective: "LC-06: route CURATOR and context preparation through common semantic admission with frozen role, provenance, source, and write-authority behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts"
        sha256:47acd3109bf26b9b90da921a03264bcb574f47b491aaa73ba8cdff8696d50996:
          acceptance_criteria:
            - "Dependency and required-output blocking are unchanged."
            - "Optional WorkItems do not block completion incorrectly."
            - "Conflicting exclusive resources cannot both be admitted."
          objective: "LC-04: make the Kernel-backed coordinator reuse one ready-WorkItem dependency, output, ordering, and resource-claim decision implementation without lifecycle authority in the pure helper."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts"
        sha256:4a5375bfb085dc3f71dad8717664ab487bec5c377704d09118b5f898f70c2349:
          acceptance_criteria:
            - "Recipe and non-Recipe tasks use one owner."
            - "Templates cannot synthesize approval."
            - "Unknown V1 steps are not newly executable."
          objective: "LC-17: route Recipe V1 materialization and execution through Kernel Task and Plan creation plus the common coordinator while preserving provenance and required review."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts"
        sha256:4b7dc2163c0c75a486adffae2c7befa5aebb5202f5b16fe2872e7780ab842f28:
          acceptance_criteria:
            - "Native check failure stops before review where appropriate."
            - "Infrastructure retry preserves implementation."
            - "Passing checks alone cannot finish a review-required task."
          objective: "LC-07: run native verification before independent review in the common coordinator and reuse immutable evidence only at the same verified-input boundary."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
        sha256:53dfb3e42aa45f26304a78ee5fc206e994a24a99fedbfcdd733d9023e0ae8869:
          acceptance_criteria:
            - "Managed and external transports preserve equal obligations."
            - "Cross-task, role, or attempt results fail closed."
            - "One result produces one accepted Kernel application."
            - "Formally decidable steps dispatch no agent and semantic judgment is not replaced by heuristics."
          objective: "LC-05: expose one shared semantic request and result-admission boundary over the existing WorkOrder and result schemas, leaving transport outside state mutation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts"
        sha256:799d83a6235842eb3679e63d656adf39e226950839eb659258e54969868b3797:
          acceptance_criteria:
            - "PR and merge heads are exactly verified."
            - "External wait emits no model episode."
            - "Protected-base auto-merge and hosted close tail remain recoverable."
          objective: "LC-11: route exact-SHA hosted observation, integration queue, and close-tail effects through common advance with typed waits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
        sha256:7f30386a191ddd47be3105d867293b3e44b2fee00cf53c0686899e0f30137248:
          acceptance_criteria:
            - "Repeated terminal replay leaves Task, repository, evidence bytes, and commits unchanged."
            - "Terminal replay dispatches no provider or check."
            - "Optional diagnostics remain outside canonical product state."
          objective: "LC-20: short-circuit terminal and no-progress reads before canonical, artifact, provider, check, or Git writes while retaining real recovery intent writes."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
        sha256:8740386609f73128538a99d8383760506c400b3e14eccfb098dbb7443c1bc0c6:
          acceptance_criteria:
            - "Formal preview never dispatches or mutates."
            - "Every old field maps to a Kernel owner, formal blocker, or semantic-assessment need."
            - "Pending work is visible."
            - "Identical bytes and mapping version produce identical formal output."
          objective: "LC-13: add deterministic read-only migration preview from known legacy and parallel records into Kernel ownership, requesting bounded semantic assessment only for genuine custom meaning."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts"
        sha256:89ee0558368de33085f7ea32a0c991efd63f7b2a3e361e0b26254517fa760a03:
          acceptance_criteria:
            - "No current entrypoint imports an old outer supervisor."
            - "Type, test, and build checks pass."
            - "The production import graph records the removed modules."
          objective: "LC-18: delete superseded ordinary, direct, and branch outer supervisors after all live entrypoints use common advance, retaining only single-purpose helpers with named consumers."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/checks/single-live-supervisor.test.mjs"
        sha256:9ac2c55be3adc2760154761e39d6650c9c7d5c83eed0349df61f695a7d994acd:
          acceptance_criteria:
            - "Mandatory role obligations are equal."
            - "Failed-attempt costs remain represented."
            - "Results remain visible per workflow instead of aggregate-only."
          objective: "LC-22: run the authorized local/replay M03 comparison of 0.7.11 versus 0.7.10 with identical mandatory stages and final oracle, with no paid provider calls."
          role: "EXECUTOR"
          verification_commands:
            - "bun run bench:agent-efficiency:check"
            - "bun run bench:agent-efficiency:replay:check"
        sha256:9c2c369316cdabd11d3075ccf553131d565f7334b9a16ad97f4a9da31603e697:
          acceptance_criteria:
            - "Golden direct result, tree, and authority behavior remains unchanged."
            - "Service-only commits do not create implementation identity."
            - "Terminal replay cannot call finalize twice."
          objective: "LC-09: delegate direct implementation observation, scope checking, commit, and finalization to common advance operations using existing Git helpers."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
        sha256:a64ce2f177b9910ef1ae6195eb3e061095524e3787d9d63e6ede31a621078ea6:
          acceptance_criteria:
            - "Every deleted case names its removed behavior and retained stronger route or removed subject."
            - "The ledger owns every negative, recovery, migration, authority, and concurrency invariant."
            - "Every configured suite executes tests without unexpected skips or todos."
            - "Before and after file, case, and same-host timing measurements are recorded."
            - "No production export exists only for tests."
          objective: "LC-24: create an executable post-convergence behavior-to-test and test-to-CI ledger, delete only tests for removed or provably redundant behavior, and optimize retained fixtures without weakening oracles."
          role: "EXECUTOR"
          verification_commands:
            - "node scripts/checks/check-post-convergence-test-topology.mjs"
            - "bun run test:fast"
            - "bun run test:release:critical"
            - "bun run package:install-smoke"
            - "bun run vitest:projects:check"
            - "bun run clone:check"
            - "bun run knip:check"
        sha256:baa691a0242f4c2e76ed3b4902d5ddc0041a9994f03e5f8d14c278961cf7050b:
          acceptance_criteria:
            - "Each operation has one accepted result or effect."
            - "Frozen negative cases remain."
            - "No secondary owner is package-reachable."
            - "Semantic judgment is not replaced by heuristics."
            - "Architecture, unused-export, clone, and dependency checks do not regress."
          objective: "LC-21: qualify installed-package one-owner behavior and migration races across ordinary, Recipe, managed, external, direct, branch, CURATOR, wait, rework, and migration fixtures."
          role: "EXECUTOR"
          verification_commands:
            - "bun run package:install-smoke"
            - "bun run test:release:critical"
            - "bun run arch:check"
            - "bun run knip:check"
            - "bun run clone:check"
        sha256:bf519cf98cbc32fc7951b50b5ab8ce524d0695d4b99f9aff52e9cf93917f5b98:
          acceptance_criteria:
            - "Exactly one Kernel reducer, canonical writer, and live dispatcher remain."
            - "Cold migration still reads historical bytes."
            - "Every retained public export has a named current consumer."
            - "No retired live engine is reachable from the installed package."
            - "Deletion deltas are recorded without performance claims."
          objective: "LC-19: delete secondary lifecycle engines, dead flags, reverse synchronization, exports, and dependencies after current-consumer proof while retaining the canonical reducer and cold decoders."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs"
        sha256:c35e5c9d3f9a8de1607a0e07f398c885e8462a22e1795e1c22e292a1e6a21bfa:
          acceptance_criteria:
            - "Rework requests new semantic work only when required."
            - "Failed, blocked, or stale review cannot satisfy completion."
            - "Saved verdict replay dispatches no model."
          objective: "LC-08: apply valid independent review verdicts exactly once through the shared completion path with current evidence and existing rework rules."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
        sha256:c3a8eb87b2bfe1ed211d5e20d924c437b86bcd9af9a2005c7cab188286460941:
          acceptance_criteria:
            - "Authoritative checkout and base remain exactly bound."
            - "Publication replay is not repeated."
            - "USER side-effect authority remains required."
          objective: "LC-10: bind branch worktree preparation and PR artifact/publication operations to common operation keys and admission."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
        sha256:c5e074b9548ddda6c44292c97ba4ee766fea7faece7be02e6fda6443e55ea3d4:
          acceptance_criteria:
            - "Old and new workers cannot both apply."
            - "Repeated apply is idempotent."
            - "Accepted semantic work is preserved."
            - "Exact mappings need no agent."
            - "Semantic gaps accept only a fresh bound result."
            - "Quarantine remains auditable and explicitly resolvable."
          objective: "LC-14: apply lifecycle-owner conversion under the common fence and CAS while retaining original bytes, formal mapping receipt, and any fresh bound semantic assessment."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts"
        sha256:e3d16a76e54285b7a813b785efe21816b59298a3473967b293b66954175327d0:
          acceptance_criteria:
            - "No current guide tells agents to choose an engine."
            - "Historical examples are version-labelled."
            - "0.7.11 documentation makes no optional-stage claim."
          objective: "LC-23: document the sole Task Kernel lifecycle and coordinator contract, precise migration boundary, formal-versus-semantic decision boundary, and deletion ledger while retiring old execution APIs."
          role: "EXECUTOR"
          verification_commands:
            - "bun run docs:bootstrap:check"
            - "bun run docs:onboarding:check"
      intent:
        context: "Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification."
        objective: "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate"
    events:
      -
        command_digest: "sha256:b02d0032eb356bc08fff64a56508065d5549efa44caeb2b591895acef11ca381"
        id: "capture:202609210324-CC13V3:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609210324-CC13V3"
        occurred_at: "2026-09-21T03:24:58.904Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609210324-CC13V3"
        task_revision: 1
      -
        command_digest: "sha256:69fc03cbb4fd9df4f7f483569a09a2bea85910c67f887f5d937c199ec91f215c"
        id: "result:sha256:fc2d59d35e03d25e7d5c2e41863f66bf12ecac655bb141c336f41cba63158bd5:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:fc2d59d35e03d25e7d5c2e41863f66bf12ecac655bb141c336f41cba63158bd5"
        occurred_at: "2026-09-21T03:28:12.171Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609210324-CC13V3"
        task_revision: 2
      -
        command_digest: "sha256:39731fe99e926c8776ee7fc64e157b434df99b6f7431220484f10b1860710076"
        id: "sha256:68704526f0a557ce508320a20d12b93a38b9aee59ff9097b4174d4948edbfcf2:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:68704526f0a557ce508320a20d12b93a38b9aee59ff9097b4174d4948edbfcf2"
        occurred_at: "2026-09-21T03:28:20.695Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609210324-CC13V3"
        task_revision: 3
      -
        command_digest: "sha256:c63c93a1dea9c1db43714d48416fb7a83edd1b0592a8a886bc3b7c179f07b6c7"
        id: "kernel_work_item_materialization_required:sha256:8fadf8e0014e7b6496ce9c840ed86f146583d523b483e144d67d70e3473c3ae2:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:8fadf8e0014e7b6496ce9c840ed86f146583d523b483e144d67d70e3473c3ae2:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        occurred_at: "2026-09-21T03:28:26.832Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609210324-CC13V3"
        task_revision: 4
      -
        command_digest: "sha256:c384d48733246f652f4a22e353d218642d576248eca892788e23fc988157700c"
        id: "kernel_work_item_claim_required:sha256:180c7d006cbdb2d350ff0d386ab62356f27b1953969f767df6e696681881f6fa:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:180c7d006cbdb2d350ff0d386ab62356f27b1953969f767df6e696681881f6fa:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        occurred_at: "2026-09-21T03:28:30.726Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609210324-CC13V3"
        task_revision: 5
      -
        command_digest: "sha256:a436a43265d8ba1f3a4ea9e159afaf0044f271e7083f5f0c1014d221c1e5faa9"
        id: "kernel_work_item_execution_required:sha256:6902736e10b72789396b7e94d6c44bdee0508f49945ea5114a0fc25b2482f927:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6902736e10b72789396b7e94d6c44bdee0508f49945ea5114a0fc25b2482f927:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        occurred_at: "2026-09-21T03:29:10.300Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609210324-CC13V3"
        task_revision: 6
      -
        command_digest: "sha256:09db9bfd719a0f2fed49365ea749a439b344f76d4a1d1569312709e31e64c51e"
        id: "semantic-stop:sha256:195511b4a97e956ec6056321884d9e3533916760a08602b8fbe101b47b848b2e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:195511b4a97e956ec6056321884d9e3533916760a08602b8fbe101b47b848b2e"
        occurred_at: "2026-09-21T03:31:02.695Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609210324-CC13V3"
        task_revision: 7
      -
        command_digest: "sha256:45eed4d7cef52895b6a5b5665d1f8ecbd33cdd0f3f79e6b61e08bf87f2d4481f"
        id: "amend:sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:49400235f5f6917bcbb26201b27cef298bde0823b5d08de86e26e5ccf35ea4e0"
        occurred_at: "2026-09-21T03:32:21.776Z"
        payload_digest: "sha256:964cf42524ec72c6b22cee6501b5fee95dfd1b1ad6daef1e25dfc8c2b25b6b13"
        task_id: "202609210324-CC13V3"
        task_revision: 8
      -
        command_digest: "sha256:91b7aef15a9f35db96b7bf2bcbaa65a74d70f331b3357fe05c07651ac5e9f055"
        id: "sha256:537861f5f92bd7d17c2cbb4902b6c7ae61b57b37ce8c898403232009cebb5f45:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:537861f5f92bd7d17c2cbb4902b6c7ae61b57b37ce8c898403232009cebb5f45"
        occurred_at: "2026-09-21T03:32:23.781Z"
        payload_digest: "sha256:24f7ea3d3341ee0c827f30d020d0d10cfe76d88847462d9a35c97dcef11d0ac1"
        task_id: "202609210324-CC13V3"
        task_revision: 9
      -
        command_digest: "sha256:a462f06cc3f70af376d5b2bf5c3eaea3de7b719417d23bf811fa91ca1bf4efc5"
        id: "kernel_work_item_claim_required:sha256:1a7e3f90b78e1f73e400c15dde9aacd2af5b24f087d1a27b7320ca991b274b56:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1a7e3f90b78e1f73e400c15dde9aacd2af5b24f087d1a27b7320ca991b274b56:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        occurred_at: "2026-09-21T03:32:33.339Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202609210324-CC13V3"
        task_revision: 10
      -
        command_digest: "sha256:893e717a4760fb93c37fdd9b11b19c32b06279d385b00c90a975b043a3a5bcf4"
        id: "kernel_work_item_execution_required:sha256:6f43c1c4fe41b33fe3f0f4194a50d3d731a8d78923f934e7ac7110864bb48e58:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6f43c1c4fe41b33fe3f0f4194a50d3d731a8d78923f934e7ac7110864bb48e58:sha256:0afa2fb57049e98bce1e844565952ccfb6166c9332764bd6bbff4f3a122232ad"
        occurred_at: "2026-09-21T03:32:36.491Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609210324-CC13V3"
        task_revision: 11
      -
        command_digest: "sha256:d0e23b40aad4c8ab1a01a5321d0ecef6eb00385bb5516a7c0b70c828a8bb4d77"
        id: "sha256:61cfabaf4bdd5035e33a082ec48e94d082110781bfa067cc5f3fe50093bedc9f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:61cfabaf4bdd5035e33a082ec48e94d082110781bfa067cc5f3fe50093bedc9f"
        occurred_at: "2026-09-21T03:47:57.453Z"
        payload_digest: "sha256:6a393f0d5f638e65b9d28b5f23acc31dc08122dddefda82bfc41f81256a566cd"
        task_id: "202609210324-CC13V3"
        task_revision: 12
      -
        command_digest: "sha256:f19b50f14c60d22475ae78a06b911d82532797a2fdc7f676974047ee2100ecba"
        id: "result:sha256:90305df266b1253f4938db27575b23278e82a9588a1dba28bd894833b13fb84a:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:90305df266b1253f4938db27575b23278e82a9588a1dba28bd894833b13fb84a"
        occurred_at: "2026-09-21T03:48:01.611Z"
        payload_digest: "sha256:2214120ad1a5e1c4b7674bdbd2a4b5a1cbcf9ebfe37aea8b8ccadb27d3eee601"
        task_id: "202609210324-CC13V3"
        task_revision: 13
      -
        command_digest: "sha256:203f97cc3559e8b8b1037016203b17cd3f5e8ca8355347d7e38a81e037d422d3"
        id: "kernel_work_item_inspection_required:sha256:8e4ee28115f80a1be0f68a5693d69465e21b5260c0d4c03dfef4ce1e4acba316:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8e4ee28115f80a1be0f68a5693d69465e21b5260c0d4c03dfef4ce1e4acba316:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
        occurred_at: "2026-09-21T03:48:04.934Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609210324-CC13V3"
        task_revision: 14
      -
        command_digest: "sha256:d6024557fd77bb9738f2232905d7ed230e58a1aa7dd49146d7e83312bc16587d"
        id: "validation:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d"
        occurred_at: "2026-09-21T03:49:11.334Z"
        payload_digest: "sha256:43a52746fe1d98579ff85ddb184591f7f78f601544ff0fc20900514e17962df9"
        task_id: "202609210324-CC13V3"
        task_revision: 15
      -
        command_digest: "sha256:0c1443aa9273dbc80b20cc3629cc0583c915e6b9bdeb1139a3b7b32c84e2e6b2"
        id: "validation-resolution:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d"
        occurred_at: "2026-09-21T03:49:13.383Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609210324-CC13V3"
        task_revision: 16
      -
        command_digest: "sha256:8f67f28800266fead63e4c2b11ce9f9d1c479183af8b3ee1c43e5f85a51f576e"
        id: "kernel_work_item_claim_required:sha256:6009300fe5f4e6299035264c80d4b2226dbb85e0d613c6ea63cb4850aafb8deb:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6009300fe5f4e6299035264c80d4b2226dbb85e0d613c6ea63cb4850aafb8deb:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
        occurred_at: "2026-09-21T03:49:17.606Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202609210324-CC13V3"
        task_revision: 17
      -
        command_digest: "sha256:a174cea3669eabb40aa71b9d77c86ce1108d190fb48230f51c302b1f60396bc0"
        id: "kernel_work_item_execution_required:sha256:73b780ce103b78f01c77a3c8a2192c9b98358a0a19618bbcc42b6f7074f96224:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:73b780ce103b78f01c77a3c8a2192c9b98358a0a19618bbcc42b6f7074f96224:sha256:08a0d75cfdebc6fb485ca4452d2cb43b92ecbaf27a7d7b2aba890f7fde7c22a6"
        occurred_at: "2026-09-21T03:49:20.829Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609210324-CC13V3"
        task_revision: 18
      -
        command_digest: "sha256:a966c6a9f40aa0777a5c51097114ed1131e21d0e257629f61a1e4110e5f0b3dc"
        id: "sha256:d4ee118ae6620a94a43c2ec92a32ada7258580dfc140eccf3b176529146c7665:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d4ee118ae6620a94a43c2ec92a32ada7258580dfc140eccf3b176529146c7665"
        occurred_at: "2026-09-21T03:56:20.328Z"
        payload_digest: "sha256:1223dab77db4a4ff6e2209fcb4238433d8fa95a7c34d0ffd01b6eba93b722354"
        task_id: "202609210324-CC13V3"
        task_revision: 19
      -
        command_digest: "sha256:08bdaf791c91fb54fb2fba4af43226be38b5d4f6db8c708b6bb6900a33bc6bc1"
        id: "result:sha256:25178847b622c622e43fa6e1484a8437021ecfe892fe5e2d3d8b3087b125bdc8:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:25178847b622c622e43fa6e1484a8437021ecfe892fe5e2d3d8b3087b125bdc8"
        occurred_at: "2026-09-21T03:56:24.575Z"
        payload_digest: "sha256:f294013879eb217102bc0fab0f1e7a244e1201c6c32880d918fa6d1433411da7"
        task_id: "202609210324-CC13V3"
        task_revision: 20
      -
        command_digest: "sha256:ee26502dfbe7f51301d9e3d0caff5c9d11194509c28a77533096ecd114a77c57"
        id: "kernel_work_item_inspection_required:sha256:8b11799cf496c88abd8e9c21a4292268969d6bbc113b08779a1c10401440f1d2:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8b11799cf496c88abd8e9c21a4292268969d6bbc113b08779a1c10401440f1d2:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        occurred_at: "2026-09-21T03:56:28.005Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202609210324-CC13V3"
        task_revision: 21
      -
        command_digest: "sha256:922a090ef93e40d6699410ce24d7003ff173289dbe16a20312fe0a5d2c69a524"
        id: "validation:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6"
        occurred_at: "2026-09-21T03:57:32.000Z"
        payload_digest: "sha256:08536a509deeac3624c331473c2ac63c8c443337a83d4affeb97a578108721c6"
        task_id: "202609210324-CC13V3"
        task_revision: 22
      -
        command_digest: "sha256:e55389d395847d4b55038e1c6c341462a605481627b5975d2a1b2d1a00437bd7"
        id: "validation-resolution:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5ca934457bc046c79774dee5921dbcd8754be4d4e9ae8f91c4a5b696b5677cd6"
        occurred_at: "2026-09-21T03:57:34.046Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609210324-CC13V3"
        task_revision: 23
      -
        command_digest: "sha256:c90fc4b28e3b4e894cc369bdf7a226d0a6e1b2460afad1a3513e06da0c20387f"
        id: "kernel_work_item_claim_required:sha256:f51256664df2087c73e46b7a5fbe027eb0f0c5edb747085cec61afbe433f7e38:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f51256664df2087c73e46b7a5fbe027eb0f0c5edb747085cec61afbe433f7e38:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        occurred_at: "2026-09-21T03:57:38.394Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202609210324-CC13V3"
        task_revision: 24
      -
        command_digest: "sha256:708fb811e4ed956056a08b3016eb592d6a1ded7b2fc5b8f4502ef2e5dadf241f"
        id: "kernel_work_item_execution_required:sha256:9ad1e3d540624f458b525a746c88875a30e4f6c4875c299510a4975ffefe552a:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9ad1e3d540624f458b525a746c88875a30e4f6c4875c299510a4975ffefe552a:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        occurred_at: "2026-09-21T03:57:41.669Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202609210324-CC13V3"
        task_revision: 25
      -
        command_digest: "sha256:7f3f405476c892d2c554680763a6741e89e8161eedb69d05f133cecd71aaa623"
        id: "semantic-stop:sha256:e78b8213558d73b9a11661837778aad9c53a7bd9d1b221f0cc62d949abe8ad17:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:e78b8213558d73b9a11661837778aad9c53a7bd9d1b221f0cc62d949abe8ad17"
        occurred_at: "2026-09-21T04:00:48.491Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202609210324-CC13V3"
        task_revision: 26
      -
        command_digest: "sha256:182aeed3fecc5d3a5151f75a11977a998e25e59fad29317ce2c5f9b421437ee4"
        id: "amend:sha256:0a73f0924aad52add32c44a143492722c4a201ee86f51b618388ed54fdff0391:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:0a73f0924aad52add32c44a143492722c4a201ee86f51b618388ed54fdff0391"
        occurred_at: "2026-09-21T04:02:54.321Z"
        payload_digest: "sha256:42bed2d9aec877782c85caa43fb8ec440c983dba3e7b49d1b0f24a2815f942dc"
        task_id: "202609210324-CC13V3"
        task_revision: 27
      -
        command_digest: "sha256:d92cbcbcee4067dab72cbd106147da3f5428c5965d21d165438e51c937662f37"
        id: "sha256:ca215cb77ef66f88255ea498692c6e092f44ed63c5dc5747ad983eebc140d147:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ca215cb77ef66f88255ea498692c6e092f44ed63c5dc5747ad983eebc140d147"
        occurred_at: "2026-09-21T04:02:56.367Z"
        payload_digest: "sha256:758d046bb700bfb388afb5f242615a0666d8c68a77abc7d727af5deb3ef3a0b2"
        task_id: "202609210324-CC13V3"
        task_revision: 28
      -
        command_digest: "sha256:720f263f44f761ff439d3b8490c0cdf8e3d1bbd91dbeba4aef196a97bba5dffd"
        id: "kernel_work_item_claim_required:sha256:29e1efc11d429d1ff4f443e14737733aeb211316ec9899a4787dc437579b083e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:29e1efc11d429d1ff4f443e14737733aeb211316ec9899a4787dc437579b083e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        occurred_at: "2026-09-21T04:03:06.319Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202609210324-CC13V3"
        task_revision: 29
      -
        command_digest: "sha256:a00269c04b1d795290e94502042c40e6207edccc9025cdd5043e1556fab32f7f"
        id: "kernel_work_item_execution_required:sha256:9f121547d0d28b9dc1853c3a4879e2747a10e4a49af7f9d53b40a200fb68cf4e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9f121547d0d28b9dc1853c3a4879e2747a10e4a49af7f9d53b40a200fb68cf4e:sha256:a2f2671cbab0981afeb582846ad99d250c7d4ac695d85cc26a6fe35df77a60a6"
        occurred_at: "2026-09-21T04:03:09.607Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202609210324-CC13V3"
        task_revision: 30
      -
        command_digest: "sha256:63c41252c67b6dc183c0415478d2857321aa04bcc4b62b0c7313ff02a4d37658"
        id: "sha256:f11f83dbbf3cbbab3883363d858b00aa65972a53051b662b326213a6138bafef:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:f11f83dbbf3cbbab3883363d858b00aa65972a53051b662b326213a6138bafef"
        occurred_at: "2026-09-21T04:13:31.650Z"
        payload_digest: "sha256:f8f92483994f2aeee36455a8aef37798ccb0aa0f98a768f9257fd5f3451c0f68"
        task_id: "202609210324-CC13V3"
        task_revision: 31
      -
        command_digest: "sha256:5e6093621defa59cd3d1a7d3167ef9deb0577f243e0cb5841dc61c99b810b366"
        id: "semantic-stop:sha256:59a86045dec5fb06495674e719ddd7a0754f8e5d21dee4469fa6a478a18ba44c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:59a86045dec5fb06495674e719ddd7a0754f8e5d21dee4469fa6a478a18ba44c"
        occurred_at: "2026-09-21T04:13:34.705Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202609210324-CC13V3"
        task_revision: 32
      -
        command_digest: "sha256:a55cca3cbf3f8aefec9c7bdb32225e14f335a273d2266f9c49c4fed83b87da7c"
        id: "amend:sha256:7c544320ac7e8b848db4922b16c7db902bdc9fd3f0c332ddc9122eee84947b0a:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:7c544320ac7e8b848db4922b16c7db902bdc9fd3f0c332ddc9122eee84947b0a"
        occurred_at: "2026-09-21T04:15:33.651Z"
        payload_digest: "sha256:6080c23fc0e8e8eb99a101fb7d26d4b07486a390c7f0ba5c62094812df646d33"
        task_id: "202609210324-CC13V3"
        task_revision: 33
      -
        command_digest: "sha256:e82abece514a05628154653721d7478d0e6abc4100fbd3e89996d4e9ce974d73"
        id: "sha256:0a9878ae44464a863190a3a4e0dc9074ee6bbf73ef91554ab08914bb62421661:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:0a9878ae44464a863190a3a4e0dc9074ee6bbf73ef91554ab08914bb62421661"
        occurred_at: "2026-09-21T04:15:35.864Z"
        payload_digest: "sha256:b8d8ca47c0fa96b653190f50a748e7272ab3204b0b0588025e57d1bcf7c4374b"
        task_id: "202609210324-CC13V3"
        task_revision: 34
      -
        command_digest: "sha256:0cc7d5f194f8ceba7c1919139487dba015293a4c07e69fd386a7c7562d21f9ac"
        id: "kernel_work_item_claim_required:sha256:32d70fa96a659b4c25896835a71dd46337f3070d99d2ada24301d1e9c4273a73:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:32d70fa96a659b4c25896835a71dd46337f3070d99d2ada24301d1e9c4273a73:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
        occurred_at: "2026-09-21T04:15:45.181Z"
        payload_digest: "sha256:83321e093d0911e15803219e1bae99ce3af4c42e0b036b7c46cb3b59f6111cef"
        task_id: "202609210324-CC13V3"
        task_revision: 35
      -
        command_digest: "sha256:4492ad8a28c2fe22dadbbec61fc51f9335ba0f08dddec8a478ba70a49c38241e"
        id: "kernel_work_item_execution_required:sha256:60d8e7344153dda086949a7b680a30c6b31e53b99134200d30ec5a40e978aa2e:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:60d8e7344153dda086949a7b680a30c6b31e53b99134200d30ec5a40e978aa2e:sha256:cab62ef6bb6c97c8910dfdeb2eb391fb76855df59a8d3c9398c7de905bb8ad1d"
        occurred_at: "2026-09-21T04:15:48.512Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202609210324-CC13V3"
        task_revision: 36
      -
        command_digest: "sha256:12527694d4bfd3a0f374a2db4f3858196d4e95384ed67e45f7c468703f1cab8a"
        id: "sha256:53bdc12554baf8c6b6c40faad46a793dcf79722b1c160ee83e6e09e9b889d506:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:53bdc12554baf8c6b6c40faad46a793dcf79722b1c160ee83e6e09e9b889d506"
        occurred_at: "2026-09-21T04:18:48.889Z"
        payload_digest: "sha256:8537fe716233ba2de207c2ffbeac56605bec6afbb64a12631726bf257158a886"
        task_id: "202609210324-CC13V3"
        task_revision: 37
      -
        command_digest: "sha256:2ce5c82344447175aed9666b1a7c8243df669a6763e058c25a48c65b9cf7ed24"
        id: "result:sha256:0862ef4a9f04e34c73fd9dba02e4afae9323bfca20dde7b2af72b77c0fe0a9a3:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:0862ef4a9f04e34c73fd9dba02e4afae9323bfca20dde7b2af72b77c0fe0a9a3"
        occurred_at: "2026-09-21T04:18:53.210Z"
        payload_digest: "sha256:65342afa938c259ca92aa0f9d29b3da1d190b2f9dc023cd84ff930ec5489ba6c"
        task_id: "202609210324-CC13V3"
        task_revision: 38
      -
        command_digest: "sha256:f7bf167d2816cf96da4a3d3a6f68dcf0cab9aab44b7355d741bc6190df957325"
        id: "kernel_work_item_inspection_required:sha256:e57c25fac470f5d70c4ec47a7e32dd4d4066159529fe421b698879e8c36b225e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e57c25fac470f5d70c4ec47a7e32dd4d4066159529fe421b698879e8c36b225e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        occurred_at: "2026-09-21T04:18:56.748Z"
        payload_digest: "sha256:1614312eb58103f4c7640f85f8c8390d8b08424d5dc30404b86eb726e683b1d7"
        task_id: "202609210324-CC13V3"
        task_revision: 39
      -
        command_digest: "sha256:f77fdca6e744c40d8463f488e623adf1eb8da81ebbd3d58da41601db610baea5"
        id: "validation:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3"
        occurred_at: "2026-09-21T04:21:16.250Z"
        payload_digest: "sha256:1f5c9518839d2d48898b94a1f06b72be779c568773936989b7e9a3e0cf1a9016"
        task_id: "202609210324-CC13V3"
        task_revision: 40
      -
        command_digest: "sha256:e7c7b2728d5b97fab2cefd0d42edaa057f6f76cdea7af14dbad72bf22f2c6dbd"
        id: "validation-resolution:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7f2af9c98d61e839b71eabf971975d5bd40b204489a496b6a0e9a947ec8ff1f3"
        occurred_at: "2026-09-21T04:21:18.372Z"
        payload_digest: "sha256:6d756eeb8cec9f82fc6087e919673e23c7375d61274786e32bffd6144934d617"
        task_id: "202609210324-CC13V3"
        task_revision: 41
      -
        command_digest: "sha256:fae53dbc7454292d17921116aa8a1f2b828eda957bfa2c616bcb077558877d0e"
        id: "kernel_work_item_claim_required:sha256:dd830065a38ce1a94f73cbf0e8ee9078a335e59357c0b3ea20d4723d29768f6e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:dd830065a38ce1a94f73cbf0e8ee9078a335e59357c0b3ea20d4723d29768f6e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        occurred_at: "2026-09-21T04:21:22.726Z"
        payload_digest: "sha256:aec49a4b547a4401da31cfe163dadf2f671fd47179bd7ec6528fad14db98542c"
        task_id: "202609210324-CC13V3"
        task_revision: 42
      -
        command_digest: "sha256:a1808a91e4c85ec0534ad943762c4dc0694b2744bf4b3604fd6d2a8deb0910f6"
        id: "kernel_work_item_execution_required:sha256:af9f1272a028a95e04b3938e8c6cf3fd40f4c837c75f53730c746c82004e751d:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:af9f1272a028a95e04b3938e8c6cf3fd40f4c837c75f53730c746c82004e751d:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        occurred_at: "2026-09-21T04:21:26.037Z"
        payload_digest: "sha256:0bcd5e2250d1b29f52698da2f1f0735696491baf0d0977d6ec4841af151706da"
        task_id: "202609210324-CC13V3"
        task_revision: 43
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate

Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification.

## Scope

- In scope: Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification.
- Out of scope: unrelated refactors not required for "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
