---
id: "202610041748-K43XFE"
title: "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 28
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "security"
verify:
  - "bun run schemas:check"
  - "bun run test:release:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-05T11:48:45.283Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-05T11:28:33.292Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:618a4278260b812e37b7e3e84d7fafa13d6f8ae46e23f504dfc317c1a50db9b9"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-05T11:48:45.283Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "19bff74090246d2bd802fe0fb017b6e8feb19ad5"
  review_identity_digest: "sha256:f6b89f6f906940ea8a673c66c6b4cee451b1bc78c5ea4621e6cbae0851dd0204"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610041748-K43XFE/ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000/quality-report.json"
  findings:
    - "Verified work-order source digest, all 13 required context blocks and byte lengths, all four required inputs, native validation input digest and issued result-schema bytes. Git HEAD and tree match repository evidence (19bff74090246d2bd802fe0fb017b6e8feb19ad5; 3ef06cb1609d66adfbbee6054e1b0bead995243e). Reviewed Recipe source has no working-tree changes against the frozen commit."
    - "Criterion-1: parser rejects duplicate declarations; binding lists and Maps reject duplicate or unknown names without prototype lookup. Resolver enforces string, boolean, safe integer and repo_path values, preserves explicit false/zero and reports missing required names. Shared lexical path validation rejects absolute, drive-qualified, backslash, parent-traversal, empty-component and control-character paths, both for values/defaults and assembled path fields."
    - "Criteria-2 and 3: exact field allowlists permit substitution only in semantic text and path fields; path substitutions additionally require repo_path declarations. Other fields reject placeholder delimiters, including commands, capabilities, WorkItem/dependency/input/output IDs and non-path resource identities. replaceAll uses a callback once and rejects unresolved delimiters afterward, so nested placeholders and replacement-string or shell syntax cannot change commands or identifiers. No expression evaluation, recursive interpolation or shell execution is introduced."
    - "Criterion-4: inspected diff changes only Recipe resolver/parser utilities, exports and focused tests. V1 reader and all Kernel coordination, approval/result binding and independent EVALUATOR controls remain unchanged. New resolver has no filesystem observation, Plan admission or task mutation."
    - "Inspected AgentPlane native-validation receipt bound to the implementation result, repository evidence, commands, runtime, toolchain and environment. It records 51 focused parameter tests passed and typecheck exit 0. I reviewed the test assertions and receipt without running verification commands in this read-only episode."
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
      - ".github"
      - "README.md"
      - "agentplane-roadmap-r2"
      - "artifacts"
      - "bun.lock"
      - "docs"
      - "integrations"
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
      - ".github"
      - "README.md"
      - "agentplane-roadmap-r2"
      - "artifacts"
      - "bun.lock"
      - "docs"
      - "integrations"
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
          - ".github"
          - "README.md"
          - "agentplane-roadmap-r2"
          - "artifacts"
          - "bun.lock"
          - "docs"
          - "integrations"
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
      digest: "sha256:04409f4f3b3219094ce63e8b0470506b8216709205272991e6f96ea46a6da487"
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
  hash: "19bff74090246d2bd802fe0fb017b6e8feb19ad5"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-04T17:48:52.819Z"
doc_updated_by: "CODER"
description: "User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets."
sections:
  Summary: |-
    Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release

    User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.
  Scope: |-
    - In scope: User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.
    - Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release".
  Plan: |-
    1. Execute approved WorkItem rc-01.
    2. Execute approved WorkItem rc-02.
    3. Execute approved WorkItem rc-03.
    4. Execute approved WorkItem rc-04.
    5. Execute approved WorkItem rc-05.
    6. Execute approved WorkItem rc-06.
    7. Execute approved WorkItem rc-07.
    8. Execute approved WorkItem rc-08.
    9. Execute approved WorkItem rc-09.
    10. Execute approved WorkItem rc-10.
    11. Execute approved WorkItem rc-11.
    12. Execute approved WorkItem rc-12.
    13. Execute approved WorkItem rc-13.
    14. Execute approved WorkItem rc-14.
    15. Execute approved WorkItem rc-15.
    16. Execute approved WorkItem rc-16.
    17. Execute approved WorkItem rc-17.
    18. Execute approved WorkItem rc-18.
  Verify Steps: |-
    PLANNER fallback scaffold for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.kernel_operational_projection:
    digest: "sha256:675af24f2e70e2e3b24776c737be4c0b4f12b1416eb137037b4fa87b9b30dcc3"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610041748-K43XFE/ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000/quality-report.json"
    findings:
      - "Verified work-order source digest, all 13 required context blocks and byte lengths, all four required inputs, native validation input digest and issued result-schema bytes. Git HEAD and tree match repository evidence (19bff74090246d2bd802fe0fb017b6e8feb19ad5; 3ef06cb1609d66adfbbee6054e1b0bead995243e). Reviewed Recipe source has no working-tree changes against the frozen commit."
      - "Criterion-1: parser rejects duplicate declarations; binding lists and Maps reject duplicate or unknown names without prototype lookup. Resolver enforces string, boolean, safe integer and repo_path values, preserves explicit false/zero and reports missing required names. Shared lexical path validation rejects absolute, drive-qualified, backslash, parent-traversal, empty-component and control-character paths, both for values/defaults and assembled path fields."
      - "Criteria-2 and 3: exact field allowlists permit substitution only in semantic text and path fields; path substitutions additionally require repo_path declarations. Other fields reject placeholder delimiters, including commands, capabilities, WorkItem/dependency/input/output IDs and non-path resource identities. replaceAll uses a callback once and rejects unresolved delimiters afterward, so nested placeholders and replacement-string or shell syntax cannot change commands or identifiers. No expression evaluation, recursive interpolation or shell execution is introduced."
      - "Criterion-4: inspected diff changes only Recipe resolver/parser utilities, exports and focused tests. V1 reader and all Kernel coordination, approval/result binding and independent EVALUATOR controls remain unchanged. New resolver has no filesystem observation, Plan admission or task mutation."
      - "Inspected AgentPlane native-validation receipt bound to the implementation result, repository evidence, commands, runtime, toolchain and environment. It records 51 focused parameter tests passed and typecheck exit 0. I reviewed the test assertions and receipt without running verification commands in this read-only episode."
    implementation_commit: "19bff74090246d2bd802fe0fb017b6e8feb19ad5"
    implementation_tree: "3ef06cb1609d66adfbbee6054e1b0bead995243e"
    projected_at: "2026-10-05T11:48:45.283Z"
    review_identity_digest: "sha256:f6b89f6f906940ea8a673c66c6b4cee451b1bc78c5ea4621e6cbae0851dd0204"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:dd94184e856b0e6d24da48305ed0e07616ee251bddcf65189294ca2ae3e113ab"
    work_order_id: "sha256:83d37cd21d96abc5446f4a9bb1017296689acf5115895dd2310a6466ff4f4dc8"
  task_execution_context:
    base_ref: "origin/main"
    base_sha: "65696d9032b77e80e31c6bca7668a5f32c99c443"
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
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1e78960503f38ce62ea0534d83c91e66244e507d4c7922645097d4f31a08611c"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:27d4f31435ec772b5acf7899dd75d5b727e921b6709eb7d873b84b23578c8dbb"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
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
            repository_fingerprint: "sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".github"
              - "README.md"
              - "agentplane-roadmap-r2"
              - "artifacts"
              - "bun.lock"
              - "docs"
              - "integrations"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202610041748-K43XFE"
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
            digest: "sha256:d7ef76174fa8bf13fe54fb45b0e5aefd6698a66783d8e9eaecba8dcb13cb3d2f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492"
            plan_revision: 2
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:1e78960503f38ce62ea0534d83c91e66244e507d4c7922645097d4f31a08611c"
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
            repository_fingerprint: "sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".github"
              - "README.md"
              - "agentplane-roadmap-r2"
              - "artifacts"
              - "bun.lock"
              - "docs"
              - "integrations"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202610041748-K43XFE"
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
            evidence_digest: "sha256:8feb5d6787ee82819883b509ecee2334ea20c6d475cf998faff5e0775e83a96f"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5ed8d172a5553ad6396574c1f2339e9e925d705fefeb1f37497806089ff83bd7"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492"
            plan_revision: 2
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d7ef76174fa8bf13fe54fb45b0e5aefd6698a66783d8e9eaecba8dcb13cb3d2f"
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
            repository_fingerprint: "sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".github"
              - "README.md"
              - "agentplane-roadmap-r2"
              - "artifacts"
              - "bun.lock"
              - "docs"
              - "integrations"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202610041748-K43XFE"
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
              - "packages/core/src/tasks/index.ts"
              - "packages/recipes/package.json"
              - "packages/recipes/src/index.ts"
              - "packages/recipes/src/resolver-contracts.ts"
              - "packages/recipes/src/roadmap-scenario-v2-parser.test.ts"
              - "packages/recipes/src/scenario-contracts.ts"
              - "packages/recipes/src/scenario-v2.ts"
              - "packages/recipes/src/scenario.ts"
              - "packages/recipes/tsconfig.json"
            evidence_digest: "sha256:8786c8e991c86497918f09c8fb4d43a9763f284e9a9f8ceb2157ef478e7fd78a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:aee71a8adbf6a6c0542b03620aba34d6265b822f158f7cc70bf0768497fb3ef8"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492"
            plan_revision: 2
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5ed8d172a5553ad6396574c1f2339e9e925d705fefeb1f37497806089ff83bd7"
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
            repository_fingerprint: "sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".github"
              - "README.md"
              - "agentplane-roadmap-r2"
              - "artifacts"
              - "bun.lock"
              - "docs"
              - "integrations"
              - "package.json"
              - "packages"
              - "schemas"
              - "scripts"
            task_id: "202610041748-K43XFE"
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
              - "packages/recipes/src/index.ts"
              - "packages/recipes/src/internal-utils.ts"
              - "packages/recipes/src/roadmap-recipe-parameters.test.ts"
              - "packages/recipes/src/scenario-parameters.ts"
              - "packages/recipes/src/scenario-v2.ts"
            evidence_digest: "sha256:aca4cd6e145c094959e23f8447317fb7c7cc2ab7be0b13ca104f865003ad7405"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:a00a2b31c55f42081408ce59e54f7c118f4e340e58dadb166176d9c988a206ba"
        digest: "sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:cdb49231dec97508938e2a8af5dea4aa19ed54120c863dc25d01f0a145c8e055"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
                - "bun.lock"
            expected_outputs:
              - "rc-01-evidence"
            id: "rc-01"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:92aa238f9200037fd81d7fbb85fcf26655ed37f7946c1cc1d9821dc428e8f67a"
            depends_on:
              - "rc-01"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-02-evidence"
            id: "rc-02"
            optional: false
            required_inputs:
              - "rc-01-evidence"
          -
            contract_digest: "sha256:90f2652eef882e38bda4e099a81adcb6dc5fb7df9c623163a4a148ffff39b161"
            depends_on:
              - "rc-02"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-03-evidence"
            id: "rc-03"
            optional: false
            required_inputs:
              - "rc-02-evidence"
          -
            contract_digest: "sha256:64eff4b6ef097d131d50c6d132de631a12d97702c666ec4922a478ed63889059"
            depends_on:
              - "rc-03"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-04-evidence"
            id: "rc-04"
            optional: false
            required_inputs:
              - "rc-03-evidence"
          -
            contract_digest: "sha256:c45ac6ad29ef95e928e1584e92410226ac3952d1b608e4cb948bc1794c4fd644"
            depends_on:
              - "rc-04"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-05-evidence"
            id: "rc-05"
            optional: false
            required_inputs:
              - "rc-04-evidence"
          -
            contract_digest: "sha256:ffb10c3dd45986f20c4f8b10b9a04e6a388bd92db7aa0ccfe7b0d78c79472e3a"
            depends_on:
              - "rc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-06-evidence"
            id: "rc-06"
            optional: false
            required_inputs:
              - "rc-05-evidence"
          -
            contract_digest: "sha256:cb5dd46b684450549433c03340db919965e469fcfd572c6ac817a2836fc2064c"
            depends_on:
              - "rc-06"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-07-evidence"
            id: "rc-07"
            optional: false
            required_inputs:
              - "rc-06-evidence"
          -
            contract_digest: "sha256:4b2ef87bddaf81ae1ea9d19212bd82c3a638530211fe69f75f35194eb49b5239"
            depends_on:
              - "rc-07"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-08-evidence"
            id: "rc-08"
            optional: false
            required_inputs:
              - "rc-07-evidence"
          -
            contract_digest: "sha256:c3207d2d4da67c3ffda03271e55637199a27ab6aa2df7afcd8fd046b4d9ec94c"
            depends_on:
              - "rc-08"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-09-evidence"
            id: "rc-09"
            optional: false
            required_inputs:
              - "rc-08-evidence"
          -
            contract_digest: "sha256:15740414adc932929caaf03a2fef26a6b160cd84c517d5c7afb930f7781d9ade"
            depends_on:
              - "rc-09"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-10-evidence"
            id: "rc-10"
            optional: false
            required_inputs:
              - "rc-09-evidence"
          -
            contract_digest: "sha256:b31d894e9c4360016933ca01209d7922e0e2a80b1802f2177989937d9dbdd0ec"
            depends_on:
              - "rc-10"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-11-evidence"
            id: "rc-11"
            optional: false
            required_inputs:
              - "rc-10-evidence"
          -
            contract_digest: "sha256:f995900bfeffb19f2ddf63ad200cf40acc598bb2820cc5f62e747a7a1c95e1de"
            depends_on:
              - "rc-11"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-12-evidence"
            id: "rc-12"
            optional: false
            required_inputs:
              - "rc-11-evidence"
          -
            contract_digest: "sha256:f5d66b7e5636d4bb3dd75bb17b9e7c473ea1227d93fe35e0c3cadddb907ad696"
            depends_on:
              - "rc-12"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-13-evidence"
            id: "rc-13"
            optional: false
            required_inputs:
              - "rc-12-evidence"
          -
            contract_digest: "sha256:77de6fc592153f50cb3a20e4f96c664f2c89f016bfcc8378ab0af394bcfa0be1"
            depends_on:
              - "rc-13"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-14-evidence"
            id: "rc-14"
            optional: false
            required_inputs:
              - "rc-13-evidence"
          -
            contract_digest: "sha256:33bf690ae7b729d27d0b55bd9e2f67adba6ffb664f5a77ee2af5864268dd1315"
            depends_on:
              - "rc-14"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-15-evidence"
            id: "rc-15"
            optional: false
            required_inputs:
              - "rc-14-evidence"
          -
            contract_digest: "sha256:76b40bbbbc441f0dbae0b5b1f1f0d42a20532e5e5a3f824703512ac01a356281"
            depends_on:
              - "rc-15"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
                - "ci"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
                - "scripts/release"
                - "scripts/bench"
                - "artifacts"
                - "agentplane-roadmap-r2"
                - "docs"
                - "package.json"
                - "bun.lock"
                - "README.md"
                - ".github"
                - "integrations"
            expected_outputs:
              - "rc-16-evidence"
            id: "rc-16"
            optional: false
            required_inputs:
              - "rc-15-evidence"
          -
            contract_digest: "sha256:1b0ae37229e0b16f45631a427960fb44617c4485ec61787a3f09aec272092c8a"
            depends_on:
              - "rc-16"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
                - "ci"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
                - "scripts/release"
                - "scripts/bench"
                - "artifacts"
                - "agentplane-roadmap-r2"
                - "docs"
                - "package.json"
                - "bun.lock"
                - "README.md"
                - ".github"
                - "integrations"
            expected_outputs:
              - "rc-17-evidence"
            id: "rc-17"
            optional: false
            required_inputs:
              - "rc-16-evidence"
          -
            contract_digest: "sha256:3888f0e74f59c99d36e1961ce59af2d24385b52e917fb97a1cf5bee0df82ebc0"
            depends_on:
              - "rc-17"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "schema"
                - "tests"
                - "ci"
                - "release_metadata"
              resources: []
              scope_roots:
                - "docs"
                - "packages/recipes"
                - "schemas"
                - "agentplane-roadmap-r2"
                - "artifacts"
                - "README.md"
            expected_outputs:
              - "rc-18-evidence"
            id: "rc-18"
            optional: false
            required_inputs:
              - "rc-17-evidence"
      effects: []
      final_validation: null
      id: "202610041748-K43XFE"
      intent_digest: "sha256:6f70bdb801147e3373cb984261c7a95567ab32520321ba527a162b23d93eb5f0"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492:
          after_revision: 8
          aggregate_digest: "sha256:356b6adde60c5b183aaa7bb5ce3911ad13ea1177520d5480ceadd21c89990b17"
          before_revision: 7
          command_digest: "sha256:90ccb51e791e007a38eb888af46ab0c56dc12a93933f93163ac193471bd1a6a1"
          effect_ids: []
          event_digests:
            - "sha256:3f133ee04e2420346ce66016d4a858732a259fa99643e34000cbb40f4db77de1"
          mutation_id: "amend:sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492"
        capture:202610041748-K43XFE:
          after_revision: 1
          aggregate_digest: "sha256:91a0d450ad8c99e0f37f5fbbec222763f3eda75dade1b7a0059d51224ed6cd90"
          before_revision: 0
          command_digest: "sha256:97044d87bbe2afdf30f80307ae6e7832e866a9614d9e3bee895e9fea0232c176"
          effect_ids: []
          event_digests:
            - "sha256:892fbf2ebda2527fcb8b88df498902d79e869698c4e38d570983ff645d9ff615"
          mutation_id: "capture:202610041748-K43XFE"
        kernel_work_item_claim_required:sha256:59e141efac5175977b1c0fddbe4db2b966af96416439e132344b44b0c2a8813d:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:
          after_revision: 17
          aggregate_digest: "sha256:41fac9eef3d2db6ff1e9fb4fb2bd93447098b6b678cd80e859a38ec40d424adf"
          before_revision: 16
          command_digest: "sha256:27b20addffa85ada2fd85d263850ad2a261313b9921e035d95a1d0f5db32a0cb"
          effect_ids: []
          event_digests:
            - "sha256:fb07f1168566cee7bfe8441b6ca95e1414bf33b349ba21de7dac297e57bee8bb"
          mutation_id: "kernel_work_item_claim_required:sha256:59e141efac5175977b1c0fddbe4db2b966af96416439e132344b44b0c2a8813d:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        kernel_work_item_claim_required:sha256:9561e19b4dc85cc8f92a08236c535fbb0e0637a000d912883902bdd92989b141:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:
          after_revision: 24
          aggregate_digest: "sha256:0d35715122c0ffc5afa22c093229c2f4828c6b848c0eb26e3c619c7f591bf8ee"
          before_revision: 23
          command_digest: "sha256:82c0d31b882bdb4c18918ce64175d52663435662a5f238982dac501decdb1aa2"
          effect_ids: []
          event_digests:
            - "sha256:33d4b172cf7c99c76ed17e3e8f8bb6fdc1ba6fb16816613cb5baa02ac10ad033"
          mutation_id: "kernel_work_item_claim_required:sha256:9561e19b4dc85cc8f92a08236c535fbb0e0637a000d912883902bdd92989b141:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        kernel_work_item_claim_required:sha256:b17adbd4537d64c4495c3d9439552bf67f014beddb8a736cb87896196ca4fd67:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 5
          aggregate_digest: "sha256:77adeaa5cc3a3cb5877a9be14e973fb7f43be19b9173ee2c63a8b7597578fd94"
          before_revision: 4
          command_digest: "sha256:0f579dcb4674c1ad06918cd8061462a23f916aa7d50c41a188a8cc38af559b4c"
          effect_ids: []
          event_digests:
            - "sha256:b24125594490ee0e1c67d31fdd349ea269e71aa3784fe0f24441ffd920d792fe"
          mutation_id: "kernel_work_item_claim_required:sha256:b17adbd4537d64c4495c3d9439552bf67f014beddb8a736cb87896196ca4fd67:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_claim_required:sha256:fae9bc2af7d722f0e81823b3cc689b1da30ef09dd8b7486c1fdb140a750ddc4a:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 10
          aggregate_digest: "sha256:c3d51e18e27d824638368795988d28a56143f6d6b43e4739752171281ab6ca08"
          before_revision: 9
          command_digest: "sha256:56e5a1f10d7afc1f4e1dd6a16b58ee71a7787509247b86e2d03c5e4d2292594a"
          effect_ids: []
          event_digests:
            - "sha256:40c7cd51ac0ac0674f4aff47708f60e95947484d22f0df2436fef2a7a5eac31b"
          mutation_id: "kernel_work_item_claim_required:sha256:fae9bc2af7d722f0e81823b3cc689b1da30ef09dd8b7486c1fdb140a750ddc4a:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_execution_required:sha256:3023b0d03a890e77b64a7664159ccea50ae4f62593fed4ee829c2047fbd00c68:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 6
          aggregate_digest: "sha256:944bc99a8aa15148a532d2eb2001db52484c6c8fa24caa0be170daf77c48a48f"
          before_revision: 5
          command_digest: "sha256:6330fe6f57620ea75485353744e1508b097b56aaffa33659ad0ef16bfc8609c1"
          effect_ids: []
          event_digests:
            - "sha256:b9686121e60db44bae1f22dcae24901e47aa1e1063d201f477421a682f07f9b3"
          mutation_id: "kernel_work_item_execution_required:sha256:3023b0d03a890e77b64a7664159ccea50ae4f62593fed4ee829c2047fbd00c68:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_execution_required:sha256:4157967ed43bce4627426934f36925524ec8f55b423ede6776146a2d22e190cf:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 11
          aggregate_digest: "sha256:e1bea100e26c0562682b5c762555e5252d50532e89135862e6651d54ff3a89ff"
          before_revision: 10
          command_digest: "sha256:6b90823221f5d1fc3fe8de28b11b245d366ac913f0474c8370810ee9131267b3"
          effect_ids: []
          event_digests:
            - "sha256:2f229958cd726de7ce8941a1f5057565f53be793eb62dc49bb5256531d59fa7f"
          mutation_id: "kernel_work_item_execution_required:sha256:4157967ed43bce4627426934f36925524ec8f55b423ede6776146a2d22e190cf:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_execution_required:sha256:62687f82153f5367a3bd81ecac7f8d988ff7846e08911458173a260a83d6e8a6:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:
          after_revision: 18
          aggregate_digest: "sha256:c21d4fdbe29bd6ce14f6d2b69e7b00be48f11c6794731790cb85fb0c5d3c0f71"
          before_revision: 17
          command_digest: "sha256:adae0b67cf777d2e114a5675b0d8a849320c6ab43d0095a339f8339a8fc24b82"
          effect_ids: []
          event_digests:
            - "sha256:9dd0dfa1eaa46b1c5e4efffd79dd551be7289b95b4261654376feb1900ddfe88"
          mutation_id: "kernel_work_item_execution_required:sha256:62687f82153f5367a3bd81ecac7f8d988ff7846e08911458173a260a83d6e8a6:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        kernel_work_item_execution_required:sha256:9b1e87fe492da2b2f6cfe3e017b30d9b7ab69070fd299beb023cb798b06d7bf5:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:
          after_revision: 25
          aggregate_digest: "sha256:224fbbc81b81e68f440a915c10ef9a25469ecdf2e691ac07fb30d668514ef18d"
          before_revision: 24
          command_digest: "sha256:32d1453c6d945f65b629f41a2564246c974bd906974d8a923f6571ceb7b3b396"
          effect_ids: []
          event_digests:
            - "sha256:7b16be2026d8f31a5745f511bdc6c39690b14e4c5ca576dcaf050c48ec3996cd"
          mutation_id: "kernel_work_item_execution_required:sha256:9b1e87fe492da2b2f6cfe3e017b30d9b7ab69070fd299beb023cb798b06d7bf5:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        kernel_work_item_inspection_required:sha256:8e171f1cea2844450cac768d5bbad8d4bfb3ff75b8ae874e8381c99fbd83ef67:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:
          after_revision: 14
          aggregate_digest: "sha256:2cc139201ca902a6cb98f517b4214e8e6a6874f95970386c4ce3150d18625ad3"
          before_revision: 13
          command_digest: "sha256:67a6d3d7c683cbdfa82728edfa467b8c711cda4b607203a7683dde7072d2a133"
          effect_ids: []
          event_digests:
            - "sha256:ed21a6f2048ec66a698f09df741b0f031a8caf7745c13c643e015f4174c4ebaa"
          mutation_id: "kernel_work_item_inspection_required:sha256:8e171f1cea2844450cac768d5bbad8d4bfb3ff75b8ae874e8381c99fbd83ef67:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        kernel_work_item_inspection_required:sha256:9ce250ff40ad6025ccb5c9af253a9a57fe701056e05f68ca25c0cf438c5096ce:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:
          after_revision: 21
          aggregate_digest: "sha256:3358c7a8e253defd76cf6644ecd918f837df11201f5bc3b06a7320085c6cfe06"
          before_revision: 20
          command_digest: "sha256:f8e33a1107576097b0e1f016d51ebe7e608786432d4288747127894c453bda30"
          effect_ids: []
          event_digests:
            - "sha256:f1a71dcf02cf49f15905689e01ba10c696e8022b69e227149c66aac135445b7a"
          mutation_id: "kernel_work_item_inspection_required:sha256:9ce250ff40ad6025ccb5c9af253a9a57fe701056e05f68ca25c0cf438c5096ce:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        kernel_work_item_materialization_required:sha256:5f544ab1173ce36c78d2c26bfe10f136d61ab620de62731f5dcd16cc7486a4db:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 4
          aggregate_digest: "sha256:a65bf8d6416f9d6404095f610f4ac7a2545ffac313f76542e6295a9358d98529"
          before_revision: 3
          command_digest: "sha256:cbecbdb81ed5ca2f3e45f7a44084c6fff4eb2e6b0f0a842eef59ba4bad32f577"
          effect_ids: []
          event_digests:
            - "sha256:74538b28546cb50bf9ef321485847a3100e0c0e6997c3b37e232a7067bb6ebe3"
          mutation_id: "kernel_work_item_materialization_required:sha256:5f544ab1173ce36c78d2c26bfe10f136d61ab620de62731f5dcd16cc7486a4db:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        result:sha256:189b3fb943ed048d2fca0bf3605c715032f65bc8d4c9c9b7c3aa087ff6f6c42e:
          after_revision: 2
          aggregate_digest: "sha256:796d47cb6ec4b4075110c206631836cf767b3cd30e82516e35ff6bb907ce66fc"
          before_revision: 1
          command_digest: "sha256:72f06bb11306350a93146881ca6bb70ac58d55b9c426eb50cab8536dac414a94"
          effect_ids: []
          event_digests:
            - "sha256:8c14efe971ef31a92b19ac732c014068671b88c8e93ca8d14b68d6358542254b"
          mutation_id: "result:sha256:189b3fb943ed048d2fca0bf3605c715032f65bc8d4c9c9b7c3aa087ff6f6c42e"
        result:sha256:83d37cd21d96abc5446f4a9bb1017296689acf5115895dd2310a6466ff4f4dc8:
          after_revision: 20
          aggregate_digest: "sha256:5650db6588b7259127042b551cf5818e12fa03de7882c513731c6954474608f9"
          before_revision: 19
          command_digest: "sha256:146920b394eee858228028e7c2f950aa213c81c3c439892b371f64b8ce33c0af"
          effect_ids: []
          event_digests:
            - "sha256:6c54c0a8eb3a53f6949cd5c0a34d057e16c1bf4bb0efb221c105dbc04d447306"
          mutation_id: "result:sha256:83d37cd21d96abc5446f4a9bb1017296689acf5115895dd2310a6466ff4f4dc8"
        result:sha256:b9c9f7771e7d3e13e1f6f4fc7cf5c74d7c0157d8b3a63995cb3b9e0cd76c0017:
          after_revision: 13
          aggregate_digest: "sha256:b12d834c9ff2a6e8ec8292fedad9601547932cf9fa2f29c1f2f9ea4cac1c799e"
          before_revision: 12
          command_digest: "sha256:a3bc03f1d360e6bb3c9f2eb67d00392f53209eb1c4dc32a627235f5726313bf8"
          effect_ids: []
          event_digests:
            - "sha256:b8f16771da04abffbb64bbe25627598b19f9feca403bb05f95485bd6fef7c027"
          mutation_id: "result:sha256:b9c9f7771e7d3e13e1f6f4fc7cf5c74d7c0157d8b3a63995cb3b9e0cd76c0017"
        semantic-stop:sha256:2354a97e6bee8d057a73172715428f7956156a3b6e5fbf813921f0eaf0d370c6:
          after_revision: 7
          aggregate_digest: "sha256:2328b425dcc1da30ab71fea074733ca6324edd9df708b8b132b7883211f9d7ff"
          before_revision: 6
          command_digest: "sha256:5bf94cec6944348f8a639dffa9b1b15ac9384ea8260e3aba11e9e543f174e515"
          effect_ids: []
          event_digests:
            - "sha256:237c1aa81fb28fb94ff1a28a5536d0288133efbba78a90599d953cac7a379a47"
          mutation_id: "semantic-stop:sha256:2354a97e6bee8d057a73172715428f7956156a3b6e5fbf813921f0eaf0d370c6"
        sha256:42057e84d78ab3f1499f8ef1aef995aecda6b2cf3ff6dec74fa4a25c0a354057:
          after_revision: 19
          aggregate_digest: "sha256:5954f0d856e4c4c5f916810f88274705b5003beecadd22e7461c35707c1bf7a1"
          before_revision: 18
          command_digest: "sha256:0d44c1c2e5bcc94ae04598a6ff58000cc0cf9652ccfc4887331efa92e638cdcf"
          effect_ids: []
          event_digests:
            - "sha256:3bc52d1394d9a4a85213b55b105ddf60c4657c321b6d00643810fe0d435534ef"
          mutation_id: "sha256:42057e84d78ab3f1499f8ef1aef995aecda6b2cf3ff6dec74fa4a25c0a354057"
        sha256:775517251e3348a835f420b9c6b53111096fcd9244df3a89e198aa389485eedd:
          after_revision: 9
          aggregate_digest: "sha256:c3475ded3aaf72793d4d9eea0939317ea706f66fddb9b09b9ff3d71515f41ed8"
          before_revision: 8
          command_digest: "sha256:d3448843f98526e83995c047e08dbd145eec97178755ba6acef8f308f05958e0"
          effect_ids: []
          event_digests:
            - "sha256:6b8655ad70c08da5aaad2ddf2ab2b1b9cf491586833229b692c6a1709bb6cd95"
          mutation_id: "sha256:775517251e3348a835f420b9c6b53111096fcd9244df3a89e198aa389485eedd"
        sha256:b8462d57028aa98cefc7556b777b259961b6049be39352cfcc1afce92e4d411d:
          after_revision: 3
          aggregate_digest: "sha256:c1766380b68b060ce3205a524a1cf63b7747824b871bd410b67af53a248c91ad"
          before_revision: 2
          command_digest: "sha256:87555486260108efe5149a644af26c0d5ddecee60f6673717dbcc1d66fac0bd1"
          effect_ids: []
          event_digests:
            - "sha256:5601cc9977880709b19bc7f87681ce9bc8f68934c7612ff2e99c5c06035f806c"
          mutation_id: "sha256:b8462d57028aa98cefc7556b777b259961b6049be39352cfcc1afce92e4d411d"
        sha256:ce78dfcf888f3c90410809413411e05349e6115867b861af43f14022de30a072:
          after_revision: 12
          aggregate_digest: "sha256:37cc75868c14fa8ecbb8019db8f31e63993a0269e46f725103907aeb5410abbe"
          before_revision: 11
          command_digest: "sha256:bd1a139d8697b3da900d8a0388b088da2b4283d671480dc2f0f6f704cc0ec848"
          effect_ids: []
          event_digests:
            - "sha256:e52e5ba996c31616c4b8a28d9128220cd46dca40f2458dbab9662a639b881c7c"
          mutation_id: "sha256:ce78dfcf888f3c90410809413411e05349e6115867b861af43f14022de30a072"
        validation-resolution:sha256:1fd2ed4e5d2da6d83c9071aee05f60b64a591a0f3a547584bb59af6fa8d6c91c:
          after_revision: 16
          aggregate_digest: "sha256:8c56ab5f854c82ec95e17a7cbb4a924aeb6ea9cb48d686364c89fe3041113f1a"
          before_revision: 15
          command_digest: "sha256:81d399fce89a31498d2f0e4854bb1fa0f92f33f7e0d7e9136e39703493e2552e"
          effect_ids: []
          event_digests:
            - "sha256:ce431cd0b7b305b0675353da8b432ac6a916270ac157fbe8bae4349ae0fe07f0"
          mutation_id: "validation-resolution:sha256:1fd2ed4e5d2da6d83c9071aee05f60b64a591a0f3a547584bb59af6fa8d6c91c"
        validation-resolution:sha256:981f57009c63be951daf9b2593e4a4112baaa9a9d8ea03dcd63dce5d1b4d3df3:
          after_revision: 23
          aggregate_digest: "sha256:86f5680076457915d544f8e3178e6d526ba3e126eaa5c6c774caaad035fc13f1"
          before_revision: 22
          command_digest: "sha256:da3d1f305f804cd7cea695b296f846cfc2fd00d3052f9167f84bba4257aaa7a6"
          effect_ids: []
          event_digests:
            - "sha256:ecd9e8d8f27c24c7e19f5a3a9c1536c357b434a8d63a091b2bea7e9162fed99a"
          mutation_id: "validation-resolution:sha256:981f57009c63be951daf9b2593e4a4112baaa9a9d8ea03dcd63dce5d1b4d3df3"
        validation:sha256:25e11e59c8ae2f3b17adf25e1328f5f59ff11feaa776a1abdc01c20f6d8d7e5b:
          after_revision: 15
          aggregate_digest: "sha256:b28fe70b4150f1c9da230ca45930f75400ea182513d3b45f523f92d419ddbb6a"
          before_revision: 14
          command_digest: "sha256:667fd0fef78bd7da957bc2938cc5fac6b940eb7aa7f25bdd999e98938eb52a45"
          effect_ids: []
          event_digests:
            - "sha256:9e6826ae0ff0edad23ffacf2cff142729515e5e6e822ef4f8e56fdd33a6586dc"
          mutation_id: "validation:sha256:25e11e59c8ae2f3b17adf25e1328f5f59ff11feaa776a1abdc01c20f6d8d7e5b"
        validation:sha256:ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000:
          after_revision: 22
          aggregate_digest: "sha256:a8dd29fda2c58dafdaee59c565e4ce7ce63ef38225c7363bc0af7a470eba7699"
          before_revision: 21
          command_digest: "sha256:b25f42945be8f94b532a8a7c5acdc9c873341c8e22c4babf65fc6c10cf44af40"
          effect_ids: []
          event_digests:
            - "sha256:e1d4ca0659d84c704e5704983a38e073e4360bd1b4497452a9f212c7f0758dd3"
          mutation_id: "validation:sha256:ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
          digest: "sha256:27d4f31435ec772b5acf7899dd75d5b727e921b6709eb7d873b84b23578c8dbb"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:cdb49231dec97508938e2a8af5dea4aa19ed54120c863dc25d01f0a145c8e055"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-01-evidence"
              id: "rc-01"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:92aa238f9200037fd81d7fbb85fcf26655ed37f7946c1cc1d9821dc428e8f67a"
              depends_on:
                - "rc-01"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-02-evidence"
              id: "rc-02"
              optional: false
              required_inputs:
                - "rc-01-evidence"
            -
              contract_digest: "sha256:90f2652eef882e38bda4e099a81adcb6dc5fb7df9c623163a4a148ffff39b161"
              depends_on:
                - "rc-02"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-03-evidence"
              id: "rc-03"
              optional: false
              required_inputs:
                - "rc-02-evidence"
            -
              contract_digest: "sha256:64eff4b6ef097d131d50c6d132de631a12d97702c666ec4922a478ed63889059"
              depends_on:
                - "rc-03"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-04-evidence"
              id: "rc-04"
              optional: false
              required_inputs:
                - "rc-03-evidence"
            -
              contract_digest: "sha256:c45ac6ad29ef95e928e1584e92410226ac3952d1b608e4cb948bc1794c4fd644"
              depends_on:
                - "rc-04"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-05-evidence"
              id: "rc-05"
              optional: false
              required_inputs:
                - "rc-04-evidence"
            -
              contract_digest: "sha256:ffb10c3dd45986f20c4f8b10b9a04e6a388bd92db7aa0ccfe7b0d78c79472e3a"
              depends_on:
                - "rc-05"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-06-evidence"
              id: "rc-06"
              optional: false
              required_inputs:
                - "rc-05-evidence"
            -
              contract_digest: "sha256:cb5dd46b684450549433c03340db919965e469fcfd572c6ac817a2836fc2064c"
              depends_on:
                - "rc-06"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-07-evidence"
              id: "rc-07"
              optional: false
              required_inputs:
                - "rc-06-evidence"
            -
              contract_digest: "sha256:4b2ef87bddaf81ae1ea9d19212bd82c3a638530211fe69f75f35194eb49b5239"
              depends_on:
                - "rc-07"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-08-evidence"
              id: "rc-08"
              optional: false
              required_inputs:
                - "rc-07-evidence"
            -
              contract_digest: "sha256:c3207d2d4da67c3ffda03271e55637199a27ab6aa2df7afcd8fd046b4d9ec94c"
              depends_on:
                - "rc-08"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-09-evidence"
              id: "rc-09"
              optional: false
              required_inputs:
                - "rc-08-evidence"
            -
              contract_digest: "sha256:15740414adc932929caaf03a2fef26a6b160cd84c517d5c7afb930f7781d9ade"
              depends_on:
                - "rc-09"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-10-evidence"
              id: "rc-10"
              optional: false
              required_inputs:
                - "rc-09-evidence"
            -
              contract_digest: "sha256:b31d894e9c4360016933ca01209d7922e0e2a80b1802f2177989937d9dbdd0ec"
              depends_on:
                - "rc-10"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-11-evidence"
              id: "rc-11"
              optional: false
              required_inputs:
                - "rc-10-evidence"
            -
              contract_digest: "sha256:f995900bfeffb19f2ddf63ad200cf40acc598bb2820cc5f62e747a7a1c95e1de"
              depends_on:
                - "rc-11"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-12-evidence"
              id: "rc-12"
              optional: false
              required_inputs:
                - "rc-11-evidence"
            -
              contract_digest: "sha256:f5d66b7e5636d4bb3dd75bb17b9e7c473ea1227d93fe35e0c3cadddb907ad696"
              depends_on:
                - "rc-12"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-13-evidence"
              id: "rc-13"
              optional: false
              required_inputs:
                - "rc-12-evidence"
            -
              contract_digest: "sha256:77de6fc592153f50cb3a20e4f96c664f2c89f016bfcc8378ab0af394bcfa0be1"
              depends_on:
                - "rc-13"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-14-evidence"
              id: "rc-14"
              optional: false
              required_inputs:
                - "rc-13-evidence"
            -
              contract_digest: "sha256:33bf690ae7b729d27d0b55bd9e2f67adba6ffb664f5a77ee2af5864268dd1315"
              depends_on:
                - "rc-14"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
              expected_outputs:
                - "rc-15-evidence"
              id: "rc-15"
              optional: false
              required_inputs:
                - "rc-14-evidence"
            -
              contract_digest: "sha256:76b40bbbbc441f0dbae0b5b1f1f0d42a20532e5e5a3f824703512ac01a356281"
              depends_on:
                - "rc-15"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                  - "ci"
                  - "release_metadata"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
                  - "scripts/release"
                  - "scripts/bench"
                  - "artifacts"
                  - "agentplane-roadmap-r2"
                  - "docs"
                  - "package.json"
                  - "bun.lock"
                  - "README.md"
                  - ".github"
                  - "integrations"
              expected_outputs:
                - "rc-16-evidence"
              id: "rc-16"
              optional: false
              required_inputs:
                - "rc-15-evidence"
            -
              contract_digest: "sha256:1b0ae37229e0b16f45631a427960fb44617c4485ec61787a3f09aec272092c8a"
              depends_on:
                - "rc-16"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "schema"
                  - "public_api"
                  - "dependencies"
                  - "security_boundary"
                  - "ci"
                  - "release_metadata"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/recipes"
                  - "packages/core"
                  - "packages/agentplane"
                  - "schemas"
                  - "scripts/checks"
                  - "scripts/release"
                  - "scripts/bench"
                  - "artifacts"
                  - "agentplane-roadmap-r2"
                  - "docs"
                  - "package.json"
                  - "bun.lock"
                  - "README.md"
                  - ".github"
                  - "integrations"
              expected_outputs:
                - "rc-17-evidence"
              id: "rc-17"
              optional: false
              required_inputs:
                - "rc-16-evidence"
            -
              contract_digest: "sha256:3888f0e74f59c99d36e1961ce59af2d24385b52e917fb97a1cf5bee0df82ebc0"
              depends_on:
                - "rc-17"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "documentation"
                  - "schema"
                  - "tests"
                  - "ci"
                  - "release_metadata"
                resources: []
                scope_roots:
                  - "docs"
                  - "packages/recipes"
                  - "schemas"
                  - "agentplane-roadmap-r2"
                  - "artifacts"
                  - "README.md"
              expected_outputs:
                - "rc-18-evidence"
              id: "rc-18"
              optional: false
              required_inputs:
                - "rc-17-evidence"
      revision: 25
      schema_version: 1
      state: "ACTIVE"
      work_items:
        rc-01:
          attempt: 2
          claim_id: "sha256:c1abf838dc198380554e5ca8c2f1b52097cd7d68dd03ef1b14cd83bea73eb1db"
          definition:
            contract_digest: "sha256:cdb49231dec97508938e2a8af5dea4aa19ed54120c863dc25d01f0a145c8e055"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
                - "bun.lock"
            expected_outputs:
              - "rc-01-evidence"
            id: "rc-01"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:192f0c566d4b27931390e35cbbe75dd328f3771afb4b22bbfca0570d9972b870"
              id: "rc-01-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-01"
          result_digest: "sha256:ce9953e22ea856748410f653e3368f5f36ea858a7b6d7ceca08903020b758f8a"
          revision: 12
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:f54df5b8ddb945c5f7b593b9a34088bf8ce4a64e4f215331ea94048a25cde3b3"
              - "sha256:b747ef2810570de63b4098b058cc40c6a1d5d30135e243cad601ad3cd451aa2a"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:78c1e03c46bc3a1bf45b60369f00b653b409046f74a6b2424421a6c067e0ebd0"
              environment_digest: "sha256:16b5183137ecb70068a346c755742bc178c139b2b5c9afc60893e5891488006e"
              implementation_identity: "sha256:ce9953e22ea856748410f653e3368f5f36ea858a7b6d7ceca08903020b758f8a"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T11:28:33.292Z"
            status: "PASSED"
        rc-02:
          attempt: 1
          claim_id: "sha256:f1db0bf74e9a2bd75c6b116eafa2e60f1c50eb1ada8e73690339164848b3cb68"
          definition:
            contract_digest: "sha256:92aa238f9200037fd81d7fbb85fcf26655ed37f7946c1cc1d9821dc428e8f67a"
            depends_on:
              - "rc-01"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-02-evidence"
            id: "rc-02"
            optional: false
            required_inputs:
              - "rc-01-evidence"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:716f79561bb48e23fe54a00abb1c12cc801ccf230df0a68acd581da7a5f26e32"
              id: "rc-02-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-02"
          result_digest: "sha256:6f1893542ff92e136103fb967f2ce1325be881b9ebdb498c0721bc7d20aa9b74"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:18fc2e90e04a1a212a8c410185c7ea99d370abec3016d5c8f9de32d9e50992c1"
              - "sha256:f6b89f6f906940ea8a673c66c6b4cee451b1bc78c5ea4621e6cbae0851dd0204"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:c2bbb1c8db8cafb8d420db2fb1ceaf2acff22ede914981237d0a04a155a2f7b5"
              environment_digest: "sha256:30c7b9219e93fd66a75be54fb094d5c9be636ba96856f3d5950583ceabab1002"
              implementation_identity: "sha256:6f1893542ff92e136103fb967f2ce1325be881b9ebdb498c0721bc7d20aa9b74"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T11:48:45.283Z"
            status: "PASSED"
        rc-03:
          attempt: 1
          claim_id: "sha256:66129e33be0f1f1dec4ea88327d31ba5b061cb036e207d41f63bc333e95969bd"
          definition:
            contract_digest: "sha256:90f2652eef882e38bda4e099a81adcb6dc5fb7df9c623163a4a148ffff39b161"
            depends_on:
              - "rc-02"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-03-evidence"
            id: "rc-03"
            optional: false
            required_inputs:
              - "rc-02-evidence"
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
        rc-04:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:64eff4b6ef097d131d50c6d132de631a12d97702c666ec4922a478ed63889059"
            depends_on:
              - "rc-03"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-04-evidence"
            id: "rc-04"
            optional: false
            required_inputs:
              - "rc-03-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-05:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:c45ac6ad29ef95e928e1584e92410226ac3952d1b608e4cb948bc1794c4fd644"
            depends_on:
              - "rc-04"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-05-evidence"
            id: "rc-05"
            optional: false
            required_inputs:
              - "rc-04-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-06:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:ffb10c3dd45986f20c4f8b10b9a04e6a388bd92db7aa0ccfe7b0d78c79472e3a"
            depends_on:
              - "rc-05"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-06-evidence"
            id: "rc-06"
            optional: false
            required_inputs:
              - "rc-05-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-07:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:cb5dd46b684450549433c03340db919965e469fcfd572c6ac817a2836fc2064c"
            depends_on:
              - "rc-06"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-07-evidence"
            id: "rc-07"
            optional: false
            required_inputs:
              - "rc-06-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-08:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:4b2ef87bddaf81ae1ea9d19212bd82c3a638530211fe69f75f35194eb49b5239"
            depends_on:
              - "rc-07"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-08-evidence"
            id: "rc-08"
            optional: false
            required_inputs:
              - "rc-07-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-09:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:c3207d2d4da67c3ffda03271e55637199a27ab6aa2df7afcd8fd046b4d9ec94c"
            depends_on:
              - "rc-08"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-09-evidence"
            id: "rc-09"
            optional: false
            required_inputs:
              - "rc-08-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-10:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:15740414adc932929caaf03a2fef26a6b160cd84c517d5c7afb930f7781d9ade"
            depends_on:
              - "rc-09"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-10-evidence"
            id: "rc-10"
            optional: false
            required_inputs:
              - "rc-09-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-11:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:b31d894e9c4360016933ca01209d7922e0e2a80b1802f2177989937d9dbdd0ec"
            depends_on:
              - "rc-10"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-11-evidence"
            id: "rc-11"
            optional: false
            required_inputs:
              - "rc-10-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-12:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:f995900bfeffb19f2ddf63ad200cf40acc598bb2820cc5f62e747a7a1c95e1de"
            depends_on:
              - "rc-11"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-12-evidence"
            id: "rc-12"
            optional: false
            required_inputs:
              - "rc-11-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-13:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:f5d66b7e5636d4bb3dd75bb17b9e7c473ea1227d93fe35e0c3cadddb907ad696"
            depends_on:
              - "rc-12"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-13-evidence"
            id: "rc-13"
            optional: false
            required_inputs:
              - "rc-12-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-14:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:77de6fc592153f50cb3a20e4f96c664f2c89f016bfcc8378ab0af394bcfa0be1"
            depends_on:
              - "rc-13"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-14-evidence"
            id: "rc-14"
            optional: false
            required_inputs:
              - "rc-13-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-15:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:33bf690ae7b729d27d0b55bd9e2f67adba6ffb664f5a77ee2af5864268dd1315"
            depends_on:
              - "rc-14"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
            expected_outputs:
              - "rc-15-evidence"
            id: "rc-15"
            optional: false
            required_inputs:
              - "rc-14-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-16:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:76b40bbbbc441f0dbae0b5b1f1f0d42a20532e5e5a3f824703512ac01a356281"
            depends_on:
              - "rc-15"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
                - "ci"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
                - "scripts/release"
                - "scripts/bench"
                - "artifacts"
                - "agentplane-roadmap-r2"
                - "docs"
                - "package.json"
                - "bun.lock"
                - "README.md"
                - ".github"
                - "integrations"
            expected_outputs:
              - "rc-16-evidence"
            id: "rc-16"
            optional: false
            required_inputs:
              - "rc-15-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-17:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:1b0ae37229e0b16f45631a427960fb44617c4485ec61787a3f09aec272092c8a"
            depends_on:
              - "rc-16"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "schema"
                - "public_api"
                - "dependencies"
                - "security_boundary"
                - "ci"
                - "release_metadata"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/recipes"
                - "packages/core"
                - "packages/agentplane"
                - "schemas"
                - "scripts/checks"
                - "scripts/release"
                - "scripts/bench"
                - "artifacts"
                - "agentplane-roadmap-r2"
                - "docs"
                - "package.json"
                - "bun.lock"
                - "README.md"
                - ".github"
                - "integrations"
            expected_outputs:
              - "rc-17-evidence"
            id: "rc-17"
            optional: false
            required_inputs:
              - "rc-16-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        rc-18:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:3888f0e74f59c99d36e1961ce59af2d24385b52e917fb97a1cf5bee0df82ebc0"
            depends_on:
              - "rc-17"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "schema"
                - "tests"
                - "ci"
                - "release_metadata"
              resources: []
              scope_roots:
                - "docs"
                - "packages/recipes"
                - "schemas"
                - "agentplane-roadmap-r2"
                - "artifacts"
                - "README.md"
            expected_outputs:
              - "rc-18-evidence"
            id: "rc-18"
            optional: false
            required_inputs:
              - "rc-17-evidence"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
    digest: "sha256:a774b12021fdc6a88303aaa2c0106e86ff74f312a3fb227f4199943b32992e33"
    documents:
      contracts:
        sha256:15740414adc932929caaf03a2fef26a6b160cd84c517d5c7afb930f7781d9ade:
          acceptance_criteria:
            - "(1) Installed update leaves approved pinned task usable. (2) Bound-byte tamper fails. (3) Trust revocation triggers current policy admission. (4) Added dependency cannot execute under old approval."
            - "Source version equality alone does not prove identical asset bytes."
            - "No automatic repinning of active tasks and no blanket invalidation for unrelated catalogue changes."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-10: Rebind added specialization dependencies before approval. Recompute and retain newly required closure before approving the specialized Plan. Post-approval additions use normal refinement and authority review. Catalogue update, bound-byte tamper and trust revocation have distinct outcomes. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-recipe-repin.test.ts"
            - "bun run typecheck"
        sha256:1b0ae37229e0b16f45631a427960fb44617c4485ec61787a3f09aec272092c8a:
          acceptance_criteria:
            - "(1) Same objective, model, effort, authority and final oracle. (2) No-match/near-match negative tasks included. (3) Setup amortization is not assumed to be free."
            - "All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes."
            - "No inference of savings from fewer template fields or short prompts."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-17: Measure Recipe benefit without gifting it uncounted planning work. Run M05 comparing the same product/policy with no Recipe, explicit instantiate and specialization where applicable. Count selection, planning, failures and host work; report Recipe authoring/setup separately from per-task steady-state cost. Inventory current callers and reuse existing owners before edits. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior. Prepare the exact M05 manifest and report structural offline evidence first. Live execution requires exact manifest and spend authority; do not invent approval or claim unmeasured savings. Record any required release-owner measurement-debt disposition as an unresolved release gate."
          role: "EXECUTOR"
          verification_commands:
            - "bun run bench:agent-efficiency:check"
            - "bun run bench:agent-efficiency:replay:check"
            - "bun run typecheck"
        sha256:33bf690ae7b729d27d0b55bd9e2f67adba6ffb664f5a77ee2af5864268dd1315:
          acceptance_criteria:
            - "(1) Recipe tasks use the same owner, evidence and recovery as no-Recipe. (2) Same effect is not dispatched twice. (3) Independent review remains required under current policy."
            - "A scenario execute command cannot synthesize USER approval."
            - "Delete V2-specific direct runner entry paths and redundant template-to-Task writers."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-15: Connect V2 materialization to the sole task entrypoint. Use the Kernel-backed creation/proposal/approval/advance path for V2. Keep preview read-only and distinguish preparing a Plan from authorizing execution. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
            - "bun run typecheck"
        sha256:3888f0e74f59c99d36e1961ce59af2d24385b52e917fb97a1cf5bee0df82ebc0:
          acceptance_criteria:
            - "(1) Examples validate against installed schema. (2) No separate lifecycle state in a recipe. (3) Evidence distinguishes implemented capability from measured economic benefit."
            - "All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes."
            - "Delete descriptions of Recipe/Blueprint as separate workflow engines and stale V1 instructions that imply arbitrary steps execute."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-18: Publish the formal Recipe authoring contract and measured limits. Document the strict V2 structure, typed parameters, observation predicates, pinned closure, Kernel Plan compilation, formal-versus-semantic boundary and bounded agent specialization with repository-native positive/negative fixtures. Inventory current callers and reuse existing owners before edits. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run schemas:check"
            - "bun run docs:onboarding:check"
        sha256:4b2ef87bddaf81ae1ea9d19212bd82c3a638530211fe69f75f35194eb49b5239:
          acceptance_criteria:
            - "(1) Pure compilation has no effects. (2) Same normalized typed input yields the same Plan bytes and binding. (3) Missing facts return a precise evidence need. (4) Semantic uncertainty requests agent specialization rather than invented defaults."
            - "Recipe instructions cannot suppress independent EVALUATOR before .14 policy qualification."
            - "Delete ad hoc scaffold reconstruction for the migrated V2 path; no new workflow interpreter."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-08: Compile explicit instantiate mode into the Kernel-owned Plan. Compile fully supplied, formally applicable pinned inputs into the Kernel Plan proposal using common validators. Reuse .12 planning admission; approval, checks, dispatch and completion stay outside the compiler. A genuinely semantic gap produces a specialization request for an agent. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-recipe-instantiation.test.ts"
            - "bun run typecheck"
        sha256:64eff4b6ef097d131d50c6d132de631a12d97702c666ec4922a478ed63889059:
          acceptance_criteria:
            - "(1) Every predicate has observation provenance. (2) required=true/excluded=unknown blocks instantiation. (3) Semantic specialization can request missing evidence without automatically involving USER."
            - "An agent cannot substitute its own boolean for a supervisor observation."
            - "No arbitrary query language or LLM risk classifier. Explicit mismatch is not silently replaced."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-04: Observe Recipe applicability with three-valued predicates. Implement bounded path_exists, capability_available and observed_value_equals predicates over approved observations. Instantiation requires every required predicate true and every excluded predicate false; any relevant unknown prevents it. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-applicability.test.ts"
            - "bun run typecheck"
        sha256:76b40bbbbc441f0dbae0b5b1f1f0d42a20532e5e5a3f824703512ac01a356281:
          acceptance_criteria:
            - "(1) No scheduler or Blueprint abstraction returned. (2) Closure bytes recoverable. (3) Native/semantic authority boundaries retained. (4) Generated schema/example parity passes."
            - "All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes."
            - "Remove temporary migration bridges no longer needed for supported formats."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-16: Qualify installed V1/V2 recipes and recovery. Run installed parser/instantiation/specialization/no-match/tamper/removal/offline-restart fixtures. Include custom unsupported V1 conversion and ordinary no-Recipe regression. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run package:install-smoke"
            - "bun run schemas:check"
            - "bun run test:release:critical"
            - "bun run typecheck"
        sha256:77de6fc592153f50cb3a20e4f96c664f2c89f016bfcc8378ab0af394bcfa0be1:
          acceptance_criteria:
            - "(1) V1 bytes preserved. (2) Unknown mandatory semantics cannot activate without a bound agent conversion and explicit review. (3) Converted draft validates structurally as V2 and remains bound to its source. (4) Formal preview does not install/run anything."
            - "A plan written as arbitrary prose cannot be advertised as exact machine-equivalent conversion."
            - "No heuristic prose-to-shell compiler and no automatic task creation during conversion."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-14: Convert exact V1 structure and route semantic conversion to an agent. Add offline V1 audit/preview that converts exactly known structures without an agent. Preserve unknown ordered steps and, when conversion is requested, issue one bounded semantic WorkOrder that returns a typed V2 draft or blocker over the retained V1 bytes. Keep asset/policy-only project overlays as overlays. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/recipes/roadmap-v1-v2-conversion.test.ts"
            - "bun run typecheck"
        sha256:90f2652eef882e38bda4e099a81adcb6dc5fb7df9c623163a4a148ffff39b161:
          acceptance_criteria:
            - "(1) Cycles/dangling inputs/duplicate outputs fail. (2) Scope traversal and symlink escape fail. (3) Required criterion/check references are not silently removed. (4) Platform fixtures cover Windows drive/UNC paths and case aliases, plus symlink/ancestor replacement at use time; unsupported containment fails closed."
            - "Template normalization cannot weaken a required native check or authority floor."
            - "No second Recipe DAG validator with different semantic acceptance rules."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-03: Validate V2 Plan references using the existing Plan validators. After parameter expansion, normalize the template through the existing compact Plan/graph validators. Check dangling guidance/context references and actual filesystem containment at the CLI boundary. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-plan-validation.test.ts"
            - "bun run typecheck"
        sha256:92aa238f9200037fd81d7fbb85fcf26655ed37f7946c1cc1d9821dc428e8f67a:
          acceptance_criteria:
            - "(1) Duplicate/unknown parameters rejected. (2) Nested placeholders remain inert or are rejected by the field contract. (3) Absolute/traversal paths and mistyped values fail closed."
            - "User text containing shell syntax cannot alter a command or operation ID."
            - "No recursive interpolation, expression evaluator or arbitrary template engine."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-02: Validate typed parameters and one-pass interpolation. Support only string, repo_path, integer and boolean parameters. Substitute once in explicitly approved semantic/path fields; reject placeholders in commands, capabilities, WorkItem IDs, dependency IDs and output IDs. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project recipes --maxWorkers=1 packages/recipes/src/roadmap-recipe-parameters.test.ts"
            - "bun run typecheck"
        sha256:b31d894e9c4360016933ca01209d7922e0e2a80b1802f2177989937d9dbdd0ec:
          acceptance_criteria:
            - "(1) Explicit sufficient input creates zero selection episodes. (2) Ambiguous version/unknown required facts are visible. (3) Installing a Recipe is not permission to run its effects."
            - "Unknown scenario API cannot be coerced into a compatible manifest."
            - "No selector model call and no nearest-recipe replacement."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-11: Resolve an explicitly selected Recipe without a selector episode. Resolve the installed exact version/scenario, check compatibility and applicability, pin it and use normal Plan instantiation/specialization. Refuse incompatible explicit choices with useful diagnostics. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/recipes/roadmap-explicit-selection.test.ts"
            - "bun run typecheck"
        sha256:c3207d2d4da67c3ffda03271e55637199a27ab6aa2df7afcd8fd046b4d9ec94c:
          acceptance_criteria:
            - "(1) Cross-task/stale/duplicate operation rejected. (2) Resulting full Plan passes normal DAG/criteria/check validation. (3) Large departure can return a complete Kernel Plan proposal."
            - "Removing a WorkItem cannot silently drop mandatory outputs or verification."
            - "No Recipe-only patch protocol or task-centric reducer parallel to Kernel Plan refinement."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-09: Specialize a Recipe through the existing Plan-refinement contract. Express bounded agent-produced add/replace/remove WorkItem changes through the common proposal/refinement machinery and apply them through the Kernel, with the pinned base Plan digest and atomic full-result validation. Extend that shared contract only for missing operations. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project core --maxWorkers=1 packages/core/src/commands/task/roadmap-recipe-specialization.test.ts"
            - "bun run typecheck"
        sha256:c45ac6ad29ef95e928e1584e92410226ac3952d1b608e4cb948bc1794c4fd644:
          acceptance_criteria:
            - "(1) Changing a transitive required asset changes closure identity. (2) Unrelated installed package does not. (3) Secrets are references, not retained values."
            - "An unpinned helper import cannot be treated as covered by hashing only the entrypoint file."
            - "Avoid loading unrelated catalogue assets; do not implement universal dynamic import analysis."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-05: Compute the pre-execution Recipe dependency closure. Compute closure from the selected scenario, proposed Plan and declared transitive guidance/tool/asset dependencies before approval. Include entrypoints plus their pinned package/dependency identity; reject an unknown closure rather than guessing what a tool will import. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-closure.test.ts"
            - "bun run typecheck"
        sha256:cb5dd46b684450549433c03340db919965e469fcfd572c6ac817a2836fc2064c:
          acceptance_criteria:
            - "(1) Equal normalized inputs yield stable binding. (2) Model cannot replace pinned references during result return. (3) Report-only changes leave Plan semantics unchanged."
            - "Runtime lookup of installed latest cannot override approved closure."
            - "No Recipe execution cursor, independent approval or duplicated WorkItem state."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-07: Bind Recipe provenance to the Kernel-owned Plan once. Add the minimal versioned Plan provenance for package/scenario/version/closure/compiler/parameters/applicability. Use common Plan approval and result admission to bind this provenance. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-plan-binding.test.ts"
            - "bun run typecheck"
        sha256:cdb49231dec97508938e2a8af5dea4aa19ed54120c863dc25d01f0a145c8e055:
          acceptance_criteria:
            - "(1) Unknown fields/unsupported versions rejected. (2) V1 runtime cannot read V2 as V1. (3) Parsing performs no I/O effects, shell, provider call or task mutation."
            - "A scenario cannot declare a lifecycle cursor, approval state or terminal success."
            - "No new TaskRecipe package type, scheduler, lifecycle fields or global recipe run record."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-01: Add strict Scenario V2 parsing and explicit version negotiation. Add Scenario API \"2\" within the existing Recipe package. Parse typed parameters, applicability and a Plan template using the common compact Plan input vocabulary; retain explicit V1 decoding. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project recipes --maxWorkers=1 packages/recipes/src/roadmap-scenario-v2-parser.test.ts"
            - "bun run typecheck"
        sha256:f5d66b7e5636d4bb3dd75bb17b9e7c473ea1227d93fe35e0c3cadddb907ad696:
          acceptance_criteria:
            - "(1) Required constraints conserved. (2) EXECUTOR does not choose lifecycle transitions. (3) Fresh adapter gets complete required semantic context. (4) Restart needs no assumed provider memory."
            - "Prompt reduction cannot erase negative applicability or stop conditions."
            - "Remove V2 full-manifest/scenario duplication in runner context; keep retained evidence off the model path unless needed."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-13: Project only role-relevant recipe guidance and deviations. Deliver current role guidance, necessary context and task-specific deviations from the approved Plan; let CLI carry immutable protocol metadata and required check machinery. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
            - "bun run typecheck"
        sha256:f995900bfeffb19f2ddf63ad200cf40acc598bb2820cc5f62e747a7a1c95e1de:
          acceptance_criteria:
            - "(1) No-match sufficient inline task still has zero PLANNER episodes. (2) Candidate ordering/reasons reproducible. (3) An explicit required Recipe mismatch remains a stop, not silent fallback."
            - "A candidate score cannot grant authority or downgrade mandatory review."
            - "No full catalogue/package manifests in every episode and no selection-only provider dispatch."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-12: Shortlist Recipe candidates only inside already necessary planning. Build a deterministic bounded candidate summary only from exactly comparable compatibility fields and structured observations. The summary makes no semantic applicability claim. Let an already required PLANNER choose or decline; otherwise continue Kernel obligation resolution without auto-starting a selector. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-shortlist.test.ts"
            - "bun run typecheck"
        sha256:ffb10c3dd45986f20c4f8b10b9a04e6a388bd92db7aa0ccfe7b0d78c79472e3a:
          acceptance_criteria:
            - "(1) Offline restart/fresh clone recovers all required bytes. (2) Package update/removal does not select latest. (3) Missing bytes stop recovery honestly."
            - "A local untracked git-common-dir copy alone is not portable forensic retention."
            - "No parallel artifact database or per-episode full Recipe copy; no history rewrite."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
          objective: "RC-06: Retain closure bytes through the existing evidence storage. Store one resolvable immutable closure using existing content-addressed evidence APIs or deliberately retained Git objects. Define reachability/retention until task and audit obligations are satisfied. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-retention.test.ts"
            - "bun run typecheck"
      intent:
        context: "User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets."
        objective: "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release"
    events:
      -
        command_digest: "sha256:97044d87bbe2afdf30f80307ae6e7832e866a9614d9e3bee895e9fea0232c176"
        id: "capture:202610041748-K43XFE:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610041748-K43XFE"
        occurred_at: "2026-10-04T17:48:52.671Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610041748-K43XFE"
        task_revision: 1
      -
        command_digest: "sha256:72f06bb11306350a93146881ca6bb70ac58d55b9c426eb50cab8536dac414a94"
        id: "result:sha256:189b3fb943ed048d2fca0bf3605c715032f65bc8d4c9c9b7c3aa087ff6f6c42e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:189b3fb943ed048d2fca0bf3605c715032f65bc8d4c9c9b7c3aa087ff6f6c42e"
        occurred_at: "2026-10-04T17:57:01.199Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610041748-K43XFE"
        task_revision: 2
      -
        command_digest: "sha256:87555486260108efe5149a644af26c0d5ddecee60f6673717dbcc1d66fac0bd1"
        id: "sha256:b8462d57028aa98cefc7556b777b259961b6049be39352cfcc1afce92e4d411d:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b8462d57028aa98cefc7556b777b259961b6049be39352cfcc1afce92e4d411d"
        occurred_at: "2026-10-04T17:57:40.258Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610041748-K43XFE"
        task_revision: 3
      -
        command_digest: "sha256:cbecbdb81ed5ca2f3e45f7a44084c6fff4eb2e6b0f0a842eef59ba4bad32f577"
        id: "kernel_work_item_materialization_required:sha256:5f544ab1173ce36c78d2c26bfe10f136d61ab620de62731f5dcd16cc7486a4db:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5f544ab1173ce36c78d2c26bfe10f136d61ab620de62731f5dcd16cc7486a4db:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        occurred_at: "2026-10-04T17:58:16.893Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610041748-K43XFE"
        task_revision: 4
      -
        command_digest: "sha256:0f579dcb4674c1ad06918cd8061462a23f916aa7d50c41a188a8cc38af559b4c"
        id: "kernel_work_item_claim_required:sha256:b17adbd4537d64c4495c3d9439552bf67f014beddb8a736cb87896196ca4fd67:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:b17adbd4537d64c4495c3d9439552bf67f014beddb8a736cb87896196ca4fd67:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        occurred_at: "2026-10-04T17:58:55.310Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610041748-K43XFE"
        task_revision: 5
      -
        command_digest: "sha256:6330fe6f57620ea75485353744e1508b097b56aaffa33659ad0ef16bfc8609c1"
        id: "kernel_work_item_execution_required:sha256:3023b0d03a890e77b64a7664159ccea50ae4f62593fed4ee829c2047fbd00c68:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3023b0d03a890e77b64a7664159ccea50ae4f62593fed4ee829c2047fbd00c68:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        occurred_at: "2026-10-04T18:01:32.034Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610041748-K43XFE"
        task_revision: 6
      -
        command_digest: "sha256:5bf94cec6944348f8a639dffa9b1b15ac9384ea8260e3aba11e9e543f174e515"
        id: "semantic-stop:sha256:2354a97e6bee8d057a73172715428f7956156a3b6e5fbf813921f0eaf0d370c6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:2354a97e6bee8d057a73172715428f7956156a3b6e5fbf813921f0eaf0d370c6"
        occurred_at: "2026-10-04T18:02:34.352Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610041748-K43XFE"
        task_revision: 7
      -
        command_digest: "sha256:90ccb51e791e007a38eb888af46ab0c56dc12a93933f93163ac193471bd1a6a1"
        id: "amend:sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492"
        occurred_at: "2026-10-04T18:04:15.873Z"
        payload_digest: "sha256:964cf42524ec72c6b22cee6501b5fee95dfd1b1ad6daef1e25dfc8c2b25b6b13"
        task_id: "202610041748-K43XFE"
        task_revision: 8
      -
        command_digest: "sha256:d3448843f98526e83995c047e08dbd145eec97178755ba6acef8f308f05958e0"
        id: "sha256:775517251e3348a835f420b9c6b53111096fcd9244df3a89e198aa389485eedd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:775517251e3348a835f420b9c6b53111096fcd9244df3a89e198aa389485eedd"
        occurred_at: "2026-10-04T18:04:33.560Z"
        payload_digest: "sha256:24f7ea3d3341ee0c827f30d020d0d10cfe76d88847462d9a35c97dcef11d0ac1"
        task_id: "202610041748-K43XFE"
        task_revision: 9
      -
        command_digest: "sha256:56e5a1f10d7afc1f4e1dd6a16b58ee71a7787509247b86e2d03c5e4d2292594a"
        id: "kernel_work_item_claim_required:sha256:fae9bc2af7d722f0e81823b3cc689b1da30ef09dd8b7486c1fdb140a750ddc4a:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:fae9bc2af7d722f0e81823b3cc689b1da30ef09dd8b7486c1fdb140a750ddc4a:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        occurred_at: "2026-10-04T18:05:39.917Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610041748-K43XFE"
        task_revision: 10
      -
        command_digest: "sha256:6b90823221f5d1fc3fe8de28b11b245d366ac913f0474c8370810ee9131267b3"
        id: "kernel_work_item_execution_required:sha256:4157967ed43bce4627426934f36925524ec8f55b423ede6776146a2d22e190cf:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4157967ed43bce4627426934f36925524ec8f55b423ede6776146a2d22e190cf:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        occurred_at: "2026-10-04T18:06:07.631Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610041748-K43XFE"
        task_revision: 11
      -
        command_digest: "sha256:bd1a139d8697b3da900d8a0388b088da2b4283d671480dc2f0f6f704cc0ec848"
        id: "sha256:ce78dfcf888f3c90410809413411e05349e6115867b861af43f14022de30a072:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ce78dfcf888f3c90410809413411e05349e6115867b861af43f14022de30a072"
        occurred_at: "2026-10-04T18:13:38.272Z"
        payload_digest: "sha256:6a393f0d5f638e65b9d28b5f23acc31dc08122dddefda82bfc41f81256a566cd"
        task_id: "202610041748-K43XFE"
        task_revision: 12
      -
        command_digest: "sha256:a3bc03f1d360e6bb3c9f2eb67d00392f53209eb1c4dc32a627235f5726313bf8"
        id: "result:sha256:b9c9f7771e7d3e13e1f6f4fc7cf5c74d7c0157d8b3a63995cb3b9e0cd76c0017:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b9c9f7771e7d3e13e1f6f4fc7cf5c74d7c0157d8b3a63995cb3b9e0cd76c0017"
        occurred_at: "2026-10-04T18:14:11.229Z"
        payload_digest: "sha256:2214120ad1a5e1c4b7674bdbd2a4b5a1cbcf9ebfe37aea8b8ccadb27d3eee601"
        task_id: "202610041748-K43XFE"
        task_revision: 13
      -
        command_digest: "sha256:67a6d3d7c683cbdfa82728edfa467b8c711cda4b607203a7683dde7072d2a133"
        id: "kernel_work_item_inspection_required:sha256:8e171f1cea2844450cac768d5bbad8d4bfb3ff75b8ae874e8381c99fbd83ef67:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8e171f1cea2844450cac768d5bbad8d4bfb3ff75b8ae874e8381c99fbd83ef67:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        occurred_at: "2026-10-04T18:14:25.617Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610041748-K43XFE"
        task_revision: 14
      -
        command_digest: "sha256:667fd0fef78bd7da957bc2938cc5fac6b940eb7aa7f25bdd999e98938eb52a45"
        id: "validation:sha256:25e11e59c8ae2f3b17adf25e1328f5f59ff11feaa776a1abdc01c20f6d8d7e5b:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:25e11e59c8ae2f3b17adf25e1328f5f59ff11feaa776a1abdc01c20f6d8d7e5b"
        occurred_at: "2026-10-05T11:28:44.303Z"
        payload_digest: "sha256:43a52746fe1d98579ff85ddb184591f7f78f601544ff0fc20900514e17962df9"
        task_id: "202610041748-K43XFE"
        task_revision: 15
      -
        command_digest: "sha256:81d399fce89a31498d2f0e4854bb1fa0f92f33f7e0d7e9136e39703493e2552e"
        id: "validation-resolution:sha256:1fd2ed4e5d2da6d83c9071aee05f60b64a591a0f3a547584bb59af6fa8d6c91c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1fd2ed4e5d2da6d83c9071aee05f60b64a591a0f3a547584bb59af6fa8d6c91c"
        occurred_at: "2026-10-05T11:28:51.282Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610041748-K43XFE"
        task_revision: 16
      -
        command_digest: "sha256:27b20addffa85ada2fd85d263850ad2a261313b9921e035d95a1d0f5db32a0cb"
        id: "kernel_work_item_claim_required:sha256:59e141efac5175977b1c0fddbe4db2b966af96416439e132344b44b0c2a8813d:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:59e141efac5175977b1c0fddbe4db2b966af96416439e132344b44b0c2a8813d:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        occurred_at: "2026-10-05T11:29:06.202Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610041748-K43XFE"
        task_revision: 17
      -
        command_digest: "sha256:adae0b67cf777d2e114a5675b0d8a849320c6ab43d0095a339f8339a8fc24b82"
        id: "kernel_work_item_execution_required:sha256:62687f82153f5367a3bd81ecac7f8d988ff7846e08911458173a260a83d6e8a6:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:62687f82153f5367a3bd81ecac7f8d988ff7846e08911458173a260a83d6e8a6:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        occurred_at: "2026-10-05T11:29:17.158Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610041748-K43XFE"
        task_revision: 18
      -
        command_digest: "sha256:0d44c1c2e5bcc94ae04598a6ff58000cc0cf9652ccfc4887331efa92e638cdcf"
        id: "sha256:42057e84d78ab3f1499f8ef1aef995aecda6b2cf3ff6dec74fa4a25c0a354057:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:42057e84d78ab3f1499f8ef1aef995aecda6b2cf3ff6dec74fa4a25c0a354057"
        occurred_at: "2026-10-05T11:44:59.375Z"
        payload_digest: "sha256:1223dab77db4a4ff6e2209fcb4238433d8fa95a7c34d0ffd01b6eba93b722354"
        task_id: "202610041748-K43XFE"
        task_revision: 19
      -
        command_digest: "sha256:146920b394eee858228028e7c2f950aa213c81c3c439892b371f64b8ce33c0af"
        id: "result:sha256:83d37cd21d96abc5446f4a9bb1017296689acf5115895dd2310a6466ff4f4dc8:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:83d37cd21d96abc5446f4a9bb1017296689acf5115895dd2310a6466ff4f4dc8"
        occurred_at: "2026-10-05T11:45:39.170Z"
        payload_digest: "sha256:f294013879eb217102bc0fab0f1e7a244e1201c6c32880d918fa6d1433411da7"
        task_id: "202610041748-K43XFE"
        task_revision: 20
      -
        command_digest: "sha256:f8e33a1107576097b0e1f016d51ebe7e608786432d4288747127894c453bda30"
        id: "kernel_work_item_inspection_required:sha256:9ce250ff40ad6025ccb5c9af253a9a57fe701056e05f68ca25c0cf438c5096ce:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:9ce250ff40ad6025ccb5c9af253a9a57fe701056e05f68ca25c0cf438c5096ce:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        occurred_at: "2026-10-05T11:46:09.401Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610041748-K43XFE"
        task_revision: 21
      -
        command_digest: "sha256:b25f42945be8f94b532a8a7c5acdc9c873341c8e22c4babf65fc6c10cf44af40"
        id: "validation:sha256:ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000"
        occurred_at: "2026-10-05T11:49:13.133Z"
        payload_digest: "sha256:08536a509deeac3624c331473c2ac63c8c443337a83d4affeb97a578108721c6"
        task_id: "202610041748-K43XFE"
        task_revision: 22
      -
        command_digest: "sha256:da3d1f305f804cd7cea695b296f846cfc2fd00d3052f9167f84bba4257aaa7a6"
        id: "validation-resolution:sha256:981f57009c63be951daf9b2593e4a4112baaa9a9d8ea03dcd63dce5d1b4d3df3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:981f57009c63be951daf9b2593e4a4112baaa9a9d8ea03dcd63dce5d1b4d3df3"
        occurred_at: "2026-10-05T11:49:34.185Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610041748-K43XFE"
        task_revision: 23
      -
        command_digest: "sha256:82c0d31b882bdb4c18918ce64175d52663435662a5f238982dac501decdb1aa2"
        id: "kernel_work_item_claim_required:sha256:9561e19b4dc85cc8f92a08236c535fbb0e0637a000d912883902bdd92989b141:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9561e19b4dc85cc8f92a08236c535fbb0e0637a000d912883902bdd92989b141:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        occurred_at: "2026-10-05T11:50:14.640Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202610041748-K43XFE"
        task_revision: 24
      -
        command_digest: "sha256:32d1453c6d945f65b629f41a2564246c974bd906974d8a923f6571ceb7b3b396"
        id: "kernel_work_item_execution_required:sha256:9b1e87fe492da2b2f6cfe3e017b30d9b7ab69070fd299beb023cb798b06d7bf5:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9b1e87fe492da2b2f6cfe3e017b30d9b7ab69070fd299beb023cb798b06d7bf5:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        occurred_at: "2026-10-05T11:50:45.692Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610041748-K43XFE"
        task_revision: 25
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release

User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.

## Scope

- In scope: User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release".

## Plan

1. Execute approved WorkItem rc-01.
2. Execute approved WorkItem rc-02.
3. Execute approved WorkItem rc-03.
4. Execute approved WorkItem rc-04.
5. Execute approved WorkItem rc-05.
6. Execute approved WorkItem rc-06.
7. Execute approved WorkItem rc-07.
8. Execute approved WorkItem rc-08.
9. Execute approved WorkItem rc-09.
10. Execute approved WorkItem rc-10.
11. Execute approved WorkItem rc-11.
12. Execute approved WorkItem rc-12.
13. Execute approved WorkItem rc-13.
14. Execute approved WorkItem rc-14.
15. Execute approved WorkItem rc-15.
16. Execute approved WorkItem rc-16.
17. Execute approved WorkItem rc-17.
18. Execute approved WorkItem rc-18.

## Verify Steps

PLANNER fallback scaffold for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
