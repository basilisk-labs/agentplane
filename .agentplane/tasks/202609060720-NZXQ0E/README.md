---
id: "202609060720-NZXQ0E"
title: "Recover an interrupted integration queue supervisor intent before semantic rework"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
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
  updated_at: "2026-09-06T12:26:03.967Z"
  updated_by: "USER"
  note: "User explicitly approved all required permissions and overrode AGENTS.md permission gates for correct 0.7.8 release finalization. This records approval of the prepared recovery plan, not a factual verdict on the historical integration effect."
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
      digest: "sha256:bd1cfa9c4609f3b0b9f1494160a3a0d334e99070421509ec13bf895c66304049"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
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
doc_updated_at: "2026-09-06T12:06:21.774Z"
doc_updated_by: "SUPERVISOR"
description: "Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery."
sections:
  Summary: |-
    Recover an interrupted integration queue supervisor intent before semantic rework

    Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
  Scope: |-
    - In scope: Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
    - Out of scope: unrelated refactors not required for "Recover an interrupted integration queue supervisor intent before semantic rework".
  Plan: "Replace the blocked automatic-recovery plan with three sequential WorkItems: persist original operation evidence, implement explicit evidence-bound legacy reconciliation, and qualify/document native recovery. Keep the original historical intent unresolved until its operator evidence boundary is satisfied."
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
    digest: "sha256:eeef4a2295de3452916ea70171ca1ac28a161da444bd2a6fcc82e2771bf0f8b1"
    grant_id: "06e522c1-7997-4b83-9a1b-8cd38e9bbb45"
    issued_at: "2026-09-06T12:26:03.967Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:f502b44e7bcec9f8e63c9b30945bf3ae7320490b5ebf2532c71e06bc4468a7ef"
    plan_revision: 8
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:5bffa75f1c5c9cc45183dca07ec41d5ddca75cf9b43a03f1ba6370d6dacd6920"
    status: "active"
    task_id: "202609060720-NZXQ0E"
  agentplane.task_centric:
    current_plan:
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
    event_cursor: 6
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
    revision: 9
    schema_version: 1
    updated_at: "2026-09-06T12:06:21.774Z"
    work_items:
      bound-workflow-reconciliation:
        attempt: 0
        claim_id: null
        id: "bound-workflow-reconciliation"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      durable-cli-identity:
        attempt: 0
        claim_id: null
        id: "durable-cli-identity"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
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

Replace the blocked automatic-recovery plan with three sequential WorkItems: persist original operation evidence, implement explicit evidence-bound legacy reconciliation, and qualify/document native recovery. Keep the original historical intent unresolved until its operator evidence boundary is satisfied.

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
