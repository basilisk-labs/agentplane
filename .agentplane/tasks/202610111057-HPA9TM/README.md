---
id: "202610111057-HPA9TM"
title: "Prepare authenticated frozen-base worktrees without requiring moving upstream equality"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
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
  - "bun run check:hotspots"
  - "bun run typecheck"
  - "bun x vitest run packages/agentplane/src/commands/branch/work-start.test.ts packages/agentplane/src/commands/branch/work-start.git.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T10:59:16.239Z"
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
    - "effect_security_boundary"
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
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.ts"
  declaration:
    external_effects: []
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
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:fdfc99a07840312a17c25dbc4f9e0ad3ed44165917acfa951b84c5540b89d450"
      escalation_reasons:
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-11T10:57:23.144Z"
doc_updated_by: "CODER"
description: "Supersedes stale-base intake 202610111054-9QWNBZ. Preserve its complete generic outcome and checks: authenticate exact frozen SHA, repository identity, ancestry and topology; preserve primary bytes; retain ordinary unfrozen upstream equality. Add real Git regressions for upstream ahead, unpublished descendants, invalid evidence and ordinary stale bases. No project-specific exceptions or manual state edits."
sections:
  Summary: |-
    Prepare authenticated frozen-base worktrees without requiring moving upstream equality

    Supersedes stale-base intake 202610111054-9QWNBZ. Preserve its complete generic outcome and checks: authenticate exact frozen SHA, repository identity, ancestry and topology; preserve primary bytes; retain ordinary unfrozen upstream equality. Add real Git regressions for upstream ahead, unpublished descendants, invalid evidence and ordinary stale bases. No project-specific exceptions or manual state edits.
  Scope: |-
    - In scope: Supersedes stale-base intake 202610111054-9QWNBZ. Preserve its complete generic outcome and checks: authenticate exact frozen SHA, repository identity, ancestry and topology; preserve primary bytes; retain ordinary unfrozen upstream equality. Add real Git regressions for upstream ahead, unpublished descendants, invalid evidence and ordinary stale bases. No project-specific exceptions or manual state edits.
    - Out of scope: unrelated refactors not required for "Prepare authenticated frozen-base worktrees without requiring moving upstream equality".
  Plan: "1. Execute approved WorkItem repair-frozen-base-upstream-gate."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun x vitest run packages/agentplane/src/commands/branch/work-start.test.ts packages/agentplane/src/commands/branch/work-start.git.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run check:hotspots`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "agentplane/J8P9K9-integration"
    base_sha: "11cd769f21a3b42fc1362116dbbaa5ecfdd1ab2d"
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
            digest: "sha256:7276b51a5b540ac841ce7dd850b08a8c42547f55425aac9b516e1cd6a503ec0c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4c38bd5344f728b4ad72ea9db6b28910d5a677b863df1269031eb58bfa292f29"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9018ed7e3dd92eda2697a86273d8308838715c65fdd30cd91f74f4ae54f92f8d"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.ts"
            task_id: "202610111057-HPA9TM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4b4ca16dc73b63dc3b748e0e1594499a1472e5b10593a1f4d877075a5350a90f"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b9393be6c16fa43cefb54ddd6b0ad2593a061ce13f2886523d2786950cedc3c3"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eb657536f1631e8fff54fd0fac637f993ff87e136e991ce4634ad6705372fb3f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.ts"
            task_id: "202610111057-HPA9TM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:eb657536f1631e8fff54fd0fac637f993ff87e136e991ce4634ad6705372fb3f"
        digest: "sha256:b9393be6c16fa43cefb54ddd6b0ad2593a061ce13f2886523d2786950cedc3c3"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:74471584a8937f89fc64ebeeb22a1bb421d09763f9da023007a9c1f7679caf3a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/branch/work-start.ts"
                - "packages/agentplane/src/commands/branch/work-start.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
            expected_outputs:
              - "frozen-base-upstream-repair-evidence"
            id: "repair-frozen-base-upstream-gate"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610111057-HPA9TM"
      intent_digest: "sha256:04cef8e82c0714377918c6286313955f83183881a83dad3e579c44bdd9f38492"
      migration_receipts: []
      mutation_receipts:
        capture:202610111057-HPA9TM:
          after_revision: 1
          aggregate_digest: "sha256:5f5f9198ee4cb91bade7abf50a84ff2fcb8591b366d461fc156751f250e208a5"
          before_revision: 0
          command_digest: "sha256:04dede5cc0e67d052b5a14281f017e69b5ca48464413660d16c56b19af844eb4"
          effect_ids: []
          event_digests:
            - "sha256:ae080b034fe7d3682eda0ae6ff851ba9d425e8cf4b63280b299c9deba2deefa1"
          mutation_id: "capture:202610111057-HPA9TM"
        kernel_work_item_claim_required:sha256:069b075c8d20d4dea8d8b59d190fa7e80a4e255d9d814dde0db04cfd3bc9758b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:
          after_revision: 11
          aggregate_digest: "sha256:ae6a2df92b6069af52a27145d69c5b63356535e8c9f94bcf80050a3bdb7cb314"
          before_revision: 10
          command_digest: "sha256:f2e221f8eaedcc2eee034f9869591ac08273b44b6592eaa21d533f5d126c63d7"
          effect_ids: []
          event_digests:
            - "sha256:1398e30ba725c8f184851badea7995ce333537ce8a3c415cac0014c2bcc5f3f6"
          mutation_id: "kernel_work_item_claim_required:sha256:069b075c8d20d4dea8d8b59d190fa7e80a4e255d9d814dde0db04cfd3bc9758b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        kernel_work_item_claim_required:sha256:1568f73c0a4c75dec07b2b4140f5c25c0f65440ce28b2d62f272919a978eef1b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:
          after_revision: 5
          aggregate_digest: "sha256:5e53feb2ce8c9b22b1ccb3042589d8b9070a0190015ec5f85a7eaa808655fc09"
          before_revision: 4
          command_digest: "sha256:d7e8089d164c427f6d345a683d5d04c0a6b7a56ca71b6e3aeadefe062bb52ff7"
          effect_ids: []
          event_digests:
            - "sha256:8260725b91c2c76c5d366449188148ebebe16fc942427bec70536da27b9d75f3"
          mutation_id: "kernel_work_item_claim_required:sha256:1568f73c0a4c75dec07b2b4140f5c25c0f65440ce28b2d62f272919a978eef1b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        kernel_work_item_execution_required:sha256:0f2720a6465e20d132ef9739c406fffac5591b9d3dba05dafcd56b14a1200515:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:
          after_revision: 12
          aggregate_digest: "sha256:3dfee57e694cbf345cc13aa03963e74b224b61ac40a0dc3034a407f33c25bfc9"
          before_revision: 11
          command_digest: "sha256:323686bb9bca3de2d69ef91cfe6a58327cf690f8bdf9bf3efbc7d1114fbe7e80"
          effect_ids: []
          event_digests:
            - "sha256:f5a0f9de4ce53bf9b9bc948843a722bd23c5e10c017dfc07bb83bb43ba416261"
          mutation_id: "kernel_work_item_execution_required:sha256:0f2720a6465e20d132ef9739c406fffac5591b9d3dba05dafcd56b14a1200515:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        kernel_work_item_execution_required:sha256:2ae8b3224089abf950758eaadaf0e101e26a8306c27d729f5d157c60b14e2440:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:
          after_revision: 6
          aggregate_digest: "sha256:2358ef3b9a29a24319e1496c66d6ee917c132787b61739f211d55bee37995286"
          before_revision: 5
          command_digest: "sha256:9fff85c5d34fe1121532c6374baf62a1e0786a45ebde4ef7c2338d4c51a188b5"
          effect_ids: []
          event_digests:
            - "sha256:34e424810b97c428fc4e1617a4551b01ec635da516886eba40081a3ea11521d9"
          mutation_id: "kernel_work_item_execution_required:sha256:2ae8b3224089abf950758eaadaf0e101e26a8306c27d729f5d157c60b14e2440:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        kernel_work_item_materialization_required:sha256:835a303b7db9c5d54e41afcacc223020887a6fc0f6975430ed6b502b276d891c:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:
          after_revision: 4
          aggregate_digest: "sha256:7bb26b49fdc75a0165fb2753f88cd0a5f18aed3f40dfd18dd32a2a0bc0a414c6"
          before_revision: 3
          command_digest: "sha256:c026bd3dfb82cc3d5f877bb0fc4d35693c6cb70c298aad879304d1d4e6409eb7"
          effect_ids: []
          event_digests:
            - "sha256:9f7fff4cd495fbc783d8526c2024136f34d589b3b966914efe7a635df488afb1"
          mutation_id: "kernel_work_item_materialization_required:sha256:835a303b7db9c5d54e41afcacc223020887a6fc0f6975430ed6b502b276d891c:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        reject:sha256:045ec71f2964d4ae2bdefe43f1af3b65bbf25c2d7aa1f3bc9b58315e59d7123b:
          after_revision: 8
          aggregate_digest: "sha256:e57493d74a475137973b9dab555408b22d0a108115a9fc0c14a2872a595dfabe"
          before_revision: 7
          command_digest: "sha256:3802f5b918720a0561b3d029ee75a9ed58a8d7dabd2055227f6ad6be6f11a3e4"
          effect_ids: []
          event_digests:
            - "sha256:b026e254a29b8b6c04cf6bffde61a2129398f1e10dfd882513d3cf74b8a600ca"
          mutation_id: "reject:sha256:045ec71f2964d4ae2bdefe43f1af3b65bbf25c2d7aa1f3bc9b58315e59d7123b"
        result:sha256:276c4f9d6df36ed12253182caf01523ddfae54a6559411fb3c0c2db274add678:
          after_revision: 2
          aggregate_digest: "sha256:a162fc311cd603454145b1cec46f65001052d96c3bd98d88d96edc6a3f4ab940"
          before_revision: 1
          command_digest: "sha256:d5584ac488ab3d46363bdfbd3b5210051847edb41c469898804552ee3ec180cf"
          effect_ids: []
          event_digests:
            - "sha256:34b42828e0751c8c6b7f78a95a31be89e1e67c89f9aeb39f2bd918730721cf1e"
          mutation_id: "result:sha256:276c4f9d6df36ed12253182caf01523ddfae54a6559411fb3c0c2db274add678"
        result:sha256:57d9dc390a1662dd23f4a528b947e311be4020ddf911d19c40fee1e2b3d47923:
          after_revision: 9
          aggregate_digest: "sha256:bd81573b00c768d371d23bec68714224efd63413ac46ba8a1b62ce277f0dda37"
          before_revision: 8
          command_digest: "sha256:982fa46fe6c4813a92fb2a64e3809a6ba2fa665d17a5253b628ab3d4e2e774ec"
          effect_ids: []
          event_digests:
            - "sha256:ead1ea556d7b902cb2880ac40ecd1ec6b6712b4c07961df242ef64305c56db1b"
          mutation_id: "result:sha256:57d9dc390a1662dd23f4a528b947e311be4020ddf911d19c40fee1e2b3d47923"
        semantic-stop:sha256:0f96eb09c7b1fa38376fb9e14533fc7983d5a2e12b646a7d379cbb5ec1d56718:
          after_revision: 7
          aggregate_digest: "sha256:e26dfaf43c986925ca46e1f7ce5f99bfab42eefc59ce3989c2a7bc26588480db"
          before_revision: 6
          command_digest: "sha256:4cea65609e2c03d9281df46f4d92e1d8aa0a5e9f1d65b453125950bc5526836e"
          effect_ids: []
          event_digests:
            - "sha256:ac5b1d708a5037a3f2ed9ae7a7df3bff8ee907dbb814e06db4324ed072731b48"
          mutation_id: "semantic-stop:sha256:0f96eb09c7b1fa38376fb9e14533fc7983d5a2e12b646a7d379cbb5ec1d56718"
        sha256:35e8fcfcd55ce72530278883b25b46ea19f0a409f84b624268502d10bdba7775:
          after_revision: 3
          aggregate_digest: "sha256:c8d158980f9c4773af60f754c8d2b3cd0c1b60fa1608f88971d9814b15fe41db"
          before_revision: 2
          command_digest: "sha256:72aefa1c02beeb9a3e67c5e08e30ecd9f154c8f9c574a124d60be6f83325cd0e"
          effect_ids: []
          event_digests:
            - "sha256:3c552c2bfde75c9b8ac544b0918b2b39c70df55591a5e569a83c7503c60c2c53"
          mutation_id: "sha256:35e8fcfcd55ce72530278883b25b46ea19f0a409f84b624268502d10bdba7775"
        sha256:6753de3706b72305fc10dc8dab3f5993bb5e7bceb9597471d9244b01d7ec348b:
          after_revision: 10
          aggregate_digest: "sha256:00be21e7fa3e850b10cb7372f78bad7a403ba46c04ac897f9684cb08abde70df"
          before_revision: 9
          command_digest: "sha256:6da9e2ab5a363718b6e2fe0359a9e8e289877e419aa027f507892a3ff0883785"
          effect_ids: []
          event_digests:
            - "sha256:45534223f717005494ad5b7d7fa32d075c55ba94f1674db27b463938bb3ec5ce"
          mutation_id: "sha256:6753de3706b72305fc10dc8dab3f5993bb5e7bceb9597471d9244b01d7ec348b"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:9018ed7e3dd92eda2697a86273d8308838715c65fdd30cd91f74f4ae54f92f8d"
          digest: "sha256:4c38bd5344f728b4ad72ea9db6b28910d5a677b863df1269031eb58bfa292f29"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:830490c6930d3a78b33a0adb1c2e1e5b02b65fd3464db17f7d0169a8c5b910c5"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/branch/work-start.ts"
                  - "packages/agentplane/src/commands/branch/work-start.test.ts"
                  - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
              expected_outputs:
                - "frozen-base-upstream-repair-evidence"
              id: "repair-frozen-base-upstream-gate"
              optional: false
              required_inputs: []
      revision: 12
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-frozen-base-upstream-gate:
          attempt: 2
          claim_id: "sha256:ba49c477b7a495584a3b997c912eba5e6c4415108313640a69b0e8c7d4f8fbd3"
          definition:
            contract_digest: "sha256:74471584a8937f89fc64ebeeb22a1bb421d09763f9da023007a9c1f7679caf3a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/branch/work-start.ts"
                - "packages/agentplane/src/commands/branch/work-start.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.git.test.ts"
            expected_outputs:
              - "frozen-base-upstream-repair-evidence"
            id: "repair-frozen-base-upstream-gate"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 8
          state: "EXECUTING"
          validation: null
    digest: "sha256:b269a836050552feacdd3001ac67a1ea9331fc343fecd6f0c241b20acf14cf33"
    documents:
      contracts:
        sha256:74471584a8937f89fc64ebeeb22a1bb421d09763f9da023007a9c1f7679caf3a:
          acceptance_criteria:
            - "Only a nonlegacy admitted frozen execution base with exact requested ref and SHA, matching repository identity, valid commit ancestry and canonical primary topology may avoid the moving-upstream equality requirement."
            - "Ordinary unfrozen or legacy preparation still enforces base checkout and exact upstream equality; arbitrary --base-sha is not an exemption."
            - "Real Git tests reproduce upstream-ahead and unpublished-descendant cases, create the owner at the exact frozen SHA, and preserve dirty primary bytes and branch HEAD."
            - "Mismatched SHA/ref/repository, missing or unrelated commit and noncanonical owner topology reject before branch or worktree creation; retain existing negative assertions."
            - "Run the declared focused tests, typecheck, hotspots and diff check. Preserve previous failure evidence. Independent EVAL and mandatory final full remain native obligations; do not start a concurrent full."
            - "Keep changes within the exact three admitted files. No project-specific exceptions, primary cleanup/reset, manual registry edits or provider effects."
          objective: "Permit exact authenticated frozen-base preparation independently of moving upstream equality. Preserve ordinary work-start isolation and all existing native security gates."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run packages/agentplane/src/commands/branch/work-start.test.ts packages/agentplane/src/commands/branch/work-start.git.test.ts"
            - "bun run typecheck"
            - "bun run hotspots:check"
            - "git diff --check"
        sha256:830490c6930d3a78b33a0adb1c2e1e5b02b65fd3464db17f7d0169a8c5b910c5:
          acceptance_criteria:
            - "Only a nonlegacy admitted frozen execution base with exact requested ref and SHA, matching repository identity, valid commit ancestry and canonical primary topology may avoid the moving-upstream equality requirement."
            - "Ordinary unfrozen or legacy preparation still enforces base checkout and exact upstream equality; arbitrary --base-sha is not an exemption."
            - "Real Git tests reproduce upstream-ahead and unpublished-descendant cases, create the owner at the exact frozen SHA, and preserve dirty primary bytes and branch HEAD."
            - "Mismatched SHA/ref/repository, missing or unrelated commit and noncanonical owner topology reject before branch or worktree creation; retain existing negative assertions."
            - "Run the declared focused tests, typecheck, hotspots and diff check. Preserve previous failure evidence. Independent EVAL and mandatory final full remain native obligations; do not start a concurrent full."
            - "Keep changes within the exact three admitted files. No project-specific exceptions, primary cleanup/reset, manual registry edits or provider effects."
          objective: "Permit exact authenticated frozen-base preparation independently of moving upstream equality. Preserve ordinary work-start isolation and all existing native security gates."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run packages/agentplane/src/commands/branch/work-start.test.ts packages/agentplane/src/commands/branch/work-start.git.test.ts"
            - "bun run typecheck"
            - "bun run check:hotspots"
            - "git diff --check"
      intent:
        context: "Supersedes stale-base intake 202610111054-9QWNBZ. Preserve its complete generic outcome and checks: authenticate exact frozen SHA, repository identity, ancestry and topology; preserve primary bytes; retain ordinary unfrozen upstream equality. Add real Git regressions for upstream ahead, unpublished descendants, invalid evidence and ordinary stale bases. No project-specific exceptions or manual state edits."
        objective: "Prepare authenticated frozen-base worktrees without requiring moving upstream equality"
    events:
      -
        command_digest: "sha256:04dede5cc0e67d052b5a14281f017e69b5ca48464413660d16c56b19af844eb4"
        id: "capture:202610111057-HPA9TM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610111057-HPA9TM"
        occurred_at: "2026-10-11T10:57:23.084Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610111057-HPA9TM"
        task_revision: 1
      -
        command_digest: "sha256:d5584ac488ab3d46363bdfbd3b5210051847edb41c469898804552ee3ec180cf"
        id: "result:sha256:276c4f9d6df36ed12253182caf01523ddfae54a6559411fb3c0c2db274add678:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:276c4f9d6df36ed12253182caf01523ddfae54a6559411fb3c0c2db274add678"
        occurred_at: "2026-10-11T10:58:56.935Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610111057-HPA9TM"
        task_revision: 2
      -
        command_digest: "sha256:72aefa1c02beeb9a3e67c5e08e30ecd9f154c8f9c574a124d60be6f83325cd0e"
        id: "sha256:35e8fcfcd55ce72530278883b25b46ea19f0a409f84b624268502d10bdba7775:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:35e8fcfcd55ce72530278883b25b46ea19f0a409f84b624268502d10bdba7775"
        occurred_at: "2026-10-11T10:59:07.430Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610111057-HPA9TM"
        task_revision: 3
      -
        command_digest: "sha256:c026bd3dfb82cc3d5f877bb0fc4d35693c6cb70c298aad879304d1d4e6409eb7"
        id: "kernel_work_item_materialization_required:sha256:835a303b7db9c5d54e41afcacc223020887a6fc0f6975430ed6b502b276d891c:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:835a303b7db9c5d54e41afcacc223020887a6fc0f6975430ed6b502b276d891c:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        occurred_at: "2026-10-11T10:59:20.118Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610111057-HPA9TM"
        task_revision: 4
      -
        command_digest: "sha256:d7e8089d164c427f6d345a683d5d04c0a6b7a56ca71b6e3aeadefe062bb52ff7"
        id: "kernel_work_item_claim_required:sha256:1568f73c0a4c75dec07b2b4140f5c25c0f65440ce28b2d62f272919a978eef1b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1568f73c0a4c75dec07b2b4140f5c25c0f65440ce28b2d62f272919a978eef1b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        occurred_at: "2026-10-11T10:59:36.307Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610111057-HPA9TM"
        task_revision: 5
      -
        command_digest: "sha256:9fff85c5d34fe1121532c6374baf62a1e0786a45ebde4ef7c2338d4c51a188b5"
        id: "kernel_work_item_execution_required:sha256:2ae8b3224089abf950758eaadaf0e101e26a8306c27d729f5d157c60b14e2440:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2ae8b3224089abf950758eaadaf0e101e26a8306c27d729f5d157c60b14e2440:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        occurred_at: "2026-10-11T11:03:48.208Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610111057-HPA9TM"
        task_revision: 6
      -
        command_digest: "sha256:4cea65609e2c03d9281df46f4d92e1d8aa0a5e9f1d65b453125950bc5526836e"
        id: "semantic-stop:sha256:0f96eb09c7b1fa38376fb9e14533fc7983d5a2e12b646a7d379cbb5ec1d56718:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:0f96eb09c7b1fa38376fb9e14533fc7983d5a2e12b646a7d379cbb5ec1d56718"
        occurred_at: "2026-10-11T11:07:10.081Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610111057-HPA9TM"
        task_revision: 7
      -
        command_digest: "sha256:3802f5b918720a0561b3d029ee75a9ed58a8d7dabd2055227f6ad6be6f11a3e4"
        id: "reject:sha256:045ec71f2964d4ae2bdefe43f1af3b65bbf25c2d7aa1f3bc9b58315e59d7123b:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:045ec71f2964d4ae2bdefe43f1af3b65bbf25c2d7aa1f3bc9b58315e59d7123b"
        occurred_at: "2026-10-11T11:07:43.718Z"
        payload_digest: "sha256:3a0bef4069dc08d48cd44cf06f543961245d6038fc4640558b2074231f625e3f"
        task_id: "202610111057-HPA9TM"
        task_revision: 8
      -
        command_digest: "sha256:982fa46fe6c4813a92fb2a64e3809a6ba2fa665d17a5253b628ab3d4e2e774ec"
        id: "result:sha256:57d9dc390a1662dd23f4a528b947e311be4020ddf911d19c40fee1e2b3d47923:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:57d9dc390a1662dd23f4a528b947e311be4020ddf911d19c40fee1e2b3d47923"
        occurred_at: "2026-10-11T11:08:29.085Z"
        payload_digest: "sha256:f80912d878ce58d21ba34768e330f6973abfbf9bf6a3eda182ae6d678dbee5c4"
        task_id: "202610111057-HPA9TM"
        task_revision: 9
      -
        command_digest: "sha256:6da9e2ab5a363718b6e2fe0359a9e8e289877e419aa027f507892a3ff0883785"
        id: "sha256:6753de3706b72305fc10dc8dab3f5993bb5e7bceb9597471d9244b01d7ec348b:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:6753de3706b72305fc10dc8dab3f5993bb5e7bceb9597471d9244b01d7ec348b"
        occurred_at: "2026-10-11T11:08:40.120Z"
        payload_digest: "sha256:f0ae1b10cd0c3234aabbd723e45e4261948525d979de764450f482c176e17b05"
        task_id: "202610111057-HPA9TM"
        task_revision: 10
      -
        command_digest: "sha256:f2e221f8eaedcc2eee034f9869591ac08273b44b6592eaa21d533f5d126c63d7"
        id: "kernel_work_item_claim_required:sha256:069b075c8d20d4dea8d8b59d190fa7e80a4e255d9d814dde0db04cfd3bc9758b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:069b075c8d20d4dea8d8b59d190fa7e80a4e255d9d814dde0db04cfd3bc9758b:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        occurred_at: "2026-10-11T11:08:53.273Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610111057-HPA9TM"
        task_revision: 11
      -
        command_digest: "sha256:323686bb9bca3de2d69ef91cfe6a58327cf690f8bdf9bf3efbc7d1114fbe7e80"
        id: "kernel_work_item_execution_required:sha256:0f2720a6465e20d132ef9739c406fffac5591b9d3dba05dafcd56b14a1200515:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0f2720a6465e20d132ef9739c406fffac5591b9d3dba05dafcd56b14a1200515:sha256:f3eadabdcd592c47c565bc8d863eacd199e7a16b4d9dff9e09dc12913975a16b"
        occurred_at: "2026-10-11T11:09:04.299Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610111057-HPA9TM"
        task_revision: 12
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Prepare authenticated frozen-base worktrees without requiring moving upstream equality

Supersedes stale-base intake 202610111054-9QWNBZ. Preserve its complete generic outcome and checks: authenticate exact frozen SHA, repository identity, ancestry and topology; preserve primary bytes; retain ordinary unfrozen upstream equality. Add real Git regressions for upstream ahead, unpublished descendants, invalid evidence and ordinary stale bases. No project-specific exceptions or manual state edits.

## Scope

- In scope: Supersedes stale-base intake 202610111054-9QWNBZ. Preserve its complete generic outcome and checks: authenticate exact frozen SHA, repository identity, ancestry and topology; preserve primary bytes; retain ordinary unfrozen upstream equality. Add real Git regressions for upstream ahead, unpublished descendants, invalid evidence and ordinary stale bases. No project-specific exceptions or manual state edits.
- Out of scope: unrelated refactors not required for "Prepare authenticated frozen-base worktrees without requiring moving upstream equality".

## Plan

1. Execute approved WorkItem repair-frozen-base-upstream-gate.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun x vitest run packages/agentplane/src/commands/branch/work-start.test.ts packages/agentplane/src/commands/branch/work-start.git.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run check:hotspots`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
