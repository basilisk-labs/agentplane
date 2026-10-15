---
id: "202610142302-3PJHSP"
title: "Recover interrupted integration intent for completed canonical Task (issue6152)"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "fix"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
  - "bun run typecheck"
  - "npm run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-15T00:36:08.674Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-15T00:54:11.688Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-15T00:36:04.032Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "7dd6065d4a126c64df114a1a650afc69ee2a21cb"
  review_identity_digest: "sha256:40c81ad47e4e79e91543c749bedad962b13789cd0718bcecbe29483cf618ed27"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610142302-3PJHSP/2d9d43fdc2db1eab3e6e6a607b955dabaf3cdcf4af4084a8eeb719df2f695aa6/quality-report.json"
  findings:
    - "Read genuine inspection WorkOrder, all thirteen required context blocks, eleven criteria and verification requirements; independently checked canonical pointer digests and byte sizes. Implementation result and native-validation canonical digests match; repository-evidence digest is canonical excluding its own digest field; pathless SOURCE4 report canonical digest matches."
    - "The four committed and working source files equal the previously ROOT-reviewed source4 hashes. Commit parent is canonical main d886917970bc0724b419074b7d575d47d9c95c1b and changed paths are exactly four source paths plus eight own Task metadata paths. No production source or existing legacy behavior outside that scope is changed."
    - "Canonical COMPLETED not_applied recovery retains exact original operation, authority, idempotency, provider/head/base and journal CAS. It requires explicit operator decision plus digest-bound retained execution receipt, matching expired own claim and strict ESRCH for every retained process. This is an explicit retrospective operator trust boundary, not proof that a user-supplied receipt is intrinsically authentic."
    - "Existing supervisor lease and queue mutex fence durable failed/not_applied journal outcome before exact own queue release. Queue-write failure keeps blocked claim; identical authorized resolution finishes only outstanding bookkeeping after revalidation. No automatic worker, provider write, completion downgrade, rewritten history or source mutation. Nearest tests cover entrypoint, negative identities/owner, ordering, persistence failure and replay."
    - "Retained native SOURCE focused command passed39 tests and typecheck passed, both default deadlines1799971ms. ROOT independently rehashed native manifest raw observations, ten wrapper raw logs, five closed stages and thirty-three fresh absent PID/start identities. The collector stopped after native success because it compared canonical manifest digests with raw manifest observations; actual native Task9 is INSPECTING with genuine EVAL, so no replay is appropriate."
    - "The replacement installed Node was separately checked using exact binary and ninety-seven linked files, four bounded read-only probes and C9 normalization. Existing source/result/commit intent were retained through a single unaccepted SOURCE continuation. This review executed no tests or live reconciliation."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "public_api"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
      - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "public_api"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
      - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
      - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
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
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
          - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
          - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:3676da09eacff020acce7bf2e23ec659dc962b89baeb3c22b267c17a1de34d83"
      escalation_reasons:
        - "effect_public_api"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
          - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
          - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
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
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "7dd6065d4a126c64df114a1a650afc69ee2a21cb"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-15T00:54:11.688Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-15T00:54:12.220Z"
doc_updated_by: "SUPERVISOR"
description: "Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools."
sections:
  Summary: |-
    Recover interrupted integration intent for completed canonical Task (issue6152)

    Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools.
  Scope: |-
    - In scope: Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools.
    - Out of scope: unrelated refactors not required for "Recover interrupted integration intent for completed canonical Task (issue6152)".
  Plan: "1. Execute approved WorkItem recover-completed-integration-intent."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `npm run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-15T00:54:11.688Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fe603d6d4d9bfc0a59c5bbbf0b4c8c2bb8f731cda18cdae1e36bdc61a3c5c981, input_digest=sha256:d8dff141b060fad3fc4528242804457534d443d56ffb4656d3e0c36bfe88d81c

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142302-3PJHSP Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:c5745cfcf4b602d381c58bc683e43fd7981ec1d1840c6344e5f958f45f87f046
    - policy_digest: sha256:19b02807e7eef1d25b39b2639cee8872937d5a851abbd369bf46a6b065629302
    - capability_digest: sha256:4d57c30a69d77eb0256f3b4281eb8ac60c655827bec8ebadc3f30af54375d7a5
    - checks_digest: sha256:b47ed056933b3114089760b152e0f61f930ce81efe2b552dbfe1fe60b1deac9c
    - identity_digest: sha256:85b2dfe18a96ee3f3192a59d17e9a2ffe7539139736f6e36929fe35f986db1b9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610142302-3PJHSP
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
  agentplane.kernel_operational_projection:
    digest: "sha256:d61e1105070df857ddbdb602cbc3815a721180b996df4e5543541553d3ad2af6"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610142302-3PJHSP/2d9d43fdc2db1eab3e6e6a607b955dabaf3cdcf4af4084a8eeb719df2f695aa6/quality-report.json"
    findings:
      - "Read genuine inspection WorkOrder, all thirteen required context blocks, eleven criteria and verification requirements; independently checked canonical pointer digests and byte sizes. Implementation result and native-validation canonical digests match; repository-evidence digest is canonical excluding its own digest field; pathless SOURCE4 report canonical digest matches."
      - "The four committed and working source files equal the previously ROOT-reviewed source4 hashes. Commit parent is canonical main d886917970bc0724b419074b7d575d47d9c95c1b and changed paths are exactly four source paths plus eight own Task metadata paths. No production source or existing legacy behavior outside that scope is changed."
      - "Canonical COMPLETED not_applied recovery retains exact original operation, authority, idempotency, provider/head/base and journal CAS. It requires explicit operator decision plus digest-bound retained execution receipt, matching expired own claim and strict ESRCH for every retained process. This is an explicit retrospective operator trust boundary, not proof that a user-supplied receipt is intrinsically authentic."
      - "Existing supervisor lease and queue mutex fence durable failed/not_applied journal outcome before exact own queue release. Queue-write failure keeps blocked claim; identical authorized resolution finishes only outstanding bookkeeping after revalidation. No automatic worker, provider write, completion downgrade, rewritten history or source mutation. Nearest tests cover entrypoint, negative identities/owner, ordering, persistence failure and replay."
      - "Retained native SOURCE focused command passed39 tests and typecheck passed, both default deadlines1799971ms. ROOT independently rehashed native manifest raw observations, ten wrapper raw logs, five closed stages and thirty-three fresh absent PID/start identities. The collector stopped after native success because it compared canonical manifest digests with raw manifest observations; actual native Task9 is INSPECTING with genuine EVAL, so no replay is appropriate."
      - "The replacement installed Node was separately checked using exact binary and ninety-seven linked files, four bounded read-only probes and C9 normalization. Existing source/result/commit intent were retained through a single unaccepted SOURCE continuation. This review executed no tests or live reconciliation."
    implementation_commit: "7dd6065d4a126c64df114a1a650afc69ee2a21cb"
    implementation_tree: "ca7d122e172bd5756c474845e9b495d62c396ef2"
    projected_at: "2026-10-15T00:36:04.032Z"
    review_identity_digest: "sha256:40c81ad47e4e79e91543c749bedad962b13789cd0718bcecbe29483cf618ed27"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:023959abdea410e7bfdad34b7633678bf8a929c5d712bea62c2a6e7237bb9267"
    work_order_id: "sha256:230aec4ab85c4d10faa9da34d288d1c19576daa740d6e50c54515b62c81506b6"
  task_execution_context:
    base_ref: "main"
    base_sha: "d886917970bc0724b419074b7d575d47d9c95c1b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:269541fca8f74e1c34ed04140b6073bb49aa80d95c614468ca5b80f6734439c0"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c5745cfcf4b602d381c58bc683e43fd7981ec1d1840c6344e5f958f45f87f046"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:dc61701e4aa0617ea0c983489349d450bd21726e22384c9a69bf972e4294624f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "public_api"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
            task_id: "202610142302-3PJHSP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:00599134f20e8aa5c578095e9b6384c4dba477d14b9a44018afe1e4ad49bac16"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c5745cfcf4b602d381c58bc683e43fd7981ec1d1840c6344e5f958f45f87f046"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:dc61701e4aa0617ea0c983489349d450bd21726e22384c9a69bf972e4294624f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:269541fca8f74e1c34ed04140b6073bb49aa80d95c614468ca5b80f6734439c0"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
            task_id: "202610142302-3PJHSP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
            evidence_digest: "sha256:7a2ca857671f5395dd769e65355400ff182c24d31398354e729dde03e4d9f93d"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:dc61701e4aa0617ea0c983489349d450bd21726e22384c9a69bf972e4294624f"
        digest: "sha256:c5745cfcf4b602d381c58bc683e43fd7981ec1d1840c6344e5f958f45f87f046"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:595cc3d2eb00390d97a2c70125b1e1d4fcdd2b3967a08db64a7f6f092b78eee7"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/advance.command.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
                - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
            expected_outputs:
              - "completed-integration-recovery-source-report"
            id: "recover-completed-integration-intent"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:023959abdea410e7bfdad34b7633678bf8a929c5d712bea62c2a6e7237bb9267"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:6e0aa58ed0ec7ebffc19213023bd7cdb2d612cefcc31bb2716be24a1f51d8d3d"
          environment_digest: "sha256:502c3617db8a29bceddd6cb752f754f4bed4c35da9f533d4c604c2ea3be06661"
          implementation_identity: "sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
          toolchain_digest: "sha256:d66525de96447bfa5affbe02dd517e8a99c3403f4ba857a895e2184998f6f2c1"
        observed_at: "2026-10-15T00:36:09.356Z"
        status: "PASSED"
      id: "202610142302-3PJHSP"
      intent_digest: "sha256:c95cfeb1c827f342c7e4c6127af1b56f7cfdb36e88ecd6ee417b3b2f5ecce7e1"
      migration_receipts: []
      mutation_receipts:
        capture:202610142302-3PJHSP:
          after_revision: 1
          aggregate_digest: "sha256:61f3067b3d470f3367a836772bd51f983d79ca1c15cb34d679e21ae69c997c27"
          before_revision: 0
          command_digest: "sha256:2ff1c468647d83313219688234f9e742616e36ca6ec3c03bf24cffd2e633aec5"
          effect_ids: []
          event_digests:
            - "sha256:44a0420225d391d50d171a44cc2770533a65886a0bf74778d7b80c2eb106e10f"
          mutation_id: "capture:202610142302-3PJHSP"
        final-validation:sha256:023959abdea410e7bfdad34b7633678bf8a929c5d712bea62c2a6e7237bb9267:11:
          after_revision: 12
          aggregate_digest: "sha256:450058ce9a9aa839051d938eb17e71f31f470b160c6c317a74174c60a9408df6"
          before_revision: 11
          command_digest: "sha256:8fc1e790c44f5530af6e40604cae08eb2c0ce491917be833a0f0f887fb1e5199"
          effect_ids: []
          event_digests:
            - "sha256:e96e7b6c9d1c3814e331124a68e9a5ac401e9c116ac06d51406b47c54d3d599f"
          mutation_id: "final-validation:sha256:023959abdea410e7bfdad34b7633678bf8a929c5d712bea62c2a6e7237bb9267:11"
        kernel_task_completion_required:sha256:b1e3fd409d087babd8955101b6bdb9b05ff5f3c6371f7f32c5b12884a81a89f4:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 13
          aggregate_digest: "sha256:4969584312a17c58a06d5097fb8330e557f556248482f8f94ac69c692d4b9c12"
          before_revision: 12
          command_digest: "sha256:2a456855a7b8bd342b4da70c731dcccd28fb6605d2c14483b962f3482cf20fe2"
          effect_ids: []
          event_digests:
            - "sha256:32ed5454067cd98b772023ccabd807882a2fcfdb4e07159337d1a18dfbf47808"
          mutation_id: "kernel_task_completion_required:sha256:b1e3fd409d087babd8955101b6bdb9b05ff5f3c6371f7f32c5b12884a81a89f4:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        kernel_work_item_claim_required:sha256:6e0bc0c5fd33553fdfe37bdf9824baaafb9a8db74b90654226b5822c5ec7b5fe:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:2a6272a3886122d7d70c2fd4c05bf8cd4f428fe1fae0f2e23f399b22341548d4"
          before_revision: 4
          command_digest: "sha256:e1fb06accf3dfe7a7102d2fa8ba99801135198db5b306554e067f81dcad6178e"
          effect_ids: []
          event_digests:
            - "sha256:9eb62400a84595a04ae6c07666ef5cabbbc1f3e9e5b5e34f19b3b8733fc32838"
          mutation_id: "kernel_work_item_claim_required:sha256:6e0bc0c5fd33553fdfe37bdf9824baaafb9a8db74b90654226b5822c5ec7b5fe:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:86e8a920fb26e23991fdc579262048a3a5fc48d26e9b7d1e40def1326fd3e306:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:ac98fef10e11346b354670684812d1378f648225fb9217d1d20de11b28e3625c"
          before_revision: 5
          command_digest: "sha256:9e5b49f1c910f2f5fc120393d9527035bd3dc0f6e9a957abd2bef485b834eb56"
          effect_ids: []
          event_digests:
            - "sha256:f76adb14cef4d114f1912efe07c5c3ce787d907c6c97fe043d090050d03cec6f"
          mutation_id: "kernel_work_item_execution_required:sha256:86e8a920fb26e23991fdc579262048a3a5fc48d26e9b7d1e40def1326fd3e306:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_inspection_required:sha256:185990447e27855c05d36577d6a4200e5e302523b1dc55635d5c85e11aee95d1:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 9
          aggregate_digest: "sha256:7f9c87ac947613efd51e84d71da8198e48fe433060c646493f543fc54b55c526"
          before_revision: 8
          command_digest: "sha256:575bf5150936e571481bca38cef2a5a313075adf1a6f5f331afda9a1f878887c"
          effect_ids: []
          event_digests:
            - "sha256:4b8e06c23511d9dfde9ae922ed47add9d43315f6147c64be9502b80b0e817dc3"
          mutation_id: "kernel_work_item_inspection_required:sha256:185990447e27855c05d36577d6a4200e5e302523b1dc55635d5c85e11aee95d1:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        kernel_work_item_materialization_required:sha256:779852a256ba07633d9b9711b19455c7f8c835a9891938edb10a6b718e896be8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:d555b6642097d5fa7ba1d58034a372f11e62edd5c747901315dfad9842caeabe"
          before_revision: 3
          command_digest: "sha256:84c1c32b018b10cff53aacbee9341c2dd7638e24003b4d3e70e07427b6ea076e"
          effect_ids: []
          event_digests:
            - "sha256:bf6078040ebbc69f5119e422da02a366d573da06b5966cd26dce4e07b268b138"
          mutation_id: "kernel_work_item_materialization_required:sha256:779852a256ba07633d9b9711b19455c7f8c835a9891938edb10a6b718e896be8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        result:sha256:230aec4ab85c4d10faa9da34d288d1c19576daa740d6e50c54515b62c81506b6:
          after_revision: 8
          aggregate_digest: "sha256:5f2afbe3bdf2ac03692ebb1905b2b1422457a34157156bf2c97eb3d9dce9edeb"
          before_revision: 7
          command_digest: "sha256:17f8c15c939f161d7943f1c61d5ff02d9b69f47413e23024dc7dacf5185d0257"
          effect_ids: []
          event_digests:
            - "sha256:503841e98aa84c4873f0bde78d9374ff000ef19c7f5fda394d2768b885234cb5"
          mutation_id: "result:sha256:230aec4ab85c4d10faa9da34d288d1c19576daa740d6e50c54515b62c81506b6"
        result:sha256:879fba62f01890ef3e1e28121311ff0f2848057e2209f5bcfa311e191ba8e2f6:
          after_revision: 2
          aggregate_digest: "sha256:c384945e4d6d979b12dc8aa089e31d5901ca3800bb6c8fa673548a0a205642b9"
          before_revision: 1
          command_digest: "sha256:5a5aba83e4762a195eb5cd78775c61da9ad1fe7a787295dda0179944a4cb2908"
          effect_ids: []
          event_digests:
            - "sha256:59087b2440e960128d69d0503c027b0dccb30cb6275a932807a0fd038a498b0a"
          mutation_id: "result:sha256:879fba62f01890ef3e1e28121311ff0f2848057e2209f5bcfa311e191ba8e2f6"
        sha256:05935760d38d25881dc4e4019043097508c68da5c68fe5bdf56b00bc7e76bf38:
          after_revision: 7
          aggregate_digest: "sha256:3a1e7d274649283880dc8fecaac8fffea4ef4579002e30a272eeffef8785a758"
          before_revision: 6
          command_digest: "sha256:d59cf3b651c83fd1a4e3e197b678388cda2b13add1af05dd84728ea480ccc96f"
          effect_ids: []
          event_digests:
            - "sha256:c13a726305fdca4ed9304e61c0f37d98edfc53d3f47f1cfe2054cf6db80be214"
          mutation_id: "sha256:05935760d38d25881dc4e4019043097508c68da5c68fe5bdf56b00bc7e76bf38"
        sha256:37bd7ca85c688df4ddbea9c55b616a14070a3fff292467dda56fc1d73558b36c:
          after_revision: 3
          aggregate_digest: "sha256:78280a4482168d214adf1f3622e8e92b0365e26d782f0c2bc94eaad1e29b22c0"
          before_revision: 2
          command_digest: "sha256:71c4076b04b2beaeb5078bcbe895d81da9fed6933b53615b07cc8601ff9fd60f"
          effect_ids: []
          event_digests:
            - "sha256:68fcaba989542483e548588b1af123e3013460a5c59ded50c5f0adfeeecca3c0"
          mutation_id: "sha256:37bd7ca85c688df4ddbea9c55b616a14070a3fff292467dda56fc1d73558b36c"
        validation-resolution:sha256:98c7f747706e34959157d69e2a83cd354f3c02e67fc39d8be785dd4d1fab1f21:
          after_revision: 11
          aggregate_digest: "sha256:b958880e1155c3273f061707d915db6a5d5181e9b17d44821081d015eb20aead"
          before_revision: 10
          command_digest: "sha256:ea5b30bf62fcd126f2530d881bfc4c4a926379890aa58a3e4da6a7a166ee6272"
          effect_ids: []
          event_digests:
            - "sha256:fd917031a8e3287716bf10d4c912082845b77c7e139df149dc39e1d21e891398"
          mutation_id: "validation-resolution:sha256:98c7f747706e34959157d69e2a83cd354f3c02e67fc39d8be785dd4d1fab1f21"
        validation:sha256:2d9d43fdc2db1eab3e6e6a607b955dabaf3cdcf4af4084a8eeb719df2f695aa6:
          after_revision: 10
          aggregate_digest: "sha256:6ff3f3ae07db90d25eee129ae7dd50716c2a9bc4761ff74d1467b20b4b45e83c"
          before_revision: 9
          command_digest: "sha256:4f6611a8282df11c0e9dc282500a0945134d77a68e673db1ce0b61b2c2da64d0"
          effect_ids: []
          event_digests:
            - "sha256:5aecd06654882a9d692644d6b7fe36f2991915aa724657bcce4faafc42ef7768"
          mutation_id: "validation:sha256:2d9d43fdc2db1eab3e6e6a607b955dabaf3cdcf4af4084a8eeb719df2f695aa6"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        recover-completed-integration-intent:
          attempt: 1
          claim_id: "sha256:17f839d6589127479d5948ded461be7f349555b858acd1a5cb561971f3aa41a6"
          definition:
            contract_digest: "sha256:595cc3d2eb00390d97a2c70125b1e1d4fcdd2b3967a08db64a7f6f092b78eee7"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/advance.command.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
                - "packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts"
            expected_outputs:
              - "completed-integration-recovery-source-report"
            id: "recover-completed-integration-intent"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:2f9402202d8835f2fc53e96e332c5a22ad93784f593eb778b5ce8908eef9e900"
              id: "completed-integration-recovery-source-report"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
              task_id: "202610142302-3PJHSP"
              work_item_id: "recover-completed-integration-intent"
          result_digest: "sha256:304fab2269687b36b7671e2fbcd084caebf7ad51dc2074e462c0a0724640d1d9"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:9daa98acde1582f866dcfdce7dffeda74d7c0fbbd0c781acba90e3550199e942"
              - "sha256:40c81ad47e4e79e91543c749bedad962b13789cd0718bcecbe29483cf618ed27"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:6e0aa58ed0ec7ebffc19213023bd7cdb2d612cefcc31bb2716be24a1f51d8d3d"
              environment_digest: "sha256:e063fcc96e2b30a4dfb63b0e3d5fa83b3da083e08678f4511f726f161dc21bca"
              implementation_identity: "sha256:304fab2269687b36b7671e2fbcd084caebf7ad51dc2074e462c0a0724640d1d9"
              toolchain_digest: "sha256:2f712b2af6ddc91556f7a5c75a7a03b0c414ceecc1b75e2b5f792efe06112624"
            observed_at: "2026-10-15T00:36:04.032Z"
            status: "PASSED"
    digest: "sha256:655d5d686f6ea373c317fb64ec79b5f8d3b96be4e622beba44e8e7ca54d0c7b6"
    documents:
      contracts:
        sha256:595cc3d2eb00390d97a2c70125b1e1d4fcdd2b3967a08db64a7f6f092b78eee7:
          acceptance_criteria:
            - "The existing public task advance --workflow-recovery accepts a narrowly bound not_applied reconciliation for an already canonical COMPLETED Task and its original interrupted integration.run_next intent. It does not fabricate implementation_rework or downgrade Task, Plan, WorkItems, accepted outputs, source or final-validation evidence."
            - "Preserve the existing schema and admission primitives where sufficient. Match the original journal operation, authority/effect/idempotency identity, full provider/project/MR/branch/head/base identity, current route fingerprint and supervisor journal CAS. Reject mismatched, missing, stale or ambiguous evidence. Keep the original intent and full history auditable. Reconciliation may terminalize only the current exact owned pending intent as failed/not_applied through existing native journal APIs/CAS, linked to operator resolution/evidence and retaining its original key, payload/snapshot, before fingerprint and start time. Never erase or substitute any historical FAILED/COMPLETED entry. Preserving history does not mean leaving the reconciled intent unresolved forever."
            - "An explicit matching operator decision must authorize reconciliation of the exact abandoned own integration claim. A timeout or a PID absence alone is not authority. Fail closed for live or unknown workers, an unverified owner, another active queue owner, changed queue identity, provider unavailable/unknown outcome, merged or changed MR, source/head/base drift, or a stale journal/fingerprint. Do not grant USER authority or infer credentials."
            - "Use the existing supervisor lease and integration queue mutex. Revalidate the same canonical completion and queue/provider identities under those locks. Make the journal resolution durable before releasing the exact own queue claim; never release the queue first and then attempt journal CAS. Do not introduce a generic transaction layer. Keep the exact queue claim and journal transition fenced through the full existing locked sequence; do not expose a claimable queue while the journal transition is incomplete or contradictory."
            - "If queue persistence fails after durable journal resolution, retain a blocked claim. Repeating the exact authorized resolution may finish only its pending bookkeeping after revalidation, without duplicate journal outcomes, provider effects, another worker or a changed resolution. Contradictory evidence remains rejected. Tests must exercise the failure boundary and idempotent completion."
            - "Reconciliation itself performs no merge, publication, push, automatic worker retry, local pull, cleanup, base jump, Task completion mutation or implementation rewrite. Return a fresh boundary after reconciliation. Any subsequent integration operation requires separate current native admission and operator authorization."
            - "Keep legacy recovery semantics, applied-outcome proof requirements, mandatory verification and independent review unchanged. The new canonical branch must not turn arbitrary failed, rejected, legacy or active Tasks into retry authority."
            - "Extend the two existing nearest test modules to demonstrate the public canonical entrypoint, the same completed Task and original identity, accepted evidence/history preservation, no provider writes, stale and foreign identity/owner rejection, queue/journal ordering, partial persistence failure and idempotent bookkeeping. Use existing test primitives and no new module, wrapper, dependency, format or harness."
            - "Modify only the four declared existing paths. Preserve all unrelated tracked/untracked work, canonical main and original BF/AP runtime, queue, source, validation and publication artifacts. Do not repair the live BF episode during source semantic work."
            - "Run the exact assigned focused verification commands and typecheck; retain actual commands, results and closure evidence. Native required SOURCE validation and independent EVAL plus required FINAL full regression remain mandatory before separately authorized hosted publication/integration. No verification waiver or source-only delivery claim."
            - "Use isolated candidate-owned dependencies and bounded owned capture/temp roots. Do not write to qualified C9, shared stores, the running AP FINAL roots or user/global configuration. Serialize heavy checks with ROOT. Stop for an actual scope or authority gap before expanding files or effects."
          objective: "Correct the existing canonical completed-task workflow recovery route for issue6152 within four existing source/test paths. Implement only the explicit evidence-bound not_applied outcome and safe own-claim bookkeeping described by the criteria. Preserve canonical completion, original intent/evidence/history, strict identity/CAS/owner/provider checks and all verification floors. Do not act on the live BF queue or provider. Return source diff and nearest evidence for ROOT and distinct review before native source intake or heavy validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            - "bun run typecheck"
      intent:
        context: "Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools."
        objective: "Recover interrupted integration intent for completed canonical Task (issue6152)"
    events:
      -
        command_digest: "sha256:2ff1c468647d83313219688234f9e742616e36ca6ec3c03bf24cffd2e633aec5"
        id: "capture:202610142302-3PJHSP:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610142302-3PJHSP"
        occurred_at: "2026-10-14T23:02:36.052Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610142302-3PJHSP"
        task_revision: 1
      -
        command_digest: "sha256:5a5aba83e4762a195eb5cd78775c61da9ad1fe7a787295dda0179944a4cb2908"
        id: "result:sha256:879fba62f01890ef3e1e28121311ff0f2848057e2209f5bcfa311e191ba8e2f6:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:879fba62f01890ef3e1e28121311ff0f2848057e2209f5bcfa311e191ba8e2f6"
        occurred_at: "2026-10-14T23:12:51.917Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610142302-3PJHSP"
        task_revision: 2
      -
        command_digest: "sha256:71c4076b04b2beaeb5078bcbe895d81da9fed6933b53615b07cc8601ff9fd60f"
        id: "sha256:37bd7ca85c688df4ddbea9c55b616a14070a3fff292467dda56fc1d73558b36c:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:37bd7ca85c688df4ddbea9c55b616a14070a3fff292467dda56fc1d73558b36c"
        occurred_at: "2026-10-14T23:12:58.957Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610142302-3PJHSP"
        task_revision: 3
      -
        command_digest: "sha256:84c1c32b018b10cff53aacbee9341c2dd7638e24003b4d3e70e07427b6ea076e"
        id: "kernel_work_item_materialization_required:sha256:779852a256ba07633d9b9711b19455c7f8c835a9891938edb10a6b718e896be8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:779852a256ba07633d9b9711b19455c7f8c835a9891938edb10a6b718e896be8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T23:13:06.306Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610142302-3PJHSP"
        task_revision: 4
      -
        command_digest: "sha256:e1fb06accf3dfe7a7102d2fa8ba99801135198db5b306554e067f81dcad6178e"
        id: "kernel_work_item_claim_required:sha256:6e0bc0c5fd33553fdfe37bdf9824baaafb9a8db74b90654226b5822c5ec7b5fe:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6e0bc0c5fd33553fdfe37bdf9824baaafb9a8db74b90654226b5822c5ec7b5fe:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T23:13:15.287Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610142302-3PJHSP"
        task_revision: 5
      -
        command_digest: "sha256:9e5b49f1c910f2f5fc120393d9527035bd3dc0f6e9a957abd2bef485b834eb56"
        id: "kernel_work_item_execution_required:sha256:86e8a920fb26e23991fdc579262048a3a5fc48d26e9b7d1e40def1326fd3e306:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:86e8a920fb26e23991fdc579262048a3a5fc48d26e9b7d1e40def1326fd3e306:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T23:15:50.199Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610142302-3PJHSP"
        task_revision: 6
      -
        command_digest: "sha256:d59cf3b651c83fd1a4e3e197b678388cda2b13add1af05dd84728ea480ccc96f"
        id: "sha256:05935760d38d25881dc4e4019043097508c68da5c68fe5bdf56b00bc7e76bf38:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:05935760d38d25881dc4e4019043097508c68da5c68fe5bdf56b00bc7e76bf38"
        occurred_at: "2026-10-15T00:16:49.472Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610142302-3PJHSP"
        task_revision: 7
      -
        command_digest: "sha256:17f8c15c939f161d7943f1c61d5ff02d9b69f47413e23024dc7dacf5185d0257"
        id: "result:sha256:230aec4ab85c4d10faa9da34d288d1c19576daa740d6e50c54515b62c81506b6:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:230aec4ab85c4d10faa9da34d288d1c19576daa740d6e50c54515b62c81506b6"
        occurred_at: "2026-10-15T00:16:51.890Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610142302-3PJHSP"
        task_revision: 8
      -
        command_digest: "sha256:575bf5150936e571481bca38cef2a5a313075adf1a6f5f331afda9a1f878887c"
        id: "kernel_work_item_inspection_required:sha256:185990447e27855c05d36577d6a4200e5e302523b1dc55635d5c85e11aee95d1:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:185990447e27855c05d36577d6a4200e5e302523b1dc55635d5c85e11aee95d1:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T00:16:53.758Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610142302-3PJHSP"
        task_revision: 9
      -
        command_digest: "sha256:4f6611a8282df11c0e9dc282500a0945134d77a68e673db1ce0b61b2c2da64d0"
        id: "validation:sha256:2d9d43fdc2db1eab3e6e6a607b955dabaf3cdcf4af4084a8eeb719df2f695aa6:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2d9d43fdc2db1eab3e6e6a607b955dabaf3cdcf4af4084a8eeb719df2f695aa6"
        occurred_at: "2026-10-15T00:36:05.876Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610142302-3PJHSP"
        task_revision: 10
      -
        command_digest: "sha256:ea5b30bf62fcd126f2530d881bfc4c4a926379890aa58a3e4da6a7a166ee6272"
        id: "validation-resolution:sha256:98c7f747706e34959157d69e2a83cd354f3c02e67fc39d8be785dd4d1fab1f21:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:98c7f747706e34959157d69e2a83cd354f3c02e67fc39d8be785dd4d1fab1f21"
        occurred_at: "2026-10-15T00:36:07.420Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610142302-3PJHSP"
        task_revision: 11
      -
        command_digest: "sha256:8fc1e790c44f5530af6e40604cae08eb2c0ce491917be833a0f0f887fb1e5199"
        id: "final-validation:sha256:023959abdea410e7bfdad34b7633678bf8a929c5d712bea62c2a6e7237bb9267:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:023959abdea410e7bfdad34b7633678bf8a929c5d712bea62c2a6e7237bb9267:11"
        occurred_at: "2026-10-15T00:54:10.849Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610142302-3PJHSP"
        task_revision: 12
      -
        command_digest: "sha256:2a456855a7b8bd342b4da70c731dcccd28fb6605d2c14483b962f3482cf20fe2"
        id: "kernel_task_completion_required:sha256:b1e3fd409d087babd8955101b6bdb9b05ff5f3c6371f7f32c5b12884a81a89f4:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:b1e3fd409d087babd8955101b6bdb9b05ff5f3c6371f7f32c5b12884a81a89f4:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T01:44:39.507Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202610142302-3PJHSP"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recover interrupted integration intent for completed canonical Task (issue6152)

Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools.

## Scope

- In scope: Fix issue6152: canonical COMPLETED Task must have evidence-bound public integration.run_next not_applied reconciliation after proven interrupted own handoff, without fake implementation_rework or Task downgrade. Reuse existing --workflow-recovery schema, original identity/current fingerprint/operator evidence, supervisor lease/CAS and queue mutex. Reconciliation does not merge or replay. Preserve completed Task/WorkItems/accepted outputs/final evidence and original intent history. Release ONLY exact original own queue claim under explicit matching operator evidence; fail closed unknown or live writer, other queue owner, source/head/base/provider drift, stale fingerprint/journal or ambiguous merge. Journal resolution must become durable before queue release; crash between writes must retain fail-closed claim, and exact same evidence can finish only bookkeeping without duplicate effect. Do not clear claim then attempt journal CAS. Keep legacy rework gates unchanged. Separate fresh admission is required before any later integration worker. Extend nearest existing tests for canonical positive/history preservation, rejection safety, no provider writes/replay, and queue-release failure/idempotent recovery. Planning ONLY now; no implementation until ROOT reviews exact Plan/authority. No changes to BF/AP current tasks, queues, runtime or tools.
- Out of scope: unrelated refactors not required for "Recover interrupted integration intent for completed canonical Task (issue6152)".

## Plan

1. Execute approved WorkItem recover-completed-integration-intent.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `npm run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-15T00:54:11.688Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fe603d6d4d9bfc0a59c5bbbf0b4c8c2bb8f731cda18cdae1e36bdc61a3c5c981, input_digest=sha256:d8dff141b060fad3fc4528242804457534d443d56ffb4656d3e0c36bfe88d81c

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142302-3PJHSP/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142302-3PJHSP Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:c5745cfcf4b602d381c58bc683e43fd7981ec1d1840c6344e5f958f45f87f046
- policy_digest: sha256:19b02807e7eef1d25b39b2639cee8872937d5a851abbd369bf46a6b065629302
- capability_digest: sha256:4d57c30a69d77eb0256f3b4281eb8ac60c655827bec8ebadc3f30af54375d7a5
- checks_digest: sha256:b47ed056933b3114089760b152e0f61f930ce81efe2b552dbfe1fe60b1deac9c
- identity_digest: sha256:85b2dfe18a96ee3f3192a59d17e9a2ffe7539139736f6e36929fe35f986db1b9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610142302-3PJHSP
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
