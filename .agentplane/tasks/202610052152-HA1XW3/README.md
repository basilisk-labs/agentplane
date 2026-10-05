---
id: "202610052152-HA1XW3"
title: "Repair native execution of approved read-only CLI and bounded Node heap checks"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 20
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run test:fast -- packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-05T23:07:52.281Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-05T22:13:27.858Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:ad1540dad357a6122ecb154a5afeef28f8b484105f4283e273ed166a7f3fbbcd"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-05T22:13:27.858Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "12aece21b23aef64ba73f55a56732ac105a810e6"
  review_identity_digest: "sha256:ec9c4319bed05078c7926a25294db272a3a15dabff56edb7a4f8efbfc3537a55"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610052152-HA1XW3/e2675b473ca9ec6866f304a10f4796dd111ecda54ec2e4090bdd7af4ed56eda8/quality-report.json"
  findings:
    - "Verified all 13 context blocks and byte lengths, WorkOrder source, required input/report digests, native validation input binding and issued result schema. Inspected the five-file delta at frozen commit 12aece21b23aef64ba73f55a56732ac105a810e6 and tree 7ec01e3364d6902541ac36461e98cb173db1afff."
    - "Heap prefix admission occurs after argv tokenization and accepts only a single decimal --max-old-space-size value in 256–8192 MiB. The remaining invocation passes the existing executable, path, wrapper, inline-code and mutation restrictions. Duplicate assignments, extra Node flags, unknown variables and shell syntax fail closed."
    - "Exact ap/agentplane config show routes use process.execPath and the known repository CLI launcher. Extra arguments and unsupported AgentPlane commands are rejected. Existing doctor/task lint aliases retain their mapping."
    - "Each segment receives a fresh child environment merged with only its own admitted override; process.env is not mutated. Runtime evidence includes the effective heap value and ordered observed segment runtime identities. Existing command identities, deadlines and failure classification remain in place."
    - "Regression coverage includes real CLI execution, real child heap delivery, segment and unrelated-check isolation, bound changes in environment evidence, malformed and injected prefixes, and rejection before subprocess effects. AgentPlane native receipt records 108 tests, scoped ESLint, typecheck and diff validation passing. This evaluator ran no tests or lifecycle commands."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
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
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/commands/shared/declared-check.test.ts"
      - "packages/agentplane/src/commands/shared/declared-check.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/declared-check.test.ts"
      - "packages/agentplane/src/commands/shared/declared-check.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/shared/declared-check.test.ts"
          - "packages/agentplane/src/commands/shared/declared-check.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:4ecc59928ce69dfe637e81fdc97d9945956cd5201ab4dde3aa56f0c63934243a"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/declared-check.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/declared-check.ts"
        - "effect_security_boundary"
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
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "12aece21b23aef64ba73f55a56732ac105a810e6"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-05T21:52:09.527Z"
doc_updated_by: "CODER"
description: "Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks."
sections:
  Summary: |-
    Repair native execution of approved read-only CLI and bounded Node heap checks

    Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.
  Scope: |-
    - In scope: Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.
    - Out of scope: unrelated refactors not required for "Repair native execution of approved read-only CLI and bounded Node heap checks".
  Plan: |-
    1. Execute approved WorkItem repair-native-readonly-check-invocation.
    2. Execute approved WorkItem repair-native-check-test-size.
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair native execution of approved read-only CLI and bounded Node heap checks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair native execution of approved read-only CLI and bounded Node heap checks". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:cfed41e5e21ed064edcb8fd4f6b89894693986f6d18530e4d0bf42a74d46dcfa"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610052152-HA1XW3/e2675b473ca9ec6866f304a10f4796dd111ecda54ec2e4090bdd7af4ed56eda8/quality-report.json"
    findings:
      - "Verified all 13 context blocks and byte lengths, WorkOrder source, required input/report digests, native validation input binding and issued result schema. Inspected the five-file delta at frozen commit 12aece21b23aef64ba73f55a56732ac105a810e6 and tree 7ec01e3364d6902541ac36461e98cb173db1afff."
      - "Heap prefix admission occurs after argv tokenization and accepts only a single decimal --max-old-space-size value in 256–8192 MiB. The remaining invocation passes the existing executable, path, wrapper, inline-code and mutation restrictions. Duplicate assignments, extra Node flags, unknown variables and shell syntax fail closed."
      - "Exact ap/agentplane config show routes use process.execPath and the known repository CLI launcher. Extra arguments and unsupported AgentPlane commands are rejected. Existing doctor/task lint aliases retain their mapping."
      - "Each segment receives a fresh child environment merged with only its own admitted override; process.env is not mutated. Runtime evidence includes the effective heap value and ordered observed segment runtime identities. Existing command identities, deadlines and failure classification remain in place."
      - "Regression coverage includes real CLI execution, real child heap delivery, segment and unrelated-check isolation, bound changes in environment evidence, malformed and injected prefixes, and rejection before subprocess effects. AgentPlane native receipt records 108 tests, scoped ESLint, typecheck and diff validation passing. This evaluator ran no tests or lifecycle commands."
    implementation_commit: "12aece21b23aef64ba73f55a56732ac105a810e6"
    implementation_tree: "7ec01e3364d6902541ac36461e98cb173db1afff"
    projected_at: "2026-10-05T22:13:27.858Z"
    review_identity_digest: "sha256:ec9c4319bed05078c7926a25294db272a3a15dabff56edb7a4f8efbfc3537a55"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:ad1540dad357a6122ecb154a5afeef28f8b484105f4283e273ed166a7f3fbbcd"
    work_order_id: "sha256:115b5eed02f51fb728fc0d864b3e5131fa9d44d7c2c8d007f9ab350df911b2c3"
  task_execution_context:
    base_ref: "main"
    base_sha: "65696d9032b77e80e31c6bca7668a5f32c99c443"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:eaee0b4b4c7589d553b748409b89214ccf913b98ed635c32b7dd7fa20f6c80a5"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c307c2c2c7807b98950db9788dcd0d070ace2e5e468eed447c118bc3452a9fee"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c7d334fd1aa463d000ca8b4cc174c33ba611e5edb4df0158fa3b4b84048bef7f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/declared-check.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            task_id: "202610052152-HA1XW3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
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
            digest: "sha256:ad42f0062e8060a5edf646030adcade0e4ad79e6bb59a4f91ed8341a5facacf7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c307c2c2c7807b98950db9788dcd0d070ace2e5e468eed447c118bc3452a9fee"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c7d334fd1aa463d000ca8b4cc174c33ba611e5edb4df0158fa3b4b84048bef7f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:eaee0b4b4c7589d553b748409b89214ccf913b98ed635c32b7dd7fa20f6c80a5"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a396b22423a77de583358635bf506a9aeb53ed8da1b6d284dab073766b73d22e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/declared-check.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            task_id: "202610052152-HA1XW3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/declared-check.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            evidence_digest: "sha256:ba16a7cf243b635f1d4e643d1d59686ba8196179f82c9017c0d49bdf8f1fe9d6"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:82fede98fa47dfd1ef606e3d393e0e4e7b167cb88483bdfcdc2ae208d7e28143"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c307c2c2c7807b98950db9788dcd0d070ace2e5e468eed447c118bc3452a9fee"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c7d334fd1aa463d000ca8b4cc174c33ba611e5edb4df0158fa3b4b84048bef7f"
              kind: "USER"
              parent_authority_digest: "sha256:ad42f0062e8060a5edf646030adcade0e4ad79e6bb59a4f91ed8341a5facacf7"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/declared-check.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610052152-HA1XW3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "repository_write"
              - "source_code"
            added_scope_roots:
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            changed_paths:
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            evidence_digest: "sha256:d129b80778656fdfe8caa0a0480016005e0f8620dc79b0e784a267b1680ac321"
            kind: "authority_delta"
            previous_fingerprint: "sha256:a396b22423a77de583358635bf506a9aeb53ed8da1b6d284dab073766b73d22e"
            repository_evidence_digest: "sha256:6549c996b17eb9a4227239be5b2cf2b84e24755f27ccbb4eb95418ee8a78061e"
            request_digest: "sha256:b61512fd8f6d99f6497ac4b14ee364f58e031bbe6ab2bedf52f980b002975240"
            request_task_revision: 11
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:61a057dc14a955bd76fc406f05992f5bd842b108b42bd4813a8f18fa6acec710"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:30ec5ac95a4b6e4fbe2de038768b01478d88c84edb93df0178b334da6375f4e2"
            plan_revision: 2
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c7d334fd1aa463d000ca8b4cc174c33ba611e5edb4df0158fa3b4b84048bef7f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:82fede98fa47dfd1ef606e3d393e0e4e7b167cb88483bdfcdc2ae208d7e28143"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/declared-check.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610052152-HA1XW3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:86579d4d73898d5fddb905d759b1716f36c58057702c20c5488a43ce88d070f3"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:5c7a67ee400b17355c72abecb271b8648a4988bd2eac08c7079b5dd26e5461dd"
        digest: "sha256:30ec5ac95a4b6e4fbe2de038768b01478d88c84edb93df0178b334da6375f4e2"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:c54467d910699d404c177a77627d94d5818d43c6613b861534d3d7c4642a2671"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/declared-check.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            expected_outputs:
              - "native-readonly-check-evidence"
            id: "repair-native-readonly-check-invocation"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:f74c0c26fadfc45539f4134c61ecb02920e799ac71bcf0033d369a4786570d69"
            depends_on:
              - "repair-native-readonly-check-invocation"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            expected_outputs:
              - "native-check-test-size-repair-evidence"
            id: "repair-native-check-test-size"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610052152-HA1XW3"
      intent_digest: "sha256:bb0766e4a03f0b9b70ba03c0eeeb8c50c4991be1cea413c322874324f7ee5244"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:30ec5ac95a4b6e4fbe2de038768b01478d88c84edb93df0178b334da6375f4e2:
          after_revision: 13
          aggregate_digest: "sha256:80658faec8e244cec1089f6fc67e814230a8ce044540993eb7ac71af1f8affe0"
          before_revision: 12
          command_digest: "sha256:abfd7430f8980db98ca9ab85de68ebd3a25de511fe1a2933fb8e43eefeb059a0"
          effect_ids: []
          event_digests:
            - "sha256:f6a223e520b9f8e7cc2bb9bc3d186c5f12ffe96fc675b17aab22cab99cbd96c0"
          mutation_id: "amend:sha256:30ec5ac95a4b6e4fbe2de038768b01478d88c84edb93df0178b334da6375f4e2"
        capture:202610052152-HA1XW3:
          after_revision: 1
          aggregate_digest: "sha256:274c58d82ef1e9ddaaa267c8bf59d02ed0515e302ec02833de8c9d75d4c72307"
          before_revision: 0
          command_digest: "sha256:4da53a511e7d4e1c1c750a19e112b1faf8138228c15e682e322fd2fe66397219"
          effect_ids: []
          event_digests:
            - "sha256:3796a505231af2752a4e87996b9011791987313fc191f2e4f7804ede499c7649"
          mutation_id: "capture:202610052152-HA1XW3"
        kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:
          after_revision: 5
          aggregate_digest: "sha256:551bcff8b2c48a9f0f10e8400b488208b5fe6c65097d3ed419a1b5076471c72c"
          before_revision: 4
          command_digest: "sha256:228f573f1f3396dc5e26dc1db7fd83c63c0e2da9c61a789b490be658ebc75e2d"
          effect_ids: []
          event_digests:
            - "sha256:56a8b94d380b4e017ed324d1997d7b84578edb5c9f6df7f2727c0b12d08fbb15"
          mutation_id: "kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        kernel_work_item_claim_required:sha256:fb61f69e523b3f16634e92f132d6b861b2c6aa6adc2c79624838bb3469087472:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df:
          after_revision: 15
          aggregate_digest: "sha256:023e762da2576ecf3760cab10e6051f348216e4b5813e3a3736436537c835eb2"
          before_revision: 14
          command_digest: "sha256:66804138f0253f57ac6c3004146e862eb2884d677a235d204f76d6512d2337b8"
          effect_ids: []
          event_digests:
            - "sha256:2ca8e456fa887608525f7abb1622fad5c0df5264924233c50ac63483906298dd"
          mutation_id: "kernel_work_item_claim_required:sha256:fb61f69e523b3f16634e92f132d6b861b2c6aa6adc2c79624838bb3469087472:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df"
        kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:
          after_revision: 6
          aggregate_digest: "sha256:d4169cddb71d13fc446316626f116b9c7ffd16704815435a0cad321611f98b2e"
          before_revision: 5
          command_digest: "sha256:1407e99787b5aa19dc1d2d54dde94a59bda8cbc5fc58e13178b7e10d31564036"
          effect_ids: []
          event_digests:
            - "sha256:41d2fa6b1cf77db7e5cb105194095364ff41a80b82fe796c69a6bf7289d31d69"
          mutation_id: "kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        kernel_work_item_execution_required:sha256:9d72aa945d432e6367f9384ca62d3839682ef66e177631790486048c41275a36:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df:
          after_revision: 16
          aggregate_digest: "sha256:47adbb24075cddc2c3d7dbeeaf7bdd9c355bb531eff164af69062dfc6e5f3736"
          before_revision: 15
          command_digest: "sha256:21f17f937706bea649d7bac0c5bb3ad3679b5ac9245d1ab42d62cde46959587b"
          effect_ids: []
          event_digests:
            - "sha256:91a6eefa117f5690e8fb4736789deb07c775bf8ffd9d7fa5b0d7d17c846a265f"
          mutation_id: "kernel_work_item_execution_required:sha256:9d72aa945d432e6367f9384ca62d3839682ef66e177631790486048c41275a36:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df"
        kernel_work_item_inspection_required:sha256:f0674748b222320f93f6b8b609c1b50d490998a19f40c1f0d0a075ddfbb793b2:sha256:a396b22423a77de583358635bf506a9aeb53ed8da1b6d284dab073766b73d22e:
          after_revision: 9
          aggregate_digest: "sha256:c052b5db149050d029b91f75150a22e090c97948590e7f682efff0b02e642961"
          before_revision: 8
          command_digest: "sha256:89f6d63867dca5297e7ff071bd03731d127768f43f361eaad0f0957cea660155"
          effect_ids: []
          event_digests:
            - "sha256:0ad4b26a23318cd9eb3cb7b7a166afece4853fafb1653aedde2811bd3b1cb813"
          mutation_id: "kernel_work_item_inspection_required:sha256:f0674748b222320f93f6b8b609c1b50d490998a19f40c1f0d0a075ddfbb793b2:sha256:a396b22423a77de583358635bf506a9aeb53ed8da1b6d284dab073766b73d22e"
        kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:
          after_revision: 4
          aggregate_digest: "sha256:c6ba5d92adcae25cb676482656824751a5a74bfc755e89c5ab6890af0531c3b6"
          before_revision: 3
          command_digest: "sha256:f28548c88a6536ebb714cc06ec9b53fda88d8c7a9b4b36b7522f845b900296fd"
          effect_ids: []
          event_digests:
            - "sha256:659d1c5bdd434ef9d3ae113b3183679b1702b04f3111cd46dd9735b3f2603236"
          mutation_id: "kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        result:sha256:115b5eed02f51fb728fc0d864b3e5131fa9d44d7c2c8d007f9ab350df911b2c3:
          after_revision: 8
          aggregate_digest: "sha256:d9fe3045389eb48934349742f139e6688976aa1e6b8c93ee7493e8ba6ec28ca0"
          before_revision: 7
          command_digest: "sha256:2421f0764e225c15d278a36e6892771d4b0b45b66d3dabd8223a951e7cf8d3aa"
          effect_ids: []
          event_digests:
            - "sha256:dd3844a6c80c50f3bf338d2a65386c1d974ce4ff48ba2b1b31ba472aa2a88572"
          mutation_id: "result:sha256:115b5eed02f51fb728fc0d864b3e5131fa9d44d7c2c8d007f9ab350df911b2c3"
        result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58:
          after_revision: 2
          aggregate_digest: "sha256:1b7a9990c92abbffb0765b102b5a844f599ec8d2e4a575204a10c45f76f19654"
          before_revision: 1
          command_digest: "sha256:31d4cb29f286ec06890806e7b0db7b718fc929decb68d1c7cd396ec2d997e53a"
          effect_ids: []
          event_digests:
            - "sha256:2a7ff337450d6e1da40cfcbf610d864d1160d86292361350deadc76a35393c86"
          mutation_id: "result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58"
        sha256:524794c288c48e128197f83cead0443767d4333c3bd927f6c055821830e794b4:
          after_revision: 14
          aggregate_digest: "sha256:2e6a0ae24ad5806988071147f762c87e307e85adee00ef277a50f6e8b675ff3a"
          before_revision: 13
          command_digest: "sha256:a2f3fcb99ba6b3bde8f6aa1d314133ce1d541eed391f4f4c5fab67d4088e3070"
          effect_ids: []
          event_digests:
            - "sha256:6edd3d0b39e404a44506150d734b29ec7a2f1eadea067838d8bd75ab1fcd8773"
          mutation_id: "sha256:524794c288c48e128197f83cead0443767d4333c3bd927f6c055821830e794b4"
        sha256:97600afe755b83ae7455304ad4f75a4340b463a9e82fc38ce00c6e479469afd5:
          after_revision: 7
          aggregate_digest: "sha256:08233d32a72ceee3d7a8bae3e705718e0e4a8d8607cab7c1295bb4a477364fec"
          before_revision: 6
          command_digest: "sha256:9ee9edbaa6b4dd87f585bd71994a7ba641d91327d31ab7cd56e1e31b83b86d03"
          effect_ids: []
          event_digests:
            - "sha256:129cb129358870ca29075b7dcc08aa398d22f7cd8d926d6ea1da6b06dd59ac13"
          mutation_id: "sha256:97600afe755b83ae7455304ad4f75a4340b463a9e82fc38ce00c6e479469afd5"
        sha256:cf127b2b5c47cf86d3b4d465ab6239dcf0eb5ba16f522420557e138f96560617:
          after_revision: 12
          aggregate_digest: "sha256:b4f7c1b74f10b48d3da7eca6831da2b8ba8b739774b62093f952fa0903f3900f"
          before_revision: 11
          command_digest: "sha256:8b61fa8d6ecf6e84536f929e97e14fa76afbb424af6334ec9fafdb0909e7c6a6"
          effect_ids: []
          event_digests:
            - "sha256:dd25c03bfd59b46d6a86197811b97cfa6829824094814fabfcce89b6aa1695a5"
          mutation_id: "sha256:cf127b2b5c47cf86d3b4d465ab6239dcf0eb5ba16f522420557e138f96560617"
        sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562:
          after_revision: 3
          aggregate_digest: "sha256:99c6045dc9ca988e8cc23041cd0791f38bda26b972e648ede7dbed49a1e7e7b4"
          before_revision: 2
          command_digest: "sha256:acf37a7b308b4d57ba225d4fe91e15577507a52dc17ad71cc820e71db7c8af3c"
          effect_ids: []
          event_digests:
            - "sha256:215f1b52af92acead3adc128f62107bb5188089ed0907b18fd106dd6d220a29a"
          mutation_id: "sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562"
        validation-resolution:sha256:5c6f777bd31a14167880f884896d22f17abab9b6da5beffe032289f321e61bab:
          after_revision: 11
          aggregate_digest: "sha256:3b9a6b3d6a08621d5236a8c40fff6366dd6761c3f2d8e14c682235f576172a58"
          before_revision: 10
          command_digest: "sha256:767fdeee7bd7488c44c9faed9c76fd73c140dac4779428a93e15d660126d653d"
          effect_ids: []
          event_digests:
            - "sha256:0576c6b8f382da2a368a6347a605c18cd7a891f5a8d3e4316276fbd4733f0d1e"
          mutation_id: "validation-resolution:sha256:5c6f777bd31a14167880f884896d22f17abab9b6da5beffe032289f321e61bab"
        validation:sha256:e2675b473ca9ec6866f304a10f4796dd111ecda54ec2e4090bdd7af4ed56eda8:
          after_revision: 10
          aggregate_digest: "sha256:3176f80f3fdb1ac0928a607ded36b081ad628290efd2b8fbdefb0d9e65738fff"
          before_revision: 9
          command_digest: "sha256:3d1bb006156c7488544ababd036db05f1b30cedb61d0dc05cd278d114acf368a"
          effect_ids: []
          event_digests:
            - "sha256:fd31c76e22d5732913c57a4637cda79fae4ebe271160cc1a4489e96258d6dbc8"
          mutation_id: "validation:sha256:e2675b473ca9ec6866f304a10f4796dd111ecda54ec2e4090bdd7af4ed56eda8"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:c7d334fd1aa463d000ca8b4cc174c33ba611e5edb4df0158fa3b4b84048bef7f"
          digest: "sha256:c307c2c2c7807b98950db9788dcd0d070ace2e5e468eed447c118bc3452a9fee"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:c54467d910699d404c177a77627d94d5818d43c6613b861534d3d7c4642a2671"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/shared/declared-check.test.ts"
                  - "packages/agentplane/src/commands/shared/declared-check.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              expected_outputs:
                - "native-readonly-check-evidence"
              id: "repair-native-readonly-check-invocation"
              optional: false
              required_inputs: []
      revision: 16
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-native-check-test-size:
          attempt: 1
          claim_id: "sha256:69c9f2dd1949f762b83025795c2c182c93ff9a2ab4be77838dcb973f46d5e324"
          definition:
            contract_digest: "sha256:f74c0c26fadfc45539f4134c61ecb02920e799ac71bcf0033d369a4786570d69"
            depends_on:
              - "repair-native-readonly-check-invocation"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            expected_outputs:
              - "native-check-test-size-repair-evidence"
            id: "repair-native-check-test-size"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
        repair-native-readonly-check-invocation:
          attempt: 1
          claim_id: "sha256:931a89e938179bae39ba086b83d22fa9cbf4fe8864565fe7ba95365bee41b05e"
          definition:
            contract_digest: "sha256:c54467d910699d404c177a77627d94d5818d43c6613b861534d3d7c4642a2671"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/declared-check.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            expected_outputs:
              - "native-readonly-check-evidence"
            id: "repair-native-readonly-check-invocation"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:b2ee8bd0e7678056e5317bc384b5698c32984d098db7ef93939afa55c8b496ee"
              id: "native-readonly-check-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:a396b22423a77de583358635bf506a9aeb53ed8da1b6d284dab073766b73d22e"
              task_id: "202610052152-HA1XW3"
              work_item_id: "repair-native-readonly-check-invocation"
          result_digest: "sha256:ca051ba9fe8ef93b96cb7f0f04894390ddc4c5a4d2bb4af33666522bad9a709f"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:3d5198f18d09a54dacd6385a665f10b87665b0e78293c9e5ec27dfb67e62ead4"
              - "sha256:ec9c4319bed05078c7926a25294db272a3a15dabff56edb7a4f8efbfc3537a55"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:bb1e4a002712628c7b32d9c2dca28c368ca3ef1c67e79bd24e0e4d8b1747e089"
              environment_digest: "sha256:183c9056d7dd3b793e062271fc7209e269c39f6c01ad0311c5ff6243058571e2"
              implementation_identity: "sha256:ca051ba9fe8ef93b96cb7f0f04894390ddc4c5a4d2bb4af33666522bad9a709f"
              toolchain_digest: "sha256:97398f9060d1177dc7c1604a218cd6ba7b702d285fbdc8a1a0399f01b12330f3"
            observed_at: "2026-10-05T22:13:27.858Z"
            status: "PASSED"
    digest: "sha256:8d412a9c0341540bfe11591d8ad47d999de25f996b72ea02550341847299f86c"
    documents:
      contracts:
        sha256:c54467d910699d404c177a77627d94d5818d43c6613b861534d3d7c4642a2671:
          acceptance_criteria:
            - "Both exact ap config show and agentplane config show resolve to the known CLI using its existing launcher/runtime owner, not PATH lookup of the supplied alias. Reject added arguments/options and mutation commands through this exception; existing separately supported CLI checks retain their behavior."
            - "Admit only one NODE_OPTIONS assignment containing exactly --max-old-space-size=N with a decimal integer in a finite documented range including 4096 (256–8192 MiB). Validate after tokenization and before execution; reject duplicate assignments, extra Node flags, preload/eval/import options, unknown variables, wrappers, substitutions, redirections and malformed or out-of-range values. Preserve all existing underlying command restrictions."
            - "Pass the admitted heap value through an explicit child environment without shell evaluation or mutation of process.env. Scope it to its own parsed sequence segment; subsequent segments and unrelated checks inherit only their normal sanitized environment. Runtime/evidence binding reflects each effective command environment, including the admitted override."
            - "Parser tests cover aliases, the approved lint command, numeric bounds, malformed/injected variants, protected mutation commands and multi-segment isolation. Real native-verifier tests exercise readonly CLI execution and heap delivery plus negative rejection before subprocess effects. Preserve existing assertions, deadlines, check identities, failure classification and mandatory-check retention."
            - "Run focused declared-check and native-verification tests, plain targeted ESLint, typecheck and diff checks. Do not put inline environment prefixes into this WorkItem verification commands. Rebuild core and CLI bundles after typecheck if needed for a usable native runtime. Preserve every inherited baseline file, including pre-existing generated-looking files. Independent native EVALUATOR and final verification remain mandatory."
          objective: "Repair native declared-check parsing and argv execution for exact ap config show and agentplane config show through the known repository CLI, and for a single bounded NODE_OPTIONS=--max-old-space-size=<integer> prefix on an otherwise admitted check. Preserve the declared command and verification obligations, without shell evaluation, arbitrary environment variables, Node code-loading flags, wrappers, or mutation-command admission. Keep the change within the five authorized parser/verifier/test files."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:fast -- packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            - "bunx --no-install eslint packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/shared/declared-check.ts packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/direct-task-verification.ts"
            - "bun run typecheck"
            - "git diff --check"
        sha256:f74c0c26fadfc45539f4134c61ecb02920e799ac71bcf0033d369a4786570d69:
          acceptance_criteria:
            - "Move the two config-show alias cases, one real heap-delivery case and four unsafe-command rejection cases into the existing sequence test module. Remove newly unused imports from the parent test file. Keep the existing module import so the original focused command discovers every case."
            - "Preserve all 108 focused tests, all assertions and negative cases, native subprocess execution, fixture isolation/cleanup and environment restoration. Use the real core process runner for fixture Git initialization and leave run_process uninjected for the native verifier cases; do not accidentally route them through the sequence mock."
            - "Bring direct-task-verification.test.ts below the existing 1000-line oversized-test threshold and keep the sequence module within its existing budget. Do not change hotspot baselines, limits, test selection, skips, retries, timeouts, lint rules or production source."
            - "Preserve the completed WorkItem, its contract, outputs, checks and history unchanged. Do not modify any source outside the two scoped test files or archive/delete inherited files during this episode; the operator handles the inherited empty tsup artifact before the fresh packet."
            - "Run the focused 108-test command, targeted lint, hotspots:check, typecheck and diff check. Supply heap options only through the external process environment. Rebuild core/CLI bundles after typecheck if needed. Independent evaluation and the full native final verification floor remain required."
          objective: "Resolve the confirmed H docs-schema failure by moving the seven newly added real native-verifier subprocess cases from direct-task-verification.test.ts into the existing imported direct-task-verification.sequence.cases.ts module. Keep both files within their existing size limits and preserve all tests and behavior. The separate runtime-group replay passed 35 tests in four files, so no runtime production or unrelated test changes are authorized."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:fast -- packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            - "bunx --no-install eslint packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            - "bun run hotspots:check"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks."
        objective: "Repair native execution of approved read-only CLI and bounded Node heap checks"
    events:
      -
        command_digest: "sha256:4da53a511e7d4e1c1c750a19e112b1faf8138228c15e682e322fd2fe66397219"
        id: "capture:202610052152-HA1XW3:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610052152-HA1XW3"
        occurred_at: "2026-10-05T21:52:09.462Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610052152-HA1XW3"
        task_revision: 1
      -
        command_digest: "sha256:31d4cb29f286ec06890806e7b0db7b718fc929decb68d1c7cd396ec2d997e53a"
        id: "result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58"
        occurred_at: "2026-10-05T21:54:36.988Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610052152-HA1XW3"
        task_revision: 2
      -
        command_digest: "sha256:acf37a7b308b4d57ba225d4fe91e15577507a52dc17ad71cc820e71db7c8af3c"
        id: "sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562"
        occurred_at: "2026-10-05T21:54:48.062Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610052152-HA1XW3"
        task_revision: 3
      -
        command_digest: "sha256:f28548c88a6536ebb714cc06ec9b53fda88d8c7a9b4b36b7522f845b900296fd"
        id: "kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        occurred_at: "2026-10-05T21:54:56.256Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610052152-HA1XW3"
        task_revision: 4
      -
        command_digest: "sha256:228f573f1f3396dc5e26dc1db7fd83c63c0e2da9c61a789b490be658ebc75e2d"
        id: "kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        occurred_at: "2026-10-05T21:55:10.257Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610052152-HA1XW3"
        task_revision: 5
      -
        command_digest: "sha256:1407e99787b5aa19dc1d2d54dde94a59bda8cbc5fc58e13178b7e10d31564036"
        id: "kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        occurred_at: "2026-10-05T21:56:22.649Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610052152-HA1XW3"
        task_revision: 6
      -
        command_digest: "sha256:9ee9edbaa6b4dd87f585bd71994a7ba641d91327d31ab7cd56e1e31b83b86d03"
        id: "sha256:97600afe755b83ae7455304ad4f75a4340b463a9e82fc38ce00c6e479469afd5:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:97600afe755b83ae7455304ad4f75a4340b463a9e82fc38ce00c6e479469afd5"
        occurred_at: "2026-10-05T22:09:27.256Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610052152-HA1XW3"
        task_revision: 7
      -
        command_digest: "sha256:2421f0764e225c15d278a36e6892771d4b0b45b66d3dabd8223a951e7cf8d3aa"
        id: "result:sha256:115b5eed02f51fb728fc0d864b3e5131fa9d44d7c2c8d007f9ab350df911b2c3:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:115b5eed02f51fb728fc0d864b3e5131fa9d44d7c2c8d007f9ab350df911b2c3"
        occurred_at: "2026-10-05T22:09:45.077Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610052152-HA1XW3"
        task_revision: 8
      -
        command_digest: "sha256:89f6d63867dca5297e7ff071bd03731d127768f43f361eaad0f0957cea660155"
        id: "kernel_work_item_inspection_required:sha256:f0674748b222320f93f6b8b609c1b50d490998a19f40c1f0d0a075ddfbb793b2:sha256:a396b22423a77de583358635bf506a9aeb53ed8da1b6d284dab073766b73d22e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f0674748b222320f93f6b8b609c1b50d490998a19f40c1f0d0a075ddfbb793b2:sha256:a396b22423a77de583358635bf506a9aeb53ed8da1b6d284dab073766b73d22e"
        occurred_at: "2026-10-05T22:09:57.212Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610052152-HA1XW3"
        task_revision: 9
      -
        command_digest: "sha256:3d1bb006156c7488544ababd036db05f1b30cedb61d0dc05cd278d114acf368a"
        id: "validation:sha256:e2675b473ca9ec6866f304a10f4796dd111ecda54ec2e4090bdd7af4ed56eda8:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e2675b473ca9ec6866f304a10f4796dd111ecda54ec2e4090bdd7af4ed56eda8"
        occurred_at: "2026-10-05T22:13:41.468Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610052152-HA1XW3"
        task_revision: 10
      -
        command_digest: "sha256:767fdeee7bd7488c44c9faed9c76fd73c140dac4779428a93e15d660126d653d"
        id: "validation-resolution:sha256:5c6f777bd31a14167880f884896d22f17abab9b6da5beffe032289f321e61bab:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5c6f777bd31a14167880f884896d22f17abab9b6da5beffe032289f321e61bab"
        occurred_at: "2026-10-05T22:13:49.443Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610052152-HA1XW3"
        task_revision: 11
      -
        command_digest: "sha256:8b61fa8d6ecf6e84536f929e97e14fa76afbb424af6334ec9fafdb0909e7c6a6"
        id: "sha256:cf127b2b5c47cf86d3b4d465ab6239dcf0eb5ba16f522420557e138f96560617:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cf127b2b5c47cf86d3b4d465ab6239dcf0eb5ba16f522420557e138f96560617"
        occurred_at: "2026-10-05T23:02:29.332Z"
        payload_digest: "sha256:445c0de1632f0434256a3fdb150fc96b03e827ad1a1f88a2fb70f5132334cc57"
        task_id: "202610052152-HA1XW3"
        task_revision: 12
      -
        command_digest: "sha256:abfd7430f8980db98ca9ab85de68ebd3a25de511fe1a2933fb8e43eefeb059a0"
        id: "amend:sha256:30ec5ac95a4b6e4fbe2de038768b01478d88c84edb93df0178b334da6375f4e2:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:30ec5ac95a4b6e4fbe2de038768b01478d88c84edb93df0178b334da6375f4e2"
        occurred_at: "2026-10-05T23:03:50.334Z"
        payload_digest: "sha256:b15590955f1bf684e87c1de91d4294438c4366f8c657818652f9d8a39b168887"
        task_id: "202610052152-HA1XW3"
        task_revision: 13
      -
        command_digest: "sha256:a2f3fcb99ba6b3bde8f6aa1d314133ce1d541eed391f4f4c5fab67d4088e3070"
        id: "sha256:524794c288c48e128197f83cead0443767d4333c3bd927f6c055821830e794b4:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:524794c288c48e128197f83cead0443767d4333c3bd927f6c055821830e794b4"
        occurred_at: "2026-10-05T23:04:13.585Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610052152-HA1XW3"
        task_revision: 14
      -
        command_digest: "sha256:66804138f0253f57ac6c3004146e862eb2884d677a235d204f76d6512d2337b8"
        id: "kernel_work_item_claim_required:sha256:fb61f69e523b3f16634e92f132d6b861b2c6aa6adc2c79624838bb3469087472:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:fb61f69e523b3f16634e92f132d6b861b2c6aa6adc2c79624838bb3469087472:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df"
        occurred_at: "2026-10-05T23:08:07.141Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610052152-HA1XW3"
        task_revision: 15
      -
        command_digest: "sha256:21f17f937706bea649d7bac0c5bb3ad3679b5ac9245d1ab42d62cde46959587b"
        id: "kernel_work_item_execution_required:sha256:9d72aa945d432e6367f9384ca62d3839682ef66e177631790486048c41275a36:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9d72aa945d432e6367f9384ca62d3839682ef66e177631790486048c41275a36:sha256:85640f5a3f13c65f6c38ce1ca185b196e11c9e54ebf70a8078687857efaf67df"
        occurred_at: "2026-10-05T23:08:25.419Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610052152-HA1XW3"
        task_revision: 16
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair native execution of approved read-only CLI and bounded Node heap checks

Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.

## Scope

- In scope: Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.
- Out of scope: unrelated refactors not required for "Repair native execution of approved read-only CLI and bounded Node heap checks".

## Plan

1. Execute approved WorkItem repair-native-readonly-check-invocation.
2. Execute approved WorkItem repair-native-check-test-size.

## Verify Steps

PLANNER fallback scaffold for "Repair native execution of approved read-only CLI and bounded Node heap checks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair native execution of approved read-only CLI and bounded Node heap checks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
