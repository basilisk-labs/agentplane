---
id: "202610311835-GVTHA3"
title: "Deliver terminal verification retry from current canonical main"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
  - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-31T18:55:30.808Z"
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
    - "effect_public_api"
    - "effect_publish"
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
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
      - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record-terminal-projection.ts"
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
      - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
      - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
      - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record-terminal-projection.ts"
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
    - "effect_public_api"
    - "effect_publish"
    - "effect_schema"
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
          - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
          - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
          - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
          - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
          - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
          - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record-terminal-projection.ts"
          - "packages/agentplane/src/commands/task/verify-record.ts"
          - "packages/agentplane/src/commands/task/verify-record.types.ts"
          - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
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
      digest: "sha256:b9272d30ba12434e3c36db5779b4cc32fb8f823b58f0af7b03b1d3209c78c48a"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
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
      - "external_effect:network_read"
      - "external_effect:publish"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-31T18:35:31.439Z"
doc_updated_by: "CODER"
description: "The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded."
sections:
  Summary: |-
    Deliver terminal verification retry from current canonical main

    The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded.
  Scope: |-
    - In scope: The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded.
    - Out of scope: unrelated refactors not required for "Deliver terminal verification retry from current canonical main".
  Plan: "1. Execute approved WorkItem deliver-current-main-terminal-retry."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "f89d603f7fa9b70bca5896fef42212c4c1590fe8"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
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
            digest: "sha256:3f69d57cfed456af2476b8af9cb9bad375402585419f9c9b863512c2b8d469de"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:247f128d7712b891668846042fe7cb8a73bfe27d51864be612710057379c769e"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c8b09a8830860be7b0f059614cc609d30ce36bac6eacf8aee10890521f910a0f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
              - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/verify-record-execute.ts"
              - "packages/agentplane/src/commands/task/verify-record-terminal-projection.ts"
              - "packages/agentplane/src/commands/task/verify-record.ts"
              - "packages/agentplane/src/commands/task/verify-record.types.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610311835-GVTHA3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            digest: "sha256:238b9d06829722bbf5c614d764a05ede4485b4fbc7fa79a44cd03f2c4288b72d"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:247f128d7712b891668846042fe7cb8a73bfe27d51864be612710057379c769e"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c8b09a8830860be7b0f059614cc609d30ce36bac6eacf8aee10890521f910a0f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3f69d57cfed456af2476b8af9cb9bad375402585419f9c9b863512c2b8d469de"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f0a4089786c21afca6050cac2d8c9eb1f715b2f2397f1fead8bd00df296823b3"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
              - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
              - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
              - "packages/agentplane/src/commands/task/verify-record-execute.ts"
              - "packages/agentplane/src/commands/task/verify-record-terminal-projection.ts"
              - "packages/agentplane/src/commands/task/verify-record.ts"
              - "packages/agentplane/src/commands/task/verify-record.types.ts"
              - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
            task_id: "202610311835-GVTHA3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:50e0d1cc1e999b34d97cc0fcf1ea115499581b7d0675639f6501e3ac26650f97"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:c8b09a8830860be7b0f059614cc609d30ce36bac6eacf8aee10890521f910a0f"
        digest: "sha256:247f128d7712b891668846042fe7cb8a73bfe27d51864be612710057379c769e"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:fbf5ce048445e5be951c7b12776a503f24c1e5ae439c0b2dd2d74fb84f19c58b"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
                - "schema"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
                - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                - "packages/agentplane/src/commands/task/verify-record.ts"
                - "packages/agentplane/src/commands/task/verify-record.types.ts"
                - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verify-record-terminal-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
            expected_outputs:
              - "current-main-terminal-retry-source"
              - "current-main-terminal-retry-coverage"
            id: "deliver-current-main-terminal-retry"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610311835-GVTHA3"
      intent_digest: "sha256:957ca93a16423d61495a39da2e7d186b8282195687c103c02adbcf023e673e91"
      migration_receipts: []
      mutation_receipts:
        capture:202610311835-GVTHA3:
          after_revision: 1
          aggregate_digest: "sha256:e8067651909a0113ea05383e5e52b0f023068aa3268ac5ac5b8b5774f29e7126"
          before_revision: 0
          command_digest: "sha256:b3e74b548636dff552cc9b9dfc13ad333785e0fd51028ee13898989e7d71f331"
          effect_ids: []
          event_digests:
            - "sha256:f98793efe488eab30c7e85c0545f2200881b46de505eeff905677fea3fe680b1"
          mutation_id: "capture:202610311835-GVTHA3"
        kernel_work_item_claim_required:sha256:d6bb5f437c0b1f822eeaf102ca3098b9baf8b04da13e84ed929f07d57b7ebba8:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c:
          after_revision: 5
          aggregate_digest: "sha256:c2aae4fed06d1ed1c436638d041dbe511b4922bd7c6a9cb70ec7c5838789418a"
          before_revision: 4
          command_digest: "sha256:1bf4bd02176d4fa08b8990622f73e62cd810e4910b36029e6eeb83d8ae966d8f"
          effect_ids: []
          event_digests:
            - "sha256:7a933ac7bf39c43816d0668cb719ee3f4237f0c299edb498318ab2229485ad2d"
          mutation_id: "kernel_work_item_claim_required:sha256:d6bb5f437c0b1f822eeaf102ca3098b9baf8b04da13e84ed929f07d57b7ebba8:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c"
        kernel_work_item_execution_required:sha256:a7f924500cd3847839e837b7d0e98ebff1a7f1ddbaa588851d9c804c756a8970:sha256:f0a4089786c21afca6050cac2d8c9eb1f715b2f2397f1fead8bd00df296823b3:
          after_revision: 7
          aggregate_digest: "sha256:45fff073176e966a397a71b8671c5509b5b9a124bf4ba9e1dafb8308a141b158"
          before_revision: 6
          command_digest: "sha256:a37823c9810a6697fbef47dd3055ec75122a86bb0fd70f173e54fe20a01be0c7"
          effect_ids: []
          event_digests:
            - "sha256:c3ba7e0a34fdffa5a4908f694317152277f0eaa36be89c53f96e062981409acc"
          mutation_id: "kernel_work_item_execution_required:sha256:a7f924500cd3847839e837b7d0e98ebff1a7f1ddbaa588851d9c804c756a8970:sha256:f0a4089786c21afca6050cac2d8c9eb1f715b2f2397f1fead8bd00df296823b3"
        kernel_work_item_materialization_required:sha256:271f2535105c87283a4c4e264141c364ac6a0b066c9bcd003bfb93fe526a34aa:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c:
          after_revision: 4
          aggregate_digest: "sha256:ab8f248dbf5f5736777eb7e629ae5fc526366a606008c6ca8abf4390a321958d"
          before_revision: 3
          command_digest: "sha256:a7513468fbcd6af2d477807ca46e0773393788a50a497853bf630bf8f393277a"
          effect_ids: []
          event_digests:
            - "sha256:3e8b3ec6e13c7d66ddaaf11ba973f9f16b2fb0b306bf5b9daa5c5186d14452df"
          mutation_id: "kernel_work_item_materialization_required:sha256:271f2535105c87283a4c4e264141c364ac6a0b066c9bcd003bfb93fe526a34aa:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c"
        result:sha256:d9de6bcb12fe091286d5d5545b2adc680c96f61655dc71b1d09351f6d0dd6708:
          after_revision: 2
          aggregate_digest: "sha256:285332f83e80dccc870408c5191f4b4d1a4e4ff6431092af9f8f8c1996aa624b"
          before_revision: 1
          command_digest: "sha256:e0394c8b1c570de1798aee4116f28b5d3da4fec9b3d0fd7e73eed3cd7eee3afb"
          effect_ids: []
          event_digests:
            - "sha256:dd0efaa30dad50e04b538d471594e05879e4d0424ca68e8fc9731d72b464a873"
          mutation_id: "result:sha256:d9de6bcb12fe091286d5d5545b2adc680c96f61655dc71b1d09351f6d0dd6708"
        sha256:b2ec45c2212041f065a3f1b297f44a24b1f398be34d2c518469da153ca712498:
          after_revision: 6
          aggregate_digest: "sha256:8568dcb152fbf0818584339d19d6f786250d3737ec8114a0a2a1e5a6364df8f2"
          before_revision: 5
          command_digest: "sha256:388a68d0f672223ffe968edaef70c3e06545cbeb20c6c48d76eecfe7d12fcec7"
          effect_ids: []
          event_digests:
            - "sha256:74bfe1ed74348b216183f4f0ada02bcf680e0a37bbfebdabdefaeead87d9b059"
          mutation_id: "sha256:b2ec45c2212041f065a3f1b297f44a24b1f398be34d2c518469da153ca712498"
        sha256:f1542ffcf961d3c095eac4016776626ef076ba051a2a5a7559e2e7b018845ec6:
          after_revision: 3
          aggregate_digest: "sha256:c41c379971d7af585d9aa6be0d5b941ef80a57c6b8522a094081b050012554ed"
          before_revision: 2
          command_digest: "sha256:ff586375fad3d09222d4ecb7990b673882481c85c06a4fa97d561dc745530665"
          effect_ids: []
          event_digests:
            - "sha256:7e6fc4cd39cb1f9de3f968c5229158ede25a1e82450a5857b655ed9ebccfa53d"
          mutation_id: "sha256:f1542ffcf961d3c095eac4016776626ef076ba051a2a5a7559e2e7b018845ec6"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        deliver-current-main-terminal-retry:
          attempt: 1
          claim_id: "sha256:7235a463d54936070b63c251a3466ceacf49028bbd99193caf8fe261992f3ecc"
          definition:
            contract_digest: "sha256:fbf5ce048445e5be951c7b12776a503f24c1e5ae439c0b2dd2d74fb84f19c58b"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
                - "schema"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/task/verification-retry-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts"
                - "packages/agentplane/src/commands/task/verification-retry-source-proof.ts"
                - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                - "packages/agentplane/src/commands/task/verify-record.ts"
                - "packages/agentplane/src/commands/task/verify-record.types.ts"
                - "packages/agentplane/src/commands/task/workflow-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/verify-record-terminal-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
            expected_outputs:
              - "current-main-terminal-retry-source"
              - "current-main-terminal-retry-coverage"
            id: "deliver-current-main-terminal-retry"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:3364925c17b1160a942bdd7190d38327fd9cf1493444beb062cc12af102413d4"
    documents:
      contracts:
        sha256:fbf5ce048445e5be951c7b12776a503f24c1e5ae439c0b2dd2d74fb84f19c58b:
          acceptance_criteria:
            - "Implement the exact missing terminal verification retry feature on the current canonical base. Import only the reviewed 13 source files and keep changes within the 15 intake roots. Do not import Task records, old approvals, quality reports, journals or protected proofs."
            - "Expose only the strict typed verification_retry_request through the existing public task advance workflow recovery. Bind repository, exact approved completed Kernel, source/head, approved command contract and genuine retained supervisor failure."
            - "Run every mandatory real command exactly once under the existing supervisor lease. Preserve immutable Kernel and Plan, old failed check receipt and supervisor journal, prior EVAL, PR identity, body and historical artifacts. Do not adopt independent PASS as native authority."
            - "Use durable source-bound intent, prepared afterimage and final receipt for interruption and replay. Refuse duplicate executor admission, unknown completion, invalid or changed receipt, source/scope/command drift, old EVAL tampering and provider identity changes."
            - "Support both .agentplane/tasks and a configured nested workflow directory. Reject absolute paths, traversal, intermediate symlinks and changed containment. Hash artifact symlink targets without traversal. Preserve existing default callers."
            - "Preserve generic no-source-change rework rules, frozen-base checks, Task artifact ownership checks, provider guards, direct verification policy and supported native projection boundaries. Require fresh EVALUATOR review after successful retry."
            - "Keep verify-record-execute.ts within the existing 600-line limit. Use a focused extraction if required. Do not raise limits, add allowlist exceptions or compress code to hide complexity."
            - "Keep the exact CR/LF body-file native comment test, distinct writes, cold reads and duplicate replay. Investigate the full-suite readback_mismatch. Retain the failed evidence. Focused PASS does not establish that the failed native suite passed."
            - "Cover actual public CLI admission and success, failure and interrupted retries, exact old artifact preservation, concurrency, duplicate replay and default/custom layouts with the nearest existing tests. Do not weaken assertions or skip mandatory checks."
            - "Complete the three declared checks on the final source through the native controller. Require independent current-source EVALUATOR, stable hosted CI and canonical protected PR integration. Do not claim deployment or SB live acceptance from this source Task."
            - "Preserve the old VPB Task Kernel and branch, PR6957, failed run015, MRJ recovery evidence, all existing worktrees and archives. Exclude Factory files, four pending-intent retirement actions, runtime, credentials and global files."
          objective: "Implement and validate the missing terminal verification retry feature from the reviewed source candidate on canonical main. Preserve native guards and historical data. Resolve the module budget failure and investigate the cold-read regression."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts"
      intent:
        context: "The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded."
        objective: "Deliver terminal verification retry from current canonical main"
    events:
      -
        command_digest: "sha256:b3e74b548636dff552cc9b9dfc13ad333785e0fd51028ee13898989e7d71f331"
        id: "capture:202610311835-GVTHA3:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610311835-GVTHA3"
        occurred_at: "2026-10-31T18:35:31.389Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610311835-GVTHA3"
        task_revision: 1
      -
        command_digest: "sha256:e0394c8b1c570de1798aee4116f28b5d3da4fec9b3d0fd7e73eed3cd7eee3afb"
        id: "result:sha256:d9de6bcb12fe091286d5d5545b2adc680c96f61655dc71b1d09351f6d0dd6708:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d9de6bcb12fe091286d5d5545b2adc680c96f61655dc71b1d09351f6d0dd6708"
        occurred_at: "2026-10-31T18:48:01.139Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610311835-GVTHA3"
        task_revision: 2
      -
        command_digest: "sha256:ff586375fad3d09222d4ecb7990b673882481c85c06a4fa97d561dc745530665"
        id: "sha256:f1542ffcf961d3c095eac4016776626ef076ba051a2a5a7559e2e7b018845ec6:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:f1542ffcf961d3c095eac4016776626ef076ba051a2a5a7559e2e7b018845ec6"
        occurred_at: "2026-10-31T18:55:29.522Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610311835-GVTHA3"
        task_revision: 3
      -
        command_digest: "sha256:a7513468fbcd6af2d477807ca46e0773393788a50a497853bf630bf8f393277a"
        id: "kernel_work_item_materialization_required:sha256:271f2535105c87283a4c4e264141c364ac6a0b066c9bcd003bfb93fe526a34aa:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:271f2535105c87283a4c4e264141c364ac6a0b066c9bcd003bfb93fe526a34aa:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c"
        occurred_at: "2026-10-31T18:56:00.161Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610311835-GVTHA3"
        task_revision: 4
      -
        command_digest: "sha256:1bf4bd02176d4fa08b8990622f73e62cd810e4910b36029e6eeb83d8ae966d8f"
        id: "kernel_work_item_claim_required:sha256:d6bb5f437c0b1f822eeaf102ca3098b9baf8b04da13e84ed929f07d57b7ebba8:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d6bb5f437c0b1f822eeaf102ca3098b9baf8b04da13e84ed929f07d57b7ebba8:sha256:9aae03568df3a44f8c169abd05e1372b5c62827c465556e74b841ac3bc521c9c"
        occurred_at: "2026-10-31T18:56:05.538Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610311835-GVTHA3"
        task_revision: 5
      -
        command_digest: "sha256:388a68d0f672223ffe968edaef70c3e06545cbeb20c6c48d76eecfe7d12fcec7"
        id: "sha256:b2ec45c2212041f065a3f1b297f44a24b1f398be34d2c518469da153ca712498:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b2ec45c2212041f065a3f1b297f44a24b1f398be34d2c518469da153ca712498"
        occurred_at: "2026-10-31T18:59:13.266Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610311835-GVTHA3"
        task_revision: 6
      -
        command_digest: "sha256:a37823c9810a6697fbef47dd3055ec75122a86bb0fd70f173e54fe20a01be0c7"
        id: "kernel_work_item_execution_required:sha256:a7f924500cd3847839e837b7d0e98ebff1a7f1ddbaa588851d9c804c756a8970:sha256:f0a4089786c21afca6050cac2d8c9eb1f715b2f2397f1fead8bd00df296823b3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a7f924500cd3847839e837b7d0e98ebff1a7f1ddbaa588851d9c804c756a8970:sha256:f0a4089786c21afca6050cac2d8c9eb1f715b2f2397f1fead8bd00df296823b3"
        occurred_at: "2026-10-31T18:59:15.882Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610311835-GVTHA3"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Deliver terminal verification retry from current canonical main

The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded.

## Scope

- In scope: The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded.
- Out of scope: unrelated refactors not required for "Deliver terminal verification retry from current canonical main".

## Plan

1. Execute approved WorkItem deliver-current-main-terminal-retry.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast packages/agentplane/src/commands/task/verification-retry-effect-recovery.test.ts packages/agentplane/src/commands/task/verification-retry-source-proof.test.ts packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.workflow-recovery.verification-retry.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
