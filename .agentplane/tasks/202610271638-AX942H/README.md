---
id: "202610271638-AX942H"
title: "Make native PR publication converge with clean, published task artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane test -- open.convergence.test.ts"
  - "bun run --filter=agentplane typecheck"
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T16:41:03.229Z"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
      - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
      - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
          - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
          - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
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
      digest: "sha256:a75b32a24ead62ffe5eb0ac6a0417182914734c4d66d86b4bcea5e14168a822c"
      escalation_reasons: []
      execution_groups:
        - "core"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-27T16:38:17.221Z"
doc_updated_by: "CODER"
description: "Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration."
sections:
  Summary: |-
    Make native PR publication converge with clean, published task artifacts

    Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration.
  Scope: |-
    - In scope: Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration.
    - Out of scope: unrelated refactors not required for "Make native PR publication converge with clean, published task artifacts".
  Plan: "1. Execute approved WorkItem pr-publication-artifact-convergence."
  Verify Steps: |-
    PLANNER fallback scaffold for "Make native PR publication converge with clean, published task artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make native PR publication converge with clean, published task artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "8fc5ace3e9cfbc9e5dabf15336b5b1f79bf53e8c"
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
            digest: "sha256:46c21a8f34de15593f7458d251bd4d7d03be3b49c6cfa1f3262403697abd29ea"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2eeec8f1d1495c476bb254d1257c4ade4d4992ca4507677c09064b74569a7483"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:797356c99361d33df6955f182ce551405844e1032a9ee4aacf87c149ad4e3559"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
              - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
            task_id: "202610271638-AX942H"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
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
            digest: "sha256:1e003f80f6f7ad474d8be5e6f0d78adb70eac60d23c6e2227e6725d771d9343a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2eeec8f1d1495c476bb254d1257c4ade4d4992ca4507677c09064b74569a7483"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:797356c99361d33df6955f182ce551405844e1032a9ee4aacf87c149ad4e3559"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:46c21a8f34de15593f7458d251bd4d7d03be3b49c6cfa1f3262403697abd29ea"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:56853009c5e711cf087289b056633bccadfc1845a01c13e5c022a188d7b7097a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
              - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
            task_id: "202610271638-AX942H"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
            evidence_digest: "sha256:8e5c571dc656335c28156ba41300479ec46760a75e21b2738b2ad6919b34cb99"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:797356c99361d33df6955f182ce551405844e1032a9ee4aacf87c149ad4e3559"
        digest: "sha256:2eeec8f1d1495c476bb254d1257c4ade4d4992ca4507677c09064b74569a7483"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:a550a97f97722f2534fd6fea4f7e2aed79f93b1a746f5370a17c8c55f213f3ca"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
                - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
                - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
            expected_outputs:
              - "clean-postpublication-task-worktree"
              - "hosted-exact-head-alignment"
              - "idempotent-publication-regressions"
              - "verification-evidence"
            id: "pr-publication-artifact-convergence"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610271638-AX942H"
      intent_digest: "sha256:2d5ea2a7a62ec48cfed6d2f5bb0e0ede83e5c8c5c80eace1204be17d3df6e2e2"
      migration_receipts: []
      mutation_receipts:
        capture:202610271638-AX942H:
          after_revision: 1
          aggregate_digest: "sha256:af4e55f9211026eec7b11ec3539adf1fd00ec2a847ad5b5f5cd169a2808e48a7"
          before_revision: 0
          command_digest: "sha256:99e2725bed5ea5da6214a5639998eae812491d4108136c50781e00da7fc42591"
          effect_ids: []
          event_digests:
            - "sha256:a4c4c09e97172441f2f6d2cfbea3c69ef03600eb60dfddfa686e8002893a628d"
          mutation_id: "capture:202610271638-AX942H"
        kernel_work_item_claim_required:sha256:e7416fad4d0540d4fc4a940581f5d3dc3a9f327c5b439e59ec39576ccf5852cc:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951:
          after_revision: 5
          aggregate_digest: "sha256:4060168d5acd1ad8d2d52fa1f4131bb97ab937383bbbfe5bf519d2dcf62aa9cc"
          before_revision: 4
          command_digest: "sha256:8d3aaf15a5d4b0d1c5a71b294efc50ea754881a40287cb6c2d03e8f84a63ec32"
          effect_ids: []
          event_digests:
            - "sha256:98012534401a0a4f3560c3931974506504d0a5791c82a614e39fd75127d78599"
          mutation_id: "kernel_work_item_claim_required:sha256:e7416fad4d0540d4fc4a940581f5d3dc3a9f327c5b439e59ec39576ccf5852cc:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
        kernel_work_item_execution_required:sha256:b5debe609b118e127c182ec876ceb844bccb78ad741760ea3178f9caee477423:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951:
          after_revision: 6
          aggregate_digest: "sha256:eb1da188870bed72038c2272ff4aab559ff0b4c23f9e8d5aa71a4d1566720754"
          before_revision: 5
          command_digest: "sha256:a9eec9a5d27c051b7b456735130c7430845e9e16080d530566e8e32357c63817"
          effect_ids: []
          event_digests:
            - "sha256:fe2b88cc9598cde3e20b60f9fc22190231983a652b15af658ec0600123cb536b"
          mutation_id: "kernel_work_item_execution_required:sha256:b5debe609b118e127c182ec876ceb844bccb78ad741760ea3178f9caee477423:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
        kernel_work_item_materialization_required:sha256:7935b438efcf1beb40808b6682f9acca7c8ab0209fbe45a4507c8d60fb4e7159:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951:
          after_revision: 4
          aggregate_digest: "sha256:2d3c7ef3e563b0c47eb7e562eccfe6c1b79f5bf8c2ea2bdef4db9d05eb952f99"
          before_revision: 3
          command_digest: "sha256:a07be916e36ba0271a7b14bb48c959f8a36ddb20458e8a1c913392851f1e65f6"
          effect_ids: []
          event_digests:
            - "sha256:a1b598f8d3e126fc560008a444a947702352b42251d6075816c76ce3c2514974"
          mutation_id: "kernel_work_item_materialization_required:sha256:7935b438efcf1beb40808b6682f9acca7c8ab0209fbe45a4507c8d60fb4e7159:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
        result:sha256:6daec7154721c3a122686b887cb391a88018b3c17295c33058d780324f076a9c:
          after_revision: 2
          aggregate_digest: "sha256:9bc587864da28b32b7e823524d230632192ceaeb461dfee8f83f38eb47b038f9"
          before_revision: 1
          command_digest: "sha256:a4c9494c0031f31b5c9d6eeee3f0456ab651fe24d6b9aae20dd858e1143c1ae6"
          effect_ids: []
          event_digests:
            - "sha256:98f995ec192aa777ea874cdddcd4d41983d2551c544ad13c4e11680437ceab5f"
          mutation_id: "result:sha256:6daec7154721c3a122686b887cb391a88018b3c17295c33058d780324f076a9c"
        sha256:496dc6719bef6170d5db4d9145fff5bdbbb31c991aa48b099776e7ffde00b75f:
          after_revision: 3
          aggregate_digest: "sha256:8a091d62113a5869fba27613a5fb5017a6d112d6859ec28623ba468aedbd39ec"
          before_revision: 2
          command_digest: "sha256:06d79077e76ea179b94f52e2cd483753053d113e03e8a871ad06a9ca41c6a47b"
          effect_ids: []
          event_digests:
            - "sha256:e789d4dbe97f7501d92e7342b2906b87d3cde5b7b79a287f5e0f63fff5ff4a6c"
          mutation_id: "sha256:496dc6719bef6170d5db4d9145fff5bdbbb31c991aa48b099776e7ffde00b75f"
        sha256:e6e02cc29a3deb8c2d1c0eb016245076675a0ff86e466f222cb90c1a695b2683:
          after_revision: 7
          aggregate_digest: "sha256:9e35880b3480d6cfda96189b28d92497108f0ddbf7bff0262cf004e242b13678"
          before_revision: 6
          command_digest: "sha256:c6b46c939518dfd3029f96c6306b1ae6e94be21048f417e12a024e226b42aaba"
          effect_ids: []
          event_digests:
            - "sha256:5ab9c9a1dc7f8086358bb88e153b9e56080f001b78bfed15f95d9257dfc21930"
          mutation_id: "sha256:e6e02cc29a3deb8c2d1c0eb016245076675a0ff86e466f222cb90c1a695b2683"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        pr-publication-artifact-convergence:
          attempt: 1
          claim_id: "sha256:8bcd7cd159daed4e0bc13cb90545cc1eb17a84274c158b3f3201803e0289df30"
          definition:
            contract_digest: "sha256:a550a97f97722f2534fd6fea4f7e2aed79f93b1a746f5370a17c8c55f213f3ca"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
                - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
                - "packages/agentplane/src/commands/pr/open.convergence.test.ts"
            expected_outputs:
              - "clean-postpublication-task-worktree"
              - "hosted-exact-head-alignment"
              - "idempotent-publication-regressions"
              - "verification-evidence"
            id: "pr-publication-artifact-convergence"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:092e361fd5d9c62447020c564dfd635aa0e434f716407b0b34e28911fe297de7"
    documents:
      contracts:
        sha256:a550a97f97722f2534fd6fea4f7e2aed79f93b1a746f5370a17c8c55f213f3ca:
          acceptance_criteria:
            - "After a newly created hosted PR is observed, its number, URL, status and provider identity are committed in the task's native PR metadata. The local branch, upstream branch and hosted PR head agree on the final commit; the task worktree is clean."
            - "When the same open PR and exact branch head are already linked, retrying publication does not create another PR, another commit, a dirty artifact, or an updated_at change without a semantic metadata change."
            - "When hosted creation, branch push, or provider readback fails or is uncertain, the command does not invent PR identity or claim aligned publication. Recovery remains bounded and does not bypass approval, required verification, hosted checks, or protected integration."
            - "Focused tests exercise new PR creation, existing PR linkage, repeated no-op publication, uncertain or failed provider effects, and exact-head readback. Tests use local fake providers and do not write to GitHub."
            - "The change stays inside the four declared source/test paths, and release-critical EPC #6947 task state is not mutated by this work item."
          objective: "Make the native pr.open and pr.head.publish command converge after hosted PR creation or linkage. Persist only the final observed PR artifacts, publish the resulting exact task-branch head, and leave the task worktree clean. Preserve existing effect authority and fail closed when publication or readback is uncertain."
          role: "EXECUTOR"
          verification_commands:
            - "bun run --filter=agentplane test -- open.convergence.test.ts"
            - "bun run --filter=agentplane typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration."
        objective: "Make native PR publication converge with clean, published task artifacts"
    events:
      -
        command_digest: "sha256:99e2725bed5ea5da6214a5639998eae812491d4108136c50781e00da7fc42591"
        id: "capture:202610271638-AX942H:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610271638-AX942H"
        occurred_at: "2026-10-27T16:38:17.112Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610271638-AX942H"
        task_revision: 1
      -
        command_digest: "sha256:a4c9494c0031f31b5c9d6eeee3f0456ab651fe24d6b9aae20dd858e1143c1ae6"
        id: "result:sha256:6daec7154721c3a122686b887cb391a88018b3c17295c33058d780324f076a9c:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:6daec7154721c3a122686b887cb391a88018b3c17295c33058d780324f076a9c"
        occurred_at: "2026-10-27T16:40:23.252Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610271638-AX942H"
        task_revision: 2
      -
        command_digest: "sha256:06d79077e76ea179b94f52e2cd483753053d113e03e8a871ad06a9ca41c6a47b"
        id: "sha256:496dc6719bef6170d5db4d9145fff5bdbbb31c991aa48b099776e7ffde00b75f:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:496dc6719bef6170d5db4d9145fff5bdbbb31c991aa48b099776e7ffde00b75f"
        occurred_at: "2026-10-27T16:40:46.420Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610271638-AX942H"
        task_revision: 3
      -
        command_digest: "sha256:a07be916e36ba0271a7b14bb48c959f8a36ddb20458e8a1c913392851f1e65f6"
        id: "kernel_work_item_materialization_required:sha256:7935b438efcf1beb40808b6682f9acca7c8ab0209fbe45a4507c8d60fb4e7159:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:7935b438efcf1beb40808b6682f9acca7c8ab0209fbe45a4507c8d60fb4e7159:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
        occurred_at: "2026-10-27T16:41:12.148Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610271638-AX942H"
        task_revision: 4
      -
        command_digest: "sha256:8d3aaf15a5d4b0d1c5a71b294efc50ea754881a40287cb6c2d03e8f84a63ec32"
        id: "kernel_work_item_claim_required:sha256:e7416fad4d0540d4fc4a940581f5d3dc3a9f327c5b439e59ec39576ccf5852cc:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:e7416fad4d0540d4fc4a940581f5d3dc3a9f327c5b439e59ec39576ccf5852cc:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
        occurred_at: "2026-10-27T16:41:46.046Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610271638-AX942H"
        task_revision: 5
      -
        command_digest: "sha256:a9eec9a5d27c051b7b456735130c7430845e9e16080d530566e8e32357c63817"
        id: "kernel_work_item_execution_required:sha256:b5debe609b118e127c182ec876ceb844bccb78ad741760ea3178f9caee477423:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b5debe609b118e127c182ec876ceb844bccb78ad741760ea3178f9caee477423:sha256:7f76ce69840b9200c7811befeacd761a72aa298031cd26ce435e03fb06420951"
        occurred_at: "2026-10-27T16:43:04.546Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610271638-AX942H"
        task_revision: 6
      -
        command_digest: "sha256:c6b46c939518dfd3029f96c6306b1ae6e94be21048f417e12a024e226b42aaba"
        id: "sha256:e6e02cc29a3deb8c2d1c0eb016245076675a0ff86e466f222cb90c1a695b2683:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e6e02cc29a3deb8c2d1c0eb016245076675a0ff86e466f222cb90c1a695b2683"
        occurred_at: "2026-10-27T17:21:34.366Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610271638-AX942H"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Make native PR publication converge with clean, published task artifacts

Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration.

## Scope

- In scope: Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration.
- Out of scope: unrelated refactors not required for "Make native PR publication converge with clean, published task artifacts".

## Plan

1. Execute approved WorkItem pr-publication-artifact-convergence.

## Verify Steps

PLANNER fallback scaffold for "Make native PR publication converge with clean, published task artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make native PR publication converge with clean, published task artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
