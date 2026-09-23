---
id: "202609231539-BY7E3D"
title: "Redesign the AgentPlane homepage with an interactive artifact explorer"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run docs:site:build:check"
  - "bun run docs:site:check:design"
  - "bun run docs:site:typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T15:41:15.013Z"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
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
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-23T15:39:32.428Z"
doc_updated_by: "CODER"
description: "Implement the approved centered editorial homepage: clickable and automatically touring repository artifacts, dynamic captions and handwritten callouts, a thin progress line, the four-stage Authority to Recorded strip, responsive motion, and coherent lower sections."
sections:
  Summary: |-
    Redesign the AgentPlane homepage with an interactive artifact explorer

    Implement the approved centered editorial homepage: clickable and automatically touring repository artifacts, dynamic captions and handwritten callouts, a thin progress line, the four-stage Authority to Recorded strip, responsive motion, and coherent lower sections.
  Scope: |-
    - In scope: Implement the approved centered editorial homepage: clickable and automatically touring repository artifacts, dynamic captions and handwritten callouts, a thin progress line, the four-stage Authority to Recorded strip, responsive motion, and coherent lower sections.
    - Out of scope: unrelated refactors not required for "Redesign the AgentPlane homepage with an interactive artifact explorer".
  Plan: "1. Execute approved WorkItem homepage-redesign."
  Verify Steps: |-
    PLANNER fallback scaffold for "Redesign the AgentPlane homepage with an interactive artifact explorer". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Redesign the AgentPlane homepage with an interactive artifact explorer". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_ref: "website-redesign-base"
    base_sha: "97c2c3dfca1b8a4a6a6f616e4b05341cb0d89927"
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
            digest: "sha256:6c8a002b8763f6905e22f54074d54f8883dca4f3c3f42e84e466a5f7acb7ff9c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4f8522707c4bd43dab760dc074a0cea52eff00ca0a18a473596f784da6c7c87b"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:1f525e61fa0bd8eb08ebadecb21f1b951167ccc1f1b90868d312717852775f28"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
            repository_fingerprint: "sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "website/src"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "website/src"
            task_id: "202609231539-BY7E3D"
            validation_requirements:
              - "bun run docs:site:build:check"
              - "bun run docs:site:check:design"
              - "bun run docs:site:typecheck"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:1f525e61fa0bd8eb08ebadecb21f1b951167ccc1f1b90868d312717852775f28"
        digest: "sha256:4f8522707c4bd43dab760dc074a0cea52eff00ca0a18a473596f784da6c7c87b"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:357a014d6c4f6b3fd2cfc474c122d9678e529f5ec7016f8ae052537be65d8eb3"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
              resources:
                - "website/src"
              scope_roots:
                - "website/src"
            expected_outputs:
              - "responsive-homepage"
              - "interactive-artifact-explorer"
            id: "homepage-redesign"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609231539-BY7E3D"
      intent_digest: "sha256:cf216de5f5bbaa3771e278827606f6e0212ca19002586cdb652556af3500ad7a"
      migration_receipts: []
      mutation_receipts:
        capture:202609231539-BY7E3D:
          after_revision: 1
          aggregate_digest: "sha256:4d53f4aaab6c10b82331d3fe50c1f6a846eb4020be10f39e315c12dcf3c2ba8b"
          before_revision: 0
          command_digest: "sha256:0e3d4f90fc4402260605fc0f8eb6ca0f9acbca1f2c4da57e328d2055a7f9d2ad"
          effect_ids: []
          event_digests:
            - "sha256:7408403e2a3d07f39689618c56f71be18c5940520e051e02521d028e30312077"
          mutation_id: "capture:202609231539-BY7E3D"
        kernel_work_item_claim_required:sha256:d7533359c47d5292c64fd427b7e8a263098ec99a3f454e22ce1191a8d9b49ef6:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648:
          after_revision: 5
          aggregate_digest: "sha256:e2262c506f48a781a403ab456f2c5d9eeb2fa8dab36ddabde5a2098f1c732a51"
          before_revision: 4
          command_digest: "sha256:d309f3d9455d3c07893a96648dc5ac42446d764be1bb0fb4d27c474870a5d6a3"
          effect_ids: []
          event_digests:
            - "sha256:c055e361404419891bc131fe1333384cfebb69d97e55b79d6a48d7c52c5c4800"
          mutation_id: "kernel_work_item_claim_required:sha256:d7533359c47d5292c64fd427b7e8a263098ec99a3f454e22ce1191a8d9b49ef6:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648"
        kernel_work_item_execution_required:sha256:d131fb9b00f39e719ccbc5c7492042bdb9703ac25907cfa2b6224513e6d6d990:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648:
          after_revision: 6
          aggregate_digest: "sha256:1a40d3ea1799f0f290fc0a6ef5cd051f928d5fb337bd35f143b7f05e4df05fe1"
          before_revision: 5
          command_digest: "sha256:3896edb94e0cc3b1b1079913762a17973fdaff610db3ac5d62c318ca75c4226c"
          effect_ids: []
          event_digests:
            - "sha256:f623b5c29ab17b68c6365957f434256bd67317c675cd8a55ea272e701a24faa4"
          mutation_id: "kernel_work_item_execution_required:sha256:d131fb9b00f39e719ccbc5c7492042bdb9703ac25907cfa2b6224513e6d6d990:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648"
        kernel_work_item_materialization_required:sha256:e0155645148a3ae55b421d0d2099b2b398b3a7c44a210ac194950d58044c6c4c:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648:
          after_revision: 4
          aggregate_digest: "sha256:c3d8ed92f518c9a3bbcf8fbfa0e8931e41a0edc037c4294078c5bbcb2fb36ddc"
          before_revision: 3
          command_digest: "sha256:deec32d4cf2d8d1e1b3c12bab85ad418c938f22d9c4e5b8aa245fb3fc212964d"
          effect_ids: []
          event_digests:
            - "sha256:97049b9970399beb494f930d5f264fdfe6e184436b1dc24a4c0e11b9e4387f68"
          mutation_id: "kernel_work_item_materialization_required:sha256:e0155645148a3ae55b421d0d2099b2b398b3a7c44a210ac194950d58044c6c4c:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648"
        result:sha256:7327b1ef3146a91bce1fc979c1f587d12acaa50e3b4ff78d7ff98ba0920ddc58:
          after_revision: 2
          aggregate_digest: "sha256:b7843a403b0dc98058bddca4d901637b5c2077a381d29d02d2a958d4e7af31d0"
          before_revision: 1
          command_digest: "sha256:a6dc2003037eae642f9891fd8020b0afd4a5b4a9897bbc8fdc67a196c41bc1c1"
          effect_ids: []
          event_digests:
            - "sha256:b4865923849e12f89bdded371e00e2e2b921541317de0a937325d3723631a98f"
          mutation_id: "result:sha256:7327b1ef3146a91bce1fc979c1f587d12acaa50e3b4ff78d7ff98ba0920ddc58"
        sha256:e85ec18a2cf7581474b5c424f7f1c29149cbae937deb9adf6ea93456f94a014a:
          after_revision: 3
          aggregate_digest: "sha256:87a96bee99635647b141a0abba194828c7bde1f203f784021fbe3d289d27d8dd"
          before_revision: 2
          command_digest: "sha256:12057498f507c6e1bbf03fcc0cc36b46957582f43beed4b8dce0bbe085973766"
          effect_ids: []
          event_digests:
            - "sha256:1c9d4d14eda06df2bca025cbcfe0e3033a4455a1223bd6b43dedc699a93136e9"
          mutation_id: "sha256:e85ec18a2cf7581474b5c424f7f1c29149cbae937deb9adf6ea93456f94a014a"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        homepage-redesign:
          attempt: 1
          claim_id: "sha256:c039fc4665be629d25ce37fda8452166096f779eceeb6e65cd5bce2d6ab9bfed"
          definition:
            contract_digest: "sha256:357a014d6c4f6b3fd2cfc474c122d9678e529f5ec7016f8ae052537be65d8eb3"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
              resources:
                - "website/src"
              scope_roots:
                - "website/src"
            expected_outputs:
              - "responsive-homepage"
              - "interactive-artifact-explorer"
            id: "homepage-redesign"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:c0f1748dd07299d9cd2fbb37a64b4bf411111722b8899942f33ea7a889d15c34"
    documents:
      contracts:
        sha256:357a014d6c4f6b3fd2cfc474c122d9678e529f5ec7016f8ae052537be65d8eb3:
          acceptance_criteria:
            - "The centered hero contains a clickable five-file repository explorer and the Authority, Observed, Verified, Recorded strip."
            - "The file tour runs once, changes the caption and handwritten callouts, and shows a thin progress line beneath the window."
            - "Pointer, keyboard, and Play or Pause controls work. Reduced motion disables automatic and decorative motion."
            - "Desktop and mobile layouts remain legible and preserve documentation and installation links."
          objective: "Implement the approved centered editorial homepage in the existing Docusaurus site."
          role: "EXECUTOR"
          verification_commands:
            - "bun run docs:site:typecheck"
            - "bun run docs:site:build:check"
            - "bun run docs:site:check:design"
      intent:
        context: "Implement the approved centered editorial homepage: clickable and automatically touring repository artifacts, dynamic captions and handwritten callouts, a thin progress line, the four-stage Authority to Recorded strip, responsive motion, and coherent lower sections."
        objective: "Redesign the AgentPlane homepage with an interactive artifact explorer"
    events:
      -
        command_digest: "sha256:0e3d4f90fc4402260605fc0f8eb6ca0f9acbca1f2c4da57e328d2055a7f9d2ad"
        id: "capture:202609231539-BY7E3D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231539-BY7E3D"
        occurred_at: "2026-09-23T15:39:32.385Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231539-BY7E3D"
        task_revision: 1
      -
        command_digest: "sha256:a6dc2003037eae642f9891fd8020b0afd4a5b4a9897bbc8fdc67a196c41bc1c1"
        id: "result:sha256:7327b1ef3146a91bce1fc979c1f587d12acaa50e3b4ff78d7ff98ba0920ddc58:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:7327b1ef3146a91bce1fc979c1f587d12acaa50e3b4ff78d7ff98ba0920ddc58"
        occurred_at: "2026-09-23T15:41:02.800Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609231539-BY7E3D"
        task_revision: 2
      -
        command_digest: "sha256:12057498f507c6e1bbf03fcc0cc36b46957582f43beed4b8dce0bbe085973766"
        id: "sha256:e85ec18a2cf7581474b5c424f7f1c29149cbae937deb9adf6ea93456f94a014a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:e85ec18a2cf7581474b5c424f7f1c29149cbae937deb9adf6ea93456f94a014a"
        occurred_at: "2026-09-23T15:41:13.477Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609231539-BY7E3D"
        task_revision: 3
      -
        command_digest: "sha256:deec32d4cf2d8d1e1b3c12bab85ad418c938f22d9c4e5b8aa245fb3fc212964d"
        id: "kernel_work_item_materialization_required:sha256:e0155645148a3ae55b421d0d2099b2b398b3a7c44a210ac194950d58044c6c4c:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e0155645148a3ae55b421d0d2099b2b398b3a7c44a210ac194950d58044c6c4c:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648"
        occurred_at: "2026-09-23T15:41:21.454Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609231539-BY7E3D"
        task_revision: 4
      -
        command_digest: "sha256:d309f3d9455d3c07893a96648dc5ac42446d764be1bb0fb4d27c474870a5d6a3"
        id: "kernel_work_item_claim_required:sha256:d7533359c47d5292c64fd427b7e8a263098ec99a3f454e22ce1191a8d9b49ef6:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d7533359c47d5292c64fd427b7e8a263098ec99a3f454e22ce1191a8d9b49ef6:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648"
        occurred_at: "2026-09-23T15:41:29.011Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609231539-BY7E3D"
        task_revision: 5
      -
        command_digest: "sha256:3896edb94e0cc3b1b1079913762a17973fdaff610db3ac5d62c318ca75c4226c"
        id: "kernel_work_item_execution_required:sha256:d131fb9b00f39e719ccbc5c7492042bdb9703ac25907cfa2b6224513e6d6d990:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d131fb9b00f39e719ccbc5c7492042bdb9703ac25907cfa2b6224513e6d6d990:sha256:1c71c38eb79298839ffa77fda67544d564c19c251718bbfaf67d7c9147bb5648"
        occurred_at: "2026-09-23T15:42:04.032Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609231539-BY7E3D"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Redesign the AgentPlane homepage with an interactive artifact explorer

Implement the approved centered editorial homepage: clickable and automatically touring repository artifacts, dynamic captions and handwritten callouts, a thin progress line, the four-stage Authority to Recorded strip, responsive motion, and coherent lower sections.

## Scope

- In scope: Implement the approved centered editorial homepage: clickable and automatically touring repository artifacts, dynamic captions and handwritten callouts, a thin progress line, the four-stage Authority to Recorded strip, responsive motion, and coherent lower sections.
- Out of scope: unrelated refactors not required for "Redesign the AgentPlane homepage with an interactive artifact explorer".

## Plan

1. Execute approved WorkItem homepage-redesign.

## Verify Steps

PLANNER fallback scaffold for "Redesign the AgentPlane homepage with an interactive artifact explorer". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Redesign the AgentPlane homepage with an interactive artifact explorer". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
