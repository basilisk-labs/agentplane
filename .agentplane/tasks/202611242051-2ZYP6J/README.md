---
id: "202611242051-2ZYP6J"
title: "Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step"
status: "DOING"
priority: "med"
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
  - "bun run docs:scripts:check"
  - "node --test scripts/workflow/postinstall-hooks.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-11-24T20:51:46.334Z"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
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
      - "docs/developer/code-quality.mdx"
      - "package.json"
      - "scripts/README.md"
      - "scripts/workflow/postinstall-hooks.mjs"
      - "scripts/workflow/postinstall-hooks.test.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "direct"
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
      - "docs/developer/code-quality.mdx"
      - "package.json"
      - "scripts/README.md"
      - "scripts/workflow/postinstall-hooks.mjs"
      - "scripts/workflow/postinstall-hooks.test.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
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
          - "docs/developer/code-quality.mdx"
          - "package.json"
          - "scripts/README.md"
          - "scripts/workflow/postinstall-hooks.mjs"
          - "scripts/workflow/postinstall-hooks.test.mjs"
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
      digest: "sha256:8b07553a4f9f4bb950059555bc3dd68a03b2d6d54e36fd754e66dac289cb28e4"
      escalation_reasons:
        - "central_component:package.json"
        - "central_component:scripts/workflow/postinstall-hooks.mjs"
        - "central_component:scripts/workflow/postinstall-hooks.test.mjs"
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
doc_updated_at: "2026-11-24T20:51:16.342Z"
doc_updated_by: "CODER"
description: "The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync."
sections:
  Summary: |-
    Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step

    The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync.
  Scope: |-
    - In scope: The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync.
    - Out of scope: unrelated refactors not required for "Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step".
  Plan: "1. Execute approved WorkItem guarded-postinstall-hooks."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node --test scripts/workflow/postinstall-hooks.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "0582344612d4d68bb6e3255637f0e086934ac19c"
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
            digest: "sha256:782d3b03a8355520b9a1fa64d0d1209173593bc16267043155b2633e9f809794"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:72a15e1a22edc16ed5a567e627e4218ba3741fd75d05cb5eb990b6f3a97b4955"
            plan_revision: 1
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:13f9ece81489d8d5d5bdf5180eca526649e5be64aa5ffefe257e663dc7977922"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer/code-quality.mdx"
              - "package.json"
              - "scripts/README.md"
              - "scripts/workflow/postinstall-hooks.mjs"
              - "scripts/workflow/postinstall-hooks.test.mjs"
            task_id: "202611242051-2ZYP6J"
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
            digest: "sha256:52d4efbd0b03ab8055578783c5732afe8bb5b53c449d522b90249ff61e0f636f"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:72a15e1a22edc16ed5a567e627e4218ba3741fd75d05cb5eb990b6f3a97b4955"
            plan_revision: 1
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:13f9ece81489d8d5d5bdf5180eca526649e5be64aa5ffefe257e663dc7977922"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:782d3b03a8355520b9a1fa64d0d1209173593bc16267043155b2633e9f809794"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer/code-quality.mdx"
              - "package.json"
              - "scripts/README.md"
              - "scripts/workflow/postinstall-hooks.mjs"
              - "scripts/workflow/postinstall-hooks.test.mjs"
            task_id: "202611242051-2ZYP6J"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:305ebc74b583fb1273f6abbbb29b63dc9fafb9d1047c3221ab2929df898c0483"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:13f9ece81489d8d5d5bdf5180eca526649e5be64aa5ffefe257e663dc7977922"
        digest: "sha256:72a15e1a22edc16ed5a567e627e4218ba3741fd75d05cb5eb990b6f3a97b4955"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:7762f12836b6c78280009a499e69faa527236dc104196dc0d9ce7afbf29ee2a7"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "package.json"
                - "scripts/workflow/postinstall-hooks.mjs"
                - "scripts/workflow/postinstall-hooks.test.mjs"
                - "scripts/README.md"
                - "docs/developer/code-quality.mdx"
            expected_outputs:
              - "package.json"
              - "scripts/workflow/postinstall-hooks.mjs"
              - "scripts/workflow/postinstall-hooks.test.mjs"
              - "scripts/README.md"
              - "docs/developer/code-quality.mdx"
            id: "guarded-postinstall-hooks"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611242051-2ZYP6J"
      intent_digest: "sha256:4478ae738a4327195fdbab8ca8db035d277113307aa50721d73a9288e04d33e0"
      migration_receipts: []
      mutation_receipts:
        capture:202611242051-2ZYP6J:
          after_revision: 1
          aggregate_digest: "sha256:57e70eb66d6d11c8096db71f8b959d2d0f3f4945a5f09942ab72aa777b228aba"
          before_revision: 0
          command_digest: "sha256:96150a1ddb38c43cb7866e867de9a662bebe2109d434420531294e677564f554"
          effect_ids: []
          event_digests:
            - "sha256:07a55afc641f5216c282cb314dd8fe76b4561683ab0e0932c78a1ca69f2d59e5"
          mutation_id: "capture:202611242051-2ZYP6J"
        kernel_work_item_claim_required:sha256:6637c96b5f20af242b8f798fe46302fc409a229d2dfdc7dbdf53841d4b554eae:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:
          after_revision: 5
          aggregate_digest: "sha256:b90217106a59e3787b749e06e5c9b657387ec5b5eeccc840511d4e9fc420fc88"
          before_revision: 4
          command_digest: "sha256:08de647d285a90fb37fc5ba325762ca2ac3eeb3fb7a04be905dd7778f0c6bd36"
          effect_ids: []
          event_digests:
            - "sha256:9453f10d363f686a0928b04f2f34127ec6bad17f0786f43e18c973ad193f0af4"
          mutation_id: "kernel_work_item_claim_required:sha256:6637c96b5f20af242b8f798fe46302fc409a229d2dfdc7dbdf53841d4b554eae:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        kernel_work_item_execution_required:sha256:d899d18b89c0c090ccb8699db945bb34bd84f9fabb9a430d2f88a4a01c0b2407:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320:
          after_revision: 7
          aggregate_digest: "sha256:fe55902bad7dab212973ac3693b275de0797ba85b290a34c39810acccc2ac2e6"
          before_revision: 6
          command_digest: "sha256:7c00de74696ef9dfad4da392fe7c08864ecdcd7f8eb4dd8c52cc182fe1a167b2"
          effect_ids: []
          event_digests:
            - "sha256:158d5715490d10feb4537f7f9e9c6d2a5335e0b17269d116ee8fc8b84b2c1db0"
          mutation_id: "kernel_work_item_execution_required:sha256:d899d18b89c0c090ccb8699db945bb34bd84f9fabb9a430d2f88a4a01c0b2407:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
        kernel_work_item_materialization_required:sha256:298e537f95fffc318be20e09d913024311394198c91d1ec0e69cf0445d50f217:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:
          after_revision: 4
          aggregate_digest: "sha256:45a9eb5c81fb461130e8c909c90e16c07f71e3d6f0eee54f3dee0d5344826d56"
          before_revision: 3
          command_digest: "sha256:bec462c4a13c8b57eec2803989ee080b0fe3c5d36c25d33a92ffc730c4b633fd"
          effect_ids: []
          event_digests:
            - "sha256:b2228b61ad88264be3d1032bc5cbf9120f708c0d0be2e62a9d268f712ab4de8d"
          mutation_id: "kernel_work_item_materialization_required:sha256:298e537f95fffc318be20e09d913024311394198c91d1ec0e69cf0445d50f217:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        result:sha256:d2d6ea0d98a2d122d35065965f6b136e2453763c9b8cff726b73cb1feaffe8d7:
          after_revision: 2
          aggregate_digest: "sha256:08de704d12da49d454898f1e3d73a475c4d5351d9f0d0c4815cee780182cc0ff"
          before_revision: 1
          command_digest: "sha256:42ff684a49f3bd7e2a83b80c6673603fb94b63d32ddfc44abfdf81f0cd7518e1"
          effect_ids: []
          event_digests:
            - "sha256:91558ce55c81d38eeab233ea0360a8237916c1df8c8be993af27c800cc10e180"
          mutation_id: "result:sha256:d2d6ea0d98a2d122d35065965f6b136e2453763c9b8cff726b73cb1feaffe8d7"
        sha256:84e0a22c9886c2a63e105b1bb75814f4c3c5c82ddd0f5b5f6fed05380642953e:
          after_revision: 6
          aggregate_digest: "sha256:0c28cf336ae722c2043d3454dd7011cd928e8bda4a08619f7554ad35765a36eb"
          before_revision: 5
          command_digest: "sha256:b5363c2f82f85ead02f732f472e1f978d44a383fbba5f962c12fef162ec8f652"
          effect_ids: []
          event_digests:
            - "sha256:d15b90451be80d0c9be7f054dcfdfea98c2110922781caef323cf6180012bd7f"
          mutation_id: "sha256:84e0a22c9886c2a63e105b1bb75814f4c3c5c82ddd0f5b5f6fed05380642953e"
        sha256:b5d3dd2a9a29899432e9bb92a9d67f1c92de5c1d20c1ed713c5fa318398b3785:
          after_revision: 3
          aggregate_digest: "sha256:156ca23ac8a6a645cb9db9a5f8d3cc4ac54e26f04a4357764e537bcb9d25a5ba"
          before_revision: 2
          command_digest: "sha256:22857e0f971cfc6b959ebdaaff1500bfbea2269571667ca9493954df58ba4525"
          effect_ids: []
          event_digests:
            - "sha256:0800058041ee68d6b67084752c21614c6c3ae14740cb67fbf54c2ff13d70f283"
          mutation_id: "sha256:b5d3dd2a9a29899432e9bb92a9d67f1c92de5c1d20c1ed713c5fa318398b3785"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        guarded-postinstall-hooks:
          attempt: 1
          claim_id: "sha256:848a1674cceb4b639daee870e7a0ac38f0d168bba5ea3ff6e537ebfbf2707e53"
          definition:
            contract_digest: "sha256:7762f12836b6c78280009a499e69faa527236dc104196dc0d9ce7afbf29ee2a7"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "package.json"
                - "scripts/workflow/postinstall-hooks.mjs"
                - "scripts/workflow/postinstall-hooks.test.mjs"
                - "scripts/README.md"
                - "docs/developer/code-quality.mdx"
            expected_outputs:
              - "package.json"
              - "scripts/workflow/postinstall-hooks.mjs"
              - "scripts/workflow/postinstall-hooks.test.mjs"
              - "scripts/README.md"
              - "docs/developer/code-quality.mdx"
            id: "guarded-postinstall-hooks"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:2446223b9857ea1221a02652eb80264c2d9ae9f59144d0e7038228465e046576"
    documents:
      contracts:
        sha256:7762f12836b6c78280009a499e69faa527236dc104196dc0d9ce7afbf29ee2a7:
          acceptance_criteria:
            - "With an AgentPlane-managed hook (marker agentplane-hook) present, postinstall leaves every hook file byte-identical and does not invoke lefthook."
            - "Without AgentPlane-managed hooks, postinstall invokes lefthook install exactly as before."
            - "Outside a git repository (for example a packed install), postinstall exits 0 without invoking lefthook."
            - "node --test scripts/workflow/postinstall-hooks.test.mjs passes, and the managed-hook test fails against the old unconditional behavior."
            - "bun run docs:scripts:check passes."
          objective: "Make the root postinstall run lefthook install only when no AgentPlane-managed hook exists in the git hooks directory, and keep docs and the generated scripts README in sync."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/workflow/postinstall-hooks.test.mjs"
            - "bun run docs:scripts:check"
      intent:
        context: "The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync."
        objective: "Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step"
    events:
      -
        command_digest: "sha256:96150a1ddb38c43cb7866e867de9a662bebe2109d434420531294e677564f554"
        id: "capture:202611242051-2ZYP6J:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611242051-2ZYP6J"
        occurred_at: "2026-11-24T20:51:16.325Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611242051-2ZYP6J"
        task_revision: 1
      -
        command_digest: "sha256:42ff684a49f3bd7e2a83b80c6673603fb94b63d32ddfc44abfdf81f0cd7518e1"
        id: "result:sha256:d2d6ea0d98a2d122d35065965f6b136e2453763c9b8cff726b73cb1feaffe8d7:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d2d6ea0d98a2d122d35065965f6b136e2453763c9b8cff726b73cb1feaffe8d7"
        occurred_at: "2026-11-24T20:51:38.853Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611242051-2ZYP6J"
        task_revision: 2
      -
        command_digest: "sha256:22857e0f971cfc6b959ebdaaff1500bfbea2269571667ca9493954df58ba4525"
        id: "sha256:b5d3dd2a9a29899432e9bb92a9d67f1c92de5c1d20c1ed713c5fa318398b3785:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b5d3dd2a9a29899432e9bb92a9d67f1c92de5c1d20c1ed713c5fa318398b3785"
        occurred_at: "2026-11-24T20:51:43.573Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611242051-2ZYP6J"
        task_revision: 3
      -
        command_digest: "sha256:bec462c4a13c8b57eec2803989ee080b0fe3c5d36c25d33a92ffc730c4b633fd"
        id: "kernel_work_item_materialization_required:sha256:298e537f95fffc318be20e09d913024311394198c91d1ec0e69cf0445d50f217:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:298e537f95fffc318be20e09d913024311394198c91d1ec0e69cf0445d50f217:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        occurred_at: "2026-11-24T20:51:48.254Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611242051-2ZYP6J"
        task_revision: 4
      -
        command_digest: "sha256:08de647d285a90fb37fc5ba325762ca2ac3eeb3fb7a04be905dd7778f0c6bd36"
        id: "kernel_work_item_claim_required:sha256:6637c96b5f20af242b8f798fe46302fc409a229d2dfdc7dbdf53841d4b554eae:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6637c96b5f20af242b8f798fe46302fc409a229d2dfdc7dbdf53841d4b554eae:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        occurred_at: "2026-11-24T20:51:54.298Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611242051-2ZYP6J"
        task_revision: 5
      -
        command_digest: "sha256:b5363c2f82f85ead02f732f472e1f978d44a383fbba5f962c12fef162ec8f652"
        id: "sha256:84e0a22c9886c2a63e105b1bb75814f4c3c5c82ddd0f5b5f6fed05380642953e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:84e0a22c9886c2a63e105b1bb75814f4c3c5c82ddd0f5b5f6fed05380642953e"
        occurred_at: "2026-11-24T20:52:12.476Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611242051-2ZYP6J"
        task_revision: 6
      -
        command_digest: "sha256:7c00de74696ef9dfad4da392fe7c08864ecdcd7f8eb4dd8c52cc182fe1a167b2"
        id: "kernel_work_item_execution_required:sha256:d899d18b89c0c090ccb8699db945bb34bd84f9fabb9a430d2f88a4a01c0b2407:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d899d18b89c0c090ccb8699db945bb34bd84f9fabb9a430d2f88a4a01c0b2407:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
        occurred_at: "2026-11-24T20:52:15.563Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611242051-2ZYP6J"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step

The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync.

## Scope

- In scope: The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync.
- Out of scope: unrelated refactors not required for "Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step".

## Plan

1. Execute approved WorkItem guarded-postinstall-hooks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node --test scripts/workflow/postinstall-hooks.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
