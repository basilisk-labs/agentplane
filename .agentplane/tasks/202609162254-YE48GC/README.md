---
id: "202609162254-YE48GC"
title: "Implement and qualify AgentPlane 0.7.10 Blueprint retirement"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 32
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "v0.7.10"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
verify:
  - "bun run arch:check"
  - "bun run bench:agent-efficiency:check"
  - "bun run bench:agent-efficiency:replay:check"
  - "bun run ci:local:full"
  - "bun run docs:bootstrap:check"
  - "bun run docs:onboarding:check"
  - "bun run package:install-smoke"
  - "bun run test:release:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-09-16T23:01:48.151Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:d45ce5060f5fae001ac6bfd1c0d38ba3980252524ae842840b74c01db55a53d8"
verification:
  state: "pending"
  updated_at: "2026-09-17T12:01:36.780Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_public_api"
    - "effect_release_metadata"
    - "effect_schema"
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
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
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
      - "security_boundary"
    writable_roots:
      - ".github/workflows"
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages/agentplane"
      - "packages/agentplane/src/commands/acr"
      - "packages/core"
      - "packages/core/schemas"
      - "packages/core/src"
      - "packages/recipes"
      - "packages/spec/schemas"
      - "packages/testkit/src"
      - "schemas"
      - "scripts"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch PR with full regression, independent evaluation, hosted integration, and installed-package qualification is required."
      - "Publication remains outside this implementation task and will require its own release authority and exact-SHA evidence."
      - "The change removes a public execution subsystem and changes current wire identity, migration, CLI, generated assets, documentation, and release metadata."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/commands/acr; repository_effects=source_code,tests"
      - "USER-approved blocked-result scope extension: roots=packages/core/schemas,packages/spec/schemas; repository_effects=schema,tests"
      - "USER-approved blocked-result scope extension: roots=packages/core/src,packages/testkit/src; repository_effects=schema,source_code,tests"
    repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".github/workflows"
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages/agentplane"
      - "packages/agentplane/src/commands/acr"
      - "packages/core"
      - "packages/core/schemas"
      - "packages/core/src"
      - "packages/recipes"
      - "packages/spec/schemas"
      - "packages/testkit/src"
      - "schemas"
      - "scripts"
  observed:
    authority_violations: []
    changed_components:
      - ".github"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "scripts"
    changed_paths:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/acr/generate-extensions.ts"
      - "packages/agentplane/src/commands/acr/generate.ts"
      - "packages/agentplane/src/commands/acr/summary.ts"
      - "packages/agentplane/src/commands/blueprint/historical-audit.test.ts"
      - "packages/agentplane/src/commands/blueprint/historical-audit.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-quality-artifacts.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-artifacts.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-work-order.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/shared/native-task-identity.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
      - "packages/agentplane/src/commands/shared/task-verification-input.test.ts"
      - "packages/agentplane/src/commands/shared/task-verification-input.ts"
      - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/blueprint-summary.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
      - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-cutover.test.ts"
      - "packages/agentplane/src/commands/task/kernel-cutover.ts"
      - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
      - "packages/agentplane/src/commands/task/kernel-migration-admission.test.ts"
      - "packages/agentplane/src/commands/task/kernel-migration-admission.ts"
      - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
      - "packages/agentplane/src/commands/task/kernel-work-order.ts"
      - "packages/agentplane/src/commands/task/new.primary-checkout.test.ts"
      - "packages/agentplane/src/commands/task/new.spec.ts"
      - "packages/agentplane/src/commands/task/new.ts"
      - "packages/agentplane/src/commands/task/quality-review-gate.ts"
      - "packages/agentplane/src/commands/task/run-execution-preview.ts"
      - "packages/agentplane/src/commands/task/run.command.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record-references.ts"
      - "packages/agentplane/src/commands/task/verify-show.command.ts"
      - "packages/agentplane/src/runner/context/base-prompts.ts"
      - "packages/agentplane/src/runner/context/recipe-prompt-blocks.test.ts"
      - "packages/agentplane/src/runner/context/recipe-prompt-blocks.ts"
      - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
      - "packages/agentplane/src/runner/run-repository-contract.ts"
      - "packages/agentplane/src/runner/state-fingerprint.ts"
      - "packages/agentplane/src/runner/types/context.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order.ts"
      - "packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
      - "packages/agentplane/src/runner/usecases/task-run-obligations.ts"
      - "packages/agentplane/src/runner/usecases/task-run.ts"
      - "packages/agentplane/src/runtime/execution-profile/model.ts"
      - "packages/agentplane/src/runtime/execution-profile/resolve.test.ts"
      - "packages/agentplane/src/runtime/execution-profile/resolve.ts"
      - "packages/agentplane/src/runtime/prompt-modules/registry.test.ts"
      - "packages/agentplane/src/runtime/prompt-modules/registry.ts"
      - "packages/agentplane/src/runtime/task-obligations/catalog.ts"
      - "packages/agentplane/src/runtime/task-obligations/index.ts"
      - "packages/agentplane/src/runtime/task-obligations/model.ts"
      - "packages/agentplane/src/runtime/task-obligations/resolve.test.ts"
      - "packages/agentplane/src/runtime/task-obligations/resolve.ts"
      - "packages/core/src/runner/state-fingerprint.test.ts"
      - "packages/core/src/runner/state-fingerprint.ts"
      - "packages/recipes/src/blueprint-extensions.test.ts"
      - "packages/recipes/src/blueprint-extensions.ts"
      - "scripts/checks/blueprint-retirement-map.json"
      - "scripts/checks/blueprint-retirement-map.test.mjs"
      - "scripts/generate/render-ghcr-image-metadata.mjs"
      - "scripts/release/manifest.mjs"
      - "scripts/release/stable-channel-policy.mjs"
      - "scripts/release/stable-channel-policy.test.mjs"
    external_effects: []
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_public_api"
    - "effect_release_metadata"
    - "effect_schema"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - ".github/workflows"
          - "bun.lock"
          - "docs"
          - "package.json"
          - "packages/agentplane"
          - "packages/agentplane/src/commands/acr"
          - "packages/core"
          - "packages/core/schemas"
          - "packages/core/src"
          - "packages/recipes"
          - "packages/spec/schemas"
          - "packages/testkit/src"
          - "schemas"
          - "scripts"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "ci"
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:60d5f8c00f67930edb4636b5fa356cd7777483107a52a3bf0b62cdd292ec06cb"
      escalation_reasons:
        - "central_component:.github/workflows"
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src"
        - "central_path:.github/workflows/publish.yml"
        - "central_path:packages/agentplane/src/commands/shared/native-task-identity.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-input-types.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-input.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-input.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-records.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
        - "central_path:packages/core/src/runner/state-fingerprint.test.ts"
        - "central_path:packages/core/src/runner/state-fingerprint.ts"
        - "central_path:scripts/checks/blueprint-retirement-map.json"
        - "central_path:scripts/checks/blueprint-retirement-map.test.mjs"
        - "central_path:scripts/release/manifest.mjs"
        - "central_path:scripts/release/stable-channel-policy.mjs"
        - "central_path:scripts/release/stable-channel-policy.test.mjs"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/checks/blueprint-retirement-map.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".github"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "scripts"
        changed_files:
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/acr/generate-extensions.ts"
          - "packages/agentplane/src/commands/acr/generate.ts"
          - "packages/agentplane/src/commands/acr/summary.ts"
          - "packages/agentplane/src/commands/blueprint/historical-audit.test.ts"
          - "packages/agentplane/src/commands/blueprint/historical-audit.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-quality-artifacts.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-artifacts.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-work-order.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          - "packages/agentplane/src/commands/shared/native-task-identity.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
          - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
          - "packages/agentplane/src/commands/shared/task-verification-input.test.ts"
          - "packages/agentplane/src/commands/shared/task-verification-input.ts"
          - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
          - "packages/agentplane/src/commands/shared/task-verification-records.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/blueprint-summary.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
          - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
          - "packages/agentplane/src/commands/task/kernel-cutover.test.ts"
          - "packages/agentplane/src/commands/task/kernel-cutover.ts"
          - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
          - "packages/agentplane/src/commands/task/kernel-migration-admission.test.ts"
          - "packages/agentplane/src/commands/task/kernel-migration-admission.ts"
          - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
          - "packages/agentplane/src/commands/task/kernel-work-order.ts"
          - "packages/agentplane/src/commands/task/new.primary-checkout.test.ts"
          - "packages/agentplane/src/commands/task/new.spec.ts"
          - "packages/agentplane/src/commands/task/new.ts"
          - "packages/agentplane/src/commands/task/quality-review-gate.ts"
          - "packages/agentplane/src/commands/task/run-execution-preview.ts"
          - "packages/agentplane/src/commands/task/run.command.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record-references.ts"
          - "packages/agentplane/src/commands/task/verify-show.command.ts"
          - "packages/agentplane/src/runner/context/base-prompts.ts"
          - "packages/agentplane/src/runner/context/recipe-prompt-blocks.test.ts"
          - "packages/agentplane/src/runner/context/recipe-prompt-blocks.ts"
          - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
          - "packages/agentplane/src/runner/run-repository-contract.ts"
          - "packages/agentplane/src/runner/state-fingerprint.ts"
          - "packages/agentplane/src/runner/types/context.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order.ts"
          - "packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
          - "packages/agentplane/src/runner/usecases/task-run-obligations.ts"
          - "packages/agentplane/src/runner/usecases/task-run.ts"
          - "packages/agentplane/src/runtime/execution-profile/model.ts"
          - "packages/agentplane/src/runtime/execution-profile/resolve.test.ts"
          - "packages/agentplane/src/runtime/execution-profile/resolve.ts"
          - "packages/agentplane/src/runtime/prompt-modules/registry.test.ts"
          - "packages/agentplane/src/runtime/prompt-modules/registry.ts"
          - "packages/agentplane/src/runtime/task-obligations/catalog.ts"
          - "packages/agentplane/src/runtime/task-obligations/index.ts"
          - "packages/agentplane/src/runtime/task-obligations/model.ts"
          - "packages/agentplane/src/runtime/task-obligations/resolve.test.ts"
          - "packages/agentplane/src/runtime/task-obligations/resolve.ts"
          - "packages/core/src/runner/state-fingerprint.test.ts"
          - "packages/core/src/runner/state-fingerprint.ts"
          - "packages/recipes/src/blueprint-extensions.test.ts"
          - "packages/recipes/src/blueprint-extensions.ts"
          - "scripts/checks/blueprint-retirement-map.json"
          - "scripts/checks/blueprint-retirement-map.test.mjs"
          - "scripts/generate/render-ghcr-image-metadata.mjs"
          - "scripts/release/manifest.mjs"
          - "scripts/release/stable-channel-policy.mjs"
          - "scripts/release/stable-channel-policy.test.mjs"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
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
      - "hosted_integration"
      - "repository_effect:ci"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
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
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8456ad88c80d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a79b2b9abcaf. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2afa52039e6c. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved verification-identity WorkItem requires current ACR consumers to move from Blueprint identity, but the issued writable roots omit the active ACR generator and renderer. No repository files were changed. Recommended action: Add packages/agentplane/src/commands/acr to this WorkItem writable roots and reissue the EXECUTOR packet. Requested scope: roots=packages/agentplane/src/commands/acr; repository effects=source_code,tests; request digest=sha256:08cf3a2c20c4337b82fcf6eb7ccd65f2dbba5550eee2b86a74514603b4c95d10. Agentplane receipt: external-agent-blocker/tr_235b6b2ddaa9d173e94c2854d5ad3269/sha256:35a7ab7a68c7d531d38ee1c79f2d168451c15c0b055e30a5be204446e594b9b2/sha256:08cf3a2c20c4337b82fcf6eb7ccd65f2dbba5550eee2b86a74514603b4c95d10."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/commands/acr; repository effects: source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 32bd131a28f4. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: bae683e0858e. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The uncommitted workspace changes are the intended in-scope implementation for remove-active-blueprint. They must be preserved. Completion requires two writable roots that this replacement packet still does not grant. Recommended action: Preserve the current diff and extend the next EXECUTOR packet to packages/testkit/src and packages/core/src. Requested scope: roots=packages/core/src,packages/testkit/src; repository effects=schema,source_code,tests; request digest=sha256:7f402dbd397e13ced113379d94e1ab5cf28e303e5f183692e80beb45968d3004. Agentplane receipt: external-agent-blocker/tr_2659a5bf14de050c9073fcb1b79b3a9c/sha256:8a177d805e6c29efb3c66217e47a58d0c308352cd1fb44113b46e827b520b018/sha256:7f402dbd397e13ced113379d94e1ab5cf28e303e5f183692e80beb45968d3004."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/core/src, packages/testkit/src; repository effects: schema, source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The workspace conflict is an authority mismatch, not an ambiguous user change: schema synchronization generated required Blueprint-free distribution mirrors in two directories outside the issued writable roots. The changes must be retained and the scope extended before this WorkItem can complete. Recommended action: Add packages/core/schemas and packages/spec/schemas to this WorkItem writable roots, preserve the current generated changes, and reissue the EXECUTOR packet. Requested scope: roots=packages/core/schemas,packages/spec/schemas; repository effects=schema,tests; request digest=sha256:2a40b6d10b1a3f60582f25f70b19c3a557d6154cdf7a1b3d3d40b150fa054b45. Agentplane receipt: external-agent-blocker/tr_cd8db4c3dec00a25f62778a0b336afbb/sha256:be459c42496a0bae4741fcddef0256d2289b9d1f40a7e71d45ce86def18e5900/sha256:2a40b6d10b1a3f60582f25f70b19c3a557d6154cdf7a1b3d3d40b150fa054b45."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/core/schemas, packages/spec/schemas; repository effects: schema, tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The same scoped workspace conflict remains: deterministic generated schema mirrors are required by the approved source change but are outside the packet authority. No additional repository mutation was performed in this conflict episode. Recommended action: Add packages/core/schemas and packages/spec/schemas to the WorkItem writable roots and reissue the EXECUTOR packet. Requested scope: roots=packages/core/schemas,packages/spec/schemas; repository effects=schema,tests; request digest=sha256:0faaecc8315c3879d748f9e3e49881f122e698305864a5ea1b1885dbf90fd063. Agentplane receipt: external-agent-blocker/tr_3991171b32a8ffa68b7e30de80114975/sha256:ac43697b2a5745dc622f95f94512ac37f88053bdbcb342d07b39c21dcbf5c25d/sha256:0faaecc8315c3879d748f9e3e49881f122e698305864a5ea1b1885dbf90fd063."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/core/schemas, packages/spec/schemas; repository effects: schema, tests."
events:
  -
    type: "status"
    at: "2026-09-16T23:02:04.360Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-16T23:15:37.571Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8456ad88c80d. CLI accepted one state-bound external-agent semantic result."
    commit: "8456ad88c80d3d66b797e20bb256d72b385b02e2"
  -
    type: "status"
    at: "2026-09-17T00:14:09.587Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a79b2b9abcaf. CLI accepted one state-bound external-agent semantic result."
    commit: "a79b2b9abcaffc74b12cffe485d160a68190e1f3"
  -
    type: "status"
    at: "2026-09-17T07:26:28.608Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2afa52039e6c. CLI accepted one state-bound external-agent semantic result."
    commit: "2afa52039e6c50ead89776da98e817a243e7e4da"
  -
    type: "status"
    at: "2026-09-17T07:45:45.689Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved verification-identity WorkItem requires current ACR consumers to move from Blueprint identity, but the issued writable roots omit the active ACR generator and renderer. No repository files were changed. Recommended action: Add packages/agentplane/src/commands/acr to this WorkItem writable roots and reissue the EXECUTOR packet. Requested scope: roots=packages/agentplane/src/commands/acr; repository effects=source_code,tests; request digest=sha256:08cf3a2c20c4337b82fcf6eb7ccd65f2dbba5550eee2b86a74514603b4c95d10. Agentplane receipt: external-agent-blocker/tr_235b6b2ddaa9d173e94c2854d5ad3269/sha256:35a7ab7a68c7d531d38ee1c79f2d168451c15c0b055e30a5be204446e594b9b2/sha256:08cf3a2c20c4337b82fcf6eb7ccd65f2dbba5550eee2b86a74514603b4c95d10."
  -
    type: "status"
    at: "2026-09-17T09:07:57.265Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 32bd131a28f4. CLI accepted one state-bound external-agent semantic result."
    commit: "32bd131a28f46452bc8cf6e399ca61a228b0459a"
  -
    type: "status"
    at: "2026-09-17T10:26:38.290Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bae683e0858e. CLI accepted one state-bound external-agent semantic result."
    commit: "bae683e0858e7580bf32f9fa12b27f8f0bfeffc6"
  -
    type: "status"
    at: "2026-09-17T11:34:36.953Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The uncommitted workspace changes are the intended in-scope implementation for remove-active-blueprint. They must be preserved. Completion requires two writable roots that this replacement packet still does not grant. Recommended action: Preserve the current diff and extend the next EXECUTOR packet to packages/testkit/src and packages/core/src. Requested scope: roots=packages/core/src,packages/testkit/src; repository effects=schema,source_code,tests; request digest=sha256:7f402dbd397e13ced113379d94e1ab5cf28e303e5f183692e80beb45968d3004. Agentplane receipt: external-agent-blocker/tr_2659a5bf14de050c9073fcb1b79b3a9c/sha256:8a177d805e6c29efb3c66217e47a58d0c308352cd1fb44113b46e827b520b018/sha256:7f402dbd397e13ced113379d94e1ab5cf28e303e5f183692e80beb45968d3004."
  -
    type: "status"
    at: "2026-09-17T11:55:26.413Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The workspace conflict is an authority mismatch, not an ambiguous user change: schema synchronization generated required Blueprint-free distribution mirrors in two directories outside the issued writable roots. The changes must be retained and the scope extended before this WorkItem can complete. Recommended action: Add packages/core/schemas and packages/spec/schemas to this WorkItem writable roots, preserve the current generated changes, and reissue the EXECUTOR packet. Requested scope: roots=packages/core/schemas,packages/spec/schemas; repository effects=schema,tests; request digest=sha256:2a40b6d10b1a3f60582f25f70b19c3a557d6154cdf7a1b3d3d40b150fa054b45. Agentplane receipt: external-agent-blocker/tr_cd8db4c3dec00a25f62778a0b336afbb/sha256:be459c42496a0bae4741fcddef0256d2289b9d1f40a7e71d45ce86def18e5900/sha256:2a40b6d10b1a3f60582f25f70b19c3a557d6154cdf7a1b3d3d40b150fa054b45."
  -
    type: "status"
    at: "2026-09-17T11:56:22.602Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The same scoped workspace conflict remains: deterministic generated schema mirrors are required by the approved source change but are outside the packet authority. No additional repository mutation was performed in this conflict episode. Recommended action: Add packages/core/schemas and packages/spec/schemas to the WorkItem writable roots and reissue the EXECUTOR packet. Requested scope: roots=packages/core/schemas,packages/spec/schemas; repository effects=schema,tests; request digest=sha256:0faaecc8315c3879d748f9e3e49881f122e698305864a5ea1b1885dbf90fd063. Agentplane receipt: external-agent-blocker/tr_3991171b32a8ffa68b7e30de80114975/sha256:ac43697b2a5745dc622f95f94512ac37f88053bdbcb342d07b39c21dcbf5c25d/sha256:0faaecc8315c3879d748f9e3e49881f122e698305864a5ea1b1885dbf90fd063."
doc_version: 3
doc_updated_at: "2026-09-17T11:56:22.602Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task."
sections:
  Summary: |-
    Implement and qualify AgentPlane 0.7.10 Blueprint retirement

    Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
  Scope: |-
    - In scope: Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
    - Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.10 Blueprint retirement".
  Plan: "Implement the approved 0.7.10 Blueprint retirement as seven dependency-ordered internal WorkItems, preserving lifecycle and safety obligations, then qualify the installed artifact and prepare release metadata without publishing from this implementation task."
  Verify Steps: |-
    1. Run `node --test scripts/release/*.test.mjs` and `node --test scripts/checks/blueprint-retirement-map.test.mjs`. Expected: SemVer-stable channel promotion and the complete field/consumer/writer owner map pass.
    2. Run the focused AgentPlane and Recipes tests added or updated for BP-02 through BP-28. Expected: native route, policy, authority, context, Recipe V1, verification identity, migration, cutover, and historical-audit parity and negative cases pass with nonzero executed tests.
    3. Run `node --test scripts/checks/no-blueprint-engine.test.mjs` and `node --test scripts/checks/no-blueprint-cursor.test.mjs`. Expected: active imports, writers, prompt projections, mutation CLI, graph engine, and cursor are absent; only the explicit cold-decoder allowlist remains.
    4. Run `bun run schemas:check`, `bun run agents:check`, `bun run docs:bootstrap:check`, and `bun run docs:onboarding:check`. Expected: generated assets, help/schema exports, policy routing, and compatibility documentation agree with the implemented 0.7.10 boundary.
    5. Run `bun run package:install-smoke`, `bun run test:release:critical`, and `bun run arch:check`. Expected: the packed install passes direct, branch, context, recovery, Recipe V1, migration, historical-audit, stable-channel, release-critical, and architecture qualification.
    6. Run `bun run bench:agent-efficiency:check` and `bun run bench:agent-efficiency:replay:check`. Expected: the benchmark corpus and replay are valid; M02 is marked `ESTABLISHED` only with matched paid 0.7.9/0.7.10 evidence, otherwise explicitly `NOT ESTABLISHED`.
    7. Run `bun run ci:local:full`. Expected: full local CI succeeds after focused checks.
    8. Perform independent semantic review. Expected: lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations remain equal or stronger; custom non-exact graphs are never guessed.
    9. Inspect `git status --short --untracked-files=all` and the final diff. Expected: only approved task files and AgentPlane-owned task artifacts changed, with no secrets, generated drift, or unrelated modifications.
    10. Require hosted CI/integration evidence before merge. Expected: all required provider checks pass against the exact PR head and `origin/main` contains the integrated commit before the implementation task is considered complete.
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
    approval_evidence_digest: "sha256:d45ce5060f5fae001ac6bfd1c0d38ba3980252524ae842840b74c01db55a53d8"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:1194c357e1223bcc626371316240fb89b0fa6a76e482616f1910d83848d12e77"
    digest: "sha256:29abdd4753e2154e1efbc2f4cc8f2e515e60f50e00c1d6772058e72cd5bfad33"
    grant_id: "1811105c-2a17-498b-b034-fc4e341ab4b6"
    issued_at: "2026-09-16T23:01:48.151Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:7f4fb33aba75e4d1ae9d9026209bd92576bc392301080f274798ae5150be2892"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:89e7ed6347b514ef4b051098ca7321060665f69b599bf137e0e291eca66d420f"
    status: "active"
    task_id: "202609162254-YE48GC"
  agentplane.scope_extension_request:
    applied_at: "2026-09-17T12:01:36.780Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:ac43697b2a5745dc622f95f94512ac37f88053bdbcb342d07b39c21dcbf5c25d"
    kind: "task_scope_extension_request"
    request:
      rationale: "The repository schema synchronizer writes these package mirrors from the authorized source schemas. Both mirrors must lose active Blueprint fields for the published schema contract to match the approved retirement."
      repository_effects:
        - "schema"
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/core/schemas"
        - "packages/spec/schemas"
    request_digest: "sha256:0faaecc8315c3879d748f9e3e49881f122e698305864a5ea1b1885dbf90fd063"
    schema_version: 1
    status: "applied"
    transition_id: "tr_3991171b32a8ffa68b7e30de80114975"
    work_item_id: "remove-active-blueprint"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-17T12:01:36.780Z"
        approved_by: "USER"
        approved_digest: "sha256:d6340b2317a46dd7a62a380bc20011a0deeeadab26df50699553b3bca1b92efb"
        policy_facts:
          - "state_bound_scope_extension:sha256:0faaecc8315c3879d748f9e3e49881f122e698305864a5ea1b1885dbf90fd063"
        state: "approved"
      created_at: "2026-09-17T12:01:36.780Z"
      digest: "sha256:d6340b2317a46dd7a62a380bc20011a0deeeadab26df50699553b3bca1b92efb"
      proposal:
        assumptions:
          - "Current main at 19ff39fd292c30f0958131c35200a6268b7a285d is the accepted planning baseline."
          - "The existing Plan, native policy, capability, task-routing, verification, journal, Recipe V1, and task-state owners are retained; no replacement workflow engine is introduced."
          - "PLANNER and EVALUATOR remain mandatory wherever current policy requires them; Scenario V2 and lifecycle-owner convergence remain outside 0.7.10."
          - "Publication is performed only after this implementation task is merged and independently qualified under a separate release task and publish authority."
        planning_baseline:
          captured_at: "2026-09-16T22:55:54.740Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:518dc1dcc46175c0c4b1160f3cc6f80d277a47f1bfc09656aa14e9d4303b44e6"
          dirty_paths:
            - ".agentplane/tasks/202609162254-YE48GC/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609162254-YE48GC"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "ci-full"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run package:install-smoke"
              id: "install-smoke"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run test:release:critical"
              id: "release-critical"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run arch:check"
              id: "arch-check"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
              id: "docs-check"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:check"
              id: "bench-check"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:replay:check"
              id: "bench-replay"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              id: "semantic-review"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "hosted-ci"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "ci-full"
                - "install-smoke"
                - "release-critical"
                - "arch-check"
                - "semantic-review"
              description: "Blueprint is absent from active execution and model-visible context while current lifecycle, authority, verification, Recipe V1, recovery, and historical audit obligations remain enforced."
              id: "task-outcome"
              required: true
            -
              check_ids:
                - "install-smoke"
                - "release-critical"
                - "docs-check"
                - "bench-check"
                - "bench-replay"
              description: "The exact 0.7.10 artifact is locally qualified and release metadata is ready; publication remains a separate gated action."
              id: "release-readiness"
              required: true
            -
              check_ids:
                - "hosted-ci"
              description: "Required hosted CI and integration evidence must pass before merge."
              id: "hosted-integration"
              required: true
          evidence_fingerprint: "sha256:2d920f6ffc657ee4c5369ef0a5540a2ccf5917cff43eaec3b3211337d9049fd6"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "channel-tests"
                  description: "Stable aliases cannot move from a higher published SemVer line to a lower maintenance release."
                  id: "channel-order"
                  required: true
                -
                  check_ids:
                    - "retirement-map"
                  description: "Every active Blueprint field, writer, and consumer has a native owner, explicit cold-reader exception, or manual-conversion classification."
                  id: "owner-map"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/commands"
                required_sources:
                  - "scripts/release"
                  - ".github/workflows"
                  - "packages/agentplane/src/blueprints"
                  - "packages/recipes/src/manifest-contracts.ts"
                symbol_hints:
                  - "Blueprint"
                  - "stable"
                  - "dist-tag"
                  - "minor tag"
              depends_on: []
              expected_outputs:
                - "SemVer-aware release channel policy"
                - "Executable Blueprint retirement inventory guard"
                - "Native owner and compatibility map"
              id: "channel-and-owner-map"
              objective: "Implement SemVer-aware stable-channel promotion and freeze a field-by-field Blueprint retirement owner map covering active consumers, writers, obligations, and exact/manual Recipe mappings."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "scripts"
                - ".github/workflows"
                - "packages/agentplane/src/blueprints"
                - "packages/recipes/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/release/*.test.mjs"
                    id: "channel-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
                    id: "retirement-map"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "channel-tests"
                    description: "SemVer channel decisions are monotonic across release lines."
                    id: "channel-order"
                    required: true
                  -
                    check_ids:
                      - "retirement-map"
                    description: "The Blueprint retirement map is complete and machine-checked."
                    id: "owner-map"
                    required: true
                evidence_fingerprint: "sha256:811cfd69b61a0c97a874d9dd7d710fa94ec45f605ad42f33d3cb07fb304586b1"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "native-obligation-tests"
                  description: "Direct/branch, security, approval, review, stop, rollback, and evidence floors remain equal or stronger without Blueprint selection."
                  id: "native-parity"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 700000
                optional_sources:
                  - "packages/agentplane/src/blueprints"
                required_sources:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-centric"
                symbol_hints:
                  - "route decision"
                  - "policy modules"
                  - "capability"
                  - "quality review"
                  - "verification evidence"
              depends_on:
                - "channel-and-owner-map"
              expected_outputs:
                - "Blueprint-free route and authority decisions"
                - "Native lifecycle obligation enforcement"
                - "Parity tests for forbidden traces"
              id: "native-obligations"
              objective: "Move route floors, policy modules, capability admission, context budgets, protected approval/review, stop/rollback, and evidence minimums to their existing native owners without weakening mandatory stages."
              optional: false
              priority: 90
              required_inputs:
                - "Native owner and compatibility map"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/runtime"
                - "packages/agentplane/src/runner"
                - "packages/core/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1"
                    id: "native-obligation-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "native-obligation-tests"
                    description: "Native obligation parity and negative cases pass."
                    id: "native-parity"
                    required: true
                evidence_fingerprint: "sha256:81aaf3fc7b555152b32d9ab8063535a8ad83d3a62dbb5025c77af593ab3d5f0c"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "recipe-tests"
                  description: "Supported V1 recipes produce equivalent guidance, required evidence, assets, and route preferences without granting authority."
                  id: "recipe-parity"
                  required: true
                -
                  check_ids:
                    - "recipe-tests"
                  description: "Unknown custom nodes or constraints stop with exportable manual-conversion evidence."
                  id: "lossless-only"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources:
                  - "packages/agentplane/src/commands/blueprint"
                required_sources:
                  - "packages/recipes/src"
                  - "packages/agentplane/src/commands/recipes"
                  - "packages/agentplane/src/runner/context"
                symbol_hints:
                  - "preferred_blueprint"
                  - "context_hint"
                  - "output_schema"
                  - "artifact_template"
                  - "evidence_requirement"
                  - "check_suggestion"
                  - "risk_hint"
              depends_on:
                - "native-obligations"
              expected_outputs:
                - "Recipe V1 conversion rules"
                - "Manual-conversion diagnostics"
                - "Recipe parity and policy-floor tests"
              id: "recipe-v1-conversion"
              objective: "Convert supported Recipe V1 context, output, artifact, evidence, check, risk, and preferred Blueprint hints into exact existing Recipe/native surfaces; refuse lossy custom graph conversion."
              optional: false
              priority: 80
              required_inputs:
                - "Native owner and compatibility map"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/recipes/src"
                - "packages/agentplane/src/commands/recipes"
                - "packages/agentplane/src/runner/context"
                - "packages/agentplane/src/commands/blueprint"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1"
                    id: "recipe-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Exact Recipe V1 mappings retain requiredness and trust."
                    id: "recipe-parity"
                    required: true
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Lossy conversions are rejected."
                    id: "lossless-only"
                    required: true
                evidence_fingerprint: "sha256:e7cf3ee20ca293f6b0a45cb11d6ee4068987afd4838f6af8fb5ae5c1f1eeb6d2"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "identity-tests"
                  description: "Current verification and review evidence is bound to exact task, Plan, policy, implementation, and observed input identity without BlueprintSnapshotRef."
                  id: "identity-binding"
                  required: true
                -
                  check_ids:
                    - "identity-tests"
                  description: "Older v2-v4 inputs remain readable only under their original semantics."
                  id: "historical-read"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 800000
                optional_sources:
                  - "packages/agentplane/src/runner"
                required_sources:
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                  - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/evaluator"
                symbol_hints:
                  - "verification input"
                  - "state fingerprint"
                  - "BlueprintSnapshotRef"
                  - "quality identity"
                  - "ACR"
              depends_on:
                - "native-obligations"
              expected_outputs:
                - "Versioned verification-input v5"
                - "Blueprint-free current state fingerprints and WorkOrders"
                - "Migrated current consumers with old-format cold readers"
              id: "verification-identity"
              objective: "Introduce Blueprint-free verification-input v5 and state/WorkOrder identity, dual-read during cutover, then move freshness, finish, evaluator, quality, status, and ACR consumers to native Plan/policy/capability/check identities."
              optional: false
              priority: 80
              required_inputs:
                - "Native lifecycle obligation enforcement"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "repository"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/acr"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/acr"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1"
                    id: "identity-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Current identity and freshness consumers reject stale or cross-task evidence."
                    id: "identity-binding"
                    required: true
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Historical versions are decoded without reinterpretation."
                    id: "historical-read"
                    required: true
                evidence_fingerprint: "sha256:27206832a90725350c687e11e8650f7280aab2b6ca4e4cd4c0c054868e8b875d"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "migration-tests"
                  description: "Migration holds the common effect/result admission fence, rechecks quiescence, applies atomically, and preserves old bytes plus mapping receipt."
                  id: "fenced-migration"
                  required: true
                -
                  check_ids:
                    - "migration-tests"
                  description: "Historical evidence can be audited offline while missing bytes are reported and never regenerated."
                  id: "cold-audit"
                  required: true
                -
                  check_ids:
                    - "migration-tests"
                  description: "New tasks issue Blueprint-free bindings and unknown or unmigrated active records stop explicitly."
                  id: "explicit-cutover"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 800000
                optional_sources:
                  - "packages/core/src"
                required_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-lease.ts"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/blueprint"
                symbol_hints:
                  - "migration preview"
                  - "migration apply"
                  - "admission fence"
                  - "historical audit"
                  - "cutover"
              depends_on:
                - "recipe-v1-conversion"
                - "verification-identity"
              expected_outputs:
                - "Read-only migration preview"
                - "Atomic fenced migration with old/new receipt"
                - "Offline historical audit decoder"
                - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
              id: "migration-and-cutover"
              objective: "Add preview/apply retirement migration under the common admission fence, preserve original bytes and receipts, isolate the minimal historical decoder, and activate Blueprint-free issuance with typed old-record stops."
              optional: false
              priority: 70
              required_inputs:
                - "Recipe V1 conversion rules"
                - "Versioned verification-input v5"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/blueprint"
                - "packages/agentplane/src/runner"
                - "packages/core/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1"
                    id: "migration-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Concurrent effect/result admission cannot cross migration."
                    id: "fenced-migration"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Historical audit remains byte-faithful and offline."
                    id: "cold-audit"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Cutover is fail-closed for unsupported records."
                    id: "explicit-cutover"
                    required: true
                evidence_fingerprint: "sha256:9b86e176aee3435327477c087b6455d3f05b6d08e9909e8aea9bcfa352a4c0b5"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "no-engine"
                    - "no-cursor"
                    - "schema-assets"
                  description: "Ordinary, branch, Recipe V1, recovery, and evaluator paths import or write no active Blueprint engine, cursor, snapshot, plan, state, or prompt projection."
                  id: "zero-active-engine"
                  required: true
                -
                  check_ids:
                    - "no-engine"
                    - "schema-assets"
                  description: "Remaining Blueprint references are version-labelled documentation or explicit cold-reader exceptions and cannot execute workflows."
                  id: "cold-only"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1200000
                optional_sources:
                  - "packages/agentplane/assets"
                  - "docs"
                required_sources:
                  - "packages/agentplane/src"
                  - "packages/recipes/src"
                  - "scripts/generate"
                  - "scripts/checks"
                  - "schemas"
                symbol_hints:
                  - "Blueprint"
                  - "blueprint"
                  - "snapshot"
                  - "cursor"
                  - "resolved graph"
              depends_on:
                - "migration-and-cutover"
              expected_outputs:
                - "Zero active Blueprint artifacts and prompt inputs"
                - "No Blueprint mutation CLI or generated live schema"
                - "No active engine/cursor imports"
                - "Explicit cold-reader allowlist"
              id: "remove-active-blueprint"
              objective: "Remove Blueprint from model-visible context, stop current writers, retire mutation CLI and generated live assets, and delete the active registry, extension, graph-plan, and execution-state engine while retaining only the isolated cold decoder."
              optional: false
              priority: 60
              required_inputs:
                - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                - "Offline historical audit decoder"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "repository"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/schemas"
              risk: "high"
              scope_roots:
                - "docs"
                - "packages/agentplane/assets"
                - "packages/agentplane/src"
                - "packages/core/schemas"
                - "packages/core/src"
                - "packages/recipes/src"
                - "packages/spec/schemas"
                - "packages/testkit/src"
                - "schemas"
                - "scripts/checks"
                - "scripts/generate"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/checks/no-blueprint-engine.test.mjs"
                    id: "no-engine"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "node --test scripts/checks/no-blueprint-cursor.test.mjs"
                    id: "no-cursor"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run schemas:check && bun run agents:check && bun run docs:bootstrap:check"
                    id: "schema-assets"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "no-engine"
                      - "no-cursor"
                      - "schema-assets"
                    description: "Active engine, cursor, writer, CLI, and prompt surfaces are absent."
                    id: "zero-active-engine"
                    required: true
                  -
                    check_ids:
                      - "no-engine"
                      - "schema-assets"
                    description: "Only bounded historical decode remains."
                    id: "cold-only"
                    required: true
                evidence_fingerprint: "sha256:e1f5302117ad8c111f695d47289e1eff96382643614b5b1c8b34307570cdc679"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "install-smoke"
                    - "release-critical"
                    - "arch-check"
                  description: "Packed installed artifact passes direct, branch, context, recovery, Recipe V1, migration, historical audit, release-critical, and architecture checks."
                  id: "installed-qualification"
                  required: true
                -
                  check_ids:
                    - "ci-full"
                    - "docs-check"
                  description: "The repository full local CI and documentation checks pass with no unintended tracked or untracked artifacts."
                  id: "full-regression"
                  required: true
                -
                  check_ids:
                    - "bench-check"
                    - "bench-replay"
                  description: "Benchmark harness checks and replay pass; the result is ESTABLISHED only with matched paid .9/.10 evidence, otherwise explicitly NOT ESTABLISHED."
                  id: "m02-honesty"
                  required: true
                -
                  check_ids:
                    - "docs-check"
                    - "semantic-review"
                  description: "Version and docs describe the exact compatibility, migration, retired-command, cold-reader, lifecycle, and efficiency boundaries for 0.7.10."
                  id: "release-ready"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 700000
                optional_sources:
                  - "bun.lock"
                required_sources:
                  - "scripts/release"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs"
                  - "package.json"
                  - "packages/agentplane/package.json"
                  - ".github/workflows"
                symbol_hints:
                  - "0.7.10"
                  - "install smoke"
                  - "release critical"
                  - "M02"
                  - "compatibility"
              depends_on:
                - "remove-active-blueprint"
              expected_outputs:
                - "Installed-package and release-critical evidence"
                - "Full local regression evidence"
                - "M02 ESTABLISHED result or explicit NOT ESTABLISHED disposition"
                - "0.7.10 compatibility docs and release-ready metadata"
              id: "qualification-and-release-readiness"
              objective: "Qualify direct, branch, context, recovery, Recipe V1, migration, historical audit, and stable-channel behavior through the packed install; record honest M02 status; update compatibility documentation and 0.7.10 release metadata without publishing."
              optional: false
              priority: 50
              required_inputs:
                - "Zero active Blueprint artifacts and prompt inputs"
                - "No active engine/cursor imports"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "repository"
              risk: "high"
              scope_roots:
                - "scripts/release"
                - "scripts/checks"
                - "scripts/bench"
                - "docs"
                - "package.json"
                - "packages/agentplane/package.json"
                - "bun.lock"
                - ".github/workflows"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run package:install-smoke"
                    id: "install-smoke"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run test:release:critical"
                    id: "release-critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "arch-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "ci-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                    id: "docs-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:check"
                    id: "bench-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:replay:check"
                    id: "bench-replay"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    id: "semantic-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "install-smoke"
                      - "release-critical"
                      - "arch-check"
                    description: "The distributed artifact and critical paths pass."
                    id: "installed-qualification"
                    required: true
                  -
                    check_ids:
                      - "ci-full"
                      - "docs-check"
                    description: "Full local CI and docs pass."
                    id: "full-regression"
                    required: true
                  -
                    check_ids:
                      - "bench-check"
                      - "bench-replay"
                    description: "Benchmark support is valid and the verdict matches available evidence."
                    id: "m02-honesty"
                    required: true
                  -
                    check_ids:
                      - "docs-check"
                      - "semantic-review"
                    description: "0.7.10 metadata and documentation match implemented behavior."
                    id: "release-ready"
                    required: true
                evidence_fingerprint: "sha256:3b31cf8635263bdcba661a030258d6f4564d24bb94213b9a4a3b227c83f5939b"
                schema_version: 1
      revision: 5
      schema_version: 1
      task_id: "202609162254-YE48GC"
    event_cursor: 25
    final_validation: null
    id: "202609162254-YE48GC"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run arch:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run bench:agent-efficiency:check"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run bench:agent-efficiency:replay:check"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "bun run docs:bootstrap:check"
          id: "legacy-5"
          required: true
        -
          check_ids: []
          description: "bun run docs:onboarding:check"
          id: "legacy-6"
          required: true
        -
          check_ids: []
          description: "bun run package:install-smoke"
          id: "legacy-7"
          required: true
        -
          check_ids: []
          description: "bun run test:release:critical"
          id: "legacy-8"
          required: true
      captured_at: "2026-09-16T22:54:58.590Z"
      constraints: []
      request: |-
        Implement and qualify AgentPlane 0.7.10 Blueprint retirement

        Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
      task_id: "202609162254-YE48GC"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-16T23:01:48.151Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-16T23:00:20.179Z"
        digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
        proposal:
          assumptions:
            - "Current main at 19ff39fd292c30f0958131c35200a6268b7a285d is the accepted planning baseline."
            - "The existing Plan, native policy, capability, task-routing, verification, journal, Recipe V1, and task-state owners are retained; no replacement workflow engine is introduced."
            - "PLANNER and EVALUATOR remain mandatory wherever current policy requires them; Scenario V2 and lifecycle-owner convergence remain outside 0.7.10."
            - "Publication is performed only after this implementation task is merged and independently qualified under a separate release task and publish authority."
          planning_baseline:
            captured_at: "2026-09-16T22:55:54.740Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:518dc1dcc46175c0c4b1160f3cc6f80d277a47f1bfc09656aa14e9d4303b44e6"
            dirty_paths:
              - ".agentplane/tasks/202609162254-YE48GC/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609162254-YE48GC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "ci-full"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run package:install-smoke"
                id: "install-smoke"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run test:release:critical"
                id: "release-critical"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "arch-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                id: "docs-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:check"
                id: "bench-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:replay:check"
                id: "bench-replay"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                id: "semantic-review"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-ci"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "ci-full"
                  - "install-smoke"
                  - "release-critical"
                  - "arch-check"
                  - "semantic-review"
                description: "Blueprint is absent from active execution and model-visible context while current lifecycle, authority, verification, Recipe V1, recovery, and historical audit obligations remain enforced."
                id: "task-outcome"
                required: true
              -
                check_ids:
                  - "install-smoke"
                  - "release-critical"
                  - "docs-check"
                  - "bench-check"
                  - "bench-replay"
                description: "The exact 0.7.10 artifact is locally qualified and release metadata is ready; publication remains a separate gated action."
                id: "release-readiness"
                required: true
              -
                check_ids:
                  - "hosted-ci"
                description: "Required hosted CI and integration evidence must pass before merge."
                id: "hosted-integration"
                required: true
            evidence_fingerprint: "sha256:2d920f6ffc657ee4c5369ef0a5540a2ccf5917cff43eaec3b3211337d9049fd6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "channel-tests"
                    description: "Stable aliases cannot move from a higher published SemVer line to a lower maintenance release."
                    id: "channel-order"
                    required: true
                  -
                    check_ids:
                      - "retirement-map"
                    description: "Every active Blueprint field, writer, and consumer has a native owner, explicit cold-reader exception, or manual-conversion classification."
                    id: "owner-map"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 300000
                  optional_sources:
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/commands"
                  required_sources:
                    - "scripts/release"
                    - ".github/workflows"
                    - "packages/agentplane/src/blueprints"
                    - "packages/recipes/src/manifest-contracts.ts"
                  symbol_hints:
                    - "Blueprint"
                    - "stable"
                    - "dist-tag"
                    - "minor tag"
                depends_on: []
                expected_outputs:
                  - "SemVer-aware release channel policy"
                  - "Executable Blueprint retirement inventory guard"
                  - "Native owner and compatibility map"
                id: "channel-and-owner-map"
                objective: "Implement SemVer-aware stable-channel promotion and freeze a field-by-field Blueprint retirement owner map covering active consumers, writers, obligations, and exact/manual Recipe mappings."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts"
                  - ".github/workflows"
                  - "packages/agentplane/src/blueprints"
                  - "packages/recipes/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/release/*.test.mjs"
                      id: "channel-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
                      id: "retirement-map"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "channel-tests"
                      description: "SemVer channel decisions are monotonic across release lines."
                      id: "channel-order"
                      required: true
                    -
                      check_ids:
                        - "retirement-map"
                      description: "The Blueprint retirement map is complete and machine-checked."
                      id: "owner-map"
                      required: true
                  evidence_fingerprint: "sha256:811cfd69b61a0c97a874d9dd7d710fa94ec45f605ad42f33d3cb07fb304586b1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "native-obligation-tests"
                    description: "Direct/branch, security, approval, review, stop, rollback, and evidence floors remain equal or stronger without Blueprint selection."
                    id: "native-parity"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "packages/agentplane/src/blueprints"
                  required_sources:
                    - "packages/agentplane/src/commands/shared"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/runner"
                    - "packages/core/src/tasks/task-centric"
                  symbol_hints:
                    - "route decision"
                    - "policy modules"
                    - "capability"
                    - "quality review"
                    - "verification evidence"
                depends_on:
                  - "channel-and-owner-map"
                expected_outputs:
                  - "Blueprint-free route and authority decisions"
                  - "Native lifecycle obligation enforcement"
                  - "Parity tests for forbidden traces"
                id: "native-obligations"
                objective: "Move route floors, policy modules, capability admission, context budgets, protected approval/review, stop/rollback, and evidence minimums to their existing native owners without weakening mandatory stages."
                optional: false
                priority: 90
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "native-obligation-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "native-obligation-tests"
                      description: "Native obligation parity and negative cases pass."
                      id: "native-parity"
                      required: true
                  evidence_fingerprint: "sha256:81aaf3fc7b555152b32d9ab8063535a8ad83d3a62dbb5025c77af593ab3d5f0c"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Supported V1 recipes produce equivalent guidance, required evidence, assets, and route preferences without granting authority."
                    id: "recipe-parity"
                    required: true
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Unknown custom nodes or constraints stop with exportable manual-conversion evidence."
                    id: "lossless-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "packages/agentplane/src/commands/blueprint"
                  required_sources:
                    - "packages/recipes/src"
                    - "packages/agentplane/src/commands/recipes"
                    - "packages/agentplane/src/runner/context"
                  symbol_hints:
                    - "preferred_blueprint"
                    - "context_hint"
                    - "output_schema"
                    - "artifact_template"
                    - "evidence_requirement"
                    - "check_suggestion"
                    - "risk_hint"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Recipe V1 conversion rules"
                  - "Manual-conversion diagnostics"
                  - "Recipe parity and policy-floor tests"
                id: "recipe-v1-conversion"
                objective: "Convert supported Recipe V1 context, output, artifact, evidence, check, risk, and preferred Blueprint hints into exact existing Recipe/native surfaces; refuse lossy custom graph conversion."
                optional: false
                priority: 80
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/recipes/src"
                  - "packages/agentplane/src/commands/recipes"
                  - "packages/agentplane/src/runner/context"
                  - "packages/agentplane/src/commands/blueprint"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1"
                      id: "recipe-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Exact Recipe V1 mappings retain requiredness and trust."
                      id: "recipe-parity"
                      required: true
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Lossy conversions are rejected."
                      id: "lossless-only"
                      required: true
                  evidence_fingerprint: "sha256:e7cf3ee20ca293f6b0a45cb11d6ee4068987afd4838f6af8fb5ae5c1f1eeb6d2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Current verification and review evidence is bound to exact task, Plan, policy, implementation, and observed input identity without BlueprintSnapshotRef."
                    id: "identity-binding"
                    required: true
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Older v2-v4 inputs remain readable only under their original semantics."
                    id: "historical-read"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/agentplane/src/runner"
                  required_sources:
                    - "packages/core/src/runner"
                    - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                    - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/evaluator"
                  symbol_hints:
                    - "verification input"
                    - "state fingerprint"
                    - "BlueprintSnapshotRef"
                    - "quality identity"
                    - "ACR"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Versioned verification-input v5"
                  - "Blueprint-free current state fingerprints and WorkOrders"
                  - "Migrated current consumers with old-format cold readers"
                id: "verification-identity"
                objective: "Introduce Blueprint-free verification-input v5 and state/WorkOrder identity, dual-read during cutover, then move freshness, finish, evaluator, quality, status, and ACR consumers to native Plan/policy/capability/check identities."
                optional: false
                priority: 80
                required_inputs:
                  - "Native lifecycle obligation enforcement"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/runner"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "identity-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Current identity and freshness consumers reject stale or cross-task evidence."
                      id: "identity-binding"
                      required: true
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Historical versions are decoded without reinterpretation."
                      id: "historical-read"
                      required: true
                  evidence_fingerprint: "sha256:27206832a90725350c687e11e8650f7280aab2b6ca4e4cd4c0c054868e8b875d"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Migration holds the common effect/result admission fence, rechecks quiescence, applies atomically, and preserves old bytes plus mapping receipt."
                    id: "fenced-migration"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Historical evidence can be audited offline while missing bytes are reported and never regenerated."
                    id: "cold-audit"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "New tasks issue Blueprint-free bindings and unknown or unmigrated active records stop explicitly."
                    id: "explicit-cutover"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/core/src"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                    - "packages/agentplane/src/commands/shared/supervisor-execution-lease.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/blueprint"
                  symbol_hints:
                    - "migration preview"
                    - "migration apply"
                    - "admission fence"
                    - "historical audit"
                    - "cutover"
                depends_on:
                  - "recipe-v1-conversion"
                  - "verification-identity"
                expected_outputs:
                  - "Read-only migration preview"
                  - "Atomic fenced migration with old/new receipt"
                  - "Offline historical audit decoder"
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                id: "migration-and-cutover"
                objective: "Add preview/apply retirement migration under the common admission fence, preserve original bytes and receipts, isolate the minimal historical decoder, and activate Blueprint-free issuance with typed old-record stops."
                optional: false
                priority: 70
                required_inputs:
                  - "Recipe V1 conversion rules"
                  - "Versioned verification-input v5"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/blueprint"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "migration-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Concurrent effect/result admission cannot cross migration."
                      id: "fenced-migration"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Historical audit remains byte-faithful and offline."
                      id: "cold-audit"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Cutover is fail-closed for unsupported records."
                      id: "explicit-cutover"
                      required: true
                  evidence_fingerprint: "sha256:9b86e176aee3435327477c087b6455d3f05b6d08e9909e8aea9bcfa352a4c0b5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "no-engine"
                      - "no-cursor"
                      - "schema-assets"
                    description: "Ordinary, branch, Recipe V1, recovery, and evaluator paths import or write no active Blueprint engine, cursor, snapshot, plan, state, or prompt projection."
                    id: "zero-active-engine"
                    required: true
                  -
                    check_ids:
                      - "no-engine"
                      - "schema-assets"
                    description: "Remaining Blueprint references are version-labelled documentation or explicit cold-reader exceptions and cannot execute workflows."
                    id: "cold-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1200000
                  optional_sources:
                    - "packages/agentplane/assets"
                    - "docs"
                  required_sources:
                    - "packages/agentplane/src"
                    - "packages/recipes/src"
                    - "scripts/generate"
                    - "scripts/checks"
                    - "schemas"
                  symbol_hints:
                    - "Blueprint"
                    - "blueprint"
                    - "snapshot"
                    - "cursor"
                    - "resolved graph"
                depends_on:
                  - "migration-and-cutover"
                expected_outputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No Blueprint mutation CLI or generated live schema"
                  - "No active engine/cursor imports"
                  - "Explicit cold-reader allowlist"
                id: "remove-active-blueprint"
                objective: "Remove Blueprint from model-visible context, stop current writers, retire mutation CLI and generated live assets, and delete the active registry, extension, graph-plan, and execution-state engine while retaining only the isolated cold decoder."
                optional: false
                priority: 60
                required_inputs:
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                  - "Offline historical audit decoder"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src"
                  - "packages/agentplane/assets"
                  - "packages/recipes/src"
                  - "scripts/generate"
                  - "scripts/checks"
                  - "schemas"
                  - "docs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-engine.test.mjs"
                      id: "no-engine"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-cursor.test.mjs"
                      id: "no-cursor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run schemas:check && bun run agents:check && bun run docs:bootstrap:check"
                      id: "schema-assets"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "no-engine"
                        - "no-cursor"
                        - "schema-assets"
                      description: "Active engine, cursor, writer, CLI, and prompt surfaces are absent."
                      id: "zero-active-engine"
                      required: true
                    -
                      check_ids:
                        - "no-engine"
                        - "schema-assets"
                      description: "Only bounded historical decode remains."
                      id: "cold-only"
                      required: true
                  evidence_fingerprint: "sha256:e1f5302117ad8c111f695d47289e1eff96382643614b5b1c8b34307570cdc679"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "install-smoke"
                      - "release-critical"
                      - "arch-check"
                    description: "Packed installed artifact passes direct, branch, context, recovery, Recipe V1, migration, historical audit, release-critical, and architecture checks."
                    id: "installed-qualification"
                    required: true
                  -
                    check_ids:
                      - "ci-full"
                      - "docs-check"
                    description: "The repository full local CI and documentation checks pass with no unintended tracked or untracked artifacts."
                    id: "full-regression"
                    required: true
                  -
                    check_ids:
                      - "bench-check"
                      - "bench-replay"
                    description: "Benchmark harness checks and replay pass; the result is ESTABLISHED only with matched paid .9/.10 evidence, otherwise explicitly NOT ESTABLISHED."
                    id: "m02-honesty"
                    required: true
                  -
                    check_ids:
                      - "docs-check"
                      - "semantic-review"
                    description: "Version and docs describe the exact compatibility, migration, retired-command, cold-reader, lifecycle, and efficiency boundaries for 0.7.10."
                    id: "release-ready"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "bun.lock"
                  required_sources:
                    - "scripts/release"
                    - "scripts/checks"
                    - "scripts/bench"
                    - "docs"
                    - "package.json"
                    - "packages/agentplane/package.json"
                    - ".github/workflows"
                  symbol_hints:
                    - "0.7.10"
                    - "install smoke"
                    - "release critical"
                    - "M02"
                    - "compatibility"
                depends_on:
                  - "remove-active-blueprint"
                expected_outputs:
                  - "Installed-package and release-critical evidence"
                  - "Full local regression evidence"
                  - "M02 ESTABLISHED result or explicit NOT ESTABLISHED disposition"
                  - "0.7.10 compatibility docs and release-ready metadata"
                id: "qualification-and-release-readiness"
                objective: "Qualify direct, branch, context, recovery, Recipe V1, migration, historical audit, and stable-channel behavior through the packed install; record honest M02 status; update compatibility documentation and 0.7.10 release metadata without publishing."
                optional: false
                priority: 50
                required_inputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No active engine/cursor imports"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts/release"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs"
                  - "package.json"
                  - "packages/agentplane/package.json"
                  - "bun.lock"
                  - ".github/workflows"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run package:install-smoke"
                      id: "install-smoke"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run test:release:critical"
                      id: "release-critical"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "arch-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "ci-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                      id: "docs-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:check"
                      id: "bench-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:replay:check"
                      id: "bench-replay"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      id: "semantic-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "install-smoke"
                        - "release-critical"
                        - "arch-check"
                      description: "The distributed artifact and critical paths pass."
                      id: "installed-qualification"
                      required: true
                    -
                      check_ids:
                        - "ci-full"
                        - "docs-check"
                      description: "Full local CI and docs pass."
                      id: "full-regression"
                      required: true
                    -
                      check_ids:
                        - "bench-check"
                        - "bench-replay"
                      description: "Benchmark support is valid and the verdict matches available evidence."
                      id: "m02-honesty"
                      required: true
                    -
                      check_ids:
                        - "docs-check"
                        - "semantic-review"
                      description: "0.7.10 metadata and documentation match implemented behavior."
                      id: "release-ready"
                      required: true
                  evidence_fingerprint: "sha256:3b31cf8635263bdcba661a030258d6f4564d24bb94213b9a4a3b227c83f5939b"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609162254-YE48GC"
      -
        approval:
          approved_at: "2026-09-17T07:45:50.069Z"
          approved_by: "USER"
          approved_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          policy_facts:
            - "state_bound_scope_extension:sha256:08cf3a2c20c4337b82fcf6eb7ccd65f2dbba5550eee2b86a74514603b4c95d10"
          state: "approved"
        created_at: "2026-09-17T07:45:50.069Z"
        digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
        proposal:
          assumptions:
            - "Current main at 19ff39fd292c30f0958131c35200a6268b7a285d is the accepted planning baseline."
            - "The existing Plan, native policy, capability, task-routing, verification, journal, Recipe V1, and task-state owners are retained; no replacement workflow engine is introduced."
            - "PLANNER and EVALUATOR remain mandatory wherever current policy requires them; Scenario V2 and lifecycle-owner convergence remain outside 0.7.10."
            - "Publication is performed only after this implementation task is merged and independently qualified under a separate release task and publish authority."
          planning_baseline:
            captured_at: "2026-09-16T22:55:54.740Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:518dc1dcc46175c0c4b1160f3cc6f80d277a47f1bfc09656aa14e9d4303b44e6"
            dirty_paths:
              - ".agentplane/tasks/202609162254-YE48GC/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609162254-YE48GC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "ci-full"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run package:install-smoke"
                id: "install-smoke"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run test:release:critical"
                id: "release-critical"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "arch-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                id: "docs-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:check"
                id: "bench-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:replay:check"
                id: "bench-replay"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                id: "semantic-review"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-ci"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "ci-full"
                  - "install-smoke"
                  - "release-critical"
                  - "arch-check"
                  - "semantic-review"
                description: "Blueprint is absent from active execution and model-visible context while current lifecycle, authority, verification, Recipe V1, recovery, and historical audit obligations remain enforced."
                id: "task-outcome"
                required: true
              -
                check_ids:
                  - "install-smoke"
                  - "release-critical"
                  - "docs-check"
                  - "bench-check"
                  - "bench-replay"
                description: "The exact 0.7.10 artifact is locally qualified and release metadata is ready; publication remains a separate gated action."
                id: "release-readiness"
                required: true
              -
                check_ids:
                  - "hosted-ci"
                description: "Required hosted CI and integration evidence must pass before merge."
                id: "hosted-integration"
                required: true
            evidence_fingerprint: "sha256:2d920f6ffc657ee4c5369ef0a5540a2ccf5917cff43eaec3b3211337d9049fd6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "channel-tests"
                    description: "Stable aliases cannot move from a higher published SemVer line to a lower maintenance release."
                    id: "channel-order"
                    required: true
                  -
                    check_ids:
                      - "retirement-map"
                    description: "Every active Blueprint field, writer, and consumer has a native owner, explicit cold-reader exception, or manual-conversion classification."
                    id: "owner-map"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 300000
                  optional_sources:
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/commands"
                  required_sources:
                    - "scripts/release"
                    - ".github/workflows"
                    - "packages/agentplane/src/blueprints"
                    - "packages/recipes/src/manifest-contracts.ts"
                  symbol_hints:
                    - "Blueprint"
                    - "stable"
                    - "dist-tag"
                    - "minor tag"
                depends_on: []
                expected_outputs:
                  - "SemVer-aware release channel policy"
                  - "Executable Blueprint retirement inventory guard"
                  - "Native owner and compatibility map"
                id: "channel-and-owner-map"
                objective: "Implement SemVer-aware stable-channel promotion and freeze a field-by-field Blueprint retirement owner map covering active consumers, writers, obligations, and exact/manual Recipe mappings."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts"
                  - ".github/workflows"
                  - "packages/agentplane/src/blueprints"
                  - "packages/recipes/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/release/*.test.mjs"
                      id: "channel-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
                      id: "retirement-map"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "channel-tests"
                      description: "SemVer channel decisions are monotonic across release lines."
                      id: "channel-order"
                      required: true
                    -
                      check_ids:
                        - "retirement-map"
                      description: "The Blueprint retirement map is complete and machine-checked."
                      id: "owner-map"
                      required: true
                  evidence_fingerprint: "sha256:811cfd69b61a0c97a874d9dd7d710fa94ec45f605ad42f33d3cb07fb304586b1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "native-obligation-tests"
                    description: "Direct/branch, security, approval, review, stop, rollback, and evidence floors remain equal or stronger without Blueprint selection."
                    id: "native-parity"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "packages/agentplane/src/blueprints"
                  required_sources:
                    - "packages/agentplane/src/commands/shared"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/runner"
                    - "packages/core/src/tasks/task-centric"
                  symbol_hints:
                    - "route decision"
                    - "policy modules"
                    - "capability"
                    - "quality review"
                    - "verification evidence"
                depends_on:
                  - "channel-and-owner-map"
                expected_outputs:
                  - "Blueprint-free route and authority decisions"
                  - "Native lifecycle obligation enforcement"
                  - "Parity tests for forbidden traces"
                id: "native-obligations"
                objective: "Move route floors, policy modules, capability admission, context budgets, protected approval/review, stop/rollback, and evidence minimums to their existing native owners without weakening mandatory stages."
                optional: false
                priority: 90
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "native-obligation-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "native-obligation-tests"
                      description: "Native obligation parity and negative cases pass."
                      id: "native-parity"
                      required: true
                  evidence_fingerprint: "sha256:81aaf3fc7b555152b32d9ab8063535a8ad83d3a62dbb5025c77af593ab3d5f0c"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Supported V1 recipes produce equivalent guidance, required evidence, assets, and route preferences without granting authority."
                    id: "recipe-parity"
                    required: true
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Unknown custom nodes or constraints stop with exportable manual-conversion evidence."
                    id: "lossless-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "packages/agentplane/src/commands/blueprint"
                  required_sources:
                    - "packages/recipes/src"
                    - "packages/agentplane/src/commands/recipes"
                    - "packages/agentplane/src/runner/context"
                  symbol_hints:
                    - "preferred_blueprint"
                    - "context_hint"
                    - "output_schema"
                    - "artifact_template"
                    - "evidence_requirement"
                    - "check_suggestion"
                    - "risk_hint"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Recipe V1 conversion rules"
                  - "Manual-conversion diagnostics"
                  - "Recipe parity and policy-floor tests"
                id: "recipe-v1-conversion"
                objective: "Convert supported Recipe V1 context, output, artifact, evidence, check, risk, and preferred Blueprint hints into exact existing Recipe/native surfaces; refuse lossy custom graph conversion."
                optional: false
                priority: 80
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/recipes/src"
                  - "packages/agentplane/src/commands/recipes"
                  - "packages/agentplane/src/runner/context"
                  - "packages/agentplane/src/commands/blueprint"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1"
                      id: "recipe-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Exact Recipe V1 mappings retain requiredness and trust."
                      id: "recipe-parity"
                      required: true
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Lossy conversions are rejected."
                      id: "lossless-only"
                      required: true
                  evidence_fingerprint: "sha256:e7cf3ee20ca293f6b0a45cb11d6ee4068987afd4838f6af8fb5ae5c1f1eeb6d2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Current verification and review evidence is bound to exact task, Plan, policy, implementation, and observed input identity without BlueprintSnapshotRef."
                    id: "identity-binding"
                    required: true
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Older v2-v4 inputs remain readable only under their original semantics."
                    id: "historical-read"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/agentplane/src/runner"
                  required_sources:
                    - "packages/core/src/runner"
                    - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                    - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/evaluator"
                  symbol_hints:
                    - "verification input"
                    - "state fingerprint"
                    - "BlueprintSnapshotRef"
                    - "quality identity"
                    - "ACR"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Versioned verification-input v5"
                  - "Blueprint-free current state fingerprints and WorkOrders"
                  - "Migrated current consumers with old-format cold readers"
                id: "verification-identity"
                objective: "Introduce Blueprint-free verification-input v5 and state/WorkOrder identity, dual-read during cutover, then move freshness, finish, evaluator, quality, status, and ACR consumers to native Plan/policy/capability/check identities."
                optional: false
                priority: 80
                required_inputs:
                  - "Native lifecycle obligation enforcement"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/acr"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/acr"
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "identity-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Current identity and freshness consumers reject stale or cross-task evidence."
                      id: "identity-binding"
                      required: true
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Historical versions are decoded without reinterpretation."
                      id: "historical-read"
                      required: true
                  evidence_fingerprint: "sha256:27206832a90725350c687e11e8650f7280aab2b6ca4e4cd4c0c054868e8b875d"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Migration holds the common effect/result admission fence, rechecks quiescence, applies atomically, and preserves old bytes plus mapping receipt."
                    id: "fenced-migration"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Historical evidence can be audited offline while missing bytes are reported and never regenerated."
                    id: "cold-audit"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "New tasks issue Blueprint-free bindings and unknown or unmigrated active records stop explicitly."
                    id: "explicit-cutover"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/core/src"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                    - "packages/agentplane/src/commands/shared/supervisor-execution-lease.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/blueprint"
                  symbol_hints:
                    - "migration preview"
                    - "migration apply"
                    - "admission fence"
                    - "historical audit"
                    - "cutover"
                depends_on:
                  - "recipe-v1-conversion"
                  - "verification-identity"
                expected_outputs:
                  - "Read-only migration preview"
                  - "Atomic fenced migration with old/new receipt"
                  - "Offline historical audit decoder"
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                id: "migration-and-cutover"
                objective: "Add preview/apply retirement migration under the common admission fence, preserve original bytes and receipts, isolate the minimal historical decoder, and activate Blueprint-free issuance with typed old-record stops."
                optional: false
                priority: 70
                required_inputs:
                  - "Recipe V1 conversion rules"
                  - "Versioned verification-input v5"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/blueprint"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "migration-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Concurrent effect/result admission cannot cross migration."
                      id: "fenced-migration"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Historical audit remains byte-faithful and offline."
                      id: "cold-audit"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Cutover is fail-closed for unsupported records."
                      id: "explicit-cutover"
                      required: true
                  evidence_fingerprint: "sha256:9b86e176aee3435327477c087b6455d3f05b6d08e9909e8aea9bcfa352a4c0b5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "no-engine"
                      - "no-cursor"
                      - "schema-assets"
                    description: "Ordinary, branch, Recipe V1, recovery, and evaluator paths import or write no active Blueprint engine, cursor, snapshot, plan, state, or prompt projection."
                    id: "zero-active-engine"
                    required: true
                  -
                    check_ids:
                      - "no-engine"
                      - "schema-assets"
                    description: "Remaining Blueprint references are version-labelled documentation or explicit cold-reader exceptions and cannot execute workflows."
                    id: "cold-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1200000
                  optional_sources:
                    - "packages/agentplane/assets"
                    - "docs"
                  required_sources:
                    - "packages/agentplane/src"
                    - "packages/recipes/src"
                    - "scripts/generate"
                    - "scripts/checks"
                    - "schemas"
                  symbol_hints:
                    - "Blueprint"
                    - "blueprint"
                    - "snapshot"
                    - "cursor"
                    - "resolved graph"
                depends_on:
                  - "migration-and-cutover"
                expected_outputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No Blueprint mutation CLI or generated live schema"
                  - "No active engine/cursor imports"
                  - "Explicit cold-reader allowlist"
                id: "remove-active-blueprint"
                objective: "Remove Blueprint from model-visible context, stop current writers, retire mutation CLI and generated live assets, and delete the active registry, extension, graph-plan, and execution-state engine while retaining only the isolated cold decoder."
                optional: false
                priority: 60
                required_inputs:
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                  - "Offline historical audit decoder"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src"
                  - "packages/agentplane/assets"
                  - "packages/recipes/src"
                  - "scripts/generate"
                  - "scripts/checks"
                  - "schemas"
                  - "docs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-engine.test.mjs"
                      id: "no-engine"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-cursor.test.mjs"
                      id: "no-cursor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run schemas:check && bun run agents:check && bun run docs:bootstrap:check"
                      id: "schema-assets"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "no-engine"
                        - "no-cursor"
                        - "schema-assets"
                      description: "Active engine, cursor, writer, CLI, and prompt surfaces are absent."
                      id: "zero-active-engine"
                      required: true
                    -
                      check_ids:
                        - "no-engine"
                        - "schema-assets"
                      description: "Only bounded historical decode remains."
                      id: "cold-only"
                      required: true
                  evidence_fingerprint: "sha256:e1f5302117ad8c111f695d47289e1eff96382643614b5b1c8b34307570cdc679"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "install-smoke"
                      - "release-critical"
                      - "arch-check"
                    description: "Packed installed artifact passes direct, branch, context, recovery, Recipe V1, migration, historical audit, release-critical, and architecture checks."
                    id: "installed-qualification"
                    required: true
                  -
                    check_ids:
                      - "ci-full"
                      - "docs-check"
                    description: "The repository full local CI and documentation checks pass with no unintended tracked or untracked artifacts."
                    id: "full-regression"
                    required: true
                  -
                    check_ids:
                      - "bench-check"
                      - "bench-replay"
                    description: "Benchmark harness checks and replay pass; the result is ESTABLISHED only with matched paid .9/.10 evidence, otherwise explicitly NOT ESTABLISHED."
                    id: "m02-honesty"
                    required: true
                  -
                    check_ids:
                      - "docs-check"
                      - "semantic-review"
                    description: "Version and docs describe the exact compatibility, migration, retired-command, cold-reader, lifecycle, and efficiency boundaries for 0.7.10."
                    id: "release-ready"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "bun.lock"
                  required_sources:
                    - "scripts/release"
                    - "scripts/checks"
                    - "scripts/bench"
                    - "docs"
                    - "package.json"
                    - "packages/agentplane/package.json"
                    - ".github/workflows"
                  symbol_hints:
                    - "0.7.10"
                    - "install smoke"
                    - "release critical"
                    - "M02"
                    - "compatibility"
                depends_on:
                  - "remove-active-blueprint"
                expected_outputs:
                  - "Installed-package and release-critical evidence"
                  - "Full local regression evidence"
                  - "M02 ESTABLISHED result or explicit NOT ESTABLISHED disposition"
                  - "0.7.10 compatibility docs and release-ready metadata"
                id: "qualification-and-release-readiness"
                objective: "Qualify direct, branch, context, recovery, Recipe V1, migration, historical audit, and stable-channel behavior through the packed install; record honest M02 status; update compatibility documentation and 0.7.10 release metadata without publishing."
                optional: false
                priority: 50
                required_inputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No active engine/cursor imports"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts/release"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs"
                  - "package.json"
                  - "packages/agentplane/package.json"
                  - "bun.lock"
                  - ".github/workflows"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run package:install-smoke"
                      id: "install-smoke"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run test:release:critical"
                      id: "release-critical"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "arch-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "ci-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                      id: "docs-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:check"
                      id: "bench-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:replay:check"
                      id: "bench-replay"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      id: "semantic-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "install-smoke"
                        - "release-critical"
                        - "arch-check"
                      description: "The distributed artifact and critical paths pass."
                      id: "installed-qualification"
                      required: true
                    -
                      check_ids:
                        - "ci-full"
                        - "docs-check"
                      description: "Full local CI and docs pass."
                      id: "full-regression"
                      required: true
                    -
                      check_ids:
                        - "bench-check"
                        - "bench-replay"
                      description: "Benchmark support is valid and the verdict matches available evidence."
                      id: "m02-honesty"
                      required: true
                    -
                      check_ids:
                        - "docs-check"
                        - "semantic-review"
                      description: "0.7.10 metadata and documentation match implemented behavior."
                      id: "release-ready"
                      required: true
                  evidence_fingerprint: "sha256:3b31cf8635263bdcba661a030258d6f4564d24bb94213b9a4a3b227c83f5939b"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609162254-YE48GC"
      -
        approval:
          approved_at: "2026-09-17T11:34:42.422Z"
          approved_by: "USER"
          approved_digest: "sha256:7bca7888a0204117a2799fbdc622e9f3a0f56e7819f7b5a6b814ba5cfdbfec22"
          policy_facts:
            - "state_bound_scope_extension:sha256:7f402dbd397e13ced113379d94e1ab5cf28e303e5f183692e80beb45968d3004"
          state: "approved"
        created_at: "2026-09-17T11:34:42.422Z"
        digest: "sha256:7bca7888a0204117a2799fbdc622e9f3a0f56e7819f7b5a6b814ba5cfdbfec22"
        proposal:
          assumptions:
            - "Current main at 19ff39fd292c30f0958131c35200a6268b7a285d is the accepted planning baseline."
            - "The existing Plan, native policy, capability, task-routing, verification, journal, Recipe V1, and task-state owners are retained; no replacement workflow engine is introduced."
            - "PLANNER and EVALUATOR remain mandatory wherever current policy requires them; Scenario V2 and lifecycle-owner convergence remain outside 0.7.10."
            - "Publication is performed only after this implementation task is merged and independently qualified under a separate release task and publish authority."
          planning_baseline:
            captured_at: "2026-09-16T22:55:54.740Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:518dc1dcc46175c0c4b1160f3cc6f80d277a47f1bfc09656aa14e9d4303b44e6"
            dirty_paths:
              - ".agentplane/tasks/202609162254-YE48GC/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609162254-YE48GC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "ci-full"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run package:install-smoke"
                id: "install-smoke"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run test:release:critical"
                id: "release-critical"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "arch-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                id: "docs-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:check"
                id: "bench-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:replay:check"
                id: "bench-replay"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                id: "semantic-review"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-ci"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "ci-full"
                  - "install-smoke"
                  - "release-critical"
                  - "arch-check"
                  - "semantic-review"
                description: "Blueprint is absent from active execution and model-visible context while current lifecycle, authority, verification, Recipe V1, recovery, and historical audit obligations remain enforced."
                id: "task-outcome"
                required: true
              -
                check_ids:
                  - "install-smoke"
                  - "release-critical"
                  - "docs-check"
                  - "bench-check"
                  - "bench-replay"
                description: "The exact 0.7.10 artifact is locally qualified and release metadata is ready; publication remains a separate gated action."
                id: "release-readiness"
                required: true
              -
                check_ids:
                  - "hosted-ci"
                description: "Required hosted CI and integration evidence must pass before merge."
                id: "hosted-integration"
                required: true
            evidence_fingerprint: "sha256:2d920f6ffc657ee4c5369ef0a5540a2ccf5917cff43eaec3b3211337d9049fd6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "channel-tests"
                    description: "Stable aliases cannot move from a higher published SemVer line to a lower maintenance release."
                    id: "channel-order"
                    required: true
                  -
                    check_ids:
                      - "retirement-map"
                    description: "Every active Blueprint field, writer, and consumer has a native owner, explicit cold-reader exception, or manual-conversion classification."
                    id: "owner-map"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 300000
                  optional_sources:
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/commands"
                  required_sources:
                    - "scripts/release"
                    - ".github/workflows"
                    - "packages/agentplane/src/blueprints"
                    - "packages/recipes/src/manifest-contracts.ts"
                  symbol_hints:
                    - "Blueprint"
                    - "stable"
                    - "dist-tag"
                    - "minor tag"
                depends_on: []
                expected_outputs:
                  - "SemVer-aware release channel policy"
                  - "Executable Blueprint retirement inventory guard"
                  - "Native owner and compatibility map"
                id: "channel-and-owner-map"
                objective: "Implement SemVer-aware stable-channel promotion and freeze a field-by-field Blueprint retirement owner map covering active consumers, writers, obligations, and exact/manual Recipe mappings."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts"
                  - ".github/workflows"
                  - "packages/agentplane/src/blueprints"
                  - "packages/recipes/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/release/*.test.mjs"
                      id: "channel-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
                      id: "retirement-map"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "channel-tests"
                      description: "SemVer channel decisions are monotonic across release lines."
                      id: "channel-order"
                      required: true
                    -
                      check_ids:
                        - "retirement-map"
                      description: "The Blueprint retirement map is complete and machine-checked."
                      id: "owner-map"
                      required: true
                  evidence_fingerprint: "sha256:811cfd69b61a0c97a874d9dd7d710fa94ec45f605ad42f33d3cb07fb304586b1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "native-obligation-tests"
                    description: "Direct/branch, security, approval, review, stop, rollback, and evidence floors remain equal or stronger without Blueprint selection."
                    id: "native-parity"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "packages/agentplane/src/blueprints"
                  required_sources:
                    - "packages/agentplane/src/commands/shared"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/runner"
                    - "packages/core/src/tasks/task-centric"
                  symbol_hints:
                    - "route decision"
                    - "policy modules"
                    - "capability"
                    - "quality review"
                    - "verification evidence"
                depends_on:
                  - "channel-and-owner-map"
                expected_outputs:
                  - "Blueprint-free route and authority decisions"
                  - "Native lifecycle obligation enforcement"
                  - "Parity tests for forbidden traces"
                id: "native-obligations"
                objective: "Move route floors, policy modules, capability admission, context budgets, protected approval/review, stop/rollback, and evidence minimums to their existing native owners without weakening mandatory stages."
                optional: false
                priority: 90
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "native-obligation-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "native-obligation-tests"
                      description: "Native obligation parity and negative cases pass."
                      id: "native-parity"
                      required: true
                  evidence_fingerprint: "sha256:81aaf3fc7b555152b32d9ab8063535a8ad83d3a62dbb5025c77af593ab3d5f0c"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Supported V1 recipes produce equivalent guidance, required evidence, assets, and route preferences without granting authority."
                    id: "recipe-parity"
                    required: true
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Unknown custom nodes or constraints stop with exportable manual-conversion evidence."
                    id: "lossless-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "packages/agentplane/src/commands/blueprint"
                  required_sources:
                    - "packages/recipes/src"
                    - "packages/agentplane/src/commands/recipes"
                    - "packages/agentplane/src/runner/context"
                  symbol_hints:
                    - "preferred_blueprint"
                    - "context_hint"
                    - "output_schema"
                    - "artifact_template"
                    - "evidence_requirement"
                    - "check_suggestion"
                    - "risk_hint"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Recipe V1 conversion rules"
                  - "Manual-conversion diagnostics"
                  - "Recipe parity and policy-floor tests"
                id: "recipe-v1-conversion"
                objective: "Convert supported Recipe V1 context, output, artifact, evidence, check, risk, and preferred Blueprint hints into exact existing Recipe/native surfaces; refuse lossy custom graph conversion."
                optional: false
                priority: 80
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/recipes/src"
                  - "packages/agentplane/src/commands/recipes"
                  - "packages/agentplane/src/runner/context"
                  - "packages/agentplane/src/commands/blueprint"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1"
                      id: "recipe-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Exact Recipe V1 mappings retain requiredness and trust."
                      id: "recipe-parity"
                      required: true
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Lossy conversions are rejected."
                      id: "lossless-only"
                      required: true
                  evidence_fingerprint: "sha256:e7cf3ee20ca293f6b0a45cb11d6ee4068987afd4838f6af8fb5ae5c1f1eeb6d2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Current verification and review evidence is bound to exact task, Plan, policy, implementation, and observed input identity without BlueprintSnapshotRef."
                    id: "identity-binding"
                    required: true
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Older v2-v4 inputs remain readable only under their original semantics."
                    id: "historical-read"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/agentplane/src/runner"
                  required_sources:
                    - "packages/core/src/runner"
                    - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                    - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/evaluator"
                  symbol_hints:
                    - "verification input"
                    - "state fingerprint"
                    - "BlueprintSnapshotRef"
                    - "quality identity"
                    - "ACR"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Versioned verification-input v5"
                  - "Blueprint-free current state fingerprints and WorkOrders"
                  - "Migrated current consumers with old-format cold readers"
                id: "verification-identity"
                objective: "Introduce Blueprint-free verification-input v5 and state/WorkOrder identity, dual-read during cutover, then move freshness, finish, evaluator, quality, status, and ACR consumers to native Plan/policy/capability/check identities."
                optional: false
                priority: 80
                required_inputs:
                  - "Native lifecycle obligation enforcement"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/acr"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/acr"
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "identity-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Current identity and freshness consumers reject stale or cross-task evidence."
                      id: "identity-binding"
                      required: true
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Historical versions are decoded without reinterpretation."
                      id: "historical-read"
                      required: true
                  evidence_fingerprint: "sha256:27206832a90725350c687e11e8650f7280aab2b6ca4e4cd4c0c054868e8b875d"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Migration holds the common effect/result admission fence, rechecks quiescence, applies atomically, and preserves old bytes plus mapping receipt."
                    id: "fenced-migration"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Historical evidence can be audited offline while missing bytes are reported and never regenerated."
                    id: "cold-audit"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "New tasks issue Blueprint-free bindings and unknown or unmigrated active records stop explicitly."
                    id: "explicit-cutover"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/core/src"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                    - "packages/agentplane/src/commands/shared/supervisor-execution-lease.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/blueprint"
                  symbol_hints:
                    - "migration preview"
                    - "migration apply"
                    - "admission fence"
                    - "historical audit"
                    - "cutover"
                depends_on:
                  - "recipe-v1-conversion"
                  - "verification-identity"
                expected_outputs:
                  - "Read-only migration preview"
                  - "Atomic fenced migration with old/new receipt"
                  - "Offline historical audit decoder"
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                id: "migration-and-cutover"
                objective: "Add preview/apply retirement migration under the common admission fence, preserve original bytes and receipts, isolate the minimal historical decoder, and activate Blueprint-free issuance with typed old-record stops."
                optional: false
                priority: 70
                required_inputs:
                  - "Recipe V1 conversion rules"
                  - "Versioned verification-input v5"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/blueprint"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "migration-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Concurrent effect/result admission cannot cross migration."
                      id: "fenced-migration"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Historical audit remains byte-faithful and offline."
                      id: "cold-audit"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Cutover is fail-closed for unsupported records."
                      id: "explicit-cutover"
                      required: true
                  evidence_fingerprint: "sha256:9b86e176aee3435327477c087b6455d3f05b6d08e9909e8aea9bcfa352a4c0b5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "no-engine"
                      - "no-cursor"
                      - "schema-assets"
                    description: "Ordinary, branch, Recipe V1, recovery, and evaluator paths import or write no active Blueprint engine, cursor, snapshot, plan, state, or prompt projection."
                    id: "zero-active-engine"
                    required: true
                  -
                    check_ids:
                      - "no-engine"
                      - "schema-assets"
                    description: "Remaining Blueprint references are version-labelled documentation or explicit cold-reader exceptions and cannot execute workflows."
                    id: "cold-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1200000
                  optional_sources:
                    - "packages/agentplane/assets"
                    - "docs"
                  required_sources:
                    - "packages/agentplane/src"
                    - "packages/recipes/src"
                    - "scripts/generate"
                    - "scripts/checks"
                    - "schemas"
                  symbol_hints:
                    - "Blueprint"
                    - "blueprint"
                    - "snapshot"
                    - "cursor"
                    - "resolved graph"
                depends_on:
                  - "migration-and-cutover"
                expected_outputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No Blueprint mutation CLI or generated live schema"
                  - "No active engine/cursor imports"
                  - "Explicit cold-reader allowlist"
                id: "remove-active-blueprint"
                objective: "Remove Blueprint from model-visible context, stop current writers, retire mutation CLI and generated live assets, and delete the active registry, extension, graph-plan, and execution-state engine while retaining only the isolated cold decoder."
                optional: false
                priority: 60
                required_inputs:
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                  - "Offline historical audit decoder"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "docs"
                  - "packages/agentplane/assets"
                  - "packages/agentplane/src"
                  - "packages/core/src"
                  - "packages/recipes/src"
                  - "packages/testkit/src"
                  - "schemas"
                  - "scripts/checks"
                  - "scripts/generate"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-engine.test.mjs"
                      id: "no-engine"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-cursor.test.mjs"
                      id: "no-cursor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run schemas:check && bun run agents:check && bun run docs:bootstrap:check"
                      id: "schema-assets"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "no-engine"
                        - "no-cursor"
                        - "schema-assets"
                      description: "Active engine, cursor, writer, CLI, and prompt surfaces are absent."
                      id: "zero-active-engine"
                      required: true
                    -
                      check_ids:
                        - "no-engine"
                        - "schema-assets"
                      description: "Only bounded historical decode remains."
                      id: "cold-only"
                      required: true
                  evidence_fingerprint: "sha256:e1f5302117ad8c111f695d47289e1eff96382643614b5b1c8b34307570cdc679"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "install-smoke"
                      - "release-critical"
                      - "arch-check"
                    description: "Packed installed artifact passes direct, branch, context, recovery, Recipe V1, migration, historical audit, release-critical, and architecture checks."
                    id: "installed-qualification"
                    required: true
                  -
                    check_ids:
                      - "ci-full"
                      - "docs-check"
                    description: "The repository full local CI and documentation checks pass with no unintended tracked or untracked artifacts."
                    id: "full-regression"
                    required: true
                  -
                    check_ids:
                      - "bench-check"
                      - "bench-replay"
                    description: "Benchmark harness checks and replay pass; the result is ESTABLISHED only with matched paid .9/.10 evidence, otherwise explicitly NOT ESTABLISHED."
                    id: "m02-honesty"
                    required: true
                  -
                    check_ids:
                      - "docs-check"
                      - "semantic-review"
                    description: "Version and docs describe the exact compatibility, migration, retired-command, cold-reader, lifecycle, and efficiency boundaries for 0.7.10."
                    id: "release-ready"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "bun.lock"
                  required_sources:
                    - "scripts/release"
                    - "scripts/checks"
                    - "scripts/bench"
                    - "docs"
                    - "package.json"
                    - "packages/agentplane/package.json"
                    - ".github/workflows"
                  symbol_hints:
                    - "0.7.10"
                    - "install smoke"
                    - "release critical"
                    - "M02"
                    - "compatibility"
                depends_on:
                  - "remove-active-blueprint"
                expected_outputs:
                  - "Installed-package and release-critical evidence"
                  - "Full local regression evidence"
                  - "M02 ESTABLISHED result or explicit NOT ESTABLISHED disposition"
                  - "0.7.10 compatibility docs and release-ready metadata"
                id: "qualification-and-release-readiness"
                objective: "Qualify direct, branch, context, recovery, Recipe V1, migration, historical audit, and stable-channel behavior through the packed install; record honest M02 status; update compatibility documentation and 0.7.10 release metadata without publishing."
                optional: false
                priority: 50
                required_inputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No active engine/cursor imports"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts/release"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs"
                  - "package.json"
                  - "packages/agentplane/package.json"
                  - "bun.lock"
                  - ".github/workflows"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run package:install-smoke"
                      id: "install-smoke"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run test:release:critical"
                      id: "release-critical"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "arch-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "ci-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                      id: "docs-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:check"
                      id: "bench-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:replay:check"
                      id: "bench-replay"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      id: "semantic-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "install-smoke"
                        - "release-critical"
                        - "arch-check"
                      description: "The distributed artifact and critical paths pass."
                      id: "installed-qualification"
                      required: true
                    -
                      check_ids:
                        - "ci-full"
                        - "docs-check"
                      description: "Full local CI and docs pass."
                      id: "full-regression"
                      required: true
                    -
                      check_ids:
                        - "bench-check"
                        - "bench-replay"
                      description: "Benchmark support is valid and the verdict matches available evidence."
                      id: "m02-honesty"
                      required: true
                    -
                      check_ids:
                        - "docs-check"
                        - "semantic-review"
                      description: "0.7.10 metadata and documentation match implemented behavior."
                      id: "release-ready"
                      required: true
                  evidence_fingerprint: "sha256:3b31cf8635263bdcba661a030258d6f4564d24bb94213b9a4a3b227c83f5939b"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609162254-YE48GC"
      -
        approval:
          approved_at: "2026-09-17T11:55:31.908Z"
          approved_by: "USER"
          approved_digest: "sha256:4ec56c073b35030c3840014371f40207d7e07df4d9022dd4cbf552625de6c57a"
          policy_facts:
            - "state_bound_scope_extension:sha256:2a40b6d10b1a3f60582f25f70b19c3a557d6154cdf7a1b3d3d40b150fa054b45"
          state: "approved"
        created_at: "2026-09-17T11:55:31.908Z"
        digest: "sha256:4ec56c073b35030c3840014371f40207d7e07df4d9022dd4cbf552625de6c57a"
        proposal:
          assumptions:
            - "Current main at 19ff39fd292c30f0958131c35200a6268b7a285d is the accepted planning baseline."
            - "The existing Plan, native policy, capability, task-routing, verification, journal, Recipe V1, and task-state owners are retained; no replacement workflow engine is introduced."
            - "PLANNER and EVALUATOR remain mandatory wherever current policy requires them; Scenario V2 and lifecycle-owner convergence remain outside 0.7.10."
            - "Publication is performed only after this implementation task is merged and independently qualified under a separate release task and publish authority."
          planning_baseline:
            captured_at: "2026-09-16T22:55:54.740Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:518dc1dcc46175c0c4b1160f3cc6f80d277a47f1bfc09656aa14e9d4303b44e6"
            dirty_paths:
              - ".agentplane/tasks/202609162254-YE48GC/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609162254-YE48GC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "ci-full"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run package:install-smoke"
                id: "install-smoke"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run test:release:critical"
                id: "release-critical"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "arch-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                id: "docs-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:check"
                id: "bench-check"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:replay:check"
                id: "bench-replay"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                id: "semantic-review"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-ci"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "ci-full"
                  - "install-smoke"
                  - "release-critical"
                  - "arch-check"
                  - "semantic-review"
                description: "Blueprint is absent from active execution and model-visible context while current lifecycle, authority, verification, Recipe V1, recovery, and historical audit obligations remain enforced."
                id: "task-outcome"
                required: true
              -
                check_ids:
                  - "install-smoke"
                  - "release-critical"
                  - "docs-check"
                  - "bench-check"
                  - "bench-replay"
                description: "The exact 0.7.10 artifact is locally qualified and release metadata is ready; publication remains a separate gated action."
                id: "release-readiness"
                required: true
              -
                check_ids:
                  - "hosted-ci"
                description: "Required hosted CI and integration evidence must pass before merge."
                id: "hosted-integration"
                required: true
            evidence_fingerprint: "sha256:2d920f6ffc657ee4c5369ef0a5540a2ccf5917cff43eaec3b3211337d9049fd6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "channel-tests"
                    description: "Stable aliases cannot move from a higher published SemVer line to a lower maintenance release."
                    id: "channel-order"
                    required: true
                  -
                    check_ids:
                      - "retirement-map"
                    description: "Every active Blueprint field, writer, and consumer has a native owner, explicit cold-reader exception, or manual-conversion classification."
                    id: "owner-map"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 300000
                  optional_sources:
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/commands"
                  required_sources:
                    - "scripts/release"
                    - ".github/workflows"
                    - "packages/agentplane/src/blueprints"
                    - "packages/recipes/src/manifest-contracts.ts"
                  symbol_hints:
                    - "Blueprint"
                    - "stable"
                    - "dist-tag"
                    - "minor tag"
                depends_on: []
                expected_outputs:
                  - "SemVer-aware release channel policy"
                  - "Executable Blueprint retirement inventory guard"
                  - "Native owner and compatibility map"
                id: "channel-and-owner-map"
                objective: "Implement SemVer-aware stable-channel promotion and freeze a field-by-field Blueprint retirement owner map covering active consumers, writers, obligations, and exact/manual Recipe mappings."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts"
                  - ".github/workflows"
                  - "packages/agentplane/src/blueprints"
                  - "packages/recipes/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/release/*.test.mjs"
                      id: "channel-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
                      id: "retirement-map"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "channel-tests"
                      description: "SemVer channel decisions are monotonic across release lines."
                      id: "channel-order"
                      required: true
                    -
                      check_ids:
                        - "retirement-map"
                      description: "The Blueprint retirement map is complete and machine-checked."
                      id: "owner-map"
                      required: true
                  evidence_fingerprint: "sha256:811cfd69b61a0c97a874d9dd7d710fa94ec45f605ad42f33d3cb07fb304586b1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "native-obligation-tests"
                    description: "Direct/branch, security, approval, review, stop, rollback, and evidence floors remain equal or stronger without Blueprint selection."
                    id: "native-parity"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "packages/agentplane/src/blueprints"
                  required_sources:
                    - "packages/agentplane/src/commands/shared"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/runtime"
                    - "packages/agentplane/src/runner"
                    - "packages/core/src/tasks/task-centric"
                  symbol_hints:
                    - "route decision"
                    - "policy modules"
                    - "capability"
                    - "quality review"
                    - "verification evidence"
                depends_on:
                  - "channel-and-owner-map"
                expected_outputs:
                  - "Blueprint-free route and authority decisions"
                  - "Native lifecycle obligation enforcement"
                  - "Parity tests for forbidden traces"
                id: "native-obligations"
                objective: "Move route floors, policy modules, capability admission, context budgets, protected approval/review, stop/rollback, and evidence minimums to their existing native owners without weakening mandatory stages."
                optional: false
                priority: 90
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runtime"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "native-obligation-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "native-obligation-tests"
                      description: "Native obligation parity and negative cases pass."
                      id: "native-parity"
                      required: true
                  evidence_fingerprint: "sha256:81aaf3fc7b555152b32d9ab8063535a8ad83d3a62dbb5025c77af593ab3d5f0c"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Supported V1 recipes produce equivalent guidance, required evidence, assets, and route preferences without granting authority."
                    id: "recipe-parity"
                    required: true
                  -
                    check_ids:
                      - "recipe-tests"
                    description: "Unknown custom nodes or constraints stop with exportable manual-conversion evidence."
                    id: "lossless-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "packages/agentplane/src/commands/blueprint"
                  required_sources:
                    - "packages/recipes/src"
                    - "packages/agentplane/src/commands/recipes"
                    - "packages/agentplane/src/runner/context"
                  symbol_hints:
                    - "preferred_blueprint"
                    - "context_hint"
                    - "output_schema"
                    - "artifact_template"
                    - "evidence_requirement"
                    - "check_suggestion"
                    - "risk_hint"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Recipe V1 conversion rules"
                  - "Manual-conversion diagnostics"
                  - "Recipe parity and policy-floor tests"
                id: "recipe-v1-conversion"
                objective: "Convert supported Recipe V1 context, output, artifact, evidence, check, risk, and preferred Blueprint hints into exact existing Recipe/native surfaces; refuse lossy custom graph conversion."
                optional: false
                priority: 80
                required_inputs:
                  - "Native owner and compatibility map"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/recipes/src"
                  - "packages/agentplane/src/commands/recipes"
                  - "packages/agentplane/src/runner/context"
                  - "packages/agentplane/src/commands/blueprint"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1"
                      id: "recipe-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Exact Recipe V1 mappings retain requiredness and trust."
                      id: "recipe-parity"
                      required: true
                    -
                      check_ids:
                        - "recipe-tests"
                      description: "Lossy conversions are rejected."
                      id: "lossless-only"
                      required: true
                  evidence_fingerprint: "sha256:e7cf3ee20ca293f6b0a45cb11d6ee4068987afd4838f6af8fb5ae5c1f1eeb6d2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Current verification and review evidence is bound to exact task, Plan, policy, implementation, and observed input identity without BlueprintSnapshotRef."
                    id: "identity-binding"
                    required: true
                  -
                    check_ids:
                      - "identity-tests"
                    description: "Older v2-v4 inputs remain readable only under their original semantics."
                    id: "historical-read"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/agentplane/src/runner"
                  required_sources:
                    - "packages/core/src/runner"
                    - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                    - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/evaluator"
                  symbol_hints:
                    - "verification input"
                    - "state fingerprint"
                    - "BlueprintSnapshotRef"
                    - "quality identity"
                    - "ACR"
                depends_on:
                  - "native-obligations"
                expected_outputs:
                  - "Versioned verification-input v5"
                  - "Blueprint-free current state fingerprints and WorkOrders"
                  - "Migrated current consumers with old-format cold readers"
                id: "verification-identity"
                objective: "Introduce Blueprint-free verification-input v5 and state/WorkOrder identity, dual-read during cutover, then move freshness, finish, evaluator, quality, status, and ACR consumers to native Plan/policy/capability/check identities."
                optional: false
                priority: 80
                required_inputs:
                  - "Native lifecycle obligation enforcement"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "repository"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/acr"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/acr"
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "identity-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Current identity and freshness consumers reject stale or cross-task evidence."
                      id: "identity-binding"
                      required: true
                    -
                      check_ids:
                        - "identity-tests"
                      description: "Historical versions are decoded without reinterpretation."
                      id: "historical-read"
                      required: true
                  evidence_fingerprint: "sha256:27206832a90725350c687e11e8650f7280aab2b6ca4e4cd4c0c054868e8b875d"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Migration holds the common effect/result admission fence, rechecks quiescence, applies atomically, and preserves old bytes plus mapping receipt."
                    id: "fenced-migration"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "Historical evidence can be audited offline while missing bytes are reported and never regenerated."
                    id: "cold-audit"
                    required: true
                  -
                    check_ids:
                      - "migration-tests"
                    description: "New tasks issue Blueprint-free bindings and unknown or unmigrated active records stop explicitly."
                    id: "explicit-cutover"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 800000
                  optional_sources:
                    - "packages/core/src"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                    - "packages/agentplane/src/commands/shared/supervisor-execution-lease.ts"
                    - "packages/agentplane/src/commands/task"
                    - "packages/agentplane/src/commands/blueprint"
                  symbol_hints:
                    - "migration preview"
                    - "migration apply"
                    - "admission fence"
                    - "historical audit"
                    - "cutover"
                depends_on:
                  - "recipe-v1-conversion"
                  - "verification-identity"
                expected_outputs:
                  - "Read-only migration preview"
                  - "Atomic fenced migration with old/new receipt"
                  - "Offline historical audit decoder"
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                id: "migration-and-cutover"
                objective: "Add preview/apply retirement migration under the common admission fence, preserve original bytes and receipts, isolate the minimal historical decoder, and activate Blueprint-free issuance with typed old-record stops."
                optional: false
                priority: 70
                required_inputs:
                  - "Recipe V1 conversion rules"
                  - "Versioned verification-input v5"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/blueprint"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1"
                      id: "migration-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Concurrent effect/result admission cannot cross migration."
                      id: "fenced-migration"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Historical audit remains byte-faithful and offline."
                      id: "cold-audit"
                      required: true
                    -
                      check_ids:
                        - "migration-tests"
                      description: "Cutover is fail-closed for unsupported records."
                      id: "explicit-cutover"
                      required: true
                  evidence_fingerprint: "sha256:9b86e176aee3435327477c087b6455d3f05b6d08e9909e8aea9bcfa352a4c0b5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "no-engine"
                      - "no-cursor"
                      - "schema-assets"
                    description: "Ordinary, branch, Recipe V1, recovery, and evaluator paths import or write no active Blueprint engine, cursor, snapshot, plan, state, or prompt projection."
                    id: "zero-active-engine"
                    required: true
                  -
                    check_ids:
                      - "no-engine"
                      - "schema-assets"
                    description: "Remaining Blueprint references are version-labelled documentation or explicit cold-reader exceptions and cannot execute workflows."
                    id: "cold-only"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1200000
                  optional_sources:
                    - "packages/agentplane/assets"
                    - "docs"
                  required_sources:
                    - "packages/agentplane/src"
                    - "packages/recipes/src"
                    - "scripts/generate"
                    - "scripts/checks"
                    - "schemas"
                  symbol_hints:
                    - "Blueprint"
                    - "blueprint"
                    - "snapshot"
                    - "cursor"
                    - "resolved graph"
                depends_on:
                  - "migration-and-cutover"
                expected_outputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No Blueprint mutation CLI or generated live schema"
                  - "No active engine/cursor imports"
                  - "Explicit cold-reader allowlist"
                id: "remove-active-blueprint"
                objective: "Remove Blueprint from model-visible context, stop current writers, retire mutation CLI and generated live assets, and delete the active registry, extension, graph-plan, and execution-state engine while retaining only the isolated cold decoder."
                optional: false
                priority: 60
                required_inputs:
                  - "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
                  - "Offline historical audit decoder"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas"
                risk: "high"
                scope_roots:
                  - "docs"
                  - "packages/agentplane/assets"
                  - "packages/agentplane/src"
                  - "packages/core/schemas"
                  - "packages/core/src"
                  - "packages/recipes/src"
                  - "packages/spec/schemas"
                  - "packages/testkit/src"
                  - "schemas"
                  - "scripts/checks"
                  - "scripts/generate"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-engine.test.mjs"
                      id: "no-engine"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/checks/no-blueprint-cursor.test.mjs"
                      id: "no-cursor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run schemas:check && bun run agents:check && bun run docs:bootstrap:check"
                      id: "schema-assets"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "no-engine"
                        - "no-cursor"
                        - "schema-assets"
                      description: "Active engine, cursor, writer, CLI, and prompt surfaces are absent."
                      id: "zero-active-engine"
                      required: true
                    -
                      check_ids:
                        - "no-engine"
                        - "schema-assets"
                      description: "Only bounded historical decode remains."
                      id: "cold-only"
                      required: true
                  evidence_fingerprint: "sha256:e1f5302117ad8c111f695d47289e1eff96382643614b5b1c8b34307570cdc679"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "install-smoke"
                      - "release-critical"
                      - "arch-check"
                    description: "Packed installed artifact passes direct, branch, context, recovery, Recipe V1, migration, historical audit, release-critical, and architecture checks."
                    id: "installed-qualification"
                    required: true
                  -
                    check_ids:
                      - "ci-full"
                      - "docs-check"
                    description: "The repository full local CI and documentation checks pass with no unintended tracked or untracked artifacts."
                    id: "full-regression"
                    required: true
                  -
                    check_ids:
                      - "bench-check"
                      - "bench-replay"
                    description: "Benchmark harness checks and replay pass; the result is ESTABLISHED only with matched paid .9/.10 evidence, otherwise explicitly NOT ESTABLISHED."
                    id: "m02-honesty"
                    required: true
                  -
                    check_ids:
                      - "docs-check"
                      - "semantic-review"
                    description: "Version and docs describe the exact compatibility, migration, retired-command, cold-reader, lifecycle, and efficiency boundaries for 0.7.10."
                    id: "release-ready"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 700000
                  optional_sources:
                    - "bun.lock"
                  required_sources:
                    - "scripts/release"
                    - "scripts/checks"
                    - "scripts/bench"
                    - "docs"
                    - "package.json"
                    - "packages/agentplane/package.json"
                    - ".github/workflows"
                  symbol_hints:
                    - "0.7.10"
                    - "install smoke"
                    - "release critical"
                    - "M02"
                    - "compatibility"
                depends_on:
                  - "remove-active-blueprint"
                expected_outputs:
                  - "Installed-package and release-critical evidence"
                  - "Full local regression evidence"
                  - "M02 ESTABLISHED result or explicit NOT ESTABLISHED disposition"
                  - "0.7.10 compatibility docs and release-ready metadata"
                id: "qualification-and-release-readiness"
                objective: "Qualify direct, branch, context, recovery, Recipe V1, migration, historical audit, and stable-channel behavior through the packed install; record honest M02 status; update compatibility documentation and 0.7.10 release metadata without publishing."
                optional: false
                priority: 50
                required_inputs:
                  - "Zero active Blueprint artifacts and prompt inputs"
                  - "No active engine/cursor imports"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "repository"
                risk: "high"
                scope_roots:
                  - "scripts/release"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs"
                  - "package.json"
                  - "packages/agentplane/package.json"
                  - "bun.lock"
                  - ".github/workflows"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run package:install-smoke"
                      id: "install-smoke"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run test:release:critical"
                      id: "release-critical"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "arch-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "ci-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run docs:bootstrap:check && bun run docs:onboarding:check"
                      id: "docs-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:check"
                      id: "bench-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:replay:check"
                      id: "bench-replay"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      id: "semantic-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "install-smoke"
                        - "release-critical"
                        - "arch-check"
                      description: "The distributed artifact and critical paths pass."
                      id: "installed-qualification"
                      required: true
                    -
                      check_ids:
                        - "ci-full"
                        - "docs-check"
                      description: "Full local CI and docs pass."
                      id: "full-regression"
                      required: true
                    -
                      check_ids:
                        - "bench-check"
                        - "bench-replay"
                      description: "Benchmark support is valid and the verdict matches available evidence."
                      id: "m02-honesty"
                      required: true
                    -
                      check_ids:
                        - "docs-check"
                        - "semantic-review"
                      description: "0.7.10 metadata and documentation match implemented behavior."
                      id: "release-ready"
                      required: true
                  evidence_fingerprint: "sha256:3b31cf8635263bdcba661a030258d6f4564d24bb94213b9a4a3b227c83f5939b"
                  schema_version: 1
        revision: 4
        schema_version: 1
        task_id: "202609162254-YE48GC"
    revision: 32
    schema_version: 1
    updated_at: "2026-09-17T11:56:22.602Z"
    work_items:
      channel-and-owner-map:
        attempt: 1
        claim_id: null
        id: "channel-and-owner-map"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:026a9ebcd7be80d090310854b5cfbf8c4c064b5f4bb06405ad9323153da5cc24"
            id: "SemVer-aware release channel policy"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "channel-and-owner-map"
            provenance:
              - "sha256:feed10da72090d4591e44f46a4edb96cbda6ce89c365d5ddcfbb7c5f166666ba"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5c8337a522d4a2869b374091f7ced33160ec4773e00aefd87c9e40ed412a3037"
            id: "Executable Blueprint retirement inventory guard"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "channel-and-owner-map"
            provenance:
              - "sha256:feed10da72090d4591e44f46a4edb96cbda6ce89c365d5ddcfbb7c5f166666ba"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:d41d93c31ad15facc8dbf4ae7b42411192c2e1539e504bdac29689c1b57ddfd0"
            id: "Native owner and compatibility map"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "channel-and-owner-map"
            provenance:
              - "sha256:feed10da72090d4591e44f46a4edb96cbda6ce89c365d5ddcfbb7c5f166666ba"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "channel-tests"
              command_identity: "node --test scripts/release/*.test.mjs"
              detail: "Observed by node --test scripts/release/*.test.mjs."
              exit_code: 0
              observed_at: "2026-09-16T23:15:40.029Z"
              repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "retirement-map"
              command_identity: "node --test scripts/checks/blueprint-retirement-map.test.mjs"
              detail: "Observed by node --test scripts/checks/blueprint-retirement-map.test.mjs."
              exit_code: 0
              observed_at: "2026-09-16T23:15:40.029Z"
              repository_snapshot_digest: "sha256:f9ad61227cd56652f9964381ca4e55974432acb27f7f8a652e69a67dabe9e044"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      migration-and-cutover:
        attempt: 1
        claim_id: null
        id: "migration-and-cutover"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:9c47e30f6f8ee4fa1431df5b30d489deb10688546d9514f385b6617369cc39e1"
            id: "Read-only migration preview"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609162254-YE48GC"
              work_item_id: "migration-and-cutover"
            provenance:
              - "sha256:6c1a3755acc326d66c4d63346ca38c9bd1ca94883684b1f730495baf8b5fbb95"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0310bf7224ad1a6f7b736968da030dd7e9eb7db9fd59981dd4ae6a0a666cd527"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:18ec9db4651c78ea37fd55ae9b8df73e2acf46457ac2670d97c82a45dfb7ce08"
            id: "Atomic fenced migration with old/new receipt"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609162254-YE48GC"
              work_item_id: "migration-and-cutover"
            provenance:
              - "sha256:6c1a3755acc326d66c4d63346ca38c9bd1ca94883684b1f730495baf8b5fbb95"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0310bf7224ad1a6f7b736968da030dd7e9eb7db9fd59981dd4ae6a0a666cd527"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:b263e03a1a5b31473b508bb1a6eaab68d1f4a5c6bc0349500036b8ed101fa337"
            id: "Offline historical audit decoder"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609162254-YE48GC"
              work_item_id: "migration-and-cutover"
            provenance:
              - "sha256:6c1a3755acc326d66c4d63346ca38c9bd1ca94883684b1f730495baf8b5fbb95"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0310bf7224ad1a6f7b736968da030dd7e9eb7db9fd59981dd4ae6a0a666cd527"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:62dde40d187c92df90afcaaf9e412b210e5a265548a1aa62dc22bd88374f475a"
            id: "Blueprint-free new-task issuance and explicit drain/migrate/quarantine stops"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609162254-YE48GC"
              work_item_id: "migration-and-cutover"
            provenance:
              - "sha256:6c1a3755acc326d66c4d63346ca38c9bd1ca94883684b1f730495baf8b5fbb95"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0310bf7224ad1a6f7b736968da030dd7e9eb7db9fd59981dd4ae6a0a666cd527"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "migration-tests"
              command_identity: "bun run test:project agentplane --maxWorkers=1"
              detail: "Observed by bun run test:project agentplane --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-17T10:40:47.466Z"
              repository_snapshot_digest: "sha256:0310bf7224ad1a6f7b736968da030dd7e9eb7db9fd59981dd4ae6a0a666cd527"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      native-obligations:
        attempt: 1
        claim_id: null
        id: "native-obligations"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a0056d4217a49a5eadf35b1b84a6d4cfec062764399dd21111eb37fe1899ac2f"
            id: "Blueprint-free route and authority decisions"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "native-obligations"
            provenance:
              - "sha256:e2d3ae87724baf05d501f74abf381ae3c0cb17c2321c45d338304d837d007da8"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:260f022416960102cb570e2405e1a05f72808a77e75d00ac736961d135cc5326"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:f88a5640803caa96d1516aef3621397813c05f9a7d9ac0f35ea031717900d60f"
            id: "Native lifecycle obligation enforcement"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "native-obligations"
            provenance:
              - "sha256:e2d3ae87724baf05d501f74abf381ae3c0cb17c2321c45d338304d837d007da8"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:260f022416960102cb570e2405e1a05f72808a77e75d00ac736961d135cc5326"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:ace8fc02b59e4512744a5c4c9f565a851676833abc88eca4097d61946dbde265"
            id: "Parity tests for forbidden traces"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "native-obligations"
            provenance:
              - "sha256:e2d3ae87724baf05d501f74abf381ae3c0cb17c2321c45d338304d837d007da8"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:260f022416960102cb570e2405e1a05f72808a77e75d00ac736961d135cc5326"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "native-obligation-tests"
              command_identity: "bun run test:project agentplane --maxWorkers=1"
              detail: "Observed by bun run test:project agentplane --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-17T00:28:31.886Z"
              repository_snapshot_digest: "sha256:260f022416960102cb570e2405e1a05f72808a77e75d00ac736961d135cc5326"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      qualification-and-release-readiness:
        attempt: 0
        claim_id: null
        id: "qualification-and-release-readiness"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      recipe-v1-conversion:
        attempt: 1
        claim_id: null
        id: "recipe-v1-conversion"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:eb54bdc27a8f8cd30201324bd45551f8e9f2d6951ccf5e53019ef4069977fd00"
            id: "Recipe V1 conversion rules"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "recipe-v1-conversion"
            provenance:
              - "sha256:2d2e1e7a259d3bcc981de45ab2f50d2f6aef9048829ea12f6f8ade3dce3ff225"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:93b590185fd53cb6235a3d0a7d031deda20eb6701506d1c5072e78cdca984bdc"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:9733087ebbcdaec6b1e7670bd252d496828c75d086b0bd2282a882f164b984f1"
            id: "Manual-conversion diagnostics"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "recipe-v1-conversion"
            provenance:
              - "sha256:2d2e1e7a259d3bcc981de45ab2f50d2f6aef9048829ea12f6f8ade3dce3ff225"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:93b590185fd53cb6235a3d0a7d031deda20eb6701506d1c5072e78cdca984bdc"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:4295f3ee70ce2828abc4a2b365be4674bf09f9d5d0525b4ad0b096a0caf8fbfb"
            id: "Recipe parity and policy-floor tests"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609162254-YE48GC"
              work_item_id: "recipe-v1-conversion"
            provenance:
              - "sha256:2d2e1e7a259d3bcc981de45ab2f50d2f6aef9048829ea12f6f8ade3dce3ff225"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:93b590185fd53cb6235a3d0a7d031deda20eb6701506d1c5072e78cdca984bdc"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "recipe-tests"
              command_identity: "bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1"
              detail: "Observed by bun run test:project recipes --maxWorkers=1 && bun run test:project agentplane --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-17T07:40:34.394Z"
              repository_snapshot_digest: "sha256:93b590185fd53cb6235a3d0a7d031deda20eb6701506d1c5072e78cdca984bdc"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      remove-active-blueprint:
        attempt: 0
        claim_id: null
        id: "remove-active-blueprint"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      verification-identity:
        attempt: 1
        claim_id: null
        id: "verification-identity"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:8e65e0e31e76f8a3d404e415cabf827c5ecadbe7f43dccb3addb09253b7038e9"
            id: "Versioned verification-input v5"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609162254-YE48GC"
              work_item_id: "verification-identity"
            provenance:
              - "sha256:20b07c2c324773b0de65e2dbf7baf3f76517154eb296f847d9847cc0b557ccec"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:62fc9926e1a9d526f9c96954b8b24301bc1b5e4d245a94a42c2bd65da99791b5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5f3b04d33e6105e4e057684157aadbdd8a46bc68eeba33a4a00e3c647fbf7994"
            id: "Blueprint-free current state fingerprints and WorkOrders"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609162254-YE48GC"
              work_item_id: "verification-identity"
            provenance:
              - "sha256:20b07c2c324773b0de65e2dbf7baf3f76517154eb296f847d9847cc0b557ccec"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:62fc9926e1a9d526f9c96954b8b24301bc1b5e4d245a94a42c2bd65da99791b5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:da0091522a5c0698d0cb1289c0f9ef7d7ee9b59c49c60398f7d524ce23bd224b"
            id: "Migrated current consumers with old-format cold readers"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609162254-YE48GC"
              work_item_id: "verification-identity"
            provenance:
              - "sha256:20b07c2c324773b0de65e2dbf7baf3f76517154eb296f847d9847cc0b557ccec"
              - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:62fc9926e1a9d526f9c96954b8b24301bc1b5e4d245a94a42c2bd65da99791b5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609162254-YE48GC/supervision/declared-checks.json"
              check_id: "identity-tests"
              command_identity: "bun run test:project agentplane --maxWorkers=1"
              detail: "Observed by bun run test:project agentplane --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-17T09:22:14.087Z"
              repository_snapshot_digest: "sha256:62fc9926e1a9d526f9c96954b8b24301bc1b5e4d245a94a42c2bd65da99791b5"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-16T23:15:40.039Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:2232ab0a3e9d1b52e784943203ff89564cccb75b974b07cbe4c851ac4bfd3228"
        entity: "work_item"
        id: "event_9a0e5edbcc29583c41c5b191"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d"
        plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609162254-YE48GC"
        task_revision: 7
        work_item_id: "channel-and-owner-map"
      -
        at: "2026-09-17T00:28:31.900Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:ed46ef308a6ea39792ae4a44858614afe065d03e06bc1d9fdd85877c072e8f67"
        entity: "work_item"
        id: "event_c7e2149eaf19bf8d623007f7"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-e6a0a0fcab02ca3cc55e660a"
        plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609162254-YE48GC"
        task_revision: 10
        work_item_id: "native-obligations"
      -
        at: "2026-09-17T07:40:34.408Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:73977094b03a319f9b6a7f1d7f47d6e2754f6ad38c7edecb60d8fc2a90e06e25"
        entity: "work_item"
        id: "event_77b766510965a60c0f524650"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-b5679f4de4f3b712e1ab2ae8"
        plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609162254-YE48GC"
        task_revision: 13
        work_item_id: "recipe-v1-conversion"
      -
        at: "2026-09-17T09:22:14.120Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:44c9fac33c76d2fda6dab01908558c235c4c89e93f0dff5327197484d4ea0e4c"
        entity: "work_item"
        id: "event_33b812e3f95b9fd172bda3d3"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-941a121693a828bac7a9896e"
        plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609162254-YE48GC"
        task_revision: 19
        work_item_id: "verification-identity"
      -
        at: "2026-09-17T10:40:47.503Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:74d6e13a5fe7dd91172523cac7ef9d8488e759967cfcc17f5db42657dfecfb07"
        entity: "work_item"
        id: "event_85f0b721f3a1b7c92d6749cf"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-912a3cca93308f90df3d16a4"
        plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609162254-YE48GC"
        task_revision: 22
        work_item_id: "migration-and-cutover"
    leases: []
    mutation_receipts:
      compatibility:sha256:03ad382df371fb10a3fda0b3d74c85baaa1cbfcc47fa5298b2773c99d5104eda:
        aggregate_digest: "sha256:ab92cae9750fd0eaa619b17291fb4e7f46fde563c5e785c52761a81c5e315c94"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:01:25.533Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_218ec6bc5c507953d1e7a03f"
          mutation_id: "compatibility:sha256:03ad382df371fb10a3fda0b3d74c85baaa1cbfcc47fa5298b2773c99d5104eda"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:03ad382df371fb10a3fda0b3d74c85baaa1cbfcc47fa5298b2773c99d5104eda"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:1120f2f95ac361b5eb7424965608b1b9088e2a4747b2cd77582fabd2c5d63cac:
        aggregate_digest: "sha256:a5ba5229570363a19fce24a11f6811d2bfdbd4db1cb7a17a3290fa0b3d0929ed"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T07:45:45.689Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_443bd176d38ae08b46d57984"
          mutation_id: "compatibility:sha256:1120f2f95ac361b5eb7424965608b1b9088e2a4747b2cd77582fabd2c5d63cac"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 15
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:1120f2f95ac361b5eb7424965608b1b9088e2a4747b2cd77582fabd2c5d63cac"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:12c998af7431cebbd68d03daead6233ee29131e42e24f9d9fe9444aaae19051c:
        aggregate_digest: "sha256:9917d085f765d74616d26c82640eb5cce6f2378e6fb0e5ff2fb74352e2c46864"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T07:45:45.689Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_cbe839967803a8515f9494e4"
          mutation_id: "compatibility:sha256:12c998af7431cebbd68d03daead6233ee29131e42e24f9d9fe9444aaae19051c"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 14
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:12c998af7431cebbd68d03daead6233ee29131e42e24f9d9fe9444aaae19051c"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:164b489b12c63192e2ea75358781e8261fe2a4c62e0685e6241b9bdda8624e35:
        aggregate_digest: "sha256:8c42bb249f8ccff598bd741a0762aebb574dd48715f8b5e8f74343c1b1cbba8c"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:55:26.413Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_ca8ccf0c1f334c31590be532"
          mutation_id: "compatibility:sha256:164b489b12c63192e2ea75358781e8261fe2a4c62e0685e6241b9bdda8624e35"
          plan_digest: "sha256:7bca7888a0204117a2799fbdc622e9f3a0f56e7819f7b5a6b814ba5cfdbfec22"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 28
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:164b489b12c63192e2ea75358781e8261fe2a4c62e0685e6241b9bdda8624e35"
        next_revision: 29
        previous_revision: 28
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:26fbdf35239d4abd6d07b9c301a7f1480f87362dd61c5797e3db3b96869dc0d0:
        aggregate_digest: "sha256:9b633be46549fd32848abc6737b39d8df87ce1b265d4b5c6a1c8088f0d7b7bf4"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:56:22.602Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_749c0eeb3c705677d33c1ef3"
          mutation_id: "compatibility:sha256:26fbdf35239d4abd6d07b9c301a7f1480f87362dd61c5797e3db3b96869dc0d0"
          plan_digest: "sha256:4ec56c073b35030c3840014371f40207d7e07df4d9022dd4cbf552625de6c57a"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 30
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:26fbdf35239d4abd6d07b9c301a7f1480f87362dd61c5797e3db3b96869dc0d0"
        next_revision: 31
        previous_revision: 30
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:2aa1b102ce794c2384ff8259bcc973f6fa304a50845c0f20d48089b36c5f78db:
        aggregate_digest: "sha256:2394f061b59dbade72ef6f3e15fbb8c1acd6b16fb70b6898d8a1a3498a64063a"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T00:14:09.587Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c868af99efd8f4fc1e28bc5f"
          mutation_id: "compatibility:sha256:2aa1b102ce794c2384ff8259bcc973f6fa304a50845c0f20d48089b36c5f78db"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2aa1b102ce794c2384ff8259bcc973f6fa304a50845c0f20d48089b36c5f78db"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:35c1fb7a1810daf01827b3da94310f76192b7c5554911823500251c52bed9c32:
        aggregate_digest: "sha256:c5a62b6a0ec8b5b4f4dea29ca25564b898862ab3c751d721bbb1b89ba7a53de0"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T09:07:57.265Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e0a1d0ac9dfc62f40c9f8f0f"
          mutation_id: "compatibility:sha256:35c1fb7a1810daf01827b3da94310f76192b7c5554911823500251c52bed9c32"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:35c1fb7a1810daf01827b3da94310f76192b7c5554911823500251c52bed9c32"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:413450ce2745d1d5cf77c898303ff5777b75a51f5db675c1e34d55e570726bd9:
        aggregate_digest: "sha256:ae8c555aa47f48c57b8a831af834bc49ccfc1fbcbd1cfffb9b7832d90a7f7f17"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:02:04.360Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8e28eaae67e15205f5be9fc2"
          mutation_id: "compatibility:sha256:413450ce2745d1d5cf77c898303ff5777b75a51f5db675c1e34d55e570726bd9"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:413450ce2745d1d5cf77c898303ff5777b75a51f5db675c1e34d55e570726bd9"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:4372e0c1f6037411a339b3762fb321c46918a2ff7dd68636a28e005a69ca5bbf:
        aggregate_digest: "sha256:aec6a5e2ad9f17b8dbc95343ff7558ed6d94bf775f50aa6260b68381e5a953ea"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:55:26.413Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_db10fafafeb74cb83507f0fa"
          mutation_id: "compatibility:sha256:4372e0c1f6037411a339b3762fb321c46918a2ff7dd68636a28e005a69ca5bbf"
          plan_digest: "sha256:7bca7888a0204117a2799fbdc622e9f3a0f56e7819f7b5a6b814ba5cfdbfec22"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 27
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:4372e0c1f6037411a339b3762fb321c46918a2ff7dd68636a28e005a69ca5bbf"
        next_revision: 28
        previous_revision: 27
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:49c492d58bbe73926763535cb02683c733c0c88ef13a8c63b8a8ae6a84b938f4:
        aggregate_digest: "sha256:2e804851242d36f2a86d91212684aef110a165bc18dcfb1023feaa0d7d4000a4"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:01:25.534Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8bebe2bdf1f011d7bd8a429d"
          mutation_id: "compatibility:sha256:49c492d58bbe73926763535cb02683c733c0c88ef13a8c63b8a8ae6a84b938f4"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:49c492d58bbe73926763535cb02683c733c0c88ef13a8c63b8a8ae6a84b938f4"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:5bb96a0c6b3341aa2815aaf98b4f369783a10d234bfbdebfef713db1bedddfb1:
        aggregate_digest: "sha256:287dd3c2c84af86f2ce33752053a8c562da35bb04fdab677becb8fc35d0b22c6"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T10:26:38.290Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f5a5b6295e51f2f8cc4361b1"
          mutation_id: "compatibility:sha256:5bb96a0c6b3341aa2815aaf98b4f369783a10d234bfbdebfef713db1bedddfb1"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 21
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5bb96a0c6b3341aa2815aaf98b4f369783a10d234bfbdebfef713db1bedddfb1"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:610f7b694f1c375242d25d6bd6194cae260a1ba6737c36f396bf93684e5c9dcf:
        aggregate_digest: "sha256:9ce2d412efc5d2107062835d3a1705f5c14bb39256d20585de65b10077332b67"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T07:45:45.689Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_6ec2ac1a7ded9baaad07e178"
          mutation_id: "compatibility:sha256:610f7b694f1c375242d25d6bd6194cae260a1ba6737c36f396bf93684e5c9dcf"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 16
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:610f7b694f1c375242d25d6bd6194cae260a1ba6737c36f396bf93684e5c9dcf"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:67b56d9f6d5f33532a4796249ba1d0487245302c6503e26033bf43848d4bdaad:
        aggregate_digest: "sha256:97ac1ce11bcaa1cd068d3120ccce3f8a2b38544b7e37fe1ee28508eb79747dd1"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:34:36.953Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_d0b3860a707ee45e536d8565"
          mutation_id: "compatibility:sha256:67b56d9f6d5f33532a4796249ba1d0487245302c6503e26033bf43848d4bdaad"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 25
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:67b56d9f6d5f33532a4796249ba1d0487245302c6503e26033bf43848d4bdaad"
        next_revision: 26
        previous_revision: 25
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:6ddfec8f59b4fc179f70d92202df8ce83188de879ce8cd8b5b7ab3ce54794187:
        aggregate_digest: "sha256:b26a572897eb0ce09c2264519038c586f34c80bfd3d275aaf56624d4f334313a"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T07:26:28.608Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_2e6c3ade6e46820d938e38f6"
          mutation_id: "compatibility:sha256:6ddfec8f59b4fc179f70d92202df8ce83188de879ce8cd8b5b7ab3ce54794187"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6ddfec8f59b4fc179f70d92202df8ce83188de879ce8cd8b5b7ab3ce54794187"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:7fd46877c9676c9bd3b31157c9c6efd0a63406ef0c91a13402263a69e6bec43c:
        aggregate_digest: "sha256:594c9a5d68ff1bf3d9cd1a6b9f19668f186b1248bd32ac96181d56b354b1108d"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:56:22.602Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e0f95dc54a1b0a4b092d9e6d"
          mutation_id: "compatibility:sha256:7fd46877c9676c9bd3b31157c9c6efd0a63406ef0c91a13402263a69e6bec43c"
          plan_digest: "sha256:4ec56c073b35030c3840014371f40207d7e07df4d9022dd4cbf552625de6c57a"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 29
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:7fd46877c9676c9bd3b31157c9c6efd0a63406ef0c91a13402263a69e6bec43c"
        next_revision: 30
        previous_revision: 29
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:897732e7461a8bdca3d82b5ce2e875cfb8a257ba2c4348f573f3840db4407135:
        aggregate_digest: "sha256:73eada8eda3f5b0d6a191877964f88eb6cd23ac684e8be09b10dcd026febce02"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:55:26.413Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_aade3d3093827f5f81436a25"
          mutation_id: "compatibility:sha256:897732e7461a8bdca3d82b5ce2e875cfb8a257ba2c4348f573f3840db4407135"
          plan_digest: "sha256:7bca7888a0204117a2799fbdc622e9f3a0f56e7819f7b5a6b814ba5cfdbfec22"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 26
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:897732e7461a8bdca3d82b5ce2e875cfb8a257ba2c4348f573f3840db4407135"
        next_revision: 27
        previous_revision: 26
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:94d87f3fee100fdb4dbe537a557768df4d481122822fac60cb8f06761fa45fe3:
        aggregate_digest: "sha256:008ae0b54905d21281959036d4829b805fccde1c4cc8ce799697be191e0031e5"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T00:14:09.587Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1888d3b835862f4281069d20"
          mutation_id: "compatibility:sha256:94d87f3fee100fdb4dbe537a557768df4d481122822fac60cb8f06761fa45fe3"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:94d87f3fee100fdb4dbe537a557768df4d481122822fac60cb8f06761fa45fe3"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:98e87bf31af29efefe5582198ffcd03238c4b7e3f289805b2bb49d2f2deed261:
        aggregate_digest: "sha256:5dd69a90569f4d3920c4511ef390a8cc0034182e35dca3345fc851a254c5806d"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:56:22.602Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_75a503563bd2d3ae4ae99855"
          mutation_id: "compatibility:sha256:98e87bf31af29efefe5582198ffcd03238c4b7e3f289805b2bb49d2f2deed261"
          plan_digest: "sha256:4ec56c073b35030c3840014371f40207d7e07df4d9022dd4cbf552625de6c57a"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 31
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:98e87bf31af29efefe5582198ffcd03238c4b7e3f289805b2bb49d2f2deed261"
        next_revision: 32
        previous_revision: 31
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:9dddc223495f8ae57bc8facbeced997dad8ae4fce9898c1f740d4eadc4d59b33:
        aggregate_digest: "sha256:6895e5083d5af084c8e224d9078e66fe3826928ddaa6bc2261c7b7a904d6f435"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T09:07:57.265Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_28615d849cbc3a09ff71991e"
          mutation_id: "compatibility:sha256:9dddc223495f8ae57bc8facbeced997dad8ae4fce9898c1f740d4eadc4d59b33"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9dddc223495f8ae57bc8facbeced997dad8ae4fce9898c1f740d4eadc4d59b33"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:a1d46146a1ccdf6d6a6c4944d31abd0beaae279a944dce238dd5aa85f4ccf2d3:
        aggregate_digest: "sha256:a65d33f8cdfec68d35721d4cbaec7dae084959dbdb632b6d4147b4dd1165d6df"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T10:26:38.290Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3bc7d4f9569c4a7e2bbaf57f"
          mutation_id: "compatibility:sha256:a1d46146a1ccdf6d6a6c4944d31abd0beaae279a944dce238dd5aa85f4ccf2d3"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 20
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a1d46146a1ccdf6d6a6c4944d31abd0beaae279a944dce238dd5aa85f4ccf2d3"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:b1eb690f5711a307cd89aa941be160771e9019a2a956c7799d4e83e0628e0374:
        aggregate_digest: "sha256:b009cd506e93d41830d7fe713c3dcc9114394dfe5980c0d68d7305a52834cca7"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:34:36.953Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_bb948b3621f28b9efbc5ebb9"
          mutation_id: "compatibility:sha256:b1eb690f5711a307cd89aa941be160771e9019a2a956c7799d4e83e0628e0374"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 23
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:b1eb690f5711a307cd89aa941be160771e9019a2a956c7799d4e83e0628e0374"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:b7c8d3eb2c4eca419e2d52ddff6c970d8365b24033512e5d5d80e6e948fbc10f:
        aggregate_digest: "sha256:6eed2d6c92c25d877becd3dad6c2fb36329bddb75b9e7702109894ac187ff7e9"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T11:34:36.953Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_6c8a2d32357ae0e1f9758a25"
          mutation_id: "compatibility:sha256:b7c8d3eb2c4eca419e2d52ddff6c970d8365b24033512e5d5d80e6e948fbc10f"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 24
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:b7c8d3eb2c4eca419e2d52ddff6c970d8365b24033512e5d5d80e6e948fbc10f"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:c46ff176c8880d44cff5bcd36f48699931fc4d0a1b8f09f1e98fb5fdd94711a5:
        aggregate_digest: "sha256:bc2474c1f98a4d9a2a6ef2862983186dfd4fe7965ce5539aa09eb418545ec49f"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:15:37.571Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_9c18666800b1e9b95f237c0c"
          mutation_id: "compatibility:sha256:c46ff176c8880d44cff5bcd36f48699931fc4d0a1b8f09f1e98fb5fdd94711a5"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c46ff176c8880d44cff5bcd36f48699931fc4d0a1b8f09f1e98fb5fdd94711a5"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:cf928ddf02e3e5d6413d5b5aa5a9fc2e07ef2ca858cfae93f78fd77ad7df6a8a:
        aggregate_digest: "sha256:bc488d76e34206a55c8fa41ef485adff3da984c2ddac3956c48b659381e5ae26"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T07:26:28.608Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_35b669f5f3fce7a7dd232716"
          mutation_id: "compatibility:sha256:cf928ddf02e3e5d6413d5b5aa5a9fc2e07ef2ca858cfae93f78fd77ad7df6a8a"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cf928ddf02e3e5d6413d5b5aa5a9fc2e07ef2ca858cfae93f78fd77ad7df6a8a"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609162254-YE48GC"
      compatibility:sha256:dc3da83107777c5ca588d41c5782275c05cc7b8e92e31bd8bfc375f707fb7c36:
        aggregate_digest: "sha256:5051047c62a02b2cf0668e0b814ee9c41f3ea424b61d45ca86e017165ac6e888"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:15:37.571Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_2aac97c99daaadaa92d898c1"
          mutation_id: "compatibility:sha256:dc3da83107777c5ca588d41c5782275c05cc7b8e92e31bd8bfc375f707fb7c36"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dc3da83107777c5ca588d41c5782275c05cc7b8e92e31bd8bfc375f707fb7c36"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609162254-YE48GC"
      external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d:
        aggregate_digest: "sha256:40c17bb222cc02e228e7bda1dd39395eb70b649e8a50f6432d3b5fd3ae121266"
        event:
          actor_id: "agentplane"
          at: "2026-09-16T23:15:40.039Z"
          cause_refs:
            - "semantic-result:sha256:2232ab0a3e9d1b52e784943203ff89564cccb75b974b07cbe4c851ac4bfd3228"
          entity: "work_item"
          from: "READY"
          id: "event_9a0e5edbcc29583c41c5b191"
          mutation_id: "external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "channel-and-owner-map"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-5bdef45ba2f2464245fcfd4d"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609162254-YE48GC"
      external-result:work-order-202609162254-YE48GC-executor-912a3cca93308f90df3d16a4:
        aggregate_digest: "sha256:c61dac060628ac00c887cdfc9989c7bc518ab054c44c4e25d9a6da54d2fe6169"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T10:40:47.503Z"
          cause_refs:
            - "semantic-result:sha256:74d6e13a5fe7dd91172523cac7ef9d8488e759967cfcc17f5db42657dfecfb07"
          entity: "work_item"
          from: "PLANNED"
          id: "event_85f0b721f3a1b7c92d6749cf"
          mutation_id: "external-result:work-order-202609162254-YE48GC-executor-912a3cca93308f90df3d16a4"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 22
          to: "COMPLETED"
          work_item_id: "migration-and-cutover"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-912a3cca93308f90df3d16a4"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609162254-YE48GC"
      external-result:work-order-202609162254-YE48GC-executor-941a121693a828bac7a9896e:
        aggregate_digest: "sha256:9335ebe6fd50915663adf085cb378b1bdc33f2dd9d626a3ceaefbd31816b7765"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T09:22:14.120Z"
          cause_refs:
            - "semantic-result:sha256:44c9fac33c76d2fda6dab01908558c235c4c89e93f0dff5327197484d4ea0e4c"
          entity: "work_item"
          from: "PLANNED"
          id: "event_33b812e3f95b9fd172bda3d3"
          mutation_id: "external-result:work-order-202609162254-YE48GC-executor-941a121693a828bac7a9896e"
          plan_digest: "sha256:9b89e63d8759e276dd34c14c12173e3cbe67bf44df885de03762eb29e868052b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 19
          to: "COMPLETED"
          work_item_id: "verification-identity"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-941a121693a828bac7a9896e"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609162254-YE48GC"
      external-result:work-order-202609162254-YE48GC-executor-b5679f4de4f3b712e1ab2ae8:
        aggregate_digest: "sha256:24a62e8a968d64ec059981cfd724ac7551b0521533b31f64247badc95f08ae30"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T07:40:34.408Z"
          cause_refs:
            - "semantic-result:sha256:73977094b03a319f9b6a7f1d7f47d6e2754f6ad38c7edecb60d8fc2a90e06e25"
          entity: "work_item"
          from: "PLANNED"
          id: "event_77b766510965a60c0f524650"
          mutation_id: "external-result:work-order-202609162254-YE48GC-executor-b5679f4de4f3b712e1ab2ae8"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 13
          to: "COMPLETED"
          work_item_id: "recipe-v1-conversion"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-b5679f4de4f3b712e1ab2ae8"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609162254-YE48GC"
      external-result:work-order-202609162254-YE48GC-executor-e6a0a0fcab02ca3cc55e660a:
        aggregate_digest: "sha256:9900da98a278ef10a0cc6b7e69adc4a1ad518b97b3ae73414afa777a85e1f499"
        event:
          actor_id: "agentplane"
          at: "2026-09-17T00:28:31.900Z"
          cause_refs:
            - "semantic-result:sha256:ed46ef308a6ea39792ae4a44858614afe065d03e06bc1d9fdd85877c072e8f67"
          entity: "work_item"
          from: "PLANNED"
          id: "event_c7e2149eaf19bf8d623007f7"
          mutation_id: "external-result:work-order-202609162254-YE48GC-executor-e6a0a0fcab02ca3cc55e660a"
          plan_digest: "sha256:d9b152a969152dd6cfaecb84aa966a466f3bb52795de73c2e49684358bdd2cfd"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609162254-YE48GC"
          task_revision: 10
          to: "COMPLETED"
          work_item_id: "native-obligations"
        mutation_id: "external-result:work-order-202609162254-YE48GC-executor-e6a0a0fcab02ca3cc55e660a"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609162254-YE48GC"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "bae683e0858e7580bf32f9fa12b27f8f0bfeffc6"
  task_execution_context:
    base_ref: "main"
    base_sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "19ff39fd292c30f0958131c35200a6268b7a285d"
    version: 1
id_source: "generated"
---
## Summary

Implement and qualify AgentPlane 0.7.10 Blueprint retirement

Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.

## Scope

- In scope: Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.10 Blueprint retirement".

## Plan

Implement the approved 0.7.10 Blueprint retirement as seven dependency-ordered internal WorkItems, preserving lifecycle and safety obligations, then qualify the installed artifact and prepare release metadata without publishing from this implementation task.

## Verify Steps

1. Run `node --test scripts/release/*.test.mjs` and `node --test scripts/checks/blueprint-retirement-map.test.mjs`. Expected: SemVer-stable channel promotion and the complete field/consumer/writer owner map pass.
2. Run the focused AgentPlane and Recipes tests added or updated for BP-02 through BP-28. Expected: native route, policy, authority, context, Recipe V1, verification identity, migration, cutover, and historical-audit parity and negative cases pass with nonzero executed tests.
3. Run `node --test scripts/checks/no-blueprint-engine.test.mjs` and `node --test scripts/checks/no-blueprint-cursor.test.mjs`. Expected: active imports, writers, prompt projections, mutation CLI, graph engine, and cursor are absent; only the explicit cold-decoder allowlist remains.
4. Run `bun run schemas:check`, `bun run agents:check`, `bun run docs:bootstrap:check`, and `bun run docs:onboarding:check`. Expected: generated assets, help/schema exports, policy routing, and compatibility documentation agree with the implemented 0.7.10 boundary.
5. Run `bun run package:install-smoke`, `bun run test:release:critical`, and `bun run arch:check`. Expected: the packed install passes direct, branch, context, recovery, Recipe V1, migration, historical-audit, stable-channel, release-critical, and architecture qualification.
6. Run `bun run bench:agent-efficiency:check` and `bun run bench:agent-efficiency:replay:check`. Expected: the benchmark corpus and replay are valid; M02 is marked `ESTABLISHED` only with matched paid 0.7.9/0.7.10 evidence, otherwise explicitly `NOT ESTABLISHED`.
7. Run `bun run ci:local:full`. Expected: full local CI succeeds after focused checks.
8. Perform independent semantic review. Expected: lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations remain equal or stronger; custom non-exact graphs are never guessed.
9. Inspect `git status --short --untracked-files=all` and the final diff. Expected: only approved task files and AgentPlane-owned task artifacts changed, with no secrets, generated drift, or unrelated modifications.
10. Require hosted CI/integration evidence before merge. Expected: all required provider checks pass against the exact PR head and `origin/main` contains the integrated commit before the implementation task is considered complete.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
