---
id: "202609230942-E6D0V4"
title: "Make canonical AgentPlane autonomy safe and default"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "authority"
  - "autonomy"
  - "pre-0-7-12"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "security"
verify:
  - "bun run hotspots:check"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T09:55:45.344Z"
  updated_by: "USER"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
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
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
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
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:9d776c49f47d09c31d463170a592d86e82f744de165dfbfba361550b822477ca"
      escalation_reasons:
        - "effect_release_metadata"
        - "effect_security_boundary"
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
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-23T09:42:02.009Z"
doc_updated_by: "CODER"
description: "Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates."
sections:
  Summary: |-
    Make canonical AgentPlane autonomy safe and default

    Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates.
  Scope: |-
    - In scope: Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates.
    - Out of scope: unrelated refactors not required for "Make canonical AgentPlane autonomy safe and default".
  Plan: |-
    1. Execute approved WorkItem contract-bound-plan-authority.
    2. Execute approved WorkItem canonical-host-transport-convergence.
    3. Execute approved WorkItem qualify-default-autonomy.
  Verify Steps: |-
    PLANNER fallback scaffold for "Make canonical AgentPlane autonomy safe and default". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make canonical AgentPlane autonomy safe and default". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "4d25a67cc233872b57c12b7fbaa6ceb84ed7d939"
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
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:75180244a63e4daf6aaf83169cbe6be0722d1776c56eafb81dd93d5cecd635ad"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4d8d58cb4e6fbddc6f1b589bf91a2403f421ba5c9f400ac4e4880cb530c907a7"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e711789f5005d5bf4c090c9883e9d4135b7a0ed240db28ae2d6b00f54a7fac91"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "documentation"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".agentplane/policy"
              - "docs"
              - "docs/developer"
              - "docs/user"
              - "packages/agentplane"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/ports"
              - "packages/agentplane/src/runner"
              - "packages/core"
              - "packages/core/src/config"
              - "packages/core/src/tasks"
            task_id: "202609230942-E6D0V4"
            validation_requirements:
              - "bun run check"
              - "bun run cli-docs:check"
              - "bun run hotspots:check"
              - "bun run test:fast"
              - "bun run typecheck"
              - "bun test packages/agentplane/src/commands/task packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
              - "bun test packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
              - "bun test packages/core/src/tasks/task-kernel packages/core/src/tasks/task-execution-contract-compat.test.ts packages/core/src/config/config.test.ts"
              - "node .agentplane/policy/check-routing.mjs"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:e711789f5005d5bf4c090c9883e9d4135b7a0ed240db28ae2d6b00f54a7fac91"
        digest: "sha256:4d8d58cb4e6fbddc6f1b589bf91a2403f421ba5c9f400ac4e4880cb530c907a7"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6c2cd15757f7b2dd0039b41483555e3c324751ed82c99a1a3660c6ecb16edb40"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/config"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/adapters/task-backend"
            expected_outputs:
              - "contract-bound-plan-authority-source"
              - "contract-bound-plan-authority-tests"
            id: "contract-bound-plan-authority"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:2ab01d567aa321443b682c3dee2d081ed19225a9cd903dd3fc753d30d2c7a0a2"
            depends_on:
              - "contract-bound-plan-authority"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "docs/user"
                - "docs/developer"
            expected_outputs:
              - "canonical-host-transport-source"
              - "canonical-host-transport-tests"
              - "autonomy-documentation"
            id: "canonical-host-transport-convergence"
            optional: false
            required_inputs:
              - "contract-bound-plan-authority-source"
              - "contract-bound-plan-authority-tests"
          -
            contract_digest: "sha256:9b85a1e7b0a3469f74cec3f86fe99a28cce10d8c0940740f679fc42a55b0a799"
            depends_on:
              - "canonical-host-transport-convergence"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "tests"
                - "documentation"
                - "ci"
              resources: []
              scope_roots:
                - "packages/core"
                - "packages/agentplane"
                - "docs"
                - ".agentplane/policy"
            expected_outputs:
              - "default-autonomy-qualification-evidence"
            id: "qualify-default-autonomy"
            optional: false
            required_inputs:
              - "canonical-host-transport-source"
              - "canonical-host-transport-tests"
              - "autonomy-documentation"
      effects: []
      final_validation: null
      id: "202609230942-E6D0V4"
      intent_digest: "sha256:dbbb753bf34d3fe9c65d0d4e65c868bbb747b2de86b3b258a3efe76919c2966c"
      migration_receipts: []
      mutation_receipts:
        capture:202609230942-E6D0V4:
          after_revision: 1
          aggregate_digest: "sha256:46014cfe263609bbafc685dd877d15839983ddffa952418b0a774d2ad9d77a10"
          before_revision: 0
          command_digest: "sha256:a9fc7419f1be8d14497d89e4c4a9686a201fbfbf397a8282b564a018d1e4c179"
          effect_ids: []
          event_digests:
            - "sha256:cf9a610cd88f22da1f9d384bbd6840ae82115205a84fb8910646651a698f082d"
          mutation_id: "capture:202609230942-E6D0V4"
        kernel_work_item_claim_required:sha256:40b9e9aaecad70eb1f25dfd2c829acf41af80b7e5d5e605078c6c11f1b492f79:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 5
          aggregate_digest: "sha256:09329891e6ebf42f6ee493c19740d0610f3a8b6becc5930841842a906c1c9752"
          before_revision: 4
          command_digest: "sha256:0e08af6674a2330e941a90a87b797790d7f7d94d9f3533d4883937976df5638a"
          effect_ids: []
          event_digests:
            - "sha256:26186fff8a162fcc6df63d78af59dca698b5150166732db4218f317df0632e9c"
          mutation_id: "kernel_work_item_claim_required:sha256:40b9e9aaecad70eb1f25dfd2c829acf41af80b7e5d5e605078c6c11f1b492f79:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        kernel_work_item_execution_required:sha256:017c4b8bba25f33166bee2086566e0956e15fa0936c514c247751555084ac4c2:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 6
          aggregate_digest: "sha256:049cad83bfec4dad4018a3eb22bb1120a79854ee1397c26d369f387563e66ef7"
          before_revision: 5
          command_digest: "sha256:c779b8d4a71884a84de83965bd93a75ce6ba9fe5487b48d61c3f6fe0c3cc165d"
          effect_ids: []
          event_digests:
            - "sha256:720e3ebe5d7395e26cd2d2463c60b2dddf27f0b9a3cd5e8ab99d1b9ee1dea4dc"
          mutation_id: "kernel_work_item_execution_required:sha256:017c4b8bba25f33166bee2086566e0956e15fa0936c514c247751555084ac4c2:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        kernel_work_item_materialization_required:sha256:db1b67661890f56a18059e0209f13b3b84021f980802e5bf63a3dbc6d0a4d05e:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 4
          aggregate_digest: "sha256:e41bd140f9f27cced0768ebbbf8634bf3392dfd28891ca96f5e122d7c4646d75"
          before_revision: 3
          command_digest: "sha256:4e438a00b2b3bd0d2419f10cb1738276eef09eae7d1feb852ce0d1e1145ae721"
          effect_ids: []
          event_digests:
            - "sha256:4ada342080a2a9bca78e798a7dd1312a188b8d2a9efb213899367cf7ffc9a88c"
          mutation_id: "kernel_work_item_materialization_required:sha256:db1b67661890f56a18059e0209f13b3b84021f980802e5bf63a3dbc6d0a4d05e:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        result:sha256:4599b7f1b9e8e030a1e98152e2afd5fa5c19a2a483c5af89d8b4afb7a36e67eb:
          after_revision: 2
          aggregate_digest: "sha256:b27851aa187080b15cc7ff5f7386d82cee7ddfdbddd631aaaac53230da732ae4"
          before_revision: 1
          command_digest: "sha256:bdb263e1212eb9d7891e2d3c1b64fe32564a31a700c4632ddf38df667dbc474d"
          effect_ids: []
          event_digests:
            - "sha256:789d448af04d8ddc9ea2dad33d48bf7d8f8168068b5003760e8c4c69996c70a5"
          mutation_id: "result:sha256:4599b7f1b9e8e030a1e98152e2afd5fa5c19a2a483c5af89d8b4afb7a36e67eb"
        sha256:43d53aa4b0c572c2c529686417e146d5397a8f3c55bf1a745ff35b814fd76231:
          after_revision: 3
          aggregate_digest: "sha256:aee435d2bad5ecee7c541abbe24f20edfa42d1b5b9d86061a7bb583477d25756"
          before_revision: 2
          command_digest: "sha256:c75f31fec2b43d86be95865b5b331afeb22dc85a346bfc735e16874dbfd3a042"
          effect_ids: []
          event_digests:
            - "sha256:714bf44c6f6fcfe52b3d38dedf95bd8657ab8352a68e02c2e0e8a45b4bf87a4d"
          mutation_id: "sha256:43d53aa4b0c572c2c529686417e146d5397a8f3c55bf1a745ff35b814fd76231"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        canonical-host-transport-convergence:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:2ab01d567aa321443b682c3dee2d081ed19225a9cd903dd3fc753d30d2c7a0a2"
            depends_on:
              - "contract-bound-plan-authority"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "docs/user"
                - "docs/developer"
            expected_outputs:
              - "canonical-host-transport-source"
              - "canonical-host-transport-tests"
              - "autonomy-documentation"
            id: "canonical-host-transport-convergence"
            optional: false
            required_inputs:
              - "contract-bound-plan-authority-source"
              - "contract-bound-plan-authority-tests"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        contract-bound-plan-authority:
          attempt: 1
          claim_id: "sha256:9926573a9714545ec8e67b1052870acc8b1159ce0976c769496759ee0d26ecaf"
          definition:
            contract_digest: "sha256:6c2cd15757f7b2dd0039b41483555e3c324751ed82c99a1a3660c6ecb16edb40"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/config"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/adapters/task-backend"
            expected_outputs:
              - "contract-bound-plan-authority-source"
              - "contract-bound-plan-authority-tests"
            id: "contract-bound-plan-authority"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
        qualify-default-autonomy:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:9b85a1e7b0a3469f74cec3f86fe99a28cce10d8c0940740f679fc42a55b0a799"
            depends_on:
              - "canonical-host-transport-convergence"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "tests"
                - "documentation"
                - "ci"
              resources: []
              scope_roots:
                - "packages/core"
                - "packages/agentplane"
                - "docs"
                - ".agentplane/policy"
            expected_outputs:
              - "default-autonomy-qualification-evidence"
            id: "qualify-default-autonomy"
            optional: false
            required_inputs:
              - "canonical-host-transport-source"
              - "canonical-host-transport-tests"
              - "autonomy-documentation"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
    digest: "sha256:f3aabf59647e5ca01349d1af3bd8bd90780873b74ee9f4966b9f20a4b9020085"
    documents:
      contracts:
        sha256:2ab01d567aa321443b682c3dee2d081ed19225a9cd903dd3fc753d30d2c7a0a2:
          acceptance_criteria:
            - "Canonical approval packets request host_user_decision when an authenticated host capability exists and otherwise return a truthful manual or signed-receipt boundary."
            - "Kernel runtime reads host decisions only from a native adapter that supplies repository identity, host id, conversation id, message id, and encoded decision outside semantic result authority."
            - "CLI JSON or agent-authored files cannot assert host identity or directly satisfy canonical approval."
            - "Host decisions remain bound to task id, exact Plan digest, repository fingerprint, message identity, freshness, and single-use evidence."
            - "After either contract-bound POLICY approval or an authenticated host decision, the supervisor resumes without redundant approval stops until material drift or another declared boundary."
            - "User and developer documentation distinguishes policy autonomy, authenticated host approval, signed receipts, and manual bootstrap."
          objective: "Converge canonical and ordinary approval transport around a native host observation port, while keeping unsigned or agent-controlled host identity unusable."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
            - "bun run cli-docs:check"
            - "bun run typecheck"
        sha256:6c2cd15757f7b2dd0039b41483555e3c324751ed82c99a1a3660c6ecb16edb40:
          acceptance_criteria:
            - "Task intake includes explicitly required tests, documentation, schema, CI, and other repository effects instead of silently forbidding requested deliverables."
            - "Plan proposal admission rejects undeclared scope roots, repository effects, external effects, capabilities, resources, and material risk expansion before approval."
            - "Repository-policy plan approval uses a distinct canonical approval mode and POLICY or SYSTEM provenance; it cannot be recorded as USER or host_user_decision."
            - "The default autonomous path is available only when the Plan is an exact subset of the trusted task contract, has no unresolved question, and does not request credentials, destructive Git, material drift, or unavailable provider authority."
            - "Explicit require_plan policy, material contract drift, and non-delegable effects still emit a human boundary."
            - "Existing signed receipt, host decision, and manual compatibility paths remain fail-closed and replay-safe."
          objective: "Establish a non-circular trust boundary: classify the requested task contract completely, require every semantic Plan to be a strict subset of that trusted contract, and allow exact contract-bounded repository plans to receive audited POLICY authority by default without impersonating USER."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/core/src/tasks/task-kernel packages/core/src/tasks/task-execution-contract-compat.test.ts packages/core/src/config/config.test.ts"
            - "bun test packages/agentplane/src/commands/task packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
            - "bun run typecheck"
        sha256:9b85a1e7b0a3469f74cec3f86fe99a28cce10d8c0940740f679fc42a55b0a799:
          acceptance_criteria:
            - "A contract-bounded repository task progresses from semantic Plan to execution without manual approval and records POLICY rather than USER provenance."
            - "A Plan that adds one undeclared effect, path, capability, resource, or material risk stops without changing canonical state."
            - "A forged, stale, cross-task, cross-conversation, or replayed host decision is rejected."
            - "Explicit manual policy and unavailable provider authority still stop with executable truthful guidance."
            - "Hotspot, type, policy routing, CLI documentation, focused tests, fast tests, and full repository checks pass."
          objective: "Prove the safe autonomous default and fail-closed boundaries through focused, replay, integration, documentation, and full regression checks."
          role: "EXECUTOR"
          verification_commands:
            - "bun run hotspots:check"
            - "node .agentplane/policy/check-routing.mjs"
            - "bun run cli-docs:check"
            - "bun run typecheck"
            - "bun run test:fast"
            - "bun run check"
      intent:
        context: "Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates."
        objective: "Make canonical AgentPlane autonomy safe and default"
    events:
      -
        command_digest: "sha256:a9fc7419f1be8d14497d89e4c4a9686a201fbfbf397a8282b564a018d1e4c179"
        id: "capture:202609230942-E6D0V4:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609230942-E6D0V4"
        occurred_at: "2026-09-23T09:42:01.948Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609230942-E6D0V4"
        task_revision: 1
      -
        command_digest: "sha256:bdb263e1212eb9d7891e2d3c1b64fe32564a31a700c4632ddf38df667dbc474d"
        id: "result:sha256:4599b7f1b9e8e030a1e98152e2afd5fa5c19a2a483c5af89d8b4afb7a36e67eb:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:4599b7f1b9e8e030a1e98152e2afd5fa5c19a2a483c5af89d8b4afb7a36e67eb"
        occurred_at: "2026-09-23T09:44:52.638Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609230942-E6D0V4"
        task_revision: 2
      -
        command_digest: "sha256:c75f31fec2b43d86be95865b5b331afeb22dc85a346bfc735e16874dbfd3a042"
        id: "sha256:43d53aa4b0c572c2c529686417e146d5397a8f3c55bf1a745ff35b814fd76231:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:43d53aa4b0c572c2c529686417e146d5397a8f3c55bf1a745ff35b814fd76231"
        occurred_at: "2026-09-23T09:55:44.437Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609230942-E6D0V4"
        task_revision: 3
      -
        command_digest: "sha256:4e438a00b2b3bd0d2419f10cb1738276eef09eae7d1feb852ce0d1e1145ae721"
        id: "kernel_work_item_materialization_required:sha256:db1b67661890f56a18059e0209f13b3b84021f980802e5bf63a3dbc6d0a4d05e:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:db1b67661890f56a18059e0209f13b3b84021f980802e5bf63a3dbc6d0a4d05e:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T09:56:02.306Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609230942-E6D0V4"
        task_revision: 4
      -
        command_digest: "sha256:0e08af6674a2330e941a90a87b797790d7f7d94d9f3533d4883937976df5638a"
        id: "kernel_work_item_claim_required:sha256:40b9e9aaecad70eb1f25dfd2c829acf41af80b7e5d5e605078c6c11f1b492f79:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:40b9e9aaecad70eb1f25dfd2c829acf41af80b7e5d5e605078c6c11f1b492f79:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T09:56:06.269Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609230942-E6D0V4"
        task_revision: 5
      -
        command_digest: "sha256:c779b8d4a71884a84de83965bd93a75ce6ba9fe5487b48d61c3f6fe0c3cc165d"
        id: "kernel_work_item_execution_required:sha256:017c4b8bba25f33166bee2086566e0956e15fa0936c514c247751555084ac4c2:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:017c4b8bba25f33166bee2086566e0956e15fa0936c514c247751555084ac4c2:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T09:56:20.426Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609230942-E6D0V4"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Make canonical AgentPlane autonomy safe and default

Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates.

## Scope

- In scope: Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates.
- Out of scope: unrelated refactors not required for "Make canonical AgentPlane autonomy safe and default".

## Plan

1. Execute approved WorkItem contract-bound-plan-authority.
2. Execute approved WorkItem canonical-host-transport-convergence.
3. Execute approved WorkItem qualify-default-autonomy.

## Verify Steps

PLANNER fallback scaffold for "Make canonical AgentPlane autonomy safe and default". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make canonical AgentPlane autonomy safe and default". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
