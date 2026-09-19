---
id: "202609191809-7KFNQT"
title: "Replace versioned README header generation with one static shared image"
result_summary: "Replaced versioned README header generation with one static shared image and removed related generators and gates."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.10"
  - "static-header"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "network"
verify:
  - "bun run docs:scripts:check"
  - "bun run docs:scripts:generate"
  - "bun run format:check"
  - "bun run release:check"
  - "bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-09-19T18:14:42.249Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-19T18:23:22.174Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:f3c78ddcda8db2ff30f86724cdbc983b8099be75ade6296c87b7a663c66c1e24"
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-19T18:14:42.249Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "001050d41ccb7b272bfa6167528577830f78e300"
  review_identity_digest: "sha256:acbac520e9023579115614fd6058960a940bdf28512409792884d21839f8efa0"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609191809-7KFNQT/7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67/quality-report.json"
  findings:
    - "Repository evidence binds the review to implementation commit 001050d41ccb7b272bfa6167528577830f78e300 and the intended 31-path product change set."
    - "All 13 current README consumers use the shared docs/assets/header.svg with correct relative or raw GitHub paths, and the shared SVG contains no visible release version."
    - "The per-surface SVG directory and generator are deleted; package scripts and the release gate no longer reference them."
    - "scripts/README.md is regenerated, the generic sequence fixture is neutral, and no historical release record below docs/releases/** changed."
token_usage:
  agent_runs: 0
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-09-19T20:35:43.991Z"
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
    authority_violations:
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:schema"
    changed_components:
      - "README.md"
      - "docs"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "schemas"
      - "scripts"
      - "skills"
    changed_paths:
      - "README.md"
      - "docs/README.md"
      - "docs/adr/README.md"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers/adr.svg"
      - "docs/assets/readme-headers/agentplane-cli.svg"
      - "docs/assets/readme-headers/agentplane.svg"
      - "docs/assets/readme-headers/core.svg"
      - "docs/assets/readme-headers/docs.svg"
      - "docs/assets/readme-headers/humanizer.svg"
      - "docs/assets/readme-headers/recipes.svg"
      - "docs/assets/readme-headers/releases.svg"
      - "docs/assets/readme-headers/schemas.svg"
      - "docs/assets/readme-headers/scripts.svg"
      - "docs/assets/readme-headers/skills.svg"
      - "docs/assets/readme-headers/spec.svg"
      - "docs/assets/readme-headers/testkit.svg"
      - "docs/releases/README.md"
      - "package.json"
      - "packages/agentplane/README.md"
      - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
      - "packages/core/README.md"
      - "packages/recipes/README.md"
      - "packages/spec/README.md"
      - "packages/testkit/README.md"
      - "schemas/README.md"
      - "scripts/README.md"
      - "scripts/generate/generate-readme-header.mjs"
      - "scripts/generate/generate-scripts-readme.mjs"
      - "skills/README.md"
      - "skills/humanizer/README.md"
    external_effects: []
    repository_effects:
      - "dependencies"
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
        result: "pass"
      -
        id: "recorded-check-14"
        result: "pass"
      -
        id: "recorded-check-15"
        result: "pass"
      -
        id: "recorded-check-16"
        result: "pass"
      -
        id: "recorded-check-17"
        result: "pass"
      -
        id: "recorded-check-18"
        result: "pass"
      -
        id: "recorded-check-19"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-20"
        result: "pass"
      -
        id: "recorded-check-21"
        result: "pass"
      -
        id: "recorded-check-22"
        result: "pass"
      -
        id: "recorded-check-23"
        result: "pass"
      -
        id: "recorded-check-24"
        result: "pass"
      -
        id: "recorded-check-25"
        result: "pass"
      -
        id: "recorded-check-26"
        result: "pass"
      -
        id: "recorded-check-27"
        result: "pass"
      -
        id: "recorded-check-28"
        result: "pass"
      -
        id: "recorded-check-29"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "observed_effect_dependencies"
    - "observed_effect_release_metadata"
    - "observed_effect_schema"
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
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
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
      digest: "sha256:e4c1465816c3b4aac8b0173f91ade3476789c59a65bc14a6dfa55bc783ad268d"
      escalation_reasons:
        - "central_path:package.json"
        - "central_path:packages/core/README.md"
        - "central_path:schemas/README.md"
        - "effect_dependencies"
        - "effect_release_metadata"
        - "effect_schema"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "README.md"
          - "docs"
          - "package.json"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "schemas"
          - "scripts"
          - "skills"
        changed_files:
          - "README.md"
          - "docs/README.md"
          - "docs/adr/README.md"
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers/adr.svg"
          - "docs/assets/readme-headers/agentplane-cli.svg"
          - "docs/assets/readme-headers/agentplane.svg"
          - "docs/assets/readme-headers/core.svg"
          - "docs/assets/readme-headers/docs.svg"
          - "docs/assets/readme-headers/humanizer.svg"
          - "docs/assets/readme-headers/recipes.svg"
          - "docs/assets/readme-headers/releases.svg"
          - "docs/assets/readme-headers/schemas.svg"
          - "docs/assets/readme-headers/scripts.svg"
          - "docs/assets/readme-headers/skills.svg"
          - "docs/assets/readme-headers/spec.svg"
          - "docs/assets/readme-headers/testkit.svg"
          - "docs/releases/README.md"
          - "package.json"
          - "packages/agentplane/README.md"
          - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
          - "packages/core/README.md"
          - "packages/recipes/README.md"
          - "packages/spec/README.md"
          - "packages/testkit/README.md"
          - "schemas/README.md"
          - "scripts/README.md"
          - "scripts/generate/generate-readme-header.mjs"
          - "scripts/generate/generate-scripts-readme.mjs"
          - "skills/README.md"
          - "skills/humanizer/README.md"
        external_effects: []
        repository_effects:
          - "dependencies"
          - "documentation"
          - "release_metadata"
          - "repository_write"
          - "schema"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "4114efcb7b93a2a21c817603e53d1c2a44ada820"
  message: "Merge remote-tracking branch 'origin/main' into task/202609191809-7KFNQT/canonical-7kfnqt"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: static shared header change passed local qualification and 14/14 hosted checks on synchronized PR #5974."
events:
  -
    type: "verify"
    at: "2026-09-19T18:23:22.174Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-09-19T20:35:43.991Z"
    author: "INTEGRATOR"
    from: "DONE"
    to: "DONE"
    note: "Verified: static shared header change passed local qualification and 14/14 hosted checks on synchronized PR #5974."
    commit: "4114efcb7b93a2a21c817603e53d1c2a44ada820"
doc_version: 3
doc_updated_at: "2026-09-19T20:35:43.991Z"
doc_updated_by: "INTEGRATOR"
description: "Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner."
sections:
  Summary: |-
    Replace versioned README header generation with one static shared image

    Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.
  Scope: |-
    - In scope: Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.
    - Out of scope: unrelated refactors not required for "Replace versioned README header generation with one static shared image".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Replace versioned README header generation with one static shared image". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Replace versioned README header generation with one static shared image". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-19T18:23:22.174Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f175782fadc51ec6818769b84795aabe286606b4aa35681af93f17277b388b08, input_digest=sha256:8d24ab155385670c358786487821f4b0536376f04b6199ebfbf4d54ec3ecf780

    Details:

    Check: affected_unit_integration
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (1/7)

    Check: affected_unit_integration
    Command: bun run docs:scripts:generate
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (2/7)

    Check: affected_unit_integration
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (3/7)

    Check: affected_unit_integration
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (4/7)

    Check: affected_unit_integration
    Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (5/7)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (6/7)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (7/7)

    Check: critical_paths
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (1/7)

    Check: critical_paths
    Command: bun run docs:scripts:generate
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (2/7)

    Check: critical_paths
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (3/7)

    Check: critical_paths
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (4/7)

    Check: critical_paths
    Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (5/7)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (6/7)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (7/7)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check full_regression

    Check: real_e2e
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (1/7)

    Check: real_e2e
    Command: bun run docs:scripts:generate
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (2/7)

    Check: real_e2e
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (3/7)

    Check: real_e2e
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (4/7)

    Check: real_e2e
    Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (5/7)

    Check: real_e2e
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (6/7)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (7/7)

    Check: task_outcome
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (1/7)

    Check: task_outcome
    Command: bun run docs:scripts:generate
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (2/7)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (3/7)

    Check: task_outcome
    Command: bun run release:check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (4/7)

    Check: task_outcome
    Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (5/7)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (6/7)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (7/7)

    NativeTaskIdentityRef:
    - plan_digest: sha256:65eda291cfa5cf158d6f2f644283c668c9d33fb63aed42af24217d2fd5426649
    - policy_digest: sha256:5c6334745d754efd91884099d829b1034f03a1e440378b149a5f5f7d101c4163
    - capability_digest: sha256:aeaf2f7d86b2f7492e081b8b78110c1e2c5e94c3635f797b45f901201097cfaf
    - checks_digest: sha256:7f111828bb5d6b46f40b3284a586456b304edfae5fd98418ea281b2ea2b4594f
    - identity_digest: sha256:1a2aaba0661928beb33614d89583466b3260df85f71d726c0cc5d4893b6ea100

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task plan set 202609191809-7KFNQT --text "<task-specific-plan>" --updated-by PLANNER
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:af06c44972e445943863961ae4481869312bb1d1c21d3ea9a492ef72675503b3"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609191809-7KFNQT/7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67/quality-report.json"
    findings:
      - "Repository evidence binds the review to implementation commit 001050d41ccb7b272bfa6167528577830f78e300 and the intended 31-path product change set."
      - "All 13 current README consumers use the shared docs/assets/header.svg with correct relative or raw GitHub paths, and the shared SVG contains no visible release version."
      - "The per-surface SVG directory and generator are deleted; package scripts and the release gate no longer reference them."
      - "scripts/README.md is regenerated, the generic sequence fixture is neutral, and no historical release record below docs/releases/** changed."
    implementation_commit: "001050d41ccb7b272bfa6167528577830f78e300"
    implementation_tree: "662c5595e2113fa192f439ece2981a2ff1e386de"
    projected_at: "2026-09-19T18:14:42.249Z"
    review_identity_digest: "sha256:acbac520e9023579115614fd6058960a940bdf28512409792884d21839f8efa0"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:f3c78ddcda8db2ff30f86724cdbc983b8099be75ade6296c87b7a663c66c1e24"
    work_order_id: "sha256:be2cba9cc8a78fa4d417d66700d91e05551c992bdf3d4aa132e62ccf10207933"
  implementation_commit:
    hash: "001050d41ccb7b272bfa6167528577830f78e300"
    message: "🚧 7KFNQT task: apply canonical agent result"
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
              - "git_read"
              - "repository_read"
              - "run_checks"
              - "workspace_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:cb62e52c0e46249e8a5729af5133658dd8774ac2c04ea7e00fedb211053bb17d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:65eda291cfa5cf158d6f2f644283c668c9d33fb63aed42af24217d2fd5426649"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:273b2ffe7f23dcaf80fd2579c9f32c0cb5c2b228d388c872a9c5841a253ed8af"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "README.md"
              - "docs/README.md"
              - "docs/adr/README.md"
              - "docs/assets/header.svg"
              - "docs/assets/readme-headers"
              - "docs/releases/README.md"
              - "package.json"
              - "packages/agentplane/README.md"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/core/README.md"
              - "packages/recipes/README.md"
              - "packages/spec/README.md"
              - "packages/testkit/README.md"
              - "schemas/README.md"
              - "scripts/README.md"
              - "scripts/generate/generate-readme-header.mjs"
              - "scripts/generate/generate-scripts-readme.mjs"
              - "skills/README.md"
              - "skills/humanizer/README.md"
            task_id: "202609191809-7KFNQT"
            validation_requirements:
              - "bun run docs:scripts:check"
              - "bun run docs:scripts:generate"
              - "bun run format:check"
              - "bun run release:check"
              - "bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "git diff --check"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "repository_read"
              - "run_checks"
              - "workspace_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:70f99a9740b79dfa1fc11b732c4270d923190828b319666f3aca82b74cab3e27"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:65eda291cfa5cf158d6f2f644283c668c9d33fb63aed42af24217d2fd5426649"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:273b2ffe7f23dcaf80fd2579c9f32c0cb5c2b228d388c872a9c5841a253ed8af"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:cb62e52c0e46249e8a5729af5133658dd8774ac2c04ea7e00fedb211053bb17d"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4b303f4fd24eeb1ba74811d7b27b981a9877789f0ec5196a64456326f71ca198"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "README.md"
              - "docs/README.md"
              - "docs/adr/README.md"
              - "docs/assets/header.svg"
              - "docs/assets/readme-headers"
              - "docs/releases/README.md"
              - "package.json"
              - "packages/agentplane/README.md"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/core/README.md"
              - "packages/recipes/README.md"
              - "packages/spec/README.md"
              - "packages/testkit/README.md"
              - "schemas/README.md"
              - "scripts/README.md"
              - "scripts/generate/generate-readme-header.mjs"
              - "scripts/generate/generate-scripts-readme.mjs"
              - "skills/README.md"
              - "skills/humanizer/README.md"
            task_id: "202609191809-7KFNQT"
            validation_requirements:
              - "bun run docs:scripts:check"
              - "bun run docs:scripts:generate"
              - "bun run format:check"
              - "bun run release:check"
              - "bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "git diff --check"
            work_item_id: null
          observation:
            changed_paths:
              - "README.md"
              - "docs/README.md"
              - "docs/adr/README.md"
              - "docs/assets/header.svg"
              - "docs/assets/readme-headers/adr.svg"
              - "docs/assets/readme-headers/agentplane-cli.svg"
              - "docs/assets/readme-headers/agentplane.svg"
              - "docs/assets/readme-headers/core.svg"
              - "docs/assets/readme-headers/docs.svg"
              - "docs/assets/readme-headers/humanizer.svg"
              - "docs/assets/readme-headers/recipes.svg"
              - "docs/assets/readme-headers/releases.svg"
              - "docs/assets/readme-headers/schemas.svg"
              - "docs/assets/readme-headers/scripts.svg"
              - "docs/assets/readme-headers/skills.svg"
              - "docs/assets/readme-headers/spec.svg"
              - "docs/assets/readme-headers/testkit.svg"
              - "docs/releases/README.md"
              - "package.json"
              - "packages/agentplane/README.md"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/core/README.md"
              - "packages/recipes/README.md"
              - "packages/spec/README.md"
              - "packages/testkit/README.md"
              - "schemas/README.md"
              - "scripts/README.md"
              - "scripts/generate/generate-readme-header.mjs"
              - "scripts/generate/generate-scripts-readme.mjs"
              - "skills/README.md"
              - "skills/humanizer/README.md"
            evidence_digest: "sha256:7c94fec89426c219eac407f3e226be39b61460c3704f4d5245ca36fd2b506748"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:273b2ffe7f23dcaf80fd2579c9f32c0cb5c2b228d388c872a9c5841a253ed8af"
        digest: "sha256:65eda291cfa5cf158d6f2f644283c668c9d33fb63aed42af24217d2fd5426649"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6f881a8288600b1eaf9efdb68ef3d817de7635538868059a536d98cfbfb32c40"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "workspace_write"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "README.md"
                - "package.json"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "docs/README.md"
                - "docs/adr/README.md"
                - "docs/releases/README.md"
                - "packages/agentplane/README.md"
                - "packages/core/README.md"
                - "packages/recipes/README.md"
                - "packages/spec/README.md"
                - "packages/testkit/README.md"
                - "scripts/README.md"
                - "scripts/generate/generate-readme-header.mjs"
                - "scripts/generate/generate-scripts-readme.mjs"
                - "schemas/README.md"
                - "skills/README.md"
                - "skills/humanizer/README.md"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            expected_outputs:
              - "implementation-and-verification"
            id: "static-header-migration"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:f3c78ddcda8db2ff30f86724cdbc983b8099be75ade6296c87b7a663c66c1e24"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:a3fe62d0404e38bbc8a10327e27cc5ce7b9e5da4c1ecae7182b1899bc4f177b9"
          environment_digest: "sha256:a1e6a18429e26747a5a48eacb6b05ea37b27ae561e0fb55a8f0e7802622aa8c6"
          implementation_identity: "sha256:4b303f4fd24eeb1ba74811d7b27b981a9877789f0ec5196a64456326f71ca198"
          toolchain_digest: "sha256:1be3e361c695ba40eebeaece36ccf4b301deba869e7a7ccfce4293fd6bbcafd6"
        observed_at: "2026-09-19T18:15:27.529Z"
        status: "PASSED"
      id: "202609191809-7KFNQT"
      intent_digest: "sha256:5d930a37a7bc53e4d4895a6e41659a2e514d01b3d74949b6543a01056b21c5f9"
      migration_receipts: []
      mutation_receipts:
        capture:202609191809-7KFNQT:
          after_revision: 1
          aggregate_digest: "sha256:cbff1d93b64dc7c3eaeb1dab5a049af747fa6181e5e0bd7dafeda70449365bda"
          before_revision: 0
          command_digest: "sha256:11305e951ea749e097417236dcf9797b1769ec8d21b0e36a0c06d309862f6442"
          effect_ids: []
          event_digests:
            - "sha256:dcff199bd0e88865fb1ab185779913b339cb57eb69005f5eb47371d931b375db"
          mutation_id: "capture:202609191809-7KFNQT"
        final-validation:sha256:f3c78ddcda8db2ff30f86724cdbc983b8099be75ade6296c87b7a663c66c1e24:11:
          after_revision: 12
          aggregate_digest: "sha256:de6c43f65b4aa1f4a4128d55e0edb4ca5473c2f2f85ba12059160e58716f3e4d"
          before_revision: 11
          command_digest: "sha256:73477a8ec718a0829c638afa76d78d1fb3baee3636b18d85e6db96d0a3aebbc6"
          effect_ids: []
          event_digests:
            - "sha256:fc8e8fe87db91f21e812edb858f8c9c0c63f1f1ad298c8bbf928d3b2002d93d0"
          mutation_id: "final-validation:sha256:f3c78ddcda8db2ff30f86724cdbc983b8099be75ade6296c87b7a663c66c1e24:11"
        kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:
          after_revision: 5
          aggregate_digest: "sha256:53a04ae09e4e1de75696aaabdc4f452316b4aef513851f736bffbd441e75f485"
          before_revision: 4
          command_digest: "sha256:b84435d9679b8e2a2d40a8d76c569fbd8433844d2e9f48bff1fa33a75184e0da"
          effect_ids: []
          event_digests:
            - "sha256:61a5bf50f654f91b62e2e337f4756871df72b13320a8c6bcb0c306a4805cab85"
          mutation_id: "kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:
          after_revision: 6
          aggregate_digest: "sha256:53a5acd76ffbbdcdcf6728944048294af2964d799e6cb97d562115f9894ccb84"
          before_revision: 5
          command_digest: "sha256:63db308cdfe1dc9aa3b6074051d1e502da62bb100b34b2e7691599e2f2768cf4"
          effect_ids: []
          event_digests:
            - "sha256:1ce2b52ed2cc32f4c9cd8d639baa7da19136d330d765dae67e0e9086ff49f1cd"
          mutation_id: "kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        kernel_work_item_inspection_required:sha256:e140ea43c905a06147dfa3281e8c50e2fe1ca376567f185bbc121bb9b96eed19:sha256:4b303f4fd24eeb1ba74811d7b27b981a9877789f0ec5196a64456326f71ca198:
          after_revision: 9
          aggregate_digest: "sha256:f16291b7f8c432efd84e0ca2b616efc7d37f8a07bc2fabc0d08bf0fd33f7072a"
          before_revision: 8
          command_digest: "sha256:21aaabd64b146eadfa044e8bc77962ef7a18238b8f1d768c6daf6961b29ceced"
          effect_ids: []
          event_digests:
            - "sha256:d82e0a7f309e46c1aa68b2f3b02987f5a2626f44969106f9e7dd7497a5da9176"
          mutation_id: "kernel_work_item_inspection_required:sha256:e140ea43c905a06147dfa3281e8c50e2fe1ca376567f185bbc121bb9b96eed19:sha256:4b303f4fd24eeb1ba74811d7b27b981a9877789f0ec5196a64456326f71ca198"
        kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:
          after_revision: 4
          aggregate_digest: "sha256:b000d13f58d8e74569b6ad3ac43c0dd9e8b9592216e7bdafefeadb3496fb8735"
          before_revision: 3
          command_digest: "sha256:5ea802f3f6c333fcd27bfd249945cdfab2a12f03b206eefd673558625861a26a"
          effect_ids: []
          event_digests:
            - "sha256:467d0f7a08aacbaf747f5a42143399e9d512dff82470bbeb7a48f4f8d9b22af2"
          mutation_id: "kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4:
          after_revision: 2
          aggregate_digest: "sha256:ca581e30b4ccd2595631c0022b18057fc9224410f97445cf1248481c581925cf"
          before_revision: 1
          command_digest: "sha256:a1f6df12f6fb64a21771ac3c098d623a75ab7b7bc494257a6dffbcfb1f890596"
          effect_ids: []
          event_digests:
            - "sha256:f100fdf26cf343cf86947f963e02892cdcf707fb323b52d56b1d1d7406d43627"
          mutation_id: "result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4"
        result:sha256:be2cba9cc8a78fa4d417d66700d91e05551c992bdf3d4aa132e62ccf10207933:
          after_revision: 8
          aggregate_digest: "sha256:4c4fa31f535ceaa2e9a145e5e62944ff345712aeef3a627d9bbe5595408ea50e"
          before_revision: 7
          command_digest: "sha256:a8bde84401f6ffd4b9c5b99ebe355e3e78ed79a66b416a861ae577d473baadb1"
          effect_ids: []
          event_digests:
            - "sha256:f9014562030da9ec3a44d0da40ac85175704b2d6fc1fc14b7a9441f08b7351b8"
          mutation_id: "result:sha256:be2cba9cc8a78fa4d417d66700d91e05551c992bdf3d4aa132e62ccf10207933"
        sha256:43fe799c5ff16eba36316816e9721ad92a7795c0b129f063a353efc569d1343f:
          after_revision: 7
          aggregate_digest: "sha256:bd1fd4c0765cff8ad6d2f73a20ab6ceae85c48015a9eea7ce11add3dc36ece4d"
          before_revision: 6
          command_digest: "sha256:2f107e51f5bf6de4742945f6ecd0b7af9ccca428385e610cb6ee590ddd52ba90"
          effect_ids: []
          event_digests:
            - "sha256:9421d73285639c091a48a9c6a4ad9fda8dede6405485d31aa96cd7c250882c7a"
          mutation_id: "sha256:43fe799c5ff16eba36316816e9721ad92a7795c0b129f063a353efc569d1343f"
        sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de:
          after_revision: 3
          aggregate_digest: "sha256:17576b4775ae9978d806353e5b18d3baab327eb54c4cf0c2e2e2eedd8aa0b10d"
          before_revision: 2
          command_digest: "sha256:dceafe89d2fe0191d0de3bcdfcf3f18314dbfc681cdccc22602c00c8621c6247"
          effect_ids: []
          event_digests:
            - "sha256:e8baf56ce90d95b63f75e78e4188620073b366993b4165ea4d2b3df48886564a"
          mutation_id: "sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de"
        validation-resolution:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67:
          after_revision: 11
          aggregate_digest: "sha256:f76ebd4623aa8189251ee9833f947df4854aab117ca1599020ad9f46c2e4ad54"
          before_revision: 10
          command_digest: "sha256:6dec5fae1ef10183769d54f934f3e727f54b090f001dcef22b988b797c2d2ddc"
          effect_ids: []
          event_digests:
            - "sha256:74f2989ea55e4a47b9a148983fe95ff5cc63d72cd4068471c692a98b2110f9e7"
          mutation_id: "validation-resolution:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67"
        validation:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67:
          after_revision: 10
          aggregate_digest: "sha256:1c9dba8995e709d7d4f7e083f149ba7ebd0f8075669b2919f3a5df1411c4b16b"
          before_revision: 9
          command_digest: "sha256:cc1061156058e3d45cf492005608111877521980b70dc93e66488f527dedc367"
          effect_ids: []
          event_digests:
            - "sha256:58ff7d8c2219d095b0cd34c76031e6abe6a9390d3c18a812842598c560703409"
          mutation_id: "validation:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67"
      plan_history: []
      revision: 12
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        static-header-migration:
          attempt: 1
          claim_id: "sha256:f2405a8b57bb3d0aa0b5d18baa30c411becfd19d0d95473b715eb528c45d5435"
          definition:
            contract_digest: "sha256:6f881a8288600b1eaf9efdb68ef3d817de7635538868059a536d98cfbfb32c40"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "workspace_write"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "README.md"
                - "package.json"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "docs/README.md"
                - "docs/adr/README.md"
                - "docs/releases/README.md"
                - "packages/agentplane/README.md"
                - "packages/core/README.md"
                - "packages/recipes/README.md"
                - "packages/spec/README.md"
                - "packages/testkit/README.md"
                - "scripts/README.md"
                - "scripts/generate/generate-readme-header.mjs"
                - "scripts/generate/generate-scripts-readme.mjs"
                - "schemas/README.md"
                - "skills/README.md"
                - "skills/humanizer/README.md"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            expected_outputs:
              - "implementation-and-verification"
            id: "static-header-migration"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:ef11ecf2202147dec926cd6475f5b75139d8651b10506f761e6053678ff6e2a6"
              id: "implementation-and-verification"
              kind: "repository_change_set"
              plan_revision: 1
              repository_fingerprint: "sha256:4b303f4fd24eeb1ba74811d7b27b981a9877789f0ec5196a64456326f71ca198"
              task_id: "202609191809-7KFNQT"
              work_item_id: "static-header-migration"
          result_digest: "sha256:88996d1bdc6449faa619cb18e9e01c8c3f32692bc7e9442d1a3c7a572fafaeeb"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:e75776de932f92c20e927661f169835326d3a564b1080b646154b94d3fdc83a6"
              - "sha256:acbac520e9023579115614fd6058960a940bdf28512409792884d21839f8efa0"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:a3fe62d0404e38bbc8a10327e27cc5ce7b9e5da4c1ecae7182b1899bc4f177b9"
              environment_digest: "sha256:b87f3697af446d8c1b2f1efd3d871fab7fec6fd8c26a5fc9a34442d9145946eb"
              implementation_identity: "sha256:88996d1bdc6449faa619cb18e9e01c8c3f32692bc7e9442d1a3c7a572fafaeeb"
              toolchain_digest: "sha256:efbfad3ebaab90e9853377b9f98eb1a9f2176936b29777c0cf0fef253e9cca30"
            observed_at: "2026-09-19T18:14:42.249Z"
            status: "PASSED"
    digest: "sha256:0860e6dae216e1a39e2eae58d20fcace12d2caf8bb8f7545b4361dd66d338483"
    documents:
      contracts:
        sha256:6f881a8288600b1eaf9efdb68ef3d817de7635538868059a536d98cfbfb32c40:
          acceptance_criteria:
            - "All 13 current README surfaces reference the shared versionless SVG through correct paths."
            - "Per-surface SVGs, the header generator, associated package scripts, and release gate are removed."
            - "scripts/README.md is regenerated and generic sequence coverage uses neutral fixtures."
            - "Historical records under docs/releases/** are unchanged and all declared checks pass."
          objective: "Replace all 13 current README header references with docs/assets/header.svg; remove visible version text from the shared SVG; delete per-surface SVGs and their generator; remove associated package scripts and the release:check dependency; regenerate scripts/README.md; replace retired script names in the generic sequence test with neutral fixtures; leave docs/releases/** historical records unchanged."
          role: "EXECUTOR"
          verification_commands:
            - "bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            - "bun run docs:scripts:generate"
            - "bun run docs:scripts:check"
            - "bun run format:check"
            - "bun run release:check"
            - "git diff --check"
      intent:
        context: "Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner."
        objective: "Replace versioned README header generation with one static shared image"
    events:
      -
        command_digest: "sha256:11305e951ea749e097417236dcf9797b1769ec8d21b0e36a0c06d309862f6442"
        id: "capture:202609191809-7KFNQT:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609191809-7KFNQT"
        occurred_at: "2026-09-19T18:09:05.311Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609191809-7KFNQT"
        task_revision: 1
      -
        command_digest: "sha256:a1f6df12f6fb64a21771ac3c098d623a75ab7b7bc494257a6dffbcfb1f890596"
        id: "result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4"
        occurred_at: "2026-09-19T18:09:56.889Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609191809-7KFNQT"
        task_revision: 2
      -
        command_digest: "sha256:dceafe89d2fe0191d0de3bcdfcf3f18314dbfc681cdccc22602c00c8621c6247"
        id: "sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de"
        occurred_at: "2026-09-19T18:10:07.322Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609191809-7KFNQT"
        task_revision: 3
      -
        command_digest: "sha256:5ea802f3f6c333fcd27bfd249945cdfab2a12f03b206eefd673558625861a26a"
        id: "kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        occurred_at: "2026-09-19T18:10:15.755Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609191809-7KFNQT"
        task_revision: 4
      -
        command_digest: "sha256:b84435d9679b8e2a2d40a8d76c569fbd8433844d2e9f48bff1fa33a75184e0da"
        id: "kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        occurred_at: "2026-09-19T18:10:19.684Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609191809-7KFNQT"
        task_revision: 5
      -
        command_digest: "sha256:63db308cdfe1dc9aa3b6074051d1e502da62bb100b34b2e7691599e2f2768cf4"
        id: "kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        occurred_at: "2026-09-19T18:10:43.280Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609191809-7KFNQT"
        task_revision: 6
      -
        command_digest: "sha256:2f107e51f5bf6de4742945f6ecd0b7af9ccca428385e610cb6ee590ddd52ba90"
        id: "sha256:43fe799c5ff16eba36316816e9721ad92a7795c0b129f063a353efc569d1343f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:43fe799c5ff16eba36316816e9721ad92a7795c0b129f063a353efc569d1343f"
        occurred_at: "2026-09-19T18:13:53.421Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609191809-7KFNQT"
        task_revision: 7
      -
        command_digest: "sha256:a8bde84401f6ffd4b9c5b99ebe355e3e78ed79a66b416a861ae577d473baadb1"
        id: "result:sha256:be2cba9cc8a78fa4d417d66700d91e05551c992bdf3d4aa132e62ccf10207933:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:be2cba9cc8a78fa4d417d66700d91e05551c992bdf3d4aa132e62ccf10207933"
        occurred_at: "2026-09-19T18:13:57.785Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609191809-7KFNQT"
        task_revision: 8
      -
        command_digest: "sha256:21aaabd64b146eadfa044e8bc77962ef7a18238b8f1d768c6daf6961b29ceced"
        id: "kernel_work_item_inspection_required:sha256:e140ea43c905a06147dfa3281e8c50e2fe1ca376567f185bbc121bb9b96eed19:sha256:4b303f4fd24eeb1ba74811d7b27b981a9877789f0ec5196a64456326f71ca198:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e140ea43c905a06147dfa3281e8c50e2fe1ca376567f185bbc121bb9b96eed19:sha256:4b303f4fd24eeb1ba74811d7b27b981a9877789f0ec5196a64456326f71ca198"
        occurred_at: "2026-09-19T18:14:01.097Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609191809-7KFNQT"
        task_revision: 9
      -
        command_digest: "sha256:cc1061156058e3d45cf492005608111877521980b70dc93e66488f527dedc367"
        id: "validation:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67"
        occurred_at: "2026-09-19T18:15:22.121Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609191809-7KFNQT"
        task_revision: 10
      -
        command_digest: "sha256:6dec5fae1ef10183769d54f934f3e727f54b090f001dcef22b988b797c2d2ddc"
        id: "validation-resolution:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7c31095e7ec464595dc2a183df23d7ec0ce2b45c18f713d1bfa1fcc479103c67"
        occurred_at: "2026-09-19T18:15:24.248Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609191809-7KFNQT"
        task_revision: 11
      -
        command_digest: "sha256:73477a8ec718a0829c638afa76d78d1fb3baee3636b18d85e6db96d0a3aebbc6"
        id: "final-validation:sha256:f3c78ddcda8db2ff30f86724cdbc983b8099be75ade6296c87b7a663c66c1e24:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:f3c78ddcda8db2ff30f86724cdbc983b8099be75ade6296c87b7a663c66c1e24:11"
        occurred_at: "2026-09-19T18:23:17.451Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609191809-7KFNQT"
        task_revision: 12
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Replace versioned README header generation with one static shared image

Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.

## Scope

- In scope: Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.
- Out of scope: unrelated refactors not required for "Replace versioned README header generation with one static shared image".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Replace versioned README header generation with one static shared image". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Replace versioned README header generation with one static shared image". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-19T18:23:22.174Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f175782fadc51ec6818769b84795aabe286606b4aa35681af93f17277b388b08, input_digest=sha256:8d24ab155385670c358786487821f4b0536376f04b6199ebfbf4d54ec3ecf780

Details:

Check: affected_unit_integration
Command: bun run docs:scripts:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (1/7)

Check: affected_unit_integration
Command: bun run docs:scripts:generate
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (2/7)

Check: affected_unit_integration
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (3/7)

Check: affected_unit_integration
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (4/7)

Check: affected_unit_integration
Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (5/7)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (6/7)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check affected_unit_integration (7/7)

Check: critical_paths
Command: bun run docs:scripts:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (1/7)

Check: critical_paths
Command: bun run docs:scripts:generate
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (2/7)

Check: critical_paths
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (3/7)

Check: critical_paths
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (4/7)

Check: critical_paths
Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (5/7)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (6/7)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check critical_paths (7/7)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check full_regression

Check: real_e2e
Command: bun run docs:scripts:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (1/7)

Check: real_e2e
Command: bun run docs:scripts:generate
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (2/7)

Check: real_e2e
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (3/7)

Check: real_e2e
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (4/7)

Check: real_e2e
Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (5/7)

Check: real_e2e
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (6/7)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check real_e2e (7/7)

Check: task_outcome
Command: bun run docs:scripts:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (1/7)

Check: task_outcome
Command: bun run docs:scripts:generate
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (2/7)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (3/7)

Check: task_outcome
Command: bun run release:check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (4/7)

Check: task_outcome
Command: bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (5/7)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (6/7)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609191809-7KFNQT/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609191809-7KFNQT Verification Contract check task_outcome (7/7)

NativeTaskIdentityRef:
- plan_digest: sha256:65eda291cfa5cf158d6f2f644283c668c9d33fb63aed42af24217d2fd5426649
- policy_digest: sha256:5c6334745d754efd91884099d829b1034f03a1e440378b149a5f5f7d101c4163
- capability_digest: sha256:aeaf2f7d86b2f7492e081b8b78110c1e2c5e94c3635f797b45f901201097cfaf
- checks_digest: sha256:7f111828bb5d6b46f40b3284a586456b304edfae5fd98418ea281b2ea2b4594f
- identity_digest: sha256:1a2aaba0661928beb33614d89583466b3260df85f71d726c0cc5d4893b6ea100

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task plan set 202609191809-7KFNQT --text "<task-specific-plan>" --updated-by PLANNER
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-09-19T20:35:43.991Z`
