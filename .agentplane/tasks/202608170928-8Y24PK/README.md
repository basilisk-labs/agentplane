---
id: "202608170928-8Y24PK"
title: "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "hermes"
  - "agentplane"
  - "worker-lane"
  - "runner"
  - "integration"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "publish"
  - "security"
  - "external_system"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-17T09:29:25.839Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-17T10:39:21.486Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-17T10:44:05.819Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 4 typed finding(s)."
  evaluated_sha: "af4dc232876377fa63f2bf9048b5d9f53fcd2ee2"
  blueprint_digest: "4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb"
  evidence_refs:
    - ".agentplane/tasks/202608170928-8Y24PK/quality/20260817-103939922-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/20260817-103939922-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/objects/sha256/460977450c3a061d773bb2b76516e17afca5ef4fff2c214cc88efe7435a6f6df.md"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/20260817-103939922-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/20260817-103939922-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/20260817-103939922-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/20260817-103939922-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608170928-8Y24PK/README.md"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/objects/sha256/d18b63a1ba8962a889c0073593207182dca35e83877aa9e3b161c6b06cfdba7c.patch"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/objects/sha256/b421ffc3f41352a47521c9e8cd39e8976d4583276502dd1c0f864124780cd34f.json"
    - ".agentplane/tasks/202608170928-8Y24PK/verification/20260817103921486-6f4008b48b04b1bd.json"
    - ".agentplane/tasks/202608170928-8Y24PK/quality/objects/sha256/9d4211df768252e341fc46edf87f511d30d4f4f08d289efc5570b595c38e2b08.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "GitHub Actions Core CI job verify-static fails in packages/agentplane/src/commands/hermes/hermes-environment.ts:28:74 because @typescript-eslint/prefer-nullish-coalescing rejects logical OR in the protocol snapshot fallback."
    - "The required change is scoped and mechanical: replace the fallback expression with nullish coalescing, then rerun lint and the Hermes command tests before republishing the task head."
    - "The plugin PR is independently green, and the Hermes upstream PR is mergeable; those hosted facts do not override the failing AgentPlane quality gate."
    - "Residual risk: The remaining in-progress hosted jobs must complete successfully on the corrected head."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
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
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
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
    writable_roots:
      - "agentplane-recipes/recipes/hermes-agentplane"
      - "docs/recipes/hermes-agentplane.mdx"
      - "docs/workflow-guides/hermes-kanban.mdx"
      - "integrations/hermes-agentplane-plugin"
      - "packages/agentplane/src/cli/run-cli/commands/init"
      - "packages/agentplane/src/commands/hermes"
      - "packages/agentplane/src/runner"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch and PR isolation are required because the Hermes upstream branch is stale and external publication must remain separately authorized."
      - "The integration spans three versioned repositories and changes a public worker-lane and runner protocol."
      - "The security boundary changes environment inheritance, workspace allowlists, current-run guards, and terminal completion authority."
    repository_effects:
      - "ci"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "agentplane-recipes/recipes/hermes-agentplane"
      - "docs/recipes/hermes-agentplane.mdx"
      - "docs/workflow-guides/hermes-kanban.mdx"
      - "integrations/hermes-agentplane-plugin"
      - "packages/agentplane/src/cli/run-cli/commands/init"
      - "packages/agentplane/src/commands/hermes"
      - "packages/agentplane/src/runner"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
      - "integrations"
      - "packages/agentplane"
    changed_paths:
      - "docs/recipes/hermes-agentplane.mdx"
      - "docs/workflow-guides/hermes-kanban.mdx"
      - "integrations/hermes-agentplane-plugin/README.md"
      - "integrations/hermes-agentplane-plugin/lane-registry.example.json"
      - "integrations/hermes-agentplane-plugin/protocol-v2.schema.json"
      - "packages/agentplane/src/commands/hermes/hermes-environment.ts"
      - "packages/agentplane/src/commands/hermes/hermes-runtime.ts"
      - "packages/agentplane/src/commands/hermes/hermes.command.test.ts"
      - "packages/agentplane/src/commands/hermes/hermes.command.ts"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "schema"
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
      -
        id: "recorded-check-7"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
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
          - "agentplane-recipes/recipes/hermes-agentplane"
          - "docs/recipes/hermes-agentplane.mdx"
          - "docs/workflow-guides/hermes-kanban.mdx"
          - "integrations/hermes-agentplane-plugin"
          - "packages/agentplane/src/cli/run-cli/commands/init"
          - "packages/agentplane/src/commands/hermes"
          - "packages/agentplane/src/runner"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:ci"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "ci"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:dd4da45c92dc327e3f30c5f18c3e27def1de3b973f012024e9fc3fcc1237ed46"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli/commands/init"
        - "effect_ci"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "reversibility_recovery_required"
        - "unknown_path:integrations/hermes-agentplane-plugin/lane-registry.example.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "integrations"
          - "packages/agentplane"
        changed_files:
          - "docs/recipes/hermes-agentplane.mdx"
          - "docs/workflow-guides/hermes-kanban.mdx"
          - "integrations/hermes-agentplane-plugin/README.md"
          - "integrations/hermes-agentplane-plugin/lane-registry.example.json"
          - "integrations/hermes-agentplane-plugin/protocol-v2.schema.json"
          - "packages/agentplane/src/commands/hermes/hermes-environment.ts"
          - "packages/agentplane/src/commands/hermes/hermes-runtime.ts"
          - "packages/agentplane/src/commands/hermes/hermes.command.test.ts"
          - "packages/agentplane/src/commands/hermes/hermes.command.ts"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "schema"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "implementation_risk_validation"
      - "repository_effect:ci"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "af4dc232876377fa63f2bf9048b5d9f53fcd2ee2"
  message: "🚧 8Y24PK task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: af4dc2328763. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-17T09:29:36.776Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-17T09:41:12.097Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: af4dc2328763. CLI accepted one state-bound external-agent semantic result."
    commit: "af4dc232876377fa63f2bf9048b5d9f53fcd2ee2"
  -
    type: "verify"
    at: "2026-08-17T09:41:21.911Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "verify"
    at: "2026-08-17T10:39:21.486Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-08-17T10:39:25.835Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published."
sections:
  Summary: |-
    Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories

    Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.
  Scope: |-
    - In scope: Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.
    - Out of scope: unrelated refactors not required for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories".
  Plan: "Implement the approved three-repository Hermes integration in dependency order: establish the AgentPlane 0.7.6 fail-closed bridge contract and terminal attestation; release an external plugin 0.2.0 that drives the canonical task advance exchange and managed runner result transport; refresh the Hermes worker-lane registry hook on current upstream main; then prove the installed-package PLANNER, approval, EXECUTOR, EVALUATOR, retry, stale-run, and terminal-completion paths without direct kanban.db writes. Preserve the obsolete D5MAJ3 worktree and failed DDW1J5 intake, and stop at every AgentPlane authority or external-provider boundary."
  Verify Steps: |-
    PLANNER fallback scaffold for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-17T09:41:21.911Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8559ac20d950c1601ef1434555ed99c5da9a5c52304a4f16ad1abdb9862d0ce0, input_digest=sha256:6c4c98fa8b20253fcfce4dc05b6e9776158b3429d314f9789870eb501d061802

    Details:

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check critical_paths

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check docs_contract

    Check: full_regression
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check full_regression

    Check: hosted_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check hosted_integration

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check real_e2e

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608170928-8Y24PK-upgrade-the-hermes-agentplane-bridge-protocol-ac/.agentplane/tasks/202608170928-8Y24PK/blueprint/resolved-snapshot.json
    - old_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
    - current_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608170928-8Y24PK

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-17T10:39:21.486Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8559ac20d950c1601ef1434555ed99c5da9a5c52304a4f16ad1abdb9862d0ce0, input_digest=sha256:7233d6280eb21c617c7ac9991c3f2371da24036dd0728c39a7c00a08e9b16aac

    Details:

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check critical_paths

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check docs_contract

    Check: full_regression
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check full_regression

    Check: hosted_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check hosted_integration

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check real_e2e

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608170928-8Y24PK Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608170928-8Y24PK-upgrade-the-hermes-agentplane-bridge-protocol-ac/.agentplane/tasks/202608170928-8Y24PK/blueprint/resolved-snapshot.json
    - old_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
    - current_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608170928-8Y24PK

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608170928-8Y24PK
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
  workflow_route_baseline:
    start_head_sha: "89f760183da24c5a768dfe97e6c4c2fb67bd1478"
    version: 1
id_source: "generated"
---
## Summary

Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories

Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.

## Scope

- In scope: Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.
- Out of scope: unrelated refactors not required for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories".

## Plan

Implement the approved three-repository Hermes integration in dependency order: establish the AgentPlane 0.7.6 fail-closed bridge contract and terminal attestation; release an external plugin 0.2.0 that drives the canonical task advance exchange and managed runner result transport; refresh the Hermes worker-lane registry hook on current upstream main; then prove the installed-package PLANNER, approval, EXECUTOR, EVALUATOR, retry, stale-run, and terminal-completion paths without direct kanban.db writes. Preserve the obsolete D5MAJ3 worktree and failed DDW1J5 intake, and stop at every AgentPlane authority or external-provider boundary.

## Verify Steps

PLANNER fallback scaffold for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-17T09:41:21.911Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8559ac20d950c1601ef1434555ed99c5da9a5c52304a4f16ad1abdb9862d0ce0, input_digest=sha256:6c4c98fa8b20253fcfce4dc05b6e9776158b3429d314f9789870eb501d061802

Details:

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check affected_unit_integration

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check critical_paths

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check docs_contract

Check: full_regression
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check full_regression

Check: hosted_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check hosted_integration

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check real_e2e

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608170928-8Y24PK-upgrade-the-hermes-agentplane-bridge-protocol-ac/.agentplane/tasks/202608170928-8Y24PK/blueprint/resolved-snapshot.json
- old_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
- current_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608170928-8Y24PK

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-17T10:39:21.486Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8559ac20d950c1601ef1434555ed99c5da9a5c52304a4f16ad1abdb9862d0ce0, input_digest=sha256:7233d6280eb21c617c7ac9991c3f2371da24036dd0728c39a7c00a08e9b16aac

Details:

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check affected_unit_integration

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check critical_paths

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check docs_contract

Check: full_regression
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check full_regression

Check: hosted_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check hosted_integration

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check real_e2e

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608170928-8Y24PK/supervision/declared-checks.json#checks
Scope: branch_pr task 202608170928-8Y24PK Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608170928-8Y24PK-upgrade-the-hermes-agentplane-bridge-protocol-ac/.agentplane/tasks/202608170928-8Y24PK/blueprint/resolved-snapshot.json
- old_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
- current_digest: 4701eb33f28b822c416856c61d87a8cefcc84a824b74b67f0436b905147694fb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608170928-8Y24PK

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608170928-8Y24PK
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
