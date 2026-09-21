---
id: "202609210324-CC13V3"
title: "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 94
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
  updated_at: "2026-09-21T05:39:40.850Z"
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
  updated_at: "2026-09-21T05:39:40.850Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "6a8c2763399776b73279f64d96a42c4d9357e67a"
  review_identity_digest: "sha256:e2b862f7af271d96ed7cd240e01f8c5031464a0bbe53c3b815495d0607bfc946"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609210324-CC13V3/cc946705b56dbe559b5b6977dd8660d121a7b5f534a708a001619e9eca3074ad/quality-report.json"
  findings:
    - "Supervisor journal recovery retains the original operation and result digest until the postcondition route observation is applied, so a completed semantic or service operation is not launched again."
    - "Unresolved intent becomes effect_in_doubt, and Kernel next-action ordering gives PENDING or IN_DOUBT effects precedence over WorkItem scheduling."
    - "The effect coordinator observes PENDING effects and never redispatches them; an uncertain observation returns a reconciliation boundary."
    - "An EXECUTING WorkItem remains result-required at its existing attempt, while retry policy distinguishes infrastructure retry from validation repair."
    - "AgentPlane-owned native validation passed all four focused recovery tests against implementation commit 6a8c2763399776b73279f64d96a42c4d9357e67a."
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
  hash: "6a8c2763399776b73279f64d96a42c4d9357e67a"
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
    digest: "sha256:870c6bccaf31db1628109e0ae28f9a877a57b5f205649720665028f86f2a6639"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609210324-CC13V3/cc946705b56dbe559b5b6977dd8660d121a7b5f534a708a001619e9eca3074ad/quality-report.json"
    findings:
      - "Supervisor journal recovery retains the original operation and result digest until the postcondition route observation is applied, so a completed semantic or service operation is not launched again."
      - "Unresolved intent becomes effect_in_doubt, and Kernel next-action ordering gives PENDING or IN_DOUBT effects precedence over WorkItem scheduling."
      - "The effect coordinator observes PENDING effects and never redispatches them; an uncertain observation returns a reconciliation boundary."
      - "An EXECUTING WorkItem remains result-required at its existing attempt, while retry policy distinguishes infrastructure retry from validation repair."
      - "AgentPlane-owned native validation passed all four focused recovery tests against implementation commit 6a8c2763399776b73279f64d96a42c4d9357e67a."
    implementation_commit: "6a8c2763399776b73279f64d96a42c4d9357e67a"
    implementation_tree: "da197930750ea2299ef03bd5adbd5556a18233bb"
    projected_at: "2026-09-21T05:39:40.850Z"
    review_identity_digest: "sha256:e2b862f7af271d96ed7cd240e01f8c5031464a0bbe53c3b815495d0607bfc946"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:537f9539bd1e6b5ff7369e898ddb5942ad27f4518459a72bc1c7b3073b56a6ab"
    work_order_id: "sha256:703f8e99baefe16b3b5a53576fd8c9ad980c9d244109536b791d714f9c415401"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:13f13fc214f3c34d5bc22d979080de5c574fcdfb536e6273d7e6d974e3fa3ffb"
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
              parent_authority_digest: "sha256:48fb1477c6404f6b45076d60270c96d4e2a4efff1a63026f34ce853746a395af"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
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
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts"
            evidence_digest: "sha256:dbd9603a2b1fa36d642e15deef656fecfb851463d0c17afcba1dc20ac37c5472"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a8d7aad466fabf766a5b6ac3b38b5c8be8c1e35e68e1b1cf40cabf7f47f02eae"
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
              parent_authority_digest: "sha256:13f13fc214f3c34d5bc22d979080de5c574fcdfb536e6273d7e6d974e3fa3ffb"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
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
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/quality-review-gate.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts"
              - "packages/core/src/tasks/task-centric/index.ts"
              - "packages/core/src/tasks/task-centric/lifecycle.ts"
            evidence_digest: "sha256:0f3bd08006e6bd3062078bcc831fbf83a26cda0e50b7b9f9d916e15be22165fd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2ea6d642915545ef2543fe722e0cf877220f0d8c75573e44d60e4e539b8721de"
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
              parent_authority_digest: "sha256:a8d7aad466fabf766a5b6ac3b38b5c8be8c1e35e68e1b1cf40cabf7f47f02eae"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
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
              - "packages/agentplane/src/commands/task/direct-task-finalization.ts"
              - "packages/agentplane/src/commands/task/direct-task-supervisor-closeout.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-supervisor-closeout.ts"
              - "packages/agentplane/src/commands/task/direct-task-supervisor-operation.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-supervisor-operation.ts"
              - "packages/agentplane/src/commands/task/direct-task-supervisor.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-supervisor.ts"
              - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
              - "packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts"
            evidence_digest: "sha256:274f94163bbc04c2990bb032ae8956a5dd60b75245e601a75d07c3c86a9342e5"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1ba3c711ca696604bf1522f092eaf7536159a4ffbe09d1c7044040b742694855"
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
              parent_authority_digest: "sha256:2ea6d642915545ef2543fe722e0cf877220f0d8c75573e44d60e4e539b8721de"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
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
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
              - "packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts"
            evidence_digest: "sha256:de0eeec73648a2a18a2a384dee0f47238009fb5ac3610e73ec81d8c3d0d2a26e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4805e53332984b8ace1c86a1fc490fefb7f7d5b628a8ddd8c444bdcdcaff0e22"
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
              parent_authority_digest: "sha256:1ba3c711ca696604bf1522f092eaf7536159a4ffbe09d1c7044040b742694855"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
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
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
            evidence_digest: "sha256:4c36baff037033ee6e89de3e69b0f1869fba8c70ece4337434c8dbb560263c16"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:14329cff81291f1322699530b1e04fbd3709017732e0b150fe6e2c90e1014c7d"
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
              parent_authority_digest: "sha256:4805e53332984b8ace1c86a1fc490fefb7f7d5b628a8ddd8c444bdcdcaff0e22"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
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
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            evidence_digest: "sha256:6e0224ee4531745c84d549a63ea7b8a86499bfb2195b2c86fb3bedcc935bdb7e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
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
        kernel_work_item_claim_required:sha256:28c65b2ff1f49ee56eac2754ea0a5b6cf7d70c9fd99e1f46b9e7c1374ee0d688:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa:
          after_revision: 63
          aggregate_digest: "sha256:b567d552cadea5e31a1a9340b9d9b29d7d3e174244a33c7da61840894a5769cb"
          before_revision: 62
          command_digest: "sha256:c204e6769c119c19e2277f75848511c95ff0959aab9266eb8cdbba4b782f6401"
          effect_ids: []
          event_digests:
            - "sha256:dbdcd3ad5c42e0bdbc3af279c71dec3dd9e01c310c514ff60f61b69519f45920"
          mutation_id: "kernel_work_item_claim_required:sha256:28c65b2ff1f49ee56eac2754ea0a5b6cf7d70c9fd99e1f46b9e7c1374ee0d688:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
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
        kernel_work_item_claim_required:sha256:668760fc01053dc2bd2a6ab34c029e759f23fc8c8be2b4514c7b5e36317706b8:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815:
          after_revision: 56
          aggregate_digest: "sha256:f007e1bc428b743d7378a04e44ec101c157242ef494d1de1d906504b1909bfe4"
          before_revision: 55
          command_digest: "sha256:83bb496f1e7c37f86050c81f069db144a23f6acfeea3bebef751c891c3d32f3c"
          effect_ids: []
          event_digests:
            - "sha256:0c9b81dd9ca2285cfe077b57590089abafc6478cf8be0e6b1cc3b56716167084"
          mutation_id: "kernel_work_item_claim_required:sha256:668760fc01053dc2bd2a6ab34c029e759f23fc8c8be2b4514c7b5e36317706b8:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
        kernel_work_item_claim_required:sha256:722d56b0849a0b85def18e9e8c3c8ee381d28dbe258e3d569b48945a10f13d93:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169:
          after_revision: 77
          aggregate_digest: "sha256:4f69ec8a676741c8eda6d1ea77b4200b1b7d64a9649590db76a7f476c19bb674"
          before_revision: 76
          command_digest: "sha256:3cbe84a385c17bc549e37201c8c40ed6a3949a8c54196f6688f68562cac56c80"
          effect_ids: []
          event_digests:
            - "sha256:97b91e7594492b2235c5ab0e5556bdaf01ae7e316c9db621d82501e89d1ae3fb"
          mutation_id: "kernel_work_item_claim_required:sha256:722d56b0849a0b85def18e9e8c3c8ee381d28dbe258e3d569b48945a10f13d93:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
        kernel_work_item_claim_required:sha256:ab8baea3204be01acc4520db727d8a373e3adb14f0b882f70f7f45891495ba45:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0:
          after_revision: 70
          aggregate_digest: "sha256:f21278f4a63aa2f2b104cdd37ae90f46b31fb4ba85a056ff79046aa6441d1449"
          before_revision: 69
          command_digest: "sha256:7ef5f19e9e6afacfcbb199c89dcfdcdd777524e3e0fea005068955bb9bb9c73b"
          effect_ids: []
          event_digests:
            - "sha256:d5960cd3501565846cb5a9ae66e95dbe24ddb75fb7f8c91f7d2631c2db346748"
          mutation_id: "kernel_work_item_claim_required:sha256:ab8baea3204be01acc4520db727d8a373e3adb14f0b882f70f7f45891495ba45:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
        kernel_work_item_claim_required:sha256:ba4a40bf9d0f54558ab47799f3770b15f8ccd32d8a989ce60d8263b4ed1578dd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9:
          after_revision: 84
          aggregate_digest: "sha256:ef2cd89488dd605a51edc344d9474b41922f2adf03638df225fce505f23e5bbb"
          before_revision: 83
          command_digest: "sha256:dd5333dbc98b388456fc4222c2f7f3a3e81d4298d8952e62f97394ee72ee163b"
          effect_ids: []
          event_digests:
            - "sha256:6c238fd7d3123ec21a0bfa67621d2f06071aa16b7908dd2023e88fa912b65d54"
          mutation_id: "kernel_work_item_claim_required:sha256:ba4a40bf9d0f54558ab47799f3770b15f8ccd32d8a989ce60d8263b4ed1578dd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
        kernel_work_item_claim_required:sha256:ccf12e958582247df637e29c8ab9892bc3c7382633b8fa535be8b6e2d8d9c607:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380:
          after_revision: 49
          aggregate_digest: "sha256:2fa8a1267ce5dc073f4d0186e4e0ea6c75c595e9fb5e27fd9db6784d31f1714b"
          before_revision: 48
          command_digest: "sha256:dc258efa4528162dae716d4e81ee3d7ba720bc217bad744bb3d529f2618819f1"
          effect_ids: []
          event_digests:
            - "sha256:ed64c611221db1712b93c72eb7d5d276bca8635c0d96693d9a1e935a75f3d5c9"
          mutation_id: "kernel_work_item_claim_required:sha256:ccf12e958582247df637e29c8ab9892bc3c7382633b8fa535be8b6e2d8d9c607:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
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
        kernel_work_item_execution_required:sha256:3dfb780d7763adc0c1998dd21fcdab74827ad610e987aecd1a52f1e40ba3d034:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815:
          after_revision: 57
          aggregate_digest: "sha256:c242efd679a1daf350627ad6ff5d3b07aff082e59b260330cf4b88945680c776"
          before_revision: 56
          command_digest: "sha256:e172df0d6a48f8847bc9d50a9905222abdbfd7eb568f7698406350ae4062b0c7"
          effect_ids: []
          event_digests:
            - "sha256:505eab54e3e17ea095fbe67281f674af567d55de4baed3c5cbdcd3c454abe710"
          mutation_id: "kernel_work_item_execution_required:sha256:3dfb780d7763adc0c1998dd21fcdab74827ad610e987aecd1a52f1e40ba3d034:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
        kernel_work_item_execution_required:sha256:4abf85c18e46d6c4ee8ac52b12dd34245f0e7e9ae7832afd84f02f7e46cb48bd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9:
          after_revision: 85
          aggregate_digest: "sha256:693e7774712e5a2a47726b54c5b9b4b657e2c80f1c80212a58fbcf03e8ad0d75"
          before_revision: 84
          command_digest: "sha256:856ca3c0cdf3883b08630d5b1b7fb9454cd85ed454bba369f5318de1abdefaaa"
          effect_ids: []
          event_digests:
            - "sha256:c8fcde24ba8751059ff7e0130c7c3254a926ffec741d00ff5876adeae701e48a"
          mutation_id: "kernel_work_item_execution_required:sha256:4abf85c18e46d6c4ee8ac52b12dd34245f0e7e9ae7832afd84f02f7e46cb48bd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
        kernel_work_item_execution_required:sha256:52af8ecac4f7a4bc2e52a25bd9e5a1165d79155f4176fa96bfe8d4c6ab2213c2:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa:
          after_revision: 64
          aggregate_digest: "sha256:51a22865db0a04d1b185454a646b26fd98d2f1707c929bf18685e35e05436ba7"
          before_revision: 63
          command_digest: "sha256:55bbb5cd0ec0804da2aa8661e988606619aa5bd9d45f96e5584565000f7025f4"
          effect_ids: []
          event_digests:
            - "sha256:76d3ac98b4d9b63b9f9feb1943c6dc17a077ad65cfc9f31c0df9199fb7b6fe48"
          mutation_id: "kernel_work_item_execution_required:sha256:52af8ecac4f7a4bc2e52a25bd9e5a1165d79155f4176fa96bfe8d4c6ab2213c2:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
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
        kernel_work_item_execution_required:sha256:94fc877a8aaed53e7684e78ffbcde39232f9ed6b2b8b75ac9bcacdaf88d37e47:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169:
          after_revision: 78
          aggregate_digest: "sha256:18d8c8be9b7a1bbf36980e02d38b8feeda73ae492cc06d830e1b5068de93493b"
          before_revision: 77
          command_digest: "sha256:005604025d4c99fadea6632111b42f54ee7e367cfd2cda4900d1d1bcc45c95b9"
          effect_ids: []
          event_digests:
            - "sha256:01de2ce9ba4247042ca08385de64a266df114d2e6f9c2d780bc56f6f49bf802e"
          mutation_id: "kernel_work_item_execution_required:sha256:94fc877a8aaed53e7684e78ffbcde39232f9ed6b2b8b75ac9bcacdaf88d37e47:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
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
        kernel_work_item_execution_required:sha256:c3b052a2f38c4a0b9b6f410e38755cef6ffc6a789b24c5f348007a768117d5a2:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0:
          after_revision: 71
          aggregate_digest: "sha256:5dbe6a77a53f8634d06ff1283619699f65094ee4fcdf83d0dba7d3b18afdeebc"
          before_revision: 70
          command_digest: "sha256:2501d4be6d49bef8be0176f41716cff35c838ad55d40d4699e551f1cb526c438"
          effect_ids: []
          event_digests:
            - "sha256:87a84bfb7615b813ba27d697fd6c0020cadc87b4328c0a664f9d41528ae0ce2b"
          mutation_id: "kernel_work_item_execution_required:sha256:c3b052a2f38c4a0b9b6f410e38755cef6ffc6a789b24c5f348007a768117d5a2:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
        kernel_work_item_execution_required:sha256:efaa4ed41e93e0097d760eec73ba279592d044743872a96f1abaaeef91630f51:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380:
          after_revision: 50
          aggregate_digest: "sha256:ac8b3ab16b29571902c4b90ae0216d698a3c5fdccdd1507c16374afbb623f92c"
          before_revision: 49
          command_digest: "sha256:6a0be41766c5738a335f568e25e13c6863dd544d5d245f5bd3edf45908fce83b"
          effect_ids: []
          event_digests:
            - "sha256:5035df7d716a56060ae533e922345dddeefa3f466eac09a12086b159fb72f587"
          mutation_id: "kernel_work_item_execution_required:sha256:efaa4ed41e93e0097d760eec73ba279592d044743872a96f1abaaeef91630f51:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
        kernel_work_item_inspection_required:sha256:2703ac26c0817e4885a99bc14fc5fd0e1e8fa0f62ba07d54c1146edec4ea980b:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9:
          after_revision: 81
          aggregate_digest: "sha256:cdb8b5640e9ab11731ccdc1ad18c73445da6c2f5de31dbea4cbc8e0b0021eec1"
          before_revision: 80
          command_digest: "sha256:3a4b05d9704c387dafa4e8468cc3d24246031e93c9687602eb035abcc54b33c4"
          effect_ids: []
          event_digests:
            - "sha256:943966a13e19eac826189cfa14e3783fc5a50dcb6f67111d56d0e4cd4c307378"
          mutation_id: "kernel_work_item_inspection_required:sha256:2703ac26c0817e4885a99bc14fc5fd0e1e8fa0f62ba07d54c1146edec4ea980b:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
        kernel_work_item_inspection_required:sha256:68c13c17c30398bcf8672b912d960b9c7a5b61d4a0035e9b848133a7e38da6b0:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0:
          after_revision: 67
          aggregate_digest: "sha256:09289118c2daeedd55114b032a3bc5de77b5950fe00a2a723376a9e0d3e42732"
          before_revision: 66
          command_digest: "sha256:ad019bd87aa6a849d3bbff22f687cfd81afa56e8891942d1fe2222e7cd9db387"
          effect_ids: []
          event_digests:
            - "sha256:69ffe3a25e87031a0c600609d39411333622c05dbdd20759c719e37747bd34cf"
          mutation_id: "kernel_work_item_inspection_required:sha256:68c13c17c30398bcf8672b912d960b9c7a5b61d4a0035e9b848133a7e38da6b0:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
        kernel_work_item_inspection_required:sha256:7653d9be6cefe40499b51fc764731c00e421ea20cd2509a1db47a232a67cfc21:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815:
          after_revision: 53
          aggregate_digest: "sha256:f3bfb1fe18baa43b4418abf2d9fe797ce0102845e98c56d22e85888b9a40971b"
          before_revision: 52
          command_digest: "sha256:bbf2eaf48f6713b375ba1025146b7587265b628f0e86994a108d1e388ba269bd"
          effect_ids: []
          event_digests:
            - "sha256:2cde505edade84d3d88dbb33b6354fcf1d2328b7704e382ca2919daee57f92f9"
          mutation_id: "kernel_work_item_inspection_required:sha256:7653d9be6cefe40499b51fc764731c00e421ea20cd2509a1db47a232a67cfc21:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
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
        kernel_work_item_inspection_required:sha256:9d51115517fa1b1355b14f3d9e939052c708147e763d0c8150c7a002df65a720:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa:
          after_revision: 60
          aggregate_digest: "sha256:4ec7c95e320ee5283ce5e1a540a9be96712f7676484fdbf595db04870999e6d7"
          before_revision: 59
          command_digest: "sha256:9edda311913b8ef217726d40b45a885f8836bacc84a9ba2dadfa90f5fd3008ea"
          effect_ids: []
          event_digests:
            - "sha256:48eb7f8595770110557c3cb9ff85873a44dcd6344e52bde39d233a2d85ed13d4"
          mutation_id: "kernel_work_item_inspection_required:sha256:9d51115517fa1b1355b14f3d9e939052c708147e763d0c8150c7a002df65a720:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
        kernel_work_item_inspection_required:sha256:e548d0b5630c34d280cf30c9fac8bfe4703c0c8b27f9adb7cdde79d0b8269d51:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169:
          after_revision: 74
          aggregate_digest: "sha256:563429e7df6bb2d2aa83a61cf9b0e165bacc6a4d6c31b2b40b109df75cb6dbf1"
          before_revision: 73
          command_digest: "sha256:bbe1b69bd48bceb8af1a99ef16f39c2a396993fcec876a40f53367397869d4a3"
          effect_ids: []
          event_digests:
            - "sha256:1f487bc8139d4af900b98d8b4f5dbae8890c54b5f6ae34bb7071f90a73d8f54f"
          mutation_id: "kernel_work_item_inspection_required:sha256:e548d0b5630c34d280cf30c9fac8bfe4703c0c8b27f9adb7cdde79d0b8269d51:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
        kernel_work_item_inspection_required:sha256:e57c25fac470f5d70c4ec47a7e32dd4d4066159529fe421b698879e8c36b225e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6:
          after_revision: 39
          aggregate_digest: "sha256:b5f5993bfdf69d8ca055a9014e3aebecd59e1d8233df2f4d0357af3096af4ff0"
          before_revision: 38
          command_digest: "sha256:f7bf167d2816cf96da4a3d3a6f68dcf0cab9aab44b7355d741bc6190df957325"
          effect_ids: []
          event_digests:
            - "sha256:2daea29daf97fc4951568c4ad25feaa43af505e499f6624369402951e027a7c7"
          mutation_id: "kernel_work_item_inspection_required:sha256:e57c25fac470f5d70c4ec47a7e32dd4d4066159529fe421b698879e8c36b225e:sha256:a84722c1ee1be2c9e3abea9a6766b8a62ae1f89721650486efb0af6769f345d6"
        kernel_work_item_inspection_required:sha256:fefca920ed6aec185fbc16a333ecbbb665e342feda8b88d35e4c9f879d84d4e2:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380:
          after_revision: 46
          aggregate_digest: "sha256:ec1396776c4b4592ed2115b8011cacf0f223b57fa62ad8b05ae180d51883b7a1"
          before_revision: 45
          command_digest: "sha256:0c1ec800786eb53cf611fa5864ca60b0e393fa3d7114ad22a526828fafccd0f8"
          effect_ids: []
          event_digests:
            - "sha256:77fc68d1eced8b01643fc2263bba7faf8d9a87d0a4bd78412f8f2028b52d688c"
          mutation_id: "kernel_work_item_inspection_required:sha256:fefca920ed6aec185fbc16a333ecbbb665e342feda8b88d35e4c9f879d84d4e2:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
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
        result:sha256:2d969227558cd6b73287f160106f91f8e08eb6028d530f5cc62852843e1b6f1c:
          after_revision: 45
          aggregate_digest: "sha256:2cb23635168e8fe15777d4db008a59c8960bf89756e7851681b374d72af86b93"
          before_revision: 44
          command_digest: "sha256:b3eba7f06816fc69699b613f995f918b5c5a53b07f6f74c30f43189688133858"
          effect_ids: []
          event_digests:
            - "sha256:6a40bbef8ac67794a9091f3e69a0be1e312da899815f9406f73ab87d1b65dd89"
          mutation_id: "result:sha256:2d969227558cd6b73287f160106f91f8e08eb6028d530f5cc62852843e1b6f1c"
        result:sha256:447ccdeed9e6e0c84cc50598285945b1ed300308c99d1d4dd290026a59c584c1:
          after_revision: 52
          aggregate_digest: "sha256:2c42b390c4f9d6e9258b666e9af55c48137b4a594e8c43270e72f4db42069078"
          before_revision: 51
          command_digest: "sha256:72468cc10d3ea3b91d346d8c39f2a3cc85f260b6e3a108ad9257737c1b5746a0"
          effect_ids: []
          event_digests:
            - "sha256:e6b8f0c91636f8cf1926f684682171b0ac83c0378f28aa2b6335b00a24b335c9"
          mutation_id: "result:sha256:447ccdeed9e6e0c84cc50598285945b1ed300308c99d1d4dd290026a59c584c1"
        result:sha256:703f8e99baefe16b3b5a53576fd8c9ad980c9d244109536b791d714f9c415401:
          after_revision: 80
          aggregate_digest: "sha256:f887912a23f363b5e97976b3115433af6baa91495001d66a0386fbe936da98b0"
          before_revision: 79
          command_digest: "sha256:b1ad026c81868aa13d99dc3be73cd297fb784f47f77e57d3594ac4fabdd2f3fb"
          effect_ids: []
          event_digests:
            - "sha256:6322c7857e1a367d7c4e33d14003eb973d9a44f789bbf79b50a61f9379579f58"
          mutation_id: "result:sha256:703f8e99baefe16b3b5a53576fd8c9ad980c9d244109536b791d714f9c415401"
        result:sha256:90305df266b1253f4938db27575b23278e82a9588a1dba28bd894833b13fb84a:
          after_revision: 13
          aggregate_digest: "sha256:77816c199ad7950b68b59a255efdafb0368a950e4711356a27707d3602c18362"
          before_revision: 12
          command_digest: "sha256:f19b50f14c60d22475ae78a06b911d82532797a2fdc7f676974047ee2100ecba"
          effect_ids: []
          event_digests:
            - "sha256:b8bdd7af2d89f601c386621d1699e857903310e5dc9cc474c80e684965b343e8"
          mutation_id: "result:sha256:90305df266b1253f4938db27575b23278e82a9588a1dba28bd894833b13fb84a"
        result:sha256:ba61363c69313a5fcded9e5115eef96da907b1fb02544a10adcebbf496192edd:
          after_revision: 73
          aggregate_digest: "sha256:98ac11e7dd416f316b00b9fffe020e2853f341f4a453305c9e546d1ee5a07215"
          before_revision: 72
          command_digest: "sha256:83f173abda40f8039fe713d4ae19e184aaba692b5947447eb76ef3a09f65e70e"
          effect_ids: []
          event_digests:
            - "sha256:63558fa48c740ef29a00dd9505da75f31db59c53b05fc792152c6baa9820d5f4"
          mutation_id: "result:sha256:ba61363c69313a5fcded9e5115eef96da907b1fb02544a10adcebbf496192edd"
        result:sha256:d683f09e1e46160837419f9a6cc6fb7c76f484c37eb59c91e170b86f0eba9d52:
          after_revision: 66
          aggregate_digest: "sha256:5966a61c3d480050f799ad57a48dce66aab8590ff2cabe46194eaca14beed1b6"
          before_revision: 65
          command_digest: "sha256:8faaea91fe01856e1b0116f6c2590b82567cd43111e07604cb29c022c42d2d0a"
          effect_ids: []
          event_digests:
            - "sha256:7e9d13cbcba0fb56de642737796b708dc2d52c285dd4415bab318e9ad52b3b3b"
          mutation_id: "result:sha256:d683f09e1e46160837419f9a6cc6fb7c76f484c37eb59c91e170b86f0eba9d52"
        result:sha256:dfd8554c365f09d3d28792decd8c0e7274ddcf661c93df3ef52130116f7c5f4f:
          after_revision: 59
          aggregate_digest: "sha256:a353185b84e5955cb3b17805e6388b3dbb85f1da26032828cbeda9e0afbdc7f1"
          before_revision: 58
          command_digest: "sha256:051ccc067e3bd3c8c1c24539385de0ada2b79d78dc45f4bad4d753aac3d911c8"
          effect_ids: []
          event_digests:
            - "sha256:fab6f628095dcba29de1b10818879f4f8a6fdad67f55bff7d1bda262653d678f"
          mutation_id: "result:sha256:dfd8554c365f09d3d28792decd8c0e7274ddcf661c93df3ef52130116f7c5f4f"
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
        sha256:250bb2c036d627f41929acad925b2a06c34f2ee7a278415611b45034231a5e6f:
          after_revision: 72
          aggregate_digest: "sha256:d205c095b67bf1bdf6c28617b1b861259a4eb81f2b3dd7d1b14dc50fa56cadbe"
          before_revision: 71
          command_digest: "sha256:5fdbe9e8d54fd0cd301da8379fa3e98dd6f8f6d927ce23ca3864d9755f20a242"
          effect_ids: []
          event_digests:
            - "sha256:dccc917b8fdbad091ceb3969d1315f71f6c7beefffa9a42caa9c8829b7707caa"
          mutation_id: "sha256:250bb2c036d627f41929acad925b2a06c34f2ee7a278415611b45034231a5e6f"
        sha256:3bfe03c88608168967385f7cb05d36d59a01dbb8cb7c06d9112f6aa6da36c85c:
          after_revision: 58
          aggregate_digest: "sha256:2eb9fd9edab5f9918c6b122c0a53f0d794606f9ca06eb23d94784a0b3d85715b"
          before_revision: 57
          command_digest: "sha256:d63d14bf77b093c926e9b847a74a9425567822bc6f2bacba5c17850adc5df0a5"
          effect_ids: []
          event_digests:
            - "sha256:1e0fefbdec429196bffe84674b3b988bc7561d2a516018c6a9cae78da1850315"
          mutation_id: "sha256:3bfe03c88608168967385f7cb05d36d59a01dbb8cb7c06d9112f6aa6da36c85c"
        sha256:4e76e5e61e63c6cd7465667afabf4e6051cf62590ddb2c4ed3f1cf6331e05423:
          after_revision: 44
          aggregate_digest: "sha256:63dc4b353435b510b05f6057bc9596de47edb7d2c7c57ac6936bb0d3d337cdea"
          before_revision: 43
          command_digest: "sha256:7c9a43627ef53eacddcf1e706f5878f187c5418edb1516125c8e5720b155a018"
          effect_ids: []
          event_digests:
            - "sha256:47fcde1dec5fe38ac0ee428518bc8b2b8f2137d9b80ab560cfbd7fb4ef26dba1"
          mutation_id: "sha256:4e76e5e61e63c6cd7465667afabf4e6051cf62590ddb2c4ed3f1cf6331e05423"
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
        sha256:7e1cb92bec2c918674b83cdc649224903d1815faba3c748ca0229cbfb8f27a07:
          after_revision: 79
          aggregate_digest: "sha256:ed234c3ebb62ca7d813ce757322dcdaa00bc67207359bec3a436db9223a7217c"
          before_revision: 78
          command_digest: "sha256:969bc7f5b727ac3e5da4672e0093ce416217f6e651f44a5e8a70e66afb14a933"
          effect_ids: []
          event_digests:
            - "sha256:824d5fef124ddf2dbf601195681a466d5fd78c95e20978afb110ab3b83e2225c"
          mutation_id: "sha256:7e1cb92bec2c918674b83cdc649224903d1815faba3c748ca0229cbfb8f27a07"
        sha256:b875bfeab6dd15aea0ba8f17e71930d82bb824ee54b1f8bf874127975cca9ef2:
          after_revision: 65
          aggregate_digest: "sha256:f167b016062821fa33fc4ac9b703110e331bb62cf85d626ee88577d5259c402b"
          before_revision: 64
          command_digest: "sha256:3bd76a74716471f6db9c8214cfee51be9a79f0b8439ac2d7555df1cc2386eaa3"
          effect_ids: []
          event_digests:
            - "sha256:975b03417cf4689bd09e7692da26505ce1c39cbe73b4a7f17b29da3830024937"
          mutation_id: "sha256:b875bfeab6dd15aea0ba8f17e71930d82bb824ee54b1f8bf874127975cca9ef2"
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
        sha256:e81d13e2484ad482de98aa8847c9bb04de9cc1054977414ceb209a301cc88b7c:
          after_revision: 51
          aggregate_digest: "sha256:15174184926ceb89dfb7a2102af7da1ee6566b094e2a0e0232c5718f32e149d4"
          before_revision: 50
          command_digest: "sha256:52353fe2470e119ef807578f4efc997c2ad20093ae496cf0772625c058475666"
          effect_ids: []
          event_digests:
            - "sha256:cfbe4657dd6700a02cc616e276f79805ed9d0de83991387bfa3f940700fa2f06"
          mutation_id: "sha256:e81d13e2484ad482de98aa8847c9bb04de9cc1054977414ceb209a301cc88b7c"
        sha256:f11f83dbbf3cbbab3883363d858b00aa65972a53051b662b326213a6138bafef:
          after_revision: 31
          aggregate_digest: "sha256:69a1892f1e05a011bf31a358372377b9650558775ea2012dd124b058a72203bb"
          before_revision: 30
          command_digest: "sha256:63c41252c67b6dc183c0415478d2857321aa04bcc4b62b0c7313ff02a4d37658"
          effect_ids: []
          event_digests:
            - "sha256:f3d5829ba72e41d498e1cec2d3358f1fb2f1be8f3df6afc34bef9fec45dc59df"
          mutation_id: "sha256:f11f83dbbf3cbbab3883363d858b00aa65972a53051b662b326213a6138bafef"
        validation-resolution:sha256:129f1c5f7710d3206b5465cb03482d1f3f1318803ec0a8f51f3583dfa31009e7:
          after_revision: 69
          aggregate_digest: "sha256:9a9f84ff923b7b2f325d10192981d6d3cdbd0ab3575b9b2e79d7ef895c5aaf6d"
          before_revision: 68
          command_digest: "sha256:f3b0b8b9ecad29f47719fd08f00ea51ac657dd08fdf372d0a1ed51f97bc87307"
          effect_ids: []
          event_digests:
            - "sha256:fefc4a32af66b866248a2d19bdf7133655e9ab748c25c9a8da2231ef7090c425"
          mutation_id: "validation-resolution:sha256:129f1c5f7710d3206b5465cb03482d1f3f1318803ec0a8f51f3583dfa31009e7"
        validation-resolution:sha256:31186f3881cb292ba32a5a93f373a9bded1a96480d7cdf80d7a034775efb03c5:
          after_revision: 55
          aggregate_digest: "sha256:1959a7009a6253af06b0c56beb7ddcfdcf030364f82a2fb46de9f6addc20cd71"
          before_revision: 54
          command_digest: "sha256:e7f9ebe07d4bd12e7ad29213149e7f73e34d891041d47461dc96b8f9db07ad2b"
          effect_ids: []
          event_digests:
            - "sha256:17d6f27af1c816cc565f400ec435ae92e498260b31e42ce1197b7a3c66868f0c"
          mutation_id: "validation-resolution:sha256:31186f3881cb292ba32a5a93f373a9bded1a96480d7cdf80d7a034775efb03c5"
        validation-resolution:sha256:4e6f74bbf2c7fd3c3555cc48b6aca55fca91dfa4132faca72f75ae59223633bb:
          after_revision: 76
          aggregate_digest: "sha256:457a47f38d07fdf49e667ce3faab844ed67bbc6170d4742032e6b5157528c94f"
          before_revision: 75
          command_digest: "sha256:92df8273586d33439cc44938ec2e4372a9449235c1974aa1234699e579dcd582"
          effect_ids: []
          event_digests:
            - "sha256:23b9a46efc53962a56cb891cf7a32f8004238a7c3f39da2a10279caef58b4e6a"
          mutation_id: "validation-resolution:sha256:4e6f74bbf2c7fd3c3555cc48b6aca55fca91dfa4132faca72f75ae59223633bb"
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
        validation-resolution:sha256:aefacde08912913508f9cc23845f85ea59cf5fdffb9baab02fdd111e0e39fc0c:
          after_revision: 83
          aggregate_digest: "sha256:1f3c4bfb6337778bd8d5d10b2330d0a188fc61b26bfea99c5babf7f013ed346a"
          before_revision: 82
          command_digest: "sha256:cc05db25a022837ee9608f70e0492d1b771decd2c622bb0f3c5d663f4f494fe6"
          effect_ids: []
          event_digests:
            - "sha256:961a2dbb36ee4c661a4aef585a0b64ab9e06e0afcbb9fa51bd67c5e4e499418f"
          mutation_id: "validation-resolution:sha256:aefacde08912913508f9cc23845f85ea59cf5fdffb9baab02fdd111e0e39fc0c"
        validation-resolution:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d:
          after_revision: 16
          aggregate_digest: "sha256:b3236ccbd84f080ef527df766434f3d6462d4d232567f1996f101c0d048fc41f"
          before_revision: 15
          command_digest: "sha256:0c1443aa9273dbc80b20cc3629cc0583c915e6b9bdeb1139a3b7b32c84e2e6b2"
          effect_ids: []
          event_digests:
            - "sha256:4adcf35848c8767d62007bc7024065d49c2df4c6b342015bed716dc332013491"
          mutation_id: "validation-resolution:sha256:e2684271622c11292627f1d6ef55582839219f8823f9161da934d7e48ba1434d"
        validation-resolution:sha256:e68bc0a74013bfc1a594d3465e975dab20733fad54bd8cb75b21a025f7bcb179:
          after_revision: 62
          aggregate_digest: "sha256:1e1badab2fd788b6461b4c35db34a7b4bac643c836b20102b62218fadf06b184"
          before_revision: 61
          command_digest: "sha256:9d4f4b7878f0661abcad103c061d4a66bd8b874413a46f673ea3db06189ab17d"
          effect_ids: []
          event_digests:
            - "sha256:2e979208d9e6c4dafe1d65a4b778cc2ecff5abd0f126ae6e270cd98952c4679a"
          mutation_id: "validation-resolution:sha256:e68bc0a74013bfc1a594d3465e975dab20733fad54bd8cb75b21a025f7bcb179"
        validation-resolution:sha256:f5c8e68d3566efeaba66e963183491747fe94d820e57e160b9db99e1ade1f4f7:
          after_revision: 48
          aggregate_digest: "sha256:ba598879014327a57d431be6d8e0e793f949e6175af66c5c5a4ee854a0caaec7"
          before_revision: 47
          command_digest: "sha256:dcbd6aaff55508173b3f97bc4c72466885164a96525dc97d3aa614dd90af95fd"
          effect_ids: []
          event_digests:
            - "sha256:a1c2f124fb666e604a7e26364129a530899dc282774287765ceff1b066b1458f"
          mutation_id: "validation-resolution:sha256:f5c8e68d3566efeaba66e963183491747fe94d820e57e160b9db99e1ade1f4f7"
        validation:sha256:2979843e07744c9c95cd39a2e40ab864f2f0f5c0b9274ff1b8a317977ef32e86:
          after_revision: 61
          aggregate_digest: "sha256:0d0af4dd34197a4e78ed23cf20042f67d27764f4737e6bba7466316203724280"
          before_revision: 60
          command_digest: "sha256:9acf0f2214e0d552270f7b2d92162567cc5ce5362c2a87962b56752191aaa00b"
          effect_ids: []
          event_digests:
            - "sha256:46f9bf4b2734df86c3cf83c86ee86b2f83587627f589a5cd4b25509c41a4cf02"
          mutation_id: "validation:sha256:2979843e07744c9c95cd39a2e40ab864f2f0f5c0b9274ff1b8a317977ef32e86"
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
        validation:sha256:8d0f969886ab4aa826444bf48aec4d3d8fec581b36d5658b65e1b51531555b44:
          after_revision: 54
          aggregate_digest: "sha256:725c6ff1b3decbf8f7245ed8443de7747b9722b14793fda8cd59960c781c726a"
          before_revision: 53
          command_digest: "sha256:106dbc23421b93e15a7d31276dd62dde8fca7c5193f17a13e932bd414ca54a59"
          effect_ids: []
          event_digests:
            - "sha256:def5f290a7e65cd2b1881de49180d1bac3be4988383bcc96309ef215ac643df0"
          mutation_id: "validation:sha256:8d0f969886ab4aa826444bf48aec4d3d8fec581b36d5658b65e1b51531555b44"
        validation:sha256:b410f6826662aa734acf5fdf89691157dfb91e9b658a405a88541e23856cc775:
          after_revision: 68
          aggregate_digest: "sha256:1838bcf5a92ba455ab8d9299dfa35e695318246b4d0fdb6924f6b6da39dccce1"
          before_revision: 67
          command_digest: "sha256:319329574fff4d9f68ac76fe387a40c13e512e6d3e24e35f60655e03f4b2c20b"
          effect_ids: []
          event_digests:
            - "sha256:7280d584ed3e95b21e5c05cbd994770714e509dd1ea03186a4b48bd20cfcc22f"
          mutation_id: "validation:sha256:b410f6826662aa734acf5fdf89691157dfb91e9b658a405a88541e23856cc775"
        validation:sha256:cc946705b56dbe559b5b6977dd8660d121a7b5f534a708a001619e9eca3074ad:
          after_revision: 82
          aggregate_digest: "sha256:5018e77dd773125060b864631cc5b0260e3e2b5ba1d0dd33f0563beb171efcd2"
          before_revision: 81
          command_digest: "sha256:8e0e071bf10d856b46d255bd76502ff9eee691e8efbaf02a4436e86d2c097370"
          effect_ids: []
          event_digests:
            - "sha256:fc00d2b56d0ff82ff3ed7f8c6de90b6d3956fe66b93fb1a1dc24c30554ea84c1"
          mutation_id: "validation:sha256:cc946705b56dbe559b5b6977dd8660d121a7b5f534a708a001619e9eca3074ad"
        validation:sha256:d1ca413b72f92dc29492257f7ebbf84cb6932a8c13f6df1657aa9cd3beca3e74:
          after_revision: 47
          aggregate_digest: "sha256:4fcd4d7390c1d5a99e63a7b1ede54ffc39580bdfb4797a0ca0106f11031b92b4"
          before_revision: 46
          command_digest: "sha256:bf3de0bf82d01ebdd6f16ba36fe74443beea679509bf6da275f79b68beb9dfe8"
          effect_ids: []
          event_digests:
            - "sha256:70ff3862a16a9e0fe13e7e6c4efaa883decfcd9cb032c1e7a2efd8b4ba3c1b94"
          mutation_id: "validation:sha256:d1ca413b72f92dc29492257f7ebbf84cb6932a8c13f6df1657aa9cd3beca3e74"
        validation:sha256:d3fa09ef4320137728f7495e0467619270081f3e7cd3cd64afdd4eef4f46093c:
          after_revision: 75
          aggregate_digest: "sha256:e1e163e6857c435447716ea4fe590c88f473b2b17e23149d22072f207e4a291f"
          before_revision: 74
          command_digest: "sha256:95f5c55c558f657f9489c7fa8ce43b38f053ee1f727f1c0cfb8444ce77581788"
          effect_ids: []
          event_digests:
            - "sha256:ddfb4ab8b48cd90b23ee6f588a9015533a35b259a37f7ea23d15a664a00efb3c"
          mutation_id: "validation:sha256:d3fa09ef4320137728f7495e0467619270081f3e7cd3cd64afdd4eef4f46093c"
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
      revision: 85
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:ad99383976d6bc78936b4591f9c462e750a9b60131659b9631e8d65ad62d971d"
              id: "lc-07-accepted"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-07"
          result_digest: "sha256:f7106b24ed7045c49e83083c3420b03d41ad6fcae0db9f80291d2b776ffddeca"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:5da44aca042e74dc8f6b7a7695f36e3b7e772d14431fb5c76faecd96e32b2680"
              - "sha256:231010f59c6624a407d3ff915c785463f802b55a08ffcb8c95a25101526355a8"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:968516a4a53a04a930f0f55e21c8c5ba59e68e743b30f5a6250d3086547198b3"
              environment_digest: "sha256:e4799605b8abcc6b12aa49524a576f9556093dab752502a3b584b67ca9de16b2"
              implementation_identity: "sha256:f7106b24ed7045c49e83083c3420b03d41ad6fcae0db9f80291d2b776ffddeca"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-09-21T04:32:34.433Z"
            status: "PASSED"
        lc-08:
          attempt: 1
          claim_id: "sha256:6e69ca6d4d358b7c2028eac8977feb209780d0180a3433890b909331103525d2"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:a1cbf66720e2d05fa64b7359f040d4ecc71f691b318e610e157379914b384fb3"
              id: "lc-08-accepted"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-08"
          result_digest: "sha256:18663d2b1217e36b201c8ffea0ef4a54dba0a426af77d0c34d0c9cac5d4d149b"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:32af251fbdeb7cc62847d114c50204a38e856250177e32a1a216f9a43b94e0a2"
              - "sha256:2b54d843c98d14a821746fe614ec10c984bad72ea30ee1d447b088d20365b1c8"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:7151e4df9f80eb3b667699911b07bb56953d267f1b6d8fd7fb1e4885d6c1625b"
              environment_digest: "sha256:177d7016a96effce2ef433e07aec74db47ab9aca0528c4606e1efa4b1a2beeb1"
              implementation_identity: "sha256:18663d2b1217e36b201c8ffea0ef4a54dba0a426af77d0c34d0c9cac5d4d149b"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-09-21T04:38:14.390Z"
            status: "PASSED"
        lc-09:
          attempt: 1
          claim_id: "sha256:88add9dbf4a811d395ac06fd4919f74ea2f3d1f751b5e410c9d7938a47bbc512"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:6a921b19786c6b7b5c7579b23da2b56cf724034076ab170bf976cfd2865513b4"
              id: "lc-09-accepted"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-09"
          result_digest: "sha256:59f888929148541dd38803ea1f85d24ada715313930ea2f077ef976b932dc5ba"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:15480b511fbb55ffb3a10d27a84155a6021f48ee1438540b606c745757ccfb7a"
              - "sha256:0f5fe2896be5e304318cf0dbf26240cdcaf70d7658e73db430fb3bf4fb63e6fe"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:796a91f94bd0e55c7985cb48b7344e72ee9cb2c53d4d8609edaf4a3a9b7e31a4"
              environment_digest: "sha256:44d02f3947165cc19e59c9237f3d7dbe8bb5619d617e27b36993179f6277dd56"
              implementation_identity: "sha256:59f888929148541dd38803ea1f85d24ada715313930ea2f077ef976b932dc5ba"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-09-21T05:04:32.689Z"
            status: "PASSED"
        lc-10:
          attempt: 1
          claim_id: "sha256:60b0b23f18f9517dfd64733f6266a2c6141a86750866e5384333536918892cfa"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:34261a2d93fa41538ff2ebe25643cdab1299771da9765aa6c297b7a08bd5bed0"
              id: "lc-10-accepted"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-10"
          result_digest: "sha256:fd0d40d0178fa960f84999b5908c9563304f61801c9053889c3060c731486f85"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:921f242066b95403238efbe6e03963364b72e8f3221e72b6bdf73a1f0275a69c"
              - "sha256:897cc55dd275ea8b35d493630491cff6ba32baaebbe0aa5291bf80517362e0de"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:459f9721f77ffecf2b9515d0e0093507cc3cd78ac1b706e67c1ba6e737e831c5"
              environment_digest: "sha256:4ceb73c794e95e2e8b5b64ffe3bb51e5474d0779f1731fa99aeb2806aaa18ad2"
              implementation_identity: "sha256:fd0d40d0178fa960f84999b5908c9563304f61801c9053889c3060c731486f85"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-09-21T05:18:42.403Z"
            status: "PASSED"
        lc-11:
          attempt: 1
          claim_id: "sha256:a0826a3b56096c2e44ff3eedcf25675f890e651d124b3950d94d21ede7227b23"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:63d622b9ab338e297711867a6f06885c0b37f33e19a9b614bd6b1776c848d5b6"
              id: "lc-11-accepted"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-11"
          result_digest: "sha256:15925c781081a4e28f194c3602167c50e2e75b727dfd4023de8d35d20ccd8f9f"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:299b9bcc6848d2d0b8f1b746de5605ac5044a80176c67b825d911b97a91af324"
              - "sha256:375c1f7d608d241ffdbf5e040ae1fb58e5cd5fb458bb3c494de09115c0ebda17"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:805390ab6da3d5e94d40a7c6099cbaeb9a19ff35f1eb0131403ab3f465808a31"
              environment_digest: "sha256:9041f08d7c648c68b5d358d8eceae6bc0105f21dd2a45eaad9984432039934e0"
              implementation_identity: "sha256:15925c781081a4e28f194c3602167c50e2e75b727dfd4023de8d35d20ccd8f9f"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-09-21T05:27:56.659Z"
            status: "PASSED"
        lc-12:
          attempt: 1
          claim_id: "sha256:6b8f7936e99eb37428b8196bd6536a54b7eceec414109ccd7f01c73eaf07ab19"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:46cf5b5a274d0b38d21d48aa6a281cf06a8ebe663e74fbff703e0ddde74bd020"
              id: "lc-12-accepted"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
              task_id: "202609210324-CC13V3"
              work_item_id: "lc-12"
          result_digest: "sha256:af1260a4294e9948cd60f66ad9e6168246d993ef6b6f0828bbd549594e7f99ec"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:3949801abb320e73110119bd1adc78b6c5d63fc8d2cd95f4d70a99e855d1d79c"
              - "sha256:e2b862f7af271d96ed7cd240e01f8c5031464a0bbe53c3b815495d0607bfc946"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:d9d8be0b07bb12bbcace4271870acb43efa5d0387fe28ab496b6630a09c863b6"
              environment_digest: "sha256:8a880f9d0302425c1cdd0df171b36cd3b048e7513b95f3c476d6b84542208fe7"
              implementation_identity: "sha256:af1260a4294e9948cd60f66ad9e6168246d993ef6b6f0828bbd549594e7f99ec"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-09-21T05:39:40.850Z"
            status: "PASSED"
        lc-13:
          attempt: 1
          claim_id: "sha256:ccfc87132592b023acad40f01028e4afe6009e8746ea1b95473eca8be5d80177"
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
          revision: 4
          state: "EXECUTING"
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
    digest: "sha256:4457ab0840a70c965c4a7c9721294759747641fafd490b106709b5798e6ba124"
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
      -
        command_digest: "sha256:7c9a43627ef53eacddcf1e706f5878f187c5418edb1516125c8e5720b155a018"
        id: "sha256:4e76e5e61e63c6cd7465667afabf4e6051cf62590ddb2c4ed3f1cf6331e05423:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4e76e5e61e63c6cd7465667afabf4e6051cf62590ddb2c4ed3f1cf6331e05423"
        occurred_at: "2026-09-21T04:31:01.895Z"
        payload_digest: "sha256:0ba4b46d6bd001351d376e99d29b28ed8a9e6e5c814f9386d8572f9cebc65fef"
        task_id: "202609210324-CC13V3"
        task_revision: 44
      -
        command_digest: "sha256:b3eba7f06816fc69699b613f995f918b5c5a53b07f6f74c30f43189688133858"
        id: "result:sha256:2d969227558cd6b73287f160106f91f8e08eb6028d530f5cc62852843e1b6f1c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:2d969227558cd6b73287f160106f91f8e08eb6028d530f5cc62852843e1b6f1c"
        occurred_at: "2026-09-21T04:31:06.229Z"
        payload_digest: "sha256:e8296e2f508bc74e2747e34f4a473be2e61a0acbb95a631522df4bf8e70dee0f"
        task_id: "202609210324-CC13V3"
        task_revision: 45
      -
        command_digest: "sha256:0c1ec800786eb53cf611fa5864ca60b0e393fa3d7114ad22a526828fafccd0f8"
        id: "kernel_work_item_inspection_required:sha256:fefca920ed6aec185fbc16a333ecbbb665e342feda8b88d35e4c9f879d84d4e2:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fefca920ed6aec185fbc16a333ecbbb665e342feda8b88d35e4c9f879d84d4e2:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
        occurred_at: "2026-09-21T04:31:09.846Z"
        payload_digest: "sha256:3b47a4f72ab7ab9b3cfafc1174f8be60080d50a0014e4b0b04406f5a1b69f16d"
        task_id: "202609210324-CC13V3"
        task_revision: 46
      -
        command_digest: "sha256:bf3de0bf82d01ebdd6f16ba36fe74443beea679509bf6da275f79b68beb9dfe8"
        id: "validation:sha256:d1ca413b72f92dc29492257f7ebbf84cb6932a8c13f6df1657aa9cd3beca3e74:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:d1ca413b72f92dc29492257f7ebbf84cb6932a8c13f6df1657aa9cd3beca3e74"
        occurred_at: "2026-09-21T04:32:37.542Z"
        payload_digest: "sha256:cd4120d796b77b82ba5f204f09a5f88bc5bff7686bfc3a4178bc5d2778ff20a4"
        task_id: "202609210324-CC13V3"
        task_revision: 47
      -
        command_digest: "sha256:dcbd6aaff55508173b3f97bc4c72466885164a96525dc97d3aa614dd90af95fd"
        id: "validation-resolution:sha256:f5c8e68d3566efeaba66e963183491747fe94d820e57e160b9db99e1ade1f4f7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:f5c8e68d3566efeaba66e963183491747fe94d820e57e160b9db99e1ade1f4f7"
        occurred_at: "2026-09-21T04:32:39.762Z"
        payload_digest: "sha256:49a5ab2916791286794d7b8826aec0460831d51f8d946e88087187ad77c32af1"
        task_id: "202609210324-CC13V3"
        task_revision: 48
      -
        command_digest: "sha256:dc258efa4528162dae716d4e81ee3d7ba720bc217bad744bb3d529f2618819f1"
        id: "kernel_work_item_claim_required:sha256:ccf12e958582247df637e29c8ab9892bc3c7382633b8fa535be8b6e2d8d9c607:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ccf12e958582247df637e29c8ab9892bc3c7382633b8fa535be8b6e2d8d9c607:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
        occurred_at: "2026-09-21T04:32:44.209Z"
        payload_digest: "sha256:a8ab5da46010ff17fa02de04a8b9468b3acd2b6ed9c17e55d3b78a2c8782aa87"
        task_id: "202609210324-CC13V3"
        task_revision: 49
      -
        command_digest: "sha256:6a0be41766c5738a335f568e25e13c6863dd544d5d245f5bd3edf45908fce83b"
        id: "kernel_work_item_execution_required:sha256:efaa4ed41e93e0097d760eec73ba279592d044743872a96f1abaaeef91630f51:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:efaa4ed41e93e0097d760eec73ba279592d044743872a96f1abaaeef91630f51:sha256:e3401740b206ad77d5096d8db3ce9ab7bc33bdc4c3fcda605136b3055c3e2380"
        occurred_at: "2026-09-21T04:32:47.619Z"
        payload_digest: "sha256:73adb8c182f05db4f2e6a5193e7e62702fd8c6989dbbc34809a9f59bc5dc8825"
        task_id: "202609210324-CC13V3"
        task_revision: 50
      -
        command_digest: "sha256:52353fe2470e119ef807578f4efc997c2ad20093ae496cf0772625c058475666"
        id: "sha256:e81d13e2484ad482de98aa8847c9bb04de9cc1054977414ceb209a301cc88b7c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e81d13e2484ad482de98aa8847c9bb04de9cc1054977414ceb209a301cc88b7c"
        occurred_at: "2026-09-21T04:37:25.935Z"
        payload_digest: "sha256:3551244995323c5e202cce54880e5ed1c7a5a100f92e4a1984feda322fb37a69"
        task_id: "202609210324-CC13V3"
        task_revision: 51
      -
        command_digest: "sha256:72468cc10d3ea3b91d346d8c39f2a3cc85f260b6e3a108ad9257737c1b5746a0"
        id: "result:sha256:447ccdeed9e6e0c84cc50598285945b1ed300308c99d1d4dd290026a59c584c1:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:447ccdeed9e6e0c84cc50598285945b1ed300308c99d1d4dd290026a59c584c1"
        occurred_at: "2026-09-21T04:37:30.294Z"
        payload_digest: "sha256:6fb5465756c2cf6fab4ec4d6fec4eb5114e0afc908a2e5b2732392d57dd77a84"
        task_id: "202609210324-CC13V3"
        task_revision: 52
      -
        command_digest: "sha256:bbf2eaf48f6713b375ba1025146b7587265b628f0e86994a108d1e388ba269bd"
        id: "kernel_work_item_inspection_required:sha256:7653d9be6cefe40499b51fc764731c00e421ea20cd2509a1db47a232a67cfc21:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:7653d9be6cefe40499b51fc764731c00e421ea20cd2509a1db47a232a67cfc21:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
        occurred_at: "2026-09-21T04:37:33.898Z"
        payload_digest: "sha256:8cfb7d7a7bab1f0a496322b68afe9e57edc1e5dbd14af67ef3b6dfd2ea0d07e6"
        task_id: "202609210324-CC13V3"
        task_revision: 53
      -
        command_digest: "sha256:106dbc23421b93e15a7d31276dd62dde8fca7c5193f17a13e932bd414ca54a59"
        id: "validation:sha256:8d0f969886ab4aa826444bf48aec4d3d8fec581b36d5658b65e1b51531555b44:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:8d0f969886ab4aa826444bf48aec4d3d8fec581b36d5658b65e1b51531555b44"
        occurred_at: "2026-09-21T04:38:17.506Z"
        payload_digest: "sha256:015f2b5eb22bc06dd75a2c4ffaa018fa3c1ac3c4a875695ee3ec1366c6930367"
        task_id: "202609210324-CC13V3"
        task_revision: 54
      -
        command_digest: "sha256:e7f9ebe07d4bd12e7ad29213149e7f73e34d891041d47461dc96b8f9db07ad2b"
        id: "validation-resolution:sha256:31186f3881cb292ba32a5a93f373a9bded1a96480d7cdf80d7a034775efb03c5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:31186f3881cb292ba32a5a93f373a9bded1a96480d7cdf80d7a034775efb03c5"
        occurred_at: "2026-09-21T04:38:19.708Z"
        payload_digest: "sha256:f45b55230035d9446470efeb8317eb2ab86b7e3cb37cbe75bd650d7ecfe3360e"
        task_id: "202609210324-CC13V3"
        task_revision: 55
      -
        command_digest: "sha256:83bb496f1e7c37f86050c81f069db144a23f6acfeea3bebef751c891c3d32f3c"
        id: "kernel_work_item_claim_required:sha256:668760fc01053dc2bd2a6ab34c029e759f23fc8c8be2b4514c7b5e36317706b8:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:668760fc01053dc2bd2a6ab34c029e759f23fc8c8be2b4514c7b5e36317706b8:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
        occurred_at: "2026-09-21T04:38:24.228Z"
        payload_digest: "sha256:e274569d39b1d1f5dd241564cd92011f0b7d71d10ebfc0456dafef2f8be24e09"
        task_id: "202609210324-CC13V3"
        task_revision: 56
      -
        command_digest: "sha256:e172df0d6a48f8847bc9d50a9905222abdbfd7eb568f7698406350ae4062b0c7"
        id: "kernel_work_item_execution_required:sha256:3dfb780d7763adc0c1998dd21fcdab74827ad610e987aecd1a52f1e40ba3d034:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3dfb780d7763adc0c1998dd21fcdab74827ad610e987aecd1a52f1e40ba3d034:sha256:7a78ed0c32411dc35852ab2486b2eddfe7ba862acb735869b571f18aa40ea815"
        occurred_at: "2026-09-21T04:38:27.592Z"
        payload_digest: "sha256:683c413683c848a8f021ba3cad0592d934438debd0bcd6265bfae229b6a2f64a"
        task_id: "202609210324-CC13V3"
        task_revision: 57
      -
        command_digest: "sha256:d63d14bf77b093c926e9b847a74a9425567822bc6f2bacba5c17850adc5df0a5"
        id: "sha256:3bfe03c88608168967385f7cb05d36d59a01dbb8cb7c06d9112f6aa6da36c85c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:3bfe03c88608168967385f7cb05d36d59a01dbb8cb7c06d9112f6aa6da36c85c"
        occurred_at: "2026-09-21T05:02:55.623Z"
        payload_digest: "sha256:39d425cf18273386ba7397dc1e9c5041b3c512ad002f60a70b6c06bdd62c9545"
        task_id: "202609210324-CC13V3"
        task_revision: 58
      -
        command_digest: "sha256:051ccc067e3bd3c8c1c24539385de0ada2b79d78dc45f4bad4d753aac3d911c8"
        id: "result:sha256:dfd8554c365f09d3d28792decd8c0e7274ddcf661c93df3ef52130116f7c5f4f:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:dfd8554c365f09d3d28792decd8c0e7274ddcf661c93df3ef52130116f7c5f4f"
        occurred_at: "2026-09-21T05:02:59.962Z"
        payload_digest: "sha256:89c5a438f96ea2b80aa2e0f7a1548a9763fd44a92c64a9c53bb85025eca47861"
        task_id: "202609210324-CC13V3"
        task_revision: 59
      -
        command_digest: "sha256:9edda311913b8ef217726d40b45a885f8836bacc84a9ba2dadfa90f5fd3008ea"
        id: "kernel_work_item_inspection_required:sha256:9d51115517fa1b1355b14f3d9e939052c708147e763d0c8150c7a002df65a720:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:9d51115517fa1b1355b14f3d9e939052c708147e763d0c8150c7a002df65a720:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
        occurred_at: "2026-09-21T05:03:03.588Z"
        payload_digest: "sha256:9f79c6d7022277c85eea828a691b0b9848c36d9e103710ff7ad25cae72beede3"
        task_id: "202609210324-CC13V3"
        task_revision: 60
      -
        command_digest: "sha256:9acf0f2214e0d552270f7b2d92162567cc5ce5362c2a87962b56752191aaa00b"
        id: "validation:sha256:2979843e07744c9c95cd39a2e40ab864f2f0f5c0b9274ff1b8a317977ef32e86:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2979843e07744c9c95cd39a2e40ab864f2f0f5c0b9274ff1b8a317977ef32e86"
        occurred_at: "2026-09-21T05:04:35.795Z"
        payload_digest: "sha256:44aed9ff8852ebbc33c5d63e82904c5a8b3b589aa30ffac5a23737b84b3ec954"
        task_id: "202609210324-CC13V3"
        task_revision: 61
      -
        command_digest: "sha256:9d4f4b7878f0661abcad103c061d4a66bd8b874413a46f673ea3db06189ab17d"
        id: "validation-resolution:sha256:e68bc0a74013bfc1a594d3465e975dab20733fad54bd8cb75b21a025f7bcb179:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e68bc0a74013bfc1a594d3465e975dab20733fad54bd8cb75b21a025f7bcb179"
        occurred_at: "2026-09-21T05:04:38.035Z"
        payload_digest: "sha256:549553d878c18efc3b207a18305754d1e32f11dc76540096754f12817ef67091"
        task_id: "202609210324-CC13V3"
        task_revision: 62
      -
        command_digest: "sha256:c204e6769c119c19e2277f75848511c95ff0959aab9266eb8cdbba4b782f6401"
        id: "kernel_work_item_claim_required:sha256:28c65b2ff1f49ee56eac2754ea0a5b6cf7d70c9fd99e1f46b9e7c1374ee0d688:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:28c65b2ff1f49ee56eac2754ea0a5b6cf7d70c9fd99e1f46b9e7c1374ee0d688:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
        occurred_at: "2026-09-21T05:04:42.527Z"
        payload_digest: "sha256:257b3d825f9d2b38f2f52032d48050f5fb8ecfc7aaf5b5c7002a6c079d4b28f5"
        task_id: "202609210324-CC13V3"
        task_revision: 63
      -
        command_digest: "sha256:55bbb5cd0ec0804da2aa8661e988606619aa5bd9d45f96e5584565000f7025f4"
        id: "kernel_work_item_execution_required:sha256:52af8ecac4f7a4bc2e52a25bd9e5a1165d79155f4176fa96bfe8d4c6ab2213c2:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:52af8ecac4f7a4bc2e52a25bd9e5a1165d79155f4176fa96bfe8d4c6ab2213c2:sha256:970d846f8fb776052f252fa02c5bff6e1b291bb7ade3a2adcdb9bc6f1a6308aa"
        occurred_at: "2026-09-21T05:04:45.934Z"
        payload_digest: "sha256:3eb3595534644a655247e4b007a0c5d10060724324be31ca06aa8f91ffc1c15a"
        task_id: "202609210324-CC13V3"
        task_revision: 64
      -
        command_digest: "sha256:3bd76a74716471f6db9c8214cfee51be9a79f0b8439ac2d7555df1cc2386eaa3"
        id: "sha256:b875bfeab6dd15aea0ba8f17e71930d82bb824ee54b1f8bf874127975cca9ef2:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b875bfeab6dd15aea0ba8f17e71930d82bb824ee54b1f8bf874127975cca9ef2"
        occurred_at: "2026-09-21T05:17:01.933Z"
        payload_digest: "sha256:6ad7720c76ee716265d8c67bdc035d0d98393a05a3667c3d18b00fcee67ad5cf"
        task_id: "202609210324-CC13V3"
        task_revision: 65
      -
        command_digest: "sha256:8faaea91fe01856e1b0116f6c2590b82567cd43111e07604cb29c022c42d2d0a"
        id: "result:sha256:d683f09e1e46160837419f9a6cc6fb7c76f484c37eb59c91e170b86f0eba9d52:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:d683f09e1e46160837419f9a6cc6fb7c76f484c37eb59c91e170b86f0eba9d52"
        occurred_at: "2026-09-21T05:17:06.272Z"
        payload_digest: "sha256:412f0719f655c66e94fb9f86c88b7af4a91426fe0d9165cb3a29935b9dd512d6"
        task_id: "202609210324-CC13V3"
        task_revision: 66
      -
        command_digest: "sha256:ad019bd87aa6a849d3bbff22f687cfd81afa56e8891942d1fe2222e7cd9db387"
        id: "kernel_work_item_inspection_required:sha256:68c13c17c30398bcf8672b912d960b9c7a5b61d4a0035e9b848133a7e38da6b0:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:68c13c17c30398bcf8672b912d960b9c7a5b61d4a0035e9b848133a7e38da6b0:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
        occurred_at: "2026-09-21T05:17:09.865Z"
        payload_digest: "sha256:782554f23622b30225fdce6a02a58285801a25cec6e0200798d3a6870c8b63c8"
        task_id: "202609210324-CC13V3"
        task_revision: 67
      -
        command_digest: "sha256:319329574fff4d9f68ac76fe387a40c13e512e6d3e24e35f60655e03f4b2c20b"
        id: "validation:sha256:b410f6826662aa734acf5fdf89691157dfb91e9b658a405a88541e23856cc775:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b410f6826662aa734acf5fdf89691157dfb91e9b658a405a88541e23856cc775"
        occurred_at: "2026-09-21T05:18:45.483Z"
        payload_digest: "sha256:117b973bc8da84213df7c3cc1c0df364ee84af1126fe43241d53bc4e4327f51e"
        task_id: "202609210324-CC13V3"
        task_revision: 68
      -
        command_digest: "sha256:f3b0b8b9ecad29f47719fd08f00ea51ac657dd08fdf372d0a1ed51f97bc87307"
        id: "validation-resolution:sha256:129f1c5f7710d3206b5465cb03482d1f3f1318803ec0a8f51f3583dfa31009e7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:129f1c5f7710d3206b5465cb03482d1f3f1318803ec0a8f51f3583dfa31009e7"
        occurred_at: "2026-09-21T05:18:47.718Z"
        payload_digest: "sha256:7d4b139564b9a67f1091c7c1addafc180cb4b3e2633b3372211ea7ca2e0318b4"
        task_id: "202609210324-CC13V3"
        task_revision: 69
      -
        command_digest: "sha256:7ef5f19e9e6afacfcbb199c89dcfdcdd777524e3e0fea005068955bb9bb9c73b"
        id: "kernel_work_item_claim_required:sha256:ab8baea3204be01acc4520db727d8a373e3adb14f0b882f70f7f45891495ba45:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ab8baea3204be01acc4520db727d8a373e3adb14f0b882f70f7f45891495ba45:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
        occurred_at: "2026-09-21T05:18:52.221Z"
        payload_digest: "sha256:a2da109a8b181cb6be40337d65b7b1c1a58280bbcff3b880a0a3b52ae2157b03"
        task_id: "202609210324-CC13V3"
        task_revision: 70
      -
        command_digest: "sha256:2501d4be6d49bef8be0176f41716cff35c838ad55d40d4699e551f1cb526c438"
        id: "kernel_work_item_execution_required:sha256:c3b052a2f38c4a0b9b6f410e38755cef6ffc6a789b24c5f348007a768117d5a2:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c3b052a2f38c4a0b9b6f410e38755cef6ffc6a789b24c5f348007a768117d5a2:sha256:358d89186122d72f47f2049e9d11f4412e1004b863bed20fb5402b9d6156f4f0"
        occurred_at: "2026-09-21T05:18:55.634Z"
        payload_digest: "sha256:b378fe5734cbbb391393dfe2f7931f259d545a7efe8feb838a3dc4f3db0a6f2e"
        task_id: "202609210324-CC13V3"
        task_revision: 71
      -
        command_digest: "sha256:5fdbe9e8d54fd0cd301da8379fa3e98dd6f8f6d927ce23ca3864d9755f20a242"
        id: "sha256:250bb2c036d627f41929acad925b2a06c34f2ee7a278415611b45034231a5e6f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:250bb2c036d627f41929acad925b2a06c34f2ee7a278415611b45034231a5e6f"
        occurred_at: "2026-09-21T05:26:49.907Z"
        payload_digest: "sha256:f7e324bb95f2498f2d4a035690a2e2e765ac90b8601e2486c45024a4220938ad"
        task_id: "202609210324-CC13V3"
        task_revision: 72
      -
        command_digest: "sha256:83f173abda40f8039fe713d4ae19e184aaba692b5947447eb76ef3a09f65e70e"
        id: "result:sha256:ba61363c69313a5fcded9e5115eef96da907b1fb02544a10adcebbf496192edd:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:ba61363c69313a5fcded9e5115eef96da907b1fb02544a10adcebbf496192edd"
        occurred_at: "2026-09-21T05:26:54.306Z"
        payload_digest: "sha256:b179e1e7b20a7455ee985f592f4849e64a4e3227686872796bcad4f032cad3a3"
        task_id: "202609210324-CC13V3"
        task_revision: 73
      -
        command_digest: "sha256:bbe1b69bd48bceb8af1a99ef16f39c2a396993fcec876a40f53367397869d4a3"
        id: "kernel_work_item_inspection_required:sha256:e548d0b5630c34d280cf30c9fac8bfe4703c0c8b27f9adb7cdde79d0b8269d51:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e548d0b5630c34d280cf30c9fac8bfe4703c0c8b27f9adb7cdde79d0b8269d51:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
        occurred_at: "2026-09-21T05:26:57.975Z"
        payload_digest: "sha256:e70bb3ef9d7db65312b566644faeaf56ffdc5fdfa0b31c81d8bd968bb3869244"
        task_id: "202609210324-CC13V3"
        task_revision: 74
      -
        command_digest: "sha256:95f5c55c558f657f9489c7fa8ce43b38f053ee1f727f1c0cfb8444ce77581788"
        id: "validation:sha256:d3fa09ef4320137728f7495e0467619270081f3e7cd3cd64afdd4eef4f46093c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:d3fa09ef4320137728f7495e0467619270081f3e7cd3cd64afdd4eef4f46093c"
        occurred_at: "2026-09-21T05:27:59.754Z"
        payload_digest: "sha256:4ae2502aad39de95fca0021f2d7a86c5820ee4c5d03173077b066990c632eb06"
        task_id: "202609210324-CC13V3"
        task_revision: 75
      -
        command_digest: "sha256:92df8273586d33439cc44938ec2e4372a9449235c1974aa1234699e579dcd582"
        id: "validation-resolution:sha256:4e6f74bbf2c7fd3c3555cc48b6aca55fca91dfa4132faca72f75ae59223633bb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:4e6f74bbf2c7fd3c3555cc48b6aca55fca91dfa4132faca72f75ae59223633bb"
        occurred_at: "2026-09-21T05:28:01.981Z"
        payload_digest: "sha256:31978fb432bc4b25d6d267e138e01022e0f316fe9783dc8b5cc475166e4e3d8b"
        task_id: "202609210324-CC13V3"
        task_revision: 76
      -
        command_digest: "sha256:3cbe84a385c17bc549e37201c8c40ed6a3949a8c54196f6688f68562cac56c80"
        id: "kernel_work_item_claim_required:sha256:722d56b0849a0b85def18e9e8c3c8ee381d28dbe258e3d569b48945a10f13d93:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:722d56b0849a0b85def18e9e8c3c8ee381d28dbe258e3d569b48945a10f13d93:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
        occurred_at: "2026-09-21T05:28:06.519Z"
        payload_digest: "sha256:84ba2212bc35d3881c24ad5b26a3a1b75e985eb876f5cfe430544d68a123f3df"
        task_id: "202609210324-CC13V3"
        task_revision: 77
      -
        command_digest: "sha256:005604025d4c99fadea6632111b42f54ee7e367cfd2cda4900d1d1bcc45c95b9"
        id: "kernel_work_item_execution_required:sha256:94fc877a8aaed53e7684e78ffbcde39232f9ed6b2b8b75ac9bcacdaf88d37e47:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:94fc877a8aaed53e7684e78ffbcde39232f9ed6b2b8b75ac9bcacdaf88d37e47:sha256:bc411af3ae72e665ec7b5a175657a8c77a0d734e79f555a75d0a7acafa956169"
        occurred_at: "2026-09-21T05:28:09.965Z"
        payload_digest: "sha256:1e07a36d08a68057ba6f0a46403427e6c24c5259612903c8a3f017c01ce8c844"
        task_id: "202609210324-CC13V3"
        task_revision: 78
      -
        command_digest: "sha256:969bc7f5b727ac3e5da4672e0093ce416217f6e651f44a5e8a70e66afb14a933"
        id: "sha256:7e1cb92bec2c918674b83cdc649224903d1815faba3c748ca0229cbfb8f27a07:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7e1cb92bec2c918674b83cdc649224903d1815faba3c748ca0229cbfb8f27a07"
        occurred_at: "2026-09-21T05:38:30.408Z"
        payload_digest: "sha256:646c514230b4283348155b953bc1d4d21acb0d46f57a3dd6d2ace51267288a9e"
        task_id: "202609210324-CC13V3"
        task_revision: 79
      -
        command_digest: "sha256:b1ad026c81868aa13d99dc3be73cd297fb784f47f77e57d3594ac4fabdd2f3fb"
        id: "result:sha256:703f8e99baefe16b3b5a53576fd8c9ad980c9d244109536b791d714f9c415401:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:703f8e99baefe16b3b5a53576fd8c9ad980c9d244109536b791d714f9c415401"
        occurred_at: "2026-09-21T05:38:34.847Z"
        payload_digest: "sha256:05a00e17f73d597181968d50aa2e8b1bdcaed696e1c664e627218f9420de2047"
        task_id: "202609210324-CC13V3"
        task_revision: 80
      -
        command_digest: "sha256:3a4b05d9704c387dafa4e8468cc3d24246031e93c9687602eb035abcc54b33c4"
        id: "kernel_work_item_inspection_required:sha256:2703ac26c0817e4885a99bc14fc5fd0e1e8fa0f62ba07d54c1146edec4ea980b:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:2703ac26c0817e4885a99bc14fc5fd0e1e8fa0f62ba07d54c1146edec4ea980b:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
        occurred_at: "2026-09-21T05:38:38.758Z"
        payload_digest: "sha256:dcc6e293cbca36ba8665eeedb9b2e3bc5dcce7bf4d7d11f647ac820be2a94d36"
        task_id: "202609210324-CC13V3"
        task_revision: 81
      -
        command_digest: "sha256:8e0e071bf10d856b46d255bd76502ff9eee691e8efbaf02a4436e86d2c097370"
        id: "validation:sha256:cc946705b56dbe559b5b6977dd8660d121a7b5f534a708a001619e9eca3074ad:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:cc946705b56dbe559b5b6977dd8660d121a7b5f534a708a001619e9eca3074ad"
        occurred_at: "2026-09-21T05:39:43.993Z"
        payload_digest: "sha256:d8cf686099cf6b3e7ab70667f82a539ef4bb0664aadfbc1588bb94300ab64355"
        task_id: "202609210324-CC13V3"
        task_revision: 82
      -
        command_digest: "sha256:cc05db25a022837ee9608f70e0492d1b771decd2c622bb0f3c5d663f4f494fe6"
        id: "validation-resolution:sha256:aefacde08912913508f9cc23845f85ea59cf5fdffb9baab02fdd111e0e39fc0c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:aefacde08912913508f9cc23845f85ea59cf5fdffb9baab02fdd111e0e39fc0c"
        occurred_at: "2026-09-21T05:39:46.226Z"
        payload_digest: "sha256:ade48133883f8a35e548486afd95eff5c45c8bf74f0a39885330c4cdfd27f6a6"
        task_id: "202609210324-CC13V3"
        task_revision: 83
      -
        command_digest: "sha256:dd5333dbc98b388456fc4222c2f7f3a3e81d4298d8952e62f97394ee72ee163b"
        id: "kernel_work_item_claim_required:sha256:ba4a40bf9d0f54558ab47799f3770b15f8ccd32d8a989ce60d8263b4ed1578dd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ba4a40bf9d0f54558ab47799f3770b15f8ccd32d8a989ce60d8263b4ed1578dd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
        occurred_at: "2026-09-21T05:39:50.827Z"
        payload_digest: "sha256:1873970bc4b3fd428cbe6fa0fd824c12e3fdb54b73d35290a057ae3490fe47e8"
        task_id: "202609210324-CC13V3"
        task_revision: 84
      -
        command_digest: "sha256:856ca3c0cdf3883b08630d5b1b7fb9454cd85ed454bba369f5318de1abdefaaa"
        id: "kernel_work_item_execution_required:sha256:4abf85c18e46d6c4ee8ac52b12dd34245f0e7e9ae7832afd84f02f7e46cb48bd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4abf85c18e46d6c4ee8ac52b12dd34245f0e7e9ae7832afd84f02f7e46cb48bd:sha256:b595e5d49153fc36d917d734805f7105be355c6d6969b851fdd31a9581a265f9"
        occurred_at: "2026-09-21T05:39:54.276Z"
        payload_digest: "sha256:9c28730bd3ea9670de6d4b3f193b59bf885fb5618a1690b985d78b1d82010fa2"
        task_id: "202609210324-CC13V3"
        task_revision: 85
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
