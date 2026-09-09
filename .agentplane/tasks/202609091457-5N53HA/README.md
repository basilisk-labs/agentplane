---
id: "202609091457-5N53HA"
title: "Publish direct ops quality review fix from upstream main"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "direct-ops"
  - "upstream-pr"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "publish"
blueprint_request: "code.branch_pr"
verify:
  - "bun run build"
  - "bun run package:tarball:check"
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
  - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.direct-ops-quality.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-09T15:05:39.349Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:d7bc7f9dcc629cf90da067d983a0574b7c4d10d0191a21e938c85da2996f87d0"
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
    - "effect_public_api"
    - "effect_publish"
    - "effect_schema"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/developer"
      - "docs/user"
      - "packages/agentplane/src/backends"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/evidence"
      - "packages/agentplane/src/commands/task"
      - "packages/core/schemas"
      - "packages/core/src/index.ts"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/release"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A new branch based on upstream main is required for a valid fork-based pull request."
      - "The code and tests already passed local validation on the original task branch."
      - "The user explicitly authorized publication to the upstream repository."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/developer"
      - "docs/user"
      - "packages/agentplane/src/backends"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/evidence"
      - "packages/agentplane/src/commands/task"
      - "packages/core/schemas"
      - "packages/core/src/index.ts"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/release"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_publish"
    - "effect_schema"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "docs/developer"
          - "docs/user"
          - "packages/agentplane/src/backends"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/evaluator"
          - "packages/agentplane/src/commands/evidence"
          - "packages/agentplane/src/commands/task"
          - "packages/core/schemas"
          - "packages/core/src/index.ts"
          - "packages/core/src/tasks"
          - "packages/spec/schemas"
          - "schemas"
          - "scripts/release"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:6cb40ae1da254c7370f2a518323dc65f04cbe8bcafbb4a516bdd8482f1ae2e72"
      escalation_reasons:
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src/index.ts"
        - "central_component:packages/core/src/tasks"
        - "effect_public_api"
        - "effect_schema"
        - "external_effect_requires_real_e2e"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-09T15:05:46.009Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-09T15:05:46.009Z"
doc_updated_by: "CODER"
description: "Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI."
sections:
  Summary: |-
    Publish direct ops quality review fix from upstream main

    Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI.
  Scope: |-
    - In scope: Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI.
    - Out of scope: unrelated refactors not required for "Publish direct ops quality review fix from upstream main".
  Plan: "Defined one bounded implementation and publication work item for the already verified direct ops fix."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts`. Expected: explicit commit, evidence subject, legacy compatibility, and force-bypass cases pass.
    2. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.direct-ops-quality.test.ts`. Expected: the complete direct ops lifecycle reaches DONE and rejects stale evidence.
    3. Run `bun run typecheck`. Expected: all changed TypeScript packages typecheck.
    4. Run `bun run build`. Expected: all publishable packages build successfully.
    5. Run `bun run package:tarball:check`. Expected: local package tarballs contain valid runtime and metadata.
    6. Open the fork-based GitHub PR against `basilisk-labs/agentplane:main`. Expected: the hosted PR head equals the verified local task branch head.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:d7bc7f9dcc629cf90da067d983a0574b7c4d10d0191a21e938c85da2996f87d0"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:78839e46b5e70193f9d3f3a9ed18e57be8f6231e5bde4d08b99573774b5f6817"
    digest: "sha256:933edacbc0073207a54e246b739cf3782fa8d557333ea2de646f279b00085a91"
    grant_id: "39179ea8-ff0b-489b-a228-0e5676366920"
    issued_at: "2026-09-09T15:05:39.349Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:28e93785717a16f1d5f46e853e172b128d5fefb9ec6b7f8d325efa7c7788d156"
    plan_revision: 7
    repository_identity: "sha256:4d4f122365e3b382519a58a42f4021d908a09e93d8b2a5709639f1843429d339"
    schema_version: 1
    scope_digest: "sha256:bd456e03d944818b09c90ec7263f76d648296797bc05d5900a933b1b812a5528"
    status: "active"
    task_id: "202609091457-5N53HA"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-09T15:05:39.349Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:dc323e5acaad56c752e75d0bbe4e738f8ee172bbc5f1e069aba3d34ca2f3244f"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-09T15:03:47.497Z"
      digest: "sha256:dc323e5acaad56c752e75d0bbe4e738f8ee172bbc5f1e069aba3d34ca2f3244f"
      proposal:
        assumptions:
          - "The fork remains writable by pzzz404."
          - "The upstream target branch remains main during publication."
        planning_baseline:
          captured_at: "2026-09-09T15:00:26.273Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:d77af7e54b653ea25a8052e780310f5b8a486b7df5e2ee82789766314e2c5b57"
          dirty_paths:
            - ".agentplane/tasks/202609091457-5N53HA/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:6"
        schema_version: 1
        task_id: "202609091457-5N53HA"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.direct-ops-quality.test.ts"
              id: "check-lifecycle"
              kind: "deterministic"
              required: true
              timeout_ms: 240000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "structural"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run build"
              id: "check-build"
              kind: "structural"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run package:tarball:check"
              id: "check-tarball"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "agentplane pr check 202609091457-5N53HA --hosted"
              id: "check-hosted"
              kind: "provider"
              required: true
              timeout_ms: 120000
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-lifecycle"
              description: "The implementation paths match the verified direct ops quality-review patch without ParfScanner or runtime changes."
              id: "criterion-equivalence"
              required: true
            -
              check_ids:
                - "check-typecheck"
                - "check-build"
                - "check-tarball"
              description: "The source typechecks, builds, and produces valid package tarballs."
              id: "criterion-package"
              required: true
            -
              check_ids:
                - "check-hosted"
              description: "A fork-based pull request targets basilisk-labs/agentplane main at the verified task branch head."
              id: "criterion-publication"
              required: true
          evidence_fingerprint: "sha256:d77af7e54b653ea25a8052e780310f5b8a486b7df5e2ee82789766314e2c5b57"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused"
                    - "check-lifecycle"
                  description: "The implementation paths match the verified direct ops quality-review patch without ParfScanner or runtime changes."
                  id: "criterion-equivalence"
                  required: true
                -
                  check_ids:
                    - "check-typecheck"
                    - "check-build"
                    - "check-tarball"
                  description: "The source typechecks, builds, and produces valid package tarballs."
                  id: "criterion-package"
                  required: true
                -
                  check_ids:
                    - "check-hosted"
                  description: "A fork-based pull request targets basilisk-labs/agentplane main at the verified task branch head."
                  id: "criterion-publication"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "docs/user/commands.mdx"
                  - "scripts/release/check-local-tarball-install-smoke.mjs"
                required_sources:
                  - "packages/core/src/tasks/task-store.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
                  - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.direct-ops-quality.test.ts"
                symbol_hints:
                  - "QualityReviewSubject"
                  - "resolveEvaluatorBinding"
                  - "resolveOpsFinishSubject"
                  - "evaluated_subject"
              depends_on: []
              expected_outputs:
                - "Equivalent source, schema, test, and documentation changes"
                - "Passing local verification evidence"
                - "Fork-based GitHub pull request against basilisk-labs/agentplane main"
              id: "work-publish-fix"
              objective: "Transplant the verified direct ops quality-review implementation onto upstream main, validate it, and publish the fork-based pull request."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "task/202609091457-5N53HA/publish-direct-ops-review-fix"
                -
                  kind: "provider_queue"
                  mode: "write"
                  resource: "github.com/basilisk-labs/agentplane"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/backends"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/evidence"
                - "packages/agentplane/src/commands/task"
                - "packages/core/schemas"
                - "packages/core/src/index.ts"
                - "packages/core/src/tasks"
                - "packages/spec/schemas"
                - "schemas"
                - "docs/developer"
                - "docs/user"
                - "scripts/release"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.direct-ops-quality.test.ts"
                    id: "check-lifecycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 240000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "structural"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run build"
                    id: "check-build"
                    kind: "structural"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run package:tarball:check"
                    id: "check-tarball"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "agentplane pr check 202609091457-5N53HA --hosted"
                    id: "check-hosted"
                    kind: "provider"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                      - "check-lifecycle"
                    description: "The implementation paths match the verified direct ops quality-review patch without ParfScanner or runtime changes."
                    id: "criterion-equivalence"
                    required: true
                  -
                    check_ids:
                      - "check-typecheck"
                      - "check-build"
                      - "check-tarball"
                    description: "The source typechecks, builds, and produces valid package tarballs."
                    id: "criterion-package"
                    required: true
                  -
                    check_ids:
                      - "check-hosted"
                    description: "A fork-based pull request targets basilisk-labs/agentplane main at the verified task branch head."
                    id: "criterion-publication"
                    required: true
                evidence_fingerprint: "sha256:d77af7e54b653ea25a8052e780310f5b8a486b7df5e2ee82789766314e2c5b57"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609091457-5N53HA"
    event_cursor: 2
    final_validation: null
    id: "202609091457-5N53HA"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run build"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run package:tarball:check"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.direct-ops-quality.test.ts"
          id: "legacy-5"
          required: true
      captured_at: "2026-09-09T15:00:00.846Z"
      constraints: []
      request: |-
        Publish direct ops quality review fix from upstream main

        Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI.
      task_id: "202609091457-5N53HA"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 9
    schema_version: 1
    updated_at: "2026-09-09T15:05:46.009Z"
    work_items:
      work-publish-fix:
        attempt: 0
        claim_id: null
        id: "work-publish-fix"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:1c42116d04b08fe34330cca1bca3dcb92148013594bae6b2683add506cac93d0:
        aggregate_digest: "sha256:ffa0a526ee77e50bac835c0c3fced2c5f81bb70a97aea592254c1a6079050a3a"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T15:03:47.512Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_58477b71014cd1df46e6d167"
          mutation_id: "compatibility:sha256:1c42116d04b08fe34330cca1bca3dcb92148013594bae6b2683add506cac93d0"
          plan_digest: "sha256:dc323e5acaad56c752e75d0bbe4e738f8ee172bbc5f1e069aba3d34ca2f3244f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609091457-5N53HA"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:1c42116d04b08fe34330cca1bca3dcb92148013594bae6b2683add506cac93d0"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609091457-5N53HA"
      compatibility:sha256:4652298b9dd076b2c6c84f0798f02dd39739152dbdb171b3f013b6ee19a537a0:
        aggregate_digest: "sha256:3ca9271a32dd0b764581d1d15dab20b52bc012d4ef0cf31200b0e9b1cb91612c"
        event:
          actor_id: "agentplane"
          at: "2026-09-09T15:05:46.009Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b03f56fc683977c7679895bf"
          mutation_id: "compatibility:sha256:4652298b9dd076b2c6c84f0798f02dd39739152dbdb171b3f013b6ee19a537a0"
          plan_digest: "sha256:dc323e5acaad56c752e75d0bbe4e738f8ee172bbc5f1e069aba3d34ca2f3244f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609091457-5N53HA"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4652298b9dd076b2c6c84f0798f02dd39739152dbdb171b3f013b6ee19a537a0"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609091457-5N53HA"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    repository_identity: "sha256:4d4f122365e3b382519a58a42f4021d908a09e93d8b2a5709639f1843429d339"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    version: 1
id_source: "generated"
---
## Summary

Publish direct ops quality review fix from upstream main

Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI.

## Scope

- In scope: Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI.
- Out of scope: unrelated refactors not required for "Publish direct ops quality review fix from upstream main".

## Plan

Defined one bounded implementation and publication work item for the already verified direct ops fix.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts`. Expected: explicit commit, evidence subject, legacy compatibility, and force-bypass cases pass.
2. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.direct-ops-quality.test.ts`. Expected: the complete direct ops lifecycle reaches DONE and rejects stale evidence.
3. Run `bun run typecheck`. Expected: all changed TypeScript packages typecheck.
4. Run `bun run build`. Expected: all publishable packages build successfully.
5. Run `bun run package:tarball:check`. Expected: local package tarballs contain valid runtime and metadata.
6. Open the fork-based GitHub PR against `basilisk-labs/agentplane:main`. Expected: the hosted PR head equals the verified local task branch head.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
