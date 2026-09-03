---
id: "202609032308-F31YXS"
title: "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core"
  - "projection-recovery"
  - "verification-atomicity"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:local:full"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts --maxWorkers=1"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-03T23:29:26.733Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:871b78cba546e64215de2f4e3aa9f036e1d35afb3ccdf751a7b870a1059105a8"
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
    - "effect_destructive_git"
    - "effect_external_write"
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
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects:
      - "destructive_git"
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Network read, task-branch publication, integration, and branch cleanup remain AgentPlane-owned delivery effects; package publication and release effects are excluded."
      - "The change repairs central verification and task-projection boundaries, so isolated branch_pr execution and hosted validation are required."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.ts"
      - "packages/agentplane/src/commands/task/verify-record.types.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_destructive_git"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "destructive_git"
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
        evidence_requirements:
          - "external_effect:destructive_git"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "destructive_git"
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:e4914022955d68c5ba75c100d0bd38a896dbe7560f2bd5048a7d4c35205238d9"
      escalation_reasons:
        - "central_path:packages/agentplane/src/commands/shared/task-mutation.test.ts"
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
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record.ts"
          - "packages/agentplane/src/commands/task/verify-record.types.ts"
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
      - "external_effect:destructive_git"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
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
    body: "Implementation committed: 099ca9948c77. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e37f30c53768. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-03T23:29:34.650Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T23:35:00.416Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 099ca9948c77. CLI accepted one state-bound external-agent semantic result."
    commit: "099ca9948c77311198a1c3139d91e06647084c26"
  -
    type: "status"
    at: "2026-09-03T23:37:51.883Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e37f30c53768. CLI accepted one state-bound external-agent semantic result."
    commit: "e37f30c53768d99c19a95dc74973cc909fa3e315"
doc_version: 3
doc_updated_at: "2026-09-03T23:37:51.883Z"
doc_updated_by: "SUPERVISOR"
description: "Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work."
sections:
  Summary: |-
    Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete

    Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work.
  Scope: |-
    - In scope: Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work.
    - Out of scope: unrelated refactors not required for "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete".
  Plan: "Prepared one bounded branch_pr recovery plan with four strictly sequential WorkItems: stabilize the verification contract across execution and persistence, make task-centric rework projection atomic, prove the PX8PZT failure path, and qualify the combined repair. The execution declaration, WorkItem scopes, and resource claims use one closed set of four repository roots."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:871b78cba546e64215de2f4e3aa9f036e1d35afb3ccdf751a7b870a1059105a8"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:3376853a2fc002883d0db22293115b286ec91c96e67cca3fb36c32718e5589f2"
    digest: "sha256:2198c5faea28b1e0ec9ba1a2fdc49fcf67561d5b3731a0465418dc6f603d51a1"
    grant_id: "7c22760b-3450-48a9-8c64-9985ff324ec4"
    issued_at: "2026-09-03T23:29:26.733Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a79c753803a8e1bdc5f2e6ac8381fd7864ff76269eeeefacda2f8ace3dfb9a74"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c4e5cfac799cb5fee315891fb760ad2d7e3c268570cdb91d8eb37a8213076047"
    status: "active"
    task_id: "202609032308-F31YXS"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-03T23:29:26.733Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-03T23:25:47.931Z"
      digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
      proposal:
        assumptions:
          - "Tasks 202609030849-925NNG and 202609021331-5FPZAB are terminal and their required projection-recovery changes are present on main at fa693664b5fb4f7884b5c772b456357518732bd4."
          - "Task 202609031717-PX8PZT remains the owner of the four salvaged lifecycle behaviors; this prerequisite task repairs only the control-plane defects that prevent its verification and integration."
          - "WorkItems execute strictly in dependency order with one active WorkItem at a time."
          - "Actual PX8PZT provider recovery starts only after this repair is integrated into main through AgentPlane."
          - "MPXQBK, broad projection cleanup, full GitLab/provider-neutral scope, dependency changes, and release/version/publication work remain excluded."
        planning_baseline:
          captured_at: "2026-09-03T23:19:10.369Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:622a9652b187e7605236ce4cdb2d1e0bc90a81ca1fd62bde9f612d6cabf39159"
          dirty_paths:
            - ".agentplane/tasks/202609032308-F31YXS/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "fa693664b5fb4f7884b5c772b456357518732bd4"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609032308-F31YXS"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts --maxWorkers=1"
              id: "recovery-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun x prettier --check packages/agentplane/src/adapters/task-backend packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/shared/task-mutation.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task"
              id: "format-touched"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "lint-core"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "agentplane task lint 202609032308-F31YXS"
              id: "task-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "agentplane doctor"
              id: "doctor"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "recovery-focused"
                - "format-touched"
                - "lint-core"
                - "typecheck"
                - "routing"
                - "task-lint"
                - "doctor"
                - "diff-check"
                - "full-regression"
              description: "Verification execution and persistence use one deterministic contract, task-centric rework changes every canonical projection atomically or changes none, the PX8PZT scenario is covered, formatting/lint/typecheck/routing/task diagnostics pass, and the complete local CI gate succeeds without weakening verification or widening excluded scope."
              id: "atomic-recovery-complete"
              required: true
          evidence_fingerprint: "sha256:622a9652b187e7605236ce4cdb2d1e0bc90a81ca1fd62bde9f612d6cabf39159"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "verification-contract-focused"
                  description: "A regression reproduces the pre-fix execution/persistence drift; after the fix, passing evidence is accepted against exactly the contract used to run checks, required docs_contract remains fail-closed for real documentation changes, and repeated invocation is idempotent."
                  id: "verification-contract-stable"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 128000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                  - "PX8PZT verification failure evidence"
                symbol_hints:
                  - "recordDirectTaskVerification"
                  - "resolveImplementationVerificationTask"
                  - "cmdVerifyParsed"
                  - "resolveObservedVerificationChangedPaths"
                  - "verificationContractEvidenceCoverage"
              depends_on: []
              expected_outputs:
                - "verification-contract-atomicity"
              id: "verification-contract-atomicity"
              objective: "Reproduce the PX8PZT docs_contract mismatch and make direct check execution plus verification persistence use one deterministic observed Verification Contract and implementation identity. AgentPlane-owned task-artifact writes between phases must not silently change required check IDs, while real documentation changes must still require docs_contract."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts --maxWorkers=1"
                    id: "verification-contract-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                criteria:
                  -
                    check_ids:
                      - "verification-contract-focused"
                    description: "A regression reproduces the pre-fix execution/persistence drift; after the fix, passing evidence is accepted against exactly the contract used to run checks, required docs_contract remains fail-closed for real documentation changes, and repeated invocation is idempotent."
                    id: "verification-contract-stable"
                    required: true
                evidence_fingerprint: "sha256:622a9652b187e7605236ce4cdb2d1e0bc90a81ca1fd62bde9f612d6cabf39159"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "rework-projection-focused"
                  description: "A completed branch_pr task can record a genuine verification rework outcome without legacy/canonical split brain; revision and receipt advance once, repeat application is idempotent, and injected persistence failure exposes no partial mutation."
                  id: "rework-projection-consistent"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 128000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                  - "PX8PZT rework mutation error"
                symbol_hints:
                  - "applyTaskMutation"
                  - "projectTaskCentricCompatibilityMutation"
                  - "assertTaskCentricProjection"
                  - "TaskCentricBackendAdapter"
              depends_on:
                - "verification-contract-atomicity"
              expected_outputs:
                - "task-centric-rework-atomicity"
              id: "task-centric-rework-atomicity"
              objective: "Repair the supported evidence-based rework mutation for a task with a canonical task-centric aggregate. The operation must persist verification state, legacy compatibility fields, canonical lifecycle projection, revision, event, and receipt atomically, or leave every projection unchanged; it must route bounded correction without reviving obsolete lifecycle ownership."
              optional: false
              priority: 1
              required_inputs:
                - "verification-contract-atomicity"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts --maxWorkers=1"
                    id: "rework-projection-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                criteria:
                  -
                    check_ids:
                      - "rework-projection-focused"
                    description: "A completed branch_pr task can record a genuine verification rework outcome without legacy/canonical split brain; revision and receipt advance once, repeat application is idempotent, and injected persistence failure exposes no partial mutation."
                    id: "rework-projection-consistent"
                    required: true
                evidence_fingerprint: "sha256:622a9652b187e7605236ce4cdb2d1e0bc90a81ca1fd62bde9f612d6cabf39159"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "px8pzt-recovery-focused"
                  description: "The focused scenario covers both original failures and proves one-way progression to the correct next semantic or formal boundary with consistent revisions, immutable typed results, and no duplicate unchanged broad gate."
                  id: "px8pzt-path-recovers"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 144000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                  - "PX8PZT task artifacts and supervisor failure messages"
                symbol_hints:
                  - "recordDirectTaskVerification"
                  - "applyTaskMutation"
                  - "projectTaskCentricCompatibilityMutation"
                  - "external-agent supervisor replacement"
              depends_on:
                - "task-centric-rework-atomicity"
              expected_outputs:
                - "px8pzt-recovery-path-proof"
              id: "px8pzt-recovery-regression"
              objective: "Exercise the combined failure path that blocked PX8PZT: an AgentPlane-owned observation commit, passing direct checks, stable evidence persistence, genuine rework, bounded correction routing, and repeated resume behavior. Prove that the route advances without hand-edited projections or duplicate broad verification."
              optional: false
              priority: 2
              required_inputs:
                - "task-centric-rework-atomicity"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts --maxWorkers=1"
                    id: "px8pzt-recovery-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "px8pzt-recovery-focused"
                    description: "The focused scenario covers both original failures and proves one-way progression to the correct next semantic or formal boundary with consistent revisions, immutable typed results, and no duplicate unchanged broad gate."
                    id: "px8pzt-path-recovers"
                    required: true
                evidence_fingerprint: "sha256:622a9652b187e7605236ce4cdb2d1e0bc90a81ca1fd62bde9f612d6cabf39159"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "recovery-focused-final"
                    - "format-final"
                    - "lint-final"
                    - "typecheck-final"
                    - "routing-final"
                    - "task-lint-final"
                    - "doctor-final"
                    - "diff-final"
                    - "full-regression-final"
                  description: "All task-specific checks and bun run ci:local:full pass on the final worktree, task diagnostics expose no new invariant failure, no verification requirement is weakened, and the diff contains no excluded scope or unnecessary compatibility layer."
                  id: "recovery-qualified"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                  - "outputs from px8pzt-recovery-regression"
                symbol_hints:
                  - "verification contract"
                  - "task-centric projection"
                  - "task advance evidence rework"
              depends_on:
                - "px8pzt-recovery-regression"
              expected_outputs:
                - "verified-recovery-change"
              id: "integrated-recovery-qualification"
              objective: "Qualify the combined repair against focused lifecycle/projection tests, formatting, lint, typecheck, routing, task diagnostics, diff hygiene, and the complete local CI gate. Consolidate or delete dead compatibility code found in the touched boundaries when safe, without expanding scope."
              optional: false
              priority: 3
              required_inputs:
                - "px8pzt-recovery-path-proof"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts --maxWorkers=1"
                    id: "recovery-focused-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun x prettier --check packages/agentplane/src/adapters/task-backend packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/shared/task-mutation.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task"
                    id: "format-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "agentplane task lint 202609032308-F31YXS"
                    id: "task-lint-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "agentplane doctor"
                    id: "doctor-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-regression-final"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "recovery-focused-final"
                      - "format-final"
                      - "lint-final"
                      - "typecheck-final"
                      - "routing-final"
                      - "task-lint-final"
                      - "doctor-final"
                      - "diff-final"
                      - "full-regression-final"
                    description: "All task-specific checks and bun run ci:local:full pass on the final worktree, task diagnostics expose no new invariant failure, no verification requirement is weakened, and the diff contains no excluded scope or unnecessary compatibility layer."
                    id: "recovery-qualified"
                    required: true
                evidence_fingerprint: "sha256:622a9652b187e7605236ce4cdb2d1e0bc90a81ca1fd62bde9f612d6cabf39159"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609032308-F31YXS"
    event_cursor: 3
    final_validation: null
    id: "202609032308-F31YXS"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts --maxWorkers=1"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-5"
          required: true
      captured_at: "2026-09-03T23:08:21.739Z"
      constraints: []
      request: |-
        Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete

        Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work.
      task_id: "202609032308-F31YXS"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 10
    schema_version: 1
    updated_at: "2026-09-03T23:37:59.823Z"
    work_items:
      integrated-recovery-qualification:
        attempt: 0
        claim_id: null
        id: "integrated-recovery-qualification"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      px8pzt-recovery-regression:
        attempt: 0
        claim_id: null
        id: "px8pzt-recovery-regression"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      task-centric-rework-atomicity:
        attempt: 1
        claim_id: null
        id: "task-centric-rework-atomicity"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:0eb38213f22b29dd32b791c31e5050ac8ace0dc023f0aa90e9760de285659ecc"
            id: "task-centric-rework-atomicity"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609032308-F31YXS"
              work_item_id: "task-centric-rework-atomicity"
            provenance:
              - "sha256:8f7a9ff55b2ab6e2fef341c2aefc11bb889b48507cb3fb87c16cb8afda3d5fd7"
              - ".agentplane/tasks/202609032308-F31YXS/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:be1b5ff260120b023a308d60da5f88f329cdf255eca88815abff45f101a09214"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609032308-F31YXS/supervision/declared-checks.json"
              check_id: "rework-projection-focused"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-03T23:37:59.818Z"
              repository_snapshot_digest: "sha256:be1b5ff260120b023a308d60da5f88f329cdf255eca88815abff45f101a09214"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      verification-contract-atomicity:
        attempt: 1
        claim_id: null
        id: "verification-contract-atomicity"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:238e8319b6ea8e51c448004afca8b05fba0de21a2fedaa4e7439098202ccff5d"
            id: "verification-contract-atomicity"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609032308-F31YXS"
              work_item_id: "verification-contract-atomicity"
            provenance:
              - "sha256:2a082fee301ecfb159845ba79fdc378dccf02333ddda04c40df1aacbcf98e634"
              - ".agentplane/tasks/202609032308-F31YXS/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:ed96492773e8daad72a0aacb9c7efd223a711df250dab575838bbe04c8b83350"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609032308-F31YXS/supervision/declared-checks.json"
              check_id: "verification-contract-focused"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-03T23:35:09.922Z"
              repository_snapshot_digest: "sha256:ed96492773e8daad72a0aacb9c7efd223a711df250dab575838bbe04c8b83350"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-03T23:35:09.927Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_4a9a5b096aca0ab6221c9d9e"
        mutation_id: "external-result:work-order-202609032308-F31YXS-executor-eb90ac46e451ca16dc2fd438"
        plan_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609032308-F31YXS"
        task_revision: 6
        work_item_id: "verification-contract-atomicity"
      -
        at: "2026-09-03T23:37:59.823Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_999f835bbf172de2609fd383"
        mutation_id: "external-result:work-order-202609032308-F31YXS-executor-73cbb791dbfa329983cb524d"
        plan_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609032308-F31YXS"
        task_revision: 9
        work_item_id: "task-centric-rework-atomicity"
    leases: []
    mutation_receipts:
      compatibility:sha256:006e22756bc5a08db92bf228206a39cfd6b663d86af760e684ce7fc2a34a132a:
        aggregate_digest: "sha256:8dae2ae476f9151890a4bff523ca7ed23c7ad7ccab003e0bbf4b65963ea099db"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T23:37:51.883Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_754a3da8b957294416c706f8"
          mutation_id: "compatibility:sha256:006e22756bc5a08db92bf228206a39cfd6b663d86af760e684ce7fc2a34a132a"
          plan_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609032308-F31YXS"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:006e22756bc5a08db92bf228206a39cfd6b663d86af760e684ce7fc2a34a132a"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609032308-F31YXS"
      compatibility:sha256:3204719e7e5825455f6c79309cda9f40ce68b66e30585314c085b317899965eb:
        aggregate_digest: "sha256:47694b9731ff5da761b75fcd6e59204702701ed2423cd15e0683c3bced0f4bf9"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T23:29:34.650Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_af03827370836ed758e4543a"
          mutation_id: "compatibility:sha256:3204719e7e5825455f6c79309cda9f40ce68b66e30585314c085b317899965eb"
          plan_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609032308-F31YXS"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3204719e7e5825455f6c79309cda9f40ce68b66e30585314c085b317899965eb"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609032308-F31YXS"
      compatibility:sha256:a23be9b59fa9d915a4767c9ba99b621654e035fce0e5007609e83a08a0fae7cd:
        aggregate_digest: "sha256:9c5c57c59cb49b9315867f764202a7554ef68d090baed8b1d77a7ae50e4ff1fe"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T23:35:00.416Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1ef6c9ca0f28dc164df95ed3"
          mutation_id: "compatibility:sha256:a23be9b59fa9d915a4767c9ba99b621654e035fce0e5007609e83a08a0fae7cd"
          plan_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609032308-F31YXS"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a23be9b59fa9d915a4767c9ba99b621654e035fce0e5007609e83a08a0fae7cd"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609032308-F31YXS"
      external-result:work-order-202609032308-F31YXS-executor-73cbb791dbfa329983cb524d:
        aggregate_digest: "sha256:56ac68f62c6d3ea3ac3bce8f69b16764d465a020c7cb2bcb3fc5831b26e10500"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T23:37:59.823Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_999f835bbf172de2609fd383"
          mutation_id: "external-result:work-order-202609032308-F31YXS-executor-73cbb791dbfa329983cb524d"
          plan_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609032308-F31YXS"
          task_revision: 9
          to: "COMPLETED"
          work_item_id: "task-centric-rework-atomicity"
        mutation_id: "external-result:work-order-202609032308-F31YXS-executor-73cbb791dbfa329983cb524d"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609032308-F31YXS"
      external-result:work-order-202609032308-F31YXS-executor-eb90ac46e451ca16dc2fd438:
        aggregate_digest: "sha256:f547a19657592f09d18ff4caf385f7cd6c61b6052e6e32774737e25dd4b58b37"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T23:35:09.927Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_4a9a5b096aca0ab6221c9d9e"
          mutation_id: "external-result:work-order-202609032308-F31YXS-executor-eb90ac46e451ca16dc2fd438"
          plan_digest: "sha256:a9b3f855f7189e334fded9a196dcf507eccce29986e502cb8fba9391699e5ea0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609032308-F31YXS"
          task_revision: 6
          to: "COMPLETED"
          work_item_id: "verification-contract-atomicity"
        mutation_id: "external-result:work-order-202609032308-F31YXS-executor-eb90ac46e451ca16dc2fd438"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609032308-F31YXS"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "e37f30c53768d99c19a95dc74973cc909fa3e315"
  task_execution_context:
    base_ref: "main"
    base_sha: "fa693664b5fb4f7884b5c772b456357518732bd4"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "fa693664b5fb4f7884b5c772b456357518732bd4"
    version: 1
id_source: "generated"
---
## Summary

Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete

Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work.

## Scope

- In scope: Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work.
- Out of scope: unrelated refactors not required for "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete".

## Plan

Prepared one bounded branch_pr recovery plan with four strictly sequential WorkItems: stabilize the verification contract across execution and persistence, make task-centric rework projection atomic, prove the PX8PZT failure path, and qualify the combined repair. The execution declaration, WorkItem scopes, and resource claims use one closed set of four repository roots.

## Verify Steps

PLANNER fallback scaffold for "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
