---
id: "202608122156-EZZZYH"
title: "Add installed-package mixed-scope lifecycle E2E to release qualification"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202608112259-T3ZDDM"
tags:
  - "e2e"
  - "lifecycle"
  - "packaging"
  - "qualification"
  - "release-gate"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run qualification:check"
  - "node --test scripts/qualification/release-qualification.test.mjs"
  - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle"
plan_approval:
  state: "approved"
  updated_at: "2026-08-12T22:01:12.027Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-13T17:08:34.348Z"
  updated_by: "TESTER"
  note: "Verified exact published SHA 207a86ab5 with hosted Core CI run 31723346838; review fixes, installed-package lifecycle, and every selected verification group passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-13T17:09:58.846Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "207a86ab5bcb897a9032edcc4f35bc1e4f5ae092"
  blueprint_digest: "72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025"
  evidence_refs:
    - ".agentplane/tasks/202608122156-EZZZYH/quality/20260813-170958434-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/20260813-170958434-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/objects/sha256/1d9c3da5818cdbf306ec50913e48b86b60c447eaec93ad7fd1cf7be30c196e5b.md"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/20260813-170958434-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/20260813-170958434-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/20260813-170958434-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608122156-EZZZYH/README.md"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/objects/sha256/7a1351a9a8555ad8caaf4c71477ce5618be66a09df5da789d39882c495b66192.patch"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/objects/sha256/fd392c8db6202cf20b066c5d6bee9f90cc8d47b3560a0b478b2a5077475912dd.json"
    - ".agentplane/tasks/202608122156-EZZZYH/verification/20260813170834348-f2e51b1280f03de4.json"
    - ".agentplane/tasks/202608122156-EZZZYH/quality/objects/sha256/3b5b11dd4af383725481722d5ea9081132edf0464c4c96fd6f4b151d5bdf941d.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The black-box scenario installs exact candidate tarballs, uses only the public CLI, crosses the former plan-size failure at 5080 bytes, proves exact replay idempotency and stale rejection, and completes verification, evaluator, finish, final consumer readback, and cleanup."
    - "CI audit mode now fails explicitly on scenario failure; post-terminal product behavior is read back; commit ancestry and product-tree identity are proven across lifecycle-only tail commits."
    - "Task-owned AgentPlane artifacts are excluded from the product policy-scope fingerprint, so verification and evaluator persistence do not invalidate their own evidence."
token_usage:
  agent_runs: 2
  input_tokens: null
  journal_digest: "sha256:4d0511c8b46d51691b0e9251e65cc32e0944a8efd1076840a4cd97249958b2a2"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-13T17:11:23.534Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_release_metadata"
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
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "security_boundary"
    writable_roots:
      - ".github/workflows/ci.yml"
      - "package.json"
      - "packages/agentplane/src/commands/release"
      - "scripts/README.md"
      - "scripts/qualification"
      - "scripts/release"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch worktree is required to preserve the active T3ZDDM process and to isolate the release-blocking follow-up."
      - "The requested gate changes executable qualification code, tests, CI routing, release metadata, and operator documentation without publishing or other external effects."
    repository_effects:
      - "ci"
      - "documentation"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".github/workflows/ci.yml"
      - "package.json"
      - "packages/agentplane/src/commands/release"
      - "scripts/README.md"
      - "scripts/qualification"
      - "scripts/release"
  observed:
    authority_violations:
      - "repository_effect:dependencies"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-policy-scope.ts"
    changed_components:
      - ".github"
      - "package.json"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - ".github/workflows/ci.yml"
      - "package.json"
      - "packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-policy-scope.ts"
      - "scripts/README.md"
      - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
      - "scripts/qualification/release-qualification.mjs"
      - "scripts/qualification/release-qualification.test.mjs"
      - "scripts/qualification/run-v0.7.1-release-qualification.mjs"
      - "scripts/qualification/v0.7.1-release-qualification.json"
    external_effects: []
    repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
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
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_release_metadata"
    - "observed_effect_dependencies"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-policy-scope.ts"
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
          - ".github/workflows/ci.yml"
          - "package.json"
          - "packages/agentplane/src/commands/release"
          - "scripts/README.md"
          - "scripts/qualification"
          - "scripts/release"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "documentation"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:17aa4d1fea0056c9249eb67139ff9a575682a49f87e1efc3ede4f53735e40d43"
      escalation_reasons:
        - "central_component:.github/workflows/ci.yml"
        - "central_component:package.json"
        - "central_path:.github/workflows/ci.yml"
        - "central_path:package.json"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-policy-scope.ts"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_release_metadata"
        - "unknown_path:scripts/qualification/v0.7.1-release-qualification.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".github"
          - "package.json"
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - ".github/workflows/ci.yml"
          - "package.json"
          - "packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-policy-scope.ts"
          - "scripts/README.md"
          - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
          - "scripts/qualification/release-qualification.mjs"
          - "scripts/qualification/release-qualification.test.mjs"
          - "scripts/qualification/run-v0.7.1-release-qualification.mjs"
          - "scripts/qualification/v0.7.1-release-qualification.json"
        external_effects: []
        repository_effects:
          - "ci"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
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
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "23ff0daa09590fbfcf195c4a7d7a8ca7f1a3e26d"
  message: "🚧 EZZZYH task: record final quality review"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: installed-package mixed-scope qualification, CI wiring, contract shields, and evaluator fingerprint stabilization are ready for TESTER verification."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-13T15:34:09.216Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-13T16:08:48.991Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: installed-package mixed-scope qualification, CI wiring, contract shields, and evaluator fingerprint stabilization are ready for TESTER verification."
    commit: "83a4f814d75a56c5da3341fd8ea329cf8e8e9618"
  -
    type: "verify"
    at: "2026-08-13T16:34:52.060Z"
    author: "TESTER"
    state: "ok"
    note: "Verified exact published SHA ab7abe4d1 and hosted Core CI run 31720631534; installed-package mixed-scope lifecycle and every Verification Contract group passed."
  -
    type: "status"
    at: "2026-08-13T16:36:23.071Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "ab7abe4d1d0676340aa1820aaa9e6728d4126af9"
  -
    type: "verify"
    at: "2026-08-13T17:08:34.348Z"
    author: "TESTER"
    state: "ok"
    note: "Verified exact published SHA 207a86ab5 with hosted Core CI run 31723346838; review fixes, installed-package lifecycle, and every selected verification group passed."
  -
    type: "status"
    at: "2026-08-13T17:11:23.534Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "23ff0daa09590fbfcf195c4a7d7a8ca7f1a3e26d"
doc_version: 3
doc_updated_at: "2026-08-13T17:11:23.564Z"
doc_updated_by: "CODER"
description: "Add a mandatory black-box installed-package E2E scenario to the AgentPlane release qualification used for 0.7.6. The scenario must pack the exact clean candidate, install the tarball into an isolated prefix, create a clean temporary Git repository, use only the public installed CLI, run init and semantic task intake, execute a real mixed-scope change spanning source code, tests, documentation, and repository metadata such as .gitignore, perform deterministic verification and evaluator review, and reach an equivalent completed lifecycle with commit and branch/PR-ready outcome. The scenario must not read or mutate internal runtime, quality, recovery, or task artifacts directly and must fail the release gate if any required phase is skipped or simulated. Preserve every existing qualification scenario and add manifest, runner, CI-routing, contract tests, cleanup, and operator documentation needed to make this a blocking 0.7.6 release check."
sections:
  Summary: |-
    Add installed-package mixed-scope lifecycle E2E to release qualification

    Add a mandatory black-box installed-package E2E scenario to the AgentPlane release qualification used for 0.7.6. The scenario must pack the exact clean candidate, install the tarball into an isolated prefix, create a clean temporary Git repository, use only the public installed CLI, run init and semantic task intake, execute a real mixed-scope change spanning source code, tests, documentation, and repository metadata such as .gitignore, perform deterministic verification and evaluator review, and reach an equivalent completed lifecycle with commit and branch/PR-ready outcome. The scenario must not read or mutate internal runtime, quality, recovery, or task artifacts directly and must fail the release gate if any required phase is skipped or simulated. Preserve every existing qualification scenario and add manifest, runner, CI-routing, contract tests, cleanup, and operator documentation needed to make this a blocking 0.7.6 release check.
  Scope: |-
    - In scope: Add a mandatory black-box installed-package E2E scenario to the AgentPlane release qualification used for 0.7.6. The scenario must pack the exact clean candidate, install the tarball into an isolated prefix, create a clean temporary Git repository, use only the public installed CLI, run init and semantic task intake, execute a real mixed-scope change spanning source code, tests, documentation, and repository metadata such as .gitignore, perform deterministic verification and evaluator review, and reach an equivalent completed lifecycle with commit and branch/PR-ready outcome. The scenario must not read or mutate internal runtime, quality, recovery, or task artifacts directly and must fail the release gate if any required phase is skipped or simulated. Preserve every existing qualification scenario and add manifest, runner, CI-routing, contract tests, cleanup, and operator documentation needed to make this a blocking 0.7.6 release check.
    - Out of scope: unrelated refactors not required for "Add installed-package mixed-scope lifecycle E2E to release qualification".
  Plan: |-
    1. Freeze the current gap as a regression contract: the existing packaged-candidate-flow proves packing, isolated installation, init, plan, error, and migration boundaries but does not execute a new product change through implementation, deterministic verification, evaluator, and completed lifecycle. Preserve that scenario unchanged.
    2. Add a dedicated installed-package runner for a hermetic mixed-scope fixture. Pack the exact clean candidate, install its tarball into an isolated prefix, create a clean temporary Git repository, configure a local Git identity, and invoke the installed agentplane binary rather than repository sources.
    3. Create the fixture task through the public semantic intake surface with explicit code, tests, documentation, and repository-metadata effects. Drive planning and execution through public task advance --agent-json packets and their declared exchange paths only; do not inspect or mutate task README, state files, quality records, recovery files, or other .agentplane runtime artifacts directly.
    4. Implement a deterministic external-agent harness for the emitted PLANNER, CODER, TESTER, and EVALUATOR episodes. The CODER episode must make an observable source change, add or update automated tests, update user documentation, and update .gitignore; the TESTER episode must execute the fixture verification commands; the EVALUATOR must review the produced diff and evidence rather than returning a pre-baked lifecycle state.
    5. Continue the public supervisor protocol until it reaches a completed direct lifecycle with an AgentPlane-owned commit, or another public no-network completion equivalent that proves finish semantics. Assert public CLI readback, clean tracked state, expected changed paths, passing tests, evaluator acceptance, commit identity, and no skipped lifecycle phase.
    6. Register packaged-mixed-scope-lifecycle in the versioned qualification manifest as a full-tier blocking scenario with an explicit failure classification and complete lifecycle coverage. Keep all existing scenarios and required coverage intact.
    7. Wire the scenario into the release full profile and the risk-selected verify-real-e2e CI job so release qualification and applicable PR verification fail closed when it fails, times out, omits evaluator evidence, or leaves the fixture incomplete.
    8. Extend qualification and CI contract tests to prove manifest selection, blocking disposition, dependency/order behavior, exact workflow command wiring, timeout/cleanup, public-CLI-only enforcement, and negative failures for simulated or partial completion.
    9. Update the operator-facing qualification documentation and generated script catalog if required by repository parity checks. State that the scenario validates an installed package and deterministic agent episodes, not live provider quality or a real hosted GitHub publication.
    10. Run the focused qualification contract tests, execute the new installed-package scenario from a clean candidate, run qualification:check, and run the Verification Contract selected regression set. Record exact commands, final public readback, residual risks, and flake classification.
  Verify Steps: |-
    1. Inspect the scenario implementation and run its contract tests. Expected: it creates a clean temporary Git repository, installs the exact candidate tarball into an isolated prefix, invokes only the installed public CLI for AgentPlane operations, and has no direct reads or writes under `.agentplane` except writing the exact exchange result path returned by a public packet.
    2. Execute `node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle`. Expected: the real fixture task passes semantic intake, approved planning, implementation, deterministic verification, evaluator review, AgentPlane-owned finish/commit, and final public readback; source, tests, docs, and `.gitignore` all change and their observable behavior is asserted.
    3. Run negative cases for omitted code, tests, docs, metadata, verification, evaluator, commit/finish, stale exchange, unexpected internal-artifact access, and leaked temporary state. Expected: each incomplete or simulated path fails with a stable phase-specific diagnostic and a non-zero scenario result.
    4. Validate `scripts/qualification/v0.7.1-release-qualification.json`. Expected: `packaged-mixed-scope-lifecycle` is full-tier, `release_disposition=block`, has a bounded timeout and lifecycle coverage, and every pre-existing scenario remains present and unchanged unless a documented dependency is added.
    5. Inspect and test `.github/workflows/ci.yml` plus release CI contract tests. Expected: `verify-real-e2e` runs the existing packaged and hosted scenarios plus `packaged-mixed-scope-lifecycle` whenever the Verification Contract requires real E2E; the aggregate and release-ready gates require its success.
    6. Run `node --test scripts/qualification/release-qualification.test.mjs`. Expected: manifest coverage, selection, blocking defects, scheduling, cleanup, and CI wiring assertions pass.
    7. Run `bun run qualification:check`. Expected: the complete dry-run contract passes without removing or weakening any existing release check.
    8. Run the Verification Contract selected local regression and inspect `git status --short --untracked-files=all`. Expected: all required checks pass, no temporary fixture or package artifacts remain, and only task-approved implementation and evidence paths are changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-13T16:34:52.060Z — VERIFY — ok

    By: TESTER

    Note: Verified exact published SHA ab7abe4d1 and hosted Core CI run 31720631534; installed-package mixed-scope lifecycle and every Verification Contract group passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8c4b389918a693b772b8749782b0697958eb52a8bc31b22dabee998dc3f582e9, input_digest=sha256:89398bf99d35ba4d0a57b6b0d22f51212ab6ed1921347d8d244b74b1341defc4

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts; node --test scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: focused Vitest passed 22/22 and qualification contract passed 37/37 on the task branch
    Scope: evaluator fingerprint stability, task envelope advance, CI routing, scenario selection and negative lifecycle cases

    Check: critical_paths
    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle
    Result: pass
    Evidence: exact clean SHA ab7abe4d1 passed installed-package black-box lifecycle in 18817ms with a 5080-byte plan, exact replay idempotency, stale rejection, evaluator, finish commit, cleanup and public readback
    Scope: first-task mixed source, test, docs and metadata lifecycle from public installed CLI only

    Check: docs_contract
    Command: bun run docs:scripts:check; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: generated scripts README is current and policy routing reported OK; Core CI verify-contract also passed
    Scope: generated command documentation and repository policy graph

    Check: full_regression
    Command: GitHub Actions Core CI run 31720631534
    Result: pass
    Evidence: verify-tests passed in 7m31s, verify-static in 4m34s, verify-contract in 2m42s, verify-security in 2m27s, Windows in 3m34s, package runtime in 50s, aggregate PR verification in 15s
    Scope: complete routed hosted regression for exact PR head ab7abe4d1d0676340aa1820aaa9e6728d4126af9

    Check: hosted_integration
    Command: gh run view 31720631534; gh pr view 4831
    Result: pass
    Evidence: GitHub Core CI concluded success for exact PR head ab7abe4d1d0676340aa1820aaa9e6728d4126af9 and PR aggregate gate passed
    Scope: hosted Linux, Windows, security, package runtime and aggregate integration boundary

    Check: task_outcome
    Command: bun run qualification:check; node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle; git status --short --untracked-files=all
    Result: pass
    Evidence: qualification contract and full dry-run passed, black-box scenario passed with zero blocking defects, no temporary fixture or package artifacts leaked
    Scope: approved EZZZYH outcome and clean candidate boundary

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608122156-EZZZYH-add-installed-package-mixed-scope-lifecycle-e2e/.agentplane/tasks/202608122156-EZZZYH/blueprint/resolved-snapshot.json
    - old_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
    - current_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608122156-EZZZYH

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608122156-EZZZYH
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-13T17:08:34.348Z — VERIFY — ok

    By: TESTER

    Note: Verified exact published SHA 207a86ab5 with hosted Core CI run 31723346838; review fixes, installed-package lifecycle, and every selected verification group passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8c4b389918a693b772b8749782b0697958eb52a8bc31b22dabee998dc3f582e9, input_digest=sha256:8730f7164c807f73d723885b452ec49c4c987622a7a78c81e239e2665f947582

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts; node --test scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: focused Vitest passed 9/9 after the review fixes; qualification contract passed 37/37 on exact current sources
    Scope: evaluator fingerprint stability, task envelope advance, CI routing, scenario selection, failure mode coverage

    Check: critical_paths
    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle
    Result: pass
    Evidence: exact clean SHA 207a86ab5 passed the installed tarball black-box lifecycle in 18787ms; plan size 5080 bytes, exact replay idempotent, stale replay rejected, evaluator and finish persisted, final consumer readback passed
    Scope: first-task mixed source, tests, docs and metadata lifecycle using only the installed public CLI

    Check: docs_contract
    Command: bun run qualification:check; Core CI verify-contract
    Result: pass
    Evidence: qualification contract passed 37/37, full manifest dry-run retained all 20 scenarios, hosted verify-contract passed on 207a86ab5
    Scope: generated documentation, qualification manifest, CI contract, repository policy graph

    Check: full_regression
    Command: GitHub Actions Core CI run 31723346838
    Result: pass
    Evidence: verify-tests, verify-static, verify-contract, verify-security, Windows, package runtime, and aggregate PR verification all passed on exact head 207a86ab5
    Scope: complete routed hosted regression for the current implementation

    Check: hosted_integration
    Command: gh run view 31723346838; gh pr view 4831
    Result: pass
    Evidence: Core CI concluded success for exact PR head 207a86ab5bcb897a9032edcc4f35bc1e4f5ae092; aggregate PR gate passed and all review threads are resolved
    Scope: hosted Linux, Windows, security, package-runtime, review, and aggregate boundaries

    Check: task_outcome
    Command: bun run qualification:check; installed-package black-box scenario; git status --short --untracked-files=all
    Result: pass
    Evidence: complete dry-run contract passed; black-box scenario passed with zero blocking defects; candidate packaging and temporary fixture cleanup passed; product tree stayed stable across lifecycle-only tail commits
    Scope: approved EZZZYH outcome, deterministic lifecycle, exact commit identity, and clean candidate boundary

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608122156-EZZZYH-add-installed-package-mixed-scope-lifecycle-e2e/.agentplane/tasks/202608122156-EZZZYH/blueprint/resolved-snapshot.json
    - old_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
    - current_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608122156-EZZZYH

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only the scenario runner, manifest entry, CI wiring, focused contract tests, documentation, and task artifacts introduced by this task.
    - Restore the previous `verify-real-e2e` scenario list without changing any pre-existing qualification scenario implementation or threshold.
    - Re-run the qualification contract and dry-run manifest checks to prove the original gate remains valid.
    - Do not rewrite published tags, release evidence, or PR #4830 history.
  Findings: ""
extensions:
  implementation_commit:
    hash: "207a86ab5bcb897a9032edcc4f35bc1e4f5ae092"
    message: "🎨 EZZZYH qualification: format review fixes"
  workflow_route_baseline:
    start_head_sha: "89dfabe89424ae6b69911a7174b9876f2713f24e"
    version: 1
id_source: "generated"
---
## Summary

Add installed-package mixed-scope lifecycle E2E to release qualification

Add a mandatory black-box installed-package E2E scenario to the AgentPlane release qualification used for 0.7.6. The scenario must pack the exact clean candidate, install the tarball into an isolated prefix, create a clean temporary Git repository, use only the public installed CLI, run init and semantic task intake, execute a real mixed-scope change spanning source code, tests, documentation, and repository metadata such as .gitignore, perform deterministic verification and evaluator review, and reach an equivalent completed lifecycle with commit and branch/PR-ready outcome. The scenario must not read or mutate internal runtime, quality, recovery, or task artifacts directly and must fail the release gate if any required phase is skipped or simulated. Preserve every existing qualification scenario and add manifest, runner, CI-routing, contract tests, cleanup, and operator documentation needed to make this a blocking 0.7.6 release check.

## Scope

- In scope: Add a mandatory black-box installed-package E2E scenario to the AgentPlane release qualification used for 0.7.6. The scenario must pack the exact clean candidate, install the tarball into an isolated prefix, create a clean temporary Git repository, use only the public installed CLI, run init and semantic task intake, execute a real mixed-scope change spanning source code, tests, documentation, and repository metadata such as .gitignore, perform deterministic verification and evaluator review, and reach an equivalent completed lifecycle with commit and branch/PR-ready outcome. The scenario must not read or mutate internal runtime, quality, recovery, or task artifacts directly and must fail the release gate if any required phase is skipped or simulated. Preserve every existing qualification scenario and add manifest, runner, CI-routing, contract tests, cleanup, and operator documentation needed to make this a blocking 0.7.6 release check.
- Out of scope: unrelated refactors not required for "Add installed-package mixed-scope lifecycle E2E to release qualification".

## Plan

1. Freeze the current gap as a regression contract: the existing packaged-candidate-flow proves packing, isolated installation, init, plan, error, and migration boundaries but does not execute a new product change through implementation, deterministic verification, evaluator, and completed lifecycle. Preserve that scenario unchanged.
2. Add a dedicated installed-package runner for a hermetic mixed-scope fixture. Pack the exact clean candidate, install its tarball into an isolated prefix, create a clean temporary Git repository, configure a local Git identity, and invoke the installed agentplane binary rather than repository sources.
3. Create the fixture task through the public semantic intake surface with explicit code, tests, documentation, and repository-metadata effects. Drive planning and execution through public task advance --agent-json packets and their declared exchange paths only; do not inspect or mutate task README, state files, quality records, recovery files, or other .agentplane runtime artifacts directly.
4. Implement a deterministic external-agent harness for the emitted PLANNER, CODER, TESTER, and EVALUATOR episodes. The CODER episode must make an observable source change, add or update automated tests, update user documentation, and update .gitignore; the TESTER episode must execute the fixture verification commands; the EVALUATOR must review the produced diff and evidence rather than returning a pre-baked lifecycle state.
5. Continue the public supervisor protocol until it reaches a completed direct lifecycle with an AgentPlane-owned commit, or another public no-network completion equivalent that proves finish semantics. Assert public CLI readback, clean tracked state, expected changed paths, passing tests, evaluator acceptance, commit identity, and no skipped lifecycle phase.
6. Register packaged-mixed-scope-lifecycle in the versioned qualification manifest as a full-tier blocking scenario with an explicit failure classification and complete lifecycle coverage. Keep all existing scenarios and required coverage intact.
7. Wire the scenario into the release full profile and the risk-selected verify-real-e2e CI job so release qualification and applicable PR verification fail closed when it fails, times out, omits evaluator evidence, or leaves the fixture incomplete.
8. Extend qualification and CI contract tests to prove manifest selection, blocking disposition, dependency/order behavior, exact workflow command wiring, timeout/cleanup, public-CLI-only enforcement, and negative failures for simulated or partial completion.
9. Update the operator-facing qualification documentation and generated script catalog if required by repository parity checks. State that the scenario validates an installed package and deterministic agent episodes, not live provider quality or a real hosted GitHub publication.
10. Run the focused qualification contract tests, execute the new installed-package scenario from a clean candidate, run qualification:check, and run the Verification Contract selected regression set. Record exact commands, final public readback, residual risks, and flake classification.

## Verify Steps

1. Inspect the scenario implementation and run its contract tests. Expected: it creates a clean temporary Git repository, installs the exact candidate tarball into an isolated prefix, invokes only the installed public CLI for AgentPlane operations, and has no direct reads or writes under `.agentplane` except writing the exact exchange result path returned by a public packet.
2. Execute `node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle`. Expected: the real fixture task passes semantic intake, approved planning, implementation, deterministic verification, evaluator review, AgentPlane-owned finish/commit, and final public readback; source, tests, docs, and `.gitignore` all change and their observable behavior is asserted.
3. Run negative cases for omitted code, tests, docs, metadata, verification, evaluator, commit/finish, stale exchange, unexpected internal-artifact access, and leaked temporary state. Expected: each incomplete or simulated path fails with a stable phase-specific diagnostic and a non-zero scenario result.
4. Validate `scripts/qualification/v0.7.1-release-qualification.json`. Expected: `packaged-mixed-scope-lifecycle` is full-tier, `release_disposition=block`, has a bounded timeout and lifecycle coverage, and every pre-existing scenario remains present and unchanged unless a documented dependency is added.
5. Inspect and test `.github/workflows/ci.yml` plus release CI contract tests. Expected: `verify-real-e2e` runs the existing packaged and hosted scenarios plus `packaged-mixed-scope-lifecycle` whenever the Verification Contract requires real E2E; the aggregate and release-ready gates require its success.
6. Run `node --test scripts/qualification/release-qualification.test.mjs`. Expected: manifest coverage, selection, blocking defects, scheduling, cleanup, and CI wiring assertions pass.
7. Run `bun run qualification:check`. Expected: the complete dry-run contract passes without removing or weakening any existing release check.
8. Run the Verification Contract selected local regression and inspect `git status --short --untracked-files=all`. Expected: all required checks pass, no temporary fixture or package artifacts remain, and only task-approved implementation and evidence paths are changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-13T16:34:52.060Z — VERIFY — ok

By: TESTER

Note: Verified exact published SHA ab7abe4d1 and hosted Core CI run 31720631534; installed-package mixed-scope lifecycle and every Verification Contract group passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8c4b389918a693b772b8749782b0697958eb52a8bc31b22dabee998dc3f582e9, input_digest=sha256:89398bf99d35ba4d0a57b6b0d22f51212ab6ed1921347d8d244b74b1341defc4

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts; node --test scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: focused Vitest passed 22/22 and qualification contract passed 37/37 on the task branch
Scope: evaluator fingerprint stability, task envelope advance, CI routing, scenario selection and negative lifecycle cases

Check: critical_paths
Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle
Result: pass
Evidence: exact clean SHA ab7abe4d1 passed installed-package black-box lifecycle in 18817ms with a 5080-byte plan, exact replay idempotency, stale rejection, evaluator, finish commit, cleanup and public readback
Scope: first-task mixed source, test, docs and metadata lifecycle from public installed CLI only

Check: docs_contract
Command: bun run docs:scripts:check; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: generated scripts README is current and policy routing reported OK; Core CI verify-contract also passed
Scope: generated command documentation and repository policy graph

Check: full_regression
Command: GitHub Actions Core CI run 31720631534
Result: pass
Evidence: verify-tests passed in 7m31s, verify-static in 4m34s, verify-contract in 2m42s, verify-security in 2m27s, Windows in 3m34s, package runtime in 50s, aggregate PR verification in 15s
Scope: complete routed hosted regression for exact PR head ab7abe4d1d0676340aa1820aaa9e6728d4126af9

Check: hosted_integration
Command: gh run view 31720631534; gh pr view 4831
Result: pass
Evidence: GitHub Core CI concluded success for exact PR head ab7abe4d1d0676340aa1820aaa9e6728d4126af9 and PR aggregate gate passed
Scope: hosted Linux, Windows, security, package runtime and aggregate integration boundary

Check: task_outcome
Command: bun run qualification:check; node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle; git status --short --untracked-files=all
Result: pass
Evidence: qualification contract and full dry-run passed, black-box scenario passed with zero blocking defects, no temporary fixture or package artifacts leaked
Scope: approved EZZZYH outcome and clean candidate boundary

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608122156-EZZZYH-add-installed-package-mixed-scope-lifecycle-e2e/.agentplane/tasks/202608122156-EZZZYH/blueprint/resolved-snapshot.json
- old_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
- current_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608122156-EZZZYH

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608122156-EZZZYH
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-13T17:08:34.348Z — VERIFY — ok

By: TESTER

Note: Verified exact published SHA 207a86ab5 with hosted Core CI run 31723346838; review fixes, installed-package lifecycle, and every selected verification group passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8c4b389918a693b772b8749782b0697958eb52a8bc31b22dabee998dc3f582e9, input_digest=sha256:8730f7164c807f73d723885b452ec49c4c987622a7a78c81e239e2665f947582

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts; node --test scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: focused Vitest passed 9/9 after the review fixes; qualification contract passed 37/37 on exact current sources
Scope: evaluator fingerprint stability, task envelope advance, CI routing, scenario selection, failure mode coverage

Check: critical_paths
Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario packaged-mixed-scope-lifecycle
Result: pass
Evidence: exact clean SHA 207a86ab5 passed the installed tarball black-box lifecycle in 18787ms; plan size 5080 bytes, exact replay idempotent, stale replay rejected, evaluator and finish persisted, final consumer readback passed
Scope: first-task mixed source, tests, docs and metadata lifecycle using only the installed public CLI

Check: docs_contract
Command: bun run qualification:check; Core CI verify-contract
Result: pass
Evidence: qualification contract passed 37/37, full manifest dry-run retained all 20 scenarios, hosted verify-contract passed on 207a86ab5
Scope: generated documentation, qualification manifest, CI contract, repository policy graph

Check: full_regression
Command: GitHub Actions Core CI run 31723346838
Result: pass
Evidence: verify-tests, verify-static, verify-contract, verify-security, Windows, package runtime, and aggregate PR verification all passed on exact head 207a86ab5
Scope: complete routed hosted regression for the current implementation

Check: hosted_integration
Command: gh run view 31723346838; gh pr view 4831
Result: pass
Evidence: Core CI concluded success for exact PR head 207a86ab5bcb897a9032edcc4f35bc1e4f5ae092; aggregate PR gate passed and all review threads are resolved
Scope: hosted Linux, Windows, security, package-runtime, review, and aggregate boundaries

Check: task_outcome
Command: bun run qualification:check; installed-package black-box scenario; git status --short --untracked-files=all
Result: pass
Evidence: complete dry-run contract passed; black-box scenario passed with zero blocking defects; candidate packaging and temporary fixture cleanup passed; product tree stayed stable across lifecycle-only tail commits
Scope: approved EZZZYH outcome, deterministic lifecycle, exact commit identity, and clean candidate boundary

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608122156-EZZZYH-add-installed-package-mixed-scope-lifecycle-e2e/.agentplane/tasks/202608122156-EZZZYH/blueprint/resolved-snapshot.json
- old_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
- current_digest: 72867270b7cf279c96932125ddc698ff2ebf2308c32b7a560ec02c9e4b6dd025
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608122156-EZZZYH

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only the scenario runner, manifest entry, CI wiring, focused contract tests, documentation, and task artifacts introduced by this task.
- Restore the previous `verify-real-e2e` scenario list without changing any pre-existing qualification scenario implementation or threshold.
- Re-run the qualification contract and dry-run manifest checks to prove the original gate remains valid.
- Do not rewrite published tags, release evidence, or PR #4830 history.

## Findings

## Token Usage

- State: `unavailable`
- Completeness: `0/2` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:4d0511c8b46d51691b0e9251e65cc32e0944a8efd1076840a4cd97249958b2a2`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-13T17:11:23.534Z`
