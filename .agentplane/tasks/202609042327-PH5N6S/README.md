---
id: "202609042327-PH5N6S"
title: "Run supervisor verification against the committed implementation without dirtying its checkout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-06T05:40:19.235Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:8965644c6363e924892611165f4efe2349f53aaa81b4b8bc013e4dc3c24571b5"
verification:
  state: "needs_rework"
  updated_at: "2026-09-05T11:33:14.664Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run ci:local:full"
  attempts: 1
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Preserve the completed implementation and cover its foreseeable canonical-owner conflict reconciliation in this same task."
      - "Repair provenance loss in its existing writer without loosening the recovery comparator."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
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
      digest: "sha256:23ca5f97d24dc36b16f797efd3175daae8366bddf7c2fc2cb934a04e487b83eb"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
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
    body: "Implementation committed: fa586d9c7d1e. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-04T23:32:29.002Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-04T23:45:59.407Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: fa586d9c7d1e. CLI accepted one state-bound external-agent semantic result."
    commit: "fa586d9c7d1eddcf5cc76f6ccdf53e9df7679231"
  -
    type: "verify"
    at: "2026-09-05T11:33:14.664Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
doc_version: 3
doc_updated_at: "2026-09-06T03:16:23.556Z"
doc_updated_by: "SUPERVISOR"
description: "User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task."
sections:
  Summary: |-
    Run supervisor verification against the committed implementation without dirtying its checkout

    User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
  Scope: |-
    - In scope: User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
    - Out of scope: unrelated refactors not required for "Run supervisor verification against the committed implementation without dirtying its checkout".
  Plan: "Preserve completed clean-verification unchanged. Then repair execution-provenance loss in verify-record-execute and extend its nearest durability regressions. Keep unchanged-result recovery fail-closed and do not recreate the missing historical exchange. Qualify the genuine new implementation with provenance/recovery focused tests, clean-verification tests and full CI. Use only fresh AgentPlane episodes for subsequent canonical-owner conflict reconciliation, verification, provider integration and cleanup. The declared five writable files are the exact union of WorkItem scopes and write claims. Stop for fresh USER approval before implementation."
  Verify Steps: |-
    1. Run `bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1`. Expected: Verification preserves valid execution provenance only for the same identity; negative, repeated and interrupted persistence remains fail-closed. Recovery must still reject missing original exchange evidence, foreign identity, unproved provenance and stale results.
    2. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1`. Expected: Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed.
    3. Run `bun run ci:local:full`. Expected: Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-05T11:33:14.664Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:ef41bb4e31a06a613538172af56d1b0c135fceb995829b3e42a9648c4e7a020a

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609042327-PH5N6S/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609042327-PH5N6S declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609042327-PH5N6S-run-supervisor-verification-against-the-committe/.agentplane/tasks/202609042327-PH5N6S/blueprint/resolved-snapshot.json
    - old_digest: ca81d53b3644f4df6815de07a1ecfb299ffb8bf18ab9e3f1bc6efc4dc222fbb5
    - current_digest: ca81d53b3644f4df6815de07a1ecfb299ffb8bf18ab9e3f1bc6efc4dc222fbb5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609042327-PH5N6S

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
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:8965644c6363e924892611165f4efe2349f53aaa81b4b8bc013e4dc3c24571b5"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:c18c762f53901344a803d00ad3bbcc6b3bf93340fd7d84d5ef42d25cc3864132"
    grant_id: "e6f7785c-c16f-40b1-90f8-e123f9b2ec1b"
    issued_at: "2026-09-06T05:40:19.235Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:4d2ffc15f2e7f12723f749c88f7f26a668389561e8355486209f1cb7528ab085"
    plan_revision: 13
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609042327-PH5N6S"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-06T05:40:19.235Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:2167b01a99a96a823870014ab2823b2e4cc11e0ad37f61b25410ab898cef317e"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-06T03:15:46.175Z"
      digest: "sha256:2167b01a99a96a823870014ab2823b2e4cc11e0ad37f61b25410ab898cef317e"
      proposal:
        assumptions:
          - "Preserve the completed clean-verification WorkItem definition, completion receipts and outputs. Do not rerun completed effects. The new WorkItem owns a confirmed additional verification-writer defect and is not an artificial implementation delta."
          - "The original external exchange is unavailable. This plan does not authorize reconstruction, adoption without proof, metadata repair, receipt fabrication, or weakening unchanged-result admission. Historical evidence remains historical; a new semantic episode and fresh checks qualify the actual new implementation."
          - "Keep recovery's existing rejection of lost explicit provenance. Fix the writer that drops provenance. Retain valid provenance only while the original execution identity is unchanged; do not copy it to a new base or repository identity."
          - "PR #5897 is merged into main 1e3c0b4b3d1457d18224dd94bac19d91bafa90bd. PH5N6S head remains 4b86e4b5028111db3e0da84a5b4bee94afdbf8cc with implementation fa586d9c7d1eddcf5cc76f6ccdf53e9df7679231. AgentPlane must refresh these identities before integration."
          - "The finalization module exists on current main but not the task branch. Do not create a duplicate before the normal conflict-rework route brings that owner into the task worktree. Preserve the functional ordering when reconciling the real conflict."
          - "Formal commits, working-branch publication, PR synchronization, integration, close and task-owned cleanup remain AgentPlane-owned and require fresh route authority. This plan does not authorize these actions inside a semantic episode."
          - "Exclude Factory repository changes, MPXQBK, release preparation, versions, release notes, tags, package publication, mass branch cleanup, history rewriting, approval/security-model changes, new state stores and unrelated lifecycle work."
          - "Stop at fresh USER plan approval before implementation. Plan approval does not establish missing historical provenance or replace a future state-bound external authority decision."
        planning_baseline:
          captured_at: "2026-09-06T03:11:40.913Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c9733838134069e20ac04c18f76b893a5f71526875aeeec643dc09b1fb30c066"
          dirty_paths:
            - ".agentplane/tasks/202609042327-PH5N6S/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "4b86e4b5028111db3e0da84a5b4bee94afdbf8cc"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:11"
        schema_version: 1
        task_id: "202609042327-PH5N6S"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1"
              id: "provenance"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
              id: "regression"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "provenance"
                - "regression"
                - "full"
              description: "Verification preserves valid explicit execution provenance for unchanged execution identity. It must not transfer provenance to a changed identity. Positive, negative, repeated and interrupted verification remain atomic and fail-closed. Recovery still rejects missing original exchange evidence, foreign identity, unproved provenance and stale results."
              id: "provenance-durability"
              required: true
            -
              check_ids:
                - "regression"
                - "full"
              description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
              id: "clean-verification"
              required: true
          evidence_fingerprint: "sha256:c9733838134069e20ac04c18f76b893a5f71526875aeeec643dc09b1fb30c066"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "regression"
                    - "full"
                  description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                  id: "clean-verification"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-artifact-commit.ts"
                symbol_hints:
                  - "recordDirectTaskVerification"
                  - "commitBranchSupervisorTaskArtifacts"
              depends_on: []
              expected_outputs:
                - "Canonical artifact commit before branch verification"
                - "Real Git regression covering clean checks and preservation"
              id: "clean-verification"
              objective: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
                    id: "regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "regression"
                      - "full"
                    description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                    id: "clean-verification"
                    required: true
                evidence_fingerprint: "sha256:e62d0428f02d16a1c6111c30379045666e1071329c00279ae803c8270c327e40"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "provenance"
                    - "regression"
                    - "full"
                  description: "Verification preserves valid explicit execution provenance for unchanged execution identity. It must not transfer provenance to a changed identity. Positive, negative, repeated and interrupted verification remain atomic and fail-closed. Recovery still rejects missing original exchange evidence, foreign identity, unproved provenance and stale results."
                  id: "provenance-durability"
                  required: true
                -
                  check_ids:
                    - "regression"
                    - "full"
                  description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                  id: "clean-verification"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 150000
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/index.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                  - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-artifact-commit.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
                symbol_hints:
                  - "task_execution_context"
                  - "taskExecutionBaseFromExtensions"
                  - "recordDirectTaskVerification"
                  - "commitBranchSupervisorTaskArtifacts"
                  - "finishExternalImplementationVerification"
              depends_on:
                - "clean-verification"
              expected_outputs:
                - "Verification preserves execution provenance with exact identity and durable replay-safe evidence"
                - "Clean verification ordering reconciled with canonical main owners and freshly qualified through AgentPlane"
              id: "verification-provenance-convergence"
              objective: "Fix the confirmed provenance loss in the existing verification persistence owner. Preserve the completed clean-verification implementation and its historical evidence. Qualify both changes through a fresh genuine implementation episode and fresh verification. When AgentPlane supplies conflict rework against current main, retain artifact commit ordering in the canonical implementation and finalization owners without recreating the old parallel implementation."
              optional: false
              priority: 2
              required_inputs:
                - "Canonical artifact commit before branch verification"
                - "Real Git regression covering clean checks and preservation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/verify-record-execute.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
                - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1"
                    id: "provenance"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
                    id: "regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "provenance"
                      - "regression"
                      - "full"
                    description: "Verification preserves valid explicit execution provenance for unchanged execution identity. It must not transfer provenance to a changed identity. Positive, negative, repeated and interrupted verification remain atomic and fail-closed. Recovery still rejects missing original exchange evidence, foreign identity, unproved provenance and stale results."
                    id: "provenance-durability"
                    required: true
                  -
                    check_ids:
                      - "regression"
                      - "full"
                    description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                    id: "clean-verification"
                    required: true
                evidence_fingerprint: "sha256:c9733838134069e20ac04c18f76b893a5f71526875aeeec643dc09b1fb30c066"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609042327-PH5N6S"
    event_cursor: 9
    final_validation: null
    id: "202609042327-PH5N6S"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-04T23:27:36.382Z"
      constraints: []
      request: |-
        Run supervisor verification against the committed implementation without dirtying its checkout

        User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
      task_id: "202609042327-PH5N6S"
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
        created_at: "2026-09-04T23:32:16.167Z"
        digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
        proposal:
          assumptions:
            - "User explicitly authorized fixing the AgentPlane blockers."
            - "Preserve Factory tasks and original implementation provenance; changes to task execution context are a later slice."
            - "No overlap with published ZVX69C source diff."
          planning_baseline:
            captured_at: "2026-09-04T23:28:00.511Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:e62d0428f02d16a1c6111c30379045666e1071329c00279ae803c8270c327e40"
            dirty_paths:
              - ".agentplane/tasks/202608210955-9SX2C6/README.md"
              - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
              - ".agentplane/tasks/202608220034-FPEFRK/README.md"
              - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202608241434-129F8R/README.md"
              - ".agentplane/tasks/202608241434-EH8E74/README.md"
              - ".agentplane/tasks/202608241434-KCC9K4/README.md"
              - ".agentplane/tasks/202608241434-QQNDGT/README.md"
              - ".agentplane/tasks/202608241434-SFPD91/README.md"
              - ".agentplane/tasks/202608241434-TA84WK/README.md"
              - ".agentplane/tasks/202608241434-WVYA5T/README.md"
              - ".agentplane/tasks/202608241435-40YZCE/README.md"
              - ".agentplane/tasks/202608241435-73DA89/README.md"
              - ".agentplane/tasks/202608241435-D001ET/README.md"
              - ".agentplane/tasks/202608241435-HTV4K2/README.md"
              - ".agentplane/tasks/202608241435-NDR0BX/README.md"
              - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
              - ".agentplane/tasks/202608241435-W3DG6V/README.md"
              - ".agentplane/tasks/202608241435-YSW0E0/README.md"
              - ".agentplane/tasks/202608241436-2G9DA8/README.md"
              - ".agentplane/tasks/202608241436-63W678/README.md"
              - ".agentplane/tasks/202608241436-8PJKJP/README.md"
              - ".agentplane/tasks/202608241436-99B067/README.md"
              - ".agentplane/tasks/202608241436-A87Y59/README.md"
              - ".agentplane/tasks/202608241436-DHPR5E/README.md"
              - ".agentplane/tasks/202608241436-H60MCY/README.md"
              - ".agentplane/tasks/202608241436-TX6TRF/README.md"
              - ".agentplane/tasks/202608241436-W6A113/README.md"
              - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
              - ".agentplane/tasks/202608241437-H5418M/README.md"
              - ".agentplane/tasks/202608241437-SH3CDX/README.md"
              - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
              - ".agentplane/tasks/202608241437-XY3950/README.md"
              - ".agentplane/tasks/202608250007-P5BWP0/README.md"
              - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202608251038-42AC0D/README.md"
              - ".agentplane/tasks/202608251053-QAZ236/README.md"
              - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
              - ".agentplane/tasks/202608252233-JR4T47/README.md"
              - ".agentplane/tasks/202608252234-4CKSWA/README.md"
              - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
              - ".agentplane/tasks/202608270848-0RAFH9/README.md"
              - ".agentplane/tasks/202608270848-37XB2K/README.md"
              - ".agentplane/tasks/202608270848-N28TBB/README.md"
              - ".agentplane/tasks/202608270848-V32542/README.md"
              - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
              - ".agentplane/tasks/202608291005-33PHG4/README.md"
              - ".agentplane/tasks/202608291006-0AJG13/README.md"
              - ".agentplane/tasks/202608291953-8YA3HG/README.md"
              - ".agentplane/tasks/202608312248-WXP9JS/README.md"
              - ".agentplane/tasks/202609042327-PH5N6S/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
                id: "regression"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "regression"
                  - "full"
                description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                id: "clean-verification"
                required: true
            evidence_fingerprint: "sha256:e62d0428f02d16a1c6111c30379045666e1071329c00279ae803c8270c327e40"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "regression"
                      - "full"
                    description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                    id: "clean-verification"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 100000
                  optional_sources:
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                    - "packages/agentplane/src/commands/task/branch-task-supervisor-artifact-commit.ts"
                  symbol_hints:
                    - "recordDirectTaskVerification"
                    - "commitBranchSupervisorTaskArtifacts"
                depends_on: []
                expected_outputs:
                  - "Canonical artifact commit before branch verification"
                  - "Real Git regression covering clean checks and preservation"
                id: "clean-verification"
                objective: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
                      id: "regression"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                  criteria:
                    -
                      check_ids:
                        - "regression"
                        - "full"
                      description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                      id: "clean-verification"
                      required: true
                  evidence_fingerprint: "sha256:e62d0428f02d16a1c6111c30379045666e1071329c00279ae803c8270c327e40"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609042327-PH5N6S"
    revision: 14
    schema_version: 1
    updated_at: "2026-09-06T03:16:23.556Z"
    work_items:
      clean-verification:
        attempt: 1
        claim_id: null
        id: "clean-verification"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:84fc8390b629432394e916d18984c445c7ea4be1ccf539b22f45b11384c7d324"
            id: "Canonical artifact commit before branch verification"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609042327-PH5N6S"
              work_item_id: "clean-verification"
            provenance:
              - "sha256:da1c6b8b27560827ec626b6870fc2f3d25b21f09b3e05fe198eda8afcec6386d"
              - ".agentplane/tasks/202609042327-PH5N6S/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:3db529611c50b949e6b7dbfe923f4b7828f73b9b4fcbc6bb66c02a5ebd1da201"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:153034ed015f7b7725f2c422df8a9625d2e0b0285cc6b7decc783f5de4bd7cca"
            id: "Real Git regression covering clean checks and preservation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609042327-PH5N6S"
              work_item_id: "clean-verification"
            provenance:
              - "sha256:da1c6b8b27560827ec626b6870fc2f3d25b21f09b3e05fe198eda8afcec6386d"
              - ".agentplane/tasks/202609042327-PH5N6S/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:3db529611c50b949e6b7dbfe923f4b7828f73b9b4fcbc6bb66c02a5ebd1da201"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609042327-PH5N6S/supervision/declared-checks.json"
              check_id: "regression"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-04T23:54:29.089Z"
              repository_snapshot_digest: "sha256:3db529611c50b949e6b7dbfe923f4b7828f73b9b4fcbc6bb66c02a5ebd1da201"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609042327-PH5N6S/supervision/declared-checks.json"
              check_id: "full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-04T23:54:29.089Z"
              repository_snapshot_digest: "sha256:3db529611c50b949e6b7dbfe923f4b7828f73b9b4fcbc6bb66c02a5ebd1da201"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      verification-provenance-convergence:
        attempt: 0
        claim_id: null
        id: "verification-provenance-convergence"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-04T23:54:29.095Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_b5c182732005181c2593db27"
        mutation_id: "external-result:work-order-202609042327-PH5N6S-executor-fe66808c6c5a2aa48a01a50b"
        plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609042327-PH5N6S"
        task_revision: 6
        work_item_id: "clean-verification"
      -
        at: "2026-09-06T02:53:09.060Z"
        from: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
        to: "sha256:323289d67bd12dac27a1c2686ac6572ab5477127caf65a52ce7371fd433c486e"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_308a63fd8c73954fedd1c5f6"
        mutation_id: "plan-refinement:work-order-202609042327-PH5N6S-executor-d44551a1ba144c962452ee7f"
        plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609042327-PH5N6S"
        task_revision: 8
        work_item_id: null
      -
        at: "2026-09-06T03:11:15.797Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "ORCHESTRATOR"
        cause_refs:
          - "plan:sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          - "note:sha256:37f76b09792e7e1ed753ca2475fc13e1e42b4f2845bdbc2938d53980c7b0d556"
        entity: "task"
        id: "event_d9205dc068391ac137599b75"
        mutation_id: "plan-reject-40c4bd0661a6b7b4b7bd5dcd0ea6c35f"
        plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609042327-PH5N6S"
        task_revision: 10
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:61e06192ec32626c09be7fd27d5c68d4a32b746bddeab1697f47bde301b211fc:
        aggregate_digest: "sha256:edcb4639bf3bc6acb38364ab7c515987cdafe2dc588462a6f6c4507f81200cb6"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T03:07:05.683Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_2fce794f308e2283b568462e"
          mutation_id: "compatibility:sha256:61e06192ec32626c09be7fd27d5c68d4a32b746bddeab1697f47bde301b211fc"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:61e06192ec32626c09be7fd27d5c68d4a32b746bddeab1697f47bde301b211fc"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:7583308de102ff45a4db022e1f87ffe80d5e871019adee8c56946587e9bb495a:
        aggregate_digest: "sha256:34b9d990a476b46bbce51a8db43ebf921d96b054278e4684cf461dcb496a1905"
        event:
          actor_id: "agentplane"
          at: "2026-09-05T11:33:16.115Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3560093f47605f715545e74b"
          mutation_id: "compatibility:sha256:7583308de102ff45a4db022e1f87ffe80d5e871019adee8c56946587e9bb495a"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:7583308de102ff45a4db022e1f87ffe80d5e871019adee8c56946587e9bb495a"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:8ad1130d0b535f8df4c83ea690268d2c41d8d2dfa40318ba190e0e59174fc4c2:
        aggregate_digest: "sha256:ae1bfb5b7c4544f3d0cb7f9566b082a38f380afb280c2b2bda740493050845fc"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T03:16:23.556Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_a2bbc04724c041529151fd66"
          mutation_id: "compatibility:sha256:8ad1130d0b535f8df4c83ea690268d2c41d8d2dfa40318ba190e0e59174fc4c2"
          plan_digest: "sha256:2167b01a99a96a823870014ab2823b2e4cc11e0ad37f61b25410ab898cef317e"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8ad1130d0b535f8df4c83ea690268d2c41d8d2dfa40318ba190e0e59174fc4c2"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:ae11ecc1011c65952a96021b25dceacd303ed5b4aa3212037e767e9e7c36d9e8:
        aggregate_digest: "sha256:982bc07a94685806f88357377a0b797ebd9cda355c8d6437eb9906aabdf97f2a"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T03:16:23.553Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_14be943ceb9f3a2dfcba0a83"
          mutation_id: "compatibility:sha256:ae11ecc1011c65952a96021b25dceacd303ed5b4aa3212037e767e9e7c36d9e8"
          plan_digest: "sha256:2167b01a99a96a823870014ab2823b2e4cc11e0ad37f61b25410ab898cef317e"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 12
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:ae11ecc1011c65952a96021b25dceacd303ed5b4aa3212037e767e9e7c36d9e8"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:c04e97e16b156c55ca81f0e6a8f9423c3909aeaa8a8611b64b787949909472bc:
        aggregate_digest: "sha256:fb3864919f82e9ecbdd961323a65b122a3de3545d9a1b9cdae71f3cc5c34f155"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:45:59.407Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_013f90b0046fc81a38e4d93f"
          mutation_id: "compatibility:sha256:c04e97e16b156c55ca81f0e6a8f9423c3909aeaa8a8611b64b787949909472bc"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c04e97e16b156c55ca81f0e6a8f9423c3909aeaa8a8611b64b787949909472bc"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:d05987cb8ccf82b6dba8397b5fd6bf51aac292b9a9189fdf8f06823ad01052e7:
        aggregate_digest: "sha256:9413d9f90b079b51c72642047b923f508403a6162778a96c2f0907904d57931c"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:45:59.407Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_76aa596193036ea262c17996"
          mutation_id: "compatibility:sha256:d05987cb8ccf82b6dba8397b5fd6bf51aac292b9a9189fdf8f06823ad01052e7"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d05987cb8ccf82b6dba8397b5fd6bf51aac292b9a9189fdf8f06823ad01052e7"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:e7a767ac3abef08a06ab5887d7e2329873b60b576105d114e640a0de204eae1c:
        aggregate_digest: "sha256:f59c6d41dffe63624a6ba07959f0a93d5a3c2d3dd7fa5e4484b562a0f16c2307"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:32:29.002Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_72104f9770548ca288c05d3a"
          mutation_id: "compatibility:sha256:e7a767ac3abef08a06ab5887d7e2329873b60b576105d114e640a0de204eae1c"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e7a767ac3abef08a06ab5887d7e2329873b60b576105d114e640a0de204eae1c"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      external-result:work-order-202609042327-PH5N6S-executor-fe66808c6c5a2aa48a01a50b:
        aggregate_digest: "sha256:0823aeab510c2ebf4b28ed83a1890a9ca1ffaa810f1d750e0b0303eb862e6995"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:54:29.095Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_b5c182732005181c2593db27"
          mutation_id: "external-result:work-order-202609042327-PH5N6S-executor-fe66808c6c5a2aa48a01a50b"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 6
          to: "COMPLETED"
          work_item_id: "clean-verification"
        mutation_id: "external-result:work-order-202609042327-PH5N6S-executor-fe66808c6c5a2aa48a01a50b"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      plan-refinement:work-order-202609042327-PH5N6S-executor-d44551a1ba144c962452ee7f:
        aggregate_digest: "sha256:0dc20e914f1f61f9a78381ef17bb01b8989af149e8aa41929aa6efa0391fe66e"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T02:53:09.060Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          id: "event_308a63fd8c73954fedd1c5f6"
          mutation_id: "plan-refinement:work-order-202609042327-PH5N6S-executor-d44551a1ba144c962452ee7f"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 8
          to: "sha256:323289d67bd12dac27a1c2686ac6572ab5477127caf65a52ce7371fd433c486e"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609042327-PH5N6S-executor-d44551a1ba144c962452ee7f"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      plan-reject-40c4bd0661a6b7b4b7bd5dcd0ea6c35f:
        aggregate_digest: "sha256:7438f04fde54c39843b16b7c8cbe9e26054a874c4959a70d8bca1e971359eeac"
        event:
          actor_id: "ORCHESTRATOR"
          at: "2026-09-06T03:11:15.797Z"
          cause_refs:
            - "plan:sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
            - "note:sha256:37f76b09792e7e1ed753ca2475fc13e1e42b4f2845bdbc2938d53980c7b0d556"
          entity: "task"
          from: "ACTIVE"
          id: "event_d9205dc068391ac137599b75"
          mutation_id: "plan-reject-40c4bd0661a6b7b4b7bd5dcd0ea6c35f"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 10
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-40c4bd0661a6b7b4b7bd5dcd0ea6c35f"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609042327-PH5N6S"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    version: 1
id_source: "generated"
---
## Summary

Run supervisor verification against the committed implementation without dirtying its checkout

User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.

## Scope

- In scope: User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
- Out of scope: unrelated refactors not required for "Run supervisor verification against the committed implementation without dirtying its checkout".

## Plan

Preserve completed clean-verification unchanged. Then repair execution-provenance loss in verify-record-execute and extend its nearest durability regressions. Keep unchanged-result recovery fail-closed and do not recreate the missing historical exchange. Qualify the genuine new implementation with provenance/recovery focused tests, clean-verification tests and full CI. Use only fresh AgentPlane episodes for subsequent canonical-owner conflict reconciliation, verification, provider integration and cleanup. The declared five writable files are the exact union of WorkItem scopes and write claims. Stop for fresh USER approval before implementation.

## Verify Steps

1. Run `bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1`. Expected: Verification preserves valid execution provenance only for the same identity; negative, repeated and interrupted persistence remains fail-closed. Recovery must still reject missing original exchange evidence, foreign identity, unproved provenance and stale results.
2. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1`. Expected: Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed.
3. Run `bun run ci:local:full`. Expected: Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-05T11:33:14.664Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6, input_digest=sha256:ef41bb4e31a06a613538172af56d1b0c135fceb995829b3e42a9648c4e7a020a

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609042327-PH5N6S/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609042327-PH5N6S declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609042327-PH5N6S-run-supervisor-verification-against-the-committe/.agentplane/tasks/202609042327-PH5N6S/blueprint/resolved-snapshot.json
- old_digest: ca81d53b3644f4df6815de07a1ecfb299ffb8bf18ab9e3f1bc6efc4dc222fbb5
- current_digest: ca81d53b3644f4df6815de07a1ecfb299ffb8bf18ab9e3f1bc6efc4dc222fbb5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609042327-PH5N6S

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
