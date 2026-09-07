---
id: "202609070233-NG368H"
title: "Repair manual release recovery after npm publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
  - "bun run workflows:lint"
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T02:38:11.318Z"
  updated_by: "USER"
  note: "Relayed existing explicit user authorization to fix every required release blocker and override AGENTS permission gates for correct release finalization. Approves the bounded two-file manual publication recovery plan; release payload and exact published SHA remain unchanged."
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
    - "effect_ci"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
      - "repository_write"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Isolate the release workflow control-flow repair and its regression test in one native task worktree."
      - "This Task does not publish packages or alter the qualified historical release payload. Publication resumes separately under the user-authorized operator action."
    repository_effects:
      - "ci"
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - ".github"
      - "packages/agentplane"
    changed_paths:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
    external_effects: []
    repository_effects:
      - "ci"
      - "repository_write"
      - "tests"
    verification_results: []
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
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:0e29fc5bb36d10ea6dd17ec3a3f62a1adf2c76d5f7a234954a04b343b8a7ec12"
      escalation_reasons:
        - "central_component:.github/workflows/publish.yml"
        - "central_path:.github/workflows/publish.yml"
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
        changed_files:
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
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
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "a0c5a7f8022597cbfb17ee0c8963f1754026e6ab"
  message: "🚧 NG368H task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a0c5a7f80225. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T02:38:22.951Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T02:46:48.398Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a0c5a7f80225. CLI accepted one state-bound external-agent semantic result."
    commit: "a0c5a7f8022597cbfb17ee0c8963f1754026e6ab"
doc_version: 3
doc_updated_at: "2026-09-07T02:46:48.398Z"
doc_updated_by: "SUPERVISOR"
description: "Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release."
sections:
  Summary: |-
    Repair manual release recovery after npm publication

    Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release.
  Scope: |-
    - In scope: Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release.
    - Out of scope: unrelated refactors not required for "Repair manual release recovery after npm publication".
  Plan: "Propose one bounded workflow recovery WorkItem. Explicit manual recovery must remain available after npm succeeds while other publication channels are incomplete."
  Verify Steps: |-
    1. Run `bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts`. Expected: behavioral regression coverage passes for manual recovery after all npm packages exist, partial package visibility, automatic event restrictions, prereleases and missing release-ready evidence.
    2. Run `bun run workflows:lint`. Expected: workflow syntax, command contracts and route checks pass.
    3. Review the final diff. Expected: only the approved workflow decision and nearest regression suite change; npm skip guards, exact release SHA, versions, tag identity and canonical publish-result requirements remain intact.
    4. Keep actual recovery publication pending until the repaired workflow is integrated and canonical hosted publication evidence succeeds.
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
    completion_contract_digest: "sha256:ceff2be635a3acf8bb3b3e6f291f608715736a365e6c056bdaa27835a0940b72"
    digest: "sha256:1363c38127ee48fdb15ce31fdcdf5472ac4ea5c527ea620349847ad13e1bf906"
    grant_id: "a71561bb-fa8f-4e87-8f21-6ba5ec1c159c"
    issued_at: "2026-09-07T02:38:11.318Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:f3ae24e0841e02291cc3670a73bb8783d5c622f17854bb2b6461191318cbeec7"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:fc57bb86a88fad65e4a3c0cd25529c08df483a6512b1e7da37c6c6e0090ac50c"
    status: "active"
    task_id: "202609070233-NG368H"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T02:38:11.318Z"
        approved_by: "USER"
        approved_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-07T02:37:16.828Z"
      digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
      proposal:
        assumptions:
          - "The published 0.7.8 payload and exact release SHA remain 81b3fe507426d82ea903d7a63fd6335b583d81b5."
          - "A manual workflow_dispatch is the explicit operator request to recover remaining channels."
          - "The current declared test:project command supersedes the erroneous unapproved task-creation test:unit scaffold."
        planning_baseline:
          captured_at: "2026-09-07T02:33:49.510Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:afae1348befede68ed7486c47e53f04ac4ae334c31b3c711f8e00f28b712ba96"
          dirty_paths:
            - ".agentplane/tasks/202609070233-NG368H/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "81b3fe507426d82ea903d7a63fd6335b583d81b5"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202609070233-NG368H"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              id: "publish-contract"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run workflows:lint"
              id: "workflow-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "publish-contract"
              description: "An explicit workflow_dispatch with a valid stable exact-SHA release-ready source continues the publish job when all npm packages already exist, so missing non-npm channels can recover."
              id: "manual-recovery"
              required: true
            -
              check_ids:
                - "publish-contract"
                - "workflow-lint"
              description: "Automatic workflow_run never starts publishing. Prereleases and missing release-ready evidence remain blocked. Each existing npm package remains skipped. Package versions, release payload, immutable tag identity and canonical publish-result requirements are unchanged."
              id: "preserved-gates"
              required: true
          evidence_fingerprint: "sha256:71728e96906f9271ec919cd44af0146fdac76de7b910ad219fb2fbd228e199e8"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "publish-contract"
                  description: "An explicit workflow_dispatch with a valid stable exact-SHA release-ready source continues the publish job when all npm packages already exist, so missing non-npm channels can recover."
                  id: "manual-recovery"
                  required: true
                -
                  check_ids:
                    - "publish-contract"
                    - "workflow-lint"
                  description: "Automatic workflow_run never starts publishing. Prereleases and missing release-ready evidence remain blocked. Each existing npm package remains skipped. Package versions, release payload, immutable tag identity and canonical publish-result requirements are unchanged."
                  id: "preserved-gates"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 110000
                optional_sources:
                  - "docs/developer/release-and-publishing.mdx"
                  - ".git/agentplane/external-agent/202609061750-Z0XXVD/publish-first-result/publish-result.json"
                  - ".git/agentplane/external-agent/202609061750-Z0XXVD/publish-first-failure.log"
                required_sources:
                  - ".github/workflows/publish.yml"
                  - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
                symbol_hints:
                  - "Detect publish target"
                  - "CORE_PUBLISHED"
                  - "publish workflow contract"
              depends_on: []
              expected_outputs:
                - "Manual post-npm release recovery workflow and behavioral regression evidence"
              id: "recover-post-npm-publication"
              objective: "Change only the publish-target decision to allow explicitly dispatched exact-SHA recovery after all npm packages exist. Preserve stable/source validation, per-package skip guards, automatic publish restrictions and canonical publish-result checks. Execute the actual workflow detection shell in the nearest existing regression suite with local stubs for registry reads across manual/automatic, package-visibility and readiness states. Demonstrate the all-published manual case fails before the change and passes afterward. Do not change the 0.7.8 release payload or any version, tag, dependency, timeout or verification floor."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: ".github/workflows/publish.yml"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              risk: "medium"
              scope_roots:
                - ".github/workflows/publish.yml"
                - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
                    id: "publish-contract"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run workflows:lint"
                    id: "workflow-lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "publish-contract"
                    description: "An explicit workflow_dispatch with a valid stable exact-SHA release-ready source continues the publish job when all npm packages already exist, so missing non-npm channels can recover."
                    id: "manual-recovery"
                    required: true
                  -
                    check_ids:
                      - "publish-contract"
                      - "workflow-lint"
                    description: "Automatic workflow_run never starts publishing. Prereleases and missing release-ready evidence remain blocked. Each existing npm package remains skipped. Package versions, release payload, immutable tag identity and canonical publish-result requirements are unchanged."
                    id: "preserved-gates"
                    required: true
                evidence_fingerprint: "sha256:71728e96906f9271ec919cd44af0146fdac76de7b910ad219fb2fbd228e199e8"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609070233-NG368H"
    event_cursor: 5
    final_validation: null
    id: "202609070233-NG368H"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run workflows:lint"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-07T02:33:13.064Z"
      constraints: []
      request: |-
        Repair manual release recovery after npm publication

        Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release.
      task_id: "202609070233-NG368H"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 9
    schema_version: 1
    updated_at: "2026-09-07T02:46:53.877Z"
    work_items:
      recover-post-npm-publication:
        attempt: 1
        claim_id: null
        id: "recover-post-npm-publication"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:5990ce41efdecdabd8f34e439f2bbc828d8e97af77eb2fb8d1f00d702f9fd5a6"
            id: "Manual post-npm release recovery workflow and behavioral regression evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609070233-NG368H"
              work_item_id: "recover-post-npm-publication"
            provenance:
              - "sha256:847c684109363b123fb717d616a29f6ebd799ce667296c6c1cabb8707501b709"
              - ".agentplane/tasks/202609070233-NG368H/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:1569f56e6873b8f555c2c44eec058bf6260cc8273722a06acda96d0d76bee1af"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609070233-NG368H/supervision/declared-checks.json"
              check_id: "publish-contract"
              command_identity: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              detail: "Observed by bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts."
              exit_code: 0
              observed_at: "2026-09-07T02:46:53.873Z"
              repository_snapshot_digest: "sha256:1569f56e6873b8f555c2c44eec058bf6260cc8273722a06acda96d0d76bee1af"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609070233-NG368H/supervision/declared-checks.json"
              check_id: "workflow-lint"
              command_identity: "bun run workflows:lint"
              detail: "Observed by bun run workflows:lint."
              exit_code: 0
              observed_at: "2026-09-07T02:46:53.873Z"
              repository_snapshot_digest: "sha256:1569f56e6873b8f555c2c44eec058bf6260cc8273722a06acda96d0d76bee1af"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-07T02:46:53.877Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_5e099b37832e59c38a427165"
        mutation_id: "external-result:work-order-202609070233-NG368H-executor-b16ae49de42094be088fc733"
        plan_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609070233-NG368H"
        task_revision: 8
        work_item_id: "recover-post-npm-publication"
    leases: []
    mutation_receipts:
      compatibility:sha256:258fc0f7b8ad5fe29365848ca02c861518da454997fd04161da58a7d08ad4875:
        aggregate_digest: "sha256:a26f854e3828c7a601d38bf5c67c9bd0576baf25c8b47757a0c528ee173db6d1"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T02:37:51.000Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_5226e29be0c65de5871b5a5c"
          mutation_id: "compatibility:sha256:258fc0f7b8ad5fe29365848ca02c861518da454997fd04161da58a7d08ad4875"
          plan_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070233-NG368H"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:258fc0f7b8ad5fe29365848ca02c861518da454997fd04161da58a7d08ad4875"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609070233-NG368H"
      compatibility:sha256:3cac6c78f0203eccc70566eb18a38a1e1a1873a63abe1c97d100305370021501:
        aggregate_digest: "sha256:40b6a4caa04905a8dc76002aef173d6e9c5a7eedfddcd050a7ee7359f4c1d426"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T02:37:50.999Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_7bfd03bd4e4d11899201941f"
          mutation_id: "compatibility:sha256:3cac6c78f0203eccc70566eb18a38a1e1a1873a63abe1c97d100305370021501"
          plan_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070233-NG368H"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:3cac6c78f0203eccc70566eb18a38a1e1a1873a63abe1c97d100305370021501"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609070233-NG368H"
      compatibility:sha256:b866dcfed3676c29cad8db9dab0e339701d22344a0df942ac3968bbf151b4b3f:
        aggregate_digest: "sha256:8aa1117421db8683d99f04495ae71353ffca0f25c71decc690678862a636fe00"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T02:46:48.398Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_193dc97d0cf9edcfcb546ae0"
          mutation_id: "compatibility:sha256:b866dcfed3676c29cad8db9dab0e339701d22344a0df942ac3968bbf151b4b3f"
          plan_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070233-NG368H"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b866dcfed3676c29cad8db9dab0e339701d22344a0df942ac3968bbf151b4b3f"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609070233-NG368H"
      compatibility:sha256:d896d189614c146d8c529d15691a1f3a2d313bc5726557ec241c846701d581dc:
        aggregate_digest: "sha256:09d410a17b056554fac0d2478ac87ceba631ebcbebdfd7066cacd5b0e2f2af66"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T02:46:48.398Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5d8d45f5a1a920d23a24d8f1"
          mutation_id: "compatibility:sha256:d896d189614c146d8c529d15691a1f3a2d313bc5726557ec241c846701d581dc"
          plan_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070233-NG368H"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d896d189614c146d8c529d15691a1f3a2d313bc5726557ec241c846701d581dc"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609070233-NG368H"
      compatibility:sha256:efd85035dc9cca41e807c420e4a3f725cf2a850536be37076dce97f9c76d43dc:
        aggregate_digest: "sha256:c6e20322302bd3f1ed647dbe61e8ebfef80f46d8e330e2c32bde85df500072e2"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T02:38:22.951Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_59a64aa16957ecb1051e8542"
          mutation_id: "compatibility:sha256:efd85035dc9cca41e807c420e4a3f725cf2a850536be37076dce97f9c76d43dc"
          plan_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070233-NG368H"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:efd85035dc9cca41e807c420e4a3f725cf2a850536be37076dce97f9c76d43dc"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609070233-NG368H"
      external-result:work-order-202609070233-NG368H-executor-b16ae49de42094be088fc733:
        aggregate_digest: "sha256:cba6e66f74862988ab16785d6a5be30f87e03c69d9ef970487b497c5c0e6104f"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T02:46:53.877Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_5e099b37832e59c38a427165"
          mutation_id: "external-result:work-order-202609070233-NG368H-executor-b16ae49de42094be088fc733"
          plan_digest: "sha256:659002ff6ed9e1584d9e92fb151400f27b2ef444fce592d2197a5d85050c5b07"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070233-NG368H"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: "recover-post-npm-publication"
        mutation_id: "external-result:work-order-202609070233-NG368H-executor-b16ae49de42094be088fc733"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609070233-NG368H"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "a0c5a7f8022597cbfb17ee0c8963f1754026e6ab"
  task_execution_context:
    base_ref: "main"
    base_sha: "81b3fe507426d82ea903d7a63fd6335b583d81b5"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "81b3fe507426d82ea903d7a63fd6335b583d81b5"
    version: 1
id_source: "generated"
---
## Summary

Repair manual release recovery after npm publication

Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release.

## Scope

- In scope: Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release.
- Out of scope: unrelated refactors not required for "Repair manual release recovery after npm publication".

## Plan

Propose one bounded workflow recovery WorkItem. Explicit manual recovery must remain available after npm succeeds while other publication channels are incomplete.

## Verify Steps

1. Run `bun run test:project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts`. Expected: behavioral regression coverage passes for manual recovery after all npm packages exist, partial package visibility, automatic event restrictions, prereleases and missing release-ready evidence.
2. Run `bun run workflows:lint`. Expected: workflow syntax, command contracts and route checks pass.
3. Review the final diff. Expected: only the approved workflow decision and nearest regression suite change; npm skip guards, exact release SHA, versions, tag identity and canonical publish-result requirements remain intact.
4. Keep actual recovery publication pending until the repaired workflow is integrated and canonical hosted publication evidence succeeds.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
