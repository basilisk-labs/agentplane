---
id: "202608261249-BXQZ97"
title: "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
  - "provider-recovery"
  - "v0.7.8"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "merge"
  - "external_system"
blueprint_request: "quality.regression"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
  - "bunx vitest run packages/agentplane/src/commands/pr"
plan_approval:
  state: "approved"
  updated_at: "2026-08-26T12:55:15.735Z"
  updated_by: "USER"
  note: "User approved exact plan_digest sha256:c1b685f68607044283d4d0a5f038180e7da718349464a0bf48c369045633b6b6 at state_fingerprint sha256:75fb185e8d847de3858e544aafb564d7052cf4aff0667435e910e724f61cd2e7"
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
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch PR isolates the new external effect, authority contract, reconciliation logic, and regression coverage from the release candidate."
      - "The exact-head hosted failure reproduced repeatedly and the current route exposes no normal provider branch-update transition."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/pr"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:1fe48d772426ba1a3fceebd7cbe4904c4ea89e9190396b8ca19923f3e4c5f718"
      escalation_reasons:
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
      - "external_effect:external_write"
      - "external_effect:network_read"
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
events:
  -
    type: "status"
    at: "2026-08-26T12:55:24.250Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-26T12:55:24.250Z"
doc_updated_by: "CODER"
description: "Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ."
sections:
  Summary: |-
    Add a digest-bound provider update-branch recovery transition for stale hosted PR heads

    Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ.
  Scope: |-
    - In scope: Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ.
    - Out of scope: unrelated refactors not required for "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads".
  Plan: "Implement one authority-bound provider update-branch effect and route stale, aligned, behind hosted PR heads through it before classifying failed checks as semantic implementation rework."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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
    completion_contract_digest: "sha256:eb99fc494c3b962e340ff87de629edc93bafdb74f8bcd7882f7b2048ca5b217c"
    digest: "sha256:65f8c7d93fd96a24011974c4d9afe3a6385ae71b4cbbdb497bcf3f869e910ea2"
    grant_id: "9103a1a9-3687-4779-9a66-85ba84d6b5c7"
    issued_at: "2026-08-26T12:55:15.735Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:aa5a673fc3aee51a53288602e2a3b427c312610c7151d440ce80174bbf9c18a8"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:1a8e009a74a6a60da0c9acf5ab642363ce87f6e0c2cfb72131207c1038c3823b"
    status: "active"
    task_id: "202608261249-BXQZ97"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-26T12:55:15.735Z"
        approved_by: "USER"
        approved_digest: "sha256:c1b685f68607044283d4d0a5f038180e7da718349464a0bf48c369045633b6b6"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-26T12:53:11.441Z"
      digest: "sha256:c1b685f68607044283d4d0a5f038180e7da718349464a0bf48c369045633b6b6"
      proposal:
        assumptions:
          - "GitHub update-branch accepts expected_head_sha and produces a provider-generated head whose readback can be bound to the previously observed head and base SHA."
          - "GitLab support may remain explicitly unsupported in this patch if it fails closed before any effect and the provider-neutral operation contract remains extensible without a compatibility layer."
          - "The current provider observation continues to expose mergeability.providerState=behind with exact local, upstream, and hosted head alignment."
        planning_baseline:
          captured_at: "2026-08-26T12:49:33.774Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c24326b8dfdac527d5b514f7981186d5301d0085b0bc6ecd72fd60079fef1b90"
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
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608261249-BXQZ97/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "79bc13ff33358c49e216901f59c8fbc0a17987d2"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608261249-BXQZ97"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/pr/internal/change-request-provider.test.ts"
              id: "check-provider-update"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
              id: "check-route"
              kind: "deterministic"
              required: true
              timeout_ms: 240000
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              id: "check-supervisor"
              kind: "deterministic"
              required: true
              timeout_ms: 240000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
          criteria:
            -
              check_ids:
                - "check-provider-update"
                - "check-route"
                - "check-supervisor"
                - "check-full"
              description: "Focused provider, route, authority, and supervisor regressions pass; full local CI passes; and the resulting operation can safely refresh the preserved 9RCWZQ PR head through a fresh digest-bound AgentPlane packet."
              id: "criterion-release-recovery-route"
              required: true
          evidence_fingerprint: "sha256:c24326b8dfdac527d5b514f7981186d5301d0085b0bc6ecd72fd60079fef1b90"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-provider-update"
                  description: "The GitHub update-branch request is issued only for one observed OPEN PR whose head, base branch, base SHA, and provider identity match the operation parameters."
                  id: "criterion-exact-effect-binding"
                  required: true
                -
                  check_ids:
                    - "check-provider-update"
                  description: "A successful or uncertain transport outcome is reconciled by provider readback, and success is reported only when the new hosted head contains the expected old head and exact base SHA evidence."
                  id: "criterion-readback-reconciliation"
                  required: true
                -
                  check_ids:
                    - "check-provider-update"
                  description: "Head drift, base drift, conflicts, missing evidence, unavailable observations, ambiguity, and unsupported providers stop before effect or return a typed non-success without mutating AgentPlane-owned task or PR identity state."
                  id: "criterion-provider-fail-closed"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 196608
                optional_sources:
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
                  - "packages/agentplane/src/commands/pr/provider-head.ts"
                required_sources:
                  - "packages/agentplane/src/commands/pr/internal/change-request-model.ts"
                  - "packages/agentplane/src/commands/pr/internal/change-request-provider.ts"
                  - "packages/agentplane/src/commands/pr/internal/gh-api.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
                symbol_hints:
                  - "ObservedChangeRequest"
                  - "observeExistingChangeRequestByNumber"
                  - "runGhApiJson"
                  - "hasCoherentGithubPrMergeability"
              depends_on: []
              expected_outputs:
                - "provider-update-branch-effect-contract"
                - "github-expected-head-update-and-readback"
                - "fail-closed-provider-regressions"
              id: "provider-update-branch-effect"
              objective: "Add a provider-neutral update-branch mutation contract whose GitHub implementation binds the effect to the observed PR number, expected head SHA, target base branch and base SHA, then reconciles success or effect-in-doubt by exact provider readback."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/pr"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/pr/internal/change-request-provider.test.ts"
                    id: "check-provider-update"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-provider-update"
                    description: "The GitHub update-branch request is issued only for one observed OPEN PR whose head, base branch, base SHA, and provider identity match the operation parameters."
                    id: "criterion-exact-effect-binding"
                    required: true
                  -
                    check_ids:
                      - "check-provider-update"
                    description: "A successful or uncertain transport outcome is reconciled by provider readback, and success is reported only when the new hosted head contains the expected old head and exact base SHA evidence."
                    id: "criterion-readback-reconciliation"
                    required: true
                  -
                    check_ids:
                      - "check-provider-update"
                    description: "Head drift, base drift, conflicts, missing evidence, unavailable observations, ambiguity, and unsupported providers stop before effect or return a typed non-success without mutating AgentPlane-owned task or PR identity state."
                    id: "criterion-provider-fail-closed"
                    required: true
                evidence_fingerprint: "sha256:c24326b8dfdac527d5b514f7981186d5301d0085b0bc6ecd72fd60079fef1b90"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-route"
                    - "check-supervisor"
                  description: "An aligned OPEN PR with failing hosted checks, exact provider/local head agreement, coherent mergeability, and providerState=behind emits the provider update-branch approval/effect route before implementation_rework_required."
                  id: "criterion-route-before-rework"
                  required: true
                -
                  check_ids:
                    - "check-route"
                    - "check-supervisor"
                  description: "The operation is present in the exhaustive registry, effect policy, projection, command-prefix, and configured-authority surfaces and cannot execute without exact operation, state fingerprint, and state-scope authorization."
                  id: "criterion-digest-authority"
                  required: true
                -
                  check_ids:
                    - "check-route"
                  description: "Non-behind hosted failures, conflicting or unknown mergeability, stale provider heads, and actual source regressions continue to route to the existing fail-closed or semantic rework paths."
                  id: "criterion-no-false-recovery"
                  required: true
                -
                  check_ids:
                    - "check-supervisor"
                  description: "Pre-effect failure is retryable only through a distinct supervisor operation, while effect-in-doubt requires readback and never repeats the provider effect blindly."
                  id: "criterion-effect-replay-safe"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
                  - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
                  - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
                  - "packages/agentplane/src/commands/task/configured-authority.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step.ts"
                  - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
                  - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                symbol_hints:
                  - "WorkflowOperationId"
                  - "WORKFLOW_OPERATION_REGISTRY"
                  - "WORKFLOW_OPERATION_AUTHORITY_POLICY"
                  - "addHostedCheckFailureReworkBlocker"
                  - "executeBranchWorkflowOperation"
              depends_on:
                - "provider-update-branch-effect"
              expected_outputs:
                - "digest-bound-provider-update-route"
                - "supervisor-effect-recovery"
                - "route-and-authority-regression-suite"
              id: "route-digest-bound-update-before-rework"
              objective: "Register the provider update-branch operation, classify it as approval-bound external recovery, select it for aligned failing hosted heads with providerState=behind, execute it through the branch supervisor, and preserve ordinary implementation rework for genuine source failures."
              optional: false
              priority: 2
              required_inputs:
                - "provider-update-branch-effect-contract"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
                    id: "check-route"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 240000
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                    id: "check-supervisor"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 240000
                criteria:
                  -
                    check_ids:
                      - "check-route"
                      - "check-supervisor"
                    description: "An aligned OPEN PR with failing hosted checks, exact provider/local head agreement, coherent mergeability, and providerState=behind emits the provider update-branch approval/effect route before implementation_rework_required."
                    id: "criterion-route-before-rework"
                    required: true
                  -
                    check_ids:
                      - "check-route"
                      - "check-supervisor"
                    description: "The operation is present in the exhaustive registry, effect policy, projection, command-prefix, and configured-authority surfaces and cannot execute without exact operation, state fingerprint, and state-scope authorization."
                    id: "criterion-digest-authority"
                    required: true
                  -
                    check_ids:
                      - "check-route"
                    description: "Non-behind hosted failures, conflicting or unknown mergeability, stale provider heads, and actual source regressions continue to route to the existing fail-closed or semantic rework paths."
                    id: "criterion-no-false-recovery"
                    required: true
                  -
                    check_ids:
                      - "check-supervisor"
                    description: "Pre-effect failure is retryable only through a distinct supervisor operation, while effect-in-doubt requires readback and never repeats the provider effect blindly."
                    id: "criterion-effect-replay-safe"
                    required: true
                evidence_fingerprint: "sha256:c24326b8dfdac527d5b514f7981186d5301d0085b0bc6ecd72fd60079fef1b90"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608261249-BXQZ97"
    event_cursor: 0
    final_validation: null
    id: "202608261249-BXQZ97"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/commands/pr"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-26T12:49:26.888Z"
      constraints: []
      request: |-
        Add a digest-bound provider update-branch recovery transition for stale hosted PR heads

        Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ.
      task_id: "202608261249-BXQZ97"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-26T12:55:15.735Z"
    work_items:
      provider-update-branch-effect:
        attempt: 0
        claim_id: null
        id: "provider-update-branch-effect"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      route-digest-bound-update-before-rework:
        attempt: 0
        claim_id: null
        id: "route-digest-bound-update-before-rework"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  task_execution_context:
    base_ref: "79bc13ff33358c49e216901f59c8fbc0a17987d2"
    base_sha: "79bc13ff33358c49e216901f59c8fbc0a17987d2"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "79bc13ff33358c49e216901f59c8fbc0a17987d2"
    version: 1
id_source: "generated"
---
## Summary

Add a digest-bound provider update-branch recovery transition for stale hosted PR heads

Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ.

## Scope

- In scope: Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ.
- Out of scope: unrelated refactors not required for "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads".

## Plan

Implement one authority-bound provider update-branch effect and route stale, aligned, behind hosted PR heads through it before classifying failed checks as semantic implementation rework.

## Verify Steps

PLANNER fallback scaffold for "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
