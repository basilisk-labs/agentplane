---
id: "202609172016-5A9KVM"
title: "Complete canonical Task application coordinator for 0.7.10"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 22
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
mutation_scope: "unknown"
verify:
  - "bun run ci:local:full"
  - "bun run lint:core"
  - "bun run qualification:mixed-scope-lifecycle"
  - "bun run test:fast"
  - "bun run typecheck"
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "source_code"
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
    requirements_uncertainty: "material"
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
    - "material_requirements_uncertainty"
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
          - "repository_effect:repository_write"
          - "requirements_resolution"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "material"
          reversibility: "reversible"
      digest: "sha256:16a9c88f40a6388c2c9327e1b5bc954dc5a6ef6b185bca0c060e6023505f4c47"
      escalation_reasons:
        - "material_requirements_uncertainty"
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
        - "full_regression"
        - "hosted_integration"
        - "requirements_resolution"
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
      - "requirements_resolution"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-17T20:17:01.478Z"
doc_updated_by: "CODER"
description: "Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification."
sections:
  Summary: |-
    Complete canonical Task application coordinator for 0.7.10

    Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification.
  Scope: |-
    - In scope: Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification.
    - Out of scope: unrelated refactors not required for "Complete canonical Task application coordinator for 0.7.10".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Complete canonical Task application coordinator for 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Complete canonical Task application coordinator for 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "0114c8448541e1a387ff88f83891a87997b442ed"
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
              - "git_read"
              - "git_write"
              - "network"
              - "provider_read"
              - "provider_write"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b71401e3cc9e5cb872569e6606cdb7fe8eaf1fa062cb4e9db2e6b1c15d5e81f9"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:26c5726d237359c5786ea7f15a2ab081193f6012a29902c5dc25e58768ba8c10"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c060f58e7809f3491fcc81dd54a60e4d8152db34515ae7327bd35784f59ddf58"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/acr"
              - "packages/agentplane/src/commands/cleanup"
              - "packages/agentplane/src/commands/commit"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/hosted"
              - "packages/agentplane/src/commands/integration"
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/testkit/src"
              - "scripts/qualification"
            task_id: "202609172016-5A9KVM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run qualification:mixed-scope-lifecycle"
              - "bun run test:cli:critical"
              - "bun run test:fast"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/evaluator"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/integration packages/agentplane/src/commands/pr"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/task"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "git_write"
              - "network"
              - "provider_read"
              - "provider_write"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0bf37f03ace483d7f5f2b6c25901da17bc36cb4903370901bd72c399c1dfb402"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:26c5726d237359c5786ea7f15a2ab081193f6012a29902c5dc25e58768ba8c10"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c060f58e7809f3491fcc81dd54a60e4d8152db34515ae7327bd35784f59ddf58"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b71401e3cc9e5cb872569e6606cdb7fe8eaf1fa062cb4e9db2e6b1c15d5e81f9"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/acr"
              - "packages/agentplane/src/commands/cleanup"
              - "packages/agentplane/src/commands/commit"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/hosted"
              - "packages/agentplane/src/commands/integration"
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/testkit/src"
              - "scripts/qualification"
            task_id: "202609172016-5A9KVM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run qualification:mixed-scope-lifecycle"
              - "bun run test:cli:critical"
              - "bun run test:fast"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/evaluator"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/integration packages/agentplane/src/commands/pr"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/task"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.test.ts"
            evidence_digest: "sha256:6f9421e3810ef091a0c19e9885e98e69b8549e45f57664449ab77ca59ca4486e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "git_write"
              - "network"
              - "provider_read"
              - "provider_write"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6f4cf22093fce28e53e53c454788054e7d9e977c4932913709e56b3c8499e7ee"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:26c5726d237359c5786ea7f15a2ab081193f6012a29902c5dc25e58768ba8c10"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c060f58e7809f3491fcc81dd54a60e4d8152db34515ae7327bd35784f59ddf58"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:0bf37f03ace483d7f5f2b6c25901da17bc36cb4903370901bd72c399c1dfb402"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/acr"
              - "packages/agentplane/src/commands/cleanup"
              - "packages/agentplane/src/commands/commit"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/hosted"
              - "packages/agentplane/src/commands/integration"
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/testkit/src"
              - "scripts/qualification"
            task_id: "202609172016-5A9KVM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run qualification:mixed-scope-lifecycle"
              - "bun run test:cli:critical"
              - "bun run test:fast"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/evaluator"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/integration packages/agentplane/src/commands/pr"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/task"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
              - "packages/agentplane/src/commands/task/kernel-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.test.ts"
            evidence_digest: "sha256:30ae97ac9ba5aa2434b05ef2a1fb83e828f85961424dffe4f8dc3272bf0fbdc4"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "git_write"
              - "network"
              - "provider_read"
              - "provider_write"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9eda431e6856916988a550102a3ffc984653e4f9515aacda621ca7e4082b1da8"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:26c5726d237359c5786ea7f15a2ab081193f6012a29902c5dc25e58768ba8c10"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c060f58e7809f3491fcc81dd54a60e4d8152db34515ae7327bd35784f59ddf58"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6f4cf22093fce28e53e53c454788054e7d9e977c4932913709e56b3c8499e7ee"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:fb71efb8aa86e31dfeeda9836147b2f8ba1355bff3eace4e496ab8ed5760871e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/acr"
              - "packages/agentplane/src/commands/cleanup"
              - "packages/agentplane/src/commands/commit"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/hosted"
              - "packages/agentplane/src/commands/integration"
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/testkit/src"
              - "scripts/qualification"
            task_id: "202609172016-5A9KVM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run qualification:mixed-scope-lifecycle"
              - "bun run test:cli:critical"
              - "bun run test:fast"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/evaluator"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/integration packages/agentplane/src/commands/pr"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/task"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
            evidence_digest: "sha256:54b488458bd3b9b35bb05f4cf3105af90629f308e48caaadb0fd3da58825ed6f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "git_write"
              - "network"
              - "provider_read"
              - "provider_write"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:eff43e1f34c8e20944851aa4056c899d4dc59043066f24f8e32bba1a7cdfcea3"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:26c5726d237359c5786ea7f15a2ab081193f6012a29902c5dc25e58768ba8c10"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c060f58e7809f3491fcc81dd54a60e4d8152db34515ae7327bd35784f59ddf58"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9eda431e6856916988a550102a3ffc984653e4f9515aacda621ca7e4082b1da8"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9e420a2a28c5c4376122fb1dd09c95b4c8e8d96a1a43dd6858a07d37b772a755"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/acr"
              - "packages/agentplane/src/commands/cleanup"
              - "packages/agentplane/src/commands/commit"
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/hosted"
              - "packages/agentplane/src/commands/integration"
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/testkit/src"
              - "scripts/qualification"
            task_id: "202609172016-5A9KVM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run qualification:mixed-scope-lifecycle"
              - "bun run test:cli:critical"
              - "bun run test:fast"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/evaluator"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/integration packages/agentplane/src/commands/pr"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/task"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/testkit/src/cli-harness.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:26526d07815660e1aedee9028beb40937b3637a366641ea37b8086287f7ce5f4"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:fb71efb8aa86e31dfeeda9836147b2f8ba1355bff3eace4e496ab8ed5760871e"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:c060f58e7809f3491fcc81dd54a60e4d8152db34515ae7327bd35784f59ddf58"
        digest: "sha256:26c5726d237359c5786ea7f15a2ab081193f6012a29902c5dc25e58768ba8c10"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:c05dc0b1d24ac69a55f95211d627ef4c339fbd29b55fd9dd00f5d8e9ab453c42"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/task"
                - "packages/core/src/runner"
            expected_outputs:
              - "canonical-effect-coordinator-implemented"
            id: "canonical-effect-coordinator"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:4f9e07ba4d799bf54bf07711ac19288a1c5ef0dd043412b102f2f7fd5308276c"
            depends_on:
              - "canonical-effect-coordinator"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "git_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "git_commit"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/commit"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
            expected_outputs:
              - "canonical-repository-effects-implemented"
            id: "canonical-repository-effects"
            optional: false
            required_inputs:
              - "canonical-effect-coordinator-implemented"
          -
            contract_digest: "sha256:934bc78cd8c58320d8682f2d5dd830e22f4f917d301b06a58e6de2ab837e91d5"
            depends_on:
              - "canonical-repository-effects"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "git_write"
                - "provider_read"
                - "provider_write"
                - "network"
                - "run_tests"
              external_effects:
                - "git_remote"
                - "pull_request"
                - "hosted_ci"
                - "integration"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "git_commit"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/integration"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/hosted"
                - "packages/agentplane/src/commands/cleanup"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
            expected_outputs:
              - "canonical-provider-effects-implemented"
            id: "canonical-provider-effects"
            optional: false
            required_inputs:
              - "canonical-repository-effects-implemented"
          -
            contract_digest: "sha256:335ecb7db8aeb5d48fb118427799c45816904046413aef68a9bc93bcff55d7a6"
            depends_on:
              - "canonical-provider-effects"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "ci"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "docs/developer"
                - "docs/releases"
                - "packages/agentplane/src/commands/acr"
            expected_outputs:
              - "canonical-coordinator-qualified"
            id: "canonical-coordinator-qualification"
            optional: false
            required_inputs:
              - "canonical-provider-effects-implemented"
      effects: []
      final_validation: null
      id: "202609172016-5A9KVM"
      intent_digest: "sha256:b8755d81f5313d5334252d26bde9dbfda6662d790d6a525e1c577a4f0d4ee56d"
      migration_receipts: []
      mutation_receipts:
        capture:202609172016-5A9KVM:
          after_revision: 1
          aggregate_digest: "sha256:56811827712abf0031833377311283fcd7c9ddc9b15dd160ab38615f93924228"
          before_revision: 0
          command_digest: "sha256:b30e5d883a84c835fb5b876206440c144e26589e15c4155d6b5979018e547f0d"
          effect_ids: []
          event_digests:
            - "sha256:78228afaa68f083f400d23bd6652f3d871edff4f5f0f8cb65ba4ef6f0f129904"
          mutation_id: "capture:202609172016-5A9KVM"
        kernel_work_item_claim_required:sha256:ab2f68179a2ec0b2dab8459b50e3c5efd116b6c2ad28dd2709f7dfb28b6321a7:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:
          after_revision: 5
          aggregate_digest: "sha256:5bcd08a7eb616066dd09bcfbea318b7fc758c150e5a429724db5f6d1337ad9be"
          before_revision: 4
          command_digest: "sha256:a559dd2cbc916c5b59cf0bb59af60fc834611e602b5e8380929e323dd549e802"
          effect_ids: []
          event_digests:
            - "sha256:2c5d3d2de2394b136d3d4b015cd1d1b630a24db0dc04551cdfeb30b0c08ae40d"
          mutation_id: "kernel_work_item_claim_required:sha256:ab2f68179a2ec0b2dab8459b50e3c5efd116b6c2ad28dd2709f7dfb28b6321a7:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        kernel_work_item_claim_required:sha256:db501d3522140786b380ae57564086ae02d577fd599445a2476c1972a208f210:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:
          after_revision: 19
          aggregate_digest: "sha256:26bb5c9c55231d87e7688542f202598f6020d379e3cf5904329b345b9926ce60"
          before_revision: 18
          command_digest: "sha256:14aa2beac7494d082ea3e270aebb675d92034e1298fed7872fe9c66890dcdd94"
          effect_ids: []
          event_digests:
            - "sha256:3cc3fc25384c3b50610c4169f4160cf9e4c6c18791bfc7c072225946dc97063c"
          mutation_id: "kernel_work_item_claim_required:sha256:db501d3522140786b380ae57564086ae02d577fd599445a2476c1972a208f210:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        kernel_work_item_execution_required:sha256:69e96264359149328c1e43284ff24ce25dd0a90848c04e10dac3a16cfbe574c0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:
          after_revision: 6
          aggregate_digest: "sha256:221932b283d03cfa1c903d0c9eb6e158d720315cc02271ad6b1ac3c97e20b212"
          before_revision: 5
          command_digest: "sha256:03180e954dddfad63c7b59dae30b24425b2150055b516d6b80bd3b73cbd8a2c8"
          effect_ids: []
          event_digests:
            - "sha256:e8065bca73e46feed0cf22181d6fba68e762728eae308706eadd2d5b10705100"
          mutation_id: "kernel_work_item_execution_required:sha256:69e96264359149328c1e43284ff24ce25dd0a90848c04e10dac3a16cfbe574c0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        kernel_work_item_execution_required:sha256:9f5270ca81efb77c5964e278e2c26443754ef5426787f73dc3a95afb2e1c8921:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:
          after_revision: 20
          aggregate_digest: "sha256:fbf939103ba692e59b4ffbb68bbf31af2dd448dc2c3f59612de9f985e96ada17"
          before_revision: 19
          command_digest: "sha256:d5adc18e3566ef4ded46c6a9112908b0dcfa38cce9e5cec93b57dbba58e63bac"
          effect_ids: []
          event_digests:
            - "sha256:897ffc4520159a9a3d8bbc549c487b230f0c214d435d412db323aed9f6bcf89e"
          mutation_id: "kernel_work_item_execution_required:sha256:9f5270ca81efb77c5964e278e2c26443754ef5426787f73dc3a95afb2e1c8921:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        kernel_work_item_execution_required:sha256:bee02616e17dada657accf0e7792202d5600b55d8330c4bcfa6824e16dad8d28:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:
          after_revision: 13
          aggregate_digest: "sha256:19b8b29074ee63acaef932a00fbf35fc0d33177cf4726a43ea5aef4e8d08bcdd"
          before_revision: 12
          command_digest: "sha256:7df7a15a476681f14898374696e9dc1018537886650b2a41bff8995f727da6b0"
          effect_ids: []
          event_digests:
            - "sha256:cd482c8fb8fb2ab933c555a01200a8e159ff989ea0d16131b586ebd43bea1b7d"
          mutation_id: "kernel_work_item_execution_required:sha256:bee02616e17dada657accf0e7792202d5600b55d8330c4bcfa6824e16dad8d28:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        kernel_work_item_inspection_required:sha256:29508c044107edbe19eba339c7e170aa931a7f0c6c0c1a235b6fb47a38ca60f6:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:
          after_revision: 16
          aggregate_digest: "sha256:7e2539a5a6e98f38522c0450b0ca4e78dd5669bcbc48cc2a8167a093825d756d"
          before_revision: 15
          command_digest: "sha256:042066d96f51dd0f6b2dffefa629189e62b9f188b728c53e2f2683d8036a8734"
          effect_ids: []
          event_digests:
            - "sha256:a70c7cd9b9395844679201a69d1d594d59e76d2a3cd94e75439b8f65a10fcac8"
          mutation_id: "kernel_work_item_inspection_required:sha256:29508c044107edbe19eba339c7e170aa931a7f0c6c0c1a235b6fb47a38ca60f6:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        kernel_work_item_inspection_required:sha256:9236854fc56ba52936778cd0cb16a4fbe7e10521a40e1d3d49cef2894c45f2b3:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:
          after_revision: 9
          aggregate_digest: "sha256:21bd4d05d5eb00edba43cfc5d6ee7abc1cb2039f5270c30eaf27f318f829bcb7"
          before_revision: 8
          command_digest: "sha256:547cef8e5129cb8fcdfc0e74946d82b9f755fc551466179ff06b4e1f8e79e503"
          effect_ids: []
          event_digests:
            - "sha256:13853f67d50b473e97c6d745021862a5ff3fb7f245ba9c5a20aa7271cc54fbd7"
          mutation_id: "kernel_work_item_inspection_required:sha256:9236854fc56ba52936778cd0cb16a4fbe7e10521a40e1d3d49cef2894c45f2b3:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        kernel_work_item_materialization_required:sha256:0fa173070cf6f74de85e8d495c3e33470a8249a6d9506d368fb9bff4a003beb0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:
          after_revision: 4
          aggregate_digest: "sha256:1945c1adce0a1e2bb957953666a29a3349a948dc9bf621c3556483b5cc9ee725"
          before_revision: 3
          command_digest: "sha256:ceed4b275110597fd9fad9baf5891b530c65e85df8d573cc252bb7d86a4ffa80"
          effect_ids: []
          event_digests:
            - "sha256:bab40bdb14ce4bb9f7b037de4d1c1f554c659b69377f595b8f7a2bbe47034295"
          mutation_id: "kernel_work_item_materialization_required:sha256:0fa173070cf6f74de85e8d495c3e33470a8249a6d9506d368fb9bff4a003beb0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        kernel_work_item_rework_claim_required:sha256:eca98de3d100fa1cd90a046c88d93340104520bcabee00b98cb1dfa64e77d9b9:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:
          after_revision: 12
          aggregate_digest: "sha256:331db53d59dc939470391d61883fd5154d8f292a1b4380e66d42925c8887864f"
          before_revision: 11
          command_digest: "sha256:665a454873f8cd87a837ab979fb7d6fe8c26c2c85c2872b8f5fbb9904a912faf"
          effect_ids: []
          event_digests:
            - "sha256:72f425028f1125af0a2990bd280b8dc72a77f45ab9dadbacf0dd8686520d3b9f"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:eca98de3d100fa1cd90a046c88d93340104520bcabee00b98cb1dfa64e77d9b9:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        result:sha256:84f70b748e44fd405c03b6ecf205829e05bf9f8c8fb164aba51c21c662fd3da2:
          after_revision: 2
          aggregate_digest: "sha256:e398bd8affbf42ee05a6fcd25642faaa69a1df3ce3ac9ae973006277e4515915"
          before_revision: 1
          command_digest: "sha256:6a0f56347949a0a35c6439fde8a4338bab4322ac8de44c82700e7b30b7aabb04"
          effect_ids: []
          event_digests:
            - "sha256:fafaf78071e3bb57e38a52d3722349b14bc60ae30b5b802557e8d5f634abea2e"
          mutation_id: "result:sha256:84f70b748e44fd405c03b6ecf205829e05bf9f8c8fb164aba51c21c662fd3da2"
        result:sha256:93d08a8aaee7eef0c483ff01e9356c02bbdf91b432254109c1bbaf703904ca2b:
          after_revision: 15
          aggregate_digest: "sha256:ef72ab7fb09651a9e6999a55471c8e6fe76acc2bb5e613813a9a5965320d305f"
          before_revision: 14
          command_digest: "sha256:6dece20f0169cab4517f9eb30938aa902efbb0b03070e927e12092d57d876895"
          effect_ids: []
          event_digests:
            - "sha256:e2fa9430fe7a5d122af8f57a71c034590ba9b3a9c91300a852615214abe9ddf6"
          mutation_id: "result:sha256:93d08a8aaee7eef0c483ff01e9356c02bbdf91b432254109c1bbaf703904ca2b"
        result:sha256:bedc2cd5fc3e1626db99bd92006011feb6368d68da8a667922b729b94b0c93e3:
          after_revision: 8
          aggregate_digest: "sha256:1930686fe70011d01f328baff3250a60fcbfd8e346c2dd6fad94cd6e2d3af61e"
          before_revision: 7
          command_digest: "sha256:4fd1f9d35b1cd7c5a30ad5ec793d825cb5c4369b8c4f933ef51a8e2eb66a90bb"
          effect_ids: []
          event_digests:
            - "sha256:1bb3a18cb4037afec8c5fc6858f7d000e2150104840fa14366ccef926b3f3742"
          mutation_id: "result:sha256:bedc2cd5fc3e1626db99bd92006011feb6368d68da8a667922b729b94b0c93e3"
        sha256:15b34778f564154a939e23650ce138727de4363f2ee35894ec607f7cae128e99:
          after_revision: 3
          aggregate_digest: "sha256:d91d6dd6e7619fce47299c479792b171ac40a191c2ff5d0176a7ac64c204bad4"
          before_revision: 2
          command_digest: "sha256:96976245793e38d7911951913e0c2664cdb1f8ab462930fddf1f6a750606bd52"
          effect_ids: []
          event_digests:
            - "sha256:c8f12263c2d40358dc61742e79de5a496389ad8e31b8f197700a483206c39af7"
          mutation_id: "sha256:15b34778f564154a939e23650ce138727de4363f2ee35894ec607f7cae128e99"
        sha256:47b25713aebf05a99d5b77d9025890dec593c853396ccf4eda385aceeebc1146:
          after_revision: 21
          aggregate_digest: "sha256:5e0046987505e96a56917dddb07f583666dd12371911b7604741331e87f2fa90"
          before_revision: 20
          command_digest: "sha256:9f7236a0c7a2dd66e6351bf30e5f026325b462b98d6935cfdf3e0fe1540e719f"
          effect_ids: []
          event_digests:
            - "sha256:0acd9f57df80654e178f7e6ce1ea50b68b8df6a6f2c1b54d530216203323575a"
          mutation_id: "sha256:47b25713aebf05a99d5b77d9025890dec593c853396ccf4eda385aceeebc1146"
        sha256:a3ab3262a9dc33f0c0dca064aa7557b074b857b6c0cc2ee23e779986070ba5e4:
          after_revision: 14
          aggregate_digest: "sha256:b5480bddc4a92555a984a7d9ffa6484a26c05b0ab0b4fdef40bbdabd9f80f929"
          before_revision: 13
          command_digest: "sha256:2b3cb7ad32a6dba660fc36b07e602a0cd6e7056901786f10ba7ae96d9e01b306"
          effect_ids: []
          event_digests:
            - "sha256:21d064340ade0569f542f5301324c41d22d8f2f75c24746188f7d66d45933243"
          mutation_id: "sha256:a3ab3262a9dc33f0c0dca064aa7557b074b857b6c0cc2ee23e779986070ba5e4"
        sha256:a5f7c5c64698d5abd0ad264b4e863fa85e7e3a401bce549aef661aa3c7bbbd5a:
          after_revision: 7
          aggregate_digest: "sha256:3f46f7423e1be7d12e35f5a754f9c05a6c6f0630f094f0c1001a1e5122cd1f1e"
          before_revision: 6
          command_digest: "sha256:3f6ab08968f274d46238d360106a9ccec2cc5d24cf0b407ae0d03d870a9331ce"
          effect_ids: []
          event_digests:
            - "sha256:13d5bfc3e4e86a9e50251b26bc1fb27d4c8eee888337881fbaae3794f9441fe2"
          mutation_id: "sha256:a5f7c5c64698d5abd0ad264b4e863fa85e7e3a401bce549aef661aa3c7bbbd5a"
        sha256:e0843c9b5067d42620ddc0d8709c84e43915171945a03dab1558b2a96544c85a:
          after_revision: 22
          aggregate_digest: "sha256:44bb09024251e33842ea6d4f6a3f1b9c2bf4cc5524ac83c8400b733bf1a48655"
          before_revision: 21
          command_digest: "sha256:175603aabc6862befa2a95ce3b39c59c5cef9da00d60de234850134a08eddccb"
          effect_ids: []
          event_digests:
            - "sha256:224e8a472448b1878dc2a6db4e7c6f7517e7c694edb3fba2e5e008aa578cef73"
          mutation_id: "sha256:e0843c9b5067d42620ddc0d8709c84e43915171945a03dab1558b2a96544c85a"
        validation-resolution:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e:
          after_revision: 11
          aggregate_digest: "sha256:7425c76e109cc7e5c0889441ec8d64073bc6ddde1caf68493f597f8648c9b443"
          before_revision: 10
          command_digest: "sha256:aa5849c14cd8511d3064b4c434a8ccfe58b6e918691f545c6ecdf02da0f592e2"
          effect_ids: []
          event_digests:
            - "sha256:240876eefde31ae2dffcc6a8d0b982e809722ca327d040d9f5b59de29999fa84"
          mutation_id: "validation-resolution:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e"
        validation-resolution:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183:
          after_revision: 18
          aggregate_digest: "sha256:be111abeee763bf566f1f4359c279d06433f2d53899d1702d0a062e061581548"
          before_revision: 17
          command_digest: "sha256:b4602a3e393931976862a1b7dcf49629e2c20ee72a5a1c50bbadc81745709036"
          effect_ids: []
          event_digests:
            - "sha256:487ea87610e779d940b014e131cccf887b7f30675c3d10fe4de1f953ecc63aa0"
          mutation_id: "validation-resolution:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183"
        validation:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e:
          after_revision: 10
          aggregate_digest: "sha256:2809be6bf58c7e72414bdf763766dd75c2ca028d60b0075f93bd99a22e310fb0"
          before_revision: 9
          command_digest: "sha256:805607e4183aa32fe57a0a54a4f79056fa641dedb1f2b000a18e1b324e53e678"
          effect_ids: []
          event_digests:
            - "sha256:31614587461263ed7314c51c3c96bf5ec337bbee6c4934875b66215fc3dc5c8e"
          mutation_id: "validation:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e"
        validation:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183:
          after_revision: 17
          aggregate_digest: "sha256:639595f157691467aa49a15480ddc0b7012dc9b05d3c70427f4a5bb3c51b784b"
          before_revision: 16
          command_digest: "sha256:cc5ecd3783a9e17eff69e3869044eeced9adf9181a38e398f4bbae642e7bad01"
          effect_ids: []
          event_digests:
            - "sha256:cf7bba089062fb249f55e6ab8b512e427cee7dcbb5521104be4249bbbe44ed2a"
          mutation_id: "validation:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183"
      plan_history: []
      revision: 22
      schema_version: 1
      state: "ACTIVE"
      work_items:
        canonical-coordinator-qualification:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:335ecb7db8aeb5d48fb118427799c45816904046413aef68a9bc93bcff55d7a6"
            depends_on:
              - "canonical-provider-effects"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "ci"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "docs/developer"
                - "docs/releases"
                - "packages/agentplane/src/commands/acr"
            expected_outputs:
              - "canonical-coordinator-qualified"
            id: "canonical-coordinator-qualification"
            optional: false
            required_inputs:
              - "canonical-provider-effects-implemented"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        canonical-effect-coordinator:
          attempt: 2
          claim_id: "sha256:06253bd97f6214fb24106f920f0b7efef60b585864a22fbdfcf4f2e47d4809ef"
          definition:
            contract_digest: "sha256:c05dc0b1d24ac69a55f95211d627ef4c339fbd29b55fd9dd00f5d8e9ab453c42"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/task"
                - "packages/core/src/runner"
            expected_outputs:
              - "canonical-effect-coordinator-implemented"
            id: "canonical-effect-coordinator"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:bc50b6df0f446d60f6c51595813879cdf954504a6c98ac638bf7de291be26156"
              id: "canonical-effect-coordinator-implemented"
              kind: "repository_diff"
              plan_revision: 1
              repository_fingerprint: "sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
              task_id: "202609172016-5A9KVM"
              work_item_id: "canonical-effect-coordinator"
          result_digest: "sha256:89bcbc1137e524d53fdc8fe08c373af18915942be43a4e3012ee2a614bea5de9"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:025b955685890c3f0fd061edeccef3bd497671c83f28af0ba97ff3420af63186"
              - "sha256:f85a0962e46cc18e0bcb3c7e0a5921577feaac1e6fd1cfe0d675bd472cc1c869"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:1f40cffea9b548ba9de9d7412a6ada0162dcebb1dd436f4ae454f9fe5996e386"
              environment_digest: "sha256:920fbe87881396302eedd447f2b17ca25695822bff54c23770392b50361753eb"
              implementation_identity: "sha256:89bcbc1137e524d53fdc8fe08c373af18915942be43a4e3012ee2a614bea5de9"
              toolchain_digest: "sha256:d7d21b7137c5ffe58fa32ac5165e9a1e93fb1919fc0f4db76103927e6b8ff0fe"
            observed_at: "2026-09-17T20:30:26.460Z"
            status: "PASSED"
        canonical-provider-effects:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:934bc78cd8c58320d8682f2d5dd830e22f4f917d301b06a58e6de2ab837e91d5"
            depends_on:
              - "canonical-repository-effects"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "git_write"
                - "provider_read"
                - "provider_write"
                - "network"
                - "run_tests"
              external_effects:
                - "git_remote"
                - "pull_request"
                - "hosted_ci"
                - "integration"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "git_commit"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/integration"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/hosted"
                - "packages/agentplane/src/commands/cleanup"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
            expected_outputs:
              - "canonical-provider-effects-implemented"
            id: "canonical-provider-effects"
            optional: false
            required_inputs:
              - "canonical-repository-effects-implemented"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        canonical-repository-effects:
          attempt: 1
          claim_id: "sha256:768ed1986cdc98bdb37349a22db9a26700c7a866cc989ea3bbf236bab7aa11d6"
          definition:
            contract_digest: "sha256:4f9e07ba4d799bf54bf07711ac19288a1c5ef0dd043412b102f2f7fd5308276c"
            depends_on:
              - "canonical-effect-coordinator"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "git_write"
                - "run_tests"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "git_commit"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/commit"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
            expected_outputs:
              - "canonical-repository-effects-implemented"
            id: "canonical-repository-effects"
            optional: false
            required_inputs:
              - "canonical-effect-coordinator-implemented"
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:8e9d2a4ca1785b63978d28e8ffbd9d0e03fca564daa21611719fce13c0c30c0f"
    documents:
      contracts:
        sha256:335ecb7db8aeb5d48fb118427799c45816904046413aef68a9bc93bcff55d7a6:
          acceptance_criteria:
            - "Canonical task status and ACR evidence expose the real commit, verification, evaluator, provider, integration, hosted-close, and cleanup outcomes used for completion."
            - "Focused tests cover direct and branch_pr success, authority denial, stale state, crash replay, effect-in-doubt reconciliation, evaluator rework, hosted failure, and cleanup gating."
            - "The packaged mixed-scope lifecycle passes on a clean committed candidate and observes an AgentPlane-owned product commit."
            - "Developer and release documentation describe the implemented coordinator boundary without claiming unsupported migration coverage."
            - "The full local CI and package install smoke suites pass before PR publication."
          objective: "Complete projections, recovery coverage, documentation, and release qualification so the canonical route proves direct and branch_pr repository ownership end to end without compatibility-only fixture choreography."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bun run lint"
            - "bun run test:fast"
            - "bun run qualification:mixed-scope-lifecycle"
            - "bun run ci:local:full"
            - "bun run package:install-smoke"
        sha256:4f9e07ba4d799bf54bf07711ac19288a1c5ef0dd043412b102f2f7fd5308276c:
          acceptance_criteria:
            - "Canonical implementation results cause an AgentPlane-owned commit only after allowed-scope and repository-observation checks pass."
            - "Commit SHA, tree identity, verification evidence, and evaluator target identity are projected back into canonical task evidence before completion."
            - "Direct mode reaches terminal state only after the recorded commit and required checks are read back; branch_pr mode exposes the same evidence to subsequent provider effects."
            - "Repository drift, stale semantic output, dirty unapproved paths, failed checks, and evaluator rework remain fail-closed."
          objective: "Connect canonical direct and branch work to the mature AgentPlane-owned commit, verification, evaluator, and repository readback operations, preserving dirty-baseline, candidate identity, allowed-path, and stale-result defenses."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bun run lint"
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/evaluator"
            - "bun run test:cli:critical"
        sha256:934bc78cd8c58320d8682f2d5dd830e22f4f917d301b06a58e6de2ab837e91d5:
          acceptance_criteria:
            - "PR publication, head refresh, integration enqueue, merge readback, hosted close, and workspace cleanup each require their existing exact authority."
            - "Every external effect records its request identity and provider readback before the Kernel advances."
            - "Unknown provider outcome becomes effect-in-doubt and blocks replay until reconciliation rather than retrying blindly."
            - "The canonical path preserves exact-head, base-checkout, hosted-CI, merge-object, and cleanup safety checks from the mature branch supervisor."
          objective: "Route canonical branch_pr effects through the existing publication, PR, integration, hosted-close, and cleanup adapters with their existing explicit authority and provider readback gates."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task packages/agentplane/src/commands/integration packages/agentplane/src/commands/pr"
            - "bun run test:cli:critical"
        sha256:c05dc0b1d24ac69a55f95211d627ef4c339fbd29b55fd9dd00f5d8e9ab453c42:
          acceptance_criteria:
            - "The Task Kernel remains the sole lifecycle and authority state owner and imports no effect adapter."
            - "The coordinator has an explicit idempotency key and distinguishes prepared, dispatched, observed-success, observed-failure, and effect-in-doubt outcomes."
            - "A crash before dispatch, during an ambiguous dispatch, and after observed success is replay-safe and never silently repeats an unsafe effect."
            - "Canonical advance and managed run use the same coordinator rather than separate lifecycle engines."
          objective: "Add one application-layer coordinator that consumes Task Kernel next actions, schedules typed effects, durably records dispatch and outcome identity, and resumes the Kernel without moving filesystem, Git, process, clock, or provider ownership into the pure domain layer."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/kernel-run.test.ts"
            - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/task"
      intent:
        context: "Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification."
        objective: "Complete canonical Task application coordinator for 0.7.10"
    events:
      -
        command_digest: "sha256:b30e5d883a84c835fb5b876206440c144e26589e15c4155d6b5979018e547f0d"
        id: "capture:202609172016-5A9KVM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609172016-5A9KVM"
        occurred_at: "2026-09-17T20:17:01.457Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609172016-5A9KVM"
        task_revision: 1
      -
        command_digest: "sha256:6a0f56347949a0a35c6439fde8a4338bab4322ac8de44c82700e7b30b7aabb04"
        id: "result:sha256:84f70b748e44fd405c03b6ecf205829e05bf9f8c8fb164aba51c21c662fd3da2:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:84f70b748e44fd405c03b6ecf205829e05bf9f8c8fb164aba51c21c662fd3da2"
        occurred_at: "2026-09-17T20:20:55.473Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609172016-5A9KVM"
        task_revision: 2
      -
        command_digest: "sha256:96976245793e38d7911951913e0c2664cdb1f8ab462930fddf1f6a750606bd52"
        id: "sha256:15b34778f564154a939e23650ce138727de4363f2ee35894ec607f7cae128e99:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:15b34778f564154a939e23650ce138727de4363f2ee35894ec607f7cae128e99"
        occurred_at: "2026-09-17T20:21:04.181Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609172016-5A9KVM"
        task_revision: 3
      -
        command_digest: "sha256:ceed4b275110597fd9fad9baf5891b530c65e85df8d573cc252bb7d86a4ffa80"
        id: "kernel_work_item_materialization_required:sha256:0fa173070cf6f74de85e8d495c3e33470a8249a6d9506d368fb9bff4a003beb0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0fa173070cf6f74de85e8d495c3e33470a8249a6d9506d368fb9bff4a003beb0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        occurred_at: "2026-09-17T20:21:12.801Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609172016-5A9KVM"
        task_revision: 4
      -
        command_digest: "sha256:a559dd2cbc916c5b59cf0bb59af60fc834611e602b5e8380929e323dd549e802"
        id: "kernel_work_item_claim_required:sha256:ab2f68179a2ec0b2dab8459b50e3c5efd116b6c2ad28dd2709f7dfb28b6321a7:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ab2f68179a2ec0b2dab8459b50e3c5efd116b6c2ad28dd2709f7dfb28b6321a7:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        occurred_at: "2026-09-17T20:21:16.540Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609172016-5A9KVM"
        task_revision: 5
      -
        command_digest: "sha256:03180e954dddfad63c7b59dae30b24425b2150055b516d6b80bd3b73cbd8a2c8"
        id: "kernel_work_item_execution_required:sha256:69e96264359149328c1e43284ff24ce25dd0a90848c04e10dac3a16cfbe574c0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:69e96264359149328c1e43284ff24ce25dd0a90848c04e10dac3a16cfbe574c0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        occurred_at: "2026-09-17T20:21:19.376Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609172016-5A9KVM"
        task_revision: 6
      -
        command_digest: "sha256:3f6ab08968f274d46238d360106a9ccec2cc5d24cf0b407ae0d03d870a9331ce"
        id: "sha256:a5f7c5c64698d5abd0ad264b4e863fa85e7e3a401bce549aef661aa3c7bbbd5a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a5f7c5c64698d5abd0ad264b4e863fa85e7e3a401bce549aef661aa3c7bbbd5a"
        occurred_at: "2026-09-17T20:27:11.742Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609172016-5A9KVM"
        task_revision: 7
      -
        command_digest: "sha256:4fd1f9d35b1cd7c5a30ad5ec793d825cb5c4369b8c4f933ef51a8e2eb66a90bb"
        id: "result:sha256:bedc2cd5fc3e1626db99bd92006011feb6368d68da8a667922b729b94b0c93e3:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:bedc2cd5fc3e1626db99bd92006011feb6368d68da8a667922b729b94b0c93e3"
        occurred_at: "2026-09-17T20:27:15.528Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609172016-5A9KVM"
        task_revision: 8
      -
        command_digest: "sha256:547cef8e5129cb8fcdfc0e74946d82b9f755fc551466179ff06b4e1f8e79e503"
        id: "kernel_work_item_inspection_required:sha256:9236854fc56ba52936778cd0cb16a4fbe7e10521a40e1d3d49cef2894c45f2b3:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:9236854fc56ba52936778cd0cb16a4fbe7e10521a40e1d3d49cef2894c45f2b3:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        occurred_at: "2026-09-17T20:27:18.417Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609172016-5A9KVM"
        task_revision: 9
      -
        command_digest: "sha256:805607e4183aa32fe57a0a54a4f79056fa641dedb1f2b000a18e1b324e53e678"
        id: "validation:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e"
        occurred_at: "2026-09-17T20:28:08.796Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609172016-5A9KVM"
        task_revision: 10
      -
        command_digest: "sha256:aa5849c14cd8511d3064b4c434a8ccfe58b6e918691f545c6ecdf02da0f592e2"
        id: "validation-resolution:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e"
        occurred_at: "2026-09-17T20:28:10.771Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609172016-5A9KVM"
        task_revision: 11
      -
        command_digest: "sha256:665a454873f8cd87a837ab979fb7d6fe8c26c2c85c2872b8f5fbb9904a912faf"
        id: "kernel_work_item_rework_claim_required:sha256:eca98de3d100fa1cd90a046c88d93340104520bcabee00b98cb1dfa64e77d9b9:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:eca98de3d100fa1cd90a046c88d93340104520bcabee00b98cb1dfa64e77d9b9:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        occurred_at: "2026-09-17T20:28:14.565Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609172016-5A9KVM"
        task_revision: 12
      -
        command_digest: "sha256:7df7a15a476681f14898374696e9dc1018537886650b2a41bff8995f727da6b0"
        id: "kernel_work_item_execution_required:sha256:bee02616e17dada657accf0e7792202d5600b55d8330c4bcfa6824e16dad8d28:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bee02616e17dada657accf0e7792202d5600b55d8330c4bcfa6824e16dad8d28:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        occurred_at: "2026-09-17T20:28:17.432Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609172016-5A9KVM"
        task_revision: 13
      -
        command_digest: "sha256:2b3cb7ad32a6dba660fc36b07e602a0cd6e7056901786f10ba7ae96d9e01b306"
        id: "sha256:a3ab3262a9dc33f0c0dca064aa7557b074b857b6c0cc2ee23e779986070ba5e4:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a3ab3262a9dc33f0c0dca064aa7557b074b857b6c0cc2ee23e779986070ba5e4"
        occurred_at: "2026-09-17T20:29:57.848Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609172016-5A9KVM"
        task_revision: 14
      -
        command_digest: "sha256:6dece20f0169cab4517f9eb30938aa902efbb0b03070e927e12092d57d876895"
        id: "result:sha256:93d08a8aaee7eef0c483ff01e9356c02bbdf91b432254109c1bbaf703904ca2b:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:93d08a8aaee7eef0c483ff01e9356c02bbdf91b432254109c1bbaf703904ca2b"
        occurred_at: "2026-09-17T20:30:01.707Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609172016-5A9KVM"
        task_revision: 15
      -
        command_digest: "sha256:042066d96f51dd0f6b2dffefa629189e62b9f188b728c53e2f2683d8036a8734"
        id: "kernel_work_item_inspection_required:sha256:29508c044107edbe19eba339c7e170aa931a7f0c6c0c1a235b6fb47a38ca60f6:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:29508c044107edbe19eba339c7e170aa931a7f0c6c0c1a235b6fb47a38ca60f6:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        occurred_at: "2026-09-17T20:30:04.631Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609172016-5A9KVM"
        task_revision: 16
      -
        command_digest: "sha256:cc5ecd3783a9e17eff69e3869044eeced9adf9181a38e398f4bbae642e7bad01"
        id: "validation:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183"
        occurred_at: "2026-09-17T20:30:32.744Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609172016-5A9KVM"
        task_revision: 17
      -
        command_digest: "sha256:b4602a3e393931976862a1b7dcf49629e2c20ee72a5a1c50bbadc81745709036"
        id: "validation-resolution:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183"
        occurred_at: "2026-09-17T20:30:34.688Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609172016-5A9KVM"
        task_revision: 18
      -
        command_digest: "sha256:14aa2beac7494d082ea3e270aebb675d92034e1298fed7872fe9c66890dcdd94"
        id: "kernel_work_item_claim_required:sha256:db501d3522140786b380ae57564086ae02d577fd599445a2476c1972a208f210:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:db501d3522140786b380ae57564086ae02d577fd599445a2476c1972a208f210:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        occurred_at: "2026-09-17T20:30:38.539Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609172016-5A9KVM"
        task_revision: 19
      -
        command_digest: "sha256:d5adc18e3566ef4ded46c6a9112908b0dcfa38cce9e5cec93b57dbba58e63bac"
        id: "kernel_work_item_execution_required:sha256:9f5270ca81efb77c5964e278e2c26443754ef5426787f73dc3a95afb2e1c8921:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9f5270ca81efb77c5964e278e2c26443754ef5426787f73dc3a95afb2e1c8921:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        occurred_at: "2026-09-17T20:30:41.392Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609172016-5A9KVM"
        task_revision: 20
      -
        command_digest: "sha256:9f7236a0c7a2dd66e6351bf30e5f026325b462b98d6935cfdf3e0fe1540e719f"
        id: "sha256:47b25713aebf05a99d5b77d9025890dec593c853396ccf4eda385aceeebc1146:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:47b25713aebf05a99d5b77d9025890dec593c853396ccf4eda385aceeebc1146"
        occurred_at: "2026-09-17T22:42:48.137Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202609172016-5A9KVM"
        task_revision: 21
      -
        command_digest: "sha256:175603aabc6862befa2a95ce3b39c59c5cef9da00d60de234850134a08eddccb"
        id: "sha256:e0843c9b5067d42620ddc0d8709c84e43915171945a03dab1558b2a96544c85a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e0843c9b5067d42620ddc0d8709c84e43915171945a03dab1558b2a96544c85a"
        occurred_at: "2026-09-17T22:46:55.592Z"
        payload_digest: "sha256:be3663b3e19de3c102755ce6c68afb0345ff05ad1ecd659f29a48e6a01df736c"
        task_id: "202609172016-5A9KVM"
        task_revision: 22
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Complete canonical Task application coordinator for 0.7.10

Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification.

## Scope

- In scope: Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification.
- Out of scope: unrelated refactors not required for "Complete canonical Task application coordinator for 0.7.10".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Complete canonical Task application coordinator for 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Complete canonical Task application coordinator for 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
