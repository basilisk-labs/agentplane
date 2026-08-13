---
id: "202608122156-EZZZYH"
title: "Add installed-package mixed-scope lifecycle E2E to release qualification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
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
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_release_metadata"
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
    required_evidence:
      - "hosted_integration"
      - "repository_effect:ci"
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
events:
  -
    type: "status"
    at: "2026-08-13T15:34:09.216Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-13T15:34:09.216Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only the scenario runner, manifest entry, CI wiring, focused contract tests, documentation, and task artifacts introduced by this task.
    - Restore the previous `verify-real-e2e` scenario list without changing any pre-existing qualification scenario implementation or threshold.
    - Re-run the qualification contract and dry-run manifest checks to prove the original gate remains valid.
    - Do not rewrite published tags, release evidence, or PR #4830 history.
  Findings: ""
extensions:
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only the scenario runner, manifest entry, CI wiring, focused contract tests, documentation, and task artifacts introduced by this task.
- Restore the previous `verify-real-e2e` scenario list without changing any pre-existing qualification scenario implementation or threshold.
- Re-run the qualification contract and dry-run manifest checks to prove the original gate remains valid.
- Do not rewrite published tags, release evidence, or PR #4830 history.

## Findings
