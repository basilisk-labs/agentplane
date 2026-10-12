---
id: "202610120014-1C3ZFG"
title: "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 20
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane typecheck"
  - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
  - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
  - "npm run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-12T08:59:09.488Z"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
      - "packages/agentplane/src/commands/guard/impl/commit.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
      - "packages/agentplane/src/commands/guard/impl/commit.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
          - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
          - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
          - "packages/agentplane/src/commands/guard/impl/commit.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
          - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
          - "packages/agentplane/src/runner/process-supervision/run.ts"
          - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:1d17d7f729a707a3e9b60ed3273dcfb16995d535f2c01e936f2954aefc1f8e6d"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
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
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-12T00:14:19.747Z"
doc_updated_by: "CODER"
description: "Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness."
sections:
  Summary: |-
    Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main

    Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.
  Scope: |-
    - In scope: Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.
    - Out of scope: unrelated refactors not required for "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main".
  Plan: "1. Execute approved WorkItem integrate-reviewed-nine-sources."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run --filter=agentplane typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `npm run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
            digest: "sha256:539a6b1e9eb4d959734b0f6766067a435322fd4f1f33a7157a85d0b053713232"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:e16dab7c90622938d52df6cd0a36b7e68601f036a01a3cd91fdc68c264e9b259"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
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
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9c0b0ece30b5966a8c0a293ade91d2373868096aeae3933bc9d33734124d46cd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e16dab7c90622938d52df6cd0a36b7e68601f036a01a3cd91fdc68c264e9b259"
              kind: "USER"
              parent_authority_digest: "sha256:539a6b1e9eb4d959734b0f6766067a435322fd4f1f33a7157a85d0b053713232"
            repository_effects:
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
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:249e2a8fc12c38d2c1f1e3fcb63a50eff8b8b104dc21031ca28f0d71dd36d72b"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            request_digest: "sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff"
            scope_request:
              attempt: 1
              claim_id: "sha256:8f4cb3bc1842060456732d66542ce8dc7d071eefd9b312c77cbbcb1b838b951b"
              contract_digest: "sha256:128748307635320a795e1f3361b14b80175834307631dc650e041e70753caf77"
              intake_after_digest: "sha256:71fb1bc85ace415bad00d1535f3040f48bbc68879c45ab868a5990855e940e21"
              intake_before_digest: "sha256:4d45a9c176b7e03fd9b34325799c2e1773ae9609f3e3d7a27934c6ce3e5d9890"
              parent_authority_digest: "sha256:539a6b1e9eb4d959734b0f6766067a435322fd4f1f33a7157a85d0b053713232"
              plan_digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
              plan_revision: 1
              record_digest: "sha256:84488479752d3b483b5686f3d95a84c1286e706e13e811ad9b3ce627b9628fa9"
              repository_effects: []
              repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:bef1874535b2af8dd0b68aaecbc48740860b540502171f4c328e5a4250eb59bd"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              stop_receipt_digest: "sha256:b4f1c401184e75a6a06aff6441ca5cc08bec752874e5b3a37cdd70b8a59fc2cc"
              task_id: "202610120014-1C3ZFG"
              task_revision: 7
              work_item_id: "integrate-reviewed-nine-sources"
              work_order_id: "sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c7ce1e708b33007e759c841c82bcebe02f5aa2f1be9e637ee81440f6f2ee40e2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47a8364a6762d41ca569f119563ea3789d47cbaabad9474590f4be1194b1f71c"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
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
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:5fc9be8965dce7a00140764a781cfe7ccb240dd87faf5d4ef2548f433a56418a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47a8364a6762d41ca569f119563ea3789d47cbaabad9474590f4be1194b1f71c"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c7ce1e708b33007e759c841c82bcebe02f5aa2f1be9e637ee81440f6f2ee40e2"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            evidence_digest: "sha256:545111aa1da2823864ed4d75e96f0a9795f8c21d4b94d65449217146a83e984a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3715fc22cc3b1871939c952cf7e9513597a037bd3785cc78affb9a95ccd7ec10"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5fc9be8965dce7a00140764a781cfe7ccb240dd87faf5d4ef2548f433a56418a"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:2d676dca32fe53f5303027347cc7b0a75e549c36c9256be72d8d7d58da2af0a1"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:d0be380a9b8c076de4758197cc98c9cc4c5f77a5d7e021b8191d2a28316b768b"
        digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:fee731108c11b8502e73e6e8e6199ade2ca89c30530dc77713815f67dbdbea1e"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
            expected_outputs:
              - "nine-source-adoption-report"
            id: "integrate-reviewed-nine-sources"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610120014-1C3ZFG"
      intent_digest: "sha256:6e3252e21e771218324d5799c5624bd2bc12ef7eb9b22d8e67ca0c7f2cd48d12"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a:
          after_revision: 15
          aggregate_digest: "sha256:456531d0722c38facf39b826c5e0701895cb3c1a29b1121beaabb96b3b5e8e3b"
          before_revision: 14
          command_digest: "sha256:d72fae62d33f32f17bbf52d5cc7a726df271423cd196d5d323a2cfcb4e922529"
          effect_ids: []
          event_digests:
            - "sha256:302a68ad1a0b4a34fe1f8ad025cfca0cf19792fd37dc83771162ff834d6e88aa"
          mutation_id: "amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
        capture:202610120014-1C3ZFG:
          after_revision: 1
          aggregate_digest: "sha256:2aa9c62c53ba9d034aadecb212dcec78d1f744e47e17238bc565f92d40c6ea0c"
          before_revision: 0
          command_digest: "sha256:e65c42f6e12a2bc40436a043475b62760bdb86069baf58bf89ef40820d4aa372"
          effect_ids: []
          event_digests:
            - "sha256:648281817048191f4a538e41fe5c12c3e4c4bb7c818905d8b1d786898d4c09a7"
          mutation_id: "capture:202610120014-1C3ZFG"
        kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:f40283c800bb11255e8fe475f32dfeac83e78b9eedbf07e2e00ded0262cea693"
          before_revision: 4
          command_digest: "sha256:f8586dcbbd9eda77119c392b468bd933e85c94c327a6ed2c2e6fb4d198b101ce"
          effect_ids: []
          event_digests:
            - "sha256:85ffb66057543622631d3dbc6a182c60212d41739ad2c819bce42f0af4e03430"
          mutation_id: "kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 11
          aggregate_digest: "sha256:0b1f680515c11cc2bfbd2f5cca73b2a7f3bb91581e19189d663c05a3b60236cd"
          before_revision: 10
          command_digest: "sha256:7d992a86e371c839df36b3b4d67bdf446346682339d27ca6e43693cce63cd4cf"
          effect_ids: []
          event_digests:
            - "sha256:d5d39e799a765fc094ea16f7ae3d3a565028d0e8b28ec981784f4211f8904abb"
          mutation_id: "kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:
          after_revision: 17
          aggregate_digest: "sha256:c890c40e5b9c6e1342c69093d24b328e6cddcb6f129b257bc1c45f906e17c76c"
          before_revision: 16
          command_digest: "sha256:d460efc3a38a416813fa540aa18ed5c528b7f44aec584e9add0f7b71444a570f"
          effect_ids: []
          event_digests:
            - "sha256:53bb61d3daa69587a898b638930158672c8e911ffad72f12578c43ac09c4c4ba"
          mutation_id: "kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:9f5a3630d28cad263938a1397d9ef9613461e1aed04753f2e9536812eeef5a15"
          before_revision: 5
          command_digest: "sha256:09de1609ff9b6573ef6a9d5f264b2fbf6610c35dbc026c67edde92d034d2a6db"
          effect_ids: []
          event_digests:
            - "sha256:6580fdded75b3ed5d394d66c93c4bd2c970d1b08c653f8b68eb5448ec41f3037"
          mutation_id: "kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 12
          aggregate_digest: "sha256:1c2dff652cfd3da6bf507d063dc4b203abfeb701e2fda3501b387aca60489f44"
          before_revision: 11
          command_digest: "sha256:eed8ea15fecd5132089edd890cdb6ac133fa6f5737fa19017c8d7d8450b3bade"
          effect_ids: []
          event_digests:
            - "sha256:a049ad230e9778c3b18547e003fb93a9579838c8e0ac066c094f39e1bfdcd035"
          mutation_id: "kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:
          after_revision: 18
          aggregate_digest: "sha256:c8dc5826b3602ccc11d6ff358b26c24ad1c94936f83823d4e586a69780f0d0cc"
          before_revision: 17
          command_digest: "sha256:dcaa9209d35bde8ce88f3c2061eb2d661819946318b74830a2e06bd0c63384a1"
          effect_ids: []
          event_digests:
            - "sha256:58243b1b35fe6eb795c4e259bbbac72f351cd97062e0a4d62e9ee52228808d27"
          mutation_id: "kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:03c9d6d246fb9330bc55c24863dd9358137eae61338ffeeb39f0c603ec6d30db"
          before_revision: 3
          command_digest: "sha256:e6f3141ad5b0173ceab73a702b5c1946f3f7e29aa9202ce9e23cbb6a6367e3eb"
          effect_ids: []
          event_digests:
            - "sha256:d07380ac2471b0fce70f434bdf741b528662dcd55285deb706cd450870e0de76"
          mutation_id: "kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe:
          after_revision: 9
          aggregate_digest: "sha256:bb1cbf811a6df73e541b1647fd0bd221cdefda8637a18dbb63b27d80990e7a44"
          before_revision: 8
          command_digest: "sha256:bd2b5074cf41c47c10b435a5ff961f3c64faff40c5266fdcd402e7ea4a15db4e"
          effect_ids: []
          event_digests:
            - "sha256:9568a50f03b2a66df24a2cdd030f66000a42d5b51f394983bbb19063164dc5d8"
          mutation_id: "result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe"
        result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad:
          after_revision: 2
          aggregate_digest: "sha256:04173ad7410a0ef616843c131f5222043d75bb031a8c1c21f1b56afb8ca527fb"
          before_revision: 1
          command_digest: "sha256:952cdb3d83f6314434f794c1c9e75e49a07f1c347e2f9a369f64969768bfb6d4"
          effect_ids: []
          event_digests:
            - "sha256:af15c77b1c7288289d6b152c77a644696b1a24ec49fe8b9bd1faffb3eaab5e9e"
          mutation_id: "result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad"
        scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff:
          after_revision: 8
          aggregate_digest: "sha256:4720dac7e6149b0609253362036d0c45166f56890507608707cf7ffcb378213f"
          before_revision: 7
          command_digest: "sha256:305e7853d27c1e50e870111ea916540be1996938f30160766bb4474de15ca4c0"
          effect_ids: []
          event_digests:
            - "sha256:5389939cc7f6a48a4a6f3d8c7ce37a649ca250b7c9b4d6e0d9285ba05cc91656"
          mutation_id: "scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff"
        semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c:
          after_revision: 14
          aggregate_digest: "sha256:e27ce0f1a5000f66f38d78becd331e5a8e636d4f415eed1bf71f3056cc70dab0"
          before_revision: 13
          command_digest: "sha256:ca6efe6cc0ab8e4a42e8a4e0eeb2ca2a2ffabff976500cd9d35514e4aed891e3"
          effect_ids: []
          event_digests:
            - "sha256:20f473e32bf80f060ba572bd87119a83cfae9402320e05ecc4e6c3815190fb70"
          mutation_id: "semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c"
        semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1:
          after_revision: 7
          aggregate_digest: "sha256:f3101bc1eb9899d88ab2d2e2375ca0881a269601367e79c0848bee94f597cdf5"
          before_revision: 6
          command_digest: "sha256:3e7cd6c9cff8f299fa6234ab6182eae55725ff6e2ecf6f18adb621b773352cc7"
          effect_ids: []
          event_digests:
            - "sha256:a2ba7b554d0f2bbb95497bae921312f2144de57cafbf929c18053c4f76aec65b"
          mutation_id: "semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1"
        sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac:
          after_revision: 13
          aggregate_digest: "sha256:ff2c9f808f16f00c58c125da1237ef48c95153ea4183f1684e0110609d72bfa1"
          before_revision: 12
          command_digest: "sha256:8b1a46410805bddff1cb4cc2c9e834a994d13cbd3980f44d3eb6568daab0c546"
          effect_ids: []
          event_digests:
            - "sha256:129928421e6ebbb5ba023114f0bc42724e7a1e2f94fa77cb12bad0b7ceb4b9e5"
          mutation_id: "sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac"
        sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a:
          after_revision: 3
          aggregate_digest: "sha256:c98a2d9d53fdfdef862fed9f860b167830ca6f2b02137964e0b3a45dc69a8c03"
          before_revision: 2
          command_digest: "sha256:1b3d501550908aa1fb04c713a56340dcec200a85f7df3a70d5a6f80a67091b50"
          effect_ids: []
          event_digests:
            - "sha256:3111602d00f5c7d4b5e442876474967b3bb809502d1a3216409da08035cd7732"
          mutation_id: "sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a"
        sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67:
          after_revision: 16
          aggregate_digest: "sha256:4519e08069e54da1a6058d5e54a7dfa9f9464c74ab5af18058ccf87eff9637c3"
          before_revision: 15
          command_digest: "sha256:99d5b9c5c5aa2db6629231b004cae00762b5285091ba4a10a5975359f3ec1773"
          effect_ids: []
          event_digests:
            - "sha256:43605c14cec41a93cf0ee27ae0f813914ab9b5e4f9f8f30a111a9d4563877288"
          mutation_id: "sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67"
        sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37:
          after_revision: 10
          aggregate_digest: "sha256:7d468978fe92a9bcdcda206b43d9ad012af60f4c8e5eda27d6716bd4722db8d8"
          before_revision: 9
          command_digest: "sha256:39b6d944e8e1cf557573f112f45cecb626891bf92e2bceb471740775d8690385"
          effect_ids: []
          event_digests:
            - "sha256:bd413e3a4a4c3070565a2dc11fd939b25fb20e4d61757481888d1b8e024dde6a"
          mutation_id: "sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:e16dab7c90622938d52df6cd0a36b7e68601f036a01a3cd91fdc68c264e9b259"
          digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:128748307635320a795e1f3361b14b80175834307631dc650e041e70753caf77"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
          digest: "sha256:47a8364a6762d41ca569f119563ea3789d47cbaabad9474590f4be1194b1f71c"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:06d5154b59be5fe7886d81c9973e9b1476dafd57ee9758cfb7b44233bc32f589"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
      revision: 18
      schema_version: 1
      state: "ACTIVE"
      work_items:
        integrate-reviewed-nine-sources:
          attempt: 3
          claim_id: "sha256:a8ec7ba5a39fa90e678f2f9324a648f42e9303f0b6ac4e1498447bbc04900b37"
          definition:
            contract_digest: "sha256:fee731108c11b8502e73e6e8e6199ade2ca89c30530dc77713815f67dbdbea1e"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
            expected_outputs:
              - "nine-source-adoption-report"
            id: "integrate-reviewed-nine-sources"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 13
          state: "EXECUTING"
          validation: null
    digest: "sha256:6ff1cb1d256b4f0261a78f441ba42afc27bebbc488059db356c128e7bfd2dfc0"
    documents:
      contracts:
        sha256:06d5154b59be5fe7886d81c9973e9b1476dafd57ee9758cfb7b44233bc32f589:
          acceptance_criteria:
            - "Adopt exactly the nine selected deltas and target hashes from the frozen AP9 preflight/patch. Recheck all nine canonical preimages. Stop on changed base, changed source pin or nonunique hunk. Use narrow selected XTX hunks where donor and canonical preimages differ; no whole donor checkout copy."
            - "Preserve canonical assertHookRunnerReady import/call, ensureReconciledBeforeMutation taskIds:[opts.taskId] and its test assertion. Preserve every unrelated current canonical path, provider-base guard and historical Task/quality/PR evidence."
            - "Keep selected-commit requireClean false limited to the reviewed scoped caller. Keep default strict cleanliness. Keep pre-push provider-base validation and late race check. Do not publish a component branch based on obsolete main."
            - "Preserve S8 exact failed SIGKILL provenance, committed timeout, successful TERM, actual owned child close and exact negative owned-group probe ESRCH within the existing shared1000ms budget. Preserve TERM/live/unknown/artifact/control errors,120/1000/0 fixture policy and escalation assertions. Do not infer the historical failed PID cause."
            - "Return one source adoption report with donor commits, canonical preimages, selected hunk and target hashes/modes, actual diff and current EXEC binding. Stop before result consumption for ROOT and distinct source review. Do not include future controller/EVAL/provider receipts as implementation outputs."
            - "Run the four correctly routed mandatory commands through native verification after admitted source output. Historical component passes do not count as integrated checks. A genuine independent EVAL and mandatory native npm run ci:local:full are required before delivery. Preserve every historical failed final receipt."
            - "Use only own isolated dependency aliases/store with declared frozen locks. No shared root install or source/lock changes. Serialize all heavy checks with ROOT. Before the final full command, read its actual native deadline and use an outer bound above it (9000s native/9600s outer currently), with reviewed storage cap/free floor and owned-process cleanup."
            - "After local native final checks pass, require separately native-authorized exact-SHA hosted publication, CI and canonical integration readback. The actual USER scope2 admission is retained, but compatibility/current-caller proof still needs fresh verification. Do not infer full AP/Factory0.4.0 acceptance from this eleven-path integration."
            - "Integrate the combined canonical-to-qualified recovery-evidence2 delta, not merely donor2df parent delta: authenticate saved stop command/result/event/receipt before target selection; keep exact current-Plan and admitted prospective-scope behavior; accept native-authenticated target stops across genuine consecutive approved Plan history only when complete target definition is unchanged throughout. Reject tampered/missing/duplicate approvals or receipts, altered then restored targets, stale task/repo/claim/attempt/contracts and unauthenticated unrelated evidence."
            - "Use the canonical-to-qualified patch5ea37c9366fa832b29742e536c20f81cb5b052617038cb2129667c72ea2914ac only after current two canonical preimages and unique contexts match. Preserve current canonical retainedIssuanceAuthority and all unrelated kernel-rework-lineage behavior. Do not copy a donor checkout or import a third lineage source. Test actual canonical kernel-recovery-evidence and kernel-rework-lineage callers plus the mandatory full regression."
            - "Use current root registered bun run typecheck for explicit Plan2 verification. It executes scripts/checks/run-typescript-build.mjs with the root project graph. This intentionally replaces Plan1 legacy bun run --filter=agentplane typecheck; preserve the old literal and all its historical receipts in Plan1. Keep both original test commands unchanged and add the actual recovery/lineage suite. Do not treat historical legacy remap as fresh canonical type proof."
            - "Preserve original Plan1, BLOCKED attempt1 claim8f4cb3bc1842060456732d66542ce8dc7d071eefd9b312c77cbbcb1b838b951b, received bef187 result and authenticated request66ca/USERgrant9c0b history. Let native reconciliation apply the changed definition: PLANNED/current claimnull with old attempt1 retained, then obtain a fresh issued EXEC/claim before source edits. No manual state reset, receipt rewrite, old result replay or status fabrication."
          objective: "Integrate exactly eleven reviewed canonical deltas onto d886917970bc0724b419074b7d575d47d9c95c1b. Preserve current hook readiness/taskIds and every unselected canonical file. Source9 accepted XTX767e460334dd0f3739bea997265c141d85d5ad74/M293438ee27f258e8a13c3e55207e917d465c14462/S899eb5f28ef4d5d24268bb3a1e2525a41be14732b and combined recovery2 donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da require narrow patch application with verified current preimages. Use existing frozen reports /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json and /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/7GA2-compatibility-addendum.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts=2f3957f3a50eb94886d1ace054f0c2be6cfe18732e2063259fda4f06d0e08ba9; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts=172a8c78db090147d4eb1097d57e5bd1da5a215040f1ef53fab262bf9015971b; packages/agentplane/src/runner/process-supervision/timeout-controller.ts=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114; packages/agentplane/src/commands/task/kernel-recovery-evidence.ts=3c64a6385a1149bc1d4b216c33c7a428689fe2b6658bebbc9d6c1b0112a0b4bf; packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts=2338be34b330280923a5728543b18ddb222ee4667f5231b3053fb3b0b36cf673. Stop before implementation-result intake for distinct source review; output only the actual source adoption proof, not future native/EVAL/provider receipts."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:128748307635320a795e1f3361b14b80175834307631dc650e041e70753caf77:
          acceptance_criteria:
            - "Before any implementation, report the missing two required recovery-evidence paths through the genuine fresh EXEC typed blocked scope_request. Request only kernel-recovery-evidence.ts and its existing test file under packages/agentplane/src/commands/task; keep external effects empty. Do not write code or mark this work item complete before native request approval and an admitted replacement Plan. Keep this initial Plan within all nine intake scope roots."
            - "Adopt exactly the nine selected deltas and target hashes from the frozen AP9 preflight/patch. Recheck all nine canonical preimages. Stop on changed base, changed source pin or nonunique hunk. Use narrow selected XTX hunks where donor and canonical preimages differ; no whole donor checkout copy."
            - "Preserve canonical assertHookRunnerReady import/call, ensureReconciledBeforeMutation taskIds:[opts.taskId] and its test assertion. Preserve every unrelated current canonical path, provider-base guard and historical Task/quality/PR evidence."
            - "Keep selected-commit requireClean false limited to the reviewed scoped caller. Keep default strict cleanliness. Keep pre-push provider-base validation and late race check. Do not publish a component branch based on obsolete main."
            - "Preserve S8 exact failed SIGKILL provenance, committed timeout, successful TERM, actual owned child close and exact negative owned-group probe ESRCH within the existing shared1000ms budget. Preserve TERM/live/unknown/artifact/control errors,120/1000/0 fixture policy and escalation assertions. Do not infer the historical failed PID cause."
            - "Return one source adoption report with donor commits, canonical preimages, selected hunk and target hashes/modes, actual diff and current EXEC binding. Stop before result consumption for ROOT and distinct source review. Do not include future controller/EVAL/provider receipts as implementation outputs."
            - "Run the three correctly routed mandatory focused commands through native verification after admitted source output. Historical component passes do not count as integrated checks. A genuine independent EVAL and mandatory native npm run ci:local:full are required before delivery. Preserve every historical failed final receipt."
            - "Use only own isolated dependency aliases/store with declared frozen locks. No shared root install or source/lock changes. Serialize all heavy checks with ROOT. Before the final full command, read its actual native deadline and use an outer bound above it (9000s native/9600s outer currently), with reviewed storage cap/free floor and owned-process cleanup."
            - "After current local final checks pass, require separate native-authorized exact-SHA hosted publication, CI and canonical integration readback. No source task grant permits those effects. The new 7GA recovery-evidence two-path delivery remains an open compatibility and genuine scope-admission gate. Nine-path success is not complete AP/Factory0.4.0 release acceptance."
            - "The subsequent eleven-root Plan must preserve all existing nine target pins and mandatory commands/full CI. It must state the combined earlier qualified recovery semantics and 7GA unchanged-approved-history behavior from donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da relative to canonical d886, not only donor-parent delta. Preserve current canonical retainedIssuanceAuthority and unrelated lineage behavior. Require fresh kernel-recovery-evidence and kernel-rework-lineage tests on actual current callers, then integrated native ci:local:full. Do not import a third lineage source or claim pending 7GA EVAL completed."
          objective: "FIRST, before any source or dependency change, inspect the required current canonical recovery-evidence integration prerequisites. The accepted nine-source integration now requires two additional files: packages/agentplane/src/commands/task/kernel-recovery-evidence.ts, packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts. They are outside this Plan and current trusted nine-root ceiling. Return an honest typed BLOCKED scope_request for precisely these two paths with no new external effects, using the actual fresh EXEC binding and native request schema. Do not fabricate a request, edit outside scope, adopt nine source files first, or claim completion. Let the native controller emit an authentic request and its USER approval route. Only a later genuine approved replacement Plan and fresh EXEC may integrate all eleven paths. Preserve these downstream nine-source requirements: Integrate only accepted XTX3 commit767e460334dd0f3739bea997265c141d85d5ad74, M2 commit93438ee27f258e8a13c3e55207e917d465c14462 and S8runner4 commit99eb5f28ef4d5d24268bb3a1e2525a41be14732b into canonical d886917970bc0724b419074b7d575d47d9c95c1b using reviewed patch df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef. Source provenance report is /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts targetSHA256=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts targetSHA256=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts targetSHA256=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts targetSHA256=2f3957f3a50eb94886d1ace054f0c2be6cfe18732e2063259fda4f06d0e08ba9; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts targetSHA256=172a8c78db090147d4eb1097d57e5bd1da5a215040f1ef53fab262bf9015971b; packages/agentplane/src/runner/process-supervision/timeout-controller.ts targetSHA256=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts targetSHA256=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts targetSHA256=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts targetSHA256=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114"
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run --filter=agentplane typecheck"
        sha256:fee731108c11b8502e73e6e8e6199ade2ca89c30530dc77713815f67dbdbea1e:
          acceptance_criteria:
            - "Adopt exactly the nine selected deltas and target hashes from the frozen AP9 preflight/patch. Recheck all nine canonical preimages. Stop on changed base, changed source pin or nonunique hunk. Use narrow selected XTX hunks where donor and canonical preimages differ; no whole donor checkout copy."
            - "Preserve canonical assertHookRunnerReady import/call, ensureReconciledBeforeMutation taskIds:[opts.taskId] and its test assertion. Preserve every unrelated current canonical path, provider-base guard and historical Task/quality/PR evidence."
            - "Keep selected-commit requireClean false limited to the reviewed scoped caller. Keep default strict cleanliness. Keep pre-push provider-base validation and late race check. Do not publish a component branch based on obsolete main."
            - "Preserve S8 exact failed SIGKILL provenance, committed timeout, successful TERM, actual owned child close and exact negative owned-group probe ESRCH within the existing shared1000ms budget. Preserve TERM/live/unknown/artifact/control errors,120/1000/0 fixture policy and escalation assertions. Do not infer the historical failed PID cause."
            - "Return one source adoption report with donor commits, canonical preimages, selected hunk and target hashes/modes, actual diff and current EXEC binding. Stop before result consumption for ROOT and distinct source review. Do not include future controller/EVAL/provider receipts as implementation outputs."
            - "Run the four correctly routed mandatory commands through native verification after admitted source output. Historical component passes do not count as integrated checks. A genuine independent EVAL and mandatory native npm run ci:local:full are required before delivery. Preserve every historical failed final receipt."
            - "Use only own isolated dependency aliases/store with declared frozen locks. No shared root install or source/lock changes. Serialize all heavy checks with ROOT. Before the final full command, read its actual native deadline and use an outer bound above it (9000s native/9600s outer currently), with reviewed storage cap/free floor and owned-process cleanup."
            - "After local native final checks pass, require separately native-authorized exact-SHA hosted publication, CI and canonical integration readback. The actual USER scope2 admission is retained, but compatibility/current-caller proof still needs fresh verification. Do not infer full AP/Factory0.4.0 acceptance from this eleven-path integration."
            - "Integrate the combined canonical-to-qualified recovery-evidence2 delta, not merely donor2df parent delta: authenticate saved stop command/result/event/receipt before target selection; keep exact current-Plan and admitted prospective-scope behavior; accept native-authenticated target stops across genuine consecutive approved Plan history only when complete target definition is unchanged throughout. Reject tampered/missing/duplicate approvals or receipts, altered then restored targets, stale task/repo/claim/attempt/contracts and unauthenticated unrelated evidence."
            - "Use the canonical-to-qualified patch5ea37c9366fa832b29742e536c20f81cb5b052617038cb2129667c72ea2914ac only after current two canonical preimages and unique contexts match. Preserve current canonical retainedIssuanceAuthority and all unrelated kernel-rework-lineage behavior. Do not copy a donor checkout or import a third lineage source. Test actual canonical kernel-recovery-evidence and kernel-rework-lineage callers plus the mandatory full regression."
            - "Use current root registered bun run typecheck for explicit Plan2 verification. It executes scripts/checks/run-typescript-build.mjs with the root project graph. This intentionally replaces Plan1 legacy bun run --filter=agentplane typecheck; preserve the old literal and all its historical receipts in Plan1. Keep both original test commands unchanged and add the actual recovery/lineage suite. Do not treat historical legacy remap as fresh canonical type proof."
            - "Preserve original Plan1, BLOCKED attempt1 claim8f4cb3bc1842060456732d66542ce8dc7d071eefd9b312c77cbbcb1b838b951b, received bef187 result and authenticated request66ca/USERgrant9c0b history. Let native reconciliation apply the changed definition: PLANNED/current claimnull with old attempt1 retained, then obtain a fresh issued EXEC/claim before source edits. No manual state reset, receipt rewrite, old result replay or status fabrication."
          objective: "Current normative frozen AP9 preflight/patch for this refined contract is /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/reviewed-publication-correction2-proposed-freeze.v2.json (raw SHA256 fd92f2cb0a558abdd38c3fce4297129083db93d0dbd84aa70c486f325f742497) and its exact referenced patch SHA256 673684b58ff96fe5c078f50f447d07e4948b471f9772daa74ae6bc2850bc2dca. The two corrected postimages are proposed in-memory, not applied or tested; obtain fresh source execution and all existing native gates. This freeze supersedes ONLY the open.ts and existing pr-open validation test target pins from Plan2; the other nine targets/preimages/modes, all twelve mandatory acceptance criteria and all four verification commands remain unchanged. Original adoption hash verification is historical evidence, not a claim that its two faulty final targets satisfy the refined contract. Integrate exactly eleven reviewed canonical deltas onto d886917970bc0724b419074b7d575d47d9c95c1b. Preserve current hook readiness/taskIds and every unselected canonical file. Source9 accepted XTX767e460334dd0f3739bea997265c141d85d5ad74/M293438ee27f258e8a13c3e55207e917d465c14462/S899eb5f28ef4d5d24268bb3a1e2525a41be14732b and combined recovery2 donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da require narrow patch application with verified current preimages. Historical original adoption references (retained unchanged; superseded only for the two publication target pins below): /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json and /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/7GA2-compatibility-addendum.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts=3f7f41126f26d43acfbdeaa0bc233ea3b9a1c81b6d139a917191c6ea412dce00; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts=53f84c9e9d2b7a574015b8b52033b537e2bae41f37d541a01d183c5f22832378; packages/agentplane/src/runner/process-supervision/timeout-controller.ts=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114; packages/agentplane/src/commands/task/kernel-recovery-evidence.ts=3c64a6385a1149bc1d4b216c33c7a428689fe2b6658bebbc9d6c1b0112a0b4bf; packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts=2338be34b330280923a5728543b18ddb222ee4667f5231b3053fb3b0b36cf673. Stop before implementation-result intake for distinct source review; output only the actual source adoption proof, not future native/EVAL/provider receipts."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      intent:
        context: "Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness."
        objective: "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main"
    events:
      -
        command_digest: "sha256:e65c42f6e12a2bc40436a043475b62760bdb86069baf58bf89ef40820d4aa372"
        id: "capture:202610120014-1C3ZFG:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610120014-1C3ZFG"
        occurred_at: "2026-10-12T00:14:19.697Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610120014-1C3ZFG"
        task_revision: 1
      -
        command_digest: "sha256:952cdb3d83f6314434f794c1c9e75e49a07f1c347e2f9a369f64969768bfb6d4"
        id: "result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad"
        occurred_at: "2026-10-12T01:15:49.775Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 2
      -
        command_digest: "sha256:1b3d501550908aa1fb04c713a56340dcec200a85f7df3a70d5a6f80a67091b50"
        id: "sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a"
        occurred_at: "2026-10-12T01:15:53.359Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610120014-1C3ZFG"
        task_revision: 3
      -
        command_digest: "sha256:e6f3141ad5b0173ceab73a702b5c1946f3f7e29aa9202ce9e23cbb6a6367e3eb"
        id: "kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T01:15:56.777Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610120014-1C3ZFG"
        task_revision: 4
      -
        command_digest: "sha256:f8586dcbbd9eda77119c392b468bd933e85c94c327a6ed2c2e6fb4d198b101ce"
        id: "kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T01:16:01.279Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 5
      -
        command_digest: "sha256:09de1609ff9b6573ef6a9d5f264b2fbf6610c35dbc026c67edde92d034d2a6db"
        id: "kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T01:32:46.980Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610120014-1C3ZFG"
        task_revision: 6
      -
        command_digest: "sha256:3e7cd6c9cff8f299fa6234ab6182eae55725ff6e2ecf6f18adb621b773352cc7"
        id: "semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1"
        occurred_at: "2026-10-12T01:50:48.305Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610120014-1C3ZFG"
        task_revision: 7
      -
        command_digest: "sha256:305e7853d27c1e50e870111ea916540be1996938f30160766bb4474de15ca4c0"
        id: "scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff"
        occurred_at: "2026-10-12T01:58:52.756Z"
        payload_digest: "sha256:6d4864c6e4d0c5594bd4a31a49dfe348c20c67cd0af684ed6be79b7296cf62d9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 8
      -
        command_digest: "sha256:bd2b5074cf41c47c10b435a5ff961f3c64faff40c5266fdcd402e7ea4a15db4e"
        id: "result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe"
        occurred_at: "2026-10-12T06:57:48.215Z"
        payload_digest: "sha256:f80912d878ce58d21ba34768e330f6973abfbf9bf6a3eda182ae6d678dbee5c4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 9
      -
        command_digest: "sha256:39b6d944e8e1cf557573f112f45cecb626891bf92e2bceb471740775d8690385"
        id: "sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37"
        occurred_at: "2026-10-12T06:57:50.727Z"
        payload_digest: "sha256:f0ae1b10cd0c3234aabbd723e45e4261948525d979de764450f482c176e17b05"
        task_id: "202610120014-1C3ZFG"
        task_revision: 10
      -
        command_digest: "sha256:7d992a86e371c839df36b3b4d67bdf446346682339d27ca6e43693cce63cd4cf"
        id: "kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T06:57:54.137Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610120014-1C3ZFG"
        task_revision: 11
      -
        command_digest: "sha256:eed8ea15fecd5132089edd890cdb6ac133fa6f5737fa19017c8d7d8450b3bade"
        id: "kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T06:57:56.729Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 12
      -
        command_digest: "sha256:8b1a46410805bddff1cb4cc2c9e834a994d13cbd3980f44d3eb6568daab0c546"
        id: "sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac"
        occurred_at: "2026-10-12T08:20:13.715Z"
        payload_digest: "sha256:5ddca350e3d922e32801a968518ee6b89afaf32271d2c1266857b9fa8c5d8c8d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 13
      -
        command_digest: "sha256:ca6efe6cc0ab8e4a42e8a4e0eeb2ca2a2ffabff976500cd9d35514e4aed891e3"
        id: "semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c"
        occurred_at: "2026-10-12T08:20:15.805Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610120014-1C3ZFG"
        task_revision: 14
      -
        command_digest: "sha256:d72fae62d33f32f17bbf52d5cc7a726df271423cd196d5d323a2cfcb4e922529"
        id: "amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
        occurred_at: "2026-10-12T08:20:20.854Z"
        payload_digest: "sha256:36be904ca7a7b0203be7b7ae9baf0f6b429970e74f83ac756501ba6bd5218510"
        task_id: "202610120014-1C3ZFG"
        task_revision: 15
      -
        command_digest: "sha256:99d5b9c5c5aa2db6629231b004cae00762b5285091ba4a10a5975359f3ec1773"
        id: "sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67"
        occurred_at: "2026-10-12T08:20:22.345Z"
        payload_digest: "sha256:78dd6ac649c565c35490aeb70160706aa88aa733ec122055c0a70e463bd68bc9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 16
      -
        command_digest: "sha256:d460efc3a38a416813fa540aa18ed5c528b7f44aec584e9add0f7b71444a570f"
        id: "kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        occurred_at: "2026-10-12T08:59:10.895Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610120014-1C3ZFG"
        task_revision: 17
      -
        command_digest: "sha256:dcaa9209d35bde8ce88f3c2061eb2d661819946318b74830a2e06bd0c63384a1"
        id: "kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        occurred_at: "2026-10-12T08:59:13.082Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 18
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main

Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.

## Scope

- In scope: Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.
- Out of scope: unrelated refactors not required for "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main".

## Plan

1. Execute approved WorkItem integrate-reviewed-nine-sources.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run --filter=agentplane typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `npm run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
