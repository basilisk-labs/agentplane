---
id: "202608182243-NMAHN5"
title: "Redesign the Agentplane homepage around a clear authority-to-proof happy path"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "npm --prefix website run build"
  - "npm --prefix website run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-18T22:49:18.844Z"
  updated_by: "USER"
  note: "User approved the refined white-background hybrid design in chat; hero visual must resemble a real Agentplane Receipt with WorkOrder, scoped authority, observed verification, and Recorded in Git status."
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
    authority_violations:
      - "repository_effect:documentation"
    changed_components:
      - "website"
    changed_paths:
      - "website/docusaurus.config.ts"
      - "website/src/data/homepage-content.ts"
      - "website/src/pages/_home.module.css"
      - "website/src/pages/index.tsx"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
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
          - "repository_effect:documentation"
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
      digest: "sha256:cd21ac3d2f3074675f286bbcc851388f20beda6d1783144f5697e3931c56e5a6"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
        - "cli"
      observed:
        changed_components:
          - "website"
        changed_files:
          - "website/docusaurus.config.ts"
          - "website/src/data/homepage-content.ts"
          - "website/src/pages/_home.module.css"
          - "website/src/pages/index.tsx"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "55b45ac37835a9bb1d9f79f0f2ba6c9a9b5973f3"
  message: "🚧 NMAHN5 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 55b45ac37835. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-18T22:51:48.137Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-18T23:16:00.379Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 55b45ac37835. CLI accepted one state-bound external-agent semantic result."
    commit: "55b45ac37835a9bb1d9f79f0f2ba6c9a9b5973f3"
doc_version: 3
doc_updated_at: "2026-08-18T23:16:00.379Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the selected hybrid visual target: compact header from concept 3, icon-led diagrams and evidence storytelling from concept 1, a white background, modern multicolor semantic accents, responsive behavior, and restrained microinteractions. Preserve the current Git-native control-plane positioning and working navigation/CTAs."
sections:
  Summary: |-
    Redesign the Agentplane homepage around a clear authority-to-proof happy path

    Implement the selected hybrid visual target: compact header from concept 3, icon-led diagrams and evidence storytelling from concept 1, a white background, modern multicolor semantic accents, responsive behavior, and restrained microinteractions. Preserve the current Git-native control-plane positioning and working navigation/CTAs.
  Scope: |-
    - In scope: Implement the selected hybrid visual target: compact header from concept 3, icon-led diagrams and evidence storytelling from concept 1, a white background, modern multicolor semantic accents, responsive behavior, and restrained microinteractions. Preserve the current Git-native control-plane positioning and working navigation/CTAs.
    - Out of scope: unrelated refactors not required for "Redesign the Agentplane homepage around a clear authority-to-proof happy path".
  Plan: "Implement the selected hybrid homepage in the existing Docusaurus website: compact quiet header, white editorial canvas, concise authority-to-proof story, icon-led four-step loop, one credible repository receipt, and restrained interaction states. Keep the implementation limited to the homepage presentation and shared visual tokens needed by it, preserve existing routes and tracking, and validate responsive rendering plus build and typecheck."
  Verify Steps: |-
    PLANNER fallback scaffold for "Redesign the Agentplane homepage around a clear authority-to-proof happy path". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Redesign the Agentplane homepage around a clear authority-to-proof happy path". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  workflow_route_baseline:
    start_head_sha: "0221381720a5b70e1591aa7e3c103eb8639a6ef7"
    version: 1
id_source: "generated"
---
## Summary

Redesign the Agentplane homepage around a clear authority-to-proof happy path

Implement the selected hybrid visual target: compact header from concept 3, icon-led diagrams and evidence storytelling from concept 1, a white background, modern multicolor semantic accents, responsive behavior, and restrained microinteractions. Preserve the current Git-native control-plane positioning and working navigation/CTAs.

## Scope

- In scope: Implement the selected hybrid visual target: compact header from concept 3, icon-led diagrams and evidence storytelling from concept 1, a white background, modern multicolor semantic accents, responsive behavior, and restrained microinteractions. Preserve the current Git-native control-plane positioning and working navigation/CTAs.
- Out of scope: unrelated refactors not required for "Redesign the Agentplane homepage around a clear authority-to-proof happy path".

## Plan

Implement the selected hybrid homepage in the existing Docusaurus website: compact quiet header, white editorial canvas, concise authority-to-proof story, icon-led four-step loop, one credible repository receipt, and restrained interaction states. Keep the implementation limited to the homepage presentation and shared visual tokens needed by it, preserve existing routes and tracking, and validate responsive rendering plus build and typecheck.

## Verify Steps

PLANNER fallback scaffold for "Redesign the Agentplane homepage around a clear authority-to-proof happy path". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Redesign the Agentplane homepage around a clear authority-to-proof happy path". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
