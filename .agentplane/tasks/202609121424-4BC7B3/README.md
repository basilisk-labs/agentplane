---
id: "202609121424-4BC7B3"
title: "Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 29
origin:
  system: "manual"
depends_on:
  - "202609121423-9WPTCW"
  - "202609121424-ZEJ656"
  - "202609121424-T83XJA"
  - "202609121424-3YAX44"
tags:
  - "release-0.7.9"
  - "roadmap-st-18-20"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "credentials"
  - "external_system"
blueprint_request: "release.strict"
verify:
  - "bun run bench:agent-efficiency:check"
  - "bun run bench:agent-efficiency:replay:check"
  - "bun run docs:bootstrap:check"
  - "bun run docs:onboarding:check"
  - "bun run package:install-smoke"
  - "bun run package:tarball:check"
  - "bun run test:release:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-09-13T19:22:13.757Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:2baf501f688c40a1f9e656db7b6c8f3740c13e01cca5f467688bb095a6353b13"
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
    - "effect_credentials"
    - "effect_external_write"
    - "effect_release_metadata"
    - "observed_effect_dependencies"
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
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - "security_boundary"
    writable_roots:
      - "docs/developer/blueprints.mdx"
      - "docs/internal/v0.7-agent-efficiency-baseline.md"
      - "docs/user/commands.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "docs/user/workflow.mdx"
      - "package.json"
      - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/task-token-usage.test.ts"
      - "packages/agentplane/src/commands/task/task-token-usage.ts"
      - "scripts/baselines"
      - "scripts/bench"
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
      - "scripts/bench/paired-result-report.mjs"
      - "scripts/bench/paired-result-report.test.mjs"
  declaration:
    external_effects:
      - "credentials"
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "M01 must stop treating a subscription-backed Codex run as a monetary purchase and instead compare provider-observed token totals for every assigned attempt."
      - "Publication remains an operator-owned action after implementation, verification, hosted integration, and exact release evidence."
      - "The product contract must remain independent of user billing route: telemetry is always projected, while token-limit enforcement is opt-in and defaults to disabled."
      - "USER-approved blocked-result scope extension: roots=docs/internal/v0.7-agent-efficiency-baseline.md,scripts/baselines,scripts/bench; repository_effects=documentation,source_code,tests"
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/developer/blueprints.mdx"
      - "docs/internal/v0.7-agent-efficiency-baseline.md"
      - "docs/user/commands.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "docs/user/workflow.mdx"
      - "package.json"
      - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/task-token-usage.test.ts"
      - "packages/agentplane/src/commands/task/task-token-usage.ts"
      - "scripts/baselines"
      - "scripts/bench"
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
      - "scripts/bench/paired-result-report.mjs"
      - "scripts/bench/paired-result-report.test.mjs"
  observed:
    authority_violations:
      - "repository_effect:dependencies"
    changed_components:
      - "docs"
      - "scripts"
    changed_paths:
      - "docs/user/commands.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/authority.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/campaign.lock.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/evidence.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/agentplane.tgz"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/package-lock.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/package.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-candidate.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-minimal_agent.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-previous_release.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/report.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v1/target.bundle"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/authority.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/campaign.lock.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/disposition.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/evidence.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-candidate.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-minimal_agent.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-previous_release.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/report.json"
      - "scripts/baselines/m01-0.7.9-token-pilot-v2/target.bundle"
      - "scripts/bench/paired-live-codex-launcher.mjs"
      - "scripts/bench/paired-live-codex-launcher.test.mjs"
      - "scripts/bench/paired-m01-materialize.mjs"
      - "scripts/bench/paired-m01-materialize.test.mjs"
      - "scripts/bench/paired-m01-oracle.mjs"
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
      - "scripts/bench/paired-result-report.mjs"
      - "scripts/bench/paired-result-report.test.mjs"
    external_effects: []
    repository_effects:
      - "dependencies"
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_external_write"
    - "effect_release_metadata"
    - "observed_effect_dependencies"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "credentials"
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "docs/developer/blueprints.mdx"
          - "docs/internal/v0.7-agent-efficiency-baseline.md"
          - "docs/user/commands.mdx"
          - "docs/user/task-lifecycle.mdx"
          - "docs/user/workflow.mdx"
          - "package.json"
          - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/task/task-token-usage.test.ts"
          - "packages/agentplane/src/commands/task/task-token-usage.ts"
          - "scripts/baselines"
          - "scripts/bench"
          - "scripts/bench/paired-production-driver.mjs"
          - "scripts/bench/paired-production-driver.test.mjs"
          - "scripts/bench/paired-result-report.mjs"
          - "scripts/bench/paired-result-report.test.mjs"
        evidence_requirements:
          - "external_effect:credentials"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "credentials"
          - "external_write"
          - "network_read"
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:bab2623c9d169a51abe6bb5dfdbf80d9942956e9139f2130c98c1aa22b4371c2"
      escalation_reasons:
        - "central_component:package.json"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "effect_dependencies"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/authority.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/campaign.lock.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/evidence.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/agentplane.tgz"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/product-candidate.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/product-minimal_agent.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/product-previous_release.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/report.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v1/target.bundle"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/authority.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/campaign.lock.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/disposition.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/evidence.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/product-candidate.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/product-minimal_agent.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/product-previous_release.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/report.json"
        - "unknown_path:scripts/baselines/m01-0.7.9-token-pilot-v2/target.bundle"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "scripts"
        changed_files:
          - "docs/user/commands.mdx"
          - "docs/user/task-lifecycle.mdx"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/authority.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/campaign.lock.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/evidence.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/agentplane.tgz"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/package-lock.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/previous-runtime/package.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-candidate.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-minimal_agent.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/product-previous_release.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/report.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v1/target.bundle"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/authority.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/campaign.lock.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/disposition.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/evidence.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-candidate.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-minimal_agent.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/product-previous_release.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/report.json"
          - "scripts/baselines/m01-0.7.9-token-pilot-v2/target.bundle"
          - "scripts/bench/paired-live-codex-launcher.mjs"
          - "scripts/bench/paired-live-codex-launcher.test.mjs"
          - "scripts/bench/paired-m01-materialize.mjs"
          - "scripts/bench/paired-m01-materialize.test.mjs"
          - "scripts/bench/paired-m01-oracle.mjs"
          - "scripts/bench/paired-production-driver.mjs"
          - "scripts/bench/paired-production-driver.test.mjs"
          - "scripts/bench/paired-result-report.mjs"
          - "scripts/bench/paired-result-report.test.mjs"
        external_effects: []
        repository_effects:
          - "dependencies"
          - "documentation"
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
      - "external_effect:credentials"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
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
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The exact candidate at 58dbda0d5f88c8a83802c5aee3a9380d001dd4b2 passed all three assigned qualification checks. Work stopped after a supplemental npm pack invocation used the wrong path form, attempted read-only SSH access to github.com, and reported adding github.com to the user known_hosts file outside repository authority. Recommended action: Obtain explicit user authority before inspecting or correcting ~/.ssh/known_hosts and before removing the named temporary directory, then resume the task without repeating the unnecessary supplemental npm pack command. Agentplane receipt: external-agent-blocker/tr_c7e57460f0df0bbe21b8b544cabd58f6/sha256:1b66fd6ac9add715e7df287a56885820ebb364ce4d270eaa27e453804f5f6078."
  -
    author: "CODER"
    body: "Start: User authorized resuming the release qualification without SSH or known_hosts access; continue from the passed local checks."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1d38fc3e503b. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. M01 cannot be materialized or executed from the issued packet because required campaign identities and trusted live authority are absent. Recommended action: Split the work at the authority boundary. First, have the operator pin the numeric USD limit, cost basis, model and effort, exact three-task corpus and oracle, three immutable product artifacts, transport allocation, randomized pilot order, and fixed confirmation rule. Then issue a fresh WorkOrder with provider dispatch and credential authority and either a trusted launcher dependency or authority service. Execute each planned attempt once, retain failures, and report NOT ESTABLISHED whenever coverage remains insufficient. Agentplane receipt: external-agent-blocker/tr_54e19a92f915fd9bed95c10a755afc0c/sha256:e0032486587be5f54acc3aaf6d2de7d3f62460c2d6069d8df93f6e8c5a6a809b."
  -
    author: "HOST:codex:USER"
    body: "The user clarified that execution uses the existing ChatGPT Pro Codex subscription. No API credential, separate provider billing, or purchased credits are involved. Current account readback shows planType=pro, Codex weekly usage usedPercent=22, credits.hasCredits=false, credits.balance=0, and spendControlReached=false. Resume with a strict external spend cap of USD 0. Use only included Codex subscription allowance. Do not buy credits or use an API key."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The release owner replaced the paid-cost M01 assumption with subscription token accounting and disabled usage restrictions for 0.7.9, so the current WorkItem contract requires refinement before repository evidence can be written. Recommended action: Replace the M01 WorkItem with a token-accounting disposition. Record the current exact product identity and provider token field coverage. Mark Q02 NOT ESTABLISHED without an efficiency claim. Record the release owner's acceptance of that measurement debt. Keep token usage unrestricted by AgentPlane for 0.7.9. Agentplane receipt: external-agent-blocker/tr_0f1a9face2f308ea1fb552b62af0812b/sha256:0e5efc467cde01e78b12cea75039a43fdd75f6d711000fea2f1c72a154abd0ab."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4cd87b37e73f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The live M01 campaign cannot be executed reproducibly from the current scoped surface. ChatGPT-authenticated Codex is available, but the repository has neither an immutable M01 manifest nor a trusted live launcher that can supply authority and provider-attempt callbacks to the paired driver. Recommended action: Split the work at the measurement-tool boundary. Add and test a trusted ChatGPT-authenticated live launcher that binds the recorded user authority, executes the minimal-agent, v0.7.8, and exact-candidate artifacts against one fixed target and oracle, and converts Codex JSONL usage into the typed token_usage contract. Materialize and review the 15-attempt randomized manifest before dispatch. Then execute it once and retain all outcomes. If the release should not wait for that implementation, change the release acceptance to Q02 NOT ESTABLISHED and record explicit release-owner acceptance of the measurement debt. Requested scope: roots=docs/internal/v0.7-agent-efficiency-baseline.md,scripts/baselines,scripts/bench; repository effects=documentation,source_code,tests; request digest=sha256:dccc59c448e3628824e2eac935490d1294b0abdbe1371ab8b7e48b91e087e27f. Agentplane receipt: external-agent-blocker/tr_aef08c1c2c9042f4bf60e458d905fff9/sha256:ce6b89008e02fa60f96cc7cc3dddde2089bc0628006d1c719735241e3d4643f2/sha256:dccc59c448e3628824e2eac935490d1294b0abdbe1371ab8b7e48b91e087e27f."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: docs/internal/v0.7-agent-efficiency-baseline.md, scripts/baselines, scripts/bench; repository effects: documentation, source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c37d4da28481. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 0b8e70ef0ebc. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-13T18:34:45.254Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-13T18:38:11.903Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The exact candidate at 58dbda0d5f88c8a83802c5aee3a9380d001dd4b2 passed all three assigned qualification checks. Work stopped after a supplemental npm pack invocation used the wrong path form, attempted read-only SSH access to github.com, and reported adding github.com to the user known_hosts file outside repository authority. Recommended action: Obtain explicit user authority before inspecting or correcting ~/.ssh/known_hosts and before removing the named temporary directory, then resume the task without repeating the unnecessary supplemental npm pack command. Agentplane receipt: external-agent-blocker/tr_c7e57460f0df0bbe21b8b544cabd58f6/sha256:1b66fd6ac9add715e7df287a56885820ebb364ce4d270eaa27e453804f5f6078."
  -
    type: "status"
    at: "2026-09-13T18:40:46.850Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: User authorized resuming the release qualification without SSH or known_hosts access; continue from the passed local checks."
  -
    type: "status"
    at: "2026-09-13T18:42:58.465Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 1d38fc3e503b. CLI accepted one state-bound external-agent semantic result."
    commit: "1d38fc3e503b4e2a6d84c17817b82a09ab1fbe8e"
  -
    type: "status"
    at: "2026-09-13T18:48:19.729Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. M01 cannot be materialized or executed from the issued packet because required campaign identities and trusted live authority are absent. Recommended action: Split the work at the authority boundary. First, have the operator pin the numeric USD limit, cost basis, model and effort, exact three-task corpus and oracle, three immutable product artifacts, transport allocation, randomized pilot order, and fixed confirmation rule. Then issue a fresh WorkOrder with provider dispatch and credential authority and either a trusted launcher dependency or authority service. Execute each planned attempt once, retain failures, and report NOT ESTABLISHED whenever coverage remains insufficient. Agentplane receipt: external-agent-blocker/tr_54e19a92f915fd9bed95c10a755afc0c/sha256:e0032486587be5f54acc3aaf6d2de7d3f62460c2d6069d8df93f6e8c5a6a809b."
  -
    type: "status"
    at: "2026-09-13T18:58:48.418Z"
    author: "HOST:codex:USER"
    from: "BLOCKED"
    to: "DOING"
    note: "The user clarified that execution uses the existing ChatGPT Pro Codex subscription. No API credential, separate provider billing, or purchased credits are involved. Current account readback shows planType=pro, Codex weekly usage usedPercent=22, credits.hasCredits=false, credits.balance=0, and spendControlReached=false. Resume with a strict external spend cap of USD 0. Use only included Codex subscription allowance. Do not buy credits or use an API key."
  -
    type: "status"
    at: "2026-09-13T19:06:20.667Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The release owner replaced the paid-cost M01 assumption with subscription token accounting and disabled usage restrictions for 0.7.9, so the current WorkItem contract requires refinement before repository evidence can be written. Recommended action: Replace the M01 WorkItem with a token-accounting disposition. Record the current exact product identity and provider token field coverage. Mark Q02 NOT ESTABLISHED without an efficiency claim. Record the release owner's acceptance of that measurement debt. Keep token usage unrestricted by AgentPlane for 0.7.9. Agentplane receipt: external-agent-blocker/tr_0f1a9face2f308ea1fb552b62af0812b/sha256:0e5efc467cde01e78b12cea75039a43fdd75f6d711000fea2f1c72a154abd0ab."
  -
    type: "status"
    at: "2026-09-13T19:32:11.006Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4cd87b37e73f. CLI accepted one state-bound external-agent semantic result."
    commit: "4cd87b37e73f91597a296eb33abbfd286d6b7cb0"
  -
    type: "status"
    at: "2026-09-13T19:38:04.383Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The live M01 campaign cannot be executed reproducibly from the current scoped surface. ChatGPT-authenticated Codex is available, but the repository has neither an immutable M01 manifest nor a trusted live launcher that can supply authority and provider-attempt callbacks to the paired driver. Recommended action: Split the work at the measurement-tool boundary. Add and test a trusted ChatGPT-authenticated live launcher that binds the recorded user authority, executes the minimal-agent, v0.7.8, and exact-candidate artifacts against one fixed target and oracle, and converts Codex JSONL usage into the typed token_usage contract. Materialize and review the 15-attempt randomized manifest before dispatch. Then execute it once and retain all outcomes. If the release should not wait for that implementation, change the release acceptance to Q02 NOT ESTABLISHED and record explicit release-owner acceptance of the measurement debt. Requested scope: roots=docs/internal/v0.7-agent-efficiency-baseline.md,scripts/baselines,scripts/bench; repository effects=documentation,source_code,tests; request digest=sha256:dccc59c448e3628824e2eac935490d1294b0abdbe1371ab8b7e48b91e087e27f. Agentplane receipt: external-agent-blocker/tr_aef08c1c2c9042f4bf60e458d905fff9/sha256:ce6b89008e02fa60f96cc7cc3dddde2089bc0628006d1c719735241e3d4643f2/sha256:dccc59c448e3628824e2eac935490d1294b0abdbe1371ab8b7e48b91e087e27f."
  -
    type: "status"
    at: "2026-09-13T21:34:12.843Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c37d4da28481. CLI accepted one state-bound external-agent semantic result."
    commit: "c37d4da284813bc9c2cfd09defa6629e9df4b0c3"
  -
    type: "status"
    at: "2026-09-13T21:36:59.100Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0b8e70ef0ebc. CLI accepted one state-bound external-agent semantic result."
    commit: "0b8e70ef0ebce357a71eded9628f4264d5dd1b4d"
doc_version: 3
doc_updated_at: "2026-09-13T21:36:59.100Z"
doc_updated_by: "SUPERVISOR"
description: "Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review."
sections:
  Summary: |-
    Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20

    Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review.
  Scope: |-
    - In scope: Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review.
    - Out of scope: unrelated refactors not required for "Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20".
  Plan: "Prepared a revised 0.7.9 plan that treats provider token usage as account-independent informational telemetry, keeps token caps disabled by default, replaces M01 monetary-spend requirements with observed token evidence, and retains the release gates."
  Verify Steps: |-
    1. Run `bun run package:tarball:check`. Expected: the exact clean candidate tarball and package inventory pass with recorded package/source/runtime identities.
    2. Run `bun run package:install-smoke`. Expected: installed direct, branch, recovery, old-record, required-PLANNER, and required-EVALUATOR entrypoints retain frozen behavior.
    3. Run `bun run test:release:critical`. Expected: the complete release-critical corpus passes without weakened golden outcomes or disabled Blueprint writers.
    4. Run `bun run bench:agent-efficiency:check` and `bun run bench:agent-efficiency:replay:check`. Expected: committed baseline and replay evidence remain internally consistent.
    5. Review the M01 manifest, all-attempt raw evidence, paired report, fixed expansion decision, usage coverage, and separate product/target identities. Expected: no rerun-until-green or unsupported efficiency claim; insufficient coverage is reported as NOT ESTABLISHED.
    6. Run `bun run docs:bootstrap:check` and `bun run docs:onboarding:check`. Expected: observed-only 0.7.9 documentation and the 0.7.10-0.7.14 boundary are coherent and all deferred work names exact task IDs.
    7. Review `git diff --check`, the exact task diff, final status, and hosted integration for the accepted head. Expected: I01-I12 and C01-C08 remain conserved, publication is absent, and `agentplane-roadmap-r2` is not committed.
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
    approval_evidence_digest: "sha256:2baf501f688c40a1f9e656db7b6c8f3740c13e01cca5f467688bb095a6353b13"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:87ba4b00b43a0af5b05a830561b20dcfa3df2acb6c54cee5ee895ec6dd950d17"
    digest: "sha256:30f1306419be4723a9835a9df465dcbcb44b02f2decbaf0d65680d6fe047a6d7"
    grant_id: "0b3b0a83-7668-468e-81fe-2bd2622128bb"
    issued_at: "2026-09-13T19:22:13.757Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:3c5eb4aaec96a61f33846b10e3b57edcde079209060145200541739594e7e605"
    plan_revision: 17
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:99b2097c821f7fe115c5e0b644883ef2ef491aaae91ee487d2ae6eb4f84fc3c4"
    status: "active"
    task_id: "202609121424-4BC7B3"
  agentplane.scope_extension_request:
    applied_at: "2026-09-13T19:38:13.148Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:ce6b89008e02fa60f96cc7cc3dddde2089bc0628006d1c719735241e3d4643f2"
    kind: "task_scope_extension_request"
    request:
      rationale: "The paired driver intentionally requires injected live authority, while the repository has no production caller or provider token adapter. A reproducible M01 cannot be created only as baseline data."
      repository_effects:
        - "documentation"
        - "source_code"
        - "tests"
      schema_version: 1
      scope_roots:
        - "docs/internal/v0.7-agent-efficiency-baseline.md"
        - "scripts/baselines"
        - "scripts/bench"
    request_digest: "sha256:dccc59c448e3628824e2eac935490d1294b0abdbe1371ab8b7e48b91e087e27f"
    schema_version: 1
    status: "applied"
    transition_id: "tr_aef08c1c2c9042f4bf60e458d905fff9"
    work_item_id: "run-token-measured-m01"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-13T19:38:13.148Z"
        approved_by: "USER"
        approved_digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
        policy_facts:
          - "state_bound_scope_extension:sha256:dccc59c448e3628824e2eac935490d1294b0abdbe1371ab8b7e48b91e087e27f"
        state: "approved"
      created_at: "2026-09-13T19:38:13.148Z"
      digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
      proposal:
        assumptions:
          - "The release owner's latest instruction supersedes the roadmap's monetary-spend wording for 0.7.9 while preserving actual-token measurement, all-attempt accounting, independent verification, and uncertainty rules."
          - "Existing ChatGPT subscription authentication may be used for the authorized M01 provider calls without requiring an API key, credit purchase, or monetary budget."
          - "Token limits remain opt-in; the M01 run will not enable them, but existing non-token safety limits remain active."
          - "Release publication is a later operator-owned action and proceeds only after the final task head passes local checks, hosted integration, and exact distribution gates."
        planning_baseline:
          captured_at: "2026-09-13T19:06:55.629Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
          dirty_paths:
            - ".agentplane/tasks/202609121424-4BC7B3/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "94a114ea288a7ac608d9f42359ba26c3e5012f00"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:16"
        schema_version: 1
        task_id: "202609121424-4BC7B3"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
              id: "token-contract-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
              id: "paired-contract-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run package:tarball:check"
              id: "package-tarball"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run package:install-smoke"
              id: "package-install-smoke"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run test:release:critical"
              id: "release-critical"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:check"
              id: "efficiency-baseline"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:replay:check"
              id: "efficiency-replay"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run docs:bootstrap:check"
              id: "docs-bootstrap"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run docs:onboarding:check"
              id: "docs-onboarding"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              id: "exact-evidence-review"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "hosted-integration"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "token-contract-tests"
                - "exact-evidence-review"
              description: "Every completed AgentPlane task exposes provider token usage or an explicit partial/unavailable state independently of the user's authentication or billing route; token caps are null by default and can be enabled only by an explicit user action, while non-token safety limits remain active."
              id: "informational-token-contract"
              required: true
            -
              check_ids:
                - "paired-contract-tests"
                - "efficiency-baseline"
                - "efficiency-replay"
                - "exact-evidence-review"
              description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
              id: "m01-token-evidence"
              required: true
            -
              check_ids:
                - "package-tarball"
                - "package-install-smoke"
                - "release-critical"
              description: "The final exact 0.7.9 candidate is qualified through installed-package and release-critical checks without weakening golden outcomes or disabling Blueprint writers."
              id: "candidate-qualified"
              required: true
            -
              check_ids:
                - "docs-bootstrap"
                - "docs-onboarding"
                - "exact-evidence-review"
              description: "Documentation states the informational token contract, the observed M01 result or honest NOT ESTABLISHED disposition, and the exact deferred 0.7.10 through 0.7.14 boundary without monetary-account assumptions."
              id: "observed-documentation"
              required: true
            -
              check_ids:
                - "diff-check"
                - "exact-evidence-review"
                - "hosted-integration"
              description: "The final diff is scoped, preserves I01-I12 and C01-C08, excludes agentplane-roadmap-r2, and has verified hosted integration before publication."
              id: "release-ready-diff"
              required: true
          evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "token-contract-tests"
                    - "exact-evidence-review"
                  description: "Every completed AgentPlane task exposes provider token usage or an explicit partial/unavailable state independently of the user's authentication or billing route; token caps are null by default and can be enabled only by an explicit user action, while non-token safety limits remain active."
                  id: "informational-token-contract"
                  required: true
                -
                  check_ids:
                    - "paired-contract-tests"
                    - "efficiency-baseline"
                    - "efficiency-replay"
                    - "exact-evidence-review"
                  description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                  id: "m01-token-evidence"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "docs/user/commands.mdx"
                  - "docs/user/task-lifecycle.mdx"
                required_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/task/task-token-usage.ts"
                  - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
                  - "scripts/bench/paired-production-driver.mjs"
                  - "scripts/bench/paired-result-report.mjs"
                symbol_hints:
                  - "DEFAULT_SUPERVISOR_EXECUTION_BUDGET"
                  - "projectTaskTokenUsage"
                  - "input_tokens"
                  - "cached_input_tokens"
                  - "output_tokens"
                  - "reasoning_tokens"
                  - "total_tokens"
              depends_on: []
              expected_outputs:
                - "paired attempt token-usage contract"
                - "token cost-per-verified-result report"
                - "no monetary spend or billing-account dependency"
                - "default-disabled token-cap evidence"
                - "account-independent task telemetry evidence"
              id: "align-token-measurement-contract"
              objective: "Make the M01 measurement contract use provider-observed token usage instead of monetary raw cost and prove that task token telemetry is account-independent information while token caps remain disabled by default."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "task-worktree"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
                - "packages/agentplane/src/commands/task/task-token-usage.ts"
                - "packages/agentplane/src/commands/task/task-token-usage.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-result-report.mjs"
                - "scripts/bench/paired-result-report.test.mjs"
                - "docs/user/commands.mdx"
                - "docs/user/task-lifecycle.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
                    id: "token-contract-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
                    id: "paired-contract-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:check"
                    id: "efficiency-baseline"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:replay:check"
                    id: "efficiency-replay"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "exact-evidence-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "token-contract-tests"
                      - "exact-evidence-review"
                    description: "Every completed AgentPlane task exposes provider token usage or an explicit partial/unavailable state independently of the user's authentication or billing route; token caps are null by default and can be enabled only by an explicit user action, while non-token safety limits remain active."
                    id: "informational-token-contract"
                    required: true
                  -
                    check_ids:
                      - "paired-contract-tests"
                      - "efficiency-baseline"
                      - "efficiency-replay"
                      - "exact-evidence-review"
                    description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                    id: "m01-token-evidence"
                    required: true
                evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "paired-contract-tests"
                    - "efficiency-baseline"
                    - "efficiency-replay"
                    - "exact-evidence-review"
                  description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                  id: "m01-token-evidence"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources:
                  - "agentplane-roadmap-r2/tasks/ST-19.md"
                  - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
                required_sources:
                  - "scripts/bench/paired-production-driver.mjs"
                  - "scripts/bench/paired-result-report.mjs"
                  - "scripts/bench/internal/agent-efficiency-codex-runtime.mjs"
                  - "scripts/bench/run-agent-efficiency-codex-replay.mjs"
                symbol_hints:
                  - "M01"
                  - "PAIRED_CAMPAIGN_ARMS"
                  - "provider_usage"
                  - "minimum_paired_successes"
                  - "uncertainty_expansion"
              depends_on:
                - "align-token-measurement-contract"
              expected_outputs:
                - "immutable token-based campaign manifest"
                - "all-attempt provider token evidence"
                - "paired token-per-verified-result report"
                - "fixed expansion decision"
                - "observed efficiency result or honest NOT ESTABLISHED disposition"
              id: "run-token-measured-m01"
              objective: "Execute the preregistered paired pilot through the existing ChatGPT-authenticated Codex runtime with token caps disabled, retain every assigned attempt, and report only provider-observed token measurements and independently verified outcomes."
              optional: false
              priority: 2
              required_inputs:
                - "paired attempt token-usage contract"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "task-worktree"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/internal/v0.7-agent-efficiency-baseline.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
              risk: "high"
              scope_roots:
                - "docs/internal/v0.7-agent-efficiency-baseline.md"
                - "scripts/baselines"
                - "scripts/bench"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
                    id: "paired-contract-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:check"
                    id: "efficiency-baseline"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:replay:check"
                    id: "efficiency-replay"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "exact-evidence-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "paired-contract-tests"
                      - "efficiency-baseline"
                      - "efficiency-replay"
                      - "exact-evidence-review"
                    description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                    id: "m01-token-evidence"
                    required: true
                evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "package-tarball"
                    - "package-install-smoke"
                    - "release-critical"
                  description: "The final exact 0.7.9 candidate is qualified through installed-package and release-critical checks without weakening golden outcomes or disabling Blueprint writers."
                  id: "candidate-qualified"
                  required: true
                -
                  check_ids:
                    - "docs-bootstrap"
                    - "docs-onboarding"
                    - "exact-evidence-review"
                  description: "Documentation states the informational token contract, the observed M01 result or honest NOT ESTABLISHED disposition, and the exact deferred 0.7.10 through 0.7.14 boundary without monetary-account assumptions."
                  id: "observed-documentation"
                  required: true
                -
                  check_ids:
                    - "diff-check"
                    - "exact-evidence-review"
                    - "hosted-integration"
                  description: "The final diff is scoped, preserves I01-I12 and C01-C08, excludes agentplane-roadmap-r2, and has verified hosted integration before publication."
                  id: "release-ready-diff"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "agentplane-roadmap-r2/tasks/ST-20.md"
                  - "agentplane-roadmap-r2/releases/0.7.10.md"
                  - "agentplane-roadmap-r2/releases/0.7.11.md"
                  - "agentplane-roadmap-r2/releases/0.7.12.md"
                  - "agentplane-roadmap-r2/releases/0.7.13.md"
                  - "agentplane-roadmap-r2/releases/0.7.14.md"
                required_sources:
                  - "scripts/baselines/v0.7.9-stabilization-candidate.json"
                  - "docs/internal/v0.7-agent-efficiency-baseline.md"
                  - "docs/user/workflow.mdx"
                  - "docs/developer/blueprints.mdx"
                symbol_hints:
                  - "candidate"
                  - "M01"
                  - "Q02"
                  - "0.7.10"
                  - "0.7.14"
              depends_on:
                - "run-token-measured-m01"
              expected_outputs:
                - "final exact candidate identity"
                - "installed-package qualification evidence"
                - "observed 0.7.9 documentation"
                - "release readiness evidence"
              id: "qualify-and-document-final-candidate"
              objective: "Qualify the final exact 0.7.9 candidate after the token-contract change and document only observed behavior, measurements, uncertainty, and the deferred 0.7.10 through 0.7.14 boundary."
              optional: false
              priority: 3
              required_inputs:
                - "all-attempt provider token evidence"
                - "paired token-per-verified-result report"
                - "observed efficiency result or honest NOT ESTABLISHED disposition"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "task-worktree"
              risk: "medium"
              scope_roots:
                - "scripts/baselines/v0.7.9-stabilization-candidate.json"
                - "docs/internal/v0.7-agent-efficiency-baseline.md"
                - "docs/user/workflow.mdx"
                - "docs/developer/blueprints.mdx"
                - "package.json"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run package:tarball:check"
                    id: "package-tarball"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run package:install-smoke"
                    id: "package-install-smoke"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run test:release:critical"
                    id: "release-critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run docs:bootstrap:check"
                    id: "docs-bootstrap"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run docs:onboarding:check"
                    id: "docs-onboarding"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    id: "exact-evidence-review"
                    kind: "semantic"
                    required: true
                  -
                    capability: "task.verify"
                    id: "hosted-integration"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "package-tarball"
                      - "package-install-smoke"
                      - "release-critical"
                    description: "The final exact 0.7.9 candidate is qualified through installed-package and release-critical checks without weakening golden outcomes or disabling Blueprint writers."
                    id: "candidate-qualified"
                    required: true
                  -
                    check_ids:
                      - "docs-bootstrap"
                      - "docs-onboarding"
                      - "exact-evidence-review"
                    description: "Documentation states the informational token contract, the observed M01 result or honest NOT ESTABLISHED disposition, and the exact deferred 0.7.10 through 0.7.14 boundary without monetary-account assumptions."
                    id: "observed-documentation"
                    required: true
                  -
                    check_ids:
                      - "diff-check"
                      - "exact-evidence-review"
                      - "hosted-integration"
                    description: "The final diff is scoped, preserves I01-I12 and C01-C08, excludes agentplane-roadmap-r2, and has verified hosted integration before publication."
                    id: "release-ready-diff"
                    required: true
                evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202609121424-4BC7B3"
    event_cursor: 22
    final_validation: null
    id: "202609121424-4BC7B3"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run bench:agent-efficiency:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run bench:agent-efficiency:replay:check"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run docs:bootstrap:check"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run docs:onboarding:check"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "bun run package:install-smoke"
          id: "legacy-5"
          required: true
        -
          check_ids: []
          description: "bun run package:tarball:check"
          id: "legacy-6"
          required: true
        -
          check_ids: []
          description: "bun run test:release:critical"
          id: "legacy-7"
          required: true
      captured_at: "2026-09-12T14:24:52.881Z"
      constraints: []
      request: |-
        Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20

        Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review.
      task_id: "202609121424-4BC7B3"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-13T18:30:29.183Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-13T18:27:15.327Z"
        digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
        proposal:
          assumptions:
            - "The user's earlier explicit roadmap execution approval covers the separately bounded M01 provider spend and sandbox authority only after the exact manifest and current credentials are validated."
            - "Release publication, tagging, deployment, and distribution verification belong to the later operator-owned release task and are not part of 4BC7B3."
          planning_baseline:
            captured_at: "2026-09-13T18:20:41.670Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:03929816fcc660706e7bd46c09112a824e9fc6b0851d3394674e7d3ecf17bfd6"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - ".agentplane/tasks/202609130319-MHRRRF/README.md"
              - ".agentplane/tasks/202609130319-X96Z3Q/README.md"
              - ".agentplane/tasks/202609130320-EFMSMR/README.md"
              - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130320-EFMSMR/supervision/declared-checks.json"
              - ".agentplane/tasks/202609130352-Q99M4K/README.md"
              - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130402-QWV6VX/README.md"
              - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130402-QWV6VX/supervision/declared-checks.json"
              - ".agentplane/tasks/202609130414-G8VK36/README.md"
              - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130420-X9CKTH/README.md"
              - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130420-X9CKTH/supervision/declared-checks.json"
              - ".agentplane/tasks/202609130428-9GY63X/README.md"
              - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
              - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
              - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
              - ".agentplane/tasks/202609130428-9GY63X/supervision/declared-checks.json"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
              - "packages/agentplane/src/adapters/task-backend/kernel-plan-rejection-recovery.ts"
              - "packages/agentplane/src/cli/run-cli.roadmap-plan-recovery.test.ts"
            git:
              kind: "commit"
              ref: null
              sha: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run package:tarball:check"
                id: "package-tarball"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run package:install-smoke"
                id: "package-install-smoke"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run test:release:critical"
                id: "release-critical"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:check"
                id: "efficiency-baseline"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:replay:check"
                id: "efficiency-replay"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run docs:bootstrap:check"
                id: "docs-bootstrap"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run docs:onboarding:check"
                id: "docs-onboarding"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "exact-evidence-review"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "package-tarball"
                  - "package-install-smoke"
                  - "release-critical"
                description: "Build the exact clean 0.7.9 candidate, record package and runtime identities, and prove the installed direct, branch, recovery, old-record, required-PLANNER, and required-EVALUATOR corpus without weakening golden outcomes or disabling Blueprint writers."
                id: "candidate-qualified"
                required: true
              -
                check_ids:
                  - "efficiency-baseline"
                  - "efficiency-replay"
                  - "exact-evidence-review"
                description: "Run the preregistered M01 paired pilot only after validating the exact manifest and authority; preserve all attempts, fixed expansion decisions, product and target identities, usage coverage, and an honest NOT ESTABLISHED result when coverage is insufficient."
                id: "m01-evidence"
                required: true
              -
                check_ids:
                  - "docs-bootstrap"
                  - "docs-onboarding"
                  - "exact-evidence-review"
                description: "Document only observed 0.7.9 behavior and measurements, name deferred task IDs for the 0.7.10 through 0.7.14 boundary, remove adaptive shadow work from 0.7.9 dependencies, and keep publication outside this task."
                id: "observed-documentation"
                required: true
              -
                check_ids:
                  - "package-tarball"
                  - "package-install-smoke"
                  - "release-critical"
                  - "efficiency-baseline"
                  - "efficiency-replay"
                  - "docs-bootstrap"
                  - "docs-onboarding"
                  - "exact-evidence-review"
                  - "hosted-integration"
                description: "All declared local checks and exact evidence review pass, I01-I12 and C01-C08 remain conserved, the task diff excludes agentplane-roadmap-r2, and hosted integration is verified against the exact accepted head before closure."
                id: "release-evidence"
                required: true
            evidence_fingerprint: "sha256:03929816fcc660706e7bd46c09112a824e9fc6b0851d3394674e7d3ecf17bfd6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "package-tarball"
                      - "package-install-smoke"
                      - "release-critical"
                    description: "Build the exact clean 0.7.9 candidate, record package and runtime identities, and prove the installed direct, branch, recovery, old-record, required-PLANNER, and required-EVALUATOR corpus without weakening golden outcomes or disabling Blueprint writers."
                    id: "candidate-qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "scripts/qualification"
                    - "packages/agentplane/package.json"
                  required_sources:
                    - "agentplane-roadmap-r2/tasks/ST-18.md"
                    - "package.json"
                    - "scripts/release/check-package-tarball.mjs"
                    - "scripts/release/check-local-tarball-install-smoke.mjs"
                  symbol_hints:
                    - "package:tarball:check"
                    - "package:install-smoke"
                    - "test:release:critical"
                depends_on: []
                expected_outputs:
                  - "exact candidate identity"
                  - "package and runtime digests"
                  - "installed-entrypoint qualification evidence"
                  - "release-critical corpus evidence"
                id: "qualify-installed-candidate"
                objective: "From a clean exact candidate, exercise installed-package entrypoints and the frozen release-critical corpus, then record exact package, source, runtime, and check evidence without changing expected safety outcomes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "task-worktree"
                risk: "medium"
                scope_roots:
                  - "package.json"
                  - "scripts/release"
                  - "scripts/bench"
                  - "scripts/baselines"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run package:tarball:check"
                      id: "package-tarball"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run package:install-smoke"
                      id: "package-install-smoke"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run test:release:critical"
                      id: "release-critical"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                  criteria:
                    -
                      check_ids:
                        - "package-tarball"
                        - "package-install-smoke"
                        - "release-critical"
                      description: "Build the exact clean 0.7.9 candidate, record package and runtime identities, and prove the installed direct, branch, recovery, old-record, required-PLANNER, and required-EVALUATOR corpus without weakening golden outcomes or disabling Blueprint writers."
                      id: "candidate-qualified"
                      required: true
                  evidence_fingerprint: "sha256:03929816fcc660706e7bd46c09112a824e9fc6b0851d3394674e7d3ecf17bfd6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "efficiency-baseline"
                      - "efficiency-replay"
                      - "exact-evidence-review"
                    description: "Run the preregistered M01 paired pilot only after validating the exact manifest and authority; preserve all attempts, fixed expansion decisions, product and target identities, usage coverage, and an honest NOT ESTABLISHED result when coverage is insufficient."
                    id: "m01-evidence"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 180000
                  optional_sources:
                    - "scripts/bench/paired-production-driver.test.mjs"
                    - "scripts/bench/paired-result-report.test.mjs"
                    - "docs/internal/v0.7-agent-efficiency-baseline.md"
                  required_sources:
                    - "agentplane-roadmap-r2/tasks/ST-19.md"
                    - "agentplane-roadmap-r2/experiment-requirements.json"
                    - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
                    - "scripts/bench/paired-production-driver.mjs"
                    - "scripts/bench/paired-result-report.mjs"
                  symbol_hints:
                    - "M01"
                    - "PAIRED_CAMPAIGN_ARMS"
                    - "minimum_paired_successes"
                    - "uncertainty_expansion"
                depends_on:
                  - "qualify-installed-candidate"
                expected_outputs:
                  - "immutable campaign manifest"
                  - "all-attempt raw evidence"
                  - "paired result report"
                  - "separate product and target identities"
                  - "coverage and uncertainty disposition"
                id: "run-m01-paired-pilot"
                objective: "Materialize and validate the exact M01 campaign, then execute the live paired pilot under the approved budget and trusted authority check; retain every attempt and apply only the preregistered uncertainty expansion rule."
                optional: false
                priority: 2
                required_inputs:
                  - "exact candidate identity"
                  - "package and runtime digests"
                  - "installed-entrypoint qualification evidence"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "task-worktree"
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "m01-live-provider"
                risk: "high"
                scope_roots:
                  - "scripts/bench"
                  - "scripts/baselines"
                  - "docs/internal/v0.7-agent-efficiency-baseline.md"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:check"
                      id: "efficiency-baseline"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:replay:check"
                      id: "efficiency-replay"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "exact-evidence-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "efficiency-baseline"
                        - "efficiency-replay"
                        - "exact-evidence-review"
                      description: "Run the preregistered M01 paired pilot only after validating the exact manifest and authority; preserve all attempts, fixed expansion decisions, product and target identities, usage coverage, and an honest NOT ESTABLISHED result when coverage is insufficient."
                      id: "m01-evidence"
                      required: true
                  evidence_fingerprint: "sha256:03929816fcc660706e7bd46c09112a824e9fc6b0851d3394674e7d3ecf17bfd6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "docs-bootstrap"
                      - "docs-onboarding"
                      - "exact-evidence-review"
                    description: "Document only observed 0.7.9 behavior and measurements, name deferred task IDs for the 0.7.10 through 0.7.14 boundary, remove adaptive shadow work from 0.7.9 dependencies, and keep publication outside this task."
                    id: "observed-documentation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 180000
                  optional_sources:
                    - "docs/internal/v0.7-agent-efficiency-baseline.md"
                    - "scripts/baselines"
                  required_sources:
                    - "agentplane-roadmap-r2/tasks/ST-20.md"
                    - "agentplane-roadmap-r2/releases/0.7.10.md"
                    - "agentplane-roadmap-r2/releases/0.7.11.md"
                    - "agentplane-roadmap-r2/releases/0.7.12.md"
                    - "agentplane-roadmap-r2/releases/0.7.13.md"
                    - "agentplane-roadmap-r2/releases/0.7.14.md"
                    - "docs/user/workflow.mdx"
                    - "docs/developer/blueprints.mdx"
                  symbol_hints:
                    - "0.7.9"
                    - "0.7.10"
                    - "0.7.14"
                    - "adaptive shadow"
                    - "NOT ESTABLISHED"
                depends_on:
                  - "qualify-installed-candidate"
                  - "run-m01-paired-pilot"
                expected_outputs:
                  - "observed-only stabilization documentation"
                  - "explicit deferred-release boundary"
                  - "exact evidence audit with roadmap excluded from commit"
                id: "document-stabilization-boundary"
                objective: "Using only accepted qualification and M01 evidence, update the 0.7.9 stabilization status and the deferred 0.7.10-0.7.14 boundary, with exact task IDs and no publication action or unsupported efficiency claim."
                optional: false
                priority: 3
                required_inputs:
                  - "exact candidate identity"
                  - "release-critical corpus evidence"
                  - "paired result report"
                  - "coverage and uncertainty disposition"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "task-worktree"
                risk: "medium"
                scope_roots:
                  - "package.json"
                  - "docs/user/workflow.mdx"
                  - "docs/developer/blueprints.mdx"
                  - "docs/internal/v0.7-agent-efficiency-baseline.md"
                  - "scripts/baselines"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run docs:bootstrap:check"
                      id: "docs-bootstrap"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run docs:onboarding:check"
                      id: "docs-onboarding"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "exact-evidence-review"
                      kind: "semantic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "hosted-integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "docs-bootstrap"
                        - "docs-onboarding"
                        - "exact-evidence-review"
                      description: "Document only observed 0.7.9 behavior and measurements, name deferred task IDs for the 0.7.10 through 0.7.14 boundary, remove adaptive shadow work from 0.7.9 dependencies, and keep publication outside this task."
                      id: "observed-documentation"
                      required: true
                  evidence_fingerprint: "sha256:03929816fcc660706e7bd46c09112a824e9fc6b0851d3394674e7d3ecf17bfd6"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      -
        approval:
          approved_at: "2026-09-13T19:22:13.757Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-13T19:19:14.927Z"
        digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
        proposal:
          assumptions:
            - "The release owner's latest instruction supersedes the roadmap's monetary-spend wording for 0.7.9 while preserving actual-token measurement, all-attempt accounting, independent verification, and uncertainty rules."
            - "Existing ChatGPT subscription authentication may be used for the authorized M01 provider calls without requiring an API key, credit purchase, or monetary budget."
            - "Token limits remain opt-in; the M01 run will not enable them, but existing non-token safety limits remain active."
            - "Release publication is a later operator-owned action and proceeds only after the final task head passes local checks, hosted integration, and exact distribution gates."
          planning_baseline:
            captured_at: "2026-09-13T19:06:55.629Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
            dirty_paths:
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "94a114ea288a7ac608d9f42359ba26c3e5012f00"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:16"
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest run packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
                id: "token-contract-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
                id: "paired-contract-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run package:tarball:check"
                id: "package-tarball"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run package:install-smoke"
                id: "package-install-smoke"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run test:release:critical"
                id: "release-critical"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:check"
                id: "efficiency-baseline"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run bench:agent-efficiency:replay:check"
                id: "efficiency-replay"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run docs:bootstrap:check"
                id: "docs-bootstrap"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run docs:onboarding:check"
                id: "docs-onboarding"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "diff-check"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                id: "exact-evidence-review"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "token-contract-tests"
                  - "exact-evidence-review"
                description: "Every completed AgentPlane task exposes provider token usage or an explicit partial/unavailable state independently of the user's authentication or billing route; token caps are null by default and can be enabled only by an explicit user action, while non-token safety limits remain active."
                id: "informational-token-contract"
                required: true
              -
                check_ids:
                  - "paired-contract-tests"
                  - "efficiency-baseline"
                  - "efficiency-replay"
                  - "exact-evidence-review"
                description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                id: "m01-token-evidence"
                required: true
              -
                check_ids:
                  - "package-tarball"
                  - "package-install-smoke"
                  - "release-critical"
                description: "The final exact 0.7.9 candidate is qualified through installed-package and release-critical checks without weakening golden outcomes or disabling Blueprint writers."
                id: "candidate-qualified"
                required: true
              -
                check_ids:
                  - "docs-bootstrap"
                  - "docs-onboarding"
                  - "exact-evidence-review"
                description: "Documentation states the informational token contract, the observed M01 result or honest NOT ESTABLISHED disposition, and the exact deferred 0.7.10 through 0.7.14 boundary without monetary-account assumptions."
                id: "observed-documentation"
                required: true
              -
                check_ids:
                  - "diff-check"
                  - "exact-evidence-review"
                  - "hosted-integration"
                description: "The final diff is scoped, preserves I01-I12 and C01-C08, excludes agentplane-roadmap-r2, and has verified hosted integration before publication."
                id: "release-ready-diff"
                required: true
            evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "token-contract-tests"
                      - "exact-evidence-review"
                    description: "Every completed AgentPlane task exposes provider token usage or an explicit partial/unavailable state independently of the user's authentication or billing route; token caps are null by default and can be enabled only by an explicit user action, while non-token safety limits remain active."
                    id: "informational-token-contract"
                    required: true
                  -
                    check_ids:
                      - "paired-contract-tests"
                      - "efficiency-baseline"
                      - "efficiency-replay"
                      - "exact-evidence-review"
                    description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                    id: "m01-token-evidence"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 180000
                  optional_sources:
                    - "docs/user/commands.mdx"
                    - "docs/user/task-lifecycle.mdx"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                    - "packages/agentplane/src/commands/task/task-token-usage.ts"
                    - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
                    - "scripts/bench/paired-production-driver.mjs"
                    - "scripts/bench/paired-result-report.mjs"
                  symbol_hints:
                    - "DEFAULT_SUPERVISOR_EXECUTION_BUDGET"
                    - "projectTaskTokenUsage"
                    - "input_tokens"
                    - "cached_input_tokens"
                    - "output_tokens"
                    - "reasoning_tokens"
                    - "total_tokens"
                depends_on: []
                expected_outputs:
                  - "paired attempt token-usage contract"
                  - "token cost-per-verified-result report"
                  - "no monetary spend or billing-account dependency"
                  - "default-disabled token-cap evidence"
                  - "account-independent task telemetry evidence"
                id: "align-token-measurement-contract"
                objective: "Make the M01 measurement contract use provider-observed token usage instead of monetary raw cost and prove that task token telemetry is account-independent information while token caps remain disabled by default."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "task-worktree"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
                  - "packages/agentplane/src/commands/task/task-token-usage.ts"
                  - "packages/agentplane/src/commands/task/task-token-usage.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
                  - "scripts/bench/paired-production-driver.mjs"
                  - "scripts/bench/paired-production-driver.test.mjs"
                  - "scripts/bench/paired-result-report.mjs"
                  - "scripts/bench/paired-result-report.test.mjs"
                  - "docs/user/commands.mdx"
                  - "docs/user/task-lifecycle.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
                      id: "token-contract-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
                      id: "paired-contract-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:check"
                      id: "efficiency-baseline"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:replay:check"
                      id: "efficiency-replay"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "exact-evidence-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "token-contract-tests"
                        - "exact-evidence-review"
                      description: "Every completed AgentPlane task exposes provider token usage or an explicit partial/unavailable state independently of the user's authentication or billing route; token caps are null by default and can be enabled only by an explicit user action, while non-token safety limits remain active."
                      id: "informational-token-contract"
                      required: true
                    -
                      check_ids:
                        - "paired-contract-tests"
                        - "efficiency-baseline"
                        - "efficiency-replay"
                        - "exact-evidence-review"
                      description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                      id: "m01-token-evidence"
                      required: true
                  evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "paired-contract-tests"
                      - "efficiency-baseline"
                      - "efficiency-replay"
                      - "exact-evidence-review"
                    description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                    id: "m01-token-evidence"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "agentplane-roadmap-r2/tasks/ST-19.md"
                    - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
                  required_sources:
                    - "scripts/bench/paired-production-driver.mjs"
                    - "scripts/bench/paired-result-report.mjs"
                    - "scripts/bench/internal/agent-efficiency-codex-runtime.mjs"
                    - "scripts/bench/run-agent-efficiency-codex-replay.mjs"
                  symbol_hints:
                    - "M01"
                    - "PAIRED_CAMPAIGN_ARMS"
                    - "provider_usage"
                    - "minimum_paired_successes"
                    - "uncertainty_expansion"
                depends_on:
                  - "align-token-measurement-contract"
                expected_outputs:
                  - "immutable token-based campaign manifest"
                  - "all-attempt provider token evidence"
                  - "paired token-per-verified-result report"
                  - "fixed expansion decision"
                  - "observed efficiency result or honest NOT ESTABLISHED disposition"
                id: "run-token-measured-m01"
                objective: "Execute the preregistered paired pilot through the existing ChatGPT-authenticated Codex runtime with token caps disabled, retain every assigned attempt, and report only provider-observed token measurements and independently verified outcomes."
                optional: false
                priority: 2
                required_inputs:
                  - "paired attempt token-usage contract"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "task-worktree"
                risk: "high"
                scope_roots:
                  - "scripts/baselines"
                  - "docs/internal/v0.7-agent-efficiency-baseline.md"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
                      id: "paired-contract-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:check"
                      id: "efficiency-baseline"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run bench:agent-efficiency:replay:check"
                      id: "efficiency-replay"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "exact-evidence-review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "paired-contract-tests"
                        - "efficiency-baseline"
                        - "efficiency-replay"
                        - "exact-evidence-review"
                      description: "The paired campaign records actual input, cached-input, output, reasoning, and total token usage for every attempt, computes token cost per independently verified result without double-counting subsets, and has no required currency, price basis, purchase, credit, monetary spend, or default token cap."
                      id: "m01-token-evidence"
                      required: true
                  evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "package-tarball"
                      - "package-install-smoke"
                      - "release-critical"
                    description: "The final exact 0.7.9 candidate is qualified through installed-package and release-critical checks without weakening golden outcomes or disabling Blueprint writers."
                    id: "candidate-qualified"
                    required: true
                  -
                    check_ids:
                      - "docs-bootstrap"
                      - "docs-onboarding"
                      - "exact-evidence-review"
                    description: "Documentation states the informational token contract, the observed M01 result or honest NOT ESTABLISHED disposition, and the exact deferred 0.7.10 through 0.7.14 boundary without monetary-account assumptions."
                    id: "observed-documentation"
                    required: true
                  -
                    check_ids:
                      - "diff-check"
                      - "exact-evidence-review"
                      - "hosted-integration"
                    description: "The final diff is scoped, preserves I01-I12 and C01-C08, excludes agentplane-roadmap-r2, and has verified hosted integration before publication."
                    id: "release-ready-diff"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 180000
                  optional_sources:
                    - "agentplane-roadmap-r2/tasks/ST-20.md"
                    - "agentplane-roadmap-r2/releases/0.7.10.md"
                    - "agentplane-roadmap-r2/releases/0.7.11.md"
                    - "agentplane-roadmap-r2/releases/0.7.12.md"
                    - "agentplane-roadmap-r2/releases/0.7.13.md"
                    - "agentplane-roadmap-r2/releases/0.7.14.md"
                  required_sources:
                    - "scripts/baselines/v0.7.9-stabilization-candidate.json"
                    - "docs/internal/v0.7-agent-efficiency-baseline.md"
                    - "docs/user/workflow.mdx"
                    - "docs/developer/blueprints.mdx"
                  symbol_hints:
                    - "candidate"
                    - "M01"
                    - "Q02"
                    - "0.7.10"
                    - "0.7.14"
                depends_on:
                  - "run-token-measured-m01"
                expected_outputs:
                  - "final exact candidate identity"
                  - "installed-package qualification evidence"
                  - "observed 0.7.9 documentation"
                  - "release readiness evidence"
                id: "qualify-and-document-final-candidate"
                objective: "Qualify the final exact 0.7.9 candidate after the token-contract change and document only observed behavior, measurements, uncertainty, and the deferred 0.7.10 through 0.7.14 boundary."
                optional: false
                priority: 3
                required_inputs:
                  - "all-attempt provider token evidence"
                  - "paired token-per-verified-result report"
                  - "observed efficiency result or honest NOT ESTABLISHED disposition"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "task-worktree"
                risk: "medium"
                scope_roots:
                  - "scripts/baselines/v0.7.9-stabilization-candidate.json"
                  - "docs/internal/v0.7-agent-efficiency-baseline.md"
                  - "docs/user/workflow.mdx"
                  - "docs/developer/blueprints.mdx"
                  - "package.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run package:tarball:check"
                      id: "package-tarball"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run package:install-smoke"
                      id: "package-install-smoke"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run test:release:critical"
                      id: "release-critical"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run docs:bootstrap:check"
                      id: "docs-bootstrap"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run docs:onboarding:check"
                      id: "docs-onboarding"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "diff-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      id: "exact-evidence-review"
                      kind: "semantic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "hosted-integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "package-tarball"
                        - "package-install-smoke"
                        - "release-critical"
                      description: "The final exact 0.7.9 candidate is qualified through installed-package and release-critical checks without weakening golden outcomes or disabling Blueprint writers."
                      id: "candidate-qualified"
                      required: true
                    -
                      check_ids:
                        - "docs-bootstrap"
                        - "docs-onboarding"
                        - "exact-evidence-review"
                      description: "Documentation states the informational token contract, the observed M01 result or honest NOT ESTABLISHED disposition, and the exact deferred 0.7.10 through 0.7.14 boundary without monetary-account assumptions."
                      id: "observed-documentation"
                      required: true
                    -
                      check_ids:
                        - "diff-check"
                        - "exact-evidence-review"
                        - "hosted-integration"
                      description: "The final diff is scoped, preserves I01-I12 and C01-C08, excludes agentplane-roadmap-r2, and has verified hosted integration before publication."
                      id: "release-ready-diff"
                      required: true
                  evidence_fingerprint: "sha256:d096f3eff5e6679a97757a1f464df2e99ab89b7f88373534626c546eec6e3e47"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609121424-4BC7B3"
    revision: 29
    schema_version: 1
    updated_at: "2026-09-13T21:37:05.014Z"
    work_items:
      align-token-measurement-contract:
        attempt: 1
        claim_id: null
        id: "align-token-measurement-contract"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:14e1082447cf86a6738b353bf14126e18d270a4745550c7ca20aa7fa1419e2ca"
            id: "paired attempt token-usage contract"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609121424-4BC7B3"
              work_item_id: "align-token-measurement-contract"
            provenance:
              - "sha256:1d2162987ff17c715adf4cd5da9e3eb007c2e133b71b3618fe164655347fff70"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5c0887b079e249f24ae988186cf5c28ba0dcba08ac26b40328a15fad0c27410b"
            id: "token cost-per-verified-result report"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609121424-4BC7B3"
              work_item_id: "align-token-measurement-contract"
            provenance:
              - "sha256:1d2162987ff17c715adf4cd5da9e3eb007c2e133b71b3618fe164655347fff70"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:ed2aab9a406861e4273c4b6b8552862998ba112bd1cc778f88ed0a724b319416"
            id: "no monetary spend or billing-account dependency"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609121424-4BC7B3"
              work_item_id: "align-token-measurement-contract"
            provenance:
              - "sha256:1d2162987ff17c715adf4cd5da9e3eb007c2e133b71b3618fe164655347fff70"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:f3cf394fa8880abfaf68464ffb3d1fe7559c59d2265cc6a1abfbd7910d098579"
            id: "default-disabled token-cap evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609121424-4BC7B3"
              work_item_id: "align-token-measurement-contract"
            provenance:
              - "sha256:1d2162987ff17c715adf4cd5da9e3eb007c2e133b71b3618fe164655347fff70"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:b67a829b7545990daaa113b0a3ff9ea9de923a4ed7f018f37ea663e33b9c068c"
            id: "account-independent task telemetry evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609121424-4BC7B3"
              work_item_id: "align-token-measurement-contract"
            provenance:
              - "sha256:1d2162987ff17c715adf4cd5da9e3eb007c2e133b71b3618fe164655347fff70"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "token-contract-tests"
              command_identity: "bunx vitest run packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts."
              exit_code: 0
              observed_at: "2026-09-13T19:32:19.601Z"
              repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "paired-contract-tests"
              command_identity: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
              detail: "Observed by node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs."
              exit_code: 0
              observed_at: "2026-09-13T19:32:19.601Z"
              repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "efficiency-baseline"
              command_identity: "bun run bench:agent-efficiency:check"
              detail: "Observed by bun run bench:agent-efficiency:check."
              exit_code: 0
              observed_at: "2026-09-13T19:32:19.601Z"
              repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "efficiency-replay"
              command_identity: "bun run bench:agent-efficiency:replay:check"
              detail: "Observed by bun run bench:agent-efficiency:replay:check."
              exit_code: 0
              observed_at: "2026-09-13T19:32:19.601Z"
              repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "exact-evidence-review"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-13T19:32:19.601Z"
              repository_snapshot_digest: "sha256:e415fef1ff46edd881bf87a0700ea429d2339dfcd155a9d14cca1541e8e57e77"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      qualify-and-document-final-candidate:
        attempt: 0
        claim_id: null
        id: "qualify-and-document-final-candidate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      run-token-measured-m01:
        attempt: 1
        claim_id: null
        id: "run-token-measured-m01"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:139298557114a9c1ca97712d7826adc1a48bef66619574634b709423205b4cbd"
            id: "immutable token-based campaign manifest"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609121424-4BC7B3"
              work_item_id: "run-token-measured-m01"
            provenance:
              - "sha256:85e75618a6373b53481bf4e1cce311568a0aeb784794cb45b3852a9d05747fdd"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5382c3039a218cb00a6456ae6e84374309333b09dd09fe7de7f5547ba2271813"
            id: "all-attempt provider token evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609121424-4BC7B3"
              work_item_id: "run-token-measured-m01"
            provenance:
              - "sha256:85e75618a6373b53481bf4e1cce311568a0aeb784794cb45b3852a9d05747fdd"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:d89162b298eab1254ae7453d86044c813b03b0e70822ab4356400ed92417a9cf"
            id: "paired token-per-verified-result report"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609121424-4BC7B3"
              work_item_id: "run-token-measured-m01"
            provenance:
              - "sha256:85e75618a6373b53481bf4e1cce311568a0aeb784794cb45b3852a9d05747fdd"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:bde659597fb522e9609d31aaf221b8f964dee9f93a884788f5625161a0cadf5f"
            id: "fixed expansion decision"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609121424-4BC7B3"
              work_item_id: "run-token-measured-m01"
            provenance:
              - "sha256:85e75618a6373b53481bf4e1cce311568a0aeb784794cb45b3852a9d05747fdd"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:0892edd5c2a46c571f9445f682e4a7f727627d2afe91dcc5528305a509d7d0c0"
            id: "observed efficiency result or honest NOT ESTABLISHED disposition"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609121424-4BC7B3"
              work_item_id: "run-token-measured-m01"
            provenance:
              - "sha256:85e75618a6373b53481bf4e1cce311568a0aeb784794cb45b3852a9d05747fdd"
              - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "paired-contract-tests"
              command_identity: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
              detail: "Observed by node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs."
              exit_code: 0
              observed_at: "2026-09-13T21:37:04.992Z"
              repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "efficiency-baseline"
              command_identity: "bun run bench:agent-efficiency:check"
              detail: "Observed by bun run bench:agent-efficiency:check."
              exit_code: 0
              observed_at: "2026-09-13T21:37:04.992Z"
              repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "efficiency-replay"
              command_identity: "bun run bench:agent-efficiency:replay:check"
              detail: "Observed by bun run bench:agent-efficiency:replay:check."
              exit_code: 0
              observed_at: "2026-09-13T21:37:04.992Z"
              repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-4BC7B3/supervision/declared-checks.json"
              check_id: "exact-evidence-review"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-13T21:37:04.992Z"
              repository_snapshot_digest: "sha256:5e90ff3a5795e9ff5847d1013380275c3056bb571cc10a7761147a3aaee4ba4d"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-13T18:44:10.887Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:ea4136092c984036abae0bd6c5bdcc56ce78421119ef04cd4819c8e8faa31685"
        entity: "work_item"
        id: "event_42d247590f73b71295a899f8"
        mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-19aeac4acd405b02f1906430"
        plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-4BC7B3"
        task_revision: 11
        work_item_id: "qualify-installed-candidate"
      -
        at: "2026-09-13T19:32:19.611Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:a53955da9ad3d2e9e7548826be0b7f715736baf9a4c1d2ac777bc8860e2e51b7"
        entity: "work_item"
        id: "event_4f66f3e986d875eb92ef64de"
        mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-ae310ae6ef6d0c75257326f4"
        plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-4BC7B3"
        task_revision: 20
        work_item_id: "align-token-measurement-contract"
      -
        at: "2026-09-13T21:37:05.014Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:760557d71970e2cd783b7415d24d284359b51a791af2cd85555b7fd7244e34c8"
        entity: "work_item"
        id: "event_48e3510b94c676c5b5402688"
        mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-7e350f0fc88b736289e60b4b"
        plan_digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-4BC7B3"
        task_revision: 28
        work_item_id: "run-token-measured-m01"
    leases: []
    mutation_receipts:
      compatibility:sha256:0dddf989b0454ad8f05959a2f65d97cb039ebcdf0465feabfe1ba8424ffe8c6b:
        aggregate_digest: "sha256:6a457561e12bc59ff9a08141ef882a3b3e818f33644ba2efacef2cf66c333e47"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:38:04.383Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_c3f6187194f647cfdb5f57c1"
          mutation_id: "compatibility:sha256:0dddf989b0454ad8f05959a2f65d97cb039ebcdf0465feabfe1ba8424ffe8c6b"
          plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 23
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:0dddf989b0454ad8f05959a2f65d97cb039ebcdf0465feabfe1ba8424ffe8c6b"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:0fa9aaba0913cdfb37cac6f6019915bc1c80a2252e4f616765179f811a12f17f:
        aggregate_digest: "sha256:0af9ef26903a9b610dbed0f626e6fb453b8b686a019229209807d49c1e3aa346"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:42:58.465Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6fc7f43c9e4d409dcdcec981"
          mutation_id: "compatibility:sha256:0fa9aaba0913cdfb37cac6f6019915bc1c80a2252e4f616765179f811a12f17f"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:0fa9aaba0913cdfb37cac6f6019915bc1c80a2252e4f616765179f811a12f17f"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:227d351dedad36f32574e51784f3ded3e8cc92957227cdcf652a75b3e36c70e4:
        aggregate_digest: "sha256:37cf07aba4070711fddba4a0dfab4842ff97c37450daa4349d98e747f65e6e5b"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:30:02.492Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_38c780a51eac7e628147ec17"
          mutation_id: "compatibility:sha256:227d351dedad36f32574e51784f3ded3e8cc92957227cdcf652a75b3e36c70e4"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:227d351dedad36f32574e51784f3ded3e8cc92957227cdcf652a75b3e36c70e4"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:28f59ba66aab4504c0a75b088f7c2e9aef9a27e81d1895090be8c0d07d36930c:
        aggregate_digest: "sha256:eaac87cbcf350a40e8e610636686b66c2a49afede34ee5e7c6eb289999354391"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T21:34:12.843Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b57f451d77c7ac2e812344e9"
          mutation_id: "compatibility:sha256:28f59ba66aab4504c0a75b088f7c2e9aef9a27e81d1895090be8c0d07d36930c"
          plan_digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 24
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:28f59ba66aab4504c0a75b088f7c2e9aef9a27e81d1895090be8c0d07d36930c"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:2d1c326da2259b9c3bedae51c02afe278e42d2c486904e54dbcd8014a76c9c0d:
        aggregate_digest: "sha256:378bb6b296cbd499dc14caaf57b1205d8fd1dcb7d16f4224dad419db2391cb0b"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:38:04.383Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_33e680a3516ae3a17dbfc108"
          mutation_id: "compatibility:sha256:2d1c326da2259b9c3bedae51c02afe278e42d2c486904e54dbcd8014a76c9c0d"
          plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 21
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:2d1c326da2259b9c3bedae51c02afe278e42d2c486904e54dbcd8014a76c9c0d"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:4bafb4926232233c9c00eb13a0641ad8ff388b7ebc39af21f077708f408ea08a:
        aggregate_digest: "sha256:21659b53ed96b6c473593ec8d80eb5489c670839626bf657c4b640c7a5d77f19"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:32:11.006Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f562b885354e323e91b308de"
          mutation_id: "compatibility:sha256:4bafb4926232233c9c00eb13a0641ad8ff388b7ebc39af21f077708f408ea08a"
          plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4bafb4926232233c9c00eb13a0641ad8ff388b7ebc39af21f077708f408ea08a"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:5fcbe832331168f57d987324bb117d7fad864698335d83fc6492d4cdcad4b0a9:
        aggregate_digest: "sha256:f7b2a336b7833f274310337505d0f347d112b86ef81b137c6054f3f677df01e7"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:42:58.465Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_71d8f70719f168490f944ca6"
          mutation_id: "compatibility:sha256:5fcbe832331168f57d987324bb117d7fad864698335d83fc6492d4cdcad4b0a9"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5fcbe832331168f57d987324bb117d7fad864698335d83fc6492d4cdcad4b0a9"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:61adaadfe3fa61a154edea8b046e6743df0ad489f967acccfdc212bbea82cace:
        aggregate_digest: "sha256:5ff70bfd76616336ef4cf01fba498ac03e2e3db6753b09cac4af6cb4f9101eab"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T21:36:59.100Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_905042a7f9b405a0e7859e40"
          mutation_id: "compatibility:sha256:61adaadfe3fa61a154edea8b046e6743df0ad489f967acccfdc212bbea82cace"
          plan_digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 26
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:61adaadfe3fa61a154edea8b046e6743df0ad489f967acccfdc212bbea82cace"
        next_revision: 27
        previous_revision: 26
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:62ad2bafed44c3b78de28e359f74272b713dea66e5c4bda4e435477e3a630095:
        aggregate_digest: "sha256:600877520eb836aab7a95fabf365021f9196db111df271ab766d1b3866636caa"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:19:14.936Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_cd6b9d7545361c56a4a5d60e"
          mutation_id: "compatibility:sha256:62ad2bafed44c3b78de28e359f74272b713dea66e5c4bda4e435477e3a630095"
          plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:62ad2bafed44c3b78de28e359f74272b713dea66e5c4bda4e435477e3a630095"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:66eaee600704f66dac2eb8f24f9f953b2a09e427e86a50813c38da6a5c556170:
        aggregate_digest: "sha256:732d58209752f8bbb6dddc8596e868c40391ed347b68795aa9d59bcaa6f8b5f8"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:40:46.850Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_3ed51d62b5a1678388e51718"
          mutation_id: "compatibility:sha256:66eaee600704f66dac2eb8f24f9f953b2a09e427e86a50813c38da6a5c556170"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:66eaee600704f66dac2eb8f24f9f953b2a09e427e86a50813c38da6a5c556170"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:6a4833795aee284ab6d16835fb6f8f2cfd56a3d4e805124616b9069e6c1ed513:
        aggregate_digest: "sha256:f647e669cd9b4d9cf5cae66ee2ff291d916b28d4cf61784602b4c9f5fdb60da5"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:06:47.073Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_24aeb501a5e4282d1c5e1825"
          mutation_id: "compatibility:sha256:6a4833795aee284ab6d16835fb6f8f2cfd56a3d4e805124616b9069e6c1ed513"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 15
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:6a4833795aee284ab6d16835fb6f8f2cfd56a3d4e805124616b9069e6c1ed513"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:775f4d0f34fbb35e96f65475d7e58065d70b45671b2fda6699d5c9c3b7b75a53:
        aggregate_digest: "sha256:bc9700b42dcbf0cb34b0f28975816d26f7ff99508a7a183be6c11afbdc3fb54d"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:34:45.254Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_64979c8ad5cfe0e50c4fd8ea"
          mutation_id: "compatibility:sha256:775f4d0f34fbb35e96f65475d7e58065d70b45671b2fda6699d5c9c3b7b75a53"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:775f4d0f34fbb35e96f65475d7e58065d70b45671b2fda6699d5c9c3b7b75a53"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:8413aa3500735aa998fdd8c5168bc1d7163ede37c202ddd343dbfb7ad98ede81:
        aggregate_digest: "sha256:80cc6b24c382e089a1be6848881881d8707f99ebd2dfcfc41ebbec736d1dde56"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:30:02.494Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0d7c4026969a9167b81b9428"
          mutation_id: "compatibility:sha256:8413aa3500735aa998fdd8c5168bc1d7163ede37c202ddd343dbfb7ad98ede81"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8413aa3500735aa998fdd8c5168bc1d7163ede37c202ddd343dbfb7ad98ede81"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:9d2cf6ca4181886cf111370c3fd170a50bc384e1b1dd1b2143e25364b0e96a5c:
        aggregate_digest: "sha256:368f1a5ff0948cdd6345cd80c747954704a540ac47523ccbd2fc21b6d36bf30d"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:38:04.383Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_d08c243858648022db7450ad"
          mutation_id: "compatibility:sha256:9d2cf6ca4181886cf111370c3fd170a50bc384e1b1dd1b2143e25364b0e96a5c"
          plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 22
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:9d2cf6ca4181886cf111370c3fd170a50bc384e1b1dd1b2143e25364b0e96a5c"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:a5ce0241ff0d18a4f449db79fa958a0f9bc04ae5681fbe008da240d2d2681499:
        aggregate_digest: "sha256:591a307144c385bf4b5dfae9592f15b1dc61616095f6870df6018afdd2dd64e6"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:32:11.006Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f0c6a0752aa21960210fa6b7"
          mutation_id: "compatibility:sha256:a5ce0241ff0d18a4f449db79fa958a0f9bc04ae5681fbe008da240d2d2681499"
          plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 19
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a5ce0241ff0d18a4f449db79fa958a0f9bc04ae5681fbe008da240d2d2681499"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:b9dcc6f4aa5c8a487dc71b3b7541f7306f3a7d278d2175881ecaf2b38a26a0ae:
        aggregate_digest: "sha256:f21ce875ab32d613fa0ce85461b483894bcae13e9a8b501c24ddd0311d2d1877"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T21:36:59.100Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c77a28706ab24255c923c7c3"
          mutation_id: "compatibility:sha256:b9dcc6f4aa5c8a487dc71b3b7541f7306f3a7d278d2175881ecaf2b38a26a0ae"
          plan_digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 27
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b9dcc6f4aa5c8a487dc71b3b7541f7306f3a7d278d2175881ecaf2b38a26a0ae"
        next_revision: 28
        previous_revision: 27
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:c99a0dc1a8f9e9467aec4cd14a1916611bc60598220945e41274159d73e78e4a:
        aggregate_digest: "sha256:c53135b0065025423620d2defd398b80549cd20efffc488ca5c821a1208017e0"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:06:20.667Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_25aabe99ba8358def35d0c9b"
          mutation_id: "compatibility:sha256:c99a0dc1a8f9e9467aec4cd14a1916611bc60598220945e41274159d73e78e4a"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 14
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:c99a0dc1a8f9e9467aec4cd14a1916611bc60598220945e41274159d73e78e4a"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:dab724360fb18164a494278b798e8cd0cb1d295b6379e9f4269590f9b6a216bb:
        aggregate_digest: "sha256:96339fcd120e21741722429ef959ffa3b320148716102c1df97bc2b537281a01"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:30:02.494Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_b7d395bd40d346beb1454848"
          mutation_id: "compatibility:sha256:dab724360fb18164a494278b798e8cd0cb1d295b6379e9f4269590f9b6a216bb"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dab724360fb18164a494278b798e8cd0cb1d295b6379e9f4269590f9b6a216bb"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:db54420e92c044667fb07899113c97dfdabd041a20f4b8688ea1d73ffc4616fd:
        aggregate_digest: "sha256:ffa1dc93e328598ec9576bcc0696e77af577c0d8aaddb60e6ea4ed312d56e880"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T21:34:12.843Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4e35bfae3b9a4af5a27ceb83"
          mutation_id: "compatibility:sha256:db54420e92c044667fb07899113c97dfdabd041a20f4b8688ea1d73ffc4616fd"
          plan_digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 25
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:db54420e92c044667fb07899113c97dfdabd041a20f4b8688ea1d73ffc4616fd"
        next_revision: 26
        previous_revision: 25
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:e36635b19930b3f093b5e235aada2613356d81133a57c7cd2ad03f2f0c0506e6:
        aggregate_digest: "sha256:8cf429664d4fcd2fb0aaa366d8cfcc044267d1775577b7e00d67c2eb7c91271d"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:38:11.903Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3ea1c6315aedb2552818ef5a"
          mutation_id: "compatibility:sha256:e36635b19930b3f093b5e235aada2613356d81133a57c7cd2ad03f2f0c0506e6"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 7
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:e36635b19930b3f093b5e235aada2613356d81133a57c7cd2ad03f2f0c0506e6"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:f368660db3e8eaa9797b4615572bfd4f1c43553f0f96c66135ab3cf71ef8f36f:
        aggregate_digest: "sha256:1b0a91c6ee24cf9f544ed87306bdf82fb1befcd335e0b3b8a3e01b86f1d1a565"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:58:48.418Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_a82f2f2d8c5d9e1bdf2125b3"
          mutation_id: "compatibility:sha256:f368660db3e8eaa9797b4615572bfd4f1c43553f0f96c66135ab3cf71ef8f36f"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f368660db3e8eaa9797b4615572bfd4f1c43553f0f96c66135ab3cf71ef8f36f"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      compatibility:sha256:f47a5f1babbf2237bdc5b1bbbc9908707f31c9028d1fc4ba1fc244fe1257f717:
        aggregate_digest: "sha256:8b7a31dfa28f7bcd7beeb1eb23ea514bc453652e6e9fdab5c2c705b472b23250"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:48:19.729Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_85793a484fcd5cc97a676c6c"
          mutation_id: "compatibility:sha256:f47a5f1babbf2237bdc5b1bbbc9908707f31c9028d1fc4ba1fc244fe1257f717"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 12
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f47a5f1babbf2237bdc5b1bbbc9908707f31c9028d1fc4ba1fc244fe1257f717"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      external-result:work-order-202609121424-4BC7B3-executor-19aeac4acd405b02f1906430:
        aggregate_digest: "sha256:d5c80e5485f7a1ed1ebafacf75f96f0415b3540acd47aaaae48b110e436b7ec8"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T18:44:10.887Z"
          cause_refs:
            - "semantic-result:sha256:ea4136092c984036abae0bd6c5bdcc56ce78421119ef04cd4819c8e8faa31685"
          entity: "work_item"
          from: "READY"
          id: "event_42d247590f73b71295a899f8"
          mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-19aeac4acd405b02f1906430"
          plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 11
          to: "COMPLETED"
          work_item_id: "qualify-installed-candidate"
        mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-19aeac4acd405b02f1906430"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      external-result:work-order-202609121424-4BC7B3-executor-7e350f0fc88b736289e60b4b:
        aggregate_digest: "sha256:8dc0d1b1ae25264b2ffb2186b4f9e76f4e7c1db8ed0e76772ba0957e400bdae6"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T21:37:05.014Z"
          cause_refs:
            - "semantic-result:sha256:760557d71970e2cd783b7415d24d284359b51a791af2cd85555b7fd7244e34c8"
          entity: "work_item"
          from: "PLANNED"
          id: "event_48e3510b94c676c5b5402688"
          mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-7e350f0fc88b736289e60b4b"
          plan_digest: "sha256:8a1ce7a2f7c1bd5543bab4cf019887053321288654bc3dbf4761cc511f44fd52"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 28
          to: "COMPLETED"
          work_item_id: "run-token-measured-m01"
        mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-7e350f0fc88b736289e60b4b"
        next_revision: 29
        previous_revision: 28
        schema_version: 1
        task_id: "202609121424-4BC7B3"
      external-result:work-order-202609121424-4BC7B3-executor-ae310ae6ef6d0c75257326f4:
        aggregate_digest: "sha256:5fed680370d70104dded7e125664d80b75c4df31f17b5d44815f573c79bb25ab"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T19:32:19.611Z"
          cause_refs:
            - "semantic-result:sha256:a53955da9ad3d2e9e7548826be0b7f715736baf9a4c1d2ac777bc8860e2e51b7"
          entity: "work_item"
          from: "READY"
          id: "event_4f66f3e986d875eb92ef64de"
          mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-ae310ae6ef6d0c75257326f4"
          plan_digest: "sha256:357491668d26fbe1b3a253b693c182f2430296031f26c670fb31d1a4e704c630"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-4BC7B3"
          task_revision: 20
          to: "COMPLETED"
          work_item_id: "align-token-measurement-contract"
        mutation_id: "external-result:work-order-202609121424-4BC7B3-executor-ae310ae6ef6d0c75257326f4"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609121424-4BC7B3"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "0b8e70ef0ebce357a71eded9628f4264d5dd1b4d"
  task_execution_context:
    base_ref: "main"
    base_sha: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_planning_base_recovery:
    branch: "task/202609121424-4BC7B3/qualify-and-document-the-0-7-9-stabilization-can"
    from_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    observed_head: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
    plan_digest: "sha256:d6f15a7814a25b8ee8680aed0f2a48ed6eccdb956ce2d2b288ef2a573eb22190"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    revision: 5
    schema_version: 1
    state: "applied"
    target_sha: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
    task_id: "202609121424-4BC7B3"
    token: "sha256:388625d8170863e01a8be60ddaf10cde0e3fd9d7dd66334c77f32fa875819150"
    worktree: "/Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-4BC7B3-qualify-and-document-the-0-7-9-stabilization-can"
  workflow_route_baseline:
    start_head_sha: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
    version: 1
id_source: "generated"
---
## Summary

Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20

Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review.
- Out of scope: unrelated refactors not required for "Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20".

## Plan

Prepared a revised 0.7.9 plan that treats provider token usage as account-independent informational telemetry, keeps token caps disabled by default, replaces M01 monetary-spend requirements with observed token evidence, and retains the release gates.

## Verify Steps

1. Run `bun run package:tarball:check`. Expected: the exact clean candidate tarball and package inventory pass with recorded package/source/runtime identities.
2. Run `bun run package:install-smoke`. Expected: installed direct, branch, recovery, old-record, required-PLANNER, and required-EVALUATOR entrypoints retain frozen behavior.
3. Run `bun run test:release:critical`. Expected: the complete release-critical corpus passes without weakened golden outcomes or disabled Blueprint writers.
4. Run `bun run bench:agent-efficiency:check` and `bun run bench:agent-efficiency:replay:check`. Expected: committed baseline and replay evidence remain internally consistent.
5. Review the M01 manifest, all-attempt raw evidence, paired report, fixed expansion decision, usage coverage, and separate product/target identities. Expected: no rerun-until-green or unsupported efficiency claim; insufficient coverage is reported as NOT ESTABLISHED.
6. Run `bun run docs:bootstrap:check` and `bun run docs:onboarding:check`. Expected: observed-only 0.7.9 documentation and the 0.7.10-0.7.14 boundary are coherent and all deferred work names exact task IDs.
7. Review `git diff --check`, the exact task diff, final status, and hosted integration for the accepted head. Expected: I01-I12 and C01-C08 remain conserved, publication is absent, and `agentplane-roadmap-r2` is not committed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
