---
id: "202609080711-X1A7B0"
title: "Remove ap task run from standard route recommendations and release AgentPlane v0.6.28"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "publish"
  - "merge"
blueprint_request: "release.strict"
verify:
  - "bun run release:parity"
  - "bun run release:prepublish"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-08T08:00:00.738Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:2c441a35b5b648dc3ac9cc0cf3bc652f9668ecbac0c670e02b780e036bae1ff4"
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
    - "effect_external_write"
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
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots:
      - ".agentplane/policy"
      - ".github"
      - "docs"
      - "packages"
      - "packages/agentplane/assets"
      - "packages/agentplane/src"
      - "scripts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Publication is irreversible and must remain behind the explicit release approval boundary."
      - "The change requires source or template updates, synchronized policy projections, regression tests, release metadata, hosted integration, and publication."
      - "The user explicitly requested a policy-backed routing correction and a patch release through a hosted PR."
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/policy"
      - ".github"
      - "docs"
      - "packages"
      - "packages/agentplane/assets"
      - "packages/agentplane/src"
      - "scripts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
      - "packages/agentplane/src/commands/task/begin.command.ts"
      - "packages/agentplane/src/commands/task/task.command.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
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
          - "docs"
          - "packages"
          - "packages/agentplane/assets"
          - "packages/agentplane/src"
          - "scripts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:e4a31c0f9293b50ab452344f61ea1aec4c1a5c2b0acb368b7601753ff11bdf16"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-next-action.ts"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
          - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
          - "packages/agentplane/src/commands/task/begin.command.ts"
          - "packages/agentplane/src/commands/task/task.command.ts"
        external_effects: []
        repository_effects:
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "63aa76504c1a3007172393186c667cf59d9ed4a8"
  message: "🚧 X1A7B0 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 83675d44dd9d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 63aa76504c1a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-08T07:21:45.247Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-08T07:39:41.137Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 83675d44dd9d. CLI accepted one state-bound external-agent semantic result."
    commit: "83675d44dd9d14c22a6c8038eb7d77e52667f417"
  -
    type: "status"
    at: "2026-09-08T07:44:18.806Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 63aa76504c1a. CLI accepted one state-bound external-agent semantic result."
    commit: "63aa76504c1a3007172393186c667cf59d9ed4a8"
doc_version: 3
doc_updated_at: "2026-09-08T07:49:10.609Z"
doc_updated_by: "SUPERVISOR"
description: "On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes."
sections:
  Summary: |-
    Remove ap task run from standard route recommendations and release AgentPlane v0.6.28

    On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes.
  Scope: |-
    - In scope: On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes.
    - Out of scope: unrelated refactors not required for "Remove ap task run from standard route recommendations and release AgentPlane v0.6.28".
  Plan: "Refined the maintenance plan to preserve task next-action as the v0.6.x route oracle, remove only task run from normal execution recommendations, and keep task execution with the current agent before verification."
  Verify Steps: |-
    1. Inspect standard route output and canonical policy projections. Expected: normal agent guidance uses `ap task active`, `ap task advance <task-id> --agent-json`, the typed result path, and exact resume argv; it does not recommend `ap task run`.
    2. Run focused route-decision, external-agent packet, prompt/policy projection, and help snapshot tests selected from changed files. Expected: all pass and preserve `task run` only as a compatibility/operator command.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing graph and policy size budgets pass.
    4. Run `git diff --check` and review `v0.6.27..HEAD`. Expected: only the approved routing fix, tests, task evidence, and 0.6.28 release surfaces changed; historical task/release artifacts remain untouched.
    5. Run `bun run release:parity`. Expected: all version surfaces and exact internal dependency pins resolve to 0.6.28.
    6. Run `bun run release:prepublish`. Expected: the complete local release gate passes.
    7. Verify the hosted PR targets `0.6.x` and required checks pass for its exact head SHA.
    8. After explicit publish approval, verify GitHub tag/release `v0.6.28` and npm versions for `agentplane`, `@agentplaneorg/core`, and `@agentplaneorg/recipes` all resolve to 0.6.28 from the exact integrated SHA.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:2c441a35b5b648dc3ac9cc0cf3bc652f9668ecbac0c670e02b780e036bae1ff4"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:19385cc77928543689d3a10676716a7fd5ac37864484eaa1d7978e6f8dff3c00"
    digest: "sha256:bb0ab93f942bda60f10c121f892e874268021e969e4f7323917d2f31c71dd7ba"
    grant_id: "3f7e36cd-96c9-477e-96d6-f26eb70d4c1f"
    issued_at: "2026-09-08T08:00:00.738Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:5f1d083f127df78494a1727824553135f87fd2c5d550f7e5971e3b5ed40aa79b"
    plan_revision: 12
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:b5748baf4b4563e95d479030fddd42488347235d907ec17f3c703352f0c88dfa"
    status: "active"
    task_id: "202609080711-X1A7B0"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-08T08:00:00.738Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:97d5738bc92f5f853bd45dd656e34eabadeb7ff6eeca5b720328247e4591a007"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-08T07:49:10.598Z"
      digest: "sha256:97d5738bc92f5f853bd45dd656e34eabadeb7ff6eeca5b720328247e4591a007"
      proposal:
        assumptions:
          - "The local 0.6.x maintenance branch points exactly at v0.6.27 and will be the hosted PR base."
          - "The task run command remains available for compatibility; only standard execution recommendations are removed."
          - "The v0.6.x task next-action route remains the supported route oracle and must not be replaced by a backport of the 0.7 task advance protocol."
          - "Historical task artifacts and prior release notes remain immutable."
        planning_baseline:
          captured_at: "2026-09-08T07:44:22.346Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:3e0be052070d43fb6a52d3aa02adb4646c9679750b7548e0bc422e4662915976"
          dirty_paths:
            - ".agentplane/tasks/202609080711-X1A7B0/README.md"
            - ".agentplane/tasks/202609080711-X1A7B0/supervision/declared-checks.json"
          git:
            kind: "commit"
            ref: null
            sha: "232ba29f2839f5481b72de2d863c05fbf78a4800"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:11"
        schema_version: 1
        task_id: "202609080711-X1A7B0"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "top-routing"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun x vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.task-guided.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts"
              id: "top-route-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run release:parity"
              id: "top-parity"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "top-prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "Verify hosted PR integration, exact-SHA GitHub v0.6.28 release, and npm package parity."
              id: "top-hosted"
              kind: "provider"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "top-route-tests"
                - "top-routing"
              description: "The v0.6.x standard route preserves task next-action, assigns execution to the current agent, and does not recommend task run."
              id: "top-1"
              required: true
            -
              check_ids:
                - "top-routing"
                - "top-route-tests"
                - "top-parity"
                - "top-prepublish"
                - "top-hosted"
              description: "The complete 0.6.28 candidate passes policy, parity, prepublish, hosted integration, and publication readback gates."
              id: "top-2"
              required: true
          evidence_fingerprint: "sha256:68d08eb2e71188d7a8aa134f754840d214181dd1fc2f50fe9f056719164ab87e"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-route-tests"
                  description: "Normal v0.6.x guidance preserves task active and task next-action, then assigns implementation to the current agent without recommending task run."
                  id: "route-1"
                  required: true
                -
                  check_ids:
                    - "focused-route-tests"
                    - "route-diff-review"
                  description: "The task run implementation remains available only for explicit compatibility or operator use and is absent from standard route recommendations."
                  id: "route-2"
                  required: true
                -
                  check_ids:
                    - "route-diff-review"
                  description: "Historical task artifacts and prior release notes are not rewritten."
                  id: "route-3"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "focused route tests"
                  - "task run compatibility implementation"
                required_sources:
                  - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
                  - "packages/agentplane/src/commands/task/task.command.ts"
                  - "packages/agentplane/src/commands/task/begin.command.ts"
                symbol_hints:
                  - "task next-action"
                  - "task run"
                  - "continue_direct"
                  - "current agent"
              depends_on: []
              expected_outputs:
                - "route-contract-complete"
              id: "route-contract"
              objective: "Keep task next-action as the v0.6.x route oracle and remove task run from standard direct-task execution recommendations so the current agent performs the task before verification."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.task-guided.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts"
                    id: "focused-route-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "Review v0.6.27..HEAD and confirm task next-action remains in the standard route, task run is absent only from standard recommendations, and historical artifacts are unchanged."
                    id: "route-diff-review"
                    kind: "semantic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "focused-route-tests"
                    description: "Normal v0.6.x guidance preserves task active and task next-action, then assigns implementation to the current agent without recommending task run."
                    id: "route-1"
                    required: true
                  -
                    check_ids:
                      - "focused-route-tests"
                      - "route-diff-review"
                    description: "The task run implementation remains available only for explicit compatibility or operator use and is absent from standard route recommendations."
                    id: "route-2"
                    required: true
                  -
                    check_ids:
                      - "route-diff-review"
                    description: "Historical task artifacts and prior release notes are not rewritten."
                    id: "route-3"
                    required: true
                evidence_fingerprint: "sha256:f5e8b6420baad9b348e926782c1d1083d89a78066f49fbc44e5f406d045d18bb"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release-parity"
                    - "release-prepublish"
                  description: "All synchronized version surfaces and exact internal dependency pins resolve to 0.6.28."
                  id: "release-1"
                  required: true
                -
                  check_ids:
                    - "release-diff-review"
                  description: "Release notes describe only the task run recommendation correction and preserved task next-action route."
                  id: "release-2"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 240000
                optional_sources:
                  - "docs/releases/v0.6.27.md"
                  - "scripts/release"
                required_sources:
                  - "docs/developer/release-and-publishing.mdx"
                  - ".agentplane/policy/workflow.release.md"
                  - "package.json"
                  - "packages/*/package.json"
                symbol_hints:
                  - "0.6.28"
                  - "release parity"
                  - "prepublish"
              depends_on:
                - "route-contract"
              expected_outputs:
                - "release-candidate-complete"
              id: "release-candidate"
              objective: "Prepare version 0.6.28 and concise release notes for the accepted route correction, then qualify the local release candidate."
              optional: false
              priority: 90
              required_inputs:
                - "route-contract-complete"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "maintenance-release-worktree"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/releases"
              risk: "high"
              scope_roots:
                - "packages"
                - "docs/releases"
                - ".agentplane/WORKFLOW.md"
                - "scripts"
                - "bun.lock"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:parity"
                    id: "release-parity"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release-prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "Review v0.6.27..HEAD for only the approved route fix, tests, task evidence, and v0.6.28 release surfaces."
                    id: "release-diff-review"
                    kind: "semantic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "release-parity"
                      - "release-prepublish"
                    description: "All synchronized version surfaces and exact internal dependency pins resolve to 0.6.28."
                    id: "release-1"
                    required: true
                  -
                    check_ids:
                      - "release-diff-review"
                    description: "Release notes describe only the task run recommendation correction and preserved task next-action route."
                    id: "release-2"
                    required: true
                evidence_fingerprint: "sha256:ac046f81307c80c9609df721996a94cd25e385965e62d5b3e681e9538468fbea"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "hosted-ci"
                  description: "The hosted PR targets 0.6.x and required checks pass for the exact candidate head."
                  id: "hosted-1"
                  required: true
                -
                  check_ids:
                    - "publish-readback"
                  description: "GitHub tag/release and the three public npm packages resolve to 0.6.28 from the exact integrated SHA."
                  id: "hosted-2"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "release-ready artifact"
                  - "publish-result artifact"
                required_sources:
                  - "qualified candidate SHA"
                  - "GitHub PR and workflow state"
                  - "npm registry state"
                symbol_hints:
                  - "0.6.x"
                  - "v0.6.28"
                  - "exact SHA"
              depends_on:
                - "release-candidate"
              expected_outputs:
                - "hosted-release-complete"
              id: "hosted-release"
              objective: "Open a PR targeting 0.6.x, wait for required checks, merge through the repository route, publish v0.6.28 from the exact integrated SHA, and verify GitHub and npm readback."
              optional: false
              priority: 80
              required_inputs:
                - "release-candidate-complete"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "github:basilisk-labs/agentplane"
                -
                  kind: "exclusive"
                  mode: "exclusive"
                  resource: "npm:v0.6.28"
              risk: "high"
              scope_roots:
                - "hosted provider state"
                - "npm registry"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "Observe required GitHub PR checks for the exact candidate head."
                    id: "hosted-ci"
                    kind: "provider"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "Verify v0.6.28 GitHub tag/release SHA and npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes."
                    id: "publish-readback"
                    kind: "provider"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "hosted-ci"
                    description: "The hosted PR targets 0.6.x and required checks pass for the exact candidate head."
                    id: "hosted-1"
                    required: true
                  -
                    check_ids:
                      - "publish-readback"
                    description: "GitHub tag/release and the three public npm packages resolve to 0.6.28 from the exact integrated SHA."
                    id: "hosted-2"
                    required: true
                evidence_fingerprint: "sha256:9cfa682073605915f4dcf8a7fcf22a6dc7e8171c60f56c14915672737dd985af"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609080711-X1A7B0"
    event_cursor: 8
    final_validation: null
    id: "202609080711-X1A7B0"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run release:parity"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run release:prepublish"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-08T07:11:06.770Z"
      constraints: []
      request: |-
        Remove ap task run from standard route recommendations and release AgentPlane v0.6.28

        On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes.
      task_id: "202609080711-X1A7B0"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-08T07:21:36.466Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-08T07:18:40.379Z"
        digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
        proposal:
          assumptions:
            - "The local 0.6.x maintenance branch points exactly at v0.6.27 and will be the hosted PR base."
            - "The task run command remains available for compatibility; only recommendations from the standard agent route are removed."
            - "The repository's exact-SHA workflow dispatch remains the supported publication path for a non-main maintenance branch."
            - "Historical task artifacts and prior release notes are immutable and excluded from the recommendation scan result."
          planning_baseline:
            captured_at: "2026-09-08T07:11:13.839Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:a46e65dc9a77afd8873658384028d70a760d13ab288f23c39172a286b2940a52"
            dirty_paths:
              - ".agentplane/tasks/202609080711-X1A7B0/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "top-routing"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "Run focused route, prompt, help, and policy projection tests selected from the changed implementation."
                id: "top-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run release:parity"
                id: "top-parity"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "top-prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "Verify hosted PR integration, exact-SHA release-ready evidence, GitHub v0.6.28, and npm package parity."
                id: "top-hosted"
                kind: "provider"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "top-routing"
                  - "top-tests"
                description: "The standard route no longer recommends task run and the replacement task advance exchange is complete and consistent."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "top-routing"
                  - "top-tests"
                  - "top-parity"
                  - "top-prepublish"
                  - "top-hosted"
                description: "The complete 0.6.28 candidate passes policy, parity, and prepublish gates before PR merge and exact-SHA publication."
                id: "top-2"
                required: true
            evidence_fingerprint: "sha256:d07fac73a32506476a1fd6cad12479d8e01cb9006b902e34b1af2d15b866866d"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "route-scan"
                      - "focused-tests"
                      - "routing-check"
                    description: "Normal agent workflow guidance uses task active followed by task advance --agent-json and exact result resumption, with no recommendation to execute task run."
                    id: "route-1"
                    required: true
                  -
                    check_ids:
                      - "route-scan"
                      - "focused-tests"
                    description: "The task run command may remain implemented and documented as a compatibility or operator surface, but it is absent from standard route recommendations."
                    id: "route-2"
                    required: true
                  -
                    check_ids:
                      - "diff-review"
                    description: "Historical task artifacts and prior release notes are not rewritten."
                    id: "route-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 300000
                  optional_sources:
                    - "docs/user"
                    - "docs/developer"
                    - "existing route decision tests"
                  required_sources:
                    - "AGENTS.md"
                    - ".agentplane/policy/workflow.branch_pr.md"
                    - ".agentplane/policy/workflow.release.md"
                    - "packages/agentplane/assets"
                    - "packages/agentplane/src"
                  symbol_hints:
                    - "task advance"
                    - "task run"
                    - "managed runner"
                    - "next command"
                    - "route recommendation"
                depends_on: []
                expected_outputs:
                  - "route-contract-complete"
                id: "route-contract"
                objective: "Audit the v0.6.27 standard route surfaces and change canonical policy, packaged projections, runtime recommendations, and focused tests so agents are directed to task advance exchange packets and are not directed to task run."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/policy"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/assets"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs"
                risk: "high"
                scope_roots:
                  - ".agentplane/policy"
                  - "packages/agentplane/assets"
                  - "packages/agentplane/src"
                  - "docs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "rg -n 'task run|task advance|managed runner' AGENTS.md .agentplane/policy packages/agentplane/assets packages/agentplane/src docs"
                      id: "route-scan"
                      kind: "structural"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "Run the focused route decision, task handoff, prompt/policy projection, and help snapshot tests selected from the changed implementation files."
                      id: "focused-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "Review the complete diff from v0.6.27 for scope, generated projection parity, and absence of historical artifact rewrites."
                      id: "diff-review"
                      kind: "semantic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "route-scan"
                        - "focused-tests"
                        - "routing-check"
                      description: "Normal agent workflow guidance uses task active followed by task advance --agent-json and exact result resumption, with no recommendation to execute task run."
                      id: "route-1"
                      required: true
                    -
                      check_ids:
                        - "route-scan"
                        - "focused-tests"
                      description: "The task run command may remain implemented and documented as a compatibility or operator surface, but it is absent from standard route recommendations."
                      id: "route-2"
                      required: true
                    -
                      check_ids:
                        - "diff-review"
                      description: "Historical task artifacts and prior release notes are not rewritten."
                      id: "route-3"
                      required: true
                  evidence_fingerprint: "sha256:37a0ad8bea06a48b00f28e7bc89197f218490aaec05c5ad7b2c6f7b6a8cf939f"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release-parity"
                      - "release-prepublish"
                    description: "All synchronized package and runtime version surfaces resolve to 0.6.28 and internal dependency pins match exactly."
                    id: "release-1"
                    required: true
                  -
                    check_ids:
                      - "release-parity"
                      - "diff-review-release"
                    description: "Release notes describe only the task run recommendation correction and its compatibility boundary."
                    id: "release-2"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 240000
                  optional_sources:
                    - "docs/releases/v0.6.27.md"
                    - "scripts/release"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - ".agentplane/policy/workflow.release.md"
                    - "package.json"
                    - "packages/*/package.json"
                  symbol_hints:
                    - "release plan"
                    - "release candidate"
                    - "0.6.28"
                    - "release parity"
                    - "prepublish"
                depends_on:
                  - "route-contract"
                expected_outputs:
                  - "release-candidate-complete"
                id: "release-candidate"
                objective: "Prepare version 0.6.28 and its release notes from the accepted routing fix, then run local release parity and prepublish qualification and produce a candidate branch for review."
                optional: false
                priority: 90
                required_inputs:
                  - "route-contract-complete"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "maintenance-release-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases"
                risk: "high"
                scope_roots:
                  - "packages"
                  - "docs/releases"
                  - ".agentplane/WORKFLOW.md"
                  - "scripts"
                  - "bun.lock"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:parity"
                      id: "release-parity"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release-prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      command: "Review v0.6.27..HEAD and confirm the release candidate contains only the approved routing fix, tests, task evidence, and 0.6.28 release surfaces."
                      id: "diff-review-release"
                      kind: "semantic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "release-parity"
                        - "release-prepublish"
                      description: "All synchronized package and runtime version surfaces resolve to 0.6.28 and internal dependency pins match exactly."
                      id: "release-1"
                      required: true
                    -
                      check_ids:
                        - "release-parity"
                        - "diff-review-release"
                      description: "Release notes describe only the task run recommendation correction and its compatibility boundary."
                      id: "release-2"
                      required: true
                  evidence_fingerprint: "sha256:ac046f81307c80c9609df721996a94cd25e385965e62d5b3e681e9538468fbea"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "hosted-ci"
                    description: "The hosted PR targets 0.6.x and all required checks pass for the exact candidate head."
                    id: "hosted-1"
                    required: true
                  -
                    check_ids:
                      - "publish-readback"
                    description: "Publication uses the exact integrated 0.6.x SHA and produces matching GitHub tag, release, and npm versions for 0.6.28."
                    id: "hosted-2"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "publish-result artifact"
                    - "release-ready artifact"
                  required_sources:
                    - "qualified candidate SHA"
                    - "GitHub PR and workflow state"
                    - "npm registry state"
                  symbol_hints:
                    - "0.6.x"
                    - "v0.6.28"
                    - "release-ready"
                    - "publish-result"
                depends_on:
                  - "release-candidate"
                expected_outputs:
                  - "hosted-release-complete"
                id: "hosted-release"
                objective: "Open and pass the PR targeting 0.6.x, merge only after hosted checks are green, then publish v0.6.28 from the exact integrated SHA and verify GitHub and npm evidence."
                optional: false
                priority: 80
                required_inputs:
                  - "release-candidate-complete"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "github:basilisk-labs/agentplane"
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "npm:v0.6.28"
                risk: "high"
                scope_roots:
                  - "hosted provider state"
                  - "npm registry"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "Observe required GitHub PR checks and exact-SHA Core CI release-ready evidence."
                      id: "hosted-ci"
                      kind: "provider"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      command: "Verify v0.6.28 tag and GitHub Release SHA plus agentplane, @agentplaneorg/core, and @agentplaneorg/recipes npm versions."
                      id: "publish-readback"
                      kind: "provider"
                      required: true
                      timeout_ms: 1800000
                  criteria:
                    -
                      check_ids:
                        - "hosted-ci"
                      description: "The hosted PR targets 0.6.x and all required checks pass for the exact candidate head."
                      id: "hosted-1"
                      required: true
                    -
                      check_ids:
                        - "publish-readback"
                      description: "Publication uses the exact integrated 0.6.x SHA and produces matching GitHub tag, release, and npm versions for 0.6.28."
                      id: "hosted-2"
                      required: true
                  evidence_fingerprint: "sha256:9cfa682073605915f4dcf8a7fcf22a6dc7e8171c60f56c14915672737dd985af"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609080711-X1A7B0"
    revision: 13
    schema_version: 1
    updated_at: "2026-09-08T07:49:10.609Z"
    work_items:
      hosted-release:
        attempt: 0
        claim_id: null
        id: "hosted-release"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      release-candidate:
        attempt: 0
        claim_id: null
        id: "release-candidate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      route-contract:
        attempt: 0
        claim_id: null
        id: "route-contract"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-08T07:39:43.115Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_804feb93315b8f22ae40e56f"
        mutation_id: "external-result:work-order-202609080711-X1A7B0-executor-51f87e08372335b16afcd608"
        plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609080711-X1A7B0"
        task_revision: 7
        work_item_id: "route-contract"
      -
        at: "2026-09-08T07:44:20.626Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_a29891a6de5aa7e2ba5b89e8"
        mutation_id: "plan-refinement:work-order-202609080711-X1A7B0-executor-06170c66150cadd5f08dfbb9"
        plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609080711-X1A7B0"
        task_revision: 10
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:004abbb5fa94d8f2a383ee57459aae462ab55a16f29a6691100a76947e03f5ae:
        aggregate_digest: "sha256:0d9e184d18befc9c265570387c4a0f330496b07616701dda3e94bcc53ce89763"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:39:41.137Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f0102206a4583ae281448d13"
          mutation_id: "compatibility:sha256:004abbb5fa94d8f2a383ee57459aae462ab55a16f29a6691100a76947e03f5ae"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:004abbb5fa94d8f2a383ee57459aae462ab55a16f29a6691100a76947e03f5ae"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      compatibility:sha256:39fe7e0f85a44af1b44ed574d23974c86f77e29143e521e0d9bc381e785fed4a:
        aggregate_digest: "sha256:0227f7fff2d61455ea28ad0b70d1bff8533c5cd1ce172442ebc081af8c3e77ba"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:44:18.806Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7d3d1c9d4416223a9a99018b"
          mutation_id: "compatibility:sha256:39fe7e0f85a44af1b44ed574d23974c86f77e29143e521e0d9bc381e785fed4a"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:39fe7e0f85a44af1b44ed574d23974c86f77e29143e521e0d9bc381e785fed4a"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      compatibility:sha256:3debc4cbffcd5357933758803cf80cbbe0c2cabfdb093ec19b664ee03173848f:
        aggregate_digest: "sha256:838f50d9008213f00e72b54a2058accdcac806187ef9efcfe98100673e6aed59"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:21:05.829Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_1320a50b792fc1351df3fba5"
          mutation_id: "compatibility:sha256:3debc4cbffcd5357933758803cf80cbbe0c2cabfdb093ec19b664ee03173848f"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3debc4cbffcd5357933758803cf80cbbe0c2cabfdb093ec19b664ee03173848f"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      compatibility:sha256:7b3cd55b84653a67db2b63938934b74794fd6ba85254c019ead45d81c700f389:
        aggregate_digest: "sha256:e200493503d4cf8d0f8247a297f4fc3017f85ac6798310a24e249fbd97461c20"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:49:10.609Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_34df50169c1c2b3cf5b951c4"
          mutation_id: "compatibility:sha256:7b3cd55b84653a67db2b63938934b74794fd6ba85254c019ead45d81c700f389"
          plan_digest: "sha256:97d5738bc92f5f853bd45dd656e34eabadeb7ff6eeca5b720328247e4591a007"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:7b3cd55b84653a67db2b63938934b74794fd6ba85254c019ead45d81c700f389"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      compatibility:sha256:8e25866967d7290b9ece2621c87c89217b1c7c7522953fc55020d9be1410d1d2:
        aggregate_digest: "sha256:f4702bd0fa21f82631cd1a5178e5bcbe5ca7452e4400e8e2cf43c3142a7425cf"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:21:45.247Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0daac6c677d32ca9f95b6d83"
          mutation_id: "compatibility:sha256:8e25866967d7290b9ece2621c87c89217b1c7c7522953fc55020d9be1410d1d2"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8e25866967d7290b9ece2621c87c89217b1c7c7522953fc55020d9be1410d1d2"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      compatibility:sha256:a45201886bacc9cd8022d366389bd624783215f909f20d270d89c4d6417952fe:
        aggregate_digest: "sha256:fb806c7a8f2f4d7f0903a45c1ec413b64004e2aac57dfd34a1404bb42fc755bb"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:44:18.806Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d3155e739895377e140b6f2b"
          mutation_id: "compatibility:sha256:a45201886bacc9cd8022d366389bd624783215f909f20d270d89c4d6417952fe"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a45201886bacc9cd8022d366389bd624783215f909f20d270d89c4d6417952fe"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      compatibility:sha256:ca70972d802add68794e7910d33e9627a89efed94ef969181c393a334db074ee:
        aggregate_digest: "sha256:22d5434e0b215eb27780184368254d179fe7e863ee537f65d0c365eea4437696"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:39:41.137Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_df9fe9e6c51a140604d05b2c"
          mutation_id: "compatibility:sha256:ca70972d802add68794e7910d33e9627a89efed94ef969181c393a334db074ee"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ca70972d802add68794e7910d33e9627a89efed94ef969181c393a334db074ee"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      compatibility:sha256:f47315f777d4fb48912b5ae5668d65540c2a8ae34e8cb92a4f78f18035990b62:
        aggregate_digest: "sha256:4ef70121024bb7223f1f2ea8457a15fc6d0b92e52cc67c3d290ed3d4832df95d"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:21:05.827Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e372f8c4ae75bf754ccbceb2"
          mutation_id: "compatibility:sha256:f47315f777d4fb48912b5ae5668d65540c2a8ae34e8cb92a4f78f18035990b62"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:f47315f777d4fb48912b5ae5668d65540c2a8ae34e8cb92a4f78f18035990b62"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      external-result:work-order-202609080711-X1A7B0-executor-51f87e08372335b16afcd608:
        aggregate_digest: "sha256:676a2ebd138172bb558c9f699c8cf763067fa00851fc323a0afd654ad254cc89"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T07:39:43.115Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_804feb93315b8f22ae40e56f"
          mutation_id: "external-result:work-order-202609080711-X1A7B0-executor-51f87e08372335b16afcd608"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 7
          to: "REWORK_READY"
          work_item_id: "route-contract"
        mutation_id: "external-result:work-order-202609080711-X1A7B0-executor-51f87e08372335b16afcd608"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609080711-X1A7B0"
      plan-refinement:work-order-202609080711-X1A7B0-executor-06170c66150cadd5f08dfbb9:
        aggregate_digest: "sha256:cca5ecaeb9c7b332eb829b921f60706ebf8e89374db89622a6213f8e86a2f210"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-08T07:44:20.626Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_a29891a6de5aa7e2ba5b89e8"
          mutation_id: "plan-refinement:work-order-202609080711-X1A7B0-executor-06170c66150cadd5f08dfbb9"
          plan_digest: "sha256:ee8766d7be36ae715443ba1dc25633466ee77f568405149733f6330bd398cd1f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609080711-X1A7B0"
          task_revision: 10
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609080711-X1A7B0-executor-06170c66150cadd5f08dfbb9"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609080711-X1A7B0"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "63aa76504c1a3007172393186c667cf59d9ed4a8"
  task_execution_context:
    base_ref: "0.6.x"
    base_sha: "505982020fdaf55e3c634fb0edc04627b9f408d0"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
    version: 1
id_source: "generated"
---
## Summary

Remove ap task run from standard route recommendations and release AgentPlane v0.6.28

On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes.

## Scope

- In scope: On the 0.6 maintenance line based on v0.6.27, remove recommendations that direct agents to ap task run. The standard agent route must require the external-agent task advance exchange so the agent performs bounded semantic episodes itself. Update canonical policy, generated projections, implementation and regression tests as required; prepare and publish v0.6.28 through a PR targeting 0.6.x without unrelated 0.7.x changes.
- Out of scope: unrelated refactors not required for "Remove ap task run from standard route recommendations and release AgentPlane v0.6.28".

## Plan

Refined the maintenance plan to preserve task next-action as the v0.6.x route oracle, remove only task run from normal execution recommendations, and keep task execution with the current agent before verification.

## Verify Steps

1. Inspect standard route output and canonical policy projections. Expected: normal agent guidance uses `ap task active`, `ap task advance <task-id> --agent-json`, the typed result path, and exact resume argv; it does not recommend `ap task run`.
2. Run focused route-decision, external-agent packet, prompt/policy projection, and help snapshot tests selected from changed files. Expected: all pass and preserve `task run` only as a compatibility/operator command.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing graph and policy size budgets pass.
4. Run `git diff --check` and review `v0.6.27..HEAD`. Expected: only the approved routing fix, tests, task evidence, and 0.6.28 release surfaces changed; historical task/release artifacts remain untouched.
5. Run `bun run release:parity`. Expected: all version surfaces and exact internal dependency pins resolve to 0.6.28.
6. Run `bun run release:prepublish`. Expected: the complete local release gate passes.
7. Verify the hosted PR targets `0.6.x` and required checks pass for its exact head SHA.
8. After explicit publish approval, verify GitHub tag/release `v0.6.28` and npm versions for `agentplane`, `@agentplaneorg/core`, and `@agentplaneorg/recipes` all resolve to 0.6.28 from the exact integrated SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
