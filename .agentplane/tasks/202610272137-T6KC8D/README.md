---
id: "202610272137-T6KC8D"
title: "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T21:40:50.770Z"
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
    - "effect_external_write"
    - "effect_release_metadata"
    - "effect_schema"
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
      - "release_metadata"
      - "repository_write"
      - "schema"
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
      - "public_api"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src"
      - "packages/core/src/tasks/task-kernel"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src"
      - "packages/core/src/tasks/task-kernel"
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
    - "effect_release_metadata"
    - "effect_schema"
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
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src"
          - "packages/core/src/tasks/task-kernel"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:c598156b4b4393158ad2c9bdf435565686f7dcf61cf2516f192736086ca33a7f"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel"
        - "effect_release_metadata"
        - "effect_schema"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-27T21:37:41.744Z"
doc_updated_by: "CODER"
description: "Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification."
sections:
  Summary: |-
    Complete generic hosted PR adoption with exact-base-safe merge and CLI reference

    Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.
  Scope: |-
    - In scope: Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.
    - Out of scope: unrelated refactors not required for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference".
  Plan: "1. Execute approved WorkItem generic-adopted-hosted-pr-lifecycle."
  Verify Steps: |-
    PLANNER fallback scaffold for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "6b0a86164c6cf94466b527c70c8da3fed76b6dfc"
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
            digest: "sha256:29272e84ddc26a9d63ef685c3a54873275ef261ec5baf651b685ac17fe8b47a6"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:cdd96803df632a3a2f16c3200195d21e0f3e33bfe087003fc7bcf40279f75487"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src"
              - "packages/core/src/tasks/task-kernel"
            task_id: "202610272137-T6KC8D"
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
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:5d6160ad16ebd5a8fbda99f606e28c106b166e46314678799b8502efb8cf6935"
        digest: "sha256:cdd96803df632a3a2f16c3200195d21e0f3e33bfe087003fc7bcf40279f75487"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:115b189ea5b4d4cb9d6ffeab274eb3a980302f0dd863e3e2f410f90f23adc2df"
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
                - "schema"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
                - "packages/core/src/tasks/task-kernel"
                - "docs/user/cli-reference.generated.mdx"
            expected_outputs:
              - "authoritative-adoption-identity-and-strict-persistence"
              - "canonical-exact-head-evidence-and-independent-review"
              - "supervisor-owned-provider-update-merge-close-route"
              - "focused-negative-tests-and-full-ci-receipt"
              - "exact-base-safe-provider-merge-strategy"
              - "fresh-generated-cli-reference"
              - "ordinary-route-regression-repair"
            id: "generic-adopted-hosted-pr-lifecycle"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610272137-T6KC8D"
      intent_digest: "sha256:96d10d5a43221a3c17ac7cc18478add576738aa3bae9aab6d786e759d567d17f"
      migration_receipts: []
      mutation_receipts:
        capture:202610272137-T6KC8D:
          after_revision: 1
          aggregate_digest: "sha256:b5e475b5ea7a9aab62d94bc9c7bb159fabe625e121ec53972ad98b805dab2142"
          before_revision: 0
          command_digest: "sha256:a424b420fcd2dfee527ca9404c4f3c955666d3164e2aeb4bbf74e18103539413"
          effect_ids: []
          event_digests:
            - "sha256:57570ba16d916094c4144a7cfe08433f4ce8c7f6a427c3a6bd51d33c4551a7a4"
          mutation_id: "capture:202610272137-T6KC8D"
        kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:
          after_revision: 5
          aggregate_digest: "sha256:86cea86dbc1f23cd12c8aa065395b6b1bd0de5500a58cff48a74ed82af886067"
          before_revision: 4
          command_digest: "sha256:bdcccc51733b48e1b00711134e3a0bd8c4886b30ca8c8db1f017ce320d04a257"
          effect_ids: []
          event_digests:
            - "sha256:31b177f4b7c33898cdb915bed4453bc750df266196102b88743b8cb6e114dcaf"
          mutation_id: "kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:
          after_revision: 6
          aggregate_digest: "sha256:56dd0aa6fc90e8c8b8b37b5427008b7510b844aa77cc44bc1624778be8b01770"
          before_revision: 5
          command_digest: "sha256:c82f5ca487a2d4b6ad7443874de9ec7c51acf4566b2230f4fb2f58169e8be77e"
          effect_ids: []
          event_digests:
            - "sha256:2e73a8bb51099197004fa57eafb6041f333590c000437cda9382806582402e1e"
          mutation_id: "kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:
          after_revision: 4
          aggregate_digest: "sha256:597fc226446f5c2737160f3aa0df0ce27cd55673c048e8fc87a562df9ea2c32a"
          before_revision: 3
          command_digest: "sha256:4c394c80b29987f9b748947d6d888e5c50b46829502082f7a16e0d2dfbe1d915"
          effect_ids: []
          event_digests:
            - "sha256:29b73af9ad7b58874aba9a38f207c51e40ac86890d42b2cd7c424f74fcc87cac"
          mutation_id: "kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0:
          after_revision: 2
          aggregate_digest: "sha256:6e25c17c63c8ae306ce27b827c44813c0933c3f19006ece98a8e3108d16e1a8a"
          before_revision: 1
          command_digest: "sha256:514d6cf0449a16780562c34991cc315df0099e67f118d153d5beab925af1baee"
          effect_ids: []
          event_digests:
            - "sha256:f98bab41c80667bbe6e777bffa3c2825731f20293c2728a18e854d74ea2539dc"
          mutation_id: "result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0"
        sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544:
          after_revision: 3
          aggregate_digest: "sha256:e33a902d9c53608fb26025625e62c446e82df7afad8775ebe4b7cc4eeb836437"
          before_revision: 2
          command_digest: "sha256:3315029dac167a31583d27d703cdbea5b675f403b3ebefa28c3773461c97fe79"
          effect_ids: []
          event_digests:
            - "sha256:b2f13e1ab58e6cbe525c39647ea38183209fccefefcab92168531170a68b0833"
          mutation_id: "sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        generic-adopted-hosted-pr-lifecycle:
          attempt: 1
          claim_id: "sha256:e222800d8d947d066ac78db7fc02a1c9a02490b3cc2bceaa1d2d4e0f782f9fea"
          definition:
            contract_digest: "sha256:115b189ea5b4d4cb9d6ffeab274eb3a980302f0dd863e3e2f410f90f23adc2df"
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
                - "schema"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src"
                - "packages/core/src/tasks/task-kernel"
                - "docs/user/cli-reference.generated.mdx"
            expected_outputs:
              - "authoritative-adoption-identity-and-strict-persistence"
              - "canonical-exact-head-evidence-and-independent-review"
              - "supervisor-owned-provider-update-merge-close-route"
              - "focused-negative-tests-and-full-ci-receipt"
              - "exact-base-safe-provider-merge-strategy"
              - "fresh-generated-cli-reference"
              - "ordinary-route-regression-repair"
            id: "generic-adopted-hosted-pr-lifecycle"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:00c9d4a005048fe1895e5552d35a05683794785ef3ec3bd82b2ceae0f1b2c069"
    documents:
      contracts:
        sha256:115b189ea5b4d4cb9d6ffeab274eb3a980302f0dd863e3e2f410f90f23adc2df:
          acceptance_criteria:
            - "Persist immutable provider/repository/PR/base/head/tree/adoption identity from authoritative primary control store. Strict kernelValidationSchema.identity accepts and preserves only the optional hosted_head_evidence_digest; metadata rebuild preserves previousMeta.adoption. Reject foreign repositories, conflicting identities, missing control-store records, and tampered or replayed receipts."
            - "Canonical TESTER, independent EVALUATOR, and final validation bind one observed hosted PR head and matching repository tree to the approved task/Plan and current provider readback. Reject stale head/base, changed required checks, mismatched tree, missing review evidence, and changed task identity. Do not reuse local or hosted CI evidence for a different head."
            - "Native provider check, branch update, guarded merge, hosted close, and restart/replay recovery use current provider readback and separate matching USER grants for external writes. Preserve existing branch_pr policies for required checks, reviews, branch protection, and task cleanliness. Never use admin or force merge, and do not perform provider writes inside the semantic episode."
            - "Register generic adoption commands in the CLI catalog/loader and preserve authority through shared workflow steps and side-effect projection. Keep ordinary newly-created PR lifecycle behavior unchanged. Do not derive integration truth from a transient task checkout or silently fill missing evidence."
            - "Cover authoritative control-store persistence, adapter strictness and replay, CLI dispatch, exact-head TESTER/EVALUATOR/final-validation, provider update/merge/close, stale authority, concurrent head change, and interrupted operation with focused negative tests. Run typecheck, lint/format as applicable, mandatory full CI, and independent EVALUATOR before branch publication."
            - "Keep changes to the named generic production files and nearest tests within the three approved roots. Preserve 621P51 and 138DXY until successor work is safely transferred and their native closure routes are separately authorized."
            - "A hard process exit after provider update or merge but before the local receipt leaves a running intent. Recover it with the native journal transition under the retained lease and exact prior USER grant. Reconcile the immutable provider result without repeating the remote effect. Fail closed on changed PR identity, head, base ancestry, or grant."
            - "A repeated canonical controller transfer preserves a primary descendant after Hosted Close and rejects divergent history. The source task DONE state cannot bypass adopted merge or primary transfer. Clean primary readback reaches DONE only after the guarded merge and native close route."
            - "Add focused negative tests for running-intent crash, same-second merge timestamp, duplicate exact USER grants, update and merge replay, base drift, and stale source controller handoff."
            - "An adopted GitHub PR uses a merge-commit method whose immutable first parent can prove the exact authorized pre-merge base for a multi-commit head. Never try rebase first or fall back to rebase. If merge commits are disabled, fail before provider PUT. After success and on crash recovery, require exact provider identity/head, merge commit, and first parent equal the authorized base. A base advance between guard and effect cannot be recorded as success."
            - "For adopted GitLab MRs, read the target project merge strategy before the remote effect and fail closed on FF, automatic rebase, or an ambiguous strategy that cannot guarantee an immutable exact-base parent. Treat an ambiguous transport response as effect in doubt; reconcile by fresh readback under the original USER grant without issuing a second merge request. Keep ordinary branch_pr method policy unchanged."
            - "The global adopted recovery hook leaves ordinary task routes untouched before resolving gitCommonDir, acquiring an adopted journal lease, or reading a provider. Ordinary final validation resolves an adopted hosted route only when the latest accepted repository evidence has adopted_hosted_pr origin. Evaluator review ignores ordinary PR metadata with no adoption marker, but strictly validates marked adoption metadata and never overwrites non-adopted PR artifacts."
            - "Update optional repository-evidence test fixtures and normal-route negative tests so the full core suite confirms both adopted and non-adopted behavior. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog; its pr adopt command is present and bun run docs:cli:check passes. Preserve exact EWN source provenance; old EWN task remains for separate native supersession after validated transfer."
            - "Run focused provider merge, adopted lifecycle, normal-route regression, and docs checks; run typecheck, lint/format, mandatory full CI, and independent EVALUATOR before publication. No provider mutation occurs inside the semantic WorkItem."
          objective: "Implement a generic native branch_pr route for an existing same-repository hosted PR. The planned production files are core task-kernel/{model,kernel,index,hosted-pr-head-evidence}.ts; agentplane adapters/task-backend/kernel-record.ts; CLI run-cli/command-catalog/project.ts and command-loaders/project.ts; commands/task/kernel-{accepted-repository-evidence,adopted-pr-route,final-validation,hosted-checkout,hosted-head-evidence,hosted-readback,inspection,inspection-validation,repository-coordinator,repository-types,semantic-result}.ts and branch-task-supervisor-{episodes,operations}.ts; commands/evaluator/evaluator-qualification-review.ts; commands/shared/pr-meta/builders.ts, side-effect-authority-policy.ts, side-effect-authority.ts, workflow-operation-{effects,prefix,projection}.ts, workflow-postconditions.ts, workflow-step-reducer.ts, workflow-step.ts, workflow-step-adopted-pr.ts; commands/pr/{check,flow-status,pr.spec,provider-update-branch}.ts and internal/sync.ts, plus adoption-{identity,merge,observe,request,route,store,task-authority,verification}.ts and adoption.command.ts. Add nearest tests under these same roots. Transfer package source and tests from EWNMG7 implementation c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 only after this WorkOrder; reject transient adoption-checkout and compatibility TESTER/EVALUATOR episodes. No bot-, provider-, or repository-specific adapter or workaround. Additional named generic production files required for replay and durable handoff are commands/task/advance-task-step.ts, kernel-controller-handoff.ts, adopted-provider-effect-recovery.ts; commands/shared/supervisor-execution-episode.ts, provider-update-branch-route.ts, canonical-pre-merge-evidence.ts. Additional named provider merge production files are commands/pr/integrate/internal/github-pr-merge.ts and gitlab-mr-merge.ts. Regenerate docs/user/cli-reference.generated.mdx from the current CLI catalog. The nearest tests include commands/pr/integrate/internal/gitlab-mr-merge.test.ts, a new GitHub merge-strategy test, commands/pr/adoption-merge.test.ts, commands/task/roadmap-terminal-noop.test.ts, commands/task/roadmap-common-review-application.test.ts, commands/evaluator/evaluator-run.command.test.ts, runner/usecases/kernel-task-lifecycle.test.ts, and commands/task/kernel-inspection.test.ts."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/core/src/tasks/task-kernel/hosted-pr-head-evidence.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-review.adoption.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-hosted-checkout.test.ts packages/agentplane/src/commands/task/kernel-hosted-readback.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.hosted.test.ts packages/agentplane/src/commands/task/kernel-final-validation.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/shared/pr-meta/builders.adoption.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts --pool=forks --maxWorkers 1"
            - "bun run typecheck"
            - "bun run ci:local:full"
            - "bunx vitest run packages/agentplane/src/commands/task/adopted-provider-effect-recovery.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/adoption-merge-base-proof.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/shared/workflow-step-adopted-pr.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/pr/adoption-merge.test.ts --pool=forks --maxWorkers 1"
            - "bunx vitest run packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts --pool=forks --maxWorkers 1"
            - "bun run docs:cli:check"
      intent:
        context: "Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification."
        objective: "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference"
    events:
      -
        command_digest: "sha256:a424b420fcd2dfee527ca9404c4f3c955666d3164e2aeb4bbf74e18103539413"
        id: "capture:202610272137-T6KC8D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610272137-T6KC8D"
        occurred_at: "2026-10-27T21:37:41.674Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610272137-T6KC8D"
        task_revision: 1
      -
        command_digest: "sha256:514d6cf0449a16780562c34991cc315df0099e67f118d153d5beab925af1baee"
        id: "result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:bec47b9192fd9177befc9daee8d2043eabb3941513ac2a68def3b077452ccbc0"
        occurred_at: "2026-10-27T21:39:19.953Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610272137-T6KC8D"
        task_revision: 2
      -
        command_digest: "sha256:3315029dac167a31583d27d703cdbea5b675f403b3ebefa28c3773461c97fe79"
        id: "sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:51f2ac8f54724900eb7d7e69997e0df7421709c956863e11769815d9802c3544"
        occurred_at: "2026-10-27T21:40:46.605Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610272137-T6KC8D"
        task_revision: 3
      -
        command_digest: "sha256:4c394c80b29987f9b748947d6d888e5c50b46829502082f7a16e0d2dfbe1d915"
        id: "kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5f5b2398e2e2032ed4da5c6b9a7623f16e3a4e9ffc6aa88bb980a2ee23cfba0a:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        occurred_at: "2026-10-27T21:41:05.593Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610272137-T6KC8D"
        task_revision: 4
      -
        command_digest: "sha256:bdcccc51733b48e1b00711134e3a0bd8c4886b30ca8c8db1f017ce320d04a257"
        id: "kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:41118746e6e4a0a149c3a0c1a0147d01048bff731310c86a88c4df510a601776:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        occurred_at: "2026-10-27T21:41:21.888Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610272137-T6KC8D"
        task_revision: 5
      -
        command_digest: "sha256:c82f5ca487a2d4b6ad7443874de9ec7c51acf4566b2230f4fb2f58169e8be77e"
        id: "kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cb2ac7e8c9789425a16ce49acab84fa7f920264fc8f4bc2845d39e1401bce77b:sha256:b2b5c425b0948c105d734bcef1e7747404348480ab2fcba9e761fbe1d007e45d"
        occurred_at: "2026-10-27T21:42:17.854Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610272137-T6KC8D"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Complete generic hosted PR adoption with exact-base-safe merge and CLI reference

Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.

## Scope

- In scope: Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.
- Out of scope: unrelated refactors not required for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference".

## Plan

1. Execute approved WorkItem generic-adopted-hosted-pr-lifecycle.

## Verify Steps

PLANNER fallback scaffold for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
