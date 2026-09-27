---
id: "202609271719-KR98XR"
title: "Qualify canonical final verification contract alignment for 0.7.12"
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
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-09-27T17:20:30.420Z"
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
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "bun.lock"
      - "docs/user/cli-reference.generated.mdx"
      - "packages"
      - "scripts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "bun.lock"
      - "docs/user/cli-reference.generated.mdx"
      - "packages"
      - "scripts"
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
          - "bun.lock"
          - "docs/user/cli-reference.generated.mdx"
          - "packages"
          - "scripts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:f8e6443a45befdb2cfdb2515c8aedc8405df3509ee506aeb362551d2b7bf4776"
      escalation_reasons:
        - "central_component:bun.lock"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-27T17:19:33.108Z"
doc_updated_by: "CODER"
description: "Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish."
sections:
  Summary: |-
    Qualify canonical final verification contract alignment for 0.7.12

    Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish.
  Scope: |-
    - In scope: Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish.
    - Out of scope: unrelated refactors not required for "Qualify canonical final verification contract alignment for 0.7.12".
  Plan: "1. Execute approved WorkItem repair-final-contract."
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
    base_ref: "main"
    base_sha: "d07c03509049e4ca1e06ce0d5873e7e50ca39b38"
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
            digest: "sha256:f6aa466973a10c49e04dd5ab5c72382727c63ed2e33da3f9c6faf6a4defad13f"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:aa887872764a6a2b54ae843b6650756a6b237cf2049ed832d4ec0b45508e52eb"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:18a2718574a6baa08346cf72aa5885c0155a7feef09b956e3e481db410c464de"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "bun.lock"
              - "docs/user/cli-reference.generated.mdx"
              - "packages"
              - "scripts"
            task_id: "202609271719-KR98XR"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
            digest: "sha256:3731bd33e8a4f630104802fd6d5806d833a543b10ba1ce15f1f7cfb79c8a1956"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:aa887872764a6a2b54ae843b6650756a6b237cf2049ed832d4ec0b45508e52eb"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:18a2718574a6baa08346cf72aa5885c0155a7feef09b956e3e481db410c464de"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f6aa466973a10c49e04dd5ab5c72382727c63ed2e33da3f9c6faf6a4defad13f"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "bun.lock"
              - "docs/user/cli-reference.generated.mdx"
              - "packages"
              - "scripts"
            task_id: "202609271719-KR98XR"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "bun.lock"
            evidence_digest: "sha256:309d919c50da1d1c6b398010761bdbfaee03db188cf68db15152d96da682b420"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:18a2718574a6baa08346cf72aa5885c0155a7feef09b956e3e481db410c464de"
        digest: "sha256:aa887872764a6a2b54ae843b6650756a6b237cf2049ed832d4ec0b45508e52eb"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:65e177b863ff82bcdbd18814fc858b9ee67e775ec31c489ca6879720f085d4fc"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages"
                - "scripts"
                - "docs/user/cli-reference.generated.mdx"
                - "bun.lock"
            expected_outputs:
              - "final-contract-repair"
            id: "repair-final-contract"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609271719-KR98XR"
      intent_digest: "sha256:faa7926b7db2ec36d9e0b4d05760d31eef193d6c5e6420476440abcc440def6e"
      migration_receipts: []
      mutation_receipts:
        capture:202609271719-KR98XR:
          after_revision: 1
          aggregate_digest: "sha256:010c7a9e50fa58dd3b4ee34c81e241567354bfd729880bfcb02c6bb38d730a2c"
          before_revision: 0
          command_digest: "sha256:4a90d608f5a9d0a9ba45ac3ed2e4d555e7a8321038c9b536fd3bd3a4c1ca7259"
          effect_ids: []
          event_digests:
            - "sha256:cab6c197718df32cf8782d68d1338aad7aacd8836ef87243ad3d60adb7c8e99f"
          mutation_id: "capture:202609271719-KR98XR"
        kernel_work_item_claim_required:sha256:518228800a12b496116f045affd7e238cf36dc64fe65d979ed8a79638856ebe2:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:
          after_revision: 5
          aggregate_digest: "sha256:629d5e36d2d14cfa4ede2d62242573e52b92b8d8d465e4e58e1ba67a0ea1de96"
          before_revision: 4
          command_digest: "sha256:dc6e57f7bdf03bc211d4c6ebdc4ad9c70697c890f6bb0fc63b3ce47ed7c8ac0f"
          effect_ids: []
          event_digests:
            - "sha256:894f3cf2601f050bd8819a14796089b389c56fa759fedcabe57fb3ebce881fd7"
          mutation_id: "kernel_work_item_claim_required:sha256:518228800a12b496116f045affd7e238cf36dc64fe65d979ed8a79638856ebe2:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        kernel_work_item_execution_required:sha256:cf6e5bdfb060622354be901026c5f2b58fbaa9a5e9921d03b84cb99a40fbd8dd:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66:
          after_revision: 7
          aggregate_digest: "sha256:64b70e0233ab725b9e8742df4e52410f6b66dd9f73a29ad629380fcc36c19632"
          before_revision: 6
          command_digest: "sha256:57b330220003eb8e378e0829d9e1c7fb7fc72b03a8306e9675b82c1c57a49361"
          effect_ids: []
          event_digests:
            - "sha256:046c843bfbe835ff3cf5518fa5ded45a545ee93512d6899184c0d2ce8984a9a7"
          mutation_id: "kernel_work_item_execution_required:sha256:cf6e5bdfb060622354be901026c5f2b58fbaa9a5e9921d03b84cb99a40fbd8dd:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66"
        kernel_work_item_materialization_required:sha256:8d8609019592bdc9ea854aa4acb60b53f4d6ab62f6db12f0bddb75fc4756a083:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:
          after_revision: 4
          aggregate_digest: "sha256:6def99d4ba2acd53bb03bde939ee522d6f5992f047c75af6f13c93cc7951ac13"
          before_revision: 3
          command_digest: "sha256:69600bcc1cf7c2f52d11eb790f58682b6b94b65b3784f6548214d72570a777b7"
          effect_ids: []
          event_digests:
            - "sha256:36bdc209130eb2c3eac3595d97369003a9ae8768555ce1e25ab0125e27becc34"
          mutation_id: "kernel_work_item_materialization_required:sha256:8d8609019592bdc9ea854aa4acb60b53f4d6ab62f6db12f0bddb75fc4756a083:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        result:sha256:41e858d9c6ad488f0654d7d9546c9812736b6787c35970e2c8506824eaa596c2:
          after_revision: 2
          aggregate_digest: "sha256:707ffb7ca51ef1ec313b3c1c820ce6a5f91c53ed3db03b2c5f8aab3d29f00af0"
          before_revision: 1
          command_digest: "sha256:937a3a54077ed824e2986843ebd261758cf487bb9ac8e6444d64ee9d430d237d"
          effect_ids: []
          event_digests:
            - "sha256:6d40851bfc6320819ed6ffcce57b82d230d6b08145dc8e797947868954ff5d2c"
          mutation_id: "result:sha256:41e858d9c6ad488f0654d7d9546c9812736b6787c35970e2c8506824eaa596c2"
        sha256:4d8c90092c10b3e61acca2aae4b2f58bfb8b81976139834e86361adbab574a31:
          after_revision: 3
          aggregate_digest: "sha256:373e3c23e58225c7514d1de0bee9d8ce0e68c1e22a631909e317bd6716bb85f7"
          before_revision: 2
          command_digest: "sha256:f78e71d41b0e5065fcb3fde0c4c751bee10547c8eaa816d4461b622963dd5232"
          effect_ids: []
          event_digests:
            - "sha256:96e3267fcf74da99d1c9f32e3a7df00855ac114c5d99806e99314257e2d4902b"
          mutation_id: "sha256:4d8c90092c10b3e61acca2aae4b2f58bfb8b81976139834e86361adbab574a31"
        sha256:bae794b365ba1eab574c16939fd7a11034e6d1e02b06b3b78eea52a11ca9504f:
          after_revision: 6
          aggregate_digest: "sha256:581d2a43a02124c405ab210b46ff5857900467ba5c2672c5d9cb8897968a801e"
          before_revision: 5
          command_digest: "sha256:71df1dfa74f378d1a7eb29d5c6e067e409e05167914f2c60b03cc20395472308"
          effect_ids: []
          event_digests:
            - "sha256:6ff7f069994c9f892bedcc481f6c4ffe6e7fa7a7e80deb523ef0e4c201c804f1"
          mutation_id: "sha256:bae794b365ba1eab574c16939fd7a11034e6d1e02b06b3b78eea52a11ca9504f"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-final-contract:
          attempt: 1
          claim_id: "sha256:3691211082f5a7bd28df33522329e5e89a4a07382c68c497ed767f22e8f2961c"
          definition:
            contract_digest: "sha256:65e177b863ff82bcdbd18814fc858b9ee67e775ec31c489ca6879720f085d4fc"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages"
                - "scripts"
                - "docs/user/cli-reference.generated.mdx"
                - "bun.lock"
            expected_outputs:
              - "final-contract-repair"
            id: "repair-final-contract"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:7465b576c522e7944e5deef7d87c430a8d767655601f728ea5a44e6c7b97a3ef"
    documents:
      contracts:
        sha256:65e177b863ff82bcdbd18814fc858b9ee67e775ec31c489ca6879720f085d4fc:
          acceptance_criteria:
            - "All reviewed 4SANDJ source repairs remain intact."
            - "Final checks and projection use the same resolved persisted Verification Contract."
            - "Full regression is recorded only when a genuine full-suite command passed; narrow commands cannot satisfy it."
            - "A failed compatibility projection cannot authorize task completion or poison a safe retry."
            - "Focused tests, typecheck, documentation parity and native full CI pass without reduced gates."
          objective: "Consolidate only the source changes from reviewed commit 9bcd4d494946a46624f641ae881769fd2ede06f8. Fix canonical final validation so command execution and verification projection use the same persisted branch_pr Verification Contract. Preserve full_regression attribution only for genuine successful full-suite commands. Prevent a projection failure from leaving a falsely reusable final-validation record, and cover retry behavior. Add regression tests for the actual failing contract transition, narrow-check rejection and failed projection. Preserve all prior native artifacts and immutable baselines. Build the CLI and run focused tests and typecheck; the controller must execute full CI for native acceptance. Repair further in-scope defects without weakening gates. Do not publish."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-work-item-resume.test.ts"
            - "bun run docs:cli:check"
            - "bun run ci:local:full"
      intent:
        context: "Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish."
        objective: "Qualify canonical final verification contract alignment for 0.7.12"
    events:
      -
        command_digest: "sha256:4a90d608f5a9d0a9ba45ac3ed2e4d555e7a8321038c9b536fd3bd3a4c1ca7259"
        id: "capture:202609271719-KR98XR:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609271719-KR98XR"
        occurred_at: "2026-09-27T17:19:33.044Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609271719-KR98XR"
        task_revision: 1
      -
        command_digest: "sha256:937a3a54077ed824e2986843ebd261758cf487bb9ac8e6444d64ee9d430d237d"
        id: "result:sha256:41e858d9c6ad488f0654d7d9546c9812736b6787c35970e2c8506824eaa596c2:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:41e858d9c6ad488f0654d7d9546c9812736b6787c35970e2c8506824eaa596c2"
        occurred_at: "2026-09-27T17:20:13.555Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609271719-KR98XR"
        task_revision: 2
      -
        command_digest: "sha256:f78e71d41b0e5065fcb3fde0c4c751bee10547c8eaa816d4461b622963dd5232"
        id: "sha256:4d8c90092c10b3e61acca2aae4b2f58bfb8b81976139834e86361adbab574a31:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:4d8c90092c10b3e61acca2aae4b2f58bfb8b81976139834e86361adbab574a31"
        occurred_at: "2026-09-27T17:20:24.220Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609271719-KR98XR"
        task_revision: 3
      -
        command_digest: "sha256:69600bcc1cf7c2f52d11eb790f58682b6b94b65b3784f6548214d72570a777b7"
        id: "kernel_work_item_materialization_required:sha256:8d8609019592bdc9ea854aa4acb60b53f4d6ab62f6db12f0bddb75fc4756a083:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:8d8609019592bdc9ea854aa4acb60b53f4d6ab62f6db12f0bddb75fc4756a083:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        occurred_at: "2026-09-27T17:20:32.770Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609271719-KR98XR"
        task_revision: 4
      -
        command_digest: "sha256:dc6e57f7bdf03bc211d4c6ebdc4ad9c70697c890f6bb0fc63b3ce47ed7c8ac0f"
        id: "kernel_work_item_claim_required:sha256:518228800a12b496116f045affd7e238cf36dc64fe65d979ed8a79638856ebe2:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:518228800a12b496116f045affd7e238cf36dc64fe65d979ed8a79638856ebe2:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        occurred_at: "2026-09-27T17:20:45.926Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609271719-KR98XR"
        task_revision: 5
      -
        command_digest: "sha256:71df1dfa74f378d1a7eb29d5c6e067e409e05167914f2c60b03cc20395472308"
        id: "sha256:bae794b365ba1eab574c16939fd7a11034e6d1e02b06b3b78eea52a11ca9504f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bae794b365ba1eab574c16939fd7a11034e6d1e02b06b3b78eea52a11ca9504f"
        occurred_at: "2026-09-27T17:21:18.895Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202609271719-KR98XR"
        task_revision: 6
      -
        command_digest: "sha256:57b330220003eb8e378e0829d9e1c7fb7fc72b03a8306e9675b82c1c57a49361"
        id: "kernel_work_item_execution_required:sha256:cf6e5bdfb060622354be901026c5f2b58fbaa9a5e9921d03b84cb99a40fbd8dd:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cf6e5bdfb060622354be901026c5f2b58fbaa9a5e9921d03b84cb99a40fbd8dd:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66"
        occurred_at: "2026-09-27T17:21:29.879Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609271719-KR98XR"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Qualify canonical final verification contract alignment for 0.7.12

Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish.

## Scope

- In scope: Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish.
- Out of scope: unrelated refactors not required for "Qualify canonical final verification contract alignment for 0.7.12".

## Plan

1. Execute approved WorkItem repair-final-contract.

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
