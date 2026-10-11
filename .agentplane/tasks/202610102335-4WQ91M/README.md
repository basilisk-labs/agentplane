---
id: "202610102335-4WQ91M"
title: "Use the actual merged target for hosted task closure"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "release-repair"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T01:35:56.538Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-11T02:32:32.710Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-11T01:35:25.567Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "9b2ded0f10896c8e25f97954787fe4e64d325451"
  review_identity_digest: "sha256:754d566566fab8140446aec37a129a708d97909ba5ba13263f16ad091091be28"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610102335-4WQ91M/9bdcdf34e2357183e51b09394233d6a944dc7a73ad5a48f9bf0562e3f8b307cb/quality-report.json"
  findings:
    - "Verified all 13 required context blocks and accepted implementation/repository/native-validation/report bindings at native commit 9b2ded0f10896c8e25f97954787fe4e64d325451. All four source hashes and ten report evidence hashes match."
    - "The workflow retains installation, build, parser and CLI in the default-branch checkout. It checks out the validated merged base separately as task data, checks same repository and exact merge ancestry, and invokes an absolute trusted dist CLI with repository-local handoff disabled. No PR head checkout is introduced."
    - "Metadata rejects absent or malformed refs, invalid merge identity and foreign repository instead of substituting main. Validated refs are passed through the established deterministic closure metadata and normal provider readback/merge path."
    - "The unchanged hosted-close handler still returns a canonical-task no-op and preserves legacy idempotency. This repair does not synthesize closure evidence or inherit historical review."
    - "Verified three native check manifests and nine raw log hashes: both focused files passed all 15 tests, typecheck and diff check passed. Reviewed the real Git assembly artifact fixture and trusted CLI/base-local executable and bootstrap canary test."
    - "Only the four admitted source roots changed. Current tracked dirt is the native task README projection. The rejected direct-base execution draft and original protected-CI refusal remain separate retained failures; neither is represented as final qualification."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
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
      - "ci"
      - "repository_write"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - ".github/workflows/task-hosted-close.yml"
      - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
      - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
      - "scripts/workflow/prepare-hosted-task-closure.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".github/workflows/task-hosted-close.yml"
      - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
      - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
      - "scripts/workflow/prepare-hosted-task-closure.mjs"
  observed:
    authority_violations: []
    changed_components:
      - ".github"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - ".github/workflows/task-hosted-close.yml"
      - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
      - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
      - "scripts/workflow/prepare-hosted-task-closure.mjs"
    external_effects: []
    repository_effects:
      - "ci"
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
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
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
    - "effect_ci"
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
          - ".github/workflows/task-hosted-close.yml"
          - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
          - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
          - "scripts/workflow/prepare-hosted-task-closure.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:6e8d78ff9953ffc44575aba2ece6a8c0f32993c988aabe7caca8fb06d980f8bc"
      escalation_reasons:
        - "central_component:.github/workflows/task-hosted-close.yml"
        - "central_component:packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
        - "central_component:scripts/workflow/prepare-hosted-task-closure.mjs"
        - "central_path:.github/workflows/task-hosted-close.yml"
        - "central_path:packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
        - "central_path:scripts/workflow/prepare-hosted-task-closure.mjs"
        - "effect_ci"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".github"
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - ".github/workflows/task-hosted-close.yml"
          - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
          - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
          - "scripts/workflow/prepare-hosted-task-closure.mjs"
        external_effects: []
        repository_effects:
          - "ci"
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
      - "repository_effect:ci"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "9b2ded0f10896c8e25f97954787fe4e64d325451"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-11T02:32:32.710Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-11T02:32:35.688Z"
doc_updated_by: "SUPERVISOR"
description: "Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication."
sections:
  Summary: |-
    Use the actual merged target for hosted task closure

    Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.
  Scope: |-
    - In scope: Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.
    - Out of scope: unrelated refactors not required for "Use the actual merged target for hosted task closure".
  Plan: "1. Execute approved WorkItem repair-hosted-close-target."
  Verify Steps: |-
    PLANNER fallback scaffold for "Use the actual merged target for hosted task closure". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Use the actual merged target for hosted task closure". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-11T02:32:32.710Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3842e630e7a7c48d20234cb92be72f0c70cc48cfd3cc66001f7254c4ba5b8d1, input_digest=sha256:8f0b00668e963965a56af7102cb361920878c6da2185ae3c45d0b3e92f036bac

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:092dbe8d9bd5532ebb46b548d1cf125ee836c4d89a3dd6cee162110758ccd4fc
    - policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
    - capability_digest: sha256:c51d72845b4a974d4297a4785ed58bff071683570b869fc8f22cc727091598b6
    - checks_digest: sha256:b303fcc0de3352cd334613cbc096363cdfe7b0071c343fa02d092eefd20dc6be
    - identity_digest: sha256:6f3beae2c75aaafa6d12a468188bf710dec9dc35c1f1d977de17532341dcfe39

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610102335-4WQ91M
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
    digest: "sha256:0bcb5d94c7180996f180213163743110b56558780f083a4b34b9fad43bef8576"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610102335-4WQ91M/9bdcdf34e2357183e51b09394233d6a944dc7a73ad5a48f9bf0562e3f8b307cb/quality-report.json"
    findings:
      - "Verified all 13 required context blocks and accepted implementation/repository/native-validation/report bindings at native commit 9b2ded0f10896c8e25f97954787fe4e64d325451. All four source hashes and ten report evidence hashes match."
      - "The workflow retains installation, build, parser and CLI in the default-branch checkout. It checks out the validated merged base separately as task data, checks same repository and exact merge ancestry, and invokes an absolute trusted dist CLI with repository-local handoff disabled. No PR head checkout is introduced."
      - "Metadata rejects absent or malformed refs, invalid merge identity and foreign repository instead of substituting main. Validated refs are passed through the established deterministic closure metadata and normal provider readback/merge path."
      - "The unchanged hosted-close handler still returns a canonical-task no-op and preserves legacy idempotency. This repair does not synthesize closure evidence or inherit historical review."
      - "Verified three native check manifests and nine raw log hashes: both focused files passed all 15 tests, typecheck and diff check passed. Reviewed the real Git assembly artifact fixture and trusted CLI/base-local executable and bootstrap canary test."
      - "Only the four admitted source roots changed. Current tracked dirt is the native task README projection. The rejected direct-base execution draft and original protected-CI refusal remain separate retained failures; neither is represented as final qualification."
    implementation_commit: "9b2ded0f10896c8e25f97954787fe4e64d325451"
    implementation_tree: "e636de86fd884e0af073b4f1019c65887d1c92ef"
    projected_at: "2026-10-11T01:35:25.567Z"
    review_identity_digest: "sha256:754d566566fab8140446aec37a129a708d97909ba5ba13263f16ad091091be28"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:a0d0418da23285527057ec613ba6f3afbab0d8b42e2441f619781495eb078adb"
    work_order_id: "sha256:056ea38c46a4d1cd7b331a8398f33359f73e474df6ac54793893bca5245e2259"
  task_execution_context:
    base_ref: "agentplane/J8P9K9-integration"
    base_sha: "743ce58d0c7f8568adb5adf102a5fe78d27ac797"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
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
            digest: "sha256:e69bdcffacee61d225f59ac48dcf0416426d4f270bdcea0a367be93d4680ae03"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:092dbe8d9bd5532ebb46b548d1cf125ee836c4d89a3dd6cee162110758ccd4fc"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7abf88047f526fd264239ec110a7a1597bc3a06e0b12ba8820c33697eeb5eacc"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/task-hosted-close.yml"
              - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
              - "scripts/workflow/prepare-hosted-task-closure.mjs"
            task_id: "202610102335-4WQ91M"
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
            digest: "sha256:8497f956007ea32fcb0f4af96be11e51a89620033e7e040968553f70904b0615"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:092dbe8d9bd5532ebb46b548d1cf125ee836c4d89a3dd6cee162110758ccd4fc"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7abf88047f526fd264239ec110a7a1597bc3a06e0b12ba8820c33697eeb5eacc"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e69bdcffacee61d225f59ac48dcf0416426d4f270bdcea0a367be93d4680ae03"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/task-hosted-close.yml"
              - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
              - "scripts/workflow/prepare-hosted-task-closure.mjs"
            task_id: "202610102335-4WQ91M"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - ".github/workflows/task-hosted-close.yml"
              - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
              - "scripts/workflow/prepare-hosted-task-closure.mjs"
            evidence_digest: "sha256:c464ce755d5858ca187e63173bf7920dbcdf51c45de226a50592083b9d88958f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:7abf88047f526fd264239ec110a7a1597bc3a06e0b12ba8820c33697eeb5eacc"
        digest: "sha256:092dbe8d9bd5532ebb46b548d1cf125ee836c4d89a3dd6cee162110758ccd4fc"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:d398e3fc4b54a06139a6e1b7b23f495db746080f2f0e160f9075c18ecfe6278a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - ".github/workflows/task-hosted-close.yml"
                - "scripts/workflow/prepare-hosted-task-closure.mjs"
                - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
                - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
            expected_outputs:
              - "hosted-close-target-report"
            id: "repair-hosted-close-target"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:a0d0418da23285527057ec613ba6f3afbab0d8b42e2441f619781495eb078adb"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:50f0eea0413f4752d4002830cd62b337ce722fd164492e591f48f4fc6a23b2fd"
          environment_digest: "sha256:d60dfc3930e7bd21b078d44e12701de52f1e3c36ee45630ff2153025423a813d"
          implementation_identity: "sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab"
          toolchain_digest: "sha256:93282af6c10554d8ee613f299170cb0637a148f3b484eb25c3dc391846718ef7"
        observed_at: "2026-10-11T01:36:03.121Z"
        status: "PASSED"
      id: "202610102335-4WQ91M"
      intent_digest: "sha256:a19ba852963666e5630c987bbb8c486a5865e159086f2e3c5e566b7db24d159e"
      migration_receipts: []
      mutation_receipts:
        capture:202610102335-4WQ91M:
          after_revision: 1
          aggregate_digest: "sha256:11378ded2736c9bf51f46e472e76c0f8a257b3ba3f5d06f02a25bb386445c927"
          before_revision: 0
          command_digest: "sha256:37c2d89fc3c06e07138f24b33f6a85372daa8b0e6d52257697f9fadd085db332"
          effect_ids: []
          event_digests:
            - "sha256:3472548b20db383b637aa67c5ab0976f90cf21133b9168eb24632e1354dd530d"
          mutation_id: "capture:202610102335-4WQ91M"
        final-validation:sha256:a0d0418da23285527057ec613ba6f3afbab0d8b42e2441f619781495eb078adb:11:
          after_revision: 12
          aggregate_digest: "sha256:b687c4d4e3285032c05f8c6890f98a52e4af239cbbaa8523c399feb4cbe4b9e6"
          before_revision: 11
          command_digest: "sha256:88ea77bf74e838531c4ce0f5a995110d39732b3053e4a8f29e2d5578918c11a3"
          effect_ids: []
          event_digests:
            - "sha256:9dd5a061cf1eaea3a54668af2af49c6fb0fcf26f2841d06c145c077e4be3c718"
          mutation_id: "final-validation:sha256:a0d0418da23285527057ec613ba6f3afbab0d8b42e2441f619781495eb078adb:11"
        kernel_task_completion_required:sha256:0c7deb9c9ddc6f7b1722d546dd2e5f47332170617f546dfa2cb1d9fc73905708:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab:
          after_revision: 13
          aggregate_digest: "sha256:4b5022c817a01b8ca5fbf071d12148fbadcf2016e48d833bd346d87146d5d0b2"
          before_revision: 12
          command_digest: "sha256:b5ccd11b2fea56a78578d62c14b2326ef9b355f20195857b738ed931e31277cf"
          effect_ids: []
          event_digests:
            - "sha256:c62c03289f18f1f00bc2934d40157575056588d4c3f8828f091f3b57c88e210d"
          mutation_id: "kernel_task_completion_required:sha256:0c7deb9c9ddc6f7b1722d546dd2e5f47332170617f546dfa2cb1d9fc73905708:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab"
        kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 5
          aggregate_digest: "sha256:573d98a110f3dc2dc64d6488052cf93f819c3ac4d437761ea99a5a036f07ac84"
          before_revision: 4
          command_digest: "sha256:d3b602752c46cb25e2cfbcd0ff8acbbf2fc187092e556dd20b64483eac2499d8"
          effect_ids: []
          event_digests:
            - "sha256:b8db557d7fcd779b84f71aa1908be63011ec5bdc24717f85fbda0d9c357c5b73"
          mutation_id: "kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 6
          aggregate_digest: "sha256:22bb6d825325a7d6d15ad538f247b73e6f217bedb721202bc49e86013f8df835"
          before_revision: 5
          command_digest: "sha256:233195e0e8ecfdefa071bbb523826306d8adb063052dedba3debfbe6be8f07f2"
          effect_ids: []
          event_digests:
            - "sha256:8f45ba96a8cab2dfbc2f1d097db43ba9a280fab79046f6e0840d6b1ab8a125e9"
          mutation_id: "kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        kernel_work_item_inspection_required:sha256:608be8e79bb026763cbdd1df50fcf451e861f77c7d5987fc3235c777ca2a98a7:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab:
          after_revision: 9
          aggregate_digest: "sha256:234f66b60585878dfb82be24dd55383eac5829533cd9561d0ea48211c69d0a3d"
          before_revision: 8
          command_digest: "sha256:229bf064f1bb529a48024cf8e78587e4dea90a3e46151a05b7cfad241a5d16e2"
          effect_ids: []
          event_digests:
            - "sha256:20e31a5d284bc5fc435fa2bff14c499ad5d90be5895bad749cf7edbdaeb2b9d3"
          mutation_id: "kernel_work_item_inspection_required:sha256:608be8e79bb026763cbdd1df50fcf451e861f77c7d5987fc3235c777ca2a98a7:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab"
        kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 4
          aggregate_digest: "sha256:298ecdd180a4d21396d1c788108ff5d6786a784949ccc0de71aa481e784ee0b2"
          before_revision: 3
          command_digest: "sha256:0aa0ff2b46966973db329bdb1a1d6166a68afa61278749ffc2cfbf45ddf6da04"
          effect_ids: []
          event_digests:
            - "sha256:0fc30cc8c9083c57a50aefbe4f8a9d47aa075219341e2681053430af10140710"
          mutation_id: "kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        result:sha256:056ea38c46a4d1cd7b331a8398f33359f73e474df6ac54793893bca5245e2259:
          after_revision: 8
          aggregate_digest: "sha256:78e9a88e7ece4f8077a4bf5158d77208b991f47d9fe0e61f85b14a9a4c00c6ef"
          before_revision: 7
          command_digest: "sha256:9149399973361ae0b20a9635b8a64a6506878df5629f7f111c3e333b9ca5c2cf"
          effect_ids: []
          event_digests:
            - "sha256:c46c38aa0ea3a16b6fbc7bce4a2c0e154030460d8d8b17cedc174b52a7163410"
          mutation_id: "result:sha256:056ea38c46a4d1cd7b331a8398f33359f73e474df6ac54793893bca5245e2259"
        result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9:
          after_revision: 2
          aggregate_digest: "sha256:0bcabfe3417b1c7c1b7690cdcc79b802d18f3d378bdcbc071550e3f54534bd4b"
          before_revision: 1
          command_digest: "sha256:a14841f79c47664b216771e788809beca2a34eff39772ad62a4a2e6627de43f5"
          effect_ids: []
          event_digests:
            - "sha256:ee24218018bc9a517174a3f6841282edf9fd4744eb375a9be88fafbaa621e22d"
          mutation_id: "result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9"
        sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e:
          after_revision: 3
          aggregate_digest: "sha256:0f1a09bd763bb1ab8797d50f85ad87188c4e6d0f93c5c3b091e63db052c91127"
          before_revision: 2
          command_digest: "sha256:55530ad2fca71fca4caef6a5c35b2e11fb2717d91bbaedfb43ee14c3b9b4cefc"
          effect_ids: []
          event_digests:
            - "sha256:a9529e35b72a8cf17a8019d36d8c82344356322c93013aa8776b7081386472a8"
          mutation_id: "sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e"
        sha256:8748ae058d6155e7388fdd9b07a01536a8c335e0f681295da1307e6966a9eb85:
          after_revision: 7
          aggregate_digest: "sha256:c4640b0812d88d9b562b085ab15fcb0b6ea840ddf70827f65a368cb6ef68f262"
          before_revision: 6
          command_digest: "sha256:3ed4bc3e91ee322c9fc8c40f5b6d65a3a246e5bdc7ebd4e0b06a09725c4058ae"
          effect_ids: []
          event_digests:
            - "sha256:451660a03adc0a04db11196672a1a0a9c4629b3d45bb4afcf2e111b42aa9e706"
          mutation_id: "sha256:8748ae058d6155e7388fdd9b07a01536a8c335e0f681295da1307e6966a9eb85"
        validation-resolution:sha256:f98880fbb78b423026c8ce8a85b2f16d85dca195d8c1643845ebe0ef6df554db:
          after_revision: 11
          aggregate_digest: "sha256:7f2aa3d21e03b5e04dc027b3f50ede6c678ddbb5ebdfbb1742e935ac7091dc29"
          before_revision: 10
          command_digest: "sha256:60477a6f522c3b630b2f49a799b0ea5b67ad1ba452f615a903739ff61d5bd166"
          effect_ids: []
          event_digests:
            - "sha256:a11712a9ecced0f2f2a0e238d87e7c130a8d8f6c4b4c0177c1659886e027abb4"
          mutation_id: "validation-resolution:sha256:f98880fbb78b423026c8ce8a85b2f16d85dca195d8c1643845ebe0ef6df554db"
        validation:sha256:9bdcdf34e2357183e51b09394233d6a944dc7a73ad5a48f9bf0562e3f8b307cb:
          after_revision: 10
          aggregate_digest: "sha256:2e31e5a890c4ce24d80fddc64d3dfe8a1ed73410659969358cac1e12d437e049"
          before_revision: 9
          command_digest: "sha256:6479c8229cbee332f7470389610911b68e14d8e24a0021676fb0b6c85331483c"
          effect_ids: []
          event_digests:
            - "sha256:2204db94d865238aed09d9d006a74415bfe63c0f190feda3b51fff779fbfd474"
          mutation_id: "validation:sha256:9bdcdf34e2357183e51b09394233d6a944dc7a73ad5a48f9bf0562e3f8b307cb"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        repair-hosted-close-target:
          attempt: 1
          claim_id: "sha256:edfbb15aef9d62c233240ae54fd3c0ef3329fbe77f09a70c7fef8cabdb4204b1"
          definition:
            contract_digest: "sha256:d398e3fc4b54a06139a6e1b7b23f495db746080f2f0e160f9075c18ecfe6278a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - ".github/workflows/task-hosted-close.yml"
                - "scripts/workflow/prepare-hosted-task-closure.mjs"
                - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
                - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
            expected_outputs:
              - "hosted-close-target-report"
            id: "repair-hosted-close-target"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:4d4ccc71355c0d9d14318e44f630426672b0a2b59f7448a9c953eaefbe2c750c"
              id: "hosted-close-target-report"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab"
              task_id: "202610102335-4WQ91M"
              work_item_id: "repair-hosted-close-target"
          result_digest: "sha256:f76a2c2ed2922bd227c40e77988fda8ca38088d2c35fc79c0f94ce214623cb98"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:95a5db800a3eb75eefe48a1a1787cc19e9a3f92f6bf5788fe50c4bf04d4885e3"
              - "sha256:754d566566fab8140446aec37a129a708d97909ba5ba13263f16ad091091be28"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:50f0eea0413f4752d4002830cd62b337ce722fd164492e591f48f4fc6a23b2fd"
              environment_digest: "sha256:faed453a3840fedaa9ea6e328464bdf9d9db45aec8c4a271f145fc100b1c9d9b"
              implementation_identity: "sha256:f76a2c2ed2922bd227c40e77988fda8ca38088d2c35fc79c0f94ce214623cb98"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-11T01:35:25.567Z"
            status: "PASSED"
    digest: "sha256:c4c7b556fc74b9ebfcb0fe2d55c2f021a83a36e46dff2428ae3d9e6f6ea668db"
    documents:
      contracts:
        sha256:d398e3fc4b54a06139a6e1b7b23f495db746080f2f0e160f9075c18ecfe6278a:
          acceptance_criteria:
            - "Reproduce the actual non-main target mismatch with a bounded fixture: a merged task PR targets an assembly branch containing its task artifacts while main lacks them. The workflow must select the authenticated merged target before task lookup; retain the original hosted failure as evidence."
            - "Use the actual merged PR base repository/ref and merge identity. Fail closed on missing, malformed, foreign or ambiguous target metadata; do not silently substitute main. Preserve named branch handling and deterministic closure metadata."
            - "Preserve pull_request_target trust: never check out or execute an untrusted pull-request head, never interpolate unvalidated event strings as shell code, and keep privileged execution tied to reviewed repository/base content. Preserve existing permissions and normal checks; no fake event or dispatch."
            - "Preserve canonical Task Kernel ownership (hosted-close remains a no-op for canonical tasks), legacy closure idempotency, existing branch/PR readback and normal merge requirements. No consumer state repair, historical review inheritance or task completion fabrication."
            - "Run the declared focused tests, typecheck and diff check. Include main and non-main targets, malformed or absent refs and repository mismatch rejection. Change only the four admitted roots; report any additional dependency before edits."
          objective: "Select and authenticate the actual merged target for generic hosted task closure without executing untrusted PR head code or weakening native ownership."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication."
        objective: "Use the actual merged target for hosted task closure"
    events:
      -
        command_digest: "sha256:37c2d89fc3c06e07138f24b33f6a85372daa8b0e6d52257697f9fadd085db332"
        id: "capture:202610102335-4WQ91M:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610102335-4WQ91M"
        occurred_at: "2026-10-10T23:35:38.987Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610102335-4WQ91M"
        task_revision: 1
      -
        command_digest: "sha256:a14841f79c47664b216771e788809beca2a34eff39772ad62a4a2e6627de43f5"
        id: "result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9"
        occurred_at: "2026-10-10T23:37:32.606Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610102335-4WQ91M"
        task_revision: 2
      -
        command_digest: "sha256:55530ad2fca71fca4caef6a5c35b2e11fb2717d91bbaedfb43ee14c3b9b4cefc"
        id: "sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e"
        occurred_at: "2026-10-10T23:37:59.848Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610102335-4WQ91M"
        task_revision: 3
      -
        command_digest: "sha256:0aa0ff2b46966973db329bdb1a1d6166a68afa61278749ffc2cfbf45ddf6da04"
        id: "kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:38:29.278Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610102335-4WQ91M"
        task_revision: 4
      -
        command_digest: "sha256:d3b602752c46cb25e2cfbcd0ff8acbbf2fc187092e556dd20b64483eac2499d8"
        id: "kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:38:43.605Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610102335-4WQ91M"
        task_revision: 5
      -
        command_digest: "sha256:233195e0e8ecfdefa071bbb523826306d8adb063052dedba3debfbe6be8f07f2"
        id: "kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:41:05.405Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610102335-4WQ91M"
        task_revision: 6
      -
        command_digest: "sha256:3ed4bc3e91ee322c9fc8c40f5b6d65a3a246e5bdc7ebd4e0b06a09725c4058ae"
        id: "sha256:8748ae058d6155e7388fdd9b07a01536a8c335e0f681295da1307e6966a9eb85:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8748ae058d6155e7388fdd9b07a01536a8c335e0f681295da1307e6966a9eb85"
        occurred_at: "2026-10-11T00:15:01.795Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610102335-4WQ91M"
        task_revision: 7
      -
        command_digest: "sha256:9149399973361ae0b20a9635b8a64a6506878df5629f7f111c3e333b9ca5c2cf"
        id: "result:sha256:056ea38c46a4d1cd7b331a8398f33359f73e474df6ac54793893bca5245e2259:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:056ea38c46a4d1cd7b331a8398f33359f73e474df6ac54793893bca5245e2259"
        occurred_at: "2026-10-11T00:15:26.078Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610102335-4WQ91M"
        task_revision: 8
      -
        command_digest: "sha256:229bf064f1bb529a48024cf8e78587e4dea90a3e46151a05b7cfad241a5d16e2"
        id: "kernel_work_item_inspection_required:sha256:608be8e79bb026763cbdd1df50fcf451e861f77c7d5987fc3235c777ca2a98a7:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:608be8e79bb026763cbdd1df50fcf451e861f77c7d5987fc3235c777ca2a98a7:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab"
        occurred_at: "2026-10-11T00:15:54.263Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610102335-4WQ91M"
        task_revision: 9
      -
        command_digest: "sha256:6479c8229cbee332f7470389610911b68e14d8e24a0021676fb0b6c85331483c"
        id: "validation:sha256:9bdcdf34e2357183e51b09394233d6a944dc7a73ad5a48f9bf0562e3f8b307cb:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9bdcdf34e2357183e51b09394233d6a944dc7a73ad5a48f9bf0562e3f8b307cb"
        occurred_at: "2026-10-11T01:35:39.619Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610102335-4WQ91M"
        task_revision: 10
      -
        command_digest: "sha256:60477a6f522c3b630b2f49a799b0ea5b67ad1ba452f615a903739ff61d5bd166"
        id: "validation-resolution:sha256:f98880fbb78b423026c8ce8a85b2f16d85dca195d8c1643845ebe0ef6df554db:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:f98880fbb78b423026c8ce8a85b2f16d85dca195d8c1643845ebe0ef6df554db"
        occurred_at: "2026-10-11T01:35:47.198Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610102335-4WQ91M"
        task_revision: 11
      -
        command_digest: "sha256:88ea77bf74e838531c4ce0f5a995110d39732b3053e4a8f29e2d5578918c11a3"
        id: "final-validation:sha256:a0d0418da23285527057ec613ba6f3afbab0d8b42e2441f619781495eb078adb:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:a0d0418da23285527057ec613ba6f3afbab0d8b42e2441f619781495eb078adb:11"
        occurred_at: "2026-10-11T02:32:25.974Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610102335-4WQ91M"
        task_revision: 12
      -
        command_digest: "sha256:b5ccd11b2fea56a78578d62c14b2326ef9b355f20195857b738ed931e31277cf"
        id: "kernel_task_completion_required:sha256:0c7deb9c9ddc6f7b1722d546dd2e5f47332170617f546dfa2cb1d9fc73905708:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:0c7deb9c9ddc6f7b1722d546dd2e5f47332170617f546dfa2cb1d9fc73905708:sha256:b834b4a381d4553fb27899b293f39bd2bbaecc4f181ad05898b7e7147a8e21ab"
        occurred_at: "2026-10-11T02:33:23.602Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202610102335-4WQ91M"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Use the actual merged target for hosted task closure

Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.

## Scope

- In scope: Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.
- Out of scope: unrelated refactors not required for "Use the actual merged target for hosted task closure".

## Plan

1. Execute approved WorkItem repair-hosted-close-target.

## Verify Steps

PLANNER fallback scaffold for "Use the actual merged target for hosted task closure". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Use the actual merged target for hosted task closure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-11T02:32:32.710Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f3842e630e7a7c48d20234cb92be72f0c70cc48cfd3cc66001f7254c4ba5b8d1, input_digest=sha256:8f0b00668e963965a56af7102cb361920878c6da2185ae3c45d0b3e92f036bac

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610102335-4WQ91M/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610102335-4WQ91M Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:092dbe8d9bd5532ebb46b548d1cf125ee836c4d89a3dd6cee162110758ccd4fc
- policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
- capability_digest: sha256:c51d72845b4a974d4297a4785ed58bff071683570b869fc8f22cc727091598b6
- checks_digest: sha256:b303fcc0de3352cd334613cbc096363cdfe7b0071c343fa02d092eefd20dc6be
- identity_digest: sha256:6f3beae2c75aaafa6d12a468188bf710dec9dc35c1f1d977de17532341dcfe39

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610102335-4WQ91M
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
