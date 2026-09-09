---
id: "202609090930-N0ZTF5"
title: "Recover committed implementation after an approved verification-only plan refinement without fabricated source changes"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-09T13:32:48.872Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:088a64d9032d7fdb2a327504750018cff8c0ab5f4c6bfbbfb99db059fa660259"
verification:
  state: "ok"
  updated_at: "2026-09-09T13:33:35.796Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-09T13:38:29.280Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "12014e6d6ba4bcaf0986467b4e95867f63c97bdf"
  blueprint_digest: "3d10862ad8ccb9c0ac1033f5e6524898d97ba26c45242bfc534f3e56b152945d"
  evidence_refs:
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/20260909-133350507-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/20260909-133350507-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/objects/sha256/dc9386e4a8142f18663ae95a85a07323f345dc25a94fc48054c3241e19d0cb86.md"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/20260909-133350507-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/20260909-133350507-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/20260909-133350507-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/20260909-133350507-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202609090930-N0ZTF5/README.md"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/objects/sha256/e35f461db092ed47a54e5b3d30eb3949214f4d5a1e12a2f25780ffaddf612b88.patch"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/objects/sha256/65f31675cab6546fedc6c5c6a766f4e2895c8f8b3e9c5e5060d24ab561944591.json"
    - ".agentplane/tasks/202609090930-N0ZTF5/verification/20260909133335796-c1f0e970fd29b183.json"
    - ".agentplane/tasks/202609090930-N0ZTF5/quality/objects/sha256/981e81e3f33478c391d5670d9964afbdbc22c4817eefc654cd1da4142c8a3d8f.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen actual diff still adds approvedRecoveryPlan, implementationPlanDigest and approvedValidationRefinement to external-agent-implementation-recovery.ts; evidence-only-rework-commit.ts is unchanged. This does not implement the current approved Plan requiring extraction into the existing helper module while retaining all gates."
    - "The frozen verification record only runs the two focused regression files. It does not establish the mandatory bun run typecheck and bun run ci:local:full acceptance criteria. A narrow regression pass cannot establish task_outcome for the unfinished extraction."
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
      - "packages/agentplane/src/commands/task/evidence-only-rework-commit.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Only local extraction into the existing canonical recovery helper and associated regression validation; no new module, behavior or external effect."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/evidence-only-rework-commit.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
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
          - "packages/agentplane/src/commands/task/evidence-only-rework-commit.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
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
      digest: "sha256:ef6c3f09dcb97f4755dff6b2058f28eb7a90eb38544a2eb227ed42d5054d72dc"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
commit:
  hash: "12014e6d6ba4bcaf0986467b4e95867f63c97bdf"
  message: "🚧 N0ZTF5 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 12014e6d6ba4. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-09T11:39:32.775Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-09T12:00:59.198Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 12014e6d6ba4. CLI accepted one state-bound external-agent semantic result."
    commit: "12014e6d6ba4bcaf0986467b4e95867f63c97bdf"
  -
    type: "verify"
    at: "2026-09-09T13:33:35.796Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-09-09T13:33:38.623Z"
doc_updated_by: "SUPERVISOR"
description: "Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task."
sections:
  Summary: |-
    Recover committed implementation after an approved verification-only plan refinement without fabricated source changes

    Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task.
  Scope: |-
    - In scope: Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task.
    - Out of scope: unrelated refactors not required for "Recover committed implementation after an approved verification-only plan refinement without fabricated source changes".
  Plan: "Finish the existing recovery draft by extracting only its approved-refinement comparison into the existing evidence-only-rework-commit.ts helper module. Replace the unused authority.ts scope path; keep three total existing files, the same behavior and all verification gates."
  Verify Steps: |-
    1. Reproduce approved verification-only refinement recovery using an existing recorded implementation fixture. Reject source drift, scope expansion, absent approval and invalid implementation receipts.
    2. Run bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts. Expected: positive and negative recovery regressions pass.
    3. Run bun run typecheck and bun run ci:local:full before declaring the patch verified. Expected: both pass. Hosted integration remains required before merge.
    4. Audit the final diff against the three approved source/test paths. No installed CLI, Arkady Factory, runtime, credentials or unrelated task artifacts may change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-09T13:33:35.796Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:39fcd18f211a6c367e2bf885475606fb53516fe2ad84783f33a097d6e444102f, input_digest=sha256:c37c45c95398542785d1aac79c9eae74abe4c42049cbc6cb358a46f1ec0c2475

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609090930-N0ZTF5/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609090930-N0ZTF5 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609090930-N0ZTF5/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609090930-N0ZTF5 Verification Contract check critical_paths

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609090930-N0ZTF5/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609090930-N0ZTF5 Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane-cli-main/.agentplane/worktrees/202609090930-N0ZTF5-recover-committed-implementation-after-an-approv/.agentplane/tasks/202609090930-N0ZTF5/blueprint/resolved-snapshot.json
    - old_digest: 3d10862ad8ccb9c0ac1033f5e6524898d97ba26c45242bfc534f3e56b152945d
    - current_digest: 3d10862ad8ccb9c0ac1033f5e6524898d97ba26c45242bfc534f3e56b152945d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609090930-N0ZTF5

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609090930-N0ZTF5
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
    approval_evidence_digest: "sha256:088a64d9032d7fdb2a327504750018cff8c0ab5f4c6bfbbfb99db059fa660259"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:d0b9c337f117526d869e2e7295fb419860ef92f1a83cbaf6f2bdb46137543e8f"
    grant_id: "24a789b8-2f48-4501-9e40-3786d143537a"
    issued_at: "2026-09-09T13:32:48.872Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ef55171a4a280c0ec33bd0099a5afc16f5d767e9386eb1c92cb68ce3f1681537"
    plan_revision: 9
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609090930-N0ZTF5"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-09T13:32:48.872Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:bab169b5c5a41f611e0ed7d0412606ef9901408fd06f45c82f97f6cbd66b5249"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-09T12:03:16.389Z"
      digest: "sha256:bab169b5c5a41f611e0ed7d0412606ef9901408fd06f45c82f97f6cbd66b5249"
      proposal:
        assumptions:
          - "Only the unused authority.ts writable path is replaced with evidence-only-rework-commit.ts; total three existing files. Existing draft and unrelated task data are preserved."
          - "Extract only the new comparison/projection helpers. Recovery uses the exact prior implementation receipt and current approved validation; do not reuse prior semantic success or weaken source, approval or grant checks."
          - "Run the same focused regression suite, typecheck and full local CI to completion on the final code. The full CI module-size limit remains mandatory. Hosted integration is still required before merge."
          - "No global CLI installation, publication or Arkady runtime mutation. The task remains based on the recorded execution base; do not silently change its base."
        planning_baseline:
          captured_at: "2026-09-09T12:01:10.415Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:2ba7e7f899726c625e08b484de937b1a806a1e602f01698b0cf0e3df82ba7387"
          dirty_paths: []
          git:
            kind: "commit"
            ref: null
            sha: "f89350f850b92060d39cfc4eeef73eb0a94b0373"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:8"
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
              id: "recovery-regressions"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
          criteria:
            -
              check_ids:
                - "recovery-regressions"
              description: "Reproduce approved validation-only refinement recovery on a recorded implementation. Accept only unchanged implementation scope and authenticated prior implementation evidence with fresh current-plan validation. Reject source drift, expanded implementation intent, absent approval and invalid receipts. No installed CLI changes or live deployment."
              id: "safe-recovery"
              required: true
          evidence_fingerprint: "sha256:2ba7e7f899726c625e08b484de937b1a806a1e602f01698b0cf0e3df82ba7387"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "recovery-regressions"
                  description: "Reproduce approved validation-only refinement recovery on a recorded implementation. Accept only unchanged implementation scope and authenticated prior implementation evidence with fresh current-plan validation. Reject source drift, expanded implementation intent, absent approval and invalid receipts. No installed CLI changes or live deployment."
                  id: "safe-recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                  - "packages/agentplane/src/commands/task/evidence-only-rework-commit.ts"
                symbol_hints:
                  - "resolveRecordedImplementationRecovery"
              depends_on: []
              expected_outputs:
                - "recovery-regression"
                - "bounded-recovery-fix"
                - "check-evidence"
              id: "refinement-recovery"
              objective: "Finish the existing recovery draft by extracting only its approved-refinement comparison into the existing evidence-only-rework-commit.ts helper module. Replace the unused authority.ts scope path; keep three total existing files, the same behavior and all verification gates."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/evidence-only-rework-commit.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                - "packages/agentplane/src/commands/task/evidence-only-rework-commit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                    id: "recovery-regressions"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "recovery-regressions"
                    description: "Reproduce approved validation-only refinement recovery on a recorded implementation. Accept only unchanged implementation scope and authenticated prior implementation evidence with fresh current-plan validation. Reject source drift, expanded implementation intent, absent approval and invalid receipts. No installed CLI changes or live deployment."
                    id: "safe-recovery"
                    required: true
                evidence_fingerprint: "sha256:2ba7e7f899726c625e08b484de937b1a806a1e602f01698b0cf0e3df82ba7387"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609090930-N0ZTF5"
    event_cursor: 8
    final_validation: null
    id: "202609090930-N0ZTF5"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-09T09:30:02.405Z"
      constraints: []
      request: |-
        Recover committed implementation after an approved verification-only plan refinement without fabricated source changes

        Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task.
      task_id: "202609090930-N0ZTF5"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-09T11:37:17.293Z"
          approved_by: "HOST:local:USER"
          approved_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-09T09:31:16.592Z"
        digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
        proposal:
          assumptions:
            - "User approved diagnosing and fixing the AgentPlane blocker. This proposal does not authorize installation or publication."
            - "Run focused regression tests, typecheck and full local CI before declaring the patch verified; retain hosted integration gate before merge. No checks are waived."
            - "First reproduce with existing fixtures; do not weaken plan/evidence validation generally or fabricate changes in Arkady Factory."
          planning_baseline:
            captured_at: "2026-09-09T09:30:06.554Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:6d8f9c29658f975dba696ebc6111df7b46d2e87ec1b33c970d34608f21fe96c1"
            dirty_paths:
              - ".agentplane/tasks/202609062320-7VFWQS/README.md"
              - ".agentplane/tasks/202609062324-6K4B1S/README.md"
              - ".agentplane/tasks/202609090930-N0ZTF5/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "3b3ddab7b2e642329356e873a44d245796f23a67"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                id: "recovery-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "recovery-regressions"
                description: "Reproduce approved validation-only refinement recovery on a recorded implementation. Accept only unchanged implementation scope and authenticated prior implementation evidence with fresh current-plan validation. Reject source drift, expanded implementation intent, absent approval and invalid receipts. No installed CLI changes or live deployment."
                id: "safe-recovery"
                required: true
            evidence_fingerprint: "sha256:6d8f9c29658f975dba696ebc6111df7b46d2e87ec1b33c970d34608f21fe96c1"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-regressions"
                    description: "Reproduce approved validation-only refinement recovery on a recorded implementation. Accept only unchanged implementation scope and authenticated prior implementation evidence with fresh current-plan validation. Reject source drift, expanded implementation intent, absent approval and invalid receipts. No installed CLI changes or live deployment."
                    id: "safe-recovery"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "packages/agentplane/src/commands/task/evidence-only-rework-commit.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                    - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                    - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  symbol_hints:
                    - "resolveRecordedImplementationRecovery"
                depends_on: []
                expected_outputs:
                  - "recovery-regression"
                  - "bounded-recovery-fix"
                  - "check-evidence"
                id: "refinement-recovery"
                objective: "Reproduce and narrowly repair recovery of a previously committed implementation after an approved verification-only plan refinement. Keep source-scope and evidence checks fail-closed; rerun validation under the current approved plan."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                      id: "recovery-regressions"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "recovery-regressions"
                      description: "Reproduce approved validation-only refinement recovery on a recorded implementation. Accept only unchanged implementation scope and authenticated prior implementation evidence with fresh current-plan validation. Reject source drift, expanded implementation intent, absent approval and invalid receipts. No installed CLI changes or live deployment."
                      id: "safe-recovery"
                      required: true
                  evidence_fingerprint: "sha256:6d8f9c29658f975dba696ebc6111df7b46d2e87ec1b33c970d34608f21fe96c1"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
    revision: 12
    schema_version: 1
    updated_at: "2026-09-09T13:33:38.623Z"
    work_items:
      refinement-recovery:
        attempt: 0
        claim_id: null
        id: "refinement-recovery"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-09T12:01:05.653Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
        entity: "task"
        id: "event_9b8a2108e35bd2d482e999ed"
        mutation_id: "plan-refinement:work-order-202609090930-N0ZTF5-executor-6410c621c1b60cbb286ee54e"
        plan_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
        task_revision: 7
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:3d8a9a27ffed23aaa835111449f24419dbc3c75fc696de9a64440230c0a16d4b:
        aggregate_digest: "sha256:d3e3ec224939f70eed727fda04a277b12add1d4e419e08ca5d67138206fbb977"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T13:33:38.623Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_dc4192678d859b27b1cf97a3"
          mutation_id: "compatibility:sha256:3d8a9a27ffed23aaa835111449f24419dbc3c75fc696de9a64440230c0a16d4b"
          plan_digest: "sha256:bab169b5c5a41f611e0ed7d0412606ef9901408fd06f45c82f97f6cbd66b5249"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3d8a9a27ffed23aaa835111449f24419dbc3c75fc696de9a64440230c0a16d4b"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      compatibility:sha256:7cb71b363872947364dfa23dc794caef57a727c1cd862cfe292672533395ffda:
        aggregate_digest: "sha256:338f6281d5e5031e8b9f3d491378fa2af948f85dd1847b1146ed6257e562635d"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T12:00:59.198Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_cda6516143ce245bd76d10fe"
          mutation_id: "compatibility:sha256:7cb71b363872947364dfa23dc794caef57a727c1cd862cfe292672533395ffda"
          plan_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:7cb71b363872947364dfa23dc794caef57a727c1cd862cfe292672533395ffda"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      compatibility:sha256:7e2c7738b7139cbc48850fc02897bf5b3a5b7b0a5584f5f4bb320250a20b1aef:
        aggregate_digest: "sha256:0fb784cf6e11bece0112d3dfe2f4cb53052c491a2e631ea3b168f72dc1e4bbe5"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T11:39:32.775Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f4f6f3b0debcc0101da52bd9"
          mutation_id: "compatibility:sha256:7e2c7738b7139cbc48850fc02897bf5b3a5b7b0a5584f5f4bb320250a20b1aef"
          plan_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:7e2c7738b7139cbc48850fc02897bf5b3a5b7b0a5584f5f4bb320250a20b1aef"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      compatibility:sha256:92ca4ca85dd37805ad62af4b86303a9cd6fd3a71174e168b676a1eaca656dd72:
        aggregate_digest: "sha256:57424ddf02d11efcbaebe285d4dcda28d58134a3fef78be0100d250341d2ad4a"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T11:37:02.911Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_ec7080afb3e698c7d08a966a"
          mutation_id: "compatibility:sha256:92ca4ca85dd37805ad62af4b86303a9cd6fd3a71174e168b676a1eaca656dd72"
          plan_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:92ca4ca85dd37805ad62af4b86303a9cd6fd3a71174e168b676a1eaca656dd72"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      compatibility:sha256:9a4113d5b648db11ae5f59d5aef60c0429a9c9bf74a13f8f2b481e703601ba09:
        aggregate_digest: "sha256:7a7ba399dcf4ede921a791435ad3cf5c45088fad2615e78bdd257f25ab5842f2"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T12:03:16.416Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8804fc5207945da74b6b8223"
          mutation_id: "compatibility:sha256:9a4113d5b648db11ae5f59d5aef60c0429a9c9bf74a13f8f2b481e703601ba09"
          plan_digest: "sha256:bab169b5c5a41f611e0ed7d0412606ef9901408fd06f45c82f97f6cbd66b5249"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9a4113d5b648db11ae5f59d5aef60c0429a9c9bf74a13f8f2b481e703601ba09"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      compatibility:sha256:b4b74d8c4c05c08bd7b12431f5adf459b0c6d8eaa38d71e8e66e871070243fba:
        aggregate_digest: "sha256:d3d619de0b7cd2eb2cdcb5faa5b9cf87424d2b9ce7a81974e1b5eb308c5de72b"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T11:37:02.916Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_a632ba2ff9ebfc2d34dc23e1"
          mutation_id: "compatibility:sha256:b4b74d8c4c05c08bd7b12431f5adf459b0c6d8eaa38d71e8e66e871070243fba"
          plan_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b4b74d8c4c05c08bd7b12431f5adf459b0c6d8eaa38d71e8e66e871070243fba"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      compatibility:sha256:f18f6b13690344d06df6a1d78b9d381a6e5883502db3da0849f60ca93ee55b68:
        aggregate_digest: "sha256:2702ba860d05f026aaabe0e19521dc85630d83c7035769d42e91332e9486540b"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T13:33:38.620Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b0408603ae1f2d08ebffbee8"
          mutation_id: "compatibility:sha256:f18f6b13690344d06df6a1d78b9d381a6e5883502db3da0849f60ca93ee55b68"
          plan_digest: "sha256:bab169b5c5a41f611e0ed7d0412606ef9901408fd06f45c82f97f6cbd66b5249"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f18f6b13690344d06df6a1d78b9d381a6e5883502db3da0849f60ca93ee55b68"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      compatibility:sha256:ff9749e3a0af1c57f0c8300b5a358b6d7125674b9e7ea33b5e0e8a4ad1100676:
        aggregate_digest: "sha256:c1602a1dde746cf46d9e4d89866155b133b55bd07d40159844a14ec20a24ae51"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T12:00:59.198Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ad18069a919e6528575572e4"
          mutation_id: "compatibility:sha256:ff9749e3a0af1c57f0c8300b5a358b6d7125674b9e7ea33b5e0e8a4ad1100676"
          plan_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ff9749e3a0af1c57f0c8300b5a358b6d7125674b9e7ea33b5e0e8a4ad1100676"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
      plan-refinement:work-order-202609090930-N0ZTF5-executor-6410c621c1b60cbb286ee54e:
        aggregate_digest: "sha256:37b6b45c199c67f6cc070fe135aaaec64739189bbe40d32a5144d94a0361f14f"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-09T12:01:05.653Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_9b8a2108e35bd2d482e999ed"
          mutation_id: "plan-refinement:work-order-202609090930-N0ZTF5-executor-6410c621c1b60cbb286ee54e"
          plan_digest: "sha256:538c060a34e7156ab51d95c1e8e33747c6e3e1308c939dedce768c3d0e7b42c2"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609090930-N0ZTF5"
          task_revision: 7
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609090930-N0ZTF5-executor-6410c621c1b60cbb286ee54e"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609090930-N0ZTF5"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "12014e6d6ba4bcaf0986467b4e95867f63c97bdf"
  task_execution_context:
    base_ref: "main"
    base_sha: "3b3ddab7b2e642329356e873a44d245796f23a67"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "3b3ddab7b2e642329356e873a44d245796f23a67"
    version: 1
id_source: "generated"
---
## Summary

Recover committed implementation after an approved verification-only plan refinement without fabricated source changes

Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task.

## Scope

- In scope: Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task.
- Out of scope: unrelated refactors not required for "Recover committed implementation after an approved verification-only plan refinement without fabricated source changes".

## Plan

Finish the existing recovery draft by extracting only its approved-refinement comparison into the existing evidence-only-rework-commit.ts helper module. Replace the unused authority.ts scope path; keep three total existing files, the same behavior and all verification gates.

## Verify Steps

1. Reproduce approved verification-only refinement recovery using an existing recorded implementation fixture. Reject source drift, scope expansion, absent approval and invalid implementation receipts.
2. Run bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts. Expected: positive and negative recovery regressions pass.
3. Run bun run typecheck and bun run ci:local:full before declaring the patch verified. Expected: both pass. Hosted integration remains required before merge.
4. Audit the final diff against the three approved source/test paths. No installed CLI, Arkady Factory, runtime, credentials or unrelated task artifacts may change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-09T13:33:35.796Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:39fcd18f211a6c367e2bf885475606fb53516fe2ad84783f33a097d6e444102f, input_digest=sha256:c37c45c95398542785d1aac79c9eae74abe4c42049cbc6cb358a46f1ec0c2475

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts
Result: pass
Evidence: .agentplane/tasks/202609090930-N0ZTF5/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609090930-N0ZTF5 Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts
Result: pass
Evidence: .agentplane/tasks/202609090930-N0ZTF5/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609090930-N0ZTF5 Verification Contract check critical_paths

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts
Result: pass
Evidence: .agentplane/tasks/202609090930-N0ZTF5/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609090930-N0ZTF5 Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane-cli-main/.agentplane/worktrees/202609090930-N0ZTF5-recover-committed-implementation-after-an-approv/.agentplane/tasks/202609090930-N0ZTF5/blueprint/resolved-snapshot.json
- old_digest: 3d10862ad8ccb9c0ac1033f5e6524898d97ba26c45242bfc534f3e56b152945d
- current_digest: 3d10862ad8ccb9c0ac1033f5e6524898d97ba26c45242bfc534f3e56b152945d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609090930-N0ZTF5

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609090930-N0ZTF5
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
