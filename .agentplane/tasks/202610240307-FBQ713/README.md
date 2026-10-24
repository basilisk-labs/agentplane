---
id: "202610240307-FBQ713"
title: "Repair shared fake GitHub branch metadata for protected-base integration"
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
  - "bun run lint"
  - "node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
  - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-24T03:08:39.432Z"
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
      - "packages/testkit/src/github-pr.ts"
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
      - "packages/testkit/src/github-pr.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
          - "packages/testkit/src/github-pr.ts"
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
      digest: "sha256:17ea0b308c49aab4f4f7226e21296567eebd961a7c3ac0128dbd6092fec7f333"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-24T03:07:41.804Z"
doc_updated_by: "CODER"
description: "The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI."
sections:
  Summary: |-
    Repair shared fake GitHub branch metadata for protected-base integration

    The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.
  Scope: |-
    - In scope: The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.
    - Out of scope: unrelated refactors not required for "Repair shared fake GitHub branch metadata for protected-base integration".
  Plan: "1. Execute approved WorkItem repair-protected-branch-fixture."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair shared fake GitHub branch metadata for protected-base integration". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair shared fake GitHub branch metadata for protected-base integration". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "f60646cd285fda515d2d6f62d5578242ce213ff6"
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
            digest: "sha256:68696fbc6043eaf7146cf09a6ec53a905e98327d16d1493f022abf89081bb97c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b4c3f87f2726a56e8168563c14dcd080800961e216bf57802c96924e598ea08e"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
              - "packages/testkit/src/github-pr.ts"
            task_id: "202610240307-FBQ713"
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
            digest: "sha256:c25629981e83bebf0beac294b1079e4243ba95559c54a69f59ecbf4db7ecd657"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b4c3f87f2726a56e8168563c14dcd080800961e216bf57802c96924e598ea08e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:68696fbc6043eaf7146cf09a6ec53a905e98327d16d1493f022abf89081bb97c"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
              - "packages/testkit/src/github-pr.ts"
            task_id: "202610240307-FBQ713"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
              - "packages/testkit/src/github-pr.ts"
            evidence_digest: "sha256:9f1b02d3ce8f92135a748f49d3ed80c10e5389513e474b36a4500760ab5bd99a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:b4c3f87f2726a56e8168563c14dcd080800961e216bf57802c96924e598ea08e"
        digest: "sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5098726842df146af6bbee864ac65914ccc041da0db435d294a282ccc37f8bbd"
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
                - "packages/testkit/src/github-pr.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            expected_outputs:
              - "protected-branch-fixture"
              - "focused-regression-evidence"
            id: "repair-protected-branch-fixture"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610240307-FBQ713"
      intent_digest: "sha256:3247323f69ad68480ca1887c976b5dba6ca2ea55905d90a1463b9d26a46e1f7a"
      migration_receipts: []
      mutation_receipts:
        capture:202610240307-FBQ713:
          after_revision: 1
          aggregate_digest: "sha256:8e8b787bb8a21a03f9d12f85190c0cece98faa66585028abfb387a0c1537cd2b"
          before_revision: 0
          command_digest: "sha256:0419986af5537978a905127145449a621a2f1438077e537625bf3b7f493b2753"
          effect_ids: []
          event_digests:
            - "sha256:1f9f7dec20f4f17e824d99c7e84f500356e11c6e6b0dad2cc04179838c346414"
          mutation_id: "capture:202610240307-FBQ713"
        kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:
          after_revision: 5
          aggregate_digest: "sha256:bba4c0e672c802e70c649866a45c14cceff5c105d4e4097f703122e2bd42814e"
          before_revision: 4
          command_digest: "sha256:903baaac4cbd6d1b72e25d2f6fd518c0fc50c6c8390d75462bdca833281e526a"
          effect_ids: []
          event_digests:
            - "sha256:d1fb4a8b08dfe4874a90d78924b5c352d20d9c4e1a932aaedde8733aadf9d036"
          mutation_id: "kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:
          after_revision: 6
          aggregate_digest: "sha256:53a1c36f178a4c2162c4d2a32c979724eb44be47a9cc6f18377ba45dbe5a0a36"
          before_revision: 5
          command_digest: "sha256:19bea378db06ae8dc44cc66d5913893edb6309db7eee43a5a298f544486ed57e"
          effect_ids: []
          event_digests:
            - "sha256:24bd11cbb84cf187cb7de17701b35e7cc11fc5f72fa10e9a96b8a9b16fd88dec"
          mutation_id: "kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:
          after_revision: 4
          aggregate_digest: "sha256:22a9b01254a2c20da4c75144efdb46c744c8b0f3d9027f9fad43639ebc4bb768"
          before_revision: 3
          command_digest: "sha256:d5708d836f84d080cc29b9bf1ec448a64c279337a5a9fd6decb9a789eb58f427"
          effect_ids: []
          event_digests:
            - "sha256:df161b51325b73e33e1fcf59c1b1b0755a4945dfa08169e7371cbd14796c6511"
          mutation_id: "kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46:
          after_revision: 2
          aggregate_digest: "sha256:edf253cf6d0f4f7f13954325e4a59180126c19b2ddf5139e856c4114e91647f7"
          before_revision: 1
          command_digest: "sha256:6ffd6e4b687859531d10c27864cdfa12413db3a08e6d071b481d90b94d48cb85"
          effect_ids: []
          event_digests:
            - "sha256:8161adf0bdfe5b1dc0d021c901f9bb664ceac11937feac265f89d91cc5c98978"
          mutation_id: "result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46"
        sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586:
          after_revision: 7
          aggregate_digest: "sha256:4385880f2b311c964a2dd901c091483761a359d4622fb48bb1b9c0ee4e1f5a85"
          before_revision: 6
          command_digest: "sha256:a983a310cc55ca9538be020450d9e6ceb7707b3f380e500030b4aac99f3e9079"
          effect_ids: []
          event_digests:
            - "sha256:9964169bb29cb6537ff4d44d067d986f2fe41c8a30a35d88858a129cebddccd0"
          mutation_id: "sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586"
        sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d:
          after_revision: 3
          aggregate_digest: "sha256:3983128097963d135c97abc829b3101347bb2230fa9f006dbc9561d0ea541a49"
          before_revision: 2
          command_digest: "sha256:f2b6732d492ed94d465347b9bda7614b58e23813913b1d04a997bd6cfec07cc2"
          effect_ids: []
          event_digests:
            - "sha256:afd3f52e209206e2616d18b938f8df05571cd8756f24fefc031aaedcc05b6c1a"
          mutation_id: "sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-protected-branch-fixture:
          attempt: 1
          claim_id: "sha256:e9eb72b0f0cc9aea08a17fe53849195baca9f2dcd439c7f8978fe17382fb3c92"
          definition:
            contract_digest: "sha256:5098726842df146af6bbee864ac65914ccc041da0db435d294a282ccc37f8bbd"
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
                - "packages/testkit/src/github-pr.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            expected_outputs:
              - "protected-branch-fixture"
              - "focused-regression-evidence"
            id: "repair-protected-branch-fixture"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:7ccd394706a9b22543ccefa7ea6023c3f731b7711cb9cef0c1d8f926761759d7"
    documents:
      contracts:
        sha256:5098726842df146af6bbee864ac65914ccc041da0db435d294a282ccc37f8bbd:
          acceptance_criteria:
            - "When protectedBranch=main, installFakeGhPrLookup returns {name:'main',protected:true} for the exact branch metadata endpoint and preserves the protection detail response."
            - "The protected-main integration test verifies the branch metadata and protection detail calls in order and reaches the hosted handoff; no production protection code changes."
            - "Unknown fake gh commands still fail, unprotected behavior remains unchanged, and no unused or separate-contract fixtures are modified."
            - "Focused tests, formatting, lint, and full local CI pass before PR publication."
          objective: "Make the active shared fake GitHub PR provider return exact protected branch metadata before protection details and prove the integration handoff uses both observations."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            - "node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            - "bun run lint"
      intent:
        context: "The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI."
        objective: "Repair shared fake GitHub branch metadata for protected-base integration"
    events:
      -
        command_digest: "sha256:0419986af5537978a905127145449a621a2f1438077e537625bf3b7f493b2753"
        id: "capture:202610240307-FBQ713:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610240307-FBQ713"
        occurred_at: "2026-10-24T03:07:41.749Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610240307-FBQ713"
        task_revision: 1
      -
        command_digest: "sha256:6ffd6e4b687859531d10c27864cdfa12413db3a08e6d071b481d90b94d48cb85"
        id: "result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46"
        occurred_at: "2026-10-24T03:08:25.054Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610240307-FBQ713"
        task_revision: 2
      -
        command_digest: "sha256:f2b6732d492ed94d465347b9bda7614b58e23813913b1d04a997bd6cfec07cc2"
        id: "sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d"
        occurred_at: "2026-10-24T03:08:33.665Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610240307-FBQ713"
        task_revision: 3
      -
        command_digest: "sha256:d5708d836f84d080cc29b9bf1ec448a64c279337a5a9fd6decb9a789eb58f427"
        id: "kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        occurred_at: "2026-10-24T03:08:42.661Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610240307-FBQ713"
        task_revision: 4
      -
        command_digest: "sha256:903baaac4cbd6d1b72e25d2f6fd518c0fc50c6c8390d75462bdca833281e526a"
        id: "kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        occurred_at: "2026-10-24T03:08:54.678Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610240307-FBQ713"
        task_revision: 5
      -
        command_digest: "sha256:19bea378db06ae8dc44cc66d5913893edb6309db7eee43a5a298f544486ed57e"
        id: "kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        occurred_at: "2026-10-24T03:09:24.713Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610240307-FBQ713"
        task_revision: 6
      -
        command_digest: "sha256:a983a310cc55ca9538be020450d9e6ceb7707b3f380e500030b4aac99f3e9079"
        id: "sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586"
        occurred_at: "2026-10-24T03:18:21.611Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610240307-FBQ713"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair shared fake GitHub branch metadata for protected-base integration

The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.

## Scope

- In scope: The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.
- Out of scope: unrelated refactors not required for "Repair shared fake GitHub branch metadata for protected-base integration".

## Plan

1. Execute approved WorkItem repair-protected-branch-fixture.

## Verify Steps

PLANNER fallback scaffold for "Repair shared fake GitHub branch metadata for protected-base integration". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair shared fake GitHub branch metadata for protected-base integration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
