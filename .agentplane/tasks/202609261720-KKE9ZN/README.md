---
id: "202609261720-KKE9ZN"
title: "Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
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
  updated_at: "2026-09-26T17:23:38.987Z"
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
commit: null
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
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:2dfe935b364c17470b33f027090fe1d0e0333efeda6a094646d178c310466e1b"
        digest: "sha256:7c216e5b223db41358af03b5ff99d092654d854213b0bdd2e8f9b9bef14f0ef1"
        revision: 1
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
      effects: []
      final_validation: null
      id: "202609261720-KKE9ZN"
      intent_digest: "sha256:7c075ed50baa30cbcafa249324a53a9f7e5cc2fa59a8132955535292720ed3f0"
      migration_receipts: []
      mutation_receipts:
        capture:202609261720-KKE9ZN:
          after_revision: 1
          aggregate_digest: "sha256:59452ef5f1b66eb4fa53b98e3d4ea95fd53383f717aaa252c5ba173d8cc5ae4a"
          before_revision: 0
          command_digest: "sha256:db80e44dc03ebedb557a4bff84882bbf822b1d8b2662d2b7259e2babd705742f"
          effect_ids: []
          event_digests:
            - "sha256:a611744cb3747a5d7f94fe3a50fe3159e33027ef4588033ff473740c1d9e974f"
          mutation_id: "capture:202609261720-KKE9ZN"
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
        kernel_work_item_materialization_required:sha256:40146b02fd43109a5a07bf042b5175eea1621571256361248f8f810e893c798d:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e:
          after_revision: 4
          aggregate_digest: "sha256:917412e1429d3fe50953343f4924ffe97a7eb4c154953deb318e9f2f9c3d247e"
          before_revision: 3
          command_digest: "sha256:351b7abcea85256f404984227c1c6c2fc572510053ac13f176c03ac4c4272f68"
          effect_ids: []
          event_digests:
            - "sha256:5f24e8df17ba5168365f4742787c93c3bab95da4b86c5e78af8e4e5c45051da0"
          mutation_id: "kernel_work_item_materialization_required:sha256:40146b02fd43109a5a07bf042b5175eea1621571256361248f8f810e893c798d:sha256:c1f6087d3acd3dfba0fe06ef2a0c478318a8615d44e0e4b20d3e0a31d8d4ae9e"
        result:sha256:751a43ec0baffbfe76dcefdec903be54f17ec985830a4acfcc268b22b747018a:
          after_revision: 2
          aggregate_digest: "sha256:853a5cb55edafc2bb0cafb22d61a0787c980a1d58cb56362f4bb2eb7bc274e05"
          before_revision: 1
          command_digest: "sha256:39f78f8e4a04c946e6963aee378dbebabddb2d98619684c40b73fbd97c42814f"
          effect_ids: []
          event_digests:
            - "sha256:06af936de5952b9764023cc699a40ed61d11e66cbe94defef0fd5feeb03c485f"
          mutation_id: "result:sha256:751a43ec0baffbfe76dcefdec903be54f17ec985830a4acfcc268b22b747018a"
        sha256:75d6eca564b7f79167f58dd7a39d6a55dfd18b744497b2c5b0d5292ea16670fa:
          after_revision: 8
          aggregate_digest: "sha256:68e852950c421a33a035285a1f6a3ecde439a8c92f3fa9585e04781784b656b9"
          before_revision: 7
          command_digest: "sha256:035148dfb4e0fcf0bea510c2e6908a41b24f3a104cfd1cbb319d92aa2e986414"
          effect_ids: []
          event_digests:
            - "sha256:7ad9306f4803058ffcf3c943d560ed403629821e4bc37fad5cc216286c91e60a"
          mutation_id: "sha256:75d6eca564b7f79167f58dd7a39d6a55dfd18b744497b2c5b0d5292ea16670fa"
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
      plan_history: []
      revision: 8
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
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
        PL-02:
          attempt: 0
          claim_id: null
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
            expected_outputs:
              - "PL-02-result"
            id: "PL-02"
            optional: false
            required_inputs:
              - "PL-01-result"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-03:
          attempt: 0
          claim_id: null
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
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-04:
          attempt: 0
          claim_id: null
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
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-05:
          attempt: 0
          claim_id: null
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
            expected_outputs:
              - "PL-05-result"
            id: "PL-05"
            optional: false
            required_inputs:
              - "PL-04-result"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-06:
          attempt: 0
          claim_id: null
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
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-07:
          attempt: 0
          claim_id: null
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
            expected_outputs:
              - "PL-07-result"
            id: "PL-07"
            optional: false
            required_inputs:
              - "PL-06-result"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-08:
          attempt: 0
          claim_id: null
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
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-09:
          attempt: 0
          claim_id: null
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
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-10:
          attempt: 0
          claim_id: null
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
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-11:
          attempt: 0
          claim_id: null
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
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        PL-12:
          attempt: 0
          claim_id: null
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
          revision: 1
          state: "PLANNED"
          validation: null
    digest: "sha256:90577a55d1ab8c84490b1e1c8b85306f0b498591ebc87b904e8f2c633b19f8c3"
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
