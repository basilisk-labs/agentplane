---
id: "202609261720-KKE9ZN"
title: "Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 118
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.12"
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run package:install-smoke"
  - "bun run test:release:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-28T10:15:14.467Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-27T19:18:02.576Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:5dd197e110bdc7f9da6def8e00d6cb750262e3a84ca44254bf23d29bf3d9141f"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-28T10:15:14.467Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "db14bb4aad12c31a04d895967442d0b5db3bcd2b"
  review_identity_digest: "sha256:0233e18dcc80cef2f7a68dd9921482850c6e5a6b9ec791646b3b56661a4635b2"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609261720-KKE9ZN/f83d8c88af429edf6bb65b39ef9c4ff2cae09674bf7b2ae0aa7122b621ce6bf7/quality-report.json"
  findings:
    - "Read and digest-validated all 13 context blocks and all three path-addressed native evidence artifacts."
    - "Native evidence binds sole nonmetadata change docs/releases/v0.7.12-m04.md to db14bb4aad12c31a04d895967442d0b5db3bcd2b. Source pins and the report digest match reviewed bytes."
    - "Both native benchmark regression checks passed with nonzero historical coverage. Report labels that historical coverage as distinct from M04."
    - "No live campaign is claimed; unknown host/retry accounting and both unknown latency endpoints are shown separately for supplied-plan and managed-bridge strata."
    - "This is a same-host review, not independent second-agent/provider measurement qualification."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
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
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects: []
    writable_roots:
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages"
      - "schemas"
      - "scripts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "dependencies"
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
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages"
      - "schemas"
      - "scripts"
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
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
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
          - "bun.lock"
          - "docs"
          - "package.json"
          - "packages"
          - "schemas"
          - "scripts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:dependencies"
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
        repository_effects:
          - "ci"
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:9b69c3a19ff50023fc85a667a430b3c36f9930206b36430225dfec1d7dfbbc2d"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "effect_security_boundary"
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
      - "hosted_integration"
      - "repository_effect:ci"
      - "repository_effect:dependencies"
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
  hash: "db14bb4aad12c31a04d895967442d0b5db3bcd2b"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-26T17:20:51.717Z"
doc_updated_by: "CODER"
description: "User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14."
sections:
  Summary: |-
    Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12

    User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.
  Scope: |-
    - In scope: User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.
    - Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12".
  Plan: |-
    1. Execute approved WorkItem PL-01.
    2. Execute approved WorkItem PL-02.
    3. Execute approved WorkItem PL-03.
    4. Execute approved WorkItem PL-04.
    5. Execute approved WorkItem PL-05.
    6. Execute approved WorkItem PL-06.
    7. Execute approved WorkItem PL-07.
    8. Execute approved WorkItem PL-08.
    9. Execute approved WorkItem PL-09.
    10. Execute approved WorkItem PL-10.
    11. Execute approved WorkItem PL-11.
    12. Execute approved WorkItem PL-12.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run package:install-smoke`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:12706d3a654644242e0d4c2029d4e876c4419f77495bfa01b53151e366e14bf3"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609261720-KKE9ZN/f83d8c88af429edf6bb65b39ef9c4ff2cae09674bf7b2ae0aa7122b621ce6bf7/quality-report.json"
    findings:
      - "Read and digest-validated all 13 context blocks and all three path-addressed native evidence artifacts."
      - "Native evidence binds sole nonmetadata change docs/releases/v0.7.12-m04.md to db14bb4aad12c31a04d895967442d0b5db3bcd2b. Source pins and the report digest match reviewed bytes."
      - "Both native benchmark regression checks passed with nonzero historical coverage. Report labels that historical coverage as distinct from M04."
      - "No live campaign is claimed; unknown host/retry accounting and both unknown latency endpoints are shown separately for supplied-plan and managed-bridge strata."
      - "This is a same-host review, not independent second-agent/provider measurement qualification."
    implementation_commit: "db14bb4aad12c31a04d895967442d0b5db3bcd2b"
    implementation_tree: "8e5a50f6082b2d1cbd6d5e30014e3bdf439f67b4"
    projected_at: "2026-09-28T10:15:14.467Z"
    review_identity_digest: "sha256:0233e18dcc80cef2f7a68dd9921482850c6e5a6b9ec791646b3b56661a4635b2"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:2386474243d72c64cb501c88b652bc8a2854c343a3bd86216392726f02872bfd"
    work_order_id: "sha256:c6c4abfe24dc8f64bffc794720884ce0c0a9e4af74812b0f94f552c7bc899368"
  task_execution_context:
    base_ref: "main"
    base_sha: "d07c03509049e4ca1e06ce0d5873e7e50ca39b38"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6d3fadde39c7b8927237092e710299deaac2c260b45b5a5c7d050f150949f54d"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:7c216e5b223db41358af03b5ff99d092654d854213b0bdd2e8f9b9bef14f0ef1"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7705070554d5bdb7ccbc9c575182b3ea7bea3dd438c480442de868e969dbb711"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:7c216e5b223db41358af03b5ff99d092654d854213b0bdd2e8f9b9bef14f0ef1"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6d3fadde39c7b8927237092e710299deaac2c260b45b5a5c7d050f150949f54d"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "bun.lock"
            evidence_digest: "sha256:309d919c50da1d1c6b398010761bdbfaee03db188cf68db15152d96da682b420"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ccb84ef080d0b581e289e780d859a612fd358571e55e311bae67fd69ba851b55"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:7c216e5b223db41358af03b5ff99d092654d854213b0bdd2e8f9b9bef14f0ef1"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:7705070554d5bdb7ccbc9c575182b3ea7bea3dd438c480442de868e969dbb711"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "bun.lock"
              - "packages/core/src/tasks/task-centric/planning-obligation.test.ts"
              - "packages/core/src/tasks/task-centric/policy.ts"
            evidence_digest: "sha256:c123e36b58ec127e4ff8cf163a32af4a7045d7df3b666c995dc57b7f6ae1fb83"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:467ed7f375153d5302781ecabd4057a9d88084582e141a0a86cee2e260764f68"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
            plan_revision: 2
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ccb84ef080d0b581e289e780d859a612fd358571e55e311bae67fd69ba851b55"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:44658a395971bc6f47e0df9cdb67279c352bafb211c92584602df05a0caf1460"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:25c5a292786069d0d6d1a9fafb1bdfe08f9857762bb3e1e34c02b843b678729c"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
            plan_revision: 2
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:467ed7f375153d5302781ecabd4057a9d88084582e141a0a86cee2e260764f68"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
              - "packages/agentplane/src/commands/task/create-plan-input.test.ts"
              - "packages/agentplane/src/commands/task/create-plan-input.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/create.command.ts"
              - "packages/agentplane/src/commands/task/kernel-create.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/commands/task/new.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
              - "packages/core/src/runner/agent-work-order.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/kernel-semantic.ts"
              - "packages/core/src/tasks/task-centric/schema.ts"
            evidence_digest: "sha256:0b2f97a4c0ebf668fd92d972ac1bb584f8f1363a15e3aec8fbb4a39cbc2ea8c5"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:88781bbe3448aabe0789353ddb3760ca56f66545327009c0210a1f8729b36418"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
            plan_revision: 2
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:25c5a292786069d0d6d1a9fafb1bdfe08f9857762bb3e1e34c02b843b678729c"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/create-plan-input.test.ts"
              - "packages/agentplane/src/commands/task/create-plan-input.testkit.ts"
              - "packages/agentplane/src/commands/task/create-plan-input.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/kernel-create.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-supplied-plan.ts"
              - "packages/agentplane/src/commands/task/planning-capabilities.ts"
              - "packages/agentplane/src/commands/task/roadmap-inline-plan-materialization.test.ts"
              - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
              - "packages/core/src/tasks/index.ts"
            evidence_digest: "sha256:4169cb1d1c8968015e363327498a104b8e55a0a8122cd19f579b91b8e04260b9"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ab9365bf49447ac7f8236f3760bab9328550346718535ac700d54d1ca3e81a83"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
            plan_revision: 2
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:88781bbe3448aabe0789353ddb3760ca56f66545327009c0210a1f8729b36418"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts"
            evidence_digest: "sha256:dafa8bda51d03ff3124aa6f9cbcd1715fb4013ec14ad20fd7e9e43aaedfe1334"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0e730c61babcec2017823a773c738303c6a8dbb944dc2ef6351d296def5fd047"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
            plan_revision: 2
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ab9365bf49447ac7f8236f3760bab9328550346718535ac700d54d1ca3e81a83"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.roadmap-supplied-plan.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/cli/supplied-plan.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
            evidence_digest: "sha256:e7a2bf4c3977e91af643ad7790857ca48ce749f6967943975196780b26cfc0a3"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f200ee8e710514c797090309bda88909168253736f01fc395a3c85fd1e9088da"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9"
            plan_revision: 3
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:0e730c61babcec2017823a773c738303c6a8dbb944dc2ef6351d296def5fd047"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:df5cdc21178584996e7daa79226a0667404b7a9bba8fab8706053759f5e77ba3"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b7bf255234cdec7e5caafdd9de32675a002cd7a84c18bbc514a61191fef8d753"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9"
            plan_revision: 3
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f200ee8e710514c797090309bda88909168253736f01fc395a3c85fd1e9088da"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
            evidence_digest: "sha256:d02177d35ade1338bb3a098cc332c3f6275cb31386eb5c181edbedb8205e51ce"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3aca1bb6c2604e6f9754a3052a61987387d4454f129ebd3a81f14d6bfc6157f1"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9"
            plan_revision: 3
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b7bf255234cdec7e5caafdd9de32675a002cd7a84c18bbc514a61191fef8d753"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/run-supplied-plan.test.ts"
            evidence_digest: "sha256:a138ee598df2f9e0054bd648e58946a2357b5f6c5c8ea76152acbf5d37d6f79f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:551c4c1ca0579886b5b2e5ca896074d5b74b623fd5f74abcc356691b1d8b3f40"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3aca1bb6c2604e6f9754a3052a61987387d4454f129ebd3a81f14d6bfc6157f1"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:7f11bd0cec0b5dadbca657ee3901bfc7d49e916411de5655e912c30d1f3d9e3a"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3e1886f822198b91c24d77e4a9104e5a983434ec71db83c0f666e2a42061538b"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:551c4c1ca0579886b5b2e5ca896074d5b74b623fd5f74abcc356691b1d8b3f40"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/task/brief.command.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-planning-view.test.ts"
              - "packages/agentplane/src/commands/task/kernel-planning-view.ts"
              - "packages/agentplane/src/commands/task/kernel-read.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/kernel-supplied-plan.ts"
              - "packages/agentplane/src/commands/task/next-action.command.ts"
              - "packages/agentplane/src/commands/task/ready.ts"
              - "packages/agentplane/src/commands/task/show-kernel.test.ts"
              - "packages/agentplane/src/commands/task/show.ts"
              - "packages/agentplane/src/commands/task/status.command.ts"
              - "schemas/agent-semantic-result.schema.json"
            evidence_digest: "sha256:d9881243172d11f94fdb56b6f6b98ffe9858a8ed8d5256bc7d2ec29c0c9923df"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:959229318fbbe93636a0774f31a7c21cc89bc0acf28b75344783c77a28c7416f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3e1886f822198b91c24d77e4a9104e5a983434ec71db83c0f666e2a42061538b"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/task/kernel-run.testkit.ts"
              - "packages/agentplane/src/commands/task/run-required-planner.test.ts"
              - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
            evidence_digest: "sha256:34fa885c5b550b2c016c608cb2e9406ab72a0e6cb518984e3bf3c78537c42dd6"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f0b9248124434e87114a4b1e5711af4a5b03134d3568947c76639a2b3903f951"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:959229318fbbe93636a0774f31a7c21cc89bc0acf28b75344783c77a28c7416f"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-planning-recovery.test.ts"
            evidence_digest: "sha256:ccd9d07ddf4f1cb9390ab1d61be8306a2efc9b3e96a009a47431a4120cbb1eb8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:35885ad60bb2eb3a7bde0b566650720394f3cf01bcf874b0090ef0f7fca27bb2"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f0b9248124434e87114a4b1e5711af4a5b03134d3568947c76639a2b3903f951"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/cli-smoke.test.ts"
              - "scripts/lib/installed-migration-matrix.mjs"
              - "scripts/lib/installed-planning-matrix.mjs"
              - "scripts/lib/test-route-registry.mjs"
              - "scripts/release/check-local-tarball-install-smoke.mjs"
            evidence_digest: "sha256:2dd064e0b5c86ae879caa7c2f6cc5db7d823df398336366d5b1ecd3d7bd112a1"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3725996ae570f6be86fca71959571931ffdbff8043b5dc4552109be2d5748af9"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:35885ad60bb2eb3a7bde0b566650720394f3cf01bcf874b0090ef0f7fca27bb2"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/releases/v0.7.12-m04.md"
            evidence_digest: "sha256:46b30b06caa00cc465a441adef4d8441f514f8bad5c7775f6f354b5b1fb1f5be"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9c4a4eac4aed502d95ff008bf4a0f0bebeaa4e27c0a696750d90f50c9c59f0ab"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3725996ae570f6be86fca71959571931ffdbff8043b5dc4552109be2d5748af9"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5fd7d8613138ea4df72e2a2beb44810bc0ff1421414ffd452e29610484abe35f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "docs/user/workflow.mdx"
              - "packages/agentplane/src/cli/run-cli.core.task-advance.roadmap-supplied-plan.test.ts"
              - "packages/agentplane/src/cli/supplied-plan.testkit.ts"
              - "packages/agentplane/src/commands/task/create.command.ts"
            evidence_digest: "sha256:f2855c5c35c2f04e969c422727cf9023b5b6164a05905e47a4490e3ba5926352"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2eb28e175aecece715e4dd1861f10284629ab7e2bebb85e55a518600c00a23a9"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
            plan_revision: 4
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
              kind: "USER"
              parent_authority_digest: "sha256:9c4a4eac4aed502d95ff008bf4a0f0bebeaa4e27c0a696750d90f50c9c59f0ab"
            repository_effects:
              - "ci"
              - "dependencies"
              - "documentation"
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "bun.lock"
              - "docs"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
              - "website/static/llms-full.txt"
            task_id: "202609261720-KKE9ZN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "documentation"
              - "repository_write"
            added_scope_roots:
              - "website/static/llms-full.txt"
            changed_paths:
              - "website/static/llms-full.txt"
            evidence_digest: "sha256:3acbb16bc7391a1e2d4934ef3aeef8bd7d323e13e021117c39f0c3d15b50ce94"
            kind: "authority_delta"
            previous_fingerprint: "sha256:5fd7d8613138ea4df72e2a2beb44810bc0ff1421414ffd452e29610484abe35f"
            repository_evidence_digest: "sha256:e51080d7e9767f2ee0566b09b8920781b9a9c442168cb809d3de6de47c512a67"
            request_digest: "sha256:35e64b36ed666fd04d9b7311f26dfeee3233109465f73f3eda55d31aa00ea8c1"
            request_task_revision: 102
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:1a99101e5e5df4683071e60642c0a0ebbfeb7077d4e4a69fbc8a3a77c207ce4f"
        digest: "sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
        revision: 4
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:eec5695823181a8694b1bcf5cb1e6139f0cd852bc0e673e51c5b3c05cc8971cc"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "dependencies"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "scripts/checks"
                - "bun.lock"
            expected_outputs:
              - "PL-01-result"
            id: "PL-01"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:8a3f299f467e292ea719936565f0a9ab891c1d65a1fdbbb30fd4e5c9a970a91b"
            depends_on:
              - "PL-01"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
                - "packages/core/src/runner"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/runner/usecases"
            expected_outputs:
              - "PL-02-result"
            id: "PL-02"
            optional: false
            required_inputs:
              - "PL-01-result"
          -
            contract_digest: "sha256:5c162df37252a2ac6b1354121f6091b207d4c091113cce632be41261f62af144"
            depends_on:
              - "PL-02"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-03-result"
            id: "PL-03"
            optional: false
            required_inputs:
              - "PL-02-result"
          -
            contract_digest: "sha256:27cd69a5f2f0fcbc276def77db84344075a09c7c5d805be65a104222f540a7a8"
            depends_on:
              - "PL-03"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/core/src/tasks"
                - "scripts/checks"
            expected_outputs:
              - "PL-04-result"
            id: "PL-04"
            optional: false
            required_inputs:
              - "PL-03-result"
          -
            contract_digest: "sha256:eef019a80e7dcfc1201b8ac42fe36ccca08031f8d28d01c11f4e1e07483f2c2f"
            depends_on:
              - "PL-04"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
                - "packages/agentplane/src/commands/branch"
            expected_outputs:
              - "PL-05-result"
            id: "PL-05"
            optional: false
            required_inputs:
              - "PL-04-result"
          -
            contract_digest: "sha256:3276fcabf6138471d8bfb4912b0a484cd0fb772637e3feafac359f25eae18ebf"
            depends_on:
              - "PL-05"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/core/src/runner"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-06-result"
            id: "PL-06"
            optional: false
            required_inputs:
              - "PL-05-result"
          -
            contract_digest: "sha256:80f4804b019d568d46f26c25aea2f4c506fb077481e68ee49e1e89ca2d02dbf0"
            depends_on:
              - "PL-06"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "schema"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/schemas"
                - "schemas"
                - "scripts/checks"
                - "packages/agentplane/src/commands/acr"
            expected_outputs:
              - "PL-07-result"
            id: "PL-07"
            optional: false
            required_inputs:
              - "PL-06-result"
          -
            contract_digest: "sha256:076bd88a98adc68c6e2d7e12abfd5f3b66b7192bbc8a5955a4fe9698332b0b03"
            depends_on:
              - "PL-07"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/core/src/runner"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-08-result"
            id: "PL-08"
            optional: false
            required_inputs:
              - "PL-07-result"
          -
            contract_digest: "sha256:8574c537beb93a43306bae94b4f599163234e845986b5b929029eafe615e4789"
            depends_on:
              - "PL-08"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-09-result"
            id: "PL-09"
            optional: false
            required_inputs:
              - "PL-08-result"
          -
            contract_digest: "sha256:5425b463d43d673dac45d163b91f06598ecb7c74832a3685055a78bbd1496ad1"
            depends_on:
              - "PL-09"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "schema"
                - "dependencies"
                - "ci"
                - "public_api"
              resources: []
              scope_roots:
                - "scripts"
                - "packages"
                - "schemas"
                - "bun.lock"
                - "package.json"
            expected_outputs:
              - "PL-10-result"
            id: "PL-10"
            optional: false
            required_inputs:
              - "PL-09-result"
          -
            contract_digest: "sha256:8ea496d53353b67e8e02b0351bc001c16de543bf4a5613cd4389ca3a21787756"
            depends_on:
              - "PL-10"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "scripts/bench"
                - "scripts/checks"
                - "docs/releases"
            expected_outputs:
              - "PL-11-result"
            id: "PL-11"
            optional: false
            required_inputs:
              - "PL-10-result"
          -
            contract_digest: "sha256:bb8cc0702a5e2b8d8dc26a375b6fc147297c72149c3eaf036cb66a219a3ccef6"
            depends_on:
              - "PL-11"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "docs"
                - "scripts"
                - "packages/agentplane/src"
                - "schemas"
            expected_outputs:
              - "PL-12-result"
            id: "PL-12"
            optional: false
            required_inputs:
              - "PL-11-result"
      effects: []
      final_validation: null
      id: "202609261720-KKE9ZN"
      intent_digest: "sha256:7c075ed50baa30cbcafa249324a53a9f7e5cc2fa59a8132955535292720ed3f0"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f:
          after_revision: 16
          aggregate_digest: "sha256:3e67bee055331032493e5252e89396d2427f07486ef6fd5c369613e122db5e72"
          before_revision: 15
          command_digest: "sha256:92af5adbe504686349a16e3a5d4285abf85e5b197dc2d3ead7def71c344f169c"
          effect_ids: []
          event_digests:
            - "sha256:3ee626d77ab281bc05d13ebab4b1e3e6695752f5c993e168a33a25a60f55a1d0"
          mutation_id: "amend:sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
        amend:sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9:
          after_revision: 43
          aggregate_digest: "sha256:fecc7cdf8da5e91f672075ae6ca15c1aa6f2fa806dd4a656f48656532364d5fe"
          before_revision: 42
          command_digest: "sha256:b7203b465e2db1e6da1a5bdccef7883941a28b8feb7f6baf7150e83f64e149a3"
          effect_ids: []
          event_digests:
            - "sha256:107eeb957228444d209c90de2ab445e2387447e1ab9fb4d94c3959aeba47a34e"
          mutation_id: "amend:sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9"
        amend:sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5:
          after_revision: 62
          aggregate_digest: "sha256:89e22d1124002d85d4987b6fbbb0afce9fb6e330e630db7c15436dfa364677af"
          before_revision: 61
          command_digest: "sha256:28cb29ebd1278b3d8b71f17122dae08f809a5c6ec1b538af0195d4d1e4f4b50b"
          effect_ids: []
          event_digests:
            - "sha256:fd5086908a13a123417c2ff8fa09bf308536e853f9045d026217f71c927c8a14"
          mutation_id: "amend:sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
        capture:202609261720-KKE9ZN:
          after_revision: 1
          aggregate_digest: "sha256:59452ef5f1b66eb4fa53b98e3d4ea95fd53383f717aaa252c5ba173d8cc5ae4a"
          before_revision: 0
          command_digest: "sha256:db80e44dc03ebedb557a4bff84882bbf822b1d8b2662d2b7259e2babd705742f"
          effect_ids: []
          event_digests:
            - "sha256:a611744cb3747a5d7f94fe3a50fe3159e33027ef4588033ff473740c1d9e974f"
          mutation_id: "capture:202609261720-KKE9ZN"
        kernel_work_item_claim_required:sha256:1d0aded305a29b176535e7c5e35785923da4984d418834b62c69ef552e3b7db7:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea:
          after_revision: 32
          aggregate_digest: "sha256:5588a933dc0342c12fcf474911cfb2bebe226ce158d72f22ea953084e3cfd8f7"
          before_revision: 31
          command_digest: "sha256:31d419e3e5850202f1751b3ac123f744f42c87cdd895e5668930bef0c245ded2"
          effect_ids: []
          event_digests:
            - "sha256:a5a3bc9da5eb98dbbe189cbe50f02ac55f709a10a6f255d3af34109d9d384b0c"
          mutation_id: "kernel_work_item_claim_required:sha256:1d0aded305a29b176535e7c5e35785923da4984d418834b62c69ef552e3b7db7:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
        kernel_work_item_claim_required:sha256:2996a9f28eb353ede6bb7c6eeecb18a90992e23a1d87091cdb569dab49d960fb:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1:
          after_revision: 105
          aggregate_digest: "sha256:aeff442f62afc18cf388488dd6d1238265c7e7c59b9486fb8811f0f334bbec1a"
          before_revision: 104
          command_digest: "sha256:3f81d576b8717900d71e5066fef22c207d213e6280d281ceb9f42b979f4f8577"
          effect_ids: []
          event_digests:
            - "sha256:c0248538a948c25c279144f1c37c78eb942f111f8b8c7c208fb97f1a8202b1de"
          mutation_id: "kernel_work_item_claim_required:sha256:2996a9f28eb353ede6bb7c6eeecb18a90992e23a1d87091cdb569dab49d960fb:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1"
        kernel_work_item_claim_required:sha256:3c730d01303a54d0d356b86ee541a9434035449e569b04909d7f8458d1f3d397:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d:
          after_revision: 78
          aggregate_digest: "sha256:3d1bccf68bbd76be3d09925c78906ad2ba11e692185eeb25c1c124cdd6811993"
          before_revision: 77
          command_digest: "sha256:5caa094ee68203c51e9d8d6f46710fb1327d109457f264a79aca8de56f4985ad"
          effect_ids: []
          event_digests:
            - "sha256:38bf3ff859fde13112804e52d75fe424cb7af651b609954ef3a37beaca591b11"
          mutation_id: "kernel_work_item_claim_required:sha256:3c730d01303a54d0d356b86ee541a9434035449e569b04909d7f8458d1f3d397:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
        kernel_work_item_claim_required:sha256:6229976d5f3ce19dfa581259620b301e9c4f2300326bbc5fed57b70e9a0ab2d8:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:
          after_revision: 13
          aggregate_digest: "sha256:4588c1782a94dc9d8e1cb0d37d8ba21585043670babd483a96ec2ac16b29fdce"
          before_revision: 12
          command_digest: "sha256:46f22ac848931809dbe0e06277f271c2f1666c03f50576e694b3fb9763060731"
          effect_ids: []
          event_digests:
            - "sha256:24a2d634c30907e07b2d6f186516632dacf73f618b83a4dd0e440c2234957d18"
          mutation_id: "kernel_work_item_claim_required:sha256:6229976d5f3ce19dfa581259620b301e9c4f2300326bbc5fed57b70e9a0ab2d8:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        kernel_work_item_claim_required:sha256:6b4b4279fd6e196b291bebbc6c57dd8c5c01f507fa734b77ae03e9e93cf43f84:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:
          after_revision: 18
          aggregate_digest: "sha256:f6415257c555d60b88c2b6f773b282efafca918a09d66e33174ec35e080f387c"
          before_revision: 17
          command_digest: "sha256:884d66d80f322057cfdb13640536d0d2ce7792b8f33d6c9f0ec3c0b743971ec7"
          effect_ids: []
          event_digests:
            - "sha256:2e160b023a60414f977d10913937993793321a0cf5a0e55c2cef3504bc1ef1ec"
          mutation_id: "kernel_work_item_claim_required:sha256:6b4b4279fd6e196b291bebbc6c57dd8c5c01f507fa734b77ae03e9e93cf43f84:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        kernel_work_item_claim_required:sha256:73168814a4f1d7516d8ce8e1909a0d3e3fecd66bc32c9584b1decedb05c94f9e:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:
          after_revision: 64
          aggregate_digest: "sha256:3cdc6ef337a3a7bc2cb03fc3283311ffbb08953d0660cb2ffdb764dff07dc31f"
          before_revision: 63
          command_digest: "sha256:feb02756d02984b71cb3757c8d30a7135b754825d6debd2e1f2f2b6e829a8007"
          effect_ids: []
          event_digests:
            - "sha256:4ae925231a8eea70efbc7cad9dee6760dadcf325f3dc24cec4a3b308aa67a78c"
          mutation_id: "kernel_work_item_claim_required:sha256:73168814a4f1d7516d8ce8e1909a0d3e3fecd66bc32c9584b1decedb05c94f9e:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        kernel_work_item_claim_required:sha256:83520b21e8a51a142086dab2358bbe67284d75c11a95fe3e82e43b1114e936f1:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238:
          after_revision: 52
          aggregate_digest: "sha256:928493f736d8c1955a13a55040087bd35ad4e688dbd64696b27c7dc455829d6d"
          before_revision: 51
          command_digest: "sha256:1f70dd9b7d4ce63d8864873a6d2242c0766e8d420602df6271a8bf39be07ef52"
          effect_ids: []
          event_digests:
            - "sha256:48e5e262f9df31d21789966527257ee441aff19bcb5a47dbfaa93bf3930589a0"
          mutation_id: "kernel_work_item_claim_required:sha256:83520b21e8a51a142086dab2358bbe67284d75c11a95fe3e82e43b1114e936f1:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
        kernel_work_item_claim_required:sha256:866ac3a02b4262a753d487bc7ef6d7a5d1076e2862e9d5636838b745cbe57b8a:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a:
          after_revision: 71
          aggregate_digest: "sha256:7e03bf28cf2d0c6b4450c579247dec048622a3c6d654b763c25de6582044b39a"
          before_revision: 70
          command_digest: "sha256:8de28a147a277601e9b3c42485619a1807f036b4a9a79708354cd008e58e31ab"
          effect_ids: []
          event_digests:
            - "sha256:e6071dd5684e90b9c9d8db777829a274c722c63641c0d0810dda8ed17a781a65"
          mutation_id: "kernel_work_item_claim_required:sha256:866ac3a02b4262a753d487bc7ef6d7a5d1076e2862e9d5636838b745cbe57b8a:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
        kernel_work_item_claim_required:sha256:8e64e7a4e805b45eea8b4d2290a77242c4fa5da8b9d4288fe2e279d3d1f374df:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd:
          after_revision: 99
          aggregate_digest: "sha256:cd52d5e59e1788b0ed25b8ba9511198bba817b5e41018b7bcfbed59538102949"
          before_revision: 98
          command_digest: "sha256:fa041075917f58240554127793064460b931ca4a719c901c618b34585e2abad2"
          effect_ids: []
          event_digests:
            - "sha256:a8fd4f326116c52e06aab89b1fa293a9a27e2aec7b088c79ac9fc036637d00a3"
          mutation_id: "kernel_work_item_claim_required:sha256:8e64e7a4e805b45eea8b4d2290a77242c4fa5da8b9d4288fe2e279d3d1f374df:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
        kernel_work_item_claim_required:sha256:9045f767c4836dd70813e33bc20c27e425d3498dc036e0f29b7607cbbf525c95:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0:
          after_revision: 45
          aggregate_digest: "sha256:6481f881b23f8039337dd5d092e10740ec000090833f6cb587eb394bb2c26485"
          before_revision: 44
          command_digest: "sha256:c11032905f9e1730e33d90bb0c4f1d465e397328028b5cf2399986d4a1d833ff"
          effect_ids: []
          event_digests:
            - "sha256:7f51739873b16a20446153844a51154cc53fd8e73945bee6452270045172dd52"
          mutation_id: "kernel_work_item_claim_required:sha256:9045f767c4836dd70813e33bc20c27e425d3498dc036e0f29b7607cbbf525c95:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
        kernel_work_item_claim_required:sha256:93d276fb94854adcb0e68b1740f3c057845777a4a51e910381282d8113ec69cd:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:
          after_revision: 59
          aggregate_digest: "sha256:b51926a019ad998dc61fe5e05385bacba552ae46750893a9f762967f6c5441c9"
          before_revision: 58
          command_digest: "sha256:e1a5dd90f18ea8fef4af6c4250ba58c50f0b7f0bcb2500c93fcd32e8eadfc1b0"
          effect_ids: []
          event_digests:
            - "sha256:2fd71836f64197dfdd0e9d6dbf1c8a0f3af89b9c61139b8b26b458e6c8b18511"
          mutation_id: "kernel_work_item_claim_required:sha256:93d276fb94854adcb0e68b1740f3c057845777a4a51e910381282d8113ec69cd:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        kernel_work_item_claim_required:sha256:9a9b26f7cee1bdfbcaa15107c1e1930c9a9ea089df860aa8b768a9c699d03fb1:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117:
          after_revision: 25
          aggregate_digest: "sha256:180cadf83660ed5652e8178b5c7a0b565b12f251f06edde9829a60fb23f291d9"
          before_revision: 24
          command_digest: "sha256:3731cbc6e291ade6f87f843438c623daeeca79907fa7831c581a6265bf242f41"
          effect_ids: []
          event_digests:
            - "sha256:ed1ab5266ebb828baa6af02324f2311dcb7c44bb167f039409894f8ad39c3932"
          mutation_id: "kernel_work_item_claim_required:sha256:9a9b26f7cee1bdfbcaa15107c1e1930c9a9ea089df860aa8b768a9c699d03fb1:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
        kernel_work_item_claim_required:sha256:a68c8456b48d84da60ce6a295ce60514fd22b26b29df04e027be96f40fdf3b1f:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb:
          after_revision: 92
          aggregate_digest: "sha256:571367f2d6c42da592d8cd3a5a74e3f1daea7b013d4d5af99d198564a344fa18"
          before_revision: 91
          command_digest: "sha256:5d8ed235b069f57eb3a15e0ffb1741f1bbf1b3490342e9e8d9af6805ee6aaa22"
          effect_ids: []
          event_digests:
            - "sha256:933c1be8f4510f551890c27870e2445cd5565f11a8a0ca6430a8a51bdc578901"
          mutation_id: "kernel_work_item_claim_required:sha256:a68c8456b48d84da60ce6a295ce60514fd22b26b29df04e027be96f40fdf3b1f:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
        kernel_work_item_claim_required:sha256:ce168594e86ec59d2e891c4a7aa70c06a60b03edd71a48f03d8b773cedd0e492:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca:
          after_revision: 39
          aggregate_digest: "sha256:f1e867e23f05172b4d296c1fbf80c7e25ebf3b7e6cfa85cc196d1cd914eeb719"
          before_revision: 38
          command_digest: "sha256:4f9c111f87bfb9cbb65e71e3ec1a814d7a7cf0a2b3cf1ad481cbcb8a06ccb662"
          effect_ids: []
          event_digests:
            - "sha256:f933fd03c856a97e068a87a3aba1862aeef51555d030591e42423baeafa455ab"
          mutation_id: "kernel_work_item_claim_required:sha256:ce168594e86ec59d2e891c4a7aa70c06a60b03edd71a48f03d8b773cedd0e492:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
        kernel_work_item_claim_required:sha256:ddea936a0c0f7cd12631380fdfe5995608d7aae0ed4a1e5a1fd7d71aa8eeffcf:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d:
          after_revision: 85
          aggregate_digest: "sha256:ada01a6b2ac077216c0d2cad8686354444124fc455ec27cac915ef86b822a508"
          before_revision: 84
          command_digest: "sha256:d1c18b1fb653ab1606add2146fef6c019137bbf6a9bfab9d9cf08f6b05febce3"
          effect_ids: []
          event_digests:
            - "sha256:07ef599989d1eb9bddb3879fe9c0c6d178bdc79d3388d5ba240862935ce61e62"
          mutation_id: "kernel_work_item_claim_required:sha256:ddea936a0c0f7cd12631380fdfe5995608d7aae0ed4a1e5a1fd7d71aa8eeffcf:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
        kernel_work_item_claim_required:sha256:fdf67a19a6a690daedba8efc44982df1eaae4cb16c2a92a6abcb45e39bfbb2bd:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:
          after_revision: 5
          aggregate_digest: "sha256:1cc831cecb974a5a58e961f02c88153a2eca5d21ba58aa38ae5dd52086bc49da"
          before_revision: 4
          command_digest: "sha256:778222a95c211e2a92661098436b9b75f3f463e6dd68bbd54f76f25d3de8fba5"
          effect_ids: []
          event_digests:
            - "sha256:b81601008b4ce0b6ea9ed37ef1fb936b434c2825c67fe5acd46ccf3e2d3dad51"
          mutation_id: "kernel_work_item_claim_required:sha256:fdf67a19a6a690daedba8efc44982df1eaae4cb16c2a92a6abcb45e39bfbb2bd:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        kernel_work_item_execution_required:sha256:08eca2a2b79a725d911faeb79613dbdc307d64d01e24aced537da11b924e06cb:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66:
          after_revision: 7
          aggregate_digest: "sha256:ea528e2a95337146a646dfe0f5cf65b6ab315b97861bca37a1824dae03879bd0"
          before_revision: 6
          command_digest: "sha256:840d867fafca1b1b4b5ca00d932a2424e71e3be40b82f34f36fd9e7b6ce42af1"
          effect_ids: []
          event_digests:
            - "sha256:6a27a9ffb83c74224e1b155c93ead8520223f5cda52820b55ae0bf7c82e824d0"
          mutation_id: "kernel_work_item_execution_required:sha256:08eca2a2b79a725d911faeb79613dbdc307d64d01e24aced537da11b924e06cb:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66"
        kernel_work_item_execution_required:sha256:14e36ee9a7ffed694c9e2bf64b5e9a58f1fa6b135a69c45d43f74bd3e256f41c:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238:
          after_revision: 53
          aggregate_digest: "sha256:f1d14bff189fc4ea53e745167969307da78ddf9f4610975b989e9fd09b7504d5"
          before_revision: 52
          command_digest: "sha256:17568610461160a97f8282e1323e5a550b418ca8d4e802e64347b7c2f4099d30"
          effect_ids: []
          event_digests:
            - "sha256:4f11bc5d0b316ff5fd1c0de5d283f782042d3ef89db886514267fb2be7f0e8f8"
          mutation_id: "kernel_work_item_execution_required:sha256:14e36ee9a7ffed694c9e2bf64b5e9a58f1fa6b135a69c45d43f74bd3e256f41c:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
        kernel_work_item_execution_required:sha256:3c52cda91b118b71f6f6055c7b6fe8ecd194ec55843e1060a52435a11504e95a:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca:
          after_revision: 40
          aggregate_digest: "sha256:94de430ffd0c83141fa46c73a6bdf7e0970c83fd77e9c4912a8c2f969667e87d"
          before_revision: 39
          command_digest: "sha256:0045aebd5cc3d1b5113f518bced90fa772b3492aa9ee801c6b2205484968699d"
          effect_ids: []
          event_digests:
            - "sha256:0d14e7863d3c3e9fc52fdaf16b7a6b940c201f275ce20a239be6b67cdeb79a9c"
          mutation_id: "kernel_work_item_execution_required:sha256:3c52cda91b118b71f6f6055c7b6fe8ecd194ec55843e1060a52435a11504e95a:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
        kernel_work_item_execution_required:sha256:418d50a6403ad49b52ae628afe6ab9e7e353ffbf9bc3d7f9403e8d0c667988d4:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1:
          after_revision: 106
          aggregate_digest: "sha256:6870505730cea2790e0b4e25a32d1f516083d7eaa0ee994d547fe4deb528cc46"
          before_revision: 105
          command_digest: "sha256:58885b8ef970eb7cb66789a6cf73e9adca21216de30985d28b9063320c948efe"
          effect_ids: []
          event_digests:
            - "sha256:e071b4818323eb9b0583046cae2811dff41e5c1b6ff639cb86c950c16f4bbb6a"
          mutation_id: "kernel_work_item_execution_required:sha256:418d50a6403ad49b52ae628afe6ab9e7e353ffbf9bc3d7f9403e8d0c667988d4:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1"
        kernel_work_item_execution_required:sha256:431a681dd46c7a8bc3dc1872cb60954f88232ad3da74df686b2a7d69f9bb2fab:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:
          after_revision: 65
          aggregate_digest: "sha256:0632b7ace18f5a57d74a951ce5472963b7d50b7034db97dfe26329dce9d55c97"
          before_revision: 64
          command_digest: "sha256:fcf2e487e3ec1923ad260ca132a9b78eb95f11a58de52a3d6e8c83fad5175224"
          effect_ids: []
          event_digests:
            - "sha256:67e03f0c7d296aadf9c1fc60f1ca80c6c482af56131825b9ca3d4ee983d709f5"
          mutation_id: "kernel_work_item_execution_required:sha256:431a681dd46c7a8bc3dc1872cb60954f88232ad3da74df686b2a7d69f9bb2fab:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        kernel_work_item_execution_required:sha256:47a85912d8a061879f851c26e1978013445a87cb21821b044c3905470ccd9b5f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:
          after_revision: 14
          aggregate_digest: "sha256:501d919614c9a4f82a3ce7dd86d50f6d860609ce64dfac09025e9370b604b064"
          before_revision: 13
          command_digest: "sha256:cb6a2d0e992f05ec609c78c8b7b65826d72b1ed5139f277917d3f728831aa568"
          effect_ids: []
          event_digests:
            - "sha256:d4cf77b42dfa86efd1c6b75c83ef3a32230c3b18ba60b608f1a5d969cddc2350"
          mutation_id: "kernel_work_item_execution_required:sha256:47a85912d8a061879f851c26e1978013445a87cb21821b044c3905470ccd9b5f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        kernel_work_item_execution_required:sha256:6469433df915bdd107ea722673d40df7aa5f6cfa84178faf21356fcaec3b02ad:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea:
          after_revision: 33
          aggregate_digest: "sha256:092a46ce6601f3d3ca5ee85af816a2a2b952062a7bbd703dbe90f6c2f634192b"
          before_revision: 32
          command_digest: "sha256:c34c801ac767c647c63d9dc6d38177541795a494d450c71ea83cd11c2716896a"
          effect_ids: []
          event_digests:
            - "sha256:3a482149e8a6d8970d966965aea92ecc340f3eed0a0a74bce091dea02e920acf"
          mutation_id: "kernel_work_item_execution_required:sha256:6469433df915bdd107ea722673d40df7aa5f6cfa84178faf21356fcaec3b02ad:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
        kernel_work_item_execution_required:sha256:b1157f164281fa03bf5ef7bb283adda3ddd9c6901c2c1f268c4091aba639bd2f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:
          after_revision: 19
          aggregate_digest: "sha256:05913b41cb3d314b8787ad66f440d5322cd5be3b2c71549cbdb5e879ad089ac9"
          before_revision: 18
          command_digest: "sha256:3b153374dc61cb0109fb2d87249163bf697764d4a190454a698a43c638e4087b"
          effect_ids: []
          event_digests:
            - "sha256:5f4f5afd5b36ebd1c3113c887859364f2cdecd4c3909daa7f4dea0752f6d4bfb"
          mutation_id: "kernel_work_item_execution_required:sha256:b1157f164281fa03bf5ef7bb283adda3ddd9c6901c2c1f268c4091aba639bd2f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        kernel_work_item_execution_required:sha256:b2644e2d67a8c7e12c32df5eff1db6b75dce636b8a0223ca9a6dabc72a1bc090:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d:
          after_revision: 86
          aggregate_digest: "sha256:4adec0b7957e6f21cca63b590bb25f1c240ae6e77c2af4841a6e60cae06ce7bd"
          before_revision: 85
          command_digest: "sha256:9d7b8f8c4e6e17b6f4080b39a81d5a69d8c101db3db7d9568a85de94d46c661e"
          effect_ids: []
          event_digests:
            - "sha256:3e807f54d93a597e50debad044afdb81b96c8cf48f3e998f45beab5082989d94"
          mutation_id: "kernel_work_item_execution_required:sha256:b2644e2d67a8c7e12c32df5eff1db6b75dce636b8a0223ca9a6dabc72a1bc090:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
        kernel_work_item_execution_required:sha256:c387b66f4afc6ac1a18dd3ae8b190a6e0544d60785e36f3e0a941b6ba0837514:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117:
          after_revision: 26
          aggregate_digest: "sha256:91058dd06a124b361269937ee5875d135a5b9d65c31a7287af340ad492ec3bdd"
          before_revision: 25
          command_digest: "sha256:dfbcf8e29674848998c469d1dfa781d1a8274d85fe9b4a97bc8475416c13713b"
          effect_ids: []
          event_digests:
            - "sha256:0def56064b80b02e16523c2972a2ee6e3c1fea8eae895c92e46458e232c76dd6"
          mutation_id: "kernel_work_item_execution_required:sha256:c387b66f4afc6ac1a18dd3ae8b190a6e0544d60785e36f3e0a941b6ba0837514:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
        kernel_work_item_execution_required:sha256:c64947fc967c8bacb576ccbf4cdd0fa6329a3718e785606d4dc8a1aa3550b7e0:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d:
          after_revision: 79
          aggregate_digest: "sha256:6d46df3b403c3e0af0e898e5d35a18c25e602df65501a3c0c9fbbd86223fbc73"
          before_revision: 78
          command_digest: "sha256:e5e36bc00b1a904efca27556a8e8f489c3b88a4afb8a683ef9e959e495f7e30e"
          effect_ids: []
          event_digests:
            - "sha256:0ab2bf842187462080b5c58de01e782c86a295d0504d432f751c6cc376867e17"
          mutation_id: "kernel_work_item_execution_required:sha256:c64947fc967c8bacb576ccbf4cdd0fa6329a3718e785606d4dc8a1aa3550b7e0:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
        kernel_work_item_execution_required:sha256:d090d32aca0e7d4b8abca5caa12c1c8884e90fdc511d10ccfe4bd6fdf1a58167:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a:
          after_revision: 72
          aggregate_digest: "sha256:ebe5c14062050b1a043b1621b90aa293f2f94b26ac7309c58e814dcd8a3cbfde"
          before_revision: 71
          command_digest: "sha256:fb57e8ac936fbb70af4aaa8491aeeff2b034eb3e1aea99ee74d6a813d4b9f271"
          effect_ids: []
          event_digests:
            - "sha256:6a551d430e5cb49d836e274c4d576735a9a5a0782f0ec8a6a3360a662eeba65d"
          mutation_id: "kernel_work_item_execution_required:sha256:d090d32aca0e7d4b8abca5caa12c1c8884e90fdc511d10ccfe4bd6fdf1a58167:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
        kernel_work_item_execution_required:sha256:da02844e3b97c69c942f2f7a37f05772a96a0f99eb31914eb87424d62e258819:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd:
          after_revision: 100
          aggregate_digest: "sha256:d5bdaea5a44195d3ef392066e7cc7d042ac2d3dab725658c6c59cdf2ff95d83c"
          before_revision: 99
          command_digest: "sha256:4013f135384df1ecd53bfb7a73cfb8a0ebb7492cab30c279b0bb36bf007c997e"
          effect_ids: []
          event_digests:
            - "sha256:1bf172fe4af7052390dd79b7caf35dd20807afbc9033e3298aa8f9748e82e084"
          mutation_id: "kernel_work_item_execution_required:sha256:da02844e3b97c69c942f2f7a37f05772a96a0f99eb31914eb87424d62e258819:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
        kernel_work_item_execution_required:sha256:e9b0c8ebb2edf97758d2644be9bb81bd63b12bbfab7708876db0120f5e596dd8:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb:
          after_revision: 93
          aggregate_digest: "sha256:2a7d842f5cdaa9b288aeb65f7d0f56b9e973200e6009b85737af2f1102f084a1"
          before_revision: 92
          command_digest: "sha256:ab22fc69073cae59f06f256bee73375fa1bf3ecc492705bdc80a8eb10275017f"
          effect_ids: []
          event_digests:
            - "sha256:27f76a37b93da15c50e6b18f8f5714f36d5433fb1e9d1e00c4004e651c74e99d"
          mutation_id: "kernel_work_item_execution_required:sha256:e9b0c8ebb2edf97758d2644be9bb81bd63b12bbfab7708876db0120f5e596dd8:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
        kernel_work_item_execution_required:sha256:f196e16eb51e3e6a2c1da357c4f04d5a8f682acd10536f6e3660bbed676cd2a2:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0:
          after_revision: 46
          aggregate_digest: "sha256:c6aa758a137a8948b7ac2897727b8714a5817f8df9c64bce6eede2a790b13494"
          before_revision: 45
          command_digest: "sha256:4fbbccdacf17f3cfa2ad982d0abd27dff70a2e1b61da46df9a277349c943bbc0"
          effect_ids: []
          event_digests:
            - "sha256:036260d37b4206ab4ddfab62acc1a71b33fa29afa8f14f0fc9d63531e0488c73"
          mutation_id: "kernel_work_item_execution_required:sha256:f196e16eb51e3e6a2c1da357c4f04d5a8f682acd10536f6e3660bbed676cd2a2:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
        kernel_work_item_execution_required:sha256:f2b98bb020a67489b0bd32f5f6d5a70b8e9cf83783b934546073ba8a57a4822f:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:
          after_revision: 60
          aggregate_digest: "sha256:e8ca21fe3838c6f083989c2934df4b62f9b9881391986297ebab7683dafe9a20"
          before_revision: 59
          command_digest: "sha256:3f460ac59cb82925df7f2ecf98c0685e3e04a048e43ea98e76e9e95a395aa30f"
          effect_ids: []
          event_digests:
            - "sha256:9dfbeb69d96fe95f44dfb3ef8ac156fa7849ec3e0363710f71c77cb592710ef7"
          mutation_id: "kernel_work_item_execution_required:sha256:f2b98bb020a67489b0bd32f5f6d5a70b8e9cf83783b934546073ba8a57a4822f:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        kernel_work_item_inspection_required:sha256:080cf6b30c8c391dfc54a7337a32a96e303c086d115225755cdaec0a252c4467:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117:
          after_revision: 22
          aggregate_digest: "sha256:1a4eb0d947ed225de55df9d9f312fce033a7ca7ca924569396dd9c3ebf7a5076"
          before_revision: 21
          command_digest: "sha256:71e5ff1a75461b4863175f58b82d66f90cef2324dcccc4f03782c000a572c27e"
          effect_ids: []
          event_digests:
            - "sha256:0bd8b8888f927c8e7990804596fea2fee0bbbdf5866968c7568b94db66ffe9f7"
          mutation_id: "kernel_work_item_inspection_required:sha256:080cf6b30c8c391dfc54a7337a32a96e303c086d115225755cdaec0a252c4467:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
        kernel_work_item_inspection_required:sha256:26096c65bf7f59a8818e877c92187a14ad23dadd1f4a32622a1e8bd83a7d4672:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a:
          after_revision: 68
          aggregate_digest: "sha256:8e72cb84da34f91976dbd4829ba71639c2de71d7089f72a771417bcd2a15cfb8"
          before_revision: 67
          command_digest: "sha256:bf044729eb443bbe9b3d20dd5246cac97c7110b1d65a331dfa514d4a228c5e96"
          effect_ids: []
          event_digests:
            - "sha256:187ad89c8d485aa73631f34f0b6c3f77c90f0ebf7bef1a741ad16fdd96908df4"
          mutation_id: "kernel_work_item_inspection_required:sha256:26096c65bf7f59a8818e877c92187a14ad23dadd1f4a32622a1e8bd83a7d4672:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
        kernel_work_item_inspection_required:sha256:419b70daec9dd3c9619735db29c15739c7185bfba4b68c2fddf3c7014615f1be:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238:
          after_revision: 49
          aggregate_digest: "sha256:e9cd93508bd2a72b23273d4abeac4bad1f929dd42b8564ad8cc88c5853433302"
          before_revision: 48
          command_digest: "sha256:75e81c8fc2dfd67b80f3fda3ffe49f0959d8d2eddf7f2f69954d2ec825b212e6"
          effect_ids: []
          event_digests:
            - "sha256:71613f17e8ef2ec2af038dbbffbef8e2a2de89600aa456c992820ecd8679172b"
          mutation_id: "kernel_work_item_inspection_required:sha256:419b70daec9dd3c9619735db29c15739c7185bfba4b68c2fddf3c7014615f1be:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
        kernel_work_item_inspection_required:sha256:5909c29fc87157c530d60ab6f32b8530eb887fed5e24ec6bde7e5b3c56a5bb03:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea:
          after_revision: 29
          aggregate_digest: "sha256:9a3a73230976953ee54ed69d2c263b1233b0f4799850d515507071fd94c69ad8"
          before_revision: 28
          command_digest: "sha256:a9780893b93f7f8c972450c6641d8c65248c972143312999232c3c16e50418ee"
          effect_ids: []
          event_digests:
            - "sha256:f48e59571fc22c16d760d12da6b6ff2c4acb0850cbb683434b34f6d64e6faa87"
          mutation_id: "kernel_work_item_inspection_required:sha256:5909c29fc87157c530d60ab6f32b8530eb887fed5e24ec6bde7e5b3c56a5bb03:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
        kernel_work_item_inspection_required:sha256:8b14f4aaf48098d7ff4377c4a4f9c931591c1a50734b25a9f2358385ac4081fb:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d:
          after_revision: 75
          aggregate_digest: "sha256:f2f024b6007ec0b54022d4945d458c6b6a191d39efd8ff6a515dabd1cfb2be93"
          before_revision: 74
          command_digest: "sha256:c817668832a54a6d75a13cb8acc7f0e6eb392366278d6fffbd217f7c666c0077"
          effect_ids: []
          event_digests:
            - "sha256:8a91816e61909d739a14c0ba9a81e3e533bbd59f551590695ec7bd123e7d2017"
          mutation_id: "kernel_work_item_inspection_required:sha256:8b14f4aaf48098d7ff4377c4a4f9c931591c1a50734b25a9f2358385ac4081fb:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
        kernel_work_item_inspection_required:sha256:9aba0bc8adbf7e122003f58bf597209bf1dfd097bd1685bb73105ac1348ab882:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d:
          after_revision: 82
          aggregate_digest: "sha256:07484a6deee69804def4f49ba90181107816a832af18708e77484d1cbd9199bc"
          before_revision: 81
          command_digest: "sha256:817241e7dce726da20e570999ab1c10ee04d34530574cbfc8fb9be103385aed3"
          effect_ids: []
          event_digests:
            - "sha256:a732d04e8baaffae79d2d6825cd3cabae8d9ec1ea7a5f3c40576cf5ae5e1fded"
          mutation_id: "kernel_work_item_inspection_required:sha256:9aba0bc8adbf7e122003f58bf597209bf1dfd097bd1685bb73105ac1348ab882:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
        kernel_work_item_inspection_required:sha256:c1c571159814dc9e0567d4adad0eafd15167b0f0ac5ceb0b6f1026ecd40a108a:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb:
          after_revision: 89
          aggregate_digest: "sha256:3987a4e6ca29f270da564ff109ed4ae516eb08a7238094273a474015ccdfa132"
          before_revision: 88
          command_digest: "sha256:4c09615775ec474e55ae45449958d9d967a6b27ad73ab7449dcac2632277e3d1"
          effect_ids: []
          event_digests:
            - "sha256:aabe1e7b47da8628f03c37bcc48afee1f653b7479266bbf84fda4181d7c793c3"
          mutation_id: "kernel_work_item_inspection_required:sha256:c1c571159814dc9e0567d4adad0eafd15167b0f0ac5ceb0b6f1026ecd40a108a:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
        kernel_work_item_inspection_required:sha256:c9db41e6f812143345d0b013953728d0a9cacb3a44b897907d2e2d0f4da20ab7:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:
          after_revision: 56
          aggregate_digest: "sha256:a7d6a5630041d8dd80115fb78fdf1fed2ab8b11e3b7d6dc18bd605352657d3d8"
          before_revision: 55
          command_digest: "sha256:c150e1e189ccc67ab54e0a9bf075f2a9bb08da00be6a6e401ae57405123001c5"
          effect_ids: []
          event_digests:
            - "sha256:eefcaa6ed3d56f2e6f39ad6ca58bc9c7146ea690ce2ac849276a7f939b1b77ed"
          mutation_id: "kernel_work_item_inspection_required:sha256:c9db41e6f812143345d0b013953728d0a9cacb3a44b897907d2e2d0f4da20ab7:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        kernel_work_item_inspection_required:sha256:cafb833f01de716c1dd90697b001dfcda5b35a972c7f435e184082284e58700e:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd:
          after_revision: 96
          aggregate_digest: "sha256:8c68b22d0c3aa6ddcca0ffb0c4cc2f0fe0115ca4883cc06a4b4e38d222558c37"
          before_revision: 95
          command_digest: "sha256:a1a3d009b67af63753fd01b13784c5c4215fe8588efbcfc3f3d451f2fd5880f8"
          effect_ids: []
          event_digests:
            - "sha256:04faecf6cae3eb78f2024301f0fa2234a4fb8794c5ca6af649f066dacf2d77c4"
          mutation_id: "kernel_work_item_inspection_required:sha256:cafb833f01de716c1dd90697b001dfcda5b35a972c7f435e184082284e58700e:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
        kernel_work_item_inspection_required:sha256:d7764aac786085cb77ba36c695dbde81a8f638bd96bd048517092cfe31629e87:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca:
          after_revision: 36
          aggregate_digest: "sha256:5dd6b1517065c5026f8b22708c5c0504837507de5e1467232688c364cfdfbc4c"
          before_revision: 35
          command_digest: "sha256:7a06225aff9eeff4bfc0817457bee3404de3a29264149773746a5f46e6a20da9"
          effect_ids: []
          event_digests:
            - "sha256:ae23d320df6dd55795c0c20e6ad55ff6512bea27068931910f9e1e6118d80724"
          mutation_id: "kernel_work_item_inspection_required:sha256:d7764aac786085cb77ba36c695dbde81a8f638bd96bd048517092cfe31629e87:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
        kernel_work_item_inspection_required:sha256:e94c8f9596f5dc05fdca8528bce9a357175ad36ccd258a91f652c5b5514e20e4:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:
          after_revision: 10
          aggregate_digest: "sha256:7e8385a704b15dab26a398743f96f38a9204656ca804308c9e01c5cbfb9514f4"
          before_revision: 9
          command_digest: "sha256:b4908cd9821fc6cad1c4ba960e46120fb8a2ae9f5612b84a102fbff7a695d4c5"
          effect_ids: []
          event_digests:
            - "sha256:deabc081a56cf0b7dc6e940caeb4df00e8be4f0134397b9d3f3b93f6bc05508a"
          mutation_id: "kernel_work_item_inspection_required:sha256:e94c8f9596f5dc05fdca8528bce9a357175ad36ccd258a91f652c5b5514e20e4:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        kernel_work_item_materialization_required:sha256:40146b02fd43109a5a07bf042b5175eea1621571256361248f8f810e893c798d:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:
          after_revision: 4
          aggregate_digest: "sha256:917412e1429d3fe50953343f4924ffe97a7eb4c154953deb318e9f2f9c3d247e"
          before_revision: 3
          command_digest: "sha256:351b7abcea85256f404984227c1c6c2fc572510053ac13f176c03ac4c4272f68"
          effect_ids: []
          event_digests:
            - "sha256:5f24e8df17ba5168365f4742787c93c3bab95da4b86c5e78af8e4e5c45051da0"
          mutation_id: "kernel_work_item_materialization_required:sha256:40146b02fd43109a5a07bf042b5175eea1621571256361248f8f810e893c798d:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        result:sha256:104ac3d724b2d858715b2ff087f5a4ef92a8952813d04fe7dff76efbf0f57234:
          after_revision: 88
          aggregate_digest: "sha256:aeabeedf1c20dd0eee71a70d6670c3180defd6b7b2ff87dfca82b9b98bb40253"
          before_revision: 87
          command_digest: "sha256:e46e0bd4afba3f370ae5a1ff0f0cce3892894c1103d0468b6ab1ab6d7c1ee212"
          effect_ids: []
          event_digests:
            - "sha256:2d6c62560bcef23a3efa36d996e82054ae48bf4fe1420b416a6e790d941bbd52"
          mutation_id: "result:sha256:104ac3d724b2d858715b2ff087f5a4ef92a8952813d04fe7dff76efbf0f57234"
        result:sha256:4246f45902cd60697bc81f825383c0bbdf6f4218de09ede2540c1b1259191d83:
          after_revision: 81
          aggregate_digest: "sha256:fad229f4ec4ecfe89c6b1467588e83137e7abaded79b4ef1916f0d946ccf4502"
          before_revision: 80
          command_digest: "sha256:c11d4a6189449072164e68b66fa32dfbc8d3a693c579a0c63b1ea0e66ff7af8f"
          effect_ids: []
          event_digests:
            - "sha256:13cc74369cd65612bae21c10359dc1e5bf2bdd03cfa6cd9c63ef23e3fce715ff"
          mutation_id: "result:sha256:4246f45902cd60697bc81f825383c0bbdf6f4218de09ede2540c1b1259191d83"
        result:sha256:700ee4fdec261b5d7de5e1dffba4f27dc0bf6b0627029481b81606840c6b2e74:
          after_revision: 67
          aggregate_digest: "sha256:4f9a8b9c9a78c6f7808f3f52fc1467746c182e1529c2ff1e3e233de1afb1d794"
          before_revision: 66
          command_digest: "sha256:cd241d5ae185c60e35d445e9f85c5d92da3247ad1727f0a10ba74fd7ea18840e"
          effect_ids: []
          event_digests:
            - "sha256:464428e6eb504c980221a1d571454dd68ff5db3442b89a113134ddf3a87bc067"
          mutation_id: "result:sha256:700ee4fdec261b5d7de5e1dffba4f27dc0bf6b0627029481b81606840c6b2e74"
        result:sha256:751a43ec0baffbfe76dcefdec903be54f17ec985830a4acfcc268b22b747018a:
          after_revision: 2
          aggregate_digest: "sha256:853a5cb55edafc2bb0cafb22d61a0787c980a1d58cb56362f4bb2eb7bc274e05"
          before_revision: 1
          command_digest: "sha256:39f78f8e4a04c946e6963aee378dbebabddb2d98619684c40b73fbd97c42814f"
          effect_ids: []
          event_digests:
            - "sha256:06af936de5952b9764023cc699a40ed61d11e66cbe94defef0fd5feeb03c485f"
          mutation_id: "result:sha256:751a43ec0baffbfe76dcefdec903be54f17ec985830a4acfcc268b22b747018a"
        result:sha256:8111d8912e1addcdc5ed85d62781aa44882a96ca27fe2193a47f45190366a076:
          after_revision: 74
          aggregate_digest: "sha256:ce7bcf58f3a1c12748de5a7a23621970661be0efd53b5323d68267a802cecfa6"
          before_revision: 73
          command_digest: "sha256:01929a7d52a564692135dd866090b72be0179ee74d71cba5f3145a7b25f92163"
          effect_ids: []
          event_digests:
            - "sha256:226a9309d1d1f52f0cfa3411bb43531b302441dbe4003a0f68fdfc94f89e3e53"
          mutation_id: "result:sha256:8111d8912e1addcdc5ed85d62781aa44882a96ca27fe2193a47f45190366a076"
        result:sha256:a6f0ccb5b7d66ff050194aaa1d3ea95ff71479d326973a3f92751424e1076f95:
          after_revision: 28
          aggregate_digest: "sha256:fc5ce997296367e74facf61d56cb8f55345b383825e012e6598caf896179bcdb"
          before_revision: 27
          command_digest: "sha256:08e045d1114bab9a425b753083b6ee951bda79424c595713dea343833019c585"
          effect_ids: []
          event_digests:
            - "sha256:12e4bb8e8988d4fe5d44733bfb1591732877bbb9fe934ce7234cf6023b5935fb"
          mutation_id: "result:sha256:a6f0ccb5b7d66ff050194aaa1d3ea95ff71479d326973a3f92751424e1076f95"
        result:sha256:a8e0c204ea67f4e6727a4360b80170689bf1725e9cee1f3824c28a5a606476b3:
          after_revision: 35
          aggregate_digest: "sha256:7aa7b2ec9e30935c5d8085fbed1010646a4df9d402e9e7ed1e28b9582710366c"
          before_revision: 34
          command_digest: "sha256:20ceff605b2f542a84cc5745f97c663cae895790e4195bae06790ad15ce32e0e"
          effect_ids: []
          event_digests:
            - "sha256:7fb163f706c94f2e2c33405f08ea6d361a3ce041b822002fc00cd2bf5ea776a1"
          mutation_id: "result:sha256:a8e0c204ea67f4e6727a4360b80170689bf1725e9cee1f3824c28a5a606476b3"
        result:sha256:ac81fb18d1a11b349aec72314a3db4b7687271ecf8c4775f52b2060d7493fb96:
          after_revision: 48
          aggregate_digest: "sha256:00c63101af32d71f862e086485fca8e1e0553ee910b6b03e176e6ae00a8c1e44"
          before_revision: 47
          command_digest: "sha256:218f7912bee8d1b449efe24c43c4ef6f8a3f9a9eba5dd84a398ef959536d8bab"
          effect_ids: []
          event_digests:
            - "sha256:c6e49fc160547cef055f8454c63b3d1bb6ddc03c0b3dc22a89546bc5059ebe7c"
          mutation_id: "result:sha256:ac81fb18d1a11b349aec72314a3db4b7687271ecf8c4775f52b2060d7493fb96"
        result:sha256:c6c4abfe24dc8f64bffc794720884ce0c0a9e4af74812b0f94f552c7bc899368:
          after_revision: 95
          aggregate_digest: "sha256:523ae20c7093fdaed0f27af1cc8cec5f1e2287740a9863df3bc9c9171abba396"
          before_revision: 94
          command_digest: "sha256:1706f5c487e2682c4bff82317f7beffe31aa36d8ee64e6324307926625b10985"
          effect_ids: []
          event_digests:
            - "sha256:8e906e77fd2e7c8e276261121386b2b3601d1965834563658404ae19d0af5012"
          mutation_id: "result:sha256:c6c4abfe24dc8f64bffc794720884ce0c0a9e4af74812b0f94f552c7bc899368"
        result:sha256:e7c3503478f1b7ccee8db73a568b00ddde68f0f2ff2aa322c8b0c773133579ef:
          after_revision: 21
          aggregate_digest: "sha256:046187eb6cff4e9b9f12dacff44f9d23a9e55d9205c28a9e441eb376a1e30772"
          before_revision: 20
          command_digest: "sha256:91ca7f7fc1321d29fc7418f293d7d64823fe83b9921141859b8aa2b3da9780b9"
          effect_ids: []
          event_digests:
            - "sha256:7ce173605627afdff8bf364b6f71d0ac14f25fc130596a98cccffdf97fffe965"
          mutation_id: "result:sha256:e7c3503478f1b7ccee8db73a568b00ddde68f0f2ff2aa322c8b0c773133579ef"
        result:sha256:efa76a0b73d1b589c0a89a92ffdf29f06c3ee6d988081dd5c68b7eba9dff890b:
          after_revision: 9
          aggregate_digest: "sha256:e3f6683165f28f21fd8ddc7a2aabc8d37b999ae393988f339197283500132d52"
          before_revision: 8
          command_digest: "sha256:3f0e05d1c2e71883be266722efe5dd4a9dda40e0d2053827dfc930a26b973ac6"
          effect_ids: []
          event_digests:
            - "sha256:b69a48ebf387c59014b45d07ce6a93d973105db9d87e00244b44a6ffd8be41cf"
          mutation_id: "result:sha256:efa76a0b73d1b589c0a89a92ffdf29f06c3ee6d988081dd5c68b7eba9dff890b"
        result:sha256:fb9360270133f9de3d5e86706d5426395c9728915b48229313aec66d930559b5:
          after_revision: 55
          aggregate_digest: "sha256:b1184249a5ba75d64cde3ad0f94cd9911f1aa1794eac587dfd41b1ca7ee89beb"
          before_revision: 54
          command_digest: "sha256:961bba0731faa304ba5b3778c128a87c0d59df4148249dc15855645c2e50566e"
          effect_ids: []
          event_digests:
            - "sha256:ad7ec459f5a5b336f0cac6197a01c04afbd06d3fe8cd0ff4f1bfd25210b90be4"
          mutation_id: "result:sha256:fb9360270133f9de3d5e86706d5426395c9728915b48229313aec66d930559b5"
        semantic-stop:sha256:04f214d742370d265ea4322392cb14c30fe6b8b93b212888179552cad23ef894:
          after_revision: 102
          aggregate_digest: "sha256:5d504a2601f636abb43e0ad8a6cae5e22fa546d204ebbb79c15d36fdc83f8df8"
          before_revision: 101
          command_digest: "sha256:b3f65414abffea3c2a37b533493036be42c4c5c4cd10547d3772cd41a8cd2fb5"
          effect_ids: []
          event_digests:
            - "sha256:8f040e7b7459577b73878794b34a103a4eb1b11e464a3a68ccd2021cedbd7d37"
          mutation_id: "semantic-stop:sha256:04f214d742370d265ea4322392cb14c30fe6b8b93b212888179552cad23ef894"
        semantic-stop:sha256:3895707aa08ebcbd5041ed1ff38fe0ea0868947e07ea8db56124d0d1ee8099a2:
          after_revision: 61
          aggregate_digest: "sha256:240eb715e1830a420865225dbea8f29f1559baa8af0969f0ba178350921072ec"
          before_revision: 60
          command_digest: "sha256:71fc97e93eb2326479d1256c9daacc84e23321b2a7225e4bce3d4db6bafb9067"
          effect_ids: []
          event_digests:
            - "sha256:1b81f5b63b730754183bee55f0ccb11cd62e8d780659236edd0ece7064f1173f"
          mutation_id: "semantic-stop:sha256:3895707aa08ebcbd5041ed1ff38fe0ea0868947e07ea8db56124d0d1ee8099a2"
        semantic-stop:sha256:4299f720bfe6bfa995aa418f989d586859282654768467f86b8aaf509f765f4c:
          after_revision: 42
          aggregate_digest: "sha256:3033d53c0c29f63b3ca88422fdf080ef1d9d7d33c9bbca9189081226ecb36de4"
          before_revision: 41
          command_digest: "sha256:fc23be99da3d3d93e0fe37d88ff80343fe5518578e3aaf2b57657d7f87f16d46"
          effect_ids: []
          event_digests:
            - "sha256:0072636756c58bc0d8fb0c5954ddf6003e2cadb7d939615ab6a68556939f7fee"
          mutation_id: "semantic-stop:sha256:4299f720bfe6bfa995aa418f989d586859282654768467f86b8aaf509f765f4c"
        semantic-stop:sha256:c580af9846789d53142c74c31d1cebcf0cb0be85e7e4d04dada414cdabc3b3f1:
          after_revision: 15
          aggregate_digest: "sha256:aafc3253df458d5c944a8dfadd18d508566dbdf78ba17af2a39f26c56c1f4625"
          before_revision: 14
          command_digest: "sha256:1f76accacce364374477f43062970d15e98668789d3bd8223bb6079027bfb925"
          effect_ids: []
          event_digests:
            - "sha256:a1aeac8bce1692f17ac591718da2d5469673d4bc0f5a1e07af78fbae7d9c873d"
          mutation_id: "semantic-stop:sha256:c580af9846789d53142c74c31d1cebcf0cb0be85e7e4d04dada414cdabc3b3f1"
        sha256:0c36be0843837c2ce5242549727a0aa0ebe3fd1c0cfad4531d579236a15e246d:
          after_revision: 47
          aggregate_digest: "sha256:8659f7adfb3e37244de5b66547c5af88d13e47a11b98263f5199e382ca4f59d1"
          before_revision: 46
          command_digest: "sha256:b20022ad9bdad1ae75c1d9b093572742aa273d7718f642d7a834a16d7a029fea"
          effect_ids: []
          event_digests:
            - "sha256:30a9a021a1b279816cf7d5562c6ccaa9bc8ba8ec5e7c51804a7ca482db5759be"
          mutation_id: "sha256:0c36be0843837c2ce5242549727a0aa0ebe3fd1c0cfad4531d579236a15e246d"
        sha256:0f218f0800d9229c6247f314941b09882782ddddd63d94f0d00c20c76ea4ca6d:
          after_revision: 73
          aggregate_digest: "sha256:698a9d79d98274d5055b015cdc832ac99e64a005b259435c471ee729a9da9b3e"
          before_revision: 72
          command_digest: "sha256:9aeb0c92ed150152ac0daf9d94e689289163a2c2de494a0753d7d7f045877625"
          effect_ids: []
          event_digests:
            - "sha256:465e38162d313c7e44613a25c7d4bd635a098f39c61c5f5627c4440907b05363"
          mutation_id: "sha256:0f218f0800d9229c6247f314941b09882782ddddd63d94f0d00c20c76ea4ca6d"
        sha256:102f053f3a5256d2ab499ffa18a9102f80b9b30afb5c925f5451a8b81aa9422d:
          after_revision: 94
          aggregate_digest: "sha256:645f62003736b9e4312b2df7e986a9717cf0448c05c962729934aed6fef5ecee"
          before_revision: 93
          command_digest: "sha256:9def2dc08098ab9c9e53f954246018e538ed4d3d810d8bc2e3535445a8cf2213"
          effect_ids: []
          event_digests:
            - "sha256:c1c40c2f987e98f005aa8fee11fc7319ccb1d6e1edafdce087719ebef6b62146"
          mutation_id: "sha256:102f053f3a5256d2ab499ffa18a9102f80b9b30afb5c925f5451a8b81aa9422d"
        sha256:15cd3d8dcc82b9236627b5fe080258d0ef783389cc598e2a01812fce2bb82620:
          after_revision: 101
          aggregate_digest: "sha256:bf90a7c50dbd5b2e5e7bfadac0838368f8977f2a9295deb674c188602d491802"
          before_revision: 100
          command_digest: "sha256:a3c66a98f4821a6bccf335fd0fd2487768456a269603842c547244ee7089b086"
          effect_ids: []
          event_digests:
            - "sha256:29b2da6c3f172e3fb9965a591cddbd193b74b2c2636bd2690cb068693efabf0a"
          mutation_id: "sha256:15cd3d8dcc82b9236627b5fe080258d0ef783389cc598e2a01812fce2bb82620"
        sha256:16eb8e0323c3f4c564e6ebbfd0cd4e3ba1024369d16462a8798ff5bbab9bc5ad:
          after_revision: 54
          aggregate_digest: "sha256:2733ffcf6b750753ae85a69a4e6609bbf1520943cf3d272ec937edae3c7da9bc"
          before_revision: 53
          command_digest: "sha256:6234efa8f007a8605efe88830007ab17ba7932d767cf8dfd16710ee1e7cfe8f6"
          effect_ids: []
          event_digests:
            - "sha256:c0f8380b2179c6be49a34424f89b0d47951e99ad7bc5335f57bfbd55dc08a7a9"
          mutation_id: "sha256:16eb8e0323c3f4c564e6ebbfd0cd4e3ba1024369d16462a8798ff5bbab9bc5ad"
        sha256:485af9271057fb7ab9aad62cc76e3895c01714f05adec6a1d00b92d011fef1b0:
          after_revision: 66
          aggregate_digest: "sha256:79e3d96f1d6c0cce7e7523bb8c9c435af1421ad6e76d54ff0ecbb86f920c984e"
          before_revision: 65
          command_digest: "sha256:a65244796dda84c6d9d8af686c580803b45aee60b1e15e8245015246927c4460"
          effect_ids: []
          event_digests:
            - "sha256:1a4acc37b9969e076f8a1c65112bdb1ade43ee18df54fbbc5d81b26c47f2a3d8"
          mutation_id: "sha256:485af9271057fb7ab9aad62cc76e3895c01714f05adec6a1d00b92d011fef1b0"
        sha256:4d7a042e5d793800d74fdf39cde997d85e65f1aa19e1702712a0c7636ae3a1e8:
          after_revision: 20
          aggregate_digest: "sha256:765c1753a941f9bcd7d96e366cc0f041f886e0163594733771f68c8368c62eb8"
          before_revision: 19
          command_digest: "sha256:95d7da35b5c76539f2132b2c1a832ed27ebfb1102f4d19895090097af5aafbb5"
          effect_ids: []
          event_digests:
            - "sha256:80b618ba7014f524cf52759c5972fd5e06f0815a97c32317fd43d59b09b71a0e"
          mutation_id: "sha256:4d7a042e5d793800d74fdf39cde997d85e65f1aa19e1702712a0c7636ae3a1e8"
        sha256:65c2e4a2dace72ba75d1f7b333d95d9db095ad31497e263b2b9712294b65a030:
          after_revision: 87
          aggregate_digest: "sha256:2e6bc8f9ae0e96c6e4cce9fb4982a3189d7dcc700106a7722eb0758f90c60a8c"
          before_revision: 86
          command_digest: "sha256:747069b44c6d894afb21060f27987b3ec3a8f26d8b61c8473a7427a7adccd1ee"
          effect_ids: []
          event_digests:
            - "sha256:bdbe724d48c0137a7a5142bce62b5e77bd800a5f332b1575de90a0d33f7451a2"
          mutation_id: "sha256:65c2e4a2dace72ba75d1f7b333d95d9db095ad31497e263b2b9712294b65a030"
        sha256:6697a6a0b2908ab268252c196646cf1566cb69ca85dbe961b7b62ca74e037886:
          after_revision: 27
          aggregate_digest: "sha256:98c16b4c5ccf70e4b4c62f16ac622e387e6acf35506bb4da2a2fc1dfe93485a3"
          before_revision: 26
          command_digest: "sha256:be076957c608c802d2ce9844b9e0101380a08734e447f78981b999dab795e080"
          effect_ids: []
          event_digests:
            - "sha256:9aa3760a3d50276caf18d196ac978dfc4f4ec8d23de49299bc0c4694b82bf8f9"
          mutation_id: "sha256:6697a6a0b2908ab268252c196646cf1566cb69ca85dbe961b7b62ca74e037886"
        sha256:670ed3dca1bc2770e862675e759a5939bd28b8e08ca15f8588cea711d0a54cb6:
          after_revision: 41
          aggregate_digest: "sha256:b923f4a0141f6a146b379a6c48347de25cab67d178b84d199f9fc94cb5ba78e6"
          before_revision: 40
          command_digest: "sha256:c7584c0968b7f38a07f983be6190c6db5113a07528775d94d34c1b364f696d88"
          effect_ids: []
          event_digests:
            - "sha256:42b1b3d9909b5c277d2d4bb2ebf8516455d78372b0041f7380ac2b8230021069"
          mutation_id: "sha256:670ed3dca1bc2770e862675e759a5939bd28b8e08ca15f8588cea711d0a54cb6"
        sha256:732493cc903fd73b21ded5920458a2b9815212e6da709a8f31d2e6c0a0b2512c:
          after_revision: 17
          aggregate_digest: "sha256:d75b9c2e3760ddc981d1bc4e065b6e07f969daf6b7088f17fc597cd32e37ed62"
          before_revision: 16
          command_digest: "sha256:c4c95bdb167d02b82e754d7762092ad377344e58d80ce43ff3c6d9cb179ed9d0"
          effect_ids: []
          event_digests:
            - "sha256:844f35f5cea0c354bbe49b2a0ead9add741f66c5e4a1adf94e095e8a01042fb8"
          mutation_id: "sha256:732493cc903fd73b21ded5920458a2b9815212e6da709a8f31d2e6c0a0b2512c"
        sha256:75d6eca564b7f79167f58dd7a39d6a55dfd18b744497b2c5b0d5292ea16670fa:
          after_revision: 8
          aggregate_digest: "sha256:68e852950c421a33a035285a1f6a3ecde439a8c92f3fa9585e04781784b656b9"
          before_revision: 7
          command_digest: "sha256:035148dfb4e0fcf0bea510c2e6908a41b24f3a104cfd1cbb319d92aa2e986414"
          effect_ids: []
          event_digests:
            - "sha256:7ad9306f4803058ffcf3c943d560ed403629821e4bc37fad5cc216286c91e60a"
          mutation_id: "sha256:75d6eca564b7f79167f58dd7a39d6a55dfd18b744497b2c5b0d5292ea16670fa"
        sha256:81a557e1fd4b1d2099c67aeb5617998673d530ed9c4def457addae16116580c5:
          after_revision: 63
          aggregate_digest: "sha256:e075d6003425bf7f34061365cbce0391fee3ced814ffa506110350052616483f"
          before_revision: 62
          command_digest: "sha256:ff939db2d495f9ec75dc33bcf6ea56453d7682f7c6d38799ee504f48110186dc"
          effect_ids: []
          event_digests:
            - "sha256:4eb9edf0944952202bcd181ae0b51b5cf6308ae840b926fe86ed87b31ac091d5"
          mutation_id: "sha256:81a557e1fd4b1d2099c67aeb5617998673d530ed9c4def457addae16116580c5"
        sha256:9f68218024b4d1f0d8a5a04ca69007d6cb2894903601b54bd2b33001b7a9b065:
          after_revision: 6
          aggregate_digest: "sha256:4c5d7ca88c5088d5a9a85c1cf107d00f749595dfdf8b468fb7b7e51017d78555"
          before_revision: 5
          command_digest: "sha256:31fe4e1ae4444d8467f476038b4c132a7e57e16aacf876fe76bd9ee38707412e"
          effect_ids: []
          event_digests:
            - "sha256:3d2c406613421cc9ed5270e6467965ca292a950894bd3a135e9336c57743ed80"
          mutation_id: "sha256:9f68218024b4d1f0d8a5a04ca69007d6cb2894903601b54bd2b33001b7a9b065"
        sha256:a2d5b4f1395bf5e821d7f7186ededc991db826a8352a56661d387998d1cd7155:
          after_revision: 3
          aggregate_digest: "sha256:436e5b4772264c7559ae52bf8db6440cb6db39e503e0613159ed6744c7356c5e"
          before_revision: 2
          command_digest: "sha256:f3eac96d5bd4a63d90ab523eae9cce9a5e6fb405e14e099b3e5bc94c45bb69de"
          effect_ids: []
          event_digests:
            - "sha256:0bcb575b8fd60cdde98011fc926e559ad57b0dd71a67a8cabf2a425820e7a667"
          mutation_id: "sha256:a2d5b4f1395bf5e821d7f7186ededc991db826a8352a56661d387998d1cd7155"
        sha256:b18302eb90e868d4831604fbecda94de65a65d7a2bdb1cac987df58642331abf:
          after_revision: 44
          aggregate_digest: "sha256:ddfa33cca744d602bf4286e5914d564f0384aa27c67ebe6e8c00bb92fb9de3b7"
          before_revision: 43
          command_digest: "sha256:113d4da9280191b366e846738226df26a3de2c871b64972da6c5b774197f5bc4"
          effect_ids: []
          event_digests:
            - "sha256:57f1bbc6645772104c4ff31dd1857bebdaa6a571d3586d6f43dc1ee1ff71e737"
          mutation_id: "sha256:b18302eb90e868d4831604fbecda94de65a65d7a2bdb1cac987df58642331abf"
        sha256:e1ec587d9dda9117406908a2a48f44f9a8ecfa5dd94fffe7875603b9d355f39a:
          after_revision: 103
          aggregate_digest: "sha256:b9058f8d122ebe99ba67f4723d03dc56a34a4f3a21cbbc56e3fac3323859eb50"
          before_revision: 102
          command_digest: "sha256:a9b6f23405e8607e3beab839fc9fa3822da9838d5c3f7bab86d9672bb911f84e"
          effect_ids: []
          event_digests:
            - "sha256:0defe20b985f8affbbeb3dddd2590f9daae28eac440c86cdd9e19753d73fa9a2"
          mutation_id: "sha256:e1ec587d9dda9117406908a2a48f44f9a8ecfa5dd94fffe7875603b9d355f39a"
        sha256:e29eeb415997c8fa0000f810a7248b10527038fe8c85ef0c3354dbda9c238576:
          after_revision: 80
          aggregate_digest: "sha256:5b63be3b81afd5e7b9618e03e5bbaf74c13f296d7cca376341a766739250ca11"
          before_revision: 79
          command_digest: "sha256:fc5c273a7b14c67bbb419719d4840ad423f22de66d0958d93a27d70a4ffcafd0"
          effect_ids: []
          event_digests:
            - "sha256:4ff6371a94f11c17db9b457e8cef6ae9a8549d4cfd31f8ddc3cc0dd643cc3fb5"
          mutation_id: "sha256:e29eeb415997c8fa0000f810a7248b10527038fe8c85ef0c3354dbda9c238576"
        sha256:f99e830ee58be2f0e3f848bb8337909908f6584f08636e1e282dbf0a7c103eb5:
          after_revision: 34
          aggregate_digest: "sha256:65591ca12a5488235566e8bcb586d2bad5ddc7229f1df1eaca101d6a47f41aee"
          before_revision: 33
          command_digest: "sha256:bc04f090ef05fae298bd97087195b72ed05ac7b6b9b5b4f88df8153086b0fff3"
          effect_ids: []
          event_digests:
            - "sha256:1a4c3c117a36cc3e0bbaedc236dc1a9d9a8c2e90e4bc0b4acaf73a63cdba853d"
          mutation_id: "sha256:f99e830ee58be2f0e3f848bb8337909908f6584f08636e1e282dbf0a7c103eb5"
        validation-resolution:sha256:1d36a603960213f3c1a4ecba796d6de0b6af12be297068ff06b979ac2c7bb623:
          after_revision: 98
          aggregate_digest: "sha256:30c44132d8b94d0008b1e544744828301adb71cf4b9fc4bc2921bfc76f69dbe8"
          before_revision: 97
          command_digest: "sha256:8754e3ed15764b6c01161aeb33f3f05f86b9309864f8b6343932a1e668a22d87"
          effect_ids: []
          event_digests:
            - "sha256:5e3ed49193a74743196b26ea67ea7b5077fb45e63751bcaea5a15d21932de06d"
          mutation_id: "validation-resolution:sha256:1d36a603960213f3c1a4ecba796d6de0b6af12be297068ff06b979ac2c7bb623"
        validation-resolution:sha256:29de504d5238ef6eedd15565cb1d0c9d3c2e4a516e53fd4beab514bd16b501a6:
          after_revision: 12
          aggregate_digest: "sha256:8acfc5fc4ad0c21b1db01df3c33f8eee5856c4125affb2b919555d3027cc6507"
          before_revision: 11
          command_digest: "sha256:da987d433167ce579a1dc3839b20d091717fa576d0be98bff0c2bdbe929ac987"
          effect_ids: []
          event_digests:
            - "sha256:61921f83d3c5b5ad922f482025d1fb15c40774907b85a35f7ab627e1710f10c2"
          mutation_id: "validation-resolution:sha256:29de504d5238ef6eedd15565cb1d0c9d3c2e4a516e53fd4beab514bd16b501a6"
        validation-resolution:sha256:57a4c9b4060998462ec67c091ebcb1113c2d91f3fe33b0bc4087270fa4c6c656:
          after_revision: 84
          aggregate_digest: "sha256:b2848a3b39bced9f4ab59fb93a0cb07a6069079f96525028c6ce064daff6f41b"
          before_revision: 83
          command_digest: "sha256:ea0bb7875f7987859290061480a0291db6c9ae2a05a9595177d1fa74342a0c8f"
          effect_ids: []
          event_digests:
            - "sha256:b8dd523eda530f8c1279b03a9c27b1117d4de9b532a190ddcae72a4047ad085a"
          mutation_id: "validation-resolution:sha256:57a4c9b4060998462ec67c091ebcb1113c2d91f3fe33b0bc4087270fa4c6c656"
        validation-resolution:sha256:841022afcfd46e21885e023bb28e66a130ecee71d03f9e22be35387feb966280:
          after_revision: 31
          aggregate_digest: "sha256:31b71e236b7cc6549abab9d9bf4c9d944aa7b3f3fc5c5fc907317ff260f80c5e"
          before_revision: 30
          command_digest: "sha256:d6a5aba35ac49e51b1911facd70affa08f17e201f45186ee6ab8af90ef6a7a65"
          effect_ids: []
          event_digests:
            - "sha256:8560ec6a653f3e79f9a03d79e8709e5bd10ca4c8d633ac45a394f76538d4767b"
          mutation_id: "validation-resolution:sha256:841022afcfd46e21885e023bb28e66a130ecee71d03f9e22be35387feb966280"
        validation-resolution:sha256:8cb0d7fcdeb80dc3b3d1e5d86096c19b7c8a5f990cba9fefd60946d52d7ec611:
          after_revision: 77
          aggregate_digest: "sha256:637ac599ee0b10ce158523b6f9e91304acc42c16c46a3bad3f37c7279b2d7c25"
          before_revision: 76
          command_digest: "sha256:77389669c68bc1db2a75cc708186e6c4f792b04f87a059dc6da8270ad8d050e7"
          effect_ids: []
          event_digests:
            - "sha256:8667da1da1ca3b84b8f0ddb5a5a4bf0c13b7e0a95aea3ed9400ddabe2acfbfd4"
          mutation_id: "validation-resolution:sha256:8cb0d7fcdeb80dc3b3d1e5d86096c19b7c8a5f990cba9fefd60946d52d7ec611"
        validation-resolution:sha256:8cf4aba1e9f1190b381434bf18f60bb7c7870dc547f57acb31231c68565c5d80:
          after_revision: 58
          aggregate_digest: "sha256:48166768a6154bf9fa38e59d97932e79b229fc73838bbb3b50a39b47b5ce899b"
          before_revision: 57
          command_digest: "sha256:b80939453fb92c9e2cceea5c02bd22389ed1a32fd107706a7a2ebd38504a90de"
          effect_ids: []
          event_digests:
            - "sha256:1d55e6f2898e889feed5a36d0e1cbf91fd1b8d2e78b7ee84ae9844f171fc57b6"
          mutation_id: "validation-resolution:sha256:8cf4aba1e9f1190b381434bf18f60bb7c7870dc547f57acb31231c68565c5d80"
        validation-resolution:sha256:964a69d0bcb2de513d266d29aea7b800560a964314e78d83feecb497dc222cc3:
          after_revision: 70
          aggregate_digest: "sha256:73390ec8bdbd99b2c75f83bda828ee8e267468afe1091f8d061f035b2fe840ad"
          before_revision: 69
          command_digest: "sha256:aebff1115cb6e1926ca2f70212f6d6afb65884e6e6c227f7e02d7cc58c9be7d7"
          effect_ids: []
          event_digests:
            - "sha256:6139eff17faaba8c79a697f787bfeeb5bb44301a79830574aafd392252c016f3"
          mutation_id: "validation-resolution:sha256:964a69d0bcb2de513d266d29aea7b800560a964314e78d83feecb497dc222cc3"
        validation-resolution:sha256:aca061558716ecee4a1a261984ac3ffbc4519af68f0cce7b848289c1a905a603:
          after_revision: 91
          aggregate_digest: "sha256:72f44811bf605960c200db2822e2e5572b131d96bdd878a904aef3f7404b8806"
          before_revision: 90
          command_digest: "sha256:4c5258c78a2edd399e4ec46e5cc0d42f0865c5935c96a14dc81617768afce819"
          effect_ids: []
          event_digests:
            - "sha256:ce8bd4afb0e4e74efc3bb4ec3e720dcd3888650a75219b15105911ee340dd2c8"
          mutation_id: "validation-resolution:sha256:aca061558716ecee4a1a261984ac3ffbc4519af68f0cce7b848289c1a905a603"
        validation-resolution:sha256:b763c7e198475b2d5a9e42aa3f4f174bd1b01bf74b4026102cf3171bde829ade:
          after_revision: 51
          aggregate_digest: "sha256:b7ecf3b6da56b940ec360603d0adf54c9449e8e6526c86ff3cb1624fcd053bfe"
          before_revision: 50
          command_digest: "sha256:9bdd1e7796dda406b28f193de495d89a66f46626cecd8464cde118c5a0427e55"
          effect_ids: []
          event_digests:
            - "sha256:de9f88f56b5c48210cc734a832554a06dd7f462e0191842d77602fd494c5f163"
          mutation_id: "validation-resolution:sha256:b763c7e198475b2d5a9e42aa3f4f174bd1b01bf74b4026102cf3171bde829ade"
        validation-resolution:sha256:e59016c9f59f7da3e057db9612c69b799e08af372b679490f0a28e715b05ae13:
          after_revision: 38
          aggregate_digest: "sha256:420fdc57e401d192ab53cd082e6291f40925fc76d5b33c1b92d72e0c5f154051"
          before_revision: 37
          command_digest: "sha256:cd086e571832ae5ada6d630daa2d7fc6ec5acf968590e384335ff95363a39d51"
          effect_ids: []
          event_digests:
            - "sha256:7478d417f6f22caa0b80e23bb42ba24378c5368290b9a769a50430cb1bb2bd5b"
          mutation_id: "validation-resolution:sha256:e59016c9f59f7da3e057db9612c69b799e08af372b679490f0a28e715b05ae13"
        validation-resolution:sha256:fcb0ff984fcc404660515468761c6ae71bf2f92a898e3a31b579b6b9ce28a667:
          after_revision: 24
          aggregate_digest: "sha256:69e14d5b73cc62062065d6482e89f87fd4710327f1873babcc35fba7e9ffa21b"
          before_revision: 23
          command_digest: "sha256:7785a708b69f66dcf542295b9b933b687b4fc1b3d3ea0ea55d4a50e4cde2a123"
          effect_ids: []
          event_digests:
            - "sha256:ca689300e12dd8615353dff5e02d246c1cdf7d54a017bff4c36ef49f01459bd8"
          mutation_id: "validation-resolution:sha256:fcb0ff984fcc404660515468761c6ae71bf2f92a898e3a31b579b6b9ce28a667"
        validation:sha256:06468c0cc3fdbc7426e6f7ef8ad904cb04630b20458617e0f754e567e302bb15:
          after_revision: 50
          aggregate_digest: "sha256:46fa8c1d2ea4eedf27c0c3526f8014b242fa8de136ef052d597371f7ece000a6"
          before_revision: 49
          command_digest: "sha256:3bfd8723b44d302ffc35159350b7a0be79dc01f210b0919ced2be98b23de51de"
          effect_ids: []
          event_digests:
            - "sha256:21908e22d5820c403fe285b1667c1a60a5679db0e9035eeebf6960fccb43c560"
          mutation_id: "validation:sha256:06468c0cc3fdbc7426e6f7ef8ad904cb04630b20458617e0f754e567e302bb15"
        validation:sha256:3956180757c36d9641c69e0e151af033f755ec91bfce93f8a445cb83cc93dbd5:
          after_revision: 69
          aggregate_digest: "sha256:c300698e395498e0c63241f1292712c43a918c93e6646e2b4d00d0c13b72f6c6"
          before_revision: 68
          command_digest: "sha256:32dcbaccc36722033edec002d8d226925e0773e00f3a380a24394a4805c044ba"
          effect_ids: []
          event_digests:
            - "sha256:1cfa21133cac2aeeac4a453b8c10cfe4054fbd948fb5cd068057914ed0d79c8b"
          mutation_id: "validation:sha256:3956180757c36d9641c69e0e151af033f755ec91bfce93f8a445cb83cc93dbd5"
        validation:sha256:567a613c49b9f73f5d93b512fcab856e45baba4118b09a680d4a98d9b8a92b13:
          after_revision: 76
          aggregate_digest: "sha256:c76c0b0e5a3e1dff066eacad486411d1c98da869e37a615e17ea3f81a2c45a1f"
          before_revision: 75
          command_digest: "sha256:7923bd71507261a09a711239f60968b5bf5a22d7e50623b40e7c96aec315ef3f"
          effect_ids: []
          event_digests:
            - "sha256:d22b15359fc8b3d2d97244979296b065f5ca0e51809d04576eedc6154fbc59a7"
          mutation_id: "validation:sha256:567a613c49b9f73f5d93b512fcab856e45baba4118b09a680d4a98d9b8a92b13"
        validation:sha256:76b5c35943e80497a6398109679a7bc7db6710f0894df5cb269f39b3ee38e29f:
          after_revision: 37
          aggregate_digest: "sha256:85ebfb4bf16dd49050dfce20e2163b98216fe3f48ddfa5cb764db69372fca270"
          before_revision: 36
          command_digest: "sha256:fd9c049b8aa09badd690b92bf1985c3222a35da875ba3e5030abee3375870881"
          effect_ids: []
          event_digests:
            - "sha256:31427a982be374dc3bbce06f0293502ed97158c8818d6dd624bce8e28664d628"
          mutation_id: "validation:sha256:76b5c35943e80497a6398109679a7bc7db6710f0894df5cb269f39b3ee38e29f"
        validation:sha256:7f625388b8e806923003285eff068bcb7eae08190c42af02c1bfa5e76e028ae8:
          after_revision: 11
          aggregate_digest: "sha256:f267528f897c629f01d338f32aa0297942b7c2252e97f3ac0ba72c9637edd5b4"
          before_revision: 10
          command_digest: "sha256:e10cc34fb76caff22110ddc5b5474f65b323f61cb79cebab576106733f14911e"
          effect_ids: []
          event_digests:
            - "sha256:f00f6727255cb8ba80e0b0ab7ce01db5c87a07d590251b6520a5505b22a84c5c"
          mutation_id: "validation:sha256:7f625388b8e806923003285eff068bcb7eae08190c42af02c1bfa5e76e028ae8"
        validation:sha256:a5c505c6dfb599261c7e2da55a71f843f3d6aa9feaa8c92d267bfa74fbcd124e:
          after_revision: 57
          aggregate_digest: "sha256:5462b8da401628efd92437e1c8bdb137d55d788e3619e1466777c8c8dd809d13"
          before_revision: 56
          command_digest: "sha256:93da176086ba4973696a5338968efd838e95674a82a3fd517871f6794e17745b"
          effect_ids: []
          event_digests:
            - "sha256:08746a3d9363c43cecb35ec5d33f8e330d32eb25668a31fc6ea291df766e5721"
          mutation_id: "validation:sha256:a5c505c6dfb599261c7e2da55a71f843f3d6aa9feaa8c92d267bfa74fbcd124e"
        validation:sha256:b4535211d2e2198a62babcea7e7a6ae00b734ac7017be4ee3c7106739452e698:
          after_revision: 90
          aggregate_digest: "sha256:08cf613490a8e0550e0ce14afe1acaf944e9f7f3c2b52e605bb709cb150cd120"
          before_revision: 89
          command_digest: "sha256:339b878d8e770b21a0274d322980c460c8171b10e5e62af42ac5ef2f7182fb59"
          effect_ids: []
          event_digests:
            - "sha256:f1c6f78fd76f6adf18040e231a29e46c4227504cb4129e76c9883043a012646c"
          mutation_id: "validation:sha256:b4535211d2e2198a62babcea7e7a6ae00b734ac7017be4ee3c7106739452e698"
        validation:sha256:cbba7aff5b7261da1b53c230f0000fd209b4201a34278c24fc4011f099493332:
          after_revision: 30
          aggregate_digest: "sha256:15c7cc1c430de04e207003443c768862b3356917ac4ee3e49c3e5320f6bd465b"
          before_revision: 29
          command_digest: "sha256:56ab4b85c820d33d05062d393b2408dd6877550a198ad0814abff639732c15cc"
          effect_ids: []
          event_digests:
            - "sha256:69985e82d6630fe058c13d288349e03a5564d9ff944d6dfbc617b021b0eb4ad5"
          mutation_id: "validation:sha256:cbba7aff5b7261da1b53c230f0000fd209b4201a34278c24fc4011f099493332"
        validation:sha256:f013c66da28b954f6c15b7fc6331cbf396edfcbab4ff0de88f165ea1ee623366:
          after_revision: 23
          aggregate_digest: "sha256:ba331822e7b02536e41796da5a2214994fe0101c7ddb4bbfe4aa2374d26bdbd5"
          before_revision: 22
          command_digest: "sha256:4c79442c48bb27681810b8821f61f52d9808c4407e8971f974d05285efbb3e48"
          effect_ids: []
          event_digests:
            - "sha256:d3652398672817940c1865766dcafd84a0999b690c949e7d4e1ea66feb8391e8"
          mutation_id: "validation:sha256:f013c66da28b954f6c15b7fc6331cbf396edfcbab4ff0de88f165ea1ee623366"
        validation:sha256:f83d8c88af429edf6bb65b39ef9c4ff2cae09674bf7b2ae0aa7122b621ce6bf7:
          after_revision: 97
          aggregate_digest: "sha256:2e0e9c267be8377e534f30c679019017a04b0057386ae8212f14cd6d87c9e4f0"
          before_revision: 96
          command_digest: "sha256:9b09a7f2c0d8d05f1f138beed06180295d80b6069f138dee99d461f0da69faf7"
          effect_ids: []
          event_digests:
            - "sha256:382e2cf7710c70dbbf01cde0f30604a61f3c7caba6dc0adc19e7712f47cfe9b0"
          mutation_id: "validation:sha256:f83d8c88af429edf6bb65b39ef9c4ff2cae09674bf7b2ae0aa7122b621ce6bf7"
        validation:sha256:fb398d8b499f985c0397109c3558e6b196a03d63b8332646ff4f32ac3a973da2:
          after_revision: 83
          aggregate_digest: "sha256:5a8d84b5f79c4b086bd9d6ba50031d2965e8a199e7c0232e11c7875427be7ca9"
          before_revision: 82
          command_digest: "sha256:84c866721678aab223d318755f508877539f0e14e843f150bbf188e37ddd098c"
          effect_ids: []
          event_digests:
            - "sha256:09722564e03d838393e19728f67217434da3518084a517607ef5d4b8be8923e7"
          mutation_id: "validation:sha256:fb398d8b499f985c0397109c3558e6b196a03d63b8332646ff4f32ac3a973da2"
        work-item-resume:sha256:87fa907c8e4b36d63a0107ede6dce8a85383ee5c0e01ddebc2d9ec3d85278f74:
          after_revision: 104
          aggregate_digest: "sha256:c53603d5a142dcfbf99b255a178baef3815afc75f17591b1f02de1a25039740c"
          before_revision: 103
          command_digest: "sha256:a330ee96e07d6daa26018c886447eb248c4b626a3a99bc65c92d8dc8f28abbf8"
          effect_ids: []
          event_digests:
            - "sha256:4d9cfea64c306b1f6eabbc0444fb5c950ce20dbff01ba30d24914dbc841f8afa"
          mutation_id: "work-item-resume:sha256:87fa907c8e4b36d63a0107ede6dce8a85383ee5c0e01ddebc2d9ec3d85278f74"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
          digest: "sha256:7c216e5b223db41358af03b5ff99d092654d854213b0bdd2e8f9b9bef14f0ef1"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:eec5695823181a8694b1bcf5cb1e6139f0cd852bc0e673e51c5b3c05cc8971cc"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "dependencies"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "scripts/checks"
                  - "bun.lock"
              expected_outputs:
                - "PL-01-result"
              id: "PL-01"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:8a3f299f467e292ea719936565f0a9ab891c1d65a1fdbbb30fd4e5c9a970a91b"
              depends_on:
                - "PL-01"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-02-result"
              id: "PL-02"
              optional: false
              required_inputs:
                - "PL-01-result"
            -
              contract_digest: "sha256:5c162df37252a2ac6b1354121f6091b207d4c091113cce632be41261f62af144"
              depends_on:
                - "PL-02"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-03-result"
              id: "PL-03"
              optional: false
              required_inputs:
                - "PL-02-result"
            -
              contract_digest: "sha256:27cd69a5f2f0fcbc276def77db84344075a09c7c5d805be65a104222f540a7a8"
              depends_on:
                - "PL-03"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/tasks"
                  - "scripts/checks"
              expected_outputs:
                - "PL-04-result"
              id: "PL-04"
              optional: false
              required_inputs:
                - "PL-03-result"
            -
              contract_digest: "sha256:eef019a80e7dcfc1201b8ac42fe36ccca08031f8d28d01c11f4e1e07483f2c2f"
              depends_on:
                - "PL-04"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-05-result"
              id: "PL-05"
              optional: false
              required_inputs:
                - "PL-04-result"
            -
              contract_digest: "sha256:3276fcabf6138471d8bfb4912b0a484cd0fb772637e3feafac359f25eae18ebf"
              depends_on:
                - "PL-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-06-result"
              id: "PL-06"
              optional: false
              required_inputs:
                - "PL-05-result"
            -
              contract_digest: "sha256:80f4804b019d568d46f26c25aea2f4c506fb077481e68ee49e1e89ca2d02dbf0"
              depends_on:
                - "PL-06"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "schema"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                  - "packages/core/src/schemas"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "PL-07-result"
              id: "PL-07"
              optional: false
              required_inputs:
                - "PL-06-result"
            -
              contract_digest: "sha256:076bd88a98adc68c6e2d7e12abfd5f3b66b7192bbc8a5955a4fe9698332b0b03"
              depends_on:
                - "PL-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-08-result"
              id: "PL-08"
              optional: false
              required_inputs:
                - "PL-07-result"
            -
              contract_digest: "sha256:8574c537beb93a43306bae94b4f599163234e845986b5b929029eafe615e4789"
              depends_on:
                - "PL-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-09-result"
              id: "PL-09"
              optional: false
              required_inputs:
                - "PL-08-result"
            -
              contract_digest: "sha256:5425b463d43d673dac45d163b91f06598ecb7c74832a3685055a78bbd1496ad1"
              depends_on:
                - "PL-09"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "schema"
                  - "dependencies"
                  - "ci"
                  - "public_api"
                resources: []
                scope_roots:
                  - "scripts"
                  - "packages"
                  - "schemas"
                  - "bun.lock"
                  - "package.json"
              expected_outputs:
                - "PL-10-result"
              id: "PL-10"
              optional: false
              required_inputs:
                - "PL-09-result"
            -
              contract_digest: "sha256:8ea496d53353b67e8e02b0351bc001c16de543bf4a5613cd4389ca3a21787756"
              depends_on:
                - "PL-10"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "scripts/bench"
                  - "scripts/checks"
                  - "docs/releases"
              expected_outputs:
                - "PL-11-result"
              id: "PL-11"
              optional: false
              required_inputs:
                - "PL-10-result"
            -
              contract_digest: "sha256:bb8cc0702a5e2b8d8dc26a375b6fc147297c72149c3eaf036cb66a219a3ccef6"
              depends_on:
                - "PL-11"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "docs"
                  - "scripts"
                  - "packages/agentplane/src"
                  - "schemas"
              expected_outputs:
                - "PL-12-result"
              id: "PL-12"
              optional: false
              required_inputs:
                - "PL-11-result"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:d06a5605725c9a955fa8418a6ca60a47a1a298c6d124e1de2365f86b9f3eb13b"
          digest: "sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:eec5695823181a8694b1bcf5cb1e6139f0cd852bc0e673e51c5b3c05cc8971cc"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "dependencies"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "scripts/checks"
                  - "bun.lock"
              expected_outputs:
                - "PL-01-result"
              id: "PL-01"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:8a3f299f467e292ea719936565f0a9ab891c1d65a1fdbbb30fd4e5c9a970a91b"
              depends_on:
                - "PL-01"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/runner/usecases"
              expected_outputs:
                - "PL-02-result"
              id: "PL-02"
              optional: false
              required_inputs:
                - "PL-01-result"
            -
              contract_digest: "sha256:5c162df37252a2ac6b1354121f6091b207d4c091113cce632be41261f62af144"
              depends_on:
                - "PL-02"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-03-result"
              id: "PL-03"
              optional: false
              required_inputs:
                - "PL-02-result"
            -
              contract_digest: "sha256:27cd69a5f2f0fcbc276def77db84344075a09c7c5d805be65a104222f540a7a8"
              depends_on:
                - "PL-03"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/tasks"
                  - "scripts/checks"
              expected_outputs:
                - "PL-04-result"
              id: "PL-04"
              optional: false
              required_inputs:
                - "PL-03-result"
            -
              contract_digest: "sha256:eef019a80e7dcfc1201b8ac42fe36ccca08031f8d28d01c11f4e1e07483f2c2f"
              depends_on:
                - "PL-04"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-05-result"
              id: "PL-05"
              optional: false
              required_inputs:
                - "PL-04-result"
            -
              contract_digest: "sha256:3276fcabf6138471d8bfb4912b0a484cd0fb772637e3feafac359f25eae18ebf"
              depends_on:
                - "PL-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-06-result"
              id: "PL-06"
              optional: false
              required_inputs:
                - "PL-05-result"
            -
              contract_digest: "sha256:80f4804b019d568d46f26c25aea2f4c506fb077481e68ee49e1e89ca2d02dbf0"
              depends_on:
                - "PL-06"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "schema"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                  - "packages/core/src/schemas"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "PL-07-result"
              id: "PL-07"
              optional: false
              required_inputs:
                - "PL-06-result"
            -
              contract_digest: "sha256:076bd88a98adc68c6e2d7e12abfd5f3b66b7192bbc8a5955a4fe9698332b0b03"
              depends_on:
                - "PL-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-08-result"
              id: "PL-08"
              optional: false
              required_inputs:
                - "PL-07-result"
            -
              contract_digest: "sha256:8574c537beb93a43306bae94b4f599163234e845986b5b929029eafe615e4789"
              depends_on:
                - "PL-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-09-result"
              id: "PL-09"
              optional: false
              required_inputs:
                - "PL-08-result"
            -
              contract_digest: "sha256:5425b463d43d673dac45d163b91f06598ecb7c74832a3685055a78bbd1496ad1"
              depends_on:
                - "PL-09"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "schema"
                  - "dependencies"
                  - "ci"
                  - "public_api"
                resources: []
                scope_roots:
                  - "scripts"
                  - "packages"
                  - "schemas"
                  - "bun.lock"
                  - "package.json"
              expected_outputs:
                - "PL-10-result"
              id: "PL-10"
              optional: false
              required_inputs:
                - "PL-09-result"
            -
              contract_digest: "sha256:8ea496d53353b67e8e02b0351bc001c16de543bf4a5613cd4389ca3a21787756"
              depends_on:
                - "PL-10"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "scripts/bench"
                  - "scripts/checks"
                  - "docs/releases"
              expected_outputs:
                - "PL-11-result"
              id: "PL-11"
              optional: false
              required_inputs:
                - "PL-10-result"
            -
              contract_digest: "sha256:bb8cc0702a5e2b8d8dc26a375b6fc147297c72149c3eaf036cb66a219a3ccef6"
              depends_on:
                - "PL-11"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "docs"
                  - "scripts"
                  - "packages/agentplane/src"
                  - "schemas"
              expected_outputs:
                - "PL-12-result"
              id: "PL-12"
              optional: false
              required_inputs:
                - "PL-11-result"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:bc3f6c18d2362d341a13b8ad2153a8c7b38e60301e415f22b1ce9ba7aef93088"
          digest: "sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9"
          revision: 3
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:eec5695823181a8694b1bcf5cb1e6139f0cd852bc0e673e51c5b3c05cc8971cc"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "dependencies"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "scripts/checks"
                  - "bun.lock"
              expected_outputs:
                - "PL-01-result"
              id: "PL-01"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:8a3f299f467e292ea719936565f0a9ab891c1d65a1fdbbb30fd4e5c9a970a91b"
              depends_on:
                - "PL-01"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/runner/usecases"
              expected_outputs:
                - "PL-02-result"
              id: "PL-02"
              optional: false
              required_inputs:
                - "PL-01-result"
            -
              contract_digest: "sha256:5c162df37252a2ac6b1354121f6091b207d4c091113cce632be41261f62af144"
              depends_on:
                - "PL-02"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-03-result"
              id: "PL-03"
              optional: false
              required_inputs:
                - "PL-02-result"
            -
              contract_digest: "sha256:27cd69a5f2f0fcbc276def77db84344075a09c7c5d805be65a104222f540a7a8"
              depends_on:
                - "PL-03"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/tasks"
                  - "scripts/checks"
              expected_outputs:
                - "PL-04-result"
              id: "PL-04"
              optional: false
              required_inputs:
                - "PL-03-result"
            -
              contract_digest: "sha256:eef019a80e7dcfc1201b8ac42fe36ccca08031f8d28d01c11f4e1e07483f2c2f"
              depends_on:
                - "PL-04"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
                  - "packages/agentplane/src/commands/branch"
              expected_outputs:
                - "PL-05-result"
              id: "PL-05"
              optional: false
              required_inputs:
                - "PL-04-result"
            -
              contract_digest: "sha256:3276fcabf6138471d8bfb4912b0a484cd0fb772637e3feafac359f25eae18ebf"
              depends_on:
                - "PL-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-06-result"
              id: "PL-06"
              optional: false
              required_inputs:
                - "PL-05-result"
            -
              contract_digest: "sha256:80f4804b019d568d46f26c25aea2f4c506fb077481e68ee49e1e89ca2d02dbf0"
              depends_on:
                - "PL-06"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "schema"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                  - "packages/core/src/schemas"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "PL-07-result"
              id: "PL-07"
              optional: false
              required_inputs:
                - "PL-06-result"
            -
              contract_digest: "sha256:076bd88a98adc68c6e2d7e12abfd5f3b66b7192bbc8a5955a4fe9698332b0b03"
              depends_on:
                - "PL-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-08-result"
              id: "PL-08"
              optional: false
              required_inputs:
                - "PL-07-result"
            -
              contract_digest: "sha256:8574c537beb93a43306bae94b4f599163234e845986b5b929029eafe615e4789"
              depends_on:
                - "PL-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/cli"
                  - "scripts/checks"
              expected_outputs:
                - "PL-09-result"
              id: "PL-09"
              optional: false
              required_inputs:
                - "PL-08-result"
            -
              contract_digest: "sha256:5425b463d43d673dac45d163b91f06598ecb7c74832a3685055a78bbd1496ad1"
              depends_on:
                - "PL-09"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                  - "schema"
                  - "dependencies"
                  - "ci"
                  - "public_api"
                resources: []
                scope_roots:
                  - "scripts"
                  - "packages"
                  - "schemas"
                  - "bun.lock"
                  - "package.json"
              expected_outputs:
                - "PL-10-result"
              id: "PL-10"
              optional: false
              required_inputs:
                - "PL-09-result"
            -
              contract_digest: "sha256:8ea496d53353b67e8e02b0351bc001c16de543bf4a5613cd4389ca3a21787756"
              depends_on:
                - "PL-10"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "scripts/bench"
                  - "scripts/checks"
                  - "docs/releases"
              expected_outputs:
                - "PL-11-result"
              id: "PL-11"
              optional: false
              required_inputs:
                - "PL-10-result"
            -
              contract_digest: "sha256:bb8cc0702a5e2b8d8dc26a375b6fc147297c72149c3eaf036cb66a219a3ccef6"
              depends_on:
                - "PL-11"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources: []
                scope_roots:
                  - "docs"
                  - "scripts"
                  - "packages/agentplane/src"
                  - "schemas"
              expected_outputs:
                - "PL-12-result"
              id: "PL-12"
              optional: false
              required_inputs:
                - "PL-11-result"
      revision: 106
      schema_version: 1
      state: "ACTIVE"
      work_items:
        PL-01:
          attempt: 1
          claim_id: "sha256:41ae6a1238b027c6815d1059495591520498f5ced09769e804833f98e63070c9"
          definition:
            contract_digest: "sha256:eec5695823181a8694b1bcf5cb1e6139f0cd852bc0e673e51c5b3c05cc8971cc"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "dependencies"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "scripts/checks"
                - "bun.lock"
            expected_outputs:
              - "PL-01-result"
            id: "PL-01"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:3831fad8dc7b49c21fabe9fd9ad85128bbff923c5cb63b1dc4ee9671222d20c0"
              id: "PL-01-result"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-01"
          result_digest: "sha256:37702080659894877646a3bb7486686d793c276a5fbd76a1c411f28ec87364bc"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:9b0497b068f2111f4215b4c849117d2b4112bc66a69478a6fa59084a83618eab"
              - "sha256:cb105c4202fc81fa9f44343c4ba3b20a831cd6e4d32fd69a8cc02acd958377d5"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:1ca85461e22ca3a029354c1766e986e5c265fe441fc79509b12dee04078906c8"
              environment_digest: "sha256:6d4826389298b7dab11c1b1d62868192023dd904c84f4ab4fb92b4063e7dac19"
              implementation_identity: "sha256:37702080659894877646a3bb7486686d793c276a5fbd76a1c411f28ec87364bc"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-27T19:18:02.576Z"
            status: "PASSED"
        PL-02:
          attempt: 2
          claim_id: "sha256:10692c432bb7a7769352d75c8a94c423b453264fd00f7e47d9f62993607f47dc"
          definition:
            contract_digest: "sha256:8a3f299f467e292ea719936565f0a9ab891c1d65a1fdbbb30fd4e5c9a970a91b"
            depends_on:
              - "PL-01"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
                - "packages/core/src/runner"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/runner/usecases"
            expected_outputs:
              - "PL-02-result"
            id: "PL-02"
            optional: false
            required_inputs:
              - "PL-01-result"
          output_manifests:
            -
              attempt: 2
              digest: "sha256:4acf65475af42f782bb0d21703edfe19f70d24a109865c8ccbf5a1de80fb39c6"
              id: "PL-02-result"
              kind: "source"
              plan_revision: 2
              repository_fingerprint: "sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-02"
          result_digest: "sha256:f873d2ee5040d8bbb3b0a6db0d6c24fb949b2d9b473cc831ae3c80c9ecbb805b"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:61a847884e48ebfb3da37ae203f321aaa93f7d93abadba15a95a93871c8aba4e"
              - "sha256:7b06cedd7089e3107fcb05929ed0b8777cca4ac1aaef050e801ffaae6bf64bb2"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:b1ee8090495e84b343c59ef3064da7c4fcccfa6da82aa5c777a243f82e3a31d3"
              environment_digest: "sha256:97252057cfc9a1e78b1113080ebb3445a7835456ad79f5fb53a0ac535d37218a"
              implementation_identity: "sha256:f873d2ee5040d8bbb3b0a6db0d6c24fb949b2d9b473cc831ae3c80c9ecbb805b"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T07:51:33.964Z"
            status: "PASSED"
        PL-03:
          attempt: 1
          claim_id: "sha256:ad05a94321299d1fa9e720bf729a4da5f81d1e8d4a507f01a5af968ec49983f0"
          definition:
            contract_digest: "sha256:5c162df37252a2ac6b1354121f6091b207d4c091113cce632be41261f62af144"
            depends_on:
              - "PL-02"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-03-result"
            id: "PL-03"
            optional: false
            required_inputs:
              - "PL-02-result"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:cf20ae29efffaa1824b0d416a6d7c9782058b497366ae73af858c2f073b4c52b"
              id: "PL-03-result"
              kind: "source"
              plan_revision: 2
              repository_fingerprint: "sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-03"
          result_digest: "sha256:c3cd5aff2c8c97dd3caf4e354675870b6069a689efb9e738a6238260c1fb2d3b"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:7de5a3b6e842ccdb419c9ef3f6a079b9f4d68d7ef4e4939b339b1744012d1f45"
              - "sha256:7f6efd181e05d41cbb10e1aef7c064173a0c5c3fc51729c9030535ce1f6e87c3"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:e497042b8b11c226d4c4c41f00127e09e63bb15137a7b73f124414c7d14c6136"
              environment_digest: "sha256:c6dca0d766c412fc8502759c0e3441326f7d1d1b9a6be0fa4e14b09102f0aec5"
              implementation_identity: "sha256:c3cd5aff2c8c97dd3caf4e354675870b6069a689efb9e738a6238260c1fb2d3b"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T08:13:07.171Z"
            status: "PASSED"
        PL-04:
          attempt: 1
          claim_id: "sha256:35b0a4fedc92d8d7dcb92cd1d223cfcb6db3d5575e7cf4616b6589def1319b1b"
          definition:
            contract_digest: "sha256:27cd69a5f2f0fcbc276def77db84344075a09c7c5d805be65a104222f540a7a8"
            depends_on:
              - "PL-03"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/core/src/tasks"
                - "scripts/checks"
            expected_outputs:
              - "PL-04-result"
            id: "PL-04"
            optional: false
            required_inputs:
              - "PL-03-result"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:183fe78893f9e4604935fdd3cfb2e9079f18034fefa31c2d486e3227e9679253"
              id: "PL-04-result"
              kind: "source"
              plan_revision: 2
              repository_fingerprint: "sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-04"
          result_digest: "sha256:8daf8d2046333338b223df7348a2dc2ee1e5b97725d7a58abcd5e8048bea7e6c"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:62b2f17c4341f7735e70bd86ef9b104efa28cbfb162724a40bcaa492fe378e03"
              - "sha256:ee90c796badd7bb49558eb05a65786a609192103a6e9282d4e4b1f0f3d43e536"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:09893a7dd04dee787801bee257be9d296dea8751f08c2e8413a84b5da55e8653"
              environment_digest: "sha256:822497817ed25f0d8910af1e9ba59e382b60a99519f45b30eae7d5082ab7eee5"
              implementation_identity: "sha256:8daf8d2046333338b223df7348a2dc2ee1e5b97725d7a58abcd5e8048bea7e6c"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T08:19:37.829Z"
            status: "PASSED"
        PL-05:
          attempt: 2
          claim_id: "sha256:9664a53997ace14bfe9c605e58ab4430161c7ef095a34375cb87de136e9750ac"
          definition:
            contract_digest: "sha256:eef019a80e7dcfc1201b8ac42fe36ccca08031f8d28d01c11f4e1e07483f2c2f"
            depends_on:
              - "PL-04"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
                - "packages/agentplane/src/commands/branch"
            expected_outputs:
              - "PL-05-result"
            id: "PL-05"
            optional: false
            required_inputs:
              - "PL-04-result"
          output_manifests:
            -
              attempt: 2
              digest: "sha256:072d2374bbf45acb0f56b8a5343f2ed928ab9d33177b67eb915ff251ce4aadd7"
              id: "PL-05-result"
              kind: "source"
              plan_revision: 3
              repository_fingerprint: "sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-05"
          result_digest: "sha256:281f3b68110e9103e18eb801c9691dbb1e7bed2db5e661cfcacf693c4772acd5"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:cbe7e7b2e5783b41edbb454f1b6d33cf0300f047e7ff6af0a7a72d440fa22809"
              - "sha256:23731c224d43dc495cc7fd016512970daa9f5228827e9db89a398c08b1db808d"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:f303af69b7ffc8aac96db6d0b8d6c30dee01a920f968f8a7c3a3bcc3711ccaeb"
              environment_digest: "sha256:44d8becf29a528bea2c14252528b4ec819f720014a851d3699523cac772c9895"
              implementation_identity: "sha256:281f3b68110e9103e18eb801c9691dbb1e7bed2db5e661cfcacf693c4772acd5"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T08:39:57.135Z"
            status: "PASSED"
        PL-06:
          attempt: 1
          claim_id: "sha256:8f625da592f4ccee52881592d7d78e40b202289e10208766cfd8f600fd70901a"
          definition:
            contract_digest: "sha256:3276fcabf6138471d8bfb4912b0a484cd0fb772637e3feafac359f25eae18ebf"
            depends_on:
              - "PL-05"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/core/src/runner"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-06-result"
            id: "PL-06"
            optional: false
            required_inputs:
              - "PL-05-result"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:32ce18c68ebb398a65cb499738a363a714bfcacae5f304b919b2b00b2b1b0ca3"
              id: "PL-06-result"
              kind: "source"
              plan_revision: 3
              repository_fingerprint: "sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-06"
          result_digest: "sha256:da2fd3f1994cbfa3a13ca3c5a3d7a7c5f814d1f4e41829fbfaac58a2238b03e6"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:37a488f0bf78bbc51d2f74d393d8a7e400eb9d6f22cc641a917e867faf8bcb6a"
              - "sha256:2b80733848490fecf3efbf2437a52452bd8a2f1f518dd0a10e8fcdd07b7d58ec"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:4b55840d2d46eb5c4853d4984bb7ce3284ef6bcfd6e807b2cc9c527288783403"
              environment_digest: "sha256:b0cac46dad83dbc7c5046f777806176da589fabf129f3649f0fee8c17cb66147"
              implementation_identity: "sha256:da2fd3f1994cbfa3a13ca3c5a3d7a7c5f814d1f4e41829fbfaac58a2238b03e6"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T08:47:11.200Z"
            status: "PASSED"
        PL-07:
          attempt: 2
          claim_id: "sha256:8b085b30e21d6155641a427ac3befbbb84ed7cc6c57d2bcedc652d2b488e5dac"
          definition:
            contract_digest: "sha256:80f4804b019d568d46f26c25aea2f4c506fb077481e68ee49e1e89ca2d02dbf0"
            depends_on:
              - "PL-06"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "schema"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/schemas"
                - "schemas"
                - "scripts/checks"
                - "packages/agentplane/src/commands/acr"
            expected_outputs:
              - "PL-07-result"
            id: "PL-07"
            optional: false
            required_inputs:
              - "PL-06-result"
          output_manifests:
            -
              attempt: 2
              digest: "sha256:6b243f82c6d49366fe93f2bb234e4c10f9690184b227e4993bbe377e9e0b4003"
              id: "PL-07-result"
              kind: "source"
              plan_revision: 4
              repository_fingerprint: "sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-07"
          result_digest: "sha256:a9801eca92b29da7c6582b16e3c030bf5609557c9305e7dc1affe30bf6704f13"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:68d1635c9c9ef8df3cdde969d703150e18c479f56cdac472fb797732570993aa"
              - "sha256:9cfca011cacae8a5e8e56a4bdd3465065ca6bb45b70defc4570036aa22f9ad64"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:f01109c2ee16d8e89d87756d218a9605a267ccf01b78bd717f6ecb9b8b7e9e8f"
              environment_digest: "sha256:899ab325271c609b74f004bb9bea86cd990cda70e097127242043579fcbc1495"
              implementation_identity: "sha256:a9801eca92b29da7c6582b16e3c030bf5609557c9305e7dc1affe30bf6704f13"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-09-28T09:20:10.651Z"
            status: "PASSED"
        PL-08:
          attempt: 1
          claim_id: "sha256:edc86553e28d761190a841b258b19f21fa0f1d080034e6780dece514c5aafb8c"
          definition:
            contract_digest: "sha256:076bd88a98adc68c6e2d7e12abfd5f3b66b7192bbc8a5955a4fe9698332b0b03"
            depends_on:
              - "PL-07"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/core/src/runner"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-08-result"
            id: "PL-08"
            optional: false
            required_inputs:
              - "PL-07-result"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:26a0c78b70b88c5b8c1805d45215416e6e82884b1188c3b63a728bd6297598cb"
              id: "PL-08-result"
              kind: "source"
              plan_revision: 4
              repository_fingerprint: "sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-08"
          result_digest: "sha256:6524e2b552a6f1dd0f2daefc4866073037f956583de9a53e02f407e508422999"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:0b7137da75b03dee50ca61ee943b50716acfedff58e507d4d743c4264b601406"
              - "sha256:bb05a3e404401f4ef0cf6d87c728b80c6ce0a2bb0c2d5662bc19caff09279480"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:4b55840d2d46eb5c4853d4984bb7ce3284ef6bcfd6e807b2cc9c527288783403"
              environment_digest: "sha256:ff60ad55ee6bdba2868fe783238d24329ed4f9ff8ed0af10213dd3bfcf24808e"
              implementation_identity: "sha256:6524e2b552a6f1dd0f2daefc4866073037f956583de9a53e02f407e508422999"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T09:30:52.808Z"
            status: "PASSED"
        PL-09:
          attempt: 1
          claim_id: "sha256:2ba1913e4f8a8760e9039cce0914723d7c0dba10d65656cfab4c4303d6c29646"
          definition:
            contract_digest: "sha256:8574c537beb93a43306bae94b4f599163234e845986b5b929029eafe615e4789"
            depends_on:
              - "PL-08"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/core/src/tasks"
                - "packages/agentplane/src/cli"
                - "scripts/checks"
            expected_outputs:
              - "PL-09-result"
            id: "PL-09"
            optional: false
            required_inputs:
              - "PL-08-result"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:1f49d8d6ee5ad56a455843bcbaf8451b0c176d32b5527168a263bea37bd82b3e"
              id: "PL-09-result"
              kind: "source"
              plan_revision: 4
              repository_fingerprint: "sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-09"
          result_digest: "sha256:1328ced7d37e4c9889eeb09e279c214a864e95fcd3fd650af875851ab43a09c3"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ab6cd0922fd538191003f9f4f49695716081074a2946d87d7e42b3364d00f9e9"
              - "sha256:c7de28b5b85fd47f96a017060f79b45597c4bc3132109ad036b2ec607c273001"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:09a2dfa9b8bcf629766eb4c4c17f1fece32628849a9b71bde42b05aa166fa9db"
              environment_digest: "sha256:6bee37b8afe0055b87e68d35e9dc14576d809ef8c86d6b3d625b0c84f4b471b0"
              implementation_identity: "sha256:1328ced7d37e4c9889eeb09e279c214a864e95fcd3fd650af875851ab43a09c3"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T09:38:17.640Z"
            status: "PASSED"
        PL-10:
          attempt: 1
          claim_id: "sha256:45a761584a6dc2d49a34dd1efd3111a0d3378ce8eed8febdeb4d8a507091e0a4"
          definition:
            contract_digest: "sha256:5425b463d43d673dac45d163b91f06598ecb7c74832a3685055a78bbd1496ad1"
            depends_on:
              - "PL-09"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "schema"
                - "dependencies"
                - "ci"
                - "public_api"
              resources: []
              scope_roots:
                - "scripts"
                - "packages"
                - "schemas"
                - "bun.lock"
                - "package.json"
            expected_outputs:
              - "PL-10-result"
            id: "PL-10"
            optional: false
            required_inputs:
              - "PL-09-result"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:da1430971559329e6359b279a0e0b086e7eca08457b9e0cd1183a21fa91bd7ad"
              id: "PL-10-result"
              kind: "source"
              plan_revision: 4
              repository_fingerprint: "sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-10"
          result_digest: "sha256:345bf7f337d9ded15b0ad5cc9c3431e2f61e1c6d1a2a17b115607a758a7be09f"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:cf8013636c666aa4388a92e51893c1cb7329c9dd59b11e563c0056c18250c3be"
              - "sha256:ed5392c509474612ae96f69ea0455b73e183443a4e6e0917aa60ccc31fdc8cae"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:c79380896944045a011adbe23ad94c037b6efa0bac6c613e496aade3679e4375"
              environment_digest: "sha256:5596b3c87a4896a8e9e04cb86eea0b2d4c1ab5b2d0a1fb866ea3932c5d9038b7"
              implementation_identity: "sha256:345bf7f337d9ded15b0ad5cc9c3431e2f61e1c6d1a2a17b115607a758a7be09f"
              toolchain_digest: "sha256:ae9b1f430f69f8222cf51f0882e83f5a81914ade7b73607adb8b06158650d837"
            observed_at: "2026-09-28T10:05:29.387Z"
            status: "PASSED"
        PL-11:
          attempt: 1
          claim_id: "sha256:3de7053a52396ae50112723d35ce34f304323748b69d0124c3f6de65a52078a3"
          definition:
            contract_digest: "sha256:8ea496d53353b67e8e02b0351bc001c16de543bf4a5613cd4389ca3a21787756"
            depends_on:
              - "PL-10"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "scripts/bench"
                - "scripts/checks"
                - "docs/releases"
            expected_outputs:
              - "PL-11-result"
            id: "PL-11"
            optional: false
            required_inputs:
              - "PL-10-result"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:a9d65a52cbd456b442b2c8e6bc466cc7e6b34e19d94196e0a0f72e00fe550f12"
              id: "PL-11-result"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
              task_id: "202609261720-KKE9ZN"
              work_item_id: "PL-11"
          result_digest: "sha256:024032af533aadf0b335a70485b6dff610d29022c3b8dbe6a9a859012a228820"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:93a40a44fbf86885fa41ce10a40e7535cce4fd3611b66b7b8e8585f8e59bbc12"
              - "sha256:0233e18dcc80cef2f7a68dd9921482850c6e5a6b9ec791646b3b56661a4635b2"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:f7bb842c0fe894d6ae4ce665a2b4ad0013a2a6bd92926b06957899e238afbb04"
              environment_digest: "sha256:940b19103779c7bad246af75cb0cc17c2e0cf46323cfe9661f2694aedefbefe6"
              implementation_identity: "sha256:024032af533aadf0b335a70485b6dff610d29022c3b8dbe6a9a859012a228820"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-09-28T10:15:14.467Z"
            status: "PASSED"
        PL-12:
          attempt: 2
          claim_id: "sha256:dea6404dbd1c47b63cdced6a43fc5ce82f5fa0d429a6393315f4153ba9d3d16b"
          definition:
            contract_digest: "sha256:bb8cc0702a5e2b8d8dc26a375b6fc147297c72149c3eaf036cb66a219a3ccef6"
            depends_on:
              - "PL-11"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "docs"
                - "scripts"
                - "packages/agentplane/src"
                - "schemas"
            expected_outputs:
              - "PL-12-result"
            id: "PL-12"
            optional: false
            required_inputs:
              - "PL-11-result"
          output_manifests: []
          result_digest: null
          revision: 8
          state: "EXECUTING"
          validation: null
    digest: "sha256:d10acc00d1af7273f88ab6a42aac94b151734cd89c2a71b0c1423465d28afa54"
    documents:
      contracts:
        sha256:076bd88a98adc68c6e2d7e12abfd5f3b66b7192bbc8a5955a4fe9698332b0b03:
          acceptance_criteria:
            - "Managed initial planning uses the same Kernel-bound adapter and issues exactly one required semantic episode."
            - "Accepted Plan survives infrastructure retry and stops at required approval before source mutation."
            - "An adapter without read-only/output capabilities is rejected before paid launch; external advance remains supported."
          objective: "PL-08: Execute required read-only planning through the managed adapter. Follow agentplane-roadmap-r2/tasks/PL-08.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/run"
            - "bun run typecheck"
        sha256:27cd69a5f2f0fcbc276def77db84344075a09c7c5d805be65a104222f540a7a8:
          acceptance_criteria:
            - "Bind approval to exact normalized Plan and authority through existing receipts."
            - "No caller origin field can self-approve or transfer approval to changed scope/effects."
            - "Policy-required approval blocks implementation and material drift invalidates stale approval."
          objective: "PL-04: Preserve approval and caller-supplied provenance for planning reuse. Follow agentplane-roadmap-r2/tasks/PL-04.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/kernel-plan"
            - "bun run typecheck"
        sha256:3276fcabf6138471d8bfb4912b0a484cd0fb772637e3feafac359f25eae18ebf:
          acceptance_criteria:
            - "Equal formal inputs yield equal planning obligations in managed and external transports."
            - "Reuse common coordinator and approval rules; add no selector model call."
            - "Transport capability failures cannot be classified as semantic completeness."
          objective: "PL-06: Apply the same planning decision to managed execution. Follow agentplane-roadmap-r2/tasks/PL-06.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/run"
            - "bun run typecheck"
        sha256:5425b463d43d673dac45d163b91f06598ecb7c74832a3685055a78bbd1496ad1:
          acceptance_criteria:
            - "Installed sufficient, insufficient, critical-policy, managed/external, drift and recovery fixtures pass with nonzero test discovery."
            - "One Kernel owner, one Plan schema, genuine provenance and unchanged EVALUATOR floors remain."
            - "Register new critical regressions in existing suite and preserve old-record compatibility."
          objective: "PL-10: Qualify the installed optional-planning package and retained safety floors. Follow agentplane-roadmap-r2/tasks/PL-10.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run package:tarball:check"
            - "bun run package:install-smoke"
            - "bun run test:release:critical"
            - "bun run typecheck"
            - "bun run schemas:check"
        sha256:5c162df37252a2ac6b1354121f6091b207d4c091113cce632be41261f62af144:
          acceptance_criteria:
            - "Complete supplied input creates a reviewable Kernel Plan and reaches normal approval without a fake PLANNER result."
            - "One-item plans require actual criteria, output and verification contracts."
            - "Unresolved semantic choices fall back to PLANNER. Keep one proposal implementation."
          objective: "PL-03: Materialize supplied Plans through the existing Kernel command path. Follow agentplane-roadmap-r2/tasks/PL-03.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task"
            - "bun run typecheck"
        sha256:80f4804b019d568d46f26c25aea2f4c506fb077481e68ee49e1e89ca2d02dbf0:
          acceptance_criteria:
            - "Task and ACR views distinguish not_required, passed, failed and missing planning."
            - "Preserve actual attempts and caller-supplied origin using existing accepted state and receipts."
            - "Repeated status/explain produces no canonical writes; retain old-record interpretation."
          objective: "PL-07: Render planning provenance and actual episode outcomes honestly. Follow agentplane-roadmap-r2/tasks/PL-07.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task"
            - "bun run schemas:check"
            - "bun run typecheck"
        sha256:8574c537beb93a43306bae94b4f599163234e845986b5b929029eafe615e4789:
          acceptance_criteria:
            - "New material effects stop before execution and request only missing planning or approval."
            - "Preserve accepted outputs when safe; reject wrong and stale results."
            - "Infrastructure retry never fabricates a new planner; model self-reclassification cannot waive mandatory planning."
          objective: "PL-09: Preserve escalation and accepted work during planning recovery. Follow agentplane-roadmap-r2/tasks/PL-09.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project core --maxWorkers=1 packages/core/src/tasks/task-kernel"
            - "bun run typecheck"
        sha256:8a3f299f467e292ea719936565f0a9ab891c1d65a1fdbbb30fd4e5c9a970a91b:
          acceptance_criteria:
            - "Reuse TaskPlanProposal V2 and existing full normalizer with current supervisor-owned baseline."
            - "Reject forged authority and canonical state before mutation; return precise invalid-field diagnostics."
            - "Incomplete semantic input requests normal planning."
          objective: "PL-02: Accept existing compact and full Plan proposals at intake and refinement. Follow agentplane-roadmap-r2/tasks/PL-02.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/create"
            - "bun run typecheck"
        sha256:8ea496d53353b67e8e02b0351bc001c16de543bf4a5613cd4389ca3a21787756:
          acceptance_criteria:
            - "Pin exact candidate and campaign inputs; compare supplied-plan and managed-bridge strata separately with equal final oracle and review."
            - "Retain every assigned attempt and include host construction and retry costs or label them unknown."
            - "Report first-mutation and verified-result latency; insufficient evidence yields NOT ESTABLISHED and no efficiency claim. Do not treat missing provider access as passed qualification."
          objective: "PL-11: Measure M04 planning paths with complete host accounting. Follow agentplane-roadmap-r2/tasks/PL-11.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run bench:agent-efficiency:check"
            - "bun run bench:agent-efficiency:replay:check"
        sha256:bb8cc0702a5e2b8d8dc26a375b6fc147297c72149c3eaf036cb66a219a3ccef6:
          acceptance_criteria:
            - "Document compact input, approval, fallback, managed read-only planning and required independent review."
            - "Examples never fabricate USER authority and claims match PL-11 evidence."
            - "Document compatibility and measurement limits and provide release handoff with exact remaining gates; no 0.7.13 or 0.7.14 behavior."
          objective: "PL-12: Document qualified 0.7.12 behavior and release evidence. Follow agentplane-roadmap-r2/tasks/PL-12.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run docs:bootstrap:check"
            - "bun run docs:onboarding:check"
            - "bun run docs:cli:check"
            - "bun run typecheck"
        sha256:eec5695823181a8694b1bcf5cb1e6139f0cd852bc0e673e51c5b3c05cc8971cc:
          acceptance_criteria:
            - "Pure resolver works with absent and accepted Plans and separates obligation, attempted outcome and evidence freshness."
            - "Trusted policy owns mandatory planning; model flags, titles and tags cannot waive it. Required failed planning never means satisfied."
            - "Preserve review floors and one Kernel owner. Reconcile bootstrap workspace versions without dependency upgrades."
          objective: "PL-01: Separate formal planning obligations from semantic Plan judgment. Follow agentplane-roadmap-r2/tasks/PL-01.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project core --maxWorkers=1 packages/core/src/tasks/task-centric"
            - "bun run typecheck"
        sha256:eef019a80e7dcfc1201b8ac42fe36ccca08031f8d28d01c11f4e1e07483f2c2f:
          acceptance_criteria:
            - "Qualified accepted supplied Plan requires zero separate PLANNER dispatches."
            - "Insufficient or policy-required input issues normal planning or focused clarification."
            - "Required EVALUATOR and negative authority cases are unchanged."
          objective: "PL-05: Enable sufficient-Plan reuse in external advance. Follow agentplane-roadmap-r2/tasks/PL-05.md, I01-I12 and C01-C08. Inspect current consumers and use equivalent existing tests with nonzero discovery. Preserve one Kernel and common coordinator."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-advance"
            - "bun run typecheck"
      intent:
        context: "User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14."
        objective: "Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12"
    events:
      -
        command_digest: "sha256:db80e44dc03ebedb557a4bff84882bbf822b1d8b2662d2b7259e2babd705742f"
        id: "capture:202609261720-KKE9ZN:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609261720-KKE9ZN"
        occurred_at: "2026-09-26T17:20:51.622Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609261720-KKE9ZN"
        task_revision: 1
      -
        command_digest: "sha256:39f78f8e4a04c946e6963aee378dbebabddb2d98619684c40b73fbd97c42814f"
        id: "result:sha256:751a43ec0baffbfe76dcefdec903be54f17ec985830a4acfcc268b22b747018a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:751a43ec0baffbfe76dcefdec903be54f17ec985830a4acfcc268b22b747018a"
        occurred_at: "2026-09-26T17:23:02.867Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609261720-KKE9ZN"
        task_revision: 2
      -
        command_digest: "sha256:f3eac96d5bd4a63d90ab523eae9cce9a5e6fb405e14e099b3e5bc94c45bb69de"
        id: "sha256:a2d5b4f1395bf5e821d7f7186ededc991db826a8352a56661d387998d1cd7155:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a2d5b4f1395bf5e821d7f7186ededc991db826a8352a56661d387998d1cd7155"
        occurred_at: "2026-09-26T17:23:36.218Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609261720-KKE9ZN"
        task_revision: 3
      -
        command_digest: "sha256:351b7abcea85256f404984227c1c6c2fc572510053ac13f176c03ac4c4272f68"
        id: "kernel_work_item_materialization_required:sha256:40146b02fd43109a5a07bf042b5175eea1621571256361248f8f810e893c798d:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:40146b02fd43109a5a07bf042b5175eea1621571256361248f8f810e893c798d:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        occurred_at: "2026-09-26T17:23:50.638Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609261720-KKE9ZN"
        task_revision: 4
      -
        command_digest: "sha256:778222a95c211e2a92661098436b9b75f3f463e6dd68bbd54f76f25d3de8fba5"
        id: "kernel_work_item_claim_required:sha256:fdf67a19a6a690daedba8efc44982df1eaae4cb16c2a92a6abcb45e39bfbb2bd:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:fdf67a19a6a690daedba8efc44982df1eaae4cb16c2a92a6abcb45e39bfbb2bd:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        occurred_at: "2026-09-26T17:24:03.353Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609261720-KKE9ZN"
        task_revision: 5
      -
        command_digest: "sha256:31fe4e1ae4444d8467f476038b4c132a7e57e16aacf876fe76bd9ee38707412e"
        id: "sha256:9f68218024b4d1f0d8a5a04ca69007d6cb2894903601b54bd2b33001b7a9b065:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:9f68218024b4d1f0d8a5a04ca69007d6cb2894903601b54bd2b33001b7a9b065"
        occurred_at: "2026-09-26T17:24:25.229Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202609261720-KKE9ZN"
        task_revision: 6
      -
        command_digest: "sha256:840d867fafca1b1b4b5ca00d932a2424e71e3be40b82f34f36fd9e7b6ce42af1"
        id: "kernel_work_item_execution_required:sha256:08eca2a2b79a725d911faeb79613dbdc307d64d01e24aced537da11b924e06cb:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:08eca2a2b79a725d911faeb79613dbdc307d64d01e24aced537da11b924e06cb:sha256:42e69f74fc5183b16bb4e0a4e7491e9c7bce3554f0f322b14a2991293e4d9b66"
        occurred_at: "2026-09-26T17:24:37.745Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609261720-KKE9ZN"
        task_revision: 7
      -
        command_digest: "sha256:035148dfb4e0fcf0bea510c2e6908a41b24f3a104cfd1cbb319d92aa2e986414"
        id: "sha256:75d6eca564b7f79167f58dd7a39d6a55dfd18b744497b2c5b0d5292ea16670fa:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:75d6eca564b7f79167f58dd7a39d6a55dfd18b744497b2c5b0d5292ea16670fa"
        occurred_at: "2026-09-27T19:12:12.796Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202609261720-KKE9ZN"
        task_revision: 8
      -
        command_digest: "sha256:3f0e05d1c2e71883be266722efe5dd4a9dda40e0d2053827dfc930a26b973ac6"
        id: "result:sha256:efa76a0b73d1b589c0a89a92ffdf29f06c3ee6d988081dd5c68b7eba9dff890b:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:efa76a0b73d1b589c0a89a92ffdf29f06c3ee6d988081dd5c68b7eba9dff890b"
        occurred_at: "2026-09-27T19:16:29.972Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202609261720-KKE9ZN"
        task_revision: 9
      -
        command_digest: "sha256:b4908cd9821fc6cad1c4ba960e46120fb8a2ae9f5612b84a102fbff7a695d4c5"
        id: "kernel_work_item_inspection_required:sha256:e94c8f9596f5dc05fdca8528bce9a357175ad36ccd258a91f652c5b5514e20e4:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e94c8f9596f5dc05fdca8528bce9a357175ad36ccd258a91f652c5b5514e20e4:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        occurred_at: "2026-09-27T19:16:42.645Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 10
      -
        command_digest: "sha256:e10cc34fb76caff22110ddc5b5474f65b323f61cb79cebab576106733f14911e"
        id: "validation:sha256:7f625388b8e806923003285eff068bcb7eae08190c42af02c1bfa5e76e028ae8:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7f625388b8e806923003285eff068bcb7eae08190c42af02c1bfa5e76e028ae8"
        occurred_at: "2026-09-27T19:18:11.982Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202609261720-KKE9ZN"
        task_revision: 11
      -
        command_digest: "sha256:da987d433167ce579a1dc3839b20d091717fa576d0be98bff0c2bdbe929ac987"
        id: "validation-resolution:sha256:29de504d5238ef6eedd15565cb1d0c9d3c2e4a516e53fd4beab514bd16b501a6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:29de504d5238ef6eedd15565cb1d0c9d3c2e4a516e53fd4beab514bd16b501a6"
        occurred_at: "2026-09-27T19:18:18.655Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609261720-KKE9ZN"
        task_revision: 12
      -
        command_digest: "sha256:46f22ac848931809dbe0e06277f271c2f1666c03f50576e694b3fb9763060731"
        id: "kernel_work_item_claim_required:sha256:6229976d5f3ce19dfa581259620b301e9c4f2300326bbc5fed57b70e9a0ab2d8:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6229976d5f3ce19dfa581259620b301e9c4f2300326bbc5fed57b70e9a0ab2d8:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        occurred_at: "2026-09-27T19:18:32.659Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609261720-KKE9ZN"
        task_revision: 13
      -
        command_digest: "sha256:cb6a2d0e992f05ec609c78c8b7b65826d72b1ed5139f277917d3f728831aa568"
        id: "kernel_work_item_execution_required:sha256:47a85912d8a061879f851c26e1978013445a87cb21821b044c3905470ccd9b5f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:47a85912d8a061879f851c26e1978013445a87cb21821b044c3905470ccd9b5f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        occurred_at: "2026-09-27T19:18:41.179Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609261720-KKE9ZN"
        task_revision: 14
      -
        command_digest: "sha256:1f76accacce364374477f43062970d15e98668789d3bd8223bb6079027bfb925"
        id: "semantic-stop:sha256:c580af9846789d53142c74c31d1cebcf0cb0be85e7e4d04dada414cdabc3b3f1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:c580af9846789d53142c74c31d1cebcf0cb0be85e7e4d04dada414cdabc3b3f1"
        occurred_at: "2026-09-28T07:34:27.608Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202609261720-KKE9ZN"
        task_revision: 15
      -
        command_digest: "sha256:92af5adbe504686349a16e3a5d4285abf85e5b197dc2d3ead7def71c344f169c"
        id: "amend:sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:8072381c52d796d00146ff2e788490f6952ab0116f09f2458ea34b4dcd83ce9f"
        occurred_at: "2026-09-28T07:38:00.421Z"
        payload_digest: "sha256:9231db6b3d548b7a69237db71e326862d2d68f2f69f130bb51082bb0d21eda6a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 16
      -
        command_digest: "sha256:c4c95bdb167d02b82e754d7762092ad377344e58d80ce43ff3c6d9cb179ed9d0"
        id: "sha256:732493cc903fd73b21ded5920458a2b9815212e6da709a8f31d2e6c0a0b2512c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:732493cc903fd73b21ded5920458a2b9815212e6da709a8f31d2e6c0a0b2512c"
        occurred_at: "2026-09-28T07:38:06.916Z"
        payload_digest: "sha256:7aed4e8983de7c3098093656db0d79cdcb238427d9745771a6217634a5d9c179"
        task_id: "202609261720-KKE9ZN"
        task_revision: 17
      -
        command_digest: "sha256:884d66d80f322057cfdb13640536d0d2ce7792b8f33d6c9f0ec3c0b743971ec7"
        id: "kernel_work_item_claim_required:sha256:6b4b4279fd6e196b291bebbc6c57dd8c5c01f507fa734b77ae03e9e93cf43f84:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6b4b4279fd6e196b291bebbc6c57dd8c5c01f507fa734b77ae03e9e93cf43f84:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        occurred_at: "2026-09-28T07:38:34.680Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 18
      -
        command_digest: "sha256:3b153374dc61cb0109fb2d87249163bf697764d4a190454a698a43c638e4087b"
        id: "kernel_work_item_execution_required:sha256:b1157f164281fa03bf5ef7bb283adda3ddd9c6901c2c1f268c4091aba639bd2f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b1157f164281fa03bf5ef7bb283adda3ddd9c6901c2c1f268c4091aba639bd2f:sha256:65f01ef7db0e0173b09b6e2a8bd0bd6c0b36b445dd894b1f83fcb83b43a10bd1"
        occurred_at: "2026-09-28T07:38:45.228Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609261720-KKE9ZN"
        task_revision: 19
      -
        command_digest: "sha256:95d7da35b5c76539f2132b2c1a832ed27ebfb1102f4d19895090097af5aafbb5"
        id: "sha256:4d7a042e5d793800d74fdf39cde997d85e65f1aa19e1702712a0c7636ae3a1e8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4d7a042e5d793800d74fdf39cde997d85e65f1aa19e1702712a0c7636ae3a1e8"
        occurred_at: "2026-09-28T07:49:45.140Z"
        payload_digest: "sha256:881eb1d3f48c5092189b9c51aa93913d574c5e9406e4b901513a8741256569d1"
        task_id: "202609261720-KKE9ZN"
        task_revision: 20
      -
        command_digest: "sha256:91ca7f7fc1321d29fc7418f293d7d64823fe83b9921141859b8aa2b3da9780b9"
        id: "result:sha256:e7c3503478f1b7ccee8db73a568b00ddde68f0f2ff2aa322c8b0c773133579ef:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e7c3503478f1b7ccee8db73a568b00ddde68f0f2ff2aa322c8b0c773133579ef"
        occurred_at: "2026-09-28T07:49:59.690Z"
        payload_digest: "sha256:8c0ad2130ccac964ae9f72771f7e3cd4a616ed065235f54a80cc7d680b91e030"
        task_id: "202609261720-KKE9ZN"
        task_revision: 21
      -
        command_digest: "sha256:71e5ff1a75461b4863175f58b82d66f90cef2324dcccc4f03782c000a572c27e"
        id: "kernel_work_item_inspection_required:sha256:080cf6b30c8c391dfc54a7337a32a96e303c086d115225755cdaec0a252c4467:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:080cf6b30c8c391dfc54a7337a32a96e303c086d115225755cdaec0a252c4467:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
        occurred_at: "2026-09-28T07:50:11.039Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202609261720-KKE9ZN"
        task_revision: 22
      -
        command_digest: "sha256:4c79442c48bb27681810b8821f61f52d9808c4407e8971f974d05285efbb3e48"
        id: "validation:sha256:f013c66da28b954f6c15b7fc6331cbf396edfcbab4ff0de88f165ea1ee623366:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f013c66da28b954f6c15b7fc6331cbf396edfcbab4ff0de88f165ea1ee623366"
        occurred_at: "2026-09-28T07:51:44.235Z"
        payload_digest: "sha256:39790cc57a85d6ffe3c527b2a378fae95a288e42bddcf145e2d420d3e31dc034"
        task_id: "202609261720-KKE9ZN"
        task_revision: 23
      -
        command_digest: "sha256:7785a708b69f66dcf542295b9b933b687b4fc1b3d3ea0ea55d4a50e4cde2a123"
        id: "validation-resolution:sha256:fcb0ff984fcc404660515468761c6ae71bf2f92a898e3a31b579b6b9ce28a667:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:fcb0ff984fcc404660515468761c6ae71bf2f92a898e3a31b579b6b9ce28a667"
        occurred_at: "2026-09-28T07:51:50.916Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202609261720-KKE9ZN"
        task_revision: 24
      -
        command_digest: "sha256:3731cbc6e291ade6f87f843438c623daeeca79907fa7831c581a6265bf242f41"
        id: "kernel_work_item_claim_required:sha256:9a9b26f7cee1bdfbcaa15107c1e1930c9a9ea089df860aa8b768a9c699d03fb1:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9a9b26f7cee1bdfbcaa15107c1e1930c9a9ea089df860aa8b768a9c699d03fb1:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
        occurred_at: "2026-09-28T07:52:03.462Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202609261720-KKE9ZN"
        task_revision: 25
      -
        command_digest: "sha256:dfbcf8e29674848998c469d1dfa781d1a8274d85fe9b4a97bc8475416c13713b"
        id: "kernel_work_item_execution_required:sha256:c387b66f4afc6ac1a18dd3ae8b190a6e0544d60785e36f3e0a941b6ba0837514:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c387b66f4afc6ac1a18dd3ae8b190a6e0544d60785e36f3e0a941b6ba0837514:sha256:09d80507942f1512b1f3de955fe8f91a0c3e7034ff9a168470a7b2feb5805117"
        occurred_at: "2026-09-28T07:52:13.584Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202609261720-KKE9ZN"
        task_revision: 26
      -
        command_digest: "sha256:be076957c608c802d2ce9844b9e0101380a08734e447f78981b999dab795e080"
        id: "sha256:6697a6a0b2908ab268252c196646cf1566cb69ca85dbe961b7b62ca74e037886:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6697a6a0b2908ab268252c196646cf1566cb69ca85dbe961b7b62ca74e037886"
        occurred_at: "2026-09-28T08:07:57.049Z"
        payload_digest: "sha256:12b02ed4e1e4c420a0c500b3195ce9c8a463525e910858780f2a51e66b2dea1b"
        task_id: "202609261720-KKE9ZN"
        task_revision: 27
      -
        command_digest: "sha256:08e045d1114bab9a425b753083b6ee951bda79424c595713dea343833019c585"
        id: "result:sha256:a6f0ccb5b7d66ff050194aaa1d3ea95ff71479d326973a3f92751424e1076f95:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a6f0ccb5b7d66ff050194aaa1d3ea95ff71479d326973a3f92751424e1076f95"
        occurred_at: "2026-09-28T08:08:11.748Z"
        payload_digest: "sha256:ea8e8497ad55493a3f28b660d9b26e53c72ebf836c793a07a5b16e9ddcbd6e4d"
        task_id: "202609261720-KKE9ZN"
        task_revision: 28
      -
        command_digest: "sha256:a9780893b93f7f8c972450c6641d8c65248c972143312999232c3c16e50418ee"
        id: "kernel_work_item_inspection_required:sha256:5909c29fc87157c530d60ab6f32b8530eb887fed5e24ec6bde7e5b3c56a5bb03:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5909c29fc87157c530d60ab6f32b8530eb887fed5e24ec6bde7e5b3c56a5bb03:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
        occurred_at: "2026-09-28T08:08:22.558Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202609261720-KKE9ZN"
        task_revision: 29
      -
        command_digest: "sha256:56ab4b85c820d33d05062d393b2408dd6877550a198ad0814abff639732c15cc"
        id: "validation:sha256:cbba7aff5b7261da1b53c230f0000fd209b4201a34278c24fc4011f099493332:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:cbba7aff5b7261da1b53c230f0000fd209b4201a34278c24fc4011f099493332"
        occurred_at: "2026-09-28T08:13:17.434Z"
        payload_digest: "sha256:5690a2659cf380dde5dede34186eb58fae1a33ea1139477c9cf71c041a1ce7b4"
        task_id: "202609261720-KKE9ZN"
        task_revision: 30
      -
        command_digest: "sha256:d6a5aba35ac49e51b1911facd70affa08f17e201f45186ee6ab8af90ef6a7a65"
        id: "validation-resolution:sha256:841022afcfd46e21885e023bb28e66a130ecee71d03f9e22be35387feb966280:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:841022afcfd46e21885e023bb28e66a130ecee71d03f9e22be35387feb966280"
        occurred_at: "2026-09-28T08:13:23.857Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202609261720-KKE9ZN"
        task_revision: 31
      -
        command_digest: "sha256:31d419e3e5850202f1751b3ac123f744f42c87cdd895e5668930bef0c245ded2"
        id: "kernel_work_item_claim_required:sha256:1d0aded305a29b176535e7c5e35785923da4984d418834b62c69ef552e3b7db7:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1d0aded305a29b176535e7c5e35785923da4984d418834b62c69ef552e3b7db7:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
        occurred_at: "2026-09-28T08:13:36.785Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202609261720-KKE9ZN"
        task_revision: 32
      -
        command_digest: "sha256:c34c801ac767c647c63d9dc6d38177541795a494d450c71ea83cd11c2716896a"
        id: "kernel_work_item_execution_required:sha256:6469433df915bdd107ea722673d40df7aa5f6cfa84178faf21356fcaec3b02ad:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6469433df915bdd107ea722673d40df7aa5f6cfa84178faf21356fcaec3b02ad:sha256:fec07918bc9ed35b0227053b3ff9fdaf46243c7bb3c254c85a2d53d08787e5ea"
        occurred_at: "2026-09-28T08:13:45.964Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202609261720-KKE9ZN"
        task_revision: 33
      -
        command_digest: "sha256:bc04f090ef05fae298bd97087195b72ed05ac7b6b9b5b4f88df8153086b0fff3"
        id: "sha256:f99e830ee58be2f0e3f848bb8337909908f6584f08636e1e282dbf0a7c103eb5:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:f99e830ee58be2f0e3f848bb8337909908f6584f08636e1e282dbf0a7c103eb5"
        occurred_at: "2026-09-28T08:18:03.923Z"
        payload_digest: "sha256:b8d8ca47c0fa96b653190f50a748e7272ab3204b0b0588025e57d1bcf7c4374b"
        task_id: "202609261720-KKE9ZN"
        task_revision: 34
      -
        command_digest: "sha256:20ceff605b2f542a84cc5745f97c663cae895790e4195bae06790ad15ce32e0e"
        id: "result:sha256:a8e0c204ea67f4e6727a4360b80170689bf1725e9cee1f3824c28a5a606476b3:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a8e0c204ea67f4e6727a4360b80170689bf1725e9cee1f3824c28a5a606476b3"
        occurred_at: "2026-09-28T08:18:17.946Z"
        payload_digest: "sha256:de37d86010f4cc5e2afea165da82ba03f3a4a07aea3676f0baa1488fc743cf1b"
        task_id: "202609261720-KKE9ZN"
        task_revision: 35
      -
        command_digest: "sha256:7a06225aff9eeff4bfc0817457bee3404de3a29264149773746a5f46e6a20da9"
        id: "kernel_work_item_inspection_required:sha256:d7764aac786085cb77ba36c695dbde81a8f638bd96bd048517092cfe31629e87:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:d7764aac786085cb77ba36c695dbde81a8f638bd96bd048517092cfe31629e87:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
        occurred_at: "2026-09-28T08:18:28.366Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202609261720-KKE9ZN"
        task_revision: 36
      -
        command_digest: "sha256:fd9c049b8aa09badd690b92bf1985c3222a35da875ba3e5030abee3375870881"
        id: "validation:sha256:76b5c35943e80497a6398109679a7bc7db6710f0894df5cb269f39b3ee38e29f:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:76b5c35943e80497a6398109679a7bc7db6710f0894df5cb269f39b3ee38e29f"
        occurred_at: "2026-09-28T08:19:47.601Z"
        payload_digest: "sha256:d901e3690c2dd38854e74c38b789c761c28e718c23da6ee5923d1166f1aaf10a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 37
      -
        command_digest: "sha256:cd086e571832ae5ada6d630daa2d7fc6ec5acf968590e384335ff95363a39d51"
        id: "validation-resolution:sha256:e59016c9f59f7da3e057db9612c69b799e08af372b679490f0a28e715b05ae13:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e59016c9f59f7da3e057db9612c69b799e08af372b679490f0a28e715b05ae13"
        occurred_at: "2026-09-28T08:19:54.433Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202609261720-KKE9ZN"
        task_revision: 38
      -
        command_digest: "sha256:4f9c111f87bfb9cbb65e71e3ec1a814d7a7cf0a2b3cf1ad481cbcb8a06ccb662"
        id: "kernel_work_item_claim_required:sha256:ce168594e86ec59d2e891c4a7aa70c06a60b03edd71a48f03d8b773cedd0e492:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ce168594e86ec59d2e891c4a7aa70c06a60b03edd71a48f03d8b773cedd0e492:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
        occurred_at: "2026-09-28T08:20:08.181Z"
        payload_digest: "sha256:1614312eb58103f4c7640f85f8c8390d8b08424d5dc30404b86eb726e683b1d7"
        task_id: "202609261720-KKE9ZN"
        task_revision: 39
      -
        command_digest: "sha256:0045aebd5cc3d1b5113f518bced90fa772b3492aa9ee801c6b2205484968699d"
        id: "kernel_work_item_execution_required:sha256:3c52cda91b118b71f6f6055c7b6fe8ecd194ec55843e1060a52435a11504e95a:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3c52cda91b118b71f6f6055c7b6fe8ecd194ec55843e1060a52435a11504e95a:sha256:ee29eedd1ef28919da5b5699447c0f584abb6b23890dd84781e50dbd3c0b05ca"
        occurred_at: "2026-09-28T08:20:17.089Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202609261720-KKE9ZN"
        task_revision: 40
      -
        command_digest: "sha256:c7584c0968b7f38a07f983be6190c6db5113a07528775d94d34c1b364f696d88"
        id: "sha256:670ed3dca1bc2770e862675e759a5939bd28b8e08ca15f8588cea711d0a54cb6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:670ed3dca1bc2770e862675e759a5939bd28b8e08ca15f8588cea711d0a54cb6"
        occurred_at: "2026-09-28T08:31:31.177Z"
        payload_digest: "sha256:329bf5e601effe0e8ec373d9a611fc00e91eef1691a8994b224f1bc74458e654"
        task_id: "202609261720-KKE9ZN"
        task_revision: 41
      -
        command_digest: "sha256:fc23be99da3d3d93e0fe37d88ff80343fe5518578e3aaf2b57657d7f87f16d46"
        id: "semantic-stop:sha256:4299f720bfe6bfa995aa418f989d586859282654768467f86b8aaf509f765f4c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:4299f720bfe6bfa995aa418f989d586859282654768467f86b8aaf509f765f4c"
        occurred_at: "2026-09-28T08:31:40.582Z"
        payload_digest: "sha256:aec49a4b547a4401da31cfe163dadf2f671fd47179bd7ec6528fad14db98542c"
        task_id: "202609261720-KKE9ZN"
        task_revision: 42
      -
        command_digest: "sha256:b7203b465e2db1e6da1a5bdccef7883941a28b8feb7f6baf7150e83f64e149a3"
        id: "amend:sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:abb690d1e3ddd42d0b94a9ee268dfd4e0fa577552628d7c35f37a8078a19d7c9"
        occurred_at: "2026-09-28T08:32:36.454Z"
        payload_digest: "sha256:75483b38b5afd720db36e8bbaebd97aef11393c636175e781cd914f79d74a025"
        task_id: "202609261720-KKE9ZN"
        task_revision: 43
      -
        command_digest: "sha256:113d4da9280191b366e846738226df26a3de2c871b64972da6c5b774197f5bc4"
        id: "sha256:b18302eb90e868d4831604fbecda94de65a65d7a2bdb1cac987df58642331abf:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b18302eb90e868d4831604fbecda94de65a65d7a2bdb1cac987df58642331abf"
        occurred_at: "2026-09-28T08:32:43.989Z"
        payload_digest: "sha256:0ba4b46d6bd001351d376e99d29b28ed8a9e6e5c814f9386d8572f9cebc65fef"
        task_id: "202609261720-KKE9ZN"
        task_revision: 44
      -
        command_digest: "sha256:c11032905f9e1730e33d90bb0c4f1d465e397328028b5cf2399986d4a1d833ff"
        id: "kernel_work_item_claim_required:sha256:9045f767c4836dd70813e33bc20c27e425d3498dc036e0f29b7607cbbf525c95:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9045f767c4836dd70813e33bc20c27e425d3498dc036e0f29b7607cbbf525c95:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
        occurred_at: "2026-09-28T08:33:41.132Z"
        payload_digest: "sha256:73f5350c84cc96e7810b4cf90409a1512e4a9b7dcf9f0e74d9098c10bb1e7197"
        task_id: "202609261720-KKE9ZN"
        task_revision: 45
      -
        command_digest: "sha256:4fbbccdacf17f3cfa2ad982d0abd27dff70a2e1b61da46df9a277349c943bbc0"
        id: "kernel_work_item_execution_required:sha256:f196e16eb51e3e6a2c1da357c4f04d5a8f682acd10536f6e3660bbed676cd2a2:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f196e16eb51e3e6a2c1da357c4f04d5a8f682acd10536f6e3660bbed676cd2a2:sha256:c5ce073f6a2063df7b00a1a729fc758fcaa2d1374a566aac560f07cda4cc9cb0"
        occurred_at: "2026-09-28T08:33:52.078Z"
        payload_digest: "sha256:3b47a4f72ab7ab9b3cfafc1174f8be60080d50a0014e4b0b04406f5a1b69f16d"
        task_id: "202609261720-KKE9ZN"
        task_revision: 46
      -
        command_digest: "sha256:b20022ad9bdad1ae75c1d9b093572742aa273d7718f642d7a834a16d7a029fea"
        id: "sha256:0c36be0843837c2ce5242549727a0aa0ebe3fd1c0cfad4531d579236a15e246d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:0c36be0843837c2ce5242549727a0aa0ebe3fd1c0cfad4531d579236a15e246d"
        occurred_at: "2026-09-28T08:37:35.386Z"
        payload_digest: "sha256:101b4596fa5bfa51a06ff9862c0d47f43fe1c958c8ba557695921140eebfe0bf"
        task_id: "202609261720-KKE9ZN"
        task_revision: 47
      -
        command_digest: "sha256:218f7912bee8d1b449efe24c43c4ef6f8a3f9a9eba5dd84a398ef959536d8bab"
        id: "result:sha256:ac81fb18d1a11b349aec72314a3db4b7687271ecf8c4775f52b2060d7493fb96:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:ac81fb18d1a11b349aec72314a3db4b7687271ecf8c4775f52b2060d7493fb96"
        occurred_at: "2026-09-28T08:37:49.441Z"
        payload_digest: "sha256:105e6e11c18441e7e21c04ac90ce094d991854175951602cf9312b619625e71c"
        task_id: "202609261720-KKE9ZN"
        task_revision: 48
      -
        command_digest: "sha256:75e81c8fc2dfd67b80f3fda3ffe49f0959d8d2eddf7f2f69954d2ec825b212e6"
        id: "kernel_work_item_inspection_required:sha256:419b70daec9dd3c9619735db29c15739c7185bfba4b68c2fddf3c7014615f1be:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:419b70daec9dd3c9619735db29c15739c7185bfba4b68c2fddf3c7014615f1be:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
        occurred_at: "2026-09-28T08:38:00.619Z"
        payload_digest: "sha256:a8ab5da46010ff17fa02de04a8b9468b3acd2b6ed9c17e55d3b78a2c8782aa87"
        task_id: "202609261720-KKE9ZN"
        task_revision: 49
      -
        command_digest: "sha256:3bfd8723b44d302ffc35159350b7a0be79dc01f210b0919ced2be98b23de51de"
        id: "validation:sha256:06468c0cc3fdbc7426e6f7ef8ad904cb04630b20458617e0f754e567e302bb15:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:06468c0cc3fdbc7426e6f7ef8ad904cb04630b20458617e0f754e567e302bb15"
        occurred_at: "2026-09-28T08:40:08.250Z"
        payload_digest: "sha256:cb4625b63083317420e175b0d92d04c2080c84fb2eddef708f8dc128ae56870a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 50
      -
        command_digest: "sha256:9bdd1e7796dda406b28f193de495d89a66f46626cecd8464cde118c5a0427e55"
        id: "validation-resolution:sha256:b763c7e198475b2d5a9e42aa3f4f174bd1b01bf74b4026102cf3171bde829ade:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b763c7e198475b2d5a9e42aa3f4f174bd1b01bf74b4026102cf3171bde829ade"
        occurred_at: "2026-09-28T08:40:14.750Z"
        payload_digest: "sha256:023c3c4aa353c9a91d5e1dc6a053957a44051d661b29b8c78a9c9589791f6fde"
        task_id: "202609261720-KKE9ZN"
        task_revision: 51
      -
        command_digest: "sha256:1f70dd9b7d4ce63d8864873a6d2242c0766e8d420602df6271a8bf39be07ef52"
        id: "kernel_work_item_claim_required:sha256:83520b21e8a51a142086dab2358bbe67284d75c11a95fe3e82e43b1114e936f1:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:83520b21e8a51a142086dab2358bbe67284d75c11a95fe3e82e43b1114e936f1:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
        occurred_at: "2026-09-28T08:40:29.638Z"
        payload_digest: "sha256:b88fe73b96a21b8cd9734beda39a60b9174f6dcc3838ea4cfb914bd024c71e20"
        task_id: "202609261720-KKE9ZN"
        task_revision: 52
      -
        command_digest: "sha256:17568610461160a97f8282e1323e5a550b418ca8d4e802e64347b7c2f4099d30"
        id: "kernel_work_item_execution_required:sha256:14e36ee9a7ffed694c9e2bf64b5e9a58f1fa6b135a69c45d43f74bd3e256f41c:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:14e36ee9a7ffed694c9e2bf64b5e9a58f1fa6b135a69c45d43f74bd3e256f41c:sha256:6f3e1bb17a080ea7e5cde5d43cb956bd343cc7c7ee3cc9178ea7dcfd23353238"
        occurred_at: "2026-09-28T08:40:40.938Z"
        payload_digest: "sha256:8cfb7d7a7bab1f0a496322b68afe9e57edc1e5dbd14af67ef3b6dfd2ea0d07e6"
        task_id: "202609261720-KKE9ZN"
        task_revision: 53
      -
        command_digest: "sha256:6234efa8f007a8605efe88830007ab17ba7932d767cf8dfd16710ee1e7cfe8f6"
        id: "sha256:16eb8e0323c3f4c564e6ebbfd0cd4e3ba1024369d16462a8798ff5bbab9bc5ad:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:16eb8e0323c3f4c564e6ebbfd0cd4e3ba1024369d16462a8798ff5bbab9bc5ad"
        occurred_at: "2026-09-28T08:44:51.133Z"
        payload_digest: "sha256:1e76f5208f119b5c18847abceb86f51357ff8498a3956adc9d7818b9b3961b0e"
        task_id: "202609261720-KKE9ZN"
        task_revision: 54
      -
        command_digest: "sha256:961bba0731faa304ba5b3778c128a87c0d59df4148249dc15855645c2e50566e"
        id: "result:sha256:fb9360270133f9de3d5e86706d5426395c9728915b48229313aec66d930559b5:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:fb9360270133f9de3d5e86706d5426395c9728915b48229313aec66d930559b5"
        occurred_at: "2026-09-28T08:45:07.502Z"
        payload_digest: "sha256:8161abc956d87bcad7fb39e797b65fb3d373cc820669a921aecf0c3bccb734a4"
        task_id: "202609261720-KKE9ZN"
        task_revision: 55
      -
        command_digest: "sha256:c150e1e189ccc67ab54e0a9bf075f2a9bb08da00be6a6e401ae57405123001c5"
        id: "kernel_work_item_inspection_required:sha256:c9db41e6f812143345d0b013953728d0a9cacb3a44b897907d2e2d0f4da20ab7:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c9db41e6f812143345d0b013953728d0a9cacb3a44b897907d2e2d0f4da20ab7:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        occurred_at: "2026-09-28T08:45:17.040Z"
        payload_digest: "sha256:e274569d39b1d1f5dd241564cd92011f0b7d71d10ebfc0456dafef2f8be24e09"
        task_id: "202609261720-KKE9ZN"
        task_revision: 56
      -
        command_digest: "sha256:93da176086ba4973696a5338968efd838e95674a82a3fd517871f6794e17745b"
        id: "validation:sha256:a5c505c6dfb599261c7e2da55a71f843f3d6aa9feaa8c92d267bfa74fbcd124e:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a5c505c6dfb599261c7e2da55a71f843f3d6aa9feaa8c92d267bfa74fbcd124e"
        occurred_at: "2026-09-28T08:47:21.886Z"
        payload_digest: "sha256:bdc2af3560a9c14f5ab00b4323251b26ad632a3849c54be552faaae6090f435d"
        task_id: "202609261720-KKE9ZN"
        task_revision: 57
      -
        command_digest: "sha256:b80939453fb92c9e2cceea5c02bd22389ed1a32fd107706a7a2ebd38504a90de"
        id: "validation-resolution:sha256:8cf4aba1e9f1190b381434bf18f60bb7c7870dc547f57acb31231c68565c5d80:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8cf4aba1e9f1190b381434bf18f60bb7c7870dc547f57acb31231c68565c5d80"
        occurred_at: "2026-09-28T08:47:30.285Z"
        payload_digest: "sha256:cb51f14fdbfee9efa74e6e7e8d2f01a8ca620b0c2610a28d7952eeb01446b9d9"
        task_id: "202609261720-KKE9ZN"
        task_revision: 58
      -
        command_digest: "sha256:e1a5dd90f18ea8fef4af6c4250ba58c50f0b7f0bcb2500c93fcd32e8eadfc1b0"
        id: "kernel_work_item_claim_required:sha256:93d276fb94854adcb0e68b1740f3c057845777a4a51e910381282d8113ec69cd:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:93d276fb94854adcb0e68b1740f3c057845777a4a51e910381282d8113ec69cd:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        occurred_at: "2026-09-28T08:47:43.789Z"
        payload_digest: "sha256:d5b7e61f92a6ab990035c37b1be8a81831983e46adeaeb195ef1dc1e0df6f932"
        task_id: "202609261720-KKE9ZN"
        task_revision: 59
      -
        command_digest: "sha256:3f460ac59cb82925df7f2ecf98c0685e3e04a048e43ea98e76e9e95a395aa30f"
        id: "kernel_work_item_execution_required:sha256:f2b98bb020a67489b0bd32f5f6d5a70b8e9cf83783b934546073ba8a57a4822f:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f2b98bb020a67489b0bd32f5f6d5a70b8e9cf83783b934546073ba8a57a4822f:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        occurred_at: "2026-09-28T08:47:53.474Z"
        payload_digest: "sha256:9f79c6d7022277c85eea828a691b0b9848c36d9e103710ff7ad25cae72beede3"
        task_id: "202609261720-KKE9ZN"
        task_revision: 60
      -
        command_digest: "sha256:71fc97e93eb2326479d1256c9daacc84e23321b2a7225e4bce3d4db6bafb9067"
        id: "semantic-stop:sha256:3895707aa08ebcbd5041ed1ff38fe0ea0868947e07ea8db56124d0d1ee8099a2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:3895707aa08ebcbd5041ed1ff38fe0ea0868947e07ea8db56124d0d1ee8099a2"
        occurred_at: "2026-09-28T08:48:59.780Z"
        payload_digest: "sha256:2e19f270cec9be0a5dd349d0b5e6724c9e17338a119dd07a89cda8feb1348aa6"
        task_id: "202609261720-KKE9ZN"
        task_revision: 61
      -
        command_digest: "sha256:28cb29ebd1278b3d8b71f17122dae08f809a5c6ec1b538af0195d4d1e4f4b50b"
        id: "amend:sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:ae660cb856d9ae18885cf469d5286a620e225c6d5b162bef08f910b3838413a5"
        occurred_at: "2026-09-28T08:49:46.088Z"
        payload_digest: "sha256:90b40de57e20684846fc4b1fa31aec8be8e487cb4a027398cb8ef00326c089c8"
        task_id: "202609261720-KKE9ZN"
        task_revision: 62
      -
        command_digest: "sha256:ff939db2d495f9ec75dc33bcf6ea56453d7682f7c6d38799ee504f48110186dc"
        id: "sha256:81a557e1fd4b1d2099c67aeb5617998673d530ed9c4def457addae16116580c5:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:81a557e1fd4b1d2099c67aeb5617998673d530ed9c4def457addae16116580c5"
        occurred_at: "2026-09-28T08:49:53.767Z"
        payload_digest: "sha256:9077df7b723e60376ca27611813bf293341ca0a1ca4f7331aabd742ee2feab94"
        task_id: "202609261720-KKE9ZN"
        task_revision: 63
      -
        command_digest: "sha256:feb02756d02984b71cb3757c8d30a7135b754825d6debd2e1f2f2b6e829a8007"
        id: "kernel_work_item_claim_required:sha256:73168814a4f1d7516d8ce8e1909a0d3e3fecd66bc32c9584b1decedb05c94f9e:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:73168814a4f1d7516d8ce8e1909a0d3e3fecd66bc32c9584b1decedb05c94f9e:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        occurred_at: "2026-09-28T08:50:30.063Z"
        payload_digest: "sha256:3eb3595534644a655247e4b007a0c5d10060724324be31ca06aa8f91ffc1c15a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 64
      -
        command_digest: "sha256:fcf2e487e3ec1923ad260ca132a9b78eb95f11a58de52a3d6e8c83fad5175224"
        id: "kernel_work_item_execution_required:sha256:431a681dd46c7a8bc3dc1872cb60954f88232ad3da74df686b2a7d69f9bb2fab:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:431a681dd46c7a8bc3dc1872cb60954f88232ad3da74df686b2a7d69f9bb2fab:sha256:0681b2b36889eedef7798b0640087d64f3a2a7e1add6015034059aed95621e80"
        occurred_at: "2026-09-28T08:50:39.939Z"
        payload_digest: "sha256:ffa5cac49ed6070664a5e179f0ae02788dc6624ad5b8d5908d6386617af8d0e6"
        task_id: "202609261720-KKE9ZN"
        task_revision: 65
      -
        command_digest: "sha256:a65244796dda84c6d9d8af686c580803b45aee60b1e15e8245015246927c4460"
        id: "sha256:485af9271057fb7ab9aad62cc76e3895c01714f05adec6a1d00b92d011fef1b0:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:485af9271057fb7ab9aad62cc76e3895c01714f05adec6a1d00b92d011fef1b0"
        occurred_at: "2026-09-28T09:13:23.253Z"
        payload_digest: "sha256:719ea4bf5a6108d4d4f38d104bb891e92f46b1ce71418e553c3caf2166bf2bf4"
        task_id: "202609261720-KKE9ZN"
        task_revision: 66
      -
        command_digest: "sha256:cd241d5ae185c60e35d445e9f85c5d92da3247ad1727f0a10ba74fd7ea18840e"
        id: "result:sha256:700ee4fdec261b5d7de5e1dffba4f27dc0bf6b0627029481b81606840c6b2e74:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:700ee4fdec261b5d7de5e1dffba4f27dc0bf6b0627029481b81606840c6b2e74"
        occurred_at: "2026-09-28T09:14:40.417Z"
        payload_digest: "sha256:dd7b6016f9f345fe5871eafbb5b8f841e496c89c3655d53af5025bd131dbb174"
        task_id: "202609261720-KKE9ZN"
        task_revision: 67
      -
        command_digest: "sha256:bf044729eb443bbe9b3d20dd5246cac97c7110b1d65a331dfa514d4a228c5e96"
        id: "kernel_work_item_inspection_required:sha256:26096c65bf7f59a8818e877c92187a14ad23dadd1f4a32622a1e8bd83a7d4672:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:26096c65bf7f59a8818e877c92187a14ad23dadd1f4a32622a1e8bd83a7d4672:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
        occurred_at: "2026-09-28T09:14:55.569Z"
        payload_digest: "sha256:924bffbe25186b1425a999bdbba4a730ebf2705afdc150b377f116466a56020a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 68
      -
        command_digest: "sha256:32dcbaccc36722033edec002d8d226925e0773e00f3a380a24394a4805c044ba"
        id: "validation:sha256:3956180757c36d9641c69e0e151af033f755ec91bfce93f8a445cb83cc93dbd5:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:3956180757c36d9641c69e0e151af033f755ec91bfce93f8a445cb83cc93dbd5"
        occurred_at: "2026-09-28T09:20:20.709Z"
        payload_digest: "sha256:f4c7f5dfbae200a3c43825f9f92ed2d4b741445f950fb8a18472f1b6aa567548"
        task_id: "202609261720-KKE9ZN"
        task_revision: 69
      -
        command_digest: "sha256:aebff1115cb6e1926ca2f70212f6d6afb65884e6e6c227f7e02d7cc58c9be7d7"
        id: "validation-resolution:sha256:964a69d0bcb2de513d266d29aea7b800560a964314e78d83feecb497dc222cc3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:964a69d0bcb2de513d266d29aea7b800560a964314e78d83feecb497dc222cc3"
        occurred_at: "2026-09-28T09:20:26.766Z"
        payload_digest: "sha256:a2da109a8b181cb6be40337d65b7b1c1a58280bbcff3b880a0a3b52ae2157b03"
        task_id: "202609261720-KKE9ZN"
        task_revision: 70
      -
        command_digest: "sha256:8de28a147a277601e9b3c42485619a1807f036b4a9a79708354cd008e58e31ab"
        id: "kernel_work_item_claim_required:sha256:866ac3a02b4262a753d487bc7ef6d7a5d1076e2862e9d5636838b745cbe57b8a:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:866ac3a02b4262a753d487bc7ef6d7a5d1076e2862e9d5636838b745cbe57b8a:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
        occurred_at: "2026-09-28T09:20:39.809Z"
        payload_digest: "sha256:b378fe5734cbbb391393dfe2f7931f259d545a7efe8feb838a3dc4f3db0a6f2e"
        task_id: "202609261720-KKE9ZN"
        task_revision: 71
      -
        command_digest: "sha256:fb57e8ac936fbb70af4aaa8491aeeff2b034eb3e1aea99ee74d6a813d4b9f271"
        id: "kernel_work_item_execution_required:sha256:d090d32aca0e7d4b8abca5caa12c1c8884e90fdc511d10ccfe4bd6fdf1a58167:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d090d32aca0e7d4b8abca5caa12c1c8884e90fdc511d10ccfe4bd6fdf1a58167:sha256:eeadad0214f18e95a535766744b5087b49eeeebe85d01c1b46d86ba73200df4a"
        occurred_at: "2026-09-28T09:20:51.883Z"
        payload_digest: "sha256:f5b6b49bae26ea3809fe617ed95d8ddeeb3880e1ae8340f7e6d21f5d1bc3f548"
        task_id: "202609261720-KKE9ZN"
        task_revision: 72
      -
        command_digest: "sha256:9aeb0c92ed150152ac0daf9d94e689289163a2c2de494a0753d7d7f045877625"
        id: "sha256:0f218f0800d9229c6247f314941b09882782ddddd63d94f0d00c20c76ea4ca6d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:0f218f0800d9229c6247f314941b09882782ddddd63d94f0d00c20c76ea4ca6d"
        occurred_at: "2026-09-28T09:28:19.140Z"
        payload_digest: "sha256:e70a89544eb83cba41de8ef8573adccbe94dbde5913899e118235b479f4f0bb4"
        task_id: "202609261720-KKE9ZN"
        task_revision: 73
      -
        command_digest: "sha256:01929a7d52a564692135dd866090b72be0179ee74d71cba5f3145a7b25f92163"
        id: "result:sha256:8111d8912e1addcdc5ed85d62781aa44882a96ca27fe2193a47f45190366a076:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:8111d8912e1addcdc5ed85d62781aa44882a96ca27fe2193a47f45190366a076"
        occurred_at: "2026-09-28T09:28:34.946Z"
        payload_digest: "sha256:8e4a05a2346fb7117da0071b6136a93a9588747e9a59cccbc24e53fb321e6a11"
        task_id: "202609261720-KKE9ZN"
        task_revision: 74
      -
        command_digest: "sha256:c817668832a54a6d75a13cb8acc7f0e6eb392366278d6fffbd217f7c666c0077"
        id: "kernel_work_item_inspection_required:sha256:8b14f4aaf48098d7ff4377c4a4f9c931591c1a50734b25a9f2358385ac4081fb:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8b14f4aaf48098d7ff4377c4a4f9c931591c1a50734b25a9f2358385ac4081fb:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
        occurred_at: "2026-09-28T09:28:45.879Z"
        payload_digest: "sha256:96ca2c49c09734ae7ab2da62c677a35d0a62770b12627f74f15d72a48762c9a7"
        task_id: "202609261720-KKE9ZN"
        task_revision: 75
      -
        command_digest: "sha256:7923bd71507261a09a711239f60968b5bf5a22d7e50623b40e7c96aec315ef3f"
        id: "validation:sha256:567a613c49b9f73f5d93b512fcab856e45baba4118b09a680d4a98d9b8a92b13:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:567a613c49b9f73f5d93b512fcab856e45baba4118b09a680d4a98d9b8a92b13"
        occurred_at: "2026-09-28T09:31:03.774Z"
        payload_digest: "sha256:79a1567eb35db8357c732552ccf9c2e4bcdac0d9cca915d7f340d6c741cdf088"
        task_id: "202609261720-KKE9ZN"
        task_revision: 76
      -
        command_digest: "sha256:77389669c68bc1db2a75cc708186e6c4f792b04f87a059dc6da8270ad8d050e7"
        id: "validation-resolution:sha256:8cb0d7fcdeb80dc3b3d1e5d86096c19b7c8a5f990cba9fefd60946d52d7ec611:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8cb0d7fcdeb80dc3b3d1e5d86096c19b7c8a5f990cba9fefd60946d52d7ec611"
        occurred_at: "2026-09-28T09:31:11.556Z"
        payload_digest: "sha256:84ba2212bc35d3881c24ad5b26a3a1b75e985eb876f5cfe430544d68a123f3df"
        task_id: "202609261720-KKE9ZN"
        task_revision: 77
      -
        command_digest: "sha256:5caa094ee68203c51e9d8d6f46710fb1327d109457f264a79aca8de56f4985ad"
        id: "kernel_work_item_claim_required:sha256:3c730d01303a54d0d356b86ee541a9434035449e569b04909d7f8458d1f3d397:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3c730d01303a54d0d356b86ee541a9434035449e569b04909d7f8458d1f3d397:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
        occurred_at: "2026-09-28T09:31:25.496Z"
        payload_digest: "sha256:1e07a36d08a68057ba6f0a46403427e6c24c5259612903c8a3f017c01ce8c844"
        task_id: "202609261720-KKE9ZN"
        task_revision: 78
      -
        command_digest: "sha256:e5e36bc00b1a904efca27556a8e8f489c3b88a4afb8a683ef9e959e495f7e30e"
        id: "kernel_work_item_execution_required:sha256:c64947fc967c8bacb576ccbf4cdd0fa6329a3718e785606d4dc8a1aa3550b7e0:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c64947fc967c8bacb576ccbf4cdd0fa6329a3718e785606d4dc8a1aa3550b7e0:sha256:80d18239fdb6594da0644c391f47126f8183f2fb01a5fae0e239e26f5b88684d"
        occurred_at: "2026-09-28T09:31:36.888Z"
        payload_digest: "sha256:ec9d535941637a80d41295c363d82dd28a32f15be7f44c47d154d97291d3f5ab"
        task_id: "202609261720-KKE9ZN"
        task_revision: 79
      -
        command_digest: "sha256:fc5c273a7b14c67bbb419719d4840ad423f22de66d0958d93a27d70a4ffcafd0"
        id: "sha256:e29eeb415997c8fa0000f810a7248b10527038fe8c85ef0c3354dbda9c238576:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e29eeb415997c8fa0000f810a7248b10527038fe8c85ef0c3354dbda9c238576"
        occurred_at: "2026-09-28T09:36:45.045Z"
        payload_digest: "sha256:710ebc8cfc2b841213f71d0ef0c395e1c1056075d8088112eb0763243755e2e6"
        task_id: "202609261720-KKE9ZN"
        task_revision: 80
      -
        command_digest: "sha256:c11d4a6189449072164e68b66fa32dfbc8d3a693c579a0c63b1ea0e66ff7af8f"
        id: "result:sha256:4246f45902cd60697bc81f825383c0bbdf6f4218de09ede2540c1b1259191d83:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4246f45902cd60697bc81f825383c0bbdf6f4218de09ede2540c1b1259191d83"
        occurred_at: "2026-09-28T09:37:00.228Z"
        payload_digest: "sha256:41a118f1d702c4bec078787aa943439c4599ff8e52600992cddcf08186d0d8b8"
        task_id: "202609261720-KKE9ZN"
        task_revision: 81
      -
        command_digest: "sha256:817241e7dce726da20e570999ab1c10ee04d34530574cbfc8fb9be103385aed3"
        id: "kernel_work_item_inspection_required:sha256:9aba0bc8adbf7e122003f58bf597209bf1dfd097bd1685bb73105ac1348ab882:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:9aba0bc8adbf7e122003f58bf597209bf1dfd097bd1685bb73105ac1348ab882:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
        occurred_at: "2026-09-28T09:37:13.945Z"
        payload_digest: "sha256:a5123c6a1976cd82678aad408df20145549480b169029f73c70411ceaa06e9fe"
        task_id: "202609261720-KKE9ZN"
        task_revision: 82
      -
        command_digest: "sha256:84c866721678aab223d318755f508877539f0e14e843f150bbf188e37ddd098c"
        id: "validation:sha256:fb398d8b499f985c0397109c3558e6b196a03d63b8332646ff4f32ac3a973da2:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:fb398d8b499f985c0397109c3558e6b196a03d63b8332646ff4f32ac3a973da2"
        occurred_at: "2026-09-28T09:38:28.697Z"
        payload_digest: "sha256:3ee2bf3de6b5bf0093d75e650829983803ecba971e8ceef814c13c5454eb34c8"
        task_id: "202609261720-KKE9ZN"
        task_revision: 83
      -
        command_digest: "sha256:ea0bb7875f7987859290061480a0291db6c9ae2a05a9595177d1fa74342a0c8f"
        id: "validation-resolution:sha256:57a4c9b4060998462ec67c091ebcb1113c2d91f3fe33b0bc4087270fa4c6c656:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:57a4c9b4060998462ec67c091ebcb1113c2d91f3fe33b0bc4087270fa4c6c656"
        occurred_at: "2026-09-28T09:38:36.824Z"
        payload_digest: "sha256:1873970bc4b3fd428cbe6fa0fd824c12e3fdb54b73d35290a057ae3490fe47e8"
        task_id: "202609261720-KKE9ZN"
        task_revision: 84
      -
        command_digest: "sha256:d1c18b1fb653ab1606add2146fef6c019137bbf6a9bfab9d9cf08f6b05febce3"
        id: "kernel_work_item_claim_required:sha256:ddea936a0c0f7cd12631380fdfe5995608d7aae0ed4a1e5a1fd7d71aa8eeffcf:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ddea936a0c0f7cd12631380fdfe5995608d7aae0ed4a1e5a1fd7d71aa8eeffcf:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
        occurred_at: "2026-09-28T09:38:50.696Z"
        payload_digest: "sha256:9c28730bd3ea9670de6d4b3f193b59bf885fb5618a1690b985d78b1d82010fa2"
        task_id: "202609261720-KKE9ZN"
        task_revision: 85
      -
        command_digest: "sha256:9d7b8f8c4e6e17b6f4080b39a81d5a69d8c101db3db7d9568a85de94d46c661e"
        id: "kernel_work_item_execution_required:sha256:b2644e2d67a8c7e12c32df5eff1db6b75dce636b8a0223ca9a6dabc72a1bc090:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b2644e2d67a8c7e12c32df5eff1db6b75dce636b8a0223ca9a6dabc72a1bc090:sha256:d96ff829b6677453290a3865c31a52ec39d3f2322e4c1b405ae315f0f8447d4d"
        occurred_at: "2026-09-28T09:39:01.230Z"
        payload_digest: "sha256:8b1477d7662aca618bce3cd6cdb15ee06556cc2b14ef5de93b735f0d15a1c124"
        task_id: "202609261720-KKE9ZN"
        task_revision: 86
      -
        command_digest: "sha256:747069b44c6d894afb21060f27987b3ec3a8f26d8b61c8473a7427a7adccd1ee"
        id: "sha256:65c2e4a2dace72ba75d1f7b333d95d9db095ad31497e263b2b9712294b65a030:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:65c2e4a2dace72ba75d1f7b333d95d9db095ad31497e263b2b9712294b65a030"
        occurred_at: "2026-09-28T09:57:22.770Z"
        payload_digest: "sha256:d4e583c649eb4041bff25ee130b5ee3c683c5568e39a2b119dab4ef79ded86ec"
        task_id: "202609261720-KKE9ZN"
        task_revision: 87
      -
        command_digest: "sha256:e46e0bd4afba3f370ae5a1ff0f0cce3892894c1103d0468b6ab1ab6d7c1ee212"
        id: "result:sha256:104ac3d724b2d858715b2ff087f5a4ef92a8952813d04fe7dff76efbf0f57234:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:104ac3d724b2d858715b2ff087f5a4ef92a8952813d04fe7dff76efbf0f57234"
        occurred_at: "2026-09-28T09:57:37.325Z"
        payload_digest: "sha256:412ebb3aea6b3e9134c9936d78507f590d57596fb471cadcd27b20c6bba76f98"
        task_id: "202609261720-KKE9ZN"
        task_revision: 88
      -
        command_digest: "sha256:4c09615775ec474e55ae45449958d9d967a6b27ad73ab7449dcac2632277e3d1"
        id: "kernel_work_item_inspection_required:sha256:c1c571159814dc9e0567d4adad0eafd15167b0f0ac5ceb0b6f1026ecd40a108a:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c1c571159814dc9e0567d4adad0eafd15167b0f0ac5ceb0b6f1026ecd40a108a:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
        occurred_at: "2026-09-28T09:57:50.784Z"
        payload_digest: "sha256:a667a0534249b9baa7375298a3879bbe7fec5279bd5bd4164e75e9e82058a40b"
        task_id: "202609261720-KKE9ZN"
        task_revision: 89
      -
        command_digest: "sha256:339b878d8e770b21a0274d322980c460c8171b10e5e62af42ac5ef2f7182fb59"
        id: "validation:sha256:b4535211d2e2198a62babcea7e7a6ae00b734ac7017be4ee3c7106739452e698:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b4535211d2e2198a62babcea7e7a6ae00b734ac7017be4ee3c7106739452e698"
        occurred_at: "2026-09-28T10:05:40.099Z"
        payload_digest: "sha256:e541c38ff5709af925fa7f4371998f07c89d81fb62596396f0126c0d8a6c23a0"
        task_id: "202609261720-KKE9ZN"
        task_revision: 90
      -
        command_digest: "sha256:4c5258c78a2edd399e4ec46e5cc0d42f0865c5935c96a14dc81617768afce819"
        id: "validation-resolution:sha256:aca061558716ecee4a1a261984ac3ffbc4519af68f0cce7b848289c1a905a603:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:aca061558716ecee4a1a261984ac3ffbc4519af68f0cce7b848289c1a905a603"
        occurred_at: "2026-09-28T10:05:47.044Z"
        payload_digest: "sha256:3e47fbd0a34294b5fe8c4dd7744b0c51d40d91cbc982dd99f689f7cffdb80694"
        task_id: "202609261720-KKE9ZN"
        task_revision: 91
      -
        command_digest: "sha256:5d8ed235b069f57eb3a15e0ffb1741f1bbf1b3490342e9e8d9af6805ee6aaa22"
        id: "kernel_work_item_claim_required:sha256:a68c8456b48d84da60ce6a295ce60514fd22b26b29df04e027be96f40fdf3b1f:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a68c8456b48d84da60ce6a295ce60514fd22b26b29df04e027be96f40fdf3b1f:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
        occurred_at: "2026-09-28T10:06:00.448Z"
        payload_digest: "sha256:252edeb4913d859388f58f14a2d887190754472b62c06198f5a1ef790b2ad1fe"
        task_id: "202609261720-KKE9ZN"
        task_revision: 92
      -
        command_digest: "sha256:ab22fc69073cae59f06f256bee73375fa1bf3ecc492705bdc80a8eb10275017f"
        id: "kernel_work_item_execution_required:sha256:e9b0c8ebb2edf97758d2644be9bb81bd63b12bbfab7708876db0120f5e596dd8:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:e9b0c8ebb2edf97758d2644be9bb81bd63b12bbfab7708876db0120f5e596dd8:sha256:ca268ce619332dbe4d794762064e27fa5f7faa26a660e552b7d831875081befb"
        occurred_at: "2026-09-28T10:06:13.402Z"
        payload_digest: "sha256:b0e6d57774c6a72887b3b7faa0142d54511b1ca5129ca41b9339224c5362cc09"
        task_id: "202609261720-KKE9ZN"
        task_revision: 93
      -
        command_digest: "sha256:9def2dc08098ab9c9e53f954246018e538ed4d3d810d8bc2e3535445a8cf2213"
        id: "sha256:102f053f3a5256d2ab499ffa18a9102f80b9b30afb5c925f5451a8b81aa9422d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:102f053f3a5256d2ab499ffa18a9102f80b9b30afb5c925f5451a8b81aa9422d"
        occurred_at: "2026-09-28T10:13:24.918Z"
        payload_digest: "sha256:6c121de1b7e85ff23586f9a1402dadc528cea9f0ff21b225ec028e4717a786e8"
        task_id: "202609261720-KKE9ZN"
        task_revision: 94
      -
        command_digest: "sha256:1706f5c487e2682c4bff82317f7beffe31aa36d8ee64e6324307926625b10985"
        id: "result:sha256:c6c4abfe24dc8f64bffc794720884ce0c0a9e4af74812b0f94f552c7bc899368:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c6c4abfe24dc8f64bffc794720884ce0c0a9e4af74812b0f94f552c7bc899368"
        occurred_at: "2026-09-28T10:13:39.915Z"
        payload_digest: "sha256:4833b0965708c3d62dc98ef943145a3ef6e317d91b8580439bb30a18fac2172c"
        task_id: "202609261720-KKE9ZN"
        task_revision: 95
      -
        command_digest: "sha256:a1a3d009b67af63753fd01b13784c5c4215fe8588efbcfc3f3d451f2fd5880f8"
        id: "kernel_work_item_inspection_required:sha256:cafb833f01de716c1dd90697b001dfcda5b35a972c7f435e184082284e58700e:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:cafb833f01de716c1dd90697b001dfcda5b35a972c7f435e184082284e58700e:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
        occurred_at: "2026-09-28T10:13:52.415Z"
        payload_digest: "sha256:9c2653849ef2bade961401a3e11c1894cae0468c6fc1cafa77ee96c6a56e6ff5"
        task_id: "202609261720-KKE9ZN"
        task_revision: 96
      -
        command_digest: "sha256:9b09a7f2c0d8d05f1f138beed06180295d80b6069f138dee99d461f0da69faf7"
        id: "validation:sha256:f83d8c88af429edf6bb65b39ef9c4ff2cae09674bf7b2ae0aa7122b621ce6bf7:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f83d8c88af429edf6bb65b39ef9c4ff2cae09674bf7b2ae0aa7122b621ce6bf7"
        occurred_at: "2026-09-28T10:15:22.787Z"
        payload_digest: "sha256:06fd1c5d4f750140799346de9c3d3fa360755274cfc9917577fe160b687f0474"
        task_id: "202609261720-KKE9ZN"
        task_revision: 97
      -
        command_digest: "sha256:8754e3ed15764b6c01161aeb33f3f05f86b9309864f8b6343932a1e668a22d87"
        id: "validation-resolution:sha256:1d36a603960213f3c1a4ecba796d6de0b6af12be297068ff06b979ac2c7bb623:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1d36a603960213f3c1a4ecba796d6de0b6af12be297068ff06b979ac2c7bb623"
        occurred_at: "2026-09-28T10:15:31.204Z"
        payload_digest: "sha256:c1e023812a14084522bc5c53b1a2b370d1957d72cd4744f3e50062e785d008c6"
        task_id: "202609261720-KKE9ZN"
        task_revision: 98
      -
        command_digest: "sha256:fa041075917f58240554127793064460b931ca4a719c901c618b34585e2abad2"
        id: "kernel_work_item_claim_required:sha256:8e64e7a4e805b45eea8b4d2290a77242c4fa5da8b9d4288fe2e279d3d1f374df:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8e64e7a4e805b45eea8b4d2290a77242c4fa5da8b9d4288fe2e279d3d1f374df:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
        occurred_at: "2026-09-28T10:15:44.287Z"
        payload_digest: "sha256:5583b0225b1f78f895b6068784b238279be5961b523f271b6918bc8c20ade1cb"
        task_id: "202609261720-KKE9ZN"
        task_revision: 99
      -
        command_digest: "sha256:4013f135384df1ecd53bfb7a73cfb8a0ebb7492cab30c279b0bb36bf007c997e"
        id: "kernel_work_item_execution_required:sha256:da02844e3b97c69c942f2f7a37f05772a96a0f99eb31914eb87424d62e258819:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:da02844e3b97c69c942f2f7a37f05772a96a0f99eb31914eb87424d62e258819:sha256:8747434e2937e2a5601ca2babb60a3d6135323a51b5db00c55d30ecd8c90afbd"
        occurred_at: "2026-09-28T10:15:53.727Z"
        payload_digest: "sha256:1e547aa6b661ef9d55ff2f0a7a42d8420194cca00bc643e46a97178f2340c6a0"
        task_id: "202609261720-KKE9ZN"
        task_revision: 100
      -
        command_digest: "sha256:a3c66a98f4821a6bccf335fd0fd2487768456a269603842c547244ee7089b086"
        id: "sha256:15cd3d8dcc82b9236627b5fe080258d0ef783389cc598e2a01812fce2bb82620:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:15cd3d8dcc82b9236627b5fe080258d0ef783389cc598e2a01812fce2bb82620"
        occurred_at: "2026-09-28T10:19:19.474Z"
        payload_digest: "sha256:6d117424f23f893864228faf5566772ad95ca13471e8eecc8130599dd9984b76"
        task_id: "202609261720-KKE9ZN"
        task_revision: 101
      -
        command_digest: "sha256:b3f65414abffea3c2a37b533493036be42c4c5c4cd10547d3772cd41a8cd2fb5"
        id: "semantic-stop:sha256:04f214d742370d265ea4322392cb14c30fe6b8b93b212888179552cad23ef894:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:04f214d742370d265ea4322392cb14c30fe6b8b93b212888179552cad23ef894"
        occurred_at: "2026-09-28T10:19:30.187Z"
        payload_digest: "sha256:cf8a2148b487a801169bfda2cd8b476040c7b342abe7ac306f09228427ddcdc3"
        task_id: "202609261720-KKE9ZN"
        task_revision: 102
      -
        command_digest: "sha256:a9b6f23405e8607e3beab839fc9fa3822da9838d5c3f7bab86d9672bb911f84e"
        id: "sha256:e1ec587d9dda9117406908a2a48f44f9a8ecfa5dd94fffe7875603b9d355f39a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e1ec587d9dda9117406908a2a48f44f9a8ecfa5dd94fffe7875603b9d355f39a"
        occurred_at: "2026-09-28T10:23:16.567Z"
        payload_digest: "sha256:a0602636f2469d7e73f58c820c27f920285041ea21f47f408a877fb7c6231a3a"
        task_id: "202609261720-KKE9ZN"
        task_revision: 103
      -
        command_digest: "sha256:a330ee96e07d6daa26018c886447eb248c4b626a3a99bc65c92d8dc8f28abbf8"
        id: "work-item-resume:sha256:87fa907c8e4b36d63a0107ede6dce8a85383ee5c0e01ddebc2d9ec3d85278f74:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "work-item-resume:sha256:87fa907c8e4b36d63a0107ede6dce8a85383ee5c0e01ddebc2d9ec3d85278f74"
        occurred_at: "2026-09-28T10:24:28.815Z"
        payload_digest: "sha256:9016e6712ee15b09f27ddc52e8d70a62c92e339a444706686796ba496678ac59"
        task_id: "202609261720-KKE9ZN"
        task_revision: 104
      -
        command_digest: "sha256:3f81d576b8717900d71e5066fef22c207d213e6280d281ceb9f42b979f4f8577"
        id: "kernel_work_item_claim_required:sha256:2996a9f28eb353ede6bb7c6eeecb18a90992e23a1d87091cdb569dab49d960fb:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:2996a9f28eb353ede6bb7c6eeecb18a90992e23a1d87091cdb569dab49d960fb:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1"
        occurred_at: "2026-09-28T10:25:11.674Z"
        payload_digest: "sha256:f90873b78923c6f8fb285d1df1545b42313cb26b86edf2bf6daeefb889dec8d3"
        task_id: "202609261720-KKE9ZN"
        task_revision: 105
      -
        command_digest: "sha256:58885b8ef970eb7cb66789a6cf73e9adca21216de30985d28b9063320c948efe"
        id: "kernel_work_item_execution_required:sha256:418d50a6403ad49b52ae628afe6ab9e7e353ffbf9bc3d7f9403e8d0c667988d4:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:418d50a6403ad49b52ae628afe6ab9e7e353ffbf9bc3d7f9403e8d0c667988d4:sha256:9fcf8f7db1ab3bc9d6436a0667e902c6fb497a18e61ebcc72cb7d24104b995f1"
        occurred_at: "2026-09-28T10:25:21.355Z"
        payload_digest: "sha256:a0bc2fb4beda4c019bb13e7aef680b89bc1cc1ea4ee41b6307d8934def4aa2d3"
        task_id: "202609261720-KKE9ZN"
        task_revision: 106
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12

User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.

## Scope

- In scope: User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12".

## Plan

1. Execute approved WorkItem PL-01.
2. Execute approved WorkItem PL-02.
3. Execute approved WorkItem PL-03.
4. Execute approved WorkItem PL-04.
5. Execute approved WorkItem PL-05.
6. Execute approved WorkItem PL-06.
7. Execute approved WorkItem PL-07.
8. Execute approved WorkItem PL-08.
9. Execute approved WorkItem PL-09.
10. Execute approved WorkItem PL-10.
11. Execute approved WorkItem PL-11.
12. Execute approved WorkItem PL-12.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run package:install-smoke`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
