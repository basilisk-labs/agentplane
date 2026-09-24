---
id: "202609111340-MGB383"
title: "Harden the post-release evidence close-tail under branch protection for GitHub issue #4848"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "github-issue"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
blueprint_request: "release.strict"
verify:
  - "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-09-11T18:45:43.034Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:f98e5b47d56b1ba68efdd822b04e28d97a72d04ee6fa3a7ab585112dbcbabbea"
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
    - "effect_external_write"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
      - "release_metadata"
      - "repository_write"
      - "source_code"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "security_boundary"
    writable_roots:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/lib/next-development-version.mjs"
      - "scripts/release/open-next-development-version.mjs"
      - "scripts/workflow/verify-release-evidence-pr.mjs"
  declaration:
    external_effects:
      - "external_write"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch_pr route provides hosted validation for the changed workflow and release behavior."
      - "The repaired workflow opens and merges a protected pull request through GitHub."
      - "The task changes the stable publish workflow and release follow-up scripts."
    repository_effects:
      - "ci"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/lib/next-development-version.mjs"
      - "scripts/release/open-next-development-version.mjs"
      - "scripts/workflow/verify-release-evidence-pr.mjs"
  observed:
    authority_violations: []
    changed_components:
      - ".github"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
      - "scripts/lib/next-development-version.mjs"
      - "scripts/workflow/verify-release-evidence-pr.mjs"
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
    - "effect_external_write"
    - "effect_release_metadata"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          - "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/lib/next-development-version.mjs"
          - "scripts/release/open-next-development-version.mjs"
          - "scripts/workflow/verify-release-evidence-pr.mjs"
        evidence_requirements:
          - "external_effect:external_write"
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
        repository_effects:
          - "ci"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:1282777c20ff2cb54f9109b35a46a40fac81f76b01401e72444fd71c617b883e"
      escalation_reasons:
        - "central_component:.github/workflows/publish.yml"
        - "central_component:scripts/lib/next-development-version.mjs"
        - "central_component:scripts/release/open-next-development-version.mjs"
        - "central_component:scripts/workflow/verify-release-evidence-pr.mjs"
        - "central_path:.github/workflows/publish.yml"
        - "central_path:scripts/lib/next-development-version.mjs"
        - "central_path:scripts/workflow/verify-release-evidence-pr.mjs"
        - "effect_ci"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".github"
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          - "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
          - "scripts/lib/next-development-version.mjs"
          - "scripts/workflow/verify-release-evidence-pr.mjs"
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
      - "hosted_integration"
      - "repository_effect:ci"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "ab800d228f1a8ad14f0fe44654dbcddcf1266cfa"
  message: "🚧 MGB383 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2ce9ad411025. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: ab800d228f1a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-11T18:45:55.083Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-11T18:49:54.166Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    commit: "d47adfe6fb060256ad54bf95ff116a1a60b26b2d"
  -
    type: "status"
    at: "2026-09-11T18:51:27.640Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    commit: "6f127b5ad60646d6233d08ec333b16035bc40279"
  -
    type: "status"
    at: "2026-09-11T18:53:27.398Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2ce9ad411025. CLI accepted one state-bound external-agent semantic result."
    commit: "2ce9ad411025921a1b82b7f8b383501fd655d342"
  -
    type: "status"
    at: "2026-09-11T18:54:58.671Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ab800d228f1a. CLI accepted one state-bound external-agent semantic result."
    commit: "ab800d228f1a8ad14f0fe44654dbcddcf1266cfa"
doc_version: 3
doc_updated_at: "2026-09-11T18:54:58.671Z"
doc_updated_by: "SUPERVISOR"
description: "GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848"
sections:
  Summary: |-
    Harden the post-release evidence close-tail under branch protection for GitHub issue #4848

    GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848
  Scope: |-
    - In scope: GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848.
    - Out of scope: unrelated refactors not required for "Harden the post-release evidence close-tail under branch protection for GitHub issue #4848".
  Plan: "Prepared a bounded branch_pr plan for the release close-tail repair."
  Verify Steps: |-
    1. Run `bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1`. Expected: the next-development diff is Prettier-clean, the compatibility candidate refresh is covered, the publish workflow stages and gates all generated files, and native pull_request verification succeeds while action_required and empty rollups fail closed.
    2. Inspect the release-evidence close-tail diff. Expected: it does not create a synthetic success check, use admin bypass, or modify files outside the approved scope.
    3. Complete hosted integration for the exact task commit. Expected: required branch-protection checks pass and the pull request merges without bypass.
    4. Record final task-outcome evidence and `git status --short --untracked-files=all`. Expected: all required evidence is present and no unintended tracked changes or task-local artifacts remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:f98e5b47d56b1ba68efdd822b04e28d97a72d04ee6fa3a7ab585112dbcbabbea"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a1a6fcfb99704e8194c515dbe16cc42ec814d9042010dd9cfa9a94adcd121fd2"
    digest: "sha256:89a153528e21e002da4c1cf46b1bbc4f5c3016ed1c6c0a6a34911ee8e6fdbab2"
    grant_id: "0a2d500e-30ed-470a-a446-e9f84c00b2d3"
    issued_at: "2026-09-11T18:45:43.034Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ff0948c7df5380615f382821bcc32ac3aba7a0c127f21f69fd2a786fd93ba2b3"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:924fa491dbf622137be02ff38eccbc44fb902a6d91543353255cd15cedfc5d4c"
    status: "active"
    task_id: "202609111340-MGB383"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-11T18:45:43.034Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-11T18:44:37.585Z"
      digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
      proposal:
        assumptions:
          - "The existing compatibility candidate capture script remains the canonical generator."
          - "The existing release evidence pull request remains the only branch-protected close-tail path."
        planning_baseline:
          captured_at: "2026-09-11T18:41:19.270Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:e5d76a939ee0b62444fb44ed1c7fc038b24ea5865367d03fc6338b9d1f605659"
          dirty_paths:
            - ".agentplane/tasks/202609111340-MGB383/README.md"
            - ".agentplane/tasks/202609111341-FK9C2T/README.md"
            - ".agentplane/tasks/202609111341-SED9K5/README.md"
            - ".agentplane/tasks/202609111502-4XSWZQ/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "50b1810dda648be0c0762b47e885c6ad0b2d42af"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609111340-MGB383"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
              id: "check-focused-release"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "check-focused-release"
              description: "Opening the next development version produces a Prettier-clean diff and refreshes scripts/baselines/v0.7-compatibility-candidate.json when version surfaces advance."
              id: "criterion-generated-diff"
              required: true
            -
              check_ids:
                - "check-focused-release"
              description: "The publish close-tail stages every generated version and compatibility path and fails before push or PR creation when the generated contract is incomplete or dirty."
              id: "criterion-contract-gate"
              required: true
            -
              check_ids:
                - "check-focused-release"
              description: "The close-tail waits for the native pull_request Core CI rollup for the exact closure SHA and fails closed for action_required or an empty native rollup without creating a synthetic success check."
              id: "criterion-native-pr-check"
              required: true
            -
              check_ids:
                - "check-focused-release"
              description: "The workflow merges only through normal branch protection and does not use an admin bypass."
              id: "criterion-protection"
              required: true
            -
              check_ids:
                - "check-focused-release"
              description: "The final diff stays within the declared release close-tail scope and records residual findings explicitly."
              id: "criterion-scope"
              required: true
          evidence_fingerprint: "sha256:e5d76a939ee0b62444fb44ed1c7fc038b24ea5865367d03fc6338b9d1f605659"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused-release"
                  description: "Opening the next development version produces a Prettier-clean diff and refreshes scripts/baselines/v0.7-compatibility-candidate.json when version surfaces advance."
                  id: "criterion-generated-diff"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources: []
                required_sources:
                  - "scripts/lib/next-development-version.mjs"
                  - "scripts/bench/capture-compatibility-candidate.mjs"
                  - "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
                symbol_hints:
                  - "applyNextDevelopmentVersion"
                  - "changedPaths"
              depends_on: []
              expected_outputs:
                - "version-surfaces-output"
              id: "work-version-surfaces"
              objective: "Make the next-development mutation format generated files and refresh the compatibility candidate when version surfaces advance."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/next-development-version.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
              risk: "medium"
              scope_roots:
                - "scripts/lib/next-development-version.mjs"
                - "scripts/release/open-next-development-version.mjs"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "packages/agentplane/src/commands/release/open-next-development-version-script.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
                    id: "check-focused-release"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-focused-release"
                    description: "Opening the next development version produces a Prettier-clean diff and refreshes scripts/baselines/v0.7-compatibility-candidate.json when version surfaces advance."
                    id: "criterion-generated-diff"
                    required: true
                evidence_fingerprint: "sha256:e5d76a939ee0b62444fb44ed1c7fc038b24ea5865367d03fc6338b9d1f605659"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused-release"
                  description: "The close-tail waits for the native pull_request Core CI rollup for the exact closure SHA and fails closed for action_required or an empty native rollup without creating a synthetic success check."
                  id: "criterion-native-pr-check"
                  required: true
                -
                  check_ids:
                    - "check-focused-release"
                  description: "The workflow merges only through normal branch protection and does not use an admin bypass."
                  id: "criterion-protection"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "scripts/workflow/wait-remote-pr-checks.mjs"
                required_sources:
                  - "scripts/workflow/verify-release-evidence-pr.mjs"
                  - "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
                symbol_hints:
                  - "runListArgs"
                  - "discoverDispatchedRun"
                  - "publishRequiredCheck"
                  - "mergePullRequest"
              depends_on: []
              expected_outputs:
                - "native-pr-verification-output"
              id: "work-native-pr-verification"
              objective: "Replace synthetic workflow_dispatch evidence with the exact closure SHA native pull_request check rollup and fail closed for missing or action_required results."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/workflow/verify-release-evidence-pr.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
              risk: "high"
              scope_roots:
                - "scripts/workflow/verify-release-evidence-pr.mjs"
                - "packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
                    id: "check-focused-release"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-focused-release"
                    description: "The close-tail waits for the native pull_request Core CI rollup for the exact closure SHA and fails closed for action_required or an empty native rollup without creating a synthetic success check."
                    id: "criterion-native-pr-check"
                    required: true
                  -
                    check_ids:
                      - "check-focused-release"
                    description: "The workflow merges only through normal branch protection and does not use an admin bypass."
                    id: "criterion-protection"
                    required: true
                evidence_fingerprint: "sha256:e5d76a939ee0b62444fb44ed1c7fc038b24ea5865367d03fc6338b9d1f605659"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused-release"
                  description: "The publish close-tail stages every generated version and compatibility path and fails before push or PR creation when the generated contract is incomplete or dirty."
                  id: "criterion-contract-gate"
                  required: true
                -
                  check_ids:
                    - "check-focused-release"
                  description: "The workflow merges only through normal branch protection and does not use an admin bypass."
                  id: "criterion-protection"
                  required: true
                -
                  check_ids:
                    - "check-focused-release"
                  description: "The final diff stays within the declared release close-tail scope and records residual findings explicitly."
                  id: "criterion-scope"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "package.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                required_sources:
                  - ".github/workflows/publish.yml"
                  - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
                symbol_hints:
                  - "Apply release task evidence on a follow-up branch"
                  - "Push release evidence branch"
                  - "Open or recover release evidence PR"
                  - "Verify and merge exact release evidence SHA"
              depends_on:
                - "work-version-surfaces"
                - "work-native-pr-verification"
              expected_outputs:
                - "publish-contract-output"
              id: "work-publish-contract"
              objective: "Stage the refreshed generated surfaces and add a fail-closed contract gate before the release evidence branch is pushed or its pull request is opened."
              optional: false
              priority: 2
              required_inputs:
                - "version-surfaces-output"
                - "native-pr-verification-output"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: ".github/workflows/publish.yml"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              risk: "high"
              scope_roots:
                - ".github/workflows/publish.yml"
                - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
                    id: "check-focused-release"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-focused-release"
                    description: "The publish close-tail stages every generated version and compatibility path and fails before push or PR creation when the generated contract is incomplete or dirty."
                    id: "criterion-contract-gate"
                    required: true
                  -
                    check_ids:
                      - "check-focused-release"
                    description: "The workflow merges only through normal branch protection and does not use an admin bypass."
                    id: "criterion-protection"
                    required: true
                  -
                    check_ids:
                      - "check-focused-release"
                    description: "The final diff stays within the declared release close-tail scope and records residual findings explicitly."
                    id: "criterion-scope"
                    required: true
                evidence_fingerprint: "sha256:e5d76a939ee0b62444fb44ed1c7fc038b24ea5865367d03fc6338b9d1f605659"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609111340-MGB383"
    event_cursor: 10
    final_validation: null
    id: "202609111340-MGB383"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-11T13:40:47.769Z"
      constraints: []
      request: |-
        Harden the post-release evidence close-tail under branch protection for GitHub issue #4848

        GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848
      task_id: "202609111340-MGB383"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 15
    schema_version: 1
    updated_at: "2026-09-11T18:55:04.446Z"
    work_items:
      work-native-pr-verification:
        attempt: 1
        claim_id: null
        id: "work-native-pr-verification"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:8c6d57566af22d68984aea8eedb518ab23169168da9224a6087a0ec7eeb290f0"
            id: "native-pr-verification-output"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609111340-MGB383"
              work_item_id: "work-native-pr-verification"
            provenance:
              - "sha256:e0d723d1fc657bead9df88304b8e4fc63bb42c2466449f6e054fbc5704089f22"
              - ".agentplane/tasks/202609111340-MGB383/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:3adb6c36806026873593f94dde3d572023e8c16551ee70858062285ba94fa53f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609111340-MGB383/supervision/declared-checks.json"
              check_id: "check-focused-release"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
              detail: "Observed by bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-11T18:51:38.727Z"
              repository_snapshot_digest: "sha256:3adb6c36806026873593f94dde3d572023e8c16551ee70858062285ba94fa53f"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      work-publish-contract:
        attempt: 1
        claim_id: null
        id: "work-publish-contract"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a90f021a389e4024216e23263fe2e30f407d870e9144910c3e64bbc2190143df"
            id: "publish-contract-output"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609111340-MGB383"
              work_item_id: "work-publish-contract"
            provenance:
              - "sha256:ee74b738cc1121205598dbd5d90749598f4c8cc9e3f7cb4ff63846a4d00be064"
              - ".agentplane/tasks/202609111340-MGB383/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:852bfa000dc552f63672c984f8f572697df4ce8fe3641a572f30231a13a12dfe"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609111340-MGB383/supervision/declared-checks.json"
              check_id: "check-focused-release"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
              detail: "Observed by bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-11T18:55:04.439Z"
              repository_snapshot_digest: "sha256:852bfa000dc552f63672c984f8f572697df4ce8fe3641a572f30231a13a12dfe"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      work-version-surfaces:
        attempt: 1
        claim_id: null
        id: "work-version-surfaces"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a66f81c22d2e046eac1dd705cd52388652d3e2d0aac7b401d1c09637ea80e90a"
            id: "version-surfaces-output"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609111340-MGB383"
              work_item_id: "work-version-surfaces"
            provenance:
              - "sha256:2ec5376fd9b14961437c5531371012bf86e5eb1d8341600d6f1aae6b9b0df999"
              - ".agentplane/tasks/202609111340-MGB383/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:b549cd9a4d2460a47b45d6268f874d41b73b622949a7b86105ae1287ad9f34eb"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609111340-MGB383/supervision/declared-checks.json"
              check_id: "check-focused-release"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1"
              detail: "Observed by bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-11T18:53:32.561Z"
              repository_snapshot_digest: "sha256:b549cd9a4d2460a47b45d6268f874d41b73b622949a7b86105ae1287ad9f34eb"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-11T18:51:38.731Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:1efaf19c4c309374d1bb4e5facd4ed64cda3ec8b4f9954a6f31e9f30fdf1e159"
        entity: "work_item"
        id: "event_c8890d5be130b65a42079c0a"
        mutation_id: "external-result:work-order-202609111340-MGB383-executor-45a8e43f6c5503dd1507e90d"
        plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111340-MGB383"
        task_revision: 8
        work_item_id: "work-native-pr-verification"
      -
        at: "2026-09-11T18:53:32.566Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:03ca1339036ae6197342903a378fa7806bb3fb2851a9108784063dc64648cd43"
        entity: "work_item"
        id: "event_b7491f446ece417e2db5601b"
        mutation_id: "external-result:work-order-202609111340-MGB383-executor-af6f56de8792d5457346d125"
        plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111340-MGB383"
        task_revision: 11
        work_item_id: "work-version-surfaces"
      -
        at: "2026-09-11T18:55:04.446Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:5d85e04cce331d01fbf99fb0a7442ce777a4d883418fae5da461d9bbd4499757"
        entity: "work_item"
        id: "event_3cfedcf4d967e0f1648e3e36"
        mutation_id: "external-result:work-order-202609111340-MGB383-executor-13b33b57c185d8ff07a3ebe9"
        plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111340-MGB383"
        task_revision: 14
        work_item_id: "work-publish-contract"
    leases: []
    mutation_receipts:
      compatibility:sha256:0d9670b99051a55edbb7ac41ecacbe142f74f39da97aca1c64b1642e23bfd5b9:
        aggregate_digest: "sha256:c906cea1410c0d86c4d5098be9f85653651e5832e4f972f8b53192897a5ec49b"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:51:27.640Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1a4a8f024abcae03d5aaf251"
          mutation_id: "compatibility:sha256:0d9670b99051a55edbb7ac41ecacbe142f74f39da97aca1c64b1642e23bfd5b9"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:0d9670b99051a55edbb7ac41ecacbe142f74f39da97aca1c64b1642e23bfd5b9"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:1df0d37ff3203565f192f7428ea1fe128c2cfbd9088cd984ff5e0db955c85ac4:
        aggregate_digest: "sha256:b9eb158f9d7653bf7ea2c4cd06cf19efbf12e01ce060d849edd21cc6e8a6eb4c"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:54:58.671Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_cd6526c38b151e2c92789151"
          mutation_id: "compatibility:sha256:1df0d37ff3203565f192f7428ea1fe128c2cfbd9088cd984ff5e0db955c85ac4"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:1df0d37ff3203565f192f7428ea1fe128c2cfbd9088cd984ff5e0db955c85ac4"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:2ee8880913ca100651457df7cf734a1ea9d8f8ce32b1b2a291244f23ac254070:
        aggregate_digest: "sha256:d3c1f46829b97ab9c3494a730223f741349fbaa78d1a82a958196a45be714d45"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:45:31.180Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_452054b76228fc9ee1ba3575"
          mutation_id: "compatibility:sha256:2ee8880913ca100651457df7cf734a1ea9d8f8ce32b1b2a291244f23ac254070"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:2ee8880913ca100651457df7cf734a1ea9d8f8ce32b1b2a291244f23ac254070"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:338a8cc2e871ba92a096792e869ee3d10ea6a003443de215f1ef63599afd3d75:
        aggregate_digest: "sha256:756c6d03b43b59298280c9ab44155a8673b5f2d02383b5e8551c055323d3f500"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:45:31.181Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e4f1a1b80f1d4a1cf4e43e03"
          mutation_id: "compatibility:sha256:338a8cc2e871ba92a096792e869ee3d10ea6a003443de215f1ef63599afd3d75"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:338a8cc2e871ba92a096792e869ee3d10ea6a003443de215f1ef63599afd3d75"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:44e73b17559a911182830f469995e7c2b4f7ddfa14a274ec0bddbeda00b4bba6:
        aggregate_digest: "sha256:e31ebe03695eb0b6d40a94cbdf7acd2574eaea9197b7dc2846dd7af737bbe0b7"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:53:27.398Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0790bf8c2406c825b082efc3"
          mutation_id: "compatibility:sha256:44e73b17559a911182830f469995e7c2b4f7ddfa14a274ec0bddbeda00b4bba6"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:44e73b17559a911182830f469995e7c2b4f7ddfa14a274ec0bddbeda00b4bba6"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:aa8960213bb9882caf65594e4072847419b2b1afdb3e9e1a37122e775b307af0:
        aggregate_digest: "sha256:91d2efe8c5305283b14ee4b32d22802ae9727e5f953e8a12b10b54752abafd51"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:45:55.083Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c23fa6066db5afa5121ece36"
          mutation_id: "compatibility:sha256:aa8960213bb9882caf65594e4072847419b2b1afdb3e9e1a37122e775b307af0"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:aa8960213bb9882caf65594e4072847419b2b1afdb3e9e1a37122e775b307af0"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:c0b7229f1eace6d585734c47cf51aaa51f1f9caa6c7d16cf0a347ffe6d08043b:
        aggregate_digest: "sha256:bd5cb0f8541e801c3577e77aa0eae33c6265d0907daafcf44343c57bcc560c85"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:54:58.671Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_afc8b66f9e6f23867b537246"
          mutation_id: "compatibility:sha256:c0b7229f1eace6d585734c47cf51aaa51f1f9caa6c7d16cf0a347ffe6d08043b"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c0b7229f1eace6d585734c47cf51aaa51f1f9caa6c7d16cf0a347ffe6d08043b"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:c629e1cb3b0716b944b9a72dbb85e963bc5e720deccd7d029e170f204cf200b6:
        aggregate_digest: "sha256:e9f04760f247e2e44e6275d536bf0190b958638a1980b71dd601c3b5010ebce5"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:49:54.166Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b64340622ca55cc7524a05c9"
          mutation_id: "compatibility:sha256:c629e1cb3b0716b944b9a72dbb85e963bc5e720deccd7d029e170f204cf200b6"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c629e1cb3b0716b944b9a72dbb85e963bc5e720deccd7d029e170f204cf200b6"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:e0846c7149ff8c2d65ff0249273e12693103117bce14ad60bcfbb670102b06ba:
        aggregate_digest: "sha256:2be570a486cd1fcba1ec097b3bef53b06d59ae1abb7f15bd167b1f708c8f7764"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:51:27.640Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3591c58a2baee3785f755791"
          mutation_id: "compatibility:sha256:e0846c7149ff8c2d65ff0249273e12693103117bce14ad60bcfbb670102b06ba"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e0846c7149ff8c2d65ff0249273e12693103117bce14ad60bcfbb670102b06ba"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609111340-MGB383"
      compatibility:sha256:f99fa24a918250c2b18f1b78c15bc156205db81c62c3d943da47ace4b0b45559:
        aggregate_digest: "sha256:245f4b0e3498a8e207e753962386896bdd2d3be0d53a257e81d3ec6f33b78a48"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:53:27.398Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6b7231298fd505a6dc694255"
          mutation_id: "compatibility:sha256:f99fa24a918250c2b18f1b78c15bc156205db81c62c3d943da47ace4b0b45559"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f99fa24a918250c2b18f1b78c15bc156205db81c62c3d943da47ace4b0b45559"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609111340-MGB383"
      external-result:work-order-202609111340-MGB383-executor-13b33b57c185d8ff07a3ebe9:
        aggregate_digest: "sha256:0a9482877b26c7863aac9407878ef86967995486b7a0d4ed3e13d71a5ffd6610"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:55:04.446Z"
          cause_refs:
            - "semantic-result:sha256:5d85e04cce331d01fbf99fb0a7442ce777a4d883418fae5da461d9bbd4499757"
          entity: "work_item"
          from: "PLANNED"
          id: "event_3cfedcf4d967e0f1648e3e36"
          mutation_id: "external-result:work-order-202609111340-MGB383-executor-13b33b57c185d8ff07a3ebe9"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 14
          to: "COMPLETED"
          work_item_id: "work-publish-contract"
        mutation_id: "external-result:work-order-202609111340-MGB383-executor-13b33b57c185d8ff07a3ebe9"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609111340-MGB383"
      external-result:work-order-202609111340-MGB383-executor-45a8e43f6c5503dd1507e90d:
        aggregate_digest: "sha256:1dcf022444eaee223e044cbceb43c79a414774d089c945b22b7a8426e8ce41c6"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:51:38.731Z"
          cause_refs:
            - "semantic-result:sha256:1efaf19c4c309374d1bb4e5facd4ed64cda3ec8b4f9954a6f31e9f30fdf1e159"
          entity: "work_item"
          from: "READY"
          id: "event_c8890d5be130b65a42079c0a"
          mutation_id: "external-result:work-order-202609111340-MGB383-executor-45a8e43f6c5503dd1507e90d"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: "work-native-pr-verification"
        mutation_id: "external-result:work-order-202609111340-MGB383-executor-45a8e43f6c5503dd1507e90d"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609111340-MGB383"
      external-result:work-order-202609111340-MGB383-executor-af6f56de8792d5457346d125:
        aggregate_digest: "sha256:167a22022f7f0c9b015fa9bf867e9b70e2cfe7747b940a990e0bbfb2b1a7b23d"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T18:53:32.566Z"
          cause_refs:
            - "semantic-result:sha256:03ca1339036ae6197342903a378fa7806bb3fb2851a9108784063dc64648cd43"
          entity: "work_item"
          from: "READY"
          id: "event_b7491f446ece417e2db5601b"
          mutation_id: "external-result:work-order-202609111340-MGB383-executor-af6f56de8792d5457346d125"
          plan_digest: "sha256:561ecf6a31e5da0501ae93d26c9f884af477f46a4b17250d7c9b5d40ae1f24fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111340-MGB383"
          task_revision: 11
          to: "COMPLETED"
          work_item_id: "work-version-surfaces"
        mutation_id: "external-result:work-order-202609111340-MGB383-executor-af6f56de8792d5457346d125"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609111340-MGB383"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "ab800d228f1a8ad14f0fe44654dbcddcf1266cfa"
  task_execution_context:
    base_ref: "main"
    base_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    version: 1
id_source: "generated"
---
## Summary

Harden the post-release evidence close-tail under branch protection for GitHub issue #4848

GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848

## Scope

- In scope: GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848.
- Out of scope: unrelated refactors not required for "Harden the post-release evidence close-tail under branch protection for GitHub issue #4848".

## Plan

Prepared a bounded branch_pr plan for the release close-tail repair.

## Verify Steps

1. Run `bunx --no-install vitest run packages/agentplane/src/commands/release/open-next-development-version-script.test.ts packages/agentplane/src/commands/release/verify-release-evidence-pr-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --maxWorkers=1`. Expected: the next-development diff is Prettier-clean, the compatibility candidate refresh is covered, the publish workflow stages and gates all generated files, and native pull_request verification succeeds while action_required and empty rollups fail closed.
2. Inspect the release-evidence close-tail diff. Expected: it does not create a synthetic success check, use admin bypass, or modify files outside the approved scope.
3. Complete hosted integration for the exact task commit. Expected: required branch-protection checks pass and the pull request merges without bypass.
4. Record final task-outcome evidence and `git status --short --untracked-files=all`. Expected: all required evidence is present and no unintended tracked changes or task-local artifacts remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
