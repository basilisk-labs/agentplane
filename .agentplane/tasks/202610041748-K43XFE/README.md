---
id: "202610041748-K43XFE"
title: "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 170
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
  updated_at: "2026-10-06T00:51:37.030Z"
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
  updated_at: "2026-10-05T19:21:21.233Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "0cc00f364c7be0927047ef4ce3d066da6531482f"
  review_identity_digest: "sha256:f6b8b615abe650c97a53481bf2f94d153983eb12b14e93b7b3d46f242ca268e5"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610041748-K43XFE/0f5a80140ae2dbe532fc1489d72f9a171b04ce73df32fb805d90e8be0a325291/quality-report.json"
  findings:
    - "Verified all 13 required context blocks and byte lengths, source/input/report digests, native receipt input binding and issued result schema. Frozen commit 0cc00f364c7be0927047ef4ce3d066da6531482f and tree 51241a95668b2f2cc7ccbf647b7e29f5ed41aba9 match the evidence. Inspected all eight changed source/test files."
    - "Public task create --recipe-file uses ordinary explicit intent and native creation, then existing explicit-selection preparation. Strict bounded input rejects invented approval fields, mixed input routes and already-bound creation inputs. Missing parameters return a Task-bound continuation for task plan set rather than creating another Task."
    - "Public task plan set --recipe-file requires a canonical Task, verifies Task identity and retained evidence ownership, and passes only a compiled committed-retention proposal to existing setCanonicalPlan. Uncommitted or tampered retention yields evidence needs without modifying the Plan. Removed installed packages recover through exact retained bytes, without latest fallback."
    - "recipes preview-v2 is registered through the public catalogue and performs read-only selection and formal parameter expansion. It creates no Task or retention artifact and claims no applicability, proposal admission or execution authority. V1 and ordinary no-Recipe branches are unchanged."
    - "No new scheduler, direct V2 runner, approval actor synthesis or lifecycle owner is introduced. The CLI regression checks PROPOSED state with empty authority lineage, an approval_required advance boundary, explicit USER approval, identical WorkOrder/result path on replay and mandatory EVALUATOR after implementation. Repeated proposal preserves the native record and Plan digest."
    - "Native assigned receipt reports all three public CLI tests and typecheck passed. This evaluator executed no tests, lifecycle commands or source writes."
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
  hash: "0cc00f364c7be0927047ef4ce3d066da6531482f"
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
    19. Execute approved WorkItem rc-supervisor-composition.
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
    digest: "sha256:503c6e1704dfb111b787ea5c2850f2639a19538b62bff21ce8d52dcd12f82514"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610041748-K43XFE/0f5a80140ae2dbe532fc1489d72f9a171b04ce73df32fb805d90e8be0a325291/quality-report.json"
    findings:
      - "Verified all 13 required context blocks and byte lengths, source/input/report digests, native receipt input binding and issued result schema. Frozen commit 0cc00f364c7be0927047ef4ce3d066da6531482f and tree 51241a95668b2f2cc7ccbf647b7e29f5ed41aba9 match the evidence. Inspected all eight changed source/test files."
      - "Public task create --recipe-file uses ordinary explicit intent and native creation, then existing explicit-selection preparation. Strict bounded input rejects invented approval fields, mixed input routes and already-bound creation inputs. Missing parameters return a Task-bound continuation for task plan set rather than creating another Task."
      - "Public task plan set --recipe-file requires a canonical Task, verifies Task identity and retained evidence ownership, and passes only a compiled committed-retention proposal to existing setCanonicalPlan. Uncommitted or tampered retention yields evidence needs without modifying the Plan. Removed installed packages recover through exact retained bytes, without latest fallback."
      - "recipes preview-v2 is registered through the public catalogue and performs read-only selection and formal parameter expansion. It creates no Task or retention artifact and claims no applicability, proposal admission or execution authority. V1 and ordinary no-Recipe branches are unchanged."
      - "No new scheduler, direct V2 runner, approval actor synthesis or lifecycle owner is introduced. The CLI regression checks PROPOSED state with empty authority lineage, an approval_required advance boundary, explicit USER approval, identical WorkOrder/result path on replay and mandatory EVALUATOR after implementation. Repeated proposal preserves the native record and Plan digest."
      - "Native assigned receipt reports all three public CLI tests and typecheck passed. This evaluator executed no tests, lifecycle commands or source writes."
    implementation_commit: "0cc00f364c7be0927047ef4ce3d066da6531482f"
    implementation_tree: "51241a95668b2f2cc7ccbf647b7e29f5ed41aba9"
    projected_at: "2026-10-05T19:21:21.233Z"
    review_identity_digest: "sha256:f6b8b615abe650c97a53481bf2f94d153983eb12b14e93b7b3d46f242ca268e5"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:79b009a326c42293809ea7fa01ba6f985f79753ec0cec2ffc2eb4bbd0efd3097"
    work_order_id: "sha256:b07f55d125c62af367ff4ba5994bfb474719b6c3a47d336be57b58edf9ee1fd0"
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
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:13393d8514a6112a0d39a6e8d23477d6f0ef5aca8bf571d1cb6fa09943ced511"
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
              parent_authority_digest: "sha256:aee71a8adbf6a6c0542b03620aba34d6265b822f158f7cc70bf0768497fb3ef8"
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
            repository_fingerprint: "sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
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
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/recipe-plan-validation.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-plan-validation.test.ts"
              - "packages/agentplane/src/shared/contained-stable-file.ts"
              - "packages/core/src/tasks/task-centric/graph.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
            evidence_digest: "sha256:e48ef6c7d112acdd454b5e436e7b012a70b2317ffb9060ab58b7d9d4d0f54ac8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e2e52a76d15f58df2616bf63ff46f5ae84b4d97d945e265042fcaae48a0dc8ae"
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
              parent_authority_digest: "sha256:13393d8514a6112a0d39a6e8d23477d6f0ef5aca8bf571d1cb6fa09943ced511"
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
            repository_fingerprint: "sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
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
              - "packages/agentplane/src/runner/context/roadmap-recipe-plan-validation.test.ts"
              - "packages/core/src/tasks/task-centric/graph.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
            evidence_digest: "sha256:a80466bbb39c55c0ae9cd1b8b60c81ab3916379cdcc3ae733a2a92a8942d8e56"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9d62d5ecadbb43b3606feca1a959170a148cd725f33d24c57c3e81787afcd476"
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
              parent_authority_digest: "sha256:e2e52a76d15f58df2616bf63ff46f5ae84b4d97d945e265042fcaae48a0dc8ae"
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
            repository_fingerprint: "sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
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
              - "packages/agentplane/src/runner/context/recipe-applicability.ts"
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-applicability.test.ts"
              - "packages/recipes/src/index.ts"
            evidence_digest: "sha256:bdaa627002b7013bde016da7f5e9880e03dc0c883a178eed6e00c9bcf92fe29f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:07fc64e064613fbb857415e300e752318ad0a8aa3987b465cae5b4cf7c2a9808"
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
              parent_authority_digest: "sha256:9d62d5ecadbb43b3606feca1a959170a148cd725f33d24c57c3e81787afcd476"
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
            repository_fingerprint: "sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
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
              - "packages/agentplane/src/runner/context/recipe-closure.ts"
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-closure.test.ts"
              - "packages/recipes/src/compiled-contracts.ts"
              - "packages/recipes/src/manifest-contracts.ts"
              - "packages/recipes/src/manifest.ts"
            evidence_digest: "sha256:8ff28d179480b095d998117233f8780653e9f05a0a74545e96de233d5167c86b"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c25f90abc805e1b20cb6e2ff7cde1cef7ab20a7949f176fb48fbfaa84795f7c1"
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
              parent_authority_digest: "sha256:07fc64e064613fbb857415e300e752318ad0a8aa3987b465cae5b4cf7c2a9808"
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
            repository_fingerprint: "sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
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
              - "packages/agentplane/src/runner/context/recipe-closure.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-closure.test.ts"
            evidence_digest: "sha256:09c86c9c884ab67e485065a6c629fb9d87f887eeb8f78d9a4bd462f429bf4043"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ff233517ae8036a9ab247b080f029c9aea95bec95457dc11b596e3fd8aedb8a1"
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
              parent_authority_digest: "sha256:c25f90abc805e1b20cb6e2ff7cde1cef7ab20a7949f176fb48fbfaa84795f7c1"
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
            repository_fingerprint: "sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
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
              - "packages/agentplane/src/commands/evaluator/evaluator-evidence-boundary.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/recipe-retention.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-retention.test.ts"
            evidence_digest: "sha256:4513aa65352afbde7f5e3932e296ded1542c7ddb098bc0e5244abc418312178c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d391d5a1f10eb4806de84c200dba82f4741263de045ce924d93494d854bac91c"
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
              parent_authority_digest: "sha256:ff233517ae8036a9ab247b080f029c9aea95bec95457dc11b596e3fd8aedb8a1"
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
            repository_fingerprint: "sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
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
              - "packages/agentplane/src/commands/task/create-plan-input.ts"
              - "packages/agentplane/src/runner/context/recipe-closure.ts"
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/recipe-plan-binding.ts"
              - "packages/agentplane/src/runner/context/recipe-retention.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-closure.test.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-plan-binding.test.ts"
              - "packages/core/src/runner/agent-semantic-result.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/task-centric/digest.ts"
              - "packages/core/src/tasks/task-centric/model.ts"
              - "packages/core/src/tasks/task-centric/schema.ts"
              - "packages/recipes/src/compiled-contracts.ts"
              - "schemas/agent-semantic-result.schema.json"
            evidence_digest: "sha256:946b3826018e7b541f7c0471f83e8d4fa17fe56c76494c0b4c588f6955e07e29"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0c3859f269d96ee6c3c80bbe8c998c644a0e243b1422dbd5ba3da8b69ca3fc3a"
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
              parent_authority_digest: "sha256:d391d5a1f10eb4806de84c200dba82f4741263de045ce924d93494d854bac91c"
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
            repository_fingerprint: "sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
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
              - "packages/agentplane/src/commands/task/create-plan-input.ts"
              - "packages/agentplane/src/runner/context/recipe-native-observers.ts"
              - "packages/agentplane/src/runner/context/recipe-plan-binding.ts"
              - "packages/agentplane/src/runner/context/recipe-plan-validation.ts"
              - "packages/agentplane/src/runner/usecases/roadmap-recipe-instantiation.test.ts"
              - "packages/agentplane/src/runner/usecases/scenario-instantiate.ts"
              - "packages/agentplane/src/runner/usecases/scenario-materialize-task.ts"
              - "packages/recipes/src/index.ts"
              - "packages/recipes/src/scenario-compiler.ts"
            evidence_digest: "sha256:1ffe5e016d2f6f2dedbfaafb723837651f0bdd499acf3f8ef1a76adf4a1243dd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c1f2d64b907510266a0f5d828c0378f560d2cfe26b0f7b76029484b25279fd89"
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
              parent_authority_digest: "sha256:0c3859f269d96ee6c3c80bbe8c998c644a0e243b1422dbd5ba3da8b69ca3fc3a"
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
            repository_fingerprint: "sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
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
              - "packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-planning-view.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/commands/task/roadmap-recipe-specialization.test.ts"
              - "packages/core/src/runner/agent-semantic-result.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/kernel-plan-refinement.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "schemas/agent-semantic-result.schema.json"
            evidence_digest: "sha256:7264d0179067d3b46618c4ffc6ef8e5241d837b3d7d64d28e5b1939a76a7d874"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:15be27ca7a3b5f56028f2222ba51d33d91a3c076f6f0727dbabd3fc68b6e5364"
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
              parent_authority_digest: "sha256:c1f2d64b907510266a0f5d828c0378f560d2cfe26b0f7b76029484b25279fd89"
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
            repository_fingerprint: "sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
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
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/roadmap-recipe-repin.test.ts"
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/recipe-plan-rebind.ts"
            evidence_digest: "sha256:2315c503f5c8894fb057f1401092d7a4598027137e5932a1ef691d3fcc0e823d"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ee51c180a51dacd228275c75642fbf1896a62b16a6d68548f2f9bffe70739fd0"
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
              parent_authority_digest: "sha256:15be27ca7a3b5f56028f2222ba51d33d91a3c076f6f0727dbabd3fc68b6e5364"
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
            repository_fingerprint: "sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
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
              - "packages/agentplane/src/commands/recipes/impl/explicit-selection.ts"
              - "packages/agentplane/src/commands/recipes/impl/project-registry.ts"
              - "packages/agentplane/src/commands/recipes/impl/resolver.ts"
              - "packages/agentplane/src/commands/recipes/roadmap-explicit-selection.test.ts"
              - "packages/agentplane/src/runner/usecases/scenario-explicit-selection.ts"
              - "packages/agentplane/src/runner/usecases/scenario-materialize-task.ts"
              - "packages/recipes/src/resolver-contracts.ts"
            evidence_digest: "sha256:d77db266a745b4823a6f308bdce49638f9f872620b273c17149958cc39cf70d6"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:427b715487fa2af19a63a5fde3185845d0e0a36673117982f3c011d3cc33cb0f"
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
              parent_authority_digest: "sha256:ee51c180a51dacd228275c75642fbf1896a62b16a6d68548f2f9bffe70739fd0"
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
            repository_fingerprint: "sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
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
              - "packages/agentplane/src/commands/recipes/impl/explicit-selection.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/recipe-shortlist.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-shortlist.test.ts"
              - "packages/recipes/src/resolver-contracts.ts"
            evidence_digest: "sha256:54bd4b1ff778235c606943b3f68b758980be5d8168d8ea5075099ab5ac81faf7"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a6035820487db12358b0b58bfdf8e193a0e57c5687c84b25cf92def9ffaaac90"
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
              parent_authority_digest: "sha256:427b715487fa2af19a63a5fde3185845d0e0a36673117982f3c011d3cc33cb0f"
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
            repository_fingerprint: "sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
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
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/runner/context/recipe-context.ts"
              - "packages/agentplane/src/runner/context/recipe-prompt-blocks.ts"
              - "packages/agentplane/src/runner/context/recipe-role-context.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
              - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
              - "packages/agentplane/src/runner/usecases/task-run-recipe-context.ts"
            evidence_digest: "sha256:11139e90b2b3ec59e9f9b92ad2c6da96ec2925c1920ba90b2a2f9c79a9e4a1d8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:8efaa535a688a4b9c03d47361a5b0310c00ebac1c6080b0173b7eba85c5a8f88"
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
              parent_authority_digest: "sha256:a6035820487db12358b0b58bfdf8e193a0e57c5687c84b25cf92def9ffaaac90"
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
            repository_fingerprint: "sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
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
              - "packages/agentplane/src/runner/context/recipe-role-context.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
            evidence_digest: "sha256:d6eae5081748890b7ac0f65c4e23218c1ca5ae01e3db2e881a8d48beff7bab40"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:dacef0bedc99ad1f5c3819256a17124029f55aeb3d2156a1d2180e222718ab9c"
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
              parent_authority_digest: "sha256:8efaa535a688a4b9c03d47361a5b0310c00ebac1c6080b0173b7eba85c5a8f88"
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
            repository_fingerprint: "sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
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
              - "packages/agentplane/src/cli/run-cli/command-catalog/project.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/project.ts"
              - "packages/agentplane/src/commands/recipes/impl/v1-conversion.ts"
              - "packages/agentplane/src/commands/recipes/preview-v1.command.ts"
              - "packages/agentplane/src/commands/recipes/roadmap-v1-v2-conversion.test.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/recipes/src/index.ts"
              - "packages/recipes/src/scenario-conversion.ts"
            evidence_digest: "sha256:8fced74badf10708df36f0ea63b57bc042cd38b8ed736fde7bd9c1637c9b914b"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d562682ced70444b351be7825f899fd84bcb09774d23d3207ea597d2a2166c2e"
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
              parent_authority_digest: "sha256:dacef0bedc99ad1f5c3819256a17124029f55aeb3d2156a1d2180e222718ab9c"
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
            repository_fingerprint: "sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
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
              - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/project.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/project.ts"
              - "packages/agentplane/src/commands/recipes/impl/explicit-selection.ts"
              - "packages/agentplane/src/commands/recipes/preview-v2.command.ts"
              - "packages/agentplane/src/commands/task/create.command.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/agentplane/src/commands/task/recipe-input.ts"
            evidence_digest: "sha256:a6ccc4e1dfad7347ce8115858e15f3cb15f3028ee478007a2404b61ecdfb4795"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:146a3b22795d2e0ec7f435b9a81f281a5d368265844c631e12186e1d628aecbb"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:99409ad20108a18ccb8410d99c346baa99fd8bf82623c804aa8748e700ef237c"
            plan_revision: 3
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d562682ced70444b351be7825f899fd84bcb09774d23d3207ea597d2a2166c2e"
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
            repository_fingerprint: "sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
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
            evidence_digest: "sha256:d23b9a355399f996dd1759b2d5c61a600d18b27374ece5f2fde0c3f475794dbb"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:85970c1fcc47abab716302e7f5559d77374d886affb8574cffe9aa9be72df273"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:99409ad20108a18ccb8410d99c346baa99fd8bf82623c804aa8748e700ef237c"
            plan_revision: 3
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:146a3b22795d2e0ec7f435b9a81f281a5d368265844c631e12186e1d628aecbb"
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
            repository_fingerprint: "sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
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
              - "packages/agentplane/package.json"
              - "packages/agentplane/src/commands/recipes/impl/apply.ts"
              - "packages/agentplane/src/commands/recipes/roadmap-installed-recipe-negotiation.test.ts"
              - "packages/agentplane/src/recipe-api.ts"
              - "packages/agentplane/tsup.config.ts"
              - "scripts/lib/test-route-registry.mjs"
              - "scripts/release/check-local-tarball-install-smoke.mjs"
              - "scripts/release/installed-recipe-matrix.mjs"
            evidence_digest: "sha256:250572c7b1581df2e25f86a90876f13ee242b3ba1dc87b3ae0743928815e464a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:8e5a4d3a2cb228a8107f9fbccc436d47044dd86633ee9da7dc19d400fab96c38"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:e5d98a4bb211f708e997673e9e9be06d1d0c383c09c524a19fc4bbb6eeca418a"
            plan_revision: 4
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:85970c1fcc47abab716302e7f5559d77374d886affb8574cffe9aa9be72df273"
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
            repository_fingerprint: "sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
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
            evidence_digest: "sha256:b02530c01df96bf7a0cae45d8ebb7909184ef099e2f951963ed523b5aa584d9a"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a5ef99a64420297bdf6fbc5e11e49ac35b1f5e3657a354aad74d2a1e9b1464ed"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:6842d8b1f22bd013d5c125b138b15b36873315630886c3199542adc067a5c956"
            plan_revision: 5
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2bf0ceda5f1623766563d33b97fe917ccff227e7df9d5222dcea2eee3976a34e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:8e5a4d3a2cb228a8107f9fbccc436d47044dd86633ee9da7dc19d400fab96c38"
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
            repository_fingerprint: "sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
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
            evidence_digest: "sha256:6b892fa7ae75d23a344010a08b5ba198f6acba929c92b3099a34bfcddc45d410"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0c39137c512added864e1d48f1db5a79ce6d3bbc10848c964c1d1348ba5a8264"
        digest: "sha256:6842d8b1f22bd013d5c125b138b15b36873315630886c3199542adc067a5c956"
        revision: 5
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
            contract_digest: "sha256:31f0ab3b1d1b753fe245f8f82e76b068f919b423bfe96e230cd7e5b1be0b3905"
            depends_on:
              - "rc-15"
              - "rc-supervisor-composition"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
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
                - "scripts/lib/test-route-registry.mjs"
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
          -
            contract_digest: "sha256:21c6639fca48134c5cbd5843596a2a0a2b4004be1881b9b7b197e564bf0dddef"
            depends_on:
              - "rc-15"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-work-order.ts"
                - "packages/agentplane/src/commands/task/kernel-work-order.network.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/shared/declared-check.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/kernel-advance-network.test.ts"
            expected_outputs:
              - "rc-supervisor-composition-evidence"
            id: "rc-supervisor-composition"
            optional: false
            required_inputs:
              - "rc-15-evidence"
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
        amend:sha256:6842d8b1f22bd013d5c125b138b15b36873315630886c3199542adc067a5c956:
          after_revision: 150
          aggregate_digest: "sha256:4b8e1d24fa83a3d85916b5dd81b125bff5f5e7ec521835f7044cc19c4ebb59d1"
          before_revision: 149
          command_digest: "sha256:f108f49861f8840e3cf0533df0ea61eebd17af5f52929b0152e4f3fcb75992fc"
          effect_ids: []
          event_digests:
            - "sha256:f535bdf98845ddcfe3d5b15def9fd2d72563812ab13e6d9b76d7cc78860c7f10"
          mutation_id: "amend:sha256:6842d8b1f22bd013d5c125b138b15b36873315630886c3199542adc067a5c956"
        amend:sha256:99409ad20108a18ccb8410d99c346baa99fd8bf82623c804aa8748e700ef237c:
          after_revision: 139
          aggregate_digest: "sha256:fce8fba6742b7fca031a13bfc9f8eebdf1998a73fa9a4384a375a6e6663bbcf1"
          before_revision: 138
          command_digest: "sha256:a36a55795356edd6ae9fe084b48ce6ae9e4e370bc7d9ce9ec7ed80e0efb96e06"
          effect_ids: []
          event_digests:
            - "sha256:dd21af4c6e6904dbe609d20cc8aa442acced23473d6d00e97ae7a00985ecd341"
          mutation_id: "amend:sha256:99409ad20108a18ccb8410d99c346baa99fd8bf82623c804aa8748e700ef237c"
        amend:sha256:e5d98a4bb211f708e997673e9e9be06d1d0c383c09c524a19fc4bbb6eeca418a:
          after_revision: 145
          aggregate_digest: "sha256:8a3aed4f27c878eea5bf870d0f2def92b8f11d32176514c7deb632f0a4dd88a1"
          before_revision: 144
          command_digest: "sha256:285f6158d63161f862a840468e6252d7cd664a4742172c8bf5f8142f2d640ed5"
          effect_ids: []
          event_digests:
            - "sha256:36117e0c5171d38e55fe83740456952f1c228a1fd13ab7748ba439122b010130"
          mutation_id: "amend:sha256:e5d98a4bb211f708e997673e9e9be06d1d0c383c09c524a19fc4bbb6eeca418a"
        capture:202610041748-K43XFE:
          after_revision: 1
          aggregate_digest: "sha256:91a0d450ad8c99e0f37f5fbbec222763f3eda75dade1b7a0059d51224ed6cd90"
          before_revision: 0
          command_digest: "sha256:97044d87bbe2afdf30f80307ae6e7832e866a9614d9e3bee895e9fea0232c176"
          effect_ids: []
          event_digests:
            - "sha256:892fbf2ebda2527fcb8b88df498902d79e869698c4e38d570983ff645d9ff615"
          mutation_id: "capture:202610041748-K43XFE"
        kernel_work_item_claim_required:sha256:0f732e66e5add00be77226cd43a9d163fe1c042079a404da8648ed08582eb7ad:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:
          after_revision: 141
          aggregate_digest: "sha256:5d5cd5939a5820f23991e65f9d8563ae2ed7bb81da52cc21e53a871a7f69dcbc"
          before_revision: 140
          command_digest: "sha256:b93026a70b7e5b1b8c50418c3edbfe04d937c4bd3920804222df6faea85e9005"
          effect_ids: []
          event_digests:
            - "sha256:99fe888c4050f2d035785ee30778dc509a37a39a5b2b651f934ece6a214dc8cc"
          mutation_id: "kernel_work_item_claim_required:sha256:0f732e66e5add00be77226cd43a9d163fe1c042079a404da8648ed08582eb7ad:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        kernel_work_item_claim_required:sha256:111480acb5339cd5c9aa45c1a375362e1f5d0a3452a982611521063d28257897:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4:
          after_revision: 45
          aggregate_digest: "sha256:a52716d97fb27aaed7eebc9039f7af2d7e4375df6f5d229f2ac795e31b9b3afb"
          before_revision: 44
          command_digest: "sha256:4b7dc9691d2f1eed8b4b423f6f1e6715554b2ed8543fb5d5c84df9f055514775"
          effect_ids: []
          event_digests:
            - "sha256:5e8a7ed46bfb4457ea9328e395aa188ea5c888290bf1b85d341288ca0324b99f"
          mutation_id: "kernel_work_item_claim_required:sha256:111480acb5339cd5c9aa45c1a375362e1f5d0a3452a982611521063d28257897:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
        kernel_work_item_claim_required:sha256:1c7d582e676b73f0d21a237a3b406beb1a5677dab4f6ad8e21eccb4bce76034e:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45:
          after_revision: 73
          aggregate_digest: "sha256:f29f7e655c97875db99216b6c379f4368b4e692deed9a4c68761736d17f101cc"
          before_revision: 72
          command_digest: "sha256:3b1c322d84dd358343e8e7254a6bb322857e80325d919038734e4d3acfefaf7e"
          effect_ids: []
          event_digests:
            - "sha256:9f688891f4b67e5e1e2640cada8952711b7a32b6c69cc0da6e593f98fca59694"
          mutation_id: "kernel_work_item_claim_required:sha256:1c7d582e676b73f0d21a237a3b406beb1a5677dab4f6ad8e21eccb4bce76034e:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
        kernel_work_item_claim_required:sha256:395f053104eb7d485c4d76a5d24f07f23143d81cb05847a3d62f33c984bb283b:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:
          after_revision: 136
          aggregate_digest: "sha256:387e675a7c7e5cfbb7160922aeec7e7056ec1fbdbb45155ea5f615dfbe7f9c71"
          before_revision: 135
          command_digest: "sha256:4d589932d3bdc2f4c648d601725475ea05bd3b47fb39bf8362e035d5a0e06a2d"
          effect_ids: []
          event_digests:
            - "sha256:2bd67bfe060349c6ddd9a7260aece3e0a52892d0c5e62876fde68cb9b6d4b476"
          mutation_id: "kernel_work_item_claim_required:sha256:395f053104eb7d485c4d76a5d24f07f23143d81cb05847a3d62f33c984bb283b:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        kernel_work_item_claim_required:sha256:3a7a6a2df8f41e6299318d0245ac3a03ebd72cdb368972156a9691eaef8aec45:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:
          after_revision: 147
          aggregate_digest: "sha256:a35b47ad9b48e02dcf1996b08ebd542c188a98800e195e460eada03357de83bf"
          before_revision: 146
          command_digest: "sha256:46cda69aeb5002ba824a0c5df3d06efb31765df04339e6ad3b07749eb68913f7"
          effect_ids: []
          event_digests:
            - "sha256:d0c73bb8398ff43a0cd5f311150229890e23dfaab50ac8df82aacad49b45d67c"
          mutation_id: "kernel_work_item_claim_required:sha256:3a7a6a2df8f41e6299318d0245ac3a03ebd72cdb368972156a9691eaef8aec45:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        kernel_work_item_claim_required:sha256:403df9e537ce71a8a0c8e97101310b54342f730890143601b36ad27a8cfdbd05:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8:
          after_revision: 122
          aggregate_digest: "sha256:2be8b79fbcf47233244612199890a3c24576dfd661cdcb63e23cb73a61c6a529"
          before_revision: 121
          command_digest: "sha256:c5f41d870df2a7a4e5cfb78ae2c9e2d11b9cc8ae28d8f47117d9388129910549"
          effect_ids: []
          event_digests:
            - "sha256:2e5a2f8287c4f1de674eee8e72d10d017fa5231c2f74ef6d4b33d853658b8cb3"
          mutation_id: "kernel_work_item_claim_required:sha256:403df9e537ce71a8a0c8e97101310b54342f730890143601b36ad27a8cfdbd05:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
        kernel_work_item_claim_required:sha256:59e141efac5175977b1c0fddbe4db2b966af96416439e132344b44b0c2a8813d:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:
          after_revision: 17
          aggregate_digest: "sha256:41fac9eef3d2db6ff1e9fb4fb2bd93447098b6b678cd80e859a38ec40d424adf"
          before_revision: 16
          command_digest: "sha256:27b20addffa85ada2fd85d263850ad2a261313b9921e035d95a1d0f5db32a0cb"
          effect_ids: []
          event_digests:
            - "sha256:fb07f1168566cee7bfe8441b6ca95e1414bf33b349ba21de7dac297e57bee8bb"
          mutation_id: "kernel_work_item_claim_required:sha256:59e141efac5175977b1c0fddbe4db2b966af96416439e132344b44b0c2a8813d:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        kernel_work_item_claim_required:sha256:65aca806f1a2528a32e9fd4687cabbfa120844c66818b5cc37deded95413c726:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b:
          after_revision: 94
          aggregate_digest: "sha256:69cef8ad1d7d0e75f5356f7fe48022b984ed3441439c915142e4ccf7016df3c9"
          before_revision: 93
          command_digest: "sha256:68b6eb25b299fd5559077b7365010938f28b13df236810304131ab231ce73613"
          effect_ids: []
          event_digests:
            - "sha256:6e1464e0cf36b6169a3c1bb7535a492ffc162ce838814e702fda98c04c8abada"
          mutation_id: "kernel_work_item_claim_required:sha256:65aca806f1a2528a32e9fd4687cabbfa120844c66818b5cc37deded95413c726:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
        kernel_work_item_claim_required:sha256:6ed6d8bf5b4b20f3982424e4ee0237f40d73f787e96498f2aa5cdb8e71e4071a:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143:
          after_revision: 129
          aggregate_digest: "sha256:bdb76329e9346a8e723ef9102ff721445c88357a2496c833afcfa9b5d3c16215"
          before_revision: 128
          command_digest: "sha256:88a48b2bc1a50baff93d26396efb6ef1e14f460d6d68da36d03b31c1759d8cd2"
          effect_ids: []
          event_digests:
            - "sha256:1b142cf7b922b71488d4152666af48f271d1a00299203493d9aa8be73e8ee77d"
          mutation_id: "kernel_work_item_claim_required:sha256:6ed6d8bf5b4b20f3982424e4ee0237f40d73f787e96498f2aa5cdb8e71e4071a:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
        kernel_work_item_claim_required:sha256:6f825e640b9418a3da6261eb9d71884ae52362843a5101dc8434117b911df532:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554:
          after_revision: 108
          aggregate_digest: "sha256:1c4ac696572c41b4517f65212e75fbde400dd5d447bc76e9f21ebaa57165faed"
          before_revision: 107
          command_digest: "sha256:abaf1a52a327f0993671cdf038bac302efda81563ed03654eb1eaa26168ac642"
          effect_ids: []
          event_digests:
            - "sha256:6318b992df562ce2e4bd3aae76c12899552c7663b5c1f9e8ba83866b18d7d963"
          mutation_id: "kernel_work_item_claim_required:sha256:6f825e640b9418a3da6261eb9d71884ae52362843a5101dc8434117b911df532:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
        kernel_work_item_claim_required:sha256:7b9ac56e0d7d0e1b388f77340bdd21414221b917e195bd6e4c81e6356ef29568:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d:
          after_revision: 38
          aggregate_digest: "sha256:93b45aa379d43dbc3b085ca460f76b33d4f7eb3c3d64d4b49b9ce1dfb4195935"
          before_revision: 37
          command_digest: "sha256:9ac02c95807cf5bb5169568e04db5669b7b2c43a620cbdfcf71de579ad7642e7"
          effect_ids: []
          event_digests:
            - "sha256:11e89c538f4230504c26b5a59aecc3de6ba9b3ddbffc2e0143f5fd62b0b2dcd3"
          mutation_id: "kernel_work_item_claim_required:sha256:7b9ac56e0d7d0e1b388f77340bdd21414221b917e195bd6e4c81e6356ef29568:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
        kernel_work_item_claim_required:sha256:913d0ba5b0a0ff6dd87c1c1ca8c68909cbf6d2520cdde769635d1a19b39df662:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f:
          after_revision: 59
          aggregate_digest: "sha256:40197c4a46becc2db90219d54f8cc87b6a4804d6d7341eea0cadc0c25310b796"
          before_revision: 58
          command_digest: "sha256:fe69faccccd17435c091d6e8c275b1c509a24e53d837975d63b08338bbd77be3"
          effect_ids: []
          event_digests:
            - "sha256:ae596a4e379faa8b3bcc24bc887931ffffdb3a27caafd033ee068507daf453bf"
          mutation_id: "kernel_work_item_claim_required:sha256:913d0ba5b0a0ff6dd87c1c1ca8c68909cbf6d2520cdde769635d1a19b39df662:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
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
        kernel_work_item_claim_required:sha256:c0fba8e236aa9797b5040bc82784dff13f86701b5a94fc45be1afb9184cf4f86:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75:
          after_revision: 87
          aggregate_digest: "sha256:f3af6bdc9799986419ce8304d25883fa2946d07ba243d6857c396c30c3f8a7e4"
          before_revision: 86
          command_digest: "sha256:4412889dcdfaf7c7a41e2c5eafbba778163cf382a4e85d615bd5244ba1a6a1d5"
          effect_ids: []
          event_digests:
            - "sha256:91678c90ed86cd39483875d36e2136e2aa3aaeadbee4f69427f1035d18119105"
          mutation_id: "kernel_work_item_claim_required:sha256:c0fba8e236aa9797b5040bc82784dff13f86701b5a94fc45be1afb9184cf4f86:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
        kernel_work_item_claim_required:sha256:d503997681ccf311a2acd5a3d533b98ee4fbe427e769a09c3a03dbb1d24e7d7a:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:
          after_revision: 152
          aggregate_digest: "sha256:ccc43b8506bf1edf9acbc7a0248b10e4ab786632ee2eb884b52a49c603bd4ca2"
          before_revision: 151
          command_digest: "sha256:1903a9e6afd36add615e7cda0a133757ad9be62be5f05fad76d6bd937ab8af41"
          effect_ids: []
          event_digests:
            - "sha256:212239138b7ed8a25d392a83a30b3e0470fa9f6ceb89052435c8ec5879794937"
          mutation_id: "kernel_work_item_claim_required:sha256:d503997681ccf311a2acd5a3d533b98ee4fbe427e769a09c3a03dbb1d24e7d7a:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        kernel_work_item_claim_required:sha256:dbe88eacf0d325226d56fd735d80fb23eae7ea7faedd13280d6fc782686466d7:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b:
          after_revision: 80
          aggregate_digest: "sha256:987f4a9312a171c36a8a3cb39648c281fd89642f8dea70e2c829cd110037c867"
          before_revision: 79
          command_digest: "sha256:dd53e9faed4ab15f79fe34317865302380eda5edb216c9351ba433e1b04ba29e"
          effect_ids: []
          event_digests:
            - "sha256:b40461fabf0377e41d290cd6885c6b509b8ac250a4d0ff5053883bca4050b67b"
          mutation_id: "kernel_work_item_claim_required:sha256:dbe88eacf0d325226d56fd735d80fb23eae7ea7faedd13280d6fc782686466d7:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
        kernel_work_item_claim_required:sha256:eae55e3dc897945d6c4ee443cee3890537ba9b9c8e18914dd67343f0e5b6e744:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813:
          after_revision: 101
          aggregate_digest: "sha256:0a78af1cfac15669f0199855303dd5b2c597cb5589519ca4f7ee716fcd1c0ec5"
          before_revision: 100
          command_digest: "sha256:e130fadad27f459c3f4a310818763d945637f3f256543b0ca679f2c689f3a69c"
          effect_ids: []
          event_digests:
            - "sha256:abecebec40b924f4d6e8b68c81d76fddc4cd6583afe9c54c1df7f3ea9d4ef338"
          mutation_id: "kernel_work_item_claim_required:sha256:eae55e3dc897945d6c4ee443cee3890537ba9b9c8e18914dd67343f0e5b6e744:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
        kernel_work_item_claim_required:sha256:fae9bc2af7d722f0e81823b3cc689b1da30ef09dd8b7486c1fdb140a750ddc4a:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 10
          aggregate_digest: "sha256:c3d51e18e27d824638368795988d28a56143f6d6b43e4739752171281ab6ca08"
          before_revision: 9
          command_digest: "sha256:56e5a1f10d7afc1f4e1dd6a16b58ee71a7787509247b86e2d03c5e4d2292594a"
          effect_ids: []
          event_digests:
            - "sha256:40c7cd51ac0ac0674f4aff47708f60e95947484d22f0df2436fef2a7a5eac31b"
          mutation_id: "kernel_work_item_claim_required:sha256:fae9bc2af7d722f0e81823b3cc689b1da30ef09dd8b7486c1fdb140a750ddc4a:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_claim_required:sha256:fdb3d1a73c7a6050e1939ec0cddf3e6e42c63dddcd3b753d2c826c05d5bd3280:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465:
          after_revision: 66
          aggregate_digest: "sha256:a1b685d95fad495dc8a70a33d53d6a50338ad8edaf875f0dcf6b2f5d19bbcef7"
          before_revision: 65
          command_digest: "sha256:23b0d5b8d4114bc8a18e8d918d5c563248bf4fc1b57511d523c19f69cf3b7d60"
          effect_ids: []
          event_digests:
            - "sha256:d6c8f5ded4cf5ee123d8a98b45b677c877a79550e1a16486178d4875d2b63e17"
          mutation_id: "kernel_work_item_claim_required:sha256:fdb3d1a73c7a6050e1939ec0cddf3e6e42c63dddcd3b753d2c826c05d5bd3280:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
        kernel_work_item_execution_required:sha256:018fee6e483e6eb905bc5feffa1b904772c98b3bc3d4d37913ccc69c24a1c9a8:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:
          after_revision: 142
          aggregate_digest: "sha256:3f3770e086a004c0d05a1675cf1a21a90c2e604e43cbba88b45df24aa476565c"
          before_revision: 141
          command_digest: "sha256:7d5b3134671376214eac3e788168394e44fb8bb5038648c2b0c0acd4ee142c4e"
          effect_ids: []
          event_digests:
            - "sha256:bbf9a8c1da8d6a2b6d1aab8ff400219b06c8d316a6c040b137f8523673b82c99"
          mutation_id: "kernel_work_item_execution_required:sha256:018fee6e483e6eb905bc5feffa1b904772c98b3bc3d4d37913ccc69c24a1c9a8:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        kernel_work_item_execution_required:sha256:0ef1bddcf024f2d7a0a23d5aa6fa4bcb55feebe091eadcd677b52bccb8d13beb:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813:
          after_revision: 102
          aggregate_digest: "sha256:e293ce711dcdbe5f96025ed466e38741c7df711c02cbb23342b042a5b5e3f249"
          before_revision: 101
          command_digest: "sha256:658164b8c0bafda439b3112aea17fb6d39611303b73ae1f1d690ec685dab4588"
          effect_ids: []
          event_digests:
            - "sha256:4e2d13b56d7ee25b75bdcb66879fae3d4648244dd7c2209b96facd1ed4ed28e7"
          mutation_id: "kernel_work_item_execution_required:sha256:0ef1bddcf024f2d7a0a23d5aa6fa4bcb55feebe091eadcd677b52bccb8d13beb:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
        kernel_work_item_execution_required:sha256:195cab7ea0ad169b602435fa8ea02f02f9a64fa9869c90baf42dc29fb4a2f120:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060:
          after_revision: 53
          aggregate_digest: "sha256:031049c9edf8c85bf49dea437223b4da17f90fdd57eba4b692fec8dd67731217"
          before_revision: 52
          command_digest: "sha256:9675cb4cadf38ee8e34ee91b2515c2cd8c0caf09b7695a5013bdc770e3a3768e"
          effect_ids: []
          event_digests:
            - "sha256:75987e62f7bf6b30a016735e3d6598c67e1d823826b134ed4465d4086a591272"
          mutation_id: "kernel_work_item_execution_required:sha256:195cab7ea0ad169b602435fa8ea02f02f9a64fa9869c90baf42dc29fb4a2f120:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
        kernel_work_item_execution_required:sha256:2cb8d593d4de3d0d7adb7849ae61d4eda90150e679080ec61b5c1f4779339416:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:
          after_revision: 137
          aggregate_digest: "sha256:85604a690932abe461485c11bd1cd94e288428220de6e5b43e56001e362d7988"
          before_revision: 136
          command_digest: "sha256:7588dc1354d83d311c544f097be7fcb86f9fc8a39dc1e8f58ddee80a9291a9b4"
          effect_ids: []
          event_digests:
            - "sha256:226a92ad3aa41745278d545e02206d6841a3825cff3b6235ade1e132eac53d20"
          mutation_id: "kernel_work_item_execution_required:sha256:2cb8d593d4de3d0d7adb7849ae61d4eda90150e679080ec61b5c1f4779339416:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        kernel_work_item_execution_required:sha256:3023b0d03a890e77b64a7664159ccea50ae4f62593fed4ee829c2047fbd00c68:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 6
          aggregate_digest: "sha256:944bc99a8aa15148a532d2eb2001db52484c6c8fa24caa0be170daf77c48a48f"
          before_revision: 5
          command_digest: "sha256:6330fe6f57620ea75485353744e1508b097b56aaffa33659ad0ef16bfc8609c1"
          effect_ids: []
          event_digests:
            - "sha256:b9686121e60db44bae1f22dcae24901e47aa1e1063d201f477421a682f07f9b3"
          mutation_id: "kernel_work_item_execution_required:sha256:3023b0d03a890e77b64a7664159ccea50ae4f62593fed4ee829c2047fbd00c68:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_execution_required:sha256:34c61068744cdd19d7b036e765706563b0dc7cf1a5e8374db1297885fe18f347:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8:
          after_revision: 123
          aggregate_digest: "sha256:4ecac7a84545ad95a5d6bc29650f13556c0dcd2c9ac292393ba79b9fb3769579"
          before_revision: 122
          command_digest: "sha256:32520621933fc7603ebc0d692d07f198cb3c8380ac341e714630c9def3048854"
          effect_ids: []
          event_digests:
            - "sha256:284860a66b4f3098d98aa179c474a8e8c5105c911c3af91ade22b03021b0f645"
          mutation_id: "kernel_work_item_execution_required:sha256:34c61068744cdd19d7b036e765706563b0dc7cf1a5e8374db1297885fe18f347:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
        kernel_work_item_execution_required:sha256:3858c4e2593ca3a5f54616d880dd6a01d6d216912a0f09bb3856c23b64c52b72:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f:
          after_revision: 60
          aggregate_digest: "sha256:f7f88d5a7472c087df2ca042044c304b2a7a1af643fa65290d9782ae6f245b35"
          before_revision: 59
          command_digest: "sha256:6bafcc866dd804bca96968d97fc730923fce2c51a09eddf1c9e66d180155860e"
          effect_ids: []
          event_digests:
            - "sha256:a271dac6aba255eaf3d61bc2aea31faf63f1b64bacf4af2553302a0367df5379"
          mutation_id: "kernel_work_item_execution_required:sha256:3858c4e2593ca3a5f54616d880dd6a01d6d216912a0f09bb3856c23b64c52b72:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
        kernel_work_item_execution_required:sha256:4157967ed43bce4627426934f36925524ec8f55b423ede6776146a2d22e190cf:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 11
          aggregate_digest: "sha256:e1bea100e26c0562682b5c762555e5252d50532e89135862e6651d54ff3a89ff"
          before_revision: 10
          command_digest: "sha256:6b90823221f5d1fc3fe8de28b11b245d366ac913f0474c8370810ee9131267b3"
          effect_ids: []
          event_digests:
            - "sha256:2f229958cd726de7ce8941a1f5057565f53be793eb62dc49bb5256531d59fa7f"
          mutation_id: "kernel_work_item_execution_required:sha256:4157967ed43bce4627426934f36925524ec8f55b423ede6776146a2d22e190cf:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_execution_required:sha256:462d8e190a856348e269c48b114a0a442470071b7e451f6ea223cfd76c3138e1:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b:
          after_revision: 81
          aggregate_digest: "sha256:a51a62791df2b415d56920f9a174f68d3b5cfdf5f798f15bb5becff0c238aa56"
          before_revision: 80
          command_digest: "sha256:81c8ec427d16ebac0efa0d415710c6f0a53ceb6d81fa74685339e59e2f67c720"
          effect_ids: []
          event_digests:
            - "sha256:fea170166f4804e944e5ad48f6d1987db8051c94a957a4eeebef2fed5f7c984f"
          mutation_id: "kernel_work_item_execution_required:sha256:462d8e190a856348e269c48b114a0a442470071b7e451f6ea223cfd76c3138e1:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
        kernel_work_item_execution_required:sha256:62687f82153f5367a3bd81ecac7f8d988ff7846e08911458173a260a83d6e8a6:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:
          after_revision: 18
          aggregate_digest: "sha256:c21d4fdbe29bd6ce14f6d2b69e7b00be48f11c6794731790cb85fb0c5d3c0f71"
          before_revision: 17
          command_digest: "sha256:adae0b67cf777d2e114a5675b0d8a849320c6ab43d0095a339f8339a8fc24b82"
          effect_ids: []
          event_digests:
            - "sha256:9dd0dfa1eaa46b1c5e4efffd79dd551be7289b95b4261654376feb1900ddfe88"
          mutation_id: "kernel_work_item_execution_required:sha256:62687f82153f5367a3bd81ecac7f8d988ff7846e08911458173a260a83d6e8a6:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        kernel_work_item_execution_required:sha256:6ac2ced714d1ac5cd77b9efb6e2ec7aad5c80b09a90cbc446b6f9fb62c785ead:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554:
          after_revision: 109
          aggregate_digest: "sha256:dd7377003f6ed6948695222a43b5d3b29ecd63e1864de03085768c5f5c17e92f"
          before_revision: 108
          command_digest: "sha256:5e2a9007856df0897a3efb1d045ae6743358824b792d1b91508d01e52e30e240"
          effect_ids: []
          event_digests:
            - "sha256:92556485ed70c6f7f2b153d9290b1fad9276580deab2996cdbda9f87df85304b"
          mutation_id: "kernel_work_item_execution_required:sha256:6ac2ced714d1ac5cd77b9efb6e2ec7aad5c80b09a90cbc446b6f9fb62c785ead:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
        kernel_work_item_execution_required:sha256:7284dab30128aaf164ab2e80a4c16bf4ee91335a13a173558ec71d62f3dbb540:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75:
          after_revision: 88
          aggregate_digest: "sha256:59c7e3842da0539d594515933a3ac843b526482b2d066d4f905dd51e23c1712a"
          before_revision: 87
          command_digest: "sha256:13c28246060840aa29348540cd6fd02e8eb457eaa45d56b33828f6b77a9e0101"
          effect_ids: []
          event_digests:
            - "sha256:27e644a4e023fcd54eebba321307c1323297996ef070db23baf1173d52312564"
          mutation_id: "kernel_work_item_execution_required:sha256:7284dab30128aaf164ab2e80a4c16bf4ee91335a13a173558ec71d62f3dbb540:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
        kernel_work_item_execution_required:sha256:83986cf915ac1790538270a5bc8fae4b5e41938c16e492bf5cd4f2688ed65fad:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d:
          after_revision: 39
          aggregate_digest: "sha256:ccaf8c9d23fa62af8f8bf34bb41e9cb2de8f71555d0d94084754812ab2dad599"
          before_revision: 38
          command_digest: "sha256:c2edb8a1387b42790b3ddd5b29481e87a2850c81021f120f72c3b50f1d3ab012"
          effect_ids: []
          event_digests:
            - "sha256:5972277b6631c7a68f3fc5ff73590c0186c1eb912faecff4829afabcf01498ec"
          mutation_id: "kernel_work_item_execution_required:sha256:83986cf915ac1790538270a5bc8fae4b5e41938c16e492bf5cd4f2688ed65fad:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
        kernel_work_item_execution_required:sha256:852e7d7f75486bf8760cb353e28374ced74fca268d11c1808a90056ff22e9981:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465:
          after_revision: 67
          aggregate_digest: "sha256:89528db78c962b6fc43da9f294b50bb0ace25d47758b8a250a3cbb019af5d86c"
          before_revision: 66
          command_digest: "sha256:62c131cfd1cf3f26b3899347cea163e3fddcd743fd3c1eab0800362c012d5f43"
          effect_ids: []
          event_digests:
            - "sha256:56e1f217cc7278f8fe0b6dbc1e8941f02fc56063bb4adc3c1071e8b4c1088bd6"
          mutation_id: "kernel_work_item_execution_required:sha256:852e7d7f75486bf8760cb353e28374ced74fca268d11c1808a90056ff22e9981:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
        kernel_work_item_execution_required:sha256:9280b00dad0add91104f27bec684d18a9878849850a9478886b09ac8fafbb565:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:
          after_revision: 153
          aggregate_digest: "sha256:930eac1bed49e025d52406082a1c68c0aa669a237e3b2c6f1cc57adecaf1f41c"
          before_revision: 152
          command_digest: "sha256:cbe76d0f93580ff5477f157f28c1ae3afd57e8863e8deda558a2bf61a2e9e805"
          effect_ids: []
          event_digests:
            - "sha256:8b9e4f7b9310f1ed24b1df04bf5ef74c5c158f85bb3a6b98ca48964d667da37e"
          mutation_id: "kernel_work_item_execution_required:sha256:9280b00dad0add91104f27bec684d18a9878849850a9478886b09ac8fafbb565:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        kernel_work_item_execution_required:sha256:9b1e87fe492da2b2f6cfe3e017b30d9b7ab69070fd299beb023cb798b06d7bf5:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:
          after_revision: 25
          aggregate_digest: "sha256:224fbbc81b81e68f440a915c10ef9a25469ecdf2e691ac07fb30d668514ef18d"
          before_revision: 24
          command_digest: "sha256:32d1453c6d945f65b629f41a2564246c974bd906974d8a923f6571ceb7b3b396"
          effect_ids: []
          event_digests:
            - "sha256:7b16be2026d8f31a5745f511bdc6c39690b14e4c5ca576dcaf050c48ec3996cd"
          mutation_id: "kernel_work_item_execution_required:sha256:9b1e87fe492da2b2f6cfe3e017b30d9b7ab69070fd299beb023cb798b06d7bf5:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        kernel_work_item_execution_required:sha256:aa073b7b0fd35f580d7479476755e6f22a9d9d8366c5da9f6a27ad7c850e011e:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b:
          after_revision: 95
          aggregate_digest: "sha256:50b280eedc63fdf6bfef3cb02976211f75459df5069040dfa874d597ea132a2c"
          before_revision: 94
          command_digest: "sha256:68f59cec1713291072f70f5c6fcb1ba9d1996ef2e45c280902fa7c9edf461580"
          effect_ids: []
          event_digests:
            - "sha256:07d733bf08902a57cc809a710e75d5df0f984b2142f4d293fe24cebae97c8f75"
          mutation_id: "kernel_work_item_execution_required:sha256:aa073b7b0fd35f580d7479476755e6f22a9d9d8366c5da9f6a27ad7c850e011e:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
        kernel_work_item_execution_required:sha256:aa175858abb82d4c637e92de7ff48d6bb2c25b7c31a022e2942612a33c27edb2:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:
          after_revision: 148
          aggregate_digest: "sha256:b51d46de7519ffec446ba939cfc1ece15690c1780ebd87e65a076fb478f975bf"
          before_revision: 147
          command_digest: "sha256:9ee68951f15f83ca317df789733e953b57998d8f0c1c9de72108c28e2f918885"
          effect_ids: []
          event_digests:
            - "sha256:bee624e36c115e7e321972dbbaede30635628bbcd2babfe170762529cc520662"
          mutation_id: "kernel_work_item_execution_required:sha256:aa175858abb82d4c637e92de7ff48d6bb2c25b7c31a022e2942612a33c27edb2:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        kernel_work_item_execution_required:sha256:b385dd83541a6421a95d60b9d28f5d81799fe666454317322fe93807c5302d7b:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143:
          after_revision: 130
          aggregate_digest: "sha256:f15c2ce05fd892404dacf3531396228b51961ef1ae86a32b752c8f0f9cce36e3"
          before_revision: 129
          command_digest: "sha256:33b05670827ca8b755f440c5e48f7df2944020de5dedd89628d5cfb7d02ff2f9"
          effect_ids: []
          event_digests:
            - "sha256:19bd8acba7f1555d470b8241f54a65f43d621884a6edf7b031b8f790cfd6eaa8"
          mutation_id: "kernel_work_item_execution_required:sha256:b385dd83541a6421a95d60b9d28f5d81799fe666454317322fe93807c5302d7b:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
        kernel_work_item_execution_required:sha256:bb4f854ebc5c6ed88f8021e953bfd8377700c7a53ada90619e2c6a82c4617670:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7:
          after_revision: 116
          aggregate_digest: "sha256:b1bfbcb3c1b5235b28d125b2d9a9a90d9c238c81c185f56dff270fa462e7e7f0"
          before_revision: 115
          command_digest: "sha256:178d0125059f727ad45c9f925843fdf0ece3cb5c8d6630a73266da14a3db6747"
          effect_ids: []
          event_digests:
            - "sha256:802a5e2dd2d5f172d79a534184923837dddd32cb4997ef8aff9c0a91b4c25502"
          mutation_id: "kernel_work_item_execution_required:sha256:bb4f854ebc5c6ed88f8021e953bfd8377700c7a53ada90619e2c6a82c4617670:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
        kernel_work_item_execution_required:sha256:cd145d1101e4fc465628f2256b3aacb4a43038d645b623438ec1bdf17032d640:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4:
          after_revision: 46
          aggregate_digest: "sha256:231abb6060f45a845968147fff6233e68ae519361fc5d2c209a1a149ad7d4c86"
          before_revision: 45
          command_digest: "sha256:9f6d7624a277914a3e8908bc13087eb8f9b881484163d5d09becf089bcb28141"
          effect_ids: []
          event_digests:
            - "sha256:00a93cd060294436a77c2d9282fc05c3c8df3bb5b1e9a8f7757193d00707730f"
          mutation_id: "kernel_work_item_execution_required:sha256:cd145d1101e4fc465628f2256b3aacb4a43038d645b623438ec1bdf17032d640:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
        kernel_work_item_execution_required:sha256:dd6e48b289a059f56237ecd92f0ab88644934a1ac2361cfe3bdecc6e89a8c6e0:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8:
          after_revision: 32
          aggregate_digest: "sha256:0ada2e9baaca7c895921a4a7920d9cc503432e5c205dc0e1c8c9d07c43e57d88"
          before_revision: 31
          command_digest: "sha256:4c2b8ee374fc2fb0de987fec9bad80864907089ac3530afc9c03a7021f73c3db"
          effect_ids: []
          event_digests:
            - "sha256:88fdcdf3357407c3d9fc3043d9bcb8b2a4580d05f5577a6aaf9eb81ddbc2a7ca"
          mutation_id: "kernel_work_item_execution_required:sha256:dd6e48b289a059f56237ecd92f0ab88644934a1ac2361cfe3bdecc6e89a8c6e0:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
        kernel_work_item_execution_required:sha256:e05bfe67737d7dbd5a541682a70013f98eb7132644daa728ee0d9d59ccbaff3a:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45:
          after_revision: 74
          aggregate_digest: "sha256:bad16096622deff956b7a7b011cadd6c8a42c009e7064aacb791d364d0545892"
          before_revision: 73
          command_digest: "sha256:fe38b088d3aed5d6fca81f76149e08e8798f19ae5b7c8b68bc9b2467e9e68359"
          effect_ids: []
          event_digests:
            - "sha256:67c3ef19b0847411e1c89059d4da2b1f4c582391f09e2583cd604e5a20bcd233"
          mutation_id: "kernel_work_item_execution_required:sha256:e05bfe67737d7dbd5a541682a70013f98eb7132644daa728ee0d9d59ccbaff3a:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
        kernel_work_item_inspection_required:sha256:0224d5f84148ce2d8bb8d6a7e47d950c1c3dda69dfc06d2a1508690a09352d30:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:
          after_revision: 133
          aggregate_digest: "sha256:7255c929a9d21ede489d8daa1c424f2e3d777aa04e9936d22cf2a381c4d6b386"
          before_revision: 132
          command_digest: "sha256:9b5012005ee8257fb7538206d075b7344c9a97d5a9e7f9e2031f45c59eaa569b"
          effect_ids: []
          event_digests:
            - "sha256:8b5247c40da459968140089188ab9bb3a89fdee88311970b930dfe895800f5e3"
          mutation_id: "kernel_work_item_inspection_required:sha256:0224d5f84148ce2d8bb8d6a7e47d950c1c3dda69dfc06d2a1508690a09352d30:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        kernel_work_item_inspection_required:sha256:0d63b7fc9a63dfc79e0053197391eb3fd29da49c3cf7b6ea4049f67a5946b92a:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8:
          after_revision: 119
          aggregate_digest: "sha256:1c9040657739f7b9ce384e0e8ec34280491dc97cb91a055dfe02ea73363c6bd3"
          before_revision: 118
          command_digest: "sha256:269224df2fd07f3917ce9a43fdea7d8df21a531333e2f53422fdcb6433043830"
          effect_ids: []
          event_digests:
            - "sha256:d60ee444c5518edf846377c5cf7e1d90136ddc37c2bd348b79655610f8e8d669"
          mutation_id: "kernel_work_item_inspection_required:sha256:0d63b7fc9a63dfc79e0053197391eb3fd29da49c3cf7b6ea4049f67a5946b92a:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
        kernel_work_item_inspection_required:sha256:1c3d7471cb29749ad2756c41e94275acebd0cdc10568e0f1068a547a82e490d9:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75:
          after_revision: 84
          aggregate_digest: "sha256:8389ab5b32cf24c102420d2651d5776f09c836978fec004162c27e3aa4c47d30"
          before_revision: 83
          command_digest: "sha256:26f5130bbfc728566e74b2c0c8cc79651d654044fbee668883bfa1e2d9df9ff5"
          effect_ids: []
          event_digests:
            - "sha256:3a3285b70139e6719c2d05dbb79a7294dbbe203ab58b6cdcc671a583fc41f2a2"
          mutation_id: "kernel_work_item_inspection_required:sha256:1c3d7471cb29749ad2756c41e94275acebd0cdc10568e0f1068a547a82e490d9:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
        kernel_work_item_inspection_required:sha256:44f310b1c4bc3267bba8637168ebc7cd05288d487604e76d813aff46ee88170b:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554:
          after_revision: 105
          aggregate_digest: "sha256:f2f1b4d3d65d4552aaad17f22d66a006b677e161cfc97947135065f86678c45d"
          before_revision: 104
          command_digest: "sha256:6c00afa6d43b6a6ef21cb8c1de4947acf879d023e2a0d0690eab8c16773b70d6"
          effect_ids: []
          event_digests:
            - "sha256:69bd4a8fb9bf926686dde5501ce7f9eae57b2e5c5a1f3161629ab545f3dd2ead"
          mutation_id: "kernel_work_item_inspection_required:sha256:44f310b1c4bc3267bba8637168ebc7cd05288d487604e76d813aff46ee88170b:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
        kernel_work_item_inspection_required:sha256:52b185931f6af14e91588e46d9d7caeb3a012f0084398b5951a3fcba39efef42:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b:
          after_revision: 77
          aggregate_digest: "sha256:6482e3338d3c349bfccfd97ba92948b3ecc2363e2f5b31e510407197fd6b6d4e"
          before_revision: 76
          command_digest: "sha256:e54cfab450c2792bdcb9d32993965b686f4c9f2e841707e542e23e3bdc80a40b"
          effect_ids: []
          event_digests:
            - "sha256:90dc56891719daede8ea30b816d12a4d49f8cdd8e9e504c38185f006a30b3c28"
          mutation_id: "kernel_work_item_inspection_required:sha256:52b185931f6af14e91588e46d9d7caeb3a012f0084398b5951a3fcba39efef42:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
        kernel_work_item_inspection_required:sha256:5fd9cf8be61dc04ab723afd7fa25b15ff74c66d99697380122fb5773ef1fbf37:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4:
          after_revision: 42
          aggregate_digest: "sha256:0109f7c5dcf405860a995974cc5f9d3d4131f24218230b691b1f363906aa2c53"
          before_revision: 41
          command_digest: "sha256:99f5a1a1c11cc4fe1d36d8f7b439637abd193e2cc6b50e4f50e8df01956d24f6"
          effect_ids: []
          event_digests:
            - "sha256:1262bc19002d0dd65e3919f3d5689cd18cfbda89c24b2fe182d471f5b8297d8e"
          mutation_id: "kernel_work_item_inspection_required:sha256:5fd9cf8be61dc04ab723afd7fa25b15ff74c66d99697380122fb5773ef1fbf37:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
        kernel_work_item_inspection_required:sha256:6ad61a4b859153f7adb4f5bc43e20829f1e3bafe7a4e82f603d3b56ff8817b94:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f:
          after_revision: 56
          aggregate_digest: "sha256:caa2aedbd6bc855000e0cce4e1656d6742457a397c4f5f42778ee262ddbadfcf"
          before_revision: 55
          command_digest: "sha256:5bd6197bcddfd41a98a49ba0af0d3c06cf0b5d5d07a602e838faa909499d9641"
          effect_ids: []
          event_digests:
            - "sha256:96d3a1b14d7f384ea65eb34d5c8f605bddf8d772ca44468fe7ab55a1f1ae208d"
          mutation_id: "kernel_work_item_inspection_required:sha256:6ad61a4b859153f7adb4f5bc43e20829f1e3bafe7a4e82f603d3b56ff8817b94:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
        kernel_work_item_inspection_required:sha256:795c038967688633b96ab0cb493b7fec962eaa80e5a1ee5dff006145757357a4:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8:
          after_revision: 28
          aggregate_digest: "sha256:5e78361f1cc78656046e47997d79efe70f07479b638322a5f9b75ccbeab8a3c2"
          before_revision: 27
          command_digest: "sha256:e040cc71b7e0cad1ef021f8f6d928ba703c5cbf9562b87016f390b85a8bd51e6"
          effect_ids: []
          event_digests:
            - "sha256:b64da2f20f6cedb510b0886640e25cc0254dfb0a83f5598b1a5186ecfb04246f"
          mutation_id: "kernel_work_item_inspection_required:sha256:795c038967688633b96ab0cb493b7fec962eaa80e5a1ee5dff006145757357a4:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
        kernel_work_item_inspection_required:sha256:8b06a372c672129726a63f9aee96b76d92da72775ef90613989fdd0e035a78fb:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465:
          after_revision: 63
          aggregate_digest: "sha256:8a8621470e0da2f36d3ea240720315ef28562920f1976dd762946d8c93380f6a"
          before_revision: 62
          command_digest: "sha256:e4c7c000aa1a02af0bf61f35b987b63bd61d9f0509469e43ac6f9c77a1e8bed5"
          effect_ids: []
          event_digests:
            - "sha256:4c7d37dd3d53e2d22177ec8c25d3c4fc20fecc799f69dab191b73446b8853d5c"
          mutation_id: "kernel_work_item_inspection_required:sha256:8b06a372c672129726a63f9aee96b76d92da72775ef90613989fdd0e035a78fb:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
        kernel_work_item_inspection_required:sha256:8e171f1cea2844450cac768d5bbad8d4bfb3ff75b8ae874e8381c99fbd83ef67:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419:
          after_revision: 14
          aggregate_digest: "sha256:2cc139201ca902a6cb98f517b4214e8e6a6874f95970386c4ce3150d18625ad3"
          before_revision: 13
          command_digest: "sha256:67a6d3d7c683cbdfa82728edfa467b8c711cda4b607203a7683dde7072d2a133"
          effect_ids: []
          event_digests:
            - "sha256:ed21a6f2048ec66a698f09df741b0f031a8caf7745c13c643e015f4174c4ebaa"
          mutation_id: "kernel_work_item_inspection_required:sha256:8e171f1cea2844450cac768d5bbad8d4bfb3ff75b8ae874e8381c99fbd83ef67:sha256:2dd4a552964f7ace6586d2e393f3e218a4281670687c61cf26cb58f7e88e1419"
        kernel_work_item_inspection_required:sha256:9a2398b27a972b5ff7c5ef9c52c876e0ee2047774807e65d60111438605f0946:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813:
          after_revision: 98
          aggregate_digest: "sha256:a8ea0af558b5e440350ff34fad400b6728b3ccb601e1b96ba74b13af093031fd"
          before_revision: 97
          command_digest: "sha256:c2259e580b0b5d65d95a6082805d9bb6140333c453f22139e3c14ba5178b1d10"
          effect_ids: []
          event_digests:
            - "sha256:ca3605030cbfaab22f05f7ee3ae698cdadb15787aa506533ad02fd52140fc29e"
          mutation_id: "kernel_work_item_inspection_required:sha256:9a2398b27a972b5ff7c5ef9c52c876e0ee2047774807e65d60111438605f0946:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
        kernel_work_item_inspection_required:sha256:9ce250ff40ad6025ccb5c9af253a9a57fe701056e05f68ca25c0cf438c5096ce:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81:
          after_revision: 21
          aggregate_digest: "sha256:3358c7a8e253defd76cf6644ecd918f837df11201f5bc3b06a7320085c6cfe06"
          before_revision: 20
          command_digest: "sha256:f8e33a1107576097b0e1f016d51ebe7e608786432d4288747127894c453bda30"
          effect_ids: []
          event_digests:
            - "sha256:f1a71dcf02cf49f15905689e01ba10c696e8022b69e227149c66aac135445b7a"
          mutation_id: "kernel_work_item_inspection_required:sha256:9ce250ff40ad6025ccb5c9af253a9a57fe701056e05f68ca25c0cf438c5096ce:sha256:0e4b0a03304485bcc0f4580229380c52547f6a83f00cf69b7f46f16fe8443a81"
        kernel_work_item_inspection_required:sha256:ba9e873480f75c48d445b0ce1e5f630a704c0d94b7a8f1a112a6ebea25cb45d4:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b:
          after_revision: 91
          aggregate_digest: "sha256:ce4928ec0c1ba4c980298191c7cd86f4c7973e55ddbcf10eacf7f081c10f9c75"
          before_revision: 90
          command_digest: "sha256:920b116634a130975e270f8e80dfbbc0326b349322ff0e6539e0e959cdbe04a3"
          effect_ids: []
          event_digests:
            - "sha256:5c5289274b6ea420c6432d3f6467b90ebec9e7570d4efe8a1d9039c73805762e"
          mutation_id: "kernel_work_item_inspection_required:sha256:ba9e873480f75c48d445b0ce1e5f630a704c0d94b7a8f1a112a6ebea25cb45d4:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
        kernel_work_item_inspection_required:sha256:bbaa335e6ca702d45c9c89f11d1b0ad7eaaccb7c0de0db8886ca2a210dd34515:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7:
          after_revision: 112
          aggregate_digest: "sha256:aa224ea3fa6cffca447032a6e31199bd5887bb37ed771dda7b2c64329c0ae746"
          before_revision: 111
          command_digest: "sha256:ec85c54917b73c9a55c257b7191bec7a7322e5373c331ce19ce6f5177e46bde7"
          effect_ids: []
          event_digests:
            - "sha256:e4ec37d61c5568a0c0a76b18f90b162c417ef01a892c6645343644a4e4b95287"
          mutation_id: "kernel_work_item_inspection_required:sha256:bbaa335e6ca702d45c9c89f11d1b0ad7eaaccb7c0de0db8886ca2a210dd34515:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
        kernel_work_item_inspection_required:sha256:dc525479c402679e0d2ffece20d1ac4a1e3ca56bb524e1a6708fbefd9c4d4c87:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060:
          after_revision: 49
          aggregate_digest: "sha256:df6cc1b72b9c10b8aa8cca80e44469ebfd1e64756b933573479ec740079f2c95"
          before_revision: 48
          command_digest: "sha256:fd49567e9811a3e21aaabc094bd6013b241c6d848be289c9a6c09670c5f2481f"
          effect_ids: []
          event_digests:
            - "sha256:47e84828a27bf2af12eb4313d51fdc84c6c1223acf72cf3e8fc65222c52e4f11"
          mutation_id: "kernel_work_item_inspection_required:sha256:dc525479c402679e0d2ffece20d1ac4a1e3ca56bb524e1a6708fbefd9c4d4c87:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
        kernel_work_item_inspection_required:sha256:dde7abdebd373819c542dcdb44f9af539edd8bd882e2acc041ca58deddadb61c:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45:
          after_revision: 70
          aggregate_digest: "sha256:d028e94d4400c3da36770ab5e484599fde0b206c4960abb726cda1e47d1f5f2a"
          before_revision: 69
          command_digest: "sha256:22e3b1911f6e2f469164f02ca032c4d5de98d91f3eb52268b4372c6fbb96f1f8"
          effect_ids: []
          event_digests:
            - "sha256:7a432743d944b7aee88fc441eb50edf232e2b1900a4823b82d9b92466f07d9a1"
          mutation_id: "kernel_work_item_inspection_required:sha256:dde7abdebd373819c542dcdb44f9af539edd8bd882e2acc041ca58deddadb61c:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
        kernel_work_item_inspection_required:sha256:f1c00fadf3e429b509cdb095bf3a6ded03a725a58313b0809b03919b8e15d9ba:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143:
          after_revision: 126
          aggregate_digest: "sha256:96abb424ef65cf30db5807cded00117e70575ac52c7b49ea766af15ffd2e6488"
          before_revision: 125
          command_digest: "sha256:3b4af26d719bf7431565ddf0cd3e0bc6fe617dd2822d30bbc83c7ba330cbb24e"
          effect_ids: []
          event_digests:
            - "sha256:872fb79ef87b090fb74a01d31ee75520967107bbc2d9bd4c1724ffb501d740ec"
          mutation_id: "kernel_work_item_inspection_required:sha256:f1c00fadf3e429b509cdb095bf3a6ded03a725a58313b0809b03919b8e15d9ba:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
        kernel_work_item_inspection_required:sha256:f931fb2cfef6607498ba57626eda38289ce378f90e8f9c3faa2ed59b545adb7b:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d:
          after_revision: 35
          aggregate_digest: "sha256:031f69009a8ac06777e6f5c6c36fcfbf0df9497b8f60f61728de32ec9f6ef264"
          before_revision: 34
          command_digest: "sha256:8cc43d47056db5bfdb055c9b22ba18b670b18b8f4bc9a70ddc2a543e79d9f61a"
          effect_ids: []
          event_digests:
            - "sha256:ab1b344aca049ed500383cc3a7ee12e0d7cbe63bed2b82ddf8ca46849a1368bc"
          mutation_id: "kernel_work_item_inspection_required:sha256:f931fb2cfef6607498ba57626eda38289ce378f90e8f9c3faa2ed59b545adb7b:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
        kernel_work_item_materialization_required:sha256:5f544ab1173ce36c78d2c26bfe10f136d61ab620de62731f5dcd16cc7486a4db:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4:
          after_revision: 4
          aggregate_digest: "sha256:a65bf8d6416f9d6404095f610f4ac7a2545ffac313f76542e6295a9358d98529"
          before_revision: 3
          command_digest: "sha256:cbecbdb81ed5ca2f3e45f7a44084c6fff4eb2e6b0f0a842eef59ba4bad32f577"
          effect_ids: []
          event_digests:
            - "sha256:74538b28546cb50bf9ef321485847a3100e0c0e6997c3b37e232a7067bb6ebe3"
          mutation_id: "kernel_work_item_materialization_required:sha256:5f544ab1173ce36c78d2c26bfe10f136d61ab620de62731f5dcd16cc7486a4db:sha256:2a55977b3373c04de1c651e8db7e5a7f015411ccca0c972aa246e973d5b3c7b4"
        kernel_work_item_rework_claim_required:sha256:1879223a360168217a781dfdd9efb0535767790c8b910ffd397eac4156018388:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8:
          after_revision: 31
          aggregate_digest: "sha256:7bd9dc0e63a2f8949648557fa3bdba65e336ae686c516ef787d83612ac0c6f83"
          before_revision: 30
          command_digest: "sha256:308b06d732f5c4c9eb1245cb0ebe2693f9f878ee7c1752ce9c3f454adb97ff8d"
          effect_ids: []
          event_digests:
            - "sha256:acef244809a8954c81f1c9f689998792eea38f73e8af0ff7f05d5100c72f2fad"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:1879223a360168217a781dfdd9efb0535767790c8b910ffd397eac4156018388:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
        kernel_work_item_rework_claim_required:sha256:60b3a38525d8d29d6980f77096c07aa7424a78b1c2dd7d4560226705f95511db:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060:
          after_revision: 52
          aggregate_digest: "sha256:fb46107eb0f2783eb55fa069188c0249d33fb6a105e8acec23c7053993e47121"
          before_revision: 51
          command_digest: "sha256:be8fe57795eb53954beb68eb6faf7a528a980ef2e0250b99d6996807160542b8"
          effect_ids: []
          event_digests:
            - "sha256:0bc60918236512c5d41cd7d962be0fa8236e1ad9391d1b0ff5039bd1674719de"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:60b3a38525d8d29d6980f77096c07aa7424a78b1c2dd7d4560226705f95511db:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
        kernel_work_item_rework_claim_required:sha256:7203fa0ecb50ab00e2c56cbba243ef95e0f7a2297dc34c18a255bdd9f5c73498:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7:
          after_revision: 115
          aggregate_digest: "sha256:ee8a1418864af95e36e4f15cdfac4774095949a44b5c1ccb4835fa1078c48616"
          before_revision: 114
          command_digest: "sha256:3ce3722eb988d6e5f2fddd00c4d0a3f9a1a134ba8a200808429701b4557823da"
          effect_ids: []
          event_digests:
            - "sha256:576608c4042406bea8bd9517927a6217edfa35c4b535cd27207392c66d2d57cf"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:7203fa0ecb50ab00e2c56cbba243ef95e0f7a2297dc34c18a255bdd9f5c73498:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
        result:sha256:189b3fb943ed048d2fca0bf3605c715032f65bc8d4c9c9b7c3aa087ff6f6c42e:
          after_revision: 2
          aggregate_digest: "sha256:796d47cb6ec4b4075110c206631836cf767b3cd30e82516e35ff6bb907ce66fc"
          before_revision: 1
          command_digest: "sha256:72f06bb11306350a93146881ca6bb70ac58d55b9c426eb50cab8536dac414a94"
          effect_ids: []
          event_digests:
            - "sha256:8c14efe971ef31a92b19ac732c014068671b88c8e93ca8d14b68d6358542254b"
          mutation_id: "result:sha256:189b3fb943ed048d2fca0bf3605c715032f65bc8d4c9c9b7c3aa087ff6f6c42e"
        result:sha256:336895a63ccf4852e5ee674d7bac8be33144121caec3fbd8878ef14c7fe253d6:
          after_revision: 62
          aggregate_digest: "sha256:329b6a663c5391aa6863a96b6cfe6181c660240bcec552bab01aef5076473381"
          before_revision: 61
          command_digest: "sha256:8934c94da0ae052f5e45c033f815d4b4ec5db2d2026009ad04f71c2a0565efdc"
          effect_ids: []
          event_digests:
            - "sha256:fb024f072447491ead603433ca76add7a2d35f8b863a0a0fbcbaf81391010e87"
          mutation_id: "result:sha256:336895a63ccf4852e5ee674d7bac8be33144121caec3fbd8878ef14c7fe253d6"
        result:sha256:42107c42742cb7a569013de8c12d23200788ae3c0645c686556b791667e24a16:
          after_revision: 118
          aggregate_digest: "sha256:17993fc66cc510510bc643ccf60b451884aa6bcb21b934a8790738294eb6ba19"
          before_revision: 117
          command_digest: "sha256:e543ef3a79908c4bbe3b332b339e64f5e0e66c896afa6d0e9dbc1e9603c2f920"
          effect_ids: []
          event_digests:
            - "sha256:022008c18d9d7abbbb9ed871cc13d0db4138863510f96d04e96585ecb94b1ca1"
          mutation_id: "result:sha256:42107c42742cb7a569013de8c12d23200788ae3c0645c686556b791667e24a16"
        result:sha256:47f442c10e90fea7fcedbc9e5e7f892ec8261ca0a31b5a7cbea7cf97b67a8655:
          after_revision: 27
          aggregate_digest: "sha256:8cca390d253416236799fdefe156b616bca0376e772d11701d64ced36776bfc6"
          before_revision: 26
          command_digest: "sha256:aa399df1000a42c95275124de164ad863fdd1ba218734c62d724b9811951b00c"
          effect_ids: []
          event_digests:
            - "sha256:9fe85e856e7a87f295ea3e1cede831d1ebbba3ff59b61f90ce98d20fafcc6cb8"
          mutation_id: "result:sha256:47f442c10e90fea7fcedbc9e5e7f892ec8261ca0a31b5a7cbea7cf97b67a8655"
        result:sha256:5c341ab3c5e199c5e034e1f1ec296222d495c17292ae4c6f14e4f59f8e549ecb:
          after_revision: 111
          aggregate_digest: "sha256:5284e75c068f6f464a3681437ada5c0b4b37a842817e5080b3026e20548ae45a"
          before_revision: 110
          command_digest: "sha256:a0998c27c39f0677833df02c4250deeef7863bb8c0932ebea98b10be99ed7a6c"
          effect_ids: []
          event_digests:
            - "sha256:09f5e6d2e9a977b1f58e411bfef6f9dad252d90eca0e6100f95f251b0418bd9c"
          mutation_id: "result:sha256:5c341ab3c5e199c5e034e1f1ec296222d495c17292ae4c6f14e4f59f8e549ecb"
        result:sha256:5e03ec2a77d4b202c0ce7aefba3ff298f6057ef1ef9ec44e6948d4b686e88a30:
          after_revision: 125
          aggregate_digest: "sha256:2636039e61b28fe073f834a351a1fc0b677309adb3fbf54b9ce5fa562116cfbe"
          before_revision: 124
          command_digest: "sha256:752fd02c8014ed57dd3f4c860db266ff7d85e2c5b20da1ef82006c5bc83347df"
          effect_ids: []
          event_digests:
            - "sha256:d3cf2e9666abde87173bc81faaf1b65ad546de5bbd273034336d339dcc939ee9"
          mutation_id: "result:sha256:5e03ec2a77d4b202c0ce7aefba3ff298f6057ef1ef9ec44e6948d4b686e88a30"
        result:sha256:83d37cd21d96abc5446f4a9bb1017296689acf5115895dd2310a6466ff4f4dc8:
          after_revision: 20
          aggregate_digest: "sha256:5650db6588b7259127042b551cf5818e12fa03de7882c513731c6954474608f9"
          before_revision: 19
          command_digest: "sha256:146920b394eee858228028e7c2f950aa213c81c3c439892b371f64b8ce33c0af"
          effect_ids: []
          event_digests:
            - "sha256:6c54c0a8eb3a53f6949cd5c0a34d057e16c1bf4bb0efb221c105dbc04d447306"
          mutation_id: "result:sha256:83d37cd21d96abc5446f4a9bb1017296689acf5115895dd2310a6466ff4f4dc8"
        result:sha256:885eb514a4678149115827539b3bac77015ad0d8b320d191e66383be350ba3f2:
          after_revision: 83
          aggregate_digest: "sha256:ff7815c69b74f51a2b8d29f1c1bb0ff3c94a91b2fa6df8547a20b31584188956"
          before_revision: 82
          command_digest: "sha256:bd99d0b8d6623b3be0ed703c165bed724cd25c5728fb166ab8dc5b1be4eaffa4"
          effect_ids: []
          event_digests:
            - "sha256:1ca7c096eed749fa1395fab00927efe7936ca435a1ed5920c05524f3f2f0bfae"
          mutation_id: "result:sha256:885eb514a4678149115827539b3bac77015ad0d8b320d191e66383be350ba3f2"
        result:sha256:953ba273cc1af4945d8b5a2f645d948527e622b3c1b9cdd2d9c53bc6562f3798:
          after_revision: 69
          aggregate_digest: "sha256:771d9e76f8e32a5cfd550f893362998d84d50ecc1abb75046d1a38179c527ba6"
          before_revision: 68
          command_digest: "sha256:3f6c01c20eacaebe103d03a69ba409d06d48198c34e7ad85a46ba08007564e15"
          effect_ids: []
          event_digests:
            - "sha256:eae857c34713e3b3aa33ccdb4b679a4c435037a330601bad116e54777834a04f"
          mutation_id: "result:sha256:953ba273cc1af4945d8b5a2f645d948527e622b3c1b9cdd2d9c53bc6562f3798"
        result:sha256:955cb0da74eb3033c541614686b4ca8eff3d68eb94675305671ff3ffeb0940e9:
          after_revision: 34
          aggregate_digest: "sha256:5ddc54cb638ab7cb977d85e4a7e9c0a300604fa6052496e13cf681546e6a2f02"
          before_revision: 33
          command_digest: "sha256:efca8121714174fb4a9f2f00ea2e2f916f2ecae212fd36e39dcbbfbc3b24d7f8"
          effect_ids: []
          event_digests:
            - "sha256:b042d06732400fd54b4b8acecaec9422200c747aff77f66e451099442782cfb4"
          mutation_id: "result:sha256:955cb0da74eb3033c541614686b4ca8eff3d68eb94675305671ff3ffeb0940e9"
        result:sha256:97ddc4f393375bd37cff1e86a29d890eb80900c99b01954cdbf74573c6183836:
          after_revision: 48
          aggregate_digest: "sha256:7de4b7a91da8186e6dbea72a60b357747295198698dc76b419faa6078321fe7b"
          before_revision: 47
          command_digest: "sha256:9023dfbeeadad4a8f72a7b94f87709a1bf4b759cfd74456d87f71921948e9783"
          effect_ids: []
          event_digests:
            - "sha256:4ebc13a3ac88160938cd5f41131647efc99aba4cf804194caf2876b1af69f1d8"
          mutation_id: "result:sha256:97ddc4f393375bd37cff1e86a29d890eb80900c99b01954cdbf74573c6183836"
        result:sha256:a02412d182332b66acaa372abccd74cb264b3fc50e77ff281442ad5a5926d155:
          after_revision: 90
          aggregate_digest: "sha256:90caf50dded1af04fad52ef28345efd54faa7ff7ed67c5fd80f5167f39bb734a"
          before_revision: 89
          command_digest: "sha256:1f1838de72a62b10716087cdf5ce15728f3089acbacd32713c33af15fe3417ca"
          effect_ids: []
          event_digests:
            - "sha256:cd44357e1531b3bdc61d63bbb5ec4cc12c1b3fe96b38b5af90f42f45d16cf1d1"
          mutation_id: "result:sha256:a02412d182332b66acaa372abccd74cb264b3fc50e77ff281442ad5a5926d155"
        result:sha256:b07f55d125c62af367ff4ba5994bfb474719b6c3a47d336be57b58edf9ee1fd0:
          after_revision: 132
          aggregate_digest: "sha256:61a7de0a8b041d2d6296d8508d2b69bb9c4c0649f004cac345ab0c4531e8b21d"
          before_revision: 131
          command_digest: "sha256:b6478c4924213318bd90f61ee48c3c6e592f3f625843ea629d9b912ae74ac8a7"
          effect_ids: []
          event_digests:
            - "sha256:ca8c5c8d2694b9d84470c022c987feb2601d7eb5fc870f7b85b9a30edcb34e8d"
          mutation_id: "result:sha256:b07f55d125c62af367ff4ba5994bfb474719b6c3a47d336be57b58edf9ee1fd0"
        result:sha256:b9c9f7771e7d3e13e1f6f4fc7cf5c74d7c0157d8b3a63995cb3b9e0cd76c0017:
          after_revision: 13
          aggregate_digest: "sha256:b12d834c9ff2a6e8ec8292fedad9601547932cf9fa2f29c1f2f9ea4cac1c799e"
          before_revision: 12
          command_digest: "sha256:a3bc03f1d360e6bb3c9f2eb67d00392f53209eb1c4dc32a627235f5726313bf8"
          effect_ids: []
          event_digests:
            - "sha256:b8f16771da04abffbb64bbe25627598b19f9feca403bb05f95485bd6fef7c027"
          mutation_id: "result:sha256:b9c9f7771e7d3e13e1f6f4fc7cf5c74d7c0157d8b3a63995cb3b9e0cd76c0017"
        result:sha256:bf82ff5182d8bdfa3d609f2bc955a524c7c68d27a2c82f20d74f9388f8660122:
          after_revision: 104
          aggregate_digest: "sha256:ad397b4b6089317c8d87a74955c257625ab13b23eeef3130970b6c2a884e0692"
          before_revision: 103
          command_digest: "sha256:45ef626be300b7edcb433fef98eef4ce14b78e8870d1614921d582dc878ed58a"
          effect_ids: []
          event_digests:
            - "sha256:110094eca738a27c19186de64cfd901da847f8c7ae2c8241dd158caa3ed170a5"
          mutation_id: "result:sha256:bf82ff5182d8bdfa3d609f2bc955a524c7c68d27a2c82f20d74f9388f8660122"
        result:sha256:e324cd26dcf97c2048f20cdf45460e93f75ff7981fe38bec81839a93103556a7:
          after_revision: 41
          aggregate_digest: "sha256:5a1430c90f18ed231bbcd3c43ca4d1cac57bd2a39e0b4965bf950d71713c8bdd"
          before_revision: 40
          command_digest: "sha256:c4d53ad912168fcc107260772a62963c5881fa856135ca1b031da51a8d8d8bed"
          effect_ids: []
          event_digests:
            - "sha256:a79c71288e46162c508db30fffa162fe725c1b46751b8cbffe753e7917eaa041"
          mutation_id: "result:sha256:e324cd26dcf97c2048f20cdf45460e93f75ff7981fe38bec81839a93103556a7"
        result:sha256:e5a40637f20738f4aadd0aa8f10695e093687c5e042f3852dfb15992162f6538:
          after_revision: 76
          aggregate_digest: "sha256:5758515246cbe681b82b0a10e2654b88e1462cc5f186678ccbb79f03d67c429e"
          before_revision: 75
          command_digest: "sha256:f43d51229ea36dff9e93ce6c2fb66e1cad580388c085d2b76a3d97bc6feebc94"
          effect_ids: []
          event_digests:
            - "sha256:80c4b15b4e9f5b7ab8c1ec9123291a6f6409ef861aaf38bdf874d8c97733fa4e"
          mutation_id: "result:sha256:e5a40637f20738f4aadd0aa8f10695e093687c5e042f3852dfb15992162f6538"
        result:sha256:f3904f5bc3a2b2b8e8f226d223286877b332b53f7d9af34a47394fd6b05ba01c:
          after_revision: 55
          aggregate_digest: "sha256:4eae62599acb6ac6f304cca508c4049c8e2614491d94cc2a921e63fc005678b6"
          before_revision: 54
          command_digest: "sha256:2513011aa4e9e515510aa119cb8415c8a0fb7f10de31f7e72e83d7522da44ad5"
          effect_ids: []
          event_digests:
            - "sha256:987302d0a067ba1623aeb710bfdef8dcd9eedee3530bcdec60bb0ff5ba1cdfb6"
          mutation_id: "result:sha256:f3904f5bc3a2b2b8e8f226d223286877b332b53f7d9af34a47394fd6b05ba01c"
        result:sha256:f8f351cd4ce6b9fb749481881bff25d2d8dab57faaa4516f1da7ca39e41ba4f1:
          after_revision: 97
          aggregate_digest: "sha256:e7637d379e9f027f7190f13e5178710924bb16122f33830fe14db1bca76ef3ec"
          before_revision: 96
          command_digest: "sha256:d9cf157c5fb901b29b8d3fdd4adb7a8c3b8d6d373da50cff247311f842f5acec"
          effect_ids: []
          event_digests:
            - "sha256:06c1fab6600ec7e915b101da01a1eac984b649605409ba02aab52d4d691f211e"
          mutation_id: "result:sha256:f8f351cd4ce6b9fb749481881bff25d2d8dab57faaa4516f1da7ca39e41ba4f1"
        semantic-stop:sha256:044f0fe497a864949217b5729c90a48f16c39354a1fabf81463a5fa9c99c1782:
          after_revision: 144
          aggregate_digest: "sha256:e39700e4f9bbc3c2acb74b7843c155b690617f6f210024674963e7ddf29b0ae9"
          before_revision: 143
          command_digest: "sha256:5aafe155a5935a6b0b8b485e8ef29cc1e4c239748540ddb33bba6d63791db3ba"
          effect_ids: []
          event_digests:
            - "sha256:2dfbfa9649e345543dc6f90f472edbe4853de8a8be24ce554fcf7b247495651f"
          mutation_id: "semantic-stop:sha256:044f0fe497a864949217b5729c90a48f16c39354a1fabf81463a5fa9c99c1782"
        semantic-stop:sha256:2354a97e6bee8d057a73172715428f7956156a3b6e5fbf813921f0eaf0d370c6:
          after_revision: 7
          aggregate_digest: "sha256:2328b425dcc1da30ab71fea074733ca6324edd9df708b8b132b7883211f9d7ff"
          before_revision: 6
          command_digest: "sha256:5bf94cec6944348f8a639dffa9b1b15ac9384ea8260e3aba11e9e543f174e515"
          effect_ids: []
          event_digests:
            - "sha256:237c1aa81fb28fb94ff1a28a5536d0288133efbba78a90599d953cac7a379a47"
          mutation_id: "semantic-stop:sha256:2354a97e6bee8d057a73172715428f7956156a3b6e5fbf813921f0eaf0d370c6"
        semantic-stop:sha256:c5b8930e1b55380770898ecc3006398e6386dc6e7d9e56a690fe95d2db1918af:
          after_revision: 138
          aggregate_digest: "sha256:f9472f94d447a51e16d7d85ac47d112d976494a3ce251bb556caa6d27fdd00fe"
          before_revision: 137
          command_digest: "sha256:bc3d88f8f04c3b32c89a9956429980c207831281060eccb24cf9ab648d1d37a3"
          effect_ids: []
          event_digests:
            - "sha256:6da652b6d92d55e5474954355e57e9bf89175e60d183854f8ca946641a08e0a1"
          mutation_id: "semantic-stop:sha256:c5b8930e1b55380770898ecc3006398e6386dc6e7d9e56a690fe95d2db1918af"
        semantic-stop:sha256:f3fb7cf1e1c93813b5ab8b021adb80bef230650e1e4ee73d5636be01ca89c38d:
          after_revision: 149
          aggregate_digest: "sha256:f33b86c7c8862a636d11ede7065fd9bd049a5a9e813c916cc0a6fc2129fc1221"
          before_revision: 148
          command_digest: "sha256:d5f624fee70b748f3e82b34c4eb69e36f2267a39abbd2bb8d781c81b93b4b6f8"
          effect_ids: []
          event_digests:
            - "sha256:a3c57dfa2b240a0b6b92031fe713e91fbf5ed28dfa75e30fbbc96c97d3b97840"
          mutation_id: "semantic-stop:sha256:f3fb7cf1e1c93813b5ab8b021adb80bef230650e1e4ee73d5636be01ca89c38d"
        sha256:0366e12c3cb24b4824c08fe25c217937d4d18016da734cea9a60ec532983d162:
          after_revision: 117
          aggregate_digest: "sha256:e2336bf296d02340f9008a4773853317e09dbb139b85f475bc07a8a612af2cf5"
          before_revision: 116
          command_digest: "sha256:4d48fb102afdd50ac451f6878fbba4cf4653dbae195925fdedac95f444b49762"
          effect_ids: []
          event_digests:
            - "sha256:e4d14a27da565f36579f8e32c60eca26522d28fd8e0e33b4db480f63e733b3af"
          mutation_id: "sha256:0366e12c3cb24b4824c08fe25c217937d4d18016da734cea9a60ec532983d162"
        sha256:10f3a7f9dfaac7614cf541ea5aa2903c0253f872c255fb9ea9027a42ff007431:
          after_revision: 33
          aggregate_digest: "sha256:5ac971ef4f800dad36186ce0c4092801407e43469be761790dcfe73b04e44f56"
          before_revision: 32
          command_digest: "sha256:dd79ed268370e1586ccf2374ab35fbdb5f5c464590ace01bf366f5aeb633c1fd"
          effect_ids: []
          event_digests:
            - "sha256:04fbc80937a298ae5d5bd24858797422496f771914645d2720d832b68277c7b6"
          mutation_id: "sha256:10f3a7f9dfaac7614cf541ea5aa2903c0253f872c255fb9ea9027a42ff007431"
        sha256:2f07a8fa400813830bdb752518da5b591beda19064aa8a7cff6ade872315b63a:
          after_revision: 151
          aggregate_digest: "sha256:c6e770a00b61307b8800eb5eea06bd2b25d42bfdabede4abb7161b5aed15514f"
          before_revision: 150
          command_digest: "sha256:72e79fae1ca781e6cc9147af981753ed2bf3d51e85f14934291242f66e878b36"
          effect_ids: []
          event_digests:
            - "sha256:bfff55510ca90ee9128f56f8cabc05073fd0480f6756d6963055c627f62be7b8"
          mutation_id: "sha256:2f07a8fa400813830bdb752518da5b591beda19064aa8a7cff6ade872315b63a"
        sha256:42057e84d78ab3f1499f8ef1aef995aecda6b2cf3ff6dec74fa4a25c0a354057:
          after_revision: 19
          aggregate_digest: "sha256:5954f0d856e4c4c5f916810f88274705b5003beecadd22e7461c35707c1bf7a1"
          before_revision: 18
          command_digest: "sha256:0d44c1c2e5bcc94ae04598a6ff58000cc0cf9652ccfc4887331efa92e638cdcf"
          effect_ids: []
          event_digests:
            - "sha256:3bc52d1394d9a4a85213b55b105ddf60c4657c321b6d00643810fe0d435534ef"
          mutation_id: "sha256:42057e84d78ab3f1499f8ef1aef995aecda6b2cf3ff6dec74fa4a25c0a354057"
        sha256:4e10e2089537e2e8014362de6214ec568727130f2efd9c105c67fd91158250ad:
          after_revision: 140
          aggregate_digest: "sha256:57a1a06a9ea33b65e780ec34446e2096536eafc769bfb81051861c06ae46ed28"
          before_revision: 139
          command_digest: "sha256:028c52675784b2aec4faf4a9551cee12034f2a7528c226ed21de82cd46e6042e"
          effect_ids: []
          event_digests:
            - "sha256:2c4a8cc456589776cabae4c6d4059d281d0a0b071fef36ba63eb098e5685c2ee"
          mutation_id: "sha256:4e10e2089537e2e8014362de6214ec568727130f2efd9c105c67fd91158250ad"
        sha256:51c3de9f4195ab55f87912a240e36b478ab3905f8f20aa79cc971e59819328a8:
          after_revision: 110
          aggregate_digest: "sha256:9ca76587718f4875b3593dfb7cd38a85e5568eef0beeae30709b9a1e5590c5fb"
          before_revision: 109
          command_digest: "sha256:87b5bc0d42a8dd8b400749b97daa71e98882679e5b00ee85d80eef59c2ca620a"
          effect_ids: []
          event_digests:
            - "sha256:805ce067392da05c457ff128408d2feaba176cf47a7f1749a90d1077eebf079a"
          mutation_id: "sha256:51c3de9f4195ab55f87912a240e36b478ab3905f8f20aa79cc971e59819328a8"
        sha256:621e8605c23a24f69dfce034645f33e747c9988f4c30a7e8918d16b60e104a14:
          after_revision: 146
          aggregate_digest: "sha256:7cb24581fe046eaf13108db1aa15550da8dd112f7727b8246cdc420d559db962"
          before_revision: 145
          command_digest: "sha256:f79fa1d1b6325a696f98f64db1a312eb18d5407f4a22bec65e8d9a7a78099ab5"
          effect_ids: []
          event_digests:
            - "sha256:24fe540de41b30d5d78cde07dadac64a1d1055b168b54e58ce27e3e8468c7dbd"
          mutation_id: "sha256:621e8605c23a24f69dfce034645f33e747c9988f4c30a7e8918d16b60e104a14"
        sha256:775517251e3348a835f420b9c6b53111096fcd9244df3a89e198aa389485eedd:
          after_revision: 9
          aggregate_digest: "sha256:c3475ded3aaf72793d4d9eea0939317ea706f66fddb9b09b9ff3d71515f41ed8"
          before_revision: 8
          command_digest: "sha256:d3448843f98526e83995c047e08dbd145eec97178755ba6acef8f308f05958e0"
          effect_ids: []
          event_digests:
            - "sha256:6b8655ad70c08da5aaad2ddf2ab2b1b9cf491586833229b692c6a1709bb6cd95"
          mutation_id: "sha256:775517251e3348a835f420b9c6b53111096fcd9244df3a89e198aa389485eedd"
        sha256:7828b5378cba2373ead1133ed0913a9023cfb3657dea8c3a9392e2adcc37914b:
          after_revision: 68
          aggregate_digest: "sha256:12f287b78d5ef1a4a6c417c6e9d87e80854c289a90557831b9804ab02e78680c"
          before_revision: 67
          command_digest: "sha256:12d225c70940bf214db873e5386fd7278846a9c9bdc69caa2098f8638840c976"
          effect_ids: []
          event_digests:
            - "sha256:d97876af1c16170df2d0802f8397d1b234bbff3effcb8d6f4ca1d665547d07d0"
          mutation_id: "sha256:7828b5378cba2373ead1133ed0913a9023cfb3657dea8c3a9392e2adcc37914b"
        sha256:7c7219c46965e3b8c36705ed881db4d36355292b6ab2321e5c2d81557def4216:
          after_revision: 54
          aggregate_digest: "sha256:cc4a16495604263249418098f2a8c64d4c2071b0d9c1c3022ef56fe314f870d0"
          before_revision: 53
          command_digest: "sha256:94d67a81d3c3edc5394fb7eaece3413049447e0a72a385e25098642fc1b3df25"
          effect_ids: []
          event_digests:
            - "sha256:48601aed4a54356eddd2cd9dd7aae74a134235f149193cbf1fd195d2b973965b"
          mutation_id: "sha256:7c7219c46965e3b8c36705ed881db4d36355292b6ab2321e5c2d81557def4216"
        sha256:8e80f824554d46bddbe0778e3c0673af5307ae940b06e240e61bbbc5e7d24447:
          after_revision: 47
          aggregate_digest: "sha256:6fd1c0ffc583cc6fed922472ca3e460443bd1040a23312ea97e113d693638440"
          before_revision: 46
          command_digest: "sha256:a17afb11aa62a4a176a06e59ffe9a6f8995b4c05828b90e6f0afba69c81cd24a"
          effect_ids: []
          event_digests:
            - "sha256:7dc381941ba76921a1be8120d7fb63961e6e568808c638399a91aad37e9b328b"
          mutation_id: "sha256:8e80f824554d46bddbe0778e3c0673af5307ae940b06e240e61bbbc5e7d24447"
        sha256:94ba3350967b376f65a96f2005c660e81021f5c25a52e7b16b4664034e31e27b:
          after_revision: 75
          aggregate_digest: "sha256:3f05fccd47a51ba9bffb95e12cff45ca454f443be91349c8dfe1bef8d29d1ca9"
          before_revision: 74
          command_digest: "sha256:e3d95480d70d4e8319f4021e318a87b868a3954e14b297265b0c14fd049d2ede"
          effect_ids: []
          event_digests:
            - "sha256:4e6dff547e288537265062521d67ccff3f9801ad2e5964d9f779a925f66d1d5d"
          mutation_id: "sha256:94ba3350967b376f65a96f2005c660e81021f5c25a52e7b16b4664034e31e27b"
        sha256:9860ef2f2718fc01b32163885e11657a07a2485e69880a30e17c1eddf4981270:
          after_revision: 89
          aggregate_digest: "sha256:141bb627625db272c59e45c3c8cd8aba879282a951154474c9851d8d7024e3cf"
          before_revision: 88
          command_digest: "sha256:b32a5a53e52465ac31c46c1ae4d9a5c75a04b5a753394540f9c022274908237c"
          effect_ids: []
          event_digests:
            - "sha256:27ec87cb2d00f43add4ed5b20c83edff75eae276ecbac89db5052e842b3761c4"
          mutation_id: "sha256:9860ef2f2718fc01b32163885e11657a07a2485e69880a30e17c1eddf4981270"
        sha256:a0185ba1521ac60561aa05771bbdf1c96674f90dc41d037ddafea020d9e99c10:
          after_revision: 40
          aggregate_digest: "sha256:b6721677fd14d520a8d74abc50f68e8a1b9fb06bf4b98f166eb7b8895324e933"
          before_revision: 39
          command_digest: "sha256:afc0f4a5ffcdf2a227fe4ad2db53d80976aa9053f8c72e0a156f7df7784139c4"
          effect_ids: []
          event_digests:
            - "sha256:c264999b9554ae4ddc2c97183eaa3f71b31ff32f4391de3615d969a3dfb0889b"
          mutation_id: "sha256:a0185ba1521ac60561aa05771bbdf1c96674f90dc41d037ddafea020d9e99c10"
        sha256:a08934d1a69840c684f0499e872607011645eb78f35fff7aef645abc5254afa1:
          after_revision: 96
          aggregate_digest: "sha256:5b4ac7ea95dc1c20193a854279d3f93d8f0734cf45c395739edad8098a8b6e44"
          before_revision: 95
          command_digest: "sha256:c9ead02526d9a30c06f3960662bb3130dec46e9f150cd590889a35ed2a9ed50d"
          effect_ids: []
          event_digests:
            - "sha256:f67bf22a9f8df26ce8955df0a8051417e3de41a3df3a0dc66bfaf842e8ce99be"
          mutation_id: "sha256:a08934d1a69840c684f0499e872607011645eb78f35fff7aef645abc5254afa1"
        sha256:ac84bc54e106fae5b2042c4a9fd4a068b4fb76d9d00f759d10cabb48aaf6392a:
          after_revision: 26
          aggregate_digest: "sha256:a023159e07316b0f47366c51d1ddbe0b499f93d7a81441aa60a2bbcf1ea1534c"
          before_revision: 25
          command_digest: "sha256:006b0d8906759ee313b0c2e1ff33f89b1a5fbbca95b81611b00a2a4894a8b893"
          effect_ids: []
          event_digests:
            - "sha256:3a7774e692974af02d3a252185ef5b7fd2bf1d33c0f5098535cdb031a7d364ff"
          mutation_id: "sha256:ac84bc54e106fae5b2042c4a9fd4a068b4fb76d9d00f759d10cabb48aaf6392a"
        sha256:b62f438a81d5a95c87bfb1c03b610dfedde82cccc708e8034a8fc2979399b6f8:
          after_revision: 143
          aggregate_digest: "sha256:0cec05f8d1dc0bc080a137313f11bfb13251ddc99a0ba92562dcaea5bc0321a8"
          before_revision: 142
          command_digest: "sha256:f0ec23512109d6645a9b34180ae847dd052b2400d8dd3c01c064c48ff2b712bc"
          effect_ids: []
          event_digests:
            - "sha256:086aa46799efe623638aeb63583936bfaa82f14a6417a87c5aeff3c230099058"
          mutation_id: "sha256:b62f438a81d5a95c87bfb1c03b610dfedde82cccc708e8034a8fc2979399b6f8"
        sha256:b8462d57028aa98cefc7556b777b259961b6049be39352cfcc1afce92e4d411d:
          after_revision: 3
          aggregate_digest: "sha256:c1766380b68b060ce3205a524a1cf63b7747824b871bd410b67af53a248c91ad"
          before_revision: 2
          command_digest: "sha256:87555486260108efe5149a644af26c0d5ddecee60f6673717dbcc1d66fac0bd1"
          effect_ids: []
          event_digests:
            - "sha256:5601cc9977880709b19bc7f87681ce9bc8f68934c7612ff2e99c5c06035f806c"
          mutation_id: "sha256:b8462d57028aa98cefc7556b777b259961b6049be39352cfcc1afce92e4d411d"
        sha256:bf7f1dc544b24428dc8c774fab3b82238fed34d635f270d691d18b9e16a6d1f2:
          after_revision: 82
          aggregate_digest: "sha256:d0fca1816e11f2289f31e99e761650c90d7ae29977725258e834e67254504ec4"
          before_revision: 81
          command_digest: "sha256:05b8fd9b7232c3ceb521cf095dc8fd153ec2cf628e5a09c2c1ab4f96abb9f79e"
          effect_ids: []
          event_digests:
            - "sha256:4b1ca7afe0e70b13ca379578f06ed0bcc8f1d8e6122103aea0b672b40c9a8457"
          mutation_id: "sha256:bf7f1dc544b24428dc8c774fab3b82238fed34d635f270d691d18b9e16a6d1f2"
        sha256:c5e1a4cb772ac4f4ca5c993a7d273c0a164c25a6ee03ea3e98f6c5ff25f3126c:
          after_revision: 61
          aggregate_digest: "sha256:dd71b7d04c0a70b98efd056fb0145acbf37a24d0d17ecd5ae3fc05a29266699d"
          before_revision: 60
          command_digest: "sha256:6e8605722945db7296c7801d37973d3f78daae079d89ad84a954770a34a6e526"
          effect_ids: []
          event_digests:
            - "sha256:c31124e510592fbef879d614abe7f5cb3bd75b92b4c3abcffb5cb59c0d633b79"
          mutation_id: "sha256:c5e1a4cb772ac4f4ca5c993a7d273c0a164c25a6ee03ea3e98f6c5ff25f3126c"
        sha256:ce78dfcf888f3c90410809413411e05349e6115867b861af43f14022de30a072:
          after_revision: 12
          aggregate_digest: "sha256:37cc75868c14fa8ecbb8019db8f31e63993a0269e46f725103907aeb5410abbe"
          before_revision: 11
          command_digest: "sha256:bd1a139d8697b3da900d8a0388b088da2b4283d671480dc2f0f6f704cc0ec848"
          effect_ids: []
          event_digests:
            - "sha256:e52e5ba996c31616c4b8a28d9128220cd46dca40f2458dbab9662a639b881c7c"
          mutation_id: "sha256:ce78dfcf888f3c90410809413411e05349e6115867b861af43f14022de30a072"
        sha256:d1508eca6718cbca5a73644fae9fe7d3f93612d83e4fed3ed1f26cdd75068404:
          after_revision: 124
          aggregate_digest: "sha256:8b5bbb932bfb7a681bc0fd725510a0e0eb8a0639c821931b676beccd409e9903"
          before_revision: 123
          command_digest: "sha256:17b7a2a9e31932b07fed01ff65e7c3f156c9acbd2e93c70091227598116b10a2"
          effect_ids: []
          event_digests:
            - "sha256:77e38bc3f162cdcb92cdddfeecda372a0266ae509a1f5b4627bdbf8827de5051"
          mutation_id: "sha256:d1508eca6718cbca5a73644fae9fe7d3f93612d83e4fed3ed1f26cdd75068404"
        sha256:d79a5f231a5d5c47d060f8bbc63ee526d45e9020285ab2293615369a55e7890c:
          after_revision: 131
          aggregate_digest: "sha256:3619e072dd443c9f33fa1c0d366f5b229e6e9a52fa19987de310a628a47e3fb3"
          before_revision: 130
          command_digest: "sha256:8c520d4caf4ea1d49bd1b4e47771ece86731867a481cf27e53d2d71824363008"
          effect_ids: []
          event_digests:
            - "sha256:44af90d76206bf5e736f7003567cde7b56560223eb9f27c097d691ff8cbf68f9"
          mutation_id: "sha256:d79a5f231a5d5c47d060f8bbc63ee526d45e9020285ab2293615369a55e7890c"
        sha256:dc2910c94a011f34152772cff5e8fd0e339b63d12442c70c540d4eae74e9ed0c:
          after_revision: 103
          aggregate_digest: "sha256:2267873874a13963960370a264b4b311ab7f0c0d5ca50da167953ee7b613d42a"
          before_revision: 102
          command_digest: "sha256:834c6732739b346c602abab07bbe1fa7f78cfd359578d003356d26e1ca7c76db"
          effect_ids: []
          event_digests:
            - "sha256:2380f1001b9f753fb5b420d07a422cab931d588fbd1e552f153b7a076c888f48"
          mutation_id: "sha256:dc2910c94a011f34152772cff5e8fd0e339b63d12442c70c540d4eae74e9ed0c"
        validation-resolution:sha256:1dbf2dce752beb682a73393a523ff935d1921047bb49c042d55e79d629ed2568:
          after_revision: 58
          aggregate_digest: "sha256:5c61cd13ccb14354a5db41f713da32dfdc4652d135021f0ab738c2435452f787"
          before_revision: 57
          command_digest: "sha256:af276d803b06eba3a7f59eac998e9101efe6a655d48ab3ddf1dca754ae489f9b"
          effect_ids: []
          event_digests:
            - "sha256:5d95bc9c69edbb6c45490cc4c6dfe2e6abe81e9a8fb2b724f154588145677a5e"
          mutation_id: "validation-resolution:sha256:1dbf2dce752beb682a73393a523ff935d1921047bb49c042d55e79d629ed2568"
        validation-resolution:sha256:1fd2ed4e5d2da6d83c9071aee05f60b64a591a0f3a547584bb59af6fa8d6c91c:
          after_revision: 16
          aggregate_digest: "sha256:8c56ab5f854c82ec95e17a7cbb4a924aeb6ea9cb48d686364c89fe3041113f1a"
          before_revision: 15
          command_digest: "sha256:81d399fce89a31498d2f0e4854bb1fa0f92f33f7e0d7e9136e39703493e2552e"
          effect_ids: []
          event_digests:
            - "sha256:ce431cd0b7b305b0675353da8b432ac6a916270ac157fbe8bae4349ae0fe07f0"
          mutation_id: "validation-resolution:sha256:1fd2ed4e5d2da6d83c9071aee05f60b64a591a0f3a547584bb59af6fa8d6c91c"
        validation-resolution:sha256:2aed5eaf5abd09e4b48dee786b6ab0c73b8d112df122247e4212939dcd5582f0:
          after_revision: 79
          aggregate_digest: "sha256:13b0f2d2d4e2ef891e29e2af3b4978859fe3a5a9f65e736b8e4e40faef780288"
          before_revision: 78
          command_digest: "sha256:a04a619317c4432c050a569f397310f9bd003e8e3d5dd3952be84cf2c825ec92"
          effect_ids: []
          event_digests:
            - "sha256:8d5aec69a8138275f414d8dc99db8809a2f067533b855199c56238b6e26d3a6a"
          mutation_id: "validation-resolution:sha256:2aed5eaf5abd09e4b48dee786b6ab0c73b8d112df122247e4212939dcd5582f0"
        validation-resolution:sha256:417439130a922052e368ec743902ce344af5baa523f6f2b992371293622c4083:
          after_revision: 128
          aggregate_digest: "sha256:f90a60d301fa4951dd9228fd237975ac67f5c5956f55467be94d97f3ac8282c0"
          before_revision: 127
          command_digest: "sha256:8cd57c252235953c7a701f2828930e46b9b6b7e49bee507abce4cc030941e8d1"
          effect_ids: []
          event_digests:
            - "sha256:f72a4a99e8874aee70f38755a7ae963ed85742a880ced99552b7294e66a4bd22"
          mutation_id: "validation-resolution:sha256:417439130a922052e368ec743902ce344af5baa523f6f2b992371293622c4083"
        validation-resolution:sha256:45fea4add5ea2c48c2b03a2eb0812dcec2598f9badf30914fd69383b82c85e13:
          after_revision: 114
          aggregate_digest: "sha256:d1884fa7c4bdf316ab6ce19d9c7a852cf6b9d4ca2e8fb9fe7ad84bbfe8a40488"
          before_revision: 113
          command_digest: "sha256:6672c4418352f8544aad3bb51b66830bbd3697e72d7c8ff56fa1358654c0d904"
          effect_ids: []
          event_digests:
            - "sha256:c18c522c127dcd4f7dd084d6a7aa0d86c30f6987cd41e3c9ce21b1452fa4a51e"
          mutation_id: "validation-resolution:sha256:45fea4add5ea2c48c2b03a2eb0812dcec2598f9badf30914fd69383b82c85e13"
        validation-resolution:sha256:79b09197606f05846e33d9e84bfecf4801e5b469c30d7a7dd7d7d606c892417f:
          after_revision: 30
          aggregate_digest: "sha256:7afdf7a3da3509f53f540d44e36734c38e8731aafd9e6188a3f85b4a27665eb4"
          before_revision: 29
          command_digest: "sha256:c37bf83af2af6b92f9f120bf549c88f635430ba35ab05ddc02ef9114e44e4872"
          effect_ids: []
          event_digests:
            - "sha256:8406ad628e3e80c1fb2a7fc839948e5a055b7106c9c964fe88ba22f762398a53"
          mutation_id: "validation-resolution:sha256:79b09197606f05846e33d9e84bfecf4801e5b469c30d7a7dd7d7d606c892417f"
        validation-resolution:sha256:93cfbcf0cfdac058a5f311149a47f27ffdf9ebc5730b6f6af4e4bc8c5d6acd82:
          after_revision: 86
          aggregate_digest: "sha256:546283687448f3360c6bdf1ed1f42bb6de0cc3e550099ee407acfa483a55fdd1"
          before_revision: 85
          command_digest: "sha256:7f7d8359f2f0547ca646ae187cba4ab41e0c56cb6b41f3e3955e08943b9adbf2"
          effect_ids: []
          event_digests:
            - "sha256:60196b35b48f967bfdbf2797f71b119844f6158ef2171c718cbd9c4ef4da24ca"
          mutation_id: "validation-resolution:sha256:93cfbcf0cfdac058a5f311149a47f27ffdf9ebc5730b6f6af4e4bc8c5d6acd82"
        validation-resolution:sha256:981f57009c63be951daf9b2593e4a4112baaa9a9d8ea03dcd63dce5d1b4d3df3:
          after_revision: 23
          aggregate_digest: "sha256:86f5680076457915d544f8e3178e6d526ba3e126eaa5c6c774caaad035fc13f1"
          before_revision: 22
          command_digest: "sha256:da3d1f305f804cd7cea695b296f846cfc2fd00d3052f9167f84bba4257aaa7a6"
          effect_ids: []
          event_digests:
            - "sha256:ecd9e8d8f27c24c7e19f5a3a9c1536c357b434a8d63a091b2bea7e9162fed99a"
          mutation_id: "validation-resolution:sha256:981f57009c63be951daf9b2593e4a4112baaa9a9d8ea03dcd63dce5d1b4d3df3"
        validation-resolution:sha256:985da69c46981ecd4449a6eeb585274e3d450dd590468ace89af102d7cd40c4a:
          after_revision: 121
          aggregate_digest: "sha256:8567a0cf2c730a0813e062925765ea4e42378d8d45f8fa78c56e8ae8b363e5d7"
          before_revision: 120
          command_digest: "sha256:901fd3a80fc6aedb4ca40638d99b80846c9c676f5e599ead5867530257a35af7"
          effect_ids: []
          event_digests:
            - "sha256:9a040ff06f578da56b3e5c007877191b9d0ca7c3b188c8586c1e6a394ef600f3"
          mutation_id: "validation-resolution:sha256:985da69c46981ecd4449a6eeb585274e3d450dd590468ace89af102d7cd40c4a"
        validation-resolution:sha256:9cfc6c2887f8e84659a68fed715d21c7017c4ab15379d3d01735841c8f42b5b1:
          after_revision: 135
          aggregate_digest: "sha256:ab01e6c374d73c9d32413250a62f5d7ca548c6e878fd0ab61e6366b38d96b0db"
          before_revision: 134
          command_digest: "sha256:782e778324eafc510d83ed757bf153946efabb42156e83da601122e355c71791"
          effect_ids: []
          event_digests:
            - "sha256:48552e5c39ba69202e5f339be0883c504ebebfd58a3c15f078b530d4ff27bee8"
          mutation_id: "validation-resolution:sha256:9cfc6c2887f8e84659a68fed715d21c7017c4ab15379d3d01735841c8f42b5b1"
        validation-resolution:sha256:aab2674cfb65b6e983f90dcb005bea11d6d827e8ee53b4d45eaa455f508a5b35:
          after_revision: 44
          aggregate_digest: "sha256:993b954faec5eead18013de9f49c0981c24581f307136cd0a1c0a61a0fd17ec5"
          before_revision: 43
          command_digest: "sha256:9951d4ec6597f864e3359b9ee1a15bd0f5d61bbf528785ab7ef27b2889d00162"
          effect_ids: []
          event_digests:
            - "sha256:d1665720b0a1393aa6153e87a58d81f28e16dd013d9759bb54e7ba10e45aea6e"
          mutation_id: "validation-resolution:sha256:aab2674cfb65b6e983f90dcb005bea11d6d827e8ee53b4d45eaa455f508a5b35"
        validation-resolution:sha256:b9cac4e7b425fac137c6b2fa938aa208437a843265678485b86a5c17b6cf0a4a:
          after_revision: 107
          aggregate_digest: "sha256:5c0613d3dad52f017560fa373adb94943d2fe787f4afc4a9b22f81afc122aa2d"
          before_revision: 106
          command_digest: "sha256:a716193a10cf3a393fb83fd4d550fcfbdb3d4107ab437efc0a23954ef32a63e9"
          effect_ids: []
          event_digests:
            - "sha256:226036f93b1453aae20c3d249031f579cba20507ce16aa514a6a4a49b0828a9e"
          mutation_id: "validation-resolution:sha256:b9cac4e7b425fac137c6b2fa938aa208437a843265678485b86a5c17b6cf0a4a"
        validation-resolution:sha256:c333de2e895e935ac17a54d140963845fb76443075f5995541958c8c45963146:
          after_revision: 93
          aggregate_digest: "sha256:1f8288c4c19f0c93ff10292ae9db4c240524c3874a58a7641f30843efb82ebc4"
          before_revision: 92
          command_digest: "sha256:fa4ee8750cbcc55e8605a6031afe379b22feb986fa12f0a68169b7d3ecaea3d5"
          effect_ids: []
          event_digests:
            - "sha256:7ac212dfd7409394e8bda36b4baee44ac9eca0a0f0ab762aee9c55de6e461570"
          mutation_id: "validation-resolution:sha256:c333de2e895e935ac17a54d140963845fb76443075f5995541958c8c45963146"
        validation-resolution:sha256:d8217a686912a65521969cf70dbce7a90fc3e8f6ecda51bb87d2d3590e1556d0:
          after_revision: 37
          aggregate_digest: "sha256:fb681735543801b4aec65e56c372a6cfc62996e3bbe21480f9154f8f77bba963"
          before_revision: 36
          command_digest: "sha256:b8e81b7b1fe5d52fb8b1a10c2e0e31643cc5ff3660e8639f21c45dd26b84219b"
          effect_ids: []
          event_digests:
            - "sha256:fc68c1689da28247c3dda85e4add3c90d72ca49ad37c836ee4d625ecbe0bdac6"
          mutation_id: "validation-resolution:sha256:d8217a686912a65521969cf70dbce7a90fc3e8f6ecda51bb87d2d3590e1556d0"
        validation-resolution:sha256:d90bf4cc1d5db3277fe9ce6bcd0bcb788bd861d80d7e5dbb88afa86a6d20dc70:
          after_revision: 51
          aggregate_digest: "sha256:6302a39c02096937951b0983d5dd59a9774e3b43e8871cbeb8b7cf5dd0b074fa"
          before_revision: 50
          command_digest: "sha256:05372fd0db30f05b52f8c6c6d97c36936a0b806d0e3ef2f6b46b2e1af0dce2d2"
          effect_ids: []
          event_digests:
            - "sha256:cb959b110ecc45ecfb8ed18d0251cbed500843f08d9a82cd286352f67799e34c"
          mutation_id: "validation-resolution:sha256:d90bf4cc1d5db3277fe9ce6bcd0bcb788bd861d80d7e5dbb88afa86a6d20dc70"
        validation-resolution:sha256:daeb5c39b34290a6cd94e15c12df737e52f92f011a6c091387b84c4b227a52eb:
          after_revision: 100
          aggregate_digest: "sha256:504ecd001d6f114317940aa5b57f2fd62087106da5d57a93444301bf36f27fea"
          before_revision: 99
          command_digest: "sha256:4e71ce70ebdf6a7364e7c49a9a60f0286bccf42d56196f6fea53f7a57eae229a"
          effect_ids: []
          event_digests:
            - "sha256:439aeebc458b8ab0b810b8888aa32b0ea45f687628172a20888ee93b03b781e1"
          mutation_id: "validation-resolution:sha256:daeb5c39b34290a6cd94e15c12df737e52f92f011a6c091387b84c4b227a52eb"
        validation-resolution:sha256:dcc7d25b5487a603a32d4bd22dad322d0836339a76af083b0a8edf90c3fe60f4:
          after_revision: 65
          aggregate_digest: "sha256:5b615fd8a84409c5306ec9487831a6bb2bbcd4bdfd48762489a7fc8e72c84581"
          before_revision: 64
          command_digest: "sha256:802edeaadbfa12e9cb3ee2c1bc76884e556937a821951ec98df5b0b75af429d8"
          effect_ids: []
          event_digests:
            - "sha256:366186f88434bf84defeb56466f967cd6dd8a3f2b98723b5c2050407dcaf0b2f"
          mutation_id: "validation-resolution:sha256:dcc7d25b5487a603a32d4bd22dad322d0836339a76af083b0a8edf90c3fe60f4"
        validation-resolution:sha256:f29a2ca1f555942a4346d12b71618ca48cc51ded3dda9974e309ea02e2d84c99:
          after_revision: 72
          aggregate_digest: "sha256:6f21a067635b1b8f16dcbaa8eddf55136b905accd0c1f4a33fa5b2d58f216ceb"
          before_revision: 71
          command_digest: "sha256:f070c66c313b9ae8d3ce797564c0dae948ab1aca074d2fb1ee840b05afdeeaac"
          effect_ids: []
          event_digests:
            - "sha256:12822f7a4aa867628c969e55eb77bac5bf2b037dda40c754c86623f95f0b18d7"
          mutation_id: "validation-resolution:sha256:f29a2ca1f555942a4346d12b71618ca48cc51ded3dda9974e309ea02e2d84c99"
        validation:sha256:07f5a99e49ea45232dd4b04986a26331258a6b14e0663bcc49469649bf71f293:
          after_revision: 99
          aggregate_digest: "sha256:e4fa53136c65f3a935d6c393fc0147047a37aa4bd95bba270c35c1b274f14735"
          before_revision: 98
          command_digest: "sha256:a68861c8c663359d59a8efb72ec04082935b7a9a15a82552bd0e04af1c716949"
          effect_ids: []
          event_digests:
            - "sha256:115e0e9bc795dff0a0a5bdd932eea204c3e422bde7da095fc05b6489f7b6c91b"
          mutation_id: "validation:sha256:07f5a99e49ea45232dd4b04986a26331258a6b14e0663bcc49469649bf71f293"
        validation:sha256:0c8da65db6cdb9df32f1f2169fad48ab060bdaa9def43376532075302977836d:
          after_revision: 120
          aggregate_digest: "sha256:87671d371f7bbc976fbb1c48141074136a20e1f76c8f53f3d3a5640a94412856"
          before_revision: 119
          command_digest: "sha256:619b658f18e1d7d0e8b6de56b63be30d1645d287ae43c4a1dc17d37624744d93"
          effect_ids: []
          event_digests:
            - "sha256:2ec91fbbf60b3e6b0a38fb04fbbdac7b2a404c19ef9bc7b948b74b95be5c060a"
          mutation_id: "validation:sha256:0c8da65db6cdb9df32f1f2169fad48ab060bdaa9def43376532075302977836d"
        validation:sha256:0f5a80140ae2dbe532fc1489d72f9a171b04ce73df32fb805d90e8be0a325291:
          after_revision: 134
          aggregate_digest: "sha256:3307c605be238abd4375c1396471a9b15cdc09579cc07279a3c55e65d6ed70f7"
          before_revision: 133
          command_digest: "sha256:4fdff265f7372d4b9aa8095a88931bc7f4be2dde740c96208fc4f2a39dcdee16"
          effect_ids: []
          event_digests:
            - "sha256:fe47371d3e2bf73a8c40cbae68f8b6f94c65c0eb8495ab0e051947f5de2801d8"
          mutation_id: "validation:sha256:0f5a80140ae2dbe532fc1489d72f9a171b04ce73df32fb805d90e8be0a325291"
        validation:sha256:19b6a471845cc1622508adbdbe6b61a9606ab3f363ed9cc13c2f0769db455bd9:
          after_revision: 127
          aggregate_digest: "sha256:b8b1e3e83e56835555c19f40a648e916090638fc107ce4980619a00c446e68c3"
          before_revision: 126
          command_digest: "sha256:e23712a855427d16db33b71870175e0b87bd8e9c7c4e4c6d4f322e5822e54edd"
          effect_ids: []
          event_digests:
            - "sha256:5bc5f00ec64d49bbaef2a2bbfe6d26a7f03f7a473e6c7e1c104b7ea32e79ad34"
          mutation_id: "validation:sha256:19b6a471845cc1622508adbdbe6b61a9606ab3f363ed9cc13c2f0769db455bd9"
        validation:sha256:25e11e59c8ae2f3b17adf25e1328f5f59ff11feaa776a1abdc01c20f6d8d7e5b:
          after_revision: 15
          aggregate_digest: "sha256:b28fe70b4150f1c9da230ca45930f75400ea182513d3b45f523f92d419ddbb6a"
          before_revision: 14
          command_digest: "sha256:667fd0fef78bd7da957bc2938cc5fac6b940eb7aa7f25bdd999e98938eb52a45"
          effect_ids: []
          event_digests:
            - "sha256:9e6826ae0ff0edad23ffacf2cff142729515e5e6e822ef4f8e56fdd33a6586dc"
          mutation_id: "validation:sha256:25e11e59c8ae2f3b17adf25e1328f5f59ff11feaa776a1abdc01c20f6d8d7e5b"
        validation:sha256:27bb97c3ee1f750ce4b603b8deee421c2eb35730afc5e610482b994542a1a493:
          after_revision: 113
          aggregate_digest: "sha256:0aea78d2360e87ee0d58af0365a3ac3fbc41b00ef5adbd6c28cbfc57932e386a"
          before_revision: 112
          command_digest: "sha256:58db2291f9dc54ae8ee55a323c2a8a565d42ead74e08d5f3dde06a2f9f9e870f"
          effect_ids: []
          event_digests:
            - "sha256:6f8788198d0ee59cf2f6e1b264a876c6b4ec79edd533a2355ec35bcd4efad126"
          mutation_id: "validation:sha256:27bb97c3ee1f750ce4b603b8deee421c2eb35730afc5e610482b994542a1a493"
        validation:sha256:324e35b49968a1a4f92a016b735c26543c757b0952359f33a2bb787fa9d52556:
          after_revision: 36
          aggregate_digest: "sha256:2a408deff6b06f0279e7710814e021dcdb5ed634c9531af3d37d578b34969693"
          before_revision: 35
          command_digest: "sha256:65f922fe8f82a2d930d69f1ed6ff92262609b670e25d43a7f8347b57cbe735d8"
          effect_ids: []
          event_digests:
            - "sha256:b99cfb9289e52e37fbb2bf815b3b8bb89d323e658cf6109ee244a7c8ae47c02b"
          mutation_id: "validation:sha256:324e35b49968a1a4f92a016b735c26543c757b0952359f33a2bb787fa9d52556"
        validation:sha256:38b36844fc21a272480c8a8de545d1fc718ebd69fbedb064e96e8d60c7852fb7:
          after_revision: 106
          aggregate_digest: "sha256:70d41959337a0705cfb6efdd945fb8e999778c585ee2631acea49301da60c6f2"
          before_revision: 105
          command_digest: "sha256:7c57414b3dbb4f8bc0f014ea86f7e418e44ea0f6118d43ad8c58f921da9f29ab"
          effect_ids: []
          event_digests:
            - "sha256:6019171d77e5dc680ed0b54742603d45aa35f0a476a5292a1a2f324e289e289d"
          mutation_id: "validation:sha256:38b36844fc21a272480c8a8de545d1fc718ebd69fbedb064e96e8d60c7852fb7"
        validation:sha256:4b5eceecd18fee4a226bba6eb842192cf57f48f25ff2d95d6cddd3fac1fb179b:
          after_revision: 29
          aggregate_digest: "sha256:d5cce7d9ba46a15a5c393cc713de9d2b3b1218753ec14885e5b733a73b1a00d9"
          before_revision: 28
          command_digest: "sha256:d4fc021e78def03ee92582f30f0ee13b176316a9976ed5f4db8123c1e34ee29d"
          effect_ids: []
          event_digests:
            - "sha256:b1b5b382f602e88a9ecec03e39df7bc07335c9de11e84bc9855d18cc80d42ecb"
          mutation_id: "validation:sha256:4b5eceecd18fee4a226bba6eb842192cf57f48f25ff2d95d6cddd3fac1fb179b"
        validation:sha256:7be97c10d72a8d5ff24aef44fa2663b227deea3d586d414fb3df7cadb9d0e2a7:
          after_revision: 85
          aggregate_digest: "sha256:59effeb03f98a38bbe253fd1f1ed0ca33c25154bc9f134234ac290769bc0022a"
          before_revision: 84
          command_digest: "sha256:e386ec6c6a1ba89ad866c14df479b7d0f67a64bb36e7a55db404cc9e5bd6649a"
          effect_ids: []
          event_digests:
            - "sha256:f5d5677283e27e9a7742cf85e003bd13864b832bc2b59b9b7c84af41b19abcd9"
          mutation_id: "validation:sha256:7be97c10d72a8d5ff24aef44fa2663b227deea3d586d414fb3df7cadb9d0e2a7"
        validation:sha256:9e9e4c2e216bc2da16df63fa8ac8f08959ba9ad78257c843393a0cf5dd126b74:
          after_revision: 71
          aggregate_digest: "sha256:cd2e589193997ed618f8bda580e482c8e077a873fe6dd7e696676af79571cd20"
          before_revision: 70
          command_digest: "sha256:b2576c1dae66b00c7c8acf47c71d464e2a591b215f807532a9ce7aaaca06b04b"
          effect_ids: []
          event_digests:
            - "sha256:fbb284167f85c5857c0d20835fcf5f324ebb4c090845569f84f81c0608104901"
          mutation_id: "validation:sha256:9e9e4c2e216bc2da16df63fa8ac8f08959ba9ad78257c843393a0cf5dd126b74"
        validation:sha256:a06fae08d140bd805697ed7b941186483a8049586a51dc426b1e518427c02269:
          after_revision: 64
          aggregate_digest: "sha256:e04b8f72227f8902725084b1f60dccad77092cbeb6c4170bfc3aa2c601b8df9d"
          before_revision: 63
          command_digest: "sha256:80cdf64abc8fad1a07177a794bb2d5c5c5ceba9326ff162896ef4c3e2266fa2c"
          effect_ids: []
          event_digests:
            - "sha256:9d895328ad322f8f1dec58cc881cf13112c5af305e1f47e90c78e9273a77244d"
          mutation_id: "validation:sha256:a06fae08d140bd805697ed7b941186483a8049586a51dc426b1e518427c02269"
        validation:sha256:a0dc255ef8c64195e6f05b25cd7c4bb3fb5abfd4943bae1690b5fff2d26d0350:
          after_revision: 43
          aggregate_digest: "sha256:b89dfa1cdd2482c88c96aa78a87f51fd5bec871fb70faa1f78302cb40b099109"
          before_revision: 42
          command_digest: "sha256:4cfcb9ac7dc710fc0d23719abef5b046bc9d7a88dbd8e1289dbb617c5a31d290"
          effect_ids: []
          event_digests:
            - "sha256:fb768ffffcf40751b604ab46696d0d29b24adf47b44c1e0af723bbc4e8ba7c2f"
          mutation_id: "validation:sha256:a0dc255ef8c64195e6f05b25cd7c4bb3fb5abfd4943bae1690b5fff2d26d0350"
        validation:sha256:af9b9a627e854460690b723c5886fe758e6db8ca78d4ad7e6276a23f540f2948:
          after_revision: 78
          aggregate_digest: "sha256:3abc4d1e8a88e57715989bbe9b7c58c783aff8bd522757b888b66188343d53f2"
          before_revision: 77
          command_digest: "sha256:b62767a1660a16677da9d13eb93555eb143c60502f5b5baf113045d25161120f"
          effect_ids: []
          event_digests:
            - "sha256:2c1438469071b473395293051c14d5f86d86cf7ab52b3a2d459f4da5863cd006"
          mutation_id: "validation:sha256:af9b9a627e854460690b723c5886fe758e6db8ca78d4ad7e6276a23f540f2948"
        validation:sha256:e19ab9ccb9d1b5a4d8950e37ffef5fc2761fce89301ccbbcda96c75dcb237c40:
          after_revision: 92
          aggregate_digest: "sha256:67a0327754f0b6c7ea49105d4b5b807fe2b9b3084edc01d1923cb7a817dea4e3"
          before_revision: 91
          command_digest: "sha256:2404abaf4c585578ce1d18f6d0a8719c32a48556fd5aad5b6ecd59768eb35c80"
          effect_ids: []
          event_digests:
            - "sha256:75ec5c447af1d19455473400ddbfef327dadf67163a4e04d447d52d665b6634f"
          mutation_id: "validation:sha256:e19ab9ccb9d1b5a4d8950e37ffef5fc2761fce89301ccbbcda96c75dcb237c40"
        validation:sha256:ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000:
          after_revision: 22
          aggregate_digest: "sha256:a8dd29fda2c58dafdaee59c565e4ce7ce63ef38225c7363bc0af7a470eba7699"
          before_revision: 21
          command_digest: "sha256:b25f42945be8f94b532a8a7c5acdc9c873341c8e22c4babf65fc6c10cf44af40"
          effect_ids: []
          event_digests:
            - "sha256:e1d4ca0659d84c704e5704983a38e073e4360bd1b4497452a9f212c7f0758dd3"
          mutation_id: "validation:sha256:ed248f33dd6bc3f6e717db108fd32d775b876e2c8edd3248b3c260e5e97cc000"
        validation:sha256:f82a4e1ec05e533c23ab498eb599ad02df60b0dc4094fa29dc3562dbae8c3816:
          after_revision: 50
          aggregate_digest: "sha256:bafc97f255898859974bf670bd3cf21e1c31af110395112a6b1f072542768479"
          before_revision: 49
          command_digest: "sha256:bc909c0a9afd51d7b78041eee59ad16ba01cdda22a5b61142cd01a1a3b40ab50"
          effect_ids: []
          event_digests:
            - "sha256:92fb79f021e50c7b64982c7b758ce943a8e8cee0403160b4cbdae43b11b48975"
          mutation_id: "validation:sha256:f82a4e1ec05e533c23ab498eb599ad02df60b0dc4094fa29dc3562dbae8c3816"
        validation:sha256:faac2ef9c0052fc2150e5e055b10da7c8d7ae10f19d41ffb936d790e21830f5f:
          after_revision: 57
          aggregate_digest: "sha256:e2a0a2413a6f05abedad48da00f45a004bbf84e67e81ce789ed044c425ff0789"
          before_revision: 56
          command_digest: "sha256:77e1f32563410002de3ad19f5a2d86315328b59133a6707e38172ca8c0420c44"
          effect_ids: []
          event_digests:
            - "sha256:fd8e36dae04484bd38ef04d89d5f02f6add58a5e49f854cc6296f8db8f97662c"
          mutation_id: "validation:sha256:faac2ef9c0052fc2150e5e055b10da7c8d7ae10f19d41ffb936d790e21830f5f"
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:a00a2b31c55f42081408ce59e54f7c118f4e340e58dadb166176d9c988a206ba"
          digest: "sha256:45945a83ae160babed15b555960b968f2c9cccd780fbc51a48b2e36f5a645492"
          revision: 2
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:38894926f13822284279c376f5501ca497ec1a5675e921e0b05289cd9692faa4"
          digest: "sha256:99409ad20108a18ccb8410d99c346baa99fd8bf82623c804aa8748e700ef237c"
          revision: 3
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
                  - "scripts/lib/test-route-registry.mjs"
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:396f37370f617cc8a8ecc2f028fb1cd585f72a90d65bc7b3367baccc75161160"
          digest: "sha256:e5d98a4bb211f708e997673e9e9be06d1d0c383c09c524a19fc4bbb6eeca418a"
          revision: 4
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
              contract_digest: "sha256:31f0ab3b1d1b753fe245f8f82e76b068f919b423bfe96e230cd7e5b1be0b3905"
              depends_on:
                - "rc-15"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects:
                  - "network_read"
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
                  - "scripts/lib/test-route-registry.mjs"
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
      revision: 153
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
          attempt: 2
          claim_id: "sha256:6af9f3fdc16925a4e78dc58f8020d45c112ce46aeb734b5ad0e00c5f272476f9"
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
          output_manifests:
            -
              attempt: 2
              digest: "sha256:44a4f72d120caae61c0fdab04c3b1266d5d7250c2a5c02941fedda83402919bb"
              id: "rc-03-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-03"
          result_digest: "sha256:a1a6a1fd487ca34fcd13e1473cb817c526e4960a22a89fb9da00e3a0915642e7"
          revision: 14
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:3333a4b6a15b67bc878ef3c8a3e36acc295721875ae4aa5128f5e2933e4fc0c4"
              - "sha256:5828521bb529fa1bb766b95bed58698056637176ebab2a45bc91ed2f8427e4b0"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:dcf33881dbe2318189c6670e3369de9baab85a5ff4e96e25a265130e32a37520"
              environment_digest: "sha256:04e4174285e2b40afd76558a90520f3cb5814db7a93e5bdd5af37176a0ed1af8"
              implementation_identity: "sha256:a1a6a1fd487ca34fcd13e1473cb817c526e4960a22a89fb9da00e3a0915642e7"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T12:18:27.009Z"
            status: "PASSED"
        rc-04:
          attempt: 1
          claim_id: "sha256:68c5defe305e228660e965850f754c7f480d136e9b2d97fa81f39074797c69f3"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:2d52fc821db083c499fce9f9098804e663bce0020816aa45648af851ed1b7dab"
              id: "rc-04-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-04"
          result_digest: "sha256:c43f9c63e384dc84c829c68967f7b9bd3e07979560d17ab9d28295fe46cf8763"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:668a892adc007ff45561e1df104d05b5283eb3a3fd1a54788eaaf50ab5705e2e"
              - "sha256:0f175de065857b12f55b1bdcb18fe4e7cf97d73db21b40031394f0a6ac2ef42a"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:b504cf7cd9fcd64e76893e9412013dda8c0904ed9f4fbc00abfa78b7b110c0db"
              environment_digest: "sha256:982d2093adff7a9666318a0f8987f7d503372bb73d681e5ae641ed2627062c97"
              implementation_identity: "sha256:c43f9c63e384dc84c829c68967f7b9bd3e07979560d17ab9d28295fe46cf8763"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T12:46:43.788Z"
            status: "PASSED"
        rc-05:
          attempt: 2
          claim_id: "sha256:7ce75affb95df684d512fea9ecea5fa9fafa35997cdd7934b2737f5c46a4952c"
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
          output_manifests:
            -
              attempt: 2
              digest: "sha256:5c70ac944039d844e97fdd62c3b362fccde72e5f73fcf4719cba57c2383da739"
              id: "rc-05-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-05"
          result_digest: "sha256:f8174ea396c4610ddb8532fb60aabd47900fe0ba9432aad2516275e172751ed5"
          revision: 14
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ec703230e22ac70279e8e6394d43bbc44c0ed50965c845276abdab4e4f64b93b"
              - "sha256:38292ff9b85c08c09c60f05af73dfd226e1acef7c016b71870c8d573ca617278"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:b6a0f0e949f1327bf86bcacebb7055cc6381b90e83d2f0f029f339462b837918"
              environment_digest: "sha256:9ad7c70edac892f1b246914a4eb10e5a06cba6bb7645a354d731d1f12592ca25"
              implementation_identity: "sha256:f8174ea396c4610ddb8532fb60aabd47900fe0ba9432aad2516275e172751ed5"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T13:36:21.726Z"
            status: "PASSED"
        rc-06:
          attempt: 1
          claim_id: "sha256:3a5fba8d58017376825f46813f4745aae8157718bb3cd2c1550b331b17881497"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:dcbec23b52f2e3f3a0eccc7b6eb63478d3f7375007cb9612638c1ab2e51aa02a"
              id: "rc-06-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-06"
          result_digest: "sha256:b692e9f2acf297c650c1bb08fb69890214aa25a9682fb8d7168fef0e40a36804"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:2757737bee73f0d5594873e8765aac03efb6d2be5b0916e59a42122f6d4d978b"
              - "sha256:85d6b28c2dc7f5511b8d0ca12a9bb12345cc40fa2970e372433e908afae9a442"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:d6a9e935f0876ced048aec808e32b7ab38b4922eb58b5c7ceae6f64620a5544d"
              environment_digest: "sha256:79ad2550560d26be18edb6701f9798a7d6638722216e1d8ff9bf7a1661274426"
              implementation_identity: "sha256:b692e9f2acf297c650c1bb08fb69890214aa25a9682fb8d7168fef0e40a36804"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T13:59:52.198Z"
            status: "PASSED"
        rc-07:
          attempt: 1
          claim_id: "sha256:8c12029e04196cbd8e1e07464f2bdf73fdf365289764f467e39fc292033f36d8"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:aa31818ffa05427da47be07035a838565615ac9855bc7b152d592bd5587a94c0"
              id: "rc-07-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-07"
          result_digest: "sha256:2d236b15f759a7f88adf780cce8470853e45584f03262db5fe1babd4d5e7e051"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:fe8e6cdeb05b56fa9da25860ad1a412f7f492a047c59f2c7d11ccce7932e28ce"
              - "sha256:abb42da31192cb81a518192d1f0f7849c793d3369f9588a5c51ec882f89fd576"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:8dc6ec0be68d8a434383e3ef6f0b678190d61d8657912979bd97e40e637bc51c"
              environment_digest: "sha256:2ce566839ad92780c4faa50f4b5fd71137040e272941b91eaba2d7fb0bed6e88"
              implementation_identity: "sha256:2d236b15f759a7f88adf780cce8470853e45584f03262db5fe1babd4d5e7e051"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T14:32:42.690Z"
            status: "PASSED"
        rc-08:
          attempt: 1
          claim_id: "sha256:d66e5983e30a9d56be1c67bbac9c16b19f0c9c713c785970f66dc50619491f86"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:ed8c47188e685bd8497dfa9acb17051e98e4c2adf2a697d2159bf244ff725c85"
              id: "rc-08-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-08"
          result_digest: "sha256:a50705bcebe5e538c3eaaf1d805e12bf9f89cf3c0da87bbcd0580def5a1bf463"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:dc7e1b47c0e95116eacb45f55cd902d57f90ec01138793e7a8f024c802d90e4b"
              - "sha256:00e3d417934d313513e9542f1f9d7fa76a7e232d0e9b5e40aba9b07dbcd775c9"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:52a734d9c9efc4fc1db55c364730f7d85e1b3ac68272ed0ff19a0ad2e7f1dd94"
              environment_digest: "sha256:45ec19ff9f4b8be638b0e680436f27cd8282307f8bc8157d1e46ab0a1017e333"
              implementation_identity: "sha256:a50705bcebe5e538c3eaaf1d805e12bf9f89cf3c0da87bbcd0580def5a1bf463"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T14:58:34.667Z"
            status: "PASSED"
        rc-09:
          attempt: 1
          claim_id: "sha256:53ac00e3ec18ae482f0e793e1af98f7b5f7b2a7d1537c4fd54392361347ccac8"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:2b2d2091ea275bf9883b42a33db6b9a98750d694b1f55ac453efb79479a3d138"
              id: "rc-09-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-09"
          result_digest: "sha256:a4f87633b415eb31374b98e8b7b71d68a7f6d8ab6f053f56f13433492503b23f"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ce7b17535d30cc1e8b8163be701a061557b91673d2aa39882f5e736950d77332"
              - "sha256:15314c342615a8376b3354975e5443873d433ac9bb8a1fce8137f915b823f992"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:28fbba111e150098462f1b3f1be3ea437c90a171aee3bced313085d76c0bb6ea"
              environment_digest: "sha256:bd22f77e7943e9045a4e6ab2e0ffbc9e1716f9226c0904f2979bb94abbc3d7a8"
              implementation_identity: "sha256:a4f87633b415eb31374b98e8b7b71d68a7f6d8ab6f053f56f13433492503b23f"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T15:24:19.919Z"
            status: "PASSED"
        rc-10:
          attempt: 1
          claim_id: "sha256:00862f5a6976a0ed5f5cc11ac939507d985f6ce549dabdf4fac68802507dc98b"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:534331ba84160a01665f45d80cac41c9181c00bebf05eee6064a8f98934831ad"
              id: "rc-10-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-10"
          result_digest: "sha256:ee05e6d88e955132ad16626723d563e4a083c5fd9fc6c37ec05f9ed85efaaf6f"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:67b410912ae9d3103286db29d0f94e0d2559e4d708999ad635b80cfff7cbdb7f"
              - "sha256:2b99ce4a42002d785afd66e0d65f693b0baa982a2d0b73d6bd5d696ad3852850"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:b79c622f28cc5c2f880fe17c5f8c2c1de7f97b562f7fbfdd2b4086f7852a0c33"
              environment_digest: "sha256:e03512f666fb62939661c3e42d09ad3cdd3bd1a8040b00b59809e78475dc18d3"
              implementation_identity: "sha256:ee05e6d88e955132ad16626723d563e4a083c5fd9fc6c37ec05f9ed85efaaf6f"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T16:03:46.791Z"
            status: "PASSED"
        rc-11:
          attempt: 1
          claim_id: "sha256:69fcab89863233e820935fb6df76f893321d5df0f50ad4c28765f5d5e6bad470"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:a804f4c7aed0c4b8f758586149b47f2c7967d13038242cfa7534dbb54355c703"
              id: "rc-11-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-11"
          result_digest: "sha256:16b4f119cd8896040efb6e2ef08e4e7d1514cba139bff6be997d95ab813da273"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:133d75397cd9a6d89c0f8d580409febde463805e28feb77a904f7461b08aa473"
              - "sha256:4a7c53772b84ab6f29e60c617856941220b8eac4e98acfa7f5e3ea7067cb81d4"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:42b181b971537b2c5963616458d22b5dc8e90c1073fa8a05ddb2158f6299666a"
              environment_digest: "sha256:2af7be1bf19df0f6bb3a26f7042aafef56fc22c180d94e353f45f57e4831af64"
              implementation_identity: "sha256:16b4f119cd8896040efb6e2ef08e4e7d1514cba139bff6be997d95ab813da273"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T16:54:30.666Z"
            status: "PASSED"
        rc-12:
          attempt: 1
          claim_id: "sha256:26c37a9a0a9c94ad8ef26fb8ba0a14144e932e6923126b5ec438b2c687aac73a"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:34124a877ecdffb09ce5baad6d25b14e88c65e75d4507e1cf8e8fb3e490b4aba"
              id: "rc-12-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-12"
          result_digest: "sha256:64fef027908f9d68f8db69bcbffdb8df2552cfce28e3174406b07c9c8e872122"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:f58c1a8502787f878b34ef8c2c6fb62fda2e22784cda24e2fb4096937df5d6fe"
              - "sha256:242734e977b11d54f87220e587ad483eaaf333020f1a1e28cd81adf007f79e0d"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:73186d8f85a17b84087ce3cc552d484c7b2c0cd647dc8e61d8926e4d6f005fa9"
              environment_digest: "sha256:6fc6f320557d0f3bff331331663e1bee48e33c774d0c6e5fae3c3ae98c784927"
              implementation_identity: "sha256:64fef027908f9d68f8db69bcbffdb8df2552cfce28e3174406b07c9c8e872122"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T17:16:34.876Z"
            status: "PASSED"
        rc-13:
          attempt: 2
          claim_id: "sha256:4331e856e136369016498fa21fb02a220ebd052666c43aeadbb9bdf8d517b4e0"
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
          output_manifests:
            -
              attempt: 2
              digest: "sha256:8dd64997f5da19a30b159a504d776fd025e07703f9786b8a23ea3ecff2979f56"
              id: "rc-13-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-13"
          result_digest: "sha256:876bb5fd8328c1f65e8c0fdb5838a489f4b4f3cf91228704a65670ed6bf67045"
          revision: 14
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:4d99efaaabc3b56f3ec062e1664f8463a210be49d91032ca96b50d39005d4d04"
              - "sha256:52fef92e2a1e0f11ac0aa8ef224f7d2e46e42a20eee9aecb2886bbe7d917a1d2"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:49486fb721380bf1dc5c984646762be0ddd5045819c0428f49f12795ad4379ec"
              environment_digest: "sha256:7498b6c472ce95bec9e9f4e2889a503465f01f5c742a34f7f660ed2c585d19d7"
              implementation_identity: "sha256:876bb5fd8328c1f65e8c0fdb5838a489f4b4f3cf91228704a65670ed6bf67045"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T18:17:00.710Z"
            status: "PASSED"
        rc-14:
          attempt: 1
          claim_id: "sha256:2430982d9ee85b80af7b85be5fe70251c02568a1ed79f9a88248466fa30d1507"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:376d76c82bd9572197c01cdfee26a446d72972f44b0218dcbdfb75fbc01ea593"
              id: "rc-14-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-14"
          result_digest: "sha256:8dbda3d935c0065af854d10971b9bcb2f5369f78ec99cdb4b93efd4bc443bea3"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:7ba6c9693f2a395c927950a6afd5da93cb3013b122f4b505468d1a3cad585d69"
              - "sha256:c82bfd6dd93bad2cddeb522db49810b9391956e0bd4db268238f8d4a0d33c673"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:415cac43debe41da84e49d8d22669d30709dd01d018944df340aca877330b4a3"
              environment_digest: "sha256:95edbbe61c8f06bb3918b3cc510f4d5498ab7402078e9796ad2a053404ee7ab4"
              implementation_identity: "sha256:8dbda3d935c0065af854d10971b9bcb2f5369f78ec99cdb4b93efd4bc443bea3"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T18:58:14.156Z"
            status: "PASSED"
        rc-15:
          attempt: 1
          claim_id: "sha256:323fdceae93944a81bd530909d06d7f516c166d9e02daf882972e506d4171692"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:fcdc4e5359f1e572bf24050d606f2f7717eb588c6026b8bd56bf2e514404c95f"
              id: "rc-15-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
              task_id: "202610041748-K43XFE"
              work_item_id: "rc-15"
          result_digest: "sha256:fdb7a6d5f23581c5f7ea3d2ab4c336834e7f2fc9fe5b2d7210d67e0cb4f8f562"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:1970dd1b66a2e7f44d1126214e700631ec52bb251cddbe1c41a45011d2034526"
              - "sha256:f6b8b615abe650c97a53481bf2f94d153983eb12b14e93b7b3d46f242ca268e5"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:55b5f3d0295915b0555231103abea32ac35830ce01342b41ee3ba45e8a9e9685"
              environment_digest: "sha256:9e9994e1c88104bf07d03bcbb792d989fe8dfbc944ed3295d402414d8c409f61"
              implementation_identity: "sha256:fdb7a6d5f23581c5f7ea3d2ab4c336834e7f2fc9fe5b2d7210d67e0cb4f8f562"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-05T19:21:21.233Z"
            status: "PASSED"
        rc-16:
          attempt: 3
          claim_id: null
          definition:
            contract_digest: "sha256:31f0ab3b1d1b753fe245f8f82e76b068f919b423bfe96e230cd7e5b1be0b3905"
            depends_on:
              - "rc-15"
              - "rc-supervisor-composition"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
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
                - "scripts/lib/test-route-registry.mjs"
            expected_outputs:
              - "rc-16-evidence"
            id: "rc-16"
            optional: false
            required_inputs:
              - "rc-15-evidence"
          output_manifests: []
          result_digest: null
          revision: 16
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
        rc-supervisor-composition:
          attempt: 1
          claim_id: "sha256:2b6281e27aaae7848552897318e198040b93a166ce4f1deb79473c616d878c5c"
          definition:
            contract_digest: "sha256:21c6639fca48134c5cbd5843596a2a0a2b4004be1881b9b7b197e564bf0dddef"
            depends_on:
              - "rc-15"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-work-order.ts"
                - "packages/agentplane/src/commands/task/kernel-work-order.network.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/shared/declared-check.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/kernel-advance-network.test.ts"
            expected_outputs:
              - "rc-supervisor-composition-evidence"
            id: "rc-supervisor-composition"
            optional: false
            required_inputs:
              - "rc-15-evidence"
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:2c949e86e1321bd9b049ed85a9878b5240c2be57f83682d78a5ff84f0fd48ac6"
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
        sha256:21c6639fca48134c5cbd5843596a2a0a2b4004be1881b9b7b197e564bf0dddef:
          acceptance_criteria:
            - "Use the exact pinned source commits for provenance and compose only their authorized source deltas with current C behavior. Preserve C RC09 amended-Plan reader semantics and Recipe additions; do not replace whole files when that would discard C changes. Do not claim N independently approved: its first-dispatch defect must be repaired and this combined change independently reviewed."
            - "After a fresh successful native begin, resolve current authenticated authority context before semantic WorkOrder projection. Preserve the original begun WorkOrder and exact task, Plan, WorkItem, contract, claim, attempt, repository and authority binding. Do not begin twice, dispatch twice, hand-edit a revision/fingerprint, or permit arbitrary stale context."
            - "Keep authority.network allowed only for eligible EXECUTOR/CURATOR implementation with APPROVED current Plan and explicit selected-WorkItem, issued-authority and native-ceiling network_read intersection. Tool classes remain unchanged. Planning/review, missing/narrowed/stale/broad-parent permission and unrelated effects remain denied."
            - "Preserve the complete Z native receipt/event/digest/first-material-amendment proof and all same-definition replay, tamper and authority negatives. Preserve H bounded approved command parsing, timeout/resource/allowlist/credential protections and negative coverage. Add no new scheduler, authority owner, lifecycle route, public schema or arbitrary shell execution."
            - "Use real native lifecycle.begin plus actual advance dispatch, authority resolution and WorkOrder/fingerprint builders to cover authorized first dispatch, narrowed/failed resolution, stale/mismatched context, resume and no duplicate dispatch on replay. Retain N/Z/H existing safety assertions and C Recipe/ordinary behavior. Perform a read-only native C record/authority/projection diagnostic if state permits; otherwise report the exact native boundary without fabricating EXECUTING state."
            - "Preserve all existing 18 WorkItem objectives, criteria, commands, output IDs and completed history. Preserve the eight pending RC16 source files and unrelated baseline artifacts byte-for-byte. Change only the ten enumerated source/test paths. No network or formal lifecycle commands occur in this semantic episode."
            - "Run bounded focused regression, scoped typed lint, typecheck and diff checks sequentially. Rebuild core, recipes and CLI bundles after typecheck. Return source-pin/composition/check evidence; independent EVALUATOR and all original RC16/release qualification remain mandatory."
          objective: "Compose the exact N projection source at 07042de071c826c2e8d23a6659a94f03cae3d205, Z exchange recovery source at c394590a29bf062d654d1dfad9f52e69561ec601, and H declared-check parser/verification source at be77e7f8fcf7dd993d85236368f80914eb999ea8 into the existing C-compatible runtime, using only the enumerated source/test paths. N is explicitly REWORK, not approved: repair its first-dispatch defect by refreshing authenticated native context after successful lifecycle.begin through the existing authority resolver, preserving the original begun WorkOrder and exact binding. Add a genuine first-begin regression through the actual dispatch path. Preserve C Recipe/RC09 behavior and all eight pending RC16 source edits. Import no task metadata, branch history, artifacts, dependency trees or dist bundles. Rebuild this checkout through existing package build owners; do not use runtime symlink substitution."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:fast -- packages/agentplane/src/commands/task/kernel-advance-network.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/kernel-work-order.network.test.ts packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts packages/agentplane/src/commands/task/create-plan-input.test.ts packages/agentplane/src/commands/task/kernel-exchange.test.ts packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --testTimeout=60000 --hookTimeout=60000"
            - "bunx --no-install eslint packages/agentplane/src/commands/task/kernel-work-order.ts packages/agentplane/src/commands/task/kernel-work-order.network.test.ts packages/agentplane/src/commands/task/kernel-exchange.ts packages/agentplane/src/commands/task/kernel-exchange.test.ts packages/agentplane/src/commands/shared/declared-check.ts packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.ts packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts packages/agentplane/src/commands/task/advance-task-step.ts packages/agentplane/src/commands/task/kernel-advance-network.test.ts"
            - "bun run typecheck"
            - "git diff --check"
        sha256:31f0ab3b1d1b753fe245f8f82e76b068f919b423bfe96e230cd7e5b1be0b3905:
          acceptance_criteria:
            - "(1) No scheduler or Blueprint abstraction returned. (2) Closure bytes recoverable. (3) Native/semantic authority boundaries retained. (4) Generated schema/example parity passes."
            - "All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes."
            - "Remove temporary migration bridges no longer needed for supported formats."
            - "Preserve the sole Kernel coordinator, exact approval/result binding, required independent EVALUATOR, and all unchanged safety assertions. Return observed evidence and unresolved release gates honestly."
            - "The repository-local npm cache contains the required locked dependency artifacts obtained through bounded registry reads; installed qualification runs and passes without replacing its acceptance with source-only checks. No package publication, credential change or paid provider call occurs."
          objective: "RC-16: Qualify installed V1/V2 recipes and recovery. Run installed parser/instantiation/specialization/no-match/tamper/removal/offline-restart fixtures. Include custom unsupported V1 conversion and ordinary no-Recipe regression. Inventory current callers and reuse existing owners before edits. Register focused coverage using existing test routing. Scope includes adjacent exports, schemas, fixtures, and build/test wiring required by this bounded contract. Preserve V1 and ordinary no-Recipe behavior. Recover the observed offline-cache blocker by downloading required npm dependency metadata and package bytes from https://registry.npmjs.org into the repository-local npm cache. Use dependency versions and integrity from the existing lockfile, including canonicalize@3.0.0. Do not publish packages, change credentials, run dependency lifecycle scripts during cache preparation, or make paid provider calls. Then run the unchanged installed qualification against the actual packed artifacts; record real failures and require every installed matrix to pass."
          role: "EXECUTOR"
          verification_commands:
            - "bun run package:install-smoke"
            - "bun run schemas:check"
            - "bun run test:release:critical"
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
      -
        command_digest: "sha256:006b0d8906759ee313b0c2e1ff33f89b1a5fbbca95b81611b00a2a4894a8b893"
        id: "sha256:ac84bc54e106fae5b2042c4a9fd4a068b4fb76d9d00f759d10cabb48aaf6392a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ac84bc54e106fae5b2042c4a9fd4a068b4fb76d9d00f759d10cabb48aaf6392a"
        occurred_at: "2026-10-05T12:05:25.238Z"
        payload_digest: "sha256:e515dd67f29fabcc44230f03aaf662b946fef29b3e12a5a456dc58320deb0c60"
        task_id: "202610041748-K43XFE"
        task_revision: 26
      -
        command_digest: "sha256:aa399df1000a42c95275124de164ad863fdd1ba218734c62d724b9811951b00c"
        id: "result:sha256:47f442c10e90fea7fcedbc9e5e7f892ec8261ca0a31b5a7cbea7cf97b67a8655:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:47f442c10e90fea7fcedbc9e5e7f892ec8261ca0a31b5a7cbea7cf97b67a8655"
        occurred_at: "2026-10-05T12:05:45.865Z"
        payload_digest: "sha256:99979d7fb35021c8f89dd8b3270171cc301d881d8ddd5c68e281e5f37b439a7a"
        task_id: "202610041748-K43XFE"
        task_revision: 27
      -
        command_digest: "sha256:e040cc71b7e0cad1ef021f8f6d928ba703c5cbf9562b87016f390b85a8bd51e6"
        id: "kernel_work_item_inspection_required:sha256:795c038967688633b96ab0cb493b7fec962eaa80e5a1ee5dff006145757357a4:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:795c038967688633b96ab0cb493b7fec962eaa80e5a1ee5dff006145757357a4:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
        occurred_at: "2026-10-05T12:06:06.046Z"
        payload_digest: "sha256:23532dbce000d1f0f79e31749079afe2ef833ccc76bde8a0b5d96138f25c1d3e"
        task_id: "202610041748-K43XFE"
        task_revision: 28
      -
        command_digest: "sha256:d4fc021e78def03ee92582f30f0ee13b176316a9976ed5f4db8123c1e34ee29d"
        id: "validation:sha256:4b5eceecd18fee4a226bba6eb842192cf57f48f25ff2d95d6cddd3fac1fb179b:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:4b5eceecd18fee4a226bba6eb842192cf57f48f25ff2d95d6cddd3fac1fb179b"
        occurred_at: "2026-10-05T12:09:03.392Z"
        payload_digest: "sha256:66a6ece8521c99a7d73b972a13c969be2a3d4e7285d31f9668737ea9ccaef195"
        task_id: "202610041748-K43XFE"
        task_revision: 29
      -
        command_digest: "sha256:c37bf83af2af6b92f9f120bf549c88f635430ba35ab05ddc02ef9114e44e4872"
        id: "validation-resolution:sha256:79b09197606f05846e33d9e84bfecf4801e5b469c30d7a7dd7d7d606c892417f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:79b09197606f05846e33d9e84bfecf4801e5b469c30d7a7dd7d7d606c892417f"
        occurred_at: "2026-10-05T12:09:15.638Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202610041748-K43XFE"
        task_revision: 30
      -
        command_digest: "sha256:308b06d732f5c4c9eb1245cb0ebe2693f9f878ee7c1752ce9c3f454adb97ff8d"
        id: "kernel_work_item_rework_claim_required:sha256:1879223a360168217a781dfdd9efb0535767790c8b910ffd397eac4156018388:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:1879223a360168217a781dfdd9efb0535767790c8b910ffd397eac4156018388:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
        occurred_at: "2026-10-05T12:09:37.658Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610041748-K43XFE"
        task_revision: 31
      -
        command_digest: "sha256:4c2b8ee374fc2fb0de987fec9bad80864907089ac3530afc9c03a7021f73c3db"
        id: "kernel_work_item_execution_required:sha256:dd6e48b289a059f56237ecd92f0ab88644934a1ac2361cfe3bdecc6e89a8c6e0:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:dd6e48b289a059f56237ecd92f0ab88644934a1ac2361cfe3bdecc6e89a8c6e0:sha256:699942559db5ffc5e2bf9feabdbee088def0b02e0d96edf3989239e2c33bdbc8"
        occurred_at: "2026-10-05T12:09:55.301Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202610041748-K43XFE"
        task_revision: 32
      -
        command_digest: "sha256:dd79ed268370e1586ccf2374ab35fbdb5f5c464590ace01bf366f5aeb633c1fd"
        id: "sha256:10f3a7f9dfaac7614cf541ea5aa2903c0253f872c255fb9ea9027a42ff007431:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:10f3a7f9dfaac7614cf541ea5aa2903c0253f872c255fb9ea9027a42ff007431"
        occurred_at: "2026-10-05T12:16:07.840Z"
        payload_digest: "sha256:797a4608a5a898fb6c9075f8e924209f716af73cbbb0f52cf8e21122982b5bef"
        task_id: "202610041748-K43XFE"
        task_revision: 33
      -
        command_digest: "sha256:efca8121714174fb4a9f2f00ea2e2f916f2ecae212fd36e39dcbbfbc3b24d7f8"
        id: "result:sha256:955cb0da74eb3033c541614686b4ca8eff3d68eb94675305671ff3ffeb0940e9:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:955cb0da74eb3033c541614686b4ca8eff3d68eb94675305671ff3ffeb0940e9"
        occurred_at: "2026-10-05T12:16:25.632Z"
        payload_digest: "sha256:87a2accfb4af58aade2a14f2665620c69922a481b9343414ff19dcb61ea6f1f6"
        task_id: "202610041748-K43XFE"
        task_revision: 34
      -
        command_digest: "sha256:8cc43d47056db5bfdb055c9b22ba18b670b18b8f4bc9a70ddc2a543e79d9f61a"
        id: "kernel_work_item_inspection_required:sha256:f931fb2cfef6607498ba57626eda38289ce378f90e8f9c3faa2ed59b545adb7b:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f931fb2cfef6607498ba57626eda38289ce378f90e8f9c3faa2ed59b545adb7b:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
        occurred_at: "2026-10-05T12:16:38.571Z"
        payload_digest: "sha256:83321e093d0911e15803219e1bae99ce3af4c42e0b036b7c46cb3b59f6111cef"
        task_id: "202610041748-K43XFE"
        task_revision: 35
      -
        command_digest: "sha256:65f922fe8f82a2d930d69f1ed6ff92262609b670e25d43a7f8347b57cbe735d8"
        id: "validation:sha256:324e35b49968a1a4f92a016b735c26543c757b0952359f33a2bb787fa9d52556:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:324e35b49968a1a4f92a016b735c26543c757b0952359f33a2bb787fa9d52556"
        occurred_at: "2026-10-05T12:18:45.925Z"
        payload_digest: "sha256:5302aff418258f2167efa30adee521154da8f893518e69a04a05729b418af07c"
        task_id: "202610041748-K43XFE"
        task_revision: 36
      -
        command_digest: "sha256:b8e81b7b1fe5d52fb8b1a10c2e0e31643cc5ff3660e8639f21c45dd26b84219b"
        id: "validation-resolution:sha256:d8217a686912a65521969cf70dbce7a90fc3e8f6ecda51bb87d2d3590e1556d0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:d8217a686912a65521969cf70dbce7a90fc3e8f6ecda51bb87d2d3590e1556d0"
        occurred_at: "2026-10-05T12:19:05.997Z"
        payload_digest: "sha256:4b57ae96bbb30b8ddf86b349a9cf7ad9ef25bfaba3a6768eec3e07df7deebdc0"
        task_id: "202610041748-K43XFE"
        task_revision: 37
      -
        command_digest: "sha256:9ac02c95807cf5bb5169568e04db5669b7b2c43a620cbdfcf71de579ad7642e7"
        id: "kernel_work_item_claim_required:sha256:7b9ac56e0d7d0e1b388f77340bdd21414221b917e195bd6e4c81e6356ef29568:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7b9ac56e0d7d0e1b388f77340bdd21414221b917e195bd6e4c81e6356ef29568:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
        occurred_at: "2026-10-05T12:19:40.148Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202610041748-K43XFE"
        task_revision: 38
      -
        command_digest: "sha256:c2edb8a1387b42790b3ddd5b29481e87a2850c81021f120f72c3b50f1d3ab012"
        id: "kernel_work_item_execution_required:sha256:83986cf915ac1790538270a5bc8fae4b5e41938c16e492bf5cd4f2688ed65fad:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:83986cf915ac1790538270a5bc8fae4b5e41938c16e492bf5cd4f2688ed65fad:sha256:cb0000ba294f934f3877c06e327295dc61f434815295ba88d4f63e1047e75d9d"
        occurred_at: "2026-10-05T12:20:03.432Z"
        payload_digest: "sha256:1614312eb58103f4c7640f85f8c8390d8b08424d5dc30404b86eb726e683b1d7"
        task_id: "202610041748-K43XFE"
        task_revision: 39
      -
        command_digest: "sha256:afc0f4a5ffcdf2a227fe4ad2db53d80976aa9053f8c72e0a156f7df7784139c4"
        id: "sha256:a0185ba1521ac60561aa05771bbdf1c96674f90dc41d037ddafea020d9e99c10:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a0185ba1521ac60561aa05771bbdf1c96674f90dc41d037ddafea020d9e99c10"
        occurred_at: "2026-10-05T12:41:11.573Z"
        payload_digest: "sha256:fda43981b458e0d1de8c39f6488ee3131cb7f8bc7b984458be5721f45c6aec37"
        task_id: "202610041748-K43XFE"
        task_revision: 40
      -
        command_digest: "sha256:c4d53ad912168fcc107260772a62963c5881fa856135ca1b031da51a8d8d8bed"
        id: "result:sha256:e324cd26dcf97c2048f20cdf45460e93f75ff7981fe38bec81839a93103556a7:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e324cd26dcf97c2048f20cdf45460e93f75ff7981fe38bec81839a93103556a7"
        occurred_at: "2026-10-05T12:42:03.266Z"
        payload_digest: "sha256:642f59733fce0171f2b5b665877a83d31eab587301e77134de1d68be872efeef"
        task_id: "202610041748-K43XFE"
        task_revision: 41
      -
        command_digest: "sha256:99f5a1a1c11cc4fe1d36d8f7b439637abd193e2cc6b50e4f50e8df01956d24f6"
        id: "kernel_work_item_inspection_required:sha256:5fd9cf8be61dc04ab723afd7fa25b15ff74c66d99697380122fb5773ef1fbf37:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5fd9cf8be61dc04ab723afd7fa25b15ff74c66d99697380122fb5773ef1fbf37:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
        occurred_at: "2026-10-05T12:42:43.595Z"
        payload_digest: "sha256:aec49a4b547a4401da31cfe163dadf2f671fd47179bd7ec6528fad14db98542c"
        task_id: "202610041748-K43XFE"
        task_revision: 42
      -
        command_digest: "sha256:4cfcb9ac7dc710fc0d23719abef5b046bc9d7a88dbd8e1289dbb617c5a31d290"
        id: "validation:sha256:a0dc255ef8c64195e6f05b25cd7c4bb3fb5abfd4943bae1690b5fff2d26d0350:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a0dc255ef8c64195e6f05b25cd7c4bb3fb5abfd4943bae1690b5fff2d26d0350"
        occurred_at: "2026-10-05T12:47:22.593Z"
        payload_digest: "sha256:84742eccbad506398e856fb2956798b37673f7f2b669be68ce5f83c2bbd23826"
        task_id: "202610041748-K43XFE"
        task_revision: 43
      -
        command_digest: "sha256:9951d4ec6597f864e3359b9ee1a15bd0f5d61bbf528785ab7ef27b2889d00162"
        id: "validation-resolution:sha256:aab2674cfb65b6e983f90dcb005bea11d6d827e8ee53b4d45eaa455f508a5b35:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:aab2674cfb65b6e983f90dcb005bea11d6d827e8ee53b4d45eaa455f508a5b35"
        occurred_at: "2026-10-05T12:47:46.495Z"
        payload_digest: "sha256:2b8db6629fc3661083d28fd293ac8310cb672336c3c50ee40666eb183bba0e78"
        task_id: "202610041748-K43XFE"
        task_revision: 44
      -
        command_digest: "sha256:4b7dc9691d2f1eed8b4b423f6f1e6715554b2ed8543fb5d5c84df9f055514775"
        id: "kernel_work_item_claim_required:sha256:111480acb5339cd5c9aa45c1a375362e1f5d0a3452a982611521063d28257897:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:111480acb5339cd5c9aa45c1a375362e1f5d0a3452a982611521063d28257897:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
        occurred_at: "2026-10-05T12:48:26.368Z"
        payload_digest: "sha256:73f5350c84cc96e7810b4cf90409a1512e4a9b7dcf9f0e74d9098c10bb1e7197"
        task_id: "202610041748-K43XFE"
        task_revision: 45
      -
        command_digest: "sha256:9f6d7624a277914a3e8908bc13087eb8f9b881484163d5d09becf089bcb28141"
        id: "kernel_work_item_execution_required:sha256:cd145d1101e4fc465628f2256b3aacb4a43038d645b623438ec1bdf17032d640:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cd145d1101e4fc465628f2256b3aacb4a43038d645b623438ec1bdf17032d640:sha256:b877977ac3b0f6618de052bb9ec8acc7fe36edf7a0270b576372234db8f417d4"
        occurred_at: "2026-10-05T12:48:53.915Z"
        payload_digest: "sha256:3b47a4f72ab7ab9b3cfafc1174f8be60080d50a0014e4b0b04406f5a1b69f16d"
        task_id: "202610041748-K43XFE"
        task_revision: 46
      -
        command_digest: "sha256:a17afb11aa62a4a176a06e59ffe9a6f8995b4c05828b90e6f0afba69c81cd24a"
        id: "sha256:8e80f824554d46bddbe0778e3c0673af5307ae940b06e240e61bbbc5e7d24447:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8e80f824554d46bddbe0778e3c0673af5307ae940b06e240e61bbbc5e7d24447"
        occurred_at: "2026-10-05T13:14:35.471Z"
        payload_digest: "sha256:101b4596fa5bfa51a06ff9862c0d47f43fe1c958c8ba557695921140eebfe0bf"
        task_id: "202610041748-K43XFE"
        task_revision: 47
      -
        command_digest: "sha256:9023dfbeeadad4a8f72a7b94f87709a1bf4b759cfd74456d87f71921948e9783"
        id: "result:sha256:97ddc4f393375bd37cff1e86a29d890eb80900c99b01954cdbf74573c6183836:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:97ddc4f393375bd37cff1e86a29d890eb80900c99b01954cdbf74573c6183836"
        occurred_at: "2026-10-05T13:15:11.143Z"
        payload_digest: "sha256:105e6e11c18441e7e21c04ac90ce094d991854175951602cf9312b619625e71c"
        task_id: "202610041748-K43XFE"
        task_revision: 48
      -
        command_digest: "sha256:fd49567e9811a3e21aaabc094bd6013b241c6d848be289c9a6c09670c5f2481f"
        id: "kernel_work_item_inspection_required:sha256:dc525479c402679e0d2ffece20d1ac4a1e3ca56bb524e1a6708fbefd9c4d4c87:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:dc525479c402679e0d2ffece20d1ac4a1e3ca56bb524e1a6708fbefd9c4d4c87:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
        occurred_at: "2026-10-05T13:16:03.981Z"
        payload_digest: "sha256:a8ab5da46010ff17fa02de04a8b9468b3acd2b6ed9c17e55d3b78a2c8782aa87"
        task_id: "202610041748-K43XFE"
        task_revision: 49
      -
        command_digest: "sha256:bc909c0a9afd51d7b78041eee59ad16ba01cdda22a5b61142cd01a1a3b40ab50"
        id: "validation:sha256:f82a4e1ec05e533c23ab498eb599ad02df60b0dc4094fa29dc3562dbae8c3816:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f82a4e1ec05e533c23ab498eb599ad02df60b0dc4094fa29dc3562dbae8c3816"
        occurred_at: "2026-10-05T13:21:16.820Z"
        payload_digest: "sha256:cb4625b63083317420e175b0d92d04c2080c84fb2eddef708f8dc128ae56870a"
        task_id: "202610041748-K43XFE"
        task_revision: 50
      -
        command_digest: "sha256:05372fd0db30f05b52f8c6c6d97c36936a0b806d0e3ef2f6b46b2e1af0dce2d2"
        id: "validation-resolution:sha256:d90bf4cc1d5db3277fe9ce6bcd0bcb788bd861d80d7e5dbb88afa86a6d20dc70:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:d90bf4cc1d5db3277fe9ce6bcd0bcb788bd861d80d7e5dbb88afa86a6d20dc70"
        occurred_at: "2026-10-05T13:21:31.005Z"
        payload_digest: "sha256:023c3c4aa353c9a91d5e1dc6a053957a44051d661b29b8c78a9c9589791f6fde"
        task_id: "202610041748-K43XFE"
        task_revision: 51
      -
        command_digest: "sha256:be8fe57795eb53954beb68eb6faf7a528a980ef2e0250b99d6996807160542b8"
        id: "kernel_work_item_rework_claim_required:sha256:60b3a38525d8d29d6980f77096c07aa7424a78b1c2dd7d4560226705f95511db:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:60b3a38525d8d29d6980f77096c07aa7424a78b1c2dd7d4560226705f95511db:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
        occurred_at: "2026-10-05T13:21:55.565Z"
        payload_digest: "sha256:b88fe73b96a21b8cd9734beda39a60b9174f6dcc3838ea4cfb914bd024c71e20"
        task_id: "202610041748-K43XFE"
        task_revision: 52
      -
        command_digest: "sha256:9675cb4cadf38ee8e34ee91b2515c2cd8c0caf09b7695a5013bdc770e3a3768e"
        id: "kernel_work_item_execution_required:sha256:195cab7ea0ad169b602435fa8ea02f02f9a64fa9869c90baf42dc29fb4a2f120:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:195cab7ea0ad169b602435fa8ea02f02f9a64fa9869c90baf42dc29fb4a2f120:sha256:030d62fbf2590d012d289641583333bc247da2cb273f1732828f1a7f65ff4060"
        occurred_at: "2026-10-05T13:22:16.169Z"
        payload_digest: "sha256:8cfb7d7a7bab1f0a496322b68afe9e57edc1e5dbd14af67ef3b6dfd2ea0d07e6"
        task_id: "202610041748-K43XFE"
        task_revision: 53
      -
        command_digest: "sha256:94d67a81d3c3edc5394fb7eaece3413049447e0a72a385e25098642fc1b3df25"
        id: "sha256:7c7219c46965e3b8c36705ed881db4d36355292b6ab2321e5c2d81557def4216:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7c7219c46965e3b8c36705ed881db4d36355292b6ab2321e5c2d81557def4216"
        occurred_at: "2026-10-05T13:32:06.499Z"
        payload_digest: "sha256:1e76f5208f119b5c18847abceb86f51357ff8498a3956adc9d7818b9b3961b0e"
        task_id: "202610041748-K43XFE"
        task_revision: 54
      -
        command_digest: "sha256:2513011aa4e9e515510aa119cb8415c8a0fb7f10de31f7e72e83d7522da44ad5"
        id: "result:sha256:f3904f5bc3a2b2b8e8f226d223286877b332b53f7d9af34a47394fd6b05ba01c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:f3904f5bc3a2b2b8e8f226d223286877b332b53f7d9af34a47394fd6b05ba01c"
        occurred_at: "2026-10-05T13:32:48.878Z"
        payload_digest: "sha256:8161abc956d87bcad7fb39e797b65fb3d373cc820669a921aecf0c3bccb734a4"
        task_id: "202610041748-K43XFE"
        task_revision: 55
      -
        command_digest: "sha256:5bd6197bcddfd41a98a49ba0af0d3c06cf0b5d5d07a602e838faa909499d9641"
        id: "kernel_work_item_inspection_required:sha256:6ad61a4b859153f7adb4f5bc43e20829f1e3bafe7a4e82f603d3b56ff8817b94:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:6ad61a4b859153f7adb4f5bc43e20829f1e3bafe7a4e82f603d3b56ff8817b94:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
        occurred_at: "2026-10-05T13:33:24.220Z"
        payload_digest: "sha256:e274569d39b1d1f5dd241564cd92011f0b7d71d10ebfc0456dafef2f8be24e09"
        task_id: "202610041748-K43XFE"
        task_revision: 56
      -
        command_digest: "sha256:77e1f32563410002de3ad19f5a2d86315328b59133a6707e38172ca8c0420c44"
        id: "validation:sha256:faac2ef9c0052fc2150e5e055b10da7c8d7ae10f19d41ffb936d790e21830f5f:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:faac2ef9c0052fc2150e5e055b10da7c8d7ae10f19d41ffb936d790e21830f5f"
        occurred_at: "2026-10-05T13:36:44.032Z"
        payload_digest: "sha256:bdc2af3560a9c14f5ab00b4323251b26ad632a3849c54be552faaae6090f435d"
        task_id: "202610041748-K43XFE"
        task_revision: 57
      -
        command_digest: "sha256:af276d803b06eba3a7f59eac998e9101efe6a655d48ab3ddf1dca754ae489f9b"
        id: "validation-resolution:sha256:1dbf2dce752beb682a73393a523ff935d1921047bb49c042d55e79d629ed2568:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1dbf2dce752beb682a73393a523ff935d1921047bb49c042d55e79d629ed2568"
        occurred_at: "2026-10-05T13:37:01.860Z"
        payload_digest: "sha256:cb51f14fdbfee9efa74e6e7e8d2f01a8ca620b0c2610a28d7952eeb01446b9d9"
        task_id: "202610041748-K43XFE"
        task_revision: 58
      -
        command_digest: "sha256:fe69faccccd17435c091d6e8c275b1c509a24e53d837975d63b08338bbd77be3"
        id: "kernel_work_item_claim_required:sha256:913d0ba5b0a0ff6dd87c1c1ca8c68909cbf6d2520cdde769635d1a19b39df662:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:913d0ba5b0a0ff6dd87c1c1ca8c68909cbf6d2520cdde769635d1a19b39df662:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
        occurred_at: "2026-10-05T13:37:32.691Z"
        payload_digest: "sha256:d5b7e61f92a6ab990035c37b1be8a81831983e46adeaeb195ef1dc1e0df6f932"
        task_id: "202610041748-K43XFE"
        task_revision: 59
      -
        command_digest: "sha256:6bafcc866dd804bca96968d97fc730923fce2c51a09eddf1c9e66d180155860e"
        id: "kernel_work_item_execution_required:sha256:3858c4e2593ca3a5f54616d880dd6a01d6d216912a0f09bb3856c23b64c52b72:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3858c4e2593ca3a5f54616d880dd6a01d6d216912a0f09bb3856c23b64c52b72:sha256:aeece81df1c9068697205a1bfd5e06216aa6428d145523ef84dd8aff61da498f"
        occurred_at: "2026-10-05T13:37:57.878Z"
        payload_digest: "sha256:9f79c6d7022277c85eea828a691b0b9848c36d9e103710ff7ad25cae72beede3"
        task_id: "202610041748-K43XFE"
        task_revision: 60
      -
        command_digest: "sha256:6e8605722945db7296c7801d37973d3f78daae079d89ad84a954770a34a6e526"
        id: "sha256:c5e1a4cb772ac4f4ca5c993a7d273c0a164c25a6ee03ea3e98f6c5ff25f3126c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c5e1a4cb772ac4f4ca5c993a7d273c0a164c25a6ee03ea3e98f6c5ff25f3126c"
        occurred_at: "2026-10-05T13:55:36.977Z"
        payload_digest: "sha256:3d02dd703de827e38466a23529f22ac2314ab9c45bc51fb1ca81a50f6f78687d"
        task_id: "202610041748-K43XFE"
        task_revision: 61
      -
        command_digest: "sha256:8934c94da0ae052f5e45c033f815d4b4ec5db2d2026009ad04f71c2a0565efdc"
        id: "result:sha256:336895a63ccf4852e5ee674d7bac8be33144121caec3fbd8878ef14c7fe253d6:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:336895a63ccf4852e5ee674d7bac8be33144121caec3fbd8878ef14c7fe253d6"
        occurred_at: "2026-10-05T13:55:53.634Z"
        payload_digest: "sha256:14f3a95bb4031c93fda8f8a4710bb39fadca60f36d581a28f8d28496fbd463d3"
        task_id: "202610041748-K43XFE"
        task_revision: 62
      -
        command_digest: "sha256:e4c7c000aa1a02af0bf61f35b987b63bd61d9f0509469e43ac6f9c77a1e8bed5"
        id: "kernel_work_item_inspection_required:sha256:8b06a372c672129726a63f9aee96b76d92da72775ef90613989fdd0e035a78fb:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8b06a372c672129726a63f9aee96b76d92da72775ef90613989fdd0e035a78fb:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
        occurred_at: "2026-10-05T13:56:05.653Z"
        payload_digest: "sha256:257b3d825f9d2b38f2f52032d48050f5fb8ecfc7aaf5b5c7002a6c079d4b28f5"
        task_id: "202610041748-K43XFE"
        task_revision: 63
      -
        command_digest: "sha256:80cdf64abc8fad1a07177a794bb2d5c5c5ceba9326ff162896ef4c3e2266fa2c"
        id: "validation:sha256:a06fae08d140bd805697ed7b941186483a8049586a51dc426b1e518427c02269:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a06fae08d140bd805697ed7b941186483a8049586a51dc426b1e518427c02269"
        occurred_at: "2026-10-05T14:00:04.072Z"
        payload_digest: "sha256:c1ea34c4e91897205975cfc3aa2aad7a46105584c0390e7ad593920b9c413484"
        task_id: "202610041748-K43XFE"
        task_revision: 64
      -
        command_digest: "sha256:802edeaadbfa12e9cb3ee2c1bc76884e556937a821951ec98df5b0b75af429d8"
        id: "validation-resolution:sha256:dcc7d25b5487a603a32d4bd22dad322d0836339a76af083b0a8edf90c3fe60f4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:dcc7d25b5487a603a32d4bd22dad322d0836339a76af083b0a8edf90c3fe60f4"
        occurred_at: "2026-10-05T14:00:10.551Z"
        payload_digest: "sha256:ffa5cac49ed6070664a5e179f0ae02788dc6624ad5b8d5908d6386617af8d0e6"
        task_id: "202610041748-K43XFE"
        task_revision: 65
      -
        command_digest: "sha256:23b0d5b8d4114bc8a18e8d918d5c563248bf4fc1b57511d523c19f69cf3b7d60"
        id: "kernel_work_item_claim_required:sha256:fdb3d1a73c7a6050e1939ec0cddf3e6e42c63dddcd3b753d2c826c05d5bd3280:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:fdb3d1a73c7a6050e1939ec0cddf3e6e42c63dddcd3b753d2c826c05d5bd3280:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
        occurred_at: "2026-10-05T14:00:25.393Z"
        payload_digest: "sha256:ce7670c1a31c14a609ac8512bab0d82941060c20405f355d1a5b9a4722679fc8"
        task_id: "202610041748-K43XFE"
        task_revision: 66
      -
        command_digest: "sha256:62c131cfd1cf3f26b3899347cea163e3fddcd743fd3c1eab0800362c012d5f43"
        id: "kernel_work_item_execution_required:sha256:852e7d7f75486bf8760cb353e28374ced74fca268d11c1808a90056ff22e9981:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:852e7d7f75486bf8760cb353e28374ced74fca268d11c1808a90056ff22e9981:sha256:5538f64eec5b615da222feecfbcecbfac46e272e1b2b37eb40c774de788e7465"
        occurred_at: "2026-10-05T14:00:35.170Z"
        payload_digest: "sha256:782554f23622b30225fdce6a02a58285801a25cec6e0200798d3a6870c8b63c8"
        task_id: "202610041748-K43XFE"
        task_revision: 67
      -
        command_digest: "sha256:12d225c70940bf214db873e5386fd7278846a9c9bdc69caa2098f8638840c976"
        id: "sha256:7828b5378cba2373ead1133ed0913a9023cfb3657dea8c3a9392e2adcc37914b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7828b5378cba2373ead1133ed0913a9023cfb3657dea8c3a9392e2adcc37914b"
        occurred_at: "2026-10-05T14:27:42.193Z"
        payload_digest: "sha256:3e6fe2cf84c17e478e671f9e9c921aab2e37f21b3f7db5041b7487888594f8f6"
        task_id: "202610041748-K43XFE"
        task_revision: 68
      -
        command_digest: "sha256:3f6c01c20eacaebe103d03a69ba409d06d48198c34e7ad85a46ba08007564e15"
        id: "result:sha256:953ba273cc1af4945d8b5a2f645d948527e622b3c1b9cdd2d9c53bc6562f3798:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:953ba273cc1af4945d8b5a2f645d948527e622b3c1b9cdd2d9c53bc6562f3798"
        occurred_at: "2026-10-05T14:27:58.151Z"
        payload_digest: "sha256:b9d6b69b6aa7e050f30809658cccb42eece159a9951a526f7f0abc6eb496f887"
        task_id: "202610041748-K43XFE"
        task_revision: 69
      -
        command_digest: "sha256:22e3b1911f6e2f469164f02ca032c4d5de98d91f3eb52268b4372c6fbb96f1f8"
        id: "kernel_work_item_inspection_required:sha256:dde7abdebd373819c542dcdb44f9af539edd8bd882e2acc041ca58deddadb61c:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:dde7abdebd373819c542dcdb44f9af539edd8bd882e2acc041ca58deddadb61c:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
        occurred_at: "2026-10-05T14:28:10.628Z"
        payload_digest: "sha256:a2da109a8b181cb6be40337d65b7b1c1a58280bbcff3b880a0a3b52ae2157b03"
        task_id: "202610041748-K43XFE"
        task_revision: 70
      -
        command_digest: "sha256:b2576c1dae66b00c7c8acf47c71d464e2a591b215f807532a9ce7aaaca06b04b"
        id: "validation:sha256:9e9e4c2e216bc2da16df63fa8ac8f08959ba9ad78257c843393a0cf5dd126b74:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9e9e4c2e216bc2da16df63fa8ac8f08959ba9ad78257c843393a0cf5dd126b74"
        occurred_at: "2026-10-05T14:32:52.763Z"
        payload_digest: "sha256:cf724d2b2e31f6b97f8c78ead83c203bc8ed4a256f629d58585175910d046256"
        task_id: "202610041748-K43XFE"
        task_revision: 71
      -
        command_digest: "sha256:f070c66c313b9ae8d3ce797564c0dae948ab1aca074d2fb1ee840b05afdeeaac"
        id: "validation-resolution:sha256:f29a2ca1f555942a4346d12b71618ca48cc51ded3dda9974e309ea02e2d84c99:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:f29a2ca1f555942a4346d12b71618ca48cc51ded3dda9974e309ea02e2d84c99"
        occurred_at: "2026-10-05T14:33:00.666Z"
        payload_digest: "sha256:f5b6b49bae26ea3809fe617ed95d8ddeeb3880e1ae8340f7e6d21f5d1bc3f548"
        task_id: "202610041748-K43XFE"
        task_revision: 72
      -
        command_digest: "sha256:3b1c322d84dd358343e8e7254a6bb322857e80325d919038734e4d3acfefaf7e"
        id: "kernel_work_item_claim_required:sha256:1c7d582e676b73f0d21a237a3b406beb1a5677dab4f6ad8e21eccb4bce76034e:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1c7d582e676b73f0d21a237a3b406beb1a5677dab4f6ad8e21eccb4bce76034e:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
        occurred_at: "2026-10-05T14:33:13.729Z"
        payload_digest: "sha256:b5c1e3852767e763689cfdbb3420c7430ee0adbb3f76689f0637445e3fd33ed1"
        task_id: "202610041748-K43XFE"
        task_revision: 73
      -
        command_digest: "sha256:fe38b088d3aed5d6fca81f76149e08e8798f19ae5b7c8b68bc9b2467e9e68359"
        id: "kernel_work_item_execution_required:sha256:e05bfe67737d7dbd5a541682a70013f98eb7132644daa728ee0d9d59ccbaff3a:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:e05bfe67737d7dbd5a541682a70013f98eb7132644daa728ee0d9d59ccbaff3a:sha256:fc1bb92b743b9d4f4fb7686d7a460f06d0cb9f30b8a49177ff3250b09a501c45"
        occurred_at: "2026-10-05T14:33:24.630Z"
        payload_digest: "sha256:e70bb3ef9d7db65312b566644faeaf56ffdc5fdfa0b31c81d8bd968bb3869244"
        task_id: "202610041748-K43XFE"
        task_revision: 74
      -
        command_digest: "sha256:e3d95480d70d4e8319f4021e318a87b868a3954e14b297265b0c14fd049d2ede"
        id: "sha256:94ba3350967b376f65a96f2005c660e81021f5c25a52e7b16b4664034e31e27b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:94ba3350967b376f65a96f2005c660e81021f5c25a52e7b16b4664034e31e27b"
        occurred_at: "2026-10-05T14:55:01.945Z"
        payload_digest: "sha256:f9472df26a002e820e9582ce4856e90fe3ecb46fcd94ce8503f7898230312a93"
        task_id: "202610041748-K43XFE"
        task_revision: 75
      -
        command_digest: "sha256:f43d51229ea36dff9e93ce6c2fb66e1cad580388c085d2b76a3d97bc6feebc94"
        id: "result:sha256:e5a40637f20738f4aadd0aa8f10695e093687c5e042f3852dfb15992162f6538:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e5a40637f20738f4aadd0aa8f10695e093687c5e042f3852dfb15992162f6538"
        occurred_at: "2026-10-05T14:55:17.872Z"
        payload_digest: "sha256:f4229b20e4922d8614b9c710aca16c40abc2113a78097366ed86e55beef4d945"
        task_id: "202610041748-K43XFE"
        task_revision: 76
      -
        command_digest: "sha256:e54cfab450c2792bdcb9d32993965b686f4c9f2e841707e542e23e3bdc80a40b"
        id: "kernel_work_item_inspection_required:sha256:52b185931f6af14e91588e46d9d7caeb3a012f0084398b5951a3fcba39efef42:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:52b185931f6af14e91588e46d9d7caeb3a012f0084398b5951a3fcba39efef42:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
        occurred_at: "2026-10-05T14:55:32.044Z"
        payload_digest: "sha256:84ba2212bc35d3881c24ad5b26a3a1b75e985eb876f5cfe430544d68a123f3df"
        task_id: "202610041748-K43XFE"
        task_revision: 77
      -
        command_digest: "sha256:b62767a1660a16677da9d13eb93555eb143c60502f5b5baf113045d25161120f"
        id: "validation:sha256:af9b9a627e854460690b723c5886fe758e6db8ca78d4ad7e6276a23f540f2948:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:af9b9a627e854460690b723c5886fe758e6db8ca78d4ad7e6276a23f540f2948"
        occurred_at: "2026-10-05T14:58:45.563Z"
        payload_digest: "sha256:00b30ca2344843c5d213d4ed2d73d8dc044281116dc85ee277633d1977fe14e2"
        task_id: "202610041748-K43XFE"
        task_revision: 78
      -
        command_digest: "sha256:a04a619317c4432c050a569f397310f9bd003e8e3d5dd3952be84cf2c825ec92"
        id: "validation-resolution:sha256:2aed5eaf5abd09e4b48dee786b6ab0c73b8d112df122247e4212939dcd5582f0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2aed5eaf5abd09e4b48dee786b6ab0c73b8d112df122247e4212939dcd5582f0"
        occurred_at: "2026-10-05T14:58:53.308Z"
        payload_digest: "sha256:ec9d535941637a80d41295c363d82dd28a32f15be7f44c47d154d97291d3f5ab"
        task_id: "202610041748-K43XFE"
        task_revision: 79
      -
        command_digest: "sha256:dd53e9faed4ab15f79fe34317865302380eda5edb216c9351ba433e1b04ba29e"
        id: "kernel_work_item_claim_required:sha256:dbe88eacf0d325226d56fd735d80fb23eae7ea7faedd13280d6fc782686466d7:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:dbe88eacf0d325226d56fd735d80fb23eae7ea7faedd13280d6fc782686466d7:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
        occurred_at: "2026-10-05T14:59:08.459Z"
        payload_digest: "sha256:6215d74f6748cdb78013a5b43cff756f904381a9068e419c0c650244b31e0a31"
        task_id: "202610041748-K43XFE"
        task_revision: 80
      -
        command_digest: "sha256:81c8ec427d16ebac0efa0d415710c6f0a53ceb6d81fa74685339e59e2f67c720"
        id: "kernel_work_item_execution_required:sha256:462d8e190a856348e269c48b114a0a442470071b7e451f6ea223cfd76c3138e1:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:462d8e190a856348e269c48b114a0a442470071b7e451f6ea223cfd76c3138e1:sha256:558a99d0bbb7677da7507553a2266fa161bcebc094b4c76b993f2173d2403b9b"
        occurred_at: "2026-10-05T14:59:18.855Z"
        payload_digest: "sha256:dcc6e293cbca36ba8665eeedb9b2e3bc5dcce7bf4d7d11f647ac820be2a94d36"
        task_id: "202610041748-K43XFE"
        task_revision: 81
      -
        command_digest: "sha256:05b8fd9b7232c3ceb521cf095dc8fd153ec2cf628e5a09c2c1ab4f96abb9f79e"
        id: "sha256:bf7f1dc544b24428dc8c774fab3b82238fed34d635f270d691d18b9e16a6d1f2:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bf7f1dc544b24428dc8c774fab3b82238fed34d635f270d691d18b9e16a6d1f2"
        occurred_at: "2026-10-05T15:20:13.015Z"
        payload_digest: "sha256:176e27cf3c78f6845bf54826ffe489b101825a919e7477351938ae1b9084a280"
        task_id: "202610041748-K43XFE"
        task_revision: 82
      -
        command_digest: "sha256:bd99d0b8d6623b3be0ed703c165bed724cd25c5728fb166ab8dc5b1be4eaffa4"
        id: "result:sha256:885eb514a4678149115827539b3bac77015ad0d8b320d191e66383be350ba3f2:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:885eb514a4678149115827539b3bac77015ad0d8b320d191e66383be350ba3f2"
        occurred_at: "2026-10-05T15:20:28.818Z"
        payload_digest: "sha256:4fa136d6100b7ce35ab15b82eb8c2013c266fa36f0bc3bfeca5644273f099e4c"
        task_id: "202610041748-K43XFE"
        task_revision: 83
      -
        command_digest: "sha256:26f5130bbfc728566e74b2c0c8cc79651d654044fbee668883bfa1e2d9df9ff5"
        id: "kernel_work_item_inspection_required:sha256:1c3d7471cb29749ad2756c41e94275acebd0cdc10568e0f1068a547a82e490d9:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:1c3d7471cb29749ad2756c41e94275acebd0cdc10568e0f1068a547a82e490d9:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
        occurred_at: "2026-10-05T15:20:42.396Z"
        payload_digest: "sha256:1873970bc4b3fd428cbe6fa0fd824c12e3fdb54b73d35290a057ae3490fe47e8"
        task_id: "202610041748-K43XFE"
        task_revision: 84
      -
        command_digest: "sha256:e386ec6c6a1ba89ad866c14df479b7d0f67a64bb36e7a55db404cc9e5bd6649a"
        id: "validation:sha256:7be97c10d72a8d5ff24aef44fa2663b227deea3d586d414fb3df7cadb9d0e2a7:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7be97c10d72a8d5ff24aef44fa2663b227deea3d586d414fb3df7cadb9d0e2a7"
        occurred_at: "2026-10-05T15:24:30.908Z"
        payload_digest: "sha256:72fa9458e6e907cfbe6a88bf5d0862d88723208ebb5810b5c7f4927234b774fc"
        task_id: "202610041748-K43XFE"
        task_revision: 85
      -
        command_digest: "sha256:7f7d8359f2f0547ca646ae187cba4ab41e0c56cb6b41f3e3955e08943b9adbf2"
        id: "validation-resolution:sha256:93cfbcf0cfdac058a5f311149a47f27ffdf9ebc5730b6f6af4e4bc8c5d6acd82:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:93cfbcf0cfdac058a5f311149a47f27ffdf9ebc5730b6f6af4e4bc8c5d6acd82"
        occurred_at: "2026-10-05T15:24:37.964Z"
        payload_digest: "sha256:8b1477d7662aca618bce3cd6cdb15ee06556cc2b14ef5de93b735f0d15a1c124"
        task_id: "202610041748-K43XFE"
        task_revision: 86
      -
        command_digest: "sha256:4412889dcdfaf7c7a41e2c5eafbba778163cf382a4e85d615bd5244ba1a6a1d5"
        id: "kernel_work_item_claim_required:sha256:c0fba8e236aa9797b5040bc82784dff13f86701b5a94fc45be1afb9184cf4f86:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:c0fba8e236aa9797b5040bc82784dff13f86701b5a94fc45be1afb9184cf4f86:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
        occurred_at: "2026-10-05T15:24:51.748Z"
        payload_digest: "sha256:4f3df77266f934b24b193531155a64508a7fc429b27ff90171895cb2c26bef7e"
        task_id: "202610041748-K43XFE"
        task_revision: 87
      -
        command_digest: "sha256:13c28246060840aa29348540cd6fd02e8eb457eaa45d56b33828f6b77a9e0101"
        id: "kernel_work_item_execution_required:sha256:7284dab30128aaf164ab2e80a4c16bf4ee91335a13a173558ec71d62f3dbb540:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7284dab30128aaf164ab2e80a4c16bf4ee91335a13a173558ec71d62f3dbb540:sha256:c8d85898becb618b23576f3d5538d9fb71c067bb8dfc4fcf39885ee67b854e75"
        occurred_at: "2026-10-05T15:25:03.453Z"
        payload_digest: "sha256:30ca3bbd354da8c0c40dd959b0b9f1910cffdfd5fd74501f0cd06e7667150382"
        task_id: "202610041748-K43XFE"
        task_revision: 88
      -
        command_digest: "sha256:b32a5a53e52465ac31c46c1ae4d9a5c75a04b5a753394540f9c022274908237c"
        id: "sha256:9860ef2f2718fc01b32163885e11657a07a2485e69880a30e17c1eddf4981270:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:9860ef2f2718fc01b32163885e11657a07a2485e69880a30e17c1eddf4981270"
        occurred_at: "2026-10-05T15:56:01.653Z"
        payload_digest: "sha256:555ae53718b185ab672d3ea07e1b7786fc02201003933069e195282aa2be3ec5"
        task_id: "202610041748-K43XFE"
        task_revision: 89
      -
        command_digest: "sha256:1f1838de72a62b10716087cdf5ce15728f3089acbacd32713c33af15fe3417ca"
        id: "result:sha256:a02412d182332b66acaa372abccd74cb264b3fc50e77ff281442ad5a5926d155:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a02412d182332b66acaa372abccd74cb264b3fc50e77ff281442ad5a5926d155"
        occurred_at: "2026-10-05T15:56:43.783Z"
        payload_digest: "sha256:3b2823f56aff3a3f30fce0d49ffaf8a33031d2d2e7f260e5d047c245918cce45"
        task_id: "202610041748-K43XFE"
        task_revision: 90
      -
        command_digest: "sha256:920b116634a130975e270f8e80dfbbc0326b349322ff0e6539e0e959cdbe04a3"
        id: "kernel_work_item_inspection_required:sha256:ba9e873480f75c48d445b0ce1e5f630a704c0d94b7a8f1a112a6ebea25cb45d4:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:ba9e873480f75c48d445b0ce1e5f630a704c0d94b7a8f1a112a6ebea25cb45d4:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
        occurred_at: "2026-10-05T15:57:11.254Z"
        payload_digest: "sha256:3e47fbd0a34294b5fe8c4dd7744b0c51d40d91cbc982dd99f689f7cffdb80694"
        task_id: "202610041748-K43XFE"
        task_revision: 91
      -
        command_digest: "sha256:2404abaf4c585578ce1d18f6d0a8719c32a48556fd5aad5b6ecd59768eb35c80"
        id: "validation:sha256:e19ab9ccb9d1b5a4d8950e37ffef5fc2761fce89301ccbbcda96c75dcb237c40:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e19ab9ccb9d1b5a4d8950e37ffef5fc2761fce89301ccbbcda96c75dcb237c40"
        occurred_at: "2026-10-05T16:04:17.376Z"
        payload_digest: "sha256:2176720f911b69500f6e77385515d6ecd91c334c4dd4d3b368635c66a7572794"
        task_id: "202610041748-K43XFE"
        task_revision: 92
      -
        command_digest: "sha256:fa4ee8750cbcc55e8605a6031afe379b22feb986fa12f0a68169b7d3ecaea3d5"
        id: "validation-resolution:sha256:c333de2e895e935ac17a54d140963845fb76443075f5995541958c8c45963146:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:c333de2e895e935ac17a54d140963845fb76443075f5995541958c8c45963146"
        occurred_at: "2026-10-05T16:04:36.879Z"
        payload_digest: "sha256:b0e6d57774c6a72887b3b7faa0142d54511b1ca5129ca41b9339224c5362cc09"
        task_id: "202610041748-K43XFE"
        task_revision: 93
      -
        command_digest: "sha256:68b6eb25b299fd5559077b7365010938f28b13df236810304131ab231ce73613"
        id: "kernel_work_item_claim_required:sha256:65aca806f1a2528a32e9fd4687cabbfa120844c66818b5cc37deded95413c726:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:65aca806f1a2528a32e9fd4687cabbfa120844c66818b5cc37deded95413c726:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
        occurred_at: "2026-10-05T16:05:10.083Z"
        payload_digest: "sha256:9f00fc8396f26cf701bc05e46c51d41881db60a25b107432715eb5f701a1f325"
        task_id: "202610041748-K43XFE"
        task_revision: 94
      -
        command_digest: "sha256:68f59cec1713291072f70f5c6fcb1ba9d1996ef2e45c280902fa7c9edf461580"
        id: "kernel_work_item_execution_required:sha256:aa073b7b0fd35f580d7479476755e6f22a9d9d8366c5da9f6a27ad7c850e011e:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:aa073b7b0fd35f580d7479476755e6f22a9d9d8366c5da9f6a27ad7c850e011e:sha256:1dd612532411991769c111fb2144011cd1d68293eba6983027d3b480ebe7569b"
        occurred_at: "2026-10-05T16:05:44.941Z"
        payload_digest: "sha256:7859991db4d99cb7be9a6505540c65b3d8dbf4c6b5c6081df01223962f3e42a5"
        task_id: "202610041748-K43XFE"
        task_revision: 95
      -
        command_digest: "sha256:c9ead02526d9a30c06f3960662bb3130dec46e9f150cd590889a35ed2a9ed50d"
        id: "sha256:a08934d1a69840c684f0499e872607011645eb78f35fff7aef645abc5254afa1:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a08934d1a69840c684f0499e872607011645eb78f35fff7aef645abc5254afa1"
        occurred_at: "2026-10-05T16:51:42.957Z"
        payload_digest: "sha256:5898e6f70c86fa46805c1259a83e3e584a59a800c3a18bc29554626924edfa7b"
        task_id: "202610041748-K43XFE"
        task_revision: 96
      -
        command_digest: "sha256:d9cf157c5fb901b29b8d3fdd4adb7a8c3b8d6d373da50cff247311f842f5acec"
        id: "result:sha256:f8f351cd4ce6b9fb749481881bff25d2d8dab57faaa4516f1da7ca39e41ba4f1:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:f8f351cd4ce6b9fb749481881bff25d2d8dab57faaa4516f1da7ca39e41ba4f1"
        occurred_at: "2026-10-05T16:52:05.790Z"
        payload_digest: "sha256:1bd627c9c5749ea3d91d9f201cbc7f6e1b54ee35c9bd62560f2ba7f305c843e9"
        task_id: "202610041748-K43XFE"
        task_revision: 97
      -
        command_digest: "sha256:c2259e580b0b5d65d95a6082805d9bb6140333c453f22139e3c14ba5178b1d10"
        id: "kernel_work_item_inspection_required:sha256:9a2398b27a972b5ff7c5ef9c52c876e0ee2047774807e65d60111438605f0946:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:9a2398b27a972b5ff7c5ef9c52c876e0ee2047774807e65d60111438605f0946:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
        occurred_at: "2026-10-05T16:52:20.549Z"
        payload_digest: "sha256:c1e023812a14084522bc5c53b1a2b370d1957d72cd4744f3e50062e785d008c6"
        task_id: "202610041748-K43XFE"
        task_revision: 98
      -
        command_digest: "sha256:a68861c8c663359d59a8efb72ec04082935b7a9a15a82552bd0e04af1c716949"
        id: "validation:sha256:07f5a99e49ea45232dd4b04986a26331258a6b14e0663bcc49469649bf71f293:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:07f5a99e49ea45232dd4b04986a26331258a6b14e0663bcc49469649bf71f293"
        occurred_at: "2026-10-05T16:54:46.064Z"
        payload_digest: "sha256:c2148b9395ee4e1ccde01bf74e5d0255a32cbc4e8ffdf3c2338d9939ddaddd62"
        task_id: "202610041748-K43XFE"
        task_revision: 99
      -
        command_digest: "sha256:4e71ce70ebdf6a7364e7c49a9a60f0286bccf42d56196f6fea53f7a57eae229a"
        id: "validation-resolution:sha256:daeb5c39b34290a6cd94e15c12df737e52f92f011a6c091387b84c4b227a52eb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:daeb5c39b34290a6cd94e15c12df737e52f92f011a6c091387b84c4b227a52eb"
        occurred_at: "2026-10-05T16:55:00.293Z"
        payload_digest: "sha256:1e547aa6b661ef9d55ff2f0a7a42d8420194cca00bc643e46a97178f2340c6a0"
        task_id: "202610041748-K43XFE"
        task_revision: 100
      -
        command_digest: "sha256:e130fadad27f459c3f4a310818763d945637f3f256543b0ca679f2c689f3a69c"
        id: "kernel_work_item_claim_required:sha256:eae55e3dc897945d6c4ee443cee3890537ba9b9c8e18914dd67343f0e5b6e744:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:eae55e3dc897945d6c4ee443cee3890537ba9b9c8e18914dd67343f0e5b6e744:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
        occurred_at: "2026-10-05T16:55:19.618Z"
        payload_digest: "sha256:0080b27b6c554256594f9d42c304ccbb4ef14ca92c26e4913bdc31c3fafcf850"
        task_id: "202610041748-K43XFE"
        task_revision: 101
      -
        command_digest: "sha256:658164b8c0bafda439b3112aea17fb6d39611303b73ae1f1d690ec685dab4588"
        id: "kernel_work_item_execution_required:sha256:0ef1bddcf024f2d7a0a23d5aa6fa4bcb55feebe091eadcd677b52bccb8d13beb:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0ef1bddcf024f2d7a0a23d5aa6fa4bcb55feebe091eadcd677b52bccb8d13beb:sha256:fd22d1dbda114a80541c36888b67554ccbf492ada7eadb9183a1bfdceaa3b813"
        occurred_at: "2026-10-05T16:55:29.693Z"
        payload_digest: "sha256:cf8a2148b487a801169bfda2cd8b476040c7b342abe7ac306f09228427ddcdc3"
        task_id: "202610041748-K43XFE"
        task_revision: 102
      -
        command_digest: "sha256:834c6732739b346c602abab07bbe1fa7f78cfd359578d003356d26e1ca7c76db"
        id: "sha256:dc2910c94a011f34152772cff5e8fd0e339b63d12442c70c540d4eae74e9ed0c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:dc2910c94a011f34152772cff5e8fd0e339b63d12442c70c540d4eae74e9ed0c"
        occurred_at: "2026-10-05T17:12:57.466Z"
        payload_digest: "sha256:44c1dcde910cd469c3f5832737908f84b135387d950f75205ae87576bc3960be"
        task_id: "202610041748-K43XFE"
        task_revision: 103
      -
        command_digest: "sha256:45ef626be300b7edcb433fef98eef4ce14b78e8870d1614921d582dc878ed58a"
        id: "result:sha256:bf82ff5182d8bdfa3d609f2bc955a524c7c68d27a2c82f20d74f9388f8660122:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:bf82ff5182d8bdfa3d609f2bc955a524c7c68d27a2c82f20d74f9388f8660122"
        occurred_at: "2026-10-05T17:13:14.073Z"
        payload_digest: "sha256:c12ab11373266d7437f9ed3127f41ec2e83b15f02a8e5e7169c4825577b57fd5"
        task_id: "202610041748-K43XFE"
        task_revision: 104
      -
        command_digest: "sha256:6c00afa6d43b6a6ef21cb8c1de4947acf879d023e2a0d0690eab8c16773b70d6"
        id: "kernel_work_item_inspection_required:sha256:44f310b1c4bc3267bba8637168ebc7cd05288d487604e76d813aff46ee88170b:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:44f310b1c4bc3267bba8637168ebc7cd05288d487604e76d813aff46ee88170b:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
        occurred_at: "2026-10-05T17:13:25.602Z"
        payload_digest: "sha256:f90873b78923c6f8fb285d1df1545b42313cb26b86edf2bf6daeefb889dec8d3"
        task_id: "202610041748-K43XFE"
        task_revision: 105
      -
        command_digest: "sha256:7c57414b3dbb4f8bc0f014ea86f7e418e44ea0f6118d43ad8c58f921da9f29ab"
        id: "validation:sha256:38b36844fc21a272480c8a8de545d1fc718ebd69fbedb064e96e8d60c7852fb7:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:38b36844fc21a272480c8a8de545d1fc718ebd69fbedb064e96e8d60c7852fb7"
        occurred_at: "2026-10-05T17:16:44.856Z"
        payload_digest: "sha256:cc84722fba25e42a619746cf0eb158e5ccc2322f0daefaee4b3345d064cd4e53"
        task_id: "202610041748-K43XFE"
        task_revision: 106
      -
        command_digest: "sha256:a716193a10cf3a393fb83fd4d550fcfbdb3d4107ab437efc0a23954ef32a63e9"
        id: "validation-resolution:sha256:b9cac4e7b425fac137c6b2fa938aa208437a843265678485b86a5c17b6cf0a4a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b9cac4e7b425fac137c6b2fa938aa208437a843265678485b86a5c17b6cf0a4a"
        occurred_at: "2026-10-05T17:16:52.307Z"
        payload_digest: "sha256:11c8949fcd2259f50d73a372aee32b83b279bf01370d592ec3b4c0be99cc4c0d"
        task_id: "202610041748-K43XFE"
        task_revision: 107
      -
        command_digest: "sha256:abaf1a52a327f0993671cdf038bac302efda81563ed03654eb1eaa26168ac642"
        id: "kernel_work_item_claim_required:sha256:6f825e640b9418a3da6261eb9d71884ae52362843a5101dc8434117b911df532:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6f825e640b9418a3da6261eb9d71884ae52362843a5101dc8434117b911df532:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
        occurred_at: "2026-10-05T17:17:06.815Z"
        payload_digest: "sha256:a805bf485a89265d0c1e08fa5673eef24be0cbe980f21f722e11f693acf9be9d"
        task_id: "202610041748-K43XFE"
        task_revision: 108
      -
        command_digest: "sha256:5e2a9007856df0897a3efb1d045ae6743358824b792d1b91508d01e52e30e240"
        id: "kernel_work_item_execution_required:sha256:6ac2ced714d1ac5cd77b9efb6e2ec7aad5c80b09a90cbc446b6f9fb62c785ead:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6ac2ced714d1ac5cd77b9efb6e2ec7aad5c80b09a90cbc446b6f9fb62c785ead:sha256:fb9d804fb989f29285bbb506f40a11dc51d49dc3cfc987f3c3cd871fa5ae7554"
        occurred_at: "2026-10-05T17:17:18.088Z"
        payload_digest: "sha256:3851855c5395fc491e39ebf228e6ae6555dcdae6c264ebc886d12c525812fbb8"
        task_id: "202610041748-K43XFE"
        task_revision: 109
      -
        command_digest: "sha256:87b5bc0d42a8dd8b400749b97daa71e98882679e5b00ee85d80eef59c2ca620a"
        id: "sha256:51c3de9f4195ab55f87912a240e36b478ab3905f8f20aa79cc971e59819328a8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:51c3de9f4195ab55f87912a240e36b478ab3905f8f20aa79cc971e59819328a8"
        occurred_at: "2026-10-05T17:51:42.717Z"
        payload_digest: "sha256:1b7f16b70bb00d659551dad98cecd6fd9b17b234b94a6a63027d8ebb4178297f"
        task_id: "202610041748-K43XFE"
        task_revision: 110
      -
        command_digest: "sha256:a0998c27c39f0677833df02c4250deeef7863bb8c0932ebea98b10be99ed7a6c"
        id: "result:sha256:5c341ab3c5e199c5e034e1f1ec296222d495c17292ae4c6f14e4f59f8e549ecb:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:5c341ab3c5e199c5e034e1f1ec296222d495c17292ae4c6f14e4f59f8e549ecb"
        occurred_at: "2026-10-05T17:52:05.192Z"
        payload_digest: "sha256:c5b14215832f5bc0c4870f9229c3388c02928cf9c56e23ff3ca893b86a16b0c9"
        task_id: "202610041748-K43XFE"
        task_revision: 111
      -
        command_digest: "sha256:ec85c54917b73c9a55c257b7191bec7a7322e5373c331ce19ce6f5177e46bde7"
        id: "kernel_work_item_inspection_required:sha256:bbaa335e6ca702d45c9c89f11d1b0ad7eaaccb7c0de0db8886ca2a210dd34515:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:bbaa335e6ca702d45c9c89f11d1b0ad7eaaccb7c0de0db8886ca2a210dd34515:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
        occurred_at: "2026-10-05T17:52:30.638Z"
        payload_digest: "sha256:98513aa62999b2e9d508dfdafeefa02866ae2873079190fb6c3b8deb4fb5b20c"
        task_id: "202610041748-K43XFE"
        task_revision: 112
      -
        command_digest: "sha256:58db2291f9dc54ae8ee55a323c2a8a565d42ead74e08d5f3dde06a2f9f9e870f"
        id: "validation:sha256:27bb97c3ee1f750ce4b603b8deee421c2eb35730afc5e610482b994542a1a493:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:27bb97c3ee1f750ce4b603b8deee421c2eb35730afc5e610482b994542a1a493"
        occurred_at: "2026-10-05T17:59:06.605Z"
        payload_digest: "sha256:fdcc990c637ca9189ee6667d2a5d1d86f31017b8fb3891fb63dae1c1bf18901c"
        task_id: "202610041748-K43XFE"
        task_revision: 113
      -
        command_digest: "sha256:6672c4418352f8544aad3bb51b66830bbd3697e72d7c8ff56fa1358654c0d904"
        id: "validation-resolution:sha256:45fea4add5ea2c48c2b03a2eb0812dcec2598f9badf30914fd69383b82c85e13:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:45fea4add5ea2c48c2b03a2eb0812dcec2598f9badf30914fd69383b82c85e13"
        occurred_at: "2026-10-05T17:59:19.060Z"
        payload_digest: "sha256:93980568165c5ff01397fc7d3b08a1d62457a45afe7f5b9fca0b9f37ec709067"
        task_id: "202610041748-K43XFE"
        task_revision: 114
      -
        command_digest: "sha256:3ce3722eb988d6e5f2fddd00c4d0a3f9a1a134ba8a200808429701b4557823da"
        id: "kernel_work_item_rework_claim_required:sha256:7203fa0ecb50ab00e2c56cbba243ef95e0f7a2297dc34c18a255bdd9f5c73498:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:7203fa0ecb50ab00e2c56cbba243ef95e0f7a2297dc34c18a255bdd9f5c73498:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
        occurred_at: "2026-10-05T17:59:40.994Z"
        payload_digest: "sha256:0167921e0e206b3b0703f5f883c941a06585f61a4c15e2bbcf3b3b0e910e2262"
        task_id: "202610041748-K43XFE"
        task_revision: 115
      -
        command_digest: "sha256:178d0125059f727ad45c9f925843fdf0ece3cb5c8d6630a73266da14a3db6747"
        id: "kernel_work_item_execution_required:sha256:bb4f854ebc5c6ed88f8021e953bfd8377700c7a53ada90619e2c6a82c4617670:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bb4f854ebc5c6ed88f8021e953bfd8377700c7a53ada90619e2c6a82c4617670:sha256:77f9e6d45a9b06a526f2010306549ff9f9b9df9932f9b05aae17270830136ed7"
        occurred_at: "2026-10-05T17:59:57.780Z"
        payload_digest: "sha256:8581a42fe8c5ffcb8dca4e68bf3cae82a019c8652ca998c65d888759c576848d"
        task_id: "202610041748-K43XFE"
        task_revision: 116
      -
        command_digest: "sha256:4d48fb102afdd50ac451f6878fbba4cf4653dbae195925fdedac95f444b49762"
        id: "sha256:0366e12c3cb24b4824c08fe25c217937d4d18016da734cea9a60ec532983d162:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:0366e12c3cb24b4824c08fe25c217937d4d18016da734cea9a60ec532983d162"
        occurred_at: "2026-10-05T18:12:39.352Z"
        payload_digest: "sha256:c502f850a820a30601875ad06d014720905134cd7211373b8495f4434377c4aa"
        task_id: "202610041748-K43XFE"
        task_revision: 117
      -
        command_digest: "sha256:e543ef3a79908c4bbe3b332b339e64f5e0e66c896afa6d0e9dbc1e9603c2f920"
        id: "result:sha256:42107c42742cb7a569013de8c12d23200788ae3c0645c686556b791667e24a16:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:42107c42742cb7a569013de8c12d23200788ae3c0645c686556b791667e24a16"
        occurred_at: "2026-10-05T18:12:57.258Z"
        payload_digest: "sha256:2629a5236acc3ea60c57cc224306ce4c17e0f2daa61afa9c3bd78a4939374a30"
        task_id: "202610041748-K43XFE"
        task_revision: 118
      -
        command_digest: "sha256:269224df2fd07f3917ce9a43fdea7d8df21a531333e2f53422fdcb6433043830"
        id: "kernel_work_item_inspection_required:sha256:0d63b7fc9a63dfc79e0053197391eb3fd29da49c3cf7b6ea4049f67a5946b92a:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:0d63b7fc9a63dfc79e0053197391eb3fd29da49c3cf7b6ea4049f67a5946b92a:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
        occurred_at: "2026-10-05T18:13:10.798Z"
        payload_digest: "sha256:d145af5a3e5b31fbf19f823c883e193ab7f22c77bf91645d2cc16d40655dfaed"
        task_id: "202610041748-K43XFE"
        task_revision: 119
      -
        command_digest: "sha256:619b658f18e1d7d0e8b6de56b63be30d1645d287ae43c4a1dc17d37624744d93"
        id: "validation:sha256:0c8da65db6cdb9df32f1f2169fad48ab060bdaa9def43376532075302977836d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:0c8da65db6cdb9df32f1f2169fad48ab060bdaa9def43376532075302977836d"
        occurred_at: "2026-10-05T18:17:21.194Z"
        payload_digest: "sha256:aace2c5f8734dbc8df4249a561cff9909a18bb3a1abf939ae59308a8994e1d83"
        task_id: "202610041748-K43XFE"
        task_revision: 120
      -
        command_digest: "sha256:901fd3a80fc6aedb4ca40638d99b80846c9c676f5e599ead5867530257a35af7"
        id: "validation-resolution:sha256:985da69c46981ecd4449a6eeb585274e3d450dd590468ace89af102d7cd40c4a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:985da69c46981ecd4449a6eeb585274e3d450dd590468ace89af102d7cd40c4a"
        occurred_at: "2026-10-05T18:17:31.247Z"
        payload_digest: "sha256:3e0ef55ae51b33c5f036a78c54789da9018bd0ec65056a7b495697e2c73a1a6a"
        task_id: "202610041748-K43XFE"
        task_revision: 121
      -
        command_digest: "sha256:c5f41d870df2a7a4e5cfb78ae2c9e2d11b9cc8ae28d8f47117d9388129910549"
        id: "kernel_work_item_claim_required:sha256:403df9e537ce71a8a0c8e97101310b54342f730890143601b36ad27a8cfdbd05:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:403df9e537ce71a8a0c8e97101310b54342f730890143601b36ad27a8cfdbd05:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
        occurred_at: "2026-10-05T18:18:00.984Z"
        payload_digest: "sha256:b19362f20da48fba6564b68e03af1aec6d34edebc3114ddfd48c93a3ab2b1273"
        task_id: "202610041748-K43XFE"
        task_revision: 122
      -
        command_digest: "sha256:32520621933fc7603ebc0d692d07f198cb3c8380ac341e714630c9def3048854"
        id: "kernel_work_item_execution_required:sha256:34c61068744cdd19d7b036e765706563b0dc7cf1a5e8374db1297885fe18f347:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:34c61068744cdd19d7b036e765706563b0dc7cf1a5e8374db1297885fe18f347:sha256:7017bb73e8c60074c83af35017d5d0f1ccae10a08f4fa9c2d600c3bc3b2f10a8"
        occurred_at: "2026-10-05T18:18:20.300Z"
        payload_digest: "sha256:8fe3670303f97206f02ff7fd1c5a264795a96af7bd922115757cc961d803c71d"
        task_id: "202610041748-K43XFE"
        task_revision: 123
      -
        command_digest: "sha256:17b7a2a9e31932b07fed01ff65e7c3f156c9acbd2e93c70091227598116b10a2"
        id: "sha256:d1508eca6718cbca5a73644fae9fe7d3f93612d83e4fed3ed1f26cdd75068404:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d1508eca6718cbca5a73644fae9fe7d3f93612d83e4fed3ed1f26cdd75068404"
        occurred_at: "2026-10-05T18:51:36.640Z"
        payload_digest: "sha256:741be3356debc3f39ff35bc9d7696585f6d0022ecfa94bc7f1ae258f10a6f06a"
        task_id: "202610041748-K43XFE"
        task_revision: 124
      -
        command_digest: "sha256:752fd02c8014ed57dd3f4c860db266ff7d85e2c5b20da1ef82006c5bc83347df"
        id: "result:sha256:5e03ec2a77d4b202c0ce7aefba3ff298f6057ef1ef9ec44e6948d4b686e88a30:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:5e03ec2a77d4b202c0ce7aefba3ff298f6057ef1ef9ec44e6948d4b686e88a30"
        occurred_at: "2026-10-05T18:52:06.639Z"
        payload_digest: "sha256:9159949f61f40843968800b2518b2c3c169a203faa3407c4124e203e99bef9ff"
        task_id: "202610041748-K43XFE"
        task_revision: 125
      -
        command_digest: "sha256:3b4af26d719bf7431565ddf0cd3e0bc6fe617dd2822d30bbc83c7ba330cbb24e"
        id: "kernel_work_item_inspection_required:sha256:f1c00fadf3e429b509cdb095bf3a6ded03a725a58313b0809b03919b8e15d9ba:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f1c00fadf3e429b509cdb095bf3a6ded03a725a58313b0809b03919b8e15d9ba:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
        occurred_at: "2026-10-05T18:52:37.044Z"
        payload_digest: "sha256:8840d0c9718d1dc4c43dfaae2a6b3f28c64b892d32894cacd67b6e182b362177"
        task_id: "202610041748-K43XFE"
        task_revision: 126
      -
        command_digest: "sha256:e23712a855427d16db33b71870175e0b87bd8e9c7c4e4c6d4f322e5822e54edd"
        id: "validation:sha256:19b6a471845cc1622508adbdbe6b61a9606ab3f363ed9cc13c2f0769db455bd9:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:19b6a471845cc1622508adbdbe6b61a9606ab3f363ed9cc13c2f0769db455bd9"
        occurred_at: "2026-10-05T18:58:40.627Z"
        payload_digest: "sha256:2e33ff61ad4d26a3ba70edcf599708a0905211b1b68debca2d823c0baa4b79a8"
        task_id: "202610041748-K43XFE"
        task_revision: 127
      -
        command_digest: "sha256:8cd57c252235953c7a701f2828930e46b9b6b7e49bee507abce4cc030941e8d1"
        id: "validation-resolution:sha256:417439130a922052e368ec743902ce344af5baa523f6f2b992371293622c4083:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:417439130a922052e368ec743902ce344af5baa523f6f2b992371293622c4083"
        occurred_at: "2026-10-05T18:59:02.922Z"
        payload_digest: "sha256:4aa106f41f2af85ad0c54b7fa658b91076a68f311230cc8769ebb199b5fafab0"
        task_id: "202610041748-K43XFE"
        task_revision: 128
      -
        command_digest: "sha256:88a48b2bc1a50baff93d26396efb6ef1e14f460d6d68da36d03b31c1759d8cd2"
        id: "kernel_work_item_claim_required:sha256:6ed6d8bf5b4b20f3982424e4ee0237f40d73f787e96498f2aa5cdb8e71e4071a:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6ed6d8bf5b4b20f3982424e4ee0237f40d73f787e96498f2aa5cdb8e71e4071a:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
        occurred_at: "2026-10-05T18:59:34.718Z"
        payload_digest: "sha256:53311d5d94566a3188f8f217f2c552a5d5d850d84c6afeb99cc9edb648d32bec"
        task_id: "202610041748-K43XFE"
        task_revision: 129
      -
        command_digest: "sha256:33b05670827ca8b755f440c5e48f7df2944020de5dedd89628d5cfb7d02ff2f9"
        id: "kernel_work_item_execution_required:sha256:b385dd83541a6421a95d60b9d28f5d81799fe666454317322fe93807c5302d7b:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b385dd83541a6421a95d60b9d28f5d81799fe666454317322fe93807c5302d7b:sha256:d9b630febb4d1524555b900f65dc294b35c4e2da4585f87324a9fb2153a5a143"
        occurred_at: "2026-10-05T19:00:07.631Z"
        payload_digest: "sha256:56611d1de70f1484300eca84ec2097f03bbdbd0752c5fdde82a330fce266d195"
        task_id: "202610041748-K43XFE"
        task_revision: 130
      -
        command_digest: "sha256:8c520d4caf4ea1d49bd1b4e47771ece86731867a481cf27e53d2d71824363008"
        id: "sha256:d79a5f231a5d5c47d060f8bbc63ee526d45e9020285ab2293615369a55e7890c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d79a5f231a5d5c47d060f8bbc63ee526d45e9020285ab2293615369a55e7890c"
        occurred_at: "2026-10-05T19:18:19.133Z"
        payload_digest: "sha256:74f23e90b58ac2055a1c071372c9e2972e8874efe515f9e83189900f1d12c64b"
        task_id: "202610041748-K43XFE"
        task_revision: 131
      -
        command_digest: "sha256:b6478c4924213318bd90f61ee48c3c6e592f3f625843ea629d9b912ae74ac8a7"
        id: "result:sha256:b07f55d125c62af367ff4ba5994bfb474719b6c3a47d336be57b58edf9ee1fd0:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b07f55d125c62af367ff4ba5994bfb474719b6c3a47d336be57b58edf9ee1fd0"
        occurred_at: "2026-10-05T19:18:42.902Z"
        payload_digest: "sha256:c11a6be88fab5433b2bd9cdf0c84f69e2cd2e86a08c45ee8fe022f50a034d130"
        task_id: "202610041748-K43XFE"
        task_revision: 132
      -
        command_digest: "sha256:9b5012005ee8257fb7538206d075b7344c9a97d5a9e7f9e2031f45c59eaa569b"
        id: "kernel_work_item_inspection_required:sha256:0224d5f84148ce2d8bb8d6a7e47d950c1c3dda69dfc06d2a1508690a09352d30:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:0224d5f84148ce2d8bb8d6a7e47d950c1c3dda69dfc06d2a1508690a09352d30:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        occurred_at: "2026-10-05T19:19:03.458Z"
        payload_digest: "sha256:15251e60979dc8cf26c80975b9c103fc40b251392a833c66b9a56c7860ac2d56"
        task_id: "202610041748-K43XFE"
        task_revision: 133
      -
        command_digest: "sha256:4fdff265f7372d4b9aa8095a88931bc7f4be2dde740c96208fc4f2a39dcdee16"
        id: "validation:sha256:0f5a80140ae2dbe532fc1489d72f9a171b04ce73df32fb805d90e8be0a325291:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:0f5a80140ae2dbe532fc1489d72f9a171b04ce73df32fb805d90e8be0a325291"
        occurred_at: "2026-10-05T19:21:32.666Z"
        payload_digest: "sha256:9637b49128477743be2ff7b019e76a08055969d4977715fb16c2f2a51eaeb12d"
        task_id: "202610041748-K43XFE"
        task_revision: 134
      -
        command_digest: "sha256:782e778324eafc510d83ed757bf153946efabb42156e83da601122e355c71791"
        id: "validation-resolution:sha256:9cfc6c2887f8e84659a68fed715d21c7017c4ab15379d3d01735841c8f42b5b1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:9cfc6c2887f8e84659a68fed715d21c7017c4ab15379d3d01735841c8f42b5b1"
        occurred_at: "2026-10-05T19:21:39.772Z"
        payload_digest: "sha256:5602c7e431b7b0adb3768267e4699cd6d7075e1d64f9ebf8ee0b637373d79b65"
        task_id: "202610041748-K43XFE"
        task_revision: 135
      -
        command_digest: "sha256:4d589932d3bdc2f4c648d601725475ea05bd3b47fb39bf8362e035d5a0e06a2d"
        id: "kernel_work_item_claim_required:sha256:395f053104eb7d485c4d76a5d24f07f23143d81cb05847a3d62f33c984bb283b:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:395f053104eb7d485c4d76a5d24f07f23143d81cb05847a3d62f33c984bb283b:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        occurred_at: "2026-10-05T19:21:53.756Z"
        payload_digest: "sha256:fddff6139a88a1201f7e7953ad6394c56e7d13dbf7eb0771a3ffec2487959179"
        task_id: "202610041748-K43XFE"
        task_revision: 136
      -
        command_digest: "sha256:7588dc1354d83d311c544f097be7fcb86f9fc8a39dc1e8f58ddee80a9291a9b4"
        id: "kernel_work_item_execution_required:sha256:2cb8d593d4de3d0d7adb7849ae61d4eda90150e679080ec61b5c1f4779339416:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2cb8d593d4de3d0d7adb7849ae61d4eda90150e679080ec61b5c1f4779339416:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        occurred_at: "2026-10-05T19:22:05.351Z"
        payload_digest: "sha256:787c797627dc978f0bd75cbaf8a07272253632c6031ea71ad716c83706ada927"
        task_id: "202610041748-K43XFE"
        task_revision: 137
      -
        command_digest: "sha256:bc3d88f8f04c3b32c89a9956429980c207831281060eccb24cf9ab648d1d37a3"
        id: "semantic-stop:sha256:c5b8930e1b55380770898ecc3006398e6386dc6e7d9e56a690fe95d2db1918af:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:c5b8930e1b55380770898ecc3006398e6386dc6e7d9e56a690fe95d2db1918af"
        occurred_at: "2026-10-05T19:25:13.665Z"
        payload_digest: "sha256:022e603ecc958de1cb9a4a72d4482a84bd346c545fdf268864229785922790d8"
        task_id: "202610041748-K43XFE"
        task_revision: 138
      -
        command_digest: "sha256:a36a55795356edd6ae9fe084b48ce6ae9e4e370bc7d9ce9ec7ed80e0efb96e06"
        id: "amend:sha256:99409ad20108a18ccb8410d99c346baa99fd8bf82623c804aa8748e700ef237c:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:99409ad20108a18ccb8410d99c346baa99fd8bf82623c804aa8748e700ef237c"
        occurred_at: "2026-10-05T19:28:12.309Z"
        payload_digest: "sha256:0d8aa7e3aa01b005e62fc15509cb199c9520beb1006f89ece24c2d40fd39a031"
        task_id: "202610041748-K43XFE"
        task_revision: 139
      -
        command_digest: "sha256:028c52675784b2aec4faf4a9551cee12034f2a7528c226ed21de82cd46e6042e"
        id: "sha256:4e10e2089537e2e8014362de6214ec568727130f2efd9c105c67fd91158250ad:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4e10e2089537e2e8014362de6214ec568727130f2efd9c105c67fd91158250ad"
        occurred_at: "2026-10-05T19:28:25.239Z"
        payload_digest: "sha256:1bf22adc1f90853fa26c204bb93542650a567bbd945cb60754581781ab1bca2a"
        task_id: "202610041748-K43XFE"
        task_revision: 140
      -
        command_digest: "sha256:b93026a70b7e5b1b8c50418c3edbfe04d937c4bd3920804222df6faea85e9005"
        id: "kernel_work_item_claim_required:sha256:0f732e66e5add00be77226cd43a9d163fe1c042079a404da8648ed08582eb7ad:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0f732e66e5add00be77226cd43a9d163fe1c042079a404da8648ed08582eb7ad:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        occurred_at: "2026-10-05T19:29:06.438Z"
        payload_digest: "sha256:103de303da505f0add34434918af2352dfbe09939f5cc0fedec68df01d38e9c7"
        task_id: "202610041748-K43XFE"
        task_revision: 141
      -
        command_digest: "sha256:7d5b3134671376214eac3e788168394e44fb8bb5038648c2b0c0acd4ee142c4e"
        id: "kernel_work_item_execution_required:sha256:018fee6e483e6eb905bc5feffa1b904772c98b3bc3d4d37913ccc69c24a1c9a8:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:018fee6e483e6eb905bc5feffa1b904772c98b3bc3d4d37913ccc69c24a1c9a8:sha256:9a298ee7eaedf45aecbae41134725f8d213185a70863f5dc6d9d9fd1706d83f6"
        occurred_at: "2026-10-05T19:29:20.163Z"
        payload_digest: "sha256:550988f727a17cc69d67d2aa8f49c4e406aea599996c1b911bdbb18c1338728d"
        task_id: "202610041748-K43XFE"
        task_revision: 142
      -
        command_digest: "sha256:f0ec23512109d6645a9b34180ae847dd052b2400d8dd3c01c064c48ff2b712bc"
        id: "sha256:b62f438a81d5a95c87bfb1c03b610dfedde82cccc708e8034a8fc2979399b6f8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b62f438a81d5a95c87bfb1c03b610dfedde82cccc708e8034a8fc2979399b6f8"
        occurred_at: "2026-10-05T21:15:30.498Z"
        payload_digest: "sha256:5f64ce5daf5dde7e1fab8a4da7fd61cc3000b26a9aea7391b73cf94eaa9219d1"
        task_id: "202610041748-K43XFE"
        task_revision: 143
      -
        command_digest: "sha256:5aafe155a5935a6b0b8b485e8ef29cc1e4c239748540ddb33bba6d63791db3ba"
        id: "semantic-stop:sha256:044f0fe497a864949217b5729c90a48f16c39354a1fabf81463a5fa9c99c1782:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:044f0fe497a864949217b5729c90a48f16c39354a1fabf81463a5fa9c99c1782"
        occurred_at: "2026-10-05T21:15:46.774Z"
        payload_digest: "sha256:02f0ad2bf0ad0ed6f21679c892082c238c5da9a9cd4a94b36dcd7cf5ea1562e4"
        task_id: "202610041748-K43XFE"
        task_revision: 144
      -
        command_digest: "sha256:285f6158d63161f862a840468e6252d7cd664a4742172c8bf5f8142f2d640ed5"
        id: "amend:sha256:e5d98a4bb211f708e997673e9e9be06d1d0c383c09c524a19fc4bbb6eeca418a:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:e5d98a4bb211f708e997673e9e9be06d1d0c383c09c524a19fc4bbb6eeca418a"
        occurred_at: "2026-10-05T21:18:29.226Z"
        payload_digest: "sha256:7f34a1362842d75736e5adac4261d8a6c9f0ce6a351ba9d7e7a1f42a8d9bf97b"
        task_id: "202610041748-K43XFE"
        task_revision: 145
      -
        command_digest: "sha256:f79fa1d1b6325a696f98f64db1a312eb18d5407f4a22bec65e8d9a7a78099ab5"
        id: "sha256:621e8605c23a24f69dfce034645f33e747c9988f4c30a7e8918d16b60e104a14:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:621e8605c23a24f69dfce034645f33e747c9988f4c30a7e8918d16b60e104a14"
        occurred_at: "2026-10-05T21:18:39.770Z"
        payload_digest: "sha256:b2c821742ea19e042d9dda7fd35015248dad2aec772d2056857bbeaeaedc2b01"
        task_id: "202610041748-K43XFE"
        task_revision: 146
      -
        command_digest: "sha256:46cda69aeb5002ba824a0c5df3d06efb31765df04339e6ad3b07749eb68913f7"
        id: "kernel_work_item_claim_required:sha256:3a7a6a2df8f41e6299318d0245ac3a03ebd72cdb368972156a9691eaef8aec45:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3a7a6a2df8f41e6299318d0245ac3a03ebd72cdb368972156a9691eaef8aec45:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        occurred_at: "2026-10-05T21:19:20.908Z"
        payload_digest: "sha256:2dd0ff8e57d5415a1a25628ec283fe6f8a7a8465a278d6a68224fb414fcba29a"
        task_id: "202610041748-K43XFE"
        task_revision: 147
      -
        command_digest: "sha256:9ee68951f15f83ca317df789733e953b57998d8f0c1c9de72108c28e2f918885"
        id: "kernel_work_item_execution_required:sha256:aa175858abb82d4c637e92de7ff48d6bb2c25b7c31a022e2942612a33c27edb2:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:aa175858abb82d4c637e92de7ff48d6bb2c25b7c31a022e2942612a33c27edb2:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        occurred_at: "2026-10-05T21:19:35.151Z"
        payload_digest: "sha256:a38978aa83e54ffeb65dc5ebcd51468306a56a83343e4a076ede6c09fdce8cd5"
        task_id: "202610041748-K43XFE"
        task_revision: 148
      -
        command_digest: "sha256:d5f624fee70b748f3e82b34c4eb69e36f2267a39abbd2bb8d781c81b93b4b6f8"
        id: "semantic-stop:sha256:f3fb7cf1e1c93813b5ab8b021adb80bef230650e1e4ee73d5636be01ca89c38d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:f3fb7cf1e1c93813b5ab8b021adb80bef230650e1e4ee73d5636be01ca89c38d"
        occurred_at: "2026-10-05T23:52:32.402Z"
        payload_digest: "sha256:0174767c7bb63ca23f1290dd0abe769dc60a07ec5b353a2b1259090aa8de7480"
        task_id: "202610041748-K43XFE"
        task_revision: 149
      -
        command_digest: "sha256:f108f49861f8840e3cf0533df0ea61eebd17af5f52929b0152e4f3fcb75992fc"
        id: "amend:sha256:6842d8b1f22bd013d5c125b138b15b36873315630886c3199542adc067a5c956:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:6842d8b1f22bd013d5c125b138b15b36873315630886c3199542adc067a5c956"
        occurred_at: "2026-10-06T00:51:02.096Z"
        payload_digest: "sha256:f394194f0e275f577b1a964faefdd40d79a6af5377facde7c0822623cadf767b"
        task_id: "202610041748-K43XFE"
        task_revision: 150
      -
        command_digest: "sha256:72e79fae1ca781e6cc9147af981753ed2bf3d51e85f14934291242f66e878b36"
        id: "sha256:2f07a8fa400813830bdb752518da5b591beda19064aa8a7cff6ade872315b63a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2f07a8fa400813830bdb752518da5b591beda19064aa8a7cff6ade872315b63a"
        occurred_at: "2026-10-06T00:51:09.408Z"
        payload_digest: "sha256:6009ea50ce10876f9d450d97873287f89955c037ab40e1b4ccfa61edd44c18f4"
        task_id: "202610041748-K43XFE"
        task_revision: 151
      -
        command_digest: "sha256:1903a9e6afd36add615e7cda0a133757ad9be62be5f05fad76d6bd937ab8af41"
        id: "kernel_work_item_claim_required:sha256:d503997681ccf311a2acd5a3d533b98ee4fbe427e769a09c3a03dbb1d24e7d7a:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d503997681ccf311a2acd5a3d533b98ee4fbe427e769a09c3a03dbb1d24e7d7a:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        occurred_at: "2026-10-06T00:51:46.021Z"
        payload_digest: "sha256:0ce5d687b44648bae777d4deaefaa1729753499467ea31c194a979cdcdc4de11"
        task_id: "202610041748-K43XFE"
        task_revision: 152
      -
        command_digest: "sha256:cbe76d0f93580ff5477f157f28c1ae3afd57e8863e8deda558a2bf61a2e9e805"
        id: "kernel_work_item_execution_required:sha256:9280b00dad0add91104f27bec684d18a9878849850a9478886b09ac8fafbb565:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9280b00dad0add91104f27bec684d18a9878849850a9478886b09ac8fafbb565:sha256:6dec0521e9012d8dd8864676a78351439790bb06e7acad1724ca7be166d3bdc1"
        occurred_at: "2026-10-06T00:51:57.551Z"
        payload_digest: "sha256:5b16beeef2c0d84bf1deee22d929db3530e1535dd0d47f75ba7f480102a0e144"
        task_id: "202610041748-K43XFE"
        task_revision: 153
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
19. Execute approved WorkItem rc-supervisor-composition.

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
