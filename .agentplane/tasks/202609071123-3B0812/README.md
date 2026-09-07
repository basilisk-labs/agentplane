---
id: "202609071123-3B0812"
title: "Fix Homebrew executable links and prevent formula regression"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "network"
verify:
  - "bun run release:homebrew:check"
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T11:30:04.323Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:c0b420842a40bd1dead774dae7053b3649693450bc70188ffb0b95267f4734ee"
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
    forbidden_external_effects:
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
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components:
      - "scripts"
    changed_paths:
      - "scripts/generate/render-homebrew-formula.mjs"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:b55f0cd594264ef0ab278035da247da9571ca6f6c19d5926d40f892efea283a1"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "scripts"
        changed_files:
          - "scripts/generate/render-homebrew-formula.mjs"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
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
      - "task_outcome"
commit:
  hash: "27ffb5fdc9cb92b6a9db86e9efdbde96b4b7eac2"
  message: "🚧 3B0812 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 27ffb5fdc9cb. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T11:30:09.598Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T11:32:47.481Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 27ffb5fdc9cb. CLI accepted one state-bound external-agent semantic result."
    commit: "27ffb5fdc9cb92b6a9db86e9efdbde96b4b7eac2"
doc_version: 3
doc_updated_at: "2026-09-07T11:32:47.481Z"
doc_updated_by: "SUPERVISOR"
description: "User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff."
sections:
  Summary: |-
    Fix Homebrew executable links and prevent formula regression

    User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff.
  Scope: |-
    - In scope: User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff.
    - Out of scope: unrelated refactors not required for "Fix Homebrew executable links and prevent formula regression".
  Plan: "Plan a bounded Homebrew formula repair and regression verification, followed by matching tap PR handoff."
  Verify Steps: |-
    1. Run bun run release:homebrew:check. Expected: generated formula checks pass and reject the obsolete libexec/bin/agentplane path.
    2. Verify the generated formula and matching tap formula install the staged agentplane executable and expose agentplane and ap. Run version and help for both names after isolated clean install and reinstall. Expected: all commands succeed with version 0.7.8 for the tap archive.
    3. Review final changes and PR handoff. Expected: no unrelated changes, version bumps, merge, or release. Record unavailable checks as blockers.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:c0b420842a40bd1dead774dae7053b3649693450bc70188ffb0b95267f4734ee"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:e28e02fb3e814b2a806138658a993d89935dc3e03a545e1386ffeb4b9aec225f"
    digest: "sha256:4f3c6030ff61fd9c03cac3cc19b7b79323725a2c47fc589c7977445d3b234ce0"
    grant_id: "4b465209-201d-44e1-8fb8-95379bb3f208"
    issued_at: "2026-09-07T11:30:04.323Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:0a3e563403d91412f1a27e1c5afaa4c7e52e6461e1b346a9e8cdcace17fcfc9c"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:2b99cf8bb2ed3883da6fb1ed9aea9b963ae83314c7517ee66c3181b6344b3910"
    status: "active"
    task_id: "202609071123-3B0812"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T11:30:04.323Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-07T11:25:28.966Z"
      digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
      proposal:
        assumptions:
          - "Preserve release 0.7.8 asset URLs and checksums in the tap."
          - "Use one active WorkItem. Keep external writes behind the supervisor operator route."
          - "A missing clean-install or reinstall check is a reported blocker, not a passing result."
        planning_baseline:
          captured_at: "2026-09-07T11:23:40.019Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:ed6206885e19a34b3d9940651c7e35c22605eb691129e23de0e64dcc7edab7bd"
          dirty_paths:
            - ".agentplane/tasks/202609071123-3B0812/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609071123-3B0812"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run release:homebrew:check"
              id: "homebrew-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "homebrew-check"
              description: "Generated formula installs the staged executable and exposes working agentplane and ap commands. Formula tests exercise version and help for both names. The existing generator check passes."
              id: "homebrew-links"
              required: true
          evidence_fingerprint: "sha256:ed6206885e19a34b3d9940651c7e35c22605eb691129e23de0e64dcc7edab7bd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "homebrew-check"
                  description: "Generated formula installs the staged executable and exposes working agentplane and ap commands. Formula tests exercise version and help for both names. The existing generator check passes."
                  id: "homebrew-links"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 24000
                optional_sources:
                  - "scripts/release/smoke-bun-compiled-cli.mjs"
                required_sources:
                  - "scripts/generate/render-homebrew-formula.mjs"
                  - "AGENTS.md"
                symbol_hints:
                  - "renderFormula"
                  - "renderHomebrew"
              depends_on: []
              expected_outputs:
                - "Corrected formula generator and regression checks"
                - "Matching tap formula patch"
                - "Clean-install and reinstall evidence for both command names"
                - "PR handoff for agentplane and homebrew-tap"
              id: "fix-homebrew-links"
              objective: "Correct Homebrew staging path in the formula generator and its regression checks. Use libexec.install \"agentplane\" and expose agentplane and ap symlinks to libexec/agentplane. Extend formula tests to run both names. Prepare the identical Formula/agentplane.rb change for basilisk-labs/homebrew-tap, retaining version and asset hashes. Verify clean install and reinstall in an isolated Homebrew environment before requesting PR publication through the operator route. Stop after PR handoff; do not merge or release."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/generate/render-homebrew-formula.mjs"
              risk: "low"
              scope_roots:
                - "scripts/generate/render-homebrew-formula.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:homebrew:check"
                    id: "homebrew-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "homebrew-check"
                    description: "Generated formula installs the staged executable and exposes working agentplane and ap commands. Formula tests exercise version and help for both names. The existing generator check passes."
                    id: "homebrew-links"
                    required: true
                evidence_fingerprint: "sha256:ed6206885e19a34b3d9940651c7e35c22605eb691129e23de0e64dcc7edab7bd"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609071123-3B0812"
    event_cursor: 5
    final_validation: null
    id: "202609071123-3B0812"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run release:homebrew:check"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-07T11:23:33.630Z"
      constraints: []
      request: |-
        Fix Homebrew executable links and prevent formula regression

        User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff.
      task_id: "202609071123-3B0812"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-09-07T11:32:50.839Z"
    work_items:
      fix-homebrew-links:
        attempt: 1
        claim_id: null
        id: "fix-homebrew-links"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:affd5b022cc5e2ce3704f4ddff1f1ef38baf43d3eab1d2b6257600c0e66bf72f"
            id: "Corrected formula generator and regression checks"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071123-3B0812"
              work_item_id: "fix-homebrew-links"
            provenance:
              - "sha256:21d9eac96f923ff1abdb9c0812aa380c5a4ee28d96a00f5eca3b2e023d5cb716"
              - ".agentplane/tasks/202609071123-3B0812/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:9ba73ea5a2b68b19bc763c13287c851bc9249c468ce5f411cc95b768d48e0d04"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:3c2509b1121e632c2c71932e5cfa3674fbf629b8409f7a82e243319b6ec5b2a1"
            id: "Matching tap formula patch"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071123-3B0812"
              work_item_id: "fix-homebrew-links"
            provenance:
              - "sha256:21d9eac96f923ff1abdb9c0812aa380c5a4ee28d96a00f5eca3b2e023d5cb716"
              - ".agentplane/tasks/202609071123-3B0812/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:9ba73ea5a2b68b19bc763c13287c851bc9249c468ce5f411cc95b768d48e0d04"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:1a07a047162972b647e824aea69b6aa081c48993f76cb1414fd670e62d65a7b6"
            id: "Clean-install and reinstall evidence for both command names"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071123-3B0812"
              work_item_id: "fix-homebrew-links"
            provenance:
              - "sha256:21d9eac96f923ff1abdb9c0812aa380c5a4ee28d96a00f5eca3b2e023d5cb716"
              - ".agentplane/tasks/202609071123-3B0812/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:9ba73ea5a2b68b19bc763c13287c851bc9249c468ce5f411cc95b768d48e0d04"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:7276e24532dc612d57a55ccc72f4e20203d52fccbc54c2eff30a4daa666e944c"
            id: "PR handoff for agentplane and homebrew-tap"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071123-3B0812"
              work_item_id: "fix-homebrew-links"
            provenance:
              - "sha256:21d9eac96f923ff1abdb9c0812aa380c5a4ee28d96a00f5eca3b2e023d5cb716"
              - ".agentplane/tasks/202609071123-3B0812/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:9ba73ea5a2b68b19bc763c13287c851bc9249c468ce5f411cc95b768d48e0d04"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609071123-3B0812/supervision/declared-checks.json"
              check_id: "homebrew-check"
              command_identity: "bun run release:homebrew:check"
              detail: "Observed by bun run release:homebrew:check."
              exit_code: 0
              observed_at: "2026-09-07T11:32:50.836Z"
              repository_snapshot_digest: "sha256:9ba73ea5a2b68b19bc763c13287c851bc9249c468ce5f411cc95b768d48e0d04"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-07T11:32:50.839Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_c52a1467b258d9e76550fdae"
        mutation_id: "external-result:work-order-202609071123-3B0812-executor-f6daa183ced1dfeb63b7d13e"
        plan_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609071123-3B0812"
        task_revision: 7
        work_item_id: "fix-homebrew-links"
    leases: []
    mutation_receipts:
      compatibility:sha256:78363a5a654dafaa4fb01bd6312d2fa0fb7efbc265f4bd0cbb3838b39f962be1:
        aggregate_digest: "sha256:e2cbf66fbafb5647ff9b34f3f82919c50ad841e63bb255b01558f4c7b241b14e"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:29:47.572Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_25028a95dc5508137b7934b3"
          mutation_id: "compatibility:sha256:78363a5a654dafaa4fb01bd6312d2fa0fb7efbc265f4bd0cbb3838b39f962be1"
          plan_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071123-3B0812"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:78363a5a654dafaa4fb01bd6312d2fa0fb7efbc265f4bd0cbb3838b39f962be1"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609071123-3B0812"
      compatibility:sha256:7a8e4588509b33abbdb746f3112050aef5410a0231e798330a3b77256223afdb:
        aggregate_digest: "sha256:6f592a0f091879f2a6b1b2115c806ebc7d8a25cdf1b51bedb7b6bcfb1b1aaaec"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:29:47.571Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_7a4a29028dd5a404923be50d"
          mutation_id: "compatibility:sha256:7a8e4588509b33abbdb746f3112050aef5410a0231e798330a3b77256223afdb"
          plan_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071123-3B0812"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:7a8e4588509b33abbdb746f3112050aef5410a0231e798330a3b77256223afdb"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609071123-3B0812"
      compatibility:sha256:88a7fbfb884d20b49f62a9d086842a598faf31354451cec9d5ac4783193bd38c:
        aggregate_digest: "sha256:3b63850648e5bce56d8dd939a4baea019c90729524044dd7944ad272cb103d48"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:32:47.481Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6fabfc7e513f186ce9c6b27f"
          mutation_id: "compatibility:sha256:88a7fbfb884d20b49f62a9d086842a598faf31354451cec9d5ac4783193bd38c"
          plan_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071123-3B0812"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:88a7fbfb884d20b49f62a9d086842a598faf31354451cec9d5ac4783193bd38c"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609071123-3B0812"
      compatibility:sha256:d91dfe7571256598f2b518830e51be14cb9d5959bb1e8bbccb06bdefbf7b45bb:
        aggregate_digest: "sha256:ec52a6a00d1272b46d9db1ff309b1ccad4031f9cf2c12b6801d92d5029004b02"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:32:47.481Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_be45b5fdfa1061182dd0a47a"
          mutation_id: "compatibility:sha256:d91dfe7571256598f2b518830e51be14cb9d5959bb1e8bbccb06bdefbf7b45bb"
          plan_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071123-3B0812"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d91dfe7571256598f2b518830e51be14cb9d5959bb1e8bbccb06bdefbf7b45bb"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609071123-3B0812"
      compatibility:sha256:dac266a5d618df607b94791fcc5e5ce50616ff1867e3769ae4e29524734c625f:
        aggregate_digest: "sha256:c57e79158856e5b5a6e8df8537b3507fe75283451b987500c43ecaaec1c42734"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:30:09.598Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f0405112e7effae1fc4a4484"
          mutation_id: "compatibility:sha256:dac266a5d618df607b94791fcc5e5ce50616ff1867e3769ae4e29524734c625f"
          plan_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071123-3B0812"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dac266a5d618df607b94791fcc5e5ce50616ff1867e3769ae4e29524734c625f"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609071123-3B0812"
      external-result:work-order-202609071123-3B0812-executor-f6daa183ced1dfeb63b7d13e:
        aggregate_digest: "sha256:8dfb37ed9629551705763fe675d2248f9afc8d104538f51f04047cd6ba9737be"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:32:50.839Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_c52a1467b258d9e76550fdae"
          mutation_id: "external-result:work-order-202609071123-3B0812-executor-f6daa183ced1dfeb63b7d13e"
          plan_digest: "sha256:bc44d3dac89a592eb633f423599e285163e3ed2dccbd3fec79b6147eced6e660"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071123-3B0812"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "fix-homebrew-links"
        mutation_id: "external-result:work-order-202609071123-3B0812-executor-f6daa183ced1dfeb63b7d13e"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609071123-3B0812"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "27ffb5fdc9cb92b6a9db86e9efdbde96b4b7eac2"
  task_execution_context:
    base_ref: "main"
    base_sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
    version: 1
id_source: "generated"
---
## Summary

Fix Homebrew executable links and prevent formula regression

User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff.

## Scope

- In scope: User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff.
- Out of scope: unrelated refactors not required for "Fix Homebrew executable links and prevent formula regression".

## Plan

Plan a bounded Homebrew formula repair and regression verification, followed by matching tap PR handoff.

## Verify Steps

1. Run bun run release:homebrew:check. Expected: generated formula checks pass and reject the obsolete libexec/bin/agentplane path.
2. Verify the generated formula and matching tap formula install the staged agentplane executable and expose agentplane and ap. Run version and help for both names after isolated clean install and reinstall. Expected: all commands succeed with version 0.7.8 for the tap archive.
3. Review final changes and PR handoff. Expected: no unrelated changes, version bumps, merge, or release. Record unavailable checks as blockers.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
