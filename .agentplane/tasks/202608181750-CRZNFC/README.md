---
id: "202608181750-CRZNFC"
title: "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref."
status: "BLOCKED"
priority: "high"
owner: "INTEGRATOR"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "v0.7.7"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-18T17:51:45.911Z"
  updated_by: "USER"
  note: null
verification:
  state: "pending"
  updated_at: "2026-08-18T17:54:14.753Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
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
      - "ci"
      - "security_boundary"
    writable_roots:
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - "docs"
      - "packages"
      - "schemas"
      - "scripts"
      - "website"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "USER-approved blocked-result scope extension: roots=.agentplane/WORKFLOW.md,docs,packages,schemas,scripts,website; repository_effects=dependencies,documentation,public_api,release_metadata,repository_write,schema,source_code,tests"
      - "USER-approved blocked-result scope extension: roots=.agentplane/config.json; repository_effects=release_metadata,repository_write"
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
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
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - "docs"
      - "packages"
      - "schemas"
      - "scripts"
      - "website"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
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
          - ".agentplane/WORKFLOW.md"
          - ".agentplane/config.json"
          - "docs"
          - "packages"
          - "schemas"
          - "scripts"
          - "website"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
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
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
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
      digest: "sha256:ed81cd0178ff6762a575fe547fc2b584ac20f55e618be78e4cb51d3ae65b1ad9"
      escalation_reasons:
        - "effect_dependencies"
        - "effect_public_api"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
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
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Stable release implementation cannot begin under the legacy release-only authority because canonical 0.7.7 promotion necessarily updates dependency pins, public version exports, documentation, generated assets, tests/baselines, schemas/examples, and repository expected-version surfaces in addition to release metadata. Recommended action: Extend task scope to the canonical version and generated release surfaces, then request a fresh implementation packet. Requested scope: roots=.agentplane/WORKFLOW.md,docs,packages,schemas,scripts,website; repository effects=dependencies,documentation,public_api,release_metadata,repository_write,schema,source_code,tests; request digest=sha256:58e6526f03c7f66a4ca8d9ca4fbcdd42e6c6cb3615734fcbf66bf32b756db0ad. Agentplane receipt: external-agent-blocker/tr_960a0b300ffdd1129eb3c5a662c84d3c/sha256:4c869c7ae707b155cc7f8b95505c492c320e1c3512311d10e75da64cf6cec784/sha256:58e6526f03c7f66a4ca8d9ca4fbcdd42e6c6cb3615734fcbf66bf32b756db0ad."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/WORKFLOW.md, docs, packages, schemas, scripts, website; repository effects: dependencies, documentation, public_api, release_metadata, repository_write, schema, source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version dry-run resolves exactly 0.7.7 from 0.7.7-beta.1, but it also updates the protected .agentplane/config.json expected-version surface, which was omitted from the first scope extension. Recommended action: Extend scope to .agentplane/config.json and request a fresh implementation packet. Requested scope: roots=.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:c0a97ea60bc7c8ba63126e4338e42fb5ffa1040dafab6424fa4d849570eed135. Agentplane receipt: external-agent-blocker/tr_db40d04d3ba232cd5a198e3dfd1a1c2e/sha256:a255590f2781062f631f79de4177f9f44e03fe122e10a51b15797ed6723461d7/sha256:c0a97ea60bc7c8ba63126e4338e42fb5ffa1040dafab6424fa4d849570eed135."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/config.json; repository effects: release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Stable 0.7.7 version surfaces and generated release assets are prepared, but the canonical release gate exposed tracked volatile evidence from shipped task 202608112259-T3ZDDM outside the current writable roots. Recommended action: Extend the current release task scope to the exact historical evidence directory, remove only the 32 policy-rejected .log/.jsonl files while preserving compact reports and verification receipts, then rerun all canonical release gates. Requested scope: roots=.agentplane/tasks/202608112259-T3ZDDM/evidence; repository effects=repository_write; request digest=sha256:668437b4fe03dca121fef86af2195153779536253ce670f0cc5463cb2d5596b3. Agentplane receipt: external-agent-blocker/tr_215366b9b0957e188e7e0556667d693b/sha256:c969bb0459eeb19f8834efa22687b3688fe2d5bce3042a00ce864820dbb0665e/sha256:668437b4fe03dca121fef86af2195153779536253ce670f0cc5463cb2d5596b3."
events:
  -
    type: "status"
    at: "2026-08-18T17:51:51.573Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-18T17:52:55.532Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Stable release implementation cannot begin under the legacy release-only authority because canonical 0.7.7 promotion necessarily updates dependency pins, public version exports, documentation, generated assets, tests/baselines, schemas/examples, and repository expected-version surfaces in addition to release metadata. Recommended action: Extend task scope to the canonical version and generated release surfaces, then request a fresh implementation packet. Requested scope: roots=.agentplane/WORKFLOW.md,docs,packages,schemas,scripts,website; repository effects=dependencies,documentation,public_api,release_metadata,repository_write,schema,source_code,tests; request digest=sha256:58e6526f03c7f66a4ca8d9ca4fbcdd42e6c6cb3615734fcbf66bf32b756db0ad. Agentplane receipt: external-agent-blocker/tr_960a0b300ffdd1129eb3c5a662c84d3c/sha256:4c869c7ae707b155cc7f8b95505c492c320e1c3512311d10e75da64cf6cec784/sha256:58e6526f03c7f66a4ca8d9ca4fbcdd42e6c6cb3615734fcbf66bf32b756db0ad."
  -
    type: "status"
    at: "2026-08-18T17:53:59.315Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version dry-run resolves exactly 0.7.7 from 0.7.7-beta.1, but it also updates the protected .agentplane/config.json expected-version surface, which was omitted from the first scope extension. Recommended action: Extend scope to .agentplane/config.json and request a fresh implementation packet. Requested scope: roots=.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:c0a97ea60bc7c8ba63126e4338e42fb5ffa1040dafab6424fa4d849570eed135. Agentplane receipt: external-agent-blocker/tr_db40d04d3ba232cd5a198e3dfd1a1c2e/sha256:a255590f2781062f631f79de4177f9f44e03fe122e10a51b15797ed6723461d7/sha256:c0a97ea60bc7c8ba63126e4338e42fb5ffa1040dafab6424fa4d849570eed135."
  -
    type: "status"
    at: "2026-08-18T18:06:33.009Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Stable 0.7.7 version surfaces and generated release assets are prepared, but the canonical release gate exposed tracked volatile evidence from shipped task 202608112259-T3ZDDM outside the current writable roots. Recommended action: Extend the current release task scope to the exact historical evidence directory, remove only the 32 policy-rejected .log/.jsonl files while preserving compact reports and verification receipts, then rerun all canonical release gates. Requested scope: roots=.agentplane/tasks/202608112259-T3ZDDM/evidence; repository effects=repository_write; request digest=sha256:668437b4fe03dca121fef86af2195153779536253ce670f0cc5463cb2d5596b3. Agentplane receipt: external-agent-blocker/tr_215366b9b0957e188e7e0556667d693b/sha256:c969bb0459eeb19f8834efa22687b3688fe2d5bce3042a00ce864820dbb0665e/sha256:668437b4fe03dca121fef86af2195153779536253ce670f0cc5463cb2d5596b3."
doc_version: 3
doc_updated_at: "2026-08-18T18:06:33.009Z"
doc_updated_by: "SUPERVISOR"
description: "Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability."
sections:
  Summary: |-
    Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.

    Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.
  Scope: |-
    - In scope: Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.
    - Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.".
  Plan: "1. Freeze exact base 708f0d7d5b813ea2bb4de659d9eb113a752e3c63 after PR #4844 and successful Task Hosted Close 32167609851; confirm clean main, empty incidents, current public 0.7.6, and no existing 0.7.7 publication. 2. Create the release.strict branch worktree and use the canonical release planner/version tooling to promote all package versions, internal pins, repository expected CLI, generated headers/assets, schemas/examples, and docs/releases/v0.7.7.md from 0.7.7-beta.1 to stable 0.7.7 without semantic source changes. 3. Run focused stable/prerelease workflow regressions, release parity, release:prepublish, release:check, full fast, critical, release-critical, documentation/site, policy/routing, and diff hygiene checks on the exact candidate. 4. Independently evaluate exact candidate scope and evidence, publish its exact head, obtain all hosted checks with no unresolved review threads, and integrate through the AgentPlane queue plus hosted close. 5. On exact merged main, require release-ready evidence, grant only the state-bound hosted publication operation, dispatch Publish release for version 0.7.7 and exact SHA, then verify publish-result, tag, latest GitHub Release, npm identities and internal dependency pins for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes. 6. Verify the automated next-development PR opens 0.7.8-beta.1 with consistent version surfaces and successful hosted checks. 7. Only after public proof, create a recovery ref for the original checkout, close superseded PRs #4838, #4839, #4841, and #4843, retire obsolete local task artifacts without replaying patch-equivalent commits, reconcile the original checkout to current main, and report any historical non-release debt separately."
  Verify Steps: |-
    PLANNER fallback scaffold for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.scope_extension_request:
    blocker_state_fingerprint: "sha256:c969bb0459eeb19f8834efa22687b3688fe2d5bce3042a00ce864820dbb0665e"
    kind: "task_scope_extension_request"
    request:
      rationale: "The user explicitly requested cleanup of obsolete unpublished state, and the canonical stable release gate proves these tracked raw files violate the current artifact policy while their summarized evidence remains preserved."
      repository_effects:
        - "repository_write"
      schema_version: 1
      scope_roots:
        - ".agentplane/tasks/202608112259-T3ZDDM/evidence"
    request_digest: "sha256:668437b4fe03dca121fef86af2195153779536253ce670f0cc5463cb2d5596b3"
    schema_version: 1
    status: "pending"
    transition_id: "tr_215366b9b0957e188e7e0556667d693b"
  workflow_route_baseline:
    start_head_sha: "708f0d7d5b813ea2bb4de659d9eb113a752e3c63"
    version: 1
id_source: "generated"
---
## Summary

Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.

Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.

## Scope

- In scope: Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.".

## Plan

1. Freeze exact base 708f0d7d5b813ea2bb4de659d9eb113a752e3c63 after PR #4844 and successful Task Hosted Close 32167609851; confirm clean main, empty incidents, current public 0.7.6, and no existing 0.7.7 publication. 2. Create the release.strict branch worktree and use the canonical release planner/version tooling to promote all package versions, internal pins, repository expected CLI, generated headers/assets, schemas/examples, and docs/releases/v0.7.7.md from 0.7.7-beta.1 to stable 0.7.7 without semantic source changes. 3. Run focused stable/prerelease workflow regressions, release parity, release:prepublish, release:check, full fast, critical, release-critical, documentation/site, policy/routing, and diff hygiene checks on the exact candidate. 4. Independently evaluate exact candidate scope and evidence, publish its exact head, obtain all hosted checks with no unresolved review threads, and integrate through the AgentPlane queue plus hosted close. 5. On exact merged main, require release-ready evidence, grant only the state-bound hosted publication operation, dispatch Publish release for version 0.7.7 and exact SHA, then verify publish-result, tag, latest GitHub Release, npm identities and internal dependency pins for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes. 6. Verify the automated next-development PR opens 0.7.8-beta.1 with consistent version surfaces and successful hosted checks. 7. Only after public proof, create a recovery ref for the original checkout, close superseded PRs #4838, #4839, #4841, and #4843, retire obsolete local task artifacts without replaying patch-equivalent commits, reconcile the original checkout to current main, and report any historical non-release debt separately.

## Verify Steps

PLANNER fallback scaffold for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
