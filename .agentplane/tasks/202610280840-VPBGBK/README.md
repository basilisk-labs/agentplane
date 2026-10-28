---
id: "202610280840-VPBGBK"
title: "Allow one admitted verification retry for immutable completed Kernel followups"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-28T08:51:42.976Z"
  updated_by: "USER"
  note: "Existing direct human grant userMessage01a181a3-ef22-7af0-b6ce-e9f9b00f8d23 covers this narrow repair and required old-receipt preservation. Native admitted scope request5c18ab2 adds only three nearest verifier source/test files; original mandatory criteria and checks retained, no external or security authority expansion."
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
    - "effect_publish"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
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
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.ts"
      - "packages/agentplane/src/commands/task/verify-record.types.ts"
      - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
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
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.ts"
      - "packages/agentplane/src/commands/task/verify-record.types.ts"
      - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
          - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
          - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
          - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record.ts"
          - "packages/agentplane/src/commands/task/verify-record.types.ts"
          - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:0f5ca235ad74b53a7cc6ff24ec241fd10cee28175a2f081c4c24eee2172b14d9"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
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
      - "external_effect:network_read"
      - "external_effect:publish"
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
doc_updated_at: "2026-10-28T08:40:40.347Z"
doc_updated_by: "CODER"
description: "Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure."
sections:
  Summary: |-
    Allow one admitted verification retry for immutable completed Kernel followups

    Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure.
  Scope: |-
    - In scope: Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure.
    - Out of scope: unrelated refactors not required for "Allow one admitted verification retry for immutable completed Kernel followups".
  Plan: "1. Execute approved WorkItem terminal-verification-retry."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "d51453363dbafa18b79f4c35ed9cc7e76f25b867"
    base_sha: "d51453363dbafa18b79f4c35ed9cc7e76f25b867"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d50f524016d47597590dae80c82f5cd5f9ab95ac06bd4a226532e4826d63ff3b"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5a7cb0abcd423185a978ebb06b41b602b257fa2a0bc37a1e0bace1b6fde71544"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a63293049504ee7d1f9f4e27635eefbdc6b2a9855e1142d43f8252521c3ac14a"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610280840-VPBGBK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:be1a495022f7c2c5022d770bf28f55a21e22a639c38fb9152315ed7d016587a3"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5a7cb0abcd423185a978ebb06b41b602b257fa2a0bc37a1e0bace1b6fde71544"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a63293049504ee7d1f9f4e27635eefbdc6b2a9855e1142d43f8252521c3ac14a"
              kind: "USER"
              parent_authority_digest: "sha256:d50f524016d47597590dae80c82f5cd5f9ab95ac06bd4a226532e4826d63ff3b"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610280840-VPBGBK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:673bac3005beff1f6a97c806ec8555c71a2541dfbb217539d6678bff6ed61b53"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
            request_digest: "sha256:5c18ab2cc0fc928ca975399a97f6255e5c47a03e7b8a180e6dd26aed0b94c162"
            scope_request:
              attempt: 1
              claim_id: "sha256:8e460f900890ac66f9b0930b92a75a1b0424f14e61739db87488b1250285c251"
              contract_digest: "sha256:10b84f6f746c9081145e3576232b7b7b4262dc872d0a5b61a8b7f24a915732cd"
              intake_after_digest: "sha256:8529aa73bf7b643a5cfeb249900099d1e22faa939d4fd6828b1e8e8662d71db6"
              intake_before_digest: "sha256:3d1fb8611bece6b3ba8912a41b76787f8768c2ce2b2c2727add3afb2b9c9c0db"
              parent_authority_digest: "sha256:d50f524016d47597590dae80c82f5cd5f9ab95ac06bd4a226532e4826d63ff3b"
              plan_digest: "sha256:5a7cb0abcd423185a978ebb06b41b602b257fa2a0bc37a1e0bace1b6fde71544"
              plan_revision: 1
              record_digest: "sha256:e99cdb7c50fcd31f39d49cb54b14272785f3f33ab9b4547d65d0569503e82c10"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:7deabeebc1dea6a1cf9a57a4512d01ce354c64b03ccdd8831b57186fadf7da6c"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              stop_receipt_digest: "sha256:42a56b9a445806fd1749a960c183933a62f95031b6a40e9279cc87eaf9761d5c"
              task_id: "202610280840-VPBGBK"
              task_revision: 7
              work_item_id: "terminal-verification-retry"
              work_order_id: "sha256:20afdf7e7825196c5990bd5ad34221875571d7e961c9e379ddfd160dbbfd5be5"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c6ddc43f60270dd5667412ca6f548b46b9f1efc8844ec04e0109052385aabd28"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:2fc4c4bfde01fb27a5139f031125a54164ff87924a385e3a2978e80348c95f57"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:b042903f43ee55554e131a16f68cc6dce269d5e6e4768cd7ff636698dbd091dd"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610280840-VPBGBK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:2161f5e7822c868c66ae49c1a2ad84d7ebe432aa928cf63fafb173f804d593a8"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:2fc4c4bfde01fb27a5139f031125a54164ff87924a385e3a2978e80348c95f57"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b042903f43ee55554e131a16f68cc6dce269d5e6e4768cd7ff636698dbd091dd"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c6ddc43f60270dd5667412ca6f548b46b9f1efc8844ec04e0109052385aabd28"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610280840-VPBGBK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            evidence_digest: "sha256:9b661ee757ee177e37df8f35c4a0ae59e67a61eec6786490549bb40fc6bc9080"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e60cfa1e2c82585116e1c23f7e9e5b516b1b785f5f17f48f57cac3f80a96bb9b"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:2fc4c4bfde01fb27a5139f031125a54164ff87924a385e3a2978e80348c95f57"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:b042903f43ee55554e131a16f68cc6dce269d5e6e4768cd7ff636698dbd091dd"
              kind: "USER"
              parent_authority_digest: "sha256:2161f5e7822c868c66ae49c1a2ad84d7ebe432aa928cf63fafb173f804d593a8"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/verify-record-execute.ts"
              - "packages/agentplane/src/commands/task/verify-record.ts"
              - "packages/agentplane/src/commands/task/verify-record.types.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610280840-VPBGBK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:2c93b4fb6eaa897a55d1973d6b609a4082293c50a5fd056e3e4eba257ffeae0a"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
            request_digest: "sha256:a85688c2f37ac51bf9e20b50b7889142e8f3e03bd4fbd85b5c803aaa7865053e"
            scope_request:
              attempt: 2
              claim_id: "sha256:f5f65b1ead5bf12a6d5fb7d4674a39e6acd19e7dc45429f1c355e364242181e1"
              contract_digest: "sha256:53fb55b5435496e94de9750a2b3c3ccc6ca09a5dff3f0856582600b7de36a8b5"
              intake_after_digest: "sha256:5aaffd3b720a8b20b7b68b32b6cbab1cdd3a5ca77811b5a97732e653a66c24ab"
              intake_before_digest: "sha256:8529aa73bf7b643a5cfeb249900099d1e22faa939d4fd6828b1e8e8662d71db6"
              parent_authority_digest: "sha256:2161f5e7822c868c66ae49c1a2ad84d7ebe432aa928cf63fafb173f804d593a8"
              plan_digest: "sha256:2fc4c4bfde01fb27a5139f031125a54164ff87924a385e3a2978e80348c95f57"
              plan_revision: 2
              record_digest: "sha256:4814d23ffd1aed8fc817dde467b60f7a9f653b2aeb41cab9d9de1f7330a4058d"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:19bb1fb7c9d066e7f588ad727e78d7a31a3e6fbe32479cd501b9596ddb4a5fb2"
              scope_roots:
                - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                - "packages/agentplane/src/commands/task/verify-record.ts"
                - "packages/agentplane/src/commands/task/verify-record.types.ts"
              stop_receipt_digest: "sha256:3f015cb20c56edd59a18aa2b7dec91c6eb3c21da724de5adaa6fb405550c52a5"
              task_id: "202610280840-VPBGBK"
              task_revision: 14
              work_item_id: "terminal-verification-retry"
              work_order_id: "sha256:bd2c2edd6bbd90ba160d5e4b2a0e98251750d677ce4cda04c9f66db76cafe2eb"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:eb27c14fd090a4fe9b936439de0d67df1dc46c90c37244be0f2b2c8766b8c6c7"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ca6e4e2e342c3c2af115d3b383f24adf5824d0af72e6dfb2c66da4a39ee0d953"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:eed493340813db112bcdf919e0296d9ea03f7de45b341a2bbd5d7bc9dd70df99"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/verify-record-execute.ts"
              - "packages/agentplane/src/commands/task/verify-record.ts"
              - "packages/agentplane/src/commands/task/verify-record.types.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610280840-VPBGBK"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:eed493340813db112bcdf919e0296d9ea03f7de45b341a2bbd5d7bc9dd70df99"
        digest: "sha256:ca6e4e2e342c3c2af115d3b383f24adf5824d0af72e6dfb2c66da4a39ee0d953"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:08bef7f514867e81bca0ee23f87fd7d56109d443224b6af01b0c41ef43046cc9"
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
                - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/verify-record.ts"
                - "packages/agentplane/src/commands/task/verify-record.types.ts"
                - "packages/agentplane/src/commands/task/verify-record-execute.ts"
            expected_outputs:
              - "terminal-verification-retry-source"
              - "terminal-verification-retry-fault-tests"
            id: "terminal-verification-retry"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610280840-VPBGBK"
      intent_digest: "sha256:026b09149073729a1fa9cb93320e2eeed56d5ae83d1d9ea60f0b651be95405b4"
      migration_receipts: []
      mutation_receipts:
        capture:202610280840-VPBGBK:
          after_revision: 1
          aggregate_digest: "sha256:d86234ebd85225900578c67ed77d59b5728af12f3287593898f87b49aaed89a4"
          before_revision: 0
          command_digest: "sha256:51fe81297fc702d9684709d2c50a551064d5319697febce5250216f3edefbcfc"
          effect_ids: []
          event_digests:
            - "sha256:fd40e7fa5f025c53e6bce14b259e9550bc4dae5971ca553df4c2bbfa518295b4"
          mutation_id: "capture:202610280840-VPBGBK"
        kernel_work_item_claim_required:sha256:04ed1ae4724cd48e46180ac956ed25fd4f0f0033e2e6eaf4fc76d7acb86f74f2:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:
          after_revision: 5
          aggregate_digest: "sha256:e85c5b13d25af6b2b7b5af9415747e64cc3afa688d0025e14a0d23bb816f7c95"
          before_revision: 4
          command_digest: "sha256:0d3a744417dc6546890e147a389936cc0a6880a6e320402f8af3889e0e38ea5a"
          effect_ids: []
          event_digests:
            - "sha256:d54c4cd7060ea79de2ec76684ba567b201fefa4afaf029c23623b947c4ef9e04"
          mutation_id: "kernel_work_item_claim_required:sha256:04ed1ae4724cd48e46180ac956ed25fd4f0f0033e2e6eaf4fc76d7acb86f74f2:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        kernel_work_item_claim_required:sha256:4102beae06ad4983d42f9d1bea435aa5d95167795d9c97b8cc889cf01062eb0d:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:
          after_revision: 11
          aggregate_digest: "sha256:48e32ee1969c3beaa2d9dbc22692e931e0d9afe95d4a19d2d9b9b639508f0401"
          before_revision: 10
          command_digest: "sha256:2450d530fe3fc86d69d389f213c924ea2bd1a3f1e7b7111076efcd386d954869"
          effect_ids: []
          event_digests:
            - "sha256:edf5b7ad7ad582ea5429a57d0309ba2c2db3b1208842d39c7e91efd60ff91072"
          mutation_id: "kernel_work_item_claim_required:sha256:4102beae06ad4983d42f9d1bea435aa5d95167795d9c97b8cc889cf01062eb0d:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        kernel_work_item_claim_required:sha256:763e92f8ff6344b13543da11af5568d266a5bb0d9343ec95c2a0175d2d55757a:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd:
          after_revision: 18
          aggregate_digest: "sha256:dd5a9367299834b0488acae98144dedc2c6d08aa45e4146a77f3a7d6ec8d1871"
          before_revision: 17
          command_digest: "sha256:03fc982b532560ecd17d7a11c13d43bdc33e1838de88db37a1307970e98d93ed"
          effect_ids: []
          event_digests:
            - "sha256:f545c5d830387daff5cf77288aa55ebabeb9e9ee3b12b2fec377dac43a7aec83"
          mutation_id: "kernel_work_item_claim_required:sha256:763e92f8ff6344b13543da11af5568d266a5bb0d9343ec95c2a0175d2d55757a:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
        kernel_work_item_execution_required:sha256:8a81ba9e2a66ae2ba882a0ffaf5166a365bec3012656ab31f1a9f0936c4f42a1:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:
          after_revision: 6
          aggregate_digest: "sha256:ca161ed2d8dfacfa510632347c9bd997c68803a997508b6995e1e1512ea4d7ec"
          before_revision: 5
          command_digest: "sha256:cb482d04b877faad60d66f69a01487ae986f5cc48aeeae7acc30e75d4b7ddcfd"
          effect_ids: []
          event_digests:
            - "sha256:bb0a193401e56ab03dda874c99f4f539475319bcf0ab9f642156c0f84a77073a"
          mutation_id: "kernel_work_item_execution_required:sha256:8a81ba9e2a66ae2ba882a0ffaf5166a365bec3012656ab31f1a9f0936c4f42a1:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        kernel_work_item_execution_required:sha256:99bcd9ec3abdcb96aaedd1db5ffd252867559ab1a3a123919bda0d8a9fa76425:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:
          after_revision: 12
          aggregate_digest: "sha256:e9ea6091c4721dcb437ea383adaaf17f695322374d0a9b7c5b308b526d77701d"
          before_revision: 11
          command_digest: "sha256:5e011d8a6cf2d17db675eb57208c9901a5f1a625f4dd5733487c6a6600be80a4"
          effect_ids: []
          event_digests:
            - "sha256:1ed7b99b1a1baff6e70a8a3e7418081974e1dd11865e1f4575a190f58045c181"
          mutation_id: "kernel_work_item_execution_required:sha256:99bcd9ec3abdcb96aaedd1db5ffd252867559ab1a3a123919bda0d8a9fa76425:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        kernel_work_item_execution_required:sha256:d644f6a9ca3b7c0a21691293de9c68e96ac3f9b9278081b08d2477a58d75e3de:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd:
          after_revision: 19
          aggregate_digest: "sha256:2eb5bad16a742208c5e94d9515ff70c67b89ea38276b21fda1e0f4200a124548"
          before_revision: 18
          command_digest: "sha256:ec8140f4bf0d5bced6e0405975cf1ca57e8b17ea1b81748f4b7c317652fa0f75"
          effect_ids: []
          event_digests:
            - "sha256:8427488dc35ec20a4384e94020ed6eff0fdb431c913c687e7f78e33be38ec596"
          mutation_id: "kernel_work_item_execution_required:sha256:d644f6a9ca3b7c0a21691293de9c68e96ac3f9b9278081b08d2477a58d75e3de:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
        kernel_work_item_materialization_required:sha256:80c5d4630f7b926271cbec719aaed43c8a739f3bbf617ccb5947ab8cd44a63ce:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:
          after_revision: 4
          aggregate_digest: "sha256:91491baac645284f6e3bc1c1a028c05d5c425c4490f8cfff4955440a70490cdd"
          before_revision: 3
          command_digest: "sha256:f44796d516384a60b4758555692706136402a9f86b9d2108d0f47238216a2220"
          effect_ids: []
          event_digests:
            - "sha256:35f015cdf022a1c854020a833facddf7f3441abfcfa0898e43a24cbfe9752a67"
          mutation_id: "kernel_work_item_materialization_required:sha256:80c5d4630f7b926271cbec719aaed43c8a739f3bbf617ccb5947ab8cd44a63ce:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        result:sha256:8a6d7cbcb5d3a71dcb686b7fea084ebb3130f6290d959aa17cb1eb2fe1d9db99:
          after_revision: 16
          aggregate_digest: "sha256:eff8fcf7e997eb705201b8c7cf9030dd2c0f8753872abf9e7c6c53c9f0878675"
          before_revision: 15
          command_digest: "sha256:fdb2fee223bf74ce6efbecc19c4971d985a6f8e49cb07298ee959bfd41e6b619"
          effect_ids: []
          event_digests:
            - "sha256:921e75bed51f4b949219a8ecc82a552314b01a41fceacb8e2d06ed95077991fe"
          mutation_id: "result:sha256:8a6d7cbcb5d3a71dcb686b7fea084ebb3130f6290d959aa17cb1eb2fe1d9db99"
        result:sha256:b1c1b647bcc5dc6daaf99208ee4bfba2705a4a597ba1ea276da98a4dc5a501f2:
          after_revision: 9
          aggregate_digest: "sha256:0706608f150d15c68d986108ae46286828c2a32af6828f2912fea85d8bf25e7c"
          before_revision: 8
          command_digest: "sha256:ea9b14fd1316cea8c14ffe86d8f3a4be97075aa83931fd454483b883b961b143"
          effect_ids: []
          event_digests:
            - "sha256:6ecbcbf6f142949f9848e83aad8c0cedbb40ab45b4501ba0b38f92c2ae851c62"
          mutation_id: "result:sha256:b1c1b647bcc5dc6daaf99208ee4bfba2705a4a597ba1ea276da98a4dc5a501f2"
        result:sha256:bae85b4e282cca3afd55e3817b8f630a6bdbe926c3ea68c331d61aeaf761dbd9:
          after_revision: 2
          aggregate_digest: "sha256:dbbde42634a8770ba847284290904d3975725b588f9d85612ef4a613fe1dd2af"
          before_revision: 1
          command_digest: "sha256:9e2667eaa4770afd4850698d4735b76514ef04c8ca7a9385d7cfdbc29b95603d"
          effect_ids: []
          event_digests:
            - "sha256:3da0f7d6f1760a342094cbca248f94ddf53edd976928ee59b51acbae68b92669"
          mutation_id: "result:sha256:bae85b4e282cca3afd55e3817b8f630a6bdbe926c3ea68c331d61aeaf761dbd9"
        scope-request:sha256:5c18ab2cc0fc928ca975399a97f6255e5c47a03e7b8a180e6dd26aed0b94c162:
          after_revision: 8
          aggregate_digest: "sha256:3fd6bb493312a3e33539bde430ae502d35b54c7a36a82cac5deb8678268a5432"
          before_revision: 7
          command_digest: "sha256:599347cb94479876fd75223a92e8056da11d936ac5a2cb58e921008ca0d36fb2"
          effect_ids: []
          event_digests:
            - "sha256:97e4f92db1c9dfea6e308541383200646e7d281c5d2086e2abaf78cd69ebe885"
          mutation_id: "scope-request:sha256:5c18ab2cc0fc928ca975399a97f6255e5c47a03e7b8a180e6dd26aed0b94c162"
        scope-request:sha256:a85688c2f37ac51bf9e20b50b7889142e8f3e03bd4fbd85b5c803aaa7865053e:
          after_revision: 15
          aggregate_digest: "sha256:dc2e2502929fa0cdc529e3cbeb42487b2fb58e467f3eb7046e9560afad3b49c2"
          before_revision: 14
          command_digest: "sha256:0ad9c5399ac8a7b35039cb822db2f0d9950e92dbab092e253b6258333d2dfad2"
          effect_ids: []
          event_digests:
            - "sha256:d3b244650df547f9688d565cfde00b6fc3cdba1df2a7ab5a56120e7a8a283b40"
          mutation_id: "scope-request:sha256:a85688c2f37ac51bf9e20b50b7889142e8f3e03bd4fbd85b5c803aaa7865053e"
        semantic-stop:sha256:20afdf7e7825196c5990bd5ad34221875571d7e961c9e379ddfd160dbbfd5be5:
          after_revision: 7
          aggregate_digest: "sha256:247fe58a874e72540e3143b014644a447adb6c6adadf0f71cee43b224716ab3f"
          before_revision: 6
          command_digest: "sha256:2ab0e27d57f1053eaaa9827a587ecf7670e52abc9e320a4d769bfc2762adc493"
          effect_ids: []
          event_digests:
            - "sha256:8f83f1077c18521fbacb76fa6d4afdabe8a8744a25e38a0b48c81c7ad31a5310"
          mutation_id: "semantic-stop:sha256:20afdf7e7825196c5990bd5ad34221875571d7e961c9e379ddfd160dbbfd5be5"
        semantic-stop:sha256:bd2c2edd6bbd90ba160d5e4b2a0e98251750d677ce4cda04c9f66db76cafe2eb:
          after_revision: 14
          aggregate_digest: "sha256:cb9cf664b07320b96852d01791fc67780ebc34946b91a53774b97f0e8bd1d97a"
          before_revision: 13
          command_digest: "sha256:3c2dae07c6278de77ec15c2adfcf7f3623e8620aa6ff250e82b8ab087f0e2797"
          effect_ids: []
          event_digests:
            - "sha256:24724e007414ff3a96e3413af2c36b7e58130f30868c25fc2b5eedc54fb1ee5c"
          mutation_id: "semantic-stop:sha256:bd2c2edd6bbd90ba160d5e4b2a0e98251750d677ce4cda04c9f66db76cafe2eb"
        sha256:9bc106804f1a020444e3f748a34b348b2c60d5c01ce942e25d980a1269c657c5:
          after_revision: 17
          aggregate_digest: "sha256:e1bf85892e56d4a6f1eeb8a5468aa42fcb7d9c7ceb115291f9c5dbdfdf316681"
          before_revision: 16
          command_digest: "sha256:af95a684b461513871797099cc16e2539c5e171d2320daafea97997d59fc8fa1"
          effect_ids: []
          event_digests:
            - "sha256:f0ac33a0862cf8285cc9a6f3a82d5e7bd1c1fefbc4d9591b4432353d501402a9"
          mutation_id: "sha256:9bc106804f1a020444e3f748a34b348b2c60d5c01ce942e25d980a1269c657c5"
        sha256:a3843fa7e2d17a4ce5eb1546a2bdd0cee591a981503fc13514c04115b887ab94:
          after_revision: 10
          aggregate_digest: "sha256:8da97e90746b69b4ed934dbe21775033292959cf6ff3642d83b2afe81ac2cc61"
          before_revision: 9
          command_digest: "sha256:8d9bf8b09c5fd195ee8b6dd707700c30e2639382d763a2630b92d300cbb43a6f"
          effect_ids: []
          event_digests:
            - "sha256:f8ba22783d4c45f062a83cf13cc2b09027ea5ecace9bece69618f453483c022e"
          mutation_id: "sha256:a3843fa7e2d17a4ce5eb1546a2bdd0cee591a981503fc13514c04115b887ab94"
        sha256:c47e1f773a0acc4375d456d22ff935d789dd7bc00b976bc890577607f10d81d8:
          after_revision: 3
          aggregate_digest: "sha256:1bc20e0aab0190ce82b1a115abd67d46fa6d6b8050570d2bf03fe45c483db7e9"
          before_revision: 2
          command_digest: "sha256:4742219588ace1438d2cf9c2544d3fe0769f90e71ae6f8c3505a8c3413c72674"
          effect_ids: []
          event_digests:
            - "sha256:fa1b10a03e163f3e517ab63f6233a03fb547392af137e5adac00834890d853cf"
          mutation_id: "sha256:c47e1f773a0acc4375d456d22ff935d789dd7bc00b976bc890577607f10d81d8"
        sha256:ca0adbdd2621ec6ae36719cc77e64c74d4ef1e8e0a0076edf6d76c412b2b002f:
          after_revision: 13
          aggregate_digest: "sha256:dae3ce2ac5b24e03f7c3e23f182ae6cae777744c8c398f3e946e6165661b6ede"
          before_revision: 12
          command_digest: "sha256:dc17dbad54b038289d552111922f9ed93c7ee3e27943739f8eb1a2b446ce48cd"
          effect_ids: []
          event_digests:
            - "sha256:06dd9607abde6675f0e39c410470bb57664ce78d5da333eab6f47ced1493ddc7"
          mutation_id: "sha256:ca0adbdd2621ec6ae36719cc77e64c74d4ef1e8e0a0076edf6d76c412b2b002f"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:a63293049504ee7d1f9f4e27635eefbdc6b2a9855e1142d43f8252521c3ac14a"
          digest: "sha256:5a7cb0abcd423185a978ebb06b41b602b257fa2a0bc37a1e0bace1b6fde71544"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:10b84f6f746c9081145e3576232b7b7b4262dc872d0a5b61a8b7f24a915732cd"
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
                  - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              expected_outputs:
                - "terminal-verification-retry-source"
                - "terminal-verification-retry-fault-tests"
              id: "terminal-verification-retry"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:b042903f43ee55554e131a16f68cc6dce269d5e6e4768cd7ff636698dbd091dd"
          digest: "sha256:2fc4c4bfde01fb27a5139f031125a54164ff87924a385e3a2978e80348c95f57"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:53fb55b5435496e94de9750a2b3c3ccc6ca09a5dff3f0856582600b7de36a8b5"
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
                  - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
                  - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              expected_outputs:
                - "terminal-verification-retry-source"
                - "terminal-verification-retry-fault-tests"
              id: "terminal-verification-retry"
              optional: false
              required_inputs: []
      revision: 19
      schema_version: 1
      state: "ACTIVE"
      work_items:
        terminal-verification-retry:
          attempt: 3
          claim_id: "sha256:d4c58edd2bb24728ab1f95966707575c590442b31293c59dc7769ed11c0ffe48"
          definition:
            contract_digest: "sha256:08bef7f514867e81bca0ee23f87fd7d56109d443224b6af01b0c41ef43046cc9"
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
                - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/verify-record.ts"
                - "packages/agentplane/src/commands/task/verify-record.types.ts"
                - "packages/agentplane/src/commands/task/verify-record-execute.ts"
            expected_outputs:
              - "terminal-verification-retry-source"
              - "terminal-verification-retry-fault-tests"
            id: "terminal-verification-retry"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 13
          state: "EXECUTING"
          validation: null
    digest: "sha256:aca923f94e724bed4c666201f7bdf9e87fc23feddacecba4d627b3a6e983a2b4"
    documents:
      contracts:
        sha256:08bef7f514867e81bca0ee23f87fd7d56109d443224b6af01b0c41ef43046cc9:
          acceptance_criteria:
            - "Authenticate exact repository/task/terminal Kernel digest, actual supervisor-owned failed validation, approved mandatory-check contract, admitted scope and clean source before any retry effect. Never trust caller supplied success or independent checks as native authority."
            - "Bind exact source or a controller-audited managed-task-metadata-only descendant; absent historical binding requires a new controller observation, never editing the old receipt. Recheck source/head/scope/contract before and after execution."
            - "Persist a state-bound once admission and attempt with idempotent replay/reconciliation. Failed/interrupted/unknown effects cannot produce PASS or duplicate execution. Execute every mandatory check via the supported verifier; persist only its genuine fresh result and source proof for fresh evaluation."
            - "Successful retry changes only its own verification/source-binding projections. Preserve terminal Kernel/plan/workitems/old failed validation/EVAL bytes and existing legacy no-diff, approval and publication-base guards. Admission grants no source editing, publication or deployment capability."
            - "Real fault and CLI tests cover completed Kernel without legacy aggregate, environment-only prior failure, preservation, source/head/scope/check drift, stale/foreign/independent evidence rejection, concurrent or interrupted retry and refusal/replay. Full mandatory validation must run before completion."
            - "Limit changes to the fourteen exact roots admitted by the original intake and native scope grants5c18ab2 and a85688c2. Preserve all original worktrees, untracked files, native artifacts and foreign shim. No Beta access, credentials/global environment change, manual task projection, fake source diff, internal force flags or provider lifecycle inside this episode."
            - "Use a controller-validated distinct retry check artifact destination with no replacement. Preserve all historical declared-check bytes and default behavior for existing callers. Test containment, occupied slots, symlinks and independent old/new artifacts."
            - "Use an internal controller-only Task-projection policy to suppress PR sync during retry and prepared reconciliation. Expose no public skip flag or durable Task setting. Existing verifier callers retain their behavior."
            - "Preserve ALL PR artifacts byte-exact during success, real check failure, interrupted persistence and replay. Remove path-only generated-file exceptions. Tampered meta/provider identity/body after interruption must refuse without overwrite or executor replay."
            - "Tests independently assert zero PR writes and zero provider calls from retry, strict prepared full artifact maps, and genuine fresh EVALUATOR source binding after normal controller advance. Preserve the audited committed native metadata descendant proof needed for the existing Factory source."
            - "Replace only the erroneous literal Bun test runner with the repository Vitest package wrappers for the exact same suites and assertions. Retain the original launched Bun failure and old Plan contracts in history. This prospective scope replan is not an unsupported-check correction or a retroactive PASS."
          objective: "Implement the typed verification_retry_request in the existing workflow recovery dispatcher using authenticated terminal Kernel/source/check-contract pins and the existing native verifier. Qualify existing d514 execution and persistence primitives first; avoid duplicating an available supported route. Keep immutable Kernel, plan, workitems, prior failed receipt and EVAL byte-exact."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:fast packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
            - "bun run ci:local:full"
        sha256:10b84f6f746c9081145e3576232b7b7b4262dc872d0a5b61a8b7f24a915732cd:
          acceptance_criteria:
            - "Authenticate exact repository/task/terminal Kernel digest, actual supervisor-owned failed validation, approved mandatory-check contract, admitted scope and clean source before any retry effect. Never trust caller supplied success or independent checks as native authority."
            - "Bind exact source or a controller-audited managed-task-metadata-only descendant; absent historical binding requires a new controller observation, never editing the old receipt. Recheck source/head/scope/contract before and after execution."
            - "Persist a state-bound once admission and attempt with idempotent replay/reconciliation. Failed/interrupted/unknown effects cannot produce PASS or duplicate execution. Execute every mandatory check via the supported verifier; persist only its genuine fresh result and source proof for fresh evaluation."
            - "Successful retry changes only its own verification/source-binding projections. Preserve terminal Kernel/plan/workitems/old failed validation/EVAL bytes and existing legacy no-diff, approval and publication-base guards. Admission grants no source editing, publication or deployment capability."
            - "Real fault and CLI tests cover completed Kernel without legacy aggregate, environment-only prior failure, preservation, source/head/scope/check drift, stale/foreign/independent evidence rejection, concurrent or interrupted retry and refusal/replay. Full mandatory validation must run before completion."
            - "Limit changes to the eight roots. Preserve all original worktrees, untracked files, native artifacts and foreign shim. No Beta access, credentials/global environment change, manual task projection, fake source diff, internal force flags or provider lifecycle inside this episode."
          objective: "Implement the typed verification_retry_request in the existing workflow recovery dispatcher using authenticated terminal Kernel/source/check-contract pins and the existing native verifier. Qualify existing d514 execution and persistence primitives first; avoid duplicating an available supported route. Keep immutable Kernel, plan, workitems, prior failed receipt and EVAL byte-exact."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
            - "bun run ci:local:full"
        sha256:53fb55b5435496e94de9750a2b3c3ccc6ca09a5dff3f0856582600b7de36a8b5:
          acceptance_criteria:
            - "Authenticate exact repository/task/terminal Kernel digest, actual supervisor-owned failed validation, approved mandatory-check contract, admitted scope and clean source before any retry effect. Never trust caller supplied success or independent checks as native authority."
            - "Bind exact source or a controller-audited managed-task-metadata-only descendant; absent historical binding requires a new controller observation, never editing the old receipt. Recheck source/head/scope/contract before and after execution."
            - "Persist a state-bound once admission and attempt with idempotent replay/reconciliation. Failed/interrupted/unknown effects cannot produce PASS or duplicate execution. Execute every mandatory check via the supported verifier; persist only its genuine fresh result and source proof for fresh evaluation."
            - "Successful retry changes only its own verification/source-binding projections. Preserve terminal Kernel/plan/workitems/old failed validation/EVAL bytes and existing legacy no-diff, approval and publication-base guards. Admission grants no source editing, publication or deployment capability."
            - "Real fault and CLI tests cover completed Kernel without legacy aggregate, environment-only prior failure, preservation, source/head/scope/check drift, stale/foreign/independent evidence rejection, concurrent or interrupted retry and refusal/replay. Full mandatory validation must run before completion."
            - "Limit changes to the eight roots. Preserve all original worktrees, untracked files, native artifacts and foreign shim. No Beta access, credentials/global environment change, manual task projection, fake source diff, internal force flags or provider lifecycle inside this episode."
            - "Use a controller-validated distinct retry result artifact destination with no replacement; preserve all historical failed declared-checks bytes. Existing callers retain their default result path. Test containment, unsafe destination rejection and independent old/new artifacts."
            - "The controller-admitted scope request5c18ab2 adds exactly three verifier files to the original eight roots; this is the sole bounded scope refinement. No original invariant is removed."
          objective: "Implement the typed verification_retry_request in the existing workflow recovery dispatcher using authenticated terminal Kernel/source/check-contract pins and the existing native verifier. Qualify existing d514 execution and persistence primitives first; avoid duplicating an available supported route. Keep immutable Kernel, plan, workitems, prior failed receipt and EVAL byte-exact."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
      intent:
        context: "Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure."
        objective: "Allow one admitted verification retry for immutable completed Kernel followups"
    events:
      -
        command_digest: "sha256:51fe81297fc702d9684709d2c50a551064d5319697febce5250216f3edefbcfc"
        id: "capture:202610280840-VPBGBK:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610280840-VPBGBK"
        occurred_at: "2026-10-28T08:40:40.314Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610280840-VPBGBK"
        task_revision: 1
      -
        command_digest: "sha256:9e2667eaa4770afd4850698d4735b76514ef04c8ca7a9385d7cfdbc29b95603d"
        id: "result:sha256:bae85b4e282cca3afd55e3817b8f630a6bdbe926c3ea68c331d61aeaf761dbd9:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:bae85b4e282cca3afd55e3817b8f630a6bdbe926c3ea68c331d61aeaf761dbd9"
        occurred_at: "2026-10-28T08:45:49.352Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610280840-VPBGBK"
        task_revision: 2
      -
        command_digest: "sha256:4742219588ace1438d2cf9c2544d3fe0769f90e71ae6f8c3505a8c3413c72674"
        id: "sha256:c47e1f773a0acc4375d456d22ff935d789dd7bc00b976bc890577607f10d81d8:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:c47e1f773a0acc4375d456d22ff935d789dd7bc00b976bc890577607f10d81d8"
        occurred_at: "2026-10-28T08:46:15.349Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610280840-VPBGBK"
        task_revision: 3
      -
        command_digest: "sha256:f44796d516384a60b4758555692706136402a9f86b9d2108d0f47238216a2220"
        id: "kernel_work_item_materialization_required:sha256:80c5d4630f7b926271cbec719aaed43c8a739f3bbf617ccb5947ab8cd44a63ce:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:80c5d4630f7b926271cbec719aaed43c8a739f3bbf617ccb5947ab8cd44a63ce:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        occurred_at: "2026-10-28T08:46:24.114Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610280840-VPBGBK"
        task_revision: 4
      -
        command_digest: "sha256:0d3a744417dc6546890e147a389936cc0a6880a6e320402f8af3889e0e38ea5a"
        id: "kernel_work_item_claim_required:sha256:04ed1ae4724cd48e46180ac956ed25fd4f0f0033e2e6eaf4fc76d7acb86f74f2:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:04ed1ae4724cd48e46180ac956ed25fd4f0f0033e2e6eaf4fc76d7acb86f74f2:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        occurred_at: "2026-10-28T08:46:30.163Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610280840-VPBGBK"
        task_revision: 5
      -
        command_digest: "sha256:cb482d04b877faad60d66f69a01487ae986f5cc48aeeae7acc30e75d4b7ddcfd"
        id: "kernel_work_item_execution_required:sha256:8a81ba9e2a66ae2ba882a0ffaf5166a365bec3012656ab31f1a9f0936c4f42a1:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:8a81ba9e2a66ae2ba882a0ffaf5166a365bec3012656ab31f1a9f0936c4f42a1:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        occurred_at: "2026-10-28T08:47:31.535Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610280840-VPBGBK"
        task_revision: 6
      -
        command_digest: "sha256:2ab0e27d57f1053eaaa9827a587ecf7670e52abc9e320a4d769bfc2762adc493"
        id: "semantic-stop:sha256:20afdf7e7825196c5990bd5ad34221875571d7e961c9e379ddfd160dbbfd5be5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:20afdf7e7825196c5990bd5ad34221875571d7e961c9e379ddfd160dbbfd5be5"
        occurred_at: "2026-10-28T08:49:49.274Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610280840-VPBGBK"
        task_revision: 7
      -
        command_digest: "sha256:599347cb94479876fd75223a92e8056da11d936ac5a2cb58e921008ca0d36fb2"
        id: "scope-request:sha256:5c18ab2cc0fc928ca975399a97f6255e5c47a03e7b8a180e6dd26aed0b94c162:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:5c18ab2cc0fc928ca975399a97f6255e5c47a03e7b8a180e6dd26aed0b94c162"
        occurred_at: "2026-10-28T08:50:05.904Z"
        payload_digest: "sha256:6d4864c6e4d0c5594bd4a31a49dfe348c20c67cd0af684ed6be79b7296cf62d9"
        task_id: "202610280840-VPBGBK"
        task_revision: 8
      -
        command_digest: "sha256:ea9b14fd1316cea8c14ffe86d8f3a4be97075aa83931fd454483b883b961b143"
        id: "result:sha256:b1c1b647bcc5dc6daaf99208ee4bfba2705a4a597ba1ea276da98a4dc5a501f2:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b1c1b647bcc5dc6daaf99208ee4bfba2705a4a597ba1ea276da98a4dc5a501f2"
        occurred_at: "2026-10-28T08:51:23.643Z"
        payload_digest: "sha256:f80912d878ce58d21ba34768e330f6973abfbf9bf6a3eda182ae6d678dbee5c4"
        task_id: "202610280840-VPBGBK"
        task_revision: 9
      -
        command_digest: "sha256:8d9bf8b09c5fd195ee8b6dd707700c30e2639382d763a2630b92d300cbb43a6f"
        id: "sha256:a3843fa7e2d17a4ce5eb1546a2bdd0cee591a981503fc13514c04115b887ab94:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a3843fa7e2d17a4ce5eb1546a2bdd0cee591a981503fc13514c04115b887ab94"
        occurred_at: "2026-10-28T08:51:40.870Z"
        payload_digest: "sha256:f0ae1b10cd0c3234aabbd723e45e4261948525d979de764450f482c176e17b05"
        task_id: "202610280840-VPBGBK"
        task_revision: 10
      -
        command_digest: "sha256:2450d530fe3fc86d69d389f213c924ea2bd1a3f1e7b7111076efcd386d954869"
        id: "kernel_work_item_claim_required:sha256:4102beae06ad4983d42f9d1bea435aa5d95167795d9c97b8cc889cf01062eb0d:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:4102beae06ad4983d42f9d1bea435aa5d95167795d9c97b8cc889cf01062eb0d:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        occurred_at: "2026-10-28T08:52:31.093Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610280840-VPBGBK"
        task_revision: 11
      -
        command_digest: "sha256:5e011d8a6cf2d17db675eb57208c9901a5f1a625f4dd5733487c6a6600be80a4"
        id: "kernel_work_item_execution_required:sha256:99bcd9ec3abdcb96aaedd1db5ffd252867559ab1a3a123919bda0d8a9fa76425:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:99bcd9ec3abdcb96aaedd1db5ffd252867559ab1a3a123919bda0d8a9fa76425:sha256:b2c5b6a9844f398841494eba9da19a58171a9dd2c0877f77486f78ca0f74cd68"
        occurred_at: "2026-10-28T08:52:37.679Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610280840-VPBGBK"
        task_revision: 12
      -
        command_digest: "sha256:dc17dbad54b038289d552111922f9ed93c7ee3e27943739f8eb1a2b446ce48cd"
        id: "sha256:ca0adbdd2621ec6ae36719cc77e64c74d4ef1e8e0a0076edf6d76c412b2b002f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ca0adbdd2621ec6ae36719cc77e64c74d4ef1e8e0a0076edf6d76c412b2b002f"
        occurred_at: "2026-10-28T10:15:09.547Z"
        payload_digest: "sha256:5ddca350e3d922e32801a968518ee6b89afaf32271d2c1266857b9fa8c5d8c8d"
        task_id: "202610280840-VPBGBK"
        task_revision: 13
      -
        command_digest: "sha256:3c2dae07c6278de77ec15c2adfcf7f3623e8620aa6ff250e82b8ab087f0e2797"
        id: "semantic-stop:sha256:bd2c2edd6bbd90ba160d5e4b2a0e98251750d677ce4cda04c9f66db76cafe2eb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:bd2c2edd6bbd90ba160d5e4b2a0e98251750d677ce4cda04c9f66db76cafe2eb"
        occurred_at: "2026-10-28T10:15:23.661Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610280840-VPBGBK"
        task_revision: 14
      -
        command_digest: "sha256:0ad9c5399ac8a7b35039cb822db2f0d9950e92dbab092e253b6258333d2dfad2"
        id: "scope-request:sha256:a85688c2f37ac51bf9e20b50b7889142e8f3e03bd4fbd85b5c803aaa7865053e:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:a85688c2f37ac51bf9e20b50b7889142e8f3e03bd4fbd85b5c803aaa7865053e"
        occurred_at: "2026-10-28T10:16:05.446Z"
        payload_digest: "sha256:beadda41c7dddf7111253ed4faa4eaa674a2c37549c1976b5b3bb0b34aa8b792"
        task_id: "202610280840-VPBGBK"
        task_revision: 15
      -
        command_digest: "sha256:fdb2fee223bf74ce6efbecc19c4971d985a6f8e49cb07298ee959bfd41e6b619"
        id: "result:sha256:8a6d7cbcb5d3a71dcb686b7fea084ebb3130f6290d959aa17cb1eb2fe1d9db99:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8a6d7cbcb5d3a71dcb686b7fea084ebb3130f6290d959aa17cb1eb2fe1d9db99"
        occurred_at: "2026-10-28T10:18:49.318Z"
        payload_digest: "sha256:f5366bba6ab6611f87b0bbb42072fa32cb27cbbc2cb8bd4efa8eb37d903c08f7"
        task_id: "202610280840-VPBGBK"
        task_revision: 16
      -
        command_digest: "sha256:af95a684b461513871797099cc16e2539c5e171d2320daafea97997d59fc8fa1"
        id: "sha256:9bc106804f1a020444e3f748a34b348b2c60d5c01ce942e25d980a1269c657c5:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9bc106804f1a020444e3f748a34b348b2c60d5c01ce942e25d980a1269c657c5"
        occurred_at: "2026-10-28T10:19:04.320Z"
        payload_digest: "sha256:40c0b24802b6177cde123e55ae92def16b76ae2a502406c9f691601bb29a9899"
        task_id: "202610280840-VPBGBK"
        task_revision: 17
      -
        command_digest: "sha256:03fc982b532560ecd17d7a11c13d43bdc33e1838de88db37a1307970e98d93ed"
        id: "kernel_work_item_claim_required:sha256:763e92f8ff6344b13543da11af5568d266a5bb0d9343ec95c2a0175d2d55757a:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:763e92f8ff6344b13543da11af5568d266a5bb0d9343ec95c2a0175d2d55757a:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
        occurred_at: "2026-10-28T10:19:42.656Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610280840-VPBGBK"
        task_revision: 18
      -
        command_digest: "sha256:ec8140f4bf0d5bced6e0405975cf1ca57e8b17ea1b81748f4b7c317652fa0f75"
        id: "kernel_work_item_execution_required:sha256:d644f6a9ca3b7c0a21691293de9c68e96ac3f9b9278081b08d2477a58d75e3de:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d644f6a9ca3b7c0a21691293de9c68e96ac3f9b9278081b08d2477a58d75e3de:sha256:65d159a839986ddcb6b56a15bbe3ce98c8788df0a57782a54ea54db5f7493fbd"
        occurred_at: "2026-10-28T10:19:47.908Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610280840-VPBGBK"
        task_revision: 19
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow one admitted verification retry for immutable completed Kernel followups

Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure.

## Scope

- In scope: Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure.
- Out of scope: unrelated refactors not required for "Allow one admitted verification retry for immutable completed Kernel followups".

## Plan

1. Execute approved WorkItem terminal-verification-retry.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
