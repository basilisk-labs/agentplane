---
id: "202610142302-3PJHSP"
title: "Recover interrupted integration intent for completed canonical Task (issue6152)"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-10-14T23:13:03.619Z"
  updated_by: "agentplane:kernel-controller"
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
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
      digest: "sha256:b681ad377a2dd2503855f84ee0f537e52c8621066181940a4311f757beb8bbfd"
      escalation_reasons:
        - "effect_public_api"
        - "effect_security_boundary"
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
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-14T23:02:36.086Z"
doc_updated_by: "CODER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
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
      final_validation: null
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
        kernel_work_item_materialization_required:sha256:779852a256ba07633d9b9711b19455c7f8c835a9891938edb10a6b718e896be8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:d555b6642097d5fa7ba1d58034a372f11e62edd5c747901315dfad9842caeabe"
          before_revision: 3
          command_digest: "sha256:84c1c32b018b10cff53aacbee9341c2dd7638e24003b4d3e70e07427b6ea076e"
          effect_ids: []
          event_digests:
            - "sha256:bf6078040ebbc69f5119e422da02a366d573da06b5966cd26dce4e07b268b138"
          mutation_id: "kernel_work_item_materialization_required:sha256:779852a256ba07633d9b9711b19455c7f8c835a9891938edb10a6b718e896be8:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        result:sha256:879fba62f01890ef3e1e28121311ff0f2848057e2209f5bcfa311e191ba8e2f6:
          after_revision: 2
          aggregate_digest: "sha256:c384945e4d6d979b12dc8aa089e31d5901ca3800bb6c8fa673548a0a205642b9"
          before_revision: 1
          command_digest: "sha256:5a5aba83e4762a195eb5cd78775c61da9ad1fe7a787295dda0179944a4cb2908"
          effect_ids: []
          event_digests:
            - "sha256:59087b2440e960128d69d0503c027b0dccb30cb6275a932807a0fd038a498b0a"
          mutation_id: "result:sha256:879fba62f01890ef3e1e28121311ff0f2848057e2209f5bcfa311e191ba8e2f6"
        sha256:37bd7ca85c688df4ddbea9c55b616a14070a3fff292467dda56fc1d73558b36c:
          after_revision: 3
          aggregate_digest: "sha256:78280a4482168d214adf1f3622e8e92b0365e26d782f0c2bc94eaad1e29b22c0"
          before_revision: 2
          command_digest: "sha256:71c4076b04b2beaeb5078bcbe895d81da9fed6933b53615b07cc8601ff9fd60f"
          effect_ids: []
          event_digests:
            - "sha256:68fcaba989542483e548588b1af123e3013460a5c59ded50c5f0adfeeecca3c0"
          mutation_id: "sha256:37bd7ca85c688df4ddbea9c55b616a14070a3fff292467dda56fc1d73558b36c"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
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
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:0bad7f349b990170f350b2e11486d45d3d3970db4adf8adcc4ba03b092d8d5c2"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
