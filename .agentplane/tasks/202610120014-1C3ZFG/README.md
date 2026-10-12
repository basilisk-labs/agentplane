---
id: "202610120014-1C3ZFG"
title: "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 73
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
  updated_at: "2026-10-12T20:38:34.359Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-12T18:04:44.260Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:1852371885ab3272ccd7f1a9471cdc2ac7ca5930105ea4a607ddab61ba479807"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-12T19:51:16.526Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "20d5b72866a22bf105c64719cf720b92f3e6494c"
  review_identity_digest: "sha256:9efb379137bbf4403bd2caea53fc151dbb432ef646d0cd917d8d3fee0784adc0"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc/quality-report.json"
  findings:
    - "Committed corrective delta is exactly five existing admitted files: formatter changes, typed guard mock, equivalent property-key string conversion and default actor placement, equivalent negative-case switch with required braces. Assertions and authentication gates retained."
    - "All fifteen committed source hashes match frozen final source; ten unrelated targets unchanged. Original completed work-item runtime, validation and output evidence retained exactly."
    - "Actual native run-013:54/54 across seven files; run-014:14/14; run-015:registered root typecheck; run-016:89/89 across two files. All native manifests/raw logs complete and bound to current implementation, commands, toolchain and environment."
    - "Thirteen required context blocks, accepted implementation bac681, report efccd, repository evidence and native input17e488/validation49ee digests independently verified. Prior failed full evidence12acd and previous EVAL remain historical, not replaced."
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
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
      - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
      - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
          - "packages/agentplane/src/commands/task/kernel-exchange.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
          - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
          - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
          - "packages/agentplane/src/runner/process-supervision/run.ts"
          - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
      digest: "sha256:4c348e2221536f6c51a809b9251dc00a79efbc2d3847a740a18555b8c2409bc1"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/index.ts"
        - "central_component:packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_component:packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
commit:
  hash: "20d5b72866a22bf105c64719cf720b92f3e6494c"
  message: "AgentPlane-owned canonical implementation commit"
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
  Plan: |-
    1. Execute approved WorkItem integrate-reviewed-nine-sources.
    2. Execute approved WorkItem final-correction-12acd7c9fe60.
    3. Execute approved WorkItem final-correction-cca82dcaef21.
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
  agentplane.kernel_operational_projection:
    digest: "sha256:94a85a3849c81e1532b817d6edc492f5487c998d8aa95acb088abb2a6f2de23a"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc/quality-report.json"
    findings:
      - "Committed corrective delta is exactly five existing admitted files: formatter changes, typed guard mock, equivalent property-key string conversion and default actor placement, equivalent negative-case switch with required braces. Assertions and authentication gates retained."
      - "All fifteen committed source hashes match frozen final source; ten unrelated targets unchanged. Original completed work-item runtime, validation and output evidence retained exactly."
      - "Actual native run-013:54/54 across seven files; run-014:14/14; run-015:registered root typecheck; run-016:89/89 across two files. All native manifests/raw logs complete and bound to current implementation, commands, toolchain and environment."
      - "Thirteen required context blocks, accepted implementation bac681, report efccd, repository evidence and native input17e488/validation49ee digests independently verified. Prior failed full evidence12acd and previous EVAL remain historical, not replaced."
    implementation_commit: "20d5b72866a22bf105c64719cf720b92f3e6494c"
    implementation_tree: "3d627c7125ca4061441fe9e53d1e385244dc9184"
    projected_at: "2026-10-12T19:51:16.526Z"
    review_identity_digest: "sha256:9efb379137bbf4403bd2caea53fc151dbb432ef646d0cd917d8d3fee0784adc0"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:d884e545eee7f77ab014ee14bf02561de82e20901d04b3d7690f4fa8f76daed1"
    work_order_id: "sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0ca6529ef7b80c027d0256419e83c9b470fcc7c3977591c1ed70e4266e722227"
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
              parent_authority_digest: "sha256:3715fc22cc3b1871939c952cf7e9513597a037bd3785cc78affb9a95ccd7ec10"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
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
              - "packages/agentplane/src/commands/pr/open.ts"
            evidence_digest: "sha256:aef12a68cceed3a71bf23653b6fc7a82576312c7ed9de24b2e6b1f523624f64d"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b71155adcb39cd55eae902a60ea7f0212a96864e76f194466400c670f8cfd351"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "USER"
              parent_authority_digest: "sha256:0ca6529ef7b80c027d0256419e83c9b470fcc7c3977591c1ed70e4266e722227"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
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
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
            evidence_digest: "sha256:e1b98a57c1f7eeb8c87cddc5814184d917a72785de8ccd2afe5d2b06190384d3"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
            request_digest: "sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8"
            scope_request:
              attempt: 4
              claim_id: "sha256:f23068fa8e569a422fd3b2a25a4b1528db802132874af2bb254667cfa875ab67"
              contract_digest: "sha256:fee731108c11b8502e73e6e8e6199ade2ca89c30530dc77713815f67dbdbea1e"
              intake_after_digest: "sha256:2aeb0d264db4258ed73dd5294f513f14228b102368ed41d2cebe658ee19fce1e"
              intake_before_digest: "sha256:71fb1bc85ace415bad00d1535f3040f48bbc68879c45ab868a5990855e940e21"
              parent_authority_digest: "sha256:0ca6529ef7b80c027d0256419e83c9b470fcc7c3977591c1ed70e4266e722227"
              plan_digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
              plan_revision: 3
              record_digest: "sha256:23f08c37be25d4edd9287f3b050c3d1817d41cb739b6c7cd82a8c857f99201b9"
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:5b050622fe1e6f81bb3de3ea1c959821b3aebde31fa16c156bbcb72ac8590eb9"
              scope_roots:
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              stop_receipt_digest: "sha256:483c4c5c8ea9312b7d21a91f4c2194fbcfe62397c75f096a7f88ce26db269f08"
              task_id: "202610120014-1C3ZFG"
              task_revision: 26
              work_item_id: "integrate-reviewed-nine-sources"
              work_order_id: "sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:feeadf855d918ad0da14b7062bb618aeab18305a0d9be59e45bef27cee6f48c8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
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
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
            digest: "sha256:2f39a04c16d27fce94634555b7d9a4e0f65479c62d50fa0a6880709a43c5e0e0"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:feeadf855d918ad0da14b7062bb618aeab18305a0d9be59e45bef27cee6f48c8"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
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
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            evidence_digest: "sha256:1e0ea05b17d88951ee654fea9e1c6c9e68595bf1c9cec62c20f7d62ddd334964"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:31bc7b9f2b74f65a5789d967028f360f1fea00c9794c6e160ffb6d502bc8f4b7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
            plan_revision: 5
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2f39a04c16d27fce94634555b7d9a4e0f65479c62d50fa0a6880709a43c5e0e0"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
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
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
            evidence_digest: "sha256:890b6ba87a83562a52f39edab5b0c5ca4f2ae63866885a981c73dbd68ba4ca9a"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a69ffe1125100ab60dc49c3e8f040f65265071b36c42ea807810768584e7f3ed"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
            plan_revision: 5
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:31bc7b9f2b74f65a5789d967028f360f1fea00c9794c6e160ffb6d502bc8f4b7"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
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
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
            evidence_digest: "sha256:2ba4668aaf27aa197db6197085b4cb28a1d3d3b4e81bd33112caf03cf263f410"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d3501461bed92f4d3bb1d25699f8fb4abcf616def96ac556dafd85edfdac7281"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
            plan_revision: 6
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:a69ffe1125100ab60dc49c3e8f040f65265071b36c42ea807810768584e7f3ed"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
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
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
            evidence_digest: "sha256:dc53aada530f5cadf3d495bcc1ddc9065bb948382703b98945cbfd344e41eda8"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:455e006bd39438ac4d51b314c1ddfcb85d2c9944e8b36a9d4550051a0d3fcb56"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
            plan_revision: 6
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "USER"
              parent_authority_digest: "sha256:d3501461bed92f4d3bb1d25699f8fb4abcf616def96ac556dafd85edfdac7281"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
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
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
            evidence_digest: "sha256:47ecaa3f55e926c128ddded5cb5fb2b1107dd731f63af880d92ca206738d6dd0"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
            request_digest: "sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32"
            scope_request:
              attempt: 1
              claim_id: "sha256:703d3b34b74f9018b4d7b2912164915c6b30e960ac7ab71545ddcf42944ab981"
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              intake_after_digest: "sha256:0c15215af6a651228d83528e33e5d252362a77ff7d741473b52d7eef48d4099e"
              intake_before_digest: "sha256:2aeb0d264db4258ed73dd5294f513f14228b102368ed41d2cebe658ee19fce1e"
              parent_authority_digest: "sha256:d3501461bed92f4d3bb1d25699f8fb4abcf616def96ac556dafd85edfdac7281"
              plan_digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
              plan_revision: 6
              record_digest: "sha256:da0a4f368b9438730cfbb0e55c873ef2414dabc09a93a3ed6f889aa294231155"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:4465bedd41f427f4cf44e386616b84a4bea7d654d8377cc1154be9200cef219c"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              stop_receipt_digest: "sha256:091580e948dee8318b37116e0141acedfa086ecd257ddf2a192bf9f475093e40"
              task_id: "202610120014-1C3ZFG"
              task_revision: 52
              work_item_id: "final-correction-cca82dcaef21"
              work_order_id: "sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2e2b13dec9479c8f90995eab8470684272f53abf83d98b9dde423d7e27b03e82"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
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
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
            digest: "sha256:7a0629fd6498b8812a81205555f95f3cf2c64c4bea64f9fb9f748f975f37e68d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2e2b13dec9479c8f90995eab8470684272f53abf83d98b9dde423d7e27b03e82"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
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
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
            evidence_digest: "sha256:2f928c45a6b5e1c09e176518b399616558e9f220e9eb7451bc654e2923e2df43"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:85b6279045980b7669fa2998742e1f7805430c33cb08ff590ddacf6e020a97b4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
              kind: "USER"
              parent_authority_digest: "sha256:7a0629fd6498b8812a81205555f95f3cf2c64c4bea64f9fb9f748f975f37e68d"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
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
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
            evidence_digest: "sha256:b87bc995c850d109a0375f09ae2741a8d69e88cb4ba62c6c1c0ecbffccd56e5c"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
            request_digest: "sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe"
            scope_request:
              attempt: 2
              claim_id: "sha256:85dab8846a5096a51e0044c65e40a337c0d1b88fca88a75efbc32ef1b59fe550"
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              intake_after_digest: "sha256:4ce5b62304809804366a927d9922fe49e8236c88da3acbbf9ea057da525e692d"
              intake_before_digest: "sha256:0c15215af6a651228d83528e33e5d252362a77ff7d741473b52d7eef48d4099e"
              parent_authority_digest: "sha256:7a0629fd6498b8812a81205555f95f3cf2c64c4bea64f9fb9f748f975f37e68d"
              plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
              plan_revision: 7
              record_digest: "sha256:b0ff55cf7108a0e86eafc42f6fe6a12822879bc2102a44577603b7a58803c5fe"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:8e60c08bc74d839150d2446d624ea9fb5d778fde6a45b81100227d1e6fd762ba"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
              stop_receipt_digest: "sha256:9243351a8a4a024097c9f63b9962f4e4db0d60573bf3b47584e21ead05da077e"
              task_id: "202610120014-1C3ZFG"
              task_revision: 59
              work_item_id: "final-correction-cca82dcaef21"
              work_order_id: "sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d22edfe5bc7b1e508f4320b5dcb6544871e57676e622e1bef76b43902e339c35"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
            plan_revision: 8
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
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
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
        approval_evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
        digest: "sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
        revision: 8
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
            expected_outputs:
              - "nine-source-adoption-report"
            id: "integrate-reviewed-nine-sources"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
            depends_on:
              - "integrate-reviewed-nine-sources"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
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
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-12acd7c9fe60-evidence"
            id: "final-correction-12acd7c9fe60"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
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
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
            expected_outputs:
              - "final-correction-cca82dcaef21-evidence"
            id: "final-correction-cca82dcaef21"
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
        amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e:
          after_revision: 38
          aggregate_digest: "sha256:800c4f931f9421b0dcc6217b94589638e74a1a189ca0fdc7663ce78b7290ab55"
          before_revision: 37
          command_digest: "sha256:caf1f5214eb39986751da09a7d8ae67a4d30b1dc779858746e79f3bb9339fb47"
          effect_ids: []
          event_digests:
            - "sha256:246433deaf9d36c1e459ef4d53a5b88c6555f1121c4839aedf91376a9a324d0a"
          mutation_id: "amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
        amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215:
          after_revision: 48
          aggregate_digest: "sha256:247270b92deae27ce66ec0be9e73466ff09e9557e0453c594054f83869ccd1de"
          before_revision: 47
          command_digest: "sha256:4c1d32c162d28b154a9f80499d41e367ce89bd94ceadf75315959840521ed3cb"
          effect_ids: []
          event_digests:
            - "sha256:2e7aec175237ab9362e9ed7108f85965c7ddcd84a34664ad2dd6f8ddc1a86413"
          mutation_id: "amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
        capture:202610120014-1C3ZFG:
          after_revision: 1
          aggregate_digest: "sha256:2aa9c62c53ba9d034aadecb212dcec78d1f744e47e17238bc565f92d40c6ea0c"
          before_revision: 0
          command_digest: "sha256:e65c42f6e12a2bc40436a043475b62760bdb86069baf58bf89ef40820d4aa372"
          effect_ids: []
          event_digests:
            - "sha256:648281817048191f4a538e41fe5c12c3e4c4bb7c818905d8b1d786898d4c09a7"
          mutation_id: "capture:202610120014-1C3ZFG"
        final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36:
          after_revision: 37
          aggregate_digest: "sha256:c59f06f1ff958950ebdb1b2fb1d723184a7e10d0536d2543b7d34dd65973e801"
          before_revision: 36
          command_digest: "sha256:49ba5ee6c487533388c0ff75667edf2d9ae5c3ceba07f40095f74b72f5b20064"
          effect_ids: []
          event_digests:
            - "sha256:be743d36e37658904a43d6e91b2b22b42220a83d41edd7398b242e68de8c49ed"
          mutation_id: "final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36"
        final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46:
          after_revision: 47
          aggregate_digest: "sha256:089ddd5e86ddafa63b9a7b7acb4e82dcac87afe643465ac0999431cc1f5d7da6"
          before_revision: 46
          command_digest: "sha256:7833125078f252f8f5b8de69d4cc14f63ccdd6c713724ca53e27d6490cb58c56"
          effect_ids: []
          event_digests:
            - "sha256:713aa4aa5c481d044e74850c8d8c4f07c63dd0db0385c46ead8b6e4af1800421"
          mutation_id: "final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46"
        kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 30
          aggregate_digest: "sha256:38081bbeb829d5dda6f92455e3874e44a5d490e86b72e7881ee24afb97079698"
          before_revision: 29
          command_digest: "sha256:d97aa1acba58707ac413a8c5aa470d6cfef0f2f9fe682f137b57dbde55c86ca7"
          effect_ids: []
          event_digests:
            - "sha256:7dbd81cc6c572e80d9d15852bb941571b550764e176c73f1c2890673608efe5b"
          mutation_id: "kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:f40283c800bb11255e8fe475f32dfeac83e78b9eedbf07e2e00ded0262cea693"
          before_revision: 4
          command_digest: "sha256:f8586dcbbd9eda77119c392b468bd933e85c94c327a6ed2c2e6fb4d198b101ce"
          effect_ids: []
          event_digests:
            - "sha256:85ffb66057543622631d3dbc6a182c60212d41739ad2c819bce42f0af4e03430"
          mutation_id: "kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 50
          aggregate_digest: "sha256:a4ca8da777b631f8e7162d82eedaa1b4b3aadc40bab83740391fe97aedec57c4"
          before_revision: 49
          command_digest: "sha256:a6dbed824a9b14322886a5c201152f17619812832525f3a6a1f25c6926442f98"
          effect_ids: []
          event_digests:
            - "sha256:941ca2a53029074c268eb85a49ff122f7add157204e2dae5a578ffe8adcd0179"
          mutation_id: "kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 11
          aggregate_digest: "sha256:0b1f680515c11cc2bfbd2f5cca73b2a7f3bb91581e19189d663c05a3b60236cd"
          before_revision: 10
          command_digest: "sha256:7d992a86e371c839df36b3b4d67bdf446346682339d27ca6e43693cce63cd4cf"
          effect_ids: []
          event_digests:
            - "sha256:d5d39e799a765fc094ea16f7ae3d3a565028d0e8b28ec981784f4211f8904abb"
          mutation_id: "kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:
          after_revision: 40
          aggregate_digest: "sha256:30a45c9d31e7b6aec1f987c9b9fa804c8245724d4902320823f0b93666c1b759"
          before_revision: 39
          command_digest: "sha256:1f30d66cf3598a56573830b09444d0df290b24fda4c972e1f24de053b506e695"
          effect_ids: []
          event_digests:
            - "sha256:039bdbe7de39c9e5152ac550e8d9cfa9cbb98710a0953689cdd460720f0d548d"
          mutation_id: "kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 56
          aggregate_digest: "sha256:f046655ba2c5e9d714693553aeb56d8b85031dc4af0790d2f7f5343bff3743f7"
          before_revision: 55
          command_digest: "sha256:0638bcf1850bbbee27f8ac7e43a036738970f498fa22e674cddfd0cb8b5ccef7"
          effect_ids: []
          event_digests:
            - "sha256:02acb95f8e54a65100cf9be0049b5cf2cf81275c4bbd2dededdbbc90a1da5a63"
          mutation_id: "kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:
          after_revision: 63
          aggregate_digest: "sha256:3f605d1891b210a8d47b42ff42749c36e3a591a6543dc042190c585fcf50bf34"
          before_revision: 62
          command_digest: "sha256:ae2652bf2f4e4ca9147ed9c4700f7f1c801512e715e450c4ca4d522bc1eaef57"
          effect_ids: []
          event_digests:
            - "sha256:fffde09c30beffaca05ecde50ba26806bb01d29bc43b826100ae36cece562d71"
          mutation_id: "kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:
          after_revision: 17
          aggregate_digest: "sha256:c890c40e5b9c6e1342c69093d24b328e6cddcb6f129b257bc1c45f906e17c76c"
          before_revision: 16
          command_digest: "sha256:d460efc3a38a416813fa540aa18ed5c528b7f44aec584e9add0f7b71444a570f"
          effect_ids: []
          event_digests:
            - "sha256:53bb61d3daa69587a898b638930158672c8e911ffad72f12578c43ac09c4c4ba"
          mutation_id: "kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:
          after_revision: 64
          aggregate_digest: "sha256:857aed4b26aced3b839c9b24033ef5c2c9d10426a32b94f58bbcb66da7c381af"
          before_revision: 63
          command_digest: "sha256:911cf86af313ce9d6a54fab99ca5d87ae99462484eb5ae66aaa8c3e7421d85ad"
          effect_ids: []
          event_digests:
            - "sha256:f8267003b40a2828e0ada717a88486d1374bc7aa56be7fb9821de9d444f1d13d"
          mutation_id: "kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 51
          aggregate_digest: "sha256:f104d1c853150d4c11e8544eac927bacf170d25d88b1c4f928c3ec167eca0983"
          before_revision: 50
          command_digest: "sha256:a07704bf98bc1771f05d5e180c58582550a81c53fe17c82f42a005b33f8b02db"
          effect_ids: []
          event_digests:
            - "sha256:bbe40793c7fc0f6ecc3251c29b603fc839f58421690c4dd97915d44ab8103839"
          mutation_id: "kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:9f5a3630d28cad263938a1397d9ef9613461e1aed04753f2e9536812eeef5a15"
          before_revision: 5
          command_digest: "sha256:09de1609ff9b6573ef6a9d5f264b2fbf6610c35dbc026c67edde92d034d2a6db"
          effect_ids: []
          event_digests:
            - "sha256:6580fdded75b3ed5d394d66c93c4bd2c970d1b08c653f8b68eb5448ec41f3037"
          mutation_id: "kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 31
          aggregate_digest: "sha256:08bd24fb9794ffa8f04a50f3df743864f59b00e419ec32e72342114f22b49cf5"
          before_revision: 30
          command_digest: "sha256:d5eab8bb4f02d0084c4f49b1622a78e704298f211072e3907c7927a34ffdb13c"
          effect_ids: []
          event_digests:
            - "sha256:f53bb2adefcda44f068c7c9f65f1874735c2690dbab870f3afd009a35a763424"
          mutation_id: "kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 57
          aggregate_digest: "sha256:06e0669bb607c6ff89a209b4a08f800392923656eb2beb554debab138ecd8154"
          before_revision: 56
          command_digest: "sha256:5446a0d42eaf2da3083c8081376b239267ec14f4ef58ef837fce0a70cf1ce99d"
          effect_ids: []
          event_digests:
            - "sha256:1c44ff81d67b669456b2579d0e8f6505eaa01a8ee33bb7cc8541856bb7a10957"
          mutation_id: "kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:
          after_revision: 41
          aggregate_digest: "sha256:ed41ab1e5bacf854dd1494d0106c92cefee8fc18a36ef879431361cbddb1c245"
          before_revision: 40
          command_digest: "sha256:9852af0c74f4e84d1545ff8666fac3ed706ab05521944454abb10ad4b69d764c"
          effect_ids: []
          event_digests:
            - "sha256:e4ebe3817467af64dc07c161dedaed7b6460ec2e555d5d563379ed44a965e346"
          mutation_id: "kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 12
          aggregate_digest: "sha256:1c2dff652cfd3da6bf507d063dc4b203abfeb701e2fda3501b387aca60489f44"
          before_revision: 11
          command_digest: "sha256:eed8ea15fecd5132089edd890cdb6ac133fa6f5737fa19017c8d7d8450b3bade"
          effect_ids: []
          event_digests:
            - "sha256:a049ad230e9778c3b18547e003fb93a9579838c8e0ac066c094f39e1bfdcd035"
          mutation_id: "kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 25
          aggregate_digest: "sha256:129a13ec082e22639cc48beb0736d784eed326342e103588cee0223dfa4892ea"
          before_revision: 24
          command_digest: "sha256:e990acdcd312088c023474e79037ebbc4c601ab8cd9560fd9d89add29c89d22c"
          effect_ids: []
          event_digests:
            - "sha256:a37c39b0c4d8a227cfa356370d620328d90a6f63492fbcac0453b4a22ca6ffb5"
          mutation_id: "kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:
          after_revision: 18
          aggregate_digest: "sha256:c8dc5826b3602ccc11d6ff358b26c24ad1c94936f83823d4e586a69780f0d0cc"
          before_revision: 17
          command_digest: "sha256:dcaa9209d35bde8ce88f3c2061eb2d661819946318b74830a2e06bd0c63384a1"
          effect_ids: []
          event_digests:
            - "sha256:58243b1b35fe6eb795c4e259bbbac72f351cd97062e0a4d62e9ee52228808d27"
          mutation_id: "kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:
          after_revision: 34
          aggregate_digest: "sha256:f77e89bd404f4e67e60704e831952f1a2bc109a678b74169bf80d962031f9238"
          before_revision: 33
          command_digest: "sha256:a4a0ff167233d2173004bdcbcad3829fd861c5f7a74da989aa8a10091017840d"
          effect_ids: []
          event_digests:
            - "sha256:80c631a3177def4df6478740f2e009f6bddc0977f82469d7773827bf229355e5"
          mutation_id: "kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 44
          aggregate_digest: "sha256:01b34d9335578c53cfd8f1cb7bf592b62ea80da011612ff2186eb6c3abeb8777"
          before_revision: 43
          command_digest: "sha256:36c5ec75dffd803c3836c0ad0f00a32e17ffd1bbcf1eec5a76317942209f92da"
          effect_ids: []
          event_digests:
            - "sha256:32f80357b07b3154b31fab891edcdfebf8dbdbe95860a60110667a1f83bec944"
          mutation_id: "kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 21
          aggregate_digest: "sha256:2bcb206f50df02111c1acf67f6b0133edcea2f6111f05dce360822246c2a5be6"
          before_revision: 20
          command_digest: "sha256:8c9f1d3ae662b6b2af626fcc5290ac533fd32c21eaac3cf5e48c8f64e96acac6"
          effect_ids: []
          event_digests:
            - "sha256:6fcec704371c111b52ce0ba5aff704f2b3c993ac21ab069d8cb2d256bbc57f24"
          mutation_id: "kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:03c9d6d246fb9330bc55c24863dd9358137eae61338ffeeb39f0c603ec6d30db"
          before_revision: 3
          command_digest: "sha256:e6f3141ad5b0173ceab73a702b5c1946f3f7e29aa9202ce9e23cbb6a6367e3eb"
          effect_ids: []
          event_digests:
            - "sha256:d07380ac2471b0fce70f434bdf741b528662dcd55285deb706cd450870e0de76"
          mutation_id: "kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 24
          aggregate_digest: "sha256:2f6a60567b5d273d07ab23fcca750ae0a71193e9e9404172800c9074d10b787e"
          before_revision: 23
          command_digest: "sha256:449080242560682004edd6ae9bfa49efa730a4272ee1f14f4ab07cfbba18331e"
          effect_ids: []
          event_digests:
            - "sha256:e7ff1394ca0617b6aeffa71607d00e599c138e3b4083229b9c084097b37d4c20"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18:
          after_revision: 28
          aggregate_digest: "sha256:b59acfd7e746648c1231a46efd423e039787afc7df0a6e82017223f062cc81b1"
          before_revision: 27
          command_digest: "sha256:230cc3f20d2aaadf30f0d93c8e56e2bc2457f7f88b1542c42651ab1a3b3dbab3"
          effect_ids: []
          event_digests:
            - "sha256:5e489d899f35e73e8dd42777a0fdbe5af1d9c0b73d650cb63d2baaa3140d5d22"
          mutation_id: "plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
        plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e:
          after_revision: 61
          aggregate_digest: "sha256:e6a92997c970ab19e77829835ef26ac999949ddf5bc1497ed61e041e6b17ed2b"
          before_revision: 60
          command_digest: "sha256:43aae2c0c63bbac0dcc96280567c67d47ee45851d4797a12b65530d3c96e5499"
          effect_ids: []
          event_digests:
            - "sha256:ea7f884c50901d4d26fe8983ac0b8c8adf1a6e1afbe475a94e848c91a07a7501"
          mutation_id: "plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
        plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8:
          after_revision: 54
          aggregate_digest: "sha256:c08051b44974b55593cc8e330e7b2e5498c6a1c8ac600334f83ae5cd53675eee"
          before_revision: 53
          command_digest: "sha256:c971c13886d9a0311852fa09f6c07381b8275a6eb317d0974a4fc586f497dacd"
          effect_ids: []
          event_digests:
            - "sha256:d4260577f8f8b6fb6b0be39a57ab3781b397d50abd8af69712ebbdc2510c3611"
          mutation_id: "plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
        result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:
          after_revision: 20
          aggregate_digest: "sha256:b10b630c6d3e61b1eba684b1357c12b2decd42b97d576d78301f7f0d76f9ca21"
          before_revision: 19
          command_digest: "sha256:93134fb7744d2fee4ab4db31daa4fe8d59548ea30c25505e75dff4ea5439df1e"
          effect_ids: []
          event_digests:
            - "sha256:00d8979a0669d1ea3a49bf94e7d8a7e9febca1a2c538971a463703df37d20926"
          mutation_id: "result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe:
          after_revision: 9
          aggregate_digest: "sha256:bb1cbf811a6df73e541b1647fd0bd221cdefda8637a18dbb63b27d80990e7a44"
          before_revision: 8
          command_digest: "sha256:bd2b5074cf41c47c10b435a5ff961f3c64faff40c5266fdcd402e7ea4a15db4e"
          effect_ids: []
          event_digests:
            - "sha256:9568a50f03b2a66df24a2cdd030f66000a42d5b51f394983bbb19063164dc5d8"
          mutation_id: "result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe"
        result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8:
          after_revision: 43
          aggregate_digest: "sha256:9257e902513088f00684e3e683f64b730c4b7142c0c030bed3ab03d706c2ad52"
          before_revision: 42
          command_digest: "sha256:d68d54e689cdedddd78a70ae665e6250815f48ec165e9c938a833644fabcc87d"
          effect_ids: []
          event_digests:
            - "sha256:b5b2adc51790b85f4d0860c356b0583d75187e9feaf61a8435b2326dd1efb790"
          mutation_id: "result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8"
        result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad:
          after_revision: 2
          aggregate_digest: "sha256:04173ad7410a0ef616843c131f5222043d75bb031a8c1c21f1b56afb8ca527fb"
          before_revision: 1
          command_digest: "sha256:952cdb3d83f6314434f794c1c9e75e49a07f1c347e2f9a369f64969768bfb6d4"
          effect_ids: []
          event_digests:
            - "sha256:af15c77b1c7288289d6b152c77a644696b1a24ec49fe8b9bd1faffb3eaab5e9e"
          mutation_id: "result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad"
        result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca:
          after_revision: 33
          aggregate_digest: "sha256:4979d01ebadc7bc0e70d3f3ea29aa72332a12068e89eeda9ca73fd1c54badde8"
          before_revision: 32
          command_digest: "sha256:106e5bb727f0b66cdd0b920e5e67284fe4c1df859192f0d6170ed9a4c7fff2dd"
          effect_ids: []
          event_digests:
            - "sha256:1cfd18d3664376da7231c607933502954735247b2f9b86d28d64d161ba57c262"
          mutation_id: "result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca"
        scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff:
          after_revision: 8
          aggregate_digest: "sha256:4720dac7e6149b0609253362036d0c45166f56890507608707cf7ffcb378213f"
          before_revision: 7
          command_digest: "sha256:305e7853d27c1e50e870111ea916540be1996938f30160766bb4474de15ca4c0"
          effect_ids: []
          event_digests:
            - "sha256:5389939cc7f6a48a4a6f3d8c7ce37a649ca250b7c9b4d6e0d9285ba05cc91656"
          mutation_id: "scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff"
        scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8:
          after_revision: 27
          aggregate_digest: "sha256:b09a42cc9e81850661a4631ca4db33eac884edf8a4ed1f93779ccdf091388296"
          before_revision: 26
          command_digest: "sha256:e14767721e3fd4ca6544d6cf02a1774d969b01e71047adcecb3c6bc035436f20"
          effect_ids: []
          event_digests:
            - "sha256:333a32a0dc00cdcd7e5c060229c4d5d512170a70d19b7c52ff0bc226a7de0ddc"
          mutation_id: "scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8"
        scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe:
          after_revision: 60
          aggregate_digest: "sha256:decc1bef820b625d1e17c6ac720f8aca92b78ff3208b501c2103532729e70a19"
          before_revision: 59
          command_digest: "sha256:cf312a219b3a1690c3129752520704267414290b4301598d7ffcb08f972d362a"
          effect_ids: []
          event_digests:
            - "sha256:575150e4bbca65984f40c9e94c4b62cf71be0b413fa95a23441910a8c864045e"
          mutation_id: "scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe"
        scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32:
          after_revision: 53
          aggregate_digest: "sha256:83c3d7022a6ae8627ac41260685bc4538c62be62576af46345fc070aee3f8f63"
          before_revision: 52
          command_digest: "sha256:78d7bf6a6e2ae412f55773e7233434dc43aade87f063c423f820d0d8e1243b5f"
          effect_ids: []
          event_digests:
            - "sha256:f892053b8a56ed9fce5b716652070dc7535c138f54083435a2114d9169b1853b"
          mutation_id: "scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32"
        semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c:
          after_revision: 14
          aggregate_digest: "sha256:e27ce0f1a5000f66f38d78becd331e5a8e636d4f415eed1bf71f3056cc70dab0"
          before_revision: 13
          command_digest: "sha256:ca6efe6cc0ab8e4a42e8a4e0eeb2ca2a2ffabff976500cd9d35514e4aed891e3"
          effect_ids: []
          event_digests:
            - "sha256:20f473e32bf80f060ba572bd87119a83cfae9402320e05ecc4e6c3815190fb70"
          mutation_id: "semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c"
        semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e:
          after_revision: 26
          aggregate_digest: "sha256:f762997bb4102386758a21b4ac7b7d23e38b9ca8ad6437e95793230750e23708"
          before_revision: 25
          command_digest: "sha256:4bd8c85958721881899129ded4c2dac0f6e4dcd8dade37aae643b7f0383c7baf"
          effect_ids: []
          event_digests:
            - "sha256:16b19d843c4f5935882c5aba65083ebfa7105c5d7208d7f8a9134554c229d125"
          mutation_id: "semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e"
        semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4:
          after_revision: 52
          aggregate_digest: "sha256:b7ef2502bc2b01a7d35b4bf004999bfdfaa6ba106f1043598a16d294032fbf9a"
          before_revision: 51
          command_digest: "sha256:35aeaecf1a8e4af931c350829c513628f983a976b810c1b35458d6391dc9c6ed"
          effect_ids: []
          event_digests:
            - "sha256:ad6a35b1490a88890be8744c0b3735895a9ee8b23cdc5526f02ebd4919cdbf87"
          mutation_id: "semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4"
        semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a:
          after_revision: 59
          aggregate_digest: "sha256:1fad26d589964098a6c568259cd7fe1a2c7ca46c7362f9c3690f1203e07ec228"
          before_revision: 58
          command_digest: "sha256:72a6cefe860a457114fa2f5bc9a2c9dac6717b15434caf11871aa06b05df4c83"
          effect_ids: []
          event_digests:
            - "sha256:f78e38b576888788e65c41fdfdc7dedcb0a3ef73acbca2cca235f07d171ee4b5"
          mutation_id: "semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a"
        semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1:
          after_revision: 7
          aggregate_digest: "sha256:f3101bc1eb9899d88ab2d2e2375ca0881a269601367e79c0848bee94f597cdf5"
          before_revision: 6
          command_digest: "sha256:3e7cd6c9cff8f299fa6234ab6182eae55725ff6e2ecf6f18adb621b773352cc7"
          effect_ids: []
          event_digests:
            - "sha256:a2ba7b554d0f2bbb95497bae921312f2144de57cafbf929c18053c4f76aec65b"
          mutation_id: "semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1"
        sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d:
          after_revision: 55
          aggregate_digest: "sha256:6b87cf1c2da1f54cc9e7c1e2a28cc2becffd16a26b8cbca09f2eb8e7c1493c5c"
          before_revision: 54
          command_digest: "sha256:5aa3834370b484ea28cc8ef607f6d324ba7eaa65dbb8530484435ef653a3c177"
          effect_ids: []
          event_digests:
            - "sha256:e915a68ed0116b4b5d41dc1d0ead3acfd365ec27a80b2bc03b537fa86c92cdb6"
          mutation_id: "sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d"
        sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac:
          after_revision: 13
          aggregate_digest: "sha256:ff2c9f808f16f00c58c125da1237ef48c95153ea4183f1684e0110609d72bfa1"
          before_revision: 12
          command_digest: "sha256:8b1a46410805bddff1cb4cc2c9e834a994d13cbd3980f44d3eb6568daab0c546"
          effect_ids: []
          event_digests:
            - "sha256:129928421e6ebbb5ba023114f0bc42724e7a1e2f94fa77cb12bad0b7ceb4b9e5"
          mutation_id: "sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac"
        sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6:
          after_revision: 19
          aggregate_digest: "sha256:dd9eecc5160ba45e332eee10c1a800d14e9bf9ddcece52a63f0471cc19b37ece"
          before_revision: 18
          command_digest: "sha256:741226c92ac9925e2a5d4aa25f036a6bb10ab43889298bff52c487012adf6f35"
          effect_ids: []
          event_digests:
            - "sha256:e33dd701e2c11ef94cc147f0080d5cc2024451c38313a26d3500e155ca62738e"
          mutation_id: "sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6"
        sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144:
          after_revision: 29
          aggregate_digest: "sha256:98279cda39d460dd8d54b9a8fa3c597aad96cc96966e2a808cd8370aae2bca3b"
          before_revision: 28
          command_digest: "sha256:96432550502c9feebe327c8d5ea60ef17ed19b481d320520387a2f02642c1a83"
          effect_ids: []
          event_digests:
            - "sha256:1c3c287d47068b2b9b08c03e7121b31a5d0c9b8122f4e84b040329ae8f07ec41"
          mutation_id: "sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144"
        sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256:
          after_revision: 32
          aggregate_digest: "sha256:292fccec241f6941a3490fe441524e840664e28414872def39f9c36f635cf750"
          before_revision: 31
          command_digest: "sha256:c28c053ad02ee0d0d4ff8c84b3d3f16450f751a04c145702ab3677ec220db38b"
          effect_ids: []
          event_digests:
            - "sha256:046f97a826d75ec3efe0ceeb9b9a0d49486fd87fbcaef04be17559a99b811962"
          mutation_id: "sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256"
        sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a:
          after_revision: 58
          aggregate_digest: "sha256:4f7b852dc060be58464fb226072f05fedc4c0cae4fff152e7ac6465d8fec8b5b"
          before_revision: 57
          command_digest: "sha256:f41e7214de0180ae90dcc3d43a4cc0b199b8152146472083248ac6e09fb5bb61"
          effect_ids: []
          event_digests:
            - "sha256:a5f5a3d1c0cfcb0a9431a33c622840373af39e8d34a610a08f4d4d877d8e1862"
          mutation_id: "sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a"
        sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7:
          after_revision: 49
          aggregate_digest: "sha256:410572b2c734ea845d88d4575771bb6aed23a7d5f185ba6b338c41aa27f1deb2"
          before_revision: 48
          command_digest: "sha256:c20d235e9fc781e5991ec1d7be8019552162da7ee7808fff0d54f4bc10169447"
          effect_ids: []
          event_digests:
            - "sha256:26fdf470bbe3ec513083e3077610174fa6843da75b10978140d0fc913ded8e8a"
          mutation_id: "sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7"
        sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701:
          after_revision: 62
          aggregate_digest: "sha256:f3f0a0a293975f32d8c2c6024338171dcab46790b941be4bcb63f0951a733135"
          before_revision: 61
          command_digest: "sha256:565c4e096e9126e639ca52820243fb99534131e09455f9f8a9270db08e22d073"
          effect_ids: []
          event_digests:
            - "sha256:de131819154f35eefc4fdf059a42183931f0787ff2d6da77886c8f5a0e4acb57"
          mutation_id: "sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701"
        sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e:
          after_revision: 39
          aggregate_digest: "sha256:36df9c206608b92e06281f850479cd2e049290b5fa979a34777b0403d0ae8656"
          before_revision: 38
          command_digest: "sha256:a23fbe5e508fa1d2f8df461f589440d4f3aea293a93d47ddb2b3df58efb9e001"
          effect_ids: []
          event_digests:
            - "sha256:d31a9896c0eb8bc02f43d3a5725db60e1330e25215aab22f4fd7a22b405dff5d"
          mutation_id: "sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e"
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
        sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb:
          after_revision: 42
          aggregate_digest: "sha256:5f5f7559bd1329e9068aef798fe15038f6e7e563c00238f7e9bd274cb629095e"
          before_revision: 41
          command_digest: "sha256:b1a71b2fd321bbb90ad9f62d1d42783481425bf4718b120a05c0a290aef1a4c8"
          effect_ids: []
          event_digests:
            - "sha256:47203c0438cc236d8c5bdb8315ffb1d9a8326d01ee103bffe9c782988e199725"
          mutation_id: "sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb"
        sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37:
          after_revision: 10
          aggregate_digest: "sha256:7d468978fe92a9bcdcda206b43d9ad012af60f4c8e5eda27d6716bd4722db8d8"
          before_revision: 9
          command_digest: "sha256:39b6d944e8e1cf557573f112f45cecb626891bf92e2bceb471740775d8690385"
          effect_ids: []
          event_digests:
            - "sha256:bd413e3a4a4c3070565a2dc11fd939b25fb20e4d61757481888d1b8e024dde6a"
          mutation_id: "sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37"
        validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe:
          after_revision: 46
          aggregate_digest: "sha256:47a8ab1a7151b7a5956f672466babb3648c2b9e5864b9a98b329bc18319c98e9"
          before_revision: 45
          command_digest: "sha256:d0b517ed66737dd17cc4533485158bcbe20756d66dcf45299eeb31f6f0089d97"
          effect_ids: []
          event_digests:
            - "sha256:9aa541316f4265cab791fb64038ee4ac3a7ca61f5868f0d6964fb012ab48b796"
          mutation_id: "validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe"
        validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a:
          after_revision: 23
          aggregate_digest: "sha256:f17c518559669eccd5ae049ba930e332c12e968aff6b02a61de1106f59ffe35d"
          before_revision: 22
          command_digest: "sha256:f3fe1dc72d0e7ea514a8f965053924e5810fed0b7653feda6c4d54ff12568b4a"
          effect_ids: []
          event_digests:
            - "sha256:0455adf95cc1734edc508049b130c537f3839ff4c4d0af23b9127ccbffd5ea4f"
          mutation_id: "validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a"
        validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a:
          after_revision: 36
          aggregate_digest: "sha256:4f5f7aba1fef6e01684664af2633a34c6bfd05d16bab96263048b6e3bb28de89"
          before_revision: 35
          command_digest: "sha256:ea2246ebf0b05fe728aebf3d5eee0bbc0719c2f76a8cc8c86f94f9ebd76ec5b0"
          effect_ids: []
          event_digests:
            - "sha256:4e8323adfa7c4a4803ca2e96302d8b0d1535ae7f3b7f359ca27e5119890db0a2"
          mutation_id: "validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a"
        validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:
          after_revision: 22
          aggregate_digest: "sha256:8b9bd59d792ec2996ed3881bc18c8fe32dfe16c7ae711d44a7dc481dfe11a28a"
          before_revision: 21
          command_digest: "sha256:5e221507be75cee3754ee78506adb637c90840c1a25e751bb4a10643a6114a74"
          effect_ids: []
          event_digests:
            - "sha256:2280ed8f22e0434833fc33796eb4a54190c841872b3b27ae84b73ffd494d2d5c"
          mutation_id: "validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc:
          after_revision: 45
          aggregate_digest: "sha256:b803818e921d7d2b3654b36523431178bbbf39a5ed61e030c27ab26bdaf284e9"
          before_revision: 44
          command_digest: "sha256:55b93883d7a2b97089fb5e2bc6d38e411830f9b785ffb7bbed5dc4ffbed8bf4f"
          effect_ids: []
          event_digests:
            - "sha256:4bcfad58e34780643ab8e191195b3b426c00efded79ec7b3fb03579795c1dbc1"
          mutation_id: "validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc"
        validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf:
          after_revision: 35
          aggregate_digest: "sha256:5bfe05429f416ca93c550a4a8e6efe2e28b10aa822756e75c485b7957773f33b"
          before_revision: 34
          command_digest: "sha256:c242e284bcd7d0cadd0a84033dd81133c6623dad12b7823342ecc3349c640547"
          effect_ids: []
          event_digests:
            - "sha256:09e64c06300e3570847226462c52913dd9aab5daedd5ea71cb6a930cae7c55db"
          mutation_id: "validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf"
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:d0be380a9b8c076de4758197cc98c9cc4c5f77a5d7e021b8191d2a28316b768b"
          digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
          revision: 3
          state: "REJECTED"
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
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
          digest: "sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
          revision: 4
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:b2b1783f096b1f86d250514ba4d87b0a8044bc87c5df90f15fc9ce40f8966b24"
          digest: "sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
          revision: 5
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
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
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:da6ffed0dcab52486133cb55d9684b6a361d9552b6e37bd497739dee84afb5bf"
          digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
          revision: 6
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
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
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
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
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
          digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
          revision: 7
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
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
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
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
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
      revision: 64
      schema_version: 1
      state: "ACTIVE"
      work_items:
        final-correction-12acd7c9fe60:
          attempt: 1
          claim_id: "sha256:f4566c63e51adc76127388bae6a192ea86b06088e1c131e027e6939501544d93"
          definition:
            contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
            depends_on:
              - "integrate-reviewed-nine-sources"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
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
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-12acd7c9fe60-evidence"
            id: "final-correction-12acd7c9fe60"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:efccd2433174815ab254fc203e3307b3a245811323978ada32438c1af239505f"
              id: "final-correction-12acd7c9fe60-evidence"
              kind: "report"
              plan_revision: 5
              repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "final-correction-12acd7c9fe60"
          result_digest: "sha256:bac6813074cf6b6f35e79cec95ebd46abfb2c6381751f44ab6c4aa9916b01b76"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:49ee02f853ff3332a9119442bd1d4ed3f58dc4542bd9efef2c5bf3cc423347f1"
              - "sha256:9efb379137bbf4403bd2caea53fc151dbb432ef646d0cd917d8d3fee0784adc0"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:249871c812cad6ce44e5d28f6bc3fa2ceae4feeff85c3576a9f6d1d48a94c564"
              environment_digest: "sha256:e98a14de71d7e4cad52e42e6b968aae78544de4acf3ee2a8179c30497e32aae7"
              implementation_identity: "sha256:bac6813074cf6b6f35e79cec95ebd46abfb2c6381751f44ab6c4aa9916b01b76"
              toolchain_digest: "sha256:de7caaff5fc64387bfaf5ff732723614a21ac38ba04d851a26a4f3486739fc5b"
            observed_at: "2026-10-12T19:51:16.526Z"
            status: "PASSED"
        final-correction-cca82dcaef21:
          attempt: 3
          claim_id: "sha256:40c0c72d2e497ec9d51039a61194ee0d62eb3a1be94f101ab35c399040786580"
          definition:
            contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
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
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
            expected_outputs:
              - "final-correction-cca82dcaef21-evidence"
            id: "final-correction-cca82dcaef21"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 14
          state: "EXECUTING"
          validation: null
        integrate-reviewed-nine-sources:
          attempt: 5
          claim_id: "sha256:f0cdf2a08a1fc5a6c8bc45893872301e939625a471e694cdbbac301b1f38c26f"
          definition:
            contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
            expected_outputs:
              - "nine-source-adoption-report"
            id: "integrate-reviewed-nine-sources"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 5
              digest: "sha256:1fbf4716b3687742bf7a33d097c121c7196f17d25157504957e843b8bda55dfa"
              id: "nine-source-adoption-report"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "integrate-reviewed-nine-sources"
          result_digest: "sha256:986efb3ef62ab424d3f78ada8d709015d0f9773a462c404432edf3ec8e257dec"
          revision: 28
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:d02cc06a56b56579a24334fe6395746846e62b97f1582663d8ae5ccfd9ad29c8"
              - "sha256:01a152d9e53e89f1a7387ce020197bb96c1c0306363117b95404f1b5e9408f78"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:249871c812cad6ce44e5d28f6bc3fa2ceae4feeff85c3576a9f6d1d48a94c564"
              environment_digest: "sha256:112a4f7ea7e92a125b9e1a578c12255a3fd882882167b875401ce0f0adf1d595"
              implementation_identity: "sha256:986efb3ef62ab424d3f78ada8d709015d0f9773a462c404432edf3ec8e257dec"
              toolchain_digest: "sha256:de7caaff5fc64387bfaf5ff732723614a21ac38ba04d851a26a4f3486739fc5b"
            observed_at: "2026-10-12T18:04:44.260Z"
            status: "PASSED"
    digest: "sha256:e76408d774bf3ffb77525c9b22e8d15cb574d179eb74660ca74e1af44618bc66"
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
        sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f:
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
            - "Integrate only the selected canonical-core retained-work prerequisite from existing C6 source. Authenticate native scope-request receipts before preserving unchanged blocked/completed runtimes; reset only changed unfinished definitions; reject missing or tampered grants, removal of started work and pending effects. Preserve historical stop and approval evidence. Never inject fake retained state in fixtures. Exact selected pins: [{\"path\":\"packages/core/src/tasks/task-kernel/kernel.ts\",\"preimage_sha256\":\"130ceed7723c22a57e541eb0670261f1025d63da5cea654f919574d4c9f35b6e\",\"postimage_sha256\":\"1940760a3f348445988ef142e0685f715131f4580af9ff4c21a6a77e3f964871\",\"postimage_bytes\":59136,\"mode\":\"100644\"},{\"path\":\"packages/core/src/tasks/task-kernel/replan-work-items.ts\",\"preimage_sha256\":null,\"postimage_sha256\":\"1144c6b17acd7a24f49e7e779d99809f31a6c193fa3a8a0ae478862d8aa1ceb7\",\"postimage_bytes\":6795,\"mode\":\"100644\"},{\"path\":\"packages/core/src/tasks/task-kernel/replan-work-items.test.ts\",\"preimage_sha256\":null,\"postimage_sha256\":\"6ff774a9efceb744e6a2baf03dceafbdf1107eba53989466bcdbb139b7f16908\",\"postimage_bytes\":8410,\"mode\":\"100644\"},{\"path\":\"packages/core/src/tasks/task-kernel/kernel-replan.test.ts\",\"preimage_sha256\":\"90b20f1ab99b701c924e7bee7890a7a16eff8afdae8248b7bde47af23f4ae850\",\"postimage_sha256\":\"2cc2fa8a92ea5b15887ce53b806db9db2872688f7a8404d866977266869324a5\",\"postimage_bytes\":13586,\"mode\":\"100644\"}]"
          objective: "Prerequisite correction: preserve accepted eleven-source commit32302c24113bfc2e4bff6f7861eca3c2ced90c8e and all native history. After genuine scope grant and fresh EXEC, apply only the selected four-path authenticated retained-work replanning patch source11-core-prerequisite-selected-PROPOSED.patch (SHA256 5e166881eec17c3ec96e32b2cadb97698693b893f2399b7c7b452ed146a988e9). Require exact canonical preimages/postimages and exclude unrelated completion restoration. Existing eleven targets, mandatory requirements and verification commands follow unchanged. Current normative frozen AP9 preflight/patch for this refined contract is /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/reviewed-publication-correction2-proposed-freeze.v2.json (raw SHA256 fd92f2cb0a558abdd38c3fce4297129083db93d0dbd84aa70c486f325f742497) and its exact referenced patch SHA256 673684b58ff96fe5c078f50f447d07e4948b471f9772daa74ae6bc2850bc2dca. The two corrected postimages are proposed in-memory, not applied or tested; obtain fresh source execution and all existing native gates. This freeze supersedes ONLY the open.ts and existing pr-open validation test target pins from Plan2; the other nine targets/preimages/modes, all twelve mandatory acceptance criteria and all four verification commands remain unchanged. Original adoption hash verification is historical evidence, not a claim that its two faulty final targets satisfy the refined contract. Integrate exactly eleven reviewed canonical deltas onto d886917970bc0724b419074b7d575d47d9c95c1b. Preserve current hook readiness/taskIds and every unselected canonical file. Source9 accepted XTX767e460334dd0f3739bea997265c141d85d5ad74/M293438ee27f258e8a13c3e55207e917d465c14462/S899eb5f28ef4d5d24268bb3a1e2525a41be14732b and combined recovery2 donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da require narrow patch application with verified current preimages. Historical original adoption references (retained unchanged; superseded only for the two publication target pins below): /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json and /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/7GA2-compatibility-addendum.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts=3f7f41126f26d43acfbdeaa0bc233ea3b9a1c81b6d139a917191c6ea412dce00; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts=53f84c9e9d2b7a574015b8b52033b537e2bae41f37d541a01d183c5f22832378; packages/agentplane/src/runner/process-supervision/timeout-controller.ts=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114; packages/agentplane/src/commands/task/kernel-recovery-evidence.ts=3c64a6385a1149bc1d4b216c33c7a428689fe2b6658bebbc9d6c1b0112a0b4bf; packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts=2338be34b330280923a5728543b18ddb222ee4667f5231b3053fb3b0b36cf673. Stop before implementation-result intake for distinct source review; output only the actual source adoption proof, not future native/EVAL/provider receipts."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/dba35701b30cae372aa916fbe4c9791a6a1bbbebc96fe88e57c46a68ae121957/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/1bdea0ef3dc8dcdef774f8e98e2d25cae0450f369521828d38feffe7c107ded9/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
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
      -
        command_digest: "sha256:741226c92ac9925e2a5d4aa25f036a6bb10ab43889298bff52c487012adf6f35"
        id: "sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6"
        occurred_at: "2026-10-12T15:29:28.156Z"
        payload_digest: "sha256:1223dab77db4a4ff6e2209fcb4238433d8fa95a7c34d0ffd01b6eba93b722354"
        task_id: "202610120014-1C3ZFG"
        task_revision: 19
      -
        command_digest: "sha256:93134fb7744d2fee4ab4db31daa4fe8d59548ea30c25505e75dff4ea5439df1e"
        id: "result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        occurred_at: "2026-10-12T15:29:34.212Z"
        payload_digest: "sha256:f294013879eb217102bc0fab0f1e7a244e1201c6c32880d918fa6d1433411da7"
        task_id: "202610120014-1C3ZFG"
        task_revision: 20
      -
        command_digest: "sha256:8c9f1d3ae662b6b2af626fcc5290ac533fd32c21eaac3cf5e48c8f64e96acac6"
        id: "kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T15:29:38.859Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 21
      -
        command_digest: "sha256:5e221507be75cee3754ee78506adb637c90840c1a25e751bb4a10643a6114a74"
        id: "validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        occurred_at: "2026-10-12T15:30:43.491Z"
        payload_digest: "sha256:08536a509deeac3624c331473c2ac63c8c443337a83d4affeb97a578108721c6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 22
      -
        command_digest: "sha256:f3fe1dc72d0e7ea514a8f965053924e5810fed0b7653feda6c4d54ff12568b4a"
        id: "validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a"
        occurred_at: "2026-10-12T15:30:46.767Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 23
      -
        command_digest: "sha256:449080242560682004edd6ae9bfa49efa730a4272ee1f14f4ab07cfbba18331e"
        id: "kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T15:30:52.797Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202610120014-1C3ZFG"
        task_revision: 24
      -
        command_digest: "sha256:e990acdcd312088c023474e79037ebbc4c601ab8cd9560fd9d89add29c89d22c"
        id: "kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T15:30:58.120Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610120014-1C3ZFG"
        task_revision: 25
      -
        command_digest: "sha256:4bd8c85958721881899129ded4c2dac0f6e4dcd8dade37aae643b7f0383c7baf"
        id: "semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e"
        occurred_at: "2026-10-12T15:46:27.627Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 26
      -
        command_digest: "sha256:e14767721e3fd4ca6544d6cf02a1774d969b01e71047adcecb3c6bc035436f20"
        id: "scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8"
        occurred_at: "2026-10-12T15:55:35.346Z"
        payload_digest: "sha256:10a5fac7a4609b5a9a0f38b2c977bf8bd7cb0dab0bbdcec02582c141843ead42"
        task_id: "202610120014-1C3ZFG"
        task_revision: 27
      -
        command_digest: "sha256:230cc3f20d2aaadf30f0d93c8e56e2bc2457f7f88b1542c42651ab1a3b3dbab3"
        id: "plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
        occurred_at: "2026-10-12T16:21:43.918Z"
        payload_digest: "sha256:abb509d7cac4387e94d375f5d441d48393830df3ebeba29149ddc9596c5a00e3"
        task_id: "202610120014-1C3ZFG"
        task_revision: 28
      -
        command_digest: "sha256:96432550502c9feebe327c8d5ea60ef17ed19b481d320520387a2f02642c1a83"
        id: "sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144"
        occurred_at: "2026-10-12T16:21:59.490Z"
        payload_digest: "sha256:6c919ca94c72d1ed2bed44df0f7b3dd208c9d70f6d41f76f5cd115be81328ada"
        task_id: "202610120014-1C3ZFG"
        task_revision: 29
      -
        command_digest: "sha256:d97aa1acba58707ac413a8c5aa470d6cfef0f2f9fe682f137b57dbde55c86ca7"
        id: "kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T16:22:10.106Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 30
      -
        command_digest: "sha256:d5eab8bb4f02d0084c4f49b1622a78e704298f211072e3907c7927a34ffdb13c"
        id: "kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T16:22:18.139Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610120014-1C3ZFG"
        task_revision: 31
      -
        command_digest: "sha256:c28c053ad02ee0d0d4ff8c84b3d3f16450f751a04c145702ab3677ec220db38b"
        id: "sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256"
        occurred_at: "2026-10-12T17:15:36.065Z"
        payload_digest: "sha256:6b0f9b979513ff748ce5c95191c6a22e38213e59f0f8c1b26ecc8051ae00244f"
        task_id: "202610120014-1C3ZFG"
        task_revision: 32
      -
        command_digest: "sha256:106e5bb727f0b66cdd0b920e5e67284fe4c1df859192f0d6170ed9a4c7fff2dd"
        id: "result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca"
        occurred_at: "2026-10-12T17:15:38.768Z"
        payload_digest: "sha256:4e6ec474019f9f32fede48c2482516e9f75081f1db21ed0ffa7571504c3beefb"
        task_id: "202610120014-1C3ZFG"
        task_revision: 33
      -
        command_digest: "sha256:a4a0ff167233d2173004bdcbcad3829fd861c5f7a74da989aa8a10091017840d"
        id: "kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        occurred_at: "2026-10-12T17:15:40.879Z"
        payload_digest: "sha256:2c8825f2df1e5d586f549f034a6d8d55cf0206c93a79a641b229b209ac66991e"
        task_id: "202610120014-1C3ZFG"
        task_revision: 34
      -
        command_digest: "sha256:c242e284bcd7d0cadd0a84033dd81133c6623dad12b7823342ecc3349c640547"
        id: "validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf"
        occurred_at: "2026-10-12T18:04:46.514Z"
        payload_digest: "sha256:f32cb43ac4dc4e8451aa0a1807099f16fb062a8b8f0c027384e9fd99102cfad4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 35
      -
        command_digest: "sha256:ea2246ebf0b05fe728aebf3d5eee0bbc0719c2f76a8cc8c86f94f9ebd76ec5b0"
        id: "validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a"
        occurred_at: "2026-10-12T18:04:47.924Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 36
      -
        command_digest: "sha256:49ba5ee6c487533388c0ff75667edf2d9ae5c3ceba07f40095f74b72f5b20064"
        id: "final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36"
        occurred_at: "2026-10-12T18:08:52.387Z"
        payload_digest: "sha256:92a4fab225c857dfcce5484cce459df722f79ef35103384e34d0cf6a014be1b7"
        task_id: "202610120014-1C3ZFG"
        task_revision: 37
      -
        command_digest: "sha256:caf1f5214eb39986751da09a7d8ae67a4d30b1dc779858746e79f3bb9339fb47"
        id: "amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
        occurred_at: "2026-10-12T18:29:03.619Z"
        payload_digest: "sha256:fd0e8ab1aa350c81694a5e5ac8711b0d960ce32f70ffa2beffa41224cd31f6c4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 38
      -
        command_digest: "sha256:a23fbe5e508fa1d2f8df461f589440d4f3aea293a93d47ddb2b3df58efb9e001"
        id: "sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e"
        occurred_at: "2026-10-12T18:29:05.037Z"
        payload_digest: "sha256:ccfc3d6a41a895c4897d0031547f1cc8c36461950f21965445727e4fc380ad09"
        task_id: "202610120014-1C3ZFG"
        task_revision: 39
      -
        command_digest: "sha256:1f30d66cf3598a56573830b09444d0df290b24fda4c972e1f24de053b506e695"
        id: "kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        occurred_at: "2026-10-12T18:29:13.119Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202610120014-1C3ZFG"
        task_revision: 40
      -
        command_digest: "sha256:9852af0c74f4e84d1545ff8666fac3ed706ab05521944454abb10ad4b69d764c"
        id: "kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        occurred_at: "2026-10-12T18:29:15.530Z"
        payload_digest: "sha256:6d756eeb8cec9f82fc6087e919673e23c7375d61274786e32bffd6144934d617"
        task_id: "202610120014-1C3ZFG"
        task_revision: 41
      -
        command_digest: "sha256:b1a71b2fd321bbb90ad9f62d1d42783481425bf4718b120a05c0a290aef1a4c8"
        id: "sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb"
        occurred_at: "2026-10-12T19:35:12.764Z"
        payload_digest: "sha256:bc22c1e4d22a7f545c38c3a7bb4c7f40467d501da3b54b80b0c1d9ef24a482a1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 42
      -
        command_digest: "sha256:d68d54e689cdedddd78a70ae665e6250815f48ec165e9c938a833644fabcc87d"
        id: "result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8"
        occurred_at: "2026-10-12T19:35:15.516Z"
        payload_digest: "sha256:8591beb254a01de2f1ed038e1e6e45784c01c17f4ed6f6958695b3ac368ec430"
        task_id: "202610120014-1C3ZFG"
        task_revision: 43
      -
        command_digest: "sha256:36c5ec75dffd803c3836c0ad0f00a32e17ffd1bbcf1eec5a76317942209f92da"
        id: "kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T19:35:17.696Z"
        payload_digest: "sha256:2b8db6629fc3661083d28fd293ac8310cb672336c3c50ee40666eb183bba0e78"
        task_id: "202610120014-1C3ZFG"
        task_revision: 44
      -
        command_digest: "sha256:55b93883d7a2b97089fb5e2bc6d38e411830f9b785ffb7bbed5dc4ffbed8bf4f"
        id: "validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc"
        occurred_at: "2026-10-12T19:51:18.778Z"
        payload_digest: "sha256:97a0c4555fec1019f1d07853abfb743833c95a2df4b9727a6cb5c1b6b102baef"
        task_id: "202610120014-1C3ZFG"
        task_revision: 45
      -
        command_digest: "sha256:d0b517ed66737dd17cc4533485158bcbe20756d66dcf45299eeb31f6f0089d97"
        id: "validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe"
        occurred_at: "2026-10-12T19:51:20.240Z"
        payload_digest: "sha256:3b47a4f72ab7ab9b3cfafc1174f8be60080d50a0014e4b0b04406f5a1b69f16d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 46
      -
        command_digest: "sha256:7833125078f252f8f5b8de69d4cc14f63ccdd6c713724ca53e27d6490cb58c56"
        id: "final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46"
        occurred_at: "2026-10-12T20:08:09.464Z"
        payload_digest: "sha256:afa818f8a119a87ad3e3f94f5a70d1508d81877d531dd7ccf52723c446e1e3ea"
        task_id: "202610120014-1C3ZFG"
        task_revision: 47
      -
        command_digest: "sha256:4c1d32c162d28b154a9f80499d41e367ce89bd94ceadf75315959840521ed3cb"
        id: "amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
        occurred_at: "2026-10-12T20:20:00.717Z"
        payload_digest: "sha256:d9a8e2106d7eb33fcfcd59d8bb202efea6d34c0de02c29b5d917bb3593e29851"
        task_id: "202610120014-1C3ZFG"
        task_revision: 48
      -
        command_digest: "sha256:c20d235e9fc781e5991ec1d7be8019552162da7ee7808fff0d54f4bc10169447"
        id: "sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7"
        occurred_at: "2026-10-12T20:20:02.225Z"
        payload_digest: "sha256:50684e1f1d08e38732ff461a733b43df64fb05c0b37504f765c7634af8a838dc"
        task_id: "202610120014-1C3ZFG"
        task_revision: 49
      -
        command_digest: "sha256:a6dbed824a9b14322886a5c201152f17619812832525f3a6a1f25c6926442f98"
        id: "kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:20:10.305Z"
        payload_digest: "sha256:73adb8c182f05db4f2e6a5193e7e62702fd8c6989dbbc34809a9f59bc5dc8825"
        task_id: "202610120014-1C3ZFG"
        task_revision: 50
      -
        command_digest: "sha256:a07704bf98bc1771f05d5e180c58582550a81c53fe17c82f42a005b33f8b02db"
        id: "kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:20:12.454Z"
        payload_digest: "sha256:023c3c4aa353c9a91d5e1dc6a053957a44051d661b29b8c78a9c9589791f6fde"
        task_id: "202610120014-1C3ZFG"
        task_revision: 51
      -
        command_digest: "sha256:35aeaecf1a8e4af931c350829c513628f983a976b810c1b35458d6391dc9c6ed"
        id: "semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4"
        occurred_at: "2026-10-12T20:29:07.541Z"
        payload_digest: "sha256:b88fe73b96a21b8cd9734beda39a60b9174f6dcc3838ea4cfb914bd024c71e20"
        task_id: "202610120014-1C3ZFG"
        task_revision: 52
      -
        command_digest: "sha256:78d7bf6a6e2ae412f55773e7233434dc43aade87f063c423f820d0d8e1243b5f"
        id: "scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32"
        occurred_at: "2026-10-12T20:38:18.930Z"
        payload_digest: "sha256:39153af9c01de1971fb7afa0630a44898643d24683f72b48a81fe5ab021918df"
        task_id: "202610120014-1C3ZFG"
        task_revision: 53
      -
        command_digest: "sha256:c971c13886d9a0311852fa09f6c07381b8275a6eb317d0974a4fc586f497dacd"
        id: "plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
        occurred_at: "2026-10-12T20:38:26.282Z"
        payload_digest: "sha256:bf6be5aa1382591c5eaf43d97e07a7bd7e056d57b0376a563d245c3d5741455d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 54
      -
        command_digest: "sha256:5aa3834370b484ea28cc8ef607f6d324ba7eaa65dbb8530484435ef653a3c177"
        id: "sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d"
        occurred_at: "2026-10-12T20:38:32.932Z"
        payload_digest: "sha256:bf2349062a7d7b48ea3162f9b6529dcbb841c1b5ca23dd6e524df67be1d49741"
        task_id: "202610120014-1C3ZFG"
        task_revision: 55
      -
        command_digest: "sha256:0638bcf1850bbbee27f8ac7e43a036738970f498fa22e674cddfd0cb8b5ccef7"
        id: "kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:38:35.884Z"
        payload_digest: "sha256:e274569d39b1d1f5dd241564cd92011f0b7d71d10ebfc0456dafef2f8be24e09"
        task_id: "202610120014-1C3ZFG"
        task_revision: 56
      -
        command_digest: "sha256:5446a0d42eaf2da3083c8081376b239267ec14f4ef58ef837fce0a70cf1ce99d"
        id: "kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:38:38.388Z"
        payload_digest: "sha256:683c413683c848a8f021ba3cad0592d934438debd0bcd6265bfae229b6a2f64a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 57
      -
        command_digest: "sha256:f41e7214de0180ae90dcc3d43a4cc0b199b8152146472083248ac6e09fb5bb61"
        id: "sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a"
        occurred_at: "2026-10-12T21:15:29.495Z"
        payload_digest: "sha256:39d425cf18273386ba7397dc1e9c5041b3c512ad002f60a70b6c06bdd62c9545"
        task_id: "202610120014-1C3ZFG"
        task_revision: 58
      -
        command_digest: "sha256:72a6cefe860a457114fa2f5bc9a2c9dac6717b15434caf11871aa06b05df4c83"
        id: "semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a"
        occurred_at: "2026-10-12T21:15:31.707Z"
        payload_digest: "sha256:d5b7e61f92a6ab990035c37b1be8a81831983e46adeaeb195ef1dc1e0df6f932"
        task_id: "202610120014-1C3ZFG"
        task_revision: 59
      -
        command_digest: "sha256:cf312a219b3a1690c3129752520704267414290b4301598d7ffcb08f972d362a"
        id: "scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe"
        occurred_at: "2026-10-12T21:21:22.036Z"
        payload_digest: "sha256:33df5c6d3c5e313366b12002cc89ceaf8bc6adbaf73fdac66507f7118745a59d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 60
      -
        command_digest: "sha256:43aae2c0c63bbac0dcc96280567c67d47ee45851d4797a12b65530d3c96e5499"
        id: "plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
        occurred_at: "2026-10-12T21:21:30.213Z"
        payload_digest: "sha256:02b541b3899f780f591035f2949e4f16188c5c99d213510d7adc797c20f7e7d2"
        task_id: "202610120014-1C3ZFG"
        task_revision: 61
      -
        command_digest: "sha256:565c4e096e9126e639ca52820243fb99534131e09455f9f8a9270db08e22d073"
        id: "sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701"
        occurred_at: "2026-10-12T21:21:37.659Z"
        payload_digest: "sha256:0dbeca067eb8f5ba1f8cc59f6e317dd615ebbe91e168a3a6064f519fff724e5b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 62
      -
        command_digest: "sha256:ae2652bf2f4e4ca9147ed9c4700f7f1c801512e715e450c4ca4d522bc1eaef57"
        id: "kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        occurred_at: "2026-10-12T21:21:41.115Z"
        payload_digest: "sha256:257b3d825f9d2b38f2f52032d48050f5fb8ecfc7aaf5b5c7002a6c079d4b28f5"
        task_id: "202610120014-1C3ZFG"
        task_revision: 63
      -
        command_digest: "sha256:911cf86af313ce9d6a54fab99ca5d87ae99462484eb5ae66aaa8c3e7421d85ad"
        id: "kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        occurred_at: "2026-10-12T21:21:43.721Z"
        payload_digest: "sha256:3eb3595534644a655247e4b007a0c5d10060724324be31ca06aa8f91ffc1c15a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 64
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
2. Execute approved WorkItem final-correction-12acd7c9fe60.
3. Execute approved WorkItem final-correction-cca82dcaef21.

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
