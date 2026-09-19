---
id: "202609191838-3YNJ3Y"
title: "Repair ACR native identity and release real-E2E fixtures"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 42
origin:
  system: "manual"
depends_on: []
tags:
  - "acr"
  - "real-e2e"
  - "release-0.7.10"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run format:check"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
  - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
  - "git diff --check"
  - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
  - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-09-19T18:38:48.063Z"
doc_updated_by: "CODER"
description: "Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch."
sections:
  Summary: |-
    Repair ACR native identity and release real-E2E fixtures

    Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.
  Scope: |-
    - In scope: Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.
    - Out of scope: unrelated refactors not required for "Repair ACR native identity and release real-E2E fixtures".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair ACR native identity and release real-E2E fixtures". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair ACR native identity and release real-E2E fixtures". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "ef8068df34a264d6eccc51190b4f6e3c43d27ab8"
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
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3bdee1692c903f412816c12c65fdc3f5fa0d20723ca777947028f62c8bc2f306"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ddbf7aff78397046b62053e5d3f0c72ae95f8963dbd87e71b0792370ee5869b8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3bdee1692c903f412816c12c65fdc3f5fa0d20723ca777947028f62c8bc2f306"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:5e7a02e0bf6c38921c2500326abbea1826644fc1fad6cf8c6fcc5e7e35864b7f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:22d6a5375f4bc3923dc712f1559b496f2cdb0c8a744a92cf16037488d6e11884"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ddbf7aff78397046b62053e5d3f0c72ae95f8963dbd87e71b0792370ee5869b8"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:ee5b970dc9e6e6f8a95f2e120148268703146b051a80d1a21274ae4d806a3ee8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
        -
          approval_mode: null
          authority:
            capabilities:
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3d50d7bc74b16eb4fd9cbbc74cee06c57d8c01425dcafd94a66c8c5d1f069c25"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:22d6a5375f4bc3923dc712f1559b496f2cdb0c8a744a92cf16037488d6e11884"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:acc64b0030b719eab1cc1d921f6c5a9860bfa6748169516a84fc374c494a9a76"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
        -
          approval_mode: null
          authority:
            capabilities:
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5d219a62b725b3154cd2af3e4fa319cbea499b8ff422cc8b845731d3347ab5b7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3d50d7bc74b16eb4fd9cbbc74cee06c57d8c01425dcafd94a66c8c5d1f069c25"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:38b8c2393302881076a19876534582a1ccd8478246863c7cff22e83d94356178"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
        -
          approval_mode: null
          authority:
            capabilities:
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:aa82ed102651633ed478750114e30aa33b259d62189e802a215f2e70a8b38b7c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5d219a62b725b3154cd2af3e4fa319cbea499b8ff422cc8b845731d3347ab5b7"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:4c6e49d747198c961a15acfdc2c61129f1ddcdb9820f54fe1f6fee33a3c71653"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
        -
          approval_mode: null
          authority:
            capabilities:
              - "command_execution"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ef24574d504b420ffb3f18b4b2838562ad06feed23dd344b32058f6c20c459f5"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:aa82ed102651633ed478750114e30aa33b259d62189e802a215f2e70a8b38b7c"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1916ea75da900c348cf24d314587487ca5db9fc64a15bc49fcec54ce0ea3bb27"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "schemas/acr-v0.1.schema.json"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            task_id: "202609191838-3YNJ3Y"
            validation_requirements:
              - "bun run format:check"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
              - "git diff --check"
              - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:06c3539769e0fa34397fdce0734a8b47dedc457e682ff681d72f74fea08d6aae"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:7f5075f54bc4512116bf645fd3e45db7e764e47524c4332a32f8ffd1021a0f3f"
        digest: "sha256:a9744c1cf3e0166828b6d92e33f750be57e473ac4f65e43edc48bcaf2390d2f7"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:e08d1f21dacde4880face325fe0d15967b8529d4120bbd123df0748f9728c9cf"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "command_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "schemas/acr-v0.1.schema.json"
                - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              scope_roots:
                - "packages/agentplane/src/commands/acr/generate.ts"
                - "packages/agentplane/src/commands/acr/summary.ts"
                - "packages/agentplane/src/commands/acr/acr.command.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
                - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            expected_outputs:
              - "acr-extension-repair"
              - "fixture-repairs"
              - "verification-evidence"
            id: "repair-acr-and-real-e2e"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609191838-3YNJ3Y"
      intent_digest: "sha256:5e5f4c58b7ffa5d06198f256ae61fcd4fecf91ec5d3684a689f4cde3f5ba7f1b"
      migration_receipts: []
      mutation_receipts:
        capture:202609191838-3YNJ3Y:
          after_revision: 1
          aggregate_digest: "sha256:be49475795949c626a7b4f27c2d2144736e09acf824b5d2e4e363a5f3e3cc963"
          before_revision: 0
          command_digest: "sha256:bb93d6c4e7d2e79f968a44a8394b41eafe857feed98b09afd702a61b58e3911a"
          effect_ids: []
          event_digests:
            - "sha256:1f7dfcdaef0fa3b9327752cc40f24a151fc9f862307c1ab86f155fa0b6465f1c"
          mutation_id: "capture:202609191838-3YNJ3Y"
        kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:
          after_revision: 5
          aggregate_digest: "sha256:c424bbe4c1d5482d2cc600b5e51ce3ad79f99f828b90071b36fea9e62d506e14"
          before_revision: 4
          command_digest: "sha256:5b00d52b0438449c0fdc1ce5e692656588ea580acec36b770cc1913457f4f192"
          effect_ids: []
          event_digests:
            - "sha256:58e3468508f2458a1633ae634005e97cc9bead89e9a58552aaeddfb140688c13"
          mutation_id: "kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        kernel_work_item_execution_required:sha256:577cd87e8632547bfdb02144424a954670ed214ae43669c623ddf022156c5837:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92:
          after_revision: 13
          aggregate_digest: "sha256:8dcdc2b1488c94d24ff2a624860f76b1c317aaeb9804bd79b5e90b7cec75a6c6"
          before_revision: 12
          command_digest: "sha256:0806a9dbf64ba0abe70d103b45cff3549f49fe23483cb8126bf73ed30bd7a30b"
          effect_ids: []
          event_digests:
            - "sha256:72d1a8dcba44832a9d4230538d3647e3881ab0690300e16cc5d14c9f028699b8"
          mutation_id: "kernel_work_item_execution_required:sha256:577cd87e8632547bfdb02144424a954670ed214ae43669c623ddf022156c5837:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
        kernel_work_item_execution_required:sha256:689a2850606f16a59945d9e749738cb68c7cad8869914d6888383d9728a4d89e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089:
          after_revision: 20
          aggregate_digest: "sha256:07057e066e3d6143abce1dba72d7ec6d2b51fd1eb8912c8016a6b5fe5fcac8a7"
          before_revision: 19
          command_digest: "sha256:2cf1c4bfd23b809d3499a5f39440b94c8ad1082db6fd279e26bfced8a2bc33f9"
          effect_ids: []
          event_digests:
            - "sha256:95367fbd20c9a04a71d5cf5dbf9ed5fd60a01bb7c0074fc62c7f4242cb5c9ed8"
          mutation_id: "kernel_work_item_execution_required:sha256:689a2850606f16a59945d9e749738cb68c7cad8869914d6888383d9728a4d89e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
        kernel_work_item_execution_required:sha256:84bdb593e09d298dcc49d78de06d92c50c8954203035470511cda6fbd7121d55:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a:
          after_revision: 41
          aggregate_digest: "sha256:2d2b33f7ce3f343e41555f86a836d8bab0f46be81d373e59b84fbf078dbe25e9"
          before_revision: 40
          command_digest: "sha256:c0934e967a2f4b05aade49c9008c124dd15eb7339618fe4e4fcf6c6757baf53b"
          effect_ids: []
          event_digests:
            - "sha256:8555f05a09d30ce7c5b6fd1e15b703cc3ce3f6e296ac806d5ebab76de35875d4"
          mutation_id: "kernel_work_item_execution_required:sha256:84bdb593e09d298dcc49d78de06d92c50c8954203035470511cda6fbd7121d55:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
        kernel_work_item_execution_required:sha256:a3acea329cb8528a21495a95c0938b684aff86208769526aa079b487fe814967:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809:
          after_revision: 34
          aggregate_digest: "sha256:638a28fafadfb0474177a3a83344aaf146dd2802c0dcdcddcfc3d54bcb29bfcc"
          before_revision: 33
          command_digest: "sha256:2dc0b2b0fb743d2acd9c5766da954c1e14d2de1dce1f831c06940a70ad1950f2"
          effect_ids: []
          event_digests:
            - "sha256:a9c4426d9f975993920f8982f15951394f196f6da58eedf9fa10aa71c30d2150"
          mutation_id: "kernel_work_item_execution_required:sha256:a3acea329cb8528a21495a95c0938b684aff86208769526aa079b487fe814967:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
        kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:
          after_revision: 6
          aggregate_digest: "sha256:c12076aecfbba2252e102f5da543f1f9874c42c14c5a067a7676ab0e90d06db4"
          before_revision: 5
          command_digest: "sha256:fd0f038754463a513442ab2a44ddf17c75d15d1d60e64d274a50a92cc60fcfbe"
          effect_ids: []
          event_digests:
            - "sha256:09adac581d3420131630bca02363d7083a56e2ac166f6fb05b095ff8c3eb631d"
          mutation_id: "kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        kernel_work_item_execution_required:sha256:fe1b0c92239040d03792e775e920f73601735658ad9e90412b226a378e751c4b:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2:
          after_revision: 27
          aggregate_digest: "sha256:2f0f49ab2a3f6670317430eafb66bf5fead6eb4dc6634203328503657daa077f"
          before_revision: 26
          command_digest: "sha256:b2d72d3ab8d5591528e3955f300147fa87dec12f9b26605f5ff785dfe7e9aa1d"
          effect_ids: []
          event_digests:
            - "sha256:27a450891b472f8146c160bf21dd8aa4368e2e592eed74d181a7635a934bc401"
          mutation_id: "kernel_work_item_execution_required:sha256:fe1b0c92239040d03792e775e920f73601735658ad9e90412b226a378e751c4b:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
        kernel_work_item_inspection_required:sha256:0ba3640592ea2909da3960f30a3eca64818bb6b6b5b1a74582c171695d89b74d:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a:
          after_revision: 37
          aggregate_digest: "sha256:9253d16029a4987bcf30a4c68fd8b047e70a9c3cdb8382e6573cf720a6fd4e4e"
          before_revision: 36
          command_digest: "sha256:394c7b0af74399bb559792dc3d11e4c875afbbbf5665a890c63729f32240e088"
          effect_ids: []
          event_digests:
            - "sha256:da1544cfe8c6fd55975c0013563f08ee32f947b95f5ec0b2182f2bfc67d1c4b0"
          mutation_id: "kernel_work_item_inspection_required:sha256:0ba3640592ea2909da3960f30a3eca64818bb6b6b5b1a74582c171695d89b74d:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
        kernel_work_item_inspection_required:sha256:382db5e2965d4492f7a32b356f05c7ce7386900d22aa7b60f9ca806453a4914a:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809:
          after_revision: 30
          aggregate_digest: "sha256:18a5e6926ccdf1ba099be7a361303ef8934b96ef4cd1942b2e71ba47b0d90b4a"
          before_revision: 29
          command_digest: "sha256:35c146e64c63dc532029d1f7df4a51f972f03b51448b961c083f8b0fd28e2ab8"
          effect_ids: []
          event_digests:
            - "sha256:9b1a122ef5551af6c2bfe581ccea09f4560207d4fa047f353547b1ef3a143b7c"
          mutation_id: "kernel_work_item_inspection_required:sha256:382db5e2965d4492f7a32b356f05c7ce7386900d22aa7b60f9ca806453a4914a:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
        kernel_work_item_inspection_required:sha256:cd5ad3a23ca88ff2c7c3658e417a86d708d290173262816fb033fec99f57ef7e:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2:
          after_revision: 23
          aggregate_digest: "sha256:ec13017cccd939b7653d94d0e85dd1c3c6c9084c595c146f2b8765f18a0c1255"
          before_revision: 22
          command_digest: "sha256:0c714bfbddcbd643dc1dd86a365647233c725e64696bbd2aa8fc7f6bd3261f0c"
          effect_ids: []
          event_digests:
            - "sha256:c757a3f5d49fd45a69f0942ce0370289f94a4b3bfc5f52803df082f2ecbb27ba"
          mutation_id: "kernel_work_item_inspection_required:sha256:cd5ad3a23ca88ff2c7c3658e417a86d708d290173262816fb033fec99f57ef7e:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
        kernel_work_item_inspection_required:sha256:f4e78de7e72f22489ca64a78245852e4196e7474972c467cdf5fb36b04e00159:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089:
          after_revision: 16
          aggregate_digest: "sha256:2aa54a76cf9ef1d9fe7b377a6c1124204ec3374cc1451b764884f0fc50dc4219"
          before_revision: 15
          command_digest: "sha256:19697d1a953c10227c311864e226d22d8d973e210d29083c1c716b9dfe0143e8"
          effect_ids: []
          event_digests:
            - "sha256:92d407f542771f30862768a93902c32803bb634148ffd4a1fcc96cd80e171460"
          mutation_id: "kernel_work_item_inspection_required:sha256:f4e78de7e72f22489ca64a78245852e4196e7474972c467cdf5fb36b04e00159:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
        kernel_work_item_inspection_required:sha256:f6f352bc0ea5bf73b7dd2ff67839bd1b90ca83331f5e50bd867e6705ba308c91:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92:
          after_revision: 9
          aggregate_digest: "sha256:2c9e6b22c953705b4e62bc503e16120e3f90d50f591939b5f9696d0af7eac7c9"
          before_revision: 8
          command_digest: "sha256:e3ad027726ad71e199c3c7b4255573d1df36930fbfce2d62468c6bc0aed4dcbe"
          effect_ids: []
          event_digests:
            - "sha256:a8227fcafdd26307ab9efac734d273abc2c4adc66343afbed83e4b80c8f5110a"
          mutation_id: "kernel_work_item_inspection_required:sha256:f6f352bc0ea5bf73b7dd2ff67839bd1b90ca83331f5e50bd867e6705ba308c91:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
        kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:
          after_revision: 4
          aggregate_digest: "sha256:f6a1e041e3ee2a355073f5395c6c528dc1a563f07a6ffbc170102aaf456e3d0f"
          before_revision: 3
          command_digest: "sha256:08ad0817c2fc1ca27f9dbadd0f2da6e6c475e65625e210fc4c9571ea096dd086"
          effect_ids: []
          event_digests:
            - "sha256:73f8e1d3d584db0285a50fcc9dbaead90abf6a529fd158f172378b47a106fb69"
          mutation_id: "kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        kernel_work_item_rework_claim_required:sha256:0c182e005c3b8a29fde3e95787f823d30828506da08de97b7c56c656f60c1c01:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809:
          after_revision: 33
          aggregate_digest: "sha256:e35a13488ac956b5cdf8feda2895a93f8659ec9e0af7458ccaaca8379063c107"
          before_revision: 32
          command_digest: "sha256:607971be107e80bfa37077045852338be43fcd3b773509b5299f67508d333fe5"
          effect_ids: []
          event_digests:
            - "sha256:61e42be3e5b11191832b2914a28c8b7d5b0a773f0bb43b24e0ab2a376eee4c82"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:0c182e005c3b8a29fde3e95787f823d30828506da08de97b7c56c656f60c1c01:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
        kernel_work_item_rework_claim_required:sha256:152c492b91439cfd380d44c33bc5ae5fdd26941942978235e918924c1948d25e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089:
          after_revision: 19
          aggregate_digest: "sha256:910317c3691079e049bcd06e7374b209aebc01497f5ccc4525c33e9834e9742f"
          before_revision: 18
          command_digest: "sha256:bac0458506131638c428644e46570c79385dc94302d10f8400f40f01e10f1b17"
          effect_ids: []
          event_digests:
            - "sha256:8cee2f6d739e16fa1cbbd801ff4c68966e8c227d55c7f2b1de9ce8db3bf464a6"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:152c492b91439cfd380d44c33bc5ae5fdd26941942978235e918924c1948d25e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
        kernel_work_item_rework_claim_required:sha256:5ce554ee306bc1daafdcee537240c7861a104288c9fca4831ebef2444df5973f:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92:
          after_revision: 12
          aggregate_digest: "sha256:d46484bbf47263a82249b59f48e30c800e670ca4b65494d38f45d7a789461e0b"
          before_revision: 11
          command_digest: "sha256:4e21ea4e0161054f001402bf72a55d1b623de909dd583dd700a67251b2b3aaf7"
          effect_ids: []
          event_digests:
            - "sha256:1289583daf506d333df64aed4f97ec6e11ca145397c06f995dac1e45c5003898"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:5ce554ee306bc1daafdcee537240c7861a104288c9fca4831ebef2444df5973f:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
        kernel_work_item_rework_claim_required:sha256:6afdb47fed62cf6186dc0fa5333af032968163537c3e030618c7221db259821a:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2:
          after_revision: 26
          aggregate_digest: "sha256:3aec9e87f9f798bc84f6560406bc0d7b2a671c019b0a7f479d2c4ec14a0e27c0"
          before_revision: 25
          command_digest: "sha256:55cc3c8d52fb2a00031d04571f1a94ee4a23720fcbea4cf2e4a9c825ecab1405"
          effect_ids: []
          event_digests:
            - "sha256:ee4b296329411492d6635bee1afee55b5d4747500b330553e3a249a2748fab34"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:6afdb47fed62cf6186dc0fa5333af032968163537c3e030618c7221db259821a:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
        kernel_work_item_rework_claim_required:sha256:9a3c2da5c41b3526f080918c1f064c7abd2076154030fd1708bfa499f17aca74:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a:
          after_revision: 40
          aggregate_digest: "sha256:17dbd1cffcde8b9eb9be2d719b149488593472c193ce30194f79a1a0fdf2b644"
          before_revision: 39
          command_digest: "sha256:aed220818b943dd26f920a428a1d8423b42cb5b9b6522875b135e49aa9ca6a62"
          effect_ids: []
          event_digests:
            - "sha256:2ea24096311380e31402188ef77b6425fc97cb5998aa00a2d43d465d40713945"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:9a3c2da5c41b3526f080918c1f064c7abd2076154030fd1708bfa499f17aca74:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
        result:sha256:3460ca581f0e01d41a18b3735b92a4a0bebd05ae1fc7ba3d211ac4164faad811:
          after_revision: 8
          aggregate_digest: "sha256:243f33c7727a0cb09f58fd1a1b109d5515b1049f82df5bec2bc45341cc1a3eaa"
          before_revision: 7
          command_digest: "sha256:16bed9a21329bc1e9a471ae2f2463753c3641d4cf8b69d113433cd07307ff259"
          effect_ids: []
          event_digests:
            - "sha256:8fc73a3b7960007a48f46c9f8487a4e2df759299b9035b5e22ea76581197a8aa"
          mutation_id: "result:sha256:3460ca581f0e01d41a18b3735b92a4a0bebd05ae1fc7ba3d211ac4164faad811"
        result:sha256:41245b81f368cf59939af5df6321b1e68619fb13b9c06bc9ecb9b11eccddec36:
          after_revision: 15
          aggregate_digest: "sha256:aa6ebe9a3a960075b7a29276f66ab7ce6c6fc033d426107145fca858bc8c7ae0"
          before_revision: 14
          command_digest: "sha256:2e9430daccb63ab7ee2a33c08addaa392b538431ad9e7efa25c450a09630decf"
          effect_ids: []
          event_digests:
            - "sha256:d21a7e751f3e6524ad1a01e77e08efcc22c3c4504784195cee78d22146393050"
          mutation_id: "result:sha256:41245b81f368cf59939af5df6321b1e68619fb13b9c06bc9ecb9b11eccddec36"
        result:sha256:51fdbfcb0447a2dd0da7047dcb67c00b8d61f5b2b991619d3f6553037b1883d0:
          after_revision: 36
          aggregate_digest: "sha256:3d8c0f7da497ae75497e15bdd429b1eb7e06f9d41d6682b5c86f5a695ff81484"
          before_revision: 35
          command_digest: "sha256:ceacadd6c780147d6b35edbeac93c1647e950425c6b1d602563eceb3308469a3"
          effect_ids: []
          event_digests:
            - "sha256:b3c6e3fe37ccc84b79b46e3ef0f3db8b1381b0819c8871f822e9026b38963b48"
          mutation_id: "result:sha256:51fdbfcb0447a2dd0da7047dcb67c00b8d61f5b2b991619d3f6553037b1883d0"
        result:sha256:59864622f56be46091deee721dcf2ab10fa8e2c63580ee859e60e21a16720bbd:
          after_revision: 22
          aggregate_digest: "sha256:231315868430711b228286c6272c72aa57622955e26208389a90131112face16"
          before_revision: 21
          command_digest: "sha256:f29699ce4baf68a19b0ed4df814e29b03837c3cf51777f8462c9e858c37ee3f8"
          effect_ids: []
          event_digests:
            - "sha256:5d36e39450e37fcdc6847fe5909e41b748f1e1aca3467df790fc9d2337de50d7"
          mutation_id: "result:sha256:59864622f56be46091deee721dcf2ab10fa8e2c63580ee859e60e21a16720bbd"
        result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f:
          after_revision: 2
          aggregate_digest: "sha256:42abe8f09e5a4ee6141adc3522a82bc81b3fcaeffc71c1c4ddf42c5c7f471b0d"
          before_revision: 1
          command_digest: "sha256:ad91b55b3ff2344a827f5400ec3f512cd5673e515c0e106aa2533e2337800946"
          effect_ids: []
          event_digests:
            - "sha256:f9392113f8a285a87ec3b727955723b5d773e0b50a6e305053897eb683f0b3d1"
          mutation_id: "result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f"
        result:sha256:b2887bd18e62e43042676fe35ff8e1d45406f9508b578d482125f314580164ce:
          after_revision: 29
          aggregate_digest: "sha256:6cb0a731c2c7f504524c4ebfab8ee09efd93cf414db75cc619190da5ee9780d8"
          before_revision: 28
          command_digest: "sha256:f031217e7e7054af8eaf86b76c7d34a4d2576ceeb80dbe6aeb49c69c5ed97f75"
          effect_ids: []
          event_digests:
            - "sha256:7a0d451aee0d016771bd9fa72be0b3517f9eef6d5724a71cb9bb5a2719e5ecf9"
          mutation_id: "result:sha256:b2887bd18e62e43042676fe35ff8e1d45406f9508b578d482125f314580164ce"
        sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e:
          after_revision: 3
          aggregate_digest: "sha256:845982ba07c467a5adff7e69594182da33b7acf5f5f1df2aa05fd8cf68cb4007"
          before_revision: 2
          command_digest: "sha256:a4135de041bd6cc45c5f307a068191ef4c06452c620bfd3ee86f5dbb554ad453"
          effect_ids: []
          event_digests:
            - "sha256:3c9ff38818d19489156885d4144bca99b9c15ff9fefd40b5e41bdf2077500a0d"
          mutation_id: "sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e"
        sha256:69606a6f0b7125095064c5be6f9473530b1c35f5bba2dfe0f68b9a4f1d7f3729:
          after_revision: 7
          aggregate_digest: "sha256:d59c075cbe380cbdab04701529d7a12ff1ff2ce84fe9871ac97c4469ab1ed3ef"
          before_revision: 6
          command_digest: "sha256:75ddabe45f88aaf3ea16ac5952c04645517421964990fb5fac1f9339cc80fc25"
          effect_ids: []
          event_digests:
            - "sha256:e6aece724baebe1e1c76c48f7e736d27f7582c7f0902f62761a521d97e8c91a5"
          mutation_id: "sha256:69606a6f0b7125095064c5be6f9473530b1c35f5bba2dfe0f68b9a4f1d7f3729"
        sha256:8bacf14b6fa8b2ba89059623a09b909e4691e016733df2aa427535ac71fd197a:
          after_revision: 42
          aggregate_digest: "sha256:73d16409077bf15e4def899c9848b0a6c5a09308c73dc69d053b4bb14bf8d367"
          before_revision: 41
          command_digest: "sha256:83735f7f67fc96167dafb606b4f804e14f55999dcede9bc5afdd427ad643955e"
          effect_ids: []
          event_digests:
            - "sha256:b0c1bf06bb5558eb690351f9612592fad7ab4e7e83b5adb8e4a9e27a5425a69e"
          mutation_id: "sha256:8bacf14b6fa8b2ba89059623a09b909e4691e016733df2aa427535ac71fd197a"
        sha256:8cfc5ffafea5d01298dd75cf9ffb6836b846d5d4364094078ba0205960a9f0b0:
          after_revision: 14
          aggregate_digest: "sha256:07081e082879b44e2244c5a15181a8d3998fe9ae35cbae43098996f373a7a8d2"
          before_revision: 13
          command_digest: "sha256:a13ae0805120ff5c4b2d5c86796f3e05a0d81c6f946cd966c649a6dd6251ef40"
          effect_ids: []
          event_digests:
            - "sha256:f1855e4a42d77bb9c58807a0f27525dbc8c84c8941398edacc9ac4222901ad38"
          mutation_id: "sha256:8cfc5ffafea5d01298dd75cf9ffb6836b846d5d4364094078ba0205960a9f0b0"
        sha256:8d5cd3fd5d39c47dd05bde1c227a906e5252c7a62d830f5f5f9676c9cb8c41f8:
          after_revision: 21
          aggregate_digest: "sha256:299e8da441dcc026e5d087516fdde5e272a24eb1d4aef151ebd41ae58681e5ee"
          before_revision: 20
          command_digest: "sha256:fdb405aba5859aaf5f27b68d07cbce183872d6e76c579c48d0e96982961101d9"
          effect_ids: []
          event_digests:
            - "sha256:bbb87f75d3ed3a698628548174c0f10298ce0bd304aec6c2b64bee2281e3adaf"
          mutation_id: "sha256:8d5cd3fd5d39c47dd05bde1c227a906e5252c7a62d830f5f5f9676c9cb8c41f8"
        sha256:dabbc76f956231f75af841564131f9774522065d85da18a9b16fe586acdf5fa6:
          after_revision: 28
          aggregate_digest: "sha256:ae58e9ef1f813a000883abaf18b7b1689162f4ebd024e3c2b2e915104aec6bc9"
          before_revision: 27
          command_digest: "sha256:76e8b2fc0e3560cce604ae62a81c03bf346700dfe5ca8a2f170bdd800b6b5cc2"
          effect_ids: []
          event_digests:
            - "sha256:1ab0eeb53281acbbd52b78af31d04195e07293c5d978ad6488812d624e79565e"
          mutation_id: "sha256:dabbc76f956231f75af841564131f9774522065d85da18a9b16fe586acdf5fa6"
        sha256:f15794150c7238595301fee9b411be7091509274c0491682f735800067482d51:
          after_revision: 35
          aggregate_digest: "sha256:24e7b0515e573a687c042bb4aebd2d6d1ea9b4d2261dc73ca2ecc326baefba40"
          before_revision: 34
          command_digest: "sha256:60353aec550899dcd46591ea66f9c44d7301efc25cc52efd8eda1bbc72bb6fc6"
          effect_ids: []
          event_digests:
            - "sha256:93535b9776a2a95c4f5c8a54800786b9aa336ae8122c297d40e61040b06c3a90"
          mutation_id: "sha256:f15794150c7238595301fee9b411be7091509274c0491682f735800067482d51"
        validation-resolution:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6:
          after_revision: 18
          aggregate_digest: "sha256:13c2198d7bf1faa2d80022ec2c1204f2de9a0429b30bf17625a01b8b96d98e96"
          before_revision: 17
          command_digest: "sha256:248548c011aef82b44b190c7b1479841f63f09ec13250638ae97bcaa5be975ec"
          effect_ids: []
          event_digests:
            - "sha256:58ff63f6d6c0b9b59ceeab144b4e2c70660378cdaee0d46b1bb93802c2b71cc7"
          mutation_id: "validation-resolution:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6"
        validation-resolution:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1:
          after_revision: 25
          aggregate_digest: "sha256:b6d52e284ac8a65845a43504d4c3336824e94dc999e727bce84324c7b0f9a051"
          before_revision: 24
          command_digest: "sha256:8136408f41fdff7632a2e6f9865e4bfe205e21adbbf5d99e02bf8f312f7dac6d"
          effect_ids: []
          event_digests:
            - "sha256:3ee8adc68f26e9af7483006909b7edfa736c5aa53ec6a1431234d6378571b871"
          mutation_id: "validation-resolution:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1"
        validation-resolution:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59:
          after_revision: 11
          aggregate_digest: "sha256:168e9d704f503cc6f7915d202c8de8c9d06480f136068c69f2f0ede6935c88a1"
          before_revision: 10
          command_digest: "sha256:39b464ab87a88c3b245fd9a6297b4c8df25bdf42823291db5f91a2c1e73ea4de"
          effect_ids: []
          event_digests:
            - "sha256:51099b98fe5332d3b3d57ed3d5e1b0924b1858dccffbf0977eeb1ca6b1a0f829"
          mutation_id: "validation-resolution:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59"
        validation-resolution:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a:
          after_revision: 32
          aggregate_digest: "sha256:4c20ef6df6b131626ed6b8995d6efce9ab6541eef6e0621543f20748f2c5014b"
          before_revision: 31
          command_digest: "sha256:613efd118c349b5c8c8bbef5e67d809cc60ae7d591fd08fd643851b36382c243"
          effect_ids: []
          event_digests:
            - "sha256:34238a987d48caccb4e8191ddb7df723e84400f15751dc4faa6c5c0fd8f6a6f4"
          mutation_id: "validation-resolution:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a"
        validation-resolution:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931:
          after_revision: 39
          aggregate_digest: "sha256:56d7e2328b10c2dc042f170d0c56555dd658a5f39fc20f33522d31f003b5970f"
          before_revision: 38
          command_digest: "sha256:f3d06ac2259fb46202cfea77b9b55f633e69d90742c53531ebbf764ee47a7e03"
          effect_ids: []
          event_digests:
            - "sha256:cfbce41a0f903f01b0fbd41c047aa64b225433b1bc73523e2db3622e939d9b5f"
          mutation_id: "validation-resolution:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931"
        validation:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6:
          after_revision: 17
          aggregate_digest: "sha256:cc3757eaf657b0c4650540407a320ff6ee2d3d3aefb55acc5d9cbede1ba9e217"
          before_revision: 16
          command_digest: "sha256:8575ca21a90f6dc5b546c50bed262f4d9f9a8fcc2f771e45692cc12c819e7550"
          effect_ids: []
          event_digests:
            - "sha256:dd4254a0184e780b149d36053b7dcee411ac7c839d6ddecb68e57cb9cf4c77e4"
          mutation_id: "validation:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6"
        validation:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1:
          after_revision: 24
          aggregate_digest: "sha256:a972d98266453de4cabf56d5f473e9bed7cc674e40840da35fac766983b8daf2"
          before_revision: 23
          command_digest: "sha256:aa71714e2b9973130dcbf95a3cc08fe33afe088562dae334da38d03179020b13"
          effect_ids: []
          event_digests:
            - "sha256:d58218e3b7ad8fc124370282697324a92b23f2a10e13631337ecd7583fdb765f"
          mutation_id: "validation:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1"
        validation:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59:
          after_revision: 10
          aggregate_digest: "sha256:1a6fb7dc47e46dcedd91f147dc0fa1217a7a483c200b2507fa9f3661bd98b716"
          before_revision: 9
          command_digest: "sha256:1dbbd7bd9f96b07b10e8c01955701d161ab5c9cc3f872c5732763d14fe741723"
          effect_ids: []
          event_digests:
            - "sha256:fe2d9ec1e4fa59c2ecf6a56eba0a40d0d6f033c43640e853c06edc466babb2ce"
          mutation_id: "validation:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59"
        validation:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a:
          after_revision: 31
          aggregate_digest: "sha256:d39d644b9dc08decabdeda906cfb6ba2196469defb2b39757b553e8fd1d617b5"
          before_revision: 30
          command_digest: "sha256:8abd9cb927349eced53482bb213645aa3be9bfd8cbe85cec7a2b988f7a2e4a0b"
          effect_ids: []
          event_digests:
            - "sha256:d2d61ee63821f95da26d01704a9f877da5e289579d5372aea129dbb019504ad4"
          mutation_id: "validation:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a"
        validation:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931:
          after_revision: 38
          aggregate_digest: "sha256:6133d9d9cd4842923c8e0d9d178768877fb36d27901c97472d15ce50be7a2814"
          before_revision: 37
          command_digest: "sha256:834390ce77de012803b7418f0879f703902b7398caa02ccc9a9006aba359942a"
          effect_ids: []
          event_digests:
            - "sha256:50441f1f41eccb79193ff09cf2211743b3be87ffa8ff4d83040851ed7f462d1a"
          mutation_id: "validation:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931"
      plan_history: []
      revision: 42
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-acr-and-real-e2e:
          attempt: 6
          claim_id: "sha256:82947ab6e37413b312ac2e314290fa8469919156cd9e121200e8e3ae734983bc"
          definition:
            contract_digest: "sha256:e08d1f21dacde4880face325fe0d15967b8529d4120bbd123df0748f9728c9cf"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "command_execution"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "schemas/acr-v0.1.schema.json"
                - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              scope_roots:
                - "packages/agentplane/src/commands/acr/generate.ts"
                - "packages/agentplane/src/commands/acr/summary.ts"
                - "packages/agentplane/src/commands/acr/acr.command.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
                - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            expected_outputs:
              - "acr-extension-repair"
              - "fixture-repairs"
              - "verification-evidence"
            id: "repair-acr-and-real-e2e"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 33
          state: "EXECUTING"
          validation: null
    digest: "sha256:aac0deee122846797503d7da8b607735f0a1d097aac8b6d6ca964d6b339c3b88"
    documents:
      contracts:
        sha256:e08d1f21dacde4880face325fe0d15967b8529d4120bbd123df0748f9728c9cf:
          acceptance_criteria:
            - "Generated ACRs with native identity validate against ACR v0.1 and use agentplane.native-identity."
            - "ACR summary reads both the schema-valid key and the legacy underscore key."
            - "Hosted-close fixtures materialize completed canonical work items and all focused tests pass."
            - "The packaged mixed-scope fixture does not invoke task doc set and both release real-E2E scenarios pass together."
          objective: "Generate native identity under the schema-valid agentplane.native-identity ACR extension key, retain summary compatibility with the legacy underscore spelling, and repair the hosted-close and packaged mixed-scope fixtures without weakening lifecycle checks."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts"
            - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --fail-on-scenario-failure --scenario packaged-mixed-scope-lifecycle,hosted-boundary-matrix"
            - "bun run format:check"
            - "git diff --check"
      intent:
        context: "Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch."
        objective: "Repair ACR native identity and release real-E2E fixtures"
    events:
      -
        command_digest: "sha256:bb93d6c4e7d2e79f968a44a8394b41eafe857feed98b09afd702a61b58e3911a"
        id: "capture:202609191838-3YNJ3Y:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609191838-3YNJ3Y"
        occurred_at: "2026-09-19T18:38:48.029Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 1
      -
        command_digest: "sha256:ad91b55b3ff2344a827f5400ec3f512cd5673e515c0e106aa2533e2337800946"
        id: "result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:6b7e75e95a87069dcc48fb0da24aa22d1eb8fdbd8d9fde3d9617ea0c4932857f"
        occurred_at: "2026-09-19T18:39:49.978Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 2
      -
        command_digest: "sha256:a4135de041bd6cc45c5f307a068191ef4c06452c620bfd3ee86f5dbb554ad453"
        id: "sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:44bdd203202cfa9e17bbce473fa03083862c25ffc3aa86e96d2ceca11b583d5e"
        occurred_at: "2026-09-19T18:39:59.255Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 3
      -
        command_digest: "sha256:08ad0817c2fc1ca27f9dbadd0f2da6e6c475e65625e210fc4c9571ea096dd086"
        id: "kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4cca38330e127cedd1dcfa9b80488f71d90717bfb067b3cf07de201178a50979:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        occurred_at: "2026-09-19T18:40:06.729Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 4
      -
        command_digest: "sha256:5b00d52b0438449c0fdc1ce5e692656588ea580acec36b770cc1913457f4f192"
        id: "kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7d3613c38b57d54a0d07f37549adf75d3dde9c9936799e3519c7117b6d9dd954:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        occurred_at: "2026-09-19T18:40:10.432Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 5
      -
        command_digest: "sha256:fd0f038754463a513442ab2a44ddf17c75d15d1d60e64d274a50a92cc60fcfbe"
        id: "kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b56d4f6713e318e5a9e26b78543a7c3d64d1b00b789dcdffe9b8c77996cc73e5:sha256:e2829c4adf4498154b3220d3dc026783135e0304e83efb7cd6df6603cf4abcf4"
        occurred_at: "2026-09-19T18:40:28.309Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 6
      -
        command_digest: "sha256:75ddabe45f88aaf3ea16ac5952c04645517421964990fb5fac1f9339cc80fc25"
        id: "sha256:69606a6f0b7125095064c5be6f9473530b1c35f5bba2dfe0f68b9a4f1d7f3729:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:69606a6f0b7125095064c5be6f9473530b1c35f5bba2dfe0f68b9a4f1d7f3729"
        occurred_at: "2026-09-19T18:44:14.964Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 7
      -
        command_digest: "sha256:16bed9a21329bc1e9a471ae2f2463753c3641d4cf8b69d113433cd07307ff259"
        id: "result:sha256:3460ca581f0e01d41a18b3735b92a4a0bebd05ae1fc7ba3d211ac4164faad811:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:3460ca581f0e01d41a18b3735b92a4a0bebd05ae1fc7ba3d211ac4164faad811"
        occurred_at: "2026-09-19T18:44:19.154Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 8
      -
        command_digest: "sha256:e3ad027726ad71e199c3c7b4255573d1df36930fbfce2d62468c6bc0aed4dcbe"
        id: "kernel_work_item_inspection_required:sha256:f6f352bc0ea5bf73b7dd2ff67839bd1b90ca83331f5e50bd867e6705ba308c91:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f6f352bc0ea5bf73b7dd2ff67839bd1b90ca83331f5e50bd867e6705ba308c91:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
        occurred_at: "2026-09-19T18:44:22.285Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 9
      -
        command_digest: "sha256:1dbbd7bd9f96b07b10e8c01955701d161ab5c9cc3f872c5732763d14fe741723"
        id: "validation:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59"
        occurred_at: "2026-09-19T18:45:34.394Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 10
      -
        command_digest: "sha256:39b464ab87a88c3b245fd9a6297b4c8df25bdf42823291db5f91a2c1e73ea4de"
        id: "validation-resolution:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5774f7a85dd937896d40ff6b62e1b815c1b38cee5a951636ca794aa8a1a0af59"
        occurred_at: "2026-09-19T18:45:36.397Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 11
      -
        command_digest: "sha256:4e21ea4e0161054f001402bf72a55d1b623de909dd583dd700a67251b2b3aaf7"
        id: "kernel_work_item_rework_claim_required:sha256:5ce554ee306bc1daafdcee537240c7861a104288c9fca4831ebef2444df5973f:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:5ce554ee306bc1daafdcee537240c7861a104288c9fca4831ebef2444df5973f:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
        occurred_at: "2026-09-19T18:45:40.534Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 12
      -
        command_digest: "sha256:0806a9dbf64ba0abe70d103b45cff3549f49fe23483cb8126bf73ed30bd7a30b"
        id: "kernel_work_item_execution_required:sha256:577cd87e8632547bfdb02144424a954670ed214ae43669c623ddf022156c5837:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:577cd87e8632547bfdb02144424a954670ed214ae43669c623ddf022156c5837:sha256:18c62ffcd14b1c1d6bb9f24428de5b11187f6e48bc4594ab314d993ba650eb92"
        occurred_at: "2026-09-19T18:45:44.473Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 13
      -
        command_digest: "sha256:a13ae0805120ff5c4b2d5c86796f3e05a0d81c6f946cd966c649a6dd6251ef40"
        id: "sha256:8cfc5ffafea5d01298dd75cf9ffb6836b846d5d4364094078ba0205960a9f0b0:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8cfc5ffafea5d01298dd75cf9ffb6836b846d5d4364094078ba0205960a9f0b0"
        occurred_at: "2026-09-19T18:49:06.786Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 14
      -
        command_digest: "sha256:2e9430daccb63ab7ee2a33c08addaa392b538431ad9e7efa25c450a09630decf"
        id: "result:sha256:41245b81f368cf59939af5df6321b1e68619fb13b9c06bc9ecb9b11eccddec36:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:41245b81f368cf59939af5df6321b1e68619fb13b9c06bc9ecb9b11eccddec36"
        occurred_at: "2026-09-19T18:49:10.968Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 15
      -
        command_digest: "sha256:19697d1a953c10227c311864e226d22d8d973e210d29083c1c716b9dfe0143e8"
        id: "kernel_work_item_inspection_required:sha256:f4e78de7e72f22489ca64a78245852e4196e7474972c467cdf5fb36b04e00159:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f4e78de7e72f22489ca64a78245852e4196e7474972c467cdf5fb36b04e00159:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
        occurred_at: "2026-09-19T18:49:14.150Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 16
      -
        command_digest: "sha256:8575ca21a90f6dc5b546c50bed262f4d9f9a8fcc2f771e45692cc12c819e7550"
        id: "validation:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6"
        occurred_at: "2026-09-19T18:50:30.459Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 17
      -
        command_digest: "sha256:248548c011aef82b44b190c7b1479841f63f09ec13250638ae97bcaa5be975ec"
        id: "validation-resolution:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2936d0c17236c54d75177e16b0e6db6102221e5b38e3c3d56aec8dcaf6b52ff6"
        occurred_at: "2026-09-19T18:50:32.504Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 18
      -
        command_digest: "sha256:bac0458506131638c428644e46570c79385dc94302d10f8400f40f01e10f1b17"
        id: "kernel_work_item_rework_claim_required:sha256:152c492b91439cfd380d44c33bc5ae5fdd26941942978235e918924c1948d25e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:152c492b91439cfd380d44c33bc5ae5fdd26941942978235e918924c1948d25e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
        occurred_at: "2026-09-19T18:50:36.499Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 19
      -
        command_digest: "sha256:2cf1c4bfd23b809d3499a5f39440b94c8ad1082db6fd279e26bfced8a2bc33f9"
        id: "kernel_work_item_execution_required:sha256:689a2850606f16a59945d9e749738cb68c7cad8869914d6888383d9728a4d89e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:689a2850606f16a59945d9e749738cb68c7cad8869914d6888383d9728a4d89e:sha256:63d71158bbe2a36493f567da7f6bc5e4c80761d0fb53f40d69fbbe1cda7fe089"
        occurred_at: "2026-09-19T18:50:40.484Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 20
      -
        command_digest: "sha256:fdb405aba5859aaf5f27b68d07cbce183872d6e76c579c48d0e96982961101d9"
        id: "sha256:8d5cd3fd5d39c47dd05bde1c227a906e5252c7a62d830f5f5f9676c9cb8c41f8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8d5cd3fd5d39c47dd05bde1c227a906e5252c7a62d830f5f5f9676c9cb8c41f8"
        occurred_at: "2026-09-19T18:53:09.193Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 21
      -
        command_digest: "sha256:f29699ce4baf68a19b0ed4df814e29b03837c3cf51777f8462c9e858c37ee3f8"
        id: "result:sha256:59864622f56be46091deee721dcf2ab10fa8e2c63580ee859e60e21a16720bbd:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:59864622f56be46091deee721dcf2ab10fa8e2c63580ee859e60e21a16720bbd"
        occurred_at: "2026-09-19T18:53:13.364Z"
        payload_digest: "sha256:0909349b0439b554db4b4450982b8c538fcc513bb5154268100b33efa83f8996"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 22
      -
        command_digest: "sha256:0c714bfbddcbd643dc1dd86a365647233c725e64696bbd2aa8fc7f6bd3261f0c"
        id: "kernel_work_item_inspection_required:sha256:cd5ad3a23ca88ff2c7c3658e417a86d708d290173262816fb033fec99f57ef7e:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:cd5ad3a23ca88ff2c7c3658e417a86d708d290173262816fb033fec99f57ef7e:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
        occurred_at: "2026-09-19T18:53:16.471Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 23
      -
        command_digest: "sha256:aa71714e2b9973130dcbf95a3cc08fe33afe088562dae334da38d03179020b13"
        id: "validation:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1"
        occurred_at: "2026-09-19T18:54:13.016Z"
        payload_digest: "sha256:4878ab2391d59246cd05275fa5f1dec131ae6cd0229e806e9863b1686acfa772"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 24
      -
        command_digest: "sha256:8136408f41fdff7632a2e6f9865e4bfe205e21adbbf5d99e02bf8f312f7dac6d"
        id: "validation-resolution:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:42ddde6b6e60eb99c274d71e7366ceaa5b756b281c2d06ebb635eea89f4061d1"
        occurred_at: "2026-09-19T18:54:15.044Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 25
      -
        command_digest: "sha256:55cc3c8d52fb2a00031d04571f1a94ee4a23720fcbea4cf2e4a9c825ecab1405"
        id: "kernel_work_item_rework_claim_required:sha256:6afdb47fed62cf6186dc0fa5333af032968163537c3e030618c7221db259821a:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:6afdb47fed62cf6186dc0fa5333af032968163537c3e030618c7221db259821a:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
        occurred_at: "2026-09-19T18:54:19.054Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 26
      -
        command_digest: "sha256:b2d72d3ab8d5591528e3955f300147fa87dec12f9b26605f5ff785dfe7e9aa1d"
        id: "kernel_work_item_execution_required:sha256:fe1b0c92239040d03792e775e920f73601735658ad9e90412b226a378e751c4b:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:fe1b0c92239040d03792e775e920f73601735658ad9e90412b226a378e751c4b:sha256:2110b58268c316dd769fb958c583616e30dd86f1e140ee33254be65ea64424b2"
        occurred_at: "2026-09-19T18:54:23.041Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 27
      -
        command_digest: "sha256:76e8b2fc0e3560cce604ae62a81c03bf346700dfe5ca8a2f170bdd800b6b5cc2"
        id: "sha256:dabbc76f956231f75af841564131f9774522065d85da18a9b16fe586acdf5fa6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:dabbc76f956231f75af841564131f9774522065d85da18a9b16fe586acdf5fa6"
        occurred_at: "2026-09-19T18:55:55.685Z"
        payload_digest: "sha256:758d046bb700bfb388afb5f242615a0666d8c68a77abc7d727af5deb3ef3a0b2"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 28
      -
        command_digest: "sha256:f031217e7e7054af8eaf86b76c7d34a4d2576ceeb80dbe6aeb49c69c5ed97f75"
        id: "result:sha256:b2887bd18e62e43042676fe35ff8e1d45406f9508b578d482125f314580164ce:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b2887bd18e62e43042676fe35ff8e1d45406f9508b578d482125f314580164ce"
        occurred_at: "2026-09-19T18:55:59.933Z"
        payload_digest: "sha256:26dd0f4b06a2bea56fb8527d7c16b2e90cf490d12c0d1654c88f5900a6ad8e4d"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 29
      -
        command_digest: "sha256:35c146e64c63dc532029d1f7df4a51f972f03b51448b961c083f8b0fd28e2ab8"
        id: "kernel_work_item_inspection_required:sha256:382db5e2965d4492f7a32b356f05c7ce7386900d22aa7b60f9ca806453a4914a:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:382db5e2965d4492f7a32b356f05c7ce7386900d22aa7b60f9ca806453a4914a:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
        occurred_at: "2026-09-19T18:56:03.139Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 30
      -
        command_digest: "sha256:8abd9cb927349eced53482bb213645aa3be9bfd8cbe85cec7a2b988f7a2e4a0b"
        id: "validation:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a"
        occurred_at: "2026-09-19T18:57:04.709Z"
        payload_digest: "sha256:508ff4e990154e1dbf9852bacbf1c924f77c4110611ba32112cffdb03055fc3b"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 31
      -
        command_digest: "sha256:613efd118c349b5c8c8bbef5e67d809cc60ae7d591fd08fd643851b36382c243"
        id: "validation-resolution:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5ebbf878dbec28148c09e3145c5bcf04ed7a4607427fe448f1d5f1823367e93a"
        occurred_at: "2026-09-19T18:57:06.740Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 32
      -
        command_digest: "sha256:607971be107e80bfa37077045852338be43fcd3b773509b5299f67508d333fe5"
        id: "kernel_work_item_rework_claim_required:sha256:0c182e005c3b8a29fde3e95787f823d30828506da08de97b7c56c656f60c1c01:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:0c182e005c3b8a29fde3e95787f823d30828506da08de97b7c56c656f60c1c01:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
        occurred_at: "2026-09-19T18:57:10.694Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 33
      -
        command_digest: "sha256:2dc0b2b0fb743d2acd9c5766da954c1e14d2de1dce1f831c06940a70ad1950f2"
        id: "kernel_work_item_execution_required:sha256:a3acea329cb8528a21495a95c0938b684aff86208769526aa079b487fe814967:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a3acea329cb8528a21495a95c0938b684aff86208769526aa079b487fe814967:sha256:2f306681b56a246180b2caf5bc7750510a04cc796de261f0122e09d2168ac809"
        occurred_at: "2026-09-19T18:57:14.662Z"
        payload_digest: "sha256:2c8825f2df1e5d586f549f034a6d8d55cf0206c93a79a641b229b209ac66991e"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 34
      -
        command_digest: "sha256:60353aec550899dcd46591ea66f9c44d7301efc25cc52efd8eda1bbc72bb6fc6"
        id: "sha256:f15794150c7238595301fee9b411be7091509274c0491682f735800067482d51:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:f15794150c7238595301fee9b411be7091509274c0491682f735800067482d51"
        occurred_at: "2026-09-19T18:58:27.803Z"
        payload_digest: "sha256:75eef70cc13c1d872989b912fbe0608a2ada7fb14cc4e2cf8fdb81e61d77e7bd"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 35
      -
        command_digest: "sha256:ceacadd6c780147d6b35edbeac93c1647e950425c6b1d602563eceb3308469a3"
        id: "result:sha256:51fdbfcb0447a2dd0da7047dcb67c00b8d61f5b2b991619d3f6553037b1883d0:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:51fdbfcb0447a2dd0da7047dcb67c00b8d61f5b2b991619d3f6553037b1883d0"
        occurred_at: "2026-09-19T18:58:32.017Z"
        payload_digest: "sha256:8990de18788eac1b647063cc67369527cd577cd88373ad4467b29eb26335d20f"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 36
      -
        command_digest: "sha256:394c7b0af74399bb559792dc3d11e4c875afbbbf5665a890c63729f32240e088"
        id: "kernel_work_item_inspection_required:sha256:0ba3640592ea2909da3960f30a3eca64818bb6b6b5b1a74582c171695d89b74d:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:0ba3640592ea2909da3960f30a3eca64818bb6b6b5b1a74582c171695d89b74d:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
        occurred_at: "2026-09-19T18:58:35.149Z"
        payload_digest: "sha256:4b57ae96bbb30b8ddf86b349a9cf7ad9ef25bfaba3a6768eec3e07df7deebdc0"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 37
      -
        command_digest: "sha256:834390ce77de012803b7418f0879f703902b7398caa02ccc9a9006aba359942a"
        id: "validation:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931"
        occurred_at: "2026-09-19T18:59:44.032Z"
        payload_digest: "sha256:e54a4e7e5e4e37ef294132d346c963c552dc30d06a9927b8e14630857aacde9e"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 38
      -
        command_digest: "sha256:f3d06ac2259fb46202cfea77b9b55f633e69d90742c53531ebbf764ee47a7e03"
        id: "validation-resolution:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:a9cbbd9e37aefe9efe74f2395955a0a4af0ee7f87d21babb62cdff2304cc6931"
        occurred_at: "2026-09-19T18:59:46.082Z"
        payload_digest: "sha256:1614312eb58103f4c7640f85f8c8390d8b08424d5dc30404b86eb726e683b1d7"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 39
      -
        command_digest: "sha256:aed220818b943dd26f920a428a1d8423b42cb5b9b6522875b135e49aa9ca6a62"
        id: "kernel_work_item_rework_claim_required:sha256:9a3c2da5c41b3526f080918c1f064c7abd2076154030fd1708bfa499f17aca74:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:9a3c2da5c41b3526f080918c1f064c7abd2076154030fd1708bfa499f17aca74:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
        occurred_at: "2026-09-19T18:59:50.115Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 40
      -
        command_digest: "sha256:c0934e967a2f4b05aade49c9008c124dd15eb7339618fe4e4fcf6c6757baf53b"
        id: "kernel_work_item_execution_required:sha256:84bdb593e09d298dcc49d78de06d92c50c8954203035470511cda6fbd7121d55:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:84bdb593e09d298dcc49d78de06d92c50c8954203035470511cda6fbd7121d55:sha256:20ec9689feec32e8295d45346c9cf28a87d182ee5041a452a7ee10484d70744a"
        occurred_at: "2026-09-19T18:59:53.969Z"
        payload_digest: "sha256:6d756eeb8cec9f82fc6087e919673e23c7375d61274786e32bffd6144934d617"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 41
      -
        command_digest: "sha256:83735f7f67fc96167dafb606b4f804e14f55999dcede9bc5afdd427ad643955e"
        id: "sha256:8bacf14b6fa8b2ba89059623a09b909e4691e016733df2aa427535ac71fd197a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8bacf14b6fa8b2ba89059623a09b909e4691e016733df2aa427535ac71fd197a"
        occurred_at: "2026-09-19T19:02:13.989Z"
        payload_digest: "sha256:bc22c1e4d22a7f545c38c3a7bb4c7f40467d501da3b54b80b0c1d9ef24a482a1"
        task_id: "202609191838-3YNJ3Y"
        task_revision: 42
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair ACR native identity and release real-E2E fixtures

Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.

## Scope

- In scope: Use the schema-valid ACR extension key agentplane.native-identity while retaining summary read compatibility for the legacy underscore key; update hosted-close fixtures to materialize completed canonical work items; remove unsupported task doc mutation from the packaged mixed-scope fixture. Preserve all unrelated production behavior. This replaces fixture-only tasks after correct cli-core execution exposed the ACR schema mismatch.
- Out of scope: unrelated refactors not required for "Repair ACR native identity and release real-E2E fixtures".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Repair ACR native identity and release real-E2E fixtures". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair ACR native identity and release real-E2E fixtures". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
