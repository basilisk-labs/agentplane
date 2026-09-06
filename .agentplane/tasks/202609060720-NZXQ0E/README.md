---
id: "202609060720-NZXQ0E"
title: "Recover an interrupted integration queue supervisor intent before semantic rework"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
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
  updated_at: "2026-09-06T13:02:53.954Z"
  updated_by: "USER"
  note: "Apply the user-authorized permission override for complete release repairs to this scoped fixture split required by the enforced module-size limit; verification and effect authority are unchanged."
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
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/advance.spec.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
      - "packages/core/src/runner/supervisor-execution-episode.test.ts"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Keep persistence in the existing journal owner and expose an explicit operator reconciliation boundary rather than weaken identity or synthesize evidence."
      - "New command documentation and persisted-contract regression coverage are required for the operator recovery surface."
      - "The current five-file automatic recovery plan cannot satisfy its original-identity acceptance for a legacy intent with no stored snapshot."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/advance.spec.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
      - "packages/core/src/runner/supervisor-execution-episode.test.ts"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "docs/user/cli-reference.generated.mdx"
          - "docs/user/task-lifecycle.mdx"
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
          - "packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/advance.spec.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
          - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
          - "packages/core/src/runner/supervisor-execution-episode.test.ts"
          - "packages/core/src/runner/supervisor-execution-episode.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:cbcb7b492a02cf2d2f4f7eb7571002664e0f19d58d20d44c3668da0be3444484"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
        - "central_component:packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "central_component:packages/core/src/runner/supervisor-execution-episode-migration.ts"
        - "central_component:packages/core/src/runner/supervisor-execution-episode.test.ts"
        - "central_component:packages/core/src/runner/supervisor-execution-episode.ts"
        - "effect_public_api"
        - "effect_schema"
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
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
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
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d72bb02b4803. CLI accepted one state-bound external-agent semantic result."
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
  -
    type: "status"
    at: "2026-09-06T12:33:57.869Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d72bb02b4803. CLI accepted one state-bound external-agent semantic result."
    commit: "d72bb02b4803ba011fa5b19606c5e1bef4d72e41"
doc_version: 3
doc_updated_at: "2026-09-06T13:02:38.234Z"
doc_updated_by: "SUPERVISOR"
description: "Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery."
sections:
  Summary: |-
    Recover an interrupted integration queue supervisor intent before semantic rework

    Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
  Scope: |-
    - In scope: Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
    - Out of scope: unrelated refactors not required for "Recover an interrupted integration queue supervisor intent before semantic rework".
  Plan: "Add one scoped integration-recovery testkit while preserving the existing three WorkItems and deterministic verification contract."
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
    completion_contract_digest: "sha256:3aa962fe6733f58b5d54f6fbe8f4fd4d6872f975810025922344952639197cb0"
    digest: "sha256:76f7a3afee75781065b50c31ce5a54fb29291c79e01e761fd423ed2ea68e0d58"
    grant_id: "97949c90-693a-4428-95af-b42741484ba2"
    issued_at: "2026-09-06T13:02:53.954Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:39f2924fe758aa86984cf551a76f3d9ea7c92a910f8d7a86b246c48c5839fa66"
    plan_revision: 17
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:5bffa75f1c5c9cc45183dca07ec41d5ddca75cf9b43a03f1ba6370d6dacd6920"
    status: "active"
    task_id: "202609060720-NZXQ0E"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-06T13:02:53.954Z"
        approved_by: "USER"
        approved_digest: "sha256:a39a5181a7994dc4e79d77789618042a8add57df6cdf0ab8be561ebef5be124a"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-06T13:02:38.222Z"
      digest: "sha256:a39a5181a7994dc4e79d77789618042a8add57df6cdf0ab8be561ebef5be124a"
      proposal:
        assumptions:
          - "User authorized correcting the release plan and continuing. The changed persisted evidence and operator recovery interface require a fresh approval of this concrete revision."
          - "Reuse NZXQ0E and leave PH5N6S implementation replay repair in PH5N6S. One WorkItem is active at a time."
          - "The first WorkItem has no produced-output dependencies. Later required_inputs exactly match preceding expected_outputs, as required by INC-20260829-01."
          - "No release/version/tag/publication changes, dependency changes, MPXQBK work, task-specific bypass, manual state edit, or unrelated provider expansion belongs to this task."
          - "An operator outcome decision is a separate evidence boundary; general implementation consent is not a factual verdict on an uncertain historical effect."
        planning_baseline:
          captured_at: "2026-09-06T13:01:47.663Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:741c7bc89d98dd4e260ca0eb54230f214ec73e46599e3799112aaea5532cd712"
          dirty_paths:
            - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "1d8deae874d4eaff0db07f3b23df55e69b52d403"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:16"
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
              id: "focused-recovery"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-regression"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "focused-recovery"
                - "full-regression"
              description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
              id: "durable-identity"
              required: true
            -
              check_ids:
                - "focused-recovery"
                - "full-regression"
              description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
              id: "explicit-reconciliation"
              required: true
            -
              check_ids:
                - "focused-recovery"
                - "full-regression"
              description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
              id: "negative-and-replay"
              required: true
            -
              check_ids:
                - "focused-recovery"
                - "full-regression"
              description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
              id: "native-handoff"
              required: true
          evidence_fingerprint: "sha256:741c7bc89d98dd4e260ca0eb54230f214ec73e46599e3799112aaea5532cd712"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-recovery"
                    - "full-regression"
                  description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                  id: "durable-identity"
                  required: true
                -
                  check_ids:
                    - "focused-recovery"
                    - "full-regression"
                  description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                  id: "negative-and-replay"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources: []
                required_sources:
                  - "AGENTS.md"
                  - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                symbol_hints:
                  - "startSupervisorExecutionEpisode"
                  - "recoverPendingExternalAgentResult"
                  - "withIntegrationQueueMutex"
              depends_on: []
              expected_outputs:
                - "Durable integration intent identity and compatibility regressions"
              id: "durable-cli-identity"
              objective: "Persist and validate the original integration operation identity in the existing supervisor journal owner before the effect starts. Retain a fail-closed legacy path for journals without the evidence. Add compatible legacy/current/corrupt fixtures and preserve existing operation-key behavior where no new evidence is supplied."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "."
              risk: "high"
              scope_roots:
                - "packages/core/src/runner/supervisor-execution-episode.ts"
                - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                    id: "focused-recovery"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-regression"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                    id: "durable-identity"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                evidence_fingerprint: "sha256:741c7bc89d98dd4e260ca0eb54230f214ec73e46599e3799112aaea5532cd712"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-recovery"
                    - "full-regression"
                  description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                  id: "explicit-reconciliation"
                  required: true
                -
                  check_ids:
                    - "focused-recovery"
                    - "full-regression"
                  description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                  id: "negative-and-replay"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources: []
                required_sources:
                  - "AGENTS.md"
                  - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                symbol_hints:
                  - "startSupervisorExecutionEpisode"
                  - "recoverPendingExternalAgentResult"
                  - "withIntegrationQueueMutex"
              depends_on:
                - "durable-cli-identity"
              expected_outputs:
                - "Qualified exact-intent workflow reconciliation"
              id: "bound-workflow-reconciliation"
              objective: "Implement an evidence-bound reconciliation path at task advance. Use the existing journal CAS, supervisor lease and queue mutex. Add an explicit operator input route for historical intents lacking the original snapshot; require exact journal/operation/current-route binding, operator provenance, a typed outcome and content-bound evidence, then independently check fresh provider/queue identity. Never infer a historical not-applied result from OPEN alone. Restore only semantic rework after a known failed/not-applied integration; preserve unresolved effects and completed merge outcomes. Keep this logic in one focused owner and expose the smallest command option needed."
              optional: false
              priority: 1
              required_inputs:
                - "Durable integration intent identity and compatibility regressions"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "."
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "docs/user/cli-reference.generated.mdx"
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/advance.command.ts"
                - "packages/agentplane/src/commands/task/advance.spec.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/core/src/runner/supervisor-execution-episode.ts"
                - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                    id: "focused-recovery"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-regression"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                    id: "explicit-reconciliation"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                evidence_fingerprint: "sha256:741c7bc89d98dd4e260ca0eb54230f214ec73e46599e3799112aaea5532cd712"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-recovery"
                    - "full-regression"
                  description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                  id: "negative-and-replay"
                  required: true
                -
                  check_ids:
                    - "focused-recovery"
                    - "full-regression"
                  description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                  id: "native-handoff"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources: []
                required_sources:
                  - "AGENTS.md"
                  - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                symbol_hints:
                  - "startSupervisorExecutionEpisode"
                  - "recoverPendingExternalAgentResult"
                  - "withIntegrationQueueMutex"
              depends_on:
                - "bound-workflow-reconciliation"
              expected_outputs:
                - "Native recovery qualification and PH5N6S handoff"
              id: "qualify-recovery-handoff"
              objective: "Exercise the native command in real-Git fixtures with replay, interruption and negative controls. Document the operator evidence boundary and recovery command. Run the declared focused suite and full regression through the supervisor. Deliver a concrete PH5N6S operator handoff bound to its historical intent; do not mutate PH5N6S from this episode or claim its recovery without observed native evidence."
              optional: false
              priority: 1
              required_inputs:
                - "Qualified exact-intent workflow reconciliation"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "."
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "docs/user/task-lifecycle.mdx"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/cli/workflow-effect-recovery.testkit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                    id: "focused-recovery"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-regression"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                    id: "native-handoff"
                    required: true
                evidence_fingerprint: "sha256:741c7bc89d98dd4e260ca0eb54230f214ec73e46599e3799112aaea5532cd712"
                schema_version: 1
      revision: 4
      schema_version: 1
      task_id: "202609060720-NZXQ0E"
    event_cursor: 10
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
      -
        approval:
          approved_at: "2026-09-06T12:26:03.967Z"
          approved_by: "USER"
          approved_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T12:06:21.768Z"
        digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
        proposal:
          assumptions:
            - "User authorized correcting the release plan and continuing. The changed persisted evidence and operator recovery interface require a fresh approval of this concrete revision."
            - "Reuse NZXQ0E and leave PH5N6S implementation replay repair in PH5N6S. One WorkItem is active at a time."
            - "The first WorkItem has no produced-output dependencies. Later required_inputs exactly match preceding expected_outputs, as required by INC-20260829-01."
            - "No release/version/tag/publication changes, dependency changes, MPXQBK work, task-specific bypass, manual state edit, or unrelated provider expansion belongs to this task."
            - "An operator outcome decision is a separate evidence boundary; general implementation consent is not a factual verdict on an uncertain historical effect."
          planning_baseline:
            captured_at: "2026-09-06T12:00:36.849Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:14a62d0faf2a0257e122797908ea5a60c0d0fa4ccb88043898e986bb81174183"
            dirty_paths:
              - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "209a9540c6e8b91111d5f788d135952d2f09423d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:7"
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                id: "focused-recovery"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-regression"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                id: "durable-identity"
                required: true
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                id: "explicit-reconciliation"
                required: true
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                id: "negative-and-replay"
                required: true
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                id: "native-handoff"
                required: true
            evidence_fingerprint: "sha256:14a62d0faf2a0257e122797908ea5a60c0d0fa4ccb88043898e986bb81174183"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                    id: "durable-identity"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources: []
                  required_sources:
                    - "AGENTS.md"
                    - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                  symbol_hints:
                    - "startSupervisorExecutionEpisode"
                    - "recoverPendingExternalAgentResult"
                    - "withIntegrationQueueMutex"
                depends_on: []
                expected_outputs:
                  - "Durable integration intent identity and compatibility regressions"
                id: "durable-cli-identity"
                objective: "Persist and validate the original integration operation identity in the existing supervisor journal owner before the effect starts. Retain a fail-closed legacy path for journals without the evidence. Add compatible legacy/current/corrupt fixtures and preserve existing operation-key behavior where no new evidence is supplied."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "."
                risk: "high"
                scope_roots:
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                  - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                      id: "focused-recovery"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-regression"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                      id: "durable-identity"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                      id: "negative-and-replay"
                      required: true
                  evidence_fingerprint: "sha256:14a62d0faf2a0257e122797908ea5a60c0d0fa4ccb88043898e986bb81174183"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                    id: "explicit-reconciliation"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources: []
                  required_sources:
                    - "AGENTS.md"
                    - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                  symbol_hints:
                    - "startSupervisorExecutionEpisode"
                    - "recoverPendingExternalAgentResult"
                    - "withIntegrationQueueMutex"
                depends_on:
                  - "durable-cli-identity"
                expected_outputs:
                  - "Qualified exact-intent workflow reconciliation"
                id: "bound-workflow-reconciliation"
                objective: "Implement an evidence-bound reconciliation path at task advance. Use the existing journal CAS, supervisor lease and queue mutex. Add an explicit operator input route for historical intents lacking the original snapshot; require exact journal/operation/current-route binding, operator provenance, a typed outcome and content-bound evidence, then independently check fresh provider/queue identity. Never infer a historical not-applied result from OPEN alone. Restore only semantic rework after a known failed/not-applied integration; preserve unresolved effects and completed merge outcomes. Keep this logic in one focused owner and expose the smallest command option needed."
                optional: false
                priority: 1
                required_inputs:
                  - "Durable integration intent identity and compatibility regressions"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "."
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/commands/task/advance.spec.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                  - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                      id: "focused-recovery"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-regression"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                      id: "explicit-reconciliation"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                      id: "negative-and-replay"
                      required: true
                  evidence_fingerprint: "sha256:14a62d0faf2a0257e122797908ea5a60c0d0fa4ccb88043898e986bb81174183"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                    id: "native-handoff"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources: []
                  required_sources:
                    - "AGENTS.md"
                    - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                  symbol_hints:
                    - "startSupervisorExecutionEpisode"
                    - "recoverPendingExternalAgentResult"
                    - "withIntegrationQueueMutex"
                depends_on:
                  - "bound-workflow-reconciliation"
                expected_outputs:
                  - "Native recovery qualification and PH5N6S handoff"
                id: "qualify-recovery-handoff"
                objective: "Exercise the native command in real-Git fixtures with replay, interruption and negative controls. Document the operator evidence boundary and recovery command. Run the declared focused suite and full regression through the supervisor. Deliver a concrete PH5N6S operator handoff bound to its historical intent; do not mutate PH5N6S from this episode or claim its recovery without observed native evidence."
                optional: false
                priority: 1
                required_inputs:
                  - "Qualified exact-intent workflow reconciliation"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "."
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "docs/user/task-lifecycle.mdx"
                  - "docs/user/cli-reference.generated.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                      id: "focused-recovery"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-regression"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                      id: "negative-and-replay"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                      id: "native-handoff"
                      required: true
                  evidence_fingerprint: "sha256:14a62d0faf2a0257e122797908ea5a60c0d0fa4ccb88043898e986bb81174183"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      -
        approval:
          approved_at: "2026-09-06T12:58:34.850Z"
          approved_by: "USER"
          approved_digest: "sha256:57b2ed15318a0ab325b8bf906a672274ae3c431cf9cea07e9b540c1642bdc50d"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T12:58:13.290Z"
        digest: "sha256:57b2ed15318a0ab325b8bf906a672274ae3c431cf9cea07e9b540c1642bdc50d"
        proposal:
          assumptions:
            - "User authorized correcting the release plan and continuing. The changed persisted evidence and operator recovery interface require a fresh approval of this concrete revision."
            - "Reuse NZXQ0E and leave PH5N6S implementation replay repair in PH5N6S. One WorkItem is active at a time."
            - "The first WorkItem has no produced-output dependencies. Later required_inputs exactly match preceding expected_outputs, as required by INC-20260829-01."
            - "No release/version/tag/publication changes, dependency changes, MPXQBK work, task-specific bypass, manual state edit, or unrelated provider expansion belongs to this task."
            - "An operator outcome decision is a separate evidence boundary; general implementation consent is not a factual verdict on an uncertain historical effect."
          planning_baseline:
            captured_at: "2026-09-06T12:57:00.378Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:0e703b28265017eba417b394a160c2c4bb21b75b002dbfb83b97399899b637c2"
            dirty_paths:
              - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "1d8deae874d4eaff0db07f3b23df55e69b52d403"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:13"
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                id: "focused-recovery"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-regression"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                id: "durable-identity"
                required: true
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                id: "explicit-reconciliation"
                required: true
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                id: "negative-and-replay"
                required: true
              -
                check_ids:
                  - "focused-recovery"
                  - "full-regression"
                description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                id: "native-handoff"
                required: true
            evidence_fingerprint: "sha256:0e703b28265017eba417b394a160c2c4bb21b75b002dbfb83b97399899b637c2"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                    id: "durable-identity"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources: []
                  required_sources:
                    - "AGENTS.md"
                    - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                  symbol_hints:
                    - "startSupervisorExecutionEpisode"
                    - "recoverPendingExternalAgentResult"
                    - "withIntegrationQueueMutex"
                depends_on: []
                expected_outputs:
                  - "Durable integration intent identity and compatibility regressions"
                id: "durable-cli-identity"
                objective: "Persist and validate the original integration operation identity in the existing supervisor journal owner before the effect starts. Retain a fail-closed legacy path for journals without the evidence. Add compatible legacy/current/corrupt fixtures and preserve existing operation-key behavior where no new evidence is supplied."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "."
                risk: "high"
                scope_roots:
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                  - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                      id: "focused-recovery"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-regression"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "New integration CLI intents persist the original typed operation and its queue/provider identity before execution. The journal digest and operation key bind this evidence. Absent legacy evidence is preserved as absent; migration never invents it. Corruption and foreign identity are rejected."
                      id: "durable-identity"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                      id: "negative-and-replay"
                      required: true
                  evidence_fingerprint: "sha256:0e703b28265017eba417b394a160c2c4bb21b75b002dbfb83b97399899b637c2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                    id: "explicit-reconciliation"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources: []
                  required_sources:
                    - "AGENTS.md"
                    - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                  symbol_hints:
                    - "startSupervisorExecutionEpisode"
                    - "recoverPendingExternalAgentResult"
                    - "withIntegrationQueueMutex"
                depends_on:
                  - "durable-cli-identity"
                expected_outputs:
                  - "Qualified exact-intent workflow reconciliation"
                id: "bound-workflow-reconciliation"
                objective: "Implement an evidence-bound reconciliation path at task advance. Use the existing journal CAS, supervisor lease and queue mutex. Add an explicit operator input route for historical intents lacking the original snapshot; require exact journal/operation/current-route binding, operator provenance, a typed outcome and content-bound evidence, then independently check fresh provider/queue identity. Never infer a historical not-applied result from OPEN alone. Restore only semantic rework after a known failed/not-applied integration; preserve unresolved effects and completed merge outcomes. Keep this logic in one focused owner and expose the smallest command option needed."
                optional: false
                priority: 1
                required_inputs:
                  - "Durable integration intent identity and compatibility regressions"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "."
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "docs/user/cli-reference.generated.mdx"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/commands/task/advance.spec.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                  - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                  - "docs/user/cli-reference.generated.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                      id: "focused-recovery"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-regression"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "An interrupted integration intent is reconciled under exclusive supervisor ownership and the existing queue mutex, using exact operation/journal identity and fresh provider/queue observations. Legacy intents without their original snapshot require an explicit operator verdict bound to the exact operation, current route, and content-digested evidence. No agent-generated verdict or OPEN-PR-only inference is accepted. Reconciliation never invokes merge/enqueue or repeats the interrupted operation."
                      id: "explicit-reconciliation"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                      id: "negative-and-replay"
                      required: true
                  evidence_fingerprint: "sha256:0e703b28265017eba417b394a160c2c4bb21b75b002dbfb83b97399899b637c2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                    id: "negative-and-replay"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery"
                      - "full-regression"
                    description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                    id: "native-handoff"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources: []
                  required_sources:
                    - "AGENTS.md"
                    - ".agentplane/tasks/202609060720-NZXQ0E/README.md"
                  symbol_hints:
                    - "startSupervisorExecutionEpisode"
                    - "recoverPendingExternalAgentResult"
                    - "withIntegrationQueueMutex"
                depends_on:
                  - "bound-workflow-reconciliation"
                expected_outputs:
                  - "Native recovery qualification and PH5N6S handoff"
                id: "qualify-recovery-handoff"
                objective: "Exercise the native command in real-Git fixtures with replay, interruption and negative controls. Document the operator evidence boundary and recovery command. Run the declared focused suite and full regression through the supervisor. Deliver a concrete PH5N6S operator handoff bound to its historical intent; do not mutate PH5N6S from this episode or claim its recovery without observed native evidence."
                optional: false
                priority: 1
                required_inputs:
                  - "Qualified exact-intent workflow reconciliation"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "."
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  - "docs/user/task-lifecycle.mdx"
                  - "docs/user/cli-reference.generated.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
                      id: "focused-recovery"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-regression"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Cover missing/foreign/stale/contradictory evidence, live supervisor and queue owners, changed task/PR/branch/head/base/provider, interruption before and after CAS, and repeated reconciliation. Verify one distinct rework successor and preserved completed effects. Correct the missing provider component in the existing fingerprint fixture."
                      id: "negative-and-replay"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery"
                        - "full-regression"
                      description: "Document and exercise the exact supported native recovery route on a real-Git fixture. Preserve the historical PH5N6S intent until the required operator decision and fresh evidence are available. Then the operator can recover PH5N6S through the same command; no hand-edited journal, substituted snapshot, duplicate task, or production task mutation is permitted in the semantic episode."
                      id: "native-handoff"
                      required: true
                  evidence_fingerprint: "sha256:0e703b28265017eba417b394a160c2c4bb21b75b002dbfb83b97399899b637c2"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
    revision: 18
    schema_version: 1
    updated_at: "2026-09-06T13:02:38.234Z"
    work_items:
      bound-workflow-reconciliation:
        attempt: 0
        claim_id: null
        id: "bound-workflow-reconciliation"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      durable-cli-identity:
        attempt: 1
        claim_id: null
        id: "durable-cli-identity"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:4703dd110d3144112ad90a28d840da68b3a05265bccf9347a3bb13d3dff402b6"
            id: "Durable integration intent identity and compatibility regressions"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609060720-NZXQ0E"
              work_item_id: "durable-cli-identity"
            provenance:
              - "sha256:eabd2fbcd4244b75282b944bf6fc55a6dc56277b4d0773233db2c70cbeb092a4"
              - ".agentplane/tasks/202609060720-NZXQ0E/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:c529314c6e4f4539c445a3c4607b0679c5fc0ffc4b46089431107ccce8a946f8"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609060720-NZXQ0E/supervision/declared-checks.json"
              check_id: "focused-recovery"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-06T12:42:15.227Z"
              repository_snapshot_digest: "sha256:c529314c6e4f4539c445a3c4607b0679c5fc0ffc4b46089431107ccce8a946f8"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609060720-NZXQ0E/supervision/declared-checks.json"
              check_id: "full-regression"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-06T12:42:15.227Z"
              repository_snapshot_digest: "sha256:c529314c6e4f4539c445a3c4607b0679c5fc0ffc4b46089431107ccce8a946f8"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      qualify-recovery-handoff:
        attempt: 0
        claim_id: null
        id: "qualify-recovery-handoff"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-06T12:00:35.541Z"
        from: "BLOCKED"
        to: "PLANNING"
        actor_id: "REVIEWER"
        cause_refs:
          - "plan:sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
          - "note:sha256:19e60348ce7d95d7675489321799800d6399792410c478d69a5003fd60a27f1a"
        entity: "task"
        id: "event_167692b09180566e917938d6"
        mutation_id: "plan-reject-3e4d62c12b55c06d4c3c521be8e38e98"
        plan_digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
        task_revision: 6
        work_item_id: null
      -
        at: "2026-09-06T12:42:15.237Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_e099aaebc1e84db584ff0aa2"
        mutation_id: "external-result:work-order-202609060720-NZXQ0E-executor-e132840456f5b8b73c0e948c"
        plan_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
        task_revision: 11
        work_item_id: "durable-cli-identity"
      -
        at: "2026-09-06T12:56:58.900Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
        entity: "task"
        id: "event_b4451d73886333d7ac7bdb45"
        mutation_id: "plan-refinement:work-order-202609060720-NZXQ0E-executor-3e81c34692ffec6cca318d2e"
        plan_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
        task_revision: 12
        work_item_id: null
      -
        at: "2026-09-06T13:01:46.104Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
        entity: "task"
        id: "event_42ccc1decfaca0487d99c4e0"
        mutation_id: "plan-refinement:work-order-202609060720-NZXQ0E-executor-bc5eb8d9f97d518d56a644b3"
        plan_digest: "sha256:57b2ed15318a0ab325b8bf906a672274ae3c431cf9cea07e9b540c1642bdc50d"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
        task_revision: 15
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:04e233ccf4f75eeae00e344792ced3e384f15c8c88b9f22f9e55e32de7db7601:
        aggregate_digest: "sha256:7c33b519440c17e0de7ca5dacb37849bf47922a9d0c34d2e974614b7e5702936"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T13:02:38.234Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9a14c5571fb0dba6204a37f6"
          mutation_id: "compatibility:sha256:04e233ccf4f75eeae00e344792ced3e384f15c8c88b9f22f9e55e32de7db7601"
          plan_digest: "sha256:a39a5181a7994dc4e79d77789618042a8add57df6cdf0ab8be561ebef5be124a"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:04e233ccf4f75eeae00e344792ced3e384f15c8c88b9f22f9e55e32de7db7601"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
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
      compatibility:sha256:214157e4bdc3b3aa4854555bc39a39da6c23557bccbf91b83c38528e5bbe25c3:
        aggregate_digest: "sha256:bba94d5c007baebf4d64f6c21e3d5c2ab8bbfa87ea1b96be1b379f63be0e8df1"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T12:06:21.774Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_69eb6225eace074a513ebe60"
          mutation_id: "compatibility:sha256:214157e4bdc3b3aa4854555bc39a39da6c23557bccbf91b83c38528e5bbe25c3"
          plan_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:214157e4bdc3b3aa4854555bc39a39da6c23557bccbf91b83c38528e5bbe25c3"
        next_revision: 9
        previous_revision: 8
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
      compatibility:sha256:4c21ebbc923b1cc3c448b84f33cdcbbe0ace505bbbd01eeb940d98973ecc754c:
        aggregate_digest: "sha256:8f104f9de261771779c3a6ee1b2fbd5ab34d0ee30d90ab2b3a89a309e8b210e9"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T12:58:13.299Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_3301753976987959d3e6bb24"
          mutation_id: "compatibility:sha256:4c21ebbc923b1cc3c448b84f33cdcbbe0ace505bbbd01eeb940d98973ecc754c"
          plan_digest: "sha256:57b2ed15318a0ab325b8bf906a672274ae3c431cf9cea07e9b540c1642bdc50d"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4c21ebbc923b1cc3c448b84f33cdcbbe0ace505bbbd01eeb940d98973ecc754c"
        next_revision: 15
        previous_revision: 14
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
      compatibility:sha256:956e889b35c48aa6181efbcb1f10f354adc5a32f2908bdecbafa5921bb2a2003:
        aggregate_digest: "sha256:036744131f0ee49fe7433d231b7715f2790194de5a8740d7f91dbc001e5adb58"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T12:33:57.869Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fa7677c71a998d11d50f4d5c"
          mutation_id: "compatibility:sha256:956e889b35c48aa6181efbcb1f10f354adc5a32f2908bdecbafa5921bb2a2003"
          plan_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:956e889b35c48aa6181efbcb1f10f354adc5a32f2908bdecbafa5921bb2a2003"
        next_revision: 11
        previous_revision: 10
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
      compatibility:sha256:d86ba4c0775e62850119b1b34800913c59db62b52e95a1ad2c77a539e0368da2:
        aggregate_digest: "sha256:d5308ee56bb381660f39f26b611e717c9e424f0377249cf62fc66f81036df69c"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T12:33:57.869Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4ff3fcefafbe3d3473c41967"
          mutation_id: "compatibility:sha256:d86ba4c0775e62850119b1b34800913c59db62b52e95a1ad2c77a539e0368da2"
          plan_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d86ba4c0775e62850119b1b34800913c59db62b52e95a1ad2c77a539e0368da2"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      external-result:work-order-202609060720-NZXQ0E-executor-e132840456f5b8b73c0e948c:
        aggregate_digest: "sha256:4a9c33f6e100f8989095f05b2524167a186a99ba9965fc9f3b604d705974f5eb"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T12:42:15.237Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_e099aaebc1e84db584ff0aa2"
          mutation_id: "external-result:work-order-202609060720-NZXQ0E-executor-e132840456f5b8b73c0e948c"
          plan_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 11
          to: "COMPLETED"
          work_item_id: "durable-cli-identity"
        mutation_id: "external-result:work-order-202609060720-NZXQ0E-executor-e132840456f5b8b73c0e948c"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      plan-refinement:work-order-202609060720-NZXQ0E-executor-3e81c34692ffec6cca318d2e:
        aggregate_digest: "sha256:d5b9f59afb8579cb667dabb90577d6595a75dceddceee4502dde01b31d2628e7"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T12:56:58.900Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_b4451d73886333d7ac7bdb45"
          mutation_id: "plan-refinement:work-order-202609060720-NZXQ0E-executor-3e81c34692ffec6cca318d2e"
          plan_digest: "sha256:0f321d51ebb1e89948699633d82ae29c37635e3b55483b37a0e47e11a5109f52"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 12
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609060720-NZXQ0E-executor-3e81c34692ffec6cca318d2e"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      plan-refinement:work-order-202609060720-NZXQ0E-executor-bc5eb8d9f97d518d56a644b3:
        aggregate_digest: "sha256:775f77e08d59335947a424fb04898b1251319ea607986251d1e09a96613998a8"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T13:01:46.104Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_42ccc1decfaca0487d99c4e0"
          mutation_id: "plan-refinement:work-order-202609060720-NZXQ0E-executor-bc5eb8d9f97d518d56a644b3"
          plan_digest: "sha256:57b2ed15318a0ab325b8bf906a672274ae3c431cf9cea07e9b540c1642bdc50d"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 15
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609060720-NZXQ0E-executor-bc5eb8d9f97d518d56a644b3"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
      plan-reject-3e4d62c12b55c06d4c3c521be8e38e98:
        aggregate_digest: "sha256:18f4ff372bada7fc5a6f879d7105eb2031a47e2b5dd07e92de81b8ba6ebb63d2"
        event:
          actor_id: "REVIEWER"
          at: "2026-09-06T12:00:35.541Z"
          cause_refs:
            - "plan:sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
            - "note:sha256:19e60348ce7d95d7675489321799800d6399792410c478d69a5003fd60a27f1a"
          entity: "task"
          from: "BLOCKED"
          id: "event_167692b09180566e917938d6"
          mutation_id: "plan-reject-3e4d62c12b55c06d4c3c521be8e38e98"
          plan_digest: "sha256:3e3b3a96eee05a941b8b7618bc922263e7acb23a28aa7f56cea3d699e4eea215"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609060720-NZXQ0E"
          task_revision: 6
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-3e4d62c12b55c06d4c3c521be8e38e98"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609060720-NZXQ0E"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "d72bb02b4803ba011fa5b19606c5e1bef4d72e41"
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

Add one scoped integration-recovery testkit while preserving the existing three WorkItems and deterministic verification contract.

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
