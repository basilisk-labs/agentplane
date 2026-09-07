---
id: "202609070819-M065D1"
title: "Keep setup-agentplane installations usable across workflow steps"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ci"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
  - "bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
  - "bun run workflows:lint"
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T08:23:38.882Z"
  updated_by: "USER"
  note: "Operator relay of the existing user authorization to fix everything required for release completion and explicit AGENTS permission override. The six-file setup-action and explicit CAS tag recovery plan is within that authorization. No host decision receipt is synthesized."
verification:
  state: "ok"
  updated_at: "2026-09-07T08:42:32.616Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-07T08:44:22.290Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 7 typed finding(s)."
  evaluated_sha: "d2a97545f436acf2bab742d4ae12ea3ac2771b2e"
  blueprint_digest: "f58ac25aa75e157577aff348de0d1803ca85a3fd2f428261887a3f2bab1ca358"
  evidence_refs:
    - ".agentplane/tasks/202609070819-M065D1/quality/20260907-084239204-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202609070819-M065D1/quality/20260907-084239204-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609070819-M065D1/quality/objects/sha256/c2513e67bfbe75bbd287c940a8a8e6aa99bef4291550cf9e18483f008bdbeea7.md"
    - ".agentplane/tasks/202609070819-M065D1/quality/20260907-084239204-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609070819-M065D1/quality/20260907-084239204-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202609070819-M065D1/quality/20260907-084239204-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202609070819-M065D1/README.md"
    - ".agentplane/tasks/202609070819-M065D1/quality/objects/sha256/25a382e7b271136e954ebd7c265f2e22845bdba3efbae235b3d8ce2c67e4ae39.patch"
    - ".agentplane/tasks/202609070819-M065D1/quality/objects/sha256/6c2ad5c50f5cdbde531299cd009af44d3536420870fca3e973a6260073f6d2ac.json"
    - ".agentplane/tasks/202609070819-M065D1/verification/20260907084232616-54a0b5b6188c99d6.json"
    - ".agentplane/tasks/202609070819-M065D1/quality/objects/sha256/97dd8df921f0b5365c357b688ad45d070106d0e91d90c4c648c504daf6237791.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Verified the frozen work order, manifest and all nine evidence digests for evaluated commit d2a97545f436acf2bab742d4ae12ea3ac2771b2e. The actual product diff contains only six approved paths."
    - "Environment-bound action inputs avoid shell interpolation. Pinned-version rejection precedes download, checksum validation precedes extraction, installation is outside the download cleanup directory, and PATH publication follows optional executable verification. Positive and negative generated-shell tests include a separate later process."
    - "Setup-tag replacement is opt-in, validates the module/version tag, and remains after main artifact verification. The old tag SHA is supplied to Git force-with-lease and the resulting remote tag is checked. Real Git tests cover creation, default refusal, explicit replacement and a concurrent tag change that is preserved."
    - "Canonical publication uses workflow-SHA-pinned setup tooling without persisted checkout credentials. Manual recovery defaults to false and the actual shell command is tested with both input values. Other release source, signing, package and tag guards remain intact."
    - "CLI-owned evidence confirms 8 renderer tests, 43 publisher/workflow tests, workflow lint and full ci:local:full pass. Full verification took 477066ms and includes all critical CLI groups, documentation build/design, platform-critical tests and significant coverage. Supervisor final tracked state is clean."
    - "Residual risk: Hosted exact-head CI including CodeQL is required before integration."
    - "Residual risk: Actual publication with repair_setup_tag=true and execution of the published setup action remain separately authorized operator verification after integration. The prior canonical publish result is still incomplete and is not promoted by this source review."
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
      - "scripts/generate/render-setup-agentplane-action.mjs"
      - "scripts/release/publish-external-distribution.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "External publication and existing PR #5906 remain separately authorized operator work after this repair is integrated."
      - "Keep the setup action repair and its explicit hosted recovery path in one isolated task."
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
      - "scripts/generate/render-setup-agentplane-action.mjs"
      - "scripts/release/publish-external-distribution.mjs"
  observed:
    authority_violations: []
    changed_components:
      - ".github"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
      - "scripts/generate/render-setup-agentplane-action.mjs"
      - "scripts/release/publish-external-distribution.mjs"
    external_effects: []
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
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
        id: "recorded-check-2"
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
          - "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
          - "scripts/generate/render-setup-agentplane-action.mjs"
          - "scripts/release/publish-external-distribution.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:842129df1c3af12c3e896b34f31ca272a7da7872640131dd62fb0a27af52f58a"
      escalation_reasons:
        - "central_component:.github/workflows/publish.yml"
        - "central_component:scripts/release/publish-external-distribution.mjs"
        - "central_path:.github/workflows/publish.yml"
        - "central_path:scripts/release/publish-external-distribution.mjs"
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
          - "scripts"
        changed_files:
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
          - "scripts/generate/render-setup-agentplane-action.mjs"
          - "scripts/release/publish-external-distribution.mjs"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "d2a97545f436acf2bab742d4ae12ea3ac2771b2e"
  message: "🚧 M065D1 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d2a97545f436. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T08:23:50.772Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T08:33:59.973Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d2a97545f436. CLI accepted one state-bound external-agent semantic result."
    commit: "d2a97545f436acf2bab742d4ae12ea3ac2771b2e"
  -
    type: "verify"
    at: "2026-09-07T08:42:32.616Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-09-07T08:42:33.547Z"
doc_updated_by: "SUPERVISOR"
description: "Release 0.7.8 verification found invalid Bash input interpolation, deletion of the installed CLI by download cleanup, and a setup-agentplane version tag still naming the previous checksum bundle. Repair the existing action renderer and prove installation remains usable in a subsequent workflow step. Add an explicit opt-in hosted setup-tag repair that uses a compare-and-swap Git push after verified main publication. Canonical recovery must use the current tested renderer for the qualified historical payload. Keep normal tag mismatch fail-closed behavior, the release source SHA, AgentPlane release tag, npm packages, signed archive checksums and unrelated channels unchanged. External publication is a separately authorized operator action after integration."
sections:
  Summary: "Repair setup-agentplane input handling and installation lifetime, then enable explicit hosted setup-tag recovery for the qualified historical release. Source repair is local; publication and final release evidence remain separately authorized operator work."
  Scope: "In scope: scripts/generate/render-setup-agentplane-action.mjs, scripts/release/publish-external-distribution.mjs, .github/workflows/publish.yml, and the three nearest release contract test files named in the structured plan. Preserve normal tag mismatch refusal and all source, signing, npm and release-tag guards. Out of scope: external writes during semantic work, public version changes, unrelated channel changes, and edits to the pending release evidence PR."
  Plan: "Propose one bounded setup-action and hosted recovery repair with executable install and compare-and-swap tag tests."
  Verify Steps: |-
    1. Run the declared action renderer test file. Expected: safe version binding, pinned version rejection, checksum validation and installation persistence across a later step pass.
    2. Run the declared external publisher and workflow contract test files. Expected: default tag mismatch refusal, explicit setup-only compare-and-swap recovery, concurrent drift refusal and current-runtime wiring pass.
    3. Run bun run workflows:lint. Expected: syntax and workflow contracts pass.
    4. Review the six-file scope and retain existing payload identity, macOS signature, npm and AgentPlane release-tag guards.
    5. After integration, recover the unchanged release SHA through hosted publication with explicit setup-tag repair, verify the published action in separate install and CLI steps, and refresh the existing release evidence PR. External validation remains outside this semantic repair.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-07T08:42:32.616Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:98eff9bcc2cc81dbae5eaaf40d64d909ecd2d2fbbe641cba2dc332e2f8589c3a, input_digest=sha256:7b0e9dac2686c533a67ebea164a44f8bbb93e52e0e19b086e5095ef0a662171f

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun run workflows:lint
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun run workflows:lint
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun run workflows:lint
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609070819-M065D1-keep-setup-agentplane-installations-usable-acros/.agentplane/tasks/202609070819-M065D1/blueprint/resolved-snapshot.json
    - old_digest: f58ac25aa75e157577aff348de0d1803ca85a3fd2f428261887a3f2bab1ca358
    - current_digest: f58ac25aa75e157577aff348de0d1803ca85a3fd2f428261887a3f2bab1ca358
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609070819-M065D1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609070819-M065D1
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
    completion_contract_digest: "sha256:529710c08d24e61c12f0e1588e695c6c6cd542b5c2f35c536ba7dfc9e66bbcdf"
    digest: "sha256:1f34b4dab240735833b6f0cfce6208fa092d32fdb7b5cd1716637e0ea798692b"
    grant_id: "6f3a0278-68b6-4ddf-b548-3c5afdbaefff"
    issued_at: "2026-09-07T08:23:38.882Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:9bdfae83f7c41152d00805748c180a010d7a6706b3698597d70d610bf94c338d"
    plan_revision: 6
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c6c9e697a522b2f54be36910d921e8bdba1d9082f7afd4982cdb0c6dfce545ac"
    status: "active"
    task_id: "202609070819-M065D1"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T08:23:38.882Z"
        approved_by: "USER"
        approved_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-07T08:22:43.049Z"
      digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
      proposal:
        assumptions:
          - "The existing rendered action is pinned to one manifest version; a mismatching input must fail rather than silently install another version."
          - "The user has already authorized all necessary release repairs and permission overrides. This plan only changes source and tests; hosted credentials and external tag mutation remain explicit operator actions."
          - "Release v0.7.8 source SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5 and its npm packages remain immutable."
        planning_baseline:
          captured_at: "2026-09-07T08:20:59.838Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:6ac48077fb0b81b003a2809843cc61fff34d3af83d3b5a1eb733beb45a922918"
          dirty_paths:
            - ".agentplane/tasks/202609070819-M065D1/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "b99c7d87348d22b54cb2a36445fd94cddd732bf5"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202609070819-M065D1"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
              id: "action-install"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              id: "publish-recovery"
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
                - "action-install"
              description: "The rendered composite action safely binds inputs through environment variables, enforces its pinned release version, checks archive hashes, and leaves the installed executable usable from GITHUB_PATH after the install step exits. Failed validation does not publish a usable PATH entry. Test the generated shell with local assets and a separate subsequent process."
              id: "persistent-install"
              required: true
            -
              check_ids:
                - "publish-recovery"
              description: "Normal setup-tag mismatch remains a failure. Only an explicit setup-specific recovery option may replace an existing external version tag after main artifact verification. Replacement uses the observed old SHA as a force-with-lease precondition and verifies the resulting remote tag. Concurrent tag changes must fail closed. The helper rejects the option for other modules."
              id: "explicit-tag-recovery"
              required: true
            -
              check_ids:
                - "publish-recovery"
                - "workflow-lint"
              description: "Canonical workflow exposes a default-false manual setup-tag recovery input, uses current workflow-SHA-pinned tooling for setup action rendering and publication against the qualified historical release manifest, and passes the recovery option only when explicitly requested. Existing payload identity, signing, package and release tag guards remain unchanged."
              id: "qualified-runtime"
              required: true
          evidence_fingerprint: "sha256:99c152b7f397c5389ef9444dc8237dedb033ff2160b438fd8016d3b45adb745c"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "action-install"
                  description: "The rendered composite action safely binds inputs through environment variables, enforces its pinned release version, checks archive hashes, and leaves the installed executable usable from GITHUB_PATH after the install step exits. Failed validation does not publish a usable PATH entry. Test the generated shell with local assets and a separate subsequent process."
                  id: "persistent-install"
                  required: true
                -
                  check_ids:
                    - "publish-recovery"
                  description: "Normal setup-tag mismatch remains a failure. Only an explicit setup-specific recovery option may replace an existing external version tag after main artifact verification. Replacement uses the observed old SHA as a force-with-lease precondition and verifies the resulting remote tag. Concurrent tag changes must fail closed. The helper rejects the option for other modules."
                  id: "explicit-tag-recovery"
                  required: true
                -
                  check_ids:
                    - "publish-recovery"
                    - "workflow-lint"
                  description: "Canonical workflow exposes a default-false manual setup-tag recovery input, uses current workflow-SHA-pinned tooling for setup action rendering and publication against the qualified historical release manifest, and passes the recovery option only when explicitly requested. Existing payload identity, signing, package and release tag guards remain unchanged."
                  id: "qualified-runtime"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "scripts/lib/script-runtime.mjs"
                  - ".git/agentplane/external-agent/202609061750-Z0XXVD/publish-signed-first-result/publish-result.json"
                required_sources:
                  - "scripts/generate/render-setup-agentplane-action.mjs"
                  - "scripts/release/publish-external-distribution.mjs"
                  - ".github/workflows/publish.yml"
                  - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
                  - "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
                  - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
                symbol_hints:
                  - "renderAction"
                  - "ensureSetupAgentplaneTag"
                  - "Render setup-agentplane action"
                  - "Publish setup-agentplane PR"
              depends_on: []
              expected_outputs:
                - "Persistent checksum-verified setup action, explicit CAS tag recovery, and behavioral regression evidence"
              id: "repair-setup-install-and-recovery"
              objective: "Repair setup-agentplane installation and its explicit hosted recovery in the six approved paths. Use environment-bound inputs, reject versions that do not match the pinned manifest, and separate temporary downloads from a runner-persistent installation directory. Publish GITHUB_PATH only after verification. Add an opt-in setup-only existing-tag repair with compare-and-swap Git push and remote verification after generated files are confirmed on main. Preserve default fail-closed tag behavior. The canonical workflow must use current workflow-SHA-pinned setup rendering and publication tooling for historical source recovery and expose a false-by-default manual recovery input. Extend nearest executable tests for surviving a later step, invalid inputs and checksums, default tag refusal, successful explicit repair, concurrent tag drift, and workflow wiring. Do not perform external publication, update the existing release evidence PR, or alter versions or release payload during this semantic episode."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/generate/render-setup-agentplane-action.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/release/publish-external-distribution.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: ".github/workflows/publish.yml"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              risk: "medium"
              scope_roots:
                - "scripts/generate/render-setup-agentplane-action.mjs"
                - "scripts/release/publish-external-distribution.mjs"
                - ".github/workflows/publish.yml"
                - "packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
                - "packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts"
                - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
                    id: "action-install"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
                    id: "publish-recovery"
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
                      - "action-install"
                    description: "The rendered composite action safely binds inputs through environment variables, enforces its pinned release version, checks archive hashes, and leaves the installed executable usable from GITHUB_PATH after the install step exits. Failed validation does not publish a usable PATH entry. Test the generated shell with local assets and a separate subsequent process."
                    id: "persistent-install"
                    required: true
                  -
                    check_ids:
                      - "publish-recovery"
                    description: "Normal setup-tag mismatch remains a failure. Only an explicit setup-specific recovery option may replace an existing external version tag after main artifact verification. Replacement uses the observed old SHA as a force-with-lease precondition and verifies the resulting remote tag. Concurrent tag changes must fail closed. The helper rejects the option for other modules."
                    id: "explicit-tag-recovery"
                    required: true
                  -
                    check_ids:
                      - "publish-recovery"
                      - "workflow-lint"
                    description: "Canonical workflow exposes a default-false manual setup-tag recovery input, uses current workflow-SHA-pinned tooling for setup action rendering and publication against the qualified historical release manifest, and passes the recovery option only when explicitly requested. Existing payload identity, signing, package and release tag guards remain unchanged."
                    id: "qualified-runtime"
                    required: true
                evidence_fingerprint: "sha256:99c152b7f397c5389ef9444dc8237dedb033ff2160b438fd8016d3b45adb745c"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609070819-M065D1"
    event_cursor: 9
    final_validation: null
    id: "202609070819-M065D1"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run workflows:lint"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-07T08:19:54.822Z"
      constraints: []
      request: |-
        Keep setup-agentplane installations usable across workflow steps

        Release 0.7.8 verification found invalid Bash input interpolation, deletion of the installed CLI by download cleanup, and a setup-agentplane version tag still naming the previous checksum bundle. Repair the existing action renderer and prove installation remains usable in a subsequent workflow step. Add an explicit opt-in hosted setup-tag repair that uses a compare-and-swap Git push after verified main publication. Canonical recovery must use the current tested renderer for the qualified historical payload. Keep normal tag mismatch fail-closed behavior, the release source SHA, AgentPlane release tag, npm packages, signed archive checksums and unrelated channels unchanged. External publication is a separately authorized operator action after integration.
      task_id: "202609070819-M065D1"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 13
    schema_version: 1
    updated_at: "2026-09-07T08:42:33.547Z"
    work_items:
      repair-setup-install-and-recovery:
        attempt: 1
        claim_id: null
        id: "repair-setup-install-and-recovery"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a17819f34658a846cfd1f8d21b4c6401b1cde091213e6c46de5eb83fc2d27ac3"
            id: "Persistent checksum-verified setup action, explicit CAS tag recovery, and behavioral regression evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609070819-M065D1"
              work_item_id: "repair-setup-install-and-recovery"
            provenance:
              - "sha256:c4379cd217d002fb699eb1501008485b45f036500d3dfc17e2481f4a3dfda5c0"
              - ".agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0cfd158bf26a6d062e38b6cedbeb09f0ea25017db7d238b9e5ce6a8117ae6872"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json"
              check_id: "action-install"
              command_identity: "bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts"
              detail: "Observed by bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts."
              exit_code: 0
              observed_at: "2026-09-07T08:34:12.303Z"
              repository_snapshot_digest: "sha256:0cfd158bf26a6d062e38b6cedbeb09f0ea25017db7d238b9e5ce6a8117ae6872"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json"
              check_id: "publish-recovery"
              command_identity: "bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              detail: "Observed by bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts."
              exit_code: 0
              observed_at: "2026-09-07T08:34:12.303Z"
              repository_snapshot_digest: "sha256:0cfd158bf26a6d062e38b6cedbeb09f0ea25017db7d238b9e5ce6a8117ae6872"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json"
              check_id: "workflow-lint"
              command_identity: "bun run workflows:lint"
              detail: "Observed by bun run workflows:lint."
              exit_code: 0
              observed_at: "2026-09-07T08:34:12.303Z"
              repository_snapshot_digest: "sha256:0cfd158bf26a6d062e38b6cedbeb09f0ea25017db7d238b9e5ce6a8117ae6872"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-07T08:34:12.308Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_68e01bfdbc76625e5f5f19cb"
        mutation_id: "external-result:work-order-202609070819-M065D1-executor-9710348c0770741dfe982a88"
        plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609070819-M065D1"
        task_revision: 10
        work_item_id: "repair-setup-install-and-recovery"
    leases: []
    mutation_receipts:
      compatibility:sha256:03688a794c960793aaa52ab0399336474cc50217c92cec0c6cb362a1d62bf2fd:
        aggregate_digest: "sha256:16c6df6aa88a5261aeeff7ba4b66085c8c58ba5760360b28840dc267ecd8ba1b"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:23:21.151Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c5b598cc8e2fc5679346663c"
          mutation_id: "compatibility:sha256:03688a794c960793aaa52ab0399336474cc50217c92cec0c6cb362a1d62bf2fd"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 4
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:03688a794c960793aaa52ab0399336474cc50217c92cec0c6cb362a1d62bf2fd"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:37b2d3dc3c1620a6937572964e5b8e7681192bc8d48b34c216511f7de162d089:
        aggregate_digest: "sha256:c1563127b80ad76ed951f4a7824aec04f774fec960b801ec8818fcd189211938"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:23:21.468Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_92544ac944316147bf9d8bf2"
          mutation_id: "compatibility:sha256:37b2d3dc3c1620a6937572964e5b8e7681192bc8d48b34c216511f7de162d089"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 5
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:37b2d3dc3c1620a6937572964e5b8e7681192bc8d48b34c216511f7de162d089"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:714a9c3da1e775b2bf6e892bf30413467e75323652b5397a21bce99d5663fc6e:
        aggregate_digest: "sha256:3179ea745278c51b9e329de88282fd4d0a896869390dff05704531e2a1d899d0"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:23:20.824Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e4d4357320fee8a705b8865d"
          mutation_id: "compatibility:sha256:714a9c3da1e775b2bf6e892bf30413467e75323652b5397a21bce99d5663fc6e"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:714a9c3da1e775b2bf6e892bf30413467e75323652b5397a21bce99d5663fc6e"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:8e226930142b002389f96b28fae80f1f1dda9858b55021d558ea980d420ccdd1:
        aggregate_digest: "sha256:4d8808b9aba23dddaeccd5cb4a0d4d89086a076d01e066281c6f46df4af14c78"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:33:59.973Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_811567b8808dbf4d68228603"
          mutation_id: "compatibility:sha256:8e226930142b002389f96b28fae80f1f1dda9858b55021d558ea980d420ccdd1"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8e226930142b002389f96b28fae80f1f1dda9858b55021d558ea980d420ccdd1"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:a0738a546b1a9bbe98d5ec90270edf836c6da79413e3fbeb358ab9ecea27b62f:
        aggregate_digest: "sha256:5e1fc9cbddb88350231ecd111fea0f689e32704b277fab84ce9abfbb5f08eb3e"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:23:21.469Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_603667e02714cf195ecda226"
          mutation_id: "compatibility:sha256:a0738a546b1a9bbe98d5ec90270edf836c6da79413e3fbeb358ab9ecea27b62f"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a0738a546b1a9bbe98d5ec90270edf836c6da79413e3fbeb358ab9ecea27b62f"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:c488341442d7e2569077d1f3d9cefa8a425988fcce802f86334c4e5c4ce4d22b:
        aggregate_digest: "sha256:f0e5e8167fefe0955571e944850b4fcc1ee4f7d2bd4b125278a8d439ab45923e"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:23:50.772Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_78451dcdf81b3cd7d717e13d"
          mutation_id: "compatibility:sha256:c488341442d7e2569077d1f3d9cefa8a425988fcce802f86334c4e5c4ce4d22b"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c488341442d7e2569077d1f3d9cefa8a425988fcce802f86334c4e5c4ce4d22b"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:c4b3dcaa912d5b4653c286a77f4c574ae0751ea37172429efa1dad107a5cf967:
        aggregate_digest: "sha256:b8f0b56d04c12ca99152b5035e02e34cb321d7a47d8eda380d440f961ec5662e"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:33:59.973Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b4baa771885f1249af38dff8"
          mutation_id: "compatibility:sha256:c4b3dcaa912d5b4653c286a77f4c574ae0751ea37172429efa1dad107a5cf967"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c4b3dcaa912d5b4653c286a77f4c574ae0751ea37172429efa1dad107a5cf967"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:f03434ba51a91227b80067b6f2bb933739da5cfdb5929237034c185cc454c1fc:
        aggregate_digest: "sha256:251563a225a4110e36ccd54209b228f2e758cb760bff2d11a13d0b9fe9643437"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:42:33.547Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_afcd74729eb0dc8b65cf471c"
          mutation_id: "compatibility:sha256:f03434ba51a91227b80067b6f2bb933739da5cfdb5929237034c185cc454c1fc"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f03434ba51a91227b80067b6f2bb933739da5cfdb5929237034c185cc454c1fc"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609070819-M065D1"
      compatibility:sha256:fad086d763f12059538b7e4f5a69912d3497c27aec56e7282bd90b4ab6e0b46a:
        aggregate_digest: "sha256:70af751739d8f881c1b4dbad10f3894834661e62170a8a8af79b97d9222bb9b1"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:42:33.545Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_051f66b49f0a2c8ae41fb923"
          mutation_id: "compatibility:sha256:fad086d763f12059538b7e4f5a69912d3497c27aec56e7282bd90b4ab6e0b46a"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:fad086d763f12059538b7e4f5a69912d3497c27aec56e7282bd90b4ab6e0b46a"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609070819-M065D1"
      external-result:work-order-202609070819-M065D1-executor-9710348c0770741dfe982a88:
        aggregate_digest: "sha256:8d7c3294b3d87d10cdeb8d3051e7e885d4ef4195a6637a25daf10efbc53e61b9"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T08:34:12.308Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_68e01bfdbc76625e5f5f19cb"
          mutation_id: "external-result:work-order-202609070819-M065D1-executor-9710348c0770741dfe982a88"
          plan_digest: "sha256:aa782efc0c2372af7e0d88ece80a19924edca3f9686b86822b5a9ffd375330f8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070819-M065D1"
          task_revision: 10
          to: "COMPLETED"
          work_item_id: "repair-setup-install-and-recovery"
        mutation_id: "external-result:work-order-202609070819-M065D1-executor-9710348c0770741dfe982a88"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609070819-M065D1"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "d2a97545f436acf2bab742d4ae12ea3ac2771b2e"
  task_execution_context:
    base_ref: "main"
    base_sha: "b99c7d87348d22b54cb2a36445fd94cddd732bf5"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "b99c7d87348d22b54cb2a36445fd94cddd732bf5"
    version: 1
id_source: "generated"
---
## Summary

Repair setup-agentplane input handling and installation lifetime, then enable explicit hosted setup-tag recovery for the qualified historical release. Source repair is local; publication and final release evidence remain separately authorized operator work.

## Scope

In scope: scripts/generate/render-setup-agentplane-action.mjs, scripts/release/publish-external-distribution.mjs, .github/workflows/publish.yml, and the three nearest release contract test files named in the structured plan. Preserve normal tag mismatch refusal and all source, signing, npm and release-tag guards. Out of scope: external writes during semantic work, public version changes, unrelated channel changes, and edits to the pending release evidence PR.

## Plan

Propose one bounded setup-action and hosted recovery repair with executable install and compare-and-swap tag tests.

## Verify Steps

1. Run the declared action renderer test file. Expected: safe version binding, pinned version rejection, checksum validation and installation persistence across a later step pass.
2. Run the declared external publisher and workflow contract test files. Expected: default tag mismatch refusal, explicit setup-only compare-and-swap recovery, concurrent drift refusal and current-runtime wiring pass.
3. Run bun run workflows:lint. Expected: syntax and workflow contracts pass.
4. Review the six-file scope and retain existing payload identity, macOS signature, npm and AgentPlane release-tag guards.
5. After integration, recover the unchanged release SHA through hosted publication with explicit setup-tag repair, verify the published action in separate install and CLI steps, and refresh the existing release evidence PR. External validation remains outside this semantic repair.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-07T08:42:32.616Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:98eff9bcc2cc81dbae5eaaf40d64d909ecd2d2fbbe641cba2dc332e2f8589c3a, input_digest=sha256:7b0e9dac2686c533a67ebea164a44f8bbb93e52e0e19b086e5095ef0a662171f

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun run workflows:lint
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609070819-M065D1 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun run workflows:lint
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609070819-M065D1 Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609070819-M065D1 Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun run workflows:lint
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609070819-M065D1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609070819-M065D1 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609070819-M065D1-keep-setup-agentplane-installations-usable-acros/.agentplane/tasks/202609070819-M065D1/blueprint/resolved-snapshot.json
- old_digest: f58ac25aa75e157577aff348de0d1803ca85a3fd2f428261887a3f2bab1ca358
- current_digest: f58ac25aa75e157577aff348de0d1803ca85a3fd2f428261887a3f2bab1ca358
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609070819-M065D1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609070819-M065D1
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
