---
id: "202609162254-YE48GC"
title: "Implement and qualify AgentPlane 0.7.10 Blueprint retirement"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "v0.7.10"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
verify:
  - "bun run arch:check"
  - "bun run bench:agent-efficiency:check"
  - "bun run bench:agent-efficiency:replay:check"
  - "bun run ci:local:full"
  - "bun run docs:bootstrap:check"
  - "bun run docs:onboarding:check"
  - "bun run package:install-smoke"
  - "bun run test:release:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-09-16T23:01:48.151Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:d45ce5060f5fae001ac6bfd1c0d38ba3980252524ae842840b74c01db55a53d8"
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
    - "effect_ci"
    - "effect_dependencies"
    - "effect_public_api"
    - "effect_release_metadata"
    - "effect_schema"
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
      - ".github/workflows"
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "schemas"
      - "scripts"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch PR with full regression, independent evaluation, hosted integration, and installed-package qualification is required."
      - "Publication remains outside this implementation task and will require its own release authority and exact-SHA evidence."
      - "The change removes a public execution subsystem and changes current wire identity, migration, CLI, generated assets, documentation, and release metadata."
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
      - ".github/workflows"
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "schemas"
      - "scripts"
  observed:
    authority_violations: []
    changed_components:
      - ".github"
      - "scripts"
    changed_paths:
      - ".github/workflows/publish.yml"
      - "scripts/checks/blueprint-retirement-map.json"
      - "scripts/checks/blueprint-retirement-map.test.mjs"
      - "scripts/generate/render-ghcr-image-metadata.mjs"
      - "scripts/release/manifest.mjs"
      - "scripts/release/stable-channel-policy.mjs"
      - "scripts/release/stable-channel-policy.test.mjs"
    external_effects: []
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_public_api"
    - "effect_release_metadata"
    - "effect_schema"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - ".github/workflows"
          - "bun.lock"
          - "docs"
          - "package.json"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "schemas"
          - "scripts"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
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
          - "network_read"
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
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:848bcb387b2a48f9a8cda2521f8bacbf2e74747156079a5f5c8b8513e7480a43"
      escalation_reasons:
        - "central_component:.github/workflows"
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "central_path:.github/workflows/publish.yml"
        - "central_path:scripts/checks/blueprint-retirement-map.json"
        - "central_path:scripts/checks/blueprint-retirement-map.test.mjs"
        - "central_path:scripts/release/manifest.mjs"
        - "central_path:scripts/release/stable-channel-policy.mjs"
        - "central_path:scripts/release/stable-channel-policy.test.mjs"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/checks/blueprint-retirement-map.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".github"
          - "scripts"
        changed_files:
          - ".github/workflows/publish.yml"
          - "scripts/checks/blueprint-retirement-map.json"
          - "scripts/checks/blueprint-retirement-map.test.mjs"
          - "scripts/generate/render-ghcr-image-metadata.mjs"
          - "scripts/release/manifest.mjs"
          - "scripts/release/stable-channel-policy.mjs"
          - "scripts/release/stable-channel-policy.test.mjs"
        external_effects: []
        repository_effects:
          - "ci"
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
      - "hosted_integration"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8456ad88c80d. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-16T23:02:04.360Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-16T23:15:37.571Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8456ad88c80d. CLI accepted one state-bound external-agent semantic result."
    commit: "8456ad88c80d3d66b797e20bb256d72b385b02e2"
doc_version: 3
doc_updated_at: "2026-09-16T23:15:37.571Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task."
sections:
  Summary: |-
    Implement and qualify AgentPlane 0.7.10 Blueprint retirement

    Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
  Scope: |-
    - In scope: Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
    - Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.10 Blueprint retirement".
  Plan: "Implement the approved 0.7.10 Blueprint retirement as seven dependency-ordered internal WorkItems, preserving lifecycle and safety obligations, then qualify the installed artifact and prepare release metadata without publishing from this implementation task."
  Verify Steps: |-
    1. Run `node --test scripts/release/*.test.mjs` and `node --test scripts/checks/blueprint-retirement-map.test.mjs`. Expected: SemVer-stable channel promotion and the complete field/consumer/writer owner map pass.
    2. Run the focused AgentPlane and Recipes tests added or updated for BP-02 through BP-28. Expected: native route, policy, authority, context, Recipe V1, verification identity, migration, cutover, and historical-audit parity and negative cases pass with nonzero executed tests.
    3. Run `node --test scripts/checks/no-blueprint-engine.test.mjs` and `node --test scripts/checks/no-blueprint-cursor.test.mjs`. Expected: active imports, writers, prompt projections, mutation CLI, graph engine, and cursor are absent; only the explicit cold-decoder allowlist remains.
    4. Run `bun run schemas:check`, `bun run agents:check`, `bun run docs:bootstrap:check`, and `bun run docs:onboarding:check`. Expected: generated assets, help/schema exports, policy routing, and compatibility documentation agree with the implemented 0.7.10 boundary.
    5. Run `bun run package:install-smoke`, `bun run test:release:critical`, and `bun run arch:check`. Expected: the packed install passes direct, branch, context, recovery, Recipe V1, migration, historical-audit, stable-channel, release-critical, and architecture qualification.
    6. Run `bun run bench:agent-efficiency:check` and `bun run bench:agent-efficiency:replay:check`. Expected: the benchmark corpus and replay are valid; M02 is marked `ESTABLISHED` only with matched paid 0.7.9/0.7.10 evidence, otherwise explicitly `NOT ESTABLISHED`.
    7. Run `bun run ci:local:full`. Expected: full local CI succeeds after focused checks.
    8. Perform independent semantic review. Expected: lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations remain equal or stronger; custom non-exact graphs are never guessed.
    9. Inspect `git status --short --untracked-files=all` and the final diff. Expected: only approved task files and AgentPlane-owned task artifacts changed, with no secrets, generated drift, or unrelated modifications.
    10. Require hosted CI/integration evidence before merge. Expected: all required provider checks pass against the exact PR head and `origin/main` contains the integrated commit before the implementation task is considered complete.
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
    approval_evidence_digest: "sha256:d45ce5060f5fae001ac6bfd1c0d38ba3980252524ae842840b74c01db55a53d8"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:1194c357e1223bcc626371316240fb89b0fa6a76e482616f1910d83848d12e77"
    digest: "sha256:29abdd4753e2154e1efbc2f4cc8f2e515e60f50e00c1d6772058e72cd5bfad33"
    grant_id: "1811105c-2a17-498b-b034-fc4e341ab4b6"
    issued_at: "2026-09-16T23:01:48.151Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:7f4fb33aba75e4d1ae9d9026209bd92576bc392301080f274798ae5150be2892"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:89e7ed6347b514ef4b051098ca7321060665f69b599bf137e0e291eca66d420f"
    status: "active"
    task_id: "202609162254-YE48GC"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-16T23:01:48.151Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-16T23:00:20.179Z"
      digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
      proposal:
        assumptions:
          - "Current main at 19ff39fd292c30f0958131c35200a6268b7a285d is the accepted planning baseline."
          - "The existing Plan, native policy, capability, task-routing, verification, journal, Recipe V1, and task-state owners are retained; no replacement workflow engine is introduced."
          - "PLANNER and EVALUATOR remain mandatory wherever current policy requires them; Scenario V2 and lifecycle-owner convergence remain outside 0.7.10."
          - "Publication is performed only after this implementation task is merged and independently qualified under a separate release task and publish authority."
        planning_baseline:
          captured_at: "2026-09-16T22:55:54.740Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:518dc1dcc46175c0c4b1160f3cc6f80d277a47f1bfc09656aa14e9d4303b44e6"
          dirty_paths:
            - ".agentplane/tasks/202609162254-YE48GC/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609162254-YE48GC"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "ci-full"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run package:install-smoke"
              id: "install-smoke"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run test:release:critical"
              id: "release-critical"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run arch:check"
              id: "arch-check"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
              id: "docs-check"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:check"
              id: "bench-check"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:replay:check"
              id: "bench-replay"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              id: "semantic-review"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "hosted-ci"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "ci-full"
                - "install-smoke"
                - "release-critical"
                - "arch-check"
                - "semantic-review"
              description: "Blueprint is absent from active execution and model-visible context while current lifecycle, authority, verification, Recipe V1, recovery, and historical audit obligations remain enforced."
              id: "task-outcome"
              required: true
            -
              check_ids:
                - "install-smoke"
                - "release-critical"
                - "docs-check"
                - "bench-check"
                - "bench-replay"
              description: "The exact 0.7.10 artifact is locally qualified and release metadata is ready; publication remains a separate gated action."
              id: "release-readiness"
              required: true
            -
              check_ids:
                - "hosted-ci"
              description: "Required hosted CI and integration evidence must pass before merge."
              id: "hosted-integration"
              required: true
          evidence_fingerprint: "sha256:2d920f6ffc657ee4c5369ef0a5540a2ccf5917cff43eaec3b3211337d9049fd6"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "channel-tests"
                  description: "Stable aliases cannot move from a higher published SemVer line to a lower maintenance release."
                  id: "channel-order"
                  required: true
                -
                  check_ids:
                    - "retirement-map"
                  description: "Every active Blueprint field, writer, and consumer has a native owner, explicit cold-reader exception, or manual-conversion classification."
                  id: "owner-map"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/commands"
                required_sources:
                  - "scripts/release"
                  - ".github/workflows"
                  - "packages/agentplane/src/blueprints"
                  - "packages/recipes/src/manifest-contracts.ts"
                symbol_hints:
                  - "Blueprint"
                  - "stable"
                  - "dist-tag"
                  - "minor tag"
              depends_on: []
              expected_outputs:
                - "SemVer-aware release channel policy"
                - "Executable Blueprint retirement inventory guard"
                - "Native owner and compatibility map"
              id: "channel-and-owner-map"
              objective: "Implement SemVer-aware stable-channel promotion and freeze a field-by-field Blueprint retirement owner map covering active consumers, writers, obligations, and exact/manual Recipe mappings."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "scripts"
                - ".github/workflows"
                - "packages/agentplane/src/blueprints"
                - "packages/recipes/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/release/*.test.mjs"
                    id: "channel-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
                    id: "retirement-map"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "channel-tests"
                    description: "SemVer channel decisions are monotonic across release lines."
                    id: "channel-order"
                    required: true
                  -
                    check_ids:
                      - "retirement-map"
                    description: "The Blueprint retirement map is complete and machine-checked."
                    id: "owner-map"
                    required: true
                evidence_fingerprint: "sha256:811cfd69b61a0c97a874d9dd7d710fa94ec45f605ad42f33d3cb07fb304586b1"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "native-obligation-tests"
                  description: "Direct/branch, security, approval, review, stop, rollback, and evidence floors remain equal or stronger without Blueprint selection."
                  id: "native-parity"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 700000
                optional_sources:
                  - "packages/agentplane/src/blueprints"
                required_sources:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-centric"
                symbol_hints:
                  - "route decision"
                  - "policy modules"
                  - "capability"
                  - "quality review"
                  - "verification evidence"
              depends_on:
                - "channel-and-owner-map"
              expected_outputs:
                - "Blueprint-free route and authority decisions"
                - "Native lifecycle obligation enforcement"
                - "Parity tests for forbidden traces"
              id: "native-obligations"
              objective: "Move route floors, policy modules, capability admission, context budgets, protected approval/review, stop/rollback, and evidence minimums to their existing native owners without weakening mandatory stages."
              optional: false
              priority: 90
              required_inputs:
                - "Native owner and compatibility map"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/runtime"
                - "packages/agentplane/src/runner"
                - "packages/core/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1"
                    id: "native-obligation-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "native-obligation-tests"
                    description: "Native obligation parity and negative cases pass."
                    id: "native-parity"
                    required: true
                evidence_fingerprint: "sha256:81aaf3fc7b555152b32d9ab8063535a8ad83d3a62dbb5025c77af593ab3d5f0c"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "recipe-tests"
                  description: "Supported V1 recipes produce equivalent guidance, required evidence, assets, and route preferences without granting authority."
                  id: "recipe-parity"
                  required: true
                -
                  check_ids:
                    - "recipe-tests"
                  description: "Unknown custom nodes or constraints stop with exportable manual-conversion evidence."
                  id: "lossless-only"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources:
                  - "packages/agentplane/src/commands/blueprint"
                required_sources:
                  - "packages/recipes/src"
                  - "packages/agentplane/src/commands/recipes"
                  - "packages/agentplane/src/runner/context"
                symbol_hints:
                  - "preferred_blueprint"
                  - "context_hint"
                  - "output_schema"
                  - "artifact_template"
                  - "evidence_requirement"
                  - "check_suggestion"
                  - "risk_hint"
              depends_on:
                - "native-obligations"
              expected_outputs:
                - "Recipe V1 conversion rules"
                - "Manual-conversion diagnostics"
                - "Recipe parity and policy-floor tests"
              id: "recipe-v1-conversion"
              objective: "Convert supported Recipe V1 context, output, artifact, evidence, check, risk, and preferred Blueprint hints into exact existing Recipe/native surfaces; refuse lossy custom graph conversion."
              optional: false
              priority: 80
              required_inputs:
                - "Native owner and compatibility map"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/recipes/src"
                - "packages/agentplane/src/commands/recipes"
                - "packages/agentplane/src/runner/context"
                - "packages/agentplane/src/commands/blueprint"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1"
                    id: "recipe-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Exact Recipe V1 mappings retain requiredness and trust."
                    id: "recipe-parity"
                    required: true
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Lossy conversions are rejected."
                    id: "lossless-only"
                    required: true
                evidence_fingerprint: "sha256:e7cf3ee20ca293f6b0a45cb11d6ee4068987afd4838f6af8fb5ae5c1f1eeb6d2"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "identity-tests"
                  description: "Current verification and review evidence is bound to exact task, Plan, policy, implementation, and observed input identity without BlueprintSnapshotRef."
                  id: "identity-binding"
                  required: true
                -
                  check_ids:
                    - "identity-tests"
                  description: "Older v2-v4 inputs remain readable only under their original semantics."
                  id: "historical-read"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 800000
                optional_sources:
                  - "packages/agentplane/src/runner"
                required_sources:
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                  - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/evaluator"
                symbol_hints:
                  - "verification input"
                  - "state fingerprint"
                  - "BlueprintSnapshotRef"
                  - "quality identity"
                  - "ACR"
              depends_on:
                - "native-obligations"
              expected_outputs:
                - "Versioned verification-input v5"
                - "Blueprint-free current state fingerprints and WorkOrders"
                - "Migrated current consumers with old-format cold readers"
              id: "verification-identity"
              objective: "Introduce Blueprint-free verification-input v5 and state/WorkOrder identity, dual-read during cutover, then move freshness, finish, evaluator, quality, status, and ACR consumers to native Plan/policy/capability/check identities."
              optional: false
              priority: 80
              required_inputs:
                - "Native lifecycle obligation enforcement"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1"
                    id: "identity-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Current identity and freshness consumers reject stale or cross-task evidence."
                    id: "identity-binding"
                    required: true
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Historical versions are decoded without reinterpretation."
                    id: "historical-read"
                    required: true
                evidence_fingerprint: "sha256:27206832a90725350c687e11e8650f7280aab2b6ca4e4cd4c0c054868e8b875d"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "migration-tests"
                  description: "Migration holds the common effect/result admission fence, rechecks quiescence, applies atomically, and preserves old bytes plus mapping receipt."
                  id: "fenced-migration"
                  required: true
                -
                  check_ids:
                    - "migration-tests"
                  description: "Historical evidence can be audited offline while missing bytes are reported and never regenerated."
                  id: "cold-audit"
                  required: true
                -
                  check_ids:
                    - "migration-tests"
                  description: "New tasks issue Blueprint-free bindings and unknown or unmigrated active records stop explicitly."
                  id: "explicit-cutover"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 800000
                optional_sources:
                  - "packages/core/src"
                required_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-lease.ts"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/blueprint"
                symbol_hints:
                  - "migration preview"
                  - "migration apply"
                  - "admission fence"
                  - "historical audit"
                  - "cutover"
              depends_on:
                - "recipe-v1-conversion"
                - "verification-identity"
              expected_outputs:
                - "Read-only migration preview"
                - "Atomic fenced migration with old/new receipt"
                - "Offline historical audit decoder"
                - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
              id: "migration-and-cutover"
              objective: "Add preview/apply retirement migration under the common admission fence, preserve original bytes and receipts, isolate the minimal historical decoder, and activate Blueprint-free issuance with typed old-record stops."
              optional: false
              priority: 70
              required_inputs:
                - "Recipe V1 conversion rules"
                - "Versioned verification-input v5"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/blueprint"
                - "packages/agentplane/src/runner"
                - "packages/core/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1"
                    id: "migration-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Concurrent effect/result admission cannot cross migration."
                    id: "fenced-migration"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Historical audit remains byte-faithful and offline."
                    id: "cold-audit"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Cutover is fail-closed for unsupported records."
                    id: "explicit-cutover"
                    required: true
                evidence_fingerprint: "sha256:9b86e176aee3435327477c087b6455d3f05b6d08e9909e8aea9bcfa352a4c0b5"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "no-engine"
                    - "no-cursor"
                    - "schema-assets"
                  description: "Ordinary, branch, Recipe V1, recovery, and evaluator paths import or write no active Blueprint engine, cursor, snapshot, plan, state, or prompt projection."
                  id: "zero-active-engine"
                  required: true
                -
                  check_ids:
                    - "no-engine"
                    - "schema-assets"
                  description: "Remaining Blueprint references are version-labelled documentation or explicit cold-reader exceptions and cannot execute workflows."
                  id: "cold-only"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1200000
                optional_sources:
                  - "packages/agentplane/assets"
                  - "docs"
                required_sources:
                  - "packages/agentplane/src"
                  - "packages/recipes/src"
                  - "scripts/generate"
                  - "scripts/checks"
                  - "schemas"
                symbol_hints:
                  - "Blueprint"
                  - "blueprint"
                  - "snapshot"
                  - "cursor"
                  - "resolved graph"
              depends_on:
                - "migration-and-cutover"
              expected_outputs:
                - "Zero active Blueprint artifacts and prompt inputs"
                - "No Blueprint mutation CLI or generated live schema"
                - "No active engine/cursor imports"
                - "Explicit cold-reader allowlist"
              id: "remove-active-blueprint"
              objective: "Remove Blueprint from model-visible context, stop current writers, retire mutation CLI and generated live assets, and delete the active registry, extension, graph-plan, and execution-state engine while retaining only the isolated cold decoder."
              optional: false
              priority: 60
              required_inputs:
                - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                - "Offline historical audit decoder"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src"
                - "packages/agentplane/assets"
                - "packages/recipes/src"
                - "scripts/generate"
                - "scripts/checks"
                - "schemas"
                - "docs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/checks/no-blueprint-engine.test.mjs"
                    id: "no-engine"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "node --test scripts/checks/no-blueprint-cursor.test.mjs"
                    id: "no-cursor"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run schemas:check && bun run agents:check && bun run docs:bootstrap:check"
                    id: "schema-assets"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "no-engine"
                      - "no-cursor"
                      - "schema-assets"
                    description: "Active engine, cursor, writer, CLI, and prompt surfaces are absent."
                    id: "zero-active-engine"
                    required: true
                  -
                    check_ids:
                      - "no-engine"
                      - "schema-assets"
                    description: "Only bounded historical decode remains."
                    id: "cold-only"
                    required: true
                evidence_fingerprint: "sha256:e1f5302117ad8c111f695d47289e1eff96382643614b5b1c8b34307570cdc679"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "install-smoke"
                    - "release-critical"
                    - "arch-check"
                  description: "Packed installed artifact passes direct, branch, context, recovery, Recipe V1, migration, historical audit, release-critical, and architecture checks."
                  id: "installed-qualification"
                  required: true
                -
                  check_ids:
                    - "ci-full"
                    - "docs-check"
                  description: "The repository full local CI and documentation checks pass with no unintended tracked or untracked artifacts."
                  id: "full-regression"
                  required: true
                -
                  check_ids:
                    - "bench-check"
                    - "bench-replay"
                  description: "Benchmark harness checks and replay pass; the result is ESTABLISHED only with matched paid .9/.10 evidence, otherwise explicitly NOT ESTABLISHED."
                  id: "m02-honesty"
                  required: true
                -
                  check_ids:
                    - "docs-check"
                    - "semantic-review"
                  description: "Version and docs describe the exact compatibility, migration, retired-command, cold-reader, lifecycle, and efficiency boundaries for 0.7.10."
                  id: "release-ready"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 700000
                optional_sources:
                  - "bun.lock"
                required_sources:
                  - "scripts/release"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs"
                  - "package.json"
                  - "packages/agentplane/package.json"
                  - ".github/workflows"
                symbol_hints:
                  - "0.7.10"
                  - "install smoke"
                  - "release critical"
                  - "M02"
                  - "compatibility"
              depends_on:
                - "remove-active-blueprint"
              expected_outputs:
                - "Installed-package and release-critical evidence"
                - "Full local regression evidence"
                - "M02 ESTABLISHED result or explicit NOT ESTABLISHED disposition"
                - "0.7.10 compatibility docs and release-ready metadata"
              id: "qualification-and-release-readiness"
              objective: "Qualify direct, branch, context, recovery, Recipe V1, migration, historical audit, and stable-channel behavior through the packed install; record honest M02 status; update compatibility documentation and 0.7.10 release metadata without publishing."
              optional: false
              priority: 50
              required_inputs:
                - "Zero active Blueprint artifacts and prompt inputs"
                - "No active engine/cursor imports"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "scripts/release"
                - "scripts/checks"
                - "scripts/bench"
                - "docs"
                - "package.json"
                - "packages/agentplane/package.json"
                - "bun.lock"
                - ".github/workflows"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run package:install-smoke"
                    id: "install-smoke"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run test:release:critical"
                    id: "release-critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "arch-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "ci-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                    id: "docs-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:check"
                    id: "bench-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:replay:check"
                    id: "bench-replay"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    id: "semantic-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "install-smoke"
                      - "release-critical"
                      - "arch-check"
                    description: "The distributed artifact and critical paths pass."
                    id: "installed-qualification"
                    required: true
                  -
                    check_ids:
                      - "ci-full"
                      - "docs-check"
                    description: "Full local CI and docs pass."
                    id: "full-regression"
                    required: true
                  -
                    check_ids:
                      - "bench-check"
                      - "bench-replay"
                    description: "Benchmark support is valid and the verdict matches available evidence."
                    id: "m02-honesty"
                    required: true
                  -
                    check_ids:
                      - "docs-check"
                      - "semantic-review"
                    description: "0.7.10 metadata and documentation match implemented behavior."
                    id: "release-ready"
                    required: true
                evidence_fingerprint: "sha256:3b31cf8635263bdcba661a030258d6f4564d24bb94213b9a4a3b227c83f5939b"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609162254-YE48GC"
    event_cursor: 5
    final_validation: null
    id: "202609162254-YE48GC"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run arch:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run bench:agent-efficiency:check"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run bench:agent-efficiency:replay:check"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "bun run docs:bootstrap:check"
          id: "legacy-5"
          required: true
        -
          check_ids: []
          description: "bun run docs:onboarding:check"
          id: "legacy-6"
          required: true
        -
          check_ids: []
          description: "bun run package:install-smoke"
          id: "legacy-7"
          required: true
        -
          check_ids: []
          description: "bun run test:release:critical"
          id: "legacy-8"
          required: true
      captured_at: "2026-09-16T22:54:58.590Z"
      constraints: []
      request: |-
        Implement and qualify AgentPlane 0.7.10 Blueprint retirement

        Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
      task_id: "202609162254-YE48GC"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-09-16T23:15:40.039Z"
    work_items:
      channel-and-owner-map:
        attempt: 1
        claim_id: null
        id: "channel-and-owner-map"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:026a9ebcd7be80d090310854b5cfbf8c4c064b5f4bb06405ad9323153da5cc24"
            id: "SemVer-aware release channel policy"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "channel-and-owner-map"
            provenance:
              - "sha256:feed10da72090d4591e44f46a4edb96cbda6ce89c365d5ddcfbb7c5f166666ba"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5c8337a522d4a2869b374091f7ced33160ec4773e00aefd87c9e40ed412a3037"
            id: "Executable Blueprint retirement inventory guard"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "channel-and-owner-map"
            provenance:
              - "sha256:feed10da72090d4591e44f46a4edb96cbda6ce89c365d5ddcfbb7c5f166666ba"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:d41d93c31ad15facc8dbf4ae7b42411192c2e1539e504bdac29689c1b57ddfd0"
            id: "Native owner and compatibility map"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "channel-and-owner-map"
            provenance:
              - "sha256:feed10da72090d4591e44f46a4edb96cbda6ce89c365d5ddcfbb7c5f166666ba"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "channel-tests"
              command_identity: "node --test scripts/release/*.test.mjs"
              detail: "Observed by node --test scripts/release/*.test.mjs."
              exit_code: 0
              observed_at: "2026-09-16T23:15:40.029Z"
              repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "retirement-map"
              command_identity: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
              detail: "Observed by node --test scripts/checks/blueprint-retirement-map.test.mjs."
              exit_code: 0
              observed_at: "2026-09-16T23:15:40.029Z"
              repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      migration-and-cutover:
        attempt: 0
        claim_id: null
        id: "migration-and-cutover"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      native-obligations:
        attempt: 0
        claim_id: null
        id: "native-obligations"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      qualification-and-release-readiness:
        attempt: 0
        claim_id: null
        id: "qualification-and-release-readiness"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      recipe-v1-conversion:
        attempt: 0
        claim_id: null
        id: "recipe-v1-conversion"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      remove-active-blueprint:
        attempt: 0
        claim_id: null
        id: "remove-active-blueprint"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      verification-identity:
        attempt: 0
        claim_id: null
        id: "verification-identity"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-16T23:15:40.039Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:2232ab0a3e9d1b52e784943203ff89564cccb75b974b07cbe4c851ac4bfd3228"
        entity: "work_item"
        id: "event_9a0e5edbcc29583c41c5b191"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d"
        plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609162254-YE48GC"
        task_revision: 7
        work_item_id: "channel-and-owner-map"
    leases: []
    mutation_receipts:
      compatibility:sha256:03ad382df371fb10a3fda0b3d74c85baaa1cbfcc47fa5298b2773c99d5104eda:
        aggregate_digest: "sha256:ab92cae9750fd0eaa619b17291fb4e7f46fde563c5e785c52761a81c5e315c94"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:01:25.533Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_218ec6bc5c507953d1e7a03f"
          mutation_id: "compatibility:sha256:03ad382df371fb10a3fda0b3d74c85baaa1cbfcc47fa5298b2773c99d5104eda"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:03ad382df371fb10a3fda0b3d74c85baaa1cbfcc47fa5298b2773c99d5104eda"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:413450ce2745d1d5cf77c898303ff5777b75a51f5db675c1e34d55e570726bd9:
        aggregate_digest: "sha256:ae8c555aa47f48c57b8a831af834bc49ccfc1fbcbd1cfffb9b7832d90a7f7f17"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:02:04.360Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8e28eaae67e15205f5be9fc2"
          mutation_id: "compatibility:sha256:413450ce2745d1d5cf77c898303ff5777b75a51f5db675c1e34d55e570726bd9"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:413450ce2745d1d5cf77c898303ff5777b75a51f5db675c1e34d55e570726bd9"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:49c492d58bbe73926763535cb02683c733c0c88ef13a8c63b8a8ae6a84b938f4:
        aggregate_digest: "sha256:2e804851242d36f2a86d91212684aef110a165bc18dcfb1023feaa0d7d4000a4"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:01:25.534Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8bebe2bdf1f011d7bd8a429d"
          mutation_id: "compatibility:sha256:49c492d58bbe73926763535cb02683c733c0c88ef13a8c63b8a8ae6a84b938f4"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:49c492d58bbe73926763535cb02683c733c0c88ef13a8c63b8a8ae6a84b938f4"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:c46ff176c8880d44cff5bcd36f48699931fc4d0a1b8f09f1e98fb5fdd94711a5:
        aggregate_digest: "sha256:bc2474c1f98a4d9a2a6ef2862983186dfd4fe7965ce5539aa09eb418545ec49f"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:15:37.571Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_9c18666800b1e9b95f237c0c"
          mutation_id: "compatibility:sha256:c46ff176c8880d44cff5bcd36f48699931fc4d0a1b8f09f1e98fb5fdd94711a5"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c46ff176c8880d44cff5bcd36f48699931fc4d0a1b8f09f1e98fb5fdd94711a5"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:dc3da83107777c5ca588d41c5782275c05cc7b8e92e31bd8bfc375f707fb7c36:
        aggregate_digest: "sha256:5051047c62a02b2cf0668e0b814ee9c41f3ea424b61d45ca86e017165ac6e888"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:15:37.571Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_2aac97c99daaadaa92d898c1"
          mutation_id: "compatibility:sha256:dc3da83107777c5ca588d41c5782275c05cc7b8e92e31bd8bfc375f707fb7c36"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dc3da83107777c5ca588d41c5782275c05cc7b8e92e31bd8bfc375f707fb7c36"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609162254-YE48GC"
      external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d:
        aggregate_digest: "sha256:40c17bb222cc02e228e7bda1dd39395eb70b649e8a50f6432d3b5fd3ae121266"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:15:40.039Z"
          cause_refs:
            - "semantic-result:sha256:2232ab0a3e9d1b52e784943203ff89564cccb75b974b07cbe4c851ac4bfd3228"
          entity: "work_item"
          from: "READY"
          id: "event_9a0e5edbcc29583c41c5b191"
          mutation_id: "external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "channel-and-owner-map"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609162254-YE48GC"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "8456ad88c80d3d66b797e20bb256d72b385b02e2"
  task_execution_context:
    base_ref: "main"
    base_sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
    version: 1
id_source: "generated"
---
## Summary

Implement and qualify AgentPlane 0.7.10 Blueprint retirement

Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.

## Scope

- In scope: Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.10 Blueprint retirement".

## Plan

Implement the approved 0.7.10 Blueprint retirement as seven dependency-ordered internal WorkItems, preserving lifecycle and safety obligations, then qualify the installed artifact and prepare release metadata without publishing from this implementation task.

## Verify Steps

1. Run `node --test scripts/release/*.test.mjs` and `node --test scripts/checks/blueprint-retirement-map.test.mjs`. Expected: SemVer-stable channel promotion and the complete field/consumer/writer owner map pass.
2. Run the focused AgentPlane and Recipes tests added or updated for BP-02 through BP-28. Expected: native route, policy, authority, context, Recipe V1, verification identity, migration, cutover, and historical-audit parity and negative cases pass with nonzero executed tests.
3. Run `node --test scripts/checks/no-blueprint-engine.test.mjs` and `node --test scripts/checks/no-blueprint-cursor.test.mjs`. Expected: active imports, writers, prompt projections, mutation CLI, graph engine, and cursor are absent; only the explicit cold-decoder allowlist remains.
4. Run `bun run schemas:check`, `bun run agents:check`, `bun run docs:bootstrap:check`, and `bun run docs:onboarding:check`. Expected: generated assets, help/schema exports, policy routing, and compatibility documentation agree with the implemented 0.7.10 boundary.
5. Run `bun run package:install-smoke`, `bun run test:release:critical`, and `bun run arch:check`. Expected: the packed install passes direct, branch, context, recovery, Recipe V1, migration, historical-audit, stable-channel, release-critical, and architecture qualification.
6. Run `bun run bench:agent-efficiency:check` and `bun run bench:agent-efficiency:replay:check`. Expected: the benchmark corpus and replay are valid; M02 is marked `ESTABLISHED` only with matched paid 0.7.9/0.7.10 evidence, otherwise explicitly `NOT ESTABLISHED`.
7. Run `bun run ci:local:full`. Expected: full local CI succeeds after focused checks.
8. Perform independent semantic review. Expected: lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations remain equal or stronger; custom non-exact graphs are never guessed.
9. Inspect `git status --short --untracked-files=all` and the final diff. Expected: only approved task files and AgentPlane-owned task artifacts changed, with no secrets, generated drift, or unrelated modifications.
10. Require hosted CI/integration evidence before merge. Expected: all required provider checks pass against the exact PR head and `origin/main` contains the integrated commit before the implementation task is considered complete.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
