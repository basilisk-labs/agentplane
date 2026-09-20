---
id: "202609201929-W5XKXW"
title: "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
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
    external_effects:
      - "network_read"
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
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
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
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:e9a61d7e62039e1a5e7b9917ae01c1105a0566f4c1f8295be4843a01346f36f4"
      escalation_reasons: []
      execution_groups:
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-20T19:29:03.525Z"
doc_updated_by: "CODER"
description: "In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI."
sections:
  Summary: |-
    Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication

    In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI.
  Scope: |-
    - In scope: In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI.
    - Out of scope: unrelated refactors not required for "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "4470b04c34da735ffb46914ea6e6398a54eb39ac"
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
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:30f4199df2933bb35175ad37ef3108ba790080d83d669b726d15828746699968"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:05b44fd1cde018f22e5ab1f4528e49a1998969715dca9db3a587d38e0b609eca"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6d7876599957141f25661472e980fd983b2b004b22aae2c88bd4a6027de70b10"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "existing release script test conventions"
              - "existing runtime fixture helpers"
              - "existing stable-file collision classifier"
              - "existing task-close branch primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/runner/usecases"
              - "packages/agentplane/src/shared/runtime-env.test.ts"
              - "packages/agentplane/src/shared/runtime-env.ts"
              - "packages/agentplane/src/shared/stable-file.test.ts"
              - "packages/agentplane/src/shared/stable-file.ts"
              - "scripts/release/check-published-packages.mjs"
            task_id: "202609201929-W5XKXW"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint:core"
              - "bunx vitest run packages/agentplane/src/commands/release"
              - "bunx vitest run packages/agentplane/src/shared/stable-file.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/shared/runtime-env.test.ts"
              - "git diff --check"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:35c243739428eb20cf096572a38307460de2b2130823114c4187f9ad3dcb081c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:05b44fd1cde018f22e5ab1f4528e49a1998969715dca9db3a587d38e0b609eca"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6d7876599957141f25661472e980fd983b2b004b22aae2c88bd4a6027de70b10"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:30f4199df2933bb35175ad37ef3108ba790080d83d669b726d15828746699968"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:25bf6e1691e28c23c9ca988d6848ce35739822104a2509001e524e9c4b0cd74b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "existing release script test conventions"
              - "existing runtime fixture helpers"
              - "existing stable-file collision classifier"
              - "existing task-close branch primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/runner/usecases"
              - "packages/agentplane/src/shared/runtime-env.test.ts"
              - "packages/agentplane/src/shared/runtime-env.ts"
              - "packages/agentplane/src/shared/stable-file.test.ts"
              - "packages/agentplane/src/shared/stable-file.ts"
              - "scripts/release/check-published-packages.mjs"
            task_id: "202609201929-W5XKXW"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint:core"
              - "bunx vitest run packages/agentplane/src/commands/release"
              - "bunx vitest run packages/agentplane/src/shared/stable-file.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/shared/runtime-env.test.ts"
              - "git diff --check"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/release/check-published-packages-script.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
              - "packages/agentplane/src/shared/runtime-env.test.ts"
              - "packages/agentplane/src/shared/runtime-env.ts"
              - "scripts/release/check-published-packages.mjs"
            evidence_digest: "sha256:26b2dd347d933d65144e7d514771e8a8a65f8c6e68a65de8658f699b9b564248"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b4e98d90c1348f1a886c24b252c08ec8f177a2a0e518145556659f347b4256b9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:05b44fd1cde018f22e5ab1f4528e49a1998969715dca9db3a587d38e0b609eca"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6d7876599957141f25661472e980fd983b2b004b22aae2c88bd4a6027de70b10"
              kind: "USER"
              parent_authority_digest: "sha256:35c243739428eb20cf096572a38307460de2b2130823114c4187f9ad3dcb081c"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "existing release script test conventions"
              - "existing runtime fixture helpers"
              - "existing stable-file collision classifier"
              - "existing task-close branch primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
              - "packages/agentplane/src/commands/release"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
              - "packages/agentplane/src/runner/usecases"
              - "packages/agentplane/src/shared/runtime-env.test.ts"
              - "packages/agentplane/src/shared/runtime-env.ts"
              - "packages/agentplane/src/shared/stable-file.test.ts"
              - "packages/agentplane/src/shared/stable-file.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/release/check-published-packages.mjs"
            task_id: "202609201929-W5XKXW"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint:core"
              - "bunx vitest run packages/agentplane/src/commands/release"
              - "bunx vitest run packages/agentplane/src/shared/stable-file.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/shared/runtime-env.test.ts"
              - "git diff --check"
            work_item_id: null
          observation:
            added_repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
              - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
            evidence_digest: "sha256:7f4f68b2eb3dc5f1a23f0a663d09ccafacd7530280eefc91235f6b9bd58f91c4"
            kind: "authority_delta"
            previous_fingerprint: "sha256:25bf6e1691e28c23c9ca988d6848ce35739822104a2509001e524e9c4b0cd74b"
            repository_evidence_digest: "sha256:6a795e070a44caf612691d812c829f2b4d7ec06552b0ba7a576d6da06c653dfb"
            request_digest: "sha256:65e3f7bc18127c006cc2d9cad0e8c7a6e7532149e1b9cba04be36651a69cf4f0"
            request_task_revision: 8
        -
          approval_mode: null
          authority:
            capabilities:
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f4d7464628c31e211bba260c4a1f24a6aabf4e80c3ba692657f2158dc0903e53"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a60a38f98cd58e44f93955a23a1585dc68c5b6c134f2a8bd6bffc6e086b920f5"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6d7876599957141f25661472e980fd983b2b004b22aae2c88bd4a6027de70b10"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b4e98d90c1348f1a886c24b252c08ec8f177a2a0e518145556659f347b4256b9"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "existing release script test conventions"
              - "existing runtime fixture helpers"
              - "existing stable-file collision classifier"
              - "existing task-close branch primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
              - "packages/agentplane/src/commands/release"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
              - "packages/agentplane/src/runner/usecases"
              - "packages/agentplane/src/shared/runtime-env.test.ts"
              - "packages/agentplane/src/shared/runtime-env.ts"
              - "packages/agentplane/src/shared/stable-file.test.ts"
              - "packages/agentplane/src/shared/stable-file.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/release/check-published-packages.mjs"
            task_id: "202609201929-W5XKXW"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint:core"
              - "bunx vitest run packages/agentplane/src/commands/release"
              - "bunx vitest run packages/agentplane/src/shared/stable-file.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/shared/runtime-env.test.ts"
              - "git diff --check"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:acec51c4a151e4cd137fbf9dbc887a67fd9a2ebdc1afe301b4079b3b769270f2"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9ca6b72f078a64bbe66d2061ff523445da4c38151fb61406e6ccb8f73f16cf1c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:a60a38f98cd58e44f93955a23a1585dc68c5b6c134f2a8bd6bffc6e086b920f5"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6d7876599957141f25661472e980fd983b2b004b22aae2c88bd4a6027de70b10"
              kind: "USER"
              parent_authority_digest: "sha256:f4d7464628c31e211bba260c4a1f24a6aabf4e80c3ba692657f2158dc0903e53"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "existing release script test conventions"
              - "existing runtime fixture helpers"
              - "existing stable-file collision classifier"
              - "existing task-close branch primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
              - "packages/agentplane/src/commands/release"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
              - "packages/agentplane/src/runner/usecases"
              - "packages/agentplane/src/shared/runtime-env.test.ts"
              - "packages/agentplane/src/shared/runtime-env.ts"
              - "packages/agentplane/src/shared/stable-file.test.ts"
              - "packages/agentplane/src/shared/stable-file.ts"
              - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/release/check-published-packages.mjs"
            task_id: "202609201929-W5XKXW"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint:core"
              - "bunx vitest run packages/agentplane/src/commands/release"
              - "bunx vitest run packages/agentplane/src/shared/stable-file.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/shared/runtime-env.test.ts"
              - "git diff --check"
            work_item_id: null
          observation:
            added_repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
              - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
            evidence_digest: "sha256:99298337d9be8537bf41d8d3f964dd3a25096cbf5b76109b93abb8d73dd6173a"
            kind: "authority_delta"
            previous_fingerprint: "sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
            repository_evidence_digest: "sha256:75325ece3017f8cdac6d1e0855326fcab36a2df9693c420262e0218235056d24"
            request_digest: "sha256:b87e3fd8638d164657a4f206c735ebbb3195082c029a55b941a588d171088d89"
            request_task_revision: 17
        -
          approval_mode: null
          authority:
            capabilities:
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:805bbb7816029679372dbfd94d6a24539445f9b7449af790cc7e169c0cf34121"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3f77af704637f8f8619119bbc571d433100a5fce72ad0d77c9df419c4a6508be"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6d7876599957141f25661472e980fd983b2b004b22aae2c88bd4a6027de70b10"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9ca6b72f078a64bbe66d2061ff523445da4c38151fb61406e6ccb8f73f16cf1c"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "existing release script test conventions"
              - "existing runtime fixture helpers"
              - "existing stable-file collision classifier"
              - "existing task-close branch primitives"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
              - "packages/agentplane/src/commands/release"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
              - "packages/agentplane/src/runner/usecases"
              - "packages/agentplane/src/shared/runtime-env.test.ts"
              - "packages/agentplane/src/shared/runtime-env.ts"
              - "packages/agentplane/src/shared/stable-file.test.ts"
              - "packages/agentplane/src/shared/stable-file.ts"
              - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "scripts/checks/run-pre-push-hook.mjs"
              - "scripts/release/check-published-packages.mjs"
            task_id: "202609201929-W5XKXW"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint:core"
              - "bunx vitest run packages/agentplane/src/commands/release"
              - "bunx vitest run packages/agentplane/src/shared/stable-file.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/shared/runtime-env.test.ts"
              - "git diff --check"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:80ee06e6a4161df6bff65482ff5d9aa8a54e2ba57f855aaf4ea2a2a86159f1a4"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:023f1461a4ce1991b494aa9f4701fa7420a02daa9f4734cb3b84dc93a63e5ba7"
        digest: "sha256:3f77af704637f8f8619119bbc571d433100a5fce72ad0d77c9df419c4a6508be"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:9e04bee0afea87e774d3045b829188d39ef4dbb6d7547ab84236454141487873"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "existing task-close branch primitives"
                - "existing stable-file collision classifier"
                - "existing runtime fixture helpers"
                - "existing release script test conventions"
              scope_roots:
                - "packages/agentplane/src/shared/stable-file.ts"
                - "packages/agentplane/src/shared/stable-file.test.ts"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/shared/runtime-env.ts"
                - "packages/agentplane/src/shared/runtime-env.test.ts"
                - "scripts/release/check-published-packages.mjs"
                - "packages/agentplane/src/commands/release"
                - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
                - "scripts/checks/run-pre-push-hook.mjs"
                - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
            expected_outputs:
              - "bounded-stable-task-read"
              - "protected-main-terminal-closure-routing"
              - "bounded-npm-propagation-backoff"
              - "active-node-runtime-precedence"
              - "focused-regression-tests"
            id: "implement-four-release-reliability-gaps"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609201929-W5XKXW"
      intent_digest: "sha256:f11c6e07184b89657380f68878025d83ffbafc3ab5edb23acd5737d125aec0c7"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:3f77af704637f8f8619119bbc571d433100a5fce72ad0d77c9df419c4a6508be:
          after_revision: 20
          aggregate_digest: "sha256:7a75327a9b384c91d6f5b5cba4365f8a5ac81f6ba8bddb7b6fd0cb338cb178dd"
          before_revision: 19
          command_digest: "sha256:8a388c31feb1008055bbd2371d0da5d94ede7fb6ae459dd52c46b7321b33a8b9"
          effect_ids: []
          event_digests:
            - "sha256:85780469d58746a80143325ebdd4ff2313b2df7354b1b8d1530971e5999c8265"
          mutation_id: "amend:sha256:3f77af704637f8f8619119bbc571d433100a5fce72ad0d77c9df419c4a6508be"
        amend:sha256:a60a38f98cd58e44f93955a23a1585dc68c5b6c134f2a8bd6bffc6e086b920f5:
          after_revision: 14
          aggregate_digest: "sha256:b71f8dbe19cc2fabdf1062e275636d774e8f2da7af7b06c6a057f2e1a666fa24"
          before_revision: 13
          command_digest: "sha256:24539439626b029e6d25e0c20ad4adaa698e8590f2ca0c477c61ee91937ea9e9"
          effect_ids: []
          event_digests:
            - "sha256:77339ebf9c7d4a4347ea2f03a9f974058a19792c45434de8e4aea7e21e5ce7b8"
          mutation_id: "amend:sha256:a60a38f98cd58e44f93955a23a1585dc68c5b6c134f2a8bd6bffc6e086b920f5"
        capture:202609201929-W5XKXW:
          after_revision: 1
          aggregate_digest: "sha256:05823a164f3b1f3d42c215c65fc58083dd386e7f96efa036be934b78ca2174ab"
          before_revision: 0
          command_digest: "sha256:d33be901e984d30acf5e95df09d85bbb814155604a74673ea2d95e3ec4d7d4ae"
          effect_ids: []
          event_digests:
            - "sha256:5c506f2095ca006bccf43c973a912ac364d83977673365062e6fa0148d8fd4d5"
          mutation_id: "capture:202609201929-W5XKXW"
        kernel_work_item_claim_required:sha256:5f01bcfcca2aade9dd67ae2fffa5982606672143bb89b54158ce2d3205fc3360:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:
          after_revision: 16
          aggregate_digest: "sha256:4e5ef88f801ef180f68c86e216c4428aa9c1f70ad99a19553163d125d667e9d4"
          before_revision: 15
          command_digest: "sha256:15f836cd5a2cc1f8b7b2584947d3f7880843c4e3778a995b7829e9586ce43a57"
          effect_ids: []
          event_digests:
            - "sha256:b6d22614a279cf6d15588383898269c73e55190e09e4ed6b12e9cf71a0f6acb7"
          mutation_id: "kernel_work_item_claim_required:sha256:5f01bcfcca2aade9dd67ae2fffa5982606672143bb89b54158ce2d3205fc3360:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        kernel_work_item_claim_required:sha256:94f60d573edd9b99194441a32099c373652272499eefe21a0ae453a0fe87e155:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5:
          after_revision: 22
          aggregate_digest: "sha256:fc08a081a78718f34a0815e7e82ff0d796e68de8b7ee2f331c5e3975f43a77ca"
          before_revision: 21
          command_digest: "sha256:4aaf9652382e610b3a49375126b3749c7ae33504b66ad14e73e39b08f4fea491"
          effect_ids: []
          event_digests:
            - "sha256:aa5ae037f1560a3c738934162ecaf051c271daf58c39fcffad3449a6e2fe2d5e"
          mutation_id: "kernel_work_item_claim_required:sha256:94f60d573edd9b99194441a32099c373652272499eefe21a0ae453a0fe87e155:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5"
        kernel_work_item_claim_required:sha256:aaed56c22ef823526a581b48e40643560750d37ac5971100abd720a6e3687b29:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:
          after_revision: 11
          aggregate_digest: "sha256:02b66c77db1e93905010ad250330d624332881422f705f34e5546242af6fd0d5"
          before_revision: 10
          command_digest: "sha256:d6fdc9a54e6fbade5e487da13180a22601c4785209c5a6186f965a93064b006d"
          effect_ids: []
          event_digests:
            - "sha256:6016c81a01e1e1e42e8a9395ad8c7449ddb607577b8a18a063d991e487952814"
          mutation_id: "kernel_work_item_claim_required:sha256:aaed56c22ef823526a581b48e40643560750d37ac5971100abd720a6e3687b29:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        kernel_work_item_claim_required:sha256:ca53732280c5f355aaa3035eb9c65b1c6a62ea42a782625fb1568def9efbc021:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 5
          aggregate_digest: "sha256:ab3f589971ddc9d7e1cab2615523a98a53a9abd5f75e9e79d5c37d50971ff1c4"
          before_revision: 4
          command_digest: "sha256:73634967f2a7b39b29fdf0dd1d9f67d7a6b17a8d5bfc14b5bdee67b9db2c8dbc"
          effect_ids: []
          event_digests:
            - "sha256:1563ffc4cebb6289213c3664d8f2b36cdf45a2de77b381fadd2c64cbe5ac56ad"
          mutation_id: "kernel_work_item_claim_required:sha256:ca53732280c5f355aaa3035eb9c65b1c6a62ea42a782625fb1568def9efbc021:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_execution_required:sha256:2a26978be2088d42d758ce4e9318f564a99506b671185390ab1605c8f1e3a81a:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 6
          aggregate_digest: "sha256:1106436d2626035558d4ee095a3f79fb9c849d05eb491f5730221af4bde94f34"
          before_revision: 5
          command_digest: "sha256:46be201731210e2cd1617d95ff72fc0e1d0ef9620bfc42f32c69c5622b4318fe"
          effect_ids: []
          event_digests:
            - "sha256:993a5f2f4f30268eb3d72262e598e5a93e244b9ad3e232a1540773e77f209bca"
          mutation_id: "kernel_work_item_execution_required:sha256:2a26978be2088d42d758ce4e9318f564a99506b671185390ab1605c8f1e3a81a:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_execution_required:sha256:47e3fec5740a4369886463d49f1d0b39b431bde1dff1a92bedac12b76c0f5545:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5:
          after_revision: 23
          aggregate_digest: "sha256:ddb42b38ae55e642c3eb06a85d1ce3c440cdb85aec90d5da58b10e93d4c3d78a"
          before_revision: 22
          command_digest: "sha256:fd1e7a819b6efaab15dc8a3f6c869b6d4a84f5cc87467e961f945aff33724d0f"
          effect_ids: []
          event_digests:
            - "sha256:76218986db608870fad3ef3045c0893bb97c6f0f2068baab75c91958c78bf1e7"
          mutation_id: "kernel_work_item_execution_required:sha256:47e3fec5740a4369886463d49f1d0b39b431bde1dff1a92bedac12b76c0f5545:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5"
        kernel_work_item_execution_required:sha256:b770c86df7f261991452d46c834c53ce385f32ab46d59278dd7d3c261436b710:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:
          after_revision: 17
          aggregate_digest: "sha256:cfb2b1cc2888fb01cca6d5b6ca72436b2450a8e9796306ae9941844eeaaba5ee"
          before_revision: 16
          command_digest: "sha256:5dd1746f598874ae89ba739db78a0e568984d528cd0af0c7a88bb5f5e860e83c"
          effect_ids: []
          event_digests:
            - "sha256:9ccad94015791b78b2d94f4252dd98f978b42b1bc13590bfaaa92e34ea21c266"
          mutation_id: "kernel_work_item_execution_required:sha256:b770c86df7f261991452d46c834c53ce385f32ab46d59278dd7d3c261436b710:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        kernel_work_item_execution_required:sha256:bab3a0506c47d235fe10e0e2a2567584d403e165564073868518d9c347d84207:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:
          after_revision: 12
          aggregate_digest: "sha256:8759c128624a65ab6623d24e63b58fc68c85c4849582f8ae00a7b85e5f0043b0"
          before_revision: 11
          command_digest: "sha256:47b00e8f3ca75e8bc8a875fff755d6f9b3382d305ef523d0396423f0bf8473f3"
          effect_ids: []
          event_digests:
            - "sha256:dfc3316835acdbc32bff9f25bcd8189c62f5a0cbe0ba7bdb156f57a67d0c6fce"
          mutation_id: "kernel_work_item_execution_required:sha256:bab3a0506c47d235fe10e0e2a2567584d403e165564073868518d9c347d84207:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        kernel_work_item_materialization_required:sha256:223e205bff16418b49fde375bfaaaeb1567a7d4eb322888e43927b2476376a28:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 4
          aggregate_digest: "sha256:32d1232341d240df8cc3b1565b43962e04b2243663ecd80f8fe9760c8ad11be3"
          before_revision: 3
          command_digest: "sha256:793dcea2a6179e41cb2ca1219d0e4da69f731c22bd284b16391717b99e9dc569"
          effect_ids: []
          event_digests:
            - "sha256:9ca4a1bd8b39614617782a713de00e23e4c1b6a994bd79286753a6b1306c45aa"
          mutation_id: "kernel_work_item_materialization_required:sha256:223e205bff16418b49fde375bfaaaeb1567a7d4eb322888e43927b2476376a28:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        operator-recovery:block-failed-recovery-issuance:
          after_revision: 13
          aggregate_digest: "sha256:7b7fe5a3ececa77081bfe37c5e55774142bf918294ab279a77c4dce03fced476"
          before_revision: 12
          command_digest: "sha256:4348b4ce089d8a12d5ddccec1314f6c3d74decfafd6e7cd1d17d9685b03f56e3"
          effect_ids: []
          event_digests:
            - "sha256:75650dffbdc6ed10559c786d26130493ca203fcde77a09125bd7f615144ee5f8"
          mutation_id: "operator-recovery:block-failed-recovery-issuance"
        operator-recovery:block-lineage-repair:
          after_revision: 19
          aggregate_digest: "sha256:6bae4ceb1e578be04ca86bf130489076385fa3eefd532c96de7013d952bfd4d8"
          before_revision: 18
          command_digest: "sha256:f634e3e77a99b8ed0d3262cfa96b2c00f48a344b333d33a4ab46464db60f294d"
          effect_ids: []
          event_digests:
            - "sha256:5a32f9df45c65738ba90cc6494fa1835a93d405017162798aa1ab8fd5520271c"
          mutation_id: "operator-recovery:block-lineage-repair"
        operator-recovery:resume-after-authority-delta:
          after_revision: 10
          aggregate_digest: "sha256:54dc98aa56ff879dcec2c092bc95c555b57f66f02b5eb5b38a97b850e691fe18"
          before_revision: 9
          command_digest: "sha256:70aa381e80d3b0aabaf78e64eea2831af3b337d47e0d415db31fb9fb7b256156"
          effect_ids: []
          event_digests:
            - "sha256:d2fd1d86d19ee025164f4a12856a8129ca40211b0c3c1b2334cb3087c9f8176c"
          mutation_id: "operator-recovery:resume-after-authority-delta"
        result:sha256:68f0b53fe856a85f3fc23cba38582ba7de2e28b26913143a7de1aada15e791ee:
          after_revision: 2
          aggregate_digest: "sha256:fb6e88aaeecf3da9f73aa5db64e0c416733cc3613a9e122e336495d42dc5ac60"
          before_revision: 1
          command_digest: "sha256:c1257d4b8d70edffd5d8e94ec313e6ee53ac2f4bbc9175f601efb82270de63b0"
          effect_ids: []
          event_digests:
            - "sha256:c78d38d38b6da3ef3418ec7e672764cf0bcc67aebc086da1a547311dd7dff24f"
          mutation_id: "result:sha256:68f0b53fe856a85f3fc23cba38582ba7de2e28b26913143a7de1aada15e791ee"
        semantic-stop:sha256:3099c126bacc3ef2a71aa45d9ff7ce6403f4f411fb3985f3221ed7726c248332:
          after_revision: 8
          aggregate_digest: "sha256:e10519592f5cf01747dde863e40dab71b320c667aac4d5d8eca0728240911bef"
          before_revision: 7
          command_digest: "sha256:40b6954ad69ba73dfa1ed073b9be3f97dc504f2564384baf8159133422c8a0db"
          effect_ids: []
          event_digests:
            - "sha256:39b083f4d83f2c143676ca5fc9c67aaed6663f3eca72402ff5cb0280e5b2340e"
          mutation_id: "semantic-stop:sha256:3099c126bacc3ef2a71aa45d9ff7ce6403f4f411fb3985f3221ed7726c248332"
        sha256:2e1cd2b88861c812521b53ddebabadee141ff68954c8d7e62d726f62517df691:
          after_revision: 7
          aggregate_digest: "sha256:3c09f0f27d12772628c9f5a291e8d166e69c6fefb0e319804ee5de0d123a7ed3"
          before_revision: 6
          command_digest: "sha256:c22be3c5cce58cb8f9c03b83306f094b333f881952edf21f8b253fd362056f2a"
          effect_ids: []
          event_digests:
            - "sha256:b6e6ebba24ba22f05e6795fa8528b45d55093653861227c7a5f2d0bd792e3b0d"
          mutation_id: "sha256:2e1cd2b88861c812521b53ddebabadee141ff68954c8d7e62d726f62517df691"
        sha256:82aa2e8b5820e89176be0a45d14fd143ad6e53471418da25c6f93213c5809b3b:
          after_revision: 15
          aggregate_digest: "sha256:dff774e3a75530620bc17b0cec2dafefa1e26d365b9e16c820ef76c14e00c7b6"
          before_revision: 14
          command_digest: "sha256:5d8a2114bb743c6b606c34b58fc619c2f5a006218e4e7048e47165b9e33d6c55"
          effect_ids: []
          event_digests:
            - "sha256:42b5de0037204f2da4eaeb099fe107bdd8eb2475f4dc8d282f6629e4c99fb101"
          mutation_id: "sha256:82aa2e8b5820e89176be0a45d14fd143ad6e53471418da25c6f93213c5809b3b"
        sha256:8c2cedb10e6f26d4802b790ba14bf8a4774d5b6ace76ae9fd62549234885e3c7:
          after_revision: 3
          aggregate_digest: "sha256:d19ae8e044fbeea123e3152e89277f4e69620e52d15d6aff449479227add2365"
          before_revision: 2
          command_digest: "sha256:7afc94bc6f3e77a2fef36d1bdd4e09ef89f04ee5a7866e084f1d26ad807a4a79"
          effect_ids: []
          event_digests:
            - "sha256:dcd1cdc97a7e6e1337cf1daf5acadc66c654b998e470744260ade32c31101927"
          mutation_id: "sha256:8c2cedb10e6f26d4802b790ba14bf8a4774d5b6ace76ae9fd62549234885e3c7"
        sha256:be3e95a42da02de1a5c4b6bd51c04dbc328167974cfd8cb882052b68a452ec03:
          after_revision: 21
          aggregate_digest: "sha256:b00925c31ff6ca51e0f0d92c1c40f3491ddcc336860e59231d0e6af2c6482e02"
          before_revision: 20
          command_digest: "sha256:210b97b44aaf96052e1e121eb35ecbcd12cd611e321efbacba79cefea73667ab"
          effect_ids: []
          event_digests:
            - "sha256:d1a53802af7154000486eaa15291a1db663d1354fdf17256c41a0a7d98d8d3ab"
          mutation_id: "sha256:be3e95a42da02de1a5c4b6bd51c04dbc328167974cfd8cb882052b68a452ec03"
        sha256:d2e0965041771fec66369bc816068597ad1026dc46df157f3cf90336c0f711f0:
          after_revision: 9
          aggregate_digest: "sha256:b4512984425ec7ef23aabe4fd4cbd99396eb25c96e95bf3a97ead039f6db1b99"
          before_revision: 8
          command_digest: "sha256:fd29b8a9a7a01d1aad74564d1c3ca24340159e14f1548c23c7b8a5d9a654b90a"
          effect_ids: []
          event_digests:
            - "sha256:0b04d3aa4531f6d7963f736313fc95841eb4241b5d8a9319245adb1bbccbf72e"
          mutation_id: "sha256:d2e0965041771fec66369bc816068597ad1026dc46df157f3cf90336c0f711f0"
        sha256:dd4e9bc456149c4181c55235a20ba967a40d301b8eea9b6a8ca46c9224870493:
          after_revision: 18
          aggregate_digest: "sha256:299a701a142e221e005602a2109b020d9bf5d9f0a060169c082391f7a8c6c231"
          before_revision: 17
          command_digest: "sha256:87bb91eac41d92fe4b2f5243331589bad5a991ccc1dbbd128e4dede2254081e0"
          effect_ids: []
          event_digests:
            - "sha256:370ff3f05db6600a7a9cc220cf31e19468341d709e881fb7a33ef50fcd8e4f64"
          mutation_id: "sha256:dd4e9bc456149c4181c55235a20ba967a40d301b8eea9b6a8ca46c9224870493"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:6d7876599957141f25661472e980fd983b2b004b22aae2c88bd4a6027de70b10"
          digest: "sha256:05b44fd1cde018f22e5ab1f4528e49a1998969715dca9db3a587d38e0b609eca"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:9e04bee0afea87e774d3045b829188d39ef4dbb6d7547ab84236454141487873"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "run_tests"
                  - "report_result"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources:
                  - "existing task-close branch primitives"
                  - "existing stable-file collision classifier"
                  - "existing runtime fixture helpers"
                  - "existing release script test conventions"
                scope_roots:
                  - "packages/agentplane/src/shared/stable-file.ts"
                  - "packages/agentplane/src/shared/stable-file.test.ts"
                  - "packages/agentplane/src/runner/usecases"
                  - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                  - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                  - "packages/agentplane/src/shared/runtime-env.ts"
                  - "packages/agentplane/src/shared/runtime-env.test.ts"
                  - "scripts/release/check-published-packages.mjs"
                  - "packages/agentplane/src/commands/release"
              expected_outputs:
                - "bounded-stable-task-read"
                - "protected-main-terminal-closure-routing"
                - "bounded-npm-propagation-backoff"
                - "active-node-runtime-precedence"
                - "focused-regression-tests"
              id: "implement-four-release-reliability-gaps"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:9b369d21693d936e03941ffa95fea6581d7a82d7e4e9da01756b661237284f02"
          digest: "sha256:a60a38f98cd58e44f93955a23a1585dc68c5b6c134f2a8bd6bffc6e086b920f5"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:9e04bee0afea87e774d3045b829188d39ef4dbb6d7547ab84236454141487873"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "run_tests"
                  - "report_result"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources:
                  - "existing task-close branch primitives"
                  - "existing stable-file collision classifier"
                  - "existing runtime fixture helpers"
                  - "existing release script test conventions"
                scope_roots:
                  - "packages/agentplane/src/shared/stable-file.ts"
                  - "packages/agentplane/src/shared/stable-file.test.ts"
                  - "packages/agentplane/src/runner/usecases"
                  - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                  - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                  - "packages/agentplane/src/shared/runtime-env.ts"
                  - "packages/agentplane/src/shared/runtime-env.test.ts"
                  - "scripts/release/check-published-packages.mjs"
                  - "packages/agentplane/src/commands/release"
                  - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
                  - "scripts/checks/run-pre-push-hook.mjs"
                  - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
              expected_outputs:
                - "bounded-stable-task-read"
                - "protected-main-terminal-closure-routing"
                - "bounded-npm-propagation-backoff"
                - "active-node-runtime-precedence"
                - "focused-regression-tests"
              id: "implement-four-release-reliability-gaps"
              optional: false
              required_inputs: []
      revision: 23
      schema_version: 1
      state: "ACTIVE"
      work_items:
        implement-four-release-reliability-gaps:
          attempt: 4
          claim_id: "sha256:95f763418e09a2adc21c2229cf08d1690ef852f6477739487216f6321de7c5ca"
          definition:
            contract_digest: "sha256:9e04bee0afea87e774d3045b829188d39ef4dbb6d7547ab84236454141487873"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources:
                - "existing task-close branch primitives"
                - "existing stable-file collision classifier"
                - "existing runtime fixture helpers"
                - "existing release script test conventions"
              scope_roots:
                - "packages/agentplane/src/shared/stable-file.ts"
                - "packages/agentplane/src/shared/stable-file.test.ts"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/shared/runtime-env.ts"
                - "packages/agentplane/src/shared/runtime-env.test.ts"
                - "scripts/release/check-published-packages.mjs"
                - "packages/agentplane/src/commands/release"
                - "packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts"
                - "scripts/checks/run-pre-push-hook.mjs"
                - "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
            expected_outputs:
              - "bounded-stable-task-read"
              - "protected-main-terminal-closure-routing"
              - "bounded-npm-propagation-backoff"
              - "active-node-runtime-precedence"
              - "focused-regression-tests"
            id: "implement-four-release-reliability-gaps"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 17
          state: "EXECUTING"
          validation: null
    digest: "sha256:9fd753ecacb82a2d940277e1c629d19f8dfbadd50ea488cafe1cc1cb6b633198"
    documents:
      contracts:
        sha256:9e04bee0afea87e774d3045b829188d39ef4dbb6d7547ab84236454141487873:
          acceptance_criteria:
            - "A task README replacement collision is retried only for the classified transient collision, with a small fixed attempt bound; persistent collision and all other errors still fail closed."
            - "When canonical terminal task artifacts are produced from protected main in branch_pr mode, the coordinator materializes or reuses the deterministic task-close branch before the guarded commit; non-protected and direct routes retain existing behavior."
            - "Published-package smoke tolerates realistic npm processing delay using validated bounded retry settings and a focused deterministic test that does not sleep in real time."
            - "The active compatible Node executable directory precedes stale inherited NVM_BIN for hook execution while explicit invocation PATH overrides remain authoritative."
            - "Focused regression tests cover the success and fail-closed boundaries for all four fixes, and no unrelated files change."
          objective: "Implement all four release reliability corrections in one coherent change without weakening fail-closed file identity checks or protected-branch policy."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/shared/stable-file.test.ts packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/shared/runtime-env.test.ts"
            - "bunx vitest run packages/agentplane/src/commands/release"
            - "bun run lint:core"
            - "bun run ci:local:full"
            - "git diff --check"
      intent:
        context: "In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI."
        objective: "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication"
    events:
      -
        command_digest: "sha256:d33be901e984d30acf5e95df09d85bbb814155604a74673ea2d95e3ec4d7d4ae"
        id: "capture:202609201929-W5XKXW:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609201929-W5XKXW"
        occurred_at: "2026-09-20T19:29:03.476Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609201929-W5XKXW"
        task_revision: 1
      -
        command_digest: "sha256:c1257d4b8d70edffd5d8e94ec313e6ee53ac2f4bbc9175f601efb82270de63b0"
        id: "result:sha256:68f0b53fe856a85f3fc23cba38582ba7de2e28b26913143a7de1aada15e791ee:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:68f0b53fe856a85f3fc23cba38582ba7de2e28b26913143a7de1aada15e791ee"
        occurred_at: "2026-09-20T19:30:29.961Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609201929-W5XKXW"
        task_revision: 2
      -
        command_digest: "sha256:7afc94bc6f3e77a2fef36d1bdd4e09ef89f04ee5a7866e084f1d26ad807a4a79"
        id: "sha256:8c2cedb10e6f26d4802b790ba14bf8a4774d5b6ace76ae9fd62549234885e3c7:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8c2cedb10e6f26d4802b790ba14bf8a4774d5b6ace76ae9fd62549234885e3c7"
        occurred_at: "2026-09-20T19:42:43.456Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609201929-W5XKXW"
        task_revision: 3
      -
        command_digest: "sha256:793dcea2a6179e41cb2ca1219d0e4da69f731c22bd284b16391717b99e9dc569"
        id: "kernel_work_item_materialization_required:sha256:223e205bff16418b49fde375bfaaaeb1567a7d4eb322888e43927b2476376a28:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:223e205bff16418b49fde375bfaaaeb1567a7d4eb322888e43927b2476376a28:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T19:42:47.117Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609201929-W5XKXW"
        task_revision: 4
      -
        command_digest: "sha256:73634967f2a7b39b29fdf0dd1d9f67d7a6b17a8d5bfc14b5bdee67b9db2c8dbc"
        id: "kernel_work_item_claim_required:sha256:ca53732280c5f355aaa3035eb9c65b1c6a62ea42a782625fb1568def9efbc021:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ca53732280c5f355aaa3035eb9c65b1c6a62ea42a782625fb1568def9efbc021:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T19:42:51.456Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609201929-W5XKXW"
        task_revision: 5
      -
        command_digest: "sha256:46be201731210e2cd1617d95ff72fc0e1d0ef9620bfc42f32c69c5622b4318fe"
        id: "kernel_work_item_execution_required:sha256:2a26978be2088d42d758ce4e9318f564a99506b671185390ab1605c8f1e3a81a:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2a26978be2088d42d758ce4e9318f564a99506b671185390ab1605c8f1e3a81a:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T19:43:52.882Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609201929-W5XKXW"
        task_revision: 6
      -
        command_digest: "sha256:c22be3c5cce58cb8f9c03b83306f094b333f881952edf21f8b253fd362056f2a"
        id: "sha256:2e1cd2b88861c812521b53ddebabadee141ff68954c8d7e62d726f62517df691:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2e1cd2b88861c812521b53ddebabadee141ff68954c8d7e62d726f62517df691"
        occurred_at: "2026-09-20T20:01:21.268Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609201929-W5XKXW"
        task_revision: 7
      -
        command_digest: "sha256:40b6954ad69ba73dfa1ed073b9be3f97dc504f2564384baf8159133422c8a0db"
        id: "semantic-stop:sha256:3099c126bacc3ef2a71aa45d9ff7ce6403f4f411fb3985f3221ed7726c248332:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:3099c126bacc3ef2a71aa45d9ff7ce6403f4f411fb3985f3221ed7726c248332"
        occurred_at: "2026-09-20T20:01:24.277Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609201929-W5XKXW"
        task_revision: 8
      -
        command_digest: "sha256:fd29b8a9a7a01d1aad74564d1c3ca24340159e14f1548c23c7b8a5d9a654b90a"
        id: "sha256:d2e0965041771fec66369bc816068597ad1026dc46df157f3cf90336c0f711f0:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d2e0965041771fec66369bc816068597ad1026dc46df157f3cf90336c0f711f0"
        occurred_at: "2026-09-20T20:07:40.348Z"
        payload_digest: "sha256:14ca5341800a9534e0fafd4e74a2cc88f4b2e5a3b008d958f8420632261ee823"
        task_id: "202609201929-W5XKXW"
        task_revision: 9
      -
        command_digest: "sha256:70aa381e80d3b0aabaf78e64eea2831af3b337d47e0d415db31fb9fb7b256156"
        id: "operator-recovery:resume-after-authority-delta:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "operator-recovery:resume-after-authority-delta"
        occurred_at: "2026-09-20T20:09:02.177Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202609201929-W5XKXW"
        task_revision: 10
      -
        command_digest: "sha256:d6fdc9a54e6fbade5e487da13180a22601c4785209c5a6186f965a93064b006d"
        id: "kernel_work_item_claim_required:sha256:aaed56c22ef823526a581b48e40643560750d37ac5971100abd720a6e3687b29:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:aaed56c22ef823526a581b48e40643560750d37ac5971100abd720a6e3687b29:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        occurred_at: "2026-09-20T20:09:11.065Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609201929-W5XKXW"
        task_revision: 11
      -
        command_digest: "sha256:47b00e8f3ca75e8bc8a875fff755d6f9b3382d305ef523d0396423f0bf8473f3"
        id: "kernel_work_item_execution_required:sha256:bab3a0506c47d235fe10e0e2a2567584d403e165564073868518d9c347d84207:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bab3a0506c47d235fe10e0e2a2567584d403e165564073868518d9c347d84207:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        occurred_at: "2026-09-20T20:09:14.273Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609201929-W5XKXW"
        task_revision: 12
      -
        command_digest: "sha256:4348b4ce089d8a12d5ddccec1314f6c3d74decfafd6e7cd1d17d9685b03f56e3"
        id: "operator-recovery:block-failed-recovery-issuance:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "operator-recovery:block-failed-recovery-issuance"
        occurred_at: "2026-09-20T20:10:20.806Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609201929-W5XKXW"
        task_revision: 13
      -
        command_digest: "sha256:24539439626b029e6d25e0c20ad4adaa698e8590f2ca0c477c61ee91937ea9e9"
        id: "amend:sha256:a60a38f98cd58e44f93955a23a1585dc68c5b6c134f2a8bd6bffc6e086b920f5:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:a60a38f98cd58e44f93955a23a1585dc68c5b6c134f2a8bd6bffc6e086b920f5"
        occurred_at: "2026-09-20T20:10:32.928Z"
        payload_digest: "sha256:8259797ac66bbc7897af7c4e6e9f86676edc7bf205c24d23dfaa65c59ade7a4d"
        task_id: "202609201929-W5XKXW"
        task_revision: 14
      -
        command_digest: "sha256:5d8a2114bb743c6b606c34b58fc619c2f5a006218e4e7048e47165b9e33d6c55"
        id: "sha256:82aa2e8b5820e89176be0a45d14fd143ad6e53471418da25c6f93213c5809b3b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:82aa2e8b5820e89176be0a45d14fd143ad6e53471418da25c6f93213c5809b3b"
        occurred_at: "2026-09-20T20:10:34.771Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202609201929-W5XKXW"
        task_revision: 15
      -
        command_digest: "sha256:15f836cd5a2cc1f8b7b2584947d3f7880843c4e3778a995b7829e9586ce43a57"
        id: "kernel_work_item_claim_required:sha256:5f01bcfcca2aade9dd67ae2fffa5982606672143bb89b54158ce2d3205fc3360:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5f01bcfcca2aade9dd67ae2fffa5982606672143bb89b54158ce2d3205fc3360:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        occurred_at: "2026-09-20T20:10:44.118Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609201929-W5XKXW"
        task_revision: 16
      -
        command_digest: "sha256:5dd1746f598874ae89ba739db78a0e568984d528cd0af0c7a88bb5f5e860e83c"
        id: "kernel_work_item_execution_required:sha256:b770c86df7f261991452d46c834c53ce385f32ab46d59278dd7d3c261436b710:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b770c86df7f261991452d46c834c53ce385f32ab46d59278dd7d3c261436b710:sha256:66bcce9e01fc98bb1b12aeb261415416738cffae365ecfa700f63d3515e3eda8"
        occurred_at: "2026-09-20T20:10:47.322Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202609201929-W5XKXW"
        task_revision: 17
      -
        command_digest: "sha256:87bb91eac41d92fe4b2f5243331589bad5a991ccc1dbbd128e4dede2254081e0"
        id: "sha256:dd4e9bc456149c4181c55235a20ba967a40d301b8eea9b6a8ca46c9224870493:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:dd4e9bc456149c4181c55235a20ba967a40d301b8eea9b6a8ca46c9224870493"
        occurred_at: "2026-09-20T20:31:53.838Z"
        payload_digest: "sha256:97dd300fed7241cbccfbd479502da8620794a6e68f31d13a864ff56f89088e0e"
        task_id: "202609201929-W5XKXW"
        task_revision: 18
      -
        command_digest: "sha256:f634e3e77a99b8ed0d3262cfa96b2c00f48a344b333d33a4ab46464db60f294d"
        id: "operator-recovery:block-lineage-repair:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "operator-recovery:block-lineage-repair"
        occurred_at: "2026-09-20T20:32:06.706Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609201929-W5XKXW"
        task_revision: 19
      -
        command_digest: "sha256:8a388c31feb1008055bbd2371d0da5d94ede7fb6ae459dd52c46b7321b33a8b9"
        id: "amend:sha256:3f77af704637f8f8619119bbc571d433100a5fce72ad0d77c9df419c4a6508be:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:3f77af704637f8f8619119bbc571d433100a5fce72ad0d77c9df419c4a6508be"
        occurred_at: "2026-09-20T20:32:19.629Z"
        payload_digest: "sha256:9f9fd53df4db505df930959fe138f0246034f405ae4816b9cd568fd3bdda97e5"
        task_id: "202609201929-W5XKXW"
        task_revision: 20
      -
        command_digest: "sha256:210b97b44aaf96052e1e121eb35ecbcd12cd611e321efbacba79cefea73667ab"
        id: "sha256:be3e95a42da02de1a5c4b6bd51c04dbc328167974cfd8cb882052b68a452ec03:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:be3e95a42da02de1a5c4b6bd51c04dbc328167974cfd8cb882052b68a452ec03"
        occurred_at: "2026-09-20T20:32:21.597Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202609201929-W5XKXW"
        task_revision: 21
      -
        command_digest: "sha256:4aaf9652382e610b3a49375126b3749c7ae33504b66ad14e73e39b08f4fea491"
        id: "kernel_work_item_claim_required:sha256:94f60d573edd9b99194441a32099c373652272499eefe21a0ae453a0fe87e155:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:94f60d573edd9b99194441a32099c373652272499eefe21a0ae453a0fe87e155:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5"
        occurred_at: "2026-09-20T20:32:32.158Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202609201929-W5XKXW"
        task_revision: 22
      -
        command_digest: "sha256:fd1e7a819b6efaab15dc8a3f6c869b6d4a84f5cc87467e961f945aff33724d0f"
        id: "kernel_work_item_execution_required:sha256:47e3fec5740a4369886463d49f1d0b39b431bde1dff1a92bedac12b76c0f5545:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:47e3fec5740a4369886463d49f1d0b39b431bde1dff1a92bedac12b76c0f5545:sha256:0bba111c9906bc82b01d40b7e03db4ff0c8ce59bcd162037838bf61e31592da5"
        occurred_at: "2026-09-20T20:32:35.387Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609201929-W5XKXW"
        task_revision: 23
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication

In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI.

## Scope

- In scope: In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI.
- Out of scope: unrelated refactors not required for "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
