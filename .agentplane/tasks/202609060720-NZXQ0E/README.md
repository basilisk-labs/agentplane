---
id: "202609060720-NZXQ0E"
title: "Recover an interrupted integration queue supervisor intent before semantic rework"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recovery"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-09-06T11:45:20.574Z"
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
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Repair only the demonstrated interrupted workflow-intent dispatch gap in the existing supervisor owner and nearest tests."
      - "The task does not own the separate implementation_rework replay bug in PH5N6S."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:706df642710af344e14b29af972e0b75bf117f03b33c18f4a406817021dc4b73"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
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
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The bounded recovery inspection is complete, but the historical integration intent cannot yet be reconciled with the required exact original identity. Fixed the existing provider fingerprint test fixture; no production recovery or task-state bypass was added. Recommended action: Return this existing task to PLANNER. Preserve the fixture fix. Separate forward prevention with durable original operation/queue/provider identity from legacy intent recovery. Define a supported evidence-bound operator reconciliation path for the historical intent, including explicit outcome evidence, exclusive ownership, CAS and negative tests. Do not manufacture the original snapshot, manually edit journals, reopen completed tasks, duplicate PH5N6S, or claim release readiness. Agentplane receipt: external-agent-blocker/tr_f4f7858ddd51a5937c2f606c2a6651d7/sha256:eec28f80662be6438f99ed216cbd3e6f96c12be18f071b42e1bedae5f61e8bbb."
events:
  -
    type: "status"
    at: "2026-09-06T11:45:32.782Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-06T11:52:47.250Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The bounded recovery inspection is complete, but the historical integration intent cannot yet be reconciled with the required exact original identity. Fixed the existing provider fingerprint test fixture; no production recovery or task-state bypass was added. Recommended action: Return this existing task to PLANNER. Preserve the fixture fix. Separate forward prevention with durable original operation/queue/provider identity from legacy intent recovery. Define a supported evidence-bound operator reconciliation path for the historical intent, including explicit outcome evidence, exclusive ownership, CAS and negative tests. Do not manufacture the original snapshot, manually edit journals, reopen completed tasks, duplicate PH5N6S, or claim release readiness. Agentplane receipt: external-agent-blocker/tr_f4f7858ddd51a5937c2f606c2a6651d7/sha256:eec28f80662be6438f99ed216cbd3e6f96c12be18f071b42e1bedae5f61e8bbb."
doc_version: 3
doc_updated_at: "2026-09-06T11:52:47.250Z"
doc_updated_by: "SUPERVISOR"
description: "Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery."
sections:
  Summary: |-
    Recover an interrupted integration queue supervisor intent before semantic rework

    Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
  Scope: |-
    - In scope: Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
    - Out of scope: unrelated refactors not required for "Recover an interrupted integration queue supervisor intent before semantic rework".
  Plan: "One bounded recovery WorkItem repairs orphaned integration workflow intent dispatch in existing supervisor owners and returns control to PH5N6S."
  Verify Steps: |-
    1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1`. Expected: an interrupted integration.run_next can return to semantic rework only with exact durable queue/provider identity and exclusive ownership; missing, foreign, live-owner and uncertain effects remain fail-closed; interruption and repeat do not duplicate effects.
    2. Run `bun run ci:local:full` after focused regressions pass and the native supervisor commits the implementation. Expected: all required full regression gates pass for the actual repair SHA without manual state edits, weakened authority or a second state store.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
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
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:7af13cc8707a16339154234b6374c9b5c01c5600386896fddb1a71347449164c"
    grant_id: "6ea46c53-a290-40f1-bba2-b87ad2ac911a"
    issued_at: "2026-09-06T11:45:20.574Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:6682631535b733dd98cc953f17a0dc7e326654b8ad5fc931b06565e69674bcf8"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609060720-NZXQ0E"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-06T11:45:20.574Z"
        approved_by: "USER"
        approved_digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-06T07:22:45.828Z"
      digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
      proposal:
        assumptions:
          - "All five writable roots are the exact union of WorkItem scope and resource claims. No source mutation before fresh USER plan approval."
          - "Reuse existing queue and provider evidence readers, journal CAS, operation identities and supervisor leases. Do not introduce a new journal schema, state store, operator bypass or task-ID special case. A completed or uncertain merge must never be relabelled not applied without authoritative proof."
          - "Test positive recovery, missing and foreign identity evidence, live-owner exclusion, repeated recovery and interruption between durable writes. Start with the nearest regression; execute full CI only after stabilization and native commit."
          - "Formal integration of this repair and application to the blocked original task remain AgentPlane-owned. Recompute fresh route and authority before each external effect. Preserve the existing PH5N6S queue entry and review thread; do not resolve its independent code finding here."
          - "Return immediately to PH5N6S after recovery, then complete Clean Core and final main qualification. Do not reopen completed fixes without a separately demonstrated defect."
          - "Exclude MPXQBK, release preparation, version changes, release notes, tags, package publication, mass cleanup, Git-history rewriting and unrelated lifecycle optimization."
        planning_baseline:
          captured_at: "2026-09-06T07:21:14.014Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:54643ec624353a3d17183fb1f40e05c678e8e4e691475d2e0888e5503d8e02d7"
          dirty_paths:
            - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "1e3c0b4b3d1457d18224dd94bac19d91bafa90bd"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
              id: "recovery"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "recovery"
              description: "After an interrupted integration.run_next with no live supervisor or queue owner, fresh identity-matched durable queue and provider evidence permits the current semantic rework route without executing integration again. Preserve uncertainty if evidence cannot establish the effect state."
              id: "safe-recovery"
              required: true
            -
              check_ids:
                - "recovery"
              description: "Reject foreign task, branch, head, base, provider, authority, operation identity, live ownership and missing or contradictory evidence. Repeated or interrupted recovery preserves completed effects and uses the existing CAS journal owner."
              id: "fail-closed"
              required: true
            -
              check_ids:
                - "full"
              description: "Full CI passes for the committed repair. No competing state store, weakened authority, task-ID special case or manual lifecycle edits are introduced."
              id: "regression"
              required: true
          evidence_fingerprint: "sha256:54643ec624353a3d17183fb1f40e05c678e8e4e691475d2e0888e5503d8e02d7"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "recovery"
                  description: "After an interrupted integration.run_next with no live supervisor or queue owner, fresh identity-matched durable queue and provider evidence permits the current semantic rework route without executing integration again. Preserve uncertainty if evidence cannot establish the effect state."
                  id: "safe-recovery"
                  required: true
                -
                  check_ids:
                    - "recovery"
                  description: "Reject foreign task, branch, head, base, provider, authority, operation identity, live ownership and missing or contradictory evidence. Repeated or interrupted recovery preserves completed effects and uses the existing CAS journal owner."
                  id: "fail-closed"
                  required: true
                -
                  check_ids:
                    - "full"
                  description: "Full CI passes for the committed repair. No competing state store, weakened authority, task-ID special case or manual lifecycle edits are introduced."
                  id: "regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources: []
                required_sources: []
                symbol_hints:
                  - "recoverPendingExternalAgentResult"
                  - "unresolvedExternalAgentExchange"
                  - "recordIssuedExternalAgentEpisode"
                  - "supervisePersistedWorkflowEpisode"
                  - "retireSupervisorExecutionEpisodeIntentAfterStateDrift"
              depends_on: []
              expected_outputs:
                - "Qualified interruption-recovery implementation and regressions in existing supervisor owners"
                - "Fresh native route can resume the original PH5N6S rework without manual state edits"
              id: "recover-queue-intent"
              objective: "Reproduce the interrupted integration worker followed by semantic rework. Reconcile the exact orphaned CLI intent through the existing lease, evidence and CAS mechanisms. Issue fresh rework without repeating merge, enqueue or a completed operation; retain fail-closed uncertainty where proof is insufficient."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                    id: "recovery"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "recovery"
                    description: "After an interrupted integration.run_next with no live supervisor or queue owner, fresh identity-matched durable queue and provider evidence permits the current semantic rework route without executing integration again. Preserve uncertainty if evidence cannot establish the effect state."
                    id: "safe-recovery"
                    required: true
                  -
                    check_ids:
                      - "recovery"
                    description: "Reject foreign task, branch, head, base, provider, authority, operation identity, live ownership and missing or contradictory evidence. Repeated or interrupted recovery preserves completed effects and uses the existing CAS journal owner."
                    id: "fail-closed"
                    required: true
                  -
                    check_ids:
                      - "full"
                    description: "Full CI passes for the committed repair. No competing state store, weakened authority, task-ID special case or manual lifecycle edits are introduced."
                    id: "regression"
                    required: true
                evidence_fingerprint: "sha256:54643ec624353a3d17183fb1f40e05c678e8e4e691475d2e0888e5503d8e02d7"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609060720-NZXQ0E"
    event_cursor: 4
    final_validation: null
    id: "202609060720-NZXQ0E"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-06T07:20:42.679Z"
      constraints: []
      request: |-
        Recover an interrupted integration queue supervisor intent before semantic rework

        Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
      task_id: "202609060720-NZXQ0E"
    lifecycle: "BLOCKED"
    plan_amendments: []
    plan_history: []
    revision: 6
    schema_version: 1
    updated_at: "2026-09-06T11:52:47.250Z"
    work_items:
      recover-queue-intent:
        attempt: 0
        claim_id: null
        id: "recover-queue-intent"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:173bd142bcbb34cdc751b2a34d57698b773c5a56fe5c67e1169f8633b11ecb72:
        aggregate_digest: "sha256:4393976aecb6c33dee59f3ff38ede0bc3a53dbb477451fce3303228c8907f23c"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T07:23:25.609Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_75c475b66ca17466ffb93284"
          mutation_id: "compatibility:sha256:173bd142bcbb34cdc751b2a34d57698b773c5a56fe5c67e1169f8633b11ecb72"
          plan_digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:173bd142bcbb34cdc751b2a34d57698b773c5a56fe5c67e1169f8633b11ecb72"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      compatibility:sha256:2cd28a0557e87b4cf83c44ef29f81807b9efc32da8808b72499514bd672f7ef9:
        aggregate_digest: "sha256:a2cbc2fecb6488d19f52f42b95e1a208795a8c4f35cd7799524fb1def0f83b6d"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T11:45:32.782Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ecd49f1404cfb014c6b8d096"
          mutation_id: "compatibility:sha256:2cd28a0557e87b4cf83c44ef29f81807b9efc32da8808b72499514bd672f7ef9"
          plan_digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2cd28a0557e87b4cf83c44ef29f81807b9efc32da8808b72499514bd672f7ef9"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      compatibility:sha256:6034d2a87dfa8e87769a7d91dcc12fc32718835416812d690142d6c8e87b3e99:
        aggregate_digest: "sha256:19ed664d22336db76c52648107a2cef261d3336c77f89c7df4ac6038db179d64"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T11:52:47.250Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5c2d3f6e69f94a1a333d4e11"
          mutation_id: "compatibility:sha256:6034d2a87dfa8e87769a7d91dcc12fc32718835416812d690142d6c8e87b3e99"
          plan_digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 5
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6034d2a87dfa8e87769a7d91dcc12fc32718835416812d690142d6c8e87b3e99"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      compatibility:sha256:d3300c9aca3d9281f6aaf2dd48d41e769cde19a8bed8b4f8651a6a73c3c61d45:
        aggregate_digest: "sha256:eab00f9683693d81a2f81f89558392325dac5e8353b38b5d33783962ce722625"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T07:23:25.608Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_b493b453213b73f160557b5e"
          mutation_id: "compatibility:sha256:d3300c9aca3d9281f6aaf2dd48d41e769cde19a8bed8b4f8651a6a73c3c61d45"
          plan_digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:d3300c9aca3d9281f6aaf2dd48d41e769cde19a8bed8b4f8651a6a73c3c61d45"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "1e3c0b4b3d1457d18224dd94bac19d91bafa90bd"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "1e3c0b4b3d1457d18224dd94bac19d91bafa90bd"
    version: 1
id_source: "generated"
---
## Summary

Recover an interrupted integration queue supervisor intent before semantic rework

Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.

## Scope

- In scope: Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
- Out of scope: unrelated refactors not required for "Recover an interrupted integration queue supervisor intent before semantic rework".

## Plan

One bounded recovery WorkItem repairs orphaned integration workflow intent dispatch in existing supervisor owners and returns control to PH5N6S.

## Verify Steps

1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1`. Expected: an interrupted integration.run_next can return to semantic rework only with exact durable queue/provider identity and exclusive ownership; missing, foreign, live-owner and uncertain effects remain fail-closed; interruption and repeat do not duplicate effects.
2. Run `bun run ci:local:full` after focused regressions pass and the native supervisor commits the implementation. Expected: all required full regression gates pass for the actual repair SHA without manual state edits, weakened authority or a second state store.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
